import type { Text } from '../../types';
import p01 from './parts/ko-5-bosudong-01';
import p02 from './parts/ko-5-bosudong-02';
import p03 from './parts/ko-5-bosudong-03';
import p04 from './parts/ko-5-bosudong-04';
import p05 from './parts/ko-5-bosudong-05';
import p06 from './parts/ko-5-bosudong-06';
import p07 from './parts/ko-5-bosudong-07';
import p08 from './parts/ko-5-bosudong-08';

const text: Text = {
  id: "ko-5-bosudong",
  lv: 5,
  kind: "story",
  title: "보수동 책방골목의 수상한 책",
  titleR: "Bosudong chaekbanggolmogui susanghan chaek",
  titleEn: "The Strange Books of Bosu-dong Book Alley",
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08],
  q: [
    {"q": "Why does Harin come to Busan?", "o": ["To study at a university", "Her uncle asks her to help run his bookshop after she quits her job", "To look for a new translation job", "To sell her grandfather's books"], "a": 1},
    {"q": "What does every mysterious book have in common?", "o": ["A pressed flower between the pages", "A name written on the first page", "A thousand-won note inside", "One underlined syllable, a peppermint smell and \"Spring 1975\" written inside"], "a": 3},
    {"q": "Why can't Harin read the message at first?", "o": ["Her uncle piled them up in no order and some were already sold", "The books are in a foreign language", "The underlines are too faint to see", "Jeongu hid some of the books"], "a": 0},
    {"q": "How does Harin realize the books arrive in order?", "o": ["Mr. Park tells her", "Each book has a number on its cover", "The syllables of five days in a row spell \"gapseumnida\"", "Her uncle remembers the order"], "a": 2},
    {"q": "Who is \"Manseok hyeongnim\"?", "o": ["Jeongu's older brother", "Harin's grandfather, who started the bookshop with a hand cart", "The owner of the shoe shop", "Mr. Park's teacher"], "a": 1},
    {"q": "What did Grandfather write under the thirty titles in his ledger?", "o": ["Do not collect; if he reads them all, that is enough", "The total price of the books", "The student's address in Seoul", "A reminder to ask for the money every month"], "a": 0},
    {"q": "Why did Grandfather ask borrowers to underline one syllable?", "o": ["To mark where they stopped reading", "To keep track of which books were his", "Because he collected letters", "So he could tell what the reader had been thinking"], "a": 3},
    {"q": "What is special about the thirtieth book?", "o": ["It is a first edition worth a lot of money", "Jeongu found it in another shop", "It is the very book Mr. Park took to Seoul fifty years ago, with Grandfather's red underline", "It has no underline at all"], "a": 2}
  ],
};

export default text;
