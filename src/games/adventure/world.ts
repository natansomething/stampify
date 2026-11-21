/**
 * The adventure's world: countries, maps, objects and quest scripts. Nothing here is in any language: every line
 * is a key into the language's text file (src/content/<lang>/adventure.ts), so the game is the same for every
 * course and only the dialogue changes. Each course keeps its own save (LangState.adv).
 *
 * The journey: the cat travels as a tourist through fictional countries. Each country ends at a border office,
 * where a short language exam on the words met in that country earns a passport stamp and opens the barrier.
 * Waldland (forest) → Frostland (snow, ice cave) → Sonnenküste (beach: the holiday at the end).
 */
import { DECOR_SIZE, type Dir, type ItemKind, type NpcKind, type Roof, type Theme, type TreeKind } from './art';

export type Country = 'forest' | 'ice' | 'metro' | 'beach';

export const COUNTRIES: Record<Country, {
  /** Flag colours (top, bottom). */
  flag: [string, string];
  /** Stamp ink. */
  ink: string;
  /** Line keys (prefixes) that belong to the country: exam words come from those the player has read. */
  lines: string[];
}> = {
  forest: {
    flag: ['#2e8a40', '#f4d860'], ink: '#2e7a3a',
    lines: ['tortoise.', 'beaver.', 'frog.', 'bird.', 'tree.', 'log.', 'sign.village', 'sign.east', 'house.', 'owl.', 'gate.', 'sign.border1', 'flag.forest', 'plant.',
      'hedgehog.', 'deer.', 'bramble.', 'pickup.', 'pass_l', 'board.station_lindenburg', 'sign.sonnenwald', 'dog.', 'fox.', 'rabbit.', 'fountain.', 'station.', 'towngate.', 'sign.lindenburg', 'sign.timetable',
      'mouse.', 'badger.', 'wheel.', 'sign.millbrook', 'sign.bridge', 'goose.', 'sign.birchvale', 'sign.bus', 'sign.crossroads', 'squirrel.', 'sign.oakridge'],
  },
  ice: {
    flag: ['#ffffff', '#3a78c8'], ink: '#2a5aa8',
    lines: ['penguin.', 'bat.', 'snow.', 'pickup.shovel', 'cave.', 'sign.frost', 'sign.cave', 'walrus.', 'sign.border2', 'flag.ice',
      'polarbear.', 'exch.', 'shop.', 'husky.', 'seal.', 'local.', 'pass_f', 'board.station_frostburg', 'sign.snowfield', 'sign.storm', 'sign.glacier', 'sign.sled', 'sign.frostburg', 'sign.timetable2', 'sign.icefjord', 'train.'],
  },
  metro: {
    flag: ['#2a2a3a', '#e03a8a'], ink: '#7a3aa8',
    lines: ['pigeon.', 'seagull.', 'sloth.', 'mexch.', 'cred.', 'metro.', 'cafe.', 'courier.', 'pig.', 'school.', 'flamingo.', 'house.cafe', 'house.lost', 'house.museum', 'house.hotel', 'house.tower', 'house.courier', 'house.school', 'house.station', 'sign.central', 'sign.oldtown', 'sign.harbour', 'sign.market', 'sign.towers', 'sign.metromap', 'sign.border3', 'flag.metro', 'stall.', 'decor.', 'pass_c', 'mp_', 'board.station_central', 'board.metro', 'hanna_mc.', 'greta_mc.', 'fritz_mc.', 'mia_mc.', 'frieda_mc.', 'rieke_mc.'],
  },
  beach: { flag: ['#f09a30', '#30b8c0'], ink: '#c0392b', lines: ['crab.', 'chair.', 'sign.beach', 'end.'] },
};
/** The countries in travel order; the stamp for entering country i is earned at the border of country i-1. */
export const ROUTE: Country[] = ['forest', 'ice', 'metro', 'beach'];

export type Obj =
  | { k: 'house'; id: string; x: number; y: number; roof: Roof }
  | { k: 'tree'; id: string; x: number; y: number; tree: TreeKind }
  | { k: 'npc'; id: string; x: number; y: number; npc: NpcKind; /** drawn on a lily pad */ pad?: boolean }
  /** Roadblocks that go once a quest is done (the flag in `until`). Brambles are 2×1, the others 1×2. */
  | { k: 'log' | 'drift' | 'bramble' | 'towngate' | 'pole'; id: string; x: number; y: number; until: string }
  /** A drawbridge (3×2) over a river: walkable once lowered (the flag in `when`). */
  | { k: 'bridge'; id: string; x: number; y: number; when: string }
  | { k: 'wheel' | 'fountain' | 'lamp' | 'ship'; id: string; x: number; y: number }
  /** A door in a city building's front (the building itself is '#' tiles), with a sign telling what's inside. */
  | { k: 'door'; id: string; x: number; y: number; sign: string }
  /** A metro entrance (2×2); `stop` is the district. */
  | { k: 'metro'; id: string; x: number; y: number; stop: string }
  /** A market stall (2×1); talking to it talks to the vendor behind it, if any. */
  | { k: 'stall'; id: string; x: number; y: number; color: string; vendor?: string }
  /** A train or metro standing at a platform (12×2 / 10×2). */
  | { k: 'train'; id: string; x: number; y: number; kind: 'train' | 'metro'; /** mainline: the station city it goes to, or 'none' (out of service) */ dest?: string }
  /** Street furniture, parked cars… (art: a key of DECOR in art.ts). */
  | { k: 'decor'; id: string; x: number; y: number; art: string }
  /** The border barrier: open once the country's exam is passed. */
  | { k: 'gate'; id: string; x: number; y: number; country: Country; /** across a north-south road (2×1) */ across?: boolean }
  | { k: 'sign'; id: string; x: number; y: number }
  | { k: 'cave'; id: string; x: number; y: number }
  /** The office counter: talking to it talks to the clerk behind it. */
  | { k: 'desk'; id: string; x: number; y: number; clerk: string }
  | { k: 'chair'; id: string; x: number; y: number }
  | { k: 'flag'; id: string; x: number; y: number; country: Country }
  | { k: 'plant'; id: string; x: number; y: number }
  /** Something to pick up; gone once taken. */
  | { k: 'item'; id: string; x: number; y: number; item: ItemKind };

/**
 * A way to another map. Most trigger when the cat steps on the tile (map edges, doormats); `door` ones when it
 * walks into the tile (a house door). `say` is a line shown on arrival (slipping back in the cave).
 */
export interface Warp { x: number; y: number; to: string; tx: number; ty: number; dir: Dir; door?: boolean; say?: string }

export interface MapDef {
  id: string;
  country: Country;
  /** Where the dev menu's teleport puts the cat. */
  spawn: { x: number; y: number; dir: Dir };
  /** Where the map is on the world map (a place id in worldmap.ts). */
  at: string;
  theme: Theme;
  rows: string[];
  objs: Obj[];
  warps: Warp[];
  /** What the water is called by the "name it" key, when it isn't the theme's usual (a river, not a pond). */
  water?: 'river' | 'sea';
  /** Metro platforms: the colour of the station's tiles. */
  tint?: string;
}

/** Footprint of an object in tiles. */
export function size(o: Obj): { w: number; h: number } {
  if (o.k === 'house') return { w: 5, h: 4 };
  if (o.k === 'tree') return { w: 3, h: 3 };
  if (o.k === 'gate' && o.across) return { w: 2, h: 1 };
  if (o.k === 'log' || o.k === 'drift' || o.k === 'gate' || o.k === 'towngate' || o.k === 'pole' || o.k === 'wheel') return { w: 1, h: 2 };
  if (o.k === 'bramble') return { w: 2, h: 1 };
  if (o.k === 'bridge') return { w: 3, h: 2 };
  if (o.k === 'fountain' || o.k === 'metro') return { w: 2, h: 2 };
  if (o.k === 'stall') return { w: 2, h: 1 };
  if (o.k === 'train') return o.kind === 'train' ? { w: 12, h: 2 } : { w: 10, h: 2 };
  if (o.k === 'decor') { const [w, h] = DECOR_SIZE[o.art] ?? [1, 1]; return { w, h }; }
  if (o.k === 'ship') return { w: 3, h: 2 };
  if (o.k === 'cave') return { w: 3, h: 2 };
  if (o.k === 'desk') return { w: 5, h: 1 };
  return { w: 1, h: 1 };
}

/**
 * The tiles an object blocks, relative to its corner. Big tree crowns leave their top corners free, so the cat can
 * step partly behind them (it is drawn behind; the forest edge works the same way).
 */
export function solid(o: Obj): [number, number][] {
  if (o.k === 'bridge') return [];
  if (o.k === 'tree') return [[1, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]];
  const { w, h } = size(o);
  const out: [number, number][] = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) out.push([x, y]);
  return out;
}

// ---------------------------------------------------------------- maps

const edge = (x: number, ys: number[], to: string, tx: number, tys: number[], dir: Dir): Warp[] => ys.map((y, i) => ({ x, y, to, tx, ty: tys[i], dir }));

const VILLAGE: MapDef = {
  id: 'village', at: 'moosdorf', country: 'forest', theme: 'forest', spawn: { x: 6, y: 7, dir: 'down' },
  rows: [
    '################################',
    '################################',
    '##............................##',
    '##..........................y.##',
    '##..r.........................##',
    '##..........................r.##',
    '##.y..........................##',
    '##....:.......:...............##',
    '##....:.......:.......r.......##',
    '##..r.:.......:...............##',
    '##.:::::::::::::::::::::::::::::',
    '##.:::::::::::::::::::::::::::::',
    '##............................##',
    '##..w......................o..##',
    '##.y.~~~~.....==========....w.##',
    '##..~~~~~~....................##',
    '##.~~~~~~~~......"""""".......##',
    '##.~~~~~~~~.....""""""""......##',
    '##..~~~~~~......""""""""......##',
    '##...~~~~........"""""".......##',
    '##..........r..............y..##',
    '##............................##',
    '################################',
    '################################',
  ],
  objs: [
    { k: 'house', id: 'house_tilde', x: 4, y: 3, roof: 'red' },
    { k: 'house', id: 'house_blue', x: 12, y: 3, roof: 'blue' },
    { k: 'tree', id: 'birch', x: 20, y: 4, tree: 'birch' },
    { k: 'tree', id: 'willow', x: 11, y: 15, tree: 'willow' },
    { k: 'tree', id: 'pine', x: 25, y: 15, tree: 'pine' },
    { k: 'log', id: 'log', x: 29, y: 10, until: 'log_cleared' },
    { k: 'sign', id: 'sign_village', x: 10, y: 9 },
    { k: 'sign', id: 'sign_east', x: 27, y: 9 },
    { k: 'npc', id: 'tortoise', x: 9, y: 8, npc: 'tortoise' },
    { k: 'npc', id: 'beaver', x: 26, y: 12, npc: 'beaver' },
    { k: 'npc', id: 'frog', x: 3, y: 16, npc: 'frog', pad: true },
    { k: 'npc', id: 'bird', x: 19, y: 14, npc: 'bird' },
  ],
  warps: edge(31, [10, 11], 'sonnenwald', 1, [15, 16], 'right'),
};

/**
 * The border woods: the road comes from Birkenhain in the west and turns north to Frostland (as on the world
 * map). The last stretch runs between thick forest, so the barrier closes the road completely.
 */
const BORDER_FOREST: MapDef = {
  id: 'border_forest', at: 'border_forest', country: 'forest', theme: 'forest', spawn: { x: 2, y: 18, dir: 'right' },
  rows: [
    '##################::##########',
    '##################::##########',
    '##################::##########',
    '##################::##########',
    '##################::##########',
    '##################::##########',
    '##################::##########',
    '##################::##########',
    '###...............::........##',
    '##.....r..........::........##',
    '##................::........##',
    '##..y.............::........##',
    '##................::........##',
    '##................::........##',
    '##................::...:....##',
    '##................::::::....##',
    '##................::........##',
    '##................::........##',
    '::::::::::::::::::::........##',
    '::::::::::::::::::::........##',
    '##..""""".................w.##',
    '##.."""""""...............o.##',
    '##..""""".......r...........##',
    '##..........................##',
    '##############################',
    '##############################',
  ],
  objs: [
    { k: 'house', id: 'office_forest_door', x: 21, y: 10, roof: 'green' },
    { k: 'flag', id: 'flag_forest', x: 26, y: 12, country: 'forest' },
    { k: 'sign', id: 'sign_border1', x: 17, y: 9 },
    { k: 'gate', id: 'gate_forest', x: 18, y: 7, country: 'forest', across: true },
    { k: 'tree', id: 'oak_border', x: 6, y: 12, tree: 'oak' },
  ],
  warps: [
    ...edge(0, [18, 19], 'birchvale', 30, [10, 11], 'left'),
    { x: 18, y: 0, to: 'snowfield', tx: 14, ty: 22, dir: 'up' }, { x: 19, y: 0, to: 'snowfield', tx: 15, ty: 22, dir: 'up' },
    { x: 23, y: 13, to: 'office_forest', tx: 5, ty: 7, dir: 'up', door: true },
  ],
};

/** A small room with a counter and someone behind it (border offices, the tourist information, the bakery). */
const interior = (id: string, country: Country, clerk: NpcKind, back: string, bx: number, by: number, at: string, flag?: Country): MapDef => ({
  id, at, country, theme: 'indoor', spawn: { x: 5, y: 7, dir: 'up' },
  rows: [
    '###########',
    '###########',
    '#.........#',
    '#.........#',
    '#.........#',
    '#.........#',
    '#.........#',
    '#.........#',
    '#####:#####',
  ],
  objs: [
    { k: 'npc', id: clerk, x: 5, y: 2, npc: clerk },
    { k: 'desk', id: `desk_${id}`, x: 3, y: 3, clerk },
    { k: 'plant', id: 'plant', x: 1, y: 2 },
    { k: 'plant', id: 'plant', x: 9, y: 2 },
    ...(flag ? [{ k: 'flag' as const, id: `flag_${flag}`, x: 8, y: 2, country: flag }] : []),
  ],
  warps: [{ x: 5, y: 8, to: back, tx: bx, ty: by, dir: 'down' }],
});
const office = (id: string, country: Country, clerk: NpcKind, back: string, bx: number, by: number, at: string) => interior(id, country, clerk, back, bx, by, at, country);

/** Sonnenwald: not a village, the forest road from Moosdorf north to Lindenburg, past the hedgehog's cottage. */
const SONNENWALD: MapDef = {
  id: 'sonnenwald', at: 'sonnenwald', country: 'forest', theme: 'forest', spawn: { x: 2, y: 15, dir: 'right' },
  rows: [
    '######################::######',
    '######################::######',
    '######################::######',
    '######################::######',
    '##..........y.........::....##',
    '##..####..............::....##',
    '##..####.......r......::..y.##',
    '##....................::....##',
    '##....................::....##',
    '##..............###...::....##',
    '##..............###...::....##',
    '##....................::....##',
    '##.=====..:...........::....##',
    '##........:...........::....##',
    '##........:...........::....##',
    '::::::::::::::::::::::::....##',
    '::::::::::::::::::::::::....##',
    '##....................y.....##',
    '##....."""".................##',
    '##....""""""........~~~~....##',
    '##....."""".........~~~~~...##',
    '##..........r........~~~....##',
    '##############################',
    '##############################',
  ],
  objs: [
    { k: 'house', id: 'house_hedgehog', x: 8, y: 8, roof: 'red' },
    { k: 'tree', id: 'oak', x: 24, y: 7, tree: 'oak' },
    { k: 'bramble', id: 'bramble', x: 22, y: 3, until: 'brambles_cut' },
    { k: 'sign', id: 'sign_sonnenwald', x: 3, y: 14 },
    { k: 'npc', id: 'hedgehog', x: 12, y: 13, npc: 'hedgehog' },
    { k: 'npc', id: 'deer', x: 26, y: 17, npc: 'deer' },
    { k: 'item', id: 'mush_red', x: 7, y: 19, item: 'mushroom_red' },
    { k: 'item', id: 'mush_brown', x: 14, y: 20, item: 'mushroom_brown' },
    { k: 'item', id: 'mush_yellow', x: 18, y: 18, item: 'mushroom_yellow' },
  ],
  warps: [
    ...edge(0, [15, 16], 'village', 30, [10, 11], 'left'),
    { x: 22, y: 0, to: 'lindenburg', tx: 10, ty: 24, dir: 'up' }, { x: 23, y: 0, to: 'lindenburg', tx: 11, ty: 24, dir: 'up' },
  ],
};

/** Lindenburg: the first town, with the railway running through it and its station. */
const LINDENBURG: MapDef = {
  id: 'lindenburg', at: 'lindenburg', country: 'forest', theme: 'town', spawn: { x: 10, y: 23, dir: 'up' },
  rows: [
    '################||################',
    '################||################',
    '##..............||..............##',
    '##..............||..............##',
    '##..............||..............##',
    '##..............||..............##',
    '##..............||..............##',
    '##..............||..............##',
    '##..............||..............##',
    '##..............||..............##',
    '##..............||..............##',
    '##..............||..............##',
    '##..............||..............##',
    '##..............||..............##',
    '##........::::::::::::::::::::::::',
    '##........::::::::::::::::::::::::',
    '##........::....||..............##',
    '##........::....||..............##',
    '##........::....||..............##',
    '##........::....||..............##',
    '##........::....||..............##',
    '##........::....||..............##',
    '##........::....||..............##',
    '##........::....||..............##',
    '##........::....||..............##',
    '##########::####||################',
  ],
  objs: [
    { k: 'house', id: 'info_door', x: 3, y: 3, roof: 'blue' },
    { k: 'house', id: 'house_cafe', x: 9, y: 3, roof: 'red' },
    { k: 'house', id: 'station', x: 18, y: 8, roof: 'green' },
    { k: 'house', id: 'house_town1', x: 25, y: 3, roof: 'red' },
    { k: 'house', id: 'house_town2', x: 24, y: 17, roof: 'blue' },
    { k: 'house', id: 'house_town3', x: 3, y: 18, roof: 'red' },
    { k: 'fountain', id: 'fountain', x: 5, y: 10 },
    { k: 'sign', id: 'sign_lindenburg', x: 12, y: 21 },
    { k: 'sign', id: 'sign_timetable', x: 23, y: 12 },
    { k: 'towngate', id: 'towngate', x: 31, y: 14, until: 'gate_open' },
    { k: 'npc', id: 'dog', x: 30, y: 16, npc: 'dog' },
    { k: 'npc', id: 'rabbit', x: 9, y: 12, npc: 'rabbit' },
  ],
  warps: [
    { x: 10, y: 25, to: 'sonnenwald', tx: 22, ty: 1, dir: 'down' }, { x: 11, y: 25, to: 'sonnenwald', tx: 23, ty: 1, dir: 'down' },
    ...edge(33, [14, 15], 'millbrook', 1, [10, 11], 'right'),
    { x: 5, y: 6, to: 'tourist_info', tx: 5, ty: 7, dir: 'up', door: true },
    { x: 20, y: 11, to: 'station_lindenburg', tx: 11, ty: 13, dir: 'up', door: true },
  ],
};

/** Mühlbach (Millbrook): a mill on a river; the miller's drawbridge is the way on. */
const MILLBROOK: MapDef = {
  id: 'millbrook', at: 'millbrook', country: 'forest', theme: 'forest', water: 'river', spawn: { x: 2, y: 10, dir: 'right' },
  rows: [
    '###############~~~##############',
    '###############~~~##############',
    '##.............~~~............##',
    '##..r..........~~~............##',
    '##.............~~~............##',
    '##.............~~~.....y......##',
    '##.............~~~............##',
    '##...:.........~~~............##',
    '##...:.........~~~............##',
    '##...:.........~~~............##',
    ':::::::::::::::~~~::::::::::::::',
    ':::::::::::::::~~~::::::::::::::',
    '##.............~~~............##',
    '##.."""""""....~~~...""""""...##',
    '##.."""""""....~~~...""""""...##',
    '##.."""""""....~~~...""""""...##',
    '##.............~~~............##',
    '##......y......~~~.......r....##',
    '##.............~~~............##',
    '##.............~~~............##',
    '###############~~~##############',
    '###############~~~##############',
  ],
  objs: [
    { k: 'house', id: 'bakery_door', x: 3, y: 3, roof: 'red' },
    { k: 'house', id: 'house_mill', x: 19, y: 3, roof: 'blue' },
    { k: 'wheel', id: 'wheel', x: 18, y: 4 },
    { k: 'bridge', id: 'bridge', x: 15, y: 10, when: 'bridge_down' },
    { k: 'sign', id: 'sign_millbrook', x: 3, y: 9 },
    { k: 'sign', id: 'sign_bridge', x: 13, y: 9 },
    { k: 'npc', id: 'mouse', x: 13, y: 12, npc: 'mouse' },
  ],
  warps: [
    ...edge(0, [10, 11], 'lindenburg', 32, [14, 15], 'left'),
    ...edge(31, [10, 11], 'birchvale', 1, [10, 11], 'right'),
    { x: 5, y: 6, to: 'bakery', tx: 5, ty: 7, dir: 'up', door: true },
  ],
};

/** Birkenhain (Birch Village): birches, a bus stop, and the crossroads: east to the border, south to Eichental. */
const BIRCHVALE: MapDef = {
  id: 'birchvale', at: 'birchvale', country: 'forest', theme: 'forest', spawn: { x: 2, y: 10, dir: 'right' },
  rows: [
    '################################',
    '################################',
    '##............................##',
    '##..r.........................##',
    '##............................##',
    '##.......................y....##',
    '##............................##',
    '##....:.....:.................##',
    '##....:.....:.................##',
    '##....:.....:.................##',
    '::::::::::::::::::::::::::::::::',
    '::::::::::::::::::::::::::::::::',
    '##..................::........##',
    '##..................::........##',
    '##..y...............::....r...##',
    '##..................::........##',
    '##..................::........##',
    '##..................::........##',
    '##....w.............::........##',
    '##..................::........##',
    '##..................::........##',
    '##..................::........##',
    '####################::##########',
    '####################::##########',
  ],
  objs: [
    { k: 'house', id: 'house_birch1', x: 4, y: 3, roof: 'red' },
    { k: 'house', id: 'house_birch2', x: 10, y: 3, roof: 'blue' },
    { k: 'tree', id: 'birch_b1', x: 24, y: 2, tree: 'birch' },
    { k: 'tree', id: 'birch_b2', x: 26, y: 14, tree: 'birch' },
    { k: 'tree', id: 'birch_b3', x: 5, y: 13, tree: 'birch' },
    { k: 'sign', id: 'sign_birchvale', x: 3, y: 9 },
    { k: 'sign', id: 'sign_bus', x: 17, y: 12 },
    { k: 'sign', id: 'sign_crossroads', x: 22, y: 12 },
    { k: 'npc', id: 'goose', x: 14, y: 12, npc: 'goose' },
    { k: 'item', id: 'case_rb', x: 13, y: 14, item: 'suitcase_rb' },
    { k: 'item', id: 'case_ry', x: 16, y: 14, item: 'suitcase_ry' },
    { k: 'item', id: 'case_by', x: 18, y: 13, item: 'suitcase_by' },
  ],
  warps: [
    ...edge(0, [10, 11], 'millbrook', 30, [10, 11], 'left'),
    ...edge(31, [10, 11], 'border_forest', 1, [18, 19], 'right'),
    { x: 20, y: 23, to: 'oakridge', tx: 12, ty: 1, dir: 'down' }, { x: 21, y: 23, to: 'oakridge', tx: 13, ty: 1, dir: 'down' },
  ],
};

/** Eichental (Oakridge): a village of old oaks at the end of the side road; the squirrel's acorns. */
const OAKRIDGE: MapDef = {
  id: 'oakridge', at: 'oakridge', country: 'forest', theme: 'forest', spawn: { x: 12, y: 2, dir: 'down' },
  rows: [
    '############::##############',
    '############::##############',
    '##..........::............##',
    '##..........::............##',
    '##..........::............##',
    '##..........::....r.......##',
    '##..........::............##',
    '##..::::::::::::::::::::..##',
    '##..:..................:..##',
    '##..:..................:..##',
    '##..:........y.........:..##',
    '##..:..................:..##',
    '##..::::::::::::::::::::..##',
    '##........................##',
    '##..w.................r...##',
    '##........................##',
    '##........................##',
    '##........................##',
    '############################',
    '############################',
  ],
  objs: [
    { k: 'tree', id: 'oak1', x: 6, y: 2, tree: 'oak' },
    { k: 'tree', id: 'oak2', x: 17, y: 2, tree: 'oak' },
    { k: 'tree', id: 'oak3', x: 6, y: 14, tree: 'oak' },
    { k: 'tree', id: 'oak4', x: 19, y: 13, tree: 'oak' },
    { k: 'house', id: 'house_oak1', x: 7, y: 8, roof: 'red' },
    { k: 'house', id: 'house_oak2', x: 15, y: 8, roof: 'green' },
    { k: 'sign', id: 'sign_oakridge', x: 14, y: 4 },
    { k: 'npc', id: 'squirrel', x: 13, y: 13, npc: 'squirrel' },
    { k: 'item', id: 'acorn1', x: 3, y: 3, item: 'acorn' },
    { k: 'item', id: 'acorn2', x: 24, y: 5, item: 'acorn' },
    { k: 'item', id: 'acorn3', x: 10, y: 16, item: 'acorn' },
    { k: 'item', id: 'acorn4', x: 23, y: 16, item: 'acorn' },
    { k: 'item', id: 'acorn5', x: 5, y: 10, item: 'acorn' },
  ],
  warps: [{ x: 12, y: 0, to: 'birchvale', tx: 20, ty: 22, dir: 'up' }, { x: 13, y: 0, to: 'birchvale', tx: 21, ty: 22, dir: 'up' }],
};

/**
 * Snowfield: the first village of Frostland. A snowstorm warning closes the road west until the cat has a warm
 * hat and scarf: change money at the exchange office, then buy them at the clothes shop (two tourist chores).
 */
const SNOWFIELD: MapDef = {
  id: 'snowfield', at: 'snowfield', country: 'ice', theme: 'snow', spawn: { x: 14, y: 21, dir: 'up' },
  rows: [
    '##############################',
    '##############################',
    '##..........................##',
    '##..o.......................##',
    '##..........................##',
    '##..........................##',
    '##..........................##',
    '##.................:........##',
    '##.................:........##',
    '######.............:........##',
    '######.............:........##',
    '::::::::::::::::::::........##',
    '::::::::::::::::::::........##',
    '######........::............##',
    '######........::............##',
    '##............::............##',
    '##............::............##',
    '##............::............##',
    '##..w.........::.......o....##',
    '##............::............##',
    '##############::##############',
    '##############::##############',
    '##############::##############',
    '##############::##############',
  ],
  objs: [
    { k: 'house', id: 'house_snow1', x: 5, y: 3, roof: 'snow' },
    { k: 'house', id: 'exchange_door', x: 17, y: 3, roof: 'green' },
    { k: 'house', id: 'shop_door', x: 22, y: 13, roof: 'red' },
    { k: 'house', id: 'house_snow2', x: 4, y: 15, roof: 'snow' },
    { k: 'pole', id: 'pole_storm', x: 3, y: 11, until: 'clothes_ok' },
    { k: 'npc', id: 'polarbear', x: 6, y: 13, npc: 'polarbear' },
    { k: 'sign', id: 'sign_snowfield', x: 12, y: 13 },
    { k: 'sign', id: 'sign_storm', x: 7, y: 10 },
  ],
  warps: [
    { x: 14, y: 23, to: 'border_forest', tx: 18, ty: 1, dir: 'down' }, { x: 15, y: 23, to: 'border_forest', tx: 19, ty: 1, dir: 'down' },
    ...edge(0, [11, 12], 'frostheim', 30, [10, 11], 'left'),
    { x: 19, y: 6, to: 'exchange', tx: 5, ty: 7, dir: 'up', door: true },
    { x: 24, y: 16, to: 'clothes', tx: 5, ty: 7, dir: 'up', door: true },
  ],
};

/** Frostheim: the penguin's village. The ice cave is north; a side road leads north to the glacier camp. */
const FROSTHEIM: MapDef = {
  id: 'frostheim', at: 'frostheim', country: 'ice', theme: 'snow', spawn: { x: 29, y: 10, dir: 'left' },
  rows: [
    '########################::######',
    '########################::######',
    '##......................::....##',
    '##..o...................::....##',
    '##.............:........::....##',
    '##.............:........::....##',
    '##.............:........::....##',
    '##.............:....:...::....##',
    '######.........:....:...::....##',
    '######.........:....:...::....##',
    '::::::::::::::::::::::::::::::::',
    '::::::::::::::::::::::::::::::::',
    '######........................##',
    '######........................##',
    '##.........~~~~~..............##',
    '##........~~~~~~~.......o.....##',
    '##.........~~~~~...........w..##',
    '##.....y......................##',
    '##............................##',
    '##..o.................r.......##',
    '################################',
    '################################',
  ],
  objs: [
    { k: 'cave', id: 'cave', x: 14, y: 2 },
    { k: 'house', id: 'house_ice', x: 18, y: 4, roof: 'snow' },
    { k: 'sign', id: 'sign_frost', x: 12, y: 9 },
    { k: 'sign', id: 'sign_cave', x: 16, y: 5 },
    { k: 'sign', id: 'sign_glacier', x: 26, y: 8 },
    { k: 'npc', id: 'penguin', x: 8, y: 12, npc: 'penguin' },
    { k: 'drift', id: 'drift', x: 4, y: 10, until: 'drift_cleared' },
  ],
  warps: [
    ...edge(31, [10, 11], 'snowfield', 1, [11, 12], 'right'),
    ...edge(0, [10, 11], 'frostburg', 34, [12, 13], 'left'),
    { x: 24, y: 0, to: 'glacier', tx: 12, ty: 14, dir: 'up' }, { x: 25, y: 0, to: 'glacier', tx: 13, ty: 14, dir: 'up' },
    { x: 15, y: 3, to: 'cave', tx: 10, ty: 17, dir: 'up', door: true },
  ],
};

/** Glacier Camp (side road north of Frostheim): the husky's dog-sled camp; reading a timetable. */
const GLACIER: MapDef = {
  id: 'glacier', at: 'glacier', country: 'ice', theme: 'snow', spawn: { x: 12, y: 14, dir: 'up' },
  rows: [
    '##########################',
    '##########################',
    '##......................##',
    '##..o...................##',
    '##......................##',
    '##......................##',
    '##......................##',
    '##......................##',
    '##..........::..........##',
    '##..........::......o...##',
    '##..........::..........##',
    '##..w.......::..........##',
    '##..........::..........##',
    '##..........::......y...##',
    '##..........::..........##',
    '############::############',
    '############::############',
    '############::############',
  ],
  objs: [
    { k: 'house', id: 'cabin1', x: 4, y: 3, roof: 'snow' },
    { k: 'house', id: 'cabin2', x: 17, y: 3, roof: 'snow' },
    { k: 'npc', id: 'husky', x: 12, y: 7, npc: 'husky' },
    { k: 'sign', id: 'sign_sled', x: 14, y: 7 },
  ],
  warps: [{ x: 12, y: 17, to: 'frostheim', tx: 24, ty: 1, dir: 'down' }, { x: 13, y: 17, to: 'frostheim', tx: 25, ty: 1, dir: 'down' }],
};

/** Frostburg: the capital, with the railway and its station; a side road south to Icefjord, the border west. */
const FROSTBURG: MapDef = {
  id: 'frostburg', at: 'frostburg', country: 'ice', theme: 'snowtown', spawn: { x: 34, y: 12, dir: 'left' },
  rows: [
    '#################||#################',
    '#################||#################',
    '##...............||...............##',
    '##...............||...............##',
    '##...............||...............##',
    '##...............||...............##',
    '##...............||...............##',
    '##...............||...............##',
    '##...............||...............##',
    '##...............||...............##',
    '##...............||...............##',
    '##...............||...............##',
    '::::::::::::::::::::::::::::::::::::',
    '::::::::::::::::::::::::::::::::::::',
    '##......::.......||...............##',
    '##......::.......||...............##',
    '##......::.......||...............##',
    '##......::.......||...............##',
    '##......::.......||...............##',
    '##......::.......||...............##',
    '##......::.......||...............##',
    '##......::.......||...............##',
    '##......::.......||...............##',
    '##......::.......||...............##',
    '########::#######||#################',
    '########::#######||#################',
  ],
  objs: [
    { k: 'house', id: 'house_fb1', x: 3, y: 3, roof: 'snow' },
    { k: 'house', id: 'house_fb2', x: 10, y: 3, roof: 'blue' },
    { k: 'house', id: 'station', x: 19, y: 6, roof: 'green' },
    { k: 'house', id: 'house_fb3', x: 27, y: 3, roof: 'snow' },
    { k: 'house', id: 'house_fb4', x: 24, y: 16, roof: 'red' },
    { k: 'house', id: 'house_fb5', x: 11, y: 17, roof: 'snow' },
    { k: 'sign', id: 'sign_frostburg', x: 30, y: 14 },
    { k: 'sign', id: 'sign_timetable2', x: 24, y: 10 },
    { k: 'sign', id: 'sign_icefjord', x: 10, y: 15 },
    { k: 'npc', id: 'reindeer_fb', x: 6, y: 14, npc: 'reindeer' },
  ],
  warps: [
    ...edge(35, [12, 13], 'frostheim', 1, [10, 11], 'right'),
    ...edge(0, [12, 13], 'border_ice', 28, [9, 10], 'left'),
    { x: 8, y: 25, to: 'icefjord', tx: 8, ty: 1, dir: 'down' }, { x: 9, y: 25, to: 'icefjord', tx: 9, ty: 1, dir: 'down' },
    { x: 21, y: 9, to: 'station_frostburg', tx: 11, ty: 13, dir: 'up', door: true },
  ],
};

/** Icefjord (side road south of Frostburg): a frozen harbour; the seal sells souvenirs. */
const ICEFJORD: MapDef = {
  id: 'icefjord', at: 'icefjord', country: 'ice', theme: 'snow', spawn: { x: 8, y: 2, dir: 'down' },
  rows: [
    '########::####################',
    '########::####################',
    '##......::..................##',
    '##......::..................##',
    '##......::..................##',
    '##......::..................##',
    '##......::..................##',
    '##......::..................##',
    '##......::..................##',
    '##......::..................##',
    '##......::..................##',
    '##......::..................##',
    '##......::::::::::::::......##',
    '##......::::::::::::::......##',
    '##..........................##',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  objs: [
    { k: 'house', id: 'house_if1', x: 12, y: 3, roof: 'snow' },
    { k: 'house', id: 'house_if2', x: 20, y: 3, roof: 'blue' },
    { k: 'house', id: 'house_fish', x: 13, y: 8, roof: 'red' },
    { k: 'npc', id: 'seal', x: 20, y: 14, npc: 'seal' },
    { k: 'sign', id: 'sign_icefjord2', x: 5, y: 4 },
  ],
  warps: [{ x: 8, y: 0, to: 'frostburg', tx: 8, ty: 24, dir: 'up' }, { x: 9, y: 0, to: 'frostburg', tx: 9, ty: 24, dir: 'up' }],
};

/** The Frostland border, west of Frostburg: office and barrier, with forest close on both sides of the road. */
const BORDER_ICE: MapDef = {
  id: 'border_ice', at: 'border_ice', country: 'ice', theme: 'snow', spawn: { x: 28, y: 9, dir: 'left' },
  rows: [
    '##############################',
    '##############################',
    '##..........................##',
    '##..........................##',
    '##..........................##',
    '##..o.......................##',
    '##..........................##',
    '########......:.............##',
    '########......:.............##',
    '::::::::::::::::::::::::::::::',
    '::::::::::::::::::::::::::::::',
    '########....................##',
    '########....................##',
    '##..........................##',
    '##.........w.........o......##',
    '##..........................##',
    '##############################',
    '##############################',
  ],
  objs: [
    { k: 'house', id: 'office_ice_door', x: 12, y: 3, roof: 'green' },
    { k: 'flag', id: 'flag_ice', x: 18, y: 6, country: 'ice' },
    { k: 'sign', id: 'sign_border2', x: 10, y: 8 },
    { k: 'gate', id: 'gate_ice', x: 6, y: 9, country: 'ice' },
  ],
  warps: [
    ...edge(29, [9, 10], 'frostburg', 1, [12, 13], 'right'),
    ...edge(0, [9, 10], 'central', 1, [14, 15], 'right'),
    { x: 14, y: 6, to: 'office_ice', tx: 5, ty: 7, dir: 'up', door: true },
  ],
};

const CENTRAL_ROWS = [
  '#########::#############################',
  '#########::#############################',
  '########.::...##############..##########',
  '########.::...##############..##########',
  '########.::...##############..##########',
  '########.::...##############..##########',
  '########.::...##############..##########',
  '########.::...##############..##########',
  '########.::...##############..##########',
  '########.::...................##########',
  '########.::...................##########',
  '########.::...................##########',
  '##.......zz.o................o........##',
  '##.......zz...........................##',
  ':::::::::::::::::::zz:::::::::::::::::::',
  ':::::::::::::::::::zz:::::::::::::::::::',
  ':::::::::::::::::::zz:::::::::::::::::::',
  '##....................................##',
  '##.o..........o...........o.........o.##',
  '#############...#########...############',
  '#############...#########...############',
  '#############...#########...############',
  '#############...#########...############',
  '#############...#########...############',
  '#############...#########...############',
  '#############...#########...############',
  '#############...#########...############',
  '##....................................##',
  '########################################',
  '########################################',
];
const OLDTOWN_ROWS = [
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '######............................######',
  '######.o........................o.######',
  '######............................######',
  '######............................######',
  '######............................######',
  '######............................######',
  '######............................######',
  '######.o........................o.######',
  '######............................######',
  '######...::::::zz::::::::::::::...######',
  '######...::::::zz::::::::::::::...######',
  '######...::.......................######',
  '######...::..o................o...######',
  '######...::.......................######',
  '########.::.############################',
  '########.::.############################',
  '########.::.############################',
  '########.::.############################',
  '########.::.############################',
  '########.::.############################',
  '########.::.############################',
  '#########::#############################',
  '#########::#############################',
];
const HARBOUR_ROWS = [
  '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  '~~~~~~~~..~~~~~~~~~~~~~~..~~~~~~~~~~~~~~',
  '~~~~~~~~..~~~~~~~~~~~~~~..~~~~~~~~~~~~~~',
  '~~~~~~~~..~~~~~~~~~~~~~~..~~~~~~~~~~~~~~',
  '~~~~~~~~..~~~~~~~~~~~~~~..~~~~~~~~~~~~~~',
  '~~~~~~~~..~~~~~~~~~~~~~~..~~~~~~~~~~~~~~',
  '~~~~~~~~..~~~~~~~~~~~~~~..~~~~~~~~~~~~~~',
  '####................................####',
  '####................................####',
  '####................................####',
  '####................................####',
  '####........o...............o.......####',
  '##....................................##',
  ':::::::::::::::::zz:::::::::::::::::::::',
  ':::::::::::::::::zz:::::::::::::::::::::',
  ':::::::::::::::::zz:::::::::::::::::::::',
  '##...............::...................##',
  '##.............o.::.o.................##',
  '###############..::...##################',
  '###############..::...##################',
  '###############..::...##################',
  '###############..::...##################',
  '###############..::...##################',
  '###############..::...##################',
  '###############..::...##################',
  '###############..::...##################',
  '##...............::...................##',
  '#################::#####################',
  '#################::#####################',
];
const MARKET_ROWS = [
  '#################::#####################',
  '#################::#####################',
  '###############..::..###################',
  '###############..::..###################',
  '###############..::..###################',
  '###############..::..###################',
  '#####............::................#####',
  '#####..............................#####',
  '#####..............................#####',
  '#####..............................#####',
  '#####...o.....................o....#####',
  '#####..............................#####',
  '#####..............................#####',
  '#####..............................#####',
  '#####..............................#####',
  '#####..............o...............#####',
  '#####..............................#####',
  '#####..............................#####',
  '#####..............................#####',
  '#####..............................#####',
  '#####...o.....................o....#####',
  '#####..............................#####',
  '#####..............................#####',
  '#####..............................#####',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
];
const TOWERS_ROWS = [
  '########################################',
  '########################################',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '##...........o.............o..........##',
  '##....................................##',
  '::::::::::::zz::::::::::::zz::::::::::::',
  '::::::::::::zz::::::::::::zz::::::::::::',
  '::::::::::::zz::::::::::::zz::::::::::::',
  '##....................................##',
  '##...........o.............o..........##',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '############...###########...###########',
  '##....................................##',
  '########################################',
  '########################################',
];
const BORDERM_ROWS = [
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '##........o.........o.......############',
  '##..........................############',
  '::::::::::::::::::::::::::::::::::::::::',
  '::::::::::::::::::::::::::::::::::::::::',
  '##..........................############',
  '##........o.........o.......############',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '########################################',
  '##....................................##',
  '########################################',
  '########################################',
];



// ---------------------------------------------------------------- stations

/**
 * Which train stands at which platform in each station: the station city it goes to, or 'none' for the train
 * that's out of service. Different in every station, so the departure board has to be read.
 */
export const PLATFORMS: Record<string, [string, string, string]> = {
  lindenburg: ['frostburg', 'central', 'none'],
  frostburg: ['central', 'none', 'lindenburg'],
  central: ['none', 'lindenburg', 'frostburg'],
};
/** The colour of each station's underpass tiles. */
const STATION_TINT: Record<string, string> = { lindenburg: '#2e7a3a', frostburg: '#2a5aa8', central: '#7a3aa8' };
/** Platform n (0-2): the row of its floor next to the stairs, and the row of its track. */
export const PLATFORM_ROWS = [{ floor: 5, track: 1 }, { floor: 10, track: 6 }, { floor: 15, track: 11 }];

/**
 * A train station in three parts: the concourse (ticket counter, departure board, the way out to the street, stairs
 * down), the underpass (stairs up to each platform), and the platforms, which lie between tracks, so the only way
 * from one to another is through the underpass.
 */
function station(city: string, country: Country, street: string, sx: number, sy: number, people: [string, NpcKind, number, number, 'hall' | 'gleis'][]): MapDef[] {
  const hall: MapDef = {
    id: `station_${city}`, at: city, country, theme: 'hall', spawn: { x: 11, y: 13, dir: 'up' },
    rows: [
      '########################',
      '########################',
      '#..........SS..........#',
      '#......................#',
      '#......................#',
      '#......................#',
      '#......................#',
      '#......................#',
      '#......................#',
      '#......................#',
      '#......................#',
      '#......................#',
      '#......................#',
      '#......................#',
      '###########::###########',
      '########################',
    ],
    objs: [
      { k: 'npc', id: 'raccoon', x: 18, y: 6, npc: 'raccoon' },
      { k: 'desk', id: `desk_station_${city}`, x: 16, y: 7, clerk: 'raccoon' },
      { k: 'decor', id: 'board', x: 3, y: 4, art: 'board' },
      { k: 'decor', id: 'board2', x: 6, y: 4, art: 'board' },
      { k: 'decor', id: 'pillar', x: 3, y: 9, art: 'pillar' }, { k: 'decor', id: 'pillar', x: 20, y: 9, art: 'pillar' },
      { k: 'decor', id: 'pillar', x: 3, y: 12, art: 'pillar' }, { k: 'decor', id: 'pillar', x: 20, y: 12, art: 'pillar' },
      { k: 'decor', id: 'kiosk', x: 6, y: 9, art: 'kiosk' },
      { k: 'decor', id: 'bench1', x: 9, y: 9, art: 'bench' }, { k: 'decor', id: 'bench2', x: 13, y: 9, art: 'bench' },
      { k: 'plant', id: 'plant', x: 1, y: 2 }, { k: 'plant', id: 'plant', x: 22, y: 2 },
      ...people.filter((q) => q[4] === 'hall').map(([id, npc, x, y]): Obj => ({ k: 'npc', id, x, y, npc })),
    ],
    warps: [
      { x: 11, y: 14, to: street, tx: sx, ty: sy, dir: 'down' }, { x: 12, y: 14, to: street, tx: sx, ty: sy, dir: 'down' },
      { x: 11, y: 2, to: `under_${city}`, tx: 14, ty: 6, dir: 'up' }, { x: 12, y: 2, to: `under_${city}`, tx: 15, ty: 6, dir: 'up' },
    ],
  };
  const under: MapDef = {
    id: `under_${city}`, at: city, country, theme: 'subway', tint: STATION_TINT[city], spawn: { x: 14, y: 6, dir: 'up' },
    rows: [
      '##############################',
      '##############################',
      '#....S.......S.......S.......#',
      '#............................#',
      '#............................#',
      '#............................#',
      '#............................#',
      '##############SS##############',
      '##############################',
    ],
    objs: [
      ...[0, 1, 2].map((n): Obj => ({ k: 'decor', id: `usign${n + 1}`, x: 4 + n * 8, y: 1, art: `psign${n + 1}` })),
      { k: 'decor', id: 'poster1', x: 8, y: 1, art: 'poster0' }, { k: 'decor', id: 'poster2', x: 16, y: 1, art: 'poster1' },
      { k: 'decor', id: 'poster3', x: 24, y: 1, art: 'poster2' }, { k: 'decor', id: 'poster4', x: 1, y: 1, art: 'poster3' },
      { k: 'decor', id: 'bin', x: 10, y: 6, art: 'bin' }, { k: 'decor', id: 'bin', x: 19, y: 6, art: 'bin' },
    ],
    warps: [
      ...[0, 1, 2].map((n): Warp => ({ x: 5 + n * 8, y: 2, to: `gleis_${city}`, tx: 13, ty: PLATFORM_ROWS[n].floor, dir: 'left' })),
      { x: 14, y: 7, to: `station_${city}`, tx: 11, ty: 3, dir: 'down' }, { x: 15, y: 7, to: `station_${city}`, tx: 12, ty: 3, dir: 'down' },
    ],
  };
  const gleis: MapDef = {
    id: `gleis_${city}`, at: city, country, theme: 'hall', spawn: { x: 13, y: 5, dir: 'left' },
    rows: [
      '##############################',
      '------------------------------',
      '------------------------------',
      '#PPPPPPPPPPPPPPPPPPPPPPPPPPPP#',
      '#............................#',
      '#.............S..............#',
      '------------------------------',
      '------------------------------',
      '#PPPPPPPPPPPPPPPPPPPPPPPPPPPP#',
      '#............................#',
      '#.............S..............#',
      '------------------------------',
      '------------------------------',
      '#PPPPPPPPPPPPPPPPPPPPPPPPPPPP#',
      '#............................#',
      '#.............S..............#',
      '##############################',
    ],
    objs: [
      ...PLATFORMS[city].flatMap((dest, n): Obj[] => [
        { k: 'train', id: `train_${city}_${n + 1}`, x: 9, y: PLATFORM_ROWS[n].track, kind: 'train', dest },
        { k: 'decor', id: `psign_${n + 1}`, x: 3, y: PLATFORM_ROWS[n].floor - 1, art: `psign${n + 1}` },
        { k: 'decor', id: `psign_${n + 1}b`, x: 26, y: PLATFORM_ROWS[n].floor - 1, art: `psign${n + 1}` },
        { k: 'decor', id: `bench_${n}`, x: 19, y: PLATFORM_ROWS[n].floor, art: 'bench' },
        { k: 'lamp', id: 'lamp', x: 8, y: PLATFORM_ROWS[n].floor },
      ]),
      ...people.filter((q) => q[4] === 'gleis').map(([id, npc, x, y]): Obj => ({ k: 'npc', id, x, y, npc })),
    ],
    warps: [0, 1, 2].map((n): Warp => ({ x: 14, y: PLATFORM_ROWS[n].floor, to: `under_${city}`, tx: 5 + n * 8, ty: 3, dir: 'down' })),
  };
  return [hall, under, gleis];
}

/** The metro colour of each stop (its station's tiles). */
const STOP_TINT: Record<string, string> = { central: '#2a5ad8', oldtown: '#d83a30', harbour: '#2e8a40', market: '#f0a030', towers: '#8a3aa8' };

/** A metro platform under a district: the train in the tunnel, a ticket machine, stairs up to the street. */
const metroStop = (stop: string, street: string, sx: number, sy: number, passenger: [NpcKind]): MapDef => ({
  id: `metro_${stop}`, at: stop, country: 'metro', theme: 'subway', tint: STOP_TINT[stop], spawn: { x: 9, y: 9, dir: 'up' },
  rows: [
    '####################',
    '--------------------',
    '--------------------',
    '#PPPPPPPPPPPPPPPPPP#',
    '#..................#',
    '#..................#',
    '#..................#',
    '#..................#',
    '#..................#',
    '#..................#',
    '#########::#########',
    '####################',
  ],
  objs: [
    { k: 'train', id: `mtrain_${stop}`, x: 5, y: 1, kind: 'metro' },
    { k: 'decor', id: 'ticketmachine', x: 3, y: 5, art: 'ticketmachine' },
    { k: 'decor', id: 'board', x: 14, y: 4, art: 'board' },
    { k: 'decor', id: 'bench', x: 12, y: 7, art: 'bench' },
    { k: 'sign', id: 'sign_metromap', x: 6, y: 5 },
    { k: 'npc', id: `mp_${stop}`, x: 16, y: 7, npc: passenger[0] },
  ],
  warps: [9, 10].map((x): Warp => ({ x, y: 10, to: street, tx: sx + (x - 9), ty: sy, dir: 'down' })),
});

// ---------------------------------------------------------------- the Megacity: five districts linked by streets and the metro

const city = (id: string, theme: Theme, rows: string[], spawn: MapDef['spawn'], objs: Obj[], warps: Warp[]): MapDef => ({
  id, at: id, country: 'metro', theme, spawn, rows, objs,
  // walking into a metro entrance takes the stairs down to its platform
  warps: [...warps, ...objs.flatMap((o) => (o.k === 'metro' ? [0, 1].map((dx): Warp => ({ x: o.x + dx, y: o.y + 1, to: `metro_${o.stop}`, tx: 9 + dx, ty: 9, dir: 'up', door: true })) : []))],
});

const CENTRAL = city('central', 'city', CENTRAL_ROWS, { x: 1, y: 15, dir: 'right' }, [
  { k: 'door', id: 'door_station_c', x: 20, y: 8, sign: 'station' },
  { k: 'door', id: 'door_mexchange', x: 4, y: 11, sign: 'exchange' },
  { k: 'door', id: 'door_school', x: 33, y: 11, sign: 'school' },
  { k: 'door', id: 'door_hotel', x: 20, y: 26, sign: 'hotel' },
  { k: 'metro', id: 'metro_central', x: 24, y: 10, stop: 'central' },
  { k: 'fountain', id: 'fountain', x: 16, y: 10 },
  { k: 'lamp', id: 'lamp', x: 13, y: 9 }, { k: 'lamp', id: 'lamp', x: 28, y: 9 },
  { k: 'sign', id: 'sign_central', x: 6, y: 13 },
  { k: 'sign', id: 'sign_metromap', x: 27, y: 11 },
  { k: 'decor', id: 'car1', x: 3, y: 14, art: 'car_red' }, { k: 'decor', id: 'car2', x: 27, y: 14, art: 'car_white' },
  { k: 'decor', id: 'car3', x: 33, y: 16, art: 'car_blue' }, { k: 'decor', id: 'car4', x: 6, y: 16, art: 'car_yellow' },
  { k: 'decor', id: 'bench1', x: 14, y: 9, art: 'bench' }, { k: 'decor', id: 'bench2', x: 21, y: 9, art: 'bench' },
  { k: 'decor', id: 'kiosk', x: 34, y: 12, art: 'kiosk' }, { k: 'decor', id: 'busstop', x: 24, y: 17, art: 'busstop' },
  { k: 'decor', id: 'bikes', x: 5, y: 17, art: 'bikes' }, { k: 'decor', id: 'bin1', x: 22, y: 13, art: 'bin' }, { k: 'decor', id: 'bin2', x: 31, y: 17, art: 'bin' },
  { k: 'npc', id: 'fritz_mc', x: 18, y: 12, npc: 'frog' }, { k: 'npc', id: 'rieke_mc', x: 28, y: 18, npc: 'deer' },
  { k: 'npc', id: 'pigeon', x: 14, y: 12, npc: 'pigeon' },
], [
  ...edge(0, [14, 15, 16], 'border_ice', 1, [9, 10, 10], 'right'),
  ...edge(39, [14, 15, 16], 'harbour', 1, [14, 15, 16], 'right'),
  { x: 9, y: 0, to: 'oldtown', tx: 9, ty: 28, dir: 'up' }, { x: 10, y: 0, to: 'oldtown', tx: 10, ty: 28, dir: 'up' },
  { x: 20, y: 8, to: 'station_central', tx: 11, ty: 13, dir: 'up', door: true },
  { x: 4, y: 11, to: 'mexchange', tx: 5, ty: 7, dir: 'up', door: true },
  { x: 33, y: 11, to: 'school', tx: 5, ty: 7, dir: 'up', door: true },
]);

const OLDTOWN = city('oldtown', 'oldtown', OLDTOWN_ROWS, { x: 9, y: 27, dir: 'up' }, [
  { k: 'door', id: 'door_cafe', x: 10, y: 6, sign: 'cafe' },
  { k: 'door', id: 'door_lost', x: 18, y: 6, sign: 'lost' },
  { k: 'door', id: 'door_museum', x: 26, y: 6, sign: 'museum' },
  { k: 'fountain', id: 'fountain', x: 19, y: 10 },
  { k: 'metro', id: 'metro_oldtown', x: 28, y: 11, stop: 'oldtown' },
  { k: 'lamp', id: 'lamp', x: 12, y: 9 }, { k: 'lamp', id: 'lamp', x: 25, y: 9 },
  { k: 'decor', id: 'statue', x: 13, y: 12, art: 'statue' },
  { k: 'decor', id: 'table1', x: 8, y: 8, art: 'table' }, { k: 'decor', id: 'table2', x: 12, y: 8, art: 'table' }, { k: 'decor', id: 'table3', x: 15, y: 8, art: 'table' },
  { k: 'decor', id: 'bench1', x: 23, y: 13, art: 'bench' }, { k: 'decor', id: 'bench2', x: 7, y: 13, art: 'bench' },
  { k: 'decor', id: 'flowers1', x: 22, y: 8, art: 'flowers' }, { k: 'decor', id: 'flowers2', x: 30, y: 8, art: 'flowers' }, { k: 'decor', id: 'flowers3', x: 31, y: 14, art: 'flowers' },
  { k: 'decor', id: 'bin', x: 20, y: 14, art: 'bin' }, { k: 'decor', id: 'bikes', x: 25, y: 18, art: 'bikes' },
  { k: 'npc', id: 'hanna_mc', x: 17, y: 9, npc: 'rabbit' },
  { k: 'sign', id: 'sign_oldtown', x: 11, y: 19 },
], [
  { x: 9, y: 29, to: 'central', tx: 9, ty: 1, dir: 'down' }, { x: 10, y: 29, to: 'central', tx: 10, ty: 1, dir: 'down' },
  { x: 10, y: 6, to: 'cafe', tx: 5, ty: 7, dir: 'up', door: true },
  { x: 18, y: 6, to: 'lostfound', tx: 5, ty: 7, dir: 'up', door: true },
]);

const HARBOUR: MapDef = { ...city('harbour', 'city', HARBOUR_ROWS, { x: 1, y: 15, dir: 'right' }, [
  { k: 'ship', id: 'ship', x: 11, y: 2 }, { k: 'ship', id: 'ship', x: 27, y: 1 },
  { k: 'metro', id: 'metro_harbour', x: 30, y: 10, stop: 'harbour' },
  { k: 'npc', id: 'seagull', x: 9, y: 2, npc: 'seagull' },
  { k: 'lamp', id: 'lamp', x: 6, y: 9 }, { k: 'lamp', id: 'lamp', x: 20, y: 9 },
  { k: 'decor', id: 'crates1', x: 5, y: 9, art: 'crates' }, { k: 'decor', id: 'crates2', x: 6, y: 9, art: 'crates' }, { k: 'decor', id: 'crates3', x: 34, y: 9, art: 'crates' },
  { k: 'decor', id: 'barrel1', x: 33, y: 9, art: 'barrel' }, { k: 'decor', id: 'barrel2', x: 21, y: 8, art: 'barrel' }, { k: 'decor', id: 'barrel3', x: 11, y: 8, art: 'barrel' },
  { k: 'decor', id: 'bench', x: 13, y: 11, art: 'bench' }, { k: 'decor', id: 'car1', x: 8, y: 14, art: 'car_green' }, { k: 'decor', id: 'car2', x: 29, y: 16, art: 'car_black' },
  { k: 'npc', id: 'greta_mc', x: 23, y: 9, npc: 'goose' },
  { k: 'sign', id: 'sign_harbour', x: 15, y: 12 },
], [
  ...edge(0, [14, 15, 16], 'central', 38, [14, 15, 16], 'left'),
  ...edge(39, [14, 15, 16], 'towers', 1, [14, 15, 16], 'right'),
  { x: 17, y: 29, to: 'market', tx: 17, ty: 1, dir: 'down' }, { x: 18, y: 29, to: 'market', tx: 18, ty: 1, dir: 'down' },
]), water: 'sea' };

const MARKET = city('market', 'oldtown', MARKET_ROWS, { x: 17, y: 2, dir: 'down' }, [
  { k: 'stall', id: 'stall_fish', x: 10, y: 9, vendor: 'pig', color: '#3a78d8' },
  { k: 'stall', id: 'stall_fruit', x: 16, y: 9, color: '#5cb85a' },
  { k: 'stall', id: 'stall_flowers', x: 22, y: 9, color: '#f06aa0' },
  { k: 'stall', id: 'stall_cheese', x: 12, y: 16, color: '#f0a030' },
  { k: 'npc', id: 'pig', x: 10, y: 8, npc: 'pig' },
  { k: 'metro', id: 'metro_market', x: 26, y: 18, stop: 'market' },
  { k: 'decor', id: 'crates1', x: 13, y: 9, art: 'crates' }, { k: 'decor', id: 'crates2', x: 19, y: 9, art: 'crates' }, { k: 'decor', id: 'barrel', x: 25, y: 9, art: 'barrel' },
  { k: 'decor', id: 'kiosk', x: 7, y: 19, art: 'kiosk' }, { k: 'decor', id: 'bench', x: 19, y: 20, art: 'bench' }, { k: 'decor', id: 'bin', x: 28, y: 14, art: 'bin' },
  { k: 'decor', id: 'flowers1', x: 9, y: 14, art: 'flowers' }, { k: 'decor', id: 'flowers2', x: 24, y: 16, art: 'flowers' },
  { k: 'npc', id: 'mia_mc', x: 15, y: 12, npc: 'mouse' },
  { k: 'sign', id: 'sign_market', x: 20, y: 7 },
], [{ x: 17, y: 0, to: 'harbour', tx: 17, ty: 28, dir: 'up' }, { x: 18, y: 0, to: 'harbour', tx: 18, ty: 28, dir: 'up' }]);

const TOWERS = city('towers', 'city', TOWERS_ROWS, { x: 1, y: 15, dir: 'right' }, [
  { k: 'door', id: 'door_courier', x: 6, y: 11, sign: 'courier' },
  { k: 'door', id: 'door_tower', x: 20, y: 11, sign: 'tower' },
  { k: 'metro', id: 'metro_towers', x: 32, y: 12, stop: 'towers' },
  { k: 'lamp', id: 'lamp', x: 9, y: 12 }, { k: 'lamp', id: 'lamp', x: 23, y: 12 },
  { k: 'decor', id: 'bikes', x: 16, y: 12, art: 'bikes' }, { k: 'decor', id: 'bench', x: 20, y: 12, art: 'bench' },
  { k: 'decor', id: 'busstop', x: 30, y: 17, art: 'busstop' }, { k: 'decor', id: 'bin', x: 25, y: 13, art: 'bin' },
  { k: 'decor', id: 'car1', x: 5, y: 14, art: 'car_black' }, { k: 'decor', id: 'car2', x: 35, y: 16, art: 'car_white' }, { k: 'decor', id: 'car3', x: 19, y: 16, art: 'car_red' },
  { k: 'npc', id: 'frieda_mc', x: 24, y: 12, npc: 'fox' },
  { k: 'sign', id: 'sign_towers', x: 14, y: 13 },
], [
  ...edge(0, [14, 15, 16], 'harbour', 38, [14, 15, 16], 'left'),
  ...edge(39, [14, 15, 16], 'border_metro', 1, [14, 15, 15], 'right'),
  { x: 6, y: 11, to: 'courier', tx: 5, ty: 7, dir: 'up', door: true },
]);

const BORDER_METRO: MapDef = {
  ...city('border_metro', 'city', BORDERM_ROWS, { x: 1, y: 14, dir: 'right' }, [
    { k: 'door', id: 'office_metro_door', x: 15, y: 11, sign: 'office' },
    { k: 'flag', id: 'flag_metro', x: 18, y: 12, country: 'metro' },
    { k: 'sign', id: 'sign_border3', x: 25, y: 12 },
    { k: 'decor', id: 'car1', x: 24, y: 14, art: 'car_blue' }, { k: 'decor', id: 'car2', x: 21, y: 14, art: 'car_yellow' }, { k: 'decor', id: 'car3', x: 18, y: 14, art: 'car_white' },
    { k: 'decor', id: 'bench', x: 8, y: 13, art: 'bench' },
    { k: 'gate', id: 'gate_metro', x: 28, y: 14, country: 'metro' },
  ], [
    ...edge(0, [14, 15], 'towers', 38, [14, 15], 'left'),
    ...edge(39, [14, 15], 'shellbay', 1, [7, 8], 'right'),
    { x: 15, y: 11, to: 'office_metro', tx: 5, ty: 7, dir: 'up', door: true },
  ]),
};

/** The metro stops: where each district's entrance is (you come up the stairs just below it). */
export const METRO_STOPS = ['central', 'oldtown', 'harbour', 'market', 'towers'] as const;

/** Who takes parcels in the courier job: the NPC id and the district they're in. */
export const COURIER = [
  { npc: 'pigeon', where: 'central' }, { npc: 'seagull', where: 'harbour' }, { npc: 'pig', where: 'market' },
  { npc: 'sloth', where: 'oldtown' }, { npc: 'stork', where: 'central' }, { npc: 'poodle', where: 'oldtown' },
];

/** The café job: what each customer orders (by picture). */
export const CAFE_ORDERS: { line: string; items: string[] }[] = [
  { line: 'cafe.o1', items: ['coffee', 'croissant'] }, { line: 'cafe.o2', items: ['tea', 'cake'] }, { line: 'cafe.o3', items: ['coffee', 'coffee'] },
  { line: 'cafe.o4', items: ['juice'] }, { line: 'cafe.o5', items: ['water', 'cake'] }, { line: 'cafe.o6', items: ['tea', 'croissant'] },
  { line: 'cafe.o7', items: ['coffee', 'cake'] }, { line: 'cafe.o8', items: ['juice', 'croissant'] }, { line: 'cafe.o9', items: ['tea'] },
  { line: 'cafe.o10', items: ['water'] },
];

/** The ice cave: three tunnels, then a fork. The bat's directions lead to the shovel; wrong turns slip you back. */
const CAVE: MapDef = {
  id: 'cave', at: 'icecave', country: 'ice', theme: 'cave', spawn: { x: 10, y: 17, dir: 'up' },
  rows: [
    '######################',
    '######################',
    '##############o...####',
    '##############....####',
    '##############....####',
    '###############..#####',
    '###..............#####',
    '##########..##########',
    '#####.####..####.#####',
    '#####.####..####.#####',
    '#####.####..####.#####',
    '#####.####..####.#####',
    '#####.####..####.#####',
    '#####.####..####.#####',
    '###................###',
    '###......o.........###',
    '###................###',
    '###................###',
    '##########:###########',
    '######################',
  ],
  objs: [
    { k: 'npc', id: 'bat', x: 13, y: 15, npc: 'bat' },
    { k: 'item', id: 'shovel_item', x: 16, y: 3, item: 'shovel' },
  ],
  warps: [
    { x: 10, y: 18, to: 'frostheim', tx: 15, ty: 4, dir: 'down' },
    ...[[5, 8], [16, 8], [3, 6]].map(([x, y]): Warp => ({ x, y, to: 'cave', tx: 10, ty: 16, dir: 'up', say: 'cave.wrong' })),
  ],
};

const BEACH: MapDef = {
  id: 'shellbay', at: 'shellbay', country: 'beach', theme: 'beach', spawn: { x: 2, y: 7, dir: 'right' },
  rows: [
    '############################',
    '############################',
    '##......................~~~~',
    '##..y.................~~~~~~',
    '##.....................~~~~~',
    '##...........r.........~~~~~',
    '##......................~~~~',
    '::::::::::::.............~~~',
    '::::::::::::..............~~',
    '##.....................~~~~~',
    '##..w.................~~~~~~',
    '##..................~~~~~~~~',
    '##.........y......~~~~~~~~~~',
    '##..............~~~~~~~~~~~~',
    '##...........~~~~~~~~~~~~~~~',
    '##.......~~~~~~~~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  objs: [
    { k: 'npc', id: 'crab', x: 13, y: 9, npc: 'crab' },
    { k: 'chair', id: 'chair', x: 19, y: 9 },
    { k: 'sign', id: 'sign_beach', x: 9, y: 6 },
  ],
  warps: edge(0, [7, 8], 'border_metro', 38, [14, 15], 'left'),
};

export const MAPS: Record<string, MapDef> = Object.fromEntries([
  VILLAGE, SONNENWALD, LINDENBURG, interior('tourist_info', 'forest', 'fox', 'lindenburg', 5, 7, 'lindenburg'),
  ...station('lindenburg', 'forest', 'lindenburg', 20, 12, [['pass_l1', 'hedgehog', 9, 6, 'hall'], ['pass_l2', 'rabbit', 22, 10, 'gleis']]),
  MILLBROOK, interior('bakery', 'forest', 'badger', 'millbrook', 5, 7, 'millbrook'), BIRCHVALE, OAKRIDGE, BORDER_FOREST,
  office('office_forest', 'forest', 'owl', 'border_forest', 23, 14, 'border_forest'),
  SNOWFIELD, interior('exchange', 'ice', 'arcticfox', 'snowfield', 19, 7, 'snowfield'), interior('clothes', 'ice', 'reindeer', 'snowfield', 24, 17, 'snowfield'),
  FROSTHEIM, CAVE, GLACIER, FROSTBURG, ...station('frostburg', 'ice', 'frostburg', 21, 10, [['pass_f1', 'seal', 9, 6, 'hall'], ['pass_f2', 'penguin', 22, 15, 'gleis']]), ICEFJORD,
  BORDER_ICE, office('office_ice', 'ice', 'walrus', 'border_ice', 14, 7, 'border_ice'),
  CENTRAL, ...station('central', 'metro', 'central', 20, 9, [['pass_c1', 'dog', 9, 6, 'hall'], ['pass_c2', 'walrus', 22, 5, 'gleis']]), interior('mexchange', 'metro', 'parrot', 'central', 4, 12, 'central'),
  interior('school', 'metro', 'stork', 'central', 33, 12, 'central'),
  OLDTOWN, interior('cafe', 'metro', 'poodle', 'oldtown', 10, 7, 'oldtown'), interior('lostfound', 'metro', 'sloth', 'oldtown', 18, 7, 'oldtown'),
  metroStop('central', 'central', 24, 12, ['squirrel']), metroStop('oldtown', 'oldtown', 28, 13, ['beaver']), metroStop('harbour', 'harbour', 30, 12, ['owl']),
  metroStop('market', 'market', 26, 20, ['reindeer']), metroStop('towers', 'towers', 32, 14, ['kangaroo']),
  HARBOUR, MARKET, TOWERS, interior('courier', 'metro', 'kangaroo', 'towers', 6, 12, 'towers'),
  BORDER_METRO, office('office_metro', 'metro', 'flamingo', 'border_metro', 15, 12, 'border_metro'),
  BEACH,
].map((m) => [m.id, m]));

// ---------------------------------------------------------------- game state

export interface Save {
  map: string;
  x: number;
  y: number;
  dir: Dir;
  flags: string[];
  items: ItemKind[];
  /** Line keys read, by country: the border exam asks about their words. */
  seen?: Partial<Record<Country, string[]>>;
  /** Money by currency (each country has its own; change it at exchange offices). */
  wallet?: Partial<Record<Currency, number>>;
}

/** Currencies: talers in Woodland, crowns in Frostland, more to come. */
export type Currency = 'taler' | 'krone' | 'kredit';
export const CURRENCY_OF: Partial<Record<Country, Currency>> = { forest: 'taler', ice: 'krone', metro: 'kredit' };
export const money = (s: Save, c: Currency) => s.wallet?.[c] ?? 0;

/** Station cities with their station hall; `needs` the stamp to travel there. */
export const STATIONS_BUILT: { id: string; hall: string; needs?: string }[] = [
  { id: 'lindenburg', hall: 'station_lindenburg' },
  { id: 'frostburg', hall: 'station_frostburg', needs: 'stamp_forest' },
  { id: 'central', hall: 'station_central', needs: 'stamp_ice' },
];

export function newSave(): Save {
  return { map: 'village', x: 6, y: 7, dir: 'down', flags: [], items: [], seen: {}, wallet: { taler: 20 } };
}

const has = (s: Save, f: string) => s.flags.includes(f);

/** Which objects are there right now (roadblocks go once cleared, the barrier once stamped, items once taken). */
export function present(o: Obj, s: Save): boolean {
  if (o.k === 'log' || o.k === 'drift' || o.k === 'bramble' || o.k === 'towngate' || o.k === 'pole') return !has(s, o.until);
  if (o.k === 'bridge') return has(s, o.when);
  if (o.k === 'gate') return !has(s, `stamp_${o.country}`);
  if (o.k === 'item') return !has(s, `got_${o.id}`);
  return true;
}

// ---------------------------------------------------------------- scripts

/** Who says a line: an NPC (its name comes from the text file), or nobody (narration, signs). */
export type Who = NpcKind | undefined;

export interface Opt {
  /** Line key of the option. */
  o: string;
  /** Answer with pictures instead of words (café things: keys of CAFE in art.ts). */
  pic?: string[];
  then: Step[];
}

export type Step =
  | { say: string; who?: Who }
  | { ask: string; who?: Who; opts: Opt[] }
  | { give: ItemKind }
  | { take: ItemKind }
  | { set: string }
  | { unset: string }
  /** XP with an English reason shown in the toast. */
  | { xp: number; why: string }
  /** A short effect before the next line: the beaver gnawing through the log, the penguin digging. */
  | { fx: 'shake' }
  /** The border exam on the country's words; then `pass` or `fail`. */
  | { exam: Country | 'all'; pass: Step[]; fail: Step[] }
  /** Shows the passport with the new stamp for entering `country`. */
  | { stamp: Country }
  /** The end of the journey. */
  | { end: true }
  /** Money in (n > 0) or out of the wallet. */
  | { money: Currency; n: number }
  /** Ride the train (to a station city, its id in STATIONS_BUILT) or the metro (to a district): a short cutscene, then the platform there. */
  | { ride: 'train' | 'metro'; to: string };

const TWIGS: Record<'birch' | 'willow' | 'pine', ItemKind> = { birch: 'twig_birch', willow: 'twig_willow', pine: 'twig_pine' };

/** The border officer: introduction once, then the exam whenever the cat is ready. */
function clerk(country: Country, who: 'owl' | 'walrus' | 'flamingo', s: Save): Step[] {
  if (has(s, `stamp_${country}`)) return [{ say: `${who}.done`, who }];
  const intro: Step[] = has(s, `met_${who}`) ? [] : [{ say: `${who}.hello1`, who }, { say: `${who}.hello2`, who }, { set: `met_${who}` }];
  return [...intro, {
    ask: `${who}.ready`, who, opts: [
      {
        o: 'opt.yes', then: [{
          exam: country,
          pass: [{ say: `${who}.pass`, who }, { set: `stamp_${country}` }, { stamp: country }, { say: `${who}.gate`, who }, { xp: 20, why: 'for passing the border exam' }],
          fail: [{ say: `${who}.fail`, who }],
        }],
      },
      { o: 'opt.notyet', then: [{ say: `${who}.later`, who }] },
    ],
  }];
}

/** What happens when the player faces `o` and presses A. */
export function script(o: Obj, s: Save): Step[] {
  // the courier job: whoever a parcel is for takes it first, whatever else they have to say
  const rcpt = o.k === 'npc' ? o.id : o.k === 'desk' ? o.clerk : o.k === 'stall' ? o.vendor : undefined;
  if (rcpt && has(s, `parcel_${rcpt}`) && s.items.includes('parcel')) {
    return [{ take: 'parcel' }, { unset: `parcel_${rcpt}` }, { say: 'courier.thanks', who: rcpt as NpcKind }, { money: 'kredit', n: 6 }, { xp: 5, why: 'for a delivery' }];
  }
  if (o.k === 'stall') return o.vendor ? script({ k: 'npc', id: o.vendor, x: 0, y: 0, npc: o.vendor as NpcKind }, s) : [{ say: 'stall.look' }];
  if (o.k === 'door') return [{ say: `house.${o.sign}` }];
  if (o.k === 'lamp') return [];
  if (o.k === 'metro') return [{ say: 'metro.entrance' }];
  if (o.k === 'train' && o.kind === 'train') {
    // a mainline train: board it only with a ticket for where it goes
    if (o.dest === 'none') return [{ say: 'train.outofservice' }];
    const t = STATIONS_BUILT.find((d) => has(s, `ticket_${d.id}`));
    if (!t) return [{ say: `train.this_${o.dest}` }, { say: 'train.needticket' }];
    if (t.id !== o.dest) return [{ say: `train.this_${o.dest}` }, { say: 'train.wrongtrain' }];
    return [{ say: `train.this_${o.dest}` }, { unset: `ticket_${t.id}` }, { say: 'train.board' }, { ride: 'train', to: t.id }];
  }
  if (o.k === 'decor' && o.art.startsWith('psign')) {
    const city = s.map.replace(/^(gleis|under)_/, '');
    const n = Number(o.art.slice(5)) - 1;
    return [{ say: `psign${n + 1}.${PLATFORMS[city]?.[n] ?? 'none'}` }];
  }
  if (o.k === 'decor' && o.art === 'board') return [{ say: `board.${s.map}` }];
  if (o.k === 'decor' && o.art === 'ticketmachine') return script({ k: 'npc', id: 'ticketmachine', x: 0, y: 0, npc: 'raccoon' }, s);
  if (o.k === 'decor') return ['statue', 'kiosk', 'busstop'].includes(o.art) ? [{ say: `decor.${o.art}` }] : [];
  if (o.k === 'npc' && (o.id.startsWith('pass_') || o.id.startsWith('mp_'))) return [{ say: `${o.id}.1`, who: o.npc }, { say: `${o.id}.2`, who: o.npc }];
  if (o.k === 'ship') return [{ say: 'ship.look' }];
  if (o.k === 'desk') return script({ k: 'npc', id: o.clerk, x: 0, y: 0, npc: o.clerk as NpcKind }, s);
  if (o.k === 'gate') return [{ say: 'gate.closed' }];
  if (o.k === 'flag') return [{ say: `flag.${o.country}` }];
  if (o.k === 'plant') return [{ say: 'plant.look' }];
  if (o.k === 'house' && o.id.startsWith('office')) return [{ say: 'house.office' }];
  if (o.k === 'house' && o.id === 'info_door') return [{ say: 'house.info' }];
  if (o.k === 'house' && o.id === 'bakery_door') return [{ say: 'house.bakery' }];
  if (o.k === 'house' && o.id === 'station') return [{ say: 'station.look' }];
  if (o.k === 'house' && o.id === 'house_hedgehog') return [{ say: 'house.hedgehog' }];
  if (o.k === 'house' && o.id === 'exchange_door') return [{ say: 'house.exchange' }];
  if (o.k === 'house' && o.id === 'shop_door') return [{ say: 'house.shop' }];
  if (o.k === 'pole') return [{ say: 'sign.storm' }];
  if (o.k === 'house') return [{ say: 'house.closed' }];
  if (o.k === 'item') return [{ say: `pickup.${o.item}` }, { give: o.item }, { set: `got_${o.id}` }];
  if (o.k === 'tree' && o.tree === 'oak') return [{ say: 'tree.oak' }];
  switch (o.id) {
    case 'tortoise': {
      if (has(s, 'log_cleared')) return [{ say: 'tortoise.done', who: 'tortoise' }];
      if (has(s, 'met_tortoise')) return [{ say: 'tortoise.again', who: 'tortoise' }];
      return [
        { say: 'tortoise.hello1', who: 'tortoise' },
        { say: 'tortoise.hello2', who: 'tortoise' },
        { say: 'tortoise.hello3', who: 'tortoise' },
        { say: 'tortoise.hello4', who: 'tortoise' },
        { say: 'tortoise.hello5', who: 'tortoise' },
        { set: 'met_tortoise' },
      ];
    }
    case 'beaver': {
      if (has(s, 'log_cleared')) return [{ say: 'beaver.done', who: 'beaver' }];
      if (!has(s, 'asked_beaver')) {
        return [
          { say: 'beaver.hello1', who: 'beaver' },
          { say: 'beaver.hello2', who: 'beaver' },
          { say: 'beaver.hello3', who: 'beaver' },
          { say: 'beaver.hello4', who: 'beaver' },
          { set: 'asked_beaver' },
        ];
      }
      const twigs = s.items.filter((i) => i.startsWith('twig_'));
      if (!twigs.length) return [{ say: 'beaver.reminder', who: 'beaver' }];
      // Understanding the request is the puzzle: the learner picks which twig to hand over
      return [{
        ask: 'beaver.ask', who: 'beaver', opts: [
          ...twigs.map((t): Opt => ({ o: `item.${t}`, then: twigAnswer(t) })),
          { o: 'opt.notyet', then: [{ say: 'beaver.notyet', who: 'beaver' }] },
        ],
      }];
    }
    case 'frog':
      return [
        { say: 'frog.hello1', who: 'frog' },
        { say: 'frog.hello2', who: 'frog' },
        {
          ask: 'frog.ask', who: 'frog', opts: [
            { o: 'frog.optno', then: [{ say: 'frog.no', who: 'frog' }] },
            { o: 'frog.optyes', then: [{ say: 'frog.yes', who: 'frog' }] },
          ],
        },
      ];
    case 'bird':
      return [{ say: 'bird.hello1', who: 'bird' }, { say: 'bird.hello2', who: 'bird' }];
    case 'birch':
    case 'willow':
    case 'pine': {
      const item = TWIGS[o.id];
      const look: Step = { say: `tree.${o.id}` };
      if (!has(s, 'asked_beaver')) return [look];
      if (s.items.includes(item) || (item === 'twig_willow' && has(s, 'log_cleared'))) return [look, { say: 'tree.have' }];
      return [look, { ask: 'tree.take', opts: [{ o: 'opt.yes', then: [{ give: item }] }, { o: 'opt.no', then: [] }] }];
    }
    case 'log':
      return [{ say: 'log.look' }];
    case 'drift':
      return [{ say: 'snow.look' }];
    case 'owl':
      return clerk('forest', 'owl', s);
    case 'walrus':
      return clerk('ice', 'walrus', s);
    case 'penguin': {
      if (has(s, 'drift_cleared')) return [{ say: 'penguin.done', who: 'penguin' }];
      if (s.items.includes('shovel')) {
        return [
          { take: 'shovel' },
          { say: 'penguin.thanks1', who: 'penguin' },
          { fx: 'shake' },
          { set: 'drift_cleared' },
          { say: 'penguin.thanks2', who: 'penguin' },
          { xp: 25, why: 'for clearing the snow' },
        ];
      }
      if (has(s, 'asked_penguin')) return [{ say: 'penguin.reminder', who: 'penguin' }];
      return [
        { say: 'penguin.hello1', who: 'penguin' },
        { say: 'penguin.hello2', who: 'penguin' },
        { say: 'penguin.hello3', who: 'penguin' },
        { say: 'penguin.hello4', who: 'penguin' },
        { set: 'asked_penguin' },
      ];
    }
    case 'bat': {
      if (!has(s, 'asked_penguin')) return [{ say: 'bat.sleep', who: 'bat' }];
      if (has(s, 'got_shovel_item')) return [{ say: 'bat.found', who: 'bat' }];
      if (has(s, 'met_bat')) return [{ say: 'bat.again', who: 'bat' }];
      return [
        { say: 'bat.hello1', who: 'bat' },
        { say: 'bat.hello2', who: 'bat' },
        { say: 'bat.hello3', who: 'bat' },
        { say: 'bat.hello4', who: 'bat' },
        { set: 'met_bat' },
      ];
    }
    case 'crab':
      if (has(s, 'met_crab')) return [{ say: 'crab.again', who: 'crab' }];
      return [{ say: 'crab.hello1', who: 'crab' }, { say: 'crab.hello2', who: 'crab' }, { say: 'crab.hello3', who: 'crab' }, { set: 'met_crab' }];
    case 'chair':
      return [{
        ask: 'chair.ask', opts: [
          { o: 'opt.yes', then: [{ say: 'end.1' }, { say: 'end.2' }, { set: 'journey_done' }, { xp: 30, why: 'for finishing the journey' }, { end: true }] },
          { o: 'opt.no', then: [] },
        ],
      }];
    case 'hedgehog': {
      if (has(s, 'brambles_cut')) return [{ say: 'hedgehog.done', who: 'hedgehog' }];
      const shrooms = s.items.filter((i) => i.startsWith('mushroom_'));
      if (has(s, 'asked_hedgehog') && shrooms.length) {
        return [{
          ask: 'hedgehog.ask', who: 'hedgehog', opts: [
            ...[...new Set(shrooms)].map((m): Opt => ({
              o: `item.${m}`,
              then: m === 'mushroom_brown'
                ? [{ take: m }, { say: 'hedgehog.yes1', who: 'hedgehog' }, { say: 'hedgehog.yes2', who: 'hedgehog' }, { fx: 'shake' }, { set: 'brambles_cut' },
                  { say: 'hedgehog.yes3', who: 'hedgehog' }, { xp: 25, why: 'for helping Hilde' }]
                : m === 'mushroom_red'
                  ? [{ take: m }, { say: 'hedgehog.red', who: 'hedgehog' }]
                  : [{ say: 'hedgehog.yellow', who: 'hedgehog' }],
            })),
            { o: 'opt.notyet', then: [{ say: 'hedgehog.notyet', who: 'hedgehog' }] },
          ],
        }];
      }
      if (has(s, 'asked_hedgehog')) return [{ say: 'hedgehog.reminder', who: 'hedgehog' }];
      return [
        { say: 'hedgehog.hello1', who: 'hedgehog' }, { say: 'hedgehog.hello2', who: 'hedgehog' },
        { say: 'hedgehog.hello3', who: 'hedgehog' }, { say: 'hedgehog.hello4', who: 'hedgehog' }, { set: 'asked_hedgehog' },
      ];
    }
    case 'deer':
      return [{ say: 'deer.hello1', who: 'deer' }, { say: 'deer.hello2', who: 'deer' }];
    case 'bramble':
      return [{ say: 'bramble.look' }];
    case 'dog': {
      if (has(s, 'gate_open')) return [{ say: 'dog.done', who: 'dog' }];
      if (s.items.includes('guestcard')) {
        return [{ say: 'dog.card1', who: 'dog' }, { fx: 'shake' }, { set: 'gate_open' }, { say: 'dog.card2', who: 'dog' }, { xp: 15, why: 'for getting through the town gate' }];
      }
      if (has(s, 'asked_dog')) return [{ say: 'dog.reminder', who: 'dog' }];
      return [{ say: 'dog.hello1', who: 'dog' }, { say: 'dog.hello2', who: 'dog' }, { say: 'dog.hello3', who: 'dog' }, { set: 'asked_dog' }];
    }
    case 'towngate':
      return [{ say: 'towngate.look' }];
    case 'fox': {
      if (s.items.includes('guestcard') || has(s, 'gate_open')) return [{ say: 'fox.done', who: 'fox' }];
      // the registration form: each question needs the answer that fits it
      const wrong: Step[] = [{ say: 'fox.wrong', who: 'fox' }];
      const q = (n: number, right: number, then: Step[]): Step => ({
        ask: `fox.q${n}`, who: 'fox',
        opts: [0, 1, 2].map((k): Opt => ({ o: `fox.a${n}${'abc'[k]}`, then: k === right ? then : wrong })),
      });
      return [
        { say: 'fox.hello1', who: 'fox' }, { say: 'fox.hello2', who: 'fox' },
        q(1, 0, [q(2, 1, [q(3, 2, [{ say: 'fox.card', who: 'fox' }, { give: 'guestcard' }, { xp: 15, why: 'for filling in the form' }])])]),
      ];
    }
    case 'rabbit':
      return [{ say: 'rabbit.hello1', who: 'rabbit' }, { say: 'rabbit.hello2', who: 'rabbit' }];
    case 'fountain':
      return [{ say: 'fountain.look' }];
    case 'station':
      return [{ say: 'station.look' }];
    case 'mouse': {
      if (has(s, 'bridge_down')) return [{ say: 'mouse.done', who: 'mouse' }];
      if (s.items.includes('bread')) {
        return [{ take: 'bread' }, { say: 'mouse.thanks1', who: 'mouse' }, { say: 'mouse.thanks2', who: 'mouse' }, { fx: 'shake' }, { set: 'bridge_down' },
          { say: 'mouse.thanks3', who: 'mouse' }, { xp: 25, why: 'for the shopping' }];
      }
      if (has(s, 'asked_mouse')) return [{ say: 'mouse.reminder', who: 'mouse' }];
      return [{ say: 'mouse.hello1', who: 'mouse' }, { say: 'mouse.hello2', who: 'mouse' }, { say: 'mouse.hello3', who: 'mouse' }, { say: 'mouse.hello4', who: 'mouse' }, { money: 'taler', n: 5 }, { set: 'asked_mouse' }];
    }
    case 'badger': {
      if (s.items.includes('bread') || has(s, 'bridge_down')) return [{ say: 'badger.done', who: 'badger' }];
      if (!has(s, 'asked_mouse')) return [{ say: 'badger.hello', who: 'badger' }];
      // shopping: order what the miller asked for, then pay the right amount
      const pay: Step = {
        ask: 'badger.price', who: 'badger', opts: [
          { o: 'badger.pay4', then: [{ money: 'taler', n: -4 }, { say: 'badger.thanks', who: 'badger' }, { give: 'bread' }, { xp: 15, why: 'for shopping in German' }] },
          { o: 'badger.pay14', then: [{ say: 'badger.toomuch', who: 'badger' }] },
          { o: 'badger.pay40', then: [{ say: 'badger.toomuch', who: 'badger' }] },
        ],
      };
      return [{
        ask: 'badger.ask', who: 'badger', opts: [
          { o: 'badger.order2', then: [{ say: 'badger.wrongorder', who: 'badger' }] },
          { o: 'badger.order1', then: [pay] },
          { o: 'badger.order3', then: [{ say: 'badger.nocake', who: 'badger' }] },
        ],
      }];
    }
    case 'wheel':
      return [{ say: 'wheel.look' }];
    case 'goose': {
      if (has(s, 'goose_done')) return [{ say: 'goose.done', who: 'goose' }];
      const cases = s.items.filter((i) => i.startsWith('suitcase_'));
      if (has(s, 'asked_goose') && cases.length) {
        return [{
          ask: 'goose.ask', who: 'goose', opts: [
            ...cases.map((c): Opt => ({
              o: `item.${c}`,
              then: c === 'suitcase_ry'
                ? [{ take: c }, { say: 'goose.yes1', who: 'goose' }, { say: 'goose.yes2', who: 'goose' }, { give: 'postcard' }, { set: 'goose_done' }, { xp: 20, why: 'for finding the suitcase' }]
                : [{ take: c }, { say: 'goose.no', who: 'goose' }],
            })),
            { o: 'opt.notyet', then: [{ say: 'goose.notyet', who: 'goose' }] },
          ],
        }];
      }
      if (has(s, 'asked_goose')) return [{ say: 'goose.reminder', who: 'goose' }];
      return [{ say: 'goose.hello1', who: 'goose' }, { say: 'goose.hello2', who: 'goose' }, { say: 'goose.hello3', who: 'goose' }, { set: 'asked_goose' }];
    }
    case 'squirrel': {
      if (has(s, 'acorns_done')) return [{ say: 'squirrel.done', who: 'squirrel' }];
      const n = s.items.filter((i) => i === 'acorn').length;
      if (n >= 4) {
        return [{ take: 'acorn' }, { take: 'acorn' }, { take: 'acorn' }, { take: 'acorn' }, { say: 'squirrel.yes1', who: 'squirrel' }, { say: 'squirrel.yes2', who: 'squirrel' },
          { set: 'acorns_done' }, { xp: 20, why: 'for the acorns' }];
      }
      if (has(s, 'asked_squirrel')) return [{ say: 'squirrel.reminder', who: 'squirrel' }];
      return [{ say: 'squirrel.hello1', who: 'squirrel' }, { say: 'squirrel.hello2', who: 'squirrel' }, { set: 'asked_squirrel' }];
    }
    case 'sign_sonnenwald': return [{ say: 'sign.sonnenwald' }];
    case 'sign_lindenburg': return [{ say: 'sign.lindenburg' }];
    case 'sign_timetable': return [{ say: 'sign.timetable' }];
    case 'sign_millbrook': return [{ say: 'sign.millbrook' }];
    case 'sign_bridge': return [{ say: 'sign.bridge' }];
    case 'sign_birchvale': return [{ say: 'sign.birchvale' }];
    case 'sign_bus': return [{ say: 'sign.bus' }];
    case 'sign_crossroads': return [{ say: 'sign.crossroads' }];
    case 'sign_oakridge': return [{ say: 'sign.oakridge' }];
    case 'polarbear': {
      if (has(s, 'clothes_ok')) return [{ say: 'polarbear.done', who: 'polarbear' }];
      if (s.items.includes('hat') && s.items.includes('scarf')) {
        return [{ say: 'polarbear.warm1', who: 'polarbear' }, { fx: 'shake' }, { set: 'clothes_ok' }, { say: 'polarbear.warm2', who: 'polarbear' }, { xp: 20, why: 'for dressing for the snow' }];
      }
      if (has(s, 'asked_polarbear')) return [{ say: 'polarbear.reminder', who: 'polarbear' }];
      return [{ say: 'polarbear.hello1', who: 'polarbear' }, { say: 'polarbear.hello2', who: 'polarbear' }, { say: 'polarbear.hello3', who: 'polarbear' }, { set: 'asked_polarbear' }];
    }
    case 'arcticfox': {
      // the exchange office: change talers into crowns at 1 : 2, and say how many crowns that makes
      const t = money(s, 'taler');
      const amounts = [5, 10, 20].filter((n) => n <= t);
      if (!amounts.length) return [{ say: 'exch.hello', who: 'arcticfox' }, { say: 'exch.none', who: 'arcticfox' }];
      const quiz = (n: number): Step => {
        const right = n * 2;
        const opts = [n, n * 2, n * 3];
        return {
          ask: 'exch.quiz', who: 'arcticfox', opts: opts.map((k): Opt => ({
            o: `exch.k${k}`,
            then: [{ say: k === right ? 'exch.right' : 'exch.wrong', who: 'arcticfox' }, { money: 'taler', n: -n }, { money: 'krone', n: right }, { say: 'exch.done', who: 'arcticfox' }],
          })),
        };
      };
      return [
        { say: 'exch.hello', who: 'arcticfox' }, { say: 'exch.rate', who: 'arcticfox' },
        { ask: 'exch.ask', who: 'arcticfox', opts: [...amounts.map((n): Opt => ({ o: `exch.t${n}`, then: [quiz(n)] })), { o: 'exch.nothing', then: [{ say: 'exch.bye', who: 'arcticfox' }] }] },
      ];
    }
    case 'reindeer': {
      if (s.items.includes('hat') && s.items.includes('scarf')) return [{ say: 'shop.done', who: 'reindeer' }];
      const pay: Step[] = money(s, 'krone') >= 14
        ? [{
          ask: 'shop.price', who: 'reindeer', opts: [
            { o: 'shop.pay4', then: [{ say: 'shop.toolittle', who: 'reindeer' }] },
            { o: 'shop.pay14', then: [{ money: 'krone', n: -14 }, { say: 'shop.thanks', who: 'reindeer' }, { give: 'hat' }, { give: 'scarf' }, { xp: 15, why: 'for shopping in German' }] },
            { o: 'shop.pay40', then: [{ say: 'shop.toomuch', who: 'reindeer' }] },
          ],
        }]
        : [{ say: 'shop.price', who: 'reindeer' }, { say: 'shop.nomoney', who: 'reindeer' }];
      return [{
        ask: 'shop.ask', who: 'reindeer', opts: [
          { o: 'shop.order2', then: [{ say: 'shop.sunglasses', who: 'reindeer' }] },
          { o: 'shop.order1', then: pay },
          { o: 'shop.order3', then: [{ say: 'shop.tshirt', who: 'reindeer' }] },
        ],
      }];
    }
    case 'raccoon': {
      // the ticket counter: a ticket to another station city whose country stamp the cat has; then board the train
      const here = s.map.replace('station_', '');
      const cur = CURRENCY_OF[MAPS[s.map].country] ?? 'taler';
      const price = 5;
      const has_ticket = STATIONS_BUILT.find((d) => has(s, `ticket_${d.id}`));
      if (has_ticket) return [{ say: 'train.platform', who: 'raccoon' }];
      const dests = STATIONS_BUILT.filter((d) => d.id !== here && (!d.needs || has(s, d.needs)));
      if (!dests.length) return [{ say: 'train.hello', who: 'raccoon' }, { say: 'train.nostamp', who: 'raccoon' }];
      return [{ say: 'train.hello', who: 'raccoon' }, {
        ask: 'train.ask', who: 'raccoon', opts: [
          ...dests.map((d): Opt => ({
            o: `train.to_${d.id}`,
            then: money(s, cur) >= price
              ? [{ say: `train.price_${cur}`, who: 'raccoon' }, { money: cur, n: -price }, { set: `ticket_${d.id}` }, { say: 'train.platform', who: 'raccoon' }]
              : [{ say: `train.price_${cur}`, who: 'raccoon' }, { say: 'train.nomoney', who: 'raccoon' }],
          })),
          { o: 'opt.no', then: [{ say: 'train.bye', who: 'raccoon' }] },
        ],
      }];
    }
    case 'husky': {
      if (has(s, 'sled_done')) return [{ say: 'husky.done', who: 'husky' }];
      return [
        { say: 'husky.hello1', who: 'husky' }, { say: 'husky.hello2', who: 'husky' },
        {
          ask: 'husky.ask', who: 'husky', opts: [
            { o: 'husky.a1', then: [{ say: 'husky.wrong', who: 'husky' }] },
            { o: 'husky.a2', then: [{ say: 'husky.right', who: 'husky' }, { set: 'sled_done' }, { xp: 15, why: 'for reading the timetable' }] },
            { o: 'husky.a3', then: [{ say: 'husky.wrong', who: 'husky' }] },
          ],
        },
      ];
    }
    case 'seal': {
      if (s.items.includes('souvenir')) return [{ say: 'seal.done', who: 'seal' }];
      const buy: Step[] = money(s, 'krone') >= 3
        ? [{ money: 'krone', n: -3 }, { say: 'seal.thanks', who: 'seal' }, { give: 'souvenir' }]
        : [{ say: 'seal.nomoney', who: 'seal' }];
      return [{ say: 'seal.hello1', who: 'seal' }, { ask: 'seal.ask', who: 'seal', opts: [{ o: 'opt.yes', then: buy }, { o: 'opt.no', then: [{ say: 'seal.bye', who: 'seal' }] }] }];
    }
    case 'reindeer_fb':
      return [{ say: 'local.hello1', who: 'reindeer' }, { say: 'local.hello2', who: 'reindeer' }];
    case 'pole_storm': return [{ say: 'sign.storm' }];
    case 'sign_snowfield': return [{ say: 'sign.snowfield' }];
    case 'sign_storm': return [{ say: 'sign.storm' }];
    case 'sign_glacier': return [{ say: 'sign.glacier' }];
    case 'sign_sled': return [{ say: 'sign.sled' }];
    case 'sign_frostburg': return [{ say: 'sign.frostburg' }];
    case 'sign_timetable2': return [{ say: 'sign.timetable2' }];
    case 'sign_icefjord': case 'sign_icefjord2': return [{ say: 'sign.icefjord' }];
    case 'pigeon':
      return [{ say: 'pigeon.hello1', who: 'pigeon' }, { say: 'pigeon.hello2', who: 'pigeon' }, { say: 'pigeon.hello3', who: 'pigeon' }];
    case 'parrot': {
      // the Megacity exchange: crowns or talers into credits, 1 : 2
      const quiz = (from: Currency, n: number): Step => ({
        ask: 'mexch.quiz', who: 'parrot', opts: [n, n * 2, n * 3].map((k): Opt => ({
          o: `cred.${k}`,
          then: [{ say: k === n * 2 ? 'exch.right' : 'mexch.wrong', who: 'parrot' }, { money: from, n: -n }, { money: 'kredit', n: n * 2 }, { say: 'mexch.done', who: 'parrot' }],
        })),
      });
      const amounts = (from: Currency, key: string): Opt[] => [5, 10, 20].filter((n) => n <= money(s, from)).map((n) => ({ o: `${key}${n}`, then: [quiz(from, n)] }));
      const which: Opt[] = [];
      if (money(s, 'krone') >= 5) which.push({ o: 'mexch.krone', then: [{ ask: 'mexch.howmany', who: 'parrot', opts: amounts('krone', 'exch.k') }] });
      if (money(s, 'taler') >= 5) which.push({ o: 'mexch.taler', then: [{ ask: 'mexch.howmany', who: 'parrot', opts: amounts('taler', 'exch.t') }] });
      if (!which.length) return [{ say: 'mexch.hello', who: 'parrot' }, { say: 'exch.none', who: 'parrot' }];
      return [{ say: 'mexch.hello', who: 'parrot' }, { say: 'mexch.rate', who: 'parrot' }, { ask: 'mexch.ask', who: 'parrot', opts: [...which, { o: 'exch.nothing', then: [{ say: 'exch.bye', who: 'parrot' }] }] }];
    }
    case 'mtrain_central': case 'mtrain_oldtown': case 'mtrain_harbour': case 'mtrain_market': case 'mtrain_towers': {
      // the metro: with a day ticket, pick a stop; the first ride costs the cat its passport
      const here = o.id.replace('mtrain_', '');
      if (!s.items.includes('daypass')) return [{ say: 'metro.needticket' }];
      const lost: Step[] = has(s, 'passport_lost') || has(s, 'passport_found') || has(s, 'stamp_metro') ? [] : [{ say: 'metro.lost1' }, { say: 'metro.lost2' }, { set: 'passport_lost' }];
      return [{
        ask: 'metro.where', opts: [
          ...METRO_STOPS.filter((d) => d !== here).map((d): Opt => ({ o: `metro.to_${d}`, then: [{ ride: 'metro', to: d }, ...lost] })),
          { o: 'opt.no', then: [] },
        ],
      }];
    }
    case 'ticketmachine': {
      if (s.items.includes('daypass')) return [{ say: 'metro.haveticket' }];
      const buy: Step[] = money(s, 'kredit') >= 6 ? [{ money: 'kredit', n: -6 }, { give: 'daypass' }] : [{ say: 'metro.nomoney' }];
      return [{ say: 'metro.machine' }, {
        ask: 'metro.ticket', opts: [
          { o: 'metro.single', then: [{ say: 'metro.single_no' }] },
          { o: 'metro.day', then: buy },
          { o: 'metro.month', then: [{ say: 'metro.month_no' }] },
        ],
      }];
    }
    case 'sloth': {
      if (has(s, 'passport_found')) return [{ say: 'sloth.done', who: 'sloth' }];
      if (!has(s, 'passport_lost')) return [{ say: 'sloth.idle', who: 'sloth' }];
      if (has(s, 'lost_hint')) return [{ say: 'sloth.reminder', who: 'sloth' }];
      return [{ say: 'sloth.hello1', who: 'sloth' }, {
        ask: 'sloth.ask', who: 'sloth', opts: [
          { o: 'sloth.a1', then: [{ say: 'sloth.nope', who: 'sloth' }] },
          { o: 'sloth.a2', then: [{ say: 'sloth.yes1', who: 'sloth' }, { say: 'sloth.yes2', who: 'sloth' }, { set: 'lost_hint' }] },
          { o: 'sloth.a3', then: [{ say: 'sloth.nope', who: 'sloth' }] },
        ],
      }];
    }
    case 'seagull': {
      if (has(s, 'passport_found')) return [{ say: 'seagull.done', who: 'seagull' }];
      if (!has(s, 'lost_hint')) return [{ say: 'seagull.idle', who: 'seagull' }];
      if (has(s, 'asked_gull') && s.items.includes('fishroll')) {
        return [{ take: 'fishroll' }, { say: 'seagull.thanks1', who: 'seagull' }, { say: 'seagull.thanks2', who: 'seagull' }, { set: 'passport_found' }, { xp: 25, why: 'for getting your passport back' }];
      }
      if (has(s, 'asked_gull')) return [{ say: 'seagull.reminder', who: 'seagull' }];
      return [{ say: 'seagull.hello1', who: 'seagull' }, { say: 'seagull.hello2', who: 'seagull' }, { say: 'seagull.hello3', who: 'seagull' }, { set: 'asked_gull' }];
    }
    case 'pig': case 'stall_fish': {
      const fish: Step[] = money(s, 'kredit') >= 4 ? [{ say: 'pig.fishprice', who: 'pig' }, { money: 'kredit', n: -4 }, { give: 'fishroll' }, { say: 'pig.thanks', who: 'pig' }] : [{ say: 'pig.fishprice', who: 'pig' }, { say: 'pig.nomoney', who: 'pig' }];
      const cards: Opt[] = ROUTE.filter((c) => has(s, `visited_country_${c}`) || c === 'forest' || (c === 'ice' && has(s, 'stamp_forest')) || (c === 'metro' && has(s, 'stamp_ice')) || (c === 'beach' && has(s, 'stamp_metro')))
        .map((c) => ({ o: `pig.pc_${c}`, then: money(s, 'kredit') >= 5 ? [{ money: 'kredit', n: -5 }, { give: `pc_${c}` as ItemKind }, { say: 'pig.thanks', who: 'pig' }] : [{ say: 'pig.nomoney', who: 'pig' }] }));
      return [{
        ask: 'pig.ask', who: 'pig', opts: [
          { o: 'pig.want_fish', then: fish },
          { o: 'pig.want_card', then: [{ ask: 'pig.which', who: 'pig', opts: [...cards, { o: 'opt.no', then: [] }] }] },
          { o: 'exch.nothing', then: [{ say: 'pig.bye', who: 'pig' }] },
        ],
      }];
    }
    case 'poodle': {
      // the café job (repeatable): three customers a shift, each order served by picture
      const pics = ['coffee', 'tea', 'cake', 'croissant', 'juice', 'water'];
      const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
      const round = (): Step[] => {
        const order = pick(CAFE_ORDERS);
        const key = order.items.slice().sort().join();
        const wrong: string[][] = [];
        while (wrong.length < 2) {
          const w = order.items.length === 1 ? [pick(pics)] : [pick(pics), pick(pics)];
          const k = w.slice().sort().join();
          if (k !== key && !wrong.some((x) => x.slice().sort().join() === k)) wrong.push(w);
        }
        const opts = [order.items, ...wrong].sort(() => Math.random() - 0.5);
        // the order itself is the question, so it stays on screen while the pictures are chosen
        return [{
          ask: order.line, opts: opts.map((items): Opt => ({
            o: 'cafe.here', pic: items,
            then: items.slice().sort().join() === key ? [{ say: 'cafe.thanks' }, { money: 'kredit', n: 3 }, { xp: 3, why: 'for a happy customer' }] : [{ say: 'cafe.oops' }],
          })),
        }];
      };
      return [{ say: has(s, 'cafe_worked') ? 'cafe.again' : 'cafe.hello1', who: 'poodle' }, {
        ask: 'cafe.ask', who: 'poodle', opts: [
          { o: 'opt.yes', then: [{ say: 'cafe.start', who: 'poodle' }, ...round(), ...round(), ...round(), { say: 'cafe.end', who: 'poodle' }, { set: 'cafe_worked' }] },
          { o: 'opt.no', then: [{ say: 'cafe.later', who: 'poodle' }] },
        ],
      }];
    }
    case 'kangaroo': {
      // the courier job (repeatable): a parcel for someone somewhere in the city
      const job = COURIER.find((c) => has(s, `parcel_${c.npc}`));
      if (job && s.items.includes('parcel')) return [{ say: 'courier.busy', who: 'kangaroo' }, { say: `courier.to_${job.npc}`, who: 'kangaroo' }];
      const next = COURIER[Math.floor(Math.random() * COURIER.length)];
      return [{ say: has(s, 'courier_worked') ? 'courier.again' : 'courier.hello1', who: 'kangaroo' }, {
        ask: 'courier.ask', who: 'kangaroo', opts: [
          { o: 'opt.yes', then: [{ say: `courier.to_${next.npc}`, who: 'kangaroo' }, { give: 'parcel' }, { set: `parcel_${next.npc}` }, { set: 'courier_worked' }] },
          { o: 'opt.no', then: [{ say: 'courier.later', who: 'kangaroo' }] },
        ],
      }];
    }
    case 'stork':
      // the language school (repeatable): an exam on the words of the whole journey
      return [{ say: has(s, 'school_done') ? 'school.again' : 'school.hello1', who: 'stork' }, { say: 'school.hello2', who: 'stork' }, {
        ask: 'school.ask', who: 'stork', opts: [
          { o: 'opt.yes', then: [{ exam: 'all', pass: [{ say: 'school.pass', who: 'stork' }, { money: 'kredit', n: 8 }, { set: 'school_done' }, { xp: 15, why: 'at the language school' }], fail: [{ say: 'school.fail', who: 'stork' }] }] },
          { o: 'opt.notyet', then: [{ say: 'school.later', who: 'stork' }] },
        ],
      }];
    case 'flamingo':
      if (has(s, 'passport_lost') && !has(s, 'passport_found')) return [{ say: 'flamingo.nopass1', who: 'flamingo' }, { say: 'flamingo.nopass2', who: 'flamingo' }];
      return clerk('metro', 'flamingo', s);
    case 'hanna_mc': case 'greta_mc': case 'fritz_mc': case 'mia_mc': case 'frieda_mc': case 'rieke_mc': {
      const who = (o as Extract<Obj, { k: 'npc' }>).npc;
      return [{ say: `${o.id}.1`, who }, { say: `${o.id}.2`, who }];
    }
    case 'sign_central': return [{ say: 'sign.central' }];
    case 'sign_oldtown': return [{ say: 'sign.oldtown' }];
    case 'sign_harbour': return [{ say: 'sign.harbour' }];
    case 'sign_market': return [{ say: 'sign.market' }];
    case 'sign_towers': return [{ say: 'sign.towers' }];
    case 'sign_metromap': return [{ say: 'sign.metromap' }];
    case 'sign_border3': return [{ say: 'sign.border3' }];
    case 'sign_village': return [{ say: 'sign.village' }];
    case 'sign_east': return [{ say: 'sign.east' }];
    case 'sign_border1': return [{ say: 'sign.border1' }];
    case 'sign_border2': return [{ say: 'sign.border2' }];
    case 'sign_frost': return [{ say: 'sign.frost' }];
    case 'sign_cave': return [{ say: 'sign.cave' }];
    case 'sign_beach': return [{ say: 'sign.beach' }];
  }
  return [];
}

function twigAnswer(t: ItemKind): Step[] {
  if (t === 'twig_willow') {
    return [
      { take: t },
      { say: 'beaver.willow1', who: 'beaver' },
      { say: 'beaver.willow2', who: 'beaver' },
      { fx: 'shake' },
      { set: 'log_cleared' },
      { say: 'beaver.willow3', who: 'beaver' },
      { xp: 25, why: 'for clearing the path' },
    ];
  }
  return [{ take: t }, { say: t === 'twig_birch' ? 'beaver.birch' : 'beaver.pine', who: 'beaver' }];
}

/**
 * The "name it" key: what the thing in front of the cat is called. Objects first, then the ground by the map's look
 * (water is a pond in the forest, ice in Frostland, the sea on the coast). Each key has a line "thing.<key>" in
 * every language: the word with its article.
 */
export const THINGS = [
  'grass', 'path', 'pond', 'ice', 'sea', 'snow', 'sand', 'floor', 'wall', 'rockwall', 'forest', 'palm', 'tallgrass',
  'flower', 'starfish', 'shell', 'stone', 'crystal', 'fence', 'boardwalk', 'mat', 'exit', 'house', 'office', 'door',
  'birch', 'willow', 'pine', 'trunk', 'snowdrift', 'barrier', 'sign', 'cave', 'counter', 'deckchair', 'flag', 'plant',
  'shovel', 'tortoise', 'beaver', 'frog', 'bird', 'owl', 'penguin', 'bat', 'walrus', 'crab',
  'oak', 'hedgehog', 'deer', 'dog', 'fox', 'mouse', 'badger', 'goose', 'rabbit', 'squirrel', 'bramble', 'towngate', 'bridge',
  'wheel', 'fountain', 'track', 'mushroom', 'suitcase', 'acorn', 'station', 'river', 'cobbles', 'road',
  'arcticfox', 'reindeer', 'polarbear', 'husky', 'seal', 'raccoon',
  'pigeon', 'seagull', 'sloth', 'parrot', 'flamingo', 'poodle', 'kangaroo', 'stork', 'pig',
  'building', 'pavement', 'crosswalk', 'metro', 'stall', 'ship', 'lamp', 'planter',
  'bench', 'bikes', 'statue', 'kiosk', 'busstop', 'table', 'crates', 'barrel', 'bin', 'flowerbed', 'car', 'park',
  'train', 'metrotrain', 'platform', 'ticketmachine', 'board', 'stairs', 'pillar', 'poster', 'platformsign', 'underpass',
] as const;
export type Thing = (typeof THINGS)[number];

/** Every NPC kind (each needs a name in every language). */
export const NPC_KINDS: NpcKind[] = ['tortoise', 'beaver', 'frog', 'bird', 'owl', 'penguin', 'bat', 'walrus', 'crab',
  'hedgehog', 'deer', 'dog', 'fox', 'mouse', 'badger', 'goose', 'rabbit', 'squirrel',
  'arcticfox', 'reindeer', 'polarbear', 'husky', 'seal', 'raccoon',
  'pigeon', 'seagull', 'sloth', 'parrot', 'flamingo', 'poodle', 'kangaroo', 'stork', 'pig'];

const clerkLines = (w: string) => ['hello1', 'hello2', 'ready', 'pass', 'gate', 'fail', 'later', 'done'].map((k) => `${w}.${k}`);

/** Every line key the world uses (the text check makes sure each language has them all). */
export const LINE_KEYS = [
  'tortoise.hello1', 'tortoise.hello2', 'tortoise.hello3', 'tortoise.hello4', 'tortoise.hello5', 'tortoise.again', 'tortoise.done',
  'beaver.hello1', 'beaver.hello2', 'beaver.hello3', 'beaver.hello4', 'beaver.reminder', 'beaver.ask', 'beaver.notyet',
  'beaver.birch', 'beaver.pine', 'beaver.willow1', 'beaver.willow2', 'beaver.willow3', 'beaver.done',
  'frog.hello1', 'frog.hello2', 'frog.ask', 'frog.optno', 'frog.optyes', 'frog.no', 'frog.yes',
  'bird.hello1', 'bird.hello2',
  'tree.birch', 'tree.willow', 'tree.pine', 'tree.take', 'tree.have',
  'log.look', 'sign.village', 'sign.east', 'house.closed', 'house.office',
  ...clerkLines('owl'), ...clerkLines('walrus'),
  'gate.closed', 'sign.border1', 'sign.border2', 'flag.forest', 'flag.ice', 'plant.look',
  'penguin.hello1', 'penguin.hello2', 'penguin.hello3', 'penguin.hello4', 'penguin.reminder', 'penguin.thanks1', 'penguin.thanks2', 'penguin.done',
  'snow.look', 'sign.frost', 'sign.cave', 'pickup.shovel', 'cave.wrong',
  'bat.sleep', 'bat.hello1', 'bat.hello2', 'bat.hello3', 'bat.hello4', 'bat.again', 'bat.found',
  'crab.hello1', 'crab.hello2', 'crab.hello3', 'crab.again', 'chair.ask', 'end.1', 'end.2', 'sign.beach',
  'opt.yes', 'opt.no', 'opt.notyet',
  'item.twig_birch', 'item.twig_willow', 'item.twig_pine', 'item.shovel',
  // Woodland
  'house.info', 'house.bakery', 'house.hedgehog', 'tree.oak',
  'hedgehog.hello1', 'hedgehog.hello2', 'hedgehog.hello3', 'hedgehog.hello4', 'hedgehog.reminder', 'hedgehog.ask', 'hedgehog.notyet',
  'hedgehog.yes1', 'hedgehog.yes2', 'hedgehog.yes3', 'hedgehog.red', 'hedgehog.yellow', 'hedgehog.done',
  'deer.hello1', 'deer.hello2', 'bramble.look', 'sign.sonnenwald',
  'pickup.mushroom_red', 'pickup.mushroom_brown', 'pickup.mushroom_yellow', 'item.mushroom_red', 'item.mushroom_brown', 'item.mushroom_yellow',
  'dog.hello1', 'dog.hello2', 'dog.hello3', 'dog.reminder', 'dog.card1', 'dog.card2', 'dog.done', 'towngate.look',
  'fox.hello1', 'fox.hello2', 'fox.q1', 'fox.a1a', 'fox.a1b', 'fox.a1c', 'fox.q2', 'fox.a2a', 'fox.a2b', 'fox.a2c', 'fox.q3', 'fox.a3a', 'fox.a3b', 'fox.a3c',
  'fox.wrong', 'fox.card', 'fox.done', 'item.guestcard',
  'rabbit.hello1', 'rabbit.hello2', 'fountain.look', 'station.look', 'sign.lindenburg', 'sign.timetable',
  'mouse.hello1', 'mouse.hello2', 'mouse.hello3', 'mouse.hello4', 'mouse.reminder', 'mouse.thanks1', 'mouse.thanks2', 'mouse.thanks3', 'mouse.done',
  'badger.hello', 'badger.ask', 'badger.order1', 'badger.order2', 'badger.order3', 'badger.wrongorder', 'badger.nocake', 'badger.price',
  'badger.pay4', 'badger.pay14', 'badger.pay40', 'badger.toomuch', 'badger.thanks', 'badger.done', 'item.bread',
  'wheel.look', 'sign.millbrook', 'sign.bridge',
  'goose.hello1', 'goose.hello2', 'goose.hello3', 'goose.reminder', 'goose.ask', 'goose.notyet', 'goose.yes1', 'goose.yes2', 'goose.no', 'goose.done',
  'pickup.suitcase_ry', 'pickup.suitcase_rb', 'pickup.suitcase_by', 'item.suitcase_ry', 'item.suitcase_rb', 'item.suitcase_by', 'item.postcard',
  'sign.birchvale', 'sign.bus', 'sign.crossroads',
  // Frostland
  'house.exchange', 'house.shop',
  'polarbear.hello1', 'polarbear.hello2', 'polarbear.hello3', 'polarbear.reminder', 'polarbear.warm1', 'polarbear.warm2', 'polarbear.done',
  'exch.hello', 'exch.rate', 'exch.ask', 'exch.t5', 'exch.t10', 'exch.t20', 'exch.nothing', 'exch.bye', 'exch.none', 'exch.quiz',
  'exch.k5', 'exch.k10', 'exch.k15', 'exch.k20', 'exch.k30', 'exch.k40', 'exch.k60', 'exch.right', 'exch.wrong', 'exch.done',
  'shop.ask', 'shop.order1', 'shop.order2', 'shop.order3', 'shop.sunglasses', 'shop.tshirt', 'shop.price', 'shop.pay4', 'shop.pay14', 'shop.pay40',
  'shop.toolittle', 'shop.toomuch', 'shop.thanks', 'shop.nomoney', 'shop.done',
  'train.hello', 'train.ask', 'train.to_lindenburg', 'train.to_frostburg', 'train.price_taler', 'train.price_krone', 'train.board', 'train.nomoney', 'train.nostamp', 'train.bye',
  'husky.hello1', 'husky.hello2', 'husky.ask', 'husky.a1', 'husky.a2', 'husky.a3', 'husky.right', 'husky.wrong', 'husky.done',
  'seal.hello1', 'seal.ask', 'seal.thanks', 'seal.nomoney', 'seal.bye', 'seal.done', 'local.hello1', 'local.hello2',
  'sign.snowfield', 'sign.storm', 'sign.glacier', 'sign.sled', 'sign.frostburg', 'sign.timetable2', 'sign.icefjord',
  'item.hat', 'item.scarf', 'item.souvenir',
  // Megacity
  'pigeon.hello1', 'pigeon.hello2', 'pigeon.hello3', 'mexch.hello', 'mexch.rate', 'mexch.ask', 'mexch.krone', 'mexch.taler', 'mexch.howmany', 'mexch.quiz', 'mexch.wrong', 'mexch.done',
  'cred.5', 'cred.10', 'cred.15', 'cred.20', 'cred.30', 'cred.40', 'cred.60',
  'metro.machine', 'metro.ticket', 'metro.single', 'metro.day', 'metro.month', 'metro.single_no', 'metro.month_no', 'metro.nomoney', 'metro.where',
  'metro.to_central', 'metro.to_oldtown', 'metro.to_harbour', 'metro.to_market', 'metro.to_towers', 'metro.lost1', 'metro.lost2',
  'sloth.idle', 'sloth.hello1', 'sloth.ask', 'sloth.a1', 'sloth.a2', 'sloth.a3', 'sloth.nope', 'sloth.yes1', 'sloth.yes2', 'sloth.reminder', 'sloth.done',
  'seagull.idle', 'seagull.hello1', 'seagull.hello2', 'seagull.hello3', 'seagull.reminder', 'seagull.thanks1', 'seagull.thanks2', 'seagull.done',
  'pig.ask', 'pig.want_fish', 'pig.want_card', 'pig.fishprice', 'pig.which', 'pig.pc_forest', 'pig.pc_ice', 'pig.pc_metro', 'pig.pc_beach', 'pig.thanks', 'pig.nomoney', 'pig.bye',
  'cafe.hello1', 'cafe.again', 'cafe.ask', 'cafe.start', 'cafe.serve', 'cafe.here', 'cafe.thanks', 'cafe.oops', 'cafe.end', 'cafe.later',
  'cafe.o1', 'cafe.o2', 'cafe.o3', 'cafe.o4', 'cafe.o5', 'cafe.o6', 'cafe.o7', 'cafe.o8', 'cafe.o9', 'cafe.o10',
  'courier.hello1', 'courier.again', 'courier.ask', 'courier.busy', 'courier.later', 'courier.thanks',
  'courier.to_pigeon', 'courier.to_seagull', 'courier.to_pig', 'courier.to_sloth', 'courier.to_stork', 'courier.to_poodle',
  'school.hello1', 'school.again', 'school.hello2', 'school.ask', 'school.pass', 'school.fail', 'school.later',
  ...clerkLines('flamingo'), 'flamingo.nopass1', 'flamingo.nopass2',
  'house.station', 'house.school', 'house.hotel', 'house.cafe', 'house.lost', 'house.museum', 'house.courier', 'house.tower',
  'sign.central', 'sign.oldtown', 'sign.harbour', 'sign.market', 'sign.towers', 'sign.metromap', 'sign.border3', 'flag.metro', 'stall.look', 'ship.look',
  'hanna_mc.1', 'hanna_mc.2', 'greta_mc.1', 'greta_mc.2', 'fritz_mc.1', 'fritz_mc.2', 'mia_mc.1', 'mia_mc.2', 'frieda_mc.1', 'frieda_mc.2', 'rieke_mc.1', 'rieke_mc.2',
  'decor.statue', 'decor.kiosk', 'decor.busstop',
  'train.platform', 'train.needticket', 'train.wrongtrain', 'train.outofservice', 'train.this_lindenburg', 'train.this_frostburg', 'train.this_central',
  ...[1, 2, 3].flatMap((n) => ['lindenburg', 'frostburg', 'central', 'none'].map((d) => `psign${n}.${d}`)),
  'metro.needticket', 'metro.haveticket', 'metro.entrance',
  'board.station_lindenburg', 'board.station_frostburg', 'board.station_central',
  'board.metro_central', 'board.metro_oldtown', 'board.metro_harbour', 'board.metro_market', 'board.metro_towers',
  'pass_l1.1', 'pass_l1.2', 'pass_l2.1', 'pass_l2.2', 'pass_f1.1', 'pass_f1.2', 'pass_f2.1', 'pass_f2.2', 'pass_c1.1', 'pass_c1.2', 'pass_c2.1', 'pass_c2.2',
  'mp_central.1', 'mp_central.2', 'mp_oldtown.1', 'mp_oldtown.2', 'mp_harbour.1', 'mp_harbour.2', 'mp_market.1', 'mp_market.2', 'mp_towers.1', 'mp_towers.2',
  'item.fishroll', 'item.parcel', 'item.daypass', 'item.pc_forest', 'item.pc_ice', 'item.pc_metro', 'item.pc_beach',
  'squirrel.hello1', 'squirrel.hello2', 'squirrel.reminder', 'squirrel.yes1', 'squirrel.yes2', 'squirrel.done', 'pickup.acorn', 'item.acorn', 'sign.oakridge',
  ...THINGS.map((t) => `thing.${t}`),
];
