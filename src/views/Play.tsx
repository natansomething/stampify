import { useEffect } from 'preact/hooks';
import type { LangId } from '../content/types';
import { commit, lang } from '../core/store';
import { findGame } from '../games';
import { Empty, Loading } from '../ui/components';
import { makeCtx, rememberLang, useContent } from './shared';

export function Play({ l, game, arg }: { l: LangId; game: string; arg?: string }) {
  const data = useContent(l);
  rememberLang(l);
  const def = findGame(l, game);
  useEffect(() => { if (def) rememberGame(l, arg ? `${game}/${arg}` : game); }, [l, game, arg]);
  if (!def) return <Empty icon="search" title="Game not found"><a href={`#/${l}/practice`}>Back to practice</a></Empty>;
  if (!data) return <Loading />;
  // Opened from a Guidebook lesson (…?back=#/de/guide/x): closing the game goes back there
  const back = new URLSearchParams(location.hash.split('?')[1] || '').get('back');
  const ctx = makeCtx(l, data.c, data.lx, back?.startsWith('#/') ? back : `#/${l}/practice`, arg);
  const why = def.check?.(ctx);
  if (why) return <Empty icon="warn" title={def.name}>{why}. <a href={`#/${l}/practice`}>Back</a></Empty>;
  const Comp = def.Comp;
  return <Comp key={`${game}-${arg}`} ctx={ctx} />;
}

/** Keeps the last activities played (for Today), most recent first. */
function rememberGame(l: LangId, key: string) {
  const ls = lang(l);
  const played = ls.played || [];
  if (played[0] === key) return;
  ls.played = [key, ...played.filter((k) => k !== key)].slice(0, 12);
  commit();
}
