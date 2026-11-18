/**
 * Tools → Watch (#/<lang>/tools/watch): a YouTube video (by link, in YouTube's embedded player) or a video file
 * from the device, with a subtitle file (SRT, WebVTT, ASS) or YouTube's transcript pasted. The current line shows
 * under the video with tappable words (tapping one pauses the video), the whole transcript below it.
 * Videos are kept in a library on this device with their subtitles and where the learner left off (watchLibrary).
 */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { Content, LangId, Token } from '../content/types';
import { parseCues, youtubeId, type Cue } from '../core/cues';
import { analyse } from '../core/finder';
import { LANGS } from '../core/langs';
import { lookup, tokenId, type Lexicon } from '../core/lexicon';
import { addWords, award, inCollection, XP } from '../core/progress';
import { canTranslate, startTranslator } from '../core/translate';
import { commit, state, useStore } from '../core/store';
import { cls, plural } from '../core/util';
import { listItems, loadFile, markStored, removeItem, saveItem, storeFile, type WatchItem } from '../core/watchLibrary';
import { isPunct, joinTokens, tokenGap } from '../games/common';
import { Loading, Py, useKeys } from '../ui/components';
import { Icon } from '../ui/icons';
import { toast } from '../ui/toast';
import { copyText, googleTranslate, WordPanel } from './Floating';
import { ToolHead } from './Tools';
import { heatLevel } from './Reader';
import { rememberLang, useContent } from './shared';
import { Translated } from './Translated';
import { confirmMany, undoable } from '../core/undo';

/** What Watch needs from a player, YouTube's or the device's. Handed over once the video is ready. */
interface Player { time(): number; duration(): number; title(): string; seek(t: number): void; pause(): void; play(): void; playing(): boolean }

// ---------------- YouTube's embedded player ----------------

interface YTPlayer {
  getCurrentTime(): number; getDuration(): number; getPlayerState(): number; getVideoData?(): { title?: string };
  seekTo(t: number, allowSeekAhead: boolean): void; pauseVideo(): void; playVideo(): void; destroy(): void;
}
interface YTApi { Player: new (el: HTMLElement, o: unknown) => YTPlayer }

let ytApi: Promise<YTApi> | null = null;
/** Loads YouTube's player script once. */
function loadYouTube(): Promise<YTApi> {
  if (ytApi) return ytApi;
  ytApi = new Promise((resolve, reject) => {
    const w = window as unknown as { YT?: YTApi; onYouTubeIframeAPIReady?: () => void };
    if (w.YT?.Player) return resolve(w.YT);
    const before = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => { before?.(); resolve(w.YT!); };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.onerror = () => { ytApi = null; reject(new Error('YouTube could not be loaded')); };
    document.head.appendChild(s);
  });
  return ytApi;
}

function YouTubePlayer({ id, onReady }: { id: string; onReady: (p: Player | null) => void }) {
  const el = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let yt: YTPlayer | null = null;
    let live = true;
    loadYouTube().then((api) => {
      if (!live || !el.current) return;
      yt = new api.Player(el.current, {
        // youtube-nocookie: YouTube's privacy-enhanced mode (no cookies until the video plays)
        host: 'https://www.youtube-nocookie.com',
        videoId: id,
        width: '100%',
        height: '100%',
        playerVars: { playsinline: 1, rel: 0, cc_load_policy: 0, modestbranding: 1 },
        events: {
          onReady: () => onReady({
            time: () => yt?.getCurrentTime() ?? 0,
            duration: () => yt?.getDuration() ?? 0,
            title: () => yt?.getVideoData?.().title ?? '',
            seek: (t) => yt?.seekTo(Math.max(0, t), true),
            pause: () => yt?.pauseVideo(),
            play: () => yt?.playVideo(),
            playing: () => yt?.getPlayerState() === 1,
          }),
          onError: (e: { data: number }) => setError(e.data === 101 || e.data === 150
            ? "This video can't be played outside YouTube: its owner turned that off."
            : "YouTube couldn't play this video. Check the link."),
        },
      });
    }).catch(() => setError('YouTube could not be loaded. Check the internet connection.'));
    return () => { live = false; onReady(null); yt?.destroy(); };
  }, [id]);
  return (
    <>
      <div class="watch-video"><div ref={el} /></div>
      {error && <p class="notice warn small" style={{ marginTop: 8 }}><span>{error}</span></p>}
    </>
  );
}

/** The subtitles as WebVTT, for the device's own player (its native fullscreen hides Stampify's line). */
function vttUrl(cues: Cue[], offset: number): string {
  const ts = (t: number) => {
    const ms = Math.max(0, Math.round(t * 1000));
    const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000), s = Math.floor((ms % 60000) / 1000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms % 1000).padStart(3, '0')}`;
  };
  const body = cues.map((c) => `${ts(c.start + offset)} --> ${ts(c.end + offset)}\n${c.text}`).join('\n\n');
  return URL.createObjectURL(new Blob([`WEBVTT\n\n${body}\n`], { type: 'text/vtt' }));
}

function FilePlayer({ url, name, lang, cues, offset, onReady }: { url: string; name: string; lang: LangId; cues: Cue[]; offset: number; onReady: (p: Player | null) => void }) {
  const track = useMemo(() => vttUrl(cues, offset), [cues, offset]);
  useEffect(() => () => URL.revokeObjectURL(track), [track]);
  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = v.current!;
    const ready = () => onReady({
      time: () => el.currentTime,
      duration: () => el.duration || 0,
      title: () => name,
      seek: (t) => { el.currentTime = Math.max(0, t); },
      pause: () => el.pause(),
      play: () => { el.play().catch(() => {}); },
      playing: () => !el.paused,
    });
    if (el.readyState >= 1) ready(); else el.addEventListener('loadedmetadata', ready, { once: true });
    return () => { el.removeEventListener('loadedmetadata', ready); onReady(null); };
  }, [url]);
  return (
    <video ref={v} class="watch-file" src={url} controls playsInline>
      <track kind="subtitles" src={track} srcLang={lang} label="Subtitles" />
    </video>
  );
}

// ---------------- the library and setting up ----------------

const clock = (t: number) => {
  const s = Math.max(0, Math.floor(t));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = String(s % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`;
};
const size = (b: number) => b >= 1e9 ? `${(b / 1e9).toFixed(1)} GB` : `${Math.max(1, Math.round(b / 1e6))} MB`;
const ago = (ms: number) => {
  const d = Math.floor((Date.now() - ms) / 86400000);
  return d <= 0 ? 'today' : d === 1 ? 'yesterday' : d < 30 ? `${d} days ago` : new Date(ms).toLocaleDateString();
};

/** A video being watched: the library item, and where to play it from (a YouTube id or a file's address). */
interface Open { item: WatchItem; url?: string }

export function Watch({ l }: { l: LangId }) {
  useStore();
  rememberLang(l);
  const data = useContent(l);
  const [items, setItems] = useState<WatchItem[] | null>(null);
  const [open, setOpen] = useState<Open | null>(null);
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [subs, setSubs] = useState('');
  const [subsName, setSubsName] = useState('');
  const [vmode, setVmode] = useState<'yt' | 'file'>('yt');
  const [smode, setSmode] = useState<'file' | 'paste'>('file');
  /** A saved video whose file isn't stored: waiting for the learner to pick it again. */
  const [needFile, setNeedFile] = useState<WatchItem | null>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  const subsInput = useRef<HTMLInputElement>(null);
  const refind = useRef<HTMLInputElement>(null);
  const cues = useMemo(() => parseCues(subs), [subs]);
  const ytId = youtubeId(link);
  const refresh = () => listItems().then((all) => setItems(all.filter((x) => x.lang === l)));
  useEffect(() => { refresh(); }, [l, open]);
  // A file's address is freed when the video is closed
  useEffect(() => () => { if (open?.url) URL.revokeObjectURL(open.url); }, [open]);

  if (!data || !items) return <Loading />;
  if (open) return <Watching l={l} data={data} open={open} onBack={() => setOpen(null)} />;

  const resume = async (item: WatchItem) => {
    if (item.kind === 'youtube') { setOpen({ item }); return; }
    const blob = await loadFile(item.id);
    if (blob) { setOpen({ item, url: URL.createObjectURL(blob) }); return; }
    setNeedFile(item);
    refind.current?.click();
  };

  const start = async () => {
    const now = Date.now();
    const base = { lang: l, subs, subsName: subsName || undefined, offset: 0, added: now, seen: now, pos: 0, dur: 0 };
    let item: WatchItem;
    let url: string | undefined;
    if (file) {
      const id = `file:${file.name}:${file.size}`;
      const old = items.find((x) => x.id === id);
      item = { ...base, ...(old && { pos: old.pos, offset: old.offset, added: old.added }), id, kind: 'file', video: file.name, title: file.name.replace(/\.[^.]+$/, '') };
      url = URL.createObjectURL(file);
      storeFile(id, file).then((ok) => {
        markStored(id, ok);
        if (!ok) toast('There isn\'t room to keep this video file on the device: its subtitles and your place are saved, the file will be asked for again.');
      });
    } else {
      const id = `yt:${ytId}`;
      const old = items.find((x) => x.id === id);
      item = { ...base, ...(old && { pos: old.pos, offset: old.offset, added: old.added, title: old.title }), id, kind: 'youtube', video: ytId!, title: old?.title || 'YouTube video' };
    }
    await saveItem(item);
    setLink(''); setFile(null); setSubs(''); setSubsName('');
    setOpen({ item, url });
  };

  const videoOk = vmode === 'yt' ? !!ytId : !!file;
  const subsOk = cues.length > 0;
  const ready = videoOk && subsOk;
  return (
    <div>
      <ToolHead l={l}>Watch</ToolHead>
      <p class="muted" style={{ margin: '6px 0 14px' }}>
        A YouTube video or one from your device, with its subtitles under it: tap a word to see what it means and save it.
      </p>

      {items.length > 0 && (
        <section style={{ marginBottom: 18 }}>
          <div class="section-title"><h2>Your videos</h2></div>
          <div class="watch-lib">
            {items.map((x) => (
              <div key={x.id} class="watch-item">
                <Icon name={x.kind === 'youtube' ? 'video' : 'load'} size={22} />
                <button class="grow watch-item-main" onClick={() => resume(x)}>
                  <b>{x.title}</b>
                  <span class="small muted">{x.dur ? `${clock(x.pos)} of ${clock(x.dur)}` : clock(x.pos)} · {ago(x.seen)}</span>
                  {x.dur > 0 && <span class="tprog"><b style={{ width: `${Math.min(100, (x.pos / x.dur) * 100)}%` }} /></span>}
                </button>
                <button class="btn sm primary" onClick={() => resume(x)}><Icon name="next" size={16} />{x.pos > 5 ? 'Continue' : 'Watch'}</button>
                <button class="icon-btn plain" aria-label="Remove from your videos" title="Remove"
                  onClick={async () => { if (confirm(`Remove "${x.title}" from your videos?`)) { await removeItem(x.id); refresh(); } }}><Icon name="trash" size={18} /></button>
              </div>
            ))}
          </div>
          <input ref={refind} type="file" hidden accept="video/*,audio/*" onChange={(e) => {
            const f = (e.target as HTMLInputElement).files?.[0];
            (e.target as HTMLInputElement).value = '';
            if (!f || !needFile) return;
            const item = needFile;
            setNeedFile(null);
            storeFile(item.id, f).then((ok) => markStored(item.id, ok));
            setOpen({ item, url: URL.createObjectURL(f) });
          }} />
          {needFile && <p class="small muted">Choose the file "{needFile.video}" again: it isn't stored on this device.</p>}
        </section>
      )}

      <div class="section-title"><h2>{items.length ? 'Add a video' : 'Start with a video'}</h2></div>

      <section class={cls('card watch-step', videoOk && 'done')}>
        <div class="watch-step-head">
          <span class="watch-step-num">{videoOk ? <Icon name="check" size={16} /> : 1}</span>
          <h3>The video</h3>
          <div class="seg" role="tablist" aria-label="Where the video is">
            <button role="tab" aria-selected={vmode === 'yt'} class={cls(vmode === 'yt' && 'on')} onClick={() => { setVmode('yt'); setFile(null); }}>YouTube</button>
            <button role="tab" aria-selected={vmode === 'file'} class={cls(vmode === 'file' && 'on')} onClick={() => { setVmode('file'); setLink(''); }}>From this device</button>
          </div>
        </div>
        {vmode === 'yt' ? (
          <>
            <input type="url" inputMode="url" class={cls('watch-input', ytId && 'ok', link.trim() && !ytId && 'bad')} placeholder="Paste a YouTube link"
              value={link} onInput={(e) => setLink((e.target as HTMLInputElement).value)} />
            <p class="small muted watch-hint">
              {ytId ? <><Icon name="check" size={14} /> That's a YouTube video.</>
                : link.trim() ? 'That doesn\'t look like a YouTube link (youtube.com/watch?v=… or youtu.be/…).'
                : 'A link to any video on YouTube, from the address bar or the Share button.'}
            </p>
          </>
        ) : file ? (
          <div class="watch-chip"><Icon name="video" size={22} /><div class="grow"><b>{file.name}</b><div class="small muted">{size(file.size)}</div></div>
            <button class="icon-btn plain" onClick={() => setFile(null)} aria-label="Choose another file"><Icon name="close" size={18} /></button></div>
        ) : (
          <button class="watch-drop" onClick={() => videoInput.current?.click()}
            onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer?.files[0]; if (f) setFile(f); }}>
            <Icon name="load" size={24} /><b>Choose a video file</b><span class="small muted">or drop it here · it stays on this device</span>
          </button>
        )}
        <input ref={videoInput} type="file" hidden accept="video/*,audio/*"
          onChange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) setFile(f); (e.target as HTMLInputElement).value = ''; }} />
      </section>

      <section class={cls('card watch-step', subsOk && 'done')}>
        <div class="watch-step-head">
          <span class="watch-step-num">{subsOk ? <Icon name="check" size={16} /> : 2}</span>
          <h3>The subtitles</h3>
          <div class="seg" role="tablist" aria-label="Where the subtitles come from">
            <button role="tab" aria-selected={smode === 'file'} class={cls(smode === 'file' && 'on')} onClick={() => { if (smode !== 'file') { setSmode('file'); setSubs(''); } }}>Subtitle file</button>
            <button role="tab" aria-selected={smode === 'paste'} class={cls(smode === 'paste' && 'on')} onClick={() => { if (smode !== 'paste') { setSmode('paste'); setSubs(''); setSubsName(''); } }}>Paste transcript</button>
          </div>
        </div>
        {smode === 'file' ? (subsName ? (
          <div class="watch-chip"><Icon name="sheet" size={22} /><div class="grow"><b>{subsName}</b><div class="small muted">{cues.length ? plural(cues.length, 'line') : 'no timed lines found'}</div></div>
            <button class="icon-btn plain" onClick={() => { setSubs(''); setSubsName(''); }} aria-label="Choose another file"><Icon name="close" size={18} /></button></div>
        ) : (
          <button class="watch-drop" onClick={() => subsInput.current?.click()}
            onDragOver={(e) => e.preventDefault()} onDrop={async (e) => { e.preventDefault(); const f = e.dataTransfer?.files[0]; if (f) { setSubs(await f.text()); setSubsName(f.name); } }}>
            <Icon name="load" size={24} /><b>Choose a subtitle file</b><span class="small muted">.srt, .vtt or .ass, in {LANGS[l].name}</span>
          </button>
        )) : (
          <>
            <ol class="small muted watch-how">
              <li>On YouTube, open the video's description and press <b>Show transcript</b>.</li>
              <li>Select the whole transcript, with its times, and copy it.</li>
              <li>Paste it here.</li>
            </ol>
            <textarea lang={l} rows={5} class="watch-input" value={subs} placeholder={'0:01\n…\n0:04\n…'}
              onInput={(e) => setSubs((e.target as HTMLTextAreaElement).value)} />
          </>
        )}
        <input ref={subsInput} type="file" hidden accept=".srt,.vtt,.ass,.ssa,.txt,text/plain"
          onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) { setSubs(await f.text()); setSubsName(f.name); } (e.target as HTMLInputElement).value = ''; }} />
        {subs.trim() && !(smode === 'file' && cues.length) && (
          <p class="small watch-hint">{cues.length ? <><Icon name="check" size={14} /> <b>{plural(cues.length, 'line')}</b> with times found</>
            : <span class="muted">No timed lines found. Subtitle files need times (00:00:01,000 --&gt; …); a pasted transcript needs a time before each line.</span>}</p>
        )}
      </section>

      <button class="btn primary block" style={{ marginTop: 16 }} disabled={!ready} onClick={start}>
        <Icon name="next" size={18} />{ready ? 'Start watching' : !videoOk ? 'Add a video first' : 'Add the subtitles'}
      </button>
      <p class="small muted center" style={{ marginTop: 8 }}>Your videos, their subtitles and where you left off are kept on this device only.</p>
    </div>
  );
}

// ---------------- watching ----------------

/** `data`: the language's content and word list, loaded by Watch before this opens. */
function Watching({ l, data, open, onBack }: { l: LangId; data: { c: Content; lx: Lexicon }; open: Open; onBack: () => void }) {
  useStore();
  const { c, lx } = data;
  const m = LANGS[l];
  const cues: Cue[] = useMemo(() => parseCues(open.item.subs), [open.item.id]);
  const item = useRef<WatchItem>({ ...open.item });
  const player = useRef<Player | null>(null);
  const [now, setNow] = useState(0);
  const [offset, setOffsetState] = useState(open.item.offset || 0);
  const [sel, setSel] = useState<{ ci: number; ti: number } | null>(null);
  const [title, setTitle] = useState(open.item.title);
  const [tr, setTr] = useState<'off' | 'starting' | 'on' | 'unavailable'>('off');
  /** Pause after each line, to read it at one's own pace. */
  const [stepwise, setStepwise] = useState(false);
  const stoppedAt = useRef(-1);
  const list = useRef<HTMLDivElement>(null);
  /**
   * Stampify's own fullscreen: the video fills the screen and the current line sits on it, tappable. The real
   * Fullscreen API where the browser has it for any element (Android, iPad, computers; turned to landscape on
   * phones); on iPhone, which allows it for bare videos only, the page's own window is filled instead.
   */
  const stage = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);
  const enterFull = async () => {
    setFull(true);
    const el = stage.current as (HTMLElement & { webkitRequestFullscreen?: () => Promise<void> }) | null;
    try {
      if (el?.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' });
      else await el?.webkitRequestFullscreen?.();
      await (screen.orientation as unknown as { lock?: (o: string) => Promise<void> })?.lock?.('landscape');
    } catch { /* no real fullscreen here: the window is filled instead */ }
  };
  const exitFull = () => {
    setFull(false);
    setRegain(false);
    try { screen.orientation?.unlock?.(); } catch { /* not locked */ }
    const d = document as Document & { webkitExitFullscreen?: () => void; webkitFullscreenElement?: Element };
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else if (d.webkitFullscreenElement) d.webkitExitFullscreen?.();
  };
  /**
   * Browsers leave real fullscreen whenever the learner switches away (Google Translate, another app). That must not
   * end Stampify's fullscreen mode: the stage keeps filling the window, and real fullscreen comes back with the next
   * tap on Stampify's own controls ("Full screen again"), since a page may only enter it right after a tap.
   * Leaving it with the system's back gesture or Esc, while staying on the page, ends the mode.
   */
  const awayAt = useRef(0);
  const [regain, setRegain] = useState(false);
  useEffect(() => {
    const isFull = () => !!(document.fullscreenElement || (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement);
    const onChange = () => {
      if (isFull()) { setRegain(false); return; }
      if (document.hidden || Date.now() - awayAt.current < 4000) setRegain(true); // switched away: stay
      else setFull(false);
    };
    const onVisibility = () => { if (document.hidden) awayAt.current = Date.now(); };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  /** Real fullscreen again, from a tap (browsers allow it only then). */
  const regainFull = () => {
    if (!regain) return;
    setRegain(false);
    enterFull();
  };

  const remember = (patch: Partial<WatchItem>) => { item.current = { ...item.current, ...patch, seen: Date.now() }; saveItem(item.current); };
  const setOffset = (o: number) => { setOffsetState(o); remember({ offset: o }); };

  // The lines as tokens (each analysed once, when first needed)
  const tokens = useMemo(() => new Map<number, Token[]>(), [cues, l]);
  const tokensOf = (ci: number) => {
    let t = tokens.get(ci);
    if (!t) { t = analyse(l, c, lx, cues[ci].text).text.s.flatMap((s) => s.t); tokens.set(ci, t); }
    return t;
  };

  const onReady = (p: Player | null) => {
    player.current = p;
    if (!p) return;
    // Continue where the learner left off (a little before, for context)
    const at = item.current.pos;
    if (at > 5) p.seek(at - 2);
    const t = p.title();
    if (t && t !== item.current.title) { setTitle(t); remember({ title: t }); }
  };

  // Where the video is, five times a second; the place is saved every few seconds and when leaving
  useEffect(() => {
    let lastSave = 0;
    const tick = window.setInterval(() => {
      const p = player.current;
      if (!p) return;
      const t = p.time();
      setNow(t);
      if (Math.abs(t - item.current.pos) > 1 && Date.now() - lastSave > 4000) {
        lastSave = Date.now();
        remember({ pos: t, dur: p.duration() || item.current.dur });
      }
    }, 200);
    return () => {
      clearInterval(tick);
      const p = player.current;
      if (p) remember({ pos: p.time(), dur: p.duration() || item.current.dur });
    };
  }, []);

  // The line being spoken: the last one that has started (it stays, fading, until the next one starts)
  const t = now - offset;
  let ci = -1;
  for (let k = 0; k < cues.length && cues[k].start <= t; k++) ci = k;
  const over = ci >= 0 && t > cues[ci].end;

  // Pause after each line (once per line)
  useEffect(() => {
    if (!stepwise || !over || stoppedAt.current === ci) return;
    stoppedAt.current = ci;
    player.current?.pause();
  }, [stepwise, over, ci]);

  // Keep the current line in view in the transcript
  useEffect(() => {
    const box = list.current;
    const row = box?.querySelector<HTMLElement>('.watch-cue.cur');
    if (!box || !row) return;
    const top = row.offsetTop - box.offsetTop;
    if (top < box.scrollTop || top + row.offsetHeight > box.scrollTop + box.clientHeight) box.scrollTop = top - box.clientHeight / 3;
  }, [ci]);

  const go = (k: number) => {
    if (k < 0 || k >= cues.length) return;
    setSel(null);
    stoppedAt.current = -1;
    player.current?.seek(cues[k].start + offset);
    player.current?.play();
  };

  // Keys (computers): ← → lines, R this line again, Esc closes the word
  useKeys((e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(ci - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(ci + 1); }
    else if (e.key === 'r' || e.key === 'R') go(Math.max(0, ci));
    else if (e.key === 'Escape') { if (sel) setSel(null); else if (full) exitFull(); }
    else if (e.key === 'f' || e.key === 'F') { if (full) exitFull(); else enterFull(); }
  }, [ci, offset, sel, full]);

  const fresh = useMemo(() => {
    const ids = new Set<string>();
    cues.forEach((_, k) => tokensOf(k).forEach((tk) => { if (!isPunct(tk) && lookup(lx, tk)) ids.add(tokenId(lx, tk)); }));
    return [...ids];
  }, [cues, l]).filter((id) => !inCollection(l, id));

  const heat = !!state.settings.heatmap;
  const showPy = !!m.reading && state.settings.showReading;
  const line = (k: number, big: boolean) => {
    const toks = tokensOf(k);
    return toks.map((tk, ti) => {
      const space = tokenGap(l, toks[ti - 1]?.[0], tk[0]);
      // With readings on, punctuation gets an empty reading line too, so it sits on the words' baseline
      if (isPunct(tk)) return <span key={ti}>{space}{showPy ? <span class="punct rw"><span class="py">{' '}</span><span>{tk[0]}</span></span> : tk[0]}</span>;
      const h = heat ? heatLevel(l, lx, tk) : null;
      const on = big && sel?.ci === k && sel.ti === ti;
      return (
        <span key={ti}>
          {space}
          <button class={cls('tok', showPy && 'rw', inCollection(l, tokenId(lx, tk)) && 'saved', on && 'sel', h !== null && `heat h${h}`)}
            onClick={() => { if (on) { setSel(null); return; } setSel({ ci: k, ti }); player.current?.pause(); }}>
            {showPy ? <><span class="py">{tk[1] ? <Py text={tk[1]} /> : ' '}</span><span>{tk[0]}</span></> : tk[0]}
          </button>
        </span>
      );
    });
  };
  const tok = sel ? tokensOf(sel.ci)[sel.ti] : null;

  /** Copy and Google Translate for the current line (as in the floating window). */
  const [copied, setCopied] = useState(false);
  const lineText = ci >= 0 ? joinTokens(l, tokensOf(ci)) : '';
  const copyLine = async (e: Event) => {
    if (lineText && await copyText(e.currentTarget as Element, lineText)) { setCopied(true); setTimeout(() => setCopied(false), 1500); }
  };

  const toggleTr = async () => {
    if (tr === 'on' || tr === 'starting') { setTr('off'); return; }
    setTr('starting');
    setTr((await startTranslator(l, { clicked: true })) === 'ready' ? 'on' : 'unavailable');
  };

  return (
    <div class="watch">
      <div class="game-top">
        <button class="icon-btn plain" onClick={onBack} aria-label="Back to your videos"><Icon name="back" /></button>
        <div class="grow watch-title"><b>{title}</b></div>
      </div>
      {/* A tap on Stampify's controls after coming back from another app brings real fullscreen back */}
      <div ref={stage} class={cls('watch-stage', full && 'full')} onPointerDownCapture={full ? (e) => { if (!(e.target as Element).closest('.watch-fs-exit')) regainFull(); } : undefined}>
        {open.item.kind === 'youtube'
          ? <YouTubePlayer id={open.item.video} onReady={onReady} />
          : <FilePlayer url={open.url!} name={open.item.title} lang={l} cues={cues} offset={offset} onReady={onReady} />}
        {full && (
          <>
            {regain && <button class="watch-fs-regain" onClick={regainFull}><Icon name="expand" size={16} />Full screen again</button>}
            {/* Moving between lines: large buttons on the right edge, where the thumb is */}
            <div class="watch-fs-nav">
              <button class="watch-fs-btn big" onClick={() => go(ci - 1)} disabled={ci <= 0} aria-label="Previous line"><Icon name="prev2" size={26} /></button>
              <button class="watch-fs-btn big" onClick={() => go(Math.max(0, ci))} aria-label="This line again"><Icon name="speaker" size={26} /></button>
              <button class="watch-fs-btn big" onClick={() => go(ci + 1)} disabled={ci >= cues.length - 1} aria-label="Next line"><Icon name="next2" size={26} /></button>
            </div>
            <div class="watch-fs-bar">
              {m.reading && (
                <button class={cls('watch-fs-btn', state.settings.showReading && 'on')} onClick={() => { state.settings.showReading = !state.settings.showReading; commit(); }}
                  aria-label={`${m.readingName} on or off`} title={`${m.readingName} on/off`}>{l === 'zh' ? '拼' : l === 'ja' ? 'あ' : 'Aa'}</button>
              )}
              {canTranslate() && (
                <button class={cls('watch-fs-btn', tr === 'on' && 'on')} onClick={toggleTr} disabled={tr === 'unavailable'}
                  aria-label="English translation on or off" title="English translation (made on this device)">EN</button>
              )}
              <button class="watch-fs-btn" onClick={copyLine} disabled={ci < 0} aria-label="Copy the line" title="Copy the line"><Icon name={copied ? 'check' : 'copy'} size={18} /></button>
              <a class="watch-fs-btn" href={lineText ? googleTranslate(l, lineText) : undefined} target="_blank" rel="noopener"
                onClick={() => { awayAt.current = Date.now(); player.current?.pause(); }} aria-label="Translate the line with Google Translate" title="Google Translate"><Icon name="translate" size={18} /></a>
              <button class="watch-fs-btn watch-fs-exit" onClick={exitFull} aria-label="Leave fullscreen"><Icon name="close" size={18} /></button>
            </div>
            {tok && (
              <div class="watch-fs-word" onClick={(e) => e.stopPropagation()}>
                <WordPanel l={l} lx={lx} t={tok} onClose={() => { setSel(null); player.current?.play(); }} />
              </div>
            )}
            {ci >= 0 && !(over && t - cues[ci].end > 1.5) && (
              <div class={cls('watch-fs-line', m.cjk && 'cjk', showPy && 'with-py')} lang={l}>
                {line(ci, true)}
                {tr === 'on' && <Translated l={l} text={lineText} class="watch-fs-tr" />}
              </div>
            )}
          </>
        )}
      </div>

      <div class="reader-tools watch-tools">
        {m.reading && (
          <button class="toggle" aria-pressed={state.settings.showReading} onClick={() => { state.settings.showReading = !state.settings.showReading; commit(); }}>
            <span style={{ textTransform: 'capitalize' }}>{m.readingName}</span> {state.settings.showReading ? 'on' : 'off'}
          </button>
        )}
        <button class="toggle" aria-pressed={heat} onClick={() => { state.settings.heatmap = !heat; commit(); }}>Heat map {heat ? 'on' : 'off'}</button>
        {canTranslate() && (
          <button class="toggle" aria-pressed={tr === 'on'} disabled={tr === 'unavailable'} onClick={toggleTr}
            title={tr === 'unavailable' ? "Your browser can't translate this language on this device" : 'English translation of each line, made on this device'}>
            {tr === 'starting' ? 'Translation…' : `Translation ${tr === 'on' ? 'on' : 'off'}`}
          </button>
        )}
        <button class="toggle" aria-pressed={stepwise} onClick={() => setStepwise(!stepwise)} title="Pause at the end of every line">Pause after each line</button>
        <button class="toggle" onClick={enterFull} title="The video on the whole screen, with the subtitles on it"><Icon name="expand" size={16} />Fullscreen</button>
      </div>

      <div class={cls('watch-now', m.cjk && 'cjk')} lang={l}>
        {ci > 0 && <div class="watch-prev">{line(ci - 1, false)}</div>}
        <div class={cls('watch-cur', over && 'over', showPy && 'with-py')}>{ci >= 0 ? line(ci, true) : <span class="muted small">The subtitles start at {clock(cues[0].start)}.</span>}</div>
        {tr === 'on' && ci >= 0 && <Translated l={l} text={lineText} class="watch-tr" />}
        {ci >= 0 && (
          <div class="watch-line-tools">
            <button class="btn sm ghost" onClick={copyLine}><Icon name={copied ? 'check' : 'copy'} size={14} />{copied ? 'Copied' : 'Copy'}</button>
            <a class="btn sm ghost" href={googleTranslate(l, lineText)} target="_blank" rel="noopener"><Icon name="translate" size={14} />Google Translate</a>
          </div>
        )}
      </div>
      {tok && <div class="watch-word"><WordPanel l={l} lx={lx} t={tok} onClose={() => { setSel(null); player.current?.play(); }} /></div>}

      <div class="row wrap watch-controls">
        <button class="btn sm" onClick={() => go(ci - 1)} disabled={ci <= 0} aria-label="Previous line" title="Previous line (←)"><Icon name="prev2" size={16} /></button>
        <button class="btn sm" onClick={() => go(Math.max(0, ci))} title="This line again (R)"><Icon name="speaker" size={16} />Again</button>
        <button class="btn sm" onClick={() => go(ci + 1)} disabled={ci >= cues.length - 1} aria-label="Next line" title="Next line (→)"><Icon name="next2" size={16} /></button>
        <span class="grow" />
        <span class="small muted">Subtitles</span>
        <button class="btn sm ghost" onClick={() => setOffset(Math.round((offset - 0.5) * 10) / 10)} title="Show the subtitles earlier">−0.5 s</button>
        <span class="small mono">{offset > 0 ? '+' : ''}{offset.toFixed(1)} s</span>
        <button class="btn sm ghost" onClick={() => setOffset(Math.round((offset + 0.5) * 10) / 10)} title="Show the subtitles later">+0.5 s</button>
      </div>
      <p class="kbd desktop-only" style={{ marginTop: 6 }}>Keys: ← → lines · R this line again · F fullscreen · Esc close the word</p>

      {fresh.length > 0 && (
        <button class="btn block" style={{ marginTop: 10 }} onClick={() => {
          if (!confirmMany(fresh.length, `Save all ${fresh.length} new words`)) return;
          undoable(l, () => {
            const n = addWords(l, fresh);
            award(l, Math.min(10, n) * XP.save);
            return n;
          }, (n) => `Saved ${plural(n, 'word')}`);
        }}><Icon name="plus" size={18} />Save all {fresh.length} new words in these subtitles</button>
      )}

      <div class="section-title" style={{ marginTop: 16 }}><h2>Transcript</h2></div>
      <div class={cls('watch-list', m.cjk && 'cjk')} ref={list} lang={l}>
        {cues.map((cue, k) => (
          <button key={k} class={cls('watch-cue', k === ci && 'cur')} onClick={() => go(k)}>
            <span class="mono small muted">{clock(cue.start)}</span>
            <span>{cue.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
