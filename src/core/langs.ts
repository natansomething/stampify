import type { LangId, Level } from '../content/types';

export interface LangMeta {
  id: LangId;
  name: string;
  native: string;
  /** BCP-47 tag for speech synthesis. */
  tts: string;
  /** Short badge text, printed on the passport booklet. */
  badge: string;
  levels: Record<Level, string>;
  /** Words are separated by spaces in running text. */
  spaced: boolean;
  /** Written in Chinese characters, Japanese or Hangul: larger type, the CJK font and tiles that fit glyphs. */
  cjk: boolean;
  /** Has a reading aid (pinyin, kana, romanization) shown above words. */
  reading: boolean;
  readingName?: string;
  /** Learners can type answers on an ordinary keyboard (Latin or Cyrillic letters): enables the typing games. */
  typed: boolean;
  /** Letters missing from many keyboards, offered as buttons under typing fields. */
  chars?: string[];
  /** Grammatical gender game: button labels in the order of `genders`. */
  gender?: { name: string; desc: string; labels: string[]; genders: string[] };
  /** Passport cover colour (dark enough for gold text on it). */
  color: string;
}

const CEFR: Record<Level, string> = { 1: 'A1', 2: 'A2', 3: 'B1', 4: 'B2', 5: 'C1', 6: 'C2' };
const latin = { spaced: true, cjk: false, reading: false, typed: true, levels: CEFR };

export const LANGS: Record<LangId, LangMeta> = {
  zh: {
    id: 'zh', name: 'Mandarin Chinese', native: '中文', tts: 'zh-CN', badge: '中',
    levels: { 1: 'HSK 1', 2: 'HSK 2', 3: 'HSK 3', 4: 'HSK 4', 5: 'HSK 5', 6: 'HSK 6' },
    spaced: false, cjk: true, reading: true, readingName: 'pinyin', typed: false, color: '#7a1f2e',
  },
  de: {
    ...latin, id: 'de', name: 'German', native: 'Deutsch', tts: 'de-DE', badge: 'De', color: '#1e4d3b',
    chars: ['ä', 'ö', 'ü', 'ß'],
    gender: { name: 'der / die / das', desc: 'Pick the right article, fast.', labels: ['der', 'die', 'das'], genders: ['m', 'f', 'n'] },
  },
  es: {
    ...latin, id: 'es', name: 'Spanish', native: 'Español', tts: 'es-ES', badge: 'Es', color: '#2b3f7a',
    chars: ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'],
    gender: { name: 'el / la', desc: 'Masculine or feminine?', labels: ['el', 'la'], genders: ['m', 'f'] },
  },
  fr: {
    ...latin, id: 'fr', name: 'French', native: 'Français', tts: 'fr-FR', badge: 'Fr', color: '#3b2e6e',
    chars: ['é', 'è', 'ê', 'à', 'â', 'ç', 'î', 'ô', 'ù', 'û', 'ë', 'œ'],
    gender: { name: 'un / une', desc: 'Masculine or feminine?', labels: ['un', 'une'], genders: ['m', 'f'] },
  },
  it: {
    ...latin, id: 'it', name: 'Italian', native: 'Italiano', tts: 'it-IT', badge: 'It', color: '#5e2550',
    chars: ['à', 'è', 'é', 'ì', 'ò', 'ù'],
    gender: { name: 'Maschile / femminile', desc: 'Is the noun masculine or feminine?', labels: ['masculine', 'feminine'], genders: ['m', 'f'] },
  },
  pt: {
    ...latin, id: 'pt', name: 'Portuguese', native: 'Português', tts: 'pt-BR', badge: 'Pt', color: '#2f5d1f',
    chars: ['á', 'â', 'ã', 'à', 'ç', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú'],
    gender: { name: 'o / a', desc: 'Masculine or feminine?', labels: ['o', 'a'], genders: ['m', 'f'] },
  },
  nl: {
    ...latin, id: 'nl', name: 'Dutch', native: 'Nederlands', tts: 'nl-NL', badge: 'Nl', color: '#9a4a0a',
    chars: ['é', 'ë', 'ï', 'è'],
    gender: { name: 'de / het', desc: 'Pick the right article.', labels: ['de', 'het'], genders: ['c', 'n'] },
  },
  pl: {
    ...latin, id: 'pl', name: 'Polish', native: 'Polski', tts: 'pl-PL', badge: 'Pl', color: '#9b1b45',
    chars: ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'],
    gender: { name: 'on / ona / ono', desc: 'Masculine, feminine or neuter?', labels: ['on', 'ona', 'ono'], genders: ['m', 'f', 'n'] },
  },
  ru: {
    ...latin, id: 'ru', name: 'Russian', native: 'Русский', tts: 'ru-RU', badge: 'Ру', color: '#3c4a63',
    gender: { name: 'он / она / оно', desc: 'Masculine, feminine or neuter?', labels: ['он', 'она', 'оно'], genders: ['m', 'f', 'n'] },
  },
  hu: {
    ...latin, id: 'hu', name: 'Hungarian', native: 'Magyar', tts: 'hu-HU', badge: 'Hu', color: '#4a5a1e',
    chars: ['á', 'é', 'í', 'ó', 'ö', 'ő', 'ú', 'ü', 'ű'],
  },
  ja: {
    id: 'ja', name: 'Japanese', native: '日本語', tts: 'ja-JP', badge: '日', levels: CEFR,
    spaced: false, cjk: true, reading: true, readingName: 'furigana', typed: false, color: '#333333',
  },
  ko: {
    id: 'ko', name: 'Korean', native: '한국어', tts: 'ko-KR', badge: '한',
    levels: { 1: 'TOPIK 1', 2: 'TOPIK 2', 3: 'TOPIK 3', 4: 'TOPIK 4', 5: 'TOPIK 5', 6: 'TOPIK 6' },
    spaced: true, cjk: true, reading: true, readingName: 'romanization', typed: false, color: '#0e4d63',
  },
};

/** Passport order: the first three courses, then the rest alphabetically by English name. */
export const LANG_IDS: LangId[] = ['zh', 'de', 'es', 'nl', 'fr', 'hu', 'it', 'ja', 'ko', 'pl', 'pt', 'ru'];

/** Level band. 0 = every level. */
export type Band = 0 | 1 | 2 | 3;
export const BANDS: { id: Band; name: string }[] = [
  { id: 1, name: 'Beginner' },
  { id: 2, name: 'Intermediate' },
  { id: 3, name: 'Advanced' },
  { id: 0, name: 'All levels' },
];

export function inBand(lv: number, band: Band): boolean {
  return band === 0 || Math.ceil(lv / 2) === band;
}

/** "HSK 4" -> "4", "TOPIK 2" -> "2", "B1" stays: for ranges like "HSK 3–4". */
export const levelNum = (s: string) => s.replace(/^[A-Z]{3,} /, '');

export function bandLabel(lang: LangId, band: Band): string {
  if (band === 0) return 'All levels';
  const l = LANGS[lang].levels;
  return `${BANDS.find((b) => b.id === band)!.name} · ${l[(band * 2 - 1) as Level]}–${levelNum(l[(band * 2) as Level])}`;
}

export const isLang = (s: string | undefined): s is LangId => !!s && s in LANGS;
