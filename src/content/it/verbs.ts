import type { Verb } from '../types';

const data: Verb[] = [
  {
    inf: "essere", en: "to be", lv: 1,
    f: {
      "presente": ["sono", "sei", "è", "siamo", "siete", "sono"],
      "passato prossimo": ["sono stato", "sei stato", "è stato", "siamo stati", "siete stati", "sono stati"],
      "imperfetto": ["ero", "eri", "era", "eravamo", "eravate", "erano"],
      "futuro": ["sarò", "sarai", "sarà", "saremo", "sarete", "saranno"],
      "congiuntivo": ["sia", "sia", "sia", "siamo", "siate", "siano"],
    },
  },
  {
    inf: "avere", en: "to have", lv: 1,
    f: {
      "presente": ["ho", "hai", "ha", "abbiamo", "avete", "hanno"],
      "passato prossimo": ["ho avuto", "hai avuto", "ha avuto", "abbiamo avuto", "avete avuto", "hanno avuto"],
      "imperfetto": ["avevo", "avevi", "aveva", "avevamo", "avevate", "avevano"],
      "futuro": ["avrò", "avrai", "avrà", "avremo", "avrete", "avranno"],
      "congiuntivo": ["abbia", "abbia", "abbia", "abbiamo", "abbiate", "abbiano"],
    },
  },
  {
    inf: "fare", en: "to do; to make", lv: 1,
    f: {
      "presente": ["faccio", "fai", "fa", "facciamo", "fate", "fanno"],
      "passato prossimo": ["ho fatto", "hai fatto", "ha fatto", "abbiamo fatto", "avete fatto", "hanno fatto"],
      "imperfetto": ["facevo", "facevi", "faceva", "facevamo", "facevate", "facevano"],
      "futuro": ["farò", "farai", "farà", "faremo", "farete", "faranno"],
      "congiuntivo": ["faccia", "faccia", "faccia", "facciamo", "facciate", "facciano"],
    },
  },
  {
    inf: "andare", en: "to go", lv: 1,
    f: {
      "presente": ["vado", "vai", "va", "andiamo", "andate", "vanno"],
      "passato prossimo": ["sono andato", "sei andato", "è andato", "siamo andati", "siete andati", "sono andati"],
      "imperfetto": ["andavo", "andavi", "andava", "andavamo", "andavate", "andavano"],
      "futuro": ["andrò", "andrai", "andrà", "andremo", "andrete", "andranno"],
      "congiuntivo": ["vada", "vada", "vada", "andiamo", "andiate", "vadano"],
    },
  },
  {
    inf: "venire", en: "to come", lv: 1,
    f: {
      "presente": ["vengo", "vieni", "viene", "veniamo", "venite", "vengono"],
      "passato prossimo": ["sono venuto", "sei venuto", "è venuto", "siamo venuti", "siete venuti", "sono venuti"],
      "imperfetto": ["venivo", "venivi", "veniva", "venivamo", "venivate", "venivano"],
      "futuro": ["verrò", "verrai", "verrà", "verremo", "verrete", "verranno"],
      "congiuntivo": ["venga", "venga", "venga", "veniamo", "veniate", "vengano"],
    },
  },
  {
    inf: "stare", en: "to stay; to be", lv: 1,
    f: {
      "presente": ["sto", "stai", "sta", "stiamo", "state", "stanno"],
      "passato prossimo": ["sono stato", "sei stato", "è stato", "siamo stati", "siete stati", "sono stati"],
      "imperfetto": ["stavo", "stavi", "stava", "stavamo", "stavate", "stavano"],
      "futuro": ["starò", "starai", "starà", "staremo", "starete", "staranno"],
      "congiuntivo": ["stia", "stia", "stia", "stiamo", "stiate", "stiano"],
    },
  },
  {
    inf: "mangiare", en: "to eat", lv: 1,
    f: {
      "presente": ["mangio", "mangi", "mangia", "mangiamo", "mangiate", "mangiano"],
      "passato prossimo": ["ho mangiato", "hai mangiato", "ha mangiato", "abbiamo mangiato", "avete mangiato", "hanno mangiato"],
      "imperfetto": ["mangiavo", "mangiavi", "mangiava", "mangiavamo", "mangiavate", "mangiavano"],
      "futuro": ["mangerò", "mangerai", "mangerà", "mangeremo", "mangerete", "mangeranno"],
      "congiuntivo": ["mangi", "mangi", "mangi", "mangiamo", "mangiate", "mangino"],
    },
  },
  {
    inf: "bere", en: "to drink", lv: 1,
    f: {
      "presente": ["bevo", "bevi", "beve", "beviamo", "bevete", "bevono"],
      "passato prossimo": ["ho bevuto", "hai bevuto", "ha bevuto", "abbiamo bevuto", "avete bevuto", "hanno bevuto"],
      "imperfetto": ["bevevo", "bevevi", "beveva", "bevevamo", "bevevate", "bevevano"],
      "futuro": ["berrò", "berrai", "berrà", "berremo", "berrete", "berranno"],
      "congiuntivo": ["beva", "beva", "beva", "beviamo", "beviate", "bevano"],
    },
  },
  {
    inf: "parlare", en: "to speak; to talk", lv: 1,
    f: {
      "presente": ["parlo", "parli", "parla", "parliamo", "parlate", "parlano"],
      "passato prossimo": ["ho parlato", "hai parlato", "ha parlato", "abbiamo parlato", "avete parlato", "hanno parlato"],
      "imperfetto": ["parlavo", "parlavi", "parlava", "parlavamo", "parlavate", "parlavano"],
      "futuro": ["parlerò", "parlerai", "parlerà", "parleremo", "parlerete", "parleranno"],
      "congiuntivo": ["parli", "parli", "parli", "parliamo", "parliate", "parlino"],
    },
  },
  {
    inf: "abitare", en: "to live (somewhere)", lv: 1,
    f: {
      "presente": ["abito", "abiti", "abita", "abitiamo", "abitate", "abitano"],
      "passato prossimo": ["ho abitato", "hai abitato", "ha abitato", "abbiamo abitato", "avete abitato", "hanno abitato"],
      "imperfetto": ["abitavo", "abitavi", "abitava", "abitavamo", "abitavate", "abitavano"],
      "futuro": ["abiterò", "abiterai", "abiterà", "abiteremo", "abiterete", "abiteranno"],
      "congiuntivo": ["abiti", "abiti", "abiti", "abitiamo", "abitiate", "abitino"],
    },
  },
  {
    inf: "lavorare", en: "to work", lv: 1,
    f: {
      "presente": ["lavoro", "lavori", "lavora", "lavoriamo", "lavorate", "lavorano"],
      "passato prossimo": ["ho lavorato", "hai lavorato", "ha lavorato", "abbiamo lavorato", "avete lavorato", "hanno lavorato"],
      "imperfetto": ["lavoravo", "lavoravi", "lavorava", "lavoravamo", "lavoravate", "lavoravano"],
      "futuro": ["lavorerò", "lavorerai", "lavorerà", "lavoreremo", "lavorerete", "lavoreranno"],
      "congiuntivo": ["lavori", "lavori", "lavori", "lavoriamo", "lavoriate", "lavorino"],
    },
  },
  {
    inf: "volere", en: "to want", lv: 1,
    f: {
      "presente": ["voglio", "vuoi", "vuole", "vogliamo", "volete", "vogliono"],
      "passato prossimo": ["ho voluto", "hai voluto", "ha voluto", "abbiamo voluto", "avete voluto", "hanno voluto"],
      "imperfetto": ["volevo", "volevi", "voleva", "volevamo", "volevate", "volevano"],
      "futuro": ["vorrò", "vorrai", "vorrà", "vorremo", "vorrete", "vorranno"],
      "congiuntivo": ["voglia", "voglia", "voglia", "vogliamo", "vogliate", "vogliano"],
    },
  },
  {
    inf: "potere", en: "can; to be able to", lv: 1,
    f: {
      "presente": ["posso", "puoi", "può", "possiamo", "potete", "possono"],
      "passato prossimo": ["ho potuto", "hai potuto", "ha potuto", "abbiamo potuto", "avete potuto", "hanno potuto"],
      "imperfetto": ["potevo", "potevi", "poteva", "potevamo", "potevate", "potevano"],
      "futuro": ["potrò", "potrai", "potrà", "potremo", "potrete", "potranno"],
      "congiuntivo": ["possa", "possa", "possa", "possiamo", "possiate", "possano"],
    },
  },
  {
    inf: "dormire", en: "to sleep", lv: 1,
    f: {
      "presente": ["dormo", "dormi", "dorme", "dormiamo", "dormite", "dormono"],
      "passato prossimo": ["ho dormito", "hai dormito", "ha dormito", "abbiamo dormito", "avete dormito", "hanno dormito"],
      "imperfetto": ["dormivo", "dormivi", "dormiva", "dormivamo", "dormivate", "dormivano"],
      "futuro": ["dormirò", "dormirai", "dormirà", "dormiremo", "dormirete", "dormiranno"],
      "congiuntivo": ["dorma", "dorma", "dorma", "dormiamo", "dormiate", "dormano"],
    },
  },
  {
    inf: "dire", en: "to say; to tell", lv: 1,
    f: {
      "presente": ["dico", "dici", "dice", "diciamo", "dite", "dicono"],
      "passato prossimo": ["ho detto", "hai detto", "ha detto", "abbiamo detto", "avete detto", "hanno detto"],
      "imperfetto": ["dicevo", "dicevi", "diceva", "dicevamo", "dicevate", "dicevano"],
      "futuro": ["dirò", "dirai", "dirà", "diremo", "direte", "diranno"],
      "congiuntivo": ["dica", "dica", "dica", "diciamo", "diciate", "dicano"],
    },
  },
  {
    inf: "dovere", en: "must; to have to", lv: 2,
    f: {
      "presente": ["devo", "devi", "deve", "dobbiamo", "dovete", "devono"],
      "passato prossimo": ["ho dovuto", "hai dovuto", "ha dovuto", "abbiamo dovuto", "avete dovuto", "hanno dovuto"],
      "imperfetto": ["dovevo", "dovevi", "doveva", "dovevamo", "dovevate", "dovevano"],
      "futuro": ["dovrò", "dovrai", "dovrà", "dovremo", "dovrete", "dovranno"],
      "congiuntivo": ["debba", "debba", "debba", "dobbiamo", "dobbiate", "debbano"],
    },
  },
  {
    inf: "sapere", en: "to know", lv: 2,
    f: {
      "presente": ["so", "sai", "sa", "sappiamo", "sapete", "sanno"],
      "passato prossimo": ["ho saputo", "hai saputo", "ha saputo", "abbiamo saputo", "avete saputo", "hanno saputo"],
      "imperfetto": ["sapevo", "sapevi", "sapeva", "sapevamo", "sapevate", "sapevano"],
      "futuro": ["saprò", "saprai", "saprà", "sapremo", "saprete", "sapranno"],
      "congiuntivo": ["sappia", "sappia", "sappia", "sappiamo", "sappiate", "sappiano"],
    },
  },
  {
    inf: "uscire", en: "to go out", lv: 2,
    f: {
      "presente": ["esco", "esci", "esce", "usciamo", "uscite", "escono"],
      "passato prossimo": ["sono uscito", "sei uscito", "è uscito", "siamo usciti", "siete usciti", "sono usciti"],
      "imperfetto": ["uscivo", "uscivi", "usciva", "uscivamo", "uscivate", "uscivano"],
      "futuro": ["uscirò", "uscirai", "uscirà", "usciremo", "uscirete", "usciranno"],
      "congiuntivo": ["esca", "esca", "esca", "usciamo", "usciate", "escano"],
    },
  },
  {
    inf: "capire", en: "to understand", lv: 2,
    f: {
      "presente": ["capisco", "capisci", "capisce", "capiamo", "capite", "capiscono"],
      "passato prossimo": ["ho capito", "hai capito", "ha capito", "abbiamo capito", "avete capito", "hanno capito"],
      "imperfetto": ["capivo", "capivi", "capiva", "capivamo", "capivate", "capivano"],
      "futuro": ["capirò", "capirai", "capirà", "capiremo", "capirete", "capiranno"],
      "congiuntivo": ["capisca", "capisca", "capisca", "capiamo", "capiate", "capiscano"],
    },
  },
  {
    inf: "finire", en: "to finish", lv: 2,
    f: {
      "presente": ["finisco", "finisci", "finisce", "finiamo", "finite", "finiscono"],
      "passato prossimo": ["ho finito", "hai finito", "ha finito", "abbiamo finito", "avete finito", "hanno finito"],
      "imperfetto": ["finivo", "finivi", "finiva", "finivamo", "finivate", "finivano"],
      "futuro": ["finirò", "finirai", "finirà", "finiremo", "finirete", "finiranno"],
      "congiuntivo": ["finisca", "finisca", "finisca", "finiamo", "finiate", "finiscano"],
    },
  },
  {
    inf: "prendere", en: "to take; to have (food, drink)", lv: 2,
    f: {
      "presente": ["prendo", "prendi", "prende", "prendiamo", "prendete", "prendono"],
      "passato prossimo": ["ho preso", "hai preso", "ha preso", "abbiamo preso", "avete preso", "hanno preso"],
      "imperfetto": ["prendevo", "prendevi", "prendeva", "prendevamo", "prendevate", "prendevano"],
      "futuro": ["prenderò", "prenderai", "prenderà", "prenderemo", "prenderete", "prenderanno"],
      "congiuntivo": ["prenda", "prenda", "prenda", "prendiamo", "prendiate", "prendano"],
    },
  },
  {
    inf: "vedere", en: "to see", lv: 2,
    f: {
      "presente": ["vedo", "vedi", "vede", "vediamo", "vedete", "vedono"],
      "passato prossimo": ["ho visto", "hai visto", "ha visto", "abbiamo visto", "avete visto", "hanno visto"],
      "imperfetto": ["vedevo", "vedevi", "vedeva", "vedevamo", "vedevate", "vedevano"],
      "futuro": ["vedrò", "vedrai", "vedrà", "vedremo", "vedrete", "vedranno"],
      "congiuntivo": ["veda", "veda", "veda", "vediamo", "vediate", "vedano"],
    },
  },
  {
    inf: "leggere", en: "to read", lv: 2,
    f: {
      "presente": ["leggo", "leggi", "legge", "leggiamo", "leggete", "leggono"],
      "passato prossimo": ["ho letto", "hai letto", "ha letto", "abbiamo letto", "avete letto", "hanno letto"],
      "imperfetto": ["leggevo", "leggevi", "leggeva", "leggevamo", "leggevate", "leggevano"],
      "futuro": ["leggerò", "leggerai", "leggerà", "leggeremo", "leggerete", "leggeranno"],
      "congiuntivo": ["legga", "legga", "legga", "leggiamo", "leggiate", "leggano"],
    },
  },
  {
    inf: "scrivere", en: "to write", lv: 2,
    f: {
      "presente": ["scrivo", "scrivi", "scrive", "scriviamo", "scrivete", "scrivono"],
      "passato prossimo": ["ho scritto", "hai scritto", "ha scritto", "abbiamo scritto", "avete scritto", "hanno scritto"],
      "imperfetto": ["scrivevo", "scrivevi", "scriveva", "scrivevamo", "scrivevate", "scrivevano"],
      "futuro": ["scriverò", "scriverai", "scriverà", "scriveremo", "scriverete", "scriveranno"],
      "congiuntivo": ["scriva", "scriva", "scriva", "scriviamo", "scriviate", "scrivano"],
    },
  },
  {
    inf: "partire", en: "to leave; to depart", lv: 2,
    f: {
      "presente": ["parto", "parti", "parte", "partiamo", "partite", "partono"],
      "passato prossimo": ["sono partito", "sei partito", "è partito", "siamo partiti", "siete partiti", "sono partiti"],
      "imperfetto": ["partivo", "partivi", "partiva", "partivamo", "partivate", "partivano"],
      "futuro": ["partirò", "partirai", "partirà", "partiremo", "partirete", "partiranno"],
      "congiuntivo": ["parta", "parta", "parta", "partiamo", "partiate", "partano"],
    },
  },
  {
    inf: "conoscere", en: "to know (people, places); to meet", lv: 3,
    f: {
      "presente": ["conosco", "conosci", "conosce", "conosciamo", "conoscete", "conoscono"],
      "passato prossimo": ["ho conosciuto", "hai conosciuto", "ha conosciuto", "abbiamo conosciuto", "avete conosciuto", "hanno conosciuto"],
      "imperfetto": ["conoscevo", "conoscevi", "conosceva", "conoscevamo", "conoscevate", "conoscevano"],
      "futuro": ["conoscerò", "conoscerai", "conoscerà", "conosceremo", "conoscerete", "conosceranno"],
      "congiuntivo": ["conosca", "conosca", "conosca", "conosciamo", "conosciate", "conoscano"],
    },
  },
  {
    inf: "mettere", en: "to put", lv: 3,
    f: {
      "presente": ["metto", "metti", "mette", "mettiamo", "mettete", "mettono"],
      "passato prossimo": ["ho messo", "hai messo", "ha messo", "abbiamo messo", "avete messo", "hanno messo"],
      "imperfetto": ["mettevo", "mettevi", "metteva", "mettevamo", "mettevate", "mettevano"],
      "futuro": ["metterò", "metterai", "metterà", "metteremo", "metterete", "metteranno"],
      "congiuntivo": ["metta", "metta", "metta", "mettiamo", "mettiate", "mettano"],
    },
  },
  {
    inf: "dare", en: "to give", lv: 3,
    f: {
      "presente": ["do", "dai", "dà", "diamo", "date", "danno"],
      "passato prossimo": ["ho dato", "hai dato", "ha dato", "abbiamo dato", "avete dato", "hanno dato"],
      "imperfetto": ["davo", "davi", "dava", "davamo", "davate", "davano"],
      "futuro": ["darò", "darai", "darà", "daremo", "darete", "daranno"],
      "congiuntivo": ["dia", "dia", "dia", "diamo", "diate", "diano"],
    },
  },
  {
    inf: "rimanere", en: "to stay; to remain", lv: 3,
    f: {
      "presente": ["rimango", "rimani", "rimane", "rimaniamo", "rimanete", "rimangono"],
      "passato prossimo": ["sono rimasto", "sei rimasto", "è rimasto", "siamo rimasti", "siete rimasti", "sono rimasti"],
      "imperfetto": ["rimanevo", "rimanevi", "rimaneva", "rimanevamo", "rimanevate", "rimanevano"],
      "futuro": ["rimarrò", "rimarrai", "rimarrà", "rimarremo", "rimarrete", "rimarranno"],
      "congiuntivo": ["rimanga", "rimanga", "rimanga", "rimaniamo", "rimaniate", "rimangano"],
    },
  },
  {
    inf: "scegliere", en: "to choose", lv: 3,
    f: {
      "presente": ["scelgo", "scegli", "sceglie", "scegliamo", "scegliete", "scelgono"],
      "passato prossimo": ["ho scelto", "hai scelto", "ha scelto", "abbiamo scelto", "avete scelto", "hanno scelto"],
      "imperfetto": ["sceglievo", "sceglievi", "sceglieva", "sceglievamo", "sceglievate", "sceglievano"],
      "futuro": ["sceglerò", "sceglerai", "sceglerà", "scegleremo", "sceglerete", "scegleranno"],
      "congiuntivo": ["scelga", "scelga", "scelga", "scegliamo", "scegliate", "scelgano"],
    },
  },
  {
    inf: "chiudere", en: "to close", lv: 3,
    f: {
      "presente": ["chiudo", "chiudi", "chiude", "chiudiamo", "chiudete", "chiudono"],
      "passato prossimo": ["ho chiuso", "hai chiuso", "ha chiuso", "abbiamo chiuso", "avete chiuso", "hanno chiuso"],
      "imperfetto": ["chiudevo", "chiudevi", "chiudeva", "chiudevamo", "chiudevate", "chiudevano"],
      "futuro": ["chiuderò", "chiuderai", "chiuderà", "chiuderemo", "chiuderete", "chiuderanno"],
      "congiuntivo": ["chiuda", "chiuda", "chiuda", "chiudiamo", "chiudiate", "chiudano"],
    },
  },
  {
    inf: "aprire", en: "to open", lv: 3,
    f: {
      "presente": ["apro", "apri", "apre", "apriamo", "aprite", "aprono"],
      "passato prossimo": ["ho aperto", "hai aperto", "ha aperto", "abbiamo aperto", "avete aperto", "hanno aperto"],
      "imperfetto": ["aprivo", "aprivi", "apriva", "aprivamo", "aprivate", "aprivano"],
      "futuro": ["aprirò", "aprirai", "aprirà", "apriremo", "aprirete", "apriranno"],
      "congiuntivo": ["apra", "apra", "apra", "apriamo", "apriate", "aprano"],
    },
  },
  {
    inf: "vivere", en: "to live", lv: 3,
    f: {
      "presente": ["vivo", "vivi", "vive", "viviamo", "vivete", "vivono"],
      "passato prossimo": ["ho vissuto", "hai vissuto", "ha vissuto", "abbiamo vissuto", "avete vissuto", "hanno vissuto"],
      "imperfetto": ["vivevo", "vivevi", "viveva", "vivevamo", "vivevate", "vivevano"],
      "futuro": ["vivrò", "vivrai", "vivrà", "vivremo", "vivrete", "vivranno"],
      "congiuntivo": ["viva", "viva", "viva", "viviamo", "viviate", "vivano"],
    },
  },
  {
    inf: "tenere", en: "to hold; to keep", lv: 4,
    f: {
      "presente": ["tengo", "tieni", "tiene", "teniamo", "tenete", "tengono"],
      "passato prossimo": ["ho tenuto", "hai tenuto", "ha tenuto", "abbiamo tenuto", "avete tenuto", "hanno tenuto"],
      "imperfetto": ["tenevo", "tenevi", "teneva", "tenevamo", "tenevate", "tenevano"],
      "futuro": ["terrò", "terrai", "terrà", "terremo", "terrete", "terranno"],
      "congiuntivo": ["tenga", "tenga", "tenga", "teniamo", "teniate", "tengano"],
    },
  },
  {
    inf: "cercare", en: "to look for; to try", lv: 4,
    f: {
      "presente": ["cerco", "cerchi", "cerca", "cerchiamo", "cercate", "cercano"],
      "passato prossimo": ["ho cercato", "hai cercato", "ha cercato", "abbiamo cercato", "avete cercato", "hanno cercato"],
      "imperfetto": ["cercavo", "cercavi", "cercava", "cercavamo", "cercavate", "cercavano"],
      "futuro": ["cercherò", "cercherai", "cercherà", "cercheremo", "cercherete", "cercheranno"],
      "congiuntivo": ["cerchi", "cerchi", "cerchi", "cerchiamo", "cerchiate", "cerchino"],
    },
  },
  {
    inf: "pagare", en: "to pay", lv: 4,
    f: {
      "presente": ["pago", "paghi", "paga", "paghiamo", "pagate", "pagano"],
      "passato prossimo": ["ho pagato", "hai pagato", "ha pagato", "abbiamo pagato", "avete pagato", "hanno pagato"],
      "imperfetto": ["pagavo", "pagavi", "pagava", "pagavamo", "pagavate", "pagavano"],
      "futuro": ["pagherò", "pagherai", "pagherà", "pagheremo", "pagherete", "pagheranno"],
      "congiuntivo": ["paghi", "paghi", "paghi", "paghiamo", "paghiate", "paghino"],
    },
  },
  {
    inf: "chiedere", en: "to ask", lv: 4,
    f: {
      "presente": ["chiedo", "chiedi", "chiede", "chiediamo", "chiedete", "chiedono"],
      "passato prossimo": ["ho chiesto", "hai chiesto", "ha chiesto", "abbiamo chiesto", "avete chiesto", "hanno chiesto"],
      "imperfetto": ["chiedevo", "chiedevi", "chiedeva", "chiedevamo", "chiedevate", "chiedevano"],
      "futuro": ["chiederò", "chiederai", "chiederà", "chiederemo", "chiederete", "chiederanno"],
      "congiuntivo": ["chieda", "chieda", "chieda", "chiediamo", "chiediate", "chiedano"],
    },
  },
  {
    inf: "salire", en: "to go up; to get on", lv: 4,
    f: {
      "presente": ["salgo", "sali", "sale", "saliamo", "salite", "salgono"],
      "passato prossimo": ["sono salito", "sei salito", "è salito", "siamo saliti", "siete saliti", "sono saliti"],
      "imperfetto": ["salivo", "salivi", "saliva", "salivamo", "salivate", "salivano"],
      "futuro": ["salirò", "salirai", "salirà", "saliremo", "salirete", "saliranno"],
      "congiuntivo": ["salga", "salga", "salga", "saliamo", "saliate", "salgano"],
    },
  },
  {
    inf: "tradurre", en: "to translate", lv: 4,
    f: {
      "presente": ["traduco", "traduci", "traduce", "traduciamo", "traducete", "traducono"],
      "passato prossimo": ["ho tradotto", "hai tradotto", "ha tradotto", "abbiamo tradotto", "avete tradotto", "hanno tradotto"],
      "imperfetto": ["traducevo", "traducevi", "traduceva", "traducevamo", "traducevate", "traducevano"],
      "futuro": ["tradurrò", "tradurrai", "tradurrà", "tradurremo", "tradurrete", "tradurranno"],
      "congiuntivo": ["traduca", "traduca", "traduca", "traduciamo", "traduciate", "traducano"],
    },
  },
  {
    inf: "nascere", en: "to be born", lv: 4,
    f: {
      "presente": ["nasco", "nasci", "nasce", "nasciamo", "nascete", "nascono"],
      "passato prossimo": ["sono nato", "sei nato", "è nato", "siamo nati", "siete nati", "sono nati"],
      "imperfetto": ["nascevo", "nascevi", "nasceva", "nascevamo", "nascevate", "nascevano"],
      "futuro": ["nascerò", "nascerai", "nascerà", "nasceremo", "nascerete", "nasceranno"],
      "congiuntivo": ["nasca", "nasca", "nasca", "nasciamo", "nasciate", "nascano"],
    },
  },
];

export default data;
