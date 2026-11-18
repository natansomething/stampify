import type { Verb } from '../types';

const data: Verb[] = [
  {
    inf: 'zijn', en: 'to be', lv: 1,
    f: {
      'presens': ['ben', 'bent', 'is', 'zijn', 'zijn', 'zijn'],
      'imperfectum': ['was', 'was', 'was', 'waren', 'waren', 'waren'],
      'perfectum': ['ben geweest', 'bent geweest', 'is geweest', 'zijn geweest', 'zijn geweest', 'zijn geweest'],
    },
  },
  {
    inf: 'hebben', en: 'to have', lv: 1,
    f: {
      'presens': ['heb', 'hebt', 'heeft', 'hebben', 'hebben', 'hebben'],
      'imperfectum': ['had', 'had', 'had', 'hadden', 'hadden', 'hadden'],
      'perfectum': ['heb gehad', 'hebt gehad', 'heeft gehad', 'hebben gehad', 'hebben gehad', 'hebben gehad'],
    },
  },
  {
    inf: 'gaan', en: 'to go', lv: 1,
    f: {
      'presens': ['ga', 'gaat', 'gaat', 'gaan', 'gaan', 'gaan'],
      'imperfectum': ['ging', 'ging', 'ging', 'gingen', 'gingen', 'gingen'],
      'perfectum': ['ben gegaan', 'bent gegaan', 'is gegaan', 'zijn gegaan', 'zijn gegaan', 'zijn gegaan'],
    },
  },
  {
    inf: 'komen', en: 'to come', lv: 1,
    f: {
      'presens': ['kom', 'komt', 'komt', 'komen', 'komen', 'komen'],
      'imperfectum': ['kwam', 'kwam', 'kwam', 'kwamen', 'kwamen', 'kwamen'],
      'perfectum': ['ben gekomen', 'bent gekomen', 'is gekomen', 'zijn gekomen', 'zijn gekomen', 'zijn gekomen'],
    },
  },
  {
    inf: 'doen', en: 'to do', lv: 1,
    f: {
      'presens': ['doe', 'doet', 'doet', 'doen', 'doen', 'doen'],
      'imperfectum': ['deed', 'deed', 'deed', 'deden', 'deden', 'deden'],
      'perfectum': ['heb gedaan', 'hebt gedaan', 'heeft gedaan', 'hebben gedaan', 'hebben gedaan', 'hebben gedaan'],
    },
  },
  {
    inf: 'maken', en: 'to make; to do', lv: 1,
    f: {
      'presens': ['maak', 'maakt', 'maakt', 'maken', 'maken', 'maken'],
      'imperfectum': ['maakte', 'maakte', 'maakte', 'maakten', 'maakten', 'maakten'],
      'perfectum': ['heb gemaakt', 'hebt gemaakt', 'heeft gemaakt', 'hebben gemaakt', 'hebben gemaakt', 'hebben gemaakt'],
    },
  },
  {
    inf: 'wonen', en: 'to live (reside)', lv: 1,
    f: {
      'presens': ['woon', 'woont', 'woont', 'wonen', 'wonen', 'wonen'],
      'imperfectum': ['woonde', 'woonde', 'woonde', 'woonden', 'woonden', 'woonden'],
      'perfectum': ['heb gewoond', 'hebt gewoond', 'heeft gewoond', 'hebben gewoond', 'hebben gewoond', 'hebben gewoond'],
    },
  },
  {
    inf: 'werken', en: 'to work', lv: 1,
    f: {
      'presens': ['werk', 'werkt', 'werkt', 'werken', 'werken', 'werken'],
      'imperfectum': ['werkte', 'werkte', 'werkte', 'werkten', 'werkten', 'werkten'],
      'perfectum': ['heb gewerkt', 'hebt gewerkt', 'heeft gewerkt', 'hebben gewerkt', 'hebben gewerkt', 'hebben gewerkt'],
    },
  },
  {
    inf: 'eten', en: 'to eat', lv: 1,
    f: {
      'presens': ['eet', 'eet', 'eet', 'eten', 'eten', 'eten'],
      'imperfectum': ['at', 'at', 'at', 'aten', 'aten', 'aten'],
      'perfectum': ['heb gegeten', 'hebt gegeten', 'heeft gegeten', 'hebben gegeten', 'hebben gegeten', 'hebben gegeten'],
    },
  },
  {
    inf: 'drinken', en: 'to drink', lv: 1,
    f: {
      'presens': ['drink', 'drinkt', 'drinkt', 'drinken', 'drinken', 'drinken'],
      'imperfectum': ['dronk', 'dronk', 'dronk', 'dronken', 'dronken', 'dronken'],
      'perfectum': ['heb gedronken', 'hebt gedronken', 'heeft gedronken', 'hebben gedronken', 'hebben gedronken', 'hebben gedronken'],
    },
  },
  {
    inf: 'slapen', en: 'to sleep', lv: 1,
    f: {
      'presens': ['slaap', 'slaapt', 'slaapt', 'slapen', 'slapen', 'slapen'],
      'imperfectum': ['sliep', 'sliep', 'sliep', 'sliepen', 'sliepen', 'sliepen'],
      'perfectum': ['heb geslapen', 'hebt geslapen', 'heeft geslapen', 'hebben geslapen', 'hebben geslapen', 'hebben geslapen'],
    },
  },
  {
    inf: 'lezen', en: 'to read', lv: 1,
    f: {
      'presens': ['lees', 'leest', 'leest', 'lezen', 'lezen', 'lezen'],
      'imperfectum': ['las', 'las', 'las', 'lazen', 'lazen', 'lazen'],
      'perfectum': ['heb gelezen', 'hebt gelezen', 'heeft gelezen', 'hebben gelezen', 'hebben gelezen', 'hebben gelezen'],
    },
  },
  {
    inf: 'kopen', en: 'to buy', lv: 1,
    f: {
      'presens': ['koop', 'koopt', 'koopt', 'kopen', 'kopen', 'kopen'],
      'imperfectum': ['kocht', 'kocht', 'kocht', 'kochten', 'kochten', 'kochten'],
      'perfectum': ['heb gekocht', 'hebt gekocht', 'heeft gekocht', 'hebben gekocht', 'hebben gekocht', 'hebben gekocht'],
    },
  },
  {
    inf: 'willen', en: 'to want', lv: 1,
    f: {
      'presens': ['wil', 'wilt', 'wil', 'willen', 'willen', 'willen'],
      'imperfectum': ['wilde', 'wilde', 'wilde', 'wilden', 'wilden', 'wilden'],
      'perfectum': ['heb gewild', 'hebt gewild', 'heeft gewild', 'hebben gewild', 'hebben gewild', 'hebben gewild'],
    },
  },
  {
    inf: 'kunnen', en: 'can; to be able to', lv: 1,
    f: {
      'presens': ['kan', 'kunt', 'kan', 'kunnen', 'kunnen', 'kunnen'],
      'imperfectum': ['kon', 'kon', 'kon', 'konden', 'konden', 'konden'],
      'perfectum': ['heb gekund', 'hebt gekund', 'heeft gekund', 'hebben gekund', 'hebben gekund', 'hebben gekund'],
    },
  },
  {
    inf: 'zien', en: 'to see', lv: 2,
    f: {
      'presens': ['zie', 'ziet', 'ziet', 'zien', 'zien', 'zien'],
      'imperfectum': ['zag', 'zag', 'zag', 'zagen', 'zagen', 'zagen'],
      'perfectum': ['heb gezien', 'hebt gezien', 'heeft gezien', 'hebben gezien', 'hebben gezien', 'hebben gezien'],
    },
  },
  {
    inf: 'zeggen', en: 'to say', lv: 2,
    f: {
      'presens': ['zeg', 'zegt', 'zegt', 'zeggen', 'zeggen', 'zeggen'],
      'imperfectum': ['zei', 'zei', 'zei', 'zeiden', 'zeiden', 'zeiden'],
      'perfectum': ['heb gezegd', 'hebt gezegd', 'heeft gezegd', 'hebben gezegd', 'hebben gezegd', 'hebben gezegd'],
    },
  },
  {
    inf: 'weten', en: 'to know (a fact)', lv: 2,
    f: {
      'presens': ['weet', 'weet', 'weet', 'weten', 'weten', 'weten'],
      'imperfectum': ['wist', 'wist', 'wist', 'wisten', 'wisten', 'wisten'],
      'perfectum': ['heb geweten', 'hebt geweten', 'heeft geweten', 'hebben geweten', 'hebben geweten', 'hebben geweten'],
    },
  },
  {
    inf: 'moeten', en: 'must; to have to', lv: 2,
    f: {
      'presens': ['moet', 'moet', 'moet', 'moeten', 'moeten', 'moeten'],
      'imperfectum': ['moest', 'moest', 'moest', 'moesten', 'moesten', 'moesten'],
      'perfectum': ['heb gemoeten', 'hebt gemoeten', 'heeft gemoeten', 'hebben gemoeten', 'hebben gemoeten', 'hebben gemoeten'],
    },
  },
  {
    inf: 'mogen', en: 'may; to be allowed to', lv: 2,
    f: {
      'presens': ['mag', 'mag', 'mag', 'mogen', 'mogen', 'mogen'],
      'imperfectum': ['mocht', 'mocht', 'mocht', 'mochten', 'mochten', 'mochten'],
      'perfectum': ['heb gemogen', 'hebt gemogen', 'heeft gemogen', 'hebben gemogen', 'hebben gemogen', 'hebben gemogen'],
    },
  },
  {
    inf: 'geven', en: 'to give', lv: 2,
    f: {
      'presens': ['geef', 'geeft', 'geeft', 'geven', 'geven', 'geven'],
      'imperfectum': ['gaf', 'gaf', 'gaf', 'gaven', 'gaven', 'gaven'],
      'perfectum': ['heb gegeven', 'hebt gegeven', 'heeft gegeven', 'hebben gegeven', 'hebben gegeven', 'hebben gegeven'],
    },
  },
  {
    inf: 'nemen', en: 'to take', lv: 2,
    f: {
      'presens': ['neem', 'neemt', 'neemt', 'nemen', 'nemen', 'nemen'],
      'imperfectum': ['nam', 'nam', 'nam', 'namen', 'namen', 'namen'],
      'perfectum': ['heb genomen', 'hebt genomen', 'heeft genomen', 'hebben genomen', 'hebben genomen', 'hebben genomen'],
    },
  },
  {
    inf: 'kijken', en: 'to look; to watch', lv: 2,
    f: {
      'presens': ['kijk', 'kijkt', 'kijkt', 'kijken', 'kijken', 'kijken'],
      'imperfectum': ['keek', 'keek', 'keek', 'keken', 'keken', 'keken'],
      'perfectum': ['heb gekeken', 'hebt gekeken', 'heeft gekeken', 'hebben gekeken', 'hebben gekeken', 'hebben gekeken'],
    },
  },
  {
    inf: 'betalen', en: 'to pay', lv: 2,
    f: {
      'presens': ['betaal', 'betaalt', 'betaalt', 'betalen', 'betalen', 'betalen'],
      'imperfectum': ['betaalde', 'betaalde', 'betaalde', 'betaalden', 'betaalden', 'betaalden'],
      'perfectum': ['heb betaald', 'hebt betaald', 'heeft betaald', 'hebben betaald', 'hebben betaald', 'hebben betaald'],
    },
  },
  {
    inf: 'spreken', en: 'to speak', lv: 2,
    f: {
      'presens': ['spreek', 'spreekt', 'spreekt', 'spreken', 'spreken', 'spreken'],
      'imperfectum': ['sprak', 'sprak', 'sprak', 'spraken', 'spraken', 'spraken'],
      'perfectum': ['heb gesproken', 'hebt gesproken', 'heeft gesproken', 'hebben gesproken', 'hebben gesproken', 'hebben gesproken'],
    },
  },
  {
    inf: 'blijven', en: 'to stay; to remain', lv: 3,
    f: {
      'presens': ['blijf', 'blijft', 'blijft', 'blijven', 'blijven', 'blijven'],
      'imperfectum': ['bleef', 'bleef', 'bleef', 'bleven', 'bleven', 'bleven'],
      'perfectum': ['ben gebleven', 'bent gebleven', 'is gebleven', 'zijn gebleven', 'zijn gebleven', 'zijn gebleven'],
    },
  },
  {
    inf: 'schrijven', en: 'to write', lv: 3,
    f: {
      'presens': ['schrijf', 'schrijft', 'schrijft', 'schrijven', 'schrijven', 'schrijven'],
      'imperfectum': ['schreef', 'schreef', 'schreef', 'schreven', 'schreven', 'schreven'],
      'perfectum': ['heb geschreven', 'hebt geschreven', 'heeft geschreven', 'hebben geschreven', 'hebben geschreven', 'hebben geschreven'],
    },
  },
  {
    inf: 'beginnen', en: 'to begin; to start', lv: 3,
    f: {
      'presens': ['begin', 'begint', 'begint', 'beginnen', 'beginnen', 'beginnen'],
      'imperfectum': ['begon', 'begon', 'begon', 'begonnen', 'begonnen', 'begonnen'],
      'perfectum': ['ben begonnen', 'bent begonnen', 'is begonnen', 'zijn begonnen', 'zijn begonnen', 'zijn begonnen'],
    },
  },
  {
    inf: 'vinden', en: 'to find; to think', lv: 3,
    f: {
      'presens': ['vind', 'vindt', 'vindt', 'vinden', 'vinden', 'vinden'],
      'imperfectum': ['vond', 'vond', 'vond', 'vonden', 'vonden', 'vonden'],
      'perfectum': ['heb gevonden', 'hebt gevonden', 'heeft gevonden', 'hebben gevonden', 'hebben gevonden', 'hebben gevonden'],
    },
  },
  {
    inf: 'denken', en: 'to think', lv: 3,
    f: {
      'presens': ['denk', 'denkt', 'denkt', 'denken', 'denken', 'denken'],
      'imperfectum': ['dacht', 'dacht', 'dacht', 'dachten', 'dachten', 'dachten'],
      'perfectum': ['heb gedacht', 'hebt gedacht', 'heeft gedacht', 'hebben gedacht', 'hebben gedacht', 'hebben gedacht'],
    },
  },
  {
    inf: 'brengen', en: 'to bring', lv: 3,
    f: {
      'presens': ['breng', 'brengt', 'brengt', 'brengen', 'brengen', 'brengen'],
      'imperfectum': ['bracht', 'bracht', 'bracht', 'brachten', 'brachten', 'brachten'],
      'perfectum': ['heb gebracht', 'hebt gebracht', 'heeft gebracht', 'hebben gebracht', 'hebben gebracht', 'hebben gebracht'],
    },
  },
  {
    inf: 'worden', en: 'to become', lv: 3,
    f: {
      'presens': ['word', 'wordt', 'wordt', 'worden', 'worden', 'worden'],
      'imperfectum': ['werd', 'werd', 'werd', 'werden', 'werden', 'werden'],
      'perfectum': ['ben geworden', 'bent geworden', 'is geworden', 'zijn geworden', 'zijn geworden', 'zijn geworden'],
    },
  },
  {
    inf: 'helpen', en: 'to help', lv: 3,
    f: {
      'presens': ['help', 'helpt', 'helpt', 'helpen', 'helpen', 'helpen'],
      'imperfectum': ['hielp', 'hielp', 'hielp', 'hielpen', 'hielpen', 'hielpen'],
      'perfectum': ['heb geholpen', 'hebt geholpen', 'heeft geholpen', 'hebben geholpen', 'hebben geholpen', 'hebben geholpen'],
    },
  },
  {
    inf: 'vragen', en: 'to ask', lv: 4,
    f: {
      'presens': ['vraag', 'vraagt', 'vraagt', 'vragen', 'vragen', 'vragen'],
      'imperfectum': ['vroeg', 'vroeg', 'vroeg', 'vroegen', 'vroegen', 'vroegen'],
      'perfectum': ['heb gevraagd', 'hebt gevraagd', 'heeft gevraagd', 'hebben gevraagd', 'hebben gevraagd', 'hebben gevraagd'],
    },
  },
  {
    inf: 'lopen', en: 'to walk', lv: 4,
    f: {
      'presens': ['loop', 'loopt', 'loopt', 'lopen', 'lopen', 'lopen'],
      'imperfectum': ['liep', 'liep', 'liep', 'liepen', 'liepen', 'liepen'],
      'perfectum': ['heb gelopen', 'hebt gelopen', 'heeft gelopen', 'hebben gelopen', 'hebben gelopen', 'hebben gelopen'],
    },
  },
  {
    inf: 'rijden', en: 'to drive; to ride', lv: 4,
    f: {
      'presens': ['rijd', 'rijdt', 'rijdt', 'rijden', 'rijden', 'rijden'],
      'imperfectum': ['reed', 'reed', 'reed', 'reden', 'reden', 'reden'],
      'perfectum': ['heb gereden', 'hebt gereden', 'heeft gereden', 'hebben gereden', 'hebben gereden', 'hebben gereden'],
    },
  },
  {
    inf: 'vergeten', en: 'to forget', lv: 4,
    f: {
      'presens': ['vergeet', 'vergeet', 'vergeet', 'vergeten', 'vergeten', 'vergeten'],
      'imperfectum': ['vergat', 'vergat', 'vergat', 'vergaten', 'vergaten', 'vergaten'],
      'perfectum': ['ben vergeten', 'bent vergeten', 'is vergeten', 'zijn vergeten', 'zijn vergeten', 'zijn vergeten'],
    },
  },
  {
    inf: 'verliezen', en: 'to lose', lv: 4,
    f: {
      'presens': ['verlies', 'verliest', 'verliest', 'verliezen', 'verliezen', 'verliezen'],
      'imperfectum': ['verloor', 'verloor', 'verloor', 'verloren', 'verloren', 'verloren'],
      'perfectum': ['heb verloren', 'hebt verloren', 'heeft verloren', 'hebben verloren', 'hebben verloren', 'hebben verloren'],
    },
  },
  {
    inf: 'kiezen', en: 'to choose', lv: 4,
    f: {
      'presens': ['kies', 'kiest', 'kiest', 'kiezen', 'kiezen', 'kiezen'],
      'imperfectum': ['koos', 'koos', 'koos', 'kozen', 'kozen', 'kozen'],
      'perfectum': ['heb gekozen', 'hebt gekozen', 'heeft gekozen', 'hebben gekozen', 'hebben gekozen', 'hebben gekozen'],
    },
  },
  {
    inf: 'bieden', en: 'to offer', lv: 4,
    f: {
      'presens': ['bied', 'biedt', 'biedt', 'bieden', 'bieden', 'bieden'],
      'imperfectum': ['bood', 'bood', 'bood', 'boden', 'boden', 'boden'],
      'perfectum': ['heb geboden', 'hebt geboden', 'heeft geboden', 'hebben geboden', 'hebben geboden', 'hebben geboden'],
    },
  },
];

export default data;
