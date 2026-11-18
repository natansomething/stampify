import type { Text } from '../../types';
import p01 from './parts/zh-5-piano-island-01';
import p02 from './parts/zh-5-piano-island-02';
import p03 from './parts/zh-5-piano-island-03';
import p04 from './parts/zh-5-piano-island-04';
import p05 from './parts/zh-5-piano-island-05';
import p06 from './parts/zh-5-piano-island-06';
import p07 from './parts/zh-5-piano-island-07';
import p08 from './parts/zh-5-piano-island-08';

const text: Text = {
  id: "zh-5-piano-island",
  lv: 5,
  kind: "story",
  title: "鼓浪屿的夜半琴声",
  titleR: "Gǔlàngyǔ de yèbàn qínshēng",
  titleEn: "Midnight Piano on Gulangyu",
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08],
  q: [
    { q: "Why did Xiaoyu come to Gulangyu?", o: ["She was on holiday with friends", "Her aunt asked her to run the guesthouse while she was in Canada", "She had a new job at a music school", "She wanted to buy a piano"], a: 1 },
    { q: "What was unusual about the night-time melody?", o: ["It was always a different song", "It always stopped at the same place", "It was played on a guitar", "It started at midnight"], a: 1 },
    { q: "What did Big Liu's camera record on the third night?", o: ["A boy climbing through the window", "Mr Chen playing the piano", "The black cat walking on the keys, before the battery died", "Nothing, because it was raining"], a: 2 },
    { q: "What was written at the top of the paper found behind the piano?", o: ["Please do not play", "A Song for Grandma", "Saturday concert", "Happy birthday, Ajie"], a: 1 },
    { q: "Why did Ajie play the piano at night?", o: ["He wanted to scare the guests", "He was writing a song for his grandmother's eightieth birthday and had no piano at home", "His teacher told him to practise there", "He was paid by Big Liu"], a: 1 },
    { q: "What did Xiaoyu's aunt reveal about the piano?", o: ["It came from Canada", "It had belonged to Grandma Lin's family", "It was a gift from Mr Chen", "It had been bought last year"], a: 1 },
    { q: "What was stopping the high key from coming back up?", o: ["Sand from the beach", "A pencil eraser", "An old red hairclip", "A folded music sheet"], a: 2 },
    { q: "How does the story end?", o: ["The piano is sold", "Mr Chen stays longer to teach Ajie, and the piano is played again every afternoon", "Xiaoyu returns to Hangzhou the next day", "Big Liu finds a real ghost"], a: 1 }
  ]
,
};

export default text;
