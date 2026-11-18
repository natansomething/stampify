/**
 * Stampify API: accounts and progress sync. Everything else (the app itself) is static files served by Cloudflare;
 * this script only answers /api/*. The server never interprets progress: it stores the app's JSON as-is, and devices
 * merge their changes themselves (src/core/sync.ts), which keeps each request well inside the free plan's CPU limit.
 */

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

// Password hashing: PBKDF2-SHA256. 10,000 rounds take ~5 ms, inside the free plan's 10 ms CPU budget per request.
// The round count is stored with each hash, so it can be raised later: older hashes are upgraded at the next login.
const ROUNDS = 10_000;
const NAME_RE = /^[A-Za-z0-9_]{3,20}$/;
const MIN_PASS = 8;
const MAX_PASS = 200;
/** Progress JSON larger than this is refused (a heavy user is ~100 KB). */
const MAX_SAVE = 2_000_000;
/** Sessions unused for this long stop working. */
const SESSION_TTL = 365 * 86_400_000;
const HOUR = 3_600_000;

class HttpError extends Error {
  constructor(public status: number, message: string, public extra?: Record<string, unknown>) { super(message); }
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

// ---- crypto helpers ----

const enc = new TextEncoder();
const b64 = (buf: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

function randomBytes(n: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(n));
}

async function sha256(text: string): Promise<string> {
  return b64(await crypto.subtle.digest('SHA-256', enc.encode(text)));
}

async function pbkdf2(password: string, salt: Uint8Array, rounds: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: rounds }, key, 256));
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  return `pbkdf2$${ROUNDS}$${b64(salt)}$${b64(await pbkdf2(password, salt, ROUNDS))}`;
}

function sameBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i];
  return d === 0;
}

async function checkPassword(password: string, stored: string): Promise<{ ok: boolean; outdated: boolean }> {
  const [kind, rounds, salt, hash] = stored.split('$');
  if (kind !== 'pbkdf2') return { ok: false, outdated: false };
  const ok = sameBytes(await pbkdf2(password, unb64(salt), +rounds), unb64(hash));
  return { ok, outdated: +rounds !== ROUNDS };
}

/** A random token, URL-safe. */
function token(bytes = 32): string {
  return b64(randomBytes(bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Recovery code: 20 characters in groups of 4 from an alphabet without look-alikes (~100 bits). */
function recoveryCode(): string {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const r = randomBytes(20);
  const s = [...r].map((x) => abc[x % abc.length]).join('');
  return s.match(/.{4}/g)!.join('-');
}

const normCode = (c: string) => c.toUpperCase().replace(/[^A-Z0-9]/g, '');

// ---- rate limits ----

/** Counts an event for key; throws 429 once more than max happened within the window. */
async function limit(env: Env, key: string, max: number, windowMs: number, message: string) {
  const now = Date.now();
  const row = await env.DB.prepare(
    `INSERT INTO limits (key, count, reset) VALUES (?1, 1, ?2)
     ON CONFLICT(key) DO UPDATE SET
       count = CASE WHEN reset < ?3 THEN 1 ELSE count + 1 END,
       reset = CASE WHEN reset < ?3 THEN ?2 ELSE reset END
     RETURNING count`,
  ).bind(key, now + windowMs, now).first<{ count: number }>();
  if (row && row.count > max) throw new HttpError(429, message);
}

async function ipKey(req: Request, kind: string): Promise<string> {
  const ip = req.headers.get('cf-connecting-ip') || 'local';
  return `${kind}:${(await sha256('stampify:' + ip)).slice(0, 22)}`;
}

// ---- sessions ----

async function newSession(env: Env, userId: number): Promise<string> {
  const t = token();
  const now = Date.now();
  await env.DB.prepare('INSERT INTO sessions (token, user_id, created, last_used) VALUES (?, ?, ?, ?)')
    .bind(await sha256(t), userId, now, now).run();
  return t;
}

async function auth(req: Request, env: Env): Promise<{ userId: number; name: string; tokenHash: string }> {
  const t = req.headers.get('authorization')?.replace(/^Bearer /, '');
  if (!t) throw new HttpError(401, 'Not signed in.');
  const tokenHash = await sha256(t);
  const row = await env.DB.prepare(
    'SELECT s.user_id, s.last_used, u.name FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?',
  ).bind(tokenHash).first<{ user_id: number; last_used: number; name: string }>();
  const now = Date.now();
  if (!row || now - row.last_used > SESSION_TTL) throw new HttpError(401, 'You were signed out. Please sign in again.');
  // Refreshed at most daily, to keep database writes low
  if (now - row.last_used > 86_400_000) {
    await env.DB.prepare('UPDATE sessions SET last_used = ? WHERE token = ?').bind(now, tokenHash).run();
  }
  return { userId: row.user_id, name: row.name, tokenHash };
}

// ---- input checks ----

async function body(req: Request): Promise<Record<string, unknown>> {
  if (+(req.headers.get('content-length') || 0) > MAX_SAVE + 10_000) throw new HttpError(413, 'Too much data.');
  try {
    const b = await req.json();
    if (b && typeof b === 'object') return b as Record<string, unknown>;
  } catch { /* fall through */ }
  throw new HttpError(400, 'Bad request.');
}

function str(b: Record<string, unknown>, k: string): string {
  const v = b[k];
  if (typeof v !== 'string') throw new HttpError(400, `Missing ${k}.`);
  return v;
}

function checkNewPassword(p: string) {
  if (p.length < MIN_PASS) throw new HttpError(400, `The password needs at least ${MIN_PASS} characters.`);
  if (p.length > MAX_PASS) throw new HttpError(400, 'That password is too long.');
}

// ---- users ----

interface UserRow { id: number; name: string; pass: string; recovery: string; fails: number; locked_until: number }

async function findUser(env: Env, name: string): Promise<UserRow | null> {
  return env.DB.prepare('SELECT id, name, pass, recovery, fails, locked_until FROM users WHERE name = ?').bind(name).first<UserRow>();
}

/** After 5 failed attempts in a row the account waits 1 minute, then 2, 4... up to an hour between tries. */
async function failedAttempt(env: Env, u: UserRow) {
  const fails = u.fails + 1;
  const wait = fails >= 5 ? Math.min(HOUR, 60_000 * 2 ** (fails - 5)) : 0;
  await env.DB.prepare('UPDATE users SET fails = ?, locked_until = ? WHERE id = ?').bind(fails, Date.now() + wait, u.id).run();
}

function checkLock(u: UserRow) {
  const left = u.locked_until - Date.now();
  if (left > 0) throw new HttpError(429, `Too many wrong passwords. Try again in ${Math.ceil(left / 60_000)} min.`);
}

const WRONG = 'Wrong username or password.';

// ---- routes ----

async function signup(req: Request, env: Env) {
  const b = await body(req);
  const name = str(b, 'name').trim();
  const password = str(b, 'password');
  if (!NAME_RE.test(name)) throw new HttpError(400, 'Usernames are 3-20 letters, digits or _.');
  checkNewPassword(password);
  await limit(env, await ipKey(req, 'signup'), 10, HOUR, 'Too many new accounts from this network. Try again later.');
  if (await findUser(env, name)) throw new HttpError(409, 'That username is taken.');
  const code = recoveryCode();
  const row = await env.DB.prepare('INSERT INTO users (name, pass, recovery, created) VALUES (?, ?, ?, ?) RETURNING id')
    .bind(name, await hashPassword(password), await sha256(normCode(code)), Date.now())
    .first<{ id: number }>()
    .catch(() => { throw new HttpError(409, 'That username is taken.'); });
  return json({ token: await newSession(env, row!.id), name, recovery: code });
}

async function login(req: Request, env: Env) {
  const b = await body(req);
  const name = str(b, 'name').trim();
  const password = str(b, 'password');
  await limit(env, await ipKey(req, 'login'), 30, HOUR, 'Too many sign-in attempts from this network. Try again later.');
  const u = await findUser(env, name);
  if (!u || password.length > MAX_PASS) throw new HttpError(401, WRONG);
  checkLock(u);
  const { ok, outdated } = await checkPassword(password, u.pass);
  if (!ok) { await failedAttempt(env, u); throw new HttpError(401, WRONG); }
  const stmts = [env.DB.prepare('UPDATE users SET fails = 0, locked_until = 0 WHERE id = ?').bind(u.id)];
  if (outdated) stmts.push(env.DB.prepare('UPDATE users SET pass = ? WHERE id = ?').bind(await hashPassword(password), u.id));
  await env.DB.batch(stmts);
  return json({ token: await newSession(env, u.id), name: u.name });
}

async function logout(req: Request, env: Env) {
  const a = await auth(req, env);
  await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(a.tokenHash).run();
  return json({ ok: true });
}

/** Forgotten password: the recovery code sets a new one. All devices are signed out and a new code is issued. */
async function recover(req: Request, env: Env) {
  const b = await body(req);
  const name = str(b, 'name').trim();
  const code = normCode(str(b, 'code'));
  const password = str(b, 'password');
  checkNewPassword(password);
  await limit(env, await ipKey(req, 'login'), 30, HOUR, 'Too many attempts from this network. Try again later.');
  const u = await findUser(env, name);
  // No account lock here: the code can't be guessed (~100 bits), and someone guessing the password must not block it.
  if (!u || (await sha256(code)) !== u.recovery) throw new HttpError(401, 'Wrong username or recovery code.');
  const fresh = recoveryCode();
  await env.DB.batch([
    env.DB.prepare('UPDATE users SET pass = ?, recovery = ?, fails = 0, locked_until = 0 WHERE id = ?')
      .bind(await hashPassword(password), await sha256(normCode(fresh)), u.id),
    env.DB.prepare('DELETE FROM sessions WHERE user_id = ?').bind(u.id),
  ]);
  return json({ token: await newSession(env, u.id), name: u.name, recovery: fresh });
}

/** Change password (needs the current one). Other devices are signed out. */
async function changePassword(req: Request, env: Env) {
  const a = await auth(req, env);
  const b = await body(req);
  const old = str(b, 'old');
  const password = str(b, 'password');
  checkNewPassword(password);
  const u = (await findUser(env, a.name))!;
  checkLock(u);
  if (!(await checkPassword(old, u.pass)).ok) { await failedAttempt(env, u); throw new HttpError(401, 'The current password is wrong.'); }
  await env.DB.batch([
    env.DB.prepare('UPDATE users SET pass = ?, fails = 0, locked_until = 0 WHERE id = ?').bind(await hashPassword(password), u.id),
    env.DB.prepare('DELETE FROM sessions WHERE user_id = ? AND token != ?').bind(u.id, a.tokenHash),
  ]);
  return json({ ok: true });
}

/** A new recovery code (needs the password). The old code stops working. */
async function newRecovery(req: Request, env: Env) {
  const a = await auth(req, env);
  const b = await body(req);
  const u = (await findUser(env, a.name))!;
  checkLock(u);
  if (!(await checkPassword(str(b, 'password'), u.pass)).ok) { await failedAttempt(env, u); throw new HttpError(401, 'Wrong password.'); }
  const code = recoveryCode();
  await env.DB.prepare('UPDATE users SET recovery = ? WHERE id = ?').bind(await sha256(normCode(code)), u.id).run();
  return json({ recovery: code });
}

/** Deletes the account and everything stored with it (needs the password). */
async function deleteAccount(req: Request, env: Env) {
  const a = await auth(req, env);
  const b = await body(req);
  const u = (await findUser(env, a.name))!;
  checkLock(u);
  if (!(await checkPassword(str(b, 'password'), u.pass)).ok) { await failedAttempt(env, u); throw new HttpError(401, 'Wrong password.'); }
  await env.DB.batch([
    env.DB.prepare('DELETE FROM saves WHERE user_id = ?').bind(u.id),
    env.DB.prepare('DELETE FROM sessions WHERE user_id = ?').bind(u.id),
    env.DB.prepare('DELETE FROM users WHERE id = ?').bind(u.id),
  ]);
  return json({ ok: true });
}

/** GET: the saved progress, or {rev, same: true} when the device already has this rev (?rev=N). */
async function getSave(req: Request, env: Env) {
  const a = await auth(req, env);
  const have = new URL(req.url).searchParams.get('rev');
  const row = await env.DB.prepare('SELECT rev, data FROM saves WHERE user_id = ?').bind(a.userId).first<{ rev: number; data: string }>();
  if (!row) return json({ name: a.name, rev: 0, data: null });
  if (have !== null && +have === row.rev) return json({ name: a.name, rev: row.rev, same: true });
  return json({ name: a.name, rev: row.rev, data: row.data });
}

/**
 * PUT {rev, data}: saves if the stored rev is still `rev` (what the device merged against), answering {rev: new}.
 * Otherwise 409 with the newer save, which the device merges and sends again.
 */
async function putSave(req: Request, env: Env) {
  const a = await auth(req, env);
  const b = await body(req);
  const rev = b.rev;
  const data = str(b, 'data');
  if (typeof rev !== 'number' || !Number.isInteger(rev) || rev < 0) throw new HttpError(400, 'Bad rev.');
  if (data.length > MAX_SAVE) throw new HttpError(413, 'Your progress is too large to sync.');
  const now = Date.now();
  const res = rev === 0
    ? await env.DB.prepare('INSERT INTO saves (user_id, rev, data, updated) VALUES (?, 1, ?, ?) ON CONFLICT(user_id) DO NOTHING')
      .bind(a.userId, data, now).run()
    : await env.DB.prepare('UPDATE saves SET rev = rev + 1, data = ?, updated = ? WHERE user_id = ? AND rev = ?')
      .bind(data, now, a.userId, rev).run();
  if (res.meta.changes) return json({ rev: rev + 1 });
  const cur = await env.DB.prepare('SELECT rev, data FROM saves WHERE user_id = ?').bind(a.userId).first<{ rev: number; data: string }>();
  return json({ error: 'conflict', rev: cur?.rev ?? 0, data: cur?.data ?? null }, 409);
}

const ROUTES: Record<string, (req: Request, env: Env) => Promise<Response>> = {
  'POST /api/signup': signup,
  'POST /api/login': login,
  'POST /api/logout': logout,
  'POST /api/recover': recover,
  'POST /api/password': changePassword,
  'POST /api/recovery-code': newRecovery,
  'POST /api/delete-account': deleteAccount,
  'GET /api/save': getSave,
  'PUT /api/save': putSave,
};

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(req);
    const route = ROUTES[`${req.method} ${url.pathname}`];
    if (!route) return json({ error: 'Not found.' }, 404);
    // Same-origin app only: refuse writes that a browser marks as coming from another site
    const site = req.headers.get('sec-fetch-site');
    if (req.method !== 'GET' && site && site !== 'same-origin' && site !== 'none') return json({ error: 'Forbidden.' }, 403);
    try {
      return await route(req, env);
    } catch (e) {
      if (e instanceof HttpError) return json({ error: e.message, ...e.extra }, e.status);
      console.error(e);
      return json({ error: 'Something went wrong on the server. Try again later.' }, 500);
    }
  },
} satisfies ExportedHandler<Env>;
