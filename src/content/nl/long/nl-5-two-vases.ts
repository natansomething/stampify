import type { Text } from '../../types';
import p01 from './parts/nl-5-two-vases-01';
import p02 from './parts/nl-5-two-vases-02';
import p03 from './parts/nl-5-two-vases-03';
import p04 from './parts/nl-5-two-vases-04';
import p05 from './parts/nl-5-two-vases-05';
import p06 from './parts/nl-5-two-vases-06';
import p07 from './parts/nl-5-two-vases-07';

const text: Text = {
  id: "nl-5-two-vases", lv: 5, kind: "story", title: "Twee blauwe vazen", titleEn: "Two Blue Vases",
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07],
  q: [
    { q: "Why does Joris have to carry the valuable vase on his cargo bike?", o: ["Mrs Sterk does not trust taxis", "Something is wrong with the clutch of the car", "The photographer lives on a street closed to cars", "He wants to save money"], a: 1 },
    { q: "What happens on the little bridge?", o: ["A delivery van makes Joris brake hard and both boxes fall out", "Joris drops one box into the canal", "A tourist bumps into his bike and breaks a spout", "The tarpaulin blows away with Lotte's box"], a: 0 },
    { q: "How does Mrs Sterk discover the mix-up?", o: ["Bram calls her about the glaze", "She finds a shop sticker with a price on the bottom of the vase", "Lotte tells her the Belgians have the real vase", "The vase in the catalogue photo looks smaller"], a: 1 },
    { q: "Where is the vase when Joris finally finds Wim and Greet?", o: ["In their suitcase at the hotel", "On the canal boat", "With their niece Fien, who got it for her birthday", "Already on the train to Ghent"], a: 2 },
    { q: "Why did Fien want to get rid of the vase?", o: ["She thought it was ugly and broken", "Her aunt gives her one every year and she already had three", "Her housemates needed money for the party", "She was allergic to tulips"], a: 1 },
    { q: "What story does Mrs Sterk tell Joris after his confession?", o: ["How she once broke a Ming bowl", "How she once left a Frisian tail clock on the train and got it back three days later", "How her father fired an assistant for a similar mistake", "How she bought her first vase in a second-hand shop"], a: 1 },
    { q: "Which is one of Haverkamp's conditions?", o: ["That he can keep the vase for three euros fifty", "That his name is left out of the catalogue", "That he gets the souvenir copy that appeared in the catalogue", "That Joris loses his job"], a: 2 },
    { q: "How does the auction end?", o: ["The museum on the phone buys the vase", "Haverkamp buys it for fifty-two thousand euros", "Mrs Sterk withdraws the lot", "Nobody bids above thirty thousand"], a: 1 },
  ],
};

export default text;
