import { useState } from 'preact/hooks';
import type { LangId, Level } from '../content/types';
import { LANGS } from '../core/langs';
import { collection, readingOf, withArticle, type Entry } from '../core/lexicon';
import { plain } from '../core/pinyin';
import { addWord, addWords, effCard, isKnown, isMastered, isNew, knownLevels, KNOWN_BOX, levelMastered, markMastered, MAX_BOX, nextReview, removeWord, reviewOrder, setLevelKnown } from '../core/progress';
import { canWrite } from '../games/chinese';
import { speak } from '../core/speech';
import { lang, useStore } from '../core/store';
import { cls, plural, stripAccents } from '../core/util';
import { Empty, Loading, Py } from '../ui/components';
import { Icon } from '../ui/icons';
import { rememberLang, useContent } from './shared';
import { openWord } from './WordInfo';
import { confirmMany, undoable } from '../core/undo';

type Filter = 'all' | 'new' | 'learning' | 'known' | 'mastered';
type Sort = 'added' | 'review';

function matches(e: Entry, q: string): boolean {
  if (!q) return true;
  const n = stripAccents(q.toLowerCase());
  return stripAccents(e.w.toLowerCase()).includes(n) || e.en.toLowerCase().includes(n) || (!!e.r && plain(e.r).replace(/\s/g, '').includes(n.replace(/\s/g, '')));
}

export function Words({ l }: { l: LangId }) {
  useStore();
  const data = useContent(l);
  rememberLang(l);
  const ls = lang(l);
  const [tab, setTab] = useState<'mine' | 'browse'>(Object.keys(ls.cards).length ? 'mine' : 'browse');
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('added');
  const [q, setQ] = useState('');
  const [lv, setLv] = useState<Level>((Math.max(1, ls.band * 2 - 1)) as Level);
  const [limit, setLimit] = useState(60);
  if (!data) return <Loading />;
  const { lx } = data;
  const m = LANGS[l];

  /** A word's card as used everywhere: mastered while its level is marked as known. */
  const card = (id: string) => effCard(l, id, ls.cards[id])!;
  const known = knownLevels(l);
  const mine = collection(lx).filter((e) => {
    const c = card(e.id);
    if (filter === 'new' && !isNew(c)) return false;
    if (filter === 'known' && (!isKnown(c) || isMastered(c))) return false;
    if (filter === 'mastered' && !isMastered(c)) return false;
    if (filter === 'learning' && (isNew(c) || isKnown(c))) return false;
    return matches(e, q);
  });
  if (sort === 'review') mine.sort((a, b) => reviewOrder(card(a.id)) - reviewOrder(card(b.id)));
  // Newest first: by the day added, and within a day the last saved first
  else mine.reverse().sort((a, b) => ls.cards[b.id][3] - ls.cards[a.id][3]);
  const browse = lx.vocab.filter((e) => (q ? matches(e, q) : e.lv === lv));
  const lvKnown = known.includes(lv);
  const notYet = lvKnown ? [] : browse.filter((e) => !ls.cards[e.id]);
  const all = collection(lx);
  const nKnown = all.filter((e) => isKnown(card(e.id)) && !isMastered(card(e.id))).length;
  const mastered = all.filter((e) => isMastered(card(e.id))).length;

  return (
    <div>
      <h1>Words</h1>
      <p class="muted small" style={{ marginTop: 4 }}>
        {plural(all.length, 'word')} collected · {nKnown} known (box {KNOWN_BOX}+) · {mastered} mastered.
        {known.length > 0 && <> All {known.map((x) => m.levels[x as Level]).join(', ')} words count as mastered.</>} Games and reviews both count: a word moves up a box when you get it right while it's due or new, and goes back to the start when you miss it. Mastered words don't come back for review.
      </p>
      <div class="seg" style={{ margin: '14px 0' }}>
        <button class={cls(tab === 'mine' && 'on')} onClick={() => setTab('mine')}>My words</button>
        <button class={cls(tab === 'browse' && 'on')} onClick={() => setTab('browse')}>Word list</button>
      </div>
      <input type="search" placeholder={m.reading ? `Search word, ${m.readingName} or English` : 'Search word or English'} value={q}
        onInput={(e) => setQ((e.target as HTMLInputElement).value)} />

      {tab === 'mine' ? (
        <>
          <div class="pills" style={{ margin: '12px 0' }}>
            {(['all', 'new', 'learning', 'known', 'mastered'] as Filter[]).map((f) => (
              <button key={f} class={cls('pill', filter === f && 'on')} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          {all.length > 1 && (
            <div class="row small muted" style={{ gap: 8, margin: '0 0 8px' }}>
              <span>Sort:</span>
              <div class="pills">
                {([['added', 'Added'], ['review', 'Next review']] as [Sort, string][]).map(([k, t]) => (
                  <button key={k} class={cls('pill', sort === k && 'on')} onClick={() => setSort(k)}>{t}</button>
                ))}
              </div>
            </div>
          )}
          {!all.length && <Empty icon="words" title="No words yet">Save words while reading, or add them from the word list.</Empty>}
          {mine.slice(0, limit).map((e) => {
            const c = card(e.id);
            return (
              <Row key={e.id} l={l} e={e}>
                <span class="srs">
                  <Boxes box={c[0]} />
                  <span class="small mono muted" title="Next review">{nextReview(c)}</span>
                </span>
                {!isMastered(c) && <button class="icon-btn plain" aria-label="Mark as mastered" title="Mark as mastered" onClick={() => undoable(l, () => markMastered(l, e.id), `${e.w}: marked as mastered`)}><Icon name="check" size={20} /></button>}
                <button class="icon-btn plain" aria-label="Remove" title="Remove" onClick={() => undoable(l, () => removeWord(l, e.id), `Removed ${e.w}`)}><Icon name="trash" size={20} /></button>
              </Row>
            );
          })}
        </>
      ) : (
        <>
          {!q && (
            <div class="pills" style={{ margin: '12px 0' }}>
              {([1, 2, 3, 4, 5, 6] as Level[]).map((x) => (
                <button key={x} class={cls('pill', lv === x && 'on', known.includes(x) && 'lvk')} onClick={() => { setLv(x); setLimit(60); }}>
                  {known.includes(x) && <Icon name="check" size={14} />}{m.levels[x]}
                </button>
              ))}
            </div>
          )}
          {!q && (
            <label class={cls('card row level-known', lvKnown && 'on')}>
              <input type="checkbox" checked={lvKnown} onChange={(ev) => {
                const box = ev.target as HTMLInputElement;
                const on = box.checked;
                if (on && !confirm(`Count all ${browse.length} ${m.levels[lv]} words as mastered?\n\nThey will stop coming up for review. You can untick this any time; each word's own progress is kept.`)) { box.checked = false; return; }
                undoable(l, () => setLevelKnown(l, lv, on), on ? `All ${m.levels[lv]} words count as mastered` : `${m.levels[lv]} words are back to their own progress`);
              }} />
              <span class="grow">
                <b>I already know {m.levels[lv]}</b>
                <span class="small muted">
                  {lvKnown
                    ? ` All ${m.levels[lv]} words count as mastered and don't come up for review. Untick to undo: every word's own progress is kept.`
                    : ` Count every ${m.levels[lv]} word as mastered, so it never comes up for review. You can untick it any time; each word's own progress is kept.`}
                </span>
              </span>
            </label>
          )}
          {notYet.length > 0 && !q && (
            <button class="btn block" style={{ margin: '4px 0 10px' }} onClick={() => {
              if (!confirmMany(notYet.length, `Add all ${notYet.length} ${m.levels[lv]} words`)) return;
              undoable(l, () => addWords(l, notYet.map((e) => e.id)), (n) => `Added ${plural(n, 'word')}`);
            }}><Icon name="plus" size={18} />Add all {notYet.length} {m.levels[lv]} words</button>
          )}
          {!browse.length && <p class="muted center" style={{ marginTop: 20 }}>No matches.</p>}
          {browse.slice(0, limit).map((e) => (
            <Row key={e.id} l={l} e={e} box={effCard(l, e.id, ls.cards[e.id] ?? ls.seen?.[e.id])?.[0] ?? 0}>
              {ls.cards[e.id] || levelMastered(l, e.id)
                ? <span class="badge ok">{isMastered(card(e.id)) ? 'Mastered' : 'Added'}</span>
                : <>
                    <button class="icon-btn plain" aria-label="I know this word" title="I know this word" onClick={() => undoable(l, () => markMastered(l, e.id), `${e.w}: saved as mastered`)}><Icon name="check" size={20} /></button>
                    <button class="btn sm" onClick={() => undoable(l, () => addWord(l, e.id), `Added ${e.w}`)}><Icon name="plus" size={16} />Add</button>
                  </>}
            </Row>
          ))}
        </>
      )}
      {(tab === 'mine' ? mine : browse).length > limit && (
        <button class="btn ghost block" onClick={() => setLimit(limit + 100)}>Show more</button>
      )}
    </div>
  );
}

/** Progress boxes: a word moves up one each day it is answered right; all lit when mastered. */
function Boxes({ box }: { box: number }) {
  return <span class="boxes" title={box >= MAX_BOX ? 'Mastered' : `Box ${box} of ${MAX_BOX}`}>{Array.from({ length: MAX_BOX }, (_, k) => <i key={k} class={cls(k < box && 'on')} />)}</span>;
}

/** A word with its meaning; `box` shows its progress boxes under the meaning (the word list, saved or not). */
function Row({ l, e, box, children }: { l: LangId; e: Entry; box?: number; children: preact.ComponentChildren }) {
  const r = readingOf(l, e);
  return (
    <div class="word-row">
      <button class="icon-btn plain" onClick={() => speak(l, e.w)} aria-label="Listen"><Icon name="speaker" size={20} /></button>
      <button type="button" class="grow word-open" onClick={() => openWord(l, e.id)} aria-label={`Open ${e.w}`}>
        <div class="row" style={{ gap: 8 }}>
          <span class={cls('w', LANGS[l].cjk && 'cjk')} lang={l}>{withArticle(l, e)}</span>
          {r && <span class="small mono"><Py text={r} /></span>}
        </div>
        <div class="small muted">{e.en}{e.pl && e.pl !== '-' ? ` · pl. ${e.pl}` : ''}</div>
        {box !== undefined && <Boxes box={box} />}
      </button>
      {l === 'zh' && canWrite(e) && (
        <a class="icon-btn plain" href={`#/zh/play/strokes/${encodeURIComponent(e.id)}?back=${encodeURIComponent('#/zh/words')}`} aria-label="Practise writing" title="Practise writing"><Icon name="strokes" size={20} /></a>
      )}
      {children}
    </div>
  );
}
