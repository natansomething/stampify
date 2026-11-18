import type { Text } from '../types';

const data: Text[] = [
  {
    id: "es-1-new-flat",
    lv: 1,
    kind: "story",
    title: "Mi piso nuevo",
    titleEn: "My new flat",
    s: [
      {
        t: [["Me", "", "myself", "me"], ["llamo", "", "(I) am called", "llamarse"], ["Pablo", "", "Pablo"], ["y", "", "and"], ["tengo", "", "I have", "tener"], ["un", "", "a", "uno"], ["piso", "", "flat"], ["nuevo", "", "new"], ["en", "", "in"], ["Madrid", "", "Madrid"], [".", "", ""]],
        en: "My name is Pablo and I have a new flat in Madrid.",
      },
      {
        t: [["El", "", "the", "el"], ["piso", "", "flat"], ["es", "", "is", "ser"], ["pequeño", "", "small"], [",", "", ""], ["pero", "", "but"], ["es", "", "it is", "ser"], ["muy", "", "very"], ["bonito", "", "pretty"], [".", "", ""]],
        en: "The flat is small, but it is very pretty.",
      },
      {
        t: [["Tiene", "", "it has", "tener"], ["una", "", "a", "uno"], ["cocina", "", "kitchen"], [",", "", ""], ["un", "", "a", "uno"], ["baño", "", "bathroom"], ["y", "", "and"], ["dos", "", "two"], ["habitaciones", "", "bedrooms", "habitación"], [".", "", ""]],
        en: "It has a kitchen, a bathroom and two bedrooms.",
      },
      {
        t: [["En", "", "in", "en"], ["la", "", "the", "el"], ["sala", "", "living room"], ["hay", "", "there is", "haber"], ["un", "", "a", "uno"], ["sofá", "", "sofa"], ["azul", "", "blue"], ["y", "", "and"], ["una", "", "a", "uno"], ["mesa", "", "table"], [".", "", ""]],
        en: "In the living room there is a blue sofa and a table.",
      },
      {
        t: [["Mi", "", "my", "mi"], ["calle", "", "street"], ["tiene", "", "has", "tener"], ["muchas", "", "many", "mucho"], ["tiendas", "", "shops", "tienda"], [".", "", ""]],
        en: "My street has lots of shops.",
      },
      {
        t: [["Desde", "", "from", "desde"], ["la", "", "the", "el"], ["ventana", "", "window"], ["veo", "", "I see", "ver"], ["un", "", "a", "uno"], ["parque", "", "park"], [".", "", ""]],
        en: "From the window I can see a park.",
      },
      {
        t: [["El", "", "the", "el"], ["problema", "", "problem"], ["es", "", "is", "ser"], ["el", "", "the"], ["vecino", "", "neighbour"], ["de", "", "from"], ["arriba", "", "upstairs"], [".", "", ""]],
        en: "The problem is the neighbour upstairs.",
      },
      {
        t: [["Toca", "", "he plays", "tocar"], ["la", "", "the", "el"], ["guitarra", "", "guitar"], ["todas", "", "every", "todo"], ["las", "", "the", "el"], ["noches", "", "nights", "noche"], [".", "", ""]],
        en: "He plays the guitar every night.",
      },
      {
        t: [["¡", "", ""], ["Pero", "", "but", "pero"], ["toca", "", "he plays", "tocar"], ["muy", "", "very"], ["bien", "", "well"], ["!", "", ""]],
        en: "But he plays very well!",
      },
      {
        t: [["Ahora", "", "now", "ahora"], ["escucho", "", "I listen to", "escuchar"], ["la", "", "the", "el"], ["música", "", "music"], ["y", "", "and"], ["duermo", "", "I sleep", "dormir"], ["tranquilo", "", "peacefully"], [".", "", ""]],
        en: "Now I listen to the music and sleep peacefully.",
      },
    ],
    q: [
      { q: "Where is Pablo's new flat?", o: ["In Seville", "In Madrid", "In Barcelona"], a: 1 },
      { q: "How many bedrooms does the flat have?", o: ["One", "Two", "Three"], a: 1 },
      { q: "What can Pablo see from the window?", o: ["A park", "The sea", "A school"], a: 0 },
      { q: "What does the neighbour upstairs do every night?", o: ["He sings", "He plays the guitar", "He watches TV"], a: 1 },
    ],
  },
  {
    id: "es-1-family-photo",
    lv: 1,
    kind: "story",
    title: "Una foto de mi familia",
    titleEn: "A photo of my family",
    s: [
      {
        t: [["Esta", "", "this", "este"], ["es", "", "is", "ser"], ["una", "", "a", "uno"], ["foto", "", "photo"], ["de", "", "of"], ["mi", "", "my"], ["familia", "", "family"], [".", "", ""]],
        en: "This is a photo of my family.",
      },
      {
        t: [["Somos", "", "we are", "ser"], ["cinco", "", "five"], ["personas", "", "people", "persona"], [".", "", ""]],
        en: "There are five of us.",
      },
      {
        t: [["El", "", "the", "el"], ["hombre", "", "man"], ["alto", "", "tall"], ["es", "", "is", "ser"], ["mi", "", "my"], ["padre", "", "father"], [",", "", ""], ["Javier", "", "Javier"], [".", "", ""]],
        en: "The tall man is my father, Javier.",
      },
      {
        t: [["Es", "", "he is", "ser"], ["médico", "", "a doctor"], ["y", "", "and"], ["trabaja", "", "works", "trabajar"], ["mucho", "", "a lot"], [".", "", ""]],
        en: "He is a doctor and works a lot.",
      },
      {
        t: [["La", "", "the", "el"], ["mujer", "", "woman"], ["del", "", "with the", "de"], ["pelo", "", "hair"], ["corto", "", "short"], ["es", "", "is", "ser"], ["mi", "", "my"], ["madre", "", "mother"], [",", "", ""], ["Carmen", "", "Carmen"], [".", "", ""]],
        en: "The woman with short hair is my mother, Carmen.",
      },
      {
        t: [["Ella", "", "she", "ella"], ["es", "", "is", "ser"], ["profesora", "", "teacher", "profesor"], ["de", "", "of"], ["inglés", "", "English"], [".", "", ""]],
        en: "She is an English teacher.",
      },
      {
        t: [["Los", "", "the", "el"], ["dos", "", "two"], ["chicos", "", "boys", "chico"], ["son", "", "are", "ser"], ["mis", "", "my", "mi"], ["hermanos", "", "brothers", "hermano"], [".", "", ""]],
        en: "The two boys are my brothers.",
      },
      {
        t: [["Diego", "", "Diego"], ["tiene", "", "is (has)", "tener"], ["quince", "", "fifteen"], ["años", "", "years old", "año"], ["y", "", "and"], ["Marcos", "", "Marcos"], ["tiene", "", "is (has)", "tener"], ["doce", "", "twelve"], [".", "", ""]],
        en: "Diego is fifteen and Marcos is twelve.",
      },
      {
        t: [["Yo", "", "I", "yo"], ["soy", "", "am", "ser"], ["la", "", "the", "el"], ["chica", "", "girl"], ["de", "", "with"], ["las", "", "the", "el"], ["gafas", "", "glasses"], [".", "", ""]],
        en: "I am the girl with the glasses.",
      },
      {
        t: [["¿", "", ""], ["Y", "", "and", "y"], ["el", "", "the"], ["perro", "", "dog"], ["?", "", ""]],
        en: "And the dog?",
      },
      {
        t: [["Se", "", "himself", "se"], ["llama", "", "is called", "llamarse"], ["Toby", "", "Toby"], ["y", "", "and"], ["es", "", "is", "ser"], ["el", "", "the"], ["rey", "", "king"], ["de", "", "of"], ["la", "", "the", "el"], ["casa", "", "house"], [".", "", ""]],
        en: "His name is Toby and he is the king of the house.",
      },
      {
        t: [["En", "", "in", "en"], ["la", "", "the", "el"], ["foto", "", "photo"], [",", "", ""], ["todos", "", "everyone", "todo"], ["miran", "", "look", "mirar"], ["a", "", "at"], ["la", "", "the", "el"], ["cámara", "", "camera"], [",", "", ""], ["pero", "", "but"], ["Toby", "", "Toby"], ["mira", "", "looks at", "mirar"], ["la", "", "the", "el"], ["comida", "", "food"], [".", "", ""]],
        en: "In the photo, everyone is looking at the camera, but Toby is looking at the food.",
      },
    ],
    q: [
      { q: "How many people are in the family?", o: ["Four", "Five", "Six"], a: 1 },
      { q: "What is the father's job?", o: ["Teacher", "Doctor", "Cook"], a: 1 },
      { q: "How old is Marcos?", o: ["Twelve", "Fifteen", "Ten"], a: 0 },
      { q: "What is Toby looking at in the photo?", o: ["The camera", "The food", "The mother"], a: 1 },
    ],
  },
  {
    id: "es-1-weather",
    lv: 1,
    kind: "article",
    title: "El tiempo en España",
    titleEn: "The weather in Spain",
    s: [
      {
        t: [["España", "", "Spain"], ["es", "", "is", "ser"], ["un", "", "a", "uno"], ["país", "", "country"], ["con", "", "with"], ["mucho", "", "a lot of"], ["sol", "", "sun"], [".", "", ""]],
        en: "Spain is a country with a lot of sun.",
      },
      {
        t: [["Pero", "", "but", "pero"], ["el", "", "the"], ["tiempo", "", "weather"], ["no", "", "not"], ["es", "", "is", "ser"], ["igual", "", "the same"], ["en", "", "in"], ["todas", "", "all", "todo"], ["partes", "", "places", "parte"], [".", "", ""]],
        en: "But the weather is not the same everywhere.",
      },
      {
        t: [["En", "", "in", "en"], ["el", "", "the"], ["norte", "", "north"], ["llueve", "", "it rains", "llover"], ["mucho", "", "a lot"], ["y", "", "and"], ["hay", "", "there are", "haber"], ["muchos", "", "many", "mucho"], ["bosques", "", "forests", "bosque"], ["verdes", "", "green", "verde"], [".", "", ""]],
        en: "In the north it rains a lot and there are many green forests.",
      },
      {
        t: [["Por", "", "for", "por"], ["eso", "", "that (for that reason)"], [",", "", ""], ["la", "", "the", "el"], ["gente", "", "people"], ["siempre", "", "always"], ["lleva", "", "carries", "llevar"], ["un", "", "an", "uno"], ["paraguas", "", "umbrella"], [".", "", ""]],
        en: "That's why people always carry an umbrella.",
      },
      {
        t: [["En", "", "in", "en"], ["el", "", "the"], ["centro", "", "centre"], [",", "", ""], ["los", "", "the", "el"], ["inviernos", "", "winters", "invierno"], ["son", "", "are", "ser"], ["fríos", "", "cold", "frío"], ["y", "", "and"], ["los", "", "the", "el"], ["veranos", "", "summers", "verano"], ["son", "", "are", "ser"], ["muy", "", "very"], ["calurosos", "", "hot", "caluroso"], [".", "", ""]],
        en: "In the centre, winters are cold and summers are very hot.",
      },
      {
        t: [["En", "", "in", "en"], ["Madrid", "", "Madrid"], [",", "", ""], ["en", "", "in"], ["agosto", "", "August"], [",", "", ""], ["a", "", "at"], ["veces", "", "times", "vez"], ["hace", "", "it is (makes)", "hacer"], ["cuarenta", "", "forty"], ["grados", "", "degrees", "grado"], [".", "", ""]],
        en: "In Madrid, in August, it is sometimes forty degrees.",
      },
      {
        t: [["En", "", "in", "en"], ["el", "", "the"], ["sur", "", "south"], ["hace", "", "it is (makes)", "hacer"], ["calor", "", "hot (heat)"], ["casi", "", "almost"], ["todo", "", "all"], ["el", "", "the"], ["año", "", "year"], [".", "", ""]],
        en: "In the south it is hot almost all year.",
      },
      {
        t: [["En", "", "in", "en"], ["las", "", "the", "el"], ["islas", "", "islands", "isla"], ["Canarias", "", "Canary"], ["la", "", "the", "el"], ["temperatura", "", "temperature"], ["es", "", "is", "ser"], ["agradable", "", "pleasant"], ["en", "", "in"], ["invierno", "", "winter"], ["y", "", "and"], ["en", "", "in"], ["verano", "", "summer"], [".", "", ""]],
        en: "In the Canary Islands the temperature is pleasant in winter and in summer.",
      },
      {
        t: [["¿", "", ""], ["Te", "", "to you", "te"], ["gusta", "", "is pleasing", "gustar"], ["el", "", "the"], ["frío", "", "cold"], ["o", "", "or"], ["el", "", "the"], ["calor", "", "heat"], ["?", "", ""]],
        en: "Do you like the cold or the heat?",
      },
      {
        t: [["En", "", "in", "en"], ["España", "", "Spain"], ["hay", "", "there is", "haber"], ["un", "", "a", "uno"], ["lugar", "", "place"], ["para", "", "for"], ["ti", "", "you"], [".", "", ""]],
        en: "In Spain there is a place for you.",
      },
    ],
    q: [
      { q: "Where in Spain does it rain a lot?", o: ["In the south", "In the north", "In the Canary Islands"], a: 1 },
      { q: "What is summer like in the centre?", o: ["Very hot", "Cool and rainy", "Pleasant"], a: 0 },
      { q: "What can the temperature be in Madrid in August?", o: ["Ten degrees", "Twenty degrees", "Forty degrees"], a: 2 },
      { q: "Where is the temperature pleasant all year?", o: ["In Madrid", "In the north", "In the Canary Islands"], a: 2 },
    ],
  },
  {
    id: "es-1-corner-bakery",
    lv: 1,
    kind: "story",
    title: "La panadería de la esquina",
    titleEn: "The bakery on the corner",
    s: [
      {
        t: [["Todos", "", "every", "todo"], ["los", "", "the", "el"], ["días", "", "days", "día"], [",", "", ""], ["a", "", "at"], ["las", "", "the", "el"], ["ocho", "", "eight"], [",", "", ""], ["compro", "", "I buy", "comprar"], ["pan", "", "bread"], ["en", "", "at"], ["la", "", "the", "el"], ["panadería", "", "bakery"], ["de", "", "on"], ["la", "", "the", "el"], ["esquina", "", "corner"], [".", "", ""]],
        en: "Every day at eight I buy bread at the bakery on the corner.",
      },
      {
        t: [["La", "", "the", "el"], ["panadera", "", "baker", "panadero"], ["se", "", "herself"], ["llama", "", "is called", "llamarse"], ["Lucía", "", "Lucía"], [".", "", ""]],
        en: "The baker's name is Lucía.",
      },
      {
        t: [["Es", "", "she is", "ser"], ["simpática", "", "friendly", "simpático"], ["y", "", "and"], ["siempre", "", "always"], ["está", "", "is", "estar"], ["contenta", "", "happy", "contento"], [".", "", ""]],
        en: "She is friendly and always happy.",
      },
      {
        t: [["Hoy", "", "today", "hoy"], ["la", "", "the", "el"], ["panadería", "", "bakery"], ["está", "", "is", "estar"], ["cerrada", "", "closed", "cerrado"], [".", "", ""]],
        en: "Today the bakery is closed.",
      },
      {
        t: [["En", "", "on", "en"], ["la", "", "the", "el"], ["puerta", "", "door"], ["hay", "", "there is", "haber"], ["una", "", "a", "uno"], ["nota", "", "note"], [".", "", ""]],
        en: "There is a note on the door.",
      },
      {
        t: [["Dice", "", "it says", "decir"], [":", "", ""], ["«", "", ""], ["Hoy", "", "today", "hoy"], ["no", "", "not"], ["abro", "", "I open", "abrir"], [".", "", ""], ["¡", "", ""], ["Mi", "", "my", "mi"], ["hija", "", "daughter"], ["tiene", "", "is having (has)", "tener"], ["un", "", "a", "uno"], ["bebé", "", "baby"], ["!", "", ""], ["»", "", ""]],
        en: "It says: \"I'm not opening today. My daughter is having a baby!\"",
      },
      {
        t: [["Voy", "", "I go", "ir"], ["al", "", "to the", "a"], ["supermercado", "", "supermarket"], [",", "", ""], ["pero", "", "but"], ["el", "", "the"], ["pan", "", "bread"], ["no", "", "not"], ["es", "", "is", "ser"], ["igual", "", "the same"], [".", "", ""]],
        en: "I go to the supermarket, but the bread is not the same.",
      },
      {
        t: [["Al", "", "on the", "a"], ["día", "", "day"], ["siguiente", "", "next"], [",", "", ""], ["la", "", "the", "el"], ["panadería", "", "bakery"], ["está", "", "is", "estar"], ["abierta", "", "open", "abierto"], [".", "", ""]],
        en: "The next day, the bakery is open.",
      },
      {
        t: [["Lucía", "", "Lucía"], ["tiene", "", "has", "tener"], ["una", "", "a", "uno"], ["foto", "", "photo"], ["del", "", "of the", "de"], ["bebé", "", "baby"], ["en", "", "in"], ["la", "", "the", "el"], ["mano", "", "hand"], [".", "", ""]],
        en: "Lucía has a photo of the baby in her hand.",
      },
      {
        t: [["Es", "", "it is", "ser"], ["una", "", "a", "uno"], ["niña", "", "girl", "niño"], ["y", "", "and"], ["se", "", "herself"], ["llama", "", "is called", "llamarse"], ["Sofía", "", "Sofía"], [".", "", ""]],
        en: "It's a girl and her name is Sofía.",
      },
      {
        t: [["Hoy", "", "today", "hoy"], ["el", "", "the"], ["pan", "", "bread"], ["es", "", "is", "ser"], ["gratis", "", "free"], ["para", "", "for"], ["todos", "", "everyone", "todo"], [".", "", ""]],
        en: "Today the bread is free for everyone.",
      },
      {
        t: [["¡", "", ""], ["Qué", "", "what (a)", "qué"], ["buen", "", "good", "bueno"], ["día", "", "day"], ["!", "", ""]],
        en: "What a good day!",
      },
    ],
    q: [
      { q: "When does the narrator buy bread?", o: ["Every day at eight", "On Sundays", "Every evening"], a: 0 },
      { q: "Why is the bakery closed?", o: ["Lucía is on holiday", "Lucía's daughter is having a baby", "There is no flour"], a: 1 },
      { q: "What is the baby's name?", o: ["Lucía", "Carmen", "Sofía"], a: 2 },
      { q: "What is special about the bread the next day?", o: ["It is free", "It is very big", "It is sweet"], a: 0 },
    ],
  },
  {
    id: "es-1-my-weekend",
    lv: 1,
    kind: "story",
    title: "Mi fin de semana",
    titleEn: "My weekend",
    s: [
      {
        t: [["Durante", "", "during", "durante"], ["la", "", "the", "el"], ["semana", "", "week"], ["trabajo", "", "I work", "trabajar"], ["en", "", "in"], ["una", "", "an", "uno"], ["oficina", "", "office"], ["y", "", "and"], ["no", "", "not"], ["tengo", "", "I have", "tener"], ["mucho", "", "much"], ["tiempo", "", "time"], [".", "", ""]],
        en: "During the week I work in an office and I don't have much time.",
      },
      {
        t: [["Por", "", "for", "por"], ["eso", "", "that (for that reason)"], [",", "", ""], ["me", "", "to me"], ["encanta", "", "is delightful", "encantar"], ["el", "", "the"], ["fin", "", "end"], ["de", "", "of"], ["semana", "", "week"], [".", "", ""]],
        en: "That's why I love the weekend.",
      },
      {
        t: [["El", "", "on (the)", "el"], ["sábado", "", "Saturday"], ["me", "", "myself"], ["levanto", "", "I get up", "levantarse"], ["tarde", "", "late"], [",", "", ""], ["a", "", "at"], ["las", "", "the", "el"], ["diez", "", "ten"], [".", "", ""]],
        en: "On Saturday I get up late, at ten.",
      },
      {
        t: [["Desayuno", "", "I have for breakfast", "desayunar"], ["café", "", "coffee"], ["con", "", "with"], ["tostadas", "", "toast", "tostada"], ["y", "", "and"], ["leo", "", "I read", "leer"], ["el", "", "the"], ["periódico", "", "newspaper"], ["en", "", "on"], ["el", "", "the"], ["balcón", "", "balcony"], [".", "", ""]],
        en: "I have coffee and toast for breakfast and read the newspaper on the balcony.",
      },
      {
        t: [["Por", "", "in", "por"], ["la", "", "the", "el"], ["tarde", "", "afternoon"], [",", "", ""], ["juego", "", "I play", "jugar"], ["al", "", "(the)", "a"], ["fútbol", "", "football"], ["con", "", "with"], ["mis", "", "my", "mi"], ["amigos", "", "friends", "amigo"], ["en", "", "in"], ["el", "", "the"], ["parque", "", "park"], [".", "", ""]],
        en: "In the afternoon I play football with my friends in the park.",
      },
      {
        t: [["Siempre", "", "always", "siempre"], ["perdemos", "", "we lose", "perder"], [",", "", ""], ["pero", "", "but"], ["no", "", "not"], ["importa", "", "it matters", "importar"], [".", "", ""]],
        en: "We always lose, but it doesn't matter.",
      },
      {
        t: [["Por", "", "at", "por"], ["la", "", "the", "el"], ["noche", "", "night"], [",", "", ""], ["cenamos", "", "we have dinner", "cenar"], ["juntos", "", "together", "junto"], ["en", "", "in"], ["un", "", "a", "uno"], ["restaurante", "", "restaurant"], ["barato", "", "cheap"], [".", "", ""]],
        en: "At night we have dinner together in a cheap restaurant.",
      },
      {
        t: [["El", "", "the", "el"], ["domingo", "", "Sunday"], ["es", "", "is", "ser"], ["más", "", "more"], ["tranquilo", "", "quiet"], [".", "", ""]],
        en: "Sunday is quieter.",
      },
      {
        t: [["Visito", "", "I visit", "visitar"], ["a", "", "(personal a)"], ["mis", "", "my", "mi"], ["padres", "", "parents", "padre"], ["y", "", "and"], ["como", "", "I eat", "comer"], ["con", "", "with"], ["ellos", "", "them", "él"], [".", "", ""]],
        en: "I visit my parents and have lunch with them.",
      },
      {
        t: [["Mi", "", "my", "mi"], ["madre", "", "mother"], ["cocina", "", "cooks", "cocinar"], ["paella", "", "paella"], ["y", "", "and"], ["mi", "", "my"], ["padre", "", "father"], ["habla", "", "talks", "hablar"], ["de", "", "about"], ["fútbol", "", "football"], [".", "", ""]],
        en: "My mother cooks paella and my father talks about football.",
      },
      {
        t: [["Después", "", "afterwards", "después"], [",", "", ""], ["vuelvo", "", "I go back", "volver"], ["a", "", "to"], ["casa", "", "home"], ["y", "", "and"], ["preparo", "", "I get ready", "preparar"], ["la", "", "the", "el"], ["ropa", "", "clothes"], ["para", "", "for"], ["el", "", "the"], ["lunes", "", "Monday"], [".", "", ""]],
        en: "Afterwards I go back home and get my clothes ready for Monday.",
      },
      {
        t: [["El", "", "on (the)", "el"], ["domingo", "", "Sunday"], ["por", "", "in"], ["la", "", "the", "el"], ["noche", "", "evening"], ["siempre", "", "always"], ["estoy", "", "I am", "estar"], ["un", "", "a", "uno"], ["poco", "", "little"], ["triste", "", "sad"], [".", "", ""]],
        en: "On Sunday evenings I am always a little sad.",
      },
    ],
    q: [
      { q: "Where does the narrator work?", o: ["In a shop", "In an office", "In a restaurant"], a: 1 },
      { q: "What time do they get up on Saturday?", o: ["At eight", "At ten", "At twelve"], a: 1 },
      { q: "What happens when they play football?", o: ["They always win", "They always lose", "They don't play"], a: 1 },
      { q: "What do they do on Sunday?", o: ["Visit their parents", "Work in the office", "Go to the beach"], a: 0 },
      { q: "How do they feel on Sunday evening?", o: ["Very happy", "Tired", "A little sad"], a: 2 },
    ],
  },
];

export default data;
