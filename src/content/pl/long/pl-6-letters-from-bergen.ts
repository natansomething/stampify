import type { Text } from '../../types';
import p01 from './parts/pl-6-letters-from-bergen-01';
import p02 from './parts/pl-6-letters-from-bergen-02';
import p03 from './parts/pl-6-letters-from-bergen-03';
import p04 from './parts/pl-6-letters-from-bergen-04';
import p05 from './parts/pl-6-letters-from-bergen-05';
import p06 from './parts/pl-6-letters-from-bergen-06';
import p07 from './parts/pl-6-letters-from-bergen-07';
import p08 from './parts/pl-6-letters-from-bergen-08';
import p09 from './parts/pl-6-letters-from-bergen-09';
import p10 from './parts/pl-6-letters-from-bergen-10';
import p11 from './parts/pl-6-letters-from-bergen-11';
import p12 from './parts/pl-6-letters-from-bergen-12';
import p13 from './parts/pl-6-letters-from-bergen-13';
import p14 from './parts/pl-6-letters-from-bergen-14';
import p15 from './parts/pl-6-letters-from-bergen-15';

const text: Text = {
  id: 'pl-6-letters-from-bergen',
  lv: 6,
  kind: 'story',
  title: 'Listy z Bergen',
  titleEn: 'Letters from Bergen',
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10, ...p11, ...p12, ...p13, ...p14, ...p15],
  q: [
    { q: 'What did Aunt Irena give Julia when Julia was eight?', o: ['A box of letters', 'A notebook bound in navy-blue cloth', 'A hand-drawn map', 'A red scarf'], a: 1 },
    { q: 'What did the smallest key on the bunch open?', o: ['The cellar', 'The letterbox', 'A locked drawer in the writing desk', 'The door of the tiled stove'], a: 2 },
    { q: 'Why did Irena not join Henryk in Bergen in the spring of 1975?', o: ['She lost her job at the library', 'Her mother had a stroke and needed care', 'Her brother forbade it', 'Henryk married someone else'], a: 1 },
    { q: 'Whose name appeared as the sender on the money orders sent to Tadeusz?', o: ["Irena's", "Henryk's", "Mrs Halina's", "His mother's, Zofia Zawadzka's"], a: 3 },
    { q: "Where were Irena's unsent letters hidden?", o: ['Under the floorboards in the bedroom', 'Behind a loose tile, in a disused chimney cleanout', 'In the atlas', "In Mrs Halina's flat"], a: 1 },
    { q: 'What is Irenaskjæret?', o: ['A bookshop in Bergen', "Henryk's boat", 'A small rock off the Norwegian coast named after Irena', 'A fjord Irena visited'], a: 2 },
    { q: "What did Henryk's ink drawing from October 1979 show?", o: ['The harbour in Bergen', 'The Kraków railway station', 'The lit window of the flat, with a woman in a red scarf', 'Irena and Mrs Halina on the stairs'], a: 2 },
    { q: 'Who lights the stove for the first time, and when?', o: ['Julia, on Christmas Eve', 'Mr Zdzisław, on the last day of the year', 'Her father, when Solveig arrives', 'Mrs Halina, in March'], a: 1 },
  ],
};

export default text;
