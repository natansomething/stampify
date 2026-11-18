/**
 * The browser's own translator (Chrome 138+ on desktop: free, runs on the device, nothing is sent anywhere), into
 * English. Used for live subtitle lines in the floating window and for words Stampify's word list doesn't have.
 * A language model may have to be downloaded first; browsers allow that only right after a click.
 */
import type { LangId } from '../content/types';

interface TranslatorApi {
  availability(o: { sourceLanguage: string; targetLanguage: string }): Promise<'unavailable' | 'downloadable' | 'downloading' | 'available'>;
  create(o: { sourceLanguage: string; targetLanguage: string; monitor?: (m: EventTarget) => void }): Promise<{ translate(text: string): Promise<string> }>;
}

const api = (w: Window | null | undefined) => (w as unknown as { Translator?: TranslatorApi } | null)?.Translator;

/** The browser has a built-in translator. */
export const canTranslate = () => typeof window !== 'undefined' && !!api(window);

/** The translator's language codes. */
const CODE: Record<LangId, string> = { de: 'de', zh: 'zh', es: 'es', fr: 'fr', it: 'it', pt: 'pt', nl: 'nl', pl: 'pl', ru: 'ru', ja: 'ja', ko: 'ko', hu: 'hu' };

const translators = new Map<LangId, { translate(text: string): Promise<string> }>();
const cache = new Map<string, Promise<string>>();

export type TranslatorState = 'ready' | 'needs-click' | 'unavailable';

/**
 * Gets the translator for a language. `win`: the window the click happened in (the floating window has its own);
 * `clicked`: called from a click, so a model may be downloaded (progress 0-1 is reported).
 */
export async function startTranslator(l: LangId, { win, clicked = false, progress }: { win?: Window | null; clicked?: boolean; progress?: (p: number) => void } = {}): Promise<TranslatorState> {
  if (translators.has(l)) return 'ready';
  const T = api(win) ?? api(window);
  if (!T) return 'unavailable';
  const opts = { sourceLanguage: CODE[l], targetLanguage: 'en' };
  try {
    const a = await T.availability(opts);
    if (a === 'unavailable') return 'unavailable';
    if (a !== 'available' && !clicked) return 'needs-click';
    const t = await T.create({ ...opts, monitor: (m) => m.addEventListener('downloadprogress', (e) => progress?.((e as ProgressEvent).loaded)) });
    translators.set(l, t);
    return 'ready';
  } catch {
    return clicked ? 'unavailable' : 'needs-click';
  }
}

export const translatorReady = (l: LangId) => translators.has(l);

/** Translates into English (each text once); null when the translator isn't started. */
export function translate(l: LangId, text: string): Promise<string> | null {
  const t = translators.get(l);
  if (!t) return null;
  const key = `${l}\u0000${text}`;
  let p = cache.get(key);
  if (!p) {
    p = t.translate(text);
    cache.set(key, p);
    p.catch(() => cache.delete(key));
  }
  return p;
}
