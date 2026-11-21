/**
 * The adventure's runtime in the browser: grid movement (tap a direction to turn, hold to walk), collisions, camera,
 * and drawing to a pixel-perfect canvas. Dialogue and menus live in the Preact component; the engine only reports
 * what the player interacts with and pauses while a dialogue is open.
 */
import { EDGE, FENCE, FOREST, ROCK, T, TRACK, TRACK_H, WATER, type Dir } from './art';
import { Pix } from './pix';
import { buildWorld, drawWorld, MARGIN, tileAt, type Actor, type World } from './render';
import { thingAt } from './things';
import { MAPS, present, size, solid, type MapDef, type Obj, type Save, type Thing, type Warp } from './world';

const SPEED = 5; // tiles per second
const RUN = 9; // holding the run key
const TURN_MS = 110; // after turning on the spot, how long the key must stay down before the cat walks
const BLOCKED = new Set([FOREST, WATER, ROCK, FENCE, TRACK, TRACK_H]);
void EDGE;
const STEP: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

/** Built maps are kept, so going back and forth through a door is instant. */
const worlds = new Map<string, { world: World; layers: HTMLCanvasElement[] }>();
function built(m: MapDef) {
  let w = worlds.get(m.id);
  if (!w) { const world = buildWorld(m); w = { world, layers: world.ground.map(toCanvas) }; worlds.set(m.id, w); }
  return w;
}
const worldOf = (m: MapDef) => built(m).world;
const layersOf = (m: MapDef) => built(m).layers;

const canvases = new WeakMap<Pix, HTMLCanvasElement>();
export function toCanvas(p: Pix): HTMLCanvasElement {
  let c = canvases.get(p);
  if (!c) {
    c = document.createElement('canvas');
    c.width = p.w; c.height = p.h;
    c.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(p.d), p.w, p.h), 0, 0);
    canvases.set(p, c);
  }
  return c;
}

export interface EngineEvents {
  interact: (o: Obj) => void;
  /** The cat reached a way to another map; the component fades and calls go(). */
  warp: (w: Warp) => void;
  /** The player finished a step (to save the position now and then). */
  stepped: () => void;
}

export class Engine {
  paused = false;
  /** Dev option: walk through anything. */
  noclip = false;
  /** Shift / held B: run. */
  running = false;
  private held: Dir[] = [];
  private turnedAt = 0;
  private moving = false;
  private from = { x: 0, y: 0 };
  private t = 0; // 0..1 along the current step
  private steps = 0;
  private layers: HTMLCanvasElement[];
  private world: World;
  private raf = 0;
  private last = 0;
  private chompUntil = 0;
  private ctx: CanvasRenderingContext2D;
  private vw = 0;
  private vh = 0;

  private map: MapDef;

  constructor(private canvas: HTMLCanvasElement, readonly save: Save, private ev: EngineEvents) {
    this.ctx = canvas.getContext('2d')!;
    this.map = MAPS[save.map];
    this.world = worldOf(this.map);
    this.layers = layersOf(this.map);
  }

  get mapDef() { return this.map; }

  /** Moves the cat to another map. */
  go(to: string, x: number, y: number, dir: Dir) {
    this.map = MAPS[to];
    this.world = worldOf(this.map);
    this.layers = layersOf(this.map);
    this.save.map = to;
    this.place(x, y, dir);
  }

  start() {
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - (this.last || now)) / 1000);
      this.last = now;
      this.update(dt, now);
      this.draw(now);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() { cancelAnimationFrame(this.raf); }

  /** Fits the canvas to its box: whole-pixel scaling, about 12×10 tiles at least, sharp on any screen. */
  resize(cssW: number, cssH: number) {
    const dpr = window.devicePixelRatio || 1;
    const W = cssW * dpr, H = cssH * dpr;
    const k = Math.max(1, Math.floor(Math.min(W / (12 * T), H / (10 * T))));
    this.vw = Math.ceil(W / k);
    this.vh = Math.ceil(H / k);
    this.canvas.width = this.vw;
    this.canvas.height = this.vh;
    this.canvas.style.width = `${(this.vw * k) / dpr}px`;
    this.canvas.style.height = `${(this.vh * k) / dpr}px`;
    this.ctx.imageSmoothingEnabled = false;
  }

  press(d: Dir) {
    if (!this.held.includes(d)) this.held.unshift(d);
  }
  release(d: Dir) { this.held = this.held.filter((x) => x !== d); }
  releaseAll() { this.held = []; }

  /** A button: talk to / look at what is in front of the cat. */
  action() {
    if (this.paused || this.moving) return;
    const [dx, dy] = STEP[this.save.dir];
    const o = this.objectAt(this.save.x + dx, this.save.y + dy);
    if (o) this.ev.interact(o);
  }

  /** The beaver gnawing the log, the penguin digging: a short shake, then `done`. */
  chomp(done: () => void) {
    this.chompUntil = performance.now() + 1300;
    setTimeout(done, 1300);
  }

  /** What the thing in front of the cat is called (the "name it" key). */
  look(): Thing {
    const [dx, dy] = STEP[this.save.dir];
    return thingAt(this.map, this.save.x + dx, this.save.y + dy, this.save);
  }

  /** A picture of a whole map with the cat on it (the inventory's map). */
  snapshot(id = this.map.id): HTMLCanvasElement {
    const m = MAPS[id];
    const W = m.rows[0].length * T, H = m.rows.length * T;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d')!;
    g.drawImage(layersOf(m)[0], MARGIN * T, MARGIN * T, W, H, 0, 0, W, H);
    const blit = (p: Pix, x: number, y: number, flip = false) => {
      const src = toCanvas(p);
      if (!flip) { g.drawImage(src, x, y); return; }
      g.save(); g.translate(x + p.w, y); g.scale(-1, 1); g.drawImage(src, 0, 0); g.restore();
    };
    const here = id === this.map.id;
    const me = { px: here ? this.save.x * T : -999, py: here ? this.save.y * T : -999, dir: this.save.dir, step: 0, moving: false };
    drawWorld(blit, m, worldOf(m), this.save, me, 0, 0, 0, { x: 0, y: 0, w: W, h: H });
    return c;
  }

  place(x: number, y: number, dir: Dir) {
    this.save.x = x; this.save.y = y; this.save.dir = dir;
    this.moving = false;
  }

  private objectAt(x: number, y: number): Obj | undefined {
    return this.map.objs.find((o) => {
      if (!present(o, this.save)) return false;
      const { w, h } = size(o);
      return x >= o.x && x < o.x + w && y >= o.y && y < o.y + h;
    });
  }

  private walkable(x: number, y: number): boolean {
    if (this.noclip) return x >= 0 && y >= 0 && x < this.map.rows[0].length && y < this.map.rows.length;
    // water under a lowered bridge can be crossed
    const deck = this.map.objs.some((o) => o.k === 'bridge' && present(o, this.save) && x >= o.x && x < o.x + 3 && y >= o.y && y < o.y + 2);
    if (BLOCKED.has(tileAt(this.map, x, y)) && !deck) return false;
    if (x < 0 || y < 0 || x >= this.map.rows[0].length || y >= this.map.rows.length) return false;
    return !this.map.objs.some((o) => present(o, this.save) && solid(o).some(([dx, dy]) => o.x + dx === x && o.y + dy === y));
  }

  private update(dt: number, now: number) {
    const s = this.save;
    let continuing = false;
    if (this.moving) {
      this.t += dt * (this.running ? RUN : SPEED);
      if (this.t < 1) return;
      this.moving = false;
      this.t = 0;
      this.steps++;
      continuing = true;
      const w = this.map.warps.find((e) => !e.door && e.x === s.x && e.y === s.y);
      if (w) { this.held = []; this.ev.warp(w); return; }
      this.ev.stepped();
    }
    if (this.paused) return;
    const d = this.held[0];
    if (!d) return;
    // From standing, a new direction first only turns the cat; keeping the key down then walks
    if (!continuing && d !== s.dir) { s.dir = d; this.turnedAt = now; return; }
    if (!continuing && now - this.turnedAt < TURN_MS) return;
    s.dir = d;
    const [dx, dy] = STEP[d];
    if (!this.walkable(s.x + dx, s.y + dy)) {
      // walking into a door
      const door = this.map.warps.find((e) => e.door && e.x === s.x + dx && e.y === s.y + dy);
      if (door && d === 'up') { this.held = []; this.ev.warp(door); }
      return;
    }
    this.from = { x: s.x, y: s.y };
    s.x += dx; s.y += dy;
    this.moving = true;
    this.t = 0;
  }

  private actor(): Actor {
    const s = this.save;
    const k = this.moving ? this.t : 1;
    const x = this.moving ? this.from.x + (s.x - this.from.x) * k : s.x;
    const y = this.moving ? this.from.y + (s.y - this.from.y) * k : s.y;
    // the walking frame changes halfway through each step
    return { px: x * T, py: y * T, dir: s.dir, step: this.steps * 2 + (this.moving && k > 0.5 ? 1 : 0), moving: this.moving };
  }

  private draw(now: number) {
    const { ctx, vw, vh } = this;
    if (!vw) return;
    const me = this.actor();
    const W = this.map.rows[0].length * T, H = this.map.rows.length * T;
    // camera on the cat, kept inside the drawn forest margin
    const lim = (v: number, size: number, view: number) => {
      const lo = -MARGIN * T, hi = size + MARGIN * T - view;
      return lo > hi ? (size - view) / 2 : Math.max(lo, Math.min(hi, v));
    };
    const cx = Math.round(lim(me.px + T / 2 - vw / 2, W, vw));
    const cy = Math.round(lim(me.py + T / 2 - vh / 2, H, vh));
    ctx.fillStyle = '#17421f';
    ctx.fillRect(0, 0, vw, vh);
    const frame = Math.floor(now / 600) % 2;
    ctx.drawImage(this.layers[frame], cx + MARGIN * T, cy + MARGIN * T, vw, vh, 0, 0, vw, vh);
    const blit = (p: Pix, x: number, y: number, flip = false, sy0 = 0, sy1 = p.h) => {
      const c = toCanvas(p);
      if (!flip) { ctx.drawImage(c, 0, sy0, p.w, sy1 - sy0, x, y + sy0, p.w, sy1 - sy0); return; }
      ctx.save();
      ctx.translate(x + p.w, y);
      ctx.scale(-1, 1);
      ctx.drawImage(c, 0, sy0, p.w, sy1 - sy0, 0, sy0, p.w, sy1 - sy0);
      ctx.restore();
    };
    drawWorld(blit, this.map, this.world, this.save, me, now, -cx, -cy, { x: cx, y: cy, w: vw, h: vh }, now < this.chompUntil);
    // caves are dark: only a small circle of light around the cat
    if (this.map.theme === 'cave') {
      const lx = me.px - cx + T / 2, ly = me.py - cy + T / 2;
      const g = ctx.createRadialGradient(lx, ly, T * 1.5, lx, ly, T * 5);
      g.addColorStop(0, 'rgba(6,6,14,0)');
      g.addColorStop(1, 'rgba(6,6,14,0.9)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, vw, vh);
    }
  }
}
