import type { Text } from '../../types';
import p01 from './parts/zh-6-teahouse-01';
import p02 from './parts/zh-6-teahouse-02';
import p03 from './parts/zh-6-teahouse-03';
import p04 from './parts/zh-6-teahouse-04';
import p05 from './parts/zh-6-teahouse-05';
import p06 from './parts/zh-6-teahouse-06';
import p07 from './parts/zh-6-teahouse-07';
import p08 from './parts/zh-6-teahouse-08';
import p09 from './parts/zh-6-teahouse-09';
import p10 from './parts/zh-6-teahouse-10';
import p11 from './parts/zh-6-teahouse-11';
import p12 from './parts/zh-6-teahouse-12';
import p13 from './parts/zh-6-teahouse-13';
import p14 from './parts/zh-6-teahouse-14';
import p15 from './parts/zh-6-teahouse-15';

const text: Text = {
  id: "zh-6-teahouse",
  lv: 6,
  kind: "story",
  title: "柳巷茶馆",
  titleR: "Liǔ Xiàng Cháguǎn",
  titleEn: "The Teahouse in Willow Lane",
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10, ...p11, ...p12, ...p13, ...p14, ...p15],
  q: [
    { q: "Why does Lin Wan's father call her late at night?", o: ["Her grandfather is seriously ill", "The lane is to be demolished and her grandfather refuses to sign", "He wants her to invest in his company", "The teahouse has caught fire"], a: 1 },
    { q: "According to what Grandma told Lin Wan, what do the three parts of the lidded tea bowl stand for?", o: ["Past, present and future", "Grandfather, father and child", "Heaven, people and earth", "Tea, water and fire"], a: 2 },
    { q: "What does Lin Wan find in Grandma's tin box besides the notebook and photos?", o: ["Her father's letters and one sealed, unsent letter from Grandpa", "The deeds to the teahouse", "Money sewn into a coat", "Boss Song's will"], a: 0 },
    { q: "What did Boss Song tell the young apprentice when he wanted to give up?", o: ["That he would be paid more", "That the hand that pours must be steady, and the heart steadier", "That he could go home after one more year", "That nobody pours tea perfectly"], a: 1 },
    { q: "How did Grandma help Lin Wan's father when he left for Shenzhen?", o: ["She bought him a train ticket", "She wrote to his classmate", "She sewed 800 yuan into the lining of a padded coat", "She asked Boss Song to give him a job"], a: 2 },
    { q: "When was Grandpa's letter to his son written?", o: ["The day his son left", "In October 1994, the month Lin Wan was born", "In 2000, after he fainted", "Just before Grandma died"], a: 1 },
    { q: "What happens on the night of the storm?", o: ["The teahouse burns down", "Xiao Yang quits", "The old wiring sparks and Grandpa slips and hurts his ankle", "The signboard falls off"], a: 2 },
    { q: "What does Lin Wan write about Grandpa in her new notebook at the end?", o: ["That he must take his pills", "That he takes back his chess moves", "That when he says 'not bad' he means 'very good'", "That he prefers tuocha"], a: 2 },
  ],
};

export default text;
