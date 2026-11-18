import type { Text } from '../types';

const data: Text[] = [
  {
    id: "it-4-bici",
    lv: 4,
    kind: "article",
    title: "La città in bicicletta",
    titleEn: "The city by bike",
    s: [
      {
        t: [["Negli", "", "in the", "in"], ["ultimi", "", "last", "ultimo"], ["dieci", "", "ten"], ["anni", "", "years", "anno"], [",", "", ""], ["in", "", "in"], ["molte", "", "many", "molto"], ["città", "", "cities"], ["italiane", "", "Italian", "italiano"], ["il", "", "the"], ["numero", "", "number"], ["di", "", "of"], ["persone", "", "people", "persona"], ["che", "", "who"], ["vanno", "", "go", "andare"], ["al", "", "to", "a"], ["lavoro", "", "work"], ["in", "", "by"], ["bicicletta", "", "bicycle"], ["è", "", "has", "essere"], ["cresciuto", "", "grown", "crescere"], ["in", "", "in"], ["modo", "", "way"], ["significativo", "", "significant"], [".", "", ""]],
        en: "Over the last ten years, the number of people cycling to work has grown significantly in many Italian cities.",
      },
      {
        t: [["Il", "", "the", "il"], ["fenomeno", "", "phenomenon"], ["è", "", "is", "essere"], ["particolarmente", "", "particularly"], ["evidente", "", "noticeable"], ["in", "", "in"], ["città", "", "cities"], ["come", "", "like"], ["Ferrara", "", "Ferrara"], [",", "", ""], ["Bolzano", "", "Bolzano"], ["e", "", "and"], ["Pesaro", "", "Pesaro"], [",", "", ""], ["dove", "", "where"], ["la", "", "the", "il"], ["bici", "", "bike"], ["fa", "", "has been", "fare"], ["parte", "", "part"], ["della", "", "of the", "di"], ["vita", "", "life"], ["quotidiana", "", "everyday", "quotidiano"], ["da", "", "for"], ["decenni", "", "decades", "decennio"], [".", "", ""]],
        en: "The trend is particularly noticeable in cities like Ferrara, Bolzano and Pesaro, where the bike has been part of everyday life for decades.",
      },
      {
        t: [["Altrove", "", "elsewhere", "altrove"], [",", "", ""], ["invece", "", "however"], [",", "", ""], ["il", "", "the"], ["cambiamento", "", "change"], ["è", "", "is", "essere"], ["più", "", "more"], ["recente", "", "recent"], ["e", "", "and"], ["non", "", "not"], ["sempre", "", "always"], ["semplice", "", "easy"], [".", "", ""]],
        en: "Elsewhere, however, the change is more recent and not always easy.",
      },
      {
        t: [["Negli", "", "in the", "in"], ["ultimi", "", "last", "ultimo"], ["anni", "", "years", "anno"], [",", "", ""], ["numerose", "", "numerous", "numeroso"], ["amministrazioni", "", "local councils", "amministrazione"], ["hanno", "", "have", "avere"], ["realizzato", "", "built", "realizzare"], ["nuove", "", "new", "nuovo"], ["piste", "", "lanes", "pista"], ["ciclabili", "", "cycle", "ciclabile"], ["in", "", "in"], ["tempi", "", "times", "tempo"], ["record", "", "record"], [".", "", ""]],
        en: "In recent years, numerous local councils have built new cycle lanes in record time.",
      },
      {
        t: [["Alcune", "", "some", "alcuno"], ["sono", "", "have", "essere"], ["state", "", "been", "essere"], ["accolte", "", "welcomed", "accogliere"], ["con", "", "with"], ["entusiasmo", "", "enthusiasm"], [",", "", ""], ["altre", "", "others", "altro"], ["hanno", "", "have", "avere"], ["suscitato", "", "provoked", "suscitare"], ["proteste", "", "protests", "protesta"], ["da", "", "from"], ["parte", "", "part"], ["di", "", "of"], ["automobilisti", "", "drivers", "automobilista"], ["e", "", "and"], ["commercianti", "", "shopkeepers", "commerciante"], [".", "", ""]],
        en: "Some have been welcomed with enthusiasm, while others have provoked protests from drivers and shopkeepers.",
      },
      {
        t: [["Chi", "", "those who", "chi"], ["si", "", "(themselves)"], ["oppone", "", "oppose (it)", "opporre"], ["sostiene", "", "claim", "sostenere"], ["che", "", "that"], ["le", "", "the", "il"], ["piste", "", "lanes", "pista"], ["tolgano", "", "take away", "togliere"], ["spazio", "", "space"], ["ai", "", "from the", "a"], ["parcheggi", "", "parking spaces", "parcheggio"], ["e", "", "and"], ["rallentino", "", "slow down", "rallentare"], ["il", "", "the"], ["traffico", "", "traffic"], [".", "", ""]],
        en: "Opponents claim that the lanes take space away from parking and slow down traffic.",
      },
      {
        t: [["I", "", "the", "il"], ["sostenitori", "", "supporters", "sostenitore"], ["della", "", "of the", "di"], ["bicicletta", "", "bicycle"], ["ribattono", "", "reply", "ribattere"], ["che", "", "that"], ["meno", "", "fewer"], ["auto", "", "cars"], ["significano", "", "mean", "significare"], ["aria", "", "air"], ["più", "", "more"], ["pulita", "", "clean", "pulito"], ["e", "", "and"], ["strade", "", "streets", "strada"], ["più", "", "more"], ["sicure", "", "safe", "sicuro"], ["per", "", "for"], ["tutti", "", "everyone", "tutto"], [".", "", ""]],
        en: "Cycling supporters reply that fewer cars mean cleaner air and safer streets for everyone.",
      },
      {
        t: [["Secondo", "", "according to", "secondo"], ["diversi", "", "several", "diverso"], ["studi", "", "studies", "studio"], [",", "", ""], ["i", "", "the", "il"], ["negozi", "", "shops", "negozio"], ["situati", "", "located", "situato"], ["lungo", "", "along"], ["le", "", "the", "il"], ["piste", "", "lanes", "pista"], ["ciclabili", "", "cycle", "ciclabile"], ["non", "", "not"], ["perdono", "", "lose", "perdere"], ["clienti", "", "customers", "cliente"], [";", "", ""], ["anzi", "", "on the contrary"], [",", "", ""], ["spesso", "", "often"], ["ne", "", "(of them)"], ["guadagnano", "", "gain", "guadagnare"], [".", "", ""]],
        en: "According to several studies, shops located along cycle lanes don't lose customers; on the contrary, they often gain some.",
      },
      {
        t: [["Chi", "", "those who", "chi"], ["si", "", "(themselves)"], ["sposta", "", "get around", "spostare"], ["in", "", "by"], ["bici", "", "bike"], [",", "", ""], ["infatti", "", "in fact"], [",", "", ""], ["tende", "", "tend", "tendere"], ["a", "", "to"], ["fermarsi", "", "stop", "fermare"], ["più", "", "more"], ["spesso", "", "often"], ["e", "", "and"], ["a", "", "to"], ["fare", "", "do"], ["acquisti", "", "shopping", "acquisto"], ["nel", "", "in the", "in"], ["quartiere", "", "neighbourhood"], [".", "", ""]],
        en: "In fact, people who get around by bike tend to stop more often and shop in the neighbourhood.",
      },
      {
        t: [["Un", "", "a", "uno"], ["altro", "", "other"], ["fattore", "", "factor"], ["decisivo", "", "decisive"], ["è", "", "is", "essere"], ["la", "", "the", "il"], ["diffusione", "", "spread"], ["delle", "", "of the", "di"], ["biciclette", "", "bicycles", "bicicletta"], ["elettriche", "", "electric", "elettrico"], [".", "", ""]],
        en: "Another decisive factor is the spread of electric bikes.",
      },
      {
        t: [["Grazie", "", "thanks", "grazie"], ["al", "", "to the", "a"], ["motore", "", "motor"], [",", "", ""], ["anche", "", "even"], ["le", "", "the", "il"], ["salite", "", "climbs", "salita"], ["più", "", "most"], ["ripide", "", "steep", "ripido"], ["e", "", "and"], ["i", "", "the", "il"], ["tragitti", "", "journeys", "tragitto"], ["lunghi", "", "long", "lungo"], ["non", "", "no"], ["spaventano", "", "frighten", "spaventare"], ["più", "", "longer"], [".", "", ""]],
        en: "Thanks to the motor, even the steepest climbs and long journeys are no longer daunting.",
      },
      {
        t: [["Rimangono", "", "remain", "rimanere"], [",", "", ""], ["tuttavia", "", "however"], [",", "", ""], ["alcuni", "", "some", "alcuno"], ["ostacoli", "", "obstacles", "ostacolo"], ["importanti", "", "important", "importante"], [".", "", ""]],
        en: "However, some important obstacles remain.",
      },
      {
        t: [["In", "", "in", "in"], ["molte", "", "many", "molto"], ["città", "", "cities"], ["le", "", "the", "il"], ["piste", "", "lanes", "pista"], ["sono", "", "are", "essere"], ["ancora", "", "still"], ["frammentate", "", "fragmented", "frammentato"], [":", "", ""], ["iniziano", "", "(they) start", "iniziare"], ["all'", "", "(all of a)", "a"], ["improvviso", "", "sudden"], ["e", "", "and"], ["finiscono", "", "end", "finire"], ["nel", "", "in the", "in"], ["nulla", "", "nothing"], [".", "", ""]],
        en: "In many cities the lanes are still fragmented: they start suddenly and end in the middle of nowhere.",
      },
      {
        t: [["Inoltre", "", "moreover", "inoltre"], ["i", "", "the", "il"], ["furti", "", "thefts", "furto"], ["di", "", "of"], ["biciclette", "", "bicycles", "bicicletta"], ["sono", "", "are", "essere"], ["frequenti", "", "common", "frequente"], [",", "", ""], ["e", "", "and"], ["molti", "", "many people", "molto"], ["rinunciano", "", "give up", "rinunciare"], ["a", "", "(on)"], ["comprarne", "", "buying", "comprare"], ["una", "", "one", "uno"], ["costosa", "", "expensive", "costoso"], [".", "", ""]],
        en: "Moreover, bike thefts are common, and many people decide against buying an expensive one.",
      },
      {
        t: [["Per", "", "for", "per"], ["questo", "", "this"], ["alcuni", "", "some", "alcuno"], ["comuni", "", "towns", "comune"], ["stanno", "", "are", "stare"], ["costruendo", "", "building", "costruire"], ["parcheggi", "", "car parks", "parcheggio"], ["custoditi", "", "guarded", "custodito"], ["per", "", "for"], ["bici", "", "bikes"], ["vicino", "", "near"], ["alle", "", "to the", "a"], ["stazioni", "", "stations", "stazione"], [".", "", ""]],
        en: "That's why some towns are building guarded bike parks near stations.",
      },
      {
        t: [["Se", "", "if", "se"], ["queste", "", "these", "questo"], ["tendenze", "", "trends", "tendenza"], ["continueranno", "", "continue", "continuare"], [",", "", ""], ["la", "", "the", "il"], ["bicicletta", "", "bicycle"], ["potrebbe", "", "could", "potere"], ["diventare", "", "become"], ["un", "", "a", "uno"], ["mezzo", "", "means"], ["di", "", "of"], ["trasporto", "", "transport"], ["come", "", "like"], ["gli", "", "the", "il"], ["altri", "", "others", "altro"], [",", "", ""], ["e", "", "and"], ["non", "", "no"], ["più", "", "longer"], ["la", "", "the", "il"], ["scelta", "", "choice"], ["di", "", "of"], ["pochi", "", "a few", "poco"], ["appassionati", "", "enthusiasts", "appassionato"], [".", "", ""]],
        en: "If these trends continue, the bicycle could become a means of transport like any other, and no longer the choice of a few enthusiasts.",
      },
    ],
    q: [
      { q: "In which cities has cycling been common for decades?", o: ["Milan, Rome and Naples", "Ferrara, Bolzano and Pesaro", "Turin, Genoa and Venice"], a: 1 },
      { q: "What do opponents of the cycle lanes say?", o: ["They are too expensive", "They take away parking and slow traffic", "They are dangerous for cyclists"], a: 1 },
      { q: "What do studies say about shops along cycle lanes?", o: ["They close more often", "They lose many customers", "They often gain customers"], a: 2 },
      { q: "Why are electric bikes important?", o: ["They are cheaper than normal bikes", "They make hills and long journeys easier", "They can't be stolen"], a: 1 },
      { q: "What is one remaining obstacle?", o: ["Bike thefts", "Too many cycle lanes", "Expensive public transport"], a: 0 },
    ],
  },
  {
    id: "it-4-colloquio",
    lv: 4,
    kind: "story",
    title: "Il colloquio",
    titleEn: "The job interview",
    s: [
      {
        t: [["Luca", "", "Luca"], ["aveva", "", "had", "avere"], ["preparato", "", "prepared for", "preparare"], ["il", "", "the"], ["colloquio", "", "interview"], ["per", "", "for"], ["una", "", "a", "uno"], ["settimana", "", "week"], ["intera", "", "whole", "intero"], [".", "", ""]],
        en: "Luca had spent a whole week preparing for the interview.",
      },
      {
        t: [["Aveva", "", "(he) had", "avere"], ["studiato", "", "studied", "studiare"], ["la", "", "the", "il"], ["storia", "", "history"], ["dell'", "", "of the", "di"], ["azienda", "", "company"], [",", "", ""], ["ripassato", "", "gone over", "ripassare"], ["le", "", "the", "il"], ["risposte", "", "answers", "risposta"], ["alle", "", "to the", "a"], ["domande", "", "questions", "domanda"], ["più", "", "most"], ["comuni", "", "common", "comune"], ["e", "", "and"], ["scelto", "", "chosen", "scegliere"], ["con", "", "with"], ["cura", "", "care"], ["la", "", "the", "il"], ["camicia", "", "shirt"], ["da", "", "to"], ["indossare", "", "wear"], [".", "", ""]],
        en: "He had studied the company's history, gone over the answers to the most common questions and carefully chosen the shirt to wear.",
      },
      {
        t: [["La", "", "the", "il"], ["mattina", "", "morning"], ["del", "", "of the", "di"], ["colloquio", "", "interview"], [",", "", ""], ["però", "", "however"], [",", "", ""], ["è", "", "has", "essere"], ["andato", "", "gone", "andare"], ["tutto", "", "everything"], ["storto", "", "wrong"], [".", "", ""]],
        en: "On the morning of the interview, however, everything went wrong.",
      },
      {
        t: [["La", "", "the", "il"], ["sveglia", "", "alarm clock"], ["non", "", "not"], ["ha", "", "has", "avere"], ["suonato", "", "rung", "suonare"], [",", "", ""], ["e", "", "and"], ["quando", "", "when"], ["Luca", "", "Luca"], ["ha", "", "has", "avere"], ["aperto", "", "opened", "aprire"], ["gli", "", "the", "il"], ["occhi", "", "eyes", "occhio"], ["erano", "", "it was", "essere"], ["già", "", "already"], ["le", "", "(the)", "il"], ["otto", "", "eight"], ["e", "", "and"], ["mezza", "", "half", "mezzo"], [".", "", ""]],
        en: "The alarm didn't go off, and when Luca opened his eyes it was already half past eight.",
      },
      {
        t: [["Si", "", "(himself)", "si"], ["è", "", "has", "essere"], ["vestito", "", "dressed", "vestire"], ["in", "", "in"], ["fretta", "", "a hurry"], [",", "", ""], ["è", "", "has", "essere"], ["uscito", "", "gone out", "uscire"], ["senza", "", "without"], ["fare", "", "having"], ["colazione", "", "breakfast"], ["ed", "", "and", "e"], ["è", "", "has", "essere"], ["corso", "", "run", "correre"], ["alla", "", "to the", "a"], ["fermata", "", "stop"], ["dell'", "", "of the", "di"], ["autobus", "", "bus"], [".", "", ""]],
        en: "He got dressed in a hurry, left without having breakfast and ran to the bus stop.",
      },
      {
        t: [["Naturalmente", "", "naturally", "naturalmente"], ["l'", "", "the", "il"], ["autobus", "", "bus"], ["era", "", "had", "essere"], ["appena", "", "just"], ["passato", "", "gone by", "passare"], [".", "", ""]],
        en: "Naturally, the bus had just gone.",
      },
      {
        t: [["Allora", "", "so", "allora"], ["ha", "", "(he) has", "avere"], ["preso", "", "taken", "prendere"], ["un", "", "a", "uno"], ["taxi", "", "taxi"], [",", "", ""], ["ma", "", "but"], ["il", "", "the"], ["traffico", "", "traffic"], ["era", "", "was", "essere"], ["così", "", "so"], ["intenso", "", "heavy"], ["che", "", "that"], ["è", "", "(he) has", "essere"], ["arrivato", "", "arrived", "arrivare"], ["con", "", "with"], ["venti", "", "twenty"], ["minuti", "", "minutes", "minuto"], ["di", "", "of"], ["ritardo", "", "delay"], [".", "", ""]],
        en: "So he took a taxi, but the traffic was so heavy that he arrived twenty minutes late.",
      },
      {
        t: [["Alla", "", "at the", "a"], ["reception", "", "reception"], [",", "", ""], ["una", "", "a", "uno"], ["signora", "", "lady"], ["gentile", "", "kind"], ["gli", "", "to him"], ["ha", "", "has", "avere"], ["detto", "", "told", "dire"], ["di", "", "to"], ["accomodarsi", "", "take a seat", "accomodare"], ["e", "", "and"], ["aspettare", "", "wait"], [".", "", ""]],
        en: "At reception, a kind lady told him to take a seat and wait.",
      },
      {
        t: [["Luca", "", "Luca"], ["era", "", "was", "essere"], ["sicuro", "", "sure"], ["di", "", "(of)"], ["aver", "", "having", "avere"], ["perso", "", "lost", "perdere"], ["la", "", "the", "il"], ["sua", "", "his", "suo"], ["occasione", "", "chance"], [".", "", ""]],
        en: "Luca was sure he had missed his chance.",
      },
      {
        t: [["Dopo", "", "after", "dopo"], ["qualche", "", "a few"], ["minuto", "", "minute"], [",", "", ""], ["è", "", "has", "essere"], ["entrato", "", "come in", "entrare"], ["di", "", "in a"], ["corsa", "", "rush"], ["un", "", "a", "uno"], ["uomo", "", "man"], ["con", "", "with"], ["il", "", "the"], ["fiato", "", "breath"], ["corto", "", "short"], ["e", "", "and"], ["la", "", "the", "il"], ["giacca", "", "jacket"], ["bagnata", "", "wet", "bagnato"], ["di", "", "from"], ["pioggia", "", "rain"], [".", "", ""]],
        en: "A few minutes later, a man rushed in, out of breath, his jacket wet from the rain.",
      },
      {
        t: [["«", "", ""], ["Mi", "", "me", "mi"], ["scusi", "", "excuse", "scusare"], ["tanto", "", "very much"], ["»", "", ""], [",", "", ""], ["ha", "", "(he) has", "avere"], ["detto", "", "said", "dire"], [",", "", ""], ["«", "", ""], ["anch'", "", "also", "anche"], ["io", "", "I"], ["sono", "", "have", "essere"], ["rimasto", "", "got", "rimanere"], ["bloccato", "", "stuck", "bloccare"], ["nel", "", "in the", "in"], ["traffico", "", "traffic"], ["»", "", ""], [".", "", ""]],
        en: "\"I'm so sorry,\" he said, \"I got stuck in traffic too.\"",
      },
      {
        t: [["Era", "", "(it) was", "essere"], ["proprio", "", "precisely"], ["il", "", "the"], ["direttore", "", "manager"], ["con", "", "with"], ["cui", "", "whom"], ["Luca", "", "Luca"], ["aveva", "", "had", "avere"], ["appuntamento", "", "appointment"], [".", "", ""]],
        en: "It was the very manager Luca had the appointment with.",
      },
      {
        t: [["I", "", "the", "il"], ["due", "", "two"], ["si", "", "each other"], ["sono", "", "have", "essere"], ["guardati", "", "looked at", "guardare"], ["e", "", "and"], ["sono", "", "have", "essere"], ["scoppiati", "", "burst out", "scoppiare"], ["a", "", "(into)"], ["ridere", "", "laughing"], [".", "", ""]],
        en: "The two looked at each other and burst out laughing.",
      },
      {
        t: [["Il", "", "the", "il"], ["colloquio", "", "interview"], ["è", "", "has", "essere"], ["durato", "", "lasted", "durare"], ["quasi", "", "almost"], ["un'", "", "an", "uno"], ["ora", "", "hour"], ["ed", "", "and", "e"], ["è", "", "has", "essere"], ["stato", "", "been", "essere"], ["molto", "", "much"], ["più", "", "more"], ["rilassato", "", "relaxed"], ["di", "", "than"], ["quanto", "", "how"], ["Luca", "", "Luca"], ["si", "", "(himself)"], ["aspettasse", "", "expected", "aspettare"], [".", "", ""]],
        en: "The interview lasted almost an hour and was much more relaxed than Luca had expected.",
      },
      {
        t: [["Hanno", "", "(they) have", "avere"], ["parlato", "", "talked", "parlare"], ["di", "", "about"], ["lavoro", "", "work"], [",", "", ""], ["ma", "", "but"], ["anche", "", "also"], ["di", "", "about"], ["autobus", "", "buses"], ["in", "", "in"], ["ritardo", "", "delay"], ["e", "", "and"], ["di", "", "about"], ["sveglie", "", "alarm clocks", "sveglia"], ["che", "", "that"], ["non", "", "not"], ["suonano", "", "go off", "suonare"], [".", "", ""]],
        en: "They talked about work, but also about late buses and alarms that don't go off.",
      },
      {
        t: [["Una", "", "a", "uno"], ["settimana", "", "week"], ["dopo", "", "later"], [",", "", ""], ["Luca", "", "Luca"], ["ha", "", "has", "avere"], ["ricevuto", "", "received", "ricevere"], ["una", "", "a", "uno"], ["telefonata", "", "phone call"], [":", "", ""], ["il", "", "the"], ["posto", "", "job"], ["era", "", "was", "essere"], ["suo", "", "his"], [".", "", ""]],
        en: "A week later, Luca got a phone call: the job was his.",
      },
    ],
    q: [
      { q: "How long had Luca prepared for the interview?", o: ["One day", "A whole week", "A month"], a: 1 },
      { q: "Why was Luca late?", o: ["He got lost", "His alarm didn't go off and the traffic was heavy", "The bus broke down"], a: 1 },
      { q: "Who was the man who came in late?", o: ["Another candidate", "A taxi driver", "The manager Luca was meeting"], a: 2 },
      { q: "How was the interview?", o: ["Short and very formal", "More relaxed than Luca expected", "Cancelled because of the rain"], a: 1 },
      { q: "What happened a week later?", o: ["Luca had a second interview", "Luca was offered the job", "Luca wrote to the company"], a: 1 },
    ],
  },
  {
    id: "it-5-lettera",
    lv: 5,
    kind: "story",
    title: "La lettera nel libro",
    titleEn: "The letter in the book",
    s: [
      {
        t: [["Ogni", "", "every", "ogni"], ["domenica", "", "Sunday"], ["mattina", "", "morning"], [",", "", ""], ["Chiara", "", "Chiara"], ["aveva", "", "had", "avere"], ["l'", "", "the", "il"], ["abitudine", "", "habit"], ["di", "", "of"], ["girare", "", "wandering"], ["tra", "", "among"], ["le", "", "the", "il"], ["bancarelle", "", "stalls", "bancarella"], ["di", "", "of"], ["libri", "", "books", "libro"], ["usati", "", "second-hand", "usato"], ["del", "", "of the", "di"], ["mercatino", "", "flea market"], ["del", "", "of the", "di"], ["quartiere", "", "neighbourhood"], [".", "", ""]],
        en: "Every Sunday morning, Chiara had the habit of wandering among the second-hand book stalls at the neighbourhood flea market.",
      },
      {
        t: [["Non", "", "not", "non"], ["cercava", "", "(she) was looking for", "cercare"], ["nulla", "", "anything"], ["di", "", "(of)"], ["preciso", "", "particular"], [":", "", ""], ["le", "", "to her"], ["piaceva", "", "was pleasing", "piacere"], ["lasciarsi", "", "to let herself", "lasciare"], ["sorprendere", "", "be surprised"], [".", "", ""]],
        en: "She wasn't looking for anything in particular: she liked to let herself be surprised.",
      },
      {
        t: [["Quella", "", "that", "quello"], ["domenica", "", "Sunday"], ["le", "", "to her"], ["capitò", "", "happened", "capitare"], ["tra", "", "between"], ["le", "", "the", "il"], ["mani", "", "hands", "mano"], ["una", "", "a", "uno"], ["vecchia", "", "old", "vecchio"], ["edizione", "", "edition"], ["di", "", "of"], ["un", "", "a", "uno"], ["romanzo", "", "novel"], ["che", "", "that"], ["aveva", "", "(she) had", "avere"], ["amato", "", "loved", "amare"], ["da", "", "as a"], ["ragazza", "", "girl"], [".", "", ""]],
        en: "That Sunday she came across an old edition of a novel she had loved as a girl.",
      },
      {
        t: [["Lo", "", "it", "lo"], ["comprò", "", "(she) bought", "comprare"], ["per", "", "for"], ["pochi", "", "a few", "poco"], ["euro", "", "euros"], ["e", "", "and"], [",", "", ""], ["tornata", "", "having returned", "tornare"], ["a", "", "to"], ["casa", "", "home"], [",", "", ""], ["cominciò", "", "began", "cominciare"], ["a", "", "to"], ["sfogliarlo", "", "leaf through it", "sfogliare"], ["con", "", "with"], ["calma", "", "calm"], [".", "", ""]],
        en: "She bought it for a few euros and, once back home, began leafing through it at her leisure.",
      },
      {
        t: [["Tra", "", "between", "tra"], ["due", "", "two"], ["pagine", "", "pages", "pagina"], ["ingiallite", "", "yellowed", "ingiallito"], ["trovò", "", "(she) found", "trovare"], ["una", "", "a", "uno"], ["lettera", "", "letter"], ["piegata", "", "folded", "piegare"], ["in", "", "in"], ["quattro", "", "four"], [",", "", ""], ["scritta", "", "written", "scrivere"], ["a", "", "in"], ["penna", "", "pen"], ["con", "", "with"], ["una", "", "a", "uno"], ["grafia", "", "handwriting"], ["elegante", "", "elegant"], [".", "", ""]],
        en: "Between two yellowed pages she found a letter folded in four, written in pen in elegant handwriting.",
      },
      {
        t: [["Era", "", "(it) was", "essere"], ["datata", "", "dated", "datare"], ["maggio", "", "May"], ["1968", "", "1968"], ["e", "", "and"], ["cominciava", "", "began", "cominciare"], ["così", "", "like this"], [":", "", ""], ["«", "", ""], ["Cara", "", "dear", "caro"], ["Anna", "", "Anna"], [",", "", ""], ["non", "", "not"], ["so", "", "(I) know", "sapere"], ["se", "", "if"], ["avrò", "", "(I) will have", "avere"], ["mai", "", "ever"], ["il", "", "the"], ["coraggio", "", "courage"], ["di", "", "to"], ["spedirti", "", "send you", "spedire"], ["questa", "", "this", "questo"], ["lettera", "", "letter"], ["»", "", ""], [".", "", ""]],
        en: "It was dated May 1968 and began like this: \"Dear Anna, I don't know if I'll ever have the courage to send you this letter.\"",
      },
      {
        t: [["Chi", "", "the person who", "chi"], ["scriveva", "", "was writing", "scrivere"], ["era", "", "was", "essere"], ["un", "", "a", "uno"], ["giovane", "", "young"], ["studente", "", "student"], ["che", "", "who"], [",", "", ""], ["a", "", "(as)"], ["quanto", "", "far as"], ["pareva", "", "it seemed", "parere"], [",", "", ""], ["stava", "", "was", "stare"], ["per", "", "about to"], ["partire", "", "leave"], ["per", "", "for"], ["l'", "", "the", "il"], ["Argentina", "", "Argentina"], [".", "", ""]],
        en: "The writer was a young student who, it seemed, was about to leave for Argentina.",
      },
      {
        t: [["Confessava", "", "(he) confessed", "confessare"], ["ad", "", "to", "a"], ["Anna", "", "Anna"], ["di", "", "(of)"], ["averla", "", "having … her", "avere"], ["amata", "", "loved", "amare"], ["in", "", "in"], ["silenzio", "", "silence"], ["per", "", "for"], ["anni", "", "years", "anno"], [",", "", ""], ["senza", "", "without"], ["mai", "", "ever"], ["trovare", "", "finding"], ["il", "", "the"], ["momento", "", "moment"], ["giusto", "", "right"], ["per", "", "to"], ["dirglielo", "", "tell her", "dire"], [".", "", ""]],
        en: "He confessed to Anna that he had loved her in silence for years, without ever finding the right moment to tell her.",
      },
      {
        t: [["Chiara", "", "Chiara"], ["rimase", "", "remained", "rimanere"], ["a", "", "for"], ["lungo", "", "a long time"], ["seduta", "", "sitting", "seduto"], ["sul", "", "on the", "su"], ["divano", "", "sofa"], [",", "", ""], ["con", "", "with"], ["il", "", "the"], ["foglio", "", "sheet of paper"], ["tra", "", "between"], ["le", "", "the", "il"], ["dita", "", "fingers", "dito"], [".", "", ""]],
        en: "Chiara sat on the sofa for a long time, the sheet of paper between her fingers.",
      },
      {
        t: [["Si", "", "(herself)", "si"], ["chiedeva", "", "(she) wondered", "chiedere"], ["se", "", "whether"], ["Anna", "", "Anna"], ["avesse", "", "had", "avere"], ["mai", "", "ever"], ["letto", "", "read", "leggere"], ["quelle", "", "those", "quello"], ["parole", "", "words", "parola"], [",", "", ""], ["o", "", "or"], ["se", "", "whether"], ["la", "", "the", "il"], ["lettera", "", "letter"], ["fosse", "", "had", "essere"], ["rimasta", "", "remained", "rimanere"], ["per", "", "for"], ["sempre", "", "ever"], ["chiusa", "", "shut", "chiuso"], ["in", "", "in"], ["quel", "", "that", "quello"], ["libro", "", "book"], [".", "", ""]],
        en: "She wondered whether Anna had ever read those words, or whether the letter had stayed shut in that book forever.",
      },
      {
        t: [["Sul", "", "on the", "su"], ["frontespizio", "", "title page"], [",", "", ""], ["a", "", "in"], ["matita", "", "pencil"], [",", "", ""], ["c'", "", "there", "ci"], ["erano", "", "were", "essere"], ["un", "", "a", "uno"], ["nome", "", "name"], ["e", "", "and"], ["un", "", "an", "uno"], ["indirizzo", "", "address"], ["di", "", "in"], ["Bologna", "", "Bologna"], [".", "", ""]],
        en: "On the title page, in pencil, there was a name and an address in Bologna.",
      },
      {
        t: [["Spinta", "", "driven", "spingere"], ["dalla", "", "by the", "da"], ["curiosità", "", "curiosity"], [",", "", ""], ["Chiara", "", "Chiara"], ["decise", "", "decided", "decidere"], ["di", "", "to"], ["scrivere", "", "write"], ["a", "", "to"], ["quell'", "", "that", "quello"], ["indirizzo", "", "address"], [",", "", ""], ["pur", "", "even"], ["sapendo", "", "knowing", "sapere"], ["che", "", "that"], [",", "", ""], ["dopo", "", "after"], ["tanti", "", "so many", "tanto"], ["anni", "", "years", "anno"], [",", "", ""], ["le", "", "the", "il"], ["probabilità", "", "chances"], ["di", "", "of"], ["ricevere", "", "receiving"], ["una", "", "a", "uno"], ["risposta", "", "reply"], ["erano", "", "were", "essere"], ["minime", "", "minimal", "minimo"], [".", "", ""]],
        en: "Driven by curiosity, Chiara decided to write to that address, even though she knew that after so many years the chances of getting a reply were tiny.",
      },
      {
        t: [["Passarono", "", "passed", "passare"], ["settimane", "", "weeks", "settimana"], ["senza", "", "without"], ["notizie", "", "news", "notizia"], [",", "", ""], ["e", "", "and"], ["Chiara", "", "Chiara"], ["finì", "", "ended up", "finire"], ["quasi", "", "almost"], ["per", "", "(by)"], ["dimenticarsene", "", "forgetting about it", "dimenticare"], [".", "", ""]],
        en: "Weeks went by without news, and Chiara almost forgot about it.",
      },
      {
        t: [["Poi", "", "then", "poi"], [",", "", ""], ["una", "", "one", "uno"], ["sera", "", "evening"], ["di", "", "of"], ["fine", "", "end"], ["estate", "", "summer"], [",", "", ""], ["trovò", "", "(she) found", "trovare"], ["nella", "", "in the", "in"], ["cassetta", "", "box"], ["della", "", "of the", "di"], ["posta", "", "post"], ["una", "", "an", "uno"], ["busta", "", "envelope"], ["azzurra", "", "light blue", "azzurro"], [".", "", ""]],
        en: "Then, one evening at the end of summer, she found a light blue envelope in the letterbox.",
      },
      {
        t: [["L'", "", "it", "la"], ["aveva", "", "had", "avere"], ["spedita", "", "sent", "spedire"], ["la", "", "the", "il"], ["nipote", "", "granddaughter"], ["di", "", "of"], ["Anna", "", "Anna"], [",", "", ""], ["che", "", "who"], ["le", "", "to her"], ["raccontava", "", "told", "raccontare"], ["una", "", "a", "uno"], ["storia", "", "story"], ["sorprendente", "", "surprising"], [".", "", ""]],
        en: "It had been sent by Anna's granddaughter, who told her a surprising story.",
      },
      {
        t: [["La", "", "the", "il"], ["lettera", "", "letter"], ["non", "", "not"], ["era", "", "had", "essere"], ["mai", "", "ever"], ["stata", "", "been", "essere"], ["spedita", "", "sent", "spedire"], [",", "", ""], ["ma", "", "but"], ["lo", "", "the", "il"], ["studente", "", "student"], [",", "", ""], ["qualche", "", "a few"], ["anno", "", "year"], ["dopo", "", "later"], [",", "", ""], ["era", "", "had", "essere"], ["tornato", "", "returned", "tornare"], ["dall'", "", "from", "da"], ["Argentina", "", "Argentina"], ["e", "", "and"], ["aveva", "", "had", "avere"], ["ritrovato", "", "found again", "ritrovare"], ["Anna", "", "Anna"], [".", "", ""]],
        en: "The letter had never been sent, but the student had come back from Argentina a few years later and found Anna again.",
      },
      {
        t: [["Si", "", "(themselves)", "si"], ["erano", "", "had", "essere"], ["sposati", "", "married", "sposare"], ["nel", "", "in", "in"], ["1975", "", "1975"], ["e", "", "and"], ["avevano", "", "had", "avere"], ["trascorso", "", "spent", "trascorrere"], ["insieme", "", "together"], ["tutta", "", "all", "tutto"], ["la", "", "the", "il"], ["vita", "", "life"], [".", "", ""]],
        en: "They had married in 1975 and spent their whole lives together.",
      },
      {
        t: [["«", "", ""], ["Il", "", "the", "il"], ["nonno", "", "grandfather"], ["diceva", "", "used to say", "dire"], ["sempre", "", "always"], ["che", "", "that"], ["quella", "", "that", "quello"], ["lettera", "", "letter"], ["non", "", "not"], ["era", "", "had", "essere"], ["servita", "", "been needed", "servire"], ["»", "", ""], [",", "", ""], ["concludeva", "", "concluded", "concludere"], ["la", "", "the", "il"], ["ragazza", "", "girl"], [",", "", ""], ["«", "", ""], ["perché", "", "because"], ["alla", "", "in the", "a"], ["fine", "", "end"], ["glielo", "", "it to her"], ["aveva", "", "had", "avere"], ["detto", "", "said", "dire"], ["di", "", "in"], ["persona", "", "person"], ["»", "", ""], [".", "", ""]],
        en: "\"Grandpa always said that letter hadn't been needed,\" the girl concluded, \"because in the end he had told her in person.\"",
      },
    ],
    q: [
      { q: "Where did Chiara find the book?", o: ["In a library", "At a second-hand book stall", "In her grandmother's house"], a: 1 },
      { q: "What was the letter about?", o: ["A business deal", "A young man's secret love for Anna", "A trip to Bologna"], a: 1 },
      { q: "What did Chiara do after finding the address?", o: ["She went to Bologna", "She wrote to the address", "She sold the book"], a: 1 },
      { q: "Who replied to Chiara?", o: ["Anna herself", "The student", "Anna's granddaughter"], a: 2 },
      { q: "What happened to the student and Anna?", o: ["They never met again", "They got married", "They wrote letters for years"], a: 1 },
    ],
  },
  {
    id: "it-5-sonno",
    lv: 5,
    kind: "article",
    title: "Il mistero del sonno",
    titleEn: "The mystery of sleep",
    s: [
      {
        t: [["Trascorriamo", "", "(we) spend", "trascorrere"], ["circa", "", "about"], ["un", "", "a", "uno"], ["terzo", "", "third"], ["della", "", "of the", "di"], ["nostra", "", "our", "nostro"], ["vita", "", "life"], ["dormendo", "", "sleeping", "dormire"], [",", "", ""], ["eppure", "", "and yet"], ["il", "", "the"], ["sonno", "", "sleep"], ["resta", "", "remains", "restare"], ["uno", "", "one"], ["dei", "", "of the", "di"], ["fenomeni", "", "phenomena", "fenomeno"], ["meno", "", "least"], ["compresi", "", "understood", "comprendere"], ["dalla", "", "by the", "da"], ["scienza", "", "science"], [".", "", ""]],
        en: "We spend about a third of our lives asleep, and yet sleep remains one of the phenomena least understood by science.",
      },
      {
        t: [["Per", "", "for", "per"], ["secoli", "", "centuries", "secolo"], ["lo", "", "it"], ["si", "", "(one)"], ["è", "", "has", "essere"], ["considerato", "", "considered", "considerare"], ["un", "", "a", "uno"], ["semplice", "", "simple"], ["stato", "", "state"], ["di", "", "of"], ["riposo", "", "rest"], [",", "", ""], ["durante", "", "during"], ["il", "", "the"], ["quale", "", "which"], ["il", "", "the"], ["cervello", "", "brain"], ["si", "", "(itself)"], ["limitava", "", "restricted", "limitare"], ["a", "", "to"], ["spegnersi", "", "switching off", "spegnere"], [".", "", ""]],
        en: "For centuries it was considered a simple state of rest, during which the brain merely switched off.",
      },
      {
        t: [["Oggi", "", "today", "oggi"], ["sappiamo", "", "(we) know", "sapere"], ["invece", "", "instead"], ["che", "", "that"], [",", "", ""], ["mentre", "", "while"], ["dormiamo", "", "(we) sleep", "dormire"], [",", "", ""], ["il", "", "the"], ["cervello", "", "brain"], ["svolge", "", "carries out", "svolgere"], ["un'", "", "an", "uno"], ["intensa", "", "intense", "intenso"], ["attività", "", "activity"], [".", "", ""]],
        en: "Today, by contrast, we know that while we sleep the brain is intensely active.",
      },
      {
        t: [["Durante", "", "during", "durante"], ["la", "", "the", "il"], ["notte", "", "night"], ["si", "", "(themselves)"], ["alternano", "", "alternate", "alternare"], ["diverse", "", "several", "diverso"], ["fasi", "", "phases", "fase"], [",", "", ""], ["ognuna", "", "each one"], ["con", "", "with"], ["una", "", "a", "uno"], ["funzione", "", "function"], ["specifica", "", "specific", "specifico"], [".", "", ""]],
        en: "During the night several phases alternate, each with a specific function.",
      },
      {
        t: [["Nel", "", "in the", "in"], ["sonno", "", "sleep"], ["profondo", "", "deep"], ["l'", "", "the", "il"], ["organismo", "", "body"], ["ripara", "", "repairs", "riparare"], ["i", "", "the", "il"], ["tessuti", "", "tissues", "tessuto"], ["e", "", "and"], ["rafforza", "", "strengthens", "rafforzare"], ["il", "", "the"], ["sistema", "", "system"], ["immunitario", "", "immune"], [".", "", ""]],
        en: "In deep sleep, the body repairs tissue and strengthens the immune system.",
      },
      {
        t: [["Nella", "", "in the", "in"], ["fase", "", "phase"], ["REM", "", "REM"], [",", "", ""], ["quella", "", "the one", "quello"], ["in", "", "in"], ["cui", "", "which"], ["si", "", "(one)"], ["sogna", "", "dreams", "sognare"], ["di", "", "(of)"], ["più", "", "more"], [",", "", ""], ["il", "", "the"], ["cervello", "", "brain"], ["rielabora", "", "processes", "rielaborare"], ["le", "", "the", "il"], ["emozioni", "", "emotions", "emozione"], ["e", "", "and"], ["consolida", "", "consolidates", "consolidare"], ["i", "", "the", "il"], ["ricordi", "", "memories", "ricordo"], [".", "", ""]],
        en: "In the REM phase, the one in which we dream most, the brain processes emotions and consolidates memories.",
      },
      {
        t: [["Diversi", "", "several", "diverso"], ["esperimenti", "", "experiments", "esperimento"], ["hanno", "", "have", "avere"], ["dimostrato", "", "shown", "dimostrare"], ["che", "", "that"], ["chi", "", "whoever"], ["dorme", "", "sleeps", "dormire"], ["dopo", "", "after"], ["aver", "", "having", "avere"], ["studiato", "", "studied", "studiare"], ["ricorda", "", "remembers", "ricordare"], ["meglio", "", "better"], ["ciò", "", "what"], ["che", "", "(that)"], ["ha", "", "has", "avere"], ["imparato", "", "learnt", "imparare"], [".", "", ""]],
        en: "Several experiments have shown that people who sleep after studying remember what they have learnt better.",
      },
      {
        t: [["Le", "", "the", "il"], ["conseguenze", "", "consequences", "conseguenza"], ["della", "", "of the", "di"], ["mancanza", "", "lack"], ["di", "", "of"], ["sonno", "", "sleep"], [",", "", ""], ["del", "", "(for) the", "di"], ["resto", "", "rest"], [",", "", ""], ["sono", "", "are", "essere"], ["ben", "", "well", "bene"], ["documentate", "", "documented", "documentato"], [".", "", ""]],
        en: "The consequences of sleep deprivation, after all, are well documented.",
      },
      {
        t: [["Dopo", "", "after", "dopo"], ["una", "", "a", "uno"], ["sola", "", "single", "solo"], ["notte", "", "night"], ["in", "", "in"], ["bianco", "", "white"], [",", "", ""], ["la", "", "the", "il"], ["capacità", "", "ability"], ["di", "", "of"], ["concentrazione", "", "concentration"], ["cala", "", "drops", "calare"], ["sensibilmente", "", "noticeably"], ["e", "", "and"], ["aumenta", "", "increases", "aumentare"], ["l'", "", "the", "il"], ["irritabilità", "", "irritability"], [".", "", ""]],
        en: "After just one sleepless night, the ability to concentrate drops noticeably and irritability increases.",
      },
      {
        t: [["Se", "", "if", "se"], ["la", "", "the", "il"], ["privazione", "", "deprivation"], ["si", "", "(itself)"], ["protrae", "", "goes on", "protrarre"], ["nel", "", "in the", "in"], ["tempo", "", "time"], [",", "", ""], ["cresce", "", "grows", "crescere"], ["il", "", "the"], ["rischio", "", "risk"], ["di", "", "of"], ["malattie", "", "diseases", "malattia"], ["cardiovascolari", "", "cardiovascular", "cardiovascolare"], [",", "", ""], ["diabete", "", "diabetes"], ["e", "", "and"], ["depressione", "", "depression"], [".", "", ""]],
        en: "If the deprivation goes on over time, the risk of cardiovascular disease, diabetes and depression rises.",
      },
      {
        t: [["Eppure", "", "and yet", "eppure"], [",", "", ""], ["nella", "", "in the", "in"], ["società", "", "society"], ["di", "", "of"], ["oggi", "", "today"], [",", "", ""], ["dormire", "", "sleeping"], ["poco", "", "little"], ["viene", "", "is", "venire"], ["spesso", "", "often"], ["considerato", "", "considered", "considerare"], ["quasi", "", "almost"], ["un", "", "a", "uno"], ["segno", "", "sign"], ["di", "", "of"], ["produttività", "", "productivity"], [".", "", ""]],
        en: "And yet, in today's society, sleeping little is often seen almost as a sign of productivity.",
      },
      {
        t: [["A", "", "to", "a"], ["ciò", "", "this"], ["si", "", "(itself)"], ["aggiunge", "", "is added", "aggiungere"], ["l'", "", "the", "il"], ["uso", "", "use"], ["massiccio", "", "heavy"], ["di", "", "of"], ["schermi", "", "screens", "schermo"], ["nelle", "", "in the", "in"], ["ore", "", "hours", "ora"], ["serali", "", "evening", "serale"], [".", "", ""]],
        en: "On top of this comes the heavy use of screens in the evening.",
      },
      {
        t: [["La", "", "the", "il"], ["luce", "", "light"], ["blu", "", "blue"], ["emessa", "", "emitted", "emettere"], ["da", "", "by"], ["telefoni", "", "phones", "telefono"], ["e", "", "and"], ["tablet", "", "tablets"], ["ostacola", "", "hinders", "ostacolare"], ["la", "", "the", "il"], ["produzione", "", "production"], ["di", "", "of"], ["melatonina", "", "melatonin"], [",", "", ""], ["l'", "", "the", "il"], ["ormone", "", "hormone"], ["che", "", "that"], ["regola", "", "regulates", "regolare"], ["il", "", "the"], ["ciclo", "", "cycle"], ["del", "", "of the", "di"], ["sonno", "", "sleep"], [".", "", ""]],
        en: "The blue light emitted by phones and tablets hinders the production of melatonin, the hormone that regulates the sleep cycle.",
      },
      {
        t: [["Gli", "", "the", "il"], ["esperti", "", "experts", "esperto"], ["consigliano", "", "advise", "consigliare"], ["quindi", "", "therefore"], ["di", "", "to"], ["spegnere", "", "switch off"], ["i", "", "the", "il"], ["dispositivi", "", "devices", "dispositivo"], ["almeno", "", "at least"], ["un'", "", "an", "uno"], ["ora", "", "hour"], ["prima", "", "before"], ["di", "", "(of)"], ["andare", "", "going"], ["a", "", "to"], ["letto", "", "bed"], [".", "", ""]],
        en: "Experts therefore advise switching off devices at least an hour before going to bed.",
      },
      {
        t: [["È", "", "it is", "essere"], ["utile", "", "useful"], ["anche", "", "also"], ["mantenere", "", "to keep"], ["orari", "", "times", "orario"], ["regolari", "", "regular", "regolare"], [",", "", ""], ["perfino", "", "even"], ["nel", "", "at the", "in"], ["fine", "", "end"], ["settimana", "", "week"], [".", "", ""]],
        en: "It also helps to keep regular hours, even at the weekend.",
      },
      {
        t: [["Non", "", "not", "non"], ["esiste", "", "exists", "esistere"], [",", "", ""], ["comunque", "", "however"], [",", "", ""], ["una", "", "a", "uno"], ["quantità", "", "amount"], ["di", "", "of"], ["sonno", "", "sleep"], ["valida", "", "valid", "valido"], ["per", "", "for"], ["tutti", "", "everyone", "tutto"], [":", "", ""], ["c'", "", "there", "ci"], ["è", "", "is", "essere"], ["chi", "", "those who"], ["sta", "", "feels", "stare"], ["benissimo", "", "very well", "bene"], ["con", "", "with"], ["sei", "", "six"], ["ore", "", "hours", "ora"], ["e", "", "and"], ["chi", "", "those who"], ["ne", "", "of them"], ["ha", "", "has", "avere"], ["bisogno", "", "need"], ["di", "", "(of)"], ["nove", "", "nine"], [".", "", ""]],
        en: "There is no amount of sleep that suits everyone, though: some people feel great with six hours and others need nine.",
      },
      {
        t: [["L'", "", "the", "il"], ["importante", "", "important thing"], [",", "", ""], ["in", "", "in"], ["fondo", "", "the end"], [",", "", ""], ["è", "", "is", "essere"], ["ascoltare", "", "to listen to"], ["il", "", "the"], ["proprio", "", "one's own"], ["corpo", "", "body"], [",", "", ""], ["anziché", "", "instead of"], ["considerare", "", "considering"], ["il", "", "the"], ["riposo", "", "rest"], ["una", "", "a", "uno"], ["perdita", "", "waste"], ["di", "", "of"], ["tempo", "", "time"], [".", "", ""]],
        en: "What matters, in the end, is listening to your own body, instead of seeing rest as a waste of time.",
      },
    ],
    q: [
      { q: "How was sleep seen for centuries?", o: ["As a dangerous state", "As a simple state of rest", "As a kind of illness"], a: 1 },
      { q: "What happens in the REM phase?", o: ["The body repairs tissue", "The brain processes emotions and memories", "The heart stops for a moment"], a: 1 },
      { q: "What can one sleepless night cause?", o: ["Diabetes", "Poorer concentration and irritability", "Better productivity"], a: 1 },
      { q: "Why should we switch off screens before bed?", o: ["They are noisy", "Their blue light hinders melatonin production", "They use too much electricity"], a: 1 },
      { q: "How much sleep does everyone need?", o: ["Exactly eight hours", "At least nine hours", "It varies from person to person"], a: 2 },
    ],
  },
  {
    id: "it-6-dialetti",
    lv: 6,
    kind: "article",
    title: "L'italiano e i dialetti",
    titleEn: "Italian and the dialects",
    s: [
      {
        t: [["Quando", "", "when", "quando"], ["l'", "", "the", "il"], ["Italia", "", "Italy"], ["fu", "", "was", "essere"], ["unificata", "", "unified", "unificare"], [",", "", ""], ["nel", "", "in", "in"], ["1861", "", "1861"], [",", "", ""], ["soltanto", "", "only"], ["una", "", "a", "uno"], ["piccola", "", "small", "piccolo"], ["minoranza", "", "minority"], ["della", "", "of the", "di"], ["popolazione", "", "population"], ["parlava", "", "spoke", "parlare"], ["correntemente", "", "fluently"], ["l'", "", "the", "il"], ["italiano", "", "Italian"], [".", "", ""]],
        en: "When Italy was unified in 1861, only a small minority of the population spoke Italian fluently.",
      },
      {
        t: [["Nella", "", "in the", "in"], ["vita", "", "life"], ["di", "", "of"], ["tutti", "", "all", "tutto"], ["i", "", "the", "il"], ["giorni", "", "days", "giorno"], [",", "", ""], ["la", "", "the", "il"], ["stragrande", "", "overwhelming"], ["maggioranza", "", "majority"], ["si", "", "(itself)"], ["esprimeva", "", "expressed", "esprimere"], ["in", "", "in"], ["dialetto", "", "dialect"], [",", "", ""], ["e", "", "and"], ["un", "", "a", "uno"], ["contadino", "", "farmer"], ["piemontese", "", "Piedmontese"], ["avrebbe", "", "would have", "avere"], ["faticato", "", "struggled", "faticare"], ["non", "", "not"], ["poco", "", "a little"], ["a", "", "to"], ["farsi", "", "make himself", "fare"], ["capire", "", "understood"], ["da", "", "by"], ["un", "", "a", "uno"], ["pescatore", "", "fisherman"], ["siciliano", "", "Sicilian"], [".", "", ""]],
        en: "In everyday life, the overwhelming majority expressed themselves in dialect, and a Piedmontese farmer would have struggled considerably to make himself understood by a Sicilian fisherman.",
      },
      {
        t: [["L'", "", "the", "il"], ["italiano", "", "Italian"], [",", "", ""], ["del", "", "(for) the", "di"], ["resto", "", "rest"], [",", "", ""], ["era", "", "had", "essere"], ["rimasto", "", "remained", "rimanere"], ["per", "", "for"], ["secoli", "", "centuries", "secolo"], ["soprattutto", "", "above all"], ["una", "", "a", "uno"], ["lingua", "", "language"], ["scritta", "", "written", "scritto"], ["e", "", "and"], ["letteraria", "", "literary", "letterario"], [",", "", ""], ["modellata", "", "modelled", "modellare"], ["sul", "", "on the", "su"], ["fiorentino", "", "Florentine"], ["di", "", "of"], ["Dante", "", "Dante"], [",", "", ""], ["Petrarca", "", "Petrarch"], ["e", "", "and"], ["Boccaccio", "", "Boccaccio"], [".", "", ""]],
        en: "Italian, after all, had for centuries remained above all a written, literary language, modelled on the Florentine of Dante, Petrarch and Boccaccio.",
      },
      {
        t: [["A", "", "to", "a"], ["diffonderlo", "", "spreading it", "diffondere"], ["tra", "", "among"], ["la", "", "the", "il"], ["gente", "", "people"], ["comune", "", "ordinary"], ["contribuirono", "", "contributed", "contribuire"], [",", "", ""], ["nel", "", "in the", "in"], ["corso", "", "course"], ["del", "", "of the", "di"], ["Novecento", "", "twentieth century", "novecento"], [",", "", ""], ["la", "", "the", "il"], ["scuola", "", "schooling"], ["obbligatoria", "", "compulsory", "obbligatorio"], [",", "", ""], ["il", "", "the"], ["servizio", "", "service"], ["militare", "", "military"], [",", "", ""], ["le", "", "the", "il"], ["migrazioni", "", "migrations", "migrazione"], ["interne", "", "internal", "interno"], ["e", "", "and"], [",", "", ""], ["soprattutto", "", "above all"], [",", "", ""], ["la", "", "the", "il"], ["televisione", "", "television"], [".", "", ""]],
        en: "Over the course of the twentieth century, compulsory schooling, military service, internal migration and, above all, television helped spread it among ordinary people.",
      },
      {
        t: [["Negli", "", "in the", "in"], ["anni", "", "years", "anno"], ["Cinquanta", "", "fifties", "cinquanta"], ["e", "", "and"], ["Sessanta", "", "sixties", "sessanta"], [",", "", ""], ["milioni", "", "millions", "milione"], ["di", "", "of"], ["italiani", "", "Italians", "italiano"], ["impararono", "", "learnt", "imparare"], ["la", "", "the", "il"], ["lingua", "", "language"], ["nazionale", "", "national"], ["davanti", "", "in front"], ["al", "", "of the", "a"], ["televisore", "", "TV set"], [".", "", ""]],
        en: "In the fifties and sixties, millions of Italians learnt the national language in front of the TV set.",
      },
      {
        t: [["Questo", "", "this", "questo"], ["processo", "", "process"], [",", "", ""], ["tuttavia", "", "however"], [",", "", ""], ["ebbe", "", "had", "avere"], ["anche", "", "also"], ["il", "", "the"], ["suo", "", "its"], ["rovescio", "", "reverse"], ["della", "", "of the", "di"], ["medaglia", "", "medal"], [".", "", ""]],
        en: "This process, however, also had its downside.",
      },
      {
        t: [["Per", "", "for", "per"], ["decenni", "", "decades", "decennio"], ["il", "", "the"], ["dialetto", "", "dialect"], ["fu", "", "was", "essere"], ["associato", "", "associated", "associare"], ["all'", "", "with", "a"], ["arretratezza", "", "backwardness"], ["e", "", "and"], ["all'", "", "with", "a"], ["ignoranza", "", "ignorance"], [",", "", ""], ["tanto", "", "so much"], ["che", "", "that"], ["molti", "", "many", "molto"], ["genitori", "", "parents", "genitore"], ["evitavano", "", "avoided", "evitare"], ["di", "", "(of)"], ["parlarlo", "", "speaking it", "parlare"], ["con", "", "with"], ["i", "", "the", "il"], ["figli", "", "children", "figlio"], [".", "", ""]],
        en: "For decades dialect was associated with backwardness and ignorance, so much so that many parents avoided speaking it with their children.",
      },
      {
        t: [["Intere", "", "whole", "intero"], ["generazioni", "", "generations", "generazione"], ["crebbero", "", "grew up", "crescere"], ["così", "", "thus"], ["capendo", "", "understanding", "capire"], ["il", "", "the"], ["dialetto", "", "dialect"], ["dei", "", "of the", "di"], ["nonni", "", "grandparents", "nonno"], ["senza", "", "without"], ["saperlo", "", "being able to … it", "sapere"], ["parlare", "", "speak"], [".", "", ""]],
        en: "Whole generations thus grew up understanding their grandparents' dialect without being able to speak it.",
      },
      {
        t: [["Va", "", "it should be", "andare"], ["precisato", "", "pointed out", "precisare"], ["che", "", "that"], [",", "", ""], ["dal", "", "from the", "da"], ["punto", "", "point"], ["di", "", "of"], ["vista", "", "view"], ["linguistico", "", "linguistic"], [",", "", ""], ["i", "", "the", "il"], ["dialetti", "", "dialects", "dialetto"], ["non", "", "not"], ["sono", "", "are", "essere"], ["affatto", "", "at all"], ["versioni", "", "versions", "versione"], ["«", "", ""], ["sbagliate", "", "wrong", "sbagliato"], ["»", "", ""], ["dell'", "", "of the", "di"], ["italiano", "", "Italian"], [".", "", ""]],
        en: "It should be pointed out that, from a linguistic point of view, dialects are by no means \"wrong\" versions of Italian.",
      },
      {
        t: [["Si", "", "(itself)", "si"], ["tratta", "", "it is about", "trattare"], ["di", "", "(of)"], ["idiomi", "", "languages", "idioma"], ["a", "", "with"], ["pieno", "", "full"], ["titolo", "", "right"], [",", "", ""], ["derivati", "", "derived", "derivare"], ["direttamente", "", "directly"], ["dal", "", "from the", "da"], ["latino", "", "Latin"], ["e", "", "and"], ["dotati", "", "equipped", "dotato"], ["di", "", "with"], ["una", "", "a", "uno"], ["propria", "", "their own", "proprio"], ["grammatica", "", "grammar"], [",", "", ""], ["di", "", "with"], ["un", "", "a", "uno"], ["proprio", "", "their own"], ["lessico", "", "vocabulary"], ["e", "", "and"], [",", "", ""], ["in", "", "in"], ["molti", "", "many", "molto"], ["casi", "", "cases", "caso"], [",", "", ""], ["di", "", "with"], ["una", "", "a", "uno"], ["ricca", "", "rich", "ricco"], ["tradizione", "", "tradition"], ["letteraria", "", "literary", "letterario"], [".", "", ""]],
        en: "They are languages in their own right, derived directly from Latin, with their own grammar, their own vocabulary and, in many cases, a rich literary tradition.",
      },
      {
        t: [["Basti", "", "suffice it", "bastare"], ["pensare", "", "to think"], ["alle", "", "of the", "a"], ["commedie", "", "comedies", "commedia"], ["di", "", "of"], ["Goldoni", "", "Goldoni"], ["in", "", "in"], ["veneziano", "", "Venetian"], [",", "", ""], ["ai", "", "of the", "a"], ["sonetti", "", "sonnets", "sonetto"], ["di", "", "of"], ["Belli", "", "Belli"], ["in", "", "in"], ["romanesco", "", "Roman dialect"], ["o", "", "or"], ["al", "", "of the", "a"], ["teatro", "", "theatre"], ["di", "", "of"], ["Eduardo", "", "Eduardo"], ["De", "", "De"], ["Filippo", "", "Filippo"], ["in", "", "in"], ["napoletano", "", "Neapolitan"], [".", "", ""]],
        en: "Suffice it to think of Goldoni's comedies in Venetian, Belli's sonnets in Roman dialect or Eduardo De Filippo's theatre in Neapolitan.",
      },
      {
        t: [["Negli", "", "in the", "in"], ["ultimi", "", "last", "ultimo"], ["decenni", "", "decades", "decennio"], ["l'", "", "the", "il"], ["atteggiamento", "", "attitude"], ["nei", "", "towards the", "in"], ["confronti", "", "(towards)", "confronto"], ["dei", "", "of the", "di"], ["dialetti", "", "dialects", "dialetto"], ["è", "", "has", "essere"], ["profondamente", "", "profoundly"], ["mutato", "", "changed", "mutare"], [".", "", ""]],
        en: "In recent decades, attitudes towards dialects have changed profoundly.",
      },
      {
        t: [["Lungi", "", "far", "lungi"], ["dall'", "", "from", "da"], ["essere", "", "being"], ["motivo", "", "cause"], ["di", "", "for"], ["vergogna", "", "shame"], [",", "", ""], ["oggi", "", "today"], ["vengono", "", "(they) are", "venire"], ["percepiti", "", "perceived", "percepire"], ["come", "", "as"], ["un", "", "a", "uno"], ["patrimonio", "", "heritage"], ["culturale", "", "cultural"], ["da", "", "to be"], ["tutelare", "", "protected"], [".", "", ""]],
        en: "Far from being a cause for shame, today they are seen as a cultural heritage to be protected.",
      },
      {
        t: [["Non", "", "not", "non"], ["sono", "", "are", "essere"], ["pochi", "", "few", "poco"], ["i", "", "the", "il"], ["cantautori", "", "singer-songwriters", "cantautore"], ["che", "", "who"], ["scelgono", "", "choose", "scegliere"], ["di", "", "to"], ["scrivere", "", "write"], ["in", "", "in"], ["dialetto", "", "dialect"], [",", "", ""], ["e", "", "and"], ["alcune", "", "some", "alcuno"], ["scuole", "", "schools", "scuola"], ["propongono", "", "offer", "proporre"], ["laboratori", "", "workshops", "laboratorio"], ["per", "", "for"], ["i", "", "the", "il"], ["più", "", "most"], ["giovani", "", "young", "giovane"], [".", "", ""]],
        en: "Quite a few singer-songwriters choose to write in dialect, and some schools offer workshops for the youngest pupils.",
      },
      {
        t: [["Ciononostante", "", "nevertheless", "ciononostante"], [",", "", ""], ["le", "", "the", "il"], ["indagini", "", "surveys", "indagine"], ["statistiche", "", "statistical", "statistico"], ["mostrano", "", "show", "mostrare"], ["che", "", "that"], ["l'", "", "the", "il"], ["uso", "", "use"], ["esclusivo", "", "exclusive"], ["del", "", "of the", "di"], ["dialetto", "", "dialect"], ["in", "", "in"], ["famiglia", "", "the family"], ["è", "", "is", "essere"], ["in", "", "in"], ["costante", "", "constant"], ["calo", "", "decline"], [".", "", ""]],
        en: "Nevertheless, statistical surveys show that the exclusive use of dialect at home is in constant decline.",
      },
      {
        t: [["Oggi", "", "today", "oggi"], ["la", "", "the", "il"], ["maggior", "", "greater", "maggiore"], ["parte", "", "part"], ["degli", "", "of the", "di"], ["italiani", "", "Italians", "italiano"], ["alterna", "", "alternates", "alternare"], ["con", "", "with"], ["disinvoltura", "", "ease"], ["le", "", "the", "il"], ["due", "", "two"], ["varietà", "", "varieties"], [",", "", ""], ["passando", "", "switching", "passare"], ["dall'", "", "from the", "da"], ["una", "", "one", "uno"], ["all'", "", "to the", "a"], ["altra", "", "other", "altro"], ["a", "", "according"], ["seconda", "", "(according to)", "secondo"], ["dell'", "", "of the", "di"], ["interlocutore", "", "person they are talking to"], ["e", "", "and"], ["della", "", "of the", "di"], ["situazione", "", "situation"], [".", "", ""]],
        en: "Today most Italians switch easily between the two varieties, moving from one to the other depending on who they are talking to and the situation.",
      },
      {
        t: [["Il", "", "the", "il"], ["dialetto", "", "dialect"], [",", "", ""], ["insomma", "", "in short"], [",", "", ""], ["sopravvive", "", "survives", "sopravvivere"], ["soprattutto", "", "above all"], ["come", "", "as"], ["lingua", "", "language"], ["degli", "", "of the", "di"], ["affetti", "", "affections", "affetto"], [",", "", ""], ["dell'", "", "of the", "di"], ["ironia", "", "irony"], ["e", "", "and"], ["della", "", "of the", "di"], ["complicità", "", "intimacy"], [".", "", ""]],
        en: "In short, dialect survives above all as the language of affection, irony and intimacy.",
      },
      {
        t: [["Resta", "", "it remains", "restare"], ["da", "", "to be"], ["vedere", "", "seen"], ["se", "", "whether"], ["questo", "", "this"], ["basterà", "", "will be enough", "bastare"], ["a", "", "to"], ["tramandarlo", "", "pass it down", "tramandare"], ["alle", "", "to the", "a"], ["generazioni", "", "generations", "generazione"], ["future", "", "future", "futuro"], [".", "", ""]],
        en: "It remains to be seen whether this will be enough to pass it on to future generations.",
      },
      {
        t: [["Quel", "", "what", "quello"], ["che", "", "(that)"], ["è", "", "is", "essere"], ["certo", "", "certain"], ["è", "", "is", "essere"], ["che", "", "that"], [",", "", ""], ["se", "", "if"], ["dovesse", "", "it were to", "dovere"], ["scomparire", "", "disappear"], [",", "", ""], ["con", "", "with"], ["esso", "", "it"], ["andrebbe", "", "would go", "andare"], ["perduto", "", "lost", "perdere"], ["un", "", "a", "uno"], ["modo", "", "way"], ["unico", "", "unique"], ["di", "", "of"], ["guardare", "", "looking at"], ["il", "", "the"], ["mondo", "", "world"], [".", "", ""]],
        en: "What is certain is that, should it disappear, a unique way of looking at the world would be lost with it.",
      },
    ],
    q: [
      { q: "How many Italians spoke Italian fluently in 1861?", o: ["Almost everyone", "About half", "Only a small minority"], a: 2 },
      { q: "Which factor does the article say helped spread Italian most?", o: ["Newspapers", "Television", "Tourism"], a: 1 },
      { q: "Why did many parents avoid speaking dialect with their children?", o: ["It was forbidden at school", "Dialect was associated with backwardness", "They didn't know it"], a: 1 },
      { q: "According to the article, what are dialects from a linguistic point of view?", o: ["Wrong versions of Italian", "Languages in their own right derived from Latin", "Recent inventions"], a: 1 },
      { q: "How do most Italians use dialect and Italian today?", o: ["They only speak Italian", "They only speak dialect", "They switch between them depending on the situation"], a: 2 },
    ],
  },
  {
    id: "it-6-faro",
    lv: 6,
    kind: "story",
    title: "L'ultima notte del faro",
    titleEn: "The lighthouse's last night",
    s: [
      {
        t: [["Per", "", "for", "per"], ["trentadue", "", "thirty-two"], ["anni", "", "years", "anno"], ["Ettore", "", "Ettore"], ["aveva", "", "had", "avere"], ["acceso", "", "lit", "accendere"], ["ogni", "", "every"], ["sera", "", "evening"], ["la", "", "the", "il"], ["lanterna", "", "lantern"], ["del", "", "of the", "di"], ["faro", "", "lighthouse"], ["sulla", "", "on the", "su"], ["scogliera", "", "cliff"], [",", "", ""], ["sempre", "", "always"], ["alla", "", "at the", "a"], ["stessa", "", "same", "stesso"], ["ora", "", "time"], ["e", "", "and"], ["con", "", "with"], ["la", "", "the", "il"], ["stessa", "", "same", "stesso"], ["cura", "", "care"], ["scrupolosa", "", "scrupulous", "scrupoloso"], [".", "", ""]],
        en: "For thirty-two years Ettore had lit the lantern of the lighthouse on the cliff every evening, always at the same time and with the same scrupulous care.",
      },
      {
        t: [["Quella", "", "that", "quello"], ["sera", "", "evening"], [",", "", ""], ["però", "", "however"], [",", "", ""], ["sarebbe", "", "would", "essere"], ["stata", "", "been", "essere"], ["l'", "", "the", "il"], ["ultima", "", "last", "ultimo"], [":", "", ""], ["dal", "", "from the", "da"], ["mese", "", "month"], ["successivo", "", "following"], ["il", "", "the"], ["faro", "", "lighthouse"], ["sarebbe", "", "would", "essere"], ["stato", "", "been", "essere"], ["automatizzato", "", "automated", "automatizzare"], ["e", "", "and"], ["del", "", "of the", "di"], ["suo", "", "its"], ["guardiano", "", "keeper"], ["non", "", "not"], ["ci", "", "(there)"], ["sarebbe", "", "would", "essere"], ["stato", "", "been", "essere"], ["più", "", "any more"], ["bisogno", "", "need"], [".", "", ""]],
        en: "That evening, however, would be the last: from the following month the lighthouse would be automated and its keeper would no longer be needed.",
      },
      {
        t: [["La", "", "the", "il"], ["lettera", "", "letter"], ["della", "", "of the", "di"], ["Marina", "", "Navy"], ["era", "", "had", "essere"], ["arrivata", "", "arrived", "arrivare"], ["in", "", "in"], ["primavera", "", "spring"], [",", "", ""], ["cortese", "", "courteous"], ["e", "", "and"], ["impersonale", "", "impersonal"], [",", "", ""], ["e", "", "and"], ["lui", "", "he"], ["l'", "", "it", "la"], ["aveva", "", "had", "avere"], ["riletta", "", "reread", "rileggere"], ["tante", "", "so many", "tanto"], ["volte", "", "times", "volta"], ["da", "", "that (he)"], ["saperla", "", "knew it", "sapere"], ["quasi", "", "almost"], ["a", "", "by"], ["memoria", "", "heart"], [".", "", ""]],
        en: "The Navy's letter had arrived in spring, courteous and impersonal, and he had reread it so many times that he almost knew it by heart.",
      },
      {
        t: [["Salì", "", "(he) climbed", "salire"], ["i", "", "the", "il"], ["centoventi", "", "one hundred and twenty"], ["gradini", "", "steps", "gradino"], ["della", "", "of the", "di"], ["scala", "", "staircase"], ["a", "", "(in a)"], ["chiocciola", "", "spiral"], ["più", "", "more"], ["lentamente", "", "slowly"], ["del", "", "than", "di"], ["solito", "", "usual"], [",", "", ""], ["come", "", "as"], ["se", "", "if"], ["volesse", "", "(he) wanted", "volere"], ["imprimersi", "", "to imprint", "imprimere"], ["nella", "", "in the", "in"], ["memoria", "", "memory"], ["ogni", "", "every"], ["singolo", "", "single"], ["passo", "", "step"], [".", "", ""]],
        en: "He climbed the hundred and twenty steps of the spiral staircase more slowly than usual, as if he wanted to etch every single step into his memory.",
      },
      {
        t: [["Dalla", "", "from the", "da"], ["finestrella", "", "small window"], ["della", "", "of the", "di"], ["torre", "", "tower"], [",", "", ""], ["il", "", "the"], ["mare", "", "sea"], ["appariva", "", "appeared", "apparire"], ["calmo", "", "calm"], [",", "", ""], ["quasi", "", "almost"], ["immobile", "", "motionless"], [",", "", ""], ["striato", "", "streaked", "striare"], ["dagli", "", "by the", "da"], ["ultimi", "", "last", "ultimo"], ["riflessi", "", "reflections", "riflesso"], ["del", "", "of the", "di"], ["tramonto", "", "sunset"], [".", "", ""]],
        en: "From the small window of the tower the sea looked calm, almost motionless, streaked by the last reflections of the sunset.",
      },
      {
        t: [["Ripensò", "", "(he) thought back", "ripensare"], ["alle", "", "to the", "a"], ["notti", "", "nights", "notte"], ["di", "", "of"], ["tempesta", "", "storm"], ["in", "", "in"], ["cui", "", "which"], ["il", "", "the"], ["vento", "", "wind"], ["ululava", "", "howled", "ululare"], ["contro", "", "against"], ["i", "", "the", "il"], ["vetri", "", "windowpanes", "vetro"], ["e", "", "and"], ["lui", "", "he"], ["restava", "", "stayed", "restare"], ["sveglio", "", "awake"], ["fino", "", "until"], ["all'", "", "(to the)", "a"], ["alba", "", "dawn"], [",", "", ""], ["con", "", "with"], ["l'", "", "the", "il"], ["orecchio", "", "ear"], ["teso", "", "straining"], [".", "", ""]],
        en: "He thought back to the stormy nights when the wind howled against the panes and he stayed awake until dawn, listening intently.",
      },
      {
        t: [["Pensò", "", "(he) thought", "pensare"], ["anche", "", "also"], ["alle", "", "of the", "a"], ["navi", "", "ships", "nave"], ["che", "", "that"], [",", "", ""], ["grazie", "", "thanks"], ["a", "", "to"], ["quella", "", "that", "quello"], ["luce", "", "light"], [",", "", ""], ["avevano", "", "had", "avere"], ["ritrovato", "", "found again", "ritrovare"], ["la", "", "the", "il"], ["rotta", "", "course"], ["senza", "", "without"], ["mai", "", "ever"], ["sapere", "", "knowing"], ["chi", "", "who"], ["la", "", "it"], ["tenesse", "", "kept", "tenere"], ["accesa", "", "lit", "acceso"], [".", "", ""]],
        en: "He also thought of the ships that, thanks to that light, had found their course again without ever knowing who kept it burning.",
      },
      {
        t: [["Non", "", "not", "non"], ["aveva", "", "(he) had", "avere"], ["mai", "", "ever"], ["cercato", "", "sought", "cercare"], ["riconoscenza", "", "gratitude"], [";", "", ""], ["gli", "", "to him"], ["bastava", "", "was enough", "bastare"], ["sapere", "", "knowing"], ["di", "", "(of)"], ["essere", "", "being"], ["utile", "", "useful"], [".", "", ""]],
        en: "He had never sought gratitude; it was enough for him to know he was useful.",
      },
      {
        t: [["Eppure", "", "and yet", "eppure"], [",", "", ""], ["ora", "", "now"], ["che", "", "that"], ["il", "", "the"], ["suo", "", "his"], ["compito", "", "task"], ["stava", "", "was", "stare"], ["per", "", "about to"], ["passare", "", "pass"], ["a", "", "to"], ["un", "", "a", "uno"], ["congegno", "", "device"], ["elettronico", "", "electronic"], [",", "", ""], ["si", "", "(himself)"], ["sorprese", "", "(he) caught", "sorprendere"], ["a", "", "(himself)"], ["provare", "", "feeling"], ["qualcosa", "", "something"], ["di", "", "(of)"], ["simile", "", "similar"], ["alla", "", "to the", "a"], ["gelosia", "", "jealousy"], [".", "", ""]],
        en: "And yet, now that his task was about to pass to an electronic device, he caught himself feeling something akin to jealousy.",
      },
      {
        t: [["Una", "", "a", "uno"], ["macchina", "", "machine"], ["non", "", "not"], ["si", "", "(itself)"], ["sarebbe", "", "would", "essere"], ["mai", "", "ever"], ["fermata", "", "stopped", "fermare"], ["a", "", "to"], ["contemplare", "", "contemplate"], ["il", "", "the"], ["mare", "", "sea"], [",", "", ""], ["né", "", "nor"], ["avrebbe", "", "would have", "avere"], ["conosciuto", "", "known", "conoscere"], ["la", "", "the", "il"], ["solitudine", "", "loneliness"], ["delle", "", "of the", "di"], ["lunghe", "", "long", "lungo"], ["notti", "", "nights", "notte"], ["invernali", "", "winter", "invernale"], [".", "", ""]],
        en: "A machine would never stop to contemplate the sea, nor would it know the loneliness of long winter nights.",
      },
      {
        t: [["Quando", "", "when", "quando"], ["venne", "", "came", "venire"], ["l'", "", "the", "il"], ["ora", "", "time"], [",", "", ""], ["accese", "", "(he) lit", "accendere"], ["la", "", "the", "il"], ["lanterna", "", "lantern"], ["con", "", "with"], ["un", "", "a", "uno"], ["gesto", "", "gesture"], ["che", "", "that"], ["le", "", "the", "il"], ["sue", "", "his", "suo"], ["mani", "", "hands", "mano"], ["conoscevano", "", "knew", "conoscere"], ["meglio", "", "better"], ["della", "", "than the", "di"], ["sua", "", "his", "suo"], ["mente", "", "mind"], [".", "", ""]],
        en: "When the time came, he lit the lantern with a gesture his hands knew better than his mind.",
      },
      {
        t: [["Il", "", "the", "il"], ["fascio", "", "beam"], ["di", "", "of"], ["luce", "", "light"], ["cominciò", "", "began", "cominciare"], ["a", "", "to"], ["ruotare", "", "turn"], [",", "", ""], ["lento", "", "slow"], ["e", "", "and"], ["regolare", "", "regular"], [",", "", ""], ["spazzando", "", "sweeping", "spazzare"], ["l'", "", "the", "il"], ["orizzonte", "", "horizon"], [".", "", ""]],
        en: "The beam of light began to turn, slow and steady, sweeping the horizon.",
      },
      {
        t: [["Ettore", "", "Ettore"], ["rimase", "", "remained", "rimanere"], ["a", "", "(to)"], ["guardarlo", "", "watch it", "guardare"], ["a", "", "for"], ["lungo", "", "a long time"], [",", "", ""], ["finché", "", "until"], ["non", "", "(not)"], ["sentì", "", "(he) heard", "sentire"], ["bussare", "", "knocking"], ["alla", "", "at the", "a"], ["porta", "", "door"], [".", "", ""]],
        en: "Ettore stood watching it for a long time, until he heard a knock at the door.",
      },
      {
        t: [["Erano", "", "(they) were", "essere"], ["i", "", "the", "il"], ["pescatori", "", "fishermen", "pescatore"], ["del", "", "of the", "di"], ["paese", "", "village"], [",", "", ""], ["saliti", "", "come up", "salire"], ["fin", "", "all the way", "fino"], ["lassù", "", "up there"], ["con", "", "with"], ["una", "", "a", "uno"], ["bottiglia", "", "bottle"], ["di", "", "of"], ["vino", "", "wine"], ["e", "", "and"], ["un", "", "a", "uno"], ["vassoio", "", "tray"], ["di", "", "of"], ["pesce", "", "fish"], ["fritto", "", "fried", "friggere"], [".", "", ""]],
        en: "It was the village fishermen, who had climbed all the way up with a bottle of wine and a tray of fried fish.",
      },
      {
        t: [["«", "", ""], ["Non", "", "not", "non"], ["potevamo", "", "(we) could", "potere"], ["lasciarti", "", "leave you", "lasciare"], ["solo", "", "alone"], ["proprio", "", "of all nights"], ["stasera", "", "tonight"], ["»", "", ""], [",", "", ""], ["disse", "", "said", "dire"], ["il", "", "the"], ["più", "", "most"], ["anziano", "", "elderly"], [",", "", ""], ["togliendosi", "", "taking off", "togliere"], ["il", "", "the"], ["berretto", "", "cap"], [".", "", ""]],
        en: "\"We couldn't leave you alone tonight of all nights,\" said the oldest, taking off his cap.",
      },
      {
        t: [["Ettore", "", "Ettore"], ["non", "", "not"], ["riuscì", "", "managed", "riuscire"], ["a", "", "to"], ["rispondere", "", "answer"], [";", "", ""], ["si", "", "(himself)"], ["limitò", "", "confined", "limitare"], ["a", "", "to"], ["farli", "", "letting them", "fare"], ["entrare", "", "come in"], [",", "", ""], ["con", "", "with"], ["gli", "", "the", "il"], ["occhi", "", "eyes", "occhio"], ["lucidi", "", "glistening", "lucido"], [".", "", ""]],
        en: "Ettore couldn't answer; he simply let them in, his eyes glistening.",
      },
      {
        t: [["Passarono", "", "(they) spent", "passare"], ["la", "", "the", "il"], ["notte", "", "night"], ["a", "", "(in)"], ["ricordare", "", "remembering"], ["naufragi", "", "shipwrecks", "naufragio"], ["scampati", "", "escaped", "scampare"], [",", "", ""], ["burrasche", "", "gales", "burrasca"], ["memorabili", "", "memorable", "memorabile"], ["e", "", "and"], ["vecchi", "", "old", "vecchio"], ["amici", "", "friends", "amico"], ["che", "", "who"], ["non", "", "no"], ["c'", "", "(there)", "ci"], ["erano", "", "were", "essere"], ["più", "", "longer"], [".", "", ""]],
        en: "They spent the night remembering narrowly escaped shipwrecks, memorable gales and old friends who were no longer there.",
      },
      {
        t: [["All'", "", "at", "a"], ["alba", "", "dawn"], [",", "", ""], ["quando", "", "when"], ["la", "", "the", "il"], ["lanterna", "", "lantern"], ["si", "", "(itself)"], ["spense", "", "went out", "spegnere"], ["per", "", "for"], ["l'", "", "the", "il"], ["ultima", "", "last", "ultimo"], ["volta", "", "time"], [",", "", ""], ["nessuno", "", "nobody"], ["di", "", "of"], ["loro", "", "them"], ["disse", "", "said", "dire"], ["una", "", "a", "uno"], ["parola", "", "word"], [".", "", ""]],
        en: "At dawn, when the lantern went out for the last time, none of them said a word.",
      },
      {
        t: [["Ma", "", "but", "ma"], ["Ettore", "", "Ettore"], ["capì", "", "understood", "capire"], ["che", "", "that"], [",", "", ""], ["in", "", "in"], ["fondo", "", "the end"], [",", "", ""], ["la", "", "the", "il"], ["sua", "", "his", "suo"], ["luce", "", "light"], ["aveva", "", "had", "avere"], ["illuminato", "", "lit up", "illuminare"], ["ben", "", "far", "bene"], ["più", "", "more"], ["del", "", "than the", "di"], ["mare", "", "sea"], [".", "", ""]],
        en: "But Ettore understood that, deep down, his light had lit up far more than the sea.",
      },
    ],
    q: [
      { q: "Why was this Ettore's last night at the lighthouse?", o: ["He was moving abroad", "The lighthouse was going to be automated", "The lighthouse was being demolished"], a: 1 },
      { q: "How did Ettore feel about the electronic device?", o: ["Relieved", "Indifferent", "Something like jealousy"], a: 2 },
      { q: "Who knocked at the door?", o: ["A Navy officer", "The village fishermen", "His son"], a: 1 },
      { q: "What did they do during the night?", o: ["They repaired the lantern", "They went fishing", "They shared memories of the past"], a: 2 },
      { q: "What did Ettore understand at the end?", o: ["That machines are better than people", "That his light had meant much more than guiding ships", "That he wanted to leave the village"], a: 1 },
    ],
  },
];

export default data;
