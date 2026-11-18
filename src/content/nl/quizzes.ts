import type { TextQuiz } from '../types';

const data: TextQuiz[] = [
  {
    text: "nl-3-neighbour",
    q: [
      { q: "Waarom voelde Mark zich in het begin vaak eenzaam?", o: ["Hij werkte 's nachts.", "Hij kende niemand in Rotterdam.", "Zijn appartement was te klein."] },
      { q: "Wat vond Mark in het trappenhuis?", o: ["Een verdwaalde hond", "Een oudere vrouw met een stapel dozen", "Een kapotte deur"] },
      { q: "Hoe lang had Ria in Utrecht gewoond?", o: ["Vier jaar", "Veertien jaar", "Veertig jaar"] },
      { q: "Wat doen Mark en Ria elke donderdag?", o: ["Ze gaan wandelen.", "Ze eten samen.", "Ze gaan naar Utrecht."] },
    ],
  },
  {
    text: "nl-3-water",
    q: [
      { q: "Hoeveel van Nederland ligt onder de zeespiegel?", o: ["De helft", "Ongeveer een kwart", "Ongeveer een tiende"] },
      { q: "Waarmee pompten mensen vroeger het water uit de polders?", o: ["Met windmolens", "Met elektrische gemalen", "Met boten"] },
      { q: "Wat gebeurde er in 1953?", o: ["De Deltawerken waren klaar.", "Tijdens een storm braken in Zeeland de dijken door.", "Er werd een nieuwe polder gemaakt."] },
      { q: "Welke nieuwe oplossing noemt de tekst?", o: ["Hogere windmolens bouwen", "Mensen naar het buitenland laten verhuizen", "Rivieren meer ruimte geven"] },
    ],
  },
  {
    text: "nl-3-utrecht",
    q: [
      { q: "Waarom raadt het artikel Utrecht aan in plaats van Amsterdam?", o: ["Het is goedkoper.", "Het is rustiger, maar heeft ook grachten, oude gebouwen en terrassen.", "Er zijn meer musea.", "Het ligt dichter bij zee."] },
      { q: "Wat is er bijzonder naast Utrecht Centraal?", o: ["De oudste trein van het land", "De grootste fietsenstalling van de wereld", "Een gracht met werven", "Het Nijntje Museum"] },
      { q: "Hoe verschilt de Oudegracht van de grachten in Amsterdam?", o: ["Er staat 's zomers geen water in.", "Het water ligt veel lager dan de straat, met werven langs de kant.", "Hij is veel breder.", "Er mogen geen boten op varen."] },
      { q: "Waarom staat de Domtoren los van de kerk?", o: ["Hij is in een andere stad gebouwd en verplaatst.", "Een deel van de kerk stortte in 1674 tijdens een storm in en is nooit herbouwd.", "De kerk was te klein.", "Het plein werd eerst gebouwd."] },
      { q: "Waar zie je Nijntje op straat?", o: ["Op de Domtoren", "Bij de fietsenstalling", "In de verkeerslichten bij sommige kruispunten", "Op de boten in de gracht"] },
      { q: "Waarvoor waarschuwt het artikel als je in Utrecht fietst?", o: ["Fietsen worden vaak gestolen.", "De Utrechters fietsen snel en verwachten dat jij dat ook doet.", "Fietsen mag niet in het centrum.", "Een fiets huren is erg duur."] },
    ],
  },
  {
    text: "nl-3-wrong-cat",
    q: [
      { q: "Hoe ziet Minoes eruit, volgens mevrouw Jansen?", o: ["Zwart met een witte staart", "Grijs met één witte poot", "Wit met grijze oren", "Bruin met groene ogen"] },
      { q: "Hoe kwam Minoes het huis uit?", o: ["Thomas liet de voordeur openstaan.", "Het keukenraam stond open.", "Ze ontsnapte door het tuinhek.", "Ahmed liet haar naar buiten."] },
      { q: "Waar vond Thomas de grijze kat?", o: ["Onder het bed", "Op een lantaarnpaal", "Achter de schuur in zijn eigen tuin", "In de auto van Ahmed"] },
      { q: "Wat was er anders aan de kat die Thomas vond?", o: ["Hij at de hele dag en zat bij hem op schoot.", "Hij wilde niet eten.", "Hij sliep alleen in de kast.", "Hij was bang voor Thomas."] },
      { q: "Waar was de echte Minoes geweest?", o: ["In Spanje bij mevrouw Jansen", "In de schuur van Ahmed, tussen de fietsen", "In de keukenkast", "Bij de dierenarts"] },
      { q: "Wat gebeurde er met de tweede grijze kat?", o: ["Het baasje kwam hem halen.", "Mevrouw Jansen hield hem.", "Hij woont nu bij Thomas en heet Bijna.", "Ahmed nam hem mee naar huis."] },
    ],
  },
  {
    text: "nl-4-interview",
    q: [
      { q: "Waarom werd Sophie te laat wakker?", o: ["Ze was laat naar bed gegaan.", "Haar wekker ging niet af.", "Haar buurman maakte lawaai."] },
      { q: "Wat gebeurde er onderweg naar het station?", o: ["Ze verloor haar portfolio.", "Ze kreeg een lekke band.", "Ze kwam de directeur tegen."] },
      { q: "Wat deed de directeur toen Sophie binnenkwam?", o: ["Hij sprak met een andere kandidaat.", "Hij dronk rustig koffie.", "Hij stond bij de deur te wachten."] },
      { q: "Waarom zegt Sophie dat ze al geoefend heeft met stress?", o: ["Ze heeft een stressvolle baan.", "Ze heeft een cursus gevolgd.", "Haar ochtend was een ramp geweest."] },
      { q: "Wat was het resultaat van het gesprek?", o: ["Ze kreeg de baan.", "Ze werd uitgenodigd voor een tweede gesprek.", "Ze werd afgewezen."] },
    ],
  },
  {
    text: "nl-4-part-time",
    q: [
      { q: "Wat maakt Nederland bijzonder in Europa?", o: ["Nergens werken zoveel mensen in deeltijd.", "Mensen werken de langste dagen.", "Niemand werkt op vrijdag."] },
      { q: "Waarom kozen veel vrouwen vanaf de jaren tachtig voor een deeltijdbaan?", o: ["Voltijdbanen waren verboden.", "Om werk en gezin te combineren.", "Omdat mannen te weinig verdienden."] },
      { q: "Wat is een “papadag”?", o: ["Een nationale feestdag", "Een vrije doordeweekse dag voor een vader", "Vaderdag"] },
      { q: "Welk nadeel noemt de tekst?", o: ["Vrouwen bouwen minder pensioen op.", "Bedrijven verdienen minder.", "Kinderen zien hun ouders minder."] },
      { q: "Waarom maken sommige economen zich zorgen?", o: ["De prijzen stijgen.", "In sectoren zoals de zorg is er een tekort aan personeel.", "Mensen hebben te veel stress."] },
    ],
  },
  {
    text: "nl-4-allotment",
    q: [
      { q: "Hoe lang had Sanne op de wachtlijst voor een volkstuin gestaan?", o: ["Eén jaar", "Twee jaar", "Vier jaar", "Tien jaar"] },
      { q: "Hoe zag tuin 27 eruit toen Sanne hem voor het eerst zag?", o: ["Netjes, met rechte rijen", "Overwoekerd door brandnetels en bramen", "Vol rijpe tomaten", "Helemaal leeg en kaal"] },
      { q: "Waarom gingen Sannes bonen en tomaten in mei dood?", o: ["Ze vergat ze water te geven.", "Het vroor, omdat ze vóór de IJsheiligen had geplant.", "Slakken aten ze op.", "Henk trok ze eruit."] },
      { q: "Wie gaf Sannes tuin water terwijl zij in Groningen was?", o: ["De voorzitster", "Een jonge vader van tuin 41", "Henk", "Niemand, het regende."] },
      { q: "Waarom lag tuin 27 al twee jaar verlaten?", o: ["De vereniging had hem gesloten.", "Hij was van Henks overleden vrouw, en Henk kon hem niet verzorgen en ook niet opgeven.", "De grond was vergiftigd.", "Niemand op de wachtlijst wilde hem."] },
      { q: "Wat doet Sanne met de prijs voor de mooiste bloemen?", o: ["Ze zet hem op haar balkon.", "Ze geeft hem aan Henk, omdat de asters van Truus waren.", "Ze geeft hem aan de jonge vader.", "Ze geeft hem terug aan de jury."] },
    ],
  },
  {
    text: "nl-4-beaver",
    q: [
      { q: "Wat zegt het artikel over wat bevers eten?", o: ["Vooral vis", "Alleen planten, takken en schors", "Insecten en kikkers", "Alles wat mensen achterlaten"] },
      { q: "Waarom werd er vroeger op bevers gejaagd?", o: ["Omdat ze de vis in de rivieren opaten", "Voor hun vacht, hun vlees en bevergeil", "Omdat ze gevaarlijk waren voor mensen", "Omdat ze huizen vernielden"] },
      { q: "Waar kwamen de bevers vandaan die in 1988 in de Biesbosch werden uitgezet?", o: ["Uit Limburg", "Uit de omgeving van de Elbe in Duitsland", "Uit België", "Uit een dierentuin in Amsterdam"] },
      { q: "Hoe helpen beverdammen de natuur, volgens het artikel?", o: ["Ze houden roofdieren uit het bos.", "Ze maken vijvers waarin veel soorten leven en houden in droge periodes water vast.", "Ze maken de rivieren rechter.", "Ze beschermen dijken tegen overstromingen."] },
      { q: "Wat is het grootste probleem dat bevers veroorzaken?", o: ["Ze eten fruit uit boomgaarden.", "Ze graven gangen in dijken, waardoor die zwakker kunnen worden.", "Ze blokkeren de scheepvaart op de grote rivieren.", "Ze vallen boerderijdieren aan."] },
      { q: "Wat is de conclusie van het artikel?", o: ["De bever moet uit Nederland verdwijnen.", "De echte vraag is hoe mensen leren samenleven met de bever.", "Bevers horen alleen in dierentuinen.", "De bever zal snel weer verdwijnen."] },
    ],
  },
  {
    text: "nl-5-photo-album",
    q: [
      { q: "Waarom moest Ineke het huis leegruimen?", o: ["Het was verkocht.", "Haar oma verhuisde naar een verpleeghuis.", "Ze ging er zelf wonen."] },
      { q: "Waar vond Ineke het fotoalbum?", o: ["In een la", "Op zolder, achter oude kranten", "In het verpleeghuis"] },
      { q: "Wat verraste Ineke het meest aan de foto's?", o: ["Haar oma had in het buitenland gewoond.", "Haar oma had leren vliegen.", "Haar oma was beroemd geweest in Zwolle."] },
      { q: "Wat zat er op de laatste bladzijde van het album?", o: ["Een vliegbrevet", "Een foto van een vliegtuig", "Een trouwkaart uit 1960"] },
      { q: "Hoe beschrijft oma hoe ze zich toen voelde?", o: ["Ze was vaak bang.", "Ze voelde zich licht, alsof de wereld openlag.", "Ze voelde zich eenzaam."] },
    ],
  },
  {
    text: "nl-5-gezellig",
    q: [
      { q: "Waar draait gezelligheid volgens de tekst vooral om?", o: ["Duur eten en drinken", "Een gevoel van samenzijn", "Een mooi huis"] },
      { q: "Waarom is “gezellig” moeilijk te vertalen?", o: ["Het is een nieuw woord.", "Er bestaat geen echt Engels of Frans equivalent.", "Het heeft een grove betekenis."] },
      { q: "Wanneer kan een duur diner “ongezellig” zijn?", o: ["Als de sfeer stijf of gespannen is", "Als het eten slecht is", "Als er te veel gasten zijn"] },
      { q: "Wat vinden nieuwkomers misschien vreemd aan Nederlandse verjaardagen?", o: ["Het eten", "Dat je gefeliciteerd wordt met de verjaardag van iemand anders", "De muziek"] },
      { q: "Wat gebeurt er met mensen die lang genoeg blijven?", o: ["Ze gaan vroeg naar huis.", "Ze gaan niet meer naar verjaardagen.", "Ze gaan het woord zelf gebruiken."] },
    ],
  },
  {
    text: "nl-5-diary",
    q: [
      { q: "Wat vond Lucía het moeilijkst na haar verhuizing naar Nederland?", o: ["De taal", "Het weer", "De Nederlandse gewoonte om alles in de agenda te plannen", "Het eten bij de lunch"] },
      { q: "Wat gebeurde er toen Lucía voorstelde om “een keer” koffie te drinken?", o: ["De collega negeerde haar.", "De collega stelde een datum over drie weken voor en kwam ook echt.", "De collega nodigde haar meteen bij zich thuis uit.", "De collega zei dat ze nooit koffie drinkt."] },
      { q: "Welke verklaring voor de Nederlandse plancultuur wordt NIET gegeven?", o: ["Het land is klein en vol.", "Veel mensen werken in deeltijd, waardoor de week een puzzel is.", "Nederlanders zien een vage uitnodiging als een belofte die je moet nakomen.", "Volgens de Nederlandse wet moeten afspraken geregistreerd worden."] },
      { q: "Hoe beschermt de agenda volgens de schrijver de vrije tijd?", o: ["Je kunt zeggen “dan kan ik niet” zonder een excuus te geven.", "Mensen gaan minder uren werken.", "Vergaderingen op vrijdagmiddag zijn verboden.", "Mensen worden eraan herinnerd op vakantie te gaan."] },
      { q: "Wat was er anders aan de dagen van de oma van de schrijver?", o: ["Ze waren helemaal leeg.", "Ze waren open: mensen kwamen langs en er was altijd koffie.", "Ze werden gepland in een grote agenda.", "Ze werkte elke avond."] },
      { q: "Welk experiment probeerde de schrijver?", o: ["Een jaar zonder agenda leven", "De woensdagavond vrijhouden van afspraken", "Elke dag onaangekondigd bij vrienden langsgaan", "Etentjes maanden van tevoren plannen"] },
    ],
  },
  {
    text: "nl-5-two-vases",
    q: [
      { q: "Waarom moet Joris de waardevolle vaas op zijn bakfiets vervoeren?", o: ["Mevrouw Sterk vertrouwt taxi's niet.", "Er is iets mis met de koppeling van de auto.", "De fotograaf woont in een straat die afgesloten is voor auto's.", "Hij wil geld besparen."] },
      { q: "Wat gebeurt er op het bruggetje?", o: ["Door een bestelbus moet Joris hard remmen, en beide dozen vallen eruit.", "Joris laat één doos in de gracht vallen.", "Een toerist botst tegen zijn fiets en breekt een tuit af.", "Het zeil waait weg met de doos van Lotte."] },
      { q: "Hoe ontdekt mevrouw Sterk de verwisseling?", o: ["Bram belt haar over het glazuur.", "Ze vindt een winkelsticker met een prijs op de onderkant van de vaas.", "Lotte vertelt haar dat de Belgen de echte vaas hebben.", "De vaas op de catalogusfoto ziet er kleiner uit."] },
      { q: "Waar is de vaas als Joris Wim en Greet eindelijk vindt?", o: ["In hun koffer in het hotel", "Op de rondvaartboot", "Bij hun nichtje Fien, die hem voor haar verjaardag heeft gekregen", "Al in de trein naar Gent"] },
      { q: "Waarom wilde Fien van de vaas af?", o: ["Ze vond hem lelijk en kapot.", "Haar tante geeft haar er elk jaar een, en ze had er al drie.", "Haar huisgenoten hadden geld nodig voor het feest.", "Ze was allergisch voor tulpen."] },
      { q: "Welk verhaal vertelt mevrouw Sterk aan Joris na zijn bekentenis?", o: ["Hoe ze ooit een Ming-schaal brak", "Hoe ze ooit een Friese staartklok in de trein liet staan en hem drie dagen later terugkreeg", "Hoe haar vader een assistent ontsloeg om een vergelijkbare fout", "Hoe ze haar eerste vaas in een kringloopwinkel kocht"] },
      { q: "Wat is een van de voorwaarden van Haverkamp?", o: ["Dat hij de vaas mag houden voor drie euro vijftig", "Dat zijn naam niet in de catalogus komt", "Dat hij het souvenir krijgt dat in de catalogus stond", "Dat Joris zijn baan verliest"] },
      { q: "Hoe loopt de veiling af?", o: ["Het museum aan de telefoon koopt de vaas.", "Haverkamp koopt hem voor tweeënvijftigduizend euro.", "Mevrouw Sterk trekt het kavel terug.", "Niemand biedt meer dan dertigduizend euro."] },
    ],
  },
  {
    text: "nl-6-ferry",
    q: [
      { q: "Waarom werd de pont uit de vaart genomen?", o: ["Hij was te oud en gevaarlijk.", "Door een nieuwe brug was hij overbodig geworden.", "Gerrit ging met pensioen."] },
      { q: "Hoe kende Gerrit Maarten?", o: ["Ze hadden samengewerkt.", "Maarten had als kind zijn zomers op de pont doorgebracht.", "Maarten was zijn neef."] },
      { q: "Wat deed Gerrit halverwege de rivier?", o: ["Hij luidde de bel.", "Hij vertelde een verhaal over zijn vader.", "Hij zette de motor uit, zodat Maarten kon luisteren."] },
      { q: "Waarvoor was Maarten volgens de tekst eigenlijk gekomen?", o: ["Om afscheid te nemen van de dorpelingen", "Voor de persoon die hij daar ooit was geweest", "Om de pont te kopen"] },
      { q: "Wat gaf Gerrit aan het eind aan Maarten?", o: ["De oude koperen bel van de pont", "Het stuurwiel van de pont", "Het spandoek"] },
    ],
  },
  {
    text: "nl-6-tulip-mania",
    q: [
      { q: "Waarom waren gevlamde of gestreepte tulpen zo waardevol?", o: ["Ze groeiden alleen in Turkije.", "Het virus dat ze veroorzaakte verspreidde zich onvoorspelbaar, waardoor ze zeldzaam waren.", "Rijke kooplieden beschilderden ze."] },
      { q: "Waar vond de tulpenhandel vooral plaats?", o: ["Op de beurs", "In bloemenwinkels", "In herbergen"] },
      { q: "Wat kochten de kopers eigenlijk?", o: ["Volgroeide bloemen", "Een belofte dat de bollen in het voorjaar geleverd zouden worden", "Grond om tulpen op te kweken"] },
      { q: "Wat zegt recent onderzoek over de krach?", o: ["De meeste handelaren werden erdoor geruïneerd.", "Er waren nauwelijks faillissementen.", "Hij heeft nooit plaatsgevonden."] },
      { q: "Waar komen veel dramatische verhalen over de tulpenmanie vandaan?", o: ["Uit bankadministraties", "Uit moraliserende pamfletten die waarschuwden tegen hebzucht", "Uit brieven van kooplieden"] },
    ],
  },
  {
    text: "nl-6-forgetting",
    q: [
      { q: "Wat mat Ebbinghaus om te bepalen hoeveel hij nog van een lijst wist?", o: ["Hoeveel lettergrepen hij kon opschrijven", "Hoeveel sneller hij de lijst opnieuw kon leren", "Hoe lang hij zonder fouten kon blijven opzeggen", "Hoeveel lettergrepen hem aan echte woorden deden denken"] },
      { q: "Wat houdt het spacing-effect in?", o: ["Herhalingen verspreid over meerdere dagen werken beter dan dezelfde inspanning in één keer.", "Korte lijsten zijn makkelijker te leren dan lange.", "Onzinlettergrepen worden sneller vergeten dan woorden.", "Na een maand houdt het vergeten helemaal op."] },
      { q: "Wat gebeurde er met “De oorlog van de geesten” toen de proefpersonen van Bartlett het navertelden?", o: ["Ze wisten het woord voor woord nog.", "Het werd langer en gedetailleerder.", "Het werd korter en leek meer op een bekend Engels verhaal.", "Ze waren het binnen een dag helemaal vergeten."] },
      { q: "Wat deed het gewelddadigere werkwoord in het experiment uit 1974 met de mensen?", o: ["Ze weigerden te antwoorden.", "Ze schatten de snelheid hoger in en herinnerden zich later gebroken glas dat er niet was.", "Ze herinnerden zich de film nauwkeuriger.", "Ze keken de film een tweede keer."] },
      { q: "Wat is denken volgens de verteller in het verhaal van Borges?", o: ["Je elk detail herinneren", "Verschillen vergeten, veralgemenen en abstraheren", "Herhalen wat je gehoord hebt", "Woorden in beelden omzetten"] },
      { q: "Welk probleem bezorgde het geheugen van Sjeresjevski hem?", o: ["Hij kon geen getallen onthouden.", "Hij had moeite met gezichten, romans en abstracte ideeën, en kon bijna niets vergeten.", "Hij vergat alles na een uur.", "Hij kon alleen dingen onthouden die hij in een spiegel had gezien."] },
      { q: "Wat kon Henry Molaison na zijn operatie nog leren?", o: ["Nieuwe namen en gezichten", "Een motorische vaardigheid, zoals een ster natekenen in een spiegel", "Lijsten met onzinlettergrepen", "Helemaal niets"] },
      { q: "Welk advies geeft het essay NIET?", o: ["Spreid je herhalingen.", "Overhoor jezelf in plaats van te herlezen.", "Studeer de nacht voor een examen door.", "Leer woorden in betekenisvolle contexten."] },
    ],
  },
  {
    text: "nl-6-keepers-house",
    q: [
      { q: "Waarom nam Eva het werk op Terschelling aan?", o: ["Haar bureau stuurde haar erheen om een hotel te ontwerpen.", "Ze zat ziek thuis nadat ze midden in een presentatie was vastgelopen, en een advertentie maakte haar aan het lachen.", "Ze had het huis van de lichtwachter van een familielid geërfd.", "Ze wilde een boek over vuurtorens schrijven."] },
      { q: "Hoe noemen sommige eilanders het huis van de lichtwachter?", o: ["Het huis van de verdronken zeelieden", "Het huis van het valse licht", "Het huis aan het eind van de wereld", "Het cranberryhuis"] },
      { q: "Wat zei de vader van Tine altijd over de noordmuur?", o: ["Dat het het oudste deel van het eiland was", "Dat die muur zijn mond houdt", "Dat hij elke winter opnieuw gebouwd moest worden", "Dat er een schat onder begraven lag"] },
      { q: "Wat wil Ruben van Eva als hij belt?", o: ["Dat ze haar aandeel in het bureau verkoopt", "Dat ze terugkomt om aan een architectuurprijsvraag te werken", "Dat ze een vakantiehuis op het eiland voor hem ontwerpt", "Dat ze haar excuses aanbiedt aan de klanten"] },
      { q: "Wat werd er na de storm achter de noordmuur gevonden?", o: ["Een dichtgemetselde bedstee met een blikken doos met een logboek en een brief", "Gouden munten van het scheepswrak", "De scheepsbel van de Elisabeth", "Een tweede trap naar de zolder"] },
      { q: "Waarom had Hendrik Kooiman de waarheid voor zich gehouden?", o: ["De eilanders hadden hem betaald om te zwijgen.", "Als hij had toegegeven dat het licht uit was gegaan, was hij zijn baan kwijtgeraakt.", "Hij kon niet schrijven en niemand kon zijn logboek lezen.", "Hij wilde zijn zoon beschermen, die de schipbreuk had veroorzaakt."] },
      { q: "Hoe loopt Eva's verhaal met haar bureau af?", o: ["Ze gaat terug naar Amsterdam om de prijsvraag te leiden.", "Ze stopt bij het bureau en gaat terug naar het eiland, met een retourtje.", "Ze verkoopt het huis van de lichtwachter aan Ruben.", "Ze wordt de nieuwe lichtwachter."] },
    ],
  },
];

export default data;
