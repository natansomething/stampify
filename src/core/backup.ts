/**
 * Backups: the user state as JSON, gzipped with the browser's CompressionStream.
 * Only progress is saved (ids, boxes, days), never content, so files stay small (tens of KB).
 */
import { commit, migrate, replaceState, state, type UserState } from './store';

const MAGIC = 'lingosystem';

async function gzip(text: string): Promise<Blob> {
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
  return new Response(stream).blob();
}

async function gunzip(blob: Blob): Promise<string> {
  const stream = blob.stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(stream).text();
}

export async function exportBackup(): Promise<{ size: number }> {
  const json = JSON.stringify({ app: MAGIC, at: Date.now(), state });
  const blob = typeof CompressionStream !== 'undefined' ? await gzip(json) : new Blob([json], { type: 'application/json' });
  const d = new Date();
  const name = `stampify-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}.lingo`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  state.settings.backedUp = Date.now();
  commit();
  return { size: blob.size };
}

/** Accepts gzipped backups and plain JSON. Throws with a readable message on bad files. */
export async function importBackup(file: File): Promise<void> {
  const head = new Uint8Array(await file.slice(0, 2).arrayBuffer());
  const text = head[0] === 0x1f && head[1] === 0x8b ? await gunzip(file) : await file.text();
  let data: { app?: string; state?: UserState };
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('This file is not a Stampify backup.');
  }
  if (data.app !== MAGIC || !data.state) throw new Error('This file is not a Stampify backup.');
  replaceState(migrate(data.state));
}
