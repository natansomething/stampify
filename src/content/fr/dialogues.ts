import type { Dialogue } from '../types';

const data: Dialogue[] = [
  {
    id: "fr-d1-cafe", lv: 1, title: "Au café", titleEn: "At the café",
    turns: [
      { a: { t: "Bonjour ! Qu'est-ce que vous prenez ?", en: "Hello! What will you have?" }, c: 0, o: [
        { t: "Un café, s'il vous plaît.", en: "A coffee, please." },
        { t: "J'habite à Lille.", en: "I live in Lille." },
        { t: "Il est huit heures.", en: "It's eight o'clock." },
      ] },
      { a: { t: "Un petit ou un grand ?", en: "A small one or a large one?" }, c: 2, o: [
        { t: "Oui, je suis français.", en: "Yes, I'm French." },
        { t: "Ma sœur s'appelle Léa.", en: "My sister's name is Léa." },
        { t: "Un grand, merci.", en: "A large one, thanks." },
      ] },
      { a: { t: "Vous voulez aussi un croissant ?", en: "Would you also like a croissant?" }, c: 1, o: [
        { t: "Non, je n'ai pas de voiture.", en: "No, I don't have a car." },
        { t: "Oui, avec plaisir.", en: "Yes, I'd love one." },
        { t: "Il fait beau aujourd'hui.", en: "The weather is nice today." },
      ] },
      { a: { t: "Sur place ou à emporter ?", en: "To have here or to take away?" }, c: 0, o: [
        { t: "Sur place.", en: "To have here." },
        { t: "À demain !", en: "See you tomorrow!" },
        { t: "J'ai trente ans.", en: "I'm thirty." },
      ] },
      { a: { t: "Ça fait trois euros cinquante.", en: "That's three euros fifty." }, c: 2, o: [
        { t: "Je suis professeur.", en: "I'm a teacher." },
        { t: "C'est loin ?", en: "Is it far?" },
        { t: "Voilà. Je peux payer par carte ?", en: "Here you are. Can I pay by card?" },
      ] },
    ],
  },
  {
    id: "fr-d1-rencontre", lv: 1, title: "Une nouvelle voisine", titleEn: "A new neighbour",
    turns: [
      { a: { t: "Bonjour ! Je suis votre nouvelle voisine.", en: "Hello! I'm your new neighbour." }, c: 1, o: [
        { t: "Un thé, s'il vous plaît.", en: "A tea, please." },
        { t: "Bonjour ! Bienvenue !", en: "Hello! Welcome!" },
        { t: "Il est midi.", en: "It's noon." },
      ] },
      { a: { t: "Je m'appelle Anna. Et vous ?", en: "My name is Anna. And you?" }, c: 0, o: [
        { t: "Moi, c'est Thomas.", en: "I'm Thomas." },
        { t: "J'aime le chocolat.", en: "I like chocolate." },
        { t: "C'est à droite.", en: "It's on the right." },
      ] },
      { a: { t: "Vous habitez ici depuis longtemps ?", en: "Have you lived here long?" }, c: 2, o: [
        { t: "Non, merci.", en: "No, thanks." },
        { t: "Je vais bien, et vous ?", en: "I'm fine, and you?" },
        { t: "Oui, depuis cinq ans.", en: "Yes, for five years." },
      ] },
      { a: { t: "Vous travaillez dans le quartier ?", en: "Do you work in the area?" }, c: 1, o: [
        { t: "J'ai deux chats.", en: "I have two cats." },
        { t: "Oui, je travaille à la poste.", en: "Yes, I work at the post office." },
        { t: "C'est trois euros.", en: "It's three euros." },
      ] },
      { a: { t: "Super ! Bon, à bientôt !", en: "Great! Well, see you soon!" }, c: 2, o: [
        { t: "Oui, un grand café.", en: "Yes, a large coffee." },
        { t: "Je ne sais pas nager.", en: "I can't swim." },
        { t: "À bientôt, Anna !", en: "See you soon, Anna!" },
      ] },
    ],
  },
  {
    id: "fr-d2-pharmacie", lv: 2, title: "À la pharmacie", titleEn: "At the pharmacy",
    turns: [
      { a: { t: "Bonjour, je peux vous aider ?", en: "Hello, can I help you?" }, c: 0, o: [
        { t: "Oui, j'ai mal à la gorge depuis hier.", en: "Yes, I've had a sore throat since yesterday." },
        { t: "Oui, je cherche la gare.", en: "Yes, I'm looking for the station." },
        { t: "Non, je n'aime pas le poisson.", en: "No, I don't like fish." },
      ] },
      { a: { t: "Vous avez de la fièvre ?", en: "Do you have a temperature?" }, c: 1, o: [
        { t: "J'ai réservé une chambre.", en: "I've booked a room." },
        { t: "Non, je ne crois pas.", en: "No, I don't think so." },
        { t: "Elle est partie ce matin.", en: "She left this morning." },
      ] },
      { a: { t: "Je vous conseille ces pastilles. Vous en prenez une toutes les trois heures.", en: "I recommend these lozenges. Take one every three hours." }, c: 2, o: [
        { t: "Je préfère la mer.", en: "I prefer the sea." },
        { t: "Mon train part à midi.", en: "My train leaves at noon." },
        { t: "D'accord. Je peux en prendre le soir aussi ?", en: "OK. Can I take them in the evening too?" },
      ] },
      { a: { t: "Oui, mais pas plus de six par jour.", en: "Yes, but no more than six a day." }, c: 0, o: [
        { t: "Très bien, merci. C'est combien ?", en: "Very good, thank you. How much is it?" },
        { t: "Il y a six chambres.", en: "There are six rooms." },
        { t: "Je suis né en juin.", en: "I was born in June." },
      ] },
      { a: { t: "Six euros quarante. Si ça ne va pas mieux dans trois jours, allez voir un médecin.", en: "Six euros forty. If you're not better in three days, go and see a doctor." }, c: 1, o: [
        { t: "Je vais au cinéma ce soir.", en: "I'm going to the cinema tonight." },
        { t: "Entendu, merci beaucoup. Au revoir !", en: "Understood, thank you very much. Goodbye!" },
        { t: "Oui, j'ai trois enfants.", en: "Yes, I have three children." },
      ] },
    ],
  },
  {
    id: "fr-d2-gare", lv: 2, title: "À la gare", titleEn: "At the station",
    turns: [
      { a: { t: "Bonjour, madame. Qu'est-ce que je peux faire pour vous ?", en: "Hello, madam. What can I do for you?" }, c: 1, o: [
        { t: "Je voudrais un café crème.", en: "I'd like a white coffee." },
        { t: "Je voudrais un billet pour Bordeaux, s'il vous plaît.", en: "I'd like a ticket to Bordeaux, please." },
        { t: "J'ai perdu mon chien.", en: "I've lost my dog." },
      ] },
      { a: { t: "Pour aujourd'hui ?", en: "For today?" }, c: 0, o: [
        { t: "Non, pour samedi matin.", en: "No, for Saturday morning." },
        { t: "Oui, il fait chaud.", en: "Yes, it's hot." },
        { t: "Non, je suis célibataire.", en: "No, I'm single." },
      ] },
      { a: { t: "Il y a un train à 8 h 15 et un autre à 10 h 40.", en: "There's a train at 8:15 and another at 10:40." }, c: 2, o: [
        { t: "Je les ai achetés hier.", en: "I bought them yesterday." },
        { t: "C'est ma première fois à Paris.", en: "It's my first time in Paris." },
        { t: "Celui de 10 h 40, c'est parfait.", en: "The 10:40 one is perfect." },
      ] },
      { a: { t: "Un aller simple ou un aller-retour ?", en: "Single or return?" }, c: 1, o: [
        { t: "Deux kilos, s'il vous plaît.", en: "Two kilos, please." },
        { t: "Un aller-retour. Je rentre dimanche soir.", en: "A return. I'm coming back on Sunday evening." },
        { t: "Je travaille dans une banque.", en: "I work in a bank." },
      ] },
      { a: { t: "Ça fait quatre-vingt-deux euros. Vous avez une carte de réduction ?", en: "That's eighty-two euros. Do you have a discount card?" }, c: 0, o: [
        { t: "Non, malheureusement.", en: "No, unfortunately." },
        { t: "Oui, c'est au deuxième étage.", en: "Yes, it's on the second floor." },
        { t: "Non, je préfère le thé.", en: "No, I prefer tea." },
      ] },
    ],
  },
  {
    id: "fr-d3-appartement", lv: 3, title: "Visite d'un appartement", titleEn: "Viewing a flat",
    turns: [
      { a: { t: "Bonjour, vous venez pour la visite de l'appartement ?", en: "Hello, are you here to view the flat?" }, c: 0, o: [
        { t: "Oui, c'est moi qui vous ai appelé hier.", en: "Yes, I'm the one who called you yesterday." },
        { t: "Non, je l'ai déjà vendu l'année dernière.", en: "No, I already sold it last year." },
        { t: "Oui, je prendrai le menu du jour.", en: "Yes, I'll have the set menu." },
      ] },
      { a: { t: "Voilà le salon. Il est très lumineux, il donne plein sud.", en: "Here's the living room. It's very bright, it faces due south." }, c: 1, o: [
        { t: "Je ne savais pas que vous aviez un frère.", en: "I didn't know you had a brother." },
        { t: "C'est vrai, il y a beaucoup de soleil. Le chauffage est compris dans le loyer ?", en: "That's true, there's a lot of sun. Is heating included in the rent?" },
        { t: "Il a plu toute la semaine dernière.", en: "It rained all last week." },
      ] },
      { a: { t: "Non, il faut compter environ cinquante euros de charges par mois.", en: "No, you should allow about fifty euros a month in service charges." }, c: 2, o: [
        { t: "Je vais réfléchir au dessert.", en: "I'll think about the dessert." },
        { t: "Je suis désolé, je suis en retard.", en: "I'm sorry, I'm late." },
        { t: "D'accord. Et l'appartement est disponible à partir de quand ?", en: "OK. And from when is the flat available?" },
      ] },
      { a: { t: "À partir du premier du mois prochain.", en: "From the first of next month." }, c: 0, o: [
        { t: "Ça tombe bien, mon bail actuel se termine fin mars.", en: "That works out well, my current lease ends at the end of March." },
        { t: "J'ai oublié mon parapluie dans le train.", en: "I left my umbrella on the train." },
        { t: "Je n'ai jamais vu ce film.", en: "I've never seen that film." },
      ] },
      { a: { t: "Si l'appartement vous intéresse, il faudra m'envoyer votre dossier.", en: "If you're interested in the flat, you'll need to send me your application." }, c: 2, o: [
        { t: "Merci, mais je ne bois pas d'alcool.", en: "Thanks, but I don't drink alcohol." },
        { t: "Non, la pharmacie est fermée le dimanche.", en: "No, the pharmacy is closed on Sundays." },
        { t: "Je vous l'envoie ce soir par e-mail.", en: "I'll send it to you by email tonight." },
      ] },
    ],
  },
  {
    id: "fr-d3-medecin", lv: 3, title: "Chez le médecin", titleEn: "At the doctor's",
    turns: [
      { a: { t: "Bonjour, asseyez-vous. Qu'est-ce qui vous amène ?", en: "Hello, have a seat. What brings you here?" }, c: 1, o: [
        { t: "Je suis venu en voiture.", en: "I came by car." },
        { t: "Je tousse beaucoup depuis une semaine et je suis très fatigué.", en: "I've been coughing a lot for a week and I'm very tired." },
        { t: "J'aimerais changer d'opérateur.", en: "I'd like to change provider." },
      ] },
      { a: { t: "Vous avez eu de la fièvre ?", en: "Have you had a temperature?" }, c: 0, o: [
        { t: "Un peu, les deux premiers jours, mais plus maintenant.", en: "A bit, the first two days, but not any more." },
        { t: "Oui, je l'ai achetée en solde.", en: "Yes, I bought it in the sales." },
        { t: "Non, je préfère la montagne.", en: "No, I prefer the mountains." },
      ] },
      { a: { t: "Je vais vous examiner. Respirez profondément… Voilà. Vous fumez ?", en: "I'm going to examine you. Breathe deeply... There. Do you smoke?" }, c: 1, o: [
        { t: "Oui, deux sucres, s'il vous plaît.", en: "Yes, two sugars, please." },
        { t: "Non, j'ai arrêté il y a trois ans.", en: "No, I stopped three years ago." },
        { t: "Non, je n'ai pas encore réservé.", en: "No, I haven't booked yet." },
      ] },
      { a: { t: "Ce n'est rien de grave, c'est une bronchite. Je vous prescris un sirop et du repos.", en: "It's nothing serious, it's bronchitis. I'm prescribing a syrup and rest." }, c: 2, o: [
        { t: "Tant pis, je reviendrai demain.", en: "Never mind, I'll come back tomorrow." },
        { t: "C'est gentil, mais j'ai déjà mangé.", en: "That's kind, but I've already eaten." },
        { t: "Est-ce que je peux aller travailler ?", en: "Can I go to work?" },
      ] },
      { a: { t: "Je préfère que vous restiez chez vous jusqu'à vendredi. Je vous fais un arrêt de travail.", en: "I'd rather you stayed at home until Friday. I'll write you a sick note." }, c: 0, o: [
        { t: "Merci, docteur. Je dois revenir vous voir ?", en: "Thank you, doctor. Do I need to come back and see you?" },
        { t: "Bonne idée, on se retrouve devant le cinéma.", en: "Good idea, let's meet outside the cinema." },
        { t: "Désolé, je ne parle pas allemand.", en: "Sorry, I don't speak German." },
      ] },
    ],
  },
  {
    id: "fr-d4-livraison", lv: 4, title: "Un colis qui n'arrive pas", titleEn: "A parcel that doesn't arrive",
    turns: [
      { a: { t: "Service client, bonjour. Que puis-je faire pour vous ?", en: "Customer service, hello. What can I do for you?" }, c: 1, o: [
        { t: "Je souhaiterais réserver une table pour quatre personnes.", en: "I'd like to book a table for four." },
        { t: "J'ai commandé un aspirateur il y a deux semaines et je ne l'ai toujours pas reçu.", en: "I ordered a vacuum cleaner two weeks ago and I still haven't received it." },
        { t: "Je viens de déménager et tout se passe bien.", en: "I've just moved and everything is going well." },
      ] },
      { a: { t: "Pourriez-vous me donner votre numéro de commande ?", en: "Could you give me your order number?" }, c: 2, o: [
        { t: "Je n'en ai aucune idée, je ne l'ai jamais rencontré.", en: "I have no idea, I've never met him." },
        { t: "Il est rare qu'il fasse aussi chaud en mai.", en: "It's rare for it to be this hot in May." },
        { t: "Oui, bien sûr : c'est le 48 213.", en: "Yes, of course: it's 48213." },
      ] },
      { a: { t: "D'après notre système, le colis a été livré mardi dernier.", en: "According to our system, the parcel was delivered last Tuesday." }, c: 0, o: [
        { t: "C'est impossible, j'étais chez moi toute la journée et personne n'a sonné.", en: "That's impossible, I was at home all day and nobody rang the bell." },
        { t: "Tant mieux, je n'en avais plus besoin depuis longtemps.", en: "Good, I hadn't needed it for a long time." },
        { t: "Dans ce cas, je prendrai plutôt le poisson.", en: "In that case, I'll have the fish instead." },
      ] },
      { a: { t: "Je suis désolée pour ce désagrément. Je vais ouvrir une enquête auprès du transporteur.", en: "I'm sorry for the inconvenience. I'll open an investigation with the carrier." }, c: 1, o: [
        { t: "Je vous remercie, mais je préfère la version en couleur.", en: "Thank you, but I prefer the colour version." },
        { t: "Et combien de temps cela va-t-il prendre ?", en: "And how long will that take?" },
        { t: "Ne vous inquiétez pas, je l'ai déjà repeint.", en: "Don't worry, I've already repainted it." },
      ] },
      { a: { t: "Comptez cinq jours ouvrés. Si le colis n'est pas retrouvé, vous serez remboursé intégralement.", en: "Allow five working days. If the parcel isn't found, you'll get a full refund." }, c: 1, o: [
        { t: "Ce serait dommage de rater le début du film.", en: "It would be a shame to miss the start of the film." },
        { t: "Très bien, j'attends donc de vos nouvelles. Merci.", en: "All right, I'll wait to hear from you then. Thank you." },
        { t: "Félicitations, c'est une excellente nouvelle !", en: "Congratulations, that's excellent news!" },
      ] },
    ],
  },
  {
    id: "fr-d4-projet", lv: 4, title: "Un projet en retard", titleEn: "A project running late",
    turns: [
      { a: { t: "Tu as vu le message de la cliente ? Elle veut avancer la présentation à jeudi.", en: "Did you see the client's message? She wants to bring the presentation forward to Thursday." }, c: 2, o: [
        { t: "Oui, je l'ai rangé dans le placard de l'entrée.", en: "Yes, I put it away in the hall cupboard." },
        { t: "Non, je n'ai jamais été à Lyon.", en: "No, I've never been to Lyon." },
        { t: "Jeudi ? Mais on n'aura jamais fini d'ici là !", en: "Thursday? But we'll never be finished by then!" },
      ] },
      { a: { t: "Je sais, mais elle a un rendez-vous important vendredi et elle tient à voir le projet avant.", en: "I know, but she has an important meeting on Friday and she's keen to see the project before that." }, c: 0, o: [
        { t: "Bon. Dans ce cas, il faudrait se répartir le travail autrement.", en: "Right. In that case, we'd need to divide up the work differently." },
        { t: "Tant mieux, j'avais justement envie de partir en vacances.", en: "Good, I was just wanting to go on holiday." },
        { t: "C'est vrai qu'il fait plus frais le soir.", en: "It's true that it's cooler in the evenings." },
      ] },
      { a: { t: "Tu pourrais t'occuper des graphiques pendant que je finis le texte ?", en: "Could you take care of the charts while I finish the text?" }, c: 1, o: [
        { t: "Désolé, je ne mange jamais de viande le soir.", en: "Sorry, I never eat meat in the evening." },
        { t: "D'accord, mais il me manque encore les chiffres du dernier trimestre.", en: "OK, but I still don't have the figures for the last quarter." },
        { t: "Oui, elle a eu un garçon la semaine dernière.", en: "Yes, she had a boy last week." },
      ] },
      { a: { t: "Je demande à Karim de te les envoyer ce matin.", en: "I'll ask Karim to send them to you this morning." }, c: 2, o: [
        { t: "À condition qu'il ne pleuve pas, bien sûr.", en: "As long as it doesn't rain, of course." },
        { t: "Je les ai laissées chez mes parents.", en: "I left them at my parents' place." },
        { t: "Parfait. Si je les ai avant midi, tout sera prêt mercredi soir.", en: "Perfect. If I get them before noon, everything will be ready by Wednesday evening." },
      ] },
      { a: { t: "Super. On fait un dernier point mercredi à 17 heures ?", en: "Great. Shall we have a final check-in on Wednesday at 5 pm?" }, c: 0, o: [
        { t: "Ça marche, je bloque le créneau dans l'agenda.", en: "Sounds good, I'll block out the slot in the calendar." },
        { t: "Non merci, je ne prends jamais de sucre.", en: "No thanks, I never take sugar." },
        { t: "Je crois qu'il a déménagé en Bretagne.", en: "I think he moved to Brittany." },
      ] },
    ],
  },
  {
    id: "fr-d5-augmentation", lv: 5, title: "Demander une augmentation", titleEn: "Asking for a pay rise",
    turns: [
      { a: { t: "Entrez, je vous en prie. Vous vouliez me voir ?", en: "Come in, please. You wanted to see me?" }, c: 0, o: [
        { t: "Oui, merci de me recevoir. J'aimerais vous parler de ma rémunération.", en: "Yes, thank you for seeing me. I'd like to talk to you about my salary." },
        { t: "Oui, mais je crains que le train ne soit déjà parti.", en: "Yes, but I'm afraid the train has already left." },
        { t: "Non, je l'ai trouvé un peu long, pour être honnête.", en: "No, I found it a bit long, to be honest." },
      ] },
      { a: { t: "Je vous écoute. Qu'est-ce qui motive votre demande ?", en: "I'm listening. What's behind your request?" }, c: 1, o: [
        { t: "Il paraît que le restaurant d'en face a changé de propriétaire.", en: "Apparently the restaurant opposite has changed owners." },
        { t: "Depuis un an, j'ai pris en charge deux clients importants, sans que mon salaire ait évolué.", en: "For a year now, I've been handling two major clients, without my salary changing." },
        { t: "Je n'en sais rien, je n'étais pas là ce jour-là.", en: "I have no idea, I wasn't there that day." },
      ] },
      { a: { t: "C'est vrai que votre travail est très apprécié. Mais le budget de cette année est déjà bouclé.", en: "It's true that your work is highly valued. But this year's budget has already been finalised." }, c: 1, o: [
        { t: "Dans ce cas, je reprendrai volontiers un peu de gâteau.", en: "In that case, I'll gladly have a little more cake." },
        { t: "Je le comprends. Serait-il possible d'en reparler lors de la préparation du budget suivant ?", en: "I understand. Could we discuss it again when next year's budget is being prepared?" },
        { t: "Peu importe, je l'ai déjà lu deux fois.", en: "It doesn't matter, I've already read it twice." },
      ] },
      { a: { t: "Tout à fait. Et en attendant, une prime exceptionnelle pourrait être envisagée.", en: "Absolutely. And in the meantime, a one-off bonus could be considered." }, c: 2, o: [
        { t: "Je préférerais qu'on évite les autoroutes cette fois-ci.", en: "I'd rather we avoided the motorways this time." },
        { t: "C'est dommage, la vue était magnifique.", en: "It's a shame, the view was magnificent." },
        { t: "Ce serait un geste apprécié. Pourrions-nous également fixer un objectif chiffré pour l'an prochain ?", en: "That would be an appreciated gesture. Could we also set a measurable target for next year?" },
      ] },
      { a: { t: "Bonne idée. Préparez-moi une proposition et nous en discuterons la semaine prochaine.", en: "Good idea. Prepare a proposal for me and we'll discuss it next week." }, c: 0, o: [
        { t: "Très bien, je vous l'envoie d'ici vendredi. Merci pour votre écoute.", en: "Very well, I'll send it to you by Friday. Thank you for listening." },
        { t: "Volontiers, à condition que ce ne soit pas trop épicé.", en: "Gladly, as long as it isn't too spicy." },
        { t: "Il aurait mieux valu partir plus tôt, effectivement.", en: "It would indeed have been better to leave earlier." },
      ] },
    ],
  },
  {
    id: "fr-d5-voisin", lv: 5, title: "Un voisin bruyant", titleEn: "A noisy neighbour",
    turns: [
      { a: { t: "Bonsoir… Excusez-moi de vous déranger à cette heure-ci.", en: "Good evening... Sorry to bother you at this time." }, c: 1, o: [
        { t: "Pas de souci, je vous rends votre perceuse demain.", en: "No problem, I'll return your drill tomorrow." },
        { t: "Bonsoir. Il y a un problème ?", en: "Good evening. Is there a problem?" },
        { t: "Avec plaisir, j'arrive dans cinq minutes.", en: "With pleasure, I'll be there in five minutes." },
      ] },
      { a: { t: "Eh bien, c'est-à-dire que la musique s'entend beaucoup chez moi, et je me lève à cinq heures demain.", en: "Well, the thing is, I can hear the music a lot in my flat, and I'm getting up at five tomorrow." }, c: 0, o: [
        { t: "Oh, je suis vraiment désolé, je ne me rendais pas compte que ça portait autant.", en: "Oh, I'm really sorry, I didn't realise it carried so much." },
        { t: "Tant mieux, j'avais peur que vous ne l'aimiez pas.", en: "Good, I was afraid you wouldn't like it." },
        { t: "Vous avez raison, il faudrait repeindre la cage d'escalier.", en: "You're right, the stairwell needs repainting." },
      ] },
      { a: { t: "Ce n'est pas la première fois, vous savez. Le week-end dernier aussi, c'était assez fort.", en: "It's not the first time, you know. Last weekend it was quite loud too." }, c: 1, o: [
        { t: "Ça ne m'étonne pas, il est toujours en retard.", en: "That doesn't surprise me, he's always late." },
        { t: "Vous auriez dû venir me le dire. J'ai fêté mon anniversaire, mais je n'imaginais pas vous gêner.", en: "You should have come and told me. I was celebrating my birthday, but I didn't think I was disturbing you." },
        { t: "Je vous conseille plutôt le menu dégustation.", en: "I'd recommend the tasting menu instead." },
      ] },
      { a: { t: "Je n'ai pas osé, je ne voulais pas jouer les rabat-joie.", en: "I didn't dare, I didn't want to be a killjoy." }, c: 1, o: [
        { t: "C'est gentil, mais je préfère y aller à pied.", en: "That's kind, but I'd rather walk there." },
        { t: "Au contraire, n'hésitez surtout pas. Je baisse le son tout de suite.", en: "On the contrary, please don't hesitate. I'll turn the volume down right away." },
        { t: "Dans ce cas, prenez plutôt la ligne 4.", en: "In that case, take line 4 instead." },
      ] },
      { a: { t: "Merci, c'est très aimable. Et bonne fin de soirée !", en: "Thank you, that's very kind. Have a good rest of the evening!" }, c: 2, o: [
        { t: "Je vous en prie, gardez la monnaie.", en: "You're welcome, keep the change." },
        { t: "Bon appétit, et à la semaine prochaine !", en: "Enjoy your meal, and see you next week!" },
        { t: "Merci à vous, et bonne nuit. Désolé encore !", en: "Thank you, and good night. Sorry again!" },
      ] },
    ],
  },
  {
    id: "fr-d6-roman", lv: 6, title: "Un roman qui divise", titleEn: "A divisive novel",
    turns: [
      { a: { t: "Alors, tu as fini le roman que je t'ai prêté ? Qu'est-ce que tu en as pensé ?", en: "So, did you finish the novel I lent you? What did you think of it?" }, c: 1, o: [
        { t: "Je l'ai rendu à la bibliothèque, ils ne l'avaient pas en stock.", en: "I took it back to the library, they didn't have it in stock." },
        { t: "Je l'ai terminé hier soir. J'avoue que je suis partagé.", en: "I finished it last night. I have to say I'm in two minds." },
        { t: "Je l'aurais volontiers accompagné, mais j'étais souffrant.", en: "I'd gladly have gone with him, but I was unwell." },
      ] },
      { a: { t: "Ah bon ? Moi qui pensais que tu l'adorerais ! Qu'est-ce qui t'a gêné ?", en: "Really? And I thought you'd love it! What bothered you?" }, c: 0, o: [
        { t: "L'écriture est somptueuse, mais l'intrigue s'essouffle dès la moitié du livre.", en: "The writing is sumptuous, but the plot runs out of steam halfway through the book." },
        { t: "La couverture, sans doute : elle était un peu abîmée.", en: "The cover, probably: it was a bit damaged." },
        { t: "C'est que je n'ai pas eu le temps de passer à la banque.", en: "It's just that I didn't have time to go to the bank." },
      ] },
      { a: { t: "C'est voulu, à mon avis. L'auteur cherche à nous faire éprouver l'ennui du personnage.", en: "That's deliberate, in my view. The author is trying to make us feel the character's boredom." }, c: 1, o: [
        { t: "Tu as raison, il vaut mieux réserver à l'avance en été.", en: "You're right, it's better to book ahead in summer." },
        { t: "Peut-être, mais faire ressentir l'ennui sans ennuyer le lecteur, c'est tout un art.", en: "Maybe, but conveying boredom without boring the reader is quite an art." },
        { t: "Il n'empêche qu'il aurait fallu prévenir le syndic.", en: "All the same, the building manager should have been informed." },
      ] },
      { a: { t: "Je te l'accorde. Et la fin, qu'en as-tu pensé ?", en: "I'll grant you that. And the ending, what did you think of it?" }, c: 1, o: [
        { t: "Je finis à dix-huit heures, on peut se voir après.", en: "I finish at six, we can meet afterwards." },
        { t: "C'est ce que j'ai préféré : elle éclaire tout le reste d'un jour nouveau.", en: "That's what I liked best: it sheds new light on everything that came before." },
        { t: "Elle est partie s'installer à Montréal l'an dernier.", en: "She went off to settle in Montreal last year." },
      ] },
      { a: { t: "Tu vois ! Rien que pour ça, il valait la peine d'être lu jusqu'au bout.", en: "You see! For that alone, it was worth reading to the end." }, c: 2, o: [
        { t: "Certes, mais la peinture n'était pas encore sèche.", en: "True, but the paint wasn't dry yet." },
        { t: "Sans doute, à condition de ne pas oublier les clés.", en: "No doubt, as long as we don't forget the keys." },
        { t: "Soit, tu marques un point. Mais je maintiens que cent pages de moins ne lui auraient pas nui.", en: "Fine, you've got a point. But I still think a hundred pages fewer wouldn't have hurt it." },
      ] },
    ],
  },
  {
    id: "fr-d6-conference", lv: 6, title: "Questions après une conférence", titleEn: "Questions after a talk",
    turns: [
      { a: { t: "Merci pour votre attention. Je crois que nous avons quelques minutes pour les questions.", en: "Thank you for your attention. I think we have a few minutes for questions." }, c: 0, o: [
        { t: "Merci pour cet exposé passionnant. Vous avez évoqué le retour du loup dans les Alpes : pourriez-vous préciser ?", en: "Thank you for that fascinating talk. You mentioned the return of the wolf to the Alps: could you say more?" },
        { t: "Merci, mais je crains de ne pas pouvoir rester dîner.", en: "Thank you, but I'm afraid I can't stay for dinner." },
        { t: "Je vous saurais gré de bien vouloir fermer la fenêtre.", en: "I would be grateful if you could close the window." },
      ] },
      { a: { t: "Bien sûr. Le loup est revenu naturellement d'Italie au début des années quatre-vingt-dix, sans aucune réintroduction.", en: "Of course. The wolf came back naturally from Italy in the early nineties, without any reintroduction." }, c: 2, o: [
        { t: "Il eût été préférable de prendre l'autoroute, en effet.", en: "It would indeed have been preferable to take the motorway." },
        { t: "C'est bien dommage, j'aurais aimé goûter ce vin.", en: "That's a pity, I would have liked to taste that wine." },
        { t: "Justement, comment expliquez-vous qu'il se soit implanté aussi rapidement ?", en: "Precisely, how do you explain that it became established so quickly?" },
      ] },
      { a: { t: "Plusieurs facteurs y ont contribué : l'abondance de proies, l'exode rural et le statut d'espèce protégée.", en: "Several factors contributed: plenty of prey, rural depopulation and its status as a protected species." }, c: 1, o: [
        { t: "Je n'y vois aucun inconvénient, pourvu que vous me rendiez le livre.", en: "I have no objection, provided you give me the book back." },
        { t: "Et la cohabitation avec les éleveurs, est-elle vraiment possible à vos yeux ?", en: "And is coexistence with livestock farmers really possible, in your view?" },
        { t: "Voilà qui explique pourquoi le musée était fermé.", en: "That explains why the museum was closed." },
      ] },
      { a: { t: "Elle est difficile, mais pas impossible. Les chiens de protection et les clôtures ont fait leurs preuves dans certaines vallées.", en: "It's difficult, but not impossible. Guard dogs and fences have proved their worth in some valleys." }, c: 2, o: [
        { t: "Dans ce cas, je me contenterai d'un simple café.", en: "In that case, I'll settle for just a coffee." },
        { t: "C'est d'autant plus surprenant qu'il ne pleut jamais en août.", en: "That's all the more surprising since it never rains in August." },
        { t: "Ces mesures sont-elles financées par l'État ou à la charge des éleveurs ?", en: "Are these measures funded by the state or paid for by the farmers?" },
      ] },
      { a: { t: "En grande partie par l'État, même si les éleveurs jugent souvent les aides insuffisantes. Je crois que nous devons nous arrêter là.", en: "Largely by the state, although farmers often find the support insufficient. I think we have to stop there." }, c: 1, o: [
        { t: "Je vous en prie, la salle de bains est au fond du couloir.", en: "Please, the bathroom is at the end of the corridor." },
        { t: "Merci beaucoup pour ces réponses très éclairantes.", en: "Thank you very much for these very enlightening answers." },
        { t: "Je vous l'aurais bien prêté, mais je l'ai déjà vendu.", en: "I'd gladly have lent it to you, but I've already sold it." },
      ] },
    ],
  },
];

export default data;
