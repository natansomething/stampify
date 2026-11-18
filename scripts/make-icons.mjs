// Builds Stampify's icon files from logo design 16 ("Stamp album"), with every letter as a path (no fonts needed).
// usage: node scripts/make-icons.mjs <fonts dir> public
// Fonts (WOFF subsets from Google Fonts): bsd.woff Big Shoulders Display 800 (A S), osw.woff Oswald 700 (Я),
// sc.woff Noto Serif SC 700 (字), kr.woff Noto Serif KR 700 (한).
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';

const require = createRequire(import.meta.url);
const opentype = require('opentype.js');
const sharp = require('sharp');

const [fontsDir, out] = process.argv.slice(2);
/** WOFF 1 -> plain sfnt (TrueType): unpack the zlib-compressed tables and rebuild the table directory. */
function woffToSfnt(w) {
  const n = w.readUInt16BE(12);
  const tables = [];
  for (let i = 0; i < n; i++) {
    const o = 44 + i * 20;
    const tag = w.toString('latin1', o, o + 4), off = w.readUInt32BE(o + 4), comp = w.readUInt32BE(o + 8), orig = w.readUInt32BE(o + 12), sum = w.readUInt32BE(o + 16);
    const raw = w.subarray(off, off + comp);
    tables.push({ tag, sum, data: comp < orig ? inflateSync(raw) : raw });
  }
  const head = 12 + n * 16;
  let size = head;
  for (const t of tables) size += (t.data.length + 3) & ~3;
  const s = Buffer.alloc(size);
  s.writeUInt32BE(w.readUInt32BE(4), 0);
  s.writeUInt16BE(n, 4);
  let p = 1, e = 0; while (p * 2 <= n) { p *= 2; e++; }
  s.writeUInt16BE(p * 16, 6); s.writeUInt16BE(e, 8); s.writeUInt16BE(n * 16 - p * 16, 10);
  let off = head;
  tables.forEach((t, i) => {
    const o = 12 + i * 16;
    s.write(t.tag, o, 'latin1'); s.writeUInt32BE(t.sum, o + 4); s.writeUInt32BE(off, o + 8); s.writeUInt32BE(t.data.length, o + 12);
    t.data.copy(s, off);
    off += (t.data.length + 3) & ~3;
  });
  return s;
}
const load = (f) => {
  let b = readFileSync(join(fontsDir, f));
  if (b.toString('latin1', 0, 4) === 'wOFF') b = woffToSfnt(b);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const bsd = load('bsd.woff'), sc = load('sc.woff'), kr = load('kr.woff'), osw = load('osw.woff'); // Big Shoulders has no Cyrillic: Я from Oswald

/** A text-anchor="middle" glyph run as a path. */
function glyph(font, text, cx, y, size, fill) {
  const w = font.stringToGlyphs(text).reduce((n, g) => n + g.advanceWidth, 0) * size / font.unitsPerEm;
  return `<path d="${font.getPath(text, cx - w / 2, y, size).toPathData(2)}" fill="${fill}"/>`;
}

const GOLD_L = '#f1d998', GOLD = '#d4b26a', NAVY = '#14234b', WHITE = '#fafcfa';
function stamp(x, y, fill, rot, frame, frameOp, letter) {
  const c = [x + 80, y + 80];
  return `<g transform="rotate(${rot} ${c[0]} ${c[1]})">
<rect x="${x}" y="${y}" width="160" height="160" fill="${fill}"/>
<rect x="${x}" y="${y}" width="160" height="160" fill="none" stroke="${GOLD_L}" stroke-width="14" stroke-dasharray="0 26.667" stroke-linecap="round"/>
<rect x="${x + 14}" y="${y + 14}" width="132" height="132" fill="none" stroke="${frame}" stroke-width="3"${frameOp ? ` opacity="${frameOp}"` : ''}/>
${letter}
</g>`;
}

const art = [
  stamp(98, 98, '#b42a22', -8, GOLD_L, 0.7, glyph(bsd, 'A', 178, 214, 100, WHITE)),
  stamp(254, 98, NAVY, 7, GOLD, 0, glyph(sc, '字', 334, 207, 84, GOLD_L)),
  stamp(98, 254, '#5b3a9e', 5, GOLD_L, 0.7, glyph(osw, 'Я', 178, 369, 86, WHITE)),
  stamp(254, 254, '#1c6b45', -6, GOLD_L, 0.7, glyph(kr, '한', 334, 363, 80, WHITE)),
  `<circle cx="256" cy="256" r="50" fill="${GOLD_L}" stroke="${NAVY}" stroke-width="6"/>`,
  `<circle cx="256" cy="256" r="40" fill="none" stroke="${NAVY}" stroke-width="2"/>`,
  glyph(bsd, 'S', 256, 281, 70, NAVY),
].join('\n');

/** rounded: the app-icon shape; otherwise a full square (maskable / Apple) with the art scaled into the safe zone. */
const svg = (rounded, scale = 1) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<title>Stampify</title>
${rounded ? `<rect width="512" height="512" rx="112" fill="${GOLD_L}"/>` : `<rect width="512" height="512" fill="${GOLD_L}"/>`}
<g transform="translate(256 256) scale(${scale}) translate(-256 -256)">
${art}
</g>
</svg>
`;

writeFileSync(join(out, 'icon.svg'), svg(true));
const png = (s, size, file) => sharp(Buffer.from(s), { density: 72 * size / 512 * 4 }).resize(size, size).png().toFile(join(out, file));
await png(svg(true), 512, 'icon-512.png');
await png(svg(true), 192, 'icon-192.png');
await png(svg(false, 0.8), 512, 'icon-maskable-512.png');
await png(svg(false, 0.88), 180, 'apple-touch-icon.png');
console.log('done');
