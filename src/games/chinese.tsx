import { useEffect, useRef, useState } from 'preact/hooks';
import { inBand } from '../core/langs';
import { entry, firstSense, wordPool, type Entry } from '../core/lexicon';
import { applyTone, hanCount, plain, splitSyllables, toneOf } from '../core/pinyin';
import { hasVoice, speak } from '../core/speech';
import { XP } from '../core/progress';
import { Choice, Py } from '../ui/components';
import { Icon } from '../ui/icons';
import { Session, type RoundApi } from '../ui/session';
import { pickWords, TypeBox } from './common';
import type { Ctx, GameDef } from './types';

/** zh words from the pool matching f; falls back to the band's vocabulary, then to all of it ("My words": no fallback). */
function zhWords(ctx: Ctx, f: (e: Entry) => boolean, min = 8): Entry[] {
  const a = wordPool(ctx.lx).words.filter(f);
  if (a.length >= min || ctx.mine) return a;
  const b = ctx.lx.vocab.filter((e) => f(e) && !e.bound && inBand(e.lv, ctx.band));
  return b.length >= min ? b : ctx.lx.vocab.filter((e) => f(e) && !e.bound);
}

const hasPinyin = (e: Entry) => !!e.r && hanCount(e.w) <= 4;
const writable = (e: Entry) => hanCount(e.w) === e.w.length && e.w.length <= 2;
/** "My words" mode: a game needs a few saved words of the right kind. */
const needMine = (f: (e: Entry) => boolean, n: number, what: string) => (ctx: Ctx) =>
  !ctx.mine || zhWords(ctx, f).length >= n ? null : `Save at least ${n} ${what} to play`;

const oneSyllable = (e: Entry) => hanCount(e.w) === 1 && e.w.length === 1 && !!e.r && splitSyllables(e.r).length === 1 && toneOf(e.r) < 5;

// ---------------- Tone drill ----------------

function Tones({ ctx }: { ctx: Ctx }) {
  return (
    <Session lang="zh" id="tones" title="Tone drill" exit={ctx.exit} prepare={() => pickWords(ctx, zhWords(ctx, oneSyllable), 12)}>
      {(api, items) => <ToneRound key={api.i} e={items[api.i]} api={api} />}
    </Session>
  );
}

function ToneRound({ e, api }: { e: Entry; api: RoundApi }) {
  const voice = hasVoice('zh');
  useEffect(() => { if (voice) speak('zh', e.w); }, []);
  const tone = toneOf(e.r!);
  return (
    <div>
      <div class="prompt">
        <div class="label">{voice ? 'Which tone do you hear?' : 'Which tone is it?'}</div>
        <div class="word cjk" lang="zh">{e.w}</div>
        <div class="reading">{plain(e.r!).replace(/v/g, 'ü')} · {firstSense(e.en)}</div>
        {voice && <button class="btn sm" style={{ marginTop: 10 }} onClick={() => speak('zh', e.w)}><Icon name="speaker" size={18} />Again</button>}
      </div>
      <Choice columns={2} fixedOrder
        options={[1, 2, 3, 4].map((t) => (
          <div class="center">
            <div style={{ fontSize: '1.5rem' }}>{applyTone(e.r!, t)}</div>
            <div class="small muted">{['high flat', 'rising', 'dip', 'falling'][t - 1]}</div>
          </div>
        ))}
        answer={tone - 1}
        onDone={(ok) => { api.answer(ok, { say: e.w, word: e.id, show: <span><span class="zh">{e.w}</span> · <Py text={e.r!} /> — {e.en}</span> }); }}
      />
    </div>
  );
}

// ---------------- Pinyin typing ----------------

function PinyinType({ ctx }: { ctx: Ctx }) {
  return (
    <Session lang="zh" id="pinyin" title="Pinyin typing" exit={ctx.exit}
      prepare={() => pickWords(ctx, zhWords(ctx, hasPinyin), 10)}>
      {(api, items) => <PinyinRound key={api.i} e={items[api.i]} api={api} />}
    </Session>
  );
}

/** Checks typed pinyin: letters must match; tones are checked when given as numbers (ni3hao3) or marks. */
export function checkPinyin(input: string, r: string): { ok: boolean; toned: boolean } {
  const letters = (s: string) => plain(s).replace(/[^a-z]/g, '');
  const raw = input.trim().toLowerCase().replace(/ü/g, 'v').replace(/u:/g, 'v');
  if (letters(raw.replace(/\d/g, '')) !== letters(r)) return { ok: false, toned: false };
  const want = splitSyllables(r).map(toneOf);
  const digits = raw.match(/\d/g);
  if (digits) {
    const got = digits.map((d) => (d === '0' ? 5 : +d));
    // Neutral tones may be left out
    const strictly = got.length === want.length && got.every((t, k) => t === want[k]);
    const noNeutral = got.length === want.filter((t) => t !== 5).length && got.every((t, k) => t === want.filter((x) => x !== 5)[k]);
    return { ok: strictly || noNeutral, toned: true };
  }
  if (plain(raw) !== raw.normalize('NFC')) {
    // Has tone marks: compare marked forms
    const strip = (s: string) => s.normalize('NFC').toLowerCase().replace(/[\s']/g, '');
    return { ok: strip(raw) === strip(r), toned: true };
  }
  return { ok: true, toned: false };
}

function PinyinRound({ e, api }: { e: Entry; api: RoundApi }) {
  const [st, setSt] = useState<'ok' | 'bad' | null>(null);
  return (
    <div>
      <div class="prompt">
        <div class="label">Type the pinyin</div>
        <div class="word cjk" lang="zh">{e.w}</div>
        <div class="reading">{firstSense(e.en)}</div>
      </div>
      <TypeBox placeholder="e.g. ni3hao3 or nihao" state={st} onCheck={(v) => {
        const { ok, toned } = checkPinyin(v, e.r!);
        setSt(ok ? 'ok' : 'bad');
        api.answer(ok, {
          say: e.w, word: e.id, xp: XP.correct + (toned ? 1 : 0),
          show: <span><span class="zh">{e.w}</span> · <Py text={e.r!} /></span>,
          note: ok && !toned ? 'Tip: add tone numbers (ni3hao3) to have your tones checked too (+1 XP).' : undefined,
        });
      }} />
    </div>
  );
}

// ---------------- Stroke writing ----------------

/** A word picked in the Words tab or the reader (#/zh/play/strokes/<id>?back=…): written three times, the first time over its outline. */
const chosenWord = (ctx: Ctx) => (ctx.arg ? entry(ctx.lx, ctx.arg) : undefined);
/** Words that can be written stroke by stroke from the Words tab: all characters, at most four. */
export const canWrite = (e: { w: string }) => hanCount(e.w) === e.w.length && e.w.length <= 4;

function Strokes({ ctx }: { ctx: Ctx }) {
  const chosen = chosenWord(ctx);
  return (
    <Session lang="zh" id="strokes" title={chosen ? `Write ${chosen.w}` : 'Stroke writing'} exit={ctx.exit}
      prepare={() => (chosen ? [chosen, chosen, chosen] : pickWords(ctx, zhWords(ctx, writable), 6))}>
      {(api, items) => <StrokeRound key={api.i} e={items[api.i]} api={api} trace={!!chosen && api.i === 0} />}
    </Session>
  );
}

type Writer = import('hanzi-writer').default;

/**
 * How forgiving stroke matching is (HanziWriter's default is 1; higher accepts strokes further off in shape, length,
 * start/end point and placement). Stroke direction and order still count.
 */
const STROKE_LENIENCY = 1.5;

function StrokeRound({ e, api, trace }: { e: Entry; api: RoundApi; trace?: boolean }) {
  const boxes = useRef<HTMLDivElement>(null);
  const writers = useRef<Writer[]>([]);
  const mistakes = useRef(0);
  const [doneCount, setDoneCount] = useState(0);
  const [hint, setHint] = useState(!!trace);
  const [error, setError] = useState(false);
  const chars = [...e.w];

  const [extra, setExtra] = useState(0);

  // The first run is scored; "Draw again" runs are extra practice that don't change the answer
  const quiz = (scored: boolean) => {
    let finished = 0;
    if (scored) mistakes.current = 0;
    setDoneCount(0);
    writers.current.forEach((w) => w.quiz({
      leniency: STROKE_LENIENCY,
      onMistake: () => { if (scored) mistakes.current++; },
      onComplete: () => {
        finished++;
        setDoneCount(finished);
        if (scored && finished === chars.length) {
          const ok = mistakes.current <= chars.length * 3;
          api.answer(ok, {
            say: e.w, word: e.id, xp: XP.correct + chars.length,
            show: (
              <span class="row wrap" style={{ gap: 10 }}>
                <span><span class="zh">{e.w}</span> · <Py text={e.r || ''} /> — {e.en}</span>
                <button class="btn sm" onClick={again}>Draw again</button>
              </span>
            ),
            note: `${mistakes.current} wrong stroke${mistakes.current === 1 ? '' : 's'}.`,
          });
        }
      },
    }));
  };

  useEffect(() => {
    let cancelled = false;
    import('hanzi-writer').then(({ default: HanziWriter }) => {
      if (cancelled || !boxes.current) return;
      const els = [...boxes.current.querySelectorAll<HTMLDivElement>('.writer-box')];
      const size = els[0]?.clientWidth || 200;
      writers.current = chars.map((ch, k) => HanziWriter.create(els[k], ch, {
        width: size, height: size, padding: 10, showCharacter: false, showOutline: !!trace,
        strokeColor: '#1f1d2b', outlineColor: '#e4ded3', drawingColor: '#1f1d2b', drawingWidth: 22,
        highlightColor: '#8b74ff', showHintAfterMisses: 3,
        onLoadCharDataError: () => setError(true),
      }));
      quiz(true);
    }).catch(() => setError(true));
    return () => { cancelled = true; };
  }, []);

  const again = () => {
    setExtra((n) => n + 1);
    quiz(false);
    boxes.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const toggleHint = () => {
    const on = !hint;
    setHint(on);
    writers.current.forEach((w) => (on ? w.showOutline() : w.hideOutline()));
  };

  return (
    <div>
      <div class="prompt">
        <div class="label">{trace ? 'Trace the outline' : 'Write it from memory'}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}><Py text={e.r || ''} /></div>
        <div class="reading">{e.en}</div>
      </div>
      <div class="writer-row" ref={boxes}>
        {chars.map((_, k) => <div key={k} class="writer-box" />)}
      </div>
      {error && <p class="notice warn" style={{ marginTop: 12 }}>Stroke data could not be loaded. It needs an internet connection the first time.</p>}
      <div class="row" style={{ justifyContent: 'center', marginTop: 14 }}>
        <button class="btn sm" onClick={toggleHint}>{hint ? 'Hide outline' : 'Show outline'}</button>
        <span class="small muted">{doneCount}/{chars.length} done{extra > 0 && ` · extra round ${extra}`}</span>
      </div>
    </div>
  );
}

/**
 * Writing practice inside another activity (the Review card): the word's characters stroke by stroke, unscored and
 * without changing any progress. Starts over the outline; hiding or showing it keeps the strokes written so far (as in
 * Stroke writing); "Write again" clears the boxes. `onClose` returns to the activity.
 */
export function WritePad({ e, onClose }: { e: Entry; onClose: () => void }) {
  const boxes = useRef<HTMLDivElement>(null);
  const writers = useRef<Writer[]>([]);
  const chars = [...e.w];
  const [outline, setOutline] = useState(true);
  const [doneCount, setDoneCount] = useState(0);
  const [misses, setMisses] = useState(0);
  const [round, setRound] = useState(0);
  const [error, setError] = useState(false);

  const start = () => {
    let finished = 0;
    setDoneCount(0);
    setMisses(0);
    writers.current.forEach((w) => w.quiz({
      leniency: STROKE_LENIENCY,
      onMistake: () => setMisses((n) => n + 1),
      onComplete: () => { finished++; setDoneCount(finished); },
    }));
  };

  useEffect(() => {
    let cancelled = false;
    import('hanzi-writer').then(({ default: HanziWriter }) => {
      if (cancelled || !boxes.current) return;
      const els = [...boxes.current.querySelectorAll<HTMLDivElement>('.writer-box')];
      const size = els[0]?.clientWidth || 200;
      writers.current = chars.map((ch, k) => HanziWriter.create(els[k], ch, {
        width: size, height: size, padding: 10, showCharacter: false, showOutline: true,
        strokeColor: '#1f1d2b', outlineColor: '#e4ded3', drawingColor: '#1f1d2b', drawingWidth: 22,
        highlightColor: '#8b74ff', showHintAfterMisses: 3,
        onLoadCharDataError: () => setError(true),
      }));
      start();
    }).catch(() => setError(true));
    return () => { cancelled = true; };
  }, []);

  /** Clears the boxes and writes the word again (the outline stays as it is). */
  const again = () => {
    setRound((n) => n + 1);
    start();
  };
  /** Shows or hides the outline without touching what has been written, as in Stroke writing. */
  const toggleOutline = () => {
    const on = !outline;
    setOutline(on);
    writers.current.forEach((w) => (on ? w.showOutline() : w.hideOutline()));
  };
  const finished = doneCount === chars.length;

  return (
    <div class="card write-pad">
      <div class="prompt">
        <div class="label">{outline ? 'Trace the outline' : 'Write it from memory'}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}><Py text={e.r || ''} /></div>
        <div class="reading">{e.en}</div>
      </div>
      <div class="writer-row" ref={boxes}>
        {chars.map((_, k) => <div key={k} class="writer-box" />)}
      </div>
      {error && <p class="notice warn" style={{ marginTop: 12 }}>Stroke data could not be loaded. It needs an internet connection the first time.</p>}
      <p class="small muted center" style={{ margin: '10px 0' }}>
        {finished ? `Done${misses ? ` · ${misses} wrong stroke${misses === 1 ? '' : 's'}` : ' · no mistakes'}` : `${doneCount}/${chars.length} done`}
        {round > 0 && ` · round ${round + 1}`}
      </p>
      <div class="row wrap" style={{ justifyContent: 'center', gap: 8 }}>
        <button class="btn sm" onClick={toggleOutline}>{outline ? 'Hide outline' : 'Show outline'}</button>
        <button class="btn sm" onClick={again}>Write again</button>
        <button class="btn sm primary" onClick={onClose}><Icon name="back" size={16} />Back to the card</button>
      </div>
    </div>
  );
}

export const ZH_GAMES: GameDef[] = [
  { id: 'tones', name: 'Tone drill', desc: 'Hear a syllable, pick its tone.', cat: 'special', langs: ['zh'], mine: true, check: needMine(oneSyllable, 4, 'one-character words'), Comp: Tones },
  { id: 'pinyin', name: 'Pinyin typing', desc: 'See characters, type the pinyin.', cat: 'special', langs: ['zh'], mine: true, check: needMine(hasPinyin, 4, 'words'), Comp: PinyinType },
  { id: 'strokes', name: 'Stroke writing', desc: 'Draw characters stroke by stroke.', cat: 'special', langs: ['zh'], mine: true, check: (ctx) => (ctx.arg ? (chosenWord(ctx) && canWrite(chosenWord(ctx)!) ? null : 'This word cannot be written here') : needMine(writable, 2, 'short words')(ctx)), Comp: Strokes },
];
