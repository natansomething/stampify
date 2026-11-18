import type { Text } from '../../types';
import p01 from './parts/pt-6-discos-mare-01';
import p02 from './parts/pt-6-discos-mare-02';
import p03 from './parts/pt-6-discos-mare-03';
import p04 from './parts/pt-6-discos-mare-04';
import p05 from './parts/pt-6-discos-mare-05';
import p06 from './parts/pt-6-discos-mare-06';
import p07 from './parts/pt-6-discos-mare-07';
import p08 from './parts/pt-6-discos-mare-08';
import p09 from './parts/pt-6-discos-mare-09';
import p10 from './parts/pt-6-discos-mare-10';
import p11 from './parts/pt-6-discos-mare-11';
import p12 from './parts/pt-6-discos-mare-12';
import p13 from './parts/pt-6-discos-mare-13';
import p14 from './parts/pt-6-discos-mare-14';
import p15 from './parts/pt-6-discos-mare-15';

const text: Text = {
  id: 'pt-6-discos-mare',
  lv: 6,
  kind: 'story',
  title: 'Discos Maré',
  titleEn: 'The Maré Record Shop',
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10, ...p11, ...p12, ...p13, ...p14, ...p15, ],
  q: [
    { q: 'What does Helena do for a living in São Paulo at the start of the story?', o: ['She teaches at a conservatoire', 'She plays keyboards on jingles and other people\'s recordings', 'She sells second-hand records', 'She works as a sound engineer'], a: 1 },
    { q: 'How does Cecília react when Helena tells her about the inheritance?', o: ['She is delighted and wants to visit Salvador', 'She tells Helena to sell quickly and not get involved', 'She offers to help run the shop', 'She says she already knew about the will'], a: 1 },
    { q: 'What is written on the label of the tape Helena finds in the little room?', o: ['"Things that didn\'t work out"', '"For Lena — March 1989"', '"Maré Alta — side A"', '"Dona Zezé, 91"'], a: 1 },
    { q: 'How did Helena\'s uncle pay for the piano he sent her when she was twelve?', o: ['He took out a loan for a new roof', 'He sold his collection of Tropicália first editions', 'He sold the Maré Alta test pressing', 'Nalva lent him the money'], a: 1 },
    { q: 'Where does the name of the shop come from?', o: ['From the tide in the Bay of All Saints', 'From a song by Dona Zezé', 'From the band Dorival played in before leaving São Paulo', 'From the street the shop is on'], a: 2 },
    { q: 'What surprises Helena at the March jam session?', o: ['Nobody turns up', 'The whole shop knows and sings her uncle\'s song for her', 'Fábio Linhares plays the clarinet', 'Her mother arrives unannounced'], a: 1 },
    { q: 'Why had Dorival missed his mother\'s funeral?', o: ['He refused to go because of a quarrel with his father', 'He was on tour with his band', 'The telegram sat in a boarding-house drawer while he was recording in Sergipe', 'He was in hospital'], a: 2 },
    { q: 'How does Helena end "Maré de março" at the final jam session?', o: ['On E major, as her uncle always did', 'She stops in the middle of the chorus', 'She lets the chord resolve to C for the first time', 'Her mother plays the last chord'], a: 2 },
  ],
};

export default text;
