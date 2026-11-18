/**
 * Watch's library, kept on this device only (IndexedDB, not synced, not in backups): each video with its subtitles,
 * where the learner left off and the subtitle timing. Video files are stored as well when there is room, so they
 * don't have to be picked again.
 */
import type { LangId } from '../content/types';
import { idbGet, idbSet } from './store';

export interface WatchItem {
  /** "yt:<video id>" or "file:<name>:<size>". */
  id: string;
  lang: LangId;
  kind: 'youtube' | 'file';
  /** The YouTube video id, or the file's name. */
  video: string;
  title: string;
  /** The subtitles as given (file or pasted transcript), and the subtitle file's name. */
  subs: string;
  subsName?: string;
  /** Where the learner left off and the video's length (seconds). */
  pos: number;
  dur: number;
  /** Subtitle timing (seconds; positive: later). */
  offset: number;
  added: number;
  /** Last watched (ms). */
  seen: number;
  /** The video file is stored too. */
  stored?: boolean;
}

const LIST = 'watch:items';
const blobKey = (id: string) => `watch:file:${id}`;

export async function listItems(): Promise<WatchItem[]> {
  try { return ((await idbGet<WatchItem[]>(LIST)) || []).sort((a, b) => b.seen - a.seen); } catch { return []; }
}

/** Adds or updates an item (by id). */
export async function saveItem(item: WatchItem): Promise<void> {
  try {
    const all = (await idbGet<WatchItem[]>(LIST)) || [];
    const k = all.findIndex((x) => x.id === item.id);
    if (k >= 0) all[k] = item; else all.push(item);
    await idbSet(LIST, all);
  } catch { /* storage blocked: watching still works, it just isn't remembered */ }
}

/** Records whether an item's video file is stored (without touching the rest, which may have moved on meanwhile). */
export async function markStored(id: string, stored: boolean): Promise<void> {
  try {
    const all = (await idbGet<WatchItem[]>(LIST)) || [];
    const it = all.find((x) => x.id === id);
    if (it) { it.stored = stored; await idbSet(LIST, all); }
  } catch { /* storage blocked */ }
}

export async function removeItem(id: string): Promise<void> {
  try {
    await idbSet(LIST, ((await idbGet<WatchItem[]>(LIST)) || []).filter((x) => x.id !== id));
    await idbSet(blobKey(id), null);
  } catch { /* storage blocked */ }
}

/** Keeps a video file on the device; false when there isn't room (or storage is blocked). */
export async function storeFile(id: string, file: Blob): Promise<boolean> {
  try {
    const est = await navigator.storage?.estimate?.();
    if (est?.quota && est.usage !== undefined && est.quota - est.usage < file.size * 1.1) return false;
    await idbSet(blobKey(id), file);
    return true;
  } catch {
    return false;
  }
}

export async function loadFile(id: string): Promise<Blob | null> {
  try { return (await idbGet<Blob>(blobKey(id))) || null; } catch { return null; }
}
