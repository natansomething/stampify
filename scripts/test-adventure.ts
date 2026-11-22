/**
 * Adventure map checks: `npm run test:adventure`.
 * - Every roadblock (log, brambles, snowdrift, town gate, border barrier) really blocks: with it in place, the cat
 *   reaches fewer tiles from the map's spawn than without it (otherwise it can be walked around).
 * - Every drawbridge matters the same way.
 * - Every warp leads to a map that exists and lands on a walkable tile.
 */
import { FENCE, FOREST, ROCK, TRACK, TRACK_H, WATER } from '../src/games/adventure/art';
import { tileAt } from '../src/games/adventure/render';
import { LINE_KEYS, MAPS, script, solid, type MapDef, type Obj, type Save, type Step } from '../src/games/adventure/world';
import { readdirSync, readFileSync } from 'node:fs';

const BLOCKED = new Set([FOREST, WATER, ROCK, FENCE, TRACK, TRACK_H]);
const BLOCKS = new Set(['log', 'drift', 'bramble', 'towngate', 'gate', 'pole', 'block']);
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

// ONLY=<country>: check just that country's maps (while it is being built)
const ONLY = process.env.ONLY;
for (const m of Object.values(MAPS)) {
  if (ONLY && m.country !== ONLY) continue;
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

// Every line the scripts can say must be in LINE_KEYS (the text check makes each language write them all). Keys are
// often built at run time (`train.price_${currency}`), so play every object's script under many random game states.
{
  const dir = new URL('../src/games/adventure/countries/', import.meta.url);
  const src = [readFileSync(new URL('../src/games/adventure/world.ts', import.meta.url), 'utf8'),
    ...readdirSync(dir).filter((f) => f.endsWith('.ts') && !f.includes('-art')).map((f) => readFileSync(new URL(f, dir), 'utf8'))].join('\n');
  const flags = [...new Set([...src.matchAll(/(?:set|unset): '([a-z0-9_]+)'|has\(s, '([a-z0-9_]+)'\)/g)].map((m) => m[1] ?? m[2]))];
  for (const m of src.matchAll(/set: `([a-z_]+)\$\{/g)) for (const v of ['forest', 'ice', 'metro', 'beach', 'lindenburg', 'frostburg', 'central', 'none']) flags.push(m[1] + v);
  const artSrc = readFileSync(new URL('../src/games/adventure/art.ts', import.meta.url), 'utf8');
  const items = [...(artSrc.match(/export type ItemKind = ([^;]+);/)?.[1].matchAll(/'([a-z_]+)'/g) ?? [])].map((m) => m[1]);
  // the countries' own items: whatever they give
  for (const m of src.matchAll(/give: '([a-z0-9_]+)'/g)) items.push(m[1]);
  let seed = 1;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  const known = new Set<string>(LINE_KEYS as readonly string[]);
  const missing = new Map<string, string>();
  const walk = (steps: Step[], where: string) => {
    for (const st of steps) {
      const r = st as Record<string, unknown>;
      for (const k of ['say', 'ask']) if (typeof r[k] === 'string' && !known.has(r[k] as string)) missing.set(r[k] as string, where);
      for (const o of (r.opts as { o: string; then: Step[] }[] | undefined) ?? []) { if (!known.has(o.o)) missing.set(o.o, where); walk(o.then, where); }
      for (const k of ['pass', 'fail', 'then', 'else']) if (Array.isArray(r[k])) walk(r[k] as Step[], where);
    }
  };
  for (const m of Object.values(MAPS)) for (const o of m.objs) for (let i = 0; i < (ONLY && m.country !== ONLY ? 0 : 120); i++) {
    const p = i === 0 ? 0 : i === 1 ? 1 : rnd();
    const rich = rnd() < 0.5;
    const save: Save = { map: m.id, x: 0, y: 0, dir: 'down', flags: flags.filter(() => rnd() < p), items: items.filter(() => rnd() < p) as Save['items'],
      seen: {}, wallet: rich ? { taler: 99, krone: 99, gulden: 99, bean: 99, kredit: 99, dinar: 99, pearl: 99, sol: 99 } : {} };
    try { walk(script(o, save), `${m.id}/${o.k}${'id' in o ? ':' + o.id : ''}`); } catch { /* a state the game can't reach */ }
  }
  for (const [k, where] of missing) err(`line ${k} (said at ${where}) is not in LINE_KEYS`);
}
console.log(`\n${errors} errors`);
process.exit(errors ? 1 : 0);
