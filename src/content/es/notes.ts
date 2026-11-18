import type { GrammarNote } from '../types';
import d1 from './notes-d1';
import d2 from './notes-d2';
import d3 from './notes-d3';
import d4 from './notes-d4';

const base: GrammarNote[] = [
  // es-1-market
  { text: "es-1-market", s: 0, w: ["vive"], title: "Present tense of -ir verbs", x: "'vive' is vivir (to live) for he/she: drop -ir and add -e. Yo vivo, tú vives, él/ella vive." },
  { text: "es-1-market", s: 1, w: ["al"], title: "a + el = al", x: "'a' (to) and 'el' (the) always join: 'va al mercado', not 'va a el mercado'. 'a la' does not change: 'va a la playa'." },
  { text: "es-1-market", s: 4, w: ["hombre", "mayor"], title: "Adjective after the noun", x: "Most adjectives come after the noun: 'un hombre mayor' (an old man), 'un trozo pequeño' (a small piece)." },
  { text: "es-1-market", s: 5, w: ["Cuánto", "cuesta"], title: "Stem change o → ue", x: "'cuesta' comes from costar: the o becomes ue when stressed. Questions open with ¿ and close with ?." },
  { text: "es-1-market", s: 9, w: ["está", "bueno"], title: "estar + bueno: tastes good", x: "'está muy bueno' uses estar: the cheese tastes good right now. With ser, 'es bueno' says it is good quality in general." },
  // es-1-coffee
  { text: "es-1-coffee", s: 0, w: ["la", "gente", "toma"], title: "'la gente' takes a singular verb", x: "'la gente' (people) is singular in Spanish, so the verb is singular: 'la gente toma', not 'toman'." },
  { text: "es-1-coffee", s: 1, w: ["muchas", "personas"], title: "mucho agrees with the noun", x: "'mucho' changes to match the noun: 'mucho café' (m), 'mucha leche' (f), 'muchas personas' (f, plural)." },
  { text: "es-1-coffee", s: 3, w: ["Después", "de", "comer"], title: "Preposition + infinitive", x: "After a preposition Spanish uses the infinitive: 'después de comer' = after eating. English uses -ing here." },
  { text: "es-1-coffee", s: 5, w: ["hay"], title: "hay: there is / there are", x: "'hay' means both 'there is' and 'there are' and never changes: 'hay un bar', 'hay bares'." },
  { text: "es-1-coffee", s: 8, w: ["no", "es"], title: "Negation with no", x: "To make a sentence negative, put 'no' right before the verb: 'no es caro' = it is not expensive." },
  // es-1-neighbor-cat
  { text: "es-1-neighbor-cat", s: 1, w: ["se", "llama"], title: "llamarse: to be called", x: "'se llama' is from llamarse, literally 'calls himself'. Me llamo Ana, te llamas, se llama." },
  { text: "es-1-neighbor-cat", s: 3, w: ["le", "doy"], title: "le: to him / to her", x: "'le' means 'to him' (the cat) and goes before the verb. 'doy' is the irregular yo form of dar (to give)." },
  { text: "es-1-neighbor-cat", s: 6, w: ["conmigo"], title: "conmigo: with me", x: "con + mí becomes one word, 'conmigo'. In the same way con + ti becomes 'contigo'." },
  { text: "es-1-neighbor-cat", s: 7, w: ["Está", "preocupada"], title: "estar for feelings", x: "Feelings and states use estar: 'está preocupada' (she is worried). The adjective ends in -a because Rosa is female." },
  { text: "es-1-neighbor-cat", s: 9, w: ["El", "martes", "a"], title: "Personal a", x: "When the object of a verb is a person or a pet, Spanish puts 'a' before it: 'veo a Sol'. 'El martes' = on Tuesday, with no word for 'on'." },
  { text: "es-1-neighbor-cat", s: 12, w: ["tenemos"], title: "Verb for 'X and I'", x: "'Rosa, don Manuel y yo' includes me, so the verb takes the nosotros (we) form: 'tenemos', from tener." },
  // es-1-tapas
  { text: "es-1-tapas", s: 1, w: ["Una", "un"], title: "Gender: un and una", x: "Every noun is masculine or feminine. 'tapa' is feminine, so 'una tapa'; 'plato' is masculine, so 'un plato'." },
  { text: "es-1-tapas", s: 2, w: ["de", "queso"], title: "de + noun to describe", x: "Spanish uses 'de' where English puts a noun in front: 'tapas de queso' = cheese tapas, 'tortilla de patatas' = potato omelette." },
  { text: "es-1-tapas", s: 5, w: ["comen"], title: "-er verbs: they form", x: "'comen' is comer for they: drop -er and add -en. Compare -ar verbs: 'toman' (-an)." },
  { text: "es-1-tapas", s: 7, w: ["Pides"], title: "tú for 'you' in general", x: "'Pides' (you order) is the tú form, used here for anyone. It comes from pedir, where e changes to i: pido, pides, pide." },
  { text: "es-1-tapas", s: 9, w: ["toman"], title: "Subject pronoun left out", x: "The ending -an already shows 'they', so 'ellos' is not needed: 'toman una bebida' = they have a drink." },
  { text: "es-1-tapas", s: 10, w: ["Ir", "es"], title: "Infinitive as subject", x: "An infinitive can be the subject of a sentence: 'Ir de tapas es...' = Going out for tapas is... English uses -ing." },
  // es-2-valencia-trip
  { text: "es-2-valencia-trip", s: 0, w: ["fueron"], title: "Preterite of ir: fueron", x: "'fueron' (they went) is the past of ir. It is irregular: fui, fuiste, fue, fuimos, fueron. Ser has the same forms." },
  { text: "es-2-valencia-trip", s: 2, w: ["llegaron", "dejaron"], title: "Preterite -ar verbs: -aron", x: "For 'they' in the past, -ar verbs end in -aron: llegar → llegaron, dejar → dejaron. The preterite tells finished events." },
  { text: "es-2-valencia-trip", s: 7, w: ["hizo", "calor"], title: "Weather with hacer", x: "Spanish says the weather 'makes' heat: 'hace calor' (it is hot). 'hizo' is the irregular past of hacer." },
  { text: "es-2-valencia-trip", s: 8, w: ["leyó", "nadó"], title: "Preterite: he/she form", x: "For he/she, the preterite ends in -ó (nadar → nadó) or -ió (comer → comió). Leer adds a y: 'leyó'." },
  { text: "es-2-valencia-trip", s: 10, w: ["estaban", "cansadas"], title: "Imperfect for a state", x: "'estaban' is the imperfect of estar: it describes how they were, not an event. 'cansadas' is feminine plural to match 'las dos'." },
  { text: "es-2-valencia-trip", s: 11, w: ["quieren", "volver"], title: "querer + infinitive", x: "'quieren volver' = they want to go back: querer is followed by an infinitive. Querer changes e to ie: quiero, quieren." },
  // es-2-city-bikes
  { text: "es-2-city-bikes", s: 1, w: ["dejarla"], title: "Pronoun joined to infinitive", x: "'dejarla' = to leave it. Object pronouns can be attached to the end of an infinitive; 'la' is 'la bicicleta'." },
  { text: "es-2-city-bikes", s: 2, w: ["hay", "que", "pagar"], title: "hay que + infinitive", x: "'hay que' + infinitive means 'you have to / one must', without saying who: 'hay que pagar una cuota'." },
  { text: "es-2-city-bikes", s: 4, w: ["Antes", "iba"], title: "Imperfect for 'used to'", x: "'iba' is the imperfect of ir. It describes what was usual in the past: 'Antes poca gente iba en bicicleta' = few people used to cycle." },
  { text: "es-2-city-bikes", s: 5, w: ["los", "usan"], title: "Object pronoun before the verb", x: "'los usan' = they use them. 'los' stands for 'los carriles bici' and comes before the conjugated verb." },
  { text: "es-2-city-bikes", s: 9, w: ["demasiado", "para", "ir"], title: "demasiado ... para + infinitive", x: "'hace demasiado calor para ir en bici' = it is too hot to cycle. demasiado = too (much); para + infinitive = to do." },
  // es-2-salsa-class
  { text: "es-2-salsa-class", s: 0, w: ["aprender", "a", "bailar"], title: "aprender a + infinitive", x: "Some verbs need 'a' before an infinitive: 'aprender a bailar' (learn to dance), 'empezar a', 'volver a'." },
  { text: "es-2-salsa-class", s: 1, w: ["Nunca", "bailaba"], title: "nunca before the verb", x: "'Nunca bailaba' = she never danced: with nunca first, no 'no' is needed. 'bailaba' is the imperfect, for a repeated past habit." },
  { text: "es-2-salsa-class", s: 3, w: ["Había"], title: "había: there were", x: "'había' is the past of hay and also does not change: 'había veinte personas' = there were twenty people." },
  { text: "es-2-salsa-class", s: 5, w: ["intentó", "equivocaba"], title: "Preterite vs imperfect", x: "'intentó' (preterite) is one finished action. 'se equivocaba' (imperfect) is what kept happening during it: she kept making mistakes." },
  { text: "es-2-salsa-class", s: 6, w: ["se", "puso", "roja"], title: "ponerse + adjective: become", x: "'se puso roja' = she went red. ponerse + adjective describes a sudden change of state. 'puso' is the irregular past of poner." },
  { text: "es-2-salsa-class", s: 8, w: ["le", "dijo"], title: "dijo: past of decir", x: "'le dijo' = he said to her. 'dijo' is the irregular preterite of decir, and 'le' is the person spoken to." },
  { text: "es-2-salsa-class", s: 13, w: ["mejor"], title: "mejor: better, best", x: "'mejor' is the irregular comparative of bueno: 'mejor' = better, 'su mejor amigo' = her best friend. Not 'más bueno'." },
  // es-2-village-fiestas
  { text: "es-2-village-fiestas", s: 0, w: ["sus", "fiestas"], title: "su / sus", x: "'su' becomes 'sus' when the thing owned is plural: 'sus fiestas'. It can mean his, her, its or their: here, the villages'." },
  { text: "es-2-village-fiestas", s: 2, w: ["que", "vive"], title: "Relative pronoun que", x: "'que' links a description to a noun: 'gente que vive en la ciudad' = people who live in the city. 'que' works for people and things." },
  { text: "es-2-village-fiestas", s: 3, w: ["están", "llenas", "de"], title: "estar lleno de", x: "'están llenas de luces' = are full of lights. estar for a state; 'llenas' agrees with 'las calles' (feminine plural)." },
  { text: "es-2-village-fiestas", s: 8, w: ["hasta", "las", "cinco"], title: "Telling the time", x: "Hours take 'la' or 'las' (la una, las cinco), because 'hora' is feminine: 'hasta las cinco' = until five." },
  { text: "es-2-village-fiestas", s: 9, w: ["se", "sientan"], title: "Reflexive verb sentarse", x: "'se sientan' = they sit down, from sentarse (e → ie). The reflexive 'se' is part of the verb." },
  { text: "es-2-village-fiestas", s: 13, w: ["el", "mejor", "momento", "del"], title: "Superlative: el mejor ... de", x: "'el mejor momento del verano' = the best time of the summer. Spanish uses 'de' (here del) where English uses 'of' or 'in'." },
  { text: "es-2-village-fiestas", s: 14, w: ["a"], title: "Personal a with people", x: "'ver a la familia y a los amigos': 'a' goes before each person who is the object of the verb." },
  // es-3-grandmother-letter
  { text: "es-3-grandmother-letter", s: 2, w: ["estaba", "dirigida"], title: "estar + past participle", x: "'estaba dirigida' = was addressed. estar + participle describes a resulting state; the participle agrees with 'la carta' (-a)." },
  { text: "es-3-grandmother-letter", s: 4, w: ["había", "sido"], title: "Pluperfect: había + participle", x: "'había sido' = had been. Use it for something that happened before another past moment. Forms: había, habías, había, habían + participle." },
  { text: "es-3-grandmother-letter", s: 7, w: ["mientras", "escuchaba"], title: "Imperfect for background", x: "'la leyó' is the event; 'mientras su madre escuchaba' is the background action going on at the same time, in the imperfect." },
  { text: "es-3-grandmother-letter", s: 10, w: ["estarían"], title: "Conditional: would", x: "'estarían' = they would be. The conditional adds -ía endings to the infinitive: estar → estaría, estarían." },
  // es-3-siesta
  { text: "es-3-siesta", s: 3, w: ["descansaban"], title: "Imperfect for past customs", x: "'descansaban' (they used to rest) describes a regular habit in the past, so it is in the imperfect: -ar verbs take -aba, -aban." },
  { text: "es-3-siesta", s: 7, w: ["Si", "dura"], title: "si + present", x: "For a real condition, 'si' takes the present: 'Si la siesta dura demasiado, es normal...'. Never the future after si." },
  { text: "es-3-siesta", s: 10, w: ["está", "poniendo"], title: "estar + gerund", x: "'se está poniendo de moda' = is becoming fashionable. estar + gerund (-ando/-iendo) shows a process happening now." },
  { text: "es-3-siesta", s: 11, w: ["Quizás", "sea"], title: "quizás + subjunctive", x: "'sea' is the subjunctive of ser. After quizás (perhaps) the subjunctive stresses doubt; here it refers to the future." },
  // es-3-wrong-train
  { text: "es-3-wrong-train", s: 2, w: ["estaba", "a", "punto", "de"], title: "estar a punto de", x: "estar a punto de + infinitive = to be about to: 'el tren estaba a punto de salir' = the train was about to leave." },
  { text: "es-3-wrong-train", s: 6, w: ["había", "tomado"], title: "Pluperfect: had taken", x: "'había tomado' = had taken. The mistake happened before the moment he realised it, so Spanish uses haber in the imperfect + participle." },
  { text: "es-3-wrong-train", s: 7, w: ["Tuvo", "que"], title: "tener que: have to", x: "tener que + infinitive = have to. 'Tuvo que bajarse' = he had to get off; 'tuvo' is the irregular preterite of tener." },
  { text: "es-3-wrong-train", s: 11, w: ["acababa", "de", "abrir"], title: "acabar de: have just", x: "acabar de + infinitive = to have just done: 'acababa de abrir' = she had just opened." },
  { text: "es-3-wrong-train", s: 14, w: ["A", "Lucía", "le", "gustaron"], title: "gustar agrees with the thing", x: "With gustar the thing liked is the subject: 'le gustaron' (plural) because 'sus trabajos' are plural. 'A Lucía le' names the person who likes them." },
  // es-3-dinner-time
  { text: "es-3-dinner-time", s: 1, w: ["lo", "normal"], title: "lo + adjective", x: "lo + adjective makes an abstract idea: 'lo normal' = what is normal, the normal thing." },
  { text: "es-3-dinner-time", s: 4, w: ["debería"], title: "debería: should", x: "'debería' is the conditional of deber and means 'should': 'España debería tener la misma hora' = Spain should have the same time." },
  { text: "es-3-dinner-time", s: 5, w: ["desde", "usa"], title: "desde + present tense", x: "For something that started in the past and still goes on, Spanish uses the present: 'desde 1940 usa' = it has used since 1940." },
  { text: "es-3-dinner-time", s: 8, w: ["Como"], title: "como: since, because", x: "At the start of a sentence, 'como' means 'since / as': 'Como la gente organiza su día según la luz, ...'." },
  { text: "es-3-dinner-time", s: 18, w: ["no", "tengas"], title: "Negative tú command", x: "Negative commands use the subjunctive: 'no tengas prisa' = don't be in a hurry. Compare the positive 'ten paciencia'." },
  // es-3-el-camino-de-santiago
  { text: "es-3-el-camino-de-santiago", s: 0, w: ["se", "ponen", "las", "botas"], title: "Article for clothes", x: "With clothes and body parts Spanish uses the article, not a possessive: 'se ponen las botas' = they put on their boots." },
  { text: "es-3-el-camino-de-santiago", s: 2, w: ["se", "recorría"], title: "Impersonal se", x: "se + verb in the 3rd person makes a sentence with no specific subject: 'ya se recorría' = people already walked it, it was already walked." },
  { text: "es-3-el-camino-de-santiago", s: 3, w: ["sigue", "haciendo"], title: "seguir + gerund: still", x: "seguir + gerund = to keep doing, still do: 'lo sigue haciendo tanta gente' = so many people still do it." },
  { text: "es-3-el-camino-de-santiago", s: 5, w: ["La", "más", "famosa"], title: "Superlative: la más ...", x: "article + más + adjective = the most: 'la más famosa' = the most famous (one). The noun 'ruta' is understood." },
  { text: "es-3-el-camino-de-santiago", s: 13, w: ["has", "hecho"], title: "Present perfect, irregular participle", x: "'has hecho' = you have done: haber + participle. hacer has the irregular participle 'hecho' (not 'hacido')." },
  { text: "es-3-el-camino-de-santiago", s: 15, w: ["amarillas", "pintadas"], title: "Participle as adjective", x: "A participle used as an adjective agrees like one: 'flechas amarillas pintadas' (arrows painted yellow), feminine plural like 'flechas'." },
  { text: "es-3-el-camino-de-santiago", s: 31, w: ["Hay", "quien"], title: "hay quien: some people", x: "'Hay quien camina...' = there are those who walk, some people walk. Note the singular 'quien' and 'camina'." },
  { text: "es-3-el-camino-de-santiago", s: 37, w: ["no", "sino"], title: "no ... sino: not ... but", x: "After a negative, 'but' (= instead) is 'sino', not 'pero': 'no es la velocidad, sino llegar'." },
  { text: "es-3-el-camino-de-santiago", s: 40, w: ["camines", "úsalas"], title: "Negative and positive commands", x: "Negative tú commands use the subjunctive: 'nunca camines'. Positive ones use a different form and attach pronouns: usa + las = 'úsalas' (with an accent)." },
  { text: "es-3-el-camino-de-santiago", s: 45, w: ["llegues", "entenderás"], title: "cuando + subjunctive for future", x: "When 'cuando' refers to the future, it takes the subjunctive: 'cuando llegues' = when you arrive. The main verb is future: 'entenderás'." },
  // es-3-el-cuarto-examen
  { text: "es-3-el-cuarto-examen", s: 0, w: ["tenía", "años"], title: "Age with tener", x: "Spanish uses tener for age: 'tenía treinta y ocho años' = she was thirty-eight (literally 'had 38 years')." },
  { text: "es-3-el-cuarto-examen", s: 1, w: ["Había", "estudiado"], title: "Pluperfect: had studied", x: "'Había estudiado' = she had studied: these things happened before that Tuesday. Form: había + participle (-ado, -ido)." },
  { text: "es-3-el-cuarto-examen", s: 2, w: ["estaba", "hablaba"], title: "Imperfect for what usually happened", x: "'cuando estaba nerviosa, hablaba' = whenever she was nervous, she talked. Both verbs are imperfect because it happened repeatedly." },
  { text: "es-3-el-cuarto-examen", s: 4, w: ["le", "contó", "al", "examinador"], title: "Doubled indirect object", x: "Spanish often keeps 'le' even when the person is named: 'le contó al examinador' = she told the examiner. It sounds natural, not repetitive." },
  { text: "es-3-el-cuarto-examen", s: 11, w: ["si", "era"], title: "si: whether, if", x: "In an indirect question 'si' means 'whether': 'le preguntó si era profesora'. The verb moves into the past: 'era'." },
  { text: "es-3-el-cuarto-examen", s: 17, w: ["iba", "a", "estar"], title: "ir a in the past", x: "ir a + infinitive is the near future; in the imperfect it means 'was going to': 'iba a estar callada'." },
  { text: "es-3-el-cuarto-examen", s: 20, w: ["Gire"], title: "Formal command (usted)", x: "'Gire' is a polite command to usted, from girar: -ar verbs take -e. To a friend you would say 'gira'." },
  { text: "es-3-el-cuarto-examen", s: 39, w: ["Ha", "aprobado"], title: "usted with 3rd person verb", x: "Usted uses the he/she verb form: 'Ha aprobado' = you have passed. The present perfect is common for something that just happened today." },
  { text: "es-3-el-cuarto-examen", s: 45, w: ["me", "lo", "puedo"], title: "Two pronouns: me lo", x: "When two object pronouns meet, the indirect one comes first: 'me lo' (to me + it). Both go before the conjugated verb 'puedo'." },
  // es-4-violin
  { text: "es-4-violin", s: 1, w: ["Llevaba", "años"], title: "llevar + time", x: "llevar + time + participle or gerund says how long a situation has lasted: 'Llevaba años guardado' = it had been stored for years." },
  { text: "es-4-violin", s: 2, w: ["insistió", "en", "que", "llevara"], title: "insistir en que + subjunctive", x: "When insisting that someone do something, use the subjunctive. After a past verb it is the imperfect subjunctive: 'llevara' (from llevarse)." },
  { text: "es-4-violin", s: 4, w: ["Al", "girarlo"], title: "al + infinitive: when", x: "al + infinitive = when / as (doing): 'Al girarlo' = when I turned it. 'lo' is joined to the infinitive." },
  { text: "es-4-violin", s: 8, w: ["dejara", "de", "tocar"], title: "dejar de: stop doing", x: "dejar de + infinitive = to stop doing: 'que no dejara de tocar' = not to stop playing. 'dejara' is subjunctive after 'le pedía que'." },
  // es-4-siesta
  { text: "es-4-siesta", s: 2, w: ["hacen", "que", "sea"], title: "hacer que + subjunctive", x: "hacer que + subjunctive = to make something happen: 'hacen que volver a casa sea casi imposible' = make going home almost impossible." },
  { text: "es-4-siesta", s: 7, w: ["han", "demostrado"], title: "Present perfect for results", x: "'han demostrado' = have shown: haber + participle for past findings that still matter now." },
  { text: "es-4-siesta", s: 13, w: ["deje", "convierta"], title: "Subjunctive after quizás", x: "After quizás the verbs are subjunctive to show uncertainty: 'deje de ser' (stops being), 'se convierta en' (becomes)." },
  { text: "es-4-siesta", s: 14, w: ["hace", "falta"], title: "hace falta: it is necessary", x: "hace falta + infinitive = it is necessary to: 'no hace falta viajar' = there is no need to travel." },
  // es-4-lost-recipe
  { text: "es-4-lost-recipe", s: 1, w: ["Lo", "que", "haga"], title: "lo que + subjunctive", x: "'Lo que haga falta' = whatever is needed. The subjunctive 'haga' shows the amount is unknown or open." },
  { text: "es-4-lost-recipe", s: 2, w: ["el", "que"], title: "el que: the one that", x: "'el que' = the one that, here referring to a dish (plato, m). It would be 'la que' for a feminine noun." },
  { text: "es-4-lost-recipe", s: 10, w: ["se", "lo", "comía", "todo"], title: "comerse + todo", x: "'comerse' (with se) means to eat up. When 'todo' is the object, Spanish adds 'lo': 'se lo comía todo' = he ate it all up." },
  { text: "es-4-lost-recipe", s: 14, w: ["sí"], title: "Emphatic sí", x: "Stressed 'sí' before a verb contradicts what was thought: 'sí las había escrito' = she DID write them down. Note the accent (si = if)." },
  { text: "es-4-lost-recipe", s: 18, w: ["Remover", "pensar"], title: "Infinitive for instructions", x: "Recipes and notices often give instructions with the infinitive: 'Remover despacio' = stir slowly." },
  { text: "es-4-lost-recipe", s: 19, w: ["quedé", "mirando"], title: "quedarse + gerund", x: "quedarse + gerund = to stay doing something, keep doing it for a while: 'Me quedé un buen rato mirando'." },
  // es-4-remote-villages
  { text: "es-4-remote-villages", s: 0, w: ["han", "ido", "perdiendo"], title: "ir + gerund: gradually", x: "ir + gerund shows a slow, gradual process: 'han ido perdiendo habitantes' = have been gradually losing inhabitants." },
  { text: "es-4-remote-villages", s: 4, w: ["podría"], title: "Conditional for possibility", x: "'podría' (could) is the conditional of poder: it presents the change as possible, not certain." },
  { text: "es-4-remote-villages", s: 14, w: ["Quien"], title: "quien: whoever", x: "'Quien se muda al campo' = whoever / anyone who moves. Quien here has no noun before it and takes a singular verb." },
  { text: "es-4-remote-villages", s: 16, w: ["temen", "que", "suban"], title: "temer que + subjunctive", x: "Verbs of fear take the subjunctive: 'temen que suban los precios' = they fear (that) prices will go up." },
  { text: "es-4-remote-villages", s: 18, w: ["acabarán", "volviendo"], title: "acabar + gerund: end up", x: "acabar + gerund = to end up doing: 'acabarán volviendo' = they will end up going back (future of acabar)." },
  { text: "es-4-remote-villages", s: 24, w: ["dependa", "de", "que", "vuelva"], title: "depender de que + subjunctive", x: "'depender de que' is followed by the subjunctive: 'de que esa red vuelva a tejerse'. 'dependa' is subjunctive because of quizá." },
  // es-4-el-turno-de-noche
  { text: "es-4-el-turno-de-noche", s: 0, w: ["llevaba", "años", "conduciendo"], title: "llevar + time + gerund", x: "'llevaba seis años conduciendo' = she had been driving for six years. llevar + time + gerund replaces English 'have/had been -ing for'." },
  { text: "es-4-el-turno-de-noche", s: 1, w: ["se", "oían"], title: "Passive se, plural verb", x: "With se, the verb agrees with the thing: 'se oían los perros' (plural) = the dogs could be heard. Singular: 'se oía un perro'." },
  { text: "es-4-el-turno-de-noche", s: 7, w: ["como", "si", "fueran"], title: "como si + imperfect subjunctive", x: "'como si' (as if) is always followed by the subjunctive: 'como si fueran estrellas' = as if they were stars." },
  { text: "es-4-el-turno-de-noche", s: 8, w: ["al", "que"], title: "Relative al que: whom", x: "'al que' = a + el que, 'whom'. The 'a' is the personal a of 'despertar a alguien': the student whom Lucía had to wake." },
  { text: "es-4-el-turno-de-noche", s: 9, w: ["que", "ya", "estamos"], title: "Colloquial que", x: "In speech, 'que' at the start adds urgency to a statement: 'que ya estamos' = come on, we're here." },
  { text: "es-4-el-turno-de-noche", s: 13, w: ["cuatro", "menos", "veinte"], title: "Time with menos", x: "Minutes before the hour use 'menos': 'las cuatro menos veinte' = twenty to four (3:40)." },
  { text: "es-4-el-turno-de-noche", s: 16, w: ["uno", "se", "acostumbra"], title: "uno: one, you", x: "'uno' is a general subject, like English 'you' or 'one', and is needed with reflexive verbs: 'como uno se acostumbra'." },
  { text: "es-4-el-turno-de-noche", s: 25, w: ["volvió", "a", "quedarse"], title: "volver a: again", x: "volver a + infinitive = to do again: 'volvió a quedarse en su asiento' = he stayed in his seat again." },
  { text: "es-4-el-turno-de-noche", s: 32, w: ["Solía", "aprovecharlos"], title: "soler: usually", x: "soler + infinitive = to usually do: 'Solía aprovecharlos' = she usually used them (los = the ten minutes)." },
  { text: "es-4-el-turno-de-noche", s: 33, w: ["Perdone", "le"], title: "Polite usted", x: "Lucía uses usted with a stranger: 'Perdone' is the usted command of perdonar, and 'le' means 'to you' (usted)." },
  { text: "es-4-el-turno-de-noche", s: 37, w: ["Dijo", "que", "llamaba"], title: "Reported speech: imperfect", x: "His words 'me llamo Ernesto, tengo 78 años' become 'dijo que se llamaba ... y que tenía': present turns into imperfect." },
  { text: "es-4-el-turno-de-noche", s: 42, w: ["daría", "oírla"], title: "Conditional: I would give", x: "'daría' = I would give, the conditional of dar. 'oírla' = to hear her, with the pronoun on the infinitive." },
  { text: "es-4-el-turno-de-noche", s: 47, w: ["no", "te", "preocupes"], title: "Negative command, reflexive verb", x: "In a negative command the pronoun goes before the verb, which is subjunctive: 'no te preocupes'. Positive: 'preocúpate'." },
  { text: "es-4-el-turno-de-noche", s: 57, w: ["Se", "me", "ha", "ido"], title: "se me: it happened to me", x: "'Se me ha ido el ayudante' = my assistant has left me. se + me shows Paco as the person affected." },
  { text: "es-4-el-turno-de-noche", s: 63, w: ["esperó", "a", "que", "sentara"], title: "esperar a que + subjunctive", x: "esperar a que + subjunctive = to wait until: 'esperó a que se sentara' = she waited until he sat down." },
  { text: "es-4-el-turno-de-noche", s: 68, w: ["hubiera", "gastado"], title: "Pluperfect subjunctive", x: "'como si le hubiera gastado una broma' = as if she had played a joke on him. hubiera + participle refers to an earlier action." },
  { text: "es-4-el-turno-de-noche", s: 70, w: ["Se", "aprende"], title: "Impersonal se", x: "'Se aprende' = you learn, people learn. se + 3rd person verb makes a general statement with no specific subject." },
  { text: "es-4-el-turno-de-noche", s: 75, w: ["bájese"], title: "usted command + pronoun", x: "'bájese' = get off (usted), from bajarse. In positive commands the pronoun is attached and an accent keeps the stress." },
  { text: "es-4-el-turno-de-noche", s: 78, w: ["los", "vio", "entrar"], title: "ver + infinitive", x: "ver + person + infinitive = to see someone do something: 'los vio entrar' = she saw them go in." },
  { text: "es-4-el-turno-de-noche", s: 82, w: ["Y", "si", "había", "caído"], title: "¿Y si...? What if...?", x: "'¿Y si...?' introduces a worried guess: what if he had fallen? 'había caído' is pluperfect, before the moment she thinks it." },
  // es-4-la-mente-del-pulpo
  { text: "es-4-la-mente-del-pulpo", s: 0, w: ["pidiera", "acabaríamos"], title: "Unreal condition", x: "For an imagined situation: si + imperfect subjunctive ('pidiera'), then the conditional ('acabaríamos') = if someone asked us, we would end up..." },
  { text: "es-4-la-mente-del-pulpo", s: 3, w: ["al", "de"], title: "el de: that of", x: "'parecido al de un loro' = similar to that of a parrot. 'el de' replaces a noun already mentioned (el pico); a + el = al." },
  { text: "es-4-la-mente-del-pulpo", s: 7, w: ["lo", "más", "extraño"], title: "lo más + adjective", x: "'lo más extraño' = the strangest thing. lo + más + adjective makes an abstract superlative." },
  { text: "es-4-la-mente-del-pulpo", s: 23, w: ["Quien", "haya", "trabajado"], title: "quien + perfect subjunctive", x: "'Quien haya trabajado' = anyone who has worked. The subjunctive 'haya trabajado' is used because it refers to no specific person." },
  { text: "es-4-la-mente-del-pulpo", s: 26, w: ["les", "caen", "bien"], title: "caer bien: to like someone", x: "caer bien works like gustar: 'los cuidadores que les caen bien' = the keepers they like. The keepers are the subject; 'les' are the octopuses." },
  { text: "es-4-la-mente-del-pulpo", s: 29, w: ["observando"], title: "Gerund: by doing", x: "The gerund can show how something is done: 'aprender una tarea observando a otro pulpo' = learn a task by watching another octopus." },
  { text: "es-4-la-mente-del-pulpo", s: 33, w: ["hace", "más", "de"], title: "hace + time: ago", x: "hace + time = ago: 'hace más de quinientos millones de años'. Before numbers, 'more than' is 'más de', not 'más que'." },
  { text: "es-4-la-mente-del-pulpo", s: 39, w: ["después", "de", "que", "nazcan"], title: "después de que + subjunctive", x: "When it refers to events that have not yet happened (or happen in general), 'después de que' takes the subjunctive: 'nazcan', from nacer." },
  { text: "es-4-la-mente-del-pulpo", s: 45, w: ["sería"], title: "Conditional for a hypothesis", x: "'sería' (would be) presents the idea as a theory, not a fact: according to this hypothesis, its intelligence would be its best weapon." },
  { text: "es-4-la-mente-del-pulpo", s: 49, w: ["para", "que", "aburran"], title: "para que + subjunctive", x: "para que (so that) is always followed by the subjunctive: 'para que no se aburran' = so that they don't get bored." },
];

/** notes-d1…d4: notes for the texts in texts-d1…d4. */
const data: GrammarNote[] = [...base, ...d1, ...d2, ...d3, ...d4];

export default data;
