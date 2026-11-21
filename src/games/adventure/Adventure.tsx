/**
 * Paw Trails: the adventure minigame. A cat travels through the world helping animals; everything they say is in
 * the course language, and every word in a dialogue can be tapped to look it up, hear it and save it (the reader's
 * word sheet). The world and quests are shared by all languages (world.ts); each language has its own dialogue file
 * (src/content/<lang>/adventure.ts) and its own save (LangState.adv).
 */
import { Fragment } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { AdventureText, LangId, Text } from '../../content/types';
import { LANGS } from '../../core/langs';
import { award } from '../../core/progress';
import { sfx } from '../../core/sfx';
import { autoSpeak, speak, stopSpeech } from '../../core/speech';
import { commit, lang, state } from '../../core/store';
import { cls } from '../../core/util';
import { Loading } from '../../ui/components';
import { Icon } from '../../ui/icons';
import { toast } from '../../ui/toast';
import { gapBefore, glue, TokenView, WordSheet } from '../../views/Reader';
import { isPunct, joinTokens } from '../common';
import type { Ctx } from '../types';
import { CAFE, ITEMS, type Dir, type ItemKind } from './art';
import { Engine, toCanvas } from './engine';
import { Exam, makeExam, type ExamQ } from './Exam';
import { hasStamp, Passport } from './Passport';
import { Ride } from './Ride';
import { drawWorldMap, WORLD_COUNTRIES, WORLD_PLACES, WW, WH, type WPlace } from './worldmap';
import { MAPS, newSave, PLATFORM_ROWS, PLATFORMS, ROUTE, script, type Country, type Currency, type Opt, type Save, type Step, type Warp, type Who } from './world';

const FILES = import.meta.glob<{ default: AdventureText }>('../../content/*/adventure.ts');

/** Languages that have the adventure's dialogue. */
export const ADVENTURE_LANGS = Object.keys(FILES).map((k) => k.split('/')[3] as LangId);

export function Adventure({ ctx }: { ctx: Ctx }) {
  const [txt, setTxt] = useState<AdventureText | null>(null);
  useEffect(() => {
    let live = true;
    FILES[`../../content/${ctx.lang}/adventure.ts`]?.().then((m) => { if (live) setTxt(m.default); });
    return () => { live = false; };
  }, [ctx.lang]);
  if (!txt) return <Loading />;
  return <Game ctx={ctx} txt={txt} />;
}

type Box =
  | { k: 'say'; key: string; who?: Who }
  | { k: 'ask'; key: string; who?: Who; opts: Opt[] }
  | { k: 'got'; item: ItemKind }
  /** English game messages (how to play, end of the demo). */
  | { k: 'sys'; title: string; body: string; after?: () => void; restart?: boolean };

const KEYS: Record<string, Dir> = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right',
};
const A_KEYS = new Set([' ', 'Enter', 'z', 'Z', 'e', 'E']);
const B_KEYS = new Set(['Escape', 'x', 'X', 'Backspace']);

const cafeIcons = new Map<string, string>();
const cafeIcon = (k: string) => { let u = cafeIcons.get(k); if (!u) cafeIcons.set(k, (u = toCanvas(CAFE[k]).toDataURL())); return u; };
const icons = new Map<ItemKind, string>();
const itemIcon = (i: ItemKind) => { let u = icons.get(i); if (!u) icons.set(i, (u = toCanvas(ITEMS[i]).toDataURL())); return u; };

/** Dev options (teleport, cheats) show on the dev server, or anywhere after localStorage "stampify.dev" = "1". */
const DEV = import.meta.env.DEV || (() => { try { return localStorage.getItem('stampify.dev') === '1'; } catch { return false; } })();

type Tab = 'bag' | 'passport' | 'map';

function Game({ ctx, txt }: { ctx: Ctx; txt: AdventureText }) {
  const l = ctx.lang;
  const { lx } = ctx;
  const m = LANGS[l];
  const screen = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const eng = useRef<Engine | null>(null);
  const queue = useRef<Step[]>([]);
  const [box, setBox] = useState<Box | null>(null);
  const [shown, setShown] = useState(0);
  /** The tapped word: which line (a dialogue line or a thing's name) and which token. */
  const [sel, setSel] = useState<{ k: string; i: number } | null>(null);
  const [en, setEn] = useState(false);
  const [inv, setInv] = useState<Tab | null>(null);
  const [opt, setOpt] = useState(0);
  const [, redraw] = useState(0);
  const [exam, setExam] = useState<{ country: Country | 'all'; qs: ExamQ[]; pass: Step[]; fail: Step[] } | null>(null);
  const [passport, setPassport] = useState<{ fresh?: Country } | null>(null);
  const [banner, setBanner] = useState<[string, string] | null>(null);
  const [fade, setFade] = useState(false);
  const [ride, setRide] = useState<{ kind: 'train' | 'metro'; scenery: 'forest' | 'ice' | 'metro'; title: string; done: () => void } | null>(null);
  /** The "name it" label: the thing in front of the cat. */
  const [look, setLook] = useState<string | null>(null);
  const [dev, setDev] = useState(false);
  const [keys, setKeys] = useState(() => { try { return localStorage.getItem('stampify.advKeys') !== 'off'; } catch { return true; } });

  // Each course has its own save
  const save = useMemo<Save>(() => {
    const s = lang(l).adv as Save | undefined;
    if (!s || !MAPS[s.map]) return newSave();
    const c = structuredClone(s);
    c.wallet ??= { taler: 20 }; // saves from before the wallet start with the same savings
    return c;
  }, [l]);
  const persist = () => { lang(l).adv = structuredClone(save); commit(); };
  const flag = (f: string) => { if (!save.flags.includes(f)) save.flags.push(f); };

  /** Character and place names (fictional, so not words to learn). */
  const names = useMemo(() => new Set([...Object.values(txt.names), ...Object.values(txt.places).map((p) => p[0]), ...(txt.proper ?? [])]), [txt]);

  const line = (key: string) => txt.lines[key] ?? { t: [[`[${key}]`, '', '']], en: `(missing line ${key})` };
  const say = (key: string) => joinTokens(l, line(key).t);

  const open = (b: Box) => {
    const e = eng.current!;
    e.paused = true;
    e.releaseAll();
    setLook(null);
    setBox(b); setSel(null); setOpt(0); setShown(0);
    if (b.k === 'say' || b.k === 'ask') {
      autoSpeak(l, say(b.key));
      // remember what was read in this country: its border exam asks about these words
      const c = MAPS[save.map].country;
      const seen = (save.seen ||= {});
      const list = (seen[c] ||= []);
      if (!list.includes(b.key)) list.push(b.key);
    }
  };

  /** Runs the queued script steps up to the next thing the player has to read or choose. */
  const next = () => {
    const e = eng.current!;
    while (queue.current.length) {
      const s = queue.current.shift()!;
      if ('say' in s) return open({ k: 'say', key: s.say, who: s.who });
      if ('ask' in s) return open({ k: 'ask', key: s.ask, who: s.who, opts: s.opts });
      if ('give' in s) { save.items.push(s.give); persist(); sfx('ok'); return open({ k: 'got', item: s.give }); }
      if ('take' in s) { const i = save.items.indexOf(s.take); if (i >= 0) save.items.splice(i, 1); persist(); continue; }
      if ('set' in s) { flag(s.set); persist(); continue; }
      if ('xp' in s) { award(l, s.xp); toast(`+${s.xp} XP ${s.why}`, 'goal'); sfx('goal'); continue; }
      if ('fx' in s) { setBox(null); e.chomp(next); return; }
      if ('money' in s) {
        const w = (save.wallet ||= {});
        // dev cheat: money never runs out
        if (save.flags.includes('cheat_money')) { for (const c of ['taler', 'krone', 'kredit'] as Currency[]) w[c] = 999; persist(); continue; }
        w[s.money] = Math.max(0, (w[s.money] ?? 0) + s.n);
        persist();
        const cur = txt.currencies?.[s.money]?.[0] ?? s.money;
        toast(s.n > 0 ? `+${s.n} ${cur}` : `${s.n} ${cur}`);
        sfx(s.n > 0 ? 'ok' : 'tap');
        continue;
      }
      if ('unset' in s) { save.flags = save.flags.filter((f) => f !== s.unset); persist(); continue; }
      if ('ride' in s) {
        // a short cutscene, then the platform at the other end
        const train = s.ride === 'train';
        const dest = train ? `gleis_${s.to}` : `metro_${s.to}`;
        if (!MAPS[dest]) continue;
        // the train arrives at the platform whose train goes back to where it came from
        const from = save.map.replace(/^gleis_/, '');
        const n = train ? Math.max(0, (PLATFORMS[s.to] ?? []).indexOf(from)) : 0;
        const land = train ? { x: 16, y: PLATFORM_ROWS[n].floor - 1 } : { x: 9, y: 3 };
        const scenery = MAPS[dest].country === 'ice' ? 'ice' : MAPS[dest].country === 'metro' ? 'metro' : 'forest';
        const name = txt.places[s.to]?.[0] ?? s.to;
        setBox(null);
        setRide({
          kind: s.ride, scenery, title: train ? `${txt.places[from]?.[0] ?? ''} → ${name}` : `U-Bahn → ${name}`,
          done: () => { setRide(null); goTo(dest, land.x, land.y, 'down', () => next()); },
        });
        return;
      }
      if ('exam' in s) {
        setBox(null);
        setExam({ country: s.exam, qs: makeExam(lx, txt, save, s.exam, names), pass: s.pass, fail: s.fail });
        return;
      }
      if ('stamp' in s) { setBox(null); sfx('goal'); setPassport({ fresh: ROUTE[ROUTE.indexOf(s.stamp) + 1] }); return; }
      if ('end' in s) {
        const stamps = save.flags.filter((f) => f.startsWith('stamp_')).length;
        const read = Object.values(save.seen ?? {}).reduce((n, k) => n + (k?.length ?? 0), 0);
        return open({
          k: 'sys', title: 'Journey complete',
          body: `You crossed ${ROUTE.length} countries, collected ${stamps} passport stamps and read ${read} lines of ${m.name}. ` +
            'Enjoy the holiday! More countries are on their way.',
          restart: true,
        });
      }
    }
    stopSpeech();
    setBox(null); setSel(null);
    persist();
    e.paused = false;
  };

  const run = (steps: Step[]) => {
    if (!steps.length) return;
    queue.current = [...steps];
    next();
  };

  const intro = (): Extract<Box, { k: 'sys' }> => ({
    k: 'sys', title: 'Paw Trails',
    body: `You're a cat travelling as a tourist through faraway countries. Help the animals you meet: some of them ` +
      `need you before you can go on. At every border, a short language exam on the words you met gets you a passport ` +
      `stamp. Everyone here speaks ${m.name}: tap any word to look it up or save it, and EN shows a translation. ` +
      `Press Q (on a phone: Name) to hear what the thing in front of you is called. Your passport, items and map are in the bag.`,
  });

  useEffect(() => {
    const e = new Engine(canvas.current!, save, {
      interact: (o) => run(script(o, save)),
      warp: (w) => travel(w),
      stepped: () => { setLook(null); if (Math.random() < 0.08) persist(); },
    });
    eng.current = e;
    flag(`visited_${save.map}`);
    const fit = () => { const r = screen.current!.getBoundingClientRect(); e.resize(r.width, r.height); };
    const ro = new ResizeObserver(fit);
    ro.observe(screen.current!);
    fit();
    e.start();
    if (!save.flags.includes('intro')) { flag('intro'); persist(); open(intro()); }
    else showBanner(MAPS[save.map].country);
    const blur = () => { e.releaseAll(); e.running = false; };
    window.addEventListener('blur', blur);
    return () => { e.stop(); ro.disconnect(); window.removeEventListener('blur', blur); persist(); stopSpeech(); };
  }, []);

  /** A banner with the country's name when the cat arrives in it. */
  const bannerTimer = useRef(0);
  const showBanner = (c: Country) => {
    setBanner(txt.places[c] ?? [c, c]);
    clearTimeout(bannerTimer.current);
    bannerTimer.current = window.setTimeout(() => setBanner(null), 2800);
  };

  /** Going to another map: a quick fade, a new map, and a banner when the country changes. */
  const goTo = (to: string, x: number, y: number, dir: Dir, after?: () => void) => {
    const e = eng.current!;
    e.paused = true;
    setLook(null);
    const before = MAPS[save.map].country;
    setFade(true);
    setTimeout(() => {
      e.go(to, x, y, dir);
      flag(`visited_${to}`);
      persist();
      setFade(false);
      e.paused = false;
      const now = MAPS[to].country;
      if (now !== before) showBanner(now);
      after?.();
      redraw((n) => n + 1);
    }, 220);
  };
  const travel = (w: Warp) => goTo(w.to, w.tx, w.ty, w.dir, () => { if (w.say) run([{ say: w.say }]); });

  /** Q: the name of the thing in front of the cat, read aloud. */
  const name = () => {
    const e = eng.current;
    if (!e || e.paused) return;
    const k = `thing.${e.look()}`;
    setLook(k);
    setSel(null);
    speak(l, say(k));
  };

  const cur = box && (box.k === 'say' || box.k === 'ask') ? line(box.key) : null;
  const full = !cur || shown >= cur.t.length;

  // Letters appear quickly word by word; A shows the rest at once
  useEffect(() => {
    if (!cur || full) return;
    const id = setTimeout(() => setShown(shown + 1), isPunct(cur.t[shown]) ? 10 : 45);
    return () => clearTimeout(id);
  }, [box, shown]);

  const choose = (i: number) => {
    if (box?.k !== 'ask') return;
    sfx('tap');
    queue.current = [...box.opts[i].then, ...queue.current];
    next();
  };

  const advance = () => {
    if (!box || sel !== null) return;
    if (!full) { setShown(cur!.t.length); return; }
    if (box.k === 'ask') return choose(opt);
    if (box.k === 'sys') box.after?.();
    next();
  };

  const reset = () => {
    Object.assign(save, newSave(), { flags: ['intro'] });
    eng.current?.go(save.map, save.x, save.y, save.dir);
    persist();
    queue.current = [];
    next();
    redraw((n) => n + 1);
  };
  const restart = () => {
    if (confirm('Start the adventure over? Your progress in this course is lost (words you saved stay).')) reset();
  };

  const toggleKeys = () => setKeys((k) => { try { localStorage.setItem('stampify.advKeys', k ? 'off' : 'on'); } catch { /* private mode */ } return !k; });
  const busy = !!(box || inv || exam || passport || dev || ride);

  // Keyboard
  useEffect(() => {
    const down = (ev: KeyboardEvent) => {
      if (ev.target instanceof HTMLInputElement || ev.target instanceof HTMLTextAreaElement) return;
      const e = eng.current;
      if (!e) return;
      if (ev.key === 'Shift') e.running = true;
      if (sel !== null) { if (ev.key === 'Escape') setSel(null); return; }
      if (exam || ride) return;
      if (passport) { if (A_KEYS.has(ev.key) || B_KEYS.has(ev.key)) { ev.preventDefault(); closePassport(); } return; }
      if (dev) { if (ev.key === 'Escape') setDev(false); return; }
      const k = ev.key.toLowerCase();
      if (inv) {
        if (B_KEYS.has(ev.key) || k === 'i' || A_KEYS.has(ev.key)) { ev.preventDefault(); setInv(null); }
        else if (k === 'm') setInv('map');
        else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
          const tabs: Tab[] = ['bag', 'passport', 'map'];
          setInv(tabs[(tabs.indexOf(inv) + (ev.key === 'ArrowRight' ? 1 : 2)) % 3]);
        }
        return;
      }
      const d = KEYS[ev.key];
      if (d) {
        ev.preventDefault();
        if (box?.k === 'ask' && full && (d === 'up' || d === 'down')) setOpt((o) => (o + (d === 'up' ? -1 : 1) + box.opts.length) % box.opts.length);
        else if (!box) { if (d !== save.dir) setLook(null); e.press(d); }
        return;
      }
      if (A_KEYS.has(ev.key)) {
        ev.preventDefault();
        if (ev.repeat) return;
        if (box) advance();
        else e.action();
        return;
      }
      if (B_KEYS.has(ev.key)) {
        if (look) { setLook(null); return; }
        if (box && box.k !== 'ask') { ev.preventDefault(); advance(); }
        return;
      }
      if (box) return;
      if (k === 'q') name();
      else if (k === 'i') setInv('bag');
      else if (k === 'm') setInv('map');
      else if (k === 'h') toggleKeys();
    };
    const up = (ev: KeyboardEvent) => {
      if (ev.key === 'Shift' && eng.current) eng.current.running = false;
      const d = KEYS[ev.key];
      if (d) eng.current?.release(d);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  });

  // Overlays stop the cat
  useEffect(() => { const e = eng.current; if (!e || box) return; e.paused = !!(inv || dev || passport || exam || ride); if (e.paused) e.releaseAll(); }, [inv, dev, passport, exam, ride]);

  // Touch pad: one element, the direction follows the finger (sliding from one arrow to another works)
  const padDir = useRef<Dir | null>(null);
  const onPad = (ev: PointerEvent, end = false) => {
    const e = eng.current;
    if (!e) return;
    const el = ev.currentTarget as HTMLElement;
    let d: Dir | null = null;
    if (!end) {
      const r = el.getBoundingClientRect();
      const dx = ev.clientX - (r.left + r.width / 2), dy = ev.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) > 10) d = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    }
    if (d === padDir.current) return;
    if (padDir.current) e.release(padDir.current);
    padDir.current = d;
    if (!d) return;
    if (box?.k === 'ask' && full && (d === 'up' || d === 'down')) { setOpt((o) => (o + (d === 'up' ? -1 : 1) + box.opts.length) % box.opts.length); return; }
    if (!busy) { if (d !== save.dir) setLook(null); e.press(d); }
  };

  const place = txt.places[save.map] ?? txt.places.village;
  const showPy = !!m.reading && state.settings.showReading;
  /** The stamp ceremony is part of the officer's script: closing the passport carries on with it. */
  const closePassport = () => { setPassport(null); next(); };

  // The word sheet works on whichever line the tapped word is in
  const selLine = sel ? line(sel.k) : null;
  const sheetText: Text | null = selLine && { id: `adv-${l}`, lv: txt.lv, kind: 'story', title: '', titleEn: '', s: [{ t: selLine.t, en: selLine.en }], q: [] };
  const stepWord = (d: 1 | -1) => {
    if (!sel || !selLine) return;
    let k = sel.i + d;
    while (k >= 0 && k < selLine.t.length && isPunct(selLine.t[k])) k += d;
    if (k >= 0 && k < selLine.t.length) setSel({ k: sel.k, i: k });
  };

  /** A line as tappable words; `hide` hides words not typed out yet. */
  const words = (key: string, hide = Infinity) => {
    const t = line(key).t;
    return glue(t).map((group) => (
      <Fragment key={group[0]}>
        {gapBefore(l, t[group[0]], t[group[0] - 1], false)}
        <span class={cls(group[0] >= hide && 'adv-hidden')}>
          {group.map((ti, k) => (
            <TokenView key={ti} l={l} lx={lx} t={t[ti]} space={k === 0 ? '' : gapBefore(l, t[ti], t[ti - 1], false)}
              selected={sel?.k === key && sel.i === ti} showPy={showPy} onTap={() => setSel(sel?.k === key && sel.i === ti ? null : { k: key, i: ti })} />
          ))}
        </span>
      </Fragment>
    ));
  };

  return (
    <div class="adv">
      <div class="adv-top">
        <a class="icon-btn plain" href={ctx.exit} aria-label="Leave the game"><Icon name="back" /></a>
        <div class="grow adv-place">
          <b lang={l}>{place[0]}</b>
          <small>{place[1]}</small>
        </div>
        {DEV && <button class="icon-btn plain" onClick={() => !box && setDev(!dev)} aria-label="Dev options" aria-pressed={dev}><Icon name="tools" /></button>}
        <button class="icon-btn plain" onClick={() => !box && setInv(inv ? null : 'bag')} aria-label="Inventory" aria-pressed={!!inv}>
          <Icon name="bag" />{save.items.length > 0 && <span class="adv-count">{save.items.length}</span>}
        </button>
        <button class="icon-btn plain" onClick={() => !box && open({ ...intro(), restart: true })} aria-label="How to play"><Icon name="help" /></button>
      </div>

      <div class="adv-screen" ref={screen}>
        <canvas ref={canvas} class="adv-canvas" />

        {keys && !busy && (
          <div class="adv-keys desktop-only" aria-label="Keys">
            <div><kbd>←</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd> / <kbd>WASD</kbd><span>walk</span></div>
            <div><kbd>Shift</kbd><span>hold to run</span></div>
            <div><kbd>Space</kbd> / <kbd>E</kbd><span>talk, look, next</span></div>
            <div><kbd>Q</kbd><span>name the thing in front</span></div>
            <div><kbd>I</kbd><span>inventory</span> <kbd>M</kbd><span>map</span></div>
            <div><kbd>Esc</kbd> / <kbd>X</kbd><span>back</span></div>
            <div><kbd>H</kbd><span>hide these keys</span></div>
          </div>
        )}
        {!keys && !busy && <button class="adv-keys-show desktop-only" onClick={toggleKeys}>Keys (H)</button>}

        {look && !box && (
          <div class="adv-look" lang={l}>
            <div class={cls('adv-look-w', m.cjk && 'cjk')}>{words(look)}</div>
            <div class="adv-look-en">{line(look).en}</div>
            <button class="adv-tool" onClick={() => speak(l, say(look))} aria-label="Listen"><Icon name="speaker" size={16} /></button>
          </div>
        )}

        {box?.k === 'ask' && full && (
          <div class="adv-opts" role="listbox">
            {box.opts.map((o, i) => (
              <button key={o.o + i} class={cls(i === opt && 'on', o.pic && 'pics')} onClick={(e) => { e.stopPropagation(); setOpt(i); choose(i); }}>
                {o.pic
                  ? <span class="adv-pics">{o.pic.map((p, k) => <img key={k} src={cafeIcon(p)} alt="" width={32} height={32} />)}</span>
                  : <><span lang={l}>{say(o.o)}</span>{en && <small>{line(o.o).en}</small>}</>}
              </button>
            ))}
          </div>
        )}

        {box && (
          <div class={cls('adv-box', box.k === 'sys' && 'sys')} onClick={advance}>
            {cur && box.k !== 'got' && box.k !== 'sys' && box.who && <div class="adv-name" lang={l}>{txt.names[box.who] ?? box.who}</div>}
            {cur && (box.k === 'say' || box.k === 'ask') && (
              <>
                <div class={cls('adv-line', m.cjk && 'cjk')} lang={l}>{words(box.key, shown)}</div>
                {en && full && <div class="adv-en">{cur.en}</div>}
                <div class="adv-tools" onClick={(e) => e.stopPropagation()}>
                  <button class="adv-tool" onClick={() => speak(l, joinTokens(l, cur.t))} aria-label="Listen"><Icon name="speaker" size={18} /></button>
                  <button class={cls('adv-tool', en && 'on')} onClick={() => setEn(!en)} aria-pressed={en} aria-label="Show English">EN</button>
                </div>
              </>
            )}
            {box.k === 'got' && (
              <div class="adv-got">
                <img src={itemIcon(box.item)} alt="" width={40} height={40} />
                <div>
                  <div class="small muted">You got</div>
                  <div class="adv-got-name" lang={l}>{say(`item.${box.item}`)}</div>
                  {en && <div class="small muted">{line(`item.${box.item}`).en}</div>}
                </div>
              </div>
            )}
            {box.k === 'sys' && (
              <div>
                <div class="adv-sys-title">{box.title}</div>
                <p>{box.body}</p>
                {box.restart && <button class="btn ghost sm" onClick={(e) => { e.stopPropagation(); restart(); }}>Start over</button>}
              </div>
            )}
            {full && box.k !== 'ask' && <span class="adv-more" aria-hidden="true" />}
          </div>
        )}
      </div>

      {inv && (
        <Inventory l={l} txt={txt} save={save} tab={inv} setTab={setInv} engine={eng.current!} itemName={say} itemEn={(k) => line(k).en} onClose={() => setInv(null)} />
      )}
      {dev && (
        <DevPanel txt={txt} save={save} engine={eng.current!} onClose={() => setDev(false)}
          go={(id) => { setDev(false); const sp = MAPS[id].spawn; goTo(id, sp.x, sp.y, sp.dir); }}
          apply={(f) => { f(); persist(); redraw((n) => n + 1); }} reset={() => { setDev(false); reset(); }} />
      )}
      {exam && (
        <Exam l={l} place={exam.country === 'all' ? txt.places.school ?? ['School', 'School'] : txt.places[exam.country] ?? [exam.country, exam.country]} qs={exam.qs} onDone={(passed) => {
          const then = passed ? exam.pass : exam.fail;
          setExam(null);
          queue.current = [...then, ...queue.current];
          next();
        }} />
      )}
      {passport && <Passport l={l} txt={txt} save={save} fresh={passport.fresh} onClose={closePassport} />}
      {ride && <Ride kind={ride.kind} scenery={ride.scenery} title={ride.title} onDone={ride.done} />}
      {banner && <div class="adv-banner"><b lang={l}>{banner[0]}</b><small>{banner[1]}</small></div>}
      <div class={cls('adv-fade', fade && 'on')} />

      <div class="adv-pad">
        <div class="adv-dpad" onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); onPad(e); }}
          onPointerMove={(e) => e.buttons && onPad(e)} onPointerUp={(e) => onPad(e, true)} onPointerCancel={(e) => onPad(e, true)}>
          <span class="u" /><span class="r" /><span class="d" /><span class="l" />
        </div>
        <button class="adv-name-btn" onPointerDown={(e) => { e.preventDefault(); if (!busy) name(); }}>Name</button>
        <div class="adv-ab">
          {/* B: back / next in a dialogue; held while walking, it runs */}
          <button class="adv-b" onPointerDown={(e) => {
            e.preventDefault();
            if (inv) setInv(null);
            else if (look) setLook(null);
            else if (box && box.k !== 'ask') advance();
            if (eng.current && !box) eng.current.running = true;
          }} onPointerUp={() => { if (eng.current) eng.current.running = false; }} onPointerCancel={() => { if (eng.current) eng.current.running = false; }}>B</button>
          <button class="adv-a" onPointerDown={(e) => { e.preventDefault(); if (inv) setInv(null); else if (box) advance(); else eng.current?.action(); }}>A</button>
        </div>
      </div>

      {sel && selLine && sheetText && (
        names.has(selLine.t[sel.i][0])
          ? <NameSheet l={l} t={selLine.t[sel.i]} onClose={() => setSel(null)} />
          : <WordSheet l={l} lx={lx} t={selLine.t[sel.i]} text={sheetText} si={0} onClose={() => setSel(null)} onStep={stepWord} onSentence={() => {}} notes={[]} />
      )}
    </div>
  );
}

/** The inventory: items, the passport, and a map of where the cat is and where the journey goes. */
function Inventory({ l, txt, save, tab, setTab, engine, itemName, itemEn, onClose }: {
  l: LangId; txt: AdventureText; save: Save; tab: Tab; setTab: (t: Tab) => void; engine: Engine;
  itemName: (k: string) => string; itemEn: (k: string) => string; onClose: () => void;
}) {
  const stamps = WORLD_COUNTRIES.filter((c) => hasStamp(save, c.id)).length;
  return (
    <div class="adv-inv" role="dialog" aria-label="Inventory" onClick={onClose}>
      <div class={cls('adv-inv-card', tab === 'map' && 'wide')} onClick={(e) => e.stopPropagation()}>
        <div class="adv-inv-tabs" role="tablist">
          {(['bag', 'passport', 'map'] as Tab[]).map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} class={cls(tab === t && 'on')} onClick={() => setTab(t)}>
              {t === 'bag' ? 'Items' : t === 'passport' ? `Passport · ${stamps}` : 'Map'}
            </button>
          ))}
          <button class="icon-btn plain" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </div>
        {tab === 'bag' && (
          <div class="adv-inv-body">
            <div class="adv-wallet">
              <span class="adv-coin" aria-hidden="true" />
              {(Object.entries(save.wallet ?? {}) as [Currency, number][]).filter(([, n]) => n > 0).map(([c, n]) => (
                <span key={c}><b>{n}</b> <span lang={l}>{txt.currencies?.[c]?.[0] ?? c}</span> <small class="muted">({txt.currencies?.[c]?.[1] ?? c})</small></span>
              ))}
              {!Object.values(save.wallet ?? {}).some((n) => n) && <span class="muted">Your wallet is empty.</span>}
            </div>
            {!save.items.length && <p class="small muted">Nothing yet. Things you pick up or get from someone end up here.</p>}
            {[...new Set(save.items)].map((it) => {
              const n = save.items.filter((x) => x === it).length;
              return (
                <div class="adv-item" key={it}>
                  <img src={itemIcon(it)} alt="" width={32} height={32} />
                  <div><div lang={l}>{itemName(`item.${it}`)}{n > 1 && <b> ×{n}</b>}</div><div class="small muted">{itemEn(`item.${it}`)}</div></div>
                </div>
              );
            })}
          </div>
        )}
        {tab === 'passport' && <div class="adv-inv-body flush"><Passport l={l} txt={txt} save={save} inline onClose={onClose} /></div>}
        {tab === 'map' && <MapTab l={l} txt={txt} save={save} engine={engine} />}
      </div>
    </div>
  );
}

function MapTab({ l, txt, save, engine }: { l: LangId; txt: AdventureText; save: Save; engine: Engine }) {
  const [view, setView] = useState<'world' | 'here'>('world');
  const m = MAPS[save.map];
  const reveal = save.flags.includes('reveal_world');
  // countries reached: any of their maps visited
  const known = new Set(WORLD_COUNTRIES.map((c) => c.id).filter((c) => reveal || Object.values(MAPS).some((p) => p.country === c && save.flags.includes(`visited_${p.id}`))));
  const knownKey = [...known].join();
  const world = useMemo(() => toCanvas(drawWorldMap(known)).toDataURL(), [knownKey]);
  const here = useMemo(() => (view === 'here' ? engine.snapshot().toDataURL() : ''), [save.map, view]);
  const name = (id: string) => txt.places[id] ?? [id, id];
  /** A world place's name: the language's name once the place is built, else the English working name. */
  const placeName = (q: WPlace): [string, boolean] => {
    const built = Object.values(MAPS).find((p) => p.at === q.id && p.theme !== 'indoor');
    return built && txt.places[built.id] ? [txt.places[built.id][0], true] : [q.en, false];
  };
  const me = WORLD_PLACES.find((q) => q.id === m.at);
  const W = m.rows[0].length, H = m.rows.length;
  return (
    <div class="adv-inv-body">
      <div class="seg adv-map-seg">
        <button class={cls(view === 'world' && 'on')} onClick={() => setView('world')}>World</button>
        <button class={cls(view === 'here' && 'on')} onClick={() => setView('here')}>This area</button>
      </div>
      {view === 'world' && (
        <>
          <div class="adv-map-pic adv-world">
            <img src={world} alt="World map" />
            {WORLD_PLACES.filter((q) => q.kind !== 'border' && known.has(WORLD_COUNTRIES[q.country].id)).map((q) => {
              const [n, built] = placeName(q);
              return (
                <span key={q.id} class={cls('adv-wlabel', `k-${q.kind}`, !built && 'planned', q.x > WW * 0.7 && 'left')}
                  style={{ left: `${(q.x / WW) * 100}%`, top: `${(q.y / WH) * 100}%` }} lang={built ? l : undefined}>{n}</span>
              );
            })}
            {me && <span class="adv-map-me" style={{ left: `${(me.x / WW) * 100}%`, top: `${(me.y / WH) * 100}%` }} />}
          </div>
          <div class="small muted">
            The main road winds north from <b lang={l}>{name('village')[0]}</b> to the coast. Trains run up the middle between station cities in countries you have a stamp for.
          </div>
          <div class="adv-legend">
            {WORLD_COUNTRIES.map((c, i) => {
              const playable = ROUTE.includes(c.id as Country);
              return (
                <div key={c.id} class={cls('adv-legend-c', m.country === c.id && 'here', !known.has(c.id) && 'unknown')}>
                  <span class={`adv-biome b-${c.biome}`} />
                  <span class="grow">
                    {i + 1}. {known.has(c.id) ? <b lang={playable ? l : undefined}>{playable ? name(c.id)[0] : c.en}</b> : '???'}
                    {known.has(c.id) && !playable && <small> · coming later</small>}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
      {view === 'here' && (
        <>
          <div class="adv-map-pic">
            <img src={here} alt={`Map of ${name(m.id)[1]}`} />
            <span class="adv-map-me" style={{ left: `${((save.x + 0.5) / W) * 100}%`, top: `${((save.y + 0.5) / H) * 100}%` }} />
          </div>
          <div class="small muted">You are in <b lang={l}>{name(m.id)[0]}</b> ({name(m.id)[1]}).</div>
        </>
      )}
    </div>
  );
}

/** Playtesting: jump anywhere, skip quests, walk through walls. */
function DevPanel({ txt, save, engine, go, apply, reset, onClose }: {
  txt: AdventureText; save: Save; engine: Engine; go: (id: string) => void; apply: (f: () => void) => void; reset: () => void; onClose: () => void;
}) {
  const [noclip, setNoclip] = useState(engine.noclip);
  const add = (...fs: string[]) => { for (const f of fs) if (!save.flags.includes(f)) save.flags.push(f); };
  return (
    <div class="adv-inv" role="dialog" aria-label="Dev options" onClick={onClose}>
      <div class="adv-inv-card adv-dev" onClick={(e) => e.stopPropagation()}>
        <div class="row"><b class="grow">Dev options</b><button class="icon-btn plain" onClick={onClose} aria-label="Close"><Icon name="close" /></button></div>
        <div class="small muted mono">{save.map} · x {save.x} · y {save.y} · {save.flags.length} flags</div>
        <h4>Teleport</h4>
        {ROUTE.map((c) => (
          <div key={c} class="adv-dev-row">
            <span class="small muted">{txt.places[c]?.[1] ?? c}</span>
            {Object.values(MAPS).filter((p) => p.country === c).map((p) => (
              <button key={p.id} class="btn sm" onClick={() => go(p.id)}>{txt.places[p.id]?.[1] ?? p.id}</button>
            ))}
          </div>
        ))}
        <h4>Cheats</h4>
        <label class="row small"><input type="checkbox" checked={noclip} onChange={() => { engine.noclip = !noclip; setNoclip(!noclip); }} /> Walk through walls</label>
        <label class="row small"><input type="checkbox" checked={save.flags.includes('cheat_money')} onChange={() => apply(() => {
          if (save.flags.includes('cheat_money')) save.flags = save.flags.filter((f) => f !== 'cheat_money');
          else { save.flags.push('cheat_money'); save.wallet = { taler: 999, krone: 999, kredit: 999 }; }
        })} /> Infinite money (999 of every currency, nothing costs anything)</label>
        <div class="adv-dev-row">
          <button class="btn sm" onClick={() => apply(() => add('log_cleared', 'brambles_cut', 'gate_open', 'bridge_down', 'drift_cleared', 'met_tortoise', 'asked_beaver', 'asked_hedgehog', 'asked_dog', 'asked_mouse', 'asked_penguin', 'met_bat'))}>Clear roadblocks</button>
          <button class="btn sm" onClick={() => apply(() => add(...ROUTE.slice(0, -1).map((c) => `stamp_${c}`)))}>All stamps</button>
          <button class="btn sm" onClick={() => apply(() => { for (const i of ['shovel', 'twig_willow', 'twig_birch', 'twig_pine'] as ItemKind[]) if (!save.items.includes(i)) save.items.push(i); })}>All items</button>
          <button class="btn sm" onClick={() => apply(() => { save.flags = save.flags.filter((f) => !f.startsWith('stamp_')); })}>Remove stamps</button>
          <button class="btn sm" onClick={() => apply(() => add('reveal_world', ...Object.keys(MAPS).map((id) => `visited_${id}`)))}>Reveal map</button>
          <button class="btn sm danger" onClick={reset}>Reset journey</button>
        </div>
      </div>
    </div>
  );
}

/** A character or place name: it can be heard and looked at, but it is not a word to save. */
function NameSheet({ l, t, onClose }: { l: LangId; t: Text['s'][number]['t'][number]; onClose: () => void }) {
  return (
    <div class="sheet" role="dialog" aria-label="Name">
      <div class="sheet-inner stack">
        <div class="row">
          <div class="grow">
            <div class="w" lang={l}>{t[0]}</div>
            {t[1] && <div class="py-line">{t[1]}</div>}
          </div>
          <button class="icon-btn" onClick={() => speak(l, t[0])} aria-label="Listen"><Icon name="speaker" /></button>
          <button class="icon-btn plain" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </div>
        <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>{t[2]}</div>
        <p class="small muted">A name in the game, not a word to learn, so it can't be saved.</p>
      </div>
    </div>
  );
}
