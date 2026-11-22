/**
 * The Desert (6th country, between the Megacity and the Swamp). The cat arrives from the Megacity in the Caravan
 * Camp, travels east to Sandstone Town, north through the old ruins, then west over the Salt Flats to Oasis City (on
 * the railway) and the border. Dune Village is a side road north of the ruins.
 *
 * Roadblocks (each cleared by a quest):
 * - a camel asleep across the dune pass out of the camp: it gets up for dates (change money, buy dates);
 * - Sandstone Town's gate, shut against a sandstorm: the guard opens it for a scarf (bargained for at the bazaar) and
 *   goggles (from the shop);
 * - a column fallen across the ruins road: a hired camel pulls it away;
 * - the ranger's barrier at the salt pan: she lets you cross with water and sun cream; the water needs the village
 *   well mended, with a rope (ten metres) from the rope maker in Dune Village.
 * Side quests: the caravan timetable, the carved signs in the ruins, souvenirs in Oasis City.
 */
import type { CountryModule, Kit, MapDef, Obj, Opt, Save, Step } from '../world';
import type { ItemKind } from '../art';
import './desert-art';

const has = (s: Save, i: ItemKind) => s.items.includes(i);

// ---------------------------------------------------------------- maps

/**
 * Caravan Camp: a basin among the dunes with the Bedouin tents, the exchange tent and the date seller. The road
 * comes in from the Megacity in the west and leaves north-east through a narrow dune pass, where a camel sleeps.
 */
const CARAVAN_ROWS = [
  '####################################',
  '####################################',
  '####......#######.....######..######',
  '###...........###.......####....####',
  '##......................####.....:::',
  '##..r...................####:::::::.',
  '##.........y.........r..####::..####',
  '###.....................####::..####',
  '##.....w.......".......#####::..####',
  '##.............""".....####...######',
  '##..............""......###::.######',
  '##......................###::..#####',
  '#####...................###::..#####',
  '##........r..............##::...####',
  ':::::::::::::::::::::::::::::...####',
  ':::::::::::::::::::::::::::::...####',
  '##......................####....####',
  '##...y.............w....####...#####',
  '##.......................######.####',
  '###.....""".........r..#############',
  '####....""".........################',
  '#####.......##.......###############',
  '####################################',
  '####################################',
];

/** Sandstone Town: a walled town of adobe houses around the bazaar; the north gate is shut against the sandstorm. */
const SANDSTONE_ROWS = [
  '#################::#################',
  '#################::#################',
  '#################::#################',
  '#################::#################',
  '#################::#################',
  '##...............::...............##',
  '##...............::...............##',
  '##...............::...............##',
  '##...............::...............##',
  '##...............::...............##',
  '##...........::::::::::...........##',
  '##...........::::::::::...........##',
  '##...........::......::...........##',
  '##...........::......::...........##',
  ':::::::::::::::......::...........##',
  ':::::::::::::::......::...........##',
  '##...........::......::...........##',
  '##...........::::::::::...........##',
  '##...........::::::::::...........##',
  '##................................##',
  '##................................##',
  '##................................##',
  '##................................##',
  '##................................##',
  '####################################',
  '####################################',
];

/**
 * The old ruins: an avenue of columns runs north from the town gate into a canyon, where a column has fallen across
 * the road. Beyond it, a square with the great stone cat; the road goes on west to the Salt Flats, a path north to
 * Dune Village.
 */
const RUINS_ROWS = [
  '#########::#########################',
  '#########::#########################',
  '#########::#########################',
  '##.......::...................######',
  '##...w...::.........o..........#####',
  '::::::::::::::::::::::.........#####',
  '::::::::::::::::::::::.........#####',
  '##.................::..........#####',
  '##.................::..........#####',
  '##....o............::.........######',
  '######.............::.......########',
  '##############.....::...############',
  '##################.::.##############',
  '###################::.##############',
  '##################.::.##############',
  '################...::...############',
  '##########.........::.........######',
  '######.............::...........####',
  '######...o.........::...........####',
  '######.............::...........####',
  '######.............::.......w...####',
  '######.............::...........####',
  '######.....w.......::...........####',
  '######.............::......o....####',
  '########...........::.........######',
  '############.......::.....##########',
  '###################::###############',
  '###################::###############',
  '###################::###############',
];

/** Dune Village: round clay huts in a hollow among the dunes, where the rope maker lives. */
const DUNES_ROWS = [
  '############################',
  '############################',
  '#######.........############',
  '#####.............##########',
  '####.................#######',
  '###....................#####',
  '###.....r..............#####',
  '##.....................#####',
  '##............::........####',
  '##...........::::.......####',
  '##..........::::::......####',
  '###..........::::.......####',
  '###...........::....y...####',
  '####..........::.......#####',
  '#####.........::.....#######',
  '######........::...#########',
  '#########.....::.###########',
  '############..::.###########',
  '#############.::############',
  '#############.::############',
];

/** The Salt Flats: a village of salt-block houses at the edge of the white salt pan; west, a causeway between brine pools. */
const SALTFLATS_ROWS = [
  '######################################',
  '######################################',
  '~~~~~~~~~~##........................##',
  '~~~~~~~~~~~~.....o..................##',
  '~~~~~~~~~~~~~.......................##',
  '~~~~~~~~~~~~~~.................w....##',
  '~~~~~~~~~~~~~~......................##',
  '~~~~~~~~~~~~~~~.....................##',
  '~~~~~~~~~~~~~~~.........w...........##',
  '~~~~~~~~~~~~~~~~....................##',
  '~~~~~~~~~~~~~~~~~...................##',
  '::::::::::::::::::::::::::::::::::::::',
  '::::::::::::::::::::::::::::::::::::::',
  '~~~~~~~~~~~~~~~~~...................##',
  '~~~~~~~~~~~~~~~~....................##',
  '~~~~~~~~~~~~~~~...............w.....##',
  '~~~~~~~~~~~~~~......................##',
  '~~~~~~~~~~~~~~.......o..............##',
  '~~~~~~~~~~~~~.......................##',
  '~~~~~~~~~~~~...........w............##',
  '~~~~~~~~~~~~........................##',
  '######################################',
  '######################################',
];

/** Oasis City: palms around a pool, houses, the souvenir stall and the railway station. */
const OASIS_ROWS = [
  '########################################',
  '########################################',
  '####................................####',
  '###..................................###',
  '##....................................##',
  '##....................................##',
  '##....................................##',
  '##.................::.................##',
  '##.................::.................##',
  '##.......::::::::::::::::::::::.......##',
  '##.......::..................::.......##',
  '##.......::....yy~~~~~yy.....::.......##',
  '##.......::...y~~~~~~~~~y....::.......##',
  '##.......::..y~~~~~~~~~~~y...::.......##',
  ':::::::::::..y~~~~~~~~~~~y..::::::::::::',
  ':::::::::::..y~~~~~~~~~~~y..::::::::::::',
  '##.......::....y~~~~~~~~~y...::.......##',
  '##.......::.....yy~~~~~yy....::.......##',
  '##.......::..................::.......##',
  '##.......::::::::::::::::::::::.......##',
  '##....................................##',
  '##....................................##',
  '##....................................##',
  '###..................................###',
  '####...............""...............####',
  '########################################',
  '########################################',
];

/** The Desert border: the road runs west between the dunes; the office and the barrier. */
const BORDER_ROWS = [
  '################################',
  '################################',
  '#######.............############',
  '#####.................##########',
  '####....................########',
  '####.....................#######',
  '####.........::...........######',
  '########.....::.............####',
  '########.....::...............##',
  '::::::::::::::::::::::::::::::::',
  '::::::::::::::::::::::::::::::::',
  '########......................##',
  '########.........y............##',
  '####..........................##',
  '####.....r..............w....###',
  '#####...................######..',
  '########.........##############.',
  '################################',
  '################################',
];

const npc = (id: string, x: number, y: number, kind: string): Obj => ({ k: 'npc', id, x, y, npc: kind });
const decor = (id: string, x: number, y: number, art: string): Obj => ({ k: 'decor', id, x, y, art });
const sign = (id: string, x: number, y: number): Obj => ({ k: 'sign', id, x, y });

export default (kit: Kit): CountryModule => {
  const map = (id: string, theme: string, rows: string[], spawn: MapDef['spawn'], objs: Obj[], warps: MapDef['warps']): MapDef =>
    ({ id, at: id, country: 'desert', theme, spawn, rows, objs, warps });
  /** A room in the desert's own look: clay walls with a painted band, a big carpet. */
  const room = (m: MapDef, theme = 'ds_home'): MapDef => ({
    ...m, theme,
    rows: m.rows.map((r, y) => (y >= 4 && y <= 7 ? r.split('').map((c, x) => (c === '.' && x >= 2 && x <= 8 ? 'r' : c)).join('') : r)),
    objs: [...m.objs.filter((o) => o.k !== 'plant'), decor(`${m.id}_palm1`, 1, 2, 'ds_potpalm'), decor(`${m.id}_palm2`, 9, 2, 'ds_potpalm'),
      decor(`${m.id}_jars`, 1, 7, 'ds_jars'), decor(`${m.id}_lamp`, 9, 7, 'ds_lantern')],
  });

  const caravan = map('caravan', 'ds_sand', CARAVAN_ROWS, { x: 2, y: 14, dir: 'right' }, [
    decor('tent1', 3, 4, 'ds_tent'), decor('tent2', 9, 3, 'ds_tent'), decor('tent_x', 16, 4, 'ds_tent_x'),
    decor('stall_dates', 9, 11, 'ds_stall_dates'), npc('meerkat', 10, 10, 'meerkat'),
    decor('campfire', 15, 10, 'ds_campfire'), decor('jars', 3, 9, 'ds_jars'), decor('sacks', 20, 9, 'ds_sacks'), decor('sacks2', 13, 8, 'ds_sacks'),
    decor('camel_rest1', 4, 17, 'ds_camel_rest'), decor('camel_rest2', 8, 19, 'ds_camel_rest'), decor('camel_stand', 14, 17, 'ds_camel'),
    decor('palm1', 2, 11, 'ds_palm'), decor('palm2', 20, 12, 'ds_palm'), decor('palm3', 22, 3, 'ds_palm'),
    decor('cactus1', 21, 18, 'ds_cactus'), decor('cactus2', 30, 5, 'ds_cactus'), decor('agave1', 18, 20, 'ds_agave'), decor('agave2', 12, 21, 'ds_agave'),
    decor('timetable', 17, 12, 'ds_timetable'),
    sign('sign_caravan', 1, 13),
    { k: 'block', id: 'camelblock', x: 27, y: 9, art: 'ds_camel_lying', until: 'ds_camel_up' },
  ], [
    ...kit.edge(0, [14, 15], '@prev', 0, [0, 0], 'left'),
    ...kit.edge(35, [4, 5], 'sandstone', 1, [14, 15], 'right'),
    { x: 17, y: 5, to: 'ds_exchange', tx: 5, ty: 7, dir: 'up', door: true },
  ]);

  const sandstone = map('sandstone', 'ds_town', SANDSTONE_ROWS, { x: 1, y: 14, dir: 'right' }, [
    // the gate in the town wall, the guard beside it
    decor('gatehouse', 15, 4, 'ds_gatehouse'), decor('gatepost', 18, 4, 'ds_gatepost'),
    { k: 'block', id: 'gatedoors', x: 16, y: 4, art: 'ds_gatedoors', until: 'ds_gate_open' },
    npc('oryx', 19, 6, 'oryx'),
    // houses round the walls
    decor('house_a', 3, 6, 'ds_house'), decor('house_b', 8, 6, 'ds_tower'), decor('shop', 22, 6, 'ds_shop'), decor('house_c', 27, 6, 'ds_house3'),
    decor('house_d', 3, 19, 'ds_house2'), decor('house_e', 24, 19, 'ds_domehouse'), decor('house_f', 29, 12, 'ds_house3'),
    // the bazaar square
    decor('stall_spice', 15, 12, 'ds_stall_spice'), decor('stall_carpet', 18, 12, 'ds_stall_carpet'), decor('stall_cloth', 16, 16, 'ds_stall_cloth'),
    npc('jerboa', 17, 15, 'jerboa'),
    { k: 'fountain', id: 'fountain', x: 19, y: 16 },
    decor('palm1', 12, 7, 'ds_palm'), decor('palm2', 24, 15, 'ds_palm'), decor('palm3', 9, 20, 'ds_palm'),
    decor('jars1', 7, 12, 'ds_jars'), decor('sacks1', 13, 20, 'ds_sacks'), decor('camel', 4, 16, 'ds_camel_rest'),
    decor('inn', 13, 21, 'ds_inn'), decor('house_g', 29, 21, 'ds_house'), decor('well', 26, 10, 'ds_well'), decor('palm4', 30, 16, 'ds_palm'),
    decor('jars2', 21, 7, 'ds_jars'), decor('sacks2', 14, 9, 'ds_sacks'), decor('sacks3', 21, 13, 'ds_sacks'), decor('cactus', 2, 9, 'ds_cactus'),
    sign('sign_sandstone', 2, 13), sign('sign_bazaar', 12, 13),
  ], [
    ...kit.edge(0, [14, 15], 'caravan', 34, [4, 5], 'left'),
    { x: 17, y: 0, to: 'ruins', tx: 19, ty: 27, dir: 'up' }, { x: 18, y: 0, to: 'ruins', tx: 20, ty: 27, dir: 'up' },
    { x: 23, y: 7, to: 'ds_goggleshop', tx: 5, ty: 7, dir: 'up', door: true },
  ]);

  const ruins = map('ruins', 'ds_rock', RUINS_ROWS, { x: 19, y: 27, dir: 'up' }, [
    // the avenue of columns from the town road
    ...[17, 20, 23].flatMap((y, i): Obj[] => [decor(`col_w${i}`, 17, y, i === 1 ? 'ds_column_broken' : 'ds_column'), decor(`col_e${i}`, 22, y, i === 2 ? 'ds_column_broken' : 'ds_column')]),
    decor('obelisk1', 8, 17, 'ds_obelisk'), decor('obelisk2', 30, 19, 'ds_obelisk'), decor('statue_head', 27, 16, 'ds_statue_head'),
    decor('carving', 8, 21, 'ds_carving'), decor('carving2', 26, 21, 'ds_carving'), decor('col_x', 13, 19, 'ds_column_broken'), decor('col_y', 14, 24, 'ds_column_broken'),
    decor('cactus1', 11, 16, 'ds_cactus'), decor('agave1', 24, 24, 'ds_agave'),
    npc('dromedary', 15, 21, 'dromedary'), npc('caracal', 23, 16, 'caracal'),
    { k: 'block', id: 'column_fallen', x: 19, y: 13, art: 'ds_column_fallen', until: 'ds_column_moved' },
    // the square beyond: the great stone cat
    decor('sphinx', 24, 7, 'ds_sphinx'), decor('col_n1', 13, 8, 'ds_column'), decor('col_n2', 16, 3, 'ds_column_broken'), decor('obelisk3', 29, 4, 'ds_obelisk'),
    decor('col_n3', 4, 8, 'ds_column'), decor('col_n4', 13, 3, 'ds_column'), decor('col_n5', 23, 3, 'ds_column'), decor('carving3', 7, 3, 'ds_carving'),
    decor('cactus2', 28, 9, 'ds_cactus'),
    sign('sign_ruins', 21, 25), sign('sign_dunes', 11, 4),
  ], [
    { x: 19, y: 28, to: 'sandstone', tx: 17, ty: 1, dir: 'down' }, { x: 20, y: 28, to: 'sandstone', tx: 18, ty: 1, dir: 'down' },
    ...kit.edge(0, [5, 6], 'saltflats', 36, [11, 12], 'left'),
    { x: 9, y: 0, to: 'dunes', tx: 14, ty: 18, dir: 'up' }, { x: 10, y: 0, to: 'dunes', tx: 15, ty: 18, dir: 'up' },
  ]);

  const dunes = map('dunes', 'ds_sand', DUNES_ROWS, { x: 14, y: 18, dir: 'up' }, [
    decor('hut1', 7, 4, 'ds_hut'), decor('hut2', 15, 3, 'ds_hut'), decor('hut3', 4, 9, 'ds_hut'), decor('hut4', 19, 9, 'ds_hut'),
    decor('ropes', 10, 6, 'ds_ropes'), npc('sandcat', 12, 7, 'sandcat'),
    decor('well2', 17, 13, 'ds_well'), decor('palm1', 6, 13, 'ds_palm'), decor('palm2', 20, 5, 'ds_palm'),
    decor('camel', 8, 15, 'ds_camel_rest'), decor('jars', 18, 7, 'ds_jars'), decor('agave', 4, 7, 'ds_agave'),
  ], [
    { x: 14, y: 19, to: 'ruins', tx: 9, ty: 1, dir: 'down' }, { x: 15, y: 19, to: 'ruins', tx: 10, ty: 1, dir: 'down' },
  ]);

  const saltflats = map('saltflats', 'ds_salt', SALTFLATS_ROWS, { x: 36, y: 11, dir: 'left' }, [
    decor('salthouse1', 20, 3, 'ds_salthouse'), decor('salthouse2', 27, 4, 'ds_salthouse'), decor('salthouse3', 31, 15, 'ds_salthouse'),
    decor('well', 23, 8, 'ds_well'), decor('saltstall', 27, 14, 'ds_saltstall'), npc('porcupine', 28, 13, 'porcupine'),
    decor('pile1', 16, 4, 'ds_saltpile'), decor('pile2', 18, 5, 'ds_saltpile'), decor('pile3', 22, 17, 'ds_saltpile'), decor('slabs1', 25, 17, 'ds_saltslabs'),
    decor('slabs2', 33, 8, 'ds_saltslabs'), decor('camel', 19, 15, 'ds_camel_rest'),
    { k: 'block', id: 'heatbar', x: 10, y: 11, art: 'ds_heatbar', until: 'ds_flats_open' },
    npc('hyena', 12, 10, 'hyena'),
    sign('sign_saltflats', 34, 10), sign('sign_heat', 13, 13),
  ], [
    ...kit.edge(37, [11, 12], 'ruins', 1, [5, 6], 'right'),
    ...kit.edge(0, [11, 12], 'oasis', 38, [14, 15], 'left'),
  ]);

  const oasis = map('oasis', 'ds_oasis', OASIS_ROWS, { x: 38, y: 14, dir: 'left' }, [
    decor('station', 15, 5, 'ds_station'),
    decor('house_a', 3, 5, 'ds_house2'), decor('house_b', 8, 4, 'ds_tower'), decor('house_c', 24, 5, 'ds_domehouse'), decor('house_d', 31, 5, 'ds_house'),
    decor('house_e', 3, 21, 'ds_inn'), decor('house_f', 30, 21, 'ds_house3'), decor('house_g', 23, 21, 'ds_house'),
    decor('stall_souvenir', 12, 21, 'ds_stall_souvenir'), npc('hoopoe', 13, 20, 'hoopoe'),
    decor('palm1', 4, 11, 'ds_palm'), decor('palm2', 34, 11, 'ds_palm'), decor('palm3', 5, 17, 'ds_palm'), decor('palm4', 33, 17, 'ds_palm'),
    decor('palm5', 16, 19, 'ds_palm'), decor('palm6', 25, 9, 'ds_palm'),
    decor('bench1', 12, 18, 'bench'), decor('bench2', 26, 18, 'bench'), decor('camel', 35, 8, 'ds_camel_rest'), decor('jars', 9, 21, 'ds_jars'),
    sign('sign_oasis', 37, 13),
  ], [
    ...kit.edge(39, [14, 15], 'saltflats', 1, [11, 12], 'right'),
    ...kit.edge(0, [14, 15], 'border_desert', 30, [9, 10], 'left'),
    { x: 18, y: 6, to: 'station_oasis', tx: 11, ty: 13, dir: 'up', door: true },
    { x: 19, y: 6, to: 'station_oasis', tx: 12, ty: 13, dir: 'up', door: true },
  ]);

  const border = map('border_desert', 'ds_sand', BORDER_ROWS, { x: 30, y: 9, dir: 'left' }, [
    decor('office', 11, 5, 'ds_office'), { k: 'flag', id: 'flag_desert', x: 16, y: 6, country: 'desert' },
    { k: 'gate', id: 'gate_desert', x: 6, y: 9, country: 'desert' },
    sign('sign_border', 19, 8), decor('palm', 21, 4, 'ds_palm'), decor('cactus', 9, 12, 'ds_cactus'), decor('camel', 24, 12, 'ds_camel_rest'),
  ], [
    ...kit.edge(31, [9, 10], 'oasis', 1, [14, 15], 'right'),
    ...kit.edge(0, [9, 10], '@next', 0, [0, 0], 'left'),
    { x: 12, y: 6, to: 'office_desert', tx: 5, ty: 7, dir: 'up', door: true },
  ]);


  // ---------------------------------------------------------------- homes and their residents

  /** A room W×H tiles: walls round it, the door mat at (mx, H-1), carpets as [code, x0, y0, x1, y1]. */
  const rows = (W: number, H: number, mx: number, rugs: [string, number, number, number, number][] = []): string[] =>
    Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_, x) => {
      if (y === H - 1) return x === mx ? ':' : '#';
      if (y < 2 || x === 0 || x === W - 1) return '#';
      const r = rugs.find(([, x0, y0, x1, y1]) => x >= x0 && x <= x1 && y >= y0 && y <= y1);
      return r ? r[0] : '.';
    }).join(''));
  /** A home: its room, the resident, the furniture; the door at (dx, dy) on the street map `back`. */
  const homes: MapDef[] = [];
  const doors: Record<string, MapDef['warps']> = {};
  const home = (id: string, theme: string, back: string, dx: number, dy: number, r: string[], objs: Obj[]) => {
    const H = r.length, mx = r[H - 1].indexOf(':');
    homes.push({ id, at: back, country: 'desert', theme, spawn: { x: mx, y: H - 2, dir: 'up' }, rows: r, objs, warps: [{ x: mx, y: H - 1, to: back, tx: dx, ty: dy + 1, dir: 'down' }] });
    (doors[back] ??= []).push({ x: dx, y: dy, to: id, tx: mx, ty: H - 2, dir: 'up', door: true });
  };
  const RES: [string, string][] = [];
  const res = (id: string, x: number, y: number, kind: string): Obj => { RES.push([id, kind]); return npc(id, x, y, kind); };

  // Caravan Camp: the storyteller's tent (the stars) and the weaver's tent (camels)
  home('ds_tent1', 'ds_tentin', 'caravan', 4, 5, rows(12, 8, 5, [['r', 2, 3, 7, 5]]), [
    decor('t1_map', 2, 1, 'ds_starmap'), decor('t1_rug', 7, 1, 'ds_wallrug'), decor('t1_cush', 2, 2, 'ds_cushions'), decor('t1_tea', 5, 4, 'ds_teaset'),
    decor('t1_lamp', 10, 2, 'ds_lantern'), decor('t1_astro', 9, 2, 'ds_astrolabe'), decor('t1_chest', 10, 5, 'ds_chest'), res('res_ds_ilse', 8, 4, 'owl'),
    decor('t1_jars', 1, 6, 'ds_jars'), decor('t1_water', 1, 5, 'ds_waterjar'), decor('t1_cush2', 8, 6, 'ds_cushions'), decor('t1_sacks', 10, 6, 'ds_sacks'),
  ]);
  home('ds_tent2', 'ds_tentin', 'caravan', 10, 4, rows(11, 7, 5, [['w', 1, 4, 4, 5]]), [
    decor('t2_loom', 2, 2, 'ds_loom'), decor('t2_saddles', 7, 2, 'ds_saddles'), decor('t2_sacks', 9, 4, 'ds_sacks'), decor('t2_jars', 9, 5, 'ds_jars'),
    decor('t2_cush', 1, 5, 'ds_cushions'), decor('t2_lamp', 6, 2, 'ds_lantern'), res('res_ds_marta', 4, 3, 'meerkat'),
    decor('t2_chest', 1, 4, 'ds_chest'), decor('t2_lamp2', 9, 2, 'ds_lantern'),
  ]);
  // Sandstone Town
  home('ds_home_a', 'ds_home', 'sandstone', 4, 7, rows(10, 8, 4, [['w', 5, 4, 8, 6]]), [
    decor('ha_oven', 1, 2, 'ds_oven'), decor('ha_oven2', 2, 2, 'ds_oven'), decor('ha_shelf', 5, 2, 'ds_shelf'), decor('ha_water', 8, 2, 'ds_waterjar'),
    decor('ha_sacks', 1, 5, 'ds_sacks'), decor('ha_sacks2', 1, 6, 'ds_sacks'), decor('ha_jars', 8, 6, 'ds_jars'), res('res_ds_gregor', 3, 3, 'jerboa'),
    decor('ha_jars2', 8, 5, 'ds_jars'), decor('ha_tea', 6, 5, 'ds_teaset'), decor('ha_sacks3', 2, 6, 'ds_sacks'),
  ]);
  home('ds_home_c', 'ds_home', 'sandstone', 28, 7, rows(11, 8, 5, [['y', 2, 3, 8, 5]]), [
    decor('hc_bed', 1, 2, 'ds_bed'), decor('hc_chest', 3, 2, 'ds_chest'), decor('hc_palm', 9, 2, 'ds_potpalm'), decor('hc_lamp', 8, 2, 'ds_lantern'),
    decor('hc_tea', 5, 4, 'ds_teaset'), decor('hc_rug', 5, 1, 'ds_wallrug'), res('res_ds_jutta', 7, 4, 'caracal'),
    decor('hc_jars', 1, 6, 'ds_jars'), decor('hc_cush', 7, 6, 'ds_cushions'), decor('hc_palm2', 9, 6, 'ds_potpalm'), decor('hc_water', 1, 4, 'ds_waterjar'),
  ]);
  home('ds_home_d', 'ds_home', 'sandstone', 5, 20, rows(12, 9, 6, [['r', 3, 4, 8, 6]]), [
    decor('hd_desk', 2, 2, 'ds_desk'), decor('hd_shelf', 8, 2, 'ds_shelf'), decor('hd_cush', 4, 3, 'ds_cushions'), decor('hd_jar', 10, 6, 'ds_waterjar'),
    decor('hd_lamp', 1, 6, 'ds_lantern'), decor('hd_palm', 10, 3, 'ds_potpalm'), res('res_ds_volker', 6, 5, 'hyena'),
    decor('hd_chest', 1, 2, 'ds_chest'), decor('hd_astro', 7, 2, 'ds_astrolabe'), decor('hd_jars', 10, 7, 'ds_jars'), decor('hd_tea', 5, 5, 'ds_teaset'), decor('hd_cush2', 1, 7, 'ds_cushions'),
  ]);
  home('ds_home_e', 'ds_home', 'sandstone', 26, 20, rows(14, 9, 7, [['r', 3, 3, 10, 6]]), [
    decor('he_rug', 2, 1, 'ds_wallrug'), decor('he_rug2', 10, 1, 'ds_wallrug'), decor('he_cush', 3, 2, 'ds_cushions'), decor('he_cush2', 8, 2, 'ds_cushions'),
    decor('he_tea', 6, 4, 'ds_teaset'), decor('he_lamp1', 1, 2, 'ds_lantern'), decor('he_lamp2', 12, 2, 'ds_lantern'), decor('he_palm', 1, 6, 'ds_potpalm'),
    decor('he_palm2', 12, 6, 'ds_potpalm'), decor('he_chest', 11, 4, 'ds_chest'), res('res_ds_edith', 8, 4, 'hoopoe'),
    decor('he_jars', 1, 7, 'ds_jars'), decor('he_water', 12, 7, 'ds_waterjar'), decor('he_shelf', 5, 2, 'ds_shelf'), decor('he_bed', 10, 7, 'ds_bed'),
  ]);
  home('ds_home_f', 'ds_home', 'sandstone', 30, 13, rows(10, 7, 4, [['w', 2, 3, 6, 4]]), [
    decor('hf_sacks', 1, 2, 'ds_sacks'), decor('hf_sacks2', 2, 2, 'ds_sacks'), decor('hf_jars', 7, 2, 'ds_jars'), decor('hf_jar', 8, 2, 'ds_waterjar'),
    decor('hf_palm', 8, 4, 'ds_potpalm'), decor('hf_chest', 1, 5, 'ds_chest'), res('res_ds_konrad', 5, 3, 'fox'),
    decor('hf_lamp', 3, 2, 'ds_lantern'), decor('hf_tea', 4, 4, 'ds_teaset'), decor('hf_sacks3', 8, 5, 'ds_sacks'),
  ]);
  // Salt Flats
  home('ds_salt1', 'ds_saltin', 'saltflats', 21, 4, rows(11, 8, 5, [['w', 2, 4, 8, 5]]), [
    decor('s1_slabs', 1, 2, 'ds_saltslabs'), decor('s1_slabs2', 2, 2, 'ds_saltslabs'), decor('s1_pile', 9, 2, 'ds_saltpile'), decor('s1_pile2', 9, 3, 'ds_saltpile'),
    decor('s1_sacks', 1, 6, 'ds_sacks'), decor('s1_water', 9, 6, 'ds_waterjar'), decor('s1_shelf', 5, 2, 'ds_shelf'), res('res_ds_norbert', 4, 4, 'badger'),
    decor('s1_slabs3', 1, 3, 'ds_saltslabs'), decor('s1_lamp', 8, 2, 'ds_lantern'), decor('s1_sacks2', 2, 6, 'ds_sacks'), decor('s1_jars', 8, 6, 'ds_jars'),
  ]);
  home('ds_salt3', 'ds_saltin', 'saltflats', 32, 16, rows(10, 7, 4, [['y', 2, 3, 7, 4]]), [
    decor('s3_bed', 1, 2, 'ds_bed'), decor('s3_lamp', 8, 2, 'ds_lantern'), decor('s3_chest', 6, 2, 'ds_chest'), decor('s3_cush', 6, 5, 'ds_cushions'),
    res('res_ds_vera', 4, 4, 'sandcat'),
    decor('s3_jars', 1, 5, 'ds_jars'), decor('s3_water', 8, 5, 'ds_waterjar'), decor('s3_tea', 4, 3, 'ds_teaset'),
  ]);
  // Oasis City
  home('ds_oasis_a', 'ds_home', 'oasis', 5, 6, rows(11, 8, 5, [['y', 2, 3, 8, 5]]), [
    decor('oa_cush', 2, 2, 'ds_cushions'), decor('oa_palm', 1, 5, 'ds_potpalm'), decor('oa_palm2', 9, 5, 'ds_potpalm'), decor('oa_tea', 4, 4, 'ds_teaset'),
    decor('oa_bed', 7, 2, 'ds_bed'), decor('oa_rug', 4, 1, 'ds_wallrug'), res('res_ds_brigitte', 6, 4, 'fennec'),
    decor('oa_lamp', 9, 2, 'ds_lantern'), decor('oa_jars', 1, 6, 'ds_jars'), decor('oa_chest', 9, 6, 'ds_chest'),
  ]);
  home('ds_oasis_c', 'ds_home', 'oasis', 26, 6, rows(13, 8, 6, [['r', 2, 3, 10, 5]]), [
    decor('oc_desk', 2, 2, 'ds_desk'), decor('oc_astro', 5, 2, 'ds_astrolabe'), decor('oc_shelf', 9, 2, 'ds_shelf'), decor('oc_map', 6, 1, 'ds_starmap'),
    decor('oc_lamp', 11, 4, 'ds_lantern'), decor('oc_cush', 3, 5, 'ds_cushions'), res('res_ds_ludwig', 7, 4, 'oryx'),
    decor('oc_chest', 1, 5, 'ds_chest'), decor('oc_jars', 11, 6, 'ds_jars'), decor('oc_palm', 1, 6, 'ds_potpalm'), decor('oc_tea', 8, 5, 'ds_teaset'),
  ]);
  home('ds_oasis_d', 'ds_home', 'oasis', 32, 6, rows(10, 8, 4, [['w', 2, 4, 6, 5]]), [
    decor('od_water', 1, 2, 'ds_waterjar'), decor('od_water2', 2, 2, 'ds_waterjar'), decor('od_jars', 8, 2, 'ds_jars'), decor('od_palm', 8, 5, 'ds_potpalm'),
    decor('od_chest', 1, 6, 'ds_chest'), decor('od_lamp', 5, 2, 'ds_lantern'), res('res_ds_karin', 6, 3, 'rabbit'),
    decor('od_water3', 1, 3, 'ds_waterjar'), decor('od_cush', 6, 6, 'ds_cushions'), decor('od_jars2', 8, 3, 'ds_jars'),
  ]);
  home('ds_oasis_f', 'ds_home', 'oasis', 31, 22, rows(9, 7, 4, [['r', 2, 3, 6, 4]]), [
    decor('of_saddles', 1, 2, 'ds_saddles'), decor('of_lamp', 7, 2, 'ds_lantern'), decor('of_sacks', 7, 4, 'ds_sacks'), decor('of_tea', 3, 4, 'ds_teaset'),
    res('res_ds_rolf', 5, 3, 'camel'),
    decor('of_chest', 1, 5, 'ds_chest'), decor('of_jars', 7, 5, 'ds_jars'), decor('of_palm', 6, 2, 'ds_potpalm'),
  ]);
  home('ds_oasis_g', 'ds_home', 'oasis', 24, 22, rows(12, 8, 5, [['y', 3, 3, 8, 5]]), [
    decor('og_palm', 1, 2, 'ds_potpalm'), decor('og_palm2', 2, 2, 'ds_potpalm'), decor('og_palm3', 10, 2, 'ds_potpalm'), decor('og_bed', 7, 2, 'ds_bed'),
    decor('og_jars', 1, 6, 'ds_jars'), decor('og_chest', 10, 6, 'ds_chest'), decor('og_lamp', 4, 2, 'ds_lantern'), res('res_ds_renate', 5, 4, 'uromastyx'),
    decor('og_water', 1, 5, 'ds_waterjar'), decor('og_tea', 6, 4, 'ds_teaset'), decor('og_palm4', 10, 5, 'ds_potpalm'), decor('og_lamp2', 9, 2, 'ds_lantern'),
  ]);
  for (const m of [caravan, sandstone, saltflats, oasis]) m.warps.push(...(doors[m.id] ?? []));

  const maps: MapDef[] = [
    ...homes,
    caravan, room(kit.interior('ds_exchange', 'desert', 'fennec', 'caravan', 17, 6, 'caravan'), 'ds_tentin'),
    sandstone, room(kit.interior('ds_goggleshop', 'desert', 'uromastyx', 'sandstone', 23, 8, 'sandstone')),
    ruins, dunes, saltflats, oasis,
    ...kit.station('oasis', 'desert', 'oasis', 18, 7, [['pass_o1', 'camel', 9, 6, 'hall'], ['pass_o2', 'fennec', 22, 15, 'gleis']]),
    border, room(kit.office('office_desert', 'desert', 'saker', 'border_desert', 12, 7, 'border_desert')),
  ];

  // ---------------------------------------------------------------- scripts

  const D = (s: Save) => kit.money(s, 'dinar');
  const say = (k: string, who?: string): Step => ({ say: k, who });
  const nomoney = (who: string): Step => say('ds.nomoney', who);
  /** Pay `n` dinars and get on with `then`, or hear that the wallet is too light. */
  const pay = (s: Save, n: number, who: string, then: Step[]): Step[] => (D(s) >= n ? [{ money: 'dinar', n: -n }, ...then] : [nomoney(who)]);

  const lines: string[] = [];
  const L = (...ks: string[]) => { lines.push(...ks); };

  // the sleeping camel across the dune pass
  L('ds.camel.hello1', 'ds.camel.hello2', 'ds.camel.hello3', 'ds.camel.again', 'ds.camel.dates1', 'ds.camel.dates2', 'ds.camel.look');
  const camel = (s: Save): Step[] => {
    const w = 'camel';
    if (has(s, 'ds_dates')) return [{ take: 'ds_dates' }, say('ds.camel.dates1', w), { fx: 'shake' }, { set: 'ds_camel_up' }, say('ds.camel.dates2', w), { xp: 25, why: 'for waking the camel' }];
    if (kit.has(s, 'ds_met_camel')) return [say('ds.camel.again', w)];
    return [say('ds.camel.look'), say('ds.camel.hello1', w), say('ds.camel.hello2', w), say('ds.camel.hello3', w), { set: 'ds_met_camel' }];
  };

  // the date seller, who also asks about the caravan timetable
  L('ds.meerkat.hello', 'ds.meerkat.ask', 'ds.meerkat.thanks', 'ds.meerkat.bye', 'ds.meerkat.exchange', 'ds.meerkat.havedates',
    'ds.meerkat.tt1', 'ds.meerkat.ttq', 'ds.meerkat.tta1', 'ds.meerkat.tta2', 'ds.meerkat.tta3', 'ds.meerkat.ttright', 'ds.meerkat.ttwrong', 'ds.meerkat.done',
    'ds.tt.1', 'ds.tt.2', 'ds.tt.3');
  const meerkat = (s: Save): Step[] => {
    const w = 'meerkat';
    if (kit.has(s, 'ds_camel_up')) {
      if (kit.has(s, 'ds_tt_done')) return [say('ds.meerkat.done', w)];
      return [say('ds.meerkat.tt1', w), {
        ask: 'ds.meerkat.ttq', who: w, opts: [
          { o: 'ds.meerkat.tta1', then: [say('ds.meerkat.ttwrong', w)] },
          { o: 'ds.meerkat.tta2', then: [say('ds.meerkat.ttright', w), { money: 'dinar', n: 3 }, { set: 'ds_tt_done' }, { xp: 10, why: 'for reading the caravan timetable' }] },
          { o: 'ds.meerkat.tta3', then: [say('ds.meerkat.ttwrong', w)] },
        ],
      }];
    }
    if (has(s, 'ds_dates')) return [say('ds.meerkat.havedates', w)];
    return [say('ds.meerkat.hello', w), {
      ask: 'ds.meerkat.ask', who: w, opts: [
        { o: 'opt.yes', then: D(s) >= 3 ? [{ money: 'dinar', n: -3 }, { give: 'ds_dates' }, say('ds.meerkat.thanks', w)] : [say('ds.meerkat.exchange', w)] },
        { o: 'opt.no', then: [say('ds.meerkat.bye', w)] },
      ],
    }];
  };

  // the exchange tent: credits into dinars, 1 : 3; with no credits, a counting job
  L('ds.fennec.hello', 'ds.fennec.rate', 'ds.fennec.ask', 'ds.fennec.k5', 'ds.fennec.k10', 'ds.fennec.k20', 'ds.fennec.quiz',
    'ds.fennec.d10', 'ds.fennec.d15', 'ds.fennec.d20', 'ds.fennec.d30', 'ds.fennec.d40', 'ds.fennec.d60', 'ds.fennec.d80',
    'ds.fennec.right', 'ds.fennec.wrong', 'ds.fennec.done', 'ds.fennec.bye', 'ds.fennec.nocredit', 'ds.fennec.job', 'ds.fennec.count',
    'ds.fennec.c8', 'ds.fennec.c15', 'ds.fennec.c35', 'ds.fennec.countright', 'ds.fennec.countwrong');
  const fennec = (s: Save): Step[] => {
    const w = 'fennec';
    const k = kit.money(s, 'kredit');
    const amounts = [5, 10, 20].filter((n) => n <= k);
    if (!amounts.length) {
      return [say('ds.fennec.hello', w), say('ds.fennec.nocredit', w), {
        ask: 'ds.fennec.job', who: w, opts: [
          {
            o: 'opt.yes', then: [{
              ask: 'ds.fennec.count', who: w, opts: [8, 15, 35].map((n): Opt => ({
                o: `ds.fennec.c${n}`, then: n === 15 ? [say('ds.fennec.countright', w), { money: 'dinar', n: 4 }, { xp: 5, why: 'for counting coins' }] : [say('ds.fennec.countwrong', w)],
              })),
            }],
          },
          { o: 'opt.no', then: [say('ds.fennec.bye', w)] },
        ],
      }];
    }
    const quiz = (n: number): Step => ({
      ask: 'ds.fennec.quiz', who: w, opts: [n * 2, n * 3, n * 4].map((d): Opt => ({
        o: `ds.fennec.d${d}`,
        then: [say(d === n * 3 ? 'ds.fennec.right' : 'ds.fennec.wrong', w), { money: 'kredit', n: -n }, { money: 'dinar', n: n * 3 }, say('ds.fennec.done', w),
          ...(d === n * 3 ? [{ xp: 10, why: 'for changing money' } as Step] : [])],
      })),
    });
    return [say('ds.fennec.hello', w), say('ds.fennec.rate', w), {
      ask: 'ds.fennec.ask', who: w, opts: [...amounts.map((n): Opt => ({ o: `ds.fennec.k${n}`, then: [quiz(n)] })), { o: 'exch.nothing', then: [say('ds.fennec.bye', w)] }],
    }];
  };

  // the gate guard and the sandstorm
  L('ds.oryx.hello1', 'ds.oryx.hello2', 'ds.oryx.hello3', 'ds.oryx.hello4', 'ds.oryx.reminder', 'ds.oryx.noscarf', 'ds.oryx.nogoggles', 'ds.oryx.ok1', 'ds.oryx.ok2', 'ds.oryx.done', 'ds.gate.look');
  const oryx = (s: Save): Step[] => {
    const w = 'oryx';
    if (kit.has(s, 'ds_gate_open')) return [say('ds.oryx.done', w)];
    if (has(s, 'ds_scarf') && has(s, 'ds_goggles')) return [say('ds.oryx.ok1', w), { fx: 'shake' }, { set: 'ds_gate_open' }, say('ds.oryx.ok2', w), { xp: 25, why: 'for getting ready for the sandstorm' }];
    if (kit.has(s, 'ds_asked_oryx')) return [say('ds.oryx.reminder', w), ...(has(s, 'ds_scarf') ? [say('ds.oryx.nogoggles', w)] : has(s, 'ds_goggles') ? [say('ds.oryx.noscarf', w)] : [])];
    return [say('ds.oryx.hello1', w), say('ds.oryx.hello2', w), say('ds.oryx.hello3', w), say('ds.oryx.hello4', w), { set: 'ds_asked_oryx' }];
  };

  // bargaining for a scarf at the bazaar
  L('ds.jerboa.hello', 'ds.jerboa.price', 'ds.jerboa.ok12', 'ds.jerboa.offer6', 'ds.jerboa.no', 'ds.jerboa.counter', 'ds.jerboa.ok8',
    'ds.jerboa.thanks12', 'ds.jerboa.thanks8', 'ds.jerboa.bye', 'ds.jerboa.done');
  const jerboa = (s: Save): Step[] => {
    const w = 'jerboa';
    if (has(s, 'ds_scarf') || kit.has(s, 'ds_gate_open')) return [say('ds.jerboa.done', w)];
    const bye: Opt = { o: 'ds.jerboa.no', then: [say('ds.jerboa.bye', w)] };
    return [say('ds.jerboa.hello', w), {
      ask: 'ds.jerboa.price', who: w, opts: [
        { o: 'ds.jerboa.ok12', then: pay(s, 12, w, [{ give: 'ds_scarf' }, say('ds.jerboa.thanks12', w), { xp: 5, why: 'for buying a scarf' }]) },
        {
          o: 'ds.jerboa.offer6', then: [{
            ask: 'ds.jerboa.counter', who: w, opts: [
              { o: 'ds.jerboa.ok8', then: pay(s, 8, w, [{ give: 'ds_scarf' }, say('ds.jerboa.thanks8', w), { xp: 15, why: 'for bargaining at the bazaar' }]) },
              bye,
            ],
          }],
        },
        bye,
      ],
    }];
  };

  // the glasses shop
  L('ds.uro.hello', 'ds.uro.ask', 'ds.uro.o1', 'ds.uro.o2', 'ds.uro.o3', 'ds.uro.sun', 'ds.uro.read', 'ds.uro.price', 'ds.uro.thanks', 'ds.uro.done');
  const uromastyx = (s: Save): Step[] => {
    const w = 'uromastyx';
    if (has(s, 'ds_goggles') || kit.has(s, 'ds_gate_open')) return [say('ds.uro.done', w)];
    return [say('ds.uro.hello', w), {
      ask: 'ds.uro.ask', who: w, opts: [
        { o: 'ds.uro.o1', then: [say('ds.uro.sun', w)] },
        { o: 'ds.uro.o2', then: [say('ds.uro.price', w), ...pay(s, 6, w, [{ give: 'ds_goggles' }, say('ds.uro.thanks', w), { xp: 10, why: 'for buying goggles' }])] },
        { o: 'ds.uro.o3', then: [say('ds.uro.read', w)] },
      ],
    }];
  };

  // the archaeologist, the fallen column and the carvings
  L('ds.caracal.hello1', 'ds.caracal.hello2', 'ds.caracal.hello3', 'ds.caracal.hello4', 'ds.caracal.reminder', 'ds.caracal.g1', 'ds.caracal.gq',
    'ds.caracal.ga1', 'ds.caracal.ga2', 'ds.caracal.ga3', 'ds.caracal.gright', 'ds.caracal.gwrong', 'ds.caracal.done', 'ds.column.look', 'ds.carving.look');
  const caracal = (s: Save): Step[] => {
    const w = 'caracal';
    if (kit.has(s, 'ds_column_moved')) {
      if (kit.has(s, 'ds_glyphs_done')) return [say('ds.caracal.done', w)];
      return [say('ds.caracal.g1', w), {
        ask: 'ds.caracal.gq', who: w, opts: [
          { o: 'ds.caracal.ga1', then: [say('ds.caracal.gright', w), { money: 'dinar', n: 5 }, { set: 'ds_glyphs_done' }, { xp: 15, why: 'for reading the old signs' }] },
          { o: 'ds.caracal.ga2', then: [say('ds.caracal.gwrong', w)] },
          { o: 'ds.caracal.ga3', then: [say('ds.caracal.gwrong', w)] },
        ],
      }];
    }
    if (kit.has(s, 'ds_asked_caracal')) return [say('ds.caracal.reminder', w)];
    return [say('ds.caracal.hello1', w), say('ds.caracal.hello2', w), say('ds.caracal.hello3', w), say('ds.caracal.hello4', w), { set: 'ds_asked_caracal' }];
  };

  // hiring a camel
  L('ds.dora.idle', 'ds.dora.hello', 'ds.dora.ask', 'ds.dora.hour', 'ds.dora.day', 'ds.dora.week', 'ds.dora.price1', 'ds.dora.dayprice', 'ds.dora.weekno',
    'ds.dora.go1', 'ds.dora.go2', 'ds.dora.done');
  const dromedary = (s: Save): Step[] => {
    const w = 'dromedary';
    if (kit.has(s, 'ds_column_moved')) return [say('ds.dora.done', w)];
    if (!kit.has(s, 'ds_asked_caracal')) return [say('ds.dora.idle', w)];
    return [say('ds.dora.hello', w), {
      ask: 'ds.dora.ask', who: w, opts: [
        { o: 'ds.dora.hour', then: [say('ds.dora.price1', w), ...pay(s, 5, w, [say('ds.dora.go1', w), { fx: 'shake' }, { set: 'ds_column_moved' }, say('ds.dora.go2', w), { xp: 25, why: 'for clearing the ruins road' }])] },
        { o: 'ds.dora.day', then: [say('ds.dora.dayprice', w)] },
        { o: 'ds.dora.week', then: [say('ds.dora.weekno', w)] },
      ],
    }];
  };

  // the rope maker
  L('ds.sandcat.idle1', 'ds.sandcat.idle2', 'ds.sandcat.hello', 'ds.sandcat.ask', 'ds.sandcat.m5', 'ds.sandcat.m10', 'ds.sandcat.m100',
    'ds.sandcat.short', 'ds.sandcat.long', 'ds.sandcat.price', 'ds.sandcat.thanks', 'ds.sandcat.done', 'ds.ropes.look');
  const sandcat = (s: Save): Step[] => {
    const w = 'sandcat';
    if (has(s, 'ds_rope') || kit.has(s, 'ds_well_fixed')) return [say('ds.sandcat.done', w)];
    if (!kit.has(s, 'ds_asked_porcupine')) return [say('ds.sandcat.idle1', w), say('ds.sandcat.idle2', w)];
    return [say('ds.sandcat.hello', w), {
      ask: 'ds.sandcat.ask', who: w, opts: [
        { o: 'ds.sandcat.m5', then: [say('ds.sandcat.short', w)] },
        { o: 'ds.sandcat.m10', then: [say('ds.sandcat.price', w), ...pay(s, 4, w, [{ give: 'ds_rope' }, say('ds.sandcat.thanks', w), { xp: 10, why: 'for buying a rope' }])] },
        { o: 'ds.sandcat.m100', then: [say('ds.sandcat.long', w)] },
      ],
    }];
  };

  // the Salt Flats: the broken well and the shop
  L('ds.porc.hello1', 'ds.porc.hello2', 'ds.porc.hello3', 'ds.porc.hello4', 'ds.porc.rope1', 'ds.porc.rope2', 'ds.porc.shop', 'ds.porc.water', 'ds.porc.cream',
    'ds.porc.nowater', 'ds.porc.waterok', 'ds.porc.creamok', 'ds.porc.have', 'ds.porc.bye', 'ds.well.dry', 'ds.well.ok');
  const porcupine = (s: Save): Step[] => {
    const w = 'porcupine';
    if (!kit.has(s, 'ds_asked_porcupine')) return [say('ds.porc.hello1', w), say('ds.porc.hello2', w), say('ds.porc.hello3', w), say('ds.porc.hello4', w), { set: 'ds_asked_porcupine' }];
    const fix: Step[] = has(s, 'ds_rope') && !kit.has(s, 'ds_well_fixed')
      ? [{ take: 'ds_rope' }, say('ds.porc.rope1', w), { fx: 'shake' }, { set: 'ds_well_fixed' }, say('ds.porc.rope2', w), { xp: 25, why: 'for mending the well' }] : [];
    const fixed = kit.has(s, 'ds_well_fixed') || fix.length > 0;
    return [...fix, {
      ask: 'ds.porc.shop', who: w, opts: [
        { o: 'ds.porc.water', then: !fixed ? [say('ds.porc.nowater', w)] : has(s, 'ds_water') ? [say('ds.porc.have', w)] : pay(s, 2, w, [{ give: 'ds_water' }, say('ds.porc.waterok', w)]) },
        { o: 'ds.porc.cream', then: has(s, 'ds_suncream') ? [say('ds.porc.have', w)] : pay(s, 4, w, [{ give: 'ds_suncream' }, say('ds.porc.creamok', w)]) },
        { o: 'exch.nothing', then: [say('ds.porc.bye', w)] },
      ],
    }];
  };

  // the ranger at the salt pan
  L('ds.hyena.hello1', 'ds.hyena.hello2', 'ds.hyena.hello3', 'ds.hyena.reminder', 'ds.hyena.ok1', 'ds.hyena.ok2', 'ds.hyena.done', 'ds.heatbar.look');
  const hyena = (s: Save): Step[] => {
    const w = 'hyena';
    if (kit.has(s, 'ds_flats_open')) return [say('ds.hyena.done', w)];
    if (has(s, 'ds_water') && has(s, 'ds_suncream')) return [say('ds.hyena.ok1', w), { fx: 'shake' }, { set: 'ds_flats_open' }, say('ds.hyena.ok2', w), { xp: 25, why: 'for getting ready for the heat' }];
    if (kit.has(s, 'ds_asked_hyena')) return [say('ds.hyena.reminder', w)];
    return [say('ds.hyena.hello1', w), say('ds.hyena.hello2', w), say('ds.hyena.hello3', w), { set: 'ds_asked_hyena' }];
  };

  // souvenirs in Oasis City
  L('ds.hoopoe.hello', 'ds.hoopoe.ask', 'ds.hoopoe.camel', 'ds.hoopoe.card', 'ds.hoopoe.thanks', 'ds.hoopoe.cardok', 'ds.hoopoe.have', 'ds.hoopoe.bye');
  const hoopoe = (s: Save): Step[] => {
    const w = 'hoopoe';
    return [say('ds.hoopoe.hello', w), {
      ask: 'ds.hoopoe.ask', who: w, opts: [
        { o: 'ds.hoopoe.camel', then: has(s, 'ds_souvenir') ? [say('ds.hoopoe.have', w)] : pay(s, 3, w, [{ give: 'ds_souvenir' }, say('ds.hoopoe.thanks', w), { xp: 5, why: 'for a souvenir' }]) },
        { o: 'ds.hoopoe.card', then: has(s, 'pc_desert') ? [say('ds.hoopoe.have', w)] : pay(s, 2, w, [{ give: 'pc_desert' }, say('ds.hoopoe.cardok', w)]) },
        { o: 'exch.nothing', then: [say('ds.hoopoe.bye', w)] },
      ],
    }];
  };

  // things to look at
  const LOOKS: Record<string, string> = {
    ds_tent: 'ds.tent.look', ds_tent_x: 'ds.tentx.look', ds_campfire: 'ds.campfire.look', ds_camel_rest: 'ds.camelrest.look', ds_camel: 'ds.camelrest.look',
    ds_house: 'ds.house.look', ds_house2: 'ds.house.look', ds_house3: 'ds.house.look', ds_domehouse: 'ds.dome.look', ds_tower: 'ds.tower.look', ds_inn: 'ds.inn.look',
    ds_shop: 'ds.shop.look', ds_office: 'ds.office.look', ds_station: 'ds.station.look', ds_stall_spice: 'ds.spice.look', ds_stall_carpet: 'ds.carpet.look',
    ds_palm: 'ds.palm.look', ds_cactus: 'ds.cactus.look', ds_column: 'ds.columnup.look', ds_column_broken: 'ds.columnup.look', ds_obelisk: 'ds.obelisk.look',
    ds_statue_head: 'ds.head.look', ds_sphinx: 'ds.sphinx.look', ds_carving: 'ds.carving.look', ds_hut: 'ds.hut.look', ds_ropes: 'ds.ropes.look',
    ds_salthouse: 'ds.salthouse.look', ds_saltpile: 'ds.saltpile.look', ds_saltslabs: 'ds.saltpile.look', ds_timetable: '', ds_gatehouse: 'ds.gatehouse.look', ds_gatepost: 'ds.gatehouse.look',
    ds_jars: 'ds.jars.look', ds_sacks: 'ds.sacks.look', ds_agave: 'ds.cactus.look',
  };
  L(...new Set(Object.values(LOOKS).filter(Boolean)));
  const SIGNS = ['caravan', 'sandstone', 'bazaar', 'ruins', 'dunes', 'saltflats', 'heat', 'oasis', 'border'];
  L(...SIGNS.map((k) => `ds.sign.${k}`), 'ds.nomoney', 'flag.desert', 'ds.well2.look');
  // kit.clerkLines can't be called while the world is still being built (it is defined after the modules run)
  L(...['hello1', 'hello2', 'ready', 'pass', 'gate', 'fail', 'later', 'done'].map((k) => `saker.${k}`));
  L('pass_o1.1', 'pass_o1.2', 'pass_o2.1', 'pass_o2.2');
  for (const [id] of RES) L(...kit.residentLines(id));
  const ITEM_KINDS = ['ds_dates', 'ds_scarf', 'ds_goggles', 'ds_rope', 'ds_water', 'ds_suncream', 'ds_souvenir', 'pc_desert'];
  L(...ITEM_KINDS.map((i) => `item.${i}`));

  const script = (o: Obj, s: Save): Step[] | undefined => {
    switch (o.id) {
      case 'camelblock': return camel(s);
      case 'meerkat': case 'stall_dates': return meerkat(s);
      case 'timetable': return [say('ds.tt.1'), say('ds.tt.2'), say('ds.tt.3')];
      case 'fennec': return fennec(s);
      case 'oryx': return oryx(s);
      case 'gatedoors': return [say('ds.gate.look')];
      case 'jerboa': case 'stall_cloth': return jerboa(s);
      case 'uromastyx': return uromastyx(s);
      case 'caracal': return caracal(s);
      case 'dromedary': return dromedary(s);
      case 'column_fallen': return [say('ds.column.look')];
      case 'sandcat': return sandcat(s);
      case 'porcupine': case 'saltstall': return porcupine(s);
      case 'well': return [say(kit.has(s, 'ds_well_fixed') ? 'ds.well.ok' : 'ds.well.dry')];
      case 'well2': return [say('ds.well2.look')];
      case 'hyena': return hyena(s);
      case 'heatbar': return [say('ds.heatbar.look')];
      case 'hoopoe': case 'stall_souvenir': return hoopoe(s);
      case 'saker': return kit.clerk('desert', 'saker', s);
    }
    if (o.k === 'sign' && o.id.startsWith('sign_')) {
      const k = o.id.slice(5);
      if (SIGNS.includes(k)) return [say(`ds.sign.${k}`)];
    }
    if (o.k === 'decor' && LOOKS[o.art]) return [say(LOOKS[o.art])];
    return undefined;
  };

  const ARTS = ['ds_tent', 'ds_tent_x', 'ds_campfire', 'ds_jars', 'ds_sacks', 'ds_camel_rest', 'ds_camel', 'ds_camel_lying', 'ds_palm', 'ds_cactus', 'ds_agave',
    'ds_timetable', 'ds_stall_dates', 'ds_stall_spice', 'ds_stall_carpet', 'ds_stall_cloth', 'ds_stall_souvenir', 'ds_saltstall',
    'ds_house', 'ds_house2', 'ds_house3', 'ds_domehouse', 'ds_tower', 'ds_shop', 'ds_inn', 'ds_office', 'ds_station',
    'ds_gatehouse', 'ds_gatepost', 'ds_gatedoors', 'ds_column', 'ds_column_broken', 'ds_column_fallen', 'ds_obelisk', 'ds_carving', 'ds_statue_head', 'ds_sphinx',
    'ds_hut', 'ds_ropes', 'ds_well', 'ds_salthouse', 'ds_saltpile', 'ds_saltslabs', 'ds_heatbar',
    'ds_cushions', 'ds_teaset', 'ds_lantern', 'ds_loom', 'ds_chest', 'ds_bed', 'ds_shelf', 'ds_starmap', 'ds_wallrug', 'ds_oven', 'ds_desk', 'ds_saddles', 'ds_potpalm',
    'ds_astrolabe', 'ds_waterjar'];
  const NPC_KINDS = ['camel', 'fennec', 'meerkat', 'jerboa', 'uromastyx', 'oryx', 'dromedary', 'caracal', 'sandcat', 'porcupine', 'hoopoe', 'hyena', 'saker'];
  const TILES = ['ds_dune', 'ds_cliff', 'ds_salt', 'ds_carpet', 'ds_bush', 'ds_pool', 'ds_wall', 'ds_reeds', 'ds_mat', 'ds_tentwall'];

  return {
    country: 'desert', flag: ['#e8b048', '#c05a2a'], ink: '#b8602a',
    lines: ['ds.', 'saker.', 'pass_o', 'flag.desert', 'item.ds_', 'item.pc_desert'],
    maps,
    entry: { map: 'caravan', cells: [[1, 14], [1, 15]], dir: 'right' },
    exit: { map: 'border_desert', cells: [[1, 9], [1, 10]], dir: 'right' },
    script,
    lineKeys: [...new Set(lines)],
    places: {
      desert: 'Desert',
      caravan: 'Caravan Camp', ds_exchange: 'Caravan Camp exchange tent', sandstone: 'Sandstone Town', ds_goggleshop: 'Sandstone Town glasses shop',
      ruins: 'Old Ruins', dunes: 'Dune Village', saltflats: 'Salt Flats', oasis: 'Oasis City',
      station_oasis: 'Oasis City station', under_oasis: 'Underpass', gleis_oasis: 'Platforms',
      border_desert: 'Desert Border', office_desert: 'Desert border office',
      ds_tent1: "Storyteller's tent", ds_tent2: "Weaver's tent", ds_home_a: 'Sandstone Town bakery', ds_home_c: 'White clay house', ds_home_d: 'Rose-coloured house',
      ds_home_e: 'Dome house', ds_home_f: "Date farmer's house", ds_salt1: "Salt maker's house", ds_salt3: 'Salt house', ds_oasis_a: 'House by the palms',
      ds_oasis_c: 'White dome house', ds_oasis_d: 'House by the station', ds_oasis_f: 'Little white house', ds_oasis_g: 'House by the spring',
    },
    npcKinds: NPC_KINDS,
    things: [...ARTS, ...NPC_KINDS, ...TILES],
  };
};
