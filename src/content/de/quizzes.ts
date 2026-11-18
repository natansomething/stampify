import type { TextQuiz } from '../types';

const data: TextQuiz[] = [
  {
    text: "de-3-night-train",
    q: [
      { q: "Warum hat Jana den Nachtzug genommen?", o: ["Er war billiger als ein Hotel.", "Sie wollte nicht lange am Flughafen warten.", "Eine Freundin hat ihn empfohlen."] },
      { q: "Was hat Margarete gemacht, als Jana ins Abteil kam?", o: ["Sie hat geschlafen.", "Sie hat gegessen.", "Sie hat ein Buch gelesen."] },
      { q: "Was war Margarete von Beruf?", o: ["Lehrerin", "Zugbegleiterin", "Cafébesitzerin"] },
      { q: "Was hat Margarete Jana gegeben?", o: ["Ein Buch", "Eine Liste mit ihren Lieblingsorten", "Ihre Telefonnummer"] },
      { q: "Warum hat Jana schlecht geschlafen?", o: ["Der Zug hat oft gehalten.", "Margarete hat die ganze Nacht geredet.", "Im Abteil war es kalt."] },
    ],
  },
  {
    text: "de-3-food-waste",
    q: [
      { q: "Woher kommt ein großer Teil der weggeworfenen Lebensmittel?", o: ["Aus Supermärkten", "Aus Restaurants", "Aus privaten Haushalten"] },
      { q: "Was soll man laut Experten tun, bevor man Lebensmittel wegwirft?", o: ["Sie ansehen, riechen und probieren", "Sie sofort einfrieren", "Im Supermarkt fragen"] },
      { q: "Wobei können Apps helfen?", o: ["Beim Bestellen von Essen nach Hause", "Beim billigen Kauf von übrigem Essen aus Bäckereien und Restaurants", "Beim Finden von Rezepten"] },
      { q: "Wofür sind die öffentlichen Kühlschränke da?", o: ["Jeder darf sich dort kostenlos Lebensmittel nehmen.", "Restaurants lagern dort ihre Getränke.", "Leute verkaufen dort Lebensmittel."] },
    ],
  },
  {
    text: "de-3-stromausfall",
    q: [
      { q: "Was hat der Vater gemacht, als der Strom ausfiel?", o: ["Er hat ferngesehen.", "Er hat am Laptop gearbeitet.", "Er hat das Abendessen gekocht."] },
      { q: "Wie lange konnte der Stromausfall laut dem Handy der Mutter dauern?", o: ["Zwei Tage", "Ein paar Minuten", "Ein paar Stunden"] },
      { q: "Was hat der Großvater aus seiner Tasche geholt?", o: ["Ein altes Kartenspiel", "Kerzen", "Ein Buch"] },
      { q: "Welche Geschichte hat der Großvater erzählt?", o: ["Wie er seine Frau kennengelernt hat", "Wie er als junger Mann mit dem Fahrrad nach Italien gefahren ist", "Wie er sein Haus gebaut hat"] },
      { q: "Was hat sich seit diesem Abend in der Familie geändert?", o: ["Der Großvater ist ausgezogen.", "Sie haben einen Generator gekauft.", "Jeden Dienstag verbringen sie einen Abend ohne Bildschirme."] },
    ],
  },
  {
    text: "de-3-wandern",
    q: [
      { q: "Wann hat die Liebe der Deutschen zum Wandern laut vielen Historikern begonnen?", o: ["Im Mittelalter", "In der Romantik vor etwa 200 Jahren", "Nach dem Zweiten Weltkrieg"] },
      { q: "Was haben die ersten Wandervereine gemacht?", o: ["Sie haben Wettrennen organisiert.", "Sie haben Wanderschuhe verkauft.", "Sie haben Wege gebaut, Schilder aufgestellt und Hütten eröffnet."] },
      { q: "Wie lang ist der Rennsteig?", o: ["Etwa 1.700 Kilometer", "Etwa 17 Kilometer", "Etwa 170 Kilometer"] },
      { q: "Warum wandern heute viele junge Leute?", o: ["Es ist ein Schulfach.", "Es ist ein Ausgleich zu Büro und Bildschirm.", "Es ist modern, teure Ausrüstung zu kaufen."] },
      { q: "Worum bitten viele Regionen die Wanderer?", o: ["Mit Bus und Bahn zu kommen und keine Spuren zu hinterlassen", "Eintritt zu bezahlen", "Zu Hause zu bleiben"] },
    ],
  },
  {
    text: "de-3-bodensee",
    q: [
      { q: "Welche drei Länder teilen sich das Ufer des Bodensees?", o: ["Deutschland, Frankreich und die Schweiz", "Deutschland, Österreich und die Schweiz", "Deutschland, Österreich und Italien", "Österreich, die Schweiz und Liechtenstein"] },
      { q: "Warum nennen manche Leute den See „Schwäbisches Meer“?", o: ["Weil sein Wasser salzig ist", "Weil man an manchen Tagen das andere Ufer kaum sieht", "Weil er hohe Wellen hat", "Weil er der tiefste See Europas ist"] },
      { q: "Wofür ist die Insel Mainau bekannt?", o: ["Für ihr Schloss und ihren Wein", "Für ihre Blumen, Palmen und Schmetterlinge", "Für ihr Zeppelinmuseum", "Für ihre Opernbühne"] },
      { q: "Was ist im Jahr 1900 in Friedrichshafen passiert?", o: ["Die erste Fähre nach Konstanz ist gefahren.", "Das erste Luftschiff von Graf Zeppelin ist in den Himmel gestiegen.", "Der Radweg wurde eröffnet.", "Die Opernfestspiele haben begonnen."] },
      { q: "Was ist das Besondere an den Festspielen in Bregenz?", o: ["Sie finden auf einer Bühne im See statt.", "Sie sind nur für Kinder.", "Sie finden auf einem Schiff statt.", "Sie finden im Winter statt."] },
      { q: "Wann ist der See für viele Einheimische am schönsten?", o: ["Im Juli und August", "Im Dezember", "Im Mai oder September", "Während der Festspiele"] },
    ],
  },
  {
    text: "de-3-die-torte",
    q: [
      { q: "Was war Felix' einzige Aufgabe bei der Hochzeit?", o: ["Eine Rede halten", "Die Torte abholen und zum Gasthof bringen", "Die Braut fahren", "Fotos machen"] },
      { q: "Warum konnte Felix nicht mit seinem Auto fahren?", o: ["Jonas hatte es ausgeliehen.", "Es hatte kein Benzin.", "Es ist nicht angesprungen.", "Die Torte hat nicht hineingepasst."] },
      { q: "Wie hat Felix die Torte am Ende transportiert?", o: ["Mit dem Taxi", "Im Hundeanhänger des Nachbarn hinter einem Fahrrad", "Zu Fuß in den Armen", "Mit dem Bus"] },
      { q: "Was ist oben auf dem Hügel passiert?", o: ["Der Anhänger ist durch ein Schlagloch gefahren und der Bräutigam aus Zucker ist heruntergefallen.", "Der Hund Otto hat ein Stück von der Torte gegessen.", "Felix ist vom Fahrrad gefallen.", "Die Torte ist in den See gerutscht."] },
      { q: "Warum lacht Clara über den Bräutigam ohne Kopf?", o: ["Sie mochte die Figuren nie.", "Der echte Bräutigam steht im Stau und hat auch „den Kopf verloren“.", "Sie glaubt, Felix hat das absichtlich gemacht.", "Es ist die falsche Torte."] },
    ],
  },
  {
    text: "de-4-fundbuero",
    q: [
      { q: "Wo arbeitet Konrad?", o: ["In einem Musikgeschäft in Prag", "Im Fundbüro des Leipziger Hauptbahnhofs", "An einem Konservatorium", "In einem Nachtzug"] },
      { q: "Was passiert normalerweise nach sechs Monaten mit Fundstücken?", o: ["Sie werden weggeworfen.", "Sie werden gespendet.", "Sie werden versteigert."] },
      { q: "Wie hat Konrad versucht, die Besitzerin zu finden?", o: ["Er hat eine Anzeige in die Zeitung gesetzt.", "Er hat beim Konservatorium angerufen und das Foto an Musikschulen geschickt.", "Er ist nach Prag gefahren.", "Er hat die Reinigungskraft gefragt."] },
      { q: "Wer hatte die Geige im Zug liegen lassen?", o: ["Die alte Dame selbst", "Die Mutter der Dame", "Der Enkel der Dame", "Eine Reinigungskraft"] },
      { q: "Was bekommt Konrad jedes Jahr zu Weihnachten?", o: ["Eine Konzertkarte", "Eine Karte mit einer kleinen gezeichneten Geige", "Ein Foto von dem Mädchen", "Gar nichts"] },
    ],
  },
  {
    text: "de-4-gemeinschaftsgarten",
    q: [
      { q: "Wo entstehen Gemeinschaftsgärten oft?", o: ["Nur in öffentlichen Parks", "Auf brachliegenden Grundstücken, Parkplätzen oder Dächern", "Auf Bauernhöfen außerhalb der Stadt", "In Schulen"] },
      { q: "Warum wachsen die Tomaten im Kreuzberger Garten in Säcken und Kisten?", o: ["Weil es schöner aussieht", "Weil es keinen Platz gibt", "Weil der Boden nicht sauber genug ist"] },
      { q: "Was ist vielen Teilnehmern am wichtigsten?", o: ["Die Ernte", "Beim Essen Geld zu sparen", "Der Kontakt zu den Nachbarn", "Etwas über Investoren zu lernen"] },
      { q: "Was ist ein häufiges Problem dieser Projekte?", o: ["Sie haben zu wenige Mitglieder.", "Das Grundstück gehört ihnen meistens nicht.", "Pflanzen wachsen in der Stadt nicht.", "Kritiker zerstören die Beete."] },
      { q: "Was passiert in München?", o: ["Gemeinschaftsgärten werden verboten.", "Neue Stadtviertel werden von Anfang an mit Gartenflächen geplant.", "Investoren kaufen alle Gärten."] },
    ],
  },
  {
    text: "de-4-klassentreffen",
    q: [
      { q: "Warum wollte Jonas zuerst nicht zum Klassentreffen gehen?", o: ["Er wohnte zu weit weg.", "Er hatte zu viel zu tun.", "Er hatte schlechte Erinnerungen an die Schule."] },
      { q: "Was hatte Markus in der Schulzeit gemacht?", o: ["Er hatte Jonas bei den Hausaufgaben geholfen.", "Er hatte sich über Jonas lustig gemacht.", "Er hatte alle ignoriert."] },
      { q: "Wie wirkte Markus beim Klassentreffen?", o: ["Laut und selbstbewusst", "Müde, blass und allein", "Wütend und betrunken"] },
      { q: "Was hat Jonas gefühlt, nachdem Markus sich entschuldigt hatte?", o: ["Eine seltsame Erleichterung", "Peinlichkeit", "Wut"] },
      { q: "Wie endet die Geschichte?", o: ["Jonas blockiert Markus' Nummer.", "Sie verabreden sich auf einen Kaffee.", "Jonas zieht in eine andere Stadt."] },
    ],
  },
  {
    text: "de-4-pfand",
    q: [
      { q: "Wie hoch ist das Pfand auf eine Einwegflasche aus Plastik?", o: ["25 Cent", "8 Cent", "15 Cent"] },
      { q: "Was passiert mit Mehrwegflaschen?", o: ["Sie werden gereinigt und wieder gefüllt.", "Sie werden weggeworfen.", "Sie werden zerdrückt."] },
      { q: "Wann wurde das Pfand auf Einwegverpackungen eingeführt?", o: ["2022", "1993", "2003"] },
      { q: "Worauf weisen Kritiker hin?", o: ["Die Automaten sind zu teuer.", "Das Pfand ist zu hoch.", "Der Anteil der Mehrwegflaschen sinkt."] },
      { q: "Warum haben manche Städte Halterungen an Mülleimern angebracht?", o: ["Um für Getränke zu werben", "Um Müll zu sammeln", "Damit Sammler nicht im Müll suchen müssen"] },
    ],
  },
  {
    text: "de-4-kiosk",
    q: [
      { q: "Warum hat Jana ihren Job verloren?", o: ["Sie kam oft zu spät.", "Die kleine Agentur, für die sie arbeitete, musste schließen.", "Sie ist nach Berlin gezogen.", "Sie hat gekündigt, um einen Kiosk zu führen."] },
      { q: "Wie hat sich Herr Aydın das Bein gebrochen?", o: ["Er ist auf Eis ausgerutscht.", "Er ist beim Wechseln einer Glühbirne von der Leiter gefallen.", "Er hatte einen Fahrradunfall.", "Ein Karton ist auf ihn gefallen."] },
      { q: "Was war das Besondere an Herrn Aydıns Heft?", o: ["Es war eine genaue Preisliste.", "Es war vor allem eine Liste der Kunden und was sie brauchten.", "Darin standen seine Rezepte.", "Es war auf Türkisch geschrieben."] },
      { q: "Wie hat Jana das Problem mit den 200 Packungen Kaugummi gelöst?", o: ["Sie hat sie zurückgeschickt.", "Sie hat sie einer Schule geschenkt.", "Sie hat ein Plakat gemacht und eine „Kaugummi-Woche“ veranstaltet.", "Sie hat sie im Keller versteckt."] },
      { q: "Wie hat sich Janas Beziehung zu Frau Schulz verändert?", o: ["Frau Schulz kam nicht mehr zum Kiosk.", "Sie lösen jetzt jeden Mittwoch zusammen die Rätsel.", "Frau Schulz hat sich bei Herrn Aydın beschwert.", "Sie haben über ihren Mann gestritten."] },
      { q: "Was hat Herr Aydın vorgeschlagen, als Jana ihm von dem Job in Berlin erzählt hat?", o: ["Dass sie den Job annehmen soll", "Dass sie nachmittags im Kiosk arbeitet und Plakate für andere Geschäfte gestaltet", "Dass sie den Kiosk kauft", "Dass sein Neffe den Kiosk übernimmt"] },
    ],
  },
  {
    text: "de-4-kompass-im-kopf",
    q: [
      { q: "Was ist der Hauptgrund, warum Vögel wegziehen?", o: ["Sie fliehen vor Feinden.", "Sie suchen genug Nahrung.", "Sie suchen wärmeres Wasser zum Schwimmen.", "Sie wollen lange Tage vermeiden."] },
      { q: "Warum fliegen Störche nicht über das offene Meer?", o: ["Sie haben Angst vor Wasser.", "Sie segeln und brauchen warme Luft, die über dem Land aufsteigt.", "Sie können die Küste nicht sehen.", "Sie müssen oft trinken."] },
      { q: "Was ist an der Pfuhlschnepfe so erstaunlich?", o: ["Sie fliegt ohne Pause mehr als 11.000 Kilometer.", "Sie zieht nur nachts.", "Sie reist zusammen mit Störchen.", "Sie verlässt Alaska nie."] },
      { q: "Was hat das Experiment im Planetarium gezeigt?", o: ["Vögel orientieren sich am Mond.", "Vögel orientieren sich an den Sternen.", "Vögel können im Dunkeln nicht fliegen.", "Vögel brauchen das Magnetfeld."] },
      { q: "Was ist passiert, als Forscher das Magnetfeld um die Rotkehlchen verändert haben?", o: ["Die Rotkehlchen haben aufgehört zu singen.", "Die Rotkehlchen sind in die falsche Richtung gehüpft.", "Nichts hat sich verändert.", "Die Rotkehlchen sind eingeschlafen."] },
      { q: "Warum ist die Reise des jungen Kuckucks so überraschend?", o: ["Er fliegt mit seinen Eltern.", "Er findet allein den Weg nach Afrika, ohne seine Eltern je gekannt zu haben.", "Er fliegt im Winter nach Norden.", "Er zieht nie weg."] },
    ],
  },
  {
    text: "de-5-brief-aus-lissabon",
    q: [
      { q: "An wen war der Brief adressiert?", o: ["An Mira", "An Miras verstorbene Großmutter", "An eine Buchhandlung in Lissabon", "An Miras Mutter"] },
      { q: "Woher kannte Tomás Miras Großmutter?", o: ["Sie waren Nachbarn.", "Sie hatten zusammen in einer Buchhandlung in Lissabon gearbeitet.", "Sie hatten zusammen in Deutschland studiert.", "Sie waren verheiratet gewesen."] },
      { q: "Was bereut Tomás?", o: ["Dass er die Buchhandlung verkauft hat", "Dass sie über Gedichte gestritten haben", "Dass er ihr nie gesagt hat, was sie ihm bedeutete"] },
      { q: "Was hat Mira auf dem Dachboden gefunden?", o: ["Alte Briefe von Tomás", "Einen abgegriffenen portugiesischen Gedichtband mit einer Widmung, unterschrieben mit T.", "Fotos von Lissabon", "Ein Flugticket"] },
      { q: "Was hat Mira gemacht, nachdem Tomás ihr geantwortet hatte?", o: ["Sie hat das Buch zurückgeschickt.", "Sie hat die Antwort ignoriert.", "Sie hat noch am selben Abend einen Flug gebucht.", "Sie hat ihn angerufen."] },
    ],
  },
  {
    text: "de-5-lob-der-langeweile",
    q: [
      { q: "Was haben die Teilnehmer der Studie vor der kreativen Aufgabe gemacht?", o: ["Sie haben Videos angesehen.", "Sie haben Telefonnummern abgeschrieben.", "Sie haben eine Stunde geschlafen.", "Sie haben mit Plastikbechern gespielt."] },
      { q: "Was war das Ergebnis der Studie?", o: ["Die Kontrollgruppe war kreativer.", "Es gab keinen Unterschied.", "Die gelangweilte Gruppe war einfallsreicher."] },
      { q: "Was macht das Gehirn laut dem Text, wenn keine äußeren Reize da sind?", o: ["Es schaltet ab.", "Es ordnet Erinnerungen und stellt Verbindungen her.", "Es wird faul.", "Es sucht einen Bildschirm."] },
      { q: "Was ist das Problem am heutigen Alltag?", o: ["Die Menschen arbeiten zu viel.", "Jede Lücke wird sofort mit Medien gefüllt.", "Die Wege zur Arbeit sind zu lang.", "Kinder haben zu wenig Hausaufgaben."] },
      { q: "Was wird Eltern geraten?", o: ["Den Kindern mehr Hausaufgaben zu geben", "Ihnen Smartphones zu kaufen", "Nicht jede freie Minute mit Aktivitäten zu füllen", "Sie von anderen Kindern fernzuhalten"] },
    ],
  },
  {
    text: "de-5-die-letzte-sendung",
    q: [
      { q: "Was für eine Sendung hat Helga moderiert?", o: ["Eine Nachrichtensendung am Morgen", "Eine nächtliche Sendung, in der Hörer anrufen", "Eine Hitparade"] },
      { q: "Worüber hat der „Leuchtturmwärter“ am Telefon gesprochen?", o: ["Über seine Arbeit und seine Familie", "Über Politik und Sport", "Über das Meer, Sternbilder und Bücher"] },
      { q: "Was war der Anrufer wirklich von Beruf?", o: ["Nachtpförtner in einem Krankenhaus", "Leuchtturmwärter", "Seemann"] },
      { q: "Was hatte seine Tochter in seiner Wohnung gefunden?", o: ["Ein Tagebuch über Leuchttürme", "Briefe an Helga", "Kassetten, auf denen er jede Sendung aufgenommen hatte"] },
      { q: "Wie hat Helga gegen die Regeln des Senders verstoßen?", o: ["Sie hat in der Sendung geflucht.", "Sie hat die geplante Musik weggelassen, um mit Lena zu sprechen.", "Sie hat die Sendung um zwei Stunden verlängert."] },
    ],
  },
  {
    text: "de-5-macht-der-gewohnheit",
    q: [
      { q: "Welcher Anteil unserer täglichen Handlungen beruht nach manchen Schätzungen auf Gewohnheiten?", o: ["Etwa ein Zehntel", "Fast die Hälfte", "Fast alle"] },
      { q: "Welche drei Elemente hat die Gewohnheitsschleife?", o: ["Wunsch, Anstrengung, Erfolg", "Auslöser, Routine, Belohnung", "Plan, Handlung, Ergebnis"] },
      { q: "Wie lange haben die Teilnehmer der Londoner Studie im Durchschnitt gebraucht, bis eine neue Gewohnheit automatisch ablief?", o: ["Ein Jahr", "21 Tage", "66 Tage"] },
      { q: "Was hat die Studie über das gelegentliche Auslassen eines Tages herausgefunden?", o: ["Es hat die Gewohnheit zerstört.", "Es hat den Erfolg kaum gefährdet.", "Es hat die Gewohnheit stärker gemacht."] },
      { q: "Welchen Rat gibt der Artikel?", o: ["Mit großen Veränderungen anfangen", "Neue Gewohnheiten an bestehende Routinen knüpfen", "Sich auf die Willenskraft verlassen"] },
    ],
  },
  {
    text: "de-5-gueterzugwoerter",
    q: [
      { q: "Woher stammt der inoffizielle Rekord für das längste deutsche Wort?", o: ["Aus einem Roman von Mark Twain", "Aus einem Gesetz über die Etikettierung von Rindfleisch in Mecklenburg-Vorpommern", "Aus einem Kinderbuch", "Von einer Donau-Schifffahrtsgesellschaft"] },
      { q: "Wie sollte man ein langes deutsches Kompositum laut dem Essay lesen, um es zu verstehen?", o: ["Von links nach rechts, Buchstabe für Buchstabe", "Von rechts nach links, beginnend mit dem Grundwort", "Nur mit einem Blick in den Duden", "Indem man die Fugenelemente ignoriert"] },
      { q: "Was bestimmt das grammatische Geschlecht eines Kompositums?", o: ["Der erste Teil", "Der längste Teil", "Der letzte Teil (das Grundwort)", "Das Fugenelement"] },
      { q: "Was sagt der Essay über „unübersetzbare“ deutsche Wörter wie „Schadenfreude“?", o: ["Nur Deutsche können diese Gefühle empfinden.", "Andere Sprachen kennen die Gefühle, drücken sie aber mit mehreren Wörtern aus.", "Man kann sie auf Englisch überhaupt nicht erklären.", "Mark Twain hat sie erfunden."] },
      { q: "Was ist das Ironische am Wort „Wanderlust“?", o: ["Es ist im Englischen beliebt, während Deutsche eher „Fernweh“ sagen würden.", "Es wurde in England erfunden.", "Es ist in offiziellen Dokumenten verboten.", "Es bedeutet auf Deutsch das Gegenteil."] },
      { q: "Warum vergleicht der Autor lange deutsche Wörter mit einem Güterzug?", o: ["Weil man sie nur langsam lesen kann", "Weil jeder Teil seine eigene Ladung trägt und der Teil, der alles antreibt, am Ende steht", "Weil Eisenbahngesellschaften sie erfunden haben", "Weil es in ihnen immer um Transport geht"] },
    ],
  },
  {
    text: "de-5-zimmer-neun",
    q: [
      { q: "Was erzählt Onkel Sepp Theresa am Telefon?", o: ["Dass der Gasthof verkauft werden soll", "Dass diese Woche ein Tester vom Alpenrose-Führer ins Tal kommt", "Dass ein berühmter Koch in ihrer Küche arbeiten will", "Dass der Bürgermeister ein Fest plant"] },
      { q: "Warum gibt Theresa Herrn Klee das Turmzimmer?", o: ["Sein Einzelzimmer hat wirklich einen Wasserschaden.", "Er verlangt das beste Zimmer im Haus.", "Sie hält ihn für den Tester und will ihn beeindrucken.", "Das Turmzimmer ist das ruhigste Zimmer."] },
      { q: "Warum bekommt Frau Moser Zimmer neun?", o: ["Theresa hält sie für ungefährlich und gibt ihr das schlechteste freie Zimmer.", "Sie möchte ein Zimmer in der Nähe der Küche.", "Nur in diesem Zimmer sind Hunde erlaubt.", "Lena empfiehlt es ihr."] },
      { q: "Was liest Florian in Herrn Klees Notizbuch, und worauf bezieht es sich wirklich?", o: ["Eine Beschwerde über den Lärm, die sich auf die Blaskapelle bezieht", "„Steinbock – endlich! Eindrucksvoller als erwartet“, was sich auf einen echten Steinbock bezieht", "Eine Preisliste, die sich auf sein eigenes Budget bezieht", "Ein Lob für die Knödel, das sich auf die Küche seiner Schwester bezieht"] },
      { q: "Wie endet der Almabtrieb für Kaiser und Florian?", o: ["Kaiser läuft in den Wald, und Florian gibt auf.", "Kaiser fällt in den Dorfbrunnen, und Florian springt hinterher.", "Eine Kuh tritt Kaiser, und Florian bringt ihn zum Tierarzt.", "Kaiser versteckt sich unter der Bühne der Kapelle."] },
      { q: "Was erzählt Lena Frau Moser beim Spaziergang über ihren Bruder?", o: ["Dass er nächsten Monat nach München zurückwill", "Dass er am besten das kocht, was er nicht ernst nimmt", "Dass er nie mit Käse aus der Gegend kocht", "Dass er den Gasthof bald übernehmen will"] },
      { q: "Was ist Herr Klee von Beruf, und warum hat er ein Notizbuch?", o: ["Er ist Journalist und macht Notizen für einen Artikel.", "Er ist Hoteltester und schreibt seine Bewertung.", "Er ist Zahnarzt und notiert die Vögel und Tiere, die er sieht.", "Er ist Lehrer und plant einen Schulausflug."] },
      { q: "Was lobt der Alpenrose-Führer am „Goldenen Steinbock“ am meisten?", o: ["Das luxuriöse Turmzimmer", "Das Menü mit sieben Gängen und seine Desserts", "Dass Gäste freundlich behandelt werden, auch wenn sie nass, schlecht gelaunt und ohne Reservierung ankommen", "Die Blaskapelle und den Almabtrieb"] },
    ],
  },
  {
    text: "de-6-die-uhrmacherin",
    q: [
      { q: "Wie lange reparierte Hedwig schon Uhren?", o: ["Etwa zehn Jahre", "Seit über vierzig Jahren", "Seit der vergangenen Woche", "Sie hatte gerade erst angefangen."] },
      { q: "Woher hatte der junge Mann die Taschenuhr?", o: ["Von einem Flohmarkt, sehr billig", "Von seinem Großvater", "Aus Hedwigs Laden", "Er hatte sie gestohlen."] },
      { q: "Wem hatte die Uhr ursprünglich gehört?", o: ["Dem Vater des jungen Mannes", "Hedwigs altem Meister", "Dem Bürgermeister"] },
      { q: "Was vermutete man im Ort seit Jahrzehnten?", o: ["Dass der Meister die Uhr verkauft hatte", "Dass die Uhr gestohlen worden war, womöglich von Hedwig", "Dass Hedwig den Ort verlassen würde", "Dass die Uhr eine Fälschung war"] },
      { q: "Was fand Hedwig in den Deckel eingraviert?", o: ["Den Namen des Meisters", "Den Namen des Flohmarkts", "Ihren eigenen Namen und ein Datum, an das sie sich erinnerte"] },
    ],
  },
  {
    text: "de-6-vom-verschwinden-der-nacht",
    q: [
      { q: "Für wie viele Menschen ist die Milchstraße Schätzungen zufolge verborgen?", o: ["Für fast niemanden", "Für mehr als ein Drittel der Menschheit", "Für alle Menschen in Europa", "Für genau die Hälfte der Menschheit"] },
      { q: "Warum kommen Zugvögel über Städten vom Kurs ab?", o: ["Insekten locken sie an.", "Helles Licht stört ihre Orientierung an den Sternen.", "Die Luft ist zu warm.", "Sie jagen Straßenlaternen hinterher."] },
      { q: "Warum haben LED-Lampen das Problem verschärft?", o: ["Sie sind heller als alle anderen Lampen.", "Sie sparen Strom, deshalb wird mehr beleuchtet als je zuvor.", "Sie ziehen mehr Insekten an als alte Lampen.", "Man kann sie nicht abschirmen."] },
      { q: "Welche einfachen Maßnahmen schlägt der Text vor?", o: ["In Städten alle Lichter ausschalten", "Lampen nach unten abschirmen und wärmeres Licht verwenden", "Mehr Sternenparks in Städten anlegen", "Nur noch Kerzen benutzen"] },
      { q: "Was zeichnet Sternenparks aus?", o: ["Sie verzichten auf unnötige Beleuchtung und ziehen Besucher an, die den Nachthimmel sehen wollen.", "Sie verkaufen Teleskope.", "Sie lassen nachts keine Besucher herein."] },
    ],
  },
  {
    text: "de-6-der-kartograf",
    q: [
      { q: "Was für ein Mensch war Anton Wiesner?", o: ["Fröhlich und zu Scherzen aufgelegt", "Genau, ernst und ein wenig weltfremd", "Nachlässig und faul"] },
      { q: "Warum bauten Kartografen manchmal absichtlich Fehler in Karten ein?", o: ["Um beweisen zu können, dass eine Karte abgeschrieben worden war", "Um ihre Kollegen zu prüfen", "Um Touristen zu verwirren"] },
      { q: "Was tat der Bauer an der Kreuzung?", o: ["Er baute ein echtes Dorf.", "Er entfernte die Schilder der Wanderer.", "Er stellte eine Bank und ein Schild auf und eröffnete später ein Gasthaus."] },
      { q: "Was beschloss das Amt bei der Überarbeitung der Karte?", o: ["Wiesenrode zu streichen", "Wiesenrode auf der Karte zu lassen", "Den Ort nach Wiesner umzubenennen"] },
      { q: "Wessen Foto hängt neben der Tür des Gasthauses?", o: ["Das des Bauern", "Das von Wiesner", "Das des jungen Mitarbeiters"] },
    ],
  },
  {
    text: "de-6-nutzen-des-vergessens",
    q: [
      { q: "Wer hat das Vergessen als Erster systematisch untersucht?", o: ["Der Europäische Gerichtshof", "Jorge Luis Borges", "Hermann Ebbinghaus"] },
      { q: "Was zeigt die Vergessenskurve?", o: ["Wir vergessen über die Jahre gleichmäßig.", "Das meiste vergessen wir in den ersten Stunden und Tagen, der Rest bleibt lange erhalten.", "Was wir auswendig lernen, vergessen wir nie."] },
      { q: "Wozu ist das Gedächtnis nach neueren Ansätzen da?", o: ["Nur dazu, schmerzhafte Erlebnisse zu vergessen", "Die Vergangenheit möglichst genau zu speichern", "Gute Entscheidungen in der Gegenwart zu ermöglichen"] },
      { q: "Warum fragen Sprachlern-Apps Wörter ab, wenn man sie fast vergessen hat?", o: ["Weil mühsames Erinnern das Wissen stärker festigt", "Weil die Nutzer es lieber mögen", "Weil es billiger ist"] },
      { q: "Was hat der Europäische Gerichtshof 2014 anerkannt?", o: ["Ein Recht auf kostenloses Internet", "Ein Verbot von Suchmaschinen", "Ein Recht auf Vergessenwerden"] },
    ],
  },
  {
    text: "de-6-firnis",
    q: [
      { q: "Warum bringt Konstantin Bahr das Gemälde zu Johanna?", o: ["Er will es versteigern lassen.", "Es geht als Schenkung an ein Museum, und er möchte, dass es wieder so aussieht wie früher.", "Es wurde bei einem Hochwasser beschädigt.", "Seine Versicherung verlangt ein Zustandsprotokoll."] },
      { q: "Was zeigt die Infrarotkamera unter der Farbe?", o: ["Eine zweite Signatur von Asmussen", "Eine verborgene Frau auf der Brücke und eine Bleistiftinschrift", "Ein älteres Bild von einem Schiff", "Einen Einkaufszettel und eine Telefonnummer"] },
      { q: "Wie erklärt Ilse zunächst die kleine Zeichnung in ihrem Flur?", o: ["Johanna habe sie als Kind gezeichnet.", "Oma habe sie auf dem Flohmarkt gekauft.", "Sie sei ein Geschenk von Herrn Bahr.", "Sie sei ein Druck aus einem Souvenirladen, den sie selbst gekauft habe."] },
      { q: "Wo finden Johanna, Tarek und Bahr das Skizzenbuch und den Brief?", o: ["In einem Schrank im Büro der Firma Bahr", "Im Keller von Ilses Haus", "Im alten Windenkasten des früheren Kaffeebodens der Firma", "Im Staatsarchiv"] },
      { q: "Was bietet Friederike Lamprecht Johanna an?", o: ["Das Gemälde für ihre Galerie zu kaufen", "Ein bezahltes, vertrauliches Gutachten über das Skizzenbuch", "Eine Stelle in ihrer Galerie", "Ihr zwei Bilder von Asmussen zum Vergleich zu leihen"] },
      { q: "Warum hat Marthe laut ihrem Brief aufgehört zu malen?", o: ["Ihr Mann hat es ihr verboten.", "Sie hat ihre Farben bei der Sturmflut 1962 verloren.", "Sie hatte versprochen, nur so lange zu malen, wie Carl lebte.", "Sie hat in der Firma eine bessere Stelle bekommen."] },
      { q: "Welche Beweise zeigen, dass die späten Bilder von Marthe gemalt wurden?", o: ["Die Signaturen sind in ihrer Handschrift.", "Pinselstriche einer Linkshänderin und eine Blaumischung, die in ihrem Skizzenbuch notiert ist", "Eine Quittung mit ihrem Namen", "Eine Aussage von Carl Asmussen im Archiv"] },
      { q: "Warum beschließt Johanna, die übermalte Frau auf der Brücke nicht freizulegen?", o: ["Die Farbschicht ist zu dick, um sie sicher abzutragen.", "Das Museum verbietet es.", "Die Übermalung war Marthes eigene Entscheidung und gehört zum Werk.", "Ilse bittet sie darum, es nicht zu tun."] },
    ],
  },
  {
    text: "de-6-gleichzeitigkeit",
    q: [
      { q: "Was war die „mittlere Ortszeit“?", o: ["Die Zeit, die die Bahngesellschaften festlegten", "Die durchschnittliche Sonnenzeit eines bestimmten Ortes, die sich mit jedem Längengrad um vier Minuten verschiebt", "Die Zeit, die Schiffe auf See verwendeten", "Die Zeit genau zwischen Sonnenaufgang und Sonnenuntergang in Berlin"] },
      { q: "Warum störten die Unterschiede zwischen den Ortszeiten vor der Eisenbahn niemanden?", o: ["Uhren waren für die meisten Menschen zu teuer.", "Mit der Postkutsche reiste man so langsam und ungenau, dass ein paar Minuten keine Rolle spielten.", "Alle Städte richteten sich ohnehin nach der Berliner Zeit.", "Die Kirche verbot es, Zeiten zu vergleichen."] },
      { q: "Was ist das Besondere an der Uhr der alten Getreidebörse in Bristol?", o: ["Sie hat keinen Stundenzeiger.", "Sie läuft rückwärts.", "Sie hat zwei Minutenzeiger, einen für die Ortszeit und einen für die Londoner Zeit.", "Sie wurde als erste Uhr per Telegraf gestellt."] },
      { q: "Wer führte 1883 die vier Zeitzonen in Nordamerika ein?", o: ["Der US-Kongress", "Die Bahngesellschaften", "Die Sternwarte in Greenwich", "Sandford Fleming allein"] },
      { q: "Wie machte Moltke aus der Frage der Einheitszeit eine symbolische Frage?", o: ["Er nannte die verschiedenen Zeiten Überbleibsel aus der Epoche der deutschen Zersplitterung.", "Er forderte, dass die Berliner Zeit für die ganze Welt gelten solle.", "Er verglich die Uhren mit Kirchenglocken.", "Er schlug vor, die Eisenbahnen abzuschaffen."] },
      { q: "Warum hat Görlitz einen besonderen Platz in der Geschichte der deutschen Zeit?", o: ["Dort wurde das Gesetz von 1893 unterzeichnet.", "Der 15. Längengrad verläuft durch die Stadt, deshalb stimmen dort offizielle Zeit und mittlere Ortszeit überein.", "Es war die letzte Stadt, die die Ortszeit aufgab.", "Seine Sternwarte lieferte die ersten Zeitsignale."] },
      { q: "Welches Beispiel nennt der Autor dafür, dass sich die Konvention von der Natur entfernt?", o: ["Spanien verwendet die Mitteleuropäische Zeit, und China hat nur eine einzige Zeitzone.", "Großbritannien lehnt die Sommerzeit ab.", "Frankreich übernahm 1884 die Greenwich-Zeit.", "Deutschland hatte bis 1980 zwei Zeitzonen."] },
      { q: "Wofür steht das Bild der Uhr in Bristol am Ende des Essays?", o: ["Dass Uhren immer ein wenig falsch gehen", "Dass wir mit zwei Zeiten leben: der gemeinsamen Zeit der Welt und unserer eigenen Zeit des Körpers", "Dass Großbritannien Deutschland voraus war", "Dass Atomuhren bald die Sonne ersetzen werden"] },
    ],
  },
];

export default data;
