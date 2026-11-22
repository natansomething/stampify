/**
 * The Desert's pixel art (Paw Trails): rippled sand and dunes, sandstone cliffs, white salt with hexagon cracks, an
 * oasis pool with reeds and date palms; Bedouin tents, camels, adobe houses with beams and domes, the bazaar, the
 * ruins with columns, half-buried statues and carvings; the desert's animals, items and its train-ride look.
 * Light comes from the top left everywhere; outlines are dark warm brown, not black.
 */
import { DECOR, DECOR_SIZE, ITEMS, NPCS, RIDE_LOOKS, registerTheme, palette, vnoise, T, water, tallGrass, shadowEllipse, outlined, disc, line } from '../art';
import { hash, hex, Pix, sprite } from '../pix';

type At = (x: number, y: number) => string;

// ---------------------------------------------------------------- colour helpers

/** Scales a 0xRRGGBBAA colour's brightness (k < 1 darker). */
const scale = (c: number, k: number) => {
  const ch = (s: number) => Math.max(0, Math.min(255, Math.round(((c >>> s) & 255) * k)));
  return ((ch(24) << 24) | (ch(16) << 16) | (ch(8) << 8) | (c & 255)) >>> 0;
};
const H = (s: string) => hex(s);
const OUT = H('#3a2414');
const frac = (v: number) => v - Math.floor(v);

// ---------------------------------------------------------------- themes

/** Which look a theme gives the '#' tiles. */
type Wall = 'dunes' | 'cliff' | 'palms' | 'inside';
const WALL: Record<string, Wall> = { ds_sand: 'dunes', ds_rock: 'cliff', ds_town: 'cliff', ds_salt: 'cliff', ds_oasis: 'palms', ds_inside: 'inside' };
let cur = 'ds_sand';

const SAND = {
  ground: ['#e2b672', '#e8c07e', '#eec98a', '#f4d498'], grassDark: '#cc9c5c', grassLight: '#fbe4b2',
  path: '#d6a86c', pathDark: '#c69860', pathLight: '#dfb47a', pathEdge: '#a8783e',
  water: '#38b4bc', waterDeep: '#2496a6', waterLight: '#a4ece4', waterEdge: '#1c6672', foam: '#e4fff6', shadow: '#7a4a2048',
};

// ---------------------------------------------------------------- ground

/** Base sand tone at a world pixel (palette ground index 0-3). */
function sandTone(wx: number, wy: number): number {
  const n = vnoise(wx, wy, 28, 401) * 0.6 + vnoise(wx, wy, 9, 402) * 0.3 + (hash(wx, wy, 403) - 0.5) * 0.07;
  return n < 0.37 ? 0 : n < 0.55 ? 1 : n < 0.72 ? 2 : 3;
}

/** Wind ripples: wavy lines, in patches, a lit crest with a shadow under it. 1 crest, -1 trough, 0 none. */
function ripple(wx: number, wy: number): number {
  const field = vnoise(wx, wy, 54, 404);
  if (field < 0.5) return 0;
  const u = wy + wx * 0.18 + vnoise(wx, wy, 34, 405) * 12 + Math.sin(wx / 11) * 1.2;
  const ph = frac(u / 8) * 8;
  // lines break up into short dashes, fewer at the patch's edge
  if (vnoise(wx, wy, 5, 406 + Math.floor(u / 8)) < 0.45 + (0.62 - field) * 1.5) return 0;
  return ph < 1 ? 1 : ph < 2 ? -1 : 0;
}

function sand(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const C = palette();
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const r = ripple(wx, wy);
    p.set(ox + x, oy + y, r > 0 ? C.grassLight : r < 0 ? C.grassDark : C.ground[sandTone(wx, wy)]);
  }
  // a few grains: darker specks and light sparkles
  for (let k = 0; k < 3; k++) {
    const x = Math.floor(hash(tx, ty, 410 + k) * 16), y = Math.floor(hash(tx, ty, 420 + k) * 16);
    p.set(ox + x, oy + y, k ? C.grassDark : C.grassLight);
  }
}

/** White salt crust broken into hexagons (a jittered hex lattice: a pixel is a crack where two cells meet). */
function salt(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const C = palette();
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const [d1, d2, cell] = hexCells(wx, wy);
    const edge = d2 - d1;
    const tone = C.ground[Math.min(3, Math.floor(hash(cell, 7, 430) * 1.6 + vnoise(wx, wy, 16, 431) * 2.6))];
    let c = tone;
    if (edge < 1.3) c = C.grassLight; // the raised ridge where two plates meet
    else if (edge < 2.4) c = C.grassDark; // its shadow
    p.set(ox + x, oy + y, c);
  }
}
/** Distances to the two nearest hex-lattice centres and the id of the nearest. */
function hexCells(wx: number, wy: number): [number, number, number] {
  const S = 22, RY = S * 0.866;
  const gy = Math.floor(wy / RY);
  let d1 = 1e9, d2 = 1e9, id = 0;
  for (let j = gy - 1; j <= gy + 1; j++) {
    const off = (j & 1) * S / 2;
    const gx = Math.floor((wx - off) / S);
    for (let i = gx - 1; i <= gx + 1; i++) {
      const cx = i * S + off + (hash(i, j, 432) - 0.5) * 7, cy = j * RY + (hash(i, j, 433) - 0.5) * 7;
      const d = Math.hypot(wx - cx, wy - cy);
      if (d < d1) { d2 = d1; d1 = d; id = i * 7919 + j; } else if (d < d2) d2 = d;
    }
  }
  return [d1, d2, id];
}

/** Packed earth of the towns: sand-coloured clay with embedded stones, swept clean. */
function earth(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const C = palette();
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const n = vnoise(wx, wy, 18, 440) * 0.7 + (hash(wx, wy, 441) - 0.5) * 0.18;
    p.set(ox + x, oy + y, C.ground[n < 0.38 ? 0 : n < 0.55 ? 1 : n < 0.7 ? 2 : 3]);
  }
  for (let k = 0; k < 2; k++) {
    if (hash(tx, ty, 442 + k) < 0.4) continue;
    const x = 2 + Math.floor(hash(tx, ty, 444 + k) * 11), y = 2 + Math.floor(hash(tx, ty, 446 + k) * 11);
    p.set(ox + x, oy + y, C.grassDark); p.set(ox + x + 1, oy + y, C.grassDark); p.set(ox + x, oy + y - 1, C.grassLight);
  }
}

function ground(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  if (cur === 'ds_salt') return salt(p, ox, oy, tx, ty);
  if (cur === 'ds_town') return earth(p, ox, oy, tx, ty);
  sand(p, ox, oy, tx, ty);
  // the oasis: green patches in the sand
  if (cur === 'ds_oasis') {
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const wx = tx * T + x, wy = ty * T + y;
      const g = vnoise(wx, wy, 18, 450) * 0.8 + vnoise(wx, wy, 5, 452) * 0.2 + (hash(wx, wy, 451) - 0.5) * 0.16;
      if (g > 0.7) p.set(ox + x, oy + y, g > 0.8 ? H('#86ae4c') : g > 0.75 ? H('#a2b858') : H('#c4c272'));
    }
  }
}

// ---------------------------------------------------------------- paths

/** How far (0..1) a path pixel is from the path's border with the sand: soft edges, ragged with noise. */
function pathEdge(x: number, y: number, tx: number, ty: number, same: (dx: number, dy: number) => boolean): number {
  let d = 99;
  if (!same(-1, 0)) d = Math.min(d, x);
  if (!same(1, 0)) d = Math.min(d, 15 - x);
  if (!same(0, -1)) d = Math.min(d, y);
  if (!same(0, 1)) d = Math.min(d, 15 - y);
  if (!same(-1, -1)) d = Math.min(d, Math.hypot(x, y));
  if (!same(1, -1)) d = Math.min(d, Math.hypot(15 - x, y));
  if (!same(-1, 1)) d = Math.min(d, Math.hypot(x, 15 - y));
  if (!same(1, 1)) d = Math.min(d, Math.hypot(15 - x, 15 - y));
  return d + (vnoise(tx * T + x, ty * T + y, 4, 460) - 0.5) * 3;
}

/** A trodden caravan track: firmer, darker sand with hoof prints and pebbles, fading into the sand at its sides. */
function track(p: Pix, ox: number, oy: number, tx: number, ty: number, same: (dx: number, dy: number) => boolean) {
  const C = palette();
  ground(p, ox, oy, tx, ty);
  const horiz = same(-1, 0) || same(1, 0);
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const e = pathEdge(x, y, tx, ty, same);
    if (e < 1.5) continue;
    const wx = tx * T + x, wy = ty * T + y;
    const n = vnoise(wx, wy, 11, 461) * 0.85 + (hash(wx, wy, 462) - 0.5) * 0.12;
    let c = n < 0.55 ? C.path : C.pathLight;
    if (e < 4) c = hash(wx, wy, 463) < (e - 1.5) / 2.5 ? C.path : C.ground[sandTone(wx, wy)];
    p.set(ox + x, oy + y, c);
  }
  // hoof prints in two lines along the track, and a pebble or two
  for (let k = 0; k < 2; k++) {
    const a = 3 + k * 8 + Math.floor(hash(tx, ty, 464 + k) * 3), b = 4 + Math.floor(hash(tx, ty, 466 + k) * 8);
    const [x, y] = horiz ? [a, b] : [b, a];
    p.set(ox + x, oy + y, C.pathEdge); p.set(ox + x + 1, oy + y, C.pathEdge); p.set(ox + x, oy + y + 1, C.pathDark);
    p.set(ox + x + 2, oy + y + 1, C.pathEdge);
  }
  if (hash(tx, ty, 468) < 0.5) {
    const x = 3 + Math.floor(hash(tx, ty, 469) * 10), y = 3 + Math.floor(hash(tx, ty, 470) * 10);
    p.set(ox + x, oy + y, H('#8a6a4a')); p.set(ox + x + 1, oy + y, H('#6a4a30')); p.set(ox + x, oy + y - 1, H('#c8a888'));
  }
}

/** Town paving: sandstone flags in staggered rows, each bevelled; sand drifts over the edges. */
function flags(p: Pix, ox: number, oy: number, tx: number, ty: number, same: (dx: number, dy: number) => boolean) {
  const C = palette();
  ground(p, ox, oy, tx, ty);
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const e = pathEdge(x, y, tx, ty, same);
    if (e < 0.6) continue;
    const wx = tx * T + x, wy = ty * T + y;
    const row = Math.floor(wy / 6), sx = wx + (row % 3) * 4;
    const col = Math.floor(sx / 8), lx = sx - col * 8, ly = wy - row * 6;
    const id = hash(col, row, 471);
    let c = id < 0.3 ? C.pathDark : id < 0.8 ? C.path : C.pathLight;
    if (lx === 7 || ly === 5) c = C.pathEdge;
    else if (lx === 0 || ly === 0) c = scale(c, 1.08);
    else if (lx === 6 || ly === 4) c = scale(c, 0.93);
    if (e < 2.2 && hash(wx, wy, 472) < 0.6) c = C.ground[sandTone(wx, wy)];
    p.set(ox + x, oy + y, c);
  }
}

// ---------------------------------------------------------------- '#': dunes, cliffs, palms

/** Distance (px) from a pixel of a '#' tile to the nearest open tile (up to 3 tiles away). */
function openDist(wx: number, wy: number, tx: number, ty: number, at: At, open: boolean[][]): number {
  // a smooth minimum of the distances to each open tile, so inner corners come out rounded too
  let sum = Math.exp(-60 / 5);
  for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) {
    if (!open[j + 3][i + 3]) continue;
    const x0 = (tx + i) * T, y0 = (ty + j) * T;
    const dx = wx < x0 ? x0 - wx : wx > x0 + 15 ? wx - x0 - 15 : 0;
    const dy = wy < y0 ? y0 - wy : wy > y0 + 15 ? wy - y0 - 15 : 0;
    sum += Math.exp(-Math.hypot(dx, dy) / 5);
  }
  void at;
  return Math.max(0, -5 * Math.log(sum));
}

const DUNE = ['#b87a40', '#d29a5c', '#e8b672', '#f4cc8c', '#fde4b2'].map(H);

/**
 * Dunes: a height field (a mound rising from the open ground, with sinuous wind-blown crests: a long gentle windward
 * slope and a short steep slip face) shaded from the top left.
 */
function dunes(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const open: boolean[][] = [];
  let any = false;
  for (let j = -3; j <= 3; j++) { const r: boolean[] = []; for (let i = -3; i <= 3; i++) { const o = at(tx + i, ty + j) !== '#'; r.push(o); any ||= o; } open.push(r); }
  const hgt = (wx: number, wy: number) => {
    const d = (any ? openDist(wx, wy, tx, ty, at, open) : 60) + (vnoise(wx, wy, 9, 482) - 0.5) * 8 + (vnoise(wx, wy, 4, 484) - 0.5) * 2;
    const m = Math.max(0, Math.min(d, 30)) / 30;
    const mound = 1 - (1 - m) * (1 - m);
    const u = wy + wx * 0.3 + vnoise(wx, wy, 70, 480) * 34 + vnoise(wx, wy, 23, 483) * 9;
    const s = frac(u / 50);
    const crest = s < 0.8 ? Math.sin((s / 0.8) * Math.PI / 2) : (1 - s) / 0.2;
    return mound * 18 + crest * 10 * Math.min(1, mound * 1.4);
  };
  const Hs: number[] = [];
  for (let y = -1; y <= 16; y++) for (let x = -1; x <= 16; x++) Hs.push(hgt(tx * T + x, ty * T + y));
  const h = (x: number, y: number) => Hs[(y + 1) * 18 + (x + 1)];
  const C = palette();
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const base = h(x, y);
    if (base < 1.2) { p.set(ox + x, oy + y, C.ground[sandTone(wx, wy)]); continue; }
    const gx = h(x + 1, y) - h(x - 1, y), gy = h(x, y + 1) - h(x, y - 1);
    const lv = (gx * 0.7 + gy) * 0.55 + (hash(wx, wy, 481) - 0.5) * 0.18;
    let k = lv < -1.5 ? 0 : lv < -0.35 ? 1 : lv < 0.45 ? 2 : lv < 1.3 ? 3 : 4;
    // near the foot the slope fades into the sand's own tones
    if (base < 3.4) k = Math.min(k, 1); // a soft darker foot outlines where the dune starts
    if (k === 2 && ripple(wx, wy) > 0) k = 3;
    p.set(ox + x, oy + y, DUNE[k]);
  }
  // the sharp crest: a bright line where the windward slope ends at the slip face
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const a = h(x, y), b = h(x, y + 1), c = h(x, y - 1);
    if (a > 9 && a > c && a - b > 1.6) { p.set(ox + x, oy + y, DUNE[4]); if (y < 15) p.set(ox + x, oy + y + 1, DUNE[0]); }
  }
}

const CLIFF = {
  sand: ['#d49558', '#dca262', '#e4ae6e'].map(H),
  top: ['#a8623a', '#c47a48', '#d28c56', '#e4a86e'].map(H),
  face: ['#a8582e', '#c06a3a', '#d27e48', '#e09658', '#ecae70'].map(H),
  out: H('#4a2414'),
};
const TOWNWALL = {
  sand: ['#e2b672', '#e8c07e', '#eec98a'].map(H),
  top: ['#c8925a', '#d8a46a', '#e2b478', '#ecc690'].map(H),
  face: ['#a86434', '#bc7a44', '#cc8c52', '#d89c60', '#e8b478'].map(H),
  out: H('#4a2414'),
};
const SALTCLIFF = {
  sand: ['#c8b49c', '#d2c0a8', '#ddcdb6'].map(H),
  top: ['#7a6450', '#947a62', '#a88e74', '#c0a88c'].map(H),
  face: ['#6e5444', '#80644e', '#947458', '#a88866', '#bc9c78'].map(H),
  out: H('#2e1e16'),
};

/**
 * Sandstone cliffs: a rocky plateau on top, and where the rock meets open ground to the south a face up to two tiles
 * high with wavy strata, cracks, a lit rim and a dark foot. West and east ends show a narrow side.
 */
function cliff(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const P = cur === 'ds_salt' ? SALTCLIFF : cur === 'ds_town' ? TOWNWALL : CLIFF;
  const brick = cur === 'ds_town';
  const isW = (dx: number, dy: number) => at(tx + dx, ty + dy) === '#';
  const f0 = !isW(0, 1), f1 = isW(0, 1) && !isW(0, 2);
  // plateau
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    // flat rock slabs: a jittered grid of cells, each its own tone, split by dark cracks lit on their far side
    // the mesa top: sand blown over the rock, rippled, with a few bare slabs where the wind swept it clean
    const n = vnoise(wx, wy, 14, 490) * 0.75 + (hash(wx, wy, 491) - 0.5) * 0.1;
    let c = P.sand[n < 0.42 ? 0 : n < 0.64 ? 1 : 2];
    const r = ripple(wx + 300, wy);
    if (r > 0) c = P.sand[2]; else if (r < 0) c = P.sand[0];
    const rock = vnoise(wx, wy, 22, 492) + (hash(wx, wy, 495) - 0.5) * 0.05;
    if (rock > 0.74) {
      const [d1, d2, cell] = slabs(wx, wy);
      const [e1, e2] = slabs(wx - 1, wy - 1);
      c = P.top[1 + Math.floor(hash(cell, 3, 490) * 2)];
      if (d2 - d1 < 1.1) c = P.top[0];
      else if (e2 - e1 < 1.1) c = P.top[3];
      if (rock < 0.765) c = P.top[0];
    }
    p.set(ox + x, oy + y, c);
  }
  if (!(f0 || f1) && hash(tx, ty, 497) < 0.35) {
    const x = 3 + Math.floor(hash(tx, ty, 498) * 10), y = 3 + Math.floor(hash(tx, ty, 499) * 10);
    p.set(ox + x, oy + y, P.top[3]); p.set(ox + x + 1, oy + y, P.top[2]); p.set(ox + x, oy + y + 1, P.top[1]); p.set(ox + x + 1, oy + y + 1, P.top[0]); p.set(ox + x + 2, oy + y + 1, palette().shadow);
  }
  // the face
  if (f0 || f1) {
    const top = f1 ? 6 : f0 && !isW(0, -1) ? 4 : (isW(0, -1) && !f1 ? -99 : 4);
    const y0 = f1 ? 6 : f0 && isW(0, -1) ? 0 : 4;
    void top;
    for (let y = y0; y < T; y++) for (let x = 0; x < T; x++) {
      const wx = tx * T + x, wy = ty * T + y;
      const fy = f1 ? y - 6 : 10 + y; // depth into the face (0 at the rim)
      const band = Math.floor((wy + Math.sin(wx / 9) * 1.6 + vnoise(wx, wy, 14, 497) * 3) / 5);
      let k = [3, 2, 3, 1, 2, 3, 2][((band % 7) + 7) % 7];
      if (fy > 22) k -= 1;
      if (fy > 26) k -= 1;
      if (hash(wx, Math.floor(wy / 2), 498) < 0.06) k -= 1;
      let c = P.face[Math.max(0, Math.min(4, k))];
      // vertical cracks
      const crack = Math.floor(wx / 7);
      if (hash(crack, Math.floor(wy / 9), 499) < 0.22 && (wx % 7) === Math.floor(hash(crack, 1, 500) * 6)) c = P.face[0];
      if (brick) {
        // the town wall: courses of mud bricks under a smooth plaster band
        const row = Math.floor(wy / 4), bx = (wx + (row % 2) * 4) % 8;
        const id = hash(Math.floor((wx + (row % 2) * 4) / 8), row, 501);
        c = P.face[id < 0.3 ? 2 : id < 0.8 ? 3 : 4];
        if (wy % 4 === 3 || bx === 7) c = P.face[1];
        if (fy > 24) c = scale(c, 0.9);
      }
      p.set(ox + x, oy + y, c);
    }
    if (f1 || !isW(0, -1)) {
      // the rim: a lit lip of the plateau over the face
      const ry = f1 ? 6 : 4;
      for (let x = 0; x < T; x++) { p.set(ox + x, oy + ry - 1, P.top[3]); p.set(ox + x, oy + ry, P.out); p.set(ox + x, oy + ry + 1, P.face[4]); }
      if (brick) for (let x = 0; x < T; x++) {
        // merlons along the top of the wall
        if (((tx * T + x) % 8) < 5) { for (let y = ry - 4; y < ry; y++) p.set(ox + x, oy + y, ((tx * T + x) % 8) === 0 ? P.face[4] : ((tx * T + x) % 8) === 4 ? P.face[1] : P.face[3]); p.set(ox + x, oy + ry - 5, P.out); }
        else p.set(ox + x, oy + ry - 1, P.face[1]);
        if (((tx * T + x) % 8) === 0 || ((tx * T + x) % 8) === 5) for (let y = ry - 5; y < ry; y++) p.set(ox + x, oy + y, P.out);
      }
    }
    if (f0) for (let x = 0; x < T; x++) { p.set(ox + x, oy + 15, P.out); p.set(ox + x, oy + 14, P.face[0]); }
  }
  // outlines where the plateau meets open ground (north edge, sides)
  if (!isW(0, -1) && !f0) for (let x = 0; x < T; x++) { p.set(ox + x, oy, P.out); p.set(ox + x, oy + 1, P.top[3]); }
  if (!isW(-1, 0)) for (let y = 0; y < T; y++) { p.set(ox, oy + y, P.out); p.set(ox + 1, oy + y, f0 || f1 ? P.face[4] : P.top[3]); }
  if (!isW(1, 0)) for (let y = 0; y < T; y++) { p.set(ox + 15, oy + y, P.out); p.set(ox + 14, oy + y, f0 || f1 ? P.face[0] : P.top[0]); }
}

/** Voronoi cells on a jittered 14 px grid: distances to the nearest two points, and the nearest one's id. */
function slabs(wx: number, wy: number): [number, number, number] {
  const S = 14, gx = Math.floor(wx / S), gy = Math.floor(wy / S);
  let d1 = 1e9, d2 = 1e9, id = 0;
  for (let j = gy - 1; j <= gy + 1; j++) for (let i = gx - 1; i <= gx + 1; i++) {
    const cx = (i + 0.15 + hash(i, j, 497) * 0.7) * S, cy = (j + 0.15 + hash(i, j, 498) * 0.7) * S * 0.8 + wy * 0.2;
    const d = Math.hypot(wx - cx, (wy - cy) * 1.3);
    if (d < d1) { d2 = d1; d1 = d; id = i * 7919 + j; } else if (d < d2) d2 = d;
  }
  return [d1, d2, id];
}

/** Shadow the cliffs cast on the ground at their foot. */
function cliffShadow(p: Pix, ox: number, oy: number, at: At, tx: number, ty: number) {
  if (WALL[cur] !== 'cliff' || at(tx, ty - 1) !== '#') return;
  const s = palette().shadow;
  for (let x = 0; x < T; x++) { p.set(ox + x, oy, s); p.set(ox + x, oy + 1, s); if (hash(tx * T + x, ty, 501) < 0.5) p.set(ox + x, oy + 2, s); }
}

// ---------------------------------------------------------------- details: shrubs, flowers, pebbles, dry grass, reeds

const SHRUB = [
  sprite({ k: '#3a3a1a', g: '#7a8a3a', G: '#5a6a2a', l: '#a4b058', b: '#6a4a2a', s: '#7a4a2048' }, [
    '................',
    '................',
    '................',
    '................',
    '......k.k.......',
    '....kkgkgkk.....',
    '...klglgggGk....',
    '..kgllgggGGGk...',
    '..kglgggGgGGk...',
    '..kgggGGGGGGk...',
    '...kGGkGGGkk....',
    '....kkbkbk......',
    '.....sbbbsss....',
    '................',
    '................',
    '................',
  ]),
  // a dry tumbleweed
  sprite({ k: '#5a3a1a', b: '#a8804a', B: '#c8a062', l: '#e0c08a', s: '#7a4a2048' }, [
    '................',
    '................',
    '................',
    '................',
    '................',
    '.......kkk......',
    '.....kkblbkk....',
    '....kBlbkblBk...',
    '....kbkBlbkbk...',
    '....kBlbBkBbk...',
    '....kbBkbBbBk...',
    '.....kkbBbkk....',
    '......sskkss....',
    '................',
    '................',
    '................',
  ]),
];

function shrub(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const v = hash(tx, ty, 510) < 0.65 ? 0 : 1;
  p.blit(SHRUB[v], ox + Math.floor(hash(tx, ty, 511) * 4) - 2, oy + Math.floor(hash(tx, ty, 512) * 3) - 1, hash(tx, ty, 513) < 0.5);
}

function blossoms(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const f = (x: number, y: number, petal: number) => {
    p.set(ox + x, oy + y + 2, H('#6a8a3a')); p.set(ox + x - 1, oy + y + 3, H('#7a9a44')); p.set(ox + x + 1, oy + y + 3, H('#5a7a32'));
    p.set(ox + x, oy + y - 1, petal); p.set(ox + x - 1, oy + y, petal); p.set(ox + x + 1, oy + y, petal); p.set(ox + x, oy + y + 1, scale(petal, 0.8));
    p.set(ox + x, oy + y, H('#fff0b0'));
  };
  const cols = [H('#f4c430'), H('#e86a9a'), H('#f4c430'), H('#b07ae0')];
  for (let k = 0; k < 3; k++) f(3 + k * 4 + Math.floor(hash(tx, ty, 520 + k) * 3), 3 + Math.floor(hash(tx, ty, 523 + k) * 9), cols[Math.floor(hash(tx, ty, 526 + k) * 4)]);
}

function pebbles(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  for (let k = 0; k < 4; k++) {
    const x = 2 + Math.floor(hash(tx, ty, 530 + k) * 11), y = 2 + Math.floor(hash(tx, ty, 534 + k) * 11);
    const big = k === 0;
    const c = [H('#b88a5a'), H('#9a7458'), H('#d8c0a0'), H('#a86a40')][k];
    p.set(ox + x, oy + y, scale(c, 1.15)); p.set(ox + x + 1, oy + y, c); p.set(ox + x, oy + y + 1, c); p.set(ox + x + 1, oy + y + 1, scale(c, 0.7));
    if (big) { p.set(ox + x + 2, oy + y, c); p.set(ox + x + 2, oy + y + 1, scale(c, 0.7)); p.set(ox + x + 1, oy + y - 1, scale(c, 1.2)); }
    p.set(ox + x, oy + y + 2, palette().shadow); p.set(ox + x + 1, oy + y + 2, palette().shadow);
  }
}

/** Salt crystals heaped up in small cubes. */
function crystals(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  for (let k = 0; k < 3; k++) {
    const x = 2 + Math.floor(hash(tx, ty, 540 + k) * 10), y = 4 + Math.floor(hash(tx, ty, 543 + k) * 9);
    p.fill(ox + x, oy + y, 3, 3, H('#ffffff'));
    p.set(ox + x + 2, oy + y + 1, H('#c8d4dc')); p.set(ox + x + 2, oy + y + 2, H('#a8b8c4')); p.set(ox + x + 1, oy + y + 2, H('#c8d4dc'));
    p.set(ox + x - 1, oy + y + 3, H('#8a807444')); p.set(ox + x + 3, oy + y + 3, H('#8a807444'));
  }
}

const STRAW = ['#8a6a2a', '#b08a3a', '#d0aa50', '#ead07a'].map(H);
/** Dry desert grass: golden tufts, leaning with the wind. */
function dryGrass(p: Pix, ox: number, oy: number, tx: number, ty: number, front = false) {
  for (const [row, base] of [[0, 8], [1, 15]] as const) {
    if (front && row === 0) continue;
    for (let k = 0; k < 3; k++) {
      const cx = 2 + k * 5 + Math.floor(hash(tx * 3 + k, ty * 2 + row, 550) * 3);
      const by = base - Math.floor(hash(tx + k, ty + row, 551) * 2);
      const hgt = 6 + Math.floor(hash(tx * 5 + k, ty + row, 552) * 3);
      for (const [lean, len] of [[-2, hgt - 2], [0, hgt], [2, hgt - 1], [1, hgt - 3]] as [number, number][]) {
        for (let i = 0; i < len; i++) {
          const t = i / (len - 1);
          const bx = cx + Math.round((lean + 1) * t * 0.8);
          p.set(ox + bx, oy + by - i, STRAW[Math.min(3, Math.floor(t * 3.99))]);
          if (i < len - 2 && i > 0) p.set(ox + bx - 1, oy + by - i, STRAW[0]);
        }
      }
      if (!front) { p.set(ox + cx - 1, oy + by + 1, palette().shadow); p.set(ox + cx + 2, oy + by + 1, palette().shadow); }
    }
  }
}

/** Reeds along the oasis shore: green stalks with brown heads, on the side facing the water. */
function reeds(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const wet = (dx: number, dy: number) => at(tx + dx, ty + dy) === '~';
  const spots: [number, number][] = [];
  if (wet(0, 1)) spots.push([2, 15], [7, 14], [12, 15]);
  if (wet(0, -1)) spots.push([3, 7], [10, 6]);
  if (wet(-1, 0)) spots.push([2, 6], [3, 13]);
  if (wet(1, 0)) spots.push([12, 7], [13, 14]);
  if (!spots.length) spots.push([4, 12], [10, 14]);
  const G = ['#2e5a24', '#3e7a2e', '#5a9a3a', '#84bc52'].map(H);
  spots.forEach(([x0, y0], i) => {
    for (let s = 0; s < 3; s++) {
      const x = x0 + s * 2 - 2, len = 7 + Math.floor(hash(tx * 3 + i, ty + s, 560) * 5);
      const lean = s - 1;
      for (let k = 0; k < len; k++) {
        const t = k / len;
        p.set(ox + x + Math.round(lean * t * 1.5), oy + y0 - k, G[Math.min(3, 1 + Math.floor(t * 3))]);
        if (k < len - 3) p.set(ox + x + Math.round(lean * t * 1.5) - 1, oy + y0 - k, G[0]);
      }
      if (s !== 1) { const hx = ox + x + Math.round(lean * 1.5), hy = oy + y0 - len; p.set(hx, hy, H('#6a3a1a')); p.set(hx, hy + 1, H('#8a5428')); p.set(hx, hy + 2, H('#6a3a1a')); }
    }
  });
}

// ---------------------------------------------------------------- blocked tiles: boulders, salt mounds, low walls

const BOULDER = [
  sprite({ k: '#4a2414', a: '#f0b880', b: '#d8925a', c: '#b8703e', d: '#8a4e2a', s: '#7a4a2050' }, [
    '................',
    '................',
    '................',
    '.....kkkkk......',
    '...kkaaabbkk....',
    '..kaaaabbbbck...',
    '..kaabbbbbccck..',
    '.kabbbbbbcccdk..',
    '.kabbbbbcccddk..',
    '.kbbbbccccdddk..',
    '.kcbbcccccddddk.',
    '..kccccccdddddk.',
    '..kkdddddddddk..',
    '....kkkkkkkkk...',
    '...sssssssssss..',
    '................',
  ]),
  // a cut block of old masonry, half sunk in the sand
  sprite({ k: '#4a2414', a: '#f4c890', b: '#e0aa70', c: '#c88a52', d: '#a86a3a', e: '#f8dca8', s: '#7a4a2050' }, [
    '................',
    '................',
    '................',
    '................',
    '..kkkkkkkkkkk...',
    '..keeeeeeeeeak..',
    '..kaaaaaaaaaack.',
    '..kbbbbbbbbbbcdk',
    '..kbbdbbbbbbbcdk',
    '..kbbbbbbdbbbcdk',
    '..kccbbbbbbbccdk',
    '..kcccccccccccdk',
    '.eekkkkkkkkkkkke',
    '.eeeesssssssseee',
    '................',
    '................',
  ]),
];
const SALTMOUND = sprite({ k: '#6a6a74', w: '#ffffff', W: '#eef2f6', g: '#d0d8e0', G: '#aab4c0', s: '#5a504840' }, [
  '................',
  '................',
  '................',
  '................',
  '.......kk.......',
  '......kwWk......',
  '.....kwwWgk.....',
  '....kwwWWggk....',
  '...kwwWWWgGGk...',
  '..kwWWWWggGGGk..',
  '..kWWWgggGGGGk..',
  '.kWWgggGGGGGGGk.',
  '.kgggGGGGGGGGGk.',
  '..kkkkkkkkkkkkk.',
  '..sssssssssssss.',
  '................',
]);

/** A low mud-brick wall (the '=' tiles), joining its neighbours. */
function adobeWall(p: Pix, ox: number, oy: number, left: boolean, right: boolean, tx: number) {
  const x0 = left ? 0 : 2, x1 = right ? 16 : 14;
  const face = ['#b8743e', '#c8844a', '#d8965a'].map(H), cap = H('#ecb87c'), out = OUT;
  for (let y = 3; y < 15; y++) for (let x = x0; x < x1; x++) {
    let c = y < 6 ? (y === 3 ? out : cap) : face[(Math.floor(((tx * T + x) + (Math.floor(y / 3) % 2) * 3) / 6) + Math.floor(y / 3)) % 3];
    if (y >= 6 && ((tx * T + x + (Math.floor(y / 3) % 2) * 3) % 6 === 0 || y % 3 === 2)) c = face[0];
    if (y === 14) c = out;
    p.set(ox + x, oy + y, c);
  }
  if (!left) for (let y = 3; y < 15; y++) p.set(ox + x0, oy + y, out);
  if (!right) for (let y = 3; y < 15; y++) p.set(ox + x1 - 1, oy + y, out);
  for (let x = x0; x < x1; x++) p.set(ox + x, oy + 15, palette().shadow);
}

// ---------------------------------------------------------------- inside: carpets and plastered walls

function inside(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const c = at(tx, ty);
  if (c === '#') {
    const face = at(tx, ty + 1) !== '#';
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, (hash(tx * T + x, ty * T + y, 570) < 0.5) ? H('#6a3e22') : H('#74462a'));
    if (!face) return;
    // plastered clay wall with a painted band and a niche
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const wx = tx * T + x;
      let col = vnoise(wx, ty * T + y, 6, 571) < 0.5 ? H('#ecc896') : H('#e4be8a');
      if (y === 0) col = H('#8a5430');
      if (y >= 9 && y < 12) col = (wx % 6 < 3) ? H('#2a7a9a') : H('#d8503a');
      if (y === 8 || y === 12) col = H('#a86a3a');
      if (y >= 13) col = H('#b07440');
      if (y === 15) col = H('#6a3e22');
      p.set(ox + x, oy + y, col);
    }
    if (tx % 3 === 1) for (let y = 2; y < 8; y++) for (let x = 5; x < 11; x++) {
      const arch = y === 2 && (x === 5 || x === 10);
      if (!arch) p.set(ox + x, oy + y, y === 2 || x === 5 ? H('#8a5430') : H('#b88050'));
    }
    return;
  }
  if (c === ':' && at(tx, ty - 1) === ':') {
    // (outside the room: the doorway's row repeated into the margin)
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, (hash(tx * T + x, ty * T + y, 570) < 0.5) ? H('#6a3e22') : H('#74462a'));
    return;
  }
  if (c === ':') {
    // the doorway: a woven mat
    for (let y = 2; y < 14; y++) for (let x = 1; x < 15; x++) p.set(ox + x, oy + y, y === 2 || y === 13 || x === 1 || x === 14 ? H('#6a3e1a') : (x + y) % 3 ? H('#c89a52') : H('#a87a3a'));
    return;
  }
  // a big carpet across the room: border, field and medallions, from the tile's position in the room
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const bx = wx - 16, by = wy - 32; // room interior starts at tile (1, 2)
    const W = 9 * 16, Hh = 6 * 16;
    const ex = Math.min(bx, W - 1 - bx), ey = Math.min(by, Hh - 1 - by), e = Math.min(ex, ey);
    let col: number;
    if (e < 0) col = H('#8a5a34');
    else if (e < 2) col = H('#5a1e1a');
    else if (e < 6) col = ((Math.floor(wx / 3) + Math.floor(wy / 3)) % 2) ? H('#e8b048') : H('#2a5a8a');
    else if (e < 7) col = H('#f0e0c0');
    else {
      const cx = ((wx % 32) + 32) % 32 - 16, cy = ((wy % 32) + 32) % 32 - 16;
      const d = Math.abs(cx) + Math.abs(cy);
      col = d < 4 ? H('#f0d070') : d < 7 ? H('#2a5a8a') : d < 9 ? H('#f0e0c0') : H('#b8342a');
      if (d >= 9 && (wx + wy) % 4 === 0) col = H('#a02a22');
    }
    p.set(ox + x, oy + y, col);
  }
}


// ---------------------------------------------------------------- homes: adobe rooms, tents and salt houses

const CARPETS: Record<string, { edge: string; band: [string, string]; line: string; field: string; fieldD: string; med: [string, string] }> = {
  r: { edge: '#5a1e1a', band: ['#e8b048', '#2a5a8a'], line: '#f0e0c0', field: '#b8342a', fieldD: '#9a2a22', med: ['#f0d070', '#2a5a8a'] },
  y: { edge: '#1a2a4a', band: ['#f0e0c0', '#c8502a'], line: '#e8b048', field: '#2a5a8a', fieldD: '#22487a', med: ['#f0e0c0', '#c8502a'] },
};

/** The extent (in tiles) of the run of `code` through (tx, ty): a carpet is a rectangle of one code. */
function extent(at: At, tx: number, ty: number, code: string): [number, number, number, number] {
  let x0 = tx, x1 = tx, y0 = ty, y1 = ty;
  while (x0 > tx - 14 && at(x0 - 1, ty) === code) x0--;
  while (x1 < tx + 14 && at(x1 + 1, ty) === code) x1++;
  while (y0 > ty - 14 && at(tx, y0 - 1) === code) y0--;
  while (y1 < ty + 14 && at(tx, y1 + 1) === code) y1++;
  return [x0, y0, x1, y1];
}

/** A knotted carpet over its rectangle of tiles: dark edge, a chequered border band, a light line, a field with a medallion. */
function carpet(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, code: string) {
  const [x0, y0, x1, y1] = extent(at, tx, ty, code);
  const K = CARPETS[code];
  const W = (x1 - x0 + 1) * T, Hh = (y1 - y0 + 1) * T, mx = W / 2, my = Hh / 2;
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const bx = (tx - x0) * T + x, by = (ty - y0) * T + y;
    const e = Math.min(bx, by, W - 1 - bx, Hh - 1 - by);
    let col: string;
    if (e < 1) col = K.edge;
    else if (e < 2) col = (bx + by) % 2 ? K.edge : K.band[0];
    else if (e < 5) col = ((Math.floor(bx / 3) + Math.floor(by / 3)) % 2) ? K.band[0] : K.band[1];
    else if (e < 6) col = K.line;
    else {
      const dx = Math.abs(bx + 0.5 - mx) / Math.max(1, mx - 6), dy = Math.abs(by + 0.5 - my) / Math.max(1, my - 6);
      const d = dx + dy;
      col = d < 0.28 ? K.med[0] : d < 0.42 ? K.med[1] : d < 0.48 ? K.line : ((bx + by) % 4 === 0 ? K.fieldD : K.field);
      // little corner motifs
      if (e < 12 && e >= 8 && (Math.min(bx, W - 1 - bx) < 12 && Math.min(by, Hh - 1 - by) < 12)) col = K.med[1];
    }
    p.set(ox + x, oy + y, H(col));
  }
  // fringe on the short ends
  if (tx === x0) for (let y = 1; y < T; y += 2) p.set(ox, oy + y, H('#f4ecd8'));
  if (tx === x1) for (let y = 1; y < T; y += 2) p.set(ox + 15, oy + y, H('#f4ecd8'));
}

/** A straw mat woven in a herringbone. */
function strawMat(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const [x0, y0, x1, y1] = extent(at, tx, ty, 'w');
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const bx = (tx - x0) * T + x, by = (ty - y0) * T + y;
    const W = (x1 - x0 + 1) * T, Hh = (y1 - y0 + 1) * T;
    const e = Math.min(bx, by, W - 1 - bx, Hh - 1 - by);
    const herring = ((bx + (Math.floor(by / 2) % 2 ? by : -by)) & 3) < 2;
    p.set(ox + x, oy + y, e < 1 ? H('#7a5420') : e < 2 ? H('#a87a38') : herring ? H('#d8b468') : H('#c09a50'));
  }
}

function roomFloor(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    let c: number;
    if (cur === 'ds_tentin') {
      c = SAND_T[Math.min(2, 1 + Math.floor(vnoise(wx, wy, 20, 703) * 1.99))];
      if (hash(wx, wy, 704) < 0.02) c = H('#cc9c5c');
    } else if (cur === 'ds_saltin') {
      const row = Math.floor(wy / 8), sx = (wx + (row % 2) * 6) % 12;
      const id = hash(Math.floor((wx + (row % 2) * 6) / 12), row, 700);
      c = wy % 8 === 7 || sx === 11 ? H('#b8b2a6') : id < 0.4 ? H('#e4e0d8') : id < 0.8 ? H('#ece8e0') : H('#f4f2ec');
      if (wy % 8 === 0 && sx !== 11) c = H('#fbfaf6');
    } else {
      // terracotta tiles, a few with a painted star
      const gx = Math.floor(wx / 8), gy = Math.floor(wy / 8), lx = wx % 8, ly = wy % 8;
      const id = hash(gx, gy, 701);
      c = lx === 7 || ly === 7 ? H('#8a4a2a') : id < 0.35 ? H('#c0683e') : id < 0.75 ? H('#cc7646') : H('#d68450');
      if (lx === 0 || ly === 0) c = scale(c, 1.08);
      if (id > 0.93 && lx > 1 && lx < 6 && ly > 1 && ly < 6 && (lx === 3 || lx === 4 || ly === 3 || ly === 4)) c = H('#2a7a9a');
    }
    p.set(ox + x, oy + y, c);
  }
}
const SAND_T = SAND.ground.map(H);

function roomWall(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const isW = (dx: number, dy: number) => at(tx + dx, ty + dy) === '#';
  const lower = !isW(0, 1), upper = isW(0, 1) && !isW(0, 2);
  // outside the room and the tops of walls: calm dark
  if (!lower && !upper) {
    p.fill(ox, oy, T, T, H('#21170f'));
    // side walls show their edge towards the room
    const wallC = cur === 'ds_tentin' ? H('#4a382c') : cur === 'ds_saltin' ? H('#d8d4cc') : H('#c89a68');
    if (!isW(0, -1)) { for (let x = 0; x < T; x++) { p.set(ox + x, oy, scale(wallC, 1.1)); p.set(ox + x, oy + 1, wallC); p.set(ox + x, oy + 2, H('#120c08')); } }
    if (!isW(1, 0)) { for (let y = 0; y < T; y++) { p.set(ox + 13, oy + y, H('#120c08')); p.set(ox + 14, oy + y, wallC); p.set(ox + 15, oy + y, scale(wallC, 0.8)); } }
    if (!isW(-1, 0)) { for (let y = 0; y < T; y++) { p.set(ox + 2, oy + y, H('#120c08')); p.set(ox + 1, oy + y, wallC); p.set(ox, oy + y, scale(wallC, 1.1)); } }
    return;
  }
  const v = hash(tx, ty - (upper ? 0 : 1), 702);
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const fy = upper ? y : y + 16; // height down the 2-tile wall
    let col: number;
    if (cur === 'ds_tentin') {
      const band = Math.floor(wx / 5) % 3;
      col = band === 0 ? H('#4a382c') : band === 1 ? H('#3e2f25') : H('#55422f');
      if (wx % 5 === 0) col = H('#7a6450');
      if (fy >= 18 && fy < 24) col = [H('#e8d4b0'), H('#c83a2a'), H('#e8d4b0'), H('#2a1a12'), H('#e8b048'), H('#2a1a12')][(fy - 18 + (Math.floor(wx / 4) % 2) * 3) % 6];
      if (fy < 3) col = scale(col, 0.7);
      if (fy === 31) col = H('#1a100a');
    } else if (cur === 'ds_saltin') {
      const row = Math.floor(wy / 5), bx = (wx + (row % 2) * 5) % 10;
      col = wy % 5 === 4 || bx === 9 ? H('#c4bcae') : wy % 5 === 0 ? H('#ffffff') : H('#eeece6');
      if (fy < 3) col = H(fy === 0 ? '#6a645c' : '#a8a296');
      if (fy >= 28) col = fy === 31 ? H('#6a645c') : H('#b8b0a2');
    } else {
      col = H('#eccb9a');
      if (fy < 3) col = fy === 0 ? H('#5a3418') : H('#9a6232'); // the beam under the ceiling
      if (fy === 3) col = H('#c89a68');
      if (fy >= 20 && fy < 24) col = (wx % 6 < 3) ? H('#2a7a9a') : H('#d8503a');
      if (fy === 19 || fy === 24) col = H('#a86a3a');
      if (fy >= 25) col = fy >= 30 ? H('#6a3e22') : H('#b8784a');
    }
    p.set(ox + x, oy + y, col);
  }
  // features across the two tiles: a window with curtains, a shelf with pots, a framed picture
  const feat = cur === 'ds_tentin' ? (v < 0.3 ? 'shelf' : '') : v < 0.3 ? 'window' : v < 0.5 ? 'shelf' : v > 0.82 ? 'picture' : '';
  const put = (x: number, fy: number, c: number) => { const yy = fy - (upper ? 0 : 16); if (yy >= 0 && yy < 16) p.set(ox + x, oy + yy, c); };
  if (feat === 'window') {
    for (let fy = 5; fy < 17; fy++) for (let x = 4; x < 12; x++) {
      if (!inArch(x - 4, fy - 5, 8, 0)) continue;
      const e = !inArch(x - 5, fy - 5, 8, 0) || !inArch(x - 3, fy - 5, 8, 0) || !inArch(x - 4, fy - 6, 8, 0) || fy === 16;
      put(x, fy, e ? H('#5a3418') : fy > 11 ? H('#f0d8a0') : (x + fy) % 2 ? H('#8ad0f0') : H('#b8e4f8'));
    }
    for (let fy = 6; fy < 17; fy++) { put(3, fy, H('#c83a2a')); put(4, fy, fy % 3 ? H('#e85a3a') : H('#a82a1a')); put(11, fy, fy % 3 ? H('#e85a3a') : H('#a82a1a')); put(12, fy, H('#c83a2a')); }
    for (let x = 2; x < 14; x++) put(x, 5, H('#5a3418'));
    for (let x = 3; x < 13; x++) put(x, 17, H('#a86a3a'));
  } else if (feat === 'shelf') {
    for (let x = 1; x < 15; x++) { put(x, 12, H('#5a3418')); put(x, 13, H('#9a6232')); put(x, 14, H('#00000030')); }
    const pots = [['#c86a3a', 3], ['#2a7a9a', 7], ['#e8d8b0', 11]] as [string, number][];
    for (const [c, x] of pots) { for (let fy = 8; fy < 12; fy++) for (let xx = 0; xx < 3; xx++) put(x + xx, fy, xx === 0 ? scale(H(c), 1.2) : xx === 2 ? scale(H(c), 0.75) : H(c)); put(x + 1, 7, H('#3a2414')); }
  } else if (feat === 'picture') {
    for (let fy = 6; fy < 15; fy++) for (let x = 3; x < 13; x++) {
      const e = x === 3 || x === 12 || fy === 6 || fy === 14;
      put(x, fy, e ? H('#b8862a') : fy < 10 ? H('#7ac8f0') : fy < 12 ? H('#e8b060') : H('#c88a40'));
    }
    put(9, 8, H('#f8e070')); put(6, 10, H('#3a8a3a')); put(6, 9, H('#3a8a3a')); put(5, 9, H('#3a8a3a')); put(7, 9, H('#3a8a3a'));
  }
}

function room(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const c = at(tx, ty);
  if (c === '#') return roomWall(p, ox, oy, tx, ty, at);
  if (c === ':' && at(tx, ty - 1) === ':') { p.fill(ox, oy, T, T, H('#21170f')); return; }
  roomFloor(p, ox, oy, tx, ty);
  if (c === ':') { for (let y = 2; y < 14; y++) for (let x = 1; x < 15; x++) p.set(ox + x, oy + y, y === 2 || y === 13 || x === 1 || x === 14 ? H('#6a3e1a') : (x + y) % 3 ? H('#c89a52') : H('#a87a3a')); return; }
  if (c === 'r' || c === 'y') carpet(p, ox, oy, tx, ty, at, c);
  if (c === 'w') strawMat(p, ox, oy, tx, ty, at);
  // a soft shadow along the foot of the wall
  if (at(tx, ty - 1) === '#') for (let x = 0; x < T; x++) { p.set(ox + x, oy, H('#00000038')); p.set(ox + x, oy + 1, H('#00000020')); }
}

// ---------------------------------------------------------------- the terrain hook

/**
 * The ground is drawn twice (two animation frames) but only water moves: tiles without water near them are kept
 * from frame 0 (by their position and the codes around them) and copied for frame 1.
 */
const keep = new Map<string, Pix>();
function terrainHook(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number): boolean {
  if (at(tx, ty) === '|') return false;
  let sig = cur + tx + ',' + ty + ':';
  for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) sig += at(tx + i, ty + j);
  if (!sig.includes('~')) {
    const k = keep.get(sig);
    if (k) { p.blit(k, ox, oy); return true; }
    const q = new Pix(T, T);
    drawTile(q, 0, 0, tx, ty, at, frame);
    if (keep.size > 6000) keep.clear();
    keep.set(sig, q);
    p.blit(q, ox, oy);
    return true;
  }
  return drawTile(p, ox, oy, tx, ty, at, frame);
}
function drawTile(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number): boolean {
  const c = at(tx, ty);
  if (cur === 'ds_inside') { inside(p, ox, oy, tx, ty, at); return true; }
  if (cur === 'ds_home' || cur === 'ds_tentin' || cur === 'ds_saltin') { room(p, ox, oy, tx, ty, at); return true; }
  if (c === '|') return false;
  const same = (dx: number, dy: number) => at(tx + dx, ty + dy) === c;
  if (c === '~') {
    water(p, ox, oy, tx, ty, same, frame);
    // glints on the pool that move between the frames
    if (hash(tx, ty, 580 + frame) < 0.35) { const x = 3 + Math.floor(hash(tx, ty, 582 + frame) * 9), y = 4 + Math.floor(hash(tx, ty, 584 + frame) * 8); p.set(ox + x, oy + y, H('#ffffff')); p.set(ox + x + 1, oy + y, H('#d8fff8')); }
    return true;
  }
  if (c === '#') {
    const w = WALL[cur];
    if (w === 'dunes') dunes(p, ox, oy, tx, ty, at);
    else if (w === 'cliff') cliff(p, ox, oy, tx, ty, at);
    else { ground(p, ox, oy, tx, ty); }
    return true;
  }
  if (c === ':') {
    const road = (dx: number, dy: number) => { const o = at(tx + dx, ty + dy); return o === ':' || o === '|'; };
    if (cur === 'ds_town' || cur === 'ds_oasis') flags(p, ox, oy, tx, ty, road); else track(p, ox, oy, tx, ty, road);
    cliffShadow(p, ox, oy, at, tx, ty);
    return true;
  }
  ground(p, ox, oy, tx, ty);
  // the sand curves into the pool's corners
  const wet = (dx: number, dy: number) => at(tx + dx, ty + dy) === '~';
  for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) if (wet(sx, 0) && wet(0, sy) && wet(sx, sy)) inletCorner(p, ox, oy, sx, sy, frame);
  cliffShadow(p, ox, oy, at, tx, ty);
  if (c === '"') { if (cur === 'ds_oasis') tallGrass(p, ox, oy, tx, ty, same); else dryGrass(p, ox, oy, tx, ty); }
  else if (c === 'r') shrub(p, ox, oy, tx, ty);
  else if (c === 'y') { if (cur === 'ds_oasis' || wet(0, 1) || wet(0, -1) || wet(1, 0) || wet(-1, 0)) reeds(p, ox, oy, tx, ty, at); else blossoms(p, ox, oy, tx, ty); }
  else if (c === 'w') { if (cur === 'ds_salt') crystals(p, ox, oy, tx, ty); else pebbles(p, ox, oy, tx, ty); }
  else if (c === 'o') p.blit(cur === 'ds_salt' ? SALTMOUND : BOULDER[cur === 'ds_rock' && hash(tx, ty, 590) < 0.6 ? 1 : 0], ox, oy, hash(tx, ty, 591) < 0.5);
  else if (c === '=') adobeWall(p, ox, oy, at(tx - 1, ty) === '=', at(tx + 1, ty) === '=', tx);
  return true;
}

/** Where the bank turns, the pool rounds into the land tile's corner (like the core inlet). */
function inletCorner(p: Pix, ox: number, oy: number, sx: number, sy: number, frame: number) {
  const C = palette(), R = 7;
  for (let y = 0; y < R; y++) for (let x = 0; x < R; x++) {
    const d = Math.hypot(R - x - 0.5, R - y - 0.5);
    if (d < R - 1) continue;
    const px = sx > 0 ? 15 - x : x, py = sy > 0 ? 15 - y : y;
    p.set(ox + px, oy + py, d < R ? C.waterEdge : d < R + 1 && sy < 0 ? C.foam : (x + y + frame) % 5 ? C.water : C.waterLight);
  }
}

/** The theme is switched by useTheme (core); the hook learns which of ours is in use by being registered per theme. */
const hookFor = (t: string) => (p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number) => { cur = t; return terrainHook(p, ox, oy, tx, ty, at, frame); };

const THINGS_OF = (t: string) => (code: string): string | undefined => {
  if (code === '#') return WALL[t] === 'dunes' ? 'ds_dune' : WALL[t] === 'cliff' ? 'ds_cliff' : WALL[t] === 'palms' ? 'palm' : undefined;
  if (t === 'ds_home' || t === 'ds_tentin' || t === 'ds_saltin') return code === '#' ? (t === 'ds_tentin' ? 'ds_tentwall' : 'wall') : code === 'r' || code === 'y' ? 'ds_carpet' : code === 'w' ? 'ds_mat' : code === ':' ? 'mat' : t === 'ds_tentin' ? 'sand' : 'floor';
  if (code === '.') return t === 'ds_salt' ? 'ds_salt' : t === 'ds_inside' ? 'ds_carpet' : 'sand';
  if (code === 'r') return t === 'ds_inside' ? undefined : 'ds_bush';
  if (code === 'w') return t === 'ds_salt' ? 'ds_salt' : 'stone';
  if (code === '~') return 'ds_pool';
  if (code === '=') return 'ds_wall';
  if (code === 'y') return t === 'ds_oasis' ? 'ds_reeds' : undefined;
  return undefined;
};

export const DS_THEMES = ['ds_sand', 'ds_rock', 'ds_town', 'ds_salt', 'ds_oasis', 'ds_inside'] as const;
registerTheme('ds_sand', SAND, { terrain: hookFor('ds_sand'), things: THINGS_OF('ds_sand') });
registerTheme('ds_rock', SAND, { terrain: hookFor('ds_rock'), things: THINGS_OF('ds_rock') });
registerTheme('ds_town', {
  ...SAND, ground: ['#d6a874', '#dcb07c', '#e2b886', '#e8c290'], grassDark: '#b88a56', grassLight: '#f0d0a0',
  path: '#e8c896', pathDark: '#d4b07e', pathLight: '#f4dcb0', pathEdge: '#a8804e',
}, { terrain: hookFor('ds_town'), things: THINGS_OF('ds_town') });
registerTheme('ds_salt', {
  ...SAND, ground: ['#e2ded6', '#e8e5de', '#eeece6', '#f4f2ee'], grassDark: '#ccc4b6', grassLight: '#ffffff',
  path: '#d4c8b4', pathDark: '#c0b29a', pathLight: '#e2d8c6', pathEdge: '#a89a82', shadow: '#5a504840',
  water: '#78cfc8', waterDeep: '#5ab8b4', waterLight: '#d0f6f0', waterEdge: '#4a8a8a', foam: '#ffffff',
}, { terrain: hookFor('ds_salt'), things: THINGS_OF('ds_salt') });
registerTheme('ds_inside', SAND, { terrain: hookFor('ds_inside'), things: THINGS_OF('ds_inside') });
for (const t of ['ds_home', 'ds_tentin', 'ds_saltin']) registerTheme(t, { ...SAND, shadow: '#2a1a0a44' }, { terrain: hookFor(t), things: THINGS_OF(t) });
// the oasis registers its trees (date palms) below, once they are drawn

// ---------------------------------------------------------------- date palms

/**
 * A date palm: a tall trunk patterned with old leaf bases, a crown of long feathered fronds arching down, and
 * clusters of orange dates under it. `h` is the trunk height; the result stands on its bottom row.
 */
function datePalm(seed: number, h: number, lean: number): Pix {
  const W = 32, top = 14, Hh = top + h + 4;
  const L = new Pix(W, Hh);
  const cx0 = 16;
  const cxAt = (y: number) => cx0 + lean * Math.pow((Hh - 3 - y) / h, 1.6) * 4;
  // trunk: diamond leaf scars, lit from the left
  const bark = ['#4a2c16', '#6e4424', '#8e5a30', '#b07a44', '#c8955a'].map(H);
  for (let y = top; y < Hh - 2; y++) {
    const c = Math.round(cxAt(y));
    const w = y > Hh - 7 ? 3 : 2;
    for (let x = c - w; x <= c + w; x++) {
      const t = (x - (c - w)) / (2 * w);
      const diamond = ((x - c + 8 + (y % 4 < 2 ? 0 : 1)) + y) % 4 === 0 || ((x - c + 8) - y + 400) % 4 === 0;
      let k = t < 0.3 ? 3 : t < 0.65 ? 2 : 1;
      if (diamond) k -= 1;
      if (t < 0.15 && !diamond) k = 4;
      L.set(x, y, bark[Math.max(0, k)]);
    }
  }
  // fronds, back ones first (darker), then the front ones
  const G = ['#24502a', '#2e6a32', '#43883a', '#62a446', '#8cc45c'].map(H);
  const cy = top + 1, cx = Math.round(cxAt(top));
  const fronds: [number, number, number, number][] = [ // angle (deg, 0 = right), length, droop, depth (0 back)
    [196, 14, 7, 0], [-16, 14, 7, 0], [250, 10, 2, 0], [290, 10, 2, 0],
    [168, 15, 10, 1], [12, 15, 10, 1], [228, 13, 5, 1], [312, 13, 5, 1],
    [140, 14, 12, 2], [40, 14, 12, 2], [110, 9, 10, 2], [70, 9, 10, 2], [270, 7, 0, 2],
  ];
  // dates hanging under the crown (drawn first so the fronds overlap them)
  for (const sx of [-4, 3]) {
    for (let k = 0; k < 9; k++) {
      const x = cx + sx + (k % 3), y = cy + 3 + Math.floor(k / 3) * 2 + (k % 2);
      L.set(x, y, [H('#e08a2a'), H('#c86a1e'), H('#f0a83a')][(k + seed) % 3]);
    }
    L.set(cx + sx + 1, cy + 2, H('#c8a050'));
  }
  for (const [ang, len, droop, depth] of fronds) {
    const a = (ang * Math.PI) / 180 + (hash(ang, seed, 600) - 0.5) * 0.2;
    const dx = Math.cos(a), dy = -Math.sin(a) * 0.75;
    const n = Math.round(len * 1.4);
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = cx + dx * len * t, y = cy + dy * len * t + droop * t * t;
      const rib = G[Math.min(4, 2 + depth)];
      L.set(Math.round(x), Math.round(y), depth === 2 && t < 0.6 ? G[4] : rib);
      // leaflets hang down from the rib, shorter towards the tip
      if (i > 1 && i % 2 === 0) {
        const ll = Math.max(1, Math.round((1 - t) * 3 + 1));
        for (let j = 1; j <= ll; j++) {
          L.set(Math.round(x + dx * j * 0.4), Math.round(y) + j, G[Math.max(0, depth + (j > 1 ? 0 : 1))]);
          L.set(Math.round(x - dx * j * 0.6), Math.round(y) + j, G[Math.max(0, depth)]);
        }
      }
    }
  }
  const p = new Pix(W, Hh);
  shadowEllipse(p, cx0 + 1, Hh - 3, 9, 2, H('#7a4a2048'));
  outlined(p, L, 0, 0, H('#1c2e14'));
  return p;
}

/** The oasis's '#' tiles: date palms of two shapes (32×44-ish, drawn over a 2×2 footprint). */
export const DATE_PALMS: Pix[] = [datePalm(1, 30, -1), datePalm(2, 26, 1)];

registerTheme('ds_oasis', SAND, { terrain: hookFor('ds_oasis'), trees: DATE_PALMS, things: THINGS_OF('ds_oasis') });

// ---------------------------------------------------------------- the desert's animals

NPCS.camel = sprite({ k: '#4a2a12', b: '#e0aa66', B: '#b8803e', l: '#f4d09a', e: '#1a1008', n: '#7a4a24', r: '#c83a2a', y: '#f2c040', W: '#ffffff' }, [
  '................',
  '..kkk...........',
  '.kbbbk..........',
  'kbbeWbk.........',
  'kbbbbbk.........',
  'kllbbbk.........',
  'knlbbbk...kkk...',
  '.kkkbbk..kbbbk..',
  '....kbbk.kbbbBk.',
  '....kbbbkbbbbbBk',
  '....kbbbbbbbbbBk',
  '....kryryryryrBk',
  '....kBrrrrrrrrBk',
  '....kbkbk..kbkBk',
  '....kbkbk..kbkbk',
  '....kkkkk..kkkkk',
]);
NPCS.fennec = sprite({ k: '#3a2210', b: '#f0d4a0', B: '#cfa66c', p: '#f0a090', w: '#fffaf0', e: '#140c06', W: '#ffffff', n: '#2a1a10', g: '#2e8a5a', G: '#1e6a40', y: '#f4d040' }, [
  '.kk..........kk.',
  '.kbk........kbk.',
  '.kpbk......kbpk.',
  '.kppbk....kbppk.',
  '..kpbbkkkkbbpk..',
  '..kbbbbbbbbbbk..',
  '..kbeWbbbbeWbk..',
  '..kbbbwwwwbbbk..',
  '...kbwwnnwwbk...',
  '....kkwwwwkk....',
  '....kggyggk.....',
  '...kbgggggbk....',
  '...kbgGgGgbk.kk.',
  '...kBbbbbbBkkbk.',
  '....kbk.kbk.kwk.',
  '....kk...kk..k..',
]);
NPCS.meerkat = sprite({ k: '#3a2614', b: '#d8b07a', B: '#b08850', l: '#f2dcb0', d: '#5a3a20', e: '#0c0804', W: '#ffffff', n: '#2a1a10', a: '#d8503a', A: '#b03a28', y: '#f4d060' }, [
  '......kkkk......',
  '.....kbbbbk.....',
  '....kbbbbbbk....',
  '....kdebbedk....',
  '....kdWbbWdk....',
  '.....kbnnbk.....',
  '......kllk......',
  '.....kbllbk.....',
  '...kkbllllbkk...',
  '...kbkllllkbk...',
  '....kaayyaak....',
  '....kbaaaaBk....',
  '....kbaaaaBk....',
  '....kbAAAABk.kk.',
  '....kbbkkbBkkbk.',
  '....kkk..kkk.k..',
]);
NPCS.jerboa = sprite({ k: '#3a2410', b: '#e6c48a', B: '#c49a5e', p: '#f0a8a0', w: '#fffaf0', e: '#100804', W: '#ffffff', n: '#3a1a10', v: '#2a68b8', V: '#1a4a8a', t: '#2a1a10' }, [
  '.kkk......kkk...',
  'kppbk....kbppk..',
  'kppbk....kbppk..',
  '.kpbkkkkkkbpk...',
  '..kbbbbbbbbk....',
  '.kbeWbbbbeWbk...',
  '.kbeebbbbeebk...',
  '..kbbbnnbbbk....',
  '...kkwwwwkk.....',
  '...kvwwwwvk.....',
  '..kvvwwwwvvk....',
  '..kbvwwwwvbk....',
  '...kVwwwwVk.....',
  '..kbbbkkbbbk..tt',
  '.kbbbk..kbbbkktt',
  '.kkkk....kkkkk..',
]);
NPCS.uromastyx = sprite({ k: '#3a2a0a', b: '#e8b040', B: '#b88424', l: '#f4d88a', d: '#8a5a1a', e: '#100c04', W: '#ffffff', g: '#4a4a5a', L: '#6ad0f0', s: '#ffffff' }, [
  '................',
  '....kkkkkkkk....',
  '...kgLsggLsgk...',
  '...kgLLggLLgk...',
  '...kbbbbbbbbk...',
  '..kbbeWbbeWbbk..',
  '..kbbbbbbbbbbk..',
  '..kblkkkkkklbk..',
  '...kllllllllk...',
  '...kkbdbbdbkk...',
  '..kbbbllllbbbk..',
  '.kbkbllllllbkbk.',
  '.kk.kllllllk.kk.',
  '....kbdbbdbk..k.',
  '...kbbk..kbbkkdk',
  '...kkk....kkkkk.',
]);
NPCS.oryx = sprite({ k: '#3a2a1c', w: '#f0e2c8', W: '#ffffff', g: '#d8c8b0', d: '#3a2a20', m: '#8a6650', n: '#c88a7a', e: '#0c0804', h: '#6a5a4a', b: '#2a5a9a', B: '#1a3a6a', y: '#f4c030', r: '#c83a2a' }, [
  '..h.........h...',
  '..hh.......hh...',
  '...h.......h....',
  '...hh.....hh....',
  '....hkkkkkh.....',
  '...kwwwwwwwk....',
  '..kwmeWwmeWwk...',
  '..kwmmwwwmmwk...',
  '...kgwwwwwgk....',
  '....kmwnwmk.....',
  '...kkkmmmkkk....',
  '..kbbbyrybbbk...',
  '..kwkbbbbbkwk...',
  '...kkBbbbBkk....',
  '....kgk.kgk.....',
  '....kdk.kdk.....',
]);
NPCS.dromedary = sprite({ k: '#4a2e16', b: '#f0d8b0', B: '#d0b080', l: '#fff0d8', e: '#140c06', W: '#ffffff', n: '#8a6040', r: '#d83a5a', y: '#f2c040', g: '#2a9a8a' }, [
  '....kk....kk....',
  '....kbk..kbk....',
  '....kbbkkbbk....',
  '...krbybgbyrk...',
  '...kbbbbbbbbk...',
  '...kbeWbbeWbk...',
  '...kbbbbbbbbk...',
  '....kbllllbk....',
  '....kllnnllk....',
  '...y.kkllkk.y...',
  '...kkbbbbbbkk...',
  '..kbbrgyygrbbk..',
  '..kbbrrrrrrbbk..',
  '...kBbbbbbbBk...',
  '...kbk....kbk...',
  '...kkk....kkk...',
]);
NPCS.caracal = sprite({ k: '#3a1e0e', b: '#d89a5a', B: '#b07438', t: '#1a1008', w: '#fff4e4', e: '#140804', n: '#2a1008', g: '#2a2a32', h: '#e0cc90', H: '#b8a066', s: '#8a6a3a' }, [
  '..t.........t...',
  '..tt.......tt...',
  '..kbk.....kbk...',
  '..kbbkhhhkbbk...',
  '..kbkhhhhhkbk...',
  '.kkkHHsHHHHkkk..',
  '..kbbbbbbbbbk...',
  '..kbgegbgegbk...',
  '..kbbgbbbgbbk...',
  '..kbbbwnwbbbk...',
  '...kbwwwwwbk....',
  '...kHkkkkkHk....',
  '..kbHhhhhhHbk...',
  '...kkhhshhkk.k..',
  '....kbk.kbk.kbk.',
  '....kk...kk..k..',
]);
NPCS.sandcat = sprite({ k: '#3a2a1a', b: '#e2cca0', B: '#bfa476', p: '#f0b0a0', w: '#fffaf0', e: '#203018', W: '#ffffff', n: '#c06a5a', d: '#8a6a4a', r: '#c89a52', R: '#9a7038' }, [
  '................',
  '.kk.........kk..',
  'kbbk.......kbbk.',
  'kbpbkkkkkkkbpbk.',
  '.kbbbbbbbbbbbk..',
  '.kbbeWbbbbeWbk..',
  '.kbbbbwnwbbbbk..',
  '..kbbwwwwwbbk...',
  '...kkkkkkkkk....',
  '...kbrrrrrbk....',
  '..kbrRRRRRrbk...',
  '..kbbrrrrrbbk...',
  '...kbbbbbbbk....',
  '...kdbkkkbdk.kk.',
  '...kbk...kbkkdk.',
  '...kk.....kkkk..',
]);
NPCS.porcupine = sprite({ k: '#2a1a10', q: '#5a4636', Q: '#8a7462', b: '#c89a6a', e: '#100804', W: '#ffffff', n: '#3a2010', a: '#f4f0e8', A: '#c8c0b0', f: '#8a5a3a' }, [
  '....k.k.k.k.....',
  '...kqkqkqkqk....',
  '..kqQqQqQqQqk...',
  '.kqQkkkkkkkQqk..',
  '.kQkbbbbbbbkQk..',
  'kqQkbeWbeWbkQqk.',
  'kQqkbbbnbbbkqQk.',
  '.kqQkbbbbbkQqk..',
  '.kQqQkkkkkQqQk..',
  'kqQqkaaaaakqQqk.',
  'kQqQkaAaAakQqQk.',
  '.kqQkaaaaakQqk..',
  '..kQkAaaaAkQk...',
  '...kkkfkfkkk....',
  '.....kfkfk......',
  '.....kk.kk......',
]);
NPCS.hoopoe = sprite({ k: '#2a1408', o: '#f0a050', O: '#d07a30', t: '#1a1008', e: '#0c0804', W: '#ffffff', w: '#fffaf0', b: '#7a5a3a', g: '#d8c8a8' }, [
  '...t.t.t........',
  '...okokot.......',
  '....ooooot......',
  '...kOoooook.....',
  '..kooeWoook.....',
  'kkkboooooOk.....',
  'k..kbOooooOk....',
  '....koooooOk....',
  '...kwtwtwtwtk...',
  '..ktwtwtwtwtwk..',
  '..kwtwtwtwtwtk..',
  '...kooooooOk.tk.',
  '....kOOOOOk.twt.',
  '.....kgkgk..twt.',
  '.....kgkgk...t..',
  '....kkk.kkk.....',
]);
NPCS.hyena = sprite({ k: '#2a1e10', b: '#c8a66e', B: '#9a7a48', d: '#5a4024', l: '#e8d4a8', e: '#100c04', W: '#ffffff', n: '#1a120a', h: '#7a8a4a', H: '#5a6a34', s: '#d83a30' }, [
  '.....kkkkk......',
  '....khhhhhk.....',
  '..kkkHHHHHkkk...',
  '..kHHHHHHHHHk...',
  '..kbkkkkkkkbk...',
  '..kbbbbbbbbbk...',
  '..kbeWbbbeWbk...',
  '..kdbbbbbbbdk...',
  '...kbbnnnbbk....',
  '....klllllk.....',
  '...kksssssk.....',
  '..kbdbsbbdbbk...',
  '..kbbbbdbbbbk...',
  '...kdbbbbbdk....',
  '....kbk.kbk.....',
  '....kk...kk.....',
]);
NPCS.saker = sprite({ k: '#2a1a10', b: '#8a5a34', B: '#6a4222', l: '#f4e8d0', s: '#b08458', c: '#2a3a6a', C: '#1a2448', y: '#f4c030', e: '#0c0804', W: '#ffffff', a: '#3a3a44' }, [
  '.....kkkkkk.....',
  '....kcccccck....',
  '...kkkkykkkkk...',
  '....kbbbbbbk....',
  '...kbeWbbeWbk...',
  '...kbbbaabbbk...',
  '....kbbyabbk....',
  '.....kbyybk.....',
  '....kbllllbk....',
  '...kbblslsbbk...',
  '..kbBbllllbBbk..',
  '..kbBblslsbBbk..',
  '...kbBllllBbk...',
  '....kkBBBBkk....',
  '.....kyk.kyk....',
  '....kkkk.kkkk...',
]);

// ---------------------------------------------------------------- items

ITEMS.ds_dates = sprite({ k: '#3a2210', b: '#c8964e', B: '#9a6a32', l: '#e8c07a', d: '#8a3a14', D: '#5a2008', h: '#c86a2a', g: '#5a8a3a' }, [
  '................',
  '................',
  '......g.g.......',
  '.....gdgdg......',
  '....kdhdhddk....',
  '...kdDhdDhddk...',
  '..kkkkkkkkkkkk..',
  '..klbllbllbllk..',
  '..kbBbbBbbBbbk..',
  '..klbllbllbllk..',
  '..kbBbbBbbBbbk..',
  '...klbllbllbk...',
  '...kBBBBBBBBk...',
  '....kkkkkkkk....',
  '................',
  '................',
]);
ITEMS.ds_scarf = sprite({ k: '#1a2a4a', b: '#3a7ad8', B: '#2a58a8', w: '#f4f0e0', y: '#f4c040', r: '#d84a3a' }, [
  '................',
  '................',
  '................',
  '...kkkkkkkkkk...',
  '..kbbbbbbbbbbk..',
  '..kbwbywbywbbk..',
  '..kbbbbbbbbbbk..',
  '..kBBBBBBBBBBk..',
  '..kbbrbbrbbrbk..',
  '..kbbbbbbbbbbk..',
  '..kBBBBBBBBBBk..',
  '...kkkkkkkkkkr..',
  '.........r.r.r..',
  '................',
  '................',
  '................',
]);
ITEMS.ds_goggles = sprite({ k: '#1a1a22', s: '#5a4a3a', S: '#3a2e24', g: '#8a8a96', L: '#6ad0f0', l: '#c8f4ff', D: '#3a90b8' }, [
  '................',
  '................',
  '................',
  '................',
  '..kkkk....kkkk..',
  '.kgLlgk..kgLlgk.',
  'skLlLDkkkkLlLDks',
  'skLLDDkggkLLDDks',
  'SkgDDgk..kgDDgkS',
  '.SkkkkS..SkkkkS.',
  '..SSSSSSSSSSSS..',
  '................',
  '................',
  '................',
  '................',
  '................',
]);
ITEMS.ds_rope = sprite({ k: '#3a2410', r: '#d4a860', R: '#a87a3a', l: '#f0cc88' }, [
  '................',
  '................',
  '.....kkkkkk.....',
  '...kkrlrlrlkk...',
  '..krlRkkkkRlrk..',
  '.krRk......kRrk.',
  '.klk..kkkk..klk.',
  '.krk.krlrlk.krk.',
  '.klk.kRkkRk.klk.',
  '.krk..kkkk..krk.',
  '.kRrk......krRk.',
  '..kRrRkkkkRrRk..',
  '...kkRrRrRrkk.kk',
  '.....kkkkkkRrRk.',
  '............kk..',
  '................',
]);
ITEMS.ds_water = sprite({ k: '#1a2a3a', m: '#a8b0bc', M: '#6a7482', w: '#e8f4fc', b: '#5ab8e8', B: '#2a88c8', c: '#8a5a30', s: '#c89a5a' }, [
  '................',
  '.......kk.......',
  '......kcck......',
  '......kmMk......',
  '....kkkkkkkk....',
  '...kwbbbbbbBk...',
  '..kwbbbbbbbbBk..',
  '..kwbwbbbbbbBk..',
  '..ksssssssssk...',
  '..kbbbbbbbbbBk..',
  '..kbbbbbbbbbBk..',
  '..kBbbbbbbbBBk..',
  '...kBBBBBBBBk...',
  '....kkkkkkkk....',
  '................',
  '................',
]);
ITEMS.ds_suncream = sprite({ k: '#3a2410', w: '#fff8ec', W: '#e0d8c8', o: '#f08a30', y: '#f8d040', r: '#d84a2a', b: '#3a8ad8' }, [
  '................',
  '..........kkk...',
  '.........kbbbk..',
  '........kwwwk...',
  '.......kwwwwk...',
  '......kwywwk....',
  '.....kwyyywk....',
  '....kwwyywk.....',
  '...kwwowwk......',
  '..kwooowk.......',
  '..kWoowWk.......',
  '..kWWWWk........',
  '...kkkk.........',
  '................',
  '................',
  '................',
]);
ITEMS.ds_souvenir = sprite({ k: '#3a1a0a', c: '#d07840', C: '#a85a2a', l: '#e89a60', b: '#2a6ab8', y: '#f4d040' }, [
  '................',
  '................',
  '..kk............',
  '.kcck...........',
  '.kclk....kk.....',
  '.kcck...kcck....',
  '..kck..kcllck...',
  '..kcckkclccccK..',
  '..kccccccccccck.',
  '...kbybybybybk..',
  '...kCcccccccCk..',
  '...kck.kck.kck..',
  '...kCk.kCk.kCk..',
  '...kkk.kkk.kkk..',
  '................',
  '................',
].map((r) => r.replace('K', 'k')));
ITEMS.pc_desert = sprite({ k: '#2a2a2a', s: '#7ac8f0', S: '#f8e0a0', d: '#e8b060', D: '#c88a40', g: '#3a8a3a', w: '#fffaf0', r: '#d83a30', y: '#fff0a0' }, [
  '................', '................', '................', '.kkkkkkkkkkkkkk.', '.ksssssyyskrrk.'.replace('k.', 'kk') + '', '.kssgssssssskkk.', '.ksgggsssssskwk.',
  '.ksskSSssssskwk.', '.kddkdDDdddkwwk.', '.kdkDDddddDkwwk.', '.kDDDddDDDDwwwk.', '.kkkkkkkkkkkkkk.', '................', '................', '................', '................',
].map((r) => (r.length === 15 ? r + '.' : r)));

// ---------------------------------------------------------------- drawing helpers for props and buildings

const rect = (p: Pix, x: number, y: number, w: number, h: number, c: number) => p.fill(x, y, w, h, c);
/** Plastered clay: a soft mottled tone, lighter at the top left, a few hairline cracks and patches where bricks show. */
function plaster(p: Pix, x0: number, y0: number, w: number, h: number, tones: number[], seed: number) {
  for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) {
    const n = vnoise(x, y, 7, seed) * 0.7 + (hash(x, y, seed + 1) - 0.5) * 0.18 - (y - y0) / h * 0.25 + (1 - (x - x0) / w) * 0.08;
    p.set(x, y, tones[n < 0.22 ? 0 : n < 0.45 ? 1 : n < 0.68 ? 2 : 3]);
  }
  // a patch of bare bricks where the plaster has fallen off
  if (w > 20) {
    const bx = x0 + 4 + Math.floor(hash(seed, 1, 7) * (w - 16)), by = y0 + 3 + Math.floor(hash(seed, 2, 7) * Math.max(1, h - 12));
    for (let y = 0; y < 6; y++) for (let x = 0; x < 9; x++) {
      if ((x === 0 || x === 8) && (y === 0 || y === 5)) continue;
      const brick = (y % 3 === 2) || ((x + (Math.floor(y / 3) % 2) * 2) % 4 === 3);
      p.set(bx + x, by + y, brick ? tones[0] : scale(tones[1], 0.92));
    }
  }
  // hairline cracks
  for (let k = 0; k < 2; k++) {
    let x = x0 + 2 + Math.floor(hash(seed, k, 9) * (w - 4)), y = y0 + 1 + Math.floor(hash(seed, k, 10) * (h / 2));
    for (let i = 0; i < 4 + k * 2; i++) { p.set(x, y, tones[0]); y++; x += hash(x, y, seed + 3) < 0.4 ? 1 : hash(x, y, seed + 4) < 0.3 ? -1 : 0; }
  }
}
/** An outlined box. */
function frame(p: Pix, x: number, y: number, w: number, h: number, c: number) {
  for (let i = 0; i < w; i++) { p.set(x + i, y, c); p.set(x + i, y + h - 1, c); }
  for (let i = 0; i < h; i++) { p.set(x, y + i, c); p.set(x + w - 1, y + i, c); }
}
/** Is (x, y) inside an arched opening of width w whose straight sides start r below its top (r = w/2)? */
const inArch = (x: number, y: number, w: number, top: number) => {
  const r = w / 2, cy = top + r;
  return y >= cy ? true : Math.hypot(x + 0.5 - r, y + 0.5 - cy) <= r;
};
/** An arched wooden door (or a dark doorway) with a stone frame, bottom at y1. */
function archDoor(p: Pix, x: number, y1: number, w: number, h: number, wood: string | null, frameC: number) {
  const top = y1 - h;
  for (let y = top - 2; y < y1; y++) for (let xx = -2; xx < w + 2; xx++) {
    const inner = inArch(xx, y - top, w, 0), outer = inArch(xx + 2, y - top + 2, w + 4, 0);
    if (!outer) continue;
    if (!inner) { p.set(x + xx, y, (xx + y) % 5 === 0 ? scale(frameC, 0.85) : frameC); continue; }
    const edge = !inArch(xx - 1, y - top, w, 0) || !inArch(xx + 1, y - top, w, 0) || !inArch(xx, y - top - 1, w, 0);
    if (edge) { p.set(x + xx, y, OUT); continue; }
    if (!wood) { p.set(x + xx, y, y - top < 3 ? H('#2a1408') : H('#3a1e0e')); continue; }
    const wc = H(wood);
    p.set(x + xx, y, xx === w / 2 ? scale(wc, 0.6) : xx % 3 === 0 ? scale(wc, 0.8) : xx < 2 ? scale(wc, 1.12) : wc);
  }
  if (wood) {
    // iron studs and a ring
    for (const sy of [top + w / 2 + 2, y1 - 5]) for (let sx = 2; sx < w - 1; sx += 3) p.set(x + sx, sy, H('#4a3a2a'));
    p.set(x + w / 2 + 2, top + h / 2 + 2, H('#f0c860')); p.set(x + w / 2 + 2, top + h / 2 + 3, H('#a07820'));
  }
  for (let xx = -2; xx < w + 2; xx++) p.set(x + xx, y1, scale(frameC, 0.7));
}
/** A small window: arched or square, with shutters or a carved wooden screen. */
function windowAt(p: Pix, x: number, y: number, w: number, h: number, kind: 'shutters' | 'screen' | 'arch', col: string) {
  const c = H(col), cd = scale(c, 0.7), out = OUT;
  if (kind === 'screen') {
    // a mashrabiya: a little wooden balcony with a lattice
    for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
      const e = xx === 0 || xx === w - 1 || yy === 0 || yy === h - 1;
      p.set(x + xx, y + yy, e ? out : (xx + yy) % 2 ? H('#8a5428') : H('#3a1e0e'));
    }
    for (let xx = -1; xx <= w; xx++) { p.set(x + xx, y - 1, out); p.set(x + xx, y - 2, H('#a86a34')); p.set(x + xx, y + h, H('#6a3e1e')); }
    return;
  }
  for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
    if (kind === 'arch' && !inArch(xx, yy, w, 0)) continue;
    const e = xx === 0 || xx === w - 1 || yy === h - 1 || (kind === 'arch' ? !inArch(xx, yy - 1, w, 0) || !inArch(xx - 1, yy, w, 0) || !inArch(xx + 1, yy, w, 0) : yy === 0);
    p.set(x + xx, y + yy, e ? out : yy < 3 ? H('#3a2a3a') : H('#1e1424'));
  }
  if (kind === 'shutters') for (const sx of [x - 3, x + w]) for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < 3; xx++) {
    p.set(sx + xx, y + yy, xx === 0 && sx < x || xx === 2 && sx > x || yy === 0 || yy === h - 1 ? out : yy % 2 ? c : cd);
  }
  for (let xx = -1; xx <= w; xx++) p.set(x + xx, y + h, H('#f0d8b0'));
}
/** Wooden roof beams poking out of the wall under the roof line, each with its shadow. */
function beams(p: Pix, x0: number, x1: number, y: number, step: number) {
  for (let x = x0; x < x1; x += step) {
    p.set(x, y, H('#3a2210')); p.set(x + 1, y, H('#8a5a30')); p.set(x + 2, y, H('#3a2210'));
    p.set(x, y + 1, H('#3a2210')); p.set(x + 1, y + 1, H('#5a3a1e')); p.set(x + 2, y + 1, H('#3a2210'));
    p.set(x + 1, y + 2, H('#00000030')); p.set(x + 2, y + 2, H('#00000030')); p.set(x + 2, y + 3, H('#00000020'));
  }
}
/** A striped cloth awning (seen a little from above) with a scalloped edge and its shadow on the wall. */
function awning(p: Pix, x: number, y: number, w: number, h: number, a: string, b: string) {
  const A = H(a), B = H(b);
  for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
    const inset = Math.round((h - 1 - yy) * 0.5);
    if (xx < inset || xx >= w - inset) continue;
    const stripe = Math.floor((xx - w / 2) / 4 + 100) % 2 ? A : B;
    p.set(x + xx, y + yy, yy === 0 || xx === inset || xx === w - 1 - inset ? OUT : yy < 2 ? scale(stripe, 1.08) : yy > h - 3 ? scale(stripe, 0.85) : stripe);
  }
  for (let xx = 0; xx < w; xx++) {
    const sc = (xx % 4 === 1 || xx % 4 === 2) ? 1 : 0;
    const stripe = Math.floor((xx - w / 2) / 4 + 100) % 2 ? A : B;
    p.set(x + xx, y + h, scale(stripe, 0.75)); if (sc) p.set(x + xx, y + h + 1, scale(stripe, 0.75));
    p.set(x + xx, y + h + 1 + sc, OUT);
    p.set(x + xx, y + h + 2 + sc, H('#00000030')); p.set(x + xx, y + h + 3 + sc, H('#00000018'));
  }
}
/** A dome, lit from the top left, with a little finial. */
function dome(p: Pix, cx: number, by: number, r: number, tones: string[]) {
  const T4 = tones.map(H);
  for (let y = Math.floor(by - r); y < by; y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
    const dx = (x + 0.5 - cx) / r, dy = (y + 0.5 - by) / r;
    const d = dx * dx + dy * dy;
    if (d > 1) continue;
    const nz = Math.sqrt(1 - d);
    const lv = -0.55 * dx - 0.5 * dy * 0.3 + 0.7 * nz + (hash(x, y, 610) - 0.5) * 0.08;
    const edge = (((x - 0.5 - cx) / r) ** 2 + dy * dy > 1) || (((x + 1.5 - cx) / r) ** 2 + dy * dy > 1) || (dx * dx + ((y - 0.5 - by) / r) ** 2 > 1);
    p.set(x, y, edge ? OUT : T4[lv < 0.35 ? 0 : lv < 0.6 ? 1 : lv < 0.85 ? 2 : 3]);
  }
  for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) if (Math.abs(x + 0.5 - cx) <= r) p.set(x, by, OUT);
  p.set(Math.round(cx) - 1, Math.floor(by - r) - 1, H('#f0c860')); p.set(Math.round(cx) - 1, Math.floor(by - r) - 2, H('#f0c860')); p.set(Math.round(cx) - 1, Math.floor(by - r) - 3, H('#c89a30'));
}
/** A potted plant or clay jar for doorsteps and roofs. */
function jar(p: Pix, x: number, y: number, col: string, plant = false) {
  const c = H(col);
  const rows = ['.kkk.', 'kclck', 'kcccC', 'kcccC', '.kCk.'];
  rows.forEach((r, yy) => [...r].forEach((ch, xx) => { if (ch !== '.') p.set(x + xx, y + yy, ch === 'k' ? OUT : ch === 'l' ? scale(c, 1.25) : ch === 'C' ? scale(c, 0.75) : c); }));
  if (plant) for (const [dx, dy] of [[1, -1], [2, -2], [3, -1], [2, -3], [0, -2], [4, -2]]) p.set(x + dx, y + dy, dy === -3 ? H('#8ac454') : H('#4a8a3a'));
}

type HouseOpts = { w: number; h: number; wall: string[]; door: number; doorWood: string; shutter: string; roof?: 'flat' | 'dome' | 'tower'; awning?: [string, string, number, number]; sign?: (p: Pix, x: number, y: number) => void; screen?: number; seed: number };

/**
 * An adobe house (w tiles wide, h tiles tall in footprint, the roof rising above it): a flat roof seen from above with
 * a stepped parapet, beams poking out, arched door at tile `door`, small windows with shutters, sometimes a dome.
 */
function adobe(o: HouseOpts): Pix {
  const W = o.w * 16, Hh = (o.h + 2) * 16 + (o.roof === 'dome' ? 16 : 0);
  const p = new Pix(W, Hh);
  const wall = o.wall.map(H);
  const wallTop = Hh - o.h * 16 - 6; // where the front wall begins
  const roofTop = wallTop - 20;
  // the roof seen from above: packed clay, a parapet around it
  for (let y = roofTop; y < wallTop; y++) for (let x = 1; x < W - 1; x++) {
    const n = vnoise(x, y, 6, o.seed + 20) + (hash(x, y, o.seed) - 0.5) * 0.15;
    p.set(x, y, n < 0.45 ? scale(wall[2], 0.9) : scale(wall[2], 0.96));
  }
  for (let x = 1; x < W - 1; x++) {
    const merlon = Math.floor(x / 6) % 2 === 0;
    for (let y = roofTop - (merlon ? 3 : 1); y < roofTop + 2; y++) p.set(x, y, y === roofTop - (merlon ? 3 : 1) ? OUT : wall[3]);
    p.set(x, wallTop - 2, wall[3]); p.set(x, wallTop - 1, wall[1]);
  }
  for (let y = roofTop - 3; y < wallTop; y++) { if (p.get(1, y) & 255) { p.set(0, y, OUT); p.set(1, y, wall[3]); } if (p.get(W - 2, y) & 255) { p.set(W - 1, y, OUT); p.set(W - 2, y, wall[1]); } }
  // inner parapet shadow and things on the roof
  for (let x = 2; x < W - 2; x++) p.set(x, roofTop + 2, scale(wall[1], 0.85));
  for (let y = roofTop + 2; y < wallTop - 2; y++) { p.set(2, y, scale(wall[1], 0.85)); p.set(W - 3, y, wall[3]); }
  if (o.roof !== 'dome') {
    const v = o.seed % 3;
    if (v === 0) jar(p, W - 12, roofTop + 6, '#c86a3a', true);
    if (v === 1) { // a black water tank on legs
      for (let y = roofTop + 3; y < roofTop + 13; y++) for (let x = W - 16; x < W - 6; x++) p.set(x, y, x === W - 16 || x === W - 7 || y === roofTop + 3 || y === roofTop + 12 ? OUT : y < roofTop + 5 ? H('#5a5a66') : H('#3a3a44'));
    }
    if (v === 2) { // laundry on a line
      line(p, W - 26, roofTop + 3, W - 6, roofTop + 3, H('#5a4a3a'));
      for (const [x, c] of [[W - 24, '#d84a3a'], [W - 18, '#f4f0e0'], [W - 12, '#3a7ad8']] as [number, string][]) rect(p, x, roofTop + 4, 4, 6, H(c));
    }
    // a rug drying over the parapet
    const rx = 6 + Math.floor(hash(o.seed, 3, 1) * Math.max(1, W - 34));
    for (let y = roofTop - 1; y < roofTop + 9; y++) for (let x = rx; x < rx + 10; x++) {
      const e = x === rx || x === rx + 9 || y === roofTop + 8;
      p.set(x, y, e ? OUT : y < roofTop + 2 ? H('#e8c070') : (x + y) % 4 === 0 ? H('#f0d070') : H('#b8342a'));
    }
  }
  // front wall
  plaster(p, 1, wallTop, W - 2, Hh - wallTop - 1, wall, o.seed);
  for (let y = wallTop; y < Hh; y++) { p.set(0, y, OUT); p.set(W - 1, y, OUT); p.set(W - 2, y, wall[0]); }
  for (let x = 0; x < W; x++) { p.set(x, Hh - 1, OUT); p.set(x, wallTop, OUT); p.set(x, wallTop + 1, scale(wall[0], 0.8)); }
  // a skirting of darker clay splashed up by rain and sand
  for (let x = 1; x < W - 1; x++) for (let y = Hh - 4; y < Hh - 1; y++) p.set(x, y, scale(p.get(x, y) | 255, 0.86));
  beams(p, 6, W - 6, wallTop + 2, 10);
  // door
  const dx = o.door * 16 + 3;
  archDoor(p, dx, Hh - 1, 10, 17, o.doorWood, wall[3]);
  // doorstep
  for (let x = dx - 3; x < dx + 13; x++) { p.set(x, Hh - 1, H('#a88a6a')); }
  // windows on the other tiles
  for (let t = 0; t < o.w; t++) {
    if (t === o.door) continue;
    const wx = t * 16 + 5;
    if (o.screen === t) windowAt(p, wx - 1, wallTop + 7, 8, 9, 'screen', o.shutter);
    else windowAt(p, wx, wallTop + 8, 6, 7, (t + o.seed) % 3 === 0 ? 'arch' : 'shutters', o.shutter);
    if ((t + o.seed) % 2 === 0) jar(p, wx + 1, Hh - 7, (t % 2) ? '#c86a3a' : '#2a7a9a', (t % 2) === 0);
  }
  if (o.awning) awning(p, o.awning[2] * 16 + 1, wallTop + 4, o.awning[3] * 16 - 2, 6, o.awning[0], o.awning[1]);
  if (o.sign) o.sign(p, dx + 5, wallTop + 3);
  if (o.roof === 'dome') dome(p, W / 2, roofTop + 6, Math.min(W / 2 - 8, 22), ['#c8d4e4', '#e4ecf4', '#f6f8fc', '#ffffff']);
  return p;
}

/** A sign board with a tiny picture on it. */
function signBoard(pic: string[], cols: Record<string, string>) {
  return (p: Pix, x: number, y: number) => {
    const w = pic[0].length + 4, h = pic.length + 4;
    const x0 = x - Math.floor(w / 2);
    for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) p.set(x0 + xx, y + yy, xx === 0 || yy === 0 || xx === w - 1 || yy === h - 1 ? OUT : H('#f4e4c0'));
    pic.forEach((r, yy) => [...r].forEach((ch, xx) => { if (ch !== '.') p.set(x0 + 2 + xx, y + 2 + yy, H(cols[ch])); }));
  };
}

// ---------------------------------------------------------------- buildings

const WALLS = {
  ochre: ['#c88a4e', '#dca062', '#e8b478', '#f2c88e'],
  rose: ['#c07a5e', '#d49072', '#e2a686', '#eebc9e'],
  white: ['#d8c8b0', '#e8dac4', '#f2e8d6', '#faf4e8'],
  sand: ['#c8a070', '#d8b282', '#e4c296', '#eed2aa'],
};
const house = (key: string, o: HouseOpts, size: [number, number]) => { DECOR[key] = adobe(o); DECOR_SIZE[key] = size; };
house('ds_house', { w: 4, h: 2, wall: WALLS.ochre, door: 1, doorWood: '#2a6a9a', shutter: '#2a7a9a', seed: 11, screen: 3 }, [4, 2]);
house('ds_house2', { w: 4, h: 2, wall: WALLS.rose, door: 2, doorWood: '#8a4a24', shutter: '#3a8a5a', seed: 23, awning: ['#2a7a9a', '#f4ecd8', 0, 2] }, [4, 2]);
house('ds_house3', { w: 3, h: 2, wall: WALLS.white, door: 1, doorWood: '#2a5ab8', shutter: '#2a5ab8', seed: 37 }, [3, 2]);
house('ds_domehouse', { w: 5, h: 2, wall: WALLS.white, door: 2, doorWood: '#2a6a9a', shutter: '#2a7a9a', seed: 41, roof: 'dome', screen: 4 }, [5, 2]);
house('ds_shop', {
  w: 4, h: 2, wall: WALLS.sand, door: 1, doorWood: '#a85a24', shutter: '#d8503a', seed: 53, awning: ['#d8503a', '#f4ecd8', 2, 2],
  sign: signBoard(['.kkk.kkk.', 'kLLLkLLLk', 'kLlLkLlLk', '.kkk.kkk.'], { k: '#1a1a22', L: '#4ab0e0', l: '#c8f4ff' }),
}, [4, 2]);
house('ds_office', {
  w: 4, h: 2, wall: WALLS.white, door: 1, doorWood: '#2a7a4a', shutter: '#2a7a4a', seed: 67, awning: ['#2a7a4a', '#f4ecd8', 2, 2],
  sign: signBoard(['kkkkkkk', 'kyrrrrk', 'kyrkkrk', 'kyrrrrk', 'kkkkkkk'], { k: '#2a2a32', y: '#e8b048', r: '#c05a2a' }),
}, [4, 2]);
house('ds_inn', {
  w: 5, h: 2, wall: WALLS.ochre, door: 2, doorWood: '#8a4a24', shutter: '#2a7a9a', seed: 79, awning: ['#e8b048', '#c83a2a', 3, 2], screen: 0,
  sign: signBoard(['..kk...', '.kwwk..', 'kwwwwkk', 'kwwwwk.', '.kkkk..'], { k: '#2a1a10', w: '#ffffff' }),
}, [5, 2]);

/** The windcatcher tower: a square tower with slatted vents at the top that catch the breeze. */
DECOR.ds_tower = (() => {
  const W = 32, Hh = 88, p = new Pix(W, Hh);
  const wall = WALLS.sand.map(H);
  plaster(p, 3, 14, W - 6, Hh - 15, wall, 91);
  for (let y = 14; y < Hh; y++) { p.set(2, y, OUT); p.set(W - 3, y, OUT); p.set(W - 4, y, wall[0]); }
  // the vent head, wider, with dark slats
  for (let y = 4; y < 22; y++) for (let x = 0; x < W; x++) {
    const e = x === 0 || x === W - 1 || y === 4;
    p.set(x, y, e ? OUT : y < 7 ? wall[3] : (x - 3) % 5 < 2 && x > 2 && x < W - 3 && y > 8 && y < 20 ? H('#2a1a12') : wall[2]);
  }
  for (let x = 0; x < W; x++) { p.set(x, 22, OUT); p.set(x, 23, H('#00000030')); }
  for (let x = 2; x < W - 2; x += 4) p.set(x, 2, OUT), p.set(x, 3, wall[3]);
  beams(p, 6, W - 6, 30, 9); beams(p, 6, W - 6, 56, 9);
  windowAt(p, 13, 38, 6, 8, 'arch', '#2a7a9a');
  archDoor(p, 11, Hh - 1, 10, 15, '#8a4a24', wall[3]);
  for (let x = 2; x < W - 2; x++) p.set(x, Hh - 1, OUT);
  return p;
})();
DECOR_SIZE.ds_tower = [2, 2];

/** Oasis City station: sandstone with an arcade of pointed arches, a clock and two little domed towers. */
DECOR.ds_station = (() => {
  const W = 96, Hh = 92, p = new Pix(W, Hh);
  const wall = ['#c8864e', '#d89a60', '#e6b076', '#f0c48c'].map(H);
  const wallTop = 40;
  // towers at both ends
  for (const tx of [0, W - 18]) {
    plaster(p, tx + 1, 14, 16, Hh - 15, wall, 101 + tx);
    frame(p, tx, 14, 18, Hh - 14, OUT);
    dome(p, tx + 9, 15, 8, ['#2a7a8a', '#3a9aa8', '#5ab8c0', '#8ad8d8']);
    windowAt(p, tx + 6, 24, 6, 9, 'arch', '#2a7a9a');
  }
  // the main hall's roof: a long parapet with a central clock gable
  plaster(p, 18, wallTop, W - 36, Hh - wallTop - 1, wall, 113);
  for (let x = 18; x < W - 18; x++) { const m = Math.floor(x / 5) % 2 === 0; for (let y = wallTop - 6 - (m ? 2 : 0); y < wallTop; y++) p.set(x, y, y === wallTop - 6 - (m ? 2 : 0) ? OUT : wall[3]); p.set(x, wallTop, OUT); }
  // clock gable
  for (let y = 18; y < wallTop; y++) for (let x = 34; x < 62; x++) {
    const inset = y < 26 ? Math.round((26 - y) * 0.9) : 0;
    if (x < 34 + inset || x >= 62 - inset) continue;
    p.set(x, y, x === 34 + inset || x === 61 - inset || y === 18 + 0 ? OUT : wall[2]);
  }
  disc(p, 48, 30, 6.5, (d) => (d > 5.8 ? OUT : d > 4.8 ? H('#e8b048') : H('#fff8e8')));
  line(p, 48, 30, 48, 26, OUT); line(p, 48, 30, 51, 30, OUT);
  // the name board
  for (let y = 41; y < 47; y++) for (let x = 30; x < 66; x++) p.set(x, y, y === 41 || y === 46 || x === 30 || x === 65 ? OUT : H('#2a5a8a'));
  for (let x = 33; x < 63; x += 3) { p.set(x, 43, H('#f4ecd8')); p.set(x + 1, 43, H('#f4ecd8')); p.set(x, 44, H('#f4ecd8')); }
  // arcade of arches: the middle two are the doors (open, with the hall's warm light inside)
  for (let k = 0; k < 4; k++) {
    const ax = 21 + k * 14, door = k === 1 || k === 2;
    archDoor(p, ax, Hh - 1, 10, 30, door ? '#7a4a24' : null, wall[3]);
    if (!door) { jar(p, ax + 3, Hh - 7, '#2a7a9a', true); for (let y = Hh - 22; y < Hh - 8; y++) for (let x = ax + 2; x < ax + 8; x++) if ((x + y) % 2) p.set(x, y, H('#5a3a28')); }
  }
  for (let x = 0; x < W; x++) p.set(x, Hh - 1, OUT);
  // little flags on the domes
  return p;
})();
DECOR_SIZE.ds_station = [6, 2];

/** Salt Flats houses: walls of cut salt blocks, a roof of palm fronds on poles. */
DECOR.ds_salthouse = (() => {
  const W = 48, Hh = 56, p = new Pix(W, Hh);
  const top = 22;
  for (let y = top; y < Hh - 1; y++) for (let x = 1; x < W - 1; x++) {
    const row = Math.floor((y - top) / 5), bx = (x + (row % 2) * 5) % 10;
    const id = hash(Math.floor((x + (row % 2) * 5) / 10), row, 120);
    let c = id < 0.3 ? H('#e4e2dc') : id < 0.7 ? H('#eeece6') : H('#f8f6f2');
    if ((y - top) % 5 === 4 || bx === 9) c = H('#b8b0a2');
    else if ((y - top) % 5 === 0 || bx === 0) c = H('#ffffff');
    p.set(x, y, c);
  }
  frame(p, 0, top, W, Hh - top, OUT);
  // palm-frond roof, overhanging, on two poles
  for (let y = 6; y < top + 4; y++) for (let x = 0; x < W; x++) {
    const inset = Math.max(0, 10 - (y - 6)) * 0.4;
    if (x < inset || x >= W - inset) continue;
    const e = y === 6 || y === top + 3 || x < inset + 1 || x >= W - inset - 1;
    const blade = (x + Math.floor(y / 2)) % 3;
    p.set(x, y, e ? H('#3a2a10') : y > top ? H('#8a6a2a') : blade === 0 ? H('#a88a3a') : blade === 1 ? H('#c8a850') : H('#dcc06a'));
  }
  for (let x = 0; x < W; x++) if (x % 3 === 0) p.set(x, top + 4, H('#8a6a2a'));
  for (let x = 2; x < W - 2; x++) p.set(x, top + 5, H('#00000030'));
  archDoor(p, 19, Hh - 1, 10, 16, null, H('#ffffff'));
  windowAt(p, 6, top + 9, 6, 6, 'shutters', '#3a8ad8');
  windowAt(p, 36, top + 9, 6, 6, 'shutters', '#3a8ad8');
  return p;
})();
DECOR_SIZE.ds_salthouse = [3, 2];

/** A round mud hut of the dune village: a beehive dome with a dark doorway and a woven door mat. */
DECOR.ds_hut = (() => {
  const W = 32, Hh = 44, p = new Pix(W, Hh);
  const T4 = ['#a86a36', '#c4844a', '#d89c5e', '#e8b478'].map(H);
  shadowEllipse(p, 17, Hh - 2, 15, 2, H('#7a4a2040'));
  const cx = 16, by = Hh - 1, rx = 15, ry = 34;
  for (let y = by - ry; y < by; y++) for (let x = 0; x < W; x++) {
    const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - by) / ry;
    const d = dx * dx + dy * dy * (dy < 0 ? 1 : 1);
    if (d > 1) continue;
    const inside = (xx: number, yy: number) => { const a = (xx + 0.5 - cx) / rx, b = (yy + 0.5 - by) / ry; return a * a + b * b <= 1; };
    const edge = !inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1);
    const nz = Math.sqrt(1 - d);
    let lv = -0.6 * dx + 0.5 * nz - dy * 0.15 + (hash(x, y, 620) - 0.5) * 0.12;
    if ((by - y) % 6 === 0) lv -= 0.18; // the rings of the beehive
    p.set(x, y, edge ? OUT : T4[lv < 0.1 ? 0 : lv < 0.35 ? 1 : lv < 0.6 ? 2 : 3]);
  }
  for (const [dx, dy] of [[0, 0], [-1, 1], [1, 1], [-2, 2], [2, 2], [0, -1]]) p.set(cx + dx, by - ry + dy, H('#e0c068'));
  archDoor(p, 11, Hh - 1, 10, 15, null, T4[3]);
  for (let x = 6; x < 26; x++) p.set(x, Hh - 1, OUT);
  return p;
})();
DECOR_SIZE.ds_hut = [2, 2];

// ---------------------------------------------------------------- round things: a little shape renderer

/** An ellipse of a rounded figure: tones dark → light, z decides which is in front, `flat` shades it less. */
interface Shape { x: number; y: number; rx: number; ry: number; c: string[]; z: number; flat?: boolean }

/**
 * Draws a figure from overlapping ellipses: each pixel takes the front-most ellipse, is shaded by that ellipse's
 * normal (light from the top left), and a seam darkens a front piece's lower edge over the piece behind it.
 * Returns the figure outlined.
 */
function figure(W: number, Hh: number, shapes: Shape[], out = OUT, after?: (L: Pix, who: (x: number, y: number) => number) => void): Pix {
  const L = new Pix(W, Hh);
  const id: number[] = new Array(W * Hh).fill(-1);
  const nn: number[][] = [];
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
    let best = -1, bz = -1e9, nx = 0, ny = 0;
    shapes.forEach((s, i) => {
      const dx = (x + 0.5 - s.x) / s.rx, dy = (y + 0.5 - s.y) / s.ry;
      if (dx * dx + dy * dy > 1) return;
      if (s.z > bz) { bz = s.z; best = i; nx = dx; ny = dy; }
    });
    id[y * W + x] = best;
    nn.push([nx, ny]);
  }
  const who = (x: number, y: number) => (x < 0 || y < 0 || x >= W || y >= Hh ? -1 : id[y * W + x]);
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
    const i = who(x, y);
    if (i < 0) continue;
    const s = shapes[i], [nx, ny] = nn[y * W + x];
    const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
    let lv = (s.flat ? 0.4 : 1) * (-0.55 * nx - 0.6 * ny) + 0.55 * nz + (hash(x, y, 630) - 0.5) * 0.1;
    const below = who(x, y + 1), right = who(x + 1, y);
    if ((below >= 0 && below !== i && shapes[below].z < s.z) || (right >= 0 && right !== i && shapes[right].z < s.z && nx > 0.5)) lv -= 0.45;
    const k = lv < 0.05 ? 0 : lv < 0.35 ? 1 : lv < 0.65 ? 2 : 3;
    L.set(x, y, H(s.c[Math.min(s.c.length - 1, k)]));
  }
  after?.(L, who);
  const p = new Pix(W, Hh);
  outlined(p, L, 0, 0, out);
  return p;
}

const CAMEL_C = ['#a8703a', '#c88c50', '#dea86a', '#f0c488'];
const CAMEL_D = ['#8a5a2e', '#a8703a', '#c88c50', '#dea86a'];

/** A camel lying in the sand, legs folded, saddled; head up (awake) or resting its chin on the sand. */
function lyingCamel(W: number, awake: boolean, blanket: [string, string]): Pix {
  const Hh = 30, s = W / 48;
  const head = awake ? { x: 8 * s, y: 7 } : { x: 7 * s, y: 21 };
  const neck: Shape[] = [];
  for (let k = 0; k <= 5; k++) {
    const t = k / 5;
    const x = 17 * s + (head.x + 3 * s - 17 * s) * t, y = 18 + (head.y + 2 - 18) * t - (awake ? Math.sin(t * Math.PI) * 3 : -Math.sin(t * Math.PI) * 1);
    neck.push({ x, y, rx: 3.6 * Math.max(0.8, s), ry: 3.6, c: CAMEL_C, z: 1 });
  }
  const shapes: Shape[] = [
    { x: 38 * s, y: 26, rx: 6 * s, ry: 3, c: CAMEL_D, z: 0 }, // the far folded leg
    { x: 29 * s, y: 19, rx: 14 * s, ry: 8, c: CAMEL_C, z: 2 }, // body
    { x: 30 * s, y: 11, rx: 8 * s, ry: 6, c: CAMEL_C, z: 3 }, // hump
    ...neck,
    { x: head.x, y: head.y, rx: 5.2 * Math.max(0.8, s), ry: 3.6, c: CAMEL_C, z: 4 },
    { x: head.x - 4 * s, y: head.y + 1, rx: 3.2 * Math.max(0.8, s), ry: 2.8, c: ['#c08a58', '#d8a874', '#ecc492', '#f6dab0'], z: 5 },
    { x: 20 * s, y: 26, rx: 6 * s, ry: 3, c: CAMEL_C, z: 3 }, // the near folded leg
    { x: 43 * s, y: 18, rx: 2, ry: 5, c: CAMEL_D, z: 1 }, // tail
  ];
  return figure(W, Hh, shapes, OUT, (L, who) => {
    // saddle blanket over the hump: red with yellow bands and a fringe
    const A = H(blanket[0]), B = H(blanket[1]);
    for (let y = 9; y < 23; y++) for (let x = Math.round(22 * s); x < Math.round(39 * s); x++) {
      const i = who(x, y);
      if (i !== 1 && i !== 2) continue;
      if (y < 13 && i === 1) continue;
      p2(L, x, y, (y === 16 || y === 17) ? B : y > 20 ? (x % 2 ? B : scale(A, 0.7)) : (x % 6 < 1 ? scale(A, 0.8) : A));
    }
    // saddle horn
    for (let y = 4; y < 9; y++) { L.set(Math.round(30 * s), y, H('#6a3e1e')); L.set(Math.round(30 * s) + 1, y, H('#8a5428')); }
    // eye, ear, nostril
    const ex = Math.round(head.x + 1 * s), ey = Math.round(head.y - 1);
    if (awake) { L.set(ex, ey, H('#140c06')); L.set(ex, ey - 1, H('#140c06')); } else { L.set(ex, ey, H('#5a3418')); L.set(ex + 1, ey, H('#5a3418')); }
    L.set(Math.round(head.x + 3 * s), Math.round(head.y - 4), H('#8a5a2e'));
    L.set(Math.round(head.x - 6 * s), Math.round(head.y + 1), H('#5a3418'));
  });
}
const p2 = (L: Pix, x: number, y: number, c: number) => L.set(x, y, c);

DECOR.ds_camel_lying = (() => {
  const c = lyingCamel(48, false, ['#c83a2a', '#f2c040']);
  // a little "z" of sleep
  const p = new Pix(48, 36);
  p.blit(c, 0, 6);
  shadowEllipse(p, 26, 34, 20, 2, H('#7a4a2048'));
  p.blit(c, 0, 6);
  for (const [x, y] of [[2, 4], [3, 4], [4, 4], [3, 5], [2, 6], [3, 6], [4, 6], [6, 0], [7, 0], [7, 1], [6, 2], [7, 2]] as [number, number][]) p.set(x + 8, y + 4, H('#ffffff'));
  return p;
})();
DECOR_SIZE.ds_camel_lying = [3, 1];
DECOR.ds_camel_rest = (() => { const p = new Pix(32, 30); shadowEllipse(p, 17, 28, 14, 2, H('#7a4a2048')); p.blit(lyingCamel(32, true, ['#2a6ab8', '#f4ecd8']), 0, 0); return p; })();
DECOR_SIZE.ds_camel_rest = [2, 1];

/** A camel standing, saddled and hung with tassels (for the caravan and the train ride). */
DECOR.ds_camel = (() => {
  const shapes: Shape[] = [
    { x: 36, y: 33, rx: 1.8, ry: 9, c: CAMEL_D, z: 0 }, { x: 18, y: 33, rx: 1.8, ry: 9, c: CAMEL_D, z: 0 },
    { x: 24, y: 22, rx: 13, ry: 7, c: CAMEL_C, z: 2 }, { x: 25, y: 14, rx: 7, ry: 6, c: CAMEL_C, z: 3 },
    { x: 14, y: 33, rx: 2, ry: 9, c: CAMEL_C, z: 3 }, { x: 32, y: 33, rx: 2, ry: 9, c: CAMEL_C, z: 3 },
    { x: 11, y: 20, rx: 3.4, ry: 3.4, c: CAMEL_C, z: 1 }, { x: 8, y: 15, rx: 3.2, ry: 4, c: CAMEL_C, z: 1 }, { x: 7, y: 10, rx: 3, ry: 3.5, c: CAMEL_C, z: 1 },
    { x: 7, y: 7, rx: 5, ry: 3.4, c: CAMEL_C, z: 4 }, { x: 3, y: 8, rx: 3, ry: 2.6, c: ['#c08a58', '#d8a874', '#ecc492', '#f6dab0'], z: 5 },
    { x: 37, y: 22, rx: 1.6, ry: 5, c: CAMEL_D, z: 1 },
  ];
  const c = figure(44, 44, shapes, OUT, (L, who) => {
    for (let y = 12; y < 26; y++) for (let x = 17; x < 33; x++) {
      const i = who(x, y);
      if (i !== 2 && i !== 3) continue;
      if (y < 15 && i === 2) continue;
      L.set(x, y, y === 19 || y === 20 ? H('#f2c040') : y > 24 ? (x % 2 ? H('#f2c040') : H('#8a2418')) : x % 6 < 1 ? H('#a02a1e') : H('#c83a2a'));
    }
    for (let y = 6; y < 12; y++) { L.set(25, y, H('#6a3e1e')); L.set(26, y, H('#8a5428')); }
    L.set(8, 6, H('#140c06')); L.set(8, 5, H('#140c06')); L.set(10, 4, H('#8a5a2e')); L.set(1, 8, H('#5a3418'));
    // bridle and tassel
    L.set(5, 9, H('#c83a2a')); L.set(6, 10, H('#c83a2a')); L.set(7, 11, H('#2a6ab8')); L.set(7, 12, H('#f2c040'));
    for (const x of [15, 34]) { L.set(x, 41, H('#4a2e16')); }
  });
  const p = new Pix(44, 46);
  shadowEllipse(p, 24, 43, 17, 2, H('#7a4a2048'));
  p.blit(c, 0, 1);
  return p;
})();
DECOR_SIZE.ds_camel = [3, 1];

// ---------------------------------------------------------------- tents

/** A Bedouin tent of woven goat hair: dark striped roof on three poles, front rolled up over carpets and cushions. */
DECOR.ds_tent = (() => {
  const W = 64, Hh = 52, p = new Pix(W, Hh);
  shadowEllipse(p, 33, Hh - 2, 31, 2, H('#7a4a2040'));
  const eave = 26, floor = Hh - 3;
  // inside: back wall woven in bands, cushions, a carpet on the floor
  for (let y = eave; y < floor; y++) for (let x = 4; x < W - 4; x++) {
    let c = y < eave + 9 ? ([H('#e8d4b0'), H('#c83a2a'), H('#e8d4b0'), H('#2a1a12')][Math.floor((y - eave) / 2) % 4]) : H('#2a1a12');
    if (y >= eave + 9 && y < eave + 10) c = H('#1a100a');
    if (y >= floor - 7) { const e = y === floor - 7 || x === 6 || x === W - 7; c = x < 6 || x > W - 7 ? H('#2a1a12') : e ? H('#5a1e1a') : (x + y) % 6 === 0 ? H('#f0c860') : (Math.floor(x / 4) + Math.floor(y / 3)) % 2 ? H('#b8342a') : H('#8a2a22'); }
    p.set(x, y, c);
  }
  // cushions against the back
  for (const [cx, col] of [[14, '#e8a040'], [24, '#2a6ab8'], [40, '#c8503a'], [50, '#3a8a5a']] as [number, string][]) {
    for (let y = eave + 10; y < floor - 7; y++) for (let x = cx - 4; x <= cx + 4; x++) {
      const e = x === cx - 4 || x === cx + 4 || y === eave + 10;
      p.set(x, y, e ? H('#1a100a') : x < cx - 1 ? scale(H(col), 1.15) : H(col));
    }
  }
  // the coffee pot and cups on the carpet
  for (const [x, y, c] of [[30, floor - 11, '#c8a040'], [31, floor - 11, '#e8c860'], [30, floor - 10, '#a88030'], [31, floor - 10, '#c8a040'], [32, floor - 10, '#c8a040'], [29, floor - 12, '#e8c860']] as [number, number, string][]) p.set(x, y, H(c));
  // the roof: three peaks, woven stripes, lighter where the sun hits
  const peakY = (x: number) => { const k = [[2, 18], [16, 6], [32, 9], [48, 6], [62, 18]]; for (let i = 0; i + 1 < k.length; i++) if (x >= k[i][0] && x <= k[i + 1][0]) return k[i][1] + (k[i + 1][1] - k[i][1]) * ((x - k[i][0]) / (k[i + 1][0] - k[i][0])); return 30; };
  for (let x = 1; x < W - 1; x++) {
    const top = Math.round(peakY(x));
    for (let y = top; y <= eave; y++) {
      const band = Math.floor((x + 2) / 6) % 3;
      let c = band === 1 ? H('#5a4636') : band === 2 ? H('#3e2e24') : H('#4a382c');
      if ((x + 2) % 6 === 0) c = H('#a88a6a');
      if (y < top + 3) c = scale(c, 1.35);
      if (x < 16 && y < top + 6) c = scale(c, 1.15);
      if (y === top || y === eave) c = H('#1a100a');
      p.set(x, y, c);
    }
    p.set(x, eave + 1, (x % 4 < 2) ? H('#c83a2a') : H('#f4ecd8'));
    if (x % 4 === 1) p.set(x, eave + 2, H('#c83a2a'));
  }
  for (let y = 18; y <= eave; y++) { p.set(1, y, H('#1a100a')); p.set(W - 2, y, H('#1a100a')); }
  // poles
  for (const x of [4, 32, 59]) for (let y = eave + 1; y < floor + 1; y++) { p.set(x, y, H('#3a2210')); p.set(x + 1, y, H('#a8743e')); p.set(x + 2, y, H('#6a4422')); }
  for (const x of [16, 48]) for (let y = 3; y < 7; y++) { p.set(x, y, H('#3a2210')); p.set(x + 1, y, H('#a8743e')); }
  // guy ropes and pegs
  line(p, 2, 19, 0, Hh - 4, H('#c8a870')); line(p, W - 3, 19, W - 1, Hh - 4, H('#c8a870'));
  return p;
})();
DECOR_SIZE.ds_tent = [4, 2];

/** The exchange tent: a striped pavilion with a door flap, a sign with coins, a pennant on top. */
DECOR.ds_tent_x = (() => {
  const W = 48, Hh = 54, p = new Pix(W, Hh);
  shadowEllipse(p, 25, Hh - 2, 23, 2, H('#7a4a2040'));
  const top = 10, eave = 26;
  for (let y = top; y < Hh - 1; y++) {
    const roof = y <= eave;
    const half = roof ? 4 + (y - top) * (20 / (eave - top)) : 22;
    for (let x = Math.round(24 - half); x < Math.round(24 + half); x++) {
      const band = Math.floor((x - 24 + 40) / 5) % 2;
      let c = band ? H('#c8402e') : H('#f4ead4');
      const lx = (x - (24 - half)) / (2 * half);
      if (lx > 0.7) c = scale(c, 0.85);
      if (lx < 0.2) c = scale(c, 1.06);
      if (!roof) c = band ? H('#b8382a') : H('#e8dcc4');
      if (!roof && lx > 0.75) c = scale(c, 0.85);
      const edge = x === Math.round(24 - half) || x === Math.round(24 + half) - 1 || y === top || y === eave || y === Hh - 2;
      p.set(x, y, edge ? OUT : c);
    }
  }
  // scalloped valance under the roof
  for (let x = 3; x < 45; x++) { p.set(x, eave + 1, x % 6 < 3 ? H('#f2c040') : H('#c8402e')); if (x % 6 === 1) p.set(x, eave + 2, OUT); }
  // the door flap, tied back
  for (let y = eave + 6; y < Hh - 2; y++) for (let x = 19; x < 29; x++) p.set(x, y, x === 19 || x === 28 || y === eave + 6 ? OUT : y < eave + 9 ? H('#2a1410') : H('#3a1e14'));
  for (let y = eave + 6; y < Hh - 6; y++) { p.set(18, y, H('#f4ead4')); p.set(29, y, H('#c8402e')); }
  // a sign: gold coins on blue
  for (let y = eave + 3; y < eave + 6; y++) for (let x = 16; x < 32; x++) p.set(x, y, H('#2a5a9a'));
  frame(p, 15, eave + 2, 18, 5, OUT);
  for (const x of [18, 23, 28]) { p.set(x, eave + 4, H('#f4d040')); p.set(x + 1, eave + 4, H('#c8a020')); p.set(x, eave + 3, H('#fff0a0')); }
  // pole and pennant
  for (let y = 0; y < top; y++) { p.set(24, y, H('#3a2210')); }
  for (const [x, y] of [[25, 0], [26, 0], [27, 0], [28, 1], [25, 1], [26, 1], [27, 1], [25, 2], [26, 2]] as [number, number][]) p.set(x, y, H('#2a8a5a'));
  return p;
})();
DECOR_SIZE.ds_tent_x = [3, 2];

// ---------------------------------------------------------------- the bazaar

/** A bazaar stall (2×1, drawn taller): two posts, a striped awning, a wooden counter with goods on it. */
function bazaar(a: string, b: string, goods: (p: Pix) => void, back?: (p: Pix) => void): Pix {
  const W = 32, Hh = 42, p = new Pix(W, Hh);
  shadowEllipse(p, 16, Hh - 2, 15, 2, H('#7a4a2040'));
  if (back) back(p);
  // posts
  for (const x of [2, 28]) for (let y = 10; y < Hh - 2; y++) { p.set(x, y, OUT); p.set(x + 1, y, H('#b07a44')); p.set(x + 2, y, OUT); }
  // counter
  for (let y = 27; y < Hh - 2; y++) for (let x = 1; x < W - 1; x++) {
    const e = x === 1 || x === W - 2 || y === 27 || y === Hh - 3;
    p.set(x, y, e ? OUT : y < 30 ? H('#c8945a') : (x % 5 === 0 ? H('#7a4a24') : H('#9a6232')));
  }
  for (let x = 2; x < W - 2; x++) p.set(x, 28, H('#e0b078'));
  goods(p);
  awning(p, 0, 2, 32, 9, a, b);
  return p;
}
const pile = (p: Pix, cx: number, by: number, r: number, c: string) => {
  const C = H(c);
  for (let y = 0; y < r; y++) for (let x = -r + y; x <= r - y; x++) p.set(cx + x, by - y, x < -1 ? scale(C, 1.15) : x > 1 ? scale(C, 0.85) : C);
  for (let x = -r - 1; x <= r + 1; x++) { p.set(cx + x, by + 1, H('#e8dcc8')); p.set(cx + x, by + 2, OUT); }
  p.set(cx - r - 1, by + 1, OUT); p.set(cx + r + 1, by + 1, OUT);
};
const basketOf = (p: Pix, x: number, y: number, fill: string[]) => {
  for (let yy = 0; yy < 5; yy++) for (let xx = 0; xx < 8; xx++) {
    const e = xx === 0 || xx === 7 || yy === 4;
    p.set(x + xx, y + yy, e ? OUT : yy === 0 ? H(fill[(xx + yy) % fill.length]) : (xx + yy) % 2 ? H('#c89a52') : H('#a07838'));
  }
  for (let xx = 1; xx < 7; xx++) p.set(x + xx, y - 1, H(fill[xx % fill.length]));
  for (let xx = 2; xx < 6; xx++) p.set(x + xx, y - 2, H(fill[(xx + 1) % fill.length]));
};
DECOR.ds_stall_dates = bazaar('#3a8a5a', '#f4ecd8', (p) => {
  basketOf(p, 3, 22, ['#8a3a14', '#c86a2a', '#5a2008']); basketOf(p, 12, 22, ['#d08a2a', '#f0a83a', '#a86a1e']); basketOf(p, 21, 22, ['#6a8a2a', '#8aaa3a', '#4a6a1e']);
  // a bunch of dates hanging from the awning
  for (let k = 0; k < 7; k++) p.set(24 + (k % 3), 13 + Math.floor(k / 3) * 2 + (k % 2), H(['#c86a1e', '#e08a2a', '#8a3a14'][k % 3]));
  line(p, 25, 11, 25, 13, H('#c8a050'));
});
DECOR.ds_stall_spice = bazaar('#d8503a', '#f4d060', (p) => {
  pile(p, 6, 24, 4, '#d8402a'); pile(p, 15, 24, 4, '#f0b020'); pile(p, 24, 24, 4, '#b86a2a');
  // sacks in front of the counter
  for (const [x, c] of [[4, '#e8c860'], [22, '#7a9a3a']] as [number, string][]) {
    for (let y = 31; y < 39; y++) for (let xx = 0; xx < 7; xx++) p.set(x + xx, y, xx === 0 || xx === 6 || y === 38 ? OUT : y < 33 ? H(c) : H('#d8c09a'));
  }
}, (p) => {
  // strings of dried chillies hanging at the back
  for (const x of [8, 22]) for (let y = 12; y < 24; y++) p.set(x, y, y % 2 ? H('#c82a1a') : H('#8a1a10'));
});
DECOR.ds_stall_carpet = bazaar('#2a5a9a', '#e8c070', (p) => {
  // rolled carpets lying on the counter
  for (const [y, c] of [[21, '#b8342a'], [24, '#2a5a8a']] as [number, string][]) for (let x = 4; x < 28; x++) {
    p.set(x, y, OUT); p.set(x, y + 1, x % 4 === 0 ? H('#f0d070') : H(c)); p.set(x, y + 2, scale(H(c), 0.75));
  }
}, (p) => {
  // carpets hung on a rail at the back, with patterns and fringes
  for (const [x0, a, b] of [[4, '#b8342a', '#f0d070'], [12, '#2a6a5a', '#f4ecd8'], [20, '#8a2a5a', '#e8b048']] as [number, string, string][]) {
    for (let y = 11; y < 22; y++) for (let x = x0; x < x0 + 8; x++) {
      const e = x === x0 || x === x0 + 7 || y === 11;
      const cx = x - x0 - 3.5, cy = y - 16;
      p.set(x, y, e ? OUT : Math.abs(cx) + Math.abs(cy) < 3 ? H(b) : (x + y) % 4 === 0 ? H(b) : H(a));
    }
    for (let x = x0 + 1; x < x0 + 7; x += 2) p.set(x, 22, H('#f4ecd8'));
  }
});
DECOR.ds_stall_cloth = bazaar('#8a3aa8', '#f4ecd8', (p) => {
  // folded scarves stacked in colours
  for (const [x, cols] of [[4, ['#3a7ad8', '#f4c040', '#d84a3a']], [13, ['#2a9a8a', '#f4ecd8', '#8a3aa8']], [22, ['#d84a3a', '#3a7ad8', '#f4c040']]] as [number, string[]][]) {
    cols.forEach((c, k) => { const y = 24 - k * 2; for (let xx = 0; xx < 7; xx++) { p.set(x + xx, y, H(c)); p.set(x + xx, y + 1, scale(H(c), 0.75)); } p.set(x - 1, y, OUT); p.set(x + 7, y, OUT); p.set(x - 1, y + 1, OUT); p.set(x + 7, y + 1, OUT); });
    for (let xx = -1; xx < 8; xx++) p.set(x + xx, 19, OUT);
  }
}, (p) => {
  for (const [x, c] of [[4, '#f4c040'], [7, '#3a7ad8'], [23, '#d84a3a'], [26, '#2a9a8a']] as [number, string][]) for (let y = 11; y < 22 - (x % 3); y++) { p.set(x, y, H(c)); p.set(x + 1, y, scale(H(c), 0.8)); }
});
DECOR.ds_stall_souvenir = bazaar('#e8b048', '#2a7a9a', (p) => {
  // little clay camels, painted plates and brass lamps
  for (const x of [4, 10]) { const c = ITEMS.ds_souvenir; for (let y = 0; y < 12; y++) for (let xx = 0; xx < 14; xx++) { const v = c.get(xx, y + 2); if (v & 255) p.set(x + Math.floor(xx / 2), 18 + Math.floor(y / 2), v); } }
  for (const [x, c] of [[19, '#2a6ab8'], [25, '#c83a2a']] as [number, string][]) disc(p, x + 2.5, 22.5, 3, (d) => (d > 2.4 ? OUT : d > 1.4 ? H(c) : H('#f4ecd8')));
}, (p) => {
  // a rack of postcards
  for (const x of [4, 23]) { for (let y = 12; y < 18; y++) for (let xx = 0; xx < 5; xx++) p.set(x + xx, y, xx === 0 || xx === 4 || y === 12 || y === 17 ? OUT : y < 15 ? H('#7ac8f0') : H('#e8b060')); }
});
DECOR.ds_saltstall = bazaar('#3a8ad8', '#ffffff', (p) => {
  // salt slabs, jars of water and a tube of sun cream
  for (let y = 20; y < 27; y++) for (let x = 4; x < 14; x++) p.set(x, y, x === 4 || x === 13 || y === 20 ? OUT : (y - 20) % 3 === 0 ? H('#c8c0b4') : H('#f4f2ee'));
  jar(p, 16, 22, '#3a8ad8'); jar(p, 21, 22, '#3a8ad8');
  for (let y = 20; y < 26; y++) { p.set(27, y, H('#f08a30')); p.set(26, y, y === 20 ? OUT : H('#fff8ec')); }
});
for (const k of ['ds_stall_dates', 'ds_stall_spice', 'ds_stall_carpet', 'ds_stall_cloth', 'ds_stall_souvenir', 'ds_saltstall']) DECOR_SIZE[k] = [2, 1];

// ---------------------------------------------------------------- camp and town props

DECOR.ds_campfire = (() => {
  const p = new Pix(16, 24);
  shadowEllipse(p, 8, 21, 7, 1, H('#7a4a2040'));
  // ring of stones, logs, flames and a brass pot on a tripod
  for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; const x = Math.round(8 + Math.cos(a) * 6), y = Math.round(19 + Math.sin(a) * 2.5); p.set(x, y, H('#8a7a6a')); p.set(x, y + 1, H('#4a3a2a')); p.set(x + 1, y, H('#b0a090')); }
  line(p, 4, 20, 12, 17, H('#5a3418')); line(p, 4, 17, 12, 20, H('#7a4a24'));
  for (const [x, y, c] of [[7, 13, '#f8e070'], [8, 12, '#f8e070'], [8, 14, '#f8a030'], [7, 15, '#f06a20'], [9, 15, '#f06a20'], [6, 16, '#d83a1a'], [10, 16, '#d83a1a'], [8, 16, '#f8a030'], [8, 17, '#f8e070'], [9, 13, '#f8a030'], [6, 14, '#f8a030']] as [number, number, string][]) p.set(x, y, H(c));
  line(p, 3, 18, 8, 2, H('#3a2210')); line(p, 13, 18, 8, 2, H('#3a2210'));
  for (let y = 4; y < 9; y++) for (let x = 5; x < 12; x++) { const e = x === 5 || x === 11 || y === 8; p.set(x, y, e ? OUT : x < 7 ? H('#f8d870') : H('#d8a830')); }
  p.set(11, 5, H('#d8a830')); p.set(12, 4, H('#d8a830')); p.set(7, 3, H('#d8a830')); p.set(8, 3, H('#d8a830'));
  return p;
})();
DECOR.ds_jars = (() => { const p = new Pix(16, 20); shadowEllipse(p, 8, 18, 7, 1, H('#7a4a2040')); jar(p, 1, 12, '#c86a3a'); jar(p, 9, 13, '#d88a4a'); jar(p, 5, 9, '#a85a2a'); jar(p, 6, 14, '#2a7a9a'); return p; })();
DECOR.ds_sacks = (() => figure(16, 18, [
  { x: 4.5, y: 12, rx: 4, ry: 5, c: ['#a08050', '#c0a070', '#d8bc8a', '#ecd8ac'], z: 1 },
  { x: 11, y: 12.5, rx: 4, ry: 4.5, c: ['#a08050', '#c0a070', '#d8bc8a', '#ecd8ac'], z: 2 },
  { x: 8, y: 7, rx: 4, ry: 4, c: ['#a08050', '#c0a070', '#d8bc8a', '#ecd8ac'], z: 3 },
], OUT, (L) => { for (const x of [3, 4, 5]) L.set(x, 8, H('#d8402a')); L.set(8, 3, H('#5a3a1e')); L.set(7, 3, H('#5a3a1e')); }))();
DECOR.ds_cactus = (() => {
  const G = ['#2e6a32', '#3e8a3e', '#5aa84a', '#86c862'];
  const c = figure(16, 32, [
    { x: 8, y: 17, rx: 3.5, ry: 13, c: G, z: 2 }, { x: 8, y: 5, rx: 3.5, ry: 3.5, c: G, z: 2 },
    { x: 3, y: 14, rx: 2, ry: 5, c: G, z: 1 }, { x: 4.5, y: 18, rx: 3, ry: 1.6, c: G, z: 1 },
    { x: 13, y: 11, rx: 2, ry: 5, c: G, z: 1 }, { x: 11.5, y: 15, rx: 3, ry: 1.6, c: G, z: 1 },
  ], H('#1a3a1a'), (L) => {
    for (let y = 4; y < 29; y++) { L.set(7, y, H('#2e6a32')); if (y % 4 === 0) { L.set(6, y, H('#f4ecd8')); L.set(10, y + 2, H('#f4ecd8')); } }
    L.set(8, 1, H('#f06aa0')); L.set(7, 1, H('#f8a0c0'));
  });
  const p = new Pix(16, 32); shadowEllipse(p, 9, 30, 5, 1, H('#7a4a2048')); p.blit(c, 0, 0); return p;
})();
DECOR.ds_agave = (() => {
  const p = new Pix(16, 18), L = new Pix(16, 18);
  shadowEllipse(p, 8, 16, 7, 1, H('#7a4a2048'));
  for (const [ang, len] of [[160, 7], [20, 7], [130, 9], [50, 9], [100, 11], [80, 11], [175, 5], [5, 5]] as [number, number][]) {
    const a = (ang * Math.PI) / 180;
    for (let i = 0; i < len; i++) { const x = Math.round(8 + Math.cos(a) * i * 0.9), y = Math.round(15 - Math.sin(a) * i * 1.1); L.set(x, y, i > len - 2 ? H('#c8d898') : H(['#4a7a5a', '#6a9a72', '#8ab890'][i % 3])); L.set(x + 1, y, H('#3a6a4a')); }
  }
  outlined(p, L, 0, 0, H('#1a3a2a'));
  return p;
})();
/** A date palm on its own (2×1): taller, with the dates, for streets and the camp. */
DECOR.ds_palm = datePalm(5, 38, 1);
DECOR_SIZE.ds_palm = [2, 1];

/** The caravan timetable: a board on two posts, painted with camels and times. */
DECOR.ds_timetable = (() => {
  const W = 32, Hh = 34, p = new Pix(W, Hh);
  for (const x of [5, 25]) for (let y = 14; y < Hh - 1; y++) { p.set(x, y, OUT); p.set(x + 1, y, H('#a8743e')); p.set(x + 2, y, OUT); }
  for (let y = 2; y < 20; y++) for (let x = 1; x < 31; x++) p.set(x, y, x === 1 || x === 30 || y === 2 || y === 19 ? OUT : y === 3 ? H('#f0d8a8') : H('#e2c690'));
  for (let k = 0; k < 3; k++) {
    const y = 5 + k * 5;
    // a tiny camel, a line of "text", a time
    for (const [dx, dy] of [[0, 1], [1, 0], [1, 1], [2, 1], [3, 0], [3, 1], [4, 1], [4, 2], [1, 2], [3, 2]]) p.set(4 + dx, y + dy, H('#8a4a24'));
    for (let x = 11; x < 21; x++) if (x % 3 !== 2) p.set(x, y + 1, H('#5a3a2a'));
    for (let x = 23; x < 28; x++) p.set(x, y + 1, H(['#c83a2a', '#2a6ab8', '#2a8a5a'][k]));
  }
  for (let x = 1; x < 31; x++) p.set(x, 20, H('#00000030'));
  return p;
})();
DECOR_SIZE.ds_timetable = [2, 1];

/** A stone well with a wooden frame, a pulley and a bucket. */
DECOR.ds_well = (() => {
  const W = 32, Hh = 40, p = new Pix(W, Hh);
  shadowEllipse(p, 17, Hh - 2, 14, 2, H('#7a4a2040'));
  // the round stone shaft
  for (let y = 22; y < Hh - 2; y++) for (let x = 4; x < 28; x++) {
    const row = Math.floor((y - 22) / 4), bx = (x + (row % 2) * 3) % 6;
    const lx = (x - 4) / 24;
    let c = lx < 0.25 ? H('#e8d4b0') : lx < 0.7 ? H('#d2b88e') : H('#b0966e');
    if ((y - 22) % 4 === 3 || bx === 5) c = H('#8a7458');
    p.set(x, y, x === 4 || x === 27 || y === Hh - 3 ? OUT : c);
  }
  // the dark mouth seen from above
  for (let y = 17; y < 23; y++) for (let x = 4; x < 28; x++) {
    const dx = (x + 0.5 - 16) / 12, dy = (y + 0.5 - 20) / 3.2;
    const d = dx * dx + dy * dy;
    if (d > 1) continue;
    p.set(x, y, d > 0.7 ? H('#e8d4b0') : d > 0.55 ? OUT : H('#1a1410'));
  }
  // frame, crossbar, pulley, rope, bucket
  for (const x of [5, 25]) for (let y = 2; y < 21; y++) { p.set(x, y, OUT); p.set(x + 1, y, H('#a8743e')); p.set(x + 2, y, OUT); }
  for (let x = 4; x < 29; x++) { p.set(x, 3, OUT); p.set(x, 4, H('#c8945a')); p.set(x, 5, OUT); }
  disc(p, 16, 7.5, 2.5, (d) => (d > 1.8 ? OUT : H('#8a8a96')));
  for (let y = 9; y < 15; y++) p.set(16, y, H('#d4a860'));
  for (let y = 14; y < 18; y++) for (let x = 13; x < 20; x++) p.set(x, y, x === 13 || x === 19 || y === 17 || y === 14 ? OUT : x < 15 ? H('#c8945a') : H('#9a6232'));
  return p;
})();
DECOR_SIZE.ds_well = [2, 1];

/** The rope maker's rack: coils hanging from a pole, a spool of twine. */
DECOR.ds_ropes = (() => {
  const W = 32, Hh = 32, p = new Pix(W, Hh);
  for (const x of [2, 27]) for (let y = 4; y < Hh - 1; y++) { p.set(x, y, OUT); p.set(x + 1, y, H('#a8743e')); p.set(x + 2, y, OUT); }
  for (let x = 1; x < 31; x++) { p.set(x, 5, OUT); p.set(x, 6, H('#c8945a')); p.set(x, 7, OUT); }
  for (const cx of [9, 17, 24]) {
    for (let k = 0; k < 3; k++) disc(p, cx, 15 + k, 5 - k * 0.6, (d, x, y) => (d > 4.4 - k * 0.6 ? OUT : (x + y) % 2 ? H('#d4a860') : H('#a87a3a')));
    line(p, cx, 7, cx, 10, H('#d4a860'));
  }
  return p;
})();
DECOR_SIZE.ds_ropes = [2, 1];
DECOR.ds_saltpile = (() => {
  const p = new Pix(16, 20);
  shadowEllipse(p, 8, 18, 7, 1, H('#5a504840'));
  for (let y = 4; y < 18; y++) { const hw = Math.round((y - 4) * 0.5) + 1; for (let x = 8 - hw; x <= 8 + hw; x++) { const lx = (x - 8 + hw) / (2 * hw); p.set(x, y, x === 8 - hw || x === 8 + hw || y === 17 ? H('#7a7a84') : lx < 0.4 ? H('#ffffff') : lx < 0.75 ? H('#eef0f2') : H('#c8ccd4')); } }
  p.set(8, 4, H('#7a7a84'));
  return p;
})();
DECOR.ds_saltslabs = (() => {
  const p = new Pix(16, 20);
  for (let k = 0; k < 4; k++) { const y = 15 - k * 3, x0 = 2 + (k % 2); for (let yy = 0; yy < 3; yy++) for (let x = x0; x < x0 + 12; x++) p.set(x, y + yy, x === x0 || x === x0 + 11 || yy === 2 ? H('#8a8680') : yy === 0 ? H('#ffffff') : H('#e8e6e0')); for (let x = x0; x < x0 + 12; x++) p.set(x, y - 1, H('#8a8680')); }
  return p;
})();

// ---------------------------------------------------------------- the ruins

const STONE = ['#a8683a', '#c8864e', '#dca066', '#ecbc84', '#f6d4a4'].map(H);
/** Sand heaped against the foot of something (a soft mound in the dune colours). */
function sandHeap(p: Pix, cx: number, by: number, rx: number, ry: number) {
  for (let y = by - ry; y <= by; y++) for (let x = cx - rx; x <= cx + rx; x++) {
    const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - by) / ry;
    if (dx * dx + dy * dy > 1) continue;
    const lv = -dx * 0.6 - dy * 0.3 + (hash(x, y, 640) - 0.5) * 0.2;
    p.set(x, y, DUNE[lv < -0.3 ? 1 : lv < 0.25 ? 2 : 3]);
  }
}
/** A standing column: plinth, a fluted shaft shaded as a cylinder, a flared capital of stone leaves. */
function column(hgt: number, broken: boolean): Pix {
  const W = 16, Hh = hgt, p = new Pix(W, Hh);
  shadowEllipse(p, 9, Hh - 2, 7, 1, H('#7a4a2048'));
  const shaftTop = broken ? 6 : 12;
  for (let y = shaftTop; y < Hh - 5; y++) for (let x = 3; x < 13; x++) {
    if (broken && y < shaftTop + 4 && hash(x, 0, 650) * 4 > y - shaftTop + 1) continue;
    const t = (x - 3) / 9;
    let k = t < 0.2 ? 3 : t < 0.55 ? 2 : t < 0.85 ? 1 : 0;
    if ((x - 3) % 3 === 2) k = Math.max(0, k - 1); // flutes
    if (y % 11 === 0) k = Math.max(0, k - 1); // drum joints
    p.set(x, y, x === 3 || x === 12 ? OUT : STONE[k]);
  }
  if (broken) for (let x = 3; x < 13; x++) { for (let y = shaftTop; y < shaftTop + 5; y++) if (p.get(x, y) & 255) { p.set(x, y, OUT); if (p.get(x, y + 1) & 255) p.set(x, y + 1, STONE[4]); break; } }
  // plinth
  for (let y = Hh - 5; y < Hh - 1; y++) for (let x = 1; x < 15; x++) p.set(x, y, x === 1 || x === 14 || y === Hh - 2 || y === Hh - 5 ? OUT : y === Hh - 4 ? STONE[4] : STONE[2]);
  if (!broken) {
    // capital: a slab on top of a flared bundle of carved leaves
    for (let y = 6; y < 12; y++) { const hw = 5 + Math.round((12 - y) * 0.4); for (let x = 8 - hw; x < 8 + hw; x++) p.set(x, y, x === 8 - hw || x === 7 + hw ? OUT : (x % 3 === 0 ? STONE[1] : STONE[x < 8 ? 3 : 2])); }
    for (let y = 2; y < 6; y++) for (let x = 0; x < 16; x++) p.set(x, y, x === 0 || x === 15 || y === 2 || y === 5 ? OUT : y === 3 ? STONE[4] : STONE[2]);
  }
  sandHeap(p, 6, Hh - 2, 6, 3);
  return p;
}
DECOR.ds_column = column(58, false);
DECOR.ds_column_broken = column(34, true);

/** The column that fell across the road (3×1): drums lying in a row, the capital at one end, sand heaped against it. */
DECOR.ds_column_fallen = (() => {
  const W = 48, Hh = 26, p = new Pix(W, Hh);
  shadowEllipse(p, 24, Hh - 3, 23, 2, H('#7a4a2048'));
  const cy = 14, r = 7;
  for (let x = 4; x < 42; x++) {
    const jag = x < 7 ? Math.round(hash(x, 1, 660) * 3) : 0;
    for (let y = cy - r + jag; y <= cy + r; y++) {
      const t = (y - (cy - r)) / (2 * r);
      let k = t < 0.2 ? 4 : t < 0.45 ? 3 : t < 0.7 ? 2 : t < 0.88 ? 1 : 0;
      if ((y - cy + 20) % 3 === 0 && t > 0.1 && t < 0.9) k = Math.max(0, k - 1); // flutes along it
      if ((x - 4) % 12 === 11) k = 0; // drum joints
      p.set(x, y, y === cy - r + jag || y === cy + r ? OUT : STONE[k]);
    }
    if (x === 4) for (let y = cy - r; y <= cy + r; y++) p.set(x, y, OUT);
  }
  // the broken face at the near end, showing the drum's round section
  for (let y = cy - r; y <= cy + r; y++) for (let x = 2; x < 6; x++) { const dy = (y - cy) / r, dx = (x - 4) / 2; if (dx * dx + dy * dy <= 1) p.set(x, y, dx * dx + dy * dy > 0.7 ? OUT : STONE[3]); }
  // the capital at the far end
  for (let x = 42; x < 47; x++) for (let y = cy - r - 2; y <= cy + r + 2; y++) p.set(x, y, x === 46 || y === cy - r - 2 || y === cy + r + 2 ? OUT : x === 42 ? STONE[1] : STONE[(y < cy ? 3 : 2)]);
  sandHeap(p, 14, Hh - 3, 10, 4); sandHeap(p, 34, Hh - 3, 8, 3);
  // chips of stone around
  for (const [x, y] of [[1, 22], [46, 23], [20, 4]] as [number, number][]) { p.set(x, y, STONE[2]); p.set(x + 1, y, STONE[1]); p.set(x, y + 1, OUT); }
  return p;
})();
DECOR_SIZE.ds_column_fallen = [3, 1];

/** An obelisk: a tapering shaft carved with signs, a golden tip. */
DECOR.ds_obelisk = (() => {
  const W = 16, Hh = 66, p = new Pix(W, Hh);
  shadowEllipse(p, 9, Hh - 2, 7, 1, H('#7a4a2048'));
  for (let y = 8; y < Hh - 4; y++) {
    const hw = 3 + Math.round((y - 8) / (Hh - 12) * 2);
    for (let x = 8 - hw; x < 8 + hw; x++) p.set(x, y, x === 8 - hw || x === 7 + hw ? OUT : x < 8 ? STONE[3] : STONE[1]);
  }
  for (let y = 1; y < 9; y++) { const hw = Math.round((y - 1) * 0.4) + 1; for (let x = 8 - hw; x < 8 + hw; x++) p.set(x, y, x === 8 - hw || x === 7 + hw ? OUT : x < 8 ? H('#f8e070') : H('#d0a030')); }
  // carved signs down the face
  const glyphs = [[[0, 0], [1, 0], [0, 1], [1, 1]], [[0, 0], [2, 0], [1, 1]], [[0, 0], [0, 1], [0, 2], [1, 1]], [[0, 1], [1, 0], [2, 1]]];
  for (let k = 0; k < 7; k++) for (const [dx, dy] of glyphs[k % 4]) p.set(6 + dx, 14 + k * 7 + dy, STONE[0]);
  for (let y = Hh - 5; y < Hh - 1; y++) for (let x = 2; x < 14; x++) p.set(x, y, x === 2 || x === 13 || y === Hh - 2 ? OUT : STONE[2]);
  sandHeap(p, 11, Hh - 2, 5, 3);
  return p;
})();

/**
 * A carved wall block (2×1) with the old signs on it: the sun, a wave (water), a camel, an eye and a cat. They are
 * cut into the stone: dark inside, lit along their lower edge.
 */
DECOR.ds_carving = (() => {
  const W = 32, Hh = 40, p = new Pix(W, Hh);
  shadowEllipse(p, 16, Hh - 2, 15, 2, H('#7a4a2048'));
  for (let y = 6; y < Hh - 2; y++) for (let x = 1; x < 31; x++) {
    const row = Math.floor((y - 6) / 11), bx = (x + (row % 2) * 7) % 15;
    let c = STONE[(Math.floor(hash(Math.floor((x + (row % 2) * 7) / 15), row, 670) * 2) + 2)];
    if ((y - 6) % 11 === 10 || bx === 14) c = STONE[0];
    if (x === 1 || x === 30 || y === 6 || y === Hh - 3) c = OUT;
    p.set(x, y, c);
  }
  // broken top edge
  for (let x = 1; x < 31; x++) { const d = Math.floor(hash(x >> 1, 2, 671) * 3); for (let y = 6; y < 6 + d; y++) p.set(x, y, 0); p.set(x, 6 + d, OUT); p.set(x, 7 + d, STONE[4]); }
  const cut = (pts: [number, number][], x0: number, y0: number) => { for (const [x, y] of pts) { p.set(x0 + x, y0 + y, STONE[0]); if (!pts.some(([a, b]) => a === x && b === y + 1)) p.set(x0 + x, y0 + y + 1, STONE[4]); } };
  const sun: [number, number][] = [[1, 0], [2, 0], [0, 1], [3, 1], [0, 2], [3, 2], [1, 3], [2, 3], [-1, -1], [4, -1], [-1, 4], [4, 4]];
  const wave: [number, number][] = [[0, 1], [1, 0], [2, 1], [3, 0], [4, 1], [0, 3], [1, 2], [2, 3], [3, 2], [4, 3]];
  const camel: [number, number][] = [[0, 0], [1, 0], [1, 1], [2, 1], [3, 0], [4, 0], [5, 1], [3, 1], [4, 1], [2, 2], [5, 2], [2, 3], [5, 3]];
  const eye: [number, number][] = [[0, 1], [1, 0], [2, 0], [3, 0], [4, 1], [1, 2], [2, 2], [3, 2], [2, 1]];
  const cat: [number, number][] = [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3], [2, 3], [3, 3], [3, 2], [4, 1]];
  cut(sun, 5, 11); cut(wave, 13, 11); cut(camel, 21, 11);
  cut(eye, 6, 23); cut(cat, 14, 22); cut(sun.slice(0, 8), 23, 23);
  sandHeap(p, 9, Hh - 2, 8, 4); sandHeap(p, 26, Hh - 2, 5, 3);
  return p;
})();
DECOR_SIZE.ds_carving = [2, 1];

/** A giant stone cat's head (2×2), buried in the sand up to its chin. */
DECOR.ds_statue_head = (() => {
  const S = ['#a8683a', '#c8864e', '#dca066', '#ecbc84'];
  const B = ['#2a4a7a', '#3a6aa8', '#5a8ac8', '#7aa8e0'];
  const c = figure(32, 40, [
    { x: 16, y: 22, rx: 12, ry: 11, c: S, z: 2 },
    { x: 7, y: 9, rx: 4, ry: 7, c: S, z: 1 }, { x: 25, y: 9, rx: 4, ry: 7, c: S, z: 1 },
    { x: 16, y: 13, rx: 12, ry: 5, c: B, z: 3, flat: true },
    { x: 16, y: 27, rx: 5, ry: 3.5, c: S, z: 4 },
  ], OUT, (L) => {
    for (let x = 5; x < 28; x += 3) for (let y = 9; y < 17; y++) if (L.get(x, y) & 255) L.set(x, y, H('#e8c060'));
    for (const x of [10, 20]) { L.set(x, 21, OUT); L.set(x + 1, 21, OUT); L.set(x + 2, 21, OUT); L.set(x + 1, 22, H('#3a6aa8')); }
    L.set(16, 26, OUT); L.set(15, 27, OUT); L.set(17, 27, OUT);
    for (let k = 0; k < 6; k++) L.set(22 + (k >> 1), 18 + k, H('#8a5030'));
  });
  const p = new Pix(32, 42);
  p.blit(c, 0, 0);
  sandHeap(p, 16, 40, 16, 9);
  return p;
})();
DECOR_SIZE.ds_statue_head = [2, 2];

/** The great stone cat (4×2), lying with its paws in front, half under the sand: the guardian of the ruins. */
DECOR.ds_sphinx = (() => {
  const S = ['#a8683a', '#c8864e', '#dca066', '#ecbc84'];
  const B = ['#2a4a7a', '#3a6aa8', '#5a8ac8', '#7aa8e0'];
  const c = figure(64, 48, [
    { x: 40, y: 32, rx: 20, ry: 10, c: S, z: 1 },
    { x: 54, y: 30, rx: 6, ry: 6, c: S, z: 2 },
    { x: 14, y: 40, rx: 10, ry: 4, c: S, z: 3 }, { x: 22, y: 41, rx: 8, ry: 3.5, c: S, z: 3 },
    { x: 18, y: 22, rx: 10, ry: 11, c: S, z: 4 },
    { x: 11, y: 10, rx: 3.5, ry: 6, c: S, z: 3 }, { x: 25, y: 10, rx: 3.5, ry: 6, c: S, z: 3 },
    { x: 18, y: 15, rx: 10, ry: 4.5, c: B, z: 5, flat: true },
    { x: 18, y: 26, rx: 4.5, ry: 3.2, c: S, z: 6 },
  ], OUT, (L) => {
    for (let x = 9; x < 28; x += 3) for (let y = 11; y < 19; y++) if (L.get(x, y) & 255) L.set(x, y, H('#e8c060'));
    for (const x of [13, 21]) { L.set(x, 21, OUT); L.set(x + 1, 21, OUT); L.set(x + 2, 21, OUT); L.set(x + 1, 22, H('#3a6aa8')); }
    L.set(18, 25, OUT); L.set(17, 26, OUT); L.set(19, 26, OUT);
    for (const x of [8, 11, 14, 19, 22, 25]) L.set(x, 42, OUT);
    for (let k = 0; k < 9; k++) L.set(36 + k * 2, 26 + (k % 3), H('#a8683a'));
  });
  const p = new Pix(64, 48);
  p.blit(c, 0, 0);
  sandHeap(p, 44, 47, 22, 7); sandHeap(p, 6, 47, 8, 4);
  return p;
})();
DECOR_SIZE.ds_sphinx = [4, 2];

// ---------------------------------------------------------------- the town gate, the closed doors, the heat barrier

/** The gatehouse of Sandstone Town (drawn from its left tower over the passage to the right tower). */
DECOR.ds_gatehouse = (() => {
  const W = 64, Hh = 70, p = new Pix(W, Hh);
  const wall = WALLS.ochre.map(H);
  for (const tx of [0, 48]) {
    plaster(p, tx + 1, 10, 14, Hh - 11, wall, 680 + tx);
    frame(p, tx, 10, 16, Hh - 10, OUT);
    for (let x = tx; x < tx + 16; x++) for (let y = 4; y < 11; y++) { const m = Math.floor((x - tx) / 4) % 2 === 0; if (y < (m ? 4 : 7)) continue; p.set(x, y, y === (m ? 4 : 7) || x === tx || x === tx + 15 ? OUT : wall[3]); }
    windowAt(p, tx + 6, 20, 4, 8, 'arch', '#2a1a12');
    // pennant
    for (let y = 0; y < 5; y++) p.set(tx + 8, y, OUT);
    for (const [dx, dy] of [[1, 0], [2, 0], [3, 0], [4, 1], [1, 1], [2, 1], [3, 1], [1, 2], [2, 2]]) p.set(tx + 8 + dx, dy, H(['#e8b048', '#c05a2a'][dy % 2]));
  }
  // the arch over the passage
  plaster(p, 16, 14, 32, 22, wall, 690);
  for (let x = 16; x < 48; x++) { p.set(x, 14, OUT); const m = Math.floor(x / 4) % 2 === 0; if (m) { p.set(x, 11, OUT); p.set(x, 12, wall[3]); p.set(x, 13, wall[3]); } }
  for (let y = 22; y < Hh; y++) for (let x = 16; x < 48; x++) {
    const cy = 22 + 16;
    const inside = y >= cy || Math.hypot(x + 0.5 - 32, y + 0.5 - cy) <= 16;
    if (inside) p.set(x, y, 0);
    else if (Math.hypot(x + 0.5 - 32, y + 0.5 - cy) <= 17) p.set(x, y, OUT);
  }
  // transparent pixels: Pix.set ignores alpha 0, so clear by rebuilding
  const q = new Pix(W, Hh);
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
    const inside = x >= 16 && x < 48 && y >= 22 && (y >= 38 || Math.hypot(x + 0.5 - 32, y + 0.5 - 38) <= 16);
    if (!inside) { const c = p.get(x, y); if (c & 255) q.set(x, y, c); }
  }
  // the keystone with a painted sun
  disc(q, 32, 22, 3.5, (d) => (d > 2.8 ? OUT : H('#f4c030')));
  return q;
})();
DECOR_SIZE.ds_gatehouse = [1, 1];
/** The gatehouse's right tower only blocks (it is drawn with the left one). */
DECOR.ds_gatepost = new Pix(1, 1);
DECOR_SIZE.ds_gatepost = [1, 1];

/** The town gate's doors, shut against the sandstorm, sand blowing past them. */
DECOR.ds_gatedoors = (() => {
  const W = 32, Hh = 34, p = new Pix(W, Hh);
  for (let y = 2; y < Hh - 1; y++) for (let x = 0; x < W; x++) {
    const inside = y >= 18 || Math.hypot(x + 0.5 - 16, y + 0.5 - 18) <= 16;
    if (!inside) continue;
    let c = x % 4 === 0 ? H('#6a3e1e') : x < 16 ? H('#a86a34') : H('#8a5428');
    if (x === 15 || x === 16) c = H('#3a2210');
    if (y === 12 || y === 13 || y === 24 || y === 25) c = H('#4a4a54');
    p.set(x, y, c);
  }
  for (let y = 2; y < Hh - 1; y++) for (let x = 0; x < W; x++) {
    const inside = (xx: number, yy: number) => yy >= 18 || Math.hypot(xx + 0.5 - 16, yy + 0.5 - 18) <= 16;
    if (inside(x, y) && (!inside(x, y - 1) || x === 0 || x === W - 1)) p.set(x, y, OUT);
  }
  for (let x = 0; x < W; x++) p.set(x, Hh - 1, OUT);
  p.set(13, 20, H('#f0c860')); p.set(18, 20, H('#f0c860'));
  // blown sand streaming past
  for (let k = 0; k < 10; k++) { const y = 4 + Math.floor(hash(k, 1, 700) * 26), x = Math.floor(hash(k, 2, 700) * 24); for (let i = 0; i < 4 + (k % 4); i++) p.set(x + i, y + (i > 2 ? 1 : 0), H('#f4d8a0c0')); }
  return p;
})();
DECOR_SIZE.ds_gatedoors = [2, 1];

/** The ranger's barrier across the road to the salt pan (1×2): two posts, a rope, a sign with a sun and a drop. */
DECOR.ds_heatbar = (() => {
  const W = 16, Hh = 44, p = new Pix(W, Hh);
  for (const by of [22, Hh - 1]) {
    shadowEllipse(p, 8, by - 1, 4, 1, H('#5a504840'));
    for (let y = by - 16; y < by - 1; y++) { p.set(6, y, OUT); p.set(7, y, H('#e8d4b0')); p.set(8, y, H('#b89a70')); p.set(9, y, OUT); if ((y >> 2) % 2) { p.set(7, y, H('#d84a2a')); p.set(8, y, H('#a83a1e')); } }
    for (let x = 6; x < 10; x++) p.set(x, by - 17, OUT);
  }
  // the rope sags from post to post
  for (let y = 8; y < Hh - 15; y++) p.set(8 + Math.round(Math.sin(((y - 8) / (Hh - 23)) * Math.PI) * 3), y, H('#d4a860'));
  // a sign: sun and a water drop
  for (let y = 14; y < 26; y++) for (let x = 1; x < 15; x++) p.set(x, y, x === 1 || x === 14 || y === 14 || y === 25 ? OUT : H('#fff4dc'));
  disc(p, 5.5, 19.5, 2.5, (d) => (d > 2 ? H('#d84a2a') : H('#f4c030')));
  for (const [x, y] of [[10, 17], [10, 18], [9, 19], [11, 19], [9, 20], [11, 20], [10, 21], [10, 20]] as [number, number][]) p.set(x, y, H('#3a8ad8'));
  return p;
})();
DECOR_SIZE.ds_heatbar = [1, 2];

// ---------------------------------------------------------------- the train ride to Oasis City

RIDE_LOOKS.desert = {
  sky: ['#5aa8e0', '#f8e0b0'], cloud: '#fff4e0', far: ['#e0a868', '#f8d8a0'], hill: ['#e8b878', '#dcaa6a'],
  ground: '#eec98a', groundD: '#cc9c5c', fence: '#8a5a30', farShape: 'dunes',
  props: [DECOR.ds_palm, DECOR.ds_camel, DECOR.ds_cactus, DECOR.ds_tent, DECOR.ds_domehouse, DECOR.ds_palm],
};

// ---------------------------------------------------------------- furniture for the homes

const WOOD = ['#4a2a14', '#7a4a24', '#9a6232', '#c08a4e', '#dca86a'].map(H);
const BRASS = ['#7a5418', '#b88a2a', '#e0b848', '#fff0a0'].map(H);
const furn = (key: string, size: [number, number], p: Pix) => { DECOR[key] = p; DECOR_SIZE[key] = size; };

/** Floor cushions on a low mattress, with tassels. */
furn('ds_cushions', [2, 1], (() => {
  const p = new Pix(32, 22);
  shadowEllipse(p, 16, 20, 15, 1, H('#2a1a0a40'));
  for (let y = 13; y < 20; y++) for (let x = 1; x < 31; x++) p.set(x, y, x === 1 || x === 30 || y === 19 || y === 13 ? OUT : y < 15 ? H('#e8c070') : (x % 4 === 0 ? H('#a83a2a') : H('#c84a32')));
  const c = figure(32, 18, [
    { x: 7, y: 10, rx: 6, ry: 5, c: ['#8a2a1a', '#b83a2a', '#d8503a', '#f07a5a'], z: 1 },
    { x: 16, y: 9, rx: 6, ry: 5.5, c: ['#1a3a6a', '#2a5a9a', '#3a7ad8', '#6aa0f0'], z: 2 },
    { x: 25, y: 10, rx: 6, ry: 5, c: ['#8a5a10', '#c88a20', '#e8b048', '#f8d878'], z: 1 },
  ], OUT, (L) => { for (const x of [7, 16, 25]) { L.set(x, 9, H('#f4ecd8')); L.set(x - 1, 10, H('#f4ecd8')); L.set(x + 1, 10, H('#f4ecd8')); } });
  p.blit(c, 0, 0);
  for (const x of [2, 29]) { p.set(x, 20, H('#f2c040')); p.set(x, 21, H('#f2c040')); }
  return p;
})());

/** A round brass tray on a low stand: a teapot with a curved spout and little glasses of mint tea. */
furn('ds_teaset', [1, 1], (() => {
  const p = new Pix(16, 20);
  shadowEllipse(p, 8, 18, 7, 1, H('#2a1a0a40'));
  for (const x of [3, 12]) for (let y = 12; y < 18; y++) { p.set(x, y, WOOD[0]); p.set(x + 1, y, WOOD[2]); }
  for (let y = 9; y < 14; y++) for (let x = 0; x < 16; x++) {
    const dx = (x + 0.5 - 8) / 8, dy = (y + 0.5 - 11.5) / 2.5;
    if (dx * dx + dy * dy > 1) continue;
    p.set(x, y, dx * dx + dy * dy > 0.7 ? BRASS[0] : dx < -0.2 ? BRASS[3] : BRASS[2]);
  }
  // teapot
  for (let y = 3; y < 11; y++) for (let x = 4; x < 10; x++) {
    const w = y < 5 ? 1 : y < 7 ? 2 : 3;
    if (Math.abs(x + 0.5 - 7) > w) continue;
    p.set(x, y, Math.abs(x + 0.5 - 7) > w - 1 ? BRASS[0] : x < 7 ? BRASS[3] : BRASS[1]);
  }
  p.set(7, 2, BRASS[0]); p.set(10, 7, BRASS[1]); p.set(11, 6, BRASS[1]); p.set(12, 5, BRASS[1]); p.set(3, 7, BRASS[0]); p.set(2, 8, BRASS[0]);
  // glasses with green tea
  for (const x of [11, 13]) { p.set(x, 9, H('#d8f0e0')); p.set(x, 10, H('#6aa83a')); p.set(x, 11, H('#4a8a2a')); }
  p.set(3, 10, H('#d8f0e0')); p.set(3, 11, H('#6aa83a'));
  return p;
})());

/** A brass lantern on a tall stand, pierced with stars, glowing. */
furn('ds_lantern', [1, 1], (() => {
  const p = new Pix(16, 36);
  shadowEllipse(p, 8, 34, 5, 1, H('#2a1a0a40'));
  // warm glow
  disc(p, 8, 9, 7.5, (d) => (d > 5 ? H('#ffd06018') : H('#ffd06030')));
  for (let y = 16; y < 33; y++) { p.set(7, y, BRASS[0]); p.set(8, y, BRASS[2]); }
  for (let x = 4; x < 12; x++) p.set(x, 33, BRASS[0]);
  for (let y = 4; y < 15; y++) {
    const w = y < 6 ? 1 : y < 13 ? 3 : 2;
    for (let x = 8 - w; x < 8 + w; x++) {
      const e = x === 8 - w || x === 7 + w;
      const hole = !e && ((x + y) % 3 === 0);
      p.set(x, y, e ? BRASS[0] : hole ? H('#fff4b0') : x < 8 ? BRASS[2] : BRASS[1]);
    }
  }
  p.set(7, 2, BRASS[0]); p.set(8, 2, BRASS[0]); p.set(7, 3, BRASS[1]); p.set(8, 3, BRASS[1]);
  return p;
})());

/** A loom with a half-woven carpet: warp threads above, the pattern growing below, a shuttle. */
furn('ds_loom', [2, 1], (() => {
  const p = new Pix(32, 44);
  shadowEllipse(p, 16, 42, 15, 1, H('#2a1a0a40'));
  for (const x of [2, 28]) for (let y = 2; y < 42; y++) { p.set(x, y, OUT); p.set(x + 1, y, WOOD[3]); p.set(x + 2, y, OUT); }
  for (const y of [3, 30]) for (let x = 1; x < 31; x++) { p.set(x, y, OUT); p.set(x, y + 1, WOOD[3]); p.set(x, y + 2, OUT); }
  for (let x = 6; x < 27; x += 2) for (let y = 6; y < 18; y++) p.set(x, y, H('#f0e4c8'));
  for (let y = 18; y < 30; y++) for (let x = 5; x < 28; x++) {
    const cx = Math.abs(x - 16), cy = Math.abs(y - 24);
    p.set(x, y, y === 18 ? H('#e8b048') : cx + cy < 4 ? H('#f0d070') : cx + cy < 6 ? H('#2a5a8a') : (x + y) % 4 === 0 ? H('#e8b048') : H('#b8342a'));
  }
  for (let x = 9; x < 22; x++) { p.set(x, 17, WOOD[1]); p.set(x, 16, WOOD[4]); }
  // a basket of yarn
  for (const [x, c] of [[6, '#3a7ad8'], [11, '#e8b048'], [22, '#2a9a5a']] as [number, string][]) disc(p, x + 2, 38.5, 2.5, (d) => (d > 2 ? OUT : H(c)));
  return p;
})());

/** A painted wooden chest with brass corners. */
furn('ds_chest', [1, 1], (() => {
  const p = new Pix(16, 18);
  shadowEllipse(p, 8, 16, 7, 1, H('#2a1a0a40'));
  for (let y = 4; y < 16; y++) for (let x = 1; x < 15; x++) {
    const e = x === 1 || x === 14 || y === 4 || y === 15 || y === 8;
    p.set(x, y, e ? OUT : y < 8 ? (x < 5 ? H('#3a8a9a') : H('#2a6a7a')) : ((x + y) % 5 === 0 ? H('#e8b048') : H('#2a6a7a')));
  }
  for (const [x, y] of [[2, 5], [13, 5], [2, 14], [13, 14]] as [number, number][]) p.set(x, y, BRASS[3]);
  p.set(7, 9, BRASS[2]); p.set(8, 9, BRASS[2]); p.set(7, 10, BRASS[0]); p.set(8, 10, BRASS[0]);
  return p;
})());

/** A low bed: a mattress on a wooden frame, a striped blanket and a pillow. */
furn('ds_bed', [2, 1], (() => {
  const p = new Pix(32, 22);
  shadowEllipse(p, 16, 20, 15, 1, H('#2a1a0a40'));
  for (let y = 6; y < 20; y++) for (let x = 1; x < 31; x++) {
    const e = x === 1 || x === 30 || y === 6 || y === 19;
    let c = y > 16 ? WOOD[2] : x < 9 ? H('#f4ecd8') : (Math.floor(x / 3) % 3 === 0 ? H('#e8b048') : Math.floor(x / 3) % 3 === 1 ? H('#b8342a') : H('#2a5a8a'));
    if (y === 16) c = WOOD[0];
    if (x === 9 && y < 16) c = OUT;
    p.set(x, y, e ? OUT : c);
  }
  for (let y = 8; y < 14; y++) for (let x = 3; x < 8; x++) p.set(x, y, x === 3 || x === 7 || y === 8 || y === 13 ? H('#b8a888') : H('#ffffff'));
  return p;
})());

/** Shelves against the wall: jars, books, rolled scrolls, a little brass pot. */
furn('ds_shelf', [2, 1], (() => {
  const p = new Pix(32, 38);
  for (let y = 2; y < 37; y++) for (let x = 1; x < 31; x++) p.set(x, y, x === 1 || x === 30 || y === 2 || y === 36 ? OUT : x < 3 || x > 28 ? WOOD[2] : H('#5a3418'));
  for (const y of [12, 23, 34]) for (let x = 2; x < 30; x++) { p.set(x, y, WOOD[3]); p.set(x, y + 1, WOOD[1]); }
  // top shelf: books and a jar
  [['#b8342a', 6], ['#2a5a8a', 8], ['#e8b048', 7], ['#3a8a5a', 6], ['#8a3a8a', 7]].forEach(([c, h], i) => { for (let y = 12 - (h as number); y < 12; y++) { p.set(4 + i * 2, y, H(c as string)); p.set(5 + i * 2, y, scale(H(c as string), 0.8)); } });
  jar(p, 20, 7, '#c86a3a'); jar(p, 24, 7, '#2a7a9a');
  // middle: scrolls
  for (let k = 0; k < 4; k++) { const x = 4 + k * 6; for (let xx = 0; xx < 5; xx++) { p.set(x + xx, 20, H('#f0e0b8')); p.set(x + xx, 21, H('#c8b088')); p.set(x + xx, 22, H('#f0e0b8')); } p.set(x, 21, H('#8a3a14')); p.set(x + 4, 21, H('#8a3a14')); }
  // bottom: jars and a brass pot
  jar(p, 4, 29, '#d88a4a'); jar(p, 9, 29, '#a85a2a'); jar(p, 22, 29, '#e8d8b0');
  disc(p, 17, 31.5, 2.5, () => BRASS[2]);
  return p;
})());

/** A star map on dark cloth, hung on the wall: the stars the caravans travel by, the North Star in gold. */
furn('ds_starmap', [2, 1], (() => {
  const p = new Pix(32, 16);
  for (let y = 1; y < 15; y++) for (let x = 2; x < 30; x++) p.set(x, y, x === 2 || x === 29 || y === 1 || y === 14 ? WOOD[1] : H('#1a2a5a'));
  const stars: [number, number][] = [[6, 4], [9, 6], [12, 5], [14, 8], [17, 10], [20, 9], [23, 6], [26, 4], [8, 11], [25, 12]];
  for (let i = 0; i + 1 < 5; i++) line(p, stars[i][0], stars[i][1], stars[i + 1][0], stars[i + 1][1], H('#4a6aa8'));
  for (const [x, y] of stars) p.set(x, y, H('#ffffff'));
  p.set(26, 4, H('#f8d040')); p.set(25, 4, H('#f8d04080')); p.set(27, 4, H('#f8d04080')); p.set(26, 3, H('#f8d04080')); p.set(26, 5, H('#f8d04080'));
  for (let x = 2; x < 30; x++) p.set(x, 15, H('#00000030'));
  return p;
})());

/** A carpet hung on the wall. */
furn('ds_wallrug', [2, 1], (() => {
  const p = new Pix(32, 16);
  for (let y = 1; y < 15; y++) for (let x = 3; x < 29; x++) {
    const e = Math.min(x - 3, 28 - x, y - 1, 14 - y);
    const d = Math.abs(x - 15.5) / 2 + Math.abs(y - 7.5);
    p.set(x, y, e < 1 ? H('#1a2a4a') : e < 3 ? ((x + y) % 2 ? H('#e8b048') : H('#2a5a8a')) : d < 3 ? H('#f0d070') : d < 5 ? H('#2a5a8a') : H('#2a7a6a'));
  }
  for (let x = 3; x < 29; x++) p.set(x, 0, WOOD[1]);
  for (let x = 4; x < 28; x += 2) p.set(x, 15, H('#f4ecd8'));
  return p;
})());

/** A clay bread oven, round, with a glow in its mouth and flat breads on a tray beside it. */
furn('ds_oven', [1, 1], (() => {
  const p = new Pix(16, 26);
  shadowEllipse(p, 8, 24, 7, 1, H('#2a1a0a40'));
  dome(p, 8, 24, 7.5, ['#9a5a30', '#b8703e', '#d08a52', '#e4a46a']);
  for (let y = 18; y < 24; y++) for (let x = 5; x < 11; x++) { const dy = (y - 18) / 6; if (Math.abs(x + 0.5 - 8) > 3 * Math.sqrt(dy) + 0.5) continue; p.set(x, y, y > 21 ? H('#f8a030') : H('#d84a1a')); }
  const q = new Pix(16, 26); q.blit(p, -2, 0);
  disc(q, 12.5, 21.5, 3, (d) => (d > 2.4 ? H('#8a5a2a') : (d < 1.2 ? H('#f4d498') : H('#e8b878'))));
  return q;
})());

/** A scholar's low desk: scrolls, an ink pot, a candle. */
furn('ds_desk', [2, 1], (() => {
  const p = new Pix(32, 24);
  shadowEllipse(p, 16, 22, 15, 1, H('#2a1a0a40'));
  for (const x of [3, 27]) for (let y = 13; y < 22; y++) { p.set(x, y, WOOD[0]); p.set(x + 1, y, WOOD[2]); }
  for (let y = 9; y < 14; y++) for (let x = 1; x < 31; x++) p.set(x, y, x === 1 || x === 30 || y === 9 || y === 13 ? OUT : y === 10 ? WOOD[4] : WOOD[3]);
  for (let x = 6; x < 18; x++) { p.set(x, 7, H('#f4e8c8')); p.set(x, 8, H('#e0d0a8')); }
  for (let x = 8; x < 16; x += 2) p.set(x, 7, H('#5a4a3a'));
  p.set(5, 7, H('#8a3a14')); p.set(5, 8, H('#8a3a14')); p.set(18, 7, H('#8a3a14')); p.set(18, 8, H('#8a3a14'));
  p.set(22, 7, OUT); p.set(23, 7, OUT); p.set(22, 8, H('#1a1a2a')); p.set(23, 8, H('#1a1a2a')); p.set(24, 4, H('#f4ecd8')); p.set(24, 5, H('#c8b888')); p.set(24, 6, H('#c8b888'));
  for (let y = 3; y < 9; y++) p.set(27, y, H('#f4ecd8')); p.set(27, 2, H('#f8d040')); p.set(27, 1, H('#fff0a0'));
  return p;
})());

/** A rack of camel saddles with coloured blankets. */
furn('ds_saddles', [2, 1], (() => {
  const p = new Pix(32, 26);
  shadowEllipse(p, 16, 24, 15, 1, H('#2a1a0a40'));
  for (const x of [2, 28]) for (let y = 8; y < 24; y++) { p.set(x, y, OUT); p.set(x + 1, y, WOOD[3]); }
  for (let x = 1; x < 31; x++) { p.set(x, 9, OUT); p.set(x, 10, WOOD[3]); }
  for (const [x0, a, b] of [[5, '#c83a2a', '#f2c040'], [17, '#2a6ab8', '#f4ecd8']] as [number, string, string][]) {
    for (let y = 11; y < 20; y++) for (let x = x0; x < x0 + 10; x++) p.set(x, y, x === x0 || x === x0 + 9 || y === 19 ? OUT : y % 3 === 0 ? H(b) : H(a));
    for (let y = 4; y < 11; y++) { p.set(x0 + 4, y, WOOD[1]); p.set(x0 + 5, y, WOOD[3]); }
    for (let x = x0 + 1; x < x0 + 9; x += 2) p.set(x, 20, H(b));
  }
  return p;
})());

/** A potted palm. */
furn('ds_potpalm', [1, 1], (() => {
  const p = new Pix(16, 28);
  const L = new Pix(16, 28);
  for (const [a, len] of [[200, 7], [-20, 7], [150, 7], [30, 7], [100, 6], [80, 6], [240, 5], [300, 5]] as [number, number][]) {
    const r = (a * Math.PI) / 180;
    for (let i = 0; i <= len; i++) { const x = Math.round(8 + Math.cos(r) * i), y = Math.round(12 - Math.sin(r) * i * 0.8 + (i * i) / 12); L.set(x, y, i < 3 ? H('#3a8a3a') : H('#62b048')); if (i > 1) L.set(x, y + 1, H('#2a6a2a')); }
  }
  for (let y = 12; y < 19; y++) L.set(8, y, H('#8a5a30'));
  outlined(p, L, 0, 0, H('#1a3a14'));
  jar(p, 5, 19, '#c86a3a');
  for (let y = 19; y < 26; y++) for (let x = 4; x < 12; x++) { const w = y < 21 ? 4 : 3; if (Math.abs(x + 0.5 - 8) <= w) p.set(x, y, Math.abs(x + 0.5 - 8) > w - 1 ? OUT : x < 7 ? H('#e08a50') : H('#c86a3a')); }
  return p;
})());

/** An astrolabe on a stand: brass rings for reading the stars. */
furn('ds_astrolabe', [1, 1], (() => {
  const p = new Pix(16, 30);
  shadowEllipse(p, 8, 28, 5, 1, H('#2a1a0a40'));
  for (let y = 14; y < 27; y++) { p.set(7, y, WOOD[0]); p.set(8, y, WOOD[2]); }
  for (let x = 4; x < 12; x++) { p.set(x, 27, WOOD[0]); p.set(x, 26, WOOD[3]); }
  disc(p, 8, 8, 6.5, (d, x, y) => (d > 5.7 ? BRASS[0] : d > 4.6 ? (x < 8 ? BRASS[3] : BRASS[2]) : d > 3.8 ? H('#2a1a0a00') : (x === 8 || y === 8 ? BRASS[1] : 0)));
  line(p, 3, 11, 13, 5, BRASS[2]);
  p.set(8, 8, BRASS[3]);
  return p;
})());

/** A big water jar in a wooden frame, with a ladle. */
furn('ds_waterjar', [1, 1], (() => {
  const p = figure(16, 24, [{ x: 8, y: 14, rx: 6, ry: 8, c: ['#8a4a24', '#b8683a', '#d08a52', '#e8aa70'], z: 1 }, { x: 8, y: 5.5, rx: 3.5, ry: 2, c: ['#8a4a24', '#b8683a', '#d08a52', '#e8aa70'], z: 2 }], OUT,
    (L) => { for (let x = 5; x < 11; x++) L.set(x, 5, H('#2a5a7a')); for (let x = 3; x < 13; x++) L.set(x, 16, H('#2a7a9a')); });
  return p;
})());
