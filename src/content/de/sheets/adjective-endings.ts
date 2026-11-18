import type { CheatSheet } from '../../types';

const sheet: CheatSheet = {
  id: 'de-cs-adjective-endings',
  title: 'Adjective endings',
  summary: 'The three ending tables, which words count as der- or ein-words, and comparatives and superlatives.',
  body: [
    { p: "An adjective after the verb (**Der Wein ist gut.**) has no ending. An adjective **before a noun** always has one, and it depends on the word in front of it: a der-word, an ein-word or nothing. The rule behind all three tables: the gender and case must be shown once. If the article already shows it, the adjective takes a weak **-e** or **-en**; if not, the adjective shows it itself." },

    { h: 'After der-words (der, dieser, jeder…)' },
    { table: [
      ['Case', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
      ['Nominative', 'der gut**e** Wein', 'die gut**e** Suppe', 'das gut**e** Brot', 'die gut**en** Äpfel'],
      ['Accusative', 'den gut**en** Wein', 'die gut**e** Suppe', 'das gut**e** Brot', 'die gut**en** Äpfel'],
      ['Dative', 'dem gut**en** Wein', 'der gut**en** Suppe', 'dem gut**en** Brot', 'den gut**en** Äpfeln'],
      ['Genitive', 'des gut**en** Weins', 'der gut**en** Suppe', 'des gut**en** Brots', 'der gut**en** Äpfel'],
    ] },
    { tip: "Only five places take **-e**: the three nominative singulars and the feminine and neuter accusative. Everything else is **-en**." },

    { h: 'After ein-words (ein, kein, mein…)' },
    { table: [
      ['Case', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
      ['Nominative', 'ein gut**er** Wein', 'eine gut**e** Suppe', 'ein gut**es** Brot', 'keine gut**en** Äpfel'],
      ['Accusative', 'einen gut**en** Wein', 'eine gut**e** Suppe', 'ein gut**es** Brot', 'keine gut**en** Äpfel'],
      ['Dative', 'einem gut**en** Wein', 'einer gut**en** Suppe', 'einem gut**en** Brot', 'keinen gut**en** Äpfeln'],
      ['Genitive', 'eines gut**en** Weins', 'einer gut**en** Suppe', 'eines gut**en** Brots', 'keiner gut**en** Äpfel'],
    ] },
    { tip: "The same as after der-words except in three places where **ein** has no ending: **ein guter** Wein (masc. nom.), **ein gutes** Brot (neut. nom. and acc.). There the adjective takes the ending of der/das: -er, -es." },

    { h: 'No article' },
    { table: [
      ['Case', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
      ['Nominative', 'gut**er** Wein', 'gut**e** Suppe', 'gut**es** Brot', 'gut**e** Äpfel'],
      ['Accusative', 'gut**en** Wein', 'gut**e** Suppe', 'gut**es** Brot', 'gut**e** Äpfel'],
      ['Dative', 'gut**em** Wein', 'gut**er** Suppe', 'gut**em** Brot', 'gut**en** Äpfeln'],
      ['Genitive', 'gut**en** Weins', 'gut**er** Suppe', 'gut**en** Brots', 'gut**er** Äpfel'],
    ] },
    { tip: "Without an article the adjective takes the ending the article would have had (der → gut**er**, dem → gut**em**). Only the masculine and neuter genitive are different: **-en** (trotz schlecht**en** Wetters), because the noun already ends in -s." },

    { h: 'Endings at a glance' },
    { table: [
      ['Case', 'After der-words (m / f / n / pl)', 'After ein-words (m / f / n / pl)', 'No article (m / f / n / pl)'],
      ['Nominative', '-e / -e / -e / -en', '-er / -e / -es / -en', '-er / -e / -es / -e'],
      ['Accusative', '-en / -e / -e / -en', '-en / -e / -es / -en', '-en / -e / -es / -e'],
      ['Dative', '-en / -en / -en / -en', '-en / -en / -en / -en', '-em / -er / -em / -en'],
      ['Genitive', '-en / -en / -en / -en', '-en / -en / -en / -en', '-en / -er / -en / -er'],
    ] },

    { h: 'Which words work like der and like ein' },
    { table: [
      ['Group', 'Words', 'Example'],
      ['der-words', 'der, die, das; dieser (this); jener (that); jeder (every, singular only); welcher (which); mancher (some); solcher (such)', 'mit diesem neuen Handy'],
      ['der-words, plural only', 'alle (all); sämtliche (all, every one of)', 'alle neuen Studenten'],
      ['ein-words', 'ein (no plural); kein; mein, dein, sein, ihr, unser, euer, Ihr', 'mit meinem neuen Handy'],
      ['no article in the plural (strong endings)', 'numbers (zwei, drei…); viele; wenige; einige; mehrere; ein paar; andere', 'viele neue Studenten; mit drei guten Freunden'],
    ] },
    { tip: "Two adjectives in a row take the same ending: **ein schöner, alter** Tisch; **mit frischem, warmem** Brot." },

    { h: 'Spelling changes and fixed forms' },
    { table: [
      ['Rule', 'Example'],
      ['**hoch** loses the c before an ending', 'Der Berg ist hoch. → der **hohe** Berg'],
      ['adjectives in **-el** drop the e', 'dunkel → ein **dunkles** Zimmer; eitel → ein **eitler** Mann'],
      ['**-er** after au/eu usually drops the e', 'teuer → ein **teures** Auto; sauer → **saure** Gurken'],
      ['some colours and loanwords take no ending', 'ein **lila** Kleid; ein **rosa** Hemd; eine **prima** Idee'],
      ['adjectives from city names end in **-er** and never change', 'der **Kölner** Dom; in der **Berliner** Luft'],
      ['adjectives as nouns keep the endings and take a capital', 'der Deutsche, ein Deutscher; die Kranken; mit einem Bekannten'],
      ['after etwas, nichts, viel, wenig: capital and **-es** (neuter, no article)', 'etwas **Neues**; nichts **Besonderes**; viel **Gutes**'],
    ] },

    { h: 'Comparative and superlative: the regular pattern' },
    { table: [
      ['Rule', 'Base', 'Comparative', 'Superlative'],
      ['add **-er** and **-st**', 'schnell', 'schneller', 'am schnellsten / der schnellste'],
      ['add **-er** and **-st**', 'billig', 'billiger', 'am billigsten / der billigste'],
      ['**-est** after d, t, s, ß, sch, x, z', 'breit', 'breiter', 'am breitesten / der breiteste'],
      ['**-est** after d, t, s, ß, sch, x, z', 'heiß', 'heißer', 'am heißesten / der heißeste'],
      ['**-est** after d, t, s, ß, sch, x, z', 'interessant', 'interessanter', 'am interessantesten / der interessanteste'],
      ['**-est** after d, t, s, ß, sch, x, z', 'hübsch', 'hübscher', 'am hübschesten / der hübscheste'],
      ['-el, -er drop the e in the comparative', 'dunkel', 'dunkler', 'am dunkelsten / der dunkelste'],
      ['-el, -er drop the e in the comparative', 'teuer', 'teurer', 'am teuersten / der teuerste'],
    ] },
    { p: "Before a noun, comparatives and superlatives take the normal endings on top: ein schneller**es** Auto, die billigst**e** Lösung, mit dem schnellst**en** Zug." },

    { h: 'Adjectives that add an umlaut' },
    { table: [
      ['Base', 'Comparative', 'Superlative', 'Meaning'],
      ['alt', 'älter', 'am ältesten', 'old'],
      ['arm', 'ärmer', 'am ärmsten', 'poor'],
      ['dumm', 'dümmer', 'am dümmsten', 'stupid'],
      ['gesund', 'gesünder', 'am gesündesten', 'healthy'],
      ['groß', 'größer', 'am größten (no -e-)', 'big; tall'],
      ['hart', 'härter', 'am härtesten', 'hard'],
      ['jung', 'jünger', 'am jüngsten', 'young'],
      ['kalt', 'kälter', 'am kältesten', 'cold'],
      ['klug', 'klüger', 'am klügsten', 'clever'],
      ['krank', 'kränker', 'am kränksten', 'ill'],
      ['kurz', 'kürzer', 'am kürzesten', 'short'],
      ['lang', 'länger', 'am längsten', 'long'],
      ['scharf', 'schärfer', 'am schärfsten', 'sharp; spicy'],
      ['schwach', 'schwächer', 'am schwächsten', 'weak'],
      ['schwarz', 'schwärzer', 'am schwärzesten', 'black'],
      ['stark', 'stärker', 'am stärksten', 'strong'],
      ['warm', 'wärmer', 'am wärmsten', 'warm'],
    ] },
    { tip: "Most adjectives do **not** add an umlaut: **langsam – langsamer, klar – klarer, voll – voller, froh – froher**. Adjectives ending in -au never do: **schlau – schlauer**." },

    { h: 'Irregular comparisons' },
    { table: [
      ['Base', 'Comparative', 'Superlative', 'Meaning'],
      ['gut', 'besser', 'am besten', 'good; well'],
      ['viel', 'mehr', 'am meisten', 'much; a lot'],
      ['gern', 'lieber', 'am liebsten', 'gladly (liking to do sth)'],
      ['hoch', 'höher', 'am höchsten', 'high'],
      ['nah', 'näher', 'am nächsten', 'near'],
      ['bald', 'eher', 'am ehesten', 'soon (eher: sooner; rather)'],
      ['wenig', 'weniger', 'am wenigsten', 'little; few'],
    ] },
    { tip: "**mehr** and **weniger** never take an ending: **mehr Zeit, mit weniger Geld**." },

    { h: 'Comparing' },
    { table: [
      ['Pattern', 'Meaning', 'Example'],
      ['**so** + adjective + **wie**', 'as … as', 'Tim ist so groß wie sein Vater.'],
      ['**nicht so** + adjective + **wie**', 'not as … as', 'Der Zug ist nicht so schnell wie das Flugzeug.'],
      ['comparative + **als**', '…er than', 'Berlin ist größer als München.'],
      ['**am** + superlative + **-en**', '(the) …est (after a verb)', 'Im Juli ist es am wärmsten.'],
      ['**je** + comparative … **desto** + comparative', 'the …er, the …er', 'Je früher wir fahren, desto besser.'],
      ['**immer** + comparative', '…er and …er', 'Die Tage werden immer kürzer.'],
    ] },
    { ex: [
      ['Ich trinke lieber Tee als Kaffee.', 'I prefer tea to coffee.'],
      ['Das ist das beste Restaurant der Stadt.', "That's the best restaurant in town."],
      ['Wir haben eine größere Wohnung gefunden.', "We've found a bigger flat."],
      ['Mit einem guten Freund ist alles leichter.', 'With a good friend everything is easier.'],
    ] },
  ],
};

export default sheet;
