/**
 * The Rainforest (4th country, between Rockland and the Megacity): rivers, stilt houses, a great waterfall and a
 * village in the treetops. The cat arrives from Rockland in the west with guilders and travels east:
 *
 * - Stilt Village: the rope bridge over the river broke in a storm. Anton the capuchin can mend it with a strong
 *   liana: the thick brown one (choosing it from three is the puzzle).
 * - River Port: the only way on is the boat to the Great Waterfall. Change guilders into cocoa beans at the exchange
 *   office (1 : 3, say how many beans that makes), read the timetable to say which boat is next, buy the ticket.
 *   Side: the fruit stall job (serve customers by picture, repeatable), and a tapir tourist whose camera a coati
 *   carried off to Orchid Town (buy a banana by name, trade it for the camera).
 * - Great Waterfall: the wet steps up the cliff beside the falls are closed: only with a guide. The guide lives in
 *   Canopy Village (up a ladder tree) and wants the cat in a rain poncho with mosquito spray (shop: pay the total).
 * - Rainforest border: the jaguar's exam, the stamp, the barrier opens; on to the Megacity's Central Station.
 */
import type { CountryModule, Kit, MapDef, Obj, Opt, Save, Step } from '../world';
import type { ItemKind, NpcKind } from '../art';
import './jungle-art';
import { JUNGLE_ANIMALS, JUNGLE_DECOR, JUNGLE_FRUIT } from './jungle-art';

// ---------------------------------------------------------------- maps

/** Stilt Village: houses on stilts along a brown river; the rope bridge across it is broken. */
const STILTS = (kit: Kit): MapDef => ({
  id: 'stilts', at: 'stilts', country: 'jungle', theme: 'jungle', water: 'river', spawn: { x: 2, y: 11, dir: 'right' },
  rows: [
    '##################~~~~##################',
    '##################~~~~##################',
    '###...............~~~~...........#######',
    '##..""............~~~~...r...........###',
    '##..""...........~~~~~~..............###',
    '##..r.........w..~~~~~~..............###',
    '##...............~~~~~~...y..........###',
    '##"".............~~~::::::...........###',
    '##""..............~~~~...:....##.....###',
    '##""..............~~~~...:....##.....###',
    '##.......y........~~~~...:..r........###',
    '::::::::::::::::::::::::::::::::::::::::',
    '::::::::::::::::::::::::::::::::::::::::',
    '##................~~~~.............y..##',
    '##..........r.....~~~~................##',
    '##"""............~~~~~~...........w...##',
    '##"""............~~~~~~...............##',
    '##"...~~~........~~~~~~.......""".....##',
    '##...~~~~~..##...~~~~~~."""...""".....##',
    '##....~~~...##...~~~~~~."""...........##',
    '##y..............~~~~~~.........r.....##',
    '###..............~~~~~~..............###',
    '#################~~~~~~#################',
    '#################~~~~~~#################',
  ],
  objs: [
    { k: 'decor', id: 'lianatree', x: 5, y: 7, art: 'lianatree' },
    { k: 'decor', id: 'house_s1', x: 9, y: 3, art: 'stilthouse2' },
    { k: 'decor', id: 'house_s2', x: 18, y: 4, art: 'stilthouse' },
    { k: 'decor', id: 'house_s3', x: 31, y: 3, art: 'stilthouse' },
    { k: 'decor', id: 'house_s4', x: 27, y: 14, art: 'stilthouse2' },
    { k: 'block', id: 'brokenbridge', x: 18, y: 11, art: 'brokenbridge', until: 'jg_bridge' },
    { k: 'npc', id: 'capuchin', x: 15, y: 10, npc: 'capuchin' },
    { k: 'npc', id: 'dartfrog', x: 7, y: 18, npc: 'dartfrog', pad: true },
    { k: 'npc', id: 'dolphin', x: 20, y: 19, npc: 'dolphin' },
    { k: 'decor', id: 'canoe_s', x: 19, y: 16, art: 'canoe' },
    { k: 'decor', id: 'cacao_s1', x: 10, y: 14, art: 'cacaotree' },
    { k: 'decor', id: 'cacao_s2', x: 23, y: 9, art: 'cacaotree' },
    { k: 'decor', id: 'monstera_s1', x: 14, y: 16, art: 'monstera' },
    { k: 'decor', id: 'monstera_s2', x: 35, y: 18, art: 'monstera' },
    { k: 'decor', id: 'banana_s1', x: 34, y: 8, art: 'bananaplant' },
    { k: 'decor', id: 'banana_s2', x: 3, y: 14, art: 'bananaplant' },
    { k: 'sign', id: 'sign_stilts', x: 3, y: 10 },
    { k: 'sign', id: 'sign_toport', x: 36, y: 10 },
  ],
  warps: [
    ...kit.edge(0, [11, 12], '@prev', 0, [0, 0], 'left'),
    ...kit.edge(39, [11, 12], 'riverport', 1, [12, 13], 'right'),
    ...doorsOn('stilts'),
  ],
});

/** River Port: a market town on the big river; the boat to the waterfall leaves from the jetty. */
const RIVERPORT = (kit: Kit): MapDef => ({
  id: 'riverport', at: 'riverport', country: 'jungle', theme: 'jungle', water: 'river', spawn: { x: 2, y: 12, dir: 'right' },
  rows: [
    '#####################::#####################',
    '#####################::#####################',
    '###............##....::.................####',
    '##.............##....::..................###',
    '##..y.....r..........::..........r.......###',
    '##...................::..................###',
    '##...................::.......w..........###',
    '##...................::..................###',
    '##......:::::::::::::::::::::::::::......###',
    '##""....::::::::::::::::::::::::::::......##',
    '##""....::::::::::::::::::::::::::::......##',
    '##......::::::::::::::::::::::::::::......##',
    '::::::::::::::::::::::::::::::::::::......##',
    '::::::::::::::::::::::::::::::::::::......##',
    '##......::::::::::::::::::::::::::::......##',
    '##......::::::::::::::::::::::::::::..""".##',
    '##......:::::::::::::::::::::::::::::.""".##',
    '##..................................:.....##',
    '##..r...............................:..w..##',
    '##::::::::::::::::::::::::::::::::::::::::##',
    '##::::::::::::::::::::::::::::::::::::::::##',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~:~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~:~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~:~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  objs: [
    { k: 'decor', id: 'exchangehut', x: 3, y: 4, art: 'exchangehut' },
    { k: 'decor', id: 'house_r1', x: 37, y: 3, art: 'stilthouse2' },
    { k: 'decor', id: 'house_r2', x: 37, y: 11, art: 'stilthouse' },
    { k: 'decor', id: 'house_r3', x: 24, y: 3, art: 'stilthouse' },
    { k: 'decor', id: 'stall_fruit', x: 11, y: 10, art: 'fruitstall' },
    { k: 'npc', id: 'toucan', x: 13, y: 10, npc: 'toucan' },
    { k: 'decor', id: 'stall_fruit2', x: 17, y: 10, art: 'fruitstall' },
    { k: 'npc', id: 'tapir', x: 22, y: 13, npc: 'tapir' },
    { k: 'decor', id: 'stall_fruit3', x: 24, y: 10, art: 'fruitstall' },
    { k: 'decor', id: 'stall_fruit4', x: 29, y: 10, art: 'fruitstall' },
    { k: 'decor', id: 'crates_r2', x: 27, y: 10, art: 'crates' },
    { k: 'decor', id: 'barrel_r2', x: 31, y: 14, art: 'barrel' },
    { k: 'decor', id: 'barrel_r3', x: 10, y: 15, art: 'barrel' },
    { k: 'decor', id: 'banana_r3', x: 34, y: 9, art: 'bananaplant' },
    { k: 'decor', id: 'monstera_r3', x: 9, y: 9, art: 'monstera' },
    { k: 'npc', id: 'capybara', x: 30, y: 18, npc: 'capybara' },
    { k: 'sign', id: 'sign_timetable', x: 32, y: 18 },
    { k: 'sign', id: 'sign_riverport', x: 9, y: 14 },
    { k: 'block', id: 'jettyrope', x: 31, y: 21, art: 'jettyrope', until: 'jg_boat' },
    { k: 'decor', id: 'boat_rp', x: 32, y: 22, art: 'riverboat' },
    { k: 'decor', id: 'canoe_r1', x: 9, y: 22, art: 'canoe' },
    { k: 'decor', id: 'canoe_r2', x: 19, y: 24, art: 'canoe' },
    { k: 'decor', id: 'crates_r', x: 25, y: 17, art: 'crates' },
    { k: 'decor', id: 'barrel_r', x: 27, y: 17, art: 'barrel' },
    { k: 'decor', id: 'cacao_r1', x: 2, y: 15, art: 'cacaotree' },
    { k: 'decor', id: 'banana_r1', x: 18, y: 3, art: 'bananaplant' },
    { k: 'decor', id: 'banana_r2', x: 33, y: 14, art: 'bananaplant' },
    { k: 'decor', id: 'monstera_r1', x: 20, y: 6, art: 'monstera' },
    { k: 'decor', id: 'monstera_r2', x: 40, y: 17, art: 'monstera' },
    { k: 'decor', id: 'bench_r', x: 14, y: 17, art: 'bench' },
  ],
  warps: [
    ...kit.edge(0, [12, 13], 'stilts', 38, [11, 12], 'left'),
    { x: 21, y: 0, to: 'orchid', tx: 17, ty: 22, dir: 'up' }, { x: 22, y: 0, to: 'orchid', tx: 18, ty: 22, dir: 'up' },
    { x: 5, y: 6, to: 'jg_exchange', tx: 5, ty: 7, dir: 'up', door: true },
    // the boat up the river to the waterfall
    { x: 31, y: 23, to: 'falls', tx: 4, ty: 16, dir: 'down', say: 'jg.boat.ride' },
    ...doorsOn('riverport'),
  ],
});

/** The Great Waterfall: the river thunders over a cliff; wet steps beside it lead up to the road to the border. */
const FALLS = (): MapDef => ({
  id: 'falls', at: 'falls', country: 'jungle', theme: 'jungle', water: 'river', spawn: { x: 4, y: 17, dir: 'down' },
  rows: [
    '################~~~~~~##################',
    '################~~~~~~##################',
    '##########......~~~~~~.......###########',
    '####....""......~~~~~~.........:::::::::',
    '###.....""...r..~~~~~~....w....:::::::::',
    '####............~~~~~~...........::...##',
    'oooooooooooooooo~~~~~~ooooooooooo::ooooo',
    'oooooooooooooooo~~~~~~ooooooooooo::ooooo',
    'oooooooooooooooo~~~~~~ooooooooooo::ooooo',
    'oooooooooooooooo~~~~~~ooooooooooo::ooooo',
    '##oooooooooooooo~~~~~~ooooooooooo::ooo##',
    '##........~~~~~~~~~~~~~~~~~......::...##',
    '##......~~~~~~~~~~~~~~~~~~~~.....::...##',
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~......::...##',
    '~~~~:~~~~~~~~~~~~~~~~~~~~~.......::...##',
    '~~~~:~~~~~~~~~~~~~~~~~~..........::...##',
    '##..:.........................w..::...##',
    '##..:.........y..................::...##',
    '##..:::::::::::::::::::::::::::::::...##',
    '##..:::::::::::::::::::::::::::::::...##',
    '##....r................:..........y...##',
    '##......""""...........:...###....""..##',
    '##.....""""............:...###........##',
    '##......."""........::::..............##',
    '##...r..."""...................w......##',
    '###..................................###',
    '########################################',
    '########################################',
  ],
  objs: [
    { k: 'block', id: 'trailrope', x: 33, y: 10, art: 'trailrope', until: 'jg_guide' },
    { k: 'decor', id: 'laddertree', x: 19, y: 21, art: 'laddertree' },
    { k: 'decor', id: 'boat_f', x: 5, y: 13, art: 'riverboat' },
    { k: 'npc', id: 'iguana', x: 29, y: 13, npc: 'iguana' },
    { k: 'sign', id: 'sign_falls', x: 6, y: 17 },
    { k: 'sign', id: 'sign_trail', x: 35, y: 11 },
    { k: 'sign', id: 'sign_canopy', x: 24, y: 22 },
    { k: 'decor', id: 'monstera_f1', x: 28, y: 11, art: 'monstera' },
    { k: 'decor', id: 'monstera_f2', x: 36, y: 22, art: 'monstera' },
    { k: 'decor', id: 'banana_f1', x: 36, y: 13, art: 'bananaplant' },
    { k: 'decor', id: 'banana_f2', x: 3, y: 21, art: 'bananaplant' },
    { k: 'decor', id: 'cacao_f1', x: 14, y: 22, art: 'cacaotree' },
    { k: 'decor', id: 'banana_f3', x: 24, y: 4, art: 'bananaplant' },
  ],
  warps: [
    { x: 4, y: 14, to: 'riverport', tx: 31, ty: 22, dir: 'up', say: 'jg.boat.back' },
    { x: 39, y: 3, to: 'border_jungle', tx: 1, ty: 8, dir: 'right' }, { x: 39, y: 4, to: 'border_jungle', tx: 1, ty: 9, dir: 'right' },
    { x: 20, y: 22, to: 'canopy', tx: 6, ty: 21, dir: 'down', door: true },
  ],
});

/** Orchid Town (north of River Port): gardens, a glass house full of orchids, a pond, and a coati up to no good. */
const ORCHID = (): MapDef => ({
  id: 'orchid', at: 'orchid', country: 'jungle', theme: 'jungle', spawn: { x: 17, y: 21, dir: 'up' },
  rows: [
    '####################################',
    '####################################',
    '##..........####............########',
    '##...r......................y...####',
    '##..........................w....###',
    '##...............................###',
    '##..w....::::::::::::::::::......###',
    '##.......:.......::.......:......###',
    '##.......:.......::.......:.......##',
    '##..""...:.......::.......:....r..##',
    '##..""...:.......::.......:.......##',
    '##.......::::::::::::::::::.......##',
    '##..~~~~.........::...............##',
    '##.~~~~~~........::.........""....##',
    '##.~~~~~~........::.........""....##',
    '##..~~~~.........::...............##',
    '##..........y....::.........r.....##',
    '###..##..........::..............###',
    '####.##..........::.............####',
    '#####............::............#####',
    '#######..........::..........#######',
    '#########........::........#########',
    '#################::#################',
    '#################::#################',
  ],
  objs: [
    { k: 'decor', id: 'greenhouse', x: 20, y: 2, art: 'greenhouse' },
    { k: 'decor', id: 'house_o1', x: 3, y: 2, art: 'stilthouse2' },
    { k: 'decor', id: 'house_o2', x: 28, y: 6, art: 'stilthouse' },
    { k: 'decor', id: 'orchidbed1', x: 11, y: 8, art: 'orchidbed' },
    { k: 'decor', id: 'orchidbed2', x: 14, y: 8, art: 'orchidbed' },
    { k: 'decor', id: 'orchidbed3', x: 20, y: 8, art: 'orchidbed' },
    { k: 'decor', id: 'orchidbed4', x: 23, y: 8, art: 'orchidbed' },
    { k: 'npc', id: 'hummingbird', x: 13, y: 10, npc: 'hummingbird' },
    { k: 'npc', id: 'coati', x: 31, y: 14, npc: 'coati' },
    { k: 'decor', id: 'cacao_o1', x: 30, y: 12, art: 'cacaotree' },
    { k: 'decor', id: 'cacao_o2', x: 33, y: 13, art: 'cacaotree' },
    { k: 'decor', id: 'cacao_o3', x: 32, y: 16, art: 'cacaotree' },
    { k: 'decor', id: 'banana_o1', x: 4, y: 7, art: 'bananaplant' },
    { k: 'decor', id: 'banana_o2', x: 25, y: 16, art: 'bananaplant' },
    { k: 'decor', id: 'monstera_o1', x: 9, y: 15, art: 'monstera' },
    { k: 'sign', id: 'sign_orchid', x: 16, y: 16 },
  ],
  warps: [{ x: 17, y: 23, to: 'riverport', tx: 21, ty: 1, dir: 'down' }, { x: 18, y: 23, to: 'riverport', tx: 22, ty: 1, dir: 'down' }, ...doorsOn('orchid')],
});

/** Canopy Village: plank decks and rope bridges high up in the trees, reached by the ladder tree at the waterfall. */
const CANOPY = (): MapDef => ({
  id: 'canopy', at: 'canopy', country: 'jungle', theme: 'jgcanopy', spawn: { x: 6, y: 21, dir: 'up' },
  rows: [
    '####################################',
    '####################################',
    '##........###############........###',
    '##........###############........###',
    '##........####........###........###',
    '##........::::........###........###',
    '##........####........:::........###',
    '##w.......####........###.......y###',
    '##############........###........###',
    '##############........##############',
    '##############........##############',
    '##############..r.....##############',
    '##############........##############',
    '##############........##############',
    '##############....##################',
    '##############....######.........###',
    '##############....::::::.........###',
    '###........###....######.........###',
    '###........###....######.........###',
    '###........:::....######........w###',
    '###r.......#############.........###',
    '###........#############.........###',
    '###......y.#############.........###',
    '###........#########################',
    '####################################',
    '####################################',
  ],
  objs: [
    { k: 'decor', id: 'ladderdown', x: 6, y: 20, art: 'ladderdown' },
    { k: 'decor', id: 'ponchostall', x: 4, y: 4, art: 'ponchostall' },
    { k: 'npc', id: 'anteater', x: 6, y: 4, npc: 'anteater' },
    { k: 'decor', id: 'hut_c1', x: 6, y: 2, art: 'treehut' },
    { k: 'decor', id: 'hut_c2', x: 28, y: 2, art: 'treehut2' },
    { k: 'npc', id: 'howler', x: 27, y: 6, npc: 'howler' },
    { k: 'decor', id: 'hut_c3', x: 29, y: 15, art: 'treehut' },
    { k: 'decor', id: 'trunk_c1', x: 16, y: 8, art: 'bigtrunk' },
    { k: 'decor', id: 'trunk_c2', x: 25, y: 20, art: 'bigtrunk' },
    { k: 'decor', id: 'trunk_c3', x: 8, y: 17, art: 'bigtrunk' },
    { k: 'sign', id: 'sign_canopyvillage', x: 4, y: 21 },
  ],
  warps: [{ x: 6, y: 20, to: 'falls', tx: 20, ty: 23, dir: 'down', door: true }, ...doorsOn('canopy')],
});

/** The Rainforest border: a small office, the flag, and the barrier before the plank bridge over a stream. */
const BORDER = (kit: Kit): MapDef => ({
  id: 'border_jungle', at: 'border_jungle', country: 'jungle', theme: 'jungle', water: 'river', spawn: { x: 1, y: 8, dir: 'right' },
  rows: [
    '####################################',
    '####################################',
    '###.........##############~~########',
    '##.....y.....############.~~.#######',
    '##................#####...~~...#####',
    '##........................~~.....###',
    '##.r......................~~.....###',
    '##..................######~~.....###',
    '::::::::::::::::::::::::::::::::::::',
    '::::::::::::::::::::::::::::::::::::',
    '#######################:::::::::::::',
    '########################..~~.....###',
    '#######################...~~..y..###',
    '######################....~~.....###',
    '######################..r.~~.....###',
    '#######################...~~....####',
    '##########################~~########',
    '##########################~~########',
    '##########################~~########',
    '##########################~~########',
  ],
  objs: [
    { k: 'decor', id: 'borderhut', x: 5, y: 3, art: 'borderhut' },
    { k: 'flag', id: 'flag_jungle', x: 11, y: 6, country: 'jungle' },
    { k: 'sign', id: 'sign_border', x: 14, y: 7 },
    { k: 'gate', id: 'gate_jungle', x: 22, y: 8, country: 'jungle' },
    { k: 'decor', id: 'monstera_b1', x: 20, y: 6, art: 'monstera' },
    { k: 'decor', id: 'banana_b1', x: 3, y: 5, art: 'bananaplant' },
    { k: 'decor', id: 'cacao_b1', x: 30, y: 5, art: 'cacaotree' },
    { k: 'decor', id: 'cacao_b2', x: 29, y: 13, art: 'cacaotree' },
  ],
  warps: [
    ...kit.edge(0, [8, 9], 'falls', 38, [3, 4], 'left'),
    ...kit.edge(35, [8, 9, 10], '@next', 0, [0, 0, 0], 'right'),
    { x: 7, y: 5, to: 'office_jungle', tx: 5, ty: 7, dir: 'up', door: true },
  ],
});


// ---------------------------------------------------------------- homes

/**
 * The homes: each a room with its resident, who tells the cat something about the rainforest (the shared resident
 * script: lines `<id>.1`, `.2`, later `.3`). The door mat leads back out to just in front of the house's door.
 */
interface Home { id: string; en: string; theme: 'jgroom' | 'jgglass'; back: string; door: [number, number]; rows: string[]; objs: Obj[] }
const r = (id: string, kind: string, x: number, y: number): Obj => ({ k: 'npc', id, x, y, npc: kind as NpcKind });
const f = (id: string, art: string, x: number, y: number): Obj => ({ k: 'decor', id, x, y, art });

const HOMES: Home[] = [
  {
    id: 'jg_h_weaver', en: "Stilt Village · weaver's house", theme: 'jgroom', back: 'stilts', door: [10, 5],
    rows: ['############', '############', '#..........#', '#..wwww....#', '#..wwww....#', '#..........#', '#y........r#', '#..........#', '#####:######'],
    objs: [r('res_jg_weaver', 'coati', 5, 4), f('loom', 'loom', 2, 2), f('palm1', 'pottedpalm', 1, 2), f('baskets', 'baskets', 4, 2), f('hammock', 'hammock', 8, 4), f('chest', 'chest', 10, 2), f('lamp', 'lamp', 9, 2), f('jar', 'waterjar', 1, 4), f('bask2', 'baskets', 1, 5), f('wshelf', 'wallshelf', 6, 1), f('mask', 'wallmask', 8, 1)],
  },
  {
    id: 'jg_h_fisher', en: "Stilt Village · fisher's house", theme: 'jgroom', back: 'stilts', door: [20, 6],
    rows: ['##########', '##########', '#........#', '#.ww.....#', '#.ww.....#', '#.......y#', '#........#', '####:#####'],
    objs: [r('res_jg_fisher', 'capybara', 3, 3), f('nets', 'nets', 5, 2), f('stove', 'claystove', 1, 2), f('jar0', 'waterjar', 2, 2), f('table', 'lowtable', 5, 4), f('jar', 'waterjar', 8, 2), f('bask', 'baskets', 8, 3), f('lamp', 'lamp', 7, 2), f('wshelf', 'wallshelf', 3, 1), f('sack', 'sack', 1, 5)],
  },
  {
    id: 'jg_h_granny', en: "Stilt Village · storyteller's house", theme: 'jgroom', back: 'stilts', door: [28, 16],
    rows: ['#############', '#############', '#...........#', '#..wwwwww...#', '#..wwwwww...#', '#..........y#', '#r..........#', '######:######'],
    objs: [r('res_jg_granny', 'tapir', 7, 4), f('hammock', 'hammock', 1, 2), f('drum', 'drum', 10, 2), f('chest', 'chest', 11, 2), f('table', 'lowtable', 4, 3), f('palm1', 'pottedpalm', 11, 6), f('lamp', 'lamp', 3, 2), f('shelf', 'plantshelf', 6, 2), f('bask', 'baskets', 11, 4), f('mask', 'wallmask', 5, 1), f('mask2', 'wallmask', 9, 1), f('jar', 'waterjar', 1, 5)],
  },
  {
    id: 'jg_h_cocoa', en: "River Port · cocoa farmer's house", theme: 'jgroom', back: 'riverport', door: [38, 5],
    rows: ['############', '############', '#..........#', '#..........#', '#..www.....#', '#..www....y#', '#y.........#', '#####:######'],
    objs: [r('res_jg_cocoa', 'capuchin', 4, 4), f('rack1', 'cocoarack', 1, 2), f('rack2', 'cocoarack', 4, 2), f('stove', 'claystove', 9, 2), f('jar', 'waterjar', 10, 2), f('table', 'lowtable', 7, 5), f('sack1', 'sack', 7, 2), f('sack2', 'sack', 1, 4), f('sack3', 'sack', 1, 5), f('bask', 'baskets', 10, 4), f('lamp', 'lamp', 8, 2), f('wshelf', 'wallshelf', 9, 1)],
  },
  {
    id: 'jg_h_weather', en: "River Port · boatbuilder's house", theme: 'jgroom', back: 'riverport', door: [39, 13],
    rows: ['###########', '###########', '#.........#', '#.........#', '#..wwwww..#', '#..wwwww..#', '#r.......y#', '#####:#####'],
    objs: [r('res_jg_weather', 'toucan', 5, 3), f('hammock', 'hammock', 1, 2), f('chest', 'chest', 7, 2), f('drum', 'drum', 9, 2), f('jar', 'waterjar', 9, 4), f('lamp', 'lamp', 8, 2), f('bask', 'baskets', 3, 2), f('nets', 'nets', 1, 4), f('mask', 'wallmask', 5, 1), f('wshelf', 'wallshelf', 7, 1)],
  },
  {
    id: 'jg_h_greenhouse', en: 'Orchid Town · greenhouse', theme: 'jgglass', back: 'orchid', door: [22, 4],
    rows: ['##############', '##############', '#wrw..::..wrw#', '#.....::.....#', '#""..::::..""#', '#....:..:....#', '#wrw.:..:.wrw#', '#....::::....#', '#""...::...""#', '######::######'],
    objs: [r('res_jg_orchid', 'hummingbird', 6, 5), f('shelf1', 'orchidshelf', 1, 3), f('shelf2', 'orchidshelf', 11, 3), f('shelf3', 'orchidshelf', 1, 5), f('shelf4', 'orchidshelf', 11, 5), f('jar', 'waterjar', 4, 7), f('palm1', 'pottedpalm', 12, 7), f('palm2', 'pottedpalm', 1, 7), f('bask', 'baskets', 9, 7), f('jar2', 'waterjar', 4, 3)],
  },
  {
    id: 'jg_h_rain', en: 'Orchid Town · gardener\'s house', theme: 'jgroom', back: 'orchid', door: [4, 4],
    rows: ['##########', '##########', '#........#', '#..www...#', '#..www...#', '#r......y#', '#........#', '####:#####'],
    objs: [r('res_jg_rain', 'iguana', 6, 4), f('shelf', 'plantshelf', 1, 2), f('shelf2', 'plantshelf', 3, 2), f('palm1', 'pottedpalm', 8, 2), f('jar', 'waterjar', 6, 2), f('chest', 'chest', 8, 4), f('lamp', 'lamp', 7, 2), f('palm2', 'pottedpalm', 1, 4), f('wshelf', 'wallshelf', 5, 1)],
  },
  {
    id: 'jg_h_bees', en: "Orchid Town · beekeeper's house", theme: 'jgroom', back: 'orchid', door: [30, 8],
    rows: ['############', '############', '#..........#', '#....ww....#', '#....ww....#', '#y.........#', '#..........#', '#####:######'],
    objs: [r('res_jg_bees', 'armadillo', 6, 3), f('hive1', 'beehive', 1, 2), f('hive2', 'beehive', 2, 2), f('hive4', 'beehive', 1, 3), f('hive3', 'beehive', 10, 2), f('table', 'lowtable', 8, 5), f('shelf', 'plantshelf', 7, 2), f('lamp', 'lamp', 4, 2), f('jar', 'waterjar', 10, 4), f('wshelf', 'wallshelf', 3, 1), f('wshelf2', 'wallshelf', 9, 1)],
  },
  {
    id: 'jg_h_watcher', en: "Canopy Village · watcher's hut", theme: 'jgroom', back: 'canopy', door: [7, 3],
    rows: ['#########', '#########', '#.......#', '#.wwww..#', '#.wwww.y#', '#.......#', '####:####'],
    objs: [r('res_jg_canopy', 'dartfrog', 3, 3), f('hammock', 'hammock', 5, 2), f('palm1', 'pottedpalm', 1, 2), f('lamp', 'lamp', 7, 2), f('bask', 'baskets', 1, 5), f('mask', 'wallmask', 3, 1)],
  },
  {
    id: 'jg_h_howler', en: "Canopy Village · grandmother's hut", theme: 'jgroom', back: 'canopy', door: [29, 3],
    rows: ['##########', '##########', '#........#', '#..wwww..#', '#..wwww..#', '#r......y#', '####:#####'],
    objs: [r('res_jg_howlergran', 'howler', 5, 3), f('drum', 'drum', 1, 2), f('drum2', 'drum', 2, 2), f('drum3', 'drum', 1, 3), f('table', 'lowtable', 6, 2), f('jar', 'waterjar', 8, 4), f('lamp', 'lamp', 4, 2), f('bask', 'baskets', 8, 2), f('mask', 'wallmask', 3, 1), f('mask2', 'wallmask', 6, 1)],
  },
  {
    id: 'jg_h_legend', en: "Canopy Village · old hut", theme: 'jgroom', back: 'canopy', door: [30, 16],
    rows: ['###########', '###########', '#.........#', '#.........#', '#..wwwww..#', '#..wwwww..#', '#y.......r#', '#####:#####'],
    objs: [r('res_jg_legend', 'anteater', 5, 4), f('shelf', 'plantshelf', 1, 2), f('hammock', 'hammock', 7, 2), f('chest', 'chest', 4, 2), f('stove', 'claystove', 9, 4), f('lamp', 'lamp', 5, 2), f('mask', 'wallmask', 3, 1), f('mask2', 'wallmask', 6, 1), f('bask', 'baskets', 1, 4), f('jar', 'waterjar', 9, 5)],
  },
];

function homeMap(h: Home, at: string): MapDef {
  const last = h.rows.length - 1;
  const mats = [...h.rows[last]].map((c, x) => (c === ':' ? x : -1)).filter((x) => x >= 0);
  return {
    id: h.id, at, country: 'jungle', theme: h.theme, spawn: { x: mats[0], y: last - 1, dir: 'up' }, rows: h.rows, objs: h.objs,
    warps: mats.map((x) => ({ x, y: last, to: h.back, tx: h.door[0], ty: h.door[1] + 1, dir: 'down' as const })),
  };
}
/** The door warps into the homes, for the maps the houses stand on. */
const doorsOn = (map: string) => HOMES.filter((h) => h.back === map).map((h) => {
  const last = h.rows.length - 1;
  return { x: h.door[0], y: h.door[1], to: h.id, tx: h.rows[last].indexOf(':'), ty: last - 1, dir: 'up' as const, door: true };
});
const OPEN_HOUSES = new Set(['house_s1', 'house_s2', 'house_s4', 'house_r1', 'house_r2', 'house_o1', 'house_o2']);

// ---------------------------------------------------------------- quests

const has = (s: Save, f: string) => s.flags.includes(f);
const holds = (s: Save, i: string) => s.items.includes(i as ItemKind);
const beans = (s: Save) => s.wallet?.bean ?? 0;
const say = (key: string, who?: NpcKind): Step => ({ say: key, who });

const LIANAS = ['jg_liana_brown', 'jg_liana_green', 'jg_liana_flower'];

/** Customers at the fruit stall: what they ask for, and the fruit (pictures) that answers it. */
const ORDERS: { line: string; items: string[] }[] = [
  { line: 'jg.order1', items: ['jg_banana', 'jg_banana'] },
  { line: 'jg.order2', items: ['jg_mango'] },
  { line: 'jg.order3', items: ['jg_papaya', 'jg_pineapple'] },
  { line: 'jg.order4', items: ['jg_coconut'] },
  { line: 'jg.order5', items: ['jg_mango', 'jg_maracuja'] },
  { line: 'jg.order6', items: ['jg_pineapple'] },
  { line: 'jg.order7', items: ['jg_banana', 'jg_coconut'] },
  { line: 'jg.order8', items: ['jg_maracuja', 'jg_maracuja'] },
];

function fruitRound(): Step[] {
  const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
  const order = pick(ORDERS);
  const key = order.items.slice().sort().join();
  const wrong: string[][] = [];
  while (wrong.length < 2) {
    const w = order.items.length === 1 ? [pick(JUNGLE_FRUIT)] : [pick(JUNGLE_FRUIT), pick(JUNGLE_FRUIT)];
    const k = w.slice().sort().join();
    if (k !== key && !wrong.some((x) => x.slice().sort().join() === k)) wrong.push(w);
  }
  const opts = [order.items, ...wrong].sort(() => Math.random() - 0.5);
  return [{
    ask: order.line, opts: opts.map((items): Opt => ({
      o: 'jg.job.here', pic: items,
      then: items.slice().sort().join() === key ? [say('jg.job.thanks'), { money: 'bean', n: 2 }, { xp: 3, why: 'for a happy customer' }] : [say('jg.job.oops')],
    })),
  }];
}

function script(kit: Kit, o: Obj, s: Save): Step[] | undefined {
  if (o.k === 'decor' && /^(stilthouse2?)$/.test(o.art)) return [say(OPEN_HOUSES.has(o.id) ? 'jg.house_open' : 'jg.house')];
  if (o.k === 'decor' && o.art === 'cacaotree') return [say('jg.cacao')];
  if (o.k === 'decor' && o.art === 'monstera') return [say('jg.monstera')];
  if (o.k === 'decor' && o.art === 'bananaplant') return [say('jg.bananaplant')];
  if (o.k === 'decor' && o.art === 'canoe') return [say('jg.canoe')];
  if (o.k === 'decor' && o.art === 'orchidbed') return [say('jg.orchidbed')];
  if (o.k === 'decor' && (o.art === 'treehut' || o.art === 'treehut2')) return [say('jg.hut')];
  if (o.k === 'decor' && o.art === 'bigtrunk') return [say('jg.bigtrunk')];
  switch (o.id) {
    // ---- Stilt Village
    case 'capuchin': {
      const who = 'capuchin';
      if (has(s, 'jg_bridge')) return [say('jg.cap.done', who)];
      const got = LIANAS.filter((l) => holds(s, l));
      if (has(s, 'jg_asked_cap') && got.length) {
        return [{
          ask: 'jg.cap.ask', who, opts: [
            ...got.map((l): Opt => ({
              o: `item.${l}`,
              then: l === 'jg_liana_brown'
                ? [{ take: l }, say('jg.cap.yes1', who), say('jg.cap.yes2', who), { fx: 'shake' }, { set: 'jg_bridge' }, say('jg.cap.yes3', who), { xp: 25, why: 'for mending the rope bridge' }]
                : [{ take: l }, say(l === 'jg_liana_green' ? 'jg.cap.green' : 'jg.cap.flower', who)],
            })),
            { o: 'opt.notyet', then: [say('jg.cap.notyet', who)] },
          ],
        }];
      }
      if (has(s, 'jg_asked_cap')) return [say('jg.cap.reminder', who)];
      return [say('jg.cap.hello1', who), say('jg.cap.hello2', who), say('jg.cap.hello3', who), say('jg.cap.hello4', who), { set: 'jg_asked_cap' }];
    }
    case 'lianatree': {
      const look = say('jg.liana.look');
      if (!has(s, 'jg_asked_cap') || has(s, 'jg_bridge')) return [look];
      if (LIANAS.some((l) => holds(s, l))) return [look, say('jg.liana.have')];
      return [look, {
        ask: 'jg.liana.which', opts: [
          { o: 'jg.liana.o_green', then: [{ give: 'jg_liana_green' }] },
          { o: 'jg.liana.o_brown', then: [{ give: 'jg_liana_brown' }] },
          { o: 'jg.liana.o_flower', then: [{ give: 'jg_liana_flower' }] },
          { o: 'opt.no', then: [] },
        ],
      }];
    }
    case 'brokenbridge': return [say('jg.bridge.look')];
    case 'dartfrog': return [say('jg.frog.hello1', 'dartfrog'), say('jg.frog.hello2', 'dartfrog')];
    case 'dolphin': return [say('jg.dolphin.hello1', 'dolphin'), say('jg.dolphin.hello2', 'dolphin')];
    case 'sign_stilts': return [say('jg.sign.stilts')];
    case 'sign_toport': return [say('jg.sign.toport')];

    // ---- River Port
    case 'exchangehut': return [say('jg.house_exchange')];
    case 'armadillo': {
      // the exchange office: guilders into cocoa beans, 1 : 3; the cat says how many beans that makes
      const who = 'armadillo';
      const g = s.wallet?.gulden ?? 0;
      const amounts = [5, 10, 20].filter((n) => n <= g);
      if (!amounts.length) return [say('jg.ex.hello', who), say('jg.ex.none', who)];
      const quiz = (n: number): Step => ({
        ask: 'jg.ex.quiz', who, opts: [n * 2, n * 3, n * 4].map((k): Opt => ({
          o: `jg.bean.${k}`,
          then: [say(k === n * 3 ? 'jg.ex.right' : 'jg.ex.wrong', who), { money: 'gulden', n: -n }, { money: 'bean', n: n * 3 }, say('jg.ex.done', who)],
        })),
      });
      return [say('jg.ex.hello', who), say('jg.ex.rate', who),
        { ask: 'jg.ex.ask', who, opts: [...amounts.map((n): Opt => ({ o: `jg.ex.g${n}`, then: [quiz(n)] })), { o: 'exch.nothing', then: [say('jg.ex.bye', who)] }] }];
    }
    case 'toucan': case 'stall_fruit': {
      const who = 'toucan';
      const banana: Step[] = holds(s, 'jg_banana')
        ? [say('jg.fruit.have', who)]
        : [{
          ask: 'jg.fruit.which', who, opts: [
            { o: 'jg.fruit.o_mango', then: [say('jg.fruit.nomango', who)] },
            { o: 'jg.fruit.o_banana', then: beans(s) >= 2 ? [say('jg.fruit.price', who), { money: 'bean', n: -2 }, { give: 'jg_banana' }, say('jg.fruit.thanks', who)] : [say('jg.fruit.price', who), say('jg.fruit.nomoney', who)] },
            { o: 'jg.fruit.o_pineapple', then: [say('jg.fruit.big', who)] },
          ],
        }];
      return [{
        ask: has(s, 'jg_worked') ? 'jg.fruit.again' : 'jg.fruit.ask', who, opts: [
          { o: 'jg.fruit.want_buy', then: banana },
          { o: 'jg.fruit.want_job', then: [say('jg.job.start', who), ...fruitRound(), ...fruitRound(), ...fruitRound(), say('jg.job.end', who), { set: 'jg_worked' }] },
          { o: 'exch.nothing', then: [say('jg.fruit.bye', who)] },
        ],
      }];
    }
    case 'stall_fruit2': case 'stall_fruit3': case 'stall_fruit4': return [say('jg.stall')];
    case 'tapir': {
      const who = 'tapir';
      if (has(s, 'jg_camera_done')) return [say('jg.tapir.done', who)];
      if (holds(s, 'jg_camera')) {
        return [{ take: 'jg_camera' }, say('jg.tapir.thanks1', who), say('jg.tapir.thanks2', who), { money: 'bean', n: 6 }, { set: 'jg_camera_done' }, { xp: 20, why: 'for finding the camera' }];
      }
      if (has(s, 'jg_asked_tapir')) return [say('jg.tapir.reminder', who)];
      return [say('jg.tapir.hello1', who), say('jg.tapir.hello2', who), say('jg.tapir.hello3', who), { set: 'jg_asked_tapir' }];
    }
    case 'capybara': {
      // the boat: read the timetable (it is eleven o'clock), then buy the ticket
      const who = 'capybara';
      if (has(s, 'jg_boat')) return [say('jg.boat.done', who)];
      const buy: Step[] = beans(s) >= 6
        ? [say('jg.boat.right', who), say('jg.boat.price', who), { money: 'bean', n: -6 }, { set: 'jg_boat' }, say('jg.boat.thanks', who), { xp: 20, why: 'for buying a boat ticket' }]
        : [say('jg.boat.right', who), say('jg.boat.price', who), say('jg.boat.nomoney', who)];
      return [say('jg.boat.hello1', who), {
        ask: 'jg.boat.when', who, opts: [
          { o: 'jg.boat.a1', then: [say('jg.boat.gone', who)] },
          { o: 'jg.boat.a2', then: buy },
          { o: 'jg.boat.a3', then: [say('jg.boat.late', who)] },
        ],
      }];
    }
    case 'sign_timetable': return [say('jg.sign.timetable')];
    case 'sign_riverport': return [say('jg.sign.riverport')];
    case 'jettyrope': return [say('jg.rope.look')];
    case 'boat_rp': return [say(has(s, 'jg_boat') ? 'jg.boat.ready' : 'jg.boat.look')];

    // ---- Orchid Town
    case 'coati': {
      const who = 'coati';
      if (has(s, 'jg_coati_done')) return [say('jg.coati.done', who)];
      if (!has(s, 'jg_asked_tapir')) return [say('jg.coati.idle', who)];
      if (holds(s, 'jg_banana')) {
        return [{ take: 'jg_banana' }, say('jg.coati.yes1', who), { give: 'jg_camera' }, { set: 'jg_coati_done' }, say('jg.coati.yes2', who)];
      }
      if (has(s, 'jg_asked_coati')) return [say('jg.coati.reminder', who)];
      return [say('jg.coati.hello1', who), say('jg.coati.hello2', who), say('jg.coati.hello3', who), { set: 'jg_asked_coati' }];
    }
    case 'hummingbird': return [say('jg.humm.hello1', 'hummingbird'), say('jg.humm.hello2', 'hummingbird'), say(has(s, 'jg_asked_tapir') && !has(s, 'jg_coati_done') ? 'jg.humm.coati' : 'jg.humm.hello3', 'hummingbird')];
    case 'greenhouse': return [say('jg.greenhouse')];
    case 'sign_orchid': return [say('jg.sign.orchid')];

    // ---- the Great Waterfall
    case 'trailrope': return [say('jg.trail.look')];
    case 'laddertree': return [say('jg.laddertree')];
    case 'boat_f': return [say('jg.boat.home')];
    case 'iguana': return [say('jg.iguana.hello1', 'iguana'), say('jg.iguana.hello2', 'iguana')];
    case 'sign_falls': return [say('jg.sign.falls')];
    case 'sign_trail': return [say('jg.sign.trail')];
    case 'sign_canopy': return [say('jg.sign.canopy')];

    // ---- Canopy Village
    case 'howler': {
      // the guide: he takes the cat up the wet steps, but only in a poncho and with mosquito spray
      const who = 'howler';
      if (has(s, 'jg_guide')) return [say('jg.guide.done', who)];
      if (holds(s, 'jg_poncho') && holds(s, 'jg_spray')) {
        return [say('jg.guide.ready', who), {
          ask: 'jg.guide.price', who, opts: [
            { o: 'opt.yes', then: beans(s) >= 5 ? [{ money: 'bean', n: -5 }, say('jg.guide.go1', who), { fx: 'shake' }, { set: 'jg_guide' }, say('jg.guide.go2', who), { xp: 25, why: 'for hiring a guide' }] : [say('jg.guide.nomoney', who)] },
            { o: 'opt.no', then: [say('jg.guide.later', who)] },
          ],
        }];
      }
      if (has(s, 'jg_asked_guide')) return [say('jg.guide.reminder', who)];
      return [say('jg.guide.hello1', who), say('jg.guide.hello2', who), say('jg.guide.hello3', who), { set: 'jg_asked_guide' }];
    }
    case 'anteater': case 'ponchostall': {
      const who = 'anteater';
      if (holds(s, 'jg_poncho') && holds(s, 'jg_spray')) return [say('jg.shop.done', who)];
      const pay: Step[] = beans(s) >= 9
        ? [{
          ask: 'jg.shop.price', who, opts: [
            { o: 'jg.shop.pay6', then: [say('jg.shop.toolittle', who)] },
            { o: 'jg.shop.pay9', then: [{ money: 'bean', n: -9 }, say('jg.shop.thanks', who), { give: 'jg_poncho' }, { give: 'jg_spray' }, { xp: 15, why: 'for shopping in the treetops' }] },
            { o: 'jg.shop.pay12', then: [say('jg.shop.toomuch', who)] },
          ],
        }]
        : [say('jg.shop.price', who), say('jg.shop.nomoney', who)];
      return [{
        ask: 'jg.shop.ask', who, opts: [
          { o: 'jg.shop.o2', then: [say('jg.shop.sun', who)] },
          { o: 'jg.shop.o1', then: pay },
          { o: 'jg.shop.o3', then: [say('jg.shop.umbrella', who)] },
        ],
      }];
    }
    case 'ladderdown': return [say('jg.ladder')];
    case 'sign_canopyvillage': return [say('jg.sign.canopyvillage')];

    // ---- the border
    case 'jaguar': return kit.clerk('jungle', 'jaguar', s);
    case 'borderhut': return [say('jg.house_office')];
    case 'sign_border': return [say('jg.sign.border')];
  }
  return undefined;
}

// ---------------------------------------------------------------- line keys

const LINE_KEYS = [
  'jg.house', 'jg.cacao', 'jg.monstera', 'jg.bananaplant', 'jg.canoe', 'jg.orchidbed', 'jg.hut', 'jg.bigtrunk',
  // Stilt Village
  'jg.cap.hello1', 'jg.cap.hello2', 'jg.cap.hello3', 'jg.cap.hello4', 'jg.cap.reminder', 'jg.cap.ask', 'jg.cap.notyet',
  'jg.cap.yes1', 'jg.cap.yes2', 'jg.cap.yes3', 'jg.cap.green', 'jg.cap.flower', 'jg.cap.done',
  'jg.liana.look', 'jg.liana.have', 'jg.liana.which', 'jg.liana.o_green', 'jg.liana.o_brown', 'jg.liana.o_flower',
  'jg.bridge.look', 'jg.frog.hello1', 'jg.frog.hello2', 'jg.dolphin.hello1', 'jg.dolphin.hello2', 'jg.sign.stilts', 'jg.sign.toport',
  // River Port
  'jg.house_exchange', 'jg.ex.hello', 'jg.ex.none', 'jg.ex.rate', 'jg.ex.ask', 'jg.ex.g5', 'jg.ex.g10', 'jg.ex.g20', 'jg.ex.quiz',
  'jg.ex.right', 'jg.ex.wrong', 'jg.ex.done', 'jg.ex.bye', ...[10, 15, 20, 30, 40, 60, 80].map((n) => `jg.bean.${n}`),
  'jg.fruit.ask', 'jg.fruit.again', 'jg.fruit.want_buy', 'jg.fruit.want_job', 'jg.fruit.which', 'jg.fruit.o_mango', 'jg.fruit.o_banana', 'jg.fruit.o_pineapple',
  'jg.fruit.nomango', 'jg.fruit.big', 'jg.fruit.price', 'jg.fruit.thanks', 'jg.fruit.nomoney', 'jg.fruit.have', 'jg.fruit.bye',
  'jg.job.start', 'jg.job.here', 'jg.job.thanks', 'jg.job.oops', 'jg.job.end', ...ORDERS.map((x) => x.line), 'jg.stall',
  'jg.tapir.hello1', 'jg.tapir.hello2', 'jg.tapir.hello3', 'jg.tapir.reminder', 'jg.tapir.thanks1', 'jg.tapir.thanks2', 'jg.tapir.done',
  'jg.boat.hello1', 'jg.boat.when', 'jg.boat.a1', 'jg.boat.a2', 'jg.boat.a3', 'jg.boat.gone', 'jg.boat.late', 'jg.boat.right', 'jg.boat.price',
  'jg.boat.nomoney', 'jg.boat.thanks', 'jg.boat.done', 'jg.boat.look', 'jg.boat.ready', 'jg.boat.ride', 'jg.boat.back', 'jg.boat.home',
  'jg.sign.timetable', 'jg.sign.riverport', 'jg.rope.look',
  // Orchid Town
  'jg.coati.idle', 'jg.coati.hello1', 'jg.coati.hello2', 'jg.coati.hello3', 'jg.coati.reminder', 'jg.coati.yes1', 'jg.coati.yes2', 'jg.coati.done',
  'jg.humm.hello1', 'jg.humm.hello2', 'jg.humm.hello3', 'jg.humm.coati', 'jg.greenhouse', 'jg.sign.orchid',
  // the Great Waterfall
  'jg.trail.look', 'jg.laddertree', 'jg.iguana.hello1', 'jg.iguana.hello2', 'jg.sign.falls', 'jg.sign.trail', 'jg.sign.canopy',
  // Canopy Village
  'jg.guide.hello1', 'jg.guide.hello2', 'jg.guide.hello3', 'jg.guide.reminder', 'jg.guide.ready', 'jg.guide.price', 'jg.guide.go1', 'jg.guide.go2',
  'jg.guide.nomoney', 'jg.guide.later', 'jg.guide.done',
  'jg.shop.ask', 'jg.shop.o1', 'jg.shop.o2', 'jg.shop.o3', 'jg.shop.sun', 'jg.shop.umbrella', 'jg.shop.price', 'jg.shop.pay6', 'jg.shop.pay9', 'jg.shop.pay12',
  'jg.shop.toolittle', 'jg.shop.toomuch', 'jg.shop.thanks', 'jg.shop.nomoney', 'jg.shop.done', 'jg.ladder', 'jg.sign.canopyvillage',
  // the border
  'jg.house_office', 'jg.sign.border', 'flag.jungle',
  // items
  ...[...LIANAS, 'jg_banana', 'jg_camera', 'jg_poncho', 'jg_spray'].map((i) => `item.${i}`),
];

/** "Name it" keys: the animals, the decor, and the theme's own tiles. */
const THINGS = [...JUNGLE_ANIMALS, ...JUNGLE_DECOR, 'fern', 'orchid', 'bamboo', 'canopy', 'ropebridge', 'railing', 'branch', 'fruitbasket', 'deck', 'wovenmat'];
const RESIDENTS = HOMES.flatMap((h) => h.objs.filter((o) => o.id.startsWith('res_')).map((o) => o.id));

export default (kit: Kit): CountryModule => ({
  country: 'jungle',
  flag: ['#1e7a3a', '#f0c020'],
  ink: '#1e6a3a',
  lines: ['jg.', 'jaguar.', 'flag.jungle', 'item.jg_'],
  maps: [
    STILTS(kit), RIVERPORT(kit), kit.interior('jg_exchange', 'jungle', 'armadillo', 'riverport', 5, 7, 'riverport'),
    ORCHID(), FALLS(), CANOPY(), BORDER(kit), ...HOMES.map((h) => homeMap(h, h.back)),
    kit.office('office_jungle', 'jungle', 'jaguar', 'border_jungle', 7, 6, 'border_jungle'),
  ],
  entry: { map: 'stilts', cells: [[1, 11], [1, 12]], dir: 'right' },
  exit: { map: 'border_jungle', cells: [[34, 8], [34, 9], [34, 10]], dir: 'left' },
  script: (o, s) => script(kit, o, s),
  lineKeys: [...LINE_KEYS, 'jg.house_open', ...kit.clerkLines('jaguar'), ...RESIDENTS.flatMap((id) => kit.residentLines(id))],
  places: {
    jungle: 'Rainforest',
    stilts: 'Stilt Village', riverport: 'River Port', jg_exchange: 'River Port exchange office', orchid: 'Orchid Town',
    falls: 'Great Waterfall', canopy: 'Canopy Village', border_jungle: 'Rainforest Border', office_jungle: 'Rainforest border office',
    ...Object.fromEntries(HOMES.map((h) => [h.id, h.en])),
  },
  npcKinds: JUNGLE_ANIMALS as NpcKind[],
  things: THINGS,
});
