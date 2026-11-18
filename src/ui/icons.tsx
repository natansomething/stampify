/**
 * Line icons drawn in the current text colour (no emoji anywhere in the UI). 24×24 grid, 1.8 stroke.
 * Game icons are named after the game id, so a GameDef's `icon` is simply its key here.
 */
import type { JSX } from 'preact';

const P: Record<string, JSX.Element> = {
  close: <path d="M6 6l12 12M18 6L6 18" />,
  back: <path d="M15 5l-7 7 7 7" />,
  prev: <path d="M14.5 6l-6 6 6 6" />,
  next: <path d="M9.5 6l6 6-6 6" />,
  prev2: <path d="M12 6l-6 6 6 6M18 6l-6 6 6 6" />,
  next2: <path d="M6 6l6 6-6 6M12 6l6 6-6 6" />,
  down: <path d="M6 9.5l6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  speaker: <><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" /><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11" /></>,
  slow: <><path d="M3 15.5c0-4 3.5-7 8-7s8 3 8 7z" /><path d="M19 13.5h2.5M6 15.5v3M15 15.5v3M8 11l2 4.5M13 10.5l1 5" /></>,
  stop: <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" />,
  gear: <><circle cx="12" cy="12" r="3.2" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" /></>,
  today: <><circle cx="12" cy="12" r="4.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
  practice: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  read: <path d="M3 5.5c3-1.5 6-1.5 9 0v14c-3-1.5-6-1.5-9 0zM21 5.5c-3-1.5-6-1.5-9 0v14c3-1.5 6-1.5 9 0z" />,
  guide: <><circle cx="12" cy="12" r="8.5" /><path d="M15.2 8.8l-1.9 4.5-4.5 1.9 1.9-4.5z" /></>,
  expand: <path d="M4.5 9V4.5H9M15 4.5h4.5V9M19.5 15v4.5H15M9 19.5H4.5V15" />,
  tools: <path d="M14.7 6.3a4 4 0 0 0-5.2 5.2l-5.6 5.6a1.6 1.6 0 0 0 2.3 2.3l5.6-5.6a4 4 0 0 0 5.2-5.2l-2.5 2.5-2.3-.5-.5-2.3z" />,
  video: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M10.5 9.5v5l4-2.5z" /></>,
  screen: <><rect x="3.5" y="4.5" width="17" height="11.5" rx="1.5" /><path d="M9 20h6M12 16v4M7 12.5h10" /></>,
  copy: <><rect x="8.5" y="8.5" width="11" height="11" rx="2" /><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" /></>,
  translate: <path d="M4 5.5h9M8.5 4v1.5M11 5.5c-.8 3.2-3 5.8-6.5 7.5M6.5 8.5c1 1.8 2.6 3.2 4.5 4M13 20l3.5-8.5L20 20M14.2 17.2h4.6" />,
  target: <><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2" /><path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4" /></>,
  external: <path d="M13.5 4.5h6v6M19.5 4.5l-8 8M17 14v5.5H4.5V7H10" />,
  sheet: <><path d="M5 3.5h10l4 4v13H5z" /><path d="M15 3.5v4h4M8 11.5h8M8 15h8M8 18.5h8M11.5 11.5v7" /></>,
  words: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4" /></>,
  trash: <path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 10.5v6M14 10.5v6" />,
  save: <path d="M12 4v11M7 10.5l5 5 5-5M4.5 19.5h15" />,
  load: <path d="M12 16V5M7 9.5l5-5 5 5M4.5 19.5h15" />,
  stamp: <><path d="M9 4.5h6v5.5c0 1.5 4.5 2 4.5 5V16h-15v-1c0-3 4.5-3.5 4.5-5z" /><path d="M4 19.5h16" /></>,
  review: <><rect x="3.5" y="6" width="13" height="14" rx="1.5" /><path d="M7.5 3.5h11a2 2 0 012 2v11" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /></>,
  warn: <><path d="M12 4l9 15.5H3z" /><path d="M12 10v4.5M12 17v.5" /></>,
  // games
  quiz: <><circle cx="12" cy="12" r="9" /><path d="M9.2 9.5a2.9 2.9 0 115 2.2c-1 .6-1.7 1.2-1.7 2.4M12.5 17v.5" /></>,
  match: <><rect x="3" y="5" width="7" height="6" rx="1" /><rect x="14" y="13" width="7" height="6" rx="1" /><path d="M10 8h2.5a1.5 1.5 0 011.5 1.5v4.5" /></>,
  odd: <><circle cx="6.5" cy="7" r="2.5" /><circle cx="17.5" cy="7" r="2.5" /><circle cx="6.5" cy="17" r="2.5" /><rect x="15" y="14.5" width="5" height="5" /></>,
  type: <><rect x="2.5" y="6" width="19" height="12" rx="2" /><path d="M6 10h.5M9.5 10h.5M13 10h.5M16.5 10h1M7 14h10" /></>,
  builder: <><rect x="3" y="14" width="8" height="5" /><rect x="13" y="14" width="8" height="5" /><rect x="8" y="7" width="8" height="5" /></>,
  gap: <><path d="M3 10h5M16 10h5M3 17h18" /><rect x="9.5" y="6" width="5" height="8" rx="1" stroke-dasharray="2 2" /></>,
  spot: <><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5M8.5 8.5l4 4M12.5 8.5l-4 4" /></>,
  dialogue: <><path d="M3.5 5.5h11v7h-6l-3 3v-3h-2z" /><path d="M17.5 9.5h3v7h-2v3l-3-3h-5v-2" /></>,
  listen: <path d="M7 14.5a5 5 0 1110 0c0 2.5-2.5 3-2.5 5a2.5 2.5 0 01-5 0M9.5 13a2.5 2.5 0 015 0" />,
  dictation: <><path d="M15.5 4.5l4 4L9 19H5v-4z" /><path d="M13 7l4 4" /></>,
  tones: <path d="M3 8h5M10 18l4-9M16 12c1.5 3.5 3.5 3.5 5 0" />,
  pinyin: <><path d="M4 18V7.5a3.5 3.5 0 017 0V18M4 13h7" /><path d="M14.5 4.5h5M17 10v8" /></>,
  romanize: <><path d="M3 18l4.5-12L12 18M4.7 13.5h5.6" /><circle cx="17.5" cy="15" r="3" /><path d="M20.5 12v6" /></>,
  strokes: <><path d="M5 19c4-1 6-4 7-8l1.5-6 3 1-1.5 6c-1 4-3 7-7 8.5" /><path d="M4 20.5h4" /></>,
  gender: <><circle cx="9" cy="9" r="5" /><circle cx="15" cy="15" r="5" /></>,
  plurals: <><rect x="3" y="8" width="9" height="11" rx="1.5" /><path d="M7 5h9.5A1.5 1.5 0 0118 6.5V16M11 2.5h8.5a1.5 1.5 0 011.5 1.5v9" /></>,
  conj: <><path d="M4 9a8 8 0 0114-3.5M20 15a8 8 0 01-14 3.5" /><path d="M18.5 2.5v3.5H15M5.5 21.5V18H9" /></>,
  accents: <><path d="M6 19l6-12 6 12M8.5 14h7" /><path d="M11 3l3 2.5" /></>,
  drill: <><path d="M4 20h16M6 20V9l6-5 6 5v11" /><path d="M10 20v-6h4v6" /></>,
  kana: <path d="M5 8.5h13c0 6.5-2.5 10.5-6.5 12M10.5 3.5c0 8.5-2 13-5.5 16" />,
  hangul: <><path d="M9 3.5h6M5.5 8h13" /><circle cx="12" cy="15" r="4.5" /></>,
  cyrillic: <path d="M12 4v16M4 4l5 8-5 8M20 4l-5 8 5 8M9 12h6" />,
};

export function Icon({ name, size = 22, label }: { name: string; size?: number; label?: string }) {
  return (
    <svg class="ico" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round" stroke-linejoin="round" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {P[name] ?? P.stamp}
    </svg>
  );
}
