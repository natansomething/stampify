import type { Text } from '../../types';
import p01 from './parts/pt-5-garfo-01';
import p02 from './parts/pt-5-garfo-02';
import p03 from './parts/pt-5-garfo-03';
import p04 from './parts/pt-5-garfo-04';
import p05 from './parts/pt-5-garfo-05';
import p06 from './parts/pt-5-garfo-06';
import p07 from './parts/pt-5-garfo-07';
import p08 from './parts/pt-5-garfo-08';

const text: Text = {
  id: 'pt-5-garfo',
  lv: 5,
  kind: 'story',
  title: 'O Garfo de Tiradentes',
  titleEn: 'The Fork of Tiradentes',
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08],
  q: [
    { q: 'Why does Dona Lurdes give Otávio the suite with the fireplace?', o: ['He paid extra for it', 'She thinks he is the anonymous critic known as the Fork', 'It is the only free room', 'His sister booked it for him'], a: 1 },
    { q: 'What does Otávio actually write in his notebook after the tasting menu?', o: ['A harsh review of the foam', 'The names of all nine courses', '"Dinner: R$ 0.00", underlined, with question marks', 'A note to call his sister'], a: 2 },
    { q: 'What comment does Otávio make about Cláudia\'s chicken with okra?', o: ['That it is far too expensive', 'That it has about two per cent too much salt', 'That it needs more okra', 'That it is better than Ramiro\'s food'], a: 1 },
    { q: 'How does Ramiro react on the train when Otávio says he is an accountant?', o: ['He apologises and leaves', 'He says that is exactly what the Fork would say', 'He asks to see his professional card', 'He laughs and agrees'], a: 1 },
    { q: 'Where does Cláudia find the lost notebook?', o: ['Under a bench in the main square', 'On the train', 'Near the door of a small grocery shop', 'At the guesthouse reception'], a: 2 },
    { q: 'Why does Otávio stand up at the banquet before the first course?', o: ['To make a toast to Ramiro', 'To tell everyone he is really an accountant and offer to pay', 'To read the Fork\'s new column', 'To complain about the wine'], a: 1 },
    { q: 'According to the column, what was the best meal of the critic\'s week?', o: ['The banquet at Tempero da Serra', 'The breakfast at a small guesthouse', 'The pastel on the train', 'The cheese bread in the square'], a: 1 },
    { q: 'What does Dona Celeste leave for Otávio at reception?', o: ['A bottle of cachaça', 'A knitted cover for his notebook with a fork embroidered on it', 'The bill for her room', 'A copy of her column'], a: 1 },
  ],
};

export default text;
