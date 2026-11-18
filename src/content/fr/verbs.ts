import type { Verb } from '../types';

const data: Verb[] = [
  {
    inf: "être", en: "to be", lv: 1,
    f: {
      "présent": ["suis", "es", "est", "sommes", "êtes", "sont"],
      "passé composé": ["ai été", "as été", "a été", "avons été", "avez été", "ont été"],
      "imparfait": ["étais", "étais", "était", "étions", "étiez", "étaient"],
      "futur": ["serai", "seras", "sera", "serons", "serez", "seront"],
      "subjonctif": ["sois", "sois", "soit", "soyons", "soyez", "soient"],
    },
  },
  {
    inf: "avoir", en: "to have", lv: 1,
    f: {
      "présent": ["ai", "as", "a", "avons", "avez", "ont"],
      "passé composé": ["ai eu", "as eu", "a eu", "avons eu", "avez eu", "ont eu"],
      "imparfait": ["avais", "avais", "avait", "avions", "aviez", "avaient"],
      "futur": ["aurai", "auras", "aura", "aurons", "aurez", "auront"],
      "subjonctif": ["aie", "aies", "ait", "ayons", "ayez", "aient"],
    },
  },
  {
    inf: "aller", en: "to go", lv: 1,
    f: {
      "présent": ["vais", "vas", "va", "allons", "allez", "vont"],
      "passé composé": ["suis allé", "es allé", "est allé", "sommes allés", "êtes allés", "sont allés"],
      "imparfait": ["allais", "allais", "allait", "allions", "alliez", "allaient"],
      "futur": ["irai", "iras", "ira", "irons", "irez", "iront"],
      "subjonctif": ["aille", "ailles", "aille", "allions", "alliez", "aillent"],
    },
  },
  {
    inf: "faire", en: "to do; to make", lv: 1,
    f: {
      "présent": ["fais", "fais", "fait", "faisons", "faites", "font"],
      "passé composé": ["ai fait", "as fait", "a fait", "avons fait", "avez fait", "ont fait"],
      "imparfait": ["faisais", "faisais", "faisait", "faisions", "faisiez", "faisaient"],
      "futur": ["ferai", "feras", "fera", "ferons", "ferez", "feront"],
      "subjonctif": ["fasse", "fasses", "fasse", "fassions", "fassiez", "fassent"],
    },
  },
  {
    inf: "pouvoir", en: "can; to be able to", lv: 1,
    f: {
      "présent": ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"],
      "passé composé": ["ai pu", "as pu", "a pu", "avons pu", "avez pu", "ont pu"],
      "imparfait": ["pouvais", "pouvais", "pouvait", "pouvions", "pouviez", "pouvaient"],
      "futur": ["pourrai", "pourras", "pourra", "pourrons", "pourrez", "pourront"],
      "subjonctif": ["puisse", "puisses", "puisse", "puissions", "puissiez", "puissent"],
    },
  },
  {
    inf: "vouloir", en: "to want", lv: 1,
    f: {
      "présent": ["veux", "veux", "veut", "voulons", "voulez", "veulent"],
      "passé composé": ["ai voulu", "as voulu", "a voulu", "avons voulu", "avez voulu", "ont voulu"],
      "imparfait": ["voulais", "voulais", "voulait", "voulions", "vouliez", "voulaient"],
      "futur": ["voudrai", "voudras", "voudra", "voudrons", "voudrez", "voudront"],
      "subjonctif": ["veuille", "veuilles", "veuille", "voulions", "vouliez", "veuillent"],
    },
  },
  {
    inf: "devoir", en: "must; to have to; to owe", lv: 1,
    f: {
      "présent": ["dois", "dois", "doit", "devons", "devez", "doivent"],
      "passé composé": ["ai dû", "as dû", "a dû", "avons dû", "avez dû", "ont dû"],
      "imparfait": ["devais", "devais", "devait", "devions", "deviez", "devaient"],
      "futur": ["devrai", "devras", "devra", "devrons", "devrez", "devront"],
      "subjonctif": ["doive", "doives", "doive", "devions", "deviez", "doivent"],
    },
  },
  {
    inf: "venir", en: "to come", lv: 1,
    f: {
      "présent": ["viens", "viens", "vient", "venons", "venez", "viennent"],
      "passé composé": ["suis venu", "es venu", "est venu", "sommes venus", "êtes venus", "sont venus"],
      "imparfait": ["venais", "venais", "venait", "venions", "veniez", "venaient"],
      "futur": ["viendrai", "viendras", "viendra", "viendrons", "viendrez", "viendront"],
      "subjonctif": ["vienne", "viennes", "vienne", "venions", "veniez", "viennent"],
    },
  },
  {
    inf: "prendre", en: "to take", lv: 1,
    f: {
      "présent": ["prends", "prends", "prend", "prenons", "prenez", "prennent"],
      "passé composé": ["ai pris", "as pris", "a pris", "avons pris", "avez pris", "ont pris"],
      "imparfait": ["prenais", "prenais", "prenait", "prenions", "preniez", "prenaient"],
      "futur": ["prendrai", "prendras", "prendra", "prendrons", "prendrez", "prendront"],
      "subjonctif": ["prenne", "prennes", "prenne", "prenions", "preniez", "prennent"],
    },
  },
  {
    inf: "parler", en: "to speak; to talk", lv: 1,
    f: {
      "présent": ["parle", "parles", "parle", "parlons", "parlez", "parlent"],
      "passé composé": ["ai parlé", "as parlé", "a parlé", "avons parlé", "avez parlé", "ont parlé"],
      "imparfait": ["parlais", "parlais", "parlait", "parlions", "parliez", "parlaient"],
      "futur": ["parlerai", "parleras", "parlera", "parlerons", "parlerez", "parleront"],
      "subjonctif": ["parle", "parles", "parle", "parlions", "parliez", "parlent"],
    },
  },
  {
    inf: "manger", en: "to eat", lv: 1,
    f: {
      "présent": ["mange", "manges", "mange", "mangeons", "mangez", "mangent"],
      "passé composé": ["ai mangé", "as mangé", "a mangé", "avons mangé", "avez mangé", "ont mangé"],
      "imparfait": ["mangeais", "mangeais", "mangeait", "mangions", "mangiez", "mangeaient"],
      "futur": ["mangerai", "mangeras", "mangera", "mangerons", "mangerez", "mangeront"],
      "subjonctif": ["mange", "manges", "mange", "mangions", "mangiez", "mangent"],
    },
  },
  {
    inf: "aimer", en: "to like; to love", lv: 1,
    f: {
      "présent": ["aime", "aimes", "aime", "aimons", "aimez", "aiment"],
      "passé composé": ["ai aimé", "as aimé", "a aimé", "avons aimé", "avez aimé", "ont aimé"],
      "imparfait": ["aimais", "aimais", "aimait", "aimions", "aimiez", "aimaient"],
      "futur": ["aimerai", "aimeras", "aimera", "aimerons", "aimerez", "aimeront"],
      "subjonctif": ["aime", "aimes", "aime", "aimions", "aimiez", "aiment"],
    },
  },
  {
    inf: "habiter", en: "to live (somewhere)", lv: 1,
    f: {
      "présent": ["habite", "habites", "habite", "habitons", "habitez", "habitent"],
      "passé composé": ["ai habité", "as habité", "a habité", "avons habité", "avez habité", "ont habité"],
      "imparfait": ["habitais", "habitais", "habitait", "habitions", "habitiez", "habitaient"],
      "futur": ["habiterai", "habiteras", "habitera", "habiterons", "habiterez", "habiteront"],
      "subjonctif": ["habite", "habites", "habite", "habitions", "habitiez", "habitent"],
    },
  },
  {
    inf: "boire", en: "to drink", lv: 1,
    f: {
      "présent": ["bois", "bois", "boit", "buvons", "buvez", "boivent"],
      "passé composé": ["ai bu", "as bu", "a bu", "avons bu", "avez bu", "ont bu"],
      "imparfait": ["buvais", "buvais", "buvait", "buvions", "buviez", "buvaient"],
      "futur": ["boirai", "boiras", "boira", "boirons", "boirez", "boiront"],
      "subjonctif": ["boive", "boives", "boive", "buvions", "buviez", "boivent"],
    },
  },
  {
    inf: "savoir", en: "to know (a fact); can (skill)", lv: 1,
    f: {
      "présent": ["sais", "sais", "sait", "savons", "savez", "savent"],
      "passé composé": ["ai su", "as su", "a su", "avons su", "avez su", "ont su"],
      "imparfait": ["savais", "savais", "savait", "savions", "saviez", "savaient"],
      "futur": ["saurai", "sauras", "saura", "saurons", "saurez", "sauront"],
      "subjonctif": ["sache", "saches", "sache", "sachions", "sachiez", "sachent"],
    },
  },
  {
    inf: "sortir", en: "to go out", lv: 2,
    f: {
      "présent": ["sors", "sors", "sort", "sortons", "sortez", "sortent"],
      "passé composé": ["suis sorti", "es sorti", "est sorti", "sommes sortis", "êtes sortis", "sont sortis"],
      "imparfait": ["sortais", "sortais", "sortait", "sortions", "sortiez", "sortaient"],
      "futur": ["sortirai", "sortiras", "sortira", "sortirons", "sortirez", "sortiront"],
      "subjonctif": ["sorte", "sortes", "sorte", "sortions", "sortiez", "sortent"],
    },
  },
  {
    inf: "partir", en: "to leave", lv: 2,
    f: {
      "présent": ["pars", "pars", "part", "partons", "partez", "partent"],
      "passé composé": ["suis parti", "es parti", "est parti", "sommes partis", "êtes partis", "sont partis"],
      "imparfait": ["partais", "partais", "partait", "partions", "partiez", "partaient"],
      "futur": ["partirai", "partiras", "partira", "partirons", "partirez", "partiront"],
      "subjonctif": ["parte", "partes", "parte", "partions", "partiez", "partent"],
    },
  },
  {
    inf: "dormir", en: "to sleep", lv: 2,
    f: {
      "présent": ["dors", "dors", "dort", "dormons", "dormez", "dorment"],
      "passé composé": ["ai dormi", "as dormi", "a dormi", "avons dormi", "avez dormi", "ont dormi"],
      "imparfait": ["dormais", "dormais", "dormait", "dormions", "dormiez", "dormaient"],
      "futur": ["dormirai", "dormiras", "dormira", "dormirons", "dormirez", "dormiront"],
      "subjonctif": ["dorme", "dormes", "dorme", "dormions", "dormiez", "dorment"],
    },
  },
  {
    inf: "finir", en: "to finish", lv: 2,
    f: {
      "présent": ["finis", "finis", "finit", "finissons", "finissez", "finissent"],
      "passé composé": ["ai fini", "as fini", "a fini", "avons fini", "avez fini", "ont fini"],
      "imparfait": ["finissais", "finissais", "finissait", "finissions", "finissiez", "finissaient"],
      "futur": ["finirai", "finiras", "finira", "finirons", "finirez", "finiront"],
      "subjonctif": ["finisse", "finisses", "finisse", "finissions", "finissiez", "finissent"],
    },
  },
  {
    inf: "attendre", en: "to wait (for)", lv: 2,
    f: {
      "présent": ["attends", "attends", "attend", "attendons", "attendez", "attendent"],
      "passé composé": ["ai attendu", "as attendu", "a attendu", "avons attendu", "avez attendu", "ont attendu"],
      "imparfait": ["attendais", "attendais", "attendait", "attendions", "attendiez", "attendaient"],
      "futur": ["attendrai", "attendras", "attendra", "attendrons", "attendrez", "attendront"],
      "subjonctif": ["attende", "attendes", "attende", "attendions", "attendiez", "attendent"],
    },
  },
  {
    inf: "acheter", en: "to buy", lv: 2,
    f: {
      "présent": ["achète", "achètes", "achète", "achetons", "achetez", "achètent"],
      "passé composé": ["ai acheté", "as acheté", "a acheté", "avons acheté", "avez acheté", "ont acheté"],
      "imparfait": ["achetais", "achetais", "achetait", "achetions", "achetiez", "achetaient"],
      "futur": ["achèterai", "achèteras", "achètera", "achèterons", "achèterez", "achèteront"],
      "subjonctif": ["achète", "achètes", "achète", "achetions", "achetiez", "achètent"],
    },
  },
  {
    inf: "mettre", en: "to put; to put on", lv: 2,
    f: {
      "présent": ["mets", "mets", "met", "mettons", "mettez", "mettent"],
      "passé composé": ["ai mis", "as mis", "a mis", "avons mis", "avez mis", "ont mis"],
      "imparfait": ["mettais", "mettais", "mettait", "mettions", "mettiez", "mettaient"],
      "futur": ["mettrai", "mettras", "mettra", "mettrons", "mettrez", "mettront"],
      "subjonctif": ["mette", "mettes", "mette", "mettions", "mettiez", "mettent"],
    },
  },
  {
    inf: "voir", en: "to see", lv: 2,
    f: {
      "présent": ["vois", "vois", "voit", "voyons", "voyez", "voient"],
      "passé composé": ["ai vu", "as vu", "a vu", "avons vu", "avez vu", "ont vu"],
      "imparfait": ["voyais", "voyais", "voyait", "voyions", "voyiez", "voyaient"],
      "futur": ["verrai", "verras", "verra", "verrons", "verrez", "verront"],
      "subjonctif": ["voie", "voies", "voie", "voyions", "voyiez", "voient"],
    },
  },
  {
    inf: "dire", en: "to say; to tell", lv: 2,
    f: {
      "présent": ["dis", "dis", "dit", "disons", "dites", "disent"],
      "passé composé": ["ai dit", "as dit", "a dit", "avons dit", "avez dit", "ont dit"],
      "imparfait": ["disais", "disais", "disait", "disions", "disiez", "disaient"],
      "futur": ["dirai", "diras", "dira", "dirons", "direz", "diront"],
      "subjonctif": ["dise", "dises", "dise", "disions", "disiez", "disent"],
    },
  },
  {
    inf: "lire", en: "to read", lv: 2,
    f: {
      "présent": ["lis", "lis", "lit", "lisons", "lisez", "lisent"],
      "passé composé": ["ai lu", "as lu", "a lu", "avons lu", "avez lu", "ont lu"],
      "imparfait": ["lisais", "lisais", "lisait", "lisions", "lisiez", "lisaient"],
      "futur": ["lirai", "liras", "lira", "lirons", "lirez", "liront"],
      "subjonctif": ["lise", "lises", "lise", "lisions", "lisiez", "lisent"],
    },
  },
  {
    inf: "écrire", en: "to write", lv: 3,
    f: {
      "présent": ["écris", "écris", "écrit", "écrivons", "écrivez", "écrivent"],
      "passé composé": ["ai écrit", "as écrit", "a écrit", "avons écrit", "avez écrit", "ont écrit"],
      "imparfait": ["écrivais", "écrivais", "écrivait", "écrivions", "écriviez", "écrivaient"],
      "futur": ["écrirai", "écriras", "écrira", "écrirons", "écrirez", "écriront"],
      "subjonctif": ["écrive", "écrives", "écrive", "écrivions", "écriviez", "écrivent"],
    },
  },
  {
    inf: "connaître", en: "to know (person, place)", lv: 3,
    f: {
      "présent": ["connais", "connais", "connaît", "connaissons", "connaissez", "connaissent"],
      "passé composé": ["ai connu", "as connu", "a connu", "avons connu", "avez connu", "ont connu"],
      "imparfait": ["connaissais", "connaissais", "connaissait", "connaissions", "connaissiez", "connaissaient"],
      "futur": ["connaîtrai", "connaîtras", "connaîtra", "connaîtrons", "connaîtrez", "connaîtront"],
      "subjonctif": ["connaisse", "connaisses", "connaisse", "connaissions", "connaissiez", "connaissent"],
    },
  },
  {
    inf: "croire", en: "to believe; to think", lv: 3,
    f: {
      "présent": ["crois", "crois", "croit", "croyons", "croyez", "croient"],
      "passé composé": ["ai cru", "as cru", "a cru", "avons cru", "avez cru", "ont cru"],
      "imparfait": ["croyais", "croyais", "croyait", "croyions", "croyiez", "croyaient"],
      "futur": ["croirai", "croiras", "croira", "croirons", "croirez", "croiront"],
      "subjonctif": ["croie", "croies", "croie", "croyions", "croyiez", "croient"],
    },
  },
  {
    inf: "recevoir", en: "to receive", lv: 3,
    f: {
      "présent": ["reçois", "reçois", "reçoit", "recevons", "recevez", "reçoivent"],
      "passé composé": ["ai reçu", "as reçu", "a reçu", "avons reçu", "avez reçu", "ont reçu"],
      "imparfait": ["recevais", "recevais", "recevait", "recevions", "receviez", "recevaient"],
      "futur": ["recevrai", "recevras", "recevra", "recevrons", "recevrez", "recevront"],
      "subjonctif": ["reçoive", "reçoives", "reçoive", "recevions", "receviez", "reçoivent"],
    },
  },
  {
    inf: "vivre", en: "to live", lv: 3,
    f: {
      "présent": ["vis", "vis", "vit", "vivons", "vivez", "vivent"],
      "passé composé": ["ai vécu", "as vécu", "a vécu", "avons vécu", "avez vécu", "ont vécu"],
      "imparfait": ["vivais", "vivais", "vivait", "vivions", "viviez", "vivaient"],
      "futur": ["vivrai", "vivras", "vivra", "vivrons", "vivrez", "vivront"],
      "subjonctif": ["vive", "vives", "vive", "vivions", "viviez", "vivent"],
    },
  },
  {
    inf: "ouvrir", en: "to open", lv: 3,
    f: {
      "présent": ["ouvre", "ouvres", "ouvre", "ouvrons", "ouvrez", "ouvrent"],
      "passé composé": ["ai ouvert", "as ouvert", "a ouvert", "avons ouvert", "avez ouvert", "ont ouvert"],
      "imparfait": ["ouvrais", "ouvrais", "ouvrait", "ouvrions", "ouvriez", "ouvraient"],
      "futur": ["ouvrirai", "ouvriras", "ouvrira", "ouvrirons", "ouvrirez", "ouvriront"],
      "subjonctif": ["ouvre", "ouvres", "ouvre", "ouvrions", "ouvriez", "ouvrent"],
    },
  },
  {
    inf: "choisir", en: "to choose", lv: 3,
    f: {
      "présent": ["choisis", "choisis", "choisit", "choisissons", "choisissez", "choisissent"],
      "passé composé": ["ai choisi", "as choisi", "a choisi", "avons choisi", "avez choisi", "ont choisi"],
      "imparfait": ["choisissais", "choisissais", "choisissait", "choisissions", "choisissiez", "choisissaient"],
      "futur": ["choisirai", "choisiras", "choisira", "choisirons", "choisirez", "choisiront"],
      "subjonctif": ["choisisse", "choisisses", "choisisse", "choisissions", "choisissiez", "choisissent"],
    },
  },
  {
    inf: "appeler", en: "to call", lv: 3,
    f: {
      "présent": ["appelle", "appelles", "appelle", "appelons", "appelez", "appellent"],
      "passé composé": ["ai appelé", "as appelé", "a appelé", "avons appelé", "avez appelé", "ont appelé"],
      "imparfait": ["appelais", "appelais", "appelait", "appelions", "appeliez", "appelaient"],
      "futur": ["appellerai", "appelleras", "appellera", "appellerons", "appellerez", "appelleront"],
      "subjonctif": ["appelle", "appelles", "appelle", "appelions", "appeliez", "appellent"],
    },
  },
  {
    inf: "tenir", en: "to hold; to keep", lv: 4,
    f: {
      "présent": ["tiens", "tiens", "tient", "tenons", "tenez", "tiennent"],
      "passé composé": ["ai tenu", "as tenu", "a tenu", "avons tenu", "avez tenu", "ont tenu"],
      "imparfait": ["tenais", "tenais", "tenait", "tenions", "teniez", "tenaient"],
      "futur": ["tiendrai", "tiendras", "tiendra", "tiendrons", "tiendrez", "tiendront"],
      "subjonctif": ["tienne", "tiennes", "tienne", "tenions", "teniez", "tiennent"],
    },
  },
  {
    inf: "courir", en: "to run", lv: 4,
    f: {
      "présent": ["cours", "cours", "court", "courons", "courez", "courent"],
      "passé composé": ["ai couru", "as couru", "a couru", "avons couru", "avez couru", "ont couru"],
      "imparfait": ["courais", "courais", "courait", "courions", "couriez", "couraient"],
      "futur": ["courrai", "courras", "courra", "courrons", "courrez", "courront"],
      "subjonctif": ["coure", "coures", "coure", "courions", "couriez", "courent"],
    },
  },
  {
    inf: "conduire", en: "to drive", lv: 4,
    f: {
      "présent": ["conduis", "conduis", "conduit", "conduisons", "conduisez", "conduisent"],
      "passé composé": ["ai conduit", "as conduit", "a conduit", "avons conduit", "avez conduit", "ont conduit"],
      "imparfait": ["conduisais", "conduisais", "conduisait", "conduisions", "conduisiez", "conduisaient"],
      "futur": ["conduirai", "conduiras", "conduira", "conduirons", "conduirez", "conduiront"],
      "subjonctif": ["conduise", "conduises", "conduise", "conduisions", "conduisiez", "conduisent"],
    },
  },
  {
    inf: "suivre", en: "to follow; to take (a course)", lv: 4,
    f: {
      "présent": ["suis", "suis", "suit", "suivons", "suivez", "suivent"],
      "passé composé": ["ai suivi", "as suivi", "a suivi", "avons suivi", "avez suivi", "ont suivi"],
      "imparfait": ["suivais", "suivais", "suivait", "suivions", "suiviez", "suivaient"],
      "futur": ["suivrai", "suivras", "suivra", "suivrons", "suivrez", "suivront"],
      "subjonctif": ["suive", "suives", "suive", "suivions", "suiviez", "suivent"],
    },
  },
  {
    inf: "envoyer", en: "to send", lv: 4,
    f: {
      "présent": ["envoie", "envoies", "envoie", "envoyons", "envoyez", "envoient"],
      "passé composé": ["ai envoyé", "as envoyé", "a envoyé", "avons envoyé", "avez envoyé", "ont envoyé"],
      "imparfait": ["envoyais", "envoyais", "envoyait", "envoyions", "envoyiez", "envoyaient"],
      "futur": ["enverrai", "enverras", "enverra", "enverrons", "enverrez", "enverront"],
      "subjonctif": ["envoie", "envoies", "envoie", "envoyions", "envoyiez", "envoient"],
    },
  },
  {
    inf: "mourir", en: "to die", lv: 4,
    f: {
      "présent": ["meurs", "meurs", "meurt", "mourons", "mourez", "meurent"],
      "passé composé": ["suis mort", "es mort", "est mort", "sommes morts", "êtes morts", "sont morts"],
      "imparfait": ["mourais", "mourais", "mourait", "mourions", "mouriez", "mouraient"],
      "futur": ["mourrai", "mourras", "mourra", "mourrons", "mourrez", "mourront"],
      "subjonctif": ["meure", "meures", "meure", "mourions", "mouriez", "meurent"],
    },
  },
  {
    inf: "rire", en: "to laugh", lv: 4,
    f: {
      "présent": ["ris", "ris", "rit", "rions", "riez", "rient"],
      "passé composé": ["ai ri", "as ri", "a ri", "avons ri", "avez ri", "ont ri"],
      "imparfait": ["riais", "riais", "riait", "riions", "riiez", "riaient"],
      "futur": ["rirai", "riras", "rira", "rirons", "rirez", "riront"],
      "subjonctif": ["rie", "ries", "rie", "riions", "riiez", "rient"],
    },
  },
];

export default data;
