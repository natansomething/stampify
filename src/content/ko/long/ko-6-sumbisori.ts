import type { Text } from '../../types';
import p01 from './parts/ko-6-sumbisori-01';
import p02 from './parts/ko-6-sumbisori-02';
import p03 from './parts/ko-6-sumbisori-03';
import p04 from './parts/ko-6-sumbisori-04';
import p05 from './parts/ko-6-sumbisori-05';
import p06 from './parts/ko-6-sumbisori-06';
import p07 from './parts/ko-6-sumbisori-07';
import p08 from './parts/ko-6-sumbisori-08';
import p09 from './parts/ko-6-sumbisori-09';
import p10 from './parts/ko-6-sumbisori-10';
import p11 from './parts/ko-6-sumbisori-11';
import p12 from './parts/ko-6-sumbisori-12';
import p13 from './parts/ko-6-sumbisori-13';
import p14 from './parts/ko-6-sumbisori-14';
import p15 from './parts/ko-6-sumbisori-15';

const text: Text = {
  id: 'ko-6-sumbisori',
  lv: 6,
  kind: 'story',
  title: '숨비소리',
  titleR: 'Sumbisori',
  titleEn: 'The Diver\'s Breath',
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10, ...p11, ...p12, ...p13, ...p14, ...p15],
  q: [
    { q: 'Why did the narrator\'s webtoon end?', o: ['She fell ill', 'The platform ended it early because of falling rankings', 'She finished the story she had planned', 'Her editor left the company'], a: 1 },
    { q: 'What does the narrator find on Grandmother\'s fridge door?', o: ['A photo of her mother', 'A tide timetable', 'A crayon drawing she made at seven of her grandmother as a diver', 'A letter from Seoul'], a: 2 },
    { q: 'What do the older haenyeo warn against with the word "mulsum"?', o: ['Diving in winter', 'Being greedy and staying under too long', 'Diving alone at night', 'Selling the catch too cheaply'], a: 1 },
    { q: 'What is the sumbisori?', o: ['A haenyeo work song', 'The whistling sound haenyeo make when they surface and release their breath', 'The name of the stone shelter', 'A signal to end the day\'s diving'], a: 1 },
    { q: 'Why did Grandmother keep her daughter away from the sea?', o: ['She wanted her to run the family shop', 'Her friend Yeongja was lost at sea, and she feared the same for her daughter', 'The village did not allow young girls to dive', 'Her daughter could not swim'], a: 1 },
    { q: 'Why does the narrator put the turban shell back after her first dive?', o: ['It was too small to eat', 'Grandmother told her it was bad luck', 'Only the village haenyeo may take things from the village sea', 'She dropped it by accident'], a: 2 },
    { q: 'Why is Grandmother moved by her daughter\'s sumbisori?', o: ['It sounds like Yeongja\'s, who secretly taught it to her', 'It is the first one she has ever heard', 'It is louder than any haenyeo\'s', 'It sounds exactly like her own'], a: 0 },
    { q: 'What does the narrator ask her editor for when the series is accepted?', o: ['A higher fee', 'To publish under a pen name', 'One episode every two weeks instead of every week', 'To start serializing immediately'], a: 2 },
  ],
};

export default text;
