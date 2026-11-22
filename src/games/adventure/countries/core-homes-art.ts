/**
 * The homes of Woodland, Frostland and the Megacity: interior themes (walls two tiles high, floors, rugs, the door
 * mat) and the furniture, all drawn in code. Light comes from the top left; every piece has a dark outline and 3–4
 * shades. Furniture is DECOR (footprint in DECOR_SIZE); pieces standing at the back wall are drawn taller, so they
 * cover the wall behind them, and wall things (windows, herbs, nets, pictures) stand on the wall's lower row.
 */
import { DECOR, DECOR_SIZE, canopy, disc, line, outlined, poly, registerTheme, shadowEllipse, T, type TerrainHook } from '../art';
import { hash, hex, Pix } from '../pix';

const H = hex;
type Col = number;

// ---------------------------------------------------------------- colour helpers

const rgb = (c: Col) => [c >>> 24, (c >>> 16) & 255, (c >>> 8) & 255] as const;
const pack = (r: number, g: number, b: number, a = 255) => ((Math.round(r) << 24) | (Math.round(g) << 16) | (Math.round(b) << 8) | a) >>> 0;
/** Mixes two colours (t = 0: a, 1: b). */
const mix = (a: Col, b: Col, t: number): Col => { const [r1, g1, b1] = rgb(a), [r2, g2, b2] = rgb(b); return pack(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t); };
/** Darker (k < 1) or lighter (k > 1). */
const dk = (c: Col, k: number): Col => { const [r, g, b] = rgb(c); const f = (v: number) => Math.max(0, Math.min(255, v * k)); return pack(f(r), f(g), f(b)); };
const alpha = (c: Col, a: number): Col => ((c & 0xffffff00) | Math.max(0, Math.min(255, Math.round(a * 255)))) >>> 0;
const tones = (...cs: string[]) => cs.map(H);

function rect(p: Pix, x: number, y: number, w: number, h: number, c: Col | ((x: number, y: number) => Col)) {
  for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) p.set(xx, yy, typeof c === 'number' ? c : c(xx, yy));
}
/** A box lit from the top left: [light, mid, dark] edges around a mid fill. */
function bevel(p: Pix, x: number, y: number, w: number, h: number, [l, m, d]: Col[]) {
  rect(p, x, y, w, h, m);
  rect(p, x, y, w, 1, l); rect(p, x, y, 1, h, l);
  rect(p, x, y + h - 1, w, 1, d); rect(p, x + w - 1, y, 1, h, d);
}
/**
 * A piece of furniture: `body` draws the solid shapes (outlined afterwards in `out`), `after` the details on top;
 * `shadow` a soft ellipse on the floor under it.
 */
function piece(w: number, h: number, body: (p: Pix) => void, after?: (p: Pix) => void, opt: { out?: Col; shadow?: [number, number, number, number] } = {}): Pix {
  const layer = new Pix(w, h);
  body(layer);
  const p = new Pix(w, h);
  if (opt.shadow) { const [cx, cy, rx, ry] = opt.shadow; shadowEllipse(p, cx, cy, rx, ry, H('#1a0e0640')); }
  outlined(p, layer, 0, 0, opt.out ?? OUT);
  after?.(p);
  return p;
}
function add(name: string, size: [number, number], art: Pix) { DECOR[name] = art; DECOR_SIZE[name] = size; }

const OUT = H('#24160c');
const IRON = H('#16161c');
const OAK = tones('#e2ae72', '#c08850', '#9a6436', '#6e4422');
const PINE = tones('#f2d49e', '#dcb47a', '#b88a54', '#8a6236');
const DARKWOOD = tones('#a8603e', '#7e4228', '#5e2e1c', '#3e1c10');
const GREY = tones('#f0ece4', '#cdc6ba', '#a49c90', '#77706a');
const STONE = tones('#d4cab6', '#b4a892', '#948874', '#6e6456');
const BRASS = tones('#fff0a0', '#e8c25a', '#b88a30', '#7a5618');
const STEEL = tones('#f4f6fa', '#c8ced8', '#9aa2b0', '#6a7280');
const PAPER = H('#f4ecd8');

// ---------------------------------------------------------------- interior themes

interface Rug { tones: Col[]; kind: 'rag' | 'fur' | 'runner' | 'woven' | 'braid' }
interface Room {
  /** The wall's upper tile (under the ceiling) and lower tile (down to the floor): colour of pixel (i, j), wx the world x. */
  upper(i: number, j: number, wx: number): Col;
  lower(i: number, j: number, wx: number): Col;
  floor(wx: number, wy: number): Col;
  /** Rugs on the walkable small-detail codes. */
  rugs: Partial<Record<string, Rug>>;
  top: [string, string];
  /** The lit rim on top of the walls (light, dark). */
  edge?: [string, string];
  /** Colour of the edge between wall and floor (shadow). */
  shade?: number;
}

const noise = (wx: number, wy: number, s: number) => hash(wx, wy, s);

function rug(p: Pix, ox: number, oy: number, tx: number, ty: number, at: (x: number, y: number) => string, code: string, r: Rug) {
  const same = (dx: number, dy: number) => at(tx + dx, ty + dy) === code;
  const L = !same(-1, 0), R = !same(1, 0), U = !same(0, -1), D = !same(0, 1);
  const t = r.tones;
  for (let j = 0; j < T; j++) for (let i = 0; i < T; i++) {
    const wx = tx * T + i, wy = ty * T + j;
    // margins: the rug starts 2 px in from its outer tiles
    const ml = L ? 2 : 0, mr = R ? 13 : 15, mu = U ? 2 : 0, md = D ? 13 : 15;
    if (i < ml || i > mr || j < mu || j > md) continue;
    const cl = (L && i === ml) || (R && i === mr), cu = (U && j === mu) || (D && j === md);
    // rounded corners
    if (cl && cu) continue;
    const edge = cl || cu;
    const inner = (L && i === ml + 1) || (R && i === mr - 1) || (U && j === mu + 1) || (D && j === md - 1);
    let c: Col;
    if (r.kind === 'rag') {
      // a rag rug: woven stripes of leftover cloth
      const band = Math.floor(wy / 3);
      c = t[1 + Math.floor(hash(band, 0, 901) * (t.length - 1))];
      if (wy % 3 === 2) c = dk(c, 0.82);
      if ((wx + band) % 4 === 0) c = dk(c, 0.92);
      if (edge) c = t[0];
    } else if (r.kind === 'braid') {
      // a braided rug: rings around its middle
      const k = Math.min(L ? i - ml : 99, R ? mr - i : 99, U ? j - mu : 99, D ? md - j : 99);
      c = t[1 + (Math.floor((k + (wx + wy) % 2) / 2) % (t.length - 1))];
      if (edge) c = t[0];
    } else if (r.kind === 'fur') {
      // a fur: soft, tufted, ragged at the edge
      const n = noise(wx >> 1, wy >> 1, 903) + noise(wx, wy, 904) * 0.3;
      c = n < 0.35 ? t[2] : n < 0.95 ? t[1] : t[3];
      if (edge) { if (hash(wx, wy, 905) < 0.45) continue; c = t[0]; }
    } else if (r.kind === 'runner') {
      // a hotel carpet: deep red with a gold border and a small pattern
      c = t[1];
      if (inner || ((L && i === ml + 2) || (R && i === mr - 2) || (U && j === mu + 2) || (D && j === md - 2))) c = t[3];
      else if ((wx % 8 === 4 && wy % 8 === 4) || ((wx + 4) % 8 === 4 && (wy + 4) % 8 === 4)) c = t[2];
      if (edge) c = t[0];
    } else {
      // woven: a band of diamonds (Frostland)
      const dx = Math.abs((wx % 8) - 3.5), dy = Math.abs((wy % 8) - 3.5);
      c = dx + dy < 3 ? t[2] : dx + dy < 4 ? t[3] : t[1];
      if (inner) c = t[3];
      if (edge) c = t[0];
    }
    p.set(ox + i, oy + j, c);
  }
  // the rug's shadow along its lower edge
  if (D) for (let i = L ? 3 : 0; i < (R ? 13 : 16); i++) p.set(ox + i, oy + 14, H('#00000030'));
}

function mat(p: Pix, ox: number, oy: number, room: Room, tx: number, ty: number) {
  for (let j = 0; j < T; j++) for (let i = 0; i < T; i++) p.set(ox + i, oy + j, room.floor(tx * T + i, ty * T + j));
  for (let j = 0; j < 4; j++) for (let i = 0; i < T; i++) p.set(ox + i, oy + j, H('#00000028'));
  for (let j = 3; j < 14; j++) for (let i = 1; i < 15; i++) {
    const edge = j === 3 || j === 13 || i === 1 || i === 14;
    p.set(ox + i, oy + j, edge ? H('#4a3018') : (i + j) % 2 ? H('#b88a4a') : H('#a07434'));
  }
  for (let i = 3; i < 13; i++) p.set(ox + i, oy + 8, H('#7a5428'));
}

function roomHook(room: Room): TerrainHook {
  const top = [H(room.top[0]), H(room.top[1])];
  const edge = [H(room.edge?.[0] ?? '#8a6a4a'), H(room.edge?.[1] ?? '#5a4030')];
  return (p, ox, oy, tx, ty, at) => {
    const c = at(tx, ty);
    if (c === '#') {
      const below = at(tx, ty + 1) !== '#';
      const upper = !below && at(tx, ty + 2) !== '#';
      for (let j = 0; j < T; j++) for (let i = 0; i < T; i++) {
        const wx = tx * T + i;
        let col = top[0];
        // the top of a wall next to the room: a lit rim, so side and front walls read as walls
        if (!below && !upper) {
          const fl = (dx: number, dy: number) => { const o = at(tx + dx, ty + dy); return o !== '#' && !(o === ':' && at(tx + dx, ty + dy - 1) === ':'); };
          if ((fl(1, 0) || (fl(1, 1) && !fl(0, 1))) && i > 12) col = i === 15 ? top[1] : i === 14 ? edge[0] : edge[1];
          if ((fl(-1, 0) || (fl(-1, 1) && !fl(0, 1))) && i < 3) col = i === 0 ? top[1] : i === 1 ? edge[0] : edge[1];
          if (fl(0, -1) && j < 3) col = j === 0 ? top[1] : j === 1 ? edge[0] : edge[1];
        }
        if (below) col = room.lower(i, j, wx);
        else if (upper) col = room.upper(i, j, wx);
        // the room's corners: the side walls cast a shadow on the wall face
        if ((below || upper) && at(tx - 1, ty + (below ? 1 : 2)) === '#' && i < 3) col = dk(col, 0.7 + i * 0.1);
        if ((below || upper) && at(tx + 1, ty + (below ? 1 : 2)) === '#' && i > 12) col = dk(col, 0.7 + (15 - i) * 0.1);
        p.set(ox + i, oy + j, col);
      }
      return true;
    }
    // (the mat's tile row continues past the map: dark there)
    if (c === ':' && at(tx, ty - 1) === ':') { for (let j = 0; j < T; j++) for (let i = 0; i < T; i++) p.set(ox + i, oy + j, top[0]); return true; }
    if (c === ':') { mat(p, ox, oy, room, tx, ty); return true; }
    for (let j = 0; j < T; j++) for (let i = 0; i < T; i++) {
      let col = room.floor(tx * T + i, ty * T + j);
      // ambient shadow along the walls
      if (at(tx, ty - 1) === '#' && j < 4) col = dk(col, 0.74 + j * 0.06);
      if (at(tx - 1, ty) === '#' && i < 2) col = dk(col, 0.82 + i * 0.08);
      if (at(tx + 1, ty) === '#' && i > 13) col = dk(col, 0.82 + (15 - i) * 0.08);
      p.set(ox + i, oy + j, col);
    }
    const r = room.rugs[c];
    if (r) rug(p, ox, oy, tx, ty, at, c, r);
    return true;
  };
}

const things = (code: string) => (code === '#' ? 'wall' : code === ':' ? 'mat' : code === 'r' || code === 'y' || code === 'w' || code === '"' ? 'hm_rug' : 'floor');
const PAL = {
  ground: ['#c08850', '#b88048', '#c89058', '#d09860'], grassDark: '#7a5030', grassLight: '#e0aa70',
  path: '#b88a4a', pathDark: '#a07434', pathLight: '#d0a060', pathEdge: '#4a3018',
  water: '#5db1ef', waterDeep: '#4795dc', waterLight: '#b9e5ff', waterEdge: '#2f6aa8', foam: '#e6f6ff', shadow: '#2a1a0a44',
};
function theme(name: string, room: Room) { registerTheme(name, PAL, { terrain: roomHook(room), things }); }

/** Horizontal floorboards: rows `h` px tall with staggered joints, a light top line and a dark seam. */
function boards(t: Col[], h: number, len: number, seed: number) {
  return (wx: number, wy: number): Col => {
    const row = Math.floor(wy / h), y = wy % h;
    const off = Math.floor(hash(row, 0, seed) * len);
    const k = Math.floor((wx + off) / len), x = (wx + off) % len;
    if (y === h - 1 || x === 0) return t[3];
    if (y === 0) return t[0];
    const base = t[1 + Math.floor(hash(k, row, seed + 1) * 2)];
    // grain and the odd knot
    if (hash(k, row, seed + 2) < 0.25 && Math.abs(x - 9) < 2 && y === Math.floor(h / 2)) return t[3];
    return hash(wx, row, seed + 3) < 0.08 ? dk(base, 0.92) : base;
  };
}
/** Parquet in a basket weave: 8×8 squares of three slats, turned every other square. */
function parquet(t: Col[]) {
  return (wx: number, wy: number): Col => {
    const cx = wx >> 3, cy = wy >> 3, turn = (cx + cy) % 2 === 0;
    const a = turn ? wy % 8 : wx % 8, b = turn ? wx % 8 : wy % 8;
    if (wx % 8 === 7 || wy % 8 === 7) return t[3];
    if (a % 3 === 2 && a < 7) return t[2];
    return b === 0 ? t[0] : hash(cx, cy * 3 + Math.floor(a / 3), 960) < 0.5 ? t[1] : mix(t[1], t[2], 0.3);
  };
}

// Woodland cottage: half-timbering (white plaster between oak beams) over wooden wainscoting; wide oak floorboards.
const COTTAGE_FLOOR = boards(tones('#d6a26a', '#c08a52', '#b47e48', '#7a4e2c'), 6, 37, 970);
theme('hm_cottage', {
  upper: (i, j, wx) => {
    if (j < 3) return j === 0 ? H('#3e2814') : j === 1 ? H('#8a5a32') : H('#6a4424');
    const post = wx % 48;
    if (post < 4) return post === 0 ? H('#a87444') : post === 3 ? H('#5a3820') : H('#865630');
    // a diagonal brace in every other bay
    const bay = Math.floor(wx / 48) % 2, bx = post - 4;
    if (bay && Math.abs(bx - (j - 3) * 3) < 2) return bx - (j - 3) * 3 < 0 ? H('#a87444') : H('#865630');
    return noise(wx, j, 971) < 0.1 ? H('#e4d8bc') : H('#f2e8d0');
  },
  lower: (i, j, wx) => {
    const post = wx % 48;
    if (j < 5) return post < 4 ? (post === 0 ? H('#a87444') : post === 3 ? H('#5a3820') : H('#865630')) : noise(wx, j, 972) < 0.1 ? H('#e4d8bc') : H('#f2e8d0');
    if (j === 5) return H('#5a3820');
    if (j === 6) return H('#d8a06a');
    if (j === 7) return H('#9a6638');
    if (j >= 14) return j === 14 ? H('#6a4424') : H('#3e2814');
    return wx % 7 === 0 ? H('#4e301a') : wx % 7 === 1 ? H('#9a6638') : H('#7e5030');
  },
  floor: COTTAGE_FLOOR,
  rugs: {
    r: { kind: 'rag', tones: tones('#5a2a20', '#c8483c', '#e8c070', '#4a78b0', '#e8dcc0', '#6aa05a') },
    y: { kind: 'braid', tones: tones('#5a3a1a', '#d8a440', '#a85a2a', '#e8d4a0') },
    w: { kind: 'rag', tones: tones('#2a3a5a', '#5a88c0', '#e8e0cc', '#8ab0d8') },
  },
  top: ['#1a120c', '#3e2814'], edge: ['#a87444', '#6a4424'],
});

// Lindenburg town house: sage wallpaper with a small pattern, a white chair rail and panelling; parquet.
theme('hm_town', {
  upper: (i, j, wx) => {
    if (j < 4) return j === 0 ? H('#9a9080') : j === 1 ? H('#fbf8f0') : j === 2 ? H('#e4ddd0') : H('#c0b8a8');
    const x = wx % 12, y = (j + 2) % 12;
    if ((x === 6 && y === 6) || (x === 0 && y === 0)) return H('#f0ead0');
    if ((Math.abs(x - 6) + Math.abs(y - 6) === 2) || (Math.abs(x - (x < 6 ? 0 : 12)) + Math.abs(y - (y < 6 ? 0 : 12)) === 2)) return H('#8aa682');
    return x % 12 === 3 || x % 12 === 9 ? H('#a2ba98') : H('#a8c09e');
  },
  lower: (i, j, wx) => {
    if (j < 4) { const x = wx % 12, y = (j + 18) % 12; return (x === 6 && y === 6) || (x === 0 && y === 0) ? H('#f0ead0') : x % 12 === 3 || x % 12 === 9 ? H('#a2ba98') : H('#a8c09e'); }
    if (j === 4) return H('#fbf8f0');
    if (j === 5) return H('#c8c0b0');
    if (j >= 14) return j === 14 ? H('#e8e2d6') : H('#7a7064');
    // panels: a raised frame every 16 px
    const x = wx % 16;
    if (x === 0 || j === 6) return H('#fbf8f0');
    if (x === 15 || j === 13) return H('#c8c0b0');
    if (x === 3 || j === 8) return H('#d8d0c2');
    if (x === 12 || j === 11) return H('#fbf8f0');
    return H('#eee8dc');
  },
  floor: parquet(tones('#e8b878', '#cc985a', '#b0804a', '#7a5432')),
  rugs: {
    r: { kind: 'woven', tones: tones('#4a1e1a', '#a83a34', '#e8d8b0', '#2a4a7a') },
    y: { kind: 'braid', tones: tones('#4a3a1a', '#c8a050', '#7a8a50', '#e8dcb0') },
    w: { kind: 'woven', tones: tones('#1e2a4a', '#3a5a9a', '#e8e0d0', '#c8a050') },
  },
  top: ['#1a1816', '#4a4238'], edge: ['#f4efe4', '#b8b0a2'],
});

// The mill: rough stone walls under a heavy beam; flagstones with flour dust.
const stoneWall = (wx: number, wy: number): Col => {
  const row = Math.floor(wy / 7), off = row % 2 ? 6 : 0;
  const k = Math.floor((wx + off) / 12), x = (wx + off) % 12, y = wy % 7;
  if (y === 6 || x === 11) return H('#5a5246');
  const t = STONE[1 + Math.floor(hash(k, row, 980) * 2)];
  if (y === 0 || x === 0) return dk(t, 1.12);
  if (y === 5 || x === 10) return dk(t, 0.88);
  return noise(wx, wy, 981) < 0.06 ? dk(t, 0.9) : t;
};
theme('hm_mill', {
  upper: (i, j, wx) => (j < 5 ? (j === 0 ? H('#2a1a0e') : j === 1 ? H('#9a6a3a') : j === 4 ? H('#3e2814') : H('#7a5030')) : stoneWall(wx, j)),
  lower: (i, j, wx) => (j >= 14 ? H('#4a4238') : stoneWall(wx, j + 16)),
  floor: (wx, wy) => {
    const row = Math.floor(wy / 10), off = Math.floor(hash(row, 0, 982) * 14);
    const k = Math.floor((wx + off) / 14), x = (wx + off) % 14, y = wy % 10;
    if (y === 9 || x === 13) return H('#5e564a');
    const t = mix(H('#a89c88'), H('#c4b8a2'), hash(k, row, 983));
    if (noise(wx, wy, 984) < 0.004) return H('#f4f0e6'); // a little flour dust
    return y === 0 || x === 0 ? dk(t, 1.08) : t;
  },
  rugs: { r: { kind: 'rag', tones: tones('#4a3a20', '#c8b080', '#a88a58', '#e0d0a8') } },
  top: ['#181410', '#4a4238'], edge: ['#c4b8a2', '#8a7e6a'],
});

// A Frostland log cabin: round logs with light chinking; pale pine floor; furs and a woven rug.
const LOG = tones('#e0b07a', '#c89458', '#a87440', '#7e5028', '#e8dcc4');
const logs = (wx: number, wy: number): Col => {
  const row = Math.floor(wy / 7), y = wy % 7;
  if (y === 6) return LOG[4]; // chinking
  const c = y === 0 ? LOG[0] : y < 3 ? LOG[1] : y < 5 ? LOG[2] : LOG[3];
  // bark marks along the logs
  return hash(wx >> 2, row, 990) < 0.12 && y > 1 && y < 5 ? dk(c, 0.85) : c;
};
theme('hm_cabin', {
  upper: (i, j, wx) => (j < 2 ? (j === 0 ? H('#2a1a0e') : H('#5a3a1e')) : logs(wx, j + 3)),
  lower: (i, j, wx) => (j >= 15 ? H('#4a2e18') : logs(wx, j + 19)),
  floor: boards(tones('#f0d4a4', '#e0bf88', '#d4b07a', '#9a7448'), 5, 41, 991),
  rugs: {
    '"': { kind: 'fur', tones: tones('#8a8078', '#e8e2d8', '#c8c0b4', '#ffffff') },
    r: { kind: 'woven', tones: tones('#4a1a1a', '#b83a34', '#f4ecdc', '#2a2a3a') },
    w: { kind: 'woven', tones: tones('#1a2a4a', '#3a6aa8', '#f4ecdc', '#b83a34') },
    y: { kind: 'fur', tones: tones('#5a3a22', '#a87a4a', '#8a5e34', '#c89a68') },
  },
  top: ['#16120e', '#4a2e18'], edge: ['#c89458', '#8a5e34'],
});

// Frostburg town house: pale blue painted boards, a white cornice and a red folk stencil; whitewashed floor.
theme('hm_frost', {
  upper: (i, j, wx) => {
    if (j < 3) return j === 0 ? H('#8a98a8') : j === 1 ? H('#ffffff') : H('#d8e0e8');
    return wx % 6 === 5 ? H('#8aa4bc') : wx % 6 === 0 ? H('#cfe0ee') : H('#b4cade');
  },
  lower: (i, j, wx) => {
    if (j < 6) {
      if (j === 0 || j === 5) return H('#f4f0ea');
      // a stencilled band: small red hearts and green leaves on white
      const x = wx % 8, y = j - 1;
      const heart = x >= 2 && x <= 5 && ((y === 0 && x !== 3 && x !== 4) || y === 1 || (y === 2 && x > 2 && x < 5) || false);
      const heart2 = y === 0 && (x === 3 || x === 4) ? false : heart;
      if (heart2) return H('#c83a3a');
      if ((x === 0 || x === 7) && y > 0 && y < 3) return H('#4a8a5a');
      return H('#f4f0ea');
    }
    if (j >= 14) return j === 14 ? H('#f4f0ea') : H('#6a7888');
    return wx % 6 === 5 ? H('#8aa4bc') : wx % 6 === 0 ? H('#cfe0ee') : H('#b4cade');
  },
  floor: boards(tones('#f6f2ea', '#e6e0d4', '#ddd6c8', '#a8a090'), 5, 45, 993),
  rugs: {
    r: { kind: 'woven', tones: tones('#4a1a1a', '#c03a3a', '#f8f2e6', '#2a4a7a') },
    w: { kind: 'rag', tones: tones('#2a3a5a', '#7aa0c8', '#f0ece4', '#c8d8e8', '#4a6a9a') },
    '"': { kind: 'fur', tones: tones('#8a8078', '#e8e2d8', '#c8c0b4', '#ffffff') },
    y: { kind: 'braid', tones: tones('#3a3a4a', '#c8a050', '#e8e2d4', '#7a9ab8') },
  },
  top: ['#16181c', '#5a6878'], edge: ['#f4f0ea', '#a8b8c8'],
});

// A fisher's hut: weathered grey boards with nails; rough floor planks.
theme('hm_hut', {
  upper: (i, j, wx) => {
    if (j < 2) return j === 0 ? H('#1e1a16') : H('#4a4038');
    const x = wx % 9;
    if (x === 8) return H('#3a342e');
    if ((j === 4 || j === 13) && x === 4) return H('#2a2622');
    return x === 0 ? H('#a8a090') : hash(Math.floor(wx / 9), j >> 2, 995) < 0.3 ? H('#7e766a') : H('#8e8678');
  },
  lower: (i, j, wx) => {
    if (j >= 14) return j === 14 ? H('#5a5248') : H('#2a2622');
    const x = wx % 9;
    if (x === 8) return H('#3a342e');
    if ((j === 6) && x === 4) return H('#2a2622');
    return x === 0 ? H('#a8a090') : hash(Math.floor(wx / 9), (j + 16) >> 2, 995) < 0.3 ? H('#7e766a') : H('#8e8678');
  },
  floor: boards(tones('#b0987a', '#98805f', '#8c7656', '#5a4834'), 6, 33, 996),
  rugs: {
    '"': { kind: 'fur', tones: tones('#5a4a3a', '#a89480', '#8a7660', '#c8b8a0') },
    r: { kind: 'rag', tones: tones('#3a2a1a', '#a8483c', '#4a6a8a', '#d8c8a8', '#6a8a5a') },
  },
  top: ['#141210', '#3a342e'], edge: ['#a8a090', '#6a645a'],
});

// The hotel lobby: cream walls with gold pilasters over mahogany panelling; a marble floor in diamonds.
theme('hm_lobby', {
  upper: (i, j, wx) => {
    if (j < 4) return j === 0 ? H('#6a5020') : j === 1 ? H('#f8e8b0') : j === 2 ? H('#d8b060') : H('#a88238');
    const x = wx % 40;
    if (x < 6) return x === 0 ? H('#fff0b8') : x === 5 ? H('#a07828') : x === 1 ? H('#e8c870') : H('#d4ae58');
    return noise(wx >> 1, j >> 1, 997) < 0.15 ? H('#ecdec4') : H('#f4e8d2');
  },
  lower: (i, j, wx) => {
    const x = wx % 40;
    if (j < 3) return x < 6 ? (x === 0 ? H('#fff0b8') : x === 5 ? H('#a07828') : H('#d4ae58')) : H('#f4e8d2');
    if (j === 3) return H('#e8c060');
    if (j === 4) return H('#8a6420');
    if (j >= 14) return j === 14 ? H('#3a1a10') : H('#1e0e08');
    const px = wx % 20;
    if (px === 0 || j === 5) return H('#9a4a32');
    if (px === 19 || j === 13) return H('#3e1a10');
    if (px > 2 && px < 17 && j > 6 && j < 12) return px === 3 || j === 7 ? H('#4a2014') : px === 16 || j === 11 ? H('#8a4430') : H('#6a2e1e');
    return H('#7a3624');
  },
  floor: (wx, wy) => {
    const a = Math.floor((wx + wy) / 12), b = Math.floor((wx - wy + 1200) / 12);
    const dark = (a + b) % 2 === 0;
    const onLine = (wx + wy) % 12 === 0 || (wx - wy + 1200) % 12 === 0;
    if (onLine) return H('#b8a888');
    const vein = noise(wx >> 1, wy >> 1, 998) < 0.06;
    return dark ? (vein ? H('#d8c8a8') : H('#cdbb98')) : vein ? H('#e6dccb') : H('#f2ece0');
  },
  rugs: { r: { kind: 'runner', tones: tones('#3a0e0e', '#9a2a2a', '#b84040', '#e8c060') } },
  top: ['#141010', '#6a5020'], edge: ['#e8c060', '#a88238'],
});

// The museum: deep red walls with a picture rail over dark panelling; oak parquet.
theme('hm_museum', {
  upper: (i, j, wx) => {
    if (j < 3) return j === 0 ? H('#2a1414') : j === 1 ? H('#e8dcc8') : H('#b8aa96');
    if (j === 5) return H('#c8a050');
    const x = wx % 10, y = j % 10;
    return (x + y) % 10 === 0 || (x - y + 10) % 10 === 0 ? H('#8a2a2c') : H('#9a3436');
  },
  lower: (i, j, wx) => {
    if (j < 6) { const x = wx % 10, y = (j + 16) % 10; return (x + y) % 10 === 0 || (x - y + 10) % 10 === 0 ? H('#8a2a2c') : H('#9a3436'); }
    if (j === 6) return H('#c8a050');
    if (j === 7) return H('#4a2a1a');
    if (j >= 14) return j === 14 ? H('#3a2014') : H('#1e100a');
    return wx % 24 === 0 ? H('#6a4028') : wx % 24 === 23 ? H('#2e180e') : H('#4e2e1c');
  },
  floor: parquet(tones('#c89058', '#a87440', '#8a5a30', '#5a3a1e')),
  rugs: { r: { kind: 'runner', tones: tones('#1a1a3a', '#2a3a7a', '#3a4a8a', '#c8a050') } },
  top: ['#120e0e', '#3a2014'], edge: ['#c8a050', '#6a4028'],
});

// The observation floor at the top of the office tower: glass all round, the city far below; polished stone.
const skyline = (wx: number, j: number): Col => {
  // j: 0..31 from the top of the upper wall tile to the bottom of the lower one
  const col = Math.floor(wx / 5);
  const hgt = 6 + Math.floor(hash(col, 0, 1001) * 12) + (hash(col >> 1, 1, 1002) < 0.3 ? 6 : 0);
  const far = 4 + Math.floor(hash(Math.floor(wx / 3), 2, 1003) * 6);
  const y = 31 - j;
  if (y < hgt - 1) {
    const lit = (wx % 5 === 1 || wx % 5 === 3) && y % 3 === 1 && hash(wx, y, 1004) < 0.5;
    return lit ? H('#ffe6a0') : wx % 5 === 0 ? H('#4a5a7a') : H('#5a6c8e');
  }
  if (y < hgt) return H('#7a8cae');
  if (y < far + 6) return H('#8aa2c4');
  // sky: a gradient, a cloud or two
  const cloud = noise(wx >> 3, j >> 2, 1005) < 0.12 && j < 16;
  return cloud ? H('#f4f8ff') : mix(H('#7ab4e8'), H('#d4ecff'), j / 24);
};
theme('hm_tower', {
  upper: (i, j, wx) => {
    if (j < 2) return j === 0 ? H('#2a2e36') : H('#8a929e');
    if (wx % 32 < 2) return wx % 32 === 0 ? H('#c8ced8') : H('#5a626e');
    // reflections across the glass
    const glare = (wx + j * 2) % 40 < 3;
    return glare ? mix(skyline(wx, j), H('#ffffff'), 0.45) : skyline(wx, j);
  },
  lower: (i, j, wx) => {
    if (j >= 12) return j === 12 ? H('#c8ced8') : j === 15 ? H('#2a2e36') : H('#6a727e');
    if (wx % 32 < 2) return wx % 32 === 0 ? H('#c8ced8') : H('#5a626e');
    const glare = (wx + (j + 16) * 2) % 40 < 3;
    return glare ? mix(skyline(wx, j + 16), H('#ffffff'), 0.45) : skyline(wx, j + 16);
  },
  floor: (wx, wy) => {
    const x = wx % 16, y = wy % 16;
    if (x === 15 || y === 15) return H('#7a8088');
    const t = (Math.floor(wx / 16) + Math.floor(wy / 16)) % 2 ? H('#b8bec6') : H('#c4cad2');
    return (x + y) % 23 === 0 && x < 10 ? H('#e4e8ee') : t;
  },
  rugs: { r: { kind: 'runner', tones: tones('#1a1a24', '#3a3a4a', '#4a4a5c', '#8a92a8') } },
  top: ['#121416', '#3a3e46'], edge: ['#c8ced8', '#8a929e'],
});

// ---------------------------------------------------------------- Woodland furniture

/** A stone fireplace with a wooden mantel, a fire and a kettle on its hook (2×1, rises up the wall). */
add('hm_hearth', [2, 1], piece(32, 46, (p) => {
  // chimney breast
  rect(p, 4, 0, 24, 40, (x, y) => stoneWall(x + 3, y + 2));
  rect(p, 4, 0, 1, 40, STONE[0]); rect(p, 27, 0, 1, 40, STONE[3]);
  // hearth stone
  bevel(p, 1, 39, 30, 6, [STONE[0], STONE[1], STONE[3]]);
  // mantel
  bevel(p, 1, 15, 30, 4, [OAK[0], OAK[1], OAK[3]]);
}, (p) => {
  rect(p, 1, 19, 30, 1, H('#00000040'));
  // the firebox with an arch
  for (let y = 21; y < 39; y++) for (let x = 8; x < 24; x++) {
    if (y < 25 && Math.hypot(x + 0.5 - 16, (y - 25) * 1.6) > 8) continue;
    p.set(x, y, y > 34 ? H('#3a2418') : H('#1a100c'));
  }
  for (let x = 7; x < 25; x++) p.set(x, 39, OUT);
  // logs and fire
  rect(p, 10, 35, 12, 2, H('#6a3e1e')); rect(p, 11, 34, 9, 1, H('#8a5428'));
  for (let y = 26; y < 35; y++) for (let x = 11; x < 21; x++) {
    const d = Math.abs(x + 0.5 - 16) + (34 - y) * 0.55;
    const f = d + hash(x, y, 1010) * 1.5;
    if (f < 2.8) p.set(x, y, H('#fff4b0')); else if (f < 4.2) p.set(x, y, H('#ffc040')); else if (f < 5.6) p.set(x, y, H('#f07020'));
  }
  // a glow on the hearth stone
  for (let x = 8; x < 24; x++) p.set(x, 40, alpha(H('#ffb040'), 0.5 - Math.abs(x - 16) / 20));
  // things on the mantel: a candle, a jug, a little clock
  rect(p, 5, 11, 2, 4, H('#f4ecd8')); p.set(5, 10, H('#ffd040')); p.set(6, 9, H('#fff0a0'));
  rect(p, 22, 11, 4, 4, H('#3a6aa8')); rect(p, 22, 11, 1, 4, H('#6a9ad0')); rect(p, 26, 12, 1, 2, H('#3a6aa8'));
  rect(p, 13, 10, 6, 5, OAK[2]); rect(p, 14, 11, 4, 3, PAPER); p.set(16, 12, OUT); p.set(15, 12, OUT);
}));

/** A bed with a patchwork quilt (2×2, its headboard against the wall). */
function bed(cover: (p: Pix, x: number, y: number) => void, wood: Col[], quilt: boolean) {
  return piece(32, 46, (p) => {
    // headboard with posts
    bevel(p, 2, 4, 28, 12, [wood[0], wood[1], wood[3]]);
    bevel(p, 1, 2, 4, 16, [wood[0], wood[1], wood[3]]); bevel(p, 27, 2, 4, 16, [wood[0], wood[1], wood[3]]);
    // the frame and mattress
    bevel(p, 2, 14, 28, 28, [wood[0], wood[2], wood[3]]);
    // footboard
    bevel(p, 1, 38, 30, 7, [wood[0], wood[1], wood[3]]);
  }, (p) => {
    rect(p, 6, 6, 20, 1, wood[2]); rect(p, 6, 10, 20, 1, wood[2]);
    // sheet and pillows
    rect(p, 4, 15, 24, 22, H('#f4f0e6'));
    for (const px of [5, 17]) { bevel(p, px, 16, 10, 6, [H('#ffffff'), H('#eee8dc'), H('#c8c0b0')]); }
    cover(p, 4, 23);
    if (quilt) rect(p, 4, 23, 24, 1, H('#00000030'));
    rect(p, 1, 38, 30, 1, OUT);
  });
}
add('hm_bed_quilt', [2, 2], bed((p, x, y) => {
  const cols = tones('#c8483c', '#e8d4a0', '#4a78b0', '#6aa05a', '#e8a040', '#f0e8d8');
  for (let yy = y; yy < y + 15; yy++) for (let xx = x; xx < x + 24; xx++) {
    const cx = Math.floor((xx - x) / 6), cy = Math.floor((yy - y) / 5);
    let c = cols[Math.floor(hash(cx, cy, 1020) * cols.length)];
    if ((xx - x) % 6 === 0 || (yy - y) % 5 === 0) c = dk(c, 0.8);
    p.set(xx, yy, c);
  }
  // the quilt hangs over the sides
  rect(p, x - 1, y + 2, 1, 13, H('#9a3a30')); rect(p, x + 24, y + 2, 1, 13, H('#9a3a30'));
}, OAK, true));
add('hm_bed_fur', [2, 2], bed((p, x, y) => {
  // a red wool blanket folded back, a reindeer fur over the foot
  for (let yy = y; yy < y + 6; yy++) for (let xx = x; xx < x + 24; xx++) p.set(xx, yy, yy === y ? H('#e85a4a') : (xx + yy) % 4 === 0 ? H('#a82a24') : H('#c83a34'));
  rect(p, x, y + 2, 24, 1, H('#f4ecdc'));
  for (let yy = y + 6; yy < y + 15; yy++) for (let xx = x - 1; xx < x + 25; xx++) {
    const n = hash(xx >> 1, yy >> 1, 1021) + hash(xx, yy, 1022) * 0.3;
    p.set(xx, yy, n < 0.3 ? H('#8a7a6a') : n < 1 ? H('#b8aa98') : H('#e0d6c8'));
  }
  rect(p, x - 1, y + 6, 26, 1, H('#5a4a3a'));
}, PINE, false));

/** A bookcase full of books (2×1, tall). */
function shelf(seed: number) {
  return piece(32, 44, (p) => {
    bevel(p, 1, 0, 30, 44, [DARKWOOD[0], DARKWOOD[1], DARKWOOD[3]]);
  }, (p) => {
    rect(p, 3, 2, 26, 40, DARKWOOD[3]);
    const cols = tones('#c8483c', '#3a68a8', '#4a8a4a', '#d8a040', '#7a3a7a', '#e8dcc0', '#2a4a5a', '#a85a2a');
    for (let s = 0; s < 4; s++) {
      const y1 = 11 + s * 10;
      // books standing on the shelf, the odd one leaning or a gap
      let x = 3;
      while (x < 28) {
        const w = 2 + Math.floor(hash(x, s, seed) * 3), h = 6 + Math.floor(hash(x, s, seed + 1) * 3);
        if (hash(x, s, seed + 2) < 0.12) { x += 3; continue; }
        const c = cols[Math.floor(hash(x, s, seed + 3) * cols.length)];
        const ww = Math.min(w, 29 - x);
        rect(p, x, y1 - h, ww, h, c);
        rect(p, x, y1 - h, 1, h, dk(c, 1.25));
        rect(p, x, y1 - h + 2, ww, 1, dk(c, 0.7));
        x += ww;
      }
      bevel(p, 2, y1, 28, 2, [DARKWOOD[0], DARKWOOD[1], DARKWOOD[3]]);
    }
    // a little plant on top
    rect(p, 22, 0, 6, 1, H('#2e6a30'));
  });
}
add('hm_shelf', [2, 1], shelf(1030));

/** A kitchen dresser: plates on open shelves above, cupboard doors below (2×1, tall). */
add('hm_dresser', [2, 1], piece(32, 44, (p) => {
  bevel(p, 2, 0, 28, 24, [OAK[0], OAK[1], OAK[3]]);
  bevel(p, 1, 22, 30, 22, [OAK[0], OAK[1], OAK[3]]);
}, (p) => {
  rect(p, 4, 2, 24, 20, OAK[3]);
  for (const y of [9, 16]) bevel(p, 3, y, 26, 2, [OAK[0], OAK[1], OAK[2]]);
  // plates standing up and cups
  for (const [x, y] of [[5, 2], [12, 2], [19, 2]] as const) {
    disc(p, x + 3.5, y + 3.5, 3.4, (d) => (d > 2.8 ? H('#3a68a8') : d > 1.6 ? H('#f4f0e6') : H('#c8d8ec')));
  }
  for (let x = 5; x < 27; x += 5) { rect(p, x, 12, 3, 4, H('#f4f0e6')); rect(p, x, 12, 3, 1, H('#3a68a8')); p.set(x + 3, 13, H('#f4f0e6')); }
  // worktop and doors
  rect(p, 1, 22, 30, 2, OAK[0]); rect(p, 1, 24, 30, 1, OAK[3]);
  for (const x of [3, 17]) { bevel(p, x, 26, 12, 15, [OAK[0], OAK[2], OAK[3]]); rect(p, x + 2, 28, 8, 11, OAK[1]); }
  p.set(14, 33, BRASS[1]); p.set(17, 33, BRASS[1]);
  // a loaf and a jar on the worktop
  rect(p, 4, 19, 7, 3, H('#c88a44')); rect(p, 5, 18, 5, 1, H('#e0a860')); rect(p, 22, 17, 4, 5, H('#d8a040')); rect(p, 22, 17, 4, 1, H('#f4ecd8'));
}));

/** A wooden table, plain with a teapot or with a checked cloth and flowers (2×1). */
function table(cloth: boolean) {
  return piece(32, 28, (p) => {
    rect(p, 3, 16, 2, 11, OAK[2]); rect(p, 27, 16, 2, 11, OAK[3]); rect(p, 7, 16, 2, 9, OAK[3]); rect(p, 23, 16, 2, 9, OAK[3]);
    bevel(p, 1, 5, 30, 12, [OAK[0], OAK[1], OAK[2]]);
    bevel(p, 1, 15, 30, 3, [OAK[1], OAK[2], OAK[3]]);
  }, (p) => {
    if (cloth) {
      for (let y = 5; y < 18; y++) for (let x = 1; x < 31; x++) {
        const a = Math.floor(x / 3) % 2, b = Math.floor(y / 3) % 2;
        p.set(x, y, a && b ? H('#b83a34') : a || b ? H('#e87a6a') : H('#fbf4ea'));
      }
      for (let x = 1; x < 31; x += 2) p.set(x, 18, H('#e87a6a'));
      // a vase of wild flowers
      rect(p, 14, 6, 4, 6, H('#3a68a8')); rect(p, 14, 6, 1, 6, H('#6a9ad0'));
      for (const [x, y, c] of [[13, 2, '#ffd23c'], [16, 1, '#f0584c'], [18, 3, '#ffffff'], [15, 3, '#c86ae0'], [12, 4, '#ffffff']] as const) { p.set(x, y, H(c)); p.set(x, y + 1, H('#3e8a3a')); }
      rect(p, 15, 3, 1, 3, H('#3e8a3a'));
    } else {
      for (let x = 3; x < 29; x += 4) p.set(x, 8 + (x % 3), OAK[2]);
      // a teapot, two cups and a plate of biscuits
      disc(p, 12, 7.5, 3.5, (d) => (d > 2.8 ? H('#2e5a8a') : H('#4a7ab8')));
      p.set(11, 6, H('#8ab0e0')); rect(p, 15, 6, 2, 1, H('#2e5a8a')); rect(p, 11, 3, 2, 1, H('#2e5a8a'));
      for (const x of [20, 25]) { rect(p, x, 8, 3, 3, H('#f4f0e6')); p.set(x + 1, 8, H('#7a4a22')); p.set(x + 3, 9, H('#f4f0e6')); }
      disc(p, 6, 12, 3, (d) => (d > 2.4 ? H('#c8c0b0') : H('#f4f0e6'))); p.set(5, 11, H('#d89a50')); p.set(7, 12, H('#d89a50'));
    }
  });
}
add('hm_table', [2, 1], table(false));
add('hm_table_cloth', [2, 1], table(true));

/** A three-legged stool and a wooden chair. */
add('hm_stool', [1, 1], piece(16, 16, (p) => {
  rect(p, 4, 9, 2, 6, OAK[2]); rect(p, 10, 9, 2, 6, OAK[3]); rect(p, 7, 10, 2, 5, OAK[3]);
  disc(p, 8, 7.5, 5.5, () => OAK[1]);
}, (p) => { disc(p, 8, 7, 4.5, (d) => (d < 2.5 ? OAK[0] : OAK[1])); }, { shadow: [8, 14, 5, 1] }));
add('hm_chair', [1, 1], piece(16, 24, (p) => {
  bevel(p, 3, 1, 10, 3, [OAK[0], OAK[1], OAK[3]]);
  rect(p, 3, 1, 2, 22, OAK[2]); rect(p, 11, 1, 2, 22, OAK[3]);
  bevel(p, 2, 12, 12, 4, [OAK[0], OAK[1], OAK[3]]);
  rect(p, 4, 16, 2, 7, OAK[2]); rect(p, 10, 16, 2, 7, OAK[3]);
}, (p) => { rect(p, 5, 6, 6, 1, OAK[2]); rect(p, 5, 9, 6, 1, OAK[2]); }, { shadow: [8, 22, 6, 1] }));

/** Herbs hanging up to dry on a line (on the wall). */
add('hm_herbs', [1, 1], piece(16, 22, (p) => {
  line(p, 0, 3, 15, 3, H('#8a6a4a'));
  const bunch = (x: number, c: Col[], len: number) => {
    rect(p, x + 1, 3, 2, 3, H('#c8a060'));
    for (let y = 6; y < 6 + len; y++) for (let k = -2; k <= 2; k++) if (Math.abs(k) <= 1 + (y - 6) / 4 && hash(x + k, y, 1040) < 0.85) p.set(x + 1 + k, y, c[(k + y + 9) % c.length]);
  };
  bunch(1, tones('#5a8a3a', '#3e6a2a', '#7aa84a'), 10);
  bunch(6, tones('#8a6ac0', '#6a4aa0', '#5a8a3a'), 12);
  bunch(11, tones('#e8d050', '#f4f0e0', '#6a8a3a'), 9);
}, undefined, { out: H('#2a2014') }));

/** A window with curtains: summer trees outside (Woodland). */
function windowArt(w: number, outside: (x: number, y: number) => Col, frameT: Col[], curtain?: [Col, Col], frost = false): Pix {
  return piece(w, 26, (p) => {
    bevel(p, 1, 1, w - 2, 21, frameT);
  }, (p) => {
    rect(p, 3, 3, w - 6, 17, (x, y) => outside(x, y));
    // glazing bars and a highlight on the glass
    rect(p, Math.floor(w / 2) - 1, 3, 2, 17, frameT[1]); rect(p, 3, 10, w - 6, 1, frameT[1]);
    for (let k = 0; k < 4; k++) { p.set(4 + k, 7 - k, alpha(H('#ffffff'), 0.6)); p.set(w / 2 + 2 + k, 17 - k, alpha(H('#ffffff'), 0.4)); }
    if (frost) for (let y = 3; y < 20; y++) for (let x = 3; x < w - 3; x++) {
      const c = Math.min(x - 3, w - 4 - x, y - 3, 19 - y);
      if (c < 2 && hash(x, y, 1050) < 0.5 - c * 0.3) p.set(x, y, alpha(H('#ffffff'), 0.6));
    }
    // the sill
    bevel(p, 0, 21, w, 3, [frameT[0], frameT[1], frameT[2]]);
    if (curtain) for (const cx of [1, w - 5]) for (let y = 0; y < 21; y++) for (let x = 0; x < 4; x++) {
      if (y > 14 && (cx === 1 ? x > 2 - (y - 15) / 3 : x < (y - 15) / 3)) continue;
      p.set(cx + x, y, x === (cx === 1 ? 3 : 0) ? OUT : (x + Math.floor(y / 3)) % 2 ? curtain[0] : curtain[1]);
    }
    if (curtain) rect(p, 0, 0, w, 2, H('#5a3a1e'));
  });
}
const summer = (x: number, y: number): Col => {
  const hill = 12 + Math.sin(x / 3) * 1.5;
  if (y > hill) return y > hill + 3 ? H('#5cb85a') : H('#3e9a40');
  const tree = hash(Math.floor(x / 3), 0, 1051) < 0.5 && y > 8 + hash(Math.floor(x / 3), 1, 1052) * 3;
  if (tree) return (x + y) % 3 ? H('#2e7a3a') : H('#40984a');
  return y < 6 ? H('#8ac8f0') : H('#b8e0f8');
};
add('hm_window', [1, 1], windowArt(16, summer, tones('#f4ecd8', '#d8ccb0', '#a8987c'), [H('#c8483c'), H('#f4ecdc')]));
add('hm_window_town', [1, 1], windowArt(16, (x, y) => (y > 14 ? H('#b8ad9c') : y > 6 && (x % 6 < 4) ? (y % 3 === 0 ? H('#f6ecd0') : H('#b8443a')) : H('#a8d8f8')), tones('#ffffff', '#e4ddd0', '#a8a090'), [H('#4a7a4a'), H('#6a9a5a')]));
const winterOut = (x: number, y: number): Col => {
  if (y > 13 + Math.sin(x / 2.5)) return y > 16 ? H('#f4f8ff') : H('#d8e4f4');
  const pine = Math.abs((x % 7) - 3) < (y - 6) / 2.5 && y > 6 && hash(Math.floor(x / 7), 0, 1053) < 0.7;
  if (pine) return (x + y) % 4 === 0 ? H('#e8f0f8') : H('#2a4a4a');
  if (hash(x, y, 1054) < 0.06) return H('#ffffff');
  return mix(H('#2a3a6a'), H('#6a8ac0'), y / 14);
};
add('hm_window_frost', [1, 1], windowArt(16, winterOut, tones('#f8f8f4', '#c8d4e0', '#8a9aac'), undefined, true));
add('hm_window_aurora', [2, 1], windowArt(32, (x, y) => {
  if (y > 14 + Math.sin(x / 4) * 1.5) return y > 17 ? H('#c8d4ec') : H('#a8b8d8');
  // green curtains of light over a night sky, a few stars
  const band = Math.sin(x / 3.2) * 2.5 + 7;
  const d = Math.abs(y - band);
  if (d < 1) return H('#b8ffd0');
  if (d < 2.2) return H('#5ae0a0');
  if (d < 3.4 && y < band) return H('#3a9a8a');
  if (hash(x, y, 1055) < 0.07) return H('#ffffff');
  return mix(H('#0e1430'), H('#24305a'), y / 16);
}, tones('#f4ecd8', '#c8b090', '#8a7050'), undefined, true));

/** A grandfather clock (1×1, tall). */
add('hm_clock', [1, 1], piece(16, 42, (p) => {
  bevel(p, 2, 2, 12, 14, [DARKWOOD[0], DARKWOOD[1], DARKWOOD[3]]);
  poly(p, [[2, 3], [8, 0], [14, 3]], () => DARKWOOD[1]);
  bevel(p, 3, 15, 10, 20, [DARKWOOD[0], DARKWOOD[1], DARKWOOD[3]]);
  bevel(p, 2, 34, 12, 7, [DARKWOOD[0], DARKWOOD[1], DARKWOOD[3]]);
}, (p) => {
  disc(p, 8, 9, 4.6, (d) => (d > 3.9 ? BRASS[2] : PAPER));
  line(p, 8, 9, 8, 6, OUT); line(p, 8, 9, 10, 10, OUT);
  // the pendulum behind glass
  rect(p, 5, 17, 6, 15, H('#3a2a20'));
  rect(p, 8, 17, 1, 10, BRASS[2]);
  disc(p, 8.5, 28, 2, (d) => (d > 1.4 ? BRASS[2] : BRASS[1]));
  p.set(6, 18, alpha(H('#ffffff'), 0.5)); p.set(6, 19, alpha(H('#ffffff'), 0.5));
}, { shadow: [8, 40, 6, 1] }));

/** A wooden chest with iron bands. */
add('hm_chest', [1, 1], piece(16, 18, (p) => {
  bevel(p, 1, 4, 14, 13, [OAK[0], OAK[1], OAK[3]]);
  bevel(p, 1, 2, 14, 5, [OAK[0], OAK[0], OAK[2]]);
}, (p) => {
  for (const x of [3, 11]) rect(p, x, 2, 2, 15, IRON);
  rect(p, 1, 7, 14, 1, OAK[3]);
  rect(p, 7, 8, 2, 3, BRASS[1]); p.set(7, 8, BRASS[0]);
}, { shadow: [8, 16, 7, 1] }));

/** A basket of apples. */
add('hm_basket', [1, 1], piece(16, 16, (p) => {
  rect(p, 2, 7, 12, 8, (x, y) => ((x + y) % 3 ? H('#c8a060') : H('#a07c3e')));
  for (const [x, y] of [[5, 6], [8, 5], [11, 6], [6, 3], [10, 3]] as const) disc(p, x, y, 2.4, () => H('#c8302a'));
}, (p) => {
  for (const [x, y] of [[5, 6], [8, 5], [11, 6], [6, 3], [10, 3]] as const) { p.set(x - 1, y - 1, H('#f07060')); p.set(x, y - 2, H('#4a8a3a')); }
  rect(p, 2, 9, 12, 1, H('#8a6430'));
  line(p, 3, 7, 5, 0, H('#8a6430')); line(p, 13, 7, 11, 0, H('#8a6430')); rect(p, 5, 0, 6, 1, H('#8a6430'));
}, { shadow: [8, 14, 6, 1] }));

/** The miller's stone: a round wooden casing round the millstone, a hopper of grain above, a chute (2×2). */
add('hm_millstone', [2, 2], piece(32, 44, (p) => {
  // the hopper on its frame
  rect(p, 5, 2, 2, 26, OAK[2]); rect(p, 25, 2, 2, 26, OAK[3]);
  poly(p, [[8, 2], [24, 2], [19, 14], [13, 14]], () => OAK[1]);
  // the casing
  for (let y = 18; y < 42; y++) for (let x = 1; x < 31; x++) {
    const dx = (x + 0.5 - 16) / 15, dy = (y + 0.5 - 28) / 9;
    if (dx * dx + dy * dy <= 1 || (Math.abs(dx) < 1 && y > 28 && y < 42 - (1 - Math.sqrt(1 - dx * dx)) * 4)) p.set(x, y, OAK[2]);
  }
}, (p) => {
  rect(p, 9, 3, 14, 2, H('#d8b860')); for (let x = 10; x < 22; x += 2) p.set(x, 3, H('#b08a30'));
  for (let y = 5; y < 14; y++) p.set(16 - Math.round((y - 5) * 0.3), y, OAK[0]);
  // staves of the casing
  for (let y = 28; y < 42; y++) for (let x = 2; x < 30; x++) if (p.get(x, y) === OAK[2] && x % 4 === 0) p.set(x, y, OAK[3]);
  // the top of the stone with its furrows
  for (let y = 20; y < 36; y++) for (let x = 3; x < 29; x++) {
    const dx = (x + 0.5 - 16) / 13, dy = (y + 0.5 - 28) / 7, d = dx * dx + dy * dy;
    if (d > 1) continue;
    const ang = Math.atan2(dy, dx), r = Math.sqrt(d);
    let c = r > 0.9 ? GREY[2] : GREY[1];
    if (r > 0.25 && Math.floor((ang + r * 1.2) * 4) % 2 === 0) c = GREY[2];
    if (r < 0.18) c = OUT;
    if (dx < -0.3 && dy < -0.2 && r > 0.5 && r < 0.8) c = GREY[0];
    p.set(x, y, c);
  }
  // grain falling into the eye, flour at the chute
  line(p, 15, 14, 16, 27, H('#d8b860'));
  rect(p, 26, 34, 5, 3, OAK[1]); rect(p, 27, 37, 4, 4, H('#f4f0e6'));
}, { shadow: [16, 42, 15, 2] }));

/** Sacks of flour. */
add('hm_sacks', [1, 1], piece(16, 22, (p) => {
  const sack = (x: number, y: number, w: number, h: number) => {
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) {
      const t = (xx - x) / w, top = yy - y;
      if (top < 3 && Math.abs(t - 0.5) > 0.15 + top * 0.12) continue;
      p.set(xx, yy, t < 0.3 ? H('#e8d8b0') : t < 0.75 ? H('#d4c094') : H('#b09c70'));
    }
  };
  sack(1, 6, 8, 15); sack(8, 8, 7, 13); sack(4, 1, 7, 10);
}, (p) => {
  for (const [x, y] of [[4, 8], [10, 10], [7, 3]] as const) rect(p, x, y, 2, 1, H('#8a6a3a'));
  rect(p, 3, 14, 4, 3, H('#3a68a8')); rect(p, 10, 15, 3, 3, H('#c8483c'));
  p.set(2, 20, H('#ffffff')); p.set(14, 21, H('#ffffff'));
}, { shadow: [8, 20, 7, 1] }));

/** Wooden gear wheels on the wall: the mill's machinery. */
add('hm_gears', [2, 1], piece(32, 30, (p) => {
  const gear = (cx: number, cy: number, r: number, teeth: number, c: Col[]) => {
    for (let y = Math.floor(cy - r - 2); y <= cy + r + 2; y++) for (let x = Math.floor(cx - r - 2); x <= cx + r + 2; x++) {
      const dx = x + 0.5 - cx, dy = y + 0.5 - cy, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
      const tooth = Math.cos(a * teeth) > 0.3 && d < r + 2;
      if (d > r && !tooth) continue;
      if (d < r * 0.35) { p.set(x, y, d < 1.5 ? IRON : c[2]); continue; }
      const spoke = Math.abs(Math.sin(a * 2)) < 0.18 || Math.abs(Math.cos(a * 2)) < 0.18;
      if (d < r - 2 && !spoke) continue;
      p.set(x, y, dx + dy < 0 ? c[0] : c[1]);
    }
  };
  gear(11, 15, 9, 10, OAK);
  gear(25, 9, 5, 7, PINE);
}, (p) => { rect(p, 10, 14, 2, 2, IRON); rect(p, 24, 8, 2, 2, IRON); }));

/** A writing desk with books, an inkpot and a lamp (2×1). */
add('hm_desk', [2, 1], piece(32, 30, (p) => {
  rect(p, 3, 18, 2, 11, DARKWOOD[2]); rect(p, 27, 18, 2, 11, DARKWOOD[3]);
  bevel(p, 18, 16, 11, 12, [DARKWOOD[0], DARKWOOD[1], DARKWOOD[3]]);
  bevel(p, 1, 8, 30, 10, [DARKWOOD[0], DARKWOOD[1], DARKWOOD[2]]);
}, (p) => {
  rect(p, 1, 17, 30, 1, DARKWOOD[3]);
  for (const y of [20, 24]) { rect(p, 19, y, 9, 1, DARKWOOD[3]); p.set(23, y + 1, BRASS[1]); }
  // papers, an open book, ink and a quill, a lamp
  rect(p, 8, 10, 10, 5, PAPER); rect(p, 12, 10, 1, 5, H('#c8bca0')); for (let x = 9; x < 17; x += 2) p.set(x, 12, H('#8a8070'));
  rect(p, 20, 11, 3, 3, IRON); line(p, 22, 11, 25, 5, H('#f4f0e6'));
  rect(p, 3, 1, 1, 9, BRASS[2]); rect(p, 1, 9, 5, 2, BRASS[2]);
  poly(p, [[1, 4], [7, 4], [5, 0], [3, 0]], () => H('#4a8a4a'));
  for (let k = 0; k < 6; k++) p.set(2 + k, 5, alpha(H('#fff0a0'), 0.7));
  rect(p, 25, 9, 5, 2, H('#c8483c')); rect(p, 26, 7, 4, 2, H('#3a68a8'));
}));

/** A glass counter full of cakes (the café; 2×1). */
add('hm_cakes', [2, 1], piece(32, 30, (p) => {
  bevel(p, 1, 6, 30, 23, [H('#f4f0e6'), H('#e4dccc'), H('#b0a896')]);
}, (p) => {
  rect(p, 3, 8, 26, 12, alpha(H('#cfeaf8'), 0.85));
  rect(p, 3, 14, 26, 1, H('#ffffff'));
  // a cherry cake (dark chocolate, cream, cherries), a strawberry tart, an apple cake
  rect(p, 5, 10, 7, 4, H('#4a2a1a')); rect(p, 5, 10, 7, 1, H('#fbf4e8')); rect(p, 5, 12, 7, 1, H('#fbf4e8'));
  for (const x of [6, 8, 10]) p.set(x, 9, H('#c8202a'));
  disc(p, 18, 12, 3, (d) => (d > 2.4 ? H('#d89a50') : H('#e83a4a')));
  rect(p, 23, 11, 5, 3, H('#e8b060')); for (let x = 23; x < 28; x += 2) p.set(x, 11, H('#a8682a'));
  rect(p, 5, 16, 6, 3, H('#f0d8a0')); rect(p, 13, 16, 6, 3, H('#a8682a')); rect(p, 21, 16, 6, 3, H('#fbf4e8'));
  for (let k = 0; k < 5; k++) p.set(5 + k, 12 - k, alpha(H('#ffffff'), 0.6));
  rect(p, 1, 20, 30, 1, H('#b0a896'));
  for (let x = 3; x < 29; x += 4) rect(p, x, 23, 2, 4, H('#c8bca8'));
  // a coffee pot on the counter
  rect(p, 24, 1, 5, 6, H('#e8e2d8')); rect(p, 24, 1, 5, 1, H('#a8a090')); rect(p, 29, 3, 1, 2, H('#e8e2d8'));
}));

/** A small shelf of honey jars. */
add('hm_honey', [1, 1], piece(16, 24, (p) => {
  bevel(p, 0, 9, 16, 2, [PINE[0], PINE[1], PINE[3]]);
  bevel(p, 0, 20, 16, 2, [PINE[0], PINE[1], PINE[3]]);
  for (const [x, y] of [[1, 3], [6, 4], [11, 3], [2, 15], [8, 14]] as const) rect(p, x, y, 4, y < 9 ? 9 - y : 20 - y, H('#e8a020'));
}, (p) => {
  for (const [x, y] of [[1, 3], [6, 4], [11, 3], [2, 15], [8, 14]] as const) {
    rect(p, x, y, 4, 2, y % 2 ? H('#c8483c') : H('#f4ecd8'));
    p.set(x, y + 2, H('#fff0a0'));
    rect(p, x + 3, y + 2, 1, (y < 9 ? 9 : 20) - y - 2, H('#b87010'));
  }
  rect(p, 13, 15, 2, 5, H('#c8a060'));
}));

/** A carpenter's workbench with a plane, a saw and shavings (2×1). */
add('hm_workbench', [2, 1], piece(32, 28, (p) => {
  rect(p, 3, 14, 3, 13, OAK[2]); rect(p, 26, 14, 3, 13, OAK[3]);
  rect(p, 3, 22, 26, 2, OAK[3]);
  bevel(p, 1, 6, 30, 9, [OAK[0], OAK[1], OAK[2]]);
  bevel(p, 0, 13, 32, 3, [OAK[1], OAK[2], OAK[3]]);
}, (p) => {
  // a plane, a saw, shavings and a slice of a tree trunk
  bevel(p, 4, 8, 8, 3, [OAK[0], DARKWOOD[0], DARKWOOD[2]]); rect(p, 7, 7, 2, 1, DARKWOOD[1]);
  poly(p, [[15, 9], [26, 7], [26, 10], [15, 11]], () => STEEL[1]); rect(p, 26, 7, 3, 3, DARKWOOD[1]);
  for (let x = 16; x < 26; x += 2) p.set(x, 11, STEEL[3]);
  for (const [x, y] of [[4, 18], [9, 19], [20, 20], [13, 25], [24, 26]] as const) { p.set(x, y, PINE[0]); p.set(x + 1, y, PINE[1]); p.set(x + 1, y - 1, PINE[0]); }
  rect(p, 5, 24, 1, 1, PINE[0]);
}));

/** A slice of an old oak on the wall: count the rings (1×1). */
add('hm_rings', [1, 1], piece(16, 22, (p) => {
  disc(p, 8, 10, 7.2, () => OAK[1]);
}, (p) => {
  disc(p, 8, 10, 7.2, (d, x, y) => {
    if (d > 6.4) return OAK[3];
    const r = d + Math.sin(Math.atan2(y - 10, x - 8) * 3) * 0.3;
    return Math.floor(r * 1.4) % 2 ? PINE[1] : PINE[2];
  });
  p.set(8, 10, OAK[3]); line(p, 8, 10, 12, 6, OAK[3]);
}));

/** A model steam locomotive on a little table (2×1). */
add('hm_loco', [2, 1], piece(32, 26, (p) => {
  rect(p, 3, 16, 2, 9, DARKWOOD[2]); rect(p, 27, 16, 2, 9, DARKWOOD[3]);
  bevel(p, 1, 13, 30, 4, [DARKWOOD[0], DARKWOOD[1], DARKWOOD[3]]);
  // the engine: boiler, cab, chimney
  rect(p, 5, 6, 15, 6, H('#2a2a32'));
  rect(p, 19, 2, 8, 10, H('#2a2a32'));
  rect(p, 7, 2, 3, 4, H('#2a2a32'));
}, (p) => {
  rect(p, 5, 7, 15, 1, H('#5a5a6a')); for (const x of [9, 14]) rect(p, x, 6, 1, 6, BRASS[2]);
  rect(p, 18, 1, 10, 2, H('#c8302a')); rect(p, 21, 4, 4, 3, H('#ffe08a'));
  rect(p, 6, 2, 5, 1, H('#4a4a5a'));
  for (const x of [8, 13, 22]) disc(p, x, 12, 2.4, (d) => (d > 1.8 ? H('#c8302a') : H('#e8e8ee')));
  // rails
  rect(p, 2, 14, 28, 1, STEEL[2]);
  for (const [x, y] of [[8, 0], [6, 1], [4, 0]] as const) p.set(x, y, alpha(H('#ffffff'), 0.7));
}));

// ---------------------------------------------------------------- Frostland furniture

/** A cast-iron stove with its pipe up to the ceiling, a fire behind the little window and a kettle (1×1, tall). */
add('hm_stove', [1, 1], piece(16, 46, (p) => {
  rect(p, 6, 0, 4, 22, IRON);
  bevel(p, 1, 20, 14, 21, [H('#5a5a66'), H('#34343e'), H('#1e1e26')]);
  rect(p, 2, 41, 2, 4, IRON); rect(p, 12, 41, 2, 4, IRON);
}, (p) => {
  rect(p, 7, 0, 1, 22, H('#4a4a56'));
  rect(p, 5, 8, 6, 2, H('#4a4a56'));
  rect(p, 4, 27, 8, 8, H('#1a1010'));
  for (let y = 28; y < 35; y++) for (let x = 5; x < 11; x++) { const f = Math.abs(x - 7.5) + (34 - y) * 0.7 + hash(x, y, 1060) * 1.5; p.set(x, y, f < 2.4 ? H('#fff0a0') : f < 4 ? H('#ffa830') : f < 5.6 ? H('#e05a1a') : H('#2a1410')); }
  rect(p, 4, 31, 8, 1, H('#34343e'));
  rect(p, 1, 23, 14, 1, H('#6a6a78'));
  // the kettle on top
  rect(p, 2, 16, 6, 4, STEEL[2]); rect(p, 2, 16, 6, 1, STEEL[0]); rect(p, 8, 17, 2, 1, STEEL[2]); rect(p, 4, 14, 2, 2, STEEL[3]);
  for (let x = 2; x < 15; x++) p.set(x, 45, alpha(H('#ffa040'), 0.25));
}, { shadow: [8, 44, 7, 1] }));

/** Skis and poles leaning against the wall. */
add('hm_skis', [1, 1], piece(16, 36, (p) => {
  for (let y = 2; y < 35; y++) { rect(p, 2 + Math.floor((y - 2) / 16), y, 3, 1, H('#c83a34')); rect(p, 7 + Math.floor((y - 2) / 16), y, 3, 1, H('#d8a050')); }
  rect(p, 2, 0, 3, 3, H('#c83a34')); rect(p, 7, 0, 3, 3, H('#d8a050'));
  line(p, 11, 3, 13, 34, H('#4a4a56')); line(p, 14, 3, 12, 34, H('#4a4a56'));
}, (p) => {
  for (let y = 2; y < 35; y += 1) { p.set(2 + Math.floor((y - 2) / 16), y, H('#f06a5a')); p.set(7 + Math.floor((y - 2) / 16), y, H('#f4c880')); }
  rect(p, 2, 18, 3, 3, H('#2a2a32')); rect(p, 8, 18, 3, 3, H('#2a2a32'));
  disc(p, 12.5, 30, 2.2, (d) => (d > 1.5 ? H('#2a2a32') : 0)); disc(p, 12.5, 30, 2.2, () => 0);
  rect(p, 10, 3, 2, 2, H('#2a2a32')); rect(p, 14, 3, 2, 2, H('#2a2a32'));
}, { shadow: [8, 35, 6, 1] }));

/** Firewood stacked up. */
add('hm_woodpile', [1, 1], piece(16, 20, (p) => {
  for (const [x, y] of [[4, 16], [9, 16], [14, 16], [6.5, 11.5], [11.5, 11.5], [9, 7]] as const) disc(p, x, y, 2.7, () => OAK[2]);
}, (p) => {
  for (const [x, y] of [[4, 16], [9, 16], [14, 16], [6.5, 11.5], [11.5, 11.5], [9, 7]] as const) disc(p, x, y, 2.7, (d) => (d > 2.1 ? OAK[3] : d > 1 ? PINE[1] : PINE[2]));
}, { shadow: [9, 19, 7, 1] }));

/** A fishing net hung up to dry, with floats (on the wall, 2×1). */
add('hm_nets', [2, 1], piece(32, 28, (p) => {
  line(p, 1, 2, 30, 2, H('#8a6a3a'));
  for (let y = 3; y < 26; y++) for (let x = 2; x < 30; x++) {
    const sag = Math.sin(((x - 2) / 28) * Math.PI) * 3;
    if (y > 24 - Math.abs(x - 16) / 3 + sag * 0.3) continue;
    if ((x + y) % 5 === 0 || (x - y + 100) % 5 === 0) p.set(x, Math.round(y + sag * (y / 26)), H('#c8b890'));
  }
}, (p) => {
  for (const x of [4, 11, 18, 25]) { disc(p, x + 1, 3.5, 2, () => H('#f07a2a')); p.set(x, 2, H('#ffb070')); }
}, { out: alpha(H('#2a2014'), 0.6) }));

/** Smoked fish hanging on a rod (on the wall). */
add('hm_fishrack', [1, 1], piece(16, 24, (p) => {
  rect(p, 0, 3, 16, 2, OAK[2]);
  for (const [x, len] of [[1, 15], [6, 17], [11, 14]] as const) {
    for (let y = 5; y < 5 + len; y++) {
      const t = (y - 5) / len, w = t < 0.15 ? 1 : t > 0.85 ? 1 + (t - 0.85) * 12 : 2 + Math.sin(t * Math.PI) * 1.4;
      for (let k = -Math.floor(w); k <= Math.floor(w); k++) p.set(x + 2 + k, y, k < 0 ? H('#e8b050') : k > 0 ? H('#8a5020') : H('#c08030'));
    }
  }
}, (p) => { for (const x of [3, 8, 13]) { p.set(x - 1, 9, IRON); rect(p, x, 3, 1, 3, H('#c8b890')); } }));

/** Ice fishing gear: an auger, a short rod and a bucket (1×1). */
add('hm_tackle', [1, 1], piece(16, 32, (p) => {
  // the auger leaning on the wall
  rect(p, 3, 1, 2, 27, STEEL[2]); rect(p, 1, 1, 6, 2, H('#c83a34'));
  for (let y = 18; y < 29; y += 2) rect(p, 2, y, 4, 1, STEEL[1]);
  // the bucket
  poly(p, [[7, 20], [15, 20], [14, 31], [8, 31]], () => OAK[1]);
}, (p) => {
  rect(p, 8, 22, 6, 1, IRON); rect(p, 8, 28, 6, 1, IRON);
  rect(p, 8, 20, 7, 1, H('#2a4a6a'));
  line(p, 10, 19, 14, 4, OAK[3]); p.set(14, 4, H('#c83a34')); line(p, 14, 4, 15, 10, H('#d8d8e0'));
  p.set(12, 19, H('#a8c8e0')); p.set(9, 19, H('#d8e8f0'));
}, { shadow: [9, 31, 7, 1] }));

/** An armchair with a knitted blanket and a ball of wool. */
add('hm_armchair', [1, 1], piece(16, 22, (p) => {
  bevel(p, 1, 1, 14, 12, [H('#6aa878'), H('#4a8a5a'), H('#2e6a3e')]);
  bevel(p, 0, 9, 4, 11, [H('#6aa878'), H('#4a8a5a'), H('#2e6a3e')]); bevel(p, 12, 9, 4, 11, [H('#6aa878'), H('#4a8a5a'), H('#2e6a3e')]);
  bevel(p, 3, 12, 10, 7, [H('#7ab888'), H('#5a9a6a'), H('#3e7a4e')]);
  rect(p, 2, 20, 2, 2, DARKWOOD[2]); rect(p, 12, 20, 2, 2, DARKWOOD[2]);
}, (p) => {
  for (let y = 4; y < 16; y++) for (let x = 6; x < 13; x++) p.set(x, y, (x + y) % 3 === 0 ? H('#f4ecdc') : y % 4 < 2 ? H('#c83a34') : H('#e8dcc8'));
  disc(p, 3, 17, 2, () => H('#3a68a8')); p.set(2, 16, H('#6a9ad0'));
}, { shadow: [8, 21, 7, 1] }));

/** A plain wooden bench (the sauna; 2×1). */
add('hm_bench', [2, 1], piece(32, 18, (p) => {
  rect(p, 3, 9, 3, 8, PINE[2]); rect(p, 26, 9, 3, 8, PINE[3]);
  bevel(p, 1, 4, 30, 6, [PINE[0], PINE[1], PINE[3]]);
}, (p) => { for (let x = 1; x < 31; x += 6) rect(p, x, 4, 1, 6, PINE[2]); rect(p, 1, 6, 30, 1, PINE[2]); }, { shadow: [16, 16, 14, 1] }));

/** A wooden sauna bucket with a ladle, and a sauna stove with its stones. */
add('hm_saunastove', [1, 1], piece(16, 28, (p) => {
  bevel(p, 1, 8, 14, 18, [H('#5a5a66'), H('#34343e'), H('#1e1e26')]);
  for (const [x, y] of [[4, 6], [8, 5], [12, 6], [6, 8], [10, 8]] as const) disc(p, x, y, 2.6, () => GREY[2]);
}, (p) => {
  for (const [x, y] of [[4, 6], [8, 5], [12, 6], [6, 8], [10, 8]] as const) { disc(p, x, y, 2.6, (d) => (d < 1.2 ? GREY[0] : GREY[2])); p.set(x + 1, y + 1, GREY[3]); }
  rect(p, 4, 16, 8, 5, H('#1a1010')); rect(p, 5, 18, 6, 3, H('#e86a20')); rect(p, 6, 19, 3, 1, H('#ffd060'));
  for (const [x, y] of [[5, 1], [9, 0], [11, 2]] as const) p.set(x, y, alpha(H('#ffffff'), 0.6));
}, { shadow: [8, 26, 7, 1] }));
add('hm_bucket', [1, 1], piece(16, 16, (p) => {
  poly(p, [[3, 5], [13, 5], [12, 15], [4, 15]], () => PINE[1]);
}, (p) => {
  rect(p, 4, 5, 8, 2, H('#6a9ac8')); rect(p, 3, 8, 10, 1, BRASS[2]); rect(p, 4, 12, 8, 1, BRASS[2]);
  for (let x = 5; x < 12; x += 2) rect(p, x, 9, 1, 3, PINE[2]);
  line(p, 9, 5, 14, 0, PINE[3]);
}, { shadow: [8, 15, 6, 1] }));

/** A telescope on a tripod (the stargazer). */
add('hm_telescope', [1, 1], piece(16, 30, (p) => {
  line(p, 8, 16, 2, 29, OAK[3]); line(p, 8, 16, 14, 29, OAK[3]); line(p, 8, 16, 8, 29, OAK[2]);
  poly(p, [[2, 13], [13, 3], [15, 6], [4, 16]], () => BRASS[1]);
}, (p) => {
  line(p, 3, 13, 13, 4, BRASS[0]);
  rect(p, 13, 3, 2, 3, IRON);
  disc(p, 8, 10, 1.5, () => IRON);
}, { shadow: [8, 29, 6, 1] }));

/** Snowflake drawings in a frame (on the wall). */
add('hm_flakes', [1, 1], piece(16, 22, (p) => {
  bevel(p, 1, 2, 14, 18, tones('#f4ecd8', '#c8b090', '#8a7050'));
}, (p) => {
  rect(p, 3, 4, 10, 14, H('#e8f0fa'));
  const flake = (cx: number, cy: number) => {
    for (let k = 0; k < 6; k++) { const a = (k * Math.PI) / 3; for (let r = 0; r < 3; r++) p.set(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), H('#3a78c8')); }
  };
  flake(6, 7); flake(10, 11); flake(6, 15);
}));

// ---------------------------------------------------------------- Megacity furniture

/** The hotel's reception desk: marble top, mahogany front with a brass band, a bell, a screen and the book (3×1). */
add('hm_reception', [3, 1], piece(48, 30, (p) => {
  bevel(p, 1, 8, 46, 21, tones('#9a4a32', '#6a2e1e', '#3e1a10'));
  bevel(p, 0, 6, 48, 4, tones('#ffffff', '#ece6dc', '#b8b0a4'));
}, (p) => {
  rect(p, 1, 14, 46, 2, BRASS[1]); rect(p, 1, 14, 46, 1, BRASS[0]);
  for (let x = 6; x < 44; x += 12) bevel(p, x, 18, 8, 9, tones('#8a4030', '#5a2416', '#3a160c'));
  // the screen, the guest book, the bell
  bevel(p, 31, 0, 10, 7, tones('#4a4a56', '#2a2a32', '#1a1a20')); rect(p, 32, 1, 8, 4, H('#7ac8f0')); rect(p, 35, 6, 2, 1, IRON);
  rect(p, 8, 4, 10, 3, PAPER); rect(p, 13, 4, 1, 3, H('#a89c80')); rect(p, 8, 4, 10, 1, H('#7a2a2a'));
  disc(p, 23, 5.5, 2.5, (d, x, y) => (y > 5 ? 0 : d > 1.8 ? BRASS[2] : BRASS[0])); rect(p, 20, 5, 6, 1, BRASS[2]); p.set(23, 2, BRASS[2]);
}));

/** The key board behind reception: pigeonholes with keys (on the wall, 2×1). */
add('hm_keys', [2, 1], piece(32, 26, (p) => {
  bevel(p, 1, 1, 30, 22, tones('#9a4a32', '#6a2e1e', '#3e1a10'));
}, (p) => {
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
    const x = 3 + c * 4.5, y = 3 + r * 6.5;
    rect(p, Math.round(x), Math.round(y), 4, 5, H('#2a100a'));
    if (hash(c, r, 1070) < 0.65) { rect(p, Math.round(x) + 1, Math.round(y) + 2, 2, 3, BRASS[1]); p.set(Math.round(x) + 1, Math.round(y) + 2, BRASS[0]); }
    if (hash(c, r, 1071) < 0.25) rect(p, Math.round(x) + 1, Math.round(y), 3, 2, PAPER);
  }
}));

/** Lift doors in a brass frame with the floor display and the call button (on the wall, 2×1). */
add('hm_lift', [2, 1], piece(32, 32, (p) => {
  bevel(p, 1, 0, 30, 32, BRASS);
}, (p) => {
  rect(p, 4, 7, 24, 25, STEEL[2]);
  for (const x of [4, 16]) { bevel(p, x, 7, 12, 25, STEEL); rect(p, x + 2, 9, 1, 20, STEEL[0]); }
  rect(p, 15, 7, 2, 25, STEEL[3]);
  rect(p, 10, 1, 12, 5, H('#1a1a20'));
  // the floor number and an arrow, lit
  for (const [x, y] of [[13, 2], [14, 2], [15, 2], [15, 3], [14, 4], [13, 4], [15, 4]] as const) p.set(x, y, H('#ffa030'));
  for (const [x, y] of [[18, 4], [19, 3], [20, 4], [19, 2]] as const) p.set(x, y, H('#ffa030'));
  rect(p, 0, 31, 32, 1, H('#00000040'));
}));

/** A leather sofa with two cushions (2×1). */
add('hm_sofa', [2, 1], piece(32, 24, (p) => {
  bevel(p, 2, 2, 28, 10, tones('#a8483a', '#7e2e24', '#5a1c16'));
  bevel(p, 0, 7, 6, 14, tones('#a8483a', '#7e2e24', '#5a1c16')); bevel(p, 26, 7, 6, 14, tones('#a8483a', '#7e2e24', '#5a1c16'));
  bevel(p, 5, 11, 22, 9, tones('#b85848', '#8e3a2e', '#5a1c16'));
  rect(p, 3, 20, 2, 3, DARKWOOD[3]); rect(p, 27, 20, 2, 3, DARKWOOD[3]);
}, (p) => {
  rect(p, 16, 12, 1, 8, H('#5a1c16'));
  for (const x of [8, 19]) bevel(p, x, 6, 6, 6, tones('#fff0b0', '#e8c25a', '#b88a30'));
  for (const [x, y] of [[6, 4], [12, 4], [18, 4], [24, 4]] as const) p.set(x, y, H('#5a1c16'));
}, { shadow: [16, 22, 15, 1] }));

/** A big potted palm in a brass pot. */
add('hm_palm', [1, 1], piece(16, 36, (p) => {
  const frond = (x0: number, y0: number, x1: number, y1: number) => {
    const n = 12;
    for (let k = 0; k <= n; k++) {
      const t = k / n, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t + Math.sin(t * Math.PI) * -3 + t * t * 4;
      const w = Math.sin(t * Math.PI) * 2.2;
      for (let d = -w; d <= w; d += 0.5) p.set(Math.round(x + d * 0.3), Math.round(y + d), d < 0 ? H('#5cb65a') : H('#2e7a3a'));
    }
  };
  rect(p, 7, 10, 2, 16, H('#7a5a2a'));
  frond(8, 10, 0, 14); frond(8, 10, 16, 13); frond(8, 9, 2, 2); frond(8, 9, 14, 1); frond(8, 8, 8, 0);
  bevel(p, 3, 25, 10, 10, BRASS);
}, (p) => { rect(p, 4, 27, 8, 1, BRASS[0]); rect(p, 3, 25, 10, 2, H('#4a3a22')); }, { out: H('#1a2a14'), shadow: [8, 34, 6, 1] }));

/** A luggage trolley with suitcases. */
add('hm_luggage', [1, 1], piece(16, 30, (p) => {
  rect(p, 2, 0, 1, 27, BRASS[1]); rect(p, 13, 0, 1, 27, BRASS[2]); rect(p, 2, 0, 12, 1, BRASS[1]);
  rect(p, 1, 25, 14, 2, BRASS[2]);
  bevel(p, 3, 14, 10, 11, tones('#5a8ad0', '#3a68a8', '#24467a'));
  bevel(p, 4, 6, 8, 8, tones('#e8b060', '#c8883a', '#8a5a1e'));
}, (p) => {
  rect(p, 6, 13, 4, 1, IRON); rect(p, 7, 5, 2, 1, IRON);
  for (const x of [3, 12]) disc(p, x, 28, 1.5, () => IRON);
}, { shadow: [8, 29, 7, 1] }));

/** The museum's dinosaur: a skeleton on a stone plinth (3×2). */
add('hm_skeleton', [3, 2], piece(48, 46, (p) => {
  bevel(p, 1, 34, 46, 11, tones('#e4ddd0', '#c4bcae', '#8a8276'));
}, (p) => {
  const bone = H('#f2ead6'), boneD = H('#c8bc9c'), o = H('#5a4a34');
  const B = (x0: number, y0: number, x1: number, y1: number) => { line(p, x0, y0 + 1, x1, y1 + 1, o); line(p, x0, y0, x1, y1, bone); };
  // spine from tail to neck, ribs, legs, skull with teeth
  const spine: [number, number][] = [[3, 26], [8, 22], [14, 18], [20, 16], [26, 16], [31, 15], [35, 12], [38, 8]];
  for (let k = 0; k + 1 < spine.length; k++) B(spine[k][0], spine[k][1], spine[k + 1][0], spine[k + 1][1]);
  for (let k = 0; k < spine.length; k++) { p.set(spine[k][0], spine[k][1] - 1, boneD); p.set(spine[k][0], spine[k][1] - 2, bone); }
  for (let x = 19; x < 32; x += 3) { const y = 16; line(p, x, y + 1, x - 1, y + 8 + Math.sin((x - 19) / 4) * 2, bone); p.set(x, y + 9, o); }
  B(20, 18, 17, 26); B(17, 26, 21, 34); B(21, 34, 17, 34);
  B(27, 18, 30, 26); B(30, 26, 27, 34); B(27, 34, 31, 34);
  B(34, 16, 36, 20); B(36, 20, 38, 19);
  // the skull
  poly(p, [[36, 4], [45, 5], [46, 9], [40, 11], [36, 10]], () => bone);
  line(p, 36, 4, 45, 5, o); line(p, 45, 5, 46, 9, o); line(p, 46, 9, 36, 10, o);
  p.set(39, 6, o); p.set(40, 6, o);
  for (let x = 40; x < 46; x += 2) p.set(x, 9, H('#ffffff'));
  line(p, 38, 11, 45, 11, o);
  // a stand holding it up and a label
  rect(p, 24, 17, 1, 17, IRON);
  rect(p, 18, 38, 12, 4, H('#c8a050')); rect(p, 19, 39, 10, 2, H('#2a2014'));
}));

/** A glass case on a pedestal: an old vase, or the city's first coin. */
function vitrine(inside: (p: Pix) => void) {
  return piece(16, 32, (p) => {
    bevel(p, 2, 16, 12, 15, tones('#f4f0e8', '#d8d0c2', '#a8a092'));
    rect(p, 1, 2, 14, 15, H('#cfeaf8'));
  }, (p) => {
    inside(p);
    rect(p, 1, 2, 14, 15, alpha(H('#cfeaf8'), 0.35));
    for (let k = 0; k < 5; k++) p.set(3 + k, 8 - k, alpha(H('#ffffff'), 0.8));
    rect(p, 1, 2, 14, 1, H('#ffffff')); rect(p, 1, 16, 14, 1, BRASS[2]);
    rect(p, 5, 22, 6, 3, BRASS[1]);
  }, { shadow: [8, 31, 7, 1] });
}
add('hm_vitrine', [1, 1], vitrine((p) => {
  // an amphora
  for (let y = 5; y < 16; y++) { const w = y < 7 ? 1 : 1 + Math.sin(((y - 6) / 10) * Math.PI) * 3.2; for (let x = -Math.round(w); x <= Math.round(w); x++) p.set(8 + x, y, x < 0 ? H('#d8804a') : H('#b05a2a')); }
  rect(p, 5, 9, 7, 1, H('#2a1a10'));
  line(p, 6, 6, 5, 9, H('#b05a2a')); line(p, 10, 6, 11, 9, H('#b05a2a'));
}));
add('hm_vitrine_coin', [1, 1], vitrine((p) => {
  rect(p, 3, 13, 10, 3, H('#3a2a5a'));
  disc(p, 8, 10, 3.5, (d) => (d > 2.8 ? BRASS[2] : d < 1.5 ? BRASS[0] : BRASS[1]));
  p.set(7, 9, BRASS[3]); p.set(9, 9, BRASS[3]); p.set(8, 11, BRASS[3]);
}));

/** A painting in a gold frame (on the wall, 2×1): ships in the harbour at sunset. */
add('hm_painting', [2, 1], piece(32, 26, (p) => {
  bevel(p, 1, 1, 30, 22, BRASS);
}, (p) => {
  rect(p, 4, 4, 24, 16, (x, y) => {
    if (y > 13) return (x + y) % 3 ? H('#2a4a7a') : H('#e8904a');
    if (y > 11) return H('#3a5a8a');
    const sun = Math.hypot(x - 20, y - 10) < 3;
    return sun ? H('#ffd870') : mix(H('#f0a060'), H('#6a5a9a'), (11 - y) / 8);
  });
  // a sailing ship
  rect(p, 9, 12, 7, 2, H('#2a1a10')); rect(p, 12, 5, 1, 7, H('#2a1a10'));
  poly(p, [[13, 5], [17, 11], [13, 11]], () => H('#f4ecd8'));
  poly(p, [[11, 6], [11, 11], [8, 11]], () => H('#e8dcc4'));
  rect(p, 13, 23, 6, 1, H('#00000040'));
}));

/** An old map of the city on parchment (on the wall, 2×1). */
add('hm_oldmap', [2, 1], piece(32, 26, (p) => {
  rect(p, 1, 2, 30, 21, H('#e8d4a4'));
}, (p) => {
  rect(p, 1, 2, 30, 21, (x, y) => (hash(x >> 1, y >> 1, 1080) < 0.15 ? H('#d8c08a') : H('#ecdaae')));
  // the sea, the river, the old walls
  for (let y = 2; y < 23; y++) for (let x = 1; x < 31; x++) if (y > 16 + Math.sin(x / 4) * 1.5) p.set(x, y, H('#8ab0b8'));
  for (let y = 2; y < 18; y++) p.set(14 + Math.round(Math.sin(y / 3) * 2), y, H('#6a98a8'));
  disc(p, 15, 10, 5.5, (d) => (d > 4.8 ? H('#8a5a3a') : 0));
  for (const [x, y] of [[12, 8], [17, 9], [14, 12], [18, 12]] as const) rect(p, x, y, 2, 2, H('#a8482a'));
  for (const [x, y] of [[5, 6], [24, 5], [26, 10], [6, 12]] as const) p.set(x, y, H('#5a7a3a'));
  rect(p, 0, 1, 2, 23, H('#a8885a')); rect(p, 30, 1, 2, 23, H('#a8885a'));
}));

/** A brass post with a red velvet rope. */
add('hm_rope', [1, 1], piece(16, 20, (p) => {
  for (const x of [2, 13]) { rect(p, x, 4, 2, 13, BRASS[1]); disc(p, x + 1, 3.5, 1.8, () => BRASS[0]); rect(p, x - 1, 16, 4, 2, BRASS[2]); }
  for (let x = 3; x < 14; x++) { const y = 6 + Math.round(Math.sin(((x - 3) / 10) * Math.PI) * 3); p.set(x, y, H('#c8202a')); p.set(x, y + 1, H('#8a1018')); }
}, undefined, { shadow: [8, 18, 7, 1] }));

/** Coin-operated binoculars at the tower window. */
add('hm_binoculars', [1, 1], piece(16, 30, (p) => {
  rect(p, 7, 12, 2, 16, STEEL[2]); rect(p, 4, 27, 8, 2, STEEL[3]);
  bevel(p, 2, 3, 12, 9, tones('#7ab8e0', '#3a88c0', '#245a8a'));
}, (p) => {
  for (const x of [3, 9]) { rect(p, x, 4, 4, 4, IRON); rect(p, x + 1, 5, 2, 2, H('#4a6a8a')); }
  rect(p, 6, 9, 4, 2, BRASS[1]); p.set(7, 9, IRON);
}, { shadow: [8, 29, 5, 1] }));

/** The caretaker's desk with two screens. */
add('hm_guarddesk', [2, 1], piece(32, 28, (p) => {
  bevel(p, 1, 10, 30, 17, tones('#c8ced8', '#9aa2b0', '#6a7280'));
  bevel(p, 0, 8, 32, 4, tones('#5a5a66', '#3a3a44', '#24242c'));
  bevel(p, 4, 0, 10, 8, tones('#4a4a56', '#2a2a32', '#1a1a20')); bevel(p, 16, 0, 10, 8, tones('#4a4a56', '#2a2a32', '#1a1a20'));
}, (p) => {
  rect(p, 5, 1, 8, 5, H('#5aa86a')); rect(p, 17, 1, 8, 5, H('#7ac8f0'));
  rect(p, 6, 2, 3, 2, H('#8ad89a')); rect(p, 19, 3, 4, 1, H('#ffffff'));
  rect(p, 27, 5, 3, 3, H('#e8e2d8'));
  rect(p, 1, 17, 30, 1, STEEL[3]);
}));

// a cosy floor lamp, used anywhere
add('hm_lamp', [1, 1], piece(16, 34, (p) => {
  poly(p, [[3, 10], [13, 10], [11, 2], [5, 2]], () => H('#e8c890'));
  rect(p, 7, 10, 2, 22, BRASS[2]);
  rect(p, 4, 31, 8, 2, BRASS[2]);
}, (p) => {
  for (let y = 3; y < 10; y++) p.set(6, y, H('#fff0c8'));
  for (let y = 11; y < 16; y++) for (let x = 3; x < 14; x++) p.set(x, y, alpha(H('#fff0a0'), 0.18 - (y - 11) * 0.03));
}, { shadow: [8, 33, 5, 1] }));

// a big plant in a pot (canopy like the outdoor trees)
add('hm_plant', [1, 1], (() => {
  const p = new Pix(16, 28);
  shadowEllipse(p, 8, 26, 6, 1, H('#1a0e0640'));
  canopy(p, 0, 0, 16, 18, [{ x: 8, y: 7, r: 6 }, { x: 4, y: 11, r: 4 }, { x: 12, y: 11, r: 4 }], tones('#2e6a30', '#40884a', '#5ca85a', '#86c86e'), H('#1a2a14'), 1090);
  for (let y = 16; y < 27; y++) for (let x = 3; x < 13; x++) {
    const w = y < 18 ? 0 : (y - 18) / 4;
    if (x < 3 + w || x > 12 - w) continue;
    p.set(x, y, x === Math.ceil(3 + w) || x === Math.floor(12 - w) || y === 26 ? H('#5a2a14') : y < 18 ? H('#d8704a') : H('#b85a3a'));
  }
  return p;
})());
