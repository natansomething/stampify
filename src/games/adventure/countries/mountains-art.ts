/**
 * Rockland's pixel art: alpine meadows and layered limestone cliffs, a stone town on a gorge, a miners' town of
 * brown rock and rails, and a pass climbing into snow. '#' is never a forest here: it is rock, drawn as cliffs with
 * shaded faces, grassy or snowy tops and terraces further in. Chalets, the stone bridge, the cable car and the
 * mine are DECOR sprites; the animals are NPCS.
 */
import { DECOR, DECOR_SIZE, ITEMS, NPCS, disc, grass, grassAt, line, outlined, palette, registerTheme, shadowEllipse, tallGrass, vnoise, water, type TerrainHook } from '../art';
import { hash, hex, Pix, sprite } from '../pix';

type At = (x: number, y: number) => string;
const T = 16;
const H = hex;
const mod = (a: number, n: number) => ((a % n) + n) % n;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

// ---------------------------------------------------------------- colours

/** Cliff faces, darkest (cracks) to lightest (lit lips): warm limestone, cool high rock, brown mine rock. */
const FACE_WARM = ['#3b302b', '#5f534a', '#7f7266', '#a09283', '#c4b7a5'].map(H);
const FACE_COOL = ['#2c3240', '#4b5466', '#6b7689', '#8f9aac', '#b6c0cf'].map(H);
const FACE_MINE = ['#33241a', '#5a4030', '#7a5a42', '#9a7656', '#bc9874'].map(H);
const OUTLINE = H('#221a16');
/** Grass on the cliff tops (a little darker than the meadow below). */
const CAP_GRASS = ['#4b843c', '#5a9645', '#6aa64e', '#7fb85b'].map(H);
const SNOW = ['#cdd8e6', '#dbe4ef', '#e8eef6', '#f6f9fd'].map(H);
const SNOW_SHADE = H('#b4c2d6');
const ICE = ['#9ccbe4', '#b6dcef', '#d4ecf8', '#f0faff'].map(H);
const FALL = ['#2f78a8', '#4f9fd0', '#86c8ec', '#c8ecfb', '#ffffff'].map(H);

interface Style {
  /** Cliff face tones. */
  face: number[];
  /** The ground: alpine meadow, flagstones, mine gravel, snow, or meadow below a snow line. */
  ground: 'meadow' | 'flag' | 'gravel' | 'snow' | 'mixed';
  /** Tops of the rock: grass, snow, or below/above a snow line. */
  cap: 'grass' | 'snow' | 'mixed' | 'rock';
  bridge: 'stone' | 'wood';
  /** Water is frozen (a lake up in the snow). */
  ice?: boolean;
  /** Fast water (the gorge): foam streaks. */
  rapids?: boolean;
  /** Where the snow line is (world tile row) for 'mixed'. */
  snowline?: number;
}

const SNOWLINE = new Map<number, number>();
const snowy = (st: Style, wx: number, wy: number) => {
  if (st.ground === 'snow' || st.cap === 'snow') return true;
  if (st.ground !== 'mixed' && st.cap !== 'mixed') return false;
  let base = SNOWLINE.get(wx);
  if (base === undefined) SNOWLINE.set(wx, (base = (vnoise(wx, 0, 37, 801) - 0.5) * 70));
  const line = (st.snowline ?? 12) * T + base;
  if (Math.abs(wy - line) > 8) return wy < line;
  return wy < line + (vnoise(wx, wy, 11, 802) - 0.5) * 14;
};

/** The plain ground colour at a world pixel (no details): what shows at the edges of paths and cliffs. */
function groundAt(st: Style, wx: number, wy: number): number {
  if (st.ground === 'snow' || (st.ground === 'mixed' && snowy(st, wx, wy))) {
    const n = vnoise(wx, wy, 24, 810) * 0.7 + vnoise(wx, wy, 6, 811) * 0.3;
    return SNOW[n < 0.38 ? 0 : n < 0.55 ? 1 : n < 0.72 ? 2 : 3];
  }
  if (st.ground === 'flag') return flagAt(wx, wy);
  if (st.ground === 'gravel') {
    const C = palette();
    const n = vnoise(wx, wy, 14, 820) * 0.6 + hash(wx, wy, 821) * 0.4;
    return C.ground[n < 0.35 ? 0 : n < 0.55 ? 1 : n < 0.75 ? 2 : 3];
  }
  return grassAt(wx, wy);
}

/** Stonebridge's paving: big irregular slabs in rows, with dark joints and a lit top edge. */
function flagAt(wx: number, wy: number): number {
  const C = palette();
  const row = Math.floor(wy / 7);
  const ry = wy - row * 7;
  const off = Math.floor(hash(row, 0, 830) * 9);
  const w = 8 + Math.floor(hash(row, 1, 831) * 4);
  const col = Math.floor((wx + off) / w), cx = mod(wx + off, w);
  if (ry === 6 || cx === 0) return C.grassDark;
  if (ry === 0 || cx === 1) return C.grassLight;
  const t = hash(col, row, 832);
  const n = (hash(wx, wy, 833) - 0.5) * 0.2;
  return C.ground[clamp(Math.floor((t + n) * 3.2) + (ry > 4 ? -1 : 0), 0, 3)];
}

// ---------------------------------------------------------------- rock

/**
 * A cliff face: tall columns of rock split by vertical fissures, a few horizontal bedding seams, lit on the left of
 * each column, a ledge part-way down (two tiers), a lit lip at the top and a dark foot. `depth` is how far below the
 * top of the face the pixel is, `h` the face height.
 */
const WAVE = new Map<number, number>();
function strata(tones: number[], wx: number, wy: number, depth: number, h: number, snow: boolean): number {
  let j = WAVE.get(wx);
  if (j === undefined) WAVE.set(wx, (j = Math.round((vnoise(wx, 0, 29, 840) - 0.5) * 10)));
  // columns 5–9 px wide, each a little different in tone
  const band = Math.floor((wy + j) / 13);
  const cw = 5 + Math.floor(hash(band, 1, 842) * 6), sx = wx + Math.floor(hash(band, 0, 841) * 9);
  const col = Math.floor(sx / cw), xIn = mod(sx, cw);
  const seamY = mod(wy + j, 13);
  const r = hash(col, Math.floor((wy + j) / 13), 843);
  let t = r < 0.35 ? 2 : r < 0.8 ? 2 : 3;
  if (xIn === 0) t = hash(col, band, 845) < 0.55 ? 0 : 1;
  else if (xIn === 1) t += 1;
  else if (xIn === cw - 1) t -= 1;
  if (seamY === 12 && hash(col, Math.floor((wy + j) / 13), 846) < 0.6) t = 1;
  // the ledge between the two tiers
  const ledge = Math.round(h * 0.45);
  if (depth === ledge) t = snow ? 5 : 4;
  else if (depth === ledge + 1) t = 0;
  else if (depth > ledge + 1 && depth < ledge + 4) t = Math.min(t, 1);
  if (depth < 1) t = 4;
  else if (depth < 3) t = Math.max(t, 3);
  if (h - depth <= 2) t = 0;
  else if (h - depth <= 6) t = Math.min(t, 1);
  if (t === 5) return SNOW[3];
  if (!snow && depth === ledge && hash(wx, 1, 851) < 0.45) return CAP_GRASS[2];
  if (snow && depth === ledge - 1 && hash(wx, 2, 852) < 0.5) return SNOW[2];
  return tones[clamp(t, 0, 4)];
}

/** Smooth noise for every pixel of a tile (and a margin around it), sampled every 4 px and blended. */
function lattice(tx: number, ty: number, cell: number, seed: number, m = 0): Float32Array {
  const n = (T + 2 * m) / 4 + 1, size = T + 2 * m;
  const N: number[] = [];
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) N.push(vnoise(tx * T - m + i * 4, ty * T - m + j * 4, cell, seed));
  const a = new Float32Array(size * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const gi = Math.min(n - 2, x >> 2), gj = Math.min(n - 2, y >> 2), bx = (x - gi * 4) / 4, by = (y - gj * 4) / 4;
    a[y * size + x] = N[gj * n + gi] * (1 - bx) * (1 - by) + N[gj * n + gi + 1] * bx * (1 - by) + N[(gj + 1) * n + gi] * (1 - bx) * by + N[(gj + 1) * n + gi + 1] * bx * by;
  }
  return a;
}

/** Per theme: how much of the rock mass is forest (region below), scree and crags (region above). */
const REGION: Record<string, [number, number]> = { meadow: [0.5, 0.74], flag: [0.46, 0.72], gravel: [0.36, 0.6], mixed: [0.52, 0.68], snow: [0.36, 0.6] };
const FOREST_FLOOR = H('#2e5428');

/**
 * The top of the rock mass, a landscape at a large scale: hills shaded from the top left (no outlines), meadow,
 * scree and crags chosen by a slow noise, snow higher up. Forest is laid over it afterwards.
 */
function massAt(st: Style, wx: number, wy: number, sh: number, r: number, rsh: number): number {
  const [forest, rock] = REGION[st.ground];
  const sn = st.cap === 'snow' || (st.cap === 'mixed' && snowy(st, wx, wy));
  const d = sh + (hash(wx, wy, 853) - 0.5) * 0.04;
  const k = d > 0.1 ? 3 : d > -0.01 ? 2 : d > -0.12 ? 1 : 0;
  if (r > rock) {
    // crags: each outcrop lit on its top left, shaded and outlined on its bottom right
    const tones = sn ? FACE_COOL : st.face;
    if (r - rock < 0.014) return rsh < 0 ? tones[0] : sn ? SNOW[3] : tones[4];
    if (sn && rsh > 0.004) return SNOW[3];
    const e = rsh * 60 + (r - rock) * 2 + (hash(wx, wy, 854) - 0.5) * 0.15;
    let t = e > 0.5 ? 4 : e > 0.05 ? 3 : e > -0.4 ? 2 : 1;
    // vertical fissures and a few ledges, so an outcrop reads as rock
    const band = Math.floor(wy / 17), sx = wx + Math.floor(hash(band, 0, 857) * 11) + Math.floor(mod(wy, 17) / 6);
    const fx = mod(sx, 11), fid = Math.floor(sx / 11);
    if (fx === 0 && hash(fid, band, 858) < 0.4) t -= 1;
    else if (fx === 1 && hash(fid, band, 858) < 0.4) t = Math.min(4, t + 1);
    if (sn && t >= 3 && hash(Math.floor(wx / 3), Math.floor(wy / 2), 859) < 0.25) return SNOW[2];
    return tones[clamp(t, 1, 4)];
  }
  if (sn) return k === 0 ? SNOW_SHADE : SNOW[k];
  if (r < forest) return FOREST_FLOOR;
  if (st.cap === 'rock') return DRY_GRASS[k];
  if (hash(wx, wy, 855) < 0.004) return [H('#5a7ae8'), H('#ffffff'), H('#f4d040')][Math.floor(hash(wx, wy, 856) * 3)];
  return CAP_GRASS[k];
}
const DRY_GRASS = ['#6e6a3a', '#827c44', '#96904e', '#aaa25c'].map(H);

/** Spruces for the forests on the rock (18×28, standing on their bottom row): green and snowy, two shapes each. */
const FIRS: Pix[] = [false, true].flatMap((snow) => [0, 1].map((v) => {
  const W = 18, Hh = 28, p = new Pix(W, Hh);
  const tones = ['#143424', '#1c4630', '#28603e', '#3a7a4c'].map(H);
  const tiers = 5;
  for (let y = Hh - 4; y < Hh; y++) { p.set(8, y, H('#4a2c18')); p.set(9, y, H('#2e1a0e')); }
  for (let k = tiers - 1; k >= 0; k--) {
    const top = k * 4 + v, bottom = top + 8, half = 2.5 + k * 1.3 + v * 0.3;
    for (let y = top; y <= bottom && y < Hh - 3; y++) {
      const f = (y - top) / (bottom - top), hw = half * Math.pow(f, 0.8);
      for (let x = Math.round(8.5 - hw); x <= Math.round(8.5 + hw); x++) {
        const edge = x === Math.round(8.5 - hw) || x === Math.round(8.5 + hw) || y === bottom;
        const side = (x - 8.5) / (half + 1);
        let lv = -side * 0.7 - f * 0.25 + (hash(x, y, 1500 + v) - 0.5) * 0.15;
        if (y > bottom - 2) lv -= 0.3;
        let c = edge ? H('#0a1c12') : tones[lv < -0.35 ? 0 : lv < -0.05 ? 1 : lv < 0.25 ? 2 : 3];
        if (snow && !edge && y >= bottom - 2 && side < 0.4) c = side < -0.1 ? SNOW[3] : SNOW[1];
        if (snow && !edge && k === 0 && y < top + 3) c = SNOW[3];
        p.set(x, y, c);
      }
    }
  }
  return p;
}));
const FIR_SHADOW = H('#0a140c50');
/** Each fir's opaque pixels by row, [x, colour, x, colour…], so drawing a slice of it is quick. */
const FIR_ROWS = FIRS.map((s) => Array.from({ length: s.h }, (_, y) => { const r: number[] = []; for (let x = 0; x < s.w; x++) { const c = s.get(x, y); if (c & 255) r.push(x, c); } return r; }));
const ANCHORS = new WeakMap<At, Map<number, number>>();

/**
 * Forest on the rock: firs on a jittered grid wherever the slow noise says forest, drawn in depth order so the
 * crowns overlap like a real wood. Only trees whose whole footprint stands on rock well above any cliff face are
 * drawn, and only onto the mass (never onto faces, rims or water).
 */
function forest(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, st: Style, mask: Uint8Array) {
  const [thr] = REGION[st.ground];
  const GX = 8, GY = 6;
  const x0 = tx * T - 10, x1 = tx * T + T + 10, y0 = ty * T, y1 = ty * T + T + 28;
  const trees: [number, number, number][] = [];
  let cache = ANCHORS.get(at);
  if (!cache) ANCHORS.set(at, (cache = new Map()));
  for (let j = Math.floor(y0 / GY); j <= Math.floor(y1 / GY); j++) for (let i = Math.floor(x0 / GX); i <= Math.floor(x1 / GX); i++) {
    const ax = i * GX + Math.floor(hash(i, j, 1510) * 6), ay = j * GY + Math.floor(hash(i, j, 1511) * 5);
    if (ax + 9 < tx * T || ax - 9 > tx * T + T || ay - 28 > ty * T + T || ay < ty * T) continue;
    const key = i * 100003 + j;
    let v = cache.get(key);
    if (v === undefined) {
      v = -1;
      const r = vnoise(ax, ay, 110, 1520);
      if (r <= thr - hash(i, j, 1512) * 0.06) {
        const bx = Math.floor(ax / T), by = Math.floor(ay / T);
        let ok = true;
        for (let dy = -2; dy <= 3 && ok; dy++) for (const dx of [Math.floor((ax - 9) / T) - bx, 0, Math.floor((ax + 9) / T) - bx]) if (at(bx + dx, by + dy) !== '#') { ok = false; break; }
        if (ok) v = ((st.cap === 'snow' || (st.cap === 'mixed' && snowy(st, ax, ay))) ? 2 : 0) + (hash(i, j, 1513) < 0.5 ? 0 : 1);
      }
      cache.set(key, v);
    }
    if (v >= 0) trees.push([ay, ax, v]);
  }
  trees.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const put = (wx: number, wy: number, c: number) => {
    const x = wx - tx * T, y = wy - ty * T;
    if (x < 0 || y < 0 || x >= T || y >= T || !mask[y * T + x]) return;
    p.set(ox + x, oy + y, c);
  };
  for (const [ay, ax, v] of trees) {
    for (let k = -6; k <= 6; k++) { put(ax + k, ay, FIR_SHADOW); if (Math.abs(k) < 5) put(ax + k + 1, ay + 1, FIR_SHADOW); }
    const rows = FIR_ROWS[v], top = ay - rows.length + 1;
    for (let y = Math.max(0, ty * T - top); y < Math.min(rows.length, ty * T + T - top); y++) {
      const r = rows[y];
      for (let k = 0; k < r.length; k += 2) put(ax - 8 + r[k], top + y, r[k + 1]);
    }
  }
}

/**
 * A '#' tile: rock. Where it meets walkable ground below, a tall cliff face (up to three tiles, in two tiers); walkable
 * tiles beside it get a rim; water beside it (the gorge) a sheer wall; everything else is the landscape on top
 * (meadow, scree, crags, snow, forest). Water running into a cliff from above comes down it as a waterfall.
 */
function cliff(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number, st: Style) {
  const R = (x: number, y: number) => at(x, y) === '#';
  const W = (x: number, y: number) => at(x, y) === '~';
  const bottom = !R(tx, ty + 1) ? ty : !R(tx, ty + 2) ? ty + 1 : !R(tx, ty + 3) ? ty + 2 : null;
  const fall = bottom !== null && W(tx, bottom + 1);
  // a stream running over the rock to a waterfall below
  let stream = -1;
  for (let k = 1; k <= 5; k++) { if (W(tx, ty + k)) { stream = ty + k; break; } if (!R(tx, ty + k)) break; }
  const sl = stream >= 0 && !W(tx - 1, stream), sr = stream >= 0 && !W(tx + 1, stream);
  const FH = Array.from({ length: T }, (_, x) => 34 + Math.round(vnoise(tx * T + x, 7, 13, 870) * 10));
  const openL = !R(tx - 1, ty) && !W(tx - 1, ty), openR = !R(tx + 1, ty) && !W(tx + 1, ty), openU = !R(tx, ty - 1) && !W(tx, ty - 1);
  const LX = Array.from({ length: T }, (_, y) => (openL ? Math.round(vnoise(0, ty * T + y, 6, 873) * 2) : 0));
  const RX = Array.from({ length: T }, (_, y) => (openR ? 15 - Math.round(vnoise(1, ty * T + y, 6, 874) * 2) : 15));
  const UY = Array.from({ length: T }, (_, x) => (openU ? Math.round(vnoise(tx * T + x, 2, 6, 875) * 2) : 0));
  // hill shading: a slow height field, lit from the top left
  const M = 4, S = T + 2 * M;
  const hf = lattice(tx, ty, 70, 860, M), hf2 = lattice(tx, ty, 26, 861, M);
  const reg = lattice(tx, ty, 110, 1520, M);
  const hAt = (x: number, y: number) => hf[(y + M) * S + x + M] * 0.88 + hf2[(y + M) * S + x + M] * 0.12;
  const rAt = (x: number, y: number) => reg[(y + M) * S + x + M];
  const mask = new Uint8Array(T * T);
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    let c: number | null = null;
    const fh = FH[x];
    if (stream >= 0 && (bottom === null || wy < bottom * T + T - fh - 1)) {
      // the stream in its rocky bed
      // banks of wet stones that wander a little, the stream narrower than the fall it feeds
      const bl = sl ? 3 + Math.round(vnoise(tx * 31, wy, 9, 896) * 3) : -1, br = sr ? 12 - Math.round(vnoise(tx * 37, wy, 9, 897) * 3) : 16;
      if (x < bl || x > br) {
        const stone = hash(Math.floor((wx + 1) / 3), Math.floor(wy / 3), 898);
        c = x === bl - 1 || x === br + 1 ? st.face[0] : stone < 0.5 ? st.face[2] : stone < 0.8 ? st.face[3] : null;
        if (c !== null && ((x < bl - 3 && sl) || (x > br + 3 && sr))) c = null;
      } else { const h = hash(wx, Math.floor((wy - frame * 4) / 3), 892); c = h > 0.85 ? FALL[4] : h > 0.55 ? FALL[2] : FALL[1]; if (x === bl || x === br) c = FALL[3]; }
    }
    if (c === null && bottom !== null) {
      const top = bottom * T + T - fh;
      const sn = snowy(st, wx, wy);
      if (wy >= top) {
        if (fall) c = fallAt(wx, wy, top, fh, x, tx, bottom, at, frame);
        else c = strata(st.face, wx, wy, wy - top, fh, sn);
        // the ends of the face round off where the ground continues beside it
        const foot = Math.max(0, wy - top - fh + 12) / 3;
        if (!R(tx - 1, bottom) && !W(tx - 1, bottom) && x < 1 + foot) c = x === Math.floor(foot) ? OUTLINE : groundAt(st, wx, wy);
        if (!R(tx + 1, bottom) && !W(tx + 1, bottom) && x > 14 - foot) c = x === 15 - Math.floor(foot) ? OUTLINE : groundAt(st, wx, wy);
      } else if (wy >= top - 1) c = fall ? FALL[2] : OUTLINE;
      else if (wy >= top - 3) {
        // the lit rim: grass or snow hanging over the edge
        const sn2 = st.cap === 'snow' || (st.cap === 'mixed' && sn);
        c = fall ? FALL[3] : sn2 ? (wy === top - 2 ? SNOW[3] : SNOW[2]) : st.cap === 'rock' ? st.face[4] : (wy === top - 2 ? CAP_GRASS[2] : CAP_GRASS[3]);
      }
    }
    if (c === null) {
      // sheer walls down to water beside (the gorge)
      const ww = 6 + Math.round(vnoise(7, wy, 8, 872) * 4);
      if (W(tx + 1, ty) && x >= T - ww) c = x === T - ww ? OUTLINE : gorgeWall(st, wx, wy, (x - (T - ww)) / ww);
      else if (W(tx - 1, ty) && x < ww) c = x === ww - 1 ? OUTLINE : gorgeWall(st, wx, wy, 1 - x / ww);
    }
    if (c === null) {
      // rims where walkable ground lies beside or above the rock
      const lx = LX[y], rx = RX[y], uy = UY[x];
      if (openU && y < uy) c = groundAt(st, wx, wy);
      else if (openU && y === uy) c = OUTLINE;
      else if (openU && y <= uy + 2 && !(openL && x <= lx) && !(openR && x > rx)) c = st.cap === 'snow' || snowy(st, wx, wy) ? (y === uy + 1 ? SNOW[3] : SNOW[2]) : st.cap === 'rock' ? st.face[y === uy + 1 ? 4 : 3] : CAP_GRASS[y === uy + 1 ? 3 : 2];
      else if (openL && x < lx) c = groundAt(st, wx, wy);
      else if (openL && x === lx) c = OUTLINE;
      else if (openR && x > rx + 1) c = groundAt(st, wx, wy);
      else if (openR && x === rx + 1) c = OUTLINE;
      else if (openR && x >= rx - 1) c = st.face[x === rx ? 1 : 2];
      else if (openL && x === lx + 1) c = st.face[4];
    }
    if (c === null) {
      const sh = (hAt(x + 3, y + 3) - hAt(x - 3, y - 3)) * 3.2;
      c = massAt(st, wx, wy, sh, rAt(x, y), rAt(x + 2, y + 2) - rAt(x - 2, y - 2));
      mask[y * T + x] = 1;
    }
    p.set(ox + x, oy + y, c);
  }
  if (!fall) forest(p, ox, oy, tx, ty, at, st, mask);
  // now and then a boulder on an open meadow or snowfield
  if (bottom === null && stream < 0 && hash(tx, ty, 880) < 0.05) {
    const r = rAt(8, 8), [fo, ro] = REGION[st.ground];
    let clear = true;
    for (let i = 0; i < T * T; i++) if (!mask[i]) { clear = false; break; }
    const bx = Math.floor(hash(tx, ty, 881) * 5) - 2, by = Math.floor(hash(tx, ty, 882) * 3) - 2;
    if (clear && r > fo + 0.04 && r < ro) p.blit(snowy(st, tx * T + 8, ty * T + 8) || st.cap === 'snow' ? BOULDERS.cool : st.ground === 'gravel' ? BOULDERS.mine : BOULDERS.warm, ox + bx, oy + by);
  }
}

function gorgeWall(st: Style, wx: number, wy: number, t: number): number {
  const n = vnoise(wx, wy, 5, 880) + (hash(wx, Math.floor(wy / 3), 881) - 0.5) * 0.4 - t * 0.9;
  return st.face[clamp(Math.floor(n * 3 + 1.2), 0, 3)];
}

/**
 * A waterfall over a cliff face: the water pours over three rock ledges, foaming white where it hits each one, with
 * streaks running down between (two frames) and wet dark rock at its sides; spray at the foot.
 */
function fallAt(wx: number, wy: number, top: number, fh: number, x: number, tx: number, bottom: number, at: At, frame: number): number {
  const wl = at(tx - 1, bottom + 1) !== '~', wr = at(tx + 1, bottom + 1) !== '~';
  const d = wy - top;
  // the ledges: steps of rock jutting out under the water
  const steps = [Math.round(fh * 0.3), Math.round(fh * 0.62)];
  // jagged rock at the sides, narrower at the top, the water spreading as it falls; ledges jut out
  const spread = Math.round((1 - d / fh) * 2);
  const jut = steps.some((s) => d >= s - 1 && d < s + 2) ? 2 : 0;
  const el = 1 + spread + jut + Math.round(vnoise(tx * 13, wy, 5, 896) * 2), er = 1 + spread + jut + Math.round(vnoise(tx * 17, wy, 5, 897) * 2);
  if ((wl && x < el) || (wr && x > 15 - er)) {
    const edge = (wl && x === el - 1) || (wr && x === 16 - er);
    return edge ? FALL[3] : jut && hash(wx, d, 899) < 0.5 ? FACE_WARM[3] : (d + x) % 4 === 0 ? FACE_WARM[2] : FACE_WARM[1];
  }
  for (const s of steps) {
    if (d === s - 1) return FALL[3];
    if (d === s || d === s + 1) return hash(wx, d + frame, 893) < 0.7 ? FALL[4] : FALL[3];
    if (d === s + 2) return hash(wx, d + frame * 2, 894) < 0.5 ? FALL[3] : FALL[2];
  }
  if (d < 2) return d === 0 ? FALL[3] : FALL[4];
  if (fh - d <= 4) return hash(wx, wy + frame * 3, 895) < 0.6 ? FALL[4] : FALL[3];
  const s = hash(wx, Math.floor((wy - frame * 4) / 5), 890);
  const lane = hash(wx, 0, 891);
  if (s > 0.85) return FALL[4];
  if (s > 0.6) return FALL[3];
  return lane < 0.35 ? FALL[1] : FALL[2];
}

// ---------------------------------------------------------------- ground

function rubble(p: Pix, ox: number, oy: number, tx: number, ty: number, st: Style) {
  const k = st.face;
  for (let i = 0; i < 3; i++) {
    if (hash(tx, ty, 900 + i) < 0.45) continue;
    const x = 1 + Math.floor(hash(tx, ty, 910 + i) * 13), y = 2 + Math.floor(hash(tx, ty, 920 + i) * 4);
    p.set(ox + x, oy + y, k[3]); p.set(ox + x + 1, oy + y, k[2]); p.set(ox + x, oy + y + 1, k[1]); p.set(ox + x + 1, oy + y + 1, k[0]);
  }
}

/** Tiny alpine flowers and pebbles scattered on the meadow (none on many tiles). */
function meadowBits(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const cols = ['#5a7ae8', '#ffffff', '#f4d040', '#e870a8'].map(H);
  const n = Math.floor(hash(tx, ty, 930) * 3.4) - 1;
  for (let i = 0; i < n; i++) {
    const x = 2 + Math.floor(hash(tx, ty, 931 + i) * 12), y = 2 + Math.floor(hash(tx, ty, 941 + i) * 12);
    p.set(ox + x, oy + y + 1, H('#3e7a34'));
    p.set(ox + x, oy + y, cols[Math.floor(hash(tx, ty, 951 + i) * 4)]);
  }
  if (hash(tx, ty, 960) < 0.18) {
    const x = 3 + Math.floor(hash(tx, ty, 961) * 10), y = 4 + Math.floor(hash(tx, ty, 962) * 9);
    p.set(ox + x, oy + y, H('#c8c2b8')); p.set(ox + x + 1, oy + y, H('#a8a298')); p.set(ox + x, oy + y + 1, H('#7a746a')); p.set(ox + x + 1, oy + y + 1, H('#5a544a'));
  }
}

function groundTile(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, st: Style) {
  const wx0 = tx * T, wy0 = ty * T;
  if (st.ground === 'meadow') {
    grass(p, ox, oy, tx, ty);
    meadowBits(p, ox, oy, tx, ty);
  } else if (st.ground === 'mixed') {
    grass(p, ox, oy, tx, ty);
    let any = false;
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const wx = wx0 + x, wy = wy0 + y;
      if (snowy(st, wx, wy)) { any = true; p.set(ox + x, oy + y, groundAt(st, wx, wy)); }
      else if (snowy(st, wx, wy - 1) || snowy(st, wx, wy - 2)) p.set(ox + x, oy + y, SNOW_SHADE);
    }
    if (!any) meadowBits(p, ox, oy, tx, ty);
    else snowBits(p, ox, oy, tx, ty, st);
  } else {
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, groundAt(st, wx0 + x, wy0 + y));
    if (st.ground === 'snow') snowBits(p, ox, oy, tx, ty, st);
    if (st.ground === 'gravel') {
      for (let i = 0; i < 4; i++) {
        const x = 1 + Math.floor(hash(tx, ty, 970 + i) * 14), y = 1 + Math.floor(hash(tx, ty, 975 + i) * 14);
        p.set(ox + x, oy + y, st.face[3]); p.set(ox + x + 1, oy + y + 1, st.face[0]); p.set(ox + x + 1, oy + y, st.face[2]);
      }
      if (hash(tx, ty, 979) < 0.3) { const x = 3 + Math.floor(hash(tx, ty, 980) * 10); p.set(ox + x, oy + 9, H('#6a8a3a')); p.set(ox + x + 1, oy + 8, H('#8aaa4a')); p.set(ox + x + 2, oy + 9, H('#6a8a3a')); }
    }
    if (st.ground === 'flag' && hash(tx, ty, 985) < 0.25) {
      const x = 2 + Math.floor(hash(tx, ty, 986) * 11);
      p.set(ox + x, oy + 6, H('#5a8a3a')); p.set(ox + x + 1, oy + 5, H('#7aaa4a'));
    }
  }
  // the cliff above shades the foot of the rock, with fallen stones lying there
  if (at(tx, ty - 1) === '#') {
    for (let x = 0; x < T; x++) { p.set(ox + x, oy, H('#14101c66')); p.set(ox + x, oy + 1, H('#14101c40')); p.set(ox + x, oy + 2, H('#14101c22')); }
    rubble(p, ox, oy, tx, ty, st);
  }
  if (at(tx - 1, ty) === '#') for (let y = 0; y < T; y++) { p.set(ox, oy + y, H('#14101c33')); p.set(ox + 1, oy + y, H('#14101c1a')); }
}

function snowBits(p: Pix, ox: number, oy: number, tx: number, ty: number, st: Style) {
  // grass tips and small stones poking through, glints
  if (hash(tx, ty, 990) < 0.35) {
    const x = 2 + Math.floor(hash(tx, ty, 991) * 11), y = 4 + Math.floor(hash(tx, ty, 992) * 9);
    if (!snowy(st, tx * T + x, ty * T + y)) return;
    p.set(ox + x, oy + y, H('#7a8a6a')); p.set(ox + x + 1, oy + y - 1, H('#9aaa7a')); p.set(ox + x + 2, oy + y, H('#7a8a6a'));
  }
  if (hash(tx, ty, 993) < 0.25) {
    const x = 3 + Math.floor(hash(tx, ty, 994) * 10), y = 3 + Math.floor(hash(tx, ty, 995) * 10);
    p.set(ox + x, oy + y, FACE_COOL[3]); p.set(ox + x + 1, oy + y, FACE_COOL[2]); p.set(ox + x, oy + y + 1, FACE_COOL[1]); p.set(ox + x + 1, oy + y + 1, FACE_COOL[0]);
    p.set(ox + x, oy + y - 1, SNOW[3]);
  }
}

/** Alpine flowers for the r / y / w codes: alpenrose, arnica, edelweiss (an icy puddle up in the snow). */
const ALPENROSE = sprite({ k: '#2e5a26', g: '#4e8a3a', r: '#e0405a', R: '#a82a44', l: '#ff8a9a' }, [
  '..lr.rl.',
  '.rRrrRr.',
  '..rgkr..',
  '.gkggkg.',
  'gkg..gk.',
]);
const ARNICA = sprite({ k: '#2e5a26', g: '#5a9a42', y: '#ffc83a', o: '#e88a1a', Y: '#fff08a' }, [
  '.y.y....',
  'yoyY.y.y',
  '.y.yoyoy',
  '..g..yg.',
  '.gk.gk..',
]);
const EDELWEISS = sprite({ k: '#5a6a5a', w: '#f4f6f0', W: '#cfd8cc', y: '#e8d86a', g: '#6a8a5a' }, [
  '..w.....',
  '.wyw.w..',
  'wWyWwyw.',
  '.kWkWyW.',
  '..g.kgk.',
]);

function flowerTile(p: Pix, ox: number, oy: number, tx: number, ty: number, c: string, st: Style) {
  if (c === 'w' && (st.ground === 'snow' || (st.ground === 'mixed' && snowy(st, tx * T + 8, ty * T + 8)))) {
    // a frozen puddle
    disc(p, ox + 8, oy + 8.5, 6, (d, x, y) => (d > 5.2 ? H('#7aa8c8') : ICE[clamp(Math.floor(2 - (x - ox - 8) / 4 - (y - oy - 8) / 4), 0, 3)]));
    line(p, ox + 5, oy + 6, ox + 9, oy + 10, ICE[3]); line(p, ox + 9, oy + 10, ox + 12, oy + 9, ICE[3]);
    return;
  }
  const spr = c === 'r' ? ALPENROSE : c === 'y' ? ARNICA : EDELWEISS;
  p.blit(spr, ox + 1 + Math.floor(hash(tx, ty, 1001) * 3), oy + 2 + Math.floor(hash(tx, ty, 1002) * 2));
  p.blit(spr, ox + 7 + Math.floor(hash(tx, ty, 1003) * 2), oy + 9, true);
}

const BOULDER = (snow: boolean, tones: number[]) => {
  const p = new Pix(16, 16);
  shadowEllipse(p, 8, 13, 7, 2, H('#1a142244'));
  disc(p, 8, 9, 6.5, (d, x, y) => {
    if (d > 5.6) return OUTLINE;
    const l = -(x - 8) * 0.12 - (y - 9) * 0.16 + (hash(x, y, 1010) - 0.5) * 0.25;
    if (snow && y < 7 - Math.abs(x - 8) * 0.25) return SNOW[l > 0.3 ? 3 : 2];
    return tones[clamp(Math.floor(l * 2.2 + 2.2), 0, 4)];
  });
  p.set(10, 11, tones[0]); p.set(11, 10, tones[0]); p.set(5, 8, tones[4]);
  if (!snow) { p.set(6, 11, H('#9ab060')); p.set(7, 11, H('#b8c870')); p.set(11, 7, H('#c8c070')); }
  // flatten the bottom so it sits on the ground
  for (let x = 0; x < 16; x++) for (let y = 15; y < 16; y++) p.set(x, y, 0);
  return p;
};
const BOULDERS = { warm: BOULDER(false, FACE_WARM), cool: BOULDER(true, FACE_COOL), mine: BOULDER(false, FACE_MINE) };

/** Paths: packed gravel with pebbles, edges blending into the ground (or a dark rim against rock and water). */
function trail(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, st: Style) {
  const C = palette();
  const wx0 = tx * T, wy0 = ty * T;
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const n = vnoise(wx0 + x, wy0 + y, 5, 1020) * 0.6 + hash(wx0 + x, wy0 + y, 1021) * 0.4;
    p.set(ox + x, oy + y, n < 0.3 ? C.pathDark : n > 0.78 ? C.pathLight : C.path);
  }
  for (let k = 0; k < 4; k++) {
    const x = 1 + Math.floor(hash(tx, ty, 1030 + k) * 13), y = 1 + Math.floor(hash(tx, ty, 1040 + k) * 13);
    p.set(ox + x, oy + y, C.pathLight); p.set(ox + x + 1, oy + y + 1, C.pathEdge);
  }
  const P = (dx: number, dy: number) => at(tx + dx, ty + dy) === ':';
  const soft = (dx: number, dy: number) => { const o = at(tx + dx, ty + dy); return o !== ':' && o !== '#' && o !== '~' && o !== '|'; };
  const G = (x: number, y: number) => groundAt(st, wx0 + x, wy0 + y);
  for (let i = 0; i < T; i++) {
    const bump = (k: number) => (hash(tx * 31 + k, ty * 17 + i, 1050) < 0.35 ? 1 : 0);
    if (!P(0, -1)) { const d = soft(0, -1) ? 1 + bump(1) : 0; for (let j = 0; j < d; j++) p.set(ox + i, oy + j, G(i, j)); p.set(ox + i, oy + d, C.pathEdge); }
    if (!P(0, 1)) { const d = soft(0, 1) ? 1 + bump(2) : 0; for (let j = 0; j < d; j++) p.set(ox + i, oy + 15 - j, G(i, 15 - j)); p.set(ox + i, oy + 15 - d, C.pathEdge); }
    if (!P(-1, 0)) { const d = soft(-1, 0) ? 1 + bump(3) : 0; for (let j = 0; j < d; j++) p.set(ox + j, oy + i, G(j, i)); p.set(ox + d, oy + i, C.pathEdge); }
    if (!P(1, 0)) { const d = soft(1, 0) ? 1 + bump(4) : 0; for (let j = 0; j < d; j++) p.set(ox + 15 - j, oy + i, G(15 - j, i)); p.set(ox + 15 - d, oy + i, C.pathEdge); }
  }
  if (at(tx, ty - 1) === '#') for (let x = 0; x < T; x++) { p.set(ox + x, oy, H('#14101c55')); p.set(ox + x, oy + 1, H('#14101c2a')); }
}

/** Where a path crosses water or a gorge: a bridge, stone (Stonebridge) or wooden planks. */
function bridgeRole(tx: number, ty: number, at: At): 'top' | 'bottom' | null {
  const gap = (x: number, y: number) => at(x, y) === '~' || at(x, y) === '#';
  const nearWater = (y: number) => [-2, -1, 0, 1, 2].some((dx) => at(tx + dx, y) === '~');
  if (at(tx, ty + 1) === ':' && gap(tx, ty - 1) && (nearWater(ty - 1) || nearWater(ty - 2))) return 'top';
  if (at(tx, ty - 1) === ':' && gap(tx, ty + 1) && (nearWater(ty + 1) || nearWater(ty + 2))) return 'bottom';
  return null;
}

function bridgeTile(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, role: 'top' | 'bottom', st: Style) {
  const stone = st.bridge === 'stone';
  const end = (dx: number) => bridgeRole(tx + dx, ty, at) !== role;
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    let c: number;
    if (stone) {
      const row = Math.floor(wy / 5), off = (row % 2) * 4;
      c = mod(wy, 5) === 4 || mod(wx + off, 8) === 0 ? H('#7a7064') : hash(Math.floor((wx + off) / 8), row, 1060) < 0.4 ? H('#b8ad9c') : H('#c8bdab');
    } else {
      c = mod(wx, 5) === 4 ? H('#5a3a22') : mod(wx, 5) === 0 ? H('#c8945a') : H('#a87444');
      if (hash(Math.floor(wx / 5), 0, 1061) < 0.3 && y % 7 === 3) c = H('#6a4428');
    }
    p.set(ox + x, oy + y, c);
  }
  // parapet (stone) or rail (wood) along the outer side
  const py = role === 'top' ? 0 : 11;
  for (let x = 0; x < T; x++) {
    const wx = tx * T + x;
    if (stone) {
      for (let y = 0; y < 5; y++) {
        const yy = py + y;
        const cap = role === 'top' ? y < 2 : y < 2;
        p.set(ox + x, oy + yy, y === 4 && role === 'top' ? H('#5a5048') : y === 0 && role === 'bottom' ? H('#5a5048') : cap ? (y === 0 || role === 'bottom' && y === 1 ? H('#e4dac8') : H('#d0c4b0')) : mod(wx, 6) === 0 ? H('#7a7064') : H('#a89c8a'));
      }
    } else {
      p.set(ox + x, oy + py + 1, H('#3a2414')); p.set(ox + x, oy + py + 2, H('#d8a468')); p.set(ox + x, oy + py + 3, H('#3a2414'));
      if (mod(wx, 8) === 2) for (let y = 0; y < 5; y++) { p.set(ox + x, oy + py + y, H('#3a2414')); p.set(ox + x + 1, oy + py + y, H('#8a5a32')); }
    }
  }
  if (end(-1)) for (let y = 0; y < T; y++) p.set(ox, oy + y, H('#14101c40'));
  if (end(1)) for (let y = 0; y < T; y++) p.set(ox + 15, oy + y, H('#14101c40'));
}

/** Under a bridge, on the water: its front with an arch (stone) or its beams (wood) and the shadow it casts. */
function underBridge(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, st: Style) {
  const stone = st.bridge === 'stone';
  for (let y = 0; y < (stone ? 10 : 5); y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x;
    if (stone) {
      // the arch: open below a curve, centred on the water span
      const d = Math.hypot(x - 7.5, (y - 10.5) * 1.25);
      if (d < 7.5) { p.set(ox + x, oy + y, d > 6.5 ? H('#4a4038') : H('#1a2a3aaa')); continue; }
      const row = Math.floor(y / 4), off = (row % 2) * 4;
      p.set(ox + x, oy + y, y % 4 === 3 || mod(wx + off, 8) === 0 ? H('#6a6056') : y === 0 ? H('#d0c4b0') : H('#a89c8a'));
    } else {
      p.set(ox + x, oy + y, y < 2 ? H('#6a4428') : H('#1a2a3a66'));
    }
  }
  if (!stone) for (const x of [3, 12]) for (let y = 2; y < 13; y++) { p.set(ox + x, oy + y, H('#3a2414')); p.set(ox + x + 1, oy + y, H('#7a4a2a')); }
}

function waterTile(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number, st: Style) {
  const same = (dx: number, dy: number) => at(tx + dx, ty + dy) === '~';
  water(p, ox, oy, tx, ty, same, st.ice ? 0 : frame);
  const C = palette();
  if (st.ice) {
    for (let k = 0; k < 2; k++) {
      let x = 2 + Math.floor(hash(tx, ty, 1070 + k) * 11), y = 2 + Math.floor(hash(tx, ty, 1080 + k) * 11);
      for (let i = 0; i < 6; i++) { p.set(ox + x, oy + y, C.foam); x += hash(tx + i, ty, 1090 + k) < 0.5 ? 1 : 0; y += hash(tx, ty + i, 1095 + k) < 0.5 ? 1 : -1; if (x < 2 || x > 13 || y < 2 || y > 13) break; }
    }
  }
  if (st.rapids) {
    for (let k = 0; k < 5; k++) {
      const x = 2 + Math.floor(hash(tx, ty, 1100 + k) * 12), y = mod(Math.floor(hash(tx, ty, 1110 + k) * 16) + frame * 3, 16);
      p.set(ox + x, oy + y, C.foam); p.set(ox + x, oy + mod(y + 1, 16), C.waterLight);
    }
  }
  // the pool at the foot of a waterfall: churning white
  if (at(tx, ty - 1) === '#' && at(tx, ty - 2) === '#') {
    for (let y = 0; y < 10; y++) for (let x = 0; x < T; x++) {
      const h = hash(tx * T + x, y + frame * 7, 1120);
      if (h < 0.85 - y * 0.09) p.set(ox + x, oy + y, h < 0.45 - y * 0.04 ? C.foam : C.waterLight);
    }
    // rings spreading from the splash
    for (let x = 1; x < 15; x++) { const y = 11 + frame + Math.round(Math.sin(x / 2.5) * 0.6); p.set(ox + x, oy + y, C.waterLight); }
  }
  if (at(tx, ty - 1) === ':' && bridgeRole(tx, ty - 1, at) === 'bottom') underBridge(p, ox, oy, tx, ty, at, st);
}

/** Rock tiles that don't move are drawn once and copied into the second frame. */
const STILL = new WeakMap<At, Map<number, Pix>>();
function hookFor(st: Style): TerrainHook {
  return (p, ox, oy, tx, ty, at, frame) => {
    const c = at(tx, ty);
    if (c === '#') {
      let m = STILL.get(at);
      if (!m) STILL.set(at, (m = new Map()));
      const key = tx * 100003 + ty;
      const done = m.get(key);
      if (done) { p.blit(done, ox, oy); return true; }
      const tile = new Pix(T, T);
      cliff(tile, 0, 0, tx, ty, at, frame, st);
      p.blit(tile, ox, oy);
      // anything with water in or near the column moves: draw it again next frame
      let wet = false;
      for (let k = -1; k <= 5 && !wet; k++) for (let dx = -1; dx <= 1; dx++) if (at(tx + dx, ty + k) === '~') wet = true;
      if (!wet) m.set(key, tile);
      return true;
    }
    if (c === '~') { waterTile(p, ox, oy, tx, ty, at, frame, st); return true; }
    if (c === ':') {
      const role = bridgeRole(tx, ty, at);
      if (role) bridgeTile(p, ox, oy, tx, ty, at, role, st); else trail(p, ox, oy, tx, ty, at, st);
      return true;
    }
    if (c === '|' || c === '=') return false;
    if (c === '"' && st.ground === 'meadow') { grass(p, ox, oy, tx, ty); tallGrass(p, ox, oy, tx, ty, (dx, dy) => at(tx + dx, ty + dy) === '"'); return true; }
    groundTile(p, ox, oy, tx, ty, at, st);
    if (c === 'r' || c === 'y' || c === 'w') flowerTile(p, ox, oy, tx, ty, c, st);
    if (c === 'o') p.blit(st.ground === 'snow' || (st.ground === 'mixed' && snowy(st, tx * T + 8, ty * T + 8)) ? BOULDERS.cool : st.ground === 'gravel' ? BOULDERS.mine : BOULDERS.warm, ox, oy);
    return true;
  };
}

// ---------------------------------------------------------------- the themes

const THEMES: Record<string, { st: Style; pal: Parameters<typeof registerTheme>[1]; things: (c: string) => string | undefined }> = {
  // Rock Village and the border valley: meadow, gravel paths, a clear stream
  alpine: {
    st: { face: FACE_WARM, ground: 'meadow', cap: 'grass', bridge: 'wood' },
    pal: {
      ground: ['#86c058', '#8ec760', '#96cd66', '#a0d470'], grassDark: '#64a046', grassLight: '#bce28a',
      path: '#d6c8a4', pathDark: '#bcac86', pathLight: '#ebe0c2', pathEdge: '#968462',
      water: '#56bde0', waterDeep: '#3a9ccc', waterLight: '#c6f0ff', waterEdge: '#26648e', foam: '#ffffff', shadow: '#24341c55',
    },
    things: (c) => (c === '#' ? 'cliff' : c === '.' ? 'meadow' : c === '~' ? 'stream' : undefined),
  },
  // Stonebridge: flagstones, the gorge
  rocktown: {
    st: { face: FACE_WARM, ground: 'flag', cap: 'grass', bridge: 'stone', rapids: true },
    pal: {
      ground: ['#aaa196', '#b4aba0', '#beb5aa', '#c8bfb4'], grassDark: '#7e766c', grassLight: '#d8d0c4',
      path: '#c8b898', pathDark: '#ac9c7c', pathLight: '#ddd0b4', pathEdge: '#8a7a5c',
      water: '#3a90b8', waterDeep: '#2a74a0', waterLight: '#9ad8f0', waterEdge: '#1a4a6a', foam: '#e8f8ff', shadow: '#2a242055',
    },
    things: (c) => (c === '#' ? 'cliff' : c === '.' ? 'cobbles' : c === '~' ? 'river' : undefined),
  },
  // Miners' Town: brown rock and gravel
  mine: {
    st: { face: FACE_MINE, ground: 'gravel', cap: 'rock', bridge: 'wood' },
    pal: {
      ground: ['#a68c6a', '#ae9472', '#b69c7a', '#bea482'], grassDark: '#86704e', grassLight: '#d2bc96',
      path: '#8e7658', pathDark: '#7a6448', pathLight: '#a68c6c', pathEdge: '#5e4a34',
      water: '#4a9ab8', waterDeep: '#3a7ea0', waterLight: '#a8d8ec', waterEdge: '#2a4a5a', foam: '#e0f4ff', shadow: '#2a1a1055',
    },
    things: (c) => (c === '#' ? 'cliff' : c === '.' ? 'gravel' : undefined),
  },
  // the High Pass: meadow below, snow above the snow line
  pass: {
    st: { face: FACE_COOL, ground: 'mixed', cap: 'mixed', bridge: 'wood', snowline: 15 },
    pal: {
      ground: ['#7eb456', '#86bb5c', '#8ec262', '#98c96c'], grassDark: '#5e9644', grassLight: '#b4da86',
      path: '#c8c0ac', pathDark: '#aca490', pathLight: '#e0d8c6', pathEdge: '#8a826e',
      water: '#56b4dc', waterDeep: '#3a96c4', waterLight: '#c6ecfc', waterEdge: '#26608a', foam: '#ffffff', shadow: '#24304455',
    },
    things: (c) => (c === '#' ? 'cliff' : c === '.' ? 'meadow' : undefined),
  },
  // the Pass Hut: snow, an icy lake
  alpsnow: {
    st: { face: FACE_COOL, ground: 'snow', cap: 'snow', bridge: 'wood', ice: true },
    pal: {
      ground: ['#dbe4ef', '#e3eaf4', '#ebf0f7', '#f6f9fd'], grassDark: '#bccadc', grassLight: '#ffffff',
      path: '#c6cad2', pathDark: '#aab0bc', pathLight: '#dde1e8', pathEdge: '#8c94a4',
      water: '#a8d6ee', waterDeep: '#8cc2e2', waterLight: '#e6f6ff', waterEdge: '#4a7aa4', foam: '#ffffff', shadow: '#3a4a6a40',
    },
    things: (c) => (c === '#' ? 'cliff' : c === '.' ? 'snow' : c === '~' ? 'ice' : c === 'w' ? 'ice' : undefined),
  },
};
for (const [name, t] of Object.entries(THEMES)) registerTheme(name, t.pal, { terrain: hookFor(t.st), things: t.things });

// ART
// ---------------------------------------------------------------- drawing helpers for buildings and props

/** A packed colour at 80 %. */
const darker = (c: number) => ((Math.round(((c >>> 24) & 255) * 0.8) << 24) | (Math.round(((c >>> 16) & 255) * 0.8) << 16) | (Math.round(((c >>> 8) & 255) * 0.8) << 8) | 255) >>> 0;
const rect = (p: Pix, x: number, y: number, w: number, h: number, c: number) => p.fill(x, y, w, h, c);
/** A colour made lighter (k > 1) or darker (k < 1). */
const tint = (c: string, k: number) => {
  const v = H(c);
  const ch = (s: number) => clamp(Math.round(((v >>> s) & 255) * k), 0, 255);
  return ((ch(24) << 24) | (ch(16) << 16) | (ch(8) << 8) | 255) >>> 0;
};

/** Horizontal wooden planks (larch, darkened by the sun): seams, knots, a lighter top edge per plank. */
function planks(p: Pix, x0: number, y0: number, w: number, h: number, base: string, seed: number) {
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const row = Math.floor(y / 4), yIn = y % 4;
    const k = 0.92 + hash(row, 0, seed) * 0.16 + (hash(x >> 2, row, seed + 1) - 0.5) * 0.06;
    let c = tint(base, yIn === 3 ? 0.62 : yIn === 0 ? k * 1.12 : k);
    if (mod(x + row * 11, 23) === 0 && yIn < 3) c = tint(base, 0.62);
    if (hash(x, row, seed + 2) < 0.012 && yIn === 1) c = tint(base, 0.55);
    p.set(x0 + x, y0 + y, c);
  }
}

/** Rubble stone masonry: rounded stones of several greys, dark mortar, lit tops. */
function masonry(p: Pix, x0: number, y0: number, w: number, h: number, tones: string[], seed: number, mortar = '#5a5048') {
  for (let y = 0; y < h; y++) {
    const row = Math.floor(y / 5), yIn = y % 5, off = Math.floor(hash(row, 1, seed) * 7);
    for (let x = 0; x < w; x++) {
      const bw = 6 + Math.floor(hash(Math.floor((x + off) / 7), row, seed + 1) * 3);
      const xIn = mod(x + off, 7), id = Math.floor((x + off) / 7);
      void bw;
      let c: number;
      if (yIn === 4 || xIn === 0) c = H(mortar);
      else {
        const t = tones[Math.floor(hash(id, row, seed + 2) * tones.length)];
        c = yIn === 0 || xIn === 1 ? tint(t, 1.15) : yIn === 3 || xIn === 6 ? tint(t, 0.85) : H(t);
      }
      p.set(x0 + x, y0 + y, c);
    }
  }
}

/** A window with shutters (open, either side), a white frame, sky reflected in the panes, a flower box below. */
function window2(p: Pix, x: number, y: number, w: number, h: number, shutter: string | null, flowers: boolean) {
  const out = OUTLINE;
  for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
    const edge = yy === 0 || yy === h - 1 || xx === 0 || xx === w - 1;
    const frame = yy === 1 || yy === h - 2 || xx === 1 || xx === w - 2 || xx === Math.floor(w / 2) || yy === Math.floor(h / 2);
    p.set(x + xx, y + yy, edge ? out : frame ? H('#f4efe4') : yy < h / 2 && xx < w / 2 ? H('#a8d4f0') : H('#4a7ea8'));
  }
  if (shutter) for (const sx of [x - 5, x + w]) {
    for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < 5; xx++) {
      const edge = yy === 0 || yy === h - 1 || xx === 0 || xx === 4;
      p.set(sx + xx, y + yy, edge ? out : yy % 3 === 0 ? tint(shutter, 0.75) : xx === 1 ? tint(shutter, 1.2) : H(shutter));
    }
  }
  if (flowers) {
    rect(p, x - 1, y + h, w + 2, 3, H('#6a3e20')); rect(p, x - 1, y + h, w + 2, 1, H('#9a6234'));
    for (let xx = -1; xx < w + 1; xx++) {
      const r = hash(xx, y, 1300);
      p.set(x + xx, y + h - 1, r < 0.5 ? H('#e03a4a') : r < 0.75 ? H('#ff7a8a') : H('#3e8a3a'));
      if (r < 0.4) p.set(x + xx, y + h - 2, H('#e03a4a'));
      if (r > 0.8) p.set(x + xx, y + h + 3, H('#3e8a3a'));
    }
  }
}

/** A wooden door (planks, frame, handle), optionally arched. */
function door(p: Pix, x: number, y: number, w: number, h: number, wood: string, arch = false) {
  for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
    if (arch && yy < 4) { const d = Math.hypot(xx + 0.5 - w / 2, 4 - yy); if (d > w / 2) continue; if (d > w / 2 - 1) { p.set(x + xx, y + yy, OUTLINE); continue; } }
    const edge = xx === 0 || xx === w - 1 || yy === 0;
    p.set(x + xx, y + yy, edge ? OUTLINE : xx === 1 ? tint(wood, 0.7) : (xx - 1) % 4 === 0 ? tint(wood, 0.78) : yy === 1 ? tint(wood, 1.2) : H(wood));
  }
  p.set(x + w - 4, y + Math.floor(h / 2) + 1, H('#f4d060')); p.set(x + w - 4, y + Math.floor(h / 2) + 2, H('#a07a30'));
  rect(p, x - 1, y + h - 1, w + 2, 1, OUTLINE);
}

/**
 * A gable roof seen from the front and above (its ridge runs away from the viewer): two shingled planes, the lit
 * left one and the shaded right one, ending in barge boards; the gable wall below is drawn by the caller.
 * Returns the y where the eaves end (the bottom of the side planes).
 */
function gableRoof(p: Pix, cx: number, top: number, half: number, drop: number, depth: number, tones: string[], snow: boolean) {
  // planes: each pixel between the back and front barge lines
  for (let x = cx - half; x < cx + half; x++) {
    const dx = Math.abs(x + 0.5 - cx) / half;
    const back = top + dx * drop, front = back + depth;
    for (let y = Math.floor(back); y <= Math.ceil(front); y++) {
      if (y < back || y > front) continue;
      const left = x < cx;
      const course = Math.floor(Math.abs(x + 0.5 - cx) / 4);
      const seam = mod(Math.floor(Math.abs(x + 0.5 - cx)), 4) === 3 || mod(y + course * 3, 7) === 0;
      let t = left ? 2 : 1;
      if (dx < 0.08) t += 1; // the ridge catches the light
      if (seam) t -= 1;
      if (hash(course, Math.floor((y + course * 3) / 7), 1310) < 0.15) t -= 1;
      let c = H(tones[clamp(t, 0, 3)]);
      if (snow && (y - back) < depth * (left ? 0.85 : 0.7) - hash(x, 0, 1311) * 4) c = left ? (seam ? SNOW[2] : SNOW[3]) : seam ? SNOW[0] : SNOW[1];
      if (y <= back + 0.5 || x === cx - half || x === cx + half - 1) c = OUTLINE;
      p.set(x, y, c);
    }
  }
  // barge boards along the front edge, and the ridge line
  for (let x = cx - half; x < cx + half; x++) {
    const dx = Math.abs(x + 0.5 - cx) / half;
    const fy = Math.round(top + dx * drop + depth);
    p.set(x, fy, OUTLINE); p.set(x, fy + 1, H('#6a3e22')); p.set(x, fy + 2, H('#9a6234')); p.set(x, fy + 3, OUTLINE);
  }
  for (let y = top; y < top + depth; y++) p.set(cx, y, snow ? SNOW[3] : H(tones[3]));
}

/** The triangle of the gable wall under a gable roof (planked), with a small window. */
function gableWall(p: Pix, cx: number, top: number, half: number, drop: number, base: string) {
  for (let y = top; y < top + drop; y++) {
    const hw = ((y - top) / drop) * half;
    for (let x = Math.floor(cx - hw); x < Math.ceil(cx + hw); x++) {
      const row = Math.floor((y - top) / 4);
      p.set(x, y, mod(x, 4) === 0 ? tint(base, 0.66) : (y - top) % 4 === 0 && row > 0 ? tint(base, 0.85) : H(base));
    }
  }
}

function shadowBand(p: Pix, x: number, y: number, w: number, h: number) {
  for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) if (p.get(x + xx, y + yy) & 255) p.set(x + xx, y + yy, H(`#1a1008${yy === 0 ? '66' : '33'}`));
}

/** A balcony across the front: a beam, carved balusters, a rail, and red geraniums along it. */
function balcony(p: Pix, x0: number, x1: number, y: number) {
  rect(p, x0, y + 9, x1 - x0, 2, H('#5a3218'));
  rect(p, x0, y + 11, x1 - x0, 1, OUTLINE);
  for (let x = x0; x < x1; x++) {
    p.set(x, y, OUTLINE); p.set(x, y + 1, H('#c88a52')); p.set(x, y + 2, H('#8a5430'));
    const k = mod(x - x0, 4);
    for (let yy = 3; yy < 9; yy++) {
      const cut = k === 2 && (yy === 5 || yy === 6);
      p.set(x, y + yy, cut ? H('#2a1a10') : k === 0 ? H('#7a4a28') : k === 1 ? H('#c88a52') : H('#a86c3c'));
    }
    // geraniums hanging over the rail
    const r = hash(x, y, 1320);
    if (r < 0.55) p.set(x, y - 1, r < 0.35 ? H('#e8304a') : H('#ff8094'));
    if (r < 0.25) p.set(x, y - 2, H('#e8304a'));
    if (r > 0.6) p.set(x, y - 1, H('#3e8a3a'));
    if (r > 0.85) p.set(x, y + 3, H('#3e8a3a'));
  }
  p.set(x0, y + 1, OUTLINE); p.set(x1 - 1, y + 1, OUTLINE);
}

// ---------------------------------------------------------------- buildings (5×3 tiles unless said)

const ROOF_WOOD = ['#3e2c22', '#5c4234', '#7a5a46', '#9c7a60'];
const ROOF_SLATE = ['#34383e', '#4e545c', '#6a727c', '#8e96a0'];
const ROOF_RED = ['#5a2a22', '#8a3c30', '#ae5440', '#cc7458'];

/** Rock Village chalet: stone ground floor, larch upper floor with a balcony of geraniums, wide shingle roof. */
function chalet(roof: string[], snow: boolean, plaster: boolean): Pix {
  const W = 80, Hh = 90, p = new Pix(W, Hh);
  const base = Hh - 48; // footprint top
  shadowEllipse(p, 40, Hh - 2, 38, 3, H('#1a142240'));
  // ground floor (y 64..89) and upper floor (y 40..64)
  const g0 = 63;
  if (plaster) {
    for (let y = g0; y < Hh - 1; y++) for (let x = 6; x < 74; x++) p.set(x, y, y > Hh - 5 ? H('#c8c0b0') : hash(x, y, 1330) < 0.04 ? H('#d8d0c0') : H('#f2ece0'));
    // corner stones
    for (const cx of [6, 70]) for (let y = g0; y < Hh - 1; y += 4) rect(p, cx, y, 4, 3, (y / 4) % 2 ? H('#a8a094') : H('#8a8276'));
  } else masonry(p, 6, g0, 68, Hh - 1 - g0, ['#a8a090', '#bab2a2', '#968e80', '#c8c0b0'], 1331);
  planks(p, 6, 38, 68, g0 - 38, '#9a5c30', 1332);
  rect(p, 6, g0 - 1, 68, 1, H('#4a2a14'));
  for (let y = 38; y < Hh - 1; y++) { p.set(5, y, OUTLINE); p.set(74, y, OUTLINE); }
  rect(p, 5, Hh - 1, 70, 1, OUTLINE);
  // windows: upper behind the balcony, lower with shutters
  window2(p, 14, 42, 11, 10, null, false); window2(p, 55, 42, 11, 10, null, false);
  window2(p, 16, 68, 9, 11, plaster ? '#b8302a' : '#2e7a40', true); window2(p, 55, 68, 9, 11, plaster ? '#b8302a' : '#2e7a40', true);
  door(p, 32, 69, 16, 20, '#7a4422', true);
  rect(p, 30, 66, 20, 2, H('#5a3218'));
  // the gable and its roof
  gableWall(p, 40, 14, 36, 24, '#8a5028');
  window2(p, 35, 24, 10, 9, null, false);
  balcony(p, 4, 76, 50);
  gableRoof(p, 40, 0, 40, 22, 18, roof, snow);
  shadowBand(p, 6, 38, 68, 2);
  // a little heart cut in the gable board, a cowbell over the door
  p.set(39, 18, H('#e8304a')); p.set(40, 18, H('#e8304a')); p.set(39, 19, H('#e8304a')); p.set(40, 19, H('#e8304a'));
  // chimney
  if (!snow) for (let y = 2; y < 14; y++) for (let x = 58; x < 64; x++) p.set(x, y, x === 58 || x === 63 || y === 2 ? OUTLINE : x < 61 ? H('#c8beb0') : H('#9a9284'));
  void base;
  return p;
}

/** Stonebridge: a tall stone house with a hipped slate roof seen over its eaves, arched windows, a wooden door. */
function stonehouse(wall: string[], roof: string[], plaster: string | null): Pix {
  const W = 80, Hh = 84, p = new Pix(W, Hh);
  shadowEllipse(p, 40, Hh - 2, 38, 3, H('#1a142240'));
  const top = 30;
  if (plaster) {
    for (let y = top; y < Hh - 1; y++) for (let x = 5; x < 75; x++) p.set(x, y, hash(x >> 1, y >> 1, 1340) < 0.05 ? tint(plaster, 0.94) : H(plaster));
    // sgraffito corners and a band under the eaves
    for (const cx of [5, 69]) for (let y = top; y < Hh - 1; y++) for (let x = cx; x < cx + 6; x++) p.set(x, y, (Math.floor((y - top) / 5) + (x - cx < 3 ? 0 : 1)) % 2 ? H('#e8e2d6') : H('#9a948a'));
    for (let x = 5; x < 75; x++) for (let y = top + 1; y < top + 5; y++) p.set(x, y, (x + y) % 6 < 2 ? H('#8a8478') : H('#ece6da'));
  } else masonry(p, 5, top, 70, Hh - 1 - top, wall, 1341);
  for (let y = top; y < Hh - 1; y++) { p.set(4, y, OUTLINE); p.set(75, y, OUTLINE); }
  rect(p, 4, Hh - 1, 72, 1, OUTLINE);
  // windows: two floors, the lower ones barred, the upper with flower boxes
  for (const wx of [14, 56]) { archWindow(p, wx, top + 9, 10, 14); archWindow(p, wx, top + 32, 10, 13); }
  archWindow(p, 35, top + 9, 10, 14);
  for (const wx of [14, 56]) { rect(p, wx - 1, top + 23, 12, 3, H('#6a3e20')); for (let x = wx - 1; x < wx + 11; x++) { const r = hash(x, wx, 1342); p.set(x, top + 22, r < 0.5 ? H('#e8304a') : r < 0.7 ? H('#f4e04a') : H('#3e8a3a')); } }
  door(p, 32, Hh - 21, 16, 20, '#6a3a20', true);
  for (let x = 30; x < 50; x++) p.set(x, Hh - 24, H('#d8d0c0'));
  // hipped roof: front slope (rows of slates) with the side slopes as triangles
  for (let y = 0; y < top + 2; y++) {
    const inset = Math.max(0, 20 - y * 0.75);
    for (let x = Math.round(inset); x < W - Math.round(inset); x++) {
      const edge = x === Math.round(inset) || x === W - 1 - Math.round(inset) || y === 0;
      const row = Math.floor(y / 4), seam = y % 4 === 3 || mod(x + (row % 2) * 3, 6) === 0;
      const side = x < 20 + 0.0 && x < inset + 6 ? 0 : 0;
      const t = (y < 8 ? 3 : y < 20 ? 2 : 1) - (seam ? 1 : 0) - side;
      p.set(x, y, edge ? OUTLINE : H(roof[clamp(t, 0, 3)]));
    }
  }
  for (let x = 0; x < W; x++) { p.set(x, top + 1, OUTLINE); p.set(x, top, H(roof[0])); }
  shadowBand(p, 5, top + 2, 70, 3);
  // a chimney
  for (let y = 0; y < 12; y++) for (let x = 52; x < 59; x++) p.set(x, y, x === 52 || x === 58 || y === 0 ? OUTLINE : x < 55 ? H('#c8beb0') : H('#9a9284'));
  return p;
}

function archWindow(p: Pix, x: number, y: number, w: number, h: number) {
  for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
    const cx = xx + 0.5 - w / 2;
    if (yy < w / 2 && Math.hypot(cx, w / 2 - yy) > w / 2) continue;
    const edgeArch = yy < w / 2 && Math.hypot(cx, w / 2 - yy) > w / 2 - 1.2;
    const edge = edgeArch || xx === 0 || xx === w - 1 || yy === h - 1;
    const bar = xx === Math.floor(w / 2) || yy === Math.floor(h * 0.55);
    p.set(x + xx, y + yy, edge ? OUTLINE : bar ? H('#e8e2d6') : yy < h / 2 && xx < w / 2 ? H('#a8d4f0') : H('#3e6a94'));
  }
  rect(p, x - 1, y + h, w + 2, 1, H('#d8d0c0'));
}

const DECOR_ART: Record<string, [Pix, [number, number]]> = {};
const add = (name: string, pix: Pix, size: [number, number]) => { DECOR_ART[name] = [pix, size]; };

add('chalet', chalet(ROOF_WOOD, false, false), [5, 3]);
add('farmhouse', chalet(ROOF_SLATE, false, true), [5, 3]);
add('stonehouse', stonehouse(['#b0a690', '#c2b8a2', '#a09680', '#cec4ae'], ROOF_SLATE, null), [5, 3]);
add('townhouse', stonehouse([], ROOF_RED, '#e8c890'), [5, 3]);

/** Rock Village chapel (3×3): white walls, shingle roof, a slender bell tower with a pointed spire. */
add('chapel', (() => {
  const W = 48, Hh = 100, p = new Pix(W, Hh);
  shadowEllipse(p, 24, Hh - 2, 22, 3, H('#1a142240'));
  // nave
  for (let y = 58; y < Hh - 1; y++) for (let x = 6; x < 42; x++) p.set(x, y, x === 6 || x === 41 ? OUTLINE : y > Hh - 4 ? H('#c8c2b6') : x < 10 ? H('#fbf8f0') : H('#efeae0'));
  rect(p, 6, Hh - 1, 36, 1, OUTLINE);
  door(p, 18, Hh - 19, 12, 18, '#7a4422', true);
  archWindow(p, 9, 66, 6, 11); archWindow(p, 33, 66, 6, 11);
  gableWall(p, 24, 40, 20, 18, '#efeae0');
  // round window in the gable
  disc(p, 24, 50, 3.5, (d) => (d > 2.6 ? OUTLINE : H('#e8c050')));
  gableRoof(p, 24, 22, 24, 18, 14, ROOF_WOOD, false);
  shadowBand(p, 7, 58, 34, 2);
  // the tower behind the ridge
  for (let y = 18; y < 40; y++) for (let x = 19; x < 30; x++) p.set(x, y, x === 19 || x === 29 ? OUTLINE : x < 22 ? H('#fbf8f0') : H('#e4dfd4'));
  rect(p, 22, 22, 5, 7, OUTLINE); rect(p, 23, 23, 3, 5, H('#3a2a20')); p.set(24, 27, H('#e8c050')); p.set(24, 26, H('#c8a030'));
  // clock face
  disc(p, 24.5, 34, 3, (d) => (d > 2.2 ? OUTLINE : H('#fffaf0'))); p.set(24, 33, OUTLINE); p.set(24, 34, OUTLINE); p.set(25, 34, OUTLINE);
  // spire
  for (let y = 0; y < 19; y++) {
    const hw = (y / 19) * 7;
    for (let x = Math.floor(24.5 - hw); x <= Math.ceil(24.5 + hw); x++) {
      const edge = x === Math.floor(24.5 - hw) || x === Math.ceil(24.5 + hw);
      p.set(x, y, edge ? OUTLINE : x < 24 ? H(ROOF_RED[3]) : x === 24 ? H(ROOF_RED[2]) : H(ROOF_RED[1]));
    }
  }
  rect(p, 17, 18, 15, 2, OUTLINE);
  p.set(24, 0, H('#f4d060')); p.set(24, 1, H('#f4d060'));
  return p;
})(), [3, 3]);

/** Stonebridge's clock tower (3×3): a square stone tower with a clock and a pyramid roof. */
add('tower', (() => {
  const W = 48, Hh = 120, p = new Pix(W, Hh);
  shadowEllipse(p, 24, Hh - 2, 22, 3, H('#1a142240'));
  masonry(p, 6, 30, 36, Hh - 31, ['#b8ae98', '#c8bea8', '#a89e88', '#d2c8b2'], 1350);
  for (let y = 30; y < Hh - 1; y++) { p.set(5, y, OUTLINE); p.set(42, y, OUTLINE); for (const x of [6, 7]) p.set(x, y, tint('#e0d8c4', 1)); }
  rect(p, 5, Hh - 1, 38, 1, OUTLINE);
  door(p, 17, Hh - 22, 14, 21, '#6a3a20', true);
  archWindow(p, 20, 66, 8, 14);
  // the clock
  disc(p, 24, 46, 9, (d) => (d > 8 ? OUTLINE : d > 6.8 ? H('#c8a040') : H('#fbf6e8')));
  for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; p.set(Math.round(24 + Math.sin(a) * 5.6), Math.round(46 - Math.cos(a) * 5.6), H('#3a2a20')); }
  line(p, 24, 46, 24, 41, OUTLINE); line(p, 24, 46, 27, 47, OUTLINE);
  // belfry with arches
  rect(p, 5, 26, 38, 4, H('#8a8070')); rect(p, 5, 26, 38, 1, OUTLINE);
  for (let y = 0; y < 27; y++) {
    const hw = 4 + (y / 27) * 18;
    for (let x = Math.floor(24 - hw); x < Math.ceil(24 + hw); x++) {
      const edge = x === Math.floor(24 - hw) || x === Math.ceil(24 + hw) - 1;
      const seam = y % 4 === 3;
      p.set(x, y, edge ? OUTLINE : x < 24 ? H(seam ? ROOF_SLATE[2] : ROOF_SLATE[3]) : H(seam ? ROOF_SLATE[0] : ROOF_SLATE[1]));
    }
  }
  rect(p, 22, 0, 4, 2, OUTLINE); p.set(23, 0, H('#f4d060'));
  return p;
})(), [3, 3]);

/** The Pass Hut (6×3): stone below, larch above, red-and-white shutters, snow on the roof, a flag on a pole. */
add('hut', (() => {
  const W = 96, Hh = 100, p = new Pix(W, Hh);
  shadowEllipse(p, 48, Hh - 2, 46, 3, H('#3a4a6a40'));
  masonry(p, 6, 66, 84, Hh - 67, ['#9a9a9e', '#aeaeb2', '#8a8a90', '#bcbcc2'], 1360);
  planks(p, 6, 40, 84, 26, '#8a5028', 1361);
  rect(p, 6, 65, 84, 1, H('#4a2a14'));
  for (let y = 40; y < Hh - 1; y++) { p.set(5, y, OUTLINE); p.set(90, y, OUTLINE); }
  rect(p, 5, Hh - 1, 86, 1, OUTLINE);
  for (const wx of [14, 30, 62, 76]) window2(p, wx, 44, 9, 10, '#c8302a', true);
  window2(p, 16, 72, 9, 10, '#c8302a', false); window2(p, 72, 72, 9, 10, '#c8302a', false);
  door(p, 40, Hh - 22, 16, 21, '#6a3a20', false);
  // the sign board over the door
  rect(p, 34, 68, 28, 7, OUTLINE); rect(p, 35, 69, 26, 5, H('#e8d8b0'));
  for (let x = 37; x < 59; x += 3) { p.set(x, 71, H('#5a3218')); p.set(x + 1, 71, H('#5a3218')); }
  gableWall(p, 48, 14, 44, 26, '#7a4824');
  window2(p, 43, 26, 10, 9, '#c8302a', false);
  gableRoof(p, 48, 0, 48, 26, 18, ROOF_SLATE, true);
  shadowBand(p, 6, 40, 84, 2);
  // benches by the door
  for (const bx of [20, 62]) { rect(p, bx, Hh - 8, 14, 2, H('#c88a52')); rect(p, bx, Hh - 6, 14, 1, H('#6a3e20')); p.set(bx + 1, Hh - 5, OUTLINE); p.set(bx + 12, Hh - 5, OUTLINE); p.set(bx + 1, Hh - 4, OUTLINE); p.set(bx + 12, Hh - 4, OUTLINE); }
  // icicles along the barge boards
  for (let x = 2; x < 94; x += 3) { const fy = Math.round(26 * Math.abs(x + 0.5 - 48) / 48 + 18 + 4); if (hash(x, 0, 1362) < 0.6) { p.set(x, fy, H('#e0f0ff')); if (hash(x, 1, 1362) < 0.5) p.set(x, fy + 1, H('#b8d8f0')); } }
  return p;
})(), [6, 3]);

/** Where the top station's cable meets the pylon at the map edge, in the station sprite's pixels. */
const PYLON_X = 136, PYLON_Y = 68;

/** The cable car top station (4×3): an open hall with the big wheel, the cable running out east with a cabin. */
function station(valley: boolean): Pix {
  const W = valley ? 112 : 200, Hh = valley ? 140 : 96, p = new Pix(W, Hh);
  const ox = 0, gy = Hh - 48; // footprint top
  shadowEllipse(p, 32, Hh - 2, 30, 3, H('#1a142240'));
  // concrete back wall and pillars
  for (let y = gy - 14; y < Hh - 1; y++) for (let x = ox + 4; x < ox + 60; x++) p.set(x, y, x === ox + 4 || x === ox + 59 ? OUTLINE : y < gy + 4 ? H('#b8b4ac') : H('#8a8680'));
  rect(p, ox + 10, gy + 8, 44, Hh - gy - 9, H('#3a3a40'));
  rect(p, ox + 10, gy + 8, 44, 1, OUTLINE);
  for (const x of [ox + 8, ox + 54]) for (let y = gy - 10; y < Hh - 1; y++) { p.set(x, y, OUTLINE); p.set(x + 1, y, H('#d0ccc4')); p.set(x + 2, y, H('#a8a49c')); p.set(x + 3, y, OUTLINE); }
  rect(p, ox + 4, Hh - 1, 56, 1, OUTLINE);
  // the bull wheel inside
  disc(p, ox + 32, gy + 18, 10, (d) => (d > 9 ? OUTLINE : d > 7.5 ? H('#c8302a') : d < 2 ? H('#2a2a30') : d < 3 ? H('#6a6a72') : 0));
  for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; line(p, ox + 32, gy + 18, Math.round(ox + 32 + Math.cos(a) * 8), Math.round(gy + 18 + Math.sin(a) * 8), H('#8a8a92')); }
  // the flat roof with a sign
  for (let y = gy - 20; y < gy - 12; y++) for (let x = ox + 1; x < ox + 63; x++) p.set(x, y, y === gy - 20 || y === gy - 13 || x === ox + 1 || x === ox + 62 ? OUTLINE : y < gy - 17 ? H('#5a6068') : H('#464c54'));
  if (!valley) for (let x = ox + 2; x < ox + 62; x++) if (hash(x, 0, 1370) < 0.8) { p.set(x, gy - 20, SNOW[3]); p.set(x, gy - 19, SNOW[2]); if (hash(x, 1, 1370) < 0.5) p.set(x, gy - 18, SNOW[1]); }
  rect(p, ox + 20, gy - 12, 24, 7, OUTLINE); rect(p, ox + 21, gy - 11, 22, 5, H('#c8302a'));
  // a cabin icon on the sign
  rect(p, ox + 29, gy - 10, 6, 3, H('#ffffff')); p.set(ox + 31, gy - 11, H('#ffffff')); p.set(ox + 32, gy - 11, H('#ffffff'));
  // the cables: the top station's leave from under its roof and run east, sagging down towards the valley off the
  // map (a pylon carries them on the snowfield); the valley station's rise to the north-east
  const sx = valley ? ox + 42 : ox + 60, sy = valley ? gy + 12 : gy - 10;
  // top station: to the pylon at the map's east edge (sprite x 136), then steeply down over the edge to the valley
  const ex = valley ? W - 1 : PYLON_X, ey = valley ? 0 : PYLON_Y, sag = valley ? 6 : 4;
  const cableY = (t: number) => sy + (ey - sy) * t + Math.sin(t * Math.PI) * sag;
  if (!valley) for (const dy of [0, 3]) { line(p, ox + 42, gy + 10 + dy, sx, sy + dy, H('#2a2a30')); line(p, PYLON_X, PYLON_Y + dy, W - 1, Hh - 4 + dy, H('#2a2a30')); }
  for (const dy of [0, 3]) {
    const n = Math.max(ex - sx, Math.abs(ey - sy));
    for (let i = 0; i <= n; i++) { const t = i / n; p.set(Math.round(sx + (ex - sx) * t), Math.round(cableY(t) + dy), H('#2a2a30')); }
  }
  // a cabin hanging on the cable, over open air
  const t = valley ? 0.55 : 0.42;
  const cx = Math.round(sx + (ex - sx) * t), cy = Math.round(cableY(t));
  line(p, cx, cy, cx, cy + 6, OUTLINE); rect(p, cx - 3, cy - 1, 7, 2, OUTLINE);
  for (let y = 0; y < 16; y++) for (let x = 0; x < 14; x++) {
    const edge = x === 0 || x === 13 || y === 0 || y === 15;
    const win = y > 2 && y < 8 && x > 1 && x < 12 && x % 4 !== 1;
    p.set(cx - 7 + x, cy + 6 + y, edge ? OUTLINE : win ? (x < 6 ? H('#bfe4f8') : H('#6a9ec0')) : y > 11 ? H('#a8241e') : x < 4 ? H('#ff5a48') : H('#e03a2e'));
  }
  if (valley) {
    // a pylon halfway up
    const px = Math.round(sx + (ex - sx) * 0.82), py = Math.round(sy + (ey - sy) * 0.82 + Math.sin(0.82 * Math.PI) * 6);
    for (let y = py; y < py + 40; y++) { const hw = 1 + (y - py) / 10; p.set(Math.round(px - hw), y, OUTLINE); p.set(Math.round(px + hw), y, OUTLINE); if ((y - py) % 6 === 0) line(p, Math.round(px - hw), y, Math.round(px + hw), y, H('#6a6a72')); }
    rect(p, px - 5, py - 1, 11, 2, OUTLINE);
  }
  return p;
}
add('cablestation', station(false), [4, 3]);

/**
 * The cable car pylon on the Pass Hut's snowfield (1×1, standing on map tile (35, 8)): a lattice mast whose saddle
 * carries the cable drawn by the top station at (27, 6), 40 px above its foot.
 */
add('pylon', (() => {
  // the station sprite (96 px high) stands on tile (27, 6); its cable reaches the pylon's saddle at PYLON_Y
  const cable = 9 * 16 - 96 + PYLON_Y;
  const Hh = Math.round(9 * 16 - cable) + 3, p = new Pix(16, Hh);
  shadowEllipse(p, 8, Hh - 2, 6, 1, H('#3a4a6a40'));
  for (let y = 4; y < Hh - 1; y++) {
    const hw = 1.5 + (y - 4) / 9;
    const l = Math.round(8 - hw), r = Math.round(8 + hw);
    p.set(l, y, OUTLINE); p.set(r, y, OUTLINE); p.set(l + 1, y, H('#c8ccd4')); p.set(r - 1, y, H('#7a7e88'));
    if ((y - 4) % 6 === 0) line(p, l, y, r, y, H('#5a5e66'));
    if ((y - 4) % 6 === 3) { p.set(Math.round((l + r) / 2), y, H('#5a5e66')); }
  }
  // the cross arm with two saddle wheels, and a red top light
  rect(p, 1, 3, 14, 2, OUTLINE); rect(p, 2, 3, 12, 1, H('#a8acb4'));
  for (const x of [3, 12]) disc(p, x, 2.5, 1.6, (d) => (d > 1 ? OUTLINE : H('#e0e4ea')));
  p.set(8, 0, H('#e03a2e')); p.set(8, 1, OUTLINE);
  rect(p, 4, Hh - 2, 9, 1, OUTLINE);
  return p;
})(), [1, 1]);
add('valleystation', station(true), [4, 3]);

/** Alpine spruces: slim, dark, tiered; one dusted with snow. */
function spruce(snow: boolean, seed: number): Pix {
  const W = 24, Hh = 46, p = new Pix(W, Hh), L = new Pix(W, Hh);
  shadowEllipse(p, 12, Hh - 3, 8, 2, H(snow ? '#3a4a6a40' : '#1c2a1455'));
  for (let y = Hh - 8; y < Hh - 1; y++) { L.set(11, y, H('#6a4428')); L.set(12, y, H('#4a2c18')); }
  const tones = ['#163a2a', '#1e4c34', '#2a6040', '#3e7a4e'].map(H);
  const tiers = 6;
  for (let k = tiers - 1; k >= 0; k--) {
    const top = 1 + k * 6, bottom = top + 10, half = 3 + k * 1.5;
    for (let y = top; y <= bottom && y < Hh - 7; y++) {
      const f = (y - top) / (bottom - top);
      const hw = Math.round(half * Math.pow(f, 0.8));
      for (let x = 12 - hw; x <= 11 + hw; x++) {
        if (y === bottom && (x + k) % 3 === 0) continue;
        const side = (x - 11.5) / (half + 1);
        let lv = -side * 0.6 - f * 0.25 + (hash(x, y, seed) - 0.5) * 0.2;
        if (y > bottom - 2) lv -= 0.35;
        let c = tones[lv < -0.35 ? 0 : lv < -0.05 ? 1 : lv < 0.25 ? 2 : 3];
        if (snow && y >= bottom - 3 && y <= bottom - 1 && side < 0.45 && hash(x, y, seed + 5) < 0.85) c = side < 0 ? SNOW[3] : SNOW[1];
        L.set(x, y, c);
      }
    }
  }
  outlined(p, L, 0, 0, H('#0c2016'));
  return p;
}
add('pine', spruce(false, 1380), [1, 1]);
add('snowpine', spruce(true, 1381), [1, 1]);

/** A village water trough (2×1): a hollowed log, a spout post, water running. */
add('trough', (() => {
  const p = new Pix(32, 28);
  shadowEllipse(p, 16, 25, 15, 2, H('#1a142244'));
  // post with spout
  rect(p, 3, 4, 6, 20, OUTLINE); rect(p, 4, 5, 2, 18, H('#b07a48')); rect(p, 6, 5, 2, 18, H('#7a4a28'));
  rect(p, 8, 9, 6, 2, H('#5a5a62')); p.set(13, 11, H('#a8e0ff')); p.set(13, 12, H('#ffffff')); p.set(13, 14, H('#a8e0ff'));
  // trough
  for (let y = 13; y < 26; y++) for (let x = 6; x < 31; x++) {
    const edge = x === 6 || x === 30 || y === 13 || y === 25;
    p.set(x, y, edge ? OUTLINE : y < 18 ? (y === 14 ? H('#c8945a') : H('#5ab8e0')) : y < 20 ? H('#a86c3c') : H('#7a4a28'));
  }
  for (let x = 8; x < 29; x++) if (hash(x, 0, 1390) < 0.3) p.set(x, 15, H('#c6f0ff'));
  // a geranium pot on the end
  rect(p, 25, 9, 5, 4, H('#c86a3a')); p.set(26, 8, H('#e8304a')); p.set(28, 7, H('#e8304a')); p.set(27, 8, H('#3e8a3a'));
  return p;
})(), [2, 1]);

/** Firewood stacked under a little roof (2×1). */
add('woodpile', (() => {
  const p = new Pix(32, 30);
  shadowEllipse(p, 16, 27, 15, 2, H('#1a142244'));
  for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) {
    const cx = 5 + k * 4.4 + (r % 2) * 2, cy = 25 - r * 4;
    if (cx > 29) continue;
    disc(p, cx, cy, 2.6, (d, x, y) => (d > 2 ? OUTLINE : d < 0.9 ? H('#c8945a') : (x + y) % 3 ? H('#e8b878') : H('#d8a468')));
  }
  for (let y = 4; y < 10; y++) for (let x = 0; x < 32; x++) p.set(x, y, y === 4 || y === 9 ? OUTLINE : y < 6 ? H(ROOF_WOOD[3]) : H(ROOF_WOOD[2]));
  for (const x of [2, 29]) for (let y = 10; y < 27; y++) { p.set(x, y, OUTLINE); }
  return p;
})(), [2, 1]);

/** A haystack on a pole (2×1). */
add('haystack', (() => {
  const p = new Pix(32, 34);
  shadowEllipse(p, 16, 31, 13, 2, H('#1a142244'));
  for (let y = 0; y < 8; y++) { p.set(16, y, H('#6a4428')); p.set(15, y, OUTLINE); }
  disc(p, 16, 22, 12, (d, x, y) => {
    if (y > 31) return 0;
    if (d > 11) return OUTLINE;
    const l = -(x - 16) * 0.06 - (y - 22) * 0.05 + (hash(x, y, 1400) - 0.5) * 0.35;
    return (x + y * 2) % 5 === 0 ? H('#a8842a') : l > 0.25 ? H('#f8dc78') : l > -0.1 ? H('#e4c058') : H('#c49a3a');
  });
  for (let x = 4; x < 29; x++) p.set(x, 31, OUTLINE);
  disc(p, 16, 12, 4, (d) => (d > 3 ? OUTLINE : H('#f0d068')));
  return p;
})(), [2, 1]);

/** Bunting between two posts (4×1): little flags in five colours, sagging, a bell at each post. */
add('bunting', (() => {
  const p = new Pix(64, 40);
  for (const x of [2, 61]) { for (let y = 2; y < 38; y++) { p.set(x - 1, y, OUTLINE); p.set(x, y, H('#a87444')); p.set(x + 1, y, OUTLINE); } shadowEllipse(p, x, 38, 3, 1, H('#1a142244')); }
  const cols = ['#2a6ad8', '#f4f4f4', '#d8303a', '#2e9a4a', '#f4c82a'].map(H);
  let k = 0;
  for (let x = 3; x < 60; x++) {
    const t = (x - 3) / 57, y = Math.round(4 + Math.sin(t * Math.PI) * 9);
    p.set(x, y, H('#3a3a3a'));
    if ((x - 3) % 6 === 2 && x < 57) {
      const c = cols[k++ % 5];
      for (let yy = 1; yy < 8; yy++) for (let xx = 0; xx < 5; xx++) {
        const yb = y + yy + Math.round((xx - 2) * 0.3);
        if (Math.abs(xx - 2) > (8 - yy) * 0.35 + 0.3) continue;
        const edge = Math.abs(xx - 2) > (8 - yy) * 0.35 - 0.7;
        p.set(x - 1 + xx, yb, edge ? H('#2a2a3a') : xx < 2 ? c : darker(c));
      }
    }
  }
  for (const x of [2, 61]) { disc(p, x, 9, 2.5, (d) => (d > 1.8 ? OUTLINE : H('#e8c050'))); p.set(x, 12, OUTLINE); }
  return p;
})(), [4, 1]);

/** A hiking signpost: yellow arrow plates on a grey post. */
add('trailsign', (() => {
  const p = new Pix(16, 30);
  shadowEllipse(p, 8, 28, 4, 1, H('#1a142244'));
  for (let y = 4; y < 28; y++) { p.set(7, y, OUTLINE); p.set(8, y, H('#a8acb4')); p.set(9, y, OUTLINE); }
  const plate = (y: number, right: boolean) => {
    for (let yy = 0; yy < 5; yy++) for (let xx = 0; xx < 13; xx++) {
      const tip = right ? xx - 9 : 3 - xx;
      if (tip > 0 && Math.abs(yy - 2) > 2 - tip * 0.7) continue;
      const edge = yy === 0 || yy === 4 || (right ? xx === 0 : xx === 12) || (tip > 0 && Math.abs(yy - 2) > 1 - tip * 0.7);
      p.set((right ? 2 : 1) + xx, y + yy, edge ? OUTLINE : yy === 2 && xx > 2 && xx < 10 && xx % 2 ? H('#2a2a2a') : H('#f4c82a'));
    }
  };
  plate(4, true); plate(10, false); plate(16, true);
  return p;
})(), [1, 1]);

/** The weather report board (2×1): sun, fog and an avalanche warning in three rows. */
add('forecast', (() => {
  const p = new Pix(32, 38);
  shadowEllipse(p, 16, 36, 13, 2, H('#1a142244'));
  for (const x of [4, 27]) for (let y = 20; y < 36; y++) { p.set(x, y, OUTLINE); p.set(x + 1, y, H('#8a5a32')); p.set(x + 2, y, OUTLINE); }
  for (let y = 4; y < 30; y++) for (let x = 1; x < 31; x++) p.set(x, y, y === 4 || y === 29 || x === 1 || x === 30 ? OUTLINE : x === 2 || y === 5 ? H('#c8945a') : H('#f4ecd8'));
  for (let y = 0; y < 5; y++) for (let x = -y; x < 32 + y; x++) if (x >= 0 && x < 32) p.set(x, y + 1 - 0, y === 0 ? OUTLINE : y < 3 ? H(ROOF_WOOD[2]) : H(ROOF_WOOD[1]));
  // three rows: arrow + symbol
  const rows: [number, (x: number, y: number) => void][] = [
    [8, (x, y) => { rect(p, x + 3, y + 1, 9, 1, H('#b8bcc8')); rect(p, x + 1, y + 3, 11, 1, H('#d8dce4')); rect(p, x + 4, y + 5, 8, 1, H('#b8bcc8')); }],
    [15, (x, y) => { for (let k = 0; k < 6; k++) { p.set(x + 6 - k / 2, y + k, H('#d8303a')); p.set(x + 6 + k / 2, y + k, H('#d8303a')); } rect(p, x + 3, y + 5, 7, 1, H('#d8303a')); p.set(x + 6, y + 2, OUTLINE); p.set(x + 6, y + 4, OUTLINE); }],
    [22, (x, y) => disc(p, x + 6.5, y + 3, 3, (d) => (d > 2.3 ? H('#e89a20') : H('#f8d040')))],
  ];
  for (const [y, sym] of rows) { for (let x = 4; x < 14; x++) p.set(x, y + 3, H('#5a5a62')); sym(16, y); }
  p.set(5, 10, H('#5a5a62')); p.set(13, 10, H('#5a5a62'));
  return p;
})(), [2, 1]);

/** The mine entrance (3×2): a timber portal in the rock, darkness, a lamp, crossed hammers. */
add('mine', (() => {
  const W = 48, Hh = 40, p = new Pix(W, Hh);
  // tunnel darkness, getting darker inwards
  for (let y = 8; y < Hh; y++) for (let x = 8; x < 40; x++) {
    const d = Math.hypot((x - 23.5) / 16, (y - Hh) / 30);
    if (d > 1) continue;
    p.set(x, y, d > 0.85 ? H('#3a2a1e') : d > 0.6 ? H('#1e1610') : H('#0c0806'));
  }
  // rails going in
  for (let y = 26; y < Hh; y++) { const sp = (y - 22) * 0.35; p.set(Math.round(23.5 - sp), y, H('#a8acb4')); p.set(Math.round(24.5 + sp), y, H('#a8acb4')); if (y % 4 === 0) line(p, Math.round(23 - sp), y, Math.round(25 + sp), y, H('#5a3a22')); }
  // timber posts and lintel
  for (const x0 of [6, 37]) for (let y = 8; y < Hh; y++) for (let x = x0; x < x0 + 5; x++) p.set(x, y, x === x0 || x === x0 + 4 ? OUTLINE : x === x0 + 1 ? H('#c88a52') : (y % 9 === 0 ? H('#5a3218') : H('#9a6234')));
  for (let y = 3; y < 10; y++) for (let x = 3; x < 45; x++) p.set(x, y, y === 3 || y === 9 || x === 3 || x === 44 ? OUTLINE : y === 4 ? H('#c88a52') : mod(x, 11) === 0 ? H('#5a3218') : H('#9a6234'));
  // crossed hammers on the lintel
  line(p, 20, 4, 27, 8, H('#3a3a40')); line(p, 27, 4, 20, 8, H('#3a3a40'));
  rect(p, 19, 3, 3, 2, H('#8a8a92')); rect(p, 26, 3, 3, 2, H('#8a8a92'));
  // lamp
  rect(p, 40, 12, 5, 6, OUTLINE); rect(p, 41, 13, 3, 4, H('#ffd860')); p.set(42, 11, OUTLINE);
  return p;
})(), [3, 2]);

/** An ore cart on its rails. */
add('cart', (() => {
  const p = new Pix(16, 20);
  shadowEllipse(p, 8, 18, 7, 1, H('#1a142255'));
  for (let y = 6; y < 15; y++) for (let x = 1; x < 15; x++) {
    const inset = Math.max(0, y - 11);
    if (x < 1 + inset || x > 14 - inset) continue;
    const edge = y === 6 || y === 14 || x === 1 + inset || x === 14 - inset;
    p.set(x, y, edge ? OUTLINE : y === 7 ? H('#a8acb4') : y === 10 ? H('#5a5e66') : x < 5 ? H('#8a8e96') : H('#6a6e76'));
  }
  // ore and a crystal on top
  for (const [x, y, c] of [[3, 5, '#7a6a5a'], [5, 4, '#9a8a7a'], [7, 5, '#6a5a4a'], [9, 4, '#8a7a6a'], [11, 5, '#7a6a5a'], [6, 3, '#b8a898']] as const) { rect(p, x, y, 3, 2, H(c)); p.set(x, y, tint(c, 1.3)); }
  p.set(10, 2, H('#e8f8ff')); p.set(10, 3, H('#8ad8f0')); p.set(11, 3, H('#4aa0d0')); p.set(9, 3, H('#c8f0ff'));
  for (const x of [4, 11]) disc(p, x, 15.5, 2, (d) => (d > 1.3 ? OUTLINE : H('#4a4e56')));
  return p;
})(), [1, 1]);

// ---------------------------------------------------------------- roadblocks

/** Fallen rocks across the road (2×2). */
add('rockfall', (() => {
  const W = 32, Hh = 40, p = new Pix(W, Hh);
  shadowEllipse(p, 16, 37, 16, 3, H('#1a142255'));
  const rocks: [number, number, number][] = [[8, 28, 7.5], [23, 29, 7], [15, 21, 8], [6, 17, 5], [26, 18, 5.5], [16, 33, 4.5], [14, 11, 5], [29, 33, 3], [2, 33, 3]];
  for (const [cx, cy, r] of rocks) disc(p, cx, cy, r, (d, x, y) => {
    if (d > r - 1) return OUTLINE;
    const l = -(x - cx) / r * 0.5 - (y - cy) / r * 0.6 + (hash(x, y, 1410) - 0.5) * 0.3;
    return FACE_WARM[clamp(Math.floor(l * 2.2 + 2.4), 1, 4)];
  });
  for (let k = 0; k < 14; k++) { const x = Math.floor(hash(k, 0, 1411) * 30) + 1, y = 30 + Math.floor(hash(k, 1, 1411) * 8); p.set(x, y, FACE_WARM[3]); p.set(x + 1, y + 1, FACE_WARM[0]); }
  // cracks on the big ones, a tuft of grass caught in the fall
  line(p, 13, 19, 17, 24, FACE_WARM[0]); line(p, 21, 27, 24, 31, FACE_WARM[0]);
  p.set(18, 13, H('#5a9a42')); p.set(19, 12, H('#7aba52')); p.set(20, 13, H('#5a9a42'));
  return p;
})(), [2, 2]);

/** The mountain rescue gate on the pass road (1×2): posts, a striped bar, the rescue sign. */
add('trailgate', (() => {
  const p = new Pix(16, 42);
  shadowEllipse(p, 8, 40, 6, 1, H('#1a142255'));
  for (let y = 6; y < 40; y++) { p.set(6, y, OUTLINE); p.set(7, y, (Math.floor(y / 4) % 2) ? H('#d8303a') : H('#ffffff')); p.set(8, y, (Math.floor(y / 4) % 2) ? H('#a8202a') : H('#d8dce4')); p.set(9, y, OUTLINE); }
  for (const y of [5, 39]) rect(p, 4, y, 8, 3, OUTLINE);
  // the sign: a white cross on red
  for (let y = 12; y < 24; y++) for (let x = 2; x < 14; x++) p.set(x, y, y === 12 || y === 23 || x === 2 || x === 13 ? OUTLINE : H('#d8303a'));
  rect(p, 7, 14, 2, 8, H('#ffffff')); rect(p, 4, 17, 8, 2, H('#ffffff'));
  return p;
})(), [1, 2]);

/** An avalanche across the path (2×2): heaped snow with blocks, a broken branch, a warning post. */
add('avalanche', (() => {
  const W = 32, Hh = 40, p = new Pix(W, Hh);
  shadowEllipse(p, 16, 37, 16, 3, H('#3a4a6a40'));
  const blobs: [number, number, number][] = [[16, 26, 12], [7, 30, 7], [25, 30, 7], [11, 18, 7], [21, 17, 7], [16, 12, 6]];
  for (const [cx, cy, r] of blobs) disc(p, cx, cy, r, (d, x, y) => {
    if (d > r - 1) return H('#8a9ab8');
    const l = -(x - cx) / r * 0.5 - (y - cy) / r * 0.7 + (hash(x, y, 1420) - 0.5) * 0.15;
    return l > 0.35 ? SNOW[3] : l > 0 ? SNOW[2] : l > -0.35 ? SNOW[1] : SNOW_SHADE;
  });
  for (const [x, y] of [[6, 22], [24, 21], [13, 30], [20, 32]]) { rect(p, x, y, 4, 3, SNOW[3]); rect(p, x, y + 3, 4, 1, H('#8a9ab8')); p.set(x + 3, y, SNOW[1]); }
  line(p, 4, 14, 12, 20, H('#4a2c18')); line(p, 7, 16, 6, 12, H('#4a2c18')); p.set(5, 12, H('#2a6040')); p.set(6, 11, H('#2a6040')); p.set(9, 17, H('#2a6040'));
  // fog wisps
  for (let x = 0; x < W; x++) { const y = Math.round(6 + Math.sin(x / 4) * 2); p.set(x, y, H('#ffffffaa')); p.set(x, y + 1, H('#ffffff66')); }
  return p;
})(), [2, 2]);

/** The closed cable car gate (1×2): a chain between posts and a red "closed" plate. */
add('cablecar', (() => {
  const p = new Pix(16, 40);
  shadowEllipse(p, 8, 38, 6, 1, H('#3a4a6a40'));
  for (const y0 of [4, 30]) { rect(p, 5, y0, 6, 8, OUTLINE); rect(p, 6, y0 + 1, 2, 6, H('#d8dce4')); rect(p, 8, y0 + 1, 2, 6, H('#a8acb4')); }
  for (let y = 12; y < 30; y++) { p.set(8, y, y % 3 === 0 ? H('#e8c050') : H('#a88020')); p.set(7, y, y % 3 === 1 ? OUTLINE : 0); }
  for (let y = 15; y < 26; y++) for (let x = 2; x < 14; x++) p.set(x, y, y === 15 || y === 25 || x === 2 || x === 13 ? OUTLINE : H('#d8303a'));
  rect(p, 4, 19, 8, 3, H('#ffffff'));
  return p;
})(), [1, 2]);

// ---------------------------------------------------------------- homes: two kinds of room, and their furniture

/**
 * Rooms: a chalet's parlour (larch panelling, wide floorboards, a painted frieze) and a stone house's room
 * (whitewashed walls over stone, flagstone floor, a wooden wainscot). '#' is wall: its face where the floor begins,
 * dark ceiling beams above; ':' is the doormat.
 */
function roomHook(stone: boolean): TerrainHook {
  return (p, ox, oy, tx, ty, at) => {
    const c = at(tx, ty);
    const C = palette();
    // the doormat's path continuing past the map edge counts as wall (darkness)
    const wallish = (x: number, y: number) => at(x, y) === '#' || (at(x, y) === ':' && at(x, y - 1) === ':');
    if (c === '#') {
      const lower = !wallish(tx, ty + 1) && at(tx, ty + 1) !== ':', upper = wallish(tx, ty + 1) && !wallish(tx, ty + 2) && at(tx, ty + 2) !== ':';
      const back = lower || upper;
      const floorR = !wallish(tx + 1, ty), floorL = !wallish(tx - 1, ty), floorU = !wallish(tx, ty - 1);
      const DARK = H('#120e0a');
      for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
        const wx = tx * T + x;
        const wyl = y + (upper ? 0 : T); // 0..31 down the two-tile wall
        let col = DARK;
        if (back && (lower || upper)) {
          if (stone) {
            if (wyl < 2) col = H('#4a3a2a');
            else if (wyl < 3) col = H('#8a5a32');
            else if (wyl < 22) {
              const stoneShows = hash(Math.floor(wx / 6), Math.floor(wyl / 4), 1601) < 0.08;
              col = stoneShows ? (wyl % 4 === 3 ? H('#a49e92') : H('#bcb6aa')) : wyl < 5 ? H('#d8d2c6') : H('#ece8e0');
            } else if (wyl === 22) col = H('#6a4024');
            else if (wyl === 23) col = H('#c08a56');
            else if (wyl < 30) col = mod(wx, 10) === 0 ? H('#6a4024') : H('#a06c3e');
            else col = wyl === 31 ? H('#2a1a0e') : H('#5a3418');
          } else {
            if (wyl < 2) col = H('#2a1a0e');
            else if (wyl < 4) col = H('#6a4024');
            else if (wyl < 7) col = mod(wx, 6) < 3 ? H('#c8302a') : H('#2e7a40'); // painted frieze
            else if (wyl === 7) col = H('#3a2414');
            else if (wyl >= 29) col = wyl === 31 ? H('#2a1a0e') : H('#5a3418');
            else { const k = mod(wx, 8); col = k === 0 ? H('#6a3e1e') : k === 1 ? H('#c88a52') : hash(Math.floor(wx / 8), 0, 1603) < 0.4 ? H('#a86c3c') : H('#b07444'); }
          }
        } else {
          // the top of a side or front wall: a thick edge on the room side, dark beyond
          const cap = stone ? [H('#5a524a'), H('#8a8278'), H('#3a342e')] : [H('#5a3418'), H('#9a6236'), H('#3a2414')];
          if (floorR && x >= 11) col = x === 11 ? cap[2] : x === 15 ? cap[1] : cap[0];
          if (floorL && x <= 4) col = x === 4 ? cap[2] : x === 0 ? cap[1] : cap[0];
          if (floorU && y <= 4) col = y === 4 ? cap[2] : y === 0 ? cap[1] : cap[0];
        }
        p.set(ox + x, oy + y, col);
      }
      return true;
    }
    // the doormat's path running on outside the room (the map edge continues paths): just darkness
    if (c === ':' && at(tx, ty - 1) === ':') { p.fill(ox, oy, T, T, H('#120e0a')); return true; }
    floorTile(p, ox, oy, tx, ty, stone, C);
    if (c === ':') {
      for (let y = 2; y < 14; y++) for (let x = 1; x < 15; x++) {
        const edge = y === 2 || y === 13 || x === 1 || x === 14;
        p.set(ox + x, oy + y, edge ? C.pathEdge : (x + y) % 4 === 0 ? C.pathLight : y % 4 === 1 ? C.pathDark : C.path);
      }
    }
    if (c === 'r' || c === 'y' || c === 'w') rugTile(p, ox, oy, tx, ty, c, at);
    // the walls cast a soft shadow on the floor
    if (at(tx, ty - 1) === '#') for (let x = 0; x < T; x++) { p.set(ox + x, oy, H('#1a100850')); p.set(ox + x, oy + 1, H('#1a100830')); p.set(ox + x, oy + 2, H('#1a100818')); }
    if (at(tx - 1, ty) === '#') for (let y = 0; y < T; y++) { p.set(ox, oy + y, H('#1a100840')); p.set(ox + 1, oy + y, H('#1a100820')); }
    return true;
  };
}

/** Rugs on the floor (walkable): 'r' a red woven rug, 'y' a braided rag rug, 'w' a sheepskin. */
function rugTile(p: Pix, ox: number, oy: number, tx: number, ty: number, c: string, at: At) {
  const same = (dx: number, dy: number) => at(tx + dx, ty + dy) === c;
  const n = !same(0, -1), s2 = !same(0, 1), w = !same(-1, 0), e = !same(1, 0);
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    if ((n && y < 2) || (s2 && y > 13) || (w && x < 2) || (e && x > 13)) continue;
    // rounded corners
    if ((n && w && x + y < 5) || (n && e && 15 - x + y < 5) || (s2 && w && x + 15 - y < 5) || (s2 && e && 30 - x - y < 5)) continue;
    const ex = (w && x < 4) || (e && x > 11) || (n && y < 4) || (s2 && y > 11);
    const edge = (w && x === 2) || (e && x === 13) || (n && y === 2) || (s2 && y === 13);
    const wx = tx * T + x, wy = ty * T + y;
    let col: number;
    if (c === 'r') col = edge ? H('#5a1a14') : ex ? (mod(wx + wy, 4) < 2 ? H('#f0d8a0') : H('#2e6a40')) : mod(wx - wy, 8) < 2 ? H('#f0d8a0') : mod(wx + wy, 8) < 1 ? H('#2e6a40') : H('#b8302a');
    else if (c === 'y') col = edge ? H('#5a3a14') : [H('#e8c050'), H('#3a6aa8'), H('#c8302a'), H('#e8e0c8')][mod(Math.floor((wy + (mod(wx, 4) < 2 ? 0 : 1)) / 2), 4)];
    else col = edge ? H('#b8ae98') : hash(wx >> 1, wy >> 1, 1650) < 0.3 ? H('#e8e0d0') : hash(wx, wy, 1651) < 0.15 ? H('#d0c6b2') : H('#f8f4ec');
    p.set(ox + x, oy + y, col);
  }
}

function floorTile(p: Pix, ox: number, oy: number, tx: number, ty: number, stone: boolean, C: ReturnType<typeof palette>) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    if (stone) p.set(ox + x, oy + y, flagAt(wx, wy));
    else {
      // wide boards running across, staggered joints, a knot here and there
      const row = Math.floor(wy / 6), yIn = mod(wy, 6);
      const joint = mod(wx + row * 17, 40) === 0;
      let col = C.ground[Math.floor(hash(row, Math.floor((wx + row * 17) / 40), 1610) * 4)];
      if (yIn === 5 || joint) col = C.grassDark;
      else if (yIn === 0) col = C.grassLight;
      else if (hash(wx, wy, 1611) < 0.006) col = C.grassDark;
      p.set(ox + x, oy + y, col);
    }
  }
}

registerTheme('chaletroom', {
  ground: ['#b8804a', '#c08850', '#c88f56', '#cf975c'], grassDark: '#7a4c26', grassLight: '#dcaa72',
  path: '#c84a3a', pathDark: '#9a3028', pathLight: '#f0d8b0', pathEdge: '#5a2018',
  water: '#5db1ef', waterDeep: '#4795dc', waterLight: '#b9e5ff', waterEdge: '#2f6aa8', foam: '#e6f6ff', shadow: '#2a1a0a44',
}, { terrain: roomHook(false), things: (c) => (c === '#' ? 'wall' : c === ':' ? 'mat' : c === 'r' || c === 'y' || c === 'w' ? 'rug' : 'floor') });
registerTheme('stoneroom', {
  ground: ['#a8a094', '#b2aa9e', '#bcb4a8', '#c6beb2'], grassDark: '#6e675e', grassLight: '#d6cfc4',
  path: '#3a6aa8', pathDark: '#2a4a80', pathLight: '#e8e0c8', pathEdge: '#1a2a4a',
  water: '#5db1ef', waterDeep: '#4795dc', waterLight: '#b9e5ff', waterEdge: '#2f6aa8', foam: '#e6f6ff', shadow: '#2a1a0a44',
}, { terrain: roomHook(true), things: (c) => (c === '#' ? 'wall' : c === ':' ? 'mat' : c === 'r' || c === 'y' || c === 'w' ? 'rug' : 'floor') });

/** A box with an outline, lit from the top left (furniture bodies). */
function box(p: Pix, x: number, y: number, w: number, h: number, base: string) {
  for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
    const edge = yy === 0 || xx === 0 || yy === h - 1 || xx === w - 1;
    p.set(x + xx, y + yy, edge ? OUTLINE : yy === 1 || xx === 1 ? tint(base, 1.2) : xx === w - 2 || yy === h - 2 ? tint(base, 0.78) : H(base));
  }
}

/** The tiled stove (2×1): green glazed tiles, a bench round it, a pot on top. */
add('stove', (() => {
  const p = new Pix(32, 40);
  shadowEllipse(p, 16, 38, 15, 2, H('#1a100840'));
  box(p, 4, 6, 24, 28, '#3e8a5a');
  for (let y = 8; y < 32; y += 6) for (let x = 6; x < 26; x += 6) { rect(p, x, y, 5, 5, H('#4ea06a')); p.set(x, y, H('#8ad0a0')); p.set(x + 1, y, H('#8ad0a0')); p.set(x, y + 1, H('#8ad0a0')); rect(p, x, y + 4, 5, 1, H('#2a6040')); }
  box(p, 2, 3, 28, 4, '#2e6a46');
  rect(p, 12, 24, 8, 8, OUTLINE); rect(p, 13, 25, 6, 6, H('#1a1010')); rect(p, 14, 28, 4, 2, H('#f08a30')); p.set(15, 27, H('#ffd060'));
  box(p, 0, 32, 32, 6, '#a86c3c');
  box(p, 11, 0, 9, 5, '#5a5a62');
  return p;
})(), [2, 1]);

/** A farmhouse bed (1×2): carved headboard, a red-and-white checked quilt, a big pillow. */
add('bed', (() => {
  const p = new Pix(16, 36);
  shadowEllipse(p, 8, 34, 8, 1, H('#1a100840'));
  box(p, 0, 0, 16, 8, '#8a5430');
  p.set(7, 3, H('#e8304a')); p.set(8, 3, H('#e8304a')); p.set(7, 4, H('#e8304a')); p.set(8, 4, H('#e8304a')); p.set(6, 3, H('#3e8a3a')); p.set(9, 4, H('#3e8a3a'));
  box(p, 0, 7, 16, 27, '#a86c3c');
  box(p, 2, 8, 12, 7, '#fbf6ee');
  for (let y = 15; y < 32; y++) for (let x = 1; x < 15; x++) p.set(x, y, (Math.floor(x / 3) + Math.floor(y / 3)) % 2 ? H('#d8303a') : H('#fbf6ee'));
  rect(p, 1, 15, 14, 1, H('#a82028'));
  rect(p, 0, 33, 16, 1, OUTLINE);
  return p;
})(), [1, 2]);

/** A painted farmhouse cupboard (2×1): blue with tulips, against the wall. */
add('cupboard', (() => {
  const p = new Pix(32, 40);
  shadowEllipse(p, 16, 38, 14, 1, H('#1a100840'));
  box(p, 2, 2, 28, 36, '#3a6aa8');
  rect(p, 1, 1, 30, 3, OUTLINE); rect(p, 2, 2, 28, 1, H('#6a9ad8'));
  for (const x0 of [5, 17]) {
    box(p, x0, 6, 10, 28, '#4a7ab8');
    // painted flowers on each door
    for (const [dx, dy, c] of [[4, 12, '#e8304a'], [3, 13, '#e8304a'], [5, 13, '#e8304a'], [4, 14, '#f4d040'], [4, 16, '#3e8a3a'], [4, 17, '#3e8a3a'], [3, 18, '#3e8a3a'], [5, 18, '#3e8a3a'], [4, 22, '#ffffff'], [3, 23, '#ffffff'], [5, 23, '#ffffff']] as const) p.set(x0 + dx, dy, H(c));
  }
  p.set(14, 20, H('#f4d060')); p.set(17, 20, H('#f4d060'));
  return p;
})(), [2, 1]);

/** A farmhouse table (2×1): scrubbed wood, a checked runner, bread, cheese and a jug; a corner bench behind. */
add('woodtable', (() => {
  const p = new Pix(32, 30);
  shadowEllipse(p, 16, 28, 15, 2, H('#1a100840'));
  box(p, 0, 0, 32, 6, '#8a5430');
  box(p, 1, 6, 30, 14, '#c8945a');
  for (let x = 10; x < 22; x++) for (let y = 7; y < 19; y++) p.set(x, y, (Math.floor(x / 2) + Math.floor(y / 2)) % 2 ? H('#d8303a') : H('#fbf6ee'));
  disc(p, 6, 11, 3, (d) => (d > 2.3 ? OUTLINE : H('#d8a458')));
  rect(p, 24, 9, 5, 4, OUTLINE); rect(p, 25, 10, 3, 2, H('#f8d860'));
  box(p, 14, 8, 4, 6, '#e8e0d0');
  for (const x of [2, 28]) { rect(p, x, 20, 2, 8, OUTLINE); }
  return p;
})(), [2, 1]);

/** The cheesemaker's copper kettle over a fire (2×1). */
add('cheesekettle', (() => {
  const p = new Pix(32, 34);
  shadowEllipse(p, 16, 32, 15, 2, H('#1a100840'));
  for (let x = 4; x < 28; x++) { const f = hash(x, 0, 1620); rect(p, x, 26 + Math.floor(f * 3), 1, 4, f < 0.5 ? H('#f08a30') : H('#ffd060')); }
  disc(p, 16, 17, 12, (d, x, y) => (y < 10 ? 0 : d > 11 ? OUTLINE : x < 13 ? H('#e89a5a') : x < 20 ? H('#c8703a') : H('#9a4a24')));
  for (let x = 5; x < 28; x++) { p.set(x, 10, OUTLINE); p.set(x, 11, H('#f4f0e0')); p.set(x, 12, H('#e8e0c8')); }
  p.set(12, 11, H('#ffffff')); p.set(20, 12, H('#d8d0b0'));
  for (let y = 0; y < 10; y++) p.set(27 - y, y + 1, H('#6a4428'));
  for (const x of [3, 28]) for (let y = 4; y < 32; y++) p.set(x, y, OUTLINE);
  rect(p, 3, 4, 26, 1, OUTLINE);
  return p;
})(), [2, 1]);

/** Shelves of cheese wheels ripening (2×1), against the wall. */
add('cheeserack', (() => {
  const p = new Pix(32, 42);
  shadowEllipse(p, 16, 40, 14, 1, H('#1a100840'));
  for (const x of [1, 29]) rect(p, x, 0, 2, 40, H('#6a4024'));
  for (let k = 0; k < 4; k++) {
    const y = 8 + k * 9;
    rect(p, 1, y, 30, 2, H('#8a5430')); rect(p, 1, y + 2, 30, 1, OUTLINE);
    for (let j = 0; j < 3; j++) {
      const cx = 5 + j * 10;
      for (let yy = 0; yy < 6; yy++) for (let xx = 0; xx < 8; xx++) {
        const edge = xx === 0 || xx === 7 || yy === 0;
        p.set(cx + xx, y - 6 + yy, edge ? H('#6a4a14') : yy === 1 ? H('#fff0a0') : xx < 3 ? H('#f8d860') : H('#e0b030'));
      }
    }
  }
  return p;
})(), [2, 1]);

/** A bookshelf (2×1): rows of coloured spines and a model of the bridge. */
add('bookshelf', (() => {
  const p = new Pix(32, 42);
  shadowEllipse(p, 16, 40, 14, 1, H('#1a100840'));
  box(p, 0, 0, 32, 40, '#6a4024');
  const cols = ['#c8302a', '#2e7a40', '#3a6aa8', '#e8c050', '#8a4a8a', '#e8e0d0'];
  for (let k = 0; k < 4; k++) {
    const y = 3 + k * 9;
    rect(p, 2, y, 28, 8, H('#2a1a10'));
    let x = 3;
    while (x < 29) { const w = 2 + Math.floor(hash(x, k, 1630) * 2), h = 5 + Math.floor(hash(x, k, 1631) * 3); rect(p, x, y + 8 - h, w, h, H(cols[Math.floor(hash(x, k, 1632) * 6)])); p.set(x, y + 8 - h, H('#ffffff40')); x += w + (hash(x, k, 1633) < 0.2 ? 2 : 0); }
    rect(p, 2, y + 8, 28, 1, H('#8a5430'));
  }
  return p;
})(), [2, 1]);

/** A cuckoo clock on the wall (1×1, hung on a wall tile). */
add('cuckoo', (() => {
  const p = new Pix(16, 16);
  for (let y = 1; y < 6; y++) { const hw = y + 1; for (let x = 8 - hw; x < 8 + hw; x++) p.set(x, y, y === 1 || x === 8 - hw || x === 7 + hw ? OUTLINE : H('#5a3218')); }
  box(p, 3, 5, 10, 9, '#8a5430');
  disc(p, 8, 9, 3, (d) => (d > 2.2 ? OUTLINE : H('#fbf6e8')));
  p.set(8, 8, OUTLINE); p.set(9, 9, OUTLINE);
  p.set(8, 3, H('#f4d040'));
  for (const x of [6, 10]) { p.set(x, 14, H('#a8842a')); p.set(x, 15, H('#e8c050')); }
  return p;
})(), [1, 1]);

/** A painting of the mountains (1×1, on a wall tile). */
add('painting', (() => {
  const p = new Pix(16, 16);
  box(p, 1, 2, 14, 11, '#c89a40');
  for (let y = 4; y < 11; y++) for (let x = 3; x < 13; x++) {
    const peak = 10 - Math.abs(x - 6) * 1.5, peak2 = 11 - Math.abs(x - 10) * 1.3;
    p.set(x, y, y > Math.min(peak, peak2) + 3 ? H('#5a9a42') : y > Math.min(peak, peak2) ? (y < Math.min(peak, peak2) + 1.5 ? H('#ffffff') : H('#8a94a6')) : H('#8ac8f0'));
  }
  return p;
})(), [1, 1]);

/** An alphorn hung along the wall (3×1, on wall tiles). */
add('alphorn', (() => {
  const p = new Pix(48, 16);
  for (let x = 3; x < 42; x++) { const w = x > 34 ? 1 + (x - 34) * 0.45 : 1; const y = 9; for (let k = -Math.round(w); k <= Math.round(w); k++) p.set(x, y + k, k === -Math.round(w) || k === Math.round(w) ? OUTLINE : k < 0 ? H('#e0a868') : H('#a86c3c')); if (x % 7 === 0 && x < 34) { p.set(x, 8, H('#3a2414')); p.set(x, 10, H('#3a2414')); } }
  for (let y = 4; y < 15; y++) p.set(44, y, OUTLINE);
  disc(p, 43.5, 9, 4.5, (d, x) => (x < 42 ? 0 : d > 3.8 ? OUTLINE : d < 1.8 ? H('#2a1a10') : H('#c88a52')));
  rect(p, 1, 8, 3, 3, OUTLINE); p.set(2, 9, H('#e8c050'));
  return p;
})(), [3, 1]);

/** Skis, poles and an avalanche probe leaning on the wall (2×1). */
add('skirack', (() => {
  const p = new Pix(32, 40);
  shadowEllipse(p, 16, 38, 14, 1, H('#1a100840'));
  rect(p, 0, 12, 32, 3, H('#6a4024')); rect(p, 0, 15, 32, 1, OUTLINE);
  const ski = (x: number, c: string) => { for (let y = 1; y < 38; y++) { p.set(x, y, OUTLINE); p.set(x + 1, y, y < 4 ? H('#ffffff') : H(c)); p.set(x + 2, y, OUTLINE); } p.set(x + 1, 0, OUTLINE); };
  ski(3, '#d8303a'); ski(7, '#d8303a'); ski(13, '#3a6aa8'); ski(17, '#3a6aa8');
  for (const x of [24, 27]) { for (let y = 4; y < 38; y++) p.set(x, y, H('#5a5e66')); disc(p, x, 33, 1.8, (d) => (d > 1.2 ? OUTLINE : H('#3a3a40'))); }
  for (let y = 2; y < 38; y++) p.set(30, y, y % 4 < 2 ? H('#e8c050') : H('#2a2a30'));
  return p;
})(), [2, 1]);

/** A spinning wheel (1×1). */
add('spinwheel', (() => {
  const p = new Pix(16, 22);
  shadowEllipse(p, 8, 20, 7, 1, H('#1a100840'));
  disc(p, 7, 8, 6.5, (d) => (d > 5.6 ? OUTLINE : d > 4.4 ? H('#a86c3c') : 0));
  for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; line(p, 7, 8, Math.round(7 + Math.cos(a) * 4.5), Math.round(8 + Math.sin(a) * 4.5), H('#8a5430')); }
  disc(p, 7, 8, 1.5, () => H('#3a2414'));
  line(p, 2, 19, 7, 14, OUTLINE); line(p, 12, 19, 7, 14, OUTLINE); line(p, 7, 14, 7, 9, OUTLINE);
  rect(p, 11, 3, 4, 5, H('#f4ecd8')); rect(p, 11, 3, 4, 1, OUTLINE); rect(p, 11, 7, 4, 1, OUTLINE);
  return p;
})(), [1, 1]);

/** A miner's rack: helmets, lamps and a pick (2×1). */
add('helmetrack', (() => {
  const p = new Pix(32, 38);
  shadowEllipse(p, 16, 36, 14, 1, H('#1a100840'));
  box(p, 0, 2, 32, 34, '#6a4024');
  rect(p, 2, 4, 28, 30, H('#3a2414'));
  for (const [x, y] of [[4, 6], [17, 6]] as const) { disc(p, x + 5, y + 6, 5.5, (d, xx, yy) => (yy > y + 6 ? 0 : d > 4.6 ? OUTLINE : xx < x + 4 ? H('#ffe060') : H('#e8b020'))); rect(p, x, y + 6, 11, 1, OUTLINE); rect(p, x + 4, y + 2, 3, 2, H('#fff8c8')); }
  for (const x of [6, 14, 22]) { rect(p, x, 20, 5, 7, OUTLINE); rect(p, x + 1, 21, 3, 5, H('#ffd860')); p.set(x + 2, 19, OUTLINE); }
  line(p, 5, 32, 26, 29, H('#8a5430')); line(p, 24, 26, 28, 33, H('#8a8e96'));
  return p;
})(), [2, 1]);

/** A glass cabinet of crystals and minerals (2×1). */
add('crystalshelf', (() => {
  const p = new Pix(32, 40);
  shadowEllipse(p, 16, 38, 14, 1, H('#1a100840'));
  box(p, 0, 0, 32, 38, '#8a5430');
  rect(p, 2, 2, 28, 34, H('#cfe8f4'));
  for (let k = 0; k < 3; k++) {
    const y = 12 + k * 11;
    rect(p, 2, y, 28, 1, H('#8a5430'));
    for (let j = 0; j < 4; j++) {
      const x = 4 + j * 7, c = ['#8adcf8', '#c88af0', '#f8d860', '#f0f0f0', '#e86a8a'][Math.floor(hash(j, k, 1640) * 5)];
      for (let yy = 0; yy < 6; yy++) { const hw = Math.max(0, Math.floor((yy + 1) / 2)); for (let xx = -hw; xx <= hw; xx++) p.set(x + 2 + xx, y - 6 + yy, xx === -hw ? H('#ffffff') : xx === hw ? tint(c, 0.7) : H(c)); }
    }
  }
  for (let y = 3; y < 35; y += 3) p.set(4 + (y % 7), y, H('#ffffff80'));
  rect(p, 15, 2, 1, 34, H('#8a5430'));
  return p;
})(), [2, 1]);


/** A window in the back wall (1×1, hung on the lower wall tile): mountains outside, checked curtains, geraniums. */
add('window', (() => {
  const p = new Pix(16, 26);
  box(p, 2, 2, 12, 16, '#f4efe4');
  for (let y = 4; y < 16; y++) for (let x = 4; x < 12; x++) {
    const ridge = 11 - Math.abs(x - 7) * 1.3;
    p.set(x, y, y > 13 ? H('#5a9a42') : y > ridge + 1 ? H('#8a94a6') : y > ridge ? H('#ffffff') : y < 8 ? H('#a8d4f0') : H('#c8e8fa'));
  }
  rect(p, 7, 4, 1, 12, H('#f4efe4')); rect(p, 4, 9, 8, 1, H('#f4efe4'));
  for (const x0 of [0, 12]) for (let y = 1; y < 18; y++) for (let x = x0; x < x0 + 4; x++) p.set(x, y, x === x0 || x === x0 + 3 ? OUTLINE : (Math.floor(x / 2) + Math.floor(y / 2)) % 2 ? H('#d8303a') : H('#fbf6ee'));
  rect(p, 0, 0, 16, 2, H('#6a4024')); rect(p, 0, 0, 16, 1, OUTLINE);
  rect(p, 2, 18, 12, 3, H('#6a3e20')); rect(p, 2, 18, 12, 1, H('#9a6234'));
  for (let x = 2; x < 14; x++) { const r = hash(x, 1, 1660); p.set(x, 17, r < 0.5 ? H('#e8304a') : H('#3e8a3a')); if (r < 0.3) p.set(x, 16, H('#ff7a8a')); }
  return p;
})(), [1, 1]);

/** A wall shelf with jugs, plates and a candle (2×1, hung on the lower wall tile). */
add('shelf', (() => {
  const p = new Pix(32, 18);
  rect(p, 1, 12, 30, 3, H('#8a5430')); rect(p, 1, 12, 30, 1, H('#c88a52')); rect(p, 1, 15, 30, 1, OUTLINE);
  for (const x of [4, 27]) { rect(p, x, 15, 2, 3, H('#5a3418')); }
  disc(p, 6, 7, 4.5, (d) => (d > 3.8 ? OUTLINE : d > 2.5 ? H('#3a6aa8') : H('#fbf6ee')));
  disc(p, 14, 7, 4.5, (d) => (d > 3.8 ? OUTLINE : d > 2.5 ? H('#c8302a') : H('#fbf6ee')));
  box(p, 19, 5, 5, 7, '#c8703a'); p.set(20, 4, OUTLINE); p.set(21, 4, OUTLINE);
  box(p, 25, 8, 3, 4, '#f4f0e0'); p.set(26, 7, H('#ffd060')); p.set(26, 6, H('#f08a30'));
  return p;
})(), [2, 1]);

/** A painted wooden chest (1×1). */
add('chest', (() => {
  const p = new Pix(16, 16);
  shadowEllipse(p, 8, 14, 7, 1, H('#1a100840'));
  box(p, 1, 3, 14, 11, '#2e6a8a');
  rect(p, 1, 3, 14, 3, H('#3a7ea0')); rect(p, 1, 6, 14, 1, OUTLINE);
  for (const [x, y, c] of [[7, 9, '#e8304a'], [8, 9, '#e8304a'], [6, 10, '#f4d040'], [9, 10, '#f4d040'], [7, 11, '#3e8a3a']] as const) p.set(x, y, H(c));
  for (const x of [3, 12]) rect(p, x, 3, 1, 11, H('#c89a40'));
  return p;
})(), [1, 1]);

/** A basket of firewood and wool (1×1). */
add('basket', (() => {
  const p = new Pix(16, 16);
  shadowEllipse(p, 8, 14, 7, 1, H('#1a100840'));
  for (const [x, y, c] of [[4, 4, '#e8e0d0'], [8, 3, '#c8302a'], [11, 5, '#3a6aa8']] as const) disc(p, x, y + 1.5, 2.5, (d) => (d > 1.8 ? OUTLINE : H(c)));
  for (let y = 6; y < 14; y++) for (let x = 2; x < 14; x++) {
    const edge = x === 2 || x === 13 || y === 13 || y === 6;
    p.set(x, y, edge ? OUTLINE : (x + Math.floor(y / 2)) % 3 === 0 ? H('#8a6030') : H('#c8964e'));
  }
  return p;
})(), [1, 1]);

for (const [name, [pix, size]] of Object.entries(DECOR_ART)) { DECOR[name] = pix; DECOR_SIZE[name] = size; }

// NPCS
// ---------------------------------------------------------------- animals

const ANIMALS: Record<string, Pix> = {
  // Anton the ibex, road mender: great ridged horns, a beard, an orange safety vest
  ibex: sprite({ k: '#2a1e16', h: '#e0d0a8', H: '#9a8a64', b: '#9a7a58', B: '#6e5238', l: '#dcc6a4', e: '#101010', n: '#3a2a20', v: '#f47a1e', V: '#c05a10', y: '#f8f070' }, [
    '...kk......kk...',
    '..khHk....kHhk..',
    '.khHk......kHhk.',
    'khHk........kHhk',
    'kHhk.kkkkkk.khHk',
    '.kk.kbbbbbbk.kk.',
    '..kkbbbbbbbbkk..',
    '..kbbebbbbebbk..',
    '..kbbbllllbbbk..',
    '...kblnnnnlbk...',
    '..kvvkllllkvvk..',
    '.kbvyvvkkvvyvbk.',
    '.kbvvvVvvVvvvbk.',
    '..kvvvvvvvvvvk..',
    '...kBk....kBk...',
    '...kkk....kkk...',
  ]),
  // Liesl and the meadow cows: brown patches, short horns, a big bell
  mtcow: sprite({ k: '#2a1e18', w: '#fbf6ee', W: '#d8d0c4', b: '#8a4a2a', B: '#6a3420', h: '#e8e0cc', p: '#f0a8a8', n: '#7a3a3a', e: '#101010', y: '#f0c040', Y: '#b88a20' }, [
    '..hh........hh..',
    '...hkkkkkkkkh...',
    '.kkkwwwbbbwwkkk.',
    'kbbkwwbbbbwwkbbk',
    '.kkkwewbbwewkkk.',
    '...kwwwwwwwwk...',
    '...kppppppppk...',
    '...kpnppppnpk...',
    '....kppppppk....',
    '...kwkkyykkwk...',
    '..kwwbkyYykwwk..',
    '..kbbwwkkkwbbk..',
    '..kbbwwwwwwbbk..',
    '..kWwwwbbwwwWk..',
    '...kWk....kWk...',
    '...kk......kk...',
  ]),
  // Jakob the alpine chough (exchange office): glossy black, yellow beak, red legs
  chough: sprite({ k: '#0c0c14', b: '#2a2a3c', B: '#4a4a74', W: '#ffffff', e: '#101010', y: '#f8d030', Y: '#c89a10', r: '#e03a3a' }, [
    '................',
    '.....kkkkkk.....',
    '....kbbbbbbk....',
    '...kbBbbbbbbk...',
    '...kbWebbWebk...',
    '...kbbbyybbbk...',
    '....kbyyYybk....',
    '....kbbyYbbk....',
    '...kbbbkkbbbk...',
    '..kbBbbbbbbBbk..',
    '.kbBbbbbbbbbBbk.',
    '.kbBbbbbbbbbBbk.',
    '..kbBbbbbbbBbk..',
    '...kkbbbbbbkk...',
    '.....krkkrk.....',
    '....krrk.krrk...',
  ]),
  // Max the marmot, foreman in Miners' Town: a yellow helmet with a lamp, big front teeth
  marmot: sprite({ k: '#2a1a10', y: '#f4c430', Y: '#c89a18', w: '#fff8c8', b: '#a8784a', B: '#7a5432', l: '#e0c098', n: '#2a1a10', W: '#ffffff', e: '#101010' }, [
    '.....kkkkkk.....',
    '....kyywyyYk....',
    '...kyyyyyyyYk...',
    '..kkkkkkkkkkkk..',
    '...kbbbbbbbbk...',
    '..kbbebbbbebbk..',
    '..kbbbllllbbbk..',
    '...kbllnnllbk...',
    '...kbllWWllbk...',
    '..kbbbllllbbbk..',
    '.kbbklllllllbkbk',
    '.kbkbllllllblkk.',
    '..kbbllllllbbk..',
    '..kBbbbbbbbbBk..',
    '...kbbk..kbbk...',
    '...kkk....kkk...',
  ]),
  // Heidi the goat, sports shop: white, a beard, a red neckerchief
  mtgoat: sprite({ k: '#2a2a28', w: '#fbfaf4', W: '#d4d0c4', h: '#c8b890', p: '#f0b0a8', n: '#5a3a3a', e: '#101010', r: '#d8303a', R: '#a8202a' }, [
    '...kk......kk...',
    '...khk....khk...',
    '....khkkkkhk....',
    '.kkkwwwwwwwwkkk.',
    'kwWkwwwwwwwwkWwk',
    '.kk.kwewwewk.kk.',
    '....kwwwwwwk....',
    '....kwppppwk....',
    '.....kpnnpk.....',
    '....kkkwwkkk....',
    '...kwrrkwkrrk...',
    '..kwwwRrrRwwwk..',
    '..kwwwwwwwwwwk..',
    '..kWwwwwwwwwWk..',
    '...kWk....kWk...',
    '...kk......kk...',
  ]),
  // Flocke, Heidi's kid: small and fluffy, a little bell
  goatkid: sprite({ k: '#2a2a28', w: '#fbfaf4', W: '#d4d0c4', h: '#c8b890', p: '#f0b0a8', n: '#5a3a3a', e: '#101010', y: '#f0c040', Y: '#b88a20' }, [
    '................',
    '................',
    '................',
    '....kk....kk....',
    '....kh....hk....',
    '..kkkwwwwwwkkk..',
    '.kwWkwwwwwwkWwk.',
    '..kk.kewwek.kk..',
    '.....kwppwk.....',
    '.....kwnnwk.....',
    '....kkkyykkk....',
    '...kwwwYywwwk...',
    '...kwwwwwwwwk...',
    '...kWwwwwwwWk...',
    '....kWk..kWk....',
    '....kk....kk....',
  ]),
  // Vroni the chamois, mountain guide: hooked black horns, a striped face, a coil of red rope
  chamois: sprite({ k: '#20160e', a: '#2a2420', A: '#6a5a50', b: '#a8784a', B: '#7a5230', w: '#f8f0e0', d: '#3a2a20', e: '#101010', n: '#2a1a10', g: '#e04a3a', G: '#a82a22' }, [
    '....kk....kk....',
    '...kAak..kaAk...',
    '...kak....kak...',
    '...kkbbbbbbkk...',
    '..kbbwwwwwwbbk..',
    '..kbdewwwwedbk..',
    '...kdwwwwwwdk...',
    '...kwwwwwwwwk...',
    '....kwwnnwwk....',
    '.....kwwwwk.....',
    '...kkbkkkkgGk...',
    '..kbbbbbbgGgbk..',
    '..kbbbbbgGgbbk..',
    '..kBbbbgGgbbBk..',
    '...kBk....kBk...',
    '...kk......kk...',
  ]),
  // Bernhard the rescue dog: red-brown and white, a little barrel at his neck
  stbernard: sprite({ k: '#2a160c', b: '#b8582a', B: '#8a3c1a', w: '#fbf6ee', W: '#d8d0c4', e: '#101010', n: '#1a1010', p: '#f08a8a', g: '#9a6232', G: '#5a3a1e', y: '#c8a040' }, [
    '................',
    '..kkk......kkk..',
    '.kbbBkkkkkkBbbk.',
    '.kbbkbbwwbbkbbk.',
    '.kbBkbewwebkBbk.',
    '..kkkbwwwwbkkk..',
    '....kwwnnwwk....',
    '....kwwwwwwk....',
    '.....kwppwk.....',
    '...kkkkkkkkkk...',
    '..kbbkgyGygkbbk.',
    '..kbbkGgggGkbbk.',
    '..kbbwkkkkkwbbk.',
    '..kBwwwwwwwwBBk.',
    '...kwk....kwk...',
    '...kk......kk...',
  ]),
  // Jonas the yak, cable car driver: shaggy, curved horns, a blue cap
  yak: sprite({ k: '#1a120c', h: '#e8dcc0', b: '#5a3e2a', B: '#3a281a', l: '#8a6a50', n: '#1a120c', e: '#101010', c: '#2a5aa8', C: '#5a8ae0', y: '#f4d060' }, [
    '.k............k.',
    'khk..........khk',
    'khhkkkkkkkkkkhhk',
    '.kkkcCcyccccckk.',
    '..kccccccccccck.',
    '..kkkkkkkkkkkkk.',
    '.kbbbebbbbebbbk.',
    '.kbbbbllllbbbbk.',
    '.kBbblnnnnlbbBk.',
    '.kBbbbllllbbbBk.',
    'kBbBbbbbbbbbBbBk',
    'kBbBbbbbbbbbBbBk',
    'kBBbBbbbbbbBbBBk',
    '.kBkBkBkkBkBkBk.',
    '...kBk....kBk...',
    '...kk......kk...',
  ]),
  // Berta the brown bear, cook at the Pass Hut: chef's hat and apron
  brownbear: sprite({ k: '#24160c', w: '#fbfaf4', W: '#d8d4ca', b: '#8a5a32', B: '#6a4020', l: '#c8a070', n: '#1a100a', e: '#101010', r: '#d8303a' }, [
    '....kkkkkkk.....',
    '...kwwwwwwWk....',
    '...kwwwwwwWk....',
    '...kkWwwwWkk....',
    '..kbkkkkkkkbk...',
    '..kbbbbbbbbbk...',
    '..kbebbbbbebk...',
    '..kbbllllllbk...',
    '...kblnnnlbk....',
    '...kkllllllk....',
    '..kbbkwwwwkbbk..',
    '.kbbkwwwwwwkbbk.',
    '.kbbkwwrrwwkbbk.',
    '..kkkwwwwwwkkk..',
    '...kbbk..kbbk...',
    '...kkk....kkk...',
  ]),
  // Arno the golden eagle, border officer: golden nape, a hooked beak, the officer's cap
  goldeneagle: sprite({ k: '#1a120c', c: '#2a3a6a', C: '#4a5a9a', y: '#f4d060', g: '#c89a40', G: '#9a6a28', b: '#6a4628', B: '#4a2e18', W: '#ffffff', e: '#101010', o: '#f8c030', O: '#c08a10' }, [
    '....kkkkkkkk....',
    '...kcCcyyccck...',
    '..kkkkkkkkkkkk..',
    '...kggggggggk...',
    '...kgWeggWegk...',
    '...kggooooggk...',
    '....kgoOOogk....',
    '.....kkOOkk.....',
    '..kkbbbbbbbbkk..',
    '.kbbbBcCccBbbbk.',
    'kbbBbbcccCbbBbbk',
    'kbBbbbcyccbbbBbk',
    '.kkbbbccccbbbkk.',
    '...kbbbbbbbbk...',
    '....kok..kok....',
    '....kk....kk....',
  ]),
};
for (const [k, v] of Object.entries(ANIMALS)) NPCS[k] = v;

// ---------------------------------------------------------------- items

ITEMS.mt_cheese = sprite({ k: '#3a2a10', y: '#f8d860', Y: '#e0b030', l: '#fff0a0', r: '#c8902a', h: '#c89a30' }, [
  '................',
  '................',
  '........kkk.....',
  '......kkllyk....',
  '....kklyyyyyk...',
  '..kklyyhyyyyyk..',
  '.klyyyyyyyhyyk..',
  '.kyyhyyyyyyyyYk.',
  '.kYyyyyyhyyyyYk.',
  '.kYYyyyyyyyyYYk.',
  '.krYYYYYYYYYYrk.',
  '.krrrrrrrrrrrrk.',
  '..kkkkkkkkkkkk..',
  '................',
  '................',
  '................',
]);
ITEMS.mt_boots = sprite({ k: '#24160c', b: '#8a5430', B: '#5e3618', l: '#b87a48', r: '#d8303a', s: '#3a3a40', S: '#1a1a20', w: '#e8e0d0' }, [
  '................',
  '...kkkkk........',
  '...kblbk........',
  '...kbrbk........',
  '...kblbk........',
  '...krbrk........',
  '...kblbk........',
  '..kbbrbbk.......',
  '..kbblbbbkk.....',
  '..kbbbbbbbbkk...',
  '..kBbbbbbbbbbk..',
  '..kBBbbbbbbbbk..',
  '..kwwwwwwwwwwk..',
  '..kssssssssssk..',
  '...kSkSkSkSkk...',
  '................',
]);
ITEMS.mt_lunch = sprite({ k: '#2a1a10', w: '#fbfaf4', W: '#d0ccc0', s: '#e08a3a', S: '#c06a2a', g: '#5aa040', b: '#d8a458', B: '#b07a38', p: '#f4eccc', v: '#ffffff' }, [
  '.....v..v.......',
  '......v..v......',
  '.....v..v.......',
  '................',
  '..kkkkkkkkkkk...',
  '.kwssgssssgswk..',
  '.kwsssSssssswk..',
  '..kwwwwwwwwwk...',
  '...kWWWWWWWk....',
  '....kkkkkkk.....',
  '.......kkkkkkkk.',
  '......kbbpbbpbk.',
  '.....kbbbbbbbBk.',
  '.....kBBBBBBBBk.',
  '......kkkkkkkk..',
  '................',
]);
ITEMS.mt_crystal = sprite({ k: '#1a3a5a', c: '#8adcf8', C: '#4aa0d0', w: '#f0fcff', s: '#7a6a5a', S: '#5a4a3a' }, [
  '................',
  '.......k........',
  '......kwk.......',
  '......kwck......',
  '.....kwwck..k...',
  '.....kwcCk.kwk..',
  '..k..kwcCk.kwck.',
  '.kwk.kwcCkkwcCk.',
  '.kwck.kcCkkwcCk.',
  '.kwCk.kcCk.kCk..',
  '..kCkkkcCkkkk...',
  '..kkssssssssk...',
  '..ksSssSsSssSk..',
  '...kkkkkkkkkk...',
  '................',
  '................',
]);
ITEMS.mt_cowbell = sprite({ k: '#2a1a10', r: '#c8302a', R: '#8a1e18', y: '#f4c840', Y: '#c8962a', l: '#fff0a0', e: '#6a4a1a' }, [
  '................',
  '...kkkkkkkkkk...',
  '..krRrRrRrRrrk..',
  '..kRk......kRk..',
  '...k........k...',
  '....kkkkkkkk....',
  '....kylyyyYk....',
  '...kylyyyyyYk...',
  '...kylyyyyyYk...',
  '..kylyyyyyyyYk..',
  '..kylyyyyyyyYk..',
  '.kylyyyyyyyyyYk.',
  '.kYYYYYYYYYYYYk.',
  '..kkkkkeekkkkk..',
  '.......kk.......',
  '................',
]);
