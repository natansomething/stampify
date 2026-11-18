/**
 * Live reading: turning the subtitle lines read from the screen, frame after frame, into one running text. Shared by
 * LiveCapture and the subtitle tests (npm run test:subs).
 */

/** Letters only, lowercase: what two readings of the same subtitle have in common. */
export const bare = (s: string) => s.toLowerCase().replace(/[^\p{L}]/gu, '');

function distance(a: string, b: string): number {
  if (a === b) return 0;
  let prev = Array.from({ length: b.length + 1 }, (_, k) => k);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

/** The same line read twice (OCR rarely reads a line identically twice). */
export const similar = (a: string, b: string) => !!a && !!b && distance(a, b) / Math.max(a.length, b.length) < 0.25;

/** OCR leftovers at the ends of a line: stray marks before the first letter, a comma after a full stop. */
export const clean = (s: string) => s.trim()
  .replace(/^[^\p{L}\p{N}"“„«‹'(¿¡¡-]+/u, '')
  .replace(/([.!?…。！？])[,;:'`´]+$/u, '$1')
  .replace(/\s{2,}/g, ' ');

/**
 * Decides for each line read whether it is new, continues the last line or was already taken. Skipped: a line equal
 * (or nearly, OCR wobble) to one of the last two, i.e. the same subtitle read again or a rolling caption showing its
 * previous line again. Short lines that merely occur inside an earlier line are new subtitles ("跳", "好的").
 */
export class CaptionMerger {
  private recent: string[] = [];

  /** 'add': a new line; 'replace': the last line, grown (automatic captions); 'skip': already in the text. */
  add(line: string): 'add' | 'replace' | 'skip' {
    const b = bare(line);
    if (!b) return 'skip';
    const recent = this.recent;
    const prev = recent[recent.length - 1];
    // Captions that grow word by word (automatic captions): the new line continues the last one. Checked first:
    // a line one word longer is otherwise "nearly the same" as the last one and would be skipped.
    const grows = !!prev && b.length > prev.length && prev.length >= 2
      && (b.startsWith(prev) || (prev.length >= 4 && similar(b.slice(0, prev.length), prev)));
    if (!grows && recent.slice(-2).some((r) => r === b || (b.length >= 4 && (r.startsWith(b) || similar(r, b))))) return 'skip';
    if (grows) recent[recent.length - 1] = b; else recent.push(b);
    if (recent.length > 10) recent.shift();
    return grows ? 'replace' : 'add';
  }
}
