import type { FunctionComponent } from 'preact';
import type { Content, LangId } from '../content/types';
import type { Band } from '../core/langs';
import type { Lexicon } from '../core/lexicon';

export interface Ctx {
  lang: LangId;
  c: Content;
  lx: Lexicon;
  band: Band;
  /** "My words" mode: word games use the collection, sentence games the sentences that contain collected words. */
  mine: boolean;
  /** Route to go back to. */
  exit: string;
  /** Extra route argument (drill deck id). */
  arg?: string;
}

export type Category = 'minigame' | 'vocab' | 'sentence' | 'listen' | 'grammar' | 'special';

export interface GameDef {
  id: string;
  name: string;
  desc: string;
  cat: Category;
  /** Languages this game exists for (default: all). */
  langs?: LangId[];
  /** Only for languages learners can type on an ordinary keyboard (see LangMeta.typed). */
  typed?: boolean;
  /** Can practise the learner's own words; the other games are hidden in "My words" mode. */
  mine?: boolean;
  /** Needs speech synthesis. */
  audio?: boolean;
  /** What the game draws from and how far the learner is with it (shown on its ticket and summary). */
  progress?: (ctx: Ctx) => import('../core/progress').Stats;
  /** Why the game can't be played right now (not enough content), or null. */
  check?: (ctx: Ctx) => string | null;
  /** Minigames: a screenshot shown on the Minigames page instead of an icon (path under public/). */
  cover?: string;
  /** Still being built: playable, but shown with a "Work in progress" badge. */
  wip?: boolean;
  Comp: FunctionComponent<{ ctx: Ctx }>;
}

export const CATEGORIES: { id: Category; name: string }[] = [
  { id: 'minigame', name: 'Minigames' },
  { id: 'vocab', name: 'Vocabulary' },
  { id: 'sentence', name: 'Sentences' },
  { id: 'listen', name: 'Listening' },
  { id: 'grammar', name: 'Grammar drills' },
  { id: 'special', name: 'Language specials' },
];
