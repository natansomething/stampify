import type { GrammarNote } from '../types';

const data: GrammarNote[] = [
  // es-1-first-workday
  { text: "es-1-first-workday", s: 0, w: ["primer"], title: "primero → primer", x: "'primero' (first) loses its -o before a masculine singular noun: 'el primer día'. With a feminine noun it stays whole: 'la primera vez'." },
  { text: "es-1-first-workday", s: 2, w: ["Se", "levanta"], title: "Reflexive verb: levantarse", x: "'se levanta' = she gets up, literally 'she lifts herself'. The pronoun changes with the person: me levanto, te levantas, se levanta." },
  { text: "es-1-first-workday", s: 4, w: ["no", "a", "nadie"], title: "Double negative with nadie", x: "With 'nadie' (nobody) Spanish keeps 'no' before the verb: 'no conoce a nadie' = she doesn't know anybody. The 'a' is there because nadie is a person." },
  { text: "es-1-first-workday", s: 5, w: ["Está", "nerviosa"], title: "estar for how you feel", x: "Feelings that can change use estar: 'está nerviosa' (she is nervous right now). The adjective ends in -a because Marta is a woman." },
  { text: "es-1-first-workday", s: 8, w: ["A", "las", "once"], title: "Telling the time: a las…", x: "'a las once' = at eleven. Hours take 'las' because 'horas' is feminine: a las seis, a las ocho; but 'a la una' (at one)." },
  { text: "es-1-first-workday", s: 11, w: ["va", "a", "trabajar"], title: "ir a + infinitive: the future", x: "'va a trabajar' = she is going to work. Use ir (voy, vas, va…) + a + infinitive to talk about plans." },
  // es-1-mexico-city
  { text: "es-1-mexico-city", s: 1, w: ["más", "de", "millones", "de"], title: "más de with numbers", x: "Before a number, 'more than' is 'más de', not 'más que': 'más de nueve millones'. 'millones' is a noun, so it needs 'de' before 'personas'." },
  { text: "es-1-mexico-city", s: 2, w: ["está", "en"], title: "estar for location", x: "Where something is uses estar: 'la ciudad está en un valle'. Ser is for what something is: 'es la capital'." },
  { text: "es-1-mexico-city", s: 3, w: ["hace", "fresco"], title: "Weather with hacer", x: "Spanish uses hacer (to make) for many kinds of weather: 'hace fresco' (it's cool), 'hace calor' (it's hot), 'hace frío' (it's cold)." },
  { text: "es-1-mexico-city", s: 6, w: ["Mucha", "gente", "va"], title: "gente is singular", x: "'la gente' (people) is a singular word, so the verb is singular: 'mucha gente va', not 'van'. Mucho also becomes 'mucha' to agree with it." },
  { text: "es-1-mexico-city", s: 9, w: ["venden"], title: "'they' for people in general", x: "'venden' (they sell) without a subject means 'people sell / you can buy'. Spanish often uses the 'they' form when it doesn't matter who." },
  { text: "es-1-mexico-city", s: 10, w: ["Los", "domingos"], title: "los + day: every …day", x: "'los domingos' = on Sundays (every Sunday). 'el domingo' = on Sunday (one Sunday). There is no word for 'on'." },
  // es-1-pablo-birthday
  { text: "es-1-pablo-birthday", s: 0, w: ["cumple", "años"], title: "cumplir años: to turn", x: "To say how old someone becomes, Spanish uses cumplir: 'cumple cuarenta años' = he turns forty. For age in general it uses tener: 'tiene cuarenta años'." },
  { text: "es-1-pablo-birthday", s: 3, w: ["Vamos"], title: "vamos: let's go", x: "'¿Vamos al cine?' = shall we go to the cinema? 'vamos' is ir for 'we', and it also works as 'let's go'." },
  { text: "es-1-pablo-birthday", s: 4, w: ["dice", "que", "sí"], title: "decir que sí", x: "'dice que sí' = he says yes. Spanish puts 'que' (that) before sí and no here: 'dice que no' = he says no." },
  { text: "es-1-pablo-birthday", s: 7, w: ["Ponen", "hacen"], title: "Irregular yo forms", x: "'ponen' and 'hacen' are regular for 'they', but poner and hacer have an irregular yo form: pongo, hago." },
  { text: "es-1-pablo-birthday", s: 12, w: ["no", "puede", "hablar"], title: "poder + infinitive", x: "'no puede hablar' = he can't speak. poder (can) is followed by an infinitive and changes o to ue: puedo, puedes, puede." },
  { text: "es-1-pablo-birthday", s: 16, w: ["sabe", "tocar"], title: "saber + infinitive: know how", x: "'no sabe tocar la guitarra' = he can't play the guitar (he never learnt). For skills Spanish uses saber, not poder." },
  // es-1-sports
  { text: "es-1-sports", s: 0, w: ["el", "deporte", "más", "popular"], title: "The most…: el + noun + más", x: "'el deporte más popular' = the most popular sport. Spanish puts 'más' + adjective after the noun, with el/la in front." },
  { text: "es-1-sports", s: 1, w: ["juegan", "al"], title: "jugar a + sport", x: "'juegan al fútbol' = they play football. jugar takes 'a' before the game (a + el = al), and its u becomes ue: juego, juegas, juegan." },
  { text: "es-1-sports", s: 4, w: ["el", "fútbol"], title: "Article with general nouns", x: "Spanish uses the article when talking about something in general: 'el fútbol', 'el tenis'. English says just 'football'." },
  { text: "es-1-sports", s: 6, w: ["prefiere"], title: "Stem change e → ie", x: "'prefiere' comes from preferir: the second e becomes ie when stressed. prefiero, prefieres, prefiere, but preferimos." },
  { text: "es-1-sports", s: 10, w: ["Hacer", "es"], title: "Infinitive as subject", x: "'Hacer deporte es bueno' = doing sport is good. Spanish uses the infinitive where English uses an -ing form." },
  { text: "es-1-sports", s: 12, w: ["a", "ti", "te", "gusta"], title: "gustar: to like", x: "'te gusta' means 'it is pleasing to you' = you like it. The thing you like is the subject. 'a ti' adds emphasis: and what about you?" },
  // es-1-lost-keys
  { text: "es-1-lost-keys", s: 1, w: ["tiene", "prisa"], title: "tener prisa", x: "Spanish says 'tener prisa' (to have hurry) for 'to be in a hurry'. In the same way: tener hambre (to be hungry), tener frío (to be cold)." },
  { text: "es-1-lost-keys", s: 3, w: ["encuentra"], title: "Stem change o → ue", x: "'encuentra' comes from encontrar (to find): the o becomes ue when stressed. encuentro, encuentras, encuentra." },
  { text: "es-1-lost-keys", s: 4, w: ["están", "allí"], title: "estar for where things are", x: "'no están allí' = they aren't there. Location always uses estar. 'están' is plural because it refers to 'las llaves'." },
  { text: "es-1-lost-keys", s: 7, w: ["debajo", "del", "detrás", "de"], title: "Place words + de", x: "'debajo de' (under) and 'detrás de' (behind) need 'de'. de + el becomes del: 'debajo del sofá'." },
  { text: "es-1-lost-keys", s: 8, w: ["Tampoco"], title: "tampoco: not either", x: "'Tampoco están allí' = they aren't there either. tampoco is the negative of también and needs no extra 'no' when it comes first." },
  { text: "es-1-lost-keys", s: 12, w: ["por", "qué"], title: "¿por qué? and porque", x: "'¿por qué?' (two words, accent) = why? The answer uses 'porque' (one word, no accent) = because." },
  { text: "es-1-lost-keys", s: 17, w: ["corriendo"], title: "Gerund: -ando / -iendo", x: "'corriendo' (running) is the gerund of correr. -ar verbs add -ando (hablando), -er and -ir verbs add -iendo (comiendo, saliendo)." },
];

export default data;
