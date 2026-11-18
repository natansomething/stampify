import type { Text } from '../types';

/** Second batch of texts, all levels. */
const data: Text[] = [
  {
    id: "es-1-neighbor-cat",
    lv: 1,
    kind: "story",
    title: "El gato de la vecina",
    titleEn: "The neighbour's cat",
    s: [
      {
        t: [["Mi", "", "my", "mi"], ["vecina", "", "neighbour"], ["Rosa", "", "Rosa"], ["tiene", "", "has", "tener"], ["un", "", "a", "uno"], ["gato", "", "cat"], ["negro", "", "black"], [".", "", ""]],
        en: "My neighbour Rosa has a black cat.",
      },
      {
        t: [["El", "", "the", "el"], ["gato", "", "cat"], ["se", "", "himself"], ["llama", "", "is called", "llamar"], ["Sol", "", "Sol"], [".", "", ""]],
        en: "The cat is called Sol.",
      },
      {
        t: [["Todas", "", "all", "todo"], ["las", "", "the", "el"], ["mañanas", "", "mornings", "mañana"], [",", "", ""], ["Sol", "", "Sol"], ["entra", "", "comes in", "entrar"], ["en", "", "into"], ["mi", "", "my"], ["cocina", "", "kitchen"], ["por", "", "through"], ["la", "", "the", "el"], ["ventana", "", "window"], [".", "", ""]],
        en: "Every morning, Sol comes into my kitchen through the window.",
      },
      {
        t: [["Yo", "", "I", "yo"], ["le", "", "(to) him"], ["doy", "", "give", "dar"], ["un", "", "a", "uno"], ["poco", "", "little"], ["de", "", "of"], ["jamón", "", "ham"], [".", "", ""]],
        en: "I give him a little ham.",
      },
      {
        t: [["Después", "", "afterwards", "después"], [",", "", ""], ["el", "", "the"], ["gato", "", "cat"], ["duerme", "", "sleeps", "dormir"], ["en", "", "on"], ["mi", "", "my"], ["sofá", "", "sofa"], [".", "", ""]],
        en: "Afterwards, the cat sleeps on my sofa.",
      },
      {
        t: [["Por", "", "in", "por"], ["la", "", "the", "el"], ["tarde", "", "afternoon"], [",", "", ""], ["Sol", "", "Sol"], ["vuelve", "", "goes back", "volver"], ["a", "", "to"], ["casa", "", "house"], ["de", "", "of"], ["Rosa", "", "Rosa"], [".", "", ""]],
        en: "In the afternoon, Sol goes back to Rosa's house.",
      },
      {
        t: [["Un", "", "one", "uno"], ["día", "", "day"], [",", "", ""], ["Rosa", "", "Rosa"], ["habla", "", "talks", "hablar"], ["conmigo", "", "with me"], ["en", "", "on"], ["la", "", "the", "el"], ["escalera", "", "stairs"], [".", "", ""]],
        en: "One day, Rosa talks to me on the stairs.",
      },
      {
        t: [["Está", "", "she is", "estar"], ["preocupada", "", "worried", "preocupado"], [":", "", ""], ["su", "", "her"], ["gato", "", "cat"], ["está", "", "is", "estar"], ["muy", "", "very"], ["gordo", "", "fat"], [",", "", ""], ["pero", "", "but"], ["en", "", "at"], ["casa", "", "home"], ["come", "", "eats", "comer"], ["poco", "", "little"], [".", "", ""]],
        en: "She is worried: her cat is very fat, but he eats little at home.",
      },
      {
        t: [["Yo", "", "I", "yo"], ["no", "", "not"], ["digo", "", "say", "decir"], ["nada", "", "anything"], [".", "", ""]],
        en: "I don't say anything.",
      },
      {
        t: [["El", "", "on", "el"], ["martes", "", "Tuesday"], [",", "", ""], ["veo", "", "I see", "ver"], ["a", "", "(object marker)"], ["Sol", "", "Sol"], ["en", "", "in"], ["la", "", "the", "el"], ["ventana", "", "window"], ["de", "", "of"], ["otro", "", "another"], ["vecino", "", "neighbour"], [".", "", ""]],
        en: "On Tuesday, I see Sol in another neighbour's window.",
      },
      {
        t: [["Ese", "", "that", "ese"], ["vecino", "", "neighbour"], [",", "", ""], ["don", "", "Mr"], ["Manuel", "", "Manuel"], [",", "", ""], ["también", "", "also"], ["le", "", "(to) him"], ["da", "", "gives", "dar"], ["jamón", "", "ham"], [".", "", ""]],
        en: "That neighbour, Mr Manuel, also gives him ham.",
      },
      {
        t: [["¡", "", ""], ["Sol", "", "Sol"], ["tiene", "", "has", "tener"], ["tres", "", "three"], ["casas", "", "houses", "casa"], ["y", "", "and"], ["tres", "", "three"], ["desayunos", "", "breakfasts", "desayuno"], ["!", "", ""]],
        en: "Sol has three houses and three breakfasts!",
      },
      {
        t: [["Ahora", "", "now", "ahora"], ["Rosa", "", "Rosa"], [",", "", ""], ["don", "", "Mr"], ["Manuel", "", "Manuel"], ["y", "", "and"], ["yo", "", "I"], ["tenemos", "", "have", "tener"], ["un", "", "a", "uno"], ["plan", "", "plan"], [":", "", ""], ["no", "", "no"], ["más", "", "more"], ["jamón", "", "ham"], ["para", "", "for"], ["Sol", "", "Sol"], [".", "", ""]],
        en: "Now Rosa, Mr Manuel and I have a plan: no more ham for Sol.",
      },
    ],
    q: [
      { q: "What colour is the cat?", o: ["Black", "White", "Grey"], a: 0 },
      { q: "What does the narrator give the cat?", o: ["Milk", "Ham", "Fish"], a: 1 },
      { q: "Why is Rosa worried?", o: ["The cat is lost", "The cat is very fat", "The cat doesn't sleep"], a: 1 },
      { q: "How many houses does Sol visit?", o: ["One", "Two", "Three"], a: 2 },
      { q: "What is the plan at the end?", o: ["No more ham for Sol", "To buy a new cat", "To close all the windows"], a: 0 },
    ],
  },
  {
    id: "es-1-tapas",
    lv: 1,
    kind: "article",
    title: "Las tapas",
    titleEn: "Tapas",
    s: [
      {
        t: [["En", "", "in", "en"], ["España", "", "Spain"], [",", "", ""], ["la", "", "the", "el"], ["gente", "", "people"], ["come", "", "eats", "comer"], ["tapas", "", "tapas", "tapa"], ["con", "", "with"], ["los", "", "the", "el"], ["amigos", "", "friends", "amigo"], [".", "", ""]],
        en: "In Spain, people eat tapas with their friends.",
      },
      {
        t: [["Una", "", "a", "uno"], ["tapa", "", "tapa"], ["es", "", "is", "ser"], ["un", "", "a", "uno"], ["plato", "", "dish"], ["pequeño", "", "small"], [".", "", ""]],
        en: "A tapa is a small dish.",
      },
      {
        t: [["Hay", "", "there are", "haber"], ["tapas", "", "tapas", "tapa"], ["de", "", "of"], ["queso", "", "cheese"], [",", "", ""], ["de", "", "of"], ["jamón", "", "ham"], [",", "", ""], ["de", "", "of"], ["pescado", "", "fish"], ["y", "", "and"], ["de", "", "of"], ["verduras", "", "vegetables", "verdura"], [".", "", ""]],
        en: "There are cheese, ham, fish and vegetable tapas.",
      },
      {
        t: [["La", "", "the", "el"], ["tortilla", "", "omelette"], ["de", "", "of"], ["patatas", "", "potatoes", "patata"], ["es", "", "is", "ser"], ["una", "", "a", "uno"], ["tapa", "", "tapa"], ["muy", "", "very"], ["popular", "", "popular"], [".", "", ""]],
        en: "Potato omelette is a very popular tapa.",
      },
      {
        t: [["La", "", "the", "el"], ["gente", "", "people"], ["toma", "", "has", "tomar"], ["las", "", "the", "el"], ["tapas", "", "tapas", "tapa"], ["en", "", "in"], ["los", "", "the", "el"], ["bares", "", "bars", "bar"], [".", "", ""]],
        en: "People have tapas in bars.",
      },
      {
        t: [["Muchas", "", "many", "mucho"], ["personas", "", "people", "persona"], ["comen", "", "eat", "comer"], ["de", "", "on"], ["pie", "", "foot"], [",", "", ""], ["en", "", "at"], ["la", "", "the", "el"], ["barra", "", "bar counter"], [".", "", ""]],
        en: "Many people eat standing up, at the bar.",
      },
      {
        t: [["En", "", "in", "en"], ["algunas", "", "some", "alguno"], ["ciudades", "", "cities", "ciudad"], [",", "", ""], ["como", "", "like"], ["Granada", "", "Granada"], [",", "", ""], ["la", "", "the", "el"], ["tapa", "", "tapa"], ["es", "", "is", "ser"], ["gratis", "", "free"], ["con", "", "with"], ["la", "", "the", "el"], ["bebida", "", "drink"], [".", "", ""]],
        en: "In some cities, like Granada, the tapa is free with your drink.",
      },
      {
        t: [["Pides", "", "you order", "pedir"], ["una", "", "a", "uno"], ["cerveza", "", "beer"], ["o", "", "or"], ["un", "", "a", "uno"], ["refresco", "", "soft drink"], ["y", "", "and"], ["el", "", "the"], ["camarero", "", "waiter"], ["trae", "", "brings", "traer"], ["una", "", "a", "uno"], ["tapa", "", "tapa"], [".", "", ""]],
        en: "You order a beer or a soft drink and the waiter brings a tapa.",
      },
      {
        t: [["Normalmente", "", "usually", "normalmente"], [",", "", ""], ["la", "", "the", "el"], ["gente", "", "people"], ["va", "", "goes", "ir"], ["a", "", "to"], ["varios", "", "several", "vario"], ["bares", "", "bars", "bar"], ["en", "", "in"], ["una", "", "one", "uno"], ["noche", "", "night"], [".", "", ""]],
        en: "People usually go to several bars in one night.",
      },
      {
        t: [["En", "", "in", "en"], ["cada", "", "each"], ["bar", "", "bar"], [",", "", ""], ["toman", "", "they have", "tomar"], ["una", "", "a", "uno"], ["bebida", "", "drink"], ["y", "", "and"], ["una", "", "a", "uno"], ["tapa", "", "tapa"], [".", "", ""]],
        en: "In each bar, they have a drink and a tapa.",
      },
      {
        t: [["Ir", "", "to go", "ir"], ["de", "", "for"], ["tapas", "", "tapas", "tapa"], ["es", "", "is", "ser"], ["una", "", "a", "uno"], ["forma", "", "way"], ["de", "", "of"], ["comer", "", "eating"], [",", "", ""], ["pero", "", "but"], ["también", "", "also"], ["de", "", "of"], ["hablar", "", "talking"], ["con", "", "with"], ["los", "", "the", "el"], ["amigos", "", "friends", "amigo"], [".", "", ""]],
        en: "Going out for tapas is a way of eating, but also of talking with friends.",
      },
      {
        t: [["¡", "", ""], ["Es", "", "it is", "ser"], ["una", "", "a", "uno"], ["costumbre", "", "custom"], ["muy", "", "very"], ["divertida", "", "fun", "divertido"], ["!", "", ""]],
        en: "It's a very fun custom!",
      },
    ],
    q: [
      { q: "What is a tapa?", o: ["A big dinner", "A small dish", "A type of drink"], a: 1 },
      { q: "Which tapa is very popular?", o: ["Potato omelette", "Fish soup", "Chocolate cake"], a: 0 },
      { q: "Where do many people eat tapas?", o: ["At home at the table", "Standing at the bar", "In the park"], a: 1 },
      { q: "What is special about Granada?", o: ["It has no bars", "The tapa is free with a drink", "People don't drink beer there"], a: 1 },
      { q: "What do people usually do in one night?", o: ["Stay in one bar", "Go to several bars", "Cook tapas at home"], a: 1 },
    ],
  },
  {
    id: "es-2-salsa-class",
    lv: 2,
    kind: "story",
    title: "La clase de salsa",
    titleEn: "The salsa class",
    s: [
      {
        t: [["El", "", "the", "el"], ["año", "", "year"], ["pasado", "", "last"], [",", "", ""], ["Elena", "", "Elena"], ["decidió", "", "decided", "decidir"], ["aprender", "", "to learn"], ["a", "", "to"], ["bailar", "", "dance"], ["salsa", "", "salsa"], [".", "", ""]],
        en: "Last year, Elena decided to learn to dance salsa.",
      },
      {
        t: [["Nunca", "", "never", "nunca"], ["bailaba", "", "she danced", "bailar"], ["en", "", "at"], ["las", "", "the", "el"], ["fiestas", "", "parties", "fiesta"], ["porque", "", "because"], ["le", "", "to her"], ["daba", "", "gave", "dar"], ["vergüenza", "", "embarrassment"], [".", "", ""]],
        en: "She never danced at parties because she felt embarrassed.",
      },
      {
        t: [["Un", "", "one", "uno"], ["martes", "", "Tuesday"], ["por", "", "in"], ["la", "", "the", "el"], ["noche", "", "evening"], [",", "", ""], ["fue", "", "she went", "ir"], ["a", "", "to"], ["su", "", "her"], ["primera", "", "first", "primero"], ["clase", "", "class"], ["en", "", "at"], ["una", "", "a", "uno"], ["escuela", "", "school"], ["del", "", "of the", "de"], ["centro", "", "town centre"], [".", "", ""]],
        en: "One Tuesday evening, she went to her first class at a school in the town centre.",
      },
      {
        t: [["Había", "", "there were", "haber"], ["veinte", "", "twenty"], ["personas", "", "people", "persona"], ["y", "", "and"], ["todas", "", "all of them", "todo"], ["parecían", "", "seemed", "parecer"], ["expertas", "", "experts", "experto"], [".", "", ""]],
        en: "There were twenty people and they all looked like experts.",
      },
      {
        t: [["El", "", "the", "el"], ["profesor", "", "teacher"], [",", "", ""], ["un", "", "a", "uno"], ["chico", "", "young man"], ["muy", "", "very"], ["simpático", "", "friendly"], [",", "", ""], ["puso", "", "put on", "poner"], ["la", "", "the", "el"], ["música", "", "music"], [".", "", ""]],
        en: "The teacher, a very friendly young man, put the music on.",
      },
      {
        t: [["Elena", "", "Elena"], ["intentó", "", "tried", "intentar"], ["seguir", "", "to follow"], ["los", "", "the", "el"], ["pasos", "", "steps", "paso"], [",", "", ""], ["pero", "", "but"], ["se", "", "herself"], ["equivocaba", "", "made mistakes", "equivocarse"], ["todo", "", "all"], ["el", "", "the"], ["tiempo", "", "time"], [".", "", ""]],
        en: "Elena tried to follow the steps, but she kept getting them wrong.",
      },
      {
        t: [["Pisó", "", "she stepped on", "pisar"], ["a", "", "(object marker)"], ["su", "", "her"], ["compañero", "", "partner"], ["tres", "", "three"], ["veces", "", "times", "vez"], ["y", "", "and"], ["se", "", "herself"], ["puso", "", "became", "ponerse"], ["muy", "", "very"], ["roja", "", "red", "rojo"], [".", "", ""]],
        en: "She stepped on her partner three times and went bright red.",
      },
      {
        t: [["Al", "", "at the", "a"], ["final", "", "end"], ["de", "", "of"], ["la", "", "the", "el"], ["clase", "", "class"], [",", "", ""], ["quería", "", "she wanted", "querer"], ["irse", "", "to go (away)"], ["a", "", "to"], ["casa", "", "home"], ["y", "", "and"], ["no", "", "not"], ["volver", "", "to come back"], ["nunca", "", "ever"], [".", "", ""]],
        en: "At the end of the class, she wanted to go home and never come back.",
      },
      {
        t: [["Entonces", "", "then", "entonces"], [",", "", ""], ["su", "", "her"], ["compañero", "", "partner"], ["le", "", "to her"], ["dijo", "", "said", "decir"], [":", "", ""], ["«", "", ""], ["Tranquila", "", "don't worry", "tranquilo"], [",", "", ""], ["yo", "", "I"], ["también", "", "also"], ["soy", "", "am", "ser"], ["nuevo", "", "new"], ["»", "", ""], [".", "", ""]],
        en: "Then her partner said to her: \"Don't worry, I'm new too.\"",
      },
      {
        t: [["Elena", "", "Elena"], ["se", "", "herself"], ["rio", "", "laughed", "reírse"], ["y", "", "and"], ["se", "", "herself"], ["sintió", "", "felt", "sentirse"], ["mucho", "", "much"], ["mejor", "", "better"], [".", "", ""]],
        en: "Elena laughed and felt much better.",
      },
      {
        t: [["La", "", "the", "el"], ["semana", "", "week"], ["siguiente", "", "following"], [",", "", ""], ["volvió", "", "she went back", "volver"], ["a", "", "to"], ["la", "", "the", "el"], ["escuela", "", "school"], [".", "", ""]],
        en: "The following week, she went back to the school.",
      },
      {
        t: [["Poco", "", "little", "poco"], ["a", "", "by"], ["poco", "", "little"], [",", "", ""], ["aprendió", "", "she learned", "aprender"], ["los", "", "the", "el"], ["pasos", "", "steps", "paso"], ["básicos", "", "basic", "básico"], [".", "", ""]],
        en: "Little by little, she learned the basic steps.",
      },
      {
        t: [["Ahora", "", "now", "ahora"], ["va", "", "she goes", "ir"], ["a", "", "to"], ["clase", "", "class"], ["dos", "", "two"], ["veces", "", "times", "vez"], ["por", "", "a"], ["semana", "", "week"], ["y", "", "and"], ["baila", "", "dances", "bailar"], ["en", "", "at"], ["todas", "", "all", "todo"], ["las", "", "the", "el"], ["fiestas", "", "parties", "fiesta"], [".", "", ""]],
        en: "Now she goes to class twice a week and dances at every party.",
      },
      {
        t: [["Y", "", "and", "y"], ["su", "", "her"], ["compañero", "", "partner"], ["de", "", "from"], ["la", "", "the", "el"], ["primera", "", "first", "primero"], ["clase", "", "class"], ["es", "", "is", "ser"], ["ahora", "", "now"], ["su", "", "her"], ["mejor", "", "best"], ["amigo", "", "friend"], [".", "", ""]],
        en: "And her partner from the first class is now her best friend.",
      },
      {
        t: [["Él", "", "he", "él"], ["todavía", "", "still"], ["baila", "", "dances", "bailar"], ["fatal", "", "terribly"], [",", "", ""], ["pero", "", "but"], ["eso", "", "that"], ["no", "", "not"], ["importa", "", "matters", "importar"], [".", "", ""]],
        en: "He still dances terribly, but that doesn't matter.",
      },
    ],
    q: [
      { q: "Why didn't Elena dance at parties?", o: ["She didn't like music", "She felt embarrassed", "She was always tired"], a: 1 },
      { q: "What happened during the first class?", o: ["She danced perfectly", "She stepped on her partner three times", "The teacher didn't come"], a: 1 },
      { q: "What did her partner tell her?", o: ["That she danced well", "That he was new too", "That the class was expensive"], a: 1 },
      { q: "How often does Elena go to class now?", o: ["Once a month", "Twice a week", "Every day"], a: 1 },
      { q: "Who is her best friend now?", o: ["The teacher", "Her partner from the first class", "A girl from the school"], a: 1 },
    ],
  },
  {
    id: "es-2-village-fiestas",
    lv: 2,
    kind: "article",
    title: "Las fiestas del pueblo",
    titleEn: "Village festivals",
    s: [
      {
        t: [["En", "", "in", "en"], ["verano", "", "summer"], [",", "", ""], ["casi", "", "almost"], ["todos", "", "all", "todo"], ["los", "", "the", "el"], ["pueblos", "", "villages", "pueblo"], ["de", "", "of"], ["España", "", "Spain"], ["celebran", "", "celebrate", "celebrar"], ["sus", "", "their", "su"], ["fiestas", "", "festivals", "fiesta"], [".", "", ""]],
        en: "In summer, almost every village in Spain celebrates its festival.",
      },
      {
        t: [["Normalmente", "", "usually", "normalmente"], ["duran", "", "they last", "durar"], ["entre", "", "between"], ["tres", "", "three"], ["días", "", "days", "día"], ["y", "", "and"], ["una", "", "a", "uno"], ["semana", "", "week"], [".", "", ""]],
        en: "They usually last between three days and a week.",
      },
      {
        t: [["Mucha", "", "a lot of", "mucho"], ["gente", "", "people"], ["que", "", "who"], ["vive", "", "lives", "vivir"], ["en", "", "in"], ["la", "", "the", "el"], ["ciudad", "", "city"], ["vuelve", "", "goes back", "volver"], ["al", "", "to the", "a"], ["pueblo", "", "village"], ["de", "", "of"], ["sus", "", "their", "su"], ["abuelos", "", "grandparents", "abuelo"], ["para", "", "for"], ["estas", "", "these", "este"], ["fechas", "", "dates", "fecha"], [".", "", ""]],
        en: "A lot of people who live in the city go back to their grandparents' village for these days.",
      },
      {
        t: [["Durante", "", "during", "durante"], ["las", "", "the", "el"], ["fiestas", "", "festivities", "fiesta"], [",", "", ""], ["las", "", "the", "el"], ["calles", "", "streets", "calle"], ["están", "", "are", "estar"], ["llenas", "", "full", "lleno"], ["de", "", "of"], ["luces", "", "lights", "luz"], ["y", "", "and"], ["de", "", "of"], ["música", "", "music"], [".", "", ""]],
        en: "During the festivities, the streets are full of lights and music.",
      },
      {
        t: [["Por", "", "in", "por"], ["la", "", "the", "el"], ["mañana", "", "morning"], ["hay", "", "there are", "haber"], ["juegos", "", "games", "juego"], ["para", "", "for"], ["los", "", "the", "el"], ["niños", "", "children", "niño"], ["y", "", "and"], ["competiciones", "", "competitions", "competición"], ["deportivas", "", "sports", "deportivo"], [".", "", ""]],
        en: "In the morning there are games for the children and sports competitions.",
      },
      {
        t: [["A", "", "at", "a"], ["mediodía", "", "midday"], [",", "", ""], ["los", "", "the", "el"], ["vecinos", "", "locals", "vecino"], ["preparan", "", "prepare", "preparar"], ["comidas", "", "meals", "comida"], ["grandes", "", "big", "grande"], ["en", "", "in"], ["la", "", "the", "el"], ["plaza", "", "square"], [".", "", ""]],
        en: "At midday, the locals prepare big meals in the square.",
      },
      {
        t: [["A", "", "at", "a"], ["veces", "", "times", "vez"], ["cocinan", "", "they cook", "cocinar"], ["una", "", "a", "uno"], ["paella", "", "paella"], ["enorme", "", "huge"], ["para", "", "for"], ["todo", "", "all"], ["el", "", "the"], ["pueblo", "", "village"], [".", "", ""]],
        en: "Sometimes they cook a huge paella for the whole village.",
      },
      {
        t: [["Por", "", "at", "por"], ["la", "", "the", "el"], ["noche", "", "night"], [",", "", ""], ["hay", "", "there are", "haber"], ["conciertos", "", "concerts", "concierto"], ["y", "", "and"], ["bailes", "", "dances", "baile"], ["que", "", "that"], ["terminan", "", "finish", "terminar"], ["muy", "", "very"], ["tarde", "", "late"], [".", "", ""]],
        en: "At night, there are concerts and dances that finish very late.",
      },
      {
        t: [["Muchos", "", "many", "mucho"], ["jóvenes", "", "young people", "joven"], ["bailan", "", "dance", "bailar"], ["hasta", "", "until"], ["las", "", "the", "el"], ["cinco", "", "five"], ["o", "", "or"], ["las", "", "the", "el"], ["seis", "", "six"], ["de", "", "in"], ["la", "", "the", "el"], ["mañana", "", "morning"], [".", "", ""]],
        en: "Many young people dance until five or six in the morning.",
      },
      {
        t: [["Los", "", "the", "el"], ["mayores", "", "elderly", "mayor"], ["se", "", "themselves"], ["sientan", "", "sit", "sentarse"], ["en", "", "in"], ["la", "", "the", "el"], ["plaza", "", "square"], ["y", "", "and"], ["miran", "", "watch", "mirar"], ["el", "", "the"], ["baile", "", "dancing"], [".", "", ""]],
        en: "The elderly sit in the square and watch the dancing.",
      },
      {
        t: [["Cada", "", "each", "cada"], ["pueblo", "", "village"], ["tiene", "", "has", "tener"], ["sus", "", "its", "su"], ["propias", "", "own", "propio"], ["tradiciones", "", "traditions", "tradición"], [".", "", ""]],
        en: "Each village has its own traditions.",
      },
      {
        t: [["En", "", "in", "en"], ["algunos", "", "some", "alguno"], ["pueblos", "", "villages", "pueblo"], [",", "", ""], ["la", "", "the", "el"], ["gente", "", "people"], ["se", "", "themselves"], ["viste", "", "dresses", "vestirse"], ["con", "", "with"], ["ropa", "", "clothes"], ["antigua", "", "old-fashioned", "antiguo"], [".", "", ""]],
        en: "In some villages, people dress in old-fashioned clothes.",
      },
      {
        t: [["En", "", "in", "en"], ["otros", "", "others", "otro"], [",", "", ""], ["hay", "", "there are", "haber"], ["fuegos", "", "fires", "fuego"], ["artificiales", "", "fireworks", "artificial"], ["el", "", "on the"], ["último", "", "last"], ["día", "", "day"], [".", "", ""]],
        en: "In others, there are fireworks on the last day.",
      },
      {
        t: [["Para", "", "for", "para"], ["muchos", "", "many", "mucho"], ["españoles", "", "Spaniards", "español"], [",", "", ""], ["las", "", "the", "el"], ["fiestas", "", "festivals", "fiesta"], ["son", "", "are", "ser"], ["el", "", "the"], ["mejor", "", "best"], ["momento", "", "moment"], ["del", "", "of the", "de"], ["verano", "", "summer"], [".", "", ""]],
        en: "For many Spaniards, the festivals are the best time of the summer.",
      },
      {
        t: [["Son", "", "they are", "ser"], ["la", "", "the", "el"], ["ocasión", "", "occasion"], ["perfecta", "", "perfect", "perfecto"], ["para", "", "to"], ["ver", "", "see"], ["a", "", "(object marker)"], ["la", "", "the", "el"], ["familia", "", "family"], ["y", "", "and"], ["a", "", "(object marker)"], ["los", "", "the", "el"], ["amigos", "", "friends", "amigo"], ["de", "", "from"], ["la", "", "the", "el"], ["infancia", "", "childhood"], [".", "", ""]],
        en: "They are the perfect occasion to see family and childhood friends.",
      },
    ],
    q: [
      { q: "When do most villages celebrate their festivals?", o: ["In winter", "In summer", "In spring"], a: 1 },
      { q: "Why do many city people travel during the festivals?", o: ["To work", "To go back to their grandparents' village", "To go to the beach"], a: 1 },
      { q: "What do the locals sometimes cook for the whole village?", o: ["A huge paella", "A big cake", "Grilled fish"], a: 0 },
      { q: "Until what time do many young people dance?", o: ["Midnight", "Five or six in the morning", "Ten in the morning"], a: 1 },
      { q: "What happens in some villages on the last day?", o: ["A football match", "Fireworks", "A big market"], a: 1 },
    ],
  },
  {
    id: "es-3-wrong-train",
    lv: 3,
    kind: "story",
    title: "El tren equivocado",
    titleEn: "The wrong train",
    s: [
      {
        t: [["Hace", "", "ago", "hacer"], ["dos", "", "two"], ["años", "", "years", "año"], [",", "", ""], ["Javier", "", "Javier"], ["tenía", "", "had", "tener"], ["una", "", "a", "uno"], ["entrevista", "", "interview"], ["de", "", "for"], ["trabajo", "", "job"], ["muy", "", "very"], ["importante", "", "important"], ["en", "", "in"], ["Zaragoza", "", "Zaragoza"], [".", "", ""]],
        en: "Two years ago, Javier had a very important job interview in Zaragoza.",
      },
      {
        t: [["Esa", "", "that", "ese"], ["mañana", "", "morning"], ["se", "", "himself"], ["levantó", "", "got up", "levantarse"], ["tarde", "", "late"], [",", "", ""], ["se", "", "himself"], ["vistió", "", "got dressed", "vestirse"], ["deprisa", "", "quickly"], ["y", "", "and"], ["salió", "", "went out", "salir"], ["corriendo", "", "running", "correr"], ["hacia", "", "towards"], ["la", "", "the", "el"], ["estación", "", "station"], [".", "", ""]],
        en: "That morning he got up late, got dressed in a hurry and ran off to the station.",
      },
      {
        t: [["Llegó", "", "he arrived", "llegar"], ["justo", "", "just"], ["cuando", "", "when"], ["el", "", "the"], ["tren", "", "train"], ["estaba", "", "was", "estar"], ["a", "", "about"], ["punto", "", "point"], ["de", "", "to"], ["salir", "", "leave"], [",", "", ""], ["así", "", "so"], ["que", "", "that"], ["subió", "", "he got on", "subir"], ["sin", "", "without"], ["mirar", "", "looking at"], ["el", "", "the"], ["panel", "", "board"], [".", "", ""]],
        en: "He arrived just as the train was about to leave, so he got on without looking at the departures board.",
      },
      {
        t: [["Se", "", "himself", "se"], ["sentó", "", "sat down", "sentarse"], ["junto", "", "next"], ["a", "", "to"], ["la", "", "the", "el"], ["ventana", "", "window"], [",", "", ""], ["sacó", "", "took out", "sacar"], ["sus", "", "his", "su"], ["apuntes", "", "notes", "apunte"], ["y", "", "and"], ["empezó", "", "began", "empezar"], ["a", "", "to"], ["repasar", "", "go over"], ["sus", "", "his", "su"], ["respuestas", "", "answers", "respuesta"], [".", "", ""]],
        en: "He sat down by the window, took out his notes and began to go over his answers.",
      },
      {
        t: [["Media", "", "half", "medio"], ["hora", "", "hour"], ["después", "", "later"], [",", "", ""], ["el", "", "the"], ["revisor", "", "ticket inspector"], ["le", "", "him"], ["pidió", "", "asked for", "pedir"], ["el", "", "the"], ["billete", "", "ticket"], [".", "", ""]],
        en: "Half an hour later, the ticket inspector asked for his ticket.",
      },
      {
        t: [["—", "", ""], ["Este", "", "this", "este"], ["billete", "", "ticket"], ["es", "", "is", "ser"], ["para", "", "for"], ["Zaragoza", "", "Zaragoza"], ["—", "", ""], ["le", "", "to him"], ["dijo", "", "said", "decir"], ["con", "", "with"], ["una", "", "a", "uno"], ["sonrisa", "", "smile"], ["—", "", ""], [",", "", ""], ["pero", "", "but"], ["este", "", "this"], ["tren", "", "train"], ["va", "", "goes", "ir"], ["a", "", "to"], ["Cuenca", "", "Cuenca"], [".", "", ""]],
        en: "\"This ticket is for Zaragoza,\" he said with a smile, \"but this train goes to Cuenca.\"",
      },
      {
        t: [["Javier", "", "Javier"], ["se", "", "himself"], ["quedó", "", "went", "quedarse"], ["blanco", "", "white"], [":", "", ""], ["había", "", "he had", "haber"], ["tomado", "", "taken", "tomar"], ["el", "", "the"], ["tren", "", "train"], ["equivocado", "", "wrong"], [".", "", ""]],
        en: "Javier went pale: he had taken the wrong train.",
      },
      {
        t: [["Tuvo", "", "he had", "tener"], ["que", "", "to"], ["bajarse", "", "get off"], ["en", "", "at"], ["la", "", "the", "el"], ["siguiente", "", "next"], ["parada", "", "stop"], [",", "", ""], ["un", "", "a", "uno"], ["pueblo", "", "village"], ["pequeño", "", "small"], ["en", "", "in"], ["medio", "", "middle"], ["del", "", "of the", "de"], ["campo", "", "countryside"], [".", "", ""]],
        en: "He had to get off at the next stop, a small village in the middle of the countryside.",
      },
      {
        t: [["El", "", "the", "el"], ["próximo", "", "next"], ["tren", "", "train"], ["de", "", "of"], ["vuelta", "", "return"], ["no", "", "not"], ["salía", "", "left", "salir"], ["hasta", "", "until"], ["las", "", "the", "el"], ["cuatro", "", "four"], ["de", "", "in"], ["la", "", "the", "el"], ["tarde", "", "afternoon"], [".", "", ""]],
        en: "The next train back didn't leave until four in the afternoon.",
      },
      {
        t: [["Llamó", "", "he called", "llamar"], ["a", "", "(object marker)"], ["la", "", "the", "el"], ["empresa", "", "company"], ["para", "", "to"], ["explicar", "", "explain"], ["lo", "", "what"], ["que", "", "that"], ["había", "", "had", "haber"], ["pasado", "", "happened", "pasar"], [",", "", ""], ["pero", "", "but"], ["nadie", "", "nobody"], ["contestó", "", "answered", "contestar"], [".", "", ""]],
        en: "He called the company to explain what had happened, but nobody answered.",
      },
      {
        t: [["Enfadado", "", "angry", "enfadado"], ["consigo", "", "with himself"], ["mismo", "", "(him)self"], [",", "", ""], ["entró", "", "he went into", "entrar"], ["en", "", "into"], ["el", "", "the"], ["único", "", "only"], ["bar", "", "bar"], ["del", "", "of the", "de"], ["pueblo", "", "village"], ["para", "", "to"], ["tomar", "", "have"], ["un", "", "a", "uno"], ["café", "", "coffee"], [".", "", ""]],
        en: "Angry with himself, he went into the only bar in the village to have a coffee.",
      },
      {
        t: [["Allí", "", "there", "allí"], ["conoció", "", "he met", "conocer"], ["a", "", "(object marker)"], ["Lucía", "", "Lucía"], [",", "", ""], ["la", "", "the", "el"], ["dueña", "", "owner", "dueño"], [",", "", ""], ["que", "", "who"], ["acababa", "", "had just", "acabar"], ["de", "", "(just)"], ["abrir", "", "opened"], ["una", "", "a", "uno"], ["pequeña", "", "small", "pequeño"], ["empresa", "", "business"], ["de", "", "of"], ["turismo", "", "tourism"], ["rural", "", "rural"], [".", "", ""]],
        en: "There he met Lucía, the owner, who had just started a small rural tourism business.",
      },
      {
        t: [["Mientras", "", "while", "mientras"], ["hablaban", "", "they were talking", "hablar"], [",", "", ""], ["ella", "", "she"], ["le", "", "to him"], ["contó", "", "told", "contar"], ["que", "", "that"], ["buscaba", "", "she was looking for", "buscar"], ["a", "", "(object marker)"], ["alguien", "", "someone"], ["para", "", "to"], ["encargarse", "", "take charge"], ["de", "", "of"], ["la", "", "the", "el"], ["página", "", "page"], ["web", "", "web"], ["y", "", "and"], ["las", "", "the", "el"], ["redes", "", "networks", "red"], ["sociales", "", "social", "social"], [".", "", ""]],
        en: "While they were talking, she told him she was looking for someone to take care of the website and social media.",
      },
      {
        t: [["Javier", "", "Javier"], [",", "", ""], ["que", "", "who"], ["era", "", "was", "ser"], ["diseñador", "", "designer"], [",", "", ""], ["le", "", "to her"], ["enseñó", "", "showed", "enseñar"], ["algunos", "", "some", "alguno"], ["de", "", "of"], ["sus", "", "his", "su"], ["trabajos", "", "projects", "trabajo"], ["en", "", "on"], ["el", "", "the"], ["teléfono", "", "phone"], [".", "", ""]],
        en: "Javier, who was a designer, showed her some of his work on his phone.",
      },
      {
        t: [["A", "", "to", "a"], ["Lucía", "", "Lucía"], ["le", "", "to her"], ["gustaron", "", "were pleasing", "gustar"], ["tanto", "", "so much"], ["que", "", "that"], ["le", "", "to him"], ["propuso", "", "proposed", "proponer"], ["un", "", "a", "uno"], ["trato", "", "deal"], [":", "", ""], ["unas", "", "some", "uno"], ["semanas", "", "weeks", "semana"], ["de", "", "of"], ["prueba", "", "trial"], [",", "", ""], ["trabajando", "", "working", "trabajar"], ["a", "", "at"], ["distancia", "", "distance"], [".", "", ""]],
        en: "Lucía liked them so much that she offered him a deal: a few weeks' trial, working remotely.",
      },
      {
        t: [["Cuando", "", "when", "cuando"], ["por", "", "at"], ["fin", "", "last"], ["llegó", "", "he got", "llegar"], ["a", "", "to"], ["casa", "", "home"], ["esa", "", "that", "ese"], ["noche", "", "night"], [",", "", ""], ["tenía", "", "he had", "tener"], ["un", "", "an", "uno"], ["correo", "", "email"], ["de", "", "from"], ["la", "", "the", "el"], ["empresa", "", "company"], ["de", "", "from"], ["Zaragoza", "", "Zaragoza"], [".", "", ""]],
        en: "When he finally got home that night, he had an email from the company in Zaragoza.",
      },
      {
        t: [["Le", "", "to him", "le"], ["decían", "", "they said", "decir"], ["que", "", "that"], ["lo", "", "it"], ["sentían", "", "they were sorry", "sentir"], [",", "", ""], ["pero", "", "but"], ["que", "", "that"], ["el", "", "the"], ["puesto", "", "position"], ["ya", "", "already"], ["estaba", "", "was", "estar"], ["ocupado", "", "filled"], [".", "", ""]],
        en: "They said they were sorry, but the position had already been filled.",
      },
      {
        t: [["Javier", "", "Javier"], ["sonrió", "", "smiled", "sonreír"], [",", "", ""], ["porque", "", "because"], ["ya", "", "any more"], ["no", "", "not"], ["le", "", "to him"], ["importaba", "", "mattered", "importar"], [".", "", ""]],
        en: "Javier smiled, because it no longer mattered to him.",
      },
      {
        t: [["Hoy", "", "today", "hoy"], ["trabaja", "", "he works", "trabajar"], ["con", "", "with"], ["Lucía", "", "Lucía"], ["y", "", "and"], ["visita", "", "visits", "visitar"], ["el", "", "the"], ["pueblo", "", "village"], ["una", "", "once", "uno"], ["vez", "", "time"], ["al", "", "a", "a"], ["mes", "", "month"], [".", "", ""]],
        en: "Today he works with Lucía and visits the village once a month.",
      },
      {
        t: [["Y", "", "and", "y"], ["siempre", "", "always"], [",", "", ""], ["antes", "", "before"], ["de", "", "(of)"], ["subir", "", "getting on"], ["a", "", "onto"], ["un", "", "a", "uno"], ["tren", "", "train"], [",", "", ""], ["mira", "", "he looks at", "mirar"], ["el", "", "the"], ["panel", "", "board"], ["dos", "", "two"], ["veces", "", "times", "vez"], [".", "", ""]],
        en: "And always, before getting on a train, he checks the board twice.",
      },
    ],
    q: [
      { q: "Why was Javier going to Zaragoza?", o: ["To visit his family", "For a job interview", "For a holiday"], a: 1 },
      { q: "Why did he get on the wrong train?", o: ["The inspector told him to", "He was late and didn't check the board", "The train to Zaragoza was cancelled"], a: 1 },
      { q: "Who was Lucía?", o: ["A ticket inspector", "The owner of the village bar", "A friend from Zaragoza"], a: 1 },
      { q: "What did Lucía offer him?", o: ["A room in her house", "A trial period working remotely", "A ticket back home"], a: 1 },
      { q: "What did the email from Zaragoza say?", o: ["He had the job", "The position had already been filled", "The interview was moved to another day"], a: 1 },
    ],
  },
  {
    id: "es-3-dinner-time",
    lv: 3,
    kind: "article",
    title: "Cenar a las diez",
    titleEn: "Dinner at ten",
    s: [
      {
        t: [["Muchos", "", "many", "mucho"], ["turistas", "", "tourists", "turista"], ["se", "", "themselves"], ["sorprenden", "", "are surprised", "sorprenderse"], ["cuando", "", "when"], ["llegan", "", "they arrive", "llegar"], ["a", "", "in"], ["España", "", "Spain"], ["y", "", "and"], ["ven", "", "see", "ver"], ["los", "", "the", "el"], ["restaurantes", "", "restaurants", "restaurante"], ["vacíos", "", "empty", "vacío"], ["a", "", "at"], ["las", "", "the", "el"], ["siete", "", "seven"], ["de", "", "in"], ["la", "", "the", "el"], ["tarde", "", "evening"], [".", "", ""]],
        en: "Many tourists are surprised when they arrive in Spain and see the restaurants empty at seven in the evening.",
      },
      {
        t: [["En", "", "in", "en"], ["España", "", "Spain"], [",", "", ""], ["lo", "", "the (thing)"], ["normal", "", "normal"], ["es", "", "is", "ser"], ["comer", "", "to have lunch"], ["entre", "", "between"], ["las", "", "the", "el"], ["dos", "", "two"], ["y", "", "and"], ["las", "", "the", "el"], ["tres", "", "three"], [",", "", ""], ["y", "", "and"], ["cenar", "", "to have dinner"], ["entre", "", "between"], ["las", "", "the", "el"], ["nueve", "", "nine"], ["y", "", "and"], ["las", "", "the", "el"], ["diez", "", "ten"], ["de", "", "at"], ["la", "", "the", "el"], ["noche", "", "night"], [".", "", ""]],
        en: "In Spain, people normally have lunch between two and three, and dinner between nine and ten at night.",
      },
      {
        t: [["¿", "", ""], ["Por", "", "why", "por"], ["qué", "", "why"], ["son", "", "are", "ser"], ["tan", "", "so"], ["diferentes", "", "different", "diferente"], ["los", "", "the", "el"], ["horarios", "", "schedules", "horario"], ["españoles", "", "Spanish", "español"], ["?", "", ""]],
        en: "Why are Spanish schedules so different?",
      },
      {
        t: [["Una", "", "one", "uno"], ["de", "", "of"], ["las", "", "the", "el"], ["explicaciones", "", "explanations", "explicación"], ["tiene", "", "has", "tener"], ["que", "", "to"], ["ver", "", "do"], ["con", "", "with"], ["la", "", "the", "el"], ["hora", "", "time"], ["oficial", "", "official"], [".", "", ""]],
        en: "One of the explanations has to do with the official time.",
      },
      {
        t: [["Por", "", "because of", "por"], ["su", "", "its"], ["posición", "", "position"], ["geográfica", "", "geographical", "geográfico"], [",", "", ""], ["España", "", "Spain"], ["debería", "", "should", "deber"], ["tener", "", "have"], ["la", "", "the", "el"], ["misma", "", "same", "mismo"], ["hora", "", "time"], ["que", "", "as"], ["Portugal", "", "Portugal"], ["o", "", "or"], ["el", "", "the"], ["Reino", "", "Kingdom"], ["Unido", "", "United"], [".", "", ""]],
        en: "Because of its geographical position, Spain should have the same time as Portugal or the United Kingdom.",
      },
      {
        t: [["Sin", "", "without", "sin"], ["embargo", "", "however"], [",", "", ""], ["desde", "", "since"], ["1940", "", "1940"], ["usa", "", "it uses", "usar"], ["la", "", "the", "el"], ["misma", "", "same", "mismo"], ["hora", "", "time"], ["que", "", "as"], ["Alemania", "", "Germany"], ["y", "", "and"], ["la", "", "the", "el"], ["mayor", "", "greater"], ["parte", "", "part"], ["de", "", "of"], ["Europa", "", "Europe"], ["central", "", "central"], [".", "", ""]],
        en: "However, since 1940 it has used the same time as Germany and most of central Europe.",
      },
      {
        t: [["Por", "", "for", "por"], ["eso", "", "that"], [",", "", ""], ["según", "", "according to"], ["el", "", "the"], ["reloj", "", "clock"], [",", "", ""], ["el", "", "the"], ["sol", "", "sun"], ["sale", "", "rises", "salir"], ["y", "", "and"], ["se", "", "itself"], ["pone", "", "sets", "ponerse"], ["más", "", "more"], ["tarde", "", "late"], ["que", "", "than"], ["en", "", "in"], ["otros", "", "other", "otro"], ["países", "", "countries", "país"], [".", "", ""]],
        en: "That's why, by the clock, the sun rises and sets later than in other countries.",
      },
      {
        t: [["En", "", "in", "en"], ["verano", "", "summer"], [",", "", ""], ["en", "", "in"], ["Galicia", "", "Galicia"], ["todavía", "", "still"], ["es", "", "it is", "ser"], ["de", "", "(of)"], ["día", "", "daylight"], ["a", "", "at"], ["las", "", "the", "el"], ["diez", "", "ten"], ["de", "", "at"], ["la", "", "the", "el"], ["noche", "", "night"], [".", "", ""]],
        en: "In summer, in Galicia it is still light at ten at night.",
      },
      {
        t: [["Como", "", "since", "como"], ["la", "", "the", "el"], ["gente", "", "people"], ["organiza", "", "organise", "organizar"], ["su", "", "their"], ["día", "", "day"], ["según", "", "according to"], ["la", "", "the", "el"], ["luz", "", "light"], [",", "", ""], ["las", "", "the", "el"], ["comidas", "", "meals", "comida"], ["también", "", "also"], ["se", "", "themselves"], ["retrasan", "", "are delayed", "retrasarse"], [".", "", ""]],
        en: "Since people organise their day around the daylight, meals are also later.",
      },
      {
        t: [["Otra", "", "another", "otro"], ["razón", "", "reason"], ["es", "", "is", "ser"], ["la", "", "the", "el"], ["historia", "", "history"], ["económica", "", "economic", "económico"], ["del", "", "of the", "de"], ["país", "", "country"], [".", "", ""]],
        en: "Another reason is the country's economic history.",
      },
      {
        t: [["En", "", "in", "en"], ["los", "", "the", "el"], ["años", "", "years", "año"], ["cincuenta", "", "fifties"], ["y", "", "and"], ["sesenta", "", "sixties"], [",", "", ""], ["muchas", "", "many", "mucho"], ["personas", "", "people", "persona"], ["tenían", "", "had", "tener"], ["dos", "", "two"], ["trabajos", "", "jobs", "trabajo"], [":", "", ""], ["uno", "", "one"], ["por", "", "in"], ["la", "", "the", "el"], ["mañana", "", "morning"], ["y", "", "and"], ["otro", "", "another"], ["por", "", "in"], ["la", "", "the", "el"], ["tarde", "", "afternoon"], [".", "", ""]],
        en: "In the fifties and sixties, many people had two jobs: one in the morning and another in the afternoon.",
      },
      {
        t: [["Entre", "", "between", "entre"], ["los", "", "the", "el"], ["dos", "", "two"], [",", "", ""], ["volvían", "", "they went back", "volver"], ["a", "", "to"], ["casa", "", "home"], ["para", "", "to"], ["comer", "", "have lunch"], [",", "", ""], ["y", "", "and"], ["cenaban", "", "they had dinner", "cenar"], ["muy", "", "very"], ["tarde", "", "late"], [",", "", ""], ["al", "", "on", "a"], ["terminar", "", "finishing"], ["la", "", "the", "el"], ["jornada", "", "working day"], [".", "", ""]],
        en: "In between, they went home for lunch, and they had dinner very late, when the working day was over.",
      },
      {
        t: [["Hoy", "", "today", "hoy"], [",", "", ""], ["muchos", "", "many", "mucho"], ["expertos", "", "experts", "experto"], ["piensan", "", "think", "pensar"], ["que", "", "that"], ["estos", "", "these", "este"], ["horarios", "", "schedules", "horario"], ["no", "", "not"], ["son", "", "are", "ser"], ["buenos", "", "good", "bueno"], ["para", "", "for"], ["la", "", "the", "el"], ["salud", "", "health"], [".", "", ""]],
        en: "Today, many experts think these schedules are not good for your health.",
      },
      {
        t: [["Los", "", "the", "el"], ["españoles", "", "Spaniards", "español"], ["duermen", "", "sleep", "dormir"], [",", "", ""], ["de", "", "on"], ["media", "", "average"], [",", "", ""], ["menos", "", "less"], ["que", "", "than"], ["otros", "", "other", "otro"], ["europeos", "", "Europeans", "europeo"], [".", "", ""]],
        en: "Spaniards sleep, on average, less than other Europeans.",
      },
      {
        t: [["Además", "", "besides", "además"], [",", "", ""], ["es", "", "it is", "ser"], ["difícil", "", "difficult"], ["combinar", "", "to combine"], ["la", "", "the", "el"], ["vida", "", "life"], ["familiar", "", "family"], ["con", "", "with"], ["jornadas", "", "working days", "jornada"], ["que", "", "that"], ["terminan", "", "end", "terminar"], ["a", "", "at"], ["las", "", "the", "el"], ["siete", "", "seven"], ["o", "", "or"], ["las", "", "the", "el"], ["ocho", "", "eight"], [".", "", ""]],
        en: "Besides, it is hard to combine family life with working days that end at seven or eight.",
      },
      {
        t: [["Por", "", "for", "por"], ["eso", "", "that"], [",", "", ""], ["algunas", "", "some", "alguno"], ["empresas", "", "companies", "empresa"], ["ya", "", "already"], ["ofrecen", "", "offer", "ofrecer"], ["horarios", "", "hours", "horario"], ["continuos", "", "continuous", "continuo"], [",", "", ""], ["de", "", "from"], ["ocho", "", "eight"], ["a", "", "to"], ["tres", "", "three"], [",", "", ""], ["por", "", "for"], ["ejemplo", "", "example"], [".", "", ""]],
        en: "That's why some companies already offer continuous working hours, from eight to three, for example.",
      },
      {
        t: [["También", "", "also", "también"], ["hay", "", "there are", "haber"], ["quien", "", "those who"], ["propone", "", "propose", "proponer"], ["volver", "", "to go back"], ["a", "", "to"], ["la", "", "the", "el"], ["hora", "", "time"], ["de", "", "of"], ["Portugal", "", "Portugal"], ["y", "", "and"], ["el", "", "the"], ["Reino", "", "Kingdom"], ["Unido", "", "United"], [".", "", ""]],
        en: "There are also those who propose going back to the same time as Portugal and the United Kingdom.",
      },
      {
        t: [["De", "", "for", "de"], ["momento", "", "the moment"], [",", "", ""], ["los", "", "the", "el"], ["cambios", "", "changes", "cambio"], ["son", "", "are", "ser"], ["lentos", "", "slow", "lento"], [".", "", ""]],
        en: "For the moment, the changes are slow.",
      },
      {
        t: [["Así", "", "so", "así"], ["que", "", "(that)"], [",", "", ""], ["si", "", "if"], ["visitas", "", "you visit", "visitar"], ["España", "", "Spain"], [",", "", ""], ["no", "", "don't"], ["tengas", "", "have", "tener"], ["prisa", "", "hurry"], ["por", "", "to"], ["cenar", "", "have dinner"], [".", "", ""]],
        en: "So if you visit Spain, don't be in a hurry to have dinner.",
      },
      {
        t: [["A", "", "at", "a"], ["las", "", "the", "el"], ["nueve", "", "nine"], [",", "", ""], ["los", "", "the", "el"], ["restaurantes", "", "restaurants", "restaurante"], ["empiezan", "", "begin", "empezar"], ["a", "", "to"], ["llenarse", "", "fill up"], ["de", "", "with"], ["gente", "", "people"], ["y", "", "and"], ["de", "", "with"], ["ruido", "", "noise"], [".", "", ""]],
        en: "At nine, the restaurants begin to fill up with people and noise.",
      },
    ],
    q: [
      { q: "When do Spaniards usually have dinner?", o: ["Between six and seven", "Between nine and ten", "After midnight"], a: 1 },
      { q: "Which country's time does Spain use since 1940?", o: ["Portugal's", "Germany's", "The United Kingdom's"], a: 1 },
      { q: "What is one effect of Spain's official time?", o: ["The sun rises and sets later by the clock", "Winters are colder", "Shops close earlier"], a: 0 },
      { q: "Why did many people eat late in the fifties and sixties?", o: ["They didn't like eating early", "They had two jobs", "Restaurants opened late"], a: 1 },
      { q: "What do some companies offer today?", o: ["Longer lunch breaks", "Continuous working hours, from eight to three", "Dinner at work"], a: 1 },
    ],
  },
  {
    id: "es-4-lost-recipe",
    lv: 4,
    kind: "story",
    title: "La receta perdida",
    titleEn: "The lost recipe",
    s: [
      {
        t: [["Mi", "", "my", "mi"], ["abuela", "", "grandmother"], ["Carmen", "", "Carmen"], ["nunca", "", "never"], ["escribió", "", "wrote", "escribir"], ["ninguna", "", "any", "ninguno"], ["receta", "", "recipe"], [".", "", ""]],
        en: "My grandmother Carmen never wrote down a single recipe.",
      },
      {
        t: [["Cocinaba", "", "she cooked", "cocinar"], ["de", "", "from"], ["memoria", "", "memory"], ["y", "", "and"], ["a", "", "by"], ["ojo", "", "eye"], [",", "", ""], ["y", "", "and"], ["cuando", "", "when"], ["le", "", "her"], ["preguntábamos", "", "we asked", "preguntar"], ["las", "", "the", "el"], ["cantidades", "", "quantities", "cantidad"], [",", "", ""], ["se", "", "herself"], ["encogía", "", "shrugged", "encogerse"], ["de", "", "(of)"], ["hombros", "", "shoulders", "hombro"], ["y", "", "and"], ["decía", "", "said", "decir"], [":", "", ""], ["«", "", ""], ["Lo", "", "what", "lo"], ["que", "", "that"], ["haga", "", "is", "hacer"], ["falta", "", "needed"], ["»", "", ""], [".", "", ""]],
        en: "She cooked from memory and by eye, and when we asked her about quantities, she would shrug and say: \"As much as it needs.\"",
      },
      {
        t: [["De", "", "of", "de"], ["todos", "", "all", "todo"], ["sus", "", "her", "su"], ["platos", "", "dishes", "plato"], [",", "", ""], ["el", "", "the one"], ["que", "", "that"], ["más", "", "most"], ["echamos", "", "we miss", "echar"], ["de", "", "(of)"], ["menos", "", "less"], ["desde", "", "since"], ["que", "", "(that)"], ["murió", "", "she died", "morir"], ["es", "", "is", "ser"], ["su", "", "her"], ["arroz", "", "rice"], ["con", "", "with"], ["leche", "", "milk"], [".", "", ""]],
        en: "Of all her dishes, the one we have missed most since she died is her rice pudding.",
      },
      {
        t: [["Era", "", "it was", "ser"], ["espeso", "", "thick"], ["y", "", "and"], ["cremoso", "", "creamy"], [",", "", ""], ["y", "", "and"], ["tenía", "", "had", "tener"], ["un", "", "a", "uno"], ["sabor", "", "flavour"], ["que", "", "that"], ["ninguno", "", "none"], ["de", "", "of"], ["nosotros", "", "us"], ["ha", "", "has", "haber"], ["sabido", "", "managed", "saber"], ["reproducir", "", "to reproduce"], [".", "", ""]],
        en: "It was thick and creamy, and it had a flavour that none of us has managed to reproduce.",
      },
      {
        t: [["El", "", "the", "el"], ["invierno", "", "winter"], ["pasado", "", "last"], [",", "", ""], ["decidí", "", "I decided", "decidir"], ["que", "", "that"], ["había", "", "had", "haber"], ["llegado", "", "come", "llegar"], ["el", "", "the"], ["momento", "", "moment"], ["de", "", "to"], ["intentarlo", "", "try it"], ["en", "", "in"], ["serio", "", "earnest"], [".", "", ""]],
        en: "Last winter, I decided the time had come to try it in earnest.",
      },
      {
        t: [["Busqué", "", "I looked for", "buscar"], ["recetas", "", "recipes", "receta"], ["en", "", "on"], ["internet", "", "the internet"], [",", "", ""], ["leí", "", "I read", "leer"], ["libros", "", "books", "libro"], ["de", "", "of"], ["cocina", "", "cookery"], ["y", "", "and"], ["pregunté", "", "I asked", "preguntar"], ["a", "", "(object marker)"], ["mis", "", "my", "mi"], ["tías", "", "aunts", "tía"], [",", "", ""], ["pero", "", "but"], ["cada", "", "each"], ["una", "", "one", "uno"], ["recordaba", "", "remembered", "recordar"], ["algo", "", "something"], ["distinto", "", "different"], [".", "", ""]],
        en: "I looked up recipes online, read cookbooks and asked my aunts, but each of them remembered something different.",
      },
      {
        t: [["Una", "", "one", "uno"], ["juraba", "", "swore", "jurar"], ["que", "", "that"], ["mi", "", "my"], ["abuela", "", "grandmother"], ["usaba", "", "used", "usar"], ["leche", "", "milk"], ["de", "", "from"], ["una", "", "a", "uno"], ["granja", "", "farm"], ["cercana", "", "nearby", "cercano"], [";", "", ""], ["otra", "", "another", "otro"], [",", "", ""], ["que", "", "that"], ["añadía", "", "she added", "añadir"], ["un", "", "a", "uno"], ["chorrito", "", "dash"], ["de", "", "of"], ["anís", "", "anisette"], [".", "", ""]],
        en: "One swore that my grandmother used milk from a nearby farm; another, that she added a dash of anisette.",
      },
      {
        t: [["Durante", "", "for", "durante"], ["semanas", "", "weeks", "semana"], [",", "", ""], ["mi", "", "my"], ["cocina", "", "kitchen"], ["se", "", "itself"], ["convirtió", "", "turned", "convertirse"], ["en", "", "into"], ["un", "", "a", "uno"], ["laboratorio", "", "laboratory"], [".", "", ""]],
        en: "For weeks, my kitchen turned into a laboratory.",
      },
      {
        t: [["Probé", "", "I tried", "probar"], ["con", "", "with"], ["arroz", "", "rice"], ["redondo", "", "round"], ["y", "", "and"], ["con", "", "with"], ["arroz", "", "rice"], ["largo", "", "long"], [",", "", ""], ["con", "", "with"], ["más", "", "more"], ["azúcar", "", "sugar"], ["y", "", "and"], ["con", "", "with"], ["menos", "", "less"], [",", "", ""], ["con", "", "with"], ["canela", "", "cinnamon"], ["en", "", "in"], ["rama", "", "sticks"], ["y", "", "and"], ["con", "", "with"], ["canela", "", "cinnamon"], ["en", "", "in"], ["polvo", "", "powder"], [".", "", ""]],
        en: "I tried round rice and long rice, more sugar and less, cinnamon sticks and ground cinnamon.",
      },
      {
        t: [["Algunos", "", "some", "alguno"], ["intentos", "", "attempts", "intento"], ["estaban", "", "were", "estar"], ["buenos", "", "good", "bueno"], [",", "", ""], ["pero", "", "but"], ["ninguno", "", "none"], ["sabía", "", "tasted", "saber"], ["como", "", "like"], ["el", "", "the"], ["suyo", "", "hers"], [".", "", ""]],
        en: "Some attempts were good, but none tasted like hers.",
      },
      {
        t: [["Mi", "", "my", "mi"], ["pareja", "", "partner"], [",", "", ""], ["que", "", "who"], ["al", "", "at the", "a"], ["principio", "", "beginning"], ["se", "", "(him)self"], ["lo", "", "it"], ["comía", "", "ate", "comer"], ["todo", "", "all"], ["con", "", "with"], ["entusiasmo", "", "enthusiasm"], [",", "", ""], ["empezó", "", "began", "empezar"], ["a", "", "to"], ["mirar", "", "look at"], ["el", "", "the"], ["postre", "", "dessert"], ["con", "", "with"], ["cierto", "", "a certain"], ["miedo", "", "fear"], [".", "", ""]],
        en: "My partner, who at first ate everything with enthusiasm, began to look at the dessert with a certain fear.",
      },
      {
        t: [["Estaba", "", "I was", "estar"], ["a", "", "about"], ["punto", "", "point"], ["de", "", "to"], ["rendirme", "", "give up", "rendirse"], ["cuando", "", "when"], ["mi", "", "my"], ["madre", "", "mother"], ["encontró", "", "found", "encontrar"], ["una", "", "a", "uno"], ["caja", "", "box"], ["de", "", "of"], ["lata", "", "tin"], ["en", "", "in"], ["el", "", "the"], ["altillo", "", "top cupboard"], ["de", "", "of"], ["la", "", "the", "el"], ["casa", "", "house"], ["de", "", "of"], ["la", "", "the", "el"], ["abuela", "", "grandmother"], [".", "", ""]],
        en: "I was about to give up when my mother found a tin box in the top cupboard at my grandmother's house.",
      },
      {
        t: [["Dentro", "", "inside", "dentro"], ["había", "", "there were", "haber"], ["cartas", "", "letters", "carta"], ["antiguas", "", "old", "antiguo"], [",", "", ""], ["fotos", "", "photos", "foto"], ["en", "", "in"], ["blanco", "", "white"], ["y", "", "and"], ["negro", "", "black"], ["y", "", "and"], ["un", "", "a", "uno"], ["cuaderno", "", "notebook"], ["pequeño", "", "small"], ["con", "", "with"], ["las", "", "the", "el"], ["tapas", "", "covers", "tapa"], ["gastadas", "", "worn", "gastado"], [".", "", ""]],
        en: "Inside there were old letters, black-and-white photos and a small notebook with worn covers.",
      },
      {
        t: [["Al", "", "on", "a"], ["abrirlo", "", "opening it", "abrir"], [",", "", ""], ["el", "", "the"], ["corazón", "", "heart"], ["me", "", "my"], ["dio", "", "gave", "dar"], ["un", "", "a", "uno"], ["vuelco", "", "leap"], [":", "", ""], ["eran", "", "they were", "ser"], ["recetas", "", "recipes", "receta"], [",", "", ""], ["escritas", "", "written", "escribir"], ["con", "", "in"], ["su", "", "her"], ["letra", "", "handwriting"], ["redonda", "", "round", "redondo"], ["y", "", "and"], ["torpe", "", "clumsy"], [".", "", ""]],
        en: "When I opened it, my heart skipped a beat: they were recipes, written in her round, clumsy handwriting.",
      },
      {
        t: [["Así", "", "so", "así"], ["que", "", "(that)"], ["sí", "", "indeed"], ["las", "", "them", "lo"], ["había", "", "she had", "haber"], ["escrito", "", "written", "escribir"], [";", "", ""], ["solo", "", "only"], ["que", "", "that"], ["nunca", "", "never"], ["se", "", "(to anyone)"], ["lo", "", "it"], ["había", "", "had", "haber"], ["contado", "", "told", "contar"], ["a", "", "to"], ["nadie", "", "anyone"], [".", "", ""]],
        en: "So she had written them down after all; she just had never told anyone.",
      },
      {
        t: [["Busqué", "", "I looked for", "buscar"], ["con", "", "with"], ["impaciencia", "", "impatience"], ["la", "", "the", "el"], ["página", "", "page"], ["del", "", "of the", "de"], ["arroz", "", "rice"], ["con", "", "with"], ["leche", "", "milk"], [".", "", ""]],
        en: "I impatiently looked for the rice pudding page.",
      },
      {
        t: [["La", "", "the", "el"], ["receta", "", "recipe"], ["era", "", "was", "ser"], ["sorprendentemente", "", "surprisingly"], ["sencilla", "", "simple", "sencillo"], [",", "", ""], ["casi", "", "almost"], ["igual", "", "the same"], ["que", "", "as"], ["las", "", "the ones", "el"], ["que", "", "that"], ["yo", "", "I"], ["había", "", "had", "haber"], ["probado", "", "tried", "probar"], [".", "", ""]],
        en: "The recipe was surprisingly simple, almost the same as the ones I had tried.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["al", "", "at the", "a"], ["final", "", "end"], [",", "", ""], ["subrayado", "", "underlined", "subrayar"], ["dos", "", "two"], ["veces", "", "times", "vez"], [",", "", ""], ["había", "", "there was", "haber"], ["un", "", "an", "uno"], ["ingrediente", "", "ingredient"], ["que", "", "that"], ["no", "", "not"], ["aparecía", "", "appeared", "aparecer"], ["en", "", "in"], ["ningún", "", "any", "ninguno"], ["libro", "", "book"], [".", "", ""]],
        en: "But at the end, underlined twice, there was an ingredient that didn't appear in any book.",
      },
      {
        t: [["Decía", "", "it said", "decir"], [":", "", ""], ["«", "", ""], ["Remover", "", "stir", "remover"], ["despacio", "", "slowly"], [",", "", ""], ["sin", "", "without"], ["prisa", "", "hurry"], [",", "", ""], ["y", "", "and"], ["pensar", "", "think"], ["en", "", "of"], ["quien", "", "whoever"], ["se", "", "(for themselves)"], ["lo", "", "it"], ["va", "", "is going", "ir"], ["a", "", "to"], ["comer", "", "eat"], ["»", "", ""], [".", "", ""]],
        en: "It said: \"Stir slowly, unhurriedly, and think of whoever is going to eat it.\"",
      },
      {
        t: [["Me", "", "myself", "me"], ["quedé", "", "I stayed", "quedarse"], ["un", "", "a", "uno"], ["buen", "", "good", "bueno"], ["rato", "", "while"], ["mirando", "", "looking at", "mirar"], ["esa", "", "that", "ese"], ["línea", "", "line"], [",", "", ""], ["con", "", "with"], ["el", "", "the"], ["cuaderno", "", "notebook"], ["en", "", "in"], ["las", "", "the", "el"], ["manos", "", "hands", "mano"], [".", "", ""]],
        en: "I spent a good while looking at that line, with the notebook in my hands.",
      },
      {
        t: [["Esa", "", "that", "ese"], ["misma", "", "same", "mismo"], ["tarde", "", "afternoon"], ["lo", "", "it"], ["preparé", "", "I made", "preparar"], ["otra", "", "another", "otro"], ["vez", "", "time"], [",", "", ""], ["sin", "", "without"], ["mirar", "", "looking at"], ["el", "", "the"], ["reloj", "", "clock"], ["ni", "", "nor"], ["el", "", "the"], ["teléfono", "", "phone"], [",", "", ""], ["removiendo", "", "stirring", "remover"], ["durante", "", "for"], ["casi", "", "almost"], ["una", "", "an", "uno"], ["hora", "", "hour"], [".", "", ""]],
        en: "That same afternoon I made it again, without looking at the clock or my phone, stirring for almost an hour.",
      },
      {
        t: [["No", "", "not", "no"], ["sé", "", "I know", "saber"], ["si", "", "if"], ["fue", "", "it was", "ser"], ["la", "", "the", "el"], ["paciencia", "", "patience"], [",", "", ""], ["la", "", "the", "el"], ["sugestión", "", "power of suggestion"], ["o", "", "or"], ["simplemente", "", "simply"], ["la", "", "the", "el"], ["suerte", "", "luck"], [".", "", ""]],
        en: "I don't know if it was patience, the power of suggestion or simply luck.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["cuando", "", "when"], ["mi", "", "my"], ["madre", "", "mother"], ["lo", "", "it"], ["probó", "", "tasted", "probar"], [",", "", ""], ["cerró", "", "closed", "cerrar"], ["los", "", "the", "el"], ["ojos", "", "eyes", "ojo"], ["y", "", "and"], ["se", "", "herself"], ["quedó", "", "remained", "quedarse"], ["en", "", "in"], ["silencio", "", "silence"], [".", "", ""]],
        en: "But when my mother tasted it, she closed her eyes and fell silent.",
      },
      {
        t: [["—", "", ""], ["Sabe", "", "it tastes", "saber"], ["a", "", "of"], ["ella", "", "her"], ["—", "", ""], ["dijo", "", "she said", "decir"], ["por", "", "at"], ["fin", "", "last"], [".", "", ""]],
        en: "\"It tastes like her,\" she said at last.",
      },
      {
        t: [["Ahora", "", "now", "ahora"], ["el", "", "the"], ["cuaderno", "", "notebook"], ["está", "", "is", "estar"], ["en", "", "in"], ["mi", "", "my"], ["cocina", "", "kitchen"], [",", "", ""], ["y", "", "and"], ["cada", "", "each"], ["vez", "", "time"], ["que", "", "that"], ["lo", "", "it"], ["abro", "", "I open", "abrir"], ["tengo", "", "I have", "tener"], ["la", "", "the", "el"], ["sensación", "", "feeling"], ["de", "", "that"], ["que", "", "(that)"], ["mi", "", "my"], ["abuela", "", "grandmother"], ["me", "", "me"], ["sigue", "", "keeps", "seguir"], ["enseñando", "", "teaching", "enseñar"], [".", "", ""]],
        en: "Now the notebook is in my kitchen, and every time I open it I feel that my grandmother is still teaching me.",
      },
    ],
    q: [
      { q: "How did the grandmother cook?", o: ["Always following a cookbook", "From memory and by eye", "With recipes from her sisters"], a: 1 },
      { q: "What did the narrator do last winter?", o: ["Opened a restaurant", "Tried to recreate the rice pudding", "Wrote a cookbook"], a: 1 },
      { q: "Where was the notebook found?", o: ["In a bookshop", "In a tin box at the grandmother's house", "In the narrator's kitchen"], a: 1 },
      { q: "What was the special \"ingredient\" in the notebook?", o: ["A dash of anisette", "Milk from a nearby farm", "Stirring slowly and thinking of who will eat it"], a: 2 },
      { q: "How did the mother react when she tasted the pudding?", o: ["She said it was too sweet", "She said it tasted like the grandmother", "She asked for the recipe"], a: 1 },
    ],
  },
  {
    id: "es-4-remote-villages",
    lv: 4,
    kind: "article",
    title: "El teletrabajo y los pueblos",
    titleEn: "Remote work and villages",
    s: [
      {
        t: [["Durante", "", "for", "durante"], ["décadas", "", "decades", "década"], [",", "", ""], ["miles", "", "thousands", "mil"], ["de", "", "of"], ["pueblos", "", "villages", "pueblo"], ["del", "", "of the", "de"], ["interior", "", "interior"], ["de", "", "of"], ["España", "", "Spain"], ["han", "", "have", "haber"], ["ido", "", "been", "ir"], ["perdiendo", "", "losing", "perder"], ["habitantes", "", "inhabitants", "habitante"], [".", "", ""]],
        en: "For decades, thousands of villages in inland Spain have been losing inhabitants.",
      },
      {
        t: [["Los", "", "the", "el"], ["jóvenes", "", "young people", "joven"], ["se", "", "(themselves)"], ["marchaban", "", "left", "marcharse"], ["a", "", "to"], ["las", "", "the", "el"], ["ciudades", "", "cities", "ciudad"], ["para", "", "to"], ["estudiar", "", "study"], ["o", "", "or"], ["buscar", "", "look for"], ["trabajo", "", "work"], [",", "", ""], ["y", "", "and"], ["muchos", "", "many", "mucho"], ["no", "", "not"], ["regresaban", "", "returned", "regresar"], ["nunca", "", "ever"], [".", "", ""]],
        en: "Young people left for the cities to study or look for work, and many never came back.",
      },
      {
        t: [["Este", "", "this", "este"], ["fenómeno", "", "phenomenon"], [",", "", ""], ["conocido", "", "known", "conocer"], ["como", "", "as"], ["la", "", "the", "el"], ["«", "", ""], ["España", "", "Spain"], ["vaciada", "", "emptied", "vaciar"], ["»", "", ""], [",", "", ""], ["ha", "", "has", "haber"], ["dejado", "", "left", "dejar"], ["regiones", "", "regions", "región"], ["enteras", "", "entire", "entero"], ["con", "", "with"], ["muy", "", "very"], ["poca", "", "little", "poco"], ["población", "", "population"], [".", "", ""]],
        en: "This phenomenon, known as \"emptied Spain\", has left entire regions with very few people.",
      },
      {
        t: [["En", "", "in", "en"], ["algunas", "", "some", "alguno"], ["zonas", "", "areas", "zona"], ["de", "", "of"], ["Soria", "", "Soria"], ["o", "", "or"], ["Teruel", "", "Teruel"], [",", "", ""], ["la", "", "the", "el"], ["densidad", "", "density"], ["es", "", "is", "ser"], ["inferior", "", "lower"], ["a", "", "than"], ["diez", "", "ten"], ["habitantes", "", "inhabitants", "habitante"], ["por", "", "per"], ["kilómetro", "", "kilometre"], ["cuadrado", "", "square"], [".", "", ""]],
        en: "In some parts of Soria or Teruel, the density is lower than ten inhabitants per square kilometre.",
      },
      {
        t: [["Sin", "", "without", "sin"], ["embargo", "", "however"], [",", "", ""], ["en", "", "in"], ["los", "", "the", "el"], ["últimos", "", "last", "último"], ["años", "", "years", "año"], ["ha", "", "has", "haber"], ["surgido", "", "emerged", "surgir"], ["una", "", "a", "uno"], ["tendencia", "", "trend"], ["que", "", "that"], ["podría", "", "could", "poder"], ["cambiar", "", "change"], [",", "", ""], ["al", "", "at the", "a"], ["menos", "", "least"], ["en", "", "in"], ["parte", "", "part"], [",", "", ""], ["esta", "", "this", "este"], ["situación", "", "situation"], [".", "", ""]],
        en: "However, in recent years a trend has emerged that could change this situation, at least in part.",
      },
      {
        t: [["La", "", "the", "el"], ["generalización", "", "spread"], ["del", "", "of the", "de"], ["teletrabajo", "", "remote work"], ["ha", "", "has", "haber"], ["permitido", "", "allowed", "permitir"], ["a", "", "(object marker)"], ["muchos", "", "many", "mucho"], ["profesionales", "", "professionals", "profesional"], ["trabajar", "", "to work"], ["desde", "", "from"], ["cualquier", "", "any", "cualquiera"], ["lugar", "", "place"], ["con", "", "with"], ["una", "", "a", "uno"], ["buena", "", "good", "bueno"], ["conexión", "", "connection"], ["a", "", "to"], ["internet", "", "the internet"], [".", "", ""]],
        en: "The spread of remote work has allowed many professionals to work from anywhere with a good internet connection.",
      },
      {
        t: [["Algunos", "", "some", "alguno"], ["de", "", "of"], ["ellos", "", "them", "él"], ["han", "", "have", "haber"], ["decidido", "", "decided", "decidir"], ["cambiar", "", "to swap"], ["el", "", "the"], ["piso", "", "flat"], ["en", "", "in"], ["la", "", "the", "el"], ["ciudad", "", "city"], ["por", "", "for"], ["una", "", "a", "uno"], ["casa", "", "house"], ["en", "", "in"], ["el", "", "the"], ["campo", "", "countryside"], [".", "", ""]],
        en: "Some of them have decided to swap their flat in the city for a house in the countryside.",
      },
      {
        t: [["Los", "", "the", "el"], ["motivos", "", "reasons", "motivo"], ["son", "", "are", "ser"], ["variados", "", "varied", "variado"], [":", "", ""], ["viviendas", "", "housing", "vivienda"], ["más", "", "more"], ["baratas", "", "cheap", "barato"], [",", "", ""], ["menos", "", "less"], ["ruido", "", "noise"], [",", "", ""], ["más", "", "more"], ["contacto", "", "contact"], ["con", "", "with"], ["la", "", "the", "el"], ["naturaleza", "", "nature"], ["y", "", "and"], ["un", "", "a", "uno"], ["ritmo", "", "pace"], ["de", "", "of"], ["vida", "", "life"], ["más", "", "more"], ["tranquilo", "", "relaxed"], [".", "", ""]],
        en: "The reasons are varied: cheaper housing, less noise, more contact with nature and a more relaxed pace of life.",
      },
      {
        t: [["Varios", "", "several", "vario"], ["ayuntamientos", "", "town councils", "ayuntamiento"], ["han", "", "have", "haber"], ["lanzado", "", "launched", "lanzar"], ["programas", "", "programmes", "programa"], ["para", "", "to"], ["atraer", "", "attract"], ["a", "", "(object marker)"], ["estos", "", "these", "este"], ["nuevos", "", "new", "nuevo"], ["vecinos", "", "residents", "vecino"], [".", "", ""]],
        en: "Several town councils have launched programmes to attract these new residents.",
      },
      {
        t: [["Ofrecen", "", "they offer", "ofrecer"], [",", "", ""], ["por", "", "for"], ["ejemplo", "", "example"], [",", "", ""], ["alquileres", "", "rents", "alquiler"], ["baratos", "", "cheap", "barato"], [",", "", ""], ["ayudas", "", "grants", "ayuda"], ["para", "", "to"], ["rehabilitar", "", "restore"], ["casas", "", "houses", "casa"], ["o", "", "or"], ["espacios", "", "spaces", "espacio"], ["de", "", "of"], ["trabajo", "", "work"], ["compartidos", "", "shared", "compartido"], [".", "", ""]],
        en: "They offer, for example, cheap rents, grants to restore houses or coworking spaces.",
      },
      {
        t: [["En", "", "in", "en"], ["ciertos", "", "certain", "cierto"], ["pueblos", "", "villages", "pueblo"], [",", "", ""], ["la", "", "the", "el"], ["llegada", "", "arrival"], ["de", "", "of"], ["unas", "", "a", "uno"], ["pocas", "", "few", "poco"], ["familias", "", "families", "familia"], ["ha", "", "has", "haber"], ["bastado", "", "been enough", "bastar"], ["para", "", "to"], ["evitar", "", "prevent"], ["el", "", "the"], ["cierre", "", "closure"], ["de", "", "of"], ["la", "", "the", "el"], ["escuela", "", "school"], [".", "", ""]],
        en: "In certain villages, the arrival of a few families has been enough to prevent the school from closing.",
      },
      {
        t: [["No", "", "not", "no"], ["obstante", "", "notwithstanding"], [",", "", ""], ["el", "", "the"], ["cambio", "", "change"], ["no", "", "not"], ["está", "", "is", "estar"], ["exento", "", "free"], ["de", "", "of"], ["dificultades", "", "difficulties", "dificultad"], [".", "", ""]],
        en: "Nevertheless, the change is not without its difficulties.",
      },
      {
        t: [["En", "", "in", "en"], ["muchas", "", "many", "mucho"], ["zonas", "", "areas", "zona"], ["rurales", "", "rural", "rural"], [",", "", ""], ["la", "", "the", "el"], ["conexión", "", "connection"], ["a", "", "to"], ["internet", "", "the internet"], ["sigue", "", "is still", "seguir"], ["siendo", "", "being", "ser"], ["lenta", "", "slow", "lento"], ["o", "", "or"], ["poco", "", "not very"], ["fiable", "", "reliable"], [".", "", ""]],
        en: "In many rural areas, the internet connection is still slow or unreliable.",
      },
      {
        t: [["Además", "", "besides", "además"], [",", "", ""], ["faltan", "", "are lacking", "faltar"], ["servicios", "", "services", "servicio"], ["básicos", "", "basic", "básico"], ["como", "", "such as"], ["centros", "", "centres", "centro"], ["de", "", "of"], ["salud", "", "health"], [",", "", ""], ["transporte", "", "transport"], ["público", "", "public"], ["o", "", "or"], ["tiendas", "", "shops", "tienda"], [".", "", ""]],
        en: "In addition, basic services such as health centres, public transport or shops are lacking.",
      },
      {
        t: [["Quien", "", "whoever", "quien"], ["se", "", "(oneself)"], ["muda", "", "moves", "mudarse"], ["al", "", "to the", "a"], ["campo", "", "countryside"], ["debe", "", "must", "deber"], ["estar", "", "be"], ["dispuesto", "", "willing"], ["a", "", "to"], ["conducir", "", "drive"], ["bastantes", "", "quite a few", "bastante"], ["kilómetros", "", "kilometres", "kilómetro"], ["para", "", "to"], ["hacer", "", "do"], ["gestiones", "", "errands", "gestión"], ["sencillas", "", "simple", "sencillo"], [".", "", ""]],
        en: "Anyone who moves to the countryside must be willing to drive quite a few kilometres to do simple errands.",
      },
      {
        t: [["También", "", "also", "también"], ["existe", "", "exists", "existir"], ["el", "", "the"], ["riesgo", "", "risk"], ["de", "", "of"], ["que", "", "that"], ["la", "", "the", "el"], ["convivencia", "", "coexistence"], ["con", "", "with"], ["los", "", "the", "el"], ["habitantes", "", "inhabitants", "habitante"], ["de", "", "of"], ["toda", "", "all", "todo"], ["la", "", "the", "el"], ["vida", "", "life"], ["no", "", "not"], ["sea", "", "is", "ser"], ["fácil", "", "easy"], [".", "", ""]],
        en: "There is also the risk that living alongside the lifelong residents won't be easy.",
      },
      {
        t: [["Algunos", "", "some", "alguno"], ["vecinos", "", "locals", "vecino"], ["temen", "", "fear", "temer"], ["que", "", "that"], ["los", "", "the", "el"], ["recién", "", "newly"], ["llegados", "", "arrived", "llegado"], ["suban", "", "raise", "subir"], ["los", "", "the", "el"], ["precios", "", "prices", "precio"], ["de", "", "of"], ["la", "", "the", "el"], ["vivienda", "", "housing"], ["o", "", "or"], ["no", "", "not"], ["se", "", "themselves"], ["integren", "", "integrate", "integrarse"], ["en", "", "in"], ["la", "", "the", "el"], ["vida", "", "life"], ["del", "", "of the", "de"], ["pueblo", "", "village"], [".", "", ""]],
        en: "Some locals fear that the newcomers will push up house prices or won't fit into village life.",
      },
      {
        t: [["Por", "", "on", "por"], ["otro", "", "other"], ["lado", "", "side"], [",", "", ""], ["hay", "", "there are", "haber"], ["quien", "", "those who"], ["ve", "", "see", "ver"], ["el", "", "the"], ["teletrabajo", "", "remote work"], ["rural", "", "rural"], ["como", "", "as"], ["una", "", "a", "uno"], ["moda", "", "fashion"], ["pasajera", "", "passing", "pasajero"], [".", "", ""]],
        en: "On the other hand, there are those who see rural remote working as a passing fad.",
      },
      {
        t: [["Según", "", "according to", "según"], ["esta", "", "this", "este"], ["visión", "", "view"], [",", "", ""], ["muchos", "", "many", "mucho"], ["de", "", "of"], ["los", "", "those", "el"], ["que", "", "who"], ["se", "", "(themselves)"], ["fueron", "", "went", "irse"], ["al", "", "to the", "a"], ["campo", "", "countryside"], ["durante", "", "during"], ["la", "", "the", "el"], ["pandemia", "", "pandemic"], ["acabarán", "", "will end up", "acabar"], ["volviendo", "", "going back", "volver"], ["a", "", "to"], ["la", "", "the", "el"], ["ciudad", "", "city"], [".", "", ""]],
        en: "According to this view, many of those who moved to the countryside during the pandemic will end up going back to the city.",
      },
      {
        t: [["Los", "", "the", "el"], ["datos", "", "data", "dato"], [",", "", ""], ["por", "", "for"], ["ahora", "", "now"], [",", "", ""], ["no", "", "not"], ["permiten", "", "allow", "permitir"], ["sacar", "", "to draw"], ["conclusiones", "", "conclusions", "conclusión"], ["definitivas", "", "definitive", "definitivo"], [".", "", ""]],
        en: "For now, the data don't allow us to draw definitive conclusions.",
      },
      {
        t: [["Lo", "", "what", "lo"], ["que", "", "that"], ["sí", "", "indeed"], ["parece", "", "seems", "parecer"], ["claro", "", "clear"], ["es", "", "is", "ser"], ["que", "", "that"], ["la", "", "the", "el"], ["tecnología", "", "technology"], [",", "", ""], ["por", "", "by"], ["sí", "", "itself"], ["sola", "", "alone", "solo"], [",", "", ""], ["no", "", "not"], ["basta", "", "is enough", "bastar"], ["para", "", "to"], ["devolver", "", "give back"], ["la", "", "the", "el"], ["vida", "", "life"], ["a", "", "to"], ["los", "", "the", "el"], ["pueblos", "", "villages", "pueblo"], [".", "", ""]],
        en: "What does seem clear is that technology alone is not enough to bring the villages back to life.",
      },
      {
        t: [["Hacen", "", "are", "hacer"], ["falta", "", "needed"], ["también", "", "also"], ["inversiones", "", "investments", "inversión"], ["en", "", "in"], ["infraestructuras", "", "infrastructure", "infraestructura"], ["y", "", "and"], ["servicios", "", "services", "servicio"], ["públicos", "", "public", "público"], [".", "", ""]],
        en: "Investment in infrastructure and public services is also needed.",
      },
      {
        t: [["Y", "", "and", "y"], [",", "", ""], ["sobre", "", "above"], ["todo", "", "all"], [",", "", ""], ["hace", "", "it is", "hacer"], ["falta", "", "necessary"], ["que", "", "that"], ["las", "", "the", "el"], ["personas", "", "people", "persona"], ["que", "", "who"], ["llegan", "", "arrive", "llegar"], ["se", "", "themselves"], ["sientan", "", "feel", "sentirse"], ["parte", "", "part"], ["de", "", "of"], ["la", "", "the", "el"], ["comunidad", "", "community"], [".", "", ""]],
        en: "And, above all, the people who arrive need to feel part of the community.",
      },
      {
        t: [["Al", "", "at the", "a"], ["fin", "", "end"], ["y", "", "and"], ["al", "", "at the", "a"], ["cabo", "", "end"], [",", "", ""], ["un", "", "a", "uno"], ["pueblo", "", "village"], ["no", "", "not"], ["es", "", "is", "ser"], ["solo", "", "only"], ["un", "", "a", "uno"], ["conjunto", "", "collection"], ["de", "", "of"], ["casas", "", "houses", "casa"], [",", "", ""], ["sino", "", "but"], ["una", "", "a", "uno"], ["red", "", "network"], ["de", "", "of"], ["relaciones", "", "relationships", "relación"], [".", "", ""]],
        en: "After all, a village is not just a collection of houses, but a network of relationships.",
      },
      {
        t: [["Quizá", "", "perhaps", "quizá"], ["el", "", "the"], ["futuro", "", "future"], ["del", "", "of the", "de"], ["campo", "", "countryside"], ["dependa", "", "depends", "depender"], ["precisamente", "", "precisely"], ["de", "", "on"], ["que", "", "(that)"], ["esa", "", "that", "ese"], ["red", "", "network"], ["vuelva", "", "is", "volver"], ["a", "", "(again)"], ["tejerse", "", "woven"], [".", "", ""]],
        en: "Perhaps the future of the countryside depends precisely on that network being woven again.",
      },
    ],
    q: [
      { q: "What has happened to many inland Spanish villages for decades?", o: ["They have grown quickly", "They have been losing inhabitants", "They have become tourist resorts"], a: 1 },
      { q: "What has made it possible for some professionals to move to the countryside?", o: ["Cheaper cars", "The spread of remote work", "New train lines"], a: 1 },
      { q: "What do some town councils offer?", o: ["Free cars", "Cheap rents and grants to restore houses", "Jobs in the town hall"], a: 1 },
      { q: "Which problem does the article mention?", o: ["Too many shops", "Slow or unreliable internet", "Too much public transport"], a: 1 },
      { q: "According to the article, what is needed besides technology?", o: ["Nothing else", "Investment in services and newcomers who feel part of the community", "More tourists"], a: 1 },
    ],
  },
  {
    id: "es-5-lighthouse",
    lv: 5,
    kind: "story",
    title: "El último farero",
    titleEn: "The last lighthouse keeper",
    s: [
      {
        t: [["Durante", "", "for", "durante"], ["treinta", "", "thirty"], ["y", "", "and"], ["dos", "", "two"], ["años", "", "years", "año"], [",", "", ""], ["Tomás", "", "Tomás"], ["Rivas", "", "Rivas"], ["había", "", "had", "haber"], ["subido", "", "climbed", "subir"], ["cada", "", "every"], ["noche", "", "night"], ["los", "", "the", "el"], ["ciento", "", "hundred"], ["catorce", "", "fourteen"], ["escalones", "", "steps", "escalón"], ["del", "", "of the", "de"], ["faro", "", "lighthouse"], ["de", "", "of"], ["Punta", "", "Punta"], ["Negra", "", "Negra"], [".", "", ""]],
        en: "For thirty-two years, Tomás Rivas had climbed the hundred and fourteen steps of the Punta Negra lighthouse every night.",
      },
      {
        t: [["Conocía", "", "he knew", "conocer"], ["cada", "", "every"], ["grieta", "", "crack"], ["de", "", "in"], ["la", "", "the", "el"], ["pared", "", "wall"], [",", "", ""], ["cada", "", "every"], ["crujido", "", "creak"], ["de", "", "of"], ["la", "", "the", "el"], ["escalera", "", "staircase"], ["y", "", "and"], ["cada", "", "each"], ["uno", "", "one"], ["de", "", "of"], ["los", "", "the", "el"], ["humores", "", "moods", "humor"], ["del", "", "of the", "de"], ["mar", "", "sea"], ["que", "", "that"], ["rodeaba", "", "surrounded", "rodear"], ["el", "", "the"], ["cabo", "", "cape"], [".", "", ""]],
        en: "He knew every crack in the wall, every creak of the staircase and each of the moods of the sea around the cape.",
      },
      {
        t: [["Por", "", "for", "por"], ["eso", "", "that"], [",", "", ""], ["cuando", "", "when"], ["le", "", "him"], ["comunicaron", "", "they informed", "comunicar"], ["que", "", "that"], ["el", "", "the"], ["faro", "", "lighthouse"], ["iba", "", "was going", "ir"], ["a", "", "to"], ["automatizarse", "", "be automated", "automatizar"], [",", "", ""], ["no", "", "not"], ["supo", "", "he knew", "saber"], ["si", "", "whether"], ["sentir", "", "to feel"], ["alivio", "", "relief"], ["o", "", "or"], ["tristeza", "", "sadness"], [".", "", ""]],
        en: "So when they told him the lighthouse was going to be automated, he didn't know whether to feel relief or sadness.",
      },
      {
        t: [["Los", "", "the", "el"], ["técnicos", "", "technicians", "técnico"], ["llegaron", "", "arrived", "llegar"], ["una", "", "one", "uno"], ["mañana", "", "morning"], ["de", "", "in"], ["octubre", "", "October"], ["con", "", "with"], ["cajas", "", "boxes", "caja"], ["llenas", "", "full", "lleno"], ["de", "", "of"], ["cables", "", "cables", "cable"], [",", "", ""], ["sensores", "", "sensors", "sensor"], ["y", "", "and"], ["paneles", "", "panels", "panel"], ["solares", "", "solar", "solar"], [".", "", ""]],
        en: "The technicians arrived one October morning with boxes full of cables, sensors and solar panels.",
      },
      {
        t: [["En", "", "in", "en"], ["apenas", "", "barely"], ["una", "", "a", "uno"], ["semana", "", "week"], ["instalaron", "", "they installed", "instalar"], ["un", "", "a", "uno"], ["sistema", "", "system"], ["capaz", "", "capable"], ["de", "", "of"], ["encender", "", "switching on"], ["la", "", "the", "el"], ["luz", "", "light"], [",", "", ""], ["vigilar", "", "monitoring"], ["el", "", "the"], ["estado", "", "condition"], ["del", "", "of the", "de"], ["cristal", "", "glass"], ["y", "", "and"], ["enviar", "", "sending"], ["avisos", "", "alerts", "aviso"], ["a", "", "to"], ["un", "", "a", "uno"], ["centro", "", "centre"], ["de", "", "of"], ["control", "", "control"], ["situado", "", "located", "situar"], ["a", "", "at"], ["doscientos", "", "two hundred"], ["kilómetros", "", "kilometres", "kilómetro"], [".", "", ""]],
        en: "In barely a week they installed a system capable of switching on the light, monitoring the condition of the glass and sending alerts to a control centre two hundred kilometres away.",
      },
      {
        t: [["—", "", ""], ["Ya", "", "any more", "ya"], ["no", "", "not"], ["hará", "", "will be", "hacer"], ["falta", "", "necessary"], ["que", "", "that"], ["nadie", "", "anyone"], ["suba", "", "climbs", "subir"], ["—", "", ""], ["le", "", "to him"], ["explicó", "", "explained", "explicar"], ["el", "", "the"], ["ingeniero", "", "engineer"], [",", "", ""], ["con", "", "with"], ["la", "", "the", "el"], ["amabilidad", "", "kindness"], ["de", "", "of"], ["quien", "", "someone who"], ["da", "", "gives", "dar"], ["una", "", "a", "uno"], ["buena", "", "good", "bueno"], ["noticia", "", "piece of news"], [".", "", ""]],
        en: "\"Nobody will need to go up any more,\" the engineer explained, with the kindness of someone delivering good news.",
      },
      {
        t: [["Tomás", "", "Tomás"], ["asintió", "", "nodded", "asentir"], ["sin", "", "without"], ["decir", "", "saying"], ["nada", "", "anything"], [".", "", ""]],
        en: "Tomás nodded without saying anything.",
      },
      {
        t: [["Le", "", "to him", "le"], ["habían", "", "they had", "haber"], ["concedido", "", "granted", "conceder"], ["la", "", "the", "el"], ["jubilación", "", "retirement"], ["anticipada", "", "early", "anticipado"], ["y", "", "and"], ["un", "", "a", "uno"], ["piso", "", "flat"], ["en", "", "in"], ["el", "", "the"], ["pueblo", "", "town"], [",", "", ""], ["cerca", "", "near"], ["del", "", "of the", "de"], ["puerto", "", "harbour"], [",", "", ""], ["donde", "", "where"], ["podría", "", "he could", "poder"], ["descansar", "", "rest"], ["por", "", "at"], ["fin", "", "last"], [".", "", ""]],
        en: "They had granted him early retirement and a flat in the town, near the harbour, where he could finally rest.",
      },
      {
        t: [["La", "", "the", "el"], ["última", "", "last", "último"], ["noche", "", "night"], [",", "", ""], ["sin", "", "without"], ["embargo", "", "however"], [",", "", ""], ["decidió", "", "he decided", "decidir"], ["subir", "", "to go up"], ["una", "", "one", "uno"], ["vez", "", "time"], ["más", "", "more"], [",", "", ""], ["aunque", "", "although"], ["ya", "", "any longer"], ["no", "", "not"], ["tuviera", "", "he had", "tener"], ["ninguna", "", "any", "ninguno"], ["obligación", "", "obligation"], ["de", "", "to"], ["hacerlo", "", "do it"], [".", "", ""]],
        en: "On the last night, however, he decided to go up one more time, even though he was no longer under any obligation to do so.",
      },
      {
        t: [["Se", "", "himself", "se"], ["sentó", "", "sat down", "sentarse"], ["junto", "", "next"], ["a", "", "to"], ["la", "", "the", "el"], ["lámpara", "", "lamp"], [",", "", ""], ["que", "", "which"], ["ahora", "", "now"], ["giraba", "", "turned", "girar"], ["sola", "", "by itself", "solo"], [",", "", ""], ["y", "", "and"], ["se", "", "himself"], ["quedó", "", "stayed", "quedarse"], ["mirando", "", "looking at", "mirar"], ["el", "", "the"], ["horizonte", "", "horizon"], ["como", "", "as"], ["había", "", "he had", "haber"], ["hecho", "", "done", "hacer"], ["tantas", "", "so many", "tanto"], ["veces", "", "times", "vez"], [".", "", ""]],
        en: "He sat down next to the lamp, which now turned by itself, and stayed looking at the horizon as he had done so many times.",
      },
      {
        t: [["Hacia", "", "around", "hacia"], ["las", "", "the", "el"], ["dos", "", "two"], ["de", "", "in"], ["la", "", "the", "el"], ["madrugada", "", "early morning"], [",", "", ""], ["el", "", "the"], ["viento", "", "wind"], ["cambió", "", "changed", "cambiar"], ["de", "", "(of)"], ["dirección", "", "direction"], ["y", "", "and"], ["empezó", "", "began", "empezar"], ["a", "", "to"], ["levantarse", "", "rise"], ["una", "", "a", "uno"], ["mar", "", "sea"], ["de", "", "of"], ["fondo", "", "bottom"], ["que", "", "that"], ["él", "", "he"], ["conocía", "", "knew", "conocer"], ["bien", "", "well"], [".", "", ""]],
        en: "At around two in the morning, the wind changed direction and a swell he knew well began to rise.",
      },
      {
        t: [["Fue", "", "it was", "ser"], ["entonces", "", "then"], ["cuando", "", "when"], ["distinguió", "", "he made out", "distinguir"], [",", "", ""], ["muy", "", "very"], ["a", "", "at"], ["lo", "", "(the)"], ["lejos", "", "far"], [",", "", ""], ["una", "", "a", "uno"], ["luz", "", "light"], ["pequeña", "", "small", "pequeño"], ["que", "", "that"], ["aparecía", "", "appeared", "aparecer"], ["y", "", "and"], ["desaparecía", "", "disappeared", "desaparecer"], ["entre", "", "between"], ["las", "", "the", "el"], ["olas", "", "waves", "ola"], [".", "", ""]],
        en: "It was then that he made out, far in the distance, a small light appearing and disappearing between the waves.",
      },
      {
        t: [["No", "", "not", "no"], ["era", "", "it was", "ser"], ["la", "", "the", "el"], ["luz", "", "light"], ["de", "", "of"], ["ninguna", "", "any", "ninguno"], ["boya", "", "buoy"], ["ni", "", "nor"], ["la", "", "that", "el"], ["de", "", "of"], ["un", "", "a", "uno"], ["barco", "", "ship"], ["grande", "", "big"], [":", "", ""], ["estaba", "", "it was", "estar"], ["demasiado", "", "too"], ["baja", "", "low", "bajo"], ["y", "", "and"], ["se", "", "itself"], ["movía", "", "moved", "moverse"], ["de", "", "in"], ["forma", "", "way"], ["irregular", "", "irregular"], [".", "", ""]],
        en: "It wasn't the light of a buoy or of a big ship: it was too low and it moved erratically.",
      },
      {
        t: [["Tomás", "", "Tomás"], ["buscó", "", "looked for", "buscar"], ["los", "", "the", "el"], ["prismáticos", "", "binoculars"], ["y", "", "and"], ["confirmó", "", "confirmed", "confirmar"], ["lo", "", "what"], ["que", "", "that"], ["temía", "", "he feared", "temer"], [":", "", ""], ["un", "", "a", "uno"], ["pequeño", "", "small"], ["pesquero", "", "fishing boat"], ["avanzaba", "", "was moving", "avanzar"], ["con", "", "with"], ["dificultad", "", "difficulty"], ["hacia", "", "towards"], ["las", "", "the", "el"], ["rocas", "", "rocks", "roca"], [".", "", ""]],
        en: "Tomás got his binoculars and confirmed what he feared: a small fishing boat was struggling towards the rocks.",
      },
      {
        t: [["Probablemente", "", "probably", "probablemente"], ["había", "", "it had", "haber"], ["perdido", "", "lost", "perder"], ["el", "", "the"], ["motor", "", "engine"], [",", "", ""], ["o", "", "or"], ["el", "", "the"], ["patrón", "", "skipper"], ["no", "", "not"], ["veía", "", "could see", "ver"], ["bien", "", "well"], ["la", "", "the", "el"], ["costa", "", "coast"], ["con", "", "with"], ["aquella", "", "that", "aquel"], ["niebla", "", "fog"], ["repentina", "", "sudden", "repentino"], [".", "", ""]],
        en: "It had probably lost its engine, or the skipper couldn't see the coast clearly in that sudden fog.",
      },
      {
        t: [["Ninguno", "", "none", "ninguno"], ["de", "", "of"], ["los", "", "the", "el"], ["sensores", "", "sensors", "sensor"], ["recién", "", "newly"], ["instalados", "", "installed", "instalar"], ["estaba", "", "was", "estar"], ["diseñado", "", "designed", "diseñar"], ["para", "", "to"], ["detectar", "", "detect"], ["algo", "", "something"], ["así", "", "like that"], [".", "", ""]],
        en: "None of the newly installed sensors was designed to detect anything like that.",
      },
      {
        t: [["El", "", "the", "el"], ["sistema", "", "system"], ["seguiría", "", "would go on", "seguir"], ["encendiendo", "", "switching on", "encender"], ["la", "", "the", "el"], ["luz", "", "light"], ["con", "", "with"], ["una", "", "a", "uno"], ["puntualidad", "", "punctuality"], ["perfecta", "", "perfect", "perfecto"], [",", "", ""], ["pero", "", "but"], ["no", "", "not"], ["avisaría", "", "would alert", "avisar"], ["a", "", "(object marker)"], ["nadie", "", "anyone"], [".", "", ""]],
        en: "The system would go on switching on the light with perfect punctuality, but it wouldn't alert anyone.",
      },
      {
        t: [["Tomás", "", "Tomás"], ["bajó", "", "went down", "bajar"], ["corriendo", "", "running", "correr"], ["los", "", "the", "el"], ["escalones", "", "steps", "escalón"], [",", "", ""], ["como", "", "as"], ["no", "", "not"], ["lo", "", "it"], ["hacía", "", "had done", "hacer"], ["desde", "", "for"], ["hacía", "", "(it had been)", "hacer"], ["años", "", "years", "año"], [",", "", ""], ["y", "", "and"], ["llamó", "", "called", "llamar"], ["a", "", "(object marker)"], ["Salvamento", "", "Rescue"], ["Marítimo", "", "Maritime"], ["desde", "", "from"], ["el", "", "the"], ["teléfono", "", "phone"], ["de", "", "in"], ["la", "", "the", "el"], ["caseta", "", "hut"], [".", "", ""]],
        en: "Tomás ran down the steps, as he hadn't done for years, and called Maritime Rescue from the phone in the hut.",
      },
      {
        t: [["Dio", "", "he gave", "dar"], ["la", "", "the", "el"], ["posición", "", "position"], ["exacta", "", "exact", "exacto"], ["con", "", "with"], ["una", "", "a", "uno"], ["precisión", "", "precision"], ["que", "", "that"], ["sorprendió", "", "surprised", "sorprender"], ["al", "", "(to) the", "a"], ["operador", "", "operator"], [":", "", ""], ["conocía", "", "he knew", "conocer"], ["cada", "", "every"], ["metro", "", "metre"], ["de", "", "of"], ["aquella", "", "that", "aquel"], ["costa", "", "coast"], [".", "", ""]],
        en: "He gave the exact position with a precision that surprised the operator: he knew every metre of that coast.",
      },
      {
        t: [["Cuarenta", "", "forty", "cuarenta"], ["minutos", "", "minutes", "minuto"], ["más", "", "more"], ["tarde", "", "later"], [",", "", ""], ["una", "", "a", "uno"], ["lancha", "", "boat"], ["de", "", "of"], ["rescate", "", "rescue"], ["remolcaba", "", "was towing", "remolcar"], ["el", "", "the"], ["pesquero", "", "fishing boat"], ["hacia", "", "towards"], ["el", "", "the"], ["puerto", "", "harbour"], [".", "", ""]],
        en: "Forty minutes later, a rescue boat was towing the fishing boat towards the harbour.",
      },
      {
        t: [["A", "", "on", "a"], ["bordo", "", "board"], ["iban", "", "were (travelling)", "ir"], ["dos", "", "two"], ["hermanos", "", "brothers", "hermano"], [",", "", ""], ["empapados", "", "soaked", "empapado"], ["y", "", "and"], ["asustados", "", "frightened", "asustado"], [",", "", ""], ["pero", "", "but"], ["sanos", "", "safe", "sano"], ["y", "", "and"], ["salvos", "", "sound", "salvo"], [".", "", ""]],
        en: "On board were two brothers, soaked and frightened, but safe and sound.",
      },
      {
        t: [["Al", "", "at the", "a"], ["amanecer", "", "dawn"], [",", "", ""], ["Tomás", "", "Tomás"], ["cerró", "", "closed", "cerrar"], ["la", "", "the", "el"], ["puerta", "", "door"], ["del", "", "of the", "de"], ["faro", "", "lighthouse"], ["y", "", "and"], ["entregó", "", "handed over", "entregar"], ["la", "", "the", "el"], ["llave", "", "key"], [",", "", ""], ["tal", "", "just"], ["como", "", "as"], ["estaba", "", "it was", "estar"], ["previsto", "", "planned", "prever"], [".", "", ""]],
        en: "At dawn, Tomás closed the lighthouse door and handed over the key, just as planned.",
      },
      {
        t: [["No", "", "not", "no"], ["protestó", "", "he protested", "protestar"], ["ni", "", "nor"], ["pidió", "", "asked", "pedir"], ["que", "", "that"], ["lo", "", "him"], ["dejaran", "", "they let", "dejar"], ["quedarse", "", "stay"], [";", "", ""], ["sabía", "", "he knew", "saber"], ["que", "", "that"], ["el", "", "the"], ["mundo", "", "world"], ["había", "", "had", "haber"], ["cambiado", "", "changed", "cambiar"], ["y", "", "and"], ["que", "", "that"], ["no", "", "no"], ["tenía", "", "it had", "tener"], ["sentido", "", "sense"], ["resistirse", "", "to resist"], [".", "", ""]],
        en: "He didn't protest or ask to be allowed to stay; he knew the world had changed and that there was no point in resisting.",
      },
      {
        t: [["Aun", "", "even", "aun"], ["así", "", "so"], [",", "", ""], ["aquella", "", "that", "aquel"], ["noche", "", "night"], ["le", "", "him"], ["había", "", "had", "haber"], ["dejado", "", "left", "dejar"], ["una", "", "a", "uno"], ["certeza", "", "certainty"], ["que", "", "that"], ["no", "", "not"], ["conseguía", "", "he could", "conseguir"], ["quitarse", "", "get out"], ["de", "", "of"], ["la", "", "the", "el"], ["cabeza", "", "head"], [".", "", ""]],
        en: "Even so, that night had left him with a certainty he couldn't get out of his head.",
      },
      {
        t: [["Las", "", "the", "el"], ["máquinas", "", "machines", "máquina"], ["podían", "", "could", "poder"], ["encargarse", "", "take care"], ["de", "", "of"], ["la", "", "the", "el"], ["luz", "", "light"], [",", "", ""], ["pero", "", "but"], ["no", "", "not"], ["de", "", "of"], ["la", "", "the", "el"], ["mirada", "", "watching"], [".", "", ""]],
        en: "Machines could take care of the light, but not of the watching.",
      },
      {
        t: [["Unos", "", "a few", "uno"], ["días", "", "days", "día"], ["después", "", "later"], [",", "", ""], ["alguien", "", "someone"], ["llamó", "", "knocked", "llamar"], ["a", "", "at"], ["la", "", "the", "el"], ["puerta", "", "door"], ["de", "", "of"], ["su", "", "his"], ["nuevo", "", "new"], ["piso", "", "flat"], [".", "", ""]],
        en: "A few days later, someone knocked at the door of his new flat.",
      },
      {
        t: [["Eran", "", "they were", "ser"], ["los", "", "the", "el"], ["dos", "", "two"], ["hermanos", "", "brothers", "hermano"], ["del", "", "from the", "de"], ["pesquero", "", "fishing boat"], [",", "", ""], ["con", "", "with"], ["una", "", "a", "uno"], ["caja", "", "box"], ["de", "", "of"], ["percebes", "", "goose barnacles", "percebe"], ["y", "", "and"], ["una", "", "an", "uno"], ["invitación", "", "invitation"], ["para", "", "to"], ["salir", "", "go out"], ["a", "", "to"], ["faenar", "", "fish"], ["con", "", "with"], ["ellos", "", "them", "él"], ["cuando", "", "whenever"], ["quisiera", "", "he wanted", "querer"], [".", "", ""]],
        en: "It was the two brothers from the fishing boat, with a box of goose barnacles and an invitation to go out fishing with them whenever he liked.",
      },
      {
        t: [["Tomás", "", "Tomás"], ["aceptó", "", "accepted", "aceptar"], [",", "", ""], ["y", "", "and"], ["desde", "", "since"], ["entonces", "", "then"], ["sale", "", "goes out", "salir"], ["al", "", "to the", "a"], ["mar", "", "sea"], ["con", "", "with"], ["ellos", "", "them", "él"], ["los", "", "on", "el"], ["domingos", "", "Sundays", "domingo"], [".", "", ""]],
        en: "Tomás accepted, and since then he has gone out to sea with them on Sundays.",
      },
      {
        t: [["Desde", "", "from", "desde"], ["la", "", "the", "el"], ["cubierta", "", "deck"], [",", "", ""], ["el", "", "the"], ["faro", "", "lighthouse"], ["se", "", "itself"], ["ve", "", "looks", "ver"], ["pequeño", "", "small"], [",", "", ""], ["casi", "", "almost"], ["frágil", "", "fragile"], [",", "", ""], ["girando", "", "turning", "girar"], ["con", "", "with"], ["su", "", "its"], ["precisión", "", "precision"], ["de", "", "of"], ["máquina", "", "machine"], [".", "", ""]],
        en: "From the deck, the lighthouse looks small, almost fragile, turning with its machine precision.",
      },
      {
        t: [["Y", "", "and", "y"], ["Tomás", "", "Tomás"], [",", "", ""], ["cada", "", "each"], ["vez", "", "time"], ["que", "", "that"], ["pasa", "", "he passes", "pasar"], ["frente", "", "in front"], ["a", "", "of"], ["él", "", "it"], [",", "", ""], ["levanta", "", "raises", "levantar"], ["la", "", "the", "el"], ["mano", "", "hand"], ["para", "", "to"], ["saludarlo", "", "greet it", "saludar"], [",", "", ""], ["como", "", "like"], ["quien", "", "someone who"], ["saluda", "", "greets", "saludar"], ["a", "", "(object marker)"], ["un", "", "a", "uno"], ["viejo", "", "old"], ["compañero", "", "colleague"], ["de", "", "from"], ["trabajo", "", "work"], [".", "", ""]],
        en: "And every time Tomás passes it, he raises his hand to greet it, like someone waving to an old workmate.",
      },
    ],
    q: [
      { q: "How long had Tomás worked at the lighthouse?", o: ["Twelve years", "Thirty-two years", "Forty years"], a: 1 },
      { q: "Why did Tomás go up the lighthouse on the last night?", o: ["He had to check the new system", "He wanted to, although it was no longer his duty", "The engineer asked him to"], a: 1 },
      { q: "What did Tomás see during the night?", o: ["A big ship passing safely", "A small fishing boat in trouble near the rocks", "A fire on the coast"], a: 1 },
      { q: "What certainty did that night leave him with?", o: ["That the new system was useless", "That machines can keep the light on but cannot watch", "That he should not retire"], a: 1 },
      { q: "What do the two brothers do afterwards?", o: ["They write to the newspaper", "They bring him a gift and invite him to fish with them", "They ask him to work on their boat full time"], a: 1 },
    ],
  },
  {
    id: "es-5-olive-trees",
    lv: 5,
    kind: "article",
    title: "Los olivos milenarios",
    titleEn: "Thousand-year-old olive trees",
    s: [
      {
        t: [["En", "", "in", "en"], ["algunos", "", "some", "alguno"], ["rincones", "", "corners", "rincón"], ["del", "", "of the", "de"], ["Mediterráneo", "", "Mediterranean"], ["crecen", "", "grow", "crecer"], ["olivos", "", "olive trees", "olivo"], ["que", "", "that"], ["ya", "", "already"], ["daban", "", "bore", "dar"], ["fruto", "", "fruit"], ["cuando", "", "when"], ["el", "", "the"], ["Imperio", "", "Empire"], ["romano", "", "Roman"], ["aún", "", "still"], ["dominaba", "", "ruled", "dominar"], ["la", "", "the", "el"], ["región", "", "region"], [".", "", ""]],
        en: "In some corners of the Mediterranean grow olive trees that were already bearing fruit when the Roman Empire still ruled the region.",
      },
      {
        t: [["Se", "", "(they)", "se"], ["los", "", "them", "lo"], ["conoce", "", "knows", "conocer"], ["como", "", "as"], ["olivos", "", "olive trees", "olivo"], ["milenarios", "", "thousand-year-old", "milenario"], [",", "", ""], ["aunque", "", "although"], ["calcular", "", "calculating"], ["su", "", "their"], ["edad", "", "age"], ["exacta", "", "exact", "exacto"], ["resulta", "", "turns out", "resultar"], ["bastante", "", "quite"], ["más", "", "more"], ["complicado", "", "complicated"], ["de", "", "than"], ["lo", "", "what"], ["que", "", "(that)"], ["parece", "", "it seems", "parecer"], [".", "", ""]],
        en: "They are known as thousand-year-old olive trees, although working out their exact age turns out to be far more complicated than it seems.",
      },
      {
        t: [["A", "", "unlike", "a"], ["diferencia", "", "difference"], ["de", "", "from"], ["otros", "", "other", "otro"], ["árboles", "", "trees", "árbol"], [",", "", ""], ["el", "", "the"], ["olivo", "", "olive tree"], ["envejece", "", "ages", "envejecer"], ["de", "", "in"], ["una", "", "a", "uno"], ["manera", "", "way"], ["peculiar", "", "peculiar"], [":", "", ""], ["con", "", "with"], ["los", "", "the", "el"], ["siglos", "", "centuries", "siglo"], [",", "", ""], ["el", "", "the"], ["centro", "", "centre"], ["del", "", "of the", "de"], ["tronco", "", "trunk"], ["se", "", "itself"], ["va", "", "goes", "ir"], ["pudriendo", "", "rotting", "pudrir"], ["y", "", "and"], ["desapareciendo", "", "disappearing", "desaparecer"], [".", "", ""]],
        en: "Unlike other trees, the olive ages in a peculiar way: over the centuries, the centre of the trunk gradually rots away and disappears.",
      },
      {
        t: [["Por", "", "for", "por"], ["eso", "", "that"], ["no", "", "not"], ["es", "", "is", "ser"], ["posible", "", "possible"], ["contar", "", "to count"], ["los", "", "the", "el"], ["anillos", "", "rings", "anillo"], [",", "", ""], ["como", "", "as"], ["se", "", "one"], ["haría", "", "would do", "hacer"], ["con", "", "with"], ["un", "", "a", "uno"], ["pino", "", "pine"], ["o", "", "or"], ["un", "", "an", "uno"], ["roble", "", "oak"], [".", "", ""]],
        en: "That's why it isn't possible to count the rings, as one would with a pine or an oak.",
      },
      {
        t: [["Los", "", "the", "el"], ["especialistas", "", "specialists", "especialista"], ["recurren", "", "resort", "recurrir"], ["a", "", "to"], ["métodos", "", "methods", "método"], ["indirectos", "", "indirect", "indirecto"], [",", "", ""], ["como", "", "such as"], ["medir", "", "measuring"], ["el", "", "the"], ["perímetro", "", "girth"], ["del", "", "of the", "de"], ["tronco", "", "trunk"], ["a", "", "at"], ["cierta", "", "a certain", "cierto"], ["altura", "", "height"], ["del", "", "from the", "de"], ["suelo", "", "ground"], [".", "", ""]],
        en: "Specialists resort to indirect methods, such as measuring the girth of the trunk at a certain height above the ground.",
      },
      {
        t: [["En", "", "in", "en"], ["España", "", "Spain"], [",", "", ""], ["una", "", "one", "uno"], ["de", "", "of"], ["las", "", "the", "el"], ["mayores", "", "greatest", "mayor"], ["concentraciones", "", "concentrations", "concentración"], ["de", "", "of"], ["estos", "", "these", "este"], ["ejemplares", "", "specimens", "ejemplar"], ["se", "", "itself"], ["encuentra", "", "is found", "encontrar"], ["en", "", "in"], ["el", "", "the"], ["llamado", "", "so-called", "llamar"], ["Territorio", "", "Territory"], ["Sénia", "", "Sénia"], [",", "", ""], ["entre", "", "between"], ["Castellón", "", "Castellón"], [",", "", ""], ["Tarragona", "", "Tarragona"], ["y", "", "and"], ["Teruel", "", "Teruel"], [".", "", ""]],
        en: "In Spain, one of the largest concentrations of these specimens is found in the so-called Sénia Territory, between Castellón, Tarragona and Teruel.",
      },
      {
        t: [["Allí", "", "there", "allí"], ["se", "", "(passive)"], ["han", "", "have", "haber"], ["catalogado", "", "catalogued", "catalogar"], ["miles", "", "thousands", "mil"], ["de", "", "of"], ["olivos", "", "olive trees", "olivo"], ["monumentales", "", "monumental", "monumental"], [",", "", ""], ["algunos", "", "some", "alguno"], ["de", "", "of"], ["ellos", "", "them", "él"], ["con", "", "with"], ["troncos", "", "trunks", "tronco"], ["tan", "", "so"], ["anchos", "", "wide", "ancho"], ["que", "", "that"], ["hacen", "", "are", "hacer"], ["falta", "", "needed"], ["varias", "", "several", "vario"], ["personas", "", "people", "persona"], ["para", "", "to"], ["abrazarlos", "", "hug them", "abrazar"], [".", "", ""]],
        en: "Thousands of monumental olive trees have been catalogued there, some with trunks so wide that it takes several people to hug them.",
      },
      {
        t: [["Durante", "", "for", "durante"], ["mucho", "", "a long"], ["tiempo", "", "time"], [",", "", ""], ["sin", "", "without"], ["embargo", "", "however"], [",", "", ""], ["estos", "", "these", "este"], ["árboles", "", "trees", "árbol"], ["no", "", "not"], ["recibieron", "", "received", "recibir"], ["ninguna", "", "any", "ninguno"], ["atención", "", "attention"], ["especial", "", "special"], [".", "", ""]],
        en: "For a long time, however, these trees received no special attention.",
      },
      {
        t: [["Para", "", "for", "para"], ["los", "", "the", "el"], ["agricultores", "", "farmers", "agricultor"], ["eran", "", "they were", "ser"], ["simplemente", "", "simply"], ["olivos", "", "olive trees", "olivo"], ["viejos", "", "old", "viejo"], [",", "", ""], ["poco", "", "not very"], ["productivos", "", "productive", "productivo"], ["y", "", "and"], ["difíciles", "", "difficult", "difícil"], ["de", "", "to"], ["trabajar", "", "work"], [".", "", ""]],
        en: "For farmers they were simply old olive trees, not very productive and hard to work.",
      },
      {
        t: [["A", "", "at", "a"], ["finales", "", "the end", "final"], ["del", "", "of the", "de"], ["siglo", "", "century"], ["XX", "", "20th"], [",", "", ""], ["la", "", "the", "el"], ["situación", "", "situation"], ["cambió", "", "changed", "cambiar"], ["de", "", "in"], ["manera", "", "way"], ["inesperada", "", "unexpected", "inesperado"], [".", "", ""]],
        en: "At the end of the 20th century, the situation changed unexpectedly.",
      },
      {
        t: [["Paisajistas", "", "landscape designers", "paisajista"], [",", "", ""], ["constructores", "", "builders", "constructor"], ["y", "", "and"], ["propietarios", "", "owners", "propietario"], ["de", "", "of"], ["grandes", "", "large", "grande"], ["jardines", "", "gardens", "jardín"], ["empezaron", "", "began", "empezar"], ["a", "", "to"], ["interesarse", "", "take an interest"], ["por", "", "in"], ["ellos", "", "them", "él"], ["como", "", "as"], ["elementos", "", "elements", "elemento"], ["decorativos", "", "decorative", "decorativo"], [".", "", ""]],
        en: "Landscape designers, builders and owners of large gardens began to take an interest in them as decorative features.",
      },
      {
        t: [["Un", "", "a", "uno"], ["olivo", "", "olive tree"], ["centenario", "", "centuries-old"], ["en", "", "on"], ["una", "", "a", "uno"], ["rotonda", "", "roundabout"], ["o", "", "or"], ["en", "", "at"], ["la", "", "the", "el"], ["entrada", "", "entrance"], ["de", "", "of"], ["un", "", "a", "uno"], ["hotel", "", "hotel"], ["de", "", "of"], ["lujo", "", "luxury"], ["se", "", "itself"], ["convirtió", "", "became", "convertirse"], ["en", "", "(into)"], ["un", "", "a", "uno"], ["símbolo", "", "symbol"], ["de", "", "of"], ["prestigio", "", "prestige"], [".", "", ""]],
        en: "A centuries-old olive tree on a roundabout or at the entrance to a luxury hotel became a status symbol.",
      },
      {
        t: [["Muchos", "", "many", "mucho"], ["agricultores", "", "farmers", "agricultor"], [",", "", ""], ["que", "", "who"], ["apenas", "", "barely"], ["sacaban", "", "made", "sacar"], ["beneficio", "", "profit"], ["de", "", "from"], ["sus", "", "their", "su"], ["tierras", "", "lands", "tierra"], [",", "", ""], ["vendieron", "", "sold", "vender"], ["sus", "", "their", "su"], ["árboles", "", "trees", "árbol"], ["por", "", "for"], ["cantidades", "", "sums", "cantidad"], ["que", "", "that"], ["les", "", "to them", "le"], ["parecían", "", "seemed", "parecer"], ["irresistibles", "", "irresistible", "irresistible"], [".", "", ""]],
        en: "Many farmers, who barely made a profit from their land, sold their trees for sums that seemed irresistible to them.",
      },
      {
        t: [["Los", "", "the", "el"], ["olivos", "", "olive trees", "olivo"], ["se", "", "(were)"], ["arrancaban", "", "uprooted", "arrancar"], ["con", "", "with"], ["maquinaria", "", "machinery"], ["pesada", "", "heavy", "pesado"], [",", "", ""], ["se", "", "(were)"], ["transportaban", "", "transported", "transportar"], ["en", "", "in"], ["camiones", "", "lorries", "camión"], ["y", "", "and"], ["se", "", "(were)"], ["replantaban", "", "replanted", "replantar"], ["a", "", "at"], ["cientos", "", "hundreds", "ciento"], ["o", "", "or"], ["miles", "", "thousands", "mil"], ["de", "", "of"], ["kilómetros", "", "kilometres", "kilómetro"], [".", "", ""]],
        en: "The olive trees were uprooted with heavy machinery, transported in lorries and replanted hundreds or thousands of kilometres away.",
      },
      {
        t: [["No", "", "not", "no"], ["todos", "", "all", "todo"], ["sobrevivían", "", "survived", "sobrevivir"], ["al", "", "(to) the", "a"], ["traslado", "", "move"], [":", "", ""], ["un", "", "a", "uno"], ["árbol", "", "tree"], ["que", "", "that"], ["ha", "", "has", "haber"], ["resistido", "", "withstood", "resistir"], ["siglos", "", "centuries", "siglo"], ["de", "", "of"], ["sequías", "", "droughts", "sequía"], ["puede", "", "can", "poder"], ["morir", "", "die"], ["en", "", "in"], ["pocos", "", "a few", "poco"], ["meses", "", "months", "mes"], ["lejos", "", "far"], ["de", "", "from"], ["su", "", "its"], ["suelo", "", "soil"], [".", "", ""]],
        en: "Not all of them survived the move: a tree that has withstood centuries of drought can die within a few months far from its soil.",
      },
      {
        t: [["Con", "", "with", "con"], ["el", "", "the"], ["tiempo", "", "time"], [",", "", ""], ["la", "", "the", "el"], ["pérdida", "", "loss"], ["de", "", "of"], ["ejemplares", "", "specimens", "ejemplar"], ["empezó", "", "began", "empezar"], ["a", "", "to"], ["preocupar", "", "worry"], ["a", "", "(object marker)"], ["ecologistas", "", "environmentalists", "ecologista"], [",", "", ""], ["historiadores", "", "historians", "historiador"], ["y", "", "and"], ["a", "", "(object marker)"], ["los", "", "the", "el"], ["propios", "", "very", "propio"], ["vecinos", "", "locals", "vecino"], [".", "", ""]],
        en: "Over time, the loss of trees began to worry environmentalists, historians and the locals themselves.",
      },
      {
        t: [["Comprendieron", "", "they understood", "comprender"], ["que", "", "that"], [",", "", ""], ["además", "", "besides"], ["de", "", "(of)"], ["su", "", "their"], ["valor", "", "value"], ["botánico", "", "botanical"], [",", "", ""], ["estos", "", "these", "este"], ["árboles", "", "trees", "árbol"], ["formaban", "", "formed", "formar"], ["parte", "", "part"], ["del", "", "of the", "de"], ["paisaje", "", "landscape"], ["cultural", "", "cultural"], ["de", "", "of"], ["la", "", "the", "el"], ["zona", "", "area"], [".", "", ""]],
        en: "They understood that, besides their botanical value, these trees were part of the area's cultural landscape.",
      },
      {
        t: [["Algunas", "", "some", "alguno"], ["comunidades", "", "regions", "comunidad"], ["autónomas", "", "autonomous", "autónomo"], ["aprobaron", "", "passed", "aprobar"], ["entonces", "", "then"], ["normas", "", "rules", "norma"], ["para", "", "to"], ["proteger", "", "protect"], ["los", "", "the", "el"], ["olivos", "", "olive trees", "olivo"], ["monumentales", "", "monumental", "monumental"], ["y", "", "and"], ["limitar", "", "restrict"], ["su", "", "their"], ["arranque", "", "uprooting"], [".", "", ""]],
        en: "Some regional governments then passed rules to protect monumental olive trees and restrict their uprooting.",
      },
      {
        t: [["Al", "", "at the", "a"], ["mismo", "", "same"], ["tiempo", "", "time"], [",", "", ""], ["surgieron", "", "emerged", "surgir"], ["iniciativas", "", "initiatives", "iniciativa"], ["para", "", "to"], ["darles", "", "give them", "dar"], ["un", "", "a", "uno"], ["valor", "", "value"], ["económico", "", "economic"], ["sin", "", "without"], ["necesidad", "", "need"], ["de", "", "to"], ["sacarlos", "", "take them out", "sacar"], ["de", "", "of"], ["la", "", "the", "el"], ["tierra", "", "ground"], [".", "", ""]],
        en: "At the same time, initiatives emerged to give them economic value without having to take them out of the ground.",
      },
      {
        t: [["Una", "", "one", "uno"], ["de", "", "of"], ["ellas", "", "them", "él"], ["consiste", "", "consists", "consistir"], ["en", "", "in"], ["producir", "", "producing"], ["aceite", "", "oil"], ["exclusivamente", "", "exclusively"], ["con", "", "with"], ["aceitunas", "", "olives", "aceituna"], ["de", "", "from"], ["árboles", "", "trees", "árbol"], ["milenarios", "", "thousand-year-old", "milenario"], [".", "", ""]],
        en: "One of them consists of producing oil exclusively from the olives of thousand-year-old trees.",
      },
      {
        t: [["Se", "", "it", "se"], ["trata", "", "is about", "tratarse"], ["de", "", "(of)"], ["un", "", "an", "uno"], ["aceite", "", "oil"], ["escaso", "", "scarce"], ["y", "", "and"], ["caro", "", "expensive"], [",", "", ""], ["que", "", "that"], ["se", "", "(is)"], ["vende", "", "sold", "vender"], ["como", "", "as"], ["un", "", "a", "uno"], ["producto", "", "product"], ["de", "", "of"], ["lujo", "", "luxury"], ["y", "", "and"], ["que", "", "that"], ["permite", "", "allows", "permitir"], ["a", "", "(object marker)"], ["los", "", "the", "el"], ["agricultores", "", "farmers", "agricultor"], ["obtener", "", "to obtain"], ["ingresos", "", "income", "ingreso"], ["sin", "", "without"], ["tocar", "", "touching"], ["los", "", "the", "el"], ["árboles", "", "trees", "árbol"], [".", "", ""]],
        en: "It is a scarce, expensive oil, sold as a luxury product, which lets farmers earn an income without touching the trees.",
      },
      {
        t: [["Otra", "", "another", "otro"], ["vía", "", "route"], ["es", "", "is", "ser"], ["el", "", "the"], ["turismo", "", "tourism"], [":", "", ""], ["hoy", "", "today"], ["existen", "", "there are", "existir"], ["rutas", "", "routes", "ruta"], ["señalizadas", "", "signposted", "señalizado"], ["que", "", "that"], ["permiten", "", "allow", "permitir"], ["recorrer", "", "to visit"], ["los", "", "the", "el"], ["ejemplares", "", "specimens", "ejemplar"], ["más", "", "most"], ["impresionantes", "", "impressive", "impresionante"], [".", "", ""]],
        en: "Another route is tourism: today there are signposted trails that take you to the most impressive trees.",
      },
      {
        t: [["También", "", "also", "también"], ["se", "", "(have)"], ["han", "", "have", "haber"], ["puesto", "", "set", "poner"], ["en", "", "in"], ["marcha", "", "motion"], ["programas", "", "programmes", "programa"], ["de", "", "of"], ["apadrinamiento", "", "sponsorship"], [",", "", ""], ["en", "", "in"], ["los", "", "the", "el"], ["que", "", "which"], ["particulares", "", "individuals", "particular"], ["o", "", "or"], ["empresas", "", "companies", "empresa"], ["pagan", "", "pay", "pagar"], ["por", "", "for"], ["el", "", "the"], ["cuidado", "", "care"], ["de", "", "of"], ["un", "", "a", "uno"], ["olivo", "", "olive tree"], ["concreto", "", "particular"], [".", "", ""]],
        en: "Sponsorship programmes have also been set up, in which individuals or companies pay for the care of a particular olive tree.",
      },
      {
        t: [["Estas", "", "these", "este"], ["iniciativas", "", "initiatives", "iniciativa"], ["no", "", "not"], ["han", "", "have", "haber"], ["resuelto", "", "solved", "resolver"], ["todos", "", "all", "todo"], ["los", "", "the", "el"], ["problemas", "", "problems", "problema"], [",", "", ""], ["pero", "", "but"], ["han", "", "have", "haber"], ["cambiado", "", "changed", "cambiar"], ["la", "", "the", "el"], ["manera", "", "way"], ["en", "", "in"], ["que", "", "which"], ["la", "", "the", "el"], ["gente", "", "people"], ["mira", "", "looks at", "mirar"], ["estos", "", "these", "este"], ["árboles", "", "trees", "árbol"], [".", "", ""]],
        en: "These initiatives haven't solved every problem, but they have changed the way people look at these trees.",
      },
      {
        t: [["Lo", "", "what", "lo"], ["que", "", "that"], ["antes", "", "before"], ["era", "", "was", "ser"], ["un", "", "a", "uno"], ["estorbo", "", "nuisance"], ["se", "", "itself"], ["ha", "", "has", "haber"], ["convertido", "", "become", "convertirse"], ["en", "", "(into)"], ["motivo", "", "reason"], ["de", "", "for"], ["orgullo", "", "pride"], [".", "", ""]],
        en: "What used to be a nuisance has become a source of pride.",
      },
      {
        t: [["Los", "", "the", "el"], ["expertos", "", "experts", "experto"], ["insisten", "", "insist", "insistir"], [",", "", ""], ["no", "", "not"], ["obstante", "", "notwithstanding"], [",", "", ""], ["en", "", "on"], ["que", "", "that"], ["la", "", "the", "el"], ["protección", "", "protection"], ["no", "", "not"], ["debe", "", "should", "deber"], ["limitarse", "", "be limited"], ["a", "", "to"], ["los", "", "the", "el"], ["ejemplares", "", "specimens", "ejemplar"], ["más", "", "most"], ["espectaculares", "", "spectacular", "espectacular"], [".", "", ""]],
        en: "Experts insist, however, that protection shouldn't be limited to the most spectacular specimens.",
      },
      {
        t: [["Un", "", "a", "uno"], ["olivo", "", "olive tree"], ["milenario", "", "thousand-year-old"], ["aislado", "", "isolated"], [",", "", ""], ["rodeado", "", "surrounded", "rodear"], ["de", "", "by"], ["cultivos", "", "crops", "cultivo"], ["intensivos", "", "intensive", "intensivo"], ["o", "", "or"], ["de", "", "by"], ["urbanizaciones", "", "housing estates", "urbanización"], [",", "", ""], ["pierde", "", "loses", "perder"], ["buena", "", "a good", "bueno"], ["parte", "", "part"], ["de", "", "of"], ["su", "", "its"], ["sentido", "", "meaning"], [".", "", ""]],
        en: "An isolated thousand-year-old olive tree, surrounded by intensive farming or housing estates, loses much of its meaning.",
      },
      {
        t: [["Lo", "", "what", "lo"], ["que", "", "that"], ["conviene", "", "it is advisable", "convenir"], ["preservar", "", "to preserve"], ["es", "", "is", "ser"], ["el", "", "the"], ["paisaje", "", "landscape"], ["entero", "", "whole"], [":", "", ""], ["los", "", "the", "el"], ["bancales", "", "terraces", "bancal"], [",", "", ""], ["los", "", "the", "el"], ["muros", "", "walls", "muro"], ["de", "", "of"], ["piedra", "", "stone"], ["seca", "", "dry", "seco"], ["y", "", "and"], ["los", "", "the", "el"], ["conocimientos", "", "knowledge", "conocimiento"], ["de", "", "of"], ["quienes", "", "those who", "quien"], ["los", "", "them", "lo"], ["trabajan", "", "work", "trabajar"], [".", "", ""]],
        en: "What should be preserved is the whole landscape: the terraces, the dry-stone walls and the know-how of those who work them.",
      },
      {
        t: [["En", "", "in", "en"], ["el", "", "the"], ["fondo", "", "end"], [",", "", ""], ["estos", "", "these", "este"], ["árboles", "", "trees", "árbol"], ["han", "", "have", "haber"], ["sobrevivido", "", "survived", "sobrevivir"], ["tanto", "", "so much"], ["tiempo", "", "time"], ["porque", "", "because"], ["generaciones", "", "generations", "generación"], ["de", "", "of"], ["campesinos", "", "farmers", "campesino"], ["los", "", "them", "lo"], ["cuidaron", "", "looked after", "cuidar"], [".", "", ""]],
        en: "Ultimately, these trees have survived so long because generations of farmers looked after them.",
      },
      {
        t: [["Su", "", "their", "su"], ["futuro", "", "future"], [",", "", ""], ["por", "", "for"], ["tanto", "", "that reason"], [",", "", ""], ["depende", "", "depends", "depender"], ["menos", "", "less"], ["de", "", "on"], ["las", "", "the", "el"], ["leyes", "", "laws", "ley"], ["que", "", "than"], ["de", "", "on"], ["que", "", "(that)"], ["alguien", "", "someone"], ["siga", "", "is still", "seguir"], ["dispuesto", "", "willing"], ["a", "", "to"], ["podarlos", "", "prune them", "podar"], ["y", "", "and"], ["recoger", "", "pick"], ["su", "", "their"], ["fruto", "", "fruit"], [".", "", ""]],
        en: "Their future, therefore, depends less on laws than on someone still being willing to prune them and harvest their fruit.",
      },
    ],
    q: [
      { q: "Why can't the age of an olive tree be calculated by counting its rings?", o: ["The rings are too thin", "The centre of the trunk rots and disappears", "It is forbidden to cut them"], a: 1 },
      { q: "What happened at the end of the 20th century?", o: ["The trees became more productive", "Many old olive trees were sold as decorative features", "Farmers planted new olive groves"], a: 1 },
      { q: "What can happen to a tree that is moved?", o: ["It grows faster", "It may die within a few months", "It produces better oil"], a: 1 },
      { q: "Which initiative is NOT mentioned in the article?", o: ["Oil from ancient trees", "Tourist routes", "Selling seeds abroad", "Sponsorship programmes"], a: 2 },
      { q: "According to experts, what should be protected?", o: ["Only the most spectacular trees", "The whole landscape and the know-how of those who work it", "Only trees in public parks"], a: 1 },
    ],
  },
  {
    id: "es-6-watchmaker",
    lv: 6,
    kind: "story",
    title: "El reloj parado",
    titleEn: "The stopped watch",
    s: [
      {
        t: [["El", "", "the", "el"], ["taller", "", "workshop"], ["de", "", "of"], ["don", "", "Mr"], ["Elías", "", "Elías"], ["ocupaba", "", "occupied", "ocupar"], ["un", "", "a", "uno"], ["local", "", "premises"], ["estrecho", "", "narrow"], ["y", "", "and"], ["oscuro", "", "dark"], [",", "", ""], ["encajado", "", "wedged", "encajar"], ["entre", "", "between"], ["una", "", "a", "uno"], ["mercería", "", "haberdashery"], ["y", "", "and"], ["una", "", "a", "uno"], ["tienda", "", "shop"], ["de", "", "of"], ["ultramarinos", "", "groceries", "ultramarino"], ["que", "", "that"], ["llevaba", "", "had been", "llevar"], ["años", "", "years", "año"], ["cerrada", "", "closed", "cerrado"], [".", "", ""]],
        en: "Don Elías's workshop occupied narrow, dark premises, wedged between a haberdashery and a grocer's that had been closed for years.",
      },
      {
        t: [["Sobre", "", "on", "sobre"], ["el", "", "the"], ["mostrador", "", "counter"], ["se", "", "(themselves)"], ["amontonaban", "", "piled up", "amontonarse"], ["relojes", "", "clocks", "reloj"], ["de", "", "from"], ["todas", "", "all", "todo"], ["las", "", "the", "el"], ["épocas", "", "periods", "época"], [",", "", ""], ["y", "", "and"], ["en", "", "on"], ["las", "", "the", "el"], ["paredes", "", "walls", "pared"], ["colgaban", "", "hung", "colgar"], ["péndulos", "", "pendulum clocks", "péndulo"], ["que", "", "that"], ["nunca", "", "never"], ["marcaban", "", "showed", "marcar"], ["la", "", "the", "el"], ["misma", "", "same", "mismo"], ["hora", "", "time"], [".", "", ""]],
        en: "Clocks from every period were piled up on the counter, and on the walls hung pendulum clocks that never showed the same time.",
      },
      {
        t: [["Él", "", "he", "él"], ["decía", "", "used to say", "decir"], [",", "", ""], ["medio", "", "half"], ["en", "", "in"], ["broma", "", "jest"], [",", "", ""], ["que", "", "that"], ["así", "", "that way"], ["sus", "", "his", "su"], ["clientes", "", "customers", "cliente"], ["podían", "", "could", "poder"], ["elegir", "", "choose"], ["la", "", "the one", "el"], ["que", "", "that"], ["más", "", "most"], ["les", "", "them", "le"], ["conviniera", "", "suited", "convenir"], [".", "", ""]],
        en: "He used to say, half jokingly, that this way his customers could choose whichever suited them best.",
      },
      {
        t: [["Llevaba", "", "he had spent", "llevar"], ["más", "", "more"], ["de", "", "than"], ["cincuenta", "", "fifty"], ["años", "", "years", "año"], ["arreglando", "", "repairing", "arreglar"], ["mecanismos", "", "mechanisms", "mecanismo"], ["ajenos", "", "other people's", "ajeno"], [",", "", ""], ["y", "", "and"], ["presumía", "", "boasted", "presumir"], ["de", "", "of"], ["no", "", "not"], ["haber", "", "having"], ["dejado", "", "left", "dejar"], ["nunca", "", "ever"], ["un", "", "a", "uno"], ["encargo", "", "job"], ["sin", "", "without"], ["terminar", "", "finishing"], [".", "", ""]],
        en: "He had spent more than fifty years repairing other people's mechanisms, and he boasted of never having left a job unfinished.",
      },
      {
        t: [["Una", "", "one", "uno"], ["tarde", "", "evening"], ["de", "", "in"], ["noviembre", "", "November"], [",", "", ""], ["poco", "", "shortly"], ["antes", "", "before"], ["del", "", "of the", "de"], ["cierre", "", "closing time"], [",", "", ""], ["entró", "", "came in", "entrar"], ["una", "", "a", "uno"], ["mujer", "", "woman"], ["de", "", "of"], ["mediana", "", "middle", "mediano"], ["edad", "", "age"], ["con", "", "with"], ["un", "", "a", "uno"], ["paquete", "", "package"], ["envuelto", "", "wrapped", "envolver"], ["en", "", "in"], ["un", "", "a", "uno"], ["pañuelo", "", "handkerchief"], [".", "", ""]],
        en: "One November evening, shortly before closing time, a middle-aged woman came in with a package wrapped in a handkerchief.",
      },
      {
        t: [["Lo", "", "it", "lo"], ["desenvolvió", "", "she unwrapped", "desenvolver"], ["con", "", "with"], ["un", "", "a", "uno"], ["cuidado", "", "care"], ["casi", "", "almost"], ["ceremonioso", "", "ceremonious"], ["y", "", "and"], ["dejó", "", "placed", "dejar"], ["sobre", "", "on"], ["el", "", "the"], ["mostrador", "", "counter"], ["un", "", "a", "uno"], ["reloj", "", "watch"], ["de", "", "of"], ["bolsillo", "", "pocket"], ["de", "", "of"], ["plata", "", "silver"], [",", "", ""], ["con", "", "with"], ["la", "", "the", "el"], ["tapa", "", "lid"], ["abollada", "", "dented", "abollado"], [".", "", ""]],
        en: "She unwrapped it with almost ceremonious care and placed on the counter a silver pocket watch with a dented lid.",
      },
      {
        t: [["—", "", ""], ["Era", "", "it was", "ser"], ["de", "", "of"], ["mi", "", "my"], ["padre", "", "father"], ["—", "", ""], ["dijo", "", "she said", "decir"], ["—", "", ""], [".", "", ""], ["Se", "", "itself", "se"], ["paró", "", "stopped", "pararse"], ["la", "", "the", "el"], ["noche", "", "night"], ["en", "", "on"], ["que", "", "which"], ["murió", "", "he died", "morir"], [",", "", ""], ["y", "", "and"], ["desde", "", "since"], ["entonces", "", "then"], ["nadie", "", "nobody"], ["ha", "", "has", "haber"], ["conseguido", "", "managed", "conseguir"], ["que", "", "(that)"], ["vuelva", "", "it goes back", "volver"], ["a", "", "to"], ["andar", "", "working"], [".", "", ""]],
        en: "\"It was my father's,\" she said. \"It stopped the night he died, and since then nobody has managed to get it going again.\"",
      },
      {
        t: [["Don", "", "Mr", "don"], ["Elías", "", "Elías"], ["se", "", "(himself)"], ["ajustó", "", "adjusted", "ajustarse"], ["la", "", "the", "el"], ["lupa", "", "loupe"], ["y", "", "and"], ["lo", "", "it"], ["examinó", "", "examined", "examinar"], ["en", "", "in"], ["silencio", "", "silence"], ["durante", "", "for"], ["un", "", "a", "uno"], ["buen", "", "good", "bueno"], ["rato", "", "while"], [".", "", ""]],
        en: "Don Elías adjusted his loupe and examined it in silence for a good while.",
      },
      {
        t: [["La", "", "the", "el"], ["avería", "", "fault"], ["no", "", "not"], ["parecía", "", "seemed", "parecer"], ["grave", "", "serious"], [":", "", ""], ["un", "", "a", "uno"], ["muelle", "", "spring"], ["vencido", "", "worn out", "vencer"], [",", "", ""], ["algo", "", "some"], ["de", "", "(of)"], ["óxido", "", "rust"], [",", "", ""], ["una", "", "a", "uno"], ["rueda", "", "wheel"], ["que", "", "that"], ["había", "", "had", "haber"], ["perdido", "", "lost", "perder"], ["un", "", "a", "uno"], ["diente", "", "tooth"], [".", "", ""]],
        en: "The fault didn't seem serious: a worn-out spring, a bit of rust, a wheel that had lost a tooth.",
      },
      {
        t: [["Le", "", "to her", "le"], ["dijo", "", "he said", "decir"], ["que", "", "that"], ["podría", "", "he could", "poder"], ["tenerlo", "", "have it", "tener"], ["listo", "", "ready"], ["en", "", "in"], ["una", "", "a", "uno"], ["semana", "", "week"], [",", "", ""], ["y", "", "and"], ["la", "", "the", "el"], ["mujer", "", "woman"], ["se", "", "(herself)"], ["marchó", "", "left", "marcharse"], ["con", "", "with"], ["un", "", "a", "uno"], ["gesto", "", "expression"], ["que", "", "that"], ["él", "", "he"], ["no", "", "not"], ["supo", "", "could", "saber"], ["descifrar", "", "decipher"], [".", "", ""]],
        en: "He told her he could have it ready in a week, and the woman left with an expression he couldn't read.",
      },
      {
        t: [["Durante", "", "during", "durante"], ["los", "", "the", "el"], ["días", "", "days", "día"], ["siguientes", "", "following", "siguiente"], [",", "", ""], ["trabajó", "", "he worked", "trabajar"], ["en", "", "on"], ["el", "", "the"], ["reloj", "", "watch"], ["con", "", "with"], ["una", "", "a", "uno"], ["minuciosidad", "", "meticulousness"], ["que", "", "that"], ["hacía", "", "it had been", "hacer"], ["tiempo", "", "a long time"], ["que", "", "that"], ["no", "", "not"], ["se", "", "(of himself)"], ["exigía", "", "he demanded", "exigir"], [".", "", ""]],
        en: "Over the following days, he worked on the watch with a meticulousness he hadn't demanded of himself in a long time.",
      },
      {
        t: [["Limpió", "", "he cleaned", "limpiar"], ["cada", "", "each"], ["pieza", "", "part"], [",", "", ""], ["sustituyó", "", "replaced", "sustituir"], ["el", "", "the"], ["muelle", "", "spring"], ["y", "", "and"], ["talló", "", "carved", "tallar"], ["a", "", "by"], ["mano", "", "hand"], ["la", "", "the", "el"], ["rueda", "", "wheel"], ["dañada", "", "damaged", "dañado"], [",", "", ""], ["porque", "", "because"], ["ya", "", "any more"], ["nadie", "", "nobody"], ["fabricaba", "", "made", "fabricar"], ["recambios", "", "spare parts", "recambio"], ["para", "", "for"], ["un", "", "a", "uno"], ["modelo", "", "model"], ["tan", "", "so"], ["antiguo", "", "old"], [".", "", ""]],
        en: "He cleaned every part, replaced the spring and cut the damaged wheel by hand, because nobody made spare parts for such an old model any more.",
      },
      {
        t: [["Cuando", "", "when", "cuando"], ["por", "", "at"], ["fin", "", "last"], ["le", "", "it"], ["dio", "", "gave", "dar"], ["cuerda", "", "winding"], [",", "", ""], ["el", "", "the"], ["tictac", "", "ticking"], ["llenó", "", "filled", "llenar"], ["el", "", "the"], ["taller", "", "workshop"], ["como", "", "like"], ["una", "", "a", "uno"], ["respiración", "", "breathing"], ["recuperada", "", "regained", "recuperar"], [".", "", ""]],
        en: "When he finally wound it, the ticking filled the workshop like breath regained.",
      },
      {
        t: [["Sin", "", "without", "sin"], ["embargo", "", "however"], [",", "", ""], ["al", "", "on", "a"], ["ajustar", "", "adjusting"], ["las", "", "the", "el"], ["manecillas", "", "hands", "manecilla"], [",", "", ""], ["reparó", "", "he noticed", "reparar"], ["en", "", "(on)"], ["algo", "", "something"], ["que", "", "that"], ["se", "", "(from him)"], ["le", "", "him"], ["había", "", "had", "haber"], ["pasado", "", "passed", "pasar"], ["por", "", "by"], ["alto", "", "high"], [".", "", ""]],
        en: "However, as he went to set the hands, he noticed something he had overlooked.",
      },
      {
        t: [["En", "", "on", "en"], ["el", "", "the"], ["interior", "", "inside"], ["de", "", "of"], ["la", "", "the", "el"], ["tapa", "", "lid"], [",", "", ""], ["alguien", "", "someone"], ["había", "", "had", "haber"], ["grabado", "", "engraved", "grabar"], [",", "", ""], ["con", "", "in"], ["letra", "", "lettering"], ["diminuta", "", "tiny", "diminuto"], [",", "", ""], ["una", "", "a", "uno"], ["fecha", "", "date"], ["y", "", "and"], ["una", "", "a", "uno"], ["hora", "", "time"], [":", "", ""], ["las", "", "the", "el"], ["cuatro", "", "four"], ["y", "", "and"], ["diez", "", "ten"], [".", "", ""]],
        en: "On the inside of the lid, someone had engraved, in tiny letters, a date and a time: ten past four.",
      },
      {
        t: [["Era", "", "it was", "ser"], ["exactamente", "", "exactly"], ["la", "", "the", "el"], ["hora", "", "time"], ["que", "", "that"], ["marcaban", "", "showed", "marcar"], ["las", "", "the", "el"], ["agujas", "", "hands", "aguja"], ["cuando", "", "when"], ["la", "", "the", "el"], ["mujer", "", "woman"], ["le", "", "to him"], ["entregó", "", "handed", "entregar"], ["el", "", "the"], ["reloj", "", "watch"], [".", "", ""]],
        en: "It was exactly the time the hands showed when the woman handed him the watch.",
      },
      {
        t: [["Don", "", "Mr", "don"], ["Elías", "", "Elías"], ["se", "", "himself"], ["quedó", "", "remained", "quedarse"], ["contemplando", "", "contemplating", "contemplar"], ["la", "", "the", "el"], ["inscripción", "", "inscription"], [",", "", ""], ["sin", "", "without"], ["atreverse", "", "daring"], ["a", "", "to"], ["mover", "", "move"], ["las", "", "the", "el"], ["manecillas", "", "hands", "manecilla"], [".", "", ""]],
        en: "Don Elías stood contemplating the inscription, not daring to move the hands.",
      },
      {
        t: [["Pensó", "", "he thought", "pensar"], ["en", "", "of"], ["las", "", "the", "el"], ["incontables", "", "countless", "incontable"], ["veces", "", "times", "vez"], ["en", "", "on"], ["que", "", "which"], ["había", "", "he had", "haber"], ["devuelto", "", "returned", "devolver"], ["a", "", "to"], ["sus", "", "their", "su"], ["dueños", "", "owners", "dueño"], ["relojes", "", "watches", "reloj"], ["impecables", "", "flawless", "impecable"], [",", "", ""], ["convencido", "", "convinced"], ["de", "", "(of)"], ["que", "", "that"], ["su", "", "his"], ["oficio", "", "craft"], ["consistía", "", "consisted", "consistir"], ["en", "", "in"], ["eso", "", "that"], [":", "", ""], ["en", "", "in"], ["que", "", "that"], ["el", "", "the"], ["tiempo", "", "time"], ["siguiera", "", "kept", "seguir"], ["corriendo", "", "running", "correr"], [".", "", ""]],
        en: "He thought of the countless times he had returned flawless watches to their owners, convinced that this was what his craft was about: keeping time running.",
      },
      {
        t: [["Por", "", "for", "por"], ["primera", "", "first", "primero"], ["vez", "", "time"], ["se", "", "(to himself)"], ["le", "", "him"], ["ocurrió", "", "it occurred", "ocurrir"], ["que", "", "that"], ["quizá", "", "perhaps"], ["no", "", "not"], ["todos", "", "all", "todo"], ["los", "", "the", "el"], ["clientes", "", "customers", "cliente"], ["deseaban", "", "wanted", "desear"], ["lo", "", "the"], ["mismo", "", "same"], [".", "", ""]],
        en: "For the first time it occurred to him that perhaps not all customers wanted the same thing.",
      },
      {
        t: [["Cuando", "", "when", "cuando"], ["la", "", "the", "el"], ["mujer", "", "woman"], ["volvió", "", "came back", "volver"], [",", "", ""], ["él", "", "he"], ["le", "", "her"], ["puso", "", "put", "poner"], ["el", "", "the"], ["reloj", "", "watch"], ["en", "", "in"], ["la", "", "the", "el"], ["mano", "", "hand"], ["sin", "", "without"], ["decir", "", "saying"], ["nada", "", "anything"], [",", "", ""], ["y", "", "and"], ["ella", "", "she"], ["lo", "", "it"], ["escuchó", "", "listened to", "escuchar"], ["latir", "", "beat"], ["con", "", "with"], ["los", "", "the", "el"], ["ojos", "", "eyes", "ojo"], ["cerrados", "", "closed", "cerrado"], [".", "", ""]],
        en: "When the woman came back, he placed the watch in her hand without a word, and she listened to it beat with her eyes closed.",
      },
      {
        t: [["—", "", ""], ["Funciona", "", "it works", "funcionar"], ["—", "", ""], ["murmuró", "", "she murmured", "murmurar"], [",", "", ""], ["y", "", "and"], ["no", "", "not"], ["estaba", "", "it was", "estar"], ["claro", "", "clear"], ["si", "", "whether"], ["lo", "", "it"], ["decía", "", "she said", "decir"], ["con", "", "with"], ["alivio", "", "relief"], ["o", "", "or"], ["con", "", "with"], ["pena", "", "sorrow"], [".", "", ""]],
        en: "\"It works,\" she murmured, and it wasn't clear whether she said it with relief or with sorrow.",
      },
      {
        t: [["Entonces", "", "then", "entonces"], ["don", "", "Mr"], ["Elías", "", "Elías"], ["le", "", "her"], ["mostró", "", "showed", "mostrar"], ["la", "", "the", "el"], ["inscripción", "", "inscription"], ["y", "", "and"], ["le", "", "her"], ["preguntó", "", "asked", "preguntar"], ["si", "", "whether"], ["quería", "", "she wanted", "querer"], ["que", "", "(that)"], ["lo", "", "it"], ["pusiera", "", "he set", "poner"], ["en", "", "to the"], ["hora", "", "time"], [".", "", ""]],
        en: "Then Don Elías showed her the inscription and asked whether she wanted him to set it to the right time.",
      },
      {
        t: [["La", "", "the", "el"], ["mujer", "", "woman"], ["tardó", "", "took a while", "tardar"], ["en", "", "in"], ["contestar", "", "answering"], [".", "", ""]],
        en: "The woman took a while to answer.",
      },
      {
        t: [["Le", "", "to him", "le"], ["explicó", "", "she explained", "explicar"], ["que", "", "that"], ["la", "", "the", "el"], ["fecha", "", "date"], ["grabada", "", "engraved", "grabar"], ["no", "", "not"], ["era", "", "was", "ser"], ["la", "", "that", "el"], ["de", "", "of"], ["la", "", "the", "el"], ["muerte", "", "death"], ["de", "", "of"], ["su", "", "her"], ["padre", "", "father"], [",", "", ""], ["sino", "", "but"], ["la", "", "that", "el"], ["de", "", "of"], ["su", "", "her"], ["propio", "", "own"], ["nacimiento", "", "birth"], [".", "", ""]],
        en: "She explained that the engraved date was not that of her father's death, but of her own birth.",
      },
      {
        t: [["Su", "", "her", "su"], ["padre", "", "father"], ["había", "", "had", "haber"], ["mandado", "", "ordered", "mandar"], ["grabarla", "", "to engrave it", "grabar"], ["aquel", "", "that"], ["mismo", "", "same"], ["día", "", "day"], [",", "", ""], ["y", "", "and"], ["desde", "", "since"], ["entonces", "", "then"], [",", "", ""], ["cada", "", "every"], ["año", "", "year"], [",", "", ""], ["a", "", "at"], ["las", "", "the", "el"], ["cuatro", "", "four"], ["y", "", "and"], ["diez", "", "ten"], [",", "", ""], ["la", "", "her"], ["llamaba", "", "called", "llamar"], ["por", "", "on"], ["teléfono", "", "phone"], [",", "", ""], ["estuviera", "", "she was", "estar"], ["donde", "", "wherever"], ["estuviera", "", "she was", "estar"], [".", "", ""]],
        en: "Her father had had it engraved that very day, and from then on, every year at ten past four, he would phone her, wherever she was.",
      },
      {
        t: [["Que", "", "that", "que"], ["el", "", "the"], ["reloj", "", "watch"], ["se", "", "itself"], ["hubiera", "", "had", "haber"], ["parado", "", "stopped", "pararse"], ["precisamente", "", "precisely"], ["esa", "", "that", "ese"], ["noche", "", "night"], ["le", "", "to her"], ["había", "", "had", "haber"], ["parecido", "", "seemed", "parecer"], ["siempre", "", "always"], ["una", "", "a", "uno"], ["despedida", "", "farewell"], [",", "", ""], ["y", "", "and"], ["por", "", "for"], ["eso", "", "that"], ["había", "", "she had", "haber"], ["tardado", "", "taken", "tardar"], ["años", "", "years", "año"], ["en", "", "in"], ["atreverse", "", "daring"], ["a", "", "to"], ["traerlo", "", "bring it", "traer"], [".", "", ""]],
        en: "That the watch had stopped precisely that night had always seemed to her like a farewell, which is why it had taken her years to dare to bring it in.",
      },
      {
        t: [["Don", "", "Mr", "don"], ["Elías", "", "Elías"], ["se", "", "himself"], ["ofreció", "", "offered", "ofrecerse"], ["a", "", "to"], ["detenerlo", "", "stop it", "detener"], ["de", "", "(of)"], ["nuevo", "", "again"], ["a", "", "at"], ["las", "", "the", "el"], ["cuatro", "", "four"], ["y", "", "and"], ["diez", "", "ten"], [",", "", ""], ["si", "", "if"], ["ella", "", "she"], ["lo", "", "it"], ["prefería", "", "preferred", "preferir"], [";", "", ""], ["era", "", "it was", "ser"], ["cuestión", "", "a matter"], ["de", "", "of"], ["un", "", "a", "uno"], ["segundo", "", "second"], [".", "", ""]],
        en: "Don Elías offered to stop it again at ten past four if she preferred; it would only take a second.",
      },
      {
        t: [["Ella", "", "she", "ella"], ["miró", "", "looked at", "mirar"], ["el", "", "the"], ["reloj", "", "watch"], [",", "", ""], ["luego", "", "then"], ["al", "", "at the", "a"], ["viejo", "", "old"], ["relojero", "", "watchmaker"], [",", "", ""], ["y", "", "and"], ["negó", "", "shook", "negar"], ["despacio", "", "slowly"], ["con", "", "with"], ["la", "", "the", "el"], ["cabeza", "", "head"], [".", "", ""]],
        en: "She looked at the watch, then at the old watchmaker, and slowly shook her head.",
      },
      {
        t: [["—", "", ""], ["Déjelo", "", "let it", "dejar"], ["andar", "", "run"], ["—", "", ""], ["dijo", "", "she said", "decir"], ["al", "", "at the", "a"], ["fin", "", "end"], ["—", "", ""], [".", "", ""], ["Ya", "", "already", "ya"], ["sé", "", "I know", "saber"], ["a", "", "at"], ["qué", "", "what"], ["hora", "", "time"], ["tengo", "", "I have", "tener"], ["que", "", "to"], ["acordarme", "", "remember", "acordarse"], ["de", "", "(of)"], ["él", "", "him"], [".", "", ""]],
        en: "\"Let it run,\" she said at last. \"I already know at what time I have to remember him.\"",
      },
      {
        t: [["Cuando", "", "when", "cuando"], ["se", "", "(herself)"], ["fue", "", "she left", "irse"], [",", "", ""], ["don", "", "Mr"], ["Elías", "", "Elías"], ["se", "", "himself"], ["quedó", "", "remained", "quedarse"], ["solo", "", "alone"], ["en", "", "in"], ["el", "", "the"], ["taller", "", "workshop"], [",", "", ""], ["rodeado", "", "surrounded", "rodear"], ["del", "", "by the", "de"], ["murmullo", "", "murmur"], ["desacompasado", "", "out-of-step"], ["de", "", "of"], ["sus", "", "his", "su"], ["péndulos", "", "pendulum clocks", "péndulo"], [".", "", ""]],
        en: "When she left, Don Elías remained alone in the workshop, surrounded by the out-of-step murmur of his pendulum clocks.",
      },
      {
        t: [["Por", "", "for", "por"], ["primera", "", "first", "primero"], ["vez", "", "time"], ["en", "", "in"], ["muchos", "", "many", "mucho"], ["años", "", "years", "año"], [",", "", ""], ["no", "", "not"], ["tuvo", "", "he had", "tener"], ["prisa", "", "hurry"], ["por", "", "to"], ["cerrar", "", "close"], [".", "", ""]],
        en: "For the first time in many years, he was in no hurry to close.",
      },
      {
        t: [["Pensó", "", "he thought", "pensar"], ["que", "", "that"], ["había", "", "he had", "haber"], ["pasado", "", "spent", "pasar"], ["medio", "", "half"], ["siglo", "", "century"], ["creyendo", "", "believing", "creer"], ["que", "", "that"], ["reparaba", "", "he repaired", "reparar"], ["máquinas", "", "machines", "máquina"], [",", "", ""], ["cuando", "", "when"], ["en", "", "in"], ["realidad", "", "reality"], ["custodiaba", "", "he was guarding", "custodiar"], ["algo", "", "something"], ["mucho", "", "much"], ["más", "", "more"], ["frágil", "", "fragile"], [".", "", ""]],
        en: "He thought that he had spent half a century believing he repaired machines, when in fact he had been guarding something far more fragile.",
      },
      {
        t: [["Los", "", "the", "el"], ["relojes", "", "clocks", "reloj"], [",", "", ""], ["se", "", "to himself"], ["dijo", "", "he said", "decir"], [",", "", ""], ["no", "", "not"], ["guardan", "", "keep", "guardar"], ["el", "", "the"], ["tiempo", "", "time"], [";", "", ""], ["guardan", "", "they keep", "guardar"], ["la", "", "the", "el"], ["forma", "", "way"], ["en", "", "in"], ["que", "", "which"], ["cada", "", "each"], ["cual", "", "one"], ["decide", "", "decides", "decidir"], ["recordarlo", "", "to remember it", "recordar"], [".", "", ""]],
        en: "Clocks, he told himself, don't keep time; they keep the way each of us chooses to remember it.",
      },
      {
        t: [["Esa", "", "that", "ese"], ["noche", "", "night"], [",", "", ""], ["antes", "", "before"], ["de", "", "(of)"], ["apagar", "", "switching off"], ["la", "", "the", "el"], ["luz", "", "light"], [",", "", ""], ["puso", "", "he set", "poner"], ["en", "", "to the"], ["hora", "", "(right) time"], ["todos", "", "all", "todo"], ["los", "", "the", "el"], ["péndulos", "", "pendulum clocks", "péndulo"], ["de", "", "on"], ["las", "", "the", "el"], ["paredes", "", "walls", "pared"], [".", "", ""]],
        en: "That night, before switching off the light, he set all the pendulum clocks on the walls to the right time.",
      },
      {
        t: [["A", "", "on", "a"], ["la", "", "the", "el"], ["mañana", "", "morning"], ["siguiente", "", "following"], [",", "", ""], ["por", "", "for"], ["primera", "", "first", "primero"], ["vez", "", "time"], ["desde", "", "since"], ["que", "", "(that)"], ["tenía", "", "he had", "tener"], ["memoria", "", "memory"], [",", "", ""], ["el", "", "the"], ["taller", "", "workshop"], ["entero", "", "whole"], ["marcaba", "", "showed", "marcar"], ["la", "", "the", "el"], ["misma", "", "same", "mismo"], ["hora", "", "time"], [".", "", ""]],
        en: "The next morning, for the first time in living memory, the whole workshop showed the same time.",
      },
    ],
    q: [
      { q: "What was unusual about the clocks on the walls of the workshop?", o: ["They had no hands", "They never showed the same time", "They were all broken"], a: 1 },
      { q: "What did the woman bring to the workshop?", o: ["Her mother's wristwatch", "Her father's silver pocket watch", "An old pendulum clock"], a: 1 },
      { q: "What was engraved inside the lid?", o: ["The father's name", "A date and the time ten past four", "The name of the watchmaker"], a: 1 },
      { q: "What did the date and time refer to?", o: ["The father's death", "The woman's birth", "The day the watch was bought"], a: 1 },
      { q: "What did the woman decide in the end?", o: ["To stop the watch at ten past four", "To let the watch run", "To sell the watch"], a: 1 },
    ],
  },
  {
    id: "es-6-translation",
    lv: 6,
    kind: "article",
    title: "Traductor, traidor",
    titleEn: "Translator, traitor",
    s: [
      {
        t: [["Dice", "", "says", "decir"], ["un", "", "an", "uno"], ["viejo", "", "old"], ["adagio", "", "adage"], ["italiano", "", "Italian"], ["que", "", "that"], ["todo", "", "every"], ["traductor", "", "translator"], ["es", "", "is", "ser"], ["un", "", "a", "uno"], ["traidor", "", "traitor"], [",", "", ""], ["y", "", "and"], ["pocas", "", "few", "poco"], ["frases", "", "phrases", "frase"], ["han", "", "have", "haber"], ["hecho", "", "made", "hacer"], ["tanta", "", "so much", "tanto"], ["fortuna", "", "fortune"], ["entre", "", "among"], ["quienes", "", "those who", "quien"], ["se", "", "themselves"], ["dedican", "", "devote", "dedicarse"], ["a", "", "to"], ["este", "", "this"], ["oficio", "", "craft"], [".", "", ""]],
        en: "An old Italian adage says that every translator is a traitor, and few phrases have been so successful among those who work in this craft.",
      },
      {
        t: [["El", "", "the", "el"], ["juego", "", "play"], ["de", "", "on"], ["palabras", "", "words", "palabra"], [",", "", ""], ["«", "", ""], ["traduttore", "", "translator (Italian)"], [",", "", ""], ["traditore", "", "traitor (Italian)"], ["»", "", ""], [",", "", ""], ["resulta", "", "is", "resultar"], ["tan", "", "so"], ["eficaz", "", "effective"], ["que", "", "that"], ["apenas", "", "barely"], ["sobrevive", "", "survives", "sobrevivir"], ["a", "", "(to)"], ["su", "", "its"], ["propia", "", "own", "propio"], ["traducción", "", "translation"], [",", "", ""], ["lo", "", "which"], ["cual", "", "which"], ["no", "", "not"], ["deja", "", "stops", "dejar"], ["de", "", "(of)"], ["ser", "", "being"], ["una", "", "an", "uno"], ["ironía", "", "irony"], [".", "", ""]],
        en: "The pun, \"traduttore, traditore\", is so effective that it barely survives its own translation, which is ironic in itself.",
      },
      {
        t: [["Detrás", "", "behind", "detrás"], ["de", "", "(of)"], ["la", "", "the", "el"], ["ocurrencia", "", "witticism"], [",", "", ""], ["no", "", "not"], ["obstante", "", "notwithstanding"], [",", "", ""], ["late", "", "beats", "latir"], ["una", "", "an", "uno"], ["intuición", "", "intuition"], ["que", "", "that"], ["conviene", "", "it is worth", "convenir"], ["tomarse", "", "taking", "tomar"], ["en", "", "in"], ["serio", "", "earnest"], [".", "", ""]],
        en: "Behind the witticism, however, lies an intuition worth taking seriously.",
      },
      {
        t: [["Traducir", "", "translating", "traducir"], ["no", "", "not"], ["consiste", "", "consists", "consistir"], ["en", "", "in"], ["sustituir", "", "replacing"], ["cada", "", "each"], ["palabra", "", "word"], ["por", "", "with"], ["su", "", "its"], ["equivalente", "", "equivalent"], [",", "", ""], ["como", "", "as"], ["si", "", "if"], ["las", "", "the", "el"], ["lenguas", "", "languages", "lengua"], ["fueran", "", "were", "ser"], ["catálogos", "", "catalogues", "catálogo"], ["superponibles", "", "superimposable", "superponible"], [".", "", ""]],
        en: "Translating is not a matter of replacing each word with its equivalent, as if languages were catalogues that could be laid on top of one another.",
      },
      {
        t: [["Cada", "", "each", "cada"], ["idioma", "", "language"], ["recorta", "", "cuts out", "recortar"], ["la", "", "the", "el"], ["realidad", "", "reality"], ["a", "", "in"], ["su", "", "its"], ["manera", "", "way"], [",", "", ""], ["y", "", "and"], ["lo", "", "what"], ["que", "", "that"], ["en", "", "in"], ["uno", "", "one"], ["se", "", "(is)"], ["dice", "", "said", "decir"], ["con", "", "with"], ["un", "", "a", "uno"], ["solo", "", "single"], ["término", "", "term"], ["puede", "", "may", "poder"], ["exigir", "", "require"], ["en", "", "in"], ["otro", "", "another"], ["una", "", "a", "uno"], ["perífrasis", "", "circumlocution"], ["entera", "", "whole", "entero"], [".", "", ""]],
        en: "Each language carves up reality in its own way, and what one says with a single term may require a whole circumlocution in another.",
      },
      {
        t: [["El", "", "the", "el"], ["español", "", "Spanish"], ["distingue", "", "distinguishes", "distinguir"], ["entre", "", "between"], ["«", "", ""], ["ser", "", "to be (permanent)"], ["»", "", ""], ["y", "", "and"], ["«", "", ""], ["estar", "", "to be (state)"], ["»", "", ""], [",", "", ""], ["una", "", "a", "uno"], ["sutileza", "", "subtlety"], ["que", "", "that"], ["el", "", "the"], ["inglés", "", "English"], ["resuelve", "", "solves", "resolver"], ["con", "", "with"], ["un", "", "a", "uno"], ["único", "", "single"], ["verbo", "", "verb"], [".", "", ""]],
        en: "Spanish distinguishes between \"ser\" and \"estar\", a subtlety that English handles with a single verb.",
      },
      {
        t: [["A", "", "on", "a"], ["la", "", "the", "el"], ["inversa", "", "contrary"], [",", "", ""], ["hay", "", "there are", "haber"], ["palabras", "", "words", "palabra"], ["que", "", "that"], ["parecen", "", "seem", "parecer"], ["no", "", "not"], ["tener", "", "to have"], ["equivalente", "", "equivalent"], ["en", "", "in"], ["ninguna", "", "any", "ninguno"], ["otra", "", "other", "otro"], ["lengua", "", "language"], ["y", "", "and"], ["que", "", "that"], ["acaban", "", "end up", "acabar"], ["importándose", "", "being imported", "importar"], ["tal", "", "just"], ["cual", "", "as they are"], [".", "", ""]],
        en: "Conversely, there are words that seem to have no equivalent in any other language and end up being borrowed as they are.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["las", "", "the", "el"], ["dificultades", "", "difficulties", "dificultad"], ["léxicas", "", "lexical", "léxico"], ["son", "", "are", "ser"], [",", "", ""], ["en", "", "in"], ["el", "", "the"], ["fondo", "", "end"], [",", "", ""], ["las", "", "the", "el"], ["menos", "", "least"], ["inquietantes", "", "troubling", "inquietante"], [".", "", ""]],
        en: "But lexical difficulties are, in the end, the least troubling.",
      },
      {
        t: [["Más", "", "more", "más"], ["difícil", "", "difficult"], ["resulta", "", "is", "resultar"], ["trasladar", "", "conveying"], ["el", "", "the"], ["ritmo", "", "rhythm"], ["de", "", "of"], ["una", "", "a", "uno"], ["frase", "", "sentence"], [",", "", ""], ["la", "", "the", "el"], ["carga", "", "charge"], ["connotativa", "", "connotative", "connotativo"], ["de", "", "of"], ["un", "", "an", "uno"], ["adjetivo", "", "adjective"], ["o", "", "or"], ["el", "", "the"], ["eco", "", "echo"], ["de", "", "of"], ["una", "", "an", "uno"], ["expresión", "", "expression"], ["que", "", "that"], ["el", "", "the"], ["lector", "", "reader"], ["original", "", "original"], ["reconoce", "", "recognises", "reconocer"], ["sin", "", "without"], ["esfuerzo", "", "effort"], [".", "", ""]],
        en: "Harder still is conveying the rhythm of a sentence, the connotations of an adjective or the echo of an expression the original reader recognises effortlessly.",
      },
      {
        t: [["Un", "", "a", "uno"], ["refrán", "", "proverb"], [",", "", ""], ["una", "", "an", "uno"], ["alusión", "", "allusion"], ["a", "", "to"], ["una", "", "a", "uno"], ["canción", "", "song"], ["popular", "", "popular"], ["o", "", "or"], ["un", "", "a", "uno"], ["verso", "", "line of poetry"], ["que", "", "that"], ["todo", "", "every"], ["el", "", "the"], ["mundo", "", "world"], ["aprendió", "", "learned", "aprender"], ["en", "", "at"], ["la", "", "the", "el"], ["escuela", "", "school"], ["pierden", "", "lose", "perder"], ["su", "", "their"], ["fuerza", "", "force"], ["en", "", "in"], ["cuanto", "", "as soon as"], ["cruzan", "", "they cross", "cruzar"], ["la", "", "the", "el"], ["frontera", "", "border"], [".", "", ""]],
        en: "A proverb, an allusion to a popular song or a line of poetry everyone learned at school lose their force as soon as they cross the border.",
      },
      {
        t: [["Ante", "", "faced with", "ante"], ["estos", "", "these", "este"], ["casos", "", "cases", "caso"], [",", "", ""], ["el", "", "the"], ["traductor", "", "translator"], ["se", "", "himself"], ["enfrenta", "", "faces", "enfrentarse"], ["a", "", "(to)"], ["un", "", "a", "uno"], ["dilema", "", "dilemma"], ["que", "", "that"], ["ningún", "", "no", "ninguno"], ["diccionario", "", "dictionary"], ["resuelve", "", "solves", "resolver"], [".", "", ""]],
        en: "Faced with such cases, the translator faces a dilemma that no dictionary can solve.",
      },
      {
        t: [["Puede", "", "he can", "poder"], ["optar", "", "opt"], ["por", "", "for"], ["la", "", "the", "el"], ["fidelidad", "", "faithfulness"], ["literal", "", "literal"], [",", "", ""], ["a", "", "at"], ["riesgo", "", "risk"], ["de", "", "of"], ["producir", "", "producing"], ["un", "", "an", "uno"], ["texto", "", "text"], ["opaco", "", "opaque"], ["o", "", "or"], ["involuntariamente", "", "unintentionally"], ["cómico", "", "comic"], [".", "", ""]],
        en: "He can opt for literal faithfulness, at the risk of producing a text that is opaque or unintentionally comic.",
      },
      {
        t: [["O", "", "or", "o"], ["puede", "", "he can", "poder"], ["buscar", "", "look for"], ["un", "", "an", "uno"], ["equivalente", "", "equivalent"], ["en", "", "in"], ["la", "", "the", "el"], ["cultura", "", "culture"], ["de", "", "of"], ["llegada", "", "arrival"], [",", "", ""], ["con", "", "with"], ["lo", "", "which"], ["que", "", "(that)"], ["gana", "", "he gains", "ganar"], ["naturalidad", "", "naturalness"], ["pero", "", "but"], ["se", "", "himself"], ["aleja", "", "moves away", "alejarse"], ["del", "", "from the", "de"], ["original", "", "original"], [".", "", ""]],
        en: "Or he can look for an equivalent in the target culture, thereby gaining naturalness but moving away from the original.",
      },
      {
        t: [["La", "", "the", "el"], ["teoría", "", "theory"], ["de", "", "of"], ["la", "", "the", "el"], ["traducción", "", "translation"], ["ha", "", "has", "haber"], ["dado", "", "given", "dar"], ["nombre", "", "name"], ["a", "", "to"], ["estas", "", "these", "este"], ["dos", "", "two"], ["tendencias", "", "tendencies", "tendencia"], [":", "", ""], ["extranjerizar", "", "foreignising"], ["y", "", "and"], ["domesticar", "", "domesticating"], [".", "", ""]],
        en: "Translation theory has given these two tendencies names: foreignising and domesticating.",
      },
      {
        t: [["La", "", "the", "el"], ["primera", "", "first", "primero"], ["deja", "", "lets", "dejar"], ["que", "", "(that)"], ["el", "", "the"], ["lector", "", "reader"], ["perciba", "", "perceive", "percibir"], ["la", "", "the", "el"], ["extrañeza", "", "strangeness"], ["del", "", "of the", "de"], ["texto", "", "text"], [",", "", ""], ["que", "", "that"], ["note", "", "notice", "notar"], ["que", "", "that"], ["procede", "", "it comes", "proceder"], ["de", "", "from"], ["otro", "", "another"], ["mundo", "", "world"], [".", "", ""]],
        en: "The first lets the reader perceive the strangeness of the text, notice that it comes from another world.",
      },
      {
        t: [["La", "", "the", "el"], ["segunda", "", "second", "segundo"], [",", "", ""], ["en", "", "on the"], ["cambio", "", "other hand"], [",", "", ""], ["procura", "", "tries", "procurar"], ["que", "", "that"], ["la", "", "the", "el"], ["obra", "", "work"], ["parezca", "", "seem", "parecer"], ["escrita", "", "written", "escribir"], ["directamente", "", "directly"], ["en", "", "in"], ["la", "", "the", "el"], ["lengua", "", "language"], ["del", "", "of the", "de"], ["lector", "", "reader"], [".", "", ""]],
        en: "The second, by contrast, tries to make the work seem written directly in the reader's language.",
      },
      {
        t: [["Ninguna", "", "neither", "ninguno"], ["de", "", "of"], ["las", "", "the", "el"], ["dos", "", "two"], ["es", "", "is", "ser"], ["inocente", "", "innocent"], [",", "", ""], ["y", "", "and"], ["ningún", "", "no", "ninguno"], ["traductor", "", "translator"], ["sensato", "", "sensible"], ["se", "", "himself"], ["adscribe", "", "subscribes", "adscribirse"], ["por", "", "for"], ["completo", "", "complete"], ["a", "", "to"], ["una", "", "one", "uno"], ["sola", "", "single", "solo"], [".", "", ""]],
        en: "Neither is innocent, and no sensible translator commits entirely to just one.",
      },
      {
        t: [["La", "", "the", "el"], ["poesía", "", "poetry"], ["lleva", "", "takes", "llevar"], ["el", "", "the"], ["problema", "", "problem"], ["a", "", "to"], ["su", "", "its"], ["extremo", "", "extreme"], [",", "", ""], ["pues", "", "since"], ["en", "", "in"], ["ella", "", "it", "él"], ["forma", "", "form"], ["y", "", "and"], ["contenido", "", "content"], ["resultan", "", "are", "resultar"], ["inseparables", "", "inseparable", "inseparable"], [".", "", ""]],
        en: "Poetry takes the problem to its extreme, since in poetry form and content are inseparable.",
      },
      {
        t: [["Traducir", "", "translating", "traducir"], ["un", "", "a", "uno"], ["soneto", "", "sonnet"], ["obliga", "", "forces", "obligar"], ["a", "", "to"], ["sacrificar", "", "sacrifice"], ["algo", "", "something"], [":", "", ""], ["la", "", "the", "el"], ["rima", "", "rhyme"], [",", "", ""], ["el", "", "the"], ["metro", "", "metre"], [",", "", ""], ["la", "", "the", "el"], ["exactitud", "", "accuracy"], ["del", "", "of the", "de"], ["sentido", "", "meaning"], ["o", "", "or"], ["todo", "", "everything"], ["a", "", "at"], ["la", "", "the", "el"], ["vez", "", "time"], [".", "", ""]],
        en: "Translating a sonnet forces you to sacrifice something: the rhyme, the metre, the accuracy of the meaning, or all of them at once.",
      },
      {
        t: [["De", "", "from", "de"], ["ahí", "", "there"], ["que", "", "that"], ["algunos", "", "some", "alguno"], ["poetas", "", "poets", "poeta"], ["hayan", "", "have", "haber"], ["sostenido", "", "maintained", "sostener"], ["que", "", "that"], ["la", "", "the", "el"], ["poesía", "", "poetry"], ["es", "", "is", "ser"], [",", "", ""], ["precisamente", "", "precisely"], [",", "", ""], ["lo", "", "what"], ["que", "", "that"], ["se", "", "(is)"], ["pierde", "", "lost", "perder"], ["en", "", "in"], ["la", "", "the", "el"], ["traducción", "", "translation"], [".", "", ""]],
        en: "Hence some poets have maintained that poetry is precisely what gets lost in translation.",
      },
      {
        t: [["Otros", "", "others", "otro"], [",", "", ""], ["en", "", "on the"], ["cambio", "", "other hand"], [",", "", ""], ["han", "", "have", "haber"], ["defendido", "", "argued", "defender"], ["que", "", "that"], ["una", "", "a", "uno"], ["buena", "", "good", "bueno"], ["traducción", "", "translation"], ["puede", "", "can", "poder"], ["ser", "", "be"], ["una", "", "a", "uno"], ["obra", "", "work"], ["en", "", "in"], ["sí", "", "itself"], ["misma", "", "itself", "mismo"], [",", "", ""], ["con", "", "with"], ["vida", "", "life"], ["propia", "", "its own", "propio"], [".", "", ""]],
        en: "Others, by contrast, have argued that a good translation can be a work in its own right, with a life of its own.",
      },
      {
        t: [["La", "", "the", "el"], ["historia", "", "history"], ["de", "", "of"], ["la", "", "the", "el"], ["literatura", "", "literature"], ["parece", "", "seems", "parecer"], ["darles", "", "to give them", "dar"], ["la", "", "the", "el"], ["razón", "", "reason"], [":", "", ""], ["no", "", "not"], ["pocas", "", "few", "poco"], ["obras", "", "works", "obra"], ["se", "", "(have)"], ["han", "", "have", "haber"], ["leído", "", "been read", "leer"], ["durante", "", "for"], ["siglos", "", "centuries", "siglo"], ["sobre", "", "above"], ["todo", "", "all"], ["en", "", "in"], ["versión", "", "version"], ["traducida", "", "translated", "traducir"], [".", "", ""]],
        en: "The history of literature seems to prove them right: quite a few works have been read for centuries mainly in translation.",
      },
      {
        t: [["Pensemos", "", "let's think", "pensar"], ["en", "", "about"], ["cuántos", "", "how many", "cuánto"], ["lectores", "", "readers", "lector"], ["han", "", "have", "haber"], ["conocido", "", "got to know", "conocer"], ["a", "", "(object marker)"], ["Homero", "", "Homer"], [",", "", ""], ["a", "", "(object marker)"], ["Tolstói", "", "Tolstoy"], ["o", "", "or"], ["a", "", "(object marker)"], ["Kafka", "", "Kafka"], ["sin", "", "without"], ["saber", "", "knowing"], ["una", "", "a", "uno"], ["palabra", "", "word"], ["de", "", "of"], ["griego", "", "Greek"], [",", "", ""], ["ruso", "", "Russian"], ["o", "", "or"], ["alemán", "", "German"], [".", "", ""]],
        en: "Let's think of how many readers have come to know Homer, Tolstoy or Kafka without knowing a word of Greek, Russian or German.",
      },
      {
        t: [["Para", "", "for", "para"], ["ellos", "", "them", "él"], [",", "", ""], ["el", "", "the"], ["traductor", "", "translator"], ["no", "", "not"], ["ha", "", "has", "haber"], ["sido", "", "been", "ser"], ["un", "", "a", "uno"], ["traidor", "", "traitor"], [",", "", ""], ["sino", "", "but"], ["un", "", "an", "uno"], ["mediador", "", "mediator"], ["imprescindible", "", "indispensable"], [",", "", ""], ["aunque", "", "although"], ["casi", "", "almost"], ["siempre", "", "always"], ["invisible", "", "invisible"], [".", "", ""]],
        en: "For them, the translator has not been a traitor, but an indispensable, if almost always invisible, mediator.",
      },
      {
        t: [["Esa", "", "that", "ese"], ["invisibilidad", "", "invisibility"], ["es", "", "is", "ser"], ["quizá", "", "perhaps"], ["la", "", "the", "el"], ["paradoja", "", "paradox"], ["más", "", "most"], ["llamativa", "", "striking", "llamativo"], ["del", "", "of the", "de"], ["oficio", "", "craft"], [".", "", ""]],
        en: "That invisibility is perhaps the most striking paradox of the craft.",
      },
      {
        t: [["Cuanto", "", "the", "cuanto"], ["mejor", "", "better"], ["es", "", "is", "ser"], ["una", "", "a", "uno"], ["traducción", "", "translation"], [",", "", ""], ["menos", "", "the less"], ["se", "", "(is)"], ["nota", "", "noticed", "notar"], ["el", "", "the"], ["trabajo", "", "work"], ["de", "", "of"], ["quien", "", "whoever"], ["la", "", "it", "lo"], ["ha", "", "has", "haber"], ["hecho", "", "done", "hacer"], [".", "", ""]],
        en: "The better a translation is, the less you notice the work of whoever did it.",
      },
      {
        t: [["El", "", "the", "el"], ["lector", "", "reader"], ["elogia", "", "praises", "elogiar"], ["el", "", "the"], ["estilo", "", "style"], ["del", "", "of the", "de"], ["autor", "", "author"], ["sin", "", "without"], ["sospechar", "", "suspecting"], ["que", "", "that"], ["buena", "", "a good", "bueno"], ["parte", "", "part"], ["de", "", "of"], ["lo", "", "what"], ["que", "", "that"], ["admira", "", "he admires", "admirar"], ["son", "", "are", "ser"], ["decisiones", "", "decisions", "decisión"], ["ajenas", "", "someone else's", "ajeno"], [".", "", ""]],
        en: "The reader praises the author's style without suspecting that much of what he admires is someone else's decisions.",
      },
      {
        t: [["Durante", "", "for", "durante"], ["mucho", "", "a long"], ["tiempo", "", "time"], [",", "", ""], ["el", "", "the"], ["nombre", "", "name"], ["del", "", "of the", "de"], ["traductor", "", "translator"], ["ni", "", "not"], ["siquiera", "", "even"], ["figuraba", "", "appeared", "figurar"], ["en", "", "on"], ["la", "", "the", "el"], ["portada", "", "cover"], ["de", "", "of"], ["los", "", "the", "el"], ["libros", "", "books", "libro"], [".", "", ""]],
        en: "For a long time, the translator's name didn't even appear on the cover of books.",
      },
      {
        t: [["Hoy", "", "today", "hoy"], ["la", "", "the", "el"], ["situación", "", "situation"], ["ha", "", "has", "haber"], ["mejorado", "", "improved", "mejorar"], [",", "", ""], ["aunque", "", "although"], ["las", "", "the", "el"], ["tarifas", "", "rates", "tarifa"], ["y", "", "and"], ["el", "", "the"], ["reconocimiento", "", "recognition"], ["siguen", "", "are still", "seguir"], ["lejos", "", "far"], ["de", "", "from"], ["corresponderse", "", "matching"], ["con", "", "(with)"], ["la", "", "the", "el"], ["complejidad", "", "complexity"], ["del", "", "of the", "de"], ["trabajo", "", "work"], [".", "", ""]],
        en: "Today the situation has improved, although pay rates and recognition are still far from matching the complexity of the work.",
      },
      {
        t: [["A", "", "to", "a"], ["ello", "", "that"], ["se", "", "itself"], ["suma", "", "is added", "sumarse"], ["ahora", "", "now"], ["la", "", "the", "el"], ["irrupción", "", "sudden arrival"], ["de", "", "of"], ["la", "", "the", "el"], ["traducción", "", "translation"], ["automática", "", "machine", "automático"], [",", "", ""], ["que", "", "which"], ["ha", "", "has", "haber"], ["reabierto", "", "reopened", "reabrir"], ["viejas", "", "old", "viejo"], ["preguntas", "", "questions", "pregunta"], [".", "", ""]],
        en: "Added to that now is the sudden rise of machine translation, which has reopened old questions.",
      },
      {
        t: [["Las", "", "the", "el"], ["máquinas", "", "machines", "máquina"], ["ofrecen", "", "offer", "ofrecer"], ["ya", "", "already"], ["resultados", "", "results", "resultado"], ["asombrosamente", "", "astonishingly"], ["fluidos", "", "fluent", "fluido"], ["en", "", "in"], ["textos", "", "texts", "texto"], ["técnicos", "", "technical", "técnico"], ["o", "", "or"], ["administrativos", "", "administrative", "administrativo"], [".", "", ""]],
        en: "Machines already deliver astonishingly fluent results in technical or administrative texts.",
      },
      {
        t: [["Sin", "", "without", "sin"], ["embargo", "", "however"], [",", "", ""], ["allí", "", "there"], ["donde", "", "where"], ["el", "", "the"], ["sentido", "", "meaning"], ["depende", "", "depends", "depender"], ["del", "", "on the", "de"], ["tono", "", "tone"], [",", "", ""], ["de", "", "on"], ["la", "", "the", "el"], ["ironía", "", "irony"], ["o", "", "or"], ["de", "", "on"], ["lo", "", "what"], ["que", "", "that"], ["se", "", "(is)"], ["calla", "", "left unsaid", "callar"], [",", "", ""], ["siguen", "", "continue", "seguir"], ["haciendo", "", "being", "hacer"], ["falta", "", "needed"], ["criterio", "", "judgement"], ["y", "", "and"], ["sensibilidad", "", "sensitivity"], [".", "", ""]],
        en: "However, wherever meaning depends on tone, irony or what is left unsaid, judgement and sensitivity are still needed.",
      },
      {
        t: [["Quizá", "", "perhaps", "quizá"], ["la", "", "the", "el"], ["vieja", "", "old", "viejo"], ["acusación", "", "accusation"], ["deba", "", "should", "deber"], [",", "", ""], ["pues", "", "then"], [",", "", ""], ["reformularse", "", "be reformulated", "reformular"], [".", "", ""]],
        en: "Perhaps, then, the old accusation should be reformulated.",
      },
      {
        t: [["El", "", "the", "el"], ["traductor", "", "translator"], ["no", "", "not"], ["traiciona", "", "betrays", "traicionar"], ["por", "", "out of"], ["descuido", "", "carelessness"], ["ni", "", "nor"], ["por", "", "out of"], ["incompetencia", "", "incompetence"], [",", "", ""], ["sino", "", "but"], ["porque", "", "because"], ["toda", "", "every", "todo"], ["lectura", "", "reading"], ["implica", "", "involves", "implicar"], ["elegir", "", "choosing"], [",", "", ""], ["y", "", "and"], ["elegir", "", "choosing"], ["es", "", "is", "ser"], ["renunciar", "", "giving up"], [".", "", ""]],
        en: "The translator does not betray out of carelessness or incompetence, but because every reading involves choosing, and to choose is to give something up.",
      },
      {
        t: [["Su", "", "his", "su"], ["mérito", "", "merit"], ["no", "", "not"], ["estriba", "", "lies", "estribar"], ["en", "", "in"], ["evitar", "", "avoiding"], ["la", "", "the", "el"], ["traición", "", "betrayal"], [",", "", ""], ["que", "", "which"], ["es", "", "is", "ser"], ["inevitable", "", "inevitable"], [",", "", ""], ["sino", "", "but"], ["en", "", "in"], ["cometerla", "", "committing it", "cometer"], ["con", "", "with"], ["la", "", "the", "el"], ["lealtad", "", "loyalty"], ["suficiente", "", "sufficient"], ["para", "", "for"], ["que", "", "(that)"], ["el", "", "the"], ["original", "", "original"], ["siga", "", "goes on", "seguir"], ["respirando", "", "breathing", "respirar"], ["en", "", "in"], ["otra", "", "another", "otro"], ["lengua", "", "language"], [".", "", ""]],
        en: "His merit lies not in avoiding betrayal, which is inevitable, but in committing it with enough loyalty for the original to go on breathing in another language.",
      },
    ],
    q: [
      { q: "What does the Italian adage say?", o: ["Every writer is a translator", "Every translator is a traitor", "Every reader is a critic"], a: 1 },
      { q: "Why is the adage itself ironic?", o: ["It was written by a translator", "It barely survives being translated", "It is not really Italian"], a: 1 },
      { q: "What does \"domesticating\" a translation aim for?", o: ["Keeping the strangeness of the original", "Making the work seem written in the reader's language", "Translating word for word"], a: 1 },
      { q: "What is described as the most striking paradox of the craft?", o: ["Translators are paid too much", "The better the translation, the less the translator's work is noticed", "Poetry is easy to translate"], a: 1 },
      { q: "According to the author, where are human translators still needed?", o: ["In technical manuals", "Where meaning depends on tone, irony or what is left unsaid", "In administrative documents"], a: 1 },
    ],
  },
];

export default data;
