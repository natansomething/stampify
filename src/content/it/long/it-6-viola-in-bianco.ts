import type { Text } from '../../types';
import p01 from './parts/it-6-viola-in-bianco-01';
import p02 from './parts/it-6-viola-in-bianco-02';
import p03 from './parts/it-6-viola-in-bianco-03';
import p04 from './parts/it-6-viola-in-bianco-04';
import p05 from './parts/it-6-viola-in-bianco-05';
import p06 from './parts/it-6-viola-in-bianco-06';
import p07 from './parts/it-6-viola-in-bianco-07';
import p08 from './parts/it-6-viola-in-bianco-08';
import p09 from './parts/it-6-viola-in-bianco-09';
import p10 from './parts/it-6-viola-in-bianco-10';
import p11 from './parts/it-6-viola-in-bianco-11';
import p12 from './parts/it-6-viola-in-bianco-12';
import p13 from './parts/it-6-viola-in-bianco-13';
import p14 from './parts/it-6-viola-in-bianco-14';
import p15 from './parts/it-6-viola-in-bianco-15';

const text: Text = {
  id: "it-6-viola-in-bianco",
  lv: 6,
  kind: "story",
  title: "La viola in bianco",
  titleEn: "The Unvarnished Viola",
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10, ...p11, ...p12, ...p13, ...p14, ...p15],
  q: [
    { q: "What does the master ask Ingrid to do on her first evening in the workshop?", o: ["Carve a scroll", "Sharpen a gouge until it can shave a hair", "Play the cello for him", "Sweep the floor and light the stove"], a: 1 },
    { q: "Where does Ingrid find the unfinished viola?", o: ["In the shop window", "In the master's flat", "Behind a box of clamps on the highest shelf", "In Gilda's back room"], a: 2 },
    { q: "Why, according to the master, did he never finish the viola?", o: ["Because the wood had cracked", "Because finishing it would have meant leaving for Vienna, or admitting he never would", "Because Lidia asked him to stop", "Because his hands had started to tremble"], a: 1 },
    { q: "What does Matteo Rinaldi want when he first visits the workshop?", o: ["To become an apprentice again", "To buy the moulds, templates and drawings of the Bassi workshop", "To sell the master a machine", "To apologise for taking a box of bridges"], a: 1 },
    { q: "What do Ingrid and the master find when they take the top off the viola?", o: ["A second label with a different date", "A letter hidden in the body", "A pencil inscription by Lidia on the inside of the top", "A crack in the bass bar"], a: 2 },
    { q: "How does Ingrid get Lidia's address?", o: ["From the orchestra's website", "From Matteo", "From a Christmas card that Lidia sends Gilda every year", "From the master's old letters"], a: 2 },
    { q: "What does the master leave on Ingrid's workbench at the end of the story?", o: ["His father's notebook of varnish recipes", "Two boards of spruce from the Val di Fiemme, seasoned since 1985", "The finished viola", "The photograph of Lidia on the embankment"], a: 1 },
  ],
};

export default text;
