/**
 * Undo for one-tap actions that change a language's words (save, remove, mark as mastered, add a whole list…).
 * The action runs right away; a toast offers "Undo" for a few seconds. Undo puts back only what the action changed
 * (each word's card, saved record, sentence card, known levels and the XP it gave), so anything done in between stays.
 */
import type { LangId } from '../content/types';
import { commit, lang, state, type LangState } from './store';
import { toast } from '../ui/toast';
import { today } from './util';

/** Above this many words a bulk action asks first. */
export const CONFIRM_MANY = 25;

const MAPS = ['cards', 'extra', 'seen', 'sents'] as const;
type Snap = { maps: Record<string, Record<string, unknown> | undefined>; known?: number[]; xp: number; dayXp: number };

const snap = (ls: LangState): Snap => structuredClone({
  maps: Object.fromEntries(MAPS.map((k) => [k, ls[k] as Record<string, unknown> | undefined])),
  known: ls.known, xp: ls.xp, dayXp: state.days[today()]?.[0] ?? 0,
});
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Runs `action` and shows `message` (or message(result); null/'' = no toast) with an Undo button when anything changed.
 * Returns the action's result.
 */
export function undoable<T>(l: LangId, action: () => T, message: string | ((r: T) => string | null)): T {
  const ls = lang(l);
  const before = snap(ls);
  const r = action();
  const after = snap(ls);
  const text = typeof message === 'function' ? message(r) : message;
  const changed = MAPS.some((k) => !same(before.maps[k], after.maps[k])) || !same(before.known, after.known);
  if (!text) return r;
  if (!changed) { toast(text); return r; }
  toast(text, 'info', { label: 'Undo', run: () => {
    const now = lang(l);
    for (const k of MAPS) {
      const b = before.maps[k] || {}, a = after.maps[k] || {};
      for (const id of new Set([...Object.keys(b), ...Object.keys(a)])) {
        if (same(b[id], a[id])) continue;
        const m = ((now as unknown as Record<string, Record<string, unknown>>)[k] ||= {});
        if (id in b) m[id] = structuredClone(b[id]); else delete m[id];
      }
    }
    if (!same(before.known, after.known)) { if (before.known?.length) now.known = before.known; else delete now.known; }
    // XP the action gave goes back too
    const gained = after.xp - before.xp;
    if (gained > 0) {
      now.xp = Math.max(0, now.xp - gained);
      const day = state.days[today()];
      if (day) day[0] = Math.max(0, day[0] - (after.dayXp - before.dayXp));
    }
    commit();
    toast('Undone');
  } });
  return r;
}

/** Asks before a bulk action on many words; returns whether to go on. */
export function confirmMany(n: number, what: string): boolean {
  return n <= CONFIRM_MANY || confirm(`${what}?\n\nThis adds ${n} words to your collection at once; they will all come up for review. You can undo it right after.`);
}
