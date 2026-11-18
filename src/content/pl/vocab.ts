import type { Word } from '../types';
import a from './vocab-a';
import b from './vocab-b';
import c from './vocab-c';

/** vocab-a: the core words of every level; vocab-b: more words for levels 1-3; vocab-c: more words for levels 4-6. */
const data: Word[] = [...a, ...b, ...c];

export default data;
