/**
 * Where the video is in a shared window or screen, for placing the live-reading area automatically: the video is
 * the big part that keeps changing while the page around it (menus, comments, the browser) stays still. Small
 * snapshots are compared a few times; the largest rectangle of moving cells is the video, extended through black
 * letterbox bars above and below it (they don't move but belong to the player). If it fills almost the whole frame,
 * the video is full screen and the whole frame counts.
 */

export interface Area { x: number; y: number; w: number; h: number }

/** Snapshot size (the frame is drawn into this). */
export const SNAP_W = 160;
export const SNAP_H = 90;
/** A cell moved when its brightness changed by more than this between two snapshots. */
const MOVE = 14;
/** Snapshots compared before deciding. */
const MIN_SAMPLES = 6;

const lum = (d: Uint8ClampedArray, i: number) => d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;

/** The longest run of `on` indexes, bridging gaps of up to `gap`. */
function longestRun(on: boolean[], gap: number): [number, number] | null {
  let best: [number, number] | null = null;
  let start = -1, last = -1;
  const close = () => { if (start >= 0 && (!best || last - start > best[1] - best[0])) best = [start, last]; };
  on.forEach((v, i) => {
    if (!v) return;
    if (start < 0 || i - last > gap + 1) { close(); start = i; }
    last = i;
  });
  close();
  return best;
}

export class VideoFinder {
  private prev: Float32Array | null = null;
  private moved = new Uint16Array(SNAP_W * SNAP_H);
  private samples = 0;

  /** Adds a snapshot (SNAP_W x SNAP_H). */
  add(img: ImageData) {
    const g = new Float32Array(SNAP_W * SNAP_H);
    for (let p = 0; p < g.length; p++) g[p] = lum(img.data, p * 4);
    if (this.prev) {
      for (let p = 0; p < g.length; p++) if (Math.abs(g[p] - this.prev[p]) > MOVE) this.moved[p]++;
      this.samples++;
    }
    this.prev = g;
  }

  /** The video's area (fractions of the frame), once enough snapshots show a big moving rectangle; else null. */
  video(last: ImageData): Area | null {
    if (this.samples < MIN_SAMPLES) return null;
    // A cell belongs to the video when it changed at least twice (once may be the mouse pointer)
    const isMoving = (x: number, y: number) => this.moved[y * SNAP_W + x] >= 2;
    const cols = Array.from({ length: SNAP_W }, (_, x) => { let n = 0; for (let y = 0; y < SNAP_H; y++) if (isMoving(x, y)) n++; return n >= SNAP_H * 0.08; });
    const xs = longestRun(cols, 2);
    if (!xs || xs[1] - xs[0] + 1 < SNAP_W * 0.15) return null;
    const rows = Array.from({ length: SNAP_H }, (_, y) => { let n = 0; for (let x = xs[0]; x <= xs[1]; x++) if (isMoving(x, y)) n++; return n >= (xs[1] - xs[0] + 1) * 0.08; });
    const ys = longestRun(rows, 2);
    if (!ys || ys[1] - ys[0] + 1 < SNAP_H * 0.15) return null;
    let [y0, y1] = ys;
    // Letterbox bars: rows of the same width that are (nearly) all black
    const black = (y: number) => {
      let n = 0;
      for (let x = xs[0]; x <= xs[1]; x++) if (lum(last.data, (y * SNAP_W + x) * 4) < 30) n++;
      return n >= (xs[1] - xs[0] + 1) * 0.75;
    };
    while (y1 + 1 < SNAP_H && black(y1 + 1)) y1++;
    while (y0 > 0 && black(y0 - 1)) y0--;
    const w = xs[1] - xs[0] + 1, h = y1 - y0 + 1;
    // Full screen: the video is the whole frame
    if (w >= SNAP_W * 0.9 && h >= SNAP_H * 0.85) return { x: 0, y: 0, w: 1, h: 1 };
    return { x: xs[0] / SNAP_W, y: y0 / SNAP_H, w: w / SNAP_W, h: h / SNAP_H };
  }
}

/** The reading area: the bottom 30% of the video, its full width. */
export const subtitleArea = (v: Area): Area => ({ x: v.x, y: v.y + v.h * 0.7, w: v.w, h: v.h * 0.3 });
