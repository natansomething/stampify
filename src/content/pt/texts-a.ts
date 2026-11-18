import type { Text } from '../types';

const data: Text[] = [
  {
    id: "pt-1-feira",
    lv: 1,
    kind: "story",
    title: "Domingo na feira",
    titleEn: "Sunday at the street market",
    s: [
      {
        t: [["Marina", "", "Marina"], ["mora", "", "lives", "morar"], ["em", "", "in"], ["São Paulo", "", "São Paulo"], ["com", "", "with"], ["o", "", "the; her"], ["marido", "", "husband"], [".", "", ""]],
        en: "Marina lives in São Paulo with her husband.",
      },
      {
        t: [["Todo", "", "every", "todo"], ["domingo", "", "Sunday"], [",", "", ""], ["ela", "", "she"], ["vai", "", "goes", "ir"], ["à", "", "to the", "a"], ["feira", "", "street market"], [".", "", ""]],
        en: "Every Sunday, she goes to the street market.",
      },
      {
        t: [["A", "", "the", "o"], ["feira", "", "street market"], ["fica", "", "is (located)", "ficar"], ["perto", "", "near"], ["da", "", "of the", "de"], ["casa", "", "house"], ["dela", "", "her"], [".", "", ""]],
        en: "The market is near her house.",
      },
      {
        t: [["Lá", "", "there", "lá"], ["tem", "", "there is; there are", "ter"], ["frutas", "", "fruit", "fruta"], [",", "", ""], ["legumes", "", "vegetables", "legume"], ["e", "", "and"], ["flores", "", "flowers", "flor"], [".", "", ""]],
        en: "There is fruit, vegetables and flowers there.",
      },
      {
        t: [["Marina", "", "Marina"], ["compra", "", "buys", "comprar"], ["bananas", "", "bananas", "banana"], [",", "", ""], ["mangas", "", "mangoes", "manga"], ["e", "", "and"], ["um", "", "a"], ["abacaxi", "", "pineapple"], [".", "", ""]],
        en: "Marina buys bananas, mangoes and a pineapple.",
      },
      {
        t: [["Ela", "", "she", "ela"], ["também", "", "also"], ["come", "", "eats", "comer"], ["um", "", "a"], ["pastel", "", "pastel (fried pastry)"], [".", "", ""]],
        en: "She also eats a pastel.",
      },
      {
        t: [["O", "", "the", "o"], ["pastel", "", "pastel"], ["é", "", "is", "ser"], ["de", "", "(made) of"], ["queijo", "", "cheese"], ["e", "", "and"], ["custa", "", "costs", "custar"], ["oito", "", "eight"], ["reais", "", "reais", "real"], [".", "", ""]],
        en: "The pastel is a cheese one and costs eight reais.",
      },
      {
        t: [["O", "", "the", "o"], ["vendedor", "", "seller"], ["é", "", "is", "ser"], ["simpático", "", "friendly"], ["e", "", "and"], ["conversa", "", "chats", "conversar"], ["com", "", "with"], ["ela", "", "her"], [".", "", ""]],
        en: "The seller is friendly and chats with her.",
      },
      {
        t: [["Depois", "", "afterwards", "depois"], [",", "", ""], ["Marina", "", "Marina"], ["volta", "", "goes back", "voltar"], ["para", "", "to"], ["casa", "", "home"], ["a", "", "on"], ["pé", "", "foot"], [".", "", ""]],
        en: "Afterwards, Marina walks back home.",
      },
      {
        t: [["Ela", "", "she", "ela"], ["está", "", "is", "estar"], ["feliz", "", "happy"], ["com", "", "with"], ["as", "", "the", "o"], ["compras", "", "shopping; purchases", "compra"], [".", "", ""]],
        en: "She is happy with her shopping.",
      },
    ],
    q: [
      { q: "Where does Marina live?", o: ["In Rio de Janeiro", "In São Paulo", "In Salvador"], a: 1 },
      { q: "When does she go to the market?", o: ["Every Saturday", "Every Sunday", "Every day"], a: 1 },
      { q: "How much does the pastel cost?", o: ["Six reais", "Ten reais", "Eight reais"], a: 2 },
      { q: "How does Marina go home?", o: ["On foot", "By bus", "By car"], a: 0 },
    ],
  },
  {
    id: "pt-1-padaria",
    lv: 1,
    kind: "article",
    title: "O café da manhã no Brasil",
    titleEn: "Breakfast in Brazil",
    s: [
      {
        t: [["No", "", "in the", "em"], ["Brasil", "", "Brazil"], [",", "", ""], ["o", "", "the"], ["café da manhã", "", "breakfast"], ["é", "", "is", "ser"], ["simples", "", "simple"], [".", "", ""]],
        en: "In Brazil, breakfast is simple.",
      },
      {
        t: [["Muitas", "", "many", "muito"], ["pessoas", "", "people", "pessoa"], ["comem", "", "eat", "comer"], ["pão francês", "", "French roll"], ["com", "", "with"], ["manteiga", "", "butter"], [".", "", ""]],
        en: "Many people eat a French roll with butter.",
      },
      {
        t: [["O", "", "the", "o"], ["pão francês", "", "French roll"], ["é", "", "is", "ser"], ["pequeno", "", "small"], ["e", "", "and"], ["barato", "", "cheap"], [".", "", ""]],
        en: "The French roll is small and cheap.",
      },
      {
        t: [["As", "", "the", "o"], ["pessoas", "", "people", "pessoa"], ["também", "", "also"], ["tomam", "", "drink", "tomar"], ["café", "", "coffee"], ["com", "", "with"], ["leite", "", "milk"], [".", "", ""]],
        en: "People also drink coffee with milk.",
      },
      {
        t: [["Muitos", "", "many", "muito"], ["brasileiros", "", "Brazilians", "brasileiro"], ["tomam", "", "drink", "tomar"], ["o", "", "the"], ["café", "", "coffee"], ["bem", "", "very"], ["doce", "", "sweet"], [".", "", ""]],
        en: "Many Brazilians drink their coffee very sweet.",
      },
      {
        t: [["Algumas", "", "some", "algum"], ["pessoas", "", "people", "pessoa"], ["comem", "", "eat", "comer"], ["frutas", "", "fruit", "fruta"], [",", "", ""], ["como", "", "like"], ["mamão", "", "papaya"], ["e", "", "and"], ["banana", "", "banana"], [".", "", ""]],
        en: "Some people eat fruit, like papaya and banana.",
      },
      {
        t: [["A", "", "the", "o"], ["padaria", "", "bakery"], ["abre", "", "opens", "abrir"], ["cedo", "", "early"], [",", "", ""], ["às", "", "at", "a"], ["seis", "", "six"], ["horas", "", "o'clock", "hora"], [".", "", ""]],
        en: "The bakery opens early, at six o'clock.",
      },
      {
        t: [["Muitos", "", "many", "muito"], ["trabalhadores", "", "workers", "trabalhador"], ["tomam", "", "have", "tomar"], ["café", "", "breakfast; coffee"], ["lá", "", "there"], ["antes", "", "before"], ["do", "", "of the", "de"], ["trabalho", "", "work"], [".", "", ""]],
        en: "Many workers have breakfast there before work.",
      },
      {
        t: [["Eles", "", "they", "ele"], ["comem", "", "eat", "comer"], ["no", "", "at the", "em"], ["balcão", "", "counter"], ["e", "", "and"], ["conversam", "", "chat", "conversar"], ["um", "", "a"], ["pouco", "", "little"], [".", "", ""]],
        en: "They eat at the counter and chat a little.",
      },
      {
        t: [["É", "", "it is", "ser"], ["rápido", "", "quick"], [",", "", ""], ["barato", "", "cheap"], ["e", "", "and"], ["muito", "", "very"], ["gostoso", "", "tasty"], ["!", "", ""]],
        en: "It's quick, cheap and very tasty!",
      },
    ],
    q: [
      { q: "What do many people eat for breakfast?", o: ["Eggs and bacon", "A French roll with butter", "Rice and beans"], a: 1 },
      { q: "How do many Brazilians drink their coffee?", o: ["Very sweet", "Without milk or sugar", "Cold"], a: 0 },
      { q: "When does the bakery open?", o: ["At eight o'clock", "At noon", "At six o'clock"], a: 2 },
      { q: "Where do the workers eat?", o: ["At the counter", "At home", "In the office"], a: 0 },
    ],
  },
  {
    id: "pt-2-entrevista",
    lv: 2,
    kind: "story",
    title: "Um dia de sorte",
    titleEn: "A lucky day",
    s: [
      {
        t: [["Ontem", "", "yesterday", "ontem"], ["Lucas", "", "Lucas"], ["acordou", "", "woke up", "acordar"], ["tarde", "", "late"], [".", "", ""]],
        en: "Yesterday Lucas woke up late.",
      },
      {
        t: [["Ele", "", "he", "ele"], ["tinha", "", "had", "ter"], ["uma", "", "a", "um"], ["entrevista", "", "interview"], ["de", "", "for"], ["emprego", "", "job"], ["às", "", "at", "a"], ["nove", "", "nine"], ["horas", "", "o'clock", "hora"], [".", "", ""]],
        en: "He had a job interview at nine o'clock.",
      },
      {
        t: [["Ele", "", "he", "ele"], ["tomou", "", "took", "tomar"], ["um", "", "a"], ["banho", "", "shower"], ["rápido", "", "quick"], ["e", "", "and"], ["saiu", "", "left", "sair"], ["de", "", "from"], ["casa", "", "home"], ["sem", "", "without"], ["café", "", "coffee; breakfast"], [".", "", ""]],
        en: "He took a quick shower and left home without breakfast.",
      },
      {
        t: [["No", "", "at the", "em"], ["ponto", "", "stop"], ["de", "", "of"], ["ônibus", "", "bus"], [",", "", ""], ["ele", "", "he"], ["esperou", "", "waited", "esperar"], ["vinte", "", "twenty"], ["minutos", "", "minutes", "minuto"], [".", "", ""]],
        en: "At the bus stop, he waited twenty minutes.",
      },
      {
        t: [["O", "", "the", "o"], ["ônibus", "", "bus"], ["chegou", "", "arrived", "chegar"], ["muito", "", "very"], ["cheio", "", "full"], [",", "", ""], ["e", "", "and"], ["Lucas", "", "Lucas"], ["viajou", "", "travelled", "viajar"], ["em", "", "on"], ["pé", "", "foot (standing)"], [".", "", ""]],
        en: "The bus arrived very full, and Lucas travelled standing up.",
      },
      {
        t: [["Ele", "", "he", "ele"], ["chegou", "", "arrived", "chegar"], ["ao", "", "at the", "a"], ["escritório", "", "office"], ["às", "", "at", "a"], ["nove", "", "nine"], ["e", "", "and"], ["quinze", "", "fifteen"], [".", "", ""]],
        en: "He arrived at the office at a quarter past nine.",
      },
      {
        t: [["Ele", "", "he", "ele"], ["estava", "", "was", "estar"], ["muito", "", "very"], ["nervoso", "", "nervous"], [",", "", ""], ["mas", "", "but"], ["a", "", "the", "o"], ["recepcionista", "", "receptionist"], ["sorriu", "", "smiled", "sorrir"], [".", "", ""]],
        en: "He was very nervous, but the receptionist smiled.",
      },
      {
        t: [["A", "", "the", "o"], ["entrevistadora", "", "interviewer", "entrevistador"], ["também", "", "also"], ["estava", "", "was", "estar"], ["atrasada", "", "late", "atrasado"], ["por", "", "because of"], ["causa", "", "(because of)"], ["do", "", "the", "de"], ["trânsito", "", "traffic"], [".", "", ""]],
        en: "The interviewer was also late because of the traffic.",
      },
      {
        t: [["Lucas", "", "Lucas"], ["se", "", "(himself)"], ["sentou", "", "sat down", "sentar"], ["e", "", "and"], ["tomou", "", "drank", "tomar"], ["um", "", "a"], ["copo", "", "glass"], ["de", "", "of"], ["água", "", "water"], [".", "", ""]],
        en: "Lucas sat down and drank a glass of water.",
      },
      {
        t: [["Dez", "", "ten", "dez"], ["minutos", "", "minutes", "minuto"], ["depois", "", "later"], [",", "", ""], ["a", "", "the", "o"], ["entrevista", "", "interview"], ["começou", "", "started", "começar"], [".", "", ""]],
        en: "Ten minutes later, the interview started.",
      },
      {
        t: [["Ela", "", "it", "ela"], ["foi", "", "went", "ir"], ["muito", "", "very"], ["bem", "", "well"], [",", "", ""], ["e", "", "and"], ["Lucas", "", "Lucas"], ["voltou", "", "returned", "voltar"], ["para", "", "to"], ["casa", "", "home"], ["tranquilo", "", "calm"], [".", "", ""]],
        en: "It went very well, and Lucas went home feeling calm.",
      },
      {
        t: [["Uma", "", "one", "um"], ["semana", "", "week"], ["depois", "", "later"], [",", "", ""], ["ele", "", "he"], ["recebeu", "", "received", "receber"], ["uma", "", "a", "um"], ["boa", "", "good", "bom"], ["notícia", "", "(piece of) news"], [":", "", ""], ["o", "", "the"], ["emprego", "", "job"], ["era", "", "was", "ser"], ["dele", "", "his"], ["!", "", ""]],
        en: "A week later, he got some good news: the job was his!",
      },
    ],
    q: [
      { q: "Why was Lucas in a hurry?", o: ["He had a job interview", "He had a flight", "He had a doctor's appointment"], a: 0 },
      { q: "How long did he wait at the bus stop?", o: ["Five minutes", "Twenty minutes", "An hour"], a: 1 },
      { q: "Why was the interviewer late?", o: ["She was ill", "She forgot", "Because of the traffic"], a: 2 },
      { q: "What happened a week later?", o: ["He got the job", "He had a second interview", "He moved house"], a: 0 },
    ],
  },
  {
    id: "pt-2-praia",
    lv: 2,
    kind: "article",
    title: "Um dia de praia no Rio",
    titleEn: "A beach day in Rio",
    s: [
      {
        t: [["O", "", "the", "o"], ["Rio de Janeiro", "", "Rio de Janeiro"], ["tem", "", "has", "ter"], ["praias", "", "beaches", "praia"], ["muito", "", "very"], ["famosas", "", "famous", "famoso"], [".", "", ""]],
        en: "Rio de Janeiro has very famous beaches.",
      },
      {
        t: [["As", "", "the", "o"], ["mais", "", "most"], ["conhecidas", "", "well-known", "conhecido"], ["são", "", "are", "ser"], ["Copacabana", "", "Copacabana"], ["e", "", "and"], ["Ipanema", "", "Ipanema"], [".", "", ""]],
        en: "The best known are Copacabana and Ipanema.",
      },
      {
        t: [["Nos", "", "on the", "em"], ["fins de semana", "", "weekends", "fim de semana"], [",", "", ""], ["as", "", "the", "o"], ["praias", "", "beaches", "praia"], ["ficam", "", "get", "ficar"], ["cheias", "", "full", "cheio"], ["de", "", "of"], ["gente", "", "people"], [".", "", ""]],
        en: "At weekends, the beaches get full of people.",
      },
      {
        t: [["As", "", "the", "o"], ["pessoas", "", "people", "pessoa"], ["vão", "", "go", "ir"], ["à", "", "to the", "a"], ["praia", "", "beach"], ["para", "", "to"], ["nadar", "", "swim"], [",", "", ""], ["jogar", "", "play"], ["vôlei", "", "volleyball"], ["ou", "", "or"], ["só", "", "just"], ["descansar", "", "rest"], [".", "", ""]],
        en: "People go to the beach to swim, play volleyball or just rest.",
      },
      {
        t: [["Muitos", "", "many", "muito"], ["cariocas", "", "people from Rio", "carioca"], ["correm", "", "run", "correr"], ["no", "", "on the", "em"], ["calçadão", "", "seafront promenade"], ["de", "", "in the"], ["manhã", "", "morning"], ["cedo", "", "early"], [".", "", ""]],
        en: "Many cariocas go running on the promenade early in the morning.",
      },
      {
        t: [["Na", "", "on the", "em"], ["areia", "", "sand"], [",", "", ""], ["os", "", "the", "o"], ["vendedores", "", "vendors", "vendedor"], ["vendem", "", "sell", "vender"], ["água de coco", "", "coconut water"], [",", "", ""], ["mate", "", "iced mate tea"], ["e", "", "and"], ["biscoito", "", "crackers"], ["de", "", "of"], ["polvilho", "", "cassava starch"], [".", "", ""]],
        en: "On the sand, vendors sell coconut water, iced mate and cassava crackers.",
      },
      {
        t: [["Os", "", "the", "o"], ["turistas", "", "tourists", "turista"], ["adoram", "", "love", "adorar"], ["experimentar", "", "to try"], ["essas", "", "these", "esse"], ["coisas", "", "things", "coisa"], [".", "", ""]],
        en: "Tourists love trying these things.",
      },
      {
        t: [["É", "", "it is", "ser"], ["importante", "", "important"], ["usar", "", "to use"], ["protetor solar", "", "sunscreen"], [",", "", ""], ["porque", "", "because"], ["o", "", "the"], ["sol", "", "sun"], ["é", "", "is", "ser"], ["muito", "", "very"], ["forte", "", "strong"], [".", "", ""]],
        en: "It's important to wear sunscreen, because the sun is very strong.",
      },
      {
        t: [["Também", "", "also", "também"], ["é", "", "it is", "ser"], ["bom", "", "good"], ["beber", "", "to drink"], ["bastante", "", "plenty of"], ["água", "", "water"], [".", "", ""]],
        en: "It's also good to drink plenty of water.",
      },
      {
        t: [["No", "", "at the", "em"], ["fim", "", "end"], ["da", "", "of the", "de"], ["tarde", "", "afternoon"], [",", "", ""], ["muita", "", "a lot of", "muito"], ["gente", "", "people"], ["fica", "", "stays", "ficar"], ["para", "", "to"], ["ver", "", "see"], ["o", "", "the"], ["pôr do sol", "", "sunset"], [".", "", ""]],
        en: "In the late afternoon, a lot of people stay to watch the sunset.",
      },
      {
        t: [["Em", "", "in", "em"], ["Ipanema", "", "Ipanema"], [",", "", ""], ["as", "", "the", "o"], ["pessoas", "", "people", "pessoa"], ["aplaudem", "", "applaud", "aplaudir"], ["quando", "", "when"], ["o", "", "the"], ["sol", "", "sun"], ["desaparece", "", "disappears", "desaparecer"], [".", "", ""]],
        en: "In Ipanema, people clap when the sun disappears.",
      },
      {
        t: [["É", "", "it is", "ser"], ["um", "", "a"], ["momento", "", "moment"], ["simples", "", "simple"], [",", "", ""], ["mas", "", "but"], ["muito", "", "very"], ["especial", "", "special"], [".", "", ""]],
        en: "It's a simple moment, but a very special one.",
      },
    ],
    q: [
      { q: "Which are the best-known beaches in Rio?", o: ["Copacabana and Ipanema", "Leblon and Barra", "Copacabana and Leme"], a: 0 },
      { q: "What do many cariocas do early in the morning?", o: ["Sell coconut water", "Go running on the promenade", "Play volleyball on the sand"], a: 1 },
      { q: "Why is sunscreen important?", o: ["The water is cold", "The sun is very strong", "The sand is hot"], a: 1 },
      { q: "What do people in Ipanema do at sunset?", o: ["They sing", "They go home", "They clap"], a: 2 },
    ],
  },
  {
    id: "pt-3-vizinha",
    lv: 3,
    kind: "story",
    title: "A vizinha do terceiro andar",
    titleEn: "The neighbour on the third floor",
    s: [
      {
        t: [["Quando", "", "when", "quando"], ["Rafael", "", "Rafael"], ["se", "", "(himself)"], ["mudou", "", "moved", "mudar"], ["para", "", "to"], ["Belo Horizonte", "", "Belo Horizonte"], [",", "", ""], ["não", "", "not"], ["conhecia", "", "knew", "conhecer"], ["ninguém", "", "anyone"], ["na", "", "in the", "em"], ["cidade", "", "city"], [".", "", ""]],
        en: "When Rafael moved to Belo Horizonte, he didn't know anyone in the city.",
      },
      {
        t: [["Ele", "", "he", "ele"], ["tinha", "", "had", "ter"], ["conseguido", "", "got", "conseguir"], ["um", "", "a"], ["emprego", "", "job"], ["numa", "", "in a", "em"], ["empresa", "", "company"], ["de", "", "of"], ["tecnologia", "", "technology"], ["e", "", "and"], ["trabalhava", "", "worked", "trabalhar"], ["o", "", "the"], ["dia", "", "day"], ["inteiro", "", "whole"], [".", "", ""]],
        en: "He had got a job at a tech company and worked all day long.",
      },
      {
        t: [["À", "", "at", "a"], ["noite", "", "night"], [",", "", ""], ["voltava", "", "(he) returned", "voltar"], ["para", "", "to"], ["o", "", "the"], ["apartamento", "", "flat"], ["cansado", "", "tired"], ["e", "", "and"], ["sozinho", "", "alone"], [".", "", ""]],
        en: "At night he would go back to the flat tired and alone.",
      },
      {
        t: [["Um", "", "one", "um"], ["dia", "", "day"], [",", "", ""], ["ele", "", "he"], ["encontrou", "", "met", "encontrar"], ["a", "", "the", "o"], ["vizinha", "", "neighbour", "vizinho"], ["do", "", "of the", "de"], ["terceiro", "", "third"], ["andar", "", "floor"], ["no", "", "in the", "em"], ["elevador", "", "lift"], [".", "", ""]],
        en: "One day he met the neighbour from the third floor in the lift.",
      },
      {
        t: [["Ela", "", "she", "ela"], ["se", "", "(herself)"], ["chamava", "", "was called", "chamar"], ["Dona", "", "Mrs (respectful title)", "dona"], ["Célia", "", "Célia"], ["e", "", "and"], ["era", "", "was", "ser"], ["professora", "", "teacher", "professor"], ["aposentada", "", "retired", "aposentado"], [".", "", ""]],
        en: "Her name was Dona Célia and she was a retired teacher.",
      },
      {
        t: [["Dona", "", "Mrs", "dona"], ["Célia", "", "Célia"], ["sorriu", "", "smiled", "sorrir"], ["e", "", "and"], ["o", "", "him"], ["convidou", "", "invited", "convidar"], ["para", "", "to"], ["tomar", "", "have"], ["um", "", "a"], ["café", "", "coffee"], [".", "", ""]],
        en: "Dona Célia smiled and invited him for a coffee.",
      },
      {
        t: [["Na", "", "in the", "em"], ["casa", "", "house"], ["dela", "", "her"], [",", "", ""], ["havia", "", "there was", "haver"], ["pão de queijo", "", "cheese bread"], ["quentinho", "", "nice and warm", "quente"], ["e", "", "and"], ["uma", "", "a", "um"], ["toalha", "", "cloth"], ["de", "", "of"], ["mesa", "", "table"], ["bordada", "", "embroidered", "bordado"], [".", "", ""]],
        en: "At her place there was warm cheese bread and an embroidered tablecloth.",
      },
      {
        t: [["Eles", "", "they", "ele"], ["conversaram", "", "talked", "conversar"], ["por", "", "for"], ["duas", "", "two", "dois"], ["horas", "", "hours", "hora"], ["sobre", "", "about"], ["a", "", "the", "o"], ["cidade", "", "city"], [",", "", ""], ["a", "", "the", "o"], ["comida", "", "food"], ["mineira", "", "from Minas Gerais", "mineiro"], ["e", "", "and"], ["a", "", "the", "o"], ["família", "", "family"], ["dela", "", "her"], [".", "", ""]],
        en: "They talked for two hours about the city, Minas Gerais food and her family.",
      },
      {
        t: [["Depois", "", "after", "depois"], ["daquele", "", "that", "de"], ["dia", "", "day"], [",", "", ""], ["ela", "", "she"], ["passou", "", "started", "passar"], ["a", "", "to"], ["mostrar", "", "show"], ["a", "", "the", "o"], ["cidade", "", "city"], ["para", "", "to"], ["ele", "", "him"], [".", "", ""]],
        en: "After that day, she started showing him the city.",
      },
      {
        t: [["Ela", "", "she", "ela"], ["o", "", "him"], ["levou", "", "took", "levar"], ["ao", "", "to the", "a"], ["Mercado Central", "", "Central Market"], ["e", "", "and"], ["a", "", "to"], ["vários", "", "several"], ["bares", "", "bars", "bar"], ["tradicionais", "", "traditional", "tradicional"], [".", "", ""]],
        en: "She took him to the Central Market and to several traditional bars.",
      },
      {
        t: [["No", "", "in the", "em"], ["inverno", "", "winter"], [",", "", ""], ["Rafael", "", "Rafael"], ["ficou", "", "got", "ficar"], ["gripado", "", "down with flu"], ["e", "", "and"], ["não", "", "not"], ["conseguiu", "", "could", "conseguir"], ["ir", "", "go"], ["trabalhar", "", "to work"], [".", "", ""]],
        en: "In winter, Rafael got the flu and couldn't go to work.",
      },
      {
        t: [["Dona", "", "Mrs", "dona"], ["Célia", "", "Célia"], ["apareceu", "", "turned up", "aparecer"], ["na", "", "at the", "em"], ["porta", "", "door"], ["com", "", "with"], ["uma", "", "a", "um"], ["sopa", "", "soup"], ["e", "", "and"], ["um", "", "a"], ["chá", "", "tea"], ["de", "", "of"], ["gengibre", "", "ginger"], [".", "", ""]],
        en: "Dona Célia turned up at the door with soup and a ginger tea.",
      },
      {
        t: [["Hoje", "", "today", "hoje"], [",", "", ""], ["os", "", "the", "o"], ["dois", "", "two"], ["são", "", "are", "ser"], ["grandes", "", "great", "grande"], ["amigos", "", "friends", "amigo"], [".", "", ""]],
        en: "Today the two of them are great friends.",
      },
      {
        t: [["Todo", "", "every", "todo"], ["domingo", "", "Sunday"], [",", "", ""], ["eles", "", "they"], ["cozinham", "", "cook", "cozinhar"], ["juntos", "", "together", "junto"], ["e", "", "and"], ["Rafael", "", "Rafael"], ["aprende", "", "learns", "aprender"], ["uma", "", "a", "um"], ["receita", "", "recipe"], ["nova", "", "new", "novo"], [".", "", ""]],
        en: "Every Sunday they cook together and Rafael learns a new recipe.",
      },
    ],
    q: [
      { q: "Why did Rafael move to Belo Horizonte?", o: ["To study", "For a job at a tech company", "To live near his family"], a: 1 },
      { q: "Who was Dona Célia?", o: ["A retired teacher", "His boss", "A doctor"], a: 0 },
      { q: "What did Dona Célia bring when Rafael was ill?", o: ["Medicine and fruit", "Cheese bread", "Soup and ginger tea"], a: 2 },
      { q: "What do they do on Sundays now?", o: ["They go to the market", "They cook together", "They watch football"], a: 1 },
    ],
  },
  {
    id: "pt-3-sono",
    lv: 3,
    kind: "article",
    title: "Por que dormimos mal?",
    titleEn: "Why do we sleep badly?",
    s: [
      {
        t: [["Muitas", "", "many", "muito"], ["pessoas", "", "people", "pessoa"], ["dizem", "", "say", "dizer"], ["que", "", "that"], ["dormem", "", "(they) sleep", "dormir"], ["mal", "", "badly"], ["ou", "", "or"], ["que", "", "that"], ["acordam", "", "(they) wake up", "acordar"], ["cansadas", "", "tired", "cansado"], [".", "", ""]],
        en: "Many people say they sleep badly or wake up tired.",
      },
      {
        t: [["Segundo", "", "according to", "segundo"], ["os", "", "the", "o"], ["especialistas", "", "experts", "especialista"], [",", "", ""], ["um", "", "an"], ["adulto", "", "adult"], ["precisa", "", "needs", "precisar"], ["de", "", "(of)"], ["sete", "", "seven"], ["a", "", "to"], ["nove", "", "nine"], ["horas", "", "hours", "hora"], ["de", "", "of"], ["sono", "", "sleep"], ["por", "", "per"], ["noite", "", "night"], [".", "", ""]],
        en: "According to experts, an adult needs seven to nine hours of sleep a night.",
      },
      {
        t: [["No entanto", "", "however", "no entanto"], [",", "", ""], ["a", "", "the", "o"], ["vida", "", "life"], ["moderna", "", "modern", "moderno"], ["dificulta", "", "makes difficult", "dificultar"], ["esse", "", "this"], ["descanso", "", "rest"], [".", "", ""]],
        en: "However, modern life makes this rest difficult.",
      },
      {
        t: [["Um", "", "one", "um"], ["dos", "", "of the", "de"], ["principais", "", "main", "principal"], ["problemas", "", "problems", "problema"], ["é", "", "is", "ser"], ["o", "", "the"], ["uso", "", "use"], ["do", "", "of the", "de"], ["celular", "", "mobile phone"], ["antes", "", "before"], ["de", "", "(before)"], ["dormir", "", "sleeping"], [".", "", ""]],
        en: "One of the main problems is using your phone before going to sleep.",
      },
      {
        t: [["A", "", "the", "o"], ["luz", "", "light"], ["da", "", "of the", "de"], ["tela", "", "screen"], ["engana", "", "tricks", "enganar"], ["o", "", "the"], ["cérebro", "", "brain"], [",", "", ""], ["que", "", "which"], ["acha", "", "thinks", "achar"], ["que", "", "that"], ["ainda", "", "still"], ["é", "", "is", "ser"], ["dia", "", "day"], [".", "", ""]],
        en: "The light from the screen tricks the brain, which thinks it is still daytime.",
      },
      {
        t: [["Além disso", "", "besides", "além disso"], [",", "", ""], ["as", "", "the", "o"], ["notícias", "", "news", "notícia"], ["e", "", "and"], ["as", "", "the", "o"], ["redes sociais", "", "social media", "rede social"], ["deixam", "", "leave; make", "deixar"], ["a", "", "the", "o"], ["mente", "", "mind"], ["agitada", "", "restless", "agitado"], [".", "", ""]],
        en: "Besides, the news and social media leave the mind restless.",
      },
      {
        t: [["O", "", "the", "o"], ["café", "", "coffee"], ["também", "", "also"], ["pode", "", "can", "poder"], ["atrapalhar", "", "get in the way"], [",", "", ""], ["principalmente", "", "especially"], ["se", "", "if"], ["for", "", "it is", "ser"], ["consumido", "", "consumed", "consumir"], ["à", "", "in the", "a"], ["tarde", "", "afternoon"], [".", "", ""]],
        en: "Coffee can also get in the way, especially if it's drunk in the afternoon.",
      },
      {
        t: [["Para", "", "in order to", "para"], ["dormir", "", "sleep"], ["melhor", "", "better"], [",", "", ""], ["os", "", "the", "o"], ["médicos", "", "doctors", "médico"], ["recomendam", "", "recommend", "recomendar"], ["alguns", "", "some", "algum"], ["hábitos", "", "habits", "hábito"], ["simples", "", "simple"], [".", "", ""]],
        en: "To sleep better, doctors recommend a few simple habits.",
      },
      {
        t: [["O", "", "the", "o"], ["ideal", "", "ideal (thing)"], ["é", "", "is", "ser"], ["deitar", "", "to go to bed"], ["e", "", "and"], ["acordar", "", "to wake up"], ["sempre", "", "always"], ["no", "", "at the", "em"], ["mesmo", "", "same"], ["horário", "", "time"], [",", "", ""], ["inclusive", "", "including"], ["nos", "", "on the", "em"], ["fins de semana", "", "weekends", "fim de semana"], [".", "", ""]],
        en: "Ideally, you should go to bed and wake up at the same time every day, weekends included.",
      },
      {
        t: [["O", "", "the", "o"], ["quarto", "", "bedroom"], ["deve", "", "should", "dever"], ["ser", "", "be"], ["escuro", "", "dark"], [",", "", ""], ["silencioso", "", "quiet"], ["e", "", "and"], ["não", "", "not"], ["muito", "", "too"], ["quente", "", "hot"], [".", "", ""]],
        en: "The bedroom should be dark, quiet and not too hot.",
      },
      {
        t: [["Também", "", "also", "também"], ["ajuda", "", "helps", "ajudar"], ["desligar", "", "switching off"], ["as", "", "the", "o"], ["telas", "", "screens", "tela"], ["uma", "", "one", "um"], ["hora", "", "hour"], ["antes", "", "before"], ["de", "", "(before)"], ["deitar", "", "going to bed"], [".", "", ""]],
        en: "It also helps to switch off screens an hour before bed.",
      },
      {
        t: [["Ler", "", "reading"], ["um", "", "a"], ["livro", "", "book"], ["ou", "", "or"], ["ouvir", "", "listening to"], ["música", "", "music"], ["calma", "", "calm", "calmo"], ["são", "", "are", "ser"], ["boas", "", "good", "bom"], ["alternativas", "", "alternatives", "alternativa"], [".", "", ""]],
        en: "Reading a book or listening to calm music are good alternatives.",
      },
      {
        t: [["Quem", "", "whoever", "quem"], ["segue", "", "follows", "seguir"], ["essas", "", "these", "esse"], ["dicas", "", "tips", "dica"], ["costuma", "", "usually", "costumar"], ["notar", "", "notices"], ["a", "", "the", "o"], ["diferença", "", "difference"], ["em", "", "in"], ["poucas", "", "a few", "pouco"], ["semanas", "", "weeks", "semana"], [".", "", ""]],
        en: "People who follow these tips usually notice the difference within a few weeks.",
      },
      {
        t: [["Afinal", "", "after all", "afinal"], [",", "", ""], ["dormir", "", "sleeping"], ["bem", "", "well"], ["não", "", "not"], ["é", "", "is", "ser"], ["luxo", "", "luxury"], [":", "", ""], ["é", "", "it is", "ser"], ["uma", "", "a", "um"], ["questão", "", "matter"], ["de", "", "of"], ["saúde", "", "health"], [".", "", ""]],
        en: "After all, sleeping well is not a luxury: it's a matter of health.",
      },
    ],
    q: [
      { q: "How much sleep does an adult need, according to experts?", o: ["Five to six hours", "Seven to nine hours", "Ten hours"], a: 1 },
      { q: "Why is phone light a problem?", o: ["It makes the brain think it is still day", "It hurts the eyes", "It makes people hungry"], a: 0 },
      { q: "When is coffee especially bad for sleep?", o: ["In the morning", "With milk", "In the afternoon"], a: 2 },
      { q: "What should the bedroom be like?", o: ["Bright and warm", "Dark, quiet and not too hot", "Cold and noisy"], a: 1 },
      { q: "When do people usually notice a difference?", o: ["After one night", "Within a few weeks", "After a year"], a: 1 },
    ],
  },
];

export default data;
