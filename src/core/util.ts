/** Small shared helpers. */

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** n distinct items from arr that are not `exclude` (compared by key). */
export function distractors<T>(arr: readonly T[], exclude: T, n: number, key: (x: T) => string): T[] {
  const seen = new Set([key(exclude)]);
  const out: T[] = [];
  for (const x of shuffle(arr)) {
    const k = key(x);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
    if (out.length === n) break;
  }
  return out;
}

/** Local day number (days since 1970-01-01 in the user's time zone). */
export function today(): number {
  const d = new Date();
  return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
}

export function dayToDate(day: number): Date {
  const d = new Date(day * 86400000);
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

export const stripAccents = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');

/** Lowercase, trimmed, single spaces, no sentence punctuation. Used to compare typed answers. */
export function norm(s: string): string {
  return s
    .normalize('NFC')
    .toLowerCase()
    .replace(/[.,!?¿¡;:"“”„«»()。，！？：；、「」『』…]/g, ' ')
    .replace(/[’`]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/** Spellings a keyboard without special letters produces (ä -> ae, ß -> ss, ł -> l, œ -> oe). */
function fold(s: string): string {
  return s.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/ł/g, 'l').replace(/œ/g, 'oe').replace(/æ/g, 'ae');
}

export type Verdict = 'ok' | 'close' | 'wrong';

/**
 * Compares a typed answer with the expected one. "close" = right apart from accents, umlauts, ß or ł
 * (counted as correct, but the learner sees the proper spelling).
 */
export function compare(input: string, expected: string | string[]): Verdict {
  const exp = (Array.isArray(expected) ? expected : [expected]).map(norm);
  const a = norm(input);
  if (!a) return 'wrong';
  if (exp.includes(a)) return 'ok';
  const loose = (s: string) => stripAccents(fold(s));
  if (exp.some((e) => loose(e) === loose(a))) return 'close';
  return 'wrong';
}

export function cls(...xs: (string | false | 0 | null | undefined)[]): string {
  return xs.filter(Boolean).join(' ');
}

export function plural(n: number, word: string, many = word + 's'): string {
  return `${n} ${n === 1 ? word : many}`;
}

const PLACEHOLDERS = new Set([
  'etwas', 'jemand', 'jemandem', 'jemanden', 'jemandes', 'sich', 'algo', 'alguien', 'se', 'quelque', 'chose', 'qn', 'qch', "s'",
  'qualcosa', 'qualcuno', 'si', 'alguém', 'iets', 'iemand', 'zich', 'coś', 'kogoś', 'czegoś', 'się', 'что-то', 'кого-то', 'себя', 'ся',
]);

/**
 * Word starts that identify a word in a sentence despite inflection ("gehst" for gehen is found; irregular forms
 * like "fui" for ir are missed). Phrases use their real words, without placeholders like "etwas" and short words like "de".
 * For languages written with spaces; Korean verbs lose their 다.
 */
export function stems(w: string, verb = false): string[] {
  const words = w.toLowerCase().split(/[\s.…]+/).filter((x) => x && !PLACEHOLDERS.has(x));
  const keep = words.length > 1 ? words.filter((x) => x.length >= 3) : words;
  // Verbs: the stem before the infinitive ending (vivir -> viv, gehen -> geh), so conjugated forms match
  const base = (x: string) => (x.length > 1 && x.endsWith('다') ? x.slice(0, -1)
    : verb && x.length > 4 ? x.replace(/(are|ere|ire|ować|ać|eć|ić|yć|ться|ать|ять|еть|ить|ти|ar|er|ir|re|en|n)$/, '') : x);
  return keep.map(base).map((x) => (x.length <= 4 ? x : x.slice(0, 4)));
}
