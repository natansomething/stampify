import type { Text } from '../types';

const data: Text[] = [
  {
    id: "es-1-first-workday",
    lv: 1,
    kind: "story",
    title: "El primer día de trabajo",
    titleEn: "The first day at work",
    s: [
      {
        t: [["Hoy", "", "today", "hoy"], ["es", "", "is", "ser"], ["el", "", "the"], ["primer", "", "first", "primero"], ["día", "", "day"], ["de", "", "of"], ["trabajo", "", "work"], ["de", "", "of"], ["Marta", "", "Marta"], [".", "", ""]],
        en: "Today is Marta's first day at work.",
      },
      {
        t: [["Marta", "", "Marta"], ["es", "", "is", "ser"], ["enfermera", "", "a nurse", "enfermero"], ["en", "", "in"], ["un", "", "a", "uno"], ["hospital", "", "hospital"], ["de", "", "in"], ["Madrid", "", "Madrid"], [".", "", ""]],
        en: "Marta is a nurse in a hospital in Madrid.",
      },
      {
        t: [["Se", "", "(herself)", "se"], ["levanta", "", "gets up", "levantarse"], ["a", "", "at"], ["las", "", "the", "el"], ["seis", "", "six"], ["y", "", "and"], ["toma", "", "has", "tomar"], ["un", "", "a", "uno"], ["café", "", "coffee"], ["rápido", "", "quick"], [".", "", ""]],
        en: "She gets up at six and has a quick coffee.",
      },
      {
        t: [["Va", "", "she goes", "ir"], ["al", "", "to the", "a"], ["hospital", "", "hospital"], ["en", "", "by"], ["metro", "", "metro"], [".", "", ""]],
        en: "She goes to the hospital by metro.",
      },
      {
        t: [["El", "", "the", "el"], ["hospital", "", "hospital"], ["es", "", "is", "ser"], ["muy", "", "very"], ["grande", "", "big"], ["y", "", "and"], ["Marta", "", "Marta"], ["no", "", "not"], ["conoce", "", "knows", "conocer"], ["a", "", "(personal a)"], ["nadie", "", "anybody"], [".", "", ""]],
        en: "The hospital is very big and Marta doesn't know anybody.",
      },
      {
        t: [["Está", "", "she is", "estar"], ["un", "", "a", "uno"], ["poco", "", "little"], ["nerviosa", "", "nervous", "nervioso"], [".", "", ""]],
        en: "She is a little nervous.",
      },
      {
        t: [["Una", "", "one", "uno"], ["compañera", "", "colleague", "compañero"], ["se", "", "(herself)"], ["llama", "", "is called", "llamarse"], ["Elena", "", "Elena"], ["y", "", "and"], ["es", "", "is", "ser"], ["muy", "", "very"], ["simpática", "", "nice", "simpático"], [".", "", ""]],
        en: "One colleague is called Elena and she is very nice.",
      },
      {
        t: [["Elena", "", "Elena"], ["le", "", "her (to her)"], ["enseña", "", "shows", "enseñar"], ["el", "", "the"], ["hospital", "", "hospital"], [":", "", ""], ["las", "", "the", "el"], ["habitaciones", "", "rooms", "habitación"], [",", "", ""], ["la", "", "the", "el"], ["cocina", "", "kitchen"], ["y", "", "and"], ["la", "", "the", "el"], ["sala", "", "room"], ["de", "", "of"], ["descanso", "", "rest"], [".", "", ""]],
        en: "Elena shows her the hospital: the rooms, the kitchen and the break room.",
      },
      {
        t: [["A", "", "at", "a"], ["las", "", "the", "el"], ["once", "", "eleven"], [",", "", ""], ["Marta", "", "Marta"], ["y", "", "and"], ["Elena", "", "Elena"], ["comen", "", "eat", "comer"], ["un", "", "a", "uno"], ["bocadillo", "", "sandwich"], ["juntas", "", "together", "junto"], [".", "", ""]],
        en: "At eleven, Marta and Elena eat a sandwich together.",
      },
      {
        t: [["Por", "", "in", "por"], ["la", "", "the", "el"], ["tarde", "", "afternoon"], ["hay", "", "there is", "haber"], ["mucho", "", "a lot of"], ["trabajo", "", "work"], [",", "", ""], ["pero", "", "but"], ["todo", "", "everything"], ["va", "", "goes", "ir"], ["bien", "", "well"], [".", "", ""]],
        en: "In the afternoon there is a lot of work, but everything goes well.",
      },
      {
        t: [["A", "", "at", "a"], ["las", "", "the", "el"], ["ocho", "", "eight"], [",", "", ""], ["Marta", "", "Marta"], ["vuelve", "", "goes back", "volver"], ["a", "", "to"], ["casa", "", "home"], ["muy", "", "very"], ["cansada", "", "tired", "cansado"], [".", "", ""]],
        en: "At eight, Marta goes back home very tired.",
      },
      {
        t: [["Mañana", "", "tomorrow", "mañana"], ["va", "", "she is going", "ir"], ["a", "", "to"], ["trabajar", "", "work"], ["otra", "", "another", "otro"], ["vez", "", "time"], ["con", "", "with"], ["Elena", "", "Elena"], [".", "", ""]],
        en: "Tomorrow she is going to work with Elena again.",
      },
      {
        t: [["¡", "", ""], ["Ya", "", "now", "ya"], ["tiene", "", "she has", "tener"], ["una", "", "a", "uno"], ["amiga", "", "friend", "amigo"], ["en", "", "at"], ["el", "", "the"], ["trabajo", "", "work"], ["!", "", ""]],
        en: "Now she has a friend at work!",
      },
    ],
    q: [
      { q: "What is Marta's job?", o: ["She is a teacher", "She is a nurse", "She is a cook"], a: 1 },
      { q: "How does Marta get to the hospital?", o: ["By metro", "By bus", "On foot"], a: 0 },
      { q: "Who is Elena?", o: ["Marta's sister", "A patient", "A colleague"], a: 2 },
      { q: "How does Marta feel when she goes home?", o: ["Very tired", "Very nervous", "Bored"], a: 0 },
    ],
  },
  {
    id: "es-1-mexico-city",
    lv: 1,
    kind: "article",
    title: "Ciudad de México",
    titleEn: "Mexico City",
    s: [
      {
        t: [["Ciudad", "", "city", "ciudad"], ["de", "", "of"], ["México", "", "Mexico"], ["es", "", "is", "ser"], ["la", "", "the", "el"], ["capital", "", "capital"], ["de", "", "of"], ["México", "", "Mexico"], [".", "", ""]],
        en: "Mexico City is the capital of Mexico.",
      },
      {
        t: [["Es", "", "it is", "ser"], ["una", "", "a", "uno"], ["ciudad", "", "city"], ["muy", "", "very"], ["grande", "", "big"], [":", "", ""], ["allí", "", "there"], ["viven", "", "live", "vivir"], ["más", "", "more"], ["de", "", "than"], ["nueve", "", "nine"], ["millones", "", "million", "millón"], ["de", "", "(of)"], ["personas", "", "people", "persona"], [".", "", ""]],
        en: "It is a very big city: more than nine million people live there.",
      },
      {
        t: [["La", "", "the", "el"], ["ciudad", "", "city"], ["está", "", "is", "estar"], ["en", "", "in"], ["un", "", "a", "uno"], ["valle", "", "valley"], [",", "", ""], ["a", "", "at"], ["más", "", "more"], ["de", "", "than"], ["dos", "", "two"], ["mil", "", "thousand"], ["metros", "", "metres", "metro"], ["de", "", "of"], ["altura", "", "height"], [".", "", ""]],
        en: "The city is in a valley, more than two thousand metres high.",
      },
      {
        t: [["Por", "", "because of", "por"], ["eso", "", "that"], [",", "", ""], ["por", "", "at"], ["la", "", "the", "el"], ["noche", "", "night"], ["hace", "", "it is", "hacer"], ["fresco", "", "cool"], [".", "", ""]],
        en: "That's why it is cool at night.",
      },
      {
        t: [["En", "", "in", "en"], ["el", "", "the"], ["centro", "", "centre"], ["hay", "", "there is", "haber"], ["una", "", "a", "uno"], ["plaza", "", "square"], ["enorme", "", "huge"], [",", "", ""], ["el", "", "the"], ["Zócalo", "", "Zócalo"], [".", "", ""]],
        en: "In the centre there is a huge square, the Zócalo.",
      },
      {
        t: [["Cerca", "", "near", "cerca"], ["de", "", "(of)"], ["la", "", "the", "el"], ["plaza", "", "square"], ["hay", "", "there are", "haber"], ["museos", "", "museums", "museo"], [",", "", ""], ["palacios", "", "palaces", "palacio"], ["y", "", "and"], ["edificios", "", "buildings", "edificio"], ["muy", "", "very"], ["antiguos", "", "old", "antiguo"], [".", "", ""]],
        en: "Near the square there are museums, palaces and very old buildings.",
      },
      {
        t: [["Mucha", "", "a lot of", "mucho"], ["gente", "", "people"], ["va", "", "goes", "ir"], ["al", "", "to the", "a"], ["trabajo", "", "work"], ["en", "", "by"], ["metro", "", "metro"], [",", "", ""], ["porque", "", "because"], ["el", "", "the"], ["tráfico", "", "traffic"], ["es", "", "is", "ser"], ["terrible", "", "terrible"], [".", "", ""]],
        en: "A lot of people go to work by metro, because the traffic is terrible.",
      },
      {
        t: [["El", "", "the", "el"], ["metro", "", "metro"], ["es", "", "is", "ser"], ["barato", "", "cheap"], ["y", "", "and"], ["muy", "", "very"], ["rápido", "", "fast"], [".", "", ""]],
        en: "The metro is cheap and very fast.",
      },
      {
        t: [["La", "", "the", "el"], ["comida", "", "food"], ["de", "", "of"], ["la", "", "the", "el"], ["ciudad", "", "city"], ["es", "", "is", "ser"], ["famosa", "", "famous", "famoso"], ["en", "", "in"], ["todo", "", "all"], ["el", "", "the"], ["mundo", "", "world"], [".", "", ""]],
        en: "The city's food is famous all over the world.",
      },
      {
        t: [["En", "", "in", "en"], ["la", "", "the", "el"], ["calle", "", "street"], ["venden", "", "they sell", "vender"], ["tacos", "", "tacos", "taco"], [",", "", ""], ["tamales", "", "tamales", "tamal"], ["y", "", "and"], ["fruta", "", "fruit"], ["fresca", "", "fresh", "fresco"], [".", "", ""]],
        en: "In the street they sell tacos, tamales and fresh fruit.",
      },
      {
        t: [["Los", "", "on", "el"], ["domingos", "", "Sundays", "domingo"], [",", "", ""], ["muchas", "", "many", "mucho"], ["familias", "", "families", "familia"], ["pasean", "", "go for a walk", "pasear"], ["por", "", "in"], ["el", "", "the"], ["parque", "", "park"], ["de", "", "of"], ["Chapultepec", "", "Chapultepec"], [".", "", ""]],
        en: "On Sundays, many families go for a walk in Chapultepec Park.",
      },
      {
        t: [["Es", "", "it is", "ser"], ["un", "", "a", "uno"], ["parque", "", "park"], ["muy", "", "very"], ["grande", "", "big"], [",", "", ""], ["con", "", "with"], ["lagos", "", "lakes", "lago"], [",", "", ""], ["un", "", "a", "uno"], ["castillo", "", "castle"], ["y", "", "and"], ["muchos", "", "many", "mucho"], ["árboles", "", "trees", "árbol"], [".", "", ""]],
        en: "It is a very big park, with lakes, a castle and many trees.",
      },
      {
        t: [["Ciudad", "", "city", "ciudad"], ["de", "", "of"], ["México", "", "Mexico"], ["es", "", "is", "ser"], ["ruidosa", "", "noisy", "ruidoso"], [",", "", ""], ["pero", "", "but"], ["también", "", "also"], ["es", "", "it is", "ser"], ["una", "", "a", "uno"], ["ciudad", "", "city"], ["muy", "", "very"], ["alegre", "", "cheerful"], [".", "", ""]],
        en: "Mexico City is noisy, but it is also a very cheerful city.",
      },
    ],
    q: [
      { q: "What is the Zócalo?", o: ["A museum", "A huge square", "A park"], a: 1 },
      { q: "Why do many people take the metro?", o: ["Because the traffic is terrible", "Because they have no car", "Because it is free"], a: 0 },
      { q: "Why is it cool at night?", o: ["Because it is near the sea", "Because the city is high up", "Because it rains a lot"], a: 1 },
      { q: "What can you find in Chapultepec Park?", o: ["Lakes and a castle", "A big market", "The Zócalo"], a: 0 },
    ],
  },
  {
    id: "es-1-pablo-birthday",
    lv: 1,
    kind: "story",
    title: "El cumpleaños de Pablo",
    titleEn: "Pablo's birthday",
    s: [
      {
        t: [["Hoy", "", "today", "hoy"], ["es", "", "is", "ser"], ["sábado", "", "Saturday"], ["y", "", "and"], ["Pablo", "", "Pablo"], ["cumple", "", "turns", "cumplir"], ["cuarenta", "", "forty"], ["años", "", "years", "año"], [".", "", ""]],
        en: "Today is Saturday and Pablo turns forty.",
      },
      {
        t: [["Su", "", "his"], ["mujer", "", "wife"], [",", "", ""], ["Carmen", "", "Carmen"], [",", "", ""], ["prepara", "", "prepares", "preparar"], ["una", "", "a", "uno"], ["fiesta", "", "party"], ["sorpresa", "", "surprise"], ["en", "", "at"], ["casa", "", "home"], [".", "", ""]],
        en: "His wife, Carmen, is preparing a surprise party at home.",
      },
      {
        t: [["Pablo", "", "Pablo"], ["no", "", "not"], ["sabe", "", "knows", "saber"], ["nada", "", "anything"], [".", "", ""]],
        en: "Pablo doesn't know anything.",
      },
      {
        t: [["Por", "", "in", "por"], ["la", "", "the", "el"], ["mañana", "", "morning"], [",", "", ""], ["Carmen", "", "Carmen"], ["le", "", "him (to him)"], ["pregunta", "", "asks", "preguntar"], [":", "", ""], ["«", "", ""], ["¿", "", ""], ["Vamos", "", "shall we go", "ir"], ["al", "", "to the", "a"], ["cine", "", "cinema"], ["esta", "", "this", "este"], ["tarde", "", "afternoon"], ["?", "", ""], ["»", "", ""]],
        en: "In the morning, Carmen asks him: \"Shall we go to the cinema this afternoon?\"",
      },
      {
        t: [["Pablo", "", "Pablo"], ["está", "", "is", "estar"], ["contento", "", "happy"], ["y", "", "and"], ["dice", "", "says", "decir"], ["que", "", "that"], ["sí", "", "yes"], [".", "", ""]],
        en: "Pablo is happy and says yes.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["Carmen", "", "Carmen"], ["no", "", "not"], ["va", "", "goes", "ir"], ["al", "", "to the", "a"], ["cine", "", "cinema"], [":", "", ""], ["Pablo", "", "Pablo"], ["va", "", "goes", "ir"], ["con", "", "with"], ["su", "", "his"], ["hermano", "", "brother"], [".", "", ""]],
        en: "But Carmen doesn't go to the cinema: Pablo goes with his brother.",
      },
      {
        t: [["Mientras", "", "while", "mientras"], ["tanto", "", "(meanwhile)"], [",", "", ""], ["Carmen", "", "Carmen"], ["y", "", "and"], ["sus", "", "their", "su"], ["amigos", "", "friends", "amigo"], ["decoran", "", "decorate", "decorar"], ["el", "", "the"], ["salón", "", "living room"], [".", "", ""]],
        en: "Meanwhile, Carmen and their friends decorate the living room.",
      },
      {
        t: [["Ponen", "", "they put up", "poner"], ["globos", "", "balloons", "globo"], ["y", "", "and"], ["flores", "", "flowers", "flor"], [",", "", ""], ["y", "", "and"], ["hacen", "", "they make", "hacer"], ["una", "", "a", "uno"], ["tarta", "", "cake"], ["de", "", "(made of)"], ["chocolate", "", "chocolate"], [".", "", ""]],
        en: "They put up balloons and flowers, and they make a chocolate cake.",
      },
      {
        t: [["A", "", "at", "a"], ["las", "", "the", "el"], ["siete", "", "seven"], ["y", "", "and"], ["media", "", "half", "medio"], [",", "", ""], ["el", "", "the"], ["hermano", "", "brother"], ["de", "", "of"], ["Pablo", "", "Pablo"], ["envía", "", "sends", "enviar"], ["un", "", "a", "uno"], ["mensaje", "", "message"], [":", "", ""], ["«", "", ""], ["Ya", "", "now", "ya"], ["vamos", "", "we are going", "ir"], ["a", "", "to"], ["casa", "", "home"], [".", "", ""], ["»", "", ""]],
        en: "At half past seven, Pablo's brother sends a message: \"We're going home now.\"",
      },
      {
        t: [["A", "", "at", "a"], ["las", "", "the", "el"], ["ocho", "", "eight"], [",", "", ""], ["todos", "", "everybody", "todo"], ["esperan", "", "wait", "esperar"], ["en", "", "in"], ["silencio", "", "silence"], [".", "", ""]],
        en: "At eight, everybody waits in silence.",
      },
      {
        t: [["La", "", "the", "el"], ["puerta", "", "door"], ["se", "", "(itself)"], ["abre", "", "opens", "abrirse"], [".", "", ""]],
        en: "The door opens.",
      },
      {
        t: [["«", "", ""], ["¡", "", ""], ["Sorpresa", "", "surprise", "sorpresa"], ["!", "", ""], ["»", "", ""], [",", "", ""], ["gritan", "", "shout", "gritar"], ["todos", "", "everybody", "todo"], [".", "", ""]],
        en: "\"Surprise!\" everybody shouts.",
      },
      {
        t: [["Pablo", "", "Pablo"], ["no", "", "not"], ["puede", "", "can", "poder"], ["hablar", "", "speak"], [".", "", ""]],
        en: "Pablo can't speak.",
      },
      {
        t: [["Después", "", "then", "después"], ["ríe", "", "he laughs", "reír"], ["y", "", "and"], ["abraza", "", "hugs", "abrazar"], ["a", "", "(personal a)"], ["Carmen", "", "Carmen"], [".", "", ""]],
        en: "Then he laughs and hugs Carmen.",
      },
      {
        t: [["Sus", "", "his", "su"], ["amigos", "", "friends", "amigo"], ["le", "", "him (to him)"], ["dan", "", "give", "dar"], ["regalos", "", "presents", "regalo"], [":", "", ""], ["un", "", "a", "uno"], ["libro", "", "book"], [",", "", ""], ["una", "", "a", "uno"], ["camisa", "", "shirt"], ["y", "", "and"], ["una", "", "a", "uno"], ["guitarra", "", "guitar"], [".", "", ""]],
        en: "His friends give him presents: a book, a shirt and a guitar.",
      },
      {
        t: [["«", "", ""], ["¡", "", ""], ["Ahora", "", "now", "ahora"], ["voy", "", "I'm going", "ir"], ["a", "", "to"], ["tocar", "", "play"], ["para", "", "for"], ["ustedes", "", "you (all)", "usted"], ["!", "", ""], ["»", "", ""], [",", "", ""], ["dice", "", "says", "decir"], ["Pablo", "", "Pablo"], [".", "", ""]],
        en: "\"Now I'm going to play for you!\" says Pablo.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["Pablo", "", "Pablo"], ["no", "", "not"], ["sabe", "", "knows how", "saber"], ["tocar", "", "to play"], ["la", "", "the", "el"], ["guitarra", "", "guitar"], [",", "", ""], ["y", "", "and"], ["todos", "", "everybody", "todo"], ["ríen", "", "laugh", "reír"], ["mucho", "", "a lot"], [".", "", ""]],
        en: "But Pablo can't play the guitar, and everybody laughs a lot.",
      },
    ],
    q: [
      { q: "How old is Pablo today?", o: ["Thirty", "Forty", "Fifty"], a: 1 },
      { q: "Who goes to the cinema with Pablo?", o: ["His brother", "Carmen", "His friends"], a: 0 },
      { q: "What cake do they make?", o: ["A fruit cake", "A cheese cake", "A chocolate cake"], a: 2 },
      { q: "Why does everybody laugh at the end?", o: ["The cake falls on the floor", "Pablo can't play the guitar", "The guitar is broken"], a: 1 },
    ],
  },
  {
    id: "es-1-sports",
    lv: 1,
    kind: "article",
    title: "El fútbol y otros deportes",
    titleEn: "Football and other sports",
    s: [
      {
        t: [["En", "", "in", "en"], ["España", "", "Spain"], ["y", "", "and"], ["en", "", "in"], ["América", "", "America"], ["Latina", "", "Latin", "latino"], [",", "", ""], ["el", "", "the"], ["deporte", "", "sport"], ["más", "", "most"], ["popular", "", "popular"], ["es", "", "is", "ser"], ["el", "", "(the)"], ["fútbol", "", "football"], [".", "", ""]],
        en: "In Spain and Latin America, the most popular sport is football.",
      },
      {
        t: [["Muchos", "", "many", "mucho"], ["niños", "", "children", "niño"], ["juegan", "", "play", "jugar"], ["al", "", "(the)", "a"], ["fútbol", "", "football"], ["en", "", "in"], ["la", "", "the", "el"], ["calle", "", "street"], [",", "", ""], ["en", "", "in"], ["el", "", "the"], ["parque", "", "park"], ["o", "", "or"], ["en", "", "at"], ["el", "", "(the)"], ["colegio", "", "school"], [".", "", ""]],
        en: "Many children play football in the street, in the park or at school.",
      },
      {
        t: [["Los", "", "at", "el"], ["fines", "", "ends", "fin"], ["de", "", "of"], ["semana", "", "week"], [",", "", ""], ["millones", "", "millions", "millón"], ["de", "", "of"], ["personas", "", "people", "persona"], ["ven", "", "watch", "ver"], ["los", "", "the", "el"], ["partidos", "", "matches", "partido"], ["en", "", "on"], ["la", "", "the", "el"], ["televisión", "", "television"], [".", "", ""]],
        en: "At weekends, millions of people watch the matches on television.",
      },
      {
        t: [["Durante", "", "during", "durante"], ["los", "", "the", "el"], ["partidos", "", "matches", "partido"], ["importantes", "", "important", "importante"], [",", "", ""], ["los", "", "the", "el"], ["bares", "", "bars", "bar"], ["están", "", "are", "estar"], ["llenos", "", "full", "lleno"], ["de", "", "of"], ["gente", "", "people"], ["y", "", "and"], ["de", "", "of"], ["ruido", "", "noise"], [".", "", ""]],
        en: "During important matches, the bars are full of people and noise.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["el", "", "(the)"], ["fútbol", "", "football"], ["no", "", "not"], ["es", "", "is", "ser"], ["el", "", "the"], ["único", "", "only"], ["deporte", "", "sport"], [".", "", ""]],
        en: "But football is not the only sport.",
      },
      {
        t: [["El", "", "(the)", "el"], ["baloncesto", "", "basketball"], ["también", "", "also"], ["es", "", "is", "ser"], ["muy", "", "very"], ["popular", "", "popular"], [",", "", ""], ["sobre", "", "above"], ["todo", "", "all"], ["en", "", "in"], ["España", "", "Spain"], ["y", "", "and"], ["en", "", "in"], ["Argentina", "", "Argentina"], [".", "", ""]],
        en: "Basketball is also very popular, especially in Spain and Argentina.",
      },
      {
        t: [["En", "", "in", "en"], ["el", "", "the"], ["Caribe", "", "Caribbean"], [",", "", ""], ["por", "", "for"], ["ejemplo", "", "example"], ["en", "", "in"], ["Cuba", "", "Cuba"], ["o", "", "or"], ["en", "", "in"], ["la", "", "the", "el"], ["República", "", "Republic", "república"], ["Dominicana", "", "Dominican", "dominicano"], [",", "", ""], ["la", "", "(the)", "el"], ["gente", "", "people"], ["prefiere", "", "prefers", "preferir"], ["el", "", "(the)"], ["béisbol", "", "baseball"], [".", "", ""]],
        en: "In the Caribbean, for example in Cuba or the Dominican Republic, people prefer baseball.",
      },
      {
        t: [["El", "", "(the)", "el"], ["tenis", "", "tennis"], ["y", "", "and"], ["el", "", "(the)"], ["ciclismo", "", "cycling"], ["también", "", "also"], ["tienen", "", "have", "tener"], ["muchos", "", "many", "mucho"], ["aficionados", "", "fans", "aficionado"], [".", "", ""]],
        en: "Tennis and cycling also have many fans.",
      },
      {
        t: [["Hoy", "", "today", "hoy"], [",", "", ""], ["muchos", "", "many", "mucho"], ["adultos", "", "adults", "adulto"], ["corren", "", "run", "correr"], ["por", "", "in"], ["la", "", "the", "el"], ["mañana", "", "morning"], ["o", "", "or"], ["van", "", "go", "ir"], ["al", "", "to the", "a"], ["gimnasio", "", "gym"], ["después", "", "after"], ["del", "", "(of) the", "de"], ["trabajo", "", "work"], [".", "", ""]],
        en: "Today, many adults run in the morning or go to the gym after work.",
      },
      {
        t: [["Otras", "", "other", "otro"], ["personas", "", "people", "persona"], ["prefieren", "", "prefer", "preferir"], ["caminar", "", "walking"], [",", "", ""], ["nadar", "", "swimming"], ["o", "", "or"], ["montar", "", "riding"], ["en", "", "(on)"], ["bicicleta", "", "a bike"], [".", "", ""]],
        en: "Other people prefer walking, swimming or cycling.",
      },
      {
        t: [["Hacer", "", "doing", "hacer"], ["deporte", "", "sport"], ["es", "", "is", "ser"], ["bueno", "", "good"], ["para", "", "for"], ["la", "", "the", "el"], ["salud", "", "health"], [".", "", ""]],
        en: "Doing sport is good for your health.",
      },
      {
        t: [["Y", "", "and", "y"], ["para", "", "for"], ["muchas", "", "many", "mucho"], ["personas", "", "people", "persona"], [",", "", ""], ["también", "", "also"], ["es", "", "it is", "ser"], ["una", "", "a", "uno"], ["forma", "", "way"], ["de", "", "of"], ["estar", "", "being"], ["con", "", "with"], ["los", "", "the", "el"], ["amigos", "", "friends", "amigo"], [".", "", ""]],
        en: "And for many people, it is also a way of being with friends.",
      },
      {
        t: [["¿", "", ""], ["Y", "", "and", "y"], ["a", "", "to"], ["ti", "", "you", "tú"], [",", "", ""], ["qué", "", "which"], ["deporte", "", "sport"], ["te", "", "you (to you)"], ["gusta", "", "is pleasing", "gustar"], ["?", "", ""]],
        en: "And you, which sport do you like?",
      },
    ],
    q: [
      { q: "What is the most popular sport in Spain and Latin America?", o: ["Basketball", "Football", "Tennis"], a: 1 },
      { q: "Where do people prefer baseball?", o: ["In Argentina", "In Spain", "In the Caribbean"], a: 2 },
      { q: "What do many adults do after work?", o: ["They go to the gym", "They watch basketball", "They play football in the street"], a: 0 },
      { q: "What are bars like during important matches?", o: ["Empty and quiet", "Full of people and noise", "Closed"], a: 1 },
    ],
  },
  {
    id: "es-1-lost-keys",
    lv: 1,
    kind: "story",
    title: "Las llaves perdidas",
    titleEn: "The lost keys",
    s: [
      {
        t: [["Javier", "", "Javier"], ["vive", "", "lives", "vivir"], ["solo", "", "alone"], ["en", "", "in"], ["un", "", "a", "uno"], ["piso", "", "flat"], ["pequeño", "", "small"], ["en", "", "in"], ["Valencia", "", "Valencia"], [".", "", ""]],
        en: "Javier lives alone in a small flat in Valencia.",
      },
      {
        t: [["Son", "", "it is", "ser"], ["las", "", "the", "el"], ["ocho", "", "eight"], ["de", "", "in"], ["la", "", "the", "el"], ["mañana", "", "morning"], ["y", "", "and"], ["Javier", "", "Javier"], ["tiene", "", "has", "tener"], ["prisa", "", "hurry"], [".", "", ""]],
        en: "It is eight in the morning and Javier is in a hurry.",
      },
      {
        t: [["Tiene", "", "he has", "tener"], ["una", "", "a", "uno"], ["reunión", "", "meeting"], ["importante", "", "important"], ["a", "", "at"], ["las", "", "the", "el"], ["nueve", "", "nine"], [".", "", ""]],
        en: "He has an important meeting at nine.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["hay", "", "there is", "haber"], ["un", "", "a", "uno"], ["problema", "", "problem"], [":", "", ""], ["no", "", "not"], ["encuentra", "", "he finds", "encontrar"], ["sus", "", "his", "su"], ["llaves", "", "keys", "llave"], [".", "", ""]],
        en: "But there is a problem: he can't find his keys.",
      },
      {
        t: [["Busca", "", "he looks", "buscar"], ["en", "", "on"], ["la", "", "the", "el"], ["mesa", "", "table"], ["de", "", "of"], ["la", "", "the", "el"], ["cocina", "", "kitchen"], [",", "", ""], ["pero", "", "but"], ["no", "", "not"], ["están", "", "they are", "estar"], ["allí", "", "there"], [".", "", ""]],
        en: "He looks on the kitchen table, but they aren't there.",
      },
      {
        t: [["Después", "", "then", "después"], ["busca", "", "he looks", "buscar"], ["en", "", "in"], ["los", "", "the", "el"], ["bolsillos", "", "pockets", "bolsillo"], ["de", "", "of"], ["su", "", "his"], ["chaqueta", "", "jacket"], ["y", "", "and"], ["en", "", "in"], ["su", "", "his"], ["mochila", "", "backpack"], [".", "", ""]],
        en: "Then he looks in his jacket pockets and in his backpack.",
      },
      {
        t: [["Nada", "", "nothing", "nada"], [".", "", ""]],
        en: "Nothing.",
      },
      {
        t: [["Mira", "", "he looks", "mirar"], ["debajo", "", "under"], ["del", "", "(of) the", "de"], ["sofá", "", "sofa"], ["y", "", "and"], ["detrás", "", "behind"], ["de", "", "(of)"], ["la", "", "the", "el"], ["televisión", "", "television"], [".", "", ""]],
        en: "He looks under the sofa and behind the television.",
      },
      {
        t: [["Tampoco", "", "not either", "tampoco"], ["están", "", "they are", "estar"], ["allí", "", "there"], [".", "", ""]],
        en: "They aren't there either.",
      },
      {
        t: [["Javier", "", "Javier"], ["está", "", "is", "estar"], ["muy", "", "very"], ["nervioso", "", "nervous"], ["y", "", "and"], ["mira", "", "looks at", "mirar"], ["el", "", "the"], ["reloj", "", "clock"], [":", "", ""], ["son", "", "it is", "ser"], ["las", "", "the", "el"], ["ocho", "", "eight"], ["y", "", "and"], ["cuarto", "", "quarter"], [".", "", ""]],
        en: "Javier is very nervous and looks at the clock: it is a quarter past eight.",
      },
      {
        t: [["Javier", "", "Javier"], ["llama", "", "calls", "llamar"], ["por", "", "on"], ["teléfono", "", "the phone"], ["a", "", "(personal a)"], ["su", "", "his"], ["hermana", "", "sister", "hermano"], ["Lucía", "", "Lucía"], [".", "", ""]],
        en: "Javier calls his sister Lucía on the phone.",
      },
      {
        t: [["«", "", ""], ["Lucía", "", "Lucía"], [",", "", ""], ["¿", "", ""], ["tienes", "", "do you have", "tener"], ["tú", "", "you"], ["mis", "", "my", "mi"], ["llaves", "", "keys", "llave"], ["?", "", ""], ["»", "", ""]],
        en: "\"Lucía, do you have my keys?\"",
      },
      {
        t: [["«", "", ""], ["No", "", "no", "no"], [",", "", ""], ["pero", "", "but"], ["¿", "", ""], ["por", "", "why"], ["qué", "", "(why)"], ["no", "", "not"], ["miras", "", "you look", "mirar"], ["en", "", "in"], ["la", "", "the", "el"], ["nevera", "", "fridge"], ["?", "", ""], ["»", "", ""], [",", "", ""], ["dice", "", "says", "decir"], ["Lucía", "", "Lucía"], [".", "", ""]],
        en: "\"No, but why don't you look in the fridge?\" says Lucía.",
      },
      {
        t: [["Javier", "", "Javier"], ["abre", "", "opens", "abrir"], ["la", "", "the", "el"], ["nevera", "", "fridge"], [".", "", ""]],
        en: "Javier opens the fridge.",
      },
      {
        t: [["Allí", "", "there", "allí"], [",", "", ""], ["al", "", "next", "a"], ["lado", "", "to"], ["de", "", "(of)"], ["la", "", "the", "el"], ["leche", "", "milk"], [",", "", ""], ["están", "", "are", "estar"], ["sus", "", "his", "su"], ["llaves", "", "keys", "llave"], [".", "", ""]],
        en: "There, next to the milk, are his keys.",
      },
      {
        t: [["Lucía", "", "Lucía"], ["se", "", "(herself)"], ["ríe", "", "laughs", "reírse"], [".", "", ""]],
        en: "Lucía laughs.",
      },
      {
        t: [["«", "", ""], ["¡", "", ""], ["Siempre", "", "always", "siempre"], ["pasa", "", "it happens", "pasar"], ["lo", "", "the"], ["mismo", "", "same"], ["cuando", "", "when"], ["estás", "", "you are", "estar"], ["cansado", "", "tired"], ["!", "", ""], ["»", "", ""]],
        en: "\"The same thing always happens when you're tired!\"",
      },
      {
        t: [["Javier", "", "Javier"], ["sale", "", "leaves", "salir"], ["de", "", "(from)"], ["casa", "", "home"], ["corriendo", "", "running", "correr"], ["y", "", "and"], ["llega", "", "arrives", "llegar"], ["a", "", "at"], ["la", "", "the", "el"], ["reunión", "", "meeting"], ["a", "", "at"], ["las", "", "the", "el"], ["nueve", "", "nine"], ["en", "", "(sharp)"], ["punto", "", "sharp"], [".", "", ""]],
        en: "Javier leaves home running and arrives at the meeting at nine sharp.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["ahora", "", "now"], ["tiene", "", "he has", "tener"], ["otro", "", "another"], ["problema", "", "problem"], [":", "", ""], ["¡", "", ""], ["no", "", "not"], ["encuentra", "", "he finds", "encontrar"], ["su", "", "his"], ["teléfono", "", "phone"], ["!", "", ""]],
        en: "But now he has another problem: he can't find his phone!",
      },
    ],
    q: [
      { q: "Why is Javier in a hurry?", o: ["He has a meeting at nine", "He has a train at eight", "He is late for a party"], a: 0 },
      { q: "Where are the keys?", o: ["Under the sofa", "In the fridge, next to the milk", "In his backpack"], a: 1 },
      { q: "Who gives Javier the idea?", o: ["His colleague", "His mother", "His sister Lucía"], a: 2 },
      { q: "What is Javier's new problem at the end?", o: ["He can't find his phone", "He is late", "He can't find his jacket"], a: 0 },
    ],
  },
];

export default data;
