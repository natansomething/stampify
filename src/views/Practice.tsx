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
  const games = gamesFor(l).filter((g) => !ctx.mine || g.mine);

  const setBand = (b: Band) => { ls.band = b; commit(); };
  const setSrc = (s: 'pool' | 'mine') => { ls.src = s; commit(); };

  return (
    <div>
      <h1>Practice</h1>
      <a class="read-card" href={`#/${l}/read`}>
        <Icon name="read" size={30} />
        <div class="grow">
          <b>Read</b>
          <div class="small muted">Stories and dialogues at your level: tap any word for its meaning, finish a text for XP and a short quiz.</div>
        </div>
        <span class="tool-go" aria-hidden="true"><Icon name="back" size={18} /></span>
      </a>
      <div class="stack" style={{ marginTop: 14 }}>
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
