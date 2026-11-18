import { useState } from 'preact/hooks';
import type { LangId } from '../content/types';
import { APP_NAME } from '../core/brand';
import { bandLabel, LANGS } from '../core/langs';
import { bestStreak, langSummaries, streak, studyDays, totalXp } from '../core/progress';
import { state, useStore } from '../core/store';
import { dayToDate, plural, today } from '../core/util';
import {
  changePassword, deleteAccount, newRecoveryCode, signIn, signOut, signUp, syncNow, useAccount, type SignIn,
} from '../core/sync';
import { cls } from '../core/util';
import { Icon } from '../ui/icons';
import { Back } from '../ui/components';
import { toast } from '../ui/toast';

type Mode = 'signin' | 'signup' | 'recover';

/** #/account: the profile (stats, languages, account). #/account/signin|signup|recover: the account forms. */
export function AccountView({ mode: initial }: { mode?: string }) {
  useStore();
  const { account } = useAccount();
  const forms = !account && (initial === 'signin' || initial === 'signup' || initial === 'recover');
  // Steps after the form: show a new recovery code, then (sign-in only) ask what to do with this device's progress
  const [code, setCode] = useState<string | null>(null);
  const [choice, setChoice] = useState<SignIn | null>(null);

  let body;
  if (code) body = <RecoveryCode code={code} onDone={() => { setCode(null); if (!choice) location.hash = '#/account'; }} />;
  else if (choice) body = <Choose s={choice} onDone={() => { setChoice(null); location.hash = '#/account'; }} />;
  else if (forms) body = <Forms initial={initial as Mode} onCode={setCode} onChoice={setChoice} />;
  else body = <Profile onCode={setCode} />;

  return (
    <div class="stack-lg">
      <div class="row">
        <h1 class="grow">{forms ? 'Account' : 'Profile'}</h1>
        <Back href={forms ? '#/account' : '#/settings'} />
      </div>
      {body}
    </div>
  );
}

function Field({ label, type = 'text', value, onInput, auto, hint }: {
  label: string; type?: 'text' | 'password'; value: string; onInput: (v: string) => void; auto?: string; hint?: string;
}) {
  return (
    <label class="field">
      <span class="label">{label}</span>
      {/* type and autocomplete vary, which Preact's input typings can't express */}
      <input {...({ type, autocomplete: auto } as Record<string, string>)} value={value} autocapitalize="off" spellcheck={false}
        onInput={(e) => onInput((e.target as HTMLInputElement).value)} />
      {hint && <span class="small muted">{hint}</span>}
    </label>
  );
}

/** Runs a form action with a busy flag and error message. */
function useAction(): [boolean, string, (f: () => Promise<void>) => Promise<void>, (e: string) => void] {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const run = async (f: () => Promise<void>) => {
    setBusy(true);
    setError('');
    try { await f(); } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  };
  return [busy, error, run, setError];
}

function Forms({ initial, onCode, onChoice }: { initial: Mode; onCode: (c: string) => void; onChoice: (s: SignIn) => void }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [rc, setRc] = useState('');
  const [busy, error, run, setError] = useAction();

  const submit = (e: Event) => {
    e.preventDefault();
    if (mode !== 'signin' && pass !== pass2) return setError('The two passwords are different.');
    run(async () => {
      if (mode === 'signup') {
        onCode(await signUp(name.trim(), pass));
        toast(`Account created. Welcome, ${name.trim()}!`);
        return;
      }
      const s = await signIn(name.trim(), pass, mode === 'recover' ? { code: rc } : undefined);
      if (s.conflict) onChoice(s);
      else { await s.finish('combine'); toast(`Signed in as ${name.trim()}`); }
      if (s.recovery) onCode(s.recovery);
      else if (!s.conflict) location.hash = '#/account';
    });
  };

  return (
    <>
      <div class="seg account-tabs">
        <button class={cls(mode === 'signin' && 'on')} onClick={() => { setMode('signin'); setError(''); }}>Sign in</button>
        <button class={cls(mode === 'signup' && 'on')} onClick={() => { setMode('signup'); setError(''); }}>Create account</button>
      </div>
      <form class="card stack" onSubmit={submit}>
        {mode === 'signup' && (
          <p class="small muted">
            An account keeps your progress in sync between your devices. It's optional: {APP_NAME} works fully without one.
            Only a username and a password, no email.
          </p>
        )}
        {mode === 'recover' && (
          <p class="small muted">Forgot your password? Enter the recovery code you saved when you created the account, and choose a new password.</p>
        )}
        <Field label="Username" value={name} onInput={setName} auto="username"
          hint={mode === 'signup' ? '3–20 letters, digits or _. Others never see it.' : undefined} />
        {mode === 'recover' && <Field label="Recovery code" value={rc} onInput={setRc} auto="off" hint="Like ABCD-EFGH-JKLM-NPQR-STUV" />}
        <Field label={mode === 'recover' ? 'New password' : 'Password'} type="password" value={pass} onInput={setPass}
          auto={mode === 'signin' ? 'current-password' : 'new-password'} hint={mode !== 'signin' ? 'At least 8 characters.' : undefined} />
        {mode !== 'signin' && <Field label="Password again" type="password" value={pass2} onInput={setPass2} auto="new-password" />}
        {error && <p class="form-error" role="alert">{error}</p>}
        <button class="btn primary block" type="submit" disabled={busy || !name.trim() || !pass || (mode === 'recover' && !rc.trim())}>
          {busy ? 'One moment…' : mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Set new password'}
        </button>
        {mode === 'signin' && <button type="button" class="btn ghost block" onClick={() => { setMode('recover'); setError(''); }}>Forgot password?</button>}
        {mode === 'recover' && <button type="button" class="btn ghost block" onClick={() => { setMode('signin'); setError(''); }}>Back to sign in</button>}
      </form>
      <p class="small muted center">
        Read what is stored and why in the <a href="#/privacy">privacy notice</a>.
      </p>
    </>
  );
}

/** Shows a recovery code until the learner confirms they kept it. */
function RecoveryCode({ code, onDone }: { code: string; onDone: () => void }) {
  const [kept, setKept] = useState(false);
  const download = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([`${APP_NAME} recovery code\n\n${code}\n\nUse it with your username to set a new password if you forget yours.\n`], { type: 'text/plain' }));
    a.download = `${APP_NAME.toLowerCase()}-recovery-code.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    setKept(true);
  };
  return (
    <section class="card stack">
      <h2>Your recovery code</h2>
      <p class="small">
        If you forget your password, this code is the <b>only way</b> back into your account: there is no email to reset it.
        Write it down or save it somewhere safe. It is shown only now.
      </p>
      <div class="recovery-code mono" translate={false}>{code}</div>
      <div class="row wrap">
        <button class="btn" onClick={() => navigator.clipboard?.writeText(code).then(() => { toast('Code copied'); setKept(true); }).catch(() => toast('Could not copy: write it down', 'error'))}>Copy</button>
        <button class="btn" onClick={download}>Save as file</button>
      </div>
      <label class="row small"><input type="checkbox" checked={kept} onChange={(e) => setKept((e.target as HTMLInputElement).checked)} />I have saved my recovery code</label>
      <button class="btn primary block" disabled={!kept} onClick={onDone}>Continue</button>
    </section>
  );
}

/** Signing in on a device that has progress, to an account that has some too. */
function Choose({ s, onDone }: { s: SignIn; onDone: () => void }) {
  const [busy, error, run] = useAction();
  const go = (c: 'combine' | 'account') => run(async () => { await s.finish(c); toast('Signed in and synced'); onDone(); });
  return (
    <section class="card stack">
      <h2>This device has progress too</h2>
      <p class="small">Both this device and your account have progress. What should happen with this device's?</p>
      <button class="btn primary block" disabled={busy} onClick={() => go('combine')}>Combine both (recommended)</button>
      <p class="small muted">Words, texts and days from both are kept. Where both practised the same word, the more practised one counts.</p>
      <button class="btn block" disabled={busy} onClick={() => {
        if (confirm("Replace this device's progress with the account's? What was studied only on this device is lost (unless you have a backup).")) go('account');
      }}>Use only the account's progress</button>
      {error && <p class="form-error" role="alert">{error}</p>}
    </section>
  );
}

function ago(ms: number): string {
  const s = Math.round((Date.now() - ms) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  return new Date(ms).toLocaleDateString();
}

export function syncLine(a: { at?: number }, status: string, error: string): string {
  if (status === 'syncing') return 'Syncing…';
  if (status === 'offline') return 'Offline: progress is saved on this device and syncs when you are back online.';
  if (status === 'error') return `Sync problem: ${error}`;
  return a.at ? `Synced ${ago(a.at)}` : 'Not synced yet';
}

function Manage({ onCode }: { onCode: (c: string) => void }) {
  const { account, status, error } = useAccount();
  const [open, setOpen] = useState<'' | 'password' | 'code' | 'delete'>('');
  const [old, setOld] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [busy, err, run, setErr] = useAction();
  if (!account) return null;
  const toggle = (k: typeof open) => { setOpen(open === k ? '' : k); setOld(''); setPass(''); setPass2(''); setErr(''); };

  return (
    <>
      <section class="card stack">
        <h2>Account & sync</h2>
        <p class={cls('small', status === 'error' ? 'form-error' : 'muted')}>{syncLine(account, status, error)}</p>
        <div class="row wrap">
          <button class="btn" disabled={status === 'syncing'} onClick={() => syncNow().then(() => toast('Synced'))}>Sync now</button>
          <button class="btn" onClick={async () => {
            if (!confirm('Sign out on this device? Your progress stays here, but stops syncing.')) return;
            await signOut();
            toast('Signed out');
          }}>Sign out</button>
        </div>
      </section>

      <section class="card stack">
        <button class="setting-btn" aria-expanded={open === 'password'} onClick={() => toggle('password')}><b>Change password</b></button>
        {open === 'password' && (
          <form class="stack" onSubmit={(e) => {
            e.preventDefault();
            if (pass !== pass2) return setErr('The two new passwords are different.');
            run(async () => { await changePassword(old, pass); toast('Password changed. Other devices were signed out.'); toggle(''); });
          }}>
            <Field label="Current password" type="password" value={old} onInput={setOld} auto="current-password" />
            <Field label="New password" type="password" value={pass} onInput={setPass} auto="new-password" hint="At least 8 characters." />
            <Field label="New password again" type="password" value={pass2} onInput={setPass2} auto="new-password" />
            {err && <p class="form-error" role="alert">{err}</p>}
            <button class="btn primary" type="submit" disabled={busy || !old || !pass}>Change password</button>
          </form>
        )}

        <button class="setting-btn" aria-expanded={open === 'code'} onClick={() => toggle('code')}><b>New recovery code</b></button>
        {open === 'code' && (
          <form class="stack" onSubmit={(e) => { e.preventDefault(); run(async () => { onCode(await newRecoveryCode(old)); }); }}>
            <p class="small muted">Lost your recovery code? Get a new one. The old code stops working.</p>
            <Field label="Password" type="password" value={old} onInput={setOld} auto="current-password" />
            {err && <p class="form-error" role="alert">{err}</p>}
            <button class="btn primary" type="submit" disabled={busy || !old}>Show new code</button>
          </form>
        )}

        <button class="setting-btn" aria-expanded={open === 'delete'} onClick={() => toggle('delete')}><b>Delete account</b></button>
        {open === 'delete' && (
          <form class="stack" onSubmit={(e) => {
            e.preventDefault();
            if (!confirm(`Delete the account "${account.name}" and the progress stored with it? This cannot be undone.`)) return;
            run(async () => { await deleteAccount(old); toast('Account deleted'); });
          }}>
            <p class="small muted">
              Deletes your account and the progress stored on the server, for good. The progress on this device stays (you can
              still save a backup file); other devices keep theirs too but stop syncing.
            </p>
            <Field label="Password" type="password" value={old} onInput={setOld} auto="current-password" />
            {err && <p class="form-error" role="alert">{err}</p>}
            <button class="btn bad" type="submit" disabled={busy || !old}>Delete my account</button>
          </form>
        )}
      </section>
    </>
  );
}

/** Passport-style milestones on the profile: earned ones are inked, the rest faint. */
function milestones(words: number, langs: number, texts: number): { label: string; sub: string; on: boolean }[] {
  const xp = totalXp();
  const best = bestStreak();
  return [
    { label: 'First word', sub: 'saved a word', on: words >= 1 },
    { label: '100 words', sub: 'in your collection', on: words >= 100 },
    { label: '1,000 words', sub: 'in your collection', on: words >= 1000 },
    { label: 'Reader', sub: 'finished a text', on: texts >= 1 },
    { label: 'Week streak', sub: '7 days in a row', on: best >= 7 },
    { label: 'Month streak', sub: '30 days in a row', on: best >= 30 },
    { label: 'Polyglot', sub: '3 languages', on: langs >= 3 },
    { label: '10k XP', sub: 'earned in total', on: xp >= 10000 },
  ];
}

const WEEKS = 12;

/** The last 12 weeks, one square per day (Monday on top), shaded by XP against the daily goal. */
function Activity() {
  const t = today();
  const weekday = (d: number) => (dayToDate(d).getDay() + 6) % 7;
  const start = t - weekday(t) - (WEEKS - 1) * 7;
  const goal = state.settings.goal;
  const days = Array.from({ length: t - start + 1 }, (_, i) => start + i);
  const level = (d: number) => {
    const x = state.days[d];
    if (!x?.[0]) return 0;
    if (x[1]) return 3;
    return x[0] >= goal / 2 ? 2 : 1;
  };
  const active = days.filter((d) => level(d) > 0).length;
  return (
    <section class="card">
      <h2>Last {WEEKS} weeks</h2>
      <p class="small muted" style={{ margin: '4px 0 10px' }}>Studied on {plural(active, 'day')}. Dark squares: daily goal reached.</p>
      <div class="activity" role="img" aria-label={`Studied on ${active} of the last ${days.length} days`}>
        {days.map((d) => (
          <i key={d} class={`a${level(d)}${d === t ? ' today' : ''}`}
            title={`${dayToDate(d).toLocaleDateString()}: ${state.days[d]?.[0] || 0} XP`} />
        ))}
      </div>
    </section>
  );
}

function Profile({ onCode }: { onCode: (c: string) => void }) {
  const { account } = useAccount();
  const langs = langSummaries();
  const { count, first } = studyDays();
  const words = langs.reduce((n, x) => n + x.words, 0);
  const mastered = langs.reduce((n, x) => n + x.mastered, 0);
  const texts = langs.reduce((n, x) => n + x.texts, 0);
  const top = langs.filter((x) => x.xp > 0 || x.words > 0);
  const maxXp = Math.max(1, ...top.map((x) => x.xp));
  const stamps = milestones(words, langs.length, texts);
  return (
    <>
      <section class="card profile-head">
        <img class="avatar lg" src="avatar-default.svg" alt="Profile picture" width={96} height={96} />
        <div class="grow">
          <span class="label">{account ? 'Learner' : 'Guest learner'}</span>
          <h2 class="profile-name">{account?.name ?? 'Guest'}</h2>
          <p class="small muted">
            {first !== undefined ? `Learning since ${dayToDate(first).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}` : 'Just getting started'}
            {' · '}{plural(langs.length, 'language')}
          </p>
        </div>
      </section>

      <div class="stat-row profile-stats">
        <div class="stat xp"><b>{totalXp()}</b><span>Total XP</span></div>
        <div class="stat"><b>{streak()}</b><span>Day streak</span></div>
        <div class="stat"><b>{bestStreak()}</b><span>Best streak</span></div>
        <div class="stat"><b>{count}</b><span>Days studied</span></div>
        <div class="stat"><b>{words}</b><span>Words</span></div>
        <div class="stat ok"><b>{mastered}</b><span>Mastered</span></div>
      </div>

      <section class="card">
        <h2>Top languages</h2>
        {!top.length && <p class="small muted" style={{ marginTop: 6 }}>Play a game or read a text to put a language on the board.</p>}
        {top.map((x, i) => <TopLang key={x.l} rank={i + 1} l={x.l} xp={x.xp} max={maxXp} words={x.words} mastered={x.mastered} texts={x.texts} />)}
        {langs.length > 0 && <p class="small muted" style={{ marginTop: 10 }}>Manage or remove languages in <a href="#/settings">Settings</a>.</p>}
      </section>

      <Activity />

      <section class="card">
        <h2>Stamps</h2>
        <div class="milestones">
          {stamps.map((m, i) => (
            <div key={m.label} class={cls('milestone', m.on ? `on s${i % 4}` : 'off')} title={m.sub}>
              <b>{m.label}</b><span>{m.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {account ? <Manage onCode={onCode} /> : (
        <section class="card stack">
          <h2>Account & sync</h2>
          <p class="small muted">
            Optional: an account keeps your progress in sync on your phone, tablet and computer. Only a username and a
            password, no email.
          </p>
          <div class="row wrap">
            <a class="btn primary" href="#/account/signup">Create account</a>
            <a class="btn" href="#/account/signin">Sign in</a>
          </div>
        </section>
      )}
      <p class="small muted center"><a href="#/privacy">Privacy notice</a></p>
    </>
  );
}

function TopLang({ rank, l, xp, max, words, mastered, texts }: { rank: number; l: LangId; xp: number; max: number; words: number; mastered: number; texts: number }) {
  const m = LANGS[l];
  const ls = state.langs[l]!;
  return (
    <a class="top-lang" href={`#/${l}`} style={{ '--accent': m.color }}>
      <span class="rank mono">{rank}</span>
      <span class="booklet" lang={l}>{m.badge}</span>
      <div class="grow">
        <div class="row" style={{ justifyContent: 'space-between', gap: 8 }}>
          <b>{m.name}</b><span class="mono small">{xp} XP</span>
        </div>
        <div class="bar thin"><i style={{ width: `${Math.max(2, (xp / max) * 100)}%` }} /></div>
        <span class="small muted">{bandLabel(l, ls.band)} · {plural(words, 'word')} · {mastered} mastered{texts ? ` · ${plural(texts, 'text')} read` : ''}</span>
      </div>
      <Icon name="next" size={18} />
    </a>
  );
}
