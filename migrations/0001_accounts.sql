-- Accounts for syncing progress between devices. Usernames and passwords only: no email, no real names.
-- New features (friends, leaderboards...) get their own tables that point at users.id.

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE COLLATE NOCASE,
  -- "pbkdf2$<iterations>$<salt>$<hash>" (base64)
  pass TEXT NOT NULL,
  -- SHA-256 of the one-time recovery code (the code itself is random and long, so a fast hash is enough)
  recovery TEXT NOT NULL,
  created INTEGER NOT NULL,
  -- Failed logins in a row and when the account may be tried again (ms), against password guessing
  fails INTEGER NOT NULL DEFAULT 0,
  locked_until INTEGER NOT NULL DEFAULT 0
);

-- Logged-in devices. Only a SHA-256 of the token is stored, so a database leak gives no working logins.
CREATE TABLE sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created INTEGER NOT NULL,
  last_used INTEGER NOT NULL
);
CREATE INDEX sessions_user ON sessions(user_id);

-- The synced progress: the same JSON the backup file holds. rev goes up by one with every save, so two devices
-- can't overwrite each other's progress (a save against an old rev is refused and the device merges first).
CREATE TABLE saves (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  rev INTEGER NOT NULL,
  data TEXT NOT NULL,
  updated INTEGER NOT NULL
);

-- Short-lived counters for rate limits (sign-ups and failed logins per network address). The address is hashed
-- and rows expire within an hour.
CREATE TABLE limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  reset INTEGER NOT NULL
);
