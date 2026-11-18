/**
 * Live reading's frame analysis (extractSubtitles) off the page's main thread, so the page and the floating window
 * stay smooth while every frame is searched for subtitles.
 */
import { extractSubtitles } from './subtitles';

self.onmessage = (e: MessageEvent<{ id: number; img: ImageData; boxesOnly: boolean }>) => {
  const { id, img, boxesOnly } = e.data;
  const ex = extractSubtitles(img, { boxesOnly });
  (self as unknown as Worker).postMessage({ id, ex }, ex.lines.map((x) => x.img.data.buffer));
};
