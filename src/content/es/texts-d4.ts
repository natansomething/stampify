import type { Text } from '../types';

/** Five longer level-2 texts (the last of the beginner batch d1-d4). */
const data: Text[] = [
  {
    id: "es-2-patagonia-trip",
    lv: 2,
    kind: "story",
    title: "Viaje a la Patagonia",
    titleEn: "A trip to Patagonia",
    s: [
      {
        t: [["El", "", "the", "el"], ["verano", "", "summer"], ["pasado", "", "last"], [",", "", ""], ["Lucía", "", "Lucía"], ["y", "", "and"], ["su", "", "her"], ["padre", "", "father"], [",", "", ""], ["Tomás", "", "Tomás"], [",", "", ""], ["fueron", "", "went", "ir"], ["a", "", "to"], ["la", "", "the", "el"], ["Patagonia", "", "Patagonia"], [",", "", ""], ["en", "", "in"], ["el", "", "the"], ["sur", "", "south"], ["de", "", "of"], ["Argentina", "", "Argentina"], [".", "", ""]],
        en: "Last summer, Lucía and her father, Tomás, went to Patagonia, in the south of Argentina.",
      },
      {
        t: [["Era", "", "it was", "ser"], ["un", "", "a", "uno"], ["viaje", "", "trip"], ["especial", "", "special"], [":", "", ""], ["Tomás", "", "Tomás", "tomás"], ["cumplía", "", "was turning", "cumplir"], ["sesenta", "", "sixty"], ["años", "", "years", "año"], ["y", "", "and"], ["quería", "", "wanted", "querer"], ["ver", "", "to see"], ["un", "", "a", "uno"], ["glaciar", "", "glacier"], ["de", "", "(for)"], ["verdad", "", "real"], [".", "", ""]],
        en: "It was a special trip: Tomás was turning sixty and wanted to see a real glacier.",
      },
      {
        t: [["Volaron", "", "they flew", "volar"], ["de", "", "from"], ["Buenos", "", "Buenos"], ["Aires", "", "Aires"], ["a", "", "to"], ["El", "", "El"], ["Calafate", "", "Calafate"], [",", "", ""], ["un", "", "a", "uno"], ["pueblo", "", "town"], ["pequeño", "", "small"], ["al", "", "next", "a"], ["lado", "", "to"], ["de", "", "(of)"], ["un", "", "a", "uno"], ["lago", "", "lake"], ["enorme", "", "huge"], [".", "", ""]],
        en: "They flew from Buenos Aires to El Calafate, a small town next to a huge lake.",
      },
      {
        t: [["Cuando", "", "when", "cuando"], ["bajaron", "", "they got off", "bajar"], ["del", "", "the", "de"], ["avión", "", "plane"], [",", "", ""], ["el", "", "the"], ["viento", "", "wind"], ["casi", "", "almost"], ["se", "", "(away)"], ["llevó", "", "carried away", "llevarse"], ["el", "", "the"], ["sombrero", "", "hat"], ["de", "", "of"], ["Tomás", "", "Tomás"], [".", "", ""]],
        en: "When they got off the plane, the wind almost carried away Tomás's hat.",
      },
      {
        t: [["—", "", ""], ["¡", "", ""], ["Aquí", "", "here", "aquí"], ["el", "", "the"], ["viento", "", "wind"], ["es", "", "is", "ser"], ["más", "", "more"], ["fuerte", "", "strong"], ["que", "", "than"], ["en", "", "at"], ["casa", "", "home"], ["!", "", ""], ["—", "", ""], ["dijo", "", "said", "decir"], ["él", "", "he"], [",", "", ""], ["y", "", "and"], ["se", "", "(himself)"], ["rio", "", "laughed", "reír"], [".", "", ""]],
        en: "\"The wind here is stronger than at home!\" he said, and laughed.",
      },
      {
        t: [["El", "", "the", "el"], ["primer", "", "first", "primero"], ["día", "", "day"], [",", "", ""], ["alquilaron", "", "they rented", "alquilar"], ["bicicletas", "", "bikes", "bicicleta"], ["y", "", "and"], ["pasearon", "", "rode around", "pasear"], ["por", "", "along"], ["la", "", "the", "el"], ["orilla", "", "shore"], ["del", "", "of the", "de"], ["lago", "", "lake"], [".", "", ""]],
        en: "On the first day, they rented bikes and rode along the shore of the lake.",
      },
      {
        t: [["Vieron", "", "they saw", "ver"], ["flamencos", "", "flamingos", "flamenco"], ["rosas", "", "pink", "rosa"], ["en", "", "in"], ["el", "", "the"], ["agua", "", "water"], ["y", "", "and"], ["montañas", "", "mountains", "montaña"], ["blancas", "", "white", "blanco"], ["a", "", "in"], ["lo", "", "the"], ["lejos", "", "distance"], [".", "", ""]],
        en: "They saw pink flamingos in the water and white mountains in the distance.",
      },
      {
        t: [["Por", "", "in", "por"], ["la", "", "the", "el"], ["noche", "", "evening"], [",", "", ""], ["cenaron", "", "they had dinner", "cenar"], ["cordero", "", "lamb"], ["en", "", "in"], ["un", "", "a", "uno"], ["restaurante", "", "restaurant"], ["pequeño", "", "small"], ["y", "", "and"], ["hablaron", "", "talked", "hablar"], ["con", "", "with"], ["el", "", "the"], ["dueño", "", "owner"], [",", "", ""], ["un", "", "a", "uno"], ["hombre", "", "man"], ["muy", "", "very"], ["simpático", "", "friendly"], [".", "", ""]],
        en: "In the evening, they had lamb for dinner in a small restaurant and talked with the owner, a very friendly man.",
      },
      {
        t: [["El", "", "the", "el"], ["dueño", "", "owner"], ["les", "", "them"], ["dio", "", "gave", "dar"], ["un", "", "a", "uno"], ["consejo", "", "piece of advice"], [":", "", ""], ["—", "", ""], ["Mañana", "", "tomorrow", "mañana"], ["tienen", "", "you have", "tener"], ["que", "", "(to)"], ["salir", "", "to leave"], ["temprano", "", "early"], [",", "", ""], ["porque", "", "because"], ["el", "", "the"], ["autobús", "", "bus"], ["al", "", "to the", "a"], ["glaciar", "", "glacier"], ["se", "", "(itself)"], ["llena", "", "fills up", "llenarse"], ["rápido", "", "quickly"], [".", "", ""]],
        en: "The owner gave them some advice: \"Tomorrow you have to leave early, because the bus to the glacier fills up quickly.\"",
      },
      {
        t: [["Pero", "", "but", "pero"], ["a", "", "on"], ["la", "", "the", "el"], ["mañana", "", "morning"], ["siguiente", "", "next"], [",", "", ""], ["Lucía", "", "Lucía"], ["no", "", "not"], ["oyó", "", "heard", "oír"], ["el", "", "the"], ["despertador", "", "alarm clock"], [".", "", ""]],
        en: "But the next morning, Lucía didn't hear the alarm clock.",
      },
      {
        t: [["Se", "", "(themselves)", "se"], ["levantaron", "", "they got up", "levantarse"], ["tarde", "", "late"], [",", "", ""], ["corrieron", "", "ran", "correr"], ["a", "", "to"], ["la", "", "the", "el"], ["estación", "", "station"], ["y", "", "and"], ["llegaron", "", "arrived", "llegar"], ["justo", "", "just"], ["cuando", "", "when"], ["el", "", "the"], ["autobús", "", "bus"], ["salía", "", "was leaving", "salir"], [".", "", ""]],
        en: "They got up late, ran to the station and arrived just as the bus was leaving.",
      },
      {
        t: [["Tomás", "", "Tomás", "tomás"], ["levantó", "", "raised", "levantar"], ["los", "", "his", "el"], ["brazos", "", "arms", "brazo"], ["y", "", "and"], ["el", "", "the"], ["conductor", "", "driver"], ["paró", "", "stopped", "parar"], [".", "", ""]],
        en: "Tomás raised his arms and the driver stopped.",
      },
      {
        t: [["—", "", ""], ["¡", "", ""], ["Gracias", "", "thank you", "gracias"], ["!", "", ""], ["—", "", ""], ["gritó", "", "shouted", "gritar"], ["Lucía", "", "Lucía"], [",", "", ""], ["sin", "", "out of"], ["aire", "", "breath"], [".", "", ""]],
        en: "\"Thank you!\" shouted Lucía, out of breath.",
      },
      {
        t: [["El", "", "the", "el"], ["viaje", "", "journey"], ["duró", "", "lasted", "durar"], ["casi", "", "almost"], ["dos", "", "two"], ["horas", "", "hours", "hora"], [".", "", ""]],
        en: "The journey took almost two hours.",
      },
      {
        t: [["Al", "", "at the", "a"], ["final", "", "end"], ["del", "", "of the", "de"], ["camino", "", "road"], [",", "", ""], ["apareció", "", "appeared", "aparecer"], ["el", "", "the"], ["glaciar", "", "glacier"], ["Perito", "", "Perito"], ["Moreno", "", "Moreno"], [":", "", ""], ["una", "", "a", "uno"], ["pared", "", "wall"], ["de", "", "of"], ["hielo", "", "ice"], ["azul", "", "blue"], ["y", "", "and"], ["blanco", "", "white"], [",", "", ""], ["más", "", "more"], ["alta", "", "tall", "alto"], ["que", "", "than"], ["un", "", "a", "uno"], ["edificio", "", "building"], ["de", "", "with"], ["veinte", "", "twenty"], ["pisos", "", "floors", "piso"], [".", "", ""]],
        en: "At the end of the road the Perito Moreno glacier appeared: a wall of blue and white ice, taller than a twenty-storey building.",
      },
      {
        t: [["Caminaron", "", "they walked", "caminar"], ["por", "", "along"], ["unas", "", "some", "uno"], ["pasarelas", "", "walkways", "pasarela"], ["de", "", "of"], ["madera", "", "wood"], ["y", "", "and"], ["se", "", "(themselves)"], ["sentaron", "", "sat down", "sentarse"], ["a", "", "to"], ["mirar", "", "watch"], [".", "", ""]],
        en: "They walked along some wooden walkways and sat down to watch.",
      },
      {
        t: [["Durante", "", "for", "durante"], ["mucho", "", "a long"], ["tiempo", "", "time"], [",", "", ""], ["no", "", "nothing"], ["pasó", "", "happened", "pasar"], ["nada", "", "(nothing)"], [".", "", ""]],
        en: "For a long time, nothing happened.",
      },
      {
        t: [["Hacía", "", "it was", "hacer"], ["frío", "", "cold"], ["y", "", "and"], ["Lucía", "", "Lucía"], ["empezó", "", "began", "empezar"], ["a", "", "to"], ["pensar", "", "think"], ["en", "", "about"], ["un", "", "a", "uno"], ["chocolate", "", "chocolate"], ["caliente", "", "hot"], [".", "", ""]],
        en: "It was cold, and Lucía began to think about a hot chocolate.",
      },
      {
        t: [["De", "", "suddenly", "de"], ["repente", "", "(suddenly)"], [",", "", ""], ["oyeron", "", "they heard", "oír"], ["un", "", "a", "uno"], ["ruido", "", "noise"], ["muy", "", "very"], ["fuerte", "", "loud"], [",", "", ""], ["como", "", "like"], ["un", "", "a", "uno"], ["trueno", "", "thunderclap"], [".", "", ""]],
        en: "Suddenly, they heard a very loud noise, like thunder.",
      },
      {
        t: [["Un", "", "a", "uno"], ["trozo", "", "piece"], ["enorme", "", "huge"], ["de", "", "of"], ["hielo", "", "ice"], ["cayó", "", "fell", "caer"], ["al", "", "into the", "a"], ["lago", "", "lake"], ["y", "", "and"], ["el", "", "the"], ["agua", "", "water"], ["saltó", "", "shot up", "saltar"], ["por", "", "into"], ["el", "", "the"], ["aire", "", "air"], [".", "", ""]],
        en: "A huge piece of ice fell into the lake and the water shot up into the air.",
      },
      {
        t: [["Toda", "", "all", "todo"], ["la", "", "the", "el"], ["gente", "", "people"], ["gritó", "", "shouted", "gritar"], ["al", "", "at the", "a"], ["mismo", "", "same"], ["tiempo", "", "time"], [".", "", ""]],
        en: "Everyone shouted at the same time.",
      },
      {
        t: [["En", "", "at", "en"], ["ese", "", "that"], ["momento", "", "moment"], [",", "", ""], ["el", "", "the"], ["viento", "", "wind"], ["sopló", "", "blew", "soplar"], ["otra", "", "again", "otro"], ["vez", "", "(again)"], ["y", "", "and"], ["el", "", "the"], ["sombrero", "", "hat"], ["de", "", "of"], ["Tomás", "", "Tomás"], ["voló", "", "flew", "volar"], ["hacia", "", "towards"], ["el", "", "the"], ["lago", "", "lake"], [".", "", ""]],
        en: "At that moment the wind blew again, and Tomás's hat flew towards the lake.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["Tomás", "", "Tomás"], ["no", "", "not"], ["miró", "", "looked at", "mirar"], ["el", "", "the"], ["sombrero", "", "hat"], [";", "", ""], ["tenía", "", "he had", "tener"], ["lágrimas", "", "tears", "lágrima"], ["en", "", "in"], ["los", "", "his", "el"], ["ojos", "", "eyes", "ojo"], [".", "", ""]],
        en: "But Tomás didn't look at the hat; he had tears in his eyes.",
      },
      {
        t: [["—", "", ""], ["Es", "", "it is", "ser"], ["el", "", "the"], ["mejor", "", "best"], ["regalo", "", "present"], ["de", "", "of"], ["mi", "", "my"], ["vida", "", "life"], ["—", "", ""], ["dijo", "", "he said", "decir"], ["por", "", "at"], ["fin", "", "last"], [".", "", ""]],
        en: "\"It's the best present of my life,\" he said at last.",
      },
      {
        t: [["Lucía", "", "Lucía", "lucía"], ["sonrió", "", "smiled", "sonreír"], ["y", "", "and"], ["le", "", "him"], ["dio", "", "gave", "dar"], ["su", "", "her"], ["gorro", "", "woolly hat"], [".", "", ""]],
        en: "Lucía smiled and gave him her woolly hat.",
      },
    ],
    q: [
      { q: "Why was the trip special for Tomás?", o: ["It was his first time on a plane", "He was turning sixty", "He wanted to visit his brother"], a: 1 },
      { q: "What did they see on the first day?", o: ["Penguins on the beach", "Pink flamingos and white mountains", "A big festival in the town"], a: 1 },
      { q: "Why did they almost miss the bus?", o: ["The owner gave them the wrong time", "Lucía didn't hear the alarm clock", "Tomás lost his ticket"], a: 1 },
      { q: "What was the glacier like?", o: ["Small and grey", "A wall of blue and white ice", "Far away behind the mountains"], a: 1 },
      { q: "What happened to Tomás's hat in the end?", o: ["Lucía caught it", "The wind blew it towards the lake", "He gave it to the driver"], a: 1 },
    ],
  },
  {
    id: "es-2-language-exchange",
    lv: 2,
    kind: "story",
    title: "El intercambio de idiomas",
    titleEn: "The language exchange",
    s: [
      {
        t: [["Kenji", "", "Kenji"], ["es", "", "is", "ser"], ["japonés", "", "Japanese"], ["y", "", "and"], ["estudia", "", "has been studying", "estudiar"], ["arquitectura", "", "architecture"], ["en", "", "in"], ["Madrid", "", "Madrid"], ["desde", "", "for"], ["hace", "", "(ago)", "hacer"], ["tres", "", "three"], ["meses", "", "months", "mes"], [".", "", ""]],
        en: "Kenji is Japanese and has been studying architecture in Madrid for three months.",
      },
      {
        t: [["Entiende", "", "he understands", "entender"], ["bastante", "", "quite a lot of"], ["español", "", "Spanish"], [",", "", ""], ["pero", "", "but"], ["cuando", "", "when"], ["tiene", "", "he has", "tener"], ["que", "", "(to)"], ["hablar", "", "speak"], [",", "", ""], ["se", "", "(himself)"], ["pone", "", "gets", "ponerse"], ["nervioso", "", "nervous"], [".", "", ""]],
        en: "He understands quite a lot of Spanish, but when he has to speak, he gets nervous.",
      },
      {
        t: [["Un", "", "one", "uno"], ["día", "", "day"], ["vio", "", "he saw", "ver"], ["un", "", "a", "uno"], ["anuncio", "", "notice"], ["en", "", "at"], ["la", "", "the", "el"], ["universidad", "", "university"], [":", "", ""], ["«", "", ""], ["Busco", "", "I'm looking for", "buscar"], ["compañero", "", "partner"], ["para", "", "for"], ["intercambio", "", "exchange"], ["de", "", "of"], ["idiomas", "", "languages", "idioma"], [".", "", ""], ["Hablo", "", "I speak", "hablar"], ["español", "", "Spanish"], [",", "", ""], ["quiero", "", "I want", "querer"], ["aprender", "", "to learn"], ["japonés", "", "Japanese"], [".", "", ""], ["Carmen", "", "Carmen"], ["»", "", ""], [".", "", ""]],
        en: "One day he saw a notice at the university: \"Looking for a language exchange partner. I speak Spanish and want to learn Japanese. Carmen.\"",
      },
      {
        t: [["Kenji", "", "Kenji", "kenji"], ["escribió", "", "wrote", "escribir"], ["un", "", "a", "uno"], ["mensaje", "", "message"], ["esa", "", "that", "ese"], ["misma", "", "same", "mismo"], ["tarde", "", "afternoon"], [".", "", ""]],
        en: "Kenji wrote a message that same afternoon.",
      },
      {
        t: [["Quedaron", "", "they arranged to meet", "quedar"], ["el", "", "on"], ["jueves", "", "Thursday"], ["en", "", "in"], ["una", "", "a", "uno"], ["cafetería", "", "café"], ["cerca", "", "near"], ["de", "", "(near)"], ["la", "", "the", "el"], ["Plaza", "", "Plaza"], ["Mayor", "", "Mayor"], [".", "", ""]],
        en: "They arranged to meet on Thursday in a café near the Plaza Mayor.",
      },
      {
        t: [["Kenji", "", "Kenji", "kenji"], ["esperaba", "", "was expecting", "esperar"], ["a", "", "(personal a)"], ["una", "", "a", "uno"], ["estudiante", "", "student"], ["joven", "", "young"], [",", "", ""], ["pero", "", "but"], ["Carmen", "", "Carmen"], ["tenía", "", "was", "tener"], ["setenta", "", "seventy"], ["y", "", "and"], ["dos", "", "two"], ["años", "", "years old", "año"], [",", "", ""], ["el", "", "(her)"], ["pelo", "", "hair"], ["blanco", "", "white"], ["y", "", "and"], ["una", "", "a", "uno"], ["sonrisa", "", "smile"], ["enorme", "", "huge"], [".", "", ""]],
        en: "Kenji was expecting a young student, but Carmen was seventy-two, with white hair and a huge smile.",
      },
      {
        t: [["—", "", ""], ["Mi", "", "my", "mi"], ["nieto", "", "grandson"], ["vive", "", "lives", "vivir"], ["en", "", "in"], ["Osaka", "", "Osaka"], ["—", "", ""], ["explicó", "", "explained", "explicar"], ["ella", "", "she"], ["—", "", ""], [".", "", ""], ["En", "", "in", "en"], ["mayo", "", "May"], ["voy", "", "I'm going", "ir"], ["a", "", "to"], ["visitarlo", "", "visit him", "visitar"], ["y", "", "and"], ["quiero", "", "I want", "querer"], ["hablar", "", "to talk"], ["con", "", "with"], ["su", "", "his"], ["familia", "", "family"], [".", "", ""]],
        en: "\"My grandson lives in Osaka,\" she explained. \"In May I'm going to visit him, and I want to talk with his family.\"",
      },
      {
        t: [["Decidieron", "", "they decided on", "decidir"], ["un", "", "a", "uno"], ["plan", "", "plan"], [":", "", ""], ["media", "", "half", "medio"], ["hora", "", "hour"], ["en", "", "in"], ["español", "", "Spanish"], ["y", "", "and"], ["media", "", "half", "medio"], ["hora", "", "hour"], ["en", "", "in"], ["japonés", "", "Japanese"], [".", "", ""]],
        en: "They decided on a plan: half an hour in Spanish and half an hour in Japanese.",
      },
      {
        t: [["Se", "", "(each other)", "se"], ["veían", "", "they met", "verse"], ["todos", "", "every", "todo"], ["los", "", "the", "el"], ["jueves", "", "Thursday"], ["a", "", "at"], ["las", "", "(o'clock)", "el"], ["seis", "", "six"], [",", "", ""], ["siempre", "", "always"], ["en", "", "at"], ["la", "", "the", "el"], ["misma", "", "same", "mismo"], ["mesa", "", "table"], [".", "", ""]],
        en: "They met every Thursday at six, always at the same table.",
      },
      {
        t: [["Al", "", "at the", "a"], ["principio", "", "beginning"], [",", "", ""], ["Kenji", "", "Kenji"], ["hablaba", "", "spoke", "hablar"], ["muy", "", "very"], ["poco", "", "little"], [".", "", ""]],
        en: "At first, Kenji spoke very little.",
      },
      {
        t: [["Carmen", "", "Carmen", "carmen"], ["le", "", "him"], ["hacía", "", "asked", "hacer"], ["preguntas", "", "questions", "pregunta"], ["fáciles", "", "easy", "fácil"], [":", "", ""], ["qué", "", "what"], ["comía", "", "he ate", "comer"], [",", "", ""], ["dónde", "", "where"], ["vivía", "", "he lived", "vivir"], [",", "", ""], ["qué", "", "what"], ["le", "", "(to him)"], ["gustaba", "", "he liked", "gustar"], ["de", "", "about"], ["Madrid", "", "Madrid"], [".", "", ""]],
        en: "Carmen asked him easy questions: what he ate, where he lived, what he liked about Madrid.",
      },
      {
        t: [["Poco", "", "little", "poco"], ["a", "", "by"], ["poco", "", "little"], [",", "", ""], ["él", "", "he"], ["empezó", "", "started", "empezar"], ["a", "", "to"], ["hablar", "", "talk"], ["más", "", "more"], [".", "", ""]],
        en: "Little by little, he started to talk more.",
      },
      {
        t: [["Una", "", "one", "uno"], ["tarde", "", "afternoon"], [",", "", ""], ["Kenji", "", "Kenji"], ["llegó", "", "arrived", "llegar"], ["tarde", "", "late"], ["y", "", "and"], ["con", "", "with"], ["la", "", "his", "el"], ["cara", "", "face"], ["roja", "", "red", "rojo"], [".", "", ""]],
        en: "One afternoon, Kenji arrived late and red in the face.",
      },
      {
        t: [["—", "", ""], ["Lo", "", "(it)", "lo"], ["siento", "", "I'm sorry", "sentir"], ["mucho", "", "very"], [",", "", ""], ["Carmen", "", "Carmen"], [".", "", ""], ["Estoy", "", "I am", "estar"], ["muy", "", "very"], ["embarazado", "", "pregnant"], [".", "", ""]],
        en: "\"I'm so sorry, Carmen. I'm very pregnant.\"",
      },
      {
        t: [["Carmen", "", "Carmen", "carmen"], ["se", "", "(herself)"], ["rio", "", "laughed", "reír"], ["tanto", "", "so much"], ["que", "", "that"], ["el", "", "the"], ["camarero", "", "waiter"], ["vino", "", "came", "venir"], ["a", "", "to"], ["preguntar", "", "ask"], ["si", "", "if"], ["estaba", "", "she was", "estar"], ["bien", "", "all right"], [".", "", ""]],
        en: "Carmen laughed so much that the waiter came over to ask if she was all right.",
      },
      {
        t: [["—", "", ""], ["Kenji", "", "Kenji", "kenji"], [",", "", ""], ["«", "", ""], ["embarazado", "", "pregnant"], ["»", "", ""], ["significa", "", "means", "significar"], ["que", "", "that"], ["vas", "", "you're going", "ir"], ["a", "", "to"], ["tener", "", "have"], ["un", "", "a", "uno"], ["bebé", "", "baby"], ["—", "", ""], ["le", "", "(to him)"], ["dijo", "", "said", "decir"], ["ella", "", "she"], ["—", "", ""], [".", "", ""], ["Tú", "", "you", "tú"], ["quieres", "", "you want", "querer"], ["decir", "", "to say"], ["«", "", ""], ["avergonzado", "", "embarrassed"], ["»", "", ""], [".", "", ""]],
        en: "\"Kenji, 'embarazado' means you're going to have a baby,\" she told him. \"You mean 'avergonzado'.\"",
      },
      {
        t: [["Kenji", "", "Kenji", "kenji"], ["se", "", "(himself)"], ["puso", "", "went", "ponerse"], ["todavía", "", "even"], ["más", "", "more"], ["rojo", "", "red"], [",", "", ""], ["pero", "", "but"], ["después", "", "then"], ["también", "", "too"], ["se", "", "(himself)"], ["rio", "", "laughed", "reír"], [".", "", ""]],
        en: "Kenji went even redder, but then he laughed too.",
      },
      {
        t: [["Desde", "", "from", "desde"], ["ese", "", "that"], ["día", "", "day"], [",", "", ""], ["nunca", "", "never"], ["olvidó", "", "he forgot", "olvidar"], ["la", "", "the", "el"], ["palabra", "", "word"], [".", "", ""]],
        en: "From that day on, he never forgot the word.",
      },
      {
        t: [["Y", "", "and", "y"], ["Carmen", "", "Carmen"], ["la", "", "it"], ["repetía", "", "repeated", "repetir"], ["con", "", "with"], ["una", "", "a", "uno"], ["sonrisa", "", "smile"], ["cada", "", "every"], ["vez", "", "time"], ["que", "", "that"], ["él", "", "he"], ["llegaba", "", "arrived", "llegar"], ["tarde", "", "late"], [".", "", ""]],
        en: "And Carmen repeated it with a smile every time he arrived late.",
      },
      {
        t: [["Carmen", "", "Carmen", "carmen"], ["también", "", "also"], ["tenía", "", "had", "tener"], ["problemas", "", "problems", "problema"], [".", "", ""]],
        en: "Carmen had problems too.",
      },
      {
        t: [["El", "", "the", "el"], ["japonés", "", "Japanese"], ["le", "", "to her"], ["parecía", "", "seemed", "parecer"], ["muy", "", "very"], ["difícil", "", "difficult"], [",", "", ""], ["sobre", "", "above"], ["todo", "", "all"], ["la", "", "the", "el"], ["escritura", "", "writing"], [".", "", ""]],
        en: "Japanese seemed very difficult to her, above all the writing.",
      },
      {
        t: [["Cada", "", "every", "cada"], ["semana", "", "week"], [",", "", ""], ["Kenji", "", "Kenji"], ["le", "", "her"], ["enseñaba", "", "taught", "enseñar"], ["diez", "", "ten"], ["caracteres", "", "characters", "carácter"], ["nuevos", "", "new", "nuevo"], [",", "", ""], ["y", "", "and"], ["cada", "", "every"], ["semana", "", "week"], ["ella", "", "she"], ["olvidaba", "", "forgot", "olvidar"], ["cinco", "", "five"], [".", "", ""]],
        en: "Every week Kenji taught her ten new characters, and every week she forgot five.",
      },
      {
        t: [["—", "", ""], ["Soy", "", "I am", "ser"], ["demasiado", "", "too"], ["mayor", "", "old"], ["para", "", "for"], ["esto", "", "this"], ["—", "", ""], ["decía", "", "she would say", "decir"], ["a", "", "at"], ["veces", "", "times", "vez"], [".", "", ""]],
        en: "\"I'm too old for this,\" she would sometimes say.",
      },
      {
        t: [["—", "", ""], ["No", "", "not", "no"], ["es", "", "it is", "ser"], ["verdad", "", "true"], ["—", "", ""], ["respondía", "", "replied", "responder"], ["Kenji", "", "Kenji"], ["—", "", ""], [".", "", ""], ["Usted", "", "you", "usted"], ["aprende", "", "learn", "aprender"], ["más", "", "more"], ["rápido", "", "quickly"], ["que", "", "than"], ["yo", "", "I"], [".", "", ""]],
        en: "\"That's not true,\" Kenji would reply. \"You learn faster than I do.\"",
      },
      {
        t: [["En", "", "in", "en"], ["mayo", "", "May"], [",", "", ""], ["Carmen", "", "Carmen"], ["viajó", "", "travelled", "viajar"], ["a", "", "to"], ["Osaka", "", "Osaka"], [".", "", ""]],
        en: "In May, Carmen travelled to Osaka.",
      },
      {
        t: [["Una", "", "one", "uno"], ["semana", "", "week"], ["después", "", "later"], [",", "", ""], ["Kenji", "", "Kenji"], ["recibió", "", "received", "recibir"], ["una", "", "a", "uno"], ["foto", "", "photo"], [":", "", ""], ["Carmen", "", "Carmen", "carmen"], ["estaba", "", "was", "estar"], ["sentada", "", "sitting", "sentado"], ["a", "", "at"], ["una", "", "a", "uno"], ["mesa", "", "table"], ["con", "", "with"], ["la", "", "the", "el"], ["familia", "", "family"], ["de", "", "of"], ["su", "", "her"], ["nieto", "", "grandson"], [",", "", ""], ["y", "", "and"], ["todos", "", "everyone", "todo"], ["sonreían", "", "were smiling", "sonreír"], [".", "", ""]],
        en: "A week later, Kenji received a photo: Carmen was sitting at a table with her grandson's family, and everyone was smiling.",
      },
      {
        t: [["Debajo", "", "below", "debajo"], ["de", "", "(below)"], ["la", "", "the", "el"], ["foto", "", "photo"], ["había", "", "there was", "haber"], ["un", "", "a", "uno"], ["mensaje", "", "message"], ["en", "", "in"], ["japonés", "", "Japanese"], [",", "", ""], ["con", "", "with"], ["tres", "", "three"], ["errores", "", "mistakes", "error"], [".", "", ""]],
        en: "Below the photo there was a message in Japanese, with three mistakes.",
      },
      {
        t: [["Kenji", "", "Kenji", "kenji"], ["lo", "", "it"], ["leyó", "", "read", "leer"], ["cinco", "", "five"], ["veces", "", "times", "vez"], ["y", "", "and"], ["no", "", "not"], ["corrigió", "", "corrected", "corregir"], ["ninguno", "", "any"], [".", "", ""]],
        en: "Kenji read it five times and didn't correct a single one.",
      },
    ],
    q: [
      { q: "What does Kenji study in Madrid?", o: ["Spanish literature", "Architecture", "Medicine"], a: 1 },
      { q: "Why does Carmen want to learn Japanese?", o: ["She wants to work in Japan", "She is going to visit her grandson in Osaka", "She teaches at the university"], a: 1 },
      { q: "What surprised Kenji when he met Carmen?", o: ["She spoke perfect Japanese", "She was seventy-two years old", "She arrived very late"], a: 1 },
      { q: "What did Kenji want to say when he said 'embarazado'?", o: ["Tired", "Embarrassed", "Pregnant"], a: 1 },
      { q: "What did Carmen find most difficult?", o: ["Speaking", "Listening", "Writing"], a: 2 },
      { q: "What did Kenji do with Carmen's message?", o: ["He corrected the three mistakes", "He read it five times and corrected nothing", "He sent it back to her"], a: 1 },
    ],
  },
  {
    id: "es-2-chocolate-history",
    lv: 2,
    kind: "article",
    title: "La historia del chocolate",
    titleEn: "The history of chocolate",
    s: [
      {
        t: [["Hoy", "", "today", "hoy"], ["el", "", "the"], ["chocolate", "", "chocolate"], ["está", "", "is", "estar"], ["en", "", "everywhere"], ["todas", "", "(everywhere)", "todo"], ["partes", "", "(everywhere)", "parte"], [":", "", ""], ["en", "", "in"], ["los", "", "the", "el"], ["supermercados", "", "supermarkets", "supermercado"], [",", "", ""], ["en", "", "in"], ["las", "", "the", "el"], ["cafeterías", "", "cafés", "cafetería"], ["y", "", "and"], ["en", "", "at"], ["casi", "", "almost"], ["todas", "", "all", "todo"], ["las", "", "the", "el"], ["fiestas", "", "parties", "fiesta"], ["de", "", "(birthday)"], ["cumpleaños", "", "birthday"], [".", "", ""]],
        en: "Today chocolate is everywhere: in supermarkets, in cafés and at almost every birthday party.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["durante", "", "for"], ["miles", "", "thousands", "mil"], ["de", "", "of"], ["años", "", "years", "año"], [",", "", ""], ["el", "", "the"], ["chocolate", "", "chocolate"], ["fue", "", "was", "ser"], ["algo", "", "something"], ["muy", "", "very"], ["diferente", "", "different"], [".", "", ""]],
        en: "But for thousands of years, chocolate was something very different.",
      },
      {
        t: [["El", "", "the", "el"], ["chocolate", "", "chocolate"], ["viene", "", "comes", "venir"], ["del", "", "from the", "de"], ["cacao", "", "cacao"], [",", "", ""], ["un", "", "a", "uno"], ["árbol", "", "tree"], ["que", "", "that"], ["crece", "", "grows", "crecer"], ["en", "", "in"], ["lugares", "", "places", "lugar"], ["cálidos", "", "warm", "cálido"], ["y", "", "and"], ["húmedos", "", "humid", "húmedo"], ["de", "", "of"], ["América", "", "America"], [".", "", ""]],
        en: "Chocolate comes from cacao, a tree that grows in warm, humid places in the Americas.",
      },
      {
        t: [["Los", "", "the", "el"], ["mayas", "", "Maya", "maya"], ["y", "", "and"], ["los", "", "the", "el"], ["aztecas", "", "Aztecs", "azteca"], [",", "", ""], ["en", "", "in"], ["lo", "", "what"], ["que", "", "(what)"], ["hoy", "", "today"], ["es", "", "is", "ser"], ["México", "", "Mexico"], ["y", "", "and"], ["Centroamérica", "", "Central America"], [",", "", ""], ["ya", "", "already"], ["bebían", "", "drank", "beber"], ["cacao", "", "cacao"], ["hace", "", "ago", "hacer"], ["más", "", "more"], ["de", "", "than"], ["tres", "", "three"], ["mil", "", "thousand"], ["años", "", "years", "año"], [".", "", ""]],
        en: "The Maya and the Aztecs, in what is now Mexico and Central America, were already drinking cacao more than three thousand years ago.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["no", "", "not"], ["era", "", "it was", "ser"], ["dulce", "", "sweet"], [".", "", ""]],
        en: "But it wasn't sweet.",
      },
      {
        t: [["Era", "", "it was", "ser"], ["una", "", "a", "uno"], ["bebida", "", "drink"], ["amarga", "", "bitter", "amargo"], ["y", "", "and"], ["fría", "", "cold", "frío"], [",", "", ""], ["con", "", "with"], ["agua", "", "water"], [",", "", ""], ["maíz", "", "maize"], ["y", "", "and"], ["a", "", "sometimes"], ["veces", "", "(sometimes)", "vez"], ["chile", "", "chilli"], [".", "", ""]],
        en: "It was a bitter, cold drink, made with water, maize and sometimes chilli.",
      },
      {
        t: [["Para", "", "for", "para"], ["ellos", "", "them", "él"], [",", "", ""], ["el", "", "the"], ["cacao", "", "cacao"], ["era", "", "was", "ser"], ["muy", "", "very"], ["valioso", "", "valuable"], [".", "", ""]],
        en: "For them, cacao was very valuable.",
      },
      {
        t: [["Lo", "", "it", "lo"], ["usaban", "", "they used", "usar"], ["en", "", "in"], ["ceremonias", "", "ceremonies", "ceremonia"], ["importantes", "", "important", "importante"], ["y", "", "and"], ["también", "", "also"], ["como", "", "as"], ["dinero", "", "money"], [":", "", ""], ["con", "", "with"], ["cien", "", "a hundred", "ciento"], ["semillas", "", "seeds", "semilla"], [",", "", ""], ["por", "", "for"], ["ejemplo", "", "example"], [",", "", ""], ["se", "", "(one)"], ["podía", "", "could", "poder"], ["comprar", "", "buy"], ["un", "", "a", "uno"], ["pavo", "", "turkey"], [".", "", ""]],
        en: "They used it in important ceremonies and also as money: with a hundred seeds, for example, you could buy a turkey.",
      },
      {
        t: [["En", "", "in", "en"], ["el", "", "the"], ["siglo", "", "century"], ["XVI", "", "16th"], [",", "", ""], ["los", "", "the", "el"], ["españoles", "", "Spaniards", "español"], ["llegaron", "", "arrived", "llegar"], ["a", "", "in"], ["México", "", "Mexico"], ["y", "", "and"], ["conocieron", "", "discovered", "conocer"], ["esta", "", "this", "este"], ["bebida", "", "drink"], [".", "", ""]],
        en: "In the 16th century, the Spaniards arrived in Mexico and discovered this drink.",
      },
      {
        t: [["Al", "", "at the", "a"], ["principio", "", "beginning"], ["no", "", "not"], ["les", "", "them"], ["gustó", "", "they liked", "gustar"], ["nada", "", "at all"], [".", "", ""]],
        en: "At first they didn't like it at all.",
      },
      {
        t: [["Un", "", "one", "uno"], ["viajero", "", "traveller"], ["escribió", "", "wrote", "escribir"], ["que", "", "that"], ["el", "", "the"], ["chocolate", "", "chocolate"], ["parecía", "", "seemed", "parecer"], ["«", "", ""], ["una", "", "a", "uno"], ["bebida", "", "drink"], ["para", "", "for"], ["cerdos", "", "pigs", "cerdo"], ["»", "", ""], [".", "", ""]],
        en: "One traveller wrote that chocolate seemed like \"a drink for pigs\".",
      },
      {
        t: [["Sin", "", "however", "sin"], ["embargo", "", "(however)"], [",", "", ""], ["poco", "", "little"], ["a", "", "by"], ["poco", "", "little"], ["cambiaron", "", "they changed", "cambiar"], ["la", "", "the", "el"], ["receta", "", "recipe"], [":", "", ""], ["añadieron", "", "they added", "añadir"], ["azúcar", "", "sugar"], [",", "", ""], ["canela", "", "cinnamon"], ["y", "", "and"], ["leche", "", "milk"], [",", "", ""], ["y", "", "and"], ["la", "", "it"], ["tomaron", "", "drank", "tomar"], ["caliente", "", "hot"], [".", "", ""]],
        en: "However, little by little they changed the recipe: they added sugar, cinnamon and milk, and drank it hot.",
      },
      {
        t: [["Con", "", "with", "con"], ["estos", "", "these", "este"], ["cambios", "", "changes", "cambio"], [",", "", ""], ["el", "", "the"], ["chocolate", "", "chocolate"], ["se", "", "(itself)"], ["hizo", "", "became", "hacerse"], ["muy", "", "very"], ["popular", "", "popular"], ["en", "", "in"], ["España", "", "Spain"], [".", "", ""]],
        en: "With these changes, chocolate became very popular in Spain.",
      },
      {
        t: [["Después", "", "then", "después"], ["llegó", "", "it reached", "llegar"], ["a", "", "to"], ["Francia", "", "France"], [",", "", ""], ["a", "", "to"], ["Italia", "", "Italy"], ["y", "", "and"], ["al", "", "to the", "a"], ["resto", "", "rest"], ["de", "", "of"], ["Europa", "", "Europe"], [".", "", ""]],
        en: "Then it reached France, Italy and the rest of Europe.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["durante", "", "for"], ["mucho", "", "a long"], ["tiempo", "", "time"], [",", "", ""], ["solo", "", "only"], ["los", "", "the", "el"], ["ricos", "", "rich", "rico"], ["podían", "", "could", "poder"], ["tomarlo", "", "drink it", "tomar"], [",", "", ""], ["porque", "", "because"], ["era", "", "it was", "ser"], ["muy", "", "very"], ["caro", "", "expensive"], [".", "", ""]],
        en: "But for a long time, only the rich could drink it, because it was very expensive.",
      },
      {
        t: [["Todo", "", "everything", "todo"], ["cambió", "", "changed", "cambiar"], ["en", "", "in"], ["el", "", "the"], ["siglo", "", "century"], ["XIX", "", "19th"], [".", "", ""]],
        en: "Everything changed in the 19th century.",
      },
      {
        t: [["Las", "", "the", "el"], ["nuevas", "", "new", "nuevo"], ["máquinas", "", "machines", "máquina"], ["de", "", "of"], ["las", "", "the", "el"], ["fábricas", "", "factories", "fábrica"], ["hicieron", "", "made", "hacer"], ["el", "", "the"], ["chocolate", "", "chocolate"], ["más", "", "cheaper"], ["barato", "", "(cheaper)"], [",", "", ""], ["y", "", "and"], ["en", "", "in"], ["1847", "", "1847"], ["una", "", "an", "uno"], ["empresa", "", "company"], ["inglesa", "", "English", "inglés"], ["vendió", "", "sold", "vender"], ["la", "", "the", "el"], ["primera", "", "first", "primero"], ["tableta", "", "bar"], ["de", "", "of"], ["chocolate", "", "chocolate"], [".", "", ""]],
        en: "The new factory machines made chocolate cheaper, and in 1847 an English company sold the first bar of chocolate.",
      },
      {
        t: [["Unos", "", "a few", "uno"], ["años", "", "years", "año"], ["más", "", "later"], ["tarde", "", "(later)"], [",", "", ""], ["en", "", "in"], ["Suiza", "", "Switzerland"], [",", "", ""], ["inventaron", "", "they invented", "inventar"], ["el", "", "the"], ["chocolate", "", "chocolate"], ["con", "", "with"], ["leche", "", "milk"], [".", "", ""]],
        en: "A few years later, in Switzerland, they invented milk chocolate.",
      },
      {
        t: [["Por", "", "at", "por"], ["fin", "", "last"], [",", "", ""], ["el", "", "the"], ["chocolate", "", "chocolate"], ["era", "", "was", "ser"], ["para", "", "for"], ["todo", "", "the whole"], ["el", "", "the"], ["mundo", "", "world"], [".", "", ""]],
        en: "At last, chocolate was for everyone.",
      },
      {
        t: [["Hoy", "", "today", "hoy"], [",", "", ""], ["la", "", "the", "el"], ["mayor", "", "greater"], ["parte", "", "part"], ["del", "", "of the", "de"], ["cacao", "", "cacao"], ["no", "", "not"], ["viene", "", "comes", "venir"], ["de", "", "from"], ["América", "", "America"], [",", "", ""], ["sino", "", "but"], ["de", "", "from"], ["África", "", "Africa"], ["occidental", "", "West"], [",", "", ""], ["sobre", "", "above"], ["todo", "", "all"], ["de", "", "from"], ["Costa", "", "Côte"], ["de", "", "d'"], ["Marfil", "", "Ivoire"], ["y", "", "and"], ["Ghana", "", "Ghana"], [".", "", ""]],
        en: "Today most cacao doesn't come from the Americas but from West Africa, above all from Côte d'Ivoire and Ghana.",
      },
      {
        t: [["Millones", "", "millions", "millón"], ["de", "", "of"], ["familias", "", "families", "familia"], ["trabajan", "", "work", "trabajar"], ["en", "", "on"], ["pequeñas", "", "small", "pequeño"], ["plantaciones", "", "plantations", "plantación"], [",", "", ""], ["y", "", "and"], ["muchas", "", "many", "mucho"], ["ganan", "", "earn", "ganar"], ["muy", "", "very"], ["poco", "", "little"], ["dinero", "", "money"], [".", "", ""]],
        en: "Millions of families work on small plantations, and many earn very little money.",
      },
      {
        t: [["Además", "", "also", "además"], [",", "", ""], ["el", "", "the"], ["cambio", "", "change"], ["climático", "", "climate"], ["es", "", "is", "ser"], ["un", "", "a", "uno"], ["problema", "", "problem"], ["serio", "", "serious"], ["para", "", "for"], ["los", "", "the", "el"], ["árboles", "", "trees", "árbol"], ["de", "", "of"], ["cacao", "", "cacao"], [",", "", ""], ["que", "", "which"], ["necesitan", "", "need", "necesitar"], ["un", "", "a", "uno"], ["clima", "", "climate"], ["muy", "", "very"], ["especial", "", "special"], [".", "", ""]],
        en: "Climate change is also a serious problem for cacao trees, which need a very special climate.",
      },
      {
        t: [["Por", "", "that's", "por"], ["eso", "", "why"], [",", "", ""], ["algunos", "", "some", "alguno"], ["expertos", "", "experts", "experto"], ["dicen", "", "say", "decir"], ["que", "", "that"], ["el", "", "the"], ["chocolate", "", "chocolate"], ["va", "", "is going", "ir"], ["a", "", "to"], ["ser", "", "be"], ["más", "", "more"], ["caro", "", "expensive"], ["en", "", "in"], ["el", "", "the"], ["futuro", "", "future"], [".", "", ""]],
        en: "That's why some experts say that chocolate is going to be more expensive in the future.",
      },
      {
        t: [["Tal", "", "maybe", "tal"], ["vez", "", "(maybe)"], [",", "", ""], ["un", "", "one", "uno"], ["día", "", "day"], [",", "", ""], ["el", "", "the"], ["chocolate", "", "chocolate"], ["será", "", "will be", "ser"], ["otra", "", "again", "otro"], ["vez", "", "(again)"], ["un", "", "a", "uno"], ["producto", "", "product"], ["de", "", "of"], ["lujo", "", "luxury"], [",", "", ""], ["como", "", "as"], ["en", "", "in"], ["la", "", "the", "el"], ["época", "", "time"], ["de", "", "of"], ["los", "", "the", "el"], ["aztecas", "", "Aztecs", "azteca"], [".", "", ""]],
        en: "Maybe one day chocolate will be a luxury product again, as in the time of the Aztecs.",
      },
      {
        t: [["Cuando", "", "when", "cuando"], ["compras", "", "you buy", "comprar"], ["una", "", "a", "uno"], ["tableta", "", "bar"], ["de", "", "of"], ["chocolate", "", "chocolate"], [",", "", ""], ["compras", "", "you buy", "comprar"], ["también", "", "also"], ["una", "", "a", "uno"], ["historia", "", "story"], ["muy", "", "very"], ["larga", "", "long", "largo"], [",", "", ""], ["de", "", "of"], ["más", "", "more"], ["de", "", "than"], ["tres", "", "three"], ["mil", "", "thousand"], ["años", "", "years", "año"], [".", "", ""]],
        en: "When you buy a bar of chocolate, you are also buying a very long story, more than three thousand years old.",
      },
      {
        t: [["Vale", "", "it's worth", "valer"], ["la", "", "the", "el"], ["pena", "", "(worth it)"], ["comerla", "", "eating it", "comer"], ["despacio", "", "slowly"], [".", "", ""]],
        en: "It's worth eating it slowly.",
      },
    ],
    q: [
      { q: "How did the Maya and Aztecs have their chocolate?", o: ["As a sweet, hot drink", "As a bitter, cold drink", "As small bars"], a: 1 },
      { q: "What else did the Aztecs use cacao for?", o: ["As medicine for children", "As money", "To feed their animals"], a: 1 },
      { q: "What did the Spaniards do to make chocolate popular?", o: ["They added chilli and maize", "They added sugar, cinnamon and milk and drank it hot", "They made it cold and bitter"], a: 1 },
      { q: "What changed in the 19th century?", o: ["Chocolate became a luxury", "Factory machines made chocolate cheaper", "Chocolate arrived in Spain"], a: 1 },
      { q: "Where does most cacao come from today?", o: ["Mexico", "Switzerland", "West Africa"], a: 2 },
      { q: "Why might chocolate be more expensive in the future?", o: ["Fewer people want it", "Climate change is a problem for cacao trees", "The factories are closing"], a: 1 },
    ],
  },
  {
    id: "es-2-year-in-buenos-aires",
    lv: 2,
    kind: "story",
    title: "Un año en Buenos Aires",
    titleEn: "A year in Buenos Aires",
    s: [
      {
        t: [["Hace", "", "ago", "hacer"], ["dos", "", "two"], ["años", "", "years", "año"], [",", "", ""], ["mi", "", "my"], ["empresa", "", "company"], ["me", "", "me"], ["ofreció", "", "offered", "ofrecer"], ["un", "", "a", "uno"], ["trabajo", "", "job"], ["de", "", "for"], ["un", "", "one", "uno"], ["año", "", "year"], ["en", "", "in"], ["Buenos", "", "Buenos"], ["Aires", "", "Aires"], [".", "", ""]],
        en: "Two years ago, my company offered me a one-year job in Buenos Aires.",
      },
      {
        t: [["Yo", "", "I", "yo"], ["tenía", "", "was", "tener"], ["veintiocho", "", "twenty-eight"], ["años", "", "years old", "año"], ["y", "", "and"], ["nunca", "", "never"], ["pasaba", "", "I spent", "pasar"], ["más", "", "more"], ["de", "", "than"], ["dos", "", "two"], ["semanas", "", "weeks", "semana"], ["fuera", "", "away"], ["de", "", "from"], ["Madrid", "", "Madrid"], [".", "", ""]],
        en: "I was twenty-eight and I never spent more than two weeks away from Madrid.",
      },
      {
        t: [["Dije", "", "I said", "decir"], ["que", "", "(that)"], ["sí", "", "yes"], ["en", "", "in"], ["cinco", "", "five"], ["minutos", "", "minutes", "minuto"], ["y", "", "and"], ["después", "", "then"], ["pasé", "", "I spent", "pasar"], ["una", "", "a", "uno"], ["semana", "", "week"], ["entera", "", "whole", "entero"], ["nerviosa", "", "nervous", "nervioso"], [".", "", ""]],
        en: "I said yes in five minutes and then spent a whole week feeling nervous.",
      },
      {
        t: [["Encontré", "", "I found", "encontrar"], ["un", "", "a", "uno"], ["apartamento", "", "flat"], ["pequeño", "", "small"], ["en", "", "in"], ["el", "", "the"], ["barrio", "", "neighbourhood"], ["de", "", "of"], ["San", "", "San"], ["Telmo", "", "Telmo"], [",", "", ""], ["en", "", "in"], ["una", "", "a", "uno"], ["calle", "", "street"], ["antigua", "", "old", "antiguo"], ["con", "", "with"], ["árboles", "", "trees", "árbol"], [".", "", ""]],
        en: "I found a small flat in the San Telmo neighbourhood, on an old street with trees.",
      },
      {
        t: [["Los", "", "the", "el"], ["primeros", "", "first", "primero"], ["días", "", "days", "día"], ["todo", "", "everything"], ["era", "", "was", "ser"], ["diferente", "", "different"], [".", "", ""]],
        en: "In the first few days everything was different.",
      },
      {
        t: [["La", "", "the", "el"], ["gente", "", "people"], ["hablaba", "", "spoke", "hablar"], ["español", "", "Spanish"], [",", "", ""], ["claro", "", "of course"], [",", "", ""], ["pero", "", "but"], ["muchas", "", "many", "mucho"], ["palabras", "", "words", "palabra"], ["eran", "", "were", "ser"], ["nuevas", "", "new", "nuevo"], ["para", "", "for"], ["mí", "", "me"], [".", "", ""]],
        en: "People spoke Spanish, of course, but many words were new to me.",
      },
      {
        t: [["El", "", "the", "el"], ["autobús", "", "bus"], ["se", "", "(itself)"], ["llamaba", "", "was called", "llamarse"], ["«", "", ""], ["colectivo", "", "colectivo"], ["»", "", ""], [",", "", ""], ["y", "", "and"], ["los", "", "the", "el"], ["jóvenes", "", "young people", "joven"], ["decían", "", "said", "decir"], ["«", "", ""], ["che", "", "che (hey)"], ["»", "", ""], ["en", "", "in"], ["cada", "", "every"], ["frase", "", "sentence"], [".", "", ""]],
        en: "The bus was called a \"colectivo\", and young people said \"che\" in every sentence.",
      },
      {
        t: [["Además", "", "also", "además"], [",", "", ""], ["en", "", "in"], ["Buenos", "", "Buenos"], ["Aires", "", "Aires"], ["la", "", "the", "el"], ["gente", "", "people"], ["cena", "", "has dinner", "cenar"], ["muy", "", "very"], ["tarde", "", "late"], [",", "", ""], ["a", "", "at"], ["las", "", "(o'clock)", "el"], ["diez", "", "ten"], ["o", "", "or"], ["a", "", "at"], ["las", "", "(o'clock)", "el"], ["once", "", "eleven"], ["de", "", "at"], ["la", "", "the", "el"], ["noche", "", "night"], [":", "", ""], ["¡", "", ""], ["incluso", "", "even"], ["más", "", "later"], ["tarde", "", "(later)"], ["que", "", "than"], ["en", "", "in"], ["España", "", "Spain"], ["!", "", ""]],
        en: "What's more, in Buenos Aires people have dinner very late, at ten or eleven at night: even later than in Spain!",
      },
      {
        t: [["Pero", "", "but", "pero"], ["mi", "", "my"], ["mayor", "", "biggest"], ["problema", "", "problem"], ["estaba", "", "was", "estar"], ["en", "", "in"], ["el", "", "the"], ["piso", "", "flat"], ["de", "", "(upstairs)"], ["arriba", "", "upstairs"], [".", "", ""]],
        en: "But my biggest problem was in the flat upstairs.",
      },
      {
        t: [["Allí", "", "there", "allí"], ["vivía", "", "lived", "vivir"], ["don", "", "Mr"], ["Héctor", "", "Héctor"], [",", "", ""], ["un", "", "a", "uno"], ["señor", "", "gentleman"], ["de", "", "of"], ["ochenta", "", "eighty"], ["años", "", "years", "año"], ["que", "", "who"], ["tocaba", "", "played", "tocar"], ["el", "", "the"], ["bandoneón", "", "bandoneon"], ["todas", "", "every", "todo"], ["las", "", "the", "el"], ["noches", "", "night", "noche"], [".", "", ""]],
        en: "There lived Don Héctor, an eighty-year-old gentleman who played the bandoneon every night.",
      },
      {
        t: [["El", "", "the", "el"], ["bandoneón", "", "bandoneon"], ["es", "", "is", "ser"], ["un", "", "an", "uno"], ["instrumento", "", "instrument"], ["parecido", "", "similar"], ["al", "", "to the", "a"], ["acordeón", "", "accordion"], [",", "", ""], ["y", "", "and"], ["es", "", "it is", "ser"], ["el", "", "the"], ["alma", "", "soul"], ["del", "", "of", "de"], ["tango", "", "tango"], [".", "", ""]],
        en: "The bandoneon is an instrument similar to the accordion, and it is the soul of tango.",
      },
      {
        t: [["Don", "", "Mr", "don"], ["Héctor", "", "Héctor"], ["tocaba", "", "played", "tocar"], ["muy", "", "very"], ["bien", "", "well"], [",", "", ""], ["pero", "", "but"], ["empezaba", "", "he started", "empezar"], ["a", "", "at"], ["las", "", "(o'clock)", "el"], ["once", "", "eleven"], ["y", "", "and"], ["terminaba", "", "finished", "terminar"], ["a", "", "at"], ["la", "", "(o'clock)", "el"], ["una", "", "one", "uno"], [".", "", ""]],
        en: "Don Héctor played very well, but he started at eleven and finished at one.",
      },
      {
        t: [["Una", "", "one", "uno"], ["noche", "", "night"], [",", "", ""], ["cansada", "", "tired", "cansado"], [",", "", ""], ["subí", "", "I went up", "subir"], ["y", "", "and"], ["llamé", "", "I knocked", "llamar"], ["a", "", "at"], ["su", "", "his"], ["puerta", "", "door"], [".", "", ""]],
        en: "One night, tired, I went upstairs and knocked at his door.",
      },
      {
        t: [["—", "", ""], ["Perdone", "", "excuse me", "perdonar"], [",", "", ""], ["señor", "", "sir"], [",", "", ""], ["mañana", "", "tomorrow"], ["tengo", "", "I have", "tener"], ["que", "", "(to)"], ["trabajar", "", "work"], ["temprano", "", "early"], ["—", "", ""], ["le", "", "(to him)"], ["dije", "", "I said", "decir"], [".", "", ""]],
        en: "\"Excuse me, sir, I have to work early tomorrow,\" I told him.",
      },
      {
        t: [["Él", "", "he", "él"], ["me", "", "at me"], ["miró", "", "looked", "mirar"], ["con", "", "with"], ["sorpresa", "", "surprise"], ["y", "", "and"], ["después", "", "then"], ["sonrió", "", "smiled", "sonreír"], [".", "", ""]],
        en: "He looked at me in surprise and then smiled.",
      },
      {
        t: [["—", "", ""], ["Tiene", "", "you are", "tener"], ["razón", "", "right"], [",", "", ""], ["querida", "", "my dear", "querido"], [".", "", ""], ["Pero", "", "but"], ["con", "", "on"], ["una", "", "one", "uno"], ["condición", "", "condition"], [":", "", ""], ["el", "", "on"], ["sábado", "", "Saturday"], ["usted", "", "you"], ["viene", "", "come", "venir"], ["a", "", "to"], ["tomar", "", "drink"], ["mate", "", "mate"], ["conmigo", "", "with me"], [".", "", ""]],
        en: "\"You're right, my dear. But on one condition: on Saturday you come and drink mate with me.\"",
      },
      {
        t: [["Así", "", "that's how", "así"], ["empezó", "", "began", "empezar"], ["nuestra", "", "our", "nuestro"], ["amistad", "", "friendship"], [".", "", ""]],
        en: "That's how our friendship began.",
      },
      {
        t: [["Cada", "", "every", "cada"], ["sábado", "", "Saturday"], [",", "", ""], ["don", "", "Mr"], ["Héctor", "", "Héctor"], ["preparaba", "", "made", "preparar"], ["mate", "", "mate"], [",", "", ""], ["una", "", "a", "uno"], ["bebida", "", "drink"], ["amarga", "", "bitter", "amargo"], ["que", "", "that"], ["se", "", "(one)"], ["toma", "", "drinks", "tomar"], ["con", "", "with"], ["una", "", "a", "uno"], ["bombilla", "", "metal straw"], ["de", "", "of"], ["metal", "", "metal"], [",", "", ""], ["y", "", "and"], ["yo", "", "I"], ["llevaba", "", "brought", "llevar"], ["facturas", "", "pastries", "factura"], ["de", "", "from"], ["la", "", "the", "el"], ["panadería", "", "bakery"], [".", "", ""]],
        en: "Every Saturday, Don Héctor made mate, a bitter drink that you drink through a metal straw, and I brought pastries from the bakery.",
      },
      {
        t: [["Él", "", "he", "él"], ["me", "", "me"], ["contaba", "", "told", "contar"], ["historias", "", "stories", "historia"], ["de", "", "of"], ["su", "", "his"], ["juventud", "", "youth"], [":", "", ""], ["los", "", "the", "el"], ["bailes", "", "dances", "baile"], ["de", "", "of"], ["los", "", "the", "el"], ["años", "", "(the sixties)", "año"], ["sesenta", "", "sixties"], [",", "", ""], ["sus", "", "his", "su"], ["viajes", "", "trips", "viaje"], ["con", "", "with"], ["la", "", "the", "el"], ["orquesta", "", "orchestra"], [",", "", ""], ["su", "", "his"], ["mujer", "", "wife"], [",", "", ""], ["Elena", "", "Elena"], [",", "", ""], ["que", "", "who"], ["murió", "", "died", "morir"], ["hace", "", "ago", "hacer"], ["diez", "", "ten"], ["años", "", "years", "año"], [".", "", ""]],
        en: "He told me stories from his youth: the dances of the sixties, his trips with the orchestra, his wife, Elena, who died ten years ago.",
      },
      {
        t: [["—", "", ""], ["Ella", "", "she", "ella"], ["bailaba", "", "danced", "bailar"], ["mejor", "", "better"], ["que", "", "than"], ["nadie", "", "anyone"], ["—", "", ""], ["decía", "", "he would say", "decir"], ["siempre", "", "always"], [".", "", ""]],
        en: "\"She danced better than anyone,\" he always said.",
      },
      {
        t: [["Un", "", "one", "uno"], ["sábado", "", "Saturday"], [",", "", ""], ["don", "", "Mr"], ["Héctor", "", "Héctor"], ["puso", "", "put on", "poner"], ["un", "", "an", "uno"], ["disco", "", "record"], ["viejo", "", "old"], ["y", "", "and"], ["me", "", "to me"], ["dijo", "", "said", "decir"], [":", "", ""], ["—", "", ""], ["Hoy", "", "today", "hoy"], ["usted", "", "you"], ["aprende", "", "learn", "aprender"], ["a", "", "to"], ["bailar", "", "dance"], [".", "", ""]],
        en: "One Saturday, Don Héctor put on an old record and said to me: \"Today you learn to dance.\"",
      },
      {
        t: [["Yo", "", "I", "yo"], ["no", "", "not"], ["sabía", "", "knew how", "saber"], ["bailar", "", "to dance"], ["nada", "", "at all"], [",", "", ""], ["y", "", "and"], ["le", "", "his"], ["pisé", "", "I stepped on", "pisar"], ["los", "", "the", "el"], ["pies", "", "feet", "pie"], ["muchas", "", "many", "mucho"], ["veces", "", "times", "vez"], [".", "", ""]],
        en: "I couldn't dance at all, and I stepped on his feet many times.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["él", "", "he"], ["tenía", "", "had", "tener"], ["paciencia", "", "patience"], [",", "", ""], ["y", "", "and"], ["después", "", "after"], ["de", "", "(after)"], ["unos", "", "a few", "uno"], ["meses", "", "months", "mes"], ["ya", "", "already"], ["podía", "", "I could", "poder"], ["bailar", "", "dance"], ["un", "", "a", "uno"], ["tango", "", "tango"], ["sencillo", "", "simple"], [".", "", ""]],
        en: "But he was patient, and after a few months I could already dance a simple tango.",
      },
      {
        t: [["Desde", "", "from", "desde"], ["ese", "", "that"], ["día", "", "day"], [",", "", ""], ["su", "", "his"], ["música", "", "music"], ["de", "", "at"], ["la", "", "the", "el"], ["noche", "", "night"], ["ya", "", "no longer"], ["no", "", "(no longer)"], ["me", "", "me"], ["molestaba", "", "bothered", "molestar"], [";", "", ""], ["al", "", "on the", "a"], ["contrario", "", "contrary"], [",", "", ""], ["a", "", "sometimes"], ["veces", "", "(sometimes)", "vez"], ["bajaba", "", "I turned down", "bajar"], ["el", "", "the"], ["volumen", "", "volume"], ["de", "", "of"], ["mi", "", "my"], ["televisión", "", "television"], ["para", "", "to"], ["escucharla", "", "hear it", "escuchar"], ["mejor", "", "better"], [".", "", ""]],
        en: "From that day on, his music at night no longer bothered me; on the contrary, I sometimes turned down my television to hear it better.",
      },
      {
        t: [["El", "", "the", "el"], ["año", "", "year"], ["pasó", "", "went by", "pasar"], ["muy", "", "very"], ["rápido", "", "fast"], [".", "", ""]],
        en: "The year went by very fast.",
      },
      {
        t: [["El", "", "the", "el"], ["día", "", "day"], ["antes", "", "before"], ["de", "", "(before)"], ["mi", "", "my"], ["vuelta", "", "return"], ["a", "", "to"], ["Madrid", "", "Madrid"], [",", "", ""], ["subí", "", "I went up", "subir"], ["por", "", "for"], ["última", "", "the last", "último"], ["vez", "", "time"], [".", "", ""]],
        en: "The day before I returned to Madrid, I went upstairs for the last time.",
      },
      {
        t: [["Don", "", "Mr", "don"], ["Héctor", "", "Héctor"], ["me", "", "me"], ["dio", "", "gave", "dar"], ["un", "", "a", "uno"], ["paquete", "", "parcel"], ["pequeño", "", "small"], [":", "", ""], ["era", "", "it was", "ser"], ["el", "", "the"], ["disco", "", "record"], ["viejo", "", "old"], [",", "", ""], ["el", "", "the"], ["disco", "", "record"], ["de", "", "of"], ["los", "", "the", "el"], ["sábados", "", "Saturdays", "sábado"], [".", "", ""]],
        en: "Don Héctor gave me a small parcel: it was the old record, the Saturday record.",
      },
      {
        t: [["—", "", ""], ["Así", "", "this way", "así"], ["no", "", "not"], ["va", "", "you're going", "ir"], ["a", "", "to"], ["olvidar", "", "forget"], ["cómo", "", "how"], ["se", "", "(one)"], ["baila", "", "dances", "bailar"], ["—", "", ""], ["me", "", "me"], ["dijo", "", "told", "decir"], [".", "", ""]],
        en: "\"This way you won't forget how to dance,\" he told me.",
      },
      {
        t: [["Ahora", "", "now", "ahora"], ["vivo", "", "I live", "vivir"], ["otra", "", "again", "otro"], ["vez", "", "(again)"], ["en", "", "in"], ["Madrid", "", "Madrid"], [",", "", ""], ["en", "", "in"], ["un", "", "a", "uno"], ["piso", "", "flat"], ["muy", "", "very"], ["tranquilo", "", "quiet"], [".", "", ""]],
        en: "Now I live in Madrid again, in a very quiet flat.",
      },
      {
        t: [["Demasiado", "", "too", "demasiado"], ["tranquilo", "", "quiet"], [",", "", ""], ["a", "", "sometimes"], ["veces", "", "(sometimes)", "vez"], [".", "", ""]],
        en: "Too quiet, sometimes.",
      },
      {
        t: [["Algunas", "", "some", "alguno"], ["noches", "", "nights", "noche"], ["pongo", "", "I put on", "poner"], ["el", "", "the"], ["disco", "", "record"], [",", "", ""], ["cierro", "", "I close", "cerrar"], ["los", "", "my", "el"], ["ojos", "", "eyes", "ojo"], ["y", "", "and"], ["escucho", "", "I listen to", "escuchar"], ["el", "", "the"], ["bandoneón", "", "bandoneon"], [",", "", ""], ["como", "", "like"], ["antes", "", "before"], [",", "", ""], ["a", "", "at"], ["las", "", "(o'clock)", "el"], ["once", "", "eleven"], [".", "", ""]],
        en: "Some nights I put on the record, close my eyes and listen to the bandoneon, like before, at eleven.",
      },
    ],
    q: [
      { q: "How long was the narrator's job in Buenos Aires?", o: ["Two years", "One year", "Six months"], a: 1 },
      { q: "What surprised her about dinner in Buenos Aires?", o: ["People eat very little", "People have dinner very late", "People never eat at home"], a: 1 },
      { q: "Why did she go upstairs one night?", o: ["To borrow some milk", "Don Héctor's music started at eleven and she had to work early", "She wanted to learn the bandoneon"], a: 1 },
      { q: "What did they do every Saturday?", o: ["They went to a dance hall", "They drank mate and he told her stories", "They cooked dinner together"], a: 1 },
      { q: "Who was Elena?", o: ["Don Héctor's daughter", "Don Héctor's wife", "The narrator's colleague"], a: 1 },
      { q: "What did Don Héctor give her before she left?", o: ["His bandoneon", "The old record", "A photo of Elena"], a: 1 },
    ],
  },
  {
    id: "es-2-dog-came-back",
    lv: 2,
    kind: "story",
    title: "El perro que volvió",
    titleEn: "The dog that came back",
    s: [
      {
        t: [["Rayo", "", "Rayo"], ["era", "", "was", "ser"], ["un", "", "a", "uno"], ["perro", "", "dog"], ["pequeño", "", "small"], ["y", "", "and"], ["marrón", "", "brown"], [",", "", ""], ["con", "", "with"], ["una", "", "one", "uno"], ["oreja", "", "ear"], ["blanca", "", "white", "blanco"], ["y", "", "and"], ["otra", "", "the other", "otro"], ["negra", "", "black", "negro"], [".", "", ""]],
        en: "Rayo was a small brown dog, with one white ear and one black one.",
      },
      {
        t: [["No", "", "not", "no"], ["era", "", "he was", "ser"], ["bonito", "", "pretty"], ["ni", "", "nor"], ["muy", "", "very"], ["inteligente", "", "clever"], [",", "", ""], ["pero", "", "but"], ["Nerea", "", "Nerea"], [",", "", ""], ["que", "", "who"], ["tenía", "", "was", "tener"], ["diez", "", "ten"], ["años", "", "years old", "año"], [",", "", ""], ["lo", "", "him"], ["quería", "", "loved", "querer"], ["más", "", "more"], ["que", "", "than"], ["a", "", "(personal a)"], ["nada", "", "anything"], ["en", "", "in"], ["el", "", "the"], ["mundo", "", "world"], [".", "", ""]],
        en: "He wasn't pretty or very clever, but Nerea, who was ten, loved him more than anything in the world.",
      },
      {
        t: [["Cada", "", "every", "cada"], ["verano", "", "summer"], [",", "", ""], ["la", "", "the", "el"], ["familia", "", "family"], ["de", "", "of"], ["Nerea", "", "Nerea"], ["pasaba", "", "spent", "pasar"], ["dos", "", "two"], ["semanas", "", "weeks", "semana"], ["en", "", "in"], ["un", "", "a", "uno"], ["pueblo", "", "village"], ["de", "", "in"], ["los", "", "the", "el"], ["Picos", "", "Picos"], ["de", "", "of"], ["Europa", "", "Europe"], [",", "", ""], ["a", "", "(at a distance of)"], ["más", "", "more"], ["de", "", "than"], ["doscientos", "", "two hundred"], ["kilómetros", "", "kilometres", "kilómetro"], ["de", "", "from"], ["su", "", "their"], ["casa", "", "home"], ["en", "", "in"], ["Bilbao", "", "Bilbao"], [".", "", ""]],
        en: "Every summer, Nerea's family spent two weeks in a village in the Picos de Europa, more than two hundred kilometres from their home in Bilbao.",
      },
      {
        t: [["Rayo", "", "Rayo", "rayo"], ["siempre", "", "always"], ["iba", "", "went", "ir"], ["con", "", "with"], ["ellos", "", "them", "él"], [".", "", ""]],
        en: "Rayo always went with them.",
      },
      {
        t: [["Le", "", "(to him)", "le"], ["encantaba", "", "he loved", "encantar"], ["correr", "", "running"], ["por", "", "through"], ["el", "", "the"], ["campo", "", "fields"], [",", "", ""], ["perseguir", "", "chasing"], ["mariposas", "", "butterflies", "mariposa"], ["y", "", "and"], ["meterse", "", "getting"], ["en", "", "into"], ["el", "", "the"], ["río", "", "river"], [".", "", ""]],
        en: "He loved running through the fields, chasing butterflies and getting into the river.",
      },
      {
        t: [["Una", "", "one", "uno"], ["tarde", "", "afternoon"], ["de", "", "in"], ["agosto", "", "August"], [",", "", ""], ["mientras", "", "while"], ["daban", "", "they were going for", "dar"], ["un", "", "a", "uno"], ["paseo", "", "walk"], ["por", "", "in"], ["la", "", "the", "el"], ["montaña", "", "mountains"], [",", "", ""], ["empezó", "", "started", "empezar"], ["una", "", "a", "uno"], ["tormenta", "", "storm"], ["muy", "", "very"], ["fuerte", "", "strong"], [".", "", ""]],
        en: "One afternoon in August, while they were walking in the mountains, a very strong storm started.",
      },
      {
        t: [["El", "", "the", "el"], ["cielo", "", "sky"], ["se", "", "(itself)"], ["puso", "", "turned", "ponerse"], ["negro", "", "black"], ["y", "", "and"], ["un", "", "a", "uno"], ["trueno", "", "thunderclap"], ["enorme", "", "huge"], ["sonó", "", "sounded", "sonar"], ["justo", "", "right"], ["encima", "", "above"], ["de", "", "(above)"], ["ellos", "", "them", "él"], [".", "", ""]],
        en: "The sky turned black and a huge clap of thunder sounded right above them.",
      },
      {
        t: [["Rayo", "", "Rayo", "rayo"], [",", "", ""], ["asustado", "", "frightened"], [",", "", ""], ["salió", "", "ran off", "salir"], ["corriendo", "", "running", "correr"], ["entre", "", "among"], ["los", "", "the", "el"], ["árboles", "", "trees", "árbol"], [".", "", ""]],
        en: "Rayo, frightened, ran off into the trees.",
      },
      {
        t: [["—", "", ""], ["¡", "", ""], ["Rayo", "", "Rayo", "rayo"], ["!", "", ""], ["¡", "", ""], ["Ven", "", "come", "venir"], ["aquí", "", "here"], ["!", "", ""], ["—", "", ""], ["gritó", "", "shouted", "gritar"], ["Nerea", "", "Nerea"], [",", "", ""], ["pero", "", "but"], ["el", "", "the"], ["perro", "", "dog"], ["ya", "", "already"], ["no", "", "not"], ["estaba", "", "was there", "estar"], [".", "", ""]],
        en: "\"Rayo! Come here!\" shouted Nerea, but the dog was already gone.",
      },
      {
        t: [["Lo", "", "him", "lo"], ["buscaron", "", "they looked for", "buscar"], ["hasta", "", "until"], ["la", "", "the", "el"], ["noche", "", "night"], [",", "", ""], ["con", "", "with"], ["linternas", "", "torches", "linterna"], ["y", "", "and"], ["bajo", "", "in"], ["la", "", "the", "el"], ["lluvia", "", "rain"], [".", "", ""]],
        en: "They looked for him until nightfall, with torches, in the rain.",
      },
      {
        t: [["Al", "", "on the", "a"], ["día", "", "day"], ["siguiente", "", "next"], [",", "", ""], ["todo", "", "the whole"], ["el", "", "the"], ["pueblo", "", "village"], ["los", "", "them", "el"], ["ayudó", "", "helped", "ayudar"], [".", "", ""]],
        en: "The next day, the whole village helped them.",
      },
      {
        t: [["El", "", "the", "el"], ["panadero", "", "baker"], ["puso", "", "put up", "poner"], ["un", "", "a", "uno"], ["cartel", "", "poster"], ["en", "", "in"], ["su", "", "his"], ["tienda", "", "shop"], [",", "", ""], ["y", "", "and"], ["unos", "", "some", "uno"], ["niños", "", "children", "niño"], ["recorrieron", "", "rode along", "recorrer"], ["los", "", "the", "el"], ["caminos", "", "paths", "camino"], ["en", "", "by"], ["bicicleta", "", "bike"], [".", "", ""]],
        en: "The baker put up a poster in his shop, and some children rode along the paths on their bikes.",
      },
      {
        t: [["Nadie", "", "nobody", "nadie"], ["vio", "", "saw", "ver"], ["a", "", "(personal a)"], ["Rayo", "", "Rayo"], [".", "", ""]],
        en: "Nobody saw Rayo.",
      },
      {
        t: [["Pasaron", "", "passed", "pasar"], ["tres", "", "three"], ["días", "", "days", "día"], [",", "", ""], ["luego", "", "then"], ["cinco", "", "five"], [".", "", ""]],
        en: "Three days passed, then five.",
      },
      {
        t: [["Por", "", "in the", "por"], ["fin", "", "end"], [",", "", ""], ["la", "", "the", "el"], ["familia", "", "family"], ["tuvo", "", "had", "tener"], ["que", "", "(to)"], ["volver", "", "go back"], ["a", "", "to"], ["Bilbao", "", "Bilbao"], [",", "", ""], ["porque", "", "because"], ["los", "", "the", "el"], ["padres", "", "parents", "padre"], ["de", "", "of"], ["Nerea", "", "Nerea"], ["tenían", "", "had", "tener"], ["que", "", "(to)"], ["trabajar", "", "work"], [".", "", ""]],
        en: "In the end, the family had to go back to Bilbao, because Nerea's parents had to work.",
      },
      {
        t: [["En", "", "in", "en"], ["el", "", "the"], ["coche", "", "car"], [",", "", ""], ["nadie", "", "nobody"], ["habló", "", "spoke", "hablar"], [".", "", ""]],
        en: "In the car, nobody spoke.",
      },
      {
        t: [["Nerea", "", "Nerea", "nerea"], ["miraba", "", "looked", "mirar"], ["por", "", "out of"], ["la", "", "the", "el"], ["ventana", "", "window"], ["y", "", "and"], ["pensaba", "", "thought", "pensar"], [":", "", ""], ["«", "", ""], ["Está", "", "he is", "estar"], ["solo", "", "alone"], [",", "", ""], ["tiene", "", "he is", "tener"], ["frío", "", "cold"], [",", "", ""], ["no", "", "not"], ["sabe", "", "he knows", "saber"], ["dónde", "", "where"], ["estamos", "", "we are", "estar"], ["»", "", ""], [".", "", ""]],
        en: "Nerea looked out of the window and thought: \"He's alone, he's cold, he doesn't know where we are.\"",
      },
      {
        t: [["Las", "", "the", "el"], ["semanas", "", "weeks", "semana"], ["siguientes", "", "following", "siguiente"], ["fueron", "", "were", "ser"], ["muy", "", "very"], ["tristes", "", "sad", "triste"], [".", "", ""]],
        en: "The following weeks were very sad.",
      },
      {
        t: [["Nerea", "", "Nerea", "nerea"], ["dejaba", "", "left", "dejar"], ["abierta", "", "open", "abierto"], ["la", "", "the", "el"], ["puerta", "", "door"], ["de", "", "of"], ["su", "", "her"], ["habitación", "", "bedroom"], ["por", "", "at"], ["la", "", "the", "el"], ["noche", "", "night"], [",", "", ""], ["como", "", "like"], ["antes", "", "before"], [",", "", ""], ["para", "", "for"], ["Rayo", "", "Rayo"], [".", "", ""]],
        en: "Nerea left her bedroom door open at night, like before, for Rayo.",
      },
      {
        t: [["Su", "", "her", "su"], ["madre", "", "mother"], ["llamaba", "", "called", "llamar"], ["cada", "", "every"], ["día", "", "day"], ["al", "", "the", "a"], ["pueblo", "", "village"], [",", "", ""], ["pero", "", "but"], ["siempre", "", "always"], ["recibía", "", "got", "recibir"], ["la", "", "the", "el"], ["misma", "", "same", "mismo"], ["respuesta", "", "answer"], [":", "", ""], ["nada", "", "nothing"], [".", "", ""]],
        en: "Her mother called the village every day, but she always got the same answer: nothing.",
      },
      {
        t: [["Un", "", "one", "uno"], ["domingo", "", "Sunday"], ["por", "", "in"], ["la", "", "the", "el"], ["mañana", "", "morning"], [",", "", ""], ["casi", "", "almost"], ["un", "", "a", "uno"], ["mes", "", "month"], ["después", "", "after"], ["de", "", "(after)"], ["la", "", "the", "el"], ["tormenta", "", "storm"], [",", "", ""], ["algo", "", "something"], ["rascó", "", "scratched", "rascar"], ["la", "", "the", "el"], ["puerta", "", "door"], ["de", "", "of"], ["la", "", "the", "el"], ["casa", "", "house"], [".", "", ""]],
        en: "One Sunday morning, almost a month after the storm, something scratched at the front door.",
      },
      {
        t: [["Nerea", "", "Nerea", "nerea"], ["pensó", "", "thought", "pensar"], ["que", "", "that"], ["era", "", "it was", "ser"], ["el", "", "the"], ["viento", "", "wind"], [".", "", ""]],
        en: "Nerea thought it was the wind.",
      },
      {
        t: [["Luego", "", "then", "luego"], ["oyó", "", "she heard", "oír"], ["un", "", "a", "uno"], ["ladrido", "", "bark"], ["pequeño", "", "small"], [",", "", ""], ["débil", "", "weak"], [",", "", ""], ["pero", "", "but"], ["muy", "", "very"], ["conocido", "", "familiar"], [".", "", ""]],
        en: "Then she heard a small, weak, but very familiar bark.",
      },
      {
        t: [["Corrió", "", "she ran", "correr"], ["a", "", "to"], ["la", "", "the", "el"], ["puerta", "", "door"], ["y", "", "and"], ["la", "", "it"], ["abrió", "", "opened", "abrir"], [".", "", ""]],
        en: "She ran to the door and opened it.",
      },
      {
        t: [["Allí", "", "there", "allí"], ["estaba", "", "was", "estar"], ["Rayo", "", "Rayo"], [":", "", ""], ["sucio", "", "dirty"], [",", "", ""], ["muy", "", "very"], ["delgado", "", "thin"], ["y", "", "and"], ["con", "", "with"], ["las", "", "his", "el"], ["patas", "", "paws", "pata"], ["heridas", "", "hurt", "herido"], [",", "", ""], ["pero", "", "but"], ["moviendo", "", "wagging", "mover"], ["la", "", "his", "el"], ["cola", "", "tail"], ["como", "", "like"], ["un", "", "a", "uno"], ["loco", "", "madman"], [".", "", ""]],
        en: "There was Rayo: dirty, very thin and with hurt paws, but wagging his tail like mad.",
      },
      {
        t: [["Nerea", "", "Nerea", "nerea"], ["gritó", "", "screamed", "gritar"], ["tan", "", "so"], ["fuerte", "", "loudly"], ["que", "", "that"], ["todos", "", "all", "todo"], ["los", "", "the", "el"], ["vecinos", "", "neighbours", "vecino"], ["salieron", "", "came out", "salir"], ["a", "", "onto"], ["la", "", "the", "el"], ["escalera", "", "stairs"], [".", "", ""]],
        en: "Nerea screamed so loudly that all the neighbours came out onto the stairs.",
      },
      {
        t: [["Mientras", "", "while", "mientras"], ["Nerea", "", "Nerea"], ["lo", "", "him"], ["abrazaba", "", "was hugging", "abrazar"], [",", "", ""], ["su", "", "her"], ["padre", "", "father"], ["vio", "", "noticed", "ver"], ["algo", "", "something"], ["raro", "", "strange"], [".", "", ""]],
        en: "While Nerea was hugging him, her father noticed something strange.",
      },
      {
        t: [["Alrededor", "", "around", "alrededor"], ["del", "", "the", "de"], ["cuello", "", "neck"], [",", "", ""], ["Rayo", "", "Rayo"], ["llevaba", "", "was wearing", "llevar"], ["un", "", "a", "uno"], ["pañuelo", "", "scarf"], ["rojo", "", "red"], ["que", "", "that"], ["no", "", "not"], ["era", "", "was", "ser"], ["suyo", "", "his"], [".", "", ""]],
        en: "Around his neck, Rayo was wearing a red scarf that wasn't his.",
      },
      {
        t: [["Dentro", "", "inside", "dentro"], ["del", "", "the", "de"], ["pañuelo", "", "scarf"], ["había", "", "there was", "haber"], ["un", "", "a", "uno"], ["papel", "", "piece of paper"], ["doblado", "", "folded"], [".", "", ""]],
        en: "Inside the scarf there was a folded piece of paper.",
      },
      {
        t: [["Su", "", "her", "su"], ["padre", "", "father"], ["lo", "", "it"], ["abrió", "", "opened", "abrir"], ["y", "", "and"], ["leyó", "", "read", "leer"], ["en", "", "out"], ["voz", "", "loud"], ["alta", "", "(out loud)", "alto"], [":", "", ""], ["«", "", ""], ["Este", "", "this", "este"], ["perro", "", "dog"], ["durmió", "", "slept", "dormir"], ["tres", "", "three"], ["noches", "", "nights", "noche"], ["en", "", "in"], ["mi", "", "my"], ["cabaña", "", "hut"], [",", "", ""], ["cerca", "", "near"], ["del", "", "the", "de"], ["puerto", "", "pass"], ["de", "", "(mountain)"], ["montaña", "", "mountain"], [".", "", ""]],
        en: "Her father opened it and read out loud: \"This dog slept three nights in my hut, near the mountain pass.",
      },
      {
        t: [["Le", "", "him", "le"], ["di", "", "I gave", "dar"], ["comida", "", "food"], ["y", "", "and"], ["agua", "", "water"], [".", "", ""]],
        en: "I gave him food and water.",
      },
      {
        t: [["Por", "", "in", "por"], ["la", "", "the", "el"], ["mañana", "", "morning"], ["siempre", "", "always"], ["miraba", "", "he looked", "mirar"], ["hacia", "", "towards"], ["el", "", "the"], ["norte", "", "north"], ["y", "", "and"], ["no", "", "not"], ["quería", "", "he wanted", "querer"], ["quedarse", "", "to stay"], [".", "", ""]],
        en: "In the mornings he always looked towards the north and didn't want to stay.",
      },
      {
        t: [["Creo", "", "I think", "creer"], ["que", "", "that"], ["sabe", "", "he knows", "saber"], ["adónde", "", "where"], ["va", "", "he is going", "ir"], [".", "", ""], ["Buena", "", "good", "bueno"], ["suerte", "", "luck"], [",", "", ""], ["amigo", "", "friend"], [".", "", ""], ["Julián", "", "Julián"], [",", "", ""], ["pastor", "", "shepherd"], ["»", "", ""], [".", "", ""]],
        en: "I think he knows where he's going. Good luck, friend. Julián, shepherd.\"",
      },
      {
        t: [["Nadie", "", "nobody", "nadie"], ["sabe", "", "knows", "saber"], ["cómo", "", "how"], ["encontró", "", "found", "encontrar"], ["Rayo", "", "Rayo"], ["el", "", "the"], ["camino", "", "way"], ["a", "", "to"], ["Bilbao", "", "Bilbao"], [".", "", ""]],
        en: "Nobody knows how Rayo found his way to Bilbao.",
      },
      {
        t: [["Doscientos", "", "two hundred", "doscientos"], ["kilómetros", "", "kilometres", "kilómetro"], [",", "", ""], ["montañas", "", "mountains", "montaña"], [",", "", ""], ["carreteras", "", "roads", "carretera"], [",", "", ""], ["ciudades", "", "cities", "ciudad"], [".", "", ""]],
        en: "Two hundred kilometres, mountains, roads, cities.",
      },
      {
        t: [["El", "", "the", "el"], ["veterinario", "", "vet"], ["dijo", "", "said", "decir"], ["que", "", "that"], ["era", "", "he was", "ser"], ["un", "", "a", "uno"], ["perro", "", "dog"], ["con", "", "with"], ["mucha", "", "a lot of", "mucho"], ["suerte", "", "luck"], [".", "", ""]],
        en: "The vet said he was a very lucky dog.",
      },
      {
        t: [["Nerea", "", "Nerea", "nerea"], ["piensa", "", "thinks", "pensar"], ["otra", "", "something else", "otro"], ["cosa", "", "(something else)"], [".", "", ""]],
        en: "Nerea thinks differently.",
      },
      {
        t: [["—", "", ""], ["No", "", "not", "no"], ["fue", "", "it was", "ser"], ["suerte", "", "luck"], ["—", "", ""], ["dice", "", "she says", "decir"], ["—", "", ""], [".", "", ""], ["Rayo", "", "Rayo", "rayo"], ["sabía", "", "knew", "saber"], ["que", "", "that"], ["lo", "", "him"], ["estábamos", "", "we were", "estar"], ["esperando", "", "waiting for", "esperar"], [".", "", ""]],
        en: "\"It wasn't luck,\" she says. \"Rayo knew we were waiting for him.\"",
      },
      {
        t: [["Al", "", "the", "a"], ["verano", "", "summer"], ["siguiente", "", "next"], [",", "", ""], ["la", "", "the", "el"], ["familia", "", "family"], ["volvió", "", "went back", "volver"], ["al", "", "to the", "a"], ["pueblo", "", "village"], ["y", "", "and"], ["subió", "", "went up", "subir"], ["hasta", "", "to"], ["la", "", "the", "el"], ["cabaña", "", "hut"], ["del", "", "of the", "de"], ["pastor", "", "shepherd"], [".", "", ""]],
        en: "The next summer, the family went back to the village and climbed up to the shepherd's hut.",
      },
      {
        t: [["Julián", "", "Julián", "julián"], ["abrió", "", "opened", "abrir"], ["la", "", "the", "el"], ["puerta", "", "door"], [",", "", ""], ["miró", "", "looked at", "mirar"], ["al", "", "the", "a"], ["perro", "", "dog"], ["y", "", "and"], ["se", "", "(himself)"], ["rio", "", "laughed", "reír"], [".", "", ""]],
        en: "Julián opened the door, looked at the dog and laughed.",
      },
      {
        t: [["—", "", ""], ["¡", "", ""], ["Hombre", "", "well well", "hombre"], ["!", "", ""], ["¡", "", ""], ["El", "", "the", "el"], ["viajero", "", "traveller"], ["!", "", ""], ["—", "", ""], ["dijo", "", "he said", "decir"], [".", "", ""]],
        en: "\"Well, well! The traveller!\" he said.",
      },
      {
        t: [["Y", "", "and", "y"], ["Rayo", "", "Rayo"], [",", "", ""], ["que", "", "who"], ["nunca", "", "never"], ["fue", "", "was", "ser"], ["muy", "", "very"], ["inteligente", "", "clever"], [",", "", ""], ["le", "", "him"], ["dio", "", "gave", "dar"], ["la", "", "his", "el"], ["pata", "", "paw"], ["como", "", "like"], ["a", "", "to"], ["un", "", "an", "uno"], ["viejo", "", "old"], ["amigo", "", "friend"], [".", "", ""]],
        en: "And Rayo, who was never very clever, gave him his paw like an old friend.",
      },
    ],
    q: [
      { q: "What did Rayo look like?", o: ["Big and black", "Small and brown, with one white ear and one black ear", "White with long hair"], a: 1 },
      { q: "Why did Rayo run away?", o: ["He saw a rabbit", "He was frightened by a storm", "He wanted to go home"], a: 1 },
      { q: "Why did the family go back to Bilbao?", o: ["They found Rayo there", "Nerea's parents had to work", "The village was closed"], a: 1 },
      { q: "How did Rayo come back?", o: ["A neighbour brought him in a car", "He scratched at the door one Sunday morning", "The police found him"], a: 1 },
      { q: "What was inside the red scarf?", o: ["Money", "A note from a shepherd", "A photo of Nerea"], a: 1 },
      { q: "What does Nerea think about Rayo's return?", o: ["It was just luck", "Rayo knew they were waiting for him", "The shepherd brought him"], a: 1 },
    ],
  },
];

export default data;
