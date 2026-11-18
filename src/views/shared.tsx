import { useEffect, useState } from 'preact/hooks';
import { loadContent } from '../content';
import type { Content, LangId } from '../content/types';
import { lexicon, type Lexicon } from '../core/lexicon';
import { lang as langState, state } from '../core/store';
import type { Ctx } from '../games/types';

/** Loads a language's content (lazy chunk) and its lexicon. */
export function useContent(l: LangId): { c: Content; lx: Lexicon } | null {
  const [data, setData] = useState<{ c: Content; lx: Lexicon; l: LangId } | null>(null);
  useEffect(() => {
    let live = true;
    loadContent(l).then((c) => { if (live) setData({ c, lx: lexicon(l, c), l }); });
    return () => { live = false; };
  }, [l]);
  return data && data.l === l ? data : null;
}

export function makeCtx(l: LangId, c: Content, lx: Lexicon, exit: string, arg?: string): Ctx {
  return { lang: l, c, lx, band: langState(l).band, mine: langState(l).src === 'mine', exit, arg };
}

/** Remembers the last language used so "Learn" and "Read" open it, and orders the language list by last visit. */
export function rememberLang(l: LangId) {
  if (state.settings.lang !== l) state.settings.lang = l;
  const recent = state.settings.recent || [];
  if (recent[0] !== l) state.settings.recent = [l, ...recent.filter((x) => x !== l)];
}
