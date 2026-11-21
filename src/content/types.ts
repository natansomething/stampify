/**
 * Content formats. Every language ships the same kinds of files in src/content/<lang>/.
 * Content is LLM-written and checked with `npm run validate`, which enforces the rules in these comments.
 *
 * IDs are permanent: user progress (collection, read texts) is stored against them in backups,
 * so never rename or reuse an id. Fix content in place instead.
 */

export type LangId = 'zh' | 'de' | 'es' | 'fr' | 'it' | 'pt' | 'nl' | 'pl' | 'ru' | 'ja' | 'ko' | 'hu';

/** 1-6. zh: HSK 1-6. ko: TOPIK 1-6. Everything else: CEFR A1, A2, B1, B2, C1, C2. Bands: 1-2 beginner, 3-4 intermediate, 5-6 advanced. */
export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export type Pos =
  | 'n' | 'v' | 'adj' | 'adv' | 'pron' | 'prep' | 'conj' | 'num' | 'mw' | 'part' | 'int' | 'phr' | 'art';

export const TOPICS = [
  'people', 'family', 'food', 'home', 'city', 'travel', 'nature', 'animals', 'body', 'health',
  'time', 'weather', 'work', 'school', 'shopping', 'feelings', 'hobbies', 'tech', 'society', 'abstract',
] as const;
export type Topic = (typeof TOPICS)[number];

/** A dictionary entry (src/content/<lang>/vocab.ts). */
export interface Word {
  /** The word as written, nouns without article. zh: hanzi. ja: the usual spelling (kanji where normal). de: nouns capitalised. */
  w: string;
  /**
   * Reading. zh (required): pinyin with tone marks, no spaces inside a word ("xièxie", "Zhōngguó").
   * ja (required when w has kanji, else omit): the word in hiragana (katakana for katakana words), "たべる" for 食べる.
   * ko (required): Revised Romanization, lowercase, no spaces inside a word ("hakgyo" for 학교). Other languages: omit.
   */
  r?: string;
  /** Short English meaning; several senses separated by "; " (max ~40 chars). */
  en: string;
  lv: Level;
  pos: Pos;
  /**
   * Nouns (required for de, es, fr, it, pt, nl, pl, ru; omit for zh, ja, ko): grammatical gender.
   * es/fr/it/pt: m or f. de/pl/ru: m, f or n. nl: c for de-words (common gender), n for het-words.
   * pl for a plural-only noun, written in the plural (Eltern, деньги, drzwi, gafas); es/fr/it/pt then need `art`.
   */
  g?: 'm' | 'f' | 'n' | 'c' | 'pl';
  /**
   * es/fr/it/pt plural-only nouns (required): the plural article ("las", "les", "i", "gli", "le", "os", "as").
   * fr/it nouns (optional): the definite article when the app's rule gets it wrong. The app writes l' before a vowel
   * or h, and it lo before s+consonant, z, gn, ps, x, y. Set "le"/"la" for fr h aspiré ("le héros", "la hache").
   */
  art?: string;
  /** de nouns (required): plural form, e.g. "Hunde"; "-" when there is no plural (plural-only nouns: omit). */
  pl?: string;
  /**
   * zh single characters used mainly inside compounds, not as words on their own (们, 丽): kept so that look-ups in
   * texts and subtitles explain them, but left out of the games' word pools and level starters.
   */
  bound?: boolean;
  /** zh nouns (optional): the usual measure word in hanzi, e.g. "本" for 书. */
  mw?: string;
  /** Topic, used to group words (Odd one out, topic filters). Optional for function words. */
  t?: Topic;
  /** Only for homographs that need two entries: "See#m" / "See#f". Defaults to w. */
  id?: string;
  /**
   * Example sentence shown on the back of the Review card: [sentence, English, reading].
   * One short, natural sentence (max ~80 characters) that uses the word in its most common sense, with vocabulary
   * at the word's level or easier. The word may be inflected (zh: contains w exactly).
   * Third element only for zh/ja/ko, and required there: zh pinyin of the whole sentence with tone marks, words separated
   * by spaces, punctuation kept ("Wǒ xǐhuan hē chá."); ja the whole sentence in hiragana/katakana, punctuation kept,
   * no spaces; ko Revised Romanization of the sentence ("Hakgyo-e gayo.").
   */
  ex?: [string, string] | [string, string, string];
  /**
   * Languages written in Latin or Cyrillic letters (optional): other words a learner may type for the same English meaning in "Type it", which are accepted
   * with a note ("Correct, but I had … in mind"). Only real, common synonyms in that sense, written like w
   * (nouns without article). Omit when there are none.
   */
  syn?: string[];
}

/**
 * One token of a sentence: [surface, reading, gloss, lemma?]
 * - surface: exactly as it appears in the sentence.
 * - reading: zh pinyin with tone marks for the token (as spoken in context); ja the token in hiragana when it contains
 *   kanji, else ""; ko Revised Romanization of the token; "" for every other language and for punctuation.
 * - gloss: English meaning of this token *in this sentence*; "" for punctuation.
 * - lemma: dictionary form when it differs from the surface, including case: "Ich" -> "ich", "gehst" -> "gehen",
 *   "Häuser" -> "Haus", "fueron" -> "ir", ja "食べました" -> "食べる". Omit when identical. Never set for punctuation.
 * Punctuation is its own token: [".", "", ""]. zh/ja segmentation is by word, not by character.
 */
export type Token = [string, string, string, string?];

export interface Question {
  /** Question in English. */
  q: string;
  /** 3-4 answer options in English. */
  o: string[];
  /** Index of the correct option. */
  a: number;
}

/**
 * A reading text. Short texts (up to ~800 words) live in src/content/<lang>/texts.ts and load with the language.
 * Long texts, from a few pages to whole books, live one per file in src/content/<lang>/long/<id>.ts (a book may
 * import its chapters from long/parts/) and load when opened; `npm run library` indexes them in library.ts.
 */
export interface Text {
  /** "<lang>-<level>-<slug>", e.g. "de-2-bakery". */
  id: string;
  lv: Level;
  kind: 'story' | 'article';
  title: string;
  /** zh/ja/ko only: the reading of the title (pinyin, kana, romanization). */
  titleR?: string;
  titleEn: string;
  s: { t: Token[]; en: string; h?: Heading }[];
  /** Comprehension questions: 3-5 (long texts: 5-8, spread over the whole text). */
  q: Question[];
}

/**
 * Long texts: a chapter starts at the sentence that carries h = [heading, English heading] (zh/ja/ko: a third element,
 * the heading's reading). The reader shows one chapter per page; the first sentence of a text with chapters needs one.
 */
export type Heading = [string, string] | [string, string, string];

/** What the text list needs to know about a text without loading it (src/content/<lang>/library.ts is generated). */
export interface TextInfo {
  id: string;
  lv: Level;
  kind: Text['kind'];
  title: string;
  titleR?: string;
  titleEn: string;
  /** Word tokens (punctuation not counted). */
  words: number;
  sentences: number;
  /** 0 for texts without chapter headings. */
  chapters: number;
  /** In long/ (loaded on demand) rather than texts.ts. */
  long?: boolean;
}

/** A standalone sentence (src/content/<lang>/sentences.ts): sentence builder, fill the gap, dictation, spot the mistake. */
export interface Sentence {
  /** "<lang>-s<level>-<nn>", e.g. "es-s3-07". */
  id: string;
  lv: Level;
  t: Token[];
  en: string;
  /**
   * Optional "spot the mistake" variant: token i (not punctuation) replaced by the wrong form w.
   * The mistake must be a typical learner error (wrong ending, gender, tone-mark-free homophone char, word choice),
   * and x explains it in one short English sentence.
   */
  err?: { i: number; w: string; x: string };
}

export interface Line {
  t: string;
  /** zh/ja/ko only: the reading of the line (pinyin, kana, romanization). */
  r?: string;
  en: string;
}

/** A short conversation where the learner picks the right reply (src/content/<lang>/dialogues.ts). */
export interface Dialogue {
  /** "<lang>-d<level>-<slug>". */
  id: string;
  lv: Level;
  title: string;
  titleEn: string;
  /** 4-6 turns. a = what the other person says; o = exactly 3 replies; c = index of the only fitting reply. */
  turns: { a: Line; o: Line[]; c: number }[];
}

/**
 * A grammar drill deck (src/content/<lang>/drills.ts), e.g. "ser vs estar", "measure words", "case endings".
 * Each deck belongs to one level band and teaches what learners at that stage need: beginners get ser vs estar,
 * advanced learners get the imperfect subjunctive, not the other way round.
 */
export interface Drill {
  /** "<lang>-<slug>". */
  id: string;
  /** 1 beginner (levels 1-2), 2 intermediate (3-4), 3 advanced (5-6). Every item's lv is inside the band. */
  band: 1 | 2 | 3;
  name: string;
  /** One-line English description shown on the card. */
  desc: string;
  items: DrillItem[];
}

export interface DrillItem {
  lv: Level;
  /** Sentence with exactly one gap written as "___". */
  s: string;
  /** zh only (required): pinyin of the sentence, with "___" for the gap. ja/ko: omit. */
  r?: string;
  /** 2-4 options; exactly one is correct. */
  o: string[];
  a: number;
  /** English translation of the full sentence. */
  en: string;
  /** Short explanation of the rule (English). */
  x: string;
}

/** A verb with conjugation tables (src/content/<lang>/verbs.ts; languages listed in TENSES, others have an empty file). */
export interface Verb {
  inf: string;
  en: string;
  lv: Level;
  /** Tense name (see TENSES) -> 6 forms in pronoun order (see PRONOUNS), without the pronoun. */
  f: Record<string, string[]>;
}

/** Conjugated languages: the persons of a table, in order. Forms are written without the pronoun. */
export const PRONOUNS: Partial<Record<LangId, string[]>> = {
  de: ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'],
  es: ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ustedes'],
  fr: ['je', 'tu', 'il/elle/on', 'nous', 'vous', 'ils/elles'],
  it: ['io', 'tu', 'lui/lei', 'noi', 'voi', 'loro'],
  pt: ['eu', 'você/ele/ela', 'nós', 'vocês/eles/elas'],
  nl: ['ik', 'jij', 'hij/zij/het', 'wij', 'jullie', 'zij'],
  pl: ['ja', 'ty', 'on/ona/ono', 'my', 'wy', 'oni/one'],
  ru: ['я', 'ты', 'он/она/оно', 'мы', 'вы', 'они'],
  hu: ['én', 'te', 'ő/ön', 'mi', 'ti', 'ők/önök'],
};

/**
 * Tenses every verb must have, easiest first. Compound forms include the auxiliary: de "habe gemacht", fr "ai fait",
 * it "ho fatto" / "sono andato" (masculine), nl "heb gemaakt". fr subjonctif forms without "que". pt is Brazilian
 * (você forms). pl/ru: imperfective verbs only; pl past uses the masculine forms ("robiłem"). ru has the present only.
 * hu: inf is the dictionary form (3rd person singular present, "eszik", "megy"), as in the vocabulary; the
 * "(határozott)" tenses are the definite conjugation (with a definite object: "látom"); conditional and imperative
 * are indefinite; the imperative's first person singular is the form used in requests ("menjek").
 */
export const TENSES: Partial<Record<LangId, string[]>> = {
  de: ['Präsens', 'Präteritum', 'Perfekt'],
  es: ['presente', 'pretérito', 'imperfecto', 'futuro', 'subjuntivo'],
  fr: ['présent', 'passé composé', 'imparfait', 'futur', 'subjonctif'],
  it: ['presente', 'passato prossimo', 'imperfetto', 'futuro', 'congiuntivo'],
  pt: ['presente', 'pretérito perfeito', 'imperfeito', 'futuro', 'subjuntivo'],
  nl: ['presens', 'imperfectum', 'perfectum'],
  pl: ['czas teraźniejszy', 'czas przeszły'],
  ru: ['настоящее время'],
  hu: ['jelen idő', 'jelen idő (határozott)', 'múlt idő', 'múlt idő (határozott)', 'feltételes mód', 'felszólító mód'],
};

/**
 * A grammar note on one sentence of a reading text (src/content/<lang>/notes.ts). Notes are for levels 1-4:
 * they explain what a learner at that level would stumble over in the sentence (a tense, a case, a particle, word
 * order, an idiom built on grammar), not vocabulary.
 */
export interface GrammarNote {
  /** Id of the text (short or long). */
  text: string;
  /** Index of the sentence in the text (0-based, counting every sentence of the text including chapter starts). */
  s: number;
  /** The words of the sentence the note is about, exactly as they appear in its tokens (they get underlined). */
  w: string[];
  /** Short title: "Perfect tense with haben", "了 after a verb", "Genitive after 'without'". */
  title: string;
  /** Explanation in plain English, 1-3 short sentences, quoting the forms. Not a translation of the sentence. */
  x: string;
}

/**
 * The comprehension questions of a level 3-6 text in the language taught (src/content/<lang>/quizzes.ts): the same
 * questions as the English ones in the text, in the same order, with the options in the same order (so the answer
 * index stays the same). Written naturally at the text's level, not word-for-word.
 */
export interface TextQuiz {
  text: string;
  q: { q: string; o: string[] }[];
}

export interface Content {
  /** Comprehension questions in the language taught, for levels 3-6. */
  quizzes: TextQuiz[];
  /** Grammar notes on the reading texts. */
  notes: GrammarNote[];
  vocab: Word[];
  texts: Text[];
  sentences: Sentence[];
  dialogues: Dialogue[];
  drills: Drill[];
  verbs: Verb[];
  /** Index of the long texts (generated by `npm run library`). */
  library: TextInfo[];
}

// ---------------- Guidebook: structured lessons (src/content/<lang>/guide.ts) ----------------

/**
 * One piece of a lesson article. Text in `p`, `tip` and table cells may use **bold** for the forms being taught.
 * Examples are spoken aloud when tapped, so they hold only the language taught (with an English translation;
 * zh/ja/ko add the sentence's reading as a third element: pinyin, kana, romanization).
 */
export type Block =
  | { h: string }
  | { p: string }
  | { tip: string }
  | { table: string[][] }
  | { ex: ([string, string] | [string, string, string])[] }
  /**
   * A sound chart for pronunciation lessons: rows of [spelling, IPA, example word, its meaning] (zh/ja/ko: plus the
   * example's reading as a fifth element). The example is read aloud when tapped. IPA without slashes.
   */
  | { sounds: ([string, string, string, string] | [string, string, string, string, string])[] }
  /**
   * A card linking to an app activity that trains what the lesson teaches: a game id ("gender", "tones", "conj"…)
   * or "drill" with arg = a grammar drill deck id. note: one line on why it helps. `npm run dump -- <lang> activities`
   * lists what exists for a language.
   */
  | { practice: string; arg?: string; note?: string };

/**
 * A lesson exercise (the same kinds of rounds as the games):
 * - choice: q is a sentence with ___ (or a question in English); o the options; a the right one.
 * - type: q is a sentence with ___; a lists every accepted way to fill it (first = the one shown).
 * - order: w is the sentence's words in the right order (punctuation stuck to its word); shuffled for the learner.
 *   alt: other orders of the same words that are also correct German (full sentences, as the words joined by spaces).
 * en: the English of the sentence; x: a one-line explanation shown after answering.
 * zh/ja/ko: qr is the reading of q (pinyin/kana/romanization, ___ for the gap); for `type`, ar is the reading of the
 * answer, which learners may type instead of the characters (pinyin without tones, romanization); for `order`, r is
 * the reading of the sentence (shown after answering).
 */
export type Exercise =
  | { k: 'choice'; q: string; o: string[]; a: number; en?: string; x?: string; qr?: string }
  | { k: 'type'; q: string; a: string[]; en?: string; x?: string; hint?: string; qr?: string; ar?: string }
  | { k: 'order'; w: string[]; en: string; x?: string; alt?: string[]; r?: string }
  /** Listening: `say` is read aloud; the learner picks the written word they heard (o; zh/ko readings in or). */
  | { k: 'hear'; say: string; o: string[]; a: number; or?: string[]; x?: string }
  /**
   * Listening: each word in o can be played; which one has a different `focus` sound ("first vowel", "v")?
   * a = the odd one. (zh/ko readings in or.)
   */
  | { k: 'odd'; o: string[]; a: number; focus: string; or?: string[]; x?: string }
  /**
   * Listening: `say` is read aloud; the learner types only the part marked ___ in q (e.g. q "___ase", focus
   * "the first consonant"). a: accepted answers (zh/ko: in pinyin/romanization, as the part is typed in Latin letters).
   */
  | { k: 'spell'; say: string; q: string; a: string[]; focus: string; x?: string };

export interface Lesson {
  /** "<lang>-g-<slug>", permanent. */
  id: string;
  lv: Level;
  title: string;
  /** One line under the title in the list. */
  summary: string;
  body: Block[];
  /** 8-12 exercises on what the lesson taught. */
  ex: Exercise[];
}

/**
 * A cheat sheet (src/content/<lang>/sheets/<slug>.ts, listed in sheets.ts): a reference page that sums up a big topic
 * the lessons can't hold (every common irregular verb, the semantic radicals, all measure words…). It doesn't teach
 * step by step and has no exercises: mostly tables, with short `h` sections, a line of `p` or a `tip` where it helps,
 * and a few `ex` examples. Tables: the first row is the header; every row has the same number of cells.
 * Long tables are fine (a filter box on the page searches every row); split a topic into sections with `h`.
 */
export interface CheatSheet {
  /** "<lang>-cs-<slug>", permanent. */
  id: string;
  title: string;
  /** One line under the title in the list. */
  summary: string;
  body: Block[];
}

/** A unit: lessons that belong together, in the order they are best taken. */
export interface Unit {
  title: string;
  /** One line: what the unit is about. */
  about: string;
  lessons: Lesson[];
}

/**
 * The dialogue of the adventure minigame (src/content/<lang>/adventure.ts). The world, quests and logic are the same
 * for every language (src/games/adventure/world.ts); this file only holds what is said, keyed by the world's
 * LINE_KEYS (every key needs a line). Lines are tokenised like reading texts, so every word can be tapped, looked up
 * and saved. Write it at the level in `lv`; speech should sound like friendly animals talking, short lines
 * (one or two sentences, they fill a small dialogue box). Signs and descriptions are narration (no speaker).
 */
export interface AdventureText {
  /** Level the dialogue is written at. */
  lv: Level;
  /** Character names as written in the language, by NPC kind. */
  names: Record<string, string>;
  /** Place names: [name in the language, English]. */
  places: Record<string, [string, string]>;
  /**
   * Other made-up names used in the lines (places not yet on a map, inflected forms of names). Names, place names
   * and these are shown as plain text in dialogues: they can't be tapped or saved, as they aren't words to learn.
   */
  proper?: string[];
  /** Currency names for the wallet: [name in the language, English], by currency id (taler, krone…). */
  currencies?: Record<string, [string, string]>;
  lines: Record<string, { t: Token[]; en: string }>;
}
