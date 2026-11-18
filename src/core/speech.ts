/**
 * All audio goes through speak(). Today it uses the browser's speech synthesis; recorded audio can be added
 * here later (look up a file for the text first, fall back to synthesis) without touching any game.
 */
import { useEffect, useState } from 'preact/hooks';
import type { LangId } from '../content/types';
import { LANGS } from './langs';
import { state } from './store';

const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
let voices: SpeechSynthesisVoice[] = [];
const voiceListeners = new Set<() => void>();

function loadVoices() {
  voices = synth?.getVoices() || [];
  voiceListeners.forEach((l) => l());
}
if (synth) {
  loadVoices();
  synth.addEventListener?.('voiceschanged', loadVoices);
}

export function voicesFor(l: LangId): SpeechSynthesisVoice[] {
  const tag = LANGS[l].tts.toLowerCase();
  const base = tag.split('-')[0];
  const match = voices.filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith(base));
  // Exact region first (zh-CN before zh-TW), then the rest
  return match.sort((a, b) => +b.lang.toLowerCase().startsWith(tag) - +a.lang.toLowerCase().startsWith(tag));
}

export function hasVoice(l: LangId): boolean {
  return voicesFor(l).length > 0;
}

/** Re-render when the voice list arrives (it loads asynchronously in Chrome). */
export function useVoices(l: LangId): SpeechSynthesisVoice[] {
  const [, set] = useState(0);
  useEffect(() => {
    const f = () => set((n) => n + 1);
    voiceListeners.add(f);
    return () => { voiceListeners.delete(f); };
  }, []);
  return voicesFor(l);
}

export function speak(l: LangId, text: string, opts: { rate?: number; onend?: () => void } = {}) {
  if (!synth || !text) { opts.onend?.(); return; }
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = LANGS[l].tts;
  const chosen = state.settings.voice[l];
  const v = voicesFor(l).find((x) => x.voiceURI === chosen) || voicesFor(l)[0];
  if (v) u.voice = v;
  u.rate = (opts.rate ?? 1) * state.settings.rate;
  if (opts.onend) { u.onend = opts.onend; u.onerror = opts.onend; }
  synth.speak(u);
}

/** Speaks only when "Autoplay pronunciation" is on (automatic audio; buttons always use speak). */
export function autoSpeak(l: LangId, text: string) {
  if (state.settings.autoplay) speak(l, text);
}

export function stopSpeech() {
  synth?.cancel();
}
