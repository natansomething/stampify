import { useMemo, useState } from 'preact/hooks';
import { LANGS } from '../core/langs';
import { alternatives, article, firstSense, readingOf, withArticle, wordPool, type Entry } from '../core/lexicon';
import { plain } from '../core/pinyin';
import { autoSpeak } from '../core/speech';
import { sentenceStats, wordStats, XP } from '../core/progress';
import { cls, compare, pick, shuffle } from '../core/util';
import { Choice, Py, WordView } from '../ui/components';
import { Session } from '../ui/session';
import { choices, meaning, pickSentences, pickWords, TypeAnswer } from './common';
import type { Ctx, GameDef } from './types';

/** The words the vocabulary games draw from: how many are in the collection and mastered. */
export const poolStats = (ctx: Ctx) => wordStats(ctx.lang, wordPool(ctx.lx).words.map((e) => e.id));

const needWords = (n: number) => (ctx: Ctx) =>
  wordPool(ctx.lx).words.length >= n ? null : ctx.mine ? `Save at least ${n} words to play` : 'Not enough words at this level';

/** Odd one out needs two topics with three words each. */
function topicGroups(words: Entry[]): Map<string, Entry[]> {
  const byTopic = new Map<string, Entry[]>();
  words.forEach((w) => w.t && byTopic.set(w.t, [...(byTopic.get(w.t) || []), w]));
  return byTopic;
}
const needTopics = (ctx: Ctx) =>
  [...topicGroups(wordPool(ctx.lx).words).values()].filter((g) => g.length >= 3).length >= 2
    ? null : ctx.mine ? 'Needs 3 saved words on each of two topics' : 'Not enough words at this level';

/**
 * Odd one out's questions: every topic's words in fixed groups of three (in id order), so the set of questions is
 * the same each time and each one is repeated like a flashcard ("odd:" + the three ids).
 */
function oddQuestions(ctx: Ctx): { id: string; t: string; group: Entry[] }[] {
  const byTopic = topicGroups(wordPool(ctx.lx).words);
  if ([...byTopic.values()].filter((g) => g.length >= 3).length < 2) return [];
  return [...byTopic].flatMap(([t, ws]) => {
    const sorted = [...ws].sort((a, b) => (a.id < b.id ? -1 : 1));
    return Array.from({ length: Math.floor(sorted.length / 3) }, (_, k) => {
      const group = sorted.slice(k * 3, k * 3 + 3);
      return { id: `odd:${group.map((e) => e.id).join('|')}`, t, group };
    });
  });
}
const oddStats = (ctx: Ctx) => sentenceStats(ctx.lang, oddQuestions(ctx).map((q) => q.id), 'questions');

/** Shows a word plus its meaning, for feedback bars. */
export function Reveal({ ctx, e }: { ctx: Ctx; e: Entry }) {
  const r = readingOf(ctx.lang, e);
  return (
    <span>
      <span lang={ctx.lang}>{withArticle(ctx.lang, e)}</span>
      {r && <> · <Py text={r} /></>} — {e.en}
    </span>
  );
}

// ---------------- Quiz ----------------

type QuizMode = 'meaning' | 'word' | 'pinyin';

function Quiz({ ctx }: { ctx: Ctx }) {
  const cjk = LANGS[ctx.lang].cjk;
  return (
    <Session
      lang={ctx.lang} id="quiz" title="Quiz" stats={() => poolStats(ctx)} exit={ctx.exit}
      prepare={() => {
        const { words } = wordPool(ctx.lx);
        const pool = words.length >= 8 ? words : ctx.lx.vocab;
        const modes: QuizMode[] = LANGS[ctx.lang].reading ? ['meaning', 'word', 'pinyin'] : ['meaning', 'word'];
        return pickWords(ctx, words, 10).map((e, k) => {
          // "How is it read?" only for words that have a reading of their own (not ja words written in kana)
          const mode = modes[k % modes.length] === 'pinyin' && !readingOf(ctx.lang, e) ? 'meaning' : modes[k % modes.length];
          const key = mode === 'meaning' ? (x: Entry) => meaning(x) : mode === 'pinyin' ? (x: Entry) => plain(x.r || '') : (x: Entry) => x.w;
          return { e, mode, ...choices(e, mode === 'pinyin' ? pool.filter((x) => readingOf(ctx.lang, x)) : pool, key) };
        });
      }}
    >
      {(api, items) => {
        const q = items[api.i];
        const label = q.mode === 'meaning' ? 'What does this mean?' : q.mode === 'word' ? 'Which word means…' : 'How is it read?';
        return (
          <div key={api.i}>
            <div class="prompt">
              <div class="label">{label}</div>
              {q.mode === 'word'
                ? <div class="word" style={{ fontSize: '1.8rem' }}>{firstSense(q.e.en)}</div>
                : <WordView lang={ctx.lang} e={q.e} big reading={q.mode !== 'pinyin'} />}
            </div>
            <Choice
              cjk={cjk && q.mode === 'word' ? ctx.lang : undefined}
              options={q.opts.map((o) => (q.mode === 'meaning' ? meaning(o) : q.mode === 'pinyin' ? <Py text={o.r || ''} /> : withArticle(ctx.lang, o)))}
              answer={q.ans}
              onDone={(ok) => { api.answer(ok, { say: q.e.w, word: q.e.id, show: <Reveal ctx={ctx} e={q.e} /> }); }}
            />
          </div>
        );
      }}
    </Session>
  );
}

// ---------------- Match pairs ----------------

function Match({ ctx }: { ctx: Ctx }) {
  return (
    <Session
      lang={ctx.lang} id="match" title="Match pairs" stats={() => poolStats(ctx)} exit={ctx.exit}
      prepare={() => {
        const words = pickWords(ctx, wordPool(ctx.lx).words, 15);
        const boards: Entry[][] = [];
        for (let k = 0; k + 3 <= words.length && boards.length < 3; k += 5) boards.push(words.slice(k, k + 5));
        return boards;
      }}
    >
      {(api, boards) => <MatchBoard key={api.i} ctx={ctx} words={boards[api.i]} onScore={api.score} onDone={api.next} />}
    </Session>
  );
}

function MatchBoard({ ctx, words, onScore, onDone }: {
  ctx: Ctx; words: Entry[]; onScore: (ok: boolean, o?: { word?: string }) => void; onDone: () => void;
}) {
  const left = useMemo(() => shuffle(words), [words]);
  const right = useMemo(() => shuffle(words), [words]);
  const [sel, setSel] = useState<Entry | null>(null);
  const [gone, setGone] = useState<Set<string>>(new Set());
  const [bad, setBad] = useState<string | null>(null);
  const cjk = LANGS[ctx.lang].cjk;

  const tryPair = (a: Entry, b: Entry) => {
    if (a.id === b.id) {
      const g = new Set(gone).add(a.id);
      setGone(g);
      setSel(null);
      autoSpeak(ctx.lang, a.w);
      onScore(true, { word: a.id });
      if (g.size === words.length) setTimeout(onDone, 350);
    } else {
      setBad(b.id);
      onScore(false, { word: a.id });
      setTimeout(() => setBad(null), 400);
      setSel(null);
    }
  };

  return (
    <div>
      <div class="prompt"><div class="label">Tap the matching pairs</div></div>
      <div class="match-grid">
        <div class="options" style={{ marginTop: 0 }}>
          {left.map((e) => (
            <button key={e.id} lang={ctx.lang} class={cls('opt', cjk && 'cjk-opt', sel?.id === e.id && 'picked', gone.has(e.id) && 'gone')} onClick={() => setSel(e)}>
              <span class="grow" lang={ctx.lang}>{withArticle(ctx.lang, e)}</span>
            </button>
          ))}
        </div>
        <div class="options" style={{ marginTop: 0 }}>
          {right.map((e) => (
            <button key={e.id} class={cls('opt', gone.has(e.id) && 'gone', bad === e.id && 'wrong')} disabled={!sel} onClick={() => sel && tryPair(sel, e)}>
              <span class="grow">{meaning(e)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------- Odd one out ----------------

function OddOne({ ctx }: { ctx: Ctx }) {
  const cjk = LANGS[ctx.lang].cjk;
  return (
    <Session
      lang={ctx.lang} id="odd" title="Odd one out" stats={() => oddStats(ctx)} exit={ctx.exit}
      prepare={() => {
        const pool = wordPool(ctx.lx).words.filter((w) => w.t);
        // A fixed question is three words of one topic; the odd word from another topic is picked each time
        return pickSentences(ctx, oddQuestions(ctx), 8).map(({ id, t, group }) => {
          const odd = pick(pool.filter((w) => w.t !== t));
          const opts = shuffle([...group, odd]);
          return { id, t, odd, opts, ans: opts.indexOf(odd) };
        });
      }}
    >
      {(api, items) => {
        const q = items[api.i];
        return (
          <div key={api.i}>
            <div class="prompt"><div class="label">Which word doesn't belong?</div></div>
            <Choice
              columns={2}
              options={q.opts.map((o) => (
                <div class="center">
                  <div lang={ctx.lang} style={{ fontSize: cjk ? '1.5rem' : '1.1rem', fontWeight: cjk ? 500 : 800 }}>{o.w}</div>
                  {readingOf(ctx.lang, o) && <div class="small muted"><Py text={readingOf(ctx.lang, o)!} /></div>}
                </div>
              ))}
              answer={q.ans}
              onDone={(ok) => api.answer(ok, {
                word: q.odd.id,
                item: q.id,
                save: q.opts,
                show: <span>{q.odd.w} ({meaning(q.odd)}) is about <b>{q.odd.t}</b>; the others are about <b>{q.t}</b>.</span>,
                note: q.opts.filter((o) => o !== q.odd).map((o) => `${o.w} = ${meaning(o)}`).join(' · '),
              })}
            />
          </div>
        );
      }}
    </Session>
  );
}

// ---------------- Type it ----------------

function TypeIt({ ctx }: { ctx: Ctx }) {
  return (
    <Session lang={ctx.lang} id="type" title="Type it" stats={() => poolStats(ctx)} exit={ctx.exit}
      prepare={() => pickWords(ctx, wordPool(ctx.lx).words.filter((w) => w.pos !== 'phr'), 10)}>
      {(api, items) => <TypeRound key={api.i} ctx={ctx} e={items[api.i]} api={api} />}
    </Session>
  );
}

function TypeRound({ ctx, e, api }: { ctx: Ctx; e: Entry; api: import('../ui/session').RoundApi }) {
  const [st, setSt] = useState<'ok' | 'bad' | null>(null);
  return (
    <div>
      <div class="prompt">
        <div class="label">Type the {LANGS[ctx.lang].name} word</div>
        <div class="word" style={{ fontSize: '1.8rem' }}>{e.en}</div>
        {e.pos === 'n' && <div class="reading">noun{article(ctx.lang, e) ? ' (article optional)' : ''}</div>}
      </div>
      <TypeAnswer lang={ctx.lang} state={st} onCheck={(v) => {
        let verdict = compare(v, [e.w, withArticle(ctx.lang, e)]);
        // A synonym is right too; the learner just learns which word the card meant.
        const alt = verdict === 'wrong' ? alternatives(ctx.lx, e).find((a) => compare(v, a.forms) !== 'wrong') : undefined;
        if (alt) verdict = compare(v, alt.forms);
        const ok = verdict !== 'wrong';
        setSt(ok ? 'ok' : 'bad');
        api.answer(ok, {
          say: e.w,
          word: e.id, xp: XP.correct + 1,
          show: alt
            ? <span><span lang={ctx.lang}>{alt.w}</span> is correct, but I had <b lang={ctx.lang}>{withArticle(ctx.lang, e)}</b> in mind.</span>
            : <span lang={ctx.lang}>{withArticle(ctx.lang, e)}</span>,
          note: verdict === 'close' ? 'Almost: watch the accents and special letters.' : undefined,
        });
      }} />
    </div>
  );
}

export const VOCAB_GAMES: GameDef[] = [
  { id: 'quiz', progress: poolStats, name: 'Quiz', desc: 'Pick the right meaning, word or reading.', cat: 'vocab', mine: true, check: needWords(4), Comp: Quiz },
  { id: 'match', progress: poolStats, name: 'Match pairs', desc: 'Connect words with their meanings.', cat: 'vocab', mine: true, check: needWords(5), Comp: Match },
  { id: 'odd', progress: oddStats, name: 'Odd one out', desc: 'Find the word from another topic.', cat: 'vocab', mine: true, check: needTopics, Comp: OddOne },
  { id: 'type', progress: poolStats, name: 'Type it', desc: 'See the English, type the word.', cat: 'vocab', typed: true, mine: true, check: needWords(4), Comp: TypeIt },
];
