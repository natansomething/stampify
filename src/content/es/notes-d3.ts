import type { GrammarNote } from '../types';

const data: GrammarNote[] = [
  // es-2-at-the-doctor
  { text: "es-2-at-the-doctor", s: 0, w: ["se", "despertó"], title: "Reflexive verb despertarse", x: "'se despertó' (he woke up) comes from despertarse. The pronoun goes before the verb: me desperté, te despertaste, se despertó." },
  { text: "es-2-at-the-doctor", s: 1, w: ["tenía", "dolía"], title: "Imperfect for description", x: "'tenía' and 'dolía' are imperfect: they describe how he felt, not a single event. -er verbs take -ía: tener → tenía, doler → dolía." },
  { text: "es-2-at-the-doctor", s: 3, w: ["fue", "al"], title: "Preterite of ir: fue", x: "'fue' (he went) is the irregular preterite of ir: fui, fuiste, fue. 'a' + 'el' always joins into 'al'." },
  { text: "es-2-at-the-doctor", s: 4, w: ["había"], title: "había: there was / there were", x: "'había' is the past of 'hay'. Like hay, it never changes for the plural: 'había muchas personas'." },
  { text: "es-2-at-the-doctor", s: 6, w: ["Mientras", "esperaba", "leyó"], title: "Imperfect + preterite", x: "'mientras esperaba' (while he was waiting) is imperfect: the background. 'leyó' (he read) is preterite: a complete action. Leer adds a y: leyó." },
  { text: "es-2-at-the-doctor", s: 8, w: ["le", "pasa"], title: "usted: the polite 'you'", x: "The doctor uses usted, so she says 'le pasa' and 'tiene' (he/she forms). To a friend she would say '¿Qué te pasa?' and 'tienes'." },
  { text: "es-2-at-the-doctor", s: 9, w: ["Me", "duele"], title: "doler works like gustar", x: "With doler, the part that hurts is the subject: 'me duele la garganta' = my throat hurts. Two things: 'me duelen los pies'. Spanish uses 'la', not 'my', for body parts." },
  { text: "es-2-at-the-doctor", s: 12, w: ["Puedo", "ir"], title: "poder + infinitive", x: "'¿Puedo ir?' = can I go? poder (can) is followed by an infinitive and changes o to ue: puedo, puedes, puede." },
  { text: "es-2-at-the-doctor", s: 16, w: ["se", "puso", "el", "pijama"], title: "Irregular preterite: puso", x: "'se puso' (he put on) is the preterite of ponerse: puse, pusiste, puso. With clothes Spanish says 'el pijama', not 'his pyjamas'." },
  // es-2-paella-history
  { text: "es-2-paella-history", s: 0, w: ["más", "famoso"], title: "The most…: el más + adjective", x: "'el plato más famoso de España' = the most famous dish in Spain. After a superlative, 'in' is 'de': 'de España'." },
  { text: "es-2-paella-history", s: 1, w: ["Hace", "años"], title: "hace + time = ago", x: "'hace doscientos años' = two hundred years ago. 'más de' + a number means 'more than'." },
  { text: "es-2-paella-history", s: 2, w: ["Usaban", "hacían"], title: "Imperfect for past habits", x: "'usaban' and 'hacían' say what farmers usually did. -ar verbs end in -aba(n); -er and -ir verbs in -ía(n)." },
  { text: "es-2-paella-history", s: 3, w: ["lo", "que"], title: "lo que: what, whatever", x: "'lo que tenían' = what they had. 'lo que' stands for a thing without naming it." },
  { text: "es-2-paella-history", s: 5, w: ["se", "cultivaba"], title: "se for 'is done'", x: "'se cultivaba' = it was grown, without saying who grew it. Spanish often uses se + verb where English uses a passive." },
  { text: "es-2-paella-history", s: 7, w: ["la", "probaron"], title: "Object pronoun before the verb", x: "'la' (it) stands for 'la paella' and comes before the verb: 'la probaron' = they tried it. 'probaron' is the preterite of probar." },
  { text: "es-2-paella-history", s: 9, w: ["la", "de"], title: "la de: the one with", x: "'la de pollo' = the one with chicken. The noun paella is left out: 'la (paella) de pollo'." },
  { text: "es-2-paella-history", s: 12, w: ["lo", "mejor", "del"], title: "lo mejor: the best thing", x: "'lo' + adjective makes 'the … thing/part': 'lo mejor' = the best part. 'del' is de + el: 'del fondo' = of the bottom." },
  // es-2-grandparents-summer
  { text: "es-2-grandparents-summer", s: 0, w: ["era", "pasaba"], title: "Imperfect: how things used to be", x: "'era niña' and 'pasaba todos los veranos' describe her childhood and habits, so they are imperfect. ser is irregular: era, eras, era." },
  { text: "es-2-grandparents-summer", s: 2, w: ["al", "día"], title: "al día: a day, per day", x: "'dos veces al día' = twice a day. Spanish uses 'al' (or 'a la' for feminine nouns: 'una vez a la semana')." },
  { text: "es-2-grandparents-summer", s: 3, w: ["se", "levantaba", "para"], title: "para + infinitive: in order to", x: "'se levantaba' (she used to get up) is levantarse in the imperfect. 'para dar de comer' = in order to feed." },
  { text: "es-2-grandparents-summer", s: 5, w: ["íbamos"], title: "ir in the imperfect: iba", x: "'íbamos' (we used to go) is ir in the imperfect. Only three verbs are irregular here: ir (iba), ser (era), ver (veía)." },
  { text: "es-2-grandparents-summer", s: 6, w: ["nunca", "nada", "me", "daba", "igual"], title: "Double negatives; me da igual", x: "Spanish keeps both negatives: 'nunca pescábamos nada' = we never caught anything. 'me daba igual' = I didn't mind (literally 'it was the same to me')." },
  { text: "es-2-grandparents-summer", s: 8, w: ["hubo"], title: "Preterite for one event", x: "'hubo una tormenta' tells a single event that breaks the routine, so it is preterite. 'hubo' is the preterite of 'hay'." },
  { text: "es-2-grandparents-summer", s: 11, w: ["conoció", "a"], title: "conocer in the preterite: met", x: "In the preterite, conocer means 'to meet for the first time'. A person as object takes 'a': 'conoció a mi abuela'." },
  { text: "es-2-grandparents-summer", s: 12, w: ["mejor", "que", "nadie"], title: "Comparison: mejor que", x: "'mejor que nadie' = better than anyone. 'que' introduces the second part of a comparison; 'mejor' is the irregular comparative of bien." },
  { text: "es-2-grandparents-summer", s: 15, w: ["enciendo"], title: "Stem change e → ie", x: "'enciendo' comes from encender: the e becomes ie when stressed (enciendo, enciendes, enciende), but not in 'encendemos'." },
  // es-2-day-of-the-dead
  { text: "es-2-day-of-the-dead", s: 1, w: ["Se", "celebra"], title: "se for 'is done'", x: "'se celebra' = it is celebrated. Dates take 'el' and no word for 'on': 'el uno de noviembre'." },
  { text: "es-2-day-of-the-dead", s: 2, w: ["gente", "piensa"], title: "gente is singular", x: "'la gente' is singular, so the verb is 'piensa'. pensar changes e to ie: pienso, piensa, pensamos." },
  { text: "es-2-day-of-the-dead", s: 3, w: ["ya", "no", "están"], title: "ya no: no longer", x: "'ya no están' = they are no longer here. ya no + verb says that something has stopped." },
  { text: "es-2-day-of-the-dead", s: 6, w: ["ayuda", "a", "a", "encontrar"], title: "ayudar a + infinitive", x: "'ayuda a los muertos a encontrar el camino' = helps the dead find the way. 'a' goes before the person and again before the infinitive." },
  { text: "es-2-day-of-the-dead", s: 8, w: ["que"], title: "que: that, which", x: "'que' links a description to a noun: 'un pan que solo se come…' = a bread that is only eaten… Unlike English 'that', que is never left out." },
  { text: "es-2-day-of-the-dead", s: 11, w: ["de", "azúcar", "escrito"], title: "de for material; participle", x: "'calaveras de azúcar' = skulls made of sugar. 'escrito' (written) is the irregular participle of escribir, used here like an adjective." },
  { text: "es-2-day-of-the-dead", s: 14, w: ["cuentan"], title: "Stem change o → ue", x: "'cuentan' comes from contar: the o becomes ue when stressed (cuento, cuentas, cuentan), but not in 'contamos'." },
  // es-2-flatmates
  { text: "es-2-flatmates", s: 0, w: ["empezó", "a", "trabajar"], title: "empezar a + infinitive", x: "'empezó a trabajar' = she started working. empezar always takes 'a' before an infinitive. English uses -ing here." },
  { text: "es-2-flatmates", s: 2, w: ["era", "dejaba"], title: "Imperfect for description", x: "'era' describes what Javier was like and 'dejaba' what he usually did, so both are imperfect. 'siempre' often goes with the imperfect." },
  { text: "es-2-flatmates", s: 4, w: ["a", "Sofía"], title: "Personal a", x: "When the object of a verb is a person, Spanish puts 'a' before it: 'veía a Sofía' = she saw Sofía." },
  { text: "es-2-flatmates", s: 6, w: ["faltaba"], title: "faltar: to be missing", x: "With faltar the missing thing is the subject: 'faltaba uno de sus yogures' = one of her yogurts was missing." },
  { text: "es-2-flatmates", s: 9, w: ["tenía", "hambre"], title: "tener hambre: to be hungry", x: "Spanish says you 'have' hunger: 'tener hambre'. Also 'tener miedo' (to be afraid) and 'tener frío' (to be cold)." },
  { text: "es-2-flatmates", s: 11, w: ["no", "sino"], title: "no… sino: not… but", x: "After a negative, 'but (rather)' is 'sino', not 'pero': 'no de vergüenza, sino de rabia'." },
  { text: "es-2-flatmates", s: 13, w: ["me", "gustan"], title: "gustar with a plural", x: "'me gustan' because the yogurts (plural) are the subject. With one thing: 'me gusta el yogur'." },
  { text: "es-2-flatmates", s: 14, w: ["toquen"], title: "Command to several people", x: "'no toquen' (don't touch) is the ustedes command of tocar. The c becomes qu before e to keep the same sound." },
  { text: "es-2-flatmates", s: 16, w: ["pensaba", "eran"], title: "Imperfect for thoughts", x: "'pensaba que eran de todos' = I thought they were for everyone. Beliefs and states in the past usually take the imperfect." },
  { text: "es-2-flatmates", s: 18, w: ["se", "sintió"], title: "Preterite with e → i", x: "'se sintió' (she felt) is sentirse. -ir verbs with a stem change turn e into i in the he/she preterite: sentir → sintió, pedir → pidió." },
];

export default data;
