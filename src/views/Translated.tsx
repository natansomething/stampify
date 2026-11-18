/** Machine translations by the browser's own translator (core/translate.ts), for the floating window and the reader. */
import { useEffect, useState } from 'preact/hooks';
import type { LangId } from '../content/types';
import { canTranslate, startTranslator, translate, translatorReady, type TranslatorState } from '../core/translate';
import { Icon } from '../ui/icons';

/** A machine translation (the browser's built-in translator), shown when it arrives. */
export function Translated({ l, text, class: c }: { l: LangId; text: string; class: string }) {
  const [en, setEn] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    setEn(null);
    translate(l, text)?.then((t) => { if (live) setEn(t); }).catch(() => {});
    return () => { live = false; };
  }, [l, text]);
  return <span class={c} lang="en">{en ?? '…'}</span>;
}

/**
 * A word Stampify's word list doesn't have: its machine translation by the browser's own translator, or a button to
 * start the translator (downloading a language model needs a click). Nothing where the browser has none.
 */
export function WordTranslation({ l, word }: { l: LangId; word: string }) {
  const [st, setSt] = useState<TranslatorState | 'starting' | null>(translatorReady(l) ? 'ready' : null);
  useEffect(() => {
    if (!canTranslate() || translatorReady(l)) return;
    startTranslator(l).then(setSt);
  }, [l]);
  if (!canTranslate() || st === 'unavailable' || st === null) return null;
  if (st === 'ready') return <div class="small"><span class="muted">Machine translation: </span><Translated l={l} text={word} class="" /></div>;
  return (
    <button class="btn sm ghost" disabled={st === 'starting'} onClick={async (e) => {
      setSt('starting');
      setSt(await startTranslator(l, { win: (e.currentTarget as Element).ownerDocument.defaultView, clicked: true }));
    }}><Icon name="translate" size={14} />{st === 'starting' ? 'Getting the translator ready…' : 'Translate on this device'}</button>
  );
}

