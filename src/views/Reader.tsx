import { Fragment, type ComponentChildren } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { textInfos } from '../content';
import { loadText } from '../content/long';
import type { GrammarNote, LangId, Question, Text, TextInfo, Token } from '../content/types';
import { BANDS, inBand, LANGS, type Band } from '../core/langs';
import { lookup, readingOf, rememberToken, tokenId, withArticle, type Lexicon } from '../core/lexicon';
import { addWords, award, inCollection, setProgress, wordCard, XP } from '../core/progress';
import { autoSpeak, speak, stopSpeech } from '../core/speech';
import { commit, lang, state, useStore } from '../core/store';
import { cls, plural } from '../core/util';
import { wiktionary } from '../core/finder';
import { WordTranslation } from './Translated';
import { isPunct, joinTokens, tokenGap } from '../games/common';
import { Choice, Empty, Loading, ProgressItem, Py, useKeys } from '../ui/components';
import { MeasureWord, MoreToggle, useMore, WordActions, WordDetails } from './WordInfo';
import { Icon } from '../ui/icons';
import { Session, type RoundApi } from '../ui/session';
import { toast } from '../ui/toast';
import { rememberLang, useContent } from './shared';
import { confirmMany, undoable } from '../core/undo';

export function ReaderList({ l }: { l: LangId }) {
  useStore();
  const data = useContent(l);
  rememberLang(l);
  const ls = lang(l);
  const [band, setBand] = useState<Band>(ls.band);
  if (!data) return <Loading />;
  const texts = textInfos(data.c).filter((t) => inBand(t.lv, band));
  const m = LANGS[l];
  return (
    <div>
      <h1>Read</h1>
      <p class="muted" style={{ margin: '6px 0 14px' }}>Tap any word for its meaning and save it to your collection. Finish a text for XP and a short quiz.</p>
      <div class="pills" style={{ marginBottom: 16 }}>
        {BANDS.map((b) => <button key={b.id} class={cls('pill', band === b.id && 'on')} onClick={() => setBand(b.id)}>{b.name}</button>)}
      </div>
      {!texts.length && <Empty icon="read" title="No texts here yet">Try another level.</Empty>}
      <div class="text-list">
        {texts.map((t) => (
          <ProgressItem key={t.id} href={`#/${l}/read/${t.id}`} lang={l} level={m.levels[t.lv]} title={t.title} sub={t.titleEn}
            meta={`${t.kind} · ${length(t)} · ${m.levels[t.lv]}`}
            value={ls.prog[t.id] || 0} max={t.sentences} done={ls.read.includes(t.id)} />
        ))}
      </div>
    </div>
  );
}

/** Words on a printed page, for the length shown in the list. */
const PAGE_WORDS = 250;

/** "120 words", "6 pages · 4 chapters". */
function length(t: TextInfo): string {
  const pages = Math.round(t.words / PAGE_WORDS);
  if (pages < 2) return plural(t.words, 'word');
  return `${pages} pages${t.chapters ? ` · ${plural(t.chapters, 'chapter')}` : ''}`;
}

/** Where each reader page starts: one chapter per page, or every 30 sentences in a long text without chapters. */
function pageStarts(text: Text): number[] {
  const h = text.s.flatMap((s, i) => (s.h ? [i] : []));
  if (h.length) return h[0] === 0 ? h : [0, ...h];
  if (text.s.length <= 45) return [0];
  return Array.from({ length: Math.ceil(text.s.length / 30) }, (_, k) => k * 30);
}

/** Reader position: the current sentence (-1 = none) and, in word mode, the selected token in it. */
interface Pos { si: number; ti: number | null }

/** Indexes of the tappable (non-punctuation) tokens of a sentence. */
const wordsOf = (text: Text, si: number) => text.s[si].t.flatMap((t, k) => (isPunct(t) ? [] : [k]));

/** A text from the Read tab, loaded by id. */
export function Reader({ l, id }: { l: LangId; id: string }) {
  rememberLang(l);
  // undefined while loading, null when there is no such text
  const [text, setText] = useState<Text | null | undefined>(undefined);
  useEffect(() => {
    let live = true;
    loadText(l, id).then((t) => { if (live) setText(t ?? null); });
    return () => { live = false; };
  }, [l, id]);
  if (text === undefined) return <Loading />;
  if (!text) return <Empty icon="search" title="Text not found"><a href={`#/${l}/read`}>Back to the list</a></Empty>;
  return <TextReader key={text.id} l={l} text={text} />;
}

/**
 * The reader. `scratch`: a text the learner brought (Find words): no title, quiz, reading progress or XP for reading;
 * `children` take the title's place, and words Stampify doesn't know can be looked up but not saved.
 * A scratch text saved on the device passes `start` (the sentence to continue at) and `onPos` (told where the
 * learner is, as the furthest sentence read so far on screen or the one selected).
 */
export function TextReader({ l, text, scratch, children, start, onPos }: {
  l: LangId; text: Text; scratch?: boolean; children?: ComponentChildren; start?: number; onPos?: (si: number) => void;
}) {
  useStore();
  const data = useContent(l);
  const [pos, setPos] = useState<Pos>({ si: -1, ti: null });
  const [showTr, setShowTr] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [page, setPage] = useState(0);
  const [noteAt, setNoteAt] = useState<number | null>(null);
  useEffect(() => () => stopSpeech(), []);
  const starts = useMemo(() => (text ? pageStarts(text) : [0]), [text]);
  const pageOf = (si: number) => starts.filter((st) => st <= si).length - 1;
  const from = starts[page];
  const to = starts[page + 1] ?? text?.s.length ?? 0;

  // Reopening an unfinished text continues at the first sentence not read yet
  const restored = useRef(false);
  useEffect(() => {
    if (!text || restored.current) return;
    restored.current = true;
    if (scratch) {
      if (start && start > 0 && start < text.s.length) { setPage(pageOf(start)); setPos({ si: start, ti: null }); }
      return;
    }
    const done = lang(l).prog[text.id] || 0;
    if (done > 0 && done < text.s.length && !lang(l).read.includes(text.id)) {
      setPage(pageOf(done));
      setPos({ si: done, ti: null });
      toast('Continuing where you left off');
    }
  }, [text]);

  // Progress: a sentence counts as read once it has scrolled above the middle of the screen, or was selected
  useEffect(() => {
    if (!text || quiz || (scratch && !onPos)) return;
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      const sents = [...document.querySelectorAll<HTMLElement>('.reader .sent')];
      const n = sents.filter((el) => el.getBoundingClientRect().bottom < mid).length;
      if (n) { if (scratch) onPos?.(Math.min(text.s.length - 1, from + n)); else setProgress(l, text.id, from + n); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [text, quiz, from]);
  useEffect(() => {
    if (!text || pos.si < 0) return;
    if (scratch) onPos?.(pos.si); else setProgress(l, text.id, pos.si + 1);
  }, [pos.si]);

  // Keep the current sentence (or word) in view, in the part of the screen the word sheet leaves free. Only scroll
  // when it is (partly) out of that part, so stepping along a line keeps the page still whatever the sheet's height.
  useEffect(() => {
    const el = document.querySelector(pos.ti !== null ? '.tok.sel' : '.sent.cur');
    if (!el) return;
    const sheet = document.querySelector<HTMLElement>('.sheet[role=dialog]');
    const free = window.innerHeight - (sheet?.offsetHeight ?? 0);
    const r = el.getBoundingClientRect();
    const margin = 12;
    if (r.top >= margin && r.bottom <= free - margin) return;
    window.scrollTo({ top: Math.max(0, window.scrollY + r.top + r.height / 2 - free / 2), behavior: 'smooth' });
  }, [pos.si, pos.ti]);

  /* Keyboard, as in longmen: ↑/↓ = sentence (read aloud); → starts word mode, ←/→ step through the words and
     running past either end lands on the neighbouring sentence with word mode off; Esc steps back out. */
  const say = (si: number) => text && autoSpeak(l, joinTokens(l, text.s[si].t));
  const goSentence = (si: number) => { if (!text) return; setNoteAt(null); setPage(pageOf(si)); setPos({ si, ti: null }); say(si); };
  const goWord = (si: number, ti: number) => { if (!text) return; setNoteAt(null); setPage(pageOf(si)); setPos({ si, ti }); autoSpeak(l, text.s[si].t[ti][0]); };
  /** Previous / next sentence (the « » buttons); from no selection both start at the top of the page. */
  const stepSentence = (d: 1 | -1) => {
    if (!text) return;
    goSentence(pos.si < 0 ? from : Math.min(text.s.length - 1, Math.max(0, pos.si + d)));
  };
  /** Turn to page k: the page left behind counts as read. */
  const turn = (k: number) => {
    if (!text) return;
    stopSpeech();
    setPlaying(false);
    if (scratch) onPos?.(starts[k]);
    else if (k > page) setProgress(l, text.id, to);
    setPage(k);
    setPos({ si: -1, ti: null });
    window.scrollTo(0, 0);
  };
  const step = (d: 1 | -1) => {
    if (!text) return;
    if (pos.ti === null) {
      if (d < 0) return;
      const si = Math.max(0, pos.si);
      return goWord(si, wordsOf(text, si)[0]);
    }
    const ws = wordsOf(text, pos.si);
    const k = ws.indexOf(pos.ti) + d;
    if (k >= 0 && k < ws.length) return goWord(pos.si, ws[k]);
    const si = pos.si + d;
    if (si >= 0 && si < text.s.length) goSentence(si);
  };
  useKeys((e) => {
    if (!text || quiz) return;
    const n = text.s.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); goSentence(pos.si < 0 ? 0 : Math.min(n - 1, pos.si + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); goSentence(pos.si < 0 ? n - 1 : Math.max(0, pos.si - 1)); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { if (pos.ti !== null) { e.preventDefault(); step(-1); } }
    else if (e.key === 'Escape') setPos(pos.ti !== null ? { si: pos.si, ti: null } : { si: -1, ti: null });
    else if ((e.key === 'l' || e.key === 'L') && pos.si >= 0) speak(l, joinTokens(l, text.s[pos.si].t));
    else if ((e.key === 'a' || e.key === 'A') && pos.ti !== null && data) save(data.lx, text, text.s[pos.si].t[pos.ti]);
  }, [pos, text, quiz]);

  if (!data) return <Loading />;
  const { lx } = data;
  const m = LANGS[l];
  const ls = lang(l);
  const showPy = m.reading && state.settings.showReading;
  const exit = `#/${l}/read`;

  if (quiz) {
    // Levels 3-6 ask in the language taught when the text has a translated quiz (same order and answers)
    const inLang = text.lv >= 3 ? data.c.quizzes.find((z) => z.text === text.id && z.q.length === text.q.length) : undefined;
    return (
      <Session lang={l} id="story-quiz" title={text.titleEn} exit={exit} prepare={() => text.q.map((q, i) => ({ ...q, t: inLang?.q[i] }))}>
        {(api, qs) => <QuizRound key={api.i} l={l} q={qs[api.i]} n={Math.min(api.i + 1, qs.length)} total={qs.length} api={api} />}
      </Session>
    );
  }

  const pageSents = text.s.slice(from, to);
  const last = page === starts.length - 1;
  const collectible = [...new Set(pageSents.flatMap((s) => s.t).filter((t) => !isPunct(t) && lookup(lx, t)).map((t) => tokenId(lx, t)))];
  const heat = !!state.settings.heatmap;
  const fresh = collectible.filter((wid) => !inCollection(l, wid));

  const finish = () => {
    stopSpeech();
    setProgress(l, text.id, text.s.length);
    // A long text is worth more: one text's XP per page, up to ten
    const xp = starts.length > 1 ? XP.text * Math.min(10, starts.length) : XP.text;
    if (!ls.read.includes(text.id)) { ls.read.push(text.id); commit(); award(l, xp); toast(`+${xp} XP for reading`); }
    setPos({ si: -1, ti: null });
    setQuiz(true);
  };

  const playAll = () => {
    if (playing) { stopSpeech(); setPlaying(false); return; }
    setPlaying(true);
    // Reads the page from the current sentence on
    let k = Math.max(from, pos.si);
    const nextS = () => {
      if (k >= to) { setPlaying(false); return; }
      const s = text.s[k++];
      speak(l, joinTokens(l, s.t), { onend: nextS });
    };
    nextS();
  };

  const selTok = pos.ti !== null ? text.s[pos.si].t[pos.ti] : null;
  // Grammar notes of this text, by sentence (shown unless switched off)
  const allNotes = data.c.notes.filter((n) => n.text === text.id);
  const notesOn = allNotes.length > 0 && state.settings.grammarNotes !== false;
  const notesAt = (si: number) => (notesOn ? allNotes.filter((n) => n.s === si) : []);
  /** Tokens to underline: each word a note lists marks its first unmarked occurrence (listed twice, two). */
  const noteTokens = (si: number) => {
    const marked = new Set<number>();
    const toks = text.s[si].t;
    for (const n of notesAt(si)) {
      const used = new Set<number>();
      for (const w of n.w) {
        const k = toks.findIndex((t, i) => !used.has(i) && t[0].toLowerCase() === w.toLowerCase());
        if (k >= 0) { used.add(k); marked.add(k); }
      }
    }
    return marked;
  };

  return (
    // While the word sheet is open, room below the text lets even the last line scroll up above it
    <div style={{ paddingBottom: selTok ? '90vh' : 70 }}>
      {scratch ? children : <>
        <div class="game-top">
          <a class="icon-btn plain" href={exit} aria-label="Back to texts"><Icon name="back" /></a>
          <div class="grow">
            <span class="badge accent">{LANGS[l].levels[text.lv]} · {text.kind}</span>
          </div>
          <span class="mono small muted">{Math.round(((ls.read.includes(text.id) ? text.s.length : ls.prog[text.id] || 0) / text.s.length) * 100)}%</span>
        </div>
        <h1 lang={l} style={m.cjk ? { fontFamily: 'inherit', textTransform: 'none' } : undefined}>{text.title}</h1>
        <p class="muted">{text.titleR && <span class="mono"><Py text={text.titleR} /> · </span>}{text.titleEn}</p>
      </>}

      <div class="reader-tools">
        <button class="toggle" onClick={playAll}><Icon name={playing ? 'stop' : 'speaker'} size={18} />{playing ? 'Stop' : 'Listen'}</button>
        {m.reading && (
          <button class="toggle" aria-pressed={state.settings.showReading} onClick={() => { state.settings.showReading = !state.settings.showReading; commit(); }}>
            <span style={{ textTransform: 'capitalize' }}>{m.readingName}</span> {state.settings.showReading ? 'on' : 'off'}
          </button>
        )}
        {!scratch && <button class="toggle" aria-pressed={showTr} onClick={() => setShowTr(!showTr)}>Translation {showTr ? 'on' : 'off'}</button>}
        <button class="toggle" aria-pressed={heat} onClick={() => { state.settings.heatmap = !heat; commit(); }}>Heat map {heat ? 'on' : 'off'}</button>
        {allNotes.length > 0 && (
          <button class="toggle" aria-pressed={notesOn} onClick={() => { state.settings.grammarNotes = !notesOn; commit(); }}>Grammar notes {notesOn ? 'on' : 'off'}</button>
        )}
      </div>
      {heat && <HeatLegend />}

      <div class={cls('visa-page reader', m.cjk && 'cjk', showTr ? 'blocks' : 'para')} lang={l}>
        {pageSents.map((s, k) => { const si = from + k; const gw = noteTokens(si); return [
          s.h && <span key={`h${si}`} class="chapter-h" lang={l}>{s.h[0]}<small>{s.h[2] && <><Py text={s.h[2]} /> · </>}{s.h[1]}</small></span>,
          <span key={si} class={cls('sent', pos.si === si && 'cur')} onClick={() => { if (pos.si !== si) goSentence(si); }}>
            {glue(s.t).map((group) => {
              // The space before a group stays outside it, so lines can still break there
              const lead = gapBefore(l, s.t[group[0]], s.t[group[0] - 1], group[0] === 0 && si > 0);
              const views = group.map((ti, k) => (
                <TokenView key={ti} l={l} lx={lx} t={s.t[ti]} space={k === 0 ? '' : gapBefore(l, s.t[ti], s.t[ti - 1], false)}
                  selected={pos.si === si && pos.ti === ti} showPy={showPy} grammar={gw.has(ti)} heat={heat}
                  onTap={() => {
                    if (pos.si === si && pos.ti === ti) { setPos({ si, ti: null }); return; }
                    goWord(si, ti);
                  }} />
              ));
              return <Fragment key={group[0]}>{lead}{group.length > 1 ? <span class="glue">{views}</span> : views}</Fragment>;
            })}
            {gw.size > 0 && (
              <button class="gmark" aria-label="Grammar note" title="Grammar note" onClick={(e) => { e.stopPropagation(); setPos({ si, ti: null }); setNoteAt(si); }}>G</button>
            )}
            {showTr && <span class="tr">{s.en}</span>}
          </span>,
        ]; })}
      </div>

      <p class="kbd desktop-only" style={{ marginTop: 14 }}>Keys: ↑ ↓ sentences · → ← words · A save word · L listen · Esc back</p>

      {starts.length > 1 && (
        <div class="pager">
          <button class="btn" disabled={page === 0} onClick={() => turn(page - 1)} aria-label="Previous page"><Icon name="prev" size={18} /></button>
          <select aria-label="Go to page" value={page} onChange={(e) => turn(Number((e.target as HTMLSelectElement).value))}>
            {starts.map((st, k) => <option key={k} value={k}>{text.s[st].h ? `${k + 1}. ${text.s[st].h![0]}` : `Page ${k + 1} of ${starts.length}`}</option>)}
          </select>
          <button class="btn" disabled={last} onClick={() => turn(page + 1)} aria-label="Next page"><Icon name="next" size={18} /></button>
        </div>
      )}

      {!last && (
        <div class="stack" style={{ marginTop: 14 }}>
          {fresh.length > 0 && (
            <button class="btn block" onClick={() => saveAll(l, fresh)}><Icon name="plus" size={18} />Save all {fresh.length} new words on this page</button>
          )}
          <button class="btn primary block" onClick={() => turn(page + 1)}>
            {text.s[to].h ? `Next chapter: ${text.s[to].h![0]}` : 'Next page'}<Icon name="next" size={18} />
          </button>
        </div>
      )}

      {last && scratch && fresh.length > 0 && (
        <button class="btn block" style={{ marginTop: 14 }} onClick={() => saveAll(l, fresh)}><Icon name="plus" size={18} />Save all {fresh.length} new words{starts.length > 1 ? ' on this page' : ''}</button>
      )}
      {last && !scratch && <div class="card stack" style={{ marginTop: 22 }}>
        <h2>Finished reading?</h2>
        <p class="small muted">Take a {text.q.length}-question quiz on the text. Reading it gives {starts.length > 1 ? XP.text * Math.min(10, starts.length) : XP.text} XP the first time.</p>
        {fresh.length > 0 && (
          <button class="btn block" onClick={() => saveAll(l, fresh)}><Icon name="plus" size={18} />Save all {fresh.length} new words</button>
        )}
        <button class="btn primary block" onClick={finish}>Finish & quiz</button>
      </div>}

      {selTok && <WordSheet l={l} lx={lx} t={selTok} text={text} si={pos.si} scratch={scratch} onClose={() => setPos({ si: pos.si, ti: null })}
        onStep={step} onSentence={stepSentence} notes={notesAt(pos.si).filter((n) => n.w.some((w) => w.toLowerCase() === selTok[0].toLowerCase()))} />}
      {!selTok && noteAt !== null && <GrammarSheet l={l} text={text} si={noteAt} notes={notesAt(noteAt)} onClose={() => setNoteAt(null)} />}
      {!selTok && noteAt === null && (
        // Touch screens have no arrow keys: « » step through the sentences and read each one aloud
        <div class="sent-nav mobile-only">
          <button class="btn" onClick={() => stepSentence(-1)} disabled={pos.si === 0} aria-label="Previous sentence"><Icon name="prev2" /></button>
          <button class="btn" onClick={() => (pos.si >= 0 ? speak(l, joinTokens(l, text.s[pos.si].t)) : stepSentence(1))}>
            <Icon name="speaker" size={18} />{pos.si >= 0 ? 'Again' : 'Start'}
          </button>
          <button class="btn" onClick={() => stepSentence(1)} disabled={pos.si === text.s.length - 1} aria-label="Next sentence"><Icon name="next2" /></button>
        </div>
      )}
    </div>
  );
}

/**
 * Token indexes grouped so a line never starts with punctuation: each word is its own box and the browser may break
 * between any two, so a punctuation mark is glued to the word before it (an opening mark like „ to the word after it).
 */
export function glue(toks: Token[]): number[][] {
  const groups: number[][] = [];
  let open = false; // the last group ends with an opening mark („“《（) and waits for its word
  toks.forEach((t, k) => {
    const opening = /^[“‘„«¿¡《（(「『]+$/.test(t[0]);
    if (groups.length && (open || (isPunct(t) && !opening))) groups[groups.length - 1].push(k);
    else groups.push([k]);
    open = opening;
  });
  return groups;
}

/** The space before a token in running text (a new sentence starts after a space in spaced languages). */
export const gapBefore = (l: LangId, t: Token, prev: Token | undefined, first: boolean) => (first && LANGS[l].spaced ? ' ' : tokenGap(l, prev?.[0], t[0]));

/**
 * Heat map: how well the learner knows a word, from its progress boxes (saved or practised in games).
 * 0 = practised but not learnt yet … 4 = known (14 days+), 5 = mastered. Words never met get no colour.
 */
export function heatLevel(l: LangId, lx: Lexicon, t: Token): number | null {
  const c = wordCard(l, tokenId(lx, t));
  if (!c || (c[2] === 0 && c[0] === 0)) return null;
  const b = c[0];
  return b >= 8 ? 5 : b >= 5 ? 4 : b >= 3 ? 3 : b >= 2 ? 2 : b >= 1 ? 1 : 0;
}

const HEAT = ['just met', '1 h', '1–3 days', '1 week', 'known', 'mastered'];

function HeatLegend() {
  return (
    <div class="heat-legend small" aria-label="Heat map colours">
      {HEAT.map((t, k) => <span key={k} class={`heat h${k}`}>{t}</span>)}
      <span class="muted">no colour: not met yet</span>
    </div>
  );
}

export function TokenView({ l, lx, t, space, selected, showPy, grammar, heat, onTap }: {
  l: LangId; lx: Lexicon; t: Token; space: string; selected: boolean; showPy: boolean; grammar?: boolean; heat?: boolean; onTap: () => void;
}) {
  const punct = isPunct(t);
  // With readings on, punctuation gets an empty reading line too, so it sits on the words' baseline
  if (punct) return <>{space}{showPy ? <span class="punct rw"><span class="py">{'\u00a0'}</span><span>{t[0]}</span></span> : <span class="punct">{t[0]}</span>}</>;
  const saved = inCollection(l, tokenId(lx, t));
  const h = heat ? heatLevel(l, lx, t) : null;
  return (
    <>
      {space}
      <button class={cls('tok', showPy && 'rw', saved && 'saved', selected && 'sel', grammar && 'gw', h !== null && `heat h${h}`)} onClick={(e) => { e.stopPropagation(); onTap(); }}>
        {/* Readings sit above the word; kana-only Japanese words keep an empty line so the text stays aligned */}
        {showPy ? <><span class="py">{t[1] ? <Py text={t[1]} /> : '\u00a0'}</span><span>{t[0]}</span></> : t[0]}
      </button>
    </>
  );
}

/** Saves a reader token to the collection (with its extra record when it is not in the vocabulary). */
function save(lx: Lexicon, text: Text, t: Token) {
  undoable(lx.lang, () => {
    rememberToken(lx, t, text.lv);
    const ok = addWords(lx.lang, [tokenId(lx, t)]) > 0;
    if (ok) award(lx.lang, XP.save);
    return ok;
  }, (ok) => (ok ? 'Saved to your words' : null));
}

/** "Save all new words": asks first when there are many, and can be undone. */
function saveAll(l: LangId, fresh: string[]) {
  if (!confirmMany(fresh.length, `Save all ${fresh.length} new words`)) return;
  undoable(l, () => {
    const n = addWords(l, fresh);
    award(l, Math.min(10, n) * XP.save);
    return n;
  }, (n) => `Saved ${plural(n, 'word')}`);
}

export function WordSheet({ l, lx, t, text, si, scratch, onClose, onStep, onSentence, notes }: {
  l: LangId; lx: Lexicon; t: Token; text: Text; si: number; scratch?: boolean; onClose: () => void; onStep: (d: 1 | -1) => void; onSentence: (d: 1 | -1) => void;
  notes: GrammarNote[];
}) {
  const e = lookup(lx, t);
  const wid = tokenId(lx, t);
  const cjk = LANGS[l].cjk;
  const head = e ? withArticle(l, e) : (t[3] ?? t[0]);
  // The dictionary reading for a known word; the reading of the form in the text otherwise
  const r = (e && readingOf(l, e)) || (!e || !t[3] ? t[1] : '');
  const sentence = joinTokens(l, text.s[si].t);
  // A word the learner brought that Stampify doesn't know: only a look-up
  const foreign = scratch && !e;
  const wikt = wiktionary(l, e?.w ?? t[0]);
  const [more, toggleMore] = useMore();
  return (
    <div class="sheet" role="dialog" aria-label="Word">
      <div class="sheet-inner stack">
        <div class="row">
          <div class="grow">
            <div class="row" style={{ gap: 4 }}>
              <div class={cls('w', cjk && 'cjk')} lang={l}>{head}</div>
              {e && <MoreToggle more={more} onToggle={toggleMore} />}
            </div>
            {r && <div class="py-line"><Py text={r} /></div>}
            {t[3] && t[3] !== t[0] && <div class="small muted">form in the text: <b lang={l}>{t[0]}</b></div>}
          </div>
          <button class="icon-btn" onClick={() => speak(l, e?.w || t[0])} aria-label="Listen"><Icon name="speaker" /></button>
          <a class="icon-btn plain" href={wikt} target="_blank" rel="noopener" aria-label="Look up on Wiktionary" title="Look up on Wiktionary"><Icon name="external" /></a>
          <button class="icon-btn plain" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </div>
        <div>
          {foreign
            ? <><div class="muted">Not in Stampify's word list yet.</div><WordTranslation l={l} word={t[0]} /></>
            : <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>{t[2]}</div>}
          {e && e.en !== t[2] && <div class="small muted">Dictionary: {e.en}</div>}
          {notes.map((n) => <NoteView key={n.title} n={n} />)}
          <div class="row small muted wrap" style={{ gap: 8, marginTop: 4 }}>
            {e && <span class="badge">{LANGS[l].levels[e.lv as 1]}</span>}
            {e?.pl && e.pl !== '-' && <span lang={l}>plural: die {e.pl}</span>}
            {e?.mw && <MeasureWord l={l} lx={lx} mw={e.mw} />}
          </div>
        </div>
        {more && e && <WordDetails l={l} e={e} />}
        <button class="ex small" style={{ border: 'none', borderLeft: '3px solid var(--rose-ink)', textAlign: 'left', width: '100%', color: 'inherit', font: 'inherit' }} onClick={() => speak(l, sentence)}>
          <div lang={l} class={cls('row', cjk && 'cjk')} style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>{sentence}<Icon name="speaker" size={18} /></div>
          {text.s[si].en && <div class="muted">{text.s[si].en}</div>}
        </button>
        {/* « » previous / next sentence, ‹ › previous / next word */}
        <div class="sheet-nav">
          <button class="btn" onClick={() => onSentence(-1)} disabled={si === 0} aria-label="Previous sentence"><Icon name="prev2" /></button>
          <button class="btn" onClick={() => onStep(-1)} aria-label="Previous word"><Icon name="prev" /></button>
          <button class="btn" onClick={() => onStep(1)} aria-label="Next word"><Icon name="next" /></button>
          <button class="btn" onClick={() => onSentence(1)} disabled={si === text.s.length - 1} aria-label="Next sentence"><Icon name="next2" /></button>
        </div>
        {foreign ? (
          <a class="btn primary block" href={wikt} target="_blank" rel="noopener"><Icon name="external" size={18} />Look it up on Wiktionary</a>
        ) : (
          <WordActions l={l} id={wid} w={e?.w ?? wid} onSave={() => save(lx, text, t)} prep={() => rememberToken(lx, t, text.lv)} />
        )}
      </div>
    </div>
  );
}

function NoteView({ n }: { n: GrammarNote }) {
  return (
    <div class="gnote">
      <b>{n.title}</b>
      <p>{n.x}</p>
    </div>
  );
}

/** The grammar notes of a sentence, opened from its G marker. */
function GrammarSheet({ l, text, si, notes, onClose }: { l: LangId; text: Text; si: number; notes: GrammarNote[]; onClose: () => void }) {
  const sentence = joinTokens(l, text.s[si].t);
  return (
    <div class="sheet" role="dialog" aria-label="Grammar note">
      <div class="sheet-inner stack">
        <div class="row">
          <h3 class="grow">Grammar</h3>
          <button class="icon-btn plain" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </div>
        <button class="ex small" style={{ border: 'none', borderLeft: '3px solid var(--rose-ink)', textAlign: 'left', width: '100%', color: 'inherit', font: 'inherit' }} onClick={() => speak(l, sentence)}>
          <div lang={l} class={cls('row', LANGS[l].cjk && 'cjk')} style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>{sentence}<Icon name="speaker" size={18} /></div>
          {text.s[si].en && <div class="muted">{text.s[si].en}</div>}
        </button>
        {notes.map((n) => <NoteView key={n.title} n={n} />)}
      </div>
    </div>
  );
}

/** A comprehension question: in the language taught (with the English a tap away) or in English. */
function QuizRound({ l, q, n, total, api }: {
  l: LangId; q: Question & { t?: { q: string; o: string[] } }; n: number; total: number; api: RoundApi;
}) {
  const [english, setEnglish] = useState(false);
  const t = q.t;
  const cjk = LANGS[l].cjk;
  return (
    <div>
      <div class="prompt">
        <div class="label">Question {n} of {total}</div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800 }} lang={t ? l : undefined} class={cls(t && cjk && 'cjk')}>{t ? t.q : q.q}</div>
        {t && (english
          ? <div class="muted" style={{ marginTop: 6 }}>{q.q}</div>
          : <button class="btn ghost sm" style={{ marginTop: 6 }} onClick={() => setEnglish(true)}>Show in English</button>)}
      </div>
      <Choice cjk={t && cjk ? l : undefined}
        options={t ? t.o.map((o, k) => <span><span lang={l}>{o}</span>{english && <span class="small muted" style={{ display: 'block', fontWeight: 500 }}>{q.o[k]}</span>}</span>) : q.o}
        answer={q.a}
        onDone={(ok) => api.answer(ok, { xp: XP.question, show: t ? <span lang={l}>{t.o[q.a]}</span> : q.o[q.a], note: t ? q.o[q.a] : undefined })} />
    </div>
  );
}
