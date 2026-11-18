import { useEffect, useMemo, useState } from 'preact/hooks';
import type { Dialogue, Line, Sentence, Token } from '../content/types';
import { BANDS, inBand, type Band } from '../core/langs';
import { readingOf, tokenId, withArticle, wordPool, type Entry } from '../core/lexicon';
import { sentenceReading } from '../core/examples';
import { plain } from '../core/pinyin';
import { autoSpeak, hasVoice, speak } from '../core/speech';
import { sentenceStats, setProgress, XP } from '../core/progress';
import { commit, lang, state, useStore } from '../core/store';
import { cls, compare, norm, pick, sample, shuffle, type Verdict } from '../core/util';
import { Choice, Empty, ProgressItem, Py, Switch } from '../ui/components';
import { Icon } from '../ui/icons';
import { Session, type RoundApi } from '../ui/session';
import { bandSentences, choices, collectedTokens, isPunct, joinTokens, meaning, pickSentences, TypeAnswer } from './common';
import { LANGS } from '../core/langs';
import { poolStats, Reveal } from './vocab';
import type { Ctx, GameDef } from './types';

const words = (s: Sentence) => s.t.filter((t) => !isPunct(t));
const text = (ctx: Ctx, t: Token[]) => joinTokens(ctx.lang, t);

function SentenceText({ ctx, s, gap }: { ctx: Ctx; s: Sentence; gap?: number }) {
  const toks = s.t.map((t, i) => (i === gap ? '____' : t[0]));
  return <div class={cls('sentence', LANGS[ctx.lang].cjk && 'cjk')} lang={ctx.lang}>{joinTokens(ctx.lang, toks)}</div>;
}

/**
 * Typed answers in languages with a reading aid: besides the script, accept the reading typed in Latin letters
 * (zh pinyin without tones, ko romanization) or, for Japanese, kana. Spaces never matter in zh/ja.
 */
function compareTyped(ctx: Ctx, input: string, script: string | string[], reading?: string): Verdict {
  const unspaced = !LANGS[ctx.lang].spaced;
  const squash = (x: string) => (unspaced ? x.replace(/\s+/g, '') : x);
  const verdict = compare(squash(input), (Array.isArray(script) ? script : [script]).map(squash));
  if (verdict !== 'wrong' || !reading) return verdict;
  if (ctx.lang === 'ja') return compare(squash(input), squash(reading));
  const letters = (x: string) => plain(x).replace(/[^a-z]/g, '');
  return letters(input) && letters(input) === letters(reading) ? 'ok' : 'wrong';
}

/** Placeholder for typing what you heard. */
const typePrompt = (ctx: Ctx, what: string) =>
  ctx.lang === 'zh' ? '汉字 or pinyin' : ctx.lang === 'ja' ? 'Kana or kanji' : ctx.lang === 'ko' ? '한글 or romanization' : `Type the ${what}`;

// What each sentence game draws from
const BUILD = (s: Sentence) => words(s).length >= 3 && words(s).length <= 12;
const GAP = (s: Sentence) => words(s).length >= 3;
const SPOT = (s: Sentence) => !!s.err;
const DICTATE = (s: Sentence) => words(s).length <= 10;
const stats = (f: (s: Sentence) => boolean) => (ctx: Ctx) => sentenceStats(ctx.lang, bandSentences(ctx, f).map((s) => s.id));

const needSentences = (f: (s: Sentence) => boolean = () => true) => (ctx: Ctx) =>
  bandSentences(ctx, f).length >= 3 ? null : ctx.mine ? 'Save more words: too few sentences use them yet' : 'Sentences for this language are coming soon';
const needVoice = (ctx: Ctx) => (hasVoice(ctx.lang) ? null : `No ${LANGS[ctx.lang].name} voice on this device`);

// ---------------- Sentence builder ----------------

function Builder({ ctx }: { ctx: Ctx }) {
  return (
    <Session lang={ctx.lang} id="builder" title="Sentence builder" exit={ctx.exit}
      stats={() => stats(BUILD)(ctx)} prepare={() => pickSentences(ctx, bandSentences(ctx, BUILD), 6)}>
      {(api, items) => <BuildRound key={api.i} ctx={ctx} s={items[api.i]} api={api} />}
    </Session>
  );
}

function BuildRound({ ctx, s, api }: { ctx: Ctx; s: Sentence; api: RoundApi }) {
  const target = words(s);
  // Keep the original index on each tile so repeated words work
  const tiles = useMemo(() => {
    let sh = shuffle(target.map((t, i) => ({ t, i })));
    if (sh.every((x, k) => x.i === k) && sh.length > 1) sh = [...sh.slice(1), sh[0]];
    return sh;
  }, [s]);
  const [chosen, setChosen] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const cjk = LANGS[ctx.lang].cjk;
  const check = () => {
    const built = chosen.map((k) => tiles[k].t[0]).join(' ');
    const ok = built === target.map((t) => t[0]).join(' ');
    setChecked(ok);
    api.answer(ok, { say: text(ctx, s.t), xp: XP.correct * 2, show: <span lang={ctx.lang}>{text(ctx, s.t)}</span>, save: { toks: s.t, lv: s.lv }, item: s.id });
  };
  return (
    <div>
      <div class="prompt"><div class="label">Build the sentence</div><div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{s.en}</div></div>
      <div class="answer-line">
        {chosen.map((k) => (
          <button key={k} class={cls('tile', cjk && 'cjk')} lang={ctx.lang} disabled={checked !== null}
            onClick={() => setChosen(chosen.filter((x) => x !== k))}>{tiles[k].t[0]}</button>
        ))}
      </div>
      <div class="tiles">
        {tiles.map((x, k) => (
          <button key={k} class={cls('tile', cjk && 'cjk', chosen.includes(k) && 'used')} lang={ctx.lang}
            onClick={() => checked === null && setChosen([...chosen, k])}>{x.t[0]}</button>
        ))}
      </div>
      {checked === null && (
        <div class="sticky-action"><div><button class="btn primary block" disabled={chosen.length !== tiles.length} onClick={check}>Check</button></div></div>
      )}
    </div>
  );
}

// ---------------- Fill the gap ----------------

function Gap({ ctx }: { ctx: Ctx }) {
  return (
    <Session lang={ctx.lang} id="gap" title="Fill the gap" exit={ctx.exit} stats={() => stats(GAP)(ctx)}
      prepare={() => {
        const pool = bandSentences(ctx, GAP);
        const allTokens = ctx.c.sentences.flatMap((s) => words(s));
        return pickSentences(ctx, pool, 10).map((s) => {
          // Prefer content words (longer tokens) for the gap
          const short = (x: string) => LANGS[ctx.lang].spaced && !LANGS[ctx.lang].cjk && x.length <= 2;
          const mine = ctx.mine ? collectedTokens(ctx, s) : [];
          const cands = mine.length
            ? mine.map((i) => ({ t: s.t[i], i }))
            : s.t.map((t, i) => ({ t, i })).filter(({ t }) => !isPunct(t) && !short(t[0]));
          const { t, i } = pick(cands.length ? cands : s.t.map((t, i) => ({ t, i })).filter(({ t }) => !isPunct(t)));
          const seen = new Set([norm(t[0])]);
          const ds: string[] = [];
          for (const d of shuffle(allTokens)) {
            const k = norm(d[0]);
            if (seen.has(k) || short(d[0])) continue;
            seen.add(k);
            ds.push(d[0]);
            if (ds.length === 3) break;
          }
          const opts = shuffle([t[0], ...ds]);
          return { s, gap: i, opts, ans: opts.indexOf(t[0]), tok: t };
        });
      }}>
      {(api, items) => {
        const q = items[api.i];
        return (
          <div key={api.i}>
            <div class="prompt">
              <div class="label">Fill the gap</div>
              <SentenceText ctx={ctx} s={q.s} gap={q.gap} />
              <div class="muted" style={{ marginTop: 8 }}>{q.s.en}</div>
            </div>
            <Choice cjk={LANGS[ctx.lang].cjk ? ctx.lang : undefined} columns={2} options={q.opts} answer={q.ans}
              onDone={(ok) => {
                api.answer(ok, { say: text(ctx, q.s.t), word: tokenId(ctx.lx, q.tok), show: <span lang={ctx.lang}>{text(ctx, q.s.t)}</span>, save: { toks: q.s.t, lv: q.s.lv }, item: q.s.id });
              }} />
          </div>
        );
      }}
    </Session>
  );
}

// ---------------- Spot the mistake ----------------

function Spot({ ctx }: { ctx: Ctx }) {
  return (
    <Session lang={ctx.lang} id="spot" title="Spot the mistake" exit={ctx.exit}
      stats={() => stats(SPOT)(ctx)} prepare={() => pickSentences(ctx, bandSentences(ctx, SPOT), 8)}>
      {(api, items) => <SpotRound key={api.i} ctx={ctx} s={items[api.i]} api={api} />}
    </Session>
  );
}

function SpotRound({ ctx, s, api }: { ctx: Ctx; s: Sentence; api: RoundApi }) {
  const err = s.err!;
  const [tapped, setTapped] = useState<number | null>(null);
  const cjk = LANGS[ctx.lang].cjk;
  const shown = s.t.map((t, i) => (i === err.i ? err.w : t[0]));
  const tap = (i: number) => {
    if (tapped !== null) return;
    setTapped(i);
    const ok = i === err.i;
    api.answer(ok, {
      say: text(ctx, s.t),
      xp: XP.correct + 1,
      show: <span><s>{err.w}</s> → <b lang={ctx.lang}>{s.t[err.i][0]}</b></span>,
      note: <span>{err.x}<br /><span lang={ctx.lang}>{text(ctx, s.t)}</span> — {s.en}</span>,
      save: { toks: s.t, lv: s.lv },
      item: s.id,
    });
  };
  return (
    <div>
      <div class="prompt"><div class="label">Tap the wrong word</div><div class="muted">{s.en}</div></div>
      <div class="tiles" style={{ marginTop: 12 }}>
        {s.t.map((t, i) => (isPunct(t)
          ? <span key={i} lang={ctx.lang} class={cls('tile', cjk && 'cjk')} style={{ border: 'none', boxShadow: 'none', background: 'none', padding: '9px 2px' }}>{t[0]}</span>
          : (
            <button key={i} lang={ctx.lang}
              class={cls('tile', cjk && 'cjk')}
              style={tapped !== null && i === err.i ? { borderColor: 'var(--ok)', background: 'var(--ok-soft)' } : tapped === i ? { borderColor: 'var(--bad)', background: 'var(--bad-soft)' } : undefined}
              onClick={() => tap(i)}>{shown[i]}</button>
          )))}
      </div>
    </div>
  );
}

// ---------------- Dialogue ----------------

/** #/<lang>/play/dialogue lists the dialogues; #/<lang>/play/dialogue/<id> plays one. */
function DialogueGame({ ctx }: { ctx: Ctx }) {
  const d = ctx.c.dialogues.find((x) => x.id === ctx.arg);
  if (!d) return <DialogueMenu ctx={ctx} />;
  return (
    <Session lang={ctx.lang} id="dialogue" title={d.titleEn} exit={`#/${ctx.lang}/play/dialogue`}
      prepare={() => d.turns.map((_, k) => k)}>
      {(api, turns) => <DialogueRound key={api.i} ctx={ctx} d={d} i={turns[api.i]} api={api} />}
    </Session>
  );
}

function DialogueMenu({ ctx }: { ctx: Ctx }) {
  useStore();
  const l = ctx.lang;
  const ls = lang(l);
  const [band, setBand] = useState<Band>(ls.band);
  const list = ctx.c.dialogues.filter((d) => inBand(d.lv, band)).sort((a, b) => a.lv - b.lv);
  return (
    <div>
      <div class="game-top"><a class="icon-btn plain" href={ctx.exit} aria-label="Back"><Icon name="close" /></a></div>
      <h1>Dialogue</h1>
      <p class="muted" style={{ margin: '6px 0 14px' }}>Pick a conversation and choose the right reply at each turn.</p>
      <div class="pills" style={{ marginBottom: 16 }}>
        {BANDS.map((b) => <button key={b.id} class={cls('pill', band === b.id && 'on')} onClick={() => setBand(b.id)}>{b.name}</button>)}
      </div>
      {!list.length && <Empty icon="dialogue" title="No dialogues here yet">Try another level.</Empty>}
      <div class="text-list">
        {list.map((d) => {
          const n = ls.prog[d.id] || 0;
          return (
            <ProgressItem key={d.id} href={`#/${l}/play/dialogue/${d.id}`} lang={l} level={LANGS[l].levels[d.lv]} title={d.title} sub={d.titleEn}
              meta={`${d.turns.length} turns · ${LANGS[l].levels[d.lv]}`} value={n} max={d.turns.length} done={n >= d.turns.length} />
          );
        })}
      </div>
    </div>
  );
}

function Bubble({ ctx, l, me }: { ctx: Ctx; l: Line; me?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start' }}>
      <div class="card flat" style={{ maxWidth: '85%', padding: '10px 14px', background: me ? 'var(--accent-soft)' : undefined }}
        onClick={() => speak(ctx.lang, l.t)}>
        <div lang={ctx.lang} style={{ fontWeight: 700, fontSize: LANGS[ctx.lang].cjk ? '1.25rem' : '1.05rem' }}>
          {l.t}{hasVoice(ctx.lang) && <span class="muted" aria-label="Listen" style={{ marginLeft: 6, verticalAlign: '-3px' }}><Icon name="speaker" size={16} /></span>}
        </div>
        {l.r && <div class="small"><Py text={l.r} /></div>}
        <div class="small muted">{l.en}</div>
      </div>
    </div>
  );
}

function DialogueRound({ ctx, d, i, api }: { ctx: Ctx; d: Dialogue; i: number; api: RoundApi }) {
  const turn = d.turns[i];
  useEffect(() => { autoSpeak(ctx.lang, turn.a.t); }, [i]);
  return (
    <div>
      <div class="prompt" style={{ paddingTop: 0 }}><div class="label">{d.titleEn}</div></div>
      <div class="stack">
        {d.turns.slice(Math.max(0, i - 1), i).map((t, k) => (
          <div key={k} class="stack" style={{ opacity: 0.6 }}>
            <Bubble ctx={ctx} l={t.a} />
            <Bubble ctx={ctx} l={t.o[t.c]} me />
          </div>
        ))}
        <Bubble ctx={ctx} l={turn.a} />
      </div>
      <Choice
        options={turn.o.map((o) => (
          <div>
            <div lang={ctx.lang}>{o.t}</div>
            {o.r && <div class="small muted" style={{ fontWeight: 600 }}><Py text={o.r} /></div>}
          </div>
        ))}
        answer={turn.c}
        onDone={(ok) => {
          const right = turn.o[turn.c];
          if (ok) setProgress(ctx.lang, d.id, i + 1);
          api.answer(ok, { say: right.t, show: <span lang={ctx.lang}>{right.t}</span>, note: right.en });
        }}
      />
    </div>
  );
}

// ---------------- Listen and pick ----------------

function Listen({ ctx }: { ctx: Ctx }) {
  return (
    <Session lang={ctx.lang} id="listen" title="Listen and pick" exit={ctx.exit} stats={() => poolStats(ctx)}
      prepare={() => {
        const { words: pool } = wordPool(ctx.lx);
        return sample(pool, 10).map((e) => ({ e, ...choices(e, pool, meaning) }));
      }}>
      {(api, items) => <ListenRound key={api.i} ctx={ctx} q={items[api.i]} api={api} />}
    </Session>
  );
}

function ListenRound({ ctx, q, api }: { ctx: Ctx; q: { e: Entry; opts: Entry[]; ans: number }; api: RoundApi }) {
  useStore();
  const [st, setSt] = useState<'ok' | 'bad' | null>(null);
  useEffect(() => { speak(ctx.lang, q.e.w); }, []);
  // Challenge mode: type the word you heard, for double XP
  const typed = state.settings.listenType;
  const reveal = <Reveal ctx={ctx} e={q.e} />;
  const check = (v: string) => {
    const verdict = compareTyped(ctx, v, [q.e.w, withArticle(ctx.lang, q.e)], readingOf(ctx.lang, q.e));
    const ok = verdict !== 'wrong';
    setSt(ok ? 'ok' : 'bad');
    api.answer(ok, { say: q.e.w, word: q.e.id, xp: XP.correct * 2, show: reveal, note: verdict === 'close' ? 'Almost: watch the accents and special letters.' : undefined });
  };
  return (
    <div>
      <div class="prompt">
        <div class="label">What did you hear?</div>
        <div class="row" style={{ justifyContent: 'center', gap: 14 }}>
          <button class="btn primary" style={{ minHeight: 84, minWidth: 110 }} onClick={() => speak(ctx.lang, q.e.w)} aria-label="Play again"><Icon name="speaker" size={36} /></button>
          <button class="btn" style={{ minHeight: 84 }} onClick={() => speak(ctx.lang, q.e.w, { rate: 0.6 })} aria-label="Play slowly"><Icon name="slow" size={32} /></button>
        </div>
      </div>
      {typed
        ? <TypeAnswer lang={ctx.lang} state={st} placeholder={typePrompt(ctx, 'word you hear')} onCheck={check} />
        : <Choice options={q.opts.map(meaning)} answer={q.ans} onDone={(ok) => api.answer(ok, { say: q.e.w, word: q.e.id, show: reveal })} />}
      {!api.waiting && (
        <label class="row small" style={{ justifyContent: 'center', gap: 8, marginTop: 16 }}>
          <Switch on={typed} label="Challenge mode" onChange={(v) => { state.settings.listenType = v; commit(); }} />
          Challenge: type it yourself (2× XP)
        </label>
      )}
    </div>
  );
}

// ---------------- Dictation ----------------

function Dictation({ ctx }: { ctx: Ctx }) {
  return (
    <Session lang={ctx.lang} id="dictation" title="Dictation" exit={ctx.exit}
      stats={() => stats(DICTATE)(ctx)} prepare={() => pickSentences(ctx, bandSentences(ctx, DICTATE), 6)}>
      {(api, items) => <DictationRound key={api.i} ctx={ctx} s={items[api.i]} api={api} />}
    </Session>
  );
}

function DictationRound({ ctx, s, api }: { ctx: Ctx; s: Sentence; api: RoundApi }) {
  const [st, setSt] = useState<'ok' | 'bad' | null>(null);
  const full = text(ctx, s.t);
  useEffect(() => { speak(ctx.lang, full); }, []);
  const reading = sentenceReading(ctx.lang, s.t.filter((t) => !isPunct(t)));
  return (
    <div>
      <div class="prompt">
        <div class="label">Type what you hear</div>
        <div class="row" style={{ justifyContent: 'center', gap: 14 }}>
          <button class="btn primary" style={{ minHeight: 70, minWidth: 100 }} onClick={() => speak(ctx.lang, full)} aria-label="Play again"><Icon name="speaker" size={32} /></button>
          <button class="btn" style={{ minHeight: 70 }} onClick={() => speak(ctx.lang, full, { rate: 0.6 })} aria-label="Play slowly"><Icon name="slow" size={28} /></button>
        </div>
        {ctx.lang === 'zh' && <p class="small muted" style={{ marginTop: 10 }}>Type characters, or pinyin without tones.</p>}
        {ctx.lang === 'ja' && <p class="small muted" style={{ marginTop: 10 }}>Type kanji or kana.</p>}
        {ctx.lang === 'ko' && <p class="small muted" style={{ marginTop: 10 }}>Type Hangul, or the romanization.</p>}
      </div>
      <TypeAnswer lang={ctx.lang} state={st} placeholder={typePrompt(ctx, 'sentence')} onCheck={(v) => {
        const verdict = compareTyped(ctx, v, full, reading);
        const ok = verdict !== 'wrong';
        setSt(ok ? 'ok' : 'bad');
        api.answer(ok, {
          say: full,
          xp: XP.correct * 2,
          show: <span lang={ctx.lang}>{full}</span>,
          note: <>{reading && <><Py text={sentenceReading(ctx.lang, s.t)!} /><br /></>}{s.en}{verdict === 'close' ? ' · Almost: check the accents and special letters.' : ''}</>,
          save: { toks: s.t, lv: s.lv },
          item: s.id,
        });
      }} />
    </div>
  );
}

export const SENTENCE_GAMES: GameDef[] = [
  { id: 'builder', name: 'Sentence builder', desc: 'Put the words in the right order.', cat: 'sentence', mine: true, progress: stats(BUILD), check: needSentences(BUILD), Comp: Builder },
  { id: 'gap', name: 'Fill the gap', desc: 'Choose the missing word.', cat: 'sentence', mine: true, progress: stats(GAP), check: needSentences(GAP), Comp: Gap },
  { id: 'spot', name: 'Spot the mistake', desc: 'Find the error in a sentence.', cat: 'sentence', mine: true, progress: stats(SPOT), check: needSentences(SPOT), Comp: Spot },
  { id: 'dialogue', name: 'Dialogue', desc: 'Pick the right reply in a conversation.', cat: 'sentence', check: (ctx) => (ctx.c.dialogues.length ? null : 'Dialogues are coming soon'), Comp: DialogueGame },
  { id: 'listen', name: 'Listen and pick', desc: 'Hear a word, choose its meaning, or type it for double XP.', cat: 'listen', audio: true, mine: true, progress: poolStats, check: (ctx) => needVoice(ctx) || (!ctx.mine || wordPool(ctx.lx).words.length >= 4 ? null : 'Save at least 4 words to play'), Comp: Listen },
  { id: 'dictation', name: 'Dictation', desc: 'Hear a sentence, type it.', cat: 'listen', audio: true, mine: true, progress: stats(DICTATE), check: (ctx) => needVoice(ctx) || needSentences(DICTATE)(ctx), Comp: Dictation },
];
