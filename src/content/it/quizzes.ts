import type { TextQuiz } from '../types';

const data: TextQuiz[] = [
  {
    text: "it-3-quaderno",
    q: [
      { q: "Dove passava le estati Elena da bambina?", o: ["A Torino con i genitori", "In campagna, in Puglia", "Al mare con il fratello"] },
      { q: "Perché Elena è sorpresa quando trova il quaderno?", o: ["È scritto in inglese", "Pensava che la nonna cucinasse a memoria", "È del fratello"] },
      { q: "Che problema c'era al primo tentativo?", o: ["L'acqua era troppo calda", "L'impasto era troppo duro", "C'era troppo sale"] },
      { q: "Chi ha detto il segreto a Elena?", o: ["La nonna", "Il fratello", "La mamma"] },
      { q: "Che cosa vuole fare Elena adesso?", o: ["Vendere la vecchia casa", "Aprire un ristorante", "Regalare una copia del quaderno ai cugini"] },
    ],
  },
  {
    text: "it-3-borghi",
    q: [
      { q: "Perché oggi alcune persone possono vivere lontano dall'ufficio?", o: ["Hanno più ferie", "Possono lavorare via internet", "Gli uffici hanno chiuso"] },
      { q: "Perché molti paesi si stanno svuotando?", o: ["Le case costano troppo", "I giovani partono per studiare o lavorare", "C'è troppo traffico"] },
      { q: "Che cosa deve fare chi compra una casa a un euro?", o: ["Viverci per vent'anni", "Ristrutturarla entro pochi anni", "Aprire un negozio"] },
      { q: "Quale di questi è un problema in alcuni paesi?", o: ["Troppo traffico", "L'aria sporca", "Una connessione internet lenta"] },
      { q: "Che cosa consiglia l'articolo prima di trasferirsi?", o: ["Vendere la macchina", "Passarci prima qualche settimana", "Imparare il dialetto del posto"] },
    ],
  },
  {
    text: "it-3-matera",
    q: [
      { q: "In quale regione si trova Matera?", o: ["Puglia", "Basilicata", "Sicilia", "Campania"] },
      { q: "Che cosa hanno di speciale molte case dei Sassi?", o: ["Sono di legno", "Galleggiano sull'acqua", "Sono scavate nella roccia", "Non hanno porte"] },
      { q: "Che cosa è successo agli abitanti dei Sassi dal 1952?", o: ["Sono diventati ricchi con il turismo", "Si sono trasferiti nei nuovi quartieri costruiti dallo Stato", "Hanno costruito alberghi nelle grotte", "Sono emigrati a Bari"] },
      { q: "Che cosa è successo nel 2019?", o: ["I Sassi sono stati abbandonati", "È stato aperto un nuovo aeroporto", "Matera è stata Capitale europea della cultura", "I Sassi sono entrati nella lista dell'UNESCO"] },
      { q: "Che cosa sono i peperoni cruschi?", o: ["Peperoni verdi freschi da mangiare crudi", "Peperoni rossi secchi fritti finché diventano croccanti", "Un tipo di pane", "Una torta dolce"] },
      { q: "Secondo l'articolo, qual è il periodo migliore per visitare Matera?", o: ["Agosto", "L'inverno", "La primavera e l'autunno", "Solo Natale"] },
    ],
  },
  {
    text: "it-3-pappagallo",
    q: [
      { q: "Che cosa chiede la signora Rosi a Luca?", o: ["Di innaffiare le piante", "Di tenere il suo pappagallo per una settimana", "Di accompagnarla in macchina in Liguria", "Di riparare la radio"] },
      { q: "Che cosa grida Napoleone quando suona il campanello?", o: ["«Buongiorno, Luca!»", "«Hai mangiato?»", "«Chi è?»", "«Che noia!»"] },
      { q: "Come reagisce il dottor Ferrari quando sente il pappagallo durante la videochiamata?", o: ["Chiude la chiamata arrabbiato", "Ride e propone una pausa", "Chiede a Luca di comprare un pappagallo", "Non lo sente"] },
      { q: "Perché Napoleone comincia a parlare durante la cena con Giulia?", o: ["Perché ha fame", "Perché Luca ha spento la radio", "Perché Giulia gli parla", "Perché suona il campanello"] },
      { q: "Che cosa sorprende la signora Rosi quando torna?", o: ["La gabbia è rotta", "Napoleone non canta più", "Napoleone dice il nome di Luca", "Luca ha una nuova ragazza"] },
    ],
  },
  {
    text: "it-4-bici",
    q: [
      { q: "In quali città la bicicletta è normale da decenni?", o: ["Milano, Roma e Napoli", "Ferrara, Bolzano e Pesaro", "Torino, Genova e Venezia"] },
      { q: "Che cosa dicono gli oppositori delle piste ciclabili?", o: ["Costano troppo", "Tolgono parcheggi e rallentano il traffico", "Sono pericolose per i ciclisti"] },
      { q: "Che cosa dicono gli studi sui negozi lungo le piste ciclabili?", o: ["Chiudono più spesso", "Perdono molti clienti", "Spesso guadagnano clienti"] },
      { q: "Perché le bici elettriche sono importanti?", o: ["Costano meno delle bici normali", "Rendono più facili le salite e i percorsi lunghi", "Non si possono rubare"] },
      { q: "Quale ostacolo rimane ancora?", o: ["I furti di biciclette", "Troppe piste ciclabili", "I mezzi pubblici cari"] },
    ],
  },
  {
    text: "it-4-colloquio",
    q: [
      { q: "Per quanto tempo si era preparato Luca per il colloquio?", o: ["Un giorno", "Una settimana intera", "Un mese"] },
      { q: "Perché Luca è arrivato in ritardo?", o: ["Si è perso", "La sveglia non ha suonato e c'era molto traffico", "L'autobus si è rotto"] },
      { q: "Chi era l'uomo arrivato in ritardo?", o: ["Un altro candidato", "Un tassista", "Il responsabile che Luca doveva incontrare"] },
      { q: "Com'è andato il colloquio?", o: ["Breve e molto formale", "Più rilassato di quanto Luca si aspettasse", "È stato annullato per la pioggia"] },
      { q: "Che cosa è successo una settimana dopo?", o: ["Luca ha fatto un secondo colloquio", "Hanno offerto il lavoro a Luca", "Luca ha scritto all'azienda"] },
    ],
  },
  {
    text: "it-4-edicola",
    q: [
      { q: "Perché all'inizio Marco era venuto a Bologna?", o: ["Per cominciare un nuovo lavoro", "Per vendere l'edicola che aveva ereditato", "Per trovare lo zio in ospedale", "Per studiare latino"] },
      { q: "Che cosa ha trovato Marco nel quaderno dello zio?", o: ["Conti e numeri di telefono", "Nomi di clienti con brevi note su di loro", "Disegni dell'edicola", "Ricette"] },
      { q: "Che cosa faceva Gino ogni mattina da vent'anni?", o: ["Comprava il giornale", "Apriva l'edicola", "Portava due caffè, uno per sé e uno per l'edicolante", "Passava davanti all'edicola con l'autobus"] },
      { q: "Che cosa voleva fare il signor Russo dell'edicola?", o: ["Una libreria", "Un negozio di cover per cellulari", "Un bar", "Lasciarla esattamente com'era"] },
      { q: "Che cosa ha dato a Marco l'idea di un'edicola diversa?", o: ["Un articolo di giornale", "Le richieste della gente che si fermava sotto il portico in un giorno di pioggia", "Una conversazione con il notaio", "I suoi clienti di Milano"] },
      { q: "Che cosa ha trovato Marco sull'ultima pagina del quaderno?", o: ["Il prezzo dell'edicola", "Una lista di debiti", "Un messaggio dello zio: sapeva che Marco sarebbe rimasto", "L'indirizzo del professor Bassani"] },
    ],
  },
  {
    text: "it-4-lupo",
    q: [
      { q: "Quanti lupi restavano in Italia, più o meno, all'inizio degli anni Settanta?", o: ["Circa dieci", "Circa cento", "Circa mille", "Circa 3.300"] },
      { q: "Oltre alla caccia, quale altro problema avevano i lupi prima degli anni Settanta?", o: ["Troppe autostrade", "Nei boschi non c'erano quasi più prede selvatiche", "Una malattia portata dai cani", "Inverni molto freddi"] },
      { q: "Perché i boschi e gli animali selvatici sono tornati in montagna?", o: ["Per nuove leggi sull'agricoltura", "Perché molte persone hanno lasciato la montagna per la città", "Perché il clima è cambiato", "Perché sono stati portati lupi dalla Francia"] },
      { q: "Che cosa è successo nel 1992 a una coppia di lupi partita dall'Italia?", o: ["Ha attaccato un paese in Abruzzo", "È stata avvistata in Francia", "È passata prima in Svizzera", "Si è stabilita vicino a Roma"] },
      { q: "A che cosa serve il pastore maremmano-abruzzese?", o: ["A cacciare i lupi", "A radunare i cinghiali", "A difendere il gregge dai lupi", "A ritrovare gli escursionisti perduti"] },
      { q: "Secondo gli esperti, che cosa significa di solito un lupo che attraversa una strada di notte?", o: ["Che è malato", "Che sta per attaccare le persone", "Che la popolazione è sana e cerca nuovi territori", "Che qualcuno gli ha dato da mangiare"] },
    ],
  },
  {
    text: "it-5-lettera",
    q: [
      { q: "Dove ha trovato il libro Chiara?", o: ["In biblioteca", "A una bancarella di libri usati", "A casa della nonna"] },
      { q: "Di che cosa parlava la lettera?", o: ["Di un affare", "Dell'amore segreto di un ragazzo per Anna", "Di un viaggio a Bologna"] },
      { q: "Che cosa ha fatto Chiara dopo aver trovato l'indirizzo?", o: ["È andata a Bologna", "Ha scritto a quell'indirizzo", "Ha venduto il libro"] },
      { q: "Chi ha risposto a Chiara?", o: ["Anna in persona", "Lo studente", "La nipote di Anna"] },
      { q: "Che cosa è successo allo studente e ad Anna?", o: ["Non si sono mai più rivisti", "Si sono sposati", "Si sono scritti per anni"] },
    ],
  },
  {
    text: "it-5-sonno",
    q: [
      { q: "Come è stato considerato il sonno per secoli?", o: ["Uno stato pericoloso", "Un semplice stato di riposo", "Una specie di malattia"] },
      { q: "Che cosa succede nella fase REM?", o: ["Il corpo ripara i tessuti", "Il cervello elabora emozioni e ricordi", "Il cuore si ferma per un attimo"] },
      { q: "Che cosa può causare una sola notte senza sonno?", o: ["Il diabete", "Meno concentrazione e più irritabilità", "Una produttività maggiore"] },
      { q: "Perché bisogna spegnere gli schermi prima di dormire?", o: ["Fanno rumore", "La loro luce blu ostacola la produzione di melatonina", "Consumano troppa elettricità"] },
      { q: "Di quanto sonno abbiamo bisogno?", o: ["Esattamente otto ore", "Almeno nove ore", "Dipende dalla persona"] },
    ],
  },
  {
    text: "it-5-gesti",
    q: [
      { q: "Secondo il saggio, che cosa c'è di vero nel luogo comune che gli italiani «parlano con le mani»?", o: ["È pura invenzione", "È in parte una caricatura, ma ha una base solida", "Vale solo per gli attori", "È un insulto agli italiani"] },
      { q: "Che cosa ha pubblicato Bruno Munari nel 1958?", o: ["Uno studio sui vasi antichi", "Un libretto di fotografie che «traducono» i gesti italiani più comuni", "Il primo catalogo di emoji", "Un dizionario del dialetto napoletano"] },
      { q: "Che cosa ha notato Andrea de Jorio negli affreschi di Pompei ed Ercolano?", o: ["Che mostravano maschere del teatro romano", "Che molte pose somigliavano ai gesti dei napoletani del suo tempo", "Che gli antichi non gesticolavano mai", "Che gli affreschi erano copie"] },
      { q: "Come presenta il saggio le spiegazioni del perché i gesti si sono sviluppati tanto in Italia?", o: ["Come fatti dimostrati", "Come ipotesi più o meno plausibili, nessuna sufficiente da sola", "Come miti inventati dai turisti", "Non dà nessuna spiegazione"] },
      { q: "Come indica di solito «tre» con le dita un italiano?", o: ["Con indice, medio e anulare", "Con pollice, indice e medio", "Con tre dita di ogni mano", "Battendo tre volte sulla guancia"] },
      { q: "Che cosa è successo alla «mano a borsa» quando è diventata un'emoji?", o: ["È stata vietata in alcuni paesi", "Ha acquistato nuove sfumature", "Ha perso quasi tutte le sue sfumature ed è diventata un'etichetta nazionale", "È stata chiamata «mano italiana»"] },
      { q: "Secondo il saggio, che cosa dimostrano i ciechi dalla nascita?", o: ["Che i gesti si imparano solo per imitazione", "Che il gesto è legato al pensare e al parlare, perché gesticolano anche loro", "Che gli italiani gesticolano più degli altri", "Che i gesti stanno scomparendo"] },
    ],
  },
  {
    text: "it-5-pestello",
    q: [
      { q: "Di che cosa scrive di solito Tommaso per il Corriere del Levante?", o: ["Di cucina e ristoranti", "Di traffico e meteo", "Di calcio", "Di politica locale"] },
      { q: "Perché Amedeo chiama il suo pestello «la Bisnonna»?", o: ["È un regalo di Gino", "Era di sua nonna Caterina", "L'ha comprato a un mercatino dell'antiquariato", "È il pestello più vecchio del campionato"] },
      { q: "Perché Amedeo sospetta di Gino Ratto?", o: ["Gino era andato da lui la sera prima che il pestello sparisse", "Qualcuno ha visto Gino scappare dalla casa", "Gino ha la chiave di casa", "Gino aveva detto che l'avrebbe rubato"] },
      { q: "Che cosa c'è davvero nel pacchetto di giornale di Gino?", o: ["La Bisnonna", "Una bottiglia di vino", "Un pestello di bosso di ricambio nuovo di zecca", "Una focaccia"] },
      { q: "Perché Pietro pensava di avere il permesso di prendere il pestello?", o: ["La mamma aveva detto di sì", "Il nonno aveva capito «pesto» invece di «pestello» e aveva detto di sì", "La maestra aveva telefonato al nonno", "Aveva trovato un biglietto sul tavolo"] },
      { q: "Come convince Tommaso il dottor Ferretti a restituire il pestello?", o: ["Gli porta la firma della maestra", "Paga una cauzione", "Gli promette una bella pubblicità nel suo articolo", "Gli mostra una denuncia"] },
      { q: "Perché Amedeo finisce la finale con il pestello di Gino?", o: ["Il regolamento vieta di cambiare attrezzo durante la gara", "La Bisnonna è rotta", "Pietro non vuole restituirla", "Preferisce il bosso"] },
      { q: "Chi paga la cena alla fine, e perché?", o: ["Tommaso, per ringraziare tutti", "Amedeo, perché ha vinto", "Gino, perché è arrivato dietro ad Amedeo e ha perso la scommessa", "La giuria, come premio"] },
    ],
  },
  {
    text: "it-6-dialetti",
    q: [
      { q: "Quanti italiani parlavano correntemente l'italiano nel 1861?", o: ["Quasi tutti", "Circa la metà", "Solo una piccola minoranza"] },
      { q: "Secondo l'articolo, quale fattore ha contribuito di più alla diffusione dell'italiano?", o: ["I giornali", "La televisione", "Il turismo"] },
      { q: "Perché molti genitori evitavano di parlare in dialetto con i figli?", o: ["A scuola era vietato", "Il dialetto era associato all'arretratezza", "Non lo conoscevano"] },
      { q: "Secondo l'articolo, che cosa sono i dialetti dal punto di vista linguistico?", o: ["Versioni sbagliate dell'italiano", "Lingue a tutti gli effetti, derivate dal latino", "Invenzioni recenti"] },
      { q: "Come usano oggi dialetto e italiano la maggior parte degli italiani?", o: ["Parlano solo italiano", "Parlano solo dialetto", "Passano dall'uno all'altro a seconda della situazione"] },
    ],
  },
  {
    text: "it-6-faro",
    q: [
      { q: "Perché quella era l'ultima notte di Ettore al faro?", o: ["Si trasferiva all'estero", "Il faro sarebbe stato automatizzato", "Il faro sarebbe stato demolito"] },
      { q: "Che cosa provava Ettore verso il dispositivo elettronico?", o: ["Sollievo", "Indifferenza", "Una specie di gelosia"] },
      { q: "Chi ha bussato alla porta?", o: ["Un ufficiale della Marina", "I pescatori del paese", "Suo figlio"] },
      { q: "Che cosa hanno fatto durante la notte?", o: ["Hanno riparato la lanterna", "Sono andati a pescare", "Hanno condiviso i ricordi del passato"] },
      { q: "Che cosa ha capito Ettore alla fine?", o: ["Che le macchine sono migliori delle persone", "Che la sua luce aveva significato molto più che guidare le navi", "Che voleva lasciare il paese"] },
    ],
  },
  {
    text: "it-6-cifre",
    q: [
      { q: "Perché Leonardo si trovava a Bugia da ragazzo?", o: ["Studiava in un'università del posto", "Suo padre lavorava alla dogana per i mercanti pisani", "Era naufragato", "Era stato mandato a comprare spezie"] },
      { q: "Secondo il saggio, qual era il difetto principale del calcolo con l'abaco a gettoni?", o: ["Costava troppo", "Funzionava solo con numeri piccoli", "Non lasciava traccia scritta dei passaggi intermedi", "Lo sapevano usare solo i dotti"] },
      { q: "Da dove vengono le parole italiane «zero» e «cifra»?", o: ["Dalla stessa parola araba che significa «vuoto»", "Da due parole greche diverse", "Da termini latini coniati da Leonardo", "Dal sanscrito, attraverso il greco"] },
      { q: "Che cosa dice il saggio del problema dei conigli?", o: ["Era lo scopo principale del Liber Abaci", "Leonardo gli dedicò poche righe; il nome della successione arrivò più tardi", "Lo inventò Édouard Lucas", "Dimostra che la natura segue leggi matematiche"] },
      { q: "Secondo il saggio, perché i banchieri fiorentini diffidavano delle nuove cifre?", o: ["Erano troppo difficili da imparare", "Venivano dall'estero", "Si potevano alterare facilmente nei libri contabili, che valevano come prova in giudizio", "La Chiesa le vietava"] },
      { q: "Dove impararono le nuove cifre gli italiani, più che nelle università?", o: ["Nei monasteri", "Nelle scuole d'abaco", "Alla corte dell'imperatore", "Nelle tipografie"] },
      { q: "Che cosa intende il saggio quando chiama le cifre una «tecnologia»?", o: ["Le hanno inventate degli ingegneri", "Il modo di scrivere i numeri decide quali operazioni sono facili o difficili", "Si usano solo nei computer", "Hanno sostituito l'abaco da un giorno all'altro"] },
      { q: "Secondo il saggio, qual è stato il vero merito di Leonardo?", o: ["Inventare lo zero", "Inventare il sistema posizionale", "Riconoscere uno strumento nato altrove e renderlo accessibile a un nuovo pubblico", "Scrivere il primo libro di matematica stampato"] },
    ],
  },
  {
    text: "it-6-viola-in-bianco",
    q: [
      { q: "Che cosa chiede il maestro a Ingrid la prima sera in bottega?", o: ["Di intagliare un riccio", "Di affilare una sgorbia finché non riesce a radere un capello", "Di suonargli il violoncello", "Di spazzare il pavimento e accendere la stufa"] },
      { q: "Dove trova Ingrid la viola incompiuta?", o: ["In vetrina", "Nell'appartamento del maestro", "Dietro una scatola di morsetti, sullo scaffale più alto", "Nel retrobottega di Gilda"] },
      { q: "Secondo il maestro, perché non ha mai finito la viola?", o: ["Perché il legno si era crepato", "Perché finirla avrebbe voluto dire partire per Vienna, o ammettere che non sarebbe mai partito", "Perché Lidia gli aveva chiesto di smettere", "Perché le mani avevano cominciato a tremargli"] },
      { q: "Che cosa vuole Matteo Rinaldi la prima volta che viene in bottega?", o: ["Tornare a fare l'apprendista", "Comprare le forme, le sagome e i disegni della bottega Bassi", "Vendere una macchina al maestro", "Scusarsi per aver preso una scatola di ponticelli"] },
      { q: "Che cosa trovano Ingrid e il maestro quando staccano la tavola della viola?", o: ["Una seconda etichetta con un'altra data", "Una lettera nascosta nella cassa", "Una scritta a matita di Lidia all'interno della tavola", "Una crepa nella catena"] },
      { q: "Come ottiene Ingrid l'indirizzo di Lidia?", o: ["Dal sito dell'orchestra", "Da Matteo", "Da un biglietto d'auguri di Natale che Lidia manda a Gilda ogni anno", "Dalle vecchie lettere del maestro"] },
      { q: "Che cosa lascia il maestro sul banco di Ingrid alla fine della storia?", o: ["Il quaderno di ricette di vernici di suo padre", "Due tavole di abete della Val di Fiemme, stagionate dal 1985", "La viola finita", "La fotografia di Lidia sull'argine del Po"] },
    ],
  },
];

export default data;
