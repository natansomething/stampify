/**
 * The border exam: a short, mostly symbolic quiz on words the cat met in the country it is leaving (the words of
 * the dialogue lines it read there). Passing earns the passport stamp for the next country. Answers count as
 * practice for those words, like any other game.
 */
import { useEffect, useState } from 'preact/hooks';
import type { AdventureText, LangId } from '../../content/types';
import { LANGS } from '../../core/langs';
import { firstSense, lookup, readingOf, withArticle, type Entry, type Lexicon } from '../../core/lexicon';
import { award, lapse, practiced, XP } from '../../core/progress';
import { sfx } from '../../core/sfx';
import { speak } from '../../core/speech';
import { cls, shuffle } from '../../core/util';
import { Py } from '../../ui/components';
import { Icon } from '../../ui/icons';
import { isPunct } from '../common';
import { COUNTRIES, type Country, type Save } from './world';

export const EXAM_SIZE = 5;
export const EXAM_PASS = 4;

export interface ExamQ { e: Entry; opts: string[]; ans: number }

/** Content words are better exam material than articles and pronouns. */
const CONTENT = new Set(['n', 'v', 'adj', 'adv', 'num', 'int', 'phr']);

/** `country` 'all': the words of the whole journey (the language school). */
export function makeExam(lx: Lexicon, txt: AdventureText, save: Save, country: Country | 'all', names: Set<string>): ExamQ[] {
  const words = (keys: string[]) => {
    const out = new Map<string, Entry>();
    for (const k of keys) for (const t of txt.lines[k]?.t ?? []) {
      if (isPunct(t) || names.has(t[0])) continue;
      const e = lookup(lx, t);
      if (e && (!e.pos || CONTENT.has(e.pos))) out.set(e.id, e);
    }
    return out;
  };
  // the words of the lines the cat read here; if that is too few (dialogues skipped), the country's other lines too
  let pool = words(country === 'all' ? Object.values(save.seen ?? {}).flat() as string[] : save.seen?.[country] ?? []);
  if (pool.size < EXAM_SIZE * 2) {
    const prefixes = country === 'all' ? Object.values(COUNTRIES).flatMap((c) => c.lines) : COUNTRIES[country].lines;
    const all = Object.keys(txt.lines).filter((k) => prefixes.some((p) => k.startsWith(p)));
    pool = new Map([...pool, ...words(all)]);
  }
  const picked = shuffle([...pool.values()]).slice(0, EXAM_SIZE);
  const meanings = [...new Set([...pool.values(), ...lx.vocab.filter((v) => v.lv <= 2)].map((e) => firstSense(e.en)))];
  return picked.map((e) => {
    const right = firstSense(e.en);
    const wrong = shuffle(meanings.filter((m) => m !== right && !e.en.split(/;\s*/).includes(m))).slice(0, 3);
    const opts = shuffle([right, ...wrong]);
    return { e, opts, ans: opts.indexOf(right) };
  });
}

export function Exam({ l, place, qs, onDone }: { l: LangId; place: [string, string]; qs: ExamQ[]; onDone: (passed: boolean) => void }) {
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
        if (done) onDone(passed);
        else if (pick !== null) nextQ();
      }
    };
    window.addEventListener('keydown', key, true);
    return () => window.removeEventListener('keydown', key, true);
  });

  return (
    <div class="adv-exam" role="dialog" aria-label="Border exam">
      <div class="adv-exam-paper">
        <div class="adv-exam-head">
          <span>Border exam</span>
          <span lang={l}>{place[0]}</span>
        </div>
        {!done && q && (
          <>
            <div class="adv-exam-count">Question {i + 1} of {qs.length}</div>
            <div class="adv-exam-q">What does this word mean?</div>
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
            <p>{passed ? 'Passed! The officer reaches for the stamp.' : `Not quite: you need ${Math.min(EXAM_PASS, qs.length)} right answers. You can try again whenever you like.`}</p>
            <button class="btn primary block" onClick={() => onDone(passed)}>Continue</button>
          </div>
        )}
      </div>
    </div>
  );
}
