/**
 * Tiny pixel buffer used to build the adventure's art. Everything is drawn into plain RGBA buffers (no canvas), so
 * the same code runs in the browser and in `scripts/preview-adventure.ts`, which renders the map to a PNG.
 */

export class Pix {
  readonly d: Uint8ClampedArray;
  constructor(readonly w: number, readonly h: number) { this.d = new Uint8ClampedArray(w * h * 4); }

  /** Sets a pixel; colours are 0xRRGGBBAA. Translucent colours are blended over what is there. */
  set(x: number, y: number, c: number) {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const i = (y * this.w + x) * 4;
    const a = (c & 255) / 255;
    if (a <= 0) return;
    const r = c >>> 24, g = (c >>> 16) & 255, b = (c >>> 8) & 255;
    if (a >= 1) { this.d[i] = r; this.d[i + 1] = g; this.d[i + 2] = b; this.d[i + 3] = 255; return; }
    const d = this.d;
    const da = d[i + 3] / 255;
    const oa = a + da * (1 - a);
    d[i] = (r * a + d[i] * da * (1 - a)) / oa;
    d[i + 1] = (g * a + d[i + 1] * da * (1 - a)) / oa;
    d[i + 2] = (b * a + d[i + 2] * da * (1 - a)) / oa;
    d[i + 3] = oa * 255;
  }

  get(x: number, y: number): number {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return 0;
    const i = (y * this.w + x) * 4;
    return ((this.d[i] << 24) | (this.d[i + 1] << 16) | (this.d[i + 2] << 8) | this.d[i + 3]) >>> 0;
  }

  fill(x: number, y: number, w: number, h: number, c: number) {
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) this.set(xx, yy, c);
  }

  /** Draws `src` at (dx, dy), optionally mirrored, optionally only rows [sy0, sy1) of it. */
  blit(src: Pix, dx: number, dy: number, flip = false, sy0 = 0, sy1 = src.h) {
    for (let y = sy0; y < sy1; y++) {
      for (let x = 0; x < src.w; x++) {
        const c = src.get(flip ? src.w - 1 - x : x, y);
        if (c & 255) this.set(dx + x, dy + y, c);
      }
    }
  }
}

/** "#rrggbb" or "#rrggbbaa" -> 0xRRGGBBAA. */
export function hex(s: string): number {
  const v = s.replace('#', '');
  return (parseInt(v.slice(0, 6), 16) * 256 + (v.length > 6 ? parseInt(v.slice(6, 8), 16) : 255)) >>> 0;
}

/**
 * A sprite from text rows: each character is a palette key, "." is transparent. All rows must be the same width
 * (checked, so a typo shows up at once instead of as a skewed picture).
 */
export function sprite(pal: Record<string, string>, rows: string[]): Pix {
  const w = rows[0].length;
  const p = new Pix(w, rows.length);
  const cols: Record<string, number> = {};
  for (const [k, v] of Object.entries(pal)) cols[k] = hex(v);
  rows.forEach((row, y) => {
    if (row.length !== w) throw new Error(`sprite row ${y} is ${row.length} wide, expected ${w}: "${row}"`);
    for (let x = 0; x < w; x++) {
      const ch = row[x];
      if (ch === '.' || ch === ' ') continue;
      const c = cols[ch];
      if (c === undefined) throw new Error(`sprite: no colour for "${ch}"`);
      p.set(x, y, c);
    }
  });
  return p;
}

/** Deterministic 0..1 noise from integer coordinates (same picture every time). */
export function hash(x: number, y: number, s = 0): number {
  let h = (x * 374761393 + y * 668265263 + s * 2246822519) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
