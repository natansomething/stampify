/**
 * The floating window for live subtitle reading: the latest few lines in a small window that stays in front of the
 * video (Document Picture-in-Picture, Chrome and Edge; elsewhere an ordinary small popup window). Words can be
 * tapped for their meaning and saved, as in the reader. It is rendered by this page (a portal into the other
 * window's document), so it shares the app's state, settings and styles.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import type { LangId, Text, Token } from '../content/types';
import { LANGS } from '../core/langs';
import { lookup, readingOf, rememberToken, tokenId, withArticle, type Lexicon } from '../core/lexicon';
import { wiktionary } from '../core/finder';
import { addWords, award, effCard, inCollection, isMastered, XP } from '../core/progress';
import { speak } from '../core/speech';
import { lang, state, useStore } from '../core/store';
import { canTranslate, startTranslator } from '../core/translate';
import { cls } from '../core/util';
import { isPunct, joinTokens, tokenGap } from '../games/common';
import { Py } from '../ui/components';
import { Icon } from '../ui/icons';
import { heatLevel } from './Reader';
import { useContent } from './shared';
import { Translated, WordTranslation } from './Translated';
import { AreaPicker } from './AreaPicker';
import { MoreToggle, useMore, WordActions, WordDetails } from './WordInfo';

/** How many of the latest lines the window shows. */
const LINES = 4;

/** Text size in the window (rem; every line the same), remembered on this device. */
const SIZE_KEY = 'stampify.floatTextSize';
/** Text sizes (rem), up to twice the old largest; every line is shown at the chosen size. */
const SIZES = [1.1, 1.3, 1.5, 1.75, 2, 2.3, 2.7, 3.1, 3.6, 4.2, 4.8];
const DEFAULT_SIZE = 3;
function loadSize(): number {
  try {
    const v = localStorage.getItem(SIZE_KEY);
    const k = v === null ? NaN : Number(v);
    if (Number.isInteger(k) && k >= 0 && k < SIZES.length) return k;
  } catch { /* storage blocked */ }
  return DEFAULT_SIZE;
}

/** Whether this browser can keep a window in front of all others. */
export const canFloatOnTop = () => 'documentPictureInPicture' in window;

/**
 * Opens the floating window (call it straight from a click: browsers require that) and returns the element to
 * render into, or null when the browser refused.
 */
/** The floating window's usual size, and its size while it shows the caption area picker. */
export const FLOAT_SIZE = { width: 460, height: 250 };
export const FLOAT_PICK_SIZE = { width: 720, height: 560 };

export async function openFloating(onClose: () => void, size = FLOAT_SIZE): Promise<{ win: Window; root: HTMLElement } | null> {
  const dpip = (window as unknown as { documentPictureInPicture?: { requestWindow: (o: { width: number; height: number }) => Promise<Window> } }).documentPictureInPicture;
  let win: Window | null = null;
  try {
    win = dpip ? await dpip.requestWindow(size) : window.open('', 'stampify-floating', `popup,width=${size.width},height=${size.height + 30}`);
  } catch {
    win = null;
  }
  if (!win) return null;
  return { win, root: prepareWindow(win, 'floating', onClose) };
}

/**
 * The window that picks the caption area: a plain pop-up, opened right from a click (in the floating window: the
 * click counts for the page that opened it).
 */
export function openAreaWindow(onClose: () => void): { win: Window; root: HTMLElement } | null {
  let win: Window | null = null;
  try { win = window.open('', 'stampify-area', 'popup,width=820,height=620'); } catch { win = null; }
  if (!win) return null;
  return { win, root: prepareWindow(win, 'area-window', onClose) };
}

/** Gives a new window the app's styles and theme and an empty root to render into. */
function prepareWindow(win: Window, bodyClass: string, onClose: () => void): HTMLElement {
  const doc = win.document;
  doc.title = 'Stampify';
  // The app's styles and fonts (links made absolute: the new window has no address of its own)
  doc.head.querySelectorAll('style, link[rel=stylesheet]').forEach((n) => n.remove());
  document.querySelectorAll<HTMLLinkElement | HTMLStyleElement>('link[rel=stylesheet], style').forEach((n) => {
    const c = n.cloneNode(true) as HTMLLinkElement | HTMLStyleElement;
    if (n instanceof HTMLLinkElement) (c as HTMLLinkElement).href = n.href;
    doc.head.appendChild(c);
  });
  const theme = document.documentElement.getAttribute('data-theme');
  if (theme) doc.documentElement.setAttribute('data-theme', theme);
  doc.body.className = bodyClass;
  doc.body.replaceChildren();
  const root = doc.createElement('div');
  doc.body.appendChild(root);
  win.addEventListener('pagehide', onClose);
  return root;
}

/** Google Translate's code for each language. */
const GT: Record<LangId, string> = { de: 'de', zh: 'zh-CN', es: 'es', fr: 'fr', it: 'it', pt: 'pt', nl: 'nl', pl: 'pl', ru: 'ru', ja: 'ja', ko: 'ko', hu: 'hu' };
/**
 * A link that opens Google Translate on this text, into English. The simple mobile page (/m?…&q=) shows the
 * translation of the given text straight away on phones too; the full site's address is often opened by the app or
 * a fresh page without the text.
 */
export const googleTranslate = (l: LangId, text: string) =>
  `https://translate.google.com/m?sl=${GT[l]}&tl=en&hl=en&q=${encodeURIComponent(text)}`;

/** Copies text, from whichever window the button is in (the floating window has its own clipboard access). */
export async function copyText(from: Element, text: string): Promise<boolean> {
  const win = from.ownerDocument.defaultView ?? window;
  try {
    await win.navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older way: select a hidden text box and copy
    const doc = from.ownerDocument;
    const ta = doc.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    doc.body.appendChild(ta);
    ta.select();
    const ok = doc.execCommand('copy');
    ta.remove();
    return ok;
  }
}

const TR_KEY = 'stampify.floatTranslate';

/** Listen, copy and translate buttons beside a line. */
function LineTools({ l, text }: { l: LangId; text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <span class="float-tools">
      <button class="float-btn" onClick={() => speak(l, text)} title="Listen to the sentence" aria-label="Listen to the sentence">
        <Icon name="speaker" size={14} />
      </button>
      <button class="float-btn" title="Copy the sentence" aria-label="Copy the sentence"
        onClick={async (e) => { if (await copyText(e.currentTarget as Element, text)) { setCopied(true); setTimeout(() => setCopied(false), 1500); } }}>
        <Icon name={copied ? 'check' : 'copy'} size={14} />
      </button>
      <a class="float-btn" href={googleTranslate(l, text)} target="_blank" rel="noopener" title="Translate with Google Translate" aria-label="Translate with Google Translate">
        <Icon name="translate" size={14} />
      </a>
    </span>
  );
}

export function Floating({ l, text, onPickArea, picking }: {
  l: LangId;
  text: Text | null;
  /** Opens the window that picks the caption area (while live reading is on). */
  onPickArea?: () => void;
  /** At the start of live reading: the caption area picker, shown here first, and what Done does. */
  picking?: { stream: MediaStream; onDone: () => void } | null;
}) {
  useStore();
  const data = useContent(l);
  const [size, setSize] = useState(loadSize);
  /** Translations under the lines: off, starting (model downloading: progress 0-1), on, or not possible here. */
  const [tr, setTr] = useState<{ state: 'off' | 'starting' | 'on' | 'unavailable'; progress?: number }>({ state: 'off' });
  // Translations were on last time: back on by themselves if the language model is already on the device
  useEffect(() => {
    let on = false;
    try { on = localStorage.getItem(TR_KEY) === '1'; } catch { /* storage blocked */ }
    if (on && canTranslate()) startTranslator(l).then((st) => setTr({ state: st === 'ready' ? 'on' : 'off' }));
  }, [l]);
  const toggleTranslate = async (e: Event) => {
    const on = tr.state !== 'on' && tr.state !== 'starting';
    try { localStorage.setItem(TR_KEY, on ? '1' : '0'); } catch { /* storage blocked */ }
    if (!on) { setTr({ state: 'off' }); return; }
    setTr({ state: 'starting', progress: 0 });
    // The click is in the floating window: its own translator can download a model (that needs a click)
    const st = await startTranslator(l, { win: (e.currentTarget as Element).ownerDocument.defaultView, clicked: true, progress: (p) => setTr({ state: 'starting', progress: p }) });
    setTr({ state: st === 'ready' ? 'on' : 'unavailable' });
  };
  const resize = (d: number) => {
    const k = Math.min(SIZES.length - 1, Math.max(0, size + d));
    setSize(k);
    try { localStorage.setItem(SIZE_KEY, String(k)); } catch { /* storage blocked */ }
  };
  /** The tapped word: its sentence (in the whole text) and token. */
  const [sel, setSel] = useState<{ si: number; ti: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const count = text?.s.length ?? 0;

  // Clicking anywhere outside the floating window (the video, another window) closes the open word
  useEffect(() => {
    const win = box.current?.ownerDocument.defaultView;
    if (!win || win === window) return;
    const close = () => setSel(null);
    win.addEventListener('blur', close);
    return () => win.removeEventListener('blur', close);
  }, [!!data]);

  // The word panel opens above the lines: the lines are scrolled by its height (and by any change of it), so the
  // text stays where it was on screen instead of being pushed down
  const panel = useRef<HTMLDivElement>(null);
  const panelH = useRef(0);
  useLayoutEffect(() => {
    const h = panel.current?.offsetHeight ?? 0;
    if (h !== panelH.current && box.current) box.current.scrollTop += h - panelH.current;
    panelH.current = h;
  });

  // Esc closes the open word (pressed in the floating window or on the page)
  useEffect(() => {
    if (!sel) return;
    const win = box.current?.ownerDocument.defaultView;
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setSel(null); };
    const wins = [...new Set([window, win].filter(Boolean) as Window[])];
    wins.forEach((w) => w.addEventListener('keydown', key));
    return () => wins.forEach((w) => w.removeEventListener('keydown', key));
  }, [!!sel]);

  // New lines scroll into view (unless a word is open)
  useEffect(() => {
    if (!sel && box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [count, sel]);

  if (!data) return null;
  const { lx } = data;
  const m = LANGS[l];
  const showPy = !!m.reading && state.settings.showReading;
  const heat = !!state.settings.heatmap;
  const from = Math.max(0, count - LINES);
  const sents = text ? text.s.slice(from) : [];
  const tok: Token | null = sel && text?.s[sel.si]?.t[sel.ti] ? text.s[sel.si].t[sel.ti] : null;

  if (picking) return (
    <div class="float-pick" lang={l}>
      <h2>Where are the captions?</h2>
      <AreaPicker stream={picking.stream} />
      <button class="btn primary" onClick={(e) => {
        // Back to the usual size (allowed right after a click)
        try { (e.currentTarget as Element).ownerDocument.defaultView?.resizeTo(FLOAT_SIZE.width, FLOAT_SIZE.height + 30); } catch { /* not allowed here */ }
        picking.onDone();
      }}><Icon name="check" size={18} />Done</button>
    </div>
  );

  return (
    <div class="float" lang={l}>
      <div class="float-bar">
        <span class={cls('live-dot', 'on')} />
        <span class="small muted grow">Live subtitles</span>
        {canTranslate() && (
          <button class={cls('float-btn', tr.state === 'on' && 'on')} onClick={toggleTranslate} disabled={tr.state === 'unavailable'}
            title={tr.state === 'unavailable' ? "Your browser can't translate this language on this device" : tr.state === 'on' ? 'Hide translations' : 'Show English translations (made on this device)'}
            aria-label="Translations">
            {tr.state === 'starting' ? <span class="small">{Math.round((tr.progress ?? 0) * 100)}%</span> : 'EN'}
          </button>
        )}
        <button class="float-btn" onClick={() => resize(-1)} disabled={size === 0} title="Smaller text" aria-label="Smaller text">A<sub>−</sub></button>
        <button class="float-btn" onClick={() => resize(1)} disabled={size === SIZES.length - 1} title="Bigger text" aria-label="Bigger text">A<sup>+</sup></button>
        {onPickArea && (
          <button class="float-btn" onClick={onPickArea} title="Choose where the captions are" aria-label="Choose the caption area"><Icon name="target" size={16} /></button>
        )}
      </div>
      {tok && <div ref={panel}><WordPanel l={l} lx={lx} t={tok} onClose={() => setSel(null)} top /></div>}
      {/* A click on empty space (not a word or a button) closes the open word too */}
      <div class={cls('float-lines', m.cjk && 'cjk')} ref={box} style={{ fontSize: `${SIZES[size]}rem` }}
        onClick={(e) => { if (!(e.target as Element).closest('button, a')) setSel(null); }}>
        {!sents.length && <p class="muted small">Waiting for subtitles…</p>}
        {sents.map((s, k) => {
          const si = from + k;
          return (
            <div key={si} class={cls('float-line', si === count - 1 && 'newest')}>
              <span class="float-text">
              {s.t.map((t, ti) => {
                const space = tokenGap(l, s.t[ti - 1]?.[0], t[0]);
                if (isPunct(t)) return <span key={ti}>{space}{t[0]}</span>;
                const h = heat ? heatLevel(l, lx, t) : null;
                const on = sel?.si === si && sel.ti === ti;
                return (
                  <span key={ti}>
                    {space}
                    <button class={cls('tok', showPy && 'rw', inCollection(l, tokenId(lx, t)) && 'saved', on && 'sel', h !== null && `heat h${h}`)}
                      onClick={() => setSel(on ? null : { si, ti })}>
                      {showPy ? <><span class="py">{t[1] ? <Py text={t[1]} /> : ' '}</span><span>{t[0]}</span></> : t[0]}
                    </button>
                  </span>
                );
              })}
              {tr.state === 'on' && <Translated l={l} text={joinTokens(l, s.t)} class="float-tr" />}
              </span>
              <LineTools l={l} text={joinTokens(l, s.t)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * The tapped word: dictionary form, reading, meaning (or a machine translation), and what can be done with it.
 * The arrow opens the rest (characters, examples, Write / I know it), inline because the floating window and
 * fullscreen video can't show the app's pop-up. `top`: in the floating window (no Write: it would leave the page).
 */
export function WordPanel({ l, lx, t, onClose, top = false }: { l: LangId; lx: Lexicon; t: Token; onClose: () => void; top?: boolean }) {
  useStore();
  const m = LANGS[l];
  const e = lookup(lx, t);
  const wid = tokenId(lx, t);
  const card = lang(l).cards[wid];
  const r = e ? readingOf(l, e) : t[1];
  const [more, toggleMore] = useMore();
  const save = () => { if (!e) return; rememberToken(lx, t, e.lv); if (addWords(l, [wid])) award(l, XP.save); };
  return (
    <div class={cls('float-word', top && 'top')}>
      {/* One line: the word, its reading and meaning, then what can be done with it (wraps when narrow) */}
      <div class="float-word-row">
        <b class={cls('w', m.cjk && 'cjk')} lang={l}>{e ? withArticle(l, e) : t[0]}</b>
        {e && <MoreToggle more={more} onToggle={toggleMore} />}
        {r && <span class="small mono"><Py text={r} /></span>}
        <span class="float-word-en small">{e ? t[2] : <span class="muted">Not in Stampify's word list</span>}</span>
        <span class="float-word-btns">
          {e && (card
            ? <span class="badge ok">{isMastered(effCard(l, wid, card)!) ? 'Mastered' : 'Saved'}</span>
            : <button class="btn sm primary" onClick={save}><Icon name="plus" size={14} />Save</button>)}
          <button class="btn sm" onClick={() => speak(l, e?.w ?? t[0])} aria-label="Listen" title="Listen"><Icon name="speaker" size={14} /></button>
          <a class="btn sm" href={wiktionary(l, e?.w ?? t[0])} target="_blank" rel="noopener" aria-label="Wiktionary" title="Open in Wiktionary"><Icon name="external" size={14} /></a>
          <button class="btn sm ghost" onClick={onClose} aria-label="Close" title="Close (Esc)"><Icon name="close" size={14} /></button>
        </span>
      </div>
      {!e && <WordTranslation l={l} word={t[0]} />}
      {e && more && (
        <div class="float-more stack">
          {e.en !== t[2] && <div class="small muted">Dictionary: {e.en}</div>}
          <WordDetails l={l} e={e} link={false} />
          <WordActions l={l} id={wid} w={e.w} onSave={save} prep={() => rememberToken(lx, t, e.lv)} noWrite={top} />
        </div>
      )}
    </div>
  );
}
