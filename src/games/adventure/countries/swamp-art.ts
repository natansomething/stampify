/**
 * The Swamp's pixel art: murky green-brown water with duckweed, lily pads and drifting glints, mossy peat with
 * cotton grass and cranberries, muddy banks that curve with the water, weathered plank boardwalks on posts, bald
 * cypresses with knees and hanging moss, stilt huts with reed roofs and warm lanterns, punts, nets and the canal
 * market, mist and fireflies. A cool, muted palette; lanterns and windows are the only warm light.
 */
import { canopy, DECOR, DECOR_SIZE, disc, ITEMS, line, NPCS, outlined, palette, poly, registerTheme, shadowEllipse, T, vnoise, type TerrainHook } from '../art';
import { hash, hex, Pix, sprite } from '../pix';

const H = hex;
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
/** A colour with its alpha replaced (0..1). */
const alpha = (c: number, a: number) => ((c & 0xffffff00) | Math.round(clamp(a) * 255)) >>> 0;
/** Mixes two opaque colours. */
const mix = (a: number, b: number, t: number) => {
  const ch = (s: number) => Math.round(((a >>> s) & 255) * (1 - t) + ((b >>> s) & 255) * t);
  return ((ch(24) << 24) | (ch(16) << 16) | (ch(8) << 8) | 255) >>> 0;
};

// ---------------------------------------------------------------- colours

const WATER = { edge: H('#1c2619'), deep: H('#2b3f33'), mid: H('#34493a'), shallow: H('#3f5541'), murk: H('#4b5c40'), glint: H('#7d978a'), glintD: H('#22332a'), refl: H('#263529') };
const WEED = [H('#465c26'), H('#58702e'), H('#6c8438'), H('#82984a')];
const MUD = [H('#2e271b'), H('#3d3423'), H('#4c4230')];
const MOSS = { dark: H('#3c4a28'), light: H('#8f9c5c'), peat: H('#5a4e34'), peatD: H('#4a3f2a') };
const PLANK = [H('#6e6150'), H('#7c6e5a'), H('#8a7b64'), H('#968870')];
const PLANK_OUT = H('#2a2219'), PLANK_SEAM = H('#4a3f32'), PLANK_LIGHT = H('#aa9c82'), PLANK_SIDE = H('#3e3428');
const GLOW = { core: H('#fffbd0'), mid: H('#f2ec7a'), halo: H('#e8e27a') };

function tileThing(code: string): string | undefined {
  if (code === '.') return 'sw_bog';
  if (code === '~') return 'sw_water';
  if (code === 'o') return 'sw_stump';
  if (code === '#') return 'sw_swampforest';
  if (code === 'r' || code === 'y' || code === 'w') return 'sw_bogflower';
  return undefined;
}

// ---------------------------------------------------------------- terrain

type At = (x: number, y: number) => string;

/** Per-map caches (the `at` function is made once per map and used for both animation frames). */
const caches = new WeakMap<At, Map<number, number>>();
const memo = (at: At, k: number, f: () => number) => {
  let m = caches.get(at);
  if (!m) caches.set(at, (m = new Map()));
  let v = m.get(k);
  if (v === undefined) m.set(k, (v = f()));
  return v;
};
const key = (x: number, y: number, s: number) => ((x + 2000) * 8192 + (y + 2000)) * 8 + s;

/** Is the tile water underneath (a pond, or a boardwalk standing in water)? */
function wetTile(at: At, x: number, y: number): number {
  return memo(at, key(x, y, 0), () => {
    const c = at(x, y);
    if (c === '~') return 1;
    if (c === ':') return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => at(x + dx, y + dy) === '~') ? 1 : 0;
    return 0;
  });
}
/** How much open water is around a tile (0..1): deep water is darker. */
function depthTile(at: At, x: number, y: number): number {
  return memo(at, key(x, y, 1), () => {
    let n = 0;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) n += wetTile(at, x + dx, y + dy);
    return n / 25;
  });
}
const bilinear = (wx: number, wy: number, f: (x: number, y: number) => number) => {
  const gx = (wx + 0.5 - 8) / 16, gy = (wy + 0.5 - 8) / 16;
  const i = Math.floor(gx), j = Math.floor(gy), fx = gx - i, fy = gy - j;
  const a = f(i, j), b = f(i + 1, j), c = f(i, j + 1), d = f(i + 1, j + 1);
  return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
};
/** Wetness at a world pixel: > 0.5 is water. Bilinear between tile centres, so banks curve; a little noise. */
const wetAt = (at: At, wx: number, wy: number) => bilinear(wx, wy, (x, y) => wetTile(at, x, y)) + (vnoise(wx, wy, 6, 501) - 0.5) * 0.2;

function groundAt(wx: number, wy: number, forest: number): number {
  const C = palette();
  const n = vnoise(wx, wy, 14, 511) * 0.6 + vnoise(wx, wy, 5, 512) * 0.4 + (hash(wx, wy, 513) - 0.5) * 0.08;
  let c = C.ground[n < 0.38 ? 0 : n < 0.54 ? 1 : n < 0.68 ? 2 : 3];
  // brown peat showing through the moss
  const peat = vnoise(wx, wy, 11, 514) + (hash(wx, wy, 515) - 0.5) * 0.06;
  if (peat < 0.13) c = peat < 0.09 ? MOSS.peatD : MOSS.peat;
  // moss cushions: a lit top and a dark underside
  const cush = vnoise(wx, wy, 4, 516);
  if (cush > 0.78 && peat >= 0.13) c = vnoise(wx, wy - 1, 4, 516) > 0.78 ? C.grassLight : mix(C.grassLight, c, 0.4);
  else if (cush < 0.78 && vnoise(wx, wy - 1, 4, 516) > 0.8 && peat >= 0.13) c = C.grassDark;
  if (forest > 0) c = mix(c, H('#26301c'), 0.45 * Math.min(1, forest));
  return c;
}

function waterAt(at: At, wx: number, wy: number, w: number, frame: number, fog: boolean): number {
  const depth = bilinear(wx, wy, (x, y) => depthTile(at, x, y));
  if (w < 0.56) return WATER.edge;
  // shallow murky brown at the banks, dark green out in the open
  const d = depth + (vnoise(wx, wy, 9, 521) - 0.5) * 0.25 - (w < 0.7 ? 0.35 : 0);
  let c = d < 0.35 ? WATER.murk : d < 0.6 ? WATER.shallow : d < 0.85 ? WATER.mid : WATER.deep;
  // under a bank to the north: the bank's dark reflection
  if (wetAt(at, wx, wy - 3) < 0.5) c = mix(c, WATER.refl, 0.7);
  // duckweed rafts with speckled edges
  const weed = vnoise(wx, wy, 10, 522) * 0.75 + vnoise(wx, wy, 3, 523) * 0.25;
  if (weed > 0.7 && w > 0.62) {
    const h = hash(wx, wy, 524);
    if (weed > 0.75 || h < 0.4) return WEED[weed > 0.8 ? (h < 0.25 ? 3 : 2) : h < 0.5 ? 1 : 0];
  }
  // slow glints that drift between the two frames
  const gx = wx + frame * 2;
  const g = hash(Math.floor(gx / 7), wy, 525);
  if (w > 0.7 && g < 0.03 && wy % 3 === 0) return fog ? mix(WATER.glint, H('#c8d4cc'), 0.4) : WATER.glint;
  if (w > 0.7 && hash(Math.floor(gx / 7), wy - 1, 525) < 0.03 && (wy - 1) % 3 === 0) return mix(c, WATER.glintD, 0.5);
  return c;
}

/** A little lily pad (with a flower sometimes) floating on open water. */
function lilyPad(p: Pix, x: number, y: number, flower: number, frame: number) {
  const k = H('#22341a'), g = H('#4f7434'), l = H('#6f9a46'), d = H('#3a5a28');
  const rows = ['.kkk.kk.', 'kllg.ggk', 'klgggggk', 'kggggddk', '.kdddkk.'];
  rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') p.set(x + i, y + j, ch === 'k' ? k : ch === 'l' ? l : ch === 'g' ? g : d); }));
  if (flower) {
    const pet = flower > 0.5 ? H('#f4f0e4') : H('#e8a8c0'), pd = flower > 0.5 ? H('#c8c4b8') : H('#b87090');
    p.set(x + 2, y, pet); p.set(x + 3, y, pet); p.set(x + 4, y, pet); p.set(x + 3, y - 1, pet); p.set(x + 2, y + 1, pd); p.set(x + 4, y + 1, pd); p.set(x + 3, y + 1, H('#f0d050'));
  }
  // a ripple ring in the second frame
  if (frame) { for (const [i, j] of [[-1, 2], [8, 2], [3, 5], [4, 5]]) p.set(x + i, y + j, alpha(WATER.glint, 0.6)); }
}

/** Fireflies blinking over the bog: a glowing dot that moves a little between the frames. */
function firefly(p: Pix, x: number, y: number) {
  p.set(x, y, GLOW.core);
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) p.set(x + dx, y + dy, alpha(GLOW.mid, 0.7));
  for (const [dx, dy] of [[1, 1], [-1, -1], [1, -1], [-1, 1], [2, 0], [-2, 0], [0, 2], [0, -2]]) p.set(x + dx, y + dy, alpha(GLOW.halo, 0.22));
}

const STUMP = sprite({ k: '#1e1810', b: '#4a3c2a', B: '#5e4e38', l: '#7a6850', r: '#a08a66', R: '#8a7452', m: '#6a8a3a', M: '#8aaa4a', s: '#00000040', o: '#d8c8a0' }, [
  '................',
  '................',
  '................',
  '....kkkkkkk.....',
  '...kMMmrRRRk....',
  '..kmMmmRrrRrk...',
  '..kmmRRrkrRRk...',
  '..klrRrrrrRRk...',
  '..klBRRRRRRBkk..',
  '..klbbBbbbbbBk..',
  '.kllbBbbbBbbbk..',
  '.klbbbBbbbBbbbk.',
  'kmlbbbbbbbbbbbbk',
  'kkmmkkbkbkmmkkk.',
  '.sssssssssssss..',
  '................',
]);

/** Small details on the moss: cranberries ('r'), marsh marigolds ('y'), cotton grass ('w'). */
function bogDetail(p: Pix, ox: number, oy: number, c: string, tx: number, ty: number) {
  const C = palette();
  for (let k = 0; k < 2; k++) {
    const x = ox + 2 + Math.floor(hash(tx, ty, 600 + k) * 5) + k * 6, y = oy + 4 + Math.floor(hash(tx, ty, 610 + k) * 4) + k * 5;
    if (c === 'w') {
      // three stalks with white fluffy heads
      for (const [dx, h] of [[0, 6], [2, 8], [4, 5]]) {
        for (let i = 0; i < h; i++) p.set(x + dx + (i > h - 3 ? 0 : 0), y + 6 - i, i < 2 ? C.grassDark : H('#7a8450'));
        const hy = y + 6 - h;
        p.set(x + dx, hy, H('#ffffff')); p.set(x + dx - 1, hy, H('#e4e6dc')); p.set(x + dx + 1, hy, H('#e4e6dc')); p.set(x + dx, hy - 1, H('#f4f6ee')); p.set(x + dx, hy + 1, H('#c8ccbc'));
      }
    } else if (c === 'r') {
      // low dark leaves and red berries
      for (const [dx, dy] of [[0, 3], [1, 2], [2, 3], [3, 2], [4, 3], [5, 3], [1, 4], [3, 4]]) p.set(x + dx, y + dy, (dx + dy) % 2 ? H('#3a4a26') : H('#4e5e30'));
      for (const [dx, dy] of [[1, 1], [3, 1], [4, 2], [2, 2]]) { p.set(x + dx, y + dy, H('#c0283a')); }
      p.set(x + 1, y, H('#f07080')); p.set(x + 3, y, H('#f07080'));
    } else {
      // round leaves and yellow flowers
      for (const [dx, dy] of [[0, 4], [1, 4], [1, 3], [4, 4], [5, 4], [5, 3], [2, 5], [3, 5]]) p.set(x + dx, y + dy, (dx + dy) % 2 ? H('#4a6a2e') : H('#5e8038'));
      for (const [fx, fy] of [[1, 1], [4, 0]]) {
        p.set(x + fx, y + fy, H('#ffe040')); p.set(x + fx - 1, y + fy, H('#f0c020')); p.set(x + fx + 1, y + fy, H('#f0c020')); p.set(x + fx, y + fy - 1, H('#fff080')); p.set(x + fx, y + fy + 1, H('#c89a18'));
        p.set(x + fx, y + fy + 2, H('#3e5a26'));
      }
    }
  }
}

/** Sedge sprigs on the moss so the ground has no visible grid. */
function sprigs(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const C = palette();
  const n = Math.floor(hash(tx, ty, 620) * 3.4);
  for (let k = 0; k < n; k++) {
    const x = ox + 2 + Math.floor(hash(tx, ty, 630 + k) * 12), y = oy + 4 + Math.floor(hash(tx, ty, 640 + k) * 11);
    const h = 2 + Math.floor(hash(tx, ty, 650 + k) * 3);
    for (let i = 0; i < h; i++) { p.set(x, y - i, i === h - 1 ? C.grassLight : C.grassDark); }
    p.set(x - 1, y - 1, C.grassDark); p.set(x + 1, y - Math.max(1, h - 2), C.grassLight);
  }
}

/** Plank boardwalks: boards across the way, nailed to two stringers, beams and posts where the side is open. */
function boardwalk(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const run = (dx: number, dy: number) => { let n = 0; for (let k = 1; k <= 3 && at(tx + dx * k, ty + dy * k) === ':'; k++) n++; return n; };
  const horiz = run(1, 0) + run(-1, 0) >= run(0, 1) + run(0, -1);
  const walk = (dx: number, dy: number) => at(tx + dx, ty + dy) === ':';
  // across: 0..15 from the low side (north / west) to the high side
  const lowOpen = horiz ? !walk(0, -1) : !walk(-1, 0), highOpen = horiz ? !walk(0, 1) : !walk(1, 0);
  const a0 = lowOpen ? 2 : 0, a1 = highOpen ? 12 : 15;
  const wet = wetTile(at, tx, ty) === 1;
  for (let j = 0; j < T; j++) for (let i = 0; i < T; i++) {
    const wx = tx * T + i, wy = ty * T + j;
    const along = horiz ? wx : wy, across = horiz ? j : i;
    const plank = Math.floor(along / 4), seam = along % 4 === 3;
    const ragged = (lowOpen && across === a0 && hash(plank, 7, 660) < 0.25) || (highOpen && across === a1 && hash(plank, 9, 661) < 0.25);
    if (across < a0 || across > a1 + (highOpen ? 2 : 0)) continue;
    let c: number;
    if (highOpen && across > a1) c = across === a1 + 1 ? PLANK_SIDE : alpha(H('#0c1408'), 0.55); // the boards' edge and their shadow
    else if (ragged) continue;
    else if ((lowOpen && across === a0) || (highOpen && across === a1)) c = PLANK_OUT;
    else if (seam) c = PLANK_SEAM;
    else {
      const tone = Math.floor(hash(plank, 0, 662) * 4);
      c = PLANK[tone];
      if (along % 4 === 0) c = PLANK_LIGHT; // lit edge of each board (light from the top left)
      if (hash(wx, wy, 663) < 0.012) c = PLANK_SEAM; // knots
      else if (hash(plank, Math.floor(across / 5), 665) < 0.2 && along % 4 === 2) c = mix(c, PLANK_SEAM, 0.45); // grain
      if (hash(plank, 0, 664) < 0.12 && along % 4 === 1) c = H('#5e6a46'); // a mossy board
      const stringer = across === a0 + 2 || across === a1 - 2;
      if (stringer && along % 4 === 1) c = H('#3a3228'); // nails
    }
    p.set(ox + i, oy + j, c);
  }
  // posts along open sides standing in the water
  for (const side of [lowOpen ? 'low' : '', highOpen ? 'high' : ''].filter(Boolean)) {
    for (let k = 0; k < T; k++) {
      const along = (horiz ? tx : ty) * T + k;
      if (along % 32 !== 6) continue;
      const a = side === 'low' ? a0 - 1 : a1;
      for (let d = 0; d < 3; d++) for (let e = 0; e < (side === 'high' && wet ? 5 : 3); e++) {
        const across = a + e, alongP = k + d - 1;
        const x = horiz ? alongP : across, y = horiz ? across : alongP;
        if (x < 0 || x > 15 || y < 0 || y > 15) continue;
        p.set(ox + x, oy + y, e === 0 ? H('#9a8a70') : d === 0 ? H('#6a5a46') : d === 2 ? H('#2e261c') : H('#4a3e30'));
      }
    }
  }
}

function swampTile(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number, fog: boolean): boolean {
  const c = at(tx, ty);
  const forest = c === '#';
  const woods = (wx: number, wy: number) => clamp(bilinear(wx, wy, (x, y) => (at(x, y) === '#' ? 1 : 0)) * 1.6 - 0.3);
  for (let j = 0; j < T; j++) for (let i = 0; i < T; i++) {
    const wx = tx * T + i, wy = ty * T + j;
    const w = wetAt(at, wx, wy);
    let col: number;
    if (w > 0.5) {
      col = waterAt(at, wx, wy, w, frame, fog);
      // the shadow of a boardwalk on the water below it / right of it
      if (c === '~' && at(tx, ty - 1) === ':' && j < 3) col = mix(col, H('#0e160e'), 0.45);
      if (c === '~' && at(tx - 1, ty) === ':' && i < 2) col = mix(col, H('#0e160e'), 0.35);
    } else if (w > 0.42) col = MUD[w > 0.47 ? 0 : 1];
    else if (w > 0.36) col = mix(MUD[2], groundAt(wx, wy, woods(wx, wy)), 0.5);
    else col = groundAt(wx, wy, woods(wx, wy));
    p.set(ox + i, oy + j, col);
  }
  if (c === '~') {
    const h = hash(tx, ty, 700);
    if (h < 0.16 && depthTile(at, tx, ty) > 0.4) lilyPad(p, ox + 2 + Math.floor(hash(tx, ty, 701) * 7), oy + 3 + Math.floor(hash(tx, ty, 702) * 8), hash(tx, ty, 703) < 0.35 ? hash(tx, ty, 704) : 0, frame);
  } else if (c === ':') boardwalk(p, ox, oy, tx, ty, at);
  else if (!forest) {
    sprigs(p, ox, oy, tx, ty);
    if (c === 'r' || c === 'y' || c === 'w') bogDetail(p, ox, oy, c, tx, ty);
    if (c === 'o') p.blit(STUMP, ox, oy);
  }
  // fireflies over the bog
  if (c !== '#' && c !== 'o' && hash(tx, ty, 710) < (fog ? 0.05 : 0.08)) {
    const fx = 3 + Math.floor(hash(tx, ty, 711) * 10), fy = 2 + Math.floor(hash(tx, ty, 712) * 9);
    firefly(p, ox + fx + frame * 2, oy + fy - frame);
  }
  // Fog Lake: long, slow banks of mist drifting over the water (dithered, thicker over the water)
  if (fog) {
    for (let j = 0; j < T; j++) for (let i = 0; i < T; i++) {
      const wx = tx * T + i, wy = ty * T + j;
      const m = vnoise(wx * 0.35 + frame * 4, wy * 1.3, 30, 720) * 0.7 + vnoise(wx * 0.6, wy, 9, 721) * 0.3;
      const a = clamp((m - 0.45) * 1.2, 0, 0.3) * (wetTile(at, tx, ty) ? 1 : 0.55);
      const lvl = Math.floor(a * 20);
      if (lvl > 0 && (lvl > 2 || (wx + wy) % 2 === 0)) p.set(ox + i, oy + j, alpha(H('#d4ddd6'), lvl / 20));
    }
  }
  return true;
}

// ---------------------------------------------------------------- trees

const BARK = { out: H('#1a150e'), dark: H('#3a3124'), mid: H('#544735'), light: H('#74664e'), moss: H('#5a6a34') };
const CROWN = ['#24321c', '#324628', '#465e34', '#5f7646'].map(H);
const CROWN_OUT = H('#111a0c');
const MOSS_HANG = [H('#6f7d60'), H('#8a987a'), H('#a7b398')];

/** A buttressed swamp-cypress trunk: flared foot with roots, bark furrows, lit from the left; knees around it. */
function cypressTrunk(p: Pix, cx: number, y0: number, y1: number, w: number, seed: number, knees: boolean) {
  for (let y = y0; y <= y1; y++) {
    const up = y1 - y;
    const flare = up < 8 ? Math.round(Math.pow((8 - up) / 8, 1.8) * 6) : 0;
    const l = cx - Math.floor(w / 2) - flare, r = cx + Math.ceil(w / 2) - 1 + flare;
    for (let x = l; x <= r; x++) {
      const t = (x - l) / Math.max(1, r - l);
      let c = t < 0.25 ? BARK.light : t < 0.62 ? BARK.mid : BARK.dark;
      if (t > 0.1 && t < 0.9 && hash(x - cx, Math.floor((y - y0) / 4), seed) < 0.3) c = t < 0.4 ? BARK.mid : BARK.dark;
      if (up < 8 && flare > 1 && (x - l) % 4 === 1 && x > l + 1 && x < r - 1) c = BARK.dark; // buttress ridges
      if (y < y0 + 3 && x !== l && x !== r) c = BARK.dark;
      if (hash(x, y, seed + 3) < 0.05 && t < 0.5) c = BARK.moss;
      if (x === l || x === r) c = BARK.out;
      if (y === y1) c = BARK.out;
      p.set(x, y, c);
    }
  }
  if (knees) for (const [kx, kh] of [[cx - w - 5, 4], [cx + w + 5, 3], [cx + w + 9, 2]]) {
    for (let k = 0; k < kh; k++) for (let x = kx - 1 + Math.floor(k / 2); x <= kx + 1 - Math.floor(k / 2); x++) p.set(x, y1 - k, k === kh - 1 ? BARK.light : x === kx - 1 + Math.floor(k / 2) ? BARK.out : BARK.mid);
    p.set(kx - 2, y1, BARK.out); p.set(kx + 2, y1, BARK.out);
  }
}

/** Grey-green moss hanging in strands from the lower edge of a crown. */
function hangingMoss(p: Pix, crown: Pix, x0: number, x1: number, seed: number, maxLen: number) {
  for (let x = x0; x <= x1; x++) {
    if (hash(x, 0, seed) > 0.45) continue;
    let y = crown.h - 1;
    while (y > 0 && !(crown.get(x, y) & 255)) y--;
    if (y <= 0) continue;
    const len = 3 + Math.floor(hash(x, 1, seed) * maxLen);
    for (let i = -2; i < len; i++) {
      const xx = x + (i > len * 0.6 ? (hash(x, 2, seed) < 0.5 ? -1 : 1) : 0);
      p.set(xx, y + i, MOSS_HANG[i < 1 ? 0 : i % 3 === 2 ? 2 : 1]);
      if (i === len - 1) p.set(xx, y + i + 1, alpha(MOSS_HANG[0], 0.6));
    }
  }
}

/** A forest swamp cypress (32×48) for '#' tiles: a layered, flat-topped feathery crown with moss. */
function forestCypress(v: number): Pix {
  const p = new Pix(32, 48);
  shadowEllipse(p, 16, 45, 13, 3, H('#0a140a66'));
  cypressTrunk(p, 16, 26, 46, 6, 31 + v, false);
  const crown = new Pix(32, 34);
  const blobs = v
    ? [{ x: 16, y: 8, r: 7 }, { x: 8, y: 13, r: 7, z: 1 }, { x: 24, y: 12, r: 7.5, z: 1 }, { x: 12, y: 20, r: 7.5, z: 2 }, { x: 22, y: 21, r: 7, z: 2 }, { x: 16, y: 16, r: 6.5, z: 3 }]
    : [{ x: 15, y: 7, r: 6.5 }, { x: 22, y: 10, r: 6.5 }, { x: 9, y: 14, r: 7.5, z: 1 }, { x: 24, y: 17, r: 7, z: 1 }, { x: 15, y: 21, r: 8, z: 2 }, { x: 18, y: 14, r: 6, z: 3 }];
  canopy(crown, 0, 0, 32, 31, blobs, CROWN, CROWN_OUT, 41 + v * 7);
  feather(crown, 43 + v);
  p.blit(crown, 0, 0);
  hangingMoss(p, crown, 3, 28, 47 + v, 8);
  return p;
}

/** Feathery needle texture: short light strokes on the lit parts of a crown. */
function feather(c: Pix, seed: number) {
  for (let y = 1; y < c.h - 1; y++) for (let x = 1; x < c.w - 1; x++) {
    const v = c.get(x, y);
    if (!(v & 255) || v === CROWN_OUT) continue;
    if (hash(x, y, seed) < 0.16 && (v === CROWN[2] || v === CROWN[3])) { c.set(x, y, CROWN[3]); if (c.get(x + 1, y + 1) !== CROWN_OUT) c.set(x + 1, y + 1, CROWN[1]); }
    if (hash(x, y, seed + 1) < 0.08 && v === CROWN[1]) c.set(x, y, CROWN[0]);
  }
}

export const SWAMP_TREES = [forestCypress(0), forestCypress(1)];
registerTheme('swamp', palette0('swamp'), { terrain: (p, ox, oy, tx, ty, at, frame) => swampTile(p, ox, oy, tx, ty, at, frame, false), trees: SWAMP_TREES, things: tileThing });
registerTheme('swampfog', palette0('swampfog'), { terrain: (p, ox, oy, tx, ty, at, frame) => swampTile(p, ox, oy, tx, ty, at, frame, true), trees: SWAMP_TREES, things: tileThing });
function palette0(t: 'swamp' | 'swampfog') {
  return t === 'swamp'
    ? {
      ground: ['#55603a', '#5c6840', '#637046', '#6b784c'], grassDark: '#414d2c', grassLight: '#879452',
      path: '#7c6e5a', pathDark: '#5e5242', pathLight: '#9a8c72', pathEdge: '#2a2219',
      water: '#34493a', waterDeep: '#2b3f33', waterLight: '#7d978a', waterEdge: '#1c2619', foam: '#5e7258', shadow: '#0e1a1060',
    }
    : {
      ground: ['#5e6a48', '#66724e', '#6d7954', '#76825b'], grassDark: '#4a5638', grassLight: '#94a06a',
      path: '#857a68', pathDark: '#665c4e', pathLight: '#a29882', pathEdge: '#2e2820',
      water: '#46594c', waterDeep: '#3c5044', waterLight: '#9aada2', waterEdge: '#233026', foam: '#74867a', shadow: '#1a2a2040',
    };
}

// ---------------------------------------------------------------- inside a hut

/**
 * Inside the Swamp's huts: woven reed walls with night windows and little wall lamps, wide floorboards. Floor codes:
 * 'r' a woven rug, 'y' reed matting, 'w' a packed-earth workshop floor with sawdust, '~' open water (a boat slip).
 */
const hutTile: TerrainHook = (p, ox, oy, tx, ty, at, frame) => {
  const c = at(tx, ty);
  const floor = (x: number, y: number) => { const k = at(x, y); return k !== '#' && !(k === ':' && at(x, y - 1) === ':'); };
  if (c === ':' && at(tx, ty - 1) === ':') { box(p, ox, oy, T, T, H('#0e0b07')); return true; }
  if (c === '#') {
    const lower = floor(tx, ty + 1) && at(tx, ty + 1) !== ':';
    const upper = !floor(tx, ty + 1) && floor(tx, ty + 2) && at(tx, ty + 2) !== ':';
    box(p, ox, oy, T, T, H('#0e0b07'));
    if (lower || upper) {
      // the back wall, two tiles high: reed bundles tied with twine, a timber beam on top, a skirting board below
      for (let j = 0; j < T; j++) for (let i = 0; i < T; i++) {
        const wx = tx * T + i, b = wx % 5, y = upper ? j : j + T;
        let col = [H('#a08a52'), H('#b09858'), H('#bca466'), H('#a8925a'), H('#7c683e')][b];
        if (y < 4) col = y === 0 ? H('#1e160c') : y < 3 ? H('#5a4430') : H('#3a2c1c');
        else if (y === 12 || y === 22) col = b === 4 ? H('#4a3a24') : H('#6a5436');
        else if (y > 27) col = y === 28 ? H('#9a7a54') : y === 31 ? H('#2a2016') : H('#5a4430');
        p.set(ox + i, oy + j, col);
      }
      const k = tx % 6;
      const wallTop = (dy: number) => (upper ? dy : dy - T);
      if (k === 1 || k === 4) {
        // a window with curtains: the evening bog outside
        for (let y = 7; y < 25; y++) for (let x = 3; x < 13; x++) {
          const j = wallTop(y); if (j < 0 || j > 15) continue;
          const edge = x === 3 || x === 12 || y === 7 || y === 24, bar = x === 7 || x === 8 || y === 15;
          p.set(ox + x, oy + j, edge ? H('#3a2a18') : bar ? H('#5a4430') : y < 12 ? H('#2a4a56') : y < 19 ? H('#34565e') : H('#2a3e36'));
        }
        const moon = wallTop(10); if (moon >= 0 && moon < 16) p.set(ox + 5, oy + moon, H('#f0ecc8'));
        const ff = wallTop(18 - frame); if (ff >= 0 && ff < 16) p.set(ox + 10, oy + ff, GLOW.mid);
        const curtain = k === 1 ? [H('#7a3a34'), H('#9a5044')] : [H('#4e6a3e'), H('#64844c')];
        for (let y = 6; y < 26; y++) for (const x of [1, 2, 3, 12, 13, 14]) {
          const j = wallTop(y); if (j < 0 || j > 15) continue;
          p.set(ox + x, oy + j, y === 6 ? H('#2a1e12') : (x === 3 || x === 12) ? H('#2e1a14') : curtain[(x + (y > 18 ? 1 : 0)) % 2]);
        }
        const sill = wallTop(25); if (sill >= 0 && sill < 16) box(p, ox + 2, oy + sill, 12, 1, H('#8a6a48'));
      } else if (k === 2 && upper) {
        // a picture: a heron by the water
        box(p, ox + 3, oy + 6, 10, 8, (xx, yy) => (xx === ox + 3 || xx === ox + 12 || yy === oy + 6 || yy === oy + 13 ? H('#5a3a1e') : yy > oy + 10 ? H('#4a6a5a') : H('#c8c4a0')));
        line(p, ox + 8, oy + 8, ox + 8, oy + 11, H('#6a7078')); p.set(ox + 9, oy + 8, H('#e8c040'));
      } else if (k === 3 && upper) {
        // a little wall shelf with pots
        box(p, ox + 1, oy + 12, 14, 2, (_, yy) => (yy === oy + 12 ? WOODF.h : WOODF.d));
        jar(p, ox + 2, oy + 7, H('#7a9a5a')); jar(p, ox + 7, oy + 7, H('#a84a3a')); jar(p, ox + 11, oy + 8, H('#c8a050'), 4);
      } else if (k === 0 && lower) lantern(p, ox + 5, oy + 3);
      else if (k === 5 && upper) {
        // a bundle of herbs hanging from a nail
        p.set(ox + 8, oy + 6, H('#1e160c'));
        for (let i = 0; i < 7; i++) for (let w = -Math.floor(i / 2); w <= Math.floor(i / 2); w++) p.set(ox + 8 + w, oy + 7 + i, (i + w) % 2 ? H('#5a7a3a') : H('#7a9a4a'));
      }
      return true;
    }
    // side walls and the front wall: a timber edge where they meet the room
    if (floor(tx + 1, ty)) box(p, ox + 12, oy, 4, T, (xx) => (xx === ox + 15 ? H('#9a7a54') : xx === ox + 12 ? H('#1e160c') : H('#5a4430')));
    if (floor(tx - 1, ty)) box(p, ox, oy, 4, T, (xx) => (xx === ox ? H('#9a7a54') : xx === ox + 3 ? H('#1e160c') : H('#5a4430')));
    if (floor(tx, ty - 1)) box(p, ox, oy, T, 4, (_, yy) => (yy === oy ? H('#9a7a54') : yy === oy + 3 ? H('#1e160c') : H('#5a4430')));
    return true;
  }
  for (let j = 0; j < T; j++) for (let i = 0; i < T; i++) {
    const wx = tx * T + i, wy = ty * T + j;
    const row = Math.floor(wy / 5);
    const joint = (wx + row * 11) % 29 === 0;
    let col = wy % 5 === 4 || joint ? H('#5a4530') : wy % 5 === 0 ? H('#8e7252') : [H('#7a6044'), H('#7e6447')][row % 2];
    const same = (dx: number, dy: number) => at(tx + dx, ty + dy) === c;
    const edge = (i === 0 && !same(-1, 0)) || (i === 15 && !same(1, 0)) || (j === 0 && !same(0, -1)) || (j === 15 && !same(0, 1));
    const edge2 = (i === 1 && !same(-1, 0)) || (i === 14 && !same(1, 0)) || (j === 1 && !same(0, -1)) || (j === 14 && !same(0, 1));
    if (c === 'r') {
      // a woven rug: rings of colour inside a dark border
      const ring = Math.min(i + (same(-1, 0) ? 16 : 0), 15 - i + (same(1, 0) ? 16 : 0), j + (same(0, -1) ? 16 : 0), 15 - j + (same(0, 1) ? 16 : 0));
      col = edge ? H('#4a2a1e') : ring < 3 ? H('#9a4a34') : ring < 5 ? H('#c8a464') : (wx + wy) % 4 < 2 ? H('#6a7a3a') : H('#5a6a32');
      if (edge2 && hash(wx, wy, 802) < 0.5) col = H('#e8d4a0');
    } else if (c === 'y') {
      col = edge ? H('#5a4628') : ((wx >> 1) + (wy >> 1)) % 2 ? H('#b8a060') : H('#9a8448');
    } else if (c === 'w') {
      const n = vnoise(wx, wy, 5, 803);
      col = n < 0.5 ? H('#62513c') : H('#6a5842');
      if (hash(wx, wy, 804) < 0.015) col = H('#c8ac78'); // sawdust and shavings
    } else if (c === '~') {
      col = edge ? H('#2a2016') : edge2 ? H('#6a5236') : (wy + frame * 2 + (wx >> 2)) % 7 === 0 ? H('#5a7a6a') : vnoise(wx, wy, 6, 805) > 0.6 ? H('#2b3f33') : H('#34493a');
    }
    p.set(ox + i, oy + j, col);
  }
  if (c === ':') {
    for (let j = 3; j < 14; j++) for (let i = 2; i < 14; i++) p.set(ox + i, oy + j, j === 3 || j === 13 || i === 2 || i === 13 ? H('#4a3a20') : (i + j) % 3 ? H('#b09a5c') : H('#8e7a44'));
  }
  return true;
};
registerTheme('swamphut', {
  ground: ['#7a6044', '#84694a', '#806648', '#8a6e4e'], grassDark: '#4a3a28', grassLight: '#9a7c58',
  path: '#b09a5c', pathDark: '#8e7a44', pathLight: '#c8b070', pathEdge: '#4a3a20',
  water: '#34493a', waterDeep: '#2b3f33', waterLight: '#7d978a', waterEdge: '#1c2619', foam: '#5e7258', shadow: '#1a100844',
}, { terrain: hutTile, things: (code) => (code === '#' ? 'wall' : code === ':' ? 'mat' : code === 'r' ? 'sw_rug' : code === 'y' ? 'sw_reedmat' : code === '~' ? 'sw_water' : 'floor') });


// ---------------------------------------------------------------- drawing helpers

const box = (p: Pix, x: number, y: number, w: number, h: number, c: number | ((x: number, y: number) => number)) => {
  for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) p.set(xx, yy, typeof c === 'number' ? c : c(xx, yy));
};
/** Draws `src` with a dark outline around it into p. */
const withOutline = (p: Pix, src: Pix, x: number, y: number, c = H('#16120c')) => outlined(p, src, x, y, c);
/** Soft warm light around a lantern or window (drawn behind the lamp). */
function halo(p: Pix, cx: number, cy: number, r: number, c = H('#ffd27a'), a = 0.32) {
  disc(p, cx, cy, r, (d) => alpha(c, a * Math.pow(1 - d / r, 1.4)));
}
/** A hanging lantern: a little box of warm light with a dark frame. */
function lantern(p: Pix, x: number, y: number) {
  halo(p, x + 2.5, y + 4, 8);
  const k = H('#1e1810');
  box(p, x + 1, y, 3, 1, k);
  box(p, x, y + 1, 5, 7, k);
  box(p, x + 1, y + 2, 3, 5, (_, yy) => (yy < y + 4 ? GLOW.core : H('#f0b040')));
  p.set(x + 2, y + 3, H('#ffffff'));
  box(p, x + 1, y + 8, 3, 1, k);
}

/**
 * Reed thatch filling a polygon: bundles of reed in overlapping courses (each course's ragged lower edge in shadow),
 * lighter at the top, with patches of moss.
 */
function thatch(p: Pix, pts: [number, number][], tones: number[], seed: number, course = 6) {
  const ys = pts.map((q) => q[1]), top = Math.min(...ys), bot = Math.max(...ys);
  const mask = new Pix(p.w, p.h);
  poly(mask, pts, () => 0xffffffff);
  const layer = new Pix(p.w, p.h);
  for (let y = 0; y < p.h; y++) for (let x = 0; x < p.w; x++) {
    if (!(mask.get(x, y) & 255)) continue;
    const t = (y - top) / Math.max(1, bot - top);
    const c0 = Math.floor((y - top) / course);
    const inC = (y - top) % course;
    const jag = Math.floor(hash(x >> 1, c0, seed) * 3);
    const strand = hash(x, c0, seed + 1);
    let k = t < 0.25 ? 3 : t < 0.55 ? 2 : 1;
    if (strand < 0.25) k -= 1; else if (strand > 0.85) k += 1;
    if (inC >= course - 1 - jag) k = 0; // the shadowed lower edge of the course above
    if (inC === 0 && strand > 0.5) k += 1;
    let c = tones[clamp(k, 0, tones.length - 1)];
    const moss = vnoise(x, y, 7, seed + 2);
    if (moss > 0.74 && t > 0.2) c = moss > 0.8 ? H('#6a7a3a') : H('#58682e');
    layer.set(x, y, c);
  }
  // a ragged fringe hanging below the eaves
  for (let x = 0; x < p.w; x++) {
    let y = p.h - 1;
    while (y > 0 && !(layer.get(x, y) & 255)) y--;
    if (y <= top + 4) continue;
    const n = Math.floor(hash(x, 3, seed) * 3);
    for (let i = 1; i <= n; i++) layer.set(x, y + i, tones[0]);
  }
  withOutline(p, layer, 0, 0, H('#1e170c'));
}

/** Vertical weathered boards (walls of huts and booths). */
function boards(p: Pix, x: number, y: number, w: number, h: number, tones: number[], seed: number) {
  box(p, x, y, w, h, (xx, yy) => {
    const b = Math.floor((xx - x) / 4), s = (xx - x) % 4;
    if (s === 3) return H('#2e2418');
    let c = tones[Math.floor(hash(b, 0, seed) * tones.length)];
    if (s === 0) c = mix(c, H('#ffffff'), 0.12);
    if (hash(xx, yy, seed + 1) < 0.04) c = mix(c, H('#000000'), 0.25);
    if (hash(b, Math.floor((yy - y) / 6), seed + 2) < 0.05) c = mix(c, H('#4e6a30'), 0.4); // moss in the grain
    return c;
  });
}

/** A lit window: dark frame, warm glass (brighter at the top left), a cross bar; shutters optional. */
function window_(p: Pix, x: number, y: number, w: number, h: number, shutter?: number, round = false) {
  const k = H('#1e170e');
  halo(p, x + w / 2, y + h / 2, w * 0.9, H('#ffc860'), 0.18);
  box(p, x, y, w, h, (xx, yy) => {
    const edge = xx === x || xx === x + w - 1 || yy === y || yy === y + h - 1;
    if (round && (yy === y) && (xx === x + 1 || xx === x + w - 2)) return k;
    if (round && yy === y && (xx === x || xx === x + w - 1)) return 0 as unknown as number;
    if (edge) return k;
    if (xx === x + Math.floor(w / 2) || yy === y + Math.floor(h / 2)) return H('#5a4028');
    const t = (yy - y) / h + (xx - x) / w * 0.3;
    return t < 0.35 ? H('#fff0b0') : t < 0.7 ? H('#f8c860') : H('#e0943a');
  });
  if (shutter !== undefined) for (const sx of [x - 4, x + w]) box(p, sx, y, 4, h, (xx, yy) => (xx === sx || xx === sx + 3 || yy === y || yy === y + h - 1 ? k : (yy - y) % 3 === 0 ? mix(shutter, H('#000000'), 0.3) : shutter));
  box(p, x - 1, y + h, w + 2, 2, (_, yy) => (yy === y + h ? H('#7a6248') : H('#3a2c1e')));
}

/** A plank door with a frame and a brass handle. */
function door(p: Pix, x: number, y: number, w: number, h: number, wood = H('#5a4030')) {
  const k = H('#1a140c');
  box(p, x, y, w, h, (xx, yy) => {
    if (xx === x || xx === x + w - 1 || yy === y) return k;
    if ((yy === y + 1) && (xx === x + 1 || xx === x + w - 2)) return k;
    const s = (xx - x - 1) % 4;
    return s === 3 ? mix(wood, k, 0.5) : s === 0 ? mix(wood, H('#ffffff'), 0.1) : wood;
  });
  box(p, x + 1, y + Math.floor(h / 2), w - 2, 1, mix(wood, k, 0.4));
  p.set(x + w - 4, y + Math.floor(h / 2) + 2, H('#e8c050')); p.set(x + w - 4, y + Math.floor(h / 2) + 3, H('#9a7a28'));
}

/** Ripples where something stands in the water. */
function ripple(p: Pix, cx: number, y: number, r: number) {
  for (let x = -r; x <= r; x++) if (Math.abs(x) > 1 && hash(x, y, 901) < 0.8) p.set(cx + x, y, alpha(WATER.glint, 0.55 - Math.abs(x) / (r * 2.5)));
  p.set(cx - r - 1, y - 1, alpha(WATER.glint, 0.3)); p.set(cx + r + 1, y - 1, alpha(WATER.glint, 0.3));
}

const THATCH = [H('#5a4a24'), H('#786330'), H('#958042'), H('#b39d58'), H('#ccb874')];
const THATCH2 = [H('#4e4626'), H('#6a6034'), H('#867a46'), H('#a2965a'), H('#bcb072')];
const WOOD = [H('#6a5a46'), H('#76664e'), H('#5e503e'), H('#82725a')];

// ---------------------------------------------------------------- buildings

/** A hut on stilts over the bog (5×3 tiles, 80×80): reed roof, board walls, a deck and a ladder down to the door. */
function stiltHut(sign?: 'pearl' | 'stamp'): Pix {
  const p = new Pix(80, 80);
  const k = H('#16120c');
  // stilts with cross braces, standing in the water
  for (const sx of [9, 27, 51, 69]) {
    box(p, sx, 58, 3, 19, (xx) => (xx === sx ? H('#6a5a44') : xx === sx + 1 ? H('#4a3e2e') : H('#2a2218')));
    ripple(p, sx + 1, 77, 4);
    box(p, sx, 74, 3, 2, alpha(H('#2e3a1c'), 0.8)); // slime line
  }
  line(p, 11, 60, 27, 72, H('#3a3024')); line(p, 29, 60, 51, 72, H('#3a3024')); line(p, 53, 72, 69, 60, H('#3a3024'));
  // the deck
  box(p, 3, 53, 74, 6, (xx, yy) => (yy === 53 ? PLANK_OUT : yy === 54 ? PLANK_LIGHT : yy >= 57 ? (yy === 58 ? k : PLANK_SIDE) : xx % 4 === 3 ? PLANK_SEAM : PLANK[Math.floor(hash(xx >> 2, 1, 910) * 4)]));
  box(p, 2, 53, 1, 6, k); box(p, 77, 53, 1, 6, k);
  // the ladder down to the walkway
  for (const rx of [33, 45]) box(p, rx, 58, 2, 22, (xx) => (xx === rx ? H('#8a7658') : H('#4a3c2c')));
  for (let ry = 61; ry < 80; ry += 4) box(p, 35, ry, 10, 2, (_, yy) => (yy === ry ? H('#9a8664') : H('#4a3c2c')));
  // walls
  boards(p, 8, 30, 64, 24, WOOD, 911);
  box(p, 8, 30, 2, 24, H('#3e3226')); box(p, 70, 30, 2, 24, H('#3e3226'));
  box(p, 7, 30, 1, 24, k); box(p, 72, 30, 1, 24, k);
  window_(p, 16, 36, 11, 9, H('#5a6e72'));
  window_(p, 54, 36, 11, 9);
  door(p, 33, 37, 14, 17);
  // nets and a basket hanging on the wall
  for (let yy = 38; yy < 50; yy++) for (let xx = 57 + 1; xx < 68; xx++) if ((xx + yy) % 3 === 0 && yy > 47) p.set(xx, yy, alpha(H('#c8b890'), 0.5));
  // the roof
  thatch(p, [[24, 3], [56, 3], [79, 33], [0, 33]], THATCH, 913);
  // ridge bundle
  box(p, 23, 1, 34, 4, (xx, yy) => (yy === 1 || xx === 23 || xx === 56 ? H('#1e170c') : (xx % 6 === 0 ? H('#3a2e16') : yy === 2 ? THATCH[3] : THATCH[1])));
  // shadow under the eaves
  box(p, 8, 34, 64, 2, alpha(H('#000000'), 0.35));
  lantern(p, 74, 35);
  box(p, 76, 33, 1, 2, k);
  if (sign) {
    // a sign board hanging from the eaves: a pearl (exchange office) or a stamp (border office)
    box(p, 1, 34, 1, 4, k); box(p, 12, 34, 1, 4, k);
    box(p, 0, 38, 14, 11, (xx, yy) => (xx === 0 || xx === 13 || yy === 38 || yy === 48 ? k : yy === 39 ? H('#c8a070') : H('#a87c4c')));
    if (sign === 'pearl') {
      disc(p, 7, 43.5, 3.2, (d, x, y) => (d > 2.6 ? H('#5a5a64') : x < 7 && y < 43 ? H('#ffffff') : H('#dcdce8')));
      p.set(6, 42, H('#ffffff'));
    } else {
      disc(p, 7, 43.5, 3.4, (d) => (d > 2.7 ? H('#7a1a1a') : d > 1.5 ? H('#d83a30') : H('#f0a090')));
    }
  }
  return p;
}

/** A reed-thatched house on the ground (5×3 tiles, 80×72): a thick rounded roof over timber-framed daub walls. */
function reedHouse(v: 0 | 1 | 2): Pix {
  const p = new Pix(80, 72);
  const k = H('#16120c');
  const plaster = v === 1 ? H('#a9b29a') : v === 2 ? H('#c9b6a0') : H('#cbbd96');
  const plasterD = mix(plaster, H('#3a3020'), 0.25);
  const timber = H('#3e3022');
  shadowEllipse(p, 40, 70, 38, 2, H('#0a140a55'));
  // stone plinth
  box(p, 5, 62, 70, 9, (xx, yy) => {
    const row = Math.floor((yy - 62) / 3), sx = (xx + row * 4) % 8;
    if (yy === 70) return k;
    if ((yy - 62) % 3 === 2 || sx === 7) return H('#3a3a34');
    return [H('#6e6e64'), H('#7c7a6e'), H('#8a887a')][Math.floor(hash((xx + row * 4) >> 3, row, 920) * 3)];
  });
  // daub walls with a timber frame
  box(p, 7, 32, 66, 30, (xx, yy) => {
    let c = plaster;
    if (vnoise(xx, yy, 5, 921) < 0.3) c = plasterD;
    if (yy > 56) c = mix(c, H('#4a5a2a'), 0.25); // damp at the foot
    return c;
  });
  for (const tx of [7, 8, 38, 41, 71, 72]) box(p, tx, 32, 1, 30, timber);
  box(p, 7, 46, 66, 2, timber);
  line(p, 9, 47, 22, 33, timber); line(p, 70, 47, 57, 33, timber);
  box(p, 6, 32, 1, 30, k); box(p, 73, 32, 1, 30, k);
  window_(p, 16, 36, 11, 9, v === 1 ? H('#4a6a8a') : v === 2 ? H('#6a7a4a') : H('#7a4a3a'));
  window_(p, 53, 36, 11, 9, v === 1 ? H('#4a6a8a') : v === 2 ? H('#6a7a4a') : H('#7a4a3a'));
  // flower boxes
  for (const fx of [15, 52]) for (let i = 0; i < 13; i++) { p.set(fx + i, 47, i % 3 === 0 ? H('#e0a0c0') : i % 3 === 1 ? H('#f0e070') : H('#4e7a32')); }
  door(p, 33, 44, 14, 18, H('#4a3a2c'));
  box(p, 32, 43, 16, 1, k);
  // the roof: a thick loaf of reed with rounded ends and an eyebrow over a little dormer
  thatch(p, [[14, 4], [24, 1], [56, 1], [66, 4], [76, 18], [79, 34], [74, 37], [6, 37], [1, 34], [4, 18]], v === 1 ? THATCH2 : THATCH, 923 + v, 5);
  // dormer window in the roof
  disc(p, 40, 17, 7.5, (d, x, y) => (y > 18 ? 0 : d > 6.5 ? H('#1e170c') : THATCH[3]));
  window_(p, 36, 15, 9, 6, undefined, true);
  // chimney
  box(p, 60, 0, 7, 8, (xx, yy) => (xx === 60 || xx === 66 || yy === 0 ? k : xx < 63 ? H('#8a7a6a') : H('#6a5a4c')));
  box(p, 7, 37, 66, 2, alpha(H('#000000'), 0.3));
  return p;
}

/** Mistmoor's tall houses on piles (4×3 tiles, 64×96): two storeys, a steep shingled gable, a balcony, piles below. */
function pileHouse(v: 0 | 1): Pix {
  const p = new Pix(64, 96);
  const k = H('#16120c');
  const paint = v ? [H('#7a4a3a'), H('#86543f'), H('#6e4234')] : [H('#45686a'), H('#4e7274'), H('#3e5e60')];
  const roof = v ? [H('#2e2624'), H('#45362e'), H('#5a463a'), H('#6e5848')] : [H('#262e32'), H('#36444a'), H('#4a5a60'), H('#62747a')];
  shadowEllipse(p, 32, 94, 30, 2, H('#0a140a55'));
  // piles
  for (const sx of [5, 20, 41, 56]) { box(p, sx, 84, 3, 11, (xx) => (xx === sx ? H('#6a5a44') : xx === sx + 1 ? H('#4a3e2e') : H('#2a2218'))); }
  line(p, 7, 86, 20, 92, H('#3a3024')); line(p, 43, 92, 56, 86, H('#3a3024'));
  box(p, 2, 82, 60, 3, (xx, yy) => (yy === 82 ? PLANK_LIGHT : yy === 84 ? k : PLANK_SIDE));
  // ground floor
  boards(p, 4, 58, 56, 24, paint, 930 + v);
  door(p, 33, 64, 14, 18, H('#3a2e24'));
  window_(p, 9, 63, 10, 9);
  window_(p, 49, 63, 9, 9);
  // balcony
  box(p, 1, 54, 62, 4, (xx, yy) => (yy === 54 ? PLANK_LIGHT : yy === 57 ? k : PLANK[1]));
  for (let x = 2; x < 62; x += 4) box(p, x, 46, 1, 8, H('#4a3c2c'));
  box(p, 1, 45, 62, 2, (_, yy) => (yy === 45 ? H('#9a8664') : H('#4a3c2c')));
  for (const fx of [4, 52]) { box(p, fx, 50, 8, 4, H('#6a4a2a')); for (let i = 0; i < 8; i++) p.set(fx + i, 49 - (i % 2), i % 3 ? H('#5a8a3a') : H('#e86a6a')); }
  // upper floor
  boards(p, 4, 30, 56, 16, paint.map((c) => mix(c, H('#ffffff'), 0.1)), 932 + v);
  window_(p, 12, 33, 10, 9, v ? H('#3a5a5a') : H('#7a4a3a'));
  window_(p, 42, 33, 10, 9, v ? H('#3a5a5a') : H('#7a4a3a'));
  box(p, 3, 30, 1, 52, k); box(p, 60, 30, 1, 52, k);
  // steep gable roof of wooden shingles, facing the street
  const layer = new Pix(64, 96);
  poly(layer, [[32, 0], [63, 31], [0, 31]], (x, y) => {
    const row = Math.floor(y / 3), off = (row % 2) * 2;
    if (y % 3 === 2) return roof[0];
    const t = (x - 32) / 32;
    let c = roof[t < -0.3 ? 3 : t < 0.2 ? 2 : 1];
    if ((x + off) % 4 === 0) c = roof[0];
    if (vnoise(x, y, 6, 934 + v) > 0.78) c = H('#4e6232');
    return c;
  });
  withOutline(p, layer, 0, 0, k);
  // round window in the gable
  disc(p, 32, 19, 4.5, (d, x, y) => (d > 3.6 ? k : (x === 32 || y === 19) ? H('#5a4028') : y < 18 ? H('#fff0b0') : H('#f0b050')));
  box(p, 4, 31, 56, 2, alpha(H('#000000'), 0.35));
  lantern(p, 57, 60);
  box(p, 59, 58, 3, 1, k);
  return p;
}

// ---------------------------------------------------------------- trees and plants

/** A big old bald cypress (3×2 tiles, 48×80): buttressed trunk, knees, a feathery crown hung with moss. */
const BIG_CYPRESS = (() => {
  const p = new Pix(48, 80);
  shadowEllipse(p, 24, 76, 20, 3, H('#0a140a66'));
  cypressTrunk(p, 24, 38, 77, 9, 941, true);
  // a fork into two limbs
  line(p, 22, 42, 14, 30, BARK.mid); line(p, 21, 42, 13, 30, BARK.light); line(p, 27, 41, 34, 28, BARK.dark); line(p, 28, 41, 35, 28, BARK.out);
  const crown = new Pix(48, 50);
  canopy(crown, 0, 0, 48, 46, [
    { x: 24, y: 9, r: 8 }, { x: 13, y: 15, r: 8, z: 1 }, { x: 35, y: 14, r: 8.5, z: 1 }, { x: 7, y: 25, r: 7, z: 1 }, { x: 41, y: 25, r: 7, z: 1 },
    { x: 18, y: 27, r: 9, z: 2 }, { x: 31, y: 28, r: 9, z: 2 }, { x: 24, y: 19, r: 8, z: 3 },
  ], CROWN, CROWN_OUT, 943);
  feather(crown, 944);
  p.blit(crown, 0, 0);
  hangingMoss(p, crown, 2, 46, 945, 14);
  return p;
})();

/** A dead silver tree (2×1 tiles, 32×56): bleached trunk, bare branches, one broken off. */
const DEAD_TREE = (() => {
  const p = new Pix(32, 56);
  shadowEllipse(p, 16, 53, 10, 2, H('#0a140a55'));
  const L = new Pix(32, 56);
  const tones = [H('#7c7e74'), H('#a2a49a'), H('#c4c6bc'), H('#e0e2d8')];
  const limb = (x0: number, y0: number, x1: number, y1: number, w: number) => {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
    for (let i = 0; i <= n; i++) {
      const x = Math.round(x0 + ((x1 - x0) * i) / n), y = Math.round(y0 + ((y1 - y0) * i) / n);
      const ww = Math.max(1, Math.round(w * (1 - (i / n) * 0.6)));
      for (let d = 0; d < ww; d++) L.set(x + d, y, tones[d === 0 ? 3 : d === ww - 1 && ww > 1 ? 0 : 1 + (hash(x, y, 950) < 0.3 ? 1 : 0)]);
    }
  };
  // trunk with a flared, cracked foot
  for (let y = 14; y < 54; y++) {
    const up = 53 - y, fl = up < 6 ? Math.round((6 - up) * 0.8) : 0;
    for (let x = 13 - fl; x <= 18 + fl; x++) {
      const t = (x - 13 + fl) / (5 + fl * 2);
      L.set(x, y, tones[t < 0.25 ? 3 : t < 0.6 ? 2 : t < 0.85 ? 1 : 0]);
      if (hash(x, Math.floor(y / 3), 951) < 0.12 && t > 0.2) L.set(x, y, tones[0]);
    }
  }
  limb(15, 30, 4, 16, 3); limb(16, 26, 27, 12, 3); limb(15, 18, 12, 4, 2); limb(8, 22, 3, 22, 1); limb(23, 19, 29, 20, 1); limb(17, 16, 20, 7, 2);
  limb(5, 17, 2, 10, 1); limb(26, 14, 26, 8, 1);
  withOutline(p, L, 0, 0, H('#2a2c26'));
  // a shelf fungus and a hole
  box(p, 18, 36, 3, 2, H('#c8a860')); p.set(18, 38, H('#8a6a30')); p.set(14, 28, H('#2a2c26')); p.set(15, 28, H('#2a2c26')); p.set(14, 29, H('#4a4c44'));
  return p;
})();

/** Cattails and reeds in a clump (16×28), at the water's edge. */
const REEDS = (() => {
  const p = new Pix(16, 28);
  shadowEllipse(p, 8, 26, 6, 1, H('#0a140a66'));
  const blade = [H('#3e5a26'), H('#557a32'), H('#6e9440'), H('#8aac52')];
  const stroke = (x0: number, len: number, bend: number, c: number[]) => {
    for (let i = 0; i < len; i++) {
      const t = i / len;
      const x = Math.round(x0 + bend * t * t * 3);
      p.set(x, 26 - i, c[Math.min(3, Math.floor(t * 3) + 1)]);
      if (i < len * 0.5) p.set(x + (bend < 0 ? 1 : -1), 26 - i, c[0]);
    }
  };
  stroke(3, 14, -1, blade); stroke(13, 13, 1, blade); stroke(6, 20, -0.6, blade); stroke(10, 18, 0.8, blade); stroke(8, 23, 0.2, blade); stroke(5, 11, -1.5, blade);
  // cattail heads
  for (const [x, y] of [[7, 3], [11, 7], [4, 9]]) {
    box(p, x, y + 4, 1, 26 - y - 4, H('#5e7236'));
    box(p, x - 1, y, 3, 6, (xx, yy) => (xx === x - 1 ? H('#2a1a10') : yy === y ? H('#6a4428') : xx === x ? H('#7a5030') : H('#4a3020')));
    p.set(x, y - 1, H('#8a9a5a')); p.set(x, y - 2, H('#8a9a5a'));
  }
  ripple(p, 8, 27, 5);
  return p;
})();

/** A lantern post (16×36) with a warm glow. */
const LANTERN_POST = (() => {
  const p = new Pix(16, 36);
  shadowEllipse(p, 7, 34, 4, 1, H('#0a140a66'));
  box(p, 5, 8, 3, 27, (xx) => (xx === 5 ? H('#7a6a50') : xx === 6 ? H('#4e4232') : H('#2a2218')));
  box(p, 5, 8, 9, 2, (_, yy) => (yy === 8 ? H('#7a6a50') : H('#2a2218')));
  box(p, 4, 32, 5, 3, (xx, yy) => (yy === 34 ? H('#1a1410') : xx === 4 ? H('#8a8a7e') : H('#5e5e56')));
  lantern(p, 10, 10);
  box(p, 12, 10, 1, 1, H('#1e1810'));
  return p;
})();

// ---------------------------------------------------------------- boats and fishing things

/** A punt: a long flat-bottomed boat with square ends and its pole (48×16), seen from above. */
function puntArt(load?: 'market'): Pix {
  const h = load ? 24 : 16;
  const p = new Pix(48, h);
  const y0 = h - 12;
  const k = H('#16120c');
  // its shadow on the water and ripples at both ends
  box(p, 3, y0 + 10, 43, 2, alpha(H('#0c1408'), 0.5));
  ripple(p, 2, y0 + 7, 2); ripple(p, 46, y0 + 7, 2);
  // raked square ends: the corners are cut off
  const inside = (xx: number, yy: number) => {
    const ex = Math.min(xx - 2, 45 - xx), ey = Math.min(yy - y0, y0 + 9 - yy);
    return xx >= 2 && xx <= 45 && yy >= y0 && yy <= y0 + 9 && ex + ey >= 2;
  };
  box(p, 2, y0, 44, 10, (xx, yy) => {
    if (!inside(xx, yy)) return 0 as unknown as number;
    if (!inside(xx - 1, yy) || !inside(xx + 1, yy) || !inside(xx, yy - 1) || !inside(xx, yy + 1)) return k;
    if (yy === y0 + 1) return H('#a08a68');
    if (yy === y0 + 8) return H('#3e3226');
    if (xx === 3 || xx === 44) return H('#5e4c38');
    if (xx === 4 || xx === 43 || yy === y0 + 2 || yy === y0 + 7) return H('#6e5a42');
    return (xx % 5 === 0 ? H('#4a3c2c') : yy % 2 ? H('#5e4e3a') : H('#665440'));
  });
  for (const sx of [16, 31]) box(p, sx, y0 + 2, 3, 6, (xx) => (xx === sx ? H('#9a8664') : xx === sx + 1 ? H('#7a6648') : H('#3e3226')));
  if (load) {
    // baskets of vegetables, fish and flowers
    const basket = (x: number, y: number, goods: number[]) => {
      disc(p, x + 4, y + 5, 4.5, (d, xx, yy) => (yy < y + 4 ? 0 : d > 3.8 ? k : (xx + yy) % 2 ? H('#a07a48') : H('#7a5a34')));
      for (let i = 0; i < 7; i++) { const gx = x + 1 + i, gy = y + 2 + (i % 2); p.set(gx, gy, goods[i % goods.length]); p.set(gx, gy + 1, goods[(i + 1) % goods.length]); }
      p.set(x + 1, y + 2, k); p.set(x + 7, y + 2, k);
    };
    basket(5, 4, [H('#e8862a'), H('#c86a1a'), H('#f0a040')]);
    basket(20, 5, [H('#7aa040'), H('#5a8a30'), H('#9ac050')]);
    basket(34, 4, [H('#a8b4c0'), H('#7a8898'), H('#d8e0e8')]);
  } else {
    // the pole lying across
    line(p, 4, y0 + 5, 46, y0 + 3, H('#c8b080'));
    line(p, 4, y0 + 6, 46, y0 + 4, H('#6a5638'));
  }
  return p;
}

/** A fishing boat with a little cabin (4×1 tiles, 64×28). */
const FISHBOAT = (() => {
  const p = new Pix(64, 28);
  const k = H('#16120c');
  box(p, 4, 24, 57, 3, alpha(H('#0c1408'), 0.5));
  ripple(p, 3, 22, 3); ripple(p, 60, 22, 3);
  const hull = new Pix(64, 28);
  poly(hull, [[2, 14], [62, 14], [58, 25], [7, 25]], (x, y) => (y < 16 ? H('#c8b890') : y < 18 ? H('#b03a2e') : y < 22 ? H('#3e5a4a') : H('#2a4034')));
  poly(hull, [[5, 11], [59, 11], [61, 14], [3, 14]], (x) => (x % 5 === 0 ? H('#4a3c2c') : H('#7a6648')));
  withOutline(p, hull, 0, 0, k);
  // cabin
  box(p, 36, 1, 18, 12, (xx, yy) => (xx === 36 || xx === 53 || yy === 1 ? k : yy === 2 ? H('#e8e0c8') : yy < 4 ? H('#a83a2e') : H('#d8ceb4')));
  window_(p, 40, 5, 6, 5);
  // net heaped at the stern
  for (let y = 7; y < 12; y++) for (let x = 8; x < 24; x++) if (Math.hypot(x - 16, (y - 12) * 1.8) < 8) p.set(x, y, (x + y) % 2 ? H('#6a7a6a') : H('#8a9a88'));
  for (const fx of [10, 15, 21]) p.set(fx, 8, H('#e8b040'));
  box(p, 28, 0, 1, 12, H('#3a2e22'));
  return p;
})();

/** Two poles with a fishing net hung to dry, with cork floats (2×1 tiles, 32×32). */
const NET = (() => {
  const p = new Pix(32, 32);
  for (const sx of [2, 27]) {
    shadowEllipse(p, sx + 1, 30, 3, 1, H('#0a140a66'));
    box(p, sx, 3, 3, 28, (xx) => (xx === sx ? H('#8a7658') : xx === sx + 1 ? H('#5a4a36') : H('#2e2418')));
    box(p, sx, 2, 3, 1, H('#16120c'));
  }
  line(p, 4, 6, 28, 6, H('#3a2e22'));
  // sagging mesh
  for (let x = 5; x < 27; x++) {
    const sag = Math.round(Math.sin(((x - 5) / 22) * Math.PI) * 4);
    for (let y = 7; y < 22 + sag; y++) if ((x + y) % 4 === 0 || (x - y + 64) % 4 === 0) p.set(x, y, y > 18 + sag ? H('#5e6a5a') : H('#9aa890'));
    if (x % 5 === 2) { p.set(x, 7, H('#e8a030')); p.set(x, 8, H('#b87820')); }
  }
  for (let x = 5; x < 27; x++) { const sag = Math.round(Math.sin(((x - 5) / 22) * Math.PI) * 4); p.set(x, 22 + sag, H('#4a5448')); }
  return p;
})();

/** A woven eel trap lying on the ground (16×16). */
const TRAP = sprite({ k: '#1e160c', w: '#b8965a', W: '#9a7a44', d: '#6e5430', h: '#d8bc80', s: '#0a140a55', o: '#2e2418' }, [
  '................',
  '................',
  '................',
  '................',
  '...kkkkkkkkk....',
  '..khwhwhwhwhkk..',
  '.kwWwWwWwWwWwok.',
  '.kWwdwWwWdwWkook',
  '.kwWwWwWwWwWkook',
  '.kWwdwWwWdwWwok.',
  '..kdWdWdWdWdkk..',
  '...kkkkkkkkk....',
  '..ssssssssssss..',
  '................',
  '................',
  '................',
]);

/** A sawhorse with a plank on it, a saw and shavings (2×1 tiles, 32×24): the muskrat's workshop. */
const SAWHORSE = (() => {
  const p = new Pix(32, 24);
  shadowEllipse(p, 16, 22, 14, 2, H('#0a140a55'));
  for (const lx of [5, 24]) { line(p, lx - 3, 22, lx + 1, 10, H('#5a4632')); line(p, lx + 4, 22, lx, 10, H('#3e3022')); }
  box(p, 1, 8, 30, 4, (xx, yy) => (yy === 8 ? H('#c8b48c') : yy === 11 ? H('#16120c') : xx % 7 === 0 ? H('#8a7656') : H('#a8946e')));
  box(p, 0, 8, 1, 4, H('#16120c')); box(p, 31, 8, 1, 4, H('#16120c'));
  // the saw
  line(p, 10, 3, 20, 9, H('#c8ccd4')); line(p, 10, 4, 20, 10, H('#7a7e88'));
  box(p, 7, 1, 4, 3, H('#9a4a2a'));
  for (const [x, y] of [[3, 20], [8, 21], [20, 21], [26, 19], [14, 22]]) { p.set(x, y, H('#e0c890')); p.set(x + 1, y, H('#c8a870')); }
  return p;
})();

// ---------------------------------------------------------------- market

/** A market stall (2×1 tiles, 32×36): a scalloped striped canopy on posts over a counter of goods. */
function stallArt(kind: 'fish' | 'veg' | 'cake'): Pix {
  const p = new Pix(32, 36);
  const k = H('#16120c');
  const [a, b] = kind === 'fish' ? [H('#4a6a8a'), H('#d8d0b8')] : kind === 'veg' ? [H('#5a7a3a'), H('#e0d8b4')] : [H('#a8505a'), H('#e8d8c0')];
  shadowEllipse(p, 16, 34, 15, 2, H('#0a140a55'));
  for (const sx of [2, 28]) box(p, sx, 8, 2, 26, (xx) => (xx === sx ? H('#7a6648') : H('#3e3226')));
  // counter
  box(p, 1, 23, 30, 11, (xx, yy) => (yy === 23 ? H('#c8b48c') : yy === 33 || xx === 1 || xx === 30 ? k : xx % 4 === 0 ? H('#5e4c38') : yy === 24 ? H('#9a8664') : H('#7a6648')));
  // goods
  const g = (x: number, y: number, c: number[], pat: string[]) => pat.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') p.set(x + i, y + j, c[Number(ch)]); }));
  if (kind === 'fish') {
    for (const fx of [4, 12, 20]) g(fx, 19, [k, H('#a8b8c4'), H('#d8e2ea'), H('#6a7a88')], ['.000000.', '01122221', '33333331', '.000000.']);
    g(26, 18, [k, H('#7a5a34'), H('#a07a48')], ['.00.', '0120', '0210', '.00.']);
  } else if (kind === 'veg') {
    g(3, 18, [k, H('#e8862a'), H('#f8b050'), H('#4e7a2a')], ['..3...', '.0110.', '012110', '011110', '.0000.']);
    g(10, 18, [k, H('#c02a3a'), H('#f07080'), H('#a01a2a')], ['.0..0.', '012013', '011011', '.00.00']);
    g(17, 18, [k, H('#8a6a4a'), H('#c8a070'), H('#e8e0d0')], ['.000..', '01120.', '.033..', '..3...', '.....']);
    g(23, 18, [k, H('#f0ece0'), H('#c8c0a8'), H('#6a8a3a')], ['..3.3.', '.0110.', '011120', '.0000.']);
  } else {
    for (const [cx, c1, c2] of [[4, H('#e8b040'), H('#f8d870')], [12, H('#c03a4a'), H('#e87080')], [20, H('#a8b0b0'), H('#d8dcd8')]] as [number, number, number][]) {
      g(cx, 18, [k, c1, c2, H('#7a4a28')], ['.0000.', '022220', '011110', '033330', '.0000.']);
    }
  }
  // canopy with stripes and a scalloped edge
  box(p, 0, 2, 32, 9, (xx, yy) => {
    if (yy === 2 || xx === 0 || xx === 31) return k;
    const stripe = Math.floor((xx + (yy - 2) * 0.5) / 4) % 2 ? a : b;
    return yy < 4 ? mix(stripe, H('#ffffff'), 0.15) : yy > 8 ? mix(stripe, H('#000000'), 0.25) : stripe;
  });
  for (let x = 0; x < 32; x++) { const sc = x % 4 === 1 || x % 4 === 2 ? 2 : 1; for (let i = 0; i < sc; i++) p.set(x, 11 + i, Math.floor(x / 4) % 2 ? a : b); p.set(x, 11 + sc, k); }
  box(p, 1, 13, 30, 2, alpha(H('#000000'), 0.3));
  return p;
}

/** The dragonfly's kiosk for punt tickets and postcards (2×1 tiles, 32×40). */
const KIOSK = (() => {
  const p = new Pix(32, 40);
  const k = H('#16120c');
  shadowEllipse(p, 16, 38, 15, 2, H('#0a140a55'));
  boards(p, 3, 14, 26, 25, [H('#4e6a6a'), H('#56747a'), H('#466060')], 960);
  box(p, 2, 14, 1, 25, k); box(p, 29, 14, 1, 25, k); box(p, 3, 38, 26, 1, k);
  // the counter window
  box(p, 7, 18, 18, 9, (xx, yy) => (xx === 7 || xx === 24 || yy === 18 ? k : yy < 22 ? H('#3a2e22') : H('#4a3c2c')));
  box(p, 6, 27, 20, 2, (_, yy) => (yy === 27 ? H('#c8b48c') : k));
  // postcards on the side
  for (const [x, y, c] of [[4, 30, H('#7ab0c8')], [10, 31, H('#e8c870')], [17, 30, H('#9ac080')], [23, 31, H('#e09080')]] as [number, number, number][]) {
    box(p, x, y, 5, 4, (xx, yy) => (xx === x || xx === x + 4 || yy === y || yy === y + 3 ? H('#f4f0e4') : c));
  }
  // roof and a sign with a punt on it
  thatch(p, [[6, 2], [26, 2], [31, 14], [0, 14]], THATCH, 961, 4);
  box(p, 9, 5, 14, 7, (xx, yy) => (xx === 9 || xx === 22 || yy === 5 || yy === 11 ? k : H('#e8dcc0')));
  box(p, 11, 8, 10, 2, H('#6a4a2a')); line(p, 12, 6, 19, 10, H('#3a2a1a'));
  return p;
})();

/** The harbour light at the end of the pier (16×48). */
const BEACON = (() => {
  const p = new Pix(16, 48);
  const k = H('#16120c');
  halo(p, 8, 9, 12, H('#ffd890'), 0.35);
  box(p, 6, 14, 4, 33, (xx) => (xx === 6 ? H('#8a7658') : xx < 9 ? H('#5a4a36') : H('#2e2418')));
  for (let y = 18; y < 46; y += 6) box(p, 6, y, 4, 2, H('#b03a2e'));
  box(p, 4, 45, 8, 3, (xx, yy) => (yy === 47 ? k : xx === 4 ? H('#8a8a7e') : H('#5e5e56')));
  box(p, 3, 2, 10, 12, (xx, yy) => (xx === 3 || xx === 12 || yy === 2 || yy === 13 ? k : yy === 3 ? H('#3a2e22') : (xx === 7 || xx === 8) ? H('#3a2e22') : yy < 7 ? GLOW.core : H('#f0b040')));
  box(p, 2, 0, 12, 3, (xx, yy) => (yy === 0 || xx === 2 || xx === 13 ? k : H('#3a4a44')));
  return p;
})();

/** A wisp of mist lying on the water (2×1 tiles, 32×20), see-through. */
const MIST = (() => {
  const p = new Pix(32, 20);
  for (let y = 0; y < 20; y++) for (let x = 0; x < 32; x++) {
    const dx = (x - 16) / 16, dy = (y - 11) / 7;
    const d = dx * dx + dy * dy * 1.4;
    const n = vnoise(x * 1.5, y * 3, 8, 970);
    const a = clamp((1 - d) * 0.55 + (n - 0.5) * 0.5, 0, 0.5);
    if (a > 0.06) p.set(x, y, alpha(n > 0.55 ? H('#e8eee8') : H('#c8d4cc'), Math.round(a * 6) / 6));
  }
  return p;
})();

// ---------------------------------------------------------------- roadblocks

/** The broken boardwalk (2×2 tiles over water): splintered board ends, a gap of dark water, a board floating off. */
const BROKEN_WALK = (() => {
  const p = new Pix(32, 32);
  for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
    let c = WATER.mid;
    if (vnoise(x, y, 7, 980) > 0.62) c = WATER.deep;
    if (y < 3) c = mix(c, H('#0e160e'), 0.3);
    if (hash(Math.floor((x + 3) / 6), y, 981) < 0.05 && y % 3 === 0) c = WATER.glint;
    if (vnoise(x, y, 6, 982) > 0.74) c = WEED[(x + y) % 3 ? 1 : 2];
    p.set(x, y, c);
  }
  // board stubs on both ends, of uneven length (the walk is boards across, lanes y 2..28)
  for (let y = 2; y <= 28; y++) {
    const left = 3 + Math.floor(hash(0, Math.floor(y / 4), 983) * 5), right = 3 + Math.floor(hash(1, Math.floor(y / 4), 984) * 5);
    for (let x = 0; x < left; x++) p.set(x, y, y === 2 || y === 28 ? PLANK_OUT : x === left - 1 ? H('#c8b896') : (x % 4 === 3 ? PLANK_SEAM : PLANK[1]));
    for (let x = 32 - right; x < 32; x++) p.set(x, y, y === 2 || y === 28 ? PLANK_OUT : x === 32 - right ? H('#c8b896') : (x % 4 === 3 ? PLANK_SEAM : PLANK[2]));
  }
  // posts left standing in the gap, and a loose board drifting
  for (const [x, y] of [[13, 1], [19, 26]]) box(p, x, y, 3, 5, (xx, yy) => (yy === y ? H('#9a8a70') : xx === x ? H('#6a5a46') : xx === x + 2 ? H('#2e261c') : H('#4a3e30')));
  const board = new Pix(32, 32);
  poly(board, [[9, 13], [24, 9], [25, 13], [10, 17]], () => PLANK[2]);
  line(board, 9, 13, 24, 9, PLANK_LIGHT);
  withOutline(p, board, 0, 0, PLANK_OUT);
  ripple(p, 17, 19, 7);
  return p;
})();

/** The crocodile asleep across the jetty (2×1 tiles, 32×24), with a Z floating up. */
const CROC_SLEEP = sprite({ k: '#142010', g: '#4e7036', G: '#35522a', l: '#7a9a4a', b: '#c8c48a', e: '#2a3a1a', w: '#ffffff', z: '#e8f0e0', s: '#0a140a55' }, [
  '................................',
  '.........................zzz....',
  '...........................z....',
  '..........................z.....',
  '.........................zzz....',
  '.....................zz.........',
  '......................z.........',
  '.....................zz.........',
  '.........k.k.k.k.k.k.k..........',
  '........kGkGkGkGkGkGkGkk........',
  '..kkkkkkgllgllgllgllgllgGkk.....',
  '.kglglggglggglggglggglgggGGkk...',
  'kgggggggggggggggggggggggggGGGk..',
  'kggggeekgggggggggggggggggggGGGkk',
  'kgggggggggglggggglggggglgggGGGGk',
  'kbbbbbbbbkgggggggggggggggggGGkk.',
  'kwbwbwbwbkgGgGgGgGgGgGgGgGGk....',
  '.kbbbbbbbkbbbbbbbbbbbbbbbbkk....',
  '..kkkkkkkkkGGk.kkkkkk.kGGk......',
  '..........kGGGk......kGGGk......',
  '...........kkk........kkk.......',
  '..ssssssssssssssssssssssssss....',
  '................................',
  '................................',
]);

/** A bank of thick fog on the boardwalk (4×2 tiles, 64×56): billows lit from above; it hides the way completely. */
const FOG = (() => {
  const p = new Pix(64, 56);
  const puffs = [[12, 34, 12], [28, 26, 15], [46, 30, 14], [56, 40, 9], [20, 44, 12], [38, 44, 13], [8, 46, 8], [30, 38, 14]];
  for (let y = 0; y < 56; y++) for (let x = 0; x < 64; x++) {
    let best = -1, ny = 0;
    for (const [cx, cy, r] of puffs) {
      const d = Math.hypot(x + 0.5 - cx, (y + 0.5 - cy) * 1.1) / r;
      if (1 - d > best) { best = 1 - d; ny = (y - cy) / r - (x - cx) / r * 0.3; }
    }
    const n = vnoise(x, y, 5, 990);
    const edge = best * 6 + (n - 0.5) * 1.2;
    if (edge < 0) continue;
    const a = edge > 1 ? 0.94 : edge > 0.5 ? 0.7 : 0.4;
    const lv = -ny + (n - 0.5) * 0.5;
    const c = lv > 0.5 ? H('#f6f8f4') : lv > 0 ? H('#e2e8e2') : lv > -0.5 ? H('#ccd6ce') : H('#b2bfb6');
    p.set(x, y, alpha(c, a));
  }
  return p;
})();

Object.assign(DECOR, {
  sw_stilthut: stiltHut(), sw_exchange: stiltHut('pearl'), sw_office: (() => { const p = reedHouse(2); const s = stiltHut('stamp'); for (let y = 34; y < 50; y++) for (let x = 0; x < 14; x++) { const c = s.get(x, y); if (c & 255) p.set(x, y - 6, c); } return p; })(),
  sw_reedhouse: reedHouse(0), sw_reedhouse2: reedHouse(1), sw_pilehouse: pileHouse(0), sw_pilehouse2: pileHouse(1),
  sw_cypress: BIG_CYPRESS, sw_deadtree: DEAD_TREE, sw_reeds: REEDS, sw_lantern: LANTERN_POST,
  sw_punt: puntArt(), sw_marketboat: puntArt('market'), sw_fishboat: FISHBOAT, sw_net: NET, sw_trap: TRAP, sw_sawhorse: SAWHORSE,
  sw_stall_fish: stallArt('fish'), sw_stall_veg: stallArt('veg'), sw_stall_cake: stallArt('cake'), sw_kiosk: KIOSK, sw_beacon: BEACON, sw_mist: MIST,
  sw_brokenwalk: BROKEN_WALK, sw_croc_sleep: CROC_SLEEP, sw_fog: FOG,
});
Object.assign(DECOR_SIZE, {
  sw_stilthut: [5, 3], sw_exchange: [5, 3], sw_office: [5, 3], sw_reedhouse: [5, 3], sw_reedhouse2: [5, 3], sw_pilehouse: [4, 3], sw_pilehouse2: [4, 3],
  sw_cypress: [3, 2], sw_deadtree: [2, 1], sw_punt: [3, 1], sw_marketboat: [3, 1], sw_fishboat: [4, 1], sw_net: [2, 1], sw_sawhorse: [2, 1],
  sw_stall_fish: [2, 1], sw_stall_veg: [2, 1], sw_stall_cake: [2, 1], sw_kiosk: [2, 1], sw_mist: [2, 1],
  sw_brokenwalk: [2, 2], sw_croc_sleep: [2, 1], sw_fog: [4, 2],
});

// ---------------------------------------------------------------- animals

Object.assign(NPCS, {
  // Moritz / 木木, the muskrat carpenter: dark wet fur, a leather apron, a hammer
  sw_muskrat: sprite({ k: '#1e140c', b: '#6e4c32', B: '#4c3222', l: '#b08a62', n: '#2a1810', e: '#0c0806', W: '#ffffff', a: '#c89a5a', A: '#96703e', t: '#3e3430', h: '#9a9aa6', H: '#6a4a2a' }, [
    '................',
    '....kk....kk....',
    '...kbBk..kBbk...',
    '...kbbbkkbbbk...',
    '..kbbbbbbbbbbk..',
    '..kbbebbbbebbk..',
    '..kbblllllbbbk..',
    '..kbllnnnlllbk..',
    '...kbllWWllbk...',
    '..kkbbbbbbbbkkh.',
    '.kbbkaaaaaakbbhh',
    '.kbbkaAaaAakbkH.',
    '..kkkaaaaaakkkH.',
    '...kBaaaaaaBkt..',
    '...kbbkkkkbbktt.',
    '....kk....kkkkk.',
  ]),
  // Ute / 嘟嘟, the toad: warty, wide, golden eyes
  sw_toad: sprite({ k: '#1e1a0c', g: '#8a7a4a', G: '#5e5232', d: '#4a4026', l: '#d8c898', y: '#e0a830', e: '#100c04' }, [
    '................',
    '................',
    '................',
    '................',
    '...kkk....kkk...',
    '..kGyyk..kyyGk..',
    '..kGyek..keyGk..',
    '.kGggkggggkggGk.',
    '.kgdgggdggggdgk.',
    'kggggggggggdgggk',
    'kgdkkkkkkkkkkggk',
    'kgglllllllllldgk',
    'kGgllllllllllgGk',
    '.kGgllllllllgGk.',
    'kGGkkkkkkkkkkGGk',
    'kkkk........kkkk',
  ]),
  // Lotte / 乐乐, the otter at the exchange counter, in a green visor
  sw_otter: sprite({ k: '#1a100a', b: '#7a5434', B: '#583a22', l: '#ead6b2', n: '#1a1008', e: '#0c0806', W: '#ffffff', v: '#3a8a6a', V: '#246048', p: '#e8e0d0' }, [
    '................',
    '...kkkkkkkkkk...',
    '..kVvvvvvvvvVk..',
    '.kVVVVVVVVVVVVk.',
    '..kbbbbbbbbbbk..',
    '..kbeWbbbbeWbk..',
    '..kbllllllllbk..',
    '..kllllnnllllk..',
    '.k.kllkllkllk.k.',
    '...kkllllllkk...',
    '..kbbllllllbbk..',
    '.kbbkllllllkbbk.',
    '.kbbkllllllkbbk.',
    '..kkBllllllBkk..',
    '...kbbbbbbbbk...',
    '...kkk....kkk...',
  ]),
  // Klaus / 大嘴, the crocodile (awake: big snout, sleepy smile)
  sw_croc: sprite({ k: '#142010', g: '#4e7036', G: '#35522a', l: '#7a9a4a', y: '#e8d040', e: '#101008', b: '#c8c48a', w: '#ffffff' }, [
    '................',
    '...kkk....kkk...',
    '..kgyek..keygk..',
    '..kgggkkkkgggk..',
    '.kglgggggggglgk.',
    '.kggggggggggggk.',
    '..kgggggggggGk..',
    '..kgkgggggkgGk..',
    '..kbwbwbwbwbbk..',
    '..kbbbbbbbbbbk..',
    '.kGgkkkkkkkkgGk.',
    'kggglgggggglgggk',
    'kGkgbbbbbbbbgkGk',
    '.kkgbbbbbbbbgkk.',
    '..kGGkkkkkkGGk..',
    '..kkk......kkk..',
  ]),
  // Erna / 丫丫, the duck at the cake stall: speckled brown, white apron, headscarf
  sw_duck: sprite({ k: '#1e140c', b: '#a8845a', B: '#7a5a3a', d: '#5a4028', o: '#e8902a', O: '#b8661a', e: '#0c0806', W: '#ffffff', a: '#f4f0e4', A: '#c8c4b4', s: '#a8505a', S: '#7a3440' }, [
    '................',
    '.....kkkkkk.....',
    '....kssssssk....',
    '...kSssSsssSk...',
    '...kbbbbbbbbk...',
    '...kbeWbbeWbk...',
    '..kkbboooobbkk..',
    '..kOooooooooOk..',
    '...kkOOOOOOkk...',
    '..kbbkbbbbkbbk..',
    '.kbdbkaaaakbdbk.',
    '.kbbbkaAAakbbbk.',
    '.kBbdkaaaakdbBk.',
    '..kBBkaaaakBBk..',
    '...kkkkkkkkkk...',
    '....kook.kook...',
  ]),
  // Lina / 亮亮, the firefly guide: a small beetle with a glowing tail
  sw_firefly: sprite({ k: '#14100c', b: '#3a3442', B: '#2a2430', r: '#c84a3a', w: '#d8e8f0', W: '#b0c4d0', g: '#fff4a0', G: '#f0d050', h: '#f8f0a080', e: '#ffffff' }, [
    '................',
    '.....k....k.....',
    '......k..k......',
    '.....kkkkkk.....',
    '....krrrrrrk....',
    '....kbebbebk....',
    '.ww.kbbbbbbk.ww.',
    'wWWwkkbbbbkkwWWw',
    'wWWWwkBbbBkwWWWw',
    '.wWWwkbbbbkwWWw.',
    '..ww.kGggGk.ww..',
    '....hkggggkh....',
    '...hhkgggGkhh...',
    '....hhkGGkhh....',
    '.....hhkkhh.....',
    '................',
  ]),
  // Willi / 阿胡, the catfish cook: long whiskers, a chef's hat
  sw_catfish: sprite({ k: '#141a1c', f: '#6a7a80', F: '#4a585e', l: '#c8c8b4', e: '#0c0c0c', W: '#ffffff', h: '#f4f4ee', H: '#c8c8c0', m: '#2a3034' }, [
    '.....hhhhhh.....',
    '....hhhhhhhh....',
    '....hHhHhHhh....',
    '....kkkkkkkk....',
    '...kffffffffk...',
    '..kfWeffffWefk..',
    '..kffffffffffk..',
    'm.kflllllllllfk.m',
    '.mklkkkkkkkkklm.',
    'm.mkllllllllkm.m',
    '..kfkllllllkfk..',
    '.kffkllllllkffk.',
    '.kFfkllllllkfFk.',
    '..kkFllllllFkk..',
    '...kFFffffFFk...',
    '....kkk..kkk....',
  ].map((r) => r.slice(0, 16))),
  // Jonas / 小东, the newt who lights the harbour lanterns: orange belly, a cap, a taper
  sw_newt: sprite({ k: '#141a0c', g: '#5e6a36', G: '#424c26', o: '#e8782a', O: '#b85418', d: '#2a3016', e: '#0c0c04', W: '#ffffff', c: '#3a4a6a', C: '#26324a', t: '#e8d8a0', f: '#ffcc40' }, [
    '.............f..',
    '....kkkkkk...t..',
    '...kccccccck.t..',
    '..kCCCCCCCCCkt..',
    '...kggggggk..t..',
    '...kgeWgeWgk.t..',
    '...kgggggggk.t..',
    '....kgkkkgkk.t..',
    '...kkoooookk.k..',
    '..kgkoOoOokgkgk.',
    '..kgkoooookkgk..',
    '...kkoOoOokk....',
    '....kgooogk.....',
    '...kgkkkkkgkddk.',
    '...kkk...kkkddk.',
    '...........kkk..',
  ]),
  // Gisela / 慢慢, the snail at the vegetable stall
  sw_snail: sprite({ k: '#1e140c', s: '#b8784a', S: '#8a5432', L: '#e0a46a', b: '#c8c09a', B: '#9a9070', e: '#0c0806', W: '#ffffff', y: '#6a8a3a' }, [
    '................',
    '..k...k.........',
    '..W...W.........',
    '..k...k.........',
    '..kb.bk...kkkk..',
    '..kbbbk.kkSSSSk.',
    '.kbeWebkkSLLLsSk',
    '.kbbbbbkSLsssLSk',
    '.kbbbbbkSLskssLS',
    '..kbbbkkSsskksSk',
    '..kbbbkkSLssssSk',
    '..kbbbbkkSLLLSk.',
    '.kbbbbbbbkSSSkbk',
    'kbbBbbbbbbkkkbbk',
    'kBBBBBBBBBBBBBk.',
    '.kkkkkkkkkkkkk..',
  ]),
  // Lilli / 小青, the dragonfly at the kiosk: big eyes, four glassy wings
  sw_dragonfly: sprite({ k: '#0c1a24', b: '#3a8ab8', B: '#2a6088', g: '#5ac0a0', e: '#2a2a3a', E: '#8ad8f0', w: '#d8f0f8', W: '#a8d0e0' }, [
    '................',
    '.....kk..kk.....',
    '....kEek.keEk...',
    '....keEkkkEek...',
    '.....kggggggk...',
    'kwwwwkbbbbkwwwwk',
    'kWwwwwkbbkwwwwWk',
    '.kWWwwkbbkwwWWk.',
    '..kkkkkbbkkkkk..',
    '.kwwwwkbbkwwwwk.',
    'kWwwwkkBBkkwwwWk',
    '.kkkk.kbbk.kkkk.',
    '......kBBk......',
    '......kbbk......',
    '.......kBk......',
    '........k.......',
  ]),
  // Helga / 高高, the grey heron with her punt pole
  sw_heron: sprite({ k: '#141618', g: '#9aa2a8', G: '#6e767e', w: '#f0f0ea', W: '#c8ccc8', b: '#2a2a30', y: '#e8c040', Y: '#b88a20', e: '#0c0c0c', p: '#a8946e', P: '#6a5638' }, [
    '.......kk.......',
    '......kwwkbbbk..',
    '.....kwwekkk..p.',
    '.....kwwwkyyyyP.',
    '......kwwk...pP.',
    '......kwWk...p..',
    '.....kwwwk...p..',
    '....kgwwwgk..p..',
    '...kggwbwggk.p..',
    '..kgGgwbwgGgkp..',
    '..kgGgwwwgGgkp..',
    '..kgGgGgGgGgkp..',
    '...kGGGGGGGkkp..',
    '....kkyky kk.p..'.replace(' ', 'k'),
    '.....ky.yk...P..',
    '....kyy.yyk..P..',
  ]),
  // Gerhard / 老石, the snapping turtle border officer: ridged shell, hooked beak, a uniform cap
  sw_turtle: sprite({ k: '#141a10', s: '#4e5a36', S: '#353e24', r: '#6e7a4a', g: '#7a8a5a', G: '#566440', e: '#0c0c04', W: '#ffffff', c: '#2e4a3a', C: '#1e3226', y: '#e8c040', b: '#a8a078' }, [
    '.....kkkkkk.....',
    '....kccyycck....',
    '...kCCCCCCCCk...',
    '....kggggggk....',
    '....kgeWgeWk....',
    '....kggggggk....',
    '....kgbkkbgk....',
    '...kkkgbbgkkk...',
    '..kSsrSsrSsrSk..',
    '.kgSsrsrsrsrSgk.',
    '.kgkSsrsrsrsSkgk',
    'kGgkSsSrSrSsSkGk',
    '.kkkSssssssssk..',
    '...kSSSSSSSSk...',
    '...kgGkkkkGgk...',
    '...kkk....kkk...',
  ]),
});

// ---------------------------------------------------------------- items

const cake = (top: number, topL: number, sponge: number, deco: string) => sprite({ k: '#2a1a0c', t: '#' + top.toString(16).padStart(8, '0').slice(0, 6), T: '#' + topL.toString(16).padStart(8, '0').slice(0, 6), s: '#' + sponge.toString(16).padStart(8, '0').slice(0, 6), S: '#a87a48', p: '#f4f0e4', P: '#c8c4b4', d: deco }, [
  '................',
  '................',
  '................',
  '.......dd.......',
  '.....kkddkk.....',
  '...kkTTTTttkk...',
  '..kTTTtttttttk..',
  '..ktttttttttTk..',
  '..kstssstsstsk..',
  '..ksssssssssSk..',
  '..kSSSSSSSSSSk..',
  '.kpppppppppppPk.',
  '..kPPPPPPPPPPk..',
  '...kkkkkkkkkk...',
  '................',
  '................',
]);

Object.assign(ITEMS, {
  sw_plank: sprite({ k: '#2a1e12', w: '#a8946e', W: '#c8b48c', d: '#6a5638', n: '#3a3a40' }, [
    '................',
    '...........kkk..',
    '..........kWwdk.',
    '.........kWwwdk.',
    '........kWwndk..',
    '.......kWwwdk...',
    '......kWwwdk....',
    '.....kWwwdk.....',
    '....kWwwdk......',
    '...kWwndk.......',
    '..kWwwdk........',
    '.kWwwdk.........',
    '.kwddk..........',
    '..kkk...........',
    '................',
    '................',
  ]),
  sw_cake_honey: cake(H('#e8a830'), H('#f8d870'), H('#d8b070'), '#f8c840'),
  sw_cake_berry: cake(H('#b02a3a'), H('#e8607a'), H('#d8a878'), '#6a1a2a'),
  sw_cake_fish: cake(H('#8a989e'), H('#c8d2d8'), H('#c8a878'), '#5a6a72'),
  sw_berries: sprite({ k: '#2a1a0c', r: '#c0283a', R: '#801828', l: '#f07080', b: '#a07a48', B: '#7a5a34', g: '#4e7a32' }, [
    '................', '................', '................', '.....g..g.......', '....rlrrlrg.....', '...rRrlrrRlr....', '..krrRrrlrrRk...',
    '..kbBbBbBbBbk...', '..kBbBbBbBbBk...', '..kbBbBbBbBbk...', '...kBbBbBbBk....', '....kkkkkkk.....', '................', '................', '................', '................',
  ]),
  sw_mushrooms: sprite({ k: '#2a1a0c', c: '#8a5a34', C: '#5e3a20', l: '#b88458', s: '#efe4cc', S: '#c8b896' }, [
    '................', '................', '................', '....kkkk........', '..kkllcckk.kkk..', '.kcllccccCkllck.', '.kCCCCCCCCkcccCk',
    '..kkksskkkkCCCk.', '....ksSk..kssk..', '....ksSk..ksSk..', '....ksSk..ksSk..', '...kssSSk.kssSk.', '...kkkkkk.kkkkk.', '................', '................', '................',
  ]),
  sw_onions: sprite({ k: '#2a2010', w: '#f4f0e0', W: '#d8d0b8', p: '#c8b88a', g: '#6a9a3a' }, [
    '................', '.......g........', '......gg..g.....', '......g..g......', '.....kwk.kgk....', '....kwwWkwwk....', '...kwwwWWkwWk...',
    '...kwwwWWkwwWk..', '...kwwwWWkwwWk..', '...kWwwWWkWWWk..', '....kWWWkkWWk...', '.....kpkkkpk....', '......k...k.....', '................', '................', '................',
  ]),
  sw_soup: sprite({ k: '#2a1a0c', b: '#8a5a34', B: '#5e3a20', l: '#b88458', s: '#7a8a3a', S: '#5a6a2a', r: '#c0283a', w: '#e8ece4' }, [
    '................', '.....w...w......', '......w...w.....', '.....w...w......', '................', '..kkkkkkkkkkkk..', '.ksSsrsSssrsSsk.',
    '.kssSssrsSsssSk.', '.kllbbbbbbbbbBk.', '..klbbbbbbbbBk..', '...kbbbbbbbBk...', '....kkkkkkkk....', '................', '................', '................', '................',
  ]),
  sw_ticket: sprite({ k: '#1a2a1a', w: '#f4f0e0', g: '#4a7a5a', G: '#2e5a3e', b: '#6a4a2a', y: '#e8c040' }, [
    '................', '................', '................', '.kkkkkkkkkkkkkk.', '.kgggggggggggyk.', '.kgwwwwwwwwwgyk.', '.kgwbbbbbbbwgyk.',
    '.kgwwbwwwbwwg.k.', '.kgwwwwwwwwwgyk.', '.kgggggggggggyk.', '.kkkkkkkkkkkkkk.', '................', '................', '................', '................', '................',
  ]),
  sw_postcard: sprite({ k: '#2a2a2a', s: '#a8c0b8', g: '#5e7a42', w: '#2e4a3a', t: '#3e5a30', m: '#fffaf0', r: '#d83a30', y: '#f0c040' }, [
    '................', '................', '................', '.kkkkkkkkkkkkkk.', '.ksssssssssmrrk.', '.kssttsssyssrrk.', '.kstttsssssskkk.', '.ksstsssssssmmk.',
    '.kgggtgwwwwgmmk.', '.kgggggwwwggmmk.', '.kggggggggggmmk.', '.kkkkkkkkkkkkkk.', '................', '................', '................', '................',
  ]),
});

// ---------------------------------------------------------------- furniture (inside the homes)

const WOODF = { out: H('#1a120a'), d: H('#4a3422'), m: H('#6e5034'), l: H('#94714a'), h: H('#b8946a') };
/** A plank surface lit from the top left: boards along x, a light front edge. */
const plankTop = (p: Pix, x: number, y: number, w: number, h: number) => box(p, x, y, w, h, (xx, yy) => {
  if (xx === x || xx === x + w - 1 || yy === y) return WOODF.out;
  if (yy === y + 1) return WOODF.h;
  return (yy - y) % 3 === 0 ? WOODF.d : hash(xx >> 3, yy, 1100) < 0.5 ? WOODF.l : WOODF.m;
});
const legs = (p: Pix, xs: number[], y0: number, y1: number) => { for (const x of xs) box(p, x, y0, 2, y1 - y0, (xx) => (xx === x ? WOODF.m : WOODF.d)); };
/** Small things on tables and shelves: jars, bottles, books, bowls. */
function jar(p: Pix, x: number, y: number, c: number, h = 5) {
  box(p, x, y + 1, 4, h - 1, (xx, yy) => (xx === x || xx === x + 3 || yy === y + h - 1 ? H('#1e1a14') : xx === x + 1 && yy < y + 3 ? mix(c, H('#ffffff'), 0.5) : c));
  box(p, x, y, 4, 1, H('#8a6a48'));
}

/** A box bed with a straw pillow and a patchwork quilt (1×2 tiles, 16×36). */
function bed(quilt: number[]): Pix {
  const p = new Pix(16, 36);
  shadowEllipse(p, 8, 34, 8, 1, H('#00000044'));
  box(p, 0, 2, 16, 32, (xx, yy) => (xx === 0 || xx === 15 || yy === 2 || yy === 33 ? WOODF.out : xx === 1 || xx === 14 ? WOODF.m : yy < 6 ? WOODF.l : WOODF.d));
  box(p, 2, 5, 12, 6, (xx, yy) => (yy === 5 || xx === 2 || xx === 13 ? H('#8a7a5a') : yy < 8 ? H('#efe4c8') : H('#d4c8a8')));
  box(p, 2, 11, 12, 21, (xx, yy) => {
    if (yy === 11) return H('#2a2018');
    const q = quilt[(Math.floor((xx - 2) / 4) + Math.floor((yy - 12) / 5) * 2) % quilt.length];
    if ((xx - 2) % 4 === 3 || (yy - 12) % 5 === 4) return mix(q, H('#000000'), 0.35);
    return xx < 5 ? mix(q, H('#ffffff'), 0.15) : q;
  });
  return p;
}

/** A plank table with things on it (2×1 tiles, 32×26). */
function table(things: 'tea' | 'herbs' | 'map' | 'honey' | 'fish' | 'cake' | 'tools'): Pix {
  const p = new Pix(32, 26);
  shadowEllipse(p, 16, 24, 15, 1, H('#00000044'));
  legs(p, [2, 28], 16, 25);
  plankTop(p, 0, 8, 32, 9);
  box(p, 1, 16, 30, 1, WOODF.out);
  if (things === 'tea') { jar(p, 5, 4, H('#c8c0b0'), 5); disc(p, 15, 10, 2.5, (d) => (d > 1.8 ? H('#3a2a1a') : H('#b05a3a'))); disc(p, 22, 10, 2.5, (d) => (d > 1.8 ? H('#3a2a1a') : H('#e8dcc0'))); lantern(p, 25, 2); }
  if (things === 'herbs') { disc(p, 9, 10, 3.5, (d) => (d > 2.8 ? H('#2a2a2a') : H('#8a8a84'))); line(p, 9, 9, 13, 5, H('#c8b080')); for (let i = 0; i < 6; i++) p.set(16 + i * 2, 10 + (i % 2), H('#5a8a3a')); jar(p, 24, 5, H('#7a5a9a')); }
  if (things === 'map') { box(p, 3, 9, 20, 7, (xx, yy) => (xx === 3 || xx === 22 || yy === 9 || yy === 15 ? H('#8a7450') : (vnoise(xx, yy, 3, 1101) > 0.55 ? H('#7a9a6a') : H('#e8dcb8')))); line(p, 6, 13, 19, 11, H('#4a6a9a')); jar(p, 25, 5, H('#2a2a3a')); }
  if (things === 'honey') { for (const [x, c] of [[3, H('#e8a830')], [9, H('#d89020')], [15, H('#f0c040')]] as [number, number][]) jar(p, x, 4, c, 6); box(p, 22, 6, 7, 4, (xx, yy) => (yy === 6 ? H('#5a4020') : (xx + yy) % 2 ? H('#e8b040') : H('#c88a20'))); }
  if (things === 'fish') { for (const fx of [4, 15]) box(p, fx, 10, 9, 3, (xx, yy) => (yy === 10 ? H('#d8e2ea') : xx === fx + 8 ? H('#6a7a88') : H('#a8b8c4'))); line(p, 26, 12, 30, 9, H('#c8ccd4')); }
  if (things === 'cake') { disc(p, 10, 10, 4, (d) => (d > 3.3 ? H('#3a2010') : H('#c02a3a'))); jar(p, 18, 5, H('#c02a3a')); jar(p, 24, 5, H('#e8a830')); }
  if (things === 'tools') { line(p, 4, 12, 14, 10, H('#c8ccd4')); box(p, 3, 12, 3, 2, H('#7a4a2a')); box(p, 18, 10, 4, 3, H('#5a5a62')); line(p, 24, 13, 29, 9, H('#8a6a4a')); }
  return p;
}

/** A wall shelf with jars and bottles, books or honey (2×1 tiles, 32×34): stands against the back wall. */
function shelf(kind: 'jars' | 'books' | 'honey' | 'tools'): Pix {
  const p = new Pix(32, 34);
  shadowEllipse(p, 16, 32, 15, 1, H('#00000044'));
  box(p, 1, 2, 30, 31, (xx, yy) => (xx === 1 || xx === 30 || yy === 2 || yy === 32 ? WOODF.out : xx === 2 || xx === 29 ? WOODF.m : H('#2e2218')));
  for (const sy of [11, 20, 29]) box(p, 2, sy, 28, 2, (_, yy) => (yy === sy ? WOODF.h : WOODF.d));
  for (const [row, sy] of [[0, 4], [1, 13], [2, 22]] as [number, number][]) {
    let x = 4;
    while (x < 26) {
      const h = hash(x, row, 1110 + kind.length);
      if (kind === 'books') {
        const w = 2 + Math.floor(h * 2), ht = 5 + Math.floor(hash(x, row, 1111) * 3);
        box(p, x, sy + 7 - ht, w, ht, (xx, yy) => (yy === sy + 7 - ht ? H('#e8dcc0') : [H('#7a2a2a'), H('#2a4a6a'), H('#4a6a3a'), H('#8a6a2a')][Math.floor(h * 4)]));
        x += w + (h < 0.2 ? 2 : 0);
      } else if (kind === 'tools') {
        line(p, x, sy + 7, x + 3, sy, h < 0.5 ? H('#c8ccd4') : H('#8a6a4a')); x += 5;
      } else {
        const c = kind === 'honey' ? [H('#e8a830'), H('#d89020'), H('#f0c040')][Math.floor(h * 3)] : [H('#7a9a5a'), H('#a84a3a'), H('#c8a050'), H('#6a7a9a'), H('#9a6aa0')][Math.floor(h * 5)];
        jar(p, x, sy + 2, c, 6); x += 5;
      }
    }
  }
  return p;
}

/** A clay stove with a glowing fire and a pipe up to the roof (16×34). */
const STOVE = (() => {
  const p = new Pix(16, 34);
  halo(p, 8, 24, 10, H('#ffa040'), 0.3);
  box(p, 6, 0, 4, 14, (xx) => (xx === 6 ? H('#5a5a62') : xx === 9 ? H('#1e1e24') : H('#3a3a42')));
  box(p, 1, 13, 14, 20, (xx, yy) => (xx === 1 || xx === 14 || yy === 13 || yy === 32 ? H('#1e140c') : yy === 14 ? H('#c08a64') : xx < 4 ? H('#b07a56') : H('#8a5a3c')));
  box(p, 4, 22, 8, 7, (xx, yy) => (yy === 22 || xx === 4 || xx === 11 ? H('#1e140c') : yy > 26 ? H('#f8d050') : (xx + yy) % 2 ? H('#e8702a') : H('#f0a030')));
  // a kettle on top
  box(p, 4, 9, 7, 4, (xx, yy) => (xx === 4 || xx === 10 || yy === 9 ? H('#1e1e24') : xx < 6 ? H('#8a8a96') : H('#5a5a66')));
  return p;
})();

/** Bunches of herbs drying on a rack (2×1 tiles, 32×30). */
const HERBS = (() => {
  const p = new Pix(32, 30);
  shadowEllipse(p, 16, 28, 14, 1, H('#00000044'));
  for (const x of [2, 28]) box(p, x, 2, 2, 27, (xx) => (xx === x ? WOODF.l : WOODF.d));
  box(p, 1, 3, 30, 2, (_, yy) => (yy === 3 ? WOODF.h : WOODF.out));
  const cols = [[H('#5a7a3a'), H('#7a9a4a')], [H('#8a7a3a'), H('#b0a050')], [H('#6a5a8a'), H('#9a88b8')], [H('#4a6a4a'), H('#6a8a5a')], [H('#a0602a'), H('#c88a3a')]];
  for (let k = 0; k < 6; k++) {
    const x = 5 + k * 4, [d, l] = cols[k % cols.length], len = 9 + (k % 3) * 2;
    box(p, x + 1, 5, 1, 2, H('#c8b080'));
    for (let i = 0; i < len; i++) { const w = Math.min(3, 1 + Math.floor(i / 3)); for (let j = -w + 1; j < w; j++) p.set(x + 1 + j, 7 + i, (i + j) % 3 ? d : l); }
  }
  return p;
})();

/** A pot of carnivorous bog plants: pitcher leaves and a sundew with sticky red drops (16×22). */
const PITCHER = (() => {
  const p = new Pix(16, 22);
  box(p, 3, 15, 10, 6, (xx, yy) => (xx === 3 || xx === 12 || yy === 20 ? H('#2a1a10') : yy === 15 ? H('#c07a4a') : xx < 6 ? H('#b06a3a') : H('#8a4a2a')));
  for (const [x, h] of [[5, 11], [8, 13], [11, 9]]) {
    box(p, x - 1, 15 - h, 3, h, (xx, yy) => (xx === x - 1 ? H('#2a3a1a') : yy < 15 - h + 2 ? H('#a83a3a') : xx === x ? H('#8aa84a') : H('#5a7a32')));
    p.set(x, 15 - h, H('#e8605a'));
  }
  for (const [x, y] of [[3, 9], [13, 6], [2, 12]]) { p.set(x, y, H('#e83a4a')); p.set(x, y + 1, H('#5a7a32')); }
  return p;
})();

/** Glass jars with fireflies glowing inside (16×22). */
const LIGHTJARS = (() => {
  const p = new Pix(16, 22);
  halo(p, 8, 13, 9, H('#f0f080'), 0.3);
  for (const [x, h] of [[1, 10], [9, 8]]) {
    const y = 21 - h;
    box(p, x, y, 6, h, (xx, yy) => (xx === x || xx === x + 5 || yy === y + h - 1 ? H('#3a4a44') : yy === y ? H('#8a6a48') : alpha(H('#c8e0d8'), 0.5)));
    p.set(x + 2, y + 3, GLOW.core); p.set(x + 3, y + 5, GLOW.mid); p.set(x + 2, y + h - 3, GLOW.core);
  }
  return p;
})();

/** A heap of fishing net with cork floats (16×16). */
const NETPILE = (() => {
  const p = new Pix(16, 16);
  shadowEllipse(p, 8, 14, 7, 1, H('#00000044'));
  disc(p, 8, 12, 7, (d, x, y) => (y < 7 ? 0 : d > 6.3 ? H('#2a3028') : (x + y) % 3 === 0 ? H('#c8d0b8') : (x - y + 30) % 3 === 0 ? H('#8a9a80') : H('#5e6a58')));
  for (const [x, y] of [[4, 9], [9, 8], [12, 11], [7, 12]]) { p.set(x, y, H('#e8a030')); p.set(x + 1, y, H('#b87820')); }
  return p;
})();

/** A punt being built: keel and ribs on trestles (3×1 tiles, 48×24). */
const BOATFRAME = (() => {
  const p = new Pix(48, 24);
  shadowEllipse(p, 24, 22, 22, 1, H('#00000044'));
  for (const x of [6, 40]) { line(p, x - 3, 22, x, 14, WOODF.d); line(p, x + 3, 22, x, 14, WOODF.m); }
  box(p, 3, 12, 42, 4, (xx, yy) => (yy === 12 ? WOODF.h : yy === 15 ? WOODF.out : WOODF.l));
  for (let x = 6; x < 43; x += 5) { box(p, x, 3, 2, 10, (xx) => (xx === x ? WOODF.h : WOODF.d)); box(p, x - 1, 3, 4, 1, WOODF.out); }
  box(p, 3, 6, 42, 2, (_, yy) => (yy === 6 ? H('#c8a878') : WOODF.m));
  return p;
})();

/** Bricks of dried peat stacked to burn in winter (16×22). */
const PEAT = (() => {
  const p = new Pix(16, 22);
  shadowEllipse(p, 8, 20, 7, 1, H('#00000044'));
  for (const [x, y] of [[1, 15], [8, 15], [4, 10], [11, 10], [7, 5]]) box(p, x, y, 7, 5, (xx, yy) => (xx === x || xx === x + 6 || yy === y + 4 ? H('#1a120a') : yy === y ? H('#7a5a3a') : hash(xx, yy, 1120) < 0.3 ? H('#3a2a1a') : H('#5a4028')));
  return p;
})();

/** Bundles of cut reed standing up (16×30): for thatching. */
const REEDBUNDLE = (() => {
  const p = new Pix(16, 30);
  shadowEllipse(p, 8, 28, 7, 1, H('#00000044'));
  for (const bx of [2, 8]) {
    box(p, bx, 2, 6, 26, (xx, yy) => (xx === bx || xx === bx + 5 ? H('#4a3a18') : yy < 4 ? H('#8a7a4a') : (xx + Math.floor(yy / 3)) % 3 ? THATCH[3] : THATCH[2]));
    box(p, bx, 14, 6, 2, H('#4a3420'));
  }
  return p;
})();

/** Woven baskets stacked (16×20). */
const BASKETS = (() => {
  const p = new Pix(16, 20);
  shadowEllipse(p, 8, 18, 7, 1, H('#00000044'));
  for (const [x, y, w] of [[1, 11, 14], [3, 4, 10]]) box(p, x, y, w, 7, (xx, yy) => (xx === x || xx === x + w - 1 || yy === y || yy === y + 6 ? H('#3a2a14') : (xx + yy) % 2 ? H('#c8a464') : H('#9a7a40')));
  return p;
})();

/** A little three-legged stool (16×16). */
const STOOL = (() => {
  const p = new Pix(16, 16);
  shadowEllipse(p, 8, 14, 5, 1, H('#00000044'));
  legs(p, [3, 11], 9, 15);
  disc(p, 8, 7, 5, (d, x, y) => (y > 9 ? 0 : d > 4.3 ? WOODF.out : y < 6 ? WOODF.h : WOODF.l));
  box(p, 3, 9, 11, 1, WOODF.out);
  return p;
})();

/** A glass case with finds from the bog: an old wooden figure, a pot, a leather shoe (2×1 tiles, 32×32). */
const FINDS = (() => {
  const p = new Pix(32, 32);
  shadowEllipse(p, 16, 30, 15, 1, H('#00000044'));
  box(p, 1, 20, 30, 11, (xx, yy) => (xx === 1 || xx === 30 || yy === 30 ? WOODF.out : yy === 20 ? WOODF.h : WOODF.m));
  box(p, 2, 4, 28, 16, (xx, yy) => (xx === 2 || xx === 29 || yy === 4 ? H('#3a4a48') : alpha(H('#b8d0d0'), xx - 2 < (yy - 4) / 2 + 3 ? 0.45 : 0.25)));
  box(p, 6, 7, 3, 12, (xx, yy) => (yy === 7 ? H('#3a2414') : xx === 6 ? H('#7a5434') : H('#5a3a20'))); p.set(7, 9, H('#1a0a04'));
  disc(p, 16, 15, 4, (d, x, y) => (y < 12 ? 0 : d > 3.3 ? H('#2a1a10') : H('#8a5a3a')));
  box(p, 22, 15, 6, 4, (xx, yy) => (yy === 15 ? H('#2a1a10') : xx > 25 ? H('#4a3020') : H('#6a4a2a')));
  return p;
})();

Object.assign(DECOR, {
  sw_bed: bed([H('#7a5a8a'), H('#5a7a6a'), H('#a8704a'), H('#5a6a8a')]), sw_bed2: bed([H('#8a4a3a'), H('#c8a050'), H('#4a6a4a'), H('#a89a7a')]),
  sw_table: table('tea'), sw_herbtable: table('herbs'), sw_maptable: table('map'), sw_honeytable: table('honey'), sw_fishtable: table('fish'),
  sw_caketable: table('cake'), sw_toolbench: table('tools'),
  sw_shelf: shelf('jars'), sw_bookshelf: shelf('books'), sw_honeyshelf: shelf('honey'), sw_toolshelf: shelf('tools'),
  sw_stove: STOVE, sw_herbs: HERBS, sw_pitcher: PITCHER, sw_lightjars: LIGHTJARS, sw_netpile: NETPILE, sw_boatframe: BOATFRAME,
  sw_peat: PEAT, sw_reedbundle: REEDBUNDLE, sw_baskets: BASKETS, sw_stool: STOOL, sw_finds: FINDS,
});
Object.assign(DECOR_SIZE, {
  sw_bed: [1, 2], sw_bed2: [1, 2], sw_table: [2, 1], sw_herbtable: [2, 1], sw_maptable: [2, 1], sw_honeytable: [2, 1], sw_fishtable: [2, 1],
  sw_caketable: [2, 1], sw_toolbench: [2, 1], sw_shelf: [2, 1], sw_bookshelf: [2, 1], sw_honeyshelf: [2, 1], sw_toolshelf: [2, 1],
  sw_herbs: [2, 1], sw_boatframe: [3, 1], sw_finds: [2, 1],
});

/** A fern in a clay pot (16×22). */
const PLANTPOT = (() => {
  const p = new Pix(16, 22);
  shadowEllipse(p, 8, 20, 5, 1, H('#00000044'));
  box(p, 4, 14, 8, 7, (xx, yy) => (xx === 4 || xx === 11 || yy === 20 ? H('#2a1a10') : yy === 14 ? H('#c07a4a') : xx < 7 ? H('#b06a3a') : H('#8a4a2a')));
  const leaf = (x0: number, y0: number, dx: number, len: number) => { for (let i = 0; i < len; i++) { const x = x0 + Math.round(dx * i), y = y0 - i + Math.floor(i * i / 10); p.set(x, y, i % 2 ? H('#5a8a3a') : H('#3e6a2a')); p.set(x + (dx < 0 ? -1 : 1), y + 1, H('#7aa84a')); } };
  leaf(7, 14, -0.6, 10); leaf(8, 14, 0.6, 10); leaf(8, 14, 0, 12); leaf(6, 14, -1, 7); leaf(9, 14, 1, 7);
  return p;
})();

/** A lantern on a little stand (16×26): warm light for a corner. */
const FLOORLAMP = (() => {
  const p = new Pix(16, 26);
  shadowEllipse(p, 8, 24, 4, 1, H('#00000044'));
  box(p, 7, 10, 2, 14, (xx) => (xx === 7 ? WOODF.l : WOODF.d));
  box(p, 4, 23, 8, 2, WOODF.out);
  lantern(p, 6, 2);
  return p;
})();

/** Split firewood stacked against the wall (16×18). */
const FIREWOOD = (() => {
  const p = new Pix(16, 18);
  shadowEllipse(p, 8, 16, 7, 1, H('#00000044'));
  for (let r = 0; r < 3; r++) for (let k = 0; k < 3 - (r === 2 ? 1 : 0); k++) {
    const cx = 3 + k * 5 + (r === 2 ? 2 : 0), cy = 14 - r * 4;
    disc(p, cx, cy, 2.4, (d) => (d > 1.8 ? H('#3a2414') : d > 1 ? H('#c8a070') : H('#a07a48')));
  }
  return p;
})();

Object.assign(DECOR, { sw_plantpot: PLANTPOT, sw_floorlamp: FLOORLAMP, sw_firewood: FIREWOOD });
