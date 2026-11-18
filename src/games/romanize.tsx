/**
 * Romanization: see a word in its own script (Hangul, kana/kanji, Cyrillic), type it in Latin letters.
 * The answer key is lenient about spelling systems: Revised Romanization with or without sound changes for Korean,
 * Hepburn or Kunrei and any long-vowel spelling for Japanese, the common transliteration variants for Russian.
 */
import { useState } from 'preact/hooks';
import type { LangId } from '../content/types';
import { firstSense, readingOf, wordPool, type Entry } from '../core/lexicon';
import { XP } from '../core/progress';
import { Session, type RoundApi } from '../ui/session';
import { pickWords, TypeBox } from './common';
import { translit } from './scripts';
import type { Ctx, GameDef } from './types';

// ---------------- Korean: Hangul letter by letter ----------------

const INITIAL = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const MEDIAL = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
const FINAL = ['', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'k', 'm', 'l', 'l', 'l', 'p', 'l', 'm', 'p', 'p', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't'];

/** Revised Romanization syllable by syllable, without the sound changes across syllables (학교 hakgyo, 국물 gukmul). */
export function hangulLetters(s: string): string {
  return [...s].map((ch) => {
    const c = ch.charCodeAt(0) - 0xac00;
    if (c < 0 || c > 11171) return ch;
    return INITIAL[Math.floor(c / 588)] + MEDIAL[Math.floor((c % 588) / 28)] + FINAL[c % 28];
  }).join('');
}

// ---------------- Japanese: kana to Hepburn ----------------

const KANA: Record<string, string> = {
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o', か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko', さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to', な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no', は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo', や: 'ya', ゆ: 'yu', よ: 'yo', ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro', わ: 'wa', を: 'o', ん: 'n',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go', ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo', だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo', ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po', ゔ: 'vu',
  ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o',
};
const SMALL_Y: Record<string, string> = { ゃ: 'a', ゅ: 'u', ょ: 'o' };

/** Hepburn romaji of a word in kana (katakana too): きょうと kyouto, がっこう gakkou, コーヒー koohii. */
export function kanaToRomaji(kana: string): string {
  const s = kana.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  let out = '';
  for (let k = 0; k < s.length; k++) {
    const ch = s[k];
    const next = s[k + 1];
    if (ch === 'っ') {
      const r = romajiAt(s, k + 1);
      out += r ? (r.startsWith('ch') ? 't' : r[0]) : '';
      continue;
    }
    if (ch === 'ー') { out += out.slice(-1); continue; }
    if (next && SMALL_Y[next] && KANA[ch]) {
      const base = KANA[ch];
      // きゃ kya, しゃ sha, ちゃ cha, じゃ ja
      out += /^(sh|ch|j)/.test(base) ? base.slice(0, -1) + SMALL_Y[next] : base.slice(0, -1) + 'y' + SMALL_Y[next];
      k++;
      continue;
    }
    if (ch === 'ん' && next && /^[aiueoy]/.test(romajiAt(s, k + 1))) { out += "n'"; continue; }
    out += KANA[ch] ?? ch;
  }
  return out;
}
const romajiAt = (s: string, k: number) => (s[k] ? KANA[s[k]] ?? '' : '');

/** Folds Hepburn, Kunrei and long-vowel spellings together: shi = si, tsu = tu, Tōkyō = toukyou = tokyo. */
function foldJa(x: string): string {
  return x.toLowerCase().normalize('NFD').replace(/([aeiou])̄/g, '$1$1').normalize('NFC')
    .replace(/[âêîôû]/g, (c) => ({ â: 'aa', ê: 'ee', î: 'ii', ô: 'oo', û: 'uu' })[c]!)
    .replace(/[^a-z]/g, '')
    .replace(/sh/g, 'sy').replace(/ch/g, 'ty').replace(/ts/g, 't').replace(/f/g, 'h').replace(/j/g, 'zy')
    .replace(/sy(?=[i])/g, 's').replace(/ty(?=[i])/g, 't').replace(/zy(?=[i])/g, 'z')
    .replace(/dz/g, 'z').replace(/m(?=[bpm])/g, 'n')
    .replace(/ou/g, 'o').replace(/([aeiou])\1+/g, '$1');
}

// ---------------- Russian ----------------

/** Folds the common transliteration systems together: shch = sch, kh = h = x, ts = c, ya = ja = ia, й = y = j = i. */
function foldRu(x: string): string {
  return x.toLowerCase().replace(/[^a-z]/g, '')
    .replace(/shch|sch|shh/g, 'Q').replace(/zh/g, 'Z').replace(/tch|ch/g, 'X').replace(/sh/g, 'W')
    .replace(/kh|x|h/g, 'H').replace(/ts|tz|c/g, 'C')
    .replace(/[yji]u/g, 'U').replace(/[yji]a/g, 'A').replace(/[yji]o/g, 'O').replace(/[yji]e/g, 'e')
    .replace(/[yji]/g, 'i').replace(/U/g, 'u').replace(/A/g, 'a').replace(/O/g, 'o');
}

// ---------------- the game ----------------

interface Lang { what: string; script: string; placeholder: string; key: (e: Entry) => string | undefined; accept: (input: string, e: Entry) => boolean }

const letters = (x: string) => x.toLowerCase().replace(/[^a-z]/g, '');

const SPEC: Partial<Record<LangId, Lang>> = {
  ko: {
    what: 'romanization', script: 'Hangul', placeholder: 'e.g. hakgyo',
    key: (e) => e.r,
    // As pronounced (the dictionary reading) or letter by letter
    accept: (v, e) => [e.r || '', hangulLetters(e.w)].some((a) => letters(a) === letters(v)),
  },
  ja: {
    what: 'romaji', script: 'Japanese', placeholder: 'e.g. gakkou or gakkō',
    key: (e) => kanaToRomaji(readingOf('ja', e) ?? e.w),
    accept: (v, e) => foldJa(v) === foldJa(kanaToRomaji(readingOf('ja', e) ?? e.w)),
  },
  ru: {
    what: 'transliteration', script: 'Cyrillic', placeholder: 'e.g. privet',
    key: (e) => translit(e.w),
    accept: (v, e) => foldRu(v) === foldRu(translit(e.w)),
  },
};

const KANA_ONLY = /^[\p{Script=Hiragana}\p{Script=Katakana}ー]+$/u;

/** Words that can be romanized: Japanese needs a kana reading, every language a single script without digits. */
function romanizable(l: LangId, e: Entry): boolean {
  if (/\d/.test(e.w)) return false;
  if (l === 'ja') return KANA_ONLY.test(readingOf('ja', e) ?? e.w);
  if (l === 'ko') return /^[\p{Script=Hangul}\s]+$/u.test(e.w);
  return /^[Ѐ-ӿ\s-]+$/.test(e.w);
}

const pool = (ctx: Ctx) => wordPool(ctx.lx).words.filter((e) => romanizable(ctx.lang, e));

function Romanize({ ctx }: { ctx: Ctx }) {
  const spec = SPEC[ctx.lang]!;
  return (
    <Session lang={ctx.lang} id="romanize" title={`Type the ${spec.what}`} exit={ctx.exit} prepare={() => pickWords(ctx, pool(ctx), 10)}>
      {(api, items) => <RomanizeRound key={api.i} ctx={ctx} spec={spec} e={items[api.i]} api={api} />}
    </Session>
  );
}

function RomanizeRound({ ctx, spec, e, api }: { ctx: Ctx; spec: Lang; e: Entry; api: RoundApi }) {
  const [st, setSt] = useState<'ok' | 'bad' | null>(null);
  return (
    <div>
      <div class="prompt">
        <div class="label">Write it in Latin letters</div>
        <div class={ctx.lang === 'ru' ? 'word' : 'word cjk'} lang={ctx.lang}>{e.w}</div>
        <div class="reading">{firstSense(e.en)}</div>
      </div>
      <TypeBox placeholder={spec.placeholder} state={st} onCheck={(v) => {
        const ok = spec.accept(v, e);
        setSt(ok ? 'ok' : 'bad');
        api.answer(ok, {
          say: e.w, word: e.id, xp: XP.correct + 1,
          show: <span><span lang={ctx.lang}>{e.w}</span> = <b class="mono">{spec.key(e)}</b> — {firstSense(e.en)}</span>,
          note: ctx.lang === 'ko' && ok && letters(v) !== letters(e.r || '') ? `As pronounced: ${e.r}` : undefined,
        });
      }} />
    </div>
  );
}

export const ROMANIZE_GAMES: GameDef[] = (['ko', 'ja', 'ru'] as LangId[]).map((l) => ({
  id: 'romanize',
  name: { ko: 'Romanization', ja: 'Romaji', ru: 'Transliteration' }[l as 'ko'],
  desc: `See a word in ${SPEC[l]!.script} script, type it in Latin letters.`,
  cat: 'special', langs: [l], mine: true,
  check: (ctx) => (pool(ctx).length >= 4 ? null : ctx.mine ? 'Save at least 4 words to play' : 'Not enough words at this level'),
  Comp: Romanize,
}));

/** Whether a typed romanization is accepted for a word (used by the game; exported for checks). */
export const romanizeOk = (l: LangId, input: string, e: Entry) => SPEC[l]!.accept(input, e);
