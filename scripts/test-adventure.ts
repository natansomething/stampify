/**
 * Adventure map checks: `npm run test:adventure`.
 * - Every roadblock (log, brambles, snowdrift, town gate, border barrier) really blocks: with it in place, the cat
 *   reaches fewer tiles from the map's spawn than without it (otherwise it can be walked around).
 * - Every drawbridge matters the same way.
 * - Every warp leads to a map that exists and lands on a walkable tile.
 */
import { FENCE, FOREST, ROCK, TRACK, TRACK_H, WATER } from '../src/games/adventure/art';
import { tileAt } from '../src/games/adventure/render';
import { MAPS, solid, type MapDef, type Obj } from '../src/games/adventure/world';

const BLOCKED = new Set([FOREST, WATER, ROCK, FENCE, TRACK, TRACK_H]);
const BLOCKS = new Set(['log', 'drift', 'bramble', 'towngate', 'gate', 'pole']);
let errors = 0;
const err = (m: string) => { errors++; console.log('  ERROR ' + m); };

/** The set of tiles reachable from (sx, sy). */
function reachSet(m: MapDef, objs: Obj[], sx: number, sy: number): Set<string> {
  const W = m.rows[0].length, H = m.rows.length;
  const solidAt = new Set<string>();
  const deck = new Set<string>();
  for (const o of objs) {
    if (o.k === 'bridge') { for (let y = 0; y < 2; y++) for (let x = 0; x < 3; x++) deck.add(`${o.x + x},${o.y + y}`); continue; }
    for (const [dx, dy] of solid(o)) solidAt.add(`${o.x + dx},${o.y + dy}`);
  }
  const ok = (x: number, y: number) => x >= 0 && y >= 0 && x < W && y < H && !solidAt.has(`${x},${y}`) && (!BLOCKED.has(tileAt(m, x, y)) || deck.has(`${x},${y}`));
  const seen = new Set<string>([`${sx},${sy}`]);
  const q = [[sx, sy]];
  while (q.length) {
    const [x, y] = q.pop()!;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const k = `${x + dx},${y + dy}`;
      if (!seen.has(k) && ok(x + dx, y + dy)) { seen.add(k); q.push([x + dx, y + dy]); }
    }
  }
  return seen;
}

/** Tiles reachable from (sx, sy) with the given objects in place. */
function reach(m: MapDef, objs: Obj[], sx: number, sy: number, ignore?: Obj): number {
  const W = m.rows[0].length, H = m.rows.length;
  const solidAt = new Set<string>();
  const deck = new Set<string>();
  for (const o of objs) {
    if (o.k === 'bridge') { for (let y = 0; y < 2; y++) for (let x = 0; x < 3; x++) deck.add(`${o.x + x},${o.y + y}`); continue; }
    for (const [dx, dy] of solid(o)) solidAt.add(`${o.x + dx},${o.y + dy}`);
  }
  const ok = (x: number, y: number) => x >= 0 && y >= 0 && x < W && y < H && !solidAt.has(`${x},${y}`) && (!BLOCKED.has(tileAt(m, x, y)) || deck.has(`${x},${y}`));
  const seen = new Set<string>([`${sx},${sy}`]);
  const q = [[sx, sy]];
  while (q.length) {
    const [x, y] = q.pop()!;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const k = `${x + dx},${y + dy}`;
      if (!seen.has(k) && ok(x + dx, y + dy)) { seen.add(k); q.push([x + dx, y + dy]); }
    }
  }
  // the roadblock's own tiles don't count: walking around it is what matters
  if (ignore) for (const [dx, dy] of solid(ignore)) seen.delete(`${ignore.x + dx},${ignore.y + dy}`);
  return seen.size;
}

for (const m of Object.values(MAPS)) {
  console.log(m.id);
  const { x, y } = m.spawn;
  // with every roadblock in place and every bridge raised
  const closed = m.objs.filter((o) => o.k !== 'bridge');
  for (const o of m.objs) {
    if (BLOCKS.has(o.k)) {
      if (reach(m, closed, x, y, o) === reach(m, closed.filter((p) => p !== o), x, y, o)) err(`${m.id}: ${o.k} "${o.id}" at ${o.x},${o.y} can be walked around`);
    }
    if (o.k === 'bridge') {
      if (reach(m, closed, x, y, o) === reach(m, [...closed, o], x, y, o)) err(`${m.id}: bridge "${o.id}" doesn't connect anything`);
    }
  }
  // with every roadblock cleared and bridges down, every exit, door and metro stop can be reached from the spawn
  // (from every way into the map: platforms between tracks are only reached by their own stairs)
  const open = m.objs.filter((o) => !BLOCKS.has(o.k));
  const entries: [number, number][] = [[x, y], ...Object.values(MAPS).flatMap((o) => o.warps.filter((w) => w.to === m.id).map((w): [number, number] => [w.tx, w.ty]))];
  const reachable = new Set<string>();
  for (const [ex, ey] of entries) for (const k of reachSet(m, open, ex, ey)) reachable.add(k);
  for (const w of m.warps) {
    const from = w.door ? [w.x, w.y + 1] : [w.x, w.y];
    if (!reachable.has(`${from[0]},${from[1]}`)) err(`${m.id}: ${w.door ? 'door' : 'exit'} to ${w.to} at ${w.x},${w.y} can't be reached`);
  }
  for (const o of m.objs) if (o.k === 'metro' && !reachable.has(`${o.x},${o.y + 2}`)) err(`${m.id}: metro stop ${o.id} can't be reached`);
  for (const w of m.warps) {
    const t = MAPS[w.to];
    if (!t) { err(`${m.id}: warp to unknown map ${w.to}`); continue; }
    if (BLOCKED.has(tileAt(t, w.tx, w.ty))) err(`${m.id}: warp to ${w.to} lands on a blocked tile ${w.tx},${w.ty}`);
  }
}
console.log(`\n${errors} errors`);
process.exit(errors ? 1 : 0);
