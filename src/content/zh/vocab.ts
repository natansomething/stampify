import type { Word } from '../types';
import a from './vocab-a';
import b from './vocab-b';
import c from './vocab-c';
import d from './vocab-d';
import e from './vocab-e';
import f from './vocab-f';
import g from './vocab-g';
import h from './vocab-h';
import i from './vocab-i';
import j from './vocab-j';
import k from './vocab-k';
import l from './vocab-l';
import m from './vocab-m';
import n from './vocab-n';
import o from './vocab-o';
import p from './vocab-p';
import q from './vocab-q';
import r from './vocab-r';

/**
 * vocab-a: the core words of every level; vocab-b: more words for levels 1-3; vocab-c: more words for levels 4-6.
 * vocab-d … vocab-j: the rest of the HSK 1-6 lists (added 2026-11, mostly HSK 5-6), without example sentences yet
 * (docs/TODO.md).
 * vocab-k … vocab-r: the most frequent single characters not in the list on their own (added 2026-11), many marked
 * `bound` (look-ups only, not in games).
 */
const data: Word[] = [...a, ...b, ...c, ...d, ...e, ...f, ...g, ...h, ...i, ...j, ...k, ...l, ...m, ...n, ...o, ...p, ...q, ...r];

export default data;
