import type { Content, LangId, Text, TextInfo } from './types';

/**
 * Content is code-split per language and file, loaded on first use (and cached for offline use from then on).
 * Every language has the same nine files; verbs.ts is an empty list where there are no conjugation tables.
 * Long texts are not part of it: see long.ts.
 */
const FILES = ['vocab', 'texts', 'sentences', 'dialogues', 'drills', 'verbs', 'library', 'notes', 'quizzes'] as const;

async function load(lang: LangId): Promise<Content> {
  const mods = await Promise.all(FILES.map((f) => import(`./${lang}/${f}.ts`)));
  return Object.fromEntries(FILES.map((f, k) => [f, mods[k].default])) as unknown as Content;
}

const cache = new Map<LangId, Promise<Content>>();

export function loadContent(lang: LangId): Promise<Content> {
  let p = cache.get(lang);
  if (!p) { p = load(lang); cache.set(lang, p); }
  return p;
}

/** The list entry of a text: counts words, sentences and chapters. */
export function textInfo(t: Text, long = false): TextInfo {
  const words = t.s.reduce((n, s) => n + s.t.filter((k) => k[2]).length, 0);
  const info: TextInfo = { id: t.id, lv: t.lv, kind: t.kind, title: t.title, titleEn: t.titleEn, words, sentences: t.s.length, chapters: t.s.filter((s) => s.h).length };
  if (t.titleR) info.titleR = t.titleR;
  if (long) info.long = true;
  return info;
}

/** Every text of a language, short and long, easiest and shortest first. */
export function textInfos(c: Content): TextInfo[] {
  return [...c.texts.map((t) => textInfo(t)), ...c.library].sort((a, b) => a.lv - b.lv || a.words - b.words);
}
