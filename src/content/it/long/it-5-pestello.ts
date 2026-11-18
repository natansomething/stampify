import type { Text } from '../../types';
import p01 from './parts/it-5-pestello-01';
import p02 from './parts/it-5-pestello-02';
import p03 from './parts/it-5-pestello-03';
import p04 from './parts/it-5-pestello-04';
import p05 from './parts/it-5-pestello-05';
import p06 from './parts/it-5-pestello-06';
import p07 from './parts/it-5-pestello-07';

const text: Text = {
  id: "it-5-pestello",
  lv: 5,
  kind: "story",
  title: "Il pestello scomparso",
  titleEn: "The Missing Pestle",
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07],
  q: [
    { q: "What does Tommaso usually write about for the Corriere del Levante?", o: ["Food and restaurants", "Traffic and weather", "Football", "Local politics"], a: 1 },
    { q: "Why does Amedeo call his pestle \"the Great-Grandmother\"?", o: ["It was a gift from Gino", "It belonged to his grandmother Caterina", "He bought it at an antiques market", "It is the oldest pestle in the championship"], a: 1 },
    { q: "Why does Amedeo suspect Gino Ratto?", o: ["Gino visited him the evening before the pestle vanished", "Gino was seen running from the house", "Gino has a key to the house", "Gino said he would steal it"], a: 0 },
    { q: "What does Gino's newspaper parcel actually contain?", o: ["The Great-Grandmother", "A bottle of wine", "A brand-new spare boxwood pestle", "A focaccia"], a: 2 },
    { q: "Why did Pietro think he had permission to take the pestle?", o: ["His mother had said yes", "Grandpa misheard \"pestello\" as \"pesto\" and said yes", "The teacher had phoned Grandpa", "He found a note on the table"], a: 1 },
    { q: "How does Tommaso persuade Dr Ferretti to release the pestle?", o: ["He gets the teacher's signature", "He pays a deposit", "He offers good publicity in his article", "He shows a police report"], a: 2 },
    { q: "Why does Amedeo finish the final with Gino's pestle?", o: ["The rules forbid changing tools during the contest", "The Great-Grandmother is broken", "Pietro refuses to hand it over", "He prefers boxwood"], a: 0 },
    { q: "Who pays for the dinner at the end, and why?", o: ["Tommaso, to thank everyone", "Amedeo, because he won", "Gino, because he lost the bet by finishing behind Amedeo", "The jury, as a prize"], a: 2 },
  ],
};

export default text;
