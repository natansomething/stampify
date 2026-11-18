/**
 * Finds the subtitle text in a video frame (the area the learner marked) before OCR, so that the picture, player
 * controls and on-screen graphics aren't read as letters.
 *
 * 1. Subtitle boxes first (YouTube and many players draw captions on a box of one flat dark colour, e.g. #080808):
 *    regions of one uniform dark colour are collected; where a region's left and right edges stay put row after row
 *    it is a rectangle (a two-line caption is two rectangles of different widths). A rectangle counts when all four
 *    edges are solid, it holds some text and doesn't span the whole area (a black bar under the video). The black
 *    bar (#000), the player's rounded, tinted buttons and the grey outline of burned-in subtitles are not one flat
 *    colour with straight edges, so they don't count.
 *    Alongside, lines of text on a box are found from the letters themselves: rows with many sharp edges between a
 *    letter and dark box right beside it, with a dark margin around the line. This holds where a box's outline
 *    blurs into a dark picture (a black box on dark clothing). The lines come first, boxes add lines next to them.
 * 2. Inside each box only: bright pixels are the text (binarised to black on white), split into lines by the empty
 *    rows between them. Nothing outside a box is read.
 * 3. Without boxes: the outline method. Bright white or yellow shapes with a dark edge that look like letters and
 *    sit in words near the middle of the area.
 * Works on plain ImageData so it can run (and be tested) anywhere.
 */

export interface SubLine {
  /** The line as black text on white, with a margin. */
  img: ImageData;
  /** Its height in the source (to scale it for OCR). */
  h: number;
  /** Where it is in the source (inclusive pixel bounds). */
  at: Box;
}

export interface Extracted {
  lines: SubLine[];
  /** Coarse map of the text pixels (to notice when the subtitle changes). */
  sig: Uint8Array;
  /** Number of text pixels. */
  ink: number;
  /** Subtitle boxes were found (only their contents were read). */
  boxed: boolean;
  /** A small black-and-white print of each line: two frames show the same subtitle when their prints match. */
  prints: LinePrint[];
}

/** A line shrunk to 16 rows (width in proportion), 1 = text. */
export interface LinePrint { cols: number; bits: Uint8Array }

const PRINT_ROWS = 16;

function printOf(img: ImageData): LinePrint {
  const { width: w, height: h, data } = img;
  const cols = Math.max(4, Math.min(320, Math.round((PRINT_ROWS * w) / h)));
  const bits = new Uint8Array(cols * PRINT_ROWS);
  for (let r = 0; r < PRINT_ROWS; r++) {
    for (let c = 0; c < cols; c++) {
      const y0 = Math.floor((r * h) / PRINT_ROWS), y1 = Math.max(y0 + 1, Math.floor(((r + 1) * h) / PRINT_ROWS));
      const x0 = Math.floor((c * w) / cols), x1 = Math.max(x0 + 1, Math.floor(((c + 1) * w) / cols));
      let sum = 0, n = 0;
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { sum += data[(y * w + x) * 4]; n++; }
      bits[r * cols + c] = sum / n < 200 ? 1 : 0;
    }
  }
  return { cols, bits };
}

/**
 * How different two frames' subtitles are, 0 (same) to 1: another number of lines or line lengths is a new subtitle;
 * otherwise the share of the prints' cells that differ (a longer line's extra columns count as different).
 */
export function printDiff(a: LinePrint[] | null, b: LinePrint[]): number {
  if (!a || a.length !== b.length) return 1;
  let diff = 0, all = 0;
  for (let k = 0; k < a.length; k++) {
    if (Math.abs(a[k].cols - b[k].cols) > Math.max(1, a[k].cols * 0.08)) return 1;
    const cols = Math.min(a[k].cols, b[k].cols);
    for (let r = 0; r < PRINT_ROWS; r++) {
      for (let c = 0; c < cols; c++) {
        const x = a[k].bits[r * a[k].cols + c], y = b[k].bits[r * b[k].cols + c];
        diff += x ^ y;
        all += x | y;
      }
      // The longer line's extra columns all differ: a caption that grew by a word at its end is a new one
      const [long] = a[k].cols > b[k].cols ? [a[k]] : [b[k]];
      for (let c = cols; c < long.cols; c++) { const x = long.bits[r * long.cols + c]; diff += x; all += x; }
    }
  }
  return all ? diff / all : 0;
}

/** A subtitle box (inclusive pixel bounds). */
export interface Box { x0: number; y0: number; x1: number; y1: number }

const SIG_W = 64;
const SIG_H = 16;

const lumOf = (d: Uint8ClampedArray, i: number) => d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;

/** Bright white, or the yellow some subtitles use. */
function isTextPixel(d: Uint8ClampedArray, i: number): boolean {
  const r = d[i], g = d[i + 1], b = d[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (min >= 175 && max - min < 60) return true; // white / light grey
  return r >= 185 && g >= 165 && b < 120; // yellow
}

// ---------------- 1. subtitle boxes ----------------

/** A box colour: dark and neutral (not the blue-grey of player buttons, nor a dark but tinted picture). */
const BOX_MAX = 60;
const BOX_TINT = 18;
/** The strict pass: the largest tint of a box pixel's dark neighbourhood (averaged). */
const STRICT_TINT = 7;
/**
 * How far a box pixel may be from the colour where its region started (per channel): video and screen-capture
 * compression make a flat box colour waver by several steps; darker parts of the picture are further off.
 */
const BOX_TOL = 14;
/** How far a box's sides may wander from row to row (blur from scaling). */
const EDGE_JITTER = 2;

/**
 * Each pixel's tint (largest minus smallest colour channel) averaged over the dark pixels of its 5x5 neighbourhood:
 * compression noise averages out, and a box's edge pixels are not mixed with the brighter picture beside them.
 */
const TINT_R = 2;
function darkTint(d: Uint8ClampedArray, W: number, H: number): Uint8Array {
  // A summed-area table of the dark pixels' channels and count (interleaved): any window's sums in four look-ups
  const W1 = W + 1;
  const sat = new Int32Array(W1 * (H + 1) * 4);
  for (let y = 0; y < H; y++) {
    let rr = 0, rg = 0, rb = 0, rk = 0;
    let i = y * W * 4, o = ((y + 1) * W1 + 1) * 4, u = (y * W1 + 1) * 4;
    for (let x = 0; x < W; x++, i += 4, o += 4, u += 4) {
      const R = d[i], G = d[i + 1], B = d[i + 2];
      if (R <= BOX_MAX && G <= BOX_MAX && B <= BOX_MAX) { rr += R; rg += G; rb += B; rk++; }
      sat[o] = sat[u] + rr; sat[o + 1] = sat[u + 1] + rg; sat[o + 2] = sat[u + 2] + rb; sat[o + 3] = sat[u + 3] + rk;
    }
  }
  const out = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    const ya = (y - TINT_R < 0 ? 0 : y - TINT_R) * W1, yb = ((y + TINT_R >= H ? H - 1 : y + TINT_R) + 1) * W1;
    for (let x = 0; x < W; x++) {
      const xa = x - TINT_R < 0 ? 0 : x - TINT_R, xb = (x + TINT_R >= W ? W - 1 : x + TINT_R) + 1;
      const p11 = (yb + xb) * 4, p01 = (ya + xb) * 4, p10 = (yb + xa) * 4, p00 = (ya + xa) * 4;
      const k = sat[p11 + 3] - sat[p01 + 3] - sat[p10 + 3] + sat[p00 + 3];
      if (!k) { out[y * W + x] = 255; continue; }
      const r = sat[p11] - sat[p01] - sat[p10] + sat[p00];
      const g = sat[p11 + 1] - sat[p01 + 1] - sat[p10 + 1] + sat[p00 + 1];
      const b = sat[p11 + 2] - sat[p01 + 2] - sat[p10 + 2] + sat[p00 + 2];
      const mx = r > g ? (r > b ? r : b) : (g > b ? g : b), mn = r < g ? (r < b ? r : b) : (g < b ? g : b);
      const t = ((mx - mn) / k + 0.5) | 0;
      out[y * W + x] = t > 255 ? 255 : t;
    }
  }
  return out;
}

/**
 * Subtitle boxes. Regions of one dark neutral colour are collected (8-connected, so a box stays one region even
 * where its padding beside small letters is only a pixel wide). Anything dark touching a box (black parts of the
 * picture) can only push a row's ends outward, never inward, so a box's sides are x positions where many rows of
 * the region end exactly; its rows are those that end on both sides, plus neighbouring rows that at least cover it.
 * Widest first, so a two-line caption (wide line over narrow line) gives two boxes, not one.
 */
function findBoxes(d: Uint8ClampedArray, W: number, H: number, strict: boolean): Box[] {
  const n = W * H;
  const region = new Int32Array(n);
  const stack = new Int32Array(n);
  const rowMin = new Int32Array(H);
  const rowMax = new Int32Array(H);
  const hist = new Int32Array(W);
  const boxes: Box[] = [];
  let id = 0;
  // Dark neutral pixels, decided once (the fill below looks at every pixel up to eight times)
  // Strict: the tint is judged on each pixel's dark neighbourhood, where compression noise averages out but a real
  // colour cast stays (a dark bluish picture right beside a neutral black box would otherwise join the box)
  const dk = new Uint8Array(n);
  const tint = strict ? darkTint(d, W, H) : null;
  for (let p = 0, i = 0; p < n; p++, i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    const max = r > g ? (r > b ? r : b) : (g > b ? g : b);
    const min = r < g ? (r < b ? r : b) : (g < b ? g : b);
    dk[p] = max <= BOX_MAX && (tint ? tint[p] <= STRICT_TINT : max - min <= BOX_TINT) ? 1 : 0;
  }
  const darkAt = (p: number) => dk[p] === 1;

  for (let seed = 0; seed < n; seed++) {
    if (region[seed] || !dk[seed]) continue;
    id++;
    const si = seed * 4;
    const [sr, sg, sb] = [d[si], d[si + 1], d[si + 2]];
    let y0 = H, y1 = -1, count = 0;
    let sp = 0;
    stack[sp++] = seed;
    region[seed] = id;
    while (sp) {
      const p = stack[--sp];
      const x = p % W;
      const y = (p - x) / W;
      count++;
      if (y < y0) { for (let yy = y; yy < y0; yy++) { rowMin[yy] = W; rowMax[yy] = -1; } y0 = y; }
      if (y > y1) { for (let yy = Math.max(y1 + 1, y0); yy <= y; yy++) { rowMin[yy] = W; rowMax[yy] = -1; } y1 = y; }
      if (x < rowMin[y]) rowMin[y] = x;
      if (x > rowMax[y]) rowMax[y] = x;
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= H) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= W) continue;
          const q = yy * W + xx;
          if (region[q] || !dk[q]) continue;
          const qi = q * 4;
          const dr = d[qi] - sr, dg = d[qi + 1] - sg, db = d[qi + 2] - sb;
          if (dr <= BOX_TOL && dr >= -BOX_TOL && dg <= BOX_TOL && dg >= -BOX_TOL && db <= BOX_TOL && db >= -BOX_TOL) {
            region[q] = id;
            stack[sp++] = q;
          }
        }
      }
    }
    if (count < 60 || y1 - y0 + 1 < 7) continue;

    // Candidate sides: x positions where at least 6 rows end (within the jitter); counted in one pass
    const edges = (side: Int32Array) => {
      hist.fill(0, 0, W);
      for (let y = y0; y <= y1; y++) if (rowMax[y] >= 0) hist[side[y]]++;
      const out: number[] = [];
      for (let v = 0; v < W; v++) {
        if (!hist[v]) continue;
        let m = 0;
        for (let k = Math.max(0, v - EDGE_JITTER); k <= Math.min(W - 1, v + EDGE_JITTER); k++) m += hist[k];
        if (m >= 6 && !out.some((o) => Math.abs(o - v) <= EDGE_JITTER)) out.push(v);
      }
      return out;
    };
    const lefts = edges(rowMin);
    const rights = edges(rowMax);
    if (!lefts.length || !rights.length) continue;
    const pairs = lefts.flatMap((a) => rights.filter((b) => b - a >= 14).map((b) => [a, b] as const)).sort((p, q) => (q[1] - q[0]) - (p[1] - p[0]));
    const mine: Box[] = [];
    const claimed = (y: number, a: number, b: number) => mine.some((m) => y >= m.y0 && y <= m.y1 && a <= m.x1 && b >= m.x0);
    for (const [a, b] of pairs) {
      const ends = (y: number) => rowMax[y] >= 0 && Math.abs(rowMin[y] - a) <= EDGE_JITTER && Math.abs(rowMax[y] - b) <= EDGE_JITTER;
      const covers = (y: number) => rowMax[y] >= 0 && rowMin[y] <= a + EDGE_JITTER && rowMax[y] >= b - EDGE_JITTER;
      for (let y = y0; y <= y1; y++) {
        if (!ends(y) || claimed(y, a, b)) continue;
        let top = y, bot = y;
        while (bot + 1 <= y1 && covers(bot + 1) && !claimed(bot + 1, a, b)) bot++;
        while (top - 1 >= y0 && covers(top - 1) && !claimed(top - 1, a, b)) top--;
        let exact = 0;
        for (let r = top; r <= bot; r++) if (ends(r)) exact++;
        if (exact >= 4 && bot - top + 1 >= 7) {
          const box: Box = { x0: a, x1: b, y0: top, y1: bot };
          if (isBox(box)) { mine.push(box); boxes.push(box); }
        }
        y = bot;
      }
    }
  }
  // A box inside another (the dark space enclosed by a character's strokes) is not a box; subtitle boxes reach
  // into the middle third of the area (a small dark button at the side, like the captions switch, is not one)
  const out = boxes.filter((b) => !boxes.some((o) => o !== b && b.x0 >= o.x0 && b.x1 <= o.x1 && b.y0 >= o.y0 && b.y1 <= o.y1)
    && b.x1 >= W / 3 && b.x0 <= (2 * W) / 3);
  return out;

  /**
   * All four sides solid (checked a pixel inside them, where blur doesn't reach; a letter touching a side counts),
   * open to the picture beyond its left and right sides, some (not mostly) bright text, and not a full-width bar.
   */
  function isBox(b: Box): boolean {
    const w = b.x1 - b.x0 + 1;
    const h = b.y1 - b.y0 + 1;
    if (w < 14) return false;
    if (b.x0 <= 1 && b.x1 >= W - 2) return false;
    const solid = (x: number, y: number) => darkAt(y * W + x) || lumOf(d, (y * W + x) * 4) >= 120;
    // Each side at the better of its outer two pixel lines: blur may soften the outermost one, and with small
    // letters the padding is so thin that the next one runs through their soft edges
    const lx = Math.min(b.x1, b.x0 + 1), rx = Math.max(b.x0, b.x1 - 1), ty = Math.min(b.y1, b.y0 + 1), by = Math.max(b.y0, b.y1 - 1);
    const rowSolid = (y: number) => { let k = 0; for (let x = lx; x <= rx; x++) if (solid(x, y)) k++; return k; };
    const colSolid = (x: number) => { let k = 0; for (let y = ty; y <= by; y++) if (solid(x, y)) k++; return k; };
    const top = Math.max(rowSolid(b.y0), rowSolid(ty)), bottom = Math.max(rowSolid(b.y1), rowSolid(by));
    const left = Math.max(colSolid(b.x0), colSolid(lx)), right = Math.max(colSolid(b.x1), colSolid(rx));
    const iw = rx - lx + 1, ih = by - ty + 1;
    if (top < iw * 0.75 || bottom < iw * 0.75 || left < ih * 0.75 || right < ih * 0.75) return false;
    // A real box ends there: just outside its left and right sides the picture shows on many rows (something dark
    // may touch it on some). A dark strip inside a larger black area does not.
    let openL = 0, openR = 0;
    for (let y = b.y0; y <= b.y1; y++) {
      if (b.x0 - 2 < 0 || !darkAt(y * W + b.x0 - 2)) openL++;
      if (b.x1 + 2 >= W || !darkAt(y * W + b.x1 + 2)) openR++;
    }
    if (openL < h * 0.4 || openR < h * 0.4) return false;
    let text = 0;
    for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) if (lumOf(d, (y * W + x) * 4) >= 150) text++;
    return text >= w * h * 0.02 && text <= w * h * 0.6;
  }
}

// ---------------- 0. text on a box, found by its edges ----------------

/** A row of a text line has at least this many sharp edges between a letter and dark box right beside it. */
const BAND_EDGES = 4;
/** Of the pixels in the margin around a line, at least this share is dark: the line sits on a box. */
const BAND_DARK = 0.8;

/**
 * Lines of light text on a dark box, found from the text rather than from the box's outline: rows with many sharp
 * edges between a letter pixel and a dark pixel right beside it (hair, skin and the picture have soft edges), whose
 * surroundings are dark. Works where a box's sides can't be told from a dark picture around it. Each line comes back
 * as a box of its own (the line's extent, padded), read like any subtitle box.
 */
function textBands(d: Uint8ClampedArray, W: number, H: number): Box[] {
  const n = W * H;
  const text = new Uint8Array(n);
  const dark = new Uint8Array(n);
  for (let p = 0, i = 0; p < n; p++, i += 4) {
    if (isTextPixel(d, i)) text[p] = 1;
    else if (lumOf(d, i) <= 70) dark[p] = 1;
  }
  // Edges per row: a letter pixel next to dark (within three pixels) on its left or right
  const edges = new Int32Array(H);
  const edgeAt = (p: number, x: number) => text[p] && (
    (x >= 1 && !text[p - 1] && (dark[p - 1] || (x >= 2 && dark[p - 2]) || (x >= 3 && dark[p - 3])))
    || (x + 1 < W && !text[p + 1] && (dark[p + 1] || (x + 2 < W && dark[p + 2]) || (x + 3 < W && dark[p + 3]))));
  for (let y = 0; y < H; y++) { let k = 0; for (let x = 0, p = y * W; x < W; x++, p++) if (edgeAt(p, x)) k++; edges[y] = k; }

  const out: Box[] = [];
  for (let y = 0; y < H;) {
    if (edges[y] < BAND_EDGES) { y++; continue; }
    // A line's core: rows with many edges (a one-row dip allowed), then its ascenders and descenders
    let y1 = y;
    while (y1 + 1 < H && (edges[y1 + 1] >= BAND_EDGES || (y1 + 2 < H && edges[y1 + 2] >= BAND_EDGES && edges[y1 + 1] > 0))) y1++;
    const core = y1 - y + 1;
    let top = y, bot = y1;
    const reach = Math.max(2, Math.round(core * 0.4));
    while (top - 1 >= 0 && y - top < reach && edges[top - 1] > 0) top--;
    while (bot + 1 < H && bot - y1 < reach && edges[bot + 1] > 0) bot++;
    y = bot + 1;
    if (core < 6) continue;
    // The line's extent: edge columns in its core rows, grouped where gaps are at most a word space
    const cols = new Uint8Array(W);
    for (let yy = top; yy <= bot; yy++) for (let x = 0, p = yy * W; x < W; x++, p++) if (edgeAt(p, x)) cols[x] = 1;
    const gap = Math.max(12, Math.round(core * 1.6));
    let best: [number, number, number] | null = null;
    for (let x = 0; x < W;) {
      if (!cols[x]) { x++; continue; }
      let x1 = x, k = 0, last = x;
      for (let xx = x; xx < W && xx - last <= gap; xx++) if (cols[xx]) { last = xx; k++; }
      x1 = last;
      if (!best || k > best[2]) best = [x, x1, k];
      x = x1 + 1;
    }
    if (!best) continue;
    const [x0, x1] = best;
    const w = x1 - x0 + 1, h = bot - top + 1;
    if (w < h * 0.7 || best[2] < 6) continue;
    // On a box: the margin around the line (two rows above and below, two columns at each end) is dark nearly
    // everywhere (between the letters there may be much grey from smoothing); and it is text, not a few specks
    let t = 0, dk = 0, all = 0;
    for (let yy = top; yy <= bot; yy++) for (let x = x0, p = yy * W + x0; x <= x1; x++, p++) if (text[p]) t++;
    const margin = (x: number, y: number) => { if (x < 0 || y < 0 || x >= W || y >= H) return; all++; if (dark[y * W + x]) dk++; };
    for (let x = x0 - 2; x <= x1 + 2; x++) { margin(x, top - 2); margin(x, top - 1); margin(x, bot + 1); margin(x, bot + 2); }
    for (let yy = top; yy <= bot; yy++) { margin(x0 - 2, yy); margin(x0 - 1, yy); margin(x1 + 1, yy); margin(x1 + 2, yy); }
    if (!all || dk / all < BAND_DARK || t < w * h * 0.05 || t > w * h * 0.6) continue;
    out.push({ x0, x1, y0: top, y1: bot });
  }
  // Padding: a little dark space around each line, without reaching into the next
  return out.map((b, k) => {
    const up = k ? Math.floor((b.y0 - out[k - 1].y1 - 1) / 2) : 4;
    const down = k + 1 < out.length ? Math.floor((out[k + 1].y0 - b.y1 - 1) / 2) : 4;
    return { x0: Math.max(0, b.x0 - 4), x1: Math.min(W - 1, b.x1 + 4), y0: Math.max(0, b.y0 - Math.min(4, up)), y1: Math.min(H - 1, b.y1 + Math.min(4, down)) };
  });
}

/** Two boxes are lines of one subtitle: one right above the other, overlapping sideways. */
function nextLine(a: Box, b: Box): boolean {
  const h = Math.min(a.y1 - a.y0, b.y1 - b.y0) + 1;
  const gap = Math.max(a.y0, b.y0) - Math.min(a.y1, b.y1) - 1;
  const over = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
  return gap <= h * 0.6 && over > 0.3 * Math.min(a.x1 - a.x0, b.x1 - b.x0);
}
/** Overlapping by more than a few rows (a line's padding may touch the next box). */
const overlaps = (a: Box, b: Box) => a.x0 <= b.x1 && b.x0 <= a.x1 && Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0) >= 3;

/**
 * The subtitle's boxes from the text lines found on a box and the boxes found. The lines first (a box's outline can
 * blur into a dark picture; the letters' edges don't): the group of neighbouring lines with the most text (a
 * player's own labels, like the time, are smaller and apart), plus any box right above or below them that covers no
 * line of theirs. Without lines, the boxes.
 */
function withBands(boxes: Box[], bands: Box[]): Box[] {
  if (!bands.length) return boxes;
  const groups: Box[][] = [];
  for (const b of bands) {
    const g = groups.find((gr) => gr.some((x) => nextLine(x, b)));
    if (g) g.push(b); else groups.push([b]);
  }
  const area = (g: Box[]) => g.reduce((t, b) => t + (b.x1 - b.x0) * (b.y1 - b.y0), 0);
  groups.sort((p, q) => area(q) - area(p));
  const out = [...groups[0]];
  const rest = boxes.filter((x) => !bands.some((b) => overlaps(x, b)));
  for (let added = true; added;) {
    added = false;
    for (const x of rest) if (!out.includes(x) && out.some((b) => nextLine(b, x))) { out.push(x); added = true; }
  }
  return out;
}

/** The text inside the boxes: bright pixels, binarised, split into lines by empty rows. */
function boxLines(d: Uint8ClampedArray, W: number, H: number, boxes: Box[]): Extracted {
  const lines: SubLine[] = [];
  const sig = new Uint8Array(SIG_W * SIG_H);
  let ink = 0;
  for (const b of [...boxes].sort((a, c) => a.y0 - c.y0 || a.x0 - c.x0)) {
    // Text: clearly brighter than the box (letters are white or yellow on near-black)
    // The box's own brightness: the average of its dark pixels (one corner pixel may be noise or blur)
    let bs = 0, bn = 0;
    for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) { const v = lumOf(d, (y * W + x) * 4); if (v < 70) { bs += v; bn++; } }
    const base = bn ? bs / bn : 10;
    const cut = base + (255 - base) * 0.45;
    // The line images keep the letters' soft edges (box -> white, letters -> black, edges grey): small Chinese
    // characters read far better smooth than cut hard to black and white
    const tone = (x: number, y: number) => {
      const v = (lumOf(d, (y * W + x) * 4) - base) / Math.max(1, 230 - base);
      return 255 - Math.round(255 * Math.min(1, Math.max(0, v)));
    };
    const bw = b.x1 - b.x0 + 1;
    const bh = b.y1 - b.y0 + 1;
    const on = new Uint8Array(bw * bh);
    const rows = new Int32Array(bh);
    for (let y = 0; y < bh; y++) {
      for (let x = 0; x < bw; x++) {
        if (lumOf(d, ((b.y0 + y) * W + b.x0 + x) * 4) < cut) continue;
        on[y * bw + x] = 1;
        rows[y]++;
        ink++;
        sig[Math.floor(((b.y0 + y) * SIG_H) / H) * SIG_W + Math.floor(((b.x0 + x) * SIG_W) / W)] = 1;
      }
    }
    // Lines: runs of rows with text
    for (let y = 0; y < bh;) {
      if (!rows[y]) { y++; continue; }
      let y1 = y;
      while (y1 + 1 < bh && rows[y1 + 1]) y1++;
      const lh = y1 - y + 1;
      if (lh >= 5) {
        let x0 = bw, x1 = -1;
        for (let yy = y; yy <= y1; yy++) for (let x = 0; x < bw; x++) if (on[yy * bw + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; }
        const pad = Math.max(6, Math.round(lh * 0.4));
        const ow = x1 - x0 + 1 + pad * 2;
        const oh = lh + pad * 2;
        const out = new ImageData(ow, oh);
        out.data.fill(255);
        // The line's rows plus one row above and below (soft edges), only inside the box
        for (let yy = Math.max(0, y - 1); yy <= Math.min(bh - 1, y1 + 1); yy++) {
          for (let x = Math.max(0, x0 - 1); x <= Math.min(bw - 1, x1 + 1); x++) {
            const o = ((yy - y + pad) * ow + (x - x0 + pad)) * 4;
            out.data[o] = out.data[o + 1] = out.data[o + 2] = tone(b.x0 + x, b.y0 + yy);
          }
        }
        lines.push({ img: out, h: lh, at: { x0: b.x0 + x0, x1: b.x0 + x1, y0: b.y0 + y, y1: b.y0 + y1 } });
      }
      y = y1 + 1;
    }
  }
  return { lines, sig, ink, boxed: true, prints: lines.map((x) => printOf(x.img)) };
}

// ---------------- 2. the outline method (no boxes) ----------------

interface Comp { x0: number; y0: number; x1: number; y1: number; area: number; id: number }

function outlineLines(d: Uint8ClampedArray, W: number, H: number): Extracted {
  const n = W * H;
  const mask = new Uint8Array(n);
  const lum = new Float32Array(n);
  for (let p = 0, i = 0; p < n; p++, i += 4) {
    lum[p] = lumOf(d, i);
    mask[p] = isTextPixel(d, i) ? 1 : 0;
  }

  // Connected shapes of text pixels (8-connected)
  const label = new Int32Array(n);
  const comps: Comp[] = [];
  const stack = new Int32Array(n);
  for (let start = 0; start < n; start++) {
    if (!mask[start] || label[start]) continue;
    const id = comps.length + 1;
    const c: Comp = { x0: W, y0: H, x1: 0, y1: 0, area: 0, id };
    let sp = 0;
    stack[sp++] = start;
    label[start] = id;
    while (sp) {
      const p = stack[--sp];
      const x = p % W;
      const y = (p - x) / W;
      c.area++;
      if (x < c.x0) c.x0 = x;
      if (x > c.x1) c.x1 = x;
      if (y < c.y0) c.y0 = y;
      if (y > c.y1) c.y1 = y;
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= H) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= W) continue;
          const q = yy * W + xx;
          if (mask[q] && !label[q]) { label[q] = id; stack[sp++] = q; }
        }
      }
    }
    comps.push(c);
  }

  // Shapes that look like letters with a dark edge
  const keep = new Uint8Array(comps.length + 1);
  const cands: Comp[] = [];
  for (const c of comps) {
    const w = c.x1 - c.x0 + 1;
    const h = c.y1 - c.y0 + 1;
    if (c.area < 3) continue;
    if (h > H * 0.6 || w > W * 0.5 || h > 160) continue; // a big bright object, a bar
    // The pixels around the shape (1-3 px outside its box): mostly dark, the letters' outline or shadow
    let dark = 0;
    let other = 0;
    const ring = (x: number, y: number) => {
      if (x < 0 || y < 0 || x >= W || y >= H) return;
      const q = y * W + x;
      if (mask[q]) return;
      other++;
      if (lum[q] < 110) dark++;
    };
    for (let k = 1; k <= 3; k++) {
      for (let x = c.x0 - k; x <= c.x1 + k; x += 2) { ring(x, c.y0 - k); ring(x, c.y1 + k); }
      for (let y = c.y0 - k; y <= c.y1 + k; y += 2) { ring(c.x0 - k, y); ring(c.x1 + k, y); }
    }
    if (other && dark / other < 0.4) continue;
    cands.push(c);
  }
  // Compared with the typical letter (median height of the sizeable shapes): far taller shapes, and solid blobs
  // that are both wide and tall, are objects; thin solid strokes (l, i, I) and small dots (. , ·) are letters.
  const heights = cands.map((c) => c.y1 - c.y0 + 1).filter((h) => h >= 6).sort((a, b) => a - b);
  const letter = heights.length ? heights[Math.floor(heights.length / 2)] : 0;
  const sized = cands.filter((c) => {
    const w = c.x1 - c.x0 + 1;
    const h = c.y1 - c.y0 + 1;
    if (letter && h > letter * 1.9) return false;
    if (letter && c.area / (w * h) > 0.85 && w > letter * 0.5 && h > letter * 0.5) return false;
    return true;
  });
  // Letters come in words: a shape stays when another shape sits beside it on the same line, or, for small marks,
  // just above one (i-dots, umlauts, accents) or almost touching one from below (ç, ą, ę).
  const hOf = (c: Comp) => c.y1 - c.y0 + 1;
  const beside = (a: Comp, b: Comp) => {
    const overlap = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0) + 1;
    const gap = Math.max(a.x0, b.x0) - Math.min(a.x1, b.x1);
    return overlap >= 0.5 * Math.min(hOf(a), hOf(b)) && gap <= Math.max(4, letter * 1.2);
  };
  const above = (mark: Comp, b: Comp) =>
    hOf(mark) <= letter * 0.45 && mark.y1 < b.y0 && b.y0 - mark.y1 <= Math.max(3, letter * 0.5)
    && Math.min(mark.x1, b.x1) >= Math.max(mark.x0, b.x0);
  const below = (mark: Comp, b: Comp) =>
    hOf(mark) <= letter * 0.45 && mark.y0 > b.y1 && mark.y0 - b.y1 <= Math.max(2, letter * 0.08)
    && Math.min(mark.x1, b.x1) >= Math.max(mark.x0, b.x0);
  for (const c of sized) {
    if (!letter || sized.some((o) => o !== c && (beside(c, o) || above(c, o) || below(c, o)))) keep[c.id] = 1;
  }

  // Rows that hold kept pixels -> text lines (small gaps inside a line are bridged)
  const rows = new Int32Array(H);
  let ink = 0;
  const sig = new Uint8Array(SIG_W * SIG_H);
  for (let p = 0; p < n; p++) {
    if (!keep[label[p]]) continue;
    const x = p % W;
    const y = (p - x) / W;
    rows[y]++;
    ink++;
    sig[Math.floor((y * SIG_H) / H) * SIG_W + Math.floor((x * SIG_W) / W)] = 1;
  }
  const bands: [number, number][] = [];
  for (let y = 0; y < H; y++) {
    if (!rows[y]) continue;
    const last = bands[bands.length - 1];
    if (last && y - last[1] <= 3) last[1] = y;
    else bands.push([y, y]);
  }

  const lines: SubLine[] = [];
  for (const [b0, b1] of bands) {
    const bh = b1 - b0 + 1;
    if (bh < 7) continue; // a stray speck, not a line of text
    // The line's shapes, left to right, split where the gap is wider than a few letters
    const inBand = comps.filter((c) => keep[c.id] && c.y0 >= b0 && c.y1 <= b1).sort((a, b) => a.x0 - b.x0);
    const groups: Comp[][] = [];
    for (const c of inBand) {
      const g = groups[groups.length - 1];
      if (g && c.x0 - Math.max(...g.map((x) => x.x1)) <= bh * 2) g.push(c);
      else groups.push([c]);
    }
    // Subtitles sit around the middle: keep groups that reach into the middle third of the area
    const mid = groups.filter((g) => {
      const x0 = Math.min(...g.map((c) => c.x0));
      const x1 = Math.max(...g.map((c) => c.x1));
      return x1 >= W / 3 && x0 <= (2 * W) / 3 && g.reduce((s, c) => s + c.area, 0) >= bh * 4;
    });
    if (!mid.length) continue;
    const ids = new Set(mid.flat().map((c) => c.id));
    const x0 = Math.min(...mid.flat().map((c) => c.x0));
    const x1 = Math.max(...mid.flat().map((c) => c.x1));
    const pad = Math.max(6, Math.round(bh * 0.4));
    const lw = x1 - x0 + 1 + pad * 2;
    const lh = bh + pad * 2;
    const out = new ImageData(lw, lh);
    out.data.fill(255);
    for (let y = b0; y <= b1; y++) {
      for (let x = x0; x <= x1; x++) {
        if (!ids.has(label[y * W + x])) continue;
        const o = ((y - b0 + pad) * lw + (x - x0 + pad)) * 4;
        out.data[o] = out.data[o + 1] = out.data[o + 2] = 0;
      }
    }
    lines.push({ img: out, h: bh, at: { x0, x1, y0: b0, y1: b1 } });
  }
  return { lines, sig, ink, boxed: false, prints: lines.map((x) => printOf(x.img)) };
}

// ---------------- the frame ----------------

/** `boxesOnly`: subtitles have been on boxes lately; a frame without a box then has no subtitle (no outline method). */
export function extractSubtitles(src: ImageData, { boxesOnly = false } = {}): Extracted {
  const { width: W, height: H, data: d } = src;
  // Subtitle boxes, strict first (boxes on a dark, slightly coloured picture), then the plain colour test, which
  // copes better with small boxes blended into the picture; and lines of text on a box found from their letters
  let found = findBoxes(d, W, H, true);
  if (!found.length) found = findBoxes(d, W, H, false);
  const boxes = withBands(found, textBands(d, W, H));
  if (boxes.length) return boxLines(d, W, H, boxes);
  if (boxesOnly) return { lines: [], sig: new Uint8Array(SIG_W * SIG_H), ink: 0, boxed: false, prints: [] };
  return outlineLines(d, W, H);
}

/** Share of the coarse map that differs between two frames. */
export function sigDiff(a: Uint8Array | null, b: Uint8Array): number {
  if (!a) return 1;
  let diff = 0;
  let on = 0;
  for (let i = 0; i < b.length; i++) { diff += a[i] ^ b[i]; on += a[i] | b[i]; }
  return on ? diff / on : 0;
}
