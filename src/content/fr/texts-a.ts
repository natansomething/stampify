import type { Text } from '../types';

const data: Text[] = [
  {
    id: "fr-1-boulangerie",
    lv: 1,
    kind: "story",
    title: "Le matin à la boulangerie",
    titleEn: "Morning at the bakery",
    s: [
      {
        t: [["Paul", "", "Paul"], ["habite", "", "lives", "habiter"], ["à", "", "in"], ["Lyon", "", "Lyon"], ["avec", "", "with"], ["sa", "", "his", "son"], ["femme", "", "wife"], ["Marie", "", "Marie"], [".", "", ""]],
        en: "Paul lives in Lyon with his wife Marie.",
      },
      {
        t: [["Tous", "", "every", "tout"], ["les", "", "the", "le"], ["matins", "", "mornings", "matin"], [",", "", ""], ["il", "", "he"], ["va", "", "goes", "aller"], ["à", "", "to"], ["la", "", "the", "le"], ["boulangerie", "", "bakery"], [".", "", ""]],
        en: "Every morning, he goes to the bakery.",
      },
      {
        t: [["La", "", "the", "le"], ["boulangerie", "", "bakery"], ["est", "", "is", "être"], ["petite", "", "small", "petit"], [",", "", ""], ["mais", "", "but"], ["le", "", "the"], ["pain", "", "bread"], ["est", "", "is", "être"], ["très", "", "very"], ["bon", "", "good"], [".", "", ""]],
        en: "The bakery is small, but the bread is very good.",
      },
      {
        t: [["Paul", "", "Paul"], ["achète", "", "buys", "acheter"], ["une", "", "a", "un"], ["baguette", "", "baguette"], ["et", "", "and"], ["deux", "", "two"], ["croissants", "", "croissants", "croissant"], [".", "", ""]],
        en: "Paul buys a baguette and two croissants.",
      },
      {
        t: [["La", "", "the", "le"], ["boulangère", "", "baker"], ["s'", "", "herself", "se"], ["appelle", "", "calls", "appeler"], ["Sophie", "", "Sophie"], [".", "", ""]],
        en: "The baker's name is Sophie.",
      },
      {
        t: [["Elle", "", "she", "elle"], ["est", "", "is", "être"], ["très", "", "very"], ["gentille", "", "kind", "gentil"], [".", "", ""]],
        en: "She is very kind.",
      },
      {
        t: [["Elle", "", "she", "elle"], ["dit", "", "says", "dire"], [":", "", ""], ["«", "", ""], ["Bonjour", "", "hello", "bonjour"], [",", "", ""], ["Paul", "", "Paul"], ["!", "", ""], ["»", "", ""]],
        en: "She says: \"Hello, Paul!\"",
      },
      {
        t: [["La", "", "the", "le"], ["baguette", "", "baguette"], ["coûte", "", "costs", "coûter"], ["un", "", "one"], ["euro", "", "euro"], ["vingt", "", "twenty"], [".", "", ""]],
        en: "The baguette costs one euro twenty.",
      },
      {
        t: [["Paul", "", "Paul"], ["paie", "", "pays", "payer"], ["avec", "", "with"], ["une", "", "a", "un"], ["pièce", "", "coin"], ["de", "", "of"], ["deux", "", "two"], ["euros", "", "euros", "euro"], [".", "", ""]],
        en: "Paul pays with a two-euro coin.",
      },
      {
        t: [["Ensuite", "", "then", "ensuite"], [",", "", ""], ["il", "", "he"], ["rentre", "", "goes back", "rentrer"], ["à", "", "to"], ["la", "", "the", "le"], ["maison", "", "house; home"], [".", "", ""]],
        en: "Then he goes back home.",
      },
      {
        t: [["Paul", "", "Paul"], ["et", "", "and"], ["Marie", "", "Marie"], ["prennent", "", "have", "prendre"], ["le", "", "the"], ["petit-déjeuner", "", "breakfast"], ["ensemble", "", "together"], [".", "", ""]],
        en: "Paul and Marie have breakfast together.",
      },
    ],
    q: [
      { q: "Where does Paul live?", o: ["In Paris","In Lyon","In Nice"], a: 1 },
      { q: "What does Paul buy?", o: ["A baguette and two croissants","Two baguettes","A cake and a coffee"], a: 0 },
      { q: "Who is Sophie?", o: ["Paul's wife","Paul's sister","The baker"], a: 2 },
      { q: "How much is the baguette?", o: ["One euro twenty","Two euros","One euro"], a: 0 },
      { q: "What do Paul and Marie do at home?", o: ["They sleep","They have breakfast together","They make bread"], a: 1 },
    ],
  },
  {
    id: "fr-1-petit-dejeuner",
    lv: 1,
    kind: "article",
    title: "Le petit-déjeuner en France",
    titleEn: "Breakfast in France",
    s: [
      {
        t: [["En", "", "in"], ["France", "", "France"], [",", "", ""], ["le", "", "the"], ["petit-déjeuner", "", "breakfast"], ["est", "", "is", "être"], ["souvent", "", "often"], ["simple", "", "simple"], [".", "", ""]],
        en: "In France, breakfast is often simple.",
      },
      {
        t: [["Beaucoup", "", "many"], ["de", "", "(of)"], ["Français", "", "French people"], ["boivent", "", "drink", "boire"], ["un", "", "a"], ["café", "", "coffee"], ["ou", "", "or"], ["un", "", "a"], ["thé", "", "tea"], [".", "", ""]],
        en: "Many French people drink a coffee or a tea.",
      },
      {
        t: [["Les", "", "the", "le"], ["enfants", "", "children", "enfant"], ["boivent", "", "drink", "boire"], ["souvent", "", "often"], ["du", "", "some", "de"], ["chocolat", "", "chocolate"], ["chaud", "", "hot"], [".", "", ""]],
        en: "Children often drink hot chocolate.",
      },
      {
        t: [["On", "", "we; people"], ["mange", "", "eat", "manger"], ["du", "", "some", "de"], ["pain", "", "bread"], ["avec", "", "with"], ["du", "", "some", "de"], ["beurre", "", "butter"], ["et", "", "and"], ["de", "", "some"], ["la", "", "(some)", "le"], ["confiture", "", "jam"], [".", "", ""]],
        en: "People eat bread with butter and jam.",
      },
      {
        t: [["Le", "", "the"], ["week-end", "", "weekend"], [",", "", ""], ["on", "", "people"], ["achète", "", "buy", "acheter"], ["parfois", "", "sometimes"], ["des", "", "some", "un"], ["croissants", "", "croissants", "croissant"], [".", "", ""]],
        en: "At the weekend, people sometimes buy croissants.",
      },
      {
        t: [["Les", "", "the", "le"], ["Français", "", "French people"], ["ne", "", "(not)"], ["mangent", "", "eat", "manger"], ["pas", "", "not"], ["beaucoup", "", "a lot"], ["le", "", "in the"], ["matin", "", "morning"], [".", "", ""]],
        en: "The French don't eat a lot in the morning.",
      },
      {
        t: [["Les", "", "the", "le"], ["œufs", "", "eggs", "œuf"], ["et", "", "and"], ["le", "", "the"], ["fromage", "", "cheese"], ["sont", "", "are", "être"], ["rares", "", "rare", "rare"], ["le", "", "in the"], ["matin", "", "morning"], [".", "", ""]],
        en: "Eggs and cheese are rare in the morning.",
      },
      {
        t: [["Mais", "", "but", "mais"], ["le", "", "the"], ["déjeuner", "", "lunch"], ["est", "", "is", "être"], ["un", "", "a"], ["repas", "", "meal"], ["important", "", "important"], [".", "", ""]],
        en: "But lunch is an important meal.",
      },
      {
        t: [["À", "", "at", "à"], ["midi", "", "noon"], [",", "", ""], ["beaucoup", "", "many"], ["de", "", "(of)"], ["gens", "", "people"], ["mangent", "", "eat", "manger"], ["une", "", "a", "un"], ["entrée", "", "starter"], [",", "", ""], ["un", "", "a"], ["plat", "", "main course"], ["et", "", "and"], ["un", "", "a"], ["dessert", "", "dessert"], [".", "", ""]],
        en: "At noon, many people eat a starter, a main course and a dessert.",
      },
      {
        t: [["Et", "", "and", "et"], ["vous", "", "you"], [",", "", ""], ["qu'", "", "what", "que"], ["est-ce", "", "(is it)"], ["que", "", "(question word)"], ["vous", "", "you"], ["mangez", "", "eat", "manger"], ["le", "", "in the"], ["matin", "", "morning"], ["?", "", ""]],
        en: "And you, what do you eat in the morning?",
      },
    ],
    q: [
      { q: "What do children often drink in the morning?", o: ["Coffee","Hot chocolate","Tea with milk"], a: 1 },
      { q: "What do people eat with their bread?", o: ["Cheese and eggs","Butter and jam","Ham"], a: 1 },
      { q: "When do people sometimes buy croissants?", o: ["Every morning","At the weekend","At noon"], a: 1 },
      { q: "Which meal is important in France?", o: ["Breakfast","Lunch","Afternoon snack"], a: 1 },
    ],
  },
  {
    id: "fr-2-nantes",
    lv: 2,
    kind: "story",
    title: "Une nouvelle vie à Nantes",
    titleEn: "A new life in Nantes",
    s: [
      {
        t: [["L'", "", "the", "le"], ["année", "", "year"], ["dernière", "", "last", "dernier"], [",", "", ""], ["Claire", "", "Claire"], ["a", "", "(has)", "avoir"], ["quitté", "", "left", "quitter"], ["Paris", "", "Paris"], ["pour", "", "for"], ["Nantes", "", "Nantes"], [".", "", ""]],
        en: "Last year, Claire left Paris for Nantes.",
      },
      {
        t: [["Elle", "", "she", "elle"], ["a", "", "(has)", "avoir"], ["trouvé", "", "found", "trouver"], ["un", "", "a"], ["nouveau", "", "new"], ["travail", "", "job"], ["dans", "", "in"], ["une", "", "a", "un"], ["agence", "", "agency"], ["de", "", "(of)"], ["voyages", "", "travel", "voyage"], [".", "", ""]],
        en: "She found a new job in a travel agency.",
      },
      {
        t: [["Au", "", "at the", "à"], ["début", "", "beginning"], [",", "", ""], ["elle", "", "she"], ["ne", "", "(not)"], ["connaissait", "", "knew", "connaître"], ["personne", "", "nobody"], ["dans", "", "in"], ["la", "", "the", "le"], ["ville", "", "city"], [".", "", ""]],
        en: "At first, she didn't know anybody in the city.",
      },
      {
        t: [["Son", "", "her", "son"], ["appartement", "", "flat"], ["était", "", "was", "être"], ["petit", "", "small"], [",", "", ""], ["mais", "", "but"], ["il", "", "it"], ["avait", "", "had", "avoir"], ["un", "", "a"], ["grand", "", "big"], ["balcon", "", "balcony"], [".", "", ""]],
        en: "Her flat was small, but it had a big balcony.",
      },
      {
        t: [["Le", "", "the"], ["premier", "", "first"], ["mois", "", "month"], [",", "", ""], ["elle", "", "she"], ["a", "", "(has)", "avoir"], ["souvent", "", "often"], ["dîné", "", "had dinner", "dîner"], ["seule", "", "alone", "seul"], [".", "", ""]],
        en: "The first month, she often had dinner alone.",
      },
      {
        t: [["Puis", "", "then", "puis"], ["une", "", "a", "un"], ["collègue", "", "colleague"], ["l'", "", "her", "le"], ["a", "", "(has)", "avoir"], ["invitée", "", "invited", "inviter"], ["à", "", "to"], ["un", "", "a"], ["cours", "", "class"], ["de", "", "of"], ["danse", "", "dance"], [".", "", ""]],
        en: "Then a colleague invited her to a dance class.",
      },
      {
        t: [["Claire", "", "Claire"], ["n'", "", "(not)", "ne"], ["aimait", "", "liked", "aimer"], ["pas", "", "not"], ["beaucoup", "", "much"], ["danser", "", "dancing"], [",", "", ""], ["mais", "", "but"], ["elle", "", "she"], ["a", "", "(has)", "avoir"], ["accepté", "", "accepted", "accepter"], [".", "", ""]],
        en: "Claire didn't really like dancing, but she accepted.",
      },
      {
        t: [["Le", "", "the"], ["cours", "", "class"], ["avait", "", "took", "avoir"], ["lieu", "", "place"], ["le", "", "on"], ["jeudi", "", "Thursday"], ["soir", "", "evening"], [",", "", ""], ["dans", "", "in"], ["une", "", "an", "un"], ["vieille", "", "old", "vieux"], ["salle", "", "hall"], ["près", "", "near"], ["de", "", "(of)"], ["la", "", "the", "le"], ["Loire", "", "Loire (river)"], [".", "", ""]],
        en: "The class took place on Thursday evenings, in an old hall near the Loire.",
      },
      {
        t: [["Là-bas", "", "there"], [",", "", ""], ["elle", "", "she"], ["a", "", "(has)", "avoir"], ["rencontré", "", "met", "rencontrer"], ["des", "", "some", "un"], ["gens", "", "people"], ["très", "", "very"], ["sympathiques", "", "nice", "sympathique"], [".", "", ""]],
        en: "There she met some very nice people.",
      },
      {
        t: [["Maintenant", "", "now", "maintenant"], [",", "", ""], ["elle", "", "she"], ["sort", "", "goes out", "sortir"], ["avec", "", "with"], ["eux", "", "them", "lui"], ["presque", "", "almost"], ["tous", "", "every", "tout"], ["les", "", "the", "le"], ["week-ends", "", "weekends", "week-end"], [".", "", ""]],
        en: "Now she goes out with them almost every weekend.",
      },
      {
        t: [["Ensemble", "", "together", "ensemble"], [",", "", ""], ["ils", "", "they"], ["font", "", "do", "faire"], ["du", "", "(some)", "de"], ["vélo", "", "cycling; bike"], ["le", "", "(along)"], ["long", "", "along"], ["de", "", "(of)"], ["la", "", "the", "le"], ["Loire", "", "Loire"], [".", "", ""]],
        en: "Together they go cycling along the Loire.",
      },
      {
        t: [["Paris", "", "Paris"], ["lui", "", "to her"], ["manque", "", "is missing", "manquer"], ["parfois", "", "sometimes"], [",", "", ""], ["mais", "", "but"], ["elle", "", "she"], ["est", "", "is", "être"], ["heureuse", "", "happy", "heureux"], ["à", "", "in"], ["Nantes", "", "Nantes"], [".", "", ""]],
        en: "She sometimes misses Paris, but she is happy in Nantes.",
      },
    ],
    q: [
      { q: "Where did Claire live before?", o: ["In Nantes","In Paris","In Lyon"], a: 1 },
      { q: "Where does Claire work now?", o: ["In a school","In a restaurant","In a travel agency"], a: 2 },
      { q: "What was special about her flat?", o: ["It was very big","It had a big balcony","It was near the station"], a: 1 },
      { q: "Who invited her to the dance class?", o: ["Her neighbour","A colleague","Her sister"], a: 1 },
      { q: "What does she do with her new friends?", o: ["She goes cycling","She cooks","She goes to the cinema"], a: 0 },
    ],
  },
  {
    id: "fr-2-velo",
    lv: 2,
    kind: "article",
    title: "Le vélo en ville",
    titleEn: "Cycling in the city",
    s: [
      {
        t: [["Aujourd'hui", "", "today", "aujourd'hui"], [",", "", ""], ["il", "", "(there)"], ["y", "", "(there)"], ["a", "", "is; are", "avoir"], ["beaucoup", "", "a lot"], ["de", "", "of"], ["vélos", "", "bikes", "vélo"], ["dans", "", "in"], ["les", "", "the", "le"], ["villes", "", "cities", "ville"], ["françaises", "", "French", "français"], [".", "", ""]],
        en: "Today there are a lot of bikes in French cities.",
      },
      {
        t: [["À", "", "in", "à"], ["Paris", "", "Paris"], [",", "", ""], ["à", "", "in"], ["Lyon", "", "Lyon"], ["ou", "", "or"], ["à", "", "in"], ["Strasbourg", "", "Strasbourg"], [",", "", ""], ["beaucoup", "", "many"], ["de", "", "(of)"], ["gens", "", "people"], ["vont", "", "go", "aller"], ["au", "", "to", "à"], ["travail", "", "work"], ["à", "", "by"], ["vélo", "", "bike"], [".", "", ""]],
        en: "In Paris, Lyon or Strasbourg, many people go to work by bike.",
      },
      {
        t: [["Le", "", "the"], ["vélo", "", "bike"], ["est", "", "is", "être"], ["rapide", "", "fast"], [",", "", ""], ["pas", "", "not"], ["cher", "", "expensive"], ["et", "", "and"], ["bon", "", "good"], ["pour", "", "for"], ["la", "", "the", "le"], ["santé", "", "health"], [".", "", ""]],
        en: "Cycling is fast, cheap and good for your health.",
      },
      {
        t: [["Les", "", "the", "le"], ["villes", "", "cities", "ville"], ["ont", "", "have", "avoir"], ["construit", "", "built", "construire"], ["de", "", "(some)"], ["nouvelles", "", "new", "nouveau"], ["pistes", "", "lanes", "piste"], ["cyclables", "", "cycle", "cyclable"], [".", "", ""]],
        en: "Cities have built new cycle lanes.",
      },
      {
        t: [["Il", "", "(there)", "il"], ["existe", "", "are", "exister"], ["aussi", "", "also"], ["des", "", "(some)", "un"], ["vélos", "", "bikes", "vélo"], ["en", "", "in"], ["libre-service", "", "self-service"], [".", "", ""]],
        en: "There are also bike-sharing schemes.",
      },
      {
        t: [["On", "", "you; people"], ["prend", "", "take", "prendre"], ["un", "", "a"], ["vélo", "", "bike"], ["à", "", "at"], ["une", "", "a", "un"], ["station", "", "station"], ["et", "", "and"], ["on", "", "you"], ["le", "", "it"], ["laisse", "", "leave", "laisser"], ["dans", "", "at"], ["une", "", "another", "un"], ["autre", "", "other"], [".", "", ""]],
        en: "You take a bike at one station and leave it at another.",
      },
      {
        t: [["Pour", "", "to", "pour"], ["l'", "", "it", "le"], ["utiliser", "", "use"], [",", "", ""], ["il", "", "(it)"], ["faut", "", "is needed", "falloir"], ["une", "", "an", "un"], ["application", "", "app"], ["sur", "", "on"], ["son", "", "your"], ["téléphone", "", "phone"], [".", "", ""]],
        en: "To use it, you need an app on your phone.",
      },
      {
        t: [["En", "", "in"], ["hiver", "", "winter"], [",", "", ""], ["quand", "", "when"], ["il", "", "it"], ["pleut", "", "rains", "pleuvoir"], [",", "", ""], ["c'", "", "it", "ce"], ["est", "", "is", "être"], ["moins", "", "less"], ["agréable", "", "pleasant"], [".", "", ""]],
        en: "In winter, when it rains, it is less pleasant.",
      },
      {
        t: [["Certaines", "", "some", "certain"], ["personnes", "", "people", "personne"], ["préfèrent", "", "prefer", "préférer"], ["alors", "", "then"], ["prendre", "", "to take"], ["le", "", "the"], ["bus", "", "bus"], ["ou", "", "or"], ["le", "", "the"], ["métro", "", "metro"], [".", "", ""]],
        en: "Some people then prefer to take the bus or the metro.",
      },
      {
        t: [["Mais", "", "but", "mais"], ["beaucoup", "", "many"], ["de", "", "(of)"], ["cyclistes", "", "cyclists", "cycliste"], ["roulent", "", "ride", "rouler"], ["toute", "", "all", "tout"], ["l'", "", "the", "le"], ["année", "", "year"], [",", "", ""], ["avec", "", "with"], ["un", "", "a"], ["bon", "", "good"], ["manteau", "", "coat"], ["!", "", ""]],
        en: "But many cyclists ride all year round, with a good coat!",
      },
      {
        t: [["Dans", "", "in", "dans"], ["les", "", "the", "le"], ["petites", "", "small", "petit"], ["villes", "", "towns", "ville"], [",", "", ""], ["la", "", "the", "le"], ["voiture", "", "car"], ["reste", "", "remains", "rester"], ["très", "", "very"], ["importante", "", "important", "important"], [".", "", ""]],
        en: "In small towns, the car remains very important.",
      },
      {
        t: [["Les", "", "the", "le"], ["distances", "", "distances", "distance"], ["sont", "", "are", "être"], ["plus", "", "more"], ["longues", "", "long", "long"], ["et", "", "and"], ["il", "", "(there)"], ["y", "", "(there)"], ["a", "", "are", "avoir"], ["moins", "", "fewer"], ["de", "", "(of)"], ["bus", "", "buses"], [".", "", ""]],
        en: "Distances are longer and there are fewer buses.",
      },
    ],
    q: [
      { q: "According to the text, cycling is...", o: ["fast, cheap and healthy","slow but cheap","expensive and dangerous"], a: 0 },
      { q: "What have cities built?", o: ["New car parks","New cycle lanes","New metro lines"], a: 1 },
      { q: "What do you need to use a shared bike?", o: ["A ticket from the station","An app on your phone","A membership card from the town hall"], a: 1 },
      { q: "What do some people do in winter when it rains?", o: ["They stay at home","They take the bus or the metro","They walk"], a: 1 },
      { q: "Why is the car still important in small towns?", o: ["Bikes are too expensive","Distances are longer and there are fewer buses","People don't like cycling"], a: 1 },
    ],
  },
  {
    id: "fr-3-teletravail",
    lv: 3,
    kind: "article",
    title: "Travailler de chez soi",
    titleEn: "Working from home",
    s: [
      {
        t: [["Depuis", "", "for; since"], ["quelques", "", "a few", "quelque"], ["années", "", "years", "année"], [",", "", ""], ["le", "", "the"], ["télétravail", "", "remote work"], ["fait", "", "forms", "faire"], ["partie", "", "part"], ["de", "", "of"], ["la", "", "the", "le"], ["vie", "", "life"], ["de", "", "of"], ["nombreux", "", "many"], ["salariés", "", "employees", "salarié"], [".", "", ""]],
        en: "For a few years now, remote work has been part of many employees' lives.",
      },
      {
        t: [["Pour", "", "for"], ["beaucoup", "", "many"], [",", "", ""], ["le", "", "the"], ["principal", "", "main"], ["avantage", "", "advantage"], [",", "", ""], ["c'", "", "it", "ce"], ["est", "", "is", "être"], ["de", "", "(to)"], ["ne", "", "(no)"], ["plus", "", "longer"], ["perdre", "", "lose"], ["de", "", "(any)"], ["temps", "", "time"], ["dans", "", "in"], ["les", "", "the", "le"], ["transports", "", "commute; transport", "transport"], [".", "", ""]],
        en: "For many, the main advantage is no longer wasting time commuting.",
      },
      {
        t: [["On", "", "you; people"], ["peut", "", "can", "pouvoir"], ["aussi", "", "also"], ["organiser", "", "organise"], ["sa", "", "your", "son"], ["journée", "", "day"], ["plus", "", "more"], ["librement", "", "freely"], ["et", "", "and"], ["passer", "", "spend"], ["plus", "", "more"], ["de", "", "(of)"], ["temps", "", "time"], ["en", "", "with"], ["famille", "", "family"], [".", "", ""]],
        en: "You can also organise your day more freely and spend more time with your family.",
      },
      {
        t: [["Pourtant", "", "however", "pourtant"], [",", "", ""], ["travailler", "", "working"], ["à", "", "at"], ["la", "", "the", "le"], ["maison", "", "home"], ["n'", "", "(not)", "ne"], ["est", "", "is", "être"], ["pas", "", "not"], ["toujours", "", "always"], ["facile", "", "easy"], [".", "", ""]],
        en: "However, working at home isn't always easy.",
      },
      {
        t: [["Certaines", "", "some", "certain"], ["personnes", "", "people", "personne"], ["se", "", "themselves"], ["sentent", "", "feel", "sentir"], ["seules", "", "lonely", "seul"], ["et", "", "and"], ["regrettent", "", "miss", "regretter"], ["les", "", "the", "le"], ["discussions", "", "chats", "discussion"], ["avec", "", "with"], ["leurs", "", "their", "leur"], ["collègues", "", "colleagues", "collègue"], [".", "", ""]],
        en: "Some people feel lonely and miss chatting with their colleagues.",
      },
      {
        t: [["D'", "", "(some)", "de"], ["autres", "", "others", "autre"], ["ont", "", "have", "avoir"], ["du", "", "(some)", "de"], ["mal", "", "trouble"], ["à", "", "(to)"], ["séparer", "", "separating"], ["vie", "", "life"], ["professionnelle", "", "professional", "professionnel"], ["et", "", "and"], ["vie", "", "life"], ["privée", "", "private", "privé"], [".", "", ""]],
        en: "Others find it hard to separate their work life from their private life.",
      },
      {
        t: [["Quand", "", "when", "quand"], ["l'", "", "the", "le"], ["ordinateur", "", "computer"], ["reste", "", "stays", "rester"], ["sur", "", "on"], ["la", "", "the", "le"], ["table", "", "table"], ["de", "", "of"], ["la", "", "the", "le"], ["cuisine", "", "kitchen"], [",", "", ""], ["il", "", "it"], ["est", "", "is", "être"], ["difficile", "", "hard"], ["d'", "", "to", "de"], ["arrêter", "", "stop"], ["de", "", "(to)"], ["travailler", "", "working"], ["le", "", "in the"], ["soir", "", "evening"], [".", "", ""]],
        en: "When the computer stays on the kitchen table, it is hard to stop working in the evening.",
      },
      {
        t: [["Les", "", "the", "le"], ["spécialistes", "", "experts", "spécialiste"], ["donnent", "", "give", "donner"], ["quelques", "", "a few", "quelque"], ["conseils", "", "tips", "conseil"], ["simples", "", "simple", "simple"], [".", "", ""]],
        en: "Experts give a few simple tips.",
      },
      {
        t: [["D'abord", "", "first", "d'abord"], [",", "", ""], ["il", "", "it"], ["vaut", "", "is worth", "valoir"], ["mieux", "", "better"], ["avoir", "", "to have"], ["un", "", "a"], ["coin", "", "corner; space"], ["réservé", "", "set aside", "réserver"], ["au", "", "for", "à"], ["travail", "", "work"], [",", "", ""], ["même", "", "even"], ["petit", "", "small"], [".", "", ""]],
        en: "First, it is better to have a space set aside for work, even a small one.",
      },
      {
        t: [["Ensuite", "", "next", "ensuite"], [",", "", ""], ["il", "", "it"], ["est", "", "is", "être"], ["important", "", "important"], ["de", "", "to"], ["garder", "", "keep"], ["des", "", "(some)", "un"], ["horaires", "", "hours; schedule", "horaire"], ["réguliers", "", "regular", "régulier"], [".", "", ""]],
        en: "Next, it is important to keep regular hours.",
      },
      {
        t: [["Enfin", "", "finally", "enfin"], [",", "", ""], ["il", "", "(it)"], ["faut", "", "one must", "falloir"], ["faire", "", "take"], ["de", "", "(some)"], ["vraies", "", "real", "vrai"], ["pauses", "", "breaks", "pause"], ["et", "", "and"], ["sortir", "", "go out"], ["prendre", "", "get"], ["l'", "", "the", "le"], ["air", "", "air"], [".", "", ""]],
        en: "Finally, you have to take real breaks and go out to get some fresh air.",
      },
      {
        t: [["Aujourd'hui", "", "today", "aujourd'hui"], [",", "", ""], ["beaucoup", "", "many"], ["d'", "", "(of)", "de"], ["entreprises", "", "companies", "entreprise"], ["proposent", "", "offer", "proposer"], ["un", "", "a"], ["modèle", "", "model"], ["hybride", "", "hybrid"], [":", "", ""], ["deux", "", "two"], ["ou", "", "or"], ["trois", "", "three"], ["jours", "", "days", "jour"], ["au", "", "at the", "à"], ["bureau", "", "office"], [",", "", ""], ["le", "", "the"], ["reste", "", "rest"], ["à", "", "at"], ["la", "", "the", "le"], ["maison", "", "home"], [".", "", ""]],
        en: "Today, many companies offer a hybrid model: two or three days at the office, the rest at home.",
      },
      {
        t: [["Pour", "", "for"], ["de", "", "(of)"], ["nombreux", "", "many"], ["salariés", "", "employees", "salarié"], [",", "", ""], ["c'", "", "it", "ce"], ["est", "", "is", "être"], ["le", "", "the"], ["meilleur", "", "best"], ["des", "", "of the", "de"], ["deux", "", "two"], ["mondes", "", "worlds", "monde"], [".", "", ""]],
        en: "For many employees, it's the best of both worlds.",
      },
    ],
    q: [
      { q: "What is the main advantage of remote work for many people?", o: ["Earning more money","Not wasting time commuting","Working fewer hours"], a: 1 },
      { q: "What problem do some remote workers have?", o: ["They feel lonely","They work too little","Their internet is slow"], a: 0 },
      { q: "Why is it hard to stop working in the evening?", o: ["Because the boss calls","Because the computer stays on the kitchen table","Because of the children"], a: 1 },
      { q: "Which tip do experts NOT give?", o: ["Keep regular hours","Take real breaks","Work at night"], a: 2 },
      { q: "What does a hybrid model mean here?", o: ["Working only from home","A few days at the office, the rest at home","Working for two companies"], a: 1 },
    ],
  },
  {
    id: "fr-3-train-de-nuit",
    lv: 3,
    kind: "story",
    title: "Le train de nuit",
    titleEn: "The night train",
    s: [
      {
        t: [["L'", "", "(the)", "le"], ["été", "", "summer"], ["dernier", "", "last"], [",", "", ""], ["Hugo", "", "Hugo"], ["a", "", "(has)", "avoir"], ["décidé", "", "decided", "décider"], ["de", "", "to"], ["partir", "", "go"], ["en", "", "on"], ["vacances", "", "holiday"], ["sans", "", "without"], ["prendre", "", "taking"], ["l'", "", "the", "le"], ["avion", "", "plane"], [".", "", ""]],
        en: "Last summer, Hugo decided to go on holiday without taking the plane.",
      },
      {
        t: [["Il", "", "he", "il"], ["a", "", "(has)", "avoir"], ["réservé", "", "booked", "réserver"], ["une", "", "a", "un"], ["couchette", "", "berth"], ["dans", "", "on"], ["le", "", "the"], ["train", "", "train"], ["de", "", "(of)"], ["nuit", "", "night"], ["entre", "", "between"], ["Paris", "", "Paris"], ["et", "", "and"], ["Nice", "", "Nice"], [".", "", ""]],
        en: "He booked a berth on the night train between Paris and Nice.",
      },
      {
        t: [["Le", "", "the"], ["train", "", "train"], ["partait", "", "left", "partir"], ["à", "", "at"], ["neuf", "", "nine"], ["heures", "", "o'clock", "heure"], ["du", "", "in the", "de"], ["soir", "", "evening"], ["et", "", "and"], ["arrivait", "", "arrived", "arriver"], ["le", "", "the"], ["lendemain", "", "next day"], ["matin", "", "morning"], [".", "", ""]],
        en: "The train left at nine in the evening and arrived the next morning.",
      },
      {
        t: [["Il", "", "he", "il"], ["partageait", "", "shared", "partager"], ["son", "", "his"], ["compartiment", "", "compartment"], ["avec", "", "with"], ["une", "", "a", "un"], ["dame", "", "lady"], ["âgée", "", "elderly", "âgé"], ["et", "", "and"], ["deux", "", "two"], ["étudiants", "", "students", "étudiant"], ["allemands", "", "German", "allemand"], [".", "", ""]],
        en: "He shared his compartment with an elderly lady and two German students.",
      },
      {
        t: [["Au", "", "at the", "à"], ["début", "", "beginning"], [",", "", ""], ["personne", "", "nobody"], ["ne", "", "(not)"], ["parlait", "", "spoke", "parler"], [",", "", ""], ["et", "", "and"], ["chacun", "", "everyone"], ["regardait", "", "looked at", "regarder"], ["son", "", "their"], ["téléphone", "", "phone"], [".", "", ""]],
        en: "At first nobody spoke, and everyone looked at their phone.",
      },
      {
        t: [["Puis", "", "then", "puis"], ["la", "", "the", "le"], ["dame", "", "lady"], ["a", "", "(has)", "avoir"], ["sorti", "", "took out", "sortir"], ["un", "", "a"], ["paquet", "", "packet"], ["de", "", "of"], ["biscuits", "", "biscuits", "biscuit"], ["et", "", "and"], ["en", "", "some (of them)"], ["a", "", "(has)", "avoir"], ["offert", "", "offered", "offrir"], ["à", "", "to"], ["tout", "", "all"], ["le", "", "the"], ["monde", "", "world; everyone"], [".", "", ""]],
        en: "Then the lady took out a packet of biscuits and offered some to everyone.",
      },
      {
        t: [["Les", "", "the", "le"], ["étudiants", "", "students", "étudiant"], ["parlaient", "", "spoke", "parler"], ["un", "", "a"], ["peu", "", "little"], ["français", "", "French"], [",", "", ""], ["et", "", "and"], ["la", "", "the", "le"], ["conversation", "", "conversation"], ["a", "", "(has)", "avoir"], ["commencé", "", "started", "commencer"], [".", "", ""]],
        en: "The students spoke a little French, and the conversation started.",
      },
      {
        t: [["La", "", "the", "le"], ["dame", "", "lady"], ["a", "", "(has)", "avoir"], ["raconté", "", "told", "raconter"], ["qu'", "", "that", "que"], ["elle", "", "she"], ["faisait", "", "made", "faire"], ["ce", "", "this"], ["voyage", "", "trip"], ["chaque", "", "every"], ["année", "", "year"], ["pour", "", "to"], ["voir", "", "see"], ["sa", "", "her", "son"], ["sœur", "", "sister"], [".", "", ""]],
        en: "The lady told them she made this trip every year to see her sister.",
      },
      {
        t: [["Les", "", "the", "le"], ["étudiants", "", "students", "étudiant"], [",", "", ""], ["eux", "", "they", "lui"], [",", "", ""], ["voulaient", "", "wanted", "vouloir"], ["découvrir", "", "to discover"], ["la", "", "the", "le"], ["Côte", "", "Coast", "côte"], ["d'", "", "of", "de"], ["Azur", "", "Azure", "azur"], ["avant", "", "before"], ["de", "", "(of)"], ["rentrer", "", "going back"], ["en", "", "to"], ["Allemagne", "", "Germany"], [".", "", ""]],
        en: "The students, for their part, wanted to discover the Côte d'Azur before going back to Germany.",
      },
      {
        t: [["Vers", "", "around"], ["minuit", "", "midnight"], [",", "", ""], ["tout", "", "all"], ["le", "", "the"], ["monde", "", "everyone"], ["s'", "", "(themselves)", "se"], ["est", "", "(has)", "être"], ["couché", "", "gone to bed", "coucher"], [",", "", ""], ["mais", "", "but"], ["Hugo", "", "Hugo"], ["n'", "", "(not)", "ne"], ["arrivait", "", "managed", "arriver"], ["pas", "", "not"], ["à", "", "to"], ["dormir", "", "sleep"], [".", "", ""]],
        en: "Around midnight everyone went to bed, but Hugo couldn't get to sleep.",
      },
      {
        t: [["Il", "", "he", "il"], ["écoutait", "", "listened to", "écouter"], ["le", "", "the"], ["bruit", "", "noise"], ["des", "", "of the", "de"], ["roues", "", "wheels", "roue"], ["et", "", "and"], ["regardait", "", "watched", "regarder"], ["les", "", "the", "le"], ["lumières", "", "lights", "lumière"], ["des", "", "of the", "de"], ["villages", "", "villages", "village"], [".", "", ""]],
        en: "He listened to the noise of the wheels and watched the lights of the villages.",
      },
      {
        t: [["Le", "", "in the", "le"], ["matin", "", "morning"], [",", "", ""], ["il", "", "he"], ["a", "", "(has)", "avoir"], ["ouvert", "", "opened", "ouvrir"], ["le", "", "the"], ["rideau", "", "curtain"], ["et", "", "and"], ["il", "", "he"], ["a", "", "(has)", "avoir"], ["vu", "", "saw", "voir"], ["la", "", "the", "le"], ["mer", "", "sea"], [",", "", ""], ["toute", "", "all", "tout"], ["bleue", "", "blue", "bleu"], ["sous", "", "under"], ["le", "", "the"], ["soleil", "", "sun"], [".", "", ""]],
        en: "In the morning, he opened the curtain and saw the sea, all blue under the sun.",
      },
      {
        t: [["Le", "", "the"], ["voyage", "", "journey"], ["avait", "", "had", "avoir"], ["duré", "", "lasted", "durer"], ["douze", "", "twelve"], ["heures", "", "hours", "heure"], [",", "", ""], ["mais", "", "but"], ["Hugo", "", "Hugo"], ["n'", "", "(not)", "ne"], ["était", "", "was", "être"], ["pas", "", "not"], ["fatigué", "", "tired"], [".", "", ""]],
        en: "The journey had lasted twelve hours, but Hugo was not tired.",
      },
      {
        t: [["Pour", "", "for"], ["lui", "", "him"], [",", "", ""], ["les", "", "the", "le"], ["vacances", "", "holiday"], ["avaient", "", "had", "avoir"], ["commencé", "", "started", "commencer"], ["dans", "", "on"], ["le", "", "the"], ["train", "", "train"], [".", "", ""]],
        en: "For him, the holiday had started on the train.",
      },
    ],
    q: [
      { q: "Why did Hugo take the night train?", o: ["It was cheaper","He didn't want to fly","The planes were full"], a: 1 },
      { q: "Who was in his compartment?", o: ["His family","An elderly lady and two German students","Two French students"], a: 1 },
      { q: "How did the conversation start?", o: ["Hugo asked a question","The lady offered biscuits","The students played music"], a: 1 },
      { q: "Why does the lady make this trip every year?", o: ["For work","To see her sister","To swim in the sea"], a: 1 },
      { q: "What did Hugo see in the morning?", o: ["The mountains","Paris","The sea"], a: 2 },
    ],
  },
];

export default data;
