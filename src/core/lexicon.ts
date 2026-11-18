/** Word lookup for a language: the vocabulary file plus words the user saved from texts. */
import type { Content, LangId, Pos, Token, Topic, Word } from '../content/types';
import { inBand, LANGS, type Band } from './langs';
import { lang, state } from './store';
import { registerLevels } from './progress';
import { plain, splitSyllables } from './pinyin';

export interface Entry {
  id: string;
  w: string;
  r?: string;
  en: string;
  lv: number;
  pos?: Pos;
  g?: Word['g'];
  pl?: string;
  art?: string;
  mw?: string;
  t?: Topic;
  ex?: Word['ex'];
  syn?: string[];
  /** Saved from a text, not in the vocabulary file. */
  extra?: boolean;
  /** zh: a character used mainly inside compounds (look-ups only, not in games). */
  bound?: boolean;
}

export interface Lexicon {
  lang: LangId;
  vocab: Entry[];
  byId: Map<string, Entry>;
  byLower: Map<string, Entry>;
}

const cache = new Map<LangId, Lexicon>();

export function lexicon(l: LangId, c: Content): Lexicon {
  let lx = cache.get(l);
  if (lx) return lx;
  const vocab: Entry[] = c.vocab.map((v) => ({ ...v, id: v.id ?? v.w }));
  const byId = new Map(vocab.map((e) => [e.id, e]));
  const byLower = new Map<string, Entry>();
  for (const e of vocab) if (!byLower.has(e.w.toLowerCase())) byLower.set(e.w.toLowerCase(), e);
  lx = { lang: l, vocab, byId, byLower };
  cache.set(l, lx);
  registerLevels(l, vocab);
  return lx;
}

const byWord = new WeakMap<Lexicon, Map<string, Entry[]>>();

/** All dictionary entries spelled exactly `w` (homographs included). */
export function entriesFor(lx: Lexicon, w: string): Entry[] {
  let m = byWord.get(lx);
  if (!m) {
    m = new Map();
    for (const e of lx.vocab) { const a = m.get(e.w); if (a) a.push(e); else m.set(e.w, [e]); }
    byWord.set(lx, m);
  }
  return m.get(w) || [];
}

/**
 * zh: the single characters of a multi-character word that have their own dictionary entry, in order, each once.
 * When the word's pinyin lines up with its characters, only entries with that character's reading in the word are
 * kept (行 in 银行 is háng, not xíng), so a character whose reading there has no entry is skipped; otherwise all of
 * its entries are shown. Characters without an entry are skipped, and so is the erhua 儿 (一点儿 yīdiǎnr).
 */
export function characters(lx: Lexicon, e: { w: string; r?: string }): { ch: string; entries: Entry[] }[] {
  const all = [...e.w];
  const han = (ch: string) => /\p{Script=Han}/u.test(ch);
  if (all.filter(han).length < 2) return [];
  const syl = e.r ? splitSyllables(e.r) : [];
  // Erhua: the final 儿 has no syllable of its own
  const erhua = all.length > 1 && all[all.length - 1] === '儿' && syl.length === all.length - 1;
  const chars = erhua ? all.slice(0, -1) : all;
  const aligned = syl.length === chars.length;
  const out: { ch: string; entries: Entry[] }[] = [];
  chars.forEach((ch, i) => {
    if (!han(ch) || out.some((o) => o.ch === ch)) return;
    const found = entriesFor(lx, ch);
    if (!found.length) return;
    if (!aligned) { out.push({ ch, entries: found.slice(0, 3) }); return; }
    const s = syl[i];
    const exact = found.filter((x) => x.r === s);
    const toneless = found.filter((x) => x.r && plain(x.r) === plain(s));
    const keep = exact.length ? exact : toneless;
    if (keep.length) out.push({ ch, entries: keep.slice(0, 3) });
  });
  return out;
}

/** Measure words whose dictionary entry has another reading than the one used as a measure word (一杆枪 gǎn). */
const MW_READING: Record<string, string> = { 杆: 'gǎn' };

/** zh: the pinyin of a noun's measure word (from its own dictionary entry), e.g. "tiáo" for 条. */
export function mwReading(lx: Lexicon, mw: string): string | undefined {
  return MW_READING[mw] ?? lx.byId.get(mw)?.r;
}

/** Entry for a collected id: vocabulary first, then the user's saved extras. */
export function entry(lx: Lexicon, id: string): Entry | undefined {
  const v = lx.byId.get(id);
  if (v) return v;
  const x = state.langs[lx.lang]?.extra[id];
  return x ? { id, w: x[0], r: x[1] || undefined, en: x[2], lv: x[3], extra: true } : undefined;
}

/** Vocabulary entry for a token (by lemma, then surface; case-insensitive). */
export function lookup(lx: Lexicon, tok: Token): Entry | undefined {
  const lemma = tok[3] ?? tok[0];
  return lx.byId.get(lemma) || lx.byLower.get(lemma.toLowerCase()) || lx.byLower.get(tok[0].toLowerCase());
}

/** The id a token is saved under: its vocabulary entry, or the lemma itself (stored as an extra). */
export function tokenId(lx: Lexicon, tok: Token): string {
  return lookup(lx, tok)?.id ?? (tok[3] ?? tok[0]);
}

/** Saves the extra record for a token that has no vocabulary entry. */
export function rememberToken(lx: Lexicon, tok: Token, lv: number) {
  if (lookup(lx, tok)) return;
  const id = tok[3] ?? tok[0];
  const ls = lang(lx.lang);
  // The gloss is the meaning in context; for an inflected form it is the best meaning we have.
  ls.extra[id] ||= [id, tok[3] ? '' : tok[1], tok[2], lv];
}

export function collection(lx: Lexicon): Entry[] {
  const cards = state.langs[lx.lang]?.cards || {};
  return Object.keys(cards).map((id) => entry(lx, id)).filter((e): e is Entry => !!e);
}

/** The learner chose "My words": games practise the collection (every level) instead of the level band. */
export const usesCollection = (l: LangId) => state.langs[l]?.src === 'mine';

/** Words for games: the level band's vocabulary, or the whole collection in "My words" mode (games check the size). */
export function wordPool(lx: Lexicon): { words: Entry[]; fromCollection: boolean } {
  if (usesCollection(lx.lang)) return { words: collection(lx), fromCollection: true };
  const band: Band = state.langs[lx.lang]?.band ?? 1;
  return { words: lx.vocab.filter((e) => inBand(e.lv, band) && !e.bound), fromCollection: false };
}

/** The lexicon already built for a language (the feedback bar uses it to save words). */
export const cachedLexicon = (l: LangId) => cache.get(l);

const ES_EL_FEMININE = new Set(['agua', 'águila', 'alma', 'arma', 'hambre', 'hacha', 'aula', 'área', 'ala', 'hada', 'ancla', 'alba', 'asma', 'aria', 'haba']);
const VOWEL = /^[aeiouàâäéèêëîïôöùûüœæyh]/i;
// Italian lo: s + consonant, z, gn, ps, pn, x, y, i + vowel
const IT_LO = /^(s[^aeiouàèéìòù]|z|gn|ps|pn|x|y|i[aeiou])/i;

/** Definite article of a noun ("" for languages without one). Elided forms end in an apostrophe: "l'". */
export function article(l: LangId, e: Pick<Entry, 'w' | 'g' | 'pos' | 'art'>): string {
  if (e.pos !== 'n' || !e.g) return '';
  if (e.art) return e.art;
  const w = e.w.toLowerCase();
  switch (l) {
    case 'de': return { m: 'der', f: 'die', n: 'das', c: '', pl: 'die' }[e.g];
    case 'es': return e.g === 'm' || ES_EL_FEMININE.has(w) ? 'el' : 'la';
    case 'fr': return VOWEL.test(w) ? "l'" : e.g === 'm' ? 'le' : 'la';
    case 'it': return /^[aeiouàèéìòù]/.test(w) ? "l'" : e.g === 'f' ? 'la' : IT_LO.test(w) ? 'lo' : 'il';
    case 'pt': return e.g === 'm' ? 'o' : 'a';
    case 'nl': return e.g === 'n' ? 'het' : 'de';
    default: return '';
  }
}

/** "der Hund", "la casa", "l'eau", "猫". */
export function withArticle(l: LangId, e: Pick<Entry, 'w' | 'g' | 'pos' | 'art'>): string {
  const a = article(l, e);
  return !a ? e.w : a.endsWith("'") ? a + e.w : `${a} ${e.w}`;
}

/** The reading to show under a word: pinyin, romanization, or kana when the word has kanji. */
export function readingOf(l: LangId, e: { w: string; r?: string }): string | undefined {
  if (!LANGS[l].reading || !e.r || e.r === e.w) return undefined;
  return e.r;
}

/** First meaning only, for compact options. */
export const firstSense = (en: string) => en.split(/;\s*/)[0];

const senses = (en: string) =>
  en.toLowerCase().split(/;\s*/).map((x) => x.replace(/\(.*?\)/g, '').replace(/^(to|a|an|the) /, '').trim()).filter(Boolean);

/**
 * Other answers that fit e's English prompt in typing games: its listed synonyms, then vocabulary words of the same
 * part of speech that share a sense ("car" -> Wagen). Each comes with the forms accepted as typed (with or without article).
 */
export function alternatives(lx: Lexicon, e: Entry): { w: string; forms: string[] }[] {
  const mine = new Set(senses(e.en));
  const out = (e.syn || []).map((w) => ({ w, forms: [w] }));
  for (const v of lx.vocab) {
    if (v.id === e.id || v.w === e.w || v.pos !== e.pos || !senses(v.en).some((x) => mine.has(x))) continue;
    if (!out.some((o) => o.w === v.w)) out.push({ w: withArticle(lx.lang, v), forms: [v.w, withArticle(lx.lang, v)] });
  }
  return out;
}
