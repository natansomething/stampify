import type { Text } from '../types';
import a from './texts-a';
import b from './texts-b';
import c from './texts-c';

/** texts-a: levels 1-3, texts-b: levels 4-6, texts-c: a second batch for every level. */
const data: Text[] = [...a, ...b, ...c];

export default data;
