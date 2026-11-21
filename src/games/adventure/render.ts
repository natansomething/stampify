/**
 * Drawing the world. The ground (terrain, flowers, rocks, fences) is pre-rendered once per map into two frames
 * (the water moves). Everything with height (trees, houses, signs, characters) is drawn every frame in depth
 * order, by the y of its base, so crowns and roofs cover the cat when it walks behind them.
 * Drawing goes through a `Blit` function so the browser (canvas) and the preview script (PNG) share this code.
 */
import { BIG_TREES, BRAMBLE, BRIDGE, DECOR, GATE_H, METRO_TRAIN, trainArt, useStopColor, LAMP, METRO, SHIP, stall, doorArt, CAT, CAVE, CHAIR, DESK, DRIFT, flag, fountain, TOWNGATE, wheel, FOREST, FOREST_TREES, GATE, house, ITEM_ON_GROUND, LILY_PAD, LOG, NPCS, PALMS, PLANT, SHADOW, SIGN, SNOW_TREES, T, TALL, tallGrass, terrain, useDistrict, useTheme, cityFacing, type Dir, type ItemKind, type Roof, type Theme } from './art';
import { hash, Pix } from './pix';
import { COUNTRIES, present, size, type Country, type MapDef, type Obj, type Save } from './world';

/** Forest drawn around the map, so a screen wider than the map never shows emptiness. */
export const MARGIN = 14;

export type Blit = (p: Pix, x: number, y: number, flip?: boolean, sy0?: number, sy1?: number) => void;

export function tileAt(m: MapDef, x: number, y: number): string {
  if (y < 0 || y >= m.rows.length || x < 0 || x >= m.rows[0].length) {
    // the path leaving the map keeps going into the margin
    const ey = Math.max(0, Math.min(m.rows.length - 1, y));
    const ex = Math.max(0, Math.min(m.rows[0].length - 1, x));
    const edge = m.rows[ey][ex];
    // the sea and (outdoors) paths keep going past the edge of the map
    if (edge === '~') return edge;
    if (edge === '-' && y === ey) return edge;
    if ((edge === ':' || edge === '|') && (y === ey || x === ex) && m.theme !== 'indoor' && m.theme !== 'cave' && m.theme !== 'hall' && m.theme !== 'subway') return edge;
    return FOREST;
  }
  return m.rows[y][x];
}

/** Something with height, in world pixels; `base` is where it stands (its depth). */
export interface Tall { p: Pix; x: number; y: number; base: number }

export interface World { ground: Pix[]; tall: Tall[] }

const mod = (a: number, n: number) => ((a % n) + n) % n;

/** Trees of each outdoor look (caves and houses draw '#' as walls instead). */
const TREES: Partial<Record<Theme, Pix[]>> = { forest: FOREST_TREES, snow: SNOW_TREES, beach: PALMS, town: FOREST_TREES, snowtown: SNOW_TREES, city: FOREST_TREES, oldtown: FOREST_TREES };

/** A forest tile no full tree fits on: a small tree, the big one at half size. */
const bushes = new Map<Pix, Pix>();
function bush(src: Pix): Pix {
  let q = bushes.get(src);
  if (!q) {
    q = new Pix(16, 22);
    for (let y = 0; y < 22; y++) for (let x = 0; x < 16; x++) { const c = src.get(x * 2, y * 2); if (c & 255) q.set(x, y, c); }
    bushes.set(src, q);
  }
  return q;
}

const cache = new Map<string, Pix>();
const once = (key: string, make: () => Pix) => { let p = cache.get(key); if (!p) cache.set(key, (p = make())); return p; };
const houseArt = (roof: Roof) => once(`house:${roof}`, () => house(roof));
const flagArt = (c: Country) => once(`flag:${c}`, () => flag(COUNTRIES[c].flag));
const itemArt = (i: ItemKind) => once(`item:${i}`, () => ITEM_ON_GROUND(i));
const wheelArt = (f: number) => once(`wheel:${f}`, () => wheel(f));
const fountainArt = (f: number) => once(`fountain:${f}`, () => fountain(f));

export function buildWorld(m: MapDef): World {
  const W = m.rows[0].length, H = m.rows.length;
  m.rows.forEach((r, i) => { if (r.length !== W) throw new Error(`map ${m.id}: row ${i} is ${r.length} wide, expected ${W}`); });
  const at = (x: number, y: number) => tileAt(m, x, y);
  useTheme(m.theme);
  useDistrict(m.id);
  if (m.tint) useStopColor(m.tint);
  const trees = TREES[m.theme];
  const ground = [0, 1].map((frame) => {
    const p = new Pix((W + 2 * MARGIN) * T, (H + 2 * MARGIN) * T);
    for (let y = -MARGIN; y < H + MARGIN; y++) for (let x = -MARGIN; x < W + MARGIN; x++) terrain(p, (x + MARGIN) * T, (y + MARGIN) * T, x, y, at, frame);
    return p;
  });

  const tall: Tall[] = [];
  // Forest: trees on every even 2×2 block and, staggered between them, on every odd one, so crowns overlap like a
  // real wood. Forest tiles no tree covers get a small one.
  const covered = new Set<string>();
  // in the city '#' is buildings; only the blocks that face no street are parks with trees
  const cityMap = m.theme === 'city' || m.theme === 'oldtown';
  const woods = (x: number, y: number) => at(x, y) === FOREST && (!cityMap || !cityFacing(at, x, y));
  const forest2 = (x: number, y: number) => woods(x, y) && woods(x + 1, y) && woods(x, y + 1) && woods(x + 1, y + 1);
  for (let y = -MARGIN; y < H + MARGIN; y++) {
    for (let x = -MARGIN; x < W + MARGIN; x++) {
      const even = !mod(x, 2) && !mod(y, 2), odd = mod(x, 2) === 1 && mod(y, 2) === 1;
      if (!trees || !(even || odd) || !forest2(x, y)) continue;
      const p = trees[hash(x, y, 77) < 0.5 ? 0 : 1];
      tall.push({ p, x: x * T, y: (y + 2) * T - p.h, base: (y + 2) * T });
      for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) covered.add(`${x + dx},${y + dy}`);
    }
  }
  for (let y = -MARGIN; y < H + MARGIN; y++) {
    for (let x = -MARGIN; x < W + MARGIN; x++) {
      if (trees && woods(x, y) && !covered.has(`${x},${y}`)) { const b = bush(trees[0]); tall.push({ p: b, x: x * T, y: (y + 1) * T - b.h, base: (y + 1) * T }); }
    }
  }
  for (const o of m.objs) {
    const { h } = size(o);
    const base = (o.y + h) * T;
    if (o.k === 'house') tall.push({ p: houseArt(o.roof), x: o.x * T, y: o.y * T, base });
    else if (o.k === 'tree') tall.push({ p: BIG_TREES[o.tree], x: o.x * T, y: o.y * T, base });
    else if (o.k === 'sign') tall.push({ p: SIGN, x: o.x * T, y: o.y * T, base });
    else if (o.k === 'cave') tall.push({ p: CAVE, x: o.x * T, y: o.y * T, base });
    else if (o.k === 'desk') tall.push({ p: DESK, x: o.x * T, y: base - DESK.h, base });
    else if (o.k === 'chair') tall.push({ p: CHAIR, x: o.x * T - 8, y: base - CHAIR.h, base });
    else if (o.k === 'plant') tall.push({ p: PLANT, x: o.x * T, y: base - PLANT.h, base });
    else if (o.k === 'flag') { const f = flagArt(o.country); tall.push({ p: f, x: o.x * T, y: base - f.h, base }); }
    else if (o.k === 'metro') tall.push({ p: METRO, x: o.x * T, y: base - METRO.h, base });
    else if (o.k === 'stall') { const st = once(`stall:${o.color}`, () => stall(o.color)); tall.push({ p: st, x: o.x * T, y: base - st.h, base }); }
    else if (o.k === 'train') {
      const t = o.kind === 'metro' ? METRO_TRAIN : once(`train:${o.dest}`, () => trainArt(o.dest === 'none' ? 'out' : o.dest === 'frostburg' ? 'regional' : 'intercity'));
      tall.push({ p: t, x: o.x * T, y: base - t.h, base });
    }
    else if (o.k === 'lamp') tall.push({ p: LAMP, x: o.x * T, y: base - LAMP.h, base });
    else if (o.k === 'decor' && DECOR[o.art]) { const d = DECOR[o.art]; tall.push({ p: d, x: o.x * T, y: base - d.h, base }); }
    else if (o.k === 'ship') tall.push({ p: SHIP, x: o.x * T, y: o.y * T, base: o.y * T + 1 });
    // a door is part of the building front: flat on the facade, behind anything in the street
    else if (o.k === 'door') { const d = once(`door:${o.sign}`, () => doorArt(o.sign)); tall.push({ p: d, x: o.x * T, y: o.y * T, base: o.y * T }); }
  }
  tall.sort((a, b) => a.base - b.base);
  return { ground, tall };
}

export interface Actor { px: number; py: number; dir: Dir; step: number; moving: boolean }

/**
 * Everything with height, in depth order. `ox, oy`: where world pixel (0, 0) is on screen; `view` the visible
 * part of the world (to skip what is off screen). `chomp` shakes the log while the beaver gnaws it.
 */
export function drawWorld(blit: Blit, m: MapDef, w: World, s: Save, me: Actor, time: number, ox: number, oy: number,
  view: { x: number; y: number; w: number; h: number }, chomp = false) {
  type D = { base: number; order: number; draw: () => void };
  const list: D[] = [];
  for (const t of w.tall) {
    if (t.x + t.p.w < view.x || t.x > view.x + view.w || t.y + t.p.h < view.y || t.y > view.y + view.h) continue;
    list.push({ base: t.base, order: 0, draw: () => blit(t.p, ox + t.x, oy + t.y) });
  }
  for (const o of m.objs) {
    if (!present(o, s)) continue;
    if (o.k === 'gate' && o.across) list.push({ base: (o.y + 1) * T, order: 1, draw: () => blit(GATE_H, ox + o.x * T, oy + o.y * T) });
    else if (o.k === 'log' || o.k === 'drift' || o.k === 'gate' || o.k === 'pole') {
      const shake = chomp && o.k !== 'gate' ? Math.round(Math.sin(time / 30)) : 0;
      const art = o.k === 'log' ? LOG : o.k === 'drift' ? DRIFT : GATE;
      list.push({ base: (o.y + 2) * T, order: 1, draw: () => blit(art, ox + o.x * T + shake, oy + o.y * T) });
    }
    if (o.k === 'bramble') {
      const shake = chomp ? Math.round(Math.sin(time / 30)) : 0;
      list.push({ base: (o.y + 1) * T, order: 1, draw: () => blit(BRAMBLE, ox + o.x * T + shake, oy + o.y * T) });
    }
    if (o.k === 'towngate') list.push({ base: (o.y + 2) * T, order: 1, draw: () => blit(TOWNGATE, ox + o.x * T, oy + o.y * T) });
    // the lowered bridge lies flat on the water: drawn before anything standing on it
    if (o.k === 'bridge') list.push({ base: -1e9, order: 0, draw: () => blit(BRIDGE, ox + o.x * T, oy + o.y * T) });
    if (o.k === 'wheel') list.push({ base: (o.y + 2) * T, order: 1, draw: () => blit(wheelArt(Math.floor(time / 180) % 8), ox + o.x * T, oy + o.y * T) });
    if (o.k === 'fountain') list.push({ base: (o.y + 2) * T, order: 1, draw: () => blit(fountainArt(Math.floor(time / 200) % 6), ox + o.x * T, oy + o.y * T - 4) });
    if (o.k === 'item') list.push({ base: (o.y + 1) * T, order: 1, draw: () => blit(itemArt(o.item), ox + o.x * T, oy + o.y * T) });
    if (o.k === 'npc') list.push({ base: (o.y + 1) * T, order: 1, draw: () => drawNpc(blit, o, time, ox, oy) });
  }
  list.push({
    base: me.py + T,
    order: 2,
    draw: () => {
      const frames = me.dir === 'down' ? CAT.down : me.dir === 'up' ? CAT.up : CAT.side;
      const f = me.moving ? 1 + (me.step % 2) : 0;
      const bob = me.moving && f ? -1 : 0;
      const x = ox + Math.round(me.px), y = oy + Math.round(me.py);
      blit(SHADOW, x, y);
      blit(frames[f], x, y + bob - 1, me.dir === 'left');
      // standing in tall grass: the front tufts hide the paws
      const tx = Math.round(me.px / T), ty = Math.round(me.py / T);
      if (tileAt(m, tx, ty) === TALL) blit(tallFront(m, tx, ty), ox + tx * T, oy + ty * T);
    },
  });
  list.sort((a, b) => a.base - b.base || a.order - b.order);
  for (const d of list) d.draw();
}

const fronts = new Map<string, Pix>();
function tallFront(m: MapDef, tx: number, ty: number): Pix {
  const key = `${m.id}:${tx},${ty}`;
  let p = fronts.get(key);
  if (!p) {
    p = new Pix(16, 16);
    tallGrass(p, 0, 0, tx, ty, (dx, dy) => tileAt(m, tx + dx, ty + dy) === TALL, true);
    fronts.set(key, p);
  }
  return p;
}

function drawNpc(blit: Blit, o: Extract<Obj, { k: 'npc' }>, time: number, ox: number, oy: number) {
  const x = ox + o.x * T, y = oy + o.y * T;
  const flies = o.npc === 'bird' || o.npc === 'bat';
  if (o.pad) blit(LILY_PAD, x, y + 2);
  else if (o.npc !== 'bird') blit(SHADOW, x, y);
  // small idle motion, different per animal
  const t = time / 1000;
  const bob = o.npc === 'tortoise' ? (Math.floor(t / 1.4) % 2 ? 0 : -1)
    : o.npc === 'frog' ? (Math.floor(t / 0.8) % 3 === 0 ? -1 : 0)
    : o.npc === 'bird' ? (Math.floor(t * 2) % 7 === 0 ? -2 : 0)
    : o.npc === 'bat' ? Math.round(Math.sin(t * 3) * 2)
    : (Math.floor(t / 0.9) % 2 ? 0 : -1);
  const flip = (o.npc === 'bird' && Math.floor(t / 3) % 2 === 1) || (o.npc === 'crab' && Math.floor(t / 1.2) % 2 === 1);
  blit(NPCS[o.npc], x + (o.npc === 'crab' ? Math.round(Math.sin(t * 1.5)) : 0), y + bob + (flies ? -6 : 0), flip);
}
