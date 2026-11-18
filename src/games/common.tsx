/** Helpers shared by the games. */
import { useEffect, useRef, useState } from 'preact/hooks';
import type { LangId, Sentence, Token } from '../content/types';
import { inBand, LANGS } from '../core/langs';
import { firstSense, tokenId, type Entry } from '../core/lexicon';
import { state, type Card } from '../core/store';
import { dueNow, isMastered, isNew, SENTENCES, WORDS, wordCard, type Scale } from '../core/progress';
import { cls, distractors, shuffle } from '../core/util';
import type { Ctx } from './types';

export const isPunct = (t: Token) => /^[\p{P}\p{S}\s]+$/u.test(t[0]);

/** Options for a multiple-choice question: the target plus distractors (same part of speech first). */
export function choices(target: Entry, pool: Entry[], key: (e: Entry) => string, n = 4): { opts: Entry[]; ans: number } {
  const same = pool.filter((e) => e.pos === target.pos);
  let ds = distractors(same.length >= n ? same : pool, target, n - 1, key);
  if (ds.length < n - 1) ds = [...ds, ...distractors(pool, target, n - 1 - ds.length, key).filter((d) => !ds.includes(d))];
  const opts = shuffle([target, ...ds]);
  return { opts, ans: opts.indexOf(target) };
}

export const meaning = (e: Entry) => firstSense(e.en);

/** Indexes of the tokens of s that are words in the learner's collection. */
export function collectedTokens(ctx: Ctx, s: Sentence): number[] {
  const cards = state.langs[ctx.lang]?.cards || {};
  return s.t.flatMap((t, i) => (!isPunct(t) && cards[tokenId(ctx.lx, t)] ? [i] : []));
}

/**
 * Sentences in the current band (falls back to all sentences if the band has none).
 * In "My words" mode: the sentences of any level that use a collected word.
 */
export function bandSentences(ctx: Ctx, filter: (s: Sentence) => boolean = () => true): Sentence[] {
  const all = ctx.c.sentences.filter(filter);
  if (ctx.mine) return all.filter((s) => collectedTokens(ctx, s).length);
  const inb = all.filter((s) => inBand(s.lv, ctx.band));
  return inb.length >= 3 ? inb : all;
}

/**
 * Spaced repetition in games: due and new items first (in random order), then, only to fill the game, the items
 * that come back soonest; mastered ones last. The picked items are shuffled.
 */
function pickDue<T>(pool: T[], n: number, card: (x: T) => Card | undefined, s: Scale): T[] {
  const due: T[] = [];
  const fresh: T[] = [];
  const later: [T, number][] = [];
  const mastered: T[] = [];
  for (const x of pool) {
    const c = card(x);
    if (!c) fresh.push(x);
    else if (isMastered(c, s)) mastered.push(x);
    else if (dueNow(c, s)) due.push(x);
    else if (isNew(c, s)) fresh.push(x);
    else later.push([x, c[1]]);
  }
  later.sort((a, b) => a[1] - b[1]);
  const picked = [...shuffle(due), ...shuffle(fresh), ...later.map(([x]) => x), ...shuffle(mastered)].slice(0, n);
  return shuffle(picked);
}

/** Words for a game: due first, then new (never practised), then the ones that come back soonest. */
export function pickWords(ctx: Pick<Ctx, 'lang'>, pool: Entry[], n: number): Entry[] {
  return pickDue(pool, n, (e) => wordCard(ctx.lang, e.id), WORDS);
}

/** Sentences for a game, on the sentence scale: due first, then new, then the ones that come back soonest. */
export function pickSentences<T extends { id: string }>(ctx: Ctx, pool: T[], n: number): T[] {
  const cards = state.langs[ctx.lang]?.sents || {};
  return pickDue(pool, n, (s) => cards[s.id], SENTENCES);
}

const NNBSP = '\u202f';

/** What goes between two tokens of running text: a space, nothing, or (French) a narrow space before ! ? ; : and inside « ». */
export function tokenGap(lang: LangId, prev: string | undefined, w: string): string {
  if (!prev || !LANGS[lang].spaced) return '';
  if (lang === 'fr') {
    if (/^[!?;:»]/.test(w) || /«$/.test(prev)) return NNBSP;
  }
  // Elided articles join the next word (l'eau, dell'acqua); Italian po' (un po' di) is a whole word
  const elided = /['’]$/.test(prev) && !/^(po|mo|be|fa|sta|va|da|di)['’]$/i.test(prev);
  if (/^[.,!?;:)»”…]/.test(w) || /[¿¡(«“„]$/.test(prev) || elided) return '';
  return ' ';
}

/** Joins tokens as running text (spaces between words except in zh/ja; French punctuation spacing). */
export function joinTokens(lang: LangId, toks: Token[] | string[]): string {
  const words = toks.map((t) => (typeof t === 'string' ? t : t[0]));
  return words.map((w, i) => tokenGap(lang, words[i - 1], w) + w).join('');
}

/** Text input with a Check button. Enter checks. Shows ok/bad colour after checking. */
export function TypeBox({ onCheck, state: st, placeholder, lang }: {
  onCheck: (value: string) => void;
  state?: 'ok' | 'bad' | null;
  placeholder?: string;
  lang?: LangId;
}) {
  const [v, setV] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  const locked = !!st;
  return (
    <form class="stack" onSubmit={(e) => { e.preventDefault(); if (!locked && v.trim()) onCheck(v); }}>
      <input
        ref={ref} type="text" value={v} lang={lang} class={cls(st)} disabled={locked}
        placeholder={placeholder || 'Type your answer'} autoComplete="off" autoCapitalize="off" spellcheck={false}
        onInput={(e) => setV((e.target as HTMLInputElement).value)}
      />
      {!locked && <button class="btn primary block" type="submit" disabled={!v.trim()}>Check</button>}
    </form>
  );
}

/** Special characters keyboard row for languages whose letters are missing from many keyboards. */
export function CharRow({ lang, onChar }: { lang: LangId; onChar: (c: string) => void }) {
  const chars = LANGS[lang].chars;
  if (!chars?.length) return null;
  return (
    <div class="pills" style={{ justifyContent: 'center' }}>
      {chars.map((c) => <button type="button" class="pill" key={c} onMouseDown={(e) => e.preventDefault()} onClick={() => onChar(c)}>{c}</button>)}
    </div>
  );
}

/** TypeBox with the special-character row wired in. */
export function TypeAnswer(props: { onCheck: (v: string) => void; state?: 'ok' | 'bad' | null; placeholder?: string; lang: LangId }) {
  const [k, setK] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const insert = (c: string) => {
    const input = wrap.current?.querySelector('input');
    if (!input) return;
    const s = input.selectionStart ?? input.value.length;
    const e = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, s) + c + input.value.slice(e);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
    input.setSelectionRange(s + c.length, s + c.length);
    setK(k + 1);
  };
  return (
    <div ref={wrap} class="stack">
      <TypeBox {...props} />
      {!props.state && <CharRow lang={props.lang} onChar={insert} />}
    </div>
  );
}
