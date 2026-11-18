import type { Text } from '../../types';
import p01 from './parts/ru-5-wrong-sokolov-01';
import p02 from './parts/ru-5-wrong-sokolov-02';
import p03 from './parts/ru-5-wrong-sokolov-03';
import p04 from './parts/ru-5-wrong-sokolov-04';
import p05 from './parts/ru-5-wrong-sokolov-05';
import p06 from './parts/ru-5-wrong-sokolov-06';
import p07 from './parts/ru-5-wrong-sokolov-07';
import p08 from './parts/ru-5-wrong-sokolov-08';

const text: Text = {
  id: "ru-5-wrong-sokolov", lv: 5, kind: "story", title: "Не тот Соколов", titleEn: "The Wrong Sokolov",
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08],
  q: [
    { q: "What does Gleb Sokolov do for a living?", o: ["He writes crime novels", "He tunes pianos", "He teaches music", "He works at the post office"], a: 1 },
    { q: "What does Gleb think the publishing house wants from him at first?", o: ["A new novel", "An interview", "To have their piano tuned", "To buy his grandfather's piano"], a: 2 },
    { q: "What does Tamara Ilyinichna advise Gleb to do at the first meetings?", o: ["Tell the truth at once", "Talk as much as possible", "Say little and prepare them carefully for the truth", "Leave the city for a while"], a: 2 },
    { q: "How did Varya find Gleb?", o: ["Through the phone book", "From his advert on the notice board by the post office", "Through Tamara Ilyinichna", "From an article in City magazine"], a: 1 },
    { q: "Why does Varya feel grateful to the author of the Krylov novels?", o: ["The books got her a job", "Her grandmother loved them when she was very ill", "The author helped her study", "The author once replied to her letter"], a: 1 },
    { q: "Who answers the pharmacist's question about the poison on the boat?", o: ["Gleb", "Varya", "Tamara Ilyinichna from the back row", "Arkady Semyonovich"], a: 2 },
    { q: "Why did Tamara Ilyinichna choose the name \"G. Sokolov\"?", o: ["It was her late husband's name", "She saw Gleb's advert every day and it sounded reliable", "The publisher suggested it", "It was the name of her favourite teacher"], a: 1 },
    { q: "Who becomes Inspector Krylov's assistant in the new novel?", o: ["A retired chemistry teacher", "A young editor", "A young piano tuner who cannot lie", "A ginger cat"], a: 2 },
  ],
};

export default text;
