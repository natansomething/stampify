/**
 * The adventure's dialogue comes in parts: the first countries in src/content/<lang>/adventure.ts, each later
 * country in its own file next to it (adventure-<country>.ts), merged here.
 */
import type { AdventureText } from './types';

export type AdventurePart = Pick<AdventureText, 'names' | 'places' | 'lines'> & Partial<Pick<AdventureText, 'proper' | 'currencies' | 'exam'>>;

export function withParts(base: AdventureText, ...parts: AdventurePart[]): AdventureText {
  for (const p of parts) {
    Object.assign(base.names, p.names);
    Object.assign(base.places, p.places);
    Object.assign(base.lines, p.lines);
    if (p.currencies) base.currencies = { ...base.currencies, ...p.currencies };
    if (p.exam) Object.assign(base.exam, p.exam);
    if (p.proper) base.proper = [...(base.proper ?? []), ...p.proper];
  }
  return base;
}
