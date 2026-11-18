import type { GrammarNote } from '../types';

const data: GrammarNote[] = [
  // es-1-new-flat
  { text: "es-1-new-flat", s: 0, w: ["tengo"], title: "tener: I have", x: "'tengo' is the yo form of tener (to have). It is irregular: tengo, tienes, tiene, tenemos, tienen." },
  { text: "es-1-new-flat", s: 1, w: ["piso", "pequeño", "bonito"], title: "Adjectives match the noun", x: "'piso' is masculine, so its adjectives end in -o: 'pequeño', 'bonito'. With a feminine noun: 'una casa pequeña'." },
  { text: "es-1-new-flat", s: 2, w: ["habitaciones"], title: "Plural after a consonant: -es", x: "Nouns ending in a consonant add -es in the plural: habitación → habitaciones. The written accent disappears in the plural." },
  { text: "es-1-new-flat", s: 5, w: ["veo"], title: "ver: I see", x: "'veo' is the yo form of ver (to see): veo, ves, ve. Spanish often says 'veo' where English says 'I can see'." },
  { text: "es-1-new-flat", s: 7, w: ["Toca", "todas", "las", "noches"], title: "todos los / todas las: every", x: "'todas las noches' = every night (literally 'all the nights'). With masculine nouns: 'todos los días'. 'tocar' is the verb for playing an instrument." },
  { text: "es-1-new-flat", s: 9, w: ["duermo"], title: "Stem change o → ue", x: "'duermo' is from dormir (to sleep): the o becomes ue in stressed forms. Duermo, duermes, duerme, but dormimos." },
  // es-1-family-photo
  { text: "es-1-family-photo", s: 0, w: ["Esta"], title: "este / esta: this", x: "'Esta' (this) is feminine because 'foto' is feminine (una foto, even though it ends in -o). For masculine nouns: 'este piso'." },
  { text: "es-1-family-photo", s: 3, w: ["Es", "médico"], title: "No article with jobs", x: "With ser + a job, Spanish leaves out 'a': 'es médico' = he is a doctor, 'es profesora' = she is a teacher." },
  { text: "es-1-family-photo", s: 4, w: ["del"], title: "de + el = del", x: "'de' and 'el' always join: 'la mujer del pelo corto', not 'de el'. 'de la' does not change." },
  { text: "es-1-family-photo", s: 5, w: ["profesora"], title: "Feminine jobs in -a", x: "Many job words change -o/-or to -a/-ora for women: profesor → profesora, médico → médica." },
  { text: "es-1-family-photo", s: 7, w: ["tiene", "años"], title: "Age with tener", x: "Spanish 'has' years: 'tiene quince años' = he is fifteen. Never use ser for age." },
  { text: "es-1-family-photo", s: 11, w: ["todos", "miran", "mira"], title: "todos takes a plural verb", x: "'todos' (everyone, literally 'all') is plural, so the verb is plural: 'todos miran'. For one person, Toby: 'mira'." },
  // es-1-weather
  { text: "es-1-weather", s: 1, w: ["no", "es"], title: "no before the verb", x: "'no es igual' = it is not the same. 'no' always goes directly before the verb." },
  { text: "es-1-weather", s: 2, w: ["llueve", "hay"], title: "Weather verbs without a subject", x: "'llueve' (it rains) has no word for 'it'; the verb alone is enough. 'hay' = there is / there are." },
  { text: "es-1-weather", s: 4, w: ["inviernos", "fríos"], title: "Plural adjectives", x: "The adjective is plural when the noun is: 'los inviernos son fríos', 'los veranos son calurosos'." },
  { text: "es-1-weather", s: 6, w: ["hace", "calor"], title: "hace calor: it is hot", x: "For heat and cold Spanish uses hacer (to make) with a noun: 'hace calor' (it is hot), 'hace frío' (it is cold). Not 'es caliente'." },
  { text: "es-1-weather", s: 8, w: ["Te", "gusta"], title: "gustar: to like", x: "'¿Te gusta el frío?' means 'does the cold please you?'. The thing liked is the subject, so 'gusta' is singular; te = to you." },
  // es-1-corner-bakery
  { text: "es-1-corner-bakery", s: 0, w: ["a", "las", "ocho"], title: "Telling the time: a las", x: "'a las ocho' = at eight o'clock. Hours take 'las' (las horas): a las diez; one o'clock is 'a la una'." },
  { text: "es-1-corner-bakery", s: 2, w: ["Es", "está"], title: "ser vs estar", x: "'Es simpática' uses ser for a character trait. 'está contenta' uses estar for a mood or state." },
  { text: "es-1-corner-bakery", s: 3, w: ["está", "cerrada"], title: "estar + cerrado / abierto", x: "Whether a shop is open or closed is a state, so it takes estar: 'está cerrada', 'está abierta'. The ending -a matches 'panadería'." },
  { text: "es-1-corner-bakery", s: 6, w: ["Voy"], title: "ir: I go", x: "'Voy' is the irregular yo form of ir (to go): voy, vas, va, vamos, van. 'al' = a + el." },
  { text: "es-1-corner-bakery", s: 11, w: ["Qué", "buen"], title: "¡Qué...! and buen", x: "'¡Qué + noun!' = What a ...! 'bueno' loses its -o before a masculine singular noun: 'buen día', 'un buen amigo'." },
  // es-1-my-weekend
  { text: "es-1-my-weekend", s: 1, w: ["me", "encanta"], title: "encantar: to love", x: "'me encanta' works like gustar: the weekend delights me. It is stronger than 'me gusta'." },
  { text: "es-1-my-weekend", s: 2, w: ["El", "me", "levanto"], title: "Reflexive verbs; days without 'on'", x: "'me levanto' (I get up) is from levantarse: the 'me' shows the action is done to yourself. 'El sábado' = on Saturday, no word for 'on'." },
  { text: "es-1-my-weekend", s: 4, w: ["juego", "al"], title: "jugar a: to play a sport", x: "'juego' is from jugar, which changes u to ue. Sports and games take 'a': 'juego al fútbol' (a + el = al)." },
  { text: "es-1-my-weekend", s: 5, w: ["perdemos"], title: "nosotros form: -emos", x: "'perdemos' (we lose) is perder for 'we': -er verbs end in -emos. -ar verbs use -amos: 'cenamos'." },
  { text: "es-1-my-weekend", s: 8, w: ["a", "mis", "padres"], title: "Personal a", x: "When the object of a verb is a person, Spanish puts 'a' before it: 'visito a mis padres'. Compare 'visito Madrid'." },
  { text: "es-1-my-weekend", s: 10, w: ["vuelvo"], title: "volver: o → ue", x: "'vuelvo' is from volver (to come/go back), another o → ue verb: vuelvo, vuelves, vuelve, volvemos." },
];

export default data;
