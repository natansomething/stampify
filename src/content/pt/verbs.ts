import type { Verb } from '../types';

const data: Verb[] = [
  {
    inf: "ser", en: "to be (identity, traits)", lv: 1,
    f: {
      "presente": ["sou", "é", "somos", "são"],
      "pretérito perfeito": ["fui", "foi", "fomos", "foram"],
      "imperfeito": ["era", "era", "éramos", "eram"],
      "futuro": ["serei", "será", "seremos", "serão"],
      "subjuntivo": ["seja", "seja", "sejamos", "sejam"],
    },
  },
  {
    inf: "estar", en: "to be (location, states)", lv: 1,
    f: {
      "presente": ["estou", "está", "estamos", "estão"],
      "pretérito perfeito": ["estive", "esteve", "estivemos", "estiveram"],
      "imperfeito": ["estava", "estava", "estávamos", "estavam"],
      "futuro": ["estarei", "estará", "estaremos", "estarão"],
      "subjuntivo": ["esteja", "esteja", "estejamos", "estejam"],
    },
  },
  {
    inf: "ter", en: "to have", lv: 1,
    f: {
      "presente": ["tenho", "tem", "temos", "têm"],
      "pretérito perfeito": ["tive", "teve", "tivemos", "tiveram"],
      "imperfeito": ["tinha", "tinha", "tínhamos", "tinham"],
      "futuro": ["terei", "terá", "teremos", "terão"],
      "subjuntivo": ["tenha", "tenha", "tenhamos", "tenham"],
    },
  },
  {
    inf: "ir", en: "to go", lv: 1,
    f: {
      "presente": ["vou", "vai", "vamos", "vão"],
      "pretérito perfeito": ["fui", "foi", "fomos", "foram"],
      "imperfeito": ["ia", "ia", "íamos", "iam"],
      "futuro": ["irei", "irá", "iremos", "irão"],
      "subjuntivo": ["vá", "vá", "vamos", "vão"],
    },
  },
  {
    inf: "fazer", en: "to do; to make", lv: 1,
    f: {
      "presente": ["faço", "faz", "fazemos", "fazem"],
      "pretérito perfeito": ["fiz", "fez", "fizemos", "fizeram"],
      "imperfeito": ["fazia", "fazia", "fazíamos", "faziam"],
      "futuro": ["farei", "fará", "faremos", "farão"],
      "subjuntivo": ["faça", "faça", "façamos", "façam"],
    },
  },
  {
    inf: "poder", en: "can; to be able to", lv: 1,
    f: {
      "presente": ["posso", "pode", "podemos", "podem"],
      "pretérito perfeito": ["pude", "pôde", "pudemos", "puderam"],
      "imperfeito": ["podia", "podia", "podíamos", "podiam"],
      "futuro": ["poderei", "poderá", "poderemos", "poderão"],
      "subjuntivo": ["possa", "possa", "possamos", "possam"],
    },
  },
  {
    inf: "querer", en: "to want", lv: 1,
    f: {
      "presente": ["quero", "quer", "queremos", "querem"],
      "pretérito perfeito": ["quis", "quis", "quisemos", "quiseram"],
      "imperfeito": ["queria", "queria", "queríamos", "queriam"],
      "futuro": ["quererei", "quererá", "quereremos", "quererão"],
      "subjuntivo": ["queira", "queira", "queiramos", "queiram"],
    },
  },
  {
    inf: "falar", en: "to speak; to talk", lv: 1,
    f: {
      "presente": ["falo", "fala", "falamos", "falam"],
      "pretérito perfeito": ["falei", "falou", "falamos", "falaram"],
      "imperfeito": ["falava", "falava", "falávamos", "falavam"],
      "futuro": ["falarei", "falará", "falaremos", "falarão"],
      "subjuntivo": ["fale", "fale", "falemos", "falem"],
    },
  },
  {
    inf: "comer", en: "to eat", lv: 1,
    f: {
      "presente": ["como", "come", "comemos", "comem"],
      "pretérito perfeito": ["comi", "comeu", "comemos", "comeram"],
      "imperfeito": ["comia", "comia", "comíamos", "comiam"],
      "futuro": ["comerei", "comerá", "comeremos", "comerão"],
      "subjuntivo": ["coma", "coma", "comamos", "comam"],
    },
  },
  {
    inf: "beber", en: "to drink", lv: 1,
    f: {
      "presente": ["bebo", "bebe", "bebemos", "bebem"],
      "pretérito perfeito": ["bebi", "bebeu", "bebemos", "beberam"],
      "imperfeito": ["bebia", "bebia", "bebíamos", "bebiam"],
      "futuro": ["beberei", "beberá", "beberemos", "beberão"],
      "subjuntivo": ["beba", "beba", "bebamos", "bebam"],
    },
  },
  {
    inf: "morar", en: "to live (reside)", lv: 1,
    f: {
      "presente": ["moro", "mora", "moramos", "moram"],
      "pretérito perfeito": ["morei", "morou", "moramos", "moraram"],
      "imperfeito": ["morava", "morava", "morávamos", "moravam"],
      "futuro": ["morarei", "morará", "moraremos", "morarão"],
      "subjuntivo": ["more", "more", "moremos", "morem"],
    },
  },
  {
    inf: "gostar", en: "to like", lv: 1,
    f: {
      "presente": ["gosto", "gosta", "gostamos", "gostam"],
      "pretérito perfeito": ["gostei", "gostou", "gostamos", "gostaram"],
      "imperfeito": ["gostava", "gostava", "gostávamos", "gostavam"],
      "futuro": ["gostarei", "gostará", "gostaremos", "gostarão"],
      "subjuntivo": ["goste", "goste", "gostemos", "gostem"],
    },
  },
  {
    inf: "trabalhar", en: "to work", lv: 1,
    f: {
      "presente": ["trabalho", "trabalha", "trabalhamos", "trabalham"],
      "pretérito perfeito": ["trabalhei", "trabalhou", "trabalhamos", "trabalharam"],
      "imperfeito": ["trabalhava", "trabalhava", "trabalhávamos", "trabalhavam"],
      "futuro": ["trabalharei", "trabalhará", "trabalharemos", "trabalharão"],
      "subjuntivo": ["trabalhe", "trabalhe", "trabalhemos", "trabalhem"],
    },
  },
  {
    inf: "ver", en: "to see; to watch", lv: 1,
    f: {
      "presente": ["vejo", "vê", "vemos", "veem"],
      "pretérito perfeito": ["vi", "viu", "vimos", "viram"],
      "imperfeito": ["via", "via", "víamos", "viam"],
      "futuro": ["verei", "verá", "veremos", "verão"],
      "subjuntivo": ["veja", "veja", "vejamos", "vejam"],
    },
  },
  {
    inf: "dizer", en: "to say; to tell", lv: 1,
    f: {
      "presente": ["digo", "diz", "dizemos", "dizem"],
      "pretérito perfeito": ["disse", "disse", "dissemos", "disseram"],
      "imperfeito": ["dizia", "dizia", "dizíamos", "diziam"],
      "futuro": ["direi", "dirá", "diremos", "dirão"],
      "subjuntivo": ["diga", "diga", "digamos", "digam"],
    },
  },
  {
    inf: "saber", en: "to know (facts); can (skill)", lv: 2,
    f: {
      "presente": ["sei", "sabe", "sabemos", "sabem"],
      "pretérito perfeito": ["soube", "soube", "soubemos", "souberam"],
      "imperfeito": ["sabia", "sabia", "sabíamos", "sabiam"],
      "futuro": ["saberei", "saberá", "saberemos", "saberão"],
      "subjuntivo": ["saiba", "saiba", "saibamos", "saibam"],
    },
  },
  {
    inf: "conhecer", en: "to know (people, places); to meet", lv: 2,
    f: {
      "presente": ["conheço", "conhece", "conhecemos", "conhecem"],
      "pretérito perfeito": ["conheci", "conheceu", "conhecemos", "conheceram"],
      "imperfeito": ["conhecia", "conhecia", "conhecíamos", "conheciam"],
      "futuro": ["conhecerei", "conhecerá", "conheceremos", "conhecerão"],
      "subjuntivo": ["conheça", "conheça", "conheçamos", "conheçam"],
    },
  },
  {
    inf: "vir", en: "to come", lv: 2,
    f: {
      "presente": ["venho", "vem", "vimos", "vêm"],
      "pretérito perfeito": ["vim", "veio", "viemos", "vieram"],
      "imperfeito": ["vinha", "vinha", "vínhamos", "vinham"],
      "futuro": ["virei", "virá", "viremos", "virão"],
      "subjuntivo": ["venha", "venha", "venhamos", "venham"],
    },
  },
  {
    inf: "dar", en: "to give", lv: 2,
    f: {
      "presente": ["dou", "dá", "damos", "dão"],
      "pretérito perfeito": ["dei", "deu", "demos", "deram"],
      "imperfeito": ["dava", "dava", "dávamos", "davam"],
      "futuro": ["darei", "dará", "daremos", "darão"],
      "subjuntivo": ["dê", "dê", "demos", "deem"],
    },
  },
  {
    inf: "sair", en: "to go out; to leave", lv: 2,
    f: {
      "presente": ["saio", "sai", "saímos", "saem"],
      "pretérito perfeito": ["saí", "saiu", "saímos", "saíram"],
      "imperfeito": ["saía", "saía", "saíamos", "saíam"],
      "futuro": ["sairei", "sairá", "sairemos", "sairão"],
      "subjuntivo": ["saia", "saia", "saiamos", "saiam"],
    },
  },
  {
    inf: "dormir", en: "to sleep", lv: 2,
    f: {
      "presente": ["durmo", "dorme", "dormimos", "dormem"],
      "pretérito perfeito": ["dormi", "dormiu", "dormimos", "dormiram"],
      "imperfeito": ["dormia", "dormia", "dormíamos", "dormiam"],
      "futuro": ["dormirei", "dormirá", "dormiremos", "dormirão"],
      "subjuntivo": ["durma", "durma", "durmamos", "durmam"],
    },
  },
  {
    inf: "ficar", en: "to stay; to be (located); to become", lv: 2,
    f: {
      "presente": ["fico", "fica", "ficamos", "ficam"],
      "pretérito perfeito": ["fiquei", "ficou", "ficamos", "ficaram"],
      "imperfeito": ["ficava", "ficava", "ficávamos", "ficavam"],
      "futuro": ["ficarei", "ficará", "ficaremos", "ficarão"],
      "subjuntivo": ["fique", "fique", "fiquemos", "fiquem"],
    },
  },
  {
    inf: "ler", en: "to read", lv: 2,
    f: {
      "presente": ["leio", "lê", "lemos", "leem"],
      "pretérito perfeito": ["li", "leu", "lemos", "leram"],
      "imperfeito": ["lia", "lia", "líamos", "liam"],
      "futuro": ["lerei", "lerá", "leremos", "lerão"],
      "subjuntivo": ["leia", "leia", "leiamos", "leiam"],
    },
  },
  {
    inf: "pedir", en: "to ask for; to order", lv: 2,
    f: {
      "presente": ["peço", "pede", "pedimos", "pedem"],
      "pretérito perfeito": ["pedi", "pediu", "pedimos", "pediram"],
      "imperfeito": ["pedia", "pedia", "pedíamos", "pediam"],
      "futuro": ["pedirei", "pedirá", "pediremos", "pedirão"],
      "subjuntivo": ["peça", "peça", "peçamos", "peçam"],
    },
  },
  {
    inf: "ouvir", en: "to hear; to listen", lv: 2,
    f: {
      "presente": ["ouço", "ouve", "ouvimos", "ouvem"],
      "pretérito perfeito": ["ouvi", "ouviu", "ouvimos", "ouviram"],
      "imperfeito": ["ouvia", "ouvia", "ouvíamos", "ouviam"],
      "futuro": ["ouvirei", "ouvirá", "ouviremos", "ouvirão"],
      "subjuntivo": ["ouça", "ouça", "ouçamos", "ouçam"],
    },
  },
  {
    inf: "trazer", en: "to bring", lv: 3,
    f: {
      "presente": ["trago", "traz", "trazemos", "trazem"],
      "pretérito perfeito": ["trouxe", "trouxe", "trouxemos", "trouxeram"],
      "imperfeito": ["trazia", "trazia", "trazíamos", "traziam"],
      "futuro": ["trarei", "trará", "traremos", "trarão"],
      "subjuntivo": ["traga", "traga", "tragamos", "tragam"],
    },
  },
  {
    inf: "pôr", en: "to put; to place", lv: 3,
    f: {
      "presente": ["ponho", "põe", "pomos", "põem"],
      "pretérito perfeito": ["pus", "pôs", "pusemos", "puseram"],
      "imperfeito": ["punha", "punha", "púnhamos", "punham"],
      "futuro": ["porei", "porá", "poremos", "porão"],
      "subjuntivo": ["ponha", "ponha", "ponhamos", "ponham"],
    },
  },
  {
    inf: "perder", en: "to lose; to miss", lv: 3,
    f: {
      "presente": ["perco", "perde", "perdemos", "perdem"],
      "pretérito perfeito": ["perdi", "perdeu", "perdemos", "perderam"],
      "imperfeito": ["perdia", "perdia", "perdíamos", "perdiam"],
      "futuro": ["perderei", "perderá", "perderemos", "perderão"],
      "subjuntivo": ["perca", "perca", "percamos", "percam"],
    },
  },
  {
    inf: "sentir", en: "to feel; to be sorry", lv: 3,
    f: {
      "presente": ["sinto", "sente", "sentimos", "sentem"],
      "pretérito perfeito": ["senti", "sentiu", "sentimos", "sentiram"],
      "imperfeito": ["sentia", "sentia", "sentíamos", "sentiam"],
      "futuro": ["sentirei", "sentirá", "sentiremos", "sentirão"],
      "subjuntivo": ["sinta", "sinta", "sintamos", "sintam"],
    },
  },
  {
    inf: "preferir", en: "to prefer", lv: 3,
    f: {
      "presente": ["prefiro", "prefere", "preferimos", "preferem"],
      "pretérito perfeito": ["preferi", "preferiu", "preferimos", "preferiram"],
      "imperfeito": ["preferia", "preferia", "preferíamos", "preferiam"],
      "futuro": ["preferirei", "preferirá", "preferiremos", "preferirão"],
      "subjuntivo": ["prefira", "prefira", "prefiramos", "prefiram"],
    },
  },
  {
    inf: "seguir", en: "to follow; to carry on", lv: 3,
    f: {
      "presente": ["sigo", "segue", "seguimos", "seguem"],
      "pretérito perfeito": ["segui", "seguiu", "seguimos", "seguiram"],
      "imperfeito": ["seguia", "seguia", "seguíamos", "seguiam"],
      "futuro": ["seguirei", "seguirá", "seguiremos", "seguirão"],
      "subjuntivo": ["siga", "siga", "sigamos", "sigam"],
    },
  },
  {
    inf: "começar", en: "to begin; to start", lv: 3,
    f: {
      "presente": ["começo", "começa", "começamos", "começam"],
      "pretérito perfeito": ["comecei", "começou", "começamos", "começaram"],
      "imperfeito": ["começava", "começava", "começávamos", "começavam"],
      "futuro": ["começarei", "começará", "começaremos", "começarão"],
      "subjuntivo": ["comece", "comece", "comecemos", "comecem"],
    },
  },
  {
    inf: "conseguir", en: "to manage to; to get", lv: 3,
    f: {
      "presente": ["consigo", "consegue", "conseguimos", "conseguem"],
      "pretérito perfeito": ["consegui", "conseguiu", "conseguimos", "conseguiram"],
      "imperfeito": ["conseguia", "conseguia", "conseguíamos", "conseguiam"],
      "futuro": ["conseguirei", "conseguirá", "conseguiremos", "conseguirão"],
      "subjuntivo": ["consiga", "consiga", "consigamos", "consigam"],
    },
  },
  {
    inf: "escolher", en: "to choose", lv: 4,
    f: {
      "presente": ["escolho", "escolhe", "escolhemos", "escolhem"],
      "pretérito perfeito": ["escolhi", "escolheu", "escolhemos", "escolheram"],
      "imperfeito": ["escolhia", "escolhia", "escolhíamos", "escolhiam"],
      "futuro": ["escolherei", "escolherá", "escolheremos", "escolherão"],
      "subjuntivo": ["escolha", "escolha", "escolhamos", "escolham"],
    },
  },
  {
    inf: "subir", en: "to go up; to climb; to rise", lv: 4,
    f: {
      "presente": ["subo", "sobe", "subimos", "sobem"],
      "pretérito perfeito": ["subi", "subiu", "subimos", "subiram"],
      "imperfeito": ["subia", "subia", "subíamos", "subiam"],
      "futuro": ["subirei", "subirá", "subiremos", "subirão"],
      "subjuntivo": ["suba", "suba", "subamos", "subam"],
    },
  },
  {
    inf: "manter", en: "to keep; to maintain", lv: 4,
    f: {
      "presente": ["mantenho", "mantém", "mantemos", "mantêm"],
      "pretérito perfeito": ["mantive", "manteve", "mantivemos", "mantiveram"],
      "imperfeito": ["mantinha", "mantinha", "mantínhamos", "mantinham"],
      "futuro": ["manterei", "manterá", "manteremos", "manterão"],
      "subjuntivo": ["mantenha", "mantenha", "mantenhamos", "mantenham"],
    },
  },
  {
    inf: "caber", en: "to fit; to be up to", lv: 4,
    f: {
      "presente": ["caibo", "cabe", "cabemos", "cabem"],
      "pretérito perfeito": ["coube", "coube", "coubemos", "couberam"],
      "imperfeito": ["cabia", "cabia", "cabíamos", "cabiam"],
      "futuro": ["caberei", "caberá", "caberemos", "caberão"],
      "subjuntivo": ["caiba", "caiba", "caibamos", "caibam"],
    },
  },
  {
    inf: "valer", en: "to be worth", lv: 4,
    f: {
      "presente": ["valho", "vale", "valemos", "valem"],
      "pretérito perfeito": ["vali", "valeu", "valemos", "valeram"],
      "imperfeito": ["valia", "valia", "valíamos", "valiam"],
      "futuro": ["valerei", "valerá", "valeremos", "valerão"],
      "subjuntivo": ["valha", "valha", "valhamos", "valham"],
    },
  },
  {
    inf: "construir", en: "to build", lv: 4,
    f: {
      "presente": ["construo", "constrói", "construímos", "constroem"],
      "pretérito perfeito": ["construí", "construiu", "construímos", "construíram"],
      "imperfeito": ["construía", "construía", "construíamos", "construíam"],
      "futuro": ["construirei", "construirá", "construiremos", "construirão"],
      "subjuntivo": ["construa", "construa", "construamos", "construam"],
    },
  },
  {
    inf: "repetir", en: "to repeat", lv: 4,
    f: {
      "presente": ["repito", "repete", "repetimos", "repetem"],
      "pretérito perfeito": ["repeti", "repetiu", "repetimos", "repetiram"],
      "imperfeito": ["repetia", "repetia", "repetíamos", "repetiam"],
      "futuro": ["repetirei", "repetirá", "repetiremos", "repetirão"],
      "subjuntivo": ["repita", "repita", "repitamos", "repitam"],
    },
  },
];

export default data;
