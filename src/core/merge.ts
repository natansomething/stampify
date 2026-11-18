/**
 * Merging two copies of the progress (this device and the account), so studying on two devices loses nothing.
 *
 * Three-way: `base` is the copy both sides last agreed on (the last sync). Whatever only one side changed since then
 * is taken from that side, including deletions (a word removed from the collection stays removed). When both changed
 * the same thing: word and sentence cards keep the one with more reviews, progress and best scores keep the higher
 * value, and XP counters add up what each side earned since the base.
 * Without a base (a device that already had progress signs in to an account that has some too) both are combined:
 * union of everything, XP and days take the higher value (never added, so the same history counted twice doesn't
 * double), and the account's choice wins for simple settings.
 */
import type { LangId } from '../content/types';
import { newLang, type Card, type LangState, type Settings, type UserState } from './store';

/** The synced part of the state: device-only settings (installed voices, last backup on this device) stay local. */
export type SyncData = UserState;

const DEVICE_ONLY: (keyof Settings)[] = ['voice', 'backedUp'];

export function toSync(s: UserState): SyncData {
  const c = structuredClone(s);
  for (const k of DEVICE_ONLY) delete c.settings[k];
  return c;
}

/** Puts this device's own settings back onto synced data. */
export function withDevice(d: SyncData, device: UserState): UserState {
  const s = structuredClone(d);
  s.settings.voice = { ...(device.settings.voice || {}) };
  if (device.settings.backedUp) s.settings.backedUp = device.settings.backedUp;
  else delete s.settings.backedUp;
  return s;
}

/** JSON with sorted keys, so equal data compares equal whatever the key order. */
export function canon(x: unknown): string {
  return JSON.stringify(x, (_k, v) =>
    v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) : v);
}

export const same = (a: unknown, b: unknown) => a === b || canon(a) === canon(b);

/** One value: the side that changed wins; if both did, `both` decides (default: local). */
function pick<T>(b: T | undefined, l: T | undefined, r: T | undefined, both: (l: T, r: T) => T | undefined = (l) => l): T | undefined {
  if (same(l, r)) return l;
  if (same(l, b)) return r;
  if (same(r, b)) return l;
  // Both changed: one deleted it and the other changed it -> keep the change
  if (l === undefined) return r;
  if (r === undefined) return l;
  return both(l, r);
}

function mergeMap<T>(
  b: Record<string, T> | undefined, l: Record<string, T> | undefined, r: Record<string, T> | undefined,
  both?: (l: T, r: T) => T | undefined,
): Record<string, T> {
  const out: Record<string, T> = {};
  for (const k of new Set([...Object.keys(l || {}), ...Object.keys(r || {})])) {
    const v = pick(b?.[k], l?.[k], r?.[k], both);
    if (v !== undefined) out[k] = structuredClone(v);
  }
  return out;
}

/** Sets kept as arrays: everything either side has, minus what one side removed since the base. */
function mergeSet<T>(b: T[] | undefined, l: T[] | undefined, r: T[] | undefined): T[] {
  const B = new Set(b || []);
  const L = new Set(l || []);
  const R = new Set(r || []);
  const out: T[] = [];
  for (const x of [...(l || []), ...(r || [])]) {
    if (out.includes(x)) continue;
    const removed = B.has(x) && (!L.has(x) || !R.has(x));
    if (!removed) out.push(x);
  }
  return out;
}

/** "Most recent first" lists: the side that changed wins; if both did, local's order then the rest. */
function mergeRecent<T>(b: T[] | undefined, l: T[] | undefined, r: T[] | undefined, max = 50): T[] | undefined {
  const v = pick(b, l, r, (l, r) => [...l, ...r.filter((x) => !l.includes(x))]);
  return v?.slice(0, max);
}

/** XP-like counters: with a base, each side's gain since the base adds up; without one, the higher value. */
function counter(b: number | undefined, l: number, r: number, hasBase: boolean): number {
  if (!hasBase) return Math.max(l, r);
  return Math.max(0, r + (l - (b || 0)));
}

/** The card that has seen more practice. */
function betterCard(l: Card, r: Card): Card {
  if (l[2] !== r[2]) return l[2] > r[2] ? l : r;
  if ((l[4] || 0) !== (r[4] || 0)) return (l[4] || 0) > (r[4] || 0) ? l : r;
  return l[0] >= r[0] ? l : r;
}

const max = (l: number, r: number) => Math.max(l, r);

function mergeLang(b: LangState | undefined, l: LangState | undefined, r: LangState | undefined, hasBase: boolean): LangState {
  if (!l) return structuredClone(r!);
  if (!r) return structuredClone(l);
  const base = b || newLang();
  const out: LangState = {
    band: pick(b?.band, l.band, r.band, hasBase ? undefined : (_l, r) => r)!,
    src: pick(b?.src, l.src, r.src, hasBase ? undefined : (_l, r) => r)!,
    cards: mergeMap(b?.cards, l.cards, r.cards, betterCard),
    extra: mergeMap(b?.extra, l.extra, r.extra),
    read: mergeSet(b?.read, l.read, r.read),
    prog: mergeMap(b?.prog, l.prog, r.prog, max),
    xp: counter(base.xp, l.xp, r.xp, hasBase),
    best: mergeMap(b?.best, l.best, r.best, max),
  };
  if (l.sents || r.sents) out.sents = mergeMap(b?.sents, l.sents, r.sents, betterCard);
  if (l.guide || r.guide) out.guide = mergeMap(b?.guide, l.guide, r.guide, (x, y) => [max(x[0], y[0]), max(x[1], y[1])]);
  if (l.seen || r.seen) out.seen = mergeMap(b?.seen, l.seen, r.seen, betterCard);
  const known = pick(b?.known, l.known, r.known, hasBase ? undefined : (_l, r) => r);
  if (known) out.known = structuredClone(known);
  const played = mergeRecent(b?.played, l.played, r.played, 12);
  if (played) out.played = played;
  // A word saved on one device while still practised unsaved on the other: it is saved, with the better card
  for (const [id, c] of Object.entries(out.seen || {})) {
    if (!out.cards[id]) continue;
    out.cards[id] = structuredClone(betterCard(out.cards[id], c));
    delete out.seen![id];
  }
  return out;
}

function mergeSettings(b: Settings | undefined, l: Settings, r: Settings, hasBase: boolean): Settings {
  const out = {} as Record<string, unknown>;
  const keys = new Set([...Object.keys(l), ...Object.keys(r)] as (keyof Settings)[]);
  for (const k of keys) {
    if (DEVICE_ONLY.includes(k)) continue;
    const v = k === 'recent'
      ? mergeRecent(b?.recent, l.recent, r.recent)
      : pick<unknown>(b?.[k], l[k], r[k], hasBase ? undefined : (_l, r) => r);
    if (v !== undefined) out[k] = structuredClone(v);
  }
  return out as unknown as Settings;
}

export function merge(base: SyncData | null, local: SyncData, remote: SyncData): SyncData {
  const hasBase = !!base;
  const settings = mergeSettings(base?.settings, local.settings, remote.settings, hasBase);
  const days: UserState['days'] = {};
  for (const k of new Set([...Object.keys(local.days), ...Object.keys(remote.days)])) {
    const d = +k;
    const l = local.days[d] || [0, 0];
    const r = remote.days[d] || [0, 0];
    const xp = counter(base?.days[d]?.[0], l[0], r[0], hasBase);
    // Two devices that each fell short of the goal on the same day can reach it together
    // (only when the merge itself added XP: old days are not re-judged against today's goal)
    const met = l[1] || r[1] || (xp > Math.max(l[0], r[0]) && xp >= settings.goal ? 1 : 0);
    days[d] = [xp, met];
  }
  const langs: UserState['langs'] = {};
  for (const id of new Set([...Object.keys(local.langs), ...Object.keys(remote.langs)]) as Set<LangId>) {
    const b = base?.langs[id], l = local.langs[id], r = remote.langs[id];
    // A language one side removed (Settings → Your languages) stays removed, unless the other side studied it since
    if (b && (!l || !r) && canon(l || r) === canon(b)) continue;
    langs[id] = mergeLang(b, l, r, hasBase);
  }
  return { v: 1, settings, days, langs };
}
