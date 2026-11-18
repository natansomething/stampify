import type { Verb } from '../types';

const data: Verb[] = [
  {
    inf: "ser", en: "to be (identity, traits)", lv: 1,
    f: {
      "presente": ["soy", "eres", "es", "somos", "sois", "son"],
      "pretérito": ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
      "imperfecto": ["era", "eras", "era", "éramos", "erais", "eran"],
      "futuro": ["seré", "serás", "será", "seremos", "seréis", "serán"],
      "subjuntivo": ["sea", "seas", "sea", "seamos", "seáis", "sean"],
    },
  },
  {
    inf: "estar", en: "to be (location, states)", lv: 1,
    f: {
      "presente": ["estoy", "estás", "está", "estamos", "estáis", "están"],
      "pretérito": ["estuve", "estuviste", "estuvo", "estuvimos", "estuvisteis", "estuvieron"],
      "imperfecto": ["estaba", "estabas", "estaba", "estábamos", "estabais", "estaban"],
      "futuro": ["estaré", "estarás", "estará", "estaremos", "estaréis", "estarán"],
      "subjuntivo": ["esté", "estés", "esté", "estemos", "estéis", "estén"],
    },
  },
  {
    inf: "tener", en: "to have", lv: 1,
    f: {
      "presente": ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"],
      "pretérito": ["tuve", "tuviste", "tuvo", "tuvimos", "tuvisteis", "tuvieron"],
      "imperfecto": ["tenía", "tenías", "tenía", "teníamos", "teníais", "tenían"],
      "futuro": ["tendré", "tendrás", "tendrá", "tendremos", "tendréis", "tendrán"],
      "subjuntivo": ["tenga", "tengas", "tenga", "tengamos", "tengáis", "tengan"],
    },
  },
  {
    inf: "hacer", en: "to do; to make", lv: 1,
    f: {
      "presente": ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"],
      "pretérito": ["hice", "hiciste", "hizo", "hicimos", "hicisteis", "hicieron"],
      "imperfecto": ["hacía", "hacías", "hacía", "hacíamos", "hacíais", "hacían"],
      "futuro": ["haré", "harás", "hará", "haremos", "haréis", "harán"],
      "subjuntivo": ["haga", "hagas", "haga", "hagamos", "hagáis", "hagan"],
    },
  },
  {
    inf: "ir", en: "to go", lv: 1,
    f: {
      "presente": ["voy", "vas", "va", "vamos", "vais", "van"],
      "pretérito": ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
      "imperfecto": ["iba", "ibas", "iba", "íbamos", "ibais", "iban"],
      "futuro": ["iré", "irás", "irá", "iremos", "iréis", "irán"],
      "subjuntivo": ["vaya", "vayas", "vaya", "vayamos", "vayáis", "vayan"],
    },
  },
  {
    inf: "poder", en: "can; to be able to", lv: 1,
    f: {
      "presente": ["puedo", "puedes", "puede", "podemos", "podéis", "pueden"],
      "pretérito": ["pude", "pudiste", "pudo", "pudimos", "pudisteis", "pudieron"],
      "imperfecto": ["podía", "podías", "podía", "podíamos", "podíais", "podían"],
      "futuro": ["podré", "podrás", "podrá", "podremos", "podréis", "podrán"],
      "subjuntivo": ["pueda", "puedas", "pueda", "podamos", "podáis", "puedan"],
    },
  },
  {
    inf: "decir", en: "to say; to tell", lv: 1,
    f: {
      "presente": ["digo", "dices", "dice", "decimos", "decís", "dicen"],
      "pretérito": ["dije", "dijiste", "dijo", "dijimos", "dijisteis", "dijeron"],
      "imperfecto": ["decía", "decías", "decía", "decíamos", "decíais", "decían"],
      "futuro": ["diré", "dirás", "dirá", "diremos", "diréis", "dirán"],
      "subjuntivo": ["diga", "digas", "diga", "digamos", "digáis", "digan"],
    },
  },
  {
    inf: "querer", en: "to want; to love", lv: 1,
    f: {
      "presente": ["quiero", "quieres", "quiere", "queremos", "queréis", "quieren"],
      "pretérito": ["quise", "quisiste", "quiso", "quisimos", "quisisteis", "quisieron"],
      "imperfecto": ["quería", "querías", "quería", "queríamos", "queríais", "querían"],
      "futuro": ["querré", "querrás", "querrá", "querremos", "querréis", "querrán"],
      "subjuntivo": ["quiera", "quieras", "quiera", "queramos", "queráis", "quieran"],
    },
  },
  {
    inf: "saber", en: "to know (facts); can", lv: 1,
    f: {
      "presente": ["sé", "sabes", "sabe", "sabemos", "sabéis", "saben"],
      "pretérito": ["supe", "supiste", "supo", "supimos", "supisteis", "supieron"],
      "imperfecto": ["sabía", "sabías", "sabía", "sabíamos", "sabíais", "sabían"],
      "futuro": ["sabré", "sabrás", "sabrá", "sabremos", "sabréis", "sabrán"],
      "subjuntivo": ["sepa", "sepas", "sepa", "sepamos", "sepáis", "sepan"],
    },
  },
  {
    inf: "poner", en: "to put; to place", lv: 2,
    f: {
      "presente": ["pongo", "pones", "pone", "ponemos", "ponéis", "ponen"],
      "pretérito": ["puse", "pusiste", "puso", "pusimos", "pusisteis", "pusieron"],
      "imperfecto": ["ponía", "ponías", "ponía", "poníamos", "poníais", "ponían"],
      "futuro": ["pondré", "pondrás", "pondrá", "pondremos", "pondréis", "pondrán"],
      "subjuntivo": ["ponga", "pongas", "ponga", "pongamos", "pongáis", "pongan"],
    },
  },
  {
    inf: "venir", en: "to come", lv: 1,
    f: {
      "presente": ["vengo", "vienes", "viene", "venimos", "venís", "vienen"],
      "pretérito": ["vine", "viniste", "vino", "vinimos", "vinisteis", "vinieron"],
      "imperfecto": ["venía", "venías", "venía", "veníamos", "veníais", "venían"],
      "futuro": ["vendré", "vendrás", "vendrá", "vendremos", "vendréis", "vendrán"],
      "subjuntivo": ["venga", "vengas", "venga", "vengamos", "vengáis", "vengan"],
    },
  },
  {
    inf: "dar", en: "to give", lv: 1,
    f: {
      "presente": ["doy", "das", "da", "damos", "dais", "dan"],
      "pretérito": ["di", "diste", "dio", "dimos", "disteis", "dieron"],
      "imperfecto": ["daba", "dabas", "daba", "dábamos", "dabais", "daban"],
      "futuro": ["daré", "darás", "dará", "daremos", "daréis", "darán"],
      "subjuntivo": ["dé", "des", "dé", "demos", "deis", "den"],
    },
  },
  {
    inf: "ver", en: "to see; to watch", lv: 1,
    f: {
      "presente": ["veo", "ves", "ve", "vemos", "veis", "ven"],
      "pretérito": ["vi", "viste", "vio", "vimos", "visteis", "vieron"],
      "imperfecto": ["veía", "veías", "veía", "veíamos", "veíais", "veían"],
      "futuro": ["veré", "verás", "verá", "veremos", "veréis", "verán"],
      "subjuntivo": ["vea", "veas", "vea", "veamos", "veáis", "vean"],
    },
  },
  {
    inf: "salir", en: "to go out; to leave", lv: 1,
    f: {
      "presente": ["salgo", "sales", "sale", "salimos", "salís", "salen"],
      "pretérito": ["salí", "saliste", "salió", "salimos", "salisteis", "salieron"],
      "imperfecto": ["salía", "salías", "salía", "salíamos", "salíais", "salían"],
      "futuro": ["saldré", "saldrás", "saldrá", "saldremos", "saldréis", "saldrán"],
      "subjuntivo": ["salga", "salgas", "salga", "salgamos", "salgáis", "salgan"],
    },
  },
  {
    inf: "hablar", en: "to speak; to talk", lv: 1,
    f: {
      "presente": ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"],
      "pretérito": ["hablé", "hablaste", "habló", "hablamos", "hablasteis", "hablaron"],
      "imperfecto": ["hablaba", "hablabas", "hablaba", "hablábamos", "hablabais", "hablaban"],
      "futuro": ["hablaré", "hablarás", "hablará", "hablaremos", "hablaréis", "hablarán"],
      "subjuntivo": ["hable", "hables", "hable", "hablemos", "habléis", "hablen"],
    },
  },
  {
    inf: "comer", en: "to eat", lv: 1,
    f: {
      "presente": ["como", "comes", "come", "comemos", "coméis", "comen"],
      "pretérito": ["comí", "comiste", "comió", "comimos", "comisteis", "comieron"],
      "imperfecto": ["comía", "comías", "comía", "comíamos", "comíais", "comían"],
      "futuro": ["comeré", "comerás", "comerá", "comeremos", "comeréis", "comerán"],
      "subjuntivo": ["coma", "comas", "coma", "comamos", "comáis", "coman"],
    },
  },
  {
    inf: "vivir", en: "to live", lv: 1,
    f: {
      "presente": ["vivo", "vives", "vive", "vivimos", "vivís", "viven"],
      "pretérito": ["viví", "viviste", "vivió", "vivimos", "vivisteis", "vivieron"],
      "imperfecto": ["vivía", "vivías", "vivía", "vivíamos", "vivíais", "vivían"],
      "futuro": ["viviré", "vivirás", "vivirá", "viviremos", "viviréis", "vivirán"],
      "subjuntivo": ["viva", "vivas", "viva", "vivamos", "viváis", "vivan"],
    },
  },
  {
    inf: "trabajar", en: "to work", lv: 1,
    f: {
      "presente": ["trabajo", "trabajas", "trabaja", "trabajamos", "trabajáis", "trabajan"],
      "pretérito": ["trabajé", "trabajaste", "trabajó", "trabajamos", "trabajasteis", "trabajaron"],
      "imperfecto": ["trabajaba", "trabajabas", "trabajaba", "trabajábamos", "trabajabais", "trabajaban"],
      "futuro": ["trabajaré", "trabajarás", "trabajará", "trabajaremos", "trabajaréis", "trabajarán"],
      "subjuntivo": ["trabaje", "trabajes", "trabaje", "trabajemos", "trabajéis", "trabajen"],
    },
  },
  {
    inf: "gustar", en: "to please (me gusta = I like)", lv: 1,
    f: {
      "presente": ["gusto", "gustas", "gusta", "gustamos", "gustáis", "gustan"],
      "pretérito": ["gusté", "gustaste", "gustó", "gustamos", "gustasteis", "gustaron"],
      "imperfecto": ["gustaba", "gustabas", "gustaba", "gustábamos", "gustabais", "gustaban"],
      "futuro": ["gustaré", "gustarás", "gustará", "gustaremos", "gustaréis", "gustarán"],
      "subjuntivo": ["guste", "gustes", "guste", "gustemos", "gustéis", "gusten"],
    },
  },
  {
    inf: "escribir", en: "to write", lv: 1,
    f: {
      "presente": ["escribo", "escribes", "escribe", "escribimos", "escribís", "escriben"],
      "pretérito": ["escribí", "escribiste", "escribió", "escribimos", "escribisteis", "escribieron"],
      "imperfecto": ["escribía", "escribías", "escribía", "escribíamos", "escribíais", "escribían"],
      "futuro": ["escribiré", "escribirás", "escribirá", "escribiremos", "escribiréis", "escribirán"],
      "subjuntivo": ["escriba", "escribas", "escriba", "escribamos", "escribáis", "escriban"],
    },
  },
  {
    inf: "leer", en: "to read", lv: 1,
    f: {
      "presente": ["leo", "lees", "lee", "leemos", "leéis", "leen"],
      "pretérito": ["leí", "leíste", "leyó", "leímos", "leísteis", "leyeron"],
      "imperfecto": ["leía", "leías", "leía", "leíamos", "leíais", "leían"],
      "futuro": ["leeré", "leerás", "leerá", "leeremos", "leeréis", "leerán"],
      "subjuntivo": ["lea", "leas", "lea", "leamos", "leáis", "lean"],
    },
  },
  {
    inf: "llegar", en: "to arrive", lv: 1,
    f: {
      "presente": ["llego", "llegas", "llega", "llegamos", "llegáis", "llegan"],
      "pretérito": ["llegué", "llegaste", "llegó", "llegamos", "llegasteis", "llegaron"],
      "imperfecto": ["llegaba", "llegabas", "llegaba", "llegábamos", "llegabais", "llegaban"],
      "futuro": ["llegaré", "llegarás", "llegará", "llegaremos", "llegaréis", "llegarán"],
      "subjuntivo": ["llegue", "llegues", "llegue", "lleguemos", "lleguéis", "lleguen"],
    },
  },
  {
    inf: "pasar", en: "to pass; to happen; to spend (time)", lv: 2,
    f: {
      "presente": ["paso", "pasas", "pasa", "pasamos", "pasáis", "pasan"],
      "pretérito": ["pasé", "pasaste", "pasó", "pasamos", "pasasteis", "pasaron"],
      "imperfecto": ["pasaba", "pasabas", "pasaba", "pasábamos", "pasabais", "pasaban"],
      "futuro": ["pasaré", "pasarás", "pasará", "pasaremos", "pasaréis", "pasarán"],
      "subjuntivo": ["pase", "pases", "pase", "pasemos", "paséis", "pasen"],
    },
  },
  {
    inf: "deber", en: "must; to owe", lv: 2,
    f: {
      "presente": ["debo", "debes", "debe", "debemos", "debéis", "deben"],
      "pretérito": ["debí", "debiste", "debió", "debimos", "debisteis", "debieron"],
      "imperfecto": ["debía", "debías", "debía", "debíamos", "debíais", "debían"],
      "futuro": ["deberé", "deberás", "deberá", "deberemos", "deberéis", "deberán"],
      "subjuntivo": ["deba", "debas", "deba", "debamos", "debáis", "deban"],
    },
  },
  {
    inf: "creer", en: "to believe; to think", lv: 2,
    f: {
      "presente": ["creo", "crees", "cree", "creemos", "creéis", "creen"],
      "pretérito": ["creí", "creíste", "creyó", "creímos", "creísteis", "creyeron"],
      "imperfecto": ["creía", "creías", "creía", "creíamos", "creíais", "creían"],
      "futuro": ["creeré", "creerás", "creerá", "creeremos", "creeréis", "creerán"],
      "subjuntivo": ["crea", "creas", "crea", "creamos", "creáis", "crean"],
    },
  },
  {
    inf: "llevar", en: "to carry; to wear; to take", lv: 2,
    f: {
      "presente": ["llevo", "llevas", "lleva", "llevamos", "lleváis", "llevan"],
      "pretérito": ["llevé", "llevaste", "llevó", "llevamos", "llevasteis", "llevaron"],
      "imperfecto": ["llevaba", "llevabas", "llevaba", "llevábamos", "llevabais", "llevaban"],
      "futuro": ["llevaré", "llevarás", "llevará", "llevaremos", "llevaréis", "llevarán"],
      "subjuntivo": ["lleve", "lleves", "lleve", "llevemos", "llevéis", "lleven"],
    },
  },
  {
    inf: "dejar", en: "to leave; to let", lv: 2,
    f: {
      "presente": ["dejo", "dejas", "deja", "dejamos", "dejáis", "dejan"],
      "pretérito": ["dejé", "dejaste", "dejó", "dejamos", "dejasteis", "dejaron"],
      "imperfecto": ["dejaba", "dejabas", "dejaba", "dejábamos", "dejabais", "dejaban"],
      "futuro": ["dejaré", "dejarás", "dejará", "dejaremos", "dejaréis", "dejarán"],
      "subjuntivo": ["deje", "dejes", "deje", "dejemos", "dejéis", "dejen"],
    },
  },
  {
    inf: "encontrar", en: "to find", lv: 2,
    f: {
      "presente": ["encuentro", "encuentras", "encuentra", "encontramos", "encontráis", "encuentran"],
      "pretérito": ["encontré", "encontraste", "encontró", "encontramos", "encontrasteis", "encontraron"],
      "imperfecto": ["encontraba", "encontrabas", "encontraba", "encontrábamos", "encontrabais", "encontraban"],
      "futuro": ["encontraré", "encontrarás", "encontrará", "encontraremos", "encontraréis", "encontrarán"],
      "subjuntivo": ["encuentre", "encuentres", "encuentre", "encontremos", "encontréis", "encuentren"],
    },
  },
  {
    inf: "pensar", en: "to think", lv: 2,
    f: {
      "presente": ["pienso", "piensas", "piensa", "pensamos", "pensáis", "piensan"],
      "pretérito": ["pensé", "pensaste", "pensó", "pensamos", "pensasteis", "pensaron"],
      "imperfecto": ["pensaba", "pensabas", "pensaba", "pensábamos", "pensabais", "pensaban"],
      "futuro": ["pensaré", "pensarás", "pensará", "pensaremos", "pensaréis", "pensarán"],
      "subjuntivo": ["piense", "pienses", "piense", "pensemos", "penséis", "piensen"],
    },
  },
  {
    inf: "conocer", en: "to know (people, places)", lv: 2,
    f: {
      "presente": ["conozco", "conoces", "conoce", "conocemos", "conocéis", "conocen"],
      "pretérito": ["conocí", "conociste", "conoció", "conocimos", "conocisteis", "conocieron"],
      "imperfecto": ["conocía", "conocías", "conocía", "conocíamos", "conocíais", "conocían"],
      "futuro": ["conoceré", "conocerás", "conocerá", "conoceremos", "conoceréis", "conocerán"],
      "subjuntivo": ["conozca", "conozcas", "conozca", "conozcamos", "conozcáis", "conozcan"],
    },
  },
  {
    inf: "volver", en: "to return; to come back", lv: 2,
    f: {
      "presente": ["vuelvo", "vuelves", "vuelve", "volvemos", "volvéis", "vuelven"],
      "pretérito": ["volví", "volviste", "volvió", "volvimos", "volvisteis", "volvieron"],
      "imperfecto": ["volvía", "volvías", "volvía", "volvíamos", "volvíais", "volvían"],
      "futuro": ["volveré", "volverás", "volverá", "volveremos", "volveréis", "volverán"],
      "subjuntivo": ["vuelva", "vuelvas", "vuelva", "volvamos", "volváis", "vuelvan"],
    },
  },
  {
    inf: "seguir", en: "to follow; to continue", lv: 2,
    f: {
      "presente": ["sigo", "sigues", "sigue", "seguimos", "seguís", "siguen"],
      "pretérito": ["seguí", "seguiste", "siguió", "seguimos", "seguisteis", "siguieron"],
      "imperfecto": ["seguía", "seguías", "seguía", "seguíamos", "seguíais", "seguían"],
      "futuro": ["seguiré", "seguirás", "seguirá", "seguiremos", "seguiréis", "seguirán"],
      "subjuntivo": ["siga", "sigas", "siga", "sigamos", "sigáis", "sigan"],
    },
  },
  {
    inf: "empezar", en: "to begin; to start", lv: 1,
    f: {
      "presente": ["empiezo", "empiezas", "empieza", "empezamos", "empezáis", "empiezan"],
      "pretérito": ["empecé", "empezaste", "empezó", "empezamos", "empezasteis", "empezaron"],
      "imperfecto": ["empezaba", "empezabas", "empezaba", "empezábamos", "empezabais", "empezaban"],
      "futuro": ["empezaré", "empezarás", "empezará", "empezaremos", "empezaréis", "empezarán"],
      "subjuntivo": ["empiece", "empieces", "empiece", "empecemos", "empecéis", "empiecen"],
    },
  },
  {
    inf: "sentir", en: "to feel; to be sorry", lv: 3,
    f: {
      "presente": ["siento", "sientes", "siente", "sentimos", "sentís", "sienten"],
      "pretérito": ["sentí", "sentiste", "sintió", "sentimos", "sentisteis", "sintieron"],
      "imperfecto": ["sentía", "sentías", "sentía", "sentíamos", "sentíais", "sentían"],
      "futuro": ["sentiré", "sentirás", "sentirá", "sentiremos", "sentiréis", "sentirán"],
      "subjuntivo": ["sienta", "sientas", "sienta", "sintamos", "sintáis", "sientan"],
    },
  },
  {
    inf: "pedir", en: "to ask for; to order", lv: 2,
    f: {
      "presente": ["pido", "pides", "pide", "pedimos", "pedís", "piden"],
      "pretérito": ["pedí", "pediste", "pidió", "pedimos", "pedisteis", "pidieron"],
      "imperfecto": ["pedía", "pedías", "pedía", "pedíamos", "pedíais", "pedían"],
      "futuro": ["pediré", "pedirás", "pedirá", "pediremos", "pediréis", "pedirán"],
      "subjuntivo": ["pida", "pidas", "pida", "pidamos", "pidáis", "pidan"],
    },
  },
  {
    inf: "dormir", en: "to sleep", lv: 2,
    f: {
      "presente": ["duermo", "duermes", "duerme", "dormimos", "dormís", "duermen"],
      "pretérito": ["dormí", "dormiste", "durmió", "dormimos", "dormisteis", "durmieron"],
      "imperfecto": ["dormía", "dormías", "dormía", "dormíamos", "dormíais", "dormían"],
      "futuro": ["dormiré", "dormirás", "dormirá", "dormiremos", "dormiréis", "dormirán"],
      "subjuntivo": ["duerma", "duermas", "duerma", "durmamos", "durmáis", "duerman"],
    },
  },
  {
    inf: "jugar", en: "to play (games, sport)", lv: 1,
    f: {
      "presente": ["juego", "juegas", "juega", "jugamos", "jugáis", "juegan"],
      "pretérito": ["jugué", "jugaste", "jugó", "jugamos", "jugasteis", "jugaron"],
      "imperfecto": ["jugaba", "jugabas", "jugaba", "jugábamos", "jugabais", "jugaban"],
      "futuro": ["jugaré", "jugarás", "jugará", "jugaremos", "jugaréis", "jugarán"],
      "subjuntivo": ["juegue", "juegues", "juegue", "juguemos", "juguéis", "jueguen"],
    },
  },
  {
    inf: "entender", en: "to understand", lv: 2,
    f: {
      "presente": ["entiendo", "entiendes", "entiende", "entendemos", "entendéis", "entienden"],
      "pretérito": ["entendí", "entendiste", "entendió", "entendimos", "entendisteis", "entendieron"],
      "imperfecto": ["entendía", "entendías", "entendía", "entendíamos", "entendíais", "entendían"],
      "futuro": ["entenderé", "entenderás", "entenderá", "entenderemos", "entenderéis", "entenderán"],
      "subjuntivo": ["entienda", "entiendas", "entienda", "entendamos", "entendáis", "entiendan"],
    },
  },
  {
    inf: "oír", en: "to hear", lv: 2,
    f: {
      "presente": ["oigo", "oyes", "oye", "oímos", "oís", "oyen"],
      "pretérito": ["oí", "oíste", "oyó", "oímos", "oísteis", "oyeron"],
      "imperfecto": ["oía", "oías", "oía", "oíamos", "oíais", "oían"],
      "futuro": ["oiré", "oirás", "oirá", "oiremos", "oiréis", "oirán"],
      "subjuntivo": ["oiga", "oigas", "oiga", "oigamos", "oigáis", "oigan"],
    },
  },
  {
    inf: "traer", en: "to bring", lv: 2,
    f: {
      "presente": ["traigo", "traes", "trae", "traemos", "traéis", "traen"],
      "pretérito": ["traje", "trajiste", "trajo", "trajimos", "trajisteis", "trajeron"],
      "imperfecto": ["traía", "traías", "traía", "traíamos", "traíais", "traían"],
      "futuro": ["traeré", "traerás", "traerá", "traeremos", "traeréis", "traerán"],
      "subjuntivo": ["traiga", "traigas", "traiga", "traigamos", "traigáis", "traigan"],
    },
  },
];

export default data;
