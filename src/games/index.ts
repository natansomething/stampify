import type { LangId } from '../content/types';
import { LANGS } from '../core/langs';
import { ZH_GAMES } from './chinese';
import { DRILL_GAME, GRAMMAR_GAMES } from './grammar';
import { ROMANIZE_GAMES } from './romanize';
import { SCRIPT_GAMES } from './scripts';
import { SENTENCE_GAMES } from './sentences';
import type { GameDef } from './types';
import { VOCAB_GAMES } from './vocab';

/** Every game, in hub order. To add a game: write the component, add its GameDef to one of these lists. */
const ALL: GameDef[] = [...VOCAB_GAMES, ...SENTENCE_GAMES, ...ZH_GAMES, ...SCRIPT_GAMES, ...ROMANIZE_GAMES, ...GRAMMAR_GAMES];

export function gamesFor(lang: LangId): GameDef[] {
  return ALL.filter((g) => (!g.langs || g.langs.includes(lang)) && (!g.typed || LANGS[lang].typed));
}

export function findGame(lang: LangId, id: string): GameDef | undefined {
  if (id === 'drill') return DRILL_GAME;
  return gamesFor(lang).find((g) => g.id === id);
}
