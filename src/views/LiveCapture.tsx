/**
 * Live screen reading for Find words: the learner shares a window (or the screen) where a video plays, marks the
 * subtitle area (a preset or a box drawn on the picture: AreaPicker), and every new subtitle line is read on the device and handed to Find words.
 * Frames are never stored or sent anywhere; only the recognised text lines leave this component.
 *
 * Five times a second the marked area goes through extractSubtitles (subtitle boxes are found first and only their
 * contents read; without boxes, only outlined subtitle letters are kept: no picture, player controls or labels). When those letters changed and then held still for a moment, each text line is read
 * on its own. Lines that repeat a recent one, or are part of one, are skipped (subtitles stay on screen for a while;
 * rolling captions show the previous line again); a line that extends the last one replaces it (captions that grow
 * word by word).
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import type { LangId } from '../content/types';
import { bare, CaptionMerger, clean } from '../core/captions';
import { ocrSession } from '../core/ocr';
import { extractSubtitles, printDiff, type Extracted, type LinePrint } from '../core/subtitles';
import { useArea } from '../core/liveArea';
import { Icon } from '../ui/icons';
import { toast } from '../ui/toast';
import { AreaPicker } from './AreaPicker';


/** Screen sharing exists (desktop browsers; not phones). */
export const canCapture = () => typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getDisplayMedia;

/** Asks the browser to share a window or the screen. Call it straight from a click: browsers require that. */
export async function shareScreen(): Promise<MediaStream | null> {
  try {
    return await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 10 }, audio: false });
  } catch {
    toast('Screen sharing was cancelled');
    return null;
  }
}

/** How often the area is looked at (only changed subtitles are read). */
const TICK_MS = 150;
/** A subtitle counts as new when this share of its lines' prints changed (or the lines' number or lengths did). */
const CHANGE = 0.03;
/**
 * Lines read with less confidence (0-100) are dropped. From a subtitle box the text is clean, and short Chinese
 * lines often score low although read right, so the bar is lower there.
 */
const MIN_CONFIDENCE = { box: 35, outline: 55 };
/** Fewer text pixels than this: no subtitle on screen. */
const MIN_INK = 40;
/** The processed area is at most this wide (larger frames are scaled down first). */
const MAX_W = 1400;
/** Lines are enlarged or shrunk to about this height for OCR. */
const OCR_LINE_H = 44;

/**
 * A clock for the reading loop that keeps time when Stampify is in the background (a hidden page's own timers are
 * slowed to once a second or less; a worker's much less). Falls back to a plain interval.
 */
function ticker(ms: number, fn: () => void): () => void {
  try {
    const url = URL.createObjectURL(new Blob([`setInterval(() => postMessage(0), ${ms});`], { type: 'text/javascript' }));
    const w = new Worker(url);
    w.onmessage = fn;
    return () => { w.terminate(); URL.revokeObjectURL(url); };
  } catch {
    const t = window.setInterval(fn, ms);
    return () => clearInterval(t);
  }
}

type Grabber = { grabFrame: () => Promise<ImageBitmap> };

export function LiveCapture({ l, stream, onLine, onStop, onPopOut, popped }: {
  l: LangId;
  /** The shared window or screen (from shareScreen); stopped when this closes. */
  stream: MediaStream;
  /** A new subtitle line; `replace`: it extends the previous one, which it replaces. */
  onLine: (line: string, replace: boolean) => void;
  onStop: () => void;
  /** Opens the floating window with the latest lines (when the browser can). */
  onPopOut?: () => void;
  /** The floating window is open. */
  popped?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  /** What Stampify sees: the subtitle lines it found, as it reads them. */
  const seen = useRef<HTMLCanvasElement>(null);
  /** The area to read (a preset or drawn, here or in the area window). */
  const rect = useArea();
  const rectRef = useRef(rect);
  rectRef.current = rect;
  const [status, setStatus] = useState<'loading' | 'watching'>('loading');
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;
  /** The last line read and what happened to it. */
  const [last, setLast] = useState<{ text: string; note: string } | null>(null);
  const [source, setSource] = useState('');
  /** Whether the last subtitle sat on a box (then only the box was read) or was found by its outline. */
  const [boxed, setBoxed] = useState<boolean | null>(null);
  /** Set when the area changes or reading resumes: read whatever is shown next, even if it was read before. */
  const reset = useRef(false);
  useEffect(() => { reset.current = true; }, [rect.x, rect.y, rect.w, rect.h]);

  useEffect(() => {
    let ocr: Awaited<ReturnType<typeof ocrSession>> | null = null;
    let stopTicker = () => {};
    let busy = false;
    let ticking = false;
    // Frames straight from the shared track where the browser can (they keep coming when this page is hidden;
    // a hidden page's video element may stop updating); else from the video element
    const Capture = (window as unknown as { ImageCapture?: new (t: MediaStreamTrack) => Grabber }).ImageCapture;
    let grabber: Grabber | null = null;
    try { grabber = Capture ? new Capture(stream.getVideoTracks()[0]) : null; } catch { grabber = null; }
    let live = true;
    const merger = new CaptionMerger();
    const frame = document.createElement('canvas');
    const lineCanvas = document.createElement('canvas');
    /** The subtitle last seen (its line prints) and the one last read. */
    let shown: LinePrint[] | null = null;
    let read: LinePrint[] | null = null;
    /** When a subtitle box was last seen: for a minute after, only boxes count (no outline method). */
    let boxSeen = 0;
    // The frame analysis runs in a worker (the page stays smooth); where workers can't start, here
    let worker: Worker | null = null;
    try { worker = new Worker(new URL('../core/subtitleWorker.ts', import.meta.url), { type: 'module' }); } catch { worker = null; }
    let asked = 0;
    const waiting = new Map<number, (ex: Extracted) => void>();
    if (worker) {
      worker.onmessage = (e: MessageEvent<{ id: number; ex: Extracted }>) => { waiting.get(e.data.id)?.(e.data.ex); waiting.delete(e.data.id); };
      worker.onerror = () => { worker?.terminate(); worker = null; waiting.clear(); };
    }
    const extract = (img: ImageData, boxesOnly: boolean): Promise<Extracted> => {
      if (!worker) return Promise.resolve(extractSubtitles(img, { boxesOnly }));
      const id = ++asked;
      const w = worker;
      return new Promise((done) => {
        // A worker that stops answering: this frame is analysed here instead
        const t = setTimeout(() => { if (waiting.delete(id)) done(extractSubtitles(img, { boxesOnly })); }, 3000);
        waiting.set(id, (ex) => { clearTimeout(t); done(ex); });
        w.postMessage({ id, img, boxesOnly });
      });
    };
    /**
     * Lines read lately, by print: a line that looks the same as one already read isn't read again. With automatic
     * captions only the growing line changes; the line above it (or the one that scrolled up) is known already.
     */
    const lineCache: { p: LinePrint; text: string; conf: number }[] = [];

    const stop = () => { if (live) onStop(); };

    /**
     * New lines go into the text. Skipped: a line equal (or nearly, OCR wobble) to one of the last two, i.e. the
     * same subtitle read again or a rolling caption showing its previous line again. Short lines that merely occur
     * inside an earlier line are new subtitles ("跳", "好的") and are kept.
     */
    const take = (lines: string[]) => {
      for (const line of lines) {
        const r = merger.add(line);
        if (r === 'skip') { if (bare(line)) setLast({ text: line, note: 'already in the text' }); continue; }
        onLine(line, r === 'replace');
        setLast({ text: line, note: r === 'replace' ? 'added (continues the last line)' : 'added' });
      }
    };

    /** Shows the cleaned lines under the preview, so the learner can check the marked area. */
    const showSeen = (imgs: ImageData[]) => {
      const c = seen.current;
      if (!c) return;
      const w = Math.max(1, ...imgs.map((i) => i.width));
      c.width = w;
      c.height = Math.max(1, imgs.reduce((h, i) => h + i.height, 0));
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, c.width, c.height);
      let y = 0;
      for (const i of imgs) { ctx.putImageData(i, Math.round((w - i.width) / 2), y); y += i.height; }
    };

    const tick = async () => {
      if (ticking) return;
      ticking = true;
      let bitmap: ImageBitmap | null = null;
      try {
        if (grabber && !busy && !pausedRef.current) bitmap = await grabber.grabFrame().catch(() => null);
        await step(bitmap);
      } finally {
        bitmap?.close();
        ticking = false;
      }
    };

    const step = async (bitmap: ImageBitmap | null) => {
      const v = video.current;
      const src: CanvasImageSource | null = bitmap ?? (v && v.videoWidth ? v : null);
      if (!src) return;
      const vw = bitmap ? bitmap.width : v!.videoWidth;
      const vh = bitmap ? bitmap.height : v!.videoHeight;
      if (pausedRef.current || busy || !ocr) return;
      const r = rectRef.current;
      const sw = Math.max(1, Math.round(r.w * vw));
      const sh = Math.max(1, Math.round(r.h * vh));
      const k = Math.min(1, MAX_W / sw);
      frame.width = Math.round(sw * k);
      frame.height = Math.round(sh * k);
      const fx = frame.getContext('2d', { willReadFrequently: true })!;
      fx.drawImage(src, r.x * vw, r.y * vh, sw, sh, 0, 0, frame.width, frame.height);
      const ex = await extract(fx.getImageData(0, 0, frame.width, frame.height), Date.now() - boxSeen < 60_000);
      if (!live || pausedRef.current) return;
      if (ex.boxed) boxSeen = Date.now();
      if (reset.current) { reset.current = false; shown = null; read = null; lineCache.length = 0; }
      if (ex.ink < MIN_INK || !ex.lines.length) { shown = null; read = null; return; }
      // A new subtitle is read once it shows the same in two frames in a row (not half-drawn or fading)
      if (printDiff(shown, ex.prints) > CHANGE) { shown = ex.prints; return; }
      shown = ex.prints;
      if (read && printDiff(read, ex.prints) <= CHANGE) return;
      read = ex.prints;
      busy = true;
      showSeen(ex.lines.map((x) => x.img));
      setBoxed(ex.boxed);
      try {
        const texts: string[] = [];
        for (const [k, line] of ex.lines.entries()) {
          const p = ex.prints[k];
          const hit = lineCache.find((x) => printDiff([x.p], [p]) <= CHANGE);
          if (hit) { if (hit.text && hit.conf >= MIN_CONFIDENCE[ex.boxed ? 'box' : 'outline']) texts.push(hit.text); continue; }
          // Each line at the height OCR reads best
          const z = Math.min(3, Math.max(0.5, OCR_LINE_H / line.h));
          const tmp = document.createElement('canvas');
          tmp.width = line.img.width;
          tmp.height = line.img.height;
          tmp.getContext('2d')!.putImageData(line.img, 0, 0);
          lineCanvas.width = Math.round(line.img.width * z);
          lineCanvas.height = Math.round(line.img.height * z);
          const lx = lineCanvas.getContext('2d')!;
          lx.fillStyle = '#fff';
          lx.fillRect(0, 0, lineCanvas.width, lineCanvas.height);
          lx.drawImage(tmp, 0, 0, lineCanvas.width, lineCanvas.height);
          const res = await ocr.read(lineCanvas);
          const t = clean(res.text.replace(/\n/g, ' '));
          lineCache.unshift({ p, text: t, conf: res.confidence });
          if (lineCache.length > 8) lineCache.pop();
          if (!t) continue;
          if (res.confidence >= MIN_CONFIDENCE[ex.boxed ? 'box' : 'outline']) texts.push(t);
          else setLast({ text: t, note: `not sure enough (${Math.round(res.confidence)}%), skipped` });
        }
        if (live && texts.length) take(texts);
      } catch { /* a frame that couldn't be read: the next one will */ }
      busy = false;
    };

    (async () => {
      const track = stream.getVideoTracks()[0];
      setSource(track.label);
      track.addEventListener('ended', stop);
      const v = video.current!;
      v.srcObject = stream;
      await v.play().catch(() => {});
      try {
        ocr = await ocrSession(l, undefined, true);
      } catch {
        toast('Text recognition could not start. It needs an internet connection the first time.');
        return stop();
      }
      if (!live) { ocr.close(); return; }
      setStatus('watching');
      stopTicker = ticker(TICK_MS, tick);
    })();

    return () => {
      live = false;
      stopTicker();
      stream.getTracks().forEach((t) => t.stop());
      ocr?.close();
      worker?.terminate();
    };
  }, [l, stream]);


  return (
    <div class="card stack live">
      <div class="row" style={{ alignItems: 'center', gap: 8 }}>
        <span class={`live-dot ${status === 'watching' && !paused ? 'on' : ''}`} />
        <b class="grow small">
          {status === 'loading' ? 'Getting text recognition ready…'
            : paused ? 'Paused' : `Reading subtitles${source ? ` from ${source}` : ''}`}
        </b>
        {status === 'watching' && (
          <button class="btn sm" onClick={() => { setPaused(!paused); reset.current = true; }}>
            <Icon name={paused ? 'next' : 'stop'} size={16} />{paused ? 'Resume' : 'Pause'}
          </button>
        )}
        {onPopOut && (
          <button class="btn sm" onClick={onPopOut} disabled={popped} title="A small window with the latest lines that stays in front of the video">
            <Icon name="external" size={16} />{popped ? 'Popped out' : 'Pop out'}
          </button>
        )}
        <button class="btn sm ghost" onClick={onStop}><Icon name="close" size={16} />Stop</button>
      </div>
      <AreaPicker stream={stream} />
      {/* Kept rendered (not display:none) so the browser keeps decoding frames */}
      <video ref={video} muted playsInline class="live-video" />
      <p class="small muted">
        Keep this window visible next to the video (a hidden window is slowed down by the browser). New lines appear
        in the text below.
      </p>
      <div class="live-seen">
        <span class="small muted">
          What Stampify reads{boxed === true ? ' (subtitle box found: only its contents)' : boxed === false ? ' (no subtitle box: text found by its outline)' : ''}:
        </span>
        <canvas ref={seen} />
      </div>
      {last && <p class="small">Last read: <span lang={l}>{last.text}</span> <span class="muted">· {last.note}</span></p>}
    </div>
  );
}
