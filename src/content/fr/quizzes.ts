import type { TextQuiz } from '../types';

const data: TextQuiz[] = [
  {
    text: "fr-3-teletravail",
    q: [
      { q: "Quel est le principal avantage du télétravail pour beaucoup de gens ?", o: ["Gagner plus d'argent", "Ne plus perdre de temps dans les transports", "Travailler moins d'heures"] },
      { q: "Quel problème ont certains télétravailleurs ?", o: ["Ils se sentent seuls", "Ils travaillent trop peu", "Leur connexion internet est lente"] },
      { q: "Pourquoi est-il difficile d'arrêter de travailler le soir ?", o: ["Parce que le patron téléphone", "Parce que l'ordinateur reste sur la table de la cuisine", "À cause des enfants"] },
      { q: "Quel conseil les experts ne donnent-ils PAS ?", o: ["Garder des horaires réguliers", "Faire de vraies pauses", "Travailler la nuit"] },
      { q: "Que veut dire ici « modèle hybride » ?", o: ["Travailler seulement à la maison", "Quelques jours au bureau, le reste à la maison", "Travailler pour deux entreprises"] },
    ],
  },
  {
    text: "fr-3-train-de-nuit",
    q: [
      { q: "Pourquoi Hugo a-t-il pris le train de nuit ?", o: ["C'était moins cher", "Il ne voulait pas prendre l'avion", "Les avions étaient complets"] },
      { q: "Qui était dans son compartiment ?", o: ["Sa famille", "Une dame âgée et deux étudiants allemands", "Deux étudiants français"] },
      { q: "Comment la conversation a-t-elle commencé ?", o: ["Hugo a posé une question", "La dame a offert des biscuits", "Les étudiants ont joué de la musique"] },
      { q: "Pourquoi la dame fait-elle ce voyage chaque année ?", o: ["Pour son travail", "Pour voir sa sœur", "Pour se baigner dans la mer"] },
      { q: "Qu'est-ce qu'Hugo a vu le matin ?", o: ["Les montagnes", "Paris", "La mer"] },
    ],
  },
  {
    text: "fr-3-annecy",
    q: [
      { q: "Pourquoi appelle-t-on Annecy « la Venise des Alpes » ?", o: ["Elle a un carnaval célèbre", "Elle est traversée par des canaux", "Elle a été fondée par des Vénitiens", "Il y a des gondoles sur le lac"] },
      { q: "À quoi a servi le palais de l'Isle pendant des siècles ?", o: ["D'église", "D'école", "De prison", "De marché"] },
      { q: "Avec quoi fait-on la tartiflette ?", o: ["Du poisson du lac et du riz", "Des pommes de terre, des oignons, des lardons et du reblochon fondu", "Du pain, des œufs et du jambon", "Du bœuf et du vin rouge"] },
      { q: "Comment était le lac dans les années 1950 ?", o: ["Beaucoup plus grand", "Gelé toute l'année", "Très pollué", "Fermé aux bateaux"] },
      { q: "Qu'est-ce qu'on peut observer depuis le col de la Forclaz ?", o: ["Des courses de ski", "Des parapentes qui tournent dans le ciel", "L'arrivée du train de Paris", "Des pêcheurs sur le lac"] },
      { q: "Quand l'article conseille-t-il de venir ?", o: ["En juillet et en août", "En mai, en juin ou en septembre", "Seulement en hiver", "À Noël"] },
    ],
  },
  {
    text: "fr-3-enferme-dehors",
    q: [
      { q: "Qu'est-ce que Samuel descend au début de l'histoire ?", o: ["Son vélo", "Un sac poubelle", "Une boîte de croissants", "Son téléphone"] },
      { q: "Pourquoi Samuel ne rappelle-t-il pas le premier serrurier ?", o: ["Il ne trouve pas le numéro", "Ça coûte 250 euros parce que c'est dimanche", "Le serrurier est en vacances", "Yanis lui dit de ne pas le faire"] },
      { q: "Quelle est l'idée de Yanis ?", o: ["Casser la porte", "Appeler la police", "Passer sur le balcon de Samuel depuis l'appartement du dessus", "Attendre le gardien"] },
      { q: "Pourquoi le plan du balcon ne marche-t-il pas ?", o: ["L'échelle est trop courte", "La fenêtre du balcon est fermée", "Yanis a le vertige", "Mme Benali dit non"] },
      { q: "Où sont les clés à la fin ?", o: ["Dans la poche de son pyjama", "Sur le balcon", "Dans la grande poubelle de l'immeuble", "Dans la boîte aux lettres"] },
      { q: "Qu'est-ce que Samuel apporte à Mme Benali une heure plus tard ?", o: ["Des fleurs et une carte de remerciement", "Des croissants et un double de ses clés", "Une bouteille de vin", "Une nouvelle échelle"] },
    ],
  },
  {
    text: "fr-4-sommeil",
    q: [
      { q: "Combien de temps dormait-on il y a cinquante ans, par rapport à aujourd'hui ?", o: ["À peu près autant", "Environ une heure et demie de plus", "Deux heures de moins"] },
      { q: "Quel est l'effet de la lumière bleue des téléphones ?", o: ["Elle aide à s'endormir", "Elle retarde la production de mélatonine", "Elle améliore la concentration"] },
      { q: "Quel effet à court terme du manque de sommeil le texte cite-t-il ?", o: ["Le diabète", "Des difficultés de concentration", "Une perte de poids"] },
      { q: "Que conseillent les médecins pour la sieste ?", o: ["L'éviter complètement", "Ne pas dépasser vingt minutes", "La faire le soir"] },
      { q: "Quelle chambre aide à bien dormir ?", o: ["Chaude et lumineuse", "Fraîche, sombre et calme", "Grande, avec une télé"] },
    ],
  },
  {
    text: "fr-4-jardin",
    q: [
      { q: "Comment était le terrain quand Nadia est arrivée ?", o: ["C'était un parking", "Il était abandonné et plein de déchets", "C'était une petite aire de jeux"] },
      { q: "Comment Nadia a-t-elle entendu parler du projet ?", o: ["Par une voisine", "Par une affiche sur la grille", "Sur internet"] },
      { q: "Qui était M. Lefèvre ?", o: ["Le maire", "Un ancien professeur de biologie", "Le propriétaire de Nadia"] },
      { q: "Qu'est-ce qu'il lui a appris ?", o: ["À cuisiner les légumes", "À semer, à reconnaître les mauvaises herbes et à bien arroser", "À construire des bacs"] },
      { q: "Qu'est-ce que le jardin a changé pour Nadia ?", o: ["Elle a déménagé", "Elle a fait la connaissance de ses voisins", "Elle est devenue professeure"] },
    ],
  },
  {
    text: "fr-4-chauves-souris",
    q: [
      { q: "Que signifie le nom « chiroptères » en grec ?", o: ["Oiseau de nuit", "Main ailée", "Souris volante", "Chasseur aveugle"] },
      { q: "D'après l'article, les chauves-souris sont-elles aveugles ?", o: ["Oui, complètement", "Non, mais dans le noir complet, la vue ne leur sert pas à grand-chose", "Seulement les espèces françaises", "Seulement en hiver"] },
      { q: "Comment fonctionne l'écholocation ?", o: ["Elles sentent les mouvements de l'air avec leurs ailes", "Elles poussent des cris très aigus et écoutent l'écho", "Elles suivent l'odeur des insectes", "Elles utilisent la lumière de la lune"] },
      { q: "Pourquoi ne faut-il jamais réveiller une chauve-souris qui hiberne ?", o: ["Elle devient agressive", "Chaque réveil lui coûte une énergie précieuse et peut la tuer", "Elle quitte la grotte pour toujours", "Elle perd l'ouïe"] },
      { q: "Combien de petits une chauve-souris a-t-elle en général par an ?", o: ["Cinq ou six", "Deux ou trois", "Un seul", "Aucun, elle pond des œufs"] },
      { q: "Lequel de ces dangers n'est PAS cité ?", o: ["Les pesticides", "L'éclairage la nuit", "La rénovation des vieux bâtiments", "Les chats"] },
    ],
  },
  {
    text: "fr-4-piano-du-troisieme",
    q: [
      { q: "Quel est le problème quand le voisin joue ?", o: ["Il joue trop fort tard le soir", "Il fait toujours une fausse note à la onzième mesure", "Il joue un morceau différent chaque soir", "Il chante en jouant"] },
      { q: "Pourquoi Léa avait-elle arrêté le piano ?", o: ["Elle s'était blessée aux mains", "Elle avait déménagé à Toulouse", "Ses mains avaient tremblé pendant un concours, à dix-neuf ans, et elle avait abandonné", "Elle n'avait pas le temps à cause de son travail"] },
      { q: "Pourquoi M. Ferrand apprend-il la Gymnopédie ?", o: ["Pour un concert de sa chorale", "Pour la jouer à sa femme pour leurs cinquante ans de mariage", "Parce que son médecin le lui a conseillé", "Pour gagner un concours"] },
      { q: "Où Jeanne avait-elle entendu ce morceau pour la première fois ?", o: ["Au conservatoire", "À la radio, dans leur voiture", "Dans un film, à leur premier rendez-vous en 1974", "À une fête chez des voisins"] },
      { q: "Quel conseil de conducteur de train Léa lui donne-t-elle ?", o: ["Toujours arriver à l'heure", "Si on se trompe, on continue", "Regarder loin devant, pas ses mains", "Ralentir avant chaque virage"] },
      { q: "Comment M. Ferrand joue-t-il pour Jeanne pendant la fête des voisins ?", o: ["On descend le piano dans la cour", "Il joue sur un clavier dans la cour", "Il joue chez lui, la fenêtre grande ouverte", "Léa joue à sa place"] },
    ],
  },
  {
    text: "fr-5-gaspillage",
    q: [
      { q: "Combien de nourriture chaque habitant jette-t-il par an en France ?", o: ["Environ sept kilos", "Une trentaine de kilos", "Environ un tiers de tonne"] },
      { q: "Pourquoi jette-t-on certains fruits dès la récolte ?", o: ["Ils sont abîmés par des insectes", "Ils ne correspondent pas aux normes commerciales", "Les agriculteurs produisent trop"] },
      { q: "Qu'impose la loi de 2016 ?", o: ["Les supermarchés doivent baisser leurs prix", "Les supermarchés doivent donner leurs invendus encore consommables", "Les clients doivent utiliser des applications"] },
      { q: "D'après le texte, que signifie « à consommer de préférence avant » ?", o: ["Le produit est dangereux après cette date", "Le produit risque de perdre en goût ou en texture", "Le produit doit être congelé"] },
      { q: "Quel exemple de l'ingéniosité d'autrefois le texte donne-t-il ?", o: ["La confiture", "La soupe", "Le pain perdu"] },
    ],
  },
  {
    text: "fr-5-lettres",
    q: [
      { q: "Où se trouvait la maison familiale ?", o: ["Dans le Jura", "En Bourgogne", "À Lyon"] },
      { q: "Qu'est-ce que Camille a trouvé au grenier ?", o: ["Un journal intime", "Une boîte en fer-blanc avec une centaine de lettres", "De vieilles photos"] },
      { q: "Qui avait signé les lettres ?", o: ["Son grand-père Marcel", "Un homme nommé Étienne", "Sa grand-mère"] },
      { q: "Qu'annonçait la dernière lettre ?", o: ["Le mariage d'Étienne", "Qu'Étienne partait au Québec pour deux ans", "Qu'il était malade"] },
      { q: "Qu'est-ce que Camille a décidé de faire des lettres ?", o: ["Les publier", "Les donner à sa famille", "Les garder secrètes"] },
    ],
  },
  {
    text: "fr-5-repas",
    q: [
      { q: "Qu'est-ce que l'UNESCO a reconnu exactement en 2010 ?", o: ["La cuisine française et ses recettes", "Le talent des grands chefs français", "Une pratique sociale : se mettre à table ensemble pour fêter les moments importants", "Les vins français"] },
      { q: "Qu'est-ce qui surprend les observateurs étrangers chez les Français à table ?", o: ["Ils parlent de nourriture en mangeant", "Ils mangent en silence complet", "Ils ne boivent jamais de vin pendant le repas", "Ils mangent debout"] },
      { q: "Que dit l'essai sur les horaires des repas en France ?", o: ["Chaque famille mange à une heure différente", "Une grande partie du pays mange aux mêmes heures fixes", "Les Français font cinq petits repas par jour", "On dîne en général après vingt-deux heures"] },
      { q: "Pourquoi l'auteur parle-t-il des menus de la cantine ?", o: ["Pour critiquer la qualité des repas à l'école", "Pour montrer que le repas structuré s'apprend tôt", "Pour expliquer pourquoi les enfants n'aiment pas le fromage", "Pour comparer la France aux écoles d'autres pays"] },
      { q: "Quel changement n'est PAS cité parmi ceux qui fragilisent le rituel ?", o: ["Des pauses déjeuner plus courtes", "Les applications de livraison", "Le grignotage", "La disparition du fromage des menus"] },
      { q: "Selon l'auteur, qu'est-ce qui définit vraiment l'esprit du repas français ?", o: ["La qualité des produits", "Le nombre de plats", "S'asseoir ensemble, sans écrans, et prendre le temps de parler", "Ne manger que des plats français"] },
    ],
  },
  {
    text: "fr-5-valise",
    q: [
      { q: "Pourquoi Bastien redoute-t-il le mariage de sa sœur ?", o: ["Il n'aime pas Samuel", "Comme témoin, il doit faire un discours, et il a horreur de parler en public", "Il a oublié d'acheter un cadeau", "Il a peur de voyager en train"] },
      { q: "Où Bastien avait-il mis les cartes de son discours avant de monter dans le train ?", o: ["Dans la poche intérieure de la veste qu'il portait", "Dans la poche de la veste de costume, dans sa valise", "Dans son sac à dos", "Il les avait laissées chez lui"] },
      { q: "Que trouve Bastien en ouvrant la valise au Domaine des Grands-Prés ?", o: ["Son costume gris, un peu froissé", "Un habit à queue-de-pie couvert de paillettes et des accessoires de magicien", "Des jouets d'enfants et un gâteau d'anniversaire", "Des chaussures de randonnée et une carte"] },
      { q: "Comment Ottilie sauve-t-elle le spectacle d'anniversaire à Nyon ?", o: ["Elle l'annule et promet de revenir", "Elle fait de l'erreur l'histoire d'un sortilège et termine en lisant le discours de Bastien", "Elle emprunte des accessoires aux parents de Léonard", "Elle demande aux enfants de faire le spectacle à sa place"] },
      { q: "Pourquoi Mme Duvoisin emmène-t-elle Bastien sous la tente des enfants ?", o: ["Julie lui a demandé de s'occuper des enfants", "Elle le prend pour le magicien prévu pour le mariage", "Il propose de faire des tours de cartes", "Sa mère l'y envoie"] },
      { q: "Pour qui Monique Rochat prend-elle Ottilie ?", o: ["Pour la photographe du mariage", "Pour une cousine de Samuel", "Pour l'amie secrète de Bastien", "Pour une invitée qui s'est trompée de mariage"] },
      { q: "Qu'avait de particulier le jeu de cartes qu'Ottilie a donné à Bastien pour son discours ?", o: ["Toutes les cartes étaient des dames de cœur", "Le nom de Julie était écrit sur chaque carte", "C'était le jeu de son grand-père", "Son discours était écrit sur les cartes"] },
      { q: "D'après Ottilie, quelle est la deuxième moitié du secret de la magie ?", o: ["Répéter chaque tour mille fois", "Ne jamais faire deux fois le même tour", "Croire au tour pendant qu'on le fait", "Toujours regarder la main vide"] },
    ],
  },
  {
    text: "fr-6-flanerie",
    q: [
      { q: "Comment le texte définit-il « flâner » ?", o: ["Marcher vite vers une destination", "Marcher sans but, mais l'esprit en éveil", "Errer parce qu'on s'est perdu"] },
      { q: "Quel écrivain est associé à la figure du flâneur ?", o: ["Rousseau", "Baudelaire", "Nietzsche"] },
      { q: "Pourquoi la flânerie ressemble-t-elle aujourd'hui à une forme de résistance ?", o: ["Parce que les villes sont dangereuses", "Parce que nos trajets sont optimisés et remplis par nos téléphones", "Parce que la marche est interdite dans beaucoup d'endroits"] },
      { q: "Que disait Rousseau de la marche ?", o: ["Elle le fatiguait", "Il ne pouvait réfléchir qu'en marchant", "Il préférait marcher la nuit"] },
      { q: "D'après le texte, que font les urbanistes ?", o: ["Ils construisent plus de parkings", "Ils créent des rues piétonnes et des endroits gratuits où s'asseoir", "Ils interdisent le téléphone dans la rue"] },
    ],
  },
  {
    text: "fr-6-phare",
    q: [
      { q: "Pourquoi était-ce la dernière nuit d'Yves au phare ?", o: ["Il partait à la retraite à cause de son âge", "Le phare allait être automatisé", "Le phare fermait pour travaux"] },
      { q: "Depuis combien de temps faisait-il ce métier ?", o: ["Douze ans", "Trente et un ans", "Deux cents ans"] },
      { q: "Qu'a-t-il pensé du poste qu'on lui proposait à terre ?", o: ["Il l'a accepté avec plaisir", "Il a demandé à réfléchir", "Il l'a refusé tout de suite"] },
      { q: "Selon Yves, comment était vraiment la vie de gardien ?", o: ["Pleine d'aventures", "Faite de patience, d'entretien et de solitude", "Ennuyeuse et mal payée"] },
      { q: "Comment le pêcheur l'a-t-il accueilli sur le quai ?", o: ["Avec un long discours", "Il lui a tendu la main sans un mot", "Il l'a serré dans ses bras en pleurant"] },
    ],
  },
  {
    text: "fr-6-encre-verte",
    q: [
      { q: "Qu'est-ce qui attire d'abord l'attention de Mathilde dans L'Éducation sentimentale trouvée dans le carton d'Inès ?", o: ["Un billet caché entre les pages", "Des notes manuscrites à l'encre verte dans les marges", "Une dédicace signée par Flaubert", "Il manque le premier chapitre"] },
      { q: "Comment M. Bonnefoy avait-il eu son exemplaire du Rouge et le Noir ?", o: ["Il l'avait acheté aux Puces du Canal", "Sa fille le lui avait offert", "Il l'avait trouvé sur un banc de la place Sathonay", "Un client le lui avait laissé en héritage"] },
      { q: "Que reconnaît Odette dans les marges du Montaigne ?", o: ["Un code secret de libraires", "Des signes de correction faits par une main de professionnel", "Des notes en sténo", "La signature d'un imprimeur"] },
      { q: "Qu'est-ce que les notes de L'Étranger ont poussé Nadia à faire en 1998 ?", o: ["Ouvrir un café", "Retourner au lycée", "Quitter Lyon", "Devenir écrivain"] },
      { q: "Pourquoi les ouvriers de l'imprimerie Rivaud appelaient-ils Lucien « l'Hirondelle » ?", o: ["Il dessinait des hirondelles sur chaque épreuve", "Il avait un oiseau dans son bureau", "Des hirondelles nichaient à l'imprimerie, il notait leur retour chaque printemps, et il leur ressemblait un peu", "C'était le titre de son livre préféré"] },
      { q: "Que se passe-t-il quand Mathilde commence à lire à Lucien la scène du bateau, chez Flaubert ?", o: ["Il lui demande d'arrêter", "Il récite la suite du passage par cœur", "Il dit qu'il n'a jamais lu le livre", "Il corrige sa prononciation"] },
      { q: "Que découvre Bertrand quand il ouvre enfin son placard ?", o: ["Que les livres valent une fortune", "Que tous les livres offerts par son oncle sont annotés, et certains lui sont adressés", "Des lettres de Jeanne", "Que les livres appartenaient à l'imprimerie"] },
      { q: "Comment l'histoire se termine-t-elle ?", o: ["Mathilde ferme la librairie et quitte Lyon", "Lucien donne son dernier livre à Mathilde", "Mathilde annote elle-même un livre et le laisse sur un banc", "Hugo reprend la librairie"] },
    ],
  },
  {
    text: "fr-6-metre",
    q: [
      { q: "Pourquoi les savants de l'Académie voulaient-ils une unité « tirée de la nature » ?", o: ["Parce que les mesures de Paris étaient trop petites", "Pour qu'elle n'appartienne à personne et vaille pour tous les temps et tous les peuples", "Parce que le roi le leur avait demandé", "Pour faciliter le commerce avec l'Espagne"] },
      { q: "Pourquoi a-t-on écarté le pendule battant la seconde comme base du mètre ?", o: ["Il était trop difficile à construire", "Sa longueur dépend de la pesanteur, qui varie avec la latitude, et de la définition de la seconde", "Il était beaucoup plus long qu'un mètre", "Les horloges coûtaient trop cher à l'époque"] },
      { q: "Comment le mètre a-t-il été défini à l'origine, en 1791 ?", o: ["Comme la longueur du pied du roi", "Comme la dix-millionième partie de la distance entre le pôle Nord et l'équateur", "Comme la distance parcourue par la lumière en une seconde", "Comme la longueur d'une barre de platine à Paris"] },
      { q: "Quel est le principe de la triangulation, tel que l'essai le décrit ?", o: ["Mesurer chaque distance avec une chaîne", "Mesurer les angles d'une chaîne de triangles et la longueur d'une base, puis calculer le reste", "Observer les étoiles depuis trois villes", "Comparer l'ombre des clochers"] },
      { q: "Quel était le secret de Méchain ?", o: ["Il n'était jamais allé à Barcelone", "Ses deux mesures de latitude à Barcelone différaient d'environ trois secondes d'arc", "Il avait perdu son cercle répétiteur", "Il avait copié les résultats de Delambre"] },
      { q: "D'après l'essai, pourquoi le mètre des Archives est-il trop court d'environ 0,2 mm ?", o: ["Surtout à cause de l'erreur de Méchain", "Surtout parce que la forme de la Terre est plus irrégulière qu'on ne le supposait", "Parce que le platine rétrécit avec le temps", "À cause d'une faute d'impression dans la loi de 1799"] },
      { q: "Comment le mètre est-il défini depuis 1983 ?", o: ["Par une barre de platine iridié à Sèvres", "Par la longueur d'onde de la lumière du krypton 86", "Comme la distance parcourue par la lumière dans le vide en 1/299 792 458 de seconde", "Par la constante de Planck"] },
      { q: "Quelle est la conclusion finale de l'essai sur la mesure ?", o: ["La nature fournit des mesures parfaites", "Une mesure est d'abord une convention passée entre les hommes", "Les anciennes unités françaises étaient meilleures", "Le mètre sera bientôt remplacé"] },
    ],
  },
];

export default data;
