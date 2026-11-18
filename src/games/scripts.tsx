/**
 * Writing-system games for languages with their own script: kana (ja), Hangul (ko), Cyrillic (ru).
 * They need no content files: the letters are built in, so a learner can start before reading any text.
 */
import type { Band } from '../core/langs';
import { firstSense, wordPool, type Entry } from '../core/lexicon';
import { distractors, pick, sample, shuffle } from '../core/util';
import { Choice } from '../ui/components';
import { Session } from '../ui/session';
import type { Ctx, GameDef } from './types';
import { pickWords } from './common';

interface Glyph { g: string; r: string }

/** A round: show a glyph, pick its reading (or the reverse), with three distractors from the same set. */
interface Q { show: string; opts: string[]; ans: number; reverse: boolean; g: Glyph; hint?: string; e?: Entry }

function rounds(set: Glyph[], n: number, reverseShare = 0.3): Q[] {
  return sample(set, n).map((g) => {
    const reverse = Math.random() < reverseShare;
    const ds = distractors(set, g, 3, (x) => (reverse ? x.g : x.r));
    const opts = shuffle([g, ...ds]);
    return { show: reverse ? g.r : g.g, opts: opts.map((x) => (reverse ? x.g : x.r)), ans: opts.indexOf(g), reverse, g };
  });
}

function ScriptGame({ ctx, id, title, prepare, ask }: {
  ctx: Ctx; id: string; title: string; prepare: () => Q[]; ask: (q: Q) => string;
}) {
  return (
    <Session lang={ctx.lang} id={id} title={title} exit={ctx.exit} prepare={prepare}>
      {(api, items) => {
        const q = items[api.i];
        return (
          <div key={api.i}>
            <div class="prompt">
              <div class="label">{ask(q)}</div>
              <div class={q.reverse ? 'word' : 'word cjk'} lang={q.reverse ? undefined : ctx.lang}
                style={q.reverse ? { fontSize: '2.6rem', fontFamily: 'var(--font-mono)' } : ctx.lang === 'ru' ? { fontSize: '3.4rem' } : undefined}>
                {q.show}
              </div>
              {q.hint && <div class="reading">{q.hint}</div>}
            </div>
            <Choice columns={2} cjk={q.reverse && ctx.lang !== 'ru' ? ctx.lang : undefined}
              options={q.opts.map((o) => <span lang={q.reverse ? ctx.lang : undefined} style={q.reverse ? { fontSize: '1.6rem' } : { fontFamily: 'var(--font-mono)', fontSize: '1.15rem' }}>{o}</span>)}
              answer={q.ans}
              onDone={(ok) => {
                api.answer(ok, { say: q.g.g.split(' ')[0], word: q.e?.id, save: q.e && [q.e], show: <span><span lang={ctx.lang} style={{ fontSize: '1.3em' }}>{q.g.g}</span> = <b class="mono">{q.g.r}</b>{q.hint ? ` · ${q.hint}` : ''}</span> });
              }} />
          </div>
        );
      }}
    </Session>
  );
}

// ---------------- Japanese kana ----------------

const ROMAJI = 'a i u e o ka ki ku ke ko sa shi su se so ta chi tsu te to na ni nu ne no ha hi fu he ho ma mi mu me mo ya yu yo ra ri ru re ro wa wo n'.split(' ');
const HIRA = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
const KATA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const DAKU_R = 'ga gi gu ge go za ji zu ze zo da de do ba bi bu be bo pa pi pu pe po'.split(' ');
const DAKU_H = 'がぎぐげござじずぜぞだでどばびぶべぼぱぴぷぺぽ';
const DAKU_K = 'ガギグゲゴザジズゼゾダデドバビブベボパピプペポ';
const YOON_R = 'kya kyu kyo sha shu sho cha chu cho nya nyu nyo hya hyu hyo mya myu myo rya ryu ryo gya gyu gyo ja ju jo bya byu byo pya pyu pyo'.split(' ');
const YOON_BASE = 'きしちにひみりぎじびぴ';

const kana = (chars: string, rs: string[]): Glyph[] => [...chars].map((g, k) => ({ g, r: rs[k] }));
const yoon = (base: string, small: string[]): Glyph[] =>
  [...base].flatMap((b, k) => small.map((s, j) => ({ g: b + s, r: YOON_R[k * 3 + j] })));
const toKata = (s: string) => s.replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60));

/** Beginner: basic hiragana. Intermediate: basic katakana. Advanced / all: everything, voiced sounds and combinations too. */
function kanaSet(band: Band): Glyph[] {
  const hira = kana(HIRA, ROMAJI);
  const kata = kana(KATA, ROMAJI);
  if (band === 1) return hira;
  if (band === 2) return kata;
  const y = yoon(YOON_BASE, ['ゃ', 'ゅ', 'ょ']);
  return [...hira, ...kata, ...kana(DAKU_H, DAKU_R), ...kana(DAKU_K, DAKU_R), ...y, ...y.map((x) => ({ g: toKata(x.g), r: x.r }))];
}

function Kana({ ctx }: { ctx: Ctx }) {
  return (
    <ScriptGame ctx={ctx} id="kana" title="Kana" prepare={() => rounds(kanaSet(ctx.band), 15)}
      ask={(q) => (q.reverse ? 'Which kana is this?' : 'How is it read?')} />
  );
}

// ---------------- Korean Hangul ----------------

const L_R = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const V_R = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
/** Final consonants learners meet first, with how they sound at the end of a syllable. */
const FINALS: [number, string][] = [[0, ''], [1, 'k'], [4, 'n'], [8, 'l'], [16, 'm'], [17, 'p'], [21, 'ng']];
const syllable = (l: number, v: number, t: number) => String.fromCharCode(0xac00 + (l * 21 + v) * 28 + t);

const JAMO: Glyph[] = [
  ...'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'.split('').map((g, k) => ({ g, r: ['g/k', 'n', 'd/t', 'r/l', 'm', 'b/p', 's', 'silent / ng', 'j', 'ch', 'k', 't', 'p', 'h'][k] })),
  ...'ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅔ'.split('').map((g, k) => ({ g, r: ['a', 'ya', 'eo', 'yeo', 'o', 'yo', 'u', 'yu', 'eu', 'i', 'ae', 'e'][k] })),
];

/** Random syllable blocks; distractors change one part (consonant, vowel or final) so the eye has to read the block. */
function hangulRounds(band: Band, n: number): Q[] {
  if (band === 1) return rounds(JAMO, n, 0.25);
  const ls = [0, 2, 3, 5, 6, 7, 9, 11, 12, 14, 15, 16, 17, 18];
  const vs = band === 2 ? [0, 4, 8, 13, 18, 20, 1, 5] : [0, 2, 4, 6, 8, 12, 13, 17, 18, 20, 1, 5, 9, 14, 16];
  const ts = band === 2 ? FINALS.slice(0, 4) : FINALS;
  const read = (l: number, v: number, t: [number, string]) => L_R[l] + V_R[v] + t[1];
  return Array.from({ length: n }, () => {
    const l = pick(ls); const v = pick(vs); const t = pick(ts);
    const g: Glyph = { g: syllable(l, v, t[0]), r: read(l, v, t) };
    const opts = new Map<string, string>([[g.r, g.g]]);
    for (let k = 0; opts.size < 4 && k < 40; k++) {
      const part = k % 3;
      const nl = part === 0 ? pick(ls) : l; const nv = part === 1 ? pick(vs) : v; const nt = part === 2 ? pick(ts) : t;
      opts.set(read(nl, nv, nt), syllable(nl, nv, nt[0]));
    }
    const list = shuffle([...opts.entries()]);
    return { show: g.g, opts: list.map(([r]) => r), ans: list.findIndex(([r]) => r === g.r), reverse: false, g };
  });
}

function Hangul({ ctx }: { ctx: Ctx }) {
  return (
    <ScriptGame ctx={ctx} id="hangul" title="Hangul" prepare={() => hangulRounds(ctx.band, 15)}
      ask={(q) => (q.reverse ? 'Which letter makes this sound?' : [...q.g.g].length === 1 && q.g.g < '가' ? 'What sound is this letter?' : 'How is it read?')} />
  );
}

// ---------------- Russian Cyrillic ----------------

const CYR: [string, string][] = [
  ['а', 'a'], ['б', 'b'], ['в', 'v'], ['г', 'g'], ['д', 'd'], ['е', 'ye / e'], ['ё', 'yo'], ['ж', 'zh'], ['з', 'z'], ['и', 'i'],
  ['й', 'y (short)'], ['к', 'k'], ['л', 'l'], ['м', 'm'], ['н', 'n'], ['о', 'o'], ['п', 'p'], ['р', 'r'], ['с', 's'], ['т', 't'],
  ['у', 'u'], ['ф', 'f'], ['х', 'kh'], ['ц', 'ts'], ['ч', 'ch'], ['ш', 'sh'], ['щ', 'shch'], ['ы', 'y'], ['ь', 'soft sign'],
  ['ъ', 'hard sign'], ['э', 'e'], ['ю', 'yu'], ['я', 'ya'],
];
const LETTERS: Glyph[] = CYR.map(([c, r]) => ({ g: `${c.toUpperCase()} ${c}`, r }));
const TR: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
  п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: "'", э: 'e', ю: 'yu', я: 'ya',
};
/** Simple transliteration (е after a vowel or at the start is "ye"). */
export function translit(s: string): string {
  return [...s.toLowerCase()].map((c, k, a) => (c === 'е' && (k === 0 || 'аеёиоуыэюяьъ '.includes(a[k - 1])) ? 'ye' : TR[c] ?? c)).join('');
}

const cyrWords = (ctx: Ctx) => wordPool(ctx.lx).words.filter((e) => e.w.length >= 3 && e.w.length <= 9 && !/\s/.test(e.w));

/** Beginners: the alphabet. Then whole words, read letter by letter ("My words" mode: always the saved words). */
function cyrillicRounds(ctx: Ctx, n: number): Q[] {
  const words = cyrWords(ctx);
  if (!ctx.mine && (ctx.band === 1 || words.length < 8)) return rounds(LETTERS, n, 0.3);
  // A small collection borrows wrong options from the whole vocabulary
  const others = words.length >= 12 ? words : ctx.lx.vocab.filter((e) => e.w.length >= 3 && e.w.length <= 9 && !/\s/.test(e.w));
  return pickWords(ctx, words, n).map((e: Entry) => {
    const ds = distractors(others.filter((x) => Math.abs(x.w.length - e.w.length) <= 2), e, 3, (x) => translit(x.w));
    const opts = shuffle([e, ...ds]);
    return { show: e.w, opts: opts.map((x) => translit(x.w)), ans: opts.indexOf(e), reverse: false, g: { g: e.w, r: translit(e.w) }, hint: firstSense(e.en), e };
  });
}

function Cyrillic({ ctx }: { ctx: Ctx }) {
  return (
    <ScriptGame ctx={ctx} id="cyrillic" title="Cyrillic" prepare={() => cyrillicRounds(ctx, 15)}
      ask={(q) => (q.reverse ? 'Which letter is this?' : q.g.g.includes(' ') ? 'What sound is this letter?' : 'How is this word read?')} />
  );
}

export const SCRIPT_GAMES: GameDef[] = [
  { id: 'kana', name: 'Kana', desc: 'Hiragana for beginners, katakana next, then voiced sounds and combinations.', cat: 'special', langs: ['ja'], Comp: Kana },
  { id: 'hangul', name: 'Hangul', desc: 'Letters for beginners, then whole syllable blocks.', cat: 'special', langs: ['ko'], Comp: Hangul },
  {
    id: 'cyrillic', name: 'Cyrillic', desc: 'The alphabet for beginners, then reading whole words.', cat: 'special', langs: ['ru'], mine: true,
    check: (ctx) => (!ctx.mine || cyrWords(ctx).length >= 4 ? null : 'Save at least 4 words to play'), Comp: Cyrillic,
  },
];
