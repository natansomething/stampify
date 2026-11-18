/**
 * Checks the Hungarian ending analysis (huBase in src/core/finder.ts) on inflected forms: stacked endings, stem changes,
 * verbs (definite/indefinite, -hat/-het, moods), irregular verbs (from verbs.ts) and verbal prefixes.
 * Run after changing it:  npm run test:hu
 */
export {};
const g = globalThis as any; g.window = g; g.addEventListener = () => {}; g.document = { addEventListener() {} }; g.localStorage = { getItem: () => null, setItem() {} };
const { analyse } = await import('../src/core/finder');
const { lexicon } = await import('../src/core/lexicon');
const W = (w: string, pos: string) => ({ w, en: w, lv: 1, pos });
const vocab = [W('ház', 'n'), W('ló', 'n'), W('kenyér', 'n'), W('bokor', 'n'), W('alma', 'n'), W('madár', 'n'), W('víz', 'n'), W('szó', 'n'), W('kő', 'n'),
  W('lány', 'n'), W('barát', 'n'), W('kéz', 'n'), W('levél', 'n'), W('terem', 'n'), W('autó', 'n'), W('szép', 'adj'),
  W('tanul', 'v'), W('dolgozik', 'v'), W('lát', 'v'), W('olvas', 'v'), W('mond', 'v'), W('ír', 'v'), W('néz', 'v'), W('érez', 'v'), W('tanít', 'v'),
  W('megcsinál', 'v'), W('csinál', 'v'), W('elmegy', 'v'), W('megy', 'v'), W('szeret', 'v'), W('vár', 'v'), W('kér', 'v'), W('beszél', 'v'),
  W('én', 'pron'), W('te', 'pron'), W('ő', 'pron'), W('mi', 'pron'), W('jó', 'adj'), W('nagy', 'adj'), W('szép', 'adj'), W('sok', 'pron'), W('megbocsát', 'v'), W('befejez', 'v')];
const verbs = (await import('../src/content/hu/verbs')).default;
for (const v of verbs) if (!vocab.some((x) => x.w === v.inf)) vocab.push(W(v.inf, 'v'));
const c: any = { vocab, texts: [], sentences: [], verbs, dialogues: [], drills: [], notes: [], quizzes: [], library: [] };
const lx = lexicon('hu' as any, c);
const cases: [string, string][] = [
  ['házaimban', 'ház'], ['házakat', 'ház'], ['házzal', 'ház'], ['lovakat', 'ló'], ['lovam', 'ló'], ['kenyeret', 'kenyér'], ['bokrot', 'bokor'],
  ['almát', 'alma'], ['almában', 'alma'], ['madarak', 'madár'], ['vizet', 'víz'], ['szavakat', 'szó'], ['kövek', 'kő'], ['lánnyal', 'lány'],
  ['barátommá', 'barát'], ['kezemben', 'kéz'], ['leveleket', 'levél'], ['termet', 'terem'], ['autónkkal', 'autó'], ['szépek', 'szép'],
  ['tanulok', 'tanul'], ['tanultam', 'tanul'], ['tanulnék', 'tanul'], ['tanulhatnánk', 'tanul'], ['dolgozom', 'dolgozik'], ['dolgoztunk', 'dolgozik'],
  ['látom', 'lát'], ['lássa', 'lát'], ['olvass', 'olvas'], ['mondta', 'mond'], ['mondani', 'mond'], ['írjátok', 'ír'], ['nézz', 'néz'], ['érzem', 'érez'],
  ['tanítson', 'tanít'], ['megcsináltuk', 'megcsinál'], ['megcsinálta', 'megcsinál'], ['elmentem', 'megy'], ['szeretlek', 'szeret'], ['várjatok', 'vár'],
  ['kérem', 'kér'], ['vagyok', 'van'], ['voltunk', 'van'], ['legyen', 'van'], ['mész', 'megy'], ['menjünk', 'megy'], ['jöttek', 'jön'], ['gyere', 'jön'], ['ettem', 'eszik'], ['igyál', 'iszik'], ['tettem', 'tesz'], ['vidd', 'visz'], ['aludtam', 'alszik'], ['enni', 'eszik'], ['kimentünk', 'megy'], ['megettük', 'eszik'], ['beszélünk', 'beszél'], ['beszélgetni', '(none)'], ['nekem', 'én'], ['veled', 'te'], ['belőle', 'ő'], ['minket', 'mi'], ['nagyobb', 'nagy'], ['legjobb', 'jó'], ['legszebbek', 'szép'], ['nagyobbat', 'nagy'], ['több', 'sok'], ['bocsáss', 'megbocsát'], ['fejezd', 'befejez'],
];
let ok = 0;
for (const [form, want] of cases) {
  const r = analyse('hu' as any, c, lx, form);
  const got = r.found[0]?.e.w ?? '(none)';
  const pass = got === want || (want === 'megy' && got === 'elmegy');
  if (pass) ok++; else console.log('FAIL', form, '->', got, 'want', want);
}
console.log(`${ok}/${cases.length}`);
process.exit(ok === cases.length ? 0 : 1);
