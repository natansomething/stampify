/**
 * Content validator: `npm run validate` (all languages) or `npm run validate -- de` (one language).
 * Checks the rules documented in src/content/types.ts. Exit code 1 when there are errors.
 */
import { loadContent } from '../src/content/index';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { PRONOUNS, TENSES, TOPICS, type Content, type LangId, type CheatSheet, type Token, type Unit } from '../src/content/types';
import { stems } from '../src/core/util';
import { hanCount, pinyinFits } from '../src/core/pinyin';
import { LANG_IDS, LANGS as META } from '../src/core/langs';
import { longTexts, staleLibraries } from './library';
import { COUNTRIES, LINE_KEYS, MAPS, NPC_KINDS, PLACE_EN, ROUTE } from '../src/games/adventure/world';

const LANGS = LANG_IDS;
/** Allowed noun genders per language (languages without gender are missing). */
const GENDERS: Partial<Record<LangId, string[]>> = {
  de: ['m', 'f', 'n'], es: ['m', 'f'], fr: ['m', 'f'], it: ['m', 'f'], pt: ['m', 'f'], nl: ['c', 'n'], pl: ['m', 'f', 'n'], ru: ['m', 'f', 'n'],
};
const ARTICLES = /^(der|die|das|el|la|los|las|le|les|l'|il|lo|gli|o|a|os|as|de|het|un|une|una|uno)\s/i;
const KANA = /^[\p{Script=Hiragana}\p{Script=Katakana}ー・\s]+$/u;
const KANA_TEXT = /^[\p{Script=Hiragana}\p{Script=Katakana}ー・\p{P}\s\d]+$/u;
const ROMAN = /^[a-z'\-]+$/;
const ROMAN_TEXT = /^[A-Za-z'\-\s\p{P}\d]+$/u;
const hasKanji = (s: string) => /\p{Script=Han}/u.test(s);
const hasHangul = (s: string) => /\p{Script=Hangul}/u.test(s);
const cyrillicOnly = (s: string) => !/[a-z]/i.test(s);
const POS = new Set(['n', 'v', 'adj', 'adv', 'pron', 'prep', 'conj', 'num', 'mw', 'part', 'int', 'phr', 'art']);
const PUNCT = /^[\p{P}\p{S}\s]+$/u;

let errors = 0;
let warnings = 0;
const err = (where: string, msg: string) => { errors++; console.log(`  ERROR ${where}: ${msg}`); };
const warn = (where: string, msg: string) => { warnings++; console.log(`  warn  ${where}: ${msg}`); };
const isLevel = (n: unknown) => Number.isInteger(n) && (n as number) >= 1 && (n as number) <= 6;

function checkTokens(lang: LangId, where: string, t: Token[]) {
  if (!Array.isArray(t) || !t.length) return err(where, 'no tokens');
  t.forEach((tok, k) => {
    const w = `${where} token ${k} ${JSON.stringify(tok?.[0])}`;
    if (!Array.isArray(tok) || tok.length < 3 || tok.length > 4 || tok.some((x) => typeof x !== 'string')) {
      return err(w, 'must be [surface, reading, gloss, lemma?] strings');
    }
    const [s, r, g, lemma] = tok;
    if (!s) return err(w, 'empty surface');
    if (/\s/.test(s.trim()) && !META[lang].spaced) err(w, `${lang} token contains a space`);
    if (s !== s.trim()) err(w, 'surface has leading/trailing spaces');
    if (PUNCT.test(s)) {
      if (r || g || lemma) err(w, 'punctuation must be [p, "", ""]');
      return;
    }
    if (!g) err(w, 'missing gloss');
    if (lang === 'zh') {
      if (!r) err(w, 'missing pinyin');
      else if (hanCount(s) && !pinyinFits(s, r)) err(w, `pinyin "${r}" does not match ${hanCount(s)} characters`);
    } else if (lang === 'ja') {
      if (hasKanji(s) && !r) err(w, 'token with kanji needs its kana reading');
      else if (r && !KANA.test(r)) err(w, `reading "${r}" must be kana only`);
      else if (r && !hasKanji(s)) warn(w, 'kana-only token: reading should be ""');
    } else if (lang === 'ko') {
      if (!r) err(w, 'missing romanization');
      else if (!ROMAN.test(r.toLowerCase().replace(/\s/g, ''))) err(w, `romanization "${r}" has odd characters`);
      if (!hasHangul(s) && !/\d/.test(s)) warn(w, 'ko token without Hangul');
    } else if (r) err(w, `reading must be "" for ${lang}`);
    if (lang === 'ru' && !cyrillicOnly(s)) warn(w, 'ru token contains Latin letters');
    if (lemma !== undefined && lemma === s) warn(w, 'lemma equals surface (omit it)');
  });
  // Contractions: es de el -> del, a el -> al; it di il -> del, la amica -> l'amica; pt em o -> no (warning: "antes de o
  // sol nascer" is accepted in Brazil)
  if (lang === 'es' || lang === 'it' || lang === 'pt') {
    t.forEach((tok, k) => {
      const next = t[k + 1]?.[0];
      if (!next) return;
      const a = tok[0].toLowerCase();
      const n = next.toLowerCase();
      if (lang === 'es' && /^(de|a)$/.test(a) && next === 'el') err(`${where} token ${k}`, `"${tok[0]} el" should contract (${a === 'de' ? 'del' : 'al'})`);
      if (lang === 'it') {
        if (/^(di|a|da|in|su)$/.test(a) && /^(il|lo|la|i|gli|le|l')$/.test(n)) err(`${where} token ${k}`, `"${tok[0]} ${next}" should be an articulated preposition`);
        if (/^(lo|la|una|dello|della|nello|nella|allo|alla|dallo|dalla|sullo|sulla)$/.test(a) && /^[aeiouàèéìòù]/.test(n) && tok[2] && !/\b(him|her|it)\b/i.test(tok[2])) warn(`${where} token ${k}`, `"${tok[0]} ${next}": elide?`);
      }
      if (lang === 'pt' && /^(de|em)$/.test(a) && /^(o|a|os|as|este|esta|esse|essa|isso|isto|aquele|aquela)$/.test(n)) warn(`${where} token ${k}`, `"${tok[0]} ${next}": contract (do, na, num…)?`);
    });
  }
  // French elision: "que il", "je ai", "le ami" should be qu'il, j'ai, l'ami (words starting with h are not checked:
  // h aspiré varies; onze/onzième and y- words don't elide, except the pronoun y)
  if (lang === 'fr') {
    t.forEach((tok, k) => {
      const next = t[k + 1]?.[0];
      if (!next) return;
      const a = tok[0].toLowerCase();
      const vowel = /^[aeiouàâéèêëîïôûœ]/i.test(next) && !/^onz/i.test(next) || /^y$/i.test(next);
      const elides = /^(que|je|me|te|se|le|la|de|ne|ce|jusque|lorsque|puisque)$/.test(a) ? vowel : a === 'si' && /^ils?$/i.test(next);
      if (elides) err(`${where} token ${k}`, `"${tok[0]} ${next}" should elide (${a.slice(0, -1)}'${next})`);
    });
  }
}

function checkLang(lang: LangId, c: Content, longCount = 0) {
  console.log(`\n== ${lang} ==`);
  // vocab
  const ids = new Set<string>();
  c.vocab.forEach((v, k) => {
    const where = `vocab[${k}] ${v.w}`;
    const id = v.id ?? v.w;
    if (ids.has(id)) err(where, `duplicate id "${id}" (use id "w#x" for real homographs)`);
    ids.add(id);
    if (!v.w || !v.en) err(where, 'w and en are required');
    if (v.en && v.en.length > 60) warn(where, 'en is long');
    if (!isLevel(v.lv)) err(where, 'lv must be 1-6');
    if (!POS.has(v.pos)) err(where, `bad pos "${v.pos}"`);
    if (v.t && !(TOPICS as readonly string[]).includes(v.t)) err(where, `unknown topic "${v.t}"`);
    if (lang === 'zh') {
      if (!v.r) err(where, 'zh needs r (pinyin)');
      else if (!pinyinFits(v.w, v.r)) err(where, `pinyin "${v.r}" does not match ${hanCount(v.w)} characters`);
    } else if (lang === 'ja') {
      if (hasKanji(v.w) && !v.r) err(where, 'ja word with kanji needs r (kana)');
      if (v.r && !KANA.test(v.r)) err(where, `r "${v.r}" must be kana only`);
      if (v.r && !hasKanji(v.w)) warn(where, 'kana-only word: omit r');
    } else if (lang === 'ko') {
      if (!v.r) err(where, 'ko needs r (romanization)');
      else if (!ROMAN.test(v.r.replace(/\s/g, '-'))) err(where, `r "${v.r}" should be lowercase romanization`);
    } else if (v.r) err(where, `r is not used for ${lang}`);
    const genders = GENDERS[lang];
    if (!genders && (v.g || v.pl)) err(where, `${lang} words have no g/pl`);
    if (genders && v.pos === 'n') {
      if (!v.g) err(where, 'nouns need g');
      else if (!genders.includes(v.g) && v.g !== 'pl') err(where, `g must be one of ${genders.join('/')} (or pl for a plural-only noun)`);
      if (v.g === 'pl' && ['es', 'fr', 'it', 'pt'].includes(lang) && !v.art) err(where, 'plural-only nouns need art (the plural article)');
      if (lang === 'de') {
        if (!v.pl && v.g !== 'pl') err(where, 'de nouns need pl');
        if (v.w[0] !== v.w[0].toUpperCase()) err(where, 'de nouns are capitalised');
      }
    }
    if (v.pl && lang !== 'de') err(where, 'pl is de only');
    if (v.art && lang !== 'fr' && lang !== 'it' && !(v.g === 'pl' && (lang === 'es' || lang === 'pt'))) err(where, 'art is for fr/it (and es/pt plural-only nouns)');
    if (genders && ARTICLES.test(v.w) && v.pos === 'n') err(where, 'write the word without its article');
    if (lang === 'ru' && !cyrillicOnly(v.w)) err(where, 'ru word contains Latin letters');
    if (v.ex) {
      const [s, en, r] = v.ex;
      if (!s || !en) err(where, 'ex needs [sentence, English]');
      else {
        if (s.length > 100) warn(where, 'ex sentence is long');
        if (lang === 'zh') {
          if (!s.includes(v.w)) err(where, `ex sentence does not contain ${v.w}`);
          if (!r) err(where, 'zh ex needs pinyin');
          else if (!pinyinFits(s, r)) err(where, `ex pinyin does not match ${hanCount(s)} characters`);
        } else if (lang === 'ja') {
          if (!r) err(where, 'ja ex needs the sentence in kana');
          else if (!KANA_TEXT.test(r)) err(where, 'ja ex reading must be kana');
          // Verbs and adjectives inflect: look for the word without its last kana
          const stem = v.w.length > 1 && /[\p{Script=Hiragana}]$/u.test(v.w) ? v.w.slice(0, -1) : v.w;
          if (!s.includes(stem)) warn(where, `ex sentence may not use ${v.w}`);
        } else if (lang === 'ko') {
          if (!r) err(where, 'ko ex needs romanization');
          else if (!ROMAN_TEXT.test(r)) err(where, 'ko ex romanization has odd characters');
          const stem = v.w.endsWith('다') && v.w.length > 1 ? v.w.slice(0, -1) : v.w;
          if (!s.includes(stem.slice(0, Math.max(1, stem.length - 1)))) warn(where, `ex sentence may not use ${v.w}`);
        } else {
          if (r) err(where, `ex reading is not used for ${lang}`);
          // Inflected forms are fine; a sentence without even the stem is probably about another word.
          // Irregular verbs (fui for ir, hast for haben) can trip this, so it is only a warning.
          // hu stems change before endings (gödör/gödröt, váza/vázába, veréb/verebek): the word's start is enough
          const huStem = (w: string) => w.toLowerCase().slice(0, Math.max(2, w.length - 2));
          const huFold = (x: string) => x.toLowerCase().replace(/[áéíóőúű]/g, (c) => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ő: 'ö', ú: 'u', ű: 'ü' })[c]!);
          const uses = lang === 'hu'
            ? v.w.split(/\s+/).every((part) => huFold(s).includes(huFold(huStem(part))))
            : stems(v.w, v.pos === 'v').some((x) => s.toLowerCase().includes(x));
          if (!(v.pos === 'v' && lang !== 'de') && !uses) warn(where, `ex sentence may not use ${v.w}`);
        }
      }
    }
    if (v.syn) {
      if (!META[lang].typed) err(where, `syn is not used for ${lang}`);
      else if (!Array.isArray(v.syn) || !v.syn.length || v.syn.some((x) => !x || x === v.w)) err(where, 'syn must be a non-empty list of other words');
    }
  });
  // texts (short ones, then the long/ files)
  const tids = new Set<string>();
  const nShort = c.texts.length - longCount;
  c.texts.forEach((x, k) => {
    const long = k >= nShort;
    const where = long ? `long/${x.id}` : `texts[${k}] ${x.id}`;
    if (tids.has(x.id)) err(where, 'duplicate id');
    tids.add(x.id);
    if (!x.id?.startsWith(`${lang}-${x.lv}-`)) err(where, `id should look like ${lang}-${x.lv}-slug`);
    if (!isLevel(x.lv)) err(where, 'lv must be 1-6');
    if (!x.title || !x.titleEn) err(where, 'title and titleEn required');
    if (META[lang].reading && !x.titleR && !(lang === 'ja' && !hasKanji(x.title))) err(where, `${lang} needs titleR`);
    if (!META[lang].reading && x.titleR) err(where, `titleR is not used for ${lang}`);
    if (!x.s?.length) err(where, 'no sentences');
    x.s?.forEach((s, i) => {
      checkTokens(lang, `${where} s${i}`, s.t);
      if (!s.en) err(`${where} s${i}`, 'missing en');
      if (s.h) {
        if (!long) err(`${where} s${i}`, 'chapter headings are for long texts');
        if (!s.h[0] || !s.h[1]) err(`${where} s${i}`, 'h needs [heading, English]');
        if (META[lang].reading && s.h.length < 3 && !(lang === 'ja' && !hasKanji(s.h[0]))) err(`${where} s${i}`, `${lang} heading needs its reading as a third element`);
        if (!META[lang].reading && s.h.length > 2) err(`${where} s${i}`, 'heading reading is only for zh/ja/ko');
      }
    });
    if (x.s?.some((s) => s.h) && !x.s[0].h) err(where, 'a text with chapters must start with a heading');
    const words = x.s?.reduce((n, s) => n + s.t.filter((t) => t[2]).length, 0) ?? 0;
    if (!long && words > 900) err(where, `${words} words: texts this long go in long/`);
    if (long && x.s?.length > 60 && !x.s.some((s) => s.h)) warn(where, `${x.s.length} sentences without chapters: the reader pages it every 30 sentences`);
    if (!x.q || x.q.length < 3) err(where, 'needs 3-5 questions');
    x.q?.forEach((q, i) => {
      if (!q.q || q.o?.length < 3 || q.o.length > 4 || !(q.a >= 0 && q.a < q.o.length)) err(`${where} q${i}`, 'bad question');
    });
  });
  // grammar notes (need the texts: `-- <lang> notes` loads the whole language)
  if (c.notes.length && c.texts.length) {
    const byId = new Map(c.texts.map((x) => [x.id, x]));
    const seenNotes = new Set<string>();
    c.notes.forEach((n, k) => {
      const where = `notes[${k}] ${n.text} s${n.s}`;
      const x = byId.get(n.text);
      if (!x) return err(where, 'no text with this id');
      if (x.lv > 4) warn(where, `text is level ${x.lv}: notes are meant for levels 1-4`);
      const sent = x.s[n.s];
      if (!sent) return err(where, `sentence index out of range (0-${x.s.length - 1})`);
      if (!n.title?.trim() || !n.x?.trim()) err(where, 'title and x required');
      if (n.x && n.x.length > 420) warn(where, `x is ${n.x.length} characters: keep it to 1-3 short sentences`);
      if (!n.w?.length) err(where, 'w: list the words the note is about');
      const surfaces = sent.t.map((t) => t[0].toLowerCase());
      n.w?.forEach((w) => { if (!surfaces.includes(w.toLowerCase())) err(where, `"${w}" is not a token of the sentence (${sent.t.map((t) => t[0]).join(' ')})`); });
      const key = `${n.text}/${n.s}/${n.title}`;
      if (seenNotes.has(key)) err(where, 'duplicate note');
      seenNotes.add(key);
    });
    console.log(`  notes ${c.notes.length}`);
  }
  // quizzes in the language taught
  if (c.quizzes.length && c.texts.length) {
    const byId = new Map(c.texts.map((x) => [x.id, x]));
    const done = new Set<string>();
    c.quizzes.forEach((z, k) => {
      const where = `quizzes[${k}] ${z.text}`;
      const x = byId.get(z.text);
      if (!x) return err(where, 'no text with this id');
      if (done.has(z.text)) err(where, 'duplicate');
      done.add(z.text);
      if (x.lv < 3) warn(where, `text is level ${x.lv}: quizzes in the language are for levels 3-6`);
      if (z.q.length !== x.q.length) return err(where, `${z.q.length} questions, the text has ${x.q.length}`);
      z.q.forEach((q, i) => {
        if (!q.q?.trim()) err(`${where} q${i}`, 'empty question');
        if (q.o?.length !== x.q[i].o.length) err(`${where} q${i}`, `needs ${x.q[i].o.length} options like the English one`);
        if (new Set(q.o).size !== q.o?.length || q.o?.some((o) => !o.trim())) err(`${where} q${i}`, 'options must be distinct and non-empty');
      });
    });
    const missing = c.texts.filter((x) => x.lv >= 3 && !done.has(x.id));
    if (missing.length) warn('quizzes', `${missing.length} level 3-6 texts without a quiz in the language`);
    console.log(`  quizzes ${c.quizzes.length}`);
  }
  // sentences
  const sids = new Set<string>();
  c.sentences.forEach((x, k) => {
    const where = `sentences[${k}] ${x.id}`;
    if (sids.has(x.id)) err(where, 'duplicate id');
    sids.add(x.id);
    if (!isLevel(x.lv)) err(where, 'lv must be 1-6');
    checkTokens(lang, where, x.t);
    if (!x.en) err(where, 'missing en');
    if (x.err) {
      const tok = x.t?.[x.err.i];
      if (!tok || PUNCT.test(tok[0])) err(where, 'err.i must point at a word token');
      else if (tok[0] === x.err.w) err(where, 'err.w equals the correct token');
      if (!x.err.x) err(where, 'err.x explanation missing');
    }
  });
  // dialogues
  c.dialogues.forEach((d, k) => {
    const where = `dialogues[${k}] ${d.id}`;
    if (!isLevel(d.lv)) err(where, 'lv must be 1-6');
    if (!d.turns || d.turns.length < 3) err(where, 'needs 4-6 turns');
    d.turns?.forEach((t, i) => {
      const lines = [t.a, ...(t.o || [])];
      if (t.o?.length !== 3 || !(t.c >= 0 && t.c < 3)) err(`${where} turn ${i}`, 'needs 3 options and c 0-2');
      lines.forEach((l) => {
        if (!l?.t || !l.en) err(`${where} turn ${i}`, 'line needs t and en');
        if (lang === 'zh' && l?.t && (!l.r || !pinyinFits(l.t, l.r))) warn(`${where} turn ${i}`, `pinyin of "${l.t}" missing or off`);
        if (lang === 'ja' && l?.t && hasKanji(l.t) && (!l.r || !KANA_TEXT.test(l.r))) err(`${where} turn ${i}`, `kana reading of "${l.t}" missing or not kana`);
        if (lang === 'ko' && l?.t && (!l.r || !ROMAN_TEXT.test(l.r))) err(`${where} turn ${i}`, `romanization of "${l.t}" missing or odd`);
        if (!META[lang].reading && l?.r) err(`${where} turn ${i}`, `r is not used for ${lang}`);
      });
    });
  });
  // drills
  c.drills.forEach((d, k) => {
    const where = `drills[${k}] ${d.id}`;
    if (!d.id?.startsWith(`${lang}-`) || !d.name || !d.desc) err(where, 'needs id "<lang>-slug", name, desc');
    if (!d.items?.length) err(where, 'no items');
    if (![1, 2, 3].includes(d.band)) err(where, 'band must be 1, 2 or 3');
    else if (d.items?.length < 20) warn(where, `only ${d.items.length} items (aim for 25-30)`);
    d.items?.forEach((it, i) => {
      const w = `${where} item ${i}`;
      if (!isLevel(it.lv)) err(w, 'lv must be 1-6');
      else if (Math.ceil(it.lv / 2) !== d.band) err(w, `lv ${it.lv} is outside band ${d.band}`);
      if ((it.s.match(/___/g) || []).length !== 1) err(w, 's needs exactly one ___');
      if (!(it.o?.length >= 2 && it.o.length <= 4) || !(it.a >= 0 && it.a < it.o.length)) err(w, 'bad options/answer');
      if (new Set(it.o).size !== it.o?.length) err(w, 'duplicate options');
      if (!it.en || !it.x) err(w, 'needs en and x');
      if (lang === 'zh' && !it.r) err(w, 'zh needs r');
    });
  });
  for (const b of [1, 2, 3]) {
    const n = c.drills.filter((d) => d.band === b).length;
    if (c.drills.length && n < 3) warn('drills', `band ${b} has ${n} drills (aim for 4)`);
  }
  // verbs
  const tenses = TENSES[lang];
  const persons = PRONOUNS[lang];
  if (!tenses || !persons) {
    if (c.verbs.length) err('verbs', `${lang} has no conjugation tables: keep verbs.ts empty`);
  } else {
    const seen = new Set<string>();
    c.verbs.forEach((v, k) => {
      const where = `verbs[${k}] ${v.inf}`;
      if (seen.has(v.inf)) err(where, 'duplicate verb');
      seen.add(v.inf);
      if (!isLevel(v.lv) || !v.en) err(where, 'needs lv and en');
      for (const tense of tenses) {
        const f = v.f?.[tense];
        if (!f || f.length !== persons.length || f.some((x) => !x)) err(where, `tense "${tense}" needs ${persons.length} forms`);
      }
      for (const t of Object.keys(v.f || {})) if (!tenses.includes(t)) err(where, `unknown tense "${t}" (use ${tenses.join(', ')})`);
    });
  }
  const lv = (arr: { lv: number }[]) => [1, 2, 3, 4, 5, 6].map((l) => arr.filter((x) => x.lv === l).length).join('/');
  const pages = c.texts.slice(nShort).map((x) => Math.round(x.s.reduce((n, s) => n + s.t.filter((t) => t[2]).length, 0) / 250));
  console.log(`  vocab ${c.vocab.length} (${lv(c.vocab)}), texts ${nShort} + ${longCount} long (pages ${pages.join(',') || '-'}) (${lv(c.texts)}), sentences ${c.sentences.length} (${lv(c.sentences)}),` +
    ` dialogues ${c.dialogues.length}, drills ${c.drills.length} (${c.drills.reduce((n, d) => n + d.items.length, 0)} items), verbs ${c.verbs.length}`);
}

/**
 * `npm run validate -- de vocab` checks one file (texts-a, vocab-b… count as texts, vocab) without loading the others.
 * `npm run validate -- de long` checks the long texts, `npm run validate -- de long de-6-slug` just that one.
 */
async function loadOne(lang: LangId, file: string): Promise<Content> {
  const c: Content = { vocab: [], texts: [], sentences: [], dialogues: [], drills: [], verbs: [], library: [], notes: [], quizzes: [] };
  if (file === 'long') return c;
  const kind = file.replace(/-[a-z][0-9]*$/, '') as keyof Content;
  if (!(kind in c)) throw new Error(`unknown file "${file}"`);
  (c as unknown as Record<string, unknown[]>)[kind] = (await import(`../src/content/${lang}/${file}.ts`)).default;
  return c;
}

const [only, file, longId] = process.argv.slice(2) as [LangId | undefined, string | undefined, string | undefined];
for (const lang of only ? [only] : LANGS) {
  // `-- de long` checks only the long texts; a whole language includes them
  const whole = !file || file === 'notes' || file === 'quizzes';
  const c = whole ? { ...(await loadContent(lang)) } : await loadOne(lang, file);
  const long = whole || file === 'long' ? await longTexts(lang, longId) : [];
  checkLang(lang, { ...c, texts: [...c.texts, ...long] }, long.length);
}
// Guidebooks (src/content/<lang>/guide.ts). Activity ids are read from the game files (their GameDef ids).
const GAME_IDS = new Set((readdirSync(new URL('../src/games/', import.meta.url), { recursive: true }) as string[]).filter((f) => /\.tsx?$/.test(f)).flatMap((f) =>
  [...readFileSync(new URL(`../src/games/${f}`, import.meta.url), 'utf8').matchAll(/\bid: '([a-z]+)'/g)].map((m) => m[1])));
for (const lang of only ? [only] : LANGS) {
  const path = new URL(`../src/content/${lang}/guide.ts`, import.meta.url);
  if (!existsSync(path)) continue;
  const units: Unit[] = (await import(path.href)).default;
  const drillIds = new Set((await import(`../src/content/${lang}/drills.ts`)).default.map((d: { id: string }) => d.id));
  console.log(`\n== ${lang} guidebook ==`);
  const ids = new Set<string>();
  let lessons = 0;
  units.forEach((u, ui) => {
    if (!u.title || !u.about) err(`unit ${ui + 1}`, 'title and about required');
    u.lessons.forEach((x) => {
      lessons++;
      const where = `guide ${x.id}`;
      if (ids.has(x.id)) err(where, 'duplicate id');
      ids.add(x.id);
      if (!x.id.startsWith(`${lang}-g-`)) err(where, `id should start with ${lang}-g-`);
      if (!isLevel(x.lv)) err(where, 'lv must be 1-6');
      if (!x.title || !x.summary) err(where, 'title and summary required');
      if (!x.body?.length) err(where, 'empty body');
      x.body?.forEach((b, i) => {
        const keys = Object.keys(b);
        if ('practice' in b) {
          if (!GAME_IDS.has(b.practice)) err(`${where} block ${i}`, `no activity "${b.practice}"`);
          if (b.practice === 'drill' && !drillIds.has(b.arg || '')) err(`${where} block ${i}`, `no drill deck "${b.arg}"`);
        } else if ('sounds' in b) {
          const n = META[lang].reading ? 5 : 4;
          if (b.sounds.some((r) => r.length !== n || r.some((x) => !x))) err(`${where} block ${i}`, `sound rows are [spelling, IPA, example, meaning${n === 5 ? ', reading' : ''}]`);
          if (b.sounds.some((r) => /^[/[]|[/\]]$/.test(r[1]))) err(`${where} block ${i}`, 'IPA without slashes or brackets (the app adds them)');
        } else if (keys.length !== 1 || !['h', 'p', 'tip', 'table', 'ex'].includes(keys[0])) err(`${where} block ${i}`, 'a block is one of {h}, {p}, {tip}, {table}, {ex}, {sounds}, {practice}');
        if ('table' in b && (!b.table.length || b.table.some((r) => r.length !== b.table[0].length))) err(`${where} block ${i}`, 'table rows must all have the same number of cells');
        const reading = META[lang].reading;
        if ('ex' in b && b.ex.some((e) => !Array.isArray(e) || e.length !== (reading ? 3 : 2) || e.some((x) => !x))) err(`${where} block ${i}`, reading ? 'ex entries are [sentence, English, reading]' : 'ex entries are [sentence, English]');
      });
      const words = JSON.stringify(x.body).split(/\s+/).length;
      if (words < 150) warn(where, `article is short (~${words} words)`);
      if (x.ex.length < 6 || x.ex.length > 14) warn(where, `${x.ex.length} exercises (aim for 8-12)`);
      x.ex.forEach((e, i) => {
        const w = `${where} ex${i}`;
        if (e.k === 'choice') {
          if (!e.q || e.o?.length < 2 || !(e.a >= 0 && e.a < e.o.length)) err(w, 'choice needs q, 2-4 options and a valid a');
          else if (new Set(e.o).size !== e.o.length) err(w, 'duplicate options');
        } else if (e.k === 'type') {
          if (!e.q?.includes('___')) err(w, 'type needs a ___ gap in q');
          if (!e.a?.length || e.a.some((a) => !a.trim())) err(w, 'type needs accepted answers');
          if (META[lang].reading && !e.ar) err(w, `${lang} type exercises need ar (the answer's reading, which learners may type)`);
        } else if (e.k === 'order') {
          if (!e.w || e.w.length < 3 || !e.en) err(w, 'order needs 3+ words and en');
          const sorted = (x: string[]) => [...x].sort().join(' ');
          e.alt?.forEach((a) => { if (sorted(a.split(' ')) !== sorted(e.w)) err(w, `alt "${a}" must use exactly the same words`); });
        } else if (e.k === 'hear') {
          if (!e.say || e.o?.length < 2 || !(e.a >= 0 && e.a < e.o.length) || e.o[e.a] !== e.say) err(w, 'hear needs say, 2-4 options and a pointing at the option equal to say');
        } else if (e.k === 'odd') {
          if (e.o?.length < 3 || !(e.a >= 0 && e.a < e.o.length) || !e.focus) err(w, 'odd needs 3-4 words, a and focus');
        } else if (e.k === 'spell') {
          if (!e.say || !e.q?.includes('___') || !e.a?.length || !e.focus) err(w, 'spell needs say, q with ___, a and focus');
        } else err(w, `unknown kind ${(e as { k: string }).k}`);
        if (e.k === 'choice' && (e.q.match(/___/g) || []).length > 1) err(w, 'one gap per sentence');
        if (META[lang].reading && (e.k === 'choice' || e.k === 'type') && e.q.includes('___') && !e.qr) err(w, `${lang} gap sentences need qr (their reading)`);
        if (META[lang].reading && e.k === 'order' && !e.r) err(w, `${lang} order exercises need r (the sentence's reading)`);
      });
    });
  });
  console.log(`  ${units.length} units, ${lessons} lessons, ${units.reduce((n, u) => n + u.lessons.reduce((m, x) => m + x.ex.length, 0), 0)} exercises`);
}

// Cheat sheets (src/content/<lang>/sheets.ts): reference pages, no exercises
for (const lang of only ? [only] : LANGS) {
  const path = new URL(`../src/content/${lang}/sheets.ts`, import.meta.url);
  if (!existsSync(path)) continue;
  const sheets: CheatSheet[] = (await import(path.href)).default;
  const drillIds = new Set((await import(`../src/content/${lang}/drills.ts`)).default.map((d: { id: string }) => d.id));
  console.log(`\n== ${lang} cheat sheets ==`);
  const ids = new Set<string>();
  let rows = 0;
  for (const x of sheets) {
    const where = `sheet ${x.id}`;
    if (ids.has(x.id)) err(where, 'duplicate id');
    ids.add(x.id);
    if (!x.id?.startsWith(`${lang}-cs-`)) err(where, `id should start with ${lang}-cs-`);
    if (!x.title || !x.summary) err(where, 'title and summary required');
    if (!x.body?.length) err(where, 'empty body');
    if (!x.body?.some((b) => 'table' in b)) warn(where, 'no table: a cheat sheet is mostly tables');
    x.body?.forEach((b, i) => {
      const at = `${where} block ${i}`;
      const keys = Object.keys(b);
      if ('practice' in b) {
        if (!GAME_IDS.has(b.practice)) err(at, `no activity "${b.practice}"`);
        if (b.practice === 'drill' && !drillIds.has(b.arg || '')) err(at, `no drill deck "${b.arg}"`);
      } else if ('sounds' in b) {
        const n = META[lang].reading ? 5 : 4;
        if (b.sounds.some((r) => r.length !== n || r.some((v) => !v))) err(at, `sound rows are [spelling, IPA, example, meaning${n === 5 ? ', reading' : ''}]`);
      } else if (keys.length !== 1 || !['h', 'p', 'tip', 'table', 'ex'].includes(keys[0])) err(at, 'a block is one of {h}, {p}, {tip}, {table}, {ex}, {sounds}, {practice}');
      if ('table' in b) {
        if (b.table.length < 2 || b.table.some((r) => r.length !== b.table[0].length)) err(at, 'a table needs a header and rows, all with the same number of cells');
        if (b.table.some((r) => r.some((c) => typeof c !== 'string' || !c.trim()))) err(at, 'empty table cell (write "–" for none)');
        const seen = new Set<string>();
        for (const r of b.table.slice(1)) { const k = r.join('|'); if (seen.has(k)) err(at, `duplicate row "${r[0]}"`); seen.add(k); }
        rows += b.table.length - 1;
      }
      const reading = META[lang].reading;
      if ('ex' in b && b.ex.some((e) => !Array.isArray(e) || e.length !== (reading ? 3 : 2) || e.some((v) => !v))) err(at, reading ? 'ex entries are [sentence, English, reading]' : 'ex entries are [sentence, English]');
    });
  }
  console.log(`  ${sheets.length} sheets, ${rows} table rows`);
}

// Adventure dialogue (optional per language): every line the world uses, tokenised like texts
type Adv = import('../src/content/types').AdventureText;
const ADV: Partial<Record<LangId, Adv>> = {};
for (const lang of LANGS) if (existsSync(`src/content/${lang}/adventure.ts`)) ADV[lang] = (await import(`../src/content/${lang}/adventure.ts`)).default;
const englishPlaces = new Set(Object.values(PLACE_EN).flatMap((p) => [p, ...p.split(' · ')]));
for (const lang of only ? [only] : LANGS) {
  const file = `src/content/${lang}/adventure.ts`;
  if (!existsSync(file)) continue;
  console.log(`\n${lang} adventure`);
  const a = (await import(`../${file}`)).default as import('../src/content/types').AdventureText;
  if (!(a.lv >= 1 && a.lv <= 6)) err(`${lang} adventure`, 'lv must be 1-6');
  for (const k of LINE_KEYS) {
    const ln = a.lines[k];
    if (!ln) { err(`${lang} adventure`, `missing line ${k}`); continue; }
    if (!ln.en?.trim()) err(`${lang} adventure ${k}`, 'missing English');
    checkTokens(lang, `${lang} adventure ${k}`, ln.t);
  }
  for (const k of Object.keys(a.lines)) if (!(LINE_KEYS as readonly string[]).includes(k)) warn(`${lang} adventure`, `line ${k} is not used by the world`);
  for (const n of NPC_KINDS) if (!a.names[n]) err(`${lang} adventure`, `no name for ${n}`);
  // residents (NPCs 'res_…' in homes) are named one by one; a name belongs to one character only
  for (const m of Object.values(MAPS)) for (const o of m.objs) if (o.k === 'npc' && o.id.startsWith('res_') && !a.names[o.id]) err(`${lang} adventure`, `no name for resident ${o.id} (${m.id})`);
  const owners = new Map<string, string>();
  for (const [k, n] of Object.entries(a.names)) { const o = owners.get(n); if (o) err(`${lang} adventure`, `the name "${n}" is used for both ${o} and ${k}`); else owners.set(n, k); }
  for (const id of [...Object.keys(MAPS), ...Object.keys(COUNTRIES)]) if (!a.places[id]) err(`${lang} adventure`, `no place name for ${id}`);
  // English is the same in every course: place names from PLACE_EN, and no other course's character or place names
  // (a learner of Chinese must not meet the German names in the English translation)
  for (const [id, p] of Object.entries(a.places)) if (PLACE_EN[id] && p[1] !== PLACE_EN[id]) err(`${lang} adventure place ${id}`, `English must be "${PLACE_EN[id]}" (PLACE_EN), not "${p[1]}"`);
  const own = new Set([...Object.values(a.names), ...(a.proper ?? [])]);
  const foreign = new Set<string>();
  for (const [l2, b] of Object.entries(ADV)) if (l2 !== lang && b) {
    for (const w of [...Object.values(b.names), ...Object.values(b.places).flatMap((p) => p[0].split(' · '))]) {
      if (/^[\p{Script=Latin}][\p{Script=Latin}\s'-]+$/u.test(w) && w.length > 2 && !englishPlaces.has(w) && !own.has(w)) foreign.add(w);
    }
  }
  const re = foreign.size ? new RegExp(`(?<![\\p{L}])(${[...foreign].map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}])`, 'u') : null;
  if (re) for (const [k, ln] of Object.entries(a.lines)) {
    for (const text of [ln.en, ...ln.t.map((t) => t[2])]) {
      const m = text?.match(re);
      if (m) { err(`${lang} adventure ${k}`, `English uses "${m[1]}", a name from another course: use this course's name (transliterated) or the English place name`); break; }
    }
  }
  // border exam words: hand-picked per country, from the vocabulary or with their own reading and meaning
  const vocab = new Set((await loadContent(lang)).vocab.flatMap((v) => [v.w, v.w.toLowerCase()]));
  for (const c of ROUTE.filter((c) => MAPS[`office_${c}`])) {
    const list = a.exam?.[c] ?? [];
    if (list.length < 10) err(`${lang} adventure exam ${c}`, `needs at least 10 words (has ${list.length})`);
    const said = new Set(Object.entries(a.lines).filter(([k]) => COUNTRIES[c].lines.some((p) => k.startsWith(p))).flatMap(([, v]) => v.t.flatMap((t) => [t[0], t[3] ?? t[0]]).map((x) => x.toLowerCase())));
    for (const x of list) {
      const w = typeof x === 'string' ? x : x[0].replace(lang === 'de' ? /^(der|die|das) / : /^$/, '');
      if (typeof x === 'string') { if (!vocab.has(x) && !vocab.has(x.toLowerCase())) err(`${lang} adventure exam ${c}`, `"${x}" is not in the vocabulary: write it as [word, reading, English]`); }
      else {
        if (!x[2]) err(`${lang} adventure exam ${c}`, `"${x[0]}" needs its English meaning`);
        if (lang === 'zh' && (!x[1] || !pinyinFits(x[0], x[1]))) err(`${lang} adventure exam ${c}`, `"${x[0]}" needs matching pinyin`);
        if (vocab.has(w)) warn(`${lang} adventure exam ${c}`, `"${w}" is in the vocabulary: list it as a plain string`);
      }
      if (![...said].some((t) => t === w.toLowerCase() || (lang !== 'zh' && t.startsWith(w.toLowerCase().slice(0, -1))))) warn(`${lang} adventure exam ${c}`, `"${w}" is never said in this country`);
    }
  }
  console.log(`  ${Object.keys(a.lines).length} lines`);
}

const stale = only ? [] : await staleLibraries();
if (stale.length) err('library', `out of date for ${stale.join(', ')}: run npm run library`);
console.log(`\n${errors} errors, ${warnings} warnings`);
process.exit(errors ? 1 : 0);
