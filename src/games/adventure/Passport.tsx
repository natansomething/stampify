/**
 * The cat's passport: one stamp per country of the journey, each with a picture of the country's terrain. Earned
 * stamps are inked in the country's colour; the others are already printed in light grey, so the whole journey is
 * there to look forward to. Woodland is the home country (issued at the start); every other country's stamp comes
 * from the border exam of the country before it. A freshly earned stamp lands with a thump.
 */
import type { JSX } from 'preact';
import type { AdventureText, LangId } from '../../content/types';
import { cls } from '../../core/util';
import { Icon } from '../../ui/icons';
import { CAT } from './art';
import { toCanvas } from './engine';
import { COUNTRIES, ROUTE, type Country, type Save } from './world';
import { WORLD_COUNTRIES, type Biome } from './worldmap';

let portrait = '';

/** Terrain pictures for the stamps (24×24, drawn in the stamp's ink). */
const PICTURE: Record<Biome, JSX.Element> = {
  forest: <><path d="M12 3l5 7h-3l4 6h-4l3 4H7l3-4H6l4-6H7z" /><path d="M12 20v2" /></>,
  ice: <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M12 5l-2-2M12 5l2-2M12 19l-2 2M12 19l2 2M5.5 8.3l-2.7.2M18.5 15.7l2.7-.2M5.5 15.7l-2.7-.2M18.5 8.3l2.7.2" />,
  mountains: <><path d="M2 20l7-12 4 6 3-4 6 10z" /><path d="M7 11.5l2-3.5 2 3" /></>,
  jungle: <><path d="M12 22V11" /><path d="M12 11c-2-4-6-5-9-4 3 0 6 2 9 4zM12 11c2-4 6-5 9-4-3 0-6 2-9 4zM12 11c-1-3-1-6 1-8M12 11c-3-1-6 0-7 3M12 11c3-1 6 0 7 3" /></>,
  metro: <><path d="M3 21V11h4v10M7 21V5h5v16M12 21V8h4v13M16 21v-7h5v7M2 21h20" /><path d="M9 8h1M9 11h1M9 14h1M14 11h0.5M14 14h0.5" /></>,
  desert: <path d="M10 21V5a2 2 0 014 0v16M14 12h2a2 2 0 002-2V8M10 14H8a2 2 0 01-2-2v-2M6 21h12" />,
  swamp: <><path d="M3 18c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0M3 22c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" /><path d="M7 16V7M7 7l-1-3M7 7l1-3M12 15V5M17 16V9M17 9l1-3" /></>,
  beach: <><path d="M12 4a8 8 0 018 7H4a8 8 0 018-7zM12 11v10M8 4.8C9 7 9.5 9 9.5 11M16 4.8C15 7 14.5 9 14.5 11" /><path d="M3 21h18" /></>,
};

/** Has the cat got the stamp for country `c`? Home is issued; the rest come from the previous border's exam. */
export function hasStamp(save: Save, c: string): boolean {
  const i = ROUTE.indexOf(c as Country);
  if (i === 0) return true;
  if (i < 0) return false;
  return save.flags.includes(`stamp_${ROUTE[i - 1]}`);
}

/** `inline`: the passport page inside the inventory, without its own backdrop. */
export function Passport({ l, txt, save, fresh, inline, onClose }: { l: LangId; txt: AdventureText; save: Save; fresh?: Country; inline?: boolean; onClose: () => void }) {
  portrait ||= toCanvas(CAT.down[0]).toDataURL();
  const home = txt.places[ROUTE[0]] ?? [ROUTE[0], ROUTE[0]];
  const got = WORLD_COUNTRIES.filter((c) => hasStamp(save, c.id)).length;
  const book = (
    <div class="adv-pp-book" onClick={(e) => e.stopPropagation()}>
      <div class="adv-pp-id">
        <img src={portrait} alt="" width={48} height={48} />
        <div class="grow">
          <div class="adv-pp-label">Passport · Traveller</div>
          <b>Cat</b>
          <div class="small">Home country: <span lang={l}>{home[0]}</span> <span class="muted">({home[1]})</span> · {got} of {WORLD_COUNTRIES.length} stamps</div>
        </div>
        {!inline && <button class="icon-btn plain" onClick={onClose} aria-label="Close"><Icon name="close" /></button>}
      </div>
      <div class="adv-pp-page">
        {WORLD_COUNTRIES.map((c, i) => {
          const on = hasStamp(save, c.id);
          const name = txt.places[c.id] ?? [c.en, c.en];
          const ink = (COUNTRIES as Record<string, { ink: string } | undefined>)[c.id]?.ink ?? '#5a3a8a';
          return (
            <div key={c.id} class={cls('adv-stamp', on ? 'on' : 'off', fresh === c.id && 'fresh')}
              style={{ '--ink': on ? ink : '#c4cad6', '--tilt': `${[-8, 5, -3, 7, -6, 4, -5, 8][i]}deg` }} title={on ? name[1] : `${name[1]}: not visited yet`}>
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                {PICTURE[c.biome]}
              </svg>
              <b lang={l}>{name[0]}</b>
              <small>{i === 0 ? 'Issued' : 'Entry'}</small>
            </div>
          );
        })}
      </div>
      <div class="adv-pp-mrz" aria-hidden="true">P&lt;CAT&lt;&lt;TRAVELLER&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
    </div>
  );
  if (inline) return book;
  return <div class="adv-passport" role="dialog" aria-label="Passport" onClick={onClose}>{book}</div>;
}
