/** Pinyin helpers shared by the app and the content validator. */

const INITIALS = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's', 'y', 'w'];
// Finals with ü written as v. Initial + final over-generates a little (e.g. "bv"), which is fine for counting syllables.
const FINALS = 'a o e i u v ai ei ao ou an en ang eng ong er ia ie iao iu ian in iang ing iong io ua uo uai ui uan un uang ue ve van vn'.split(' ');
// Without an initial only these finals occur (the rest are spelled with y/w); plus erhua "r".
const BARE = 'a o e ai ei ao ou an en ang eng er r'.split(' ');

const SYLLABLES = new Set<string>(BARE);
for (const i of INITIALS) for (const f of FINALS) SYLLABLES.add(i + f);

/**
 * Can word[i..j) be a syllable? Inside a word a syllable starting with a/o/e must follow an apostrophe
 * (so it can only start a chunk), and erhua "r" only ends one.
 */
function fits(word: string, i: number, j: number): boolean {
  const s = word.slice(i, j);
  if (!SYLLABLES.has(s)) return false;
  if (s === 'r') return i > 0 && j === word.length;
  return i === 0 || !/^[aoe]/.test(s);
}

const TONE_MARKS: Record<string, number> = { '̄': 1, '́': 2, '̌': 3, '̀': 4 };

/** Lowercase, toneless, ü -> v. */
export function plain(p: string): string {
  return p
    .normalize('NFD')
    .replace(/ü/g, 'v')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

/** All possible syllable counts of a pinyin string (spaces, apostrophes and hyphens separate syllables). */
export function syllableCounts(p: string): Set<number> {
  let total = new Set<number>([0]);
  for (const chunk of plain(p).split(/[\s'’\-]+/).filter(Boolean)) {
    const word = chunk.replace(/[^a-z]/g, '');
    if (!word) continue;
    // ways[i] = set of syllable counts that segment word[0..i)
    const ways: Set<number>[] = Array.from({ length: word.length + 1 }, () => new Set<number>());
    ways[0].add(0);
    for (let i = 0; i < word.length; i++) {
      if (!ways[i].size) continue;
      for (let j = i + 1; j <= Math.min(word.length, i + 6); j++) {
        if (fits(word, i, j)) for (const c of ways[i]) ways[j].add(c + 1);
      }
    }
    const next = new Set<number>();
    for (const t of total) for (const c of ways[word.length]) next.add(t + c);
    total = next;
  }
  return total;
}

/** Tone of a single syllable: 1-4, or 5 for neutral. */
export function toneOf(syllable: string): number {
  for (const ch of syllable.normalize('NFD')) if (TONE_MARKS[ch]) return TONE_MARKS[ch];
  return 5;
}

/** Number of Han characters in a string. */
export function hanCount(s: string): number {
  return (s.match(/\p{Script=Han}/gu) || []).length;
}

/** Does this pinyin fit the number of characters? */
export function pinyinFits(hanzi: string, pinyin: string): boolean {
  const n = hanCount(hanzi);
  return n === 0 || syllableCounts(pinyin).has(n);
}

/**
 * Splits pinyin with tone marks into syllables, keeping the marks: "xièxie" -> ["xiè", "xie"].
 * Uses the toneless form to find boundaries (prefers fewer, longer syllables).
 */
export function splitSyllables(p: string): string[] {
  const res: string[] = [];
  for (const chunk of p.split(/[\s'’\-]+/).filter(Boolean)) {
    const nfc = chunk.normalize('NFC');
    const chars = [...nfc];
    const base = chars.map((c) => plain(c).replace(/[^a-z]/g, ''));
    // DP over character positions; base[k] is "" for punctuation, which joins the neighbouring syllable
    const n = chars.length;
    const best: (number[] | null)[] = Array(n + 1).fill(null);
    best[0] = [];
    for (let i = 0; i < n; i++) {
      if (!best[i]) continue;
      for (let j = n; j > i; j--) {
        if (fits(base.join(''), base.slice(0, i).join('').length, base.slice(0, j).join('').length) && (!best[j] || best[j]!.length > best[i]!.length + 1)) best[j] = [...best[i]!, j];
      }
    }
    if (!best[n]) { res.push(nfc); continue; }
    let start = 0;
    for (const end of best[n]!) { res.push(chars.slice(start, end).join('')); start = end; }
  }
  return res;
}

const MARKS = ['̄', '́', '̌', '̀'];

/** Puts tone `tone` (1-4; 5 = none) on a toneless syllable: a/e take the mark, then the o of "ou", else the last vowel. */
export function applyTone(syllable: string, tone: number): string {
  const s = plain(syllable).replace(/v/g, 'ü');
  if (tone < 1 || tone > 4) return s;
  let k = s.search(/[ae]/);
  if (k < 0) k = s.indexOf('ou');
  if (k < 0) {
    const vowels = [...s.matchAll(/[iouü]/g)];
    k = vowels.length ? vowels[vowels.length - 1].index! : -1;
  }
  if (k < 0) return s;
  return (s.slice(0, k + 1) + MARKS[tone - 1] + s.slice(k + 1)).normalize('NFC');
}
