import type { CheatSheet } from '../../types';

const H = ['Prefix', 'Typical meaning', 'Example verbs'];

const sheet: CheatSheet = {
  id: 'de-cs-verb-prefixes',
  title: 'Verb prefixes',
  summary: 'Separable, inseparable and two-way prefixes: what they mean, how they behave, and the common verbs with each.',
  body: [
    { p: "A prefix can change a verb's meaning a little (fahren → **ab**fahren, to depart) or completely (stehen → **ver**stehen, to understand). What matters for grammar is whether the prefix is **separable** or **inseparable**." },
    { table: [
      ['Feature', 'Separable', 'Inseparable'],
      ['Stress', 'on the prefix: **AN**rufen', 'on the verb: ver**STE**hen'],
      ['Present (main clause)', 'prefix goes to the end: Ich rufe dich **an**.', 'stays joined: Ich **verstehe** dich.'],
      ['Subordinate clause', 'joined again at the end: …, weil ich dich **anrufe**.', '…, weil ich dich **verstehe**.'],
      ['Perfect participle', '**ge** in the middle: an**ge**rufen', 'no ge-: verstanden, bezahlt'],
      ['zu + infinitive', '**zu** in the middle: an**zu**rufen', 'zu before it: zu verstehen'],
    ] },

    { h: 'Separable prefixes' },
    { table: [
      H,
      ['**ab**', 'away, off; down; copying; finishing', 'abfahren (to depart), abholen (to pick up), abnehmen (to lose weight; to take off), abschreiben (to copy), absagen (to cancel), abtrocknen (to dry)'],
      ['**an**', 'on; towards; starting; contact', 'anrufen (to call), anfangen (to begin), ankommen (to arrive), anmachen (to switch on), anziehen (to put on), ansehen (to look at)'],
      ['**auf**', 'up; open; suddenly; completely', 'aufstehen (to get up), aufmachen (to open), aufhören (to stop), aufräumen (to tidy up), aufwachen (to wake up), aufschreiben (to write down)'],
      ['**aus**', 'out; off; to the end', 'ausgehen (to go out), aussteigen (to get off), ausmachen (to switch off), aussehen (to look), ausschlafen (to sleep in), ausfüllen (to fill in)'],
      ['**bei**', 'with, along; adding', 'beibringen (to teach), beitragen (to contribute), beitreten (to join), beilegen (to enclose)'],
      ['**ein**', 'in, into', 'einsteigen (to get on), einkaufen (to shop), einladen (to invite), einschlafen (to fall asleep), einziehen (to move in), eintreten (to enter)'],
      ['**fest**', 'firm, fixed', 'festhalten (to hold on to), festlegen (to fix, set), feststellen (to find out; to establish), festnehmen (to arrest)'],
      ['**fern**', 'far', 'fernsehen (to watch TV), fernbleiben (to stay away), fernhalten (to keep away)'],
      ['**fort**', 'away; on, continuing', 'fortfahren (to continue; to drive away), fortsetzen (to continue), fortgehen (to go away)'],
      ['**her**', 'towards the speaker; out of', 'herkommen (to come here), herstellen (to produce), hergeben (to hand over), herausfinden (to find out)'],
      ['**hin**', 'away from the speaker; there; down', 'hingehen (to go there), hinfallen (to fall down), hinlegen (to put down), sich hinsetzen (to sit down)'],
      ['**los**', 'off, starting; away', 'losgehen (to set off; to start), losfahren (to drive off), loslassen (to let go), loswerden (to get rid of)'],
      ['**mit**', 'with, along', 'mitkommen (to come along), mitbringen (to bring along), mitnehmen (to take along), mitmachen (to join in), mitteilen (to inform)'],
      ['**nach**', 'after; checking; copying', 'nachdenken (to think about), nachfragen (to ask, enquire), nachsehen (to check), nachmachen (to imitate), nachholen (to catch up on)'],
      ['**vor**', 'before, ahead; in front; forward', 'vorbereiten (to prepare), vorhaben (to plan), vorschlagen (to suggest), vorstellen (to introduce; sich ~: to imagine), vorlesen (to read aloud)'],
      ['**vorbei**', 'past, by', 'vorbeikommen (to drop by), vorbeigehen (to go past), vorbeifahren (to drive past)'],
      ['**weg**', 'away, off', 'weggehen (to leave), wegwerfen (to throw away), wegfahren (to go away), wegnehmen (to take away)'],
      ['**weiter**', 'on, further', 'weitermachen (to carry on), weitergehen (to go on), weitergeben (to pass on), weiterleiten (to forward)'],
      ['**zu**', 'closed; towards; adding', 'zumachen (to close), zuhören (to listen), zunehmen (to gain weight; to increase), zusehen (to watch), zustimmen (to agree)'],
      ['**zurück**', 'back', 'zurückkommen (to come back), zurückgeben (to give back), zurückrufen (to call back), zurückfahren (to drive back)'],
      ['**zusammen**', 'together', 'zusammenarbeiten (to work together), zusammenfassen (to summarise), zusammenpassen (to go together), zusammenstoßen (to collide)'],
      ['other words used as prefixes', 'a noun, adjective or verb joined to the verb', 'stattfinden (to take place), teilnehmen (to take part), kennenlernen (to get to know), kaputtgehen (to break), freihalten (to keep free)'],
    ] },
    { ex: [
      ['Der Zug fährt um acht Uhr ab.', 'The train departs at eight.'],
      ['Wann bist du heute aufgestanden?', 'When did you get up today?'],
      ['Ich habe vergessen, das Licht auszumachen.', 'I forgot to switch off the light.'],
    ] },

    { h: 'Inseparable prefixes' },
    { table: [
      H,
      ['**be**', 'makes a verb take a direct object; applying sth to', 'bekommen (to get), besuchen (to visit), bezahlen (to pay), beantworten (to answer), beschreiben (to describe), bestellen (to order)'],
      ['**emp**', 'only a few verbs', 'empfehlen (to recommend), empfangen (to receive), empfinden (to feel)'],
      ['**ent**', 'away, removal; un-; coming into being', 'entdecken (to discover), entfernen (to remove), entwickeln (to develop), entscheiden (to decide), entschuldigen (to excuse), entstehen (to arise)'],
      ['**er**', 'reaching a result; to death', 'erreichen (to reach), erzählen (to tell), erklären (to explain), erfinden (to invent), erkennen (to recognise), ertrinken (to drown)'],
      ['**ge**', 'no clear meaning today', 'gefallen (to please), gehören (to belong), gelingen (to succeed), gewinnen (to win), genießen (to enjoy), gestehen (to confess)'],
      ['**miss**', 'wrongly, badly', 'missverstehen (to misunderstand), misstrauen (to distrust), misslingen (to fail), missbrauchen (to misuse)'],
      ['**ver**', 'wrongly; change; using up; away', 'verstehen (to understand), vergessen (to forget), verkaufen (to sell), verlieren (to lose), sich verlaufen (to get lost), verschlafen (to oversleep)'],
      ['**zer**', 'to pieces', 'zerbrechen (to shatter), zerstören (to destroy), zerreißen (to tear up), zerschneiden (to cut up)'],
    ] },
    { tip: "**ver-** often adds the idea of \"wrong\": sich **ver**laufen (to get lost on foot), sich **ver**fahren (to get lost driving), sich **ver**sprechen (to make a slip of the tongue), **ver**schlafen (to oversleep)." },
    { ex: [
      ['Wir haben das Hotel schon bezahlt.', "We've already paid for the hotel."],
      ['Hast du alles verstanden?', 'Did you understand everything?'],
      ['Er hat mir eine lange Geschichte erzählt.', 'He told me a long story.'],
    ] },

    { h: 'Two-way prefixes' },
    { p: "**durch, über, um, unter, wider, wieder** and **voll** can be either. Stressed, they are separable and usually literal; unstressed, they are inseparable and often figurative." },
    { table: [
      ['Prefix', 'Separable (stressed): meaning and verbs', 'Inseparable (unstressed): meaning and verbs'],
      ['**durch**', 'through, all the way: durchlesen (to read through), durchfallen (to fail an exam), durchhalten (to hold out)', 'through, all over: durchsuchen (to search), durchqueren (to cross), durchschauen (to see through sb)'],
      ['**über**', 'over, across (literal): überkochen (to boil over), überlaufen (to overflow; to defect), übersetzen (to ferry across)', 'over, beyond; too much: übersetzen (to translate), übernachten (to stay the night), überraschen (to surprise), überlegen (to think over), übersehen (to overlook), überweisen (to transfer money)'],
      ['**um**', 'around; change; over: umsteigen (to change trains), umziehen (to move house), umdrehen (to turn round), umfallen (to fall over)', 'all around: umarmen (to hug), umgeben (to surround), umfahren (to drive around sth), umgehen (to avoid, bypass)'],
      ['**unter**', 'under, down (literal): untergehen (to sink; to set), unterbringen (to put up, accommodate)', 'under; between: unterschreiben (to sign), unterrichten (to teach), unterbrechen (to interrupt), unterstützen (to support), untersuchen (to examine)'],
      ['**wider**', 'back: widerspiegeln (to reflect)', 'against: widersprechen (to contradict), widerstehen (to resist)'],
      ['**wieder**', 'back, again: wiederkommen (to come back), wiedersehen (to see again), wiederfinden (to find again)', 'only wiederholen (to repeat)'],
      ['**voll**', 'full: volltanken (to fill up the tank), vollschreiben (to fill with writing)', 'complete: vollenden (to complete), vollziehen (to carry out)'],
    ] },

    { h: 'Same verb, both ways' },
    { table: [
      ['Verb', 'Separable', 'Inseparable'],
      ['übersetzen', 'to ferry across: Der Fährmann setzt uns **über**. (hat übergesetzt)', 'to translate: Sie **übersetzt** den Text. (hat übersetzt)'],
      ['umfahren', 'to knock down: Er fährt das Schild **um**. (hat umgefahren)', 'to drive around: Er **umfährt** den Stau. (hat umfahren)'],
      ['umgehen', 'to handle; to go round: Sie kann gut mit Kindern **umgehen**. (ist umgegangen)', 'to avoid: Wir **umgehen** das Problem. (hat umgangen)'],
      ['wiederholen', 'to fetch back: Er holt sein Buch **wieder**. (hat wiedergeholt)', 'to repeat: Können Sie das bitte **wiederholen**? (hat wiederholt)'],
      ['unterhalten', 'to hold underneath: Sie hält die Schüssel **unter**. (hat untergehalten)', 'to entertain; sich ~: to chat: Wir **unterhalten** uns. (hat unterhalten)'],
      ['durchschauen', 'to look through: Schau mal durch das Fernglas **durch**! (hat durchgeschaut)', 'to see through: Ich **durchschaue** seinen Plan. (hat durchschaut)'],
    ] },
  ],
};

export default sheet;
