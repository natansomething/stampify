import type { Text } from '../../types';
import p01 from './parts/de-5-zimmer-neun-01';
import p02 from './parts/de-5-zimmer-neun-02';
import p03 from './parts/de-5-zimmer-neun-03';
import p04 from './parts/de-5-zimmer-neun-04';
import p05 from './parts/de-5-zimmer-neun-05';
import p06 from './parts/de-5-zimmer-neun-06';
import p07 from './parts/de-5-zimmer-neun-07';
import p08 from './parts/de-5-zimmer-neun-08';

const text: Text = {
  id: 'de-5-zimmer-neun',
  lv: 5,
  kind: 'story',
  title: 'Ein Edelweiß für Zimmer neun',
  titleEn: 'An Edelweiss for Room Nine',
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08],
  q: [
    {"q": "What does Uncle Sepp tell Theresa on the phone?", "o": ["That the inn is going to be sold", "That an inspector from the Alpenrose Guide is coming to the valley this week", "That a famous chef wants to work in her kitchen", "That the mayor is planning a festival"], "a": 1},
    {"q": "Why does Theresa give Mr Klee the tower room?", "o": ["His single room really has water damage", "He asks for the best room in the house", "She thinks he is the inspector and wants to impress him", "The tower room is the quietest room"], "a": 2},
    {"q": "Why is Mrs Moser given room nine?", "o": ["Theresa decides she is no danger and gives her the worst free room", "She asks for a room near the kitchen", "It is the only room that allows dogs", "Lena recommends it to her"], "a": 0},
    {"q": "What does Florian read in Mr Klee's notebook, and what does it really refer to?", "o": ["A complaint about the noise, which refers to the band", "\"Ibex – at last! More impressive than expected\", which refers to a real ibex", "A list of prices, which refers to his own budget", "Praise for the dumplings, which refers to his sister's cooking"], "a": 1},
    {"q": "How does the cattle drive end for Kaiser and Florian?", "o": ["Kaiser runs into the forest and Florian gives up", "Kaiser falls into the village fountain and Florian jumps in after him", "Kaiser is kicked by a cow and Florian takes him to the vet", "Kaiser hides under the band's stage"], "a": 1},
    {"q": "What does Lena tell Mrs Moser about her brother on their walk?", "o": ["That he wants to go back to Munich next month", "That the best thing he cooks is the food he doesn't take seriously", "That he never cooks with local cheese", "That he plans to take over the inn soon"], "a": 1},
    {"q": "What is Mr Klee's job, and why does he keep a notebook?", "o": ["He is a journalist taking notes for an article", "He is a hotel inspector writing his review", "He is a dentist who records the birds and animals he sees", "He is a teacher planning a school trip"], "a": 2},
    {"q": "What does the Alpenrose Guide praise most about the Golden Ibex?", "o": ["The luxurious tower room", "The seven-course menu and its desserts", "That guests are treated kindly even when they arrive wet, grumpy and without a booking", "The brass band and the cattle drive"], "a": 2}
  ],
};

export default text;
