import type { Text } from '../../types';
import p01 from './parts/pl-5-two-earpieces-01';
import p02 from './parts/pl-5-two-earpieces-02';
import p03 from './parts/pl-5-two-earpieces-03';
import p04 from './parts/pl-5-two-earpieces-04';
import p05 from './parts/pl-5-two-earpieces-05';
import p06 from './parts/pl-5-two-earpieces-06';
import p07 from './parts/pl-5-two-earpieces-07';
import p08 from './parts/pl-5-two-earpieces-08';

const text: Text = {
  id: 'pl-5-two-earpieces',
  lv: 5,
  kind: 'story',
  title: 'Dwie słuchawki',
  titleEn: 'Two Earpieces',
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08],
  q: [
    { q: 'What did Tomek claim at the Sunday dinner?', o: ['That he played golf', 'That he could sail', 'That he owned a yacht', 'That he had grown up in Masuria'], a: 1 },
    { q: 'How was Kinga going to help Tomek during the voyage?', o: ['By sailing the yacht herself', 'By sending him text messages', 'By talking to him through a tiny earpiece from a nearby motorboat', 'By lending him a sailing handbook'], a: 2 },
    { q: 'Who pulled the halyard when the mainsail was raised on the first day?', o: ['Mr Zdzisław', 'Ola', 'Kinga', 'Mrs Halina'], a: 3 },
    { q: 'What did Tomek overhear behind the toilet block at night?', o: ['That Kinga wanted more money', 'That Mr Zdzisław had also hired Kinga and had once only been a camp cook', 'That Ola wanted to cancel the engagement', 'That a storm was coming'], a: 1 },
    { q: 'Why did the Bryza start sailing in circles?', o: ['The rudder broke', 'Kinga mixed up the two phones and gave each man the other one\'s instructions', 'Mr Zdzisław fell asleep at the helm', 'The wind changed direction suddenly'], a: 1 },
    { q: 'Who brought the yacht safely into the bay during the white squall?', o: ['Tomek', 'Kinga', 'Mrs Halina', 'Mr Zdzisław'], a: 2 },
    { q: 'How did Kinga\'s mother know Mrs Halina?', o: ['They had worked at the same school', 'Halina had been her instructor and brought her boat to safety in a squall', 'They were neighbours in Łódź', 'They had met at the wedding'], a: 1 },
    { q: 'What did Mrs Halina say after her husband\'s wedding toast?', o: ['"That isn\'t true"', '"I remember"', '"Bravo"', 'Nothing at all'], a: 1 },
  ],
};

export default text;
