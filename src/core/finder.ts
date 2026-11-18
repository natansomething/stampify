/**
 * "Find words": takes any text in the language (pasted, a subtitle file, a screenshot read by OCR), finds the base
 * form of each word and matches it against the vocabulary, so learners can add the words they meet to their collection.
 * Everything runs on the device; nothing of the text is kept.
 *
 * Base forms come from three places, tried in order:
 * 1. the vocabulary itself (and German noun plurals, conjugation tables);
 * 2. every inflected form that appears in the app's own texts, sentences and dialogues, whose tokens record their lemma;
 * 3. simple per-language ending rules (strip an ending, maybe add the infinitive one), accepted only when the result
 *    is a vocabulary word.
 */
import type { Content, LangId, Text, Token } from '../content/types';
import { LANGS } from './langs';
import { lookup, readingOf, type Entry, type Lexicon } from './lexicon';

export interface Found {
  e: Entry;
  /** The forms seen in the text, in order of appearance. */
  forms: string[];
  /** How many times the word appears. */
  n: number;
}

export interface Analysis {
  found: Found[];
  /** Words that are not in the vocabulary (as they appear, first occurrence, deduplicated). */
  unknown: string[];
  /** Number of word tokens read. */
  words: number;
}

// ---------------- the index of known forms ----------------

const indexes = new Map<LangId, Map<string, Entry>>();

/** Lowercased form -> vocabulary entry, from the vocabulary, plurals, conjugations and every token of the content. */
function formIndex(l: LangId, c: Content, lx: Lexicon): Map<string, Entry> {
  let m = indexes.get(l);
  if (m) return m;
  m = new Map();
  const add = (form: string, e: Entry | undefined) => {
    const k = norm(form);
    if (e && k && !m!.has(k)) m!.set(k, e);
  };
  for (const e of lx.vocab) add(e.w, e);
  for (const e of lx.vocab) if (e.pl && e.pl !== '-') add(e.pl, e);
  for (const v of c.verbs) {
    const e = lx.byLower.get(v.inf.toLowerCase());
    // Compound forms ("ai été", "habe gemacht", "me lave"): only the last word belongs to this verb; the others are
    // auxiliaries and pronouns. Alternatives are separated by "/".
    for (const forms of Object.values(v.f)) for (const f of forms) for (const alt of f.split('/')) add(alt.trim().split(/\s+/).pop()!, e);
  }
  const tokens = [...c.texts.flatMap((t) => t.s.flatMap((s) => s.t)), ...c.sentences.flatMap((s) => s.t)];
  for (const t of tokens) if (t[3]) add(t[0], lookup(lx, t));
  indexes.set(l, m);
  return m;
}

const norm = (s: string) => s.toLowerCase().normalize('NFC');

// ---------------- ending rules ----------------

/** [ending to strip, endings to try in its place]; longest endings first is not required (all are tried, longest wins). */
type Rule = [string, string[]];

const V = ['', 'en', 'n'];
const RULES: Partial<Record<LangId, Rule[]>> = {
  de: [
    ['test', V], ['tet', V], ['ten', V], ['te', V], ['est', V], ['et', V], ['st', V], ['t', V],
    ['em', ['', 'e']], ['en', ['', 'e', 'en']], ['er', ['', 'e']], ['es', ['', 'e']], ['e', ['', 'en']],
    ['n', ['']], ['s', ['']],
  ],
  es: [
    ['ando', ['ar']], ['iendo', ['er', 'ir']], ['ado', ['ar']], ['ada', ['ar']], ['ados', ['ar']], ['adas', ['ar']],
    ['ido', ['er', 'ir']], ['ida', ['er', 'ir']], ['idos', ['er', 'ir']],
    ['amos', ['ar']], ['emos', ['er']], ['imos', ['ir']], ['áis', ['ar']], ['éis', ['er']], ['ís', ['ir']],
    ['aron', ['ar']], ['ieron', ['er', 'ir']], ['aste', ['ar']], ['iste', ['er', 'ir']], ['aba', ['ar']], ['aban', ['ar']],
    ['ía', ['er', 'ir']], ['ían', ['er', 'ir']], ['ó', ['ar']], ['ió', ['er', 'ir']], ['é', ['ar']], ['í', ['er', 'ir']],
    ['as', ['ar', 'o', 'a']], ['an', ['ar']], ['es', ['er', 'ir', '', 'e']], ['en', ['er', 'ir']],
    ['o', ['ar', 'er', 'ir']], ['a', ['ar', 'o']], ['e', ['er', 'ir', 'ar']], ['s', ['']],
  ],
  pt: [
    ['ando', ['ar']], ['endo', ['er']], ['indo', ['ir']], ['ado', ['ar']], ['ada', ['ar']], ['ido', ['er', 'ir']], ['ida', ['er', 'ir']],
    ['amos', ['ar']], ['emos', ['er']], ['imos', ['ir']], ['aram', ['ar']], ['eram', ['er']], ['iram', ['ir']],
    ['ava', ['ar']], ['avam', ['ar']], ['ia', ['er', 'ir']], ['ou', ['ar']], ['eu', ['er']], ['iu', ['ir']], ['ei', ['ar']],
    ['am', ['ar']], ['em', ['er', 'ir']], ['as', ['ar', 'o', 'a']], ['es', ['er', 'ir', '', 'e']], ['ões', ['ão']], ['ãos', ['ão']],
    ['o', ['ar', 'er', 'ir']], ['a', ['ar', 'o']], ['e', ['er', 'ir', 'ar']], ['s', ['']],
  ],
  it: [
    ['ando', ['are']], ['endo', ['ere', 'ire']], ['ato', ['are']], ['ata', ['are']], ['ati', ['are']], ['ate', ['are']],
    ['uto', ['ere']], ['uta', ['ere']], ['ito', ['ire']], ['ita', ['ire']],
    ['iamo', ['are', 'ere', 'ire']], ['ete', ['ere']], ['ite', ['ire']],
    ['ano', ['are']], ['ono', ['ere', 'ire']], ['ava', ['are']], ['eva', ['ere']], ['iva', ['ire']],
    ['avano', ['are']], ['evano', ['ere']], ['ò', ['are']], ['ì', ['ire']],
    ['i', ['o', 'e', 'are', 'ere', 'ire']], ['e', ['a', 'ere', 'ire', 'are']], ['a', ['are', 'o']], ['o', ['are', 'ere', 'ire']],
  ],
  fr: [
    ['ons', ['er', 're', 'ir']], ['ez', ['er', 're', 'ir']], ['ent', ['er', 're', 'ir']], ['ais', ['er', 're', 'ir']],
    ['ait', ['er', 're', 'ir']], ['aient', ['er', 're', 'ir']], ['ions', ['er', 're', 'ir']], ['iez', ['er', 're', 'ir']],
    ['é', ['er']], ['ée', ['er']], ['és', ['er']], ['ées', ['er']], ['it', ['ir', 're']], ['is', ['ir', 're']],
    ['es', ['er', '', 'e']], ['e', ['er', '']], ['s', ['']], ['x', ['']], ['aux', ['al']], ['ux', ['u']],
  ],
  nl: [
    ['den', ['den', 'en']], ['ten', ['en']], ['de', ['en']], ['te', ['en']], ['en', ['', 'en']], ['t', ['en', '']],
    ['s', ['']], ['e', ['']],
  ],
  pl: [
    ['ami', ['', 'a', 'o']], ['ach', ['', 'a', 'o']], ['owi', ['']], ['owie', ['']], ['ego', ['y', 'i']], ['emu', ['y', 'i']],
    ['ymi', ['y']], ['imi', ['i']], ['ych', ['y']], ['ich', ['i']], ['ej', ['a', 'y']], ['ą', ['a', 'y']], ['ę', ['a', 'ć']],
    ['om', ['', 'a']], ['em', ['']], ['ie', ['a', '']], ['u', ['']], ['y', ['a', '']], ['i', ['a', '']], ['a', ['', 'o']],
    ['esz', ['ać', 'eć', 'ić']], ['e', ['ać', 'eć', 'ić', 'o']], ['emy', ['ać', 'eć', 'ić']], ['ecie', ['ać', 'eć', 'ić']],
    ['ą', ['ać', 'eć', 'ić']], ['am', ['ać']], ['asz', ['ać']], ['amy', ['ać']], ['ają', ['ać']],
    ['ał', ['ać']], ['ała', ['ać']], ['ali', ['ać']], ['ił', ['ić']], ['iła', ['ić']], ['ili', ['ić']], ['ył', ['yć']], ['yła', ['yć']],
  ],
  ru: [
    ['ами', ['', 'а', 'о']], ['ями', ['ь', 'я', 'е']], ['ах', ['', 'а', 'о']], ['ях', ['ь', 'я', 'е']], ['ов', ['']], ['ев', ['й', 'ь']],
    ['ого', ['ый', 'ой']], ['его', ['ий']], ['ому', ['ый', 'ой']], ['ему', ['ий']], ['ыми', ['ый']], ['ими', ['ий']],
    ['ых', ['ый']], ['их', ['ий']], ['ая', ['ый', 'ой']], ['яя', ['ий']], ['ое', ['ый', 'ой']], ['ее', ['ий']], ['ую', ['ый', 'ой']],
    ['ые', ['ый']], ['ие', ['ий']], ['ой', ['а', 'ый']], ['ом', ['', 'о']], ['ем', ['ь', 'е']], ['ам', ['', 'а']], ['ям', ['ь', 'я']],
    ['у', ['', 'а']], ['ю', ['ь', 'я', 'ть']], ['ы', ['', 'а']], ['и', ['а', 'ь', 'я']], ['е', ['', 'а', 'о']], ['а', ['', 'о']], ['я', ['ь']],
    ['ешь', ['ать', 'ять', 'еть']], ['ет', ['ать', 'ять', 'еть']], ['ем', ['ать', 'ять', 'еть']], ['ете', ['ать', 'ять', 'еть']],
    ['ют', ['ать', 'ять']], ['ишь', ['ить', 'еть']], ['ит', ['ить', 'еть']], ['им', ['ить']], ['ите', ['ить']], ['ят', ['ить', 'еть']],
    ['ат', ['ать', 'ить']], ['ал', ['ать']], ['ала', ['ать']], ['али', ['ать']], ['ил', ['ить']], ['ила', ['ить']], ['или', ['ить']],
    ['ел', ['еть']], ['ела', ['еть']], ['ели', ['еть']], ['ся', ['ся', '']], ['сь', ['ся', '']],
  ],
};

/** Korean particles and endings stripped from the end of an eojeol (longest first). */
const KO_PARTICLES = ['에서는', '에게서', '한테서', '으로는', '에서도', '에게는', '이라고', '라고', '에서', '에게', '한테', '께서',
  '으로', '까지', '부터', '처럼', '보다', '이랑', '하고', '마다', '밖에', '이나', '이요', '은', '는', '이', '가', '을', '를', '에',
  '도', '만', '의', '로', '와', '과', '랑', '나', '요', '께'];

/** The vocabulary entry for a word as written in the text, or undefined. */
function baseForm(l: LangId, w: string, idx: Map<string, Entry>): Entry | undefined {
  const k = norm(w);
  const hit = idx.get(k);
  if (hit) return hit;
  if (l === 'ko') return koBase(k, idx);
  if (l === 'hu') return huBase(k, idx);
  const rules = RULES[l];
  if (!rules) return undefined;
  const tries = (x: string): Entry | undefined => {
    let best: Entry | undefined;
    let bestLen = 0;
    for (const [end, adds] of rules) {
      if (!x.endsWith(end) || x.length - end.length < 2 || end.length <= bestLen) continue;
      const stem = x.slice(0, -end.length);
      for (const a of adds) {
        const e = idx.get(stem + a);
        if (e) { best = e; bestLen = end.length; break; }
      }
    }
    return best;
  };
  return tries(k)
    // German participles: ge…t / ge…en (gemacht, gegangen) and separable ones (aufgemacht)
    ?? (l === 'de' && /^(\p{L}*?)ge(\p{L}{3,})$/u.test(k) ? deParticiple(k, idx) : undefined);
}

// ---------------- Hungarian ----------------

/**
 * Hungarian stacks endings on a stem (ház-aim-ban "in my houses", lov-ak-at "horses (object)"), changes some stems
 * before them (ló/lov-, kenyér/kenyer-, bokor/bokr-, alma/almá-) and conjugates verbs for definite and indefinite
 * objects, with -hat/-het, moods and a verbal prefix in front (meg-, el-, ki-…). huBase peels endings in every way
 * that fits the word, repairs the stem and keeps the reading that leaves the longest stem found in the dictionary.
 * Irregular verbs (van, megy, jön, eszik…) come from their conjugation tables (verbs.ts) via the form index.
 */
const HU_CASE = ['t', 'ot', 'at', 'et', 'öt', 'ban', 'ben', 'ba', 'be', 'ból', 'ből', 'ra', 're', 'ról', 'ről', 'on', 'en',
  'ön', 'n', 'nál', 'nél', 'hoz', 'hez', 'höz', 'tól', 'től', 'nak', 'nek', 'val', 'vel', 'vá', 'vé', 'ig', 'ért', 'ként',
  'kor', 'ul', 'ül', 'stul', 'stül', 'szor', 'szer', 'ször', 'képp', 'képpen', 'beli', 'é', 'éi', 'ék'];
const HU_POSS = ['m', 'om', 'am', 'em', 'öm', 'd', 'od', 'ad', 'ed', 'öd', 'a', 'e', 'ja', 'je', 'unk', 'ünk', 'nk', 'tok',
  'tek', 'tök', 'otok', 'atok', 'etek', 'ötök', 'uk', 'ük', 'juk', 'jük', 'aim', 'eim', 'jaim', 'jeim', 'im', 'aid', 'eid',
  'jaid', 'jeid', 'id', 'ai', 'ei', 'jai', 'jei', 'i', 'aink', 'eink', 'jaink', 'jeink', 'ink', 'aitok', 'eitek', 'jaitok',
  'jeitek', 'itok', 'itek', 'aik', 'eik', 'jaik', 'jeik', 'ik', 'k', 'ok', 'ak', 'ek', 'ök'];
/** Verb endings (person, tense, mood, infinitive, participles); a -hat/-het before them is tried too. */
const HU_VERB = (() => {
  const out = new Set(['ok', 'ek', 'ök', 'sz', 'asz', 'esz', 'ol', 'el', 'öl', 'unk', 'ünk', 'tok', 'tek', 'tök', 'otok', 'atok',
    'etek', 'ötök', 'nak', 'nek', 'anak', 'enek', 'om', 'em', 'öm', 'od', 'ed', 'öd', 'ja', 'i', 'juk', 'jük', 'játok', 'itek',
    'ják', 'ik', 'lak', 'lek', 'ni', 'ani', 'eni', 'nom', 'nem', 'nöm', 'nod', 'ned', 'nöd', 'nia', 'nie', 'nunk', 'nünk', 'notok',
    'netek', 'nötök', 'niuk', 'niük', 'va', 've', 'ván', 'vén', 'ó', 'ő', 'andó', 'endő', 'd']);
  const person = ['am', 'em', 'ál', 'él', 'unk', 'ünk', 'atok', 'etek', 'ak', 'ek', 'ad', 'ed', 'a', 'e', 'uk', 'ük', 'átok',
    'étek', 'ák', 'ék', 'alak', 'elek', ''];
  for (const t of ['t', 'tt', 'ott', 'ett', 'ött']) for (const p of person) out.add(t + p);
  for (const n of ['n', 'an', 'en']) for (const p of ['ék', 'ál', 'él', 'a', 'e', 'ánk', 'énk', 'átok', 'étek', 'ának', 'ének',
    'ám', 'ém', 'ád', 'éd', 'á', 'é', 'ák', 'álak', 'élek']) out.add(n + p);
  for (const p of ['ak', 'ek', 'ál', 'él', 'on', 'en', 'ön', 'unk', 'ünk', 'atok', 'etek', 'anak', 'enek', 'am', 'em', 'ad', 'ed',
    'a', 'e', 'uk', 'ük', 'átok', 'étek', 'ák', 'ék', 'alak', 'elek', '']) out.add('j' + p);
  return [...out].filter(Boolean);
})();
const HU_PREVERBS = ['meg', 'el', 'ki', 'be', 'fel', 'föl', 'le', 'át', 'vissza', 'össze', 'oda', 'ide', 'haza', 'rá', 'hozzá',
  'szét', 'végig', 'újra', 'tovább', 'körül', 'abba', 'bele', 'neki', 'utána', 'keresztül', 'félre', 'agyon', 'alá', 'elő',
  'hátra', 'előre', 'közbe', 'mellé', 'túl', 'ellen', 'fenn', 'fent', 'lent', 'benn', 'bent', 'hozzá'];
/** Irregular infinitives (and the verbs' -va/-ve forms), which no stem rule reaches: menni -> megy. */
const HU_IRREGULAR: Record<string, string> = {
  menni: 'megy', jönni: 'jön', enni: 'eszik', inni: 'iszik', tenni: 'tesz', venni: 'vesz', vinni: 'visz', hinni: 'hisz',
  lenni: 'van', aludni: 'alszik', feküdni: 'fekszik', nőni: 'nő', lőni: 'lő', haragudni: 'haragszik', nyugodni: 'nyugszik',
  igyekezni: 'igyekszik', emlékezni: 'emlékszik', verekedni: 'verekszik', cselekedni: 'cselekszik', öregedni: 'öregszik',
  dicsekedni: 'dicsekszik', menve: 'megy', jőve: 'jön', éve: 'eszik', íva: 'iszik', téve: 'tesz', véve: 'vesz', víve: 'visz',
  nincs: 'nincs', nincsen: 'nincs', nincsenek: 'nincs', sincs: 'nincs', sincsenek: 'nincs', gyere: 'jön', gyertek: 'jön',
  gyerünk: 'jön',
  // Personal pronouns with case endings (nekem, velük, belőle…) and in the accusative (engem, minket)
  nekem: 'én', neked: 'te', neki: 'ő', nekünk: 'mi', nektek: 'ti', nekik: 'ők', velem: 'én', veled: 'te', vele: 'ő', velünk: 'mi', veletek: 'ti', velük: 'ők', tőlem: 'én', tőled: 'te', tőle: 'ő', tőlünk: 'mi', tőletek: 'ti', tőlük: 'ők', belőlem: 'én', belőled: 'te', belőle: 'ő', belőlünk: 'mi', belőletek: 'ti', belőlük: 'ők', bennem: 'én', benned: 'te', benne: 'ő', bennünk: 'mi', bennetek: 'ti', bennük: 'ők', rólam: 'én', rólad: 'te', róla: 'ő', rólunk: 'mi', rólatok: 'ti', róluk: 'ők', nálam: 'én', nálad: 'te', nála: 'ő', nálunk: 'mi', nálatok: 'ti', náluk: 'ők', hozzám: 'én', hozzád: 'te', hozzá: 'ő', hozzánk: 'mi', hozzátok: 'ti', hozzájuk: 'ők', rám: 'én', rád: 'te', rá: 'ő', ránk: 'mi', rátok: 'ti', rájuk: 'ők', belém: 'én', beléd: 'te', belé: 'ő', belénk: 'mi', belétek: 'ti', beléjük: 'ők', rajtam: 'én', rajtad: 'te', rajta: 'ő', rajtunk: 'mi', rajtatok: 'ti', rajtuk: 'ők', engem: 'én', téged: 'te', őt: 'ő', minket: 'mi', titeket: 'ti', őket: 'ők', értünk: 'mi', értetek: 'ti', értük: 'ők',
  // Irregular comparatives (and superlatives via leg-)
  jobb: 'jó', több: 'sok', kisebb: 'kicsi', szebb: 'szép', könnyebb: 'könnyű', bővebb: 'bő', hosszabb: 'hosszú', lassabb: 'lassú',
  // The definite imperative of the irregular verbs (the tables hold the indefinite one)
  vidd: 'visz', vigye: 'visz', vigyük: 'visz', vigyétek: 'visz', vigyék: 'visz', tedd: 'tesz', tegye: 'tesz', tegyük: 'tesz', tegyétek: 'tesz', tegyék: 'tesz', vedd: 'vesz', vegye: 'vesz', vegyük: 'vesz', vegyétek: 'vesz', vegyék: 'vesz', edd: 'eszik', egye: 'eszik', együk: 'eszik', egyétek: 'eszik', egyék: 'eszik', idd: 'iszik', igya: 'iszik', igyuk: 'iszik', igyátok: 'iszik', igyák: 'iszik', hidd: 'hisz', higgye: 'hisz', higgyük: 'hisz', higgyétek: 'hisz', higgyék: 'hisz',
};
/** Prefixes tried for a verb that is only in the dictionary with one (its prefix may stand apart: "Fejezd be!"). */
const HU_SPLIT_PREFIX = ['meg', 'be', 'el', 'ki', 'fel', 'le', 'össze', 'át', 'vissza', 'rá'];
const HU_LONG: Record<string, string> = { a: 'á', e: 'é', i: 'í', o: 'ó', ö: 'ő', u: 'ú', ü: 'ű' };
const HU_V_STEM: Record<string, string> = { o: 'ó', a: 'ó', ö: 'ő', ü: 'ű', ű: 'ű', e: 'é', é: 'é' };
const HU_VOWEL = /[aáeéiíoóöőuúüű]/;

/** Dictionary forms a stem may come from (a stem left after cutting endings). */
function huRepairs(stem: string, verb: boolean): string[] {
  const out = [stem];
  const last = stem.slice(-1), before = stem.slice(0, -1);
  // alma -> almát, kefe -> kefét
  if (last === 'á') out.push(`${before}a`);
  if (last === 'é') out.push(`${before}e`);
  // A long vowel shortened before endings: madár/madarat, kenyér/kenyeret, víz/vizet, út/utat, tűz/tüzet
  const m = /^(.*)([aeiouöü])([^aáeéiíoóöőuúüű]+)$/.exec(stem);
  if (m) out.push(`${m[1]}${HU_LONG[m[2]]}${m[3]}`);
  // v-stems: ló/lovak, szó/szavak, kő/kövek, fű/füvek, lé/levek
  const v = /^(.*?)([oaöüűeé])v$/.exec(stem);
  if (v && v[1]) out.push(`${v[1]}${HU_V_STEM[v[2]]}`);
  // A vowel dropped before endings: bokor/bokrot, terem/termet, majom/majmot, érez/érzem, mozog/mozgok, őriz/őrzöm
  const cc = /^(.*[aáeéiíoóöőuúüű][^aáeéiíoóöőuúüű]*?)([^aáeéiíoóöőuúüű])([^aáeéiíoóöőuúüű])$/.exec(stem);
  if (cc) for (const x of ['o', 'e', 'ö', 'a', 'i']) out.push(`${cc[1]}${cc[2]}${x}${cc[3]}`);
  // Imperatives with assimilation: olvass, nézz, lássa (lát), tanítson (tanít)
  if (verb) {
    if (/ss$/.test(stem)) out.push(stem.slice(0, -1), `${stem.slice(0, -2)}t`);
    if (/zz$/.test(stem)) out.push(stem.slice(0, -1));
    if (/ssz$/.test(stem)) out.push(`${stem.slice(0, -3)}sz`);
    if (/ts$/.test(stem)) out.push(stem.slice(0, -1));
  }
  return out.filter((x) => x.length >= 2);
}

/** A doubled consonant from -val/-vel, -vá/-vé (házzal, lánnyal, barátommá): the stem without the doubling. */
function huUndouble(stem: string): string | null {
  const m = /(sz|zs|cs|gy|ly|ny|ty|[bcdfghjklmnprstvz])$/.exec(stem);
  if (!m) return null;
  const c = m[1];
  const before = stem.slice(0, -c.length);
  if (before.endsWith(c[0])) return before.slice(0, -1) + c;
  return null;
}

function huBase(k: string, idx: Map<string, Entry>, depth = 0): Entry | undefined {
  const irr = HU_IRREGULAR[k];
  if (irr) { const e = idx.get(irr); if (e) return e; }
  // Comparatives and superlatives, with any endings after them: nagyobbat, legjobb, legszebbek -> nagy, jó, szép
  const cmp = /^(?:leg(?:es-?leg)?)?(\p{L}+?bb)(\p{L}*)$/u.exec(k);
  if (cmp && !depth && k.length > 4) {
    const [, stemC, rest] = cmp;
    const word = HU_IRREGULAR[stemC] ?? stemC.replace(/(?:[aeoö])?bb$/, '');
    for (const w of [word, `${word}ú`, `${word}ű`, ...huRepairs(word, false)]) {
      const e = idx.get(w);
      if (e && (e.pos === 'adj' || e.pos === 'adv' || e.pos === 'num' || e.pos === 'pron')) {
        if (!rest || idx.get(stemC) || huBase(stemC + rest, new Map([[stemC, e]]), 1)) return e;
      }
    }
  }
  let best: Entry | undefined;
  let bestLen = 0;
  const consider = (stem: string, verb: boolean) => {
    if (stem.length < 2 || stem.length <= bestLen || !HU_VOWEL.test(stem)) return;
    // A verb ending only counts when it leaves a verb (eszik's stem + ik included)
    const isVerb = (e: Entry | undefined) => (e && (e.pos === 'v' || !e.pos) ? e : undefined);
    // A verb whose prefix stands apart in the sentence (Bocsáss meg!, Fejezd be!): the verb with its usual prefix
    const prefixed = (c: string) => (c.length >= 3 ? HU_SPLIT_PREFIX.map((p) => isVerb(idx.get(p + c)) ?? isVerb(idx.get(`${p}${c}ik`))).find(Boolean) : undefined);
    for (const c of huRepairs(stem, verb)) {
      const e = verb ? isVerb(idx.get(c)) ?? isVerb(idx.get(`${c}ik`)) ?? prefixed(c) : idx.get(c);
      if (e) { best = e; bestLen = stem.length; return; }
    }
  };
  // Nouns and adjectives: [case] after [possessive or plural]
  const nominal = (w1: string) => {
    for (const p of ['', ...HU_POSS]) if (w1.endsWith(p)) consider(w1.slice(0, w1.length - p.length), false);
  };
  for (const c of ['', ...HU_CASE]) if (k.endsWith(c) && k.length - c.length >= 2) nominal(k.slice(0, k.length - c.length));
  // After a consonant the v of -val/-vel, -vá/-vé becomes that consonant: ház-zal, lány-nyal, barátom-má, autónk-kal
  for (const c of ['al', 'el', 'á', 'é']) {
    if (!k.endsWith(c)) continue;
    const u = huUndouble(k.slice(0, -c.length));
    if (u) nominal(u);
  }
  // Verbs: [-hat/-het] [ending], dictionary form = stem or stem + ik
  for (const end of HU_VERB) {
    if (!k.endsWith(end)) continue;
    const st = k.slice(0, -end.length);
    consider(st, true);
    if (/h[ae]t$/.test(st)) consider(st.slice(0, -3), true);
  }
  // Imperatives whose j merged into the stem: olvass, nézz, lássa, tanítson (the stem repairs undo the merging)
  for (const end of ['', 'ak', 'ek', 'on', 'en', 'ön', 'unk', 'ünk', 'atok', 'etek', 'anak', 'enek', 'am', 'em', 'ad', 'ed', 'a', 'e',
    'uk', 'ük', 'átok', 'étek', 'ák', 'ék', 'ál', 'él']) {
    if (!k.endsWith(end)) continue;
    const st = k.slice(0, k.length - end.length);
    if (/(ss|zz|ts)$/.test(st)) consider(st, true);
  }
  if (best || depth) return best;
  // A verbal prefix in front: elmentem -> el + mentem -> megy; the prefixed verb when the dictionary has it (elmegy)
  for (const pre of HU_PREVERBS) {
    if (!k.startsWith(pre) || k.length - pre.length < 2) continue;
    const rest = k.slice(pre.length);
    const e = idx.get(rest) ?? huBase(rest, idx, 1);
    if (e && e.pos === 'v') return idx.get(pre + e.w) ?? e;
  }
  return undefined;
}

function deParticiple(k: string, idx: Map<string, Entry>): Entry | undefined {
  const m = /^(\p{L}*?)ge(\p{L}{3,}?)(t|en)$/u.exec(k);
  if (!m) return undefined;
  const [, pre, stem] = m;
  return idx.get(`${pre}${stem}en`) ?? idx.get(`${pre}${stem}n`);
}

/** Syllables a verb ending can start with once the stem is cut off (먹|었어요, 가|요, 읽|고, 좋|은…). */
const KO_ENDING_START = new Set([...'아어여았었였해했고지는은을면니서세셨시습겠기게도요자죠네나다던든라러려며거군냐잖']);

function koBase(k: string, idx: Map<string, Entry>): Entry | undefined {
  // A noun with particles and maybe the plural 들 (친구들에게 -> 친구)
  for (const p of ['', ...KO_PARTICLES]) {
    if (p && !(k.length > p.length && k.endsWith(p))) continue;
    const noun = p ? k.slice(0, -p.length) : k;
    const e = idx.get(noun) ?? (noun.length > 1 && noun.endsWith('들') ? idx.get(noun.slice(0, -1)) : undefined);
    if (e) return e;
  }
  // A verb or adjective: the longest beginning of the word + 다 that is in the vocabulary, when what follows looks like
  // an ending (먹었어요 -> 먹다; but not 사람들은 -> 사다)
  for (let n = k.length - 1; n >= 1; n--) {
    if (!KO_ENDING_START.has(k[n])) continue;
    const e = idx.get(`${k.slice(0, n)}다`);
    if (e) return e;
  }
  return undefined;
}

// ---------------- splitting the text into sentences and tokens ----------------


/**
 * Sentences of a text (pasted, a subtitle file, live subtitles: one subtitle per line).
 * Chinese, Japanese and Korean subtitles often leave out the full stop, so there each line is a sentence of its
 * own unless it ends with a mark that clearly goes on (，、,；;：: or a dash). In other languages subtitles break
 * sentences anywhere, so a line runs on into the next unless it ends a sentence (. ! ? …).
 * Then the text is split after . ! ? … (。！？ in Chinese and Japanese).
 */
function sentences(l: LangId, text: string): string[] {
  const cjk = LANGS[l].cjk && l !== 'ko';
  const end = cjk ? /(?<=[。！？!?…])/u : /(?<=[.!?…])\s+(?=\P{Ll})/u;
  const runsOn = LANGS[l].cjk
    ? (acc: string) => /[，、,；;：:—–-]$/u.test(acc)
    : (acc: string) => !/[.!?…。！？"”»」』)]$/u.test(acc);
  const paras: string[] = [];
  let acc = '';
  for (const line of text.split(/\n+/).map((x) => x.trim()).filter(Boolean)) {
    if (acc && runsOn(acc)) acc += (cjk ? '' : ' ') + line;
    else { if (acc) paras.push(acc); acc = line; }
  }
  if (acc) paras.push(acc);
  return paras.flatMap((p) => p.split(end)).map((x) => x.trim()).filter(Boolean);
}

/**
 * The pieces of a sentence: words, numbers and punctuation marks (spaces are left out; the reader puts them back).
 * zh: each run of characters is one piece (`run`), split into words later with the dictionary (segmentRun);
 * anything else in the line (Latin words, numbers, punctuation) goes through the browser's word splitter.
 * ja: the browser's word splitter (it keeps conjugated forms together).
 */
function pieces(l: LangId, sent: string): { s: string; word: boolean; run?: boolean }[] {
  const out: { s: string; word: boolean; run?: boolean }[] = [];
  if (LANGS[l].cjk && l !== 'ko') {
    const seg = new Intl.Segmenter(l, { granularity: 'word' });
    // Japanese conjugates (見ました, 行けば): the browser's splitter keeps those forms together, the dictionary can't
    if (l === 'ja') {
      for (const x of seg.segment(sent)) {
        if (!x.segment.trim()) continue;
        if (x.isWordLike) out.push({ s: x.segment, word: true });
        else for (const ch of x.segment) if (ch.trim()) out.push({ s: ch, word: false });
      }
      return out;
    }
    const other = (text: string) => {
      for (const x of seg.segment(text)) {
        if (!x.segment.trim()) continue;
        if (x.isWordLike) out.push({ s: x.segment, word: true });
        else for (const ch of x.segment) if (ch.trim()) out.push({ s: ch, word: false });
      }
    };
    for (const m of sent.matchAll(/([\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]+)|([^\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]+)/gu)) {
      if (m[1]) out.push({ s: m[1], word: true, run: true });
      else other(m[2]);
    }
    return out;
  }
  for (const m of sent.matchAll(/([\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*)|(\p{N}+(?:[.,:]\p{N}+)*)|([^\s\p{L}\p{M}\p{N}])/gu)) {
    const w = m[1];
    if (!w) { out.push({ s: m[0], word: false }); continue; }
    // Elided articles and pronouns (l'eau, dell'acqua, j'ai): "l'" and "eau" are two tokens, written without a gap
    const el = (l === 'fr' || l === 'it') ? /^(\p{L}{1,4}['’])(\p{L}.*)$/u.exec(w) : null;
    if (el) { out.push({ s: el[1], word: true }, { s: el[2], word: true }); continue; }
    out.push({ s: w, word: true });
  }
  return out;
}

/** The word to look up for a token as written: German and Dutch 's dropped ("geht's" -> "geht"). */
const lookupForm = (l: LangId, w: string) => ((l === 'de' || l === 'nl') && /['’]s$/.test(w) ? w.slice(0, -2) : w);

/**
 * zh/ja: a run of characters split into words with the dictionary: maximum matching from the front and from the back
 * (the longest known word at each step), keeping the split with fewer words, then fewer characters left unknown.
 * Single characters count as words only when they are entries of their own. Stretches no known word covers are left
 * to the browser's word splitter (names, rare words), so they come out as plausible words rather than single
 * characters.
 */
function segmentRun(l: LangId, run: string, idx: Map<string, Entry>): { e?: Entry; form: string }[] {
  const known = (form: string) => {
    const e = idx.get(form);
    return e && (form.length > 1 || e.w === form) ? e : undefined;
  };
  const MAX = 8;
  const forward = () => {
    const out: string[] = [];
    for (let i = 0; i < run.length;) {
      let n = Math.min(MAX, run.length - i);
      while (n > 1 && !known(run.slice(i, i + n))) n--;
      out.push(run.slice(i, i + n));
      i += n;
    }
    return out;
  };
  const backward = () => {
    const out: string[] = [];
    for (let j = run.length; j > 0;) {
      let n = Math.min(MAX, j);
      while (n > 1 && !known(run.slice(j - n, j))) n--;
      out.unshift(run.slice(j - n, j));
      j -= n;
    }
    return out;
  };
  const score = (ws: string[]) => [ws.length, ws.filter((w) => !known(w)).length];
  const f = forward(), b = backward();
  const [fs, bs] = [score(f), score(b)];
  const best = bs[0] < fs[0] || (bs[0] === fs[0] && bs[1] < fs[1]) ? b : f;
  // Unknown characters next to each other: the browser's splitter groups them
  const out: { e?: Entry; form: string }[] = [];
  let rest = '';
  const flush = () => {
    if (!rest) return;
    for (const x of new Intl.Segmenter(l, { granularity: 'word' }).segment(rest)) out.push({ form: x.segment });
    rest = '';
  };
  for (const w of best) {
    const e = known(w);
    if (e) { flush(); out.push({ e, form: w }); } else rest += w;
  }
  flush();
  return out;
}

/** zh/ja: a segment not in the vocabulary is split into the longest vocabulary words it contains (others: one character). */
function longestMatches(seg: string, idx: Map<string, Entry>): { e?: Entry; form: string }[] {
  const out: { e?: Entry; form: string }[] = [];
  let i = 0;
  let rest = '';
  const flush = () => { if (rest) { out.push({ form: rest }); rest = ''; } };
  while (i < seg.length) {
    let found = false;
    for (let n = Math.min(8, seg.length - i); n >= 1; n--) {
      const form = seg.slice(i, i + n);
      const e = idx.get(form);
      // single characters only when they are words on their own in the vocabulary
      if (e && (n > 1 || e.w === form)) { flush(); out.push({ e, form }); i += n; found = true; break; }
    }
    if (!found) rest += seg[i++];
  }
  flush();
  return out;
}

// ---------------- the analysis ----------------

/** A token for the reader: [as written, reading, meaning, dictionary id when the form differs]. */
function token(l: LangId, form: string, e: Entry | undefined): Token {
  if (!e) return [form, '', ''];
  const reading = form === e.w ? (readingOf(l, e) ?? '') : '';
  return norm(form) === norm(e.w) ? [form, reading, e.en] : [form, reading, e.en, e.id];
}

/** One sentence read: its tokens, the words found (entry and form), the ones not found and the word count. */
interface ReadSentence { t: Token[]; hits: [Entry, string][]; misses: string[]; count: number }

/**
 * Sentences already read, per word index: live reading re-reads the whole growing text at every new line, and only
 * the last sentence is new.
 */
const readCache = new WeakMap<Map<string, Entry>, Map<string, ReadSentence>>();

function readSentence(l: LangId, idx: Map<string, Entry>, sent: string): ReadSentence {
  const t: Token[] = [];
  const hits: [Entry, string][] = [];
  const misses: string[] = [];
  let count = 0;
  const hit = (e: Entry, form: string) => hits.push([e, form]);
  const miss = (w: string) => misses.push(w);
  for (const p of pieces(l, sent)) {
    if (!p.word) { t.push([p.s, '', '']); continue; }
    if (p.run) {
      // A run of Chinese or Japanese characters: split with the dictionary
      for (const x of segmentRun(l, p.s, idx)) {
        count++;
        if (x.e) hit(x.e, x.form); else miss(x.form);
        t.push(token(l, x.form, x.e));
      }
      continue;
    }
    count++;
    const e = baseForm(l, lookupForm(l, p.s), idx);
    if (e) { hit(e, p.s); t.push(token(l, p.s, e)); continue; }
    if (LANGS[l].cjk && l !== 'ko') {
      const parts = longestMatches(p.s, idx);
      if (parts.some((x) => x.e)) {
        for (const x of parts) {
          if (x.e) hit(x.e, x.form); else miss(x.form);
          t.push(token(l, x.form, x.e));
        }
        continue;
      }
    }
    miss(p.s);
    t.push(token(l, p.s, undefined));
  }
  return { t, hits, misses, count };
}

/**
 * Reads a text: the reader's version of it (sentences of tokens, each word linked to its vocabulary entry where one
 * was found) and the summary (words found, words not in the vocabulary).
 */
export function analyse(l: LangId, c: Content, lx: Lexicon, raw: string): Analysis & { text: Text } {
  const idx = formIndex(l, c, lx);
  let cache = readCache.get(idx);
  if (!cache) { cache = new Map(); readCache.set(idx, cache); }
  if (cache.size > 5000) cache.clear();
  const found = new Map<string, Found>();
  const unknown = new Map<string, string>();
  let count = 0;
  const s = sentences(l, raw).map((sent) => {
    let r = cache!.get(sent);
    if (!r) { r = readSentence(l, idx, sent); cache!.set(sent, r); }
    count += r.count;
    for (const [e, form] of r.hits) {
      const f = found.get(e.id);
      if (f) { f.n++; if (!f.forms.includes(form)) f.forms.push(form); }
      else found.set(e.id, { e, forms: [form], n: 1 });
    }
    for (const w of r.misses) { const k = norm(w); if (!unknown.has(k) && /\p{L}/u.test(w)) unknown.set(k, w); }
    // A copy of the tokens: the reader may not change the cached ones
    return { t: r.t.slice(), en: '' };
  }).filter((x) => x.t.length);
  const text: Text = { id: 'find', lv: 1, kind: 'article', title: '', titleEn: '', s, q: [] };
  return { found: [...found.values()], unknown: [...unknown.values()], words: count, text };
}

// ---------------- subtitle files ----------------

/** The spoken text of a subtitle file (SRT, WebVTT, ASS/SSA) or plain text: no numbers, timings or styling. */
export function subtitleText(raw: string): string {
  const lines = raw.replace(/\r/g, '').split('\n');
  const ass = /^\[Script Info\]/m.test(raw);
  const out: string[] = [];
  for (const line of lines) {
    if (ass) {
      // Dialogue: 0,0:00:01.00,0:00:03.00,Default,,0,0,0,,Text
      const m = /^Dialogue:(?:[^,]*,){9}(.*)$/.exec(line);
      if (m) out.push(m[1].replace(/\{[^}]*\}/g, '').replace(/\\[Nn]/g, ' '));
      continue;
    }
    const t = line.trim();
    if (!t || /^\d+$/.test(t) || /-->/.test(t) || /^WEBVTT/.test(t) || /^(NOTE|STYLE|REGION)\b/.test(t)) continue;
    out.push(t.replace(/<[^>]+>/g, '').replace(/\{[^}]*\}/g, ''));
  }
  return out.join('\n');
}

// ---------------- external dictionary ----------------

/** Wiktionary's name for each language (the section of a page). */
const WIKT_LANG: Record<LangId, string> = {
  de: 'German', zh: 'Chinese', es: 'Spanish', fr: 'French', it: 'Italian', pt: 'Portuguese', nl: 'Dutch', pl: 'Polish',
  ru: 'Russian', ja: 'Japanese', ko: 'Korean', hu: 'Hungarian',
};

/** A word's entry in the English Wiktionary (inflected forms have pages that point to their base form). */
export function wiktionary(l: LangId, w: string): string {
  // German keeps its capitals (nouns are capitalised); elsewhere a capital only means the start of a sentence
  const word = l === 'de' ? w : w.toLowerCase();
  return `https://en.wiktionary.org/wiki/${encodeURIComponent(word)}#${WIKT_LANG[l]}`;
}
