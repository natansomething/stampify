import type { Text } from '../../types';
import p01 from './parts/fr-5-valise-01';
import p02 from './parts/fr-5-valise-02';
import p03 from './parts/fr-5-valise-03';
import p04 from './parts/fr-5-valise-04';
import p05 from './parts/fr-5-valise-05';
import p06 from './parts/fr-5-valise-06';
import p07 from './parts/fr-5-valise-07';

const text: Text = {
  id: "fr-5-valise",
  lv: 5,
  kind: "story",
  title: "Le Témoin et la Magicienne",
  titleEn: "The Best Man and the Magician",
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07],
  q: [
    { q: "Why is Bastien dreading his sister's wedding?", o: ["He doesn't like Samuel", "As best man he has to give a speech, and he hates speaking in public", "He has forgotten to buy a present", "He is afraid of travelling by train"], a: 1 },
    { q: "Where did Bastien put his speech cards before boarding the train?", o: ["In the inside pocket of the jacket he was wearing", "In the pocket of the suit jacket inside his suitcase", "In his rucksack", "He left them at home"], a: 1 },
    { q: "What does Bastien find when he opens the suitcase at the Domaine des Grands-Prés?", o: ["His grey suit, slightly creased", "A sequinned tailcoat and a magician's props", "Children's toys and a birthday cake", "Hiking boots and a map"], a: 1 },
    { q: "How does Ottilie save the birthday show in Nyon?", o: ["She cancels it and promises to come back", "She turns the mix-up into the story of a sorcerer's spell and ends by reading Bastien's speech", "She borrows props from Léonard's parents", "She asks the children to perform instead"], a: 1 },
    { q: "Why does Mrs Duvoisin take Bastien to the children's marquee?", o: ["Julie asked him to look after the children", "She thinks he is the magician booked for the wedding", "He offers to do card tricks", "His mother sends him there"], a: 1 },
    { q: "Who does Monique Rochat think Ottilie is?", o: ["The wedding photographer", "Samuel's cousin", "Bastien's secret girlfriend", "A guest who has come to the wrong wedding"], a: 2 },
    { q: "What was special about the pack of cards Ottilie gave Bastien for his speech?", o: ["Every card was the queen of hearts", "It had Julie's name written on every card", "It was his grandfather's pack", "The cards had his speech written on them"], a: 0 },
    { q: "According to Ottilie, what is the second half of the secret of magic?", o: ["Practising every trick a thousand times", "Never doing the same trick twice", "Believing in the trick while you are doing it", "Always looking at the empty hand"], a: 2 },
  ],
};

export default text;
