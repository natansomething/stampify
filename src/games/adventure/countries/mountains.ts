/**
 * Rockland (mountains): the third country, between Frostland and the Rainforest. The cat comes in from the east,
 * walks west through Rock Village and the stone town of Stonebridge on its gorge, climbs the switchbacks of the High
 * Pass (a side road leads down to Miners' Town), rides the cable car down from the Pass Hut and leaves at the border
 * east into the Rainforest. The money is the guilder.
 *
 * Roadblocks, each a little tourist chore:
 * - Rock Village: a rockfall on the road west. Anton the ibex clears it once he has eaten mountain cheese: change
 *   crowns into guilders (1 : 3, with a sum to work out) and buy the cheese at the dairy.
 * - Stonebridge: the mountain rescue gate on the pass road: only with hiking boots, rented at the sports shop
 *   (per-day price × days).
 * - High Pass: an avalanche over the path. The rescue dog digs a way to the safe trail, once the cat has read the
 *   weather report and says which trail is safe; the other trails turn the cat back (fog, avalanche danger).
 * - Pass Hut: the cable car is closed while its driver waits for lunch: order it at the hut, then buy a ticket.
 * Side quests: the sports shop's lost goat kid (up on the pass), and in Miners' Town three lost crystals and a
 * repeatable counting job that pays a few guilders (so nobody gets stuck without money).
 */
import type { Arrival, CountryModule, Kit, MapDef, Obj, Opt, Save, Step } from '../world';
import type { NpcKind } from '../art';
import './mountains-art';

const ROWS: Record<string, string[]> = {
  felsdorf: [
    '########################################',
    '########################################',
    '########################################',
    '#########..........##########~~#########',
    '######....y..w........y......~~.....####',
    '######...r......r............~~....o####',
    '######....................w..~~..r..####',
    '######.o.....................~~.....####',
    '######.......................~~.y...####',
    '######..................:....~~...w.####',
    '######..................:..r.~~.....####',
    '#######....:......:.....:....~~.....####',
    '#######....:......:.....:....~~.........',
    '::::::::::::::::::::::::::::::::::::::::',
    '::::::::::::::::::::::::::::::::::::::::',
    '#######.....r...............o~~.........',
    '#######........y..========...~~."""..###',
    '####.o............=.....w=...~~."""y.###',
    '####...r..........=..r...=.~~~~~.....###',
    '####..............=.y....=~~~~~~~.r..###',
    '####..y.w.....r..w=....r.=.~~~~~....o###',
    '####..............========.......w...###',
    '########################################',
    '########################################',
    '########################################',
    '########################################',
  ],
  stonebridge: [
    '###################~~~####################',
    '###################~~~####################',
    '###################~~~####################',
    '###################~~~####################',
    '###...............#~~~#.o..............###',
    '###..o.........r..#~~~#..............r.###',
    '###...............#~~~#.......::......y###',
    '###...............#~~~#.......::.......###',
    '###...............#~~~#.......::.......###',
    '###...............#~~~#.......::.......###',
    '###...............#~~~#.......::..........',
    '####..............#~~~#.......::..........',
    '::::::::::::::::::::::::::::::::::::::::::',
    '::::::::::::::::::::::::::::::::::::::::::',
    '####.....::.......#~~~#.......::..........',
    '###......::.......#~~~#.......::..........',
    '###......::.......#~~~#.......::.......###',
    '###......::.......#~~~#.......::.......###',
    '###......::.......#~~~#.......::.......###',
    '###......::.......#~~~#.......::.......###',
    '###..y...::.......#~~~#................###',
    '###.r........o....#~~~#..ry.........o..###',
    '###...............#~~~#................###',
    '###################~~~####################',
    '###################~~~####################',
    '###################~~~####################',
  ],
  pass: [
    '#############################::#####',
    '#############################::#####',
    '############::###############::#####',
    '############::##############.::.####',
    '############::####..w..#####.::.####',
    '##########..::..##...o.#####.::.####',
    '####:::::::::::::::::::::::::::#####',
    '####:::::::::::::::::::::::::::#####',
    '##########..::..####################',
    '############::######################',
    '############::######################',
    '############::######################',
    '########.w..::......w...........####',
    '########....::..............o...####',
    '########....::::::::::::::::....####',
    '########..................::....####',
    '##########################::.#######',
    '##########################::.#######',
    '##########################::.#######',
    '####............w.........::......##',
    '####..y...o...........w...::......##',
    '####.:::::::::::::::::::::::......##',
    '####..............................##',
    '####.::......................#######',
    '####.::#############################',
    '###.o::........r................o.##',
    '###..::r...y..................r...##',
    '###..::.............................',
    '###:::::::::::::::::::::::::::::::::',
    '###:::::::::::::::::::::::::::::::::',
    '###.....::..........r....y..........',
    '########::##########################',
    '########::##########################',
    '########::##########################',
  ],
  miners: [
    '########::##########################',
    '########::##########################',
    '########::##########################',
    '########::##########################',
    '########::########.......###########',
    '###.....::...........|...........###',
    '###.....::...........|...o.....o.###',
    '###.....::...........|...........###',
    '###.....::...........|...........###',
    '###.....::...........|...........###',
    '###.....::.......................###',
    '###.....::.......................###',
    '###.....:::::::::::::::::::::::..###',
    '###.....:::::::::::::::::::::::..###',
    '###..............................###',
    '###.y............................###',
    '###........................~~~~..###',
    '###........................~~~~..###',
    '###.............y..........~~~~..###',
    '###........................~~~~..###',
    '###..o........o..................###',
    '###..............................###',
    '####################################',
    '####################################',
    '####################################',
    '####################################',
  ],
  passhut: [
    '####################################',
    '####################################',
    '####################################',
    '####################################',
    '###.................................',
    '###.o.......................w.......',
    '###.........w.......................',
    '###.................................',
    '###.................................',
    '###.....:::::::::..............#####',
    '###..............:::::::::::::::::::',
    '###..............:::::::::::::::::::',
    '###..............::............#####',
    '###..............::.............####',
    '###..~~~~~.......::.............####',
    '###..~~~~~.......::.............####',
    '###..~~~~~.......::......w......####',
    '###..............::.............####',
    '###....w.........::...o.........####',
    '###..............::...........o.####',
    '###..............::.............####',
    '#################::#################',
    '#################::#################',
    '#################::#################',
  ],
  border_mountains: [
    '####################################',
    '####################################',
    '####################################',
    '####################################',
    '###...................~~....=..o.###',
    '###...r............w..~~..y.=....###',
    '###...................~~....=.y..###',
    '###..........:........~~....=....###',
    '###..........:........~~....=.......',
    '###..........:........~~....=.......',
    '::::::::::::::::::::::::::::::::::::',
    '::::::::::::::::::::::::::::::::::::',
    '###...................~~....=.......',
    '###...................~~....=.......',
    '###......r............~~....=w...###',
    '###..w..........r.....~~...r=....###',
    '###.o......y..........~~....=....###',
    '###...................~~....=....###',
    '####################################',
    '####################################',
    '####################################',
    '####################################',
  ],
  mine_inside: [
    '######################',
    '######################',
    '##.o..........#.....##',
    '##............#..o..##',
    '##....####....#.....##',
    '##....####..........##',
    '##....####..........##',
    '##...........####...##',
    '##...........####...##',
    '##................o.##',
    '##..................##',
    '##########::##########',
    '######################',
  ],
};

/** Every line key below starts with one of these (the exam counts the words the cat has read in them). */
const LINES = ['mt.', 'res_mt_', 'goldeneagle.', 'item.mt_', 'pickup.mt_', 'flag.mountains'];

const NPC_KINDS: NpcKind[] = ['ibex', 'mtcow', 'chough', 'marmot', 'mtgoat', 'goatkid', 'chamois', 'stbernard', 'yak', 'brownbear', 'goldeneagle'];

const THINGS = [
  'cliff', 'meadow', 'stream', 'gravel',
  'chalet', 'farmhouse', 'stonehouse', 'townhouse', 'chapel', 'tower', 'hut', 'trough', 'haystack', 'woodpile', 'bunting',
  'cablestation', 'valleystation', 'pylon', 'snowpine',
  'stove', 'bed', 'cupboard', 'woodtable', 'cheesekettle', 'cheeserack', 'bookshelf', 'cuckoo', 'painting', 'alphorn', 'skirack', 'spinwheel', 'helmetrack', 'crystalshelf', 'window', 'shelf', 'chest', 'basket', 'rug', 'mine', 'cart', 'trailsign', 'forecast', 'rockfall', 'trailgate', 'avalanche', 'cablecar',
  ...NPC_KINDS,
];

export default (kit: Kit): CountryModule => {
  const has = (s: Save, f: string) => kit.has(s, f);
  const g = (s: Save) => kit.money(s, 'gulden');
  const items = (s: Save, i: string) => s.items.filter((x) => x === i).length;

  // ------------------------------------------------------------ maps

  const FELSDORF: MapDef = {
    id: 'felsdorf', at: 'felsdorf', country: 'mountains', theme: 'alpine', spawn: { x: 37, y: 13, dir: 'left' }, rows: ROWS.felsdorf,
    objs: [
      { k: 'decor', id: 'exchange_house', x: 9, y: 8, art: 'chalet' },
      { k: 'decor', id: 'dairy_house', x: 16, y: 8, art: 'farmhouse' },
      { k: 'decor', id: 'chapel', x: 23, y: 6, art: 'chapel' },
      { k: 'decor', id: 'house_fd1', x: 7, y: 16, art: 'farmhouse' },
      { k: 'decor', id: 'house_fd2', x: 33, y: 4, art: 'chalet' },
      { k: 'decor', id: 'trough', x: 14, y: 11, art: 'trough' },
      { k: 'decor', id: 'woodpile', x: 14, y: 9, art: 'woodpile' },
      { k: 'decor', id: 'haystack', x: 13, y: 18, art: 'haystack' },
      { k: 'decor', id: 'bunting', x: 25, y: 11, art: 'bunting' },
      { k: 'decor', id: 'bench_fd', x: 20, y: 11, art: 'bench' },
      ...([[6, 4], [7, 6], [27, 4], [8, 21], [36, 16], [5, 19], [31, 7], [27, 17]] as const).map(([x, y], i): Obj => ({ k: 'decor', id: `pine_fd${i}`, x, y, art: 'pine' })),
      { k: 'sign', id: 'sign_felsdorf', x: 34, y: 12 },
      { k: 'sign', id: 'sign_rockfall', x: 8, y: 15 },
      { k: 'npc', id: 'ibex', x: 7, y: 12, npc: 'ibex' },
      { k: 'npc', id: 'marmot_fd', x: 22, y: 5, npc: 'marmot' },
      { k: 'npc', id: 'cow_fd', x: 21, y: 18, npc: 'mtcow' },
      { k: 'npc', id: 'cow_fd2', x: 23, y: 20, npc: 'mtcow' },
      { k: 'block', id: 'rockfall', x: 3, y: 13, art: 'rockfall', until: 'mt_rocks' },
    ],
    warps: [
      ...kit.edge(39, [13, 14], '@prev', 0, [0, 0], 'right'),
      ...kit.edge(0, [13, 14], 'stonebridge', 40, [12, 13], 'left'),
      { x: 11, y: 10, to: 'exchange_mt', tx: 5, ty: 7, dir: 'up', door: true },
      { x: 18, y: 10, to: 'dairy', tx: 5, ty: 7, dir: 'up', door: true },
    ],
  };

  const STONEBRIDGE: MapDef = {
    id: 'stonebridge', at: 'stonebridge', country: 'mountains', theme: 'rocktown', water: 'river', spawn: { x: 40, y: 12, dir: 'left' }, rows: ROWS.stonebridge,
    objs: [
      { k: 'block', id: 'trailgate', x: 2, y: 12, art: 'trailgate', until: 'mt_gate' },
      { k: 'npc', id: 'chamois', x: 4, y: 11, npc: 'chamois' },
      { k: 'sign', id: 'sign_passroad', x: 5, y: 14 },
      { k: 'decor', id: 'house_sb1', x: 4, y: 5, art: 'stonehouse' },
      { k: 'decor', id: 'house_sb2', x: 11, y: 5, art: 'townhouse' },
      { k: 'decor', id: 'sport_house', x: 11, y: 16, art: 'townhouse' },
      { k: 'decor', id: 'house_sb3', x: 3, y: 17, art: 'stonehouse' },
      { k: 'decor', id: 'tower', x: 24, y: 4, art: 'tower' },
      { k: 'decor', id: 'house_sb4', x: 33, y: 5, art: 'stonehouse' },
      { k: 'decor', id: 'house_sb5', x: 24, y: 16, art: 'townhouse' },
      { k: 'decor', id: 'house_sb6', x: 33, y: 16, art: 'stonehouse' },
      { k: 'fountain', id: 'fountain_sb', x: 26, y: 9 },
      { k: 'decor', id: 'bench_sb', x: 35, y: 10, art: 'bench' },
      { k: 'decor', id: 'bunting_sb', x: 4, y: 9, art: 'bunting' },
      { k: 'decor', id: 'trough_sb', x: 14, y: 10, art: 'trough' },
      ...([[16, 5], [16, 20], [37, 21], [23, 21], [3, 21]] as const).map(([x, y], i): Obj => ({ k: 'decor', id: `pine_sb${i}`, x, y, art: 'pine' })),
      { k: 'sign', id: 'sign_stonebridge', x: 38, y: 10 },
      { k: 'npc', id: 'chough_sb', x: 28, y: 14, npc: 'chough' },
    ],
    warps: [
      ...kit.edge(41, [12, 13], 'felsdorf', 1, [13, 14], 'right'),
      ...kit.edge(0, [12, 13], 'pass', 34, [28, 29], 'left'),
      { x: 13, y: 18, to: 'sportshop', tx: 5, ty: 7, dir: 'up', door: true },
    ],
  };

  const PASS: MapDef = {
    id: 'pass', at: 'pass', country: 'mountains', theme: 'pass', spawn: { x: 34, y: 28, dir: 'left' }, rows: ROWS.pass,
    objs: [
      { k: 'block', id: 'avalanche', x: 12, y: 10, art: 'avalanche', until: 'mt_snow' },
      { k: 'npc', id: 'stbernard', x: 11, y: 12, npc: 'stbernard' },
      { k: 'decor', id: 'forecast', x: 14, y: 12, art: 'forecast' },
      { k: 'decor', id: 'trailsign_fork', x: 14, y: 5, art: 'trailsign' },
      { k: 'decor', id: 'trailsign_low', x: 10, y: 27, art: 'trailsign' },
      { k: 'decor', id: 'bench_pass', x: 18, y: 4, art: 'bench' },
      { k: 'npc', id: 'goatkid', x: 32, y: 20, npc: 'goatkid' },
      ...([[4, 26], [31, 25], [24, 22], [9, 19], [30, 13], [9, 15], [32, 27]] as const).map(([x, y], i): Obj => ({ k: 'decor', id: `pine_ps${i}`, x, y, art: 'pine' })),
    ],
    warps: [
      ...kit.edge(35, [28, 29], 'stonebridge', 1, [12, 13], 'right'),
      { x: 8, y: 33, to: 'miners', tx: 8, ty: 1, dir: 'down' }, { x: 9, y: 33, to: 'miners', tx: 9, ty: 1, dir: 'down' },
      { x: 29, y: 0, to: 'passhut', tx: 17, ty: 22, dir: 'up' }, { x: 30, y: 0, to: 'passhut', tx: 18, ty: 22, dir: 'up' },
      // the wrong trails turn the cat back at the fork
      { x: 4, y: 6, to: 'pass', tx: 11, ty: 6, dir: 'right', say: 'mt.west.back' }, { x: 4, y: 7, to: 'pass', tx: 11, ty: 7, dir: 'right', say: 'mt.west.back' },
      { x: 12, y: 2, to: 'pass', tx: 12, ty: 5, dir: 'down', say: 'mt.north.back' }, { x: 13, y: 2, to: 'pass', tx: 13, ty: 5, dir: 'down', say: 'mt.north.back' },
    ],
  };

  const MINERS: MapDef = {
    id: 'miners', at: 'miners', country: 'mountains', theme: 'mine', spawn: { x: 8, y: 1, dir: 'down' }, rows: ROWS.miners,
    objs: [
      { k: 'decor', id: 'mine', x: 20, y: 2, art: 'mine' },
      { k: 'decor', id: 'cart1', x: 21, y: 6, art: 'cart' },
      { k: 'decor', id: 'cart2', x: 21, y: 9, art: 'cart' },
      { k: 'npc', id: 'marmot', x: 18, y: 7, npc: 'marmot' },
      { k: 'decor', id: 'house_mi1', x: 3, y: 6, art: 'stonehouse' },
      { k: 'decor', id: 'house_mi2', x: 11, y: 15, art: 'townhouse' },
      { k: 'decor', id: 'house_mi3', x: 18, y: 15, art: 'chalet' },
      { k: 'decor', id: 'crates_mi', x: 24, y: 5, art: 'crates' },
      { k: 'decor', id: 'barrel_mi', x: 25, y: 8, art: 'barrel' },
      { k: 'decor', id: 'bunting_mi', x: 24, y: 10, art: 'bunting' },
      { k: 'decor', id: 'woodpile_mi', x: 5, y: 19, art: 'woodpile' },
      { k: 'lamp', id: 'lamp_mi1', x: 12, y: 11 }, { k: 'lamp', id: 'lamp_mi2', x: 22, y: 11 },
      { k: 'sign', id: 'sign_miners', x: 10, y: 10 },
      { k: 'item', id: 'crystal_mt1', x: 30, y: 20, item: 'mt_crystal' },
      { k: 'item', id: 'crystal_mt2', x: 4, y: 14, item: 'mt_crystal' },
      ...([[31, 14], [26, 20], [4, 11]] as const).map(([x, y], i): Obj => ({ k: 'decor', id: `pine_mi${i}`, x, y, art: 'pine' })),
    ],
    warps: [
      { x: 8, y: 0, to: 'pass', tx: 8, ty: 32, dir: 'up' }, { x: 9, y: 0, to: 'pass', tx: 9, ty: 32, dir: 'up' },
      { x: 21, y: 3, to: 'mine_inside', tx: 10, ty: 10, dir: 'up', door: true },
    ],
  };

  const MINE_INSIDE: MapDef = {
    id: 'mine_inside', at: 'miners', country: 'mountains', theme: 'cave', spawn: { x: 10, y: 10, dir: 'up' }, rows: ROWS.mine_inside,
    objs: [
      { k: 'lamp', id: 'lamp_mn1', x: 5, y: 3 }, { k: 'lamp', id: 'lamp_mn2', x: 12, y: 6 }, { k: 'lamp', id: 'lamp_mn3', x: 18, y: 6 },
      { k: 'decor', id: 'cart_mn', x: 4, y: 8, art: 'cart' },
      { k: 'decor', id: 'crates_mn', x: 16, y: 9, art: 'crates' },
      { k: 'item', id: 'crystal_mt3', x: 17, y: 2, item: 'mt_crystal' },
    ],
    warps: [{ x: 10, y: 11, to: 'miners', tx: 21, ty: 4, dir: 'down' }, { x: 11, y: 11, to: 'miners', tx: 21, ty: 4, dir: 'down' }],
  };

  const PASSHUT: MapDef = {
    id: 'passhut', at: 'passhut', country: 'mountains', theme: 'alpsnow', spawn: { x: 17, y: 22, dir: 'up' }, rows: ROWS.passhut,
    objs: [
      { k: 'decor', id: 'hut', x: 6, y: 6, art: 'hut' },
      { k: 'decor', id: 'cablestation', x: 27, y: 6, art: 'cablestation' },
      { k: 'block', id: 'cablecar', x: 31, y: 10, art: 'cablecar', until: 'mt_cable' },
      { k: 'decor', id: 'pylon', x: 35, y: 8, art: 'pylon' },
      { k: 'decor', id: 'bunting_ph', x: 12, y: 6, art: 'bunting' },
      { k: 'decor', id: 'woodpile_ph', x: 12, y: 8, art: 'woodpile' },
      { k: 'decor', id: 'bench_ph', x: 21, y: 9, art: 'bench' },
      { k: 'npc', id: 'chough_ph', x: 22, y: 14, npc: 'chough' },
      { k: 'sign', id: 'sign_passhut', x: 19, y: 19 },
      { k: 'sign', id: 'sign_cable', x: 26, y: 12 },
      ...([[4, 10], [25, 17], [29, 18], [11, 18], [13, 13]] as const).map(([x, y], i): Obj => ({ k: 'decor', id: `pine_ph${i}`, x, y, art: 'snowpine' })),
    ],
    warps: [
      { x: 17, y: 23, to: 'pass', tx: 29, ty: 1, dir: 'down' }, { x: 18, y: 23, to: 'pass', tx: 30, ty: 1, dir: 'down' },
      ...kit.edge(35, [10, 11], 'border_mountains', 2, [10, 11], 'right'),
      { x: 8, y: 8, to: 'hut_inside', tx: 6, ty: 8, dir: 'up', door: true },
    ],
  };

  const HUT_INSIDE: MapDef = {
    id: 'hut_inside', at: 'passhut', country: 'mountains', theme: 'indoor', spawn: { x: 6, y: 8, dir: 'up' },
    rows: [
      '#############',
      '#############',
      '#...........#',
      '#...........#',
      '#...........#',
      '#...........#',
      '#...........#',
      '#...........#',
      '#...........#',
      '######:######',
    ],
    objs: [
      { k: 'npc', id: 'brownbear', x: 6, y: 2, npc: 'brownbear' },
      { k: 'desk', id: 'desk_hut', x: 4, y: 3, clerk: 'brownbear' },
      { k: 'decor', id: 'table_hut1', x: 2, y: 6, art: 'table' },
      { k: 'npc', id: 'yak', x: 3, y: 6, npc: 'yak' },
      { k: 'decor', id: 'table_hut2', x: 9, y: 6, art: 'table' },
      { k: 'plant', id: 'plant', x: 1, y: 2 }, { k: 'plant', id: 'plant', x: 11, y: 2 },
    ],
    warps: [{ x: 6, y: 9, to: 'passhut', tx: 8, ty: 9, dir: 'down' }],
  };

  const BORDER: MapDef = {
    id: 'border_mountains', at: 'border_mountains', country: 'mountains', theme: 'alpine', spawn: { x: 2, y: 10, dir: 'right' }, rows: ROWS.border_mountains,
    objs: [
      { k: 'decor', id: 'valleystation', x: 3, y: 6, art: 'valleystation' },
      { k: 'decor', id: 'office_mountains_door', x: 11, y: 4, art: 'stonehouse' },
      { k: 'flag', id: 'flag_mountains', x: 17, y: 6, country: 'mountains' },
      { k: 'gate', id: 'gate_mountains', x: 28, y: 10, country: 'mountains' },
      { k: 'sign', id: 'sign_border4', x: 26, y: 9 },
      { k: 'decor', id: 'bunting_bd', x: 15, y: 8, art: 'bunting' },
      ...([[4, 13], [9, 16], [19, 14], [31, 16], [25, 4], [8, 4], [30, 5]] as const).map(([x, y], i): Obj => ({ k: 'decor', id: `pine_bd${i}`, x, y, art: 'pine' })),
      { k: 'npc', id: 'cow_bd', x: 18, y: 15, npc: 'mtcow' },
    ],
    warps: [
      ...kit.edge(0, [10, 11], 'passhut', 33, [10, 11], 'left'),
      ...kit.edge(35, [10, 11], '@next', 0, [0, 0], 'right'),
      { x: 13, y: 6, to: 'office_mountains', tx: 5, ty: 7, dir: 'up', door: true },
    ],
  };


  // ------------------------------------------------------------ homes and their residents

  /** A room: walls round it (the top two rows show the back wall), the doormat in the bottom wall at `dx`, rugs. */
  const room = (w: number, h: number, dx: number, rugs: [number, number, number, number, string][]) => Array.from({ length: h }, (_, y) => {
    if (y < 2) return '#'.repeat(w);
    if (y === h - 1) return '#'.repeat(dx) + ':' + '#'.repeat(w - dx - 1);
    return Array.from({ length: w }, (_, x) => (x === 0 || x === w - 1 ? '#' : rugs.find(([x0, y0, x1, y1]) => x >= x0 && x <= x1 && y >= y0 && y <= y1)?.[4] ?? '.')).join('');
  });
  type Home = { id: string; house: string; theme: 'chaletroom' | 'stoneroom'; w: number; h: number; back: [string, number, number]; res: [string, NpcKind, number, number];
    objs: [string, number, number][]; rugs: [number, number, number, number, string][]; plants?: [number, number][] };
  const HOMES: Home[] = [
    // Resi the cheesemaker: copper kettle, ripening wheels, the milk churns' barrel
    { id: 'home_fd1', house: 'house_fd1', theme: 'chaletroom', w: 13, h: 9, back: ['felsdorf', 9, 18], res: ['res_mt_resi', 'mtcow', 3, 4],
      objs: [['cheesekettle', 1, 2], ['window', 3, 1], ['shelf', 5, 1], ['cuckoo', 8, 1], ['window', 9, 1], ['cheeserack', 10, 2], ['woodtable', 5, 5], ['basket', 1, 6], ['barrel', 11, 6], ['chest', 11, 4]],
      rugs: [[4, 4, 8, 6, 'r']] },
    // Sepp the herdsman (a marmot): stove, his bed, a sheepskin
    { id: 'home_fd2', house: 'house_fd2', theme: 'chaletroom', w: 11, h: 9, back: ['felsdorf', 35, 6], res: ['res_mt_sepp', 'marmot', 7, 5],
      objs: [['stove', 1, 2], ['cuckoo', 3, 1], ['cupboard', 4, 2], ['window', 7, 1], ['bed', 9, 2], ['woodtable', 2, 5], ['chest', 9, 6], ['basket', 1, 6]],
      rugs: [[4, 5, 7, 6, 'y'], [8, 4, 9, 4, 'w']], plants: [[6, 2]] },
    // Lorenz, who knows the bridge's history: books, a map of the gorge
    { id: 'home_sb1', house: 'house_sb1', theme: 'stoneroom', w: 12, h: 9, back: ['stonebridge', 6, 7], res: ['res_mt_lorenz', 'chamois', 8, 4],
      objs: [['bookshelf', 1, 2], ['bookshelf', 3, 2], ['window', 6, 1], ['painting', 7, 1], ['stove', 9, 2], ['woodtable', 5, 5], ['chest', 1, 6]],
      rugs: [[4, 4, 7, 6, 'r']], plants: [[10, 6], [5, 2]] },
    // Kathi of the mountain rescue: skis and probes, a narrow bed
    { id: 'home_sb2', house: 'house_sb2', theme: 'stoneroom', w: 11, h: 10, back: ['stonebridge', 13, 7], res: ['res_mt_kathi', 'husky', 6, 4],
      objs: [['skirack', 1, 2], ['window', 4, 1], ['shelf', 5, 1], ['bed', 9, 2], ['woodtable', 3, 6], ['chest', 9, 5], ['crates', 1, 7], ['basket', 8, 7]],
      rugs: [[3, 5, 6, 7, 'y']] },
    // Alois the alphorn maker: the horn on the wall, wood shavings in a basket
    { id: 'home_sb3', house: 'house_sb3', theme: 'chaletroom', w: 13, h: 9, back: ['stonebridge', 5, 19], res: ['res_mt_alois', 'ibex', 6, 4],
      objs: [['window', 2, 1], ['alphorn', 4, 1], ['window', 8, 1], ['cupboard', 10, 2], ['woodtable', 2, 5], ['stove', 9, 5], ['basket', 7, 6], ['crates', 1, 2]],
      rugs: [[5, 3, 7, 5, 'r']], plants: [[11, 6]] },
    // Burgi the mountain hare spins wool
    { id: 'home_sb5', house: 'house_sb5', theme: 'chaletroom', w: 11, h: 9, back: ['stonebridge', 26, 18], res: ['res_mt_burgi', 'rabbit', 6, 5],
      objs: [['painting', 2, 1], ['spinwheel', 2, 3], ['basket', 1, 4], ['cupboard', 4, 2], ['window', 7, 1], ['bed', 9, 2], ['woodtable', 7, 5], ['chest', 9, 6]],
      rugs: [[2, 5, 4, 6, 'w']], plants: [[1, 2]] },
    // Hias, the old miner: helmets and lamps, crates and a barrel
    { id: 'home_mi1', house: 'house_mi1', theme: 'stoneroom', w: 12, h: 9, back: ['miners', 5, 8], res: ['res_mt_hias', 'badger', 7, 3],
      objs: [['helmetrack', 1, 2], ['window', 4, 1], ['shelf', 5, 1], ['painting', 8, 1], ['crates', 9, 2], ['barrel', 10, 5], ['woodtable', 4, 5], ['bed', 1, 5], ['basket', 10, 6]],
      rugs: [[3, 4, 6, 6, 'y']] },
    // Gundi the crystal collector
    { id: 'home_mi3', house: 'house_mi3', theme: 'stoneroom', w: 11, h: 9, back: ['miners', 20, 17], res: ['res_mt_gundi', 'mouse', 8, 5],
      objs: [['crystalshelf', 1, 2], ['window', 4, 1], ['painting', 5, 1], ['crystalshelf', 7, 2], ['woodtable', 3, 5], ['chest', 9, 6], ['crates', 1, 6]],
      rugs: [[3, 4, 6, 6, 'r']], plants: [[9, 4]] },
  ];
  const homeMaps: MapDef[] = HOMES.map((h) => {
    const dx = Math.floor(h.w / 2);
    return {
      id: h.id, at: h.back[0], country: 'mountains', theme: h.theme, spawn: { x: dx, y: h.h - 2, dir: 'up' }, rows: room(h.w, h.h, dx, h.rugs),
      objs: [
        ...h.objs.map(([art, x, y], i): Obj => ({ k: 'decor', id: `${h.id}_${art}${i}`, x, y, art })),
        ...(h.plants ?? []).map(([x, y]): Obj => ({ k: 'plant', id: 'plant', x, y })),
        { k: 'npc', id: h.res[0], x: h.res[2], y: h.res[3], npc: h.res[1] },
      ],
      warps: [{ x: dx, y: h.h - 1, to: h.back[0], tx: h.back[1], ty: h.back[2] + 1, dir: 'down' }],
    };
  });
  // the houses' doors (the door is the middle of a house's bottom row)
  for (const h of HOMES) {
    const m = [FELSDORF, STONEBRIDGE, MINERS].find((q) => q.id === h.back[0])!;
    m.warps.push({ x: h.back[1], y: h.back[2], to: h.id, tx: Math.floor(h.w / 2), ty: h.h - 2, dir: 'up', door: true });
  }

  const maps: MapDef[] = [
    FELSDORF, kit.interior('exchange_mt', 'mountains', 'chough', 'felsdorf', 11, 11, 'felsdorf'), kit.interior('dairy', 'mountains', 'mtcow', 'felsdorf', 18, 11, 'felsdorf'),
    STONEBRIDGE, kit.interior('sportshop', 'mountains', 'mtgoat', 'stonebridge', 13, 19, 'stonebridge'),
    PASS, MINERS, MINE_INSIDE, PASSHUT, HUT_INSIDE, BORDER,
    kit.office('office_mountains', 'mountains', 'goldeneagle', 'border_mountains', 13, 7, 'border_mountains'),
    ...homeMaps,
  ];

  // ------------------------------------------------------------ scripts

  const say = (k: string, who?: NpcKind): Step => ({ say: `mt.${k}`, who });
  const lines = (who: NpcKind, ...ks: string[]): Step[] => ks.map((k) => say(k, who));

  /** The exchange office: crowns into guilders at 1 : 3, and say how many guilders that makes. */
  function exchange(s: Save): Step[] {
    const who: NpcKind = 'chough';
    const k = kit.money(s, 'krone');
    const amounts = [2, 5, 10].filter((n) => n <= k);
    if (!amounts.length) {
      if (!has(s, 'mt_gift') && g(s) < 15) return [...lines(who, 'exch.hello', 'exch.nocrowns', 'exch.gift'), { money: 'gulden', n: 15 }, { set: 'mt_gift' }];
      return lines(who, 'exch.hello', 'exch.none');
    }
    const quiz = (n: number): Step => ({
      ask: 'mt.exch.quiz', who, opts: [n * 2, n * 3, n * 4].map((v): Opt => ({
        o: `mt.exch.g${v}`,
        then: [say(v === n * 3 ? 'exch.right' : 'exch.wrong', who), { money: 'krone', n: -n }, { money: 'gulden', n: n * 3 }, say('exch.done', who)],
      })),
    });
    return [...lines(who, 'exch.hello', 'exch.rate'), {
      ask: 'mt.exch.ask', who, opts: [...amounts.map((n): Opt => ({ o: `mt.exch.k${n}`, then: [quiz(n)] })), { o: 'exch.nothing', then: [{ say: 'exch.bye', who }] }],
    }];
  }

  /** The dairy: the cheese Anton asked for, then the right price. */
  function dairy(s: Save): Step[] {
    const who: NpcKind = 'mtcow';
    if (s.items.includes('mt_cheese') || has(s, 'mt_rocks')) return lines(who, 'cow.done');
    if (!has(s, 'mt_ask_ibex')) return lines(who, 'cow.hello', 'cow.idle');
    const pay: Step[] = g(s) >= 6
      ? [{
        ask: 'mt.cow.price', who, opts: [
          { o: 'mt.cow.pay16', then: [say('cow.toomuch', who)] },
          { o: 'mt.cow.pay6', then: [{ money: 'gulden', n: -6 }, say('cow.thanks', who), { give: 'mt_cheese' }, { xp: 15, why: 'for shopping at the dairy' }] },
          { o: 'mt.cow.pay60', then: [say('cow.toomuch', who)] },
        ],
      }]
      : [say('cow.price', who), say('cow.nomoney', who)];
    return [say('cow.hello', who), {
      ask: 'mt.cow.ask', who, opts: [
        { o: 'mt.cow.o_milk', then: [say('cow.milk', who)] },
        { o: 'mt.cow.o_butter', then: [say('cow.butter', who)] },
        { o: 'mt.cow.o_cheese', then: pay },
      ],
    }];
  }

  /** The sports shop: rent hiking boots (price per day × days); later, the lost kid. */
  function sportshop(s: Save): Step[] {
    const who: NpcKind = 'mtgoat';
    if (has(s, 'mt_kid_home')) return lines(who, 'goat.done');
    if (has(s, 'mt_kid_found')) return [...lines(who, 'goat.thanks1', 'goat.thanks2'), { give: 'mt_cowbell' }, { money: 'gulden', n: 5 }, { set: 'mt_kid_home' }, { xp: 20, why: 'for finding the goat kid' }];
    if (s.items.includes('mt_boots') || has(s, 'mt_gate')) {
      if (has(s, 'mt_ask_kid')) return lines(who, 'goat.kidreminder');
      return [...lines(who, 'goat.kid1', 'goat.kid2', 'goat.kid3'), { set: 'mt_ask_kid' }];
    }
    const rent: Step = {
      ask: 'mt.goat.quiz', who, opts: [6, 8, 10].map((v): Opt => ({
        o: `mt.goat.p${v}`,
        then: v !== 8 ? [say('goat.wrong', who)]
          : g(s) >= 8 ? [{ money: 'gulden', n: -8 }, say('goat.thanks', who), { give: 'mt_boots' }, { xp: 15, why: 'for renting hiking boots' }]
            : [say('goat.nomoney', who)],
      })),
    };
    return [say('goat.hello', who), {
      ask: 'mt.goat.ask', who, opts: [
        { o: 'mt.goat.o_skis', then: [say('goat.skis', who)] },
        { o: 'mt.goat.o_boots', then: [say('goat.rent', who), rent] },
        { o: 'mt.goat.o_swim', then: [say('goat.swim', who)] },
      ],
    }];
  }

  /** Miners' Town: three lost crystals, and a counting job (any time) for a few guilders. */
  const JOBS: { q: string; right: number; opts: number[] }[] = [
    { q: 'job.q1', right: 7, opts: [6, 7, 8] }, { q: 'job.q2', right: 8, opts: [7, 8, 9] },
    { q: 'job.q3', right: 10, opts: [8, 10, 12] }, { q: 'job.q4', right: 12, opts: [11, 12, 13] },
  ];
  function miner(s: Save): Step[] {
    const who: NpcKind = 'marmot';
    if (!has(s, 'mt_met_marmot')) return [...lines(who, 'marmot.hello1', 'marmot.hello2', 'marmot.hello3'), { set: 'mt_met_marmot' }];
    const pre: Step[] = [];
    if (!has(s, 'mt_crystals') && items(s, 'mt_crystal') >= 3) {
      pre.push({ take: 'mt_crystal' }, { take: 'mt_crystal' }, { take: 'mt_crystal' }, say('marmot.crystals1', who), say('marmot.crystals2', who),
        { money: 'gulden', n: 12 }, { set: 'mt_crystals' }, { xp: 20, why: 'for finding the crystals' });
    } else if (!has(s, 'mt_crystals')) pre.push(say('marmot.reminder', who));
    const job = JOBS[Math.floor(Math.random() * JOBS.length)];
    return [...pre, {
      ask: 'mt.marmot.ask', who, opts: [
        {
          o: 'opt.yes', then: [{
            ask: `mt.${job.q}`, who, opts: job.opts.map((v): Opt => ({
              o: `mt.n${v}`, then: v === job.right ? [say('job.right', who), { money: 'gulden', n: 3 }, { xp: 3, why: 'for counting carts' }] : [say('job.wrong', who)],
            })),
          }],
        },
        { o: 'opt.no', then: [say('marmot.later', who)] },
      ],
    }];
  }

  /** The Pass Hut: order the cable car driver's lunch, then pay. */
  function cook(s: Save): Step[] {
    const who: NpcKind = 'brownbear';
    if (s.items.includes('mt_lunch') || has(s, 'mt_yak_fed')) return lines(who, 'bear.done');
    if (!has(s, 'mt_ask_yak')) return lines(who, 'bear.hello', 'bear.idle');
    const pay: Step[] = g(s) >= 9
      ? [{
        ask: 'mt.bear.price', who, opts: [
          { o: 'mt.bear.pay5', then: [say('bear.toolittle', who)] },
          { o: 'mt.bear.pay19', then: [say('bear.toomuch', who)] },
          { o: 'mt.bear.pay9', then: [{ money: 'gulden', n: -9 }, say('bear.thanks', who), { give: 'mt_lunch' }, { xp: 15, why: 'for ordering lunch' }] },
        ],
      }]
      : [say('bear.price', who), say('bear.nomoney', who)];
    return [say('bear.hello', who), {
      ask: 'mt.bear.ask', who, opts: [
        { o: 'mt.bear.o1', then: [say('bear.notjonas', who)] },
        { o: 'mt.bear.o2', then: pay },
        { o: 'mt.bear.o3', then: [say('bear.notjonas', who)] },
      ],
    }];
  }

  function driver(s: Save): Step[] {
    const who: NpcKind = 'yak';
    if (has(s, 'mt_cable')) return lines(who, 'yak.done');
    const ticket: Step[] = [{
      ask: 'mt.yak.ticket', who, opts: [
        { o: 'opt.yes', then: g(s) >= 4 ? [{ money: 'gulden', n: -4 }, { set: 'mt_cable' }, say('yak.open', who), { xp: 25, why: 'for opening the cable car' }] : [say('yak.nomoney', who)] },
        { o: 'opt.no', then: [say('yak.later', who)] },
      ],
    }];
    if (has(s, 'mt_yak_fed')) return ticket;
    if (s.items.includes('mt_lunch')) return [{ take: 'mt_lunch' }, say('yak.eat1', who), { fx: 'shake' }, { set: 'mt_yak_fed' }, say('yak.eat2', who), ...ticket];
    if (has(s, 'mt_ask_yak')) return lines(who, 'yak.reminder');
    return [...lines(who, 'yak.hello1', 'yak.hello2', 'yak.hello3'), { set: 'mt_ask_yak' }];
  }

  const HOUSES: Record<string, string> = {
    exchange_house: 'house.exchange', dairy_house: 'house.dairy', sport_house: 'house.sport', hut: 'house.hut', chapel: 'house.chapel',
    tower: 'house.tower', mine: 'mine.look', cablestation: 'house.cable', valleystation: 'house.cable', forecast: 'forecast', trailsign_fork: 'trailsign.fork',
    trailsign_low: 'trailsign.low', trough: 'trough', trough_sb: 'trough',
  };

  function script(o: Obj, s: Save): Step[] | undefined {
    if (o.k === 'decor') {
      if (HOUSES[o.id]) return [say(HOUSES[o.id])];
      if (o.id === 'office_mountains_door') return [{ say: 'house.office' }];
      if (o.id.startsWith('house_')) return HOMES.some((h) => h.house === o.id) ? [] : [{ say: 'house.closed' }];
      if (o.art === 'cart') return [say('cart')];
      return undefined;
    }
    switch (o.id) {
      case 'ibex': {
        if (has(s, 'mt_rocks')) return lines('ibex', 'ibex.done');
        if (s.items.includes('mt_cheese')) {
          return [{ take: 'mt_cheese' }, say('ibex.eat1', 'ibex'), { fx: 'shake' }, { set: 'mt_rocks' }, say('ibex.eat2', 'ibex'), { xp: 25, why: 'for clearing the rockfall' }];
        }
        if (has(s, 'mt_ask_ibex')) return lines('ibex', 'ibex.reminder');
        return [...lines('ibex', 'ibex.hello1', 'ibex.hello2', 'ibex.hello3', 'ibex.hello4'), { set: 'mt_ask_ibex' }];
      }
      case 'rockfall': return [say('rockfall')];
      case 'chough': return exchange(s);
      case 'mtcow': return dairy(s);
      case 'mtgoat': return sportshop(s);
      case 'marmot': return miner(s);
      case 'brownbear': return cook(s);
      case 'yak': return driver(s);
      case 'goldeneagle': return kit.clerk('mountains', 'goldeneagle', s);
      case 'chamois': {
        if (has(s, 'mt_gate')) return lines('chamois', 'chamois.done');
        if (s.items.includes('mt_boots')) return [say('chamois.boots1', 'chamois'), { fx: 'shake' }, { set: 'mt_gate' }, say('chamois.boots2', 'chamois'), { xp: 20, why: 'for getting onto the pass road' }];
        if (has(s, 'mt_ask_chamois')) return lines('chamois', 'chamois.reminder');
        return [...lines('chamois', 'chamois.hello1', 'chamois.hello2', 'chamois.hello3'), { set: 'mt_ask_chamois' }];
      }
      case 'trailgate': return [say('trailgate')];
      case 'stbernard': {
        const who: NpcKind = 'stbernard';
        if (has(s, 'mt_snow')) return lines(who, 'dog.done');
        const intro = has(s, 'mt_met_dog') ? [] : [...lines(who, 'dog.hello1', 'dog.hello2'), { set: 'mt_met_dog' }];
        return [...intro, {
          ask: 'mt.dog.ask', who, opts: [
            { o: 'mt.dog.o_north', then: [say('dog.fog', who)] },
            { o: 'mt.dog.o_west', then: [say('dog.danger', who)] },
            { o: 'mt.dog.o_east', then: [say('dog.right1', who), { fx: 'shake' }, { set: 'mt_snow' }, say('dog.right2', who), { xp: 25, why: 'for reading the weather report' }] },
          ],
        }];
      }
      case 'avalanche': return [say('avalanche')];
      case 'goatkid': {
        if (has(s, 'mt_kid_found')) return lines('goatkid', 'kid.done');
        if (!has(s, 'mt_ask_kid')) return lines('goatkid', 'kid.idle');
        return [...lines('goatkid', 'kid.found1', 'kid.found2'), { set: 'mt_kid_found' }, { xp: 10, why: 'for finding the goat kid' }];
      }
      case 'cablecar': return [say('cablecar')];
      case 'marmot_fd': return lines('marmot', 'marmot_fd.1', 'marmot_fd.2');
      case 'cow_fd': case 'cow_fd2': case 'cow_bd': return lines('mtcow', 'cow_fd.1', 'cow_fd.2');
      case 'chough_sb': return lines('chough', 'chough_sb.1', 'chough_sb.2');
      case 'chough_ph': return lines('chough', 'chough_ph.1', 'chough_ph.2');
      case 'fountain_sb': return [say('fountain')];
      case 'sign_felsdorf': case 'sign_rockfall': case 'sign_passroad': case 'sign_stonebridge': case 'sign_miners': case 'sign_passhut': case 'sign_cable': case 'sign_border4':
        return [say(`sign.${o.id.slice(5)}`)];
    }
    return undefined;
  }

  // ------------------------------------------------------------ every line the scripts can say

  const lineKeys = [
    ...['hello1', 'hello2', 'hello3', 'hello4', 'reminder', 'eat1', 'eat2', 'done'].map((k) => `mt.ibex.${k}`), 'mt.rockfall',
    ...['hello', 'rate', 'ask', 'quiz', 'right', 'wrong', 'done', 'none', 'nocrowns', 'gift', 'k2', 'k5', 'k10', 'g4', 'g6', 'g8', 'g10', 'g15', 'g20', 'g30', 'g40'].map((k) => `mt.exch.${k}`),
    ...['hello', 'idle', 'ask', 'o_milk', 'o_butter', 'o_cheese', 'milk', 'butter', 'price', 'pay6', 'pay16', 'pay60', 'toomuch', 'thanks', 'nomoney', 'done'].map((k) => `mt.cow.${k}`),
    ...['hello1', 'hello2', 'hello3', 'reminder', 'boots1', 'boots2', 'done'].map((k) => `mt.chamois.${k}`), 'mt.trailgate',
    ...['hello', 'ask', 'o_skis', 'o_boots', 'o_swim', 'skis', 'swim', 'rent', 'quiz', 'p6', 'p8', 'p10', 'wrong', 'thanks', 'nomoney',
      'kid1', 'kid2', 'kid3', 'kidreminder', 'thanks1', 'thanks2', 'done'].map((k) => `mt.goat.${k}`),
    ...['hello1', 'hello2', 'ask', 'o_north', 'o_west', 'o_east', 'fog', 'danger', 'right1', 'right2', 'done'].map((k) => `mt.dog.${k}`),
    'mt.avalanche', 'mt.forecast', 'mt.trailsign.fork', 'mt.trailsign.low', 'mt.west.back', 'mt.north.back',
    ...['idle', 'found1', 'found2', 'done'].map((k) => `mt.kid.${k}`),
    ...['hello1', 'hello2', 'hello3', 'reminder', 'crystals1', 'crystals2', 'ask', 'later'].map((k) => `mt.marmot.${k}`),
    ...JOBS.map((j) => `mt.${j.q}`), 'mt.job.right', 'mt.job.wrong', ...[6, 7, 8, 9, 10, 11, 12, 13].map((n) => `mt.n${n}`),
    ...['hello', 'idle', 'ask', 'o1', 'o2', 'o3', 'notjonas', 'price', 'pay5', 'pay9', 'pay19', 'toolittle', 'toomuch', 'thanks', 'nomoney', 'done'].map((k) => `mt.bear.${k}`),
    ...['hello1', 'hello2', 'hello3', 'reminder', 'eat1', 'eat2', 'ticket', 'open', 'nomoney', 'later', 'done'].map((k) => `mt.yak.${k}`), 'mt.cablecar',
    'mt.marmot_fd.1', 'mt.marmot_fd.2', 'mt.cow_fd.1', 'mt.cow_fd.2', 'mt.chough_sb.1', 'mt.chough_sb.2', 'mt.chough_ph.1', 'mt.chough_ph.2', 'mt.fountain', 'mt.cart', 'mt.trough',
    ...['exchange', 'dairy', 'sport', 'hut', 'chapel', 'tower', 'cable'].map((k) => `mt.house.${k}`), 'mt.mine.look',
    ...['felsdorf', 'rockfall', 'passroad', 'stonebridge', 'miners', 'passhut', 'cable', 'border4'].map((k) => `mt.sign.${k}`),
    // (kit.clerkLines can't be called while the world is being built: the same keys, spelled out)
    ...['hello1', 'hello2', 'ready', 'pass', 'gate', 'fail', 'later', 'done'].map((k) => `goldeneagle.${k}`),
    'flag.mountains',
    ...HOMES.flatMap((h) => kit.residentLines(h.res[0])),
    ...['mt_cheese', 'mt_boots', 'mt_lunch', 'mt_crystal', 'mt_cowbell'].map((i) => `item.${i}`), 'pickup.mt_crystal',
  ];

  const entry: Arrival = { map: 'felsdorf', cells: [[38, 13], [38, 14]], dir: 'left' };
  const exit: Arrival = { map: 'border_mountains', cells: [[34, 10], [34, 11]], dir: 'left' };

  return {
    country: 'mountains', flag: ['#8a8a96', '#c0392b'], ink: '#6a5a4a', lines: LINES, maps, entry, exit, script, lineKeys,
    places: {
      felsdorf: 'Rock Village', exchange_mt: 'Rock Village exchange office', dairy: 'Rock Village dairy',
      stonebridge: 'Stonebridge', sportshop: 'Stonebridge sports shop', pass: 'High Pass', miners: "Miners' Town", mine_inside: 'Old Mine',
      passhut: 'Pass Hut', hut_inside: 'Pass Hut dining room', border_mountains: 'Border Valley', office_mountains: 'Rockland border office',
      mountains: 'Rockland',
      home_fd1: "Cheesemaker's farmhouse", home_fd2: "Herdsman's chalet", home_sb1: 'House by the bridge', home_sb2: 'Mountain rescue house',
      home_sb3: "Alphorn maker's house", home_sb5: "Spinner's cottage", home_mi1: "Old miner's house", home_mi3: "Crystal collector's house",
    },
    npcKinds: NPC_KINDS, things: THINGS,
  };
};
