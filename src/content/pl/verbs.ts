import type { Verb } from '../types';

const data: Verb[] = [
  {
    inf: 'być', en: 'to be', lv: 1,
    f: {
      'czas teraźniejszy': ["jestem", "jesteś", "jest", "jesteśmy", "jesteście", "są"],
      'czas przeszły': ["byłem", "byłeś", "był", "byliśmy", "byliście", "byli"],
    },
  },
  {
    inf: 'mieć', en: 'to have', lv: 1,
    f: {
      'czas teraźniejszy': ["mam", "masz", "ma", "mamy", "macie", "mają"],
      'czas przeszły': ["miałem", "miałeś", "miał", "mieliśmy", "mieliście", "mieli"],
    },
  },
  {
    inf: 'robić', en: 'to do; to make', lv: 1,
    f: {
      'czas teraźniejszy': ["robię", "robisz", "robi", "robimy", "robicie", "robią"],
      'czas przeszły': ["robiłem", "robiłeś", "robił", "robiliśmy", "robiliście", "robili"],
    },
  },
  {
    inf: 'mówić', en: 'to speak; to say', lv: 1,
    f: {
      'czas teraźniejszy': ["mówię", "mówisz", "mówi", "mówimy", "mówicie", "mówią"],
      'czas przeszły': ["mówiłem", "mówiłeś", "mówił", "mówiliśmy", "mówiliście", "mówili"],
    },
  },
  {
    inf: 'iść', en: 'to go (on foot)', lv: 1,
    f: {
      'czas teraźniejszy': ["idę", "idziesz", "idzie", "idziemy", "idziecie", "idą"],
      'czas przeszły': ["szedłem", "szedłeś", "szedł", "szliśmy", "szliście", "szli"],
    },
  },
  {
    inf: 'jeść', en: 'to eat', lv: 1,
    f: {
      'czas teraźniejszy': ["jem", "jesz", "je", "jemy", "jecie", "jedzą"],
      'czas przeszły': ["jadłem", "jadłeś", "jadł", "jedliśmy", "jedliście", "jedli"],
    },
  },
  {
    inf: 'pić', en: 'to drink', lv: 1,
    f: {
      'czas teraźniejszy': ["piję", "pijesz", "pije", "pijemy", "pijecie", "piją"],
      'czas przeszły': ["piłem", "piłeś", "pił", "piliśmy", "piliście", "pili"],
    },
  },
  {
    inf: 'mieszkać', en: 'to live (somewhere)', lv: 1,
    f: {
      'czas teraźniejszy': ["mieszkam", "mieszkasz", "mieszka", "mieszkamy", "mieszkacie", "mieszkają"],
      'czas przeszły': ["mieszkałem", "mieszkałeś", "mieszkał", "mieszkaliśmy", "mieszkaliście", "mieszkali"],
    },
  },
  {
    inf: 'pracować', en: 'to work', lv: 1,
    f: {
      'czas teraźniejszy': ["pracuję", "pracujesz", "pracuje", "pracujemy", "pracujecie", "pracują"],
      'czas przeszły': ["pracowałem", "pracowałeś", "pracował", "pracowaliśmy", "pracowaliście", "pracowali"],
    },
  },
  {
    inf: 'lubić', en: 'to like', lv: 1,
    f: {
      'czas teraźniejszy': ["lubię", "lubisz", "lubi", "lubimy", "lubicie", "lubią"],
      'czas przeszły': ["lubiłem", "lubiłeś", "lubił", "lubiliśmy", "lubiliście", "lubili"],
    },
  },
  {
    inf: 'chcieć', en: 'to want', lv: 1,
    f: {
      'czas teraźniejszy': ["chcę", "chcesz", "chce", "chcemy", "chcecie", "chcą"],
      'czas przeszły': ["chciałem", "chciałeś", "chciał", "chcieliśmy", "chcieliście", "chcieli"],
    },
  },
  {
    inf: 'wiedzieć', en: 'to know (a fact)', lv: 1,
    f: {
      'czas teraźniejszy': ["wiem", "wiesz", "wie", "wiemy", "wiecie", "wiedzą"],
      'czas przeszły': ["wiedziałem", "wiedziałeś", "wiedział", "wiedzieliśmy", "wiedzieliście", "wiedzieli"],
    },
  },
  {
    inf: 'czytać', en: 'to read', lv: 1,
    f: {
      'czas teraźniejszy': ["czytam", "czytasz", "czyta", "czytamy", "czytacie", "czytają"],
      'czas przeszły': ["czytałem", "czytałeś", "czytał", "czytaliśmy", "czytaliście", "czytali"],
    },
  },
  {
    inf: 'spać', en: 'to sleep', lv: 1,
    f: {
      'czas teraźniejszy': ["śpię", "śpisz", "śpi", "śpimy", "śpicie", "śpią"],
      'czas przeszły': ["spałem", "spałeś", "spał", "spaliśmy", "spaliście", "spali"],
    },
  },
  {
    inf: 'rozumieć', en: 'to understand', lv: 1,
    f: {
      'czas teraźniejszy': ["rozumiem", "rozumiesz", "rozumie", "rozumiemy", "rozumiecie", "rozumieją"],
      'czas przeszły': ["rozumiałem", "rozumiałeś", "rozumiał", "rozumieliśmy", "rozumieliście", "rozumieli"],
    },
  },
  {
    inf: 'pisać', en: 'to write', lv: 2,
    f: {
      'czas teraźniejszy': ["piszę", "piszesz", "pisze", "piszemy", "piszecie", "piszą"],
      'czas przeszły': ["pisałem", "pisałeś", "pisał", "pisaliśmy", "pisaliście", "pisali"],
    },
  },
  {
    inf: 'móc', en: 'can; to be able to', lv: 2,
    f: {
      'czas teraźniejszy': ["mogę", "możesz", "może", "możemy", "możecie", "mogą"],
      'czas przeszły': ["mogłem", "mogłeś", "mógł", "mogliśmy", "mogliście", "mogli"],
    },
  },
  {
    inf: 'musieć', en: 'must; to have to', lv: 2,
    f: {
      'czas teraźniejszy': ["muszę", "musisz", "musi", "musimy", "musicie", "muszą"],
      'czas przeszły': ["musiałem", "musiałeś", "musiał", "musieliśmy", "musieliście", "musieli"],
    },
  },
  {
    inf: 'jechać', en: 'to go (by vehicle)', lv: 2,
    f: {
      'czas teraźniejszy': ["jadę", "jedziesz", "jedzie", "jedziemy", "jedziecie", "jadą"],
      'czas przeszły': ["jechałem", "jechałeś", "jechał", "jechaliśmy", "jechaliście", "jechali"],
    },
  },
  {
    inf: 'kupować', en: 'to buy', lv: 2,
    f: {
      'czas teraźniejszy': ["kupuję", "kupujesz", "kupuje", "kupujemy", "kupujecie", "kupują"],
      'czas przeszły': ["kupowałem", "kupowałeś", "kupował", "kupowaliśmy", "kupowaliście", "kupowali"],
    },
  },
  {
    inf: 'czekać', en: 'to wait', lv: 2,
    f: {
      'czas teraźniejszy': ["czekam", "czekasz", "czeka", "czekamy", "czekacie", "czekają"],
      'czas przeszły': ["czekałem", "czekałeś", "czekał", "czekaliśmy", "czekaliście", "czekali"],
    },
  },
  {
    inf: 'myśleć', en: 'to think', lv: 2,
    f: {
      'czas teraźniejszy': ["myślę", "myślisz", "myśli", "myślimy", "myślicie", "myślą"],
      'czas przeszły': ["myślałem", "myślałeś", "myślał", "myśleliśmy", "myśleliście", "myśleli"],
    },
  },
  {
    inf: 'brać', en: 'to take', lv: 2,
    f: {
      'czas teraźniejszy': ["biorę", "bierzesz", "bierze", "bierzemy", "bierzecie", "biorą"],
      'czas przeszły': ["brałem", "brałeś", "brał", "braliśmy", "braliście", "brali"],
    },
  },
  {
    inf: 'gotować', en: 'to cook', lv: 2,
    f: {
      'czas teraźniejszy': ["gotuję", "gotujesz", "gotuje", "gotujemy", "gotujecie", "gotują"],
      'czas przeszły': ["gotowałem", "gotowałeś", "gotował", "gotowaliśmy", "gotowaliście", "gotowali"],
    },
  },
  {
    inf: 'widzieć', en: 'to see', lv: 2,
    f: {
      'czas teraźniejszy': ["widzę", "widzisz", "widzi", "widzimy", "widzicie", "widzą"],
      'czas przeszły': ["widziałem", "widziałeś", "widział", "widzieliśmy", "widzieliście", "widzieli"],
    },
  },
  {
    inf: 'znać', en: 'to know (sb, sth)', lv: 3,
    f: {
      'czas teraźniejszy': ["znam", "znasz", "zna", "znamy", "znacie", "znają"],
      'czas przeszły': ["znałem", "znałeś", "znał", "znaliśmy", "znaliście", "znali"],
    },
  },
  {
    inf: 'chodzić', en: 'to go (on foot, regularly); to walk', lv: 3,
    f: {
      'czas teraźniejszy': ["chodzę", "chodzisz", "chodzi", "chodzimy", "chodzicie", "chodzą"],
      'czas przeszły': ["chodziłem", "chodziłeś", "chodził", "chodziliśmy", "chodziliście", "chodzili"],
    },
  },
  {
    inf: 'jeździć', en: 'to go (by vehicle, regularly); to ride', lv: 3,
    f: {
      'czas teraźniejszy': ["jeżdżę", "jeździsz", "jeździ", "jeździmy", "jeździcie", "jeżdżą"],
      'czas przeszły': ["jeździłem", "jeździłeś", "jeździł", "jeździliśmy", "jeździliście", "jeździli"],
    },
  },
  {
    inf: 'uczyć się', en: 'to learn; to study', lv: 3,
    f: {
      'czas teraźniejszy': ["uczę się", "uczysz się", "uczy się", "uczymy się", "uczycie się", "uczą się"],
      'czas przeszły': ["uczyłem się", "uczyłeś się", "uczył się", "uczyliśmy się", "uczyliście się", "uczyli się"],
    },
  },
  {
    inf: 'dawać', en: 'to give', lv: 3,
    f: {
      'czas teraźniejszy': ["daję", "dajesz", "daje", "dajemy", "dajecie", "dają"],
      'czas przeszły': ["dawałem", "dawałeś", "dawał", "dawaliśmy", "dawaliście", "dawali"],
    },
  },
  {
    inf: 'wracać', en: 'to come back; to return', lv: 3,
    f: {
      'czas teraźniejszy': ["wracam", "wracasz", "wraca", "wracamy", "wracacie", "wracają"],
      'czas przeszły': ["wracałem", "wracałeś", "wracał", "wracaliśmy", "wracaliście", "wracali"],
    },
  },
  {
    inf: 'zaczynać', en: 'to begin; to start', lv: 3,
    f: {
      'czas teraźniejszy': ["zaczynam", "zaczynasz", "zaczyna", "zaczynamy", "zaczynacie", "zaczynają"],
      'czas przeszły': ["zaczynałem", "zaczynałeś", "zaczynał", "zaczynaliśmy", "zaczynaliście", "zaczynali"],
    },
  },
  {
    inf: 'szukać', en: 'to look for', lv: 3,
    f: {
      'czas teraźniejszy': ["szukam", "szukasz", "szuka", "szukamy", "szukacie", "szukają"],
      'czas przeszły': ["szukałem", "szukałeś", "szukał", "szukaliśmy", "szukaliście", "szukali"],
    },
  },
  {
    inf: 'siedzieć', en: 'to sit; to be sitting', lv: 3,
    f: {
      'czas teraźniejszy': ["siedzę", "siedzisz", "siedzi", "siedzimy", "siedzicie", "siedzą"],
      'czas przeszły': ["siedziałem", "siedziałeś", "siedział", "siedzieliśmy", "siedzieliście", "siedzieli"],
    },
  },
  {
    inf: 'stać', en: 'to stand', lv: 3,
    f: {
      'czas teraźniejszy': ["stoję", "stoisz", "stoi", "stoimy", "stoicie", "stoją"],
      'czas przeszły': ["stałem", "stałeś", "stał", "staliśmy", "staliście", "stali"],
    },
  },
  {
    inf: 'umieć', en: 'to know how to; can', lv: 3,
    f: {
      'czas teraźniejszy': ["umiem", "umiesz", "umie", "umiemy", "umiecie", "umieją"],
      'czas przeszły': ["umiałem", "umiałeś", "umiał", "umieliśmy", "umieliście", "umieli"],
    },
  },
  {
    inf: 'nieść', en: 'to carry (on foot)', lv: 4,
    f: {
      'czas teraźniejszy': ["niosę", "niesiesz", "niesie", "niesiemy", "niesiecie", "niosą"],
      'czas przeszły': ["niosłem", "niosłeś", "niósł", "nieśliśmy", "nieśliście", "nieśli"],
    },
  },
  {
    inf: 'wstawać', en: 'to get up', lv: 4,
    f: {
      'czas teraźniejszy': ["wstaję", "wstajesz", "wstaje", "wstajemy", "wstajecie", "wstają"],
      'czas przeszły': ["wstawałem", "wstawałeś", "wstawał", "wstawaliśmy", "wstawaliście", "wstawali"],
    },
  },
  {
    inf: 'prowadzić', en: 'to lead; to drive; to run', lv: 4,
    f: {
      'czas teraźniejszy': ["prowadzę", "prowadzisz", "prowadzi", "prowadzimy", "prowadzicie", "prowadzą"],
      'czas przeszły': ["prowadziłem", "prowadziłeś", "prowadził", "prowadziliśmy", "prowadziliście", "prowadzili"],
    },
  },
  {
    inf: 'żyć', en: 'to live; to be alive', lv: 4,
    f: {
      'czas teraźniejszy': ["żyję", "żyjesz", "żyje", "żyjemy", "żyjecie", "żyją"],
      'czas przeszły': ["żyłem", "żyłeś", "żył", "żyliśmy", "żyliście", "żyli"],
    },
  },
];

export default data;
