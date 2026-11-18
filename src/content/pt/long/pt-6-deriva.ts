import type { Text } from '../../types';
import p01 from './parts/pt-6-deriva-01';
import p02 from './parts/pt-6-deriva-02';
import p03 from './parts/pt-6-deriva-03';
import p04 from './parts/pt-6-deriva-04';

const text: Text = {
  id: 'pt-6-deriva',
  lv: 6,
  kind: 'article',
  title: 'O quebra-cabeça do Atlântico',
  titleEn: 'The Atlantic Jigsaw',
  s: [...p01, ...p02, ...p03, ...p04],
  q: [
    { q: 'Why, according to the author, is the fit of the coastlines alone not proof of anything?', o: ['Because the maps of the sixteenth century were inaccurate', 'Because a coincidence of shapes says nothing by itself, and coastlines change over time', 'Because Africa and South America were never joined', 'Because Ortelius had already disproved it'], a: 1 },
    { q: 'What did the 1965 computer study use as the reference line for fitting the continents?', o: ['The present-day beaches', 'The mouths of the great rivers', 'A line at about a thousand metres depth, at the edge of the continental shelf', 'The Mid-Atlantic Ridge'], a: 2 },
    { q: 'Why is Mesosaurus important evidence for continental drift?', o: ['It was a large reptile that could swim across oceans', 'Its fossils appear only in Brazil and southern Africa, and it could not have crossed an ocean', 'It is found on every continent', 'It lived in glaciers near the equator'], a: 1 },
    { q: 'What was the main scientific objection to Wegener\'s theory?', o: ['There was no fossil evidence', 'He could not explain what force moved the continents', 'His maps of the coastlines were wrong', 'He was a geologist working outside his field'], a: 1 },
    { q: 'How did Wegener die?', o: ['In a shipwreck in the Atlantic', 'On the Greenland ice during an expedition in 1930', 'Of old age in Berlin', 'In an accident at a conference in New York'], a: 1 },
    { q: 'What did the magnetic "zebra stripes" on the ocean floor show?', o: ['That the continents plough through the ocean floor', 'That the Earth\'s magnetic field never changes', 'That new crust forms at the ridge and spreads out symmetrically on both sides', 'That land bridges once linked the continents'], a: 2 },
    { q: 'Why does Brazil have almost no strong earthquakes or volcanoes?', o: ['Because it lies in the middle of the South American plate, far from its edges', 'Because the Atlantic is closing', 'Because its rocks are too old', 'Because it lies on the Mid-Atlantic Ridge'], a: 0 },
    { q: 'What lesson does the author draw from the episode?', o: ['Experts are always wrong about new ideas', 'Outsiders should not propose scientific theories', 'Science advances when the right questions meet the tools able to answer them', 'Visual evidence is all a theory needs'], a: 2 },
  ],
};

export default text;
