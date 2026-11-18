import { useAccount } from '../core/sync';
import { textInfos } from '../content';
import type { LangId, TextInfo } from '../content/types';
import { AI_NOTICE, APP_NAME, SLOGAN } from '../core/brand';
import { inBand, LANGS } from '../core/langs';
import { dueCount, streak, todayXp, totalXp } from '../core/progress';
import { lang, state, useStore } from '../core/store';
import { cls, dayToDate, today } from '../core/util';
import { findGame, gamesFor } from '../games';
import type { GameDef } from '../games/types';
import { CATEGORIES } from '../games/types';
import { Bar, LangList, Loading } from '../ui/components';
import { Icon } from '../ui/icons';
import { makeCtx, rememberLang, useContent } from './shared';

/** First run: pick a passport (a language) to start with. */
export function Welcome() {
  return (
    <div class="stack-lg" style={{ paddingTop: 12 }}>
      <div class="center stack">
        <span class="ink-stamp red" style={{ width: 120, height: 120, transform: 'rotate(-10deg)' }}><Icon name="stamp" size={46} /></span>
        <h1 style={{ fontSize: '3rem' }}>{APP_NAME}</h1>
        <p class="mono muted">{SLOGAN}</p>
      </div>
      <div class="stack">
        <h2>Choose your first passport</h2>
        <LangList href={(l) => `#/${l}`} />
      </div>
      <p class="notice"><span>{AI_NOTICE}</span></p>
      <p class="notice"><span>
        Free, no account needed, works offline. Your progress stays on this device; save a backup in Settings now and
        then, or <a href="#/account/signup">create an account</a> to sync between devices. Already have one?{' '}
        <a href="#/account/signin">Sign in</a>. Install it from the browser menu (“Add to Home screen”) to use it like an app.
      </span></p>
    </div>
  );
}

/** Visa stamp style for a finished day: varies by day so the week looks hand-stamped. */
const stampStyle = (d: number) => `s${d % 6}`;
const pad = (n: number, w: number) => String(Math.min(n, 10 ** w - 1)).padStart(w, '0');

export function Today({ l }: { l: LangId }) {
  useStore();
  const { account } = useAccount();
  rememberLang(l);
  const data = useContent(l);
  const ls = lang(l);
  const m = LANGS[l];
  const goal = state.settings.goal;
  const xp = todayXp();
  const s = streak();
  const t = today();
  const week = Array.from({ length: 7 }, (_, k) => t - 6 + k);
  const { due, fresh } = dueCount(l);
  const cards = Object.keys(ls.cards).length;
  const backupDays = state.settings.backedUp ? Math.floor((Date.now() - state.settings.backedUp) / 86400000) : null;

  const mrz = `P<STMP<${m.name.split(' ')[0].toUpperCase()}<<STREAK<${pad(s, 3)}<<XP<${pad(xp, 4)}<<<<<<<<<<<<<<<<<<`;

  return (
    <div class="stack">
      <section class="card goal-card">
        <div class="goal-head">
          <h1>Today's goal</h1>
          <span class="mono">{xp} / {goal} XP</span>
        </div>
        <Bar value={xp} max={goal} />
        <div class="visas" role="img" aria-label={`This week: goal met on ${week.filter((d) => state.days[d]?.[1]).length} of 7 days`}>
          {week.map((d) => {
            const day = state.days[d];
            const met = !!day?.[1];
            const isToday = d === t;
            const kind = met ? stampStyle(d) : isToday ? 'today' : day?.[0] ? 'some' : 'none';
            return (
              <div key={d} class={cls(isToday && 'is-today')}>
                {dayToDate(d).toLocaleDateString('en', { weekday: 'narrow' })}
                <span class={cls('visa', kind)}>{day?.[0] || (isToday ? 0 : '')}</span>
              </div>
            );
          })}
        </div>
        <div class="mrz" aria-hidden="true">{mrz}</div>
      </section>

      {due + fresh > 0 ? (
        <a class="boarding" href={`#/${l}/review`}>
          <div class="main">
            <div class="meta"><span>Next up</span><span>Gate R</span></div>
            <h2>Review</h2>
            <p>{due} due · {fresh} new · about {Math.max(1, Math.round((due + fresh) * 0.35))} min</p>
            <div class="fields"><span><small>Due</small>{pad(due, 2)}</span><span><small>New</small>{pad(fresh, 2)}</span></div>
          </div>
          <div class="stub">
            <span class="mono">Boarding now</span>
            <span class="go">Start</span>
            <span class="barcode" aria-hidden="true" />
          </div>
        </a>
      ) : (
        <a class="boarding calm" href={cards ? `#/${l}/read` : `#/${l}/review`}>
          <div class="main">
            <div class="meta"><span>Review</span><span>Gate R</span></div>
            <h2>{cards ? 'All caught up' : 'Start a collection'}</h2>
            <p>{cards ? 'No cards due. Read a text to collect new words.' : 'Save words while reading, or add 10 from your level.'}</p>
          </div>
          <div class="stub">
            <span class="mono">{cards ? 'No queue' : 'Gate open'}</span>
            <span class="go">{cards ? 'Read' : 'Open'}</span>
            <span class="barcode" aria-hidden="true" />
          </div>
        </a>
      )}

      {data ? <ContinueReading l={l} texts={textInfos(data.c)} /> : <Loading />}

      <section>
        <div class="section-title">
          <h2>{lang(l).played?.length ? 'Recently played' : 'Quick practice'}</h2>
          <a href={`#/${l}/practice`}>All activities</a>
        </div>
        {data && <QuickPractice l={l} data={data} />}
      </section>

      {/* Signed in, the account keeps a copy, so no backup nagging */}
      {!account && totalXp() > 0 && (backupDays === null || backupDays >= 7) && (
        <a class="notice warn" href="#/settings" style={{ textDecoration: 'none' }}>
          <Icon name="save" />
          <span>{backupDays === null ? 'You have never saved a backup.' : `Last backup ${backupDays} days ago.`} Your progress lives only in this browser: save a backup file in Settings.</span>
        </a>
      )}
    </div>
  );
}

/** The text being read (furthest along, unfinished), else the next unread text at the learner's level. */
function ContinueReading({ l, texts }: { l: LangId; texts: TextInfo[] }) {
  const ls = lang(l);
  const prog = (t: TextInfo) => (ls.prog[t.id] || 0) / t.sentences;
  const open = texts.filter((t) => !ls.read.includes(t.id) && prog(t) > 0).sort((a, b) => prog(b) - prog(a))[0];
  const next = open || texts.find((t) => inBand(t.lv, ls.band) && !ls.read.includes(t.id)) || texts.find((t) => !ls.read.includes(t.id));
  if (!next) return null;
  const pct = Math.round(prog(next) * 100);
  return (
    <section class="continue-card">
      <div class="label">{open ? 'Continue reading' : 'Next text'}</div>
      <div class="row" style={{ alignItems: 'center' }}>
        <div class="grow" style={{ display: 'grid', gap: 8 }}>
          <div><span class="t" lang={l}>{next.title}</span> <span class="meta">{next.titleEn} · {LANGS[l].levels[next.lv]}</span></div>
          <div class="row small mono" style={{ gap: 8 }}><div class="grow"><Bar value={pct} max={100} kind="rose" thin /></div>{pct}%</div>
        </div>
        <a class="btn sm" href={`#/${l}/read/${next.id}`}>{open ? 'Continue' : 'Start'}</a>
      </div>
    </section>
  );
}

interface Pick { def: GameDef; arg?: string; name: string }

/**
 * Three activities: the last ones played (a drill deck, a dialogue or a word to write keeps its own title),
 * topped up with a vocabulary game, a sentence game and the language's own special.
 */
function QuickPractice({ l, data }: { l: LangId; data: NonNullable<ReturnType<typeof useContent>> }) {
  const ctx = makeCtx(l, data.c, data.lx, `#/${l}`);
  const recent: Pick[] = (lang(l).played || []).flatMap((key) => {
    const cut = key.indexOf('/');
    const id = cut < 0 ? key : key.slice(0, cut);
    const arg = cut < 0 ? undefined : key.slice(cut + 1);
    const def = findGame(l, id);
    if (!def) return [];
    const name = id === 'drill' ? data.c.drills.find((d) => d.id === arg)?.name
      : id === 'dialogue' && arg ? data.c.dialogues.find((d) => d.id === arg)?.titleEn
      : id === 'strokes' && arg ? `Write ${data.lx.byId.get(arg)?.w ?? arg}`
      : def.name;
    return name ? [{ def, arg, name }] : [];
  });
  const ok = gamesFor(l).filter((g) => (!ctx.mine || g.mine) && !g.check?.(ctx) && !g.audio);
  const pickFrom = (cat: string, prefer: string[]) => prefer.map((id) => ok.find((g) => g.id === id && g.cat === cat)).find(Boolean) || ok.find((g) => g.cat === cat);
  const defaults = [pickFrom('vocab', ['quiz']), pickFrom('sentence', ['gap']), pickFrom('special', ['tones', 'kana', 'hangul', 'cyrillic', 'gender'])]
    .filter((g): g is GameDef => !!g).map((def): Pick => ({ def, name: def.name }));
  const picks = [...recent, ...defaults.filter((d) => !recent.some((r) => r.def.id === d.def.id && !r.arg))].slice(0, 3);
  return (
    <div class="stubs three">
      {picks.map(({ def, arg, name }) => (
        <a key={def.id + (arg || '')} class={cls('ticket', `cat-${def.cat}`)} href={`#/${l}/play/${def.id}${arg ? `/${encodeURIComponent(arg)}` : ''}`}>
          <div class="top"><Icon name={def.id} size={28} /><b>{name}</b></div>
          <div class="perf" />
          <span class="kind">{def.cat === 'special' ? LANGS[l].name.split(' ')[0] : CATEGORIES.find((c) => c.id === def.cat)?.name}</span>
        </a>
      ))}
    </div>
  );
}
