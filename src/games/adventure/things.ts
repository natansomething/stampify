/** What the thing in front of the cat is called (the "name it" key). See THINGS in world.ts. */
import { cityFacing, TILE_THINGS, STAIRS, EDGE, FENCE, FOREST, PATH, RED, ROCK, TALL, TRACK, TRACK_H, WATER, WHITE, YELLOW, ZEBRA } from './art';
import { tileAt } from './render';
import { present, size, type MapDef, type Save, type Thing } from './world';

export function thingAt(m: MapDef, x: number, y: number, s: Save): Thing {
  const o = m.objs.find((o) => {
    if (!present(o, s)) return false;
    const { w, h } = size(o);
    return x >= o.x && x < o.x + w && y >= o.y && y < o.y + h;
  });
  if (o) {
    switch (o.k) {
      case 'npc': return o.npc;
      case 'house': return x === o.x + 2 && y === o.y + 3 ? 'door' : o.id.startsWith('office') ? 'office' : o.id === 'station' ? 'station' : 'house';
      case 'tree': return o.tree;
      case 'log': return 'trunk';
      case 'drift': return 'snowdrift';
      case 'gate': return 'barrier';
      case 'sign': return 'sign';
      case 'cave': return 'cave';
      case 'desk': return 'counter';
      case 'chair': return 'deckchair';
      case 'flag': return 'flag';
      case 'plant': return 'plant';
      case 'item': return o.item === 'shovel' ? 'shovel' : o.item.startsWith('mushroom') ? 'mushroom' : o.item.startsWith('suitcase') ? 'suitcase' : o.item === 'acorn' ? 'acorn' : 'stone';
      case 'bramble': return 'bramble';
      case 'pole': return 'barrier';
      case 'door': return 'door';
      case 'metro': return 'metro';
      case 'stall': return 'stall';
      case 'lamp': return 'lamp';
      case 'ship': return 'ship';
      case 'train': return o.kind === 'train' ? 'train' : 'metrotrain';
      case 'decor': return o.art === 'ticketmachine' ? 'ticketmachine' : o.art === 'board' || o.art === 'board2' ? 'board' : o.art === 'pillar' ? 'pillar' : o.art.startsWith('poster') ? 'poster' : o.art.startsWith('psign') ? 'platformsign' : o.art.startsWith('car') ? 'car' : o.art === 'flowers' ? 'flowerbed' : (o.art as Thing);
      case 'block': return o.art;
      case 'towngate': return 'towngate';
      case 'bridge': return 'bridge';
      case 'wheel': return 'wheel';
      case 'fountain': return 'fountain';
    }
  }
  const c = tileAt(m, x, y), t = m.theme;
  const own = TILE_THINGS[t]?.(c);
  if (own) return own;
  if (c === TRACK || c === TRACK_H) return 'track';
  if (c === EDGE) return 'platform';
  if (c === PATH && t === 'subway') return 'stairs';
  if (c === STAIRS) return 'stairs';
  if (t === 'hall' || t === 'subway') return c === FOREST ? 'wall' : c === PATH ? 'mat' : 'floor';
  if (c === WATER) return m.water ?? (t === 'snow' ? 'ice' : t === 'beach' ? 'sea' : 'pond');
  if (c === PATH) return t === 'beach' ? 'boardwalk' : t === 'indoor' ? 'mat' : t === 'cave' ? 'exit' : t === 'town' || t === 'city' || t === 'oldtown' ? 'road' : 'path';
  if (c === ZEBRA) return 'crosswalk';
  if (c === FOREST) return t === 'beach' ? 'palm' : t === 'cave' ? 'rockwall' : t === 'indoor' ? 'wall' : t === 'city' || t === 'oldtown' ? (cityFacing((xx, yy) => tileAt(m, xx, yy), x, y) ? 'building' : 'park') : 'forest';
  if (c === TALL) return 'tallgrass';
  if (c === ROCK) return t === 'cave' ? 'crystal' : t === 'city' || t === 'oldtown' ? 'planter' : 'stone';
  if (c === FENCE) return 'fence';
  if (c === RED || c === YELLOW || c === WHITE) return t === 'beach' ? (c === RED ? 'starfish' : 'shell') : t === 'snow' ? 'snow' : 'flower';
  return t === 'snow' ? 'snow' : t === 'beach' ? 'sand' : t === 'cave' || t === 'indoor' ? 'floor' : t === 'town' || t === 'oldtown' ? 'cobbles' : t === 'city' ? 'pavement' : 'grass';
}
