/**
 * Everything about one word, shared by every place that shows a word:
 * - WordActions: Save / Write / I know it, in one row (each can be undone);
 * - WordDetails: what a Review card shows beyond the meaning (zh: the characters; example sentences; synonyms),
 *   behind the arrow next to the word (MoreToggle; the choice is remembered);
 * - WordPopup: the dictionary sheet any screen opens with openWord(l, id) (word lists, sentence games, characters).
 */
import { useEffect, useState } from 'preact/hooks';
import type { LangId } from '../content/types';
import { examples } from '../core/examples';
import { wiktionary } from '../core/finder';
import { LANGS } from '../core/langs';
import { characters, entry, firstSense, mwReading, readingOf, withArticle, type Entry, type Lexicon } from '../core/lexicon';
import { addWord, boxLabel, inCollection, isMastered, markMastered, nextReview, removeWord, wordCard } from '../core/progress';
import { speak } from '../core/speech';
import { state, useStore } from '../core/store';
import { undoable } from '../core/undo';
import { cls } from '../core/util';
import { canWrite } from '../games/chinese';
import { cjkWord, Py, useKeys } from '../ui/components';
import { Icon } from '../ui/icons';
import { useContent } from './shared';

// ---- the pop-up's state: which word is open ----

let open: { l: LangId; id: string } | null = null;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

/** Opens the dictionary pop-up for a word (vocabulary or saved extra). */
export function openWord(l: LangId, id: string) { open = { l, id }; emit(); }
export function closeWord() { if (open) { open = null; emit(); } }

if (typeof window !== 'undefined') window.addEventListener('hashchange', closeWord);

// ---- the "more" arrow: remembered across words and visits ----

const MORE_KEY = 'stampify.wordMore';
function readMore(): boolean { try { return localStorage.getItem(MORE_KEY) === '1'; } catch { return false; } }

export function useMore(): [boolean, () => void] {
  const [more, setMore] = useState(readMore);
  const toggle = () => {
    const v = !more;
    setMore(v);
    try { localStorage.setItem(MORE_KEY, v ? '1' : '0'); } catch { /* private mode: not remembered */ }
  };
  return [more, toggle];
}

export function MoreToggle({ more, onToggle }: { more: boolean; onToggle: () => void }) {
  return (
    <button type="button" class={cls('icon-btn plain more-toggle', more && 'on')} aria-expanded={more}
      aria-label={more ? 'Hide details' : 'Show characters, examples and more'} title={more ? 'Less' : 'More about this word'} onClick={onToggle}>
      <Icon name="down" size={20} />
    </button>
  );
}

// ---- pieces ----

/** "measure word: 条 [tiáo]" (zh nouns). */
export function MeasureWord({ l, lx, mw }: { l: LangId; lx: Lexicon; mw: string }) {
  const r = mwReading(lx, mw);
  return <span>measure word: <span lang={l}>{mw}</span>{r && <> [<Py text={r} />]</>}</span>;
}

/** zh: meanings of the single characters in a multi-character word; each can be saved, or opened in the pop-up. */
export function Characters({ l, lx, e, link }: { l: LangId; lx: Lexicon; e: Entry; link?: boolean }) {
  const parts = characters(lx, e);
  if (!parts.length) return null;
  const cards = state.langs[l]?.cards || {};
  return (
    <div class="chars">
      <div class="chars-h small muted">Characters</div>
      {parts.flatMap(({ ch, entries }) => entries.map((x, k) => {
        const saved = !!cards[x.id];
        const body = (
          <>
            <span class="char-w" lang={l}>{k === 0 ? ch : ''}</span>
            <span class="char-m">
              {x.r && <span class="char-r"><Py text={x.r} /></span>}
              <span class="small">{firstSense(x.en)}</span>
            </span>
          </>
        );
        return (
          <div key={x.id} class="char-row" onClick={(ev) => ev.stopPropagation()}>
            {link
              ? <button type="button" class="char-open" onClick={() => openWord(l, x.id)} aria-label={`Open ${ch}`}>{body}</button>
              : body}
            <button type="button" class={cls('icon-btn', saved && 'on')} disabled={saved} aria-label={saved ? `${ch} is in your words` : `Save ${ch} to your words`}
              title={saved ? 'In your words' : 'Save to your words'}
              onClick={() => undoable(l, () => addWord(l, x.id), (ok) => (ok ? `Saved ${ch}${x.r ? ` (${x.r})` : ''}` : null))}>
              <Icon name={saved ? 'check' : 'plus'} size={18} />
            </button>
          </div>
        );
      }))}
    </div>
  );
}

/** Example sentences (the word's own, then lines from the texts), each read aloud on tap. */
export function Examples({ l, list }: { l: LangId; list: ReturnType<typeof examples> }) {
  if (!list.length) return null;
  const cjk = LANGS[l].cjk;
  return (
    <div class="examples">
      {list.map((x, k) => (
        <button type="button" key={k} class="example" onClick={(ev) => { ev.stopPropagation(); speak(l, x.text); }}>
          <div lang={l} class={cls('ex-s', cjk && 'cjk')}><span>{x.parts.map((p, j) => (p.hit ? <b key={j}>{p.s}</b> : p.s))}</span><Icon name="speaker" size={18} /></div>
          {x.r && <div class="small muted"><Py text={x.r} /></div>}
          <div class="small muted">{x.en}{x.from && <i> · from “{x.from}”</i>}</div>
        </button>
      ))}
    </div>
  );
}

/**
 * What a Review card adds to the meaning: characters (zh), example sentences, synonyms. `link`: characters open in the
 * pop-up (off where the pop-up can't show: the floating window, fullscreen video).
 */
export function WordDetails({ l, e, link = true }: { l: LangId; e: Entry; link?: boolean }) {
  useStore();
  const data = useContent(l);
  if (!data) return null;
  const { c, lx } = data;
  const exs = examples(l, c, lx, e, 3);
  const chars = l === 'zh' ? characters(lx, e) : [];
  if (!exs.length && !chars.length && !e.syn?.length) return <p class="small muted word-details">No more details for this word yet.</p>;
  return (
    <div class="word-details stack">
      {chars.length > 0 && <Characters l={l} lx={lx} e={e} link={link} />}
      <Examples l={l} list={exs} />
      {e.syn?.length ? <p class="small muted">Also: <span lang={l}>{e.syn.join(', ')}</span></p> : null}
    </div>
  );
}

/**
 * Save / Write / I know it in one row. `onSave` replaces the plain save (the reader also awards XP); `prep` runs
 * before writing or marking (the reader stores the record of a word that isn't in the word list).
 */
export function WordActions({ l, id, w, onSave, prep, onLeave, noWrite }: {
  l: LangId; id: string; w: string; onSave?: () => void; prep?: () => void; onLeave?: () => void; noWrite?: boolean;
}) {
  useStore();
  const saved = inCollection(l, id);
  const mastered = isMastered(wordCard(l, id) || [0, 0, 0, 0]);
  const writable = !noWrite && l === 'zh' && canWrite({ w });
  return (
    <div class="word-actions">
      {saved
        ? <button type="button" class="btn" title="In your words: tap to remove" onClick={() => undoable(l, () => removeWord(l, id), 'Removed from your words')}><Icon name="check" size={18} />Saved</button>
        : <button type="button" class="btn primary" onClick={() => (onSave ? onSave() : undoable(l, () => addWord(l, id), (ok) => (ok ? 'Saved to your words' : null)))}><Icon name="plus" size={18} />Save</button>}
      {writable && (
        <button type="button" class="btn" onClick={() => {
          prep?.();
          const back = location.hash;
          onLeave?.();
          location.hash = `#/zh/play/strokes/${encodeURIComponent(id)}?back=${encodeURIComponent(back)}`;
        }}><Icon name="strokes" size={18} />Write</button>
      )}
      {mastered
        ? <span class="btn ghost static" aria-label="Mastered"><Icon name="check" size={18} />Mastered</span>
        : <button type="button" class="btn" title="I already know this word" onClick={() => undoable(l, () => { prep?.(); markMastered(l, id); }, 'Marked as mastered')}><Icon name="check" size={18} />I know it</button>}
    </div>
  );
}

// ---- the pop-up ----

/** Rendered once in the app shell; shows the word opened with openWord. */
export function WordPopup() {
  const [, setN] = useState(0);
  useEffect(() => { const f = () => setN((n) => n + 1); subs.add(f); return () => { subs.delete(f); }; }, []);
  if (!open) return null;
  return <PopupBody key={`${open.l}:${open.id}`} l={open.l} id={open.id} />;
}

function PopupBody({ l, id }: { l: LangId; id: string }) {
  useStore();
  const data = useContent(l);
  const [more, toggleMore] = useMore();
  useKeys((ev) => { if (ev.key === 'Escape') closeWord(); }, []);
  if (!data) return null;
  const { lx } = data;
  const e = entry(lx, id);
  if (!e) return null;
  const r = readingOf(l, e);
  const card = state.langs[l]?.cards[id];
  return (
    <>
      <button class="sheet-backdrop word-popup-backdrop" aria-label="Close" onClick={closeWord} />
      <div class="sheet word-popup" role="dialog" aria-label={`Word: ${e.w}`}>
        <div class="sheet-inner stack">
          <div class="row" style={{ alignItems: 'flex-start' }}>
            <div class="grow">
              <div class="row" style={{ gap: 4 }}>
                <div class={cls('w', cjkWord(l, e.w).includes('cjk') && 'cjk')} lang={l}>{withArticle(l, e)}</div>
                <MoreToggle more={more} onToggle={toggleMore} />
              </div>
              {r && <div class="py-line"><Py text={r} /></div>}
            </div>
            <button class="icon-btn" onClick={() => speak(l, e.w)} aria-label="Listen"><Icon name="speaker" /></button>
            <a class="icon-btn plain" href={wiktionary(l, e.w)} target="_blank" rel="noopener" aria-label="Look up on Wiktionary" title="Look up on Wiktionary"><Icon name="external" /></a>
            <button class="icon-btn plain" onClick={closeWord} aria-label="Close"><Icon name="close" /></button>
          </div>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>{e.en}</div>
            <div class="row small muted wrap" style={{ gap: 8, marginTop: 4 }}>
              {!e.extra && <span class="badge">{LANGS[l].levels[e.lv as 1]}</span>}
              {e.pl && e.pl !== '-' && <span lang={l}>plural: die {e.pl}</span>}
              {e.mw && <MeasureWord l={l} lx={lx} mw={e.mw} />}
              {card && <span>{boxLabel(card[0])} · next review {nextReview(card)}</span>}
            </div>
          </div>
          {more && <WordDetails l={l} e={e} />}
          <WordActions l={l} id={id} w={e.w} onLeave={closeWord} />
        </div>
      </div>
    </>
  );
}
