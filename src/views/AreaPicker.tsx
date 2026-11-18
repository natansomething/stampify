/**
 * Choosing the part of the shared screen live reading reads: the shared screen, live, with the area on it; a preset,
 * or a box dragged over the subtitles. Shown on the page and, larger, in a window of its own (opened from the
 * floating window).
 */
import { useEffect, useRef } from 'preact/hooks';
import { getArea, PRESETS, presetOf, setArea, useArea, type Rect } from '../core/liveArea';
import { cls } from '../core/util';
import { Icon } from '../ui/icons';

export function AreaPicker({ stream }: { stream: MediaStream }) {
  const r = useArea();
  const video = useRef<HTMLVideoElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  /** The area before the drag: a click without dragging keeps it. */
  const before = useRef<Rect>(r);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.srcObject = stream;
    v.play().catch(() => {});
  }, [stream]);

  const point = (e: PointerEvent) => {
    const b = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return { x: Math.min(1, Math.max(0, (e.clientX - b.left) / b.width)), y: Math.min(1, Math.max(0, (e.clientY - b.top) / b.height)) };
  };
  const onDown = (e: PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = point(e);
    before.current = getArea();
  };
  const onMove = (e: PointerEvent) => {
    const s = drag.current;
    if (!s) return;
    const q = point(e);
    setArea({ x: Math.min(s.x, q.x), y: Math.min(s.y, q.y), w: Math.abs(q.x - s.x), h: Math.abs(q.y - s.y) }, false);
  };
  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    const now = getArea();
    setArea(now.w > 0.02 && now.h > 0.02 ? now : before.current);
  };

  const on = presetOf(r);
  return (
    <div class="stack area-picker" style={{ gap: 8 }}>
      <div class="seg area-presets" role="radiogroup" aria-label="Subtitle area">
        {PRESETS.map((p) => (
          <button key={p.id} role="radio" aria-checked={on === p} class={cls(on === p && 'on')} title={p.hint} onClick={() => setArea(p.r)}>{p.name}</button>
        ))}
        <button role="radio" aria-checked={!on} class={cls(!on && 'on')} disabled title="Drag a box over the subtitles on the picture">
          <Icon name="target" size={14} />Your own
        </button>
      </div>
      <div class="live-frame" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}>
        <video ref={video} muted playsInline />
        <div class="live-rect" style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.w * 100}%`, height: `${r.h * 100}%` }} />
      </div>
      <p class="small muted">Pick a preset, or drag a box over the subtitles on the picture.</p>
    </div>
  );
}
