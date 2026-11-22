/**
 * The homes of Woodland, Frostland and the Megacity: house interiors with someone living in them who tells the cat
 * something worth knowing (residents, NPCs 'res_…', scripted by the shared resident script in world.ts). The art
 * (interior themes and furniture) is in core-homes-art.ts.
 *
 * Locked on purpose: Tilde's and Hilde's houses (both are out in front of them), a town house in Lindenburg, one in
 * Frostburg and one in Icefjord.
 */
import type { Country, Extension, Kit, MapDef, Obj, Warp } from '../world';
import type { NpcKind } from '../art';
import './core-homes-art';

/** A piece of furniture (a DECOR sprite of core-homes-art.ts, or a shared one like 'barrel'). */
const d = (art: string, x: number, y: number): Obj => ({ k: 'decor', id: art, x, y, art });

interface Home {
  id: string;
  /** English name (one for every course). */
  en: string;
  country: Country;
  theme: string;
  /** The outdoor map, the house's corner on it (a 5×4 house: door at x+2, y+3), or a city door's own tile. */
  map: string;
  at: string;
  door: [number, number];
  /** A `door` object in a city facade (the cat steps out right below it). */
  city?: boolean;
  res: [string, NpcKind, number, number];
  rows: string[];
  objs: Obj[];
}

const HOMES: Home[] = [
  // ------------------------------------------------------------ Woodland
  {
    id: 'hm_wl_moss', en: 'Cottage in Mossville', country: 'forest', theme: 'hm_cottage', map: 'village', at: 'moosdorf', door: [12, 3],
    res: ['res_wl_moss', 'badger', 8, 5],
    rows: [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#..rrrr....#',
      '#..rrrr....#',
      '#..........#',
      '#..........#',
      '######:#####',
    ],
    objs: [d('hm_shelf', 1, 2), d('hm_hearth', 4, 2), d('hm_herbs', 3, 1), d('hm_window', 7, 1), d('hm_bed_quilt', 9, 2), d('hm_window', 8, 1),
      d('hm_table_cloth', 4, 4), d('hm_stool', 3, 4), d('hm_stool', 6, 4), d('hm_basket', 1, 6), d('hm_chest', 10, 5), d('hm_plant', 10, 7), d('hm_lamp', 1, 4)],
  },
  {
    id: 'hm_wl_cafe', en: 'Lindenburg café', country: 'forest', theme: 'hm_town', map: 'lindenburg', at: 'lindenburg', door: [9, 3],
    res: ['res_wl_cafe', 'rabbit', 4, 3],
    rows: [
      '#############',
      '#############',
      '#...........#',
      '#...........#',
      '#...........#',
      '#.yyyy.yyyy.#',
      '#.yyyy.yyyy.#',
      '#...........#',
      '######:######',
    ],
    objs: [d('hm_cakes', 1, 2), d('hm_dresser', 3, 2), d('hm_window_town', 6, 1), d('hm_window_town', 8, 1), d('hm_clock', 7, 2), d('hm_plant', 11, 2), d('hm_window_town', 10, 1),
      d('hm_table_cloth', 2, 5), d('hm_chair', 4, 5), d('hm_table_cloth', 8, 5), d('hm_chair', 7, 5), d('hm_chair', 10, 5), d('hm_lamp', 11, 7), d('hm_plant', 1, 7)],
  },
  {
    id: 'hm_wl_linden', en: 'Town house under the lindens', country: 'forest', theme: 'hm_town', map: 'lindenburg', at: 'lindenburg', door: [25, 3],
    res: ['res_wl_linden', 'goose', 6, 6],
    rows: [
      '###########',
      '###########',
      '#.........#',
      '#.........#',
      '#...rrrr..#',
      '#...rrrr..#',
      '#.........#',
      '#.........#',
      '#####:#####',
    ],
    objs: [d('hm_shelf', 1, 2), d('hm_clock', 3, 2), d('hm_window_town', 4, 1), d('hm_herbs', 5, 1), d('hm_window_town', 6, 1), d('hm_dresser', 7, 2), d('hm_plant', 9, 2),
      d('hm_table', 5, 4), d('hm_armchair', 4, 4), d('hm_armchair', 8, 4), d('hm_lamp', 9, 4), d('hm_basket', 1, 6), d('hm_honey', 2, 1)],
  },
  {
    id: 'hm_wl_rail', en: 'Railwayman\'s house', country: 'forest', theme: 'hm_town', map: 'lindenburg', at: 'lindenburg', door: [24, 17],
    res: ['res_wl_rail', 'raccoon', 5, 5],
    rows: [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#.ww....ww.#',
      '#.ww....ww.#',
      '#..........#',
      '#..........#',
      '######:#####',
    ],
    objs: [d('hm_loco', 1, 2), d('hm_window_town', 4, 1), d('hm_clock', 4, 2), d('hm_desk', 5, 2), d('hm_window_town', 7, 1), d('hm_shelf', 8, 2), d('hm_plant', 10, 2),
      d('hm_armchair', 2, 5), d('hm_lamp', 1, 5), d('hm_armchair', 9, 5), d('hm_chest', 10, 7), d('hm_chair', 6, 3)],
  },
  {
    id: 'hm_wl_mill', en: 'Millbrook mill', country: 'forest', theme: 'hm_mill', map: 'millbrook', at: 'millbrook', door: [19, 3],
    res: ['res_wl_miller', 'mouse', 8, 5],
    rows: [
      '#############',
      '#############',
      '#...........#',
      '#...........#',
      '#...........#',
      '#...........#',
      '#.......rrr.#',
      '#.......rrr.#',
      '#...........#',
      '######:######',
    ],
    objs: [d('hm_sacks', 1, 2), d('hm_sacks', 2, 2), d('hm_sacks', 1, 3), d('hm_gears', 3, 1), d('hm_millstone', 5, 2), d('hm_window', 8, 1), d('hm_sacks', 10, 2), d('hm_sacks', 11, 2),
      d('hm_sacks', 11, 3), d('barrel', 1, 6), d('crates', 1, 7), d('hm_table', 8, 6), d('hm_stool', 10, 6), d('hm_basket', 11, 8)],
  },
  {
    id: 'hm_wl_birch', en: 'Cottage among the birches', country: 'forest', theme: 'hm_cottage', map: 'birchvale', at: 'birchvale', door: [4, 3],
    res: ['res_wl_birch', 'deer', 5, 3],
    rows: [
      '##########',
      '##########',
      '#........#',
      '#........#',
      '#........#',
      '#..yyyy..#',
      '#..yyyy..#',
      '#........#',
      '####:#####',
    ],
    objs: [d('hm_desk', 1, 2), d('hm_window', 4, 1), d('hm_window', 5, 1), d('hm_bed_quilt', 7, 2), d('hm_chair', 2, 3), d('hm_woodpile', 1, 6), d('hm_woodpile', 1, 7),
      d('hm_basket', 8, 6), d('hm_lamp', 8, 5), d('hm_stool', 4, 5), d('hm_herbs', 3, 1)],
  },
  {
    id: 'hm_wl_honey', en: 'Beekeeper\'s cottage', country: 'forest', theme: 'hm_cottage', map: 'birchvale', at: 'birchvale', door: [10, 3],
    res: ['res_wl_bees', 'fox', 7, 5],
    rows: [
      '###########',
      '###########',
      '#.........#',
      '#.........#',
      '#.........#',
      '#..rrrr...#',
      '#..rrrr...#',
      '#.........#',
      '#####:#####',
    ],
    objs: [d('hm_herbs', 1, 1), d('hm_honey', 2, 1), d('hm_honey', 3, 1), d('hm_dresser', 5, 2), d('hm_window', 7, 1), d('hm_clock', 8, 2), d('hm_plant', 9, 2), d('hm_window', 4, 1),
      d('hm_table', 3, 5), d('hm_stool', 2, 5), d('hm_stool', 5, 5), d('hm_basket', 1, 3), d('hm_chest', 9, 6), d('hm_armchair', 9, 4)],
  },
  {
    id: 'hm_wl_oak', en: 'Cottage under the oaks', country: 'forest', theme: 'hm_cottage', map: 'oakridge', at: 'oakridge', door: [7, 8],
    res: ['res_wl_oak', 'squirrel', 4, 5],
    rows: [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#.....yyyy.#',
      '#.....yyyy.#',
      '#..........#',
      '######:#####',
    ],
    objs: [d('hm_shelf', 1, 2), d('hm_basket', 3, 2), d('hm_window', 4, 1), d('hm_window', 5, 1), d('hm_hearth', 7, 2), d('hm_herbs', 6, 1), d('hm_clock', 10, 2), d('hm_herbs', 9, 1),
      d('hm_armchair', 7, 5), d('hm_lamp', 6, 5), d('hm_table', 8, 6), d('hm_basket', 1, 6), d('hm_chest', 1, 7), d('hm_plant', 10, 7)],
  },
  {
    id: 'hm_wl_wood', en: 'Carpenter\'s workshop', country: 'forest', theme: 'hm_cottage', map: 'oakridge', at: 'oakridge', door: [15, 8],
    res: ['res_wl_wood', 'beaver', 4, 4],
    rows: [
      '#############',
      '#############',
      '#...........#',
      '#...........#',
      '#...........#',
      '#...........#',
      '#........ww.#',
      '#........ww.#',
      '######:######',
    ],
    objs: [d('hm_workbench', 1, 2), d('hm_rings', 3, 1), d('hm_rings', 4, 1), d('hm_window', 5, 1), d('hm_shelf', 6, 2), d('hm_window', 8, 1), d('hm_bed_quilt', 9, 2),
      d('hm_woodpile', 1, 5), d('hm_woodpile', 1, 6), d('hm_woodpile', 2, 6), d('hm_chest', 11, 4), d('hm_chair', 10, 6), d('hm_stool', 4, 2), d('crates', 1, 7)],
  },
  // ------------------------------------------------------------ Frostland
  {
    id: 'hm_fl_flake', en: 'Snowfield cabin', country: 'ice', theme: 'hm_cabin', map: 'snowfield', at: 'snowfield', door: [5, 3],
    res: ['res_fl_flake', 'arcticfox', 7, 5],
    rows: [
      '###########',
      '###########',
      '#.........#',
      '#.........#',
      '#.........#',
      '#..""""...#',
      '#..""""...#',
      '#.........#',
      '#####:#####',
    ],
    objs: [d('hm_stove', 1, 2), d('hm_woodpile', 2, 2), d('hm_flakes', 3, 1), d('hm_window_frost', 4, 1), d('hm_flakes', 5, 1), d('hm_window_frost', 6, 1), d('hm_bed_fur', 8, 2),
      d('hm_armchair', 3, 5), d('hm_lamp', 1, 5), d('hm_table', 4, 6), d('hm_chest', 9, 6), d('hm_desk', 4, 2)],
  },
  {
    id: 'hm_fl_snow', en: 'Snowfield log house', country: 'ice', theme: 'hm_cabin', map: 'snowfield', at: 'snowfield', door: [4, 15],
    res: ['res_fl_snow', 'polarbear', 8, 6],
    rows: [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#...rrrr...#',
      '#...rrrr...#',
      '#..........#',
      '#..........#',
      '#####:######',
    ],
    objs: [d('hm_skis', 1, 2), d('hm_skis', 2, 2), d('hm_window_frost', 4, 1), d('hm_dresser', 5, 2), d('hm_window_frost', 7, 1), d('hm_woodpile', 9, 2), d('hm_stove', 10, 2),
      d('hm_table', 5, 5), d('hm_stool', 4, 5), d('hm_stool', 7, 5), d('hm_bed_fur', 1, 6), d('hm_chest', 10, 7), d('hm_lamp', 10, 5)],
  },
  {
    id: 'hm_fl_aurora', en: 'Stargazer\'s cabin', country: 'ice', theme: 'hm_cabin', map: 'frostheim', at: 'frostheim', door: [18, 4],
    res: ['res_fl_aurora', 'owl', 6, 4],
    rows: [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..wwww....#',
      '#..wwww....#',
      '#..........#',
      '######:#####',
    ],
    objs: [d('hm_shelf', 1, 2), d('hm_flakes', 3, 1), d('hm_window_aurora', 4, 1), d('hm_telescope', 5, 2), d('hm_window_aurora', 6, 1), d('hm_desk', 8, 2), d('hm_stove', 10, 2),
      d('hm_armchair', 3, 5), d('hm_lamp', 2, 5), d('hm_table', 4, 6), d('hm_bed_fur', 9, 5), d('hm_chest', 1, 7)],
  },
  {
    id: 'hm_fl_glacier', en: 'Glacier hut', country: 'ice', theme: 'hm_cabin', map: 'glacier', at: 'glacier', door: [4, 3],
    res: ['res_fl_glacier', 'reindeer', 6, 4],
    rows: [
      '##########',
      '##########',
      '#........#',
      '#........#',
      '#........#',
      '#..""""..#',
      '#..""""..#',
      '#........#',
      '####:#####',
    ],
    objs: [d('hm_bed_fur', 1, 2), d('hm_skis', 3, 2), d('hm_window_frost', 4, 1), d('hm_window_frost', 5, 1), d('hm_stove', 8, 2), d('hm_woodpile', 7, 2), d('hm_tackle', 4, 2),
      d('hm_table', 3, 5), d('hm_stool', 5, 5), d('hm_chest', 8, 6), d('hm_lamp', 1, 6)],
  },
  {
    id: 'hm_fl_sled', en: 'Dog-sled cabin', country: 'ice', theme: 'hm_cabin', map: 'glacier', at: 'glacier', door: [17, 3],
    res: ['res_fl_sled', 'husky', 6, 4],
    rows: [
      '###########',
      '###########',
      '#.........#',
      '#.........#',
      '#.........#',
      '#..yyyy...#',
      '#..yyyy...#',
      '#.........#',
      '#####:#####',
    ],
    objs: [d('hm_stove', 1, 2), d('hm_woodpile', 2, 2), d('hm_skis', 3, 2), d('hm_skis', 4, 2), d('hm_window_frost', 5, 1), d('hm_window_frost', 7, 1), d('hm_bed_fur', 8, 2),
      d('hm_bucket', 1, 5), d('hm_bucket', 2, 5), d('hm_chest', 9, 6), d('hm_armchair', 8, 5), d('crates', 1, 7)],
  },
  {
    id: 'hm_fl_night', en: 'Frostburg house by the square', country: 'ice', theme: 'hm_frost', map: 'frostburg', at: 'frostburg', door: [3, 3],
    res: ['res_fl_night', 'penguin', 6, 4],
    rows: [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#...rrrr...#',
      '#...rrrr...#',
      '#..........#',
      '######:#####',
    ],
    objs: [d('hm_clock', 1, 2), d('hm_lamp', 2, 2), d('hm_sofa', 3, 2), d('hm_window_frost', 6, 1), d('hm_window_frost', 7, 1), d('hm_shelf', 8, 2), d('hm_plant', 10, 2),
      d('hm_table_cloth', 4, 5), d('hm_chair', 6, 5), d('hm_armchair', 9, 5), d('hm_plant', 1, 7), d('hm_flakes', 5, 1)],
  },
  {
    id: 'hm_fl_sauna', en: 'House with a sauna', country: 'ice', theme: 'hm_frost', map: 'frostburg', at: 'frostburg', door: [10, 3],
    res: ['res_fl_sauna', 'walrus', 6, 5],
    rows: [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#.....ww...#',
      '#.....ww...#',
      '#..........#',
      '######:#####',
    ],
    objs: [d('hm_saunastove', 1, 2), d('hm_bench', 2, 2), d('hm_bench', 2, 4), d('hm_bucket', 4, 3), d('hm_window_frost', 6, 1), d('hm_dresser', 8, 2), d('hm_plant', 10, 2),
      d('hm_skis', 10, 4), d('hm_armchair', 8, 5), d('hm_chest', 1, 7), d('hm_lamp', 10, 6)],
  },
  {
    id: 'hm_fl_reindeer', en: 'Herder\'s house', country: 'ice', theme: 'hm_frost', map: 'frostburg', at: 'frostburg', door: [27, 3],
    res: ['res_fl_reindeer', 'reindeer', 5, 5],
    rows: [
      '###########',
      '###########',
      '#.........#',
      '#.........#',
      '#.........#',
      '#..""""...#',
      '#..""""...#',
      '#.........#',
      '#####:#####',
    ],
    objs: [d('hm_bed_fur', 1, 2), d('hm_window_frost', 4, 1), d('hm_lamp', 3, 2), d('hm_chest', 4, 2), d('hm_window_frost', 5, 1), d('hm_shelf', 6, 2), d('hm_stove', 8, 2), d('hm_woodpile', 9, 2),
      d('hm_armchair', 8, 5), d('hm_basket', 1, 6), d('hm_plant', 9, 7)],
  },
  {
    id: 'hm_fl_ice', en: 'House by the river', country: 'ice', theme: 'hm_frost', map: 'frostburg', at: 'frostburg', door: [24, 16],
    res: ['res_fl_ice', 'goose', 8, 5],
    rows: [
      '#############',
      '#############',
      '#...........#',
      '#...........#',
      '#...........#',
      '#...yyyy....#',
      '#...yyyy....#',
      '#...........#',
      '######:######',
    ],
    objs: [d('hm_dresser', 1, 2), d('hm_stove', 3, 2), d('hm_window_frost', 5, 1), d('hm_clock', 6, 2), d('hm_window_frost', 7, 1), d('hm_bed_fur', 10, 2), d('hm_plant', 9, 2),
      d('hm_table', 4, 5), d('hm_chair', 3, 5), d('hm_chair', 6, 5), d('hm_bucket', 1, 4), d('hm_lamp', 11, 6), d('hm_basket', 1, 7)],
  },
  {
    id: 'hm_fl_fjord', en: 'Fjord house', country: 'ice', theme: 'hm_hut', map: 'icefjord', at: 'icefjord', door: [12, 3],
    res: ['res_fl_fjord', 'seal', 6, 4],
    rows: [
      '###########',
      '###########',
      '#.........#',
      '#.........#',
      '#.........#',
      '#..""""...#',
      '#..""""...#',
      '#.........#',
      '#####:#####',
    ],
    objs: [d('hm_stove', 1, 2), d('hm_nets', 2, 1), d('hm_chest', 2, 2), d('hm_oldmap', 4, 1), d('hm_window_frost', 6, 1), d('hm_bed_fur', 8, 2), d('hm_telescope', 6, 2),
      d('barrel', 1, 6), d('hm_table', 3, 5), d('hm_stool', 5, 5), d('hm_lamp', 9, 6), d('crates', 1, 7)],
  },
  {
    id: 'hm_fl_fish', en: 'Fisher\'s hut', country: 'ice', theme: 'hm_hut', map: 'icefjord', at: 'icefjord', door: [13, 8],
    res: ['res_fl_fish', 'penguin', 6, 5],
    rows: [
      '############',
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#...rrrr...#',
      '#...rrrr...#',
      '#..........#',
      '######:#####',
    ],
    objs: [d('hm_tackle', 1, 2), d('hm_fishrack', 2, 1), d('hm_fishrack', 3, 1), d('barrel', 2, 2), d('hm_nets', 4, 1), d('hm_window_frost', 7, 1), d('hm_stove', 8, 2), d('hm_woodpile', 9, 2),
      d('hm_bed_fur', 9, 5), d('hm_table', 4, 6), d('hm_stool', 3, 6), d('crates', 1, 5), d('hm_bucket', 1, 7), d('hm_tackle', 10, 2), d('hm_fishrack', 6, 1)],
  },
  // ------------------------------------------------------------ the Megacity
  {
    id: 'hm_mc_hotel', en: 'Hotel lobby', country: 'metro', theme: 'hm_lobby', map: 'central', at: 'central', door: [20, 26], city: true,
    res: ['res_mc_hotel', 'parrot', 7, 3],
    rows: [
      '##############',
      '##############',
      '#............#',
      '#............#',
      '#............#',
      '#.....rrr....#',
      '#.....rrr....#',
      '#.....rrr....#',
      '#.....rrr....#',
      '#######:######',
    ],
    objs: [d('hm_palm', 1, 2), d('hm_keys', 4, 1), d('hm_reception', 4, 3), d('hm_lamp', 3, 3), d('hm_painting', 7, 1), d('hm_lift', 10, 1), d('hm_palm', 12, 2),
      d('hm_sofa', 1, 6), d('hm_sofa', 10, 6), d('hm_luggage', 12, 4), d('hm_plant', 1, 8), d('hm_plant', 12, 8), d('hm_lamp', 1, 4)],
  },
  {
    id: 'hm_mc_museum', en: 'City museum', country: 'metro', theme: 'hm_museum', map: 'oldtown', at: 'oldtown', door: [26, 6], city: true,
    res: ['res_mc_museum', 'tortoise', 9, 5],
    rows: [
      '##############',
      '##############',
      '#............#',
      '#............#',
      '#............#',
      '#.....rr.....#',
      '#.....rr.....#',
      '#.....rr.....#',
      '#.....rr.....#',
      '######:#######',
    ],
    objs: [d('hm_painting', 1, 1), d('hm_oldmap', 9, 1), d('hm_painting', 11, 1), d('hm_skeleton', 5, 2), d('hm_rope', 4, 4), d('hm_rope', 8, 4), d('hm_plant', 3, 2), d('hm_plant', 12, 2),
      d('hm_vitrine', 1, 4), d('hm_vitrine_coin', 1, 6), d('hm_vitrine', 12, 4), d('hm_vitrine_coin', 12, 6), d('hm_lamp', 1, 8)],
  },
  {
    id: 'hm_mc_tower', en: 'Top of the office tower', country: 'metro', theme: 'hm_tower', map: 'towers', at: 'towers', door: [20, 11], city: true,
    res: ['res_mc_tower', 'pigeon', 5, 4],
    rows: [
      '##############',
      '##############',
      '#............#',
      '#............#',
      '#............#',
      '#.....rr.....#',
      '#.....rr.....#',
      '#.....rr.....#',
      '######::######',
    ],
    objs: [d('hm_plant', 1, 2), d('hm_binoculars', 3, 2), d('hm_lift', 6, 1), d('hm_binoculars', 10, 2), d('hm_plant', 12, 2),
      d('hm_sofa', 2, 5), d('hm_guarddesk', 9, 5), d('hm_palm', 12, 6), d('hm_palm', 1, 7), d('hm_lamp', 11, 4)],
  },
];

export default (kit: Kit): Extension => {
  const maps: MapDef[] = [];
  const addWarps: { map: string; warp: Warp }[] = [];
  for (const h of HOMES) {
    const H = h.rows.length;
    const mats = [...h.rows[H - 1]].flatMap((c, x) => (c === ':' ? [x] : []));
    // in front of the door outside: below a house's door, or below a city door
    const [dx, dy] = h.city ? h.door : [h.door[0] + 2, h.door[1] + 3];
    maps.push({
      id: h.id, at: h.at, country: h.country, theme: h.theme, spawn: { x: mats[0], y: H - 2, dir: 'up' }, rows: h.rows,
      objs: [{ k: 'npc', id: h.res[0], npc: h.res[1], x: h.res[2], y: h.res[3] }, ...h.objs],
      warps: mats.map((x): Warp => ({ x, y: H - 1, to: h.map, tx: dx, ty: dy + 1, dir: 'down' })),
    });
    addWarps.push({ map: h.map, warp: { x: dx, y: dy, to: h.id, tx: mats[0], ty: H - 2, dir: 'up', door: true } });
  }
  return {
    maps,
    addWarps,
    lineKeys: HOMES.flatMap((h) => kit.residentLines(h.res[0])),
    places: Object.fromEntries(HOMES.map((h) => [h.id, h.en])),
    things: THINGS,
  };
};

/** The furniture's "name it" keys (DECOR art names) and the rugs. */
const THINGS = [
  'hm_rug', 'hm_hearth', 'hm_bed_quilt', 'hm_bed_fur', 'hm_shelf', 'hm_dresser', 'hm_table', 'hm_table_cloth', 'hm_stool', 'hm_chair', 'hm_herbs',
  'hm_window', 'hm_window_town', 'hm_window_frost', 'hm_window_aurora', 'hm_clock', 'hm_chest', 'hm_basket', 'hm_millstone', 'hm_sacks', 'hm_gears',
  'hm_desk', 'hm_cakes', 'hm_honey', 'hm_workbench', 'hm_rings', 'hm_loco', 'hm_stove', 'hm_skis', 'hm_woodpile', 'hm_nets', 'hm_fishrack', 'hm_tackle',
  'hm_armchair', 'hm_bench', 'hm_saunastove', 'hm_bucket', 'hm_telescope', 'hm_flakes', 'hm_reception', 'hm_keys', 'hm_lift', 'hm_sofa', 'hm_palm',
  'hm_luggage', 'hm_skeleton', 'hm_vitrine', 'hm_vitrine_coin', 'hm_painting', 'hm_oldmap', 'hm_rope', 'hm_binoculars', 'hm_guarddesk', 'hm_lamp', 'hm_plant',
];
