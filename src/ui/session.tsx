/**
 * Shared frame for every game: progress bar, XP counter, combo, feedback bar and the summary screen.
 * A game renders one round at a time through `children(api)` and reports results with api.answer / api.score.
 * A wrong api.answer puts the round's item at the end of the queue, so the learner retries it before the summary.
 */
import type { ComponentChildren, VNode } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { LangId, Token } from '../content/types';
import { cachedLexicon, entry, lookup, rememberToken, tokenId, withArticle, type Entry, type Lexicon } from '../core/lexicon';
import { addWord, award, inCollection, isMastered, lapse, SENTENCES, markSentenceLearnt, practiced, removeWord, sentenceResult, setBest, XP, type Stats } from '../core/progress';
import { speak } from '../core/speech';
import { state, useStore } from '../core/store';
import { sfx } from '../core/sfx';
import { autoSpeak, hasVoice, stopSpeech } from '../core/speech';
import { cls } from '../core/util';
import { Bar, RetryRound, useKeys } from './components';
import { Icon } from './icons';
import { undoable } from '../core/undo';
import { openWord } from '../views/WordInfo';

export interface RoundApi {
  /** Round index (0-based). */
  i: number;
  total: number;
  /** This round is a retry of an item answered wrongly earlier in the session. */
  retry: boolean;
  /** Record an answer and show the feedback bar; the learner continues to the next round. Wrong answers are retried at the end. */
  /** say: what to read aloud with the feedback (spoken automatically if autoplay is on, with a button to hear it again). */
  answer: (ok: boolean, o?: { word?: string; save?: Saveable; say?: string; item?: string; show?: ComponentChildren; note?: ComponentChildren; xp?: number }) => void;
  /** Record a result without the feedback bar (fast games). */
  score: (ok: boolean, o?: { word?: string; xp?: number }) => void;
  /** Go to the next round (used with score). */
  next: () => void;
  /** End the game now (timers, lives). */
  finish: (o?: { best?: number; bestLabel?: string }) => void;
  /** Feedback bar is open. */
  waiting: boolean;
}

interface Props<T> {
  lang: LangId;
  id: string;
  title: string;
  /** Builds this run's rounds (called again on "Play again"). */
  prepare: () => T[];
  /** Number of rounds; defaults to the prepared items (growing with retries), Infinity for timed games that call finish(). */
  rounds?: number;
  exit: string;
  children: (api: RoundApi, items: T[]) => VNode | null;
  /** Hide the progress bar (timed games draw their own). */
  noProgress?: boolean;
  /** How far the learner is with what the game draws from (shown on the summary). */
  stats?: () => Stats;
  /** Called once at the end with the accuracy in % (a Guidebook lesson keeps its best score). */
  onFinish?: (accuracy: number) => void;
}

/**
 * Words the feedback bar offers to save: vocabulary entries, or the tokens of a sentence (a token that is not in the
 * vocabulary is saved as an extra with level lv). Defaults to the round's `word`.
 */
export type Saveable = Entry[] | { toks: Token[]; lv: number };

interface Fb { ok: boolean; title: string; show?: ComponentChildren; note?: ComponentChildren; save?: Saveable; say?: string; item?: string }

export function Session<T>(props: Props<T>) {
  const [run, setRun] = useState(0);
  return <SessionRun key={run} {...(props as Props<unknown>)} again={() => setRun((r) => r + 1)} />;
}

function SessionRun({ lang, id, title, prepare, rounds: fixed, exit, children, noProgress, stats: progressOf, onFinish, again }: Props<unknown> & { again: () => void }) {
  const [items] = useState(prepare);
  const [planned] = useState(items.length);
  const rounds = fixed ?? items.length;
  const [i, setI] = useState(0);
  const [fb, setFb] = useState<Fb | null>(null);
  const [done, setDone] = useState<null | { best?: number; bestLabel?: string; record?: boolean }>(null);
  const stats = useRef({ ok: 0, n: 0, xp: 0, combo: 0, maxCombo: 0 });
  const [, force] = useState(0);
  const s = stats.current;

  useEffect(() => () => stopSpeech(), []);

  const record = (ok: boolean, word?: string, xp = XP.correct) => {
    s.n++;
    if (ok) {
      s.ok++;
      s.combo++;
      s.maxCombo = Math.max(s.maxCombo, s.combo);
      // Combo bonus: +1 for every 5 in a row
      const gained = xp + (s.combo % 5 === 0 ? 1 : 0);
      s.xp += gained;
      award(lang, gained);
      practiced(lang, word);
    } else {
      s.combo = 0;
      lapse(lang, word);
    }
    force((n) => n + 1);
  };

  const finish = (o: { best?: number; bestLabel?: string } = {}) => {
    if (s.n > 0) { s.xp += XP.session; award(lang, XP.session); onFinish?.(Math.round((s.ok / s.n) * 100)); }
    const rec = o.best !== undefined ? setBest(lang, id, o.best) : false;
    sfx('end');
    setFb(null);
    setDone({ ...o, record: rec });
  };

  const next = () => {
    setFb(null);
    if (i + 1 >= rounds) finish();
    else setI(i + 1);
  };

  const api: RoundApi = {
    i, total: rounds, waiting: !!fb, retry: fixed === undefined && i >= planned,
    answer: (ok, o = {}) => {
      if (fb) return;
      if (!ok && fixed === undefined) items.push(items[i]);
      record(ok, o.word, o.xp);
      if (o.item) sentenceResult(lang, o.item, ok);
      sfx(ok ? 'ok' : 'bad');
      const lx = cachedLexicon(lang);
      const own = o.word && lx ? entry(lx, o.word) : undefined;
      if (o.say) autoSpeak(lang, o.say);
      setFb({ ok, title: ok ? pickPraise() : 'Not quite', show: o.show, note: o.note, save: o.save ?? (own && [own]), say: o.say, item: o.item });
    },
    score: (ok, o = {}) => { record(ok, o.word, o.xp); sfx(ok ? 'ok' : 'bad'); },
    next,
    finish,
  };

  useKeys((e) => {
    if (fb && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); next(); }
  }, [fb, i]);

  if (done) {
    const acc = s.n ? Math.round((s.ok / s.n) * 100) : 0;
    return (
      <div class="summary">
        <div class={cls('ink-stamp', acc >= 90 ? 'green' : acc >= 60 ? 'violet' : 'red')} role="img" aria-label={`Stamped: ${title}`}>
          <span>{todayLabel()}<b>{acc >= 90 ? 'Excellent' : acc >= 60 ? 'Nice work' : 'Keep going'}</b>+{s.xp} XP</span>
        </div>
        <h1>{acc >= 90 ? 'Excellent!' : acc >= 60 ? 'Nice work!' : 'Keep going!'}</h1>
        <p class="muted">{title}</p>
        {progressOf && <StatsLine st={progressOf()} />}
        <div class="stat-row">
          <div class="stat xp"><b>+{s.xp}</b><span>XP</span></div>
          <div class="stat ok"><b>{s.n ? `${acc}%` : '–'}</b><span>Accuracy</span></div>
          {done.best !== undefined
            ? <div class="stat"><b>{done.best}</b><span>{done.record ? 'New best!' : done.bestLabel || 'Score'}</span></div>
            : <div class="stat"><b>{s.maxCombo}</b><span>Best combo</span></div>}
        </div>
        <div class="stack">
          <button class="btn primary block" onClick={again} autoFocus>Play again</button>
          <a class="btn block" href={exit}>Done</a>
        </div>
      </div>
    );
  }

  return (
    <div class={cls(fb && 'with-feedback')}>
      <div class="game-top">
        <a class="icon-btn plain" href={exit} aria-label="Quit"><Icon name="close" /></a>
        {noProgress || rounds === Infinity
          ? <div class="grow"><b>{title}</b></div>
          : rounds <= 14
            // Ticket punches: one hole per round, the current one ringed
            ? <div class="punches" role="progressbar" aria-label={`Round ${i + 1} of ${rounds}`} aria-valuenow={i + 1} aria-valuemin={1} aria-valuemax={rounds}>
                {Array.from({ length: rounds }, (_, k) => <i key={k} class={cls(k < i && 'done', k === i && 'now')} />)}
              </div>
            : <Bar value={i + (fb ? 1 : 0)} max={rounds} />}
        {api.retry && <span class="badge retry-tag">Retry</span>}
        {s.combo >= 3 && <span class="combo">{s.combo} in a row</span>}
        <span class="game-xp">+{s.xp} XP</span>
      </div>
      {rounds === 0
        ? <p class="empty muted">Not enough content for this level yet. Try another level.</p>
        : <RetryRound.Provider value={api.retry}>{children(api, items)}</RetryRound.Provider>}
      {fb && (
        <div class={cls('feedback', fb.ok ? 'ok' : 'bad')} role="status">
          <div class="feedback-inner">
            <div class="feedback-head">
              <span class={cls('ink-stamp', fb.ok ? 'green' : 'red')} aria-hidden="true"><Icon name={fb.ok ? 'check' : 'close'} size={24} /></span>
              <div class="grow">
                <h3>{fb.title}</h3>
                {fb.show && <div class="answer">{fb.show}</div>}
              </div>
              {fb.say && hasVoice(lang) && (
                <div class="feedback-audio">
                  <button class="icon-btn" onClick={() => speak(lang, fb.say!)} aria-label="Listen again"><Icon name="speaker" /></button>
                  <button class="icon-btn" onClick={() => speak(lang, fb.say!, { rate: 0.6 })} aria-label="Listen slowly"><Icon name="slow" /></button>
                </div>
              )}
            </div>
            {fb.note && <div class="note">{fb.note}</div>}
            {fb.save && <SaveWords lang={lang} save={fb.save} />}
            {fb.item && <LearntButton lang={lang} id={fb.item} />}
            <button class={cls('btn block', fb.ok ? 'ok' : 'bad')} onClick={next} autoFocus>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

const PRAISE = ['Correct!', 'Nice!', 'Great!', 'Exactly!', 'Well done!'];
const pickPraise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)];

/** "25 OCT 2026", the date printed on a summary stamp. */
const todayLabel = () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

interface SaveChip { id: string; label: string; title: string; tok?: Token; dict?: string }

function chips(lx: Lexicon, save: Saveable): SaveChip[] {
  const seen = new Set<string>();
  const list: SaveChip[] = Array.isArray(save)
    ? save.map((e) => ({ id: e.id, label: withArticle(lx.lang, e), title: e.en }))
    // A token is saved as its dictionary word ("nehme" -> nehmen), so that is what the chip shows
    : save.toks.filter((t) => t[2]).map((t) => {
      const e = lookup(lx, t);
      return { id: tokenId(lx, t), label: e ? withArticle(lx.lang, e) : (t[3] ?? t[0]), title: t[2], tok: t, dict: e?.en };
    });
  return list.filter((c) => !seen.has(c.id) && seen.add(c.id));
}

/**
 * The words of the round. A single word is saved with one tap (another tap removes it). The words of a sentence are
 * looked up first: a tap shows what the word means in the sentence, with a button to save it.
 */
function SaveWords({ lang, save }: { lang: LangId; save: Saveable }) {
  useStore();
  const [sel, setSel] = useState<SaveChip | null>(null);
  const lx = cachedLexicon(lang);
  if (!lx) return null;
  const list = chips(lx, save);
  if (!list.length) return null;
  const sentence = !Array.isArray(save);
  const lv = Array.isArray(save) ? 1 : save.lv;
  const toggle = (c: SaveChip) => {
    if (inCollection(lang, c.id)) { removeWord(lang, c.id); return; }
    if (c.tok) rememberToken(lx, c.tok, lv);
    addWord(lang, c.id);
  };
  return (
    <div class="stack" style={{ gap: 6 }}>
      {sentence && sel && (
        <div class="lookup">
          <div class="grow">
            <b lang={lang}>{sel.label}</b>
            {sel.tok && sel.tok[0] !== sel.label && <span class="small muted" lang={lang}> · {sel.tok[0]}</span>}
            {sel.tok?.[1] && <span class="small mono"> · {sel.tok[1]}</span>}
            <div>{sel.title}{sel.dict && sel.dict !== sel.title ? <span class="small muted"> · {sel.dict}</span> : null}</div>
          </div>
          <button type="button" class="icon-btn plain" aria-label="Listen" onClick={() => speak(lang, sel.tok?.[0] ?? sel.label)}><Icon name="speaker" size={18} /></button>
          {sel.dict !== undefined && (
            <button type="button" class="icon-btn plain" aria-label="Open in the dictionary" title="More about this word" onClick={() => openWord(lang, sel.id)}><Icon name="expand" size={18} /></button>
          )}
          <button type="button" class={cls('btn sm', !inCollection(lang, sel.id) && 'primary')} onClick={() => toggle(sel)}>
            <Icon name={inCollection(lang, sel.id) ? 'check' : 'plus'} size={16} />{inCollection(lang, sel.id) ? 'Saved' : 'Save'}
          </button>
        </div>
      )}
      <div class="save-words">
        <span class="small muted">{sentence ? 'Tap a word' : list.length === 1 ? 'Save' : 'Save words'}</span>
        {list.map((c) => {
          const on = inCollection(lang, c.id);
          return (
            <button key={c.id} type="button" class={cls('pill', sentence ? sel?.id === c.id && 'sel' : on && 'on', sentence && on && 'saved')} lang={lang} title={c.title}
              aria-pressed={sentence ? sel?.id === c.id : on} onClick={() => (sentence ? setSel(sel?.id === c.id ? null : c) : toggle(c))}>
              {(!sentence || on) && <Icon name={on ? 'check' : 'plus'} size={14} />}{c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Sentences and fixed questions come back less often as they are learnt; this skips straight to learnt. */
function LearntButton({ lang, id }: { lang: LangId; id: string }) {
  useStore();
  const what = id.startsWith('odd:') ? 'question' : 'sentence';
  const c = state.langs[lang]?.sents?.[id];
  if (c && isMastered(c, SENTENCES)) return <p class="small muted center">This {what} is learnt. It only comes back if you get it wrong.</p>;
  return (
    <button type="button" class="btn ghost sm" style={{ justifySelf: 'center' }} onClick={() => undoable(lang, () => markSentenceLearnt(lang, id), `${what[0].toUpperCase()}${what.slice(1)} marked as learnt`)}>
      <Icon name="check" size={16} />I know this {what}: mark as learnt
    </button>
  );
}

/** "12 of 30 sentences practised · 3 mastered", with a bar. */
export function StatsLine({ st }: { st: Stats }) {
  if (!st.total) return null;
  return (
    <div class="stats-line">
      <div class="tprog" role="img" aria-label={`${st.done} of ${st.total} ${st.unit} practised, ${st.mastered} mastered`}>
        <i style={{ width: `${(st.done / st.total) * 100}%` }} /><b style={{ width: `${(st.mastered / st.total) * 100}%` }} />
      </div>
      <span class="small muted">{st.done}/{st.total} {st.unit} practised · {st.mastered} mastered</span>
    </div>
  );
}
