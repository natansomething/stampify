import type { Text } from '../types';
import a from './texts-a';
import b from './texts-b';
import c from './texts-c';
import d1 from './texts-d1';
import d2 from './texts-d2';
import d3 from './texts-d3';
import d4 from './texts-d4';

/** texts-a: levels 1-3, texts-b: levels 4-6, texts-c: a second batch for every level, texts-d1…d4: 20 more beginner texts (levels 1-2). */
const data: Text[] = [...a, ...b, ...c, ...d1, ...d2, ...d3, ...d4];

export default data;
