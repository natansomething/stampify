import type { CheatSheet } from '../types';
import radicals from './sheets/radicals';
import measureWords from './sheets/measure-words';
import complements from './sheets/complements';
import chengyu from './sheets/chengyu';
import confusable from './sheets/confusable';
import numbersTime from './sheets/numbers-time';

const sheets: CheatSheet[] = [radicals, measureWords, complements, chengyu, confusable, numbersTime];

export default sheets;
