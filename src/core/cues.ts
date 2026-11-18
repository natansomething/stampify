/**
 * Timed subtitles for Watch: SRT, WebVTT and ASS/SSA files, and the transcript YouTube shows under a video
 * ("Show transcript"), copied and pasted (a time, then the line).
 */

export interface Cue { start: number; end: number; text: string }

/** "01:02:03,450", "02:03.4", "1:02:03", "0:07" -> seconds. */
function seconds(t: string): number {
  const m = /^(?:(\d+):)?(\d{1,2}):(\d{1,2})(?:[.,](\d{1,3}))?$/.exec(t.trim());
  if (!m) return NaN;
  const [, h, mi, s, f] = m;
  return (Number(h) || 0) * 3600 + Number(mi) * 60 + Number(s) + (f ? Number(f.padEnd(3, '0')) / 1000 : 0);
}

const clean = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\{[^}]*\}/g, '').replace(/\\[Nn]/g, ' ').replace(/\s+/g, ' ').trim();

export function parseCues(raw: string): Cue[] {
  const text = raw.replace(/\r/g, '').replace(/^﻿/, '');
  let cues: Cue[] = [];

  if (/^\[Script Info\]/m.test(text)) {
    // ASS/SSA: Dialogue: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
    for (const line of text.split('\n')) {
      const m = /^Dialogue:\s*[^,]*,([^,]+),([^,]+),(?:[^,]*,){6}(.*)$/.exec(line);
      if (m) cues.push({ start: seconds(m[1]), end: seconds(m[2]), text: clean(m[3]) });
    }
  } else if (/-->/.test(text)) {
    // SRT / WebVTT: blocks with "start --> end" then the lines
    for (const block of text.split(/\n\s*\n/)) {
      const lines = block.split('\n');
      const k = lines.findIndex((x) => x.includes('-->'));
      if (k < 0) continue;
      const [a, b] = lines[k].split('-->');
      const t = clean(lines.slice(k + 1).join(' '));
      if (t) cues.push({ start: seconds(a), end: seconds(b.trim().split(/\s+/)[0]), text: t });
    }
  } else {
    // A pasted YouTube transcript: "0:07" on its own line (or at the start of a line), then the text
    const lines = text.split('\n').map((x) => x.trim()).filter(Boolean);
    let cur: { start: number; parts: string[] } | null = null;
    const flush = () => { if (cur && cur.parts.length) cues.push({ start: cur.start, end: NaN, text: clean(cur.parts.join(' ')) }); };
    for (const line of lines) {
      const m = /^(\d{1,2}(?::\d{2}){1,2})(?:\s+(.*))?$/.exec(line);
      if (m && !Number.isNaN(seconds(m[1]))) {
        flush();
        cur = { start: seconds(m[1]), parts: m[2] ? [m[2]] : [] };
      } else if (cur) cur.parts.push(line);
    }
    flush();
    // No end times: each line lasts until the next one (at most 8 s, for gaps without speech)
    cues.forEach((c, i) => { c.end = Math.min(cues[i + 1]?.start ?? Infinity, c.start + 8); });
  }
  cues = cues.filter((c) => c.text && Number.isFinite(c.start) && Number.isFinite(c.end)).sort((a, b) => a.start - b.start);
  return cues;
}

/** The YouTube video id in a link (watch?v=, youtu.be/, /shorts/, /embed/, /live/) or a bare id. */
export function youtubeId(link: string): string | null {
  const s = link.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s.startsWith('http') ? s : `https://${s}`);
    if (/(^|\.)youtu\.be$/.test(u.hostname)) return /^\/([\w-]{11})/.exec(u.pathname)?.[1] ?? null;
    if (/(^|\.)youtube(-nocookie)?\.com$/.test(u.hostname)) {
      const v = u.searchParams.get('v');
      if (v && /^[\w-]{11}$/.test(v)) return v;
      return /^\/(?:shorts|embed|live|v)\/([\w-]{11})/.exec(u.pathname)?.[1] ?? null;
    }
  } catch { /* not a link */ }
  return null;
}
