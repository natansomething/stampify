import type { Text } from '../../types';
import p01 from './parts/ja-6-summer-bread-01';
import p02 from './parts/ja-6-summer-bread-02';
import p03 from './parts/ja-6-summer-bread-03';
import p04 from './parts/ja-6-summer-bread-04';
import p05 from './parts/ja-6-summer-bread-05';
import p06 from './parts/ja-6-summer-bread-06';
import p07 from './parts/ja-6-summer-bread-07';
import p08 from './parts/ja-6-summer-bread-08';
import p09 from './parts/ja-6-summer-bread-09';
import p10 from './parts/ja-6-summer-bread-10';
import p11 from './parts/ja-6-summer-bread-11';
import p12 from './parts/ja-6-summer-bread-12';
import p13 from './parts/ja-6-summer-bread-13';
import p14 from './parts/ja-6-summer-bread-14';
import p15 from './parts/ja-6-summer-bread-15';

const text: Text = {
  id: 'ja-6-summer-bread',
  lv: 6,
  kind: 'story',
  title: '夏みかんのパン',
  titleR: 'なつみかんのぱん',
  titleEn: 'The Summer Orange Bread',
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10, ...p11, ...p12, ...p13, ...p14, ...p15],
  q: [
    { q: "What does Haruka decide to do with her paid leave?", o: ["Travel abroad", "Look after her grandmother's bakery for the summer", "Look for a new job", "Rest at her mother's house"], a: 1 },
    { q: "Why did Haruka's first loaves fail?", o: ["The oven was broken", "She used the winter quantities in a hot workroom", "The flour was old", "She forgot the yeast"], a: 1 },
    { q: "Why do the croquette rolls still cost 300 yen?", o: ["The ingredients are cheap", "So children can buy one with three 100-yen coins", "Mr. Okamoto set the price", "They are smaller than before"], a: 1 },
    { q: "What was wrong with the oven that Wataru fixed?", o: ["The door would not close", "The lower burner was clogged with flour", "The thermometer was broken", "The gas had been cut off"], a: 1 },
    { q: "Who first created the summer orange bread?", o: ["Haruka's grandmother", "Haruka's grandfather, Osamu", "Mr. Okamoto", "Wataru's aunt"], a: 1 },
    { q: "Why had Chiyo never written the recipe down?", o: ["She had forgotten it", "It was a secret from her customers", "She felt writing it down would end making it together with Osamu", "She had no time"], a: 2 },
    { q: "What gives the bread its 'smell of the sea'?", o: ["Seaweed in the dough", "Sumiko's local salt, including a pinch on top", "Fish stock", "Baking it near the harbor"], a: 1 },
    { q: "How does the story end?", o: ["Haruka quits her job and stays", "Haruka goes back to Tokyo, promising to return in spring", "The bakery closes for good", "Chiyo moves to Tokyo"], a: 1 },
  ],
};

export default text;
