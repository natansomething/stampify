import type { LangId } from '../content/types';
import { BANDS, LANGS, levelNum, type Band } from '../core/langs';
import { collection } from '../core/lexicon';
import { hasVoice, useVoices } from '../core/speech';
import { commit, lang, useStore } from '../core/store';
import { cls } from '../core/util';
import { gamesFor } from '../games';
import { CATEGORIES } from '../games/types';
import { Loading } from '../ui/components';
import { Icon } from '../ui/icons';
import { StatsLine } from '../ui/session';
import { makeCtx, rememberLang, useContent } from './shared';

/**
 * Every activity, grouped by kind, as ticket stubs. The level band and word source apply to all of them;
 * in "My words" mode only the activities that can practise the collection are listed.
 */
export function Practice({ l }: { l: LangId }) {
  useStore();
  useVoices(l);
  const data = useContent(l);
  rememberLang(l);
  const ls = lang(l);
  const m = LANGS[l];
  if (!data) return <Loading />;
  const { c, lx } = data;
  const ctx = makeCtx(l, c, lx, `#/${l}/practice`);
  const mine = collection(lx).length;
  const games = gamesFor(l).filter((g) => g.cat !== 'minigame' && (!ctx.mine || g.mine));
  const minigames = gamesFor(l).filter((g) => g.cat === 'minigame').length;

  const setBand = (b: Band) => { ls.band = b; commit(); };
  const setSrc = (s: 'pool' | 'mine') => { ls.src = s; commit(); };

  return (
    <div>
      <h1>Practice</h1>
      <div class="stack">
        {!ctx.mine && <div class="bands" role="radiogroup" aria-label="Level">
          {BANDS.map((b) => (
            <button key={b.id} class={cls(ls.band === b.id && 'on')} onClick={() => setBand(b.id)} role="radio" aria-checked={ls.band === b.id}>
              {b.id === 0 ? 'All' : b.name}
              {b.id !== 0 && <small>{m.levels[(b.id * 2 - 1) as 1]}–{levelNum(m.levels[(b.id * 2) as 2])}</small>}
            </button>
          ))}
        </div>}
        <div class="row small wrap">
          <span class="muted">Games use</span>
          <div class="seg">
            <button class={cls(ls.src === 'pool' && 'on')} onClick={() => setSrc('pool')}>Level words</button>
            <button class={cls(ls.src === 'mine' && 'on')} onClick={() => setSrc('mine')}>My words ({mine})</button>
          </div>
        </div>
        {ctx.mine && (
          <p class="notice small">
            {mine < 4 ? 'Your collection is still small. ' : ''}Games practise your {mine} saved words from every level, and sentence games use sentences that contain them.
            Grammar drills, dialogues and a few other activities use level content: switch to Level words for those. Save words while reading, in games, or from the Words tab.
          </p>
        )}
        {!hasVoice(l) && (
          <p class="notice warn small">
            <Icon name="warn" />
            <span>This device has no {m.name} voice, so listening games are off. On a phone, install a {m.name} text-to-speech voice in your system settings; on desktop, try Chrome or Edge.</span>
          </p>
        )}
      </div>

      <section>
        <div class="section-title"><h2>Immersive learning</h2></div>
        <div class="stack">
          <a class="read-card" href={`#/${l}/read`}>
            <Icon name="read" size={30} />
            <div class="grow">
              <b>Read</b>
              <div class="small muted">Stories and dialogues at your level: tap any word for its meaning, finish a text for XP and a short quiz.</div>
            </div>
            <span class="tool-go" aria-hidden="true"><Icon name="back" size={18} /></span>
          </a>
          {minigames > 0 && (
            <a class="read-card games-card" href={`#/${l}/games`}>
              <Icon name="adventure" size={30} />
              <div class="grow">
                <b>Minigames</b>{gamesFor(l).some((g) => g.cat === 'minigame' && g.wip) && <> <span class="badge accent">Work in progress</span></>}
                <div class="small muted">Games played in {m.name.split(' ')[0]}: talk to characters, solve quests, and save the words you meet on the way.</div>
              </div>
              <span class="tool-go" aria-hidden="true"><Icon name="back" size={18} /></span>
            </a>
          )}
        </div>
      </section>
      {CATEGORIES.map((cat) => {
        if (cat.id === 'grammar') {
          if (ctx.mine) return null;
          // Drills are written for one level band; "All" lists every deck, easiest first
          const drills = c.drills.filter((d) => ls.band === 0 || d.band === ls.band).sort((a, b) => a.band - b.band);
          if (!drills.length) return null;
          return (
            <section key={cat.id}>
              <div class="section-title"><h2>{cat.name}</h2></div>
              <div class="stubs">
                {drills.map((d) => (
                  <a key={d.id} class="ticket cat-grammar" href={`#/${l}/play/drill/${d.id}`}>
                    <div class="top"><Icon name="drill" size={26} /><b>{d.name}</b><p>{d.desc}</p></div>
                    <div class="perf" />
                    <span class="kind">{BANDS.find((x) => x.id === d.band)?.name} drill</span>
                  </a>
                ))}
              </div>
            </section>
          );
        }
        const list = games.filter((g) => g.cat === cat.id);
        if (!list.length) return null;
        const title = cat.id === 'special' ? `${m.name.split(' ')[0]} specials` : cat.name;
        return (
          <section key={cat.id}>
            <div class="section-title"><h2>{title}</h2></div>
            <div class="stubs">
              {list.map((g) => {
                const why = g.check?.(ctx) ?? null;
                const best = ls.best[g.id];
                return (
                  <a key={g.id + g.name} class={cls('ticket', `cat-${g.cat}`, why && 'disabled')} href={why ? undefined : `#/${l}/play/${g.id}`} aria-disabled={!!why}>
                    <div class="top">
                      <Icon name={g.id} size={26} />
                      <b>{g.name}</b>
                      <p>{g.desc}</p>
                      {why && <span class="why">{why}</span>}
                      {!why && g.progress && <StatsLine st={g.progress(ctx)} />}
                    </div>
                    <div class="perf" />
                    <span class="kind">{best ? `Best ${best}` : title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/** The minigames of a language (#/<lang>/games), opened from Practice → Immersive learning. */
export function Minigames({ l }: { l: LangId }) {
  useStore();
  rememberLang(l);
  const games = gamesFor(l).filter((g) => g.cat === 'minigame');
  const name = LANGS[l].name.split(' ')[0];
  return (
    <div>
      <div class="game-top">
        <a class="icon-btn plain" href={`#/${l}/practice`} aria-label="Back to practice"><Icon name="back" /></a>
      </div>
      <h1>Minigames</h1>
      <p class="muted">Everything in these games is in {name}. Tap any word to look it up, hear it or save it to your words. Each course keeps its own progress.</p>
      {games.some((g) => g.wip) && <p class="notice small"><Icon name="warn" /><span>Work in progress: these games are still being built. You can play them, but expect unfinished areas and changes.</span></p>}
      {!games.length && <p class="notice small">No minigames for {name} yet.</p>}
      <div class="game-covers">
        {games.map((g) => (
          <a key={g.id} class="game-cover" href={`#/${l}/play/${g.id}`}>
            {g.cover ? <img src={g.cover} alt={`Screenshot of ${g.name}`} loading="lazy" /> : <div class="game-cover-blank"><Icon name={g.id} size={40} /></div>}
            <div class="game-cover-body">
              <div class="grow">
                <b>{g.name}</b>{g.wip && <> <span class="badge accent">Work in progress</span></>}
                <p>{g.desc}</p>
              </div>
              <span class="btn primary sm">{lang(l).adv?.flags.length ? 'Continue' : 'Play'}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
