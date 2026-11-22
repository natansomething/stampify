/**
 * The Sun Coast: the last country, the holiday at the end of the journey. No border and no exam: the cat arrives
 * from the Swamp with pearls, changes them into sols and goes on holiday, east and north along the coast to Shell
 * Bay, where the deck chair waits (the ending).
 *
 * Palm Village (tide over the road: read the tide table) → Sunport (resort city, station; check in at the hotel to
 * get the key card for the beach path gate) → Seaside (pier, ice cream; the lifeguard lost his green flag, so the
 * beach path north is closed) ↔ Coral Town (side road: book a snorkelling lesson, find the flag in the reef) →
 * Lighthouse (the keeper is thirsty: bring a lemonade from Seaside) → Shell Bay (rent the deck chair, the end).
 * Side quests: a postcard home (souvenir shop and postbox), the lighthouse keeper's lemonade, ice cream.
 */
import type { CountryModule, Kit, MapDef, Obj, Opt, Save, Step } from '../world';
import { LIGHTHOUSE_AT } from './beach-art';

/** Animals of the Sun Coast (sprites in beach-art.ts). */
const KINDS = ['bc_pelican', 'bc_seaturtle', 'bc_hermit', 'bc_otter', 'bc_retriever', 'bc_starfish', 'bc_octopus', 'bc_dolphin', 'bc_puffin', 'bc_iguana'];

/** Decor with a "name it" key of its own (each is a thing: line `thing.<art>`). */
const DECOR_THINGS = [
  'bc_hut', 'bc_exchange', 'bc_boat', 'bc_nets', 'bc_parasol_r', 'bc_parasol_b', 'bc_parasol_y', 'bc_lounger', 'bc_station', 'bc_hotel', 'bc_hotel2',
  'bc_villa', 'bc_pool', 'bc_hotelgate', 'bc_tide', 'bc_rope', 'bc_wheel', 'bc_shop', 'bc_postbox', 'bc_yacht', 'bc_buoy', 'bc_lighthouse', 'bc_cottage',
  'bc_dive', 'bc_tower', 'bc_cabins', 'bc_sandcastle', 'bc_surf', 'bc_rockpool', 'bc_icecart', 'bc_rental', 'bc_hammock', 'bc_palm', 'bc_kayak',
  'bc_scope', 'bc_palmpot', 'bc_bed', 'bc_shelf', 'bc_kitchen', 'bc_dtable', 'bc_armchair', 'bc_aquarium', 'bc_lens', 'bc_spiral',
  'bc_chest', 'bc_netpile', 'bc_easel', 'bc_painting', 'bc_shipwheel', 'bc_chart', 'bc_lamp', 'bc_catbed', 'bc_basket', 'bc_stool', 'bc_oars', 'bc_house_y', 'bc_house_p', 'bc_house_m', 'bc_tiki', 'bc_dolphins', 'bc_driftwood',
];

/** Sums of money said in the shops (bc_sol.<n>). */
const SOLS = [2, 3, 4, 5, 6, 10, 12, 13, 14, 15, 16, 18, 20, 30, 40, 50, 60];

/** The people at home on the coast (residents: the shared script says <id>.1, .2, then .3). */
const RESIDENTS = ['res_bc_anke', 'res_bc_wilhelm', 'res_bc_rosa', 'res_bc_konrad', 'res_bc_hinrich', 'res_bc_erna', 'res_bc_finn', 'res_bc_meike',
  'res_bc_jan', 'res_bc_ole', 'res_bc_wiebke'];

const ITEMS = ['bc_card', 'bc_flag', 'bc_lemonade', 'bc_stamp', 'bc_necklace'];

export default (kit: Kit): CountryModule => {
  const { edge } = kit;
  const has = (s: Save, f: string) => kit.has(s, f);
  const holds = (s: Save, i: string) => s.items.includes(i);

  // ---------------------------------------------------------------- maps

  /** A small room of the coast: terracotta floor, white walls with blue tiles, someone behind a counter. */
  const room = (id: string, clerk: string, kind: string, back: string, bx: number, by: number, at: string, extra: Obj[]): MapDef => ({
    id, at, country: 'beach', theme: 'bcroom', spawn: { x: 5, y: 7, dir: 'up' },
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
      { k: 'npc', id: clerk, x: 5, y: 2, npc: kind },
      { k: 'desk', id: `desk_${id}`, x: 3, y: 3, clerk },
      ...extra,
    ],
    warps: [{ x: 5, y: 8, to: back, tx: bx, ty: by, dir: 'down' }],
  });

  /**
   * A home: walls round a floor of `w`×`h` tiles (theme: bcroom white and blue, bchut rattan and planks, bcstone the
   * lighthouse), the door mat at `mx` leading back to just in front of the house's door.
   */
  const home = (id: string, theme: string, w: number, h: number, mx: number, back: string, bx: number, by: number, objs: Obj[], rugs: [number, number, number, number, string][] = []): MapDef => {
    const rows = Array.from({ length: h }, (_, y) => y < 2 ? '#'.repeat(w) : y === h - 1 ? '#'.repeat(mx) + ':' + '#'.repeat(w - mx - 1) : '#' + '.'.repeat(w - 2) + '#');
    // rugs: walkable floor detail ('r' red, 'y' woven straw, 'w' blue)
    for (const [rx, ry, rw, rh, c] of rugs) for (let y = ry; y < ry + rh; y++) rows[y] = rows[y].slice(0, rx) + c.repeat(rw) + rows[y].slice(rx + rw);
    return { id, at: back, country: 'beach', theme, spawn: { x: mx, y: h - 2, dir: 'up' }, rows, objs, warps: [{ x: mx, y: h - 1, to: back, tx: bx, ty: by, dir: 'down' }] };
  };
  const d = (id: string, x: number, y: number, art: string): Obj => ({ k: 'decor', id, x, y, art });
  const res = (id: string, x: number, y: number, npc: string): Obj => ({ k: 'npc', id, x, y, npc });
  const plant = (x: number, y: number): Obj => ({ k: 'plant', id: 'plant', x, y });

  const HOMES: MapDef[] = [
    // a fisherwoman's hut: nets drying in the corner, oars and a ship's wheel on the wall, a table for supper
    home('bc_home_anke', 'bchut', 10, 8, 5, 'palmvillage', 4, 7, [
      d('bed', 1, 2, 'bc_bed'), d('lamp', 2, 2, 'bc_lamp'), d('kitchen', 6, 2, 'bc_kitchen'), d('n1', 8, 2, 'bc_netpile'), d('n2', 8, 3, 'bc_netpile'),
      d('oars', 4, 0, 'bc_oars'), d('wheel', 8, 0, 'bc_shipwheel'), d('table', 3, 4, 'bc_dtable'), d('stool1', 2, 4, 'bc_stool'), d('stool2', 5, 4, 'bc_stool'),
      d('basket', 1, 6, 'bc_basket'), d('chest', 8, 6, 'bc_chest'), d('crates', 7, 6, 'crates'), res('res_bc_anke', 6, 5, 'bc_pelican'),
    ], [[2, 3, 5, 3, 'y']]),
    // an old sea turtle's hut: books, a reading corner with an armchair and lamp, an aquarium
    home('bc_home_wilhelm', 'bchut', 9, 8, 4, 'palmvillage', 10, 6, [
      d('shelf1', 1, 2, 'bc_shelf'), d('shelf2', 3, 2, 'bc_shelf'), d('painting', 4, 0, 'bc_painting'), d('lamp', 1, 4, 'bc_lamp'), d('chair', 2, 4, 'bc_armchair'),
      d('stool', 3, 5, 'bc_stool'), d('aquarium', 5, 5, 'bc_aquarium'), d('bed', 7, 2, 'bc_bed'), plant(6, 2), d('basket', 7, 6, 'bc_basket'),
      res('res_bc_wilhelm', 4, 3, 'bc_seaturtle'),
    ], [[1, 4, 3, 2, 'r']]),
    // the café on the ground floor of the full hotel: a counter, little tables with stools, plants
    home('bc_cafe', 'bcroom', 13, 9, 6, 'sunport', 15, 6, [
      d('kitchen', 1, 2, 'bc_kitchen'), d('shelf', 3, 2, 'bc_shelf'), d('basket', 4, 2, 'bc_basket'), d('p1', 4, 0, 'bc_painting'), d('p2', 8, 0, 'bc_painting'),
      d('t1', 2, 5, 'table'), d('s1', 1, 5, 'bc_stool'), d('s2', 3, 5, 'bc_stool'), d('t2', 9, 5, 'table'), d('s3', 8, 5, 'bc_stool'), d('s4', 10, 5, 'bc_stool'),
      d('t3', 9, 3, 'table'), d('s5', 8, 3, 'bc_stool'), d('s6', 10, 3, 'bc_stool'), plant(11, 2), plant(1, 7), d('lamp', 11, 7, 'bc_lamp'),
      res('res_bc_rosa', 6, 3, 'bc_otter'),
    ], [[5, 4, 3, 3, 'w']]),
    // a painter's studio: two easels, paintings everywhere, pots of paint in crates
    home('bc_home_konrad', 'bcroom', 11, 9, 5, 'sunport', 33, 7, [
      d('easel1', 3, 4, 'bc_easel'), d('easel2', 7, 4, 'bc_easel'), d('stool', 3, 5, 'bc_stool'), d('p1', 1, 0, 'bc_painting'), d('p2', 4, 0, 'bc_painting'),
      d('p3', 8, 0, 'bc_painting'), d('shelf', 1, 2, 'bc_shelf'), plant(4, 2), d('bed', 9, 2, 'bc_bed'), d('crates', 9, 6, 'crates'), d('chair', 8, 6, 'bc_armchair'),
      d('lamp', 1, 6, 'bc_lamp'), d('basket', 2, 6, 'bc_basket'), res('res_bc_konrad', 5, 3, 'bc_hermit'),
    ], [[6, 5, 3, 2, 'r']]),
    // an old sailor's house: the ship's wheel and a sea chart on the wall, sea chests, a telescope at the window
    home('bc_home_hinrich', 'bcroom', 12, 9, 6, 'seaside', 36, 11, [
      d('oars', 1, 0, 'bc_oars'), d('wheel', 4, 0, 'bc_shipwheel'), d('chart', 7, 0, 'bc_chart'), d('shelf', 1, 2, 'bc_shelf'), d('bed', 10, 2, 'bc_bed'),
      d('table', 4, 4, 'bc_dtable'), d('st1', 3, 4, 'bc_stool'), d('st2', 6, 4, 'bc_stool'), d('chest1', 1, 7, 'bc_chest'), d('chest2', 2, 7, 'bc_chest'),
      d('scope', 9, 6, 'bc_scope'), d('lamp', 10, 5, 'bc_lamp'), d('n', 1, 5, 'bc_netpile'), res('res_bc_hinrich', 7, 3, 'bc_retriever'),
    ], [[3, 3, 4, 3, 'w']]),
    // a grandmother's kitchen: cookies on the table, a cat bed, a reading chair
    home('bc_home_erna', 'bcroom', 10, 8, 4, 'seaside', 22, 11, [
      d('chair', 1, 2, 'bc_armchair'), d('lamp', 2, 2, 'bc_lamp'), d('kitchen', 5, 2, 'bc_kitchen'), d('shelf', 7, 2, 'bc_shelf'), plant(8, 2),
      d('p1', 4, 0, 'bc_painting'), d('p2', 8, 0, 'bc_painting'), d('table', 2, 4, 'bc_dtable'), d('st1', 1, 4, 'bc_stool'), d('catbed', 8, 6, 'bc_catbed'),
      d('basket', 1, 6, 'bc_basket'), res('res_bc_erna', 6, 3, 'bc_seaturtle'),
    ], [[5, 4, 3, 2, 'r']]),
    // a surfer's room: boards along the wall, a tank, things everywhere
    home('bc_home_finn', 'bcroom', 11, 8, 5, 'seaside', 39, 22, [
      d('s1', 1, 2, 'bc_surf'), d('s2', 3, 2, 'bc_surf'), d('s3', 4, 2, 'bc_surf'), d('oars', 5, 0, 'bc_oars'), d('p', 8, 0, 'bc_painting'), d('lamp', 8, 2, 'bc_lamp'),
      d('bed', 9, 2, 'bc_bed'), d('aquarium', 6, 5, 'bc_aquarium'), d('stool', 8, 5, 'bc_stool'), d('chest', 1, 6, 'bc_chest'), d('basket', 2, 6, 'bc_basket'),
      d('crates', 9, 6, 'crates'), res('res_bc_finn', 4, 3, 'bc_otter'),
    ], [[2, 4, 3, 2, 'y']]),
    // a reef researcher's hut: tanks of coral, books, a chart and a desk
    home('bc_home_meike', 'bchut', 12, 8, 6, 'coral', 22, 7, [
      d('a1', 1, 2, 'bc_aquarium'), d('a2', 3, 2, 'bc_aquarium'), d('shelf', 5, 2, 'bc_shelf'), d('chart', 7, 0, 'bc_chart'), d('p', 4, 0, 'bc_painting'),
      d('table', 8, 4, 'bc_dtable'), d('st1', 7, 4, 'bc_stool'), d('st2', 10, 4, 'bc_stool'), d('bed', 10, 2, 'bc_bed'), d('lamp', 9, 2, 'bc_lamp'),
      d('basket', 1, 6, 'bc_basket'), d('chest', 2, 6, 'bc_chest'), plant(10, 6), res('res_bc_meike', 6, 4, 'bc_starfish'),
    ], [[1, 4, 4, 2, 'w']]),
    // an old fisherman's hut: nets, oars, a stove, a cat bed for visiting cats
    home('bc_home_jan', 'bchut', 9, 8, 4, 'coral', 4, 5, [
      d('n1', 1, 2, 'bc_netpile'), d('n2', 2, 2, 'bc_netpile'), d('basket', 3, 2, 'bc_basket'), d('oars', 4, 0, 'bc_oars'), d('wheel', 5, 0, 'bc_shipwheel'),
      d('bed', 7, 2, 'bc_bed'), d('kitchen', 1, 5, 'bc_kitchen'), d('chest', 7, 5, 'bc_chest'), d('stool', 6, 4, 'bc_stool'), d('catbed', 7, 6, 'bc_catbed'),
      res('res_bc_jan', 5, 3, 'bc_pelican'),
    ], [[3, 3, 3, 2, 'y']]),
    // inside the lighthouse: the great lens, the spiral stairs up to the lamp room, oil and spare parts
    home('bc_lighthouse_in', 'bcstone', 9, 9, 4, 'lighthouse', 7, 4, [
      d('lens', 3, 3, 'bc_lens'), d('stairs', 6, 2, 'bc_spiral'), d('chart', 3, 0, 'bc_chart'), d('chest', 1, 7, 'bc_chest'), d('crates', 7, 7, 'crates'),
      d('lamp', 7, 5, 'bc_lamp'), d('stool', 1, 5, 'bc_stool'), d('barrel', 1, 2, 'barrel'), res('res_bc_ole', 2, 4, 'bc_puffin'),
    ], [[3, 5, 3, 2, 'r']]),
    // the lighthouse keeper's cottage: a kitchen with tea, a cosy chair, a cat bed
    home('bc_home_wiebke', 'bcroom', 11, 8, 5, 'lighthouse', 11, 4, [
      d('kitchen', 1, 2, 'bc_kitchen'), d('shelf', 3, 2, 'bc_shelf'), plant(4, 2), d('p1', 4, 0, 'bc_painting'), d('p2', 8, 0, 'bc_painting'),
      d('table', 3, 4, 'bc_dtable'), d('st1', 2, 4, 'bc_stool'), d('st2', 5, 4, 'bc_stool'), d('bed', 9, 2, 'bc_bed'), d('chair', 8, 5, 'bc_armchair'),
      d('lamp', 9, 5, 'bc_lamp'), d('catbed', 7, 6, 'bc_catbed'), res('res_bc_wiebke', 7, 3, 'bc_hermit'),
    ], [[2, 5, 5, 1, 'r']]),
  ];

  /** Palm Village: straw-roofed huts between the palms, fishing boats on the beach, and the tide over the road east. */
  const PALMVILLAGE: MapDef = {
    id: 'palmvillage', at: 'palmvillage', country: 'beach', theme: 'coast', spawn: { x: 2, y: 11, dir: 'right' },
    rows: [
      '########################################',
      '########################################',
      '###......####.........####...###########',
      '##.................y.........###########',
      '##...........................###########',
      '##.r.........................###########',
      '##...........................###########',
      '##..""".............w....""..###########',
      '##.""""".............."""".......#######',
      '##...........................###########',
      '##...........................###########',
      '::::::::::::::::::::::::::::::::::::::::',
      '::::::::::::::::::::::::::::::::::::::::',
      '#............................~~~~......#',
      '#...........................~~~~~~.....#',
      '#..y.......................~~~~~~~~....#',
      '........................~~~~~~~~~~~~....',
      '............~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '......~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '..~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    ],
    objs: [
      { k: 'decor', id: 'hut1', x: 3, y: 5, art: 'bc_hut' },
      { k: 'decor', id: 'hut2', x: 9, y: 4, art: 'bc_hut' },
      { k: 'decor', id: 'exchange', x: 15, y: 5, art: 'bc_exchange' },
      { k: 'decor', id: 'hut3', x: 22, y: 4, art: 'bc_hut' },
      { k: 'sign', id: 'sign_palmvillage', x: 3, y: 10 },
      { k: 'sign', id: 'sign_tide', x: 27, y: 10 },
      { k: 'npc', id: 'turtle', x: 27, y: 13, npc: 'bc_seaturtle' },
      { k: 'block', id: 'tide', x: 29, y: 11, art: 'bc_tide', until: 'bc_tide' },
      { k: 'decor', id: 'boat1', x: 5, y: 14, art: 'bc_boat' },
      { k: 'decor', id: 'boat2', x: 17, y: 15, art: 'bc_boat' },
      { k: 'decor', id: 'nets', x: 11, y: 14, art: 'bc_nets' },
      { k: 'npc', id: 'fisher', x: 20, y: 14, npc: 'bc_pelican' },
      { k: 'npc', id: 'kid', x: 9, y: 16, npc: 'bc_hermit' },
      { k: 'decor', id: 'parasol1', x: 34, y: 14, art: 'bc_parasol_r' },
      { k: 'decor', id: 'lounger1', x: 36, y: 15, art: 'bc_lounger' },
      { k: 'decor', id: 'kayak', x: 1, y: 16, art: 'bc_kayak' },
      { k: 'decor', id: 'buoy1', x: 14, y: 19, art: 'bc_buoy' },
      { k: 'decor', id: 'buoy2', x: 33, y: 20, art: 'bc_buoy' },
    ],
    warps: [
      ...edge(0, [11, 12], '@prev', 0, [0, 0], 'left'),
      ...edge(39, [11, 12], 'sunport', 1, [16, 17], 'right'),
      { x: 16, y: 6, to: 'bc_exchange', tx: 5, ty: 7, dir: 'up', door: true },
      { x: 4, y: 6, to: 'bc_home_anke', tx: 5, ty: 6, dir: 'up', door: true },
      { x: 10, y: 5, to: 'bc_home_wilhelm', tx: 4, ty: 6, dir: 'up', door: true },
    ],
  };

  /** Sunport: the resort city. The station, hotels round a square with a fountain, the promenade and the beach. */
  const SUNPORT: MapDef = {
    id: 'sunport', at: 'sunport', country: 'beach', theme: 'resort', spawn: { x: 2, y: 16, dir: 'right' },
    rows: [
      '########################################::##',
      '########################################::##',
      '########################################::##',
      '#::::::::::::::::::::::::::::::::::::::#::##',
      '#::::::::::::::::::::::::::::::::::::::#::##',
      '#::::::::::::::::::::::::::::::::::::::#::##',
      '#::::::::::::::::::::::::::::::::::::::#::##',
      '#::::""""::::::::::::::::::::""""::::::#::##',
      '#::::::::::::::::::::::::::::::::::::::#::##',
      '#::::::::::::::::::::::::::::::::::::::#::##',
      '#:::::o::::::o::::::::::::o::::::o:::::#::##',
      '#:::::::::::::::::::::::::::::::::::::::::##',
      '#:::::::::::::::::::::::::::::::::::::::::##',
      '#:::::::::::::::::::::::::::::::::::::::::##',
      '#:::::::::::::::::::::::::::::::::::::::::##',
      '#:::::::::::::::::::::::::::::::::::::::::##',
      '::::::::::::::::::::::::::::::::::::::::::##',
      '::::::::::::::::::::::::::::::::::::::::::##',
      '......................................######',
      '....r.................y.............~~~~~~~~',
      '......................y...........~~~~~~~~~~',
      '..w..............................~~~~~~~~~~~',
      '..............................~~~~~~~~~~~~~~',
      '.....................~~~~~~~~~~~~~~~~~~~~~~~',
      '..........~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '...~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    ],
    objs: [
      { k: 'decor', id: 'station', x: 2, y: 3, art: 'bc_station' },
      { k: 'decor', id: 'hotel2', x: 12, y: 3, art: 'bc_hotel2' },
      { k: 'decor', id: 'hotel', x: 22, y: 4, art: 'bc_hotel' },
      { k: 'decor', id: 'villa1', x: 31, y: 5, art: 'bc_villa' },
      { k: 'decor', id: 'pool', x: 35, y: 8, art: 'bc_pool' },
      { k: 'block', id: 'hotelgate', x: 40, y: 9, art: 'bc_hotelgate', until: 'bc_gate' },
      { k: 'fountain', id: 'fountain', x: 18, y: 11 },
      { k: 'decor', id: 'palmpot1', x: 9, y: 8, art: 'bc_palmpot' }, { k: 'decor', id: 'palmpot2', x: 15, y: 8, art: 'bc_palmpot' },
      { k: 'decor', id: 'palmpot3', x: 22, y: 12, art: 'bc_palmpot' }, { k: 'decor', id: 'palmpot4', x: 12, y: 12, art: 'bc_palmpot' },
      { k: 'decor', id: 'table1', x: 12, y: 7, art: 'table' }, { k: 'decor', id: 'table2', x: 13, y: 7, art: 'table' },
      { k: 'decor', id: 'surf', x: 30, y: 7, art: 'bc_surf' },
      { k: 'sign', id: 'sign_sunport', x: 2, y: 14 },
      { k: 'lamp', id: 'lamp', x: 5, y: 15 }, { k: 'lamp', id: 'lamp', x: 13, y: 15 }, { k: 'lamp', id: 'lamp', x: 21, y: 15 },
      { k: 'lamp', id: 'lamp', x: 29, y: 15 }, { k: 'lamp', id: 'lamp', x: 37, y: 15 },
      { k: 'decor', id: 'bench1', x: 9, y: 15, art: 'bench' }, { k: 'decor', id: 'bench2', x: 25, y: 15, art: 'bench' },
      { k: 'decor', id: 'bench3', x: 33, y: 15, art: 'bench' },
      { k: 'decor', id: 'parasol1', x: 6, y: 20, art: 'bc_parasol_b' },
      { k: 'decor', id: 'parasol2', x: 12, y: 19, art: 'bc_parasol_r' },
      { k: 'decor', id: 'parasol3', x: 17, y: 21, art: 'bc_parasol_y' },
      { k: 'decor', id: 'parasol4', x: 25, y: 19, art: 'bc_parasol_b' },
      { k: 'decor', id: 'parasol5', x: 29, y: 21, art: 'bc_parasol_r' },
      { k: 'decor', id: 'lounger1', x: 8, y: 20, art: 'bc_lounger' },
      { k: 'decor', id: 'lounger2', x: 27, y: 19, art: 'bc_lounger' },
      { k: 'decor', id: 'sandcastle', x: 20, y: 22, art: 'bc_sandcastle' },
      { k: 'decor', id: 'yacht1', x: 37, y: 21, art: 'bc_yacht' },
      { k: 'decor', id: 'yacht2', x: 26, y: 26, art: 'bc_yacht' },
      { k: 'decor', id: 'buoy1', x: 12, y: 26, art: 'bc_buoy' },
      { k: 'npc', id: 'amb_sp1', x: 15, y: 20, npc: 'bc_seaturtle' },
      { k: 'npc', id: 'amb_sp2', x: 30, y: 12, npc: 'bc_pelican' },
    ],
    warps: [
      ...edge(0, [16, 17], 'palmvillage', 38, [11, 12], 'left'),
      ...[40, 41].map((x) => ({ x, y: 0, to: 'seaside', tx: x - 16, ty: 28, dir: 'up' as const })),
      { x: 5, y: 5, to: 'station_sunport', tx: 11, ty: 13, dir: 'up', door: true },
      { x: 25, y: 6, to: 'bc_hotel', tx: 5, ty: 7, dir: 'up', door: true },
      { x: 15, y: 5, to: 'bc_cafe', tx: 6, ty: 7, dir: 'up', door: true },
      { x: 33, y: 6, to: 'bc_home_konrad', tx: 5, ty: 7, dir: 'up', door: true },
    ],
  };

  /** Seaside: the beach town. A boardwalk along the beach, a pier with a Ferris wheel, ice cream, the lifeguard. */
  const SEASIDE: MapDef = {
    id: 'seaside', at: 'seaside', country: 'beach', theme: 'seaside', spawn: { x: 24, y: 27, dir: 'up' },
    rows: [
      '~~~~~~~~~~~~~~~~::##########################',
      '~~~~~~~~~~~~~~~~::##########################',
      '~~~~~~~~~~~~~~~~::##########################',
      '~~~~~~~~~~~~~~~~::##########################',
      '~~~~~~~~~~~~~~~~::##########################',
      '~~~~~~~~~~~~~~~~::##########################',
      '~~~~~~~~~~~~~~..::##########################',
      '~~~~~~~~~~~.....::##......................##',
      '~~~~~~~~~~......::........................##',
      '~~~~~~~~~~......::.....r..................##',
      '~~~~~~~~~~......::........................##',
      '~~~~~~~~~.......::........................##',
      '~~~~~~::::::::::::......................y.##',
      '~~~~~~::::::::::::........................##',
      '~~~~~~~~~.......::........................##',
      '~~~~~~~~~~......::::::::::::::::::::::::::::',
      '~~~~~~~~~~......::::::::::::::::::::::::::::',
      '~~~~~~~~~~......::......::................##',
      '~~~~~~~~~~......::......::................##',
      '~~~~~~~~~~~.....::......::.......w........##',
      '~~~~~~~~~~~.....::......::................##',
      '~~~~~~~~~~......::......::................##',
      '~~~~~~~~~.......::......::................##',
      '~~~~~~~~~~......::......::.......""""""...##',
      '~~~~~~~~~~~.....::......::......""""""""..##',
      '~~~~~~~~~~~~....::......::................##',
      '~~~~~~~~~~~~....::......::................##',
      '~~~~~~~~~~~~~...::......::................##',
      '~~~~~~~~~~~~~###########::##################',
      '~~~~~~~~~~~~~###########::##################',
    ],
    objs: [
      { k: 'block', id: 'rope', x: 16, y: 5, art: 'bc_rope', until: 'bc_flag_up' },
      { k: 'npc', id: 'lifeguard', x: 15, y: 7, npc: 'bc_retriever' },
      { k: 'decor', id: 'tower', x: 12, y: 9, art: 'bc_tower' },
      { k: 'decor', id: 'wheel', x: 2, y: 12, art: 'bc_wheel' },
      { k: 'decor', id: 'shop', x: 26, y: 9, art: 'bc_shop' },
      { k: 'decor', id: 'postbox', x: 31, y: 10, art: 'bc_postbox' },
      { k: 'decor', id: 'villa1', x: 34, y: 9, art: 'bc_house_y' },
      { k: 'decor', id: 'villa2', x: 20, y: 9, art: 'bc_house_p' },
      { k: 'decor', id: 'cabins', x: 19, y: 19, art: 'bc_cabins' },
      { k: 'decor', id: 'icecart', x: 27, y: 19, art: 'bc_icecart' },
      { k: 'npc', id: 'starfish', x: 27, y: 18, npc: 'bc_starfish' },
      { k: 'decor', id: 'table1', x: 31, y: 18, art: 'table' }, { k: 'decor', id: 'table2', x: 34, y: 18, art: 'table' },
      { k: 'decor', id: 'villa3', x: 37, y: 20, art: 'bc_house_m' },
      { k: 'decor', id: 'villa4', x: 30, y: 25, art: 'bc_villa' },
      { k: 'decor', id: 'palm1', x: 22, y: 13, art: 'bc_palm' }, { k: 'decor', id: 'palm2', x: 38, y: 13, art: 'bc_palm' },
      { k: 'decor', id: 'palm3', x: 19, y: 23, art: 'bc_palm' }, { k: 'decor', id: 'palm4', x: 40, y: 26, art: 'bc_palm' },
      { k: 'decor', id: 'tiki', x: 19, y: 12, art: 'bc_tiki' },
      { k: 'decor', id: 'parasol1', x: 10, y: 15, art: 'bc_parasol_y' },
      { k: 'decor', id: 'parasol2', x: 13, y: 18, art: 'bc_parasol_r' },
      { k: 'decor', id: 'parasol3', x: 11, y: 22, art: 'bc_parasol_b' },
      { k: 'decor', id: 'lounger1', x: 13, y: 20, art: 'bc_lounger' },
      { k: 'decor', id: 'surf', x: 14, y: 25, art: 'bc_surf' },
      { k: 'decor', id: 'yacht', x: 2, y: 22, art: 'bc_yacht' },
      { k: 'decor', id: 'buoy1', x: 4, y: 9, art: 'bc_buoy' },
      { k: 'lamp', id: 'lamp', x: 18, y: 11 }, { k: 'lamp', id: 'lamp', x: 18, y: 21 }, { k: 'lamp', id: 'lamp', x: 15, y: 11 },
      { k: 'sign', id: 'sign_seaside', x: 26, y: 26 },
      { k: 'npc', id: 'amb_ss1', x: 8, y: 13, npc: 'bc_otter' },
      { k: 'npc', id: 'amb_ss2', x: 35, y: 15, npc: 'bc_iguana' },
    ],
    warps: [
      ...[16, 17].map((x) => ({ x, y: 0, to: 'lighthouse', tx: x + 3, ty: 28, dir: 'up' as const })),
      ...[24, 25].map((x) => ({ x, y: 29, to: 'sunport', tx: x + 16, ty: 1, dir: 'down' as const })),
      ...edge(43, [15, 16], 'coral', 1, [11, 12], 'right'),
      { x: 27, y: 10, to: 'bc_shop', tx: 5, ty: 7, dir: 'up', door: true },
      { x: 36, y: 10, to: 'bc_home_hinrich', tx: 6, ty: 7, dir: 'up', door: true },
      { x: 22, y: 10, to: 'bc_home_erna', tx: 4, ty: 6, dir: 'up', door: true },
      { x: 39, y: 21, to: 'bc_home_finn', tx: 5, ty: 6, dir: 'up', door: true },
    ],
  };

  /** Coral Town: the side road east. A diving school, a jetty over the coral shallows, a dolphin. */
  const CORAL: MapDef = {
    id: 'coral', at: 'coral', country: 'beach', theme: 'reef', spawn: { x: 2, y: 11, dir: 'right' },
    rows: [
      '########################################',
      '########################################',
      '###............................#########',
      '##..............................########',
      '##.......y.......................~~~~~~~',
      '##..............................~~~~~~~~',
      '##..............................~~~~~~~~',
      '##...........................w..~~~~~~~~',
      '##..""""........................~~~~~~~~',
      '##.""""""......................~~~~~~~~~',
      '##.............................~~~~~~~~~',
      '::::::::::::::::::::::::::::....~~~~~~~~',
      '::::::::::::::::::::::::::::....~~~~~~~~',
      '##..........................~~~~~~~~~~~~',
      '##.......r..........::.....~~~~~~~~~~~~~',
      '##......~~~~~~~~~~~~::~~~~~~~~~~~~~~~~~~',
      '##....~~~~~~~~~~~~~~::~~~~~~~~~~~~~~~~~~',
      '##..~~~~~~~~~~~~~~~~::~~~~~~~~~~~~~~~~~~',
      '###~~~~~~~~~~~~~~~~~::~~~~~~~~~~~~~~~~~~',
      '###~~~~~~~~~~~~~~~~~::~~~~~~~~~~~~~~~~~~',
      '##~~~~~~~~~~~~~~~~~~::~~~~~~~~~~~~~~~~~~',
      '##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    ],
    objs: [
      { k: 'decor', id: 'dive', x: 10, y: 6, art: 'bc_dive' },
      { k: 'sign', id: 'sign_lessons', x: 15, y: 8 },
      { k: 'sign', id: 'sign_coral', x: 3, y: 10 },
      { k: 'decor', id: 'hut1', x: 21, y: 5, art: 'bc_hut' },
      { k: 'decor', id: 'hut2', x: 3, y: 3, art: 'bc_hut' },
      { k: 'decor', id: 'boat', x: 23, y: 13, art: 'bc_boat' },
      { k: 'decor', id: 'kayak', x: 15, y: 13, art: 'bc_kayak' },
      { k: 'decor', id: 'surf', x: 27, y: 9, art: 'bc_surf' },
      { k: 'npc', id: 'dolphin', x: 22, y: 19, npc: 'bc_dolphin' },
      { k: 'npc', id: 'turtle2', x: 6, y: 16, npc: 'bc_seaturtle' },
      { k: 'decor', id: 'buoy1', x: 12, y: 19, art: 'bc_buoy' }, { k: 'decor', id: 'buoy2', x: 28, y: 17, art: 'bc_buoy' },
      { k: 'decor', id: 'buoy3', x: 34, y: 21, art: 'bc_buoy' },
      { k: 'decor', id: 'yacht', x: 34, y: 7, art: 'bc_yacht' },
      { k: 'decor', id: 'tiki', x: 24, y: 8, art: 'bc_tiki' },
      { k: 'decor', id: 'hammock', x: 28, y: 3, art: 'bc_hammock' },
      { k: 'decor', id: 'palm1', x: 8, y: 13, art: 'bc_palm' }, { k: 'decor', id: 'palm2', x: 17, y: 4, art: 'bc_palm' },
      { k: 'decor', id: 'nets', x: 4, y: 9, art: 'bc_nets' },
      { k: 'decor', id: 'dolphins', x: 30, y: 19, art: 'bc_dolphins' },
    ],
    warps: [
      ...edge(0, [11, 12], 'seaside', 42, [15, 16], 'left'),
      { x: 11, y: 7, to: 'bc_dive', tx: 5, ty: 7, dir: 'up', door: true },
      { x: 22, y: 6, to: 'bc_home_meike', tx: 6, ty: 6, dir: 'up', door: true },
      { x: 4, y: 4, to: 'bc_home_jan', tx: 4, ty: 6, dir: 'up', door: true },
    ],
  };

  /** The lighthouse: a coastal route up a grassy headland past the red and white lighthouse, then east to Shell Bay. */
  const LIGHTHOUSE: MapDef = {
    id: 'lighthouse', at: 'lighthouse', country: 'beach', theme: 'cliff', spawn: { x: 19, y: 28, dir: 'up' },
    rows: [
      '~~~~~~~~~~~~~~######################',
      '~~~~##.......#######################',
      '~~~##.........######################',
      '~~~#.......................#########',
      '~~~#..................::::::::::::::',
      '~~~##.........::::::::::::::::::::::',
      '~~~~#.........::...........#########',
      '~~~~##........::....w.......########',
      '~~~~~#...y...::.........##..########',
      '~~~~~#......::..."""....##..#######~',
      '~~~~~##.....::.r""""".......######~~',
      '~~~~~~#.....::...""".......r.####~~~',
      '~~~~~~#......::...y...........##~~~~',
      '~~~~~~##......::...............#~~~~',
      '~~~~~~~#.......::.....o.....r..#~~~~',
      '~~~~~~~#..##....::.............##~~~',
      '~~~~~~~##.##.....::....###......#~~~',
      '~~~~~~~~#........::....###.....##~~~',
      '~~~~~~~~#.......::.............#~~~~',
      '~~~~~~~~#......::..""r.........#~~~~',
      '~~~~~~~~##....w::.""""........##~~~~',
      '~~~~~~~~~#......::......y....##~~~~~',
      '~~~~~~~~~#.......::.....o....#~~~~~~',
      '~~~~~~~~~##.......::........##~~~~~~',
      '~~~~~~~~~~#........::.......#~~~~~~~',
      '~~~~~~~~~~#..w.....::.......#~~~~~~~',
      '~~~~~~~~~~##.......::.....w##~~~~~~~',
      '~~~~~~~~~~~#.......::......#~~~~~~~~',
      '~~~~~~~~~~~#.......::..y...#~~~~~~~~',
      '~~~~~~~~~~~#.......::......#~~~~~~~~',
    ],
    objs: [
      { k: 'decor', id: 'lighthouse', x: LIGHTHOUSE_AT.x, y: LIGHTHOUSE_AT.y, art: 'bc_lighthouse' },
      { k: 'decor', id: 'cottage', x: 9, y: 2, art: 'bc_cottage' },
      { k: 'npc', id: 'puffin', x: 10, y: 5, npc: 'bc_puffin' },
      { k: 'decor', id: 'bench1', x: 19, y: 13, art: 'bench' }, { k: 'decor', id: 'scope', x: 27, y: 13, art: 'bc_scope' },
      { k: 'sign', id: 'sign_lighthouse', x: 21, y: 27 },
      { k: 'sign', id: 'sign_shellbay', x: 26, y: 3 },
      { k: 'decor', id: 'yacht', x: 1, y: 14, art: 'bc_yacht' },
      { k: 'decor', id: 'yacht2', x: 31, y: 24, art: 'bc_yacht' },
      { k: 'decor', id: 'buoy', x: 4, y: 20, art: 'bc_buoy' },
    ],
    warps: [
      ...[19, 20].map((x) => ({ x, y: 29, to: 'seaside', tx: x - 3, ty: 1, dir: 'down' as const })),
      ...edge(35, [4, 5], 'shellbay', 1, [5, 6], 'right'),
      { x: 7, y: 3, to: 'bc_lighthouse_in', tx: 4, ty: 7, dir: 'up', door: true },
      { x: 11, y: 3, to: 'bc_home_wiebke', tx: 5, ty: 6, dir: 'up', door: true },
    ],
  };

  /** Shell Bay: the end of the journey. A quiet cove of white sand, a turquoise lagoon, the crab and the deck chair. */
  const SHELLBAY: MapDef = {
    id: 'shellbay', at: 'shellbay', country: 'beach', theme: 'bay', spawn: { x: 2, y: 5, dir: 'right' },
    rows: [
      '########################################',
      '########################################',
      '########.....####......#####...#########',
      '######.............................#####',
      '####..."""....................""....####',
      ':::::::::........................""".###',
      ':::::::::::...........................##',
      '###.......::..........................##',
      '###........::.......y.......r.........##',
      '##..........::........................##',
      '##.....w.....::...........w...........##',
      '##............::......................o#',
      '##...............................y....##',
      '#...................................o..#',
      '#.....r................................#',
      '#..................................~~~~~',
      '#..............................~~~~~~~~~',
      '~~~.........................~~~~~~~~~~~~',
      '~~~~~~................~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~........~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~...~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~.....~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~...~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    ],
    objs: [
      { k: 'sign', id: 'sign_beach', x: 4, y: 7 },
      { k: 'npc', id: 'crab', x: 16, y: 16, npc: 'crab' },
      { k: 'chair', id: 'chair', x: 12, y: 18 },
      { k: 'npc', id: 'iguana', x: 22, y: 10, npc: 'bc_iguana' },
      { k: 'decor', id: 'rental', x: 23, y: 9, art: 'bc_rental' },
      { k: 'decor', id: 'hammock', x: 26, y: 3, art: 'bc_hammock' },
      { k: 'decor', id: 'rockpool', x: 33, y: 12, art: 'bc_rockpool' },
      { k: 'decor', id: 'sandcastle', x: 8, y: 13, art: 'bc_sandcastle' },
      { k: 'decor', id: 'parasol1', x: 26, y: 13, art: 'bc_parasol_y' },
      { k: 'decor', id: 'islet_palm', x: 25, y: 22, art: 'bc_palm' },
      { k: 'decor', id: 'yacht', x: 33, y: 20, art: 'bc_yacht' },
      { k: 'decor', id: 'buoy1', x: 6, y: 21, art: 'bc_buoy' },
      { k: 'decor', id: 'kayak', x: 4, y: 15, art: 'bc_kayak' },
      { k: 'decor', id: 'dolphins', x: 12, y: 22, art: 'bc_dolphins' },
      { k: 'decor', id: 'driftwood', x: 28, y: 16, art: 'bc_driftwood' },
      { k: 'decor', id: 'palm1', x: 6, y: 9, art: 'bc_palm' }, { k: 'decor', id: 'palm2', x: 31, y: 8, art: 'bc_palm' },
      { k: 'decor', id: 'palm3', x: 2, y: 13, art: 'bc_palm' },
    ],
    warps: edge(0, [5, 6], 'lighthouse', 34, [4, 5], 'left'),
  };

  const ROOMS: MapDef[] = [
    room('bc_exchange', 'pelican', 'bc_pelican', 'palmvillage', 16, 7, 'palmvillage', [
      { k: 'plant', id: 'plant', x: 1, y: 2 }, { k: 'plant', id: 'plant', x: 9, y: 2 }, { k: 'decor', id: 'surf', x: 9, y: 6, art: 'bc_surf' },
    ]),
    room('bc_hotel', 'otter', 'bc_otter', 'sunport', 25, 7, 'sunport', [
      { k: 'plant', id: 'plant', x: 1, y: 2 }, { k: 'plant', id: 'plant', x: 9, y: 2 },
      { k: 'decor', id: 'bench1', x: 1, y: 6, art: 'bench' }, { k: 'decor', id: 'bench2', x: 8, y: 6, art: 'bench' },
    ]),
    room('bc_shop', 'hermit', 'bc_hermit', 'seaside', 27, 11, 'seaside', [
      { k: 'decor', id: 'surf', x: 1, y: 2, art: 'bc_surf' }, { k: 'decor', id: 'surf2', x: 9, y: 2, art: 'bc_surf' },
      { k: 'decor', id: 'crates', x: 1, y: 6, art: 'crates' },
    ]),
    room('bc_dive', 'octopus', 'bc_octopus', 'coral', 11, 8, 'coral', [
      { k: 'plant', id: 'plant', x: 1, y: 2 }, { k: 'decor', id: 'surf', x: 9, y: 2, art: 'bc_surf' }, { k: 'decor', id: 'kayak', x: 7, y: 6, art: 'bc_kayak' },
    ]),
  ];

  const STATION = kit.station('sunport', 'beach', 'sunport', 5, 6, [['pass_sp1', 'bc_pelican', 9, 6, 'hall'], ['pass_sp2', 'bc_otter', 22, 15, 'gleis']]);

  // ---------------------------------------------------------------- scripts

  /** Paying: the price was said; pick the right sum (the wrong ones get a gentle "look again"). */
  const pay = (s: Save, who: string, n: number, then: Step[]): Step[] => {
    if (kit.money(s, 'sol') < n) return [{ say: 'bc_pay.nomoney', who }];
    return [{
      ask: 'bc_pay.ask', who, opts: [n, n + 10, n * 10].map((k): Opt => ({
        o: `bc_sol.${k}`, then: k === n ? [{ money: 'sol', n: -n }, ...then] : [{ say: 'bc_pay.wrong', who }],
      })),
    }];
  };

  const talk = (who: string, ...keys: string[]): Step[] => keys.map((k) => ({ say: k, who }));

  function script(o: Obj, s: Save): Step[] | undefined {
    if (o.k === 'decor') {
      if (o.art === 'bc_icecart') return script({ k: 'npc', id: 'starfish', x: 0, y: 0, npc: 'bc_starfish' }, s);
      if (o.art === 'bc_rental') return script({ k: 'npc', id: 'iguana', x: 0, y: 0, npc: 'bc_iguana' }, s);
      if (o.art === 'bc_postbox') return postbox(s);
      const look: Record<string, string> = {
        bc_hut: 'bc_look.hut', bc_exchange: 'bc_look.exchange', bc_station: 'bc_look.station', bc_hotel: 'bc_look.hotel', bc_hotel2: 'bc_look.full',
        bc_villa: 'bc_look.villa', bc_shop: 'bc_look.shop', bc_dive: 'bc_look.dive', bc_cottage: 'bc_look.cottage', bc_lighthouse: 'bc_look.lighthouse',
        bc_wheel: 'bc_look.wheel', bc_boat: 'bc_look.boat', bc_yacht: 'bc_look.yacht', bc_pool: 'bc_look.pool', bc_tower: 'bc_look.tower',
        bc_rockpool: 'bc_look.rockpool', bc_sandcastle: 'bc_look.sandcastle', bc_hammock: 'bc_look.hammock',
      };
      return look[o.art] ? [{ say: look[o.art] }] : o.art.startsWith('bc_') ? [] : undefined;
    }
    switch (o.id) {
      // signs
      case 'sign_palmvillage': return [{ say: 'bc_sign.palmvillage' }];
      case 'sign_tide': return [{ say: 'bc_sign.tide' }];
      case 'sign_sunport': return [{ say: 'bc_sign.sunport' }];
      case 'sign_seaside': return [{ say: 'bc_sign.seaside' }];
      case 'sign_coral': return [{ say: 'bc_sign.coral' }];
      case 'sign_lessons': return [{ say: 'bc_sign.lessons' }];
      case 'sign_lighthouse': return [{ say: 'bc_sign.lighthouse' }];
      case 'sign_shellbay': return [{ say: 'bc_sign.shellbay' }];
      case 'sign_beach': return [{ say: 'sign.beach' }];

      // Palm Village: the tide over the road
      case 'turtle': {
        const who = 'bc_seaturtle';
        if (has(s, 'bc_tide')) return talk(who, 'bc_turtle.done');
        const intro = has(s, 'bc_asked_turtle') ? [] : [...talk(who, 'bc_turtle.hello1', 'bc_turtle.hello2', 'bc_turtle.hello3'), { set: 'bc_asked_turtle' }];
        return [...intro, {
          ask: 'bc_turtle.ask', who, opts: [
            { o: 'bc_turtle.a10', then: talk(who, 'bc_turtle.wrong') },
            { o: 'bc_turtle.a14', then: [...talk(who, 'bc_turtle.right1'), { fx: 'shake' }, { set: 'bc_tide' }, ...talk(who, 'bc_turtle.right2'), { xp: 20, why: 'for reading the tide table' }] },
            { o: 'bc_turtle.a6', then: talk(who, 'bc_turtle.wrong') },
            { o: 'opt.notyet', then: talk(who, 'bc_turtle.later') },
          ],
        }];
      }
      case 'tide': return [{ say: 'bc_tide.look' }];
      case 'fisher': return talk('bc_pelican', 'bc_fisher.1', 'bc_fisher.2');
      case 'kid': return talk('bc_hermit', 'bc_kid.1', 'bc_kid.2');

      // the exchange office: pearls into sols, 1 : 5
      case 'pelican': {
        const who = 'bc_pelican';
        const pearls = kit.money(s, 'pearl');
        const amounts = [2, 4, 6].filter((n) => n <= pearls);
        if (!amounts.length) {
          if (kit.money(s, 'sol') < 6 && !has(s, 'bc_gift')) return [...talk(who, 'bc_pelican.hello', 'bc_pelican.gift'), { money: 'sol', n: 10 }, { set: 'bc_gift' }];
          return talk(who, 'bc_pelican.hello', 'bc_pelican.none');
        }
        const quiz = (n: number): Step => ({
          ask: 'bc_pelican.quiz', who, opts: [n * 3, n * 5, n * 10].map((k): Opt => ({
            o: `bc_sol.${k}`,
            then: [{ say: k === n * 5 ? 'bc_pelican.right' : 'bc_pelican.wrong', who }, { money: 'pearl', n: -n }, { money: 'sol', n: n * 5 }, { say: 'bc_pelican.done', who }],
          })),
        });
        return [...talk(who, 'bc_pelican.hello', 'bc_pelican.rate'), {
          ask: 'bc_pelican.ask', who, opts: [...amounts.map((n): Opt => ({ o: `bc_pelican.p${n}`, then: [quiz(n)] })), { o: 'exch.nothing', then: [{ say: 'exch.bye', who }] }],
        }];
      }

      // Sunport: checking in at the hotel; the key card opens the gate to the beach path north
      case 'otter': {
        const who = 'bc_otter';
        if (holds(s, 'bc_card') || has(s, 'bc_gate')) return talk(who, 'bc_otter.done');
        const wrong: Step[] = talk(who, 'bc_otter.wrong');
        const q = (n: number, right: number, then: Step[]): Step => ({
          ask: `bc_otter.q${n}`, who, opts: [0, 1, 2].map((k): Opt => ({ o: `bc_otter.a${n}${'abc'[k]}`, then: k === right ? then : wrong })),
        });
        return [...talk(who, 'bc_otter.hello1', 'bc_otter.hello2'),
          q(1, 0, [q(2, 1, [q(3, 2, [...talk(who, 'bc_otter.card1'), { give: 'bc_card' }, ...talk(who, 'bc_otter.card2'), { xp: 15, why: 'for checking in at the hotel' }])])])];
      }
      case 'hotelgate':
        if (holds(s, 'bc_card')) return [{ say: 'bc_gate.card' }, { fx: 'shake' }, { set: 'bc_gate' }, { xp: 10, why: 'for opening the beach path' }];
        return [{ say: 'bc_gate.look' }];
      case 'amb_sp1': return talk('bc_seaturtle', 'bc_amb_sp1.1', 'bc_amb_sp1.2');
      case 'amb_sp2': return talk('bc_pelican', 'bc_amb_sp2.1', 'bc_amb_sp2.2');

      // Seaside: the lifeguard's lost flag closes the beach path north
      case 'lifeguard': {
        const who = 'bc_retriever';
        if (has(s, 'bc_flag_up')) return talk(who, 'bc_lifeguard.done');
        if (holds(s, 'bc_flag')) {
          return [...talk(who, 'bc_lifeguard.thanks1', 'bc_lifeguard.thanks2'), { take: 'bc_flag' }, { fx: 'shake' }, { set: 'bc_flag_up' },
            ...talk(who, 'bc_lifeguard.thanks3'), { xp: 25, why: 'for bringing back the flag' }];
        }
        if (has(s, 'bc_asked_lifeguard')) return talk(who, 'bc_lifeguard.reminder');
        return [...talk(who, 'bc_lifeguard.hello1', 'bc_lifeguard.hello2', 'bc_lifeguard.hello3'), { set: 'bc_asked_lifeguard' }];
      }
      case 'rope': return [{ say: 'bc_rope.look' }];
      case 'starfish': {
        const who = 'bc_starfish';
        const ice = (flavour: string): Opt => ({
          o: flavour, then: [{ say: 'bc_star.price_ice', who }, ...pay(s, who, 2, [{ say: 'bc_star.here', who }, { say: 'bc_star.yum' },
            ...(has(s, 'bc_ice') ? [] : [{ set: 'bc_ice' }, { xp: 5, why: 'for ordering ice cream' }] as Step[])])],
        });
        return [{ say: 'bc_star.hello', who }, {
          ask: 'bc_star.ask', who, opts: [
            { o: 'bc_star.o_ice', then: [{ ask: 'bc_star.flavour', who, opts: [ice('bc_star.f_straw'), ice('bc_star.f_choc'), ice('bc_star.f_lemon')] }] },
            { o: 'bc_star.o_lemonade', then: [{ say: 'bc_star.price_lemonade', who }, ...pay(s, who, 3, [{ say: 'bc_star.here', who }, { give: 'bc_lemonade' }])] },
            { o: 'exch.nothing', then: talk(who, 'bc_star.bye') },
          ],
        }];
      }
      case 'hermit': {
        const who = 'bc_hermit';
        const card: Step[] = has(s, 'bc_postcard_sent') ? talk(who, 'bc_hermit.sent')
          : holds(s, 'bc_stamp') ? talk(who, 'bc_hermit.post')
          : holds(s, 'pc_beach') ? [...talk(who, 'bc_hermit.havecard'), ...pay(s, who, 2, [{ give: 'bc_stamp' }, ...talk(who, 'bc_hermit.post')])]
          : [...talk(who, 'bc_hermit.price_card'), ...pay(s, who, 4, [{ give: 'pc_beach' }, { give: 'bc_stamp' }, ...talk(who, 'bc_hermit.post')])];
        const neck: Step[] = holds(s, 'bc_necklace') ? talk(who, 'bc_hermit.haveneck')
          : [...talk(who, 'bc_hermit.price_neck'), ...pay(s, who, 5, [{ give: 'bc_necklace' }, ...talk(who, 'bc_hermit.thanks'), { xp: 5, why: 'for buying a souvenir' }])];
        return [{ say: 'bc_hermit.hello', who }, {
          ask: 'bc_hermit.ask', who, opts: [{ o: 'bc_hermit.o_card', then: card }, { o: 'bc_hermit.o_neck', then: neck }, { o: 'exch.nothing', then: talk(who, 'bc_hermit.bye') }],
        }];
      }
      case 'amb_ss1': return talk('bc_otter', 'bc_amb_ss1.1', 'bc_amb_ss1.2');
      case 'amb_ss2': return talk('bc_iguana', 'bc_amb_ss2.1', 'bc_amb_ss2.2');

      // Coral Town: the snorkelling lesson finds the flag
      case 'octopus': {
        const who = 'bc_octopus';
        if (holds(s, 'bc_flag') || has(s, 'bc_flag_up')) return talk(who, 'bc_octo.done');
        const lesson: Step[] = [...talk(who, 'bc_octo.go'), { fx: 'shake' }, ...talk(who, 'bc_octo.reef1', 'bc_octo.reef2'), { give: 'bc_flag' },
          ...talk(who, 'bc_octo.flag'), { xp: 20, why: 'for the snorkelling lesson' }];
        const book: Step[] = kit.money(s, 'sol') >= 6 ? [...talk(who, 'bc_octo.price'), ...pay(s, who, 6, lesson)] : [...talk(who, 'bc_octo.price', 'bc_octo.nomoney'), ...lesson];
        return [...(has(s, 'bc_met_octo') ? [] : [...talk(who, 'bc_octo.hello1', 'bc_octo.hello2'), { set: 'bc_met_octo' }] as Step[]), {
          ask: 'bc_octo.ask', who, opts: [
            { o: 'bc_octo.t9', then: book },
            { o: 'bc_octo.t1', then: talk(who, 'bc_octo.notime') },
            { o: 'bc_octo.t3', then: book },
          ],
        }];
      }
      case 'dolphin': return holds(s, 'bc_flag') || has(s, 'bc_flag_up') ? talk('bc_dolphin', 'bc_dolphin.1', 'bc_dolphin.bye') : talk('bc_dolphin', 'bc_dolphin.1', 'bc_dolphin.2');
      case 'turtle2': return talk('bc_seaturtle', 'bc_turtle2.1', 'bc_turtle2.2');

      // the lighthouse keeper's lemonade
      case 'puffin': {
        const who = 'bc_puffin';
        if (has(s, 'bc_puffin_done')) return talk(who, 'bc_puffin.done');
        if (holds(s, 'bc_lemonade')) {
          return [{ take: 'bc_lemonade' }, ...talk(who, 'bc_puffin.thanks1', 'bc_puffin.thanks2'), { set: 'bc_puffin_done' }, { xp: 15, why: 'for the lemonade' }];
        }
        if (has(s, 'bc_asked_puffin')) return talk(who, 'bc_puffin.reminder');
        return [...talk(who, 'bc_puffin.hello1', 'bc_puffin.hello2', 'bc_puffin.hello3'), { set: 'bc_asked_puffin' }];
      }

      // Shell Bay: rent the deck chair, then sit down (the ending)
      case 'iguana': {
        const who = 'bc_iguana';
        if (has(s, 'bc_chair')) return talk(who, 'bc_iguana.done');
        const rent: Step[] = kit.money(s, 'sol') >= 4
          ? [{ money: 'sol', n: -4 }, ...talk(who, 'bc_iguana.yes'), { set: 'bc_chair' }, { xp: 10, why: 'for renting a deck chair' }]
          : [...talk(who, 'bc_iguana.free'), { set: 'bc_chair' }];
        return [...talk(who, 'bc_iguana.hello'), { ask: 'bc_iguana.ask', who, opts: [{ o: 'opt.yes', then: rent }, { o: 'opt.no', then: talk(who, 'bc_iguana.later') }] }];
      }
      case 'chair':
        if (!has(s, 'bc_chair')) return [{ say: 'bc_chair.rent' }];
        return undefined; // the shared ending
    }
    return undefined;
  }

  function postbox(s: Save): Step[] {
    if (has(s, 'bc_postcard_sent')) return [{ say: 'bc_post.done' }];
    if (!holds(s, 'pc_beach')) return [{ say: 'bc_post.look' }];
    if (!holds(s, 'bc_stamp')) return [{ say: 'bc_post.nostamp' }];
    const wrong: Step[] = [{ say: 'bc_post.wrong' }];
    return [{
      ask: 'bc_post.write', opts: [
        { o: 'bc_post.w1', then: wrong },
        { o: 'bc_post.w2', then: [{ say: 'bc_post.sent' }, { take: 'pc_beach' }, { take: 'bc_stamp' }, { set: 'bc_postcard_sent' }, { xp: 15, why: 'for sending a postcard home' }] },
        { o: 'bc_post.w3', then: wrong },
      ],
    }];
  }

  const lineKeys = [
    'bc_sign.palmvillage', 'bc_sign.tide', 'bc_sign.sunport', 'bc_sign.seaside', 'bc_sign.coral', 'bc_sign.lessons', 'bc_sign.lighthouse', 'bc_sign.shellbay',
    'bc_look.hut', 'bc_look.exchange', 'bc_look.station', 'bc_look.hotel', 'bc_look.full', 'bc_look.villa', 'bc_look.shop', 'bc_look.dive', 'bc_look.cottage',
    'bc_look.lighthouse', 'bc_look.wheel', 'bc_look.boat', 'bc_look.yacht', 'bc_look.pool', 'bc_look.tower', 'bc_look.rockpool', 'bc_look.sandcastle', 'bc_look.hammock',
    'bc_turtle.hello1', 'bc_turtle.hello2', 'bc_turtle.hello3', 'bc_turtle.ask', 'bc_turtle.a10', 'bc_turtle.a14', 'bc_turtle.a6', 'bc_turtle.wrong',
    'bc_turtle.right1', 'bc_turtle.right2', 'bc_turtle.later', 'bc_turtle.done', 'bc_tide.look',
    'bc_fisher.1', 'bc_fisher.2', 'bc_kid.1', 'bc_kid.2',
    'bc_pelican.hello', 'bc_pelican.rate', 'bc_pelican.ask', 'bc_pelican.p2', 'bc_pelican.p4', 'bc_pelican.p6', 'bc_pelican.quiz', 'bc_pelican.right',
    'bc_pelican.wrong', 'bc_pelican.done', 'bc_pelican.gift', 'bc_pelican.none',
    ...SOLS.map((n) => `bc_sol.${n}`), 'bc_pay.ask', 'bc_pay.wrong', 'bc_pay.nomoney',
    'bc_otter.hello1', 'bc_otter.hello2', ...[1, 2, 3].flatMap((n) => [`bc_otter.q${n}`, `bc_otter.a${n}a`, `bc_otter.a${n}b`, `bc_otter.a${n}c`]),
    'bc_otter.wrong', 'bc_otter.card1', 'bc_otter.card2', 'bc_otter.done', 'bc_gate.look', 'bc_gate.card',
    'bc_amb_sp1.1', 'bc_amb_sp1.2', 'bc_amb_sp2.1', 'bc_amb_sp2.2',
    'bc_lifeguard.hello1', 'bc_lifeguard.hello2', 'bc_lifeguard.hello3', 'bc_lifeguard.reminder', 'bc_lifeguard.thanks1', 'bc_lifeguard.thanks2',
    'bc_lifeguard.thanks3', 'bc_lifeguard.done', 'bc_rope.look',
    'bc_star.hello', 'bc_star.ask', 'bc_star.o_ice', 'bc_star.o_lemonade', 'bc_star.flavour', 'bc_star.f_straw', 'bc_star.f_choc', 'bc_star.f_lemon',
    'bc_star.price_ice', 'bc_star.price_lemonade', 'bc_star.here', 'bc_star.yum', 'bc_star.bye',
    'bc_hermit.hello', 'bc_hermit.ask', 'bc_hermit.o_card', 'bc_hermit.o_neck', 'bc_hermit.price_card', 'bc_hermit.havecard', 'bc_hermit.post',
    'bc_hermit.sent', 'bc_hermit.price_neck', 'bc_hermit.haveneck', 'bc_hermit.thanks', 'bc_hermit.bye',
    'bc_post.look', 'bc_post.nostamp', 'bc_post.write', 'bc_post.w1', 'bc_post.w2', 'bc_post.w3', 'bc_post.wrong', 'bc_post.sent', 'bc_post.done',
    'bc_amb_ss1.1', 'bc_amb_ss1.2', 'bc_amb_ss2.1', 'bc_amb_ss2.2',
    'bc_octo.hello1', 'bc_octo.hello2', 'bc_octo.ask', 'bc_octo.t9', 'bc_octo.t1', 'bc_octo.t3', 'bc_octo.notime', 'bc_octo.price', 'bc_octo.nomoney',
    'bc_octo.go', 'bc_octo.reef1', 'bc_octo.reef2', 'bc_octo.flag', 'bc_octo.done',
    'bc_dolphin.1', 'bc_dolphin.2', 'bc_dolphin.bye', 'bc_turtle2.1', 'bc_turtle2.2',
    'bc_puffin.hello1', 'bc_puffin.hello2', 'bc_puffin.hello3', 'bc_puffin.reminder', 'bc_puffin.thanks1', 'bc_puffin.thanks2', 'bc_puffin.done',
    'bc_iguana.hello', 'bc_iguana.ask', 'bc_iguana.yes', 'bc_iguana.free', 'bc_iguana.later', 'bc_iguana.done', 'bc_chair.rent',
    'pass_sp1.1', 'pass_sp1.2', 'pass_sp2.1', 'pass_sp2.2',
    ...ITEMS.map((i) => `item.${i}`),
    ...RESIDENTS.flatMap((r) => kit.residentLines(r)),
  ];

  return {
    country: 'beach', flag: ['#f09a30', '#30b8c0'], ink: '#c0392b',
    lines: ['crab.', 'chair.', 'sign.beach', 'end.', 'bc_'],
    maps: [PALMVILLAGE, SUNPORT, SEASIDE, CORAL, LIGHTHOUSE, SHELLBAY, ...ROOMS, ...HOMES, ...STATION],
    entry: { map: 'palmvillage', cells: [[1, 11], [1, 12]], dir: 'right' },
    exit: { map: 'palmvillage', cells: [[1, 11], [1, 12]], dir: 'right' },
    script, lineKeys,
    places: {
      palmvillage: 'Palm Village', sunport: 'Sunport', seaside: 'Seaside', coral: 'Coral Town', lighthouse: 'Lighthouse', shellbay: 'Shell Bay',
      bc_exchange: 'Palm Village exchange office', bc_hotel: 'Hotel Seaview', bc_shop: 'Seaside souvenir shop', bc_dive: 'Coral Town diving school',
      bc_home_anke: 'Fisherwoman\'s hut', bc_home_wilhelm: 'Old turtle\'s hut', bc_cafe: 'Hotel café', bc_home_konrad: 'Painter\'s villa',
      bc_home_hinrich: 'Sailor\'s house', bc_home_erna: 'Grandmother\'s house', bc_home_finn: 'Surfer\'s house', bc_home_meike: 'Reef researcher\'s hut',
      bc_home_jan: 'Fisherman\'s hut', bc_lighthouse_in: 'Inside the lighthouse', bc_home_wiebke: 'Lighthouse keeper\'s cottage',
      station_sunport: 'Sunport station', under_sunport: 'Underpass', gleis_sunport: 'Platforms',
    },
    npcKinds: KINDS,
    things: [...KINDS, ...DECOR_THINGS, 'bc_rug'],
  };
};
