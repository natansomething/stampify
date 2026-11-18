/**
 * Checks the live-reading preprocessing (src/core/subtitles.ts) on real screenshots in scripts/fixtures/subtitles/:
 * the subtitle box must be found, the right number of lines extracted (nothing from outside the box), and OCR must
 * read them close to the expected text. Run after any change to subtitles.ts:  npm run test:subs
 * (The first run downloads the OCR language data, about 2 MB per language, into node_modules/.cache.)
 * Add a case: put the screenshot in the fixtures folder and a line in CASES.
 */
import { createReadStream } from 'node:fs';
import { mkdirSync } from 'node:fs';
import * as PImage from 'pureimage';
import { createWorker, PSM, type Worker } from 'tesseract.js';

// ImageData exists in browsers only
(globalThis as { ImageData?: unknown }).ImageData ??= class {
  width: number; height: number; data: Uint8ClampedArray;
  constructor(w: number, h: number) { this.width = w; this.height = h; this.data = new Uint8ClampedArray(w * h * 4); }
};
const { extractSubtitles } = await import('../src/core/subtitles');
const { VideoFinder, SNAP_W, SNAP_H, subtitleArea } = await import('../src/core/videoArea');

/** [file, tesseract language, expected lines, whether the text sits on a subtitle box]. */
const CASES: [string, string, string[], boolean][] = [
  ['zh-zaizhe', 'chi_sim', ['在这'], true],
  ['zh-zhuishangqu', 'chi_sim', ['追上去'], true],
  ['zh-boakaiyunduo', 'chi_sim', ['拨开云朵'], true],
  ['zh-difang-youtube-controls', 'chi_sim', ['就是地方有点偏'], true],
  ['zh-tiao-small-box', 'chi_sim', ['跳'], true],
  ['de-westlichen', 'deu', ['vor allem westlichen Produkten, Ideen,', 'Kunst und Medien.'], true],
  ['de-ware-wood', 'deu', ['bei denen man sich selbst Ware aus der', 'Auslage nimmt und dann an der'], true],
  ['de-apfelsorte-dark', 'deu', ['Moment mal, welche Apfelsorte habe ich', 'denn da jetzt gerade ausgewählt?'], true],
];

/** OCR text is accepted from this similarity on (1 = identical). */
const MIN_SIMILARITY = 0.7;

const bare = (s: string) => s.replace(/\s+/g, '');
function similarity(a: string, b: string): number {
  const x = bare(a), y = bare(b);
  let prev = Array.from({ length: y.length + 1 }, (_, k) => k);
  for (let i = 1; i <= x.length; i++) {
    const cur = [i];
    for (let j = 1; j <= y.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
    prev = cur;
  }
  return 1 - prev[y.length] / Math.max(1, x.length, y.length);
}

/** The line enlarged to ~44 px text height (bilinear), as the app does before OCR. */
function scaled(img: ImageData, h: number) {
  const z = Math.min(3, Math.max(0.5, 44 / h));
  const sw = img.width, sh = img.height, tw = Math.round(sw * z), th = Math.round(sh * z);
  const out = PImage.make(tw, th);
  const g = (x: number, y: number) => img.data[(y * sw + x) * 4];
  for (let y = 0; y < th; y++) {
    for (let x = 0; x < tw; x++) {
      const fx = Math.min(sw - 1, Math.max(0, (x + 0.5) / z - 0.5));
      const fy = Math.min(sh - 1, Math.max(0, (y + 0.5) / z - 0.5));
      const x0 = Math.floor(fx), y0 = Math.floor(fy), x1 = Math.min(sw - 1, x0 + 1), y1 = Math.min(sh - 1, y0 + 1);
      const ax = fx - x0, ay = fy - y0;
      const v = (g(x0, y0) * (1 - ax) + g(x1, y0) * ax) * (1 - ay) + (g(x0, y1) * (1 - ax) + g(x1, y1) * ax) * ay;
      const o = (y * tw + x) * 4;
      out.data[o] = out.data[o + 1] = out.data[o + 2] = Math.round(v);
      out.data[o + 3] = 255;
    }
  }
  return out;
}

async function png(img: { width: number; height: number; data: Uint8ClampedArray | Uint8Array }): Promise<Buffer> {
  const chunks: Buffer[] = [];
  const { PassThrough } = await import('node:stream');
  const s = new PassThrough();
  s.on('data', (c: Buffer) => chunks.push(c));
  await PImage.encodePNGToStream(img as never, s);
  return Buffer.concat(chunks);
}

const cachePath = new URL('../node_modules/.cache/tesseract', import.meta.url).pathname;
mkdirSync(cachePath, { recursive: true });
const workers: Record<string, Worker> = {};
let failed = 0;
for (const [file, lang, want, boxed] of CASES) {
  const img = await PImage.decodePNGFromStream(createReadStream(new URL(`./fixtures/subtitles/${file}.png`, import.meta.url)));
  const src = new ImageData(img.width, img.height);
  src.data.set(img.data);
  const ex = extractSubtitles(src);
  const problems: string[] = [];
  if (ex.boxed !== boxed) problems.push(boxed ? 'subtitle box not found' : 'found a box that is not there');
  if (ex.lines.length !== want.length) problems.push(`${ex.lines.length} lines extracted, expected ${want.length}`);
  if (!workers[lang]) {
    workers[lang] = await createWorker(lang, undefined, { cachePath });
    await workers[lang].setParameters({ tessedit_pageseg_mode: PSM.SINGLE_LINE });
  }
  const got: string[] = [];
  for (const [k, line] of ex.lines.entries()) {
    const { data } = await workers[lang].recognize(await png(scaled(line.img, line.h)));
    const text = data.text.trim();
    got.push(`${text} (${data.confidence.toFixed(0)}%)`);
    if (want[k] !== undefined && similarity(text, want[k]) < MIN_SIMILARITY) problems.push(`line ${k + 1} read as "${text}"`);
  }
  if (problems.length) failed++;
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${file}: ${got.join(' | ') || '(nothing)'}${problems.length ? `\n     ${problems.join('; ')}` : ''}`);
}
for (const w of Object.values(workers)) await w.terminate();
console.log(`\n${CASES.length - failed}/${CASES.length} read correctly`);

// Robustness: the same screenshots scaled (the shared window and the area are rarely at the screenshot's size) and
// with slight colour noise (compression): the box must still be found and give the same number of lines.
function resized(src: ImageData, z: number): ImageData {
  const sw = src.width, sh = src.height, tw = Math.round(sw * z), th = Math.round(sh * z);
  const out = new ImageData(tw, th);
  for (let y = 0; y < th; y++) {
    for (let x = 0; x < tw; x++) {
      const fx = Math.min(sw - 1, Math.max(0, (x + 0.5) / z - 0.5)), fy = Math.min(sh - 1, Math.max(0, (y + 0.5) / z - 0.5));
      const x0 = Math.floor(fx), y0 = Math.floor(fy), x1 = Math.min(sw - 1, x0 + 1), y1 = Math.min(sh - 1, y0 + 1), ax = fx - x0, ay = fy - y0;
      for (let c = 0; c < 4; c++) {
        const g = (xx: number, yy: number) => src.data[(yy * sw + xx) * 4 + c];
        out.data[(y * tw + x) * 4 + c] = (g(x0, y0) * (1 - ax) + g(x1, y0) * ax) * (1 - ay) + (g(x0, y1) * (1 - ax) + g(x1, y1) * ax) * ay;
      }
    }
  }
  return out;
}
let seed = 7;
const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
function noisy(src: ImageData, amp: number): ImageData {
  const out = new ImageData(src.width, src.height);
  out.data.set(src.data);
  for (let i = 0; i < out.data.length; i += 4) for (let c = 0; c < 3; c++) out.data[i + c] = out.data[i + c] + Math.round((rnd() * 2 - 1) * amp);
  return out;
}
const VARIANTS: [string, (s: ImageData) => ImageData][] = [
  ['60%', (s) => resized(s, 0.6)], ['75%', (s) => resized(s, 0.75)], ['90%', (s) => resized(s, 0.9)],
  ['133%', (s) => resized(s, 1.33)], ['150%', (s) => resized(s, 1.5)], ['noise', (s) => noisy(s, 4)], ['75% + noise', (s) => noisy(resized(s, 0.75), 4)],
];
let robustFailed = 0;
for (const [file, , want, boxed] of CASES) {
  const img = await PImage.decodePNGFromStream(createReadStream(new URL(`./fixtures/subtitles/${file}.png`, import.meta.url)));
  const src = new ImageData(img.width, img.height);
  src.data.set(img.data);
  const bad = VARIANTS.filter(([, f]) => { const ex = extractSubtitles(f(src)); return ex.boxed !== boxed || ex.lines.length !== want.length; }).map(([v]) => v);
  if (bad.length) { robustFailed++; console.log(`FAIL ${file} at ${bad.join(', ')}`); }
}
// The rolling caption frames too: two lines on boxes each, whose second box blends into a dark picture
for (let k = 1; k <= 7; k++) {
  const img = await PImage.decodePNGFromStream(createReadStream(new URL(`./fixtures/subtitles/roll-de-${k}.png`, import.meta.url)));
  const src = new ImageData(img.width, img.height);
  src.data.set(img.data);
  const bad = [['100%', (x: ImageData) => x] as [string, (s: ImageData) => ImageData], ...VARIANTS].filter(([, f]) => { const ex = extractSubtitles(f(src)); return !ex.boxed || ex.lines.length !== 2; }).map(([v]) => v);
  if (bad.length) { robustFailed++; console.log(`FAIL roll-de-${k} at ${bad.join(', ')}`); }
}
console.log(`${CASES.length + 7 - robustFailed}/${CASES.length + 7} found at every size and with noise`);

// Automatic placement: a page with a playing video in it (the picture changes between snapshots, the page around
// it doesn't), letterboxed or not, and full screen: the area must be the bottom 30% of the video.
function snapshot(t: number, video: { x: number; y: number; w: number; h: number }, bars = 0): ImageData {
  const img = new ImageData(SNAP_W, SNAP_H);
  for (let y = 0; y < SNAP_H; y++) {
    for (let x = 0; x < SNAP_W; x++) {
      const o = (y * SNAP_W + x) * 4;
      let v = 245; // the page: white, still
      if (x >= 10 && x < 40 && y >= 70 && y < 80) v = 120; // a still button
      const inside = x >= video.x && x < video.x + video.w && y >= video.y && y < video.y + video.h;
      if (inside) {
        const inBar = y < video.y + bars || y >= video.y + video.h - bars;
        v = inBar ? 0 : 120 + Math.round(80 * Math.sin((x + t * 7) / 6) * Math.cos((y - t * 5) / 5));
      }
      img.data[o] = img.data[o + 1] = img.data[o + 2] = Math.max(0, Math.min(255, v));
      img.data[o + 3] = 255;
    }
  }
  return img;
}
let locateFailed = 0;
const cases: [string, { x: number; y: number; w: number; h: number }, number, { x: number; y: number; w: number; h: number }][] = [
  ['player in a page', { x: 20, y: 8, w: 100, h: 56 }, 0, { x: 20 / SNAP_W, y: (8 + 56 * 0.7) / SNAP_H, w: 100 / SNAP_W, h: (56 * 0.3) / SNAP_H }],
  ['letterboxed player', { x: 20, y: 8, w: 100, h: 56 }, 6, { x: 20 / SNAP_W, y: (8 + 56 * 0.7) / SNAP_H, w: 100 / SNAP_W, h: (56 * 0.3) / SNAP_H }],
  ['full screen', { x: 0, y: 0, w: SNAP_W, h: SNAP_H }, 0, { x: 0, y: 0.7, w: 1, h: 0.3 }],
];
for (const [name, video, bars, want] of cases) {
  const f = new VideoFinder();
  let last = snapshot(0, video, bars);
  for (let t = 0; t <= 8; t++) { last = snapshot(t, video, bars); f.add(last); }
  const v = f.video(last);
  const a = v && subtitleArea(v);
  const close = (p: number, q: number) => Math.abs(p - q) < 0.03;
  const ok = !!a && close(a.x, want.x) && close(a.y, want.y) && close(a.w, want.w) && close(a.h, want.h);
  if (!ok) { locateFailed++; console.log(`FAIL video area (${name}): ${JSON.stringify(a)}, expected ${JSON.stringify(want)}`); }
}
{ // a still page: no video
  const f = new VideoFinder();
  const still = snapshot(0, { x: 0, y: 0, w: 0, h: 0 });
  for (let t = 0; t < 8; t++) f.add(still);
  if (f.video(still)) { locateFailed++; console.log('FAIL video area: found a video on a still page'); }
}
console.log(`${4 - locateFailed}/4 video areas found`);

// Rolling automatic captions (YouTube, German): frames 2-4 seconds apart, each a two-line window that grows word by
// word and scrolls up. Read in order, the merged text must be the sentence once, without repeats; also when frames
// are missed (the reader was still busy).
const { CaptionMerger, clean } = await import('../src/core/captions');
const ROLL = { frames: 7, want: 'Und dann musste ich halt mit diesem angebrochenen Prozess doch zwei, drei Minuten irgendwie warten, dass jemand kommt und mir das System zurücksetzt.' };
const rollWorker = await createWorker('deu', undefined, { cachePath });
await rollWorker.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_LINE });
const read: { lines: string[]; ms: number }[] = [];
for (let k = 1; k <= ROLL.frames; k++) {
  const img = await PImage.decodePNGFromStream(createReadStream(new URL(`./fixtures/subtitles/roll-de-${k}.png`, import.meta.url)));
  const src = new ImageData(img.width, img.height);
  src.data.set(img.data);
  const t0 = performance.now();
  const ex = extractSubtitles(src);
  const t1 = performance.now();
  const lines: string[] = [];
  for (const line of ex.lines) {
    const { data } = await rollWorker.recognize(await png(scaled(line.img, line.h)));
    const t = clean(data.text.replace(/\n/g, ' '));
    if (t && data.confidence >= 35) lines.push(t);
  }
  read.push({ lines, ms: performance.now() - t0 });
  console.log(`     frame ${k}: ${ex.boxed ? 'box' : 'outline'}, ${(t1 - t0).toFixed(0)} ms + OCR ${(performance.now() - t1).toFixed(0)} ms: ${lines.join(' | ')}`);
}
await rollWorker.terminate();
const merged = (frames: number[]) => {
  const m = new CaptionMerger();
  const out: string[] = [];
  for (const k of frames) for (const line of read[k].lines) {
    const r = m.add(line);
    if (r === 'replace' && out.length) out[out.length - 1] = line; else if (r === 'add') out.push(line);
  }
  return out.join(' ');
};
let rollFailed = 0;
for (const [name, frames] of [['every frame', [0, 1, 2, 3, 4, 5, 6]], ['every other frame', [0, 2, 4, 6]], ['frames 1, 2, 5, 7', [0, 1, 4, 6]]] as const) {
  const got = merged([...frames]);
  const ok = similarity(got, ROLL.want) >= 0.9;
  if (!ok) rollFailed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} rolling captions, ${name}: ${got}`);
}
console.log(`${3 - rollFailed}/3 rolling caption sequences merged`);
process.exit(failed || robustFailed || locateFailed || rollFailed ? 1 : 0);
