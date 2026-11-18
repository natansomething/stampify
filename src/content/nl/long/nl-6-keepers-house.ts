import type { Text } from '../../types';
import p01 from './parts/nl-6-keepers-house-01';
import p02 from './parts/nl-6-keepers-house-02';
import p03 from './parts/nl-6-keepers-house-03';
import p04 from './parts/nl-6-keepers-house-04';
import p05 from './parts/nl-6-keepers-house-05';
import p06 from './parts/nl-6-keepers-house-06';
import p07 from './parts/nl-6-keepers-house-07';
import p08 from './parts/nl-6-keepers-house-08';
import p09 from './parts/nl-6-keepers-house-09';
import p10 from './parts/nl-6-keepers-house-10';
import p11 from './parts/nl-6-keepers-house-11';
import p12 from './parts/nl-6-keepers-house-12';
import p13 from './parts/nl-6-keepers-house-13';
import p14 from './parts/nl-6-keepers-house-14';
import p15 from './parts/nl-6-keepers-house-15';

const text: Text = {
  id: "nl-6-keepers-house", lv: 6, kind: "story", title: "Het huis van de lichtwachter", titleEn: "The Lighthouse Keeper's House",
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10, ...p11, ...p12, ...p13, ...p14, ...p15],
  q: [
    { q: "Why did Eva take the job on Terschelling?", o: ["She was sent there by her firm to design a hotel", "She was on sick leave after breaking down during a presentation, and an advertisement made her laugh", "She had inherited the keeper's house from a relative", "She wanted to write a book about lighthouses"], a: 1 },
    { q: "What do some islanders call the keeper's house?", o: ["The house of the drowned sailors", "The house of the false light", "The house at the end of the world", "The cranberry house"], a: 1 },
    { q: "What did Tine's father always say about the north wall?", o: ["That it was the oldest part of the island", "That the wall keeps its mouth shut", "That it had to be rebuilt every winter", "That a treasure lay buried beneath it"], a: 1 },
    { q: "What does Ruben want from Eva when he calls?", o: ["That she sells her share of the firm", "That she comes back to work on an architecture competition", "That she designs a holiday home for him on the island", "That she apologises to the clients"], a: 1 },
    { q: "What was found behind the north wall after the storm?", o: ["A bricked-up box bed with a tin box holding a logbook and a letter", "Gold coins from the shipwreck", "The ship's bell of the Elisabeth", "A second staircase to the attic"], a: 0 },
    { q: "Why had Hendrik Kooiman kept the truth to himself?", o: ["He had been paid by the islanders to keep quiet", "Admitting that the light had gone out would have cost him his job", "He could not write and nobody could read his logbook", "He wanted to protect his son, who had caused the wreck"], a: 1 },
    { q: "How does Eva's story with her firm end?", o: ["She returns to Amsterdam to lead the competition", "She leaves the firm and goes back to the island with a return ticket", "She sells the keeper's house to Ruben", "She becomes the new lighthouse keeper"], a: 1 },
  ],
};

export default text;
