import type { Verb } from '../types';

const data: Verb[] = [
  {
    inf: 'sein', en: 'to be', lv: 1,
    f: {
      'Präsens': ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
      'Präteritum': ['war', 'warst', 'war', 'waren', 'wart', 'waren'],
      'Perfekt': ['bin gewesen', 'bist gewesen', 'ist gewesen', 'sind gewesen', 'seid gewesen', 'sind gewesen'],
    },
  },
  {
    inf: 'haben', en: 'to have', lv: 1,
    f: {
      'Präsens': ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
      'Präteritum': ['hatte', 'hattest', 'hatte', 'hatten', 'hattet', 'hatten'],
      'Perfekt': ['habe gehabt', 'hast gehabt', 'hat gehabt', 'haben gehabt', 'habt gehabt', 'haben gehabt'],
    },
  },
  {
    inf: 'werden', en: 'to become; will', lv: 2,
    f: {
      'Präsens': ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'],
      'Präteritum': ['wurde', 'wurdest', 'wurde', 'wurden', 'wurdet', 'wurden'],
      'Perfekt': ['bin geworden', 'bist geworden', 'ist geworden', 'sind geworden', 'seid geworden', 'sind geworden'],
    },
  },
  {
    inf: 'können', en: 'can; to be able to', lv: 1,
    f: {
      'Präsens': ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'],
      'Präteritum': ['konnte', 'konntest', 'konnte', 'konnten', 'konntet', 'konnten'],
      'Perfekt': ['habe gekonnt', 'hast gekonnt', 'hat gekonnt', 'haben gekonnt', 'habt gekonnt', 'haben gekonnt'],
    },
  },
  {
    inf: 'müssen', en: 'must; to have to', lv: 1,
    f: {
      'Präsens': ['muss', 'musst', 'muss', 'müssen', 'müsst', 'müssen'],
      'Präteritum': ['musste', 'musstest', 'musste', 'mussten', 'musstet', 'mussten'],
      'Perfekt': ['habe gemusst', 'hast gemusst', 'hat gemusst', 'haben gemusst', 'habt gemusst', 'haben gemusst'],
    },
  },
  {
    inf: 'machen', en: 'to do; to make', lv: 1,
    f: {
      'Präsens': ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'],
      'Präteritum': ['machte', 'machtest', 'machte', 'machten', 'machtet', 'machten'],
      'Perfekt': ['habe gemacht', 'hast gemacht', 'hat gemacht', 'haben gemacht', 'habt gemacht', 'haben gemacht'],
    },
  },
  {
    inf: 'gehen', en: 'to go; to walk', lv: 1,
    f: {
      'Präsens': ['gehe', 'gehst', 'geht', 'gehen', 'geht', 'gehen'],
      'Präteritum': ['ging', 'gingst', 'ging', 'gingen', 'gingt', 'gingen'],
      'Perfekt': ['bin gegangen', 'bist gegangen', 'ist gegangen', 'sind gegangen', 'seid gegangen', 'sind gegangen'],
    },
  },
  {
    inf: 'kommen', en: 'to come', lv: 1,
    f: {
      'Präsens': ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen'],
      'Präteritum': ['kam', 'kamst', 'kam', 'kamen', 'kamt', 'kamen'],
      'Perfekt': ['bin gekommen', 'bist gekommen', 'ist gekommen', 'sind gekommen', 'seid gekommen', 'sind gekommen'],
    },
  },
  {
    inf: 'sagen', en: 'to say', lv: 1,
    f: {
      'Präsens': ['sage', 'sagst', 'sagt', 'sagen', 'sagt', 'sagen'],
      'Präteritum': ['sagte', 'sagtest', 'sagte', 'sagten', 'sagtet', 'sagten'],
      'Perfekt': ['habe gesagt', 'hast gesagt', 'hat gesagt', 'haben gesagt', 'habt gesagt', 'haben gesagt'],
    },
  },
  {
    inf: 'wollen', en: 'to want', lv: 1,
    f: {
      'Präsens': ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'],
      'Präteritum': ['wollte', 'wolltest', 'wollte', 'wollten', 'wolltet', 'wollten'],
      'Perfekt': ['habe gewollt', 'hast gewollt', 'hat gewollt', 'haben gewollt', 'habt gewollt', 'haben gewollt'],
    },
  },
  {
    inf: 'sehen', en: 'to see', lv: 1,
    f: {
      'Präsens': ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'],
      'Präteritum': ['sah', 'sahst', 'sah', 'sahen', 'saht', 'sahen'],
      'Perfekt': ['habe gesehen', 'hast gesehen', 'hat gesehen', 'haben gesehen', 'habt gesehen', 'haben gesehen'],
    },
  },
  {
    inf: 'geben', en: 'to give', lv: 1,
    f: {
      'Präsens': ['gebe', 'gibst', 'gibt', 'geben', 'gebt', 'geben'],
      'Präteritum': ['gab', 'gabst', 'gab', 'gaben', 'gabt', 'gaben'],
      'Perfekt': ['habe gegeben', 'hast gegeben', 'hat gegeben', 'haben gegeben', 'habt gegeben', 'haben gegeben'],
    },
  },
  {
    inf: 'wissen', en: 'to know (a fact)', lv: 1,
    f: {
      'Präsens': ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'],
      'Präteritum': ['wusste', 'wusstest', 'wusste', 'wussten', 'wusstet', 'wussten'],
      'Perfekt': ['habe gewusst', 'hast gewusst', 'hat gewusst', 'haben gewusst', 'habt gewusst', 'haben gewusst'],
    },
  },
  {
    inf: 'nehmen', en: 'to take', lv: 1,
    f: {
      'Präsens': ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen'],
      'Präteritum': ['nahm', 'nahmst', 'nahm', 'nahmen', 'nahmt', 'nahmen'],
      'Perfekt': ['habe genommen', 'hast genommen', 'hat genommen', 'haben genommen', 'habt genommen', 'haben genommen'],
    },
  },
  {
    inf: 'essen', en: 'to eat', lv: 1,
    f: {
      'Präsens': ['esse', 'isst', 'isst', 'essen', 'esst', 'essen'],
      'Präteritum': ['aß', 'aßest', 'aß', 'aßen', 'aßt', 'aßen'],
      'Perfekt': ['habe gegessen', 'hast gegessen', 'hat gegessen', 'haben gegessen', 'habt gegessen', 'haben gegessen'],
    },
  },
  {
    inf: 'trinken', en: 'to drink', lv: 1,
    f: {
      'Präsens': ['trinke', 'trinkst', 'trinkt', 'trinken', 'trinkt', 'trinken'],
      'Präteritum': ['trank', 'trankst', 'trank', 'tranken', 'trankt', 'tranken'],
      'Perfekt': ['habe getrunken', 'hast getrunken', 'hat getrunken', 'haben getrunken', 'habt getrunken', 'haben getrunken'],
    },
  },
  {
    inf: 'fahren', en: 'to drive; to go (by vehicle)', lv: 1,
    f: {
      'Präsens': ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'],
      'Präteritum': ['fuhr', 'fuhrst', 'fuhr', 'fuhren', 'fuhrt', 'fuhren'],
      'Perfekt': ['bin gefahren', 'bist gefahren', 'ist gefahren', 'sind gefahren', 'seid gefahren', 'sind gefahren'],
    },
  },
  {
    inf: 'mögen', en: 'to like', lv: 1,
    f: {
      'Präsens': ['mag', 'magst', 'mag', 'mögen', 'mögt', 'mögen'],
      'Präteritum': ['mochte', 'mochtest', 'mochte', 'mochten', 'mochtet', 'mochten'],
      'Perfekt': ['habe gemocht', 'hast gemocht', 'hat gemocht', 'haben gemocht', 'habt gemocht', 'haben gemocht'],
    },
  },
  {
    inf: 'wohnen', en: 'to live (reside)', lv: 1,
    f: {
      'Präsens': ['wohne', 'wohnst', 'wohnt', 'wohnen', 'wohnt', 'wohnen'],
      'Präteritum': ['wohnte', 'wohntest', 'wohnte', 'wohnten', 'wohntet', 'wohnten'],
      'Perfekt': ['habe gewohnt', 'hast gewohnt', 'hat gewohnt', 'haben gewohnt', 'habt gewohnt', 'haben gewohnt'],
    },
  },
  {
    inf: 'heißen', en: 'to be called', lv: 1,
    f: {
      'Präsens': ['heiße', 'heißt', 'heißt', 'heißen', 'heißt', 'heißen'],
      'Präteritum': ['hieß', 'hießest', 'hieß', 'hießen', 'hießt', 'hießen'],
      'Perfekt': ['habe geheißen', 'hast geheißen', 'hat geheißen', 'haben geheißen', 'habt geheißen', 'haben geheißen'],
    },
  },
  {
    inf: 'sprechen', en: 'to speak', lv: 1,
    f: {
      'Präsens': ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht', 'sprechen'],
      'Präteritum': ['sprach', 'sprachst', 'sprach', 'sprachen', 'spracht', 'sprachen'],
      'Perfekt': ['habe gesprochen', 'hast gesprochen', 'hat gesprochen', 'haben gesprochen', 'habt gesprochen', 'haben gesprochen'],
    },
  },
  {
    inf: 'arbeiten', en: 'to work', lv: 1,
    f: {
      'Präsens': ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten', 'arbeitet', 'arbeiten'],
      'Präteritum': ['arbeitete', 'arbeitetest', 'arbeitete', 'arbeiteten', 'arbeitetet', 'arbeiteten'],
      'Perfekt': ['habe gearbeitet', 'hast gearbeitet', 'hat gearbeitet', 'haben gearbeitet', 'habt gearbeitet', 'haben gearbeitet'],
    },
  },
  {
    inf: 'lernen', en: 'to learn; to study', lv: 1,
    f: {
      'Präsens': ['lerne', 'lernst', 'lernt', 'lernen', 'lernt', 'lernen'],
      'Präteritum': ['lernte', 'lerntest', 'lernte', 'lernten', 'lerntet', 'lernten'],
      'Perfekt': ['habe gelernt', 'hast gelernt', 'hat gelernt', 'haben gelernt', 'habt gelernt', 'haben gelernt'],
    },
  },
  {
    inf: 'spielen', en: 'to play', lv: 1,
    f: {
      'Präsens': ['spiele', 'spielst', 'spielt', 'spielen', 'spielt', 'spielen'],
      'Präteritum': ['spielte', 'spieltest', 'spielte', 'spielten', 'spieltet', 'spielten'],
      'Perfekt': ['habe gespielt', 'hast gespielt', 'hat gespielt', 'haben gespielt', 'habt gespielt', 'haben gespielt'],
    },
  },
  {
    inf: 'kaufen', en: 'to buy', lv: 1,
    f: {
      'Präsens': ['kaufe', 'kaufst', 'kauft', 'kaufen', 'kauft', 'kaufen'],
      'Präteritum': ['kaufte', 'kauftest', 'kaufte', 'kauften', 'kauftet', 'kauften'],
      'Perfekt': ['habe gekauft', 'hast gekauft', 'hat gekauft', 'haben gekauft', 'habt gekauft', 'haben gekauft'],
    },
  },
  {
    inf: 'lesen', en: 'to read', lv: 1,
    f: {
      'Präsens': ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'],
      'Präteritum': ['las', 'last', 'las', 'lasen', 'last', 'lasen'],
      'Perfekt': ['habe gelesen', 'hast gelesen', 'hat gelesen', 'haben gelesen', 'habt gelesen', 'haben gelesen'],
    },
  },
  {
    inf: 'schlafen', en: 'to sleep', lv: 1,
    f: {
      'Präsens': ['schlafe', 'schläfst', 'schläft', 'schlafen', 'schlaft', 'schlafen'],
      'Präteritum': ['schlief', 'schliefst', 'schlief', 'schliefen', 'schlieft', 'schliefen'],
      'Perfekt': ['habe geschlafen', 'hast geschlafen', 'hat geschlafen', 'haben geschlafen', 'habt geschlafen', 'haben geschlafen'],
    },
  },
  {
    inf: 'dürfen', en: 'may; to be allowed to', lv: 2,
    f: {
      'Präsens': ['darf', 'darfst', 'darf', 'dürfen', 'dürft', 'dürfen'],
      'Präteritum': ['durfte', 'durftest', 'durfte', 'durften', 'durftet', 'durften'],
      'Perfekt': ['habe gedurft', 'hast gedurft', 'hat gedurft', 'haben gedurft', 'habt gedurft', 'haben gedurft'],
    },
  },
  {
    inf: 'sollen', en: 'should; to be supposed to', lv: 2,
    f: {
      'Präsens': ['soll', 'sollst', 'soll', 'sollen', 'sollt', 'sollen'],
      'Präteritum': ['sollte', 'solltest', 'sollte', 'sollten', 'solltet', 'sollten'],
      'Perfekt': ['habe gesollt', 'hast gesollt', 'hat gesollt', 'haben gesollt', 'habt gesollt', 'haben gesollt'],
    },
  },
  {
    inf: 'finden', en: 'to find', lv: 1,
    f: {
      'Präsens': ['finde', 'findest', 'findet', 'finden', 'findet', 'finden'],
      'Präteritum': ['fand', 'fandest', 'fand', 'fanden', 'fandet', 'fanden'],
      'Perfekt': ['habe gefunden', 'hast gefunden', 'hat gefunden', 'haben gefunden', 'habt gefunden', 'haben gefunden'],
    },
  },
  {
    inf: 'schreiben', en: 'to write', lv: 1,
    f: {
      'Präsens': ['schreibe', 'schreibst', 'schreibt', 'schreiben', 'schreibt', 'schreiben'],
      'Präteritum': ['schrieb', 'schriebst', 'schrieb', 'schrieben', 'schriebt', 'schrieben'],
      'Perfekt': ['habe geschrieben', 'hast geschrieben', 'hat geschrieben', 'haben geschrieben', 'habt geschrieben', 'haben geschrieben'],
    },
  },
  {
    inf: 'anfangen', en: 'to begin; to start', lv: 2,
    f: {
      'Präsens': ['fange an', 'fängst an', 'fängt an', 'fangen an', 'fangt an', 'fangen an'],
      'Präteritum': ['fing an', 'fingst an', 'fing an', 'fingen an', 'fingt an', 'fingen an'],
      'Perfekt': ['habe angefangen', 'hast angefangen', 'hat angefangen', 'haben angefangen', 'habt angefangen', 'haben angefangen'],
    },
  },
  {
    inf: 'aufstehen', en: 'to get up', lv: 2,
    f: {
      'Präsens': ['stehe auf', 'stehst auf', 'steht auf', 'stehen auf', 'steht auf', 'stehen auf'],
      'Präteritum': ['stand auf', 'standest auf', 'stand auf', 'standen auf', 'standet auf', 'standen auf'],
      'Perfekt': ['bin aufgestanden', 'bist aufgestanden', 'ist aufgestanden', 'sind aufgestanden', 'seid aufgestanden', 'sind aufgestanden'],
    },
  },
  {
    inf: 'einkaufen', en: 'to go shopping', lv: 2,
    f: {
      'Präsens': ['kaufe ein', 'kaufst ein', 'kauft ein', 'kaufen ein', 'kauft ein', 'kaufen ein'],
      'Präteritum': ['kaufte ein', 'kauftest ein', 'kaufte ein', 'kauften ein', 'kauftet ein', 'kauften ein'],
      'Perfekt': ['habe eingekauft', 'hast eingekauft', 'hat eingekauft', 'haben eingekauft', 'habt eingekauft', 'haben eingekauft'],
    },
  },
  {
    inf: 'anrufen', en: 'to call (phone)', lv: 2,
    f: {
      'Präsens': ['rufe an', 'rufst an', 'ruft an', 'rufen an', 'ruft an', 'rufen an'],
      'Präteritum': ['rief an', 'riefst an', 'rief an', 'riefen an', 'rieft an', 'riefen an'],
      'Perfekt': ['habe angerufen', 'hast angerufen', 'hat angerufen', 'haben angerufen', 'habt angerufen', 'haben angerufen'],
    },
  },
  {
    inf: 'bleiben', en: 'to stay', lv: 2,
    f: {
      'Präsens': ['bleibe', 'bleibst', 'bleibt', 'bleiben', 'bleibt', 'bleiben'],
      'Präteritum': ['blieb', 'bliebst', 'blieb', 'blieben', 'bliebt', 'blieben'],
      'Perfekt': ['bin geblieben', 'bist geblieben', 'ist geblieben', 'sind geblieben', 'seid geblieben', 'sind geblieben'],
    },
  },
  {
    inf: 'helfen', en: 'to help', lv: 2,
    f: {
      'Präsens': ['helfe', 'hilfst', 'hilft', 'helfen', 'helft', 'helfen'],
      'Präteritum': ['half', 'halfst', 'half', 'halfen', 'halft', 'halfen'],
      'Perfekt': ['habe geholfen', 'hast geholfen', 'hat geholfen', 'haben geholfen', 'habt geholfen', 'haben geholfen'],
    },
  },
  {
    inf: 'verstehen', en: 'to understand', lv: 2,
    f: {
      'Präsens': ['verstehe', 'verstehst', 'versteht', 'verstehen', 'versteht', 'verstehen'],
      'Präteritum': ['verstand', 'verstandest', 'verstand', 'verstanden', 'verstandet', 'verstanden'],
      'Perfekt': ['habe verstanden', 'hast verstanden', 'hat verstanden', 'haben verstanden', 'habt verstanden', 'haben verstanden'],
    },
  },
  {
    inf: 'denken', en: 'to think', lv: 2,
    f: {
      'Präsens': ['denke', 'denkst', 'denkt', 'denken', 'denkt', 'denken'],
      'Präteritum': ['dachte', 'dachtest', 'dachte', 'dachten', 'dachtet', 'dachten'],
      'Perfekt': ['habe gedacht', 'hast gedacht', 'hat gedacht', 'haben gedacht', 'habt gedacht', 'haben gedacht'],
    },
  },
  {
    inf: 'laufen', en: 'to run; to walk', lv: 2,
    f: {
      'Präsens': ['laufe', 'läufst', 'läuft', 'laufen', 'lauft', 'laufen'],
      'Präteritum': ['lief', 'liefst', 'lief', 'liefen', 'lieft', 'liefen'],
      'Perfekt': ['bin gelaufen', 'bist gelaufen', 'ist gelaufen', 'sind gelaufen', 'seid gelaufen', 'sind gelaufen'],
    },
  },
];

export default data;
