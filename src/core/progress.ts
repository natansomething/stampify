/** Spaced repetition, XP, daily goal and streak. */
import type { LangId } from '../content/types';
import { commit, dayStart, lang, rerender, state, type Card, type LangState } from './store';
import { today } from './util';
import { toast } from '../ui/toast';
import { sfx } from './sfx';

// ---- spaced repetition (Leitner boxes) ----

const HOUR = 3600000;
const DAY = 24 * HOUR;

/** A spaced-repetition scale: the wait after each box (ms); the box after the last one is "mastered" (never due). */
export interface Scale { intervals: number[]; known: number }

/** Words (reviews and word games). Box 0 comes back at the end of the session. */
export const WORDS: Scale = { intervals: [0, HOUR, DAY, 3 * DAY, 7 * DAY, 14 * DAY, 60 * DAY, 180 * DAY], known: 5 };
/** Sentences (sentence games). */
export const SENTENCES: Scale = { intervals: [0, 2 * DAY, 7 * DAY, 30 * DAY], known: 3 };

/** The mastered box of a scale: such a card never comes back unless a game gets it wrong. */
export const masteredBox = (s: Scale = WORDS) => s.intervals.length;
export const MASTERED = masteredBox(WORDS);
export const MAX_BOX = MASTERED;
/** A word counts as known from this box on. */
export const KNOWN_BOX = WORDS.known;

export type Grade = 0 | 1 | 2 | 3; // again, good, easy, mastered

/** When a card in this box is due: within the day for short intervals, else at the start of the day it falls on. */
export function dueAt(box: number, s: Scale = WORDS, now = Date.now()): number {
  const ms = s.intervals[Math.min(box, s.intervals.length - 1)];
  return ms < DAY ? now + ms : dayStart(today() + Math.round(ms / DAY));
}

export const isMastered = (c: Card, s: Scale = WORDS) => c[0] >= masteredBox(s);
/** Never reviewed yet. A word marked mastered from a list has no reviews either, but it is mastered, not new. */
export const isNew = (c: Card, s: Scale = WORDS) => c[2] === 0 && !isMastered(c, s);
/** Due for repetition now (mastered cards never are). */
export const dueNow = (c: Card, s: Scale = WORDS) => !isMastered(c, s) && c[1] <= Date.now();
export const isDue = (c: Card, s: Scale = WORDS) => c[2] > 0 && dueNow(c, s);
export const isKnown = (c: Card, s: Scale = WORDS) => c[0] >= s.known;

export function inCollection(l: LangId, id: string): boolean {
  return !!state.langs[l]?.cards[id];
}

const newCard = (): Card => [0, Date.now(), 0, today()];

/** A new card, or the progress the word already made in games before it was saved. */
function cardFor(ls: ReturnType<typeof lang>, id: string): Card {
  const c = ls.seen?.[id];
  if (!c) return newCard();
  delete ls.seen![id];
  return c;
}

export function addWord(l: LangId, id: string): boolean {
  const ls = lang(l);
  if (ls.cards[id]) return false;
  ls.cards[id] = cardFor(ls, id);
  commit();
  return true;
}

export function addWords(l: LangId, ids: string[]): number {
  const ls = lang(l);
  let n = 0;
  for (const id of ids) if (!ls.cards[id]) { ls.cards[id] = cardFor(ls, id); n++; }
  if (n) commit();
  return n;
}

export function removeWord(l: LangId, id: string) {
  const ls = lang(l);
  // What the learner has learnt stays: the word's progress goes back to the unsaved words
  if (ls.cards[id]?.[2]) (ls.seen ||= {})[id] = ls.cards[id];
  delete ls.cards[id];
  delete ls.extra[id];
  commit();
}

export function nextBox(c: Card, g: Grade, s: Scale = WORDS): number {
  if (g === 0) return 0;
  if (g === 3) return masteredBox(s);
  return Math.min(masteredBox(s), Math.max(1, c[0] + g));
}

/** Applies a grade to a card: its new box, when it is due, one more review. */
function apply(c: Card, g: Grade, s: Scale) {
  c[0] = nextBox(c, g, s);
  c[1] = g === 0 ? Date.now() : dueAt(c[0], s);
  c[2]++;
  if (g > 0) c[4] = today();
}

/** A flashcard review. */
export function grade(l: LangId, id: string, g: Grade) {
  const c = lang(l).cards[id];
  if (!c) return;
  apply(c, g, WORDS);
  commit();
}

/**
 * An answer in a game, which is another way to review: a right answer counts as "good" when the card is due or new,
 * and changes nothing otherwise (practice ahead of time doesn't push the schedule); a wrong one counts as "again".
 */
function answer(c: Card, ok: boolean, s: Scale) {
  if (!ok) apply(c, 0, s);
  else if (isNew(c, s) || dueNow(c, s)) apply(c, 1, s);
}

/** A word's card, saved or tracked from games; created (unsaved) if the word has none yet. */
function trackWord(l: LangId, id: string): Card {
  const ls = lang(l);
  return ls.cards[id] ?? ((ls.seen ||= {})[id] ||= newCard());
}

/** A right answer about a word in a game (saved or not: unsaved words keep their progress until they are saved). */
export function practiced(l: LangId, id: string | undefined) {
  if (!id) return;
  answer(trackWord(l, id), true, WORDS);
  commit();
}

/** A wrong answer about a word in a game: back to box 0, due again now. */
export function lapse(l: LangId, id: string | undefined) {
  if (!id) return;
  answer(trackWord(l, id), false, WORDS);
  commit();
}

/** A word's card: saved, or tracked from games; mastered while its level is marked as known (see effCard). */
export const wordCard = (l: LangId, id: string): Card | undefined => effCard(l, id, state.langs[l]?.cards[id] ?? state.langs[l]?.seen?.[id]);

// ---- levels the learner already knows ----

/** Word id -> level, per language, filled when its word list is loaded (lexicon.ts). */
const levelsOf = new Map<LangId, Map<string, number>>();
const loading = new Set<LangId>();

export function registerLevels(l: LangId, vocab: { id: string; lv: number }[]) {
  levelsOf.set(l, new Map(vocab.map((e) => [e.id, e.lv])));
}

/** Loads a language's word list in the background when levels are marked as known but the levels aren't known yet. */
function needLevels(l: LangId) {
  if (levelsOf.has(l) || loading.has(l)) return;
  loading.add(l);
  Promise.all([import('../content/index'), import('./lexicon')])
    .then(([ci, lx]) => ci.loadContent(l).then((c) => { lx.lexicon(l, c); rerender(); }))
    .catch(() => loading.delete(l));
}

export const knownLevels = (l: LangId): number[] => state.langs[l]?.known || [];

/** The word belongs to a level the learner marked as known. */
export function levelMastered(l: LangId, id: string): boolean {
  const k = state.langs[l]?.known;
  if (!k?.length) return false;
  const lv = levelsOf.get(l)?.get(id) ?? state.langs[l]?.extra[id]?.[3];
  if (lv === undefined) needLevels(l);
  return lv !== undefined && k.includes(lv);
}

/**
 * A word's card as the app uses it: while the word's level is marked as known it is mastered; the stored card is not
 * changed. A word without a card gets a mastered one too.
 */
export function effCard(l: LangId, id: string, c: Card | undefined): Card | undefined {
  if (!levelMastered(l, id)) return c;
  return [MASTERED, c?.[1] ?? Date.now(), c?.[2] ?? 0, c?.[3] ?? today(), c?.[4]];
}

/** Marks or unmarks a whole level as known. */
export function setLevelKnown(l: LangId, lv: number, on: boolean) {
  const ls = lang(l);
  const k = new Set(ls.known || []);
  if (on) k.add(lv); else k.delete(lv);
  if (k.size) ls.known = [...k].sort((a, b) => a - b); else delete ls.known;
  commit();
}

/** The learner already knows the word: mastered, it never comes back for review. */
export function markMastered(l: LangId, id: string) {
  const ls = lang(l);
  const c = (ls.cards[id] ||= cardFor(ls, id));
  c[0] = MASTERED;
  c[1] = Date.now();
  c[4] = today();
  commit();
}

/** The day number (as `today()`) of a time in ms. */
const dayOf = (ms: number) => { const d = new Date(ms); return Math.floor((ms - d.getTimezoneOffset() * 60000) / DAY); };

const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

/** A wait in words: "1 h", "3 days", "6 months". */
function wait(ms: number): string {
  const min = Math.max(1, Math.round(ms / 60000));
  if (min < 60) return `${min} min`;
  if (ms < DAY) return `${Math.round(ms / HOUR)} h`;
  const d = Math.round(ms / DAY);
  return d < 45 ? plural(d, 'day') : plural(Math.round(d / 30), 'month');
}

/** What a grade button leads to, e.g. "1 h", "3 days", "never". */
export function boxLabel(box: number): string {
  if (box >= MASTERED) return 'never';
  return box === 0 ? 'soon' : wait(WORDS.intervals[box]);
}

/** When a card comes back: "new", "due", "in 40 min", "tomorrow", "in 3 days", "mastered". */
export function nextReview(c: Card): string {
  if (isMastered(c)) return 'mastered';
  if (isNew(c)) return 'new';
  const now = Date.now();
  if (c[1] <= now) return 'due';
  const days = dayOf(c[1]) - today();
  if (days <= 0) return `in ${wait(c[1] - now)}`;
  return days === 1 ? 'tomorrow' : `in ${wait(days * DAY)}`;
}

/** Sort key for "next review": due soonest first, then new cards, mastered last. */
export function reviewOrder(c: Card): number {
  if (isMastered(c)) return Infinity;
  if (isNew(c)) return Number.MAX_SAFE_INTEGER;
  return c[1];
}

export function dueCount(l: LangId): { due: number; fresh: number } {
  let due = 0;
  let fresh = 0;
  for (const [id, c] of Object.entries(state.langs[l]?.cards || {})) {
    if (levelMastered(l, id)) continue;
    if (isDue(c)) due++;
    else if (isNew(c)) fresh++;
  }
  return { due, fresh };
}

// ---- XP, goal, streak ----

export const XP = {
  correct: 2,
  review: 1,
  session: 5,
  text: 10,
  question: 3,
  save: 1,
};

export function todayXp(): number {
  return state.days[today()]?.[0] || 0;
}

export function award(l: LangId, xp: number) {
  if (xp <= 0) return;
  const d = today();
  const day = (state.days[d] ||= [0, 0]);
  day[0] += xp;
  lang(l).xp += xp;
  if (!day[1] && day[0] >= state.settings.goal) {
    day[1] = 1;
    sfx('goal');
    toast(`Daily goal reached: stamped! Streak: ${streak()} days`, 'goal');
  }
  commit();
}

/** Re-evaluate today after the goal changes (lowering it can complete today; raising never takes it away). */
export function setGoal(goal: number) {
  state.settings.goal = goal;
  const day = state.days[today()];
  if (day && !day[1] && day[0] >= goal) day[1] = 1;
  commit();
}

/** Consecutive days with the goal reached, ending today (or yesterday while today is still open). */
export function streak(): number {
  let d = today();
  if (!state.days[d]?.[1]) d--;
  let n = 0;
  while (state.days[d]?.[1]) { n++; d--; }
  return n;
}

export function bestStreak(): number {
  const met = Object.entries(state.days).filter(([, v]) => v[1]).map(([k]) => +k).sort((a, b) => a - b);
  let best = 0;
  let run = 0;
  met.forEach((d, i) => { run = i && d === met[i - 1] + 1 ? run + 1 : 1; best = Math.max(best, run); });
  return best;
}

export function totalXp(): number {
  return Object.values(state.days).reduce((n, d) => n + d[0], 0);
}

export function setBest(l: LangId, game: string, score: number): boolean {
  const ls = lang(l);
  if (score <= (ls.best[game] || 0)) return false;
  ls.best[game] = score;
  commit();
  return true;
}

/** Records how far the learner got in a text or dialogue; only ever moves forward. */
export function setProgress(l: LangId, id: string, n: number) {
  const ls = lang(l);
  if (n <= (ls.prog[id] || 0)) return;
  ls.prog[id] = n;
  commit();
}

// ---- sentences: the sentence games repeat them like flashcards ----

/** A sentence answered in a sentence game: right moves it up a box when due or new, wrong brings it back now. */
export function sentenceResult(l: LangId, id: string, ok: boolean) {
  answer(((lang(l).sents ||= {})[id] ||= newCard()), ok, SENTENCES);
  commit();
}

/** "I know this sentence": mastered, it no longer comes first in the games. */
export function markSentenceLearnt(l: LangId, id: string) {
  const t = today();
  const c = ((lang(l).sents ||= {})[id] ||= newCard());
  c[0] = masteredBox(SENTENCES);
  c[1] = Date.now();
  c[4] = t;
  commit();
}

/** How far the learner is with a set of items (the words or sentences a game draws from). */
export interface Stats { total: number; done: number; mastered: number; unit: string }

export function sentenceStats(l: LangId, ids: string[], unit = 'sentences'): Stats {
  const cards = state.langs[l]?.sents || {};
  const cs = ids.map((id) => cards[id]).filter(Boolean);
  return { total: ids.length, done: cs.length, mastered: cs.filter((c) => isKnown(c, SENTENCES)).length, unit };
}

/** Words practised: saved or not, as soon as they have been answered in a game or a review. */
export function wordStats(l: LangId, ids: string[]): Stats {
  const cs = ids.map((id) => wordCard(l, id)).filter((c): c is Card => !!c && (c[2] > 0 || c[0] > 0));
  return { total: ids.length, done: cs.length, mastered: cs.filter((c) => isKnown(c)).length, unit: 'words' };
}

/**
 * Removes a language and all its progress (words, XP, texts, lessons). The day history and streak stay: they are not
 * per language. Returns what is needed to put it back (Undo).
 */
export function removeLanguage(l: LangId): (() => void) | undefined {
  const ls = state.langs[l];
  if (!ls) return;
  const st = state.settings;
  const before = { recent: st.recent && [...st.recent], current: st.lang };
  delete state.langs[l];
  if (st.recent) st.recent = st.recent.filter((x) => x !== l);
  if (st.lang === l) st.lang = st.recent?.find((x) => state.langs[x]) ?? (Object.keys(state.langs)[0] as LangId | undefined);
  commit();
  return () => {
    state.langs[l] = ls;
    st.recent = before.recent;
    st.lang = before.current;
    commit();
  };
}

export interface LangSummary { l: LangId; xp: number; words: number; mastered: number; texts: number; lessons: number }

/** Per started language: XP, collected and mastered words, texts read, guidebook lessons opened; highest XP first. */
export function langSummaries(): LangSummary[] {
  return (Object.entries(state.langs) as [LangId, LangState][]).map(([l, ls]) => {
    const cards = Object.values(ls.cards);
    return {
      l, xp: ls.xp, words: cards.length, mastered: cards.filter((c) => isMastered(c)).length,
      texts: ls.read.length, lessons: Object.keys(ls.guide || {}).length,
    };
  }).sort((a, b) => b.xp - a.xp || b.words - a.words);
}

/** Days with any XP, and the first of them (day number), for the profile. */
export function studyDays(): { count: number; first?: number } {
  const ds = Object.entries(state.days).filter(([, v]) => v[0] > 0).map(([k]) => +k);
  return { count: ds.length, first: ds.length ? Math.min(...ds) : undefined };
}
