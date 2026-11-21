import type { GameDef } from '../types';
import { Adventure, ADVENTURE_LANGS } from './Adventure';

export const ADVENTURE_GAME: GameDef = {
  id: 'adventure',
  name: 'Paw Trails',
  desc: 'A pixel adventure: travel as a cat and help the animals you meet.',
  cat: 'minigame',
  langs: ADVENTURE_LANGS,
  cover: '/games/paw-trails.webp',
  wip: true,
  Comp: Adventure,
};
