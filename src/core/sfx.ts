/** Tiny synthesised sound effects (no audio files). Muted by the "Sound effects" setting. */
import { state } from './store';

let ctx: AudioContext | undefined;

type Fx = 'ok' | 'bad' | 'goal' | 'tap' | 'end';

const NOTES: Record<Fx, [number, number][]> = {
  ok: [[660, 0], [990, 0.07]],
  bad: [[220, 0], [180, 0.09]],
  tap: [[520, 0]],
  end: [[523, 0], [659, 0.1], [784, 0.2], [1046, 0.3]],
  goal: [[784, 0], [988, 0.1], [1175, 0.2], [1568, 0.32]],
};

export function sfx(kind: Fx) {
  if (!state.settings.sound) return;
  try {
    ctx ||= new AudioContext();
    const t0 = ctx.currentTime;
    for (const [freq, at] of NOTES[kind]) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = kind === 'bad' ? 'triangle' : 'sine';
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t0 + at);
      g.gain.exponentialRampToValueAtTime(0.12, t0 + at + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + 0.16);
      o.connect(g).connect(ctx.destination);
      o.start(t0 + at);
      o.stop(t0 + at + 0.18);
    }
  } catch {
    /* audio not available */
  }
}
