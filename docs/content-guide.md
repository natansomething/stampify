# Content guide

All learning content in Stampify is written by LLM agents and checked by `npm run validate`.
The exact data formats are in `src/content/types.ts` (read it first: the comments there are the rules).
This guide covers what the formats cannot: quality, level and style.

## Who reads it

Adults learning on their phone, with English as their base language. They choose a level band themselves:
beginner (levels 1-2), intermediate (3-4), advanced (5-6). zh levels follow HSK 1-6, ko follows TOPIK 1-6, every other
language follows CEFR A1-C2.

## Quality bar

- **Correct above all.** Every sentence must be something a native speaker would write today. No calques,
  no textbook stiffness, no invented words. If unsure about a form, choose a different sentence.
- **Right level.** Vocabulary and grammar should match the level: level 1 uses only very common words and present
  tense / simple structures; level 6 can use idioms, literary or formal register, complex subordinate clauses.
- **Natural, varied, adult topics.** Everyday life, work, travel, culture, food, relationships, city life, nature,
  science, history, society. Avoid politics, religion and anything violent or sexual. Avoid real living people.
- **Concise English.** Glosses and `en` meanings are short ("to go; to leave", not a dictionary definition).
  Translations are natural English, not word-for-word.
- **No duplicates** within your file (same word twice, same sentence twice).

## Language specifics

### Mandarin (zh)
- Simplified characters. Pinyin with tone marks (ā á ǎ à, ü as ǚ etc.), never tone numbers.
- Pinyin uses **dictionary (citation) tones**, not tone sandhi: 一 yī, 不 bù, 你好 nǐ hǎo written as "nǐhǎo" for one
  word. Neutral tones where standard: 的 de, 了 le, 吗 ma, 们 men, 子 zi (in 桌子 zhuōzi), 谢谢 xièxie.
- One word = one token, written without spaces inside: "Zhōngguó", "xièxie", "túshūguǎn". Apostrophe before a
  syllable starting with a/o/e inside a word: "Xī'ān", "nǚ'ér". Proper names capitalised.
- Segment by words the way a learner's dictionary would (我 / 喜欢 / 喝 / 茶 / 。). The validator checks that the
  number of pinyin syllables matches the number of characters, so every Han character needs its syllable.
- Chinese punctuation (，。？！：“”) as separate tokens.

### German (de)
- Standard German (Germany), current spelling (ß where required: "Straße", "dass").
- Nouns: capitalised, no article in `w`, gender in `g`, plural in `pl` (full form: "Hunde", "Mütter"; "-" if none).
- Token lemma: set it whenever the dictionary form differs, including only by case: "Der" -> "der", "Kinder" ->
  "Kind", "ging" -> "gehen", "schönen" -> "schön". Separable verbs: the particle is its own token with gloss
  explaining it ("an" in "Ich rufe dich an": gloss "(anrufen: to call)", lemma "anrufen"; "rufe" lemma "anrufen").
  Contractions: "im" gloss "in the", lemma "in".

### Spanish (es)
- Neutral European/Latin-American Spanish; use "vosotros" forms only in verb tables, prefer "ustedes" in texts.
- Correct accents and ¿ ¡. Nouns without article, gender in `g` (m/f).
- Token lemma whenever it differs, including case: "Los" -> "el", "casas" -> "casa", "fui" -> "ir", "buenas" -> "bueno".
  Clitics stay attached as in the text ("dímelo"); gloss the whole form.

### French (fr)
- Standard French (France), current spelling. Nouns without article, gender in `g` (m/f). Set `art` only for an
  h aspiré noun ("héros" art "le", "hache" art "la"); the app writes l' before every other vowel or h.
- Lemma whenever it differs: "Les" -> "le", "maisons" -> "maison", "allons" -> "aller", "belle" -> "beau".
  Elided forms are their own tokens with the apostrophe kept: "l'" (lemma "le"), "j'" (lemma "je"), "qu'" (lemma "que"),
  "n'" (lemma "ne"), then the next word: [["J'", "", "I", "je"], ["aime", "", "like", "aimer"], ...].
  Contractions: "au" gloss "to the", lemma "à"; "du" gloss "of the; some", lemma "de".
- Punctuation as separate tokens without spaces (the app adds French spacing before ! ? : ; and inside « »).

### Italian (it)
- Standard Italian. Nouns without article, gender in `g` (m/f); the app derives il/lo/la/l'.
- Lemma whenever it differs: "Le" -> "il", "case" -> "casa", "vado" -> "andare", "belle" -> "bello".
  Articulated prepositions: "nel" gloss "in the", lemma "in"; "dalla" lemma "da". Elided forms keep the apostrophe
  in their own token: "l'" (lemma "il"), "un'" (lemma "uno"), "dell'" (lemma "di").
- Passato prossimo in verb tables with the masculine participle ("sono andato", "siamo andati").

### Portuguese (pt)
- **Brazilian Portuguese** (vocabulary, spelling and usage of Brazil: ônibus, trem, celular, você). Gender in `g` (m/f).
- Lemma whenever it differs: "As" -> "o", "casas" -> "casa", "fui" -> "ir". Contractions: "no" gloss "in the",
  lemma "em"; "do" lemma "de"; "pela" lemma "por".
- Verb tables use the four Brazilian persons (see PRONOUNS): eu, você/ele/ela, nós, vocês/eles/elas.

### Dutch (nl)
- Standard Dutch (Netherlands). `g` is "c" for de-words and "n" for het-words. Nouns without article.
- Lemma whenever it differs: "De" -> "de", "huizen" -> "huis", "ging" -> "gaan", "mooie" -> "mooi". Separable verbs:
  the particle is its own token, glossed with the verb ("op" in "Ik bel je op": gloss "(opbellen: to call)", lemma
  "opbellen"; "bel" lemma "opbellen").
- Perfectum forms include the auxiliary ("heb gewerkt", "ben gegaan").

### Polish (pl)
- Standard Polish with all diacritics (ą ć ę ł ń ó ś ź ż). Gender in `g` (m/f/n); nouns in the nominative singular.
- Lemma whenever it differs: "domu" -> "dom", "kobiecie" -> "kobieta", "poszedłem" -> "pójść", "dobrą" -> "dobry".
  Be careful with cases: every form must be correct for its position (preposition + case, numerals + genitive plural).
- Verb tables: imperfective verbs only; "czas przeszły" with masculine forms (robiłem, robiłeś, robił, robiliśmy,
  robiliście, robili).

### Russian (ru)
- Cyrillic only, standard Russian; write ё where it is pronounced (ещё, всё) — learners rely on it. No stress marks.
- Gender in `g` (m/f/n); nouns in the nominative singular. No reading: reading fields are "" and `r` is omitted.
- Lemma whenever it differs: "книгу" -> "книга", "пошла" -> "пойти", "новую" -> "новый", "Я" -> "я".
- Verb tables: imperfective verbs only, present tense ("настоящее время").

### Japanese (ja)
- Natural modern Japanese with normal kanji use for the level (beginner texts use fewer kanji; never invent rare
  kanji spellings). Beginner levels use です/ます; advanced levels may use plain style in essays and stories.
- No spaces anywhere. Segment like a learner's dictionary: content words and particles separately
  (私 / は / 学校 / に / 行きます / 。). Verb + auxiliaries stay one token (行きます, 食べたい, 読んでいる).
- `r` / token reading: hiragana (katakana for loanwords is fine as reading too: コーヒー needs no reading because
  it has no kanji). Reading is required for every token that contains kanji, "" for kana-only tokens and punctuation.
- Lemma: dictionary form when it differs ("行きます" -> "行く", "高かった" -> "高い"). Particles: gloss with their
  function ("topic marker", "object marker", "to; at").
- `ex` third element: the whole sentence in kana with punctuation, no spaces. `titleR` and dialogue `r`: kana.
- Japanese punctuation: 。、「」？！ as separate tokens.
- No genders, no plurals, verbs.ts stays empty.

### Korean (ko)
- Standard Seoul Korean in Hangul, polite 해요 style for beginners; 합니다 and plain styles where natural later.
- Tokens are space-separated units (eojeol): a noun with its particle is one token (학교에, 친구를) — this is how
  Korean is written. Gloss the whole token ("to school", "friend (object)"); lemma = the dictionary form of the
  main word ("학교에" -> "학교", "먹었어요" -> "먹다").
- `r` and token readings: Revised Romanization, lowercase, written as pronounced in standard RR for the token
  (학교에 "hakgyoe", 먹었어요 "meogeosseoyo"). Vocab `r` for the dictionary form ("meokda").
- `ex` third element, `titleR`, dialogue `r`: romanization of the whole sentence (capitalised first letter is fine).
- No genders, no plurals, verbs.ts stays empty.

## Plural-only nouns

Nouns that only exist (or are normally used) in the plural take `g: "pl"` and are written in the plural:
de Eltern, Leute, Ferien (no `pl` field); nl hersenen; pl drzwi, spodnie, okulary; ru деньги, брюки, часы;
es gafas, fr lunettes, it occhiali, pt óculos, which also need the plural article in `art` ("las", "les", "gli", "os").
The gender games skip them.

## Pronunciation (Guidebook)

Never explain sounds by comparing them with English or respelling them in English ("fow", "like the a in father"):
English varies too much between speakers. Describe sounds phonetically (voicing, aspiration, place and manner,
rounding, length, tone), define each term in a line before using it, give IPA for every sound (`sounds` blocks:
spelling, IPA, example word, meaning), and let learners hear examples (examples are read aloud when tapped).
When a letter's sound depends on context (German v [f]/[v], ch [ç]/[x]/[k]/[ʃ]; pinyin e; Korean ㄹ [ɾ]/[l]), give
every common value with when it applies and the early exceptions, one chart row per value, and note common regional
variants neutrally while marking the standard.
Pronunciation exercises never test IPA or articulation (no "choose the IPA", no "how is this sound made"): use
`hear` (which word did you hear?), `odd` (which one has a different sound?) and `spell` (type one part of the word
you heard), plus plain-language spelling rules. IPA is a helper in the lesson, not something to be examined on.

## Grammar notes (notes.ts)

Reading texts at levels 1-4 carry grammar notes: the reader underlines the words and shows a G marker on the
sentence; tapping it opens the note. Format: `GrammarNote` in types.ts, one file per language, `src/content/<lang>/notes.ts`.

- **What to explain:** what a learner at the text's level would stumble over in that sentence: a tense or mood and
  how it is formed, a case ending and why (preposition, verb), word order (verb second, verb at the end), particles
  (zh 了/过/的/得, ja は/が/に/で, ko 은/는, 이/가, endings), aspect (pl/ru), separable verbs, articles and
  contractions, agreement, a construction (comparison, passive, conditional, reported speech). Not vocabulary.
- **When:** the first time something appears in a text, or where it is the point of the sentence. Don't repeat the
  same note on every occurrence in one text (once per text is enough; another text may explain it again).
  Density: levels 1-2 about one note per 2-3 sentences; levels 3-4 about one per 4-6 sentences.
- **How:** title 2-6 words; x 1-3 short sentences in plain English, quoting the forms from the sentence and, where it
  helps, the base form or a contrast ("trinkt sie, not sie trinkt"). Be accurate and level-appropriate; no jargon
  without a gloss. `w` lists the exact tokens it is about (they must be tokens of that sentence, as written). A listed word underlines its first
  occurrence in the sentence; list it twice to underline two.
- `npm run dump -- <lang>` prints the texts as indexed sentences with their tokens; check with
  `npm run validate -- <lang> notes`.

## Quizzes in the language (quizzes.ts)

From level 3 on, the questions after a text are asked in the language taught (English is a tap away).
`TextQuiz` in types.ts; one entry per level 3-6 text (short and long) in src/content/<lang>/quizzes.ts.
- Same questions in the same order, options in the same order (the answer index is taken from the English quiz).
- Write them as a native teacher would for that level: natural, short, using the text's own words where possible, no
  harder than the text. Not a word-for-word translation. zh/ja/ko: normal script, no readings.
- Keep wrong options clearly wrong and the right one clearly right, exactly as in English.
- `npm run dump -- <lang> quiz` lists the English questions (right option starred); check with
  `npm run validate -- <lang> quizzes`.

## Vocabulary size

Each level has about 400 words (2,400 per language). vocab-a.ts holds the core 80 per level; vocab-b.ts adds
levels 1-3 and vocab-c.ts levels 4-6. Choose words by real frequency and usefulness at that stage (zh: the HSK lists,
ko: TOPIK word lists, others: CEFR lists such as the Goethe, Instituto Cervantes and DELF word lists, Kelly lists),
so that the level band a learner picks covers what they actually meet. Mix parts of speech roughly like a frequency
list does (many nouns and verbs, a good share of adjectives and adverbs, the function words of the level). Before
adding a word, check it is not already in vocab-a.ts (or your other vocab file): one entry per word per language.

## Long texts (long/)

Reading gets longer with level. Short texts (texts.ts) run from about 60 words at level 1 to 650 at level 6.
Long texts run from 2 pages at level 3 to whole books at level 6 (a page is about 250 words; in zh/ja count tokens).
The text list sorts by level, then length, so a learner sees them grow.

- **One file per text**: src/content/<lang>/long/<id>.ts with `const text: Text = {...}; export default text;`
  (import type from '../../types'). A text over ~3,000 words keeps its chapters in parts:
  long/parts/<id>-01.ts, -02.ts… each `const s: Text['s'] = [...]; export default s;` (import type from
  '../../../types'), and the main file joins them: `s: [...p01, ...p02, ...]`.
- **Chapters**: the first sentence of each chapter carries `h: ["Kapitel 1: Der Brief", "Chapter 1: The Letter"]`
  (zh/ja/ko add the heading's reading as a third element). The reader shows one chapter per page, so chapters of
  400-1,200 words read best. Texts over ~1,200 words should have chapters; a text with chapters starts with one.
- **Write like a real book, not a textbook.** A plot with a beginning, middle and end, characters with distinct
  voices, dialogue, description, a little humour or suspense; essays with an argument that develops, examples and a
  conclusion. No filler, no repeating the same scene to reach a length, no summary paragraphs at chapter ends.
  The language fits the level all the way through (C2 may be literary; B1 stays plain).
- Tokens follow exactly the same rules as short texts: every word glossed in context, lemma when it differs,
  readings for zh/ja/ko. A sentence's `en` is a natural translation.
- `q`: 5-8 questions spread over the whole text (not just the first chapter).
- Check with `npm run validate -- <lang> long <id>`. Do not run `npm run library` (it is run once at the end).

## Workflow for an agent

1. Read `src/content/types.ts` and this guide.
2. Write your file(s) as `const data: <Type>[] = [ ... ]; export default data;` (keep the existing import line).
   Short reading texts go in texts-a.ts (levels 1-3) and texts-b.ts (levels 4-6); texts.ts only joins them.
   Long texts go in long/ (see above).
   Large files can be written in several steps (write the start, then append with edits).
   Keep an array literal under ~300 entries: a longer one makes `tsc` fail with TS2590. Big vocab files are split
   into `const part1: Word[] = [...]`, `part2`… joined as `const data: Word[] = [...part1, ...part2]`; add new
   entries to the last part or a new one.
3. Run `npm run validate -- <lang> <file>` (for example `npm run validate -- de vocab-b` or `npm run validate -- zh texts-a`)
   and fix every ERROR. Read the warnings and fix the real ones.
4. Run `npx tsc --noEmit` to make sure the file type-checks (errors in files that are not yours can be ignored).
5. Only touch the files you were assigned. Other agents are writing the other files in parallel.
