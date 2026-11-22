/**
 * The adventure's pixel art, all original and drawn in code: characters as text sprites, terrain and trees
 * generated (shaded blobs, edges worked out from the neighbouring tiles). 16×16 tiles.
 */
import { hash, hex, Pix, sprite } from './pix';

export const T = 16;

/**
 * Each country has its own look: the same map codes are drawn as grass or snow or sand, water as a pond, an icy
 * lake or the sea, forest as leafy trees, snowy pines or palms. Caves and houses draw '#' as walls.
 */
export type Theme = 'forest' | 'snow' | 'cave' | 'beach' | 'indoor' | 'town' | 'snowtown' | 'city' | 'oldtown' | 'hall' | 'subway'
  /** themes added by the countries in countries/ (registerTheme) */
  | (string & {});
export const ZEBRA = 'z';

export interface Pal {
  ground: number[]; grassDark: number; grassLight: number;
  path: number; pathDark: number; pathLight: number; pathEdge: number;
  water: number; waterDeep: number; waterLight: number; waterEdge: number; foam: number;
  shadow: number;
}
export const pal = (o: Record<keyof Pal, string | string[]>): Pal =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.map(hex) : hex(v)])) as unknown as Pal;

const PALS: Record<string, Pal> = {
  forest: pal({
    ground: ['#7dc75d', '#84ce62', '#8ad367', '#91d86d'], grassDark: '#62b04c', grassLight: '#a8e486',
    path: '#ead49a', pathDark: '#d2b676', pathLight: '#f6e6bb', pathEdge: '#b8975a',
    water: '#5db1ef', waterDeep: '#4795dc', waterLight: '#b9e5ff', waterEdge: '#2f6aa8', foam: '#e6f6ff', shadow: '#1c3a1a55',
  }),
  snow: pal({
    ground: ['#dde7f2', '#e5edf6', '#edf3f9', '#f6f9fd'], grassDark: '#bfcde0', grassLight: '#ffffff',
    path: '#cfdae8', pathDark: '#b6c5d9', pathLight: '#e2eaf4', pathEdge: '#9fb1c9',
    water: '#a6d7ef', waterDeep: '#86bfe2', waterLight: '#e4f6ff', waterEdge: '#4f7fa8', foam: '#ffffff', shadow: '#3a4a6a40',
  }),
  cave: pal({
    ground: ['#4f4a58', '#56515f', '#5d5866', '#64606e'], grassDark: '#3e3a46', grassLight: '#7a7686',
    path: '#c8d8e8', pathDark: '#a8bcd0', pathLight: '#eef6ff', pathEdge: '#6a7a90',
    water: '#2a4a6a', waterDeep: '#1e3a58', waterLight: '#6a9ac0', waterEdge: '#0e1e30', foam: '#8ab8d8', shadow: '#00000055',
  }),
  beach: pal({
    ground: ['#eed39a', '#f2d9a3', '#f5dfac', '#f8e5b6'], grassDark: '#d9b878', grassLight: '#fff2cc',
    path: '#b88250', pathDark: '#8e5e34', pathLight: '#d6a06a', pathEdge: '#6a4224',
    water: '#36a6df', waterDeep: '#2486c6', waterLight: '#a8e2ff', waterEdge: '#1a5e94', foam: '#ffffff', shadow: '#6a4a2a40',
  }),
  town: pal({
    ground: ['#b8ad9c', '#c2b8a8', '#ccc2b2', '#d6cdbe'], grassDark: '#8e8476', grassLight: '#e4dccf',
    path: '#9a968e', pathDark: '#86827a', pathLight: '#aeaaa2', pathEdge: '#6e6a62',
    water: '#5db1ef', waterDeep: '#4795dc', waterLight: '#b9e5ff', waterEdge: '#2f6aa8', foam: '#e6f6ff', shadow: '#2a2a2a44',
  }),
  city: pal({
    ground: ['#c6c6cc', '#cfcfd4', '#d6d6da', '#dededf'], grassDark: '#a8a8ae', grassLight: '#e8e8ec',
    path: '#55575f', pathDark: '#4a4c54', pathLight: '#60626a', pathEdge: '#8a8a92',
    water: '#3a88c8', waterDeep: '#2a70b0', waterLight: '#a8d8f8', waterEdge: '#5a5a62', foam: '#c8e4f8', shadow: '#1a1a2244',
  }),
  oldtown: pal({
    ground: ['#b8ad9c', '#c2b8a8', '#ccc2b2', '#d6cdbe'], grassDark: '#8e8476', grassLight: '#e4dccf',
    path: '#55575f', pathDark: '#4a4c54', pathLight: '#60626a', pathEdge: '#8a8a92',
    water: '#3a88c8', waterDeep: '#2a70b0', waterLight: '#a8d8f8', waterEdge: '#5a5a62', foam: '#c8e4f8', shadow: '#1a1a2244',
  }),
  hall: pal({
    ground: ['#d8ccb4', '#cfc2a8', '#d8ccb4', '#e0d4bc'], grassDark: '#a89c88', grassLight: '#ece2cc',
    path: '#c0443a', pathDark: '#982e28', pathLight: '#e06a58', pathEdge: '#6a1e18',
    water: '#5db1ef', waterDeep: '#4795dc', waterLight: '#b9e5ff', waterEdge: '#2f6aa8', foam: '#e6f6ff', shadow: '#2a1a0a44',
  }),
  subway: pal({
    ground: ['#b8bcc4', '#aeb2ba', '#b8bcc4', '#c2c6ce'], grassDark: '#8a8e96', grassLight: '#d0d4dc',
    path: '#5a5e66', pathDark: '#4a4e56', pathLight: '#7a7e88', pathEdge: '#3a3e46',
    water: '#5db1ef', waterDeep: '#4795dc', waterLight: '#b9e5ff', waterEdge: '#2f6aa8', foam: '#e6f6ff', shadow: '#00000044',
  }),
  snowtown: pal({
    ground: ['#c8ccd6', '#d2d6de', '#dcdfe6', '#ffffff'], grassDark: '#9aa2b2', grassLight: '#ffffff',
    path: '#b4bcc8', pathDark: '#9ea8b6', pathLight: '#d0d8e2', pathEdge: '#8492a6',
    water: '#a6d7ef', waterDeep: '#86bfe2', waterLight: '#e4f6ff', waterEdge: '#4f7fa8', foam: '#ffffff', shadow: '#3a4a6a40',
  }),
  indoor: pal({
    ground: ['#c4925a', '#c89660', '#cc9a64', '#d09e68'], grassDark: '#a47240', grassLight: '#dcae78',
    path: '#c0443a', pathDark: '#982e28', pathLight: '#e06a58', pathEdge: '#6a1e18',
    water: '#5db1ef', waterDeep: '#4795dc', waterLight: '#b9e5ff', waterEdge: '#2f6aa8', foam: '#e6f6ff', shadow: '#2a1a0a44',
  }),
};

/** The palette in use while a map is being drawn (set by terrain()). */
let C: Pal & { grass: number } = { ...PALS.forest, grass: PALS.forest.ground[1] };
let theme: Theme = 'forest';
export function useTheme(t: Theme) { const q = PALS[t] ?? PALS.forest; theme = t; C = { ...q, grass: q.ground[1] }; }
export const shadowColor = () => C.shadow;
/** The palette and theme of the map being drawn (for the countries' own terrain code). */
export const palette = () => C;
export const currentTheme = () => theme;

/**
 * Draws one tile in a country's own way; returns true when it drew it, false to fall back to the standard drawing
 * (grass, path, water… in the theme's palette). `at` gives the map code of any tile, so edges can be worked out.
 */
export type TerrainHook = (p: Pix, ox: number, oy: number, tx: number, ty: number, at: (x: number, y: number) => string, frame: number) => boolean;
const TERRAIN_HOOKS: Record<string, TerrainHook> = {};
/** Trees drawn on the '#' (forest) tiles of each outdoor theme: two variants, about 48×64, crowns overlapping. */
export const THEME_TREES: Record<string, Pix[]> = {};
/** What the "name it" key calls a bare tile of a theme (a THINGS key), or undefined for the usual name. */
export const TILE_THINGS: Record<string, (code: string) => string | undefined> = {};
/**
 * How a train ride to a country looks (Ride.tsx): sky, far hills, near hills, ground colours and the props streaming
 * past (game sprites); `far` 'mountains' | 'hills' | 'dunes' | 'skyline' | 'sea'.
 */
export interface RideLook { sky: [string, string]; cloud: string; far: [string, string]; hill: [string, string]; ground: string; groundD: string; fence: string; farShape: 'mountains' | 'hills' | 'dunes' | 'skyline' | 'sea'; props: Pix[] }
export const RIDE_LOOKS: Record<string, RideLook> = {};

/** Adds a country's look: its palette, optionally its own tile drawing and the trees on its '#' tiles. */
export function registerTheme(t: string, colors: Record<keyof Pal, string | string[]>, opts: { terrain?: TerrainHook; trees?: Pix[]; things?: (code: string) => string | undefined } = {}) {
  PALS[t] = pal(colors);
  if (opts.terrain) TERRAIN_HOOKS[t] = opts.terrain;
  if (opts.trees) THEME_TREES[t] = opts.trees;
  if (opts.things) TILE_THINGS[t] = opts.things;
}

// ---------------------------------------------------------------- terrain

/** Terrain codes in the map rows. */
export const GRASS = '.', TALL = '"', PATH = ':', WATER = '~', FOREST = '#', RED = 'r', YELLOW = 'y', WHITE = 'w', ROCK = 'o', FENCE = '=', TRACK = '|';
export const isGrassy = (c: string) => c === GRASS || c === RED || c === YELLOW || c === WHITE || c === TALL || c === FOREST || c === ROCK || c === FENCE;

/** Smooth value noise (0..1) on a lattice of `cell` pixels: soft patches of lighter and darker grass. */
export function vnoise(x: number, y: number, cell: number, seed: number): number {
  const gx = Math.floor(x / cell), gy = Math.floor(y / cell);
  const fx = x / cell - gx, fy = y / cell - gy;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = hash(gx, gy, seed), b = hash(gx + 1, gy, seed), c = hash(gx, gy + 1, seed), d = hash(gx + 1, gy + 1, seed);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

/** Base grass colour at a world pixel (shared by grass, flower and path-edge tiles so they line up). */
export function grassAt(wx: number, wy: number): number {
  const n = vnoise(wx, wy, 22, 1) * 0.65 + vnoise(wx, wy, 7, 2) * 0.35 + (hash(wx, wy, 3) - 0.5) * 0.12;
  return C.ground[n < 0.36 ? 0 : n < 0.55 ? 1 : n < 0.7 ? 2 : 3];
}

const TUFTS = [
  // small blade clusters: [dx, dy, colour] with d = dark, l = light
  [[0, 0, 'd'], [2, 0, 'd'], [1, 1, 'd'], [0, -1, 'l'], [2, -1, 'l']],
  [[0, 0, 'd'], [1, -1, 'd'], [2, 0, 'd'], [1, -2, 'l']],
  [[0, 0, 'd'], [1, 0, 'd'], [3, 0, 'd'], [0, -1, 'd'], [3, -1, 'l'], [0, -2, 'l']],
] as const;

function grass(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const wx0 = tx * T, wy0 = ty * T;
  if (theme === 'city') return pavement(p, ox, oy, tx, ty);
  if (theme === 'town' || theme === 'snowtown' || theme === 'oldtown') {
    // cobblestones (in Frostburg with snow lying between them): rows of rounded stones, every other row shifted
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const wy = wy0 + y, wx = wx0 + x;
      const row = Math.floor(wy / 4), sx = (wx + (row % 2) * 3) % 6;
      const gap = wy % 4 === 3 || sx === 5;
      const tone = C.ground[Math.floor(hash(Math.floor((wx + (row % 2) * 3) / 6), row, 140) * 4)];
      p.set(ox + x, oy + y, gap ? C.grassDark : wy % 4 === 0 && sx < 4 ? C.grassLight : tone);
    }
    return;
  }
  if (theme === 'indoor') {
    // floorboards: 4 px planks with staggered joints
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const row = Math.floor((wy0 + y) / 4);
      const joint = (wx0 + x + row * 7) % 24 === 0;
      p.set(ox + x, oy + y, (wy0 + y) % 4 === 3 || joint ? C.grassDark : y % 4 === 0 ? C.grassLight : C.ground[(row * 3) % 4]);
    }
    return;
  }
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, grassAt(wx0 + x, wy0 + y));
  // a few tufts at random spots (none on some tiles), so there is no visible grid
  const n = Math.floor(hash(tx, ty, 61) * 3.2);
  for (let k = 0; k < n; k++) {
    const t = TUFTS[Math.floor(hash(tx, ty, 70 + k) * TUFTS.length)];
    const x = 2 + Math.floor(hash(tx, ty, 80 + k) * 11), y = 3 + Math.floor(hash(tx, ty, 90 + k) * 11);
    for (const [dx, dy, c] of t) p.set(ox + x + dx, oy + y + dy, c === 'd' ? C.grassDark : C.grassLight);
  }
}

const BLADE = ['#2e7430', '#3f8f38', '#56aa44', '#76c556', '#a2e07c'].map(hex);
const TALL_BG = hex('#3d8a36');

/**
 * Tall grass: tufts of leaning blades on a dark base. Sides that border ordinary grass keep the grass showing
 * between the tufts, so patches end raggedly instead of in a straight line. `front` draws only the front row of
 * tufts (laid over a character standing in the grass, hiding its paws).
 */
export function tallGrass(p: Pix, ox: number, oy: number, tx: number, ty: number, same: (dx: number, dy: number) => boolean, front = false) {
  if (!front) {
    const top = same(0, -1) ? 0 : 6, bottom = same(0, 1) ? 16 : 14;
    const left = same(-1, 0) ? 0 : 2, right = same(1, 0) ? 16 : 14;
    for (let y = top; y < bottom; y++) for (let x = left; x < right; x++) p.set(ox + x, oy + y, TALL_BG);
    if (!same(0, 1)) for (let x = left; x < right; x++) p.set(ox + x, oy + 14, C.shadow);
  }
  // two rows of tufts (anchored at y 8 and 15), jittered per tile
  for (const [row, base] of [[0, 8], [1, 15]] as const) {
    if (front && row === 0) continue;
    for (let k = 0; k < 3; k++) {
      const cx = 2 + k * 5 + Math.floor(hash(tx * 3 + k, ty * 2 + row, 101) * 3) + (row ? 2 : 0) - (k === 2 && row ? 2 : 0);
      const by = base - Math.floor(hash(tx + k, ty + row, 103) * 2);
      tuft(p, ox + cx, oy + by, 7 + Math.floor(hash(tx * 5 + k, ty + row, 107) * 3), (tx + ty + k + row) % 2 === 0);
    }
  }
}

function tuft(p: Pix, x: number, y: number, h: number, mirror: boolean) {
  // three blades fanning out: left, middle (tallest), right
  const blades: [number, number][] = [[-2, h - 2], [0, h], [2, h - 1]];
  for (const [lean, len] of blades) {
    const dir = mirror ? -lean : lean;
    for (let i = 0; i < len; i++) {
      const t = i / (len - 1);
      const bx = x + Math.round(dir * t * 0.9);
      const tone = BLADE[Math.min(4, 1 + Math.floor(t * 3.99))];
      p.set(bx, y - i, i === len - 1 ? BLADE[4] : tone);
      if (i < len - 2) p.set(bx - 1, y - i, BLADE[0]);
    }
  }
}

function flowers(p: Pix, ox: number, oy: number, petal: string) {
  const f = sprite({ p: petal, c: '#f8e070', k: '#5a8a3a', s: '#ffffff' }, [
    '.p.',
    'pcp',
    '.p.',
  ]);
  const leaf = hex('#5aa646');
  for (const [x, y] of [[3, 3], [10, 9]]) {
    p.blit(f, ox + x, oy + y);
    p.set(ox + x - 1, oy + y + 3, leaf); p.set(ox + x + 3, oy + y + 3, leaf);
  }
}

/**
 * Path and water tiles look at their neighbours: a side that borders something else gets an edge, so paths and
 * ponds come out with soft, rounded outlines without hand-made corner tiles.
 */
type Same = (dx: number, dy: number) => boolean;

function path(p: Pix, ox: number, oy: number, tx: number, ty: number, same: Same) {
  if (theme === 'beach') return boardwalk(p, ox, oy, tx, ty, same);
  if (theme === 'indoor' || theme === 'cave') return mat(p, ox, oy);
  p.fill(ox, oy, T, T, C.path);
  for (let k = 0; k < 5; k++) {
    const x = Math.floor(hash(tx, ty, 10 + k) * 14) + 1, y = Math.floor(hash(tx, ty, 20 + k) * 14) + 1;
    p.set(ox + x, oy + y, k % 2 ? C.pathLight : C.pathDark);
  }
  const n = !same(0, -1), s = !same(0, 1), w = !same(-1, 0), e = !same(1, 0);
  const G = (x: number, y: number) => grassAt(tx * T + x, ty * T + y);
  for (let i = 0; i < T; i++) {
    // grass reaching over the edge, then a darker rim
    const bump = (k: number) => (hash(tx * 31 + k, ty * 17 + i, 3) < 0.35 ? 1 : 0);
    if (n) { const d = 1 + bump(1); for (let j = 0; j < d; j++) p.set(ox + i, oy + j, G(i, j)); p.set(ox + i, oy + d, C.pathEdge); }
    if (s) { const d = 1 + bump(2); for (let j = 0; j < d; j++) p.set(ox + i, oy + 15 - j, G(i, 15 - j)); p.set(ox + i, oy + 15 - d, C.pathEdge); }
    if (w) { const d = 1 + bump(3); for (let j = 0; j < d; j++) p.set(ox + j, oy + i, G(j, i)); p.set(ox + d, oy + i, C.pathEdge); }
    if (e) { const d = 1 + bump(4); for (let j = 0; j < d; j++) p.set(ox + 15 - j, oy + i, G(15 - j, i)); p.set(ox + 15 - d, oy + i, C.pathEdge); }
  }
  // rounded outer corners
  const corner = (cx: number, cy: number, sx: number, sy: number) => {
    for (const [x, y] of [[0, 0], [1, 0], [0, 1], [2, 0], [0, 2], [1, 1]]) p.set(ox + cx + sx * x, oy + cy + sy * y, G(cx + sx * x, cy + sy * y));
    p.set(ox + cx + sx * 2, oy + cy + sy * 1, C.pathEdge); p.set(ox + cx + sx * 1, oy + cy + sy * 2, C.pathEdge);
    p.set(ox + cx + sx * 3, oy + cy + sy * 1, C.pathEdge); p.set(ox + cx + sx * 1, oy + cy + sy * 3, C.pathEdge);
  };
  if (n && w) corner(0, 0, 1, 1);
  if (n && e) corner(15, 0, -1, 1);
  if (s && w) corner(0, 15, 1, -1);
  if (s && e) corner(15, 15, -1, -1);
}

function water(p: Pix, ox: number, oy: number, tx: number, ty: number, same: Same, frame: number) {
  p.fill(ox, oy, T, T, C.water);
  // wave marks that drift by one pixel between the two frames
  for (let k = 0; k < 3; k++) {
    const x = Math.floor(hash(tx, ty, 40 + k) * 11) + 1 + frame, y = Math.floor(hash(tx, ty, 50 + k) * 13) + 1;
    p.set(ox + x, oy + y, C.waterDeep); p.set(ox + x + 1, oy + y, C.waterDeep); p.set(ox + x + 2, oy + y, C.waterDeep);
    p.set(ox + x + 1, oy + y - 1, C.waterLight);
  }
  const n = !same(0, -1), s = !same(0, 1), w = !same(-1, 0), e = !same(1, 0);
  // Where the bank turns inwards (water continues round a land corner), the land tile draws a rounded inlet
  // (see inlet below), so the straight edge stops short of it.
  const F = 16 - INLET;
  for (let i = 0; i < T; i++) {
    const hl = i < INLET, hr = i >= F;
    if (n && !(hl && same(-1, 0) && same(-1, -1)) && !(hr && same(1, 0) && same(1, -1))) { p.set(ox + i, oy, C.waterEdge); p.set(ox + i, oy + 1, C.foam); if ((i + frame) % 4 === 0) p.set(ox + i, oy + 2, C.waterLight); }
    if (s && !(hl && same(-1, 0) && same(-1, 1)) && !(hr && same(1, 0) && same(1, 1))) { p.set(ox + i, oy + 15, C.waterEdge); p.set(ox + i, oy + 14, C.waterDeep); }
    if (w && !(hl && same(0, -1) && same(-1, -1)) && !(hr && same(0, 1) && same(-1, 1))) { p.set(ox, oy + i, C.waterEdge); p.set(ox + 1, oy + i, C.foam); }
    if (e && !(hl && same(0, -1) && same(1, -1)) && !(hr && same(0, 1) && same(1, 1))) { p.set(ox + 15, oy + i, C.waterEdge); p.set(ox + 14, oy + i, C.foam); }
  }
  // outer corners: a wide rounded bank (radius 7), so ponds come out as blobs instead of stepped crosses
  const G = (x: number, y: number) => grassAt(tx * T + x, ty * T + y);
  const R = 7;
  const round = (sx: number, sy: number) => {
    for (let y = 0; y < R; y++) for (let x = 0; x < R; x++) {
      const px = sx > 0 ? x : 15 - x, py = sy > 0 ? y : 15 - y;
      const d = Math.hypot(R - x - 0.5, R - y - 0.5);
      if (d > R) p.set(ox + px, oy + py, G(px, py));
      else if (d > R - 1) p.set(ox + px, oy + py, C.waterEdge);
      else if (d > R - 2 && sy > 0) p.set(ox + px, oy + py, C.foam);
    }
  };
  if (n && w) round(1, 1);
  if (n && e) round(-1, 1);
  if (s && w) round(1, -1);
  if (s && e) round(-1, -1);
  // inner corners: water on both sides but land diagonally
  if (!n && !w && !same(-1, -1)) { p.set(ox, oy, C.waterEdge); p.set(ox + 1, oy, C.foam); p.set(ox, oy + 1, C.foam); }
  if (!n && !e && !same(1, -1)) { p.set(ox + 15, oy, C.waterEdge); p.set(ox + 14, oy, C.foam); p.set(ox + 15, oy + 1, C.foam); }
  if (!s && !w && !same(-1, 1)) p.set(ox, oy + 15, C.waterEdge);
  if (!s && !e && !same(1, 1)) p.set(ox + 15, oy + 15, C.waterEdge);
}

const INLET = 7;

/** Railway track running north-south: gravel, wooden sleepers, two steel rails. */
function track(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const g = hash(tx * T + x, ty * T + y, 150);
    p.set(ox + x, oy + y, x < 1 || x > 14 ? grassAt(tx * T + x, ty * T + y) : g < 0.3 ? hex('#8a847a') : g < 0.7 ? hex('#a09a90') : hex('#b4aea4'));
  }
  for (let y = 1; y < T; y += 4) for (let x = 1; x < 15; x++) { p.set(ox + x, oy + y, hex('#7a5232')); p.set(ox + x, oy + y + 1, hex('#5a3a22')); }
  for (let y = 0; y < T; y++) for (const x of [4, 11]) { p.set(ox + x, oy + y, hex('#c8ccd4')); p.set(ox + x + 1, oy + y, hex('#6a6e78')); }
}

/** Beach paths: a wooden boardwalk of planks across the sand. */
function boardwalk(p: Pix, ox: number, oy: number, tx: number, ty: number, same: Same) {
  grass(p, ox, oy, tx, ty); // sand under and beside the planks
  const horiz = same(-1, 0) || same(1, 0);
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const along = horiz ? x : y, across = horiz ? y : x;
    if (across < 2 || across > 13) continue;
    const seam = along % 4 === 3;
    p.set(ox + x, oy + y, across === 2 || across === 13 ? C.pathEdge : seam ? C.pathDark : across === 3 ? C.pathLight : C.path);
  }
  if (horiz) for (let x = 0; x < T; x += 8) { p.set(ox + x + 1, oy + 15, C.pathEdge); p.set(ox + x + 1, oy + 14, C.pathEdge); }
}

/** A doormat (indoors) or the daylight at a cave's mouth: where a map is left. */
function mat(p: Pix, ox: number, oy: number) {
  if (theme === 'cave') {
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, y > 10 ? C.pathLight : y > 4 ? C.path : C.pathDark);
    return;
  }
  for (let y = 2; y < 14; y++) for (let x = 1; x < 15; x++) {
    const edge = y === 2 || y === 13 || x === 1 || x === 14;
    p.set(ox + x, oy + y, edge ? C.pathEdge : (x + y) % 4 === 0 ? C.pathLight : C.path);
  }
}

/**
 * Walls (caves and houses draw '#' as walls). A wall above a walkable tile shows its face: rock with cracks and a
 * lit top edge in caves, wallpaper over wooden panelling indoors; deeper wall is the dark top.
 */
function wall(p: Pix, ox: number, oy: number, tx: number, ty: number, at: (x: number, y: number) => string) {
  const face = at(tx, ty + 1) !== FOREST;
  const cave = theme === 'cave';
  const top = cave ? [hex('#2a2630'), hex('#322e3a')] : [hex('#4a3426'), hex('#56402e')];
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, top[vnoise(tx * T + x, ty * T + y, 9, 51) + (hash(tx * T + x, ty * T + y, 52) - 0.5) * 0.15 < 0.5 ? 0 : 1]);
  if (cave) {
    for (let k = 0; k < 4; k++) { const x = Math.floor(hash(tx, ty, 200 + k) * 15), y = Math.floor(hash(tx, ty, 210 + k) * 15); p.set(ox + x, oy + y, hex('#46404e')); }
    if (!face) return;
    const tones = ['#5a5466', '#6a6476', '#7a7488', '#8e889c'].map(hex);
    for (let y = 2; y < T; y++) for (let x = 0; x < T; x++) {
      const n = vnoise(tx * T + x, ty * T + y, 6, 31) + (hash(tx * T + x, y, 33) - 0.5) * 0.2 - y / 40;
      p.set(ox + x, oy + y, tones[n < 0.3 ? 0 : n < 0.5 ? 1 : n < 0.7 ? 2 : 3]);
    }
    for (let x = 0; x < T; x++) { p.set(ox + x, oy + 2, hex('#a8a2b8')); p.set(ox + x, oy + 15, hex('#2a2630')); }
    // cracks
    const cx = 3 + Math.floor(hash(tx, ty, 220) * 10);
    for (let y = 4; y < 12; y++) p.set(ox + cx + Math.round(Math.sin(y + tx) * 0.8), oy + y, hex('#3e3848'));
    return;
  }
  if (!face) return;
  // wallpaper with a stripe pattern, a rail, panelling and a skirting board
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    let c = (tx * T + x) % 6 < 3 ? hex('#efe0c0') : hex('#e6d4b0');
    if (y === 0) c = hex('#8a6440');
    if (y >= 8) c = (tx * T + x) % 8 === 0 ? hex('#8a5a32') : hex('#b07a48');
    if (y === 8) c = hex('#d8a874');
    if (y >= 14) c = hex('#5a3a22');
    p.set(ox + x, oy + y, c);
  }
}

/** Ice on a frozen lake: pale with white cracks instead of waves. */
function iceMarks(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  for (let k = 0; k < 2; k++) {
    let x = Math.floor(hash(tx, ty, 300 + k) * 12) + 2, y = Math.floor(hash(tx, ty, 310 + k) * 12) + 2;
    for (let i = 0; i < 6; i++) {
      p.set(ox + x, oy + y, C.foam);
      x += hash(tx + i, ty, 320 + k) < 0.5 ? 1 : 0;
      y += hash(tx, ty + i, 330 + k) < 0.5 ? 1 : -1;
      if (x < 2 || x > 13 || y < 2 || y > 13) break;
    }
  }
}

/**
 * A land tile with water on two neighbouring sides and on the diagonal between them: water rounds into its corner,
 * so the bank curves instead of making a step.
 */
function inlet(p: Pix, ox: number, oy: number, sx: number, sy: number, frame: number) {
  for (let y = 0; y < INLET; y++) for (let x = 0; x < INLET; x++) {
    // (x, y) measured from the corner; the arc's centre sits INLET pixels in from it
    const d = Math.hypot(INLET - x - 0.5, INLET - y - 0.5);
    if (d < INLET - 1) continue;
    const px = sx > 0 ? 15 - x : x, py = sy > 0 ? 15 - y : y;
    p.set(ox + px, oy + py, d < INLET ? C.waterEdge : d < INLET + 1 && sy < 0 ? C.foam : (x + y + frame) % 5 ? C.water : C.waterLight);
  }
}

/** Draws the terrain tile at (tx, ty) at (ox, oy); `at` reads the terrain around it (out of the map: forest). */
export function terrain(p: Pix, ox: number, oy: number, tx: number, ty: number, at: (x: number, y: number) => string, frame: number) {
  const hook = TERRAIN_HOOKS[theme];
  if (hook && hook(p, ox, oy, tx, ty, at, frame)) return;
  const c = at(tx, ty);
  if (c === FOREST && (theme === 'cave' || theme === 'indoor')) return wall(p, ox, oy, tx, ty, at);
  if (theme === 'hall' || theme === 'subway') {
    if (c === FOREST) return stationWall(p, ox, oy, tx, ty, at);
    if (c === TRACK_H) return trackH(p, ox, oy, tx, ty);
    if (c === EDGE) return platformEdge(p, ox, oy, tx, ty);
    if (c === PATH) return theme === 'subway' ? stairsUp(p, ox, oy) : mat(p, ox, oy);
    if (c === STAIRS) return stairs(p, ox, oy, theme !== 'subway');
    return stationFloor(p, ox, oy, tx, ty);
  }
  if (c === FOREST && (theme === 'city' || theme === 'oldtown')) return building(p, ox, oy, tx, ty, at);
  if ((c === PATH || c === ZEBRA) && (theme === 'city' || theme === 'oldtown')) {
    const road = (dx: number, dy: number) => { const o = at(tx + dx, ty + dy); return o === PATH || o === ZEBRA; };
    return street(p, ox, oy, tx, ty, road, c === ZEBRA);
  }
  if (c === ROCK && (theme === 'city' || theme === 'oldtown')) { grass(p, ox, oy, tx, ty); p.blit(PLANTER, ox, oy); return; }
  const same = (dx: number, dy: number) => {
    const o = at(tx + dx, ty + dy);
    if (c === PATH) return o === PATH;
    return o === c;
  };
  if (c === PATH) return path(p, ox, oy, tx, ty, same);
  if (c === TRACK) return track(p, ox, oy, tx, ty);
  if (c === WATER) { water(p, ox, oy, tx, ty, same, theme === 'snow' ? 0 : frame); if (theme === 'snow') iceMarks(p, ox, oy, tx, ty); return; }
  grass(p, ox, oy, tx, ty);
  const wet = (dx: number, dy: number) => at(tx + dx, ty + dy) === WATER;
  for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) if (wet(sx, 0) && wet(0, sy) && wet(sx, sy)) inlet(p, ox, oy, sx, sy, frame);
  if (c === TALL) return tallGrass(p, ox, oy, tx, ty, same);
  if (theme === 'beach' && (c === RED || c === YELLOW || c === WHITE)) return shells(p, ox, oy, c);
  if (theme === 'snow' && (c === RED || c === YELLOW || c === WHITE)) return snowTufts(p, ox, oy, tx, ty);
  if (c === RED) flowers(p, ox, oy, '#f0584c');
  if (c === YELLOW) flowers(p, ox, oy, '#ffd23c');
  if (c === WHITE) flowers(p, ox, oy, '#ffffff');
  if (c === ROCK) p.blit(theme === 'snow' ? SNOW_ROCK : theme === 'cave' ? CRYSTAL : ROCK_SPR, ox, oy);
  if (c === FENCE) fence(p, ox, oy, at(tx - 1, ty) === FENCE, at(tx + 1, ty) === FENCE);
}

/** Beach: a shell and a starfish instead of flowers. */
function shells(p: Pix, ox: number, oy: number, c: string) {
  const star = sprite({ o: c === RED ? '#f07a50' : '#f0a040', d: '#b8502a' }, ['..o..', '.ooo.', 'ooooo', '.o.o.', 'd...d']);
  const shell = sprite({ w: '#fff4ea', p: '#f4c0b0', d: '#c89080' }, ['.www.', 'wpwpw', 'wpwpw', '.ddd.']);
  if (c === WHITE) { p.blit(shell, ox + 4, oy + 5); p.blit(shell, ox + 10, oy + 10); }
  else p.blit(c === RED ? star : shell, ox + 5, oy + 5);
}

/** Snow: little frosty grass tips poking out. */
function snowTufts(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const g = hex('#8aa69a'), d = hex('#6a8a7c');
  for (let k = 0; k < 3; k++) {
    const x = 2 + Math.floor(hash(tx, ty, 400 + k) * 11), y = 4 + Math.floor(hash(tx, ty, 410 + k) * 9);
    p.set(ox + x, oy + y, d); p.set(ox + x + 1, oy + y - 1, g); p.set(ox + x + 2, oy + y, d); p.set(ox + x + 1, oy + y + 1, C.grassDark);
  }
}

const SNOW_ROCK = sprite({ k: '#3a4250', g: '#8a94a6', G: '#6a7488', s: '#ffffff', S: '#dfe8f4', h: '#3a4a6a40' }, [
  '................',
  '................',
  '................',
  '.....kkkkk......',
  '....ksssSSkk....',
  '...kssssSSSSk...',
  '..kSssssSSSSGk..',
  '..kgSSSSSGGGGk..',
  '.kggggggGGGGGGk.',
  '.kgggggGGGGGGGk.',
  '.kGgggGGGGGGGGk.',
  '.kGGGGGGGGGGGGk.',
  '..kGGGGGGGGGGk..',
  '...kkkkkkkkkk...',
  '...hhhhhhhhhh...',
  '................',
]);

const CRYSTAL = sprite({ k: '#1a3a5a', c: '#7ad0f0', C: '#4aa0d0', w: '#e8faff', s: '#00000055' }, [
  '................',
  '.......k........',
  '......kwk.......',
  '......kwck..k...',
  '...k..kwck.kwk..',
  '..kwk.kwCk.kck..',
  '..kwck.kwCkkcCk.',
  '..kwCk.kwCkkcCk.',
  '...kwCkkcCkkcCk.',
  '...kwCkkcCk.kCk.',
  '....kCkkcCk.kk..',
  '....kkkkcCk.....',
  '.......kkkk.....',
  '....ssssssss....',
  '................',
  '................',
]);

const ROCK_SPR = sprite({ k: '#4a4a52', g: '#9a9aa6', G: '#76768a', l: '#c8c8d4', s: '#1c3a1a55' }, [
  '................',
  '................',
  '................',
  '.....kkkkk......',
  '....klllggkk....',
  '...kllggggGGk...',
  '..klggggggGGGk..',
  '..klgggggGGGGk..',
  '.kggggggGGGGGGk.',
  '.kgggggGGGGGGGk.',
  '.kGgggGGGGGGGGk.',
  '.kGGGGGGGGGGGGk.',
  '..kGGGGGGGGGGk..',
  '...kkkkkkkkkk...',
  '...ssssssssss...',
  '................',
]);

function fence(p: Pix, ox: number, oy: number, left: boolean, right: boolean) {
  const k = hex('#5e3618'), w = hex('#c98a4b'), l = hex('#eab676'), d = hex('#9a6232');
  // rails
  for (const ry of [5, 10]) {
    const x0 = left ? 0 : 4, x1 = right ? 16 : 12;
    for (let x = x0; x < x1; x++) { p.set(ox + x, oy + ry - 1, k); p.set(ox + x, oy + ry, l); p.set(ox + x, oy + ry + 1, w); p.set(ox + x, oy + ry + 2, k); }
  }
  // post
  for (let y = 1; y < 15; y++) { p.set(ox + 5, oy + y, k); p.set(ox + 10, oy + y, k); for (let x = 6; x < 10; x++) p.set(ox + x, oy + y, x === 6 ? l : x === 9 ? d : w); }
  for (let x = 5; x < 11; x++) { p.set(ox + x, oy, k); p.set(ox + x, oy + 15, k); }
  for (let x = 5; x < 11; x++) p.set(ox + x, oy + 16, C.shadow);
}

// ---------------------------------------------------------------- trees

interface Blob { x: number; y: number; r: number; z?: number }

/**
 * A shaded canopy from overlapping spheres: each pixel takes the highest sphere above it, is lit from the top
 * left, gets a little noise for a leafy look, and is quantised to the tones (darkest first). Outlines go around the
 * whole canopy and between clumps.
 */
function canopy(p: Pix, ox: number, oy: number, w: number, h: number, blobs: Blob[], tones: number[], outline: number, seed: number) {
  const top = (x: number, y: number) => {
    let best = -1, bh = -Infinity, nx = 0, ny = 0, nz = 0;
    blobs.forEach((b, i) => {
      const dx = x + 0.5 - b.x, dy = y + 0.5 - b.y, d2 = dx * dx + dy * dy;
      if (d2 > b.r * b.r) return;
      const hz = Math.sqrt(b.r * b.r - d2) + (b.z || 0);
      if (hz > bh) { bh = hz; best = i; nx = dx / b.r; ny = dy / b.r; nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny)); }
    });
    return { i: best, nx, ny, nz };
  };
  const grid: ReturnType<typeof top>[] = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) grid.push(top(x, y));
  const at = (x: number, y: number) => (x < 0 || y < 0 || x >= w || y >= h ? -1 : grid[y * w + x].i);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const g = grid[y * w + x];
      if (g.i < 0) continue;
      const edge = at(x - 1, y) < 0 || at(x + 1, y) < 0 || at(x, y - 1) < 0 || at(x, y + 1) < 0;
      // a clump sitting in front of another gets a dark line along its lower edge
      const below = at(x, y + 1);
      const seam = below >= 0 && below !== g.i && (blobs[below].z || 0) < (blobs[g.i].z || 0) + 0.01 && grid[(y + 1) * w + x].ny < 0;
      if (edge) { p.set(ox + x, oy + y, outline); continue; }
      let lv = -0.5 * g.nx - 0.6 * g.ny + 0.62 * g.nz + (hash(x, y, seed) - 0.5) * 0.42;
      if (seam) lv -= 0.6;
      const k = lv < -0.05 ? 0 : lv < 0.3 ? 1 : lv < 0.6 ? 2 : 3;
      p.set(ox + x, oy + y, tones[Math.min(tones.length - 1, k)]);
    }
  }
}

interface Bark { out: number; dark: number; mid: number; light: number; mark?: number; birch?: boolean }

/**
 * A trunk from y0 down to y1 (where it stands), `w` wide, centred on cx(y) so it can lean or bend. Lit from the left,
 * with bark furrows (birch: dark marks on white), a shadow under the crown, and roots flaring out at the foot.
 */
function trunk(p: Pix, cx: (y: number) => number, y0: number, y1: number, w: number, b: Bark, seed: number) {
  for (let y = y0; y <= y1; y++) {
    const up = y1 - y;
    const flare = up < 3 ? 3 - up : 0;
    const c0 = cx(y);
    const l = Math.round(c0 - w / 2 - flare), r = Math.round(c0 + w / 2 + flare) - 1;
    for (let x = l; x <= r; x++) {
      const t = (x - l) / Math.max(1, r - l);
      let c = t < 0.28 ? b.light : t < 0.64 ? b.mid : b.dark;
      if (b.birch) {
        // horizontal black marks (lenticels), darker and denser towards the foot
        const band = hash(0, y, seed) < 0.3;
        if (band && hash(x - l, y, seed + 1) < 0.75 && t > 0.1) c = b.mark!;
        if (up < 4 && hash(x, y, seed + 2) < 0.5) c = b.mark!;
      } else if (t > 0.12 && t < 0.92 && hash(Math.round(x - c0), Math.floor((y - y0) / 3), seed) < 0.3) {
        c = t < 0.4 ? b.mid : b.dark; // vertical furrows
      }
      if (y < y0 + 2 && x !== l && x !== r) c = b.dark; // the crown's shadow
      if (x === l || x === r) c = b.out;
      if (y === y1 && (x === l + 1 || x === r - 1)) c = b.out; // root tips touching the ground
      p.set(x, y, c);
    }
  }
}

function shadowEllipse(p: Pix, cx: number, cy: number, rx: number, ry: number, c = hex('#1c3a1a55')) {
  for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) p.set(cx + x, cy + y, c);
}

/** Draws a dark outline around everything opaque in `src` and copies it onto p at (x, y). */
function outlined(p: Pix, src: Pix, x: number, y: number, color: number) {
  const o = new Pix(src.w, src.h);
  for (let yy = 0; yy < src.h; yy++) for (let xx = 0; xx < src.w; xx++) {
    if (src.get(xx, yy) & 255) continue;
    if ((src.get(xx - 1, yy) | src.get(xx + 1, yy) | src.get(xx, yy - 1) | src.get(xx, yy + 1)) & 255) o.set(xx, yy, color);
  }
  p.blit(o, x, y);
  p.blit(src, x, y);
}

const OAK: Bark = { out: hex('#2e1c0e'), dark: hex('#5a3820'), mid: hex('#7c5030'), light: hex('#a27248') };

/**
 * Forest trees: 32×44, standing on a 2×2 footprint. They are drawn overlapping and in depth order, so each tree's
 * crown covers the trunk of the one behind it (and a cat walking just above the forest edge).
 */
export const FOREST_TREES: Pix[] = [0, 1].map((v) => {
  const p = new Pix(32, 44);
  shadowEllipse(p, 16, 41, 12, 3);
  trunk(p, () => 16, 30, 42, 6, OAK, 3 + v);
  const tones = (v ? ['#2a7034', '#3a8c42', '#55aa52', '#7cc866'] : ['#2e7a3a', '#40984a', '#5cb65a', '#86d26e']).map(hex);
  canopy(p, 0, 0, 32, 36, [
    { x: 16, y: 9.5, r: 8.5, z: 0 }, { x: 9, y: 17, r: 8.5, z: 1 }, { x: 23, y: 17, r: 8.5, z: 1 },
    { x: 12, y: 25, r: 8.5, z: 2 }, { x: 21, y: 25, r: 8.5, z: 2 }, { x: 16, y: 21, r: 8, z: 3 },
  ], tones, hex('#153c1c'), 7 + v * 13);
  return p;
});
export const FOREST_TREE = FOREST_TREES[0];

export type TreeKind = 'birch' | 'willow' | 'pine' | 'oak';

/** A thin branch from (x0, y0) to (x1, y1), with a light upper side. */
function branch(p: Pix, x0: number, y0: number, x1: number, y1: number, c: number, light: number) {
  const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
  for (let i = 0; i <= n; i++) {
    const x = Math.round(x0 + ((x1 - x0) * i) / n), y = Math.round(y0 + ((y1 - y0) * i) / n);
    p.set(x, y, c);
    p.set(x, y - 1, light);
  }
}

/** The three special trees (3×3 tiles) the beaver quest is about: each has to look clearly different. */
export const BIG_TREES: Record<TreeKind, Pix> = {
  birch: (() => {
    const p = new Pix(48, 48);
    shadowEllipse(p, 24, 45, 12, 2);
    const bark: Bark = { out: hex('#46443e'), dark: hex('#bdbab0'), mid: hex('#e6e4dc'), light: hex('#ffffff'), mark: hex('#26262a'), birch: true };
    // an airy crown: small clumps with gaps, the back ones first
    const tones = ['#78a63a', '#98c64a', '#bade5e', '#dcf294'].map(hex);
    const out = hex('#3a5a1c');
    canopy(p, 0, 0, 48, 34, [
      { x: 24, y: 6.5, r: 6 }, { x: 13, y: 12, r: 6 }, { x: 35, y: 12, r: 6 }, { x: 7, y: 21, r: 5 }, { x: 41, y: 21, r: 5 },
    ], tones, out, 11);
    // slender bent trunk forking into thin branches that show between the clumps
    trunk(p, (y) => 24 + Math.sin((y - 18) / 9) * 0.8, 20, 45, 6, bark, 21);
    const tw = hex('#4a4640'), tl = hex('#f4f2ea');
    branch(p, 23, 24, 12, 15, tw, tl); branch(p, 25, 23, 36, 14, tw, tl); branch(p, 24, 21, 24, 8, tw, tl);
    branch(p, 21, 26, 7, 22, tw, tl); branch(p, 27, 26, 41, 22, tw, tl); branch(p, 20, 19, 17, 11, tw, tl); branch(p, 28, 19, 31, 11, tw, tl);
    canopy(p, 0, 0, 48, 34, [
      { x: 18, y: 13, r: 5, z: 2 }, { x: 30, y: 13, r: 5, z: 2 }, { x: 24, y: 10, r: 4.5, z: 3 }, { x: 12, y: 21, r: 4.5, z: 1 },
      { x: 36, y: 21, r: 4.5, z: 1 }, { x: 19, y: 22, r: 4, z: 2 }, { x: 30, y: 22, r: 4, z: 2 },
    ], tones, hex('#5a8a2e'), 17); // front clumps: a softer outline, so the crown reads as one
    return p;
  })(),
  willow: (() => {
    const p = new Pix(48, 48);
    shadowEllipse(p, 24, 45, 17, 2);
    const crown = new Pix(48, 30);
    canopy(crown, 0, 0, 48, 28, [
      { x: 24, y: 10, r: 10.5, z: 3 }, { x: 12, y: 15, r: 9 }, { x: 36, y: 15, r: 9 }, { x: 18, y: 19, r: 8, z: 1 }, { x: 30, y: 19, r: 8, z: 1 },
    ], ['#4f8a3a', '#6aa64a', '#8cc460', '#b6e084'].map(hex), hex('#24461a'), 13);
    const lowest = (x: number) => { for (let y = crown.h - 1; y >= 0; y--) if (crown.get(x, y) & 255) return y; return -1; };
    // a strand of leaves hanging from the crown's edge, swaying slightly, leaves sticking out every few pixels
    const strand = (x: number, len: number, tones: number[], tip: number) => {
      const y0 = lowest(x) - 3; // strands start inside the crown
      if (y0 < 0) return;
      const tone = tones[(x >> 1) % 2];
      for (let i = 0; i < len; i++) {
        const y = y0 + i;
        if (y > 44) break;
        const sx = x + (i > len * 0.6 ? Math.sign(x - 24) : 0); // tips curl out a little
        p.set(sx, y, tone);
        if (i % 4 === 2) p.set(sx + (x < 24 ? -1 : 1), y, tones[2]); // a leaf sticking out
        if (i === len - 1) p.set(sx, y + 1, tip);
      }
    };
    const back = [hex('#3c7230'), hex('#4a8236'), hex('#5f9a44')];
    for (let x = 6; x < 43; x += 2) strand(x, 14 + Math.floor(hash(x, 2, 5) * 10), back, hex('#24461a'));
    // a thick, bent trunk between the curtains
    trunk(p, (y) => 24 + (y - 44) * -0.12 + Math.sin(y / 4) * 0.6, 20, 45, 8,
      { out: hex('#2a1a0e'), dark: hex('#4e3a28'), mid: hex('#6e5640'), light: hex('#927a5c') }, 31);
    p.blit(crown, 0, 0);
    const front = [hex('#78b252'), hex('#8cc460'), hex('#c2e890')];
    for (let x = 3; x < 46; x += 2) {
      if (x > 15 && x < 33) continue; // the middle stays open so the trunk shows
      strand(x, 16 + Math.floor(hash(x, 1, 5) * 12), front, hex('#3c7230'));
    }
    return p;
  })(),
  oak: (() => {
    const p = new Pix(48, 48);
    shadowEllipse(p, 24, 45, 17, 2);
    trunk(p, (y) => 24 + Math.sin(y / 5) * 0.7, 26, 45, 9, OAK, 61);
    // two thick branches into a broad, dark crown
    branch(p, 21, 30, 13, 24, hex('#4a2e18'), hex('#7c5030')); branch(p, 27, 30, 35, 24, hex('#4a2e18'), hex('#7c5030'));
    canopy(p, 0, 0, 48, 34, [
      { x: 24, y: 10, r: 10, z: 2 }, { x: 11, y: 17, r: 9 }, { x: 37, y: 17, r: 9 }, { x: 17, y: 24, r: 7, z: 1 }, { x: 31, y: 24, r: 7, z: 1 }, { x: 24, y: 19, r: 8, z: 3 },
    ], ['#245e2c', '#33763a', '#4a904a', '#6aaa5a'].map(hex), hex('#122e16'), 63);
    return p;
  })(),
  pine: (() => {
    const p = new Pix(48, 48);
    shadowEllipse(p, 24, 45, 11, 2);
    trunk(p, () => 24, 36, 45, 5, OAK, 41);
    const L = new Pix(48, 40);
    const tones = ['#1a4e34', '#24663e', '#327e4c', '#4a9a5e', '#78c07e'].map(hex);
    // five tiers of drooping branches, widest at the bottom, each shading the top of the one below
    const tiers: [number, number, number][] = [[1, 10, 6], [6, 17, 10], [11, 24, 14], [17, 31, 17], [23, 38, 20]];
    for (const [top, bottom, half] of [...tiers].reverse()) {
      for (let y = top; y <= bottom; y++) {
        const f = (y - top) / (bottom - top);
        const hw = Math.round(half * Math.pow(f, 0.8));
        for (let x = 24 - hw; x <= 24 + hw; x++) {
          const side = (x - 24) / (half + 1);
          // ragged lower edge: needle tufts hang lower at regular intervals, more at the ends
          const tuft = (Math.abs(x - 24) % 4 < 2 ? 0 : 1) + (Math.abs(side) > 0.7 ? -1 : 0);
          if (y > bottom - tuft) continue;
          let lv = -side * 0.6 - f * 0.2 + (hash(x, y, 9) - 0.5) * 0.14;
          if (y > bottom - 2) lv -= 0.35; // dark underside
          // needle strokes running down and outwards
          if ((x * 2 + y * (x < 24 ? 1 : -1)) % 7 === 0 && f > 0.2) lv += 0.35;
          const k = lv < -0.45 ? 0 : lv < -0.15 ? 1 : lv < 0.15 ? 2 : lv < 0.4 ? 3 : 4;
          L.set(x, y, tones[k]);
        }
      }
    }
    outlined(p, L, 0, 0, hex('#0c2818'));
    return p;
  })(),
};

// ---------------------------------------------------------------- houses

export type Roof = 'red' | 'blue' | 'green' | 'snow';
const ROOFS: Record<Roof, [string, string, string, string]> = {
  red: ['#7a2a26', '#b8443a', '#de6450', '#f4927a'],
  blue: ['#24346e', '#3a58a8', '#5a80d0', '#8aaaf0'],
  green: ['#1e4a2a', '#2e7040', '#48924f', '#78b878'],
  snow: ['#8a9cba', '#c4d2e6', '#e2eaf6', '#ffffff'],
};

/** A 5×4-tile cottage; the door is in the middle of the bottom row. */
export function house(roof: Roof): Pix {
  const W = 80, H = 64;
  const p = new Pix(W, H);
  const [rk, rd, rm, rl] = ROOFS[roof].map(hex);
  const out = hex('#2a1e18');
  const wall = hex('#f6ecd0'), wallD = hex('#ddcfae'), beam = hex('#9a6a3e');
  // walls
  for (let y = 34; y < 62; y++) for (let x = 5; x < 75; x++) p.set(x, y, x === 5 || x === 74 ? out : y > 58 ? wallD : wall);
  for (let x = 5; x < 75; x++) p.set(x, 62, out);
  for (const bx of [6, 39, 73]) for (let y = 36; y < 59; y++) p.set(bx, y, beam);
  for (let x = 6; x < 74; x++) p.set(x, 46, beam);
  // windows
  for (const wx of [13, 54]) {
    for (let y = 40; y < 53; y++) for (let x = wx; x < wx + 13; x++) {
      const frame = y === 40 || y === 52 || x === wx || x === wx + 12;
      const bar = x === wx + 6 || y === 46;
      p.set(x, y, frame ? out : bar ? hex('#fff8e8') : y < 44 && x < wx + 5 ? hex('#d8f0ff') : hex('#78b8e8'));
    }
    for (let x = wx - 1; x < wx + 14; x++) p.set(x, 53, beam);
  }
  // door
  for (let y = 44; y < 63; y++) for (let x = 32; x < 48; x++) {
    const frame = x === 32 || x === 47 || y === 44;
    p.set(x, y, frame ? out : x === 33 || x === 46 ? hex('#6a3e1e') : (x - 33) % 4 === 0 ? hex('#8a5428') : hex('#a86a34'));
  }
  p.set(44, 54, hex('#f4d060')); p.set(44, 55, hex('#b08a30'));
  // roof: shingle rows, lighter at the top, with an overhang
  for (let y = 4; y < 36; y++) {
    const inset = Math.max(0, 4 - y);
    for (let x = 1 + inset; x < 79 - inset; x++) {
      const edge = x === 1 + inset || x === 78 - inset || y === 35 || y === 4;
      const row = Math.floor((y - 4) / 5);
      const seam = (y - 4) % 5 === 4 || (x + (row % 2) * 4) % 8 === 0 && (y - 4) % 5 !== 4;
      const tone = y < 10 ? rl : y < 22 ? rm : rd;
      p.set(x, y, edge ? out : seam ? rd : tone);
      if (y >= 33 && !edge) p.set(x, y, rk);
    }
  }
  for (let x = 6; x < 74; x++) p.set(x, 5, rl);
  // chimney
  for (let y = 0; y < 10; y++) for (let x = 58; x < 66; x++) p.set(x, y, x === 58 || x === 65 || y === 0 ? out : x < 61 ? hex('#c8b8a8') : hex('#a89888'));
  return p;
}

// ---------------------------------------------------------------- props

export const SIGN = sprite({ k: '#3a2210', w: '#c88a4a', l: '#eab676', d: '#9a6232', s: '#1c3a1a55' }, [
  '................',
  '................',
  '.kkkkkkkkkkkkkk.',
  '.kllllllllllllk.',
  '.klwdwwdwwwdwlk.',
  '.kwwwwwwwwwwwwk.',
  '.kwdwwwdwdwwwwk.',
  '.kwwwwwwwwwwwwk.',
  '.kddddddddddddk.',
  '.kkkkkkkkkkkkkk.',
  '......kwdk......',
  '......kwdk......',
  '......kwdk......',
  '......kwdk......',
  '.....skkkks.....',
  '................',
]);

/** The fallen trunk lying across the path (1×2 tiles, seen from above, cut end at the bottom). */
export const LOG = (() => {
  const p = new Pix(16, 32);
  const out = hex('#2e1a0c'), b1 = hex('#7a4a26'), b2 = hex('#9a6234'), b3 = hex('#b87c48');
  for (let y = 0; y < 32; y++) p.set(3, y, C.shadow);
  for (let y = 1; y < 27; y++) for (let x = 2; x < 14; x++) {
    const edge = x === 2 || x === 13 || y === 1;
    p.set(x, y, edge ? out : (x + Math.floor(y / 3)) % 5 === 0 ? b1 : x < 6 ? b3 : b2);
  }
  // cut end: rings
  const ring = [hex('#f0d29a'), hex('#d8b070'), hex('#c09058')];
  for (let y = 24; y < 32; y++) for (let x = 2; x < 14; x++) {
    const dx = (x + 0.5 - 8) / 6, dy = (y + 0.5 - 27.5) / 4;
    const d = dx * dx + dy * dy;
    if (d > 1) continue;
    p.set(x, y, d > 0.8 ? out : ring[Math.floor(d * 4) % 3]);
  }
  // a broken branch stump
  for (const [x, y] of [[13, 9], [14, 9], [15, 8], [14, 10], [15, 9]]) p.set(x, y, x === 15 ? out : b2);
  return p;
})();

export const LILY_PAD = sprite({ g: '#3f9e46', G: '#2b7a34', l: '#6cc864', k: '#1c4a22', p: '#f8b8d8' }, [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '....kkkk.kkk....',
  '..kkllgg.ggGkk..',
  '.klllggg.gggGGk.',
  '.klgggggggggGGk.',
  '.kgggggggggGGGk.',
  '..kGGGGGGGGGGk..',
  '...kkkkkkkkkk...',
  '................',
]);

// ---------------------------------------------------------------- characters

const CAT_PAL = { k: '#3a2418', o: '#f2a444', O: '#cf7424', w: '#fff2dc', p: '#f2a0a0', e: '#201810', W: '#ffffff', b: '#3c6cd8', B: '#25459c' };

const CAT_HEAD_DOWN = [
  '................',
  '...kk......kk...',
  '..kpok....kopk..',
  '..koookkkkoook..',
  '.koooOoOOoOoook.',
  '.kooooooooooook.',
  '.kooeWooooeWook.',
  '.kooeeooooeeook.',
  '.kowwwoppowwwok.',
  '..kwwwwkkwwwwk..',
  '...kbbbbbbbbk...',
  '..koowbBBbwook..',
  '..kooowwwwoook..',
  '..koOowwwwoOok..',
];
const CAT_HEAD_UP = [
  '................',
  '...kk......kk...',
  '..kook....kook..',
  '..koookkkkoook..',
  '.kooOooOOooOook.',
  '.koooOooooOoook.',
  '.kooOooOOooOook.',
  '.kooooooooooook.',
  '..kooOooooOook..',
  '...kooooooook...',
  '...kbbbbbbbbk...',
  '..kobBbbbbBbok..',
  '..kooooooooook..',
  '..koOooOOooOok..',
];
const CAT_SIDE = [
  '................',
  '.........k..k...',
  '........kpkkpk..',
  '........kookook.',
  '.......kooOoOook',
  '.k.....koooooeWk',
  'kOk....kooooooek',
  'kOk....kwwoooopk',
  '.kOk....kwwwwkk.',
  '..kOkkkkkbbbbk..',
  '..koooOOoobbbk..',
  '..kooooooooook..',
  '..koOooOoooook..',
];

type Dir = 'down' | 'up' | 'left' | 'right';
export type { Dir };

function catFrames(head: string[], feet: string, legs: [string, string][]): Pix[] {
  return legs.map(([a, b]) => sprite(CAT_PAL, [...head, a.replace(/w/g, feet), b]));
}

/** Cat frames per direction: [standing, step 1, step 2]. Left is the right-facing sprite mirrored at draw time. */
export const CAT: Record<'down' | 'up' | 'side', Pix[]> = {
  down: catFrames(CAT_HEAD_DOWN, 'w', [
    ['..kwwk....kwwk..', '...kk......kk...'],
    ['..kwwk.....kk...', '...kk...........'],
    ['...kk.....kwwk..', '...........kk...'],
  ]),
  up: catFrames(CAT_HEAD_UP, 'o', [
    ['..kwwk....kwwk..', '...kk......kk...'],
    ['..kwwk.....kk...', '...kk...........'],
    ['...kk.....kwwk..', '...........kk...'],
  ]),
  side: [
    ['...kwk....kwk...', '...kk.....kk....'],
    ['..kwk......kwk..', '..kk.......kk...'],
    ['....kwk..kwk....', '....kk...kk.....'],
  ].map(([a, b]) => sprite(CAT_PAL, ['................', ...CAT_SIDE, a, b])),
};

export type NpcKind = 'tortoise' | 'beaver' | 'frog' | 'bird' | 'owl' | 'penguin' | 'bat' | 'walrus' | 'crab'
  | 'hedgehog' | 'deer' | 'dog' | 'fox' | 'mouse' | 'badger' | 'goose' | 'rabbit' | 'squirrel'
  | 'arcticfox' | 'reindeer' | 'polarbear' | 'husky' | 'seal' | 'raccoon'
  | 'pigeon' | 'seagull' | 'sloth' | 'parrot' | 'flamingo' | 'poodle' | 'kangaroo' | 'stork' | 'pig'
  /** animals added by the countries in countries/ (they add their sprite to NPCS) */
  | (string & {});

export const NPCS: Record<NpcKind, Pix> = {
  tortoise: sprite({ k: '#24341c', s: '#8a6a3a', S: '#5e4626', h: '#c09a5e', g: '#8cc070', G: '#5e9448', e: '#101010', W: '#ffffff' }, [
    '................',
    '................',
    '......kkkk......',
    '.....kggggk.....',
    '.....keggek.....',
    '.....kgWWgk.....',
    '...kkkGWWGkkk...',
    '..khhssSSsshhk..',
    '.khsSssssssSshk.',
    'kgkssShhhhSsskgk',
    'kGksSssssssSskGk',
    '.kkSssSSSSssSkk.',
    '..kSSSSSSSSSSk..',
    '..kgGkkkkkkGgk..',
    '..kkk......kkk..',
    '................',
  ]),
  beaver: sprite({ k: '#2e1a0e', b: '#a0663a', l: '#d8aa78', n: '#3a2010', W: '#ffffff', e: '#100800', T: '#4e4038' }, [
    '................',
    '....kbk..kbk....',
    '....kbbkkbbk....',
    '...kbbbbbbbbk...',
    '...kbebbbbebk...',
    '...kbllnnllbk...',
    '...kbllWWllbk...',
    '....kblWWlbk....',
    '...kbbkkkkbbk...',
    '..kbbbllllbbbk..',
    '.kbkbllllllbkbk.',
    '.kbkbllllllbkbk.',
    '..kbbllllllbbk..',
    '..kbbbbbbbbbbkTk',
    '..kkbbkkkkbbkkTk',
    '...kkk....kkkkk.',
  ]),
  frog: sprite({ k: '#1e3a14', g: '#6cc04a', G: '#3f8a32', l: '#d8f0a0', e: '#101010', W: '#ffffff' }, [
    '................',
    '................',
    '................',
    '...kkk....kkk...',
    '..kWWek..kWWek..',
    '..kWeek..kWeek..',
    '..kgkkggggkkgk..',
    '.kggggggggggggk.',
    '.kgGkkkkkkkkGgk.',
    '.kggGGGGGGGGggk.',
    '..kgllllllllgk..',
    '.kggllllllllggk.',
    'kGgkgllllllgkgGk',
    'kkkk.kkkkkk.kkkk',
    '................',
    '................',
  ]),
  owl: sprite({ k: '#2a1c10', b: '#9a6a3a', B: '#6a4424', l: '#ecd6a8', W: '#fff4d8', e: '#101010', o: '#f0a030' }, [
    '................',
    '...k........k...',
    '...kk......kk...',
    '...kbkkkkkkbk...',
    '..kbbbbbbbbbbk..',
    '..kbWWbbbbWWbk..',
    '..kWeWbbbbWeWk..',
    '..kbWWboobWWbk..',
    '..kBbllllllbBk..',
    '..kBllBllBllBk..',
    '..kBlllllllBBk..',
    '..kBBllBllBBBk..',
    '..kBBBllllBBBk..',
    '...kBBBBBBBBk...',
    '....kokkkkok....',
    '................',
  ]),
  penguin: sprite({ k: '#14141e', b: '#2a2e48', w: '#f4f6fa', o: '#f0a020', e: '#101010', s: '#d84040' }, [
    '................',
    '.....kkkkkk.....',
    '....kbbbbbbk....',
    '...kbbwbbwbbk...',
    '...kbwewwewbk...',
    '...kbwwoowwbk...',
    '...kbbwwwwbbk...',
    '..kssssssssssk..',
    '..kbswwwwwwbbk..',
    '.kbbkwwwwwwkbbk.',
    '.kbkbwwwwwwbkbk.',
    '..kkbwwwwwwbkk..',
    '...kbwwwwwwbk...',
    '...kbbwwwwbbk...',
    '...koookkoook...',
    '................',
  ]),
  bat: sprite({ k: '#1a1220', b: '#5a4a6a', m: '#7a6a8a', W: '#ffffff', e: '#101010' }, [
    '................',
    '................',
    '................',
    '......k..k......',
    '.....kbkkbk.....',
    'kk..kbbbbbbk..kk',
    'kmk.kbWbbWbk.kmk',
    'kmmkkbebbebkkmmk',
    'kmmmkbbWWbbkmmmk',
    '.kmmmkbbbbkmmmk.',
    '..kmmkkbbkkmmk..',
    '...kkk.kk.kkk...',
    '................',
    '................',
    '................',
    '................',
  ]),
  walrus: sprite({ k: '#2a1a10', b: '#b08070', B: '#8a5e4e', l: '#e0bca4', n: '#3a2018', W: '#ffffff', e: '#101010', c: '#2a4a8a' }, [
    '................',
    '.....kkkkkk.....',
    '....kcccccck....',
    '...kkkkkkkkkk...',
    '...kbebbbbebk...',
    '...kbbbnnbbbk...',
    '..kbllllllllbk..',
    '..kblllkklllbk..',
    '..kbbWkbbkWbbk..',
    '.kbbbWbbbbWbbbk.',
    '.kbbbWbbbbWbbbk.',
    'kbbbbbbbbbbbbbbk',
    'kbBbbbbbbbbbbBbk',
    'kBBbbbbbbbbbbBBk',
    '.kkkkkkkkkkkkkk.',
    '................',
  ]),
  crab: sprite({ k: '#3a0e08', r: '#e04a3a', R: '#b03024', W: '#ffffff', e: '#101010' }, [
    '................',
    '................',
    '................',
    '..kk........kk..',
    '.krrk......krrk.',
    '.krkrk....krkrk.',
    '..krk.k..k.krk..',
    '...kk.We.We.kk..',
    '....kkrrrrrkk...',
    '...krrrrrrrrrk..',
    '..krrRrrrrrRrrk.',
    '..kRRRRRRRRRRRk.',
    '..k.k.k...k.k.k.',
    '.k.k.k.....k.k.k',
    '................',
    '................',
  ]),
  hedgehog: sprite({ k: '#2a1a10', s: '#6a4a2e', S: '#8a6440', f: '#e8c8a0', e: '#101010', n: '#3a2018', a: '#f0e8d8' }, [
    '................',
    '....k.k.k.k.....',
    '...kSksksksk....',
    '..kSsSsSsSsSk...',
    '.kSsSsSsSsSsSk..',
    '.ksSsSsSsSsSsk..',
    'kSsSsSkkkkkSsSk.',
    'ksSsSkffffffksk.',
    'kSsSkfefffeffkk.',
    '.kskffffffffffnk',
    '.kSkfffaaaaffkk.',
    '..kkffaaaaaafk..',
    '...kffaaaaaafk..',
    '...kkffffffkk...',
    '...kfk....kfk...',
    '...kk......kk...',
  ]),
  deer: sprite({ k: '#2a1a0e', b: '#b87a42', B: '#8a5a2e', l: '#f0dcb8', w: '#ffffff', e: '#101010', n: '#2a1a10', h: '#d8c0a0' }, [
    '..h........h....',
    '..hh......hh....',
    '...hh.kk.hh.....',
    '....kbbbbk......',
    '...kbebbebk.....',
    '..kkbbbbbbkk....',
    '.kbk.blllb.kbk..',
    '.....klnlk......',
    '.....kbbbk......',
    '....kbwbbbk.....',
    '...kbbbwbbbk....',
    '...kbbbbbbwk....',
    '...kBbbbbbbk....',
    '....kBkkkBk.....',
    '....kbk.kbk.....',
    '....kk...kk.....',
  ]),
  dog: sprite({ k: '#2a1a10', b: '#c89050', B: '#9a6a34', l: '#f4e0c0', e: '#101010', n: '#1a1010', r: '#d83a30', c: '#2a4a8a', y: '#f4d860' }, [
    '.....kkkkkk.....',
    '....kccccccк....'.replace('к', 'k'),
    '...kkkkykkkkk...',
    '..kBkbbbbbbkBk..',
    '..kBkbebbebkBk..',
    '..kBkbbllbbkBk..',
    '...kkblnnlbkk...',
    '.....kllllk.....',
    '....krrrrrrk....',
    '...kbbbllbbbk...',
    '..kbbbllllbbbk..',
    '..kbkbllllbkbk..',
    '...kkbbbbbbkk...',
    '....kbbkkbbk....',
    '....kllk.kllk...',
    '....kkk..kkk....',
  ]),
  fox: sprite({ k: '#2a120a', o: '#e07830', O: '#b05820', w: '#fff4e8', e: '#101010', n: '#1a1010', g: '#3a8a5a' }, [
    '..kk......kk....',
    '..kok....kok....',
    '..kwok..kowk....',
    '..kooookoooo k..'.replace(' ', '').replace('..kooookoooo', '..kooookooook').slice(0, 16),
    '.koeoooooeook...',
    '.kowwoooowwok...',
    '..kwwwnnwwwk....',
    '...kkwwwwkk.....',
    '....kggggk......',
    '...kooggook.....',
    '..kooowwooo k...'.replace(' ', '').slice(0, 15) + '.',
    '..kooowwoook....',
    '...kooooook.kk..',
    '...kOkkkkOk.kok.',
    '...kok..kok.kwk.',
    '...kk....kk..k..',
  ]),
  mouse: sprite({ k: '#2a1a1a', g: '#a8a0a8', G: '#7a7280', p: '#f0a0b0', e: '#101010', w: '#ffffff', a: '#f0e8d0', A: '#c8b898' }, [
    '................',
    '..kkk....kkk....',
    '.kpppk..kpppk...',
    '.kpgpk..kpgpk...',
    '..kggkkkkggk....',
    '...kggggggk.....',
    '...kgeggegk.....',
    '...kggppggk.....',
    '....kgwwgk......',
    '...kaaaaaak.....',
    '..kAaaaaaaAk....',
    '..kgAaaaaAgk....',
    '...kAaaaaAk..k..',
    '...kaaaaaak.kGk.',
    '....kgkkgk..kk..',
    '....kk..kk......',
  ]),
  badger: sprite({ k: '#1a1a1a', g: '#8a8a90', G: '#5a5a62', w: '#ffffff', b: '#2a2a2e', e: '#101010', n: '#1a1010', a: '#fffaf0', A: '#d8d0c0' }, [
    '.....kkkkkk.....',
    '....kaaaaaak....',
    '...kAaaaaaaAk...',
    '...kkkkkkkkkk...',
    '..kgwbwwwwbwgk..',
    '..kgbebwwbebgk..',
    '..kgbbwwwwbbgk..',
    '...kgwwnnwwgk...',
    '....kkwwwwkk....',
    '...kaaaaaaaak...',
    '..kgaaaaaaaagk..',
    '..kGkaaaaaakGk..',
    '...kgaaaaaagk...',
    '...kggggggggk...',
    '...kbbk..kbbk...',
    '...kkk....kkk...',
  ]),
  goose: sprite({ k: '#2a2a2a', w: '#ffffff', W: '#d8dce4', o: '#f0a030', e: '#101010', h: '#d84a8a', H: '#a83068' }, [
    '.....hhhh.......',
    '....hHHHHh......',
    '....kwwwwk......',
    '....kwewwk......',
    '....kwwwwkoo....',
    '.....kwwkooo....',
    '.....kwwk.......',
    '.....kwwk.......',
    '....kwwwwk......',
    '...kwwwwwwkk....',
    '..kWwwwwwwwwk...',
    '.kWWwwwwwwwwk...',
    '.kWWWwwwwwwWk...',
    '..kkWWWWWWWk....',
    '....koook.......',
    '....kk.kk.......',
  ]),
  rabbit: sprite({ k: '#2a2020', g: '#d8c8b8', G: '#a89888', p: '#f0a0b0', e: '#101010', w: '#ffffff', c: '#4a8ad8', C: '#2a5aa8' }, [
    '...kk...kk......',
    '..kgpk.kpgk.....',
    '..kgpk.kpgk.....',
    '..kgpk.kpgk.....',
    '...kgkkkgk......',
    '..kggggggggk....',
    '..kgegggeggk....',
    '..kggwppwggk....',
    '...kgwwwwgk.....',
    '...kccccccck....',
    '..kcCccccCcck...',
    '..kgCccccCcgk...',
    '...kCccccCck....',
    '...kccccccck....',
    '...kgk...kgk....',
    '...kk.....kk....',
  ]),
  squirrel: sprite({ k: '#2a1408', r: '#c8682a', R: '#9a4a1a', l: '#f4d8b0', e: '#101010', n: '#2a1010' }, [
    '..k..k..........',
    '.krkkrk.........',
    '.krrrrk..kkkk...',
    '.kerrek.kRRRRk..',
    '.krnnrk.kRrrrRk.',
    '..klllk.kRrrrrk.',
    '..krllrkkRrrrrk.',
    '.krrllrrkRrrrk..',
    '.krrllrrkRrrk...',
    '.krrllrrRrrk....',
    '..krllrrrrk.....',
    '..krrrrrrk......',
    '..kRrkkrRk......',
    '..kRk..kRk......',
    '..kk....kk......',
    '................',
  ]),
  arcticfox: sprite({ k: '#2a3040', w: '#ffffff', W: '#d8e0ec', e: '#101010', n: '#2a2a2a', b: '#3a6ab8', y: '#f4d860' }, [
    '..kk......kk....',
    '..kwk....kwk....',
    '..kWwk..kwWk....',
    '..kwwwkkwwwk....',
    '.kwewwwwwewk....',
    '.kwwwwwwwwwk....',
    '..kwwwnnwwk.....',
    '...kkwwwwkk.....',
    '...kbbbbbbk.....',
    '..kbbbybbbbk....',
    '..kWbbbbbbWk.kk.',
    '..kwbbbbbbwk.kwk',
    '...kbbbbbbk.kwk.',
    '...kWkkkkWk.kWk.',
    '...kwk..kwk..k..',
    '...kk....kk.....',
  ]),
  reindeer: sprite({ k: '#2a1a0e', b: '#8a6040', B: '#6a4428', l: '#e8d4b8', e: '#101010', r: '#d83a30', h: '#c8b090', a: '#f4f0e4', g: '#2e8a40' }, [
    'h.h........h.h..',
    '.hh.h....h.hh...',
    '..hhh.kk.hhh....',
    '....kbbbbk......',
    '...kbebbebk.....',
    '...kbbbbbbk.....',
    '....kbllbk......',
    '....klrrlk......',
    '...kaaaaaak.....',
    '..kaggaaggak....',
    '..kagaaaagak....',
    '..kaaaaaaaak....',
    '...kaaaaaak.....',
    '...kBkkkkBk.....',
    '...kbk..kbk.....',
    '...kk....kk.....',
  ]),
  polarbear: sprite({ k: '#3a4050', w: '#ffffff', W: '#dfe6f0', e: '#101010', n: '#1a1a1a', o: '#f08a20', O: '#c86a10' }, [
    '...kk....kk.....',
    '..kWwk..kwWk....',
    '..kwwwkkwwwk....',
    '.kwwwwwwwwwwk...',
    '.kwwewwwwewwk...',
    '.kwwwwnnwwwwk...',
    '..kwwwnnwwwk....',
    '...kkwwwwkk.....',
    '..kooooooook....',
    '.kOoowwwwooOk...',
    '.kwooowwoooowk..',
    '.kwOooooooOwk...',
    '..kOooooooOk....',
    '..kWWwkkwWWk....',
    '..kwwk..kwwk....',
    '..kkk....kkk....',
  ]),
  husky: sprite({ k: '#1a1e28', g: '#5a6272', G: '#3a4252', w: '#ffffff', b: '#5aa0e8', e: '#101010', n: '#1a1a1a', r: '#d83a30' }, [
    '..kk......kk....',
    '..kgk....kgk....',
    '..kggkkkkggk....',
    '.kggggwwggggk...',
    '.kgwbwwwwbwgk...',
    '.kgwewwwwewgk...',
    '..kwwwnnwwwk....',
    '...kwwwwwwk.....',
    '...krrrrrrk.....',
    '..kgggwwgggk....',
    '..kgggwwgggk.kk.',
    '..kGgwwwwgGk.kgk',
    '...kgwwwwgk.kgk.',
    '...kGkkkkGk.kwk.',
    '...kwk..kwk..k..',
    '...kk....kk.....',
  ]),
  seal: sprite({ k: '#1e2a36', g: '#7a8a9a', G: '#5a6a7a', l: '#b8c4d0', e: '#101010', n: '#1a1a1a', w: '#ffffff', r: '#d83a30' }, [
    '................',
    '................',
    '.....kkkkk......',
    '....kggggggk....',
    '...kgegggeggk...',
    '...kggglnlggk...',
    '...kgg.www.gk...'.replace(/\./g, 'g').replace('kgggg', 'k.ggg').slice(0, 16),
    '....kgggggk.....',
    '...kgrrrrrgk....',
    '..kgglllllggk...',
    '..kglllllllgk...',
    '.kGglllllllgGk..',
    '.kGGglllllgGGk..',
    '..kkGGGGGGGkk...',
    '..kGk.....kGk...',
    '...k.......k....',
  ]),
  raccoon: sprite({ k: '#1a1a1e', g: '#8a8a92', G: '#5e5e66', w: '#ffffff', b: '#2a2a30', e: '#f4f4f4', n: '#1a1a1a', c: '#2a4a8a', C: '#1a3470', y: '#f4d860' }, [
    '.....kkkkkk.....',
    '....kcccccck....',
    '...kkkkykkkkk...',
    '..kgkggggggkgk..',
    '..kgbbbggbbbgk..',
    '..kgbebggbebgk..',
    '...kgwwnnwwgk...',
    '....kkwwwwkk....',
    '...kccccccccк...'.replace('к', 'k'),
    '..kcCcyccycCck..',
    '..kgCccccccCgk..',
    '...kcccccccck...',
    '...kCcccccccCk..'.slice(0, 16),
    '...kgkkkkkkgk...',
    '...kbk....kbk...',
    '...kk......kk...',
  ]),
  pigeon: sprite({ k: '#1e2430', g: '#8a92a6', G: '#6a7286', p: '#9a6ab0', P: '#3a9a8a', o: '#f0a030', e: '#f08a30', w: '#ffffff', r: '#d83a30' }, [
    '................',
    '................',
    '......kkkk......',
    '.....kggggk.....',
    '....kgewgggk....',
    '....kggggggkoo..',
    '.....kpPpPk.....',
    '....kpPpPpPk....',
    '...kggggggggk...',
    '..kGggggggggGk..',
    '.kGGgggggggGGk..',
    '.kGGGggggggGGk..',
    '..kkGGGGGGGkk...',
    '....krk.krk.....',
    '....kk..kk......',
    '................',
  ]),
  seagull: sprite({ k: '#2a2a32', w: '#ffffff', W: '#d8dce4', g: '#9aa2b0', y: '#f4c030', r: '#d83a30', e: '#101010' }, [
    '................',
    '.....kkkk.......',
    '....kwwwwk......',
    '....kwewwkyyy...',
    '....kwwwwkyrk...',
    '.....kwwk.kk....',
    '....kwwwwk......',
    '..kkwwwwwwkkk...',
    '.kgggwwwwwgggk..',
    'kggggwwwwwggggk.',
    '.kkggWWWWWggkk..',
    '...kkWWWWWkk....',
    '.....kyyyk......',
    '.....ky.yk......',
    '.....kk.kk......',
    '................',
  ]),
  sloth: sprite({ k: '#2a1e14', b: '#a08a6a', B: '#7a6648', l: '#e0d0b0', d: '#4a3a28', e: '#101010', n: '#1a1210', g: '#2e7a5a' }, [
    '................',
    '.....kkkkkk.....',
    '....kbbbbbbk....',
    '...kbllllllbk...',
    '...kldddddddk...',
    '...kldelledlk...',
    '...kllllnlllk...',
    '....klllllk.....',
    '...kbbggggbbk...',
    '..kbbbggggbbbk..',
    '.kbBbbggggbbBbk.',
    '.kbk.bbbbbb.kbk.',
    '.kk..kbbbbk..kk.',
    '.....kBbbBk.....',
    '.....kbkkbk.....',
    '.....kk..kk.....',
  ]),
  parrot: sprite({ k: '#1a1a22', r: '#e03a30', R: '#a82820', y: '#f4d040', b: '#3a78d8', g: '#3aa848', w: '#ffffff', e: '#101010', o: '#3a3a3a' }, [
    '................',
    '......kkkk......',
    '.....krrrrk.....',
    '....krrwerrk....',
    '....krrrrrkoo...',
    '....krrrrrkok...',
    '.....krrrk......',
    '....krrrrrk.....',
    '...kryyyyyrk....',
    '...kyyyyyyyk....',
    '...kbbbbbbbk....',
    '...kgbbbbbgk....',
    '....kbbbbbk.....',
    '.....kbbbk......',
    '.....kbkbk......',
    '.....k...k......',
  ]),
  flamingo: sprite({ k: '#3a1a28', p: '#f490b0', P: '#d8708e', b: '#1a1a1a', w: '#ffffff', e: '#101010', c: '#2a4a8a', y: '#f4d860' }, [
    '......kkkk......',
    '.....kcccck.....',
    '....kkkkykkk....',
    '.....kppppk.....',
    '.....kpewpk.....',
    '.....kppppkbb...',
    '......kppkbb....',
    '......kpk.......',
    '.....kpppk......',
    '...kkppppppk....',
    '..kPppppppppk...',
    '..kPPpppppppk...',
    '...kkPPPPPkk....',
    '......kpk.......',
    '......kpk.......',
    '.....kkpkk......',
  ]),
  poodle: sprite({ k: '#2a2a2e', w: '#ffffff', W: '#e0e0e8', e: '#101010', n: '#1a1a1a', r: '#d83a30', a: '#2a2a30' }, [
    '.....kkkkk......',
    '....kWwwwWk.....',
    '...kWwwwwwWk....',
    '..kWwkwwwkwWk...',
    '..kWwwewewwWk...',
    '..kWwwwnwwwWk...',
    '...kWwwwwwWk....',
    '....kkrrrkk.....',
    '...kaaaaaaak....',
    '..kWaaawaaaWk...',
    '..kWaaaaaaaWk...',
    '...kaaaaaaak....',
    '...kWkkkkkWk....',
    '...kwk...kwk....',
    '..kWWk...kWWk...',
    '..kkk.....kkk...',
  ]),
  kangaroo: sprite({ k: '#2a1a0e', b: '#c88a52', B: '#9a6634', l: '#f0d4a8', e: '#101010', n: '#1a1010', c: '#d8a020', C: '#a87810' }, [
    '...kk....kk.....',
    '...kbk..kbk.....',
    '...kbbkkbbk.....',
    '..kbbbbbbbbk....',
    '..kbebbbbebk....',
    '..kbbbllbbbk....',
    '...kblnnlbk.....',
    '....kkllkk......',
    '...kccccccck....',
    '..kcCcclccCck...',
    '..kbccllllcbk...',
    '...kbllllllbk...',
    '...kBbbbbbbBk.kk',
    '...kbbkkkbbkkbbk',
    '..kbbk...kbbbbk.',
    '..kkkk....kkkk..',
  ]),
  stork: sprite({ k: '#1a1a22', w: '#ffffff', W: '#d8dce4', b: '#1a1a1e', o: '#e8602a', e: '#101010', g: '#3a3a42' }, [
    '......kkk.......',
    '.....kwwwk......',
    '.....kwewkooo...',
    '.....kwwwkooook.',
    '......kwk..kk...',
    '......kwk.......',
    '.....kwwwk......',
    '....kwwwwwk.....',
    '...kWwwwwwwk....',
    '..kbbWwwwwWbk...',
    '..kbbbWWWWbbk...',
    '...kbbbbbbbk....',
    '....kkkkkkk.....',
    '......kok.......',
    '......kok.......',
    '.....kkokk......',
  ]),
  pig: sprite({ k: '#3a1a1a', p: '#f4b0b8', P: '#d88a94', n: '#e8909a', e: '#101010', w: '#ffffff', a: '#ffffff', A: '#d8dce4', r: '#d83a30' }, [
    '................',
    '...kk......kk...',
    '..kPpk....kpPk..',
    '..kppkkkkkkppk..',
    '..kppppppppppk..',
    '..kpepppppepk...',
    '..kpppnnnnpppk..',
    '...kppnknkppk...',
    '....kkppppkk....',
    '...kaaaaaaaak...',
    '..kpaaraaraapk..',
    '..kpaaaaaaaapk..',
    '...kAaaaaaaAk...',
    '...kpkkkkkkpk...',
    '...kPk....kPk...',
    '...kk......kk...',
  ]),
  bird: sprite({ k: '#1a2a40', b: '#4a8ae0', B: '#2e5eb0', l: '#f8f0d8', o: '#f0a030', e: '#101010' }, [
    '................',
    '................',
    '................',
    '................',
    '......kkkk......',
    '.....kbbbbk.....',
    '....kbbebbbk....',
    '....kbbbbbbook..',
    '...kBbllllbkk...',
    '.kkBBbllllbk....',
    'kBBBBblllbbk....',
    '.kk.kBbbbbbk....',
    '.....kkokokk....',
    '................',
    '................',
    '................',
  ]),
};

// ---------------------------------------------------------------- items

export type ItemKind = 'twig_birch' | 'twig_willow' | 'twig_pine' | 'shovel'
  | 'mushroom_red' | 'mushroom_brown' | 'mushroom_yellow' | 'guestcard' | 'bread'
  | 'suitcase_ry' | 'suitcase_rb' | 'suitcase_by' | 'postcard' | 'acorn' | 'hat' | 'scarf' | 'souvenir'
  | 'fishroll' | 'parcel' | 'daypass' | 'pc_forest' | 'pc_ice' | 'pc_metro' | 'pc_beach'
  /** items added by the countries in countries/ (they add their icon to ITEMS) */
  | (string & {});

function twig(leaf: (p: Pix, x: number, y: number, k: number) => void): Pix {
  const p = new Pix(16, 16);
  const bark = hex('#7a4a26'), barkL = hex('#a86c3a');
  for (let k = 0; k < 11; k++) { p.set(3 + k, 13 - k, bark); p.set(4 + k, 13 - k, barkL); }
  for (let k = 2; k < 11; k += 3) leaf(p, 3 + k, 13 - k, k);
  return p;
}

const mushroom = (cap: string, capD: string, dots: boolean, stem = '#f4ecdc') => {
  const p = sprite({ c: cap, C: capD, w: '#ffffff', s: stem, S: '#c8bca8', k: '#2a1a10' }, [
    '................',
    '................',
    '................',
    '.....kkkkkk.....',
    '...kkccccccckk..',
    '..kccwcccccwcck.',
    '.kcccccccwccccck',
    '.kcwccccccccwcck',
    '.kCCCCCCCCCCCCCk',
    '..kkkkssssskkk..',
    '......kssSk.....',
    '......ksssSk....',
    '......ksssSk....',
    '.....kssssSSk...',
    '.....kkkkkkkk...',
    '................',
  ].map((r) => (dots ? r : r.replace(/w/g, 'c'))));
  return p;
};
const suitcase = (body: string, bodyD: string, band: string) => sprite({ b: body, B: bodyD, y: band, k: '#2a1a10', h: '#5a4a3a' }, [
  '................',
  '................',
  '.....kkkkkk.....',
  '.....kh..hk.....',
  '..kkkkkkkkkkkk..',
  '..kbbbbyybbbbk..',
  '..kbbbbyybbbbk..',
  '..kbbbbyybbbbk..',
  '..kyyyyyyyyyyk..',
  '..kbbbbyybbbbk..',
  '..kbbbbyybbbbk..',
  '..kBBBByyBBBBk..',
  '..kkkkkkkkkkkk..',
  '...kk......kk...',
  '................',
  '................',
]);

const card = (sky: string, ground: string, mark: string) => sprite({ k: '#2a2a2a', s: sky, g: ground, m: mark, w: '#fffaf0', r: '#d83a30' }, [
  '................', '................', '................', '.kkkkkkkkkkkkkk.', '.kssssssssskrrk.', '.ksssmssssskrrk.', '.kssmmmssssskkk.', '.ksmmmmmsssskwk.',
  '.kgggggggggkwwk.', '.kgggggggggkwwk.', '.kgggggggggwwwk.', '.kkkkkkkkkkkkkk.', '................', '................', '................', '................',
]);

export const ITEMS: Record<ItemKind, Pix> = {
  fishroll: sprite({ k: '#3a2410', b: '#e8b060', B: '#c88a42', f: '#c8d4e0', F: '#9aa8b8', g: '#5cb85a', r: '#d83a30' }, [
    '................', '................', '................', '................', '...kkkkkkkkkk...', '..kbbbbbbbbbbk..', '..kbBbbbBbbbbk..',
    '.kggrgrgrggrgrk.', '.kffFffFffFfffk.', '.kfffffffffffFk.', '..kbbbbbbbbbbk..', '..kBBBBBBBBBBk..', '...kkkkkkkkkk...', '................', '................', '................',
  ]),
  parcel: sprite({ k: '#3a2410', b: '#c89a62', B: '#a07a48', t: '#f4e8c8', r: '#d83a30' }, [
    '................', '................', '................', '..kkkkkkkkkkkk..', '..kbbbbttbbbbk..', '..kbbbbttbbbbk..', '..kttttttttttk..',
    '..kbbbbttbbbbk..', '..kbrrbttbbbbk..', '..kbrrbttbbbbk..', '..kBBBBttBBBBk..', '..kkkkkkkkkkkk..', '................', '................', '................', '................',
  ]),
  daypass: sprite({ k: '#1a2a4a', w: '#fffaf0', b: '#2a5ad8', y: '#f4d860' }, [
    '................', '................', '................', '.kkkkkkkkkkkkkk.', '.kbbbbbbbbbbbbk.', '.kbwwbbbbbbbbbk.', '.kbwbbyybbbbbbk.',
    '.kbwwbyybbbbbbk.', '.kwwwwwwwwwwwwk.', '.kwkkkwkkkwkkwk.', '.kwwwwwwwwwwwwk.', '.kkkkkkkkkkkkkk.', '................', '................', '................', '................',
  ]),
  pc_forest: card('#a8d8f8', '#5cb85a', '#2e7a3a'),
  pc_ice: card('#c8e4f8', '#ffffff', '#4a7ab8'),
  pc_metro: card('#f8c890', '#8a8e98', '#3a3e48'),
  pc_beach: card('#86c8f0', '#f4e0b0', '#f04a4a'),
  hat: sprite({ k: '#1a1a2a', r: '#d83a30', R: '#a82820', w: '#ffffff', W: '#d8e0ec' }, [
    '................',
    '.......ww.......',
    '......wWWw......',
    '.......ww.......',
    '.....kkkkkk.....',
    '....krrrrrrk....',
    '...krRrrRrrRk...',
    '...krrrrrrrrk...',
    '..krRrrRrrRrrk..',
    '..kwwwwwwwwwwk..',
    '..kWwWwWwWwWwk..',
    '..kkkkkkkkkkkk..',
    '................',
    '................',
    '................',
    '................',
  ]),
  scarf: sprite({ k: '#1a1a2a', b: '#3a78d8', B: '#2a58a8', w: '#ffffff' }, [
    '................',
    '................',
    '...kkkkkkkkkk...',
    '..kbbwwbbwwbbk..',
    '..kbBkkkkkkBbk..',
    '..kbk......kbk..',
    '..kbbk....kbbk..',
    '...kbbkkkkbbk...',
    '....kkbbbbkk....',
    '......kbwk......',
    '......kbbk......',
    '......kbwk......',
    '......kbbk......',
    '......kwkwk.....',
    '......k.k.k.....',
    '................',
  ]),
  souvenir: sprite({ k: '#2a1a0e', w: '#c89a62', W: '#a87a48', e: '#101010', b: '#3a78d8' }, [
    '................',
    '................',
    '................',
    '.....kkkk.......',
    '....kwwwwk......',
    '...kwewwewk.....',
    '...kwwkkwwk.....',
    '....kwwwwk......',
    '...kwwwwwwk.....',
    '..kwwwwwwwwk....',
    '.kWwwwwwwwwWk.k.',
    '.kWWwwwwwwWWkkwk',
    '..kkWWWWWWWkkwk.',
    '..kbbbbbbbbbbk..',
    '..kkkkkkkkkkkk..',
    '................',
  ]),
  mushroom_red: mushroom('#e03a30', '#a8221c', true),
  mushroom_brown: mushroom('#8a5a30', '#5e3a1a', false, '#fffaf0'),
  mushroom_yellow: mushroom('#f4b838', '#c8881a', false, '#f8d870'),
  guestcard: sprite({ k: '#1a2a4a', w: '#fffaf0', b: '#3a78c8', g: '#2e8a40', y: '#f4d860' }, [
    '................',
    '................',
    '................',
    '.kkkkkkkkkkkkkk.',
    '.kbbbbbbbbbbbbk.',
    '.kbwwbbbbbbbbbk.',
    '.kwwwwkwwwwwwwk.',
    '.kwggwkwkkkkkwk.',
    '.kwggwkwwwwwwwk.',
    '.kwwwwkwkkkkwwk.',
    '.kwyywkwwwwwwwk.',
    '.kwwwwwwwwwwwwk.',
    '.kkkkkkkkkkkkkk.',
    '................',
    '................',
    '................',
  ]),
  bread: sprite({ k: '#3a2410', p: '#e8d8b0', P: '#c8b488', b: '#c88a42', B: '#9a6228', l: '#e8b060' }, [
    '................',
    '................',
    '.....bbbbb......',
    '....blllllb.....',
    '...kbbbbbbbk....',
    '..kppppppppppk..',
    '..kpPpppppPppk..',
    '..kppppppppppk..',
    '..kpppbbbbpppk..',
    '..kppblllbppPk..',
    '..kppbbbbbppPk..',
    '..kpPppppppPPk..',
    '..kPPPPPPPPPPk..',
    '..kkkkkkkkkkkk..',
    '................',
    '................',
  ]),
  suitcase_ry: suitcase('#d83a30', '#a02820', '#f4d040'),
  suitcase_rb: suitcase('#d83a30', '#a02820', '#3a78d8'),
  suitcase_by: suitcase('#3a6ad0', '#2a4aa0', '#f4d040'),
  postcard: sprite({ k: '#2a2a2a', w: '#fffaf0', s: '#86c8f0', g: '#5cb85a', t: '#f4d860', r: '#d83a30' }, [
    '................',
    '................',
    '................',
    '.kkkkkkkkkkkkkk.',
    '.kssssssssskrrk.',
    '.ksssstssssktrk.',
    '.kssssssssskkkk.',
    '.ksssgggssskwwk.',
    '.kssgggggsskwwk.',
    '.kggggggggggkwk.',
    '.kggggggggggwwk.',
    '.kkkkkkkkkkkkkk.',
    '................',
    '................',
    '................',
    '................',
  ]),
  acorn: sprite({ k: '#2a1a0a', c: '#7a5228', C: '#5a3a18', n: '#c8883a', N: '#9a6428', l: '#e8a858' }, [
    '................',
    '................',
    '.......kk.......',
    '.......k........',
    '....kkkkkkkk....',
    '...kcCcCcCcCk...',
    '...kCcCcCcCck...',
    '...kkkkkkkkkk...',
    '....knlnnnnk....',
    '....klnnnnNk....',
    '....knnnnnNk....',
    '.....knnnNk.....',
    '......knNk......',
    '.......kk.......',
    '................',
    '................',
  ]),
  shovel: sprite({ k: '#2a1a10', w: '#a86c3a', W: '#d09a5a', r: '#d84040', R: '#a02a2a', s: '#f08a7a' }, [
    '................',
    '...........kk...',
    '..........kWwk..',
    '.........kWwk...',
    '........kWwk....',
    '.......kWwk.....',
    '......kWwk......',
    '....kkkwk.......',
    '...ksrrkk.......',
    '..ksrrrRk.......',
    '.ksrrrRk........',
    '.krrrRk.........',
    '.krrRk..........',
    '..kkk...........',
    '................',
    '................',
  ]),
  twig_birch: twig((p, x, y) => {
    const g = hex('#8cc84a'), d = hex('#4f7a2a');
    for (const [dx, dy] of [[-2, -1], [-1, -1], [-2, 0], [-1, 0], [1, 1], [2, 1], [1, 2], [2, 2]]) p.set(x + dx, y + dy, g);
    p.set(x - 2, y + 1, d); p.set(x + 2, y + 3, d);
  }),
  twig_willow: twig((p, x, y) => {
    const g = hex('#8cc860'), d = hex('#4f8f3a');
    for (let k = 1; k < 5; k++) { p.set(x - 1, y + k, k > 2 ? d : g); p.set(x + 2, y + k, k > 2 ? d : g); }
  }),
  twig_pine: twig((p, x, y) => {
    const g = hex('#2c7448'), l = hex('#5aa86c');
    for (const [dx, dy] of [[-2, -2], [-1, -1], [1, -2], [2, -3], [-2, 1], [2, 0], [1, 1], [0, 2]]) p.set(x + dx, y + dy, dx < 0 ? l : g);
  }),
};

/** Small soft shadow under characters. */
export const SHADOW = (() => {
  const p = new Pix(16, 16);
  shadowEllipse(p, 8, 14, 5, 1, hex('#1a203048'));
  return p;
})();

// ---------------------------------------------------------------- more trees

/** Frostland: pines with snow lying on every tier. Same 32×44 size as the leafy forest trees. */
export const SNOW_TREES: Pix[] = [0, 1].map((v) => {
  const p = new Pix(32, 44);
  shadowEllipse(p, 16, 41, 10, 2, hex('#3a4a6a40'));
  trunk(p, () => 16, 34, 42, 4, OAK, 51 + v);
  const L = new Pix(32, 40);
  const tones = ['#1a4a3a', '#22604a', '#2e7656', '#468e68'].map(hex);
  const snow = [hex('#d6e2f0'), hex('#f2f7fc'), hex('#ffffff')];
  const tiers: [number, number, number][] = v ? [[1, 11, 6], [7, 20, 10], [14, 30, 13], [21, 37, 15]] : [[2, 12, 5], [8, 21, 9], [15, 30, 12], [22, 37, 14]];
  for (const [top, bottom, half] of [...tiers].reverse()) {
    for (let y = top; y <= bottom; y++) {
      const f = (y - top) / (bottom - top);
      const hw = Math.round(half * Math.pow(f, 0.85));
      for (let x = 16 - hw; x <= 16 + hw; x++) {
        const side = (x - 16) / (half + 1);
        if (y > bottom - (Math.abs(x - 16) % 4 < 2 ? 0 : 1)) continue;
        // snow on the upper surface of each tier, thicker on the left (lit) side
        const depth = y - (top + Math.abs(x - 16) / Math.max(1, half) * (bottom - top) * 0.9);
        if (depth < (side < 0 ? 3 : 2) && y > top) { L.set(x, y, snow[side < -0.3 ? 2 : side < 0.3 ? 1 : 0]); continue; }
        let lv = -side * 0.55 - f * 0.2 + (hash(x, y, 61 + v) - 0.5) * 0.14;
        if (y > bottom - 2) lv -= 0.35;
        L.set(x, y, tones[lv < -0.4 ? 0 : lv < -0.1 ? 1 : lv < 0.2 ? 2 : 3]);
      }
    }
  }
  for (let y = 0; y < 3; y++) L.set(16, y, snow[2]);
  outlined(p, L, 0, 0, hex('#0c2418'));
  return p;
});

/** Sonnenküste: palms with a bent, ringed trunk, coconuts and drooping fronds. */
export const PALMS: Pix[] = [0, 1].map((v) => {
  const p = new Pix(32, 44);
  shadowEllipse(p, 16, 41, 11, 2, hex('#6a4a2a40'));
  const bend = v ? 1 : -1;
  const L = new Pix(32, 44);
  // ringed trunk, curving
  for (let y = 12; y <= 41; y++) {
    const cx = 16 + bend * Math.round(Math.pow((41 - y) / 29, 2) * 5);
    for (let x = cx - 2; x <= cx + 2; x++) {
      const ring = (y % 4 === 0);
      L.set(x, y, x === cx - 2 ? hex('#e0b878') : ring ? hex('#8a6038') : x > cx ? hex('#a87a48') : hex('#c89a62'));
    }
  }
  const top = 16 + bend * 5;
  // fronds: arcs out from the top, a light upper edge and leaflets hanging below
  const fronds: [number, number][] = [[-1, -0.35], [-1, 0.25], [-0.45, -1], [0.45, -1], [1, -0.35], [1, 0.25], [0, 0.6]];
  const g = ['#2e7a3a', '#3e9a44', '#62bc58', '#8ad870'].map(hex);
  for (const [dx, dy] of fronds) {
    const len = dy > 0.5 ? 7 : 13;
    for (let i = 0; i <= len; i++) {
      const t = i / len;
      const x = Math.round(top + dx * i), y = Math.round(11 + dy * i + t * t * 6);
      L.set(x, y, g[2]); L.set(x, y - 1, g[3]);
      if (i > 1) { L.set(x, y + 1, g[1]); if (i % 2) L.set(x, y + 2, g[0]); }
    }
  }
  for (const [x, y] of [[-2, 13], [1, 14], [-1, 15]]) { L.set(top + x, y, hex('#6a4220')); L.set(top + x + 1, y, hex('#8a5a30')); }
  outlined(p, L, 0, 0, hex('#1e3a18'));
  return p;
});

// ---------------------------------------------------------------- props

/** The border barrier across the road (1×2 tiles): a striped pole on a post. */
export const GATE = (() => {
  const p = new Pix(16, 32);
  const out = hex('#2a1a10');
  for (let y = 2; y < 30; y++) for (let x = 5; x < 11; x++) {
    const edge = x === 5 || x === 10 || y === 2 || y === 29;
    p.set(x, y, edge ? out : Math.floor(y / 4) % 2 ? hex('#d83a30') : hex('#f8f4ea'));
  }
  for (let y = 26; y < 32; y++) for (let x = 3; x < 13; x++) p.set(x, y, x === 3 || x === 12 || y === 31 ? out : hex('#6a6a74'));
  return p;
})();

/** A deep snowdrift across the road (1×2 tiles). */
export const DRIFT = (() => {
  const p = new Pix(16, 32);
  const t = [hex('#c8d6e8'), hex('#e2eaf6'), hex('#f6f9fd'), hex('#ffffff')];
  for (let y = 0; y < 32; y++) for (let x = 0; x < 16; x++) {
    const dx = (x + 0.5 - 8) / 8.5, dy = (y + 0.5 - 17) / 15;
    const d = dx * dx + dy * dy;
    if (d > 1) continue;
    const lv = -dx * 0.6 - dy * 0.5 + (1 - d) * 0.6;
    p.set(x, y, d > 0.86 ? hex('#8a9cba') : t[lv < 0.1 ? 0 : lv < 0.4 ? 1 : lv < 0.7 ? 2 : 3]);
  }
  return p;
})();

/** A cave mouth in a rock face (3×2 tiles); the dark doorway is the middle of the bottom row. */
export const CAVE = (() => {
  const p = new Pix(48, 32);
  const rock = ['#5a6070', '#6e7484', '#8890a0', '#a8b0c0'].map(hex);
  for (let y = 0; y < 32; y++) for (let x = 0; x < 48; x++) {
    const dx = (x + 0.5 - 24) / 24, dy = (y + 0.5 - 32) / 32;
    if (dx * dx + dy * dy > 1) continue;
    const n = vnoise(x, y, 6, 41) - dy * 0.3 - dx * 0.2;
    p.set(x, y, rock[n < 0.4 ? 0 : n < 0.6 ? 1 : n < 0.8 ? 2 : 3]);
    if (dx * dx + dy * dy > 0.9) p.set(x, y, hex('#2a2e38'));
  }
  // snow on top
  for (let x = 6; x < 42; x++) { const top = Math.round(32 - Math.sqrt(Math.max(0, 1 - ((x + 0.5 - 24) / 24) ** 2)) * 32); for (let y = top; y < top + 3; y++) p.set(x, y, y === top ? hex('#c8d6e8') : hex('#ffffff')); }
  // the opening
  for (let y = 14; y < 32; y++) for (let x = 15; x < 33; x++) {
    const dx = (x + 0.5 - 24) / 9, dy = (y + 0.5 - 32) / 18;
    const d = dx * dx + dy * dy;
    if (d <= 1) p.set(x, y, d > 0.82 ? hex('#1a1c24') : hex('#0c0d12'));
  }
  return p;
})();

/** The counter in a border office (5 tiles wide): wood with a lighter top. */
export const DESK = (() => {
  const p = new Pix(80, 24);
  const out = hex('#2a1a10');
  for (let y = 4; y < 24; y++) for (let x = 0; x < 80; x++) {
    const edge = x === 0 || x === 79 || y === 4 || y === 23;
    p.set(x, y, edge ? out : y < 9 ? hex('#d8a46a') : x % 16 === 8 ? hex('#7a4a26') : hex('#a86c3a'));
  }
  for (let x = 1; x < 79; x++) p.set(x, 9, hex('#6a3e1e'));
  // a stamp and an ink pad on the counter
  for (let y = 0; y < 7; y++) for (let x = 60; x < 66; x++) p.set(x, y, y < 3 ? hex('#3a2a1a') : hex('#c0392b'));
  for (let y = 5; y < 8; y++) for (let x = 12; x < 22; x++) p.set(x, y, y === 5 ? hex('#1a3a6a') : hex('#2a5a9a'));
  return p;
})();

/** A deck chair under a parasol (1×1 tile, drawn taller). */
export const CHAIR = (() => {
  const p = new Pix(32, 40);
  const out = hex('#3a2a1a');
  shadowEllipse(p, 16, 37, 13, 2, hex('#6a4a2a40'));
  // parasol
  for (let y = 0; y < 12; y++) for (let x = 2; x < 30; x++) {
    const dx = (x + 0.5 - 16) / 14, dy = (y + 0.5 - 12) / 12;
    if (dx * dx + dy * dy > 1) continue;
    p.set(x, y, dx * dx + dy * dy > 0.86 || y === 11 ? out : Math.floor((x + 2) / 6) % 2 ? hex('#f04a4a') : hex('#fff4e6'));
  }
  for (let y = 11; y < 36; y++) { p.set(15, y, out); p.set(16, y, hex('#e8dccc')); }
  // chair: striped fabric on a frame
  for (let y = 24; y < 37; y++) for (let x = 7; x < 25; x++) {
    const edge = x === 7 || x === 24 || y === 24 || y === 36;
    p.set(x, y, edge ? out : (x % 4 < 2) ? hex('#3a8ad8') : hex('#ffffff'));
  }
  return p;
})();

/** A flag on a pole in the country's colours (1×1 tile, drawn taller). */
export function flag(colors: [string, string]): Pix {
  const p = new Pix(16, 40);
  const out = hex('#2a2a2a');
  for (let y = 2; y < 39; y++) { p.set(3, y, out); p.set(4, y, hex('#d8d8e0')); }
  for (let y = 3; y < 15; y++) for (let x = 5; x < 15; x++) {
    const wave = Math.round(Math.sin(x / 2) * 0.8);
    p.set(x, y + wave, y === 3 || y === 14 || x === 14 ? out : y < 9 ? hex(colors[0]) : hex(colors[1]));
  }
  shadowEllipse(p, 4, 38, 3, 1);
  return p;
}

/** A potted plant (indoors). */
export const PLANT = (() => {
  const p = new Pix(16, 24);
  const out = hex('#1a2a14');
  canopy(p, 1, 0, 14, 14, [{ x: 7, y: 6, r: 5 }, { x: 4, y: 9, r: 3.5 }, { x: 10, y: 9, r: 3.5 }], ['#2e7a3a', '#40984a', '#5cb65a', '#86d26e'].map(hex), out, 71);
  for (let y = 13; y < 23; y++) for (let x = 4; x < 12; x++) p.set(x, y, x === 4 || x === 11 || y === 22 ? hex('#5a2a14') : y < 15 ? hex('#d8704a') : hex('#b85a3a'));
  return p;
})();

/** The shovel lying on the cave floor. */
export const ITEM_ON_GROUND = (i: ItemKind) => {
  const p = new Pix(16, 16);
  shadowEllipse(p, 8, 13, 6, 1, hex('#00000055'));
  p.blit(ITEMS[i], 0, 0);
  return p;
};

/** Brambles across a path (2×1 tiles): thorny tangles with a few berries. */
export const BRAMBLE = (() => {
  const p = new Pix(32, 20);
  const L = new Pix(32, 20);
  canopy(L, 0, 0, 32, 20, [
    { x: 6, y: 10, r: 6 }, { x: 15, y: 8, r: 7, z: 1 }, { x: 25, y: 10, r: 6 }, { x: 10, y: 14, r: 5, z: 2 }, { x: 21, y: 14, r: 5, z: 2 },
  ], ['#2a4a22', '#365e2c', '#4a7436', '#628a44'].map(hex), hex('#14260e'), 171);
  // thorny stems
  for (let k = 0; k < 14; k++) {
    let x = 2 + Math.floor(hash(k, 1, 172) * 28), y = 4 + Math.floor(hash(k, 2, 173) * 12);
    for (let i = 0; i < 4; i++) { L.set(x, y, hex('#6a3a2a')); x += hash(k, i, 174) < 0.5 ? 1 : -1; y += 1; }
  }
  for (const [x, y] of [[8, 7], [19, 6], [24, 12], [13, 13]]) { L.set(x, y, hex('#5a1a4a')); L.set(x + 1, y, hex('#8a2a6a')); }
  p.blit(L, 0, -4);
  return p;
})();

/** The town gate across the road (1×2 tiles): heavy wooden doors with iron bands. */
export const TOWNGATE = (() => {
  const p = new Pix(16, 32);
  const out = hex('#2a1a10');
  for (let y = 0; y < 32; y++) for (let x = 2; x < 14; x++) {
    const edge = x === 2 || x === 13 || y === 0 || y === 31;
    const band = y % 10 === 4 || y % 10 === 5;
    p.set(x, y, edge ? out : band ? hex('#4a4a52') : x === 7 || x === 8 ? hex('#5a3a1e') : (x + y) % 5 === 0 ? hex('#7a5230') : hex('#9a6a3a'));
  }
  for (let y = 0; y < 32; y++) { p.set(0, y, hex('#6a6a74')); p.set(1, y, hex('#8a8a94')); p.set(14, y, hex('#8a8a94')); p.set(15, y, hex('#6a6a74')); }
  p.set(6, 15, hex('#e8c850')); p.set(9, 15, hex('#e8c850'));
  return p;
})();

/** The lowered drawbridge over the river (3×2 tiles): planks across, rails along the edges. */
export const BRIDGE = (() => {
  const p = new Pix(48, 32);
  for (let y = 0; y < 32; y++) for (let x = 0; x < 48; x++) {
    const rail = y < 2 || y > 29;
    p.set(x, y, rail ? (y === 0 || y === 31 ? hex('#3a2410') : hex('#6a4220')) : x % 6 === 5 ? hex('#7a5230') : (x / 6 | 0) % 2 ? hex('#b88a52') : hex('#c89a62'));
  }
  for (let x = 0; x < 48; x += 12) for (let y = 0; y < 32; y += 31) { p.set(x, y, hex('#3a3a42')); p.set(x + 1, y, hex('#3a3a42')); }
  return p;
})();

/** The mill's water wheel (1×2 tiles), turning with the frame counter. */
export function wheel(frame: number): Pix {
  const p = new Pix(16, 32);
  const out = hex('#2a1a10');
  for (let y = 0; y < 32; y++) for (let x = 0; x < 16; x++) {
    const dx = x + 0.5 - 8, dy = y + 0.5 - 16;
    const r = Math.hypot(dx * 2, dy);
    if (r > 15) continue;
    const a = Math.atan2(dy, dx * 2) + frame * 0.4;
    const paddle = Math.abs(Math.sin(a * 4)) > 0.92;
    p.set(x, y, r > 13.5 ? out : r < 3 ? hex('#4a3020') : paddle ? hex('#5a3a20') : r > 10 ? hex('#9a6a3a') : hex('#3a5a7a'));
  }
  return p;
}

/** A town fountain (2×2 tiles): a stone basin with a jet of water. */
export function fountain(frame: number): Pix {
  const p = new Pix(32, 36);
  shadowEllipse(p, 16, 33, 15, 2, hex('#2a2a2a44'));
  for (let y = 12; y < 34; y++) for (let x = 0; x < 32; x++) {
    const dx = (x + 0.5 - 16) / 15.5, dy = (y + 0.5 - 23) / 10.5;
    const d = dx * dx + dy * dy;
    if (d > 1) continue;
    p.set(x, y, d > 0.82 ? hex('#5a5a62') : d > 0.62 ? (dy < 0 ? hex('#d8d8e0') : hex('#a8a8b2')) : (x + y + frame) % 7 === 0 ? hex('#c8ecff') : hex('#5aaee8'));
  }
  for (let y = 2; y < 22; y++) { p.set(15, y, hex('#e8f8ff')); p.set(16, y, (y + frame) % 3 ? hex('#a8dcff') : hex('#ffffff')); }
  for (const [x, y] of [[12, 6], [19, 7], [10, 12], [21, 11], [13, 3], [18, 4]]) p.set(x + (frame % 2), y, hex('#c8ecff'));
  for (let y = 18; y < 24; y++) for (let x = 13; x < 19; x++) p.set(x, y, x === 13 || x === 18 ? hex('#5a5a62') : hex('#c8c8d0'));
  return p;
}

/** The barrier across a road that runs north-south (2×1 tiles). */
export const GATE_H = (() => {
  const p = new Pix(32, 16);
  const out = hex('#2a1a10');
  for (let y = 5; y < 11; y++) for (let x = 2; x < 30; x++) {
    const edge = y === 5 || y === 10 || x === 2 || x === 29;
    p.set(x, y, edge ? out : Math.floor(x / 4) % 2 ? hex('#d83a30') : hex('#f8f4ea'));
  }
  for (let y = 2; y < 15; y++) for (let x = 0; x < 4; x++) p.set(x, y, x === 0 || x === 3 || y === 14 ? out : hex('#6a6a74'));
  return p;
})();

// ---------------------------------------------------------------- the Megacity

/** Which district is being drawn: its own mix of building types (set by the renderer before a city map). */
let district = '';
export function useDistrict(id: string) { district = id; }

type Style = 'glass' | 'office' | 'apartment' | 'shop' | 'old' | 'timber' | 'warehouse' | 'station';
const MIX: Record<string, Style[]> = {
  central: ['shop', 'shop', 'office', 'apartment', 'glass', 'office', 'shop'],
  oldtown: ['old', 'timber', 'old', 'old', 'timber', 'shop'],
  harbour: ['warehouse', 'warehouse', 'apartment', 'shop', 'apartment'],
  market: ['shop', 'old', 'apartment', 'timber', 'shop'],
  towers: ['glass', 'glass', 'office', 'glass', 'office'],
  border_metro: ['office', 'glass', 'apartment'],
};
const PLASTER = ['#f4d8b0', '#c8e4d0', '#f4c0b0', '#c8d8f0', '#f0e0a0', '#e8c8e0'];
const GLASS = [['#5ab8d0', '#2a7a9a', '#c8f0fc'], ['#6a98e0', '#2a4a9a', '#d0e4fc'], ['#5ac0a0', '#2a7a6a', '#c8f4e4'], ['#5a6a8a', '#2a3448', '#a8b8d8']];

/**
 * City blocks seen from the front, as in classic handheld RPG towns: '#' in the city themes is buildings. Each block
 * is cut into buildings 3-6 tiles wide; a building stands on the street side of the block, floor upon floor, with a
 * ground floor (shop, lobby, loading door), upper floors and a roof edge, in one of several styles. Where a building
 * is lower than its block, the city further back shows above it (a paler skyline).
 */
function building(p: Pix, ox: number, oy: number, tx: number, ty: number, at: (x: number, y: number) => string) {
  const B = (x: number, y: number) => at(x, y) === FOREST;
  // the street-side end of this column of the block
  let bot = ty;
  while (B(tx, bot + 1) && bot - ty < 30) bot++;
  const facing = !B(tx, bot + 1);
  let top = ty;
  while (B(tx, top - 1) && ty - top < 30) top--;
  const runH = bot - top + 1;
  if (!facing) return park(p, ox, oy, tx, ty);
  // cut the block's row into buildings, starting at its left end
  let lx = tx;
  while (B(lx - 1, bot) && !B(lx - 1, bot + 1) === true && tx - lx < 60) lx--;
  let left = lx, w = 0, k = 0;
  for (;;) {
    w = 3 + Math.floor(hash(left, bot, 520) * 4);
    if (tx < left + w) break;
    left += w; k++;
  }
  // the last building runs to the block's end
  let rx = tx;
  while (B(rx + 1, bot) && !B(rx + 1, bot + 1) && rx - tx < 60) rx++;
  if (rx - (left + w - 1) < 3 && rx > left + w - 1) w = rx - left + 1;
  const mix = MIX[district] ?? MIX.central;
  let style: Style = mix[Math.floor(hash(left, bot, 521) * mix.length)];
  // the grand station front in the middle of the Hauptbahnhof: one building across the whole block
  if (district === 'central' && bot === 8 && tx >= 14 && tx <= 27) { style = 'station'; left = 14; w = 14; }
  const cx = tx - left, bw = w;
  const tall = style === 'glass' ? runH : style === 'office' ? Math.max(3, runH - Math.floor(hash(left, bot, 522) * 3)) : Math.min(runH, 3 + Math.floor(hash(left, bot, 523) * 3));
  const hb = style === 'station' ? Math.min(runH, 7) : Math.max(2, Math.min(runH, tall));
  const r = bot - ty; // floor counted from the street
  if (r >= hb) return skyline(p, ox, oy, tx, ty);
  const seed = left * 7 + bot;
  const at0 = { cx, bw, r, hb, seed };
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, facadePixel(style, at0, x, y));
  // outline down both sides of a building
  if (cx === 0) for (let y = 0; y < T; y++) p.set(ox, oy + y, hex('#2a2a32'));
  if (cx === bw - 1) for (let y = 0; y < T; y++) p.set(ox + 15, oy + y, hex('#2a2a32'));
}

/**
 * Is this building tile part of a block that faces a street (somewhere below it)? Blocks that face no street (the
 * edges of a district) are city parks instead: grass with trees.
 */
export function cityFacing(at: (x: number, y: number) => string, x: number, y: number): boolean {
  for (let k = 1; k < 31; k++) if (at(x, y + k) !== FOREST) return true;
  return false;
}

/** Park ground (the trees on it are placed by the renderer like a forest). */
function park(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const g = PALS.forest.ground;
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const n = vnoise(tx * T + x, ty * T + y, 22, 1) + (hash(tx * T + x, ty * T + y, 3) - 0.5) * 0.12;
    p.set(ox + x, oy + y, g[n < 0.36 ? 0 : n < 0.55 ? 1 : n < 0.7 ? 2 : 3]);
  }
}

/** Pale buildings further back, above lower buildings and behind the streets you can't see. */
function skyline(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const col = Math.floor((tx + 300) / 3);
  const tone = [hex('#b8c4d4'), hex('#aab6c8'), hex('#c4ccda')][Math.floor(hash(col, 0, 530) * 3)];
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const win = wx % 6 > 2 && wy % 8 > 4;
    p.set(ox + x, oy + y, win ? (hash(Math.floor(wx / 6), Math.floor(wy / 8), 531) < 0.25 ? hex('#e8e0b8') : hex('#98a6ba')) : tone);
  }
  if ((tx + 300) % 3 === 0) for (let y = 0; y < T; y++) p.set(ox, oy + y, hex('#9aa6b8'));
}

function facadePixel(style: Style, b: { cx: number; bw: number; r: number; hb: number; seed: number }, x: number, y: number): number {
  const { cx, bw, r, hb, seed } = b;
  const gx = cx * T + x; // x within the whole building front
  const W = bw * T;
  const roof = r === hb - 1 && hb > 1;
  const groundF = r === 0;
  const pick = <V,>(a: V[]) => a[Math.floor(hash(seed, 3, 540) * a.length)];
  switch (style) {
    case 'glass': {
      const [c, d, l] = pick(GLASS).map(hex);
      if (roof && y < 5) return y === 4 ? hex('#1a2230') : (gx === Math.floor(W / 2) && y < 4) ? hex('#d83a30') : hex('#3a4458');
      if (groundF && y > 4) {
        const door = Math.abs(gx - W / 2) < 6;
        return y === 5 ? hex('#1a2230') : door ? (gx % 4 === 0 ? hex('#1a2230') : hex('#a8d8f0')) : gx % 8 === 0 ? hex('#3a4458') : hex('#6a8aa8');
      }
      if (gx % 8 === 0 || y % 8 === 0) return d;
      // reflections run diagonally across the whole tower
      const band = (gx + (r * T + (T - y)) * 0.6) % 48;
      return band < 6 ? l : band < 10 ? c : (gx % 8 < 4 ? c : d === c ? c : mix(c, d));
    }
    case 'office': {
      const wall = hex(pick(['#d4d0c8', '#c0c4cc', '#d8ccb8']));
      if (roof && y < 4) return y === 3 ? hex('#5a5a62') : hex('#8a8a92');
      if (groundF) return lobby(gx, W, y, wall);
      const band = (y > 2 && y < 7) || (y > 9 && y < 14);
      return band ? (gx % 8 === 0 ? hex('#4a4a52') : y === 3 || y === 10 ? hex('#c8e4f8') : hex('#5a7aa0')) : gx % 16 === 0 ? hex('#a8a8ae') : wall;
    }
    case 'apartment': {
      const brick = hex(pick(['#a85a3a', '#b8704a', '#8a4a34', '#9a6a52']));
      const mortar = hex('#d8c8b0');
      if (roof && y < 4) return y === 3 ? hex('#4a3a2a') : hex('#c8b8a0');
      if (groundF) return shopFront(gx, y, seed, brick);
      const wx = gx % 8;
      if (wx > 1 && wx < 6 && y > 3 && y < 12) return y === 4 || wx === 2 || wx === 5 ? hex('#f4f0e8') : hash(Math.floor(gx / 8), r, seed) < 0.3 ? hex('#f8e8a0') : hex('#6a8ab0');
      if (r % 2 === 1 && y >= 12 && y < 14) return y === 12 ? hex('#3a3a42') : gx % 2 ? hex('#3a3a42') : brick; // balcony rail
      return (y % 4 === 3 || (gx + (Math.floor(y / 4) % 2) * 4) % 8 === 0) ? mortar : brick;
    }
    case 'shop': {
      const wall = hex(pick(PLASTER));
      if (roof && y < 4) return y < 2 ? hex('#7a6a5a') : y === 2 ? hex('#f4f0e8') : (gx % 4 < 2 ? hex('#d8d0c4') : wall);
      if (groundF) return shopFront(gx, y, seed, wall);
      return shutteredWindow(gx, y, wall, hex(pick(['#2e7a3a', '#6a4a2a', '#2a5a9a'])));
    }
    case 'old': case 'timber': {
      const wall = style === 'timber' ? hex('#f4ece0') : hex(pick(PLASTER));
      if (roof) {
        // a steep tiled roof with a little dormer in the middle
        const tiles = [hex('#a8342c'), hex('#c4483a'), hex('#8a2a24')];
        const dorm = Math.abs(gx - W / 2) < 5 && y > 5;
        if (dorm) return y === 6 || Math.abs(gx - W / 2) > 3.5 ? hex('#4a2a1a') : y < 11 ? hex('#a8d0f0') : hex('#f4ece0');
        if (y === 15) return hex('#4a2a1a');
        return (y % 4 === 3) ? tiles[2] : ((gx + (Math.floor(y / 4) % 2) * 3) % 6 === 0 ? tiles[2] : y < 4 ? tiles[1] : tiles[0]);
      }
      if (groundF) return style === 'timber' ? timber(gx, y, wall, true) : shopFront(gx, y, seed, wall);
      if (style === 'timber') return timber(gx, y, wall, false);
      // pastel house: windows with a flower box under each
      const wx = gx % 8;
      if (wx > 1 && wx < 6 && y > 2 && y < 10) return y === 3 || wx === 2 || wx === 5 ? hex('#f4f0e8') : hex('#6a8ab0');
      if (wx > 0 && wx < 7 && (y === 10 || y === 11)) return y === 11 ? hex('#7a4a2a') : (wx % 2 ? hex('#e04a5a') : hex('#5cb85a'));
      return wall;
    }
    case 'warehouse': {
      const brick = hex(pick(['#7a3a2a', '#8a4a32', '#6a4a3a']));
      if (roof && y < 4) return y === 3 ? hex('#2a2a2a') : hex('#5a5a5a');
      if (groundF) {
        // a big arched loading door in each building
        const dx = gx - W / 2;
        const inDoor = Math.abs(dx) < 10 && (y > 3 || Math.hypot(dx, (y - 6) * 1.6) < 10);
        if (inDoor) return Math.abs(dx) > 8.5 || y === 4 ? hex('#2a2a2a') : (Math.floor(gx / 3) % 2 ? hex('#3a5a4a') : hex('#4a6a5a'));
      }
      const wx = gx % 12;
      if (!groundF && wx > 3 && wx < 8 && y > 4 && y < 11) return wx === 4 || y === 5 ? hex('#2a2a2a') : hex('#5a6a7a');
      return (y % 4 === 3 || (gx + (Math.floor(y / 4) % 2) * 4) % 8 === 0) ? hex('#3a2420') : brick;
    }
    case 'station': {
      const stone = hex('#ddd2bc'), dark = hex('#a89a80');
      if (roof && y < 6) return y === 5 ? hex('#5a4a3a') : y > 2 ? dark : hex('#7a8a9a');
      // a clock in the middle, one floor below the roof
      if (r === hb - 2) { const d = Math.hypot(gx - W / 2, y - 8); if (d < 7) return d > 6 ? hex('#3a3a3a') : (d < 1 || (Math.abs(gx - W / 2) < 0.6 && y < 8 && y > 3) || (y === 8 && gx > W / 2 && gx < W / 2 + 4)) ? hex('#1a1a1a') : hex('#fffaf0'); }
      // tall arched windows
      const wx = gx % 16;
      const arch = wx > 3 && wx < 12 && (r > 0 || y > 3) && (y > 4 || Math.hypot(wx - 7.5, y - 5) < 4.5);
      if (arch && !groundF) return wx === 4 || wx === 11 ? dark : y % 6 === 0 ? dark : hex('#8ab8dc');
      if (groundF && arch) return wx === 4 || wx === 11 ? dark : hex('#6a8aa8');
      return gx % 16 === 0 ? dark : y % 8 === 7 ? hex('#cfc2a8') : stone;
    }
  }
}

const mix = (a: number, b: number) => (((((a >>> 24) + (b >>> 24)) >> 1) << 24) | (((((a >>> 16) & 255) + ((b >>> 16) & 255)) >> 1) << 16) | (((((a >>> 8) & 255) + ((b >>> 8) & 255)) >> 1) << 8) | 255) >>> 0;

function lobby(gx: number, W: number, y: number, wall: number): number {
  const door = Math.abs(gx - W / 2) < 6;
  if (y < 3) return hex('#5a5a62');
  return door ? (gx % 4 === 0 || y === 3 ? hex('#2a2a32') : hex('#a8d8f0')) : gx % 8 === 0 ? hex('#4a4a52') : y < 8 ? hex('#c8e4f8') : hex('#7aa8d0') === hex('#7aa8d0') && y > 13 ? wall : hex('#7aa8d0');
}

function shopFront(gx: number, y: number, seed: number, wall: number): number {
  const aw = [['#d83a30', '#fff4e6'], ['#2e8a40', '#f4f0e0'], ['#3a68c8', '#ffffff'], ['#f0a030', '#fff8e0'], ['#8a3aa8', '#f8f0ff']][Math.floor(hash(seed, 9, 541) * 5)].map(hex);
  if (y < 5) return y === 4 ? hex('#3a2a2a') : Math.floor(gx / 4) % 2 ? aw[0] : aw[1];
  if (y === 15) return hex('#5a5a62');
  const wx = gx % 16;
  if (wx > 1 && wx < 14 && y > 5) return wx === 2 || wx === 13 || y === 6 ? hex('#3a3a42') : y < 9 && wx < 7 ? hex('#d8eefc') : hex('#7aa8d0');
  return wall;
}

function shutteredWindow(gx: number, y: number, wall: number, shutter: number): number {
  const wx = gx % 8;
  if (y > 3 && y < 12) {
    if (wx === 1 || wx === 6) return shutter;
    if (wx > 1 && wx < 6) return y === 4 || wx === 2 || wx === 5 || y === 8 ? hex('#f4f0e8') : hex('#6a8ab0');
  }
  if (y === 12 && wx > 0 && wx < 7) return hex('#d8d0c4');
  return wall;
}

function timber(gx: number, y: number, wall: number, ground: boolean): number {
  const beam = hex('#5a3a22');
  const bx = gx % 8;
  if (y === 0 || y === 15 || bx === 0) return beam;
  if (!ground && (bx === y % 8 || bx === 7 - (y % 8)) && (y < 4 || y > 12)) return beam; // crossed braces
  if (bx > 1 && bx < 7 && y > 4 && y < 12) return bx === 2 || bx === 6 || y === 5 || y === 11 ? beam : ground ? hex('#8a5a32') : hex('#6a8ab0');
  return wall;
}

/** Pavement (light square slabs), and in the old town cobbles; streets get kerbs; 'z' is a zebra crossing. */
function pavement(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const seam = (tx * T + x) % 8 === 0 || (ty * T + y) % 8 === 0;
    p.set(ox + x, oy + y, seam ? hex('#a8a8ae') : hash(Math.floor((tx * T + x) / 8), Math.floor((ty * T + y) / 8), 505) < 0.5 ? hex('#cfcfd4') : hex('#c6c6cc'));
  }
}

function street(p: Pix, ox: number, oy: number, tx: number, ty: number, same: Same, zebra: boolean) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const g = hash(tx * T + x, ty * T + y, 506);
    p.set(ox + x, oy + y, g < 0.2 ? hex('#4a4c54') : g < 0.8 ? hex('#55575f') : hex('#60626a'));
  }
  if (zebra) {
    const vertical = same(0, -1) || same(0, 1);
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) if (((vertical ? x : y) % 8) < 4 && (vertical ? y : x) > 1 && (vertical ? y : x) < 14) p.set(ox + x, oy + y, hex('#f2f2f2'));
  }
  // kerbs where the street meets the pavement
  const n = !same(0, -1), s = !same(0, 1), w = !same(-1, 0), e = !same(1, 0);
  for (let i = 0; i < T; i++) {
    if (n) { p.set(ox + i, oy, hex('#e0e0e4')); p.set(ox + i, oy + 1, hex('#8a8a92')); }
    if (s) { p.set(ox + i, oy + 15, hex('#8a8a92')); p.set(ox + i, oy + 14, hex('#3a3c44')); }
    if (w) { p.set(ox, oy + i, hex('#e0e0e4')); p.set(ox + 1, oy + i, hex('#8a8a92')); }
    if (e) { p.set(ox + 15, oy + i, hex('#8a8a92')); p.set(ox + 14, oy + i, hex('#3a3c44')); }
  }
  // dashed centre line on wide horizontal streets
  if (same(0, -1) && same(0, 1) && !zebra && !same(0, -2) === false) for (let x = 0; x < T; x++) if ((tx * T + x) % 16 < 8) p.set(ox + x, oy + 15, hex('#e8d070'));
}

/** A tree in a round planter on the pavement. */
const PLANTER = (() => {
  const p = new Pix(16, 16);
  for (let y = 9; y < 16; y++) for (let x = 2; x < 14; x++) p.set(x, y, y === 9 || y === 15 || x === 2 || x === 13 ? hex('#5a5a62') : hex('#9a9aa4'));
  canopy(p, 0, -4, 16, 16, [{ x: 8, y: 7, r: 6 }, { x: 5, y: 9, r: 4 }, { x: 11, y: 9, r: 4 }], ['#2e7a3a', '#40984a', '#5cb65a', '#86d26e'].map(hex), hex('#153c1c'), 507);
  return p;
})();

/** The entrance to the metro (2×2): stairs going down and a blue "U" sign. */
export const METRO = (() => {
  const p = new Pix(32, 40);
  const out = hex('#2a2a32');
  for (let y = 12; y < 40; y++) for (let x = 0; x < 32; x++) {
    const edge = x < 2 || x > 29 || y < 14;
    p.set(x, y, edge ? (x < 1 || x > 30 ? out : hex('#8a8e98')) : y % 4 < 2 ? hex('#4a4c54') : hex('#3a3c44'));
  }
  for (let y = 0; y < 12; y++) for (let x = 10; x < 22; x++) p.set(x, y, x === 10 || x === 21 || y === 0 || y === 11 ? hex('#ffffff') : hex('#2a5ad8'));
  for (let y = 2; y < 10; y++) { p.set(13, y, hex('#ffffff')); p.set(18, y, hex('#ffffff')); }
  for (let x = 13; x < 19; x++) p.set(x, 9, hex('#ffffff'));
  for (let y = 12; y < 14; y++) p.set(15, y, out), p.set(16, y, out);
  return p;
})();

/** A market stall (2×1, drawn taller): a striped canopy over a counter. */
export function stall(c: string): Pix {
  const p = new Pix(32, 32);
  const out = hex('#2a1a10');
  for (let y = 4; y < 12; y++) for (let x = 0; x < 32; x++) p.set(x, y, y === 11 ? out : Math.floor(x / 4) % 2 ? hex(c) : hex('#fff8ec'));
  for (let y = 12; y < 30; y++) { p.set(2, y, out); p.set(29, y, out); }
  for (let y = 20; y < 31; y++) for (let x = 1; x < 31; x++) p.set(x, y, y === 20 || y === 30 || x === 1 || x === 30 ? out : y < 23 ? hex('#d8a46a') : hex('#a86c3a'));
  for (const [x, col] of [[6, '#f0a030'], [10, '#d83a30'], [14, '#5cb85a'], [20, '#f4d860'], [24, '#d83a30']] as [number, string][]) for (let y = 17; y < 20; y++) for (let k = 0; k < 3; k++) p.set(x + k, y, hex(col));
  return p;
}

/** A small ship moored in the harbour (3×2). */
export const SHIP = (() => {
  const p = new Pix(48, 32);
  const out = hex('#1a1a22');
  for (let y = 14; y < 30; y++) for (let x = 2; x < 46; x++) {
    const inset = Math.max(0, y - 24);
    if (x < 2 + inset || x > 45 - inset) continue;
    p.set(x, y, y === 14 || x === 2 + inset || x === 45 - inset || y === 29 ? out : y < 20 ? hex('#d83a30') : hex('#2a3a5a'));
  }
  for (let y = 4; y < 14; y++) for (let x = 12; x < 32; x++) p.set(x, y, y === 4 || x === 12 || x === 31 ? out : y > 7 && (x - 14) % 5 < 3 ? hex('#a8d0f0') : hex('#f4f4f4'));
  for (let y = 0; y < 5; y++) for (let x = 34; x < 38; x++) p.set(x, y, y === 0 ? out : hex('#2a2a32'));
  return p;
})();

/** Street lamp (1×1, drawn taller). */
export const LAMP = (() => {
  const p = new Pix(16, 32);
  for (let y = 6; y < 30; y++) { p.set(7, y, hex('#2a2a32')); p.set(8, y, hex('#5a5a66')); }
  for (let y = 2; y < 7; y++) for (let x = 4; x < 12; x++) p.set(x, y, y === 2 || x === 4 || x === 11 ? hex('#2a2a32') : hex('#f8e8a0'));
  for (let x = 5; x < 11; x++) p.set(x, 30, hex('#2a2a32'));
  return p;
})();

/** Café things for the café job (served by picture). */
export const CAFE: Record<string, Pix> = {
  coffee: sprite({ k: '#2a1a10', w: '#ffffff', c: '#6a3e1e', s: '#d8d8e0' }, ['................', '................', '.....s..s.......', '......s..s......', '...kkkkkkkkk....', '...kccccccck....', '...kwwwwwwwkkk..', '...kwwwwwwwk.k..', '...kwwwwwwwkkk..', '...kwwwwwwwk....', '....kwwwwwk.....', '..kkkkkkkkkkk...', '..kwwwwwwwwwk...', '...kkkkkkkkk....', '................', '................']),
  tea: sprite({ k: '#2a1a10', w: '#f4f4fa', t: '#c87a30', y: '#f4d860' }, ['................', '................', '...........y....', '...........y....', '...kkkkkkkkkk...', '...kttttttttk...', '...kwwwwwwwwkkk.', '...kwwwwwwwwk.k.', '...kwwwwwwwwkkk.', '...kwwwwwwwwk...', '....kwwwwwwk....', '.....kkkkkk.....', '................', '................', '................', '................']),
  cake: sprite({ k: '#2a1a10', c: '#f4d8a0', p: '#f0a0c0', r: '#d83a30', b: '#a86c3a' }, ['................', '................', '........r.......', '.......kkk......', '.....kkpppkk....', '...kkpppppppkk..', '..kpppppppppppk.', '..kcccccccccccck', '..kpppppppppppk.', '..kccccccccccck.', '..kbbbbbbbbbbbk.', '..kkkkkkkkkkkkk.', '................', '................', '................', '................']),
  croissant: sprite({ k: '#3a2010', c: '#e8a850', C: '#c07a28', l: '#f8d088' }, ['................', '................', '................', '................', '..kk........kk..', '.kcck.kkkk.kcck.', '.kclckcllcCkclk.', '..kcclcllclcck..', '...kccCccCcck...', '....kkccccck....', '......kkkk......', '................', '................', '................', '................', '................']),
  juice: sprite({ k: '#1a2a3a', o: '#f8a020', O: '#d87a10', w: '#e8f4fc', s: '#5cb85a' }, ['................', '.........s......', '........s.......', '....kkkksk......', '....kwwwwk......', '....koooOk......', '....koooOk......', '....koooOk......', '....koooOk......', '....koooOk......', '....koooOk......', '....kkkkkk......', '................', '................', '................', '................']),
  water: sprite({ k: '#1a2a3a', b: '#a8d8f8', B: '#7ab8e8', w: '#e8f4fc' }, ['................', '................', '................', '....kkkkkk......', '....kwwwwk......', '....kbbbBk......', '....kbbbBk......', '....kbbbBk......', '....kbbbBk......', '....kbbbBk......', '....kbbbBk......', '....kkkkkk......', '................', '................', '................', '................']),
};

/** A door in a city building front, with a little sign of what's inside. */
export function doorArt(sign: string): Pix {
  const p = new Pix(16, 16);
  const out = hex('#2a2a32');
  for (let y = 6; y < 16; y++) for (let x = 3; x < 13; x++) p.set(x, y, x === 3 || x === 12 || y === 6 ? out : x === 8 ? hex('#5a5a66') : y < 11 ? hex('#c8e4f8') : hex('#8ab8dc'));
  const col: Record<string, string> = { cafe: '#8a5a30', exchange: '#d8a020', lost: '#7a3aa8', school: '#2e7a3a', courier: '#d86a20', station: '#2a5ad8', hotel: '#c0392b', museum: '#6a6a74', tower: '#3a4a6a', office: '#2e8a40' };
  for (let y = 0; y < 6; y++) for (let x = 2; x < 14; x++) p.set(x, y, y === 0 || y === 5 || x === 2 || x === 13 ? out : hex(col[sign] ?? '#5a5a66'));
  // tiny white mark on the sign
  const marks: Record<string, [number, number][]> = {
    cafe: [[6, 2], [7, 2], [8, 2], [6, 3], [7, 3], [8, 3], [9, 2]], exchange: [[7, 1], [7, 2], [7, 3], [7, 4], [6, 2], [8, 3]],
    lost: [[6, 1], [7, 1], [8, 2], [7, 3], [7, 4]], school: [[5, 2], [6, 2], [7, 3], [8, 2], [9, 2], [10, 2]], courier: [[6, 2], [7, 2], [8, 2], [9, 2], [6, 3], [9, 3]],
    station: [[6, 1], [9, 1], [6, 2], [7, 2], [8, 2], [9, 2], [6, 3], [9, 3]], hotel: [[5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [5, 2]],
    museum: [[5, 2], [7, 2], [9, 2], [5, 3], [7, 3], [9, 3], [6, 1], [8, 1]], tower: [[7, 1], [7, 2], [7, 3], [8, 2], [8, 3]], office: [[6, 1], [6, 2], [6, 3], [6, 4], [7, 1], [8, 1], [7, 2]],
  };
  for (const [x, y] of marks[sign] ?? []) p.set(x, y, hex('#ffffff'));
  return p;
}

// ---------------------------------------------------------------- vehicles, drawn in detail

/** Small drawing helpers for the vehicles. */
function line(p: Pix, x0: number, y0: number, x1: number, y1: number, c: number) {
  const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
  for (let i = 0; i <= n; i++) p.set(Math.round(x0 + ((x1 - x0) * i) / n), Math.round(y0 + ((y1 - y0) * i) / n), c);
}
function poly(p: Pix, pts: [number, number][], c: (x: number, y: number) => number) {
  const ys = pts.map((q) => q[1]);
  for (let y = Math.floor(Math.min(...ys)); y <= Math.ceil(Math.max(...ys)); y++) {
    const xs: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length];
      if ((ay <= y + 0.5 && by > y + 0.5) || (by <= y + 0.5 && ay > y + 0.5)) xs.push(ax + ((y + 0.5 - ay) * (bx - ax)) / (by - ay));
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) for (let x = Math.round(xs[k]); x < Math.round(xs[k + 1]); x++) p.set(x, y, c(x, y));
  }
}
function disc(p: Pix, cx: number, cy: number, r: number, c: (d: number, x: number, y: number) => number | 0) {
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
    const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
    if (d <= r) { const col = c(d, x, y); if (col) p.set(x, y, col); }
  }
}
const shade = (c: string, k: number) => {
  const v = hex(c);
  const ch = (s: number) => Math.max(0, Math.min(255, Math.round(((v >>> s) & 255) * k)));
  return ((ch(24) << 24) | (ch(16) << 16) | (ch(8) << 8) | 255) >>> 0;
};

/** A car seen from the side, facing right (2×1 tiles, drawn a little taller). */
export function car(body: string, kind: 'sedan' | 'hatch' | 'van' | 'taxi' = 'sedan'): Pix {
  const p = new Pix(32, 22);
  const L = new Pix(32, 22);
  const b = (y: number) => (y <= 10 ? shade(body, 1.18) : y >= 15 ? shade(body, 0.72) : hex(body));
  const roof = kind === 'van' ? 3 : 5;
  // cabin: rear pillar, roof, windscreen
  const cabin: [number, number][] = kind === 'van'
    ? [[3, 11], [3, roof + 1], [4, roof], [21, roof], [26, 11]]
    : kind === 'hatch' ? [[4, 11], [7, roof + 1], [9, roof], [19, roof], [24, 11]] : [[6, 11], [9, roof + 1], [11, roof], [20, roof], [25, 11]];
  poly(L, cabin, (_x, y) => b(y));
  // lower body with rounded ends
  poly(L, [[1, 12], [2, 10], [29, 10], [31, 12], [31, 16], [30, 17], [1, 17], [0, 16]], (_x, y) => b(y));
  // windows (glass gets lighter towards the top), with the pillar between the doors
  const glass: [number, number][] = kind === 'van'
    ? [[5, 11], [5, roof + 2], [20, roof + 2], [24, 11]]
    : kind === 'hatch' ? [[6, 11], [8, roof + 2], [19, roof + 2], [22, 11]] : [[8, 11], [10, roof + 2], [20, roof + 2], [23, 11]];
  poly(L, glass, (x, y) => (x === 15 || x === 16 ? b(y) : y < roof + 4 ? hex('#d8eefc') : (x + y) % 7 === 0 ? hex('#b8dcf4') : hex('#6a9ac0')));
  // door line, handles, lights, bumpers
  for (let y = 11; y < 16; y++) L.set(15, y, shade(body, 0.6));
  L.set(12, 12, hex('#e8e8ec')); L.set(19, 12, hex('#e8e8ec'));
  for (let y = 11; y < 13; y++) { L.set(30, y, hex('#fff4b0')); L.set(31, y, hex('#f4d040')); L.set(0, y + 1, hex('#e03a30')); L.set(1, y + 1, hex('#a82820')); }
  for (let x = 0; x < 4; x++) { L.set(x, 16, hex('#c8ccd4')); L.set(31 - x, 16, hex('#c8ccd4')); }
  if (kind === 'taxi') { for (let y = roof - 3; y < roof; y++) for (let x = 12; x < 19; x++) L.set(x, y, y === roof - 3 ? hex('#1a1a1a') : hex('#fff4b0')); for (let x = 13; x < 18; x += 2) L.set(x, roof - 2, hex('#1a1a1a')); }
  // wheel arches cut into the body, then the wheels
  for (const wx of [8, 24]) {
    disc(L, wx, 17.5, 4.5, () => hex('#1a1a20'));
    disc(L, wx, 17.5, 3.6, (d) => (d < 1.6 ? hex('#e0e4ea') : d < 2.3 ? hex('#8a8e98') : hex('#2a2a30')));
    L.set(wx - 1, 16, hex('#ffffff'));
  }
  outlined(p, L, 0, 0, hex('#16161c'));
  // soft shadow under the car
  const sh = new Pix(32, 22);
  for (let x = 2; x < 30; x++) sh.set(x, 21, hex('#00000040'));
  sh.blit(p, 0, 0);
  return sh;
}

/** Two bicycles parked at a low metal rack (2×1 tiles). */
export const BIKES = (() => {
  const p = new Pix(32, 18);
  // the rack: a low rail on two feet, behind the wheels
  for (let x = 2; x < 30; x++) { p.set(x, 11, hex('#9aa0aa')); p.set(x, 12, hex('#6a6e78')); }
  for (const x of [3, 15, 28]) for (let y = 11; y < 17; y++) p.set(x, y, hex('#6a6e78'));
  const bike = (ox: number, frame: string) => {
    const f = hex(frame), tire = hex('#1e1e24'), rim = hex('#d0d4da');
    // two spoked wheels, 9 px apart
    for (const cx of [ox + 3.5, ox + 12.5]) {
      disc(p, cx, 12.5, 3.9, (d) => (d > 3 ? tire : d > 2.4 ? rim : 0));
      p.set(Math.floor(cx), 12, hex('#6a6e78'));
      p.set(Math.floor(cx) - 1, 11, hex('#b8bcc4')); p.set(Math.floor(cx) + 1, 13, hex('#b8bcc4'));
    }
    // a thin diamond frame: rear hub, crank, seat, head tube, front fork
    const rh: [number, number] = [ox + 3, 12], bb: [number, number] = [ox + 8, 13], st: [number, number] = [ox + 6, 8], ht: [number, number] = [ox + 11, 8], fh: [number, number] = [ox + 12, 12];
    line(p, ...rh, ...bb, f); line(p, ...rh, ...st, f); line(p, ...st, ...bb, f); line(p, ...st, ...ht, f); line(p, ...ht, ...bb, f); line(p, ...ht, ...fh, shade(frame, 0.7));
    // saddle, handlebar, crank
    line(p, ox + 5, 7, ox + 7, 7, hex('#1e1e24'));
    line(p, ox + 11, 7, ox + 11, 6, hex('#3a3a42')); line(p, ox + 10, 6, ox + 13, 6, hex('#1e1e24'));
    p.set(bb[0], bb[1], hex('#3a3a42')); p.set(bb[0] + 1, bb[1] + 1, hex('#1e1e24'));
  };
  bike(0, '#d83a30');
  bike(16, '#2a8ad8');
  return p;
})();

/** The metro train (10×2 tiles): two silver cars with a rounded driver's cab, doors, windows, passengers, bogies. */
export const METRO_TRAIN = (() => {
  const W = 160, H = 40;
  const p = new Pix(W, H);
  const L = new Pix(W, H);
  const body = (y: number) => (y < 9 ? hex('#eef1f5') : y < 14 ? hex('#dfe3e9') : y < 24 ? hex('#cfd4db') : hex('#a9afb8'));
  const passengers = ['#f2a444', '#8a6a4a', '#e8e8ec', '#5a5a62', '#d8a070', '#a85a3a'];
  for (let car = 0; car < 2; car++) {
    const x0 = car * 81, x1 = x0 + 78;
    const front = car === 1; // the driver's cab leads, to the right
    // body with a rounded nose at the front end
    poly(L, front
      ? [[x0, 6], [x1 - 8, 6], [x1 - 3, 8], [x1, 13], [x1, 31], [x0, 31]]
      : [[x0 + 1, 6], [x1, 6], [x1, 31], [x0 + 1, 31]], (_x, y) => body(y));
    // roof: a darker strip with cooling units
    for (let x = x0 + 1; x < (front ? x1 - 7 : x1); x++) { L.set(x, 5, hex('#8a9099')); L.set(x, 6, hex('#b8bec8')); }
    for (const ux of [x0 + 12, x0 + 50]) for (let y = 2; y < 5; y++) for (let x = ux; x < ux + 14; x++) L.set(x, y, y === 2 ? hex('#6a707a') : x % 3 ? hex('#9aa0aa') : hex('#7a808a'));
    // stripe with a white pinstripe, and the dark skirt
    for (let x = x0 + 1; x < x1; x++) { L.set(x, 21, hex('#ffffff')); for (let y = 22; y < 25; y++) L.set(x, y, hex('#2a5ad8')); L.set(x, 25, hex('#1a3a98')); for (let y = 29; y < 31; y++) L.set(x, y, hex('#5a5e68')); }
    // doors: two leaves with windows, a seam, a green button
    for (const dx of [x0 + 18, x0 + 52]) {
      for (let y = 9; y < 29; y++) for (let x = dx; x < dx + 12; x++) {
        const edge = x === dx || x === dx + 11 || y === 9;
        const win = y > 10 && y < 19 && x > dx + 1 && x < dx + 10 && x !== dx + 5 && x !== dx + 6;
        L.set(x, y, edge ? hex('#6a707a') : x === dx + 5 || x === dx + 6 ? hex('#4a505a') : win ? (y < 13 ? hex('#cfe6f6') : hex('#6a88aa')) : hex('#c2c8d0'));
      }
      L.set(dx + 3, 22, hex('#3ac060')); L.set(dx + 8, 22, hex('#3ac060'));
    }
    // passenger windows between the doors, with heads inside
    const spans: [number, number][] = [[x0 + 3, x0 + 16], [x0 + 32, x0 + 50], [x0 + 66, front ? x1 - 10 : x1 - 2]];
    spans.forEach(([a, b2], i) => {
      for (let y = 10; y < 19; y++) for (let x = a; x < b2; x++) {
        const frame = y === 10 || y === 18 || x === a || x === b2 - 1;
        L.set(x, y, frame ? hex('#4a505a') : (x - a + y) % 9 === 0 ? hex('#a8c8e4') : y < 12 ? hex('#8aaccc') : hex('#3e5878'));
      }
      for (let k = 0; k < 2; k++) {
        const hx = a + 3 + Math.floor(hash(car, i * 2 + k, 801) * Math.max(1, b2 - a - 7));
        disc(L, hx + 1.5, 15, 1.8, () => hex(passengers[Math.floor(hash(car, i + k * 7, 802) * passengers.length)]));
        for (let x = hx; x < hx + 4; x++) L.set(x, 17, hex('#2a3a5a'));
      }
    });
    // the cab: windscreen, headlight, line sign
    if (front) {
      poly(L, [[x1 - 9, 9], [x1 - 4, 9], [x1 - 1, 14], [x1 - 1, 19], [x1 - 9, 19]], (x, y) => (x + y) % 6 === 0 ? hex('#a8c8e4') : y < 12 ? hex('#5a7a9c') : hex('#2a3a58'));
      for (let y = 25; y < 27; y++) { L.set(x1 - 2, y, hex('#fff4b0')); L.set(x1 - 1, y, hex('#fff4b0')); }
      for (let y = 7; y < 10; y++) for (let x = x1 - 16; x < x1 - 9; x++) L.set(x, y, y === 7 ? hex('#1a1a22') : hex('#2a5ad8'));
      for (const [x, y] of [[x1 - 15, 8], [x1 - 13, 8], [x1 - 14, 9], [x1 - 11, 8], [x1 - 10, 9]] as [number, number][]) L.set(x, y, hex('#ffffff'));
    }
    // bogies: two pairs of wheels under each car
    for (const bx of [x0 + 10, x0 + 60]) {
      for (let y = 31; y < 34; y++) for (let x = bx - 2; x < bx + 14; x++) L.set(x, y, hex('#3a3e46'));
      for (const wx of [bx + 2, bx + 10]) disc(L, wx, 35, 3, (d) => (d < 1.2 ? hex('#9aa0aa') : hex('#1e2026')));
    }
  }
  // the gangway between the cars: an accordion of dark folds
  for (let y = 9; y < 29; y++) for (let x = 78; x < 82; x++) L.set(x, y, x % 2 ? hex('#2a2a30') : hex('#4a4a52'));
  outlined(p, L, 0, 0, hex('#16161c'));
  return p;
})();

/**
 * Mainline trains (12×2 tiles), facing right: a streamlined power car with a pointed nose and two carriages, in
 * three liveries (intercity red, regional green, and the grey train that's out of service).
 */
export type Livery = 'intercity' | 'regional' | 'out';
export function trainArt(livery: Livery): Pix {
  const W = 192, H = 40;
  const p = new Pix(W, H);
  const L = new Pix(W, H);
  const lv = {
    intercity: { stripe: '#d83a30', stripe2: '#a8221c', body: ['#f6f7f9', '#e6e8ec', '#c8ccd4'], band: '#2a3448' },
    regional: { stripe: '#2e9a50', stripe2: '#1e6a38', body: ['#f4f6f2', '#e2e6de', '#c4ccc0'], band: '#2a3a30' },
    out: { stripe: '#8a8e96', stripe2: '#6a6e76', body: ['#c8ccd2', '#b4b8c0', '#9aa0a8'], band: '#4a4e58' },
  }[livery];
  const body = (y: number) => hex(y < 10 ? lv.body[0] : y < 24 ? lv.body[1] : lv.body[2]);
  for (let car = 0; car < 3; car++) {
    const x0 = car * 64, x1 = x0 + 62;
    const nose = car === 2;
    // body: the last car (right) is the power car with a long sloping nose
    poly(L, nose
      ? [[x0, 7], [x1 - 22, 7], [x1 - 8, 10], [x1, 18], [x1 + 1, 26], [x1 - 2, 31], [x0, 31]]
      : [[x0, 7], [x1, 7], [x1, 31], [x0, 31]], (_x, y) => body(y));
    // roof line and roof equipment
    for (let x = x0; x < (nose ? x1 - 22 : x1); x++) { L.set(x, 6, hex('#7a808a')); L.set(x, 7, hex('#a8aeb8')); }
    for (let y = 3; y < 7; y++) for (let x = x0 + 20; x < x0 + 40; x++) L.set(x, y, y === 3 ? hex('#5a606a') : (x % 4 ? hex('#9aa0aa') : hex('#7a808a')));
    if (nose) { // pantograph
      line(L, x0 + 10, 6, x0 + 18, 1, hex('#3a3e46')); line(L, x0 + 18, 1, x0 + 26, 6, hex('#3a3e46')); line(L, x0 + 14, 1, x0 + 24, 1, hex('#5a5e66'));
    }
    // the dark window band with windows, then the stripe
    for (let x = x0 + 1; x < (nose ? x1 - 14 : x1); x++) {
      for (let y = 11; y < 18; y++) L.set(x, y, hex(lv.band));
      for (let y = 22; y < 25; y++) L.set(x, y, hex(lv.stripe));
      L.set(x, 25, hex(lv.stripe2));
      L.set(x, 21, hex('#ffffff'));
    }
    for (let x = x0 + 4; x < (nose ? x1 - 16 : x1 - 2); x += 8) for (let y = 12; y < 17; y++) for (let k = 0; k < 6; k++) {
      if (nose && x < x0 + 26) continue;
      L.set(x + k, y, y < 14 ? hex('#cfe6f6') : (k + y) % 5 === 0 ? hex('#a8c8e4') : hex('#5e7ea0'));
    }
    // doors (passenger cars): a recessed door with a window
    if (!nose) for (const dx of [x0 + 2, x1 - 10]) for (let y = 9; y < 30; y++) for (let x = dx; x < dx + 8; x++) {
      const edge = x === dx || x === dx + 7 || y === 9;
      L.set(x, y, edge ? hex('#5a606a') : y > 11 && y < 18 && x > dx + 1 && x < dx + 6 ? hex('#8ab0d0') : body(y));
    }
    // the power car: a big windscreen, headlights, a logo
    if (nose) {
      poly(L, [[x1 - 21, 9], [x1 - 9, 11], [x1 - 3, 17], [x1 - 14, 17], [x1 - 21, 13]], (x, y) => (x + y) % 6 === 0 ? hex('#b8d4ec') : y < 12 ? hex('#5a7a9c') : hex('#1e2a40'));
      for (let y = 22; y < 24; y++) for (let x = x1 - 4; x < x1; x++) L.set(x, y, hex('#fff4b0'));
      for (let y = 24; y < 27; y++) for (let x = x1 - 34; x < x1 - 26; x++) L.set(x, y, hex('#ffffff'));
      L.set(x1 - 32, 25, hex(lv.stripe)); L.set(x1 - 29, 25, hex(lv.stripe));
    }
    // skirt and bogies
    for (let x = x0 + 1; x < x1; x++) for (let y = 29; y < 31; y++) L.set(x, y, hex('#4a4e58'));
    for (const bx of [x0 + 6, x0 + 44]) {
      for (let y = 31; y < 34; y++) for (let x = bx; x < bx + 14; x++) L.set(x, y, hex('#2e3238'));
      for (const wx of [bx + 3, bx + 11]) disc(L, wx, 35.5, 3.2, (d) => (d < 1.3 ? hex('#a8acb4') : hex('#1a1c22')));
    }
  }
  // gangways between the cars
  for (const gx of [62, 126]) for (let y = 10; y < 29; y++) for (let x = gx; x < gx + 2; x++) L.set(x, y, y % 2 ? hex('#2a2a30') : hex('#4a4a52'));
  outlined(p, L, 0, 0, hex('#16161c'));
  return p;
}
export const TRAIN = trainArt('intercity');

/** Stairs: down into the underpass (in the station hall and on the platforms), up out of it. */
export const STAIRS = 'S';
function stairs(p: Pix, ox: number, oy: number, down: boolean) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const step = Math.floor(y / 3);
    const lightness = down ? 1 - step / 6 : 0.55 + step / 10;
    const v = Math.round(200 * lightness);
    p.set(ox + x, oy + y, y % 3 === 0 ? hex('#3a3e46') : ((v << 24) | (v << 16) | ((v + 8) << 8) | 255) >>> 0);
  }
  for (let y = 0; y < T; y++) { p.set(ox, oy + y, hex('#8a8e98')); p.set(ox + 15, oy + y, hex('#8a8e98')); p.set(ox + 1, oy + y, hex('#c8ccd4')); }
}

/** Station furniture: a stone pillar, a platform number sign, a wall poster, a big clock. */
export function platformSign(n: number): Pix {
  const p = new Pix(16, 32);
  for (let y = 10; y < 32; y++) { p.set(7, y, hex('#3a3e46')); p.set(8, y, hex('#6a6e78')); }
  for (let y = 0; y < 12; y++) for (let x = 1; x < 15; x++) p.set(x, y, x === 1 || x === 14 || y === 0 || y === 11 ? hex('#1a2a5a') : hex('#2a5ad8'));
  const digits: Record<number, string[]> = { 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['##.', '..#', '.#.', '#..', '###'], 3: ['##.', '..#', '.#.', '..#', '##.'] };
  digits[n].forEach((row, y) => [...row].forEach((ch, x) => { if (ch === '#') p.set(6 + x, 3 + y, hex('#ffffff')); }));
  return p;
}
export const PILLAR = (() => {
  const p = new Pix(16, 40);
  for (let y = 0; y < 40; y++) for (let x = 3; x < 13; x++) p.set(x, y, x === 3 || x === 12 ? hex('#8a7e6a') : y < 4 || y > 35 ? hex('#c8bca4') : x < 6 ? hex('#f0e6d0') : hex('#ddd2bc'));
  for (let x = 2; x < 14; x++) { p.set(x, 3, hex('#8a7e6a')); p.set(x, 36, hex('#8a7e6a')); }
  return p;
})();
export function poster(seed: number): Pix {
  const p = new Pix(32, 16);
  const cols = [['#f04a5a', '#ffd040'], ['#2a8ad8', '#ffffff'], ['#2e8a50', '#f4f0e0'], ['#8a3aa8', '#f8c0e0']][seed % 4].map(hex);
  for (let y = 1; y < 14; y++) for (let x = 2; x < 30; x++) p.set(x, y, x === 2 || x === 29 || y === 1 || y === 13 ? hex('#3a3a42') : y < 9 ? cols[0] : cols[1]);
  for (let x = 5; x < 18; x++) p.set(x, 10, hex('#2a2a32'));
  disc(p, 23, 6, 3, () => cols[1]);
  return p;
}


/** Street furniture and other city things (see DECOR_SIZE for their footprints). */
export const DECOR: Record<string, Pix> = (() => {
  const s = (pal: Record<string, string>, rows: string[]) => sprite(pal, rows);
  const bench = new Pix(32, 16);
  for (let x = 2; x < 30; x++) { for (const y of [5, 6, 9, 10]) bench.set(x, y, y === 5 || y === 9 ? hex('#c88a4a') : hex('#9a6232')); bench.set(x, 4, hex('#3a2210')); bench.set(x, 11, hex('#3a2210')); }
  for (const x of [4, 27]) for (let y = 4; y < 15; y++) { bench.set(x, y, hex('#3a3a42')); bench.set(x + 1, y, hex('#5a5a66')); }
  const bikes = BIKES;
  const statue = new Pix(32, 40);
  for (let y = 26; y < 40; y++) for (let x = 4; x < 28; x++) statue.set(x, y, y === 26 || y === 39 || x === 4 || x === 27 ? hex('#5a5a62') : y < 30 ? hex('#c8c8d0') : hex('#a8a8b2'));
  // a bronze cat on the plinth: the founder of the city
  const cat = s({ k: '#2a3a2a', g: '#5a8a6a', G: '#3e6a50', l: '#7aa88a' }, ['..k......k..', '.kgk....kgk.', '.kggkkkkggk.', 'kgglggggglgk', 'kggggggggggk', 'kgggkggkgggk', '.kggggggggk.', '..kkggggkk..', '.kgggggggggk', 'kgglggggglgk', 'kgggggggggGk', 'kGgggggggGGk', '.kGGGGGGGGk.', '..kkkkkkkk..']);
  statue.blit(cat, 10, 12);
  const kiosk = new Pix(32, 40);
  for (let y = 8; y < 38; y++) for (let x = 2; x < 30; x++) kiosk.set(x, y, x === 2 || x === 29 || y === 37 ? hex('#2a2a32') : y < 14 ? (Math.floor(x / 4) % 2 ? hex('#2e8a40') : hex('#fff8ec')) : y < 26 && x > 5 && x < 26 ? hex('#a8d8f0') : hex('#e8dcc8'));
  for (let y = 16; y < 24; y++) for (let x = 8; x < 14; x++) kiosk.set(x, y, (x + y) % 3 ? hex('#f4f0e8') : hex('#5a5a66'));
  for (let y = 16; y < 24; y++) for (let x = 17; x < 23; x++) kiosk.set(x, y, y < 20 ? hex('#f04a4a') : hex('#3a78d8'));
  for (let y = 4; y < 8; y++) for (let x = 8; x < 24; x++) kiosk.set(x, y, y === 4 || y === 7 || x === 8 || x === 23 ? hex('#2a2a32') : hex('#f4d860'));
  const busstop = new Pix(32, 32);
  for (let y = 6; y < 30; y++) for (let x = 2; x < 30; x++) busstop.set(x, y, y < 9 ? hex('#3a4458') : x === 2 || x === 29 ? hex('#5a5a66') : y > 22 && y < 26 ? hex('#9a6232') : hex('#c8e4f8aa'));
  for (let y = 0; y < 6; y++) for (let x = 24; x < 30; x++) busstop.set(x, y, y === 0 || y === 5 || x === 24 || x === 29 ? hex('#2a2a32') : hex('#f4d860'));
  busstop.set(26, 2, hex('#2e8a40')); busstop.set(27, 2, hex('#2e8a40')); busstop.set(26, 3, hex('#2e8a40'));
  const table = new Pix(16, 32);
  for (let y = 0; y < 10; y++) for (let x = 0; x < 16; x++) { const dx = (x + 0.5 - 8) / 8, dy = (y + 0.5 - 10) / 10; if (dx * dx + dy * dy <= 1) table.set(x, y, y === 9 ? hex('#5a2a1a') : Math.floor((x + 1) / 3) % 2 ? hex('#e05a4a') : hex('#fff4e6')); }
  for (let y = 9; y < 26; y++) table.set(8, y, hex('#3a3a42'));
  for (let y = 22; y < 26; y++) for (let x = 3; x < 13; x++) table.set(x, y, y === 22 ? hex('#f4f0e8') : hex('#c8c0b4'));
  for (const x of [1, 13]) for (let y = 21; y < 31; y++) for (let k = 0; k < 2; k++) table.set(x + k, y, y < 24 ? hex('#9a6232') : hex('#5a3a22'));
  const crates = s({ k: '#3a2410', w: '#c89a62', W: '#a07a48' }, ['................', '................', '.kkkkkkkk.......', '.kwwwwwwk.......', '.kwkwwkwk.......', '.kwwkkwwk.......', '.kwkwwkwk.kkkkk.', '.kWWWWWWk.kwwwk.', '.kkkkkkkkkkwkwk.', '.kwwwwwwk.kwwwk.', '.kwkwwkwk.kWWWk.', '.kwwkkwwk.kkkkk.', '.kwkwwkwk.......', '.kWWWWWWk.......', '.kkkkkkkk.......', '................']);
  const barrel = s({ k: '#2a1a0a', b: '#8a5a30', B: '#6a4220', l: '#a87a48', i: '#5a5a62' }, ['................', '................', '....kkkkkkk.....', '...kblllbbBk....', '...kiiiiiiik....', '...kblbbbbBk....', '...kblbbbbBk....', '...kiiiiiiik....', '...kblbbbbBk....', '...kblbbbbBk....', '...kiiiiiiik....', '...kblbbbbBk....', '....kkkkkkk.....', '................', '................', '................']);
  const bin = s({ k: '#1a2a1a', g: '#3a8a4a', G: '#2a6a3a', l: '#5aa86a' }, ['................', '................', '................', '.....kkkkk......', '....kGGGGGk.....', '....kgllggk.....', '....kgllggk.....', '....kgggggk.....', '....kgGgGgk.....', '....kgGgGgk.....', '....kgggggk.....', '....kgggggk.....', '....kGGGGGk.....', '.....kkkkk......', '................', '................']);
  const flowers = new Pix(16, 16);
  for (let y = 5; y < 15; y++) for (let x = 1; x < 15; x++) flowers.set(x, y, y === 5 || y === 14 || x === 1 || x === 14 ? hex('#7a5232') : hex('#5a3a22'));
  for (let k = 0; k < 9; k++) { const x = 3 + (k % 3) * 4, y = 7 + Math.floor(k / 3) * 2; flowers.set(x, y, hex(['#f04a5a', '#f4d040', '#ffffff', '#c86ae0'][k % 4])); flowers.set(x + 1, y + 1, hex('#5cb85a')); }
  const cars: Record<string, Pix> = {};
  for (const [n, c, kind] of [['car_red', '#d83a30', 'hatch'], ['car_blue', '#3a68c8', 'sedan'], ['car_yellow', '#f4c030', 'taxi'], ['car_white', '#e8e8ec', 'van'], ['car_black', '#3a3a44', 'sedan'], ['car_green', '#2e8a5a', 'hatch']] as const) cars[n] = car(c, kind);
  // a departure board on two legs
  const board = new Pix(32, 30);
  for (const x of [6, 25]) for (let y = 14; y < 30; y++) { board.set(x, y, hex('#2a2a32')); board.set(x + 1, y, hex('#5a5a66')); }
  return { bench, bikes, statue, kiosk, busstop, table, crates, barrel, bin, flowers, board, ...cars };
})();

/** Footprints of the street furniture: [width, height] in tiles (default 1×1). */
export const DECOR_SIZE: Record<string, [number, number]> = {
  bench: [2, 1], bikes: [2, 1], statue: [2, 2], kiosk: [2, 2], busstop: [2, 1],
  board: [2, 1], car_red: [2, 1], car_blue: [2, 1], car_yellow: [2, 1], car_white: [2, 1], car_black: [2, 1], car_green: [2, 1],
};

// ---------------------------------------------------------------- stations and trains

/** Railway track running east-west (stations): '-'. */
export const TRACK_H = '-';
/** The edge of a platform, with its yellow safety line: 'P'. */
export const EDGE = 'P';

function trackH(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const g = hash(tx * T + x, ty * T + y, 600);
    p.set(ox + x, oy + y, g < 0.3 ? hex('#5a564e') : g < 0.7 ? hex('#6a665e') : hex('#7a766e'));
  }
  for (let x = 1; x < T; x += 4) for (let y = 1; y < 15; y++) { p.set(ox + x, oy + y, hex('#6a4a2e')); p.set(ox + x + 1, oy + y, hex('#4a3220')); }
  for (let x = 0; x < T; x++) for (const y of [4, 11]) { p.set(ox + x, oy + y, hex('#d0d4dc')); p.set(ox + x, oy + y + 1, hex('#6a6e78')); }
}

/** Station floor: stone slabs in a train hall, small grey tiles underground. */
function stationFloor(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const sub = theme === 'subway';
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const size = sub ? 4 : 8;
    const seam = wx % size === 0 || wy % size === 0;
    const tone = hash(Math.floor(wx / size), Math.floor(wy / size), 601);
    p.set(ox + x, oy + y, seam ? (sub ? hex('#8a8e96') : hex('#a89c88')) : sub ? (tone < 0.5 ? hex('#b8bcc4') : hex('#aeb2ba')) : (tone < 0.5 ? hex('#d8ccb4') : hex('#cfc2a8')));
  }
}

function platformEdge(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  stationFloor(p, ox, oy, tx, ty);
  for (let x = 0; x < T; x++) {
    for (let y = 0; y < 3; y++) p.set(ox + x, oy + y, hex('#e8e8ec'));
    for (let y = 3; y < 6; y++) p.set(ox + x, oy + y, (x + tx * T) % 4 < 2 ? hex('#f4d040') : hex('#e8b820'));
    p.set(ox + x, oy, hex('#5a5a62'));
  }
}

/** Station walls: an arched brick wall with windows in train halls, white tiles with a coloured band underground. */
function stationWall(p: Pix, ox: number, oy: number, tx: number, ty: number, at: (x: number, y: number) => string) {
  const face = at(tx, ty + 1) !== FOREST;
  const sub = theme === 'subway';
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    if (!face) { p.set(ox + x, oy + y, sub ? hex('#2a2e36') : hex('#4a3a2e')); continue; }
    if (sub) {
      const seam = wx % 4 === 0 || wy % 4 === 0;
      const band = y >= 6 && y < 10;
      p.set(ox + x, oy + y, band ? hex(STOP_COLOR) : seam ? hex('#c8ccd4') : hex('#f2f4f8'));
    } else {
      const arch = (wx % 32) > 6 && (wx % 32) < 26 && (y > 4 || Math.hypot((wx % 32) - 16, y - 5) < 10);
      const brick = (y % 4 === 3 || (wx + (Math.floor(wy / 4) % 2) * 4) % 8 === 0);
      p.set(ox + x, oy + y, arch && y < 14 ? (y % 5 === 0 || (wx % 32) % 6 === 0 ? hex('#5a4a3a') : hex('#a8c8e0')) : brick ? hex('#6a4030') : hex('#9a5a40'));
    }
  }
}
let STOP_COLOR = '#2a5ad8';
/** The coloured band of the metro station's tiles (each stop its own colour). */
export function useStopColor(c: string) { STOP_COLOR = c; }

/** Ticket machine (1×1, drawn taller) and a departure board on a wall (2×1, drawn on the wall face). */
export const TICKET_MACHINE = (() => {
  const p = new Pix(16, 28);
  for (let y = 2; y < 27; y++) for (let x = 2; x < 14; x++) p.set(x, y, x === 2 || x === 13 || y === 2 || y === 26 ? hex('#2a2a32') : y < 12 && x > 3 && x < 12 ? (y < 4 || x < 5 ? hex('#1a2a4a') : hex('#4a8ae0')) : hex('#d83a30'));
  for (let x = 5; x < 11; x++) p.set(x, 16, hex('#1a1a1a'));
  for (const x of [5, 7, 9]) p.set(x, 20, hex('#f4d040'));
  return p;
})();
export const BOARD = (() => {
  const p = new Pix(32, 16);
  for (let y = 1; y < 14; y++) for (let x = 1; x < 31; x++) p.set(x, y, x === 1 || x === 30 || y === 1 || y === 13 ? hex('#3a3a42') : hex('#1a1e2a'));
  for (const y of [4, 7, 10]) for (let x = 4; x < 28; x++) if (hash(x, y, 602) < 0.7) p.set(x, y, x < 10 ? hex('#f4d040') : hex('#f4f4f4'));
  return p;
})();

/** Stairs up to the street (the way out of a metro station). */
function stairsUp(p: Pix, ox: number, oy: number) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) p.set(ox + x, oy + y, y % 4 === 0 ? hex('#5a5e66') : y % 4 === 1 ? hex('#d0d4dc') : hex('#a8acb4'));
  for (let y = 0; y < T; y++) { p.set(ox, oy + y, hex('#3a3e46')); p.set(ox + 15, oy + y, hex('#3a3e46')); }
}

// the board's face and the ticket machine join the street furniture once both are defined
DECOR.board.blit(BOARD, 0, 0);
DECOR.ticketmachine = TICKET_MACHINE;
DECOR.pillar = PILLAR;
for (const n of [1, 2, 3]) DECOR[`psign${n}`] = platformSign(n);
for (const n of [0, 1, 2, 3]) { DECOR[`poster${n}`] = poster(n); DECOR_SIZE[`poster${n}`] = [2, 1]; }


// ---------------------------------------------------------------- for the countries' own art (countries/*-art.ts)

export { grass, path, water, flowers, fence, inlet, canopy, trunk, shadowEllipse, outlined, line, poly, disc, wall, mat, track, boardwalk, tuft };
export { ROCK_SPR, SNOW_ROCK, PALS };
export type { Blob, Bark, Same };

// ---------------------------------------------------------------- the English-speaking tourist and her phone

/** Kiki the koala: a tourist from far away with a backpack and a camera, who offers the translation job. */
NPCS.koala = sprite({ k: '#2a2a34', g: '#9a9aa8', G: '#6e6e7e', l: '#d4d4de', w: '#f4f2f8', e: '#101014', n: '#3a3040', b: '#3a8a5a', c: '#3a3a48' }, [
  '................',
  '.kkkk......kkkk.',
  'kwwggk....kggwwk',
  'kwwgggkkkkgggwwk',
  '.kggggggggggggk.',
  '.kggeggggggeggk.',
  '.kggggnnnnggggk.',
  '..kgggnnnngggk..',
  '...kgllllllgk...',
  '..kbbkggggkbbk..',
  '.kbgggllllgggbk.',
  '.kbgcccllllggbk.',
  '.kbgcccllllggbk.',
  '..kgggllllgggk..',
  '..kGGk....kGGk..',
  '...kk......kk...',
]);

ITEMS.phone = sprite({ k: '#1a1a22', s: '#3a3a48', S: '#2a2a34', g: '#7ad0f0', G: '#4aa0d0', w: '#e8faff', r: '#f04a5a' }, [
  '................',
  '.....kkkkkk.....',
  '....kSSSSSSk....',
  '....kSggggSk....',
  '....kSgwggSk....',
  '....kSggggSk....',
  '....kSgGGgSk....',
  '....kSggggSk....',
  '....kSgggrSk....',
  '....kSggggSk....',
  '....kSGGGGSk....',
  '....kSSssSSk....',
  '....kSSSSSSk....',
  '.....kkkkkk.....',
  '................',
  '................',
]);
