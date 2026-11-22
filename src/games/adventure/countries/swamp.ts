/**
 * The Swamp (country 7): bog, fog and boardwalks between villages on stilts. The cat comes in from the Desert in the
 * east at Moorheim (Bog Village), goes west to Reedton, north over Fog Lake (a side road west to Frog Harbour) and
 * east through Mistmoor, the town of canals, to the border with the Sun Coast. Money: freshwater pearls.
 *
 * Roadblocks: the broken boardwalk west of Moorheim (the muskrat needs three planks), a crocodile asleep on Reedton's
 * jetty (only a honey cake wakes him) and a bank of fog on the Fog Lake boardwalk (the firefly guides the cat through
 * if it follows her directions). Tourist things: the exchange office (dinars into pearls), the cake stall, the canal
 * market, a punt tour with a ticket, postcards, and bog soup in Frog Harbour.
 */
import './swamp-art';
import type { ItemKind } from '../art';
import type { CountryModule, Kit, MapDef, Obj, Opt, Save, Step } from '../world';

export default (kit: Kit): CountryModule => {
  const pearls = (s: Save) => kit.money(s, 'pearl');
  const count = (s: Save, i: ItemKind) => s.items.filter((x) => x === i).length;

  // ---------------------------------------------------------------- maps

  /** Moorheim: stilt huts over the bog, the main boardwalk from the Desert in the east; west, the broken stretch. */
  const MOORHEIM: MapDef = {
    id: 'moorheim', at: 'moorheim', country: 'swamp', theme: 'swamp', spawn: { x: 33, y: 12, dir: 'left' },
    rows: [
    '####################################', // 0
    '####################################', // 1
    '###~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~###', // 2
    '###~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~###', // 3
    '##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##', // 4
    '##~~....~~~~~~~~~~~~~~~~~~~~~~....##', // 5
    '##~~.r..~~~~~:~~~~~~:~~~~~~:~.....##', // 6
    '##~~....~~~~~:~~~~~~:~~~~~~:~..w..##', // 7
    '##~~~..~~~~~~:~~~~~~:~~~~~~:~.....##', // 8
    '##~~~~~~~~~~~:~~~~~~:~~~~~~:~...r.##', // 9
    '##~~~~~~~~~~~:~~~~~~:~~~~~~:~.y...##', // 10
    '##~~~~~~~~~~~:~~~~~~:~~~~~~:~.....##', // 11
    '::::::::::::::::::::::::::::::::::::', // 12
    '::::::::::::::::::::::::::::::::::::', // 13
    '##~~~~~~~~~.......................##', // 14
    '##~~~~~~~~............w..........y##', // 15
    '##~~~~~~~..y............~~~~~.....##', // 16
    '##~~~~~~~.o............~~~~~~~....##', // 17
    '##~~~~~~~...w..........~~~~~~....o##', // 18
    '##~~~~~~~............y..~~~~~.r...##', // 19
    '###~~~~~~~....w..r................##', // 20
    '###~~~~~~~~~...................~~###', // 21
    '####################################', // 22
    '####################################', // 23
  ],
    objs: [
      { k: 'decor', id: 'hut_moritz', x: 11, y: 3, art: 'sw_stilthut' },
      { k: 'decor', id: 'hut_ute', x: 18, y: 3, art: 'sw_stilthut' },
      { k: 'decor', id: 'exchange_hut', x: 25, y: 3, art: 'sw_exchange' },
      { k: 'block', id: 'brokenwalk', x: 4, y: 12, art: 'sw_brokenwalk', until: 'sw_walk_fixed' },
      { k: 'sign', id: 'sw_sign_moorheim', x: 31, y: 14 },
      { k: 'sign', id: 'sw_sign_broken', x: 10, y: 14 },
      { k: 'npc', id: 'muskrat', x: 15, y: 16, npc: 'sw_muskrat' },
      { k: 'decor', id: 'sawhorse', x: 12, y: 16, art: 'sw_sawhorse' },
      { k: 'npc', id: 'toad', x: 26, y: 17, npc: 'sw_toad', pad: true },
      { k: 'item', id: 'plank_a', x: 31, y: 8, item: 'sw_plank' },
      { k: 'item', id: 'plank_b', x: 10, y: 19, item: 'sw_plank' },
      { k: 'decor', id: 'cypress_m', x: 18, y: 17, art: 'sw_cypress' },
      { k: 'decor', id: 'dead_m1', x: 3, y: 16, art: 'sw_deadtree' },
      { k: 'decor', id: 'dead_m2', x: 4, y: 5, art: 'sw_deadtree' },
      { k: 'decor', id: 'punt_m', x: 5, y: 10, art: 'sw_punt' },
      { k: 'decor', id: 'net_m', x: 30, y: 16, art: 'sw_net' },
      { k: 'decor', id: 'trap_m1', x: 22, y: 14, art: 'sw_trap' },
      { k: 'decor', id: 'trap_m2', x: 23, y: 14, art: 'barrel' },
      { k: 'decor', id: 'lantern_m1', x: 16, y: 11, art: 'sw_lantern' },
      { k: 'decor', id: 'lantern_m2', x: 24, y: 11, art: 'sw_lantern' },
      { k: 'decor', id: 'lantern_m3', x: 29, y: 14, art: 'sw_lantern' },
      { k: 'decor', id: 'lantern_m4', x: 9, y: 11, art: 'sw_lantern' },
      ...([[2, 11], [8, 14], [10, 15], [33, 14], [6, 9], [29, 5], [12, 21], [31, 21], [24, 15], [28, 15], [29, 18]] as const)
        .map(([x, y], i): Obj => ({ k: 'decor', id: `reeds_m${i}`, x, y, art: 'sw_reeds' })),
      { k: 'decor', id: 'mist_m1', x: 6, y: 18, art: 'sw_mist' },
      { k: 'decor', id: 'mist_m2', x: 16, y: 8, art: 'sw_mist' },
    ],
    warps: [
      ...kit.edge(35, [12, 13], '@prev', 0, [0, 0], 'right'),
      ...kit.edge(0, [12, 13], 'reedton', 34, [12, 13], 'left'),
      { x: 27, y: 5, to: 'sw_exchange', tx: 5, ty: 7, dir: 'up', door: true },
    ],
  };

  /** Reedton: reed-thatched houses on canals; the jetty north over the canal is where the crocodile sleeps. */
  const REEDTON: MapDef = {
    id: 'reedton', at: 'reedton', country: 'swamp', theme: 'swamp', spawn: { x: 33, y: 12, dir: 'left' },
    rows: [
    '######::############################', // 0
    '######::############################', // 1
    '######::############################', // 2
    '##~~~~::~~~~~~~~~~~~~~~~~~~~~~~~~~##', // 3
    '##~~~~::~~~~~~~~~~~~~~~~~~~~~~~~~~##', // 4
    '##~~~~::~~~~~~~~~~~~~~~~~~~~~~~~~~##', // 5
    '##o...::............~~~..........o##', // 6
    '##....::..........r.~~~...........##', // 7
    '##.w..::............~~~...........##', // 8
    '##....::............~~~...........##', // 9
    '##....::............~~~.y........w##', // 10
    '##....::............~~~...........##', // 11
    '##....::::::::::::::::::::::::::::::', // 12
    '##....::::::::::::::::::::::::::::::', // 13
    '##..r...............~~~...........##', // 14
    '##...............w..~~~...w.......##', // 15
    '##.y........y.......~~~.........r.##', // 16
    '##..................~~~...........##', // 17
    '##.~~~~~............~~~...........##', // 18
    '##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##', // 19
    '##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##', // 20
    '##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##', // 21
    '####################################', // 22
    '####################################', // 23
  ],
    objs: [
      { k: 'decor', id: 'house_r1', x: 9, y: 7, art: 'sw_reedhouse' },
      { k: 'decor', id: 'house_r2', x: 24, y: 7, art: 'sw_reedhouse2' },
      { k: 'decor', id: 'house_r3', x: 29, y: 7, art: 'sw_reedhouse' },
      { k: 'decor', id: 'house_r4', x: 9, y: 16, art: 'sw_reedhouse2' },
      { k: 'decor', id: 'house_r5', x: 26, y: 16, art: 'sw_reedhouse' },
      { k: 'decor', id: 'cakestall', x: 15, y: 10, art: 'sw_stall_cake' },
      { k: 'npc', id: 'duck', x: 14, y: 10, npc: 'sw_duck' },
      { k: 'block', id: 'croc', x: 6, y: 4, art: 'sw_croc_sleep', until: 'sw_croc_awake' },
      { k: 'sign', id: 'sw_sign_reedton', x: 31, y: 11 },
      { k: 'sign', id: 'sw_sign_north', x: 8, y: 6 },
      { k: 'decor', id: 'punt_r1', x: 12, y: 19, art: 'sw_punt' },
      { k: 'decor', id: 'punt_r2', x: 21, y: 8, art: 'sw_reeds' },
      { k: 'decor', id: 'lantern_r1', x: 19, y: 11, art: 'sw_lantern' },
      { k: 'decor', id: 'lantern_r2', x: 23, y: 14, art: 'sw_lantern' },
      { k: 'decor', id: 'lantern_r3', x: 5, y: 11, art: 'sw_lantern' },
      { k: 'decor', id: 'crates_r', x: 17, y: 10, art: 'crates' },
      { k: 'decor', id: 'net_r', x: 2, y: 9, art: 'sw_net' },
      { k: 'decor', id: 'trap_r', x: 18, y: 17, art: 'sw_trap' },
      { k: 'decor', id: 'bench_r', x: 16, y: 14, art: 'bench' },
      { k: 'decor', id: 'lantern_r4', x: 8, y: 14, art: 'sw_lantern' },
      { k: 'decor', id: 'dead_r', x: 31, y: 20, art: 'sw_deadtree' },
      ...([[4, 3], [10, 5], [16, 3], [27, 4], [32, 5], [20, 18], [22, 10], [2, 18], [33, 19], [24, 21], [8, 18]] as const)
        .map(([x, y], i): Obj => ({ k: 'decor', id: `reeds_r${i}`, x, y, art: 'sw_reeds' })),
      { k: 'decor', id: 'mist_r', x: 17, y: 20, art: 'sw_mist' },
    ],
    warps: [
      ...kit.edge(35, [12, 13], 'moorheim', 1, [12, 13], 'right'),
      { x: 6, y: 0, to: 'foglake', tx: 19, ty: 26, dir: 'up' }, { x: 7, y: 0, to: 'foglake', tx: 20, ty: 26, dir: 'up' },
    ],
  };

  /** Fog Lake: a boardwalk straight over the misty lake (fog on it until the firefly guides the cat); a road west. */
  const FOGLAKE: MapDef = {
    id: 'foglake', at: 'foglake', country: 'swamp', theme: 'swampfog', spawn: { x: 19, y: 25, dir: 'up' },
    rows: [
    '###########################::###########', // 0
    '###########################::###########', // 1
    '###........................::........###', // 2
    '###.......w................::....r...###', // 3
    '###...r...........y........::...o....###', // 4
    '###..........~~.~~~~~~~~..~::........###', // 5
    '###########~~~~~~~~~~~~~~~~::###########', // 6
    '##########~~~~~~~~~~~~~~~~~::~~~########', // 7
    '########~~~~~~~~~~~~~~~~~~~::~~~~~######', // 8
    '######~~~~~~~~~~~~~~~~~~~~~::~~~~~######', // 9
    '#####~~~~~~~~~~~~......~~~~::~~~~~~#####', // 10
    '#####~~~~~~~~~~~.w......~~~::~~~~~~~####', // 11
    '####~~~~~~~~~~~......r.::::::~~~~~~#####', // 12
    '####~~~~~~~~~~~~y......::::::~~~~~~~####', // 13
    '####~~~~~~~~~~~~...::.~~~~~~~~~~~~~#####', // 14
    '#####~~~...~~~~~~~~::~~~~~~~~~~~~~~#####', // 15
    '#####~~.rw..~~~~~~~::~~~~~~~~~~~~~~#####', // 16
    '######~~...~~~~~~~~::~~~~~~~~~~~~~~#####', // 17
    '#######~~~~~~~~~~~~::~~~~~~~~~~~########', // 18
    '#########~~~~~~~~~~::~~~~~~~~###########', // 19
    '###########~~~~~~~~::~~~~~~~############', // 20
    '###...............~::~~..~...........###', // 21
    ':::::::::::::::::::::..........y..w..###', // 22
    ':::::::::::::::::::::....r..........o###', // 23
    '###.o.w..r....y....::.........w......###', // 24
    '###.........w......::................###', // 25
    '###################::###################', // 26
    '###################::###################', // 27
  ],
    objs: [
      { k: 'block', id: 'fog', x: 18, y: 20, art: 'sw_fog', until: 'sw_fog_clear' },
      { k: 'npc', id: 'firefly', x: 22, y: 22, npc: 'sw_firefly' },
      { k: 'sign', id: 'sw_sign_foglake', x: 22, y: 24 },
      { k: 'sign', id: 'sw_sign_harbour', x: 3, y: 21 },
      { k: 'decor', id: 'dead_f1', x: 16, y: 11, art: 'sw_deadtree' },
      { k: 'decor', id: 'dead_f2', x: 9, y: 9, art: 'sw_deadtree' },
      { k: 'decor', id: 'dead_f3', x: 31, y: 16, art: 'sw_deadtree' },
      { k: 'decor', id: 'dead_f4', x: 33, y: 3, art: 'sw_deadtree' },
      { k: 'decor', id: 'cypress_f1', x: 5, y: 2, art: 'sw_cypress' },
      { k: 'decor', id: 'cypress_f2', x: 30, y: 22, art: 'sw_cypress' },
      { k: 'decor', id: 'lantern_f', x: 26, y: 13, art: 'sw_lantern' },
      { k: 'decor', id: 'lantern_f2', x: 17, y: 21, art: 'sw_lantern' },
      { k: 'decor', id: 'punt_f', x: 25, y: 20, art: 'sw_punt' },
      ...([[16, 6], [12, 7], [22, 8], [29, 9], [8, 15], [13, 18], [25, 17], [32, 12], [12, 19], [24, 19], [23, 11], [14, 13]] as const)
        .map(([x, y], i): Obj => ({ k: 'decor', id: `mist_f${i}`, x, y, art: 'sw_mist' })),
      ...([[7, 21], [16, 21], [23, 21], [33, 21], [6, 21], [35, 21], [26, 5], [29, 5], [15, 10], [22, 14]] as const)
        .map(([x, y], i): Obj => ({ k: 'decor', id: `reeds_f${i}`, x, y, art: 'sw_reeds' })),
    ],
    warps: [
      { x: 19, y: 27, to: 'reedton', tx: 6, ty: 1, dir: 'down' }, { x: 20, y: 27, to: 'reedton', tx: 7, ty: 1, dir: 'down' },
      ...kit.edge(0, [22, 23], 'frogharbour', 32, [11, 12], 'left'),
      { x: 27, y: 0, to: 'mistmoor', tx: 11, ty: 28, dir: 'up' }, { x: 28, y: 0, to: 'mistmoor', tx: 12, ty: 28, dir: 'up' },
    ],
  };

  /** Frog Harbour: the side road's little harbour, with piers, nets, boats and the cook's bog soup. */
  const FROGHARBOUR: MapDef = {
    id: 'frogharbour', at: 'frogharbour', country: 'swamp', theme: 'swamp', spawn: { x: 31, y: 11, dir: 'left' },
    rows: [
    '##################################', // 0
    '##################################', // 1
    '##~~~~~~~#########################', // 2
    '##~~~~~~~o......................##', // 3
    '##~~~~~~~..............y.....w..##', // 4
    '##~~~~~~~..w....................##', // 5
    '##~~~~~~~.......................##', // 6
    '##~~~~~~~.....................r.##', // 7
    '##~~~~~~~.y.....................##', // 8
    '##~~~~~~~.....w....r.......w....##', // 9
    '##~~~~~~~.......................##', // 10
    '##~:::::::::::::::::::::::::::::::', // 11
    '##~:::::::::::::::::::::::::::::::', // 12
    '##~~~~~~~~~~~..::.......::.....o##', // 13
    '##~~~~~~~~~~~~~::~~~~~~~::~~~~~###', // 14
    '##~~~~~~~~~~~~~::~~~~~~~::~~~~~###', // 15
    '##~~~~~~~~~~~~~::~~~~~~~::~~~~~###', // 16
    '##~~~~~~~~~~~~~::~~~~~~~~~~~~~~###', // 17
    '##~~~~~~~~~~~~~::~~~~~~~~~~~~~~###', // 18
    '##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~###', // 19
    '##################################', // 20
    '##################################', // 21
  ],
    objs: [
      { k: 'decor', id: 'house_h1', x: 11, y: 4, art: 'sw_reedhouse2' },
      { k: 'decor', id: 'house_h2', x: 18, y: 4, art: 'sw_stilthut' },
      { k: 'decor', id: 'house_h3', x: 25, y: 4, art: 'sw_reedhouse' },
      { k: 'npc', id: 'catfish', x: 15, y: 18, npc: 'sw_catfish' },
      { k: 'npc', id: 'newt', x: 22, y: 9, npc: 'sw_newt' },
      { k: 'sign', id: 'sw_sign_frogharbour', x: 30, y: 10 },
      { k: 'decor', id: 'beacon', x: 2, y: 11, art: 'sw_beacon' },
      { k: 'decor', id: 'fishboat', x: 18, y: 15, art: 'sw_fishboat' },
      { k: 'decor', id: 'punt_h1', x: 9, y: 16, art: 'sw_punt' },
      { k: 'decor', id: 'punt_h2', x: 4, y: 9, art: 'sw_punt' },
      { k: 'decor', id: 'punt_h3', x: 26, y: 15, art: 'sw_punt' },
      { k: 'decor', id: 'net_h1', x: 10, y: 9, art: 'sw_net' },
      { k: 'decor', id: 'net_h2', x: 27, y: 9, art: 'sw_net' },
      { k: 'decor', id: 'trap_h1', x: 13, y: 13, art: 'sw_trap' },
      { k: 'decor', id: 'trap_h2', x: 22, y: 13, art: 'sw_trap' },
      { k: 'decor', id: 'barrel_h', x: 20, y: 13, art: 'barrel' },
      { k: 'decor', id: 'crates_h', x: 18, y: 13, art: 'crates' },
      { k: 'decor', id: 'lantern_h1', x: 14, y: 10, art: 'sw_lantern' },
      { k: 'decor', id: 'lantern_h2', x: 26, y: 13, art: 'sw_lantern' },
      { k: 'decor', id: 'lantern_h3', x: 8, y: 10, art: 'sw_lantern' },
      { k: 'decor', id: 'cypress_h', x: 28, y: 3, art: 'sw_cypress' },
      ...([[8, 3], [8, 6], [2, 13], [12, 14], [29, 14], [6, 19], [30, 19]] as const)
        .map(([x, y], i): Obj => ({ k: 'decor', id: `reeds_h${i}`, x, y, art: 'sw_reeds' })),
      { k: 'decor', id: 'mist_h', x: 4, y: 4, art: 'sw_mist' },
    ],
    warps: kit.edge(33, [11, 12], 'foglake', 1, [22, 23], 'right'),
  };

  /** Mistmoor: the biggest town, houses on piles along a grand canal with a floating market, punt tours. */
  const MISTMOOR: MapDef = {
    id: 'mistmoor', at: 'mistmoor', country: 'swamp', theme: 'swamp', spawn: { x: 11, y: 27, dir: 'up' },
    rows: [
    '############################################', // 0
    '############################################', // 1
    '##............................~~~.........##', // 2
    '##......................r.....~~~......y..##', // 3
    '##............................~~~.........##', // 4
    '##............................~~~.........##', // 5
    '##............................~~~.........##', // 6
    '##.........::.................~~~.........##', // 7
    '##.........:::::::::::::::::::::::::::::::::', // 8
    '##.........:::::::::::::::::::::::::::::::::', // 9
    '##.w....y..::.................~~~.........##', // 10
    '##.........::.......w.........~~~........r##', // 11
    '##.........::.................~~~.........##', // 12
    '##::::::::::::::::::::::::::::~~~:::::::::##', // 13
    '##::::::::::::::::::::::::::::~~~:::::::::##', // 14
    '##~~~~~~~~~::~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##', // 15
    '##~~~~~~~~~::~~~~~~~~~~~~~~~~~~~~~::~~~~~~##', // 16
    '##~~~~~~~~~::~~~~~~~~~~~~~~~~~~~~~::~~~~~~##', // 17
    '##~~~~~~~~~::~~~~~~~~~~~~~~~~~~~~~::~~~~~~##', // 18
    '##o........::..............~~.............##', // 19
    '##.........::..............~~...........w.##', // 20
    '##.........::..............~~.............##', // 21
    '##.........::..............~~.............##', // 22
    '##.........:::::::::::::::::::::::::::::..##', // 23
    '##.........:::::::::::::::::::::::::::::..##', // 24
    '##~~~~~....::..............~~.............##', // 25
    '##~~~~~..r.::............w.~~.............##', // 26
    '##~~~~~....::...y..........~~............o##', // 27
    '###########::###############################', // 28
    '###########::###############################', // 29
  ],
    objs: [
      { k: 'decor', id: 'house_x1', x: 3, y: 4, art: 'sw_pilehouse' },
      { k: 'decor', id: 'house_x2', x: 14, y: 4, art: 'sw_pilehouse2' },
      { k: 'decor', id: 'house_x3', x: 19, y: 4, art: 'sw_pilehouse' },
      { k: 'decor', id: 'house_x4', x: 24, y: 4, art: 'sw_pilehouse2' },
      { k: 'decor', id: 'house_x5', x: 35, y: 4, art: 'sw_pilehouse' },
      { k: 'decor', id: 'house_x6', x: 3, y: 20, art: 'sw_pilehouse2' },
      { k: 'decor', id: 'house_x7', x: 16, y: 19, art: 'sw_reedhouse' },
      { k: 'decor', id: 'house_x8', x: 23, y: 19, art: 'sw_pilehouse' },
      { k: 'decor', id: 'house_x9', x: 34, y: 25, art: 'sw_reedhouse2' },
      { k: 'decor', id: 'stall_fish', x: 4, y: 11, art: 'sw_stall_fish' },
      { k: 'decor', id: 'marketstall', x: 15, y: 11, art: 'sw_stall_veg' },
      { k: 'npc', id: 'snail', x: 17, y: 11, npc: 'sw_snail' },
      { k: 'decor', id: 'stall_cake', x: 22, y: 11, art: 'sw_stall_cake' },
      { k: 'decor', id: 'kiosk', x: 31, y: 21, art: 'sw_kiosk' },
      { k: 'npc', id: 'dragonfly', x: 33, y: 21, npc: 'sw_dragonfly' },
      { k: 'npc', id: 'heron', x: 35, y: 16, npc: 'sw_heron' },
      { k: 'decor', id: 'punt_x', x: 36, y: 17, art: 'sw_punt' },
      { k: 'decor', id: 'mboat1', x: 4, y: 15, art: 'sw_marketboat' },
      { k: 'decor', id: 'mboat2', x: 18, y: 16, art: 'sw_marketboat' },
      { k: 'decor', id: 'mboat3', x: 25, y: 15, art: 'sw_marketboat' },
      { k: 'decor', id: 'punt_x2', x: 38, y: 15, art: 'sw_punt' },
      { k: 'sign', id: 'sw_sign_mistmoor', x: 13, y: 26 },
      { k: 'sign', id: 'sw_sign_market', x: 10, y: 12 },
      { k: 'sign', id: 'sw_sign_border', x: 41, y: 7 },
      ...([[10, 7], [13, 10], [28, 12], [33, 12], [9, 22], [13, 22], [27, 22], [38, 22]] as const)
        .map(([x, y], i): Obj => ({ k: 'decor', id: `lantern_x${i}`, x, y, art: 'sw_lantern' })),
      { k: 'decor', id: 'crates_x', x: 7, y: 11, art: 'crates' },
      { k: 'decor', id: 'bench_x1', x: 7, y: 7, art: 'bench' },
      { k: 'decor', id: 'bench_x2', x: 36, y: 21, art: 'bench' },
      ...([[3, 7], [6, 7], [14, 7], [17, 7], [19, 7], [22, 7], [24, 7], [27, 7], [35, 7], [38, 7], [3, 23], [6, 23]] as const)
        .map(([x, y], i): Obj => ({ k: 'decor', id: `flowers_x${i}`, x, y, art: 'flowers' })),
      { k: 'decor', id: 'net_x', x: 35, y: 11, art: 'sw_net' },
      { k: 'decor', id: 'trap_x', x: 26, y: 12, art: 'sw_trap' },
      { k: 'decor', id: 'punt_x3', x: 27, y: 25, art: 'sw_reeds' },
      { k: 'decor', id: 'barrel_x2', x: 9, y: 11, art: 'barrel' },
      { k: 'decor', id: 'barrel_x', x: 20, y: 11, art: 'barrel' },
      { k: 'decor', id: 'cypress_x1', x: 38, y: 10, art: 'sw_cypress' },
      { k: 'decor', id: 'cypress_x2', x: 7, y: 23, art: 'sw_cypress' },
      ...([[2, 18], [9, 17], [29, 3], [33, 2], [29, 14], [41, 18], [5, 25], [2, 24]] as const)
        .map(([x, y], i): Obj => ({ k: 'decor', id: `reeds_x${i}`, x, y, art: 'sw_reeds' })),
    ],
    warps: [
      { x: 11, y: 29, to: 'foglake', tx: 27, ty: 1, dir: 'down' }, { x: 12, y: 29, to: 'foglake', tx: 28, ty: 1, dir: 'down' },
      ...kit.edge(43, [8, 9], 'border_swamp', 1, [9, 10], 'right'),
    ],
  };

  /** The border: the road over a ditch to the Sun Coast, the barrier on the bridge, the office by the road. */
  const BORDER: MapDef = {
    id: 'border_swamp', at: 'border_swamp', country: 'swamp', theme: 'swamp', spawn: { x: 2, y: 9, dir: 'right' },
    rows: [
    '##############################', // 0
    '##############################', // 1
    '################~~~~##########', // 2
    '##..............~~~~..~~~~~~##', // 3
    '##........w.....~~~~..~~~~~~##', // 4
    '##..............~~~~..~~~~~~##', // 5
    '##..............~~~~........##', // 6
    '##.y............~~~~........##', // 7
    '##..............~~~~......r.##', // 8
    '::::::::::::::::::::::::::::::', // 9
    '::::::::::::::::::::::::::::::', // 10
    '##...........r..~~~~........##', // 11
    '##..w...........~~~~....w...##', // 12
    '##~~~~~~~~~~~~..~~~~.y.....o##', // 13
    '##~~~~~~~~~~~~..~~~~........##', // 14
    '################~~~~##########', // 15
    '##############################', // 16
    '##############################', // 17
  ],
    objs: [
      { k: 'decor', id: 'office_swamp_door', x: 6, y: 4, art: 'sw_office' },
      { k: 'flag', id: 'flag_swamp', x: 12, y: 6, country: 'swamp' },
      { k: 'sign', id: 'sw_sign_border2', x: 14, y: 8 },
      { k: 'gate', id: 'gate_swamp', x: 18, y: 9, country: 'swamp' },
      { k: 'decor', id: 'lantern_b1', x: 15, y: 11, art: 'sw_lantern' },
      { k: 'decor', id: 'lantern_b2', x: 20, y: 8, art: 'sw_lantern' },
      { k: 'decor', id: 'dead_b', x: 23, y: 12, art: 'sw_deadtree' },
      { k: 'decor', id: 'cypress_b', x: 2, y: 3, art: 'sw_cypress' },
      ...([[15, 3], [20, 3], [21, 6], [14, 12], [3, 12], [12, 12], [27, 6]] as const)
        .map(([x, y], i): Obj => ({ k: 'decor', id: `reeds_b${i}`, x, y, art: 'sw_reeds' })),
      { k: 'decor', id: 'mist_b', x: 4, y: 13, art: 'sw_mist' },
    ],
    warps: [
      ...kit.edge(0, [9, 10], 'mistmoor', 42, [8, 9], 'left'),
      ...kit.edge(29, [9, 10], '@next', 0, [0, 0], 'right'),
      { x: 8, y: 6, to: 'office_swamp', tx: 5, ty: 7, dir: 'up', door: true },
    ],
  };

  const EXCHANGE: MapDef = { ...kit.interior('sw_exchange', 'swamp', 'sw_otter', 'moorheim', 27, 6, 'moorheim'), theme: 'swamphut' };
  const OFFICE: MapDef = { ...kit.office('office_swamp', 'swamp', 'sw_turtle', 'border_swamp', 8, 7, 'border_swamp'), theme: 'swamphut' };

  // ---------------------------------------------------------------- homes and their residents

  type Furn = [string, number, number];
  /** A home inside a house: reed walls, a floor plan (r rug, y reed mat, w earth, ~ boat slip), furniture, a resident. */
  const home = (id: string, back: MapDef, bx: number, by: number, rows: string[], furn: Furn[], res: [string, string, number, number]): MapDef => {
    const h = rows.length, dx = rows[h - 1].indexOf(':');
    const m: MapDef = {
      id, at: back.at, country: 'swamp', theme: 'swamphut', spawn: { x: dx, y: h - 2, dir: 'up' }, rows,
      objs: [...furn.map(([art, x, y], i): Obj => ({ k: 'decor', id: `${id}_f${i}`, x, y, art })), { k: 'npc', id: res[0], x: res[2], y: res[3], npc: res[1] }],
      warps: [{ x: dx, y: h - 1, to: back.id, tx: bx, ty: by, dir: 'down' }],
    };
    // the house's door: the tile above where the cat stands outside
    back.warps.push({ x: bx, y: by - 1, to: id, tx: dx, ty: h - 2, dir: 'up', door: true });
    return m;
  };

  const HOMES: MapDef[] = [
    // Bog Village: the peat cutter (Moritz's sister) and the herbalist
    home('sw_home_peat', MOORHEIM, 13, 6, [
      '###########',
      '###########',
      '#.........#',
      '#..rrrrr..#',
      '#..rrrrr..#',
      '#..rrrrr..#',
      '#.........#',
      '#.........#',
      '#####:#####',
    ], [['sw_stove', 1, 2], ['sw_peat', 2, 2], ['sw_peat', 3, 2], ['sw_shelf', 5, 2], ['sw_bed', 9, 2], ['sw_table', 4, 4], ['sw_stool', 3, 4], ['sw_stool', 6, 4], ['sw_baskets', 1, 7], ['sw_peat', 9, 7], ['sw_firewood', 1, 3], ['sw_plantpot', 8, 2], ['sw_floorlamp', 9, 6], ['sw_baskets', 2, 7]],
    ['res_sw_mara', 'sw_muskrat', 8, 5]),
    home('sw_home_herbs', MOORHEIM, 20, 6, [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#.yyyyyyy..#',
      '#.yyyyyyy..#',
      '#..........#',
      '#..........#',
      '######:#####',
    ], [['sw_herbs', 1, 2], ['sw_herbs', 4, 2], ['sw_shelf', 7, 2], ['sw_pitcher', 9, 2], ['sw_pitcher', 10, 2], ['sw_herbtable', 3, 5], ['sw_stool', 5, 5],
      ['sw_bed2', 10, 6], ['sw_stove', 1, 6], ['sw_pitcher', 2, 7], ['sw_plantpot', 1, 4], ['sw_floorlamp', 9, 4], ['sw_baskets', 2, 6], ['sw_pitcher', 9, 5]],
    ['res_sw_hanne', 'sw_newt', 8, 4]),
    // Reedton: the thatcher, the basket weaver, the old storyteller
    home('sw_home_thatch', REEDTON, 11, 10, [
      '##########',
      '##########',
      '#..wwww..#',
      '#..wwww..#',
      '#........#',
      '#........#',
      '#........#',
      '####:#####',
    ], [['sw_reedbundle', 1, 2], ['sw_reedbundle', 1, 3], ['sw_reedbundle', 2, 2], ['sw_toolshelf', 7, 2], ['sw_bed', 8, 4], ['sw_table', 5, 5], ['sw_stool', 7, 5], ['sw_stove', 1, 6], ['sw_reedbundle', 2, 3], ['sw_firewood', 1, 5], ['sw_floorlamp', 8, 6], ['sw_baskets', 7, 3]],
    ['res_sw_ludger', 'sw_otter', 4, 3]),
    home('sw_home_baskets', REEDTON, 26, 10, [
      '###########',
      '###########',
      '#.........#',
      '#..rrrrr..#',
      '#..rrrrr..#',
      '#.........#',
      '#.........#',
      '#.........#',
      '#####:#####',
    ], [['sw_baskets', 1, 2], ['sw_baskets', 2, 2], ['sw_trap', 1, 3], ['sw_shelf', 4, 2], ['sw_table', 4, 4], ['sw_stool', 3, 4], ['sw_baskets', 8, 2],
      ['sw_bed2', 9, 5], ['sw_stove', 1, 6], ['sw_trap', 2, 7], ['sw_baskets', 1, 4], ['sw_plantpot', 7, 2], ['sw_floorlamp', 9, 7], ['sw_baskets', 3, 7]],
    ['res_sw_wiebke', 'sw_duck', 7, 5]),
    home('sw_home_granny', REEDTON, 31, 10, [
      '#########',
      '#########',
      '#.......#',
      '#.rrrrr.#',
      '#.rrrrr.#',
      '#.......#',
      '#.......#',
      '####:####',
    ], [['sw_stove', 1, 2], ['sw_shelf', 2, 2], ['sw_bed', 7, 2], ['sw_caketable', 4, 5], ['sw_stool', 6, 5], ['sw_lightjars', 1, 6], ['sw_baskets', 7, 6], ['sw_plantpot', 6, 2], ['sw_firewood', 1, 3], ['sw_floorlamp', 7, 5]],
    ['res_sw_ottilie', 'sw_toad', 3, 4]),
    // Frog Harbour: the fisherman, the painter in the stilt hut, the mapmaker
    home('sw_home_fisher', FROGHARBOUR, 13, 7, [
      '###########',
      '###########',
      '#.........#',
      '#.........#',
      '#..yyyyy..#',
      '#..yyyyy..#',
      '#.........#',
      '#####:#####',
    ], [['sw_netpile', 1, 2], ['sw_netpile', 2, 2], ['sw_trap', 3, 2], ['barrel', 7, 2], ['sw_bed', 9, 2], ['sw_fishtable', 4, 4], ['sw_stool', 6, 5], ['sw_stove', 1, 5], ['sw_netpile', 9, 6], ['sw_floorlamp', 1, 6], ['sw_trap', 8, 6], ['barrel', 8, 2], ['sw_plantpot', 1, 3]],
    ['res_sw_thies', 'sw_catfish', 3, 5]),
    home('sw_home_painter', FROGHARBOUR, 20, 7, [
      '#########',
      '#########',
      '#.......#',
      '#.......#',
      '#.rrrrr.#',
      '#.......#',
      '#.......#',
      '####:####',
    ], [['sw_shelf', 1, 2], ['sw_bed2', 7, 2], ['sw_table', 3, 3], ['sw_stool', 5, 3], ['sw_herbs', 1, 5], ['sw_lightjars', 7, 6], ['sw_plantpot', 3, 2], ['sw_floorlamp', 1, 6], ['sw_pitcher', 4, 2]],
    ['res_sw_margot', 'sw_dragonfly', 6, 5]),
    home('sw_home_maps', FROGHARBOUR, 27, 7, [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#..rrrrrr..#',
      '#..rrrrrr..#',
      '#..........#',
      '#..........#',
      '######:#####',
    ], [['sw_bookshelf', 1, 2], ['sw_bookshelf', 3, 2], ['sw_pitcher', 6, 2], ['sw_bed', 10, 2], ['sw_maptable', 4, 4], ['sw_stool', 6, 4], ['sw_stove', 1, 6], ['sw_pitcher', 10, 7], ['sw_plantpot', 7, 2], ['sw_floorlamp', 1, 4], ['sw_firewood', 2, 6], ['sw_baskets', 9, 7]],
    ['res_sw_gesa', 'sw_snail', 8, 5]),
    // Mistmoor: eight homes on the canals
    home('sw_home_boats', MISTMOOR, 5, 7, [
      '##############',
      '##############',
      '#wwwwwwwwwwww#',
      '#ww~~~~~~wwww#',
      '#ww~~~~~~wwww#',
      '#wwwwwwwwwwww#',
      '#wwwwwwwwwwww#',
      '#wwwwwwwwwwww#',
      '######:#######',
    ], [['sw_toolshelf', 1, 2], ['sw_punt', 3, 4], ['sw_toolshelf', 10, 2], ['barrel', 12, 3], ['sw_boatframe', 2, 6], ['sw_toolbench', 9, 6], ['sw_peat', 12, 7], ['sw_stool', 11, 5], ['crates', 12, 2], ['sw_firewood', 1, 4], ['sw_floorlamp', 12, 6], ['sw_reedbundle', 1, 5]],
    ['res_sw_anselm', 'beaver', 10, 4]),
    home('sw_home_weather', MISTMOOR, 16, 7, [
      '###########',
      '###########',
      '#.........#',
      '#.........#',
      '#...rrr...#',
      '#...rrr...#',
      '#.........#',
      '#.........#',
      '#####:#####',
    ], [['sw_bookshelf', 1, 2], ['sw_maptable', 4, 2], ['sw_bed', 9, 2], ['sw_stool', 3, 4], ['sw_stove', 1, 6], ['sw_lightjars', 9, 6], ['sw_herbs', 7, 6], ['sw_plantpot', 6, 2], ['sw_floorlamp', 9, 4], ['sw_baskets', 1, 7]],
    ['res_sw_ilse', 'owl', 6, 4]),
    home('sw_home_scholar', MISTMOOR, 21, 7, [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#.rrrrrrrr.#',
      '#.rrrrrrrr.#',
      '#..........#',
      '#..........#',
      '######:#####',
    ], [['sw_bookshelf', 1, 2], ['sw_bookshelf', 3, 2], ['sw_finds', 7, 2], ['sw_maptable', 3, 4], ['sw_stool', 5, 4], ['sw_bed2', 10, 6], ['sw_shelf', 1, 6], ['sw_stove', 10, 2], ['sw_plantpot', 6, 2], ['sw_floorlamp', 10, 4], ['sw_firewood', 9, 2]],
    ['res_sw_konrad', 'sw_otter', 8, 5]),
    home('sw_home_choir', MISTMOOR, 26, 7, [
      '##########',
      '##########',
      '#........#',
      '#.yyyyyy.#',
      '#.yyyyyy.#',
      '#........#',
      '#........#',
      '####:#####',
    ], [['sw_shelf', 1, 2], ['sw_pitcher', 3, 2], ['sw_bed', 8, 2], ['sw_table', 2, 5], ['sw_stool', 1, 5], ['sw_lightjars', 8, 5], ['sw_plantpot', 4, 2], ['sw_floorlamp', 1, 4], ['sw_baskets', 8, 4]],
    ['res_sw_imke', 'frog', 5, 3]),
    home('sw_home_bees', MISTMOOR, 37, 7, [
      '###########',
      '###########',
      '#.........#',
      '#.........#',
      '#..rrrrr..#',
      '#..rrrrr..#',
      '#.........#',
      '#.........#',
      '#####:#####',
    ], [['sw_honeyshelf', 1, 2], ['sw_honeyshelf', 3, 2], ['sw_shelf', 6, 2], ['sw_honeytable', 4, 4], ['sw_stool', 6, 4], ['sw_bed2', 9, 5], ['sw_stove', 1, 6], ['sw_baskets', 9, 2], ['sw_plantpot', 8, 2], ['sw_floorlamp', 1, 4], ['sw_baskets', 2, 7], ['sw_firewood', 9, 7]],
    ['res_sw_jupp', 'badger', 3, 5]),
    home('sw_home_fireflies', MISTMOOR, 5, 23, [
      '##########',
      '##########',
      '#........#',
      '#..rrrr..#',
      '#..rrrr..#',
      '#........#',
      '#........#',
      '#........#',
      '####:#####',
    ], [['sw_lightjars', 1, 2], ['sw_lightjars', 2, 2], ['sw_shelf', 5, 2], ['sw_bed', 8, 2], ['sw_table', 4, 4], ['sw_lightjars', 8, 6], ['sw_stove', 1, 6], ['sw_pitcher', 1, 7], ['sw_plantpot', 7, 2], ['sw_lightjars', 3, 7], ['sw_floorlamp', 8, 5]],
    ['res_sw_frauke', 'sw_firefly', 3, 4]),
    home('sw_home_cook', MISTMOOR, 18, 22, [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#...yyyy...#',
      '#...yyyy...#',
      '#..........#',
      '#..........#',
      '######:#####',
    ], [['sw_stove', 1, 2], ['sw_stove', 2, 2], ['sw_shelf', 3, 2], ['sw_herbs', 7, 2], ['barrel', 10, 2], ['barrel', 10, 3], ['sw_caketable', 4, 4], ['sw_stool', 6, 4], ['sw_bed2', 10, 6], ['sw_baskets', 1, 7], ['sw_firewood', 1, 3], ['sw_plantpot', 9, 2], ['sw_floorlamp', 1, 5], ['sw_baskets', 2, 7]],
    ['res_sw_edda', 'sw_duck', 8, 5]),
    home('sw_home_birds', MISTMOOR, 25, 22, [
      '###########',
      '###########',
      '#.........#',
      '#.........#',
      '#..rrrrr..#',
      '#..rrrrr..#',
      '#.........#',
      '#.........#',
      '#####:#####',
    ], [['sw_bookshelf', 1, 2], ['sw_shelf', 6, 2], ['sw_bed', 9, 2], ['sw_maptable', 4, 4], ['sw_stool', 3, 4], ['sw_stove', 1, 6], ['sw_pitcher', 9, 7], ['sw_reedbundle', 8, 2], ['sw_plantpot', 5, 2], ['sw_floorlamp', 1, 4], ['sw_firewood', 1, 5]],
    ['res_sw_hinnerk', 'sw_heron', 7, 5]),
  ];
  const RESIDENTS = HOMES.map((m) => m.objs.find((o) => o.k === 'npc')!.id);

  // ---------------------------------------------------------------- scripts

  /** The exchange office: dinars into pearls at 1 : 3, and how many pearls that makes. */
  const exchange = (s: Save): Step[] => {
    const who = 'sw_otter';
    const amounts = [5, 10, 20].filter((n) => n <= kit.money(s, 'dinar'));
    if (!amounts.length) return [{ say: 'sw.ex.hello', who }, { say: 'sw.ex.none', who }];
    const quiz = (n: number): Step => ({
      ask: 'sw.ex.quiz', who, opts: [n * 2, n * 3, n * 4].map((k): Opt => ({
        o: `sw.ex.p${k}`,
        then: [{ say: k === n * 3 ? 'sw.ex.right' : 'sw.ex.wrong', who }, { money: 'dinar', n: -n }, { money: 'pearl', n: n * 3 }, { say: 'sw.ex.done', who }],
      })),
    });
    return [
      { say: 'sw.ex.hello', who }, { say: 'sw.ex.rate', who },
      { ask: 'sw.ex.ask', who, opts: [...amounts.map((n): Opt => ({ o: `sw.ex.d${n}`, then: [quiz(n)] })), { o: 'sw.ex.nothing', then: [{ say: 'sw.ex.bye', who }] }] },
    ];
  };

  /** The muskrat carpenter: three planks for the broken boardwalk. */
  const muskrat = (s: Save): Step[] => {
    const who = 'sw_muskrat';
    if (kit.has(s, 'sw_walk_fixed')) return [{ say: 'sw.muskrat.done', who }];
    if (kit.has(s, 'sw_asked_muskrat') && count(s, 'sw_plank') >= 3) {
      return [{ take: 'sw_plank' }, { take: 'sw_plank' }, { take: 'sw_plank' }, { say: 'sw.muskrat.thanks1', who }, { fx: 'shake' }, { set: 'sw_walk_fixed' },
        { say: 'sw.muskrat.thanks2', who }, { money: 'pearl', n: 6 }, { say: 'sw.muskrat.thanks3', who }, { xp: 25, why: 'for mending the boardwalk' }];
    }
    if (kit.has(s, 'sw_asked_muskrat')) return [{ say: count(s, 'sw_plank') ? 'sw.muskrat.more' : 'sw.muskrat.reminder', who }];
    return [{ say: 'sw.muskrat.hello1', who }, { say: 'sw.muskrat.hello2', who }, { say: 'sw.muskrat.hello3', who }, { say: 'sw.muskrat.hello4', who }, { set: 'sw_asked_muskrat' }];
  };

  /** The toad on her lily pad: a plank for the right answer. */
  const toad = (s: Save): Step[] => {
    const who = 'sw_toad';
    if (kit.has(s, 'sw_toad_plank')) return [{ say: 'sw.toad.done', who }];
    if (!kit.has(s, 'sw_asked_muskrat')) return [{ say: 'sw.toad.hello1', who }, { say: 'sw.toad.hello2', who }];
    const wrong: Step[] = [{ say: 'sw.toad.wrong', who }];
    return [{ say: 'sw.toad.plank', who }, {
      ask: 'sw.toad.ask', who, opts: [
        { o: 'sw.toad.a1', then: wrong },
        { o: 'sw.toad.a2', then: [{ say: 'sw.toad.right', who }, { give: 'sw_plank' }, { set: 'sw_toad_plank' }, { xp: 10, why: 'for the riddle' }] },
        { o: 'sw.toad.a3', then: wrong },
      ],
    }];
  };

  const CAKES = ['sw_cake_honey', 'sw_cake_berry', 'sw_cake_fish'] as const;

  /** The cake stall: buy a cake by how it looks (the crocodile mumbled what he likes). */
  const duck = (s: Save): Step[] => {
    const who = 'sw_duck';
    if (kit.has(s, 'sw_croc_awake')) return [{ say: 'sw.duck.done', who }];
    const intro: Step[] = kit.has(s, 'sw_met_duck') ? [] : [{ say: 'sw.duck.hello1', who }, { say: 'sw.duck.hello2', who }, { set: 'sw_met_duck' }];
    if (pearls(s) < 4) return [...intro, { say: 'sw.duck.price', who }, { say: 'sw.duck.nomoney', who }];
    const buy = (c: string): Step[] => [{ money: 'pearl', n: -4 }, { give: c as ItemKind }, { say: 'sw.duck.thanks', who }];
    return [...intro, {
      ask: 'sw.duck.ask', who, opts: [
        { o: 'sw.duck.o_berry', then: buy('sw_cake_berry') },
        { o: 'sw.duck.o_honey', then: buy('sw_cake_honey') },
        { o: 'sw.duck.o_fish', then: buy('sw_cake_fish') },
        { o: 'sw.duck.nothing', then: [{ say: 'sw.duck.bye', who }] },
      ],
    }];
  };

  /** The crocodile asleep on the jetty: he talks in his sleep; the honey cake wakes him. */
  const croc = (s: Save): Step[] => {
    const who = 'sw_croc';
    const cakes = CAKES.filter((c) => s.items.includes(c));
    const sleep: Step[] = [{ say: 'sw.croc.sleep1' }, { say: 'sw.croc.sleep2', who }, { set: 'sw_heard_croc' }];
    if (!cakes.length) return sleep;
    return [{ say: 'sw.croc.sleep1' }, {
      ask: 'sw.croc.offer', opts: [
        ...cakes.map((c): Opt => ({
          o: `item.${c}`,
          then: c === 'sw_cake_honey'
            ? [{ take: c }, { say: 'sw.croc.wake1', who }, { fx: 'shake' }, { set: 'sw_croc_awake' }, { say: 'sw.croc.wake2', who }, { say: 'sw.croc.wake3', who },
              { xp: 25, why: 'for waking the crocodile' }]
            : [{ take: c }, { say: 'sw.croc.wrong', who }],
        })),
        { o: 'opt.no', then: [] },
      ],
    }];
  };

  /** The firefly's guided walk through the fog: follow her directions. */
  const firefly = (s: Save): Step[] => {
    const who = 'sw_firefly';
    if (kit.has(s, 'sw_fog_clear')) return [{ say: 'sw.ffly.done', who }];
    const lost: Step[] = [{ say: 'sw.ffly.lost', who }];
    const q = (n: number, right: string, then: Step[]): Step => ({
      ask: `sw.ffly.q${n}`, who, opts: ['sw.dir.left', 'sw.dir.straight', 'sw.dir.right'].map((d): Opt => ({ o: d, then: d === right ? then : lost })),
    });
    const intro: Step[] = kit.has(s, 'sw_met_firefly')
      ? [{ say: 'sw.ffly.again', who }]
      : [{ say: 'sw.ffly.hello1', who }, { say: 'sw.ffly.hello2', who }, { say: 'sw.ffly.hello3', who }, { set: 'sw_met_firefly' }];
    return [...intro, { say: 'sw.ffly.way', who },
      q(1, 'sw.dir.straight', [q(2, 'sw.dir.right', [q(3, 'sw.dir.left', [
        { say: 'sw.ffly.end1', who }, { fx: 'shake' }, { set: 'sw_fog_clear' }, { say: 'sw.ffly.end2', who }, { xp: 25, why: 'for the fog walk' }])])])];
  };

  const MARKET = ['sw_berries', 'sw_mushrooms', 'sw_onions'] as const;

  /** The catfish cook in Frog Harbour: bog soup needs something small, red and sour from the market. */
  const catfish = (s: Save): Step[] => {
    const who = 'sw_catfish';
    if (kit.has(s, 'sw_soup_done')) return [{ say: 'sw.cat.done', who }];
    if (kit.has(s, 'sw_asked_cat') && s.items.includes('sw_berries')) {
      return [{ take: 'sw_berries' }, { say: 'sw.cat.yes1', who }, { say: 'sw.cat.yes2', who }, { give: 'sw_soup' }, { money: 'pearl', n: 5 }, { set: 'sw_soup_done' },
        { xp: 20, why: 'for the bog soup' }];
    }
    const other = MARKET.find((m) => m !== 'sw_berries' && s.items.includes(m));
    if (kit.has(s, 'sw_asked_cat') && other) return [{ take: other }, { say: other === 'sw_mushrooms' ? 'sw.cat.mush' : 'sw.cat.onion', who }];
    if (kit.has(s, 'sw_asked_cat')) return [{ say: 'sw.cat.reminder', who }];
    return [{ say: 'sw.cat.hello1', who }, { say: 'sw.cat.hello2', who }, { say: 'sw.cat.hello3', who }, { set: 'sw_asked_cat' }];
  };

  /** The snail's vegetable stall at the canal market. */
  const snail = (s: Save): Step[] => {
    const who = 'sw_snail';
    if (pearls(s) < 2) return [{ say: 'sw.snail.hello', who }, { say: 'sw.snail.nomoney', who }];
    const buy = (i: string): Step[] => [{ money: 'pearl', n: -2 }, { give: i as ItemKind }, { say: 'sw.snail.thanks', who }];
    return [{ say: 'sw.snail.hello', who }, {
      ask: 'sw.snail.ask', who, opts: [
        { o: 'sw.snail.o_mush', then: buy('sw_mushrooms') },
        { o: 'sw.snail.o_onion', then: buy('sw_onions') },
        { o: 'sw.snail.o_berries', then: buy('sw_berries') },
        { o: 'sw.snail.nothing', then: [{ say: 'sw.snail.bye', who }] },
      ],
    }];
  };

  /** The dragonfly's kiosk: punt tour tickets and postcards. */
  const kiosk = (s: Save): Step[] => {
    const who = 'sw_dragonfly';
    const pay = (n: number, then: Step[]): Step[] => (pearls(s) >= n ? [{ money: 'pearl', n: -n }, ...then] : [{ say: 'sw.kiosk.nomoney', who }]);
    const opts: Opt[] = [];
    if (!s.items.includes('sw_ticket')) opts.push({ o: 'sw.kiosk.o_ticket', then: [{ say: 'sw.kiosk.ticketprice', who }, ...pay(5, [{ give: 'sw_ticket' }, { say: 'sw.kiosk.heron', who }])] });
    if (!s.items.includes('sw_postcard')) opts.push({ o: 'sw.kiosk.o_card', then: [{ say: 'sw.kiosk.cardprice', who }, ...pay(3, [{ give: 'sw_postcard' }, { say: 'sw.kiosk.thanks', who }])] });
    if (!opts.length) return [{ say: 'sw.kiosk.done', who }];
    return [{ say: 'sw.kiosk.hello', who }, { ask: 'sw.kiosk.ask', who, opts: [...opts, { o: 'sw.kiosk.nothing', then: [{ say: 'sw.kiosk.bye', who }] }] }];
  };

  /** The heron's punt tour round the canals (with a ticket from the kiosk). */
  const heron = (s: Save): Step[] => {
    const who = 'sw_heron';
    if (!s.items.includes('sw_ticket')) return [{ say: kit.has(s, 'sw_punt_done') ? 'sw.heron.again' : 'sw.heron.hello1', who }, { say: 'sw.heron.hello2', who }];
    return [{ take: 'sw_ticket' }, { say: 'sw.heron.board', who }, { say: 'sw.heron.tour1', who }, { say: 'sw.heron.tour2', who }, { say: 'sw.heron.tour3', who },
      { say: 'sw.heron.end', who }, ...(kit.has(s, 'sw_punt_done') ? [] : [{ set: 'sw_punt_done' }, { xp: 15, why: 'for the punt tour' } as Step])];
  };

  const SAYS: Record<string, string> = {
    sw_sign_moorheim: 'sw.sign.moorheim', sw_sign_broken: 'sw.sign.broken', sw_sign_reedton: 'sw.sign.reedton', sw_sign_north: 'sw.sign.north',
    sw_sign_foglake: 'sw.sign.foglake', sw_sign_harbour: 'sw.sign.harbour', sw_sign_frogharbour: 'sw.sign.frogharbour', sw_sign_mistmoor: 'sw.sign.mistmoor',
    sw_sign_market: 'sw.sign.market', sw_sign_border: 'sw.sign.border', sw_sign_border2: 'sw.sign.border2',
    brokenwalk: 'sw.broken.look', fog: 'sw.fog.look', beacon: 'sw.look.beacon', fishboat: 'sw.look.boat', office_swamp_door: 'house.office', exchange_hut: 'sw.look.exchange',
    sawhorse: 'sw.look.sawhorse', stall_fish: 'sw.look.fishstall', stall_cake: 'sw.look.cakestall',
  };
  const LOOK: Record<string, string> = {
    sw_punt: 'sw.look.punt', sw_marketboat: 'sw.look.marketboat', sw_net: 'sw.look.net', sw_trap: 'sw.look.trap', sw_lantern: 'sw.look.lantern',
    sw_deadtree: 'sw.look.deadtree', sw_cypress: 'sw.look.cypress', sw_reeds: 'sw.look.reeds', sw_mist: 'sw.look.mist',
  };

  /** Houses nobody opens: the cat only looks at them. */
  const LOCKED: Record<string, string> = { house_r4: 'sw.look.hut', house_r5: 'sw.look.hut', house_x9: 'sw.look.hut', exchange_hut: 'sw.look.exchange' };

  const script = (o: Obj, s: Save): Step[] | undefined => {
    switch (o.id) {
      case 'muskrat': return muskrat(s);
      case 'toad': return toad(s);
      case 'sw_otter': case 'desk_sw_exchange': return exchange(s);
      case 'sw_turtle': case 'desk_office_swamp': return kit.clerk('swamp', 'sw_turtle', s);
      case 'duck': case 'cakestall': return duck(s);
      case 'croc': return croc(s);
      case 'firefly': return firefly(s);
      case 'catfish': return catfish(s);
      case 'newt': return [{ say: 'sw.newt.hello1', who: 'sw_newt' }, { say: 'sw.newt.hello2', who: 'sw_newt' }];
      case 'snail': case 'marketstall': return snail(s);
      case 'dragonfly': case 'kiosk': return kiosk(s);
      case 'heron': case 'punt_x': return heron(s);
    }
    if (o.k === 'item' && o.item === 'sw_plank') return [{ say: 'pickup.sw_plank' }, { give: 'sw_plank' }, { set: `got_${o.id}` }];
    if (SAYS[o.id]) return [{ say: SAYS[o.id] }];
    if (o.k === 'decor' && LOCKED[o.id]) return [{ say: LOCKED[o.id] }];
    if (o.k === 'decor' && LOOK[o.art]) return [{ say: LOOK[o.art] }];
    return undefined;
  };

  const lineKeys = [
    ...Object.values(SAYS).filter((k) => k !== 'house.office'), ...new Set([...Object.values(LOOK), ...Object.values(LOCKED)]), ...RESIDENTS.flatMap((id) => kit.residentLines(id)), 'house.office', 'flag.swamp', 'gate.closed', 'opt.yes', 'opt.no', 'opt.notyet',
    'sw.ex.hello', 'sw.ex.rate', 'sw.ex.ask', 'sw.ex.d5', 'sw.ex.d10', 'sw.ex.d20', 'sw.ex.nothing', 'sw.ex.bye', 'sw.ex.none', 'sw.ex.quiz',
    ...[10, 15, 20, 30, 40, 60, 80].map((k) => `sw.ex.p${k}`), 'sw.ex.right', 'sw.ex.wrong', 'sw.ex.done',
    'sw.muskrat.hello1', 'sw.muskrat.hello2', 'sw.muskrat.hello3', 'sw.muskrat.hello4', 'sw.muskrat.reminder', 'sw.muskrat.more',
    'sw.muskrat.thanks1', 'sw.muskrat.thanks2', 'sw.muskrat.thanks3', 'sw.muskrat.done',
    'sw.toad.hello1', 'sw.toad.hello2', 'sw.toad.plank', 'sw.toad.ask', 'sw.toad.a1', 'sw.toad.a2', 'sw.toad.a3', 'sw.toad.right', 'sw.toad.wrong', 'sw.toad.done',
    'sw.duck.hello1', 'sw.duck.hello2', 'sw.duck.price', 'sw.duck.nomoney', 'sw.duck.ask', 'sw.duck.o_berry', 'sw.duck.o_honey', 'sw.duck.o_fish',
    'sw.duck.nothing', 'sw.duck.bye', 'sw.duck.thanks', 'sw.duck.done',
    'sw.croc.sleep1', 'sw.croc.sleep2', 'sw.croc.offer', 'sw.croc.wake1', 'sw.croc.wake2', 'sw.croc.wake3', 'sw.croc.wrong',
    'sw.ffly.hello1', 'sw.ffly.hello2', 'sw.ffly.hello3', 'sw.ffly.again', 'sw.ffly.way', 'sw.ffly.q1', 'sw.ffly.q2', 'sw.ffly.q3', 'sw.ffly.lost',
    'sw.ffly.end1', 'sw.ffly.end2', 'sw.ffly.done', 'sw.dir.left', 'sw.dir.straight', 'sw.dir.right',
    'sw.cat.hello1', 'sw.cat.hello2', 'sw.cat.hello3', 'sw.cat.reminder', 'sw.cat.mush', 'sw.cat.onion', 'sw.cat.yes1', 'sw.cat.yes2', 'sw.cat.done',
    'sw.newt.hello1', 'sw.newt.hello2',
    'sw.snail.hello', 'sw.snail.nomoney', 'sw.snail.ask', 'sw.snail.o_mush', 'sw.snail.o_onion', 'sw.snail.o_berries', 'sw.snail.nothing', 'sw.snail.bye', 'sw.snail.thanks',
    'sw.kiosk.hello', 'sw.kiosk.ask', 'sw.kiosk.o_ticket', 'sw.kiosk.o_card', 'sw.kiosk.nothing', 'sw.kiosk.bye', 'sw.kiosk.ticketprice', 'sw.kiosk.cardprice',
    'sw.kiosk.heron', 'sw.kiosk.thanks', 'sw.kiosk.nomoney', 'sw.kiosk.done',
    'sw.heron.hello1', 'sw.heron.hello2', 'sw.heron.again', 'sw.heron.board', 'sw.heron.tour1', 'sw.heron.tour2', 'sw.heron.tour3', 'sw.heron.end',
    // kit.clerkLines can't be called while world.ts is still loading (it is defined after the modules are built)
    ...['hello1', 'hello2', 'ready', 'pass', 'gate', 'fail', 'later', 'done'].map((k) => `sw_turtle.${k}`),
    'pickup.sw_plank', ...ITEM_KINDS.map((i) => `item.${i}`),
  ];

  return {
    country: 'swamp', flag: ['#4a6a3a', '#8aa0a0'], ink: '#3e5a40',
    lines: ['sw.', 'sw_', 'item.sw_', 'pickup.sw_', 'thing.sw_', 'flag.swamp'],
    maps: [MOORHEIM, REEDTON, FOGLAKE, FROGHARBOUR, MISTMOOR, BORDER, EXCHANGE, OFFICE, ...HOMES],
    entry: { map: 'moorheim', cells: [[34, 12], [34, 13]], dir: 'left' },
    exit: { map: 'border_swamp', cells: [[28, 9], [28, 10]], dir: 'left' },
    script, lineKeys,
    places: {
      swamp: 'Swamp', moorheim: 'Bog Village', reedton: 'Reedton', foglake: 'Fog Lake', frogharbour: 'Frog Harbour', mistmoor: 'Mistmoor',
      border_swamp: 'Border Bog', sw_exchange: 'Bog Village exchange office', office_swamp: 'Swamp border office',
      sw_home_peat: "Peat cutter's hut", sw_home_herbs: "Herbalist's hut", sw_home_thatch: "Thatcher's house", sw_home_baskets: "Basket weaver's house",
      sw_home_granny: "Storyteller's house", sw_home_fisher: "Fisherman's house", sw_home_painter: "Painter's hut", sw_home_maps: "Mapmaker's house",
      sw_home_boats: "Boat builder's workshop", sw_home_weather: "Weather watcher's house", sw_home_scholar: "Scholar's house", sw_home_choir: "Musician's house",
      sw_home_bees: "Beekeeper's house", sw_home_fireflies: "Firefly keeper's house", sw_home_cook: "Cook's house", sw_home_birds: "Birdwatcher's house",
    },
    npcKinds: [...NPC_KINDS],
    things: [...NPC_KINDS, ...THINGS],
  };
};

/** The Swamp's animals. */
const NPC_KINDS = ['sw_muskrat', 'sw_toad', 'sw_otter', 'sw_croc', 'sw_duck', 'sw_firefly', 'sw_catfish', 'sw_newt', 'sw_snail', 'sw_dragonfly', 'sw_heron', 'sw_turtle'] as const;
const ITEM_KINDS = ['sw_plank', 'sw_cake_honey', 'sw_cake_berry', 'sw_cake_fish', 'sw_berries', 'sw_mushrooms', 'sw_onions', 'sw_soup', 'sw_ticket', 'sw_postcard'] as const;
/** "Name it" keys: the Swamp's buildings and props (decor art names), roadblocks and bare tiles. */
const THINGS = [
  'sw_stilthut', 'sw_exchange', 'sw_reedhouse', 'sw_reedhouse2', 'sw_pilehouse', 'sw_pilehouse2', 'sw_office', 'sw_cypress', 'sw_deadtree', 'sw_lantern',
  'sw_reeds', 'sw_punt', 'sw_marketboat', 'sw_fishboat', 'sw_net', 'sw_trap', 'sw_sawhorse', 'sw_stall_fish', 'sw_stall_veg', 'sw_stall_cake', 'sw_kiosk',
  'sw_beacon', 'sw_mist', 'sw_brokenwalk', 'sw_croc_sleep', 'sw_fog', 'sw_bog', 'sw_water', 'sw_stump', 'sw_swampforest', 'sw_bogflower',
  // inside the homes
  'sw_bed', 'sw_bed2', 'sw_table', 'sw_herbtable', 'sw_maptable', 'sw_honeytable', 'sw_fishtable', 'sw_caketable', 'sw_toolbench', 'sw_shelf',
  'sw_bookshelf', 'sw_honeyshelf', 'sw_toolshelf', 'sw_stove', 'sw_herbs', 'sw_pitcher', 'sw_lightjars', 'sw_netpile', 'sw_boatframe', 'sw_peat',
  'sw_reedbundle', 'sw_baskets', 'sw_stool', 'sw_finds', 'sw_rug', 'sw_reedmat', 'sw_plantpot', 'sw_floorlamp', 'sw_firewood',
] as const;
