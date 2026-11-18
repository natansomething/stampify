/**
 * The Tools tab (#/<lang>/tools): things the learner brings their own material to. Each tool has its own page
 * (#/<lang>/tools/<id>) with a way back here.
 */
import type { ComponentChildren } from 'preact';
import type { LangId } from '../content/types';
import { Icon } from '../ui/icons';
import { rememberLang } from './shared';

const TOOLS = [
  {
    id: 'analyse', name: 'Analyse sentences & captions', icon: 'search',
    sub: 'Paste text, open a subtitle file or a screenshot, or read the captions of a video playing on your screen. Tap any word for its meaning.',
  },
  {
    id: 'watch', name: 'Watch', icon: 'video',
    sub: 'Watch a YouTube video or one from your device with tappable subtitles under it. Your videos and where you left off are kept.',
  },
];

export function Tools({ l }: { l: LangId }) {
  rememberLang(l);
  return (
    <div>
      <h1>Tools</h1>
      <p class="muted" style={{ margin: '6px 0 14px' }}>Bring your own texts and videos. Everything stays on this device.</p>
      <div class="tool-list">
        {TOOLS.map((t) => (
          <a key={t.id} class="tool-card" href={`#/${l}/tools/${t.id}`}>
            <Icon name={t.icon} size={28} />
            <div class="grow">
              <b>{t.name}</b>
              <div class="small muted">{t.sub}</div>
            </div>
            <span class="tool-go" aria-hidden="true"><Icon name="back" size={18} /></span>
          </a>
        ))}
      </div>
    </div>
  );
}

/** A tool page's title with a way back to the Tools tab. */
export function ToolHead({ l, children }: { l: LangId; children: ComponentChildren }) {
  return (
    <div class="tool-head">
      <a class="icon-btn plain" href={`#/${l}/tools`} aria-label="Back to the tools"><Icon name="back" /></a>
      <h1>{children}</h1>
    </div>
  );
}
