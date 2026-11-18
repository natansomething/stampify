import type { Text } from '../types';

const data: Text[] = [
  {
    id: "es-1-market",
    lv: 1,
    kind: "story",
    title: "Un sábado en el mercado",
    titleEn: "A Saturday at the market",
    s: [
      {
        t: [["Ana", "", "Ana"], ["vive", "", "lives", "vivir"], ["en", "", "in"], ["Sevilla", "", "Seville"], ["con", "", "with"], ["su", "", "her"], ["hermano", "", "brother"], ["Luis", "", "Luis"], [".", "", ""]],
        en: "Ana lives in Seville with her brother Luis.",
      },
      {
        t: [["Los", "", "the", "el"], ["sábados", "", "on Saturdays", "sábado"], [",", "", ""], ["Ana", "", "Ana"], ["va", "", "goes", "ir"], ["al", "", "to the", "a"], ["mercado", "", "market"], [".", "", ""]],
        en: "On Saturdays, Ana goes to the market.",
      },
      {
        t: [["El", "", "the", "el"], ["mercado", "", "market"], ["es", "", "is", "ser"], ["grande", "", "big"], ["y", "", "and"], ["tiene", "", "has", "tener"], ["muchas", "", "many", "mucho"], ["frutas", "", "fruits", "fruta"], [".", "", ""]],
        en: "The market is big and has a lot of fruit.",
      },
      {
        t: [["Ana", "", "Ana"], ["compra", "", "buys", "comprar"], ["manzanas", "", "apples", "manzana"], [",", "", ""], ["tomates", "", "tomatoes", "tomate"], ["y", "", "and"], ["pan", "", "bread"], [".", "", ""]],
        en: "Ana buys apples, tomatoes and bread.",
      },
      {
        t: [["Un", "", "a", "uno"], ["hombre", "", "man"], ["mayor", "", "old"], ["vende", "", "sells", "vender"], ["queso", "", "cheese"], [".", "", ""]],
        en: "An old man sells cheese.",
      },
      {
        t: [["¿", "", ""], ["Cuánto", "", "how much", "cuánto"], ["cuesta", "", "costs", "costar"], ["el", "", "the"], ["queso", "", "cheese"], ["?", "", ""]],
        en: "How much is the cheese?",
      },
      {
        t: [["El", "", "the", "el"], ["queso", "", "cheese"], ["cuesta", "", "costs", "costar"], ["seis", "", "six"], ["euros", "", "euros", "euro"], [".", "", ""]],
        en: "The cheese costs six euros.",
      },
      {
        t: [["Ana", "", "Ana"], ["compra", "", "buys", "comprar"], ["un", "", "a", "uno"], ["trozo", "", "piece"], ["pequeño", "", "small"], [".", "", ""]],
        en: "Ana buys a small piece.",
      },
      {
        t: [["Después", "", "afterwards", "después"], [",", "", ""], ["Ana", "", "Ana"], ["y", "", "and"], ["Luis", "", "Luis"], ["comen", "", "eat", "comer"], ["en", "", "at"], ["casa", "", "home"], [".", "", ""]],
        en: "Afterwards, Ana and Luis eat at home.",
      },
      {
        t: [["¡", "", ""], ["El", "", "the", "el"], ["queso", "", "cheese"], ["está", "", "is", "estar"], ["muy", "", "very"], ["bueno", "", "good"], ["!", "", ""]],
        en: "The cheese is very good!",
      },
    ],
    q: [
      { q: "Where does Ana live?", o: ["In Madrid", "In Seville", "In Valencia"], a: 1 },
      { q: "When does Ana go to the market?", o: ["On Sundays", "On Fridays", "On Saturdays"], a: 2 },
      { q: "How much does the cheese cost?", o: ["Five euros", "Six euros", "Two euros"], a: 1 },
      { q: "What does Ana think of the cheese?", o: ["It is very good", "It is too expensive", "It is small but bad"], a: 0 },
    ],
  },
  {
    id: "es-1-coffee",
    lv: 1,
    kind: "article",
    title: "El café en España",
    titleEn: "Coffee in Spain",
    s: [
      {
        t: [["En", "", "in", "en"], ["España", "", "Spain"], [",", "", ""], ["la", "", "the", "el"], ["gente", "", "people"], ["toma", "", "drinks", "tomar"], ["mucho", "", "a lot of"], ["café", "", "coffee"], [".", "", ""]],
        en: "In Spain, people drink a lot of coffee.",
      },
      {
        t: [["Por", "", "in", "por"], ["la", "", "the", "el"], ["mañana", "", "morning"], [",", "", ""], ["muchas", "", "many", "mucho"], ["personas", "", "people", "persona"], ["toman", "", "have", "tomar"], ["un", "", "a", "uno"], ["café", "", "coffee"], ["con", "", "with"], ["leche", "", "milk"], [".", "", ""]],
        en: "In the morning, many people have a coffee with milk.",
      },
      {
        t: [["Es", "", "it is", "ser"], ["un", "", "a", "uno"], ["café", "", "coffee"], ["con", "", "with"], ["mucha", "", "a lot of", "mucho"], ["leche", "", "milk"], [".", "", ""]],
        en: "It is a coffee with a lot of milk.",
      },
      {
        t: [["Después", "", "after", "después"], ["de", "", "(after)"], ["comer", "", "eating"], [",", "", ""], ["la", "", "the", "el"], ["gente", "", "people"], ["toma", "", "drinks", "tomar"], ["un", "", "a", "uno"], ["café", "", "coffee"], ["solo", "", "black"], [".", "", ""]],
        en: "After lunch, people drink a black coffee.",
      },
      {
        t: [["Un", "", "a", "uno"], ["café", "", "coffee"], ["solo", "", "black"], ["es", "", "is", "ser"], ["pequeño", "", "small"], ["y", "", "and"], ["fuerte", "", "strong"], [".", "", ""]],
        en: "A black coffee is small and strong.",
      },
      {
        t: [["En", "", "in", "en"], ["España", "", "Spain"], ["hay", "", "there are", "haber"], ["bares", "", "bars", "bar"], ["en", "", "on"], ["todas", "", "all", "todo"], ["las", "", "the", "el"], ["calles", "", "streets", "calle"], [".", "", ""]],
        en: "In Spain there are bars on every street.",
      },
      {
        t: [["Los", "", "the", "el"], ["bares", "", "bars", "bar"], ["son", "", "are", "ser"], ["muy", "", "very"], ["importantes", "", "important", "importante"], [".", "", ""]],
        en: "Bars are very important.",
      },
      {
        t: [["En", "", "in", "en"], ["el", "", "the"], ["bar", "", "bar"], [",", "", ""], ["la", "", "the", "el"], ["gente", "", "people"], ["habla", "", "talks", "hablar"], ["con", "", "with"], ["los", "", "the", "el"], ["amigos", "", "friends", "amigo"], [".", "", ""]],
        en: "In the bar, people talk with their friends.",
      },
      {
        t: [["Un", "", "a", "uno"], ["café", "", "coffee"], ["en", "", "in"], ["un", "", "a", "uno"], ["bar", "", "bar"], ["no", "", "not"], ["es", "", "is", "ser"], ["caro", "", "expensive"], [".", "", ""]],
        en: "A coffee in a bar is not expensive.",
      },
      {
        t: [["Normalmente", "", "usually", "normalmente"], ["cuesta", "", "costs", "costar"], ["entre", "", "between"], ["uno", "", "one"], ["y", "", "and"], ["dos", "", "two"], ["euros", "", "euros", "euro"], [".", "", ""]],
        en: "It usually costs between one and two euros.",
      },
    ],
    q: [
      { q: "What do many people drink in the morning?", o: ["Tea", "Coffee with milk", "Orange juice"], a: 1 },
      { q: "What is a \"café solo\" like?", o: ["Big and sweet", "Small and strong", "Cold with milk"], a: 1 },
      { q: "What do people do in bars?", o: ["They work", "They sleep", "They talk with friends"], a: 2 },
      { q: "How much does a coffee in a bar usually cost?", o: ["Between one and two euros", "About five euros", "Nothing"], a: 0 },
    ],
  },
  {
    id: "es-2-valencia-trip",
    lv: 2,
    kind: "story",
    title: "Un viaje a Valencia",
    titleEn: "A trip to Valencia",
    s: [
      {
        t: [["El", "", "the", "el"], ["verano", "", "summer"], ["pasado", "", "last"], [",", "", ""], ["Marta", "", "Marta"], ["y", "", "and"], ["su", "", "her"], ["amiga", "", "friend", "amigo"], ["Elena", "", "Elena"], ["fueron", "", "went", "ir"], ["a", "", "to"], ["Valencia", "", "Valencia"], ["en", "", "by"], ["tren", "", "train"], [".", "", ""]],
        en: "Last summer, Marta and her friend Elena went to Valencia by train.",
      },
      {
        t: [["El", "", "the", "el"], ["viaje", "", "journey"], ["duró", "", "lasted", "durar"], ["cuatro", "", "four"], ["horas", "", "hours", "hora"], [",", "", ""], ["pero", "", "but"], ["fue", "", "was", "ser"], ["muy", "", "very"], ["agradable", "", "pleasant"], [".", "", ""]],
        en: "The journey took four hours, but it was very pleasant.",
      },
      {
        t: [["Cuando", "", "when", "cuando"], ["llegaron", "", "they arrived", "llegar"], [",", "", ""], ["dejaron", "", "they left", "dejar"], ["las", "", "the", "el"], ["maletas", "", "suitcases", "maleta"], ["en", "", "in"], ["un", "", "a", "uno"], ["hotel", "", "hotel"], ["pequeño", "", "small"], ["cerca", "", "near"], ["de", "", "(near)"], ["la", "", "the", "el"], ["playa", "", "beach"], [".", "", ""]],
        en: "When they arrived, they left their suitcases in a small hotel near the beach.",
      },
      {
        t: [["Por", "", "in", "por"], ["la", "", "the", "el"], ["tarde", "", "afternoon"], [",", "", ""], ["pasearon", "", "they walked", "pasear"], ["por", "", "around"], ["el", "", "the"], ["centro", "", "centre"], ["histórico", "", "historic"], [".", "", ""]],
        en: "In the afternoon, they walked around the historic centre.",
      },
      {
        t: [["Vieron", "", "they saw", "ver"], ["la", "", "the", "el"], ["catedral", "", "cathedral"], ["y", "", "and"], ["un", "", "a", "uno"], ["mercado", "", "market"], ["muy", "", "very"], ["antiguo", "", "old"], [".", "", ""]],
        en: "They saw the cathedral and a very old market.",
      },
      {
        t: [["Por", "", "in", "por"], ["la", "", "the", "el"], ["noche", "", "evening"], [",", "", ""], ["cenaron", "", "they had dinner", "cenar"], ["paella", "", "paella"], ["en", "", "in"], ["un", "", "a", "uno"], ["restaurante", "", "restaurant"], ["del", "", "of the", "de"], ["puerto", "", "port"], [".", "", ""]],
        en: "In the evening, they had paella in a restaurant at the port.",
      },
      {
        t: [["Marta", "", "Marta"], ["pidió", "", "ordered", "pedir"], ["una", "", "a", "uno"], ["paella", "", "paella"], ["de", "", "with"], ["verduras", "", "vegetables", "verdura"], ["porque", "", "because"], ["no", "", "not"], ["come", "", "she eats", "comer"], ["carne", "", "meat"], [".", "", ""]],
        en: "Marta ordered a vegetable paella because she doesn't eat meat.",
      },
      {
        t: [["Al", "", "on the", "a"], ["día", "", "day"], ["siguiente", "", "next"], ["hizo", "", "it was", "hacer"], ["mucho", "", "very"], ["calor", "", "hot"], [",", "", ""], ["así", "", "so"], ["que", "", "(so)"], ["pasaron", "", "they spent", "pasar"], ["el", "", "the"], ["día", "", "day"], ["en", "", "at"], ["la", "", "the", "el"], ["playa", "", "beach"], [".", "", ""]],
        en: "The next day it was very hot, so they spent the day at the beach.",
      },
      {
        t: [["Elena", "", "Elena"], ["leyó", "", "read", "leer"], ["un", "", "a", "uno"], ["libro", "", "book"], ["y", "", "and"], ["Marta", "", "Marta"], ["nadó", "", "swam", "nadar"], ["en", "", "in"], ["el", "", "the"], ["mar", "", "sea"], [".", "", ""]],
        en: "Elena read a book and Marta swam in the sea.",
      },
      {
        t: [["El", "", "the", "el"], ["último", "", "last"], ["día", "", "day"], [",", "", ""], ["compraron", "", "they bought", "comprar"], ["regalos", "", "presents", "regalo"], ["para", "", "for"], ["sus", "", "their", "su"], ["familias", "", "families", "familia"], [".", "", ""]],
        en: "On the last day, they bought presents for their families.",
      },
      {
        t: [["En", "", "on", "en"], ["el", "", "the"], ["tren", "", "train"], ["de", "", "(back)"], ["vuelta", "", "back"], [",", "", ""], ["las", "", "the", "el"], ["dos", "", "two"], ["estaban", "", "were", "estar"], ["cansadas", "", "tired", "cansado"], ["pero", "", "but"], ["contentas", "", "happy", "contento"], [".", "", ""]],
        en: "On the train back, the two of them were tired but happy.",
      },
      {
        t: [["Ya", "", "already", "ya"], ["quieren", "", "they want", "querer"], ["volver", "", "to go back"], ["el", "", "the"], ["próximo", "", "next"], ["año", "", "year"], [".", "", ""]],
        en: "They already want to go back next year.",
      },
    ],
    q: [
      { q: "How did Marta and Elena travel to Valencia?", o: ["By plane", "By car", "By train"], a: 2 },
      { q: "Why did Marta order a vegetable paella?", o: ["She doesn't eat meat", "It was cheaper", "Elena recommended it"], a: 0 },
      { q: "What did they do on the hot day?", o: ["They visited a museum", "They spent the day at the beach", "They stayed in the hotel"], a: 1 },
      { q: "What did they buy on the last day?", o: ["A suitcase", "Presents for their families", "A book"], a: 1 },
    ],
  },
  {
    id: "es-2-city-bikes",
    lv: 2,
    kind: "article",
    title: "Bicicletas en la ciudad",
    titleEn: "Bikes in the city",
    s: [
      {
        t: [["Hoy", "", "today", "hoy"], ["en", "", "(nowadays)"], ["día", "", "(nowadays)"], [",", "", ""], ["muchas", "", "many", "mucho"], ["ciudades", "", "cities", "ciudad"], ["españolas", "", "Spanish", "español"], ["tienen", "", "have", "tener"], ["bicicletas", "", "bicycles", "bicicleta"], ["públicas", "", "public", "público"], [".", "", ""]],
        en: "Nowadays, many Spanish cities have public bicycles.",
      },
      {
        t: [["Las", "", "the", "el"], ["personas", "", "people", "persona"], ["pueden", "", "can", "poder"], ["tomar", "", "take"], ["una", "", "a", "uno"], ["bicicleta", "", "bicycle"], ["en", "", "at"], ["una", "", "one", "uno"], ["estación", "", "station"], ["y", "", "and"], ["dejarla", "", "leave it", "dejar"], ["en", "", "at"], ["otra", "", "another", "otro"], [".", "", ""]],
        en: "People can take a bike at one station and leave it at another.",
      },
      {
        t: [["Para", "", "in order to", "para"], ["usar", "", "use"], ["el", "", "the"], ["servicio", "", "service"], [",", "", ""], ["hay", "", "(one has to)", "haber"], ["que", "", "(one has to)"], ["pagar", "", "pay"], ["una", "", "a", "uno"], ["cuota", "", "fee"], ["cada", "", "every"], ["año", "", "year"], [".", "", ""]],
        en: "To use the service, you have to pay a fee every year.",
      },
      {
        t: [["En", "", "in", "en"], ["Sevilla", "", "Seville"], [",", "", ""], ["el", "", "the"], ["servicio", "", "service"], ["empezó", "", "started", "empezar"], ["en", "", "in"], ["2007", "", "2007"], [".", "", ""]],
        en: "In Seville, the service started in 2007.",
      },
      {
        t: [["Antes", "", "before", "antes"], [",", "", ""], ["poca", "", "few", "poco"], ["gente", "", "people"], ["iba", "", "went", "ir"], ["en", "", "by"], ["bicicleta", "", "bicycle"], ["por", "", "around"], ["la", "", "the", "el"], ["ciudad", "", "city"], [".", "", ""]],
        en: "Before, few people got around the city by bike.",
      },
      {
        t: [["Ahora", "", "now", "ahora"], ["hay", "", "there are", "haber"], ["muchos", "", "many", "mucho"], ["carriles", "", "lanes", "carril"], ["bici", "", "bike"], ["y", "", "and"], ["miles", "", "thousands", "mil"], ["de", "", "of"], ["personas", "", "people", "persona"], ["los", "", "them", "lo"], ["usan", "", "use", "usar"], ["cada", "", "every"], ["día", "", "day"], [".", "", ""]],
        en: "Now there are many bike lanes, and thousands of people use them every day.",
      },
      {
        t: [["La", "", "the", "el"], ["bicicleta", "", "bicycle"], ["es", "", "is", "ser"], ["rápida", "", "fast", "rápido"], [",", "", ""], ["barata", "", "cheap", "barato"], ["y", "", "and"], ["buena", "", "good", "bueno"], ["para", "", "for"], ["la", "", "the", "el"], ["salud", "", "health"], [".", "", ""]],
        en: "The bike is fast, cheap and good for your health.",
      },
      {
        t: [["Además", "", "also", "además"], [",", "", ""], ["no", "", "not"], ["contamina", "", "pollutes", "contaminar"], ["el", "", "the"], ["aire", "", "air"], [".", "", ""]],
        en: "Also, it doesn't pollute the air.",
      },
      {
        t: [["Sin", "", "(however)", "sin"], ["embargo", "", "however"], [",", "", ""], ["algunas", "", "some", "alguno"], ["personas", "", "people", "persona"], ["piensan", "", "think", "pensar"], ["que", "", "that"], ["las", "", "the", "el"], ["calles", "", "streets", "calle"], ["todavía", "", "still"], ["son", "", "are", "ser"], ["peligrosas", "", "dangerous", "peligroso"], [".", "", ""]],
        en: "However, some people think the streets are still dangerous.",
      },
      {
        t: [["En", "", "in", "en"], ["verano", "", "summer"], [",", "", ""], ["también", "", "also"], ["hace", "", "it is", "hacer"], ["demasiado", "", "too"], ["calor", "", "hot"], ["para", "", "to"], ["ir", "", "go"], ["en", "", "by"], ["bici", "", "bike"], [".", "", ""]],
        en: "In summer, it is also too hot to cycle.",
      },
      {
        t: [["Por", "", "(that's why)", "por"], ["eso", "", "that's why"], [",", "", ""], ["muchos", "", "many", "mucho"], ["ciclistas", "", "cyclists", "ciclista"], ["salen", "", "go out", "salir"], ["temprano", "", "early"], ["por", "", "in"], ["la", "", "the", "el"], ["mañana", "", "morning"], [".", "", ""]],
        en: "That's why many cyclists go out early in the morning.",
      },
    ],
    q: [
      { q: "What can people do with the public bikes?", o: ["Take a bike at one station and leave it at another", "Keep the bike at home for a year", "Ride only on weekends"], a: 0 },
      { q: "When did the service start in Seville?", o: ["In 1997", "In 2007", "In 2017"], a: 1 },
      { q: "Which advantage of the bike is NOT mentioned?", o: ["It is cheap", "It doesn't pollute", "It is quiet", "It is good for your health"], a: 2 },
      { q: "Why do many cyclists go out early in summer?", o: ["The streets are empty", "It is too hot later", "The bikes are cheaper"], a: 1 },
    ],
  },
  {
    id: "es-3-grandmother-letter",
    lv: 3,
    kind: "story",
    title: "La carta de la abuela",
    titleEn: "Grandma's letter",
    s: [
      {
        t: [["Cuando", "", "when", "cuando"], ["Pablo", "", "Pablo"], ["vació", "", "emptied", "vaciar"], ["el", "", "the"], ["piso", "", "flat"], ["de", "", "of"], ["su", "", "his"], ["abuela", "", "grandmother"], [",", "", ""], ["encontró", "", "he found", "encontrar"], ["una", "", "a", "uno"], ["caja", "", "box"], ["de", "", "of"], ["madera", "", "wood"], ["debajo", "", "under"], ["de", "", "(under)"], ["la", "", "the", "el"], ["cama", "", "bed"], [".", "", ""]],
        en: "When Pablo cleared out his grandmother's flat, he found a wooden box under the bed.",
      },
      {
        t: [["Dentro", "", "inside", "dentro"], ["había", "", "there were", "haber"], ["fotos", "", "photos", "foto"], ["antiguas", "", "old", "antiguo"], ["y", "", "and"], ["una", "", "a", "uno"], ["carta", "", "letter"], ["cerrada", "", "sealed", "cerrado"], [".", "", ""]],
        en: "Inside there were old photos and a sealed letter.",
      },
      {
        t: [["La", "", "the", "el"], ["carta", "", "letter"], ["era", "", "was", "ser"], ["de", "", "from"], ["1965", "", "1965"], ["y", "", "and"], ["estaba", "", "was", "estar"], ["dirigida", "", "addressed", "dirigido"], ["a", "", "to"], ["un", "", "a", "uno"], ["hombre", "", "man"], ["llamado", "", "called"], ["Andrés", "", "Andrés"], [".", "", ""]],
        en: "The letter was from 1965 and was addressed to a man called Andrés.",
      },
      {
        t: [["Pablo", "", "Pablo"], ["no", "", "not"], ["conocía", "", "knew", "conocer"], ["ese", "", "that"], ["nombre", "", "name"], [",", "", ""], ["así", "", "so"], ["que", "", "(so)"], ["llamó", "", "he called", "llamar"], ["a", "", "(personal a)"], ["su", "", "his"], ["madre", "", "mother"], [".", "", ""]],
        en: "Pablo didn't know that name, so he called his mother.",
      },
      {
        t: [["Ella", "", "she", "ella"], ["le", "", "him"], ["contó", "", "told", "contar"], ["que", "", "that"], ["Andrés", "", "Andrés"], ["había", "", "had", "haber"], ["sido", "", "been", "ser"], ["el", "", "the"], ["primer", "", "first", "primero"], ["amor", "", "love"], ["de", "", "of"], ["la", "", "the", "el"], ["abuela", "", "grandmother"], [".", "", ""]],
        en: "She told him that Andrés had been his grandmother's first love.",
      },
      {
        t: [["Se", "", "each other", "se"], ["conocieron", "", "they met", "conocer"], ["en", "", "in"], ["un", "", "a", "uno"], ["pueblo", "", "village"], ["de", "", "of"], ["Asturias", "", "Asturias"], [",", "", ""], ["pero", "", "but"], ["él", "", "he"], ["se", "", "(himself)"], ["fue", "", "left", "ir"], ["a", "", "to"], ["trabajar", "", "work"], ["a", "", "to"], ["Alemania", "", "Germany"], [".", "", ""]],
        en: "They met in a village in Asturias, but he left to work in Germany.",
      },
      {
        t: [["La", "", "the", "el"], ["abuela", "", "grandmother"], ["le", "", "to him"], ["escribió", "", "wrote", "escribir"], ["muchas", "", "many", "mucho"], ["veces", "", "times", "vez"], [",", "", ""], ["aunque", "", "although"], ["nunca", "", "never"], ["envió", "", "she sent", "enviar"], ["esta", "", "this", "este"], ["última", "", "last", "último"], ["carta", "", "letter"], [".", "", ""]],
        en: "Grandma wrote to him many times, although she never sent this last letter.",
      },
      {
        t: [["Pablo", "", "Pablo"], ["la", "", "it", "lo"], ["abrió", "", "opened", "abrir"], ["y", "", "and"], ["la", "", "it", "lo"], ["leyó", "", "read", "leer"], ["en", "", "(aloud)"], ["voz", "", "voice"], ["alta", "", "loud", "alto"], ["mientras", "", "while"], ["su", "", "his"], ["madre", "", "mother"], ["escuchaba", "", "listened", "escuchar"], ["en", "", "in"], ["silencio", "", "silence"], [".", "", ""]],
        en: "Pablo opened it and read it aloud while his mother listened in silence.",
      },
      {
        t: [["En", "", "in", "en"], ["la", "", "the", "el"], ["carta", "", "letter"], [",", "", ""], ["la", "", "the", "el"], ["abuela", "", "grandmother"], ["decía", "", "said", "decir"], ["que", "", "that"], ["quería", "", "she wanted", "querer"], ["esperarlo", "", "to wait for him", "esperar"], [",", "", ""], ["pero", "", "but"], ["que", "", "that"], ["tenía", "", "she had", "tener"], ["miedo", "", "fear"], ["del", "", "of the", "de"], ["futuro", "", "future"], [".", "", ""]],
        en: "In the letter, Grandma said that she wanted to wait for him, but that she was afraid of the future.",
      },
      {
        t: [["Sin", "", "(however)", "sin"], ["embargo", "", "however"], [",", "", ""], ["dos", "", "two"], ["años", "", "years", "año"], ["después", "", "later"], [",", "", ""], ["conoció", "", "she met", "conocer"], ["a", "", "(personal a)"], ["otro", "", "another"], ["hombre", "", "man"], [":", "", ""], ["el", "", "the"], ["abuelo", "", "grandfather"], ["de", "", "of"], ["Pablo", "", "Pablo"], [".", "", ""]],
        en: "However, two years later she met another man: Pablo's grandfather.",
      },
      {
        t: [["Su", "", "his", "su"], ["madre", "", "mother"], ["sonrió", "", "smiled", "sonreír"], ["y", "", "and"], ["dijo", "", "said", "decir"], ["que", "", "that"], ["sin", "", "without"], ["esa", "", "that", "ese"], ["decisión", "", "decision"], ["ellos", "", "they"], ["no", "", "not"], ["estarían", "", "would be", "estar"], ["allí", "", "there"], [".", "", ""]],
        en: "His mother smiled and said that without that decision they wouldn't be there.",
      },
      {
        t: [["Pablo", "", "Pablo"], ["guardó", "", "put away", "guardar"], ["la", "", "the", "el"], ["carta", "", "letter"], ["en", "", "in"], ["la", "", "the", "el"], ["caja", "", "box"], ["con", "", "with"], ["mucho", "", "great"], ["cuidado", "", "care"], [".", "", ""]],
        en: "Pablo put the letter back in the box very carefully.",
      },
      {
        t: [["Ahora", "", "now", "ahora"], ["quiere", "", "he wants", "querer"], ["viajar", "", "to travel"], ["a", "", "to"], ["Asturias", "", "Asturias"], ["para", "", "to"], ["conocer", "", "get to know"], ["el", "", "the"], ["pueblo", "", "village"], ["de", "", "of"], ["su", "", "his"], ["abuela", "", "grandmother"], [".", "", ""]],
        en: "Now he wants to travel to Asturias to see his grandmother's village.",
      },
    ],
    q: [
      { q: "Where did Pablo find the box?", o: ["In the kitchen", "Under the bed", "In the garden"], a: 1 },
      { q: "Who was Andrés?", o: ["Pablo's grandfather", "His grandmother's first love", "A neighbour from Germany"], a: 1 },
      { q: "Why did Andrés leave the village?", o: ["To work in Germany", "To study in Madrid", "To get married"], a: 0 },
      { q: "What did Pablo's mother say about the decision?", o: ["It was a mistake", "Without it, they wouldn't be there", "She didn't know about it"], a: 1 },
      { q: "What does Pablo want to do now?", o: ["Send the letter", "Sell the flat", "Travel to Asturias"], a: 2 },
    ],
  },
  {
    id: "es-3-siesta",
    lv: 3,
    kind: "article",
    title: "La siesta: mito y realidad",
    titleEn: "The siesta: myth and reality",
    s: [
      {
        t: [["Mucha", "", "many", "mucho"], ["gente", "", "people"], ["fuera", "", "outside"], ["de", "", "of"], ["España", "", "Spain"], ["cree", "", "believe", "creer"], ["que", "", "that"], ["todos", "", "all", "todo"], ["los", "", "the", "el"], ["españoles", "", "Spaniards", "español"], ["duermen", "", "sleep", "dormir"], ["la", "", "the", "el"], ["siesta", "", "siesta"], ["cada", "", "every"], ["día", "", "day"], [".", "", ""]],
        en: "Many people outside Spain believe that all Spaniards have a siesta every day.",
      },
      {
        t: [["Sin", "", "(however)", "sin"], ["embargo", "", "however"], [",", "", ""], ["según", "", "according to"], ["varias", "", "several", "varios"], ["encuestas", "", "surveys", "encuesta"], [",", "", ""], ["solo", "", "only"], ["una", "", "a", "uno"], ["minoría", "", "minority"], ["lo", "", "it"], ["hace", "", "does", "hacer"], ["de", "", "(regularly)"], ["forma", "", "way"], ["habitual", "", "regular"], [".", "", ""]],
        en: "However, according to several surveys, only a minority does it regularly.",
      },
      {
        t: [["La", "", "the", "el"], ["siesta", "", "siesta"], ["tiene", "", "has", "tener"], ["una", "", "a", "uno"], ["larga", "", "long", "largo"], ["historia", "", "history"], ["en", "", "in"], ["los", "", "the", "el"], ["países", "", "countries", "país"], ["mediterráneos", "", "Mediterranean", "mediterráneo"], [",", "", ""], ["donde", "", "where"], ["hace", "", "it is", "hacer"], ["mucho", "", "very"], ["calor", "", "hot"], ["después", "", "after"], ["de", "", "(after)"], ["comer", "", "lunch"], [".", "", ""]],
        en: "The siesta has a long history in Mediterranean countries, where it is very hot after lunch.",
      },
      {
        t: [["Antiguamente", "", "in the past", "antiguamente"], [",", "", ""], ["los", "", "the", "el"], ["trabajadores", "", "workers", "trabajador"], ["del", "", "of the", "de"], ["campo", "", "countryside"], ["descansaban", "", "rested", "descansar"], ["durante", "", "during"], ["las", "", "the", "el"], ["horas", "", "hours", "hora"], ["más", "", "most"], ["calurosas", "", "hot", "caluroso"], [".", "", ""]],
        en: "In the past, farm workers rested during the hottest hours.",
      },
      {
        t: [["Hoy", "", "today", "hoy"], ["en", "", "(nowadays)"], ["día", "", "(nowadays)"], [",", "", ""], ["la", "", "the", "el"], ["mayoría", "", "majority"], ["de", "", "of"], ["las", "", "the", "el"], ["personas", "", "people", "persona"], ["trabaja", "", "works", "trabajar"], ["con", "", "with"], ["horarios", "", "schedules", "horario"], ["que", "", "that"], ["no", "", "not"], ["permiten", "", "allow", "permitir"], ["dormir", "", "to sleep"], ["a", "", "at"], ["mediodía", "", "midday"], [".", "", ""]],
        en: "Nowadays, most people work schedules that don't allow them to sleep at midday.",
      },
      {
        t: [["Aun", "", "even", "aun"], ["así", "", "so"], [",", "", ""], ["muchos", "", "many", "mucho"], ["médicos", "", "doctors", "médico"], ["recomiendan", "", "recommend", "recomendar"], ["una", "", "a", "uno"], ["siesta", "", "nap"], ["corta", "", "short", "corto"], [".", "", ""]],
        en: "Even so, many doctors recommend a short nap.",
      },
      {
        t: [["Según", "", "according to", "según"], ["los", "", "the", "el"], ["expertos", "", "experts", "experto"], [",", "", ""], ["veinte", "", "twenty"], ["minutos", "", "minutes", "minuto"], ["son", "", "are", "ser"], ["suficientes", "", "enough", "suficiente"], ["para", "", "to"], ["recuperar", "", "recover"], ["energía", "", "energy"], [".", "", ""]],
        en: "According to experts, twenty minutes are enough to recover energy.",
      },
      {
        t: [["Si", "", "if", "si"], ["la", "", "the", "el"], ["siesta", "", "nap"], ["dura", "", "lasts", "durar"], ["demasiado", "", "too long"], [",", "", ""], ["es", "", "it is", "ser"], ["normal", "", "normal"], ["despertarse", "", "to wake up"], ["más", "", "more"], ["cansado", "", "tired"], [".", "", ""]],
        en: "If the nap lasts too long, it is normal to wake up more tired.",
      },
      {
        t: [["Además", "", "also", "además"], [",", "", ""], ["una", "", "a", "uno"], ["siesta", "", "nap"], ["larga", "", "long", "largo"], ["puede", "", "can", "poder"], ["hacer", "", "make"], ["más", "", "more"], ["difícil", "", "difficult"], ["dormir", "", "sleeping"], ["por", "", "at"], ["la", "", "the", "el"], ["noche", "", "night"], [".", "", ""]],
        en: "Also, a long nap can make it harder to sleep at night.",
      },
      {
        t: [["En", "", "in", "en"], ["algunos", "", "some", "alguno"], ["países", "", "countries", "país"], [",", "", ""], ["ciertas", "", "certain", "cierto"], ["empresas", "", "companies", "empresa"], ["ya", "", "already"], ["tienen", "", "have", "tener"], ["salas", "", "rooms", "sala"], ["especiales", "", "special", "especial"], ["para", "", "for"], ["descansar", "", "resting"], [".", "", ""]],
        en: "In some countries, certain companies already have special rooms for resting.",
      },
      {
        t: [["Por", "", "(that's why)", "por"], ["eso", "", "that's why"], [",", "", ""], ["algunos", "", "some people", "alguno"], ["dicen", "", "say", "decir"], ["que", "", "that"], ["esta", "", "this", "este"], ["costumbre", "", "custom"], ["tan", "", "so"], ["antigua", "", "old", "antiguo"], ["se", "", "(itself)"], ["está", "", "is", "estar"], ["poniendo", "", "becoming", "poner"], ["de", "", "(in fashion)"], ["moda", "", "fashion"], ["otra", "", "again", "otro"], ["vez", "", "time"], [".", "", ""]],
        en: "That's why some say that this very old custom is becoming fashionable again.",
      },
      {
        t: [["Quizás", "", "perhaps", "quizás"], ["en", "", "in"], ["el", "", "the"], ["futuro", "", "future"], ["una", "", "a", "uno"], ["siesta", "", "nap"], ["corta", "", "short", "corto"], ["sea", "", "is", "ser"], ["normal", "", "normal"], ["en", "", "in"], ["todo", "", "the whole"], ["el", "", "the"], ["mundo", "", "world"], [".", "", ""]],
        en: "Perhaps in the future a short nap will be normal all over the world.",
      },
    ],
    q: [
      { q: "What do many people outside Spain believe?", o: ["That all Spaniards have a siesta every day", "That the siesta is forbidden in Spain", "That Spaniards don't like sleeping"], a: 0 },
      { q: "According to surveys, how many Spaniards have a siesta regularly?", o: ["Almost everyone", "Only a minority", "Nobody"], a: 1 },
      { q: "How long should a nap be, according to experts?", o: ["Two hours", "One hour", "Twenty minutes"], a: 2 },
      { q: "What can happen if a nap is too long?", o: ["You can wake up more tired", "You lose weight", "You sleep better at night"], a: 0 },
      { q: "What do some companies in other countries already have?", o: ["Longer lunch breaks", "Special rooms for resting", "Free coffee"], a: 1 },
    ],
  },
];

export default data;
