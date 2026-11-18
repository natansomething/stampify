/** Example sentences for a word: its own `ex` from the vocabulary, then sentences from texts and the sentence pool. */
import type { Content, LangId, Token } from '../content/types';
import { isPunct, joinTokens } from '../games/common';
import { LANGS } from './langs';
import { tokenId, type Entry, type Lexicon } from './lexicon';
import { stems } from './util';

export interface Example {
  /** The sentence in pieces; `hit` pieces are the word itself (shown in bold). */
  parts: { s: string; hit?: boolean }[];
  /** zh/ja/ko: the reading of the sentence. */
  r?: string;
  en: string;
  /** Plain sentence, for speech. */
  text: string;
  /** Title of the text it comes from. */
  from?: string;
}

const index = new Map<LangId, Map<string, { t: Token[]; en: string; lv: number; from?: string }[]>>();

/** Word id -> corpus sentences that use it, shortest first. Built once per language. */
function corpus(l: LangId, c: Content, lx: Lexicon) {
  let m = index.get(l);
  if (m) return m;
  m = new Map();
  const add = (t: Token[], en: string, lv: number, from?: string) => {
    for (const id of new Set(t.filter((x) => !isPunct(x)).map((x) => tokenId(lx, x)))) {
      const list = m!.get(id) || [];
      list.push({ t, en, lv, from });
      m!.set(id, list);
    }
  };
  c.texts.forEach((x) => x.s.forEach((s) => add(s.t, s.en, x.lv, x.titleEn)));
  c.sentences.forEach((s) => add(s.t, s.en, s.lv));
  for (const list of m.values()) list.sort((a, b) => a.t.length - b.t.length);
  index.set(l, m);
  return m;
}

/**
 * Splits a written sentence around the word: exact match for zh, the word without its inflecting last kana for ja,
 * word-start match for languages with spaces (inflected forms).
 */
function mark(l: LangId, s: string, w: string, verb: boolean): Example['parts'] {
  if (!LANGS[l].spaced) {
    const k = l === 'ja' && w.length > 1 && /\p{Script=Hiragana}$/u.test(w) ? w.slice(0, -1) : w;
    return s.split(k).flatMap((p, i) => (i ? [{ s: k, hit: true }, { s: p }] : [{ s: p }])).filter((p) => p.s);
  }
  const st = stems(w, verb);
  return s.split(/(\p{L}+)/u).filter(Boolean).map((p) => ({ s: p, hit: st.some((x) => p.toLowerCase().startsWith(x)) || undefined }));
}

/** The reading line of a tokenized sentence: zh pinyin by word, ja kana without spaces, ko romanization. */
export function sentenceReading(l: LangId, t: Token[]): string | undefined {
  if (!LANGS[l].reading) return undefined;
  if (l === 'ja') return t.map((x) => x[1] || x[0]).join('');
  return t.map((x) => x[1] || x[0]).join(' ').replace(/ ([,.!?;:，。！？；：、”）])/g, '$1');
}

export function examples(l: LangId, c: Content, lx: Lexicon, e: Entry, max = 2): Example[] {
  const out: Example[] = [];
  if (e.ex) {
    const [s, en, r] = e.ex;
    out.push({ parts: mark(l, s, e.w, e.pos === 'v'), r, en, text: s });
  }
  for (const x of corpus(l, c, lx).get(e.id) || []) {
    if (out.length >= max) break;
    const text = joinTokens(l, x.t);
    // A beginner word gets beginner sentences, not a line from an advanced essay
    if (x.lv > e.lv + 1 || x.t.length > 25 || out.some((o) => o.text === text)) continue;
    const parts: Example['parts'] = [];
    x.t.forEach((t, k) => {
      if (k > 0) { const gap = joinTokens(l, [x.t[k - 1][0], t[0]]).slice(x.t[k - 1][0].length, -t[0].length || undefined); if (gap) parts.push({ s: gap }); }
      parts.push({ s: t[0], hit: (!isPunct(t) && tokenId(lx, t) === e.id) || undefined });
    });
    const r = sentenceReading(l, x.t);
    out.push({ parts, r, en: x.en, text, from: x.from });
  }
  return out;
}
