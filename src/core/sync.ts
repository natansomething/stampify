/**
 * Optional accounts: sign in to keep progress in sync between devices. Without an account nothing changes: the app
 * keeps everything on the device, and backup files work as before. With one, progress is still saved on the device
 * first (the app works offline) and synced in the background: on start, when the app comes back to the foreground,
 * shortly after studying, and when it goes to the background.
 *
 * The server only stores the progress JSON with a revision number; merging happens here (merge.ts). This device
 * remembers the copy it last agreed on with the server (`base`), which makes the merge three-way.
 */
import { useEffect, useState } from 'preact/hooks';
import { toast } from '../ui/toast';
import { merge, same, toSync, withDevice, type SyncData } from './merge';
import { applySynced, hooks, idbGet, idbSet, migrate, migrateCards, save, state, type UserState } from './store';

export interface Account {
  name: string;
  token: string;
  /** Server revision of `base`. */
  rev: number;
  /** The progress as last synced; null right after signing in (the first sync combines both sides). */
  base: SyncData | null;
  /** The next sync replaces the account's progress with this device's (after loading a backup or a reset). */
  replace?: boolean;
  /** Last successful sync (ms). */
  at?: number;
}

export type Status = 'idle' | 'syncing' | 'offline' | 'error';

const KEY = 'account';
let account: Account | null = null;
let status: Status = 'idle';
let lastError = '';
const subs = new Set<() => void>();
const notify = () => subs.forEach((f) => f());

export const currentAccount = () => account;

/** Re-render on account or sync status changes. */
export function useAccount(): { account: Account | null; status: Status; error: string } {
  const [, set] = useState(0);
  useEffect(() => {
    const f = () => set((n) => n + 1);
    subs.add(f);
    return () => { subs.delete(f); };
  }, []);
  return { account, status, error: lastError };
}

// ---- API ----

export class ApiError extends Error {
  constructor(public status: number, message: string, public body: Record<string, unknown> = {}) { super(message); }
}

async function api<T = Record<string, unknown>>(method: string, path: string, data?: unknown, token?: string, keepalive = false): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api/${path}`, {
      method,
      headers: { ...(data !== undefined && { 'content-type': 'application/json' }), ...(token && { authorization: `Bearer ${token}` }) },
      body: data === undefined ? undefined : JSON.stringify(data),
      keepalive,
    });
  } catch {
    throw new ApiError(0, 'No connection. Check your internet and try again.');
  }
  let body: Record<string, unknown> = {};
  try { body = await res.json(); } catch { /* not JSON */ }
  if (!res.ok) throw new ApiError(res.status, String(body.error || `Server error (${res.status}).`), body);
  return body as T;
}

const authed = <T = Record<string, unknown>>(method: string, path: string, data?: unknown, keepalive = false) =>
  api<T>(method, path, data, account?.token, keepalive);

// ---- account storage ----

async function store(a: Account | null) {
  account = a;
  await idbSet(KEY, a);
  notify();
}

/** Another copy of the app (tab) may have synced: always work from the stored account. */
async function fresh(): Promise<Account | null> {
  try { account = (await idbGet<Account>(KEY)) || null; } catch { /* keep memory copy */ }
  if (account?.base) migrateCards(account.base);
  return account;
}

function signedOut(message: string) {
  account = null;
  idbSet(KEY, null).catch(() => {});
  status = 'idle';
  notify();
  toast(message, 'error');
}

// ---- sign in / up ----

/** Whether this device has progress worth keeping (anything studied). */
export function hasLocalProgress(): boolean {
  return Object.values(state.days).some((d) => d[0] > 0) || Object.values(state.langs).some((l) => l && Object.keys(l.cards).length > 0);
}

/** Creates the account; this device's progress becomes the account's. Returns the recovery code to show. */
export async function signUp(name: string, password: string): Promise<string> {
  const r = await api<{ token: string; name: string; recovery: string }>('POST', 'signup', { name, password });
  // New account: nothing to merge with, so the device's progress is pushed as it is
  await store({ name: r.name, token: r.token, rev: 0, base: null, replace: true });
  syncSoon(0);
  return r.recovery;
}

export interface SignIn {
  /** Both this device and the account have progress: the caller asks the learner what to do with it. */
  conflict: boolean;
  finish: (choice: 'combine' | 'account') => Promise<void>;
}

/** Signs in. The account's progress is fetched first, so the learner can choose how to treat this device's. */
export async function signIn(name: string, password: string, recovery?: { code: string }): Promise<SignIn & { recovery?: string }> {
  const r = recovery
    ? await api<{ token: string; name: string; recovery: string }>('POST', 'recover', { name, code: recovery.code, password })
    : await api<{ token: string; name: string; recovery?: string }>('POST', 'login', { name, password });
  const remote = await api<{ rev: number; data: string | null }>('GET', 'save', undefined, r.token);
  const finish = async (choice: 'combine' | 'account') => {
    if (choice === 'account' && remote.data) {
      const data = toSync(migrate(JSON.parse(remote.data)));
      applySynced(withDevice(data, state));
      await store({ name: r.name, token: r.token, rev: remote.rev, base: data, at: Date.now() });
    } else {
      // Combine (or the account is empty): the first sync merges without a base
      await store({ name: r.name, token: r.token, rev: remote.rev, base: null });
    }
    await syncNow();
  };
  return { conflict: !!remote.data && hasLocalProgress(), finish, recovery: r.recovery };
}

/** Signs this device out. Progress stays on the device. */
export async function signOut() {
  const a = await fresh();
  if (!a) return;
  await syncNow().catch(() => {});
  await api('POST', 'logout', undefined, a.token).catch(() => {});
  await store(null);
  status = 'idle';
  notify();
}

export const changePassword = (old: string, password: string) => authed('POST', 'password', { old, password });
export const newRecoveryCode = (password: string) => authed<{ recovery: string }>('POST', 'recovery-code', { password }).then((r) => r.recovery);

/** Deletes the account and its stored progress. Progress stays on this device. */
export async function deleteAccount(password: string) {
  await authed('POST', 'delete-account', { password });
  await store(null);
}

// ---- syncing ----

let running: Promise<void> | null = null;

/** Syncs now (one at a time across all open copies of the app). */
export function syncNow(keepalive = false): Promise<void> {
  if (running) return running;
  const run = async () => {
    try {
      await sync(keepalive);
    } finally {
      running = null;
    }
  };
  const locks = typeof navigator !== 'undefined' ? navigator.locks : undefined;
  running = locks ? locks.request('stampify-sync', run) : run();
  return running;
}

async function sync(keepalive: boolean) {
  const a = await fresh();
  if (!a) return;
  status = 'syncing';
  notify();
  try {
    save(); // pending local changes into storage, so other copies of the app see them too
    const snapshot = toSync(state);
    let rev = a.rev;
    let result: SyncData;

    if (a.replace) {
      // Replace the account's copy with this device's, whatever is there
      result = snapshot;
      rev = await put(rev, snapshot, keepalive, () => true);
    } else if (a.base && same(snapshot, a.base)) {
      // Nothing changed here: just fetch what other devices saved
      const r = await authed<{ rev: number; same?: boolean; data: string | null }>('GET', `save?rev=${a.rev}`);
      if (r.same || !r.data) { await store({ ...a, at: Date.now() }); return; }
      result = merge(a.base, snapshot, parse(r.data));
      rev = r.rev;
      if (!same(result, parse(r.data))) rev = await put(rev, result, keepalive, (remote) => (result = merge(a.base, snapshot, remote)));
    } else if (a.base) {
      // Changed here: save against the rev we merged with; if another device saved in between, merge and retry
      result = snapshot;
      rev = await put(rev, snapshot, keepalive, (remote) => (result = merge(a.base, snapshot, remote)));
    } else {
      // First sync after signing in: combine with whatever the account has
      const r = await authed<{ rev: number; data: string | null }>('GET', 'save');
      result = r.data ? merge(null, snapshot, parse(r.data)) : snapshot;
      rev = r.rev;
      if (!r.data || !same(result, parse(r.data))) rev = await put(rev, result, keepalive, (remote) => (result = merge(null, snapshot, remote)));
    }

    // The learner may have studied while we were talking to the server: keep that on top of the result
    const now = toSync(state);
    const final = same(now, snapshot) ? result : merge(snapshot, now, result);
    if (!same(final, now)) applySynced(withDevice(final, state));
    await store({ ...a, rev, base: result, replace: false, at: Date.now() });
    status = 'idle';
    lastError = '';
    if (!same(final, result)) syncSoon();
  } catch (e) {
    const err = e as ApiError;
    if (err.status === 401) return signedOut('You were signed out of sync. Sign in again in Settings.');
    status = err.status === 0 ? 'offline' : 'error';
    lastError = err.message;
    if (account) notify();
  } finally {
    if (status === 'syncing') { status = 'idle'; notify(); }
  }
}

function parse(data: string): SyncData {
  return toSync(migrate(JSON.parse(data) as UserState));
}

/**
 * Saves `data` against `rev`. On a conflict (another device saved first), `onConflict` gets the newer copy, returns
 * the data to save instead (or true to save the same again), and the save is retried against the newer rev.
 */
async function put(rev: number, data: SyncData, keepalive: boolean, onConflict: (remote: SyncData) => SyncData | true): Promise<number> {
  for (let i = 0; i < 5; i++) {
    const body = JSON.stringify(data);
    try {
      return (await authed<{ rev: number }>('PUT', 'save', { rev, data: body }, keepalive && body.length < 60_000)).rev;
    } catch (e) {
      const err = e as ApiError;
      if (err.status !== 409) throw err;
      rev = Number(err.body.rev) || 0;
      const remote = err.body.data ? parse(String(err.body.data)) : null;
      const next = remote ? onConflict(remote) : true;
      if (next !== true) data = next;
    }
  }
  throw new ApiError(409, 'Sync kept conflicting with another device. It will try again later.');
}

// ---- when to sync ----

let timer: number | undefined;

/** Syncs a few seconds after the last change, so a game round becomes one save instead of dozens. */
export function syncSoon(ms = 8000) {
  if (!account) return;
  clearTimeout(timer);
  timer = window.setTimeout(() => { syncNow().catch(() => {}); }, ms);
}

export async function initSync() {
  await fresh();
  hooks.onCommit = () => syncSoon();
  hooks.onReplace = () => {
    if (!account) return;
    account = { ...account, replace: true };
    idbSet(KEY, account).catch(() => {});
  };
  if (account) syncSoon(0);
  document.addEventListener('visibilitychange', () => {
    if (!account) return;
    clearTimeout(timer);
    // Leaving: send what's pending (keepalive lets the request finish after the page is hidden). Back: fetch news.
    syncNow(document.hidden).catch(() => {});
  });
  window.addEventListener('online', () => syncSoon(0));
}
