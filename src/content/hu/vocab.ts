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

/**
 * The Hungarian dictionary: the most frequent words of Hungarian film and TV subtitles (OpenSubtitles frequency
 * list, reduced to dictionary forms), in order of frequency. vocab-a … vocab-j: the top ~7,400; vocab-k … vocab-m:
 * the next ~2,800 from further down the list.
 */
const data: Word[] = [...a, ...b, ...c, ...d, ...e, ...f, ...g, ...h, ...i, ...j, ...k, ...l, ...m];

export default data;
