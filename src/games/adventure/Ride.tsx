/**
 * The ride cutscene (4 seconds, not skippable: it is short). The train stays in view, slightly rocking, while the
 * world streams past behind it in layers at different speeds.
 * - Train: sky and clouds, distant mountains / hills / skyline, then the game's own trees and houses, the ground,
 *   catenary poles and their wires. The look follows the destination: green Woodland, snowy Frostland (falling
 *   snow), the Megacity at sunset with lit windows.
 * - Metro: a dark tunnel with ribs, lamps and signals racing past.
 */
import { useEffect, useRef } from 'preact/hooks';
import { sfx } from '../../core/sfx';
import { FOREST_TREES, house, METRO_TRAIN, RIDE_LOOKS, SNOW_TREES, trainArt, type RideLook } from './art';
import { toCanvas } from './engine';
import { hash } from './pix';

export const RIDE_MS = 4000;

/** The country the train is going to (its look: built in here, or RIDE_LOOKS from a country's art). */
type Scenery = string;

const W = 320, H = 180;
const TRACK_Y = 150;

export function Ride({ kind, scenery, title, onDone }: { kind: 'train' | 'metro'; scenery: Scenery; title: string; onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const done = useRef(false);
  const finish = () => { if (!done.current) { done.current = true; onDone(); } };

  useEffect(() => {
    const g = ref.current!.getContext('2d')!;
    g.imageSmoothingEnabled = false;
    const train = toCanvas(kind === 'train' ? trainArt(scenery === 'ice' ? 'regional' : 'intercity') : METRO_TRAIN);
    const props = RIDE_LOOKS[scenery] ? RIDE_LOOKS[scenery].props.map(toCanvas)
      : scenery === 'ice' ? [toCanvas(SNOW_TREES[0]), toCanvas(SNOW_TREES[1]), toCanvas(house('snow'))]
      : scenery === 'forest' ? [toCanvas(FOREST_TREES[0]), toCanvas(FOREST_TREES[1]), toCanvas(house('red')), toCanvas(house('blue'))]
      : [toCanvas(FOREST_TREES[0])];
    const start = performance.now();
    let raf = 0;
    sfx('tap');
    const draw = (now: number) => {
      const t = Math.min(1, (now - start) / RIDE_MS);
      const s = (now - start) / 1000;
      if (kind === 'train') landscape(g, s, scenery, props);
      else tunnel(g, s);
      // the train, facing its direction of travel, rocking a little
      const bob = Math.round(Math.sin(s * 14) * 0.7);
      const tx = Math.round((W - train.width) / 2 + Math.sin(s * 1.3) * 3);
      g.drawImage(train, tx, TRACK_Y - train.height + 4 + bob);
      if (kind === 'train') foreground(g, s, scenery, TRACK_Y - train.height + 2 + bob);
      const fade = t < 0.1 ? 1 - t / 0.1 : t > 0.9 ? (t - 0.9) / 0.1 : 0;
      if (fade > 0) { g.fillStyle = `rgba(0,0,0,${fade})`; g.fillRect(0, 0, W, H); }
      if (t < 1) raf = requestAnimationFrame(draw);
      else finish();
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div class="adv-ride" role="img" aria-label={title}>
      <canvas ref={ref} width={W} height={H} />
      <div class="adv-ride-title">{title}</div>
    </div>
  );
}

type Look = Omit<RideLook, 'props'>;
const BUILT_IN: Record<string, Look> = {
  forest: { sky: ['#6ab4ec', '#bfe2fa'], cloud: '#ffffff', far: ['#8ab8a0', '#a4c8b0'], hill: ['#5aa850', '#4a9a44'], ground: '#7cc45c', groundD: '#5aa848', fence: '#9a6a3a', farShape: 'hills' },
  ice: { sky: ['#9ab4cc', '#dce8f4'], cloud: '#f4f8fc', far: ['#b8c8dc', '#ffffff'], hill: ['#dfe8f2', '#c8d4e4'], ground: '#eef4fa', groundD: '#c8d4e4', fence: '#6a5a4a', farShape: 'mountains' },
  metro: { sky: ['#e8885a', '#f8d08a'], cloud: '#f8c8a0', far: ['#8a7a98', '#6a5a7a'], hill: ['#5a5a6e', '#4a4a5c'], ground: '#8a8a92', groundD: '#6a6a74', fence: '#4a4a52', farShape: 'skyline' },
};
const lookOf = (scenery: Scenery): Look => RIDE_LOOKS[scenery] ?? BUILT_IN[scenery] ?? BUILT_IN.forest;

/** Everything behind the train, from the sky to the track. */
function landscape(g: CanvasRenderingContext2D, s: number, scenery: Scenery, props: HTMLCanvasElement[]) {
  const pal = lookOf(scenery);
  const shape = pal.farShape;
  const sky = g.createLinearGradient(0, 0, 0, TRACK_Y);
  sky.addColorStop(0, pal.sky[0]); sky.addColorStop(1, pal.sky[1]);
  g.fillStyle = sky; g.fillRect(0, 0, W, H);
  if (shape === 'skyline') { g.fillStyle = '#ffe0a0'; g.beginPath(); g.arc(240, 70, 22, 0, Math.PI * 2); g.fill(); }
  else { g.fillStyle = 'rgba(255,250,220,0.9)'; g.beginPath(); g.arc(262, 30, 10, 0, Math.PI * 2); g.fill(); }
  // clouds drifting slowly
  g.fillStyle = pal.cloud;
  for (let k = 0; k < 5; k++) {
    const x = ((k * 90 - s * 6) % 420 + 420) % 420 - 60, y = 18 + (k % 3) * 14;
    for (const [dx, dy, r] of [[0, 4, 7], [8, 0, 9], [18, 3, 7], [26, 6, 5]]) { g.beginPath(); g.arc(Math.round(x + dx), y + dy, r, 0, Math.PI * 2); g.fill(); }
  }
  // far layer: snow-capped mountains, soft hills, or the skyline with lit windows
  for (let x = 0; x < W; x++) {
    const wx = x + s * 10;
    if (shape === 'skyline') {
      const col = Math.floor(wx / 14);
      const h = 30 + hash(col, 1, 901) * 60;
      g.fillStyle = pal.far[col % 2]; g.fillRect(x, TRACK_Y - 40 - h, 1, h);
      if (Math.floor(wx) % 4 === 0) for (let y = TRACK_Y - 36 - h; y < TRACK_Y - 44; y += 5) if (hash(Math.floor(wx), y, 902) < 0.3) { g.fillStyle = '#ffe8a0'; g.fillRect(x, y, 1, 2); }
    } else if (shape === 'sea') {
      // the sea to the horizon, glittering
      g.fillStyle = pal.far[0]; g.fillRect(x, TRACK_Y - 62, 1, 62);
      if (hash(Math.floor(wx / 3), Math.floor(s * 4), 908) < 0.06) { g.fillStyle = pal.far[1]; g.fillRect(x, TRACK_Y - 60 + Math.floor(hash(Math.floor(wx), 2, 909) * 40), 2, 1); }
    } else {
      const h = shape === 'mountains'
        ? 55 + Math.abs(((wx / 50) % 2) - 1) * 50 + Math.sin(wx / 13) * 4
        : shape === 'dunes' ? 26 + Math.sin(wx / 60) * 12 + Math.sin(wx / 23 + 1) * 5
        : 40 + Math.sin(wx / 45) * 14 + Math.sin(wx / 19) * 6;
      g.fillStyle = pal.far[0]; g.fillRect(x, TRACK_Y - 30 - h, 1, h);
      if (shape === 'mountains' && h > 90) { g.fillStyle = pal.far[1]; g.fillRect(x, TRACK_Y - 30 - h, 1, Math.min(10, h - 90)); }
      if (shape === 'dunes') { g.fillStyle = pal.far[1]; g.fillRect(x, TRACK_Y - 30 - h, 1, 2); }
    }
  }
  // middle: rolling hills with the game's own trees and houses
  for (let x = 0; x < W; x++) {
    const wx = x + s * 30;
    const h = 22 + Math.sin(wx / 30) * 6;
    g.fillStyle = pal.hill[Math.floor(wx / 60) % 2]; g.fillRect(x, TRACK_Y - 12 - h, 1, h + 12);
  }
  const step = 34;
  for (let k = -2; k < W / step + 2; k++) {
    const base = Math.floor(s * 60 / step) + k;
    const x = Math.round(k * step - ((s * 60) % step));
    if (shape === 'skyline') {
      const h = 26 + hash(base, 3, 903) * 30;
      g.fillStyle = hash(base, 4, 904) < 0.5 ? '#3e3e52' : '#4a4a60'; g.fillRect(x, TRACK_Y - 14 - h, 28, h);
      for (let wy = TRACK_Y - 10 - h; wy < TRACK_Y - 18; wy += 5) for (let wx = x + 3; wx < x + 26; wx += 5) if (hash(wx + base * 31, wy, 905) < 0.45) { g.fillStyle = '#ffd88a'; g.fillRect(wx, wy, 2, 2); }
      continue;
    }
    if (hash(base, 6, 907) < 0.25) continue;
    const pick = props[Math.floor(hash(base, 5, 906) * props.length)];
    const scale = pick.width > 60 ? 0.5 : 0.75;
    g.drawImage(pick, x, Math.round(TRACK_Y - 14 - pick.height * scale), Math.round(pick.width * scale), Math.round(pick.height * scale));
  }
  // ground with a fence along the line
  g.fillStyle = pal.ground; g.fillRect(0, TRACK_Y - 16, W, H - TRACK_Y + 16);
  g.fillStyle = pal.groundD;
  for (let x = -((s * 120) % 9); x < W; x += 9) g.fillRect(Math.round(x), TRACK_Y - 12 + (Math.round(x) % 3), 3, 1);
  g.fillStyle = pal.fence;
  for (let x = -((s * 140) % 16); x < W; x += 16) g.fillRect(Math.round(x), TRACK_Y - 22, 2, 9);
  g.fillRect(0, TRACK_Y - 20, W, 1); g.fillRect(0, TRACK_Y - 16, W, 1);
  // ballast, sleepers and rails
  g.fillStyle = '#6a665e'; g.fillRect(0, TRACK_Y - 2, W, 10);
  g.fillStyle = '#4a3220';
  for (let x = -((s * 260) % 8); x < W; x += 8) g.fillRect(Math.round(x), TRACK_Y, 5, 5);
  g.fillStyle = '#d0d4dc'; g.fillRect(0, TRACK_Y + 1, W, 1); g.fillRect(0, TRACK_Y + 4, W, 1);
}

/** In front of the train: catenary poles and the wire flashing past, snow falling, birds. */
function foreground(g: CanvasRenderingContext2D, s: number, scenery: Scenery, wire: number) {
  const pal = lookOf(scenery);
  // the near verge below the rails, rushing past fastest
  g.fillStyle = pal.groundD; g.fillRect(0, TRACK_Y + 9, W, H - TRACK_Y - 9);
  for (let x = 0; x < W; x++) {
    const wx = x + s * 420;
    const h = Math.round(7 + Math.sin(wx / 11) * 3 + Math.sin(wx / 4.7) * 1.5);
    if (scenery === 'ice') {
      g.fillStyle = '#ffffff'; g.fillRect(x, H - h, 1, h);
      g.fillStyle = '#d4e2f0'; g.fillRect(x, H - h + 2, 1, 1);
    } else if (scenery === 'forest') {
      g.fillStyle = '#3e8a3a'; g.fillRect(x, H - h, 1, h);
      if (hash(Math.floor(wx), 7, 915) < 0.35) { g.fillStyle = '#2e6e2e'; g.fillRect(x, H - h - 3, 1, 3); }
      if (hash(Math.floor(wx / 3), 8, 916) < 0.04) { g.fillStyle = hash(Math.floor(wx / 3), 9, 917) < 0.5 ? '#f0d040' : '#e85a6a'; g.fillRect(x, H - h - 4, 2, 2); }
    } else { g.fillStyle = '#55555e'; g.fillRect(x, H - h + 3, 1, h - 3); }
  }
  // catenary: the wire sags between the poles and touches the pantograph
  const gap = 140;
  const off = (s * 300) % gap;
  g.fillStyle = '#2a2a32';
  for (let x = 0; x < W; x++) g.fillRect(x, wire - 5 + Math.round(Math.sin((((x + off) % gap) / gap) * Math.PI) * 4), 1, 1);
  for (let x = W - off; x > -gap; x -= gap) {
    const px = Math.round(x);
    g.fillStyle = '#3a3e46'; g.fillRect(px, wire - 10, 3, H - wire + 10);
    g.fillStyle = '#5a5e66'; g.fillRect(px + 1, wire - 10, 1, H - wire + 10);
    g.fillStyle = '#3a3e46'; g.fillRect(px - 12, wire - 8, 15, 2); g.fillRect(px - 12, wire - 6, 1, 2);
  }
  if (scenery === 'ice') {
    g.fillStyle = '#ffffff';
    for (let k = 0; k < 60; k++) {
      const x = ((hash(k, 0, 910) * W - s * (80 + hash(k, 2, 912) * 60)) % W + W) % W;
      const y = (hash(k, 1, 911) * H + s * (30 + hash(k, 3, 913) * 20)) % H;
      g.fillRect(Math.round(x), Math.round(y), hash(k, 4, 914) < 0.3 ? 2 : 1, 1);
    }
  }
  if (scenery === 'forest') {
    g.fillStyle = '#2a3a4a';
    for (const k of [0, 1]) {
      const bx = Math.round(((s * 40 + k * 14) % 380) - 30), by = 40 + k * 6 + Math.round(Math.sin(s * 8 + k) * 2);
      g.fillRect(bx, by, 2, 1); g.fillRect(bx + 2, by - 1, 2, 1); g.fillRect(bx + 4, by, 2, 1);
    }
  }
}

/** The metro tunnel. */
function tunnel(g: CanvasRenderingContext2D, s: number) {
  g.fillStyle = '#101218'; g.fillRect(0, 0, W, H);
  const wall = g.createLinearGradient(0, 20, 0, TRACK_Y);
  wall.addColorStop(0, '#1a1d24'); wall.addColorStop(0.5, '#2e323c'); wall.addColorStop(1, '#1c1f26');
  g.fillStyle = wall; g.fillRect(0, 24, W, TRACK_Y - 24);
  // the tunnel's ribs rushing past
  for (let x = -((s * 520) % 64); x < W; x += 64) { g.fillStyle = '#14161c'; g.fillRect(Math.round(x), 24, 6, TRACK_Y - 24); g.fillStyle = '#3a3e48'; g.fillRect(Math.round(x) + 6, 24, 1, TRACK_Y - 24); }
  // cable trays
  g.fillStyle = '#3e424c'; g.fillRect(0, 96, W, 2); g.fillRect(0, 102, W, 1); g.fillStyle = '#5a3a2a'; g.fillRect(0, 99, W, 1);
  // lamps with a warm glow
  for (let x = -((s * 520) % 96); x < W; x += 96) {
    const grd = g.createRadialGradient(x + 5, 40, 1, x + 5, 40, 30);
    grd.addColorStop(0, 'rgba(255,230,160,0.85)'); grd.addColorStop(1, 'rgba(255,230,160,0)');
    g.fillStyle = grd; g.fillRect(x - 26, 12, 62, 60);
    g.fillStyle = '#fff2c0'; g.fillRect(Math.round(x), 38, 10, 3);
  }
  // signals
  for (let x = -((s * 520) % 230); x < W; x += 230) {
    g.fillStyle = '#1a1a1e'; g.fillRect(Math.round(x), 70, 6, 14);
    g.fillStyle = s % 1 < 0.5 ? '#3ae060' : '#1e5a2a'; g.fillRect(Math.round(x) + 1, 72, 4, 4);
    g.fillStyle = '#5a1a1a'; g.fillRect(Math.round(x) + 1, 78, 4, 4);
  }
  g.fillStyle = '#2a2c32'; g.fillRect(0, TRACK_Y - 2, W, 12);
  g.fillStyle = '#3a2a1e';
  for (let x = -((s * 520) % 8); x < W; x += 8) g.fillRect(Math.round(x), TRACK_Y, 5, 5);
  g.fillStyle = '#a8acb4'; g.fillRect(0, TRACK_Y + 1, W, 1); g.fillRect(0, TRACK_Y + 4, W, 1);
}
