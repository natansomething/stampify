import type { Dialogue } from '../types';

const data: Dialogue[] = [
  {
    id: "it-d1-bar", lv: 1, title: "Al bar", titleEn: "At the café",
    turns: [
      { a: { t: "Buongiorno! Cosa prende?", en: "Good morning! What will you have?" }, c: 0, o: [
        { t: "Un cappuccino, per favore.", en: "A cappuccino, please." },
        { t: "Mi chiamo Anna.", en: "My name is Anna." },
        { t: "Abito a Milano.", en: "I live in Milan." },
      ] },
      { a: { t: "Qualcosa da mangiare?", en: "Anything to eat?" }, c: 2, o: [
        { t: "Sì, sono italiana.", en: "Yes, I'm Italian." },
        { t: "Oggi è lunedì.", en: "Today is Monday." },
        { t: "Sì, un cornetto alla crema.", en: "Yes, a custard croissant." },
      ] },
      { a: { t: "Mi dispiace, i cornetti alla crema sono finiti.", en: "I'm sorry, the custard croissants are sold out." }, c: 1, o: [
        { t: "Ho due figli.", en: "I have two children." },
        { t: "Allora un cornetto vuoto, grazie.", en: "Then a plain croissant, thanks." },
        { t: "La stazione è vicina.", en: "The station is nearby." },
      ] },
      { a: { t: "Al banco o al tavolo?", en: "At the counter or at a table?" }, c: 0, o: [
        { t: "Al banco, grazie.", en: "At the counter, thanks." },
        { t: "Alle otto di sera.", en: "At eight in the evening." },
        { t: "Mi piace il mare.", en: "I like the sea." },
      ] },
      { a: { t: "Sono tre euro e venti.", en: "That's three euros twenty." }, c: 2, o: [
        { t: "Ho trent'anni.", en: "I'm thirty years old." },
        { t: "È molto simpatico.", en: "He's very nice." },
        { t: "Ecco a lei. Posso pagare con la carta?", en: "Here you are. Can I pay by card?" },
      ] },
    ],
  },
  {
    id: "it-d1-albergo", lv: 1, title: "In albergo", titleEn: "At the hotel",
    turns: [
      { a: { t: "Buonasera, posso aiutarla?", en: "Good evening, can I help you?" }, c: 1, o: [
        { t: "No, non ho fame.", en: "No, I'm not hungry." },
        { t: "Buonasera, ho una prenotazione.", en: "Good evening, I have a booking." },
        { t: "Il treno è in ritardo.", en: "The train is late." },
      ] },
      { a: { t: "Come si chiama?", en: "What's your name?" }, c: 0, o: [
        { t: "Mi chiamo Peter Smith.", en: "My name is Peter Smith." },
        { t: "Sono le nove.", en: "It's nine o'clock." },
        { t: "Vado a Roma.", en: "I'm going to Rome." },
      ] },
      { a: { t: "Sì, una camera singola per due notti. Ha un documento?", en: "Yes, a single room for two nights. Do you have an ID?" }, c: 2, o: [
        { t: "No, grazie, non bevo caffè.", en: "No, thanks, I don't drink coffee." },
        { t: "Sì, la camera è grande.", en: "Yes, the room is big." },
        { t: "Sì, ecco il passaporto.", en: "Yes, here's my passport." },
      ] },
      { a: { t: "Grazie. La sua camera è la 24, al secondo piano.", en: "Thank you. Your room is number 24, on the second floor." }, c: 1, o: [
        { t: "Ho un fratello.", en: "I have a brother." },
        { t: "C'è l'ascensore?", en: "Is there a lift?" },
        { t: "Mi piace la pizza.", en: "I like pizza." },
      ] },
      { a: { t: "Sì, è lì a destra. La colazione è dalle sette alle dieci.", en: "Yes, it's over there on the right. Breakfast is from seven to ten." }, c: 0, o: [
        { t: "Perfetto, grazie mille.", en: "Perfect, thanks a lot." },
        { t: "No, sono di Londra.", en: "No, I'm from London." },
        { t: "Il museo è chiuso.", en: "The museum is closed." },
      ] },
    ],
  },
  {
    id: "it-d2-medico", lv: 2, title: "Dal medico", titleEn: "At the doctor's",
    turns: [
      { a: { t: "Buongiorno, si accomodi. Che cosa si sente?", en: "Good morning, have a seat. How are you feeling?" }, c: 2, o: [
        { t: "Ieri sono andato al cinema.", en: "Yesterday I went to the cinema." },
        { t: "Mi sento a casa qui in Italia.", en: "I feel at home here in Italy." },
        { t: "Ho mal di gola e un po' di febbre.", en: "I have a sore throat and a bit of a temperature." },
      ] },
      { a: { t: "Da quanto tempo sta male?", en: "How long have you been unwell?" }, c: 0, o: [
        { t: "Da tre giorni.", en: "For three days." },
        { t: "Tra due settimane.", en: "In two weeks." },
        { t: "Alle cinque del pomeriggio.", en: "At five in the afternoon." },
      ] },
      { a: { t: "Ha preso qualche medicina?", en: "Have you taken any medicine?" }, c: 1, o: [
        { t: "Sì, ho preso il treno delle otto.", en: "Yes, I took the eight o'clock train." },
        { t: "Solo un'aspirina ieri sera.", en: "Just an aspirin last night." },
        { t: "No, non mi piace il pesce.", en: "No, I don't like fish." },
      ] },
      { a: { t: "Vediamo la gola... È un po' infiammata. Le scrivo uno sciroppo.", en: "Let's look at your throat... It's a bit inflamed. I'll prescribe you a syrup." }, c: 2, o: [
        { t: "Abito in centro da un anno.", en: "I've lived in the centre for a year." },
        { t: "Il mio colore preferito è il blu.", en: "My favourite colour is blue." },
        { t: "Quante volte al giorno lo devo prendere?", en: "How many times a day should I take it?" },
      ] },
      { a: { t: "Tre volte al giorno, dopo i pasti. E si riposi per qualche giorno.", en: "Three times a day, after meals. And rest for a few days." }, c: 0, o: [
        { t: "Va bene, grazie dottore.", en: "All right, thank you, doctor." },
        { t: "Sì, ho comprato una macchina nuova.", en: "Yes, I bought a new car." },
        { t: "No, non c'è la metropolitana.", en: "No, there's no underground." },
      ] },
    ],
  },
  {
    id: "it-d2-appartamento", lv: 2, title: "Cerco casa", titleEn: "Looking for a flat",
    turns: [
      { a: { t: "Pronto? Agenzia Casa Facile, buongiorno.", en: "Hello? Casa Facile estate agency, good morning." }, c: 1, o: [
        { t: "Buongiorno, ha una camera singola per stanotte?", en: "Good morning, do you have a single room for tonight?" },
        { t: "Buongiorno, chiamo per l'appartamento in via Garibaldi.", en: "Good morning, I'm calling about the flat on Via Garibaldi." },
        { t: "Buongiorno, vorrei un caffè.", en: "Good morning, I'd like a coffee." },
      ] },
      { a: { t: "Sì, è ancora libero. È un bilocale di cinquanta metri quadri.", en: "Yes, it's still available. It's a one-bedroom flat of fifty square metres." }, c: 0, o: [
        { t: "Quanto costa l'affitto al mese?", en: "How much is the rent per month?" },
        { t: "Quanti anni ha suo figlio?", en: "How old is your son?" },
        { t: "A che ora parte il treno?", en: "What time does the train leave?" },
      ] },
      { a: { t: "Seicento euro, spese comprese.", en: "Six hundred euros, bills included." }, c: 2, o: [
        { t: "No, ho già mangiato.", en: "No, I've already eaten." },
        { t: "Sì, ho studiato a Bologna.", en: "Yes, I studied in Bologna." },
        { t: "Va bene. Il palazzo ha l'ascensore?", en: "Fine. Does the building have a lift?" },
      ] },
      { a: { t: "Sì, e c'è anche un piccolo balcone. Vuole vederlo?", en: "Yes, and there's a small balcony too. Would you like to see it?" }, c: 1, o: [
        { t: "No, il balcone è mio.", en: "No, the balcony is mine." },
        { t: "Sì, volentieri. Posso venire domani pomeriggio?", en: "Yes, I'd love to. Can I come tomorrow afternoon?" },
        { t: "Sì, l'ho visto al cinema.", en: "Yes, I saw it at the cinema." },
      ] },
      { a: { t: "Certo. Alle quattro le va bene?", en: "Of course. Does four o'clock suit you?" }, c: 0, o: [
        { t: "Perfetto, a domani allora.", en: "Perfect, see you tomorrow then." },
        { t: "No, sono quattro euro.", en: "No, it's four euros." },
        { t: "Ho quattro sorelle.", en: "I have four sisters." },
      ] },
    ],
  },
  {
    id: "it-d3-ristorante", lv: 3, title: "Una prenotazione al ristorante", titleEn: "A restaurant booking",
    turns: [
      { a: { t: "Trattoria da Mario, buonasera. Mi dica.", en: "Trattoria da Mario, good evening. How can I help?" }, c: 2, o: [
        { t: "Buonasera, vorrei disdire l'abbonamento della palestra.", en: "Good evening, I'd like to cancel my gym membership." },
        { t: "Buonasera, mi hanno rubato la bicicletta.", en: "Good evening, my bike has been stolen." },
        { t: "Buonasera, vorrei prenotare un tavolo per sabato sera.", en: "Good evening, I'd like to book a table for Saturday evening." },
      ] },
      { a: { t: "Per quante persone?", en: "For how many people?" }, c: 0, o: [
        { t: "Saremo in sei, due sono bambini.", en: "There'll be six of us, two of them children." },
        { t: "Siamo partiti alle sei.", en: "We left at six." },
        { t: "Ne ho mangiate sei.", en: "I ate six of them." },
      ] },
      { a: { t: "Alle otto purtroppo siamo al completo. Le andrebbe bene alle nove e mezza?", en: "Unfortunately we're fully booked at eight. Would half past nine suit you?" }, c: 1, o: [
        { t: "Sì, li ho conosciuti alle nove.", en: "Yes, I met them at nine." },
        { t: "È un po' tardi per i bambini. Non c'è niente prima?", en: "It's a bit late for the children. Isn't there anything earlier?" },
        { t: "No, il conto l'ho già pagato.", en: "No, I've already paid the bill." },
      ] },
      { a: { t: "Potrei darle un tavolo alle sette e mezza, ma dovreste liberarlo entro le nove.", en: "I could give you a table at half past seven, but you'd have to leave by nine." }, c: 1, o: [
        { t: "Allora ci vediamo l'anno prossimo.", en: "Then see you next year." },
        { t: "Va benissimo, tanto i bambini vanno a letto presto.", en: "That's fine, the children go to bed early anyway." },
        { t: "Mi dispiace, non parlo il tedesco.", en: "I'm sorry, I don't speak German." },
      ] },
      { a: { t: "Perfetto. A che nome prenoto?", en: "Perfect. What name shall I put the booking under?" }, c: 2, o: [
        { t: "Prendo le lasagne, grazie.", en: "I'll have the lasagne, thanks." },
        { t: "Ci siamo sposati a giugno.", en: "We got married in June." },
        { t: "Rossi. Grazie mille e a sabato!", en: "Rossi. Thanks a lot, see you on Saturday!" },
      ] },
    ],
  },
  {
    id: "it-d3-coincidenza", lv: 3, title: "La coincidenza persa", titleEn: "The missed connection",
    turns: [
      { a: { t: "Prego, il prossimo.", en: "Next, please." }, c: 0, o: [
        { t: "Buongiorno, ho perso la coincidenza per Firenze perché il mio treno era in ritardo.", en: "Good morning, I missed my connection to Florence because my train was late." },
        { t: "Buongiorno, vorrei un chilo di mele.", en: "Good morning, I'd like a kilo of apples." },
        { t: "Buongiorno, ho un appuntamento con il dentista.", en: "Good morning, I have an appointment with the dentist." },
      ] },
      { a: { t: "Mi fa vedere il biglietto, per favore?", en: "Could you show me your ticket, please?" }, c: 2, o: [
        { t: "Sì, l'ho comprato in farmacia.", en: "Yes, I bought it at the pharmacy." },
        { t: "No, non mi piace viaggiare.", en: "No, I don't like travelling." },
        { t: "Certo, eccolo. L'ho comprato online.", en: "Of course, here it is. I bought it online." },
      ] },
      { a: { t: "Va bene. Il prossimo treno per Firenze parte tra quaranta minuti. Posso cambiarle il biglietto senza costi.", en: "All right. The next train to Florence leaves in forty minutes. I can change your ticket at no cost." }, c: 1, o: [
        { t: "Peccato, preferisco il mare.", en: "Too bad, I prefer the seaside." },
        { t: "Meno male! Avrò comunque un posto a sedere?", en: "Thank goodness! Will I still have a seat?" },
        { t: "Allora torno a casa a piedi.", en: "Then I'll walk home." },
      ] },
      { a: { t: "Sì, ma non vicino al finestrino. Le va bene il corridoio?", en: "Yes, but not by the window. Is an aisle seat all right?" }, c: 0, o: [
        { t: "Nessun problema, l'importante è partire.", en: "No problem, the important thing is to leave." },
        { t: "Sì, ho aperto la finestra.", en: "Yes, I opened the window." },
        { t: "No, il corridoio di casa mia è stretto.", en: "No, the hallway in my house is narrow." },
      ] },
      { a: { t: "Ecco il nuovo biglietto. Binario sette, carrozza quattro.", en: "Here's your new ticket. Platform seven, carriage four." }, c: 2, o: [
        { t: "Sette più quattro fa undici.", en: "Seven plus four is eleven." },
        { t: "Ho quattro carrozze in garage.", en: "I have four carriages in the garage." },
        { t: "Grazie, è stato gentilissimo.", en: "Thank you, you've been very kind." },
      ] },
    ],
  },
  {
    id: "it-d4-vicino", lv: 4, title: "Il vicino rumoroso", titleEn: "The noisy neighbour",
    turns: [
      { a: { t: "Sì? Ah, salve. Ha bisogno di qualcosa?", en: "Yes? Oh, hello. Do you need something?" }, c: 1, o: [
        { t: "Salve, ha visto che bel tramonto stasera?", en: "Hello, did you see what a lovely sunset it is tonight?" },
        { t: "Salve, mi scusi se la disturbo. Abito al piano di sotto.", en: "Hello, sorry to bother you. I live on the floor below." },
        { t: "Salve, vorrei ordinare una pizza margherita.", en: "Hello, I'd like to order a margherita pizza." },
      ] },
      { a: { t: "Piacere. C'è qualche problema?", en: "Nice to meet you. Is there a problem?" }, c: 0, o: [
        { t: "Ecco, da qualche settimana sentiamo musica ad alto volume fino a tardi.", en: "Well, for a few weeks now we've been hearing loud music until late." },
        { t: "No, va tutto benissimo, grazie.", en: "No, everything's great, thanks." },
        { t: "Sì, il mio gatto è tornato a casa.", en: "Yes, my cat has come home." },
      ] },
      { a: { t: "Oddio, non me ne ero reso conto. Mio figlio suona la chitarra elettrica.", en: "Oh dear, I hadn't realised. My son plays the electric guitar." }, c: 2, o: [
        { t: "Allora gli regalerò un'altra chitarra.", en: "Then I'll give him another guitar." },
        { t: "Davvero? Anch'io ho un figlio di vent'anni che vive a Londra.", en: "Really? I have a twenty-year-old son who lives in London too." },
        { t: "Capisco, ma la mattina mi alzo alle sei e faccio fatica a dormire.", en: "I understand, but I get up at six in the morning and I'm struggling to sleep." },
      ] },
      { a: { t: "Ha ragione. Che ne dice se gli chiedo di smettere entro le dieci?", en: "You're right. How about I ask him to stop by ten?" }, c: 1, o: [
        { t: "Mi dispiace, alle dieci ho una riunione.", en: "I'm sorry, I have a meeting at ten." },
        { t: "Sarebbe perfetto, la ringrazio per la comprensione.", en: "That would be perfect, thank you for being so understanding." },
        { t: "No, preferisco la musica classica.", en: "No, I prefer classical music." },
      ] },
      { a: { t: "Si figuri. E se dovesse succedere ancora, venga pure a dirmelo.", en: "Not at all. And if it happens again, feel free to come and tell me." }, c: 0, o: [
        { t: "Senz'altro. Buona serata!", en: "Certainly. Have a good evening!" },
        { t: "Purtroppo non so suonare la chitarra.", en: "Unfortunately I can't play the guitar." },
        { t: "Allora ci vediamo in ufficio.", en: "See you at the office, then." },
      ] },
    ],
  },
  {
    id: "it-d4-scadenza", lv: 4, title: "Una scadenza difficile", titleEn: "A tough deadline",
    turns: [
      { a: { t: "Senti, hai un minuto? Il cliente vuole anticipare la consegna a venerdì.", en: "Listen, have you got a minute? The client wants to bring the delivery forward to Friday." }, c: 2, o: [
        { t: "Sì, venerdì vado dal parrucchiere.", en: "Yes, I'm going to the hairdresser's on Friday." },
        { t: "Che bello, adoro le consegne a domicilio.", en: "Great, I love home deliveries." },
        { t: "Venerdì? Ma eravamo d'accordo per la fine del mese!", en: "Friday? But we'd agreed on the end of the month!" },
      ] },
      { a: { t: "Lo so, ma dicono che hanno una presentazione importante la settimana prossima.", en: "I know, but they say they have an important presentation next week." }, c: 0, o: [
        { t: "Capisco, però così rischiamo di consegnare un lavoro fatto male.", en: "I see, but that way we risk delivering a poor piece of work." },
        { t: "Allora andiamo tutti in vacanza.", en: "Then let's all go on holiday." },
        { t: "Non lo so, non ho mai visto una presentazione.", en: "I don't know, I've never seen a presentation." },
      ] },
      { a: { t: "Hai ragione. Secondo te cosa potremmo proporgli?", en: "You're right. What do you think we could suggest to them?" }, c: 1, o: [
        { t: "Proporrei di cambiare ufficio.", en: "I'd suggest changing offices." },
        { t: "Potremmo consegnare venerdì una prima parte e il resto entro metà mese.", en: "We could deliver the first part on Friday and the rest by mid-month." },
        { t: "Gli proporrei di venire a cena da me.", en: "I'd suggest they come to dinner at my place." },
      ] },
      { a: { t: "Mi sembra un buon compromesso. Te la senti di parlarne tu con loro?", en: "That sounds like a good compromise. Do you feel up to talking to them about it yourself?" }, c: 2, o: [
        { t: "No, non mi sento bene, ho mal di testa da ieri.", en: "No, I don't feel well, I've had a headache since yesterday." },
        { t: "Sì, li ho sentiti cantare ieri sera.", en: "Yes, I heard them singing last night." },
        { t: "Certo, li chiamo oggi pomeriggio e ti faccio sapere.", en: "Sure, I'll call them this afternoon and let you know." },
      ] },
      { a: { t: "Grazie, mi togli un bel peso.", en: "Thanks, that's a weight off my mind." },
      c: 0, o: [
        { t: "Figurati, siamo una squadra.", en: "Don't mention it, we're a team." },
        { t: "Davvero? Quanto pesa?", en: "Really? How much does it weigh?" },
        { t: "Mi dispiace, non faccio sport.", en: "Sorry, I don't do sport." },
      ] },
    ],
  },
  {
    id: "it-d5-reclamo", lv: 5, title: "Un reclamo", titleEn: "A complaint",
    turns: [
      { a: { t: "Servizio clienti, sono Federica. In cosa posso esserle utile?", en: "Customer service, this is Federica. How can I help you?" }, c: 1, o: [
        { t: "Salve, vorrei sapere se domani pioverà.", en: "Hello, I'd like to know if it will rain tomorrow." },
        { t: "Salve, ho ricevuto una lavatrice che ha smesso di funzionare dopo appena una settimana.", en: "Hello, I received a washing machine that stopped working after just a week." },
        { t: "Salve, le dispiacerebbe consigliarmi un buon ristorante?", en: "Hello, would you mind recommending a good restaurant?" },
      ] },
      { a: { t: "Mi dispiace molto per l'inconveniente. Potrebbe indicarmi il numero dell'ordine?", en: "I'm very sorry for the inconvenience. Could you give me the order number?" }, c: 0, o: [
        { t: "Certo, è il 48213. L'ho ordinata il tre marzo.", en: "Of course, it's 48213. I ordered it on the third of March." },
        { t: "Purtroppo non ricordo dove ho parcheggiato.", en: "Unfortunately I can't remember where I parked." },
        { t: "Il mio numero preferito è il sette.", en: "My favourite number is seven." },
      ] },
      { a: { t: "Grazie. Ha già provato a staccare la spina e a riavviarla?", en: "Thank you. Have you already tried unplugging it and restarting it?" }, c: 2, o: [
        { t: "Sì, ho staccato per una settimana al mare.", en: "Yes, I took a week off at the seaside." },
        { t: "No, la spina mi serve per la lampada.", en: "No, I need the plug for the lamp." },
        { t: "Più di una volta, ma il display continua a segnalare un errore.", en: "More than once, but the display keeps showing an error." },
      ] },
      { a: { t: "Allora le propongo due soluzioni: un intervento del tecnico o la sostituzione del prodotto.", en: "Then I can offer you two options: a technician's visit or a replacement." }, c: 1, o: [
        { t: "Preferirei che mi spiegasse come si cucina il risotto.", en: "I'd rather you explained to me how to cook risotto." },
        { t: "Visto che è nuova, preferirei la sostituzione, se non le dispiace.", en: "Since it's new, I'd prefer a replacement, if you don't mind." },
        { t: "Nessuna delle due, mi basta un caffè.", en: "Neither, a coffee is enough for me." },
      ] },
      { a: { t: "Nessun problema. Il corriere passerà a ritirarla entro cinque giorni lavorativi e le consegnerà quella nuova.", en: "No problem. The courier will collect it within five working days and deliver the new one." }, c: 0, o: [
        { t: "La ringrazio, è stata molto disponibile.", en: "Thank you, you've been very helpful." },
        { t: "Peccato, speravo di vincere la partita.", en: "Too bad, I was hoping to win the match." },
        { t: "Allora la aspetto all'aeroporto.", en: "Then I'll wait for you at the airport." },
      ] },
    ],
  },
  {
    id: "it-d5-mostra", lv: 5, title: "Dopo la mostra", titleEn: "After the exhibition",
    turns: [
      { a: { t: "Allora, che te n'è parso della mostra?", en: "So, what did you make of the exhibition?" }, c: 2, o: [
        { t: "Mi è parso di vederti al supermercato.", en: "I thought I saw you at the supermarket." },
        { t: "Ho prenotato i biglietti per il concerto.", en: "I've booked the tickets for the concert." },
        { t: "Bella, anche se mi aspettavo qualche opera in più.", en: "Good, although I expected a few more works." },
      ] },
      { a: { t: "Davvero? A me è sembrata fin troppo ricca. Uscendo avevo la testa che girava.", en: "Really? I found it almost too rich. When I came out my head was spinning." }, c: 0, o: [
        { t: "Be', in effetti tre ore di visita non sono poche.", en: "Well, it's true that a three-hour visit is quite a lot." },
        { t: "Dovresti andare dal medico, allora.", en: "You should go to the doctor, then." },
        { t: "Neanch'io so guidare.", en: "I can't drive either." },
      ] },
      { a: { t: "Quale quadro ti ha colpito di più?", en: "Which painting struck you most?" }, c: 1, o: [
        { t: "Nessuno, per fortuna sono caduto sul morbido.", en: "None, luckily I landed on something soft." },
        { t: "Il ritratto della donna alla finestra: aveva uno sguardo che non si dimentica.", en: "The portrait of the woman at the window: she had an unforgettable gaze." },
        { t: "Quello che ho comprato all'IKEA.", en: "The one I bought at IKEA." },
      ] },
      { a: { t: "Vero, l'ho notato anch'io. Peccato che le didascalie fossero così scarne.", en: "True, I noticed it too. Shame the captions were so sparse." }, c: 2, o: [
        { t: "Sì, il cameriere era davvero scortese.", en: "Yes, the waiter was really rude." },
        { t: "Hai ragione, la prossima volta porto l'ombrello.", en: "You're right, next time I'll bring an umbrella." },
        { t: "Infatti avrei preso volentieri l'audioguida, ma era esaurita.", en: "Indeed, I'd gladly have taken the audio guide, but there were none left." },
      ] },
      { a: { t: "Ti va di parlarne davanti a un aperitivo?", en: "Do you fancy talking about it over an aperitivo?" }, c: 0, o: [
        { t: "Ottima idea, conosco un posticino qui dietro.", en: "Great idea, I know a little place just round the corner." },
        { t: "No, l'aperitivo l'ho già visitato.", en: "No, I've already visited the aperitivo." },
        { t: "Mi dispiace, non ho mai studiato storia dell'arte.", en: "Sorry, I've never studied art history." },
      ] },
    ],
  },
  {
    id: "it-d6-compenso", lv: 6, title: "Una trattativa sul compenso", titleEn: "Negotiating a fee",
    turns: [
      { a: { t: "Abbiamo letto con interesse la sua proposta, ma il preventivo supera di parecchio il nostro budget.", en: "We read your proposal with interest, but the quote is well over our budget." }, c: 1, o: [
        { t: "Mi fa piacere, ho sempre amato leggere.", en: "I'm glad, I've always loved reading." },
        { t: "Capisco. Posso chiederle di quale cifra stiamo parlando?", en: "I understand. May I ask what figure we're talking about?" },
        { t: "Allora le consiglio un buon libro di ricette.", en: "Then I'd recommend a good recipe book." },
      ] },
      { a: { t: "Diciamo che non potremmo spingerci oltre i quattromila euro.", en: "Let's say we couldn't go beyond four thousand euros." }, c: 2, o: [
        { t: "Non si spinga, c'è posto per tutti.", en: "Don't push, there's room for everyone." },
        { t: "Ottimo, allora le faccio uno sconto sul caffè.", en: "Excellent, then I'll give you a discount on the coffee." },
        { t: "Per quella cifra dovrei rinunciare alla parte di analisi, che però ritengo fondamentale.", en: "For that figure I'd have to drop the analysis part, which I consider essential, though." },
      ] },
      { a: { t: "Ci rendiamo conto. Sarebbe disposto a dilazionare il pagamento su due esercizi?", en: "We realise that. Would you be willing to spread the payment over two financial years?" }, c: 0, o: [
        { t: "Potrei valutarlo, a patto che il compenso complessivo resti invariato.", en: "I could consider it, provided the total fee stays the same." },
        { t: "Purtroppo non faccio esercizio fisico da anni.", en: "Unfortunately I haven't exercised in years." },
        { t: "Sì, ma solo se piove.", en: "Yes, but only if it rains." },
      ] },
      { a: { t: "Mi sembra ragionevole. Dovrei però sottoporre la questione al consiglio di amministrazione.", en: "That seems reasonable. I'd have to put the matter to the board, though." }, c: 1, o: [
        { t: "Allora mi siedo, grazie.", en: "Then I'll sit down, thanks." },
        { t: "Ci mancherebbe. Le invio entro domani una proposta aggiornata, così avrete tutto nero su bianco.", en: "Of course. I'll send you an updated proposal by tomorrow, so you'll have everything in black and white." },
        { t: "Non si preoccupi, il consiglio lo do io.", en: "Don't worry, I'll give the advice myself." },
      ] },
      { a: { t: "Perfetto. Contiamo di darle una risposta entro fine mese.", en: "Perfect. We expect to give you an answer by the end of the month." }, c: 2, o: [
        { t: "Non c'è bisogno di contare, mi fido.", en: "No need to count, I trust you." },
        { t: "A fine mese vado in ferie al mare.", en: "At the end of the month I'm going on holiday to the seaside." },
        { t: "Resto in attesa, allora. È stato un piacere confrontarci.", en: "I'll await your reply, then. It's been a pleasure discussing this." },
      ] },
    ],
  },
  {
    id: "it-d6-romanzo", lv: 6, title: "Il finale del romanzo", titleEn: "The novel's ending",
    turns: [
      { a: { t: "L'hai finito, poi, quel romanzo che ti avevo prestato?", en: "Did you finish that novel I lent you, in the end?" }, c: 0, o: [
        { t: "Sì, l'ho divorato in un weekend, anche se il finale mi ha lasciato con l'amaro in bocca.", en: "Yes, I devoured it in a weekend, though the ending left a bitter taste in my mouth." },
        { t: "No, non mi hai mai prestato soldi.", en: "No, you've never lent me any money." },
        { t: "Sì, ho finito il latte stamattina.", en: "Yes, I finished the milk this morning." },
      ] },
      { a: { t: "Davvero? A me è sembrato l'unico finale possibile, per quanto amaro.", en: "Really? To me it seemed the only possible ending, however bitter." }, c: 2, o: [
        { t: "Prova ad aggiungere un po' di zucchero.", en: "Try adding a bit of sugar." },
        { t: "Possibile che tu non abbia mai visto il mare?", en: "Is it possible you've never seen the sea?" },
        { t: "Sarà, ma ho avuto l'impressione che l'autore avesse fretta di chiudere la storia.", en: "Maybe, but I got the impression the author was in a hurry to wrap up the story." },
      ] },
      { a: { t: "In che senso? Tutti i nodi vengono al pettine, mi pare.", en: "In what sense? Everything comes out in the end, it seems to me." }, c: 1, o: [
        { t: "Sì, dovrei proprio andare dal parrucchiere.", en: "Yes, I really should go to the hairdresser's." },
        { t: "Sì, ma la riconciliazione tra i due fratelli arriva di punto in bianco, senza alcuna preparazione.", en: "Yes, but the reconciliation between the two brothers comes out of the blue, without any build-up." },
        { t: "Mi pare che domani sia sabato.", en: "I think tomorrow is Saturday." },
      ] },
      { a: { t: "Non sono d'accordo: secondo me è proprio il silenzio dei capitoli precedenti a prepararla.", en: "I don't agree: in my view it's precisely the silence of the earlier chapters that prepares it." }, c: 0, o: [
        { t: "Può darsi, non l'avevo vista sotto questa luce. Forse dovrei rileggerlo con più calma.", en: "Maybe, I hadn't seen it in that light. Perhaps I should reread it more calmly." },
        { t: "Allora accendiamo la luce, così vediamo meglio.", en: "Then let's turn on the light, so we can see better." },
        { t: "Hai ragione, in biblioteca bisogna stare in silenzio.", en: "You're right, you have to be quiet in the library." },
      ] },
      { a: { t: "Fallo pure. E poi ne riparliamo davanti a un bicchiere di vino.", en: "Go ahead. And then we'll talk about it again over a glass of wine." }, c: 2, o: [
        { t: "Non posso, il vino l'ho già letto.", en: "I can't, I've already read the wine." },
        { t: "D'accordo, ma riparliamo prima del meteo.", en: "Fine, but let's talk about the weather first." },
        { t: "Affare fatto, ma stavolta il vino lo porto io.", en: "Deal, but this time I'm bringing the wine." },
      ] },
    ],
  },
];

export default data;
