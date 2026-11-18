import type { CheatSheet, LangId, Unit } from './types';

/** Guidebooks (src/content/<lang>/guide.ts), one chunk per language, loaded when opened. */
const GUIDES = import.meta.glob<{ default: Unit[] }>('./*/guide.ts');

export const hasGuide = (lang: LangId) => `./${lang}/guide.ts` in GUIDES;

export async function loadGuide(lang: LangId): Promise<Unit[]> {
  const f = GUIDES[`./${lang}/guide.ts`];
  return f ? (await f()).default : [];
}

/** Cheat sheets (src/content/<lang>/sheets.ts): reference pages in the Guidebook, loaded when opened. */
const SHEETS = import.meta.glob<{ default: CheatSheet[] }>('./*/sheets.ts');

export const hasSheets = (lang: LangId) => `./${lang}/sheets.ts` in SHEETS;

/** The Resources tab: the guidebook and cheat sheets, for the languages that have them. */
export const hasResources = (lang: LangId) => hasGuide(lang) || hasSheets(lang);

export async function loadSheets(lang: LangId): Promise<CheatSheet[]> {
  const f = SHEETS[`./${lang}/sheets.ts`];
  return f ? (await f()).default : [];
}
