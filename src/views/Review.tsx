import { useEffect, useState } from 'preact/hooks';
import type { Content, LangId } from '../content/types';
import { examples } from '../core/examples';
import { inBand, LANGS } from '../core/langs';
import { entry, readingOf, withArticle, type Entry, type Lexicon } from '../core/lexicon';
import { addWords, boxLabel, grade, isDue, isMastered, isNew, levelMastered, nextBox, nextReview, reviewOrder, XP, type Grade } from '../core/progress';
import { autoSpeak, speak } from '../core/speech';
import { lang, state, useStore } from '../core/store';
import { plural, sample } from '../core/util';
import { cjkWord, Empty, Loading, Py, useKeys } from '../ui/components';
import { Icon } from '../ui/icons';
import { Session, type RoundApi } from '../ui/session';
import { canWrite, WritePad } from '../games/chinese';
import { rememberLang, useContent } from './shared';
import { Characters, Examples, MeasureWord } from './WordInfo';
import { undoable } from '../core/undo';

const MAX_DUE = 20;
const MAX_NEW = 10;

function buildQueue(l: LangId, lx: Lexicon): Entry[] {
  // Words of a level marked as known are mastered (their cards are kept as they are)
  const cards = Object.entries(state.langs[l]?.cards || {}).filter(([id]) => !levelMastered(l, id));
  const due = cards.filter(([, c]) => isDue(c)).sort((a, b) => a[1][1] - b[1][1]).slice(0, MAX_DUE);
  const fresh = cards.filter(([, c]) => isNew(c)).sort((a, b) => a[1][3] - b[1][3]).slice(0, MAX_NEW);
  return [...due, ...fresh].map(([id]) => entry(lx, id)).filter((e): e is Entry => !!e);
}

export function Review({ l }: { l: LangId }) {
  useStore();
  const data = useContent(l);
  rememberLang(l);
  const [started, setStarted] = useState(0);
  if (!data) return <Loading />;
  const { c, lx } = data;
  const exit = `#/${l}`;
  const queue = buildQueue(l, lx);

  if (!queue.length && !started) {
    const ls = lang(l);
    const nCards = Object.keys(ls.cards).length;
    const next = Object.entries(ls.cards).filter(([id]) => !levelMastered(l, id)).map(([, c]) => c).filter((c) => !isNew(c) && !isMastered(c)).sort((a, b) => reviewOrder(a) - reviewOrder(b))[0];
    const starters = lx.vocab.filter((e) => inBand(e.lv, ls.band || 1) && !ls.cards[e.id] && !e.bound && !levelMastered(l, e.id));
    return (
      <div>
        <div class="game-top"><a class="icon-btn plain" href={exit} aria-label="Back"><Icon name="close" /></a></div>
        {nCards ? (
          <Empty icon="check" title="All caught up!">
            Nothing to review right now{next ? `; next review ${nextReview(next)}` : ''}. Play a game or read a text to collect more words.
          </Empty>
        ) : (
          <Empty icon="review" title="Your collection is empty">
            Words you save while reading land here, scheduled with spaced repetition.
          </Empty>
        )}
        {starters.length > 0 && (
          <button class="btn primary block" style={{ marginTop: 18 }} onClick={() => {
            undoable(l, () => addWords(l, sample(starters, 10).map((e) => e.id)), (n) => `Added ${plural(n, 'word')} from ${ls.band ? 'your level' : 'the word list'}`);
            setStarted((s) => s + 1);
          }}><Icon name="plus" size={18} />Add 10 words from my level</button>
        )}
        <a class="btn block" style={{ marginTop: 12 }} href={`#/${l}/read`}><Icon name="read" size={18} />Read a text</a>
      </div>
    );
  }

  return (
    <Session key={started} lang={l} id="review" title="Review" exit={exit} prepare={() => buildQueue(l, lx)}>
      {(api, items) => <Card key={`${api.i}-${items[api.i]?.id}`} l={l} c={c} lx={lx} e={items[api.i]} api={api} again={() => items.push(items[api.i])} />}
    </Session>
  );
}

function Card({ l, c, lx, e, api, again }: { l: LangId; c: Content; lx: Lexicon; e: Entry; api: RoundApi; again: () => void }) {
  const [open, setOpen] = useState(false);
  // In zh/ja hearing the word gives its reading away, so it plays when the card turns over
  const hidden = !LANGS[l].spaced;
  const r = readingOf(l, e);
  const card = state.langs[l]!.cards[e.id];
  useEffect(() => { if (!hidden) autoSpeak(l, e.w); }, []);
  const flip = () => { if (!open) { setOpen(true); if (hidden) autoSpeak(l, e.w); } };
  /** Chinese: practise writing the word after turning the card over, then come back to grade it. */
  const [writing, setWriting] = useState(false);
  const writable = l === 'zh' && canWrite(e);
  const rate = (g: Grade) => {
    if (!card) return api.next();
    // Mastered takes the word out of reviews for good, so a slip of the finger can be undone
    if (g === 3) undoable(l, () => grade(l, e.id, g), `${e.w}: marked as mastered`);
    else grade(l, e.id, g);
    if (g === 0) again();
    api.score(g > 0, { xp: XP.review });
    api.next();
  };
  useKeys((ev) => {
    if (writing) { if (ev.key === 'Escape') setWriting(false); return; }
    if (!open && (ev.key === ' ' || ev.key === 'Enter')) { ev.preventDefault(); flip(); return; }
    if (open && ['1', '2', '3', '4'].includes(ev.key)) rate((+ev.key - 1) as Grade);
    if (open && writable && (ev.key === 'w' || ev.key === 'W')) setWriting(true);
  }, [open, writing]);

  if (writing) return <WritePad e={e} onClose={() => setWriting(false)} />;

  const exs = open ? examples(l, c, lx, e) : [];
  const preview = (g: Grade) => (card ? boxLabel(nextBox(card, g)) : '');
  return (
    <div>
      <div class="card flash" onClick={flip} role="button" aria-label={open ? 'Card' : 'Show answer'}>
        {card && isNew(card) && <span class="badge accent">new</span>}
        <div class={cjkWord(l, e.w)} lang={l}>{withArticle(l, e)}</div>
        {open ? (
          <>
            {r && <div class="reading"><Py text={r} /></div>}
            <hr />
            <div class="meaning">{e.en}</div>
            <div class="row small muted wrap" style={{ justifyContent: 'center' }}>
              {e.pl && e.pl !== '-' && <span lang={l}>plural: die {e.pl}</span>}
              {e.mw && <MeasureWord l={l} lx={lx} mw={e.mw} />}
              {!e.extra && <span class="badge">{LANGS[l].levels[e.lv as 1]}</span>}
            </div>
            <div class="row wrap" style={{ justifyContent: 'center', gap: 8 }}>
              <button class="btn sm" onClick={(ev) => { ev.stopPropagation(); speak(l, e.w); }}><Icon name="speaker" size={18} />Listen</button>
              {writable && (
                <button class="btn sm" onClick={(ev) => { ev.stopPropagation(); setWriting(true); }}><Icon name="strokes" size={18} />Practise writing</button>
              )}
            </div>
            {l === 'zh' && <Characters l={l} lx={lx} e={e} />}
            <Examples l={l} list={exs} />
          </>
        ) : (
          <p class="muted small" style={{ marginTop: 18 }}>Do you know it? Tap to check.</p>
        )}
      </div>
      <div style={{ marginTop: 18 }}>
        {open ? (
          <div class="grades">
            <button class="btn bad" onClick={() => rate(0)}>Again<small>{preview(0)}</small></button>
            <button class="btn ok" onClick={() => rate(1)}>Good<small>{preview(1)}</small></button>
            <button class="btn primary" onClick={() => rate(2)}>Easy<small>{preview(2)}</small></button>
            <button class="btn" onClick={() => rate(3)}>Mastered<small>{preview(3)}</small></button>
          </div>
        ) : (
          <button class="btn primary block" onClick={flip}>Show answer</button>
        )}
        <p class="kbd center desktop-only" style={{ marginTop: 10 }}>Space: show · 1 again · 2 good · 3 easy · 4 mastered{writable && open ? ' · W write' : ''}</p>
      </div>
    </div>
  );
}
