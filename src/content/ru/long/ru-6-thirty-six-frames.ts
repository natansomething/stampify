import type { Text } from '../../types';
import p01 from './parts/ru-6-thirty-six-frames-01';
import p02 from './parts/ru-6-thirty-six-frames-02';
import p03 from './parts/ru-6-thirty-six-frames-03';
import p04 from './parts/ru-6-thirty-six-frames-04';
import p05 from './parts/ru-6-thirty-six-frames-05';
import p06 from './parts/ru-6-thirty-six-frames-06';
import p07 from './parts/ru-6-thirty-six-frames-07';
import p08 from './parts/ru-6-thirty-six-frames-08';
import p09 from './parts/ru-6-thirty-six-frames-09';
import p10 from './parts/ru-6-thirty-six-frames-10';
import p11 from './parts/ru-6-thirty-six-frames-11';
import p12 from './parts/ru-6-thirty-six-frames-12';
import p13 from './parts/ru-6-thirty-six-frames-13';
import p14 from './parts/ru-6-thirty-six-frames-14';
import p15 from './parts/ru-6-thirty-six-frames-15';

const text: Text = {
  id: "ru-6-thirty-six-frames", lv: 6, kind: "story", title: "Тридцать шесть кадров", titleEn: "Thirty-Six Frames",
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10, ...p11, ...p12, ...p13, ...p14, ...p15],
  q: [
    { q: "What is written on the back of the photograph Vera finds in her grandfather's box?", o: ["An address in Vladivostok", "A place, a date and a promise to send it", "Her grandfather's name", "Nothing at all"], a: 1 },
    { q: "Why does Vera take so few pictures with the Zenit?", o: ["The camera is broken", "She has only one roll of 36 frames", "Photography is forbidden on the train", "She prefers her phone"], a: 1 },
    { q: "What is Lyosha afraid to tell his parents?", o: ["That he has dropped out of law school", "That he is getting married", "That he has lost his ticket", "That he is moving abroad"], a: 0 },
    { q: "According to Timur, how did Novosibirsk come into being?", o: ["As a fortress", "As a settlement for the builders of the bridge over the Ob", "As a university town", "As a fishing village"], a: 1 },
    { q: "Why is Timur going to Khabarovsk?", o: ["To inspect the Amur bridge", "To see his twelve-year-old son", "To attend a wedding", "To start a new job"], a: 1 },
    { q: "Who recognises the woman in the photograph in Slyudyanka?", o: ["The train attendant", "An old omul seller called Klava", "A railway worker", "The station master"], a: 1 },
    { q: "What did Vera's grandfather write to Anya in the autumn of 1978?", o: ["That he would come back next summer", "That the film had been spoiled", "That he had lost her address", "Nothing – he never wrote"], a: 1 },
    { q: "What does Vera write on the back of the old photograph at the end?", o: ["Her phone number", "\"Vladivostok, September. Sent.\"", "The date of her grandfather's death", "\"Thirty-six frames\""], a: 1 },
  ],
};

export default text;
