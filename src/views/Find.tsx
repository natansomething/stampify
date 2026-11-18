/**
 * Tools → Analyse sentences & captions (#/<lang>/tools/analyse): paste text, open a subtitle file or paste a screenshot; it opens in
 * the reader, each word linked to its dictionary form, ready to add to the collection. Words Stampify doesn't know
 * link to Wiktionary. "Read from screen" (desktop) follows the subtitles of a video in another window (LiveCapture).
 * All processing happens on the device. A text can be saved on the device (core/textLibrary.ts) to read on later;
 * nothing else of the text or the screen is stored.
 */
import { createPortal } from 'preact/compat';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { LangId } from '../content/types';
import { analyse, subtitleText } from '../core/finder';
import { readImage } from '../core/ocr';
import { LANGS } from '../core/langs';
import { addWords, inCollection } from '../core/progress';
import { commit, state, useStore } from '../core/store';
import { defaultTitle, listTexts, removeText, saveText, type SavedText } from '../core/textLibrary';
import { cls, plural } from '../core/util';
import { Loading } from '../ui/components';
import { Icon } from '../ui/icons';
import { toast } from '../ui/toast';
import { ToolHead } from './Tools';
import { AreaPicker } from './AreaPicker';
import { Floating, FLOAT_PICK_SIZE, openAreaWindow, openFloating } from './Floating';
import { canCapture, LiveCapture, shareScreen } from './LiveCapture';
import { TextReader } from './Reader';
import { rememberLang, useContent } from './shared';
import { confirmMany, undoable } from '../core/undo';

const ago = (ms: number) => {
  const d = Math.floor((Date.now() - ms) / 86400000);
  return d <= 0 ? 'today' : d === 1 ? 'yesterday' : d < 30 ? `${d} days ago` : new Date(ms).toLocaleDateString();
};

export function FindWords({ l }: { l: LangId }) {
  useStore();
  rememberLang(l);
  const data = useContent(l);
  const [text, setText] = useState('');
  /** Texts saved on this device, and the one open now (edits and new caption lines are saved into it). */
  const [items, setItems] = useState<SavedText[]>([]);
  const [saved, setSaved] = useState<SavedText | null>(null);
  const savedRef = useRef<SavedText | null>(null);
  savedRef.current = saved;
  useEffect(() => { setSaved(null); listTexts(l).then(setItems); }, [l]);
  const persist = (next: SavedText) => {
    setSaved(next);
    setItems((xs) => [next, ...xs.filter((x) => x.id !== next.id)]);
    saveText(next);
  };
  // The open saved text follows the edits; clearing the box closes it (the saved copy stays)
  useEffect(() => {
    const cur = savedRef.current;
    if (!cur || cur.text === text) return;
    if (!text.trim()) { setSaved(null); return; }
    persist({ ...cur, text, seen: Date.now() });
  }, [text]);
  const saveNew = async () => {
    const title = prompt('A name for this text', defaultTitle(text));
    if (title === null) return;
    const now = Date.now();
    const item: SavedText = { id: `t${now.toString(36)}`, lang: l, title: title.trim() || defaultTitle(text), text, pos: 0, len: 0, added: now, seen: now };
    if (await saveText(item)) {
      setSaved(item);
      setItems((xs) => [item, ...xs]);
      toast('Saved on this device');
    } else toast('This browser does not allow saving here (private window?)');
  };
  const rename = () => {
    if (!saved) return;
    const title = prompt('A new name for this text', saved.title);
    if (title && title.trim()) persist({ ...saved, title: title.trim() });
  };
  const openSaved = (x: SavedText) => {
    const next = { ...x, seen: Date.now() };
    setSaved(next);
    savedRef.current = next;
    setText(x.text);
    saveText(next);
    setItems((xs) => [next, ...xs.filter((y) => y.id !== x.id)]);
    window.scrollTo(0, 0);
  };
  const onPos = (si: number) => {
    const cur = savedRef.current;
    if (cur && cur.pos !== si) persist({ ...cur, pos: si, len: result?.text.s.length ?? cur.len, seen: Date.now() });
  };
  const [ocr, setOcr] = useState<number | null>(null);
  /** Live screen reading: on, and a counter that gives each session its own reader (kept while lines arrive). */
  const [live, setLive] = useState<MediaStream | null>(null);
  const [run, setRun] = useState(0);
  /** The floating window with the latest lines, while it is open. */
  const [float, setFloat] = useState<{ win: Window; root: HTMLElement } | null>(null);
  const popOut = async () => {
    const f = await openFloating(() => setFloat(null));
    if (f) setFloat(f);
    else toast('The floating window could not be opened. Allow pop-ups for Stampify and try again.');
  };
  /** The floating window shows the caption area picker (at the start of live reading). */
  const [picking, setPicking] = useState(false);
  /** The window that picks the caption area (opened from the floating window). */
  const [areaWin, setAreaWin] = useState<{ win: Window; root: HTMLElement } | null>(null);
  const pickArea = () => {
    if (areaWin && !areaWin.win.closed) { areaWin.win.focus(); return; }
    const w = openAreaWindow(() => setAreaWin(null));
    if (w) setAreaWin(w);
    else toast('The window could not be opened. Allow pop-ups for Stampify, or choose the area on this page.');
  };
  const autoFloat = state.settings.floating !== false;
  /**
   * Starts live reading. The floating window (if on) opens in the same click as the share prompt: browsers only
   * allow it right after a click. Cancelling the share closes it again.
   */
  const startLive = async () => {
    const sharing = shareScreen();
    // The floating window opens larger, on the caption area picker; after Done it shows the lines
    const floating = autoFloat && !float ? openFloating(() => setFloat(null), FLOAT_PICK_SIZE) : Promise.resolve(null);
    const [s, f] = await Promise.all([sharing, floating]);
    if (!s) { f?.win.close(); return; }
    setRun((n) => n + 1);
    setLive(s);
    if (f) { setFloat(f); setPicking(true); }
    else if (autoFloat && !float) toast('Press "Pop out" for the floating window (the browser allows only one window per click).');
  };
  // Stopping the live reading (or leaving the page) closes the floating window too
  useEffect(() => { if (!live && float) { float.win.close(); setFloat(null); } }, [live]);
  useEffect(() => { if (!live && areaWin) { areaWin.win.close(); setAreaWin(null); } }, [live]);
  useEffect(() => () => { areaWin?.win.close(); }, [areaWin]);
  useEffect(() => () => { float?.win.close(); }, [float]);
  const addLine = (line: string, replace: boolean) => setText((prev) => {
    const lines = prev ? prev.split('\n') : [];
    if (replace && lines.length) lines[lines.length - 1] = line; else lines.push(line);
    return lines.join('\n');
  });
  const file = useRef<HTMLInputElement>(null);

  const result = useMemo(() => (data && text.trim() ? analyse(l, data.c, data.lx, text) : null), [data, text, l]);

  const image = async (blob: Blob) => {
    setSaved(null);
    setOcr(0);
    try {
      const t = await readImage(l, blob, setOcr);
      if (!t) toast('No text found in the image');
      setText(t);
    } catch {
      toast('The image could not be read. Reading images needs an internet connection the first time.');
    } finally {
      setOcr(null);
    }
  };
  const open = async (f: File) => {
    if (f.type.startsWith('image/')) return image(f);
    setSaved(null);
    setText(subtitleText(await f.text()));
  };

  // A screenshot pasted anywhere on the page is read
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const img = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith('image/'))?.getAsFile();
      if (img) { e.preventDefault(); image(img); }
    };
    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, [l]);

  if (!data) return <Loading />;
  const fresh = result ? result.found.filter((f) => !inCollection(l, f.e.id)) : [];

  const head = (
    <>
      <ToolHead l={l}>Analyse sentences &amp; captions</ToolHead>
      <p class="muted" style={{ margin: '6px 0 14px' }}>
        Paste {LANGS[l].name} text, open a subtitle file or paste a screenshot. Read it like a text in Read: tap a
        word (or use the arrow keys) to see what it means and save it. Save a text to read on later; everything stays
        on this device.
      </p>

      {items.length > 0 && (
        <section style={{ marginBottom: 18 }}>
          <div class="section-title"><h2>Your saved texts</h2></div>
          <div class="watch-lib">
            {items.map((x) => {
              const done = x.len ? Math.min(100, ((x.pos + 1) / x.len) * 100) : 0;
              const here = saved?.id === x.id;
              return (
                <div key={x.id} class={cls('watch-item', here && 'on')}>
                  <Icon name="read" size={22} />
                  <button class="grow watch-item-main" onClick={() => openSaved(x)}>
                    <b>{x.title}</b>
                    <span class="small muted">
                      {here ? 'Open now' : x.pos > 0 && x.len ? `Sentence ${x.pos + 1} of ${x.len}` : plural(x.text.split('\n').filter((s) => s.trim()).length, 'line')} · {ago(x.seen)}
                    </span>
                    {done > 0 && <span class="tprog"><b style={{ width: `${done}%` }} /></span>}
                  </button>
                  {!here && <button class="btn sm primary" onClick={() => openSaved(x)}><Icon name="next" size={16} />{x.pos > 0 ? 'Continue' : 'Read'}</button>}
                  <button class="icon-btn plain" aria-label="Delete this saved text" title="Delete"
                    onClick={async () => {
                      if (!confirm(`Delete "${x.title}" from this device?`)) return;
                      await removeText(x.id);
                      if (here) setSaved(null);
                      setItems((xs) => xs.filter((y) => y.id !== x.id));
                    }}><Icon name="trash" size={18} /></button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div class={cls('card stack find-input', ocr !== null && 'busy')}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer?.files[0]; if (f) open(f); }}>
        <textarea lang={l} rows={result ? 3 : 6} value={text} placeholder="Paste text or a screenshot here, or drop a file"
          onInput={(e) => setText((e.target as HTMLTextAreaElement).value)} />
        <div class="row wrap" style={{ gap: 8 }}>
          <button class="btn sm" onClick={() => file.current?.click()}><Icon name="load" size={18} />Open a file</button>
          {canCapture() && !live && (
            <button class="btn sm" onClick={startLive}>
              <Icon name="screen" size={18} />Read from screen
            </button>
          )}
          {text.trim() && !saved && <button class="btn sm" onClick={saveNew}><Icon name="save" size={18} />Save</button>}
          {saved && (
            <button class="btn sm ghost" onClick={rename} title="Rename">
              <Icon name="check" size={18} /><span class="saved-as">Saved as “{saved.title}”</span>
            </button>
          )}
          {text && <button class="btn sm ghost" onClick={() => { setSaved(null); setText(''); }}><Icon name="close" size={18} />{saved ? 'Close' : 'Clear'}</button>}
          <span class="small muted grow" style={{ minWidth: 200 }}>Subtitles (.srt, .vtt, .ass), text or an image</span>
        </div>
        <input ref={file} type="file" hidden accept=".srt,.vtt,.ass,.ssa,.txt,text/plain,image/*"
          onChange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) open(f); (e.target as HTMLInputElement).value = ''; }} />
        {ocr !== null && (
          <div class="stack" style={{ gap: 6 }}>
            <span class="small">Reading the image… {Math.round(ocr * 100)}%</span>
            <div class="tprog"><b style={{ width: `${ocr * 100}%` }} /></div>
          </div>
        )}
      </div>

      {canCapture() && !live && (
        <label class="row small muted" style={{ gap: 6, margin: '8px 0 0', cursor: 'pointer' }}>
          <input type="checkbox" checked={autoFloat} onChange={(e) => { state.settings.floating = (e.target as HTMLInputElement).checked; commit(); }} />
          Pop out automatically: a small window with the latest lines that stays in front of the video
        </label>
      )}
      {live && <LiveCapture key={run} l={l} stream={live} onLine={addLine} onStop={() => setLive(null)} onPopOut={popOut} popped={!!float} />}
      {areaWin && live && createPortal(
        <div class="area-window-inner">
          <h2>Where are the captions?</h2>
          <AreaPicker stream={live} />
          <button class="btn primary" onClick={() => areaWin.win.close()}><Icon name="check" size={18} />Done</button>
        </div>,
        areaWin.root,
      )}
      {float && createPortal(
        <Floating l={l} text={result?.text ?? null} onPickArea={live ? pickArea : undefined}
          picking={picking && live ? { stream: live, onDone: () => setPicking(false) } : null} />,
        float.root,
      )}

      {result && (
        <div class="row wrap find-summary">
          <span class="grow small">
            <b>{plural(result.found.length, 'word')}</b> Stampify knows · {fresh.length} not in your collection
            {result.unknown.length > 0 && <> · {result.unknown.length} to look up</>}
          </span>
          {fresh.length > 0 && (
            <button class="btn sm primary" onClick={() => {
              if (!confirmMany(fresh.length, `Add all ${fresh.length} words`)) return;
              undoable(l, () => addWords(l, fresh.map((f) => f.e.id)), (n) => `Added ${plural(n, 'word')} to your collection`);
            }}><Icon name="plus" size={16} />Add all {fresh.length}</button>
          )}
        </div>
      )}
    </>
  );

  // The input stays outside the reader, so typing never loses focus; a new text starts the reader afresh
  return (
    <div>
      {head}
      {result && result.text.s.length > 0 && <TextReader key={live ? `live${run}` : `${saved?.id ?? ''}:${text}`} l={l} text={result.text} scratch
        start={saved?.pos} onPos={saved ? onPos : undefined} />}
    </div>
  );
}
