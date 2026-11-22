/**
 * The Rainforest's pixel art: a warm, humid look of deep greens with teal shadows and sunlight dapples. Muddy brown
 * rivers with lily pads and plank walkways, a thundering waterfall over wet cliffs, kapok and fig trees with buttress
 * roots and lianas, stilt houses with thatch and palm-leaf roofs, and Canopy Village up in the treetops.
 *
 * Map codes, as this country draws them (theme `jungle`):
 *   `#` dense rainforest (layered big-leaf trees), `.` forest floor with leaf litter and sun flecks,
 *   `"` giant ferns, `r` heliconia, `y` bromeliads, `w` orchids, `=` bamboo fence,
 *   `~` muddy river; a `~` run flanked by cliff on both sides is a waterfall (foam and mist below it),
 *   `o` wet rock: a cliff where several touch, a mossy boulder alone,
 *   `:` muddy path; over water (water beyond it on both sides) a plank walkway or rope bridge; between cliffs, stone steps.
 * Theme `jgcanopy` (Canopy Village, up in the trees): `#` the sea of leaves below, `.` plank decks, `:` rope bridges,
 *   `=` rope railing, `o` a thick branch, `r` `y` `w` potted flowers and fruit baskets.
 */
import { CAFE, currentTheme, DECOR, DECOR_SIZE, grassAt, inlet, ITEMS, NPCS, outlined, palette, path, poly, registerTheme, shadowEllipse, tallGrass, useTheme, vnoise, water } from '../art';
import { hash, hex, Pix, sprite } from '../pix';

const T = 16;
type At = (x: number, y: number) => string;
const H = hex;

// ---------------------------------------------------------------- colour helpers

/** Blends colour a towards b by t (0..1); both 0xRRGGBBAA, the result opaque. */
function lerp(a: number, b: number, t: number): number {
  const ch = (s: number) => Math.round(((a >>> s) & 255) * (1 - t) + ((b >>> s) & 255) * t);
  return ((ch(24) << 24) | (ch(16) << 16) | (ch(8) << 8) | 255) >>> 0;
}

// ---------------------------------------------------------------- palettes

const JUNGLE = {
  ground: ['#3a7832', '#408236', '#478c3a', '#4f963f'], grassDark: '#2a6430', grassLight: '#6aae4c',
  path: '#b4683a', pathDark: '#8e4c2a', pathLight: '#c8804e', pathEdge: '#5a2c16',
  water: '#8c7444', waterDeep: '#6c5630', waterLight: '#cab27e', waterEdge: '#2a2010', foam: '#e2d2a0', shadow: '#0a3a2e66',
};
const CANOPY = {
  ground: ['#9c6a3a', '#a87440', '#b27c46', '#bc864c'], grassDark: '#6e4624', grassLight: '#d4a066',
  path: '#a87440', pathDark: '#7a5030', pathLight: '#c89058', pathEdge: '#4a2e18',
  water: '#1e4a34', waterDeep: '#163c2a', waterLight: '#3a7a4a', waterEdge: '#0c2418', foam: '#5aa05a', shadow: '#0a2a2088',
};

// ---------------------------------------------------------------- tile kinds

const isCliff = (at: At, x: number, y: number) => at(x, y) === 'o' && (at(x - 1, y) === 'o' || at(x + 1, y) === 'o' || at(x, y - 1) === 'o' || at(x, y + 1) === 'o');

/** A run of water whose row ends in cliff on both sides: the waterfall. */
function isFall(at: At, x: number, y: number): boolean {
  if (at(x, y) !== '~') return false;
  let l = x, r = x;
  while (at(l - 1, y) === '~' && x - l < 12) l--;
  while (at(r + 1, y) === '~' && r - x < 12) r++;
  return at(l - 1, y) === 'o' && at(r + 1, y) === 'o';
}

/** A path tile over water: looking across it (past the rest of the walkway), there is water on both sides. */
function plankDir(at: At, x: number, y: number): 'h' | 'v' | null {
  if (at(x, y) !== ':') return null;
  const scan = (dx: number, dy: number) => { let k = 1; while (at(x + dx * k, y + dy * k) === ':' && k < 5) k++; return at(x + dx * k, y + dy * k) === '~'; };
  // a walkway running east-west has water to its north and south
  if (scan(0, -1) && scan(0, 1)) return 'h';
  if (scan(-1, 0) && scan(1, 0)) return 'v';
  // a quay: the edge of a path along the bank
  if (at(x, y + 1) === '~' && (at(x - 1, y) === ':' || at(x + 1, y) === ':')) return 'h';
  return null;
}
const wetAt = (at: At, x: number, y: number) => at(x, y) === '~' || plankDir(at, x, y) !== null;
const isStair = (at: At, x: number, y: number) => at(x, y) === ':' && (isCliff(at, x - 1, y) || isCliff(at, x + 1, y) || (at(x - 1, y) === ':' && isCliff(at, x - 2, y)) || (at(x + 1, y) === ':' && isCliff(at, x + 2, y)));

// ---------------------------------------------------------------- the forest floor

const LEAF_LITTER = ['#7a4a22', '#9a6228', '#b8822e', '#6a7228', '#8a3a22'].map(H);
const FLECK = H('#7cba50'), FLECK2 = H('#a8d468'), SHADE = H('#163a2a44'), TEAL_SHADE = H('#0a3a3450');
const BLADE_D = H('#2a6430'), BLADE_L = H('#62a84a');

/**
 * The forest floor: deep green, patches of shade and small flecks of sunlight through the canopy, little tufts and
 * sprouts, fallen leaves; the trees' shade along the forest edge.
 */
function floor(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const fN = at(tx, ty - 1) === '#', fW = at(tx - 1, ty) === '#', fE = at(tx + 1, ty) === '#';
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    let c = grassAt(wx, wy);
    const shade = vnoise(wx, wy, 24, 503);
    if (shade < 0.3) c = lerp(c, H('#1e4a32'), 0.35);
    const d = vnoise(wx, wy, 5, 501) * 0.6 + vnoise(wx, wy, 13, 502) * 0.4;
    if (d > 0.78 && shade > 0.45) c = vnoise(wx, wy, 3, 504) > 0.6 ? FLECK2 : FLECK;
    p.set(ox + x, oy + y, c);
  }
  // grass tufts and sprouts
  const n = 2 + Math.floor(hash(tx, ty, 515) * 3);
  for (let k = 0; k < n; k++) {
    const x = 1 + Math.floor(hash(tx, ty, 516 + k) * 13), y = 3 + Math.floor(hash(tx, ty, 526 + k) * 12);
    if (hash(tx, ty, 536 + k) < 0.5) { p.set(ox + x, oy + y, BLADE_D); p.set(ox + x + 1, oy + y - 1, BLADE_L); p.set(ox + x + 2, oy + y, BLADE_D); p.set(ox + x + 1, oy + y - 2, BLADE_L); }
    else { p.set(ox + x, oy + y, BLADE_D); p.set(ox + x - 1, oy + y - 1, BLADE_L); p.set(ox + x + 1, oy + y - 1, BLADE_L); p.set(ox + x, oy + y - 2, BLADE_L); }
  }
  // fallen leaves
  const m = Math.floor(hash(tx, ty, 520) * 2.6);
  for (let k = 0; k < m; k++) {
    const x = 2 + Math.floor(hash(tx, ty, 530 + k) * 12), y = 2 + Math.floor(hash(tx, ty, 540 + k) * 12);
    const c = LEAF_LITTER[Math.floor(hash(tx, ty, 550 + k) * LEAF_LITTER.length)];
    const flip = hash(tx, ty, 560 + k) < 0.5 ? 1 : -1;
    p.set(ox + x, oy + y, c); p.set(ox + x + flip, oy + y, c); p.set(ox + x + 2 * flip, oy + y - 1, lerp(c, H('#fff0c0'), 0.25)); p.set(ox + x, oy + y + 1, lerp(c, H('#1a0e04'), 0.45));
  }
  // the shade of the trees at the forest edge
  for (let i = 0; i < T; i++) {
    const j = Math.floor(hash(tx * 16 + i, ty, 580) * 2);
    if (fN) for (let y = 0; y < 6 + j; y++) p.set(ox + i, oy + y, y < 3 ? TEAL_SHADE : SHADE);
    if (fW) for (let x = 0; x < 3 + j; x++) p.set(ox + x, oy + i, SHADE);
    if (fE) for (let x = 0; x < 3 + j; x++) p.set(ox + 15 - x, oy + i, SHADE);
  }
}

/** Under the trees: dark undergrowth (seen between trunks and at the edge). */
function undergrowth(p: Pix, ox: number, oy: number, tx: number, ty: number) {
  const tones = ['#143a28', '#1a4530', '#205036', '#285c3c'].map(H);
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const n = vnoise(wx, wy, 6, 610) * 0.75 + hash(wx, wy, 611) * 0.25;
    p.set(ox + x, oy + y, tones[n < 0.35 ? 0 : n < 0.55 ? 1 : n < 0.75 ? 2 : 3]);
  }
  // fern fronds catching a little light
  for (let k = 0; k < 2; k++) frond(p, ox + 3 + Math.floor(hash(tx, ty, 612 + k) * 10), oy + 13 - k * 5, hash(tx, ty, 614 + k) < 0.5 ? -1 : 1, 6, H('#2e6a3c'), H('#3f8048'));
}

/** A fern frond: a curved rib with leaflets, from (x, y) leaning `dir`. */
function frond(p: Pix, x: number, y: number, dir: number, len: number, dark: number, light: number) {
  for (let i = 0; i < len; i++) {
    const t = i / len;
    const fx = Math.round(x + dir * i * 0.9), fy = Math.round(y - i * 0.8 + t * t * 3);
    p.set(fx, fy, dark);
    if (i % 2 === 0 && i < len - 1) { p.set(fx, fy - 1, light); p.set(fx - dir, fy + 1, light); p.set(fx + dir, fy - 1, dark); }
  }
}

// ---------------------------------------------------------------- plants on the floor

const HELICONIA = sprite({ k: '#183a1c', g: '#3e9a44', G: '#2a7034', l: '#7cc25a', r: '#e0402a', R: '#a82a1e', y: '#f8d040' }, [
  '................',
  '.....k......k...',
  '....klk....klk..',
  '....kgk...kglk..',
  '...kglk...kgGk..',
  '...kgGk.k.kgGk..',
  '...kgGkkrk.kgk..',
  '....kGkryk.kGk..',
  '....kGkkrRk.kk..',
  '.....kkryRk.....',
  '.....kGkrk......',
  '.....kGkryk.....',
  '......kGkk......',
  '......kGk.......',
  '......kGk.......',
  '................',
]);
const BROMELIAD = sprite({ k: '#183a1c', g: '#4a9a3a', G: '#2e6e2c', l: '#88c860', p: '#e8508a', o: '#f89038', y: '#f8e060' }, [
  '................',
  '................',
  '................',
  '................',
  '.......k........',
  '..k...kpk...k...',
  '..kk.kpyok.kk...',
  '...kkkpopkkk....',
  '.k.klkkokkgk.k..',
  '.kklgk...kggkk..',
  '..kklgkk.kgGk...',
  '.kglllgkkgGGkk..',
  '..kkggGgGGGkk...',
  '....kkkkkkk.....',
  '................',
  '................',
]);
const ORCHID = sprite({ k: '#2a1a2a', g: '#4a9a3a', G: '#2e6e2c', w: '#fbeefa', p: '#f0a8e0', P: '#b050b0', y: '#f8e060', s: '#3a6a2a' }, [
  '................',
  '.........kkk....',
  '..kkk...kwwpk...',
  '.kwwpk.kwPyPwk..',
  'kwPyPwk.kwPwk...',
  '.kwPwks..kpk....',
  '..kpk..s..s.....',
  '...s....s.s.....',
  '...s.....ss.....',
  '....s....s......',
  '.....s..s.......',
  '..kk..ss..kk....',
  '.kggk.ss.kggk...',
  'kgggGkkkkGgggk..',
  '.kkGGGGGGGGkk...',
  '...kkkkkkkk.....',
]);

const BOULDER = sprite({ k: '#1e2a24', g: '#7a8a80', G: '#566a5e', d: '#3e4e46', l: '#a8b8a8', m: '#4a8a3a', M: '#6aaa48', s: '#0a3a2e66' }, [
  '................',
  '................',
  '................',
  '.....kkkkkk.....',
  '....kmMMmmmkk...',
  '...kmMMmmmmmGk..',
  '..klgmmgggmGGk..',
  '..klggggggGGGdk.',
  '.klgggggGGGGGdk.',
  '.kgggggGGGGGddk.',
  '.kGgggGGGGGdddk.',
  '.kGGGGGGGdddddk.',
  '..kdGGGdddddddk.',
  '...kkkkkkkkkkk..',
  '...ssssssssssss.',
  '................',
]);

function ferns(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const same = (dx: number, dy: number) => at(tx + dx, ty + dy) === '"';
  tallGrass(p, ox, oy, tx, ty, same);
  // big fern fronds and now and then a monstera leaf over the undergrowth
  const dark = H('#1e5a2c'), light = H('#5cae4a');
  for (let k = 0; k < 2; k++) {
    const x = ox + 4 + Math.floor(hash(tx, ty, 630 + k) * 8), y = oy + 9 + k * 5;
    frond(p, x, y, -1, 7, dark, light);
    frond(p, x + 1, y, 1, 7, dark, light);
  }
}

// ---------------------------------------------------------------- water

const LILY = sprite({ k: '#1c4a22', g: '#3f9e46', G: '#2b7a34', l: '#6cc864', p: '#f8b8d8', w: '#ffffff' }, [
  '..kkkk.kk.',
  '.kglllkGgk',
  'kglggggGgk',
  'kgggg.kGgk',
  'kgggk..kGk',
  '.kGGgkkGk.',
  '..kkkkkk..',
]);
const LILY_FLOWER = sprite({ p: '#f8a8d0', w: '#fff0f8', y: '#f8e060' }, ['.w.', 'pyp', '.p.']);

/**
 * The muddy river: the trees on the banks reflected dark green along the edges, long glints drifting with the current,
 * silt swirls, lily pads in the quiet water near the banks, posts under the walkways.
 */
function river(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number, pads = true) {
  const C = palette();
  const wet = (dx: number, dy: number) => wetAt(at, tx + dx, ty + dy);
  water(p, ox, oy, tx, ty, wet, frame);
  const BANK = [H('#1e2e18'), H('#2e3c1e'), H('#4a4a28'), H('#6a5e34')], SHEEN = H('#927a48');
  const n = !wet(0, -1), s = !wet(0, 1), w = !wet(-1, 0), e = !wet(1, 0);
  let hw = 0, vw = 0;
  for (let k = -3; k <= 3; k++) { if (wet(k, 0)) hw++; if (wet(0, k)) vw++; }
  const vertical = vw > hw;
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const c = p.get(ox + x, oy + y);
    if (c === C.waterEdge || c === C.foam) continue;
    const wx = tx * T + x, wy = ty * T + y;
    // the trees on the banks mirrored dark along the edges
    const d = Math.min(n ? y : 99, s ? 15 - y : 99, w ? x : 99, e ? 15 - x : 99) - Math.floor(hash(vertical ? Math.floor(wy / 3) : Math.floor(wx / 3), 0, 641) * 2);
    let col = C.water;
    if (vnoise(wx, wy, 30, 640) > 0.7) col = SHEEN;
    if (d < 7) col = BANK[d < 1 ? 0 : d < 3 ? 1 : d < 5 ? 2 : 3];
    p.set(ox + x, oy + y, col);
  }
  // long glints moving with the current
  for (let k = 0; k < 3; k++) {
    const len = 3 + Math.floor(hash(tx, ty, 650 + k) * 5);
    const a = 2 + Math.floor(hash(tx, ty, 655 + k) * (12 - len)) + frame * 2, b2 = 2 + Math.floor(hash(tx, ty, 660 + k) * 12);
    for (let i = 0; i < len; i++) {
      const x = vertical ? b2 : a + i, y = vertical ? a + i : b2;
      const c = p.get(ox + x, oy + y);
      if (c === BANK[0] || c === BANK[1] || c === C.waterEdge) continue;
      p.set(ox + x, oy + y, i === 0 || i === len - 1 ? C.waterLight : H('#e4d2a2'));
    }
  }
  // lily pads in the quiet water along the banks
  const bank = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => !wetAt(at, tx + dx * 2, ty + dy * 2)) && [[1, 0], [-1, 0], [0, 1], [0, -1]].every(([dx, dy]) => at(tx + dx, ty + dy) === '~' || !wetAt(at, tx + dx, ty + dy));
  if (pads && bank && hash(tx, ty, 670) < 0.14 && !nearFall(at, tx, ty) && ![1, 2, 3].some((k) => isFall(at, tx, ty + k)) && ![[0, -1], [0, 1], [-1, 0], [1, 0]].some(([dx, dy]) => plankDir(at, tx + dx, ty + dy))) {
    const x = 2 + Math.floor(hash(tx, ty, 671) * 5), y = 2 + Math.floor(hash(tx, ty, 672) * 6);
    p.blit(LILY, ox + x, oy + y, hash(tx, ty, 673) < 0.5);
    if (hash(tx, ty, 674) < 0.45) p.blit(LILY_FLOWER, ox + x + 3, oy + y + 1);
    if (hash(tx, ty, 675) < 0.6) p.blit(LILY, ox + x + 4 - Math.floor(hash(tx, ty, 676) * 4), oy + y + 6, true);
  }
  // posts of a walkway above
  if (plankDir(at, tx, ty - 1) !== null) {
    const post = H('#3a2414'), refl = H('#4a3a20');
    for (const px of [2, 13]) { for (let y = 0; y < 4; y++) { p.set(ox + px, oy + y, post); p.set(ox + px + 1, oy + y, post); } p.set(ox + px, oy + 4, refl); p.set(ox + px + 1, oy + 5, refl); p.set(ox + px - 1, oy + 4, C.waterLight); p.set(ox + px + 2, oy + 4, C.waterLight); }
  }
  if (nearFall(at, tx, ty) && !isFall(at, tx, ty)) foam(p, ox, oy, tx, ty, at, frame);
}

const nearFall = (at: At, x: number, y: number) => isFall(at, x, y - 1) || isFall(at, x, y - 2) || isFall(at, x - 1, y - 1) || isFall(at, x + 1, y - 1);

/** White water churning below the waterfall. */
function foam(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number) {
  const close = isFall(at, tx, ty - 1);
  const w = H('#f4fbf8'), w2 = H('#d0e8e0'), w3 = H('#a8d0c8');
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const n = vnoise(wx + frame * 3, wy - frame * 2, 4, 690) * 0.7 + hash(wx, wy + frame, 691) * 0.3;
    const fade = close ? 1 - y / 26 : 0.45 - y / 40;
    if (n < 1 - fade * 0.9) continue;
    p.set(ox + x, oy + y, n > 1 - fade * 0.4 ? w : n > 1 - fade * 0.7 ? w2 : w3);
  }
}

/** Falling water: bright streaks racing down (they move between the two frames), darker water where it is thin. */
function fall(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number) {
  const tones = ['#5a9a98', '#8cc0bc', '#b8dcd8', '#e4f4f0', '#ffffff'].map(H);
  const leftEdge = at(tx - 1, ty) === 'o', rightEdge = at(tx + 1, ty) === 'o';
  for (let x = 0; x < T; x++) {
    const wx = tx * T + x;
    // each column of water has its own brightness; short bright dashes race down it
    const col = vnoise(wx, 0, 3, 700);
    const base = col < 0.3 ? 1 : col < 0.62 ? 2 : 3;
    const period = 11 + Math.floor(hash(wx, 1, 701) * 7), phase = Math.floor(hash(wx, 2, 702) * period), dash = 2 + Math.floor(hash(wx, 3, 703) * 3);
    for (let y = 0; y < T; y++) {
      const wy = ty * T + y;
      const v = (((wy - frame * 6 - phase) % period) + period) % period;
      let k = v < dash ? Math.min(4, base + 2) : v < dash + 2 ? Math.min(4, base + 1) : base;
      if (col < 0.18 && v > dash + 3) k = 0;
      if ((leftEdge && x < 3) || (rightEdge && x > 12)) k = Math.max(0, k - 2);
      p.set(ox + x, oy + y, tones[k]);
    }
  }
  // the lip of the fall: a smooth glassy band where the river tips over
  if (at(tx, ty - 1) === '~' && !isFall(at, tx, ty - 1)) for (let x = 0; x < T; x++) { p.set(ox + x, oy, tones[1]); p.set(ox + x, oy + 1, tones[2]); p.set(ox + x, oy + 2, tones[3]); }
  // spray against the rock at the sides
  for (let k = 0; k < 4; k++) {
    const side = k % 2 ? (rightEdge ? 14 : -1) : (leftEdge ? 1 : -1);
    if (side < 0) continue;
    const y = Math.floor(hash(tx, ty * 4 + k, 710 + frame) * 16);
    p.set(ox + side, oy + y, tones[4]);
  }
}

/** Mist drifting from the foot of the waterfall over the land nearby. */
function mist(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number) {
  let near = 9;
  for (let dy = 1; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) if (isFall(at, tx + dx, ty - dy)) near = Math.min(near, Math.abs(dx) + dy);
  if (near > 4) return;
  const m = H('#f0fbf8aa');
  for (let k = 0; k < 9 - near * 2; k++) {
    const x = Math.floor(hash(tx, ty, 720 + k + frame * 13) * 15), y = Math.floor(hash(tx, ty, 740 + k + frame * 7) * 15);
    p.set(ox + x, oy + y, m); p.set(ox + x + 1, oy + y, H('#f0fbf866'));
  }
}

// ---------------------------------------------------------------- walkways, bridges and steps

const WOOD = ['#4a2e18', '#7a5030', '#9a683c', '#b8844e', '#d4a066'].map(H);

/** Planks over the water (posts below are drawn by the water tile); rope rails where it crosses open water. */
function planks(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, dir: 'h' | 'v', frame: number) {
  const C = palette();
  // the water under it, continuing from the river around
  water(p, ox, oy, tx, ty, (dx, dy) => wetAt(at, tx + dx, ty + dy), frame);
  const same = (dx: number, dy: number) => plankDir(at, tx + dx, ty + dy) === dir || at(tx + dx, ty + dy) === ':';
  const sideA = dir === 'h' ? !same(0, -1) : !same(-1, 0);
  const sideB = dir === 'h' ? !same(0, 1) : !same(1, 0);
  const a0 = sideA ? 2 : 0, a1 = sideB ? 13 : 15;
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const along = dir === 'h' ? x : y, across = dir === 'h' ? y : x;
    if (across < a0 || across > a1) continue;
    const board = Math.floor((tx * T * (dir === 'h' ? 1 : 0) + ty * T * (dir === 'v' ? 1 : 0) + along) / 4);
    const seam = (dir === 'h' ? tx * T + x : ty * T + y) % 4 === 3;
    const tone = 2 + Math.floor(hash(board, dir === 'h' ? ty : tx, 760) * 2);
    let c = seam ? WOOD[1] : WOOD[tone];
    if (across === a0 && sideA) c = WOOD[4];
    if (across === a1 && sideB) c = WOOD[0];
    if (across === a1 - 1 && sideB) c = WOOD[1];
    if (!seam && (along % 4 === 1) && (across === a0 + 1 || across === a1 - 2)) c = WOOD[0]; // nails
    p.set(ox + x, oy + y, c);
  }
  // shadow of the walkway on the water below it
  if (sideB) for (let i = 0; i < T; i++) { if (dir === 'h') { p.set(ox + i, oy + 14, C.shadow); p.set(ox + i, oy + 15, C.shadow); } else { p.set(ox + 14, oy + i, C.shadow); } }
  // rope rails on a bridge (open water on both sides of the deck)
  if (sideA && sideB) {
    const rope = H('#d8b878'), ropeD = H('#8a6a38'), post = H('#3a2414');
    for (let i = 0; i < T; i++) {
      const sag = Math.round(Math.sin(((dir === 'h' ? tx : ty) * T + i) / T * Math.PI) * 1.2);
      if (dir === 'h') { p.set(ox + i, oy + 1 + sag, rope); p.set(ox + i, oy + 2 + sag, ropeD); p.set(ox + i, oy + 13 + sag, rope); p.set(ox + i, oy + 14 + sag, ropeD); }
      else { p.set(ox + 1, oy + i, rope); p.set(ox + 2, oy + i, ropeD); p.set(ox + 13, oy + i, rope); p.set(ox + 14, oy + i, ropeD); }
    }
    if (dir === 'h' && (tx * 3) % 2 === 0) for (const py of [0, 12]) { p.fill(ox + 7, oy + py, 2, 4, post); p.set(ox + 7, oy + py, WOOD[3]); }
    if (dir === 'v' && (ty * 3) % 2 === 0) for (const px of [0, 12]) { p.fill(ox + px, oy + 7, 4, 2, post); p.set(ox + px, oy + 7, WOOD[3]); }
  }
}

const STONE = ['#2a3430', '#4a5650', '#66726a', '#86928a', '#a8b4aa'].map(H);

/** Stone steps cut into the cliff, wet and mossy at the edges. */
function steps(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const ry = y % 5;
    const c = ry === 0 ? STONE[4] : ry === 1 ? STONE[3] : ry === 4 ? STONE[0] : STONE[2];
    p.set(ox + x, oy + y, c);
  }
  // cracks and moss
  for (let k = 0; k < 4; k++) {
    const x = Math.floor(hash(tx, ty, 780 + k) * 16), y = Math.floor(hash(tx, ty, 790 + k) * 16);
    p.set(ox + x, oy + y, k % 2 ? H('#4a8a3a') : STONE[1]);
  }
  const l = at(tx - 1, ty) !== ':', r = at(tx + 1, ty) !== ':';
  for (let y = 0; y < T; y++) { if (l) { p.set(ox, oy + y, STONE[0]); p.set(ox + 1, oy + y, H('#3e6a34')); } if (r) { p.set(ox + 15, oy + y, STONE[0]); p.set(ox + 14, oy + y, STONE[1]); } }
}

// ---------------------------------------------------------------- cliffs

const ROCKS = ['#1c2622', '#34403a', '#4a5850', '#627068', '#7e8c82', '#9eaa9e'].map(H);
const MOSS = ['#2c5a2a', '#3e7a34', '#5a9a40', '#7cba50'].map(H);

/** Rock chunks (cellular noise, wider than tall like strata): the nearest chunk, its centre and how close the next one is. */
function chunk(wx: number, wy: number) {
  const cw = 15, ch = 9;
  const gx = Math.floor(wx / cw), gy = Math.floor(wy / ch);
  let d1 = 1e9, d2 = 1e9, cx = 0, cy = 0, id = 0;
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
    const px = (gx + i) * cw + hash(gx + i, gy + j, 801) * cw, py = (gy + j) * ch + hash(gx + i, gy + j, 802) * ch;
    const d = Math.hypot((wx - px) / 1.25, wy - py);
    if (d < d1) { d2 = d1; d1 = d; cx = px; cy = py; id = hash(gx + i, gy + j, 803); } else if (d < d2) d2 = d;
  }
  return { edge: d2 - d1, dx: (wx - cx) / cw, dy: (wy - cy) / ch, id };
}

/** Wet rock in rounded chunks lit from the top left, moss on their tops, ferns in the cracks; a grassy lip on top. */
function cliff(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number) {
  const up = isCliff(at, tx, ty - 1), down = isCliff(at, tx, ty + 1);
  const left = isCliff(at, tx - 1, ty) || isFall(at, tx - 1, ty), right = isCliff(at, tx + 1, ty) || isFall(at, tx + 1, ty);
  const wetL = isFall(at, tx - 1, ty), wetR = isFall(at, tx + 1, ty);
  // where in the cliff's height this tile is: lit near the top, in shade towards the foot
  let top = 0, bot = 0;
  while (isCliff(at, tx, ty - top - 1) && top < 12) top++;
  while (isCliff(at, tx, ty + bot + 1) && bot < 12) bot++;
  const hgt = (top + bot + 1) * T;
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const c0 = chunk(wx, wy);
    const g = (top * T + y) / hgt; // 0 at the top edge, 1 at the foot
    let c: number;
    if (c0.edge < 1.1) c = ROCKS[0];
    else if (c0.edge < 2) c = ROCKS[1];
    else {
      const lv = -0.7 * c0.dx - 0.9 * c0.dy + (c0.id - 0.5) * 0.5 + (hash(wx, wy, 804) - 0.5) * 0.25 + 0.45 - g * 0.9;
      const k = lv < -0.5 ? 1 : lv < -0.05 ? 2 : lv < 0.35 ? 3 : lv < 0.7 ? 4 : 5;
      c = ROCKS[k];
      // moss on the upper faces
      if (c0.dy < -0.15 && vnoise(wx, wy, 5, 805) > (up ? 0.55 : 0.35)) c = MOSS[Math.min(3, k - 1 + (c0.dx < 0 ? 1 : 0))];
    }
    // dark streaks where water seeps down
    if (vnoise(wx, 0, 3, 807) > 0.82 && hash(wx, wy, 808) < 0.7) c = lerp(c, H('#16242a'), 0.35);
    if ((wetL && x < 4) || (wetR && x > 11)) c = lerp(c, H('#1a3438'), 0.45);
    // ledges: a mossy band now and then across the face
    const ledge = (top * T + y) % 21;
    void ledge;
    if (g > 0.85) c = lerp(c, H('#0e1a16'), (g - 0.85) * 2.5);
    p.set(ox + x, oy + y, c);
  }
  // a fern sprouting from a crack
  if (hash(tx, ty, 810) < 0.35) { const x = ox + 3 + Math.floor(hash(tx, ty, 811) * 9), y = oy + 6 + Math.floor(hash(tx, ty, 812) * 6); frond(p, x, y, -1, 5, MOSS[0], MOSS[2]); frond(p, x, y, 1, 5, MOSS[0], MOSS[2]); }
  // drips glinting beside the fall
  if (wetL || wetR) for (let k = 0; k < 3; k++) p.set(ox + (wetL ? 1 + k : 14 - k), oy + Math.floor(hash(tx, ty * 3 + k, 815 + frame) * 16), H('#d8f4f0'));
  // top: the ground's grassy lip hanging over the edge, with roots
  if (!up) {
    const above = at(tx, ty - 1);
    const lip = above === '#' ? ['#143a28', '#1a4530', '#205036'] : ['#3c8a3a', '#4b9c42', '#55a648'];
    for (let x = 0; x < T; x++) {
      const d = 3 + Math.floor(vnoise(tx * T + x, ty, 5, 820) * 4);
      for (let y = 0; y < d; y++) p.set(ox + x, oy + y, H(lip[y === d - 1 ? 0 : 1 + ((x + y) % 2)]));
      p.set(ox + x, oy + d, H('#0e2418'));
      if (hash(tx * T + x, ty, 821) < 0.18) for (let y = d + 1; y < d + 3 + Math.floor(hash(tx * T + x, ty, 822) * 6); y++) p.set(ox + x, oy + y, y % 3 ? MOSS[1] : MOSS[2]); // vines
    }
  }
  // bottom: wet foot of the cliff with a dark line where it meets the ground
  if (!down) for (let x = 0; x < T; x++) { p.set(ox + x, oy + 15, ROCKS[0]); p.set(ox + x, oy + 14, lerp(p.get(ox + x, oy + 14), ROCKS[0], 0.5)); }
  // sides: the cliff ends, rounding off into the ground
  if (!left) for (let y = 0; y < T; y++) { p.set(ox, oy + y, ROCKS[0]); p.set(ox + 1, oy + y, ROCKS[4]); }
  if (!right) for (let y = 0; y < T; y++) { p.set(ox + 15, oy + y, ROCKS[0]); p.set(ox + 14, oy + y, ROCKS[1]); }
}

/** The shadow the cliff throws on the ground at its foot. */
function cliffShadow(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  if (!isCliff(at, tx, ty - 1)) return;
  for (let x = 0; x < T; x++) for (let y = 0; y < 4 + Math.floor(hash(tx * T + x, ty, 830) * 2); y++) p.set(ox + x, oy + y, H('#0a2a2455'));
  // fallen stones
  for (let k = 0; k < 2; k++) { const x = 2 + Math.floor(hash(tx, ty, 831 + k) * 12); p.set(ox + x, oy + 4, ROCKS[3]); p.set(ox + x + 1, oy + 4, ROCKS[2]); p.set(ox + x, oy + 5, ROCKS[1]); }
}

// ---------------------------------------------------------------- bamboo

function bamboo(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, deck: boolean) {
  const l = at(tx - 1, ty) === '=', r = at(tx + 1, ty) === '=';
  const g = ['#3a5a1a', '#6a8a2a', '#9ab83a', '#c8d870'].map(H), out = H('#1e2a10');
  const rope = H('#c8a860'), ropeD = H('#7a5a2a');
  if (deck) {
    // rope railing on posts (Canopy Village)
    for (let x = l ? 0 : 6; x < (r ? 16 : 10); x++) { p.set(ox + x, oy + 6, rope); p.set(ox + x, oy + 7, ropeD); p.set(ox + x, oy + 10, rope); p.set(ox + x, oy + 11, ropeD); }
    for (let y = 2; y < 14; y++) { p.set(ox + 6, oy + y, WOOD[0]); p.set(ox + 7, oy + y, WOOD[3]); p.set(ox + 8, oy + y, WOOD[2]); p.set(ox + 9, oy + y, WOOD[0]); }
    for (let x = 6; x < 10; x++) p.set(ox + x, oy + 14, H('#0a2a2066'));
    return;
  }
  // a row of bamboo canes tied with rope
  for (const [cx, top] of [[2, 1], [6, 0], [10, 2], [13, 1]] as [number, number][]) {
    for (let y = top; y < 15; y++) {
      const node = (y + cx) % 5 === 0;
      p.set(ox + cx - 1, oy + y, out); p.set(ox + cx + 2, oy + y, out);
      p.set(ox + cx, oy + y, node ? g[1] : g[3]); p.set(ox + cx + 1, oy + y, node ? g[0] : g[2]);
    }
    p.set(ox + cx, oy + top, out); p.set(ox + cx + 1, oy + top, out);
  }
  for (let x = l ? 0 : 1; x < (r ? 16 : 15); x++) { p.set(ox + x, oy + 8, rope); p.set(ox + x, oy + 9, ropeD); }
  for (let x = 1; x < 15; x++) p.set(ox + x, oy + 15, H('#0a3a2e55'));
}

// ---------------------------------------------------------------- the terrain hook

function jungleTerrain(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number): boolean {
  const c = at(tx, ty);
  if (c === '~') { if (isFall(at, tx, ty)) fall(p, ox, oy, tx, ty, at, frame); else river(p, ox, oy, tx, ty, at, frame); return true; }
  if (c === 'o' && isCliff(at, tx, ty)) { cliff(p, ox, oy, tx, ty, at, frame); return true; }
  if (c === '#') { undergrowth(p, ox, oy, tx, ty); return true; }
  if (c === ':') {
    const d = plankDir(at, tx, ty);
    if (d) { planks(p, ox, oy, tx, ty, at, d, frame); return true; }
    if (isStair(at, tx, ty)) { steps(p, ox, oy, tx, ty, at); return true; }
    path(p, ox, oy, tx, ty, (dx, dy) => at(tx + dx, ty + dy) === ':');
    // puddles and roots on the muddy path
    const C = palette();
    if (hash(tx, ty, 850) < 0.3) {
      const x = 4 + Math.floor(hash(tx, ty, 851) * 6), y = 5 + Math.floor(hash(tx, ty, 852) * 6);
      for (let i = 0; i < 5; i++) { p.set(ox + x + i, oy + y, i === 0 || i === 4 ? C.pathDark : H('#7a6a48')); p.set(ox + x + i, oy + y + 1, i === 0 || i === 4 ? C.pathDark : H('#9a8a60')); }
      p.set(ox + x + 1, oy + y, H('#c8d8c0'));
    }
    if (hash(tx, ty, 853) < 0.25) { const y = 3 + Math.floor(hash(tx, ty, 854) * 10); for (let x = 3; x < 12; x++) p.set(ox + x, oy + y + Math.round(Math.sin(x * 0.9 + tx) * 0.7), C.pathEdge); }
    cliffShadow(p, ox, oy, tx, ty, at);
    mist(p, ox, oy, tx, ty, at, frame);
    return true;
  }
  // everything else stands on the forest floor
  floor(p, ox, oy, tx, ty, at);
  for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) if (wetAt(at, tx + sx, ty) && wetAt(at, tx, ty + sy) && wetAt(at, tx + sx, ty + sy)) inlet(p, ox, oy, sx, sy, frame);
  cliffShadow(p, ox, oy, tx, ty, at);
  if (c === '"') ferns(p, ox, oy, tx, ty, at);
  if (c === 'r') p.blit(HELICONIA, ox, oy, hash(tx, ty, 860) < 0.5);
  if (c === 'y') p.blit(BROMELIAD, ox, oy, hash(tx, ty, 861) < 0.5);
  if (c === 'w') p.blit(ORCHID, ox, oy, hash(tx, ty, 862) < 0.5);
  if (c === 'o') p.blit(BOULDER, ox, oy, hash(tx, ty, 863) < 0.5);
  if (c === '=') bamboo(p, ox, oy, tx, ty, at, false);
  mist(p, ox, oy, tx, ty, at, frame);
  return true;
}

// ---------------------------------------------------------------- Canopy Village: up in the treetops

const CROWNS = [
  ['#0c2a1a', '#174a2a', '#236434', '#357e40', '#55a04e'],
  ['#0e2c16', '#1c5224', '#2e722c', '#4a9238', '#78b852'],
  ['#102a14', '#244e1e', '#3a6c26', '#5a8c30', '#8cb048'],
].map((t) => t.map(H));

/** Nearest and second-nearest jittered points of a grid of `cell` (cellular noise). */
function cells(wx: number, wy: number, cell: number, seed: number) {
  const gx = Math.floor(wx / cell), gy = Math.floor(wy / cell);
  let d1 = 1e9, d2 = 1e9, cx = 0, cy = 0, id = 0;
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
    const px = (gx + i + 0.15 + hash(gx + i, gy + j, seed) * 0.7) * cell, py = (gy + j + 0.15 + hash(gx + i, gy + j, seed + 1) * 0.7) * cell;
    const d = Math.hypot(wx - px, wy - py);
    if (d < d1) { d2 = d1; d1 = d; cx = px; cy = py; id = hash(gx + i, gy + j, seed + 2); } else if (d < d2) d2 = d;
  }
  return { d1, d2, cx, cy, id };
}

/**
 * The crowns of the trees below, seen from above: big rounded crowns, each a heap of leafy clumps lit from the top
 * left, in a few different greens; dark gaps between them; now and then a crown in flower.
 */
function leafSea(p: Pix, ox: number, oy: number, tx: number, ty: number, frame: number) {
  const cell = 34;
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    // the crown on top here: of the round crowns around, the one that rises highest at this point
    const gx = Math.floor(wx / cell), gy = Math.floor(wy / cell);
    const small = cells(wx, wy, 7, 910);
    const lump = (small.d1 / 7) * 2.6;
    let best = -1e9, second = -1e9, bc = { x: 0, y: 0, r: 1, id: 0 };
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
      const id = hash(gx + i, gy + j, 902);
      const cx = (gx + i + 0.2 + hash(gx + i, gy + j, 900) * 0.6) * cell, cy = (gy + j + 0.2 + hash(gx + i, gy + j, 901) * 0.6) * cell;
      const r = cell * (0.5 + id * 0.3);
      const h = r - Math.hypot(wx - cx, wy - cy) - lump + id * 3;
      if (h > best) { second = best; best = h; bc = { x: cx, y: cy, r, id }; } else if (h > second) second = h;
    }
    if (best < 0) { p.set(ox + x, oy + y, best < -3 ? H('#040e08') : H('#0a1c10')); continue; }
    const tones = CROWNS[Math.floor(bc.id * 3)];
    const nx = (wx - bc.x) / bc.r, ny = (wy - bc.y) / bc.r;
    const bx = (wx - small.cx) / 3, by = (wy - small.cy) / 3;
    let lv = -0.6 * nx - 0.75 * ny + 0.1 - 0.3 * by - 0.2 * bx + (hash(wx, wy, 904) - 0.5) * 0.15;
    if (small.d2 - small.d1 < 1) lv -= 0.2;
    if (best - second < 1.5 && second > 0) lv -= 0.8; // the crown behind meets this one: a dark seam
    if (best < 1.5) lv -= 0.5;
    const k = lv < -0.6 ? 0 : lv < -0.15 ? 1 : lv < 0.2 ? 2 : lv < 0.55 ? 3 : 4;
    let c = tones[k];
    if (bc.id > 0.93 && k >= 3 && hash(Math.floor(wx / 2), Math.floor(wy / 2), 905) < 0.35) c = H(bc.id > 0.965 ? '#f080b8' : '#f8d050');
    p.set(ox + x, oy + y, c);
  }
  // a blue morpho butterfly now and then
  if (hash(tx, ty, 906) < 0.04) { const x = 4 + frame * 3 + Math.floor(hash(tx, ty, 907) * 6), y = 5 + Math.floor(hash(tx, ty, 908) * 6); p.set(ox + x, oy + y, H('#4aa0f8')); p.set(ox + x + 1, oy + y + frame, H('#102040')); p.set(ox + x + 2, oy + y, H('#4aa0f8')); }
}

function deck(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const walk = (dx: number, dy: number) => { const c = at(tx + dx, ty + dy); return c !== '#' && c !== '~'; };
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wy = ty * T + y, wx = tx * T + x;
    const row = Math.floor(wy / 4);
    const joint = ((wx + row * 7) % 21) === 0;
    const tone = 1 + Math.floor(hash(Math.floor((wx + row * 7) / 21), row, 920) * 3);
    p.set(ox + x, oy + y, wy % 4 === 3 || joint ? WOOD[1] : wy % 4 === 0 ? WOOD[Math.min(4, tone + 1)] : WOOD[tone]);
  }
  for (let k = 0; k < 2; k++) { const x = Math.floor(hash(tx, ty, 921 + k) * 15), y = Math.floor(hash(tx, ty, 923 + k) * 4) * 4 + 1; p.set(ox + x, oy + y, WOOD[0]); }
  // edges over the drop: a thick beam, rope posts, and the deck's shadow on the leaves (drawn by the leaf tile)
  const beam = H('#3a2212'), beamL = H('#7a4a26');
  if (!walk(0, 1)) for (let x = 0; x < T; x++) { p.set(ox + x, oy + 13, beamL); p.set(ox + x, oy + 14, H('#5a361c')); p.set(ox + x, oy + 15, beam); }
  if (!walk(0, -1)) for (let x = 0; x < T; x++) { p.set(ox + x, oy, beam); p.set(ox + x, oy + 1, beamL); }
  if (!walk(-1, 0)) for (let y = 0; y < T; y++) { p.set(ox, oy + y, beam); p.set(ox + 1, oy + y, beamL); }
  if (!walk(1, 0)) for (let y = 0; y < T; y++) { p.set(ox + 15, oy + y, beam); p.set(ox + 14, oy + y, H('#5a361c')); }
  // a rope railing along the open edges, on short posts
  const rope = H('#d8b878'), ropeD = H('#8a6a38');
  const rail = (horiz: boolean, at0: number) => {
    for (let i = 0; i < T; i++) { const x = horiz ? i : at0, y = horiz ? at0 : i; p.set(ox + x, oy + y, rope); p.set(ox + x + (horiz ? 0 : 1), oy + y + (horiz ? 1 : 0), ropeD); }
    for (let i = 3; i < T; i += 8) { const x = horiz ? i : at0, y = horiz ? at0 - 1 : i; p.fill(ox + x, oy + y, 2, 2, WOOD[0]); p.set(ox + x, oy + y, WOOD[4]); }
  };
  if (!walk(0, 1)) rail(true, 11);
  if (!walk(0, -1)) rail(true, 3);
  if (!walk(-1, 0)) rail(false, 3);
  if (!walk(1, 0)) rail(false, 11);
  for (const [dx, dy, px, py] of [[0, 1, 1, 12], [0, 1, 13, 12], [0, -1, 1, 0], [0, -1, 13, 0]] as [number, number, number, number][]) {
    if (walk(dx, dy)) continue;
    p.fill(ox + px, oy + py, 2, 3, WOOD[0]); p.set(ox + px, oy + py, rope);
  }
}

function deckShadow(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const deckAt = (x: number, y: number) => { const c = at(x, y); return c !== '#' && c !== '~'; };
  const sh = H('#04140c88');
  if (deckAt(tx, ty - 1)) {
    for (let x = 0; x < T; x++) for (let y = 0; y < 5; y++) p.set(ox + x, oy + y, sh);
    // the stilts and braces holding the deck, disappearing into the leaves
    if (at(tx, ty - 1) !== ':') for (const px of [3, 11]) for (let y = 0; y < 8; y++) { p.set(ox + px, oy + y, WOOD[0]); p.set(ox + px + 1, oy + y, y < 5 ? WOOD[1] : WOOD[2]); }
  }
  if (deckAt(tx - 1, ty)) for (let y = 0; y < T; y++) for (let x = 0; x < 3; x++) p.set(ox + x, oy + y, sh);
}

function ropeBridge(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number) {
  leafSea(p, ox, oy, tx, ty, frame);
  const horiz = at(tx - 1, ty) === ':' || at(tx + 1, ty) === ':' || (at(tx, ty - 1) !== ':' && at(tx, ty + 1) !== ':');
  const rope = H('#d8b878'), ropeD = H('#8a6a38'), sh = H('#04140c88');
  for (let i = 0; i < T; i++) {
    for (let j = 3; j < 13; j++) {
      const x = horiz ? i : j, y = horiz ? j : i;
      const along = horiz ? tx * T + i : ty * T + i;
      const gap = along % 5 === 4;
      if (gap) continue;
      const tone = 2 + Math.floor(hash(Math.floor(along / 5), horiz ? ty : tx, 930) * 2);
      p.set(ox + x, oy + y, j === 3 ? WOOD[4] : j === 12 ? WOOD[0] : WOOD[tone]);
    }
    // shadow of the bridge on the leaves
    for (let j = 13; j < 16; j++) p.set(ox + (horiz ? i : j), oy + (horiz ? j : i), sh);
    // the ropes
    const a = horiz ? [[i, 2], [i, 13]] : [[2, i], [13, i]];
    for (const [x, y] of a) { p.set(ox + x, oy + y, rope); p.set(ox + x + (horiz ? 0 : 1), oy + y + (horiz ? 1 : 0), ropeD); }
    if (i % 5 === 2) for (const k of [2, 13]) for (let j = 3; j < 13; j += 9) { if (horiz) p.set(ox + i, oy + (k === 2 ? 3 : 12), ropeD); else p.set(ox + (k === 2 ? 3 : 12), oy + i, ropeD); }
  }
}

const POT_FLOWER = sprite({ k: '#2a1a10', t: '#c0603a', T: '#8a3a22', g: '#3e9a44', G: '#2a7034', r: '#e0402a', y: '#f8d040' }, [
  '................',
  '.......r........',
  '......ryr..r....',
  '...r...r..ryr...',
  '..ryr.kGk..r....',
  '...r.kgGk.kgk...',
  '...kgkgGkkgGk...',
  '..kgGkkgkgGk....',
  '...kkGGgGGkk....',
  '....kkkkkkk.....',
  '....kttttTk.....',
  '....kttttTk.....',
  '.....ktttk......',
  '.....kkkkk......',
  '................',
  '................',
]);
const FRUIT_BASKET = sprite({ k: '#2a1a10', b: '#b8843a', B: '#8a5a28', y: '#f8d040', Y: '#c8a020', o: '#f08a28', r: '#d83a30', g: '#5aaa3a' }, [
  '................',
  '................',
  '................',
  '................',
  '.......g........',
  '....kkkgkk......',
  '...kyyyyrrk.....',
  '..kyyYyorrrk....',
  '..kkooooorrkk...',
  '..kbBbBbBbBbk...',
  '...kbBbBbBbk....',
  '...kBbBbBbBk....',
  '....kkkkkkk.....',
  '....ssssss......'.replace(/s/g, '.'),
  '................',
  '................',
]);
const BRANCH = sprite({ k: '#1e140a', b: '#6a4a2a', B: '#4a321c', l: '#8a6a40', m: '#4a8a3a', M: '#6aaa48', s: '#04140c88' }, [
  '................',
  '................',
  '.....kkkk.......',
  '...kkmMMmkk.....',
  '..kmMmlllbbkk...',
  '.kbllllbbbbbBk..',
  'kbllbbbbbbBBBBk.',
  'kblbbbbbBBBBBBk.',
  'kbbbbBBBBBBBBBk.',
  '.kbBBBBBBBBBBk..',
  '..kkBBBBBBBkk...',
  '....kkkkkkk.....',
  '...ssssssssss...',
  '................',
  '................',
  '................',
]);

function canopyTerrain(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number): boolean {
  const c = at(tx, ty);
  if (c === '#' || c === '~') { leafSea(p, ox, oy, tx, ty, frame); deckShadow(p, ox, oy, tx, ty, at); return true; }
  if (c === ':') { ropeBridge(p, ox, oy, tx, ty, at, frame); return true; }
  deck(p, ox, oy, tx, ty, at);
  if (c === '=') bamboo(p, ox, oy, tx, ty, at, true);
  if (c === 'r' || c === 'w') p.blit(c === 'w' ? ORCHID : POT_FLOWER, ox, oy, hash(tx, ty, 940) < 0.5);
  if (c === 'y') p.blit(FRUIT_BASKET, ox, oy);
  if (c === 'o') p.blit(BRANCH, ox, oy, hash(tx, ty, 941) < 0.5);
  if (c === '"') for (let k = 0; k < 3; k++) frond(p, ox + 3 + k * 4, oy + 13, k % 2 ? 1 : -1, 6, H('#1e5a2c'), H('#5cae4a'));
  return true;
}

// ---------------------------------------------------------------- trees

const KAPOK_BARK = { out: H('#1a140c'), dark: H('#4a3e30'), mid: H('#6e604c'), light: H('#948468') };
const FIG_BARK = { out: H('#1e140c'), dark: H('#4a3424'), mid: H('#6a4c32'), light: H('#8e6c48') };

/** A trunk with buttress roots: fins of wood flaring out at the foot, lit from the left. */
function buttressTrunk(p: Pix, cx: number, y0: number, y1: number, w: number, b: typeof KAPOK_BARK, seed: number) {
  for (let y = y0; y <= y1; y++) {
    const up = y1 - y;
    const flare = up < 8 ? Math.round(Math.pow((8 - up) / 8, 2) * 6) : 0;
    const l = cx - Math.floor(w / 2) - flare, r = cx + Math.ceil(w / 2) - 1 + flare;
    for (let x = l; x <= r; x++) {
      const t = (x - l) / Math.max(1, r - l);
      let c = t < 0.3 ? b.light : t < 0.62 ? b.mid : b.dark;
      // the fins: ridges with a lit face and a dark gap between them
      if (flare > 2) {
        const fin = Math.abs(x - cx);
        if (fin > w / 2 && (fin + Math.floor(up / 2)) % 4 === 0) c = b.dark;
        if (fin > w / 2 && (fin + Math.floor(up / 2)) % 4 === 1) c = x < cx ? b.light : b.mid;
      }
      if (hash(x - cx, Math.floor((y - y0) / 4), seed) < 0.18 && t > 0.15 && t < 0.85) c = b.dark;
      if (y < y0 + 2 && x !== l && x !== r) c = b.dark;
      if (x === l || x === r) c = b.out;
      if (y === y1) c = b.out;
      p.set(x, y, c);
    }
  }
}

/** A liana hanging from (x, y0) to y1, swaying a little, with leaves. */
function liana(p: Pix, x: number, y0: number, y1: number, sway: number, c: number, leaf: number, seed: number) {
  for (let y = y0; y <= y1; y++) {
    const t = (y - y0) / Math.max(1, y1 - y0);
    const lx = Math.round(x + Math.sin(t * Math.PI) * sway);
    p.set(lx, y, c);
    if (hash(x, y, seed) < 0.22) { p.set(lx + 1, y, leaf); p.set(lx + 2, y - 1, leaf); }
    else if (hash(x, y, seed + 1) < 0.18) { p.set(lx - 1, y, leaf); p.set(lx - 2, y - 1, leaf); }
  }
}

/**
 * One big glossy leaf: a pointed oval from (x, y) along `ang`, `len` long and `wid` wide, drawn over a dark rim so
 * each leaf stands out from the ones behind it; the half facing the light is lighter, with a midrib and a shiny tip.
 */
function bigLeaf(p: Pix, x: number, y: number, ang: number, len: number, wid: number, tones: number[], lift: number, out = H('#081e12')) {
  const ca = Math.cos(ang), sa = Math.sin(ang);
  const facing = -0.6 * ca - 0.8 * sa; // pointing up-left: catches the light
  const r = Math.ceil(len) + 2;
  const inside = (u: number, v: number, grow: number) => u >= -grow && u <= len + grow && Math.abs(v) <= wid * Math.sin(Math.PI * Math.min(1, Math.max(0, (u + grow) / (len + 2 * grow)))) + grow * 0.6;
  for (const pass of [0, 1]) for (let yy = -r; yy <= r; yy++) for (let xx = -r; xx <= r; xx++) {
    const u = xx * ca + yy * sa, v = -xx * sa + yy * ca;
    if (pass === 0) { if (inside(u, v, 1)) p.set(x + xx, y + yy, out); continue; }
    if (!inside(u, v, 0)) continue;
    const lightSide = v * (ca * 0.8 - sa * 0.6) < 0; // the half towards the top-left
    let k = 2 + lift + (facing > 0.35 ? 1 : facing < -0.35 ? -1 : 0) + (lightSide ? 1 : -1);
    if (Math.abs(v) < 0.55 && u > 1 && u < len - 1) k = Math.min(k, 1 + lift);
    if (lightSide && u > len * 0.45 && u < len * 0.8 && Math.abs(v) > wid * 0.25) k += 1;
    p.set(x + xx, y + yy, tones[Math.max(0, Math.min(tones.length - 1, k))]);
  }
}

/** A palm frond: an arching rib with leaflets hanging from both sides. */
function palmFrond(p: Pix, x: number, y: number, dx: number, dy: number, len: number, tones: number[]) {
  for (let i = 0; i <= len; i++) {
    const t = i / len;
    const fx = Math.round(x + dx * i), fy = Math.round(y + dy * i + t * t * len * 0.45);
    const droop = Math.round(1 + t * 3);
    for (let j = 1; j <= droop; j++) {
      if (i % 2 === 0) { p.set(fx - Math.round(dy * j * 0.6), fy + j, tones[j === droop ? 1 : 2]); p.set(fx + Math.round(dy * j * 0.6), fy - j + 2 * Math.abs(Math.round(dx)), tones[1]); }
    }
    p.set(fx, fy, tones[3]); p.set(fx, fy + 1, tones[2]);
  }
}

const LEAF_TONES = [['#0e3420', '#185030', '#236a3a', '#34844a', '#56a85a', '#86c870'], ['#103a1c', '#1c5626', '#2a7030', '#3e8c3a', '#64aa48', '#98cc62']].map((t) => t.map(H));

/**
 * The rainforest's trees on `#`, drawn overlapping in depth so the wood is a dense, layered canopy: a big-leaved
 * giant on buttress roots with lianas hanging from it, and a palm rising over a thicket of broad leaves.
 */
const JUNGLE_TREES: Pix[] = [0, 1].map((v) => {
  const p = new Pix(32, 52);
  shadowEllipse(p, 16, 49, 13, 3, H('#0a2a2066'));
  const L = new Pix(32, 52);
  const tones = LEAF_TONES[v];
  if (v === 0) {
    buttressTrunk(p, 16, 30, 50, 5, KAPOK_BARK, 11);
    // the crown: clumps of big leaves fanning out, back clumps first and darker, the front ones bright
    const clumps: [number, number, number][] = [[16, 9, -1], [7, 15, -1], [25, 15, -1], [16, 17, 0], [9, 24, 0], [23, 24, 0], [16, 26, 1]];
    for (const [cx, cy, lift] of clumps) {
      for (let k = 0; k < 6; k++) {
        const ang = -Math.PI / 2 + (k - 2.5) * 0.62 + (hash(cx, k, 21) - 0.5) * 0.4 + (cy > 20 ? 0.25 * Math.sign(cx - 16) : 0);
        bigLeaf(L, cx, cy + 3, ang, 7 + hash(cx, k, 22) * 3, 2.8, tones, lift + 1);
      }
      bigLeaf(L, cx, cy + 3, Math.PI / 2 + (hash(cx, cy, 23) - 0.5), 5, 2.4, tones, lift);
    }
    p.blit(L, 0, 0);
    liana(p, 6, 28, 44, 1.5, H('#2a4a1a'), H('#4a8a34'), 41);
    liana(p, 26, 28, 40, -1, H('#2a4a1a'), H('#4a8a34'), 43);
  } else {
    // a palm: ringed trunk, fronds fanning out at the top
    const P = new Pix(32, 52);
    for (let y = 8; y <= 47; y++) {
      const cx = 17 - Math.round(Math.pow((47 - y) / 39, 2) * 3);
      for (let x = cx - 2; x <= cx + 1; x++) P.set(x, y, x === cx - 2 ? H('#8a7a5a') : y % 3 === 0 ? H('#3a2e1e') : x === cx + 1 ? H('#4a3e2a') : H('#6a5a40'));
    }
    const ft = tones.slice(1, 5);
    for (const [dx, dy, len] of [[-1, -0.55, 13], [1, -0.6, 13], [-0.5, -1, 9], [0.45, -1, 9], [-1, 0.1, 12], [1, 0.05, 12], [-0.3, 0.6, 6], [0.4, 0.55, 6]] as [number, number, number][]) palmFrond(P, 15, 8, dx, dy, len, ft);
    outlined(p, P, 0, 0, H('#081e12'));
    // the thicket at its foot: big leaves reaching up around the trunk
    for (const [cx, cy, a0] of [[6, 46, -2.0], [26, 46, -1.1], [10, 42, -1.8], [22, 42, -1.3], [16, 47, -1.57]] as [number, number, number][]) {
      for (let k = 0; k < 3; k++) bigLeaf(L, cx, cy, a0 + (k - 1) * 0.5, 9 + hash(cx, k, 31) * 3, 3.2, tones, k === 1 ? 1 : 0);
    }
    p.blit(L, 0, 0);
  }
  return p;
});

// ---------------------------------------------------------------- animals

const npc = (pal: Record<string, string>, rows: string[]) => sprite(pal, rows);

/** The Rainforest's people: a capuchin builder, a poison-dart frog, a pink river dolphin, a toucan selling fruit, a capybara boatman, a tapir tourist, an armadillo money changer, a coati rascal, a hummingbird gardener, a howler monkey guide, an anteater shopkeeper and a jaguar border officer. */
const ANIMALS: Record<string, Pix> = {
  capuchin: npc({ k: '#1a120c', b: '#3a2a20', B: '#24180f', w: '#f2e2c4', W: '#d0b890', p: '#e8b8a0', e: '#101010', n: '#5a3a30', y: '#d8902a', h: '#8a8a92' }, [
    '................',
    '.....kkkkkk.....',
    '....kbbbbbbk....',
    '...kwbbbbbbwk...',
    '..kwwwwwwwwwwk..',
    '..kwWpeppepWwk..',
    '..kwwppppppwwk..',
    '...kwwpnnpwwk...',
    '....kkwwwwkk....',
    '...kbbwwwwbbk...',
    '..kbkbWwwWbkbk..',
    '..kwkyyyyyykwk..',
    '...kkbbbbbbkk.k.',
    '....kbbkkbbk.kbk',
    '....kBk..kBkkbk.',
    '....kk....kkkk..',
  ]),
  dartfrog: npc({ k: '#0a1a3a', b: '#2a74e8', B: '#1a48a8', l: '#8ab8ff', s: '#0c1424', e: '#101010', W: '#ffffff' }, [
    '................',
    '................',
    '................',
    '...kkk....kkk...',
    '..kWWek..kWWek..',
    '..kWeek..kWeek..',
    '..kbbbkkkkbbbk..',
    '.kblbbbbbbblbbk.',
    '.kbbsbbbbbbsbbk.',
    '.kbbbbkkkkbbbbk.',
    '..kbbbbbbbbbbk..',
    '.kbkbsbbbbsbkbk.',
    'kbbkbbbsbbbbkbbk',
    'kBkkBBBBBBBBkkBk',
    '.kk.kkkkkkkk.kk.',
    '................',
  ]),
  dolphin: npc({ k: '#4a1a2a', p: '#f2a2b4', P: '#d27a92', l: '#fcd0da', W: '#ffffff', e: '#101010', w: '#e0d4a8', b: '#8e7c4a' }, [
    '................',
    '................',
    '.......kkkk.....',
    '.....kkllppk....',
    '....kllppppPk...',
    '...kpWWppppPk...',
    '...kpWepppppk...',
    'kkkkpppppppPk...',
    'kllpppppppPPk...',
    '.kkklppppPPPk...',
    '....klppppPPk...',
    '....klpppPPPk...',
    '..wwkkkkkkkkkww.',
    '.wbbwwbbbbwwbbw.',
    '..wwbbwwwwbbww..',
    '................',
  ]),
  toucan: npc({ k: '#120e10', b: '#2a2630', B: '#18141c', y: '#f8e060', Y: '#e0b030', w: '#fff8e0', c: '#3a9ae0', e: '#101010', o: '#f89a2a', O: '#e05a1a', R: '#c02a1a', g: '#5aaa3a', a: '#a8a8b0' }, [
    '................',
    '....kkkkk.......',
    '...kbbbbbk......',
    '..kbbbcekkkkkk..',
    '..kbbbcckoooooOk',
    '..kbyyyykoooOORk',
    '..kywwyyykkkkkk.',
    '..kyyyyyk.......',
    '..kRyyyYbk......',
    '..kbbbbbbbk.....',
    '..kbbBbbbbk.....',
    '...kbBbbbbk.....',
    '....kbbbbk......',
    '...kgkgggkk.....',
    '....kakkak......',
    '....kk..kk......',
  ]),
  capybara: npc({ k: '#24160c', b: '#a06a3a', B: '#7a4e28', l: '#c08a52', d: '#4a2e18', e: '#101010', h: '#f0d070', H: '#c8a040', r: '#d83a30', s: '#f4ecd8' }, [
    '................',
    '.....kkkkkk.....',
    '....khhhhhhk....',
    '...khhrrrrhhk...',
    '.kkhhhhhhhhhhkk.',
    '..kHHkkkkkkHHk..',
    '..kbbbbbbbbbbk..',
    '..kbebbbbbbebk..',
    '..kbbllllllbbk..',
    '..kbldddddlbbk..',
    '...kblllllbbk...',
    '..kbbbssssbbbk..',
    '.kbbbbbssbbbbbk.',
    '.kbBbbbbbbbbBbk.',
    '..kkBBkkkkBBkk..',
    '...kkk....kkk...',
  ]),
  tapir: npc({ k: '#141418', b: '#4a4a56', B: '#2e2e38', w: '#f4f4f4', W: '#c8c8d0', e: '#101010', p: '#e8a0b0', h: '#f0d070', H: '#c09838', r: '#e84a3a', c: '#3a3a44', s: '#7ad0f0' }, [
    '....kkkkkk......',
    '...khhhhhhk.....',
    '..khhrrrrhhk....',
    '.kkHHHHHHHHkk...',
    '..kbbbbbbbbk....',
    '..kbebbbbebk....',
    '..kbbbbbbbbk....',
    '...kbbBBbbk.....',
    '....kbBBbk......',
    '...kkkBBkkkk....',
    '..kbwwkBkwwbk...',
    '.kbbwwwkwwwbbk..',
    '.kbbwwwcswwbbk..',
    '..kbWwwwwwWbk...',
    '..kbbkkkkkbbk...',
    '..kkk.....kkk...',
  ]),
  armadillo: npc({ k: '#2a1a12', a: '#c8966a', A: '#8a5e3a', l: '#e8c494', d: '#5a3a22', e: '#101010', p: '#f0b8a8', g: '#e8c040', G: '#b08a20' }, [
    '................',
    '...kk.....kk....',
    '...kpk...kpk....',
    '....kkkkkkk.....',
    '...klllllllk....',
    '...kleklllekl...'.slice(0, 16),
    '....klllllk.....',
    '.....klplk......',
    '......kkk.......',
    '...kkkkkkkkk....',
    '..klAlAlAlAlk...',
    '.klaAaAaAaAaAk..',
    '.kaAaAaAaAaAak..',
    '.kAaAkgggkAaAkk.',
    '..kddkgGgkddkdk.',
    '...kk.kkk.kk.k..',
  ]),
  coati: npc({ k: '#1e120a', b: '#9a5a2e', B: '#6e3e1e', l: '#e8c8a0', d: '#3a2416', e: '#101010', w: '#ffffff', n: '#2a1a10' }, [
    '................',
    '...kk....kk.....',
    '...kbk..kbk.....',
    '...kbbkkbbk.....',
    '..kbbbbbbbbk....',
    '..kwewbbwewk....',
    '..kbbbllbbbk....',
    '...kkbllbkk.....',
    '.....klnk.....kk',
    '....kbbbbk...kdk',
    '...kblllbbk.kbk.',
    '...kblllbbk.kdk.',
    '...kbbbbbbkkbk..',
    '....kbkkbkkdk...',
    '....kBk.kBkk....',
    '....kk...kk.....',
  ]),
  hummingbird: npc({ k: '#0e1a14', g: '#2ab07a', G: '#16805a', t: '#7ae0c0', r: '#e8305a', R: '#a81a3a', w: '#c8f0ff', W: '#8ad0f0', e: '#101010', n: '#2a2a2a', y: '#f8e060' }, [
    '................',
    '.ww.......ww....',
    'wWWw.....wWWw...',
    '.wWWw...wWWw....',
    '..wWWwkwWWw.....',
    '...wwkgkww......',
    '....kgggek......',
    '....kgtggknnnn..',
    '....krrrrk......',
    '....kRrrgk......',
    '.....kgggk......',
    '.....kgGgk......',
    '......kGGk......',
    '......kGkk......',
    '.......kGk......',
    '........k.......',
  ]),
  howler: npc({ k: '#1e0c06', r: '#9a3a1a', R: '#6e2410', l: '#c86a3a', d: '#3a1a0e', e: '#101010', s: '#f0d8b8', b: '#2a5a8a', B: '#1a3a5a', y: '#e8c040' }, [
    '................',
    '....kkkkkkk.....',
    '...krrrrrrrk....',
    '..krlllllllrk...',
    '..krldddddlrk...',
    '..krdeddeddrk...',
    '..krddddddrk....',
    '...krddddrrk....',
    '...krrdddrrk....',
    '...kkrrrrrkk....',
    '..krkbbbbbkrk...',
    '..krkbyyybkrk.kk',
    '..kkrbbbbbrkk.kr',
    '....krRkkRrk.krk',
    '....krk..krkkrk.',
    '....kk....kkkk..',
  ]),
  anteater: npc({ k: '#1a1410', g: '#8a7a68', G: '#5e5040', d: '#2a2420', w: '#f4ecdc', W: '#c8bca8', e: '#101010', a: '#f080a0', A: '#c05a78', t: '#6a5a4a' }, [
    '................',
    '..........kk....',
    '.........kgk....',
    '........kgggk...',
    'kkkkkkkkggegk...',
    'kdggggggggggk...',
    '.kkkkkkkgggk....',
    '.......kgwwk....',
    'kk....kgwwwgk...',
    'ktk..kgdaAadgk..',
    'kttkkggaAaAgGk..',
    '.kttkggaAaAgGk..',
    '..kttkgaAaAgk...',
    '...kkkgGGGGk....',
    '.....kGkkkGk....',
    '.....kk...kk....',
  ]),
  iguana: npc({ k: '#142010', g: '#5aaa3a', G: '#3a7a2a', l: '#9ad860', d: '#24501c', o: '#e8902a', e: '#101010', w: '#f8f0c0', s: '#c8d850' }, [
    '................',
    '................',
    '..........kkk...',
    '........kkgggk..',
    '.......kgglgegk.',
    '......kgsgggggkk',
    '.....kgsgGgggoo.'.replace('oo.', 'okk').slice(0, 16),
    '....kgsgGGkkokk.',
    '...kggsgGGGGk...',
    '..kgGgggggGGGk..',
    '.kgkdgdgdgkGGk..',
    '.kdk.kGk..kGk...',
    'kdk..kk...kk....',
    'kk..............',
    '................',
    '................',
  ]),
  jaguar: npc({ k: '#1e1208', y: '#e8a838', Y: '#c07a20', l: '#f8e0b0', s: '#2a1a0e', e: '#101010', g: '#e8f050', n: '#3a2016', c: '#2a5a3a', C: '#1a3a26', b: '#f0c040', w: '#ffffff' }, [
    '..kk......kk....',
    '..kyk....kyk....',
    '..kysykkkysk....',
    '..kyyyysyyyk....',
    '.kysyyyyysyyk...',
    '.kyygeyyegyyk...',
    '.kyyllyyllyyk...',
    '..kylllnllyk....',
    '...kklllllkk....',
    '...kcccbcccck...',
    '..kcCccwccCck...',
    '..kykccbccckyk..',
    '...kkccccccck.kk',
    '....kyskksyk.ksk',
    '....kyk..kykkyk.',
    '....kk....kkkk..',
  ]),
};

// ---------------------------------------------------------------- items and fruit

const ICONS: Record<string, Pix> = {
  jg_liana_brown: npc({ k: '#1e120a', b: '#8a5a2e', B: '#5a3a1a', l: '#b07a44', g: '#3a8a2a' }, [
    '.........kk.....', '........kblk....', '.......kbBk.....', '......kbBk......', '......kbBk..kk..', '.....kbBk..kgk..', '.....kbBkkkgk...', '....kbBk.kgk....',
    '....kbBk..k.....', '...kbBk.........', '...kbBk.........', '..kblk..........', '..kbBk..........', '.kbBk...........', '.kBk............', '..k.............',
  ]),
  jg_liana_green: npc({ k: '#14200c', g: '#6aaa3a', G: '#3a7a24', l: '#a8d870' }, [
    '..........k.....', '.........kgk....', '........kGk.....', '.......kgk......', '.......kGk.kk...', '......kgk.klk...', '......kGkklk....', '.....kgk.kk.....',
    '.....kGk........', '....kgk.........', '....kGk.........', '...kgk..........', '...kGk..........', '..kgk...........', '..kk............', '................',
  ]),
  jg_liana_flower: npc({ k: '#1a140c', g: '#7a9a3a', G: '#4a6a24', p: '#f070b0', P: '#b03a7a', y: '#f8e060' }, [
    '..........k.....', '.........kgk....', '........kGkkk...', '.......kgkpPk...', '.......kGkkpk...', '......kgk..k....', '.....kkGk.......', '....kpkgk.......',
    '....kPpGk.......', '.....kgk........', '....kgGk..kk....', '...kgkkk.kypk...', '...kGk...kpPk...', '..kgk.....kk....', '..kk............', '................',
  ]),
  jg_banana: npc({ k: '#3a2a08', y: '#f8e060', Y: '#d8b830', l: '#fff4a8', g: '#6a8a2a', b: '#5a3a1a' }, [
    '................', '..........kk....', '.........kgk....', '........kbk.....', '.......kyyk.....', '......kyyYk.....', '.....kylyYk.....', '....kyylyYk.....',
    '...kyylyYk......', '..kyylyYYk......', '.kyylyYYk.......', '.kyyyYYk........', '.kkYYYk.........', '..kkkk..........', '................', '................',
  ]),
  jg_camera: npc({ k: '#141418', b: '#3a3a44', B: '#24242c', g: '#8a8a96', w: '#ffffff', l: '#7ab8f0', L: '#2a5a9a', r: '#e04030', s: '#c8a060' }, [
    '................', '................', '.....kkkk.......', '....kggggk...kk.', '.kkkkkkkkkkkkrk.', 'kbbbbbbbbbbbbbbk', 'kbgggkkkkkgggbbk', 'kbbbklllLLkbbbBk',
    'kbbbkllwLLkbbbBk', 'kbbbkLlLLLkbbbBk', 'kbbbkLLLLLkbbbBk', 'kBBBBkkkkkBBBBBk', '.kkkkkkkkkkkkkk.', '..s.........s...', '...ssssssssss...', '................',
  ]),
  jg_poncho: npc({ k: '#1a1a24', y: '#f8d040', Y: '#c8a020', l: '#fff0a0', s: '#e86a2a' }, [
    '................', '......kkkk......', '.....kyyyyk.....', '....kylyyYYk....', '....kyykkYYk....', '...kyyk..kYYk...', '..kyylkkkkYYYk..', '.kyyylyyyyYYYYk.',
    'kyyyylyyyyyYYYYk', 'kssssssssssssssk', 'kyyyyyyyyyyYYYYk', 'kyyyylyyyyyYYYYk', 'kssssssssssssssk', '.kyyyyyyyyYYYYk.', '..kkkkkkkkkkkk..', '................',
  ]),
  jg_spray: npc({ k: '#141418', g: '#3ab84a', G: '#2a8a3a', w: '#ffffff', W: '#c8c8d0', r: '#e04030', m: '#3a3a3a' }, [
    '................', '......kkk.......', '......kmkk......', '.....kkkkk......', '.....kWWWk......', '....kgggggk.....', '....kgwwwGk.....', '....kgwmwGk.....',
    '....kgwwwGk.....', '....kgrrrGk.....', '....kgggggk.....', '....kgggGGk.....', '....kgggGGk.....', '....kkkkkkk.....', '................', '................',
  ]),
};
const FRUIT: Record<string, Pix> = {
  jg_banana: ICONS.jg_banana,
  jg_mango: npc({ k: '#3a1a08', r: '#e8502a', o: '#f89a2a', y: '#f8d040', g: '#4a9a3a', G: '#2a6a24', l: '#ffe0a0' }, [
    '................', '................', '........kk......', '.......kGgk.....', '......kGgk......', '.....kkkkkk.....', '....krrooook....', '...krrooyylok...',
    '...kroooyyyok..'.padEnd(16, '.'), '...krrooyyyok...', '...krroooyyok...', '....krrooook....', '.....kkkkkk.....', '................', '................', '................',
  ]),
  jg_papaya: npc({ k: '#2a1a08', o: '#f89a3a', O: '#d86a1a', g: '#6aa03a', G: '#3a7a2a', b: '#1a1a1a', l: '#ffd090' }, [
    '................', '................', '.....kkkkk......', '....kgggGGk.....', '...kgkooookk....', '...kgoolllOk....', '...kgolbbblOk...', '...kgolbbblOk...',
    '...kgolbbbOOk...', '...kgoolllOOk...', '....kgooooOk....', '....kGgoooOk....', '.....kkkkkk.....', '................', '................', '................',
  ]),
  jg_pineapple: npc({ k: '#2a1a08', g: '#4aa03a', G: '#2a6a24', y: '#f8c840', Y: '#c8902a', b: '#8a5a1a' }, [
    '......k..k......', '.....kgkkgk.....', '....kgGkgGk.....', '.....kGgGk......', '......kgk.......', '.....kkkkk......', '....kyYyYyk.....', '....kYbYbYk.....',
    '....kyYyYyk.....', '....kYbYbYk.....', '....kyYyYyk.....', '....kYbYbYk.....', '....kyYyYyk.....', '.....kkkkk......', '................', '................',
  ]),
  jg_coconut: npc({ k: '#1e1208', b: '#6a4220', B: '#4a2a12', l: '#8a5a30', w: '#fffaf0', W: '#e8e0d0' }, [
    '................', '................', '................', '.....kkkkkk.....', '....kbllbbBk....', '...kblbbbbbBk...', '...kbbkbkbbBk...', '...kbbbbbbBBk...',
    '...kkkkkkkkkk...', '...kwwwwwwwWk...', '...kbwwwwwWBk...', '....kbBBBBBk....', '.....kkkkkk.....', '................', '................', '................',
  ]),
  jg_maracuja: npc({ k: '#1e0e1a', p: '#8a3a8a', P: '#5a1e5a', l: '#c070c0', g: '#4a8a2a', y: '#f8d040', w: '#e8d8e8' }, [
    '................', '................', '................', '.......kk.......', '......kgk.......', '.....kkkkk......', '....kplpppk.....', '...kplpppPPk....',
    '...kpwpppPPk....', '...kppppPPPk....', '...kpppPPPPk....', '....kPPPPPk.....', '.....kkkkk......', '................', '................', '................',
  ]),
};

// ---------------------------------------------------------------- buildings and props

const THATCH = ['#4a2e12', '#7a5626', '#a07a3a', '#c49c52', '#e0bc70'].map(H);
const PALMLEAF = ['#1e3e1a', '#2e5e24', '#4a7e2e', '#6e9e3e', '#a8b860'].map(H);

/**
 * A hip roof from (x0, y0) to (x1, y1) (inclusive), `inset` narrower at the ridge: straw thatch in shaggy layers or
 * overlapping palm leaves; lit from the top left, a ragged fringe at the eaves.
 */
function roof(p: Pix, x0: number, y0: number, x1: number, y1: number, inset: number, kind: 'thatch' | 'palm', seed: number) {
  const tones = kind === 'thatch' ? THATCH : PALMLEAF;
  const out = H(kind === 'thatch' ? '#2a1808' : '#0e2010');
  const h = y1 - y0;
  for (let y = y0; y <= y1; y++) {
    const t = (y - y0) / h;
    const ins = Math.round(inset * (1 - t));
    const l = x0 + ins, r = x1 - ins;
    for (let x = l; x <= r; x++) {
      const layer = Math.floor((y - y0) / 5), ly = (y - y0) % 5;
      let k: number;
      if (kind === 'thatch') {
        const streak = hash(x, layer, seed) < 0.3 ? -1 : hash(x, layer, seed + 1) < 0.2 ? 1 : 0;
        k = (t < 0.3 ? 4 : t < 0.65 ? 3 : 2) + streak - (ly === 4 ? 2 : 0);
        if (x - l < 3) k += 1; // lit left slope
        if (r - x < 4) k -= 1;
      } else {
        // overlapping leaves: scallops per layer
        const lx = (x + (layer % 2) * 3) % 6;
        const scallop = ly >= 3 + (lx === 0 || lx === 5 ? -1 : 0);
        k = (t < 0.3 ? 3 : t < 0.65 ? 2 : 1) + (lx < 2 ? 1 : 0) - (scallop ? 1 : 0);
        if (x - l < 3) k += 1;
        if (r - x < 4) k -= 1;
      }
      const c = tones[Math.max(0, Math.min(tones.length - 1, k))];
      p.set(x, y, x === l || x === r || y === y0 ? out : c);
    }
  }
  // ragged fringe at the eaves
  for (let x = x0; x <= x1; x++) {
    const d = 1 + Math.floor(hash(x, y1, seed + 2) * 3);
    for (let y = y1 + 1; y <= y1 + d; y++) p.set(x, y, y === y1 + d ? out : tones[kind === 'thatch' ? 1 : 0]);
  }
  // ridge
  for (let x = x0 + inset; x <= x1 - inset; x++) { p.set(x, y0, out); p.set(x, y0 + 1, tones[tones.length - 1]); }
}

interface HouseOpts { w: number; roof: 'thatch' | 'palm'; wall: [string, string, string]; door: number; sign?: 'coin' | 'stamp' | 'flag'; seed: number; ground?: boolean }

/**
 * A house on stilts, `w` tiles wide and 5 tall (its footprint the lower 3 rows): roof, plank walls with a window and
 * a curtained doorway, a veranda with a railing, and the stilts with a ladder up to the door (tile column `door`).
 */
function stiltHouse(o: HouseOpts): Pix {
  const W = o.w * T, Hh = 80;
  const p = new Pix(W, Hh);
  const out = H('#1e120a');
  const [wl, wm, wd] = o.wall.map(H);
  const dx = o.door * T + 8; // the ladder's centre
  // shadows of the posts on the ground / water
  for (const px of [6, dx, W - 7]) shadowEllipse(p, px, 78, 4, 1, H('#0a2a2266'));
  // stilts and cross braces
  const posts = o.ground ? [5, W - 7] : [5, Math.round(W / 2) - 1 + (o.door * T + 8 < W / 2 ? 10 : -10), W - 7];
  for (const px of posts) for (let y = 54; y < 79; y++) { p.set(px - 1, y, out); p.set(px, y, WOOD[2]); p.set(px + 1, y, WOOD[1]); p.set(px + 2, y, out); }
  // cross braces between the stilts
  for (let k = 0; k + 1 < posts.length; k++) {
    const a = posts[k] + 2, b = posts[k + 1] - 1;
    if (b - a < 6) continue;
    for (let i = 0; i <= b - a; i++) {
      const t = i / (b - a);
      const y1 = Math.round(58 + t * 15), y2 = Math.round(73 - t * 15);
      p.set(a + i, y1, WOOD[1]); p.set(a + i, y1 + 1, WOOD[0]);
      p.set(a + i, y2, WOOD[2]); p.set(a + i, y2 + 1, WOOD[0]);
    }
  }
  // the ladder to the door
  for (let y = 52; y < 80; y++) { p.set(dx - 5, y, out); p.set(dx - 4, y, WOOD[3]); p.set(dx + 3, y, WOOD[2]); p.set(dx + 4, y, out); }
  for (let y = 55; y < 79; y += 4) for (let x = dx - 3; x < dx + 3; x++) { p.set(x, y, WOOD[3]); p.set(x, y + 1, WOOD[0]); }
  // veranda floor
  for (let y = 50; y < 55; y++) for (let x = 1; x < W - 1; x++) p.set(x, y, x === 1 || x === W - 2 || y === 54 ? out : y === 50 ? WOOD[4] : (x + Math.floor(y / 2)) % 7 === 0 ? WOOD[1] : WOOD[2]);
  for (let x = 2; x < W - 2; x++) p.set(x, 53, WOOD[1]);
  // walls: vertical planks
  for (let y = 26; y < 50; y++) for (let x = 4; x < W - 4; x++) {
    const edge = x === 4 || x === W - 5;
    const slat = (x - 4) % 4 === 3;
    const c = edge ? out : slat ? wd : (x - 4) % 4 === 0 ? wl : wm;
    p.set(x, y, c);
  }
  for (let x = 4; x < W - 4; x++) p.set(x, 49, out);
  // the doorway with a striped curtain
  for (let y = 33; y < 50; y++) for (let x = dx - 5; x <= dx + 5; x++) {
    const frame = x === dx - 5 || x === dx + 5 || y === 33;
    p.set(x, y, frame ? out : y < 36 ? H('#2a1a10') : (Math.floor((x - dx + 6) / 2) % 3 === 0 ? H('#d83a30') : Math.floor((x - dx + 6) / 2) % 3 === 1 ? H('#f8d040') : H('#2a8a5a')));
  }
  // windows with shutters propped open
  const winX = [dx - 5 - 15, dx + 5 + 5].filter((x) => x >= 7 && x + 10 <= W - 7);
  for (const wx of winX) {
    for (let y = 34; y < 43; y++) for (let x = wx; x < wx + 10; x++) {
      const frame = x === wx || x === wx + 9 || y === 34 || y === 42;
      p.set(x, y, frame ? out : y < 37 ? H('#3a2414') : H('#1e140c'));
    }
    for (let x = wx + 1; x < wx + 9; x++) p.set(x, 37, H('#5a3a22'));
    for (let x = wx - 1; x < wx + 11; x++) { p.set(x, 31, out); p.set(x, 32, WOOD[3]); p.set(x, 33, WOOD[1]); }
    // a potted plant on the sill
    p.set(wx + 3, 41, H('#c0603a')); p.set(wx + 4, 41, H('#c0603a')); p.set(wx + 3, 40, H('#4a9a3a')); p.set(wx + 4, 39, H('#7cc25a')); p.set(wx + 2, 39, H('#4a9a3a'));
  }
  // railing on the veranda (open at the ladder)
  for (let x = 2; x < W - 2; x++) {
    if (Math.abs(x - dx) <= 6) continue;
    p.set(x, 45, WOOD[3]); p.set(x, 46, WOOD[0]);
    if (x % 6 === 2) for (let y = 45; y < 50; y++) { p.set(x, y, WOOD[2]); p.set(x + 1, y, WOOD[0]); }
  }
  // roof
  roof(p, 0, 2, W - 1, 28, Math.round(W * 0.18), o.roof, o.seed);
  // signs
  if (o.sign === 'coin') {
    // a round gold sign with a cocoa bean
    const cx = winX.length ? winX[0] + 5 : 10, cy = 21;
    for (let y = 28; y < 31; y++) p.set(cx, y, out);
    for (let y = -6; y <= 6; y++) for (let x = -6; x <= 6; x++) { const d = Math.hypot(x, y); if (d <= 6.5) p.set(cx + x, cy + 9 + y + 6, d > 5.5 ? out : d > 4.5 ? H('#c89020') : x + y < -3 ? H('#fff0a0') : H('#f0c840')); }
    for (const [x, y] of [[0, -2], [-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1], [0, 2]]) p.set(cx + x, cy + 15 + y, H('#6a3a18'));
    for (const y of [-1, 0, 1]) p.set(cx, cy + 15 + y, H('#a8682e'));
  }
  if (o.sign === 'stamp') {
    // a board with a stamp mark over the door
    for (let y = 20; y < 30; y++) for (let x = dx - 9; x <= dx + 9; x++) p.set(x, y, x === dx - 9 || x === dx + 9 || y === 20 || y === 29 ? out : H('#f4e8c8'));
    for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) if (Math.abs(Math.hypot(x, y) - 3) < 0.8) p.set(dx + x, 25 + y, H('#1e6a3a'));
    p.set(dx, 25, H('#1e6a3a'));
  }
  return p;
}

/** A shady market stall (2×1): four poles, a thatch or palm roof, a counter piled with fruit or hung with ponchos. */
function marketStall(kind: 'fruit' | 'poncho'): Pix {
  const p = new Pix(32, 40);
  const out = H('#1e120a');
  shadowEllipse(p, 16, 38, 15, 2, H('#0a2a2266'));
  for (const px of [2, 28]) for (let y = 12; y < 39; y++) { p.set(px, y, out); p.set(px + 1, y, WOOD[3]); p.set(px + 2, y, out); }
  // counter
  for (let y = 26; y < 39; y++) for (let x = 0; x < 32; x++) p.set(x, y, x === 0 || x === 31 || y === 26 || y === 38 ? out : y === 27 ? WOOD[4] : (x % 5 === 0 ? WOOD[1] : y > 34 ? WOOD[2] : WOOD[3]));
  if (kind === 'fruit') {
    // baskets of bananas, mangos, papayas, pineapple
    const pile = (x: number, cols: string[]) => {
      for (let y = 0; y < 6; y++) for (let k = 0; k < 9; k++) {
        const w = 4 - Math.abs(4 - k), top = 5 - Math.min(5, w + 1);
        if (y < top) continue;
        p.set(x + k, 20 + y, H(cols[(k + y) % cols.length]));
      }
      for (let k = 0; k < 9; k++) { p.set(x + k, 26, out); p.set(x + k, 25, H('#b8843a')); }
    };
    pile(2, ['#f8e060', '#e0c030', '#f8e060']);
    pile(12, ['#f08a28', '#e8502a', '#f8b040']);
    pile(22, ['#f89a3a', '#6aa03a', '#f89a3a']);
    // a pineapple and a bunch of bananas hanging
    for (let y = 13; y < 17; y++) { p.set(9, y, H('#4a3a1a')); }
    for (const [x, y] of [[8, 17], [9, 17], [10, 17], [8, 18], [9, 18], [10, 18], [9, 19]]) p.set(x, y, H(y === 19 ? '#c8a020' : '#f8e060'));
    for (let y = 13; y < 16; y++) p.set(22, y, H('#4a3a1a'));
    for (const [x, y, c] of [[21, 16, '#4aa03a'], [23, 16, '#4aa03a'], [22, 16, '#2a6a24'], [21, 17, '#f8c840'], [22, 17, '#c8902a'], [23, 17, '#f8c840'], [21, 18, '#c8902a'], [22, 18, '#f8c840'], [23, 18, '#c8902a'], [22, 19, '#c8902a']] as [number, number, string][]) p.set(x, y, H(c));
  } else {
    // ponchos in bright colours hanging from a rail, spray cans on the counter
    for (let x = 4; x < 28; x++) p.set(x, 13, WOOD[1]);
    for (const [x, c, d] of [[5, '#f8d040', '#c8a020'], [13, '#e85a3a', '#b03a22'], [21, '#3a8ae8', '#2a5aa8']] as [number, string, string][]) {
      for (let y = 14; y < 24; y++) { const w = Math.min(3, y - 13); for (let k = -w; k <= w + 1; k++) p.set(x + 2 + k, y, y === 23 || k === -w || k === w + 1 ? out : k > 0 ? H(d) : H(c)); }
    }
    for (const x of [6, 11, 16]) { for (let y = 20; y < 26; y++) { p.set(x, y, y === 20 ? out : H('#3ab84a')); p.set(x + 1, y, y === 20 ? out : H('#2a8a3a')); } p.set(x, 22, H('#ffffff')); }
  }
  roof(p, 0, 0, 31, 11, 4, kind === 'fruit' ? 'palm' : 'thatch', kind === 'fruit' ? 71 : 73);
  return p;
}

/** The boat to the waterfall (3×2): a long wooden riverboat with a palm-leaf awning, moored and gently afloat. */
function riverboat(): Pix {
  const p = new Pix(48, 36);
  const out = H('#1e120a');
  // waterline ripples
  for (let x = 2; x < 46; x++) { p.set(x, 33, H('#cfc29388')); if (x % 3) p.set(x, 34, H('#b8a87488')); }
  // hull, seen from the side and a little above
  poly(p, [[1, 20], [46, 20], [43, 32], [5, 32]], (x, y) => (y === 20 ? out : y < 23 ? WOOD[4] : y < 27 ? WOOD[2] : y < 31 ? WOOD[1] : out));
  for (let y = 20; y < 33; y++) { p.set(1 + Math.floor((y - 20) / 3), y, out); p.set(46 - Math.floor((y - 20) / 3), y, out); }
  for (let x = 4; x < 44; x++) { p.set(x, 25, WOOD[0]); if (x % 6 === 0) for (let y = 21; y < 31; y++) p.set(x, y, WOOD[1]); }
  // the deck and benches
  for (let x = 5; x < 43; x++) { p.set(x, 18, WOOD[3]); p.set(x, 19, WOOD[2]); }
  // the awning on posts
  for (const px of [10, 37]) for (let y = 7; y < 19; y++) { p.set(px, y, out); p.set(px + 1, y, WOOD[3]); }
  roof(p, 6, 0, 42, 7, 3, 'palm', 75);
  // a red-and-yellow pennant
  for (let y = 0; y < 6; y++) p.set(44, y, out);
  for (const [x, y] of [[40, 0], [41, 0], [42, 0], [43, 0], [41, 1], [42, 1], [43, 1], [43, 2], [42, 2]]) p.set(x, y, H(x < 42 ? '#d83a30' : '#f8d040'));
  // a lifebuoy
  for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) { const d = Math.hypot(x, y); if (d <= 3.4 && d > 1.5) p.set(24 + x, 22 + y, (Math.atan2(y, x) * 2 / Math.PI + 4) % 2 < 1 ? H('#f4f4f4') : H('#e84a2a')); }
  return p;
}

function canoe(): Pix {
  const p = new Pix(32, 16);
  const out = H('#1e120a');
  for (let x = 2; x < 30; x++) { p.set(x, 13, H('#cfc29388')); }
  poly(p, [[1, 6], [31, 6], [27, 12], [5, 12]], (x, y) => (y === 6 ? out : y < 8 ? WOOD[4] : y < 11 ? WOOD[2] : out));
  for (let y = 6; y < 13; y++) { p.set(1 + Math.floor((y - 6) / 2), y, out); p.set(30 - Math.floor((y - 6) / 2), y, out); }
  for (let x = 5; x < 27; x++) p.set(x, 7, WOOD[1]);
  // a paddle lying across
  for (let x = 8; x < 24; x++) p.set(x, 5 + Math.round((x - 8) / 8), WOOD[3]);
  for (let x = 21; x < 26; x++) { p.set(x, 7, WOOD[4]); p.set(x, 8, WOOD[2]); }
  return p;
}

/** The broken rope bridge over the river (4×2): torn ropes, planks hanging into the brown water, a gap in the middle. */
/** Draws with the Rainforest's palette (for props that show its terrain), then puts the theme back. */
function useJungle(f: () => void) { const was = currentTheme(); useTheme('jungle'); f(); useTheme(was); }

function brokenBridge(): Pix {
  const p = new Pix(64, 32);
  // the river under it, drawn like the river around it (a 4-tile-wide river with banks to both sides)
  useJungle(() => { for (let y = 0; y < 2; y++) for (let x = 0; x < 4; x++) river(p, x * T, y * T, x, y, (ax) => (ax >= 0 && ax < 4 ? '~' : '.'), 0, false); });
  const out = H('#1e120a'), rope = H('#d8b878'), ropeD = H('#8a6a38');
  // stubs of the bridge at both banks
  const stub = (x0: number, x1: number, slope: number) => {
    for (let x = x0; x < x1; x++) {
      const drop = Math.round(Math.abs(x - (slope > 0 ? x0 : x1 - 1)) * 0.25);
      for (let y = 4 + drop; y < 28 + drop && y < 32; y++) {
        const across = y - 4 - drop;
        const seam = x % 4 === 3;
        p.set(x, y, across === 0 ? WOOD[4] : across >= 22 ? WOOD[0] : seam ? WOOD[1] : WOOD[2 + (Math.floor(x / 4) % 2)]);
      }
    }
  };
  stub(0, 13, 1);
  stub(52, 64, -1);
  // planks dangling into the water and floating away
  for (const [x, y, w, h] of [[14, 10, 3, 9], [18, 22, 6, 3], [45, 6, 3, 12], [36, 17, 7, 3], [27, 26, 4, 3]] as [number, number, number, number][]) {
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) p.set(xx, yy, xx === x || yy === y + h - 1 ? out : WOOD[2]);
    for (let xx = x - 1; xx <= x + w; xx++) p.set(xx, y + h, H('#cfc293'));
  }
  // torn ropes sagging into the river
  for (const [y0] of [[2], [27]]) {
    for (let x = 0; x < 22; x++) { const y = y0 + Math.round(Math.pow(x / 22, 2) * 12); p.set(x, y, rope); p.set(x, y + 1, ropeD); }
    for (let x = 63; x > 42; x--) { const y = y0 + Math.round(Math.pow((63 - x) / 21, 2) * 10); p.set(x, y, rope); p.set(x, y + 1, ropeD); }
  }
  // posts at the banks
  for (const px of [1, 60]) for (const py of [0, 24]) { for (let y = py; y < py + 8; y++) { p.set(px, y, out); p.set(px + 1, y, WOOD[3]); p.set(px + 2, y, out); } }
  return p;
}

/** A rope barrier on two posts across a one-tile jetty, with a little "tickets" board. */
function jettyRope(): Pix {
  const p = new Pix(16, 24);
  const out = H('#1e120a'), rope = H('#d8b878'), ropeD = H('#8a6a38');
  for (const px of [1, 13]) { for (let y = 8; y < 23; y++) { p.set(px, y, out); p.set(px + 1, y, WOOD[3]); p.set(px + 2, y, out); } p.set(px + 1, 7, out); }
  for (let x = 3; x < 13; x++) { const y = 12 + Math.round(Math.sin((x - 3) / 10 * Math.PI) * 2); p.set(x, y, rope); p.set(x, y + 1, ropeD); }
  // the board hanging from the rope: a ticket
  for (let y = 15; y < 22; y++) for (let x = 4; x < 12; x++) p.set(x, y, x === 4 || x === 11 || y === 15 || y === 21 ? out : H('#f4e8c8'));
  for (let x = 6; x < 10; x++) { p.set(x, 17, H('#d83a30')); p.set(x, 19, H('#2a2a2a')); }
  return p;
}

/** The rope across the wet steps by the waterfall (2×1), with a red warning board. */
function trailRope(): Pix {
  const p = new Pix(32, 28);
  const out = H('#1e120a'), rope = H('#d8b878'), ropeD = H('#8a6a38');
  for (const px of [1, 28]) { for (let y = 10; y < 27; y++) { p.set(px, y, out); p.set(px + 1, y, WOOD[3]); p.set(px + 2, y, out); } p.set(px + 1, 9, out); }
  for (const yy of [14, 20]) for (let x = 4; x < 28; x++) { const y = yy + Math.round(Math.sin((x - 4) / 24 * Math.PI) * 2); p.set(x, y, rope); p.set(x, y + 1, ropeD); }
  // red and white warning flags on the rope
  for (const fx of [9, 20]) for (let y = 0; y < 4; y++) for (let x = 0; x < 3 - Math.floor(y / 2); x++) p.set(fx + x, 16 + y + Math.round(Math.sin((fx - 4) / 24 * Math.PI) * 2), H(y % 2 ? '#ffffff' : '#e03a2a'));
  // a warning board on a stake: a red triangle
  for (let y = 0; y < 11; y++) for (let x = 10; x < 22; x++) p.set(x, y, x === 10 || x === 21 || y === 0 || y === 10 ? out : H('#f4e8c8'));
  for (let y = 2; y < 9; y++) for (let x = 16 - (y - 2) / 1.3; x <= 15 + (y - 2) / 1.3; x++) p.set(Math.round(x), y, y === 8 || Math.abs(x - 15.5) > (y - 2) / 1.3 - 1 ? H('#d83a30') : H('#f8d040'));
  p.set(15, 4, out); p.set(15, 5, out); p.set(16, 4, out); p.set(16, 5, out); p.set(15, 7, out); p.set(16, 7, out);
  return p;
}

/** A big crown of leaf clumps (for the giant trees that are props), centred on cx, from y0 down to y1. */
function leafCrown(p: Pix, cx: number, y0: number, w: number, h: number, seed: number) {
  const L = new Pix(p.w, p.h);
  const tones = LEAF_TONES[seed % 2];
  const rows = Math.max(2, Math.round(h / 9));
  for (let r = 0; r < rows; r++) {
    const y = y0 + 9 + (r * (h - 13)) / Math.max(1, rows - 1);
    const half = (w / 2 - 7) * Math.sqrt(1 - Math.pow((rows - 1 - r) / rows, 2));
    const n = Math.max(1, Math.round((half * 2) / 9) + 1);
    for (let i = 0; i < n; i++) {
      const x = n === 1 ? cx : cx - half + (i * half * 2) / (n - 1);
      const lift = r === rows - 1 ? 1 : r === 0 ? -1 : 0;
      for (let k = 0; k < 6; k++) {
        const ang = -Math.PI / 2 + (k - 2.5) * 0.62 + (hash(Math.round(x), k + r * 7, seed) - 0.5) * 0.4 + (r === rows - 1 ? 0.3 * Math.sign(x - cx) : 0);
        bigLeaf(L, Math.round(x), Math.round(y) + 3, ang, 7 + hash(Math.round(x), k, seed + 1) * 3, 2.8, tones, lift + 1);
      }
      if (r === rows - 1) bigLeaf(L, Math.round(x), Math.round(y) + 3, Math.PI / 2 + (hash(i, r, seed) - 0.5), 6, 2.4, tones, 0);
    }
  }
  p.blit(L, 0, 0);
}

/** A big tree with three lianas hanging to the ground (3×2): a thick brown one, a thin green one, one in flower. */
function lianaTree(): Pix {
  const p = new Pix(48, 80);
  shadowEllipse(p, 24, 76, 20, 3, H('#0a2a2066'));
  buttressTrunk(p, 24, 40, 78, 8, KAPOK_BARK, 21);
  leafCrown(p, 24, 0, 48, 42, 61);
  // the three lianas, clearly different
  const thick = (x: number) => { for (let y = 36; y < 76; y++) { const lx = Math.round(x + Math.sin((y - 36) / 40 * Math.PI) * 3); p.set(lx - 1, y, H('#1e120a')); p.set(lx, y, H('#b07a44')); p.set(lx + 1, y, H('#8a5a2e')); p.set(lx + 2, y, H('#5a3a1a')); p.set(lx + 3, y, H('#1e120a')); if (y % 6 === 0) p.set(lx + 1, y, H('#5a3a1a')); } };
  thick(6);
  for (let y = 38; y < 74; y++) { const lx = Math.round(40 + Math.sin((y - 38) / 36 * Math.PI) * -2); p.set(lx, y, H('#6aaa3a')); p.set(lx + 1, y, H('#2e5a1e')); if (y % 5 === 0) { p.set(lx - 1, y, H('#a8d870')); p.set(lx - 2, y - 1, H('#6aaa3a')); } }
  for (let y = 40; y < 70; y++) {
    const lx = Math.round(33 + Math.sin((y - 40) / 30 * Math.PI) * 1.5);
    p.set(lx, y, H('#7a9a3a')); p.set(lx + 1, y, H('#3a5a1e'));
    if (y % 7 === 3) for (const [dx, dy, c] of [[-1, 0, '#f070b0'], [1, -1, '#f070b0'], [0, -1, '#fff0f8'], [-1, -1, '#b03a7a'], [2, 0, '#f070b0']] as [number, number, string][]) p.set(lx + dx, y + dy, H(c));
  }
  return p;
}

/** A giant kapok with a ladder up its trunk to Canopy Village (3×2); its door is the ladder's foot. */
function ladderTree(): Pix {
  const p = new Pix(48, 112);
  shadowEllipse(p, 24, 108, 21, 3, H('#0a2a2066'));
  buttressTrunk(p, 24, 34, 110, 12, KAPOK_BARK, 23);
  leafCrown(p, 24, 0, 48, 40, 63);
  // the platform up in the tree
  for (let y = 38; y < 42; y++) for (let x = 6; x < 42; x++) p.set(x, y, y === 38 ? WOOD[4] : y === 41 ? H('#1e120a') : WOOD[2]);
  for (const x of [8, 39]) for (let y = 42; y < 47; y++) p.set(x, y, WOOD[0]);
  // ladder from the ground up to the platform
  const out = H('#1e120a');
  for (let y = 40; y < 110; y++) { p.set(19, y, out); p.set(20, y, WOOD[3]); p.set(27, y, WOOD[2]); p.set(28, y, out); }
  for (let y = 43; y < 109; y += 4) for (let x = 21; x < 27; x++) { p.set(x, y, WOOD[4]); p.set(x, y + 1, WOOD[0]); }
  // a little sign: an arrow up
  for (let y = 86; y < 94; y++) for (let x = 31; x < 41; x++) p.set(x, y, x === 31 || x === 40 || y === 86 || y === 93 ? out : H('#f4e8c8'));
  for (const [x, y] of [[35, 88], [36, 88], [34, 89], [37, 89], [35, 89], [36, 89], [35, 90], [36, 90], [35, 91], [36, 91]]) p.set(x, y, H('#1e6a3a'));
  liana(p, 5, 34, 76, 2, H('#2a4a1a'), H('#4a8a34'), 65);
  liana(p, 43, 34, 66, -2, H('#2a4a1a'), H('#4a8a34'), 67);
  return p;
}

/** In Canopy Village: the top of the ladder down (1×1): two poles over a hatch in the deck. */
function ladderDown(): Pix {
  const p = new Pix(16, 28);
  const out = H('#1e120a');
  for (let y = 14; y < 27; y++) for (let x = 1; x < 15; x++) p.set(x, y, x === 1 || x === 14 || y === 14 || y === 26 ? out : H('#0a1a10'));
  for (let y = 4; y < 27; y++) { p.set(3, y, out); p.set(4, y, WOOD[3]); p.set(11, y, WOOD[2]); p.set(12, y, out); }
  for (let y = 7; y < 26; y += 4) for (let x = 5; x < 11; x++) { p.set(x, y, WOOD[4]); p.set(x, y + 1, WOOD[0]); }
  for (const x of [3, 12]) { p.set(x, 3, out); p.set(x + (x === 3 ? 1 : -1), 3, out); }
  return p;
}

/** A giant tree rising through the decks of Canopy Village (3×2): a mossy trunk ringed with planks, its crown above. */
function bigTrunk(): Pix {
  const p = new Pix(48, 96);
  shadowEllipse(p, 24, 94, 20, 2, H('#04140c88'));
  for (let y = 30; y < 95; y++) {
    const flare = y > 86 ? (y - 86) / 2 : 0;
    const l = 13 - flare, r = 34 + flare;
    for (let x = Math.floor(l); x <= Math.ceil(r); x++) {
      const t = (x - l) / (r - l);
      let c = t < 0.25 ? KAPOK_BARK.light : t < 0.6 ? KAPOK_BARK.mid : KAPOK_BARK.dark;
      if (hash(x, Math.floor(y / 4), 960) < 0.15 && t > 0.1 && t < 0.9) c = KAPOK_BARK.dark;
      if (vnoise(x, y, 5, 961) > 0.7 && t < 0.55) c = MOSS[1 + Math.floor(hash(x, y, 962) * 2)];
      if (x === Math.floor(l) || x === Math.ceil(r)) c = KAPOK_BARK.out;
      p.set(x, y, c);
    }
  }
  // branches reaching out under the crown
  for (const [x0, x1] of [[16, 2], [31, 46]] as [number, number][]) for (let i = 0; i <= 12; i++) { const x = Math.round(x0 + (x1 - x0) * i / 12), y = 40 - Math.round(i * 0.8); p.set(x, y, KAPOK_BARK.out); p.set(x, y + 1, KAPOK_BARK.mid); p.set(x, y + 2, KAPOK_BARK.dark); p.set(x, y + 3, KAPOK_BARK.out); }
  // a ring of planks around the foot
  for (let x = 4; x < 44; x++) { p.set(x, 88, WOOD[4]); p.set(x, 89, WOOD[2]); p.set(x, 90, WOOD[1]); p.set(x, 91, H('#1e120a')); }
  leafCrown(p, 24, 0, 48, 36, 69);
  liana(p, 9, 36, 64, 1.5, H('#2a4a1a'), H('#4a8a34'), 71);
  liana(p, 40, 34, 58, -1.5, H('#2a4a1a'), H('#4a8a34'), 73);
  // a lantern hanging from a branch
  for (let y = 38; y < 46; y++) p.set(41, y, H('#1e120a'));
  for (let y = 46; y < 52; y++) for (let x = 39; x < 44; x++) p.set(x, y, x === 39 || x === 43 || y === 46 || y === 51 ? H('#1e120a') : H('#f8d060'));
  return p;
}

/** A round hut on the treetop decks (3×2): woven walls, a tall leafy roof, a doorway. */
function treeHut(kind: 'thatch' | 'palm', seed: number): Pix {
  const p = new Pix(48, 64);
  const out = H('#1e120a');
  shadowEllipse(p, 24, 62, 22, 2, H('#04140c88'));
  // woven walls
  for (let y = 34; y < 62; y++) for (let x = 5; x < 43; x++) {
    const weave = ((x >> 1) + (y >> 1)) % 2;
    const t = (x - 5) / 38;
    p.set(x, y, x === 5 || x === 42 || y === 61 ? out : weave ? (t < 0.3 ? H('#d8b070') : t < 0.7 ? H('#c09858') : H('#9a7440')) : (t < 0.3 ? H('#c09858') : t < 0.7 ? H('#a8804a') : H('#80603a')));
  }
  // doorway with a hanging mat
  for (let y = 42; y < 62; y++) for (let x = 18; x < 30; x++) p.set(x, y, x === 18 || x === 29 || y === 42 ? out : y < 46 ? H('#2a1a10') : (x % 3 === 0 ? H('#8a3a2a') : H('#c05a3a')));
  // round window
  for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) { const d = Math.hypot(x, y); if (d <= 3.5) p.set(36 + x, 44 + y, d > 2.5 ? out : H('#2a1a10')); }
  // tall conical roof
  for (let y = 0; y < 38; y++) {
    const half = Math.min(23, 2 + y * 0.62);
    roofRow(p, y, 24 - half, 23 + half, kind, seed, y / 38);
  }
  for (let x = 1; x < 47; x++) { const d = 1 + Math.floor(hash(x, 0, seed) * 3); for (let y = 38; y < 38 + d; y++) p.set(x, y, y === 37 + d ? out : (kind === 'thatch' ? THATCH : PALMLEAF)[1]); }
  // a little flag on top
  for (let y = 0; y < 5; y++) p.set(24, y, out);
  return p;
}
function roofRow(p: Pix, y: number, l: number, r: number, kind: 'thatch' | 'palm', seed: number, t: number) {
  const tones = kind === 'thatch' ? THATCH : PALMLEAF;
  const out = H(kind === 'thatch' ? '#2a1808' : '#0e2010');
  const L = Math.round(l), R = Math.round(r);
  for (let x = L; x <= R; x++) {
    const layer = Math.floor(y / 5), ly = y % 5;
    const u = (x - L) / Math.max(1, R - L);
    let k = (t < 0.35 ? 4 : t < 0.7 ? 3 : 2) - (ly === 4 ? 2 : 0) + (u < 0.25 ? 1 : u > 0.75 ? -1 : 0);
    if (kind === 'thatch' && hash(x, layer, seed) < 0.25) k -= 1;
    if (kind === 'palm' && (x + layer * 3) % 6 < 2) k += 1;
    p.set(x, y, x === L || x === R ? out : tones[Math.max(0, Math.min(tones.length - 1, k))]);
  }
}

/** A cocoa tree (1×1): pods growing right on the trunk, the beans the Rainforest pays with. */
function cacaoTree(): Pix {
  const p = new Pix(16, 36);
  shadowEllipse(p, 8, 34, 7, 1, H('#0a2a2066'));
  for (let y = 14; y < 35; y++) for (let x = 6; x < 10; x++) p.set(x, y, x === 6 || x === 9 ? FIG_BARK.out : x === 7 ? FIG_BARK.light : FIG_BARK.mid);
  const L = new Pix(16, 36);
  for (let k = 0; k < 7; k++) bigLeaf(L, 8, 10, -Math.PI / 2 + (k - 3) * 0.55, 6.5, 2.3, LEAF_TONES[1], k === 3 ? 2 : 1);
  for (let k = 0; k < 3; k++) bigLeaf(L, 8, 12, Math.PI / 2 + (k - 1) * 0.8, 5, 2, LEAF_TONES[1], 0);
  p.blit(L, 0, 0);
  // pods: yellow, orange and red ones
  for (const [x, y, c, d] of [[3, 20, '#f8c040', '#c08a20'], [10, 18, '#e8702a', '#a84a1a'], [10, 25, '#c83a2a', '#8a2418'], [3, 27, '#f8c040', '#c08a20']] as [number, number, string, string][]) {
    for (let yy = 0; yy < 5; yy++) for (let xx = 0; xx < 3; xx++) p.set(x + xx, y + yy, (yy === 0 || yy === 4) && xx !== 1 ? 0 : xx === 2 ? H(d) : H(c));
    p.set(x + 1, y - 1, H('#2a1a0a'));
  }
  return p;
}

/** A monstera (1×1): big split leaves on long stems. */
function monstera(): Pix {
  const p = new Pix(20, 22);
  const L = new Pix(20, 22);
  const tones = LEAF_TONES[0];
  for (const [ang, len, lift] of [[-2.5, 8, 0], [-0.65, 8, 0], [-1.95, 9, 1], [-1.2, 9, 1], [-1.57, 7, 2]] as [number, number, number][]) bigLeaf(L, 10, 19, ang, len, 3.8, tones, lift);
  // the splits in the leaves
  for (const [x, y] of [[5, 13], [6, 11], [14, 12], [13, 10], [8, 9], [12, 8], [10, 12]]) { L.set(x, y, H('#081e12')); L.set(x + 1, y + 1, H('#081e12')); }
  shadowEllipse(p, 10, 20, 7, 1, H('#0a2a2066'));
  p.blit(L, 0, 0);
  return p;
}

/** A banana plant (1×1): long torn leaves and a bunch of green bananas. */
function bananaPlant(): Pix {
  const p = new Pix(16, 32);
  const L = new Pix(16, 32);
  const g = ['#2a6a24', '#4a9a3a', '#78c050', '#a8d870'].map(H);
  for (let y = 14; y < 31; y++) { L.set(7, y, g[1]); L.set(8, y, g[0]); }
  for (const [dx, dy, len] of [[-1, -0.3, 8], [1, -0.4, 8], [-0.4, -1, 9], [0.5, -1, 9], [-1, 0.3, 6]] as [number, number, number][]) {
    for (let i = 0; i < len; i++) {
      const x = Math.round(7.5 + dx * i), y = Math.round(14 + dy * i + (i * i) / 18);
      for (let w = -1; w <= 1; w++) {
        if (hash(i, w, 970 + len) < 0.12) continue; // torn leaf edges
        L.set(x + (Math.abs(dy) > 0.6 ? w : 0), y + (Math.abs(dy) > 0.6 ? 0 : w), w === -1 ? g[3] : w === 0 ? g[2] : g[1]);
      }
    }
  }
  for (const [x, y] of [[9, 17], [10, 17], [9, 18], [10, 18], [11, 18], [9, 19], [10, 19]]) L.set(x, y, H('#9ac040'));
  L.set(10, 20, H('#6a2a4a')); L.set(10, 21, H('#8a3a5a'));
  outlined(p, L, 0, 0, H('#0c2a14'));
  shadowEllipse(p, 8, 30, 5, 1, H('#0a2a2066'));
  return p;
}

/** A bed of orchids (2×1) in a wooden planter. */
function orchidBed(): Pix {
  const p = new Pix(32, 24);
  const out = H('#1e120a');
  for (let y = 14; y < 24; y++) for (let x = 0; x < 32; x++) p.set(x, y, x === 0 || x === 31 || y === 14 || y === 23 ? out : y === 15 ? WOOD[4] : x % 6 === 0 ? WOOD[1] : WOOD[2]);
  for (let k = 0; k < 4; k++) p.blit(ORCHID, k * 7 - 1, 1, k % 2 === 1);
  const cols = ['#f070b0', '#fbeefa', '#b050e0', '#f8d040'];
  for (let k = 0; k < 4; k++) for (const [x, y] of [[0, 0], [1, 0], [0, 1]]) p.set(5 + k * 7 + x, 3 + (k % 2) * 2 + y, H(cols[k]));
  return p;
}

/** The orchid greenhouse of Orchid Town (4×3): glass panes in a white frame, orchids crowding inside. */
function greenhouse(): Pix {
  const p = new Pix(64, 64);
  const out = H('#2a3a3a'), frame = H('#f4f4ec'), frameD = H('#b8c0b8');
  shadowEllipse(p, 32, 62, 31, 2, H('#0a2a2266'));
  // the glass box
  for (let y = 22; y < 62; y++) for (let x = 2; x < 62; x++) {
    const bar = (x - 2) % 12 === 0 || y === 22 || y === 61 || y === 40;
    const t = (x - 2) / 60;
    let c = t + (y - 22) / 80 < 0.5 ? H('#a8e0d8') : H('#78c0c0');
    if (((x + y) % 23 < 3) && y < 40) c = H('#e0f8f4');
    p.set(x, y, bar ? (x === 2 || x === 61 || y === 61 ? out : (y === 22 ? frame : frameD)) : c);
  }
  // plants inside (seen through the lower panes)
  for (let k = 0; k < 8; k++) {
    const x = 5 + k * 7, y = 44;
    for (let i = 0; i < 6; i++) { p.set(x + 1, y + 10 - i, H('#2e7a38')); }
    p.set(x, y + 4, H('#4a9a44')); p.set(x + 2, y + 3, H('#4a9a44'));
    const c = ['#f070b0', '#fbeefa', '#b050e0', '#f8d040'][k % 4];
    p.set(x, y + 1, H(c)); p.set(x + 1, y, H(c)); p.set(x + 2, y + 1, H(c)); p.set(x + 1, y + 1, H('#f8e060'));
  }
  // the door
  for (let y = 44; y < 62; y++) for (let x = 26; x < 38; x++) p.set(x, y, x === 26 || x === 37 || y === 44 ? out : x === 31 || x === 32 ? frame : H('#c8f0ec'));
  // a curved glass roof
  for (let y = 2; y < 23; y++) {
    const half = 30 * Math.sqrt(1 - Math.pow((22 - y) / 21, 2));
    for (let x = Math.round(32 - half); x <= Math.round(31 + half); x++) {
      const bar = (x - 2) % 12 === 0 || y % 7 === 1;
      const edge = x === Math.round(32 - half) || x === Math.round(31 + half);
      p.set(x, y, edge ? out : bar ? frame : (x + y) % 19 < 3 ? H('#f0fcfa') : y < 12 ? H('#c8f0ec') : H('#98d8d4'));
    }
  }
  for (let x = 2; x < 62; x++) p.set(x, 22, frame);
  return p;
}

// ---------------------------------------------------------------- homes: rooms and furniture

const ROOM = {
  ground: ['#b07a44', '#a8723e', '#b8824a', '#c08a50'], grassDark: '#6a4224', grassLight: '#d8a468',
  path: '#c8a060', pathDark: '#8a6a38', pathLight: '#e8c888', pathEdge: '#4a3018',
  water: '#8c7444', waterDeep: '#6c5630', waterLight: '#cab27e', waterEdge: '#2a2010', foam: '#e2d2a0', shadow: '#2a140644',
};
const GLASSROOM = {
  ground: ['#6a4a2e', '#725032', '#7a5636', '#825c3a'], grassDark: '#4a3220', grassLight: '#9a7448',
  path: '#a8a090', pathDark: '#7a7468', pathLight: '#c8c0b0', pathEdge: '#4a463e',
  water: '#4a8a9a', waterDeep: '#3a6a7a', waterLight: '#a8dce8', waterEdge: '#1a3a44', foam: '#d8f4f8', shadow: '#0a2a2244',
};

const VOID = H('#0c0806');
const isWall = (at: At, x: number, y: number) => at(x, y) === '#';

/**
 * The walls inside a stilt house. The back wall is two tiles tall: a beam along the top, split-bamboo slats, a
 * window with the forest outside and woven curtains, a dark skirting board at the foot. Side walls show their edge;
 * everything beyond the room is dark.
 */
function roomWall(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const lower = !isWall(at, tx, ty + 1), upper = !lower && !isWall(at, tx, ty + 2) && isWall(at, tx, ty + 1);
  const inL = !isWall(at, tx + 1, ty) && !isWall(at, tx + 1, ty + 1) || (!isWall(at, tx + 1, ty) && at(tx + 1, ty) !== ':');
  const inR = !isWall(at, tx - 1, ty) && at(tx - 1, ty) !== ':';
  p.fill(ox, oy, T, T, VOID);
  if (lower || upper) {
    const y0 = upper ? 0 : T; // pixel row of this tile within the 32-pixel wall
    const win = tx % 4 === 2 && !isWall(at, tx - 1, ty + (upper ? 2 : 1)) && !isWall(at, tx + 1, ty + (upper ? 2 : 1));
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const wx = tx * T + x, Y = y0 + y;
      let c: number;
      if (Y < 3) c = Y === 0 ? H('#1e1208') : Y === 1 ? H('#8a5a30') : H('#5a3a1e');
      else if (Y >= 28) c = Y === 28 ? H('#7a5030') : H('#3a2412');
      else { const sl = wx % 4; c = sl === 3 ? H('#a88848') : sl === 0 ? H('#e8d4a0') : H('#d4bc84'); }
      if (Y === 16 && Y < 28) c = H('#b89858'); // a rail across the middle
      p.set(ox + x, oy + y, c);
    }
    if (win) {
      for (let y = 0; y < T; y++) for (let x = 1; x < 15; x++) {
        const Y = y0 + y;
        if (Y < 6 || Y > 23) continue;
        const frame = Y === 6 || Y === 23 || x === 1 || x === 14;
        const leaf = vnoise(tx * T + x, Y, 4, 1003);
        let c = frame ? H('#4a2e16') : Y < 11 && leaf < 0.5 ? H('#b8e8f4') : leaf > 0.55 ? H('#3a8a3a') : H('#246a30');
        // woven curtains drawn back to both sides
        if (!frame && (x < 4 || x > 11)) c = (Y + x) % 3 === 0 ? H('#a83a2a') : H('#d85a3a');
        if (Y === 7 && !frame) c = H('#6a4220');
        p.set(ox + x, oy + y, c);
      }
      if (!upper) for (let x = 0; x < T; x++) { p.set(ox + x, oy + 8, H('#4a2e16')); p.set(ox + x, oy + 9, WOOD[3]); }
    }
    // the corner where a side wall meets the back wall
    if (isWall(at, tx - 1, ty + (upper ? 2 : 1)) && !isWall(at, tx + 1, ty + (upper ? 2 : 1))) for (let y = 0; y < T; y++) { p.set(ox, oy + y, H('#1e1208')); p.set(ox + 1, oy + y, H('#6a4422')); }
    if (isWall(at, tx + 1, ty + (upper ? 2 : 1)) && !isWall(at, tx - 1, ty + (upper ? 2 : 1))) for (let y = 0; y < T; y++) { p.set(ox + 15, oy + y, H('#1e1208')); p.set(ox + 14, oy + y, H('#6a4422')); }
    return;
  }
  // side walls: a post showing its edge next to the floor
  const floorE = !isWall(at, tx + 1, ty) && at(tx + 1, ty) !== undefined, floorW = !isWall(at, tx - 1, ty);
  void inL; void inR;
  if (floorE && at(tx + 1, ty) !== ':') for (let y = 0; y < T; y++) { p.set(ox + 11, oy + y, H('#2a1a0c')); p.set(ox + 12, oy + y, H('#8a5a30')); p.set(ox + 13, oy + y, H('#b07a44')); p.set(ox + 14, oy + y, H('#7a4a26')); p.set(ox + 15, oy + y, H('#3a2412')); }
  if (floorW && at(tx - 1, ty) !== ':') for (let y = 0; y < T; y++) { p.set(ox, oy + y, H('#3a2412')); p.set(ox + 1, oy + y, H('#b07a44')); p.set(ox + 2, oy + y, H('#8a5a30')); p.set(ox + 3, oy + y, H('#6a4220')); p.set(ox + 4, oy + y, H('#2a1a0c')); }
  // the bottom wall: a beam along the edge of the floor
  if (!isWall(at, tx, ty - 1) && at(tx, ty - 1) !== ':') for (let x = 0; x < T; x++) { p.set(ox + x, oy, H('#b07a44')); p.set(ox + x, oy + 1, H('#8a5a30')); p.set(ox + x, oy + 2, H('#5a3a1e')); p.set(ox + x, oy + 3, H('#2a1a0c')); }
}

/** Floorboards of a stilt house, with gaps; a woven mat where the map says `w`; daylight at the door (`:`). */
function roomFloor(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At) {
  const c = at(tx, ty);
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const board = Math.floor(wx / 5);
    const tone = ['#9a6a3a', '#a8743e', '#b07c44', '#a06e3c'][Math.floor(hash(board, Math.floor(wy / 40), 1010) * 4)];
    p.set(ox + x, oy + y, wx % 5 === 4 ? H('#4a2e16') : (wy + board * 13) % 40 === 0 ? H('#5a381c') : H(tone));
  }
  // shade along the wall above
  if (at(tx, ty - 1) === '#') for (let x = 0; x < T; x++) for (let y = 0; y < 3; y++) p.set(ox + x, oy + y, H('#2a140644'));
  if (c === 'w') {
    // a woven mat: a basket weave with a coloured border, edges where the mat ends
    const same = (dx: number, dy: number) => at(tx + dx, ty + dy) === 'w';
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const bN = !same(0, -1) && y < 3, bS = !same(0, 1) && y > 12, bW = !same(-1, 0) && x < 3, bE = !same(1, 0) && x > 12;
      if ((!same(0, -1) && y < 1) || (!same(0, 1) && y > 14) || (!same(-1, 0) && x < 1) || (!same(1, 0) && x > 14)) continue;
      const weave = (Math.floor((tx * T + x) / 3) + Math.floor((ty * T + y) / 3)) % 2;
      let col = weave ? H('#e0c078') : H('#c8a058');
      if ((tx * T + x) % 3 === 0 || (ty * T + y) % 3 === 0) col = weave ? H('#b88c48') : H('#a87c3c');
      if (bN || bS || bW || bE) col = (x + y) % 4 < 2 ? H('#c0392b') : H('#2a7a5a');
      p.set(ox + x, oy + y, col);
    }
  }
  if (c === ':') {
    for (let y = 0; y < T; y++) for (let x = 2; x < 14; x++) p.set(ox + x, oy + y, y > 10 ? H('#f8e8b8') : y > 5 ? H('#e8c888') : H('#c8a060'));
  }
}

function roomTerrain(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At): boolean {
  const c = at(tx, ty);
  if (c === ':' && at(tx, ty - 1) === ':') { p.fill(ox, oy, T, T, VOID); return true; }
  if (c === '#') { roomWall(p, ox, oy, tx, ty, at); return true; }
  roomFloor(p, ox, oy, tx, ty, at);
  if (c === 'y') p.blit(FRUIT_BASKET, ox, oy);
  if (c === 'r') p.blit(POT_FLOWER, ox, oy);
  return true;
}

/** A path tile that only continues the door mat out of the room (past the map's edge): drawn as darkness. */
const pastDoor = (at: At, x: number, y: number) => at(x, y) === ':' && at(x, y - 1) === ':' && [-1, 1].every((d) => at(x + d, y - 1) === '#' || (at(x + d, y - 1) === ':' && at(x + 2 * d, y - 1) === '#'));

/** Inside the greenhouse: glass walls with the garden green behind, beds of dark soil, a stone path, orchids everywhere. */
function glassTerrain(p: Pix, ox: number, oy: number, tx: number, ty: number, at: At, frame: number): boolean {
  const c = at(tx, ty);
  if (c === '#') {
    const face = at(tx, ty + 1) !== '#';
    const near = [[-1, 0], [1, 0], [0, 1], [0, 2], [0, -1], [-1, 1], [1, 1]].some(([dx, dy]) => at(tx + dx, ty + dy) !== '#' && !pastDoor(at, tx + dx, ty + dy));
    if (!near) { p.fill(ox, oy, T, T, VOID); return true; }
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const wx = tx * T + x, wy = ty * T + y;
      const bar = wx % 16 === 0 || wy % 16 === 0 || (face && y === 15);
      const leaf = vnoise(wx, wy, 6, 1020);
      let col = leaf > 0.6 ? H('#5aa868') : leaf > 0.4 ? H('#3a8a58') : H('#7ac0b0');
      if (!face) col = lerp(col, H('#d8f4f0'), 0.35);
      if ((wx + wy) % 19 < 2) col = H('#e8fcf8');
      p.set(ox + x, oy + y, bar ? H('#f0f4ee') : col);
    }
    return true;
  }
  if (pastDoor(at, tx, ty)) { p.fill(ox, oy, T, T, VOID); return true; }
  if (c === ':') { path(p, ox, oy, tx, ty, (dx, dy) => at(tx + dx, ty + dy) === ':'); for (let k = 0; k < 4; k++) { const x = Math.floor(hash(tx, ty, 1030 + k) * 13), y = Math.floor(hash(tx, ty, 1035 + k) * 13); p.fill(ox + x, oy + y, 3, 2, H('#c8c0b0')); } return true; }
  // dark soil with moss
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const wx = tx * T + x, wy = ty * T + y;
    const n = vnoise(wx, wy, 5, 1040) * 0.7 + hash(wx, wy, 1041) * 0.3;
    p.set(ox + x, oy + y, n > 0.7 ? H('#4a7a3a') : n > 0.45 ? H('#5a3e26') : H('#4a3220'));
  }
  if (at(tx, ty - 1) === '#') for (let x = 0; x < T; x++) for (let y = 0; y < 3; y++) p.set(ox + x, oy + y, H('#0a2a2244'));
  if (c === 'w' || c === 'r') p.blit(ORCHID, ox, oy, hash(tx, ty, 1050) < 0.5);
  if (c === 'y') p.blit(BROMELIAD, ox, oy, hash(tx, ty, 1051) < 0.5);
  if (c === '"') for (let k = 0; k < 3; k++) frond(p, ox + 3 + k * 4, oy + 13, k % 2 ? 1 : -1, 6, H('#1e5a2c'), H('#5cae4a'));
  // drops of condensation glinting
  if (hash(tx, ty, 1052 + frame) < 0.2) p.set(ox + Math.floor(hash(tx, ty, 1053) * 16), oy + Math.floor(hash(tx, ty, 1054) * 16), H('#d8f4f8'));
  return true;
}

/** Furniture: each a careful little sprite, lit from the top left, with a soft shadow. */
function furniture(): Record<string, [Pix, number, number]> {
  const out = H('#1e120a');
  const shadow = (p: Pix, cx: number, cy: number, rx: number) => shadowEllipse(p, cx, cy, rx, 1, H('#2a140655'));
  // a hammock slung between two posts, with a striped cloth
  const hammock = new Pix(32, 28);
  shadow(hammock, 16, 26, 14);
  for (const x of [1, 29]) for (let y = 2; y < 27; y++) { hammock.set(x, y, out); hammock.set(x + 1, y, WOOD[3]); hammock.set(x + 2, y, out); }
  for (let x = 4; x < 29; x++) {
    const sag = Math.round(Math.sin(((x - 4) / 25) * Math.PI) * 7);
    for (let y = 0; y < 6; y++) {
      const stripe = ['#d83a30', '#f8d040', '#2a8a5a', '#f4ecd8'][Math.floor((x + 1) / 3) % 4];
      hammock.set(x, 8 + sag + y, y === 0 ? out : y === 5 ? out : y === 4 ? lerp(H(stripe), H('#000000'), 0.3) : H(stripe));
    }
  }
  for (const [x0, x1] of [[3, 6], [26, 29]]) for (let x = x0; x <= x1; x++) hammock.set(x, 6 + Math.abs(x - (x0 === 3 ? 3 : 29)) % 3, H('#d8b878'));
  // a weaving loom with a half-woven cloth
  const loom = new Pix(32, 32);
  shadow(loom, 16, 30, 14);
  for (const x of [2, 28]) for (let y = 4; y < 31; y++) { loom.set(x, y, out); loom.set(x + 1, y, WOOD[2]); loom.set(x + 2, y, out); }
  for (const y of [4, 26]) for (let x = 2; x < 31; x++) { loom.set(x, y, out); loom.set(x, y + 1, WOOD[3]); loom.set(x, y + 2, out); }
  for (let x = 6; x < 26; x += 2) for (let y = 7; y < 14; y++) loom.set(x, y, H('#f4ecd8'));
  for (let y = 14; y < 26; y++) for (let x = 6; x < 26; x++) loom.set(x, y, H(['#d83a30', '#f08a28', '#f8d040', '#2a8a5a', '#3a68c8'][Math.floor((y - 14) / 2) % 5]));
  for (let y = 14; y < 26; y += 2) for (let x = 6; x < 26; x += 4) loom.set(x, y, H('#1e120a'));
  // fishing nets and a paddle hanging on the wall (stands against the wall)
  const nets = new Pix(32, 32);
  shadow(nets, 16, 30, 13);
  for (let y = 4; y < 30; y++) for (let x = 3; x < 25; x++) {
    const d = Math.abs(x - 14) - (y - 4) * 0.25;
    if (d > 10) continue;
    if ((x + y) % 4 === 0 || (x - y + 40) % 4 === 0) nets.set(x, y, H('#d8c8a0'));
  }
  for (let x = 2; x < 27; x++) { nets.set(x, 4, out); nets.set(x, 5, WOOD[3]); }
  for (const [x, y] of [[8, 10], [16, 16], [11, 22], [20, 24]]) { nets.set(x, y, H('#f06a3a')); nets.set(x + 1, y, H('#f06a3a')); nets.set(x, y + 1, H('#b84a22')); }
  for (let y = 2; y < 30; y++) { nets.set(28, y, out); nets.set(29, y, WOOD[3]); nets.set(30, y, out); }
  for (let y = 20; y < 30; y++) for (let x = 26; x < 33; x++) nets.set(x, y, x === 26 || x === 31 || y === 29 ? out : WOOD[4]);
  // a rack of cocoa beans drying, and an open pod
  const cocoarack = new Pix(32, 24);
  shadow(cocoarack, 16, 22, 15);
  for (let y = 8; y < 20; y++) for (let x = 1; x < 31; x++) cocoarack.set(x, y, x === 1 || x === 30 || y === 8 || y === 19 ? out : y === 9 ? WOOD[4] : WOOD[2]);
  for (let k = 0; k < 40; k++) { const x = 3 + Math.floor(hash(k, 1, 1060) * 25), y = 10 + Math.floor(hash(k, 2, 1061) * 8); cocoarack.set(x, y, H(k % 3 ? '#6a3a1a' : '#8a5228')); cocoarack.set(x + 1, y, H('#4a2410')); }
  for (const x of [3, 27]) for (let y = 19; y < 23; y++) cocoarack.set(x, y, WOOD[0]);
  for (let y = 0; y < 8; y++) for (let x = 12; x < 22; x++) { const d = Math.hypot((x - 17) / 5, (y - 4) / 3.5); if (d < 1) cocoarack.set(x, y, d > 0.8 ? out : x < 15 ? H('#f8c040') : y > 3 ? H('#fff4e0') : H('#c08a20')); }
  // a clay stove with a pot
  const claystove = new Pix(16, 24);
  shadow(claystove, 8, 22, 7);
  for (let y = 10; y < 22; y++) for (let x = 1; x < 15; x++) { const e = x === 1 || x === 14 || y === 21; claystove.set(x, y, e ? out : x < 5 ? H('#d08a5a') : H('#a8603a')); }
  for (let y = 15; y < 20; y++) for (let x = 5; x < 11; x++) claystove.set(x, y, y === 15 ? out : (x + y) % 2 ? H('#f8a030') : H('#e84a2a'));
  for (let y = 3; y < 11; y++) for (let x = 3; x < 13; x++) claystove.set(x, y, x === 3 || x === 12 || y === 10 ? out : y === 3 ? H('#5a5a62') : x < 6 ? H('#6a6a72') : H('#3a3a42'));
  for (const [x, y] of [[6, 1], [9, 0], [7, 2]]) claystove.set(x, y, H('#e8eef0aa'));
  // a low table with bowls and a gourd cup
  const lowtable = new Pix(32, 20);
  shadow(lowtable, 16, 18, 15);
  for (let y = 6; y < 12; y++) for (let x = 1; x < 31; x++) lowtable.set(x, y, x === 1 || x === 30 || y === 6 || y === 11 ? out : y === 7 ? WOOD[4] : WOOD[3]);
  for (const x of [3, 27]) for (let y = 12; y < 18; y++) { lowtable.set(x, y, out); lowtable.set(x + 1, y, WOOD[1]); }
  for (const [x, c] of [[7, '#e8d8c0'], [15, '#c8603a'], [23, '#e8d8c0']] as [number, string][]) { for (let k = 0; k < 6; k++) lowtable.set(x + k, 5, out); for (let k = 1; k < 5; k++) lowtable.set(x + k, 4, H(c)); lowtable.set(x + 2, 3, H(x === 15 ? '#f8d040' : '#5aa83a')); }
  // a wooden chest with brass corners
  const chest = new Pix(16, 18);
  shadow(chest, 8, 16, 7);
  for (let y = 4; y < 16; y++) for (let x = 1; x < 15; x++) chest.set(x, y, x === 1 || x === 14 || y === 4 || y === 15 || y === 8 ? out : y < 8 ? WOOD[3] : WOOD[2]);
  for (const [x, y] of [[2, 5], [13, 5], [2, 14], [13, 14], [7, 9], [8, 9], [7, 10], [8, 10]]) chest.set(x, y, H('#e8c040'));
  // a shelf full of potted plants
  const plantshelf = new Pix(32, 32);
  shadow(plantshelf, 16, 30, 15);
  for (const x of [1, 29]) for (let y = 2; y < 31; y++) { plantshelf.set(x, y, out); plantshelf.set(x + 1, y, WOOD[2]); }
  for (const y of [12, 22, 30]) for (let x = 1; x < 31; x++) { plantshelf.set(x, y, out); plantshelf.set(x, y - 1, WOOD[3]); }
  const pots: [number, number, string][] = [[4, 11, '#e0402a'], [12, 11, '#f070b0'], [21, 11, '#f8d040'], [6, 21, '#fbeefa'], [15, 21, '#3a8ae8'], [23, 21, '#e0402a']];
  for (const [x, y, fl] of pots) {
    for (let yy = y - 4; yy < y - 1; yy++) for (let xx = x; xx < x + 5; xx++) plantshelf.set(xx, yy, xx === x || xx === x + 4 ? out : H('#c0603a'));
    for (const [dx, dy] of [[1, -5], [2, -6], [3, -5], [0, -6], [4, -7], [2, -8]]) plantshelf.set(x + dx, y + dy, H(dy < -6 ? '#7cc25a' : '#3e9a44'));
    plantshelf.set(x + 2, y - 9, H(fl)); plantshelf.set(x + 1, y - 9, H(fl));
  }
  // a big potted palm
  const pottedpalm = new Pix(16, 32);
  shadow(pottedpalm, 8, 30, 6);
  for (let y = 22; y < 30; y++) for (let x = 3; x < 13; x++) pottedpalm.set(x, y, x === 3 || x === 12 || y === 29 ? out : y === 22 ? H('#e0805a') : x < 6 ? H('#d0704a') : H('#a8503a'));
  const PL = new Pix(16, 32);
  for (const [dx, dy] of [[-1, -0.4], [1, -0.4], [-0.5, -1], [0.5, -1], [-1, 0.2], [1, 0.2]] as [number, number][]) palmFrond(PL, 8, 12, dx, dy, 7, LEAF_TONES[1].slice(1, 5));
  for (let y = 12; y < 22; y++) { PL.set(7, y, H('#6a5a40')); PL.set(8, y, H('#4a3e2a')); }
  outlined(pottedpalm, PL, 0, 0, H('#081e12'));
  // a drum
  const drum = new Pix(16, 20);
  shadow(drum, 8, 18, 6);
  for (let y = 5; y < 18; y++) for (let x = 2; x < 14; x++) drum.set(x, y, x === 2 || x === 13 || y === 17 ? out : y < 7 ? H('#f4e8c8') : (x + y) % 6 < 2 ? H('#d83a30') : x < 6 ? H('#b8784a') : H('#8a5228'));
  for (let x = 2; x < 14; x++) { drum.set(x, 4, out); drum.set(x, 7, out); }
  for (let y = 8; y < 17; y += 3) for (let x = 3; x < 13; x += 3) drum.set(x, y, H('#f4e8c8'));
  // a hive of stingless bees (a hollow log) with honey pots
  const beehive = new Pix(16, 24);
  shadow(beehive, 8, 22, 7);
  for (let y = 4; y < 21; y++) for (let x = 2; x < 14; x++) beehive.set(x, y, x === 2 || x === 13 || y === 4 || y === 20 ? out : (y % 4 === 0 ? FIG_BARK.dark : x < 6 ? FIG_BARK.light : FIG_BARK.mid));
  for (let y = 9; y < 13; y++) for (let x = 6; x < 10; x++) beehive.set(x, y, y === 9 || x === 6 || x === 9 ? out : H('#2a1a0a'));
  for (const [x, y] of [[4, 2], [11, 1], [9, 3], [13, 6]]) { beehive.set(x, y, H('#f8c040')); beehive.set(x + 1, y, H('#2a1a0a')); }
  // orchids on stepped shelves (greenhouse)
  const orchidshelf = new Pix(32, 32);
  shadow(orchidshelf, 16, 30, 15);
  for (const [y, x0] of [[30, 1], [22, 4], [14, 7]] as [number, number][]) { for (let x = x0; x < 32 - x0; x++) { orchidshelf.set(x, y, out); orchidshelf.set(x, y - 1, H('#e8ece4')); } }
  for (const [x, y] of [[2, 30], [29, 30]]) for (let yy = 12; yy < y; yy++) orchidshelf.set(x, yy, H('#c8ccc4'));
  const cols = ['#f070b0', '#fbeefa', '#b050e0', '#f8d040', '#f89038'];
  for (const [y, x0] of [[29, 2], [21, 5], [13, 8]] as [number, number][]) for (let x = x0; x < 30 - x0; x += 6) {
    for (let k = 0; k < 4; k++) orchidshelf.set(x + 1, y - 2 - k, H('#3e8a3a'));
    orchidshelf.set(x, y - 2, H('#4a9a3a')); orchidshelf.set(x + 2, y - 2, H('#4a9a3a'));
    const c = H(cols[(x + y) % cols.length]);
    for (const [dx, dy] of [[0, -6], [2, -6], [1, -7], [1, -5]]) orchidshelf.set(x + dx, y + dy, c);
    orchidshelf.set(x + 1, y - 6, H('#f8e060'));
  }
  // a big water jar
  const waterjar = new Pix(16, 22);
  shadow(waterjar, 8, 20, 6);
  for (let y = 4; y < 20; y++) for (let x = 1; x < 15; x++) { const r = 6.5 - Math.abs(y - 12) * 0.25 - (y < 7 ? 2 : 0); const dx = Math.abs(x + 0.5 - 8); if (dx > r) continue; jarPix(waterjar, x, y, dx > r - 1 || y === 19 ? out : x < 6 ? H('#d08a5a') : H('#a8603a')); }
  for (let x = 5; x < 11; x++) { waterjar.set(x, 4, out); waterjar.set(x, 5, H('#4a8a9a')); }
  for (let x = 3; x < 13; x++) if (x % 3 === 0) waterjar.set(x, 12, H('#f4e8c8'));
  // an oil lamp on a post
  const lamp = new Pix(16, 30);
  shadow(lamp, 8, 28, 4);
  for (let y = 10; y < 28; y++) { lamp.set(7, y, out); lamp.set(8, y, WOOD[3]); lamp.set(9, y, out); }
  for (let x = 4; x < 12; x++) { lamp.set(x, 27, out); lamp.set(x, 26, WOOD[2]); }
  for (let y = 2; y < 10; y++) for (let x = 4; x < 12; x++) lamp.set(x, y, x === 4 || x === 11 || y === 2 || y === 9 ? out : y < 4 ? H('#5a5a62') : x < 7 ? H('#fff4b0') : H('#f8c840'));
  for (let x = 6; x < 10; x++) lamp.set(x, 1, out);
  for (const [x, y] of [[2, 5], [13, 5], [3, 8], [12, 8]]) lamp.set(x, y, H('#f8e08066'));
  // a stack of woven baskets
  const baskets = new Pix(16, 22);
  shadow(baskets, 8, 20, 7);
  const basket = (x0: number, y0: number, w: number, h: number, c: string) => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) baskets.set(x, y, x === x0 || x === x0 + w - 1 || y === y0 || y === y0 + h - 1 ? out : (x + y) % 3 === 0 ? H('#8a5a28') : y === y0 + 1 ? H(c) : H('#c89a52')); };
  basket(1, 12, 14, 8, '#c0392b'); basket(3, 5, 10, 8, '#2a8a5a');
  for (const [x, y, c] of [[5, 4, '#f8d040'], [7, 3, '#f08a28'], [9, 4, '#e8502a'], [6, 4, '#f8d040']] as [number, number, string][]) baskets.set(x, y, H(c));
  // a sack of cocoa beans, a few spilled
  const sack = new Pix(16, 20);
  shadow(sack, 8, 18, 7);
  for (let y = 4; y < 18; y++) { const w = y < 7 ? 3 + (y - 4) : 6; for (let x = 8 - w; x < 8 + w; x++) sack.set(x, y, x === 8 - w || x === 7 + w || y === 17 ? out : (x + y) % 4 === 0 ? H('#a8844a') : x < 7 ? H('#d8b878') : H('#c0a060')); }
  for (let x = 5; x < 11; x++) sack.set(x, 6, H('#6a4220'));
  for (const [x, y] of [[12, 17], [14, 16], [2, 17], [13, 18]]) { sack.set(x, y, H('#6a3a1a')); sack.set(x + 1, y, H('#4a2410')); }
  // a shelf on the wall with gourds and jars
  const wallshelf = new Pix(16, 16);
  for (let x = 0; x < 16; x++) { wallshelf.set(x, 12, WOOD[4]); wallshelf.set(x, 13, WOOD[1]); wallshelf.set(x, 14, out); }
  for (const x of [2, 13]) { wallshelf.set(x, 15, out); wallshelf.set(x, 14, WOOD[0]); }
  for (let y = 5; y < 12; y++) for (let x = 1; x < 6; x++) { const d = Math.hypot(x - 3, y - 8.5); if (d < 3.2) wallshelf.set(x, y, d > 2.3 ? out : x < 3 ? H('#e8c070') : H('#c89a40')); }
  wallshelf.set(3, 5, H('#5a8a2a')); wallshelf.set(3, 4, H('#5a8a2a'));
  for (let y = 6; y < 12; y++) for (let x = 7; x < 11; x++) wallshelf.set(x, y, x === 7 || x === 10 || y === 6 || y === 11 ? out : H('#3a8ac8'));
  for (let y = 8; y < 12; y++) for (let x = 11; x < 15; x++) wallshelf.set(x, y, x === 11 || x === 14 || y === 8 || y === 11 ? out : H('#d06a3a'));
  // a carved wooden mask on the wall
  const wallmask = new Pix(16, 16);
  for (let y = 1; y < 15; y++) for (let x = 3; x < 13; x++) { const d = Math.hypot((x + 0.5 - 8) / 5, (y + 0.5 - 8) / 7); if (d > 1) continue; wallmask.set(x, y, d > 0.85 ? out : x < 7 ? H('#b07a44') : H('#8a5a30')); }
  for (const [x, y, c] of [[5, 6, '#101010'], [6, 6, '#101010'], [9, 6, '#101010'], [10, 6, '#101010'], [7, 9, '#5a3a1e'], [8, 9, '#5a3a1e'], [6, 11, '#f8f0e0'], [7, 11, '#c0392b'], [8, 11, '#c0392b'], [9, 11, '#f8f0e0'], [4, 3, '#2a8a5a'], [11, 3, '#2a8a5a'], [7, 2, '#f8d040'], [8, 2, '#f8d040']] as [number, number, string][]) wallmask.set(x, y, H(c));
  return {
    lamp: [lamp, 1, 1], baskets: [baskets, 1, 1], sack: [sack, 1, 1], wallshelf: [wallshelf, 1, 1], wallmask: [wallmask, 1, 1],
    hammock: [hammock, 2, 1], loom: [loom, 2, 1], nets: [nets, 2, 1], cocoarack: [cocoarack, 2, 1], claystove: [claystove, 1, 1],
    lowtable: [lowtable, 2, 1], chest: [chest, 1, 1], plantshelf: [plantshelf, 2, 1], pottedpalm: [pottedpalm, 1, 1], drum: [drum, 1, 1],
    beehive: [beehive, 1, 1], orchidshelf: [orchidshelf, 2, 1], waterjar: [waterjar, 1, 1],
  };
}
function jarPix(p: Pix, x: number, y: number, c: number) { p.set(x, y, c); }

// ---------------------------------------------------------------- registration


registerTheme('jungle', JUNGLE, {
  terrain: jungleTerrain,
  trees: JUNGLE_TREES,
  things: (c) => (c === '"' ? 'fern' : c === 'w' ? 'orchid' : c === '=' ? 'bamboo' : c === 'o' ? 'rockwall' : undefined),
});
registerTheme('jgroom', ROOM, { terrain: (p, ox, oy, tx, ty, at) => roomTerrain(p, ox, oy, tx, ty, at), things: (c) => (c === '#' ? 'wall' : c === 'w' ? 'wovenmat' : c === 'y' ? 'fruitbasket' : c === 'r' ? 'flower' : c === ':' ? 'exit' : 'floor') });
registerTheme('jgglass', GLASSROOM, { terrain: glassTerrain, things: (c) => (c === '#' ? 'wall' : c === 'w' || c === 'r' ? 'orchid' : c === '"' ? 'fern' : c === ':' ? 'path' : 'floor') });
registerTheme('jgcanopy', CANOPY, {
  terrain: canopyTerrain,
  things: (c) => (c === '#' || c === '~' ? 'canopy' : c === ':' ? 'ropebridge' : c === '=' ? 'railing' : c === 'o' ? 'branch' : c === 'w' ? 'orchid' : c === 'y' ? 'fruitbasket' : c === 'r' ? 'flower' : 'deck'),
});

Object.assign(NPCS, ANIMALS);
Object.assign(ITEMS, ICONS);
Object.assign(CAFE, FRUIT);

const decor: Record<string, [Pix, number, number]> = {
  stilthouse: [stiltHouse({ w: 4, roof: 'thatch', wall: ['#d8a86a', '#b88a52', '#8a6234'], door: 2, seed: 101 }), 4, 3],
  stilthouse2: [stiltHouse({ w: 4, roof: 'palm', wall: ['#c8b890', '#a89870', '#786a48'], door: 1, seed: 103 }), 4, 3],
  exchangehut: [stiltHouse({ w: 5, roof: 'thatch', wall: ['#e8c890', '#c8a468', '#987440'], door: 2, sign: 'coin', seed: 105, ground: true }), 5, 3],
  borderhut: [stiltHouse({ w: 5, roof: 'palm', wall: ['#d8c8a0', '#b8a478', '#887448'], door: 2, sign: 'stamp', seed: 107, ground: true }), 5, 3],
  riverboat: [riverboat(), 3, 2],
  canoe: [canoe(), 2, 1],
  fruitstall: [marketStall('fruit'), 2, 1],
  ponchostall: [marketStall('poncho'), 2, 1],
  brokenbridge: [brokenBridge(), 4, 2],
  jettyrope: [jettyRope(), 1, 1],
  trailrope: [trailRope(), 2, 1],
  lianatree: [lianaTree(), 3, 2],
  laddertree: [ladderTree(), 3, 2],
  ladderdown: [ladderDown(), 1, 1],
  bigtrunk: [bigTrunk(), 3, 2],
  treehut: [treeHut('thatch', 111), 3, 2],
  treehut2: [treeHut('palm', 113), 3, 2],
  cacaotree: [cacaoTree(), 1, 1],
  monstera: [monstera(), 1, 1],
  bananaplant: [bananaPlant(), 1, 1],
  orchidbed: [orchidBed(), 2, 1],
  greenhouse: [greenhouse(), 4, 3],
};
Object.assign(decor, furniture());
for (const [k, [pix, w, h]] of Object.entries(decor)) { DECOR[k] = pix; DECOR_SIZE[k] = [w, h]; }

/** The decor names (each is also a "name it" key). */
export const JUNGLE_DECOR = Object.keys(decor);
export const JUNGLE_ANIMALS = Object.keys(ANIMALS);
export const JUNGLE_FRUIT = Object.keys(FRUIT);
