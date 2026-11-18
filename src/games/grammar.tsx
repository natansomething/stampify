import { useMemo, useState } from 'preact/hooks';
import { PRONOUNS, TENSES, type DrillItem, type Verb } from '../content/types';
import { inBand, LANG_IDS, LANGS } from '../core/langs';
import { article, collection, withArticle, wordPool, type Entry } from '../core/lexicon';
import { XP } from '../core/progress';
import { cls, compare, norm, pick, sample, shuffle } from '../core/util';
import { Choice, Py, useKeys } from '../ui/components';
import { Session, type RoundApi } from '../ui/session';
import { pickWords, TypeAnswer } from './common';
import type { Ctx, GameDef } from './types';

/** Items in the band; if the band has too few, items up to the band's top level; then everything. */
function byBand<T extends { lv: number }>(ctx: Ctx, items: T[], min = 5): T[] {
  const a = items.filter((x) => inBand(x.lv, ctx.band));
  if (a.length >= min || ctx.band === 0) return a.length ? a : items;
  const b = items.filter((x) => x.lv <= ctx.band * 2);
  return b.length >= min ? b : items;
}

// ---------------- Grammar drill (one deck per card) ----------------

function Drill({ ctx }: { ctx: Ctx }) {
  const deck = ctx.c.drills.find((d) => d.id === ctx.arg);
  if (!deck) return <p class="empty muted">This drill does not exist.</p>;
  return (
    <Session lang={ctx.lang} id={`drill-${deck.id}`} title={deck.name} exit={ctx.exit}
      prepare={() => sample(deck.items, 10)}>
      {(api, items) => <DrillRound key={api.i} ctx={ctx} it={items[api.i]} api={api} />}
    </Session>
  );
}

function DrillRound({ ctx, it, api }: { ctx: Ctx; it: DrillItem; api: RoundApi }) {
  const cjk = LANGS[ctx.lang].cjk;
  const [before, after] = it.s.split('___');
  // An elided answer joins the next word: "un'" + " aranciata" -> "un'aranciata"
  const fill = (o: string) => before + o + (/['’]$/.test(o) ? after.replace(/^ /, '') : after);
  const full = fill(it.o[it.a]);
  return (
    <div>
      <div class="prompt">
        <div class="label">Choose the right form</div>
        <div class={cls('sentence', cjk && 'cjk')} lang={ctx.lang}>{before}<span style={{ borderBottom: '3px solid var(--accent)', padding: '0 14px' }}>&nbsp;</span>{after}</div>
        {it.r && <div class="reading" style={{ fontSize: '0.95rem' }}><Py text={it.r} /></div>}
        <div class="muted" style={{ marginTop: 8 }}>{it.en}</div>
      </div>
      <Choice cjk={cjk ? ctx.lang : undefined} columns={it.o.length > 2 ? undefined : 2} options={it.o} answer={it.a}
        onDone={(ok) => { api.answer(ok, { say: full, show: <span lang={ctx.lang}>{full}</span>, note: it.x }); }} />
    </div>
  );
}

// ---------------- Gender: der / die / das, el / la, de / het, on / ona / ono… ----------------

function genderNouns(ctx: Ctx): Entry[] {
  const genders = LANGS[ctx.lang].gender?.genders || [];
  // Spanish el agua is feminine but takes el: leave such nouns out of an article game
  const ok = (e: Entry) => e.pos === 'n' && !!e.g && genders.includes(e.g) && (ctx.lang !== 'es' || article(ctx.lang, e) === (e.g === 'm' ? 'el' : 'la'));
  return wordPool(ctx.lx).words.filter(ok);
}

/** Verbs with conjugation tables: the band's, or in "My words" mode the ones whose infinitive is collected. */
function conjVerbs(ctx: Ctx): Verb[] {
  if (!ctx.mine) return byBand(ctx, ctx.c.verbs, 6);
  const saved = new Set(collection(ctx.lx).map((e) => e.w.toLowerCase()));
  return ctx.c.verbs.filter((v) => saved.has(v.inf.toLowerCase()));
}

/** Words for the Spanish accent game. */
function accentPool(ctx: Ctx): Entry[] {
  return ctx.mine ? wordPool(ctx.lx).words : byBand(ctx, ctx.lx.vocab, 20);
}
const accented = (e: Entry) => /[áéíóúü]/.test(e.w) && e.w.length <= 16;

function Gender({ ctx }: { ctx: Ctx }) {
  const { labels, genders, name } = LANGS[ctx.lang].gender!;
  // What the feedback shows: the noun with its article, or (no articles) the noun and its gender word
  const shown = (e: Entry) => (article(ctx.lang, e) ? withArticle(ctx.lang, e) : `${e.w} (${labels[genders.indexOf(e.g!)]})`);
  return (
    <Session lang={ctx.lang} id="gender" title={name} exit={ctx.exit} prepare={() => pickWords(ctx, genderNouns(ctx), 15)}>
      {(api, items) => {
        const e = items[api.i];
        return (
          <div key={api.i}>
            <div class="prompt">
              <div class="label">{article(ctx.lang, e) ? 'Which article?' : 'Which gender?'}</div>
              <div class="word" lang={ctx.lang}>{e.w}</div>
              <div class="reading">{e.en}</div>
            </div>
            <Choice columns={2} fixedOrder options={labels} answer={genders.indexOf(e.g!)}
              onDone={(ok) => {
                api.answer(ok, { say: withArticle(ctx.lang, e), word: e.id, show: <span lang={ctx.lang}>{shown(e)}{e.pl && e.pl !== '-' ? ` · die ${e.pl}` : ''}</span> });
              }} />
          </div>
        );
      }}
    </Session>
  );
}

// ---------------- German plurals ----------------

function umlaut(w: string): string {
  const m = w.match(/^(.*)(au|a|o|u)([^aeiouäöü]*(?:e[lnr]?)?)$/i);
  if (!m) return w;
  const map: Record<string, string> = { au: 'äu', a: 'ä', o: 'ö', u: 'ü', Au: 'Äu', A: 'Ä', O: 'Ö', U: 'Ü' };
  return m[1] + (map[m[2]] || m[2]) + m[3];
}

function pluralOptions(e: Entry): { opts: string[]; ans: number } {
  const w = e.w;
  const u = umlaut(w);
  const cands = [w + 'e', w.endsWith('e') ? w + 'n' : w + 'en', w + 'er', w + 's', w, u + 'e', u + 'er', u];
  const ds = shuffle([...new Set(cands)].filter((c) => c !== e.pl)).slice(0, 3);
  const opts = shuffle([e.pl!, ...ds]);
  return { opts, ans: opts.indexOf(e.pl!) };
}

function Plurals({ ctx }: { ctx: Ctx }) {
  return (
    <Session lang={ctx.lang} id="plurals" title="Plurals" exit={ctx.exit}
      prepare={() => pickWords(ctx, genderNouns(ctx).filter((e) => e.pl && e.pl !== '-'), 12).map((e) => ({ e, ...pluralOptions(e) }))}>
      {(api, items) => {
        const q = items[api.i];
        return (
          <div key={api.i}>
            <div class="prompt">
              <div class="label">What is the plural?</div>
              <div class="word" lang="de">{article('de', q.e)} {q.e.w}</div>
              <div class="reading">{q.e.en}</div>
            </div>
            <Choice columns={2} options={q.opts.map((o) => `die ${o}`)} answer={q.ans}
              onDone={(ok) => { api.answer(ok, { say: `die ${q.e.pl}`, word: q.e.id, show: <span lang="de">{article('de', q.e)} {q.e.w} → die {q.e.pl}</span> }); }} />
          </div>
        );
      }}
    </Session>
  );
}

// ---------------- Conjugation ----------------

interface ConjQ { v: Verb; tense: string; p: number }

function Conjugation({ ctx }: { ctx: Ctx }) {
  const lang = ctx.lang;
  return (
    <Session lang={ctx.lang} id="conj" title={ctx.arg && TENSES[lang]!.includes(ctx.arg) ? `Conjugation: ${ctx.arg}` : 'Conjugation'} exit={ctx.exit}
      prepare={() => {
        const verbs = conjVerbs(ctx);
        // A link may ask for one tense (#/de/play/conj/Präteritum)
        const tenses = TENSES[lang]!.includes(ctx.arg || '') ? [ctx.arg!] : TENSES[lang]!;
        const persons = PRONOUNS[lang]!.length;
        // Easier tenses come up more often at lower levels
        const weights = ctx.band === 1 ? [6, 2, 2, 1, 1] : [1, 1, 1, 1, 1];
        const tensePool = tenses.flatMap((t, k) => Array(weights[k] ?? 1).fill(t));
        // A tense a verb doesn't really have is not asked: hu intransitive verbs carry copies of their indefinite forms
        // as "definite" tables (for word look-ups), e.g. megy
        const real = (v: Verb, t: string) => !!v.f[t] && !TENSES[lang]!.some((o) => o !== t && TENSES[lang]!.indexOf(o) < TENSES[lang]!.indexOf(t) && v.f[o]?.join() === v.f[t].join());
        return Array.from({ length: 10 }, (): ConjQ => {
          for (let k = 0; ; k++) {
            const v = pick(verbs), tense = pick(tensePool);
            if (real(v, tense) || k > 50) return { v, tense, p: Math.floor(Math.random() * persons) };
          }
        });
      }}>
      {(api, items) => <ConjRound key={api.i} ctx={ctx} q={items[api.i]} api={api} />}
    </Session>
  );
}

function ConjRound({ ctx, q, api }: { ctx: Ctx; q: ConjQ; api: RoundApi }) {
  const lang = ctx.lang;
  const [st, setSt] = useState<'ok' | 'bad' | null>(null);
  const persons = PRONOUNS[lang]!;
  const pron = persons[q.p];
  // Forms may list alternatives ("alszom/alszok"): either is right
  const form = q.v.f[q.tense][q.p];
  const forms = form.split('/').map((x) => x.trim());
  return (
    <div>
      <div class="prompt">
        <div class="label">{q.tense}</div>
        <div class="word" lang={lang}>{q.v.inf}</div>
        <div class="reading">{q.v.en}</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 900, marginTop: 14 }} lang={lang}>{pron} ____</div>
      </div>
      <TypeAnswer lang={lang} state={st} placeholder="Type the verb form" onCheck={(v) => {
        // Allow the pronoun to be typed too
        const typed = norm(v).replace(new RegExp(`^(${pron.split('/').map((p) => norm(p)).join('|')})\\s+`), '');
        const verdict = compare(typed, forms);
        const ok = verdict !== 'wrong';
        setSt(ok ? 'ok' : 'bad');
        const verb = ctx.lx.byLower.get(q.v.inf.toLowerCase());
        api.answer(ok, {
          xp: XP.correct + 1,
          save: verb && [verb],
          say: `${pron.split('/')[0]} ${forms[0]}`,
          show: <span lang={lang}>{pron} {form}</span>,
          note: (
            <span lang={lang}>
              {verdict === 'close' && <>Almost: watch the accents and special letters.<br /></>}
              {persons.map((p, k) => <span key={k} style={{ fontWeight: k === q.p ? 900 : 500 }}>{p.split('/')[0]} {q.v.f[q.tense][k]}{k < persons.length - 1 ? ' · ' : ''}</span>)}
            </span>
          ),
        });
      }} />
    </div>
  );
}

// ---------------- Spanish accents ----------------

const ACUTE: Record<string, string> = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' };
const BARE: Record<string, string> = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u' };
const bare = (w: string) => [...w].map((c) => BARE[c] ?? c).join('');

function Accents({ ctx }: { ctx: Ctx }) {
  return (
    <Session lang="es" id="accents" title="Accents" exit={ctx.exit}
      prepare={() => {
        const pool = accentPool(ctx);
        const withA = pool.filter(accented);
        const without = pool.filter((e) => !/[áéíóúü]/.test(e.w) && /[aeiou].*[aeiou]/.test(e.w) && e.w.length <= 14);
        return shuffle([...pickWords(ctx, withA, 8), ...pickWords(ctx, without, 2)]);
      }}>
      {(api, items) => <AccentRound key={api.i} e={items[api.i]} api={api} />}
    </Session>
  );
}

function AccentRound({ e, api }: { e: Entry; api: RoundApi }) {
  const start = useMemo(() => [...bare(e.w)], [e]);
  const [letters, setLetters] = useState(start);
  const [done, setDone] = useState(false);
  const toggle = (k: number) => {
    if (done) return;
    const c = letters[k];
    const b = BARE[c] ?? c;
    // a → á → a; u → ú → ü → u
    const nextC = c === b ? ACUTE[b] : b === 'u' && c === 'ú' ? 'ü' : b;
    setLetters(letters.map((x, i) => (i === k ? nextC : x)));
  };
  const check = () => {
    setDone(true);
    const ok = letters.join('') === e.w;
    api.answer(ok, { say: e.w, word: e.id, show: <span lang="es">{e.w} — {e.en}</span>, note: /[áéíóúü]/.test(e.w) ? undefined : 'This word has no written accent.' });
  };
  useKeys((ev) => { if (ev.key === 'Enter' && !done) { ev.preventDefault(); check(); } }, [letters, done]);
  return (
    <div>
      <div class="prompt">
        <div class="label">Add the missing accents</div>
        <div class="reading">{e.en}</div>
      </div>
      <div class="letters" lang="es">
        {letters.map((c, k) => {
          const vowel = (BARE[c] ?? c) in ACUTE;
          return c === ' '
            ? <span key={k} style={{ width: 14 }} />
            : <button key={k} class={cls('letter', vowel && 'vowel')} disabled={!vowel || done} onClick={() => toggle(k)}>{c}</button>;
        })}
      </div>
      <p class="kbd center" style={{ marginTop: 12 }}>Tap a vowel to add or remove an accent. Some words have none.</p>
      {!done && <div class="sticky-action"><div><button class="btn primary block" onClick={check}>Check</button></div></div>}
    </div>
  );
}

export const GRAMMAR_GAMES: GameDef[] = [
  // One gender game per language with grammatical gender; its name and buttons come from LANGS
  ...LANG_IDS.filter((l) => LANGS[l].gender).map((l): GameDef => ({
    id: 'gender', name: LANGS[l].gender!.name, desc: LANGS[l].gender!.desc, cat: 'special', langs: [l], mine: true,
    check: (ctx) => (genderNouns(ctx).length >= 5 ? null : ctx.mine ? 'Save at least 5 nouns to play' : 'Not enough nouns at this level yet'), Comp: Gender,
  })),
  {
    id: 'plurals', name: 'Plurals', desc: 'Hund → Hunde, Kind → Kinder…', cat: 'special', langs: ['de'], mine: true,
    check: (ctx) => (genderNouns(ctx).filter((e) => e.pl && e.pl !== '-').length >= 5 ? null : ctx.mine ? 'Save at least 5 nouns with a plural to play' : 'Not enough nouns'), Comp: Plurals,
  },
  {
    id: 'conj', name: 'Conjugation', desc: 'Type the verb form for each person and tense.', cat: 'special', langs: LANG_IDS.filter((l) => TENSES[l]), mine: true,
    check: (ctx) => (conjVerbs(ctx).length ? null : ctx.mine ? 'Save some common verbs to play' : 'Verbs are coming soon'), Comp: Conjugation,
  },
  {
    id: 'accents', name: 'Accents', desc: 'Put the missing accent marks back.', cat: 'special', langs: ['es'], mine: true,
    check: (ctx) => (accentPool(ctx).filter(accented).length >= 3 ? null : 'Save at least 3 words with accents to play'), Comp: Accents,
  },
];

/** Grammar decks are listed one card per deck; this is the shared player. */
export const DRILL_GAME: GameDef = { id: 'drill', name: 'Grammar drill', desc: '', cat: 'grammar', Comp: Drill };
