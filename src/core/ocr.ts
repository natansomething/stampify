/**
 * Text recognition (OCR) on the device, with tesseract.js. The program and the language data are downloaded once from
 * jsDelivr, then cached by the browser. Used by Find words for pasted screenshots and live screen reading.
 */
import type { LangId } from '../content/types';
import { LANGS } from './langs';

type Worker = import('tesseract.js').Worker;

/** Tesseract's language data names. */
const OCR_LANG: Record<LangId, string> = {
  de: 'deu', zh: 'chi_sim', es: 'spa', fr: 'fra', it: 'ita', pt: 'por', nl: 'nld', pl: 'pol', ru: 'rus', ja: 'jpn', ko: 'kor', hu: 'hun',
};

const SCRIPT = '[\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}]';
const CJK_GAP = new RegExp(`(?<=${SCRIPT})[ \\t]+(?=${SCRIPT})`, 'gu');

/** Cleans what OCR returns: Chinese and Japanese come back with spaces between the characters. */
function tidy(l: LangId, text: string): string {
  const t = LANGS[l].cjk && l !== 'ko' ? text.replace(CJK_GAP, '') : text;
  return t.split('\n').map((x) => x.trim()).filter(Boolean).join('\n');
}

export interface OcrResult { text: string; confidence: number }

/**
 * A recogniser kept ready for repeated reads (live screen reading); `close` frees it.
 * `line`: every image is one line of text (subtitle lines cut out by extractSubtitles), read as such.
 */
export async function ocrSession(l: LangId, progress?: (p: number) => void, line = false): Promise<{
  read: (image: HTMLCanvasElement | Blob) => Promise<OcrResult>;
  close: () => Promise<void>;
}> {
  const { createWorker, PSM } = await import('tesseract.js');
  const worker: Worker = await createWorker(OCR_LANG[l], undefined, {
    logger: (m: { status: string; progress: number }) => { if (m.status === 'recognizing text') progress?.(m.progress); },
  });
  if (line) await worker.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_LINE });
  return {
    read: async (image) => {
      const { data } = await worker.recognize(image);
      return { text: tidy(l, data.text), confidence: data.confidence };
    },
    close: () => worker.terminate().then(() => {}),
  };
}

/** Reads the text in one image. */
export async function readImage(l: LangId, image: Blob, progress: (p: number) => void): Promise<string> {
  const s = await ocrSession(l, progress);
  try {
    return (await s.read(image)).text;
  } finally {
    await s.close();
  }
}
