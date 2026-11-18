import type { Text } from '../../types';
import p01 from './parts/ja-5-snow-lost-and-found-01';
import p02 from './parts/ja-5-snow-lost-and-found-02';
import p03 from './parts/ja-5-snow-lost-and-found-03';
import p04 from './parts/ja-5-snow-lost-and-found-04';
import p05 from './parts/ja-5-snow-lost-and-found-05';
import p06 from './parts/ja-5-snow-lost-and-found-06';
import p07 from './parts/ja-5-snow-lost-and-found-07';
import p08 from './parts/ja-5-snow-lost-and-found-08';

const text: Text = {
  id: 'ja-5-snow-lost-and-found',
  lv: 5,
  kind: 'story',
  title: '雪の朝の忘れ物',
  titleR: 'ゆきのあさのわすれもの',
  titleEn: 'Lost and Found on Snowy Mornings',
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08],
  q: [
    { q: "What is Sugisawa Station used for now?", o: ["It is still a busy railway station", "It is a waiting room for the bus", "It has become a museum", "It is the tourist information office"], a: 1 },
    { q: "Whose were the red mittens?", o: ["Aoi's mother's", "Harue's daughter Mika's", "Mr. Gonda's wife's", "Mr. Murai's granddaughter's"], a: 1 },
    { q: "Why did the former headteacher leave his fountain pen at the station?", o: ["He was reading his pupils' farewell messages and wiping away tears", "He fell asleep on the bench", "He ran to catch a train", "He gave it to the stationmaster as a present"], a: 0 },
    { q: "Why were there never any footprints near the waiting room?", o: ["The person came by sled from the roof", "The items were left after nights of snow, and the road was cleared by morning", "The person walked along the railway tracks", "Aoi cleaned the floor every morning"], a: 1 },
    { q: "Why had Mr. Moriyama kept the lost items for decades?", o: ["He planned to sell them", "The rules said he had to keep them", "He felt their owners would surely come back for them some day", "He forgot to throw them away"], a: 2 },
    { q: "Why did he start returning them that winter?", o: ["His house was to be torn down and he was moving to his son's in Nagaoka", "The town asked him to", "He found the box by chance", "Aoi put up a notice asking for them"], a: 0 },
    { q: "What is the story behind the music box?", o: ["Mr. Moriyama bought it for his wife", "Mr. Gonda bought it to propose to Kazuko, but was so nervous he left it at the station", "Harue lost it on a trip to Tokyo", "It was a prize at the snow festival"], a: 1 },
    { q: "How does the story end?", o: ["Aoi returns to Yokohama", "Aoi decides to stay another year and starts a new lost-property notebook", "Mr. Moriyama decides not to move", "The station reopens"], a: 1 },
  ],
};

export default text;
