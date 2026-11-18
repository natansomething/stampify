import { loadContent } from '.';
import type { LangId, Text } from './types';

/** Long texts, one chunk each (src/content/<lang>/long/<id>.ts), fetched when opened. */
const LONG = import.meta.glob<{ default: Text }>('./*/long/*.ts');

/** A text by id: from texts.ts, or its own long-text chunk. */
export async function loadText(lang: LangId, id: string): Promise<Text | undefined> {
  const c = await loadContent(lang);
  const short = c.texts.find((t) => t.id === id);
  if (short) return short;
  const f = LONG[`./${lang}/long/${id}.ts`];
  return f ? (await f()).default : undefined;
}
