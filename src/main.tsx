import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { registerSW } from 'virtual:pwa-register';
import './styles.css';
import { hasGuide, hasResources, hasSheets } from './content/guide';
import type { LangId } from './content/types';
import { APP_NAME } from './core/brand';
import { isLang, LANGS } from './core/langs';
import { streak, todayXp } from './core/progress';
import { loadState, state, useStore } from './core/store';
import { initSync } from './core/sync';
import { cls, plural } from './core/util';
import { LangList, Toasts } from './ui/components';
import { Icon } from './ui/icons';
import { GuideList, LessonView, SheetList, SheetView } from './views/Guide';
import { FindWords } from './views/Find';
import { Tools } from './views/Tools';
import { Watch } from './views/Watch';
import { Minigames, Practice } from './views/Practice';
import { Play } from './views/Play';
import { ReaderList, Reader } from './views/Reader';
import { Review } from './views/Review';
import { Settings } from './views/Settings';
import { AccountView } from './views/Account';
import { Privacy } from './views/Privacy';
import { Today, Welcome } from './views/Today';
import { Words } from './views/Words';
import { WordPopup } from './views/WordInfo';

/**
 * Hash routes:
 *   #/  first-run passport picker (else redirects to the current language) · #/settings
 *   #/account (profile) · #/account/signin|signup|recover · #/privacy
 *   #/<lang> Today · #/<lang>/practice · #/<lang>/games (minigames) · #/<lang>/read[/<textId>] · #/<lang>/words · #/<lang>/review
 *   #/<lang>/play/<gameId>[/<arg>]
 */
function parse(hash: string): string[] {
  return hash.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean).map(decodeURIComponent);
}

function useRoute(): string[] {
  const [route, setRoute] = useState(parse(location.hash));
  useEffect(() => {
    const f = () => { setRoute(parse(location.hash)); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  return route;
}

function applyTheme() {
  const t = state.settings.theme;
  if (t === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
}

type Tab = 'today' | 'tools' | 'guide' | 'practice' | 'words';
const TABS: { id: Tab; name: string; path: string }[] = [
  { id: 'today', name: 'Today', path: '' },
  { id: 'practice', name: 'Practice', path: '/practice' },
  // Tools: Analyse sentences & captions, and Watch
  { id: 'tools', name: 'Tools', path: '/tools' },
  // Resources: the guidebook, cheat sheets and other extras; only for languages that have some (route kept as /guide)
  { id: 'guide', name: 'Resources', path: '/guide' },
  { id: 'words', name: 'Words', path: '/words' },
];

/** Replaces an old address with its new one. */
function Redirect({ to }: { to: string }) {
  useEffect(() => { location.replace(to); }, [to]);
  return null;
}

function App() {
  useStore();
  const route = useRoute();
  const [picker, setPicker] = useState(false);
  useEffect(applyTheme, [state.settings.theme]);
  const [first, second, third, fourth] = route;
  const l: LangId | undefined = isLang(first) ? first : undefined;
  const current: LangId = l || state.settings.lang || 'zh';
  const started = Object.keys(state.langs).length > 0;

  // The start page only exists before the first language is chosen
  useEffect(() => { if (!first && started) location.replace(`#/${current}`); }, [first, started]);

  const focus = !!l && (second === 'play' || second === 'review' || (second === 'read' && !!third) || (second === 'guide' && fourth === 'practice'));
  const tab: Tab | null = !l ? null : !second ? 'today' : second === 'practice' || second === 'read' || second === 'games' ? 'practice' : second === 'tools' ? 'tools' : second === 'guide' ? 'guide' : second === 'words' ? 'words' : null;

  let view;
  if (first === 'settings') view = <Settings />;
  else if (first === 'account') view = <AccountView key={second} mode={second} />;
  else if (first === 'privacy') view = <Privacy />;
  else if (!l) view = <Welcome />;
  else if (!second) view = <Today l={l} />;
  else if (second === 'practice') view = <Practice l={l} />;
  else if (second === 'games') view = <Minigames l={l} />;
  else if (second === 'read') view = third ? <Reader l={l} id={third} /> : <ReaderList l={l} />;
  else if (second === 'review') view = <Review l={l} />;
  else if (second === 'guide' && third === 'sheets') view = fourth ? <SheetView key={fourth} l={l} id={fourth} /> : <SheetList l={l} />;
  else if (second === 'tools' && third === 'analyse') view = <FindWords l={l} />;
  else if (second === 'tools' && third === 'watch') view = <Watch l={l} />;
  else if (second === 'tools') view = <Tools l={l} />;
  // The tools used to live under Resources
  else if (second === 'guide' && third === 'find') view = <Redirect to={`#/${l}/tools/analyse`} />;
  else if (second === 'guide' && third === 'watch') view = <Redirect to={`#/${l}/tools/watch`} />;
  // Resources opens on its first shelf: the guidebook, else the cheat sheets (a language with neither goes to Tools)
  else if (second === 'guide' && !third && !hasGuide(l)) view = hasSheets(l) ? <SheetList l={l} /> : <Redirect to={`#/${l}/tools`} />;
  else if (second === 'guide') view = third ? <LessonView key={third + fourth} l={l} id={third} practice={fourth === 'practice'} /> : <GuideList l={l} />;
  else if (second === 'words') view = <Words l={l} />;
  else if (second === 'play' && third) view = <Play l={l} game={third} arg={fourth} />;
  else view = <Today l={l} />;

  const m = LANGS[current];
  const s = streak();
  const home = !first && !started;

  return (
    <div class={cls('app', focus && 'focus')} style={{ '--accent': m.color }}>
      {!focus && !home && (
        <header class="topbar">
          <button class="passport-btn" aria-label={`Language: ${m.name}. Change language`} onClick={() => setPicker(true)}>
            <span class="booklet" lang={current}>{m.badge}</span>
            {m.name.split(' ')[0]}
            <Icon name="down" size={14} />
          </button>
          <span class="spacer" />
          <a class={cls('streak-stamp', !todayXp() && 'dim')} href={`#/${current}`} title="Days in a row with the daily goal reached">
            {plural(s, 'day')} streak
          </a>
          <a class="icon-btn plain" href="#/settings" aria-label="Settings, backup and voices"><Icon name="gear" /></a>
        </header>
      )}
      <main>{view}</main>
      <WordPopup />
      {!focus && !home && (
        <nav class="tabbar" aria-label="Main">
          <div class="tabbar-inner" style={{ gridTemplateColumns: `repeat(${hasResources(current) ? 5 : 4}, minmax(0, 1fr))` }}>
            {TABS.filter((t) => t.id !== 'guide' || hasResources(current)).map((t) => (
              <a key={t.id} class={cls('tab', tab === t.id && 'on')} href={`#/${current}${t.path}`} aria-current={tab === t.id ? 'page' : undefined}>
                <Icon name={t.id} />{t.name}
              </a>
            ))}
          </div>
        </nav>
      )}
      {picker && (
        <>
          <button class="sheet-backdrop" aria-label="Close" onClick={() => setPicker(false)} />
          <div class="sheet" role="dialog" aria-label="Choose a language">
            <div class="sheet-inner stack">
              <div class="row">
                <h2 class="grow">Your passports</h2>
                <button class="icon-btn plain" aria-label="Close" onClick={() => setPicker(false)}><Icon name="close" /></button>
              </div>
              <LangList current={current} href={(x) => `#/${x}${TABS.find((t) => t.id === tab)?.path ?? ''}`} onPick={() => setPicker(false)} />
            </div>
          </div>
        </>
      )}
      <Toasts />
    </div>
  );
}

document.title = APP_NAME;
loadState().then(async () => {
  await initSync().catch(() => {});
  render(<App />, document.getElementById('app')!);
  registerSW({ immediate: true });
});
