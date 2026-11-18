import { createContext, type ComponentChildren } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import type { LangId } from '../content/types';
import type { Entry } from '../core/lexicon';
import { bandLabel, LANG_IDS, LANGS } from '../core/langs';
import { readingOf, withArticle } from '../core/lexicon';
import { dueCount } from '../core/progress';
import { speak } from '../core/speech';
import { state } from '../core/store';
import { cls, shuffle } from '../core/util';
import { Icon } from './icons';
import { dismiss, onToasts, type ToastMsg } from './toast';

/** A reading (pinyin, kana, romanization), kept as one place to style readings. */
export function Py({ text }: { text: string }) {
  return <span class="py-text">{text}</span>;
}

/** Size classes for a big CJK word, so long katakana or Hangul words still fit a phone screen. */
export function cjkWord(lang: LangId, w: string): string {
  if (!LANGS[lang].cjk) return 'word';
  const n = [...w].length;
  return cls('word cjk', n > 7 ? 'xlong' : n > 4 && 'long');
}

/** A word with its reading (zh/ja/ko) or article (nouns in languages with articles). */
export function WordView({ lang, e, big, reading = true }: { lang: LangId; e: Entry; big?: boolean; reading?: boolean }) {
  const cjk = LANGS[lang].cjk;
  const r = readingOf(lang, e);
  return (
    <div>
      <div class={cjkWord(lang, e.w)} lang={lang} style={big ? undefined : { fontSize: cjk ? '1.4rem' : '1.1rem' }}>
        {withArticle(lang, e)}
      </div>
      {reading && r && <div class="reading"><Py text={r} /></div>}
    </div>
  );
}

export function SpeakBtn({ lang, text, label = 'Listen', small }: { lang: LangId; text: string; label?: string; small?: boolean }) {
  return (
    <button class={small ? 'icon-btn' : 'btn sm'} onClick={(ev) => { ev.stopPropagation(); speak(lang, text); }} aria-label={label} title={label}>
      <Icon name="speaker" size={small ? 20 : 18} />{!small && <span>{label}</span>}
    </button>
  );
}

export function Bar({ value, max, kind, thin }: { value: number; max: number; kind?: string; thin?: boolean }) {
  return <div class={cls('bar', kind, thin && 'thin')}><i style={{ width: `${Math.min(100, max ? (value / max) * 100 : 0)}%` }} /></div>;
}

export function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return <button class={cls('switch', on && 'on')} role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} />;
}

export function Toasts() {
  const [items, set] = useState<ToastMsg[]>([]);
  useEffect(() => onToasts(set), []);
  return (
    <div class="toasts" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} class={cls('toast', t.kind, t.action && 'has-action')}>
          <span>{t.text}</span>
          {t.action && <button class="toast-btn" onClick={() => { dismiss(t.id); t.action!.run(); }}>{t.action.label}</button>}
        </div>
      ))}
    </div>
  );
}

/** Empty state: a round ink stamp with an icon, a title and a hint. */
export function Empty({ icon, title, children }: { icon: string; title: string; children?: ComponentChildren }) {
  return (
    <div class="empty card">
      <span class="ink-stamp violet" style={{ width: 72, height: 72, transform: 'rotate(-8deg)' }}><Icon name={icon} size={30} /></span>
      <h2>{title}</h2>
      <div class="muted" style={{ marginTop: 6 }}>{children}</div>
    </div>
  );
}

export function Loading() {
  return <div class="empty muted">Loading…</div>;
}

export function Back({ href, label = 'Back' }: { href: string; label?: string }) {
  return <a class="icon-btn plain" href={href} aria-label={label} title={label}><Icon name="close" /></a>;
}

/** A text or dialogue in a list: level badge, titles and a progress bar (done = full and ticked). */
export function ProgressItem({ href, lang, level, title, sub, meta, value, max, done }: {
  href: string; lang: LangId; level: string; title: string; sub: string; meta: string; value: number; max: number; done: boolean;
}) {
  const pct = done ? 100 : Math.round((Math.min(value, max) / max) * 100);
  return (
    <a class={cls('card card-link text-item', done && 'done')} href={href}>
      <div class="lv">{done ? <Icon name="check" size={22} label="Finished" /> : level.replace(/^([A-Z]{3,}) /, '$1\n')}</div>
      <div class="grow">
        <h3 lang={lang}>{title}</h3>
        <p class="small muted">{sub}</p>
        <p class="small muted">{meta}</p>
        <div class="row small" style={{ gap: 8, marginTop: 6 }}>
          <div class="grow"><Bar value={pct} max={100} kind={done ? 'ok' : 'rose'} thin /></div>
          <span class="mono muted" style={{ minWidth: 38, textAlign: 'right', fontSize: '0.75rem' }}>{pct ? `${pct}%` : 'new'}</span>
        </div>
      </div>
    </a>
  );
}

/** Every language as a passport row (the language picker and the first-run page): started ones first. */
export function LangList({ current, href, onPick }: { current?: LangId; href: (l: LangId) => string; onPick?: () => void }) {
  // Started languages, last visited first
  const recent = state.settings.recent || [];
  const rank = (l: LangId) => (recent.includes(l) ? recent.indexOf(l) : recent.length);
  const started = LANG_IDS.filter((l) => state.langs[l]).sort((a, b) => rank(a) - rank(b));
  const others = LANG_IDS.filter((l) => !state.langs[l]);
  const row = (l: LangId) => {
    const m = LANGS[l];
    const ls = state.langs[l];
    const { due, fresh } = dueCount(l);
    return (
      <a key={l} class={cls('lang-row', l === current && 'on')} href={href(l)} onClick={onPick} style={{ '--accent': m.color }}>
        <span class="booklet lg" lang={l}>{m.badge}</span>
        <div class="grow">
          <h3>{m.name} <span class="muted" lang={l} style={{ fontWeight: 500 }}>{m.native}</span></h3>
          <p class="small muted">{ls ? `${bandLabel(l, ls.band)} · ${Object.keys(ls.cards).length} words · ${ls.xp} XP` : 'New passport'}</p>
        </div>
        {due + fresh > 0 && <span class="badge accent">{due + fresh} to review</span>}
      </a>
    );
  };
  return (
    <div class="lang-list">
      {started.map(row)}
      {started.length > 0 && others.length > 0 && <h3 class="label" style={{ margin: '10px 0 2px' }}>More languages</h3>}
      {others.map(row)}
    </div>
  );
}

/** Keyboard shortcut helper: active while the component is mounted. */
export function useKeys(handler: (e: KeyboardEvent) => void, deps: unknown[]) {
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) return;
      handler(e);
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** True while a game session is replaying a round the learner got wrong (set by Session). */
export const RetryRound = createContext(false);

/**
 * Multiple-choice buttons. Reveals right/wrong after a pick, then calls onDone.
 * Number keys 1-n pick an option. Give it a new `key` per round.
 * Options are shuffled (content files often list the right answer first, and a retry must not be remembered by
 * position); `fixedOrder` keeps meaningful orders (tones 1-4, der/die/das).
 */
export function Choice({ options, answer, onDone, cjk, columns, fixedOrder }: {
  options: ComponentChildren[];
  answer: number;
  onDone: (ok: boolean, picked: number) => void;
  /** The options are words in this CJK language: large type in its font, centred. */
  cjk?: LangId;
  columns?: 1 | 2;
  fixedOrder?: boolean;
}) {
  const order = useMemo(() => (fixedOrder ? options.map((_, i) => i) : shuffle(options.map((_, i) => i))), []);
  const [picked, setPicked] = useState<number | null>(null);
  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    onDone(i === answer, i);
  };
  useKeys((e) => {
    const n = +e.key;
    if (n >= 1 && n <= options.length) choose(order[n - 1]);
  }, [picked, options.length]);
  return (
    <div class={cls('options', columns === 2 && 'two')}>
      {order.map((i, pos) => (
        <button
          key={i}
          class={cls('opt', cjk && 'cjk-opt', picked !== null && i === answer && 'right', picked === i && i !== answer && 'wrong')}
          lang={cjk} disabled={picked !== null}
          onClick={() => choose(i)}
        >
          {!cjk && columns !== 2 && <span class="k">{pos + 1}</span>}
          <span class="grow">{options[i]}</span>
        </button>
      ))}
    </div>
  );
}

export const showReading = () => state.settings.showReading;
