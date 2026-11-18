/**
 * `npm run dump -- <lang> quiz` prints the English quiz questions of the level 3-6 texts (the right option starred).
 * `npm run dump -- <lang> [maxLevel]`: prints the reading texts (short and long) up to a level as plain sentences,
 * with the sentence index and the tokens separated by "|", so notes can refer to them. Default max level: 4.
 *   == de-1-lenas-day (level 1, 12 sentences)
 *   2: Am|Morgen|trinkt|sie|Kaffee|.  ||  In the morning she drinks coffee.
 */
import { loadContent } from '../src/content/index';
import type { LangId } from '../src/content/types';
import { longTexts } from './library';

const [lang, max = '4'] = process.argv.slice(2) as [LangId, string?];
const c = await loadContent(lang);
const all = [...c.texts, ...(await longTexts(lang))].sort((a, b) => a.lv - b.lv);
if (max === 'activities') {
  // `npm run dump -- <lang> activities`: what a Guidebook lesson can link to with { practice: … }
  console.log('Activities (Practice tab; ids for { practice: id }), all languages unless noted:');
  console.log('  quiz match odd type (typed languages) builder gap spot dialogue listen dictation');
  console.log('  gender (de es fr it pt nl pl ru) plurals (de) conj (de es fr it pt nl pl ru) accents (es)');
  console.log('  tones pinyin strokes (zh) kana (ja) hangul (ko) cyrillic (ru) romanize (ja ko ru)');
  console.log('Grammar drill decks ({ practice: "drill", arg: id }):');
  for (const d of c.drills) console.log(`  ${d.id}  (band ${d.band}) ${d.name}: ${d.desc}`);
  process.exit(0);
}
if (max === 'quiz') {
  // `npm run dump -- <lang> quiz`: the English questions of the level 3-6 texts, with a short summary of each text
  for (const t of all.filter((x) => x.lv >= 3)) {
    console.log(`\n== ${t.id} (level ${t.lv}) ${t.title} / ${t.titleEn}`);
    console.log(`   text starts: ${t.s.slice(0, 3).map((s) => s.t.map((k) => k[0]).join(' ')).join(' ')}`);
    t.q.forEach((q, i) => console.log(`q${i}: ${q.q}\n    options: ${q.o.map((o, k) => `${k === q.a ? '*' : ''}${o}`).join(' | ')}`));
  }
  process.exit(0);
}
const texts = all.filter((t) => t.lv <= Number(max));
for (const t of texts) {
  console.log(`\n== ${t.id} (level ${t.lv}, ${t.s.length} sentences) ${t.titleEn}`);
  t.s.forEach((s, i) => console.log(`${i}: ${s.t.map((k) => k[0]).join('|')}  ||  ${s.en}`));
}
