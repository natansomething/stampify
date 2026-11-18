/**
 * Texts saved from Analyse sentences & captions, kept on this device only (IndexedDB, not synced, not in backups):
 * the text as typed or read, a title, and where the learner left off.
 */
import type { LangId } from '../content/types';
import { idbGet, idbSet } from './store';

export interface SavedText {
  id: string;
  lang: LangId;
  title: string;
  text: string;
  /** The sentence the learner was at (0-based) and the number of sentences then. */
  pos: number;
  len: number;
  added: number;
  /** Last opened or read (ms). */
  seen: number;
}

const LIST = 'analyse:items';

async function all(): Promise<SavedText[]> {
  return (await idbGet<SavedText[]>(LIST)) || [];
}

/** The saved texts of one language, most recently read first. */
export async function listTexts(lang: LangId): Promise<SavedText[]> {
  try { return (await all()).filter((x) => x.lang === lang).sort((a, b) => b.seen - a.seen); } catch { return []; }
}

/** Adds or updates a text (by id); false when storage is blocked. */
export async function saveText(item: SavedText): Promise<boolean> {
  try {
    const list = await all();
    const k = list.findIndex((x) => x.id === item.id);
    if (k >= 0) list[k] = item; else list.push(item);
    await idbSet(LIST, list);
    return true;
  } catch {
    return false;
  }
}

export async function removeText(id: string): Promise<void> {
  try { await idbSet(LIST, (await all()).filter((x) => x.id !== id)); } catch { /* storage blocked */ }
}

/** A title from the text's first line. */
export function defaultTitle(text: string): string {
  const first = text.trim().split('\n')[0].trim();
  return first.length > 48 ? first.slice(0, 45).trimEnd() + '…' : first || 'Untitled';
}
