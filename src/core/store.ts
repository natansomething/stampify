/**
 * User state: the only data that is saved (IndexedDB) and backed up. Content is never stored here, only ids.
 * Records are arrays rather than objects to keep backups small.
 */
import { useEffect, useState } from 'preact/hooks';
import type { LangId } from '../content/types';
import type { Band } from './langs';

/**
 * [box (words 0-8, sentences 0-4; the top box is mastered, never due), due time in ms, reviews, added day, last day the box went up (review or game)].
 * Cards saved before the due time was in ms hold a day number there and boxes 0-7; `migrateCard` converts them.
 */
export type Card = [number, number, number, number, number?];

/** Local midnight (ms) of a day number from `today()`. */
export function dayStart(d: number): number {
  const x = new Date(d * 86400000);
  return new Date(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate()).getTime();
}

/** Old boxes (intervals 0, 1, 2, 4, 7, 14, 30, 60 days) -> the closest word box (0, 1 h, 1, 3, 7, 14, 60, 180 days). */
const OLD_WORD_BOX = [0, 2, 3, 3, 4, 5, 6, 7];
/** The same old boxes -> the closest sentence box (0, 2, 7, 30 days); known sentences stay known (box 3). */
const OLD_SENT_BOX = [0, 1, 1, 1, 2, 3, 3, 3];
/** Word-scale boxes 5-8 on a sentence (saved by the version that shared the word scale) -> sentence boxes. */
const WORD_TO_SENT_BOX: Record<number, number> = { 5: 3, 6: 3, 7: 3, 8: 4 };

/** Converts a card saved with a due day (a small number) to a due time in ms, keeping its due date. */
function migrateCard(c: Card, sentence: boolean) {
  if (c[1] < 1e9) {
    c[0] = (sentence ? OLD_SENT_BOX : OLD_WORD_BOX)[c[0]] ?? 0;
    c[1] = dayStart(c[1]);
  } else if (sentence && c[0] > 4) c[0] = WORD_TO_SENT_BOX[c[0]] ?? 4;
}

/** Converts the cards of a whole saved state in place (also used on the sync base). */
export function migrateCards(s: Pick<UserState, 'langs'>) {
  for (const l of Object.values(s.langs || {})) {
    for (const m of [l?.cards, l?.seen]) for (const c of Object.values(m || {})) migrateCard(c, false);
    for (const c of Object.values(l?.sents || {})) migrateCard(c, true);
  }
}


/** A collected word that is not in the vocabulary file (saved from a text): [word, reading, meaning, level]. */
export type Extra = [string, string, string, number];

export interface LangState {
  band: Band;
  /** Where games take their words from: the level pool or the user's collection. */
  src: 'pool' | 'mine';
  /** Collection: word id -> card. */
  cards: Record<string, Card>;
  extra: Record<string, Extra>;
  /** Ids of finished texts. */
  read: string[];
  /** How far the learner got in a text or dialogue (id -> sentences read / turns answered); drives progress bars. */
  prog: Record<string, number>;
  /** Total XP earned in this language. */
  xp: number;
  /** Best scores per game id (timed games that call finish with a score). */
  best: Record<string, number>;
  /**
   * Fixed items the games repeat like flashcards: sentence ids, and generated questions ("odd:…" for Odd one out).
   */
  sents?: Record<string, Card>;
  /** Guidebook lessons: id -> [day the lesson was read, best exercise score in %] (-1: not practised yet). */
  guide?: Record<string, [number, number]>;
  /** Progress of words met in games but not saved; a word keeps its card when it is saved. */
  seen?: Record<string, Card>;
  /** Activities played, most recent first: game id, or "game/arg" (a drill deck, a dialogue, a word to write). */
  played?: string[];
  /**
   * Levels the learner already knows: their words count as mastered (never due) without changing their cards, so
   * unmarking a level brings every word back exactly as it was.
   */
  known?: number[];
}

export interface Settings {
  goal: number;
  theme: 'auto' | 'light' | 'dark';
  rate: number;
  autoplay: boolean;
  showReading: boolean;
  /** Show grammar notes in the reader. */
  grammarNotes?: boolean;
  /** Heat map in the reader and Find words: words coloured by how well they are known (off by default). */
  heatmap?: boolean;
  /** Live subtitle reading opens the floating window by itself (on unless switched off). */
  floating?: boolean;
  sound: boolean;
  voice: Partial<Record<LangId, string>>;
  lang?: LangId;
  /** Languages by last visit, most recent first. */
  recent?: LangId[];
  /** Listen and pick: type the word instead of choosing its meaning (double XP). */
  listenType: boolean;
  /** Last backup time (ms), to remind people who never back up. */
  backedUp?: number;
}

export interface UserState {
  v: 1;
  settings: Settings;
  /** Day number -> [xp earned that day, 1 if the daily goal was reached]. */
  days: Record<number, [number, number]>;
  langs: Partial<Record<LangId, LangState>>;
}

export const DEFAULT_SETTINGS: Settings = {
  goal: 50, theme: 'auto', rate: 0.9, autoplay: true, showReading: true, sound: true, listenType: false, voice: {},
};

export function newLang(): LangState {
  return { band: 1, src: 'pool', cards: {}, extra: {}, read: [], prog: {}, xp: 0, best: {} };
}

function fresh(): UserState {
  return { v: 1, settings: { ...DEFAULT_SETTINGS }, days: {}, langs: {} };
}

export let state: UserState = fresh();

// ---- persistence (IndexedDB, one record) ----

const DB = 'lingosystem';
const STORE = 'kv';
const KEY = 'state';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function idbGet<T>(key: string): Promise<T | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE).objectStore(STORE).get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

export async function idbSet(key: string, value: unknown): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Fills in fields added after a state was saved, so old saves and backups keep working. */
export function migrate(raw: Partial<UserState> | undefined): UserState {
  const s = fresh();
  if (!raw || typeof raw !== 'object') return s;
  s.settings = { ...DEFAULT_SETTINGS, ...(raw.settings || {}), voice: { ...(raw.settings?.voice || {}) } };
  s.days = raw.days || {};
  for (const [id, l] of Object.entries(raw.langs || {})) s.langs[id as LangId] = { ...newLang(), ...l };
  migrateCards(s);
  return s;
}

export async function loadState(): Promise<void> {
  try {
    state = migrate(await idbGet<UserState>(KEY));
  } catch {
    state = fresh(); // private mode / blocked storage: the app still runs, progress just isn't kept
  }
  // Ask the browser not to evict our data (granted automatically for installed apps in most browsers).
  navigator.storage?.persist?.().catch(() => {});
}

// Every open copy of the app (tabs, the installed app) keeps the whole state in memory and saves all of it, so a
// copy must never save what it hasn't changed (it would overwrite another copy's progress), and reloads the saved
// state when another copy saves or when it comes back to the foreground.
const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(DB) : null;
let timer: number | undefined;
let dirty = false;

/** Writes pending changes now (normally they are written 0.3 s after the last change). */
export function save() {
  clearTimeout(timer);
  if (!dirty) return;
  dirty = false;
  idbSet(KEY, state).then(() => channel?.postMessage('saved')).catch(() => {});
}

function persist() {
  dirty = true;
  clearTimeout(timer);
  timer = window.setTimeout(save, 300);
}

async function reload() {
  if (dirty) return;
  try {
    const saved = await idbGet<UserState>(KEY);
    if (!saved || dirty) return;
    state = migrate(saved);
    listeners.forEach((l) => l());
  } catch { /* keep what is in memory */ }
}

window.addEventListener('pagehide', save);
document.addEventListener('visibilitychange', () => (document.hidden ? save() : reload()));
if (channel) channel.onmessage = reload;

// ---- change notification ----

const listeners = new Set<() => void>();

/** Set by sync.ts (which imports this module, so it can't be imported here). */
export const hooks = {
  /** The learner changed something. */
  onCommit: () => {},
  /** The whole state was replaced (backup loaded, reset): the account copy should be replaced too, not merged. */
  onReplace: () => {},
};

/** Call after every mutation: saves and re-renders subscribed components. */
export function commit() {
  persist();
  listeners.forEach((l) => l());
  hooks.onCommit();
}

export function replaceState(s: UserState) {
  state = s;
  hooks.onReplace();
  commit();
}

/** Progress merged in from the account: saved and shown, without counting as a new change to sync. */
export function applySynced(s: UserState) {
  state = s;
  persist();
  listeners.forEach((l) => l());
}

/** Re-render subscribed components without saving (nothing in the state changed). */
export function rerender() {
  listeners.forEach((l) => l());
}

/** Re-render the component whenever the state changes. */
export function useStore(): UserState {
  const [, set] = useState(0);
  useEffect(() => {
    const l = () => set((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return state;
}

export function lang(id: LangId): LangState {
  return (state.langs[id] ||= newLang());
}
