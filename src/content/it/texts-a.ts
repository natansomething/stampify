import type { Text } from '../types';

const data: Text[] = [
  {
    id: "it-1-mercato",
    lv: 1,
    kind: "story",
    title: "Il sabato al mercato",
    titleEn: "Saturday at the market",
    s: [
      {
        t: [["Giulia", "", "Giulia"], ["abita", "", "lives", "abitare"], ["a", "", "in"], ["Bologna", "", "Bologna"], ["con", "", "with"], ["il", "", "the"], ["suo", "", "her"], ["compagno", "", "partner"], [",", "", ""], ["Paolo", "", "Paolo"], [".", "", ""]],
        en: "Giulia lives in Bologna with her partner, Paolo.",
      },
      {
        t: [["Il", "", "on", "il"], ["sabato", "", "Saturday"], ["mattina", "", "morning"], ["vanno", "", "(they) go", "andare"], ["al", "", "to the", "a"], ["mercato", "", "market"], [".", "", ""]],
        en: "On Saturday mornings they go to the market.",
      },
      {
        t: [["Il", "", "the", "il"], ["mercato", "", "market"], ["è", "", "is", "essere"], ["in", "", "in"], ["una", "", "a", "uno"], ["piazza", "", "square"], ["grande", "", "big"], [".", "", ""]],
        en: "The market is in a big square.",
      },
      {
        t: [["Ci", "", "there", "ci"], ["sono", "", "are", "essere"], ["tante", "", "lots of", "tanto"], ["cose", "", "things", "cosa"], ["buone", "", "good", "buono"], [":", "", ""], ["frutta", "", "fruit"], [",", "", ""], ["verdura", "", "vegetables"], [",", "", ""], ["pane", "", "bread"], ["e", "", "and"], ["formaggio", "", "cheese"], [".", "", ""]],
        en: "There are lots of good things: fruit, vegetables, bread and cheese.",
      },
      {
        t: [["Giulia", "", "Giulia"], ["compra", "", "buys", "comprare"], ["pomodori", "", "tomatoes", "pomodoro"], [",", "", ""], ["zucchine", "", "courgettes", "zucchina"], ["e", "", "and"], ["due", "", "two"], ["limoni", "", "lemons", "limone"], [".", "", ""]],
        en: "Giulia buys tomatoes, courgettes and two lemons.",
      },
      {
        t: [["Paolo", "", "Paolo"], ["cerca", "", "looks for", "cercare"], ["il", "", "the"], ["formaggio", "", "cheese"], [".", "", ""]],
        en: "Paolo looks for the cheese.",
      },
      {
        t: [["Paolo", "", "Paolo"], ["chiede", "", "asks", "chiedere"], [":", "", ""], ["«", "", ""], ["Quanto", "", "how much", "quanto"], ["costa", "", "costs", "costare"], ["il", "", "the"], ["pecorino", "", "pecorino (sheep's cheese)"], ["?", "", ""], ["»", "", ""]],
        en: "Paolo asks: \"How much is the pecorino?\"",
      },
      {
        t: [["Il", "", "the", "il"], ["venditore", "", "seller"], ["risponde", "", "answers", "rispondere"], [":", "", ""], ["«", "", ""], ["Otto", "", "eight", "otto"], ["euro", "", "euros"], ["al", "", "per", "a"], ["chilo", "", "kilo"], ["»", "", ""], [".", "", ""]],
        en: "The seller answers: \"Eight euros a kilo.\"",
      },
      {
        t: [["Paolo", "", "Paolo"], ["compra", "", "buys", "comprare"], ["un", "", "a", "uno"], ["pezzo", "", "piece"], ["piccolo", "", "small"], [".", "", ""]],
        en: "Paolo buys a small piece.",
      },
      {
        t: [["A", "", "at", "a"], ["casa", "", "home"], [",", "", ""], ["Giulia", "", "Giulia"], ["e", "", "and"], ["Paolo", "", "Paolo"], ["mangiano", "", "eat", "mangiare"], ["insieme", "", "together"], [".", "", ""]],
        en: "At home, Giulia and Paolo eat together.",
      },
      {
        t: [["Il", "", "the", "il"], ["pecorino", "", "pecorino"], ["è", "", "is", "essere"], ["molto", "", "very"], ["buono", "", "good"], ["!", "", ""]],
        en: "The pecorino is very good!",
      },
    ],
    q: [
      { q: "Where does Giulia live?", o: ["In Rome", "In Bologna", "In Naples"], a: 1 },
      { q: "When do Giulia and Paolo go to the market?", o: ["On Sunday evenings", "On Friday afternoons", "On Saturday mornings"], a: 2 },
      { q: "What does Giulia buy?", o: ["Tomatoes, courgettes and lemons", "Bread and cheese", "Only fruit"], a: 0 },
      { q: "How much does the pecorino cost?", o: ["Eight euros a kilo", "Two euros a piece", "Eight euros a piece"], a: 0 },
    ],
  },
  {
    id: "it-1-colazione",
    lv: 1,
    kind: "article",
    title: "La colazione italiana",
    titleEn: "Breakfast in Italy",
    s: [
      {
        t: [["In", "", "in", "in"], ["Italia", "", "Italy"], ["la", "", "the", "il"], ["colazione", "", "breakfast"], ["è", "", "is", "essere"], ["un", "", "a", "uno"], ["pasto", "", "meal"], ["piccolo", "", "small"], [".", "", ""]],
        en: "In Italy, breakfast is a small meal.",
      },
      {
        t: [["Molti", "", "many", "molto"], ["italiani", "", "Italians", "italiano"], ["mangiano", "", "eat", "mangiare"], ["qualcosa", "", "something"], ["di", "", "(of)"], ["dolce", "", "sweet"], [".", "", ""]],
        en: "Many Italians eat something sweet.",
      },
      {
        t: [["Spesso", "", "often", "spesso"], ["fanno", "", "(they) have", "fare"], ["colazione", "", "breakfast"], ["al", "", "at the", "a"], ["bar", "", "café"], [".", "", ""]],
        en: "They often have breakfast at a café.",
      },
      {
        t: [["Al", "", "at the", "a"], ["bar", "", "café"], ["ordinano", "", "(they) order", "ordinare"], ["un", "", "a", "uno"], ["cappuccino", "", "cappuccino"], ["e", "", "and"], ["un", "", "a", "uno"], ["cornetto", "", "croissant"], [".", "", ""]],
        en: "At the café they order a cappuccino and a croissant.",
      },
      {
        t: [["Il", "", "the", "il"], ["cornetto", "", "croissant"], ["può", "", "can", "potere"], ["essere", "", "be"], ["vuoto", "", "plain; empty"], ["o", "", "or"], ["con", "", "with"], ["la", "", "the", "il"], ["crema", "", "custard"], [".", "", ""]],
        en: "The croissant can be plain or filled with custard.",
      },
      {
        t: [["Molte", "", "many", "molto"], ["persone", "", "people", "persona"], ["bevono", "", "drink", "bere"], ["il", "", "the"], ["caffè", "", "coffee"], ["in", "", "on"], ["piedi", "", "(their) feet", "piede"], [",", "", ""], ["al", "", "at the", "a"], ["bancone", "", "counter"], [".", "", ""]],
        en: "Many people drink their coffee standing up, at the counter.",
      },
      {
        t: [["Una", "", "a", "uno"], ["colazione", "", "breakfast"], ["al", "", "at the", "a"], ["bar", "", "café"], ["costa", "", "costs", "costare"], ["circa", "", "about"], ["tre", "", "three"], ["euro", "", "euros"], [".", "", ""]],
        en: "A breakfast at a café costs about three euros.",
      },
      {
        t: [["Molti", "", "many", "molto"], ["italiani", "", "Italians", "italiano"], ["fanno", "", "have", "fare"], ["colazione", "", "breakfast"], ["anche", "", "also"], ["a", "", "at"], ["casa", "", "home"], [".", "", ""]],
        en: "Many Italians also have breakfast at home.",
      },
      {
        t: [["A", "", "at", "a"], ["casa", "", "home"], ["preparano", "", "(they) make", "preparare"], ["il", "", "the"], ["caffè", "", "coffee"], ["con", "", "with"], ["la", "", "the", "il"], ["moka", "", "moka pot"], ["e", "", "and"], ["mangiano", "", "eat", "mangiare"], ["biscotti", "", "biscuits", "biscotto"], [".", "", ""]],
        en: "At home they make coffee with a moka pot and eat biscuits.",
      },
      {
        t: [["Il", "", "the", "il"], ["cappuccino", "", "cappuccino"], ["è", "", "is", "essere"], ["una", "", "a", "uno"], ["bevanda", "", "drink"], ["della", "", "of the", "di"], ["mattina", "", "morning"], [".", "", ""]],
        en: "Cappuccino is a morning drink.",
      },
      {
        t: [["Dopo", "", "after", "dopo"], ["pranzo", "", "lunch"], [",", "", ""], ["pochi", "", "few", "poco"], ["italiani", "", "Italians", "italiano"], ["ordinano", "", "order", "ordinare"], ["un", "", "a", "uno"], ["cappuccino", "", "cappuccino"], [".", "", ""]],
        en: "After lunch, few Italians order a cappuccino.",
      },
    ],
    q: [
      { q: "What is breakfast like in Italy?", o: ["A big meal", "A small meal", "A salty meal"], a: 1 },
      { q: "Where do many Italians often have breakfast?", o: ["At work", "At a café", "At school"], a: 1 },
      { q: "How do many people drink coffee at the café?", o: ["Standing at the counter", "Sitting outside", "In bed"], a: 0 },
      { q: "When do few Italians order a cappuccino?", o: ["In the morning", "After lunch", "At home"], a: 1 },
    ],
  },
  {
    id: "it-2-trasloco",
    lv: 2,
    kind: "story",
    title: "Una casa nuova",
    titleEn: "A new home",
    s: [
      {
        t: [["Il", "", "the", "il"], ["mese", "", "month"], ["scorso", "", "last"], ["Sara", "", "Sara"], ["si", "", "(herself)"], ["è", "", "has", "essere"], ["trasferita", "", "moved", "trasferire"], ["a", "", "to"], ["Torino", "", "Turin"], ["per", "", "for"], ["lavoro", "", "work"], [".", "", ""]],
        en: "Last month Sara moved to Turin for work.",
      },
      {
        t: [["Prima", "", "before", "prima"], ["viveva", "", "(she) lived", "vivere"], ["a", "", "in"], ["Napoli", "", "Naples"], ["con", "", "with"], ["i", "", "the", "il"], ["suoi", "", "her", "suo"], ["genitori", "", "parents", "genitore"], [".", "", ""]],
        en: "Before, she lived in Naples with her parents.",
      },
      {
        t: [["Adesso", "", "now", "adesso"], ["ha", "", "(she) has", "avere"], ["un", "", "a", "uno"], ["piccolo", "", "small"], ["appartamento", "", "flat"], ["in", "", "in the"], ["centro", "", "centre"], [",", "", ""], ["vicino", "", "near"], ["alla", "", "to the", "a"], ["stazione", "", "station"], [".", "", ""]],
        en: "Now she has a small flat in the centre, near the station.",
      },
      {
        t: [["L'", "", "the", "il"], ["appartamento", "", "flat"], ["è", "", "is", "essere"], ["al", "", "on the", "a"], ["terzo", "", "third"], ["piano", "", "floor"], ["e", "", "and"], ["non", "", "not"], ["c'", "", "there", "ci"], ["è", "", "is", "essere"], ["l'", "", "the", "il"], ["ascensore", "", "lift"], [".", "", ""]],
        en: "The flat is on the third floor and there is no lift.",
      },
      {
        t: [["Il", "", "the", "il"], ["giorno", "", "day"], ["del", "", "of the", "di"], ["trasloco", "", "move"], [",", "", ""], ["due", "", "two"], ["amici", "", "friends", "amico"], ["sono", "", "have", "essere"], ["venuti", "", "come", "venire"], ["ad", "", "to", "a"], ["aiutarla", "", "help her", "aiutare"], [".", "", ""]],
        en: "On moving day, two friends came to help her.",
      },
      {
        t: [["Hanno", "", "(they) have", "avere"], ["portato", "", "carried", "portare"], ["le", "", "the", "il"], ["scatole", "", "boxes", "scatola"], ["su", "", "up"], ["per", "", "along"], ["le", "", "the", "il"], ["scale", "", "stairs", "scala"], ["tutto", "", "all"], ["il", "", "the"], ["giorno", "", "day"], [".", "", ""]],
        en: "They carried the boxes up the stairs all day.",
      },
      {
        t: [["La", "", "in the", "il"], ["sera", "", "evening"], ["erano", "", "(they) were", "essere"], ["molto", "", "very"], ["stanchi", "", "tired", "stanco"], [".", "", ""]],
        en: "In the evening they were very tired.",
      },
      {
        t: [["Hanno", "", "(they) have", "avere"], ["ordinato", "", "ordered", "ordinare"], ["una", "", "a", "uno"], ["pizza", "", "pizza"], ["e", "", "and"], ["hanno", "", "have", "avere"], ["mangiato", "", "eaten", "mangiare"], ["sul", "", "on the", "su"], ["pavimento", "", "floor"], [",", "", ""], ["perché", "", "because"], ["Sara", "", "Sara"], ["non", "", "not"], ["aveva", "", "had", "avere"], ["ancora", "", "yet"], ["un", "", "a", "uno"], ["tavolo", "", "table"], [".", "", ""]],
        en: "They ordered a pizza and ate on the floor, because Sara didn't have a table yet.",
      },
      {
        t: [["Il", "", "the", "il"], ["giorno", "", "day"], ["dopo", "", "after"], ["Sara", "", "Sara"], ["è", "", "has", "essere"], ["andata", "", "gone", "andare"], ["in", "", "to"], ["un", "", "a", "uno"], ["negozio", "", "shop"], ["di", "", "of"], ["mobili", "", "furniture", "mobile"], [".", "", ""]],
        en: "The next day Sara went to a furniture shop.",
      },
      {
        t: [["Ha", "", "(she) has", "avere"], ["comprato", "", "bought", "comprare"], ["un", "", "a", "uno"], ["tavolo", "", "table"], [",", "", ""], ["quattro", "", "four"], ["sedie", "", "chairs", "sedia"], ["e", "", "and"], ["una", "", "a", "uno"], ["lampada", "", "lamp"], [".", "", ""]],
        en: "She bought a table, four chairs and a lamp.",
      },
      {
        t: [["Il", "", "the", "il"], ["letto", "", "bed"], [",", "", ""], ["invece", "", "however"], [",", "", ""], ["è", "", "has", "essere"], ["arrivato", "", "arrived", "arrivare"], ["solo", "", "only"], ["dopo", "", "after"], ["una", "", "a", "uno"], ["settimana", "", "week"], [".", "", ""]],
        en: "The bed, however, only arrived after a week.",
      },
      {
        t: [["Ora", "", "now", "ora"], ["la", "", "the", "il"], ["casa", "", "home"], ["è", "", "is", "essere"], ["quasi", "", "almost"], ["pronta", "", "ready", "pronto"], [",", "", ""], ["ma", "", "but"], ["Sara", "", "Sara"], ["non", "", "not"], ["conosce", "", "knows", "conoscere"], ["ancora", "", "yet"], ["i", "", "the", "il"], ["vicini", "", "neighbours", "vicino"], [".", "", ""]],
        en: "Now the home is almost ready, but Sara doesn't know the neighbours yet.",
      },
      {
        t: [["Domani", "", "tomorrow", "domani"], ["vuole", "", "(she) wants", "volere"], ["invitarli", "", "to invite them", "invitare"], ["a", "", "to"], ["prendere", "", "have"], ["un", "", "a", "uno"], ["caffè", "", "coffee"], [".", "", ""]],
        en: "Tomorrow she wants to invite them for a coffee.",
      },
    ],
    q: [
      { q: "Why did Sara move to Turin?", o: ["To study", "For work", "To be near her parents"], a: 1 },
      { q: "What is the problem with the flat?", o: ["It is far from the station", "There is no lift", "It is very big"], a: 1 },
      { q: "Why did they eat on the floor?", o: ["It was a party", "The kitchen was closed", "Sara had no table yet"], a: 2 },
      { q: "What arrived only after a week?", o: ["The chairs", "The bed", "The lamp"], a: 1 },
    ],
  },
  {
    id: "it-2-treno",
    lv: 2,
    kind: "article",
    title: "Viaggiare in treno",
    titleEn: "Travelling by train",
    s: [
      {
        t: [["In", "", "in", "in"], ["Italia", "", "Italy"], ["molte", "", "many", "molto"], ["persone", "", "people", "persona"], ["viaggiano", "", "travel", "viaggiare"], ["in", "", "by"], ["treno", "", "train"], [".", "", ""]],
        en: "In Italy, many people travel by train.",
      },
      {
        t: [["I", "", "the", "il"], ["treni", "", "trains", "treno"], ["ad", "", "(at)", "a"], ["alta", "", "high", "alto"], ["velocità", "", "speed"], ["collegano", "", "connect", "collegare"], ["le", "", "the", "il"], ["grandi", "", "big", "grande"], ["città", "", "cities"], [",", "", ""], ["come", "", "like"], ["Milano", "", "Milan"], [",", "", ""], ["Roma", "", "Rome"], ["e", "", "and"], ["Napoli", "", "Naples"], [".", "", ""]],
        en: "High-speed trains connect the big cities, like Milan, Rome and Naples.",
      },
      {
        t: [["Da", "", "from", "da"], ["Milano", "", "Milan"], ["a", "", "to"], ["Roma", "", "Rome"], [",", "", ""], ["per", "", "for"], ["esempio", "", "example"], [",", "", ""], ["ci", "", "(it)"], ["vogliono", "", "takes", "volere"], ["circa", "", "about"], ["tre", "", "three"], ["ore", "", "hours", "ora"], [".", "", ""]],
        en: "From Milan to Rome, for example, it takes about three hours.",
      },
      {
        t: [["Questi", "", "these", "questo"], ["treni", "", "trains", "treno"], ["sono", "", "are", "essere"], ["veloci", "", "fast", "veloce"], ["e", "", "and"], ["comodi", "", "comfortable", "comodo"], [",", "", ""], ["ma", "", "but"], ["i", "", "the", "il"], ["biglietti", "", "tickets", "biglietto"], ["sono", "", "are", "essere"], ["abbastanza", "", "quite"], ["cari", "", "expensive", "caro"], [".", "", ""]],
        en: "These trains are fast and comfortable, but the tickets are quite expensive.",
      },
      {
        t: [["I", "", "the", "il"], ["treni", "", "trains", "treno"], ["regionali", "", "regional", "regionale"], [",", "", ""], ["invece", "", "on the other hand"], [",", "", ""], ["sono", "", "are", "essere"], ["più", "", "more"], ["lenti", "", "slow", "lento"], ["e", "", "and"], ["si", "", "(themselves)"], ["fermano", "", "stop", "fermare"], ["in", "", "at"], ["tutte", "", "all", "tutto"], ["le", "", "the", "il"], ["stazioni", "", "stations", "stazione"], [".", "", ""]],
        en: "Regional trains, on the other hand, are slower and stop at every station.",
      },
      {
        t: [["Però", "", "but", "però"], ["costano", "", "(they) cost", "costare"], ["molto", "", "much"], ["meno", "", "less"], [".", "", ""]],
        en: "But they cost much less.",
      },
      {
        t: [["Il", "", "the", "il"], ["biglietto", "", "ticket"], ["si", "", "(one)"], ["può", "", "can", "potere"], ["comprare", "", "buy"], ["online", "", "online"], [",", "", ""], ["con", "", "with"], ["un'", "", "an", "uno"], ["app", "", "app"], ["o", "", "or"], ["alla", "", "at the", "a"], ["stazione", "", "station"], [".", "", ""]],
        en: "You can buy the ticket online, with an app or at the station.",
      },
      {
        t: [["Se", "", "if", "se"], ["il", "", "the"], ["biglietto", "", "ticket"], ["è", "", "is", "essere"], ["di", "", "(made) of"], ["carta", "", "paper"], [",", "", ""], ["a", "", "at"], ["volte", "", "times", "volta"], ["bisogna", "", "(one) must", "bisognare"], ["convalidarlo", "", "validate it", "convalidare"], ["prima", "", "before"], ["di", "", "(of)"], ["salire", "", "getting on"], [".", "", ""]],
        en: "If the ticket is a paper one, you sometimes have to validate it before getting on.",
      },
      {
        t: [["Chi", "", "whoever", "chi"], ["non", "", "not"], ["lo", "", "it"], ["fa", "", "does", "fare"], ["rischia", "", "risks", "rischiare"], ["una", "", "a", "uno"], ["multa", "", "fine"], [".", "", ""]],
        en: "Anyone who doesn't do it risks a fine.",
      },
      {
        t: [["Molti", "", "many", "molto"], ["turisti", "", "tourists", "turista"], ["amano", "", "love", "amare"], ["il", "", "the"], ["treno", "", "train"], ["perché", "", "because"], ["dal", "", "from the", "da"], ["finestrino", "", "window"], ["si", "", "(one)"], ["vedono", "", "sees", "vedere"], ["paesaggi", "", "landscapes", "paesaggio"], ["bellissimi", "", "beautiful", "bello"], [".", "", ""]],
        en: "Many tourists love the train because you can see beautiful landscapes from the window.",
      },
      {
        t: [["In", "", "in", "in"], ["estate", "", "summer"], [",", "", ""], ["però", "", "however"], [",", "", ""], ["i", "", "the", "il"], ["treni", "", "trains", "treno"], ["sono", "", "are", "essere"], ["spesso", "", "often"], ["pieni", "", "full", "pieno"], [".", "", ""]],
        en: "In summer, however, the trains are often full.",
      },
      {
        t: [["Per", "", "for", "per"], ["questo", "", "this"], ["è", "", "it is", "essere"], ["meglio", "", "better"], ["prenotare", "", "to book"], ["qualche", "", "a few"], ["giorno", "", "day"], ["prima", "", "before"], [".", "", ""]],
        en: "For this reason it's better to book a few days in advance.",
      },
    ],
    q: [
      { q: "How long does it take from Milan to Rome by high-speed train?", o: ["About one hour", "About three hours", "About six hours"], a: 1 },
      { q: "What is true about regional trains?", o: ["They are faster", "They are cheaper", "They only stop in big cities"], a: 1 },
      { q: "What can happen if you don't validate a paper ticket?", o: ["You can get a fine", "You can't get off", "You pay double at the station"], a: 0 },
      { q: "What is the advice for summer?", o: ["Travel at night", "Buy tickets on the train", "Book a few days in advance"], a: 2 },
    ],
  },
  {
    id: "it-3-quaderno",
    lv: 3,
    kind: "story",
    title: "Il quaderno della nonna",
    titleEn: "Grandma's notebook",
    s: [
      {
        t: [["Da", "", "as a", "da"], ["bambina", "", "child"], [",", "", ""], ["Elena", "", "Elena"], ["passava", "", "spent", "passare"], ["le", "", "the", "il"], ["estati", "", "summers", "estate"], ["in", "", "in the"], ["campagna", "", "countryside"], ["dalla", "", "at … 's (house)", "da"], ["nonna", "", "grandmother"], [",", "", ""], ["in", "", "in"], ["Puglia", "", "Apulia"], [".", "", ""]],
        en: "As a child, Elena spent her summers in the countryside at her grandmother's, in Apulia.",
      },
      {
        t: [["La", "", "the", "il"], ["nonna", "", "grandmother"], ["cucinava", "", "cooked", "cucinare"], ["ogni", "", "every"], ["giorno", "", "day"], ["per", "", "for"], ["tutta", "", "all", "tutto"], ["la", "", "the", "il"], ["famiglia", "", "family"], [",", "", ""], ["ma", "", "but"], ["non", "", "not"], ["usava", "", "used", "usare"], ["mai", "", "ever"], ["una", "", "a", "uno"], ["ricetta", "", "recipe"], [".", "", ""]],
        en: "Grandma cooked every day for the whole family, but she never used a recipe.",
      },
      {
        t: [["Diceva", "", "(she) said", "dire"], ["sempre", "", "always"], ["che", "", "that"], ["le", "", "the", "il"], ["dosi", "", "quantities", "dose"], ["giuste", "", "right", "giusto"], ["si", "", "(one)"], ["sentono", "", "feels", "sentire"], ["con", "", "with"], ["le", "", "the", "il"], ["mani", "", "hands", "mano"], [".", "", ""]],
        en: "She always said that you feel the right quantities with your hands.",
      },
      {
        t: [["L'", "", "the", "il"], ["anno", "", "year"], ["scorso", "", "last"], [",", "", ""], ["mentre", "", "while"], ["aiutava", "", "(she) was helping", "aiutare"], ["sua", "", "her", "suo"], ["madre", "", "mother"], ["a", "", "to"], ["svuotare", "", "empty"], ["la", "", "the", "il"], ["vecchia", "", "old", "vecchio"], ["casa", "", "house"], [",", "", ""], ["Elena", "", "Elena"], ["ha", "", "has", "avere"], ["trovato", "", "found", "trovare"], ["un", "", "a", "uno"], ["quaderno", "", "notebook"], ["in", "", "in"], ["un", "", "a", "uno"], ["cassetto", "", "drawer"], [".", "", ""]],
        en: "Last year, while she was helping her mother empty the old house, Elena found a notebook in a drawer.",
      },
      {
        t: [["Era", "", "(it) was", "essere"], ["pieno", "", "full"], ["di", "", "of"], ["ricette", "", "recipes", "ricetta"], ["scritte", "", "written", "scrivere"], ["a", "", "by"], ["mano", "", "hand"], [",", "", ""], ["con", "", "with"], ["una", "", "a", "uno"], ["calligrafia", "", "handwriting"], ["piccola", "", "small", "piccolo"], ["e", "", "and"], ["ordinata", "", "neat", "ordinato"], [".", "", ""]],
        en: "It was full of handwritten recipes, in small, neat handwriting.",
      },
      {
        t: [["Elena", "", "Elena"], ["è", "", "has", "essere"], ["rimasta", "", "remained", "rimanere"], ["sorpresa", "", "surprised", "sorpreso"], [",", "", ""], ["perché", "", "because"], ["era", "", "(she) was", "essere"], ["convinta", "", "convinced", "convinto"], ["che", "", "that"], ["la", "", "the", "il"], ["nonna", "", "grandmother"], ["cucinasse", "", "cooked", "cucinare"], ["solo", "", "only"], ["a", "", "by"], ["memoria", "", "memory"], [".", "", ""]],
        en: "Elena was surprised, because she was convinced that her grandmother cooked only from memory.",
      },
      {
        t: [["Accanto", "", "next", "accanto"], ["a", "", "to"], ["ogni", "", "every"], ["ricetta", "", "recipe"], ["c'", "", "there", "ci"], ["erano", "", "were", "essere"], ["piccoli", "", "little", "piccolo"], ["commenti", "", "comments", "commento"], [",", "", ""], ["come", "", "like"], ["«", "", ""], ["meno", "", "less"], ["sale", "", "salt"], ["»", "", ""], ["o", "", "or"], ["«", "", ""], ["piace", "", "(he) likes it", "piacere"], ["a", "", "to"], ["Marco", "", "Marco"], ["»", "", ""], [".", "", ""]],
        en: "Next to every recipe there were little comments, like \"less salt\" or \"Marco likes it\".",
      },
      {
        t: [["Marco", "", "Marco"], ["è", "", "is", "essere"], ["il", "", "the"], ["fratello", "", "brother"], ["di", "", "of"], ["Elena", "", "Elena"], [",", "", ""], ["che", "", "who"], ["da", "", "as a"], ["bambino", "", "child"], ["mangiava", "", "ate", "mangiare"], ["quasi", "", "almost"], ["solo", "", "only"], ["pasta", "", "pasta"], ["al", "", "with", "a"], ["pomodoro", "", "tomato"], [".", "", ""]],
        en: "Marco is Elena's brother, who as a child ate almost nothing but pasta with tomato sauce.",
      },
      {
        t: [["Una", "", "one", "uno"], ["domenica", "", "Sunday"], ["Elena", "", "Elena"], ["ha", "", "has", "avere"], ["deciso", "", "decided", "decidere"], ["di", "", "to"], ["provare", "", "try"], ["la", "", "the", "il"], ["ricetta", "", "recipe"], ["delle", "", "of the", "di"], ["orecchiette", "", "orecchiette (ear-shaped pasta)", "orecchietta"], [".", "", ""]],
        en: "One Sunday, Elena decided to try the orecchiette recipe.",
      },
      {
        t: [["Ha", "", "(she) has", "avere"], ["impastato", "", "kneaded", "impastare"], ["a", "", "for"], ["lungo", "", "a long time"], ["farina", "", "flour"], ["e", "", "and"], ["acqua", "", "water"], [",", "", ""], ["ma", "", "but"], ["la", "", "the", "il"], ["pasta", "", "dough"], ["era", "", "was", "essere"], ["troppo", "", "too"], ["dura", "", "hard", "duro"], [".", "", ""]],
        en: "She kneaded flour and water for a long time, but the dough was too hard.",
      },
      {
        t: [["Allora", "", "so", "allora"], ["ha", "", "(she) has", "avere"], ["telefonato", "", "phoned", "telefonare"], ["a", "", "to"], ["sua", "", "her", "suo"], ["madre", "", "mother"], [",", "", ""], ["che", "", "who"], ["le", "", "to her"], ["ha", "", "has", "avere"], ["svelato", "", "revealed", "svelare"], ["il", "", "the"], ["segreto", "", "secret"], [":", "", ""], ["l'", "", "the", "il"], ["acqua", "", "water"], ["deve", "", "must", "dovere"], ["essere", "", "be"], ["tiepida", "", "lukewarm", "tiepido"], [".", "", ""]],
        en: "So she phoned her mother, who told her the secret: the water has to be lukewarm.",
      },
      {
        t: [["Al", "", "at the", "a"], ["secondo", "", "second"], ["tentativo", "", "attempt"], [",", "", ""], ["le", "", "the", "il"], ["orecchiette", "", "orecchiette", "orecchietta"], ["erano", "", "were", "essere"], ["quasi", "", "almost"], ["perfette", "", "perfect", "perfetto"], [".", "", ""]],
        en: "On the second attempt, the orecchiette were almost perfect.",
      },
      {
        t: [["Ora", "", "now", "ora"], ["Elena", "", "Elena"], ["vuole", "", "wants", "volere"], ["ricopiare", "", "to copy out"], ["tutto", "", "all"], ["il", "", "the"], ["quaderno", "", "notebook"], ["e", "", "and"], ["regalarne", "", "give … of it", "regalare"], ["una", "", "a", "uno"], ["copia", "", "copy"], ["a", "", "to"], ["ogni", "", "every"], ["cugino", "", "cousin"], [".", "", ""]],
        en: "Now Elena wants to copy out the whole notebook and give a copy to each cousin.",
      },
      {
        t: [["Così", "", "that way", "così"], ["le", "", "the", "il"], ["ricette", "", "recipes", "ricetta"], ["della", "", "of the", "di"], ["nonna", "", "grandmother"], ["non", "", "not"], ["andranno", "", "will go", "andare"], ["perse", "", "lost", "perso"], [".", "", ""]],
        en: "That way, Grandma's recipes won't be lost.",
      },
    ],
    q: [
      { q: "Where did Elena spend her summers as a child?", o: ["In Turin with her parents", "In the countryside in Apulia", "At the seaside with her brother"], a: 1 },
      { q: "Why was Elena surprised by the notebook?", o: ["It was written in English", "She thought her grandmother cooked from memory", "It belonged to her brother"], a: 1 },
      { q: "What was wrong with the first attempt?", o: ["The water was too hot", "The dough was too hard", "There was too much salt"], a: 1 },
      { q: "Who told Elena the secret?", o: ["Her grandmother", "Her brother", "Her mother"], a: 2 },
      { q: "What does Elena want to do now?", o: ["Sell the old house", "Open a restaurant", "Give a copy of the notebook to her cousins"], a: 2 },
    ],
  },
  {
    id: "it-3-borghi",
    lv: 3,
    kind: "article",
    title: "Lavorare da un piccolo paese",
    titleEn: "Working from a small village",
    s: [
      {
        t: [["Negli", "", "in the", "in"], ["ultimi", "", "last", "ultimo"], ["anni", "", "years", "anno"], [",", "", ""], ["molti", "", "many", "molto"], ["italiani", "", "Italians", "italiano"], ["hanno", "", "have", "avere"], ["cominciato", "", "started", "cominciare"], ["a", "", "to"], ["lavorare", "", "work"], ["da", "", "from"], ["casa", "", "home"], [".", "", ""]],
        en: "In recent years, many Italians have started working from home.",
      },
      {
        t: [["Grazie", "", "thanks", "grazie"], ["a", "", "to"], ["internet", "", "the internet"], [",", "", ""], ["per", "", "for"], ["alcuni", "", "some", "alcuno"], ["lavori", "", "jobs", "lavoro"], ["non", "", "not"], ["è", "", "it is", "essere"], ["più", "", "any longer"], ["necessario", "", "necessary"], ["andare", "", "to go"], ["in", "", "to the"], ["ufficio", "", "office"], ["ogni", "", "every"], ["giorno", "", "day"], [".", "", ""]],
        en: "Thanks to the internet, for some jobs it is no longer necessary to go to the office every day.",
      },
      {
        t: [["Per", "", "for", "per"], ["questo", "", "this"], ["motivo", "", "reason"], [",", "", ""], ["alcune", "", "some", "alcuno"], ["persone", "", "people", "persona"], ["hanno", "", "have", "avere"], ["lasciato", "", "left", "lasciare"], ["le", "", "the", "il"], ["grandi", "", "big", "grande"], ["città", "", "cities"], ["e", "", "and"], ["si", "", "(themselves)"], ["sono", "", "have", "essere"], ["trasferite", "", "moved", "trasferire"], ["nei", "", "to the", "in"], ["piccoli", "", "small", "piccolo"], ["paesi", "", "villages", "paese"], [".", "", ""]],
        en: "For this reason, some people have left the big cities and moved to small villages.",
      },
      {
        t: [["In", "", "in", "in"], ["Italia", "", "Italy"], ["ci", "", "there"], ["sono", "", "are", "essere"], ["migliaia", "", "thousands", "migliaio"], ["di", "", "of"], ["borghi", "", "villages", "borgo"], ["antichi", "", "old", "antico"], [",", "", ""], ["spesso", "", "often"], ["in", "", "in the"], ["collina", "", "hills"], ["o", "", "or"], ["in", "", "in the"], ["montagna", "", "mountains"], [".", "", ""]],
        en: "In Italy there are thousands of old villages, often in the hills or in the mountains.",
      },
      {
        t: [["Molti", "", "many", "molto"], ["di", "", "of"], ["questi", "", "these", "questo"], ["paesi", "", "villages", "paese"], ["si", "", "(themselves)"], ["stanno", "", "are", "stare"], ["svuotando", "", "emptying", "svuotare"], [",", "", ""], ["perché", "", "because"], ["i", "", "the", "il"], ["giovani", "", "young people", "giovane"], ["partono", "", "leave", "partire"], ["per", "", "to"], ["studiare", "", "study"], ["o", "", "or"], ["cercare", "", "look for"], ["lavoro", "", "work"], [".", "", ""]],
        en: "Many of these villages are emptying, because young people leave to study or to look for work.",
      },
      {
        t: [["Alcuni", "", "some", "alcuno"], ["comuni", "", "towns", "comune"], ["vendono", "", "sell", "vendere"], ["vecchie", "", "old", "vecchio"], ["case", "", "houses", "casa"], ["a", "", "at"], ["prezzi", "", "prices", "prezzo"], ["bassissimi", "", "very low", "basso"], [",", "", ""], ["a", "", "at"], ["volte", "", "times", "volta"], ["anche", "", "even"], ["a", "", "for"], ["un", "", "one", "uno"], ["euro", "", "euro"], [".", "", ""]],
        en: "Some towns sell old houses at very low prices, sometimes even for one euro.",
      },
      {
        t: [["In", "", "in", "in"], ["cambio", "", "exchange"], [",", "", ""], ["chi", "", "whoever"], ["le", "", "them"], ["compra", "", "buys", "comprare"], ["deve", "", "must", "dovere"], ["ristrutturarle", "", "renovate them", "ristrutturare"], ["entro", "", "within"], ["pochi", "", "a few", "poco"], ["anni", "", "years", "anno"], [".", "", ""]],
        en: "In exchange, whoever buys them must renovate them within a few years.",
      },
      {
        t: [["La", "", "the", "il"], ["vita", "", "life"], ["in", "", "in"], ["un", "", "a", "uno"], ["borgo", "", "village"], ["ha", "", "has", "avere"], ["molti", "", "many", "molto"], ["vantaggi", "", "advantages", "vantaggio"], [":", "", ""], ["l'", "", "the", "il"], ["aria", "", "air"], ["è", "", "is", "essere"], ["pulita", "", "clean", "pulito"], [",", "", ""], ["le", "", "the", "il"], ["case", "", "houses", "casa"], ["costano", "", "cost", "costare"], ["poco", "", "little"], ["e", "", "and"], ["c'", "", "there", "ci"], ["è", "", "is", "essere"], ["meno", "", "less"], ["traffico", "", "traffic"], [".", "", ""]],
        en: "Life in a village has many advantages: the air is clean, houses are cheap and there is less traffic.",
      },
      {
        t: [["Inoltre", "", "moreover", "inoltre"], [",", "", ""], ["i", "", "the", "il"], ["vicini", "", "neighbours", "vicino"], ["si", "", "each other"], ["conoscono", "", "know", "conoscere"], ["e", "", "and"], ["si", "", "each other"], ["aiutano", "", "help", "aiutare"], [".", "", ""]],
        en: "Moreover, neighbours know each other and help each other.",
      },
      {
        t: [["Ci", "", "there", "ci"], ["sono", "", "are", "essere"], ["però", "", "however"], ["anche", "", "also"], ["alcuni", "", "some", "alcuno"], ["problemi", "", "problems", "problema"], [".", "", ""]],
        en: "However, there are also some problems.",
      },
      {
        t: [["In", "", "in", "in"], ["certi", "", "certain", "certo"], ["paesi", "", "villages", "paese"], ["la", "", "the", "il"], ["connessione", "", "connection"], ["è", "", "is", "essere"], ["lenta", "", "slow", "lento"], ["e", "", "and"], ["i", "", "the", "il"], ["treni", "", "trains", "treno"], ["passano", "", "come by", "passare"], ["raramente", "", "rarely"], [".", "", ""]],
        en: "In certain villages the connection is slow and trains rarely come by.",
      },
      {
        t: [["Spesso", "", "often", "spesso"], ["mancano", "", "are missing", "mancare"], ["anche", "", "also"], ["servizi", "", "services", "servizio"], ["importanti", "", "important", "importante"], [",", "", ""], ["come", "", "like"], ["ospedali", "", "hospitals", "ospedale"], ["e", "", "and"], ["scuole", "", "schools", "scuola"], ["superiori", "", "secondary", "superiore"], [".", "", ""]],
        en: "Important services are often missing too, such as hospitals and secondary schools.",
      },
      {
        t: [["Per", "", "for", "per"], ["questo", "", "this"], [",", "", ""], ["prima", "", "before"], ["di", "", "(of)"], ["trasferirsi", "", "moving", "trasferire"], [",", "", ""], ["è", "", "it is", "essere"], ["meglio", "", "better"], ["passare", "", "to spend"], ["qualche", "", "a few"], ["settimana", "", "week"], ["sul", "", "on the", "su"], ["posto", "", "spot"], [".", "", ""]],
        en: "That's why, before moving, it's better to spend a few weeks there.",
      },
      {
        t: [["Solo", "", "only", "solo"], ["così", "", "this way"], ["si", "", "(one)"], ["può", "", "can", "potere"], ["capire", "", "understand"], ["se", "", "if"], ["quella", "", "that", "quello"], ["vita", "", "life"], ["fa", "", "is (right)", "fare"], ["davvero", "", "really"], ["per", "", "for"], ["noi", "", "us"], [".", "", ""]],
        en: "Only then can you understand whether that life is really right for you.",
      },
    ],
    q: [
      { q: "Why can some people now live far from the office?", o: ["They have more holidays", "They can work over the internet", "Offices have closed"], a: 1 },
      { q: "Why are many villages emptying?", o: ["Houses are too expensive", "Young people leave to study or work", "There is too much traffic"], a: 1 },
      { q: "What must people do if they buy a one-euro house?", o: ["Live there for twenty years", "Renovate it within a few years", "Open a shop"], a: 1 },
      { q: "Which of these is a problem in some villages?", o: ["Too much traffic", "Dirty air", "A slow internet connection"], a: 2 },
      { q: "What does the article advise before moving?", o: ["Selling your car", "Spending a few weeks there first", "Learning the local dialect"], a: 1 },
    ],
  },
];

export default data;
