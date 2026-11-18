/**
 * Resources tab: shelves of extras for a language. The main one is the Guidebook: short lessons in a recommended order
 * (units), each an article with examples plus exercises; the order is a suggestion, any lesson can be opened any time.
 * Cheat sheets are a separate shelf of reference pages (big tables to look things up), with no exercises or stamps.
 * New kinds of resources become new shelves (SHELVES below).
 *   #/<lang>/guide · #/<lang>/guide/<lessonId> · #/<lang>/guide/<lessonId>/practice
 *   #/<lang>/guide/sheets · #/<lang>/guide/sheets/<sheetId>
 */
import { Fragment } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { hasGuide, hasSheets, loadGuide, loadSheets } from '../content/guide';
import type { Block, CheatSheet, Exercise, LangId, Lesson, Unit } from '../content/types';
import { LANGS } from '../core/langs';
import { XP } from '../core/progress';
import { speak } from '../core/speech';
import { commit, lang, state, useStore } from '../core/store';
import { cls, compare, shuffle, stripAccents, today } from '../core/util';
import { TypeAnswer } from '../games/common';
import { plain } from '../core/pinyin';
import { Choice, Empty, Loading, Py } from '../ui/components';
import { Icon } from '../ui/icons';
import { Session, type RoundApi } from '../ui/session';
import { findGame } from '../games';
import { rememberLang, useContent } from './shared';

/** A lesson counts as done (stamped) from this exercise score on. */
const PASS = 80;

function useGuide(l: LangId): Unit[] | null {
  const [units, setUnits] = useState<{ l: LangId; u: Unit[] } | null>(null);
  useEffect(() => {
    let live = true;
    loadGuide(l).then((u) => { if (live) setUnits({ l, u }); });
    return () => { live = false; };
  }, [l]);
  return units && units.l === l ? units.u : null;
}

function useSheets(l: LangId): CheatSheet[] | null {
  const [sheets, setSheets] = useState<{ l: LangId; s: CheatSheet[] } | null>(null);
  useEffect(() => {
    let live = true;
    loadSheets(l).then((s) => { if (live) setSheets({ l, s }); });
    return () => { live = false; };
  }, [l]);
  return sheets && sheets.l === l ? sheets.s : null;
}

type Shelf = 'guidebook' | 'sheets';

/** The shelves of the Resources tab, in order; a language shows the ones it has content for. */
const SHELVES: { id: Shelf; name: string; icon: string; path: string; has: (l: LangId) => boolean }[] = [
  { id: 'guidebook', name: 'Guidebook', icon: 'guide', path: '', has: hasGuide },
  { id: 'sheets', name: 'Cheat sheets', icon: 'sheet', path: '/sheets', has: hasSheets },
];

/** The Resources title and the switch between its shelves (hidden when a language has only one). */
export function ResourcesHead({ l, on }: { l: LangId; on: Shelf }) {
  const shelves = SHELVES.filter((s) => s.has(l));
  return (
    <>
      <h1>Resources</h1>
      {shelves.length > 1 && (
        <div class="seg guide-shelves" role="tablist">
          {shelves.map((s) => (
            <a key={s.id} role="tab" aria-selected={on === s.id} class={cls(on === s.id && 'on')} href={`#/${l}/guide${s.path}`}>
              <Icon name={s.icon} size={18} />{s.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

/** Every lesson in order, with its number ("2.3") and unit. */
function flatten(units: Unit[]) {
  return units.flatMap((u, ui) => u.lessons.map((lesson, li) => ({ lesson, unit: u, num: `${ui + 1}.${li + 1}` })));
}

const progressOf = (l: LangId, id: string) => state.langs[l]?.guide?.[id];
const isDone = (l: LangId, id: string) => (progressOf(l, id)?.[1] ?? -1) >= PASS;

/** **bold** in lesson text. */
function rich(s: string) {
  return s.split(/\*\*(.+?)\*\*/g).map((part, k) => (k % 2 ? <b key={k}>{part}</b> : <Fragment key={k}>{part}</Fragment>));
}

// ---------------- the list ----------------

export function GuideList({ l }: { l: LangId }) {
  useStore();
  rememberLang(l);
  const units = useGuide(l);
  if (!units) return <Loading />;
  if (!units.length && hasSheets(l)) return <SheetList l={l} />;
  if (!units.length) return <Empty icon="guide" title="No guidebook yet">The guidebook for {LANGS[l].name} is coming.</Empty>;
  const all = flatten(units);
  const done = all.filter((x) => isDone(l, x.lesson.id)).length;
  const next = all.find((x) => !isDone(l, x.lesson.id));
  return (
    <div>
      <ResourcesHead l={l} on="guidebook" />
      <p class="muted" style={{ margin: '6px 0 14px' }}>
        Short lessons on how {LANGS[l].name} works, each with examples and exercises. Follow the route or jump to any lesson.
      </p>
      <section class="continue-card">
        <div class="label">{done} of {all.length} lessons stamped</div>
        <div class="tprog" style={{ margin: '8px 0 12px' }}><b style={{ width: `${(done / all.length) * 100}%` }} /></div>
        {next && (
          <div class="row" style={{ alignItems: 'center' }}>
            <div class="grow"><span class="mono small muted">{next.num}</span> <span class="t">{next.lesson.title}</span></div>
            <a class="btn sm" href={`#/${l}/guide/${next.lesson.id}`}>{progressOf(l, next.lesson.id) ? 'Continue' : 'Start'}</a>
          </div>
        )}
      </section>
      {units.map((u, ui) => (
        <section key={u.title}>
          <div class="section-title"><h2>{ui + 1}. {u.title}</h2></div>
          <p class="small muted" style={{ marginTop: -6, marginBottom: 10 }}>{u.about}</p>
          <div class="lesson-list">
            {u.lessons.map((lesson, li) => {
              const p = progressOf(l, lesson.id);
              const stamped = (p?.[1] ?? -1) >= PASS;
              return (
                <a key={lesson.id} class={cls('lesson-row', stamped && 'done')} href={`#/${l}/guide/${lesson.id}`}>
                  <span class="num mono">{ui + 1}.{li + 1}</span>
                  <div class="grow">
                    <b>{lesson.title}</b>
                    <div class="small muted">{lesson.summary}</div>
                  </div>
                  <span class="state">
                    {stamped ? <span class="ink-stamp green mini" aria-label="Stamped"><Icon name="check" size={16} /></span>
                      : p && p[1] >= 0 ? <span class="small mono">{p[1]}%</span>
                      : p ? <span class="small muted">read</span>
                      : <span class="badge">{LANGS[l].levels[lesson.lv]}</span>}
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

// ---------------- a lesson ----------------

export function LessonView({ l, id, practice }: { l: LangId; id: string; practice?: boolean }) {
  useStore();
  rememberLang(l);
  const units = useGuide(l);
  const all = useMemo(() => (units ? flatten(units) : []), [units]);
  const k = all.findIndex((x) => x.lesson.id === id);
  // Opening a lesson marks it as read
  useEffect(() => {
    if (k < 0 || practice) return;
    const g = (lang(l).guide ||= {});
    if (!g[id]) { g[id] = [today(), -1]; commit(); }
  }, [k, id, practice]);
  if (!units) return <Loading />;
  if (k < 0) return <Empty icon="search" title="Lesson not found"><a href={`#/${l}/guide`}>Back to the guidebook</a></Empty>;
  const { lesson, unit, num } = all[k];
  if (practice) return <LessonPractice l={l} lesson={lesson} />;
  const prev = all[k - 1];
  const next = all[k + 1];
  const p = progressOf(l, id);
  return (
    <div class="lesson">
      <div class="game-top">
        <a class="icon-btn plain" href={`#/${l}/guide`} aria-label="Back to the guidebook"><Icon name="back" /></a>
        <div class="grow"><span class="badge accent">{num} · {unit.title}</span></div>
        <span class="badge">{LANGS[l].levels[lesson.lv]}</span>
      </div>
      {/* Headings are set in capitals, which would turn ß into SS: use the capital ẞ */}
      <h1>{lesson.title.replace(/ß/g, 'ẞ')}</h1>
      <p class="muted" style={{ marginBottom: 18, paddingBottom: 14, borderBottom: '2px dashed var(--line)' }}>{lesson.summary}</p>
      <article class="lesson-body">
        {lesson.body.map((b, i) => <BlockView key={i} l={l} b={b} />)}
      </article>
      <div class="card stack" style={{ marginTop: 22 }}>
        <h2>Practice</h2>
        <p class="small muted">
          {lesson.ex.length} exercises on this lesson. {p && p[1] >= 0 ? `Your best: ${p[1]}%. ` : ''}Score {PASS}% or more to stamp it.
        </p>
        <a class="btn primary block" href={`#/${l}/guide/${id}/practice`}>{p && p[1] >= 0 ? 'Practise again' : 'Start the exercises'}</a>
      </div>
      <div class="pager" style={{ marginTop: 14 }}>
        {prev ? <a class="btn grow" href={`#/${l}/guide/${prev.lesson.id}`}><Icon name="prev" size={18} />{prev.num}</a> : <span class="grow" />}
        {next && <a class="btn grow" href={`#/${l}/guide/${next.lesson.id}`}>{next.num} {next.lesson.title}<Icon name="next" size={18} /></a>}
      </div>
    </div>
  );
}

function BlockView({ l, b }: { l: LangId; b: Block }) {
  if ('practice' in b) return <PracticeLink l={l} id={b.practice} arg={b.arg} note={b.note} />;
  if ('sounds' in b) {
    return (
      <div class="sound-chart">
        {b.sounds.map(([spell, ipa, word, en, r], i) => (
          <button key={i} class="sound-row" onClick={() => speak(l, word)}>
            {/* A single letter is read by its name (V → "Vau"); other spellings just label the row */}
            <span class={cls('spell', LANGS[l].cjk && 'cjk')} lang={l}
              onClick={/^\p{L}$/u.test(spell) ? (e) => { e.stopPropagation(); speak(l, spell); } : undefined}>{spell}</span>
            <span class="ipa">[{ipa}]</span>
            <span class="grow">
              <span lang={l} class={cls('t', LANGS[l].cjk && 'cjk')}>{word}</span>
              {r && <span class="small mono"> <Py text={r} /></span>}
              <span class="small muted"> · {en}</span>
            </span>
            <Icon name="speaker" size={16} />
          </button>
        ))}
      </div>
    );
  }
  if ('h' in b) return <h3 class="lesson-h">{b.h}</h3>;
  if ('p' in b) return <p>{rich(b.p)}</p>;
  if ('tip' in b) return <p class="notice small"><span>{rich(b.tip)}</span></p>;
  if ('table' in b) {
    const [head, ...rows] = b.table;
    return (
      <div class="table-wrap">
        <table class="lesson-table">
          <thead><tr>{head.map((c, i) => <th key={i}>{rich(c)}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} lang={(LANGS[l].cjk ? inScript(l, c) : j > 0) ? l : undefined}>{rich(c)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }
  return (
    <div class="lesson-ex">
      {b.ex.map(([t, en, r], i) => (
        <button key={i} class="ex-line" onClick={() => speak(l, t.replace(/\*\*/g, ''))}>
          <Icon name="speaker" size={16} />
          <span>
            <span lang={l} class={cls('t', LANGS[l].cjk && 'cjk')}>{rich(t)}</span>
            {r && <span class="small mono"><Py text={r.replace(/\*\*/g, '')} /></span>}
            <span class="small muted">{en}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

/** A card that opens the app activity training what the lesson teaches. */
function PracticeLink({ l, id, arg, note }: { l: LangId; id: string; arg?: string; note?: string }) {
  const data = useContent(l);
  const def = findGame(l, id);
  if (!def) return null;
  const deck = id === 'drill' ? data?.c.drills.find((d) => d.id === arg) : undefined;
  if (id === 'drill' && !deck) return null;
  return (
    <a class={cls('ticket practice-link', `cat-${def.cat}`)} href={`#/${l}/play/${id}${arg ? `/${encodeURIComponent(arg)}` : ''}?back=${encodeURIComponent(location.hash)}`}>
      <div class="top">
        <Icon name={id} size={24} />
        <div>
          <span class="small muted">Practise this in the app</span>
          <b>{deck ? deck.name : arg && id !== 'drill' ? `${def.name}: ${arg}` : def.name}</b>
          <p>{note || (deck ? deck.desc : def.desc)}</p>
        </div>
      </div>
    </a>
  );
}

// ---------------- cheat sheets ----------------

export function SheetList({ l }: { l: LangId }) {
  rememberLang(l);
  const sheets = useSheets(l);
  if (!sheets) return <Loading />;
  return (
    <div>
      <ResourcesHead l={l} on="sheets" />
      <p class="muted" style={{ margin: '6px 0 14px' }}>
        Reference pages that sum up big topics in one place. Nothing to practise or stamp: look things up whenever you need them.
      </p>
      {!sheets.length && <Empty icon="sheet" title="No cheat sheets yet">Cheat sheets for {LANGS[l].name} are coming.</Empty>}
      <div class="sheet-list">
        {sheets.map((x) => {
          const rows = tableRows(x.body);
          return (
            <a key={x.id} class="sheet-card" href={`#/${l}/guide/sheets/${x.id}`}>
              <Icon name="sheet" size={26} />
              <div class="grow">
                <b>{x.title}</b>
                <div class="small muted">{x.summary}</div>
              </div>
              {rows > 0 && <span class="small mono muted">{rows}</span>}
            </a>
          );
        })}
      </div>
    </div>
  );
}

const tableRows = (body: Block[]) => body.reduce((n, b) => n + ('table' in b ? b.table.length - 1 : 0), 0);

/** Text as the filter compares it: no **bold** marks, no accents or tone marks, lowercase. */
const searchable = (t: string) => stripAccents(t.replace(/\*\*/g, '').toLowerCase());

/**
 * The blocks to show for a filter: only table rows that match (with their table's header and its section heading);
 * the explanations are left out while filtering.
 */
function filterBlocks(body: Block[], q: string): Block[] {
  const n = searchable(q.trim());
  if (!n) return body;
  const out: Block[] = [];
  let heading: Block | null = null;
  let shownHeading: Block | null = null;
  for (const b of body) {
    if ('h' in b) heading = b;
    if (!('table' in b)) continue;
    const [head, ...rows] = b.table;
    const hits = rows.filter((r) => r.some((c) => searchable(c).includes(n)));
    if (!hits.length) continue;
    if (heading && shownHeading !== heading) { out.push(heading); shownHeading = heading; }
    out.push({ table: [head, ...hits] });
  }
  return out;
}

export function SheetView({ l, id }: { l: LangId; id: string }) {
  rememberLang(l);
  const sheets = useSheets(l);
  const [q, setQ] = useState('');
  if (!sheets) return <Loading />;
  const k = sheets.findIndex((x) => x.id === id);
  const back = `#/${l}/guide/sheets`;
  if (k < 0) return <Empty icon="search" title="Cheat sheet not found"><a href={back}>Back to the cheat sheets</a></Empty>;
  const sheet = sheets[k];
  const rows = tableRows(sheet.body);
  const shown = filterBlocks(sheet.body, q);
  const prev = sheets[k - 1];
  const next = sheets[k + 1];
  return (
    <div class="lesson cheat">
      <div class="game-top">
        <a class="icon-btn plain" href={back} aria-label="Back to the cheat sheets"><Icon name="back" /></a>
        <div class="grow"><span class="badge cheat-badge"><Icon name="sheet" size={14} />Cheat sheet</span></div>
      </div>
      <h1>{sheet.title.replace(/ß/g, 'ẞ')}</h1>
      <p class="muted" style={{ marginBottom: 14 }}>{sheet.summary}</p>
      {rows > 12 && (
        <div class="sheet-filter">
          <input type="search" placeholder={LANGS[l].reading ? `Filter: word, ${LANGS[l].readingName} or English` : 'Filter: word or English'}
            value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} />
        </div>
      )}
      <article class="lesson-body">
        {shown.map((b, i) => <BlockView key={i} l={l} b={b} />)}
        {!shown.length && <p class="muted center" style={{ marginTop: 20 }}>Nothing on this sheet matches “{q.trim()}”.</p>}
      </article>
      <div class="pager" style={{ marginTop: 14 }}>
        {prev ? <a class="btn grow" href={`#/${l}/guide/sheets/${prev.id}`}><Icon name="prev" size={18} />{prev.title}</a> : <span class="grow" />}
        {next && <a class="btn grow" href={`#/${l}/guide/sheets/${next.id}`}>{next.title}<Icon name="next" size={18} /></a>}
      </div>
    </div>
  );
}

// ---------------- exercises ----------------

function LessonPractice({ l, lesson }: { l: LangId; lesson: Lesson }) {
  const back = `#/${l}/guide/${lesson.id}`;
  const save = (acc: number) => {
    const g = (lang(l).guide ||= {});
    const p = (g[lesson.id] ||= [today(), -1]);
    if (acc > p[1]) { p[1] = acc; commit(); }
  };
  return (
    <Session lang={l} id={`guide-${lesson.id}`} title={lesson.title} exit={back} prepare={() => lesson.ex} onFinish={save}>
      {(api, items) => <ExerciseRound key={api.i} l={l} e={items[api.i]} api={api} />}
    </Session>
  );
}

/** Text written in the language's own script (so it gets that font); English options stay in the app font. */
const inScript = (l: LangId, t: string) => (LANGS[l].cjk ? /[\p{Script=Han}\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(t) : true);

/** Play / play slowly, for listening exercises. */
function PlayButtons({ l, text }: { l: LangId; text: string }) {
  useEffect(() => { speak(l, text); }, [text]);
  return (
    <div class="row" style={{ justifyContent: 'center', gap: 12 }}>
      <button class="btn primary" style={{ minHeight: 64, minWidth: 96 }} onClick={() => speak(l, text)} aria-label="Play again"><Icon name="speaker" size={30} /></button>
      <button class="btn" style={{ minHeight: 64 }} onClick={() => speak(l, text, { rate: 0.6 })} aria-label="Play slowly"><Icon name="slow" size={26} /></button>
    </div>
  );
}

function HearRound({ l, e, api }: { l: LangId; e: Extract<Exercise, { k: 'hear' }>; api: RoundApi }) {
  const cjk = LANGS[l].cjk;
  return (
    <div>
      <div class="prompt"><div class="label">Which word did you hear?</div><PlayButtons l={l} text={e.say} /></div>
      <Choice cjk={cjk ? l : undefined} columns={e.o.length <= 4 ? 2 : undefined}
        options={e.o.map((o, k) => <span class="center" style={{ display: 'grid' }}><span lang={l}>{o}</span>{e.or?.[k] && <span class="small muted"><Py text={e.or[k]} /></span>}</span>)}
        answer={e.a} onDone={(ok) => api.answer(ok, { say: e.say, show: <span lang={l}>{e.o[e.a]}{e.or?.[e.a] && <> · <Py text={e.or[e.a]} /></>}</span>, note: e.x ? rich(e.x) : undefined })} />
    </div>
  );
}

function OddRound({ l, e, api }: { l: LangId; e: Extract<Exercise, { k: 'odd' }>; api: RoundApi }) {
  const [picked, setPicked] = useState<number | null>(null);
  const cjk = LANGS[l].cjk;
  const pick = (k: number) => {
    if (picked !== null) return;
    setPicked(k);
    api.answer(k === e.a, { show: <span lang={l}>{e.o[e.a]}</span>, note: e.x ? rich(e.x) : undefined });
  };
  return (
    <div>
      <div class="prompt"><div class="label">Listen to each word</div><div style={{ fontSize: '1.15rem', fontWeight: 800 }}>Which one has a different {e.focus}?</div></div>
      <div class="options">
        {e.o.map((o, k) => (
          <div key={k} class={cls('odd-row', picked !== null && k === e.a && 'right', picked === k && k !== e.a && 'wrong')}>
            <button class="icon-btn" onClick={() => speak(l, o)} aria-label={`Play ${o}`}><Icon name="speaker" size={20} /></button>
            <span class={cls('grow', cjk && 'cjk')} lang={l}>{o}{e.or?.[k] && <span class="small muted"> <Py text={e.or[k]} /></span>}</span>
            <button class="btn sm" disabled={picked !== null} onClick={() => pick(k)}>This one</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpellRound({ l, e, api }: { l: LangId; e: Extract<Exercise, { k: 'spell' }>; api: RoundApi }) {
  const [st, setSt] = useState<'ok' | 'bad' | null>(null);
  return (
    <div>
      <div class="prompt">
        <div class="label">Type {e.focus}</div>
        <PlayButtons l={l} text={e.say} />
        <div style={{ marginTop: 12 }}><Gap l={l} q={e.q} /></div>
      </div>
      <TypeAnswer lang={l} state={st} placeholder={LANGS[l].cjk ? 'In Latin letters' : 'Type the missing letter(s)'} onCheck={(v) => {
        const ok = compare(v, e.a) === 'ok' || (LANGS[l].cjk && e.a.some((a) => letters(a) === letters(v)));
        setSt(ok ? 'ok' : 'bad');
        api.answer(ok, { say: e.say, show: <span lang={l}>{e.say} · {e.a[0]}</span>, note: e.x ? rich(e.x) : undefined });
      }} />
    </div>
  );
}

/** Placeholder for typed answers where the script needs a special keyboard. */
const TYPE_HINT: Partial<Record<LangId, string>> = { zh: '汉字 or pinyin', ko: '한글 or romanization', ja: 'Kana or kanji' };
/** Latin letters only, tone marks removed: pinyin or romanization as typed on any keyboard. */
const letters = (x: string) => plain(x).toLowerCase().replace(/[^a-z]/g, '');

/** Whether to read a text aloud: in zh/ja/ko, not when it mixes in Latin letters (pinyin-spelling exercises). */
const speakable = (l: LangId, t: string) => !LANGS[l].cjk || !/[a-z]/i.test(t);

/** The sentence with its gap filled (the answer in bold-free text, for speech and feedback). */
const filled = (q: string, a: string) => q.replace('___', a);
const isSentence = (q: string) => q.includes('___');

function Gap({ l, q, r }: { l: LangId; q: string; r?: string }) {
  const [before, after] = q.split('___');
  return (
    <>
      <div class={cls('sentence', LANGS[l].cjk && 'cjk')} lang={l}>
        {before}<span style={{ borderBottom: '3px solid var(--accent)', padding: '0 14px' }}>&nbsp;</span>{after}
      </div>
      {r && <div class="reading" style={{ fontSize: '0.95rem' }}><Py text={r} /></div>}
    </>
  );
}

function ExerciseRound({ l, e, api }: { l: LangId; e: Exercise; api: RoundApi }) {
  if (e.k === 'choice') {
    const right = e.o[e.a];
    return (
      <div>
        <div class="prompt">
          <div class="label">{isSentence(e.q) ? 'Choose the right form' : 'Choose the answer'}</div>
          {isSentence(e.q) ? <Gap l={l} q={e.q} r={e.qr} /> : <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{rich(e.q)}</div>}
          {e.en && <div class="muted" style={{ marginTop: 8 }}>{e.en}</div>}
        </div>
        <Choice cjk={LANGS[l].cjk && e.o.some((o) => inScript(l, o)) ? l : undefined} options={e.o.map((o) => <span lang={inScript(l, o) ? l : undefined}>{o}</span>)} answer={e.a} columns={e.o.length > 2 && e.o.every((o) => o.length < 14) ? 2 : undefined}
          onDone={(ok) => api.answer(ok, {
            say: isSentence(e.q) && speakable(l, filled(e.q, right)) ? filled(e.q, right) : undefined,
            show: <span lang={l}>{isSentence(e.q) ? filled(e.q, right) : right}</span>,
            note: e.x ? rich(e.x) : undefined,
          })} />
      </div>
    );
  }
  if (e.k === 'type') return <TypeRound l={l} e={e} api={api} />;
  if (e.k === 'hear') return <HearRound l={l} e={e} api={api} />;
  if (e.k === 'odd') return <OddRound l={l} e={e} api={api} />;
  if (e.k === 'spell') return <SpellRound l={l} e={e} api={api} />;
  return <OrderRound l={l} e={e} api={api} />;
}

function TypeRound({ l, e, api }: { l: LangId; e: Extract<Exercise, { k: 'type' }>; api: RoundApi }) {
  const [st, setSt] = useState<'ok' | 'bad' | null>(null);
  return (
    <div>
      <div class="prompt">
        <div class="label">Fill in the gap</div>
        <Gap l={l} q={e.q} r={e.qr} />
        {e.en && <div class="muted" style={{ marginTop: 8 }}>{e.en}</div>}
        {e.hint && <div class="reading" style={{ marginTop: 6 }}>{e.hint}</div>}
      </div>
      <TypeAnswer lang={l} state={st} placeholder={TYPE_HINT[l] ?? 'Type the missing word(s)'} onCheck={(v) => {
        // Strict: in a lesson the special letters are often the point (Bäume, heißt); the keys are on screen.
        // zh/ko: the reading typed in Latin letters counts too (pinyin without tones, romanization).
        const squash = (x: string) => (LANGS[l].spaced ? x : x.replace(/\s+/g, ''));
        const byReading = !!e.ar && letters(v) !== '' && letters(v) === letters(e.ar);
        const verdict = byReading ? 'ok' : compare(squash(v), e.a.map(squash));
        const ok = verdict === 'ok';
        setSt(ok ? 'ok' : 'bad');
        api.answer(ok, {
          xp: XP.correct + 1,
          say: speakable(l, filled(e.q, e.a[0])) ? filled(e.q, e.a[0]) : undefined,
          show: <span lang={l}>{filled(e.q, e.a[0])}{e.ar && <> · <Py text={e.ar} /></>}</span>,
          note: <>{verdict === 'close' && <>Almost: check the special letters (ä, ö, ü, ß).<br /></>}{e.x && rich(e.x)}</>,
        });
      }} />
    </div>
  );
}

function OrderRound({ l, e, api }: { l: LangId; e: Extract<Exercise, { k: 'order' }>; api: RoundApi }) {
  const tiles = useMemo(() => {
    let sh = shuffle(e.w.map((t, i) => ({ t, i })));
    if (sh.every((x, k) => x.i === k) && sh.length > 1) sh = [...sh.slice(1), sh[0]];
    return sh;
  }, [e]);
  const [chosen, setChosen] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  // Languages written without spaces join the words directly
  const join = (ws: string[]) => (LANGS[l].spaced ? ws.join(' ') : ws.join(''));
  const sentence = join(e.w);
  const check = () => {
    // Words that are the same (two "die") may swap places
    const built = join(chosen.map((k) => tiles[k].t));
    const ok = built === sentence || !!e.alt?.some((a) => join(a.split(' ')) === built);
    setChecked(ok);
    const shown = ok ? built : sentence;
    api.answer(ok, { xp: XP.correct * 2, say: shown, show: <span lang={l}>{shown}</span>, note: <>{e.r && <><Py text={e.r} /><br /></>}{e.x && rich(e.x)}</> });
  };
  return (
    <div>
      <div class="prompt"><div class="label">Put the words in order</div><div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{e.en}</div></div>
      <div class="answer-line">
        {chosen.map((k) => (
          <button key={k} class={cls('tile', LANGS[l].cjk && 'cjk')} lang={l} disabled={checked !== null} onClick={() => setChosen(chosen.filter((x) => x !== k))}>{tiles[k].t}</button>
        ))}
      </div>
      <div class="tiles">
        {tiles.map((x, k) => (
          <button key={k} class={cls('tile', LANGS[l].cjk && 'cjk', chosen.includes(k) && 'used')} lang={l} onClick={() => checked === null && !chosen.includes(k) && setChosen([...chosen, k])}>{x.t}</button>
        ))}
      </div>
      {checked === null && (
        <div class="sticky-action"><div><button class="btn primary block" disabled={chosen.length !== tiles.length} onClick={check}>Check</button></div></div>
      )}
    </div>
  );
}
