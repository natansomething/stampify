/**
 * The border exam: a short, mostly symbolic quiz on hand-picked words of the country the cat is leaving
 * (AdventureText.exam: its landscape, quests and tourist life). Passing earns the passport stamp for the next country. Answers count as
 * practice for those words, like any other game.
 */
import { useEffect, useState } from 'preact/hooks';
import type { AdventureText, LangId } from '../../content/types';
import { LANGS } from '../../core/langs';
import { firstSense, lookup, readingOf, rememberToken, withArticle, type Entry, type Lexicon } from '../../core/lexicon';
import { award, lapse, practiced, XP } from '../../core/progress';
import { sfx } from '../../core/sfx';
import { speak } from '../../core/speech';
import { cls, shuffle } from '../../core/util';
import { Py } from '../../ui/components';
import { Icon } from '../../ui/icons';
import { isPunct } from '../common';
import { ROUTE, type Country, type Save } from './world';

export const EXAM_SIZE = 5;
export const EXAM_PASS = 4;

export interface ExamQ { e: Entry; opts: string[]; ans: number }

const ARTICLES: Record<string, 'm' | 'f' | 'n'> = { der: 'm', die: 'f', das: 'n' };

/** The hand-picked exam words of a country (AdventureText.exam) as lexicon entries. */
export function examWords(l: LangId, lx: Lexicon, txt: AdventureText, country: Country): Entry[] {
  return (txt.exam[country] ?? []).flatMap((x): Entry[] => {
    if (typeof x === 'string') { const e = lookup(lx, [x, '', '']); return e ? [e] : []; }
    const [w, r, en] = x;
    const m = l === 'de' ? w.match(/^(der|die|das) (.+)$/) : null;
    const word = m ? m[2] : w;
    return [lookup(lx, [word, r, en]) ?? { id: word, w: word, r: r || undefined, en, lv: txt.lv, ...(m ? { pos: 'n' as const, g: ARTICLES[m[1]], art: m[1] } : {}) }];
  });
}

/** `country` 'all': the words of every country (the language school). */
export function makeExam(l: LangId, lx: Lexicon, txt: AdventureText, country: Country | 'all'): ExamQ[] {
  const pool = new Map<string, Entry>();
  for (const c of country === 'all' ? ROUTE : [country]) for (const e of examWords(l, lx, txt, c)) pool.set(e.id, e);
  // words outside the vocabulary are remembered like words tapped in a text, so answers count as practice
  for (const e of pool.values()) if (!lx.byId.has(e.id)) rememberToken(lx, [e.w, e.r ?? '', e.en], txt.lv);
  const picked = shuffle([...pool.values()]).slice(0, EXAM_SIZE);
  const meanings = [...new Set([...pool.values(), ...lx.vocab.filter((v) => v.lv <= 2)].map((e) => firstSense(e.en)))];
  return picked.map((e) => {
    const right = firstSense(e.en);
    const wrong = shuffle(meanings.filter((m) => m !== right && !e.en.split(/;\s*/).includes(m))).slice(0, 3);
    const opts = shuffle([right, ...wrong]);
    return { e, opts, ans: opts.indexOf(right) };
  });
}

export const JOB_SIZE = 5;

/**
 * A round of the translation job (the phone): words of the course language to put into English. The words come from
 * the lines the cat has read on its journey and the word lists of the countries it has been to, topped up with easy
 * vocabulary, so there is always a round to do (the job is there so nobody gets stuck without money).
 */
export function makeJob(l: LangId, lx: Lexicon, txt: AdventureText, save: Save, names: Set<string>): ExamQ[] {
  const CONTENT = new Set(['n', 'v', 'adj', 'adv', 'num']);
  const pool = new Map<string, Entry>();
  for (const k of Object.values(save.seen ?? {}).flat() as string[]) for (const t of txt.lines[k]?.t ?? []) {
    if (isPunct(t) || names.has(t[0])) continue;
    const e = lookup(lx, t);
    if (e && (!e.pos || CONTENT.has(e.pos))) pool.set(e.id, e);
  }
  for (const c of ROUTE) if (save.flags.includes(`visited_${c}`) || Object.keys(save.seen ?? {}).includes(c)) for (const e of examWords(l, lx, txt, c)) if (lx.byId.has(e.id)) pool.set(e.id, e);
  const easy = lx.vocab.filter((v) => v.lv <= 2 && (!v.pos || CONTENT.has(v.pos)));
  for (const e of shuffle(easy).slice(0, Math.max(0, 40 - pool.size))) pool.set(e.id, e);
  const picked = shuffle([...pool.values()]).slice(0, JOB_SIZE);
  const meanings = [...new Set([...pool.values(), ...easy].map((e) => firstSense(e.en)))];
  return picked.map((e) => {
    const right = firstSense(e.en);
    const wrong = shuffle(meanings.filter((m) => m !== right && !e.en.split(/;\s*/).includes(m))).slice(0, 3);
    const opts = shuffle([right, ...wrong]);
    return { e, opts, ans: opts.indexOf(right) };
  });
}

/**
 * The border exam, or (`job`) a round of the translation job: `job.pay(score)` says what the round earns, shown
 * at the end; `onDone` gets whether it was passed and the number right.
 */
export function Exam({ l, place, qs, onDone, job }: { l: LangId; place: [string, string]; qs: ExamQ[]; onDone: (passed: boolean, score: number) => void; job?: { pay: (score: number) => string } }) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= qs.length;
  const passed = score >= Math.min(EXAM_PASS, qs.length);
  const q = qs[i];
  const m = LANGS[l];

  useEffect(() => { if (q) speak(l, q.e.w); }, [i]);

  const choose = (k: number) => {
    if (pick !== null || !q) return;
    setPick(k);
    const ok = k === q.ans;
    sfx(ok ? 'ok' : 'bad');
    if (ok) { setScore(score + 1); practiced(l, q.e.id); } else lapse(l, q.e.id);
  };
  const nextQ = () => {
    setPick(null);
    const n = i + 1;
    setI(n);
    if (n >= qs.length) { award(l, score * XP.correct); sfx(score >= Math.min(EXAM_PASS, qs.length) ? 'end' : 'bad'); }
  };

  // keys: 1-4 answer, Enter goes on
  useEffect(() => {
    const key = (ev: KeyboardEvent) => {
      if (/^[1-4]$/.test(ev.key) && q) { ev.preventDefault(); choose(Number(ev.key) - 1); }
      else if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        if (done) onDone(passed, score);
        else if (pick !== null) nextQ();
      }
    };
    window.addEventListener('keydown', key, true);
    return () => window.removeEventListener('keydown', key, true);
  });

  return (
    <div class={cls('adv-exam', job && 'adv-job')} role="dialog" aria-label={job ? 'Translation job' : 'Border exam'}>
      <div class="adv-exam-paper">
        <div class="adv-exam-head">
          <span>{job ? 'Translation job' : 'Border exam'}</span>
          <span lang={l}>{place[0]}</span>
        </div>
        {!done && q && (
          <>
            <div class="adv-exam-count">Question {i + 1} of {qs.length}</div>
            <div class="adv-exam-q">{job ? 'Translate into English:' : 'What does this word mean?'}</div>
            <button class="adv-exam-word" onClick={() => speak(l, q.e.w)} lang={l}>
              <span class={cls(m.cjk && 'cjk')}>{withArticle(l, q.e)}</span>
              <Icon name="speaker" size={20} />
            </button>
            {readingOf(l, q.e) && <div class="adv-exam-reading"><Py text={readingOf(l, q.e)!} /></div>}
            <div class="adv-exam-opts">
              {q.opts.map((o, k) => (
                <button key={o} class={cls(pick !== null && k === q.ans && 'ok', pick === k && k !== q.ans && 'bad')} onClick={() => choose(k)} disabled={pick !== null}>
                  <span class="adv-exam-n">{k + 1}</span>{o}
                </button>
              ))}
            </div>
            {pick !== null && <button class="btn primary block" onClick={nextQ}>{i + 1 < qs.length ? 'Next question' : 'See the result'}</button>}
          </>
        )}
        {done && (
          <div class="adv-exam-result">
            <div class={cls('adv-exam-score', passed ? 'ok' : 'bad')}>{score} / {qs.length}</div>
            <p>{job ? job.pay(score) : passed ? 'Passed! The officer reaches for the stamp.' : `Not quite: you need ${Math.min(EXAM_PASS, qs.length)} right answers. You can try again whenever you like.`}</p>
            <button class="btn primary block" onClick={() => onDone(passed, score)}>{job ? 'Done' : 'Continue'}</button>
          </div>
        )}
      </div>
    </div>
  );
}
