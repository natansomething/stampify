import type { Text } from '../../types';
import p01 from './parts/de-6-firnis-01';
import p02 from './parts/de-6-firnis-02';
import p03 from './parts/de-6-firnis-03';
import p04 from './parts/de-6-firnis-04';
import p05 from './parts/de-6-firnis-05';
import p06 from './parts/de-6-firnis-06';
import p07 from './parts/de-6-firnis-07';
import p08 from './parts/de-6-firnis-08';
import p09 from './parts/de-6-firnis-09';
import p10 from './parts/de-6-firnis-10';
import p11 from './parts/de-6-firnis-11';
import p12 from './parts/de-6-firnis-12';
import p13 from './parts/de-6-firnis-13';
import p14 from './parts/de-6-firnis-14';

const text: Text = {
  id: 'de-6-firnis',
  lv: 6,
  kind: 'story',
  title: 'Unter dem Firnis',
  titleEn: 'Beneath the Varnish',
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10, ...p11, ...p12, ...p13, ...p14],
  q: [
    {"q": "Why does Konstantin Bahr bring the painting to Johanna?", "o": ["He wants to sell it at auction", "It is going to a museum as a donation and he wants it to look as it once did", "It was damaged in a flood", "His insurance requires a condition report"], "a": 1},
    {"q": "What does the infrared camera reveal under the paint?", "o": ["A second signature by Asmussen", "A hidden woman on the bridge and a pencil inscription", "An older painting of a ship", "A shopping list and a phone number"], "a": 1},
    {"q": "How does Ilse first explain the small drawing in her hallway?", "o": ["She says Johanna drew it as a child", "She says Grandma bought it at a flea market", "She says it was a gift from Mr Bahr", "She says it is a print from a souvenir shop she bought herself"], "a": 1},
    {"q": "Where do Johanna, Tarek and Bahr find the sketchbook and the letter?", "o": ["In a cupboard in the Bahr office", "In the cellar of Ilse's building", "In the old winch housing of the firm's former coffee loft", "In the State Archive"], "a": 2},
    {"q": "What does Friederike Lamprecht offer Johanna?", "o": ["To buy the painting for her gallery", "A paid, confidential assessment of the sketchbook", "A job in her gallery", "To lend her two Asmussen paintings for comparison"], "a": 1},
    {"q": "According to her letter, why did Marthe stop painting?", "o": ["Her husband forbade it", "She lost her paints in the 1962 flood", "She had agreed to paint only as long as Carl lived", "She found a better job at the firm"], "a": 2},
    {"q": "Which evidence shows that the late pictures were painted by Marthe?", "o": ["The signatures are in her handwriting", "Left-handed brushstrokes and a blue mixture noted in her sketchbook", "A receipt with her name on it", "A statement by Carl Asmussen in the archive"], "a": 1},
    {"q": "Why does Johanna decide not to uncover the overpainted woman on the bridge?", "o": ["The paint is too thick to remove safely", "The museum forbids it", "The overpainting was Marthe's own decision and part of the work", "Ilse asks her not to"], "a": 2},
  ],
};

export default text;
