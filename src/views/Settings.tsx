import { useEffect, useRef, useState } from 'preact/hooks';
import { exportBackup, importBackup } from '../core/backup';
import { APP_NAME } from '../core/brand';
import { bandLabel, LANG_IDS, LANGS } from '../core/langs';
import { langSummaries, removeLanguage, setGoal, streak, totalXp, type LangSummary } from '../core/progress';
import { speak, useVoices } from '../core/speech';
import { commit, DEFAULT_SETTINGS, replaceState, state, useStore, migrate, type Settings as S } from '../core/store';
import { currentAccount, useAccount } from '../core/sync';
import { cls, plural } from '../core/util';
import { syncLine } from './Account';
import { Switch } from '../ui/components';
import { Icon } from '../ui/icons';
import { toast } from '../ui/toast';
import type { LangId } from '../content/types';

const GOALS = [20, 50, 100, 150];
const SAMPLE: Record<LangId, string> = {
  zh: '你好，很高兴认识你。', de: 'Hallo, schön dich kennenzulernen.', es: 'Hola, encantado de conocerte.',
  fr: 'Bonjour, ravi de faire ta connaissance.', it: 'Ciao, piacere di conoscerti.', pt: 'Oi, prazer em te conhecer.',
  nl: 'Hallo, leuk je te ontmoeten.', pl: 'Cześć, miło cię poznać.', ru: 'Привет, рад познакомиться.',
  ja: 'こんにちは、はじめまして。', ko: '안녕하세요, 만나서 반가워요.', hu: 'Szia, örülök, hogy megismerhetlek.',
};

function set<K extends keyof S>(k: K, v: S[K]) {
  state.settings[k] = v;
  commit();
}

export function Settings() {
  useStore();
  const st = state.settings;
  const [custom, setCustom] = useState(GOALS.includes(st.goal) ? '' : String(st.goal));
  const file = useRef<HTMLInputElement>(null);
  const [persisted, setPersisted] = useState<boolean | null>(null);
  const [allVoices, setAllVoices] = useState(false);
  // Voices for the languages in use; the rest behind a button (eleven pickers is a lot of scrolling)
  const used = LANG_IDS.filter((l) => state.langs[l] || l === st.lang);
  const voiceLangs = allVoices || !used.length ? LANG_IDS : used;
  useEffect(() => { navigator.storage?.persisted?.().then(setPersisted).catch(() => {}); }, []);

  return (
    <div class="stack-lg settings">
      <h1>Settings</h1>

      <ProfileCard />

      <section class="card">
        <h2>Daily goal</h2>
        <div class="pills" style={{ marginTop: 10 }}>
          {GOALS.map((g) => (
            <button key={g} class={cls('pill', st.goal === g && 'on')} onClick={() => { setGoal(g); setCustom(''); }}>
              {g} XP <span class="muted">{g === 20 ? 'casual' : g === 50 ? 'regular' : g === 100 ? 'serious' : 'intense'}</span>
            </button>
          ))}
          <form class="goal-custom" onSubmit={(e) => {
            e.preventDefault();
            const n = Math.round(+custom);
            if (n >= 5 && n <= 2000) { setGoal(n); toast(`Daily goal: ${n} XP`); } else toast('Pick a goal between 5 and 2000 XP', 'error');
          }}>
            <input type="number" min={5} max={2000} placeholder="Custom" aria-label="Custom daily goal in XP" value={custom}
              class={cls(!GOALS.includes(st.goal) && 'on')} onInput={(e) => setCustom((e.target as HTMLInputElement).value)} />
            <button class="btn sm" type="submit">Set</button>
          </form>
        </div>
        <p class="small muted" style={{ marginTop: 8 }}>Reach it to keep your streak. A quiz round is about 25 XP.</p>
      </section>

      <section class="card">
        <h2>Sound & display</h2>
        <div class="setting">
          <div class="grow"><b>Theme</b></div>
          <div class="seg">
            {(['auto', 'light', 'dark'] as const).map((t) => <button key={t} class={cls(st.theme === t && 'on')} onClick={() => set('theme', t)}>{t}</button>)}
          </div>
        </div>
        <div class="setting">
          <div class="grow"><b>Readings</b><p>Pinyin, furigana and romanization above the text.</p></div>
          <Switch on={st.showReading} label="Readings" onChange={(v) => set('showReading', v)} />
        </div>
        <div class="setting">
          <div class="grow"><b>Autoplay pronunciation</b><p>Words are read aloud in games and the reader.</p></div>
          <Switch on={st.autoplay} label="Autoplay" onChange={(v) => set('autoplay', v)} />
        </div>
        <div class="setting">
          <div class="grow"><b>Sound effects</b></div>
          <Switch on={st.sound} label="Sound effects" onChange={(v) => set('sound', v)} />
        </div>
        <div class="setting">
          <div class="grow"><b>Speech speed</b> <span class="small muted mono">{Math.round(st.rate * 100)}%</span></div>
          <input type="range" min={0.5} max={1.3} step={0.05} value={st.rate} style={{ width: 140 }} aria-label="Speech speed"
            onInput={(e) => set('rate', +(e.target as HTMLInputElement).value)} />
        </div>
        <details class="fold">
          <summary><b>Voices</b><span class="small muted">the voice for each language</span></summary>
          <p class="small muted">Audio uses the voices installed on this device.</p>
          {voiceLangs.map((l) => <VoicePick key={l} l={l} />)}
          {voiceLangs.length < LANG_IDS.length && (
            <button class="btn ghost block" style={{ marginTop: 8 }} onClick={() => setAllVoices(true)}>Show all languages</button>
          )}
        </details>
      </section>

      <YourLanguages />

      <section class="card">
        <h2>Backup</h2>
        <p class="small muted" style={{ margin: '4px 0 12px' }}>
          Progress is stored in this browser{currentAccount() ? ' and synced to your account' : ''}. A backup file is tiny and
          works with or without an account.
          {persisted === false && ' This browser may clear data when space runs low, so backups matter.'}
          {st.backedUp ? ` Last backup: ${new Date(st.backedUp).toLocaleDateString()}.` : ''}
        </p>
        <div class="row wrap">
          <button class="btn primary" onClick={async () => {
            try {
              const { size } = await exportBackup();
              toast(`Backup saved (${size < 1024 ? `${size} B` : `${(size / 1024).toFixed(1)} KB`})`);
            } catch { toast('Could not save the backup', 'error'); }
          }}><Icon name="save" size={18} />Save backup</button>
          <button class="btn" onClick={() => file.current?.click()}><Icon name="load" size={18} />Load backup</button>
          <input ref={file} type="file" accept=".lingo,.json,.gz,application/gzip,application/json" hidden onChange={async (e) => {
            const f = (e.target as HTMLInputElement).files?.[0];
            (e.target as HTMLInputElement).value = '';
            if (!f) return;
            const where = currentAccount() ? 'on this device and in your account (on all your devices)' : 'on this device';
            if ((totalXp() > 0 || currentAccount()) && !confirm(`Loading a backup replaces your current progress ${where}. Continue?`)) return;
            try { await importBackup(f); toast('Backup loaded'); } catch (err) { toast((err as Error).message, 'error'); }
          }} />
        </div>
      </section>

      <details class="card fold danger">
        <summary><b>Reset everything</b><span class="small muted">delete all progress</span></summary>
        <p class="small muted" style={{ margin: '4px 0 12px' }}>
          Deletes all progress on this device: every language, XP, streak and settings.
          {currentAccount() && ' You are signed in, so the progress in your account is reset too (on all your devices).'}
          {' '}To remove a single language, use Your languages above.
        </p>
        <button class="btn bad" onClick={() => {
          const msg = currentAccount()
            ? 'Delete all progress on this device AND in your account? This cannot be undone (unless you have a backup).'
            : 'Delete all progress on this device? This cannot be undone (unless you have a backup).';
          if (!confirm(msg)) return;
          replaceState(migrate({ settings: { ...DEFAULT_SETTINGS, voice: {} } }));
          toast('Progress reset');
        }}>Reset everything</button>
      </details>

      <p class="small muted center">
        {APP_NAME} · free, account optional, works offline · content is AI-generated and may contain mistakes ·{' '}
        <a href="#/privacy">privacy</a>
      </p>
    </div>
  );
}

/** The learner at a glance; opens the profile (and account) page. */
function ProfileCard() {
  const { account, status, error } = useAccount();
  const n = Object.keys(state.langs).length;
  return (
    <a class="card profile-card" href="#/account">
      <img class="avatar" src="avatar-default.svg" alt="" width={56} height={56} />
      <div class="grow">
        <b class="profile-name">{account?.name ?? 'Guest learner'}</b>
        <span class="small muted">{totalXp()} XP · {streak()}-day streak · {plural(n, 'language')}</span>
        <span class={cls('small', status === 'error' ? 'form-error' : 'muted')}>
          {account ? syncLine(account, status, error) : 'Not signed in: progress stays on this device'}
        </span>
      </div>
      <Icon name="next" size={20} />
    </a>
  );
}

/** Started languages with their progress, each removable (asks first, then can be undone). */
function YourLanguages() {
  const list = langSummaries();
  if (!list.length) return null;
  const remove = (x: LangSummary) => {
    const m = LANGS[x.l];
    const what = [plural(x.words, 'word'), `${x.xp} XP`, x.texts && plural(x.texts, 'text') + ' read', x.lessons && plural(x.lessons, 'lesson')].filter(Boolean).join(', ');
    const sync = currentAccount() ? ' It is removed from your account too.' : '';
    if (!confirm(`Remove ${m.name} and all its progress (${what})?${sync}\n\nYour streak and daily history stay. You can undo this right after.`)) return;
    const restore = removeLanguage(x.l);
    if (restore) toast(`${m.name} removed`, 'info', { label: 'Undo', run: () => { restore(); toast(`${m.name} is back`); } });
  };
  return (
    <section class="card">
      <h2>Your languages</h2>
      <p class="small muted" style={{ marginTop: 4 }}>Start another language from the passport switcher at the top left.</p>
      {list.map((x) => {
        const m = LANGS[x.l];
        const ls = state.langs[x.l]!;
        return (
          <div key={x.l} class="setting lang-manage" style={{ '--accent': m.color }}>
            <a class="booklet" lang={x.l} href={`#/${x.l}`} aria-label={`Open ${m.name}`}>{m.badge}</a>
            <div class="grow">
              <b>{m.name}</b>
              <p>{bandLabel(x.l, ls.band)} · {plural(x.words, 'word')} · {x.xp} XP</p>
            </div>
            <button class="icon-btn plain" aria-label={`Remove ${m.name} and its progress`} title="Remove language and its progress" onClick={() => remove(x)}>
              <Icon name="trash" size={20} />
            </button>
          </div>
        );
      })}
    </section>
  );
}

function VoicePick({ l }: { l: LangId }) {
  const voices = useVoices(l);
  const st = state.settings;
  return (
    <div class="setting">
      <div class="grow">
        <b>{LANGS[l].name}</b>
        {!voices.length && <p style={{ color: 'var(--warn)' }}>No voice installed: listening games are off.</p>}
      </div>
      {voices.length > 0 && (
        <>
          <select style={{ maxWidth: 190, minHeight: 40, fontSize: '0.85rem' }} value={st.voice[l] || ''}
            onChange={(e) => { st.voice[l] = (e.target as HTMLSelectElement).value || undefined; commit(); }}>
            <option value="">Default</option>
            {voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>)}
          </select>
          <button class="icon-btn" aria-label="Test voice" onClick={() => speak(l, SAMPLE[l])}><Icon name="speaker" size={20} /></button>
        </>
      )}
    </div>
  );
}
