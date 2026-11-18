/** Minimal toast messages, rendered by <Toasts/> in the app shell. */
export interface ToastAction { label: string; run: () => void }
export interface ToastMsg { id: number; text: string; kind: 'info' | 'goal' | 'error'; action?: ToastAction }

let next = 1;
let items: ToastMsg[] = [];
const subs = new Set<(t: ToastMsg[]) => void>();
const emit = () => subs.forEach((s) => s(items));

export function dismiss(id: number) {
  items = items.filter((x) => x.id !== id);
  emit();
}

/** Shows a message; with an action (e.g. Undo) it stays longer and has a button. */
export function toast(text: string, kind: ToastMsg['kind'] = 'info', action?: ToastAction) {
  const t: ToastMsg = { id: next++, text, kind, action };
  // Only one undo offer at a time: a newer action replaces the older one
  if (action) items = items.filter((x) => !x.action);
  items = [...items, t];
  emit();
  setTimeout(() => dismiss(t.id), action ? 7000 : kind === 'goal' ? 4000 : 2600);
}

export function onToasts(f: (t: ToastMsg[]) => void) {
  subs.add(f);
  return () => { subs.delete(f); };
}
