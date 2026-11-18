/**
 * The part of the shared screen that live reading reads (as fractions of the frame): picked from presets or drawn by
 * the learner, on the page or in its own window. Remembered on this device.
 */
import { useEffect, useState } from 'preact/hooks';

export interface Rect { x: number; y: number; w: number; h: number }

export const PRESETS: { id: string; name: string; hint: string; r: Rect }[] = [
  { id: 'full', name: 'Full-screen video', hint: 'The bottom 40%, without the sides', r: { x: 0.15, y: 0.6, w: 0.7, h: 0.4 } },
  { id: 'wide', name: 'Whole bottom', hint: 'The bottom 40%, edge to edge', r: { x: 0, y: 0.6, w: 1, h: 0.4 } },
];

const KEY = 'stampify.liveArea';

function load(): Rect {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (r && [r.x, r.y, r.w, r.h].every((v) => typeof v === 'number' && v >= 0 && v <= 1) && r.w > 0.02 && r.h > 0.02) return r;
  } catch { /* storage blocked */ }
  return PRESETS[0].r;
}

let current: Rect = load();
const listeners = new Set<(r: Rect) => void>();

export const getArea = () => current;

/** Sets the area (`keep`: remember it for next time; not while a box is still being dragged). */
export function setArea(r: Rect, keep = true) {
  current = r;
  if (keep) try { localStorage.setItem(KEY, JSON.stringify(r)); } catch { /* storage blocked */ }
  listeners.forEach((f) => f(r));
}

/** The area, kept up to date in any window that shows it. */
export function useArea(): Rect {
  const [r, set] = useState(current);
  useEffect(() => { listeners.add(set); set(current); return () => { listeners.delete(set); }; }, []);
  return r;
}

/** The preset the area is, if any. */
export const presetOf = (r: Rect) => PRESETS.find((p) => (['x', 'y', 'w', 'h'] as const).every((k) => Math.abs(p.r[k] - r[k]) < 0.005));
