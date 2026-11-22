/**
 * The Sun Coast's pixel art: the sea (turquoise shallows to deep blue, waves, surf and wet sand along an organic
 * shoreline, coral in the reef), sand with wind ripples, dune grass, paved promenades, boardwalks and piers, cliffs,
 * palms, the resort town (station, hotels, villas), the pier's Ferris wheel, the lighthouse with its turning beam,
 * the animals, items and the train ride.
 *
 * Shorelines: every tile gets a signed distance to the water at its centre (in tiles, + in the sea, - on land);
 * interpolated between tile centres (and wobbled a little) it gives a smooth field, so the coast curves freely
 * across the tile grid, the sea darkens with depth and surf and wet sand follow the shore.
 */
import { canopy, DECOR, DECOR_SIZE, disc, ITEMS, line, NPCS, outlined, poly, registerTheme, RIDE_LOOKS, shadowEllipse, tallGrass, vnoise as vnoiseArt, type TerrainHook } from '../art';
import { hash as hashPix, hex, Pix, sprite } from '../pix';

/** Where the lighthouse stands on its map (its beam is drawn on the ground layer, in two frames). */
export const LIGHTHOUSE_AT = { x: 6, y: 1 };

// local copies of the hot helpers and map codes (cheaper than going through the module bindings in tight loops)
const T = 16;
const vnoise = vnoiseArt, hash = hashPix;
const FOREST = '#', PATH = ':', WATER = '~', TALL = '"', ROCK = 'o', FENCE = '=', RED = 'r', YELLOW = 'y', WHITE = 'w';
const HEX = new Map<string, number>();
/** Colour from "#rrggbb(aa)", cached (the art code calls it inside pixel loops). */
const H = (s: string) => { let c = HEX.get(s); if (c === undefined) HEX.set(s, (c = hex(s))); return c; };
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bayer = (x: number, y: number) => BAYER[(y & 3) * 4 + (x & 3)] / 16 - 0.47;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
/** A colour mixed towards another (t 0..1). */
function mixc(a: number, b: number, t: number): number {
  const ch = (s: number) => Math.round(((a >>> s) & 255) * (1 - t) + ((b >>> s) & 255) * t);
  return ((ch(24) << 24) | (ch(16) << 16) | (ch(8) << 8) | 255) >>> 0;
}
const darker = (c: number, k = 0.82) => mixc(c, 0x101828ff, 1 - k);
const rect = (p: Pix, x: number, y: number, w: number, h: number, c: number) => { for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) p.set(xx, yy, c); };

// ---------------------------------------------------------------- looks

interface Look {
  sand: number[]; grain: [number, number]; wet: [number, number]; line: number;
  sea: number[]; foam: number; shine: number;
  ground: 'sand' | 'meadow' | 'room';
  path: 'sand' | 'paving' | 'planks' | 'gravel' | 'mat';
  edge: 'palms' | 'cliff' | 'room';
  reef?: boolean;
}

const SAND = ['#eccf96', '#f1d8a2', '#f5e0ae', '#f9e8bc'].map(H);
const SEA = ['#94f2e2', '#62dcd6', '#36c2d2', '#24a4d0', '#1f86c6', '#1d68b2', '#1b5098'].map(H);
const LOOKS: Record<string, Look> = {
  coast: { sand: SAND, grain: [H('#d8b67c'), H('#fff4d8')], wet: [H('#d9b67e'), H('#ceaa70')], line: H('#b8925a'), sea: SEA, foam: H('#ffffff'), shine: H('#d4fcff'), ground: 'sand', path: 'sand', edge: 'palms' },
  resort: { sand: SAND, grain: [H('#d8b67c'), H('#fff4d8')], wet: [H('#d9b67e'), H('#ceaa70')], line: H('#b8925a'), sea: SEA, foam: H('#ffffff'), shine: H('#d4fcff'), ground: 'sand', path: 'paving', edge: 'palms' },
  seaside: { sand: SAND, grain: [H('#d8b67c'), H('#fff4d8')], wet: [H('#d9b67e'), H('#ceaa70')], line: H('#b8925a'), sea: SEA, foam: H('#ffffff'), shine: H('#d4fcff'), ground: 'sand', path: 'planks', edge: 'palms' },
  reef: {
    sand: SAND, grain: [H('#d8b67c'), H('#fff4d8')], wet: [H('#d9b67e'), H('#ceaa70')], line: H('#b8925a'),
    sea: ['#a2f4e4', '#72e2d6', '#4ccad4', '#2eaed2', '#2290c8', '#1e70b4', '#1b569c'].map(H), foam: H('#ffffff'), shine: H('#dcfdff'), ground: 'sand', path: 'sand', edge: 'palms', reef: true,
  },
  bay: {
    sand: ['#f2e2c2', '#f6e9cf', '#f9efdb', '#fcf5e6'].map(H), grain: [H('#e0c8a0'), H('#ffffff')], wet: [H('#e6cfa4'), H('#dcc296')], line: H('#c8aa7a'),
    sea: ['#aaf8ea', '#76ecdc', '#44d6d8', '#28b8da', '#2196d0', '#1d74bc', '#1a58a2'].map(H), foam: H('#ffffff'), shine: H('#e4feff'), ground: 'sand', path: 'sand', edge: 'palms', reef: true,
  },
  cliff: { sand: SAND, grain: [H('#d8b67c'), H('#fff4d8')], wet: [H('#c8b088'), H('#b8a078')], line: H('#8a7a60'), sea: SEA, foam: H('#ffffff'), shine: H('#d4fcff'), ground: 'meadow', path: 'gravel', edge: 'cliff' },
  bcroom: { sand: SAND, grain: [0, 0], wet: [0, 0], line: 0, sea: SEA, foam: 0, shine: 0, ground: 'room', path: 'mat', edge: 'room' },
  bchut: { sand: SAND, grain: [0, 0], wet: [0, 0], line: 0, sea: SEA, foam: 0, shine: 0, ground: 'room', path: 'mat', edge: 'room' },
  bcstone: { sand: SAND, grain: [0, 0], wet: [0, 0], line: 0, sea: SEA, foam: 0, shine: 0, ground: 'room', path: 'mat', edge: 'room' },
};

// ---------------------------------------------------------------- the sea field

type At = (x: number, y: number) => string;
const fields = new WeakMap<object, Map<number, number>>();
/** A pier or jetty: boardwalk with the sea round it (drawn over water). */
const pier = (at: At, x: number, y: number) => {
  if (at(x, y) !== PATH) return false;
  let n = 0;
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (at(x + dx, y + dy) === WATER) n++;
  return n >= 3;
};
const wet = (at: At, x: number, y: number) => at(x, y) === WATER || pier(at, x, y);
/** Signed distance (tiles) from a tile's centre to the shore: > 0 in the sea, < 0 on land. */
function dist(at: At, tx: number, ty: number): number {
  let m = fields.get(at);
  if (!m) fields.set(at, (m = new Map()));
  const k = (tx + 1024) * 4096 + (ty + 1024);
  const got = m.get(k);
  if (got !== undefined) return got;
  const w = wet(at, tx, ty);
  const R = w ? 6 : 3;
  let best = R + 0.5;
  for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
    const d = Math.hypot(dx, dy);
    if (d < best && wet(at, tx + dx, ty + dy) !== w) best = d;
  }
  const v = w ? best - 0.5 : 0.5 - best;
  m.set(k, v);
  return v;
}
/**
 * The distance blurred over the neighbouring tiles (so the coast rounds off instead of following the tile steps),
 * but kept on its own side at the tile's centre, so walkable tiles still look like land.
 */
const softs = new WeakMap<object, Map<number, number>>();
function soft(at: At, tx: number, ty: number): number {
  let m = softs.get(at);
  if (!m) softs.set(at, (m = new Map()));
  const k = (tx + 1024) * 4096 + (ty + 1024);
  const got = m.get(k);
  if (got !== undefined) return got;
  let sum = 0;
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) sum += dist(at, tx + i, ty + j) * (i === 0 && j === 0 ? 4 : i === 0 || j === 0 ? 2 : 1);
  const own = dist(at, tx, ty);
  const v = own > 0 ? Math.max(0.28, sum / 16) : Math.min(-0.28, sum / 16);
  m.set(k, v);
  return v;
}

/**
 * Per tile, cached for both frames: the field at each pixel (bilinear between the 3×3 tile centres around it,
 * wobbled near the shore so it isn't ruler-straight) and the land colour under it.
 */
interface TileData { f: Float32Array; land: Uint32Array; far: boolean }
const tileCache = new WeakMap<object, Map<number, TileData>>();
function tileData(L: Look, at: At, tx: number, ty: number): TileData {
  let m = tileCache.get(at);
  if (!m) tileCache.set(at, (m = new Map()));
  const k = (tx + 1024) * 4096 + (ty + 1024);
  const got = m.get(k);
  if (got) return got;
  const D: number[] = [];
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) D.push(soft(at, tx + i, ty + j));
  const far = D.every((v) => v < -2.4);
  const near = D.some((v) => Math.abs(v) < 1.9);
  const f = new Float32Array(T * T), land = new Uint32Array(T * T);
  const landPx = L.ground === 'meadow' ? meadowPx : (wx: number, wy: number) => sandPx(L, wx, wy);
  for (let y = 0; y < T; y++) {
    const v = (y + 0.5) / T - 0.5, j0 = v < 0 ? 0 : 1, fy = v < 0 ? v + 1 : v;
    for (let x = 0; x < T; x++) {
      const u = (x + 0.5) / T - 0.5, i0 = u < 0 ? 0 : 1, fx = u < 0 ? u + 1 : u;
      const a = D[j0 * 3 + i0], b = D[j0 * 3 + i0 + 1], c = D[(j0 + 1) * 3 + i0], d = D[(j0 + 1) * 3 + i0 + 1];
      const wx = tx * T + x, wy = ty * T + y;
      let fv = a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
      if (near) fv += (vnoise(wx, wy, 23, 401) - 0.5) * 0.42 + (vnoise(wx, wy, 7, 403) - 0.5) * 0.16;
      f[y * T + x] = fv;
      if (fv < 0.2) land[y * T + x] = landPx(wx, wy);
    }
  }
  const td = { f, land, far };
  m.set(k, td);
  return td;
}

// ---------------------------------------------------------------- ground

function sandPx(L: Look, wx: number, wy: number): number {
  const n = vnoise(wx, wy, 26, 11) * 0.62 + vnoise(wx, wy, 8, 12) * 0.38;
  let k = n < 0.4 ? 0 : n < 0.53 ? 1 : n < 0.66 ? 2 : 3;
  // wind ripples: faint wavy lines, only in patches
  const r = (wy + Math.sin(wx / 7 + Math.sin(wy / 23) * 2) * 2.4 + 600) % 7;
  if (n > 0.55) { if (r < 1) k = Math.max(0, k - 1); else if (r < 2) k = Math.min(3, k + 1); }
  const g = hash(wx, wy, 15);
  if (g < 0.02) return L.grain[0];
  if (g > 0.988) return L.grain[1];
  return L.sand[k];
}

const MEADOW = ['#7cc254', '#86ca5c', '#90d264', '#9cd96e'].map(H);
function meadowPx(wx: number, wy: number): number {
  const n = vnoise(wx, wy, 20, 21) * 0.65 + vnoise(wx, wy, 6, 22) * 0.35 + (hash(wx, wy, 23) - 0.5) * 0.1;
  return MEADOW[n < 0.38 ? 0 : n < 0.54 ? 1 : n < 0.68 ? 2 : 3];
}
function meadowTufts(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const d = H('#5ea640'), l = H('#b8e88a');
  const n = Math.floor(hash(tx, ty, 61) * 3.2);
  for (let k = 0; k < n; k++) {
    const x = 2 + Math.floor(hash(tx, ty, 70 + k) * 11), y = 3 + Math.floor(hash(tx, ty, 80 + k) * 11);
    p.set(ox + x, oy + y, d); p.set(ox + x + 2, oy + y, d); p.set(ox + x + 1, oy + y + 1, d); p.set(ox + x, oy + y - 1, l); p.set(ox + x + 2, oy + y - 1, l);
  }
}

/** Land or sea at one pixel, with surf, wet sand and waves. Returns the colour. */
function seaOrShore(L: Look, f: number, landC: number, wx: number, wy: number, frame: number): number {
  const swash = frame ? 0.07 : 0;
  if (f <= -swash) {
    // land: wet sand along the waterline, a dark line where the last wave reached
    if (L.ground === 'meadow') {
      // a rocky shore: grey boulders and pebbles, dark and wet where the waves reach
      if (f < -0.55) return landC;
      const r = vnoise(wx, wy, 6, 901) + (-f - 0.55) * -0.8;
      if (r < 0.32) return f < -0.42 ? mixc(landC, H('#8a8a78'), 0.5) : H('#b8ae96');
      const sh = vnoise(wx + 2, wy + 3, 6, 901) - vnoise(wx, wy, 6, 901);
      const k = f > -0.14 ? 0 : sh < -0.03 ? 3 : sh > 0.03 ? 1 : 2;
      return hash(wx, wy, 902) < 0.05 ? ROCKT[4] : ROCKT[k];
    }
    if (f > -0.07 - swash) return L.line;
    if (f > -0.36) return hash(wx, wy, 31) < 0.08 ? L.wet[1] : mixc(L.wet[0], landC, clamp((-f - 0.1) / 0.3, 0, 1) * 0.5);
    return landC;
  }
  // the swash: a thin sheet of foam running up the sand
  if (f <= 0.04) return L.foam;
  if (f < 0.16) return mixc(L.sea[0], L.foam, 0.45);
  const depth = f + bayer(wx, wy) * 0.42;
  const th = [0.42, 0.95, 1.7, 2.6, 3.7, 5.0];
  let i = 0;
  while (i < th.length && depth > th[i]) i++;
  let c = L.sea[i];
  // a broken line of surf further out, rolling in and out between the two frames
  const s = f - (0.62 + frame * 0.14);
  if (Math.abs(s) < 0.05 && vnoise(wx * 2, wy * 2, 13, 410 + frame) > 0.38) return mixc(L.foam, L.sea[0], 0.15);
  if (s > -0.13 && s < -0.05 && vnoise(wx * 2, wy * 2, 13, 410 + frame) > 0.38) c = mixc(c, L.foam, 0.35);
  // waves: short light crests with a darker trough below, drifting sideways
  if (f > 0.9) {
    const cw = 13, ch = 8;
    const gx = Math.floor((wx + 300 + frame * 2) / cw), gy = Math.floor((wy + 300) / ch);
    const lx = (wx + 300 + frame * 2) - gx * cw, ly = (wy + 300) - gy * ch;
    const hx = 1 + Math.floor(hash(gx, gy, 420) * 5), hy = 2 + Math.floor(hash(gx, gy, 421) * 4), len = 3 + Math.floor(hash(gx, gy, 422) * 4);
    if (hash(gx, gy, 423) < 0.7) {
      if (ly === hy && lx >= hx && lx < hx + len) return i <= 2 ? L.shine : mixc(L.sea[Math.max(0, i - 2)], L.shine, 0.35);
      if (ly === hy + 1 && lx > hx && lx < hx + len + 1) return L.sea[Math.min(L.sea.length - 1, i + 1)];
    }
  }
  if (hash(wx >> 1, wy >> 1, 430 + frame) < 0.003 && f > 0.6) return 0xffffffff;
  return c;
}

/** Coral heads (one per tile at most, crisp, tinted a little by the water over them). */
const CORALS: { rows: string[]; pal: [string, string, string, string] }[] = [
  { rows: ['..ooo..', '.obbbo.', 'obabaco', 'oacacao', '.occco.', '..ooo..'], pal: ['#f27a96', '#ffb8cc', '#c04a6a', '#6a2440'] }, // brain coral
  { rows: ['b..b..b', 'a.oa.oa', 'ao.a.a.', '.a.aa..', '..aaa..', '..ccc..'], pal: ['#f6a24e', '#ffd090', '#c06a24', '#6a3412'] }, // staghorn
  { rows: ['.b.b.b.', 'b.bab.b', '.aaaaa.', '..aca..', '...c...'], pal: ['#a77ad8', '#d4b4f6', '#6a3ea0', '#3a1e5a'] }, // sea fan
  { rows: ['b.b..b', 'a.ab.a', 'a.aa.a', 'aacaca', '.cccc.'], pal: ['#f0d45a', '#fff2a0', '#b89420', '#5a4a10'] }, // tube coral
  { rows: ['.o.o.', 'obobo', 'oaaao', '.ccc.'], pal: ['#ff6a5a', '#ffb0a0', '#b83a30', '#5a1a14'] }, // red cup
];
const CORAL_PIX = CORALS.map((k) => {
  const p = new Pix(k.rows[0].length, k.rows.length);
  const c = { a: H(k.pal[0]), b: H(k.pal[1]), c: H(k.pal[2]), o: H(k.pal[3]) } as Record<string, number>;
  k.rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch !== '.') p.set(x, y, c[ch]); }));
  return p;
});
const FISH = [['#ffd24a', '#c89418'], ['#ff7a3a', '#b84a1a'], ['#4ad0ff', '#1e8ab8'], ['#ffffff', '#b8c4d0'], ['#f07ab0', '#b0407a']].map((a) => a.map(H));

/** The reef seen through clear water: coral heads, sea grass on the sandy bottom, little fish. */
function reef(L: Look, td: TileData, p: Pix, ox: number, oy: number, tx: number, ty: number, frame: number) {
  const fAt = (x: number, y: number) => td.f[clamp(y, 0, 15) * T + clamp(x, 0, 15)];
  // sea grass in the shallows
  for (let k = 0; k < 4; k++) {
    const x = 1 + Math.floor(hash(tx, ty, 70 + k) * 14), y = 3 + Math.floor(hash(tx, ty, 75 + k) * 12);
    const f = fAt(x, y);
    if (f < 0.25 || f > 1.2 || hash(tx, ty, 80 + k) < 0.5) continue;
    const g = mixc(H('#3a9a5a'), L.sea[1], 0.3), gl = mixc(H('#7ad07a'), L.sea[1], 0.3);
    for (let i = 0; i < 4; i++) { p.set(ox + x + ((i + frame) % 3 === 0 ? 1 : 0), oy + y - i, i > 2 ? gl : g); p.set(ox + x + 2, oy + y - i + 1, g); }
  }
  // one coral head
  const cx = 2 + Math.floor(hash(tx, ty, 81) * 7), cy = 2 + Math.floor(hash(tx, ty, 82) * 8);
  const fc = fAt(cx + 3, cy + 3);
  if (fc > 0.5 && fc < 2.6 && hash(tx, ty, 83) < 0.72) {
    const spr = CORAL_PIX[Math.floor(hash(tx, ty, 84) * CORAL_PIX.length)];
    const tint = L.sea[Math.min(6, Math.floor(fc * 1.3))], t = clamp(fc / 3.2, 0.08, 0.4);
    for (let y = 0; y < spr.h; y++) for (let x = 0; x < spr.w; x++) {
      const c = spr.get(x, y);
      if (c & 255) p.set(ox + cx + x, oy + cy + y, mixc(c, tint, t));
    }
    // its shadow on the sand below
    for (let x = 1; x < spr.w - 1; x++) p.set(ox + cx + x, oy + cy + spr.h, mixc(p.get(ox + cx + x, oy + cy + spr.h), H('#0a3a5a'), 0.3));
  }
  // fish
  if (hash(tx, ty, 90) < 0.3) {
    const x = 2 + Math.floor(hash(tx, ty, 92) * 8) + frame * 2, y = 3 + Math.floor(hash(tx, ty, 94) * 10);
    if (fAt(x, y) > 0.6 && fAt(x, y) < 2.6) {
      const [col, dk] = FISH[Math.floor(hash(tx, ty, 96) * FISH.length)];
      const flip = hash(tx, ty, 97) < 0.5;
      const at = (dx: number, dy: number, c: number) => p.set(ox + x + (flip ? -dx : dx), oy + y + dy, c);
      at(0, 0, col); at(1, 0, col); at(2, 0, col); at(1, -1, col); at(1, 1, dk); at(3, 0, dk); at(-1, -1, dk); at(-1, 1, dk); at(-1, 0, col); at(2, -1, H('#101820'));
      at(1, 2, H('#0a3a5a40')); at(2, 2, H('#0a3a5a40'));
    }
  }
}

// ---------------------------------------------------------------- paths

/** Is the tile a path (a mask between tile centres gives round, soft path edges)? */
function maskAt(at: At, wx: number, wy: number, is: (c: string) => boolean, seed: number, wob = 0.3): number {
  const u = (wx + 0.5) / T - 0.5, v = (wy + 0.5) / T - 0.5;
  const x0 = Math.floor(u), y0 = Math.floor(v), fx = u - x0, fy = v - y0;
  const g = (x: number, y: number) => (is(at(x, y)) ? 1 : 0);
  const a = g(x0, y0), b = g(x0 + 1, y0), c = g(x0, y0 + 1), d = g(x0 + 1, y0 + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy + (vnoise(wx, wy, 7, seed) - 0.5) * wob;
}

const SANDPATH = ['#f6e4be', '#faecd0', '#fdf4e0', '#d6b47c', '#e2c48e', '#c8a46c'].map(H);
/** A packed, pale sand track with soft edges, a few pebbles and bits of shell. */
function sandPath(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, base: (x: number, y: number) => number) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const m = maskAt(at, wx, wy, (c) => c === PATH, 501, 0.2);
    if (m < 0.5) { const b = base(wx, wy); p.set(ox + x, oy + y, m > 0.42 ? mixc(b, SANDPATH[3], 0.35) : b); continue; }
    if (m < 0.55) { p.set(ox + x, oy + y, SANDPATH[4]); continue; }
    const n = vnoise(wx, wy, 16, 502);
    let c = n < 0.5 ? SANDPATH[0] : SANDPATH[1];
    if (m > 0.85 && n > 0.62) c = SANDPATH[2];
    const g = hash(wx, wy, 504);
    if (g < 0.01) c = SANDPATH[3];
    else if (g < 0.014) c = SANDPATH[5];
    else if (g > 0.996) c = H('#ffffff');
    p.set(ox + x, oy + y, c);
  }
}

/** Shell Bay has no road: the way down to the water is a trail of paw prints in the sand. */
const PAW = ['.o.o.', 'o...o', '.ooo.', '.ooo.'];
function pawTrail(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const horiz = at(tx - 1, ty) === PATH || at(tx + 1, ty) === PATH;
  const c = H('#dcc496'), d = H('#cdb282');
  for (let k = 0; k < 2; k++) {
    const along = 2 + k * 8, side = k % 2 ? 9 : 3;
    const bx = horiz ? along : side, by = horiz ? side + 1 : along;
    PAW.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === 'o') { p.set(ox + bx + x, oy + by + y, y > 1 ? d : c); } }));
  }
}

const GRAVEL = ['#cfc3aa', '#dcd2bc', '#e8e0cc', '#b0a48a', '#9a8e74'].map(H);
function gravelPath(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const m = maskAt(at, wx, wy, (c) => c === PATH, 511, 0.35);
    if (m < 0.48) { p.set(ox + x, oy + y, meadowPx(wx, wy)); continue; }
    if (m < 0.56) { p.set(ox + x, oy + y, H('#6aa848')); continue; }
    const n = vnoise(wx, wy, 6, 512) + (hash(wx, wy, 513) - 0.5) * 0.35;
    let c = n < 0.38 ? GRAVEL[0] : n < 0.66 ? GRAVEL[1] : GRAVEL[2];
    const g = hash(wx, wy, 514);
    if (g < 0.05) c = GRAVEL[3]; else if (g < 0.07) c = GRAVEL[4];
    p.set(ox + x, oy + y, c);
  }
}

/** Resort paving: cream slabs; the promenade along the beach gets a black-and-white wave mosaic and a kerb. */
const SLAB = ['#ece3d2', '#e6dcc8', '#f2ebdc'].map(H);
function paving(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const isP = (c: string) => c === PATH;
  const beachBelow = at(tx, ty + 1) === '.' || at(tx, ty + 1) === RED || at(tx, ty + 1) === YELLOW || at(tx, ty + 1) === WHITE || at(tx, ty + 1) === WATER;
  const promenade = beachBelow || (isP(at(tx, ty + 1)) && (at(tx, ty + 2) === '.' || at(tx, ty + 2) === WATER || at(tx, ty + 2) === YELLOW || at(tx, ty + 2) === RED));
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    let c: number;
    if (promenade) {
      // calçada: little square stones laid in soft waves
      const band = (wy + Math.sin((wx / 32) * Math.PI * 2) * 2.6 + 64) % 12;
      const stone = (wx % 3 === 2 || wy % 3 === 2);
      c = band < 3 ? (stone ? H('#4a6482') : H('#5a7898')) : (stone ? H('#e2dbcc') : H('#f6f2e8'));
    } else {
      // running-bond slabs (16×8) in warm cream tones; a terracotta line every 8 tiles draws a big grid
      const row = Math.floor(wy / 8), sx = Math.floor((wx + (row % 2) * 8) / 16);
      const seam = (wx + (row % 2) * 8) % 16 === 15 || wy % 8 === 7;
      const n = hash(sx, row, 520);
      c = seam ? H('#d4c6ae') : n < 0.3 ? SLAB[1] : n < 0.8 ? SLAB[0] : SLAB[2];
      if (!seam && wy % 8 === 0) c = mixc(c, 0xffffffff, 0.3);
      if (!seam && hash(wx, wy, 521) < 0.03) c = mixc(c, H('#c8b89a'), 0.4);
      const gx = ((wx % 128) + 128) % 128, gy = ((wy % 128) + 128) % 128;
      if (gx < 3 || gy < 3) c = gx === 1 || gy === 1 ? H('#c86a3e') : H('#e08a5a');
    }
    p.set(ox + x, oy + y, c);
  }
  // kerbs where the paving meets sand or water
  const edges: [number, number][] = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  for (const [dx, dy] of edges) {
    const o = at(tx + dx, ty + dy);
    if (isP(o) || o === FOREST || o === ROCK || o === TALL) continue;
    for (let i = 0; i < T; i++) {
      if (dy === 1) { p.set(ox + i, oy + 13, H('#fbf8f2')); p.set(ox + i, oy + 14, H('#d8ccb6')); p.set(ox + i, oy + 15, H('#a8987c')); }
      if (dy === -1) { p.set(ox + i, oy, H('#a8987c')); p.set(ox + i, oy + 1, H('#fbf8f2')); }
      if (dx === 1) { p.set(ox + 14, oy + i, H('#fbf8f2')); p.set(ox + 15, oy + i, H('#a8987c')); }
      if (dx === -1) { p.set(ox, oy + i, H('#a8987c')); p.set(ox + 1, oy + i, H('#fbf8f2')); }
    }
  }
}

/** Boardwalk planks; over the sea a pier on posts. */
const PLANK = ['#c8945c', '#d8a86c', '#b8844e', '#e8c08a'].map(H);
function planks(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, over: boolean) {
  const isP = (x: number, y: number) => at(x, y) === PATH;
  const vert = (isP(tx, ty - 1) || isP(tx, ty + 1)) && !(isP(tx - 1, ty) && isP(tx + 1, ty) && !(isP(tx, ty - 1) && isP(tx, ty + 1)));
  const n = !isP(tx, ty - 1), s = !isP(tx, ty + 1), w = !isP(tx - 1, ty), e = !isP(tx + 1, ty);
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const along = vert ? wy : wx, across = vert ? wx : wy;
    const board = Math.floor(across / 4);
    const gap = across % 4 === 3;
    const joint = (along + board * 11) % 32 === 0;
    let c = gap ? H('#6a4426') : joint ? H('#8a5c34') : PLANK[Math.floor(hash(board, Math.floor((along + board * 11) / 32), 530) * 3)];
    if (!gap && across % 4 === 0) c = mixc(c, PLANK[3], 0.5);
    if (!gap && (along + board * 11) % 32 === 2 && across % 4 === 1) c = H('#5a3a22'); // nail
    p.set(ox + x, oy + y, c);
  }
  // a beam along the open sides
  const beam = H('#7a4e2c'), beamL = H('#a87446'), out = H('#3e2614');
  for (let i = 0; i < T; i++) {
    if (n) { p.set(ox + i, oy, out); p.set(ox + i, oy + 1, beamL); }
    if (s) { p.set(ox + i, oy + 13, beamL); p.set(ox + i, oy + 14, beam); p.set(ox + i, oy + 15, out); }
    if (w) { p.set(ox, oy + i, out); p.set(ox + 1, oy + i, beamL); }
    if (e) { p.set(ox + 14, oy + i, beam); p.set(ox + 15, oy + i, out); }
  }
  if (over && s) for (const x of [2, 12]) { p.set(ox + x, oy + 15, out); p.set(ox + x + 1, oy + 15, out); }
}

/** Under a pier: its shadow and the posts standing in the water, with little rings of foam. */
function underPier(p: Pix, ox: number, oy: number, L: Look, frame: number) {
  for (let y = 0; y < 5; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, H(y < 3 ? '#0e3a6060' : '#0e3a6030'));
  for (const x of [2, 12]) {
    for (let y = 0; y < 6; y++) { p.set(ox + x, oy + y, H('#5a3a22')); p.set(ox + x + 1, oy + y, H('#3e2614')); }
    p.set(ox + x - 1, oy + 6 + frame, L.foam); p.set(ox + x + 2, oy + 6 + frame, L.foam); p.set(ox + x, oy + 7, mixc(L.foam, L.sea[2], 0.4)); p.set(ox + x + 1, oy + 7, mixc(L.foam, L.sea[2], 0.4));
  }
}

// ---------------------------------------------------------------- props on the ground

const STARFISH = (c: string, d: string) => sprite({ o: c, d, l: '#ffd0a0', k: '#7a2a14' }, [
  '...k...',
  '..kok..',
  'kkkolkk',
  'kooolook'.slice(0, 7),
  '.kdoodk',
  '.kdkdk.',
  '.k...k.',
]);
const STAR_R = STARFISH('#f26a44', '#c8442a');
const SCALLOP = sprite({ w: '#fff4ea', p: '#f8c4b4', d: '#d0907c', k: '#8a5444' }, [
  '..kkk..',
  '.kwpwk.',
  'kwpwpwk',
  'kwpwpwk',
  '.kdddk.',
  '..kkk..',
]);
const CONCH = sprite({ w: '#fff0e0', p: '#f4b8a0', d: '#c88a70', k: '#7a4a3a' }, [
  '.kk....',
  'kwwkk..',
  'kwppwk.',
  '.kwwppk',
  '..kddwk',
  '...kkk.',
]);
const SEAPINK = sprite({ p: '#f48ac0', P: '#d85a9a', g: '#5a9a48', G: '#3a7a34', w: '#ffe0f0' }, [
  '.pwp..p.',
  'pPpPpwPp',
  '.pPp.pPp',
  '..g..g..',
  '.gGg.gG.',
  'gGgGgGgG',
]);
const THRIFT = sprite({ p: '#f28ab4', P: '#c85a8a', w: '#ffd8ea', g: '#3e8a3a', G: '#2a6a2c' }, [
  '.wp..pw.',
  'pPPppPPp',
  '.pP..Pp.',
  '..g..g..',
  '.gGggGg.',
]);
const GORSE = sprite({ y: '#ffd83a', Y: '#e0a820', g: '#4a8a3a', G: '#2e6a2a' }, [
  'y.Yy.y..',
  'YgyYgyY.',
  '.gGygGy.',
  'gGgGgGg.',
]);
const DAISY = sprite({ w: '#ffffff', y: '#ffd040', g: '#5aa646', W: '#d8e4ee' }, [
  '.w...w.',
  'wyw.wyw',
  '.W...W.',
  '.g...g.',
]);

function details(p: Pix, ox: number, oy: number, tx: number, ty: number, c: string, L: Look) {
  const jx = Math.floor(hash(tx, ty, 601) * 5), jy = Math.floor(hash(tx, ty, 602) * 5);
  if (L.ground === 'meadow') {
    if (c === RED) { p.blit(THRIFT, ox + 2 + jx, oy + 4 + jy); p.blit(THRIFT, ox + 8, oy + 10 - jy); }
    if (c === YELLOW) { p.blit(GORSE, ox + 2 + jx, oy + 6 + jy); p.blit(GORSE, ox + 7, oy + 2); }
    if (c === WHITE) { p.blit(DAISY, ox + 1 + jx, oy + 3 + jy); p.blit(DAISY, ox + 8, oy + 9); }
    return;
  }
  if (c === RED) p.blit(STAR_R, ox + 4 + jx, oy + 4 + jy);
  if (c === YELLOW) { p.blit(SCALLOP, ox + 2 + jx, oy + 3 + jy); p.blit(CONCH, ox + 9, oy + 9 - jy); }
  if (c === WHITE) { p.blit(SEAPINK, ox + 1 + jx, oy + 4 + jy); p.blit(SEAPINK, ox + 8, oy + 9); }
}

const SANDROCK = (() => {
  const p = new Pix(16, 16);
  shadowEllipse(p, 8, 13, 7, 2, H('#7a5a3a50'));
  const L = new Pix(16, 16);
  const tones = ['#7a7468', '#948e80', '#b0a898', '#ccc4b2'].map(H);
  canopy(L, 0, 0, 16, 15, [{ x: 7, y: 9, r: 5.5 }, { x: 10.5, y: 10.5, r: 4.2, z: 1 }, { x: 4.5, y: 11, r: 3.5, z: 1 }], tones, H('#3a3630'), 603);
  // barnacles and a strand of seaweed at the foot
  for (const [x, y] of [[5, 8], [8, 7], [11, 10], [6, 11]]) L.set(x, y, H('#e8e4da'));
  for (const [x, y] of [[3, 13], [4, 12], [12, 13], [13, 12]]) L.set(x, y, H('#4a7a3a'));
  p.blit(L, 0, 0);
  return p;
})();
const BOULDER = (() => {
  const p = new Pix(16, 16);
  shadowEllipse(p, 8, 13, 7, 2, H('#1c3a1a50'));
  const L = new Pix(16, 16);
  canopy(L, 0, 0, 16, 15, [{ x: 8, y: 9, r: 6 }, { x: 4.5, y: 11, r: 3.5, z: 1 }, { x: 11.5, y: 11, r: 3.5, z: 1 }], ['#6a707c', '#868c98', '#a2a8b2', '#c4c8d0'].map(H), H('#33363e'), 604);
  for (const [x, y] of [[6, 6], [7, 6], [9, 8], [5, 9]]) L.set(x, y, H('#c8d06a')); // lichen
  p.blit(L, 0, 0);
  return p;
})();
const PLANTER = (() => {
  const p = new Pix(16, 24);
  shadowEllipse(p, 8, 22, 6, 1, H('#2a2a2a44'));
  // a terracotta pot with an agave
  poly(p, [[3, 14], [13, 14], [12, 22], [4, 22]], (x) => (x < 6 ? H('#e08a5a') : x < 10 ? H('#c86a3e') : H('#a8542e')));
  for (let x = 2; x < 14; x++) { p.set(x, 13, H('#e8946a')); p.set(x, 14, H('#a8542e')); }
  for (let y = 13; y < 23; y++) { p.set(2 + (y > 14 ? 1 : 0) + (y > 18 ? 1 : 0), y, H('#5a2a14')); p.set(13 - (y > 14 ? 1 : 0) - (y > 18 ? 1 : 0), y, H('#5a2a14')); }
  for (let x = 4; x < 13; x++) p.set(x, 23, H('#5a2a14'));
  const g = ['#3e7a5a', '#5a9a72', '#86c09a'].map(H);
  const leaf = (x0: number, y0: number, x1: number, y1: number) => { line(p, x0, y0, x1, y1, g[1]); line(p, x0 + 1, y0, x1 + 1, y1, g[0]); p.set(x1, y1 - 1, g[2]); };
  leaf(8, 13, 8, 1); leaf(7, 13, 3, 4); leaf(9, 13, 13, 4); leaf(7, 13, 1, 9); leaf(9, 13, 15, 9); leaf(8, 13, 5, 2); leaf(8, 13, 11, 2);
  return p;
})();

/** Rope fence: wooden posts with a sagging rope. */
function ropeFence(p: Pix, ox: number, oy: number, left: boolean, right: boolean) {
  const post = [H('#5a3a22'), H('#8a5c34'), H('#b07a48')];
  for (let y = 4; y < 15; y++) { p.set(ox + 6, oy + y, H('#2e1c10')); p.set(ox + 7, oy + y, post[2]); p.set(ox + 8, oy + y, post[1]); p.set(ox + 9, oy + y, H('#2e1c10')); }
  for (let x = 6; x < 10; x++) { p.set(ox + x, oy + 3, H('#2e1c10')); p.set(ox + x, oy + 15, H('#7a5a3a60')); }
  const rope = H('#e8d8b0'), ropeD = H('#a89068');
  const sag = (x: number) => 6 + Math.round(Math.sin((x / 16) * Math.PI) * 2);
  for (let x = 0; x < 16; x++) {
    if ((x < 6 && !left) || (x > 9 && !right)) continue;
    if (x >= 6 && x <= 9) continue;
    const y = x < 6 ? sag(x + 10) : sag(x - 6);
    p.set(ox + x, oy + y, rope); p.set(ox + x, oy + y + 1, ropeD);
  }
}

// ---------------------------------------------------------------- cliffs and rooms

const ROCKT = ['#5e6470', '#747a86', '#8e949e', '#aab0b8', '#c6cad0'].map(H);
/**
 * Rooms: a lit room in darkness. The two wall rows above the floor are the back wall (upper wall and a wainscot,
 * windows with a sea view and curtains); walls beside the floor show their edge; everything else is dark. Rugs are
 * the detail codes on the floor ('r' red, 'y' woven straw, 'w' blue), walkable, with a border.
 */
const DARK = H('#120d0b');
const isFloor = (c: string) => c !== FOREST && c !== PATH;
function roomTile(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, kind = 'bcroom') {
  // the doormat's path runs on past the map's edge: out there it's dark
  const c = at(tx, ty) === PATH && at(tx, ty - 1) === PATH ? FOREST : at(tx, ty);
  if (c === FOREST) {
    const lower = isFloor(at(tx, ty + 1));
    const upper = !lower && at(tx, ty + 1) === FOREST && isFloor(at(tx, ty + 2));
    if (lower || upper) { backWall(p, ox, oy, tx, ty, at, kind, upper); return; }
    p.fill(ox, oy, T, T, DARK);
    // the edges of the side walls and of the front wall, lit from the room
    const trim = kind === 'bcstone' ? [H('#8a8a92'), H('#c8c8d0')] : kind === 'bchut' ? [H('#6a4a1e'), H('#c8a060')] : [H('#1e4a8a'), H('#f4f0e8')];
    const fl = (dx: number, dy: number) => isFloor(at(tx + dx, ty + dy)) || (at(tx + dx, ty + dy) === FOREST && isFloor(at(tx + dx, ty + dy + 1)) && dy === 0) || (dy === 0 && at(tx + dx, ty + dy) === FOREST && at(tx + dx, ty + 1) === FOREST && isFloor(at(tx + dx, ty + 2)));
    if (fl(1, 0)) for (let y = 0; y < T; y++) { p.set(ox + 13, oy + y, trim[0]); p.set(ox + 14, oy + y, trim[1]); p.set(ox + 15, oy + y, trim[0]); }
    if (fl(-1, 0)) for (let y = 0; y < T; y++) { p.set(ox, oy + y, trim[0]); p.set(ox + 1, oy + y, trim[1]); p.set(ox + 2, oy + y, trim[0]); }
    if (isFloor(at(tx, ty - 1))) for (let x = 0; x < T; x++) { p.set(ox + x, oy, trim[1]); p.set(ox + x, oy + 1, trim[0]); }
    return;
  }
  if (c === PATH) {
    // the open doorway: daylight on the step outside, a round rope mat on it
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, y < 2 ? H('#c8a468') : H('#f6e4be'));
    for (let y = 0; y < T; y++) { p.set(ox, oy + y, H('#3a2618')); p.set(ox + 15, oy + y, H('#3a2618')); }
    for (let y = 2; y < 14; y++) for (let x = 1; x < 15; x++) {
      const d = Math.hypot((x - 7.5) / 7, (y - 7.5) / 6);
      if (d > 1) continue;
      p.set(ox + x, oy + y, d > 0.86 ? H('#8a6a3a') : Math.floor(d * 8) % 2 ? H('#d8b87a') : H('#c8a468'));
    }
    return;
  }
  if (kind === 'bchut') hutFloor(p, ox, oy, tx, ty);
  else if (kind === 'bcstone') stoneFloor(p, ox, oy, tx, ty);
  else {
    // terracotta floor tiles, 8 px, each a little different
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const wx = tx * T + x, wy = ty * T + y;
      const sx = Math.floor(wx / 8), sy = Math.floor(wy / 8);
      const grout = wx % 8 === 7 || wy % 8 === 7;
      const tone = [H('#d8875a'), H('#cf7c50'), H('#e09468')][Math.floor(hash(sx, sy, 810) * 3)];
      let col = grout ? H('#a8603c') : tone;
      if (!grout && (wx % 8 === 0 || wy % 8 === 0)) col = mixc(tone, 0xffe8c8ff, 0.3);
      p.set(ox + x, oy + y, col);
    }
  }
  if (c === RED || c === YELLOW || c === WHITE) rug(p, ox, oy, tx, ty, at, c);
  // shadows: under the back wall and along the side walls
  if (at(tx, ty - 1) === FOREST) for (let y = 0; y < 4; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, ((0x1a0a00 << 8) | (y < 2 ? 0x50 : 0x28)) >>> 0);
  if (at(tx - 1, ty) === FOREST) for (let y = 0; y < T; y++) for (let x = 0; x < 3; x++) p.set(ox + x, oy + y, ((0x1a0a00 << 8) | (x < 1 ? 0x48 : 0x22)) >>> 0);
  if (at(tx + 1, ty) === FOREST) for (let y = 0; y < T; y++) for (let x = 13; x < T; x++) p.set(ox + x, oy + y, ((0x1a0a00 << 8) | (x > 14 ? 0x48 : 0x22)) >>> 0);
}

/** A rug over several tiles: a border where it ends, a pattern inside. */
function rug(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, c: string) {
  const same = (dx: number, dy: number) => at(tx + dx, ty + dy) === c;
  const pal = c === RED ? ['#a8302a', '#d84a3a', '#f4c86a', '#7a1e1a'] : c === YELLOW ? ['#b89048', '#dcbc78', '#f4e0a8', '#8a6a30'] : ['#1e4a8a', '#3a78c8', '#f4f0e8', '#14305a'];
  const [base, mid, light, dark] = pal.map(H);
  const x0 = same(-1, 0) ? 0 : 2, x1 = same(1, 0) ? 16 : 14, y0 = same(0, -1) ? 0 : 2, y1 = same(0, 1) ? 16 : 14;
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
    const edge = (!same(-1, 0) && x < 4) || (!same(1, 0) && x > 11) || (!same(0, -1) && y < 4) || (!same(0, 1) && y > 11);
    const rim = (!same(-1, 0) && x === 2) || (!same(1, 0) && x === 13) || (!same(0, -1) && y === 2) || (!same(0, 1) && y === 13);
    const wx = tx * T + x, wy = ty * T + y;
    let col = rim ? dark : edge ? ((wx + wy) % 4 < 2 ? light : mid) : (Math.abs(((wx % 12) - 6)) + Math.abs(((wy % 12) - 6)) < 3 ? light : (wx + wy) % 12 === 0 ? mid : base);
    if (c === YELLOW && !rim && !edge) col = (wy % 3 === 0) ? dark : (wx + Math.floor(wy / 3)) % 4 < 2 ? base : mid;
    p.set(ox + x, oy + y, col);
  }
  // fringe at the open ends
  if (!same(-1, 0)) for (let y = y0; y < y1; y += 2) p.set(ox + x0 - 1, oy + y, light);
  if (!same(1, 0)) for (let y = y0; y < y1; y += 2) p.set(ox + x1, oy + y, light);
}

/**
 * The back wall, two tiles tall (`upper` is its top tile): plaster or rattan or whitewashed stone, a wainscot below,
 * and every few tiles a window with the sea outside and curtains.
 */
function backWall(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, kind: string, upper: boolean) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, Y = (upper ? 0 : T) + y; // 0..31 down the whole wall
    let col: number;
    if (kind === 'bchut') {
      if (Y < 4) col = (wx + Y) % 3 === 0 ? H('#8a6a2a') : Y === 3 ? H('#6a4a1e') : H('#d0ac52'); // straw fringe of the roof
      else if (wx % 32 < 3) col = wx % 32 === 0 ? H('#5a3a14') : wx % 32 === 1 ? H('#e8cc8a') : H('#b8904a'); // bamboo posts
      else if (Y < 20) { const weave = ((Math.floor(wx / 3) + Math.floor(Y / 3)) % 2) === 0; col = weave ? (Y % 3 === 0 ? H('#c8a060') : H('#dcb878')) : (wx % 3 === 0 ? H('#b08848') : H('#c89c5c')); }
      else if (Y === 20) col = H('#e8c08a');
      else col = Y > 29 ? H('#3a2410') : (wx % 8 === 0 ? H('#6a4422') : (Y < 24 ? H('#a8763e') : H('#9a6a36')));
    } else if (kind === 'bcstone') {
      if (Y < 3) col = Y === 0 ? H('#2a2a32') : H('#a8a8b0');
      else if (Y < 24) { const row = Math.floor(Y / 6), brick = (wx + (row % 2) * 8) % 16 === 0 || Y % 6 === 0; col = brick ? H('#d8d4cc') : hash(Math.floor((wx + (row % 2) * 8) / 16), row + ty * 9, 830) < 0.3 ? H('#f0ece4') : H('#faf8f2'); }
      else col = Y > 29 ? H('#4a4a52') : Y === 24 ? H('#5a5a62') : (wx % 12 === 0 ? H('#7a7a82') : H('#8e8e98'));
    } else {
      if (Y < 4) col = Y === 0 ? H('#3a2618') : Y < 3 ? H('#8a6040') : H('#f4ecdc'); // a wooden beam and cornice
      else if (Y < 15) col = hash(wx, Y + ty * 32, 801) < 0.04 ? H('#ece6da') : H('#faf6ee');
      else if (Y === 15) col = H('#1e4a8a');
      else if (Y < 30) { const lx = wx % 6, ly = (Y - 16) % 6; col = lx === 5 || ly === 5 ? H('#c8d6ea') : (lx + ly) % 4 === 0 || (lx === 2 && ly === 2) ? H('#2a5aa8') : H('#f4f8ff'); }
      else col = H('#1e4a8a');
    }
    p.set(ox + x, oy + y, col);
  }
  // a window: two tiles tall, the sea and sky outside, curtains drawn aside
  const period = kind === 'bcstone' ? 3 : 4;
  if (((tx % period) + period) % period === 2 && isFloor(at(tx, ty + (upper ? 2 : 1)))) {
    for (let y = 0; y < T; y++) for (let x = 2; x < 14; x++) {
      const Y = (upper ? 0 : T) + y;
      if (Y < 7 || Y > 24) continue;
      const arch = kind !== 'bcstone' || Y > 11 || Math.hypot(x + 0.5 - 8, Y - 11) < 6;
      if (!arch) continue;
      const edge = x === 2 || x === 13 || Y === 7 || Y === 24 || (kind === 'bcstone' && Y <= 11 && Math.hypot(x + 0.5 - 8, Y - 11) > 5);
      const frame = kind === 'bchut' ? H('#4a2e14') : kind === 'bcstone' ? H('#6a6a72') : H('#1e4a8a');
      let col = edge ? frame : Y < 15 ? (Y < 10 ? H('#8ad4ff') : H('#b8ecff')) : Y === 15 ? H('#ffffff') : Y < 19 ? H('#36b4d8') : H('#2496c8');
      if (!edge && (x === 7 || x === 8) && kind !== 'bcstone') col = frame;
      if (!edge && Y === 12 && x > 9 && x < 12) col = H('#ffffff'); // a cloud
      p.set(ox + x, oy + y, col);
      if (Y === 24) { p.set(ox + x, oy + y, H('#fbf8f2')); }
    }
    // curtains
    if (kind !== 'bcstone') {
      const cur = kind === 'bchut' ? [H('#2e8a6a'), H('#5ab894')] : [H('#d83a30'), H('#f4f0e8')];
      for (let y = 0; y < T; y++) {
        const Y = (upper ? 0 : T) + y;
        if (Y < 6 || Y > 25) continue;
        const w = Y < 14 ? 2 : 3;
        for (let k = 0; k < w; k++) { p.set(ox + 1 + k, oy + y, (Y + k) % 3 ? cur[0] : cur[1]); p.set(ox + 14 - k, oy + y, (Y + k) % 3 ? cur[0] : cur[1]); }
      }
      if (upper) for (let x = 0; x < T; x++) p.set(ox + x, oy + 5, H('#6a4a2a'));
    }
  }
}

function hutFloor(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  // broad wooden planks, a little sand blown in
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const row = Math.floor(wy / 5), gap = wy % 5 === 4, joint = (wx + row * 13) % 40 === 0;
    let c = gap || joint ? H('#6a4422') : [H('#b8844e'), H('#c8945c'), H('#a8763e')][Math.floor(hash(Math.floor((wx + row * 13) / 40), row, 820) * 3)];
    if (!gap && wy % 5 === 0) c = mixc(c, H('#e8c08a'), 0.4);
    if (hash(wx, wy, 821) < 0.008) c = H('#f0d8a8');
    p.set(ox + x, oy + y, c);
  }
}
/** The lighthouse floor: calm square stone flags laid in offset rows. */
function stoneFloor(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const row = Math.floor(wy / 12), lx = (wx + (row % 2) * 8) % 16, ly = wy % 12;
    const tone = [H('#b4b2ac'), H('#bebcb6'), H('#aaa8a2')][Math.floor(hash(Math.floor((wx + (row % 2) * 8) / 16), row, 840) * 3)];
    let c = lx === 15 || ly === 11 ? H('#8a8882') : tone;
    if (lx === 0 || ly === 0) c = mixc(tone, 0xffffffff, 0.25);
    p.set(ox + x, oy + y, c);
  }
}

// ---------------------------------------------------------------- the lighthouse beam

/** The lantern's centre in world pixels (the lighthouse sprite is 48×128, its lantern 18 px below the top). */
const lantern = () => ({ x: LIGHTHOUSE_AT.x * T + 24, y: (LIGHTHOUSE_AT.y + 3) * T - 128 + 22 });
function beam(p: Pix, ox: number, oy: number, tx: number, ty: number, frame: number) {
  const { x: lx, y: ly } = lantern();
  if (Math.abs(tx * T + 8 - lx) > 120 || Math.abs(ty * T + 8 - ly) > 60) return;
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const dx = tx * T + x - lx, dy = ty * T + y - ly;
    const d = Math.hypot(dx, dy);
    if (d < 4 || d > 110) continue;
    // frame 0: beams to the left and right; frame 1: turned towards the viewer (a soft glow only)
    let a = 0;
    if (frame === 0) {
      const ang = Math.abs(Math.atan2(dy, Math.abs(dx)) + 0.06);
      const width = 0.05 + 6 / (d + 20);
      if (ang < width) a = (1 - d / 110) * (ang < width * 0.5 ? 0.5 : 0.28);
    } else if (d < 16) a = (1 - d / 16) * 0.45;
    if (d < 9) a = Math.max(a, (1 - d / 9) * 0.55);
    if (a > 0.02) p.set(ox + x, oy + y, ((0xfff4b0 << 8) | Math.round(a * 255)) >>> 0);
  }
}

// ---------------------------------------------------------------- the terrain hook

const coastTerrain = (name: string): TerrainHook => (p, ox, oy, tx, ty, at, frame) => {
  const L = LOOKS[name];
  const c = at(tx, ty);
  if (L.ground === 'room') { roomTile(p, ox, oy, tx, ty, at, name); return true; }
  const td = tileData(L, at, tx, ty);
  // everything gets the sea-and-shore treatment near water; far from it, plain ground
  const ground = (wx: number, wy: number) => {
    const i = (wy - ty * T) * T + (wx - tx * T);
    return td.far ? td.land[i] : seaOrShore(L, td.f[i], td.land[i], wx, wy, frame);
  };
  if (c === WATER || pier(at, tx, ty)) {
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, ground(tx * T + x, ty * T + y));
    if (L.reef && c === WATER) reef(L, td, p, ox, oy, tx, ty, frame);
    if (c === PATH) planks(p, ox, oy, tx, ty, at, true);
    else if (pier(at, tx, ty - 1)) underPier(p, ox, oy, L, frame);
    if (name === 'cliff') beam(p, ox, oy, tx, ty, frame);
    return true;
  }
  if (c === PATH) {
    if (L.path === 'paving') paving(p, ox, oy, tx, ty, at);
    else if (L.path === 'planks') { for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, ground(tx * T + x, ty * T + y)); planks(p, ox, oy, tx, ty, at, false); }
    else if (L.path === 'gravel') gravelPath(p, ox, oy, tx, ty, at);
    else if (name === 'bay') { for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, ground(tx * T + x, ty * T + y)); pawTrail(p, ox, oy, tx, ty, at); }
    else sandPath(p, ox, oy, tx, ty, at, ground);
    if (name === 'cliff') beam(p, ox, oy, tx, ty, frame);
    return true;
  }
  // the ground
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, ground(tx * T + x, ty * T + y));
  if (L.ground === 'meadow' && c !== FOREST) meadowTufts(p, ox, oy, tx, ty);
  // a soft shadow on the sand below the paving's kerb
  if (L.path === 'paving' && c !== FOREST && at(tx, ty - 1) === PATH) for (let x = 0; x < T; x++) { p.set(ox + x, oy, H('#7a5a3a50')); p.set(ox + x, oy + 1, H('#7a5a3a28')); }
  if (c === FOREST && L.ground === 'meadow') {
    // under the pines: shade and needles
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) { const h = hash(tx * T + x, ty * T + y, 620); if (h < 0.55) p.set(ox + x, oy + y, H('#1c3a1a38')); else if (h > 0.97) p.set(ox + x, oy + y, H('#a87a48')); }
  } else if (c === FOREST) {
    // under the palms: shade and dry fronds on the sand
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) if (hash(tx * T + x, ty * T + y, 620) < 0.5) p.set(ox + x, oy + y, H('#6a4a2a22'));
    if (hash(tx, ty, 621) < 0.4) { const x = 3 + Math.floor(hash(tx, ty, 622) * 8), y = 4 + Math.floor(hash(tx, ty, 623) * 8); line(p, ox + x, oy + y, ox + x + 5, oy + y + 2, H('#b8a060')); line(p, ox + x + 1, oy + y + 1, ox + x + 4, oy + y + 3, H('#8a7440')); }
  } else if (c === TALL) {
    if (L.ground === 'meadow') tallGrass(p, ox, oy, tx, ty, (dx, dy) => at(tx + dx, ty + dy) === TALL);
    else if (L.path === 'paving') flowerbed(p, ox, oy, tx, ty, at);
    else duneGrass(p, ox, oy, tx, ty, at);
  } else if (c === ROCK) p.blit(L.path === 'paving' ? PLANTER : L.ground === 'meadow' ? BOULDER : SANDROCK, ox, L.path === 'paving' ? oy - 8 : oy);
  else if (c === FENCE) ropeFence(p, ox, oy, at(tx - 1, ty) === FENCE, at(tx + 1, ty) === FENCE);
  else if (c === RED || c === YELLOW || c === WHITE) details(p, ox, oy, tx, ty, c, L);
  if (name === 'cliff') beam(p, ox, oy, tx, ty, frame);
  return true;
};

/** Marram grass on little dunes: yellow-green blades in clumps, the sand mounded under them. */
const MARRAM = ['#4e7a34', '#6a9640', '#8cb454', '#b4d47a', '#dcecaa'].map(H);
function duneGrass(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const same = (dx: number, dy: number) => at(tx + dx, ty + dy) === TALL;
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const m = maskAt(at, wx, wy, (c) => c === TALL, 631, 0.4);
    if (m > 0.5) p.set(ox + x, oy + y, mixc(p.get(ox + x, oy + y), H('#c8a468'), clamp((m - 0.5) * 0.9, 0, 0.35)));
  }
  for (const [row, base] of [[0, 8], [1, 15]] as const) {
    for (let k = 0; k < 3; k++) {
      if (!same(0, row ? 1 : -1) && hash(tx + k, ty, 640 + row) < 0.3) continue;
      const cx = 2 + k * 5 + Math.floor(hash(tx * 3 + k, ty * 2 + row, 641) * 3);
      const by = base - Math.floor(hash(tx + k, ty + row, 642) * 2);
      const h = 6 + Math.floor(hash(tx * 5 + k, ty + row, 643) * 4);
      for (const [lean, len] of [[-3, h - 2], [-1, h], [1, h - 1], [3, h - 3]] as const) {
        for (let i = 0; i < len; i++) {
          const t = i / (len - 1);
          const bx = cx + Math.round(lean * t * t);
          p.set(ox + bx, oy + by - i, MARRAM[Math.min(4, Math.floor(t * 4.99))]);
          if (i < 2) p.set(ox + bx + 1, oy + by - i, MARRAM[0]);
        }
      }
    }
  }
}

/** Bougainvillea and lavender beds along the resort's paving. */
function flowerbed(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const same = (dx: number, dy: number) => at(tx + dx, ty + dy) === TALL;
  const leaf = ['#2a6a34', '#3a8a40', '#58a852'].map(H);
  const flower = (tx + ty) % 3 === 0 ? ['#a060d0', '#c890f0', '#7040a0'] : ['#e8388a', '#ff7ab8', '#b0206a'];
  const fl = flower.map(H);
  // a low stone border
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const bx = !same(-1, 0) && x < 2, ex = !same(1, 0) && x > 13, by = !same(0, -1) && y < 2, ey = !same(0, 1) && y > 12;
    if (bx || ex || by || ey) p.set(ox + x, oy + y, (y > 12 && ey) ? (y === 15 ? H('#a8987c') : H('#e8dfcc')) : H('#f4eee0'));
    else p.set(ox + x, oy + y, H('#6a4a2e'));
  }
  const L = new Pix(16, 16);
  const blobs = [{ x: 4, y: 6, r: 4.5 }, { x: 11, y: 6, r: 4.5 }, { x: 7.5, y: 10, r: 5, z: 1 }];
  canopy(L, 0, 0, 16, 15, blobs, leaf.concat(leaf[2]), H('#1e4a24'), 650 + tx * 7 + ty);
  for (let k = 0; k < 14; k++) {
    const x = 2 + Math.floor(hash(tx, ty * 3 + k, 651) * 12), y = 2 + Math.floor(hash(tx * 2 + k, ty, 652) * 10);
    if (!(L.get(x, y) & 255)) continue;
    L.set(x, y, fl[0]); L.set(x + 1, y, fl[2]); L.set(x, y - 1, fl[1]);
  }
  p.blit(L, ox, oy);
}

// ---------------------------------------------------------------- palms

/**
 * Coconut palms, 32×50: a curved, ringed trunk lit from the left and a crown of drooping fronds (each a spine with
 * hanging leaflets), the back fronds darker, coconuts under the crown.
 */
function palm(v: number, scale = 1): Pix {
  const W = 32, Hh = 50;
  const p = new Pix(W, Hh);
  shadowEllipse(p, 16, Hh - 3, 10, 2, H('#6a4a2a44'));
  const L = new Pix(W, Hh);
  const bend = v === 1 ? 1 : v === 2 ? -0.5 : -1;
  const base = Hh - 3, top = 15;
  const cx = (y: number) => 16 + bend * Math.pow((base - y) / (base - top), 1.8) * 6;
  const bark = ['#5e3e22', '#86603a', '#a8804e', '#c8a06a', '#e0c08a'].map(H);
  for (let y = top; y <= base; y++) {
    const c0 = cx(y);
    const hw = 2.2 + ((y - top) / (base - top)) * 0.9 + (base - y < 3 ? (3 - (base - y)) * 0.6 : 0);
    const l = Math.round(c0 - hw), r = Math.round(c0 + hw);
    const seg = (y - top) % 4;
    for (let x = l; x <= r; x++) {
      const t = (x - l) / Math.max(1, r - l);
      let k = t < 0.25 ? 3 : t < 0.55 ? 2 : t < 0.8 ? 1 : 0;
      if (seg === 0) k = Math.max(0, k - 1); // the ring between segments
      if (seg === 1 && t < 0.4) k = 4; // the lit rim of the segment above
      L.set(x, y, bark[k]);
    }
  }
  const crownX = Math.round(cx(top)), crownY = top - 1;
  // fronds: [angle (0 = right, pointing up negative), length, droop, layer]
  const fr: [number, number, number, number][] = [
    [-2.6, 11, 3, 0], [-0.55, 11, 3, 0], [-1.6, 9, 1, 0],
    [-3.05, 14, 8, 1], [0.05, 14, 8, 1], [-2.15, 12, 5, 1], [-1.0, 12, 5, 1],
    [2.5, 11, 6, 2], [0.65, 11, 6, 2], [1.55, 7, 5, 2],
  ];
  const greens = [['#1a5a30', '#24703a', '#358a44', '#4aa24e'], ['#21683a', '#2e8442', '#46a24c', '#68c05a'], ['#287a3e', '#3a9a46', '#5cba54', '#8cd870']].map((a) => a.map(H));
  const rot = v * 0.21;
  for (const [a0, len0, droop, layer] of fr) {
    const a = a0 + rot * (layer === 1 ? 1 : -0.6), len = len0 * scale;
    const g = greens[layer];
    const dx = Math.cos(a), dy = Math.sin(a);
    const steps = Math.round(len * 1.6);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const sx = crownX + dx * len * t, sy = crownY + dy * len * t * 0.75 + droop * t * t;
      // leaflets hanging from the spine on both sides
      const ll = Math.sin(Math.PI * Math.min(1, t * 1.15)) * 4.2 + 0.8;
      for (const side of [-1, 1]) {
        const nx = -dy * side, ny = dx * side;
        const hx = nx * 0.55, hy = ny * 0.55 + 0.75; // hang down
        const n = Math.hypot(hx, hy);
        for (let j = 1; j <= ll; j++) {
          const px = Math.round(sx + (hx / n) * j), py = Math.round(sy + (hy / n) * j);
          const lit = (hy / n) < 0.6 && side * dx < 0 ? 1 : 0;
          L.set(px, py, g[j > ll - 1.5 ? 0 : 1 + lit]);
        }
      }
      L.set(Math.round(sx), Math.round(sy), g[3]);
      L.set(Math.round(sx), Math.round(sy) - 1, g[2]);
    }
  }
  // coconuts
  for (const [x, y] of [[-2, 2], [1, 3], [-1, 4]]) {
    L.set(crownX + x, crownY + y, H('#5a3a1a')); L.set(crownX + x + 1, crownY + y, H('#7a5228')); L.set(crownX + x, crownY + y + 1, H('#3e2610')); L.set(crownX + x + 1, crownY + y + 1, H('#5a3a1a'));
  }
  outlined(p, L, 0, 0, H('#10301a'));
  // the trunk's outline is brown, not green
  for (let y = top + 6; y <= base; y++) for (let x = 0; x < W; x++) if (p.get(x, y) === H('#10301a') && !(L.get(x, y) & 255) && y > top + 8) p.set(x, y, H('#3a2412'));
  return p;
}
const PALMS = [palm(0), palm(1)];
const PALM_TALL = palm(2, 1.1);

/** Stone pines on the headland: a tall, leaning orange-brown trunk under a flat umbrella crown. */
function stonePine(v: number): Pix {
  const p = new Pix(32, 48);
  shadowEllipse(p, 16, 45, 12, 2, H('#1c3a1a55'));
  const lean = v ? 3 : -3;
  const L = new Pix(32, 48);
  const bark = ['#4a2a18', '#7a4a2a', '#a8663a', '#c88a52'].map(H);
  for (let y = 12; y <= 45; y++) {
    const c0 = 16 + lean * ((45 - y) / 33) ** 1.5, hw = 1.8 + (y > 41 ? (y - 41) * 0.5 : 0);
    for (let x = Math.round(c0 - hw); x <= Math.round(c0 + hw); x++) {
      const t = (x - (c0 - hw)) / (2 * hw);
      L.set(x, y, bark[(y * 3 + x) % 7 === 0 ? 0 : t < 0.3 ? 3 : t < 0.7 ? 2 : 1]);
    }
  }
  // a fork into two limbs under the crown
  line(L, 16 + lean, 14, 16 + lean - 6, 9, bark[1]); line(L, 16 + lean, 14, 16 + lean + 6, 9, bark[1]);
  const cx = 16 + lean;
  canopy(L, 0, 0, 32, 22, [
    { x: cx - 8, y: 10, r: 6 }, { x: cx + 8, y: 10, r: 6 }, { x: cx, y: 8, r: 7, z: 1 }, { x: cx - 4, y: 12, r: 5, z: 2 }, { x: cx + 5, y: 12, r: 5, z: 2 },
  ].map((b) => ({ ...b, x: clamp(b.x, 6, 26) })), ['#1e4a2a', '#2c6434', '#3e8040', '#5c9e4e'].map(H), H('#0e2a16'), 950 + v);
  outlined(p, L, 0, 0, H('#0e2a16'));
  return p;
}
const PINES = [stonePine(0), stonePine(1)];

// ---------------------------------------------------------------- themes

const PAL_SAND = {
  ground: ['#eccf96', '#f1d8a2', '#f5e0ae', '#f9e8bc'], grassDark: '#d4b27a', grassLight: '#fff2cc',
  path: '#c8945c', pathDark: '#8a5c34', pathLight: '#e8c08a', pathEdge: '#5a3a22',
  water: '#24a4d0', waterDeep: '#1f86c6', waterLight: '#94f2e2', waterEdge: '#1a5e94', foam: '#ffffff', shadow: '#6a4a2a40',
};
const tileThings = (name: string) => (code: string): string | undefined => {
  const L = LOOKS[name];
  if (L.ground === 'room') return code === FOREST ? 'wall' : code === PATH ? 'mat' : code === RED || code === YELLOW || code === WHITE ? 'bc_rug' : 'floor';
  if (code === WATER) return 'sea';
  if (code === PATH) return L.path === 'paving' ? 'pavement' : L.path === 'planks' ? 'boardwalk' : 'path';
  if (code === FOREST) return L.edge === 'cliff' ? 'pine' : 'palm';
  if (code === TALL) return L.ground === 'meadow' ? 'tallgrass' : L.path === 'paving' ? 'flowerbed' : 'tallgrass';
  if (code === ROCK) return L.path === 'paving' ? 'planter' : 'stone';
  if (code === RED || code === YELLOW || code === WHITE) return L.ground === 'meadow' ? 'flower' : code === RED ? 'starfish' : code === YELLOW ? 'shell' : 'flower';
  if (code === FENCE) return 'fence';
  return L.ground === 'meadow' ? 'grass' : 'sand';
};
for (const name of ['coast', 'resort', 'seaside', 'reef', 'bay']) {
  registerTheme(name, name === 'bay' ? { ...PAL_SAND, ground: ['#f2e2c2', '#f6e9cf', '#f9efdb', '#fcf5e6'] } : PAL_SAND,
    { terrain: coastTerrain(name), trees: PALMS, things: tileThings(name) });
}
registerTheme('cliff', {
  ground: ['#7cc254', '#86ca5c', '#90d264', '#9cd96e'], grassDark: '#5ea640', grassLight: '#b8e88a',
  path: '#dcd2bc', pathDark: '#b0a48a', pathLight: '#e8e0cc', pathEdge: '#9a8e74',
  water: '#24a4d0', waterDeep: '#1f86c6', waterLight: '#94f2e2', waterEdge: '#1a5e94', foam: '#ffffff', shadow: '#1c3a1a55',
}, { terrain: coastTerrain('cliff'), trees: PINES, things: tileThings('cliff') });
for (const t of ['bchut', 'bcstone']) registerTheme(t, {
  ground: ['#b8844e', '#c8945c', '#a8763e', '#c8945c'], grassDark: '#6a4422', grassLight: '#e8c08a',
  path: '#c8a468', pathDark: '#8a6a3a', pathLight: '#d8b87a', pathEdge: '#6a4a2a',
  water: '#24a4d0', waterDeep: '#1f86c6', waterLight: '#94f2e2', waterEdge: '#1a5e94', foam: '#ffffff', shadow: '#2a1a0a44',
}, { terrain: coastTerrain(t), things: tileThings(t) });
registerTheme('bcroom', {
  ground: ['#d8875a', '#cf7c50', '#e09468', '#e8a070'], grassDark: '#a8603c', grassLight: '#f0b088',
  path: '#c8a468', pathDark: '#8a6a3a', pathLight: '#d8b87a', pathEdge: '#6a4a2a',
  water: '#24a4d0', waterDeep: '#1f86c6', waterLight: '#94f2e2', waterEdge: '#1a5e94', foam: '#ffffff', shadow: '#2a1a0a44',
}, { terrain: coastTerrain('bcroom'), things: tileThings('bcroom') });

// ---------------------------------------------------------------- buildings

const OUT = H('#2e2018');
/** Stucco wall with a little texture, lit from the left. */
function stucco(p: Pix, x0: number, y0: number, w: number, h: number, base: string, seed: number) {
  const c = H(base), d = mixc(c, H('#c8b8a0'), 0.25), l = mixc(c, 0xffffffff, 0.5);
  for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) {
    const n = vnoise(x, y, 4, seed) + (hash(x, y, seed + 1) - 0.5) * 0.2;
    p.set(x, y, n < 0.16 ? d : n > 0.84 ? l : c);
  }
  for (let y = y0; y < y0 + h; y++) { p.set(x0, y, OUT); p.set(x0 + w - 1, y, OUT); p.set(x0 + w - 2, y, darker(c, 0.85)); }
}
/** A window with shutters (open, either side) and a sill. */
function shutterWin(p: Pix, x: number, y: number, w: number, h: number, shutter: string) {
  const sh = H(shutter), shD = darker(sh, 0.75);
  for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) {
    const edge = xx === x || xx === x + w - 1 || yy === y || yy === y + h - 1;
    p.set(xx, yy, edge ? OUT : yy < y + 3 && xx < x + w / 2 ? H('#cdeeff') : (xx === Math.floor(x + w / 2) ? H('#f4f0e8') : H('#4a7ab0')));
  }
  for (let yy = y; yy < y + h; yy++) {
    for (const sx of [x - 3, x + w]) for (let k = 0; k < 3; k++) p.set(sx + k, yy, k === 2 && sx < x ? OUT : k === 0 && sx > x ? sh : yy % 2 ? shD : sh);
    p.set(x - 4, yy, OUT); p.set(x + w + 3, yy, OUT);
  }
  for (let xx = x - 4; xx < x + w + 4; xx++) { p.set(xx, y + h, H('#fbf8f2')); p.set(xx, y + h + 1, H('#a8987c')); }
}
/** Terracotta roof tiles (pantiles): curved rows, light crests. */
function pantiles(p: Pix, x0: number, y0: number, w: number, h: number, over = 2) {
  const tone = ['#9a3e22', '#c25a32', '#de7846', '#f09a66'].map(H);
  for (let y = y0; y < y0 + h; y++) {
    const inset = Math.max(0, Math.round((y0 + 3 - y) * 1.2));
    for (let x = x0 - over + inset; x < x0 + w + over - inset; x++) {
      const lx = (x - x0 + 200) % 6;
      const row = (y - y0) % 4;
      let c = lx < 2 ? tone[3] : lx < 4 ? tone[2] : tone[1];
      if (row === 3) c = tone[0];
      if (y === y0 + h - 1) c = tone[0];
      const edge = x === x0 - over + inset || x === x0 + w + over - inset - 1 || y === y0;
      p.set(x, y, edge ? H('#4a1e10') : c);
    }
  }
  for (let x = x0 - over; x < x0 + w + over; x++) p.set(x, y0 + h, H('#4a1e1080'));
}
/** A door with a frame; `col` its paint. */
function doorAt(p: Pix, x: number, y: number, w: number, h: number, col: string, arch = false) {
  const c = H(col), d = darker(c, 0.75), l = mixc(c, 0xffffffff, 0.3);
  for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) {
    const ax = xx - x - (w - 1) / 2;
    if (arch && yy < y + w / 2 && Math.hypot(ax, (yy - (y + w / 2)) * 1.0) > w / 2) continue;
    const edge = xx === x || xx === x + w - 1 || yy === y || (arch && Math.hypot(ax, yy - (y + w / 2)) > w / 2 - 1 && yy < y + w / 2);
    p.set(xx, yy, edge ? OUT : xx === x + 1 ? l : (xx - x) % 4 === 0 ? d : c);
  }
  p.set(x + w - 3, y + Math.floor(h * 0.55), H('#f4d060'));
}

function building(w: number, h: number, draw: (p: Pix) => void): Pix { const p = new Pix(w, h); draw(p); return p; }

const HUT = building(48, 60, (p) => {
  shadowEllipse(p, 24, 57, 22, 3, H('#6a4a2a40'));
  // bamboo walls
  for (let y = 30; y < 58; y++) for (let x = 5; x < 43; x++) {
    const pole = (x - 5) % 5;
    p.set(x, y, pole === 0 ? H('#7a5a2a') : pole === 1 ? H('#e8cc8a') : pole < 4 ? H('#d4b06a') : H('#b08a48'));
    if ((y - 30) % 9 === 0 && pole !== 0) p.set(x, y, H('#9a7438'));
  }
  for (let y = 30; y < 58; y++) { p.set(4, y, OUT); p.set(43, y, OUT); }
  for (let x = 4; x < 44; x++) p.set(x, 58, OUT);
  // doorway with a bead curtain, a window with a shutter propped open
  for (let y = 40; y < 58; y++) for (let x = 19; x < 29; x++) p.set(x, y, x === 19 || x === 28 || y === 40 ? OUT : (x % 2 === 0 && (y + x) % 3 !== 0) ? [H('#f07a50'), H('#4ac0d8'), H('#ffd84a')][(x + y) % 3] : H('#3a2412'));
  for (let y = 38; y < 47; y++) for (let x = 8; x < 16; x++) p.set(x, y, x === 8 || x === 15 || y === 38 || y === 46 ? OUT : H('#3a2a1a'));
  for (let x = 7; x < 17; x++) { p.set(x, 36, OUT); p.set(x, 37, H('#c89a52')); }
  for (let y = 38; y < 49; y++) for (let x = 33; x < 40; x++) p.set(x, y, x === 33 || x === 39 || y === 38 || y === 48 ? OUT : y < 41 ? H('#cdeeff') : H('#4a7ab0'));
  // flower pot by the door
  for (let y = 51; y < 57; y++) for (let x = 30; x < 35; x++) p.set(x, y, x === 30 || x === 34 ? OUT : H('#c86a3e'));
  for (const [x, y, c] of [[31, 49, '#e8388a'], [33, 48, '#ff7ab8'], [32, 50, '#2e8a40'], [30, 50, '#3a9a46']] as const) p.set(x, y, H(c));
  // thatch: layers of straw, a ragged eave, lighter towards the ridge
  const straw = ['#8a6a2a', '#b08c3a', '#d0ac52', '#e8c86e', '#f6de92'].map(H);
  for (let y = 4; y < 34; y++) {
    const half = 10 + (y - 4) * 0.55;
    for (let x = Math.round(24 - half); x <= Math.round(24 + half); x++) {
      const t = (x - (24 - half)) / (2 * half);
      const layer = Math.floor((y - 4) / 6);
      const ly = (y - 4) % 6;
      let k = ly < 2 ? 4 : ly < 4 ? 3 : 2;
      if (t > 0.7) k = Math.max(0, k - 1);
      if (hash(x, layer, 41) < 0.25 && ly > 1) k = Math.max(0, k - 1);
      if ((x + layer * 3) % 4 === 0 && ly > 2) k = Math.max(0, k - 1);
      p.set(x, y, straw[k]);
    }
  }
  // ragged eave and outline
  for (let x = 1; x < 48; x++) { const d = Math.floor(hash(x, 0, 42) * 3); for (let y = 33; y < 34 + d; y++) p.set(x, y, straw[1]); p.set(x, 34 + d, OUT); }
  for (let y = 4; y < 34; y++) { const half = 10 + (y - 4) * 0.55; p.set(Math.round(24 - half) - 1, y, OUT); p.set(Math.round(24 + half) + 1, y, OUT); }
  for (let x = 13; x < 36; x++) p.set(x, 3, OUT);
  for (let x = 14; x < 35; x++) p.set(x, 4, H('#7a5a20'));
});

const EXCHANGE = building(64, 64, (p) => {
  shadowEllipse(p, 32, 61, 30, 3, H('#6a4a2a40'));
  stucco(p, 4, 22, 56, 38, '#fbf7ee', 51);
  for (let x = 4; x < 60; x++) { p.set(x, 60, OUT); p.set(x, 59, H('#d8d0c0')); }
  // blue base band
  for (let y = 55; y < 59; y++) for (let x = 5; x < 59; x++) p.set(x, y, H('#2a6ab8'));
  pantiles(p, 4, 10, 56, 13, 3);
  shutterWin(p, 41, 32, 10, 12, '#2a6ab8');
  // door (tile 1: x 16..31) under a blue arch, sign above: a pearl → a sun coin
  doorAt(p, 18, 38, 12, 21, '#2a6ab8', true);
  for (let y = 24; y < 33; y++) for (let x = 13; x < 35; x++) p.set(x, y, x === 13 || x === 34 || y === 24 || y === 32 ? OUT : H('#fff8e4'));
  disc(p, 19, 28, 3, (d) => (d > 2.2 ? H('#9aa0b0') : d < 1 ? H('#ffffff') : H('#e8eaf4')));
  line(p, 23, 28, 26, 28, H('#2a2a2a')); p.set(25, 27, H('#2a2a2a')); p.set(25, 29, H('#2a2a2a'));
  disc(p, 30, 28, 3.2, (d) => (d > 2.4 ? H('#b88a10') : H('#ffd23a')));
  p.set(30, 28, H('#fff4a0'));
  // a potted palm by the door
  p.blit(PLANTER, 2, 36);
});

const BOAT = building(48, 28, (p) => {
  shadowEllipse(p, 24, 24, 22, 3, H('#6a4a2a50'));
  // hull seen from above at an angle: a pointed oval, blue outside, wooden inside
  for (let y = 4; y < 24; y++) for (let x = 2; x < 46; x++) {
    const dx = (x + 0.5 - 24) / 22, dy = (y + 0.5 - 14) / 10;
    const r = Math.abs(dx) ** 1.6 + dy * dy;
    if (r > 1) continue;
    const inner = Math.abs(dx) ** 1.6 + ((y + 0.5 - 12) / 7) ** 2;
    let c = r > 0.86 ? OUT : inner < 1 ? (Math.floor((x - 2) / 4) % 2 ? H('#c8945c') : H('#b0804a')) : y > 15 ? H('#1e5a9a') : H('#2a7ad0');
    if (inner >= 1 && r <= 0.86 && y > 17 && y < 20) c = H('#ffffff');
    if (inner < 1 && (x === 16 || x === 30)) c = H('#7a4e2c'); // seats
    p.set(x, y, c);
  }
  // oars
  line(p, 12, 6, 34, 19, H('#7a4e2c')); line(p, 12, 7, 34, 20, H('#c8945c'));
  rect(p, 33, 18, 4, 3, H('#e8c08a'));
});

const NETS = building(32, 30, (p) => {
  shadowEllipse(p, 16, 27, 14, 2, H('#6a4a2a40'));
  for (const x of [3, 27]) { rect(p, x, 4, 3, 24, H('#7a4e2c')); rect(p, x, 4, 1, 24, OUT); p.set(x + 2, 4, OUT); }
  line(p, 3, 5, 29, 5, H('#5a3a22'));
  for (let y = 6; y < 22; y++) for (let x = 6; x < 27; x++) {
    const sag = Math.sin(((x - 6) / 21) * Math.PI) * 3;
    if (y > 21 - (3 - sag)) continue;
    if ((x + y) % 4 === 0 || (x - y + 40) % 4 === 0) p.set(x, y, H('#3a6a5a'));
  }
  for (const [x, y] of [[9, 14], [15, 18], [21, 15], [12, 9], [23, 10]]) { disc(p, x, y, 1.6, () => H('#f07a30')); p.set(x - 1, y - 1, H('#ffb070')); }
});

function parasol(col: string, towel: string): Pix {
  return building(32, 40, (p) => {
    // towel on the sand, a shadow, the pole and the canopy
    for (let y = 26; y < 38; y++) for (let x = 3; x < 25; x++) {
      const edge = y === 26 || y === 37 || x === 3 || x === 24;
      p.set(x, y, edge ? darker(H(towel), 0.6) : Math.floor((y - 26) / 3) % 2 ? H(towel) : H('#ffffff'));
    }
    shadowEllipse(p, 18, 30, 11, 4, H('#2a1a0a30'));
    for (let y = 9; y < 34; y++) { p.set(15, y, H('#5a4a3a')); p.set(16, y, H('#e8e0d0')); }
    const c = H(col), cd = darker(c, 0.72), cl = mixc(c, 0xffffffff, 0.35);
    for (let y = 0; y < 14; y++) for (let x = 0; x < 32; x++) {
      const dx = (x + 0.5 - 16) / 15.5, dy = (y + 0.5 - 13) / 12.5;
      const d = dx * dx + dy * dy;
      if (d > 1 || y > 12) continue;
      const seg = Math.floor(Math.atan2(y + 0.5 - 13, x + 0.5 - 16) / (Math.PI / 6) + 12) % 2;
      let k = seg ? c : H('#fffaf0');
      if (dx > 0.25) k = seg ? cd : H('#e4dccc');
      else if (dx < -0.35 && dy < -0.4) k = seg ? cl : 0xffffffff;
      if (d > 0.88) k = OUT;
      p.set(x, y, k);
    }
    // scalloped hem
    for (let x = 1; x < 31; x++) { const s = (x % 5 < 3) ? 1 : 0; p.set(x, 12 + s, OUT); if (s) p.set(x, 12, Math.floor(x / 5) % 2 ? c : H('#fffaf0')); }
    p.set(15, 0, OUT); p.set(16, 0, OUT);
  });
}

const LOUNGER = building(16, 24, (p) => {
  shadowEllipse(p, 8, 21, 7, 2, H('#2a1a0a30'));
  for (let y = 4; y < 21; y++) for (let x = 2; x < 14; x++) {
    const edge = x === 2 || x === 13 || y === 4 || y === 20;
    p.set(x, y, edge ? H('#3a4a6a') : y < 9 ? (x % 4 < 2 ? H('#2a7ad0') : H('#ffffff')) : (x % 4 < 2 ? H('#3a8ae0') : H('#f4f8ff')));
  }
  for (let x = 3; x < 13; x++) p.set(x, 9, H('#1e4a8a'));
  for (const x of [3, 12]) { p.set(x, 21, H('#3a4a6a')); p.set(x, 22, H('#3a4a6a')); }
});

const STATION = building(128, 84, (p) => {
  shadowEllipse(p, 64, 81, 62, 3, H('#4a3a2a40'));
  stucco(p, 2, 30, 124, 50, '#f8efd8', 61);
  for (let x = 2; x < 126; x++) { p.set(x, 80, OUT); for (let y = 74; y < 80; y++) p.set(x, y, H('#d8c8a8')); }
  // the arcade: arches along the front, the middle one the entrance (tile 3: x 48..63)
  for (const ax of [8, 24, 76, 92, 108]) {
    for (let y = 52; y < 74; y++) for (let x = ax; x < ax + 12; x++) {
      const inside = y > 58 || Math.hypot(x + 0.5 - (ax + 6), y - 58) < 6;
      if (!inside) continue;
      const rim = y > 58 ? x === ax || x === ax + 11 : Math.hypot(x + 0.5 - (ax + 6), y - 58) > 5;
      p.set(x, y, rim ? H('#8a7050') : y < 64 ? H('#cdeeff') : H('#5a8ab8'));
    }
  }
  // the grand doorway: a tall arch with wooden doors and a fanlight
  for (let y = 40; y < 80; y++) for (let x = 46; x < 66; x++) {
    const inside = y > 50 || Math.hypot(x + 0.5 - 56, y - 50) < 10;
    if (!inside) continue;
    const rim = Math.hypot(x + 0.5 - 56, y - 50) > 9 && y <= 50 || x === 46 || x === 65;
    p.set(x, y, rim ? H('#7a5a3a') : y < 52 ? (Math.floor((x - 46) / 3) % 2 ? H('#ffe8a0') : H('#f4c860')) : (x === 55 || x === 56) ? OUT : (x - 46) % 5 === 0 ? H('#6a3e1e') : H('#8a5428'));
  }
  // roof: two wings of pantiles and a central pediment with a clock
  pantiles(p, 2, 22, 124, 9, 2);
  for (let y = 4; y < 31; y++) {
    const half = 26 - (y - 4) * 0 - Math.max(0, 12 - (y - 4)) * 1.6;
    for (let x = Math.round(56 - half); x < Math.round(56 + half); x++) p.set(x, y, Math.abs(x - 56) > half - 1.5 || y === 4 ? OUT : y < 8 ? H('#c25a32') : H('#fbf4e4'));
  }
  disc(p, 56, 20, 7, (d) => (d > 6 ? OUT : d > 5 ? H('#c8a040') : H('#fffaf0')));
  line(p, 56, 20, 56, 15, OUT); line(p, 56, 20, 60, 21, OUT);
  // a train pictogram sign over the door
  for (let y = 31; y < 38; y++) for (let x = 47; x < 65; x++) p.set(x, y, x === 47 || x === 64 || y === 31 || y === 37 ? OUT : H('#2a6ab8'));
  rect(p, 50, 33, 12, 3, H('#ffffff')); p.set(52, 36, H('#ffffff')); p.set(59, 36, H('#ffffff'));
  // blue tiles under the windows, flowers in pots
  for (const x of [10, 26, 78, 94, 110]) for (let k = 0; k < 8; k++) p.set(x + k, 47 + (k % 2), k % 2 ? H('#2a5aa8') : H('#f4f8ff'));
  for (const x of [4, 36, 70, 122]) { rect(p, x, 70, 4, 4, H('#c86a3e')); p.set(x + 1, 69, H('#e8388a')); p.set(x + 2, 68, H('#ff7ab8')); p.set(x, 69, H('#3a8a40')); }
});

/** The big white hotel: four floors of balconies with blue railings and striped awnings, flags on the roof. */
const HOTEL = building(112, 112, (p) => {
  shadowEllipse(p, 56, 109, 54, 3, H('#4a3a2a40'));
  stucco(p, 4, 18, 104, 90, '#fdfaf2', 71);
  for (let x = 4; x < 108; x++) { p.set(x, 108, OUT); p.set(x, 18, OUT); for (let y = 19; y < 23; y++) p.set(x, y, y === 22 ? H('#c8c0b0') : H('#2a5aa8')); }
  // roof terrace: parasols and flags
  for (let x = 4; x < 108; x++) for (let y = 14; y < 18; y++) p.set(x, y, (x % 4 === 0 || y === 14) ? OUT : H('#f4f0e8'));
  for (const [x, c] of [[14, '#f04a4a'], [92, '#2a7ad0']] as const) { for (let y = 2; y < 14; y++) p.set(x, y, H('#5a5a62')); rect(p, x + 1, 2, 8, 5, H(c)); rect(p, x + 1, 4, 8, 1, H('#ffffff')); }
  for (const x of [38, 66]) { disc(p, x, 10, 7, (d, xx, yy) => (yy > 10 ? 0 : d > 6 ? OUT : Math.floor(xx / 3) % 2 ? H('#ffd23a') : H('#ffffff'))); for (let y = 10; y < 15; y++) p.set(x, y, H('#5a5a62')); }
  // the name board: three stars
  for (let y = 24; y < 33; y++) for (let x = 36; x < 76; x++) p.set(x, y, x === 36 || x === 75 || y === 24 || y === 32 ? OUT : H('#1e4a8a'));
  for (const sx of [44, 54, 64]) for (const [dx, dy] of [[0, -2], [-1, -1], [0, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-1, 1], [1, 1], [-1, 2], [1, 2]]) p.set(sx + dx + 2, 28 + dy, H('#ffd23a'));
  // floors of windows with balconies
  for (const fy of [36, 54, 72]) {
    for (const wx of [10, 26, 42, 62, 78, 94]) {
      for (let y = fy; y < fy + 12; y++) for (let x = wx; x < wx + 9; x++) {
        const edge = x === wx || x === wx + 8 || y === fy;
        p.set(x, y, edge ? OUT : y < fy + 4 ? H('#cdeeff') : x === wx + 4 ? H('#f4f0e8') : H('#4a7ab0'));
      }
      for (let y = fy; y < fy + 12; y++) { p.set(wx - 2, y, H('#2a5aa8')); p.set(wx - 1, y, H('#1e4a8a')); p.set(wx + 9, y, H('#2a5aa8')); p.set(wx + 10, y, H('#1e4a8a')); }
      // striped awning
      const aw = (wx / 16) % 2 ? ['#f04a4a', '#ffffff'] : ['#2a7ad0', '#ffffff'];
      for (let y = fy - 4; y < fy; y++) for (let x = wx - 3; x < wx + 12; x++) p.set(x, y, y === fy - 4 ? OUT : Math.floor((x - wx + 3) / 3) % 2 ? H(aw[1]) : H(aw[0]));
      for (let x = wx - 3; x < wx + 12; x += 3) p.set(x, fy, H(aw[0]));
    }
    // balcony slab and railing
    for (let x = 6; x < 106; x++) {
      p.set(x, fy + 12, H('#fbf8f2')); p.set(x, fy + 13, H('#a8987c'));
      if (fy + 14 < 106) { p.set(x, fy + 8, H('#1e4a8a')); if (x % 3 === 0) for (let y = fy + 9; y < fy + 12; y++) p.set(x, y, H('#1e4a8a')); }
    }
    for (const x of [8, 40, 72, 104]) { p.set(x, fy + 7, H('#e8388a')); p.set(x + 1, fy + 6, H('#ff7ab8')); p.set(x - 1, fy + 7, H('#3a8a40')); }
  }
  // ground floor: the entrance (tile 3: x 48..63) under a canopy, potted palms
  for (let y = 90; y < 108; y++) for (let x = 46; x < 66; x++) p.set(x, y, x === 46 || x === 65 || y === 90 ? OUT : (x === 55 || x === 56) ? H('#c8e8f8') : (x - 46) % 6 === 0 ? H('#8aa8c0') : H('#a8d8f0'));
  for (let y = 84; y < 90; y++) for (let x = 42; x < 70; x++) p.set(x, y, y === 84 || y === 89 || x === 42 || x === 69 ? OUT : H('#1e4a8a'));
  for (const x of [43, 68]) for (let y = 90; y < 108; y++) p.set(x, y, H('#c8a040'));
  for (const wx of [10, 26, 78, 94]) for (let y = 92; y < 104; y++) for (let x = wx; x < wx + 10; x++) p.set(x, y, x === wx || x === wx + 9 || y === 92 || y === 103 ? OUT : y < 95 ? H('#cdeeff') : H('#5a8ab8'));
  p.blit(PLANTER, 36, 85); p.blit(PLANTER, 70, 85);
});

const HOTEL2 = building(96, 96, (p) => {
  shadowEllipse(p, 48, 93, 46, 3, H('#4a3a2a40'));
  stucco(p, 4, 22, 88, 70, '#f6c8a8', 81);
  for (let x = 4; x < 92; x++) p.set(x, 92, OUT);
  pantiles(p, 4, 10, 88, 13, 3);
  // arched windows with flower boxes on three floors
  for (const fy of [30, 52]) for (const wx of [12, 30, 56, 74]) {
    for (let y = fy; y < fy + 14; y++) for (let x = wx; x < wx + 10; x++) {
      const ax = x + 0.5 - (wx + 5);
      if (y < fy + 5 && Math.hypot(ax, y - (fy + 5)) > 5) continue;
      const rim = (y < fy + 5 && Math.hypot(ax, y - (fy + 5)) > 4) || x === wx || x === wx + 9;
      p.set(x, y, rim ? H('#8a4a3a') : y < fy + 6 ? H('#cdeeff') : H('#4a7ab0'));
    }
    for (let x = wx - 1; x < wx + 11; x++) { p.set(x, fy + 14, H('#7a4a2a')); p.set(x, fy + 13, x % 2 ? H('#e8388a') : H('#3a9a46')); p.set(x, fy + 12, x % 3 ? H('#3a9a46') : H('#ff7ab8')); }
  }
  // ground floor: a café with an awning, and a sign "full" (a bed with a red bar)
  for (let y = 72; y < 92; y++) for (let x = 8; x < 88; x++) if (y < 77) p.set(x, y, y === 72 ? OUT : Math.floor(x / 5) % 2 ? H('#2e8a6a') : H('#f4f0e0'));
  for (const wx of [12, 30, 62, 76]) for (let y = 79; y < 91; y++) for (let x = wx; x < wx + 10; x++) p.set(x, y, x === wx || x === wx + 9 || y === 79 ? OUT : y < 82 ? H('#cdeeff') : H('#5a8ab8'));
  doorAt(p, 44, 78, 10, 14, '#2e8a6a');
  for (let y = 66; y < 72; y++) for (let x = 40; x < 58; x++) p.set(x, y, x === 40 || x === 57 || y === 66 || y === 71 ? OUT : H('#fffaf0'));
  rect(p, 43, 68, 9, 2, H('#4a7ab0')); rect(p, 43, 67, 2, 2, H('#4a7ab0'));
  line(p, 42, 71, 55, 66, H('#e03a30')); line(p, 43, 71, 56, 66, H('#e03a30'));
});

const villa = (wall: string, shutter: string) => building(64, 60, (p) => {
  shadowEllipse(p, 32, 57, 30, 3, H('#4a3a2a40'));
  stucco(p, 4, 22, 56, 34, wall, 91);
  for (let x = 4; x < 60; x++) p.set(x, 56, OUT);
  pantiles(p, 4, 10, 56, 13, 3);
  rect(p, 46, 2, 6, 9, H('#f4f0e8')); rect(p, 46, 2, 6, 1, OUT); rect(p, 46, 2, 1, 9, OUT); rect(p, 51, 2, 1, 9, OUT);
  shutterWin(p, 9, 30, 9, 11, shutter);
  shutterWin(p, 44, 30, 9, 11, shutter);
  doorAt(p, 26, 38, 12, 18, shutter, true);
  // bougainvillea over the door
  for (let k = 0; k < 60; k++) {
    const a = (k / 60) * Math.PI, r = 9 + hash(k, 1, 92) * 4;
    const x = Math.round(32 + Math.cos(a) * r), y = Math.round(42 - Math.sin(a) * r * 0.9);
    p.set(x, y, [H('#e8388a'), H('#ff7ab8'), H('#b0206a'), H('#2e7a3a')][Math.floor(hash(k, 2, 93) * 4)]);
  }
});

const VILLA = villa('#fdfaf2', '#2a6ab8');

const SCOPE = building(16, 32, (p) => {
  // coin binoculars on a post, looking out to sea
  shadowEllipse(p, 8, 30, 5, 1, H('#1c3a1a55'));
  for (let y = 14; y < 30; y++) { p.set(7, y, H('#2a5a4a')); p.set(8, y, H('#4a8a6a')); }
  rect(p, 5, 28, 6, 2, H('#2a5a4a'));
  for (let y = 4; y < 14; y++) for (let x = 2; x < 14; x++) {
    const tube = (x < 7 || x > 8) && y > 5;
    if (!tube && !(y > 8 && y < 13)) continue;
    p.set(x, y, x === 2 || x === 13 || y === 13 || (y === 6 && tube) ? H('#1a3a2e') : x < 5 || (x > 8 && x < 11) ? H('#6aaa8a') : H('#4a8a6a'));
  }
  rect(p, 3, 4, 3, 2, H('#cdeeff')); rect(p, 10, 4, 3, 2, H('#cdeeff'));
});

const PALMPOT = building(32, 56, (p) => {
  // a palm in a round stone planter on the paving
  p.blit(PALMS[1], 0, 0, false, 0, 44);
  for (let y = 42; y < 54; y++) for (let x = 6; x < 26; x++) {
    const dx = (x + 0.5 - 16) / 10, dy = (y + 0.5 - 48) / 6;
    if (dx * dx + dy * dy > 1) continue;
    p.set(x, y, dx * dx + dy * dy > 0.8 ? H('#8a7a62') : y < 45 ? (dx * dx + dy * dy < 0.5 ? H('#6a4a2a') : H('#f4eee0')) : dx < -0.3 ? H('#f4eee0') : H('#d8ccb6'));
  }
  for (let y = 40; y < 46; y++) for (let x = 14; x < 18; x++) p.set(x, y, x === 14 ? H('#c8a06a') : H('#86603a'));
});

const TIKI = building(48, 56, (p) => {
  // a beach bar: bamboo counter, thatched roof, coconuts and a parrot-coloured sign
  shadowEllipse(p, 24, 53, 22, 3, H('#6a4a2a40'));
  for (let y = 32; y < 52; y++) for (let x = 3; x < 45; x++) {
    const pole = (x - 3) % 4;
    p.set(x, y, x === 3 || x === 44 || y === 51 ? OUT : y < 35 ? H('#c8945c') : pole === 0 ? H('#7a5a2a') : pole === 1 ? H('#e8cc8a') : H('#d4b06a'));
  }
  for (let x = 2; x < 46; x++) { p.set(x, 31, OUT); p.set(x, 32, H('#e8c08a')); }
  for (const x of [5, 41]) for (let y = 14; y < 32; y++) { p.set(x, y, H('#7a5a2a')); p.set(x + 1, y, H('#c8a060')); }
  const straw = ['#8a6a2a', '#b08c3a', '#d0ac52', '#e8c86e'].map(H);
  for (let y = 2; y < 16; y++) { const half = 8 + (y - 2) * 1.2; for (let x = Math.round(24 - half); x <= Math.round(24 + half); x++) p.set(x, y, Math.abs(x - 24) > half - 1 ? OUT : straw[(y - 2) % 4 < 2 ? 3 : (x + y) % 5 === 0 ? 1 : 2]); }
  for (let x = 6; x < 43; x++) p.set(x, 16 + (x % 3 === 0 ? 1 : 0), straw[0]);
  // glasses and coconuts on the counter
  for (const [x, c] of [[10, '#ffd23a'], [16, '#f07ab0'], [30, '#30c8c0']] as const) { rect(p, x, 27, 3, 4, H(c)); p.set(x + 1, 25, H('#e03a30')); p.set(x + 1, 26, H('#e03a30')); }
  disc(p, 24, 29, 2.5, (d) => (d > 1.8 ? H('#3a2410') : H('#6a4220'))); disc(p, 36, 29, 2.5, (d) => (d > 1.8 ? H('#3a2410') : H('#6a4220')));
  rect(p, 16, 19, 16, 6, H('#30c8c0')); rect(p, 16, 19, 16, 1, OUT); rect(p, 16, 24, 16, 1, OUT);
  rect(p, 19, 21, 3, 2, H('#ffd23a')); rect(p, 23, 21, 3, 2, H('#f04a4a')); rect(p, 27, 21, 2, 2, H('#ffffff'));
});

const DOLPHINS = building(48, 32, (p) => {
  // two dolphins leaping out of the water, splashes below
  const body = (x0: number, y0: number, flip: boolean) => {
    for (let i = 0; i < 18; i++) {
      const t = i / 17, a = Math.PI * (0.15 + t * 0.7);
      const x = x0 + (flip ? -1 : 1) * Math.round((t - 0.5) * 16), y = y0 - Math.round(Math.sin(a) * 9);
      const w = i < 3 ? 1 : i > 14 ? 1 : 2;
      for (let k = -w; k <= w; k++) p.set(x, y + k, k < 0 ? H('#4a7aa8') : k === w ? H('#d8f0ff') : H('#6a9ac8'));
      p.set(x, y - w - 1, H('#1a2a3a')); p.set(x, y + w + 1, H('#1a2a3a'));
    }
    p.set(x0 + (flip ? -6 : 6), y0 - 9, H('#101010'));
  };
  body(14, 22, false); body(36, 26, true);
  for (const [x, y] of [[4, 27], [24, 27], [26, 31], [46, 31], [44, 30]]) { p.set(x, y, H('#ffffff')); p.set(x + 1, y - 1, H('#ffffff')); p.set(x - 1, y - 1, H('#d4fcff')); }
});

const DRIFTWOOD = building(32, 16, (p) => {
  shadowEllipse(p, 16, 12, 14, 2, H('#6a4a2a30'));
  for (let x = 2; x < 30; x++) { const y = 8 + Math.round(Math.sin(x / 6) * 1.5); p.set(x, y - 2, H('#5a4a3a')); p.set(x, y - 1, H('#e8dccb')); p.set(x, y, H('#c8b8a0')); p.set(x, y + 1, H('#a89880')); p.set(x, y + 2, H('#5a4a3a')); }
  line(p, 20, 6, 26, 2, H('#a89880')); line(p, 21, 6, 27, 2, H('#e8dccb'));
  p.blit(SCALLOP, 6, 9);
});

const POOL = building(48, 32, (p) => {
  for (let y = 0; y < 32; y++) for (let x = 0; x < 48; x++) {
    const edge = x < 3 || x > 44 || y < 3 || y > 28;
    if (edge) { p.set(x, y, x === 0 || x === 47 || y === 0 || y === 31 ? H('#a8987c') : H('#f6f2e8')); continue; }
    const n = Math.sin((x + y * 0.6) / 2.6) + Math.sin((x * 0.7 - y) / 3.3);
    p.set(x, y, y < 6 ? H('#2a8ab8') : n > 1.3 ? H('#c8f8ff') : n > 0.6 ? H('#6ad8f0') : H('#3ab8e8'));
  }
  for (let y = 4; y < 12; y++) { p.set(39, y, H('#c8ccd4')); p.set(43, y, H('#c8ccd4')); }
  for (let y = 5; y < 12; y += 3) for (let x = 39; x < 44; x++) p.set(x, y, H('#c8ccd4'));
  disc(p, 14, 18, 4.5, (d) => (d < 2.2 ? 0 : d > 4 ? H('#8a2a20') : Math.floor(d * 3) % 2 ? H('#f04a4a') : H('#ffffff')));
});

const HOTELGATE = building(32, 36, (p) => {
  shadowEllipse(p, 16, 33, 15, 2, H('#2a2a2a40'));
  for (const x of [0, 26]) {
    rect(p, x, 6, 6, 28, H('#fdfaf2')); rect(p, x, 6, 1, 28, OUT); rect(p, x + 5, 6, 1, 28, OUT); rect(p, x + 4, 7, 1, 27, H('#d8d0c0'));
    rect(p, x - 1, 3, 8, 4, H('#2a5aa8')); rect(p, x - 1, 3, 8, 1, OUT);
  }
  // wrought-iron bars with curls at the top
  for (let x = 7; x < 26; x += 3) { for (let y = 12; y < 33; y++) p.set(x, y, H('#1e2a44')); p.set(x, 11, H('#1e2a44')); p.set(x + 1, 10, H('#1e2a44')); }
  for (const y of [14, 30]) for (let x = 6; x < 26; x++) p.set(x, y, H('#1e2a44'));
  // a small sign: a key card
  rect(p, 11, 18, 10, 8, H('#fffaf0')); rect(p, 11, 18, 10, 1, OUT); rect(p, 11, 25, 10, 1, OUT); rect(p, 11, 18, 1, 8, OUT); rect(p, 20, 18, 1, 8, OUT);
  rect(p, 13, 20, 6, 4, H('#2a7ad0')); rect(p, 13, 21, 6, 1, H('#ffd23a'));
});

/** High tide over the road: shallow water running in from the inlet, ripples, foam along its wavy edges. */
const TIDE = building(64, 34, (p) => {
  const edgeL = (y: number) => 3 + Math.sin(y / 3.1) * 2 + (y < 8 ? (8 - y) * 0.6 : 0);
  const edgeR = (y: number) => 60 - Math.sin(y / 2.7 + 1) * 2 - (y < 8 ? (8 - y) * 0.6 : 0);
  const top = (x: number) => 2 + Math.sin(x / 4.3) * 1.5 + Math.sin(x / 9) * 1.2;
  for (let y = 0; y < 34; y++) for (let x = 0; x < 64; x++) {
    const l = edgeL(y), r = edgeR(y), t = top(x);
    if (x < l || x > r || y < t) continue;
    const d = Math.min(x - l, r - x, y - t);
    const n = Math.sin((x * 0.9 + y * 0.45) / 2.3) + Math.sin((x - y * 1.3) / 4.1);
    let c = y > 26 ? H('#36c2d2') : y > 16 ? H('#62dcd6') : H('#94f2e2');
    if (n > 1.25) c = H('#d4fcff'); else if (n < -1.3) c = mixc(c, H('#24a4d0'), 0.4);
    if (d < 1.2) c = H('#ffffff'); else if (d < 2.4) c = mixc(c, H('#ffffff'), 0.5);
    p.set(x, y, y > 30 ? mixc(c, H('#36c2d2'), (y - 30) / 4) : c);
  }
  for (let k = 0; k < 9; k++) { const x = 8 + ((k * 23) % 48), y = 6 + ((k * 11) % 20); p.set(x, y, H('#ffffff')); p.set(x + 1, y, H('#ffffff')); p.set(x + 2, y + 1, H('#d4fcff')); }
});

const ROPE = building(32, 40, (p) => {
  for (const x of [2, 27]) { rect(p, x, 14, 3, 22, H('#8a5c34')); rect(p, x, 14, 1, 22, OUT); rect(p, x + 2, 14, 1, 22, H('#5a3a22')); shadowEllipse(p, x + 1, 36, 3, 1, H('#2a1a0a40')); }
  for (let x = 4; x < 28; x++) {
    const y = 18 + Math.round(Math.sin(((x - 4) / 24) * Math.PI) * 3);
    p.set(x, y, Math.floor(x / 3) % 2 ? H('#e03a30') : H('#ffffff')); p.set(x, y + 1, H('#8a2a20'));
  }
  // the red flag: swimming forbidden
  for (let y = 0; y < 15; y++) p.set(28, y, H('#5a5a62'));
  for (let y = 1; y < 9; y++) for (let x = 29; x < 32; x++) p.set(x, y, H('#e03a30'));
  for (let y = 1; y < 9; y++) for (let x = 16; x < 28; x++) if (x > 28 - (9 - Math.abs(y - 5)) * 1.4) p.set(x, y, y === 1 || y === 8 ? H('#8a1a10') : H('#f04a3a'));
  // a sign hanging on the rope
  rect(p, 11, 21, 10, 8, H('#fffaf0')); rect(p, 11, 21, 10, 1, OUT); rect(p, 11, 28, 10, 1, OUT); rect(p, 11, 21, 1, 8, OUT); rect(p, 20, 21, 1, 8, OUT);
  for (let k = 0; k < 5; k++) { p.set(13 + k, 23 + k % 2, H('#e03a30')); p.set(14 + k, 25 - k % 2, H('#e03a30')); }
});

/** The Ferris wheel at the end of the pier: a ring of spokes with coloured gondolas on a white frame over the water. */
const WHEEL = building(64, 104, (p) => {
  const cx = 32, cy = 40, R = 29;
  // frame legs, platform and piles in the water
  for (let y = 86; y < 104; y++) for (const x of [6, 18, 46, 58]) { p.set(x, y, H('#5a3a22')); p.set(x + 1, y, H('#3e2614')); }
  for (let y = 84; y < 90; y++) for (let x = 2; x < 62; x++) p.set(x, y, y === 84 || y === 89 || x === 2 || x === 61 ? H('#3e2614') : y === 85 ? H('#e8c08a') : H('#c8945c'));
  for (const [x0, x1] of [[cx, 12], [cx, 52]]) { line(p, x0, cy, x1, 84, H('#d8dce4')); line(p, x0 + (x1 > cx ? 1 : -1), cy, x1 + (x1 > cx ? 1 : -1), 84, H('#8a909c')); }
  // spokes and rim
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2;
    line(p, cx, cy, Math.round(cx + Math.cos(a) * R), Math.round(cy + Math.sin(a) * R), H('#c8ccd8'));
  }
  disc(p, cx, cy, R + 1, (d) => (d > R - 1 && d <= R + 1 ? (d > R ? H('#6a7080') : H('#ffffff')) : 0));
  disc(p, cx, cy, R - 6, (d) => (d > R - 7 ? H('#e8ecf4') : 0));
  disc(p, cx, cy, 3, (d) => (d > 2 ? H('#5a5a6a') : H('#ffd23a')));
  // gondolas hanging at the rim, each a little cabin
  const cols = ['#f04a4a', '#ffd23a', '#2a9ad8', '#3aba6a', '#f07ab0', '#a070d0', '#f0902a', '#30c8c0'];
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2 + 0.2;
    const gx = Math.round(cx + Math.cos(a) * R), gy = Math.round(cy + Math.sin(a) * R);
    const c = H(cols[k]);
    for (let y = gy; y < gy + 7; y++) for (let x = gx - 3; x < gx + 4; x++) {
      const edge = x === gx - 3 || x === gx + 3 || y === gy + 6;
      p.set(x, y, edge ? darker(c, 0.55) : y < gy + 2 ? darker(c, 0.85) : y < gy + 4 ? H('#cdeeff') : c);
    }
    p.set(gx, gy - 1, H('#6a7080'));
  }
  // light bulbs on the rim
  for (let k = 0; k < 32; k++) { const a = (k / 32) * Math.PI * 2; p.set(Math.round(cx + Math.cos(a) * (R - 3)), Math.round(cy + Math.sin(a) * (R - 3)), k % 2 ? H('#fff4a0') : H('#ffd23a')); }
});

const SHOP = building(64, 60, (p) => {
  shadowEllipse(p, 32, 57, 30, 3, H('#4a3a2a40'));
  // turquoise clapboard facade
  for (let y = 16; y < 56; y++) for (let x = 4; x < 60; x++) p.set(x, y, x === 4 || x === 59 ? OUT : (y - 16) % 4 === 3 ? H('#2a9a9a') : (y - 16) % 4 === 0 ? H('#7ae0d8') : H('#48c4c0'));
  for (let x = 4; x < 60; x++) { p.set(x, 56, OUT); p.set(x, 16, OUT); }
  // a false front with a shell on top
  for (let y = 6; y < 16; y++) for (let x = 14; x < 50; x++) p.set(x, y, x === 14 || x === 49 || y === 6 ? OUT : H('#fdfaf2'));
  p.blit(SCALLOP, 29, 8); p.blit(STAR_R, 20, 8); p.blit(CONCH, 38, 8);
  // striped awning over door and window
  for (let y = 20; y < 26; y++) for (let x = 6; x < 58; x++) p.set(x, y, y === 20 || y === 25 ? OUT : Math.floor((x - 6) / 4) % 2 ? H('#ffffff') : H('#f07ab0'));
  for (let x = 6; x < 58; x += 4) p.set(x + 2, 26, H('#f07ab0'));
  doorAt(p, 18, 34, 12, 22, '#f4f0e0');
  // the shop window: postcards, a ring and a bucket
  for (let y = 30; y < 48; y++) for (let x = 34; x < 56; x++) p.set(x, y, x === 34 || x === 55 || y === 30 || y === 47 ? OUT : y < 34 ? H('#cdeeff') : H('#5a8ab8'));
  disc(p, 40, 40, 4, (d) => (d < 1.8 ? 0 : d > 3.6 ? OUT : Math.floor(d * 2) % 2 ? H('#f04a4a') : H('#ffffff')));
  rect(p, 46, 36, 6, 4, H('#fffaf0')); rect(p, 47, 37, 4, 1, H('#86c8f0')); rect(p, 47, 38, 4, 1, H('#f4e0b0'));
  rect(p, 46, 41, 6, 4, H('#fffaf0')); rect(p, 47, 42, 4, 1, H('#3aba6a'));
  // postcard rack outside
  rect(p, 7, 38, 8, 16, H('#c8ccd4')); rect(p, 7, 38, 8, 1, OUT);
  for (let k = 0; k < 6; k++) rect(p, 8 + (k % 2) * 4, 40 + Math.floor(k / 2) * 4, 3, 3, H(['#86c8f0', '#f4e0b0', '#f07ab0', '#3aba6a', '#ffd23a', '#2a7ad0'][k]));
});

const POSTBOX = building(16, 28, (p) => {
  shadowEllipse(p, 8, 26, 5, 1, H('#2a1a0a40'));
  for (let y = 16; y < 27; y++) { p.set(7, y, H('#3a3a42')); p.set(8, y, H('#5a5a66')); }
  for (let y = 2; y < 17; y++) for (let x = 2; x < 14; x++) {
    const edge = x === 2 || x === 13 || y === 2 || y === 16;
    p.set(x, y, edge ? OUT : x < 5 ? H('#ffe066') : x > 10 ? H('#d8a820') : H('#f4c830'));
  }
  rect(p, 4, 5, 8, 2, H('#3a2a1a'));
  // a post horn
  disc(p, 8, 11, 2.6, (d) => (d > 1.4 ? H('#1a1a1a') : 0)); line(p, 5, 11, 3, 13, H('#1a1a1a'));
});

const YACHT = building(48, 64, (p) => {
  // reflection and wake on the water
  for (let x = 6; x < 44; x++) { if (x % 3) p.set(x, 61, H('#ffffff90')); p.set(x, 62, H('#0e3a6040')); }
  // hull
  for (let y = 48; y < 60; y++) {
    const inset = Math.round((y - 48) * 0.6);
    for (let x = 4 + inset; x < 46 - Math.round(inset * 1.4); x++) {
      const edge = y === 48 || y === 59 || x === 4 + inset || x === 45 - Math.round(inset * 1.4);
      p.set(x, y, edge ? H('#1a2a44') : y < 52 ? H('#ffffff') : y < 54 ? H('#2a6ab8') : H('#e8eef6'));
    }
  }
  rect(p, 14, 44, 16, 4, H('#f4f0e8')); rect(p, 14, 44, 16, 1, H('#1a2a44')); rect(p, 17, 45, 8, 2, H('#5a8ab8'));
  // mast, sails
  for (let y = 2; y < 48; y++) { p.set(24, y, H('#5a5a66')); p.set(25, y, H('#c8ccd4')); }
  poly(p, [[26, 4], [26, 44], [44, 44]], (x, y) => (x > 26 + (y - 4) * 0.42 ? H('#d8dce4') : (x + y) % 9 === 0 ? H('#e8ecf2') : H('#ffffff')));
  line(p, 26, 4, 44, 44, H('#8a909c'));
  poly(p, [[23, 10], [23, 42], [8, 42]], (x, y) => (x < 23 - (y - 10) * 0.35 ? H('#e4e8ee') : H('#f8f8fa')));
  line(p, 23, 10, 8, 42, H('#8a909c'));
  rect(p, 25, 1, 5, 3, H('#e03a30'));
});

const BUOY = building(16, 18, (p) => {
  for (let x = 2; x < 14; x++) if (x % 3) p.set(x, 15, H('#ffffffc0'));
  for (let y = 3; y < 15; y++) for (let x = 4; x < 12; x++) {
    const dx = (x + 0.5 - 8) / 4, dy = (y + 0.5 - 10) / 5.5;
    if (dx * dx + dy * dy > 1) continue;
    p.set(x, y, dx * dx + dy * dy > 0.75 ? H('#5a1a10') : Math.floor(y / 3) % 2 ? H('#f04a3a') : H('#ffffff'));
  }
  p.set(7, 2, H('#3a3a42')); p.set(8, 2, H('#3a3a42')); p.set(7, 1, H('#ffd23a'));
});

/** The lighthouse: a tapering tower in red and white bands, a gallery, the lantern and a red dome, on rocks. */
const LIGHTHOUSE = building(48, 128, (p) => {
  shadowEllipse(p, 24, 124, 22, 3, H('#1c3a1a50'));
  // rocks at the foot
  canopy(p, 0, 104, 48, 24, [{ x: 10, y: 14, r: 9 }, { x: 37, y: 14, r: 9 }, { x: 24, y: 17, r: 8, z: 1 }], ROCKT.slice(1), H('#33363e'), 901);
  // the tower
  const top = 34, bot = 116;
  for (let y = top; y < bot; y++) {
    const half = 8 + ((y - top) / (bot - top)) * 6;
    const l = Math.round(24 - half), r = Math.round(24 + half);
    const band = Math.floor((y - top) / 14) % 2 === 0;
    for (let x = l; x <= r; x++) {
      const t = (x - l) / (r - l);
      const base = band ? ['#ff8a7a', '#e8443a', '#c02a24', '#8a1a18'] : ['#ffffff', '#f2eee8', '#d8d2c8', '#a8a29a'];
      p.set(x, y, x === l || x === r ? H('#3a1a14') : H(base[t < 0.22 ? 0 : t < 0.55 ? 1 : t < 0.8 ? 2 : 3]));
    }
  }
  // windows up the tower and the door at the foot
  for (const y of [52, 76]) rect(p, 22, y, 4, 6, H('#2a3a5a'));
  doorAt(p, 19, 102, 10, 14, '#2a5aa8', true);
  // gallery and railing
  for (let x = 10; x < 39; x++) { p.set(x, 33, OUT); p.set(x, 32, H('#3a3a42')); p.set(x, 31, H('#6a6a76')); if (x % 2 === 0) for (let y = 26; y < 31; y++) p.set(x, y, H('#2a2a32')); p.set(x, 26, H('#2a2a32')); }
  // the lantern room: glass with the bright lamp inside
  for (let y = 14; y < 26; y++) for (let x = 15; x < 33; x++) {
    const edge = x === 15 || x === 32 || x === 21 || x === 26;
    const d = Math.hypot(x + 0.5 - 24, y + 0.5 - 21);
    p.set(x, y, edge ? H('#2a2a32') : d < 3 ? H('#ffffff') : d < 5 ? H('#fff4a0') : H('#ffe070'));
  }
  // red dome and a little vane
  for (let y = 4; y < 15; y++) {
    const half = Math.sqrt(Math.max(0, 1 - ((14 - y) / 10.5) ** 2)) * 10;
    for (let x = Math.round(24 - half); x <= Math.round(24 + half); x++) p.set(x, y, Math.abs(x - 24) > half - 1 || y === 4 ? H('#3a1a14') : x < 22 ? H('#ff7a6a') : x < 27 ? H('#e03a30') : H('#a8221c'));
  }
  for (let y = 0; y < 5; y++) p.set(24, y, H('#2a2a32'));
  p.set(25, 1, H('#2a2a32')); p.set(26, 1, H('#2a2a32'));
});

const COTTAGE = building(64, 60, (p) => {
  shadowEllipse(p, 32, 57, 30, 3, H('#1c3a1a40'));
  stucco(p, 4, 24, 56, 32, '#fdfaf2', 111);
  for (let x = 4; x < 60; x++) p.set(x, 56, OUT);
  // a steep red roof with a chimney
  for (let y = 4; y < 26; y++) {
    const half = 8 + (y - 4) * 1.15;
    for (let x = Math.round(32 - half); x <= Math.round(32 + half); x++) {
      const edge = Math.abs(x - 32) > half - 1 || y === 25;
      p.set(x, y, edge ? H('#3a1a14') : (y - 4) % 4 === 3 ? H('#8a2a20') : x < 32 - half / 3 ? H('#e86450') : H('#c8443a'));
    }
  }
  rect(p, 42, 2, 6, 10, H('#d8d0c4')); rect(p, 42, 2, 6, 1, OUT); rect(p, 42, 2, 1, 10, OUT); rect(p, 47, 2, 1, 10, OUT);
  shutterWin(p, 11, 32, 9, 10, '#2e8a6a');
  doorAt(p, 34, 36, 12, 20, '#2e8a6a');
  for (let x = 8; x < 24; x++) { p.set(x, 44, H('#7a4a2a')); p.set(x, 43, x % 2 ? H('#e8388a') : H('#ffd23a')); }
});

const DIVE = building(64, 60, (p) => {
  shadowEllipse(p, 32, 57, 30, 3, H('#4a3a2a40'));
  // blue wooden planks, white trim
  for (let y = 22; y < 56; y++) for (let x = 4; x < 60; x++) p.set(x, y, x === 4 || x === 59 ? OUT : (x - 4) % 6 === 0 ? H('#1e5a9a') : (x - 4) % 6 === 1 ? H('#5a9ae0') : H('#3a7ac8'));
  for (let x = 4; x < 60; x++) p.set(x, 56, OUT);
  // a corrugated roof
  for (let y = 12; y < 23; y++) for (let x = 1; x < 63; x++) p.set(x, y, y === 12 || y === 22 || x === 1 || x === 62 ? OUT : x % 3 === 0 ? H('#a8b0bc') : x % 3 === 1 ? H('#e0e4ea') : H('#c8ccd4'));
  // the sign: a diving mask
  for (let y = 2; y < 13; y++) for (let x = 20; x < 44; x++) p.set(x, y, x === 20 || x === 43 || y === 2 ? OUT : H('#ffd23a'));
  disc(p, 28, 8, 3.5, (d) => (d > 2.6 ? H('#1a1a1a') : H('#86d8f0'))); disc(p, 36, 8, 3.5, (d) => (d > 2.6 ? H('#1a1a1a') : H('#86d8f0')));
  line(p, 23, 7, 21, 6, H('#1a1a1a')); line(p, 40, 7, 42, 6, H('#1a1a1a'));
  // door (tile 1: x 16..31) and a window, tanks and fins outside
  doorAt(p, 18, 34, 12, 22, '#f4f0e0');
  for (let y = 30; y < 42; y++) for (let x = 38; x < 52; x++) p.set(x, y, x === 38 || x === 51 || y === 30 || y === 41 ? OUT : y < 33 ? H('#cdeeff') : H('#5a8ab8'));
  for (const x of [6, 11]) { rect(p, x, 38, 4, 16, H('#ffd23a')); rect(p, x, 38, 1, 16, H('#fff08a')); rect(p, x + 3, 38, 1, 16, H('#c8a020')); rect(p, x + 1, 36, 2, 2, H('#3a3a42')); }
  for (const [x, c] of [[52, '#f04a4a'], [55, '#2a9ad8']] as const) { rect(p, x, 46, 3, 10, H(c)); rect(p, x, 46, 3, 1, OUT); }
});

const TOWER = building(32, 60, (p) => {
  shadowEllipse(p, 16, 57, 14, 2, H('#4a3a2a40'));
  // stilts and a ladder
  for (const x of [4, 26]) for (let y = 30; y < 58; y++) { p.set(x, y, H('#5a3a22')); p.set(x + 1, y, H('#8a5c34')); }
  line(p, 5, 34, 27, 56, H('#7a4e2c')); line(p, 27, 34, 5, 56, H('#7a4e2c'));
  for (let y = 36; y < 58; y += 4) { p.set(14, y, H('#c8945c')); p.set(15, y, H('#c8945c')); p.set(16, y, H('#c8945c')); }
  for (let y = 32; y < 58; y++) { p.set(13, y, H('#7a4e2c')); p.set(17, y, H('#7a4e2c')); }
  // the hut: white with a red stripe, a little roof
  for (let y = 16; y < 32; y++) for (let x = 2; x < 30; x++) p.set(x, y, x === 2 || x === 29 || y === 31 ? OUT : y > 25 && y < 29 ? H('#e03a30') : H('#fdfaf2'));
  rect(p, 8, 19, 16, 5, H('#5a8ab8')); rect(p, 8, 19, 16, 1, OUT);
  for (let y = 10; y < 17; y++) for (let x = 0; x < 32; x++) if (Math.abs(x - 15.5) < 16 - (16 - y) * 0.2) p.set(x, y, y === 10 ? OUT : y === 16 ? H('#8a2a20') : H('#e03a30'));
  // the empty flagpole: the green flag is missing
  for (let y = 0; y < 11; y++) p.set(28, y, H('#5a5a62'));
  p.set(28, 0, H('#ffd23a'));
});

const CABINS = building(48, 40, (p) => {
  shadowEllipse(p, 24, 37, 23, 2, H('#4a3a2a40'));
  const cols = ['#2a7ad0', '#f04a4a', '#ffc23a'];
  for (let k = 0; k < 3; k++) {
    const x0 = 1 + k * 16;
    const c = H(cols[k]);
    for (let y = 14; y < 37; y++) for (let x = x0; x < x0 + 14; x++) p.set(x, y, x === x0 || x === x0 + 13 || y === 36 ? OUT : (x - x0) % 4 < 2 ? c : H('#ffffff'));
    for (let y = 4; y < 15; y++) { const half = (y - 4) * 0.8; for (let x = Math.round(x0 + 7 - half); x <= Math.round(x0 + 6 + half); x++) p.set(x, y, Math.abs(x - x0 - 6.5) > half - 1 || y === 14 ? OUT : darker(c, 0.85)); }
    rect(p, x0 + 4, 22, 6, 14, darker(c, 0.6)); rect(p, x0 + 4, 22, 6, 1, OUT);
  }
});

const SANDCASTLE = building(16, 20, (p) => {
  shadowEllipse(p, 8, 18, 7, 1, H('#6a4a2a40'));
  const s = ['#c8a468', '#e0c088', '#f0d8a4'].map(H);
  for (let y = 9; y < 18; y++) for (let x = 2; x < 14; x++) p.set(x, y, x === 2 || x === 13 || y === 17 ? H('#8a6a3a') : x < 5 ? s[2] : x > 10 ? s[0] : s[1]);
  for (const x of [2, 6, 10]) { p.set(x + 1, 8, s[1]); p.set(x + 2, 8, s[1]); }
  for (let y = 4; y < 9; y++) for (let x = 6; x < 10; x++) p.set(x, y, x === 6 || x === 9 ? H('#8a6a3a') : s[2]);
  rect(p, 7, 13, 2, 4, H('#6a4a2a'));
  for (let y = 0; y < 4; y++) p.set(8, y, H('#5a5a62'));
  p.set(9, 0, H('#f04a4a')); p.set(10, 0, H('#f04a4a')); p.set(9, 1, H('#f04a4a'));
});

const SURF = building(16, 32, (p) => {
  shadowEllipse(p, 8, 30, 6, 1, H('#4a3a2a40'));
  const board = (x0: number, c: string, s: string) => {
    for (let y = 2; y < 30; y++) for (let x = x0; x < x0 + 6; x++) {
      const dx = (x + 0.5 - x0 - 3) / 3, dy = (y + 0.5 - 16) / 14;
      if (dx * dx + dy * dy > 1) continue;
      p.set(x, y, dx * dx + dy * dy > 0.7 ? OUT : x === x0 + 3 ? H(s) : x < x0 + 2 ? mixc(H(c), 0xffffffff, 0.35) : H(c));
    }
  };
  board(1, '#ffd23a', '#f04a4a'); board(8, '#30c8c0', '#ffffff');
});

const ROCKPOOL = building(32, 32, (p) => {
  const L = new Pix(32, 32);
  canopy(L, 0, 0, 32, 31, [{ x: 16, y: 16, r: 14 }, { x: 8, y: 20, r: 8, z: 1 }, { x: 24, y: 21, r: 8, z: 1 }], ['#6e6a62', '#8a857a', '#a8a294', '#c4beae'].map(H), H('#33302a'), 921);
  p.blit(L, 0, 0);
  // the pool inside: clear water, an anemone, a starfish, little fish
  for (let y = 9; y < 24; y++) for (let x = 7; x < 25; x++) {
    const dx = (x + 0.5 - 16) / 9, dy = (y + 0.5 - 16.5) / 7.5;
    const d = dx * dx + dy * dy;
    if (d > 1) continue;
    p.set(x, y, d > 0.82 ? H('#2a6a7a') : y < 12 ? H('#7ae4e0') : H('#4ac8d4'));
  }
  disc(p, 12, 18, 2.4, (d) => (d < 1 ? H('#ffd0e0') : H('#f05a8a')));
  p.blit(STAR_R, 17, 14);
  p.set(20, 12, H('#ffd24a')); p.set(21, 12, H('#ffd24a')); p.set(19, 12, H('#c87a20'));
});

const ICECART = building(32, 48, (p) => {
  shadowEllipse(p, 16, 45, 15, 2, H('#4a3a2a40'));
  // cart body, pastel with a scalloped trim, two wheels
  for (let y = 28; y < 42; y++) for (let x = 2; x < 30; x++) p.set(x, y, x === 2 || x === 29 || y === 28 || y === 41 ? OUT : y < 31 ? H('#fff8f0') : x < 6 ? H('#ffc8dc') : H('#f8a8c8'));
  for (let x = 3; x < 29; x++) if (x % 4 < 2) p.set(x, 31, H('#ffffff'));
  disc(p, 8, 42, 3.5, (d) => (d > 2.5 ? OUT : d < 1 ? H('#c8ccd4') : H('#5a5a66'))); disc(p, 24, 42, 3.5, (d) => (d > 2.5 ? OUT : d < 1 ? H('#c8ccd4') : H('#5a5a66')));
  // tubs of ice cream on top
  for (const [x, c] of [[5, '#ff8aa8'], [12, '#7a4a2a'], [19, '#fff08a'], [25, '#a8e890']] as const) { rect(p, x, 25, 5, 3, H(c)); p.set(x + 1, 25, mixc(H(c), 0xffffffff, 0.5)); }
  // a parasol and a giant cone sign
  for (let y = 4; y < 26; y++) p.set(29, y, H('#8a8a96'));
  for (let y = 0; y < 8; y++) for (let x = 14; x < 32; x++) { const d = Math.hypot((x + 0.5 - 29) / 3, (y + 0.5 - 8) / 8) ; void d; }
  for (let y = 2; y < 10; y++) for (let x = 18; x < 32; x++) { const dx = (x + 0.5 - 29) / 12, dy = (y + 0.5 - 10) / 8; if (dx * dx + dy * dy <= 1) p.set(x, y, dx * dx + dy * dy > 0.82 ? OUT : Math.floor((x - 18) / 3) % 2 ? H('#ffffff') : H('#30c8c0')); }
  poly(p, [[6, 14], [14, 14], [10, 26]], (x) => ((x % 2) ? H('#e0a050') : H('#c8843a')));
  disc(p, 10, 12, 4, (d) => (d > 3.2 ? H('#c8507a') : H('#ff9ac0')));
  disc(p, 10, 8, 3, (d) => (d > 2.2 ? H('#5a3a1a') : H('#8a5a30')));
  p.set(11, 4, H('#e03a30'));
});

const RENTAL = building(32, 44, (p) => {
  shadowEllipse(p, 16, 41, 15, 2, H('#6a4a2a40'));
  // stacked deck chairs
  for (let k = 0; k < 4; k++) for (let x = 2; x < 18; x++) { p.set(x, 34 - k * 3, OUT); p.set(x, 35 - k * 3, x % 4 < 2 ? H('#2a7ad0') : H('#ffffff')); p.set(x, 36 - k * 3, x % 4 < 2 ? H('#1e5aa8') : H('#e4e8f0')); }
  for (const x of [2, 17]) for (let y = 25; y < 40; y++) p.set(x, y, H('#8a5c34'));
  // folded parasols in a rack
  const cols = ['#f04a4a', '#ffc23a', '#30c8c0'];
  for (let k = 0; k < 3; k++) {
    const x = 20 + k * 4;
    for (let y = 6; y < 38; y++) p.set(x + 1, y, H('#e8e0d0'));
    for (let y = 8; y < 22; y++) { const w = y < 12 ? 1 : 2; for (let dx = -w; dx <= w; dx++) p.set(x + 1 + dx, y, Math.abs(dx) === w ? darker(H(cols[k]), 0.6) : H(cols[k])); }
  }
  rect(p, 19, 36, 13, 3, H('#7a4e2c'));
  // price board with a sun
  rect(p, 3, 6, 14, 14, H('#fffaf0')); rect(p, 3, 6, 14, 1, OUT); rect(p, 3, 19, 14, 1, OUT); rect(p, 3, 6, 1, 14, OUT); rect(p, 16, 6, 1, 14, OUT);
  disc(p, 10, 13, 3, () => H('#ffc23a'));
  for (const [dx, dy] of [[0, -5], [0, 5], [-5, 0], [5, 0], [-4, -4], [4, 4], [-4, 4], [4, -4]]) p.set(10 + dx, 13 + dy, H('#f09a30'));
  for (let y = 20; y < 26; y++) p.set(10, y, H('#7a4e2c'));
});

const HAMMOCK = building(48, 64, (p) => {
  // two palms (their trunks are the posts) and a striped hammock slung between them
  p.blit(PALMS[0], -11, 14); p.blit(PALMS[1], 27, 14);
  for (let x = 6; x < 42; x++) {
    const t = (x - 6) / 36, sag = Math.sin(t * Math.PI) * 8;
    for (let k = 0; k < 4; k++) p.set(x, Math.round(40 + sag + k), k === 3 ? OUT : k === 0 ? H('#ffffff') : Math.floor(x / 3) % 3 === 0 ? H('#f04a4a') : Math.floor(x / 3) % 3 === 1 ? H('#ffd23a') : H('#30c8c0'));
  }
  shadowEllipse(p, 24, 58, 14, 2, H('#6a4a2a40'));
});

const KAYAK = building(32, 16, (p) => {
  shadowEllipse(p, 16, 12, 15, 2, H('#6a4a2a40'));
  for (let y = 4; y < 12; y++) for (let x = 1; x < 31; x++) {
    const dx = (x + 0.5 - 16) / 15, dy = (y + 0.5 - 8) / 3.6;
    if (Math.abs(dx) ** 1.5 + dy * dy > 1) continue;
    p.set(x, y, Math.abs(dx) ** 1.5 + dy * dy > 0.75 ? H('#8a3a10') : y < 7 ? H('#ffb040') : H('#f08a20'));
  }
  rect(p, 13, 6, 6, 3, H('#3a2a1a'));
  line(p, 6, 13, 26, 3, H('#3a3a42'));
  rect(p, 4, 12, 3, 3, H('#2a7ad0')); rect(p, 25, 1, 3, 3, H('#2a7ad0'));
});

// ---------------------------------------------------------------- furniture

const WOOD = ['#5a3a1e', '#8a5c34', '#a8764a', '#c8945c'].map(H);
const FURN = {
  bed: building(16, 32, (p) => {
    shadowEllipse(p, 8, 30, 7, 1, H('#2a1a0a40'));
    rect(p, 1, 2, 14, 28, OUT); rect(p, 2, 3, 12, 26, WOOD[2]); rect(p, 2, 3, 12, 4, WOOD[1]);
    rect(p, 3, 6, 10, 5, H('#fffaf0')); rect(p, 3, 10, 10, 1, H('#d8d0c4'));
    for (let y = 12; y < 28; y++) for (let x = 3; x < 13; x++) p.set(x, y, y === 12 ? H('#ffffff') : (Math.floor((x - 3) / 2) + Math.floor(y / 2)) % 2 ? H('#30b0c0') : H('#e8f8f8'));
    rect(p, 2, 28, 12, 2, WOOD[0]);
  }),
  shelf: building(16, 32, (p) => {
    shadowEllipse(p, 8, 30, 7, 1, H('#2a1a0a40'));
    rect(p, 1, 2, 14, 28, OUT); rect(p, 2, 3, 12, 26, WOOD[1]);
    for (const y of [9, 17, 25]) rect(p, 2, y, 12, 2, WOOD[3]);
    const books = ['#e04a3a', '#2a7ad0', '#ffd23a', '#3aa86a', '#f07ab0', '#8a5ac8'];
    for (let k = 0; k < 10; k++) { const x = 3 + (k % 5) * 2, y = k < 5 ? 4 : 12; rect(p, x, y, 2, 5, H(books[k % 6])); p.set(x, y, mixc(H(books[k % 6]), 0xffffffff, 0.4)); }
    p.blit(SCALLOP, 4, 19); p.blit(CONCH, 8, 19);
  }),
  kitchen: building(32, 32, (p) => {
    shadowEllipse(p, 16, 30, 15, 1, H('#2a1a0a40'));
    rect(p, 0, 8, 32, 22, OUT); rect(p, 1, 9, 30, 20, H('#fdfaf2')); rect(p, 1, 9, 30, 4, H('#d8b080'));
    for (let x = 2; x < 30; x += 6) rect(p, x, 15, 5, 12, H('#2a6ab8'));
    for (let x = 2; x < 30; x += 6) p.set(x + 2, 20, H('#ffd23a'));
    disc(p, 8, 10, 3, (d) => (d > 2 ? H('#2a2a32') : H('#5a5a66'))); rect(p, 5, 4, 6, 5, H('#c8ccd4')); rect(p, 5, 4, 6, 1, OUT);
    rect(p, 18, 6, 8, 4, H('#f04a4a')); p.set(20, 5, H('#3aa86a')); p.set(22, 4, H('#3aa86a'));
  }),
  dtable: building(32, 28, (p) => {
    shadowEllipse(p, 16, 25, 14, 2, H('#2a1a0a40'));
    for (const x of [1, 27]) { rect(p, x, 10, 4, 14, WOOD[1]); rect(p, x, 10, 4, 1, OUT); }
    rect(p, 5, 6, 22, 12, OUT); rect(p, 6, 7, 20, 10, H('#fffaf0'));
    for (let x = 6; x < 26; x++) for (let y = 7; y < 17; y++) if ((Math.floor(x / 3) + Math.floor(y / 3)) % 2) p.set(x, y, H('#5ab8e0'));
    rect(p, 7, 17, 2, 7, WOOD[0]); rect(p, 23, 17, 2, 7, WOOD[0]);
    disc(p, 12, 11, 2.5, () => H('#ffffff')); p.set(12, 11, H('#f04a3a')); disc(p, 20, 11, 2.5, () => H('#ffffff')); p.set(20, 11, H('#ffd23a'));
  }),
  armchair: building(16, 24, (p) => {
    shadowEllipse(p, 8, 22, 7, 1, H('#2a1a0a40'));
    rect(p, 1, 3, 14, 18, OUT); rect(p, 2, 4, 12, 16, H('#e86a50')); rect(p, 2, 4, 12, 6, H('#f08a70'));
    rect(p, 2, 10, 3, 10, H('#c84a38')); rect(p, 11, 10, 3, 10, H('#c84a38')); rect(p, 5, 11, 6, 5, H('#ffd23a'));
    rect(p, 3, 21, 2, 2, WOOD[0]); rect(p, 11, 21, 2, 2, WOOD[0]);
  }),
  aquarium: building(32, 32, (p) => {
    shadowEllipse(p, 16, 30, 15, 1, H('#2a1a0a40'));
    rect(p, 1, 18, 30, 12, OUT); rect(p, 2, 19, 28, 10, WOOD[1]);
    rect(p, 1, 2, 30, 17, OUT);
    for (let y = 3; y < 18; y++) for (let x = 2; x < 30; x++) p.set(x, y, y < 5 ? H('#c8f4ff') : y > 15 ? H('#e8d0a0') : (x + y) % 11 === 0 ? H('#86dcf0') : H('#4ac0e0'));
    p.blit(CORAL_PIX[0], 5, 11); p.blit(CORAL_PIX[2], 20, 11);
    for (const [x, y, c] of [[12, 8, '#ffd24a'], [24, 6, '#ff7a3a'], [16, 12, '#f07ab0']] as const) { rect(p, x, y, 3, 1, H(c)); p.set(x - 1, y - 1, H(c)); p.set(x - 1, y + 1, H(c)); p.set(x + 2, y, H('#101820')); }
  }),
  lens: building(32, 48, (p) => {
    // the great lamp of the lighthouse: a glass lens in brass rings on a pedestal
    shadowEllipse(p, 16, 45, 13, 2, H('#2a2a3240'));
    rect(p, 10, 34, 12, 12, OUT); rect(p, 11, 35, 10, 10, H('#5a5a66')); rect(p, 11, 35, 3, 10, H('#7a7a86'));
    for (let y = 2; y < 34; y++) {
      const half = 13 - Math.abs(y - 18) * 0.25;
      for (let x = Math.round(16 - half); x <= Math.round(16 + half); x++) {
        const edge = Math.abs(x - 16) > half - 1 || y === 2 || y === 33;
        const ring = (y - 2) % 5 === 0;
        const glow = Math.hypot(x - 16, y - 18) < 5;
        p.set(x, y, edge ? H('#6a4a10') : ring ? H('#d8a830') : glow ? (Math.hypot(x - 16, y - 18) < 2.5 ? H('#ffffff') : H('#fff4a0')) : x < 12 ? H('#e8f8ff') : H('#b8dcec'));
      }
    }
  }),
  spiral: building(32, 40, (p) => {
    // a spiral staircase going up round its pole
    shadowEllipse(p, 16, 37, 14, 2, H('#2a2a3240'));
    for (let k = 0; k < 9; k++) {
      const a = k * 0.8, y = 34 - k * 4;
      const x0 = 16, x1 = Math.round(16 + Math.cos(a) * 13);
      for (let yy = y; yy < y + 3; yy++) for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) p.set(x, yy, yy === y ? H('#c8ccd4') : yy === y + 2 ? H('#3a3a42') : H('#8a8a96'));
    }
    for (let y = 0; y < 38; y++) { p.set(15, y, H('#2a2a32')); p.set(16, y, H('#6a6a76')); p.set(17, y, H('#4a4a56')); }
  }),
  chest: building(16, 16, (p) => {
    shadowEllipse(p, 8, 14, 7, 1, H('#2a1a0a40'));
    rect(p, 1, 3, 14, 11, OUT); rect(p, 2, 4, 12, 9, WOOD[2]); rect(p, 2, 4, 12, 3, WOOD[3]); rect(p, 2, 7, 12, 1, WOOD[0]);
    rect(p, 7, 6, 2, 3, H('#ffd23a'));
  }),
  netpile: building(16, 20, (p) => {
    shadowEllipse(p, 8, 18, 7, 1, H('#2a1a0a40'));
    for (let y = 6; y < 18; y++) for (let x = 1; x < 15; x++) {
      const dx = (x + 0.5 - 8) / 7, dy = (y + 0.5 - 13) / 6;
      if (dx * dx + dy * dy > 1) continue;
      p.set(x, y, (x + y) % 3 === 0 || (x - y + 30) % 3 === 0 ? H('#2a5a4a') : H('#4a8a6a'));
    }
    disc(p, 5, 9, 1.8, () => H('#f07a30')); disc(p, 11, 12, 1.8, () => H('#f07a30')); p.set(4, 8, H('#ffb070')); p.set(10, 11, H('#ffb070'));
  }),
  easel: building(16, 32, (p) => {
    shadowEllipse(p, 8, 30, 6, 1, H('#2a1a0a40'));
    line(p, 3, 30, 8, 2, WOOD[1]); line(p, 13, 30, 8, 2, WOOD[1]); line(p, 8, 4, 8, 30, WOOD[0]);
    rect(p, 1, 6, 14, 12, OUT); rect(p, 2, 7, 12, 10, H('#a8e0ff')); rect(p, 2, 12, 12, 5, H('#2aa8d8'));
    disc(p, 11, 9, 1.6, () => H('#ffd23a')); rect(p, 4, 11, 1, 4, H('#ffffff')); p.set(5, 12, H('#ffffff'));
    rect(p, 1, 18, 14, 1, WOOD[0]);
  }),
  painting: building(16, 16, (p) => {
    rect(p, 1, 2, 14, 11, H('#c8a040')); rect(p, 2, 3, 12, 9, H('#ffe8b0')); rect(p, 2, 8, 12, 4, H('#2a8ac8'));
    disc(p, 10, 6, 2, () => H('#f09a30')); for (let x = 2; x < 14; x++) if (x % 3) p.set(x, 8, H('#ffffff'));
  }),
  shipwheel: building(16, 16, (p) => {
    disc(p, 8, 8, 6, (d) => (d > 4.5 && d <= 6 ? WOOD[2] : d < 1.6 ? WOOD[3] : 0));
    for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; line(p, 8, 8, Math.round(8 + Math.cos(a) * 7.5), Math.round(8 + Math.sin(a) * 7.5), WOOD[1]); }
  }),
  lamp: building(16, 32, (p) => {
    // a standing lamp with a pleated shade, glowing
    shadowEllipse(p, 8, 30, 5, 1, H('#2a1a0a40'));
    for (let y = 2; y < 22; y++) for (let x = 0; x < 16; x++) { const d = Math.hypot(x - 7.5, y - 8); if (d < 8) p.set(x, y, H(d < 4 ? '#fff4b030' : '#fff4b018')); }
    for (let y = 3; y < 11; y++) { const half = 3 + (y - 3) * 0.5; for (let x = Math.round(8 - half); x <= Math.round(8 + half); x++) p.set(x, y, Math.abs(x - 8) > half - 1 || y === 3 ? H('#8a5a20') : x % 2 ? H('#ffe8a0') : H('#f4d070')); }
    for (let y = 11; y < 29; y++) { p.set(7, y, H('#3a2a1a')); p.set(8, y, H('#8a6a4a')); }
    rect(p, 5, 28, 6, 2, H('#3a2a1a'));
  }),
  catbed: building(16, 16, (p) => {
    // a round basket with a cushion: a bed for a cat
    shadowEllipse(p, 8, 13, 7, 1, H('#2a1a0a40'));
    disc(p, 8, 9, 6.5, (d, x, y) => (d > 5.5 ? H('#5a3a14') : d > 3.8 ? ((x + y) % 2 ? H('#c89c5c') : H('#a87a3a')) : H('#e86a8a')));
    disc(p, 8, 9, 2.5, (d) => (d < 1.2 ? H('#ff9ab4') : 0));
    p.set(6, 8, H('#ffffff')); p.set(10, 10, H('#ffffff'));
  }),
  basket: building(16, 16, (p) => {
    // a basket full of shells
    shadowEllipse(p, 8, 14, 6, 1, H('#2a1a0a40'));
    for (let y = 7; y < 14; y++) for (let x = 2; x < 14; x++) p.set(x, y, x === 2 || x === 13 || y === 13 ? H('#5a3a14') : (x + y) % 2 ? H('#c89c5c') : H('#a87a3a'));
    p.blit(SCALLOP, 2, 3); p.blit(CONCH, 8, 2); p.blit(STAR_R, 5, 1);
  }),
  stool: building(16, 16, (p) => {
    shadowEllipse(p, 8, 14, 5, 1, H('#2a1a0a40'));
    rect(p, 3, 5, 10, 4, OUT); rect(p, 4, 6, 8, 2, WOOD[3]);
    for (const x of [4, 11]) for (let y = 9; y < 14; y++) p.set(x, y, WOOD[0]);
  }),
  oars: building(16, 16, (p) => {
    // two crossed oars on the wall
    line(p, 2, 14, 13, 2, WOOD[1]); line(p, 3, 14, 14, 2, WOOD[3]);
    line(p, 13, 14, 2, 2, WOOD[1]); line(p, 12, 14, 1, 2, WOOD[3]);
    for (const [x, y] of [[1, 2], [14, 2]]) { rect(p, x - 1, y - 1, 3, 4, H('#2a7ad0')); }
  }),
  chart: building(32, 16, (p) => {
    rect(p, 1, 1, 30, 13, H('#8a6a3a')); rect(p, 2, 2, 28, 11, H('#f4e8c8'));
    for (let y = 2; y < 13; y++) for (let x = 2; x < 30; x++) if (vnoise(x, y, 6, 870) > 0.6) p.set(x, y, H('#c8b080'));
    line(p, 6, 10, 24, 4, H('#e03a30')); p.set(24, 4, H('#2a2a32')); p.set(25, 4, H('#2a2a32'));
    for (const [x, y] of [[8, 5], [20, 9], [14, 7]]) p.set(x, y, H('#2a7ad0'));
  }),
};

// ---------------------------------------------------------------- register the decor

const add = (name: string, p: Pix, size: [number, number]) => { DECOR[name] = p; DECOR_SIZE[name] = size; };
add('bc_hut', HUT, [3, 2]);
add('bc_exchange', EXCHANGE, [4, 2]);
add('bc_boat', BOAT, [3, 1]);
add('bc_nets', NETS, [2, 1]);
add('bc_parasol_r', parasol('#f04a4a', '#ffc23a'), [2, 1]);
add('bc_parasol_b', parasol('#2a7ad0', '#f07ab0'), [2, 1]);
add('bc_parasol_y', parasol('#ffc23a', '#30c8c0'), [2, 1]);
add('bc_lounger', LOUNGER, [1, 1]);
add('bc_station', STATION, [8, 3]);
add('bc_hotel', HOTEL, [7, 3]);
add('bc_hotel2', HOTEL2, [6, 3]);
add('bc_villa', VILLA, [4, 2]);
add('bc_pool', POOL, [3, 2]);
add('bc_hotelgate', HOTELGATE, [2, 1]);
add('bc_tide', TIDE, [4, 2]);
add('bc_rope', ROPE, [2, 1]);
add('bc_wheel', WHEEL, [4, 2]);
add('bc_shop', SHOP, [4, 2]);
add('bc_postbox', POSTBOX, [1, 1]);
add('bc_yacht', YACHT, [3, 2]);
add('bc_buoy', BUOY, [1, 1]);
add('bc_lighthouse', LIGHTHOUSE, [3, 3]);
add('bc_cottage', COTTAGE, [4, 2]);
add('bc_dive', DIVE, [4, 2]);
add('bc_tower', TOWER, [2, 2]);
add('bc_cabins', CABINS, [3, 1]);
add('bc_sandcastle', SANDCASTLE, [1, 1]);
add('bc_surf', SURF, [1, 1]);
add('bc_rockpool', ROCKPOOL, [2, 2]);
add('bc_icecart', ICECART, [2, 1]);
add('bc_rental', RENTAL, [2, 2]);
add('bc_hammock', HAMMOCK, [3, 1]);
add('bc_palm', PALM_TALL, [1, 1]);
add('bc_kayak', KAYAK, [2, 1]);
add('bc_scope', SCOPE, [1, 1]);
add('bc_palmpot', PALMPOT, [2, 1]);
add('bc_house_y', villa('#fae6a0', '#2e8a6a'), [4, 2]);
add('bc_house_p', villa('#f8c8d4', '#2a6ab8'), [4, 2]);
add('bc_house_m', villa('#c8ecd8', '#c25a32'), [4, 2]);
add('bc_tiki', TIKI, [3, 2]);
add('bc_dolphins', DOLPHINS, [3, 2]);
add('bc_driftwood', DRIFTWOOD, [2, 1]);
add('bc_bed', FURN.bed, [1, 2]);
add('bc_shelf', FURN.shelf, [1, 1]);
add('bc_kitchen', FURN.kitchen, [2, 1]);
add('bc_dtable', FURN.dtable, [2, 1]);
add('bc_armchair', FURN.armchair, [1, 1]);
add('bc_aquarium', FURN.aquarium, [2, 1]);
add('bc_lens', FURN.lens, [2, 1]);
add('bc_spiral', FURN.spiral, [2, 2]);
add('bc_chest', FURN.chest, [1, 1]);
add('bc_netpile', FURN.netpile, [1, 1]);
add('bc_easel', FURN.easel, [1, 1]);
add('bc_painting', FURN.painting, [1, 1]);
add('bc_shipwheel', FURN.shipwheel, [1, 1]);
add('bc_chart', FURN.chart, [2, 1]);
add('bc_lamp', FURN.lamp, [1, 1]);
add('bc_catbed', FURN.catbed, [1, 1]);
add('bc_basket', FURN.basket, [1, 1]);
add('bc_stool', FURN.stool, [1, 1]);
add('bc_oars', FURN.oars, [1, 1]);

// ---------------------------------------------------------------- animals

NPCS.bc_pelican = sprite({ k: '#2a2a32', w: '#ffffff', W: '#d8dce6', g: '#9aa4b4', c: '#2a6ab8', C: '#1e4a8a', y: '#ffc23a', o: '#f08a30', O: '#c8641e', e: '#101010' }, [
  '....kkkkk.......',
  '...kcccccck.....',
  '..kCcccccckkk...',
  '..kwwwwwwk......',
  '..kwwekwwkkkkkk.',
  '..kwwwwwkyyyyyyk',
  '...kwwwkoooooook',
  '...kwwwkOooookk.',
  '..kwwwwwkOOkk...',
  '.kWwwwwwwk......',
  'kgWwwwwwwwk.....',
  'kggWwwwwwwk.....',
  '.kggWWwwwWk.....',
  '..kkgWWWWk......',
  '....koko.k......',
  '....kk.kk.......',
]);
NPCS.bc_seaturtle = sprite({ k: '#1a2a1a', s: '#b8783a', S: '#8a5428', l: '#e0a860', g: '#6ab86a', G: '#3e8a4a', e: '#101010', h: '#f4e0a0', H: '#c8a868', b: '#e03a30' }, [
  '................',
  '.....hhhhhh.....',
  '....hhhhhhhh....',
  '...kHHbbbbHHk...',
  '....kggggggk....',
  '...kgeggggegk...',
  '...kggggggggk...',
  '....kgGggGgk....',
  '..kkkkkkkkkkkk..',
  '.kgklslsslslkgk.',
  'kggksslsslsskggk',
  'kgkSssSssSssSkgk',
  '.kkSSsSSsSSsSkk.',
  '..kkSSSSSSSSkk..',
  '..kgk.kkkk.kgk..',
  '...k........k...',
]);
NPCS.bc_hermit = sprite({ k: '#3a1a14', p: '#f8c8b0', P: '#e09a80', d: '#b87060', w: '#fff4ea', r: '#f05a3a', R: '#b8342a', e: '#101010' }, [
  '................',
  '.......kkkkk....',
  '......kwpppPk...',
  '.....kwppkkpPk..',
  '.....kpPkwpkPk..',
  '.k.k.kpPkPPkdk..',
  'kek.ekpPPkkPdk..',
  '.kk.kkkpPPPddk..',
  '..kkrrrkddddk...',
  '.krrkrRrkkkk....',
  'krRkrrrRrk......',
  '.kk.krrRRrk.....',
  '...krkrkrk......',
  '...k.k.k.k......',
  '................',
  '................',
]);
NPCS.bc_otter = sprite({ k: '#2a1a10', b: '#8a5a30', B: '#6a4220', c: '#f0dcb8', e: '#101010', n: '#2a1a14', r: '#d83a30', R: '#a8221c', y: '#ffd23a', w: '#ffffff' }, [
  '................',
  '....kk....kk....',
  '...kbbkkkkbbk...',
  '...kbcccccccbk..'.slice(0, 16),
  '..kbceccccecbk..',
  '..kbcccnnccbk...',
  '...kbcwwwwcbk...',
  '....kkbbbbkk....',
  '...krrrwwrrrk...',
  '..kbrrRwwRrrbk..',
  '..kbkrrwyrrkbk..',
  '...kkrrwwrrkk...',
  '....kbbbbbbk....',
  '....kBk..kBk.kk.',
  '....kk....kkkbk.',
  '.............k..',
]);
NPCS.bc_retriever = sprite({ k: '#3a2410', g: '#e8b860', G: '#c08a3a', l: '#f8d890', e: '#101010', n: '#1a1010', r: '#e03a30', R: '#a8221c', w: '#ffffff', y: '#ffd23a' }, [
  '................',
  '....kkkkkkk.....',
  '...kgllllggk....',
  '..kGgggggggGk...',
  '.kGkgeggegkGk...',
  '.kGkggnnggkGk...',
  '..kkglwwlgkk....',
  '....kgggk.......',
  '...krrwwrrk.....',
  '..kgrrrwrrrgk...',
  '..kgrrwyrrrgk.kk',
  '..kgrrrrrrrgkkgk',
  '...kkRRRRRkk.kk.',
  '...kgk...kgk....',
  '...kk.....kk....',
  '................',
]);
NPCS.bc_starfish = sprite({ k: '#7a2a14', o: '#ff8a5a', O: '#e05a3a', l: '#ffc0a0', e: '#101010', w: '#ffffff', p: '#f07ab0', c: '#ffffff', C: '#d8dce6' }, [
  '.......cc.......',
  '......cCCc......',
  '......kook......',
  '.....kolook.....',
  '....kolooook....',
  'kkkkkolooookkkkk',
  'kooolowoowooOOOk',
  '.kOooweooweOOOk.',
  '..kOoooooooOOk..',
  '...kOoopppoOk...',
  '...kooppppOOk...',
  '..kooOkppkOOok..',
  '..kooOk..kOOok..',
  '.kooOk....kOOok.',
  '.kOOk......kOOk.',
  '.kkk........kkk.',
]);
NPCS.bc_octopus = sprite({ k: '#3a1430', p: '#c86ab8', P: '#9a4a8a', l: '#f0a8e0', e: '#101010', w: '#ffffff', m: '#2a9ad8', M: '#86d8f0' }, [
  '.....kkkkkk.....',
  '....kpllpppk....',
  '...kpllppppPk...',
  '...kplpppppPk...',
  '..kkmmmkkmmmkk..',
  '..kMMwkkkMMwk...',
  '..kmMMkpkmMMk...',
  '...kkkpppkkPk...',
  '...kpppkkppPk...',
  '..kppPPppPPppk..',
  '.kpPkpPkkPpkPpk.',
  'kpPk.kpkkpk.kPpk',
  'kPk.kpPk.kPpk.kk',
  '.kk.kPk...kPk...',
  '....kk.....kk...',
  '................',
]);
NPCS.bc_dolphin = sprite({ k: '#1a2a3a', b: '#6a9ac8', B: '#4a7aa8', l: '#a8cce8', w: '#ffffff', W: '#d8f4ff', e: '#101010', s: '#36c2d2' }, [
  '................',
  '.......kk.......',
  '......kbbk......',
  '....kkbbbbkk....',
  '...kblbbbbbBk...',
  '..klblbbbbbbBk..',
  '..kllewbbbbbBk..',
  '.kkllwbbbbbBBk..',
  'kwwkllbbbbbBk...',
  '.kkkwwllbbBBk...',
  '....kwwwlbBk....',
  '..WW.kwwwBk.WW..',
  '.WsWW.kkkk.WWsW.',
  'WsssWWWWWWWWsssW',
  '.sssssssssssss..',
  '................',
]);
NPCS.bc_puffin = sprite({ k: '#1a1a20', b: '#2a2a34', B: '#3a3a48', w: '#ffffff', W: '#d8dce6', o: '#f08a30', r: '#e03a30', y: '#ffd23a', g: '#5a5a6a', e: '#101010', c: '#2a4a8a', C: '#1e3470' }, [
  '.....kkkkk......',
  '....kcccccck....',
  '...kCCCCCCCk....',
  '....kbbbbbk.....',
  '...kbwwwwwbk....',
  '...kwekwwwbkk...',
  '...kwwwwwkrrrk..',
  '...kWwwwwkyyrok.',
  '....kbwwwkookk..',
  '...kbbwwwwbk....',
  '..kbbwwwwwwbk...',
  '..kbbwwwwwWbk...',
  '..kBbWwwwWWbk...',
  '...kkbbbbbkk....',
  '....kok.kok.....',
  '....kk...kk.....',
]);
NPCS.bc_iguana = sprite({ k: '#1a3a1a', g: '#5ab85a', G: '#3a8a40', l: '#9ae08a', s: '#2a2a32', S: '#5a5a6a', y: '#ffd23a', c: '#e8a040', e: '#101010', w: '#ffffff' }, [
  '................',
  '......kkkk......',
  '.....kglglk.....',
  '....kgggggGk....',
  '...kssssSsssk...',
  '...kswsskswsk...',
  '...kgggggggGk...',
  '....kgGkkgGk....',
  '..k.kglllgGk....',
  '.kck.kglllgGk...',
  '.kcck.kgllgGGk..',
  '..kcGkkglgGGkk..',
  '...kgGgggGGkGk..',
  '....kGk.kGk.kGk.',
  '....kk..kk...kGk',
  '..............k.',
]);

// ---------------------------------------------------------------- items

ITEMS.bc_card = sprite({ k: '#1a2a44', w: '#ffffff', b: '#2a7ad0', B: '#1e5aa8', y: '#ffd23a', s: '#86d8f0' }, [
  '................', '................', '................', '.kkkkkkkkkkkkkk.', '.kwwwwwwwwwwwwk.', '.kwbbbbbbwwyywk.', '.kwbsssbbwyyyyk.',
  '.kwbbbbbbwwyywk.', '.kwwwwwwwwwwwwk.', '.kBBBBBBBBBBBBk.', '.kwwwwwwwwwwwwk.', '.kwkkkwwkkkwwwk.', '.kkkkkkkkkkkkkk.', '................', '................', '................',
]);
ITEMS.bc_flag = sprite({ k: '#1a2a1a', g: '#3aba5a', G: '#2a8a40', l: '#8ae08a', p: '#c8ccd4', P: '#8a909c', y: '#ffd23a' }, [
  '..y.............', '..kk............', '..pkkkkkkkkkk...', '..pkllggggggk...', '..pklgggggggGk..', '..pkggggggggGk..', '..pkgggggggGGk..',
  '..pkggggggGGk...', '..pkkkkkkkkkk...', '..pP............', '..pP............', '..pP............', '..pP............', '..pP............', '.kkkk...........', '................',
]);
ITEMS.bc_lemonade = sprite({ k: '#2a3a4a', w: '#e8f8ff', y: '#fff08a', Y: '#f4d040', l: '#ffd23a', g: '#5ab85a', r: '#f04a4a', s: '#ffffff' }, [
  '..........r.....', '.........r......', '...lll..r.......', '..lYYlkrkkkk....', '..lYlkwrwwwwk...', '...lkyrryyyywk..', '....kyryYyyyyk..',
  '....kyyYyyyyyk..', '....kysyyyyYyk..', '....kyyyyyYyyk..', '....kyyyYyyyyk..', '....kwyyyyyywk..', '.....kwwwwwwk...', '......kkkkkk....', '................', '................',
]);
ITEMS.bc_stamp = sprite({ k: '#3a2a1a', w: '#fffaf0', s: '#86d8f0', y: '#ffd23a', o: '#f09a30', b: '#2a7ad0', d: '#e8dcc8' }, [
  '................', '................', '..w.w.w.w.w.w...', '.wkkkkkkkkkkkw..', '..ksssssssssk...', '.wksssyyssssk.w.', '..kssyyyysssk...',
  '.wksssyysssskw..', '..kbbbbbbbbbk...', '.wkbbsbbbsbbkw..', '..kddddddddddk..'.slice(0, 16), '.wkkkkkkkkkkkw..', '..w.w.w.w.w.w...', '................', '................', '................',
]);
ITEMS.bc_necklace = sprite({ k: '#3a2a1a', c: '#8a6a3a', w: '#fff4ea', p: '#f8c4b4', P: '#d0907c', b: '#30c8c0', o: '#f26a44', O: '#b8442a' }, [
  '................', '..cc........cc..', '.c............c.', '.c............c.', '.c............c.', '..b..........b..', '...c........c...',
  '....kk....kk....', '...kwpk..kook...', '...kpwk..kOok...', '....kk.kk.kk....', '......kwpk......', '......kpwk......', '.......kk.......', '................', '................',
]);

// ---------------------------------------------------------------- the train ride

RIDE_LOOKS.beach = {
  sky: ['#3a9ae8', '#c4ecff'], cloud: '#ffffff', far: ['#1f9ad0', '#e8fcff'], hill: ['#f2d8a0', '#e8c888'], ground: '#f4dca8', groundD: '#d8b87a',
  fence: '#8a6038', farShape: 'sea', props: [PALMS[0], PALMS[1], HUT, PALM_TALL, VILLA],
};
