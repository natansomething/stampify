import type { Text } from '../../types';
import p01 from './parts/es-5-la-nota-apagada-01';
import p02 from './parts/es-5-la-nota-apagada-02';
import p03 from './parts/es-5-la-nota-apagada-03';
import p04 from './parts/es-5-la-nota-apagada-04';
import p05 from './parts/es-5-la-nota-apagada-05';
import p06 from './parts/es-5-la-nota-apagada-06';
import p07 from './parts/es-5-la-nota-apagada-07';
import p08 from './parts/es-5-la-nota-apagada-08';

const text: Text = {
  id: 'es-5-la-nota-apagada',
  lv: 5,
  kind: 'story',
  title: 'La nota apagada',
  titleEn: 'The Muted Note',
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08],
  q: [
    { q: "Why does Doña Elena call Tomás at the start of the story?", o: ["To sell him her piano", "To have her piano tuned before her 84th birthday party", "To ask him to play at her party", "To value her grandfather's manuscript"], a: 1 },
    { q: "What is the \"Waltz of the Port\"?", o: ["A famous published piece that every Chilean knows", "An unpublished waltz that Elena's grandfather Federico wrote in 1910 for his wife", "A song Don Aurelio learned at sea", "Camila's own composition"], a: 1 },
    { q: "Why does Doña Elena refuse to call the police?", o: ["She suspects the police", "She doesn't want police in her house on her birthday or her grandfather's name in the papers", "The phone isn't working because of the power cut", "Tomás asks her not to"], a: 1 },
    { q: "What did Camila overhear Ignacio saying on the terrace?", o: ["That he would take something to Santiago on Monday for a valuation and his aunt wouldn't notice", "That he wanted to buy the house", "That Rosa was a thief", "That the collector had cancelled the sale"], a: 0 },
    { q: "What detail does Don Aurelio find odd about the blackout?", o: ["Someone opened the front door", "The cat disappeared for an hour", "Rosa put candles in the piano's candle holders, which had only ever been decorative", "Camila was playing the piano in the dark"], a: 2 },
    { q: "What makes Tomás suspect where the score is?", o: ["He finds a piece of paper on the floor", "The A flat in the middle of the piano sounds muted", "The cat sits on the piano", "Rosa tells him at the party"], a: 1 },
    { q: "Why did Rosa hide the score in the piano?", o: ["To sell it herself", "Because Camila asked her to", "To stop Ignacio from taking it to Santiago, after she heard him on the phone", "Because she wanted to ruin the party"], a: 2 },
    { q: "What does Doña Elena decide to do with the waltz?", o: ["Sell it to the collector in Buenos Aires", "Let Camila publish it with her thesis and send a copy to the conservatory, keeping the original in a drawer", "Give the original to Ignacio", "Lock it in the glass case again"], a: 1 },
  ],
};

export default text;
