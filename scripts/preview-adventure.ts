/**
 * Renders the adventure map with its characters to dev/out/adventure.png (and a sprite sheet to
 * dev/out/adventure-sprites.png), to look at the art without running the app. Usage: npx tsx scripts/preview-adventure.ts
 */
import sharp from 'sharp';
import { BIG_TREES, CAT, FOREST_TREES, ITEMS, NPCS, T } from '../src/games/adventure/art';
import { Pix } from '../src/games/adventure/pix';
import { buildWorld, drawWorld, MARGIN } from '../src/games/adventure/render';
import { MAPS, newSave } from '../src/games/adventure/world';

async function png(p: Pix, file: string, scale = 3) {
  await sharp(Buffer.from(p.d.buffer), { raw: { width: p.w, height: p.h, channels: 4 } })
    .resize(p.w * scale, p.h * scale, { kernel: 'nearest' }).png().toFile(file);
  console.log(file);
}

const m = MAPS[process.argv[4] || 'village'];
const world = buildWorld(m);
const [layer] = world.ground;
const pad = 2;
const out = new Pix((m.rows[0].length + 2 * pad) * T, (m.rows.length + 2 * pad) * T);
const sx = (MARGIN - pad) * T;
for (let y = 0; y < out.h; y++) for (let x = 0; x < out.w; x++) out.set(x, y, layer.get(x + sx, y + sx));
const blit = (p: Pix, x: number, y: number, flip = false, a = 0, b = p.h) => out.blit(p, x, y, flip, a, b);
const save = newSave();
const pos = process.argv[2] ? process.argv[2].split(',').map(Number) : [save.x, save.y];
const dir = (process.argv[3] || 'down') as 'down';
drawWorld(blit, m, world, save, { px: pos[0] * T, py: pos[1] * T, dir, step: 0, moving: false }, 0, pad * T, pad * T, { x: -pad * T, y: -pad * T, w: out.w, h: out.h });
await png(out, `dev/out/adventure${m.id === 'village' ? '' : '-' + m.id}.png`, 2);

const sheet = new Pix(16 * 12 + 48 * 3 + 40, 64);
let x = 0;
for (const k of ['down', 'up', 'side'] as const) for (const f of CAT[k]) { sheet.blit(f, x, 0); x += 16; }
for (const n of Object.values(NPCS)) { sheet.blit(n, x, 0); x += 16; }
let ix = 0; for (const it of Object.values(ITEMS)) { sheet.blit(it, ix, 24); ix += 18; }
for (const t of Object.values(BIG_TREES)) { sheet.blit(t, x, 0); x += 50; }
await png(sheet, 'dev/out/adventure-sprites.png', 5);

// close-up of the trees on grass
const trees = new Pix(48 * 3 + 34 * 2 + 12, 50);
trees.fill(0, 0, trees.w, trees.h, 0x86d063ff);
let tx = 2;
for (const t of Object.values(BIG_TREES)) { trees.blit(t, tx, 1); tx += 52; }
for (const t of FOREST_TREES) { trees.blit(t, tx, 5); tx += 34; }
await png(trees, 'dev/out/adventure-trees.png', 7);

// the world map, everything revealed
const { drawWorldMap, WORLD_COUNTRIES } = await import('../src/games/adventure/worldmap');
await png(drawWorldMap(new Set(WORLD_COUNTRIES.map((c) => c.id))), 'dev/out/adventure-world.png', 3);

// every character and item, 6× (to check new sprites)
{
  const { NPCS, ITEMS, BRAMBLE, TOWNGATE, BRIDGE, wheel, fountain } = await import('../src/games/adventure/art');
  const npcs = Object.values(NPCS), items = Object.values(ITEMS);
  const sheet2 = new Pix(Math.max(npcs.length, items.length) * 18 + 120, 70);
  sheet2.fill(0, 0, sheet2.w, sheet2.h, 0xa8e486ff);
  npcs.forEach((n, i) => sheet2.blit(n, i * 18, 0));
  items.forEach((n, i) => sheet2.blit(n, i * 18, 18));
  [BRAMBLE, TOWNGATE, BRIDGE, wheel(0), fountain(0)].reduce((x, a) => { sheet2.blit(a, x, 36); return x + a.w + 2; }, 0);
  await png(sheet2, 'dev/out/adventure-npcs.png', 5);
}
