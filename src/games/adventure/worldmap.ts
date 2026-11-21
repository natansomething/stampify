/**
 * The world plan and the world map. The whole journey on one continent: a winding main road from Moosdorf in the
 * south to the beach in the north, looping east and west through eight countries, and a railway straight up the
 * middle with five stations where the road crosses it. Trains run between station cities the cat holds the
 * passport stamp for.
 *
 * Positions are in world-map pixels (240×320). Place and country names here are English working names; the names
 * the player sees come from each language's text file (places), once the place is built.
 */
import { vnoise } from './art';
import { hash, hex, Pix, sprite } from './pix';

export const WW = 240, WH = 320;

export type Biome = 'forest' | 'ice' | 'mountains' | 'jungle' | 'metro' | 'desert' | 'swamp' | 'beach';

export interface WCountry {
  id: string;
  en: string;
  biome: Biome;
  /** What the country is about: the look, the tourist side, ideas for quests. */
  about: string;
}

/** The eight countries in travel order. Ids of built countries match world.ts (forest, ice, beach). */
export const WORLD_COUNTRIES: WCountry[] = [
  { id: 'forest', en: 'Woodland', biome: 'forest', about: 'Green woods and small villages. The start: Moosdorf, then Lindenburg, the first station city.' },
  { id: 'ice', en: 'Frostland', biome: 'ice', about: 'Snow, frozen lakes and ice caves. Frostburg is the capital and second station.' },
  { id: 'mountains', en: 'Rockland', biome: 'mountains', about: 'Rocky peaks, passes and mountain huts. No station: the train goes through a tunnel.' },
  { id: 'jungle', en: 'Rainforest', biome: 'jungle', about: 'Tropical rainforest, rivers, a stilt village and a waterfall.' },
  { id: 'metro', en: 'Megacity', biome: 'metro', about: 'A city state with districts and a metro. Central Station is the hub of the railway.' },
  { id: 'desert', en: 'Desert', biome: 'desert', about: 'Dunes, caravans, ruins and an oasis city with the fourth station.' },
  { id: 'swamp', en: 'Swamp', biome: 'swamp', about: 'Bog, fog and boardwalks between villages on stilts.' },
  { id: 'beach', en: 'Sun Coast', biome: 'beach', about: 'The holiday coast: Sunport, a resort city with the last station, then the beach.' },
];

/** `route`: a named stretch of road (a forest, a pass), shown as a label without a marker. */
export type PlaceKind = 'village' | 'city' | 'district' | 'station' | 'border' | 'sight' | 'route' | 'start' | 'end';

export interface WPlace { id: string; en: string; kind: PlaceKind; x: number; y: number }

/**
 * The main road: control points from Moosdorf to the beach. `c` starts a new country (its index in
 * WORLD_COUNTRIES) from that point on; `p` puts a place on the road there.
 */
const ROAD: { x: number; y: number; c?: number; p?: [string, string, PlaceKind] }[] = [
  // 1 Woodland
  { x: 66, y: 310, c: 0, p: ['moosdorf', 'Moosdorf', 'start'] },
  { x: 86, y: 300, p: ['sonnenwald', 'Sonnenwald', 'route'] }, { x: 96, y: 290 },
  { x: 106, y: 282, p: ['lindenburg', 'Lindenburg', 'station'] },
  { x: 128, y: 286, p: ['millbrook', 'Millbrook', 'village'] }, { x: 150, y: 280, p: ['birchvale', 'Birch Village', 'village'] },
  { x: 172, y: 284 }, { x: 192, y: 276 },
  { x: 208, y: 266, p: ['border_forest', 'Woodland border', 'border'] },
  // 2 Frostland
  { x: 216, y: 252, c: 1 }, { x: 210, y: 240, p: ['snowfield', 'Snowfield', 'village'] }, { x: 196, y: 234, p: ['frostheim', 'Frostheim', 'village'] },
  { x: 178, y: 238 }, { x: 160, y: 230, p: ['icecave', 'Ice cave', 'sight'] }, { x: 138, y: 228 },
  { x: 108, y: 224, p: ['frostburg', 'Frostburg', 'station'] },
  { x: 90, y: 228, p: ['border_ice', 'Frostland border', 'border'] },
  // 3 Rockland
  { x: 72, y: 224, c: 2, p: ['felsdorf', 'Rock Village', 'village'] }, { x: 50, y: 230, p: ['stonebridge', 'Stonebridge', 'city'] }, { x: 30, y: 222 },
  { x: 18, y: 208, p: ['pass', 'High pass', 'sight'] }, { x: 24, y: 194, p: ['passhut', 'Pass Hut', 'village'] },
  { x: 38, y: 186, p: ['border_mountains', 'Rockland border', 'border'] },
  // 4 Rainforest
  { x: 56, y: 182, c: 3, p: ['stilts', 'Stilt Village', 'village'] }, { x: 70, y: 176, p: ['riverport', 'River Port', 'city'] },
  { x: 84, y: 180, p: ['falls', 'Great waterfall', 'sight'] },
  { x: 96, y: 172, p: ['border_jungle', 'Rainforest border', 'border'] },
  // 5 Megacity
  { x: 110, y: 168, c: 4, p: ['central', 'Central Station', 'station'] },
  { x: 130, y: 172, p: ['harbour', 'Harbour District', 'district'] }, { x: 150, y: 164, p: ['towers', 'Tower District', 'district'] },
  { x: 164, y: 168, p: ['border_metro', 'Megacity border', 'border'] },
  // 6 Desert
  { x: 182, y: 164, c: 5, p: ['caravan', 'Caravan Camp', 'village'] }, { x: 202, y: 158, p: ['sandstone', 'Sandstone Town', 'city'] }, { x: 220, y: 146 },
  { x: 224, y: 130, p: ['ruins', 'Old ruins', 'sight'] }, { x: 210, y: 120 }, { x: 186, y: 122 },
  { x: 160, y: 116, p: ['saltflats', 'Salt Flats', 'village'] }, { x: 136, y: 120 },
  { x: 112, y: 116, p: ['oasis', 'Oasis City', 'station'] },
  { x: 92, y: 120, p: ['border_desert', 'Desert border', 'border'] },
  // 7 Swamp
  { x: 72, y: 114, c: 6, p: ['moorheim', 'Bog Village', 'village'] }, { x: 54, y: 118, p: ['reedton', 'Reedton', 'village'] }, { x: 42, y: 104 },
  { x: 46, y: 90, p: ['foglake', 'Fog lake', 'sight'] }, { x: 60, y: 80, p: ['mistmoor', 'Mistmoor', 'city'] },
  { x: 78, y: 76, p: ['border_swamp', 'Swamp border', 'border'] },
  // 8 Sun Coast
  { x: 96, y: 72, c: 7, p: ['palmvillage', 'Palm Village', 'village'] }, { x: 114, y: 68, p: ['sunport', 'Sunport', 'station'] },
  { x: 124, y: 56, p: ['seaside', 'Seaside', 'city'] }, { x: 118, y: 44, p: ['lighthouse', 'Lighthouse', 'sight'] }, { x: 128, y: 34 },
  { x: 142, y: 28, p: ['shellbay', 'Shell Bay', 'end'] },
];

/**
 * Side roads: from a point on the main road out to a place off it (a detour the journey doesn't need, with its own
 * people, quests and tourist chores). `via` bends the road.
 */
const SIDE: { from: [number, number]; via: [number, number]; p: [string, string, PlaceKind]; x: number; y: number }[] = [
  { from: [172, 284], via: [168, 296], p: ['oakridge', 'Oakridge', 'village'], x: 176, y: 304 },
  { from: [178, 238], via: [184, 224], p: ['glacier', 'Glacier Camp', 'village'], x: 180, y: 212 },
  { from: [138, 228], via: [134, 240], p: ['icefjord', 'Icefjord', 'city'], x: 142, y: 250 },
  { from: [30, 222], via: [22, 234], p: ['miners', "Miners' Town", 'city'], x: 28, y: 248 },
  { from: [70, 176], via: [64, 166], p: ['orchid', 'Orchid Town', 'village'], x: 70, y: 156 },
  { from: [84, 180], via: [80, 192], p: ['canopy', 'Canopy Village', 'village'], x: 74, y: 202 },
  { from: [110, 168], via: [112, 158], p: ['oldtown', 'Old Town', 'district'], x: 122, y: 148 },
  { from: [130, 172], via: [134, 182], p: ['market', 'Market District', 'district'], x: 146, y: 188 },
  { from: [186, 122], via: [184, 110], p: ['dunes', 'Dune Village', 'village'], x: 192, y: 100 },
  { from: [42, 104], via: [32, 100], p: ['frogharbour', 'Frog Harbour', 'village'], x: 20, y: 96 },
  { from: [124, 56], via: [138, 58], p: ['coral', 'Coral Town', 'village'], x: 152, y: 62 },
];

/** The Megacity's metro: a loop through its districts. */
const METRO = ['central', 'oldtown', 'towers', 'market', 'harbour'];

/** Stations, south to north: the railway runs straight through them. */
export const STATIONS = ['lindenburg', 'frostburg', 'central', 'oasis', 'sunport'];

/** The country (index) the main road is in at control point i. */
const countryAt = (i: number) => { let c = 0; for (let k = 0; k <= i; k++) if (ROAD[k].c !== undefined) c = ROAD[k].c!; return c; };

export const WORLD_PLACES: (WPlace & { country: number; side?: boolean })[] = [
  ...ROAD.flatMap((r, i) => (r.p ? [{ id: r.p[0], en: r.p[1], kind: r.p[2], x: r.x, y: r.y, country: countryAt(i) }] : [])),
  ...SIDE.map((sd) => {
    const i = ROAD.findIndex((r) => r.x === sd.from[0] && r.y === sd.from[1]);
    if (i < 0) throw new Error(`side road from ${sd.from} is not on the main road`);
    return { id: sd.p[0], en: sd.p[1], kind: sd.p[2], x: sd.x, y: sd.y, country: countryAt(i), side: true };
  }),
];

/** A side road as a smooth curve: from the main road through `via` to the place. */
function sideSamples(sd: (typeof SIDE)[number]): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  const [ax, ay] = sd.from, [bx, by] = sd.via;
  for (let k = 0; k <= 40; k++) {
    const t = k / 40, u = 1 - t;
    out.push({ x: u * u * ax + 2 * u * t * bx + t * t * sd.x, y: u * u * ay + 2 * u * t * by + t * t * sd.y });
  }
  return out;
}

/** The road as a smooth, slightly wavy line of samples, each with its country. */
function roadSamples(): { x: number; y: number; c: number }[] {
  const out: { x: number; y: number; c: number }[] = [];
  let c = 0;
  const P = ROAD;
  for (let i = 0; i < P.length - 1; i++) {
    if (P[i].c !== undefined) c = P[i].c!;
    const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
    const n = Math.ceil(Math.hypot(p2.x - p1.x, p2.y - p1.y) / 1.2);
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      // Catmull-Rom through the control points
      const x = 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
      const y = 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
      // bends between the control points (none at them, so places stay on the road): an S-curve each stretch
      const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const nx = -(p2.y - p1.y) / len, ny = (p2.x - p1.x) / len;
      const amp = Math.min(5, len / 5) * (i % 2 ? 1 : -1);
      const w = Math.sin(Math.PI * t) * amp + Math.sin(Math.PI * 2 * t) * amp * 0.35;
      out.push({ x: x + nx * w, y: y + ny * w, c });
    }
  }
  const last = P[P.length - 1];
  out.push({ x: last.x, y: last.y, c });
  return out;
}

const BIOME: Record<Biome, { ground: string[]; deco: Pix[] }> = (() => {
  const s = (pal: Record<string, string>, rows: string[]) => sprite(pal, rows);
  const tree = s({ g: '#3f9a48', G: '#2a7034', l: '#7cc866', t: '#6a3e1e' }, ['.lgl.', 'glggG', 'gggGG', '.GGG.', '..t..']);
  const pine = s({ g: '#2a6a4a', w: '#ffffff', t: '#6a3e1e' }, ['..w..', '.wgw.', '.ggg.', 'wgggw', 'ggggg', '..t..']);
  const floe = s({ w: '#ffffff', b: '#a8cce4' }, ['.ww.', 'wwwb', '.bb.']);
  const peak = s({ k: '#4a4038', g: '#7a6e62', l: '#a89c8c', w: '#ffffff' }, ['...w...', '..wwk..', '.lggkk.', 'lgggkkk', 'ggggkkk']);
  const palm = s({ g: '#2e8a3a', l: '#5cb85a', t: '#8a6038' }, ['gl.lg', '.glg.', 'g.t.g', '..t..', '..t..']);
  const bush = s({ g: '#1e5e2c', G: '#2e7a3a', l: '#4a9c48' }, ['.lGl.', 'lGGGg', 'GGgGG', '.ggg.']);
  const house = s({ r: '#c0504a', w: '#e8e2d8', k: '#3a3a44', b: '#6a8ab8' }, ['.rrr.', 'rrrrr', 'wbwbw', 'wwkww']);
  const tower = s({ g: '#5a6070', w: '#c8d4e4', y: '#f4d860' }, ['.gg.', 'gywg', 'gwyg', 'gywg', 'gwwg']);
  const dune = s({ d: '#c8a058', l: '#f4e0a8' }, ['..ll..', '.llldd', 'lllddd']);
  const cactus = s({ g: '#4a8a3a', d: '#2e6a2a' }, ['.g.', 'ggg', '.gd', '.g.']);
  const puddle = s({ b: '#3a5a4a', l: '#5a7a6a' }, ['.bbl.', 'bbbbl', '.bbb.']);
  const reed = s({ g: '#4a6a2a', b: '#6a4a2a' }, ['b.b', 'g.g', 'ggg', '.g.']);
  const umbrella = s({ r: '#f04a4a', w: '#ffffff', k: '#5a4a3a' }, ['rwrwr', '..k..', '..k..']);
  return {
    forest: { ground: ['#6cbc54', '#77c45c', '#82cc66'], deco: [tree, tree, bush] },
    ice: { ground: ['#dbe7f2', '#e6eff8', '#f2f7fc'], deco: [pine, floe, pine] },
    mountains: { ground: ['#9c907e', '#aa9e8c', '#b8ad9c'], deco: [peak, peak, peak] },
    jungle: { ground: ['#2f7c3a', '#3a8c42', '#47984a'], deco: [palm, bush, bush] },
    metro: { ground: ['#8c909a', '#989ca6', '#a6aab2'], deco: [tower, house, tower] },
    desert: { ground: ['#e2c27a', '#ead08c', '#f2dca0'], deco: [dune, dune, cactus] },
    swamp: { ground: ['#5e6e3c', '#6a7a46', '#788852'], deco: [puddle, reed, reed] },
    beach: { ground: ['#f0d8a0', '#f4e0b0', '#f8e8c0'], deco: [palm, umbrella, palm] },
  };
})();

/**
 * Draws the world map. `known`: countries the player has reached (others are under cloud); pass every id to see
 * the whole plan.
 */
export function drawWorldMap(known: Set<string>): Pix {
  const p = new Pix(WW, WH);
  const road = [...roadSamples(), ...SIDE.flatMap((sd) => {
    const c = WORLD_PLACES.find((q) => q.id === sd.p[0])!.country;
    return sideSamples(sd).map((q) => ({ ...q, c }));
  })];
  const main = roadSamples();
  const stations = STATIONS.map((id) => WORLD_PLACES.find((q) => q.id === id)!);
  const distRail = (x: number, y: number) => {
    let d = Infinity;
    for (let i = 0; i < stations.length - 1; i++) {
      const a = stations[i], b = stations[i + 1];
      const t = Math.max(0, Math.min(1, ((x - a.x) * (b.x - a.x) + (y - a.y) * (b.y - a.y)) / ((b.x - a.x) ** 2 + (b.y - a.y) ** 2)));
      d = Math.min(d, Math.hypot(x - a.x - t * (b.x - a.x), y - a.y - t * (b.y - a.y)));
    }
    return d;
  };
  // nearest road sample per pixel: land within reach of the road (or the railway), country of that stretch
  const country = new Int8Array(WW * WH).fill(-1);
  const dist = new Float32Array(WW * WH);
  for (let y = 0; y < WH; y++) for (let x = 0; x < WW; x++) {
    let best = Infinity, c = 0;
    for (let i = 0; i < road.length; i += 2) {
      const d = (road[i].x - x) ** 2 + (road[i].y - y) ** 2;
      if (d < best) { best = d; c = road[i].c; }
    }
    const d = Math.min(Math.sqrt(best), distRail(x, y) + 6);
    dist[y * WW + x] = d;
    const reach = 22 + vnoise(x, y, 16, 91) * 16;
    if (d < reach) country[y * WW + x] = c;
  }
  const at = (x: number, y: number) => (x < 0 || y < 0 || x >= WW || y >= WH ? -1 : country[y * WW + x]);
  const sea = ['#2f7cc4', '#3a8ad0', '#4a98da'].map(hex);
  for (let y = 0; y < WH; y++) for (let x = 0; x < WW; x++) {
    const c = at(x, y);
    if (c < 0) {
      const coast = at(x - 1, y) >= 0 || at(x + 1, y) >= 0 || at(x, y - 1) >= 0 || at(x, y + 1) >= 0;
      const wave = (x + Math.round(Math.sin(y / 3) * 2)) % 9 === 0 && y % 4 === 0;
      p.set(x, y, coast ? hex('#d8f0ff') : wave ? sea[2] : sea[vnoise(x, y, 20, 92) < 0.5 ? 0 : 1]);
      continue;
    }
    const g = BIOME[WORLD_COUNTRIES[c].biome].ground.map(hex);
    const n = vnoise(x, y, 9, 93) + (hash(x, y, 94) - 0.5) * 0.2;
    let col = g[n < 0.4 ? 0 : n < 0.65 ? 1 : 2];
    // a darker rim along the coast
    if (at(x - 1, y) < 0 || at(x + 1, y) < 0 || at(x, y - 1) < 0 || at(x, y + 1) < 0) col = hex('#e8d8a8');
    p.set(x, y, col);
  }
  // the megacity's street grid
  for (let y = 0; y < WH; y++) for (let x = 0; x < WW; x++) {
    const c = at(x, y);
    if (c >= 0 && WORLD_COUNTRIES[c].biome === 'metro' && (x % 7 === 0 || y % 7 === 0) && dist[y * WW + x] > 4) p.set(x, y, hex('#74787f'));
  }
  // borders: dashed lines where countries meet
  for (let y = 0; y < WH; y++) for (let x = 0; x < WW; x++) {
    const c = at(x, y);
    if (c < 0) continue;
    const r = at(x + 1, y), d = at(x, y + 1);
    if (((r >= 0 && r !== c) || (d >= 0 && d !== c)) && (x + y) % 4 < 2) p.set(x, y, hex('#3a2a20'));
  }
  // decorations, away from the road and the railway
  for (let gy = 4; gy < WH; gy += 8) for (let gx = 3; gx < WW; gx += 8) {
    const x = gx + Math.floor(hash(gx, gy, 95) * 5), y = gy + Math.floor(hash(gx, gy, 96) * 5);
    const c = at(x, y);
    if (c < 0 || dist[y * WW + x] < 7 || distRail(x, y) < 5 || at(x + 6, y + 5) !== c || at(x - 1, y) !== c) continue;
    const deco = BIOME[WORLD_COUNTRIES[c].biome].deco;
    p.blit(deco[Math.floor(hash(x, y, 97) * deco.length)], x, y);
  }
  // the railway: sleepers and red-and-white rails
  for (let i = 0; i < stations.length - 1; i++) {
    const a = stations[i], b = stations[i + 1];
    const n = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y));
    for (let k = 0; k <= n; k++) {
      const x = Math.round(a.x + ((b.x - a.x) * k) / n), y = Math.round(a.y + ((b.y - a.y) * k) / n);
      p.set(x - 1, y, hex('#3a2a20')); p.set(x + 1, y, hex('#3a2a20'));
      p.set(x, y, Math.floor(k / 3) % 2 ? hex('#ffffff') : hex('#d83a30'));
    }
  }
  // side roads: thinner tracks
  for (const sd of SIDE) for (const q of sideSamples(sd)) {
    const x = Math.round(q.x), y = Math.round(q.y);
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) p.set(x + dx, y + dy, hex('#8a6a46'));
  }
  for (const sd of SIDE) for (const q of sideSamples(sd)) p.set(Math.round(q.x), Math.round(q.y), hex('#efe0b8'));
  // the main road: a light track with a dark edge
  for (const s of main) for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) p.set(Math.round(s.x) + dx, Math.round(s.y) + dy, hex('#7a5a36'));
  for (const s of main) { p.set(Math.round(s.x), Math.round(s.y), hex('#fbeec8')); p.set(Math.round(s.x) + 1, Math.round(s.y), hex('#fbeec8')); }
  // the metro: a blue loop through the Megacity's districts
  const stops = METRO.map((id) => WORLD_PLACES.find((q) => q.id === id)!);
  for (let i = 0; i < stops.length; i++) {
    const a = stops[i], b = stops[(i + 1) % stops.length];
    const n = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y));
    for (let k = 0; k <= n; k++) if (k % 3 !== 2) p.set(Math.round(a.x + ((b.x - a.x) * k) / n), Math.round(a.y + ((b.y - a.y) * k) / n) + 2, hex('#2a5ad8'));
  }
  // places
  for (const q of WORLD_PLACES) {
    const x = q.x, y = q.y;
    if (q.kind === 'district') {
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) p.set(x + dx, y + dy, Math.abs(dx) === 2 || Math.abs(dy) === 2 ? hex('#1a2a6a') : hex('#d8e2ff'));
    } else if (q.kind === 'station' || q.kind === 'city' || q.kind === 'start' || q.kind === 'end') {
      const big = q.kind === 'station' ? 3 : 2;
      for (let dy = -big; dy <= big; dy++) for (let dx = -big; dx <= big; dx++) {
        const edge = Math.abs(dx) === big || Math.abs(dy) === big;
        p.set(x + dx, y + dy, edge ? hex('#2a1a10') : q.kind === 'station' ? hex('#d83a30') : hex('#fff4d8'));
      }
      if (q.kind === 'station') { p.set(x, y, hex('#ffffff')); p.set(x - 1, y, hex('#ffffff')); p.set(x + 1, y, hex('#ffffff')); }
    } else if (q.kind === 'village') {
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) p.set(x + dx, y + dy, hex('#fff4d8'));
      p.set(x - 2, y, hex('#2a1a10')); p.set(x + 2, y, hex('#2a1a10')); p.set(x, y - 2, hex('#2a1a10')); p.set(x, y + 2, hex('#2a1a10'));
    } else if (q.kind === 'border') {
      for (let dx = -3; dx <= 3; dx++) p.set(x + dx, y - 3, dx % 2 ? hex('#d83a30') : hex('#ffffff'));
      p.set(x - 3, y - 2, hex('#2a1a10')); p.set(x - 3, y - 1, hex('#2a1a10'));
    } else if (q.kind === 'sight') {
      for (const [dx, dy] of [[0, -2], [-1, -1], [0, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-1, 1], [1, 1]]) p.set(x + dx, y + dy, hex('#f4d860'));
    }
  }
  // clouds over countries not reached yet
  for (let y = 0; y < WH; y++) for (let x = 0; x < WW; x++) {
    const c = at(x, y);
    if (c < 0 || known.has(WORLD_COUNTRIES[c].id)) continue;
    const n = vnoise(x, y, 12, 98);
    p.set(x, y, n > 0.55 ? hex('#f4f6faf0') : n > 0.4 ? hex('#e2e8f0e6') : hex('#cfd8e4dd'));
  }
  return p;
}
