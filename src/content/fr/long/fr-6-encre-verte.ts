import type { Text } from '../../types';
import p01 from './parts/fr-6-encre-verte-01';
import p02 from './parts/fr-6-encre-verte-02';
import p03 from './parts/fr-6-encre-verte-03';
import p04 from './parts/fr-6-encre-verte-04';
import p05 from './parts/fr-6-encre-verte-05';
import p06 from './parts/fr-6-encre-verte-06';
import p07 from './parts/fr-6-encre-verte-07';
import p08 from './parts/fr-6-encre-verte-08';
import p09 from './parts/fr-6-encre-verte-09';
import p10 from './parts/fr-6-encre-verte-10';
import p11 from './parts/fr-6-encre-verte-11';
import p12 from './parts/fr-6-encre-verte-12';
import p13 from './parts/fr-6-encre-verte-13';
import p14 from './parts/fr-6-encre-verte-14';
import p15 from './parts/fr-6-encre-verte-15';

const text: Text = {
  id: "fr-6-encre-verte",
  lv: 6,
  kind: "story",
  title: "L'Encre verte",
  titleEn: "The Green Ink",
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10, ...p11, ...p12, ...p13, ...p14, ...p15],
  q: [
    { q: "What first catches Mathilde's attention in the copy of Sentimental Education from Inès's box?", o: ["A banknote hidden between the pages", "Handwritten notes in green ink in the margins", "A dedication signed by Flaubert", "A missing first chapter"], a: 1 },
    { q: "How had Monsieur Bonnefoy come by his copy of The Red and the Black?", o: ["He bought it at the Puces du Canal", "His daughter gave it to him", "He found it on a bench in the place Sathonay", "He inherited it from a customer"], a: 2 },
    { q: "What does Odette recognise in the margins of the Montaigne?", o: ["A secret code used by booksellers", "Proofreading marks made by a professional hand", "Shorthand notes", "A printer's signature"], a: 1 },
    { q: "What did the notes in The Outsider lead Nadia to do in 1998?", o: ["Open a café", "Go back to school", "Leave Lyon", "Become a writer"], a: 1 },
    { q: "Why did the workers at the Rivaud print works call Lucien \"the Swallow\"?", o: ["He drew swallows on every proof", "He kept a pet bird in his office", "Swallows nested at the works, he recorded their return each spring, and he looked a little like one", "It was the name of his favourite book"], a: 2 },
    { q: "What happens when Mathilde starts reading the boat scene from Flaubert to Lucien?", o: ["He asks her to stop", "He recites the rest of the passage by heart", "He says he has never read the book", "He corrects her pronunciation"], a: 1 },
    { q: "What does Bertrand discover when he finally opens his cupboard?", o: ["That the books are worth a fortune", "That every book his uncle gave him is annotated, some addressed to him", "Letters from Jeanne", "That the books belonged to the print works"], a: 1 },
    { q: "How does the story end?", o: ["Mathilde closes the bookshop and leaves Lyon", "Lucien gives Mathilde his last book", "Mathilde annotates a book herself and leaves it on a bench", "Hugo takes over the bookshop"], a: 2 },
  ],
};

export default text;
