import type { TextQuiz } from '../types';

const data: TextQuiz[] = [
  {
    text: "pl-3-new-neighbour",
    q: [
      { q: "Kto zapukał do drzwi Marty?", o: ["Listonosz", "Starsza sąsiadka", "Jej mama"] },
      { q: "Co przyniosła pani Halina?", o: ["Kwiaty", "Talerz szarlotki", "Butelkę wina"] },
      { q: "Od ilu lat pani Halina mieszka w tym bloku?", o: ["Od czterech lat", "Od czternastu lat", "Od czterdziestu lat"] },
      { q: "Czego pani Halina uczy Martę?", o: ["Piec ciasta", "Robić na drutach", "Grać w szachy"] },
      { q: "Jak często Marta i pani Halina się spotykają?", o: ["Co czwartek", "Co niedzielę", "Raz w miesiącu"] },
    ],
  },
  {
    text: "pl-3-milk-bars",
    q: [
      { q: "Gdzie otwarto pierwszy bar mleczny?", o: ["W Krakowie", "W Warszawie", "W Gdańsku"] },
      { q: "Jakie jedzenie podawano głównie w barach mlecznych?", o: ["Drogie dania mięsne", "Tanie dania bez mięsa", "Fast food"] },
      { q: "Co stało się z wieloma barami po 1989 roku?", o: ["Zamknięto je", "Zamieniły się w hotele", "Przeniosły się za granicę"] },
      { q: "Co się robi po posiłku?", o: ["Płaci się przy kasie", "Odnosi się brudne naczynia", "Zostawia się napiwek"] },
      { q: "Dlaczego ceny są niskie?", o: ["Bary dostają dotacje od państwa", "Jedzenie jest mrożone", "Gotują studenci"] },
    ],
  },
  {
    text: "pl-3-cheesecake",
    q: [
      { q: "Co Paweł chciał zrobić na sześćdziesiąte urodziny mamy?", o: ["Zabrać ją do cukierni", "Sam upiec jej słynny sernik", "Spisać jej przepis", "Zrobić jej przyjęcie-niespodziankę"] },
      { q: "Jaki problem był z kartką z przepisem?", o: ["Była napisana ręką babci i trudno ją było przeczytać", "Nie było na niej żadnych dokładnych ilości", "Brakowało połowy przepisu", "To był przepis na inne ciasto"] },
      { q: "Co Ola pomyślała o planie brata?", o: ["Zaproponowała mu pomoc", "Śmiała się, bo on nawet jajecznicę przypala", "Powiedziała o nim mamie", "Uznała, że to świetny pomysł"] },
      { q: "Co się stało z sernikiem Pawła w piekarniku?", o: ["W ogóle nie urósł", "Przypalił się i zapadł na środku", "Wyszedł idealny", "Paweł zapomniał włączyć piekarnik"] },
      { q: "Skąd mama wiedziała, skąd jest sernik?", o: ["Powiedziała jej Ola", "Zobaczyła pudełko", "Sama od dwudziestu lat kupuje tam sernik", "Zadzwoniła do niej pani Krysia"] },
      { q: "Skąd pochodziła kartka z przepisem?", o: ["Napisała ją pani Krysia", "Mama dostała ją od babci", "Paweł znalazł ją w internecie", "Była dołączona do talerza"] },
    ],
  },
  {
    text: "pl-3-storks",
    q: [
      { q: "Ile bocianów białych na świecie może według artykułu przychodzić na świat w Polsce?", o: ["Co drugi", "Co piąty", "Co dziesiąty", "Co pięćdziesiąty"] },
      { q: "Dlaczego firmy energetyczne montują na słupach metalowe platformy?", o: ["Żeby odstraszyć bociany od wsi", "Bo ciężkie, mokre gniazda mogą spowodować awarię prądu", "Żeby ornitolodzy mogli liczyć ptaki", "Bo bociany nie budują już gniazd na dachach"] },
      { q: "Jak porozumiewają się dorosłe bociany?", o: ["Głośno śpiewają", "Klekoczą dziobem", "Gwiżdżą", "Machają skrzydłami"] },
      { q: "Dlaczego polskie bociany lecą do Afryki przez Turcję, a nie prosto nad morzem?", o: ["Bo ta droga jest krótsza", "Bo nad morzem nie ma ciepłych prądów powietrza, dzięki którym szybują", "Bo lecą za rodzicami", "Bo nad morzem jest więcej jedzenia"] },
      { q: "Co gospodarze umieszczali kiedyś na dachach, żeby zachęcić bociany?", o: ["Słomę", "Stare koła od wozów", "Metalowe platformy", "Miski z wodą"] },
      { q: "Co jest wyjątkowego we wsi Żywkowo?", o: ["Jest tam muzeum bociana", "Wiosną bocianów bywa tam więcej niż mieszkańców", "Bociany spędzają tam zimę", "Leży nad Bałtykiem"] },
    ],
  },
  {
    text: "pl-4-remote-work",
    q: [
      { q: "Co zmieniło sytuację pracy zdalnej w Polsce?", o: ["Nowa ustawa", "Pandemia", "Tańsze laptopy"] },
      { q: "Czym jest model hybrydowy?", o: ["Pracą tylko w nocy", "Pracą częściowo w biurze, a częściowo w domu", "Pracą dla dwóch firm"] },
      { q: "Na co często skarżą się pracownicy zdalni?", o: ["Na niskie pensje", "Na samotność i brak kontaktu z zespołem", "Na długie dojazdy"] },
      { q: "Co radzą psycholodzy?", o: ["Pracować w łóżku", "Ustalić stałe godziny pracy", "Odpowiadać na wiadomości w nocy"] },
      { q: "Co pokazują badania na temat wydajności?", o: ["Że mocno spada", "Że zwykle nie spada", "Że się podwaja"] },
    ],
  },
  {
    text: "pl-4-lost-wallet",
    q: [
      { q: "Gdzie Paweł najpierw spodziewał się znaleźć portfel?", o: ["W drugiej kurtce", "W samochodzie", "W biurze"] },
      { q: "Gdzie był Paweł poprzedniego wieczoru?", o: ["Na koncercie", "W pociągu z Poznania", "U rodziców"] },
      { q: "Skąd kobieta wzięła numer telefonu Pawła?", o: ["Zadzwoniła do banku", "Z wizytówki w portfelu", "Z dowodu osobistego"] },
      { q: "Dlaczego kobieta nie chciała przyjąć nagrody?", o: ["Spieszyła się", "Nie lubiła Pawła", "Kiedyś ktoś oddał jej zgubiony telefon"] },
      { q: "Czego brakowało w portfelu?", o: ["Gotówki", "Jednej karty", "Niczego"] },
    ],
  },
  {
    text: "pl-4-amber",
    q: [
      { q: "Czym według artykułu jest bursztyn?", o: ["Minerałem, który powstał w morzu", "Skamieniałą żywicą dawnych drzew", "Rodzajem szkła wulkanicznego", "Skamieniałą korą drzew"] },
      { q: "Dlaczego bursztyn można znaleźć daleko od morza, na przykład na Kurpiach?", o: ["Bo zakopali go tam ludzie", "Bo rzeki i lodowce przeniosły go w głąb lądu", "Bo tylko tam rosły dawne lasy", "Bo kupcy zgubili go na szlaku bursztynowym"] },
      { q: "Co dzieje się z bursztynem w mocno osolonej wodzie?", o: ["Rozpuszcza się", "Szybko tonie", "Wypływa na powierzchnię", "Zmienia kolor"] },
      { q: "Skąd pochodzi słowo „elektryczność”?", o: ["Od łacińskiego słowa oznaczającego błyskawicę", "Od greckiej nazwy bursztynu", "Od nazwiska greckiego uczonego", "Od polskiego słowa „jantar”"] },
      { q: "Kiedy najlepiej szukać bursztynu na plaży?", o: ["W spokojne letnie poranki", "Po silnym sztormie, zwykle jesienią lub zimą", "Wiosną, przy odpływie", "Tylko nocą, z latarką"] },
      { q: "Jak zachowuje się kopal podczas próby z rozgrzaną igłą?", o: ["Śmierdzi chemią", "Wcale nie reaguje", "Szybko mięknie i robi się lepki", "Świeci na niebiesko"] },
    ],
  },
  {
    text: "pl-4-choir",
    q: [
      { q: "Dlaczego Kasia zapisała dziadka do chóru?", o: ["Zawsze chciał śpiewać", "Odkąd przeszedł na emeryturę i zmarła mu żona, rzadko wychodził z domu", "Poprosiła ją o to szkoła", "Poprosił ją o to pan Witold"] },
      { q: "Czym Leon zajmował się przez czterdzieści lat?", o: ["Uczył matematyki", "Był konduktorem w pociągach", "Prowadził miejską bibliotekę", "Grał w orkiestrze"] },
      { q: "Jak Magda opisała rolę basu w chórze?", o: ["Jako najgłośniejszy głos", "Jako głos, na którym opierają się pozostałe, jak pociąg na szynach", "Jako głos, który śpiewa melodię", "Jako głos, którego najłatwiej się nauczyć"] },
      { q: "Jak sąsiadka zareagowała na śpiew Leona w łazience?", o: ["Zadzwoniła na policję", "Zapukała w ścianę, a potem powiedziała, że to nawet ładne", "Zapisała się do chóru", "Nigdy o tym nie wspomniała"] },
      { q: "Dlaczego koncert przeniósł się do biblioteki?", o: ["Remontowano muszlę koncertową", "Zaczęła się burza", "Przyszło za mało ludzi", "Magda wolała akustykę biblioteki"] },
      { q: "Czego Magda użyła w bibliotece zamiast pianina?", o: ["Akordeonu", "Telefonu", "Kamertonu", "Głosu pana Witolda"] },
    ],
  },
  {
    text: "pl-5-bialowieza",
    q: [
      { q: "Gdzie leży Puszcza Białowieska?", o: ["Na granicy z Niemcami", "Na granicy Polski i Białorusi", "W Tatrach"] },
      { q: "Co stało się z żubrem na początku XX wieku?", o: ["Wyginął na wolności", "Sprowadzono go z Ameryki", "Stał się zwierzęciem domowym"] },
      { q: "Dlaczego martwe drzewa zostają w puszczy?", o: ["Nie ma pieniędzy na ich usunięcie", "Żyje w nich wiele gatunków grzybów, owadów i mchów", "Podobają się turystom"] },
      { q: "Czym jest puszcza dla naukowców?", o: ["Źródłem drewna", "Naturalnym laboratorium", "Zagrożeniem dla ludzi"] },
      { q: "Jak można zwiedzać ścisły rezerwat?", o: ["Tylko na rowerze", "Tylko z przewodnikiem", "Tylko zimą"] },
    ],
  },
  {
    text: "pl-5-grandmas-letters",
    q: [
      { q: "Kto uporządkował mieszkanie babci?", o: ["Jej syn", "Zosia, najmłodsza z wnuczek", "Sąsiadka"] },
      { q: "Gdzie Zosia znalazła szkatułkę?", o: ["Pod łóżkiem", "W szafie, pod obrusami", "W kuchni"] },
      { q: "Kim był Jerzy?", o: ["Dziadkiem Zosi", "Mężczyzną, którego babcia kochała w młodości", "Bratem babci"] },
      { q: "Jak kończył się ostatni list?", o: ["Słowami „Wybacz mi”", "Oświadczynami", "Adresem za granicą"] },
      { q: "Co Zosia postanowiła zrobić z listami?", o: ["Pokazać je rodzinie", "Wyrzucić je", "Na razie zachować je dla siebie"] },
    ],
  },
  {
    text: "pl-5-boredom",
    q: [
      { q: "Czym według przytoczonych w eseju psychologów nuda różni się od odpoczynku?", o: ["Nuda zdarza się tylko w pracy", "Znudzony chce się czymś zająć, ale nic go nie angażuje, a odpoczywający jest zadowolony", "Odpoczynek zawsze trwa dłużej niż nuda", "Niczym się nie różni"] },
      { q: "Co zrobiło wielu uczestników eksperymentu z Uniwersytetu Wirginii z 2014 roku, kiedy zostali sami ze swoimi myślami?", o: ["Zasnęli", "Przynajmniej raz zaaplikowali sobie wstrząs elektryczny", "Wcześniej wyszli z pokoju", "Zapisywali swoje pomysły"] },
      { q: "Co według eseju robi sieć trybu domyślnego?", o: ["Wyłącza mózg podczas odpoczynku", "Uaktywnia się, gdy nie skupiamy się na zadaniu z zewnątrz, np. kiedy wspominamy i planujemy", "Kontroluje nasze nawyki związane z telefonem", "Działa tylko podczas snu"] },
      { q: "Co jeszcze ustalili badacze z Harvardu, przez co autor nie chwali nudy bezkrytycznie?", o: ["Że ludzie nigdy nie pozwalają myślom błądzić", "Że ludzie, których myśli błądziły, byli na ogół mniej szczęśliwi", "Że błądzenie myślami zwiększało wydajność", "Że telefony zwiększają poczucie szczęścia"] },
      { q: "W czym lepiej wypadli w brytyjskim badaniu uczestnicy, którzy najpierw przepisywali numery telefonów?", o: ["Szybciej rozwiązywali zadania z matematyki", "Wymyślili więcej zastosowań dla dwóch plastikowych kubków", "Zapamiętali więcej numerów", "Potem mniej się nudzili"] },
      { q: "Co autor radzi na koniec?", o: ["Wyrzucić smartfon", "Codziennie przez godzinę ćwiczyć nudzenie się", "Nie bać się pustych chwil i nie sięgać od razu po telefon", "Czytać więcej poradników o „niksen”"] },
    ],
  },
  {
    text: "pl-5-two-earpieces",
    q: [
      { q: "Co Tomek powiedział o sobie podczas niedzielnego obiadu?", o: ["Że gra w golfa", "Że żegluje", "Że ma jacht", "Że wychował się na Mazurach"] },
      { q: "Jak Kinga miała pomagać Tomkowi podczas rejsu?", o: ["Sama prowadząc jacht", "Wysyłając mu SMS-y", "Mówiąc do niego przez maleńką słuchawkę z pobliskiej motorówki", "Pożyczając mu podręcznik żeglarstwa"] },
      { q: "Kto pierwszego dnia pociągnął fał, kiedy stawiano grota?", o: ["Pan Zdzisław", "Ola", "Kinga", "Pani Halina"] },
      { q: "Co Tomek podsłuchał w nocy za budynkiem sanitarnym?", o: ["Że Kinga chce więcej pieniędzy", "Że pan Zdzisław też wynajął Kingę i kiedyś był tylko kucharzem na obozie", "Że Ola chce zerwać zaręczyny", "Że nadchodzi burza"] },
      { q: "Dlaczego Bryza zaczęła zataczać koła?", o: ["Zepsuł się ster", "Kinga pomyliła telefony i każdy z panów dostał polecenia dla drugiego", "Pan Zdzisław zasnął przy sterze", "Nagle zmienił się kierunek wiatru"] },
      { q: "Kto podczas białego szkwału bezpiecznie wprowadził jacht do zatoki?", o: ["Tomek", "Kinga", "Pani Halina", "Pan Zdzisław"] },
      { q: "Skąd mama Kingi znała panią Halinę?", o: ["Pracowały w tej samej szkole", "Halina była jej instruktorką i wprowadziła jej łódkę do zatoki w czasie szkwału", "Były sąsiadkami w Łodzi", "Poznały się na weselu"] },
      { q: "Co powiedziała pani Halina po toaście męża na weselu?", o: ["„To nieprawda”", "„Pamiętam”", "„Brawo”", "Nic nie powiedziała"] },
    ],
  },
  {
    text: "pl-6-borrowed-words",
    q: [
      { q: "Z jakiego języka polszczyzna zapożyczyła najwięcej słów w ostatnich dekadach?", o: ["Z francuskiego", "Z angielskiego", "Z niemieckiego"] },
      { q: "Co często wieszczą puryści językowi?", o: ["Rychły upadek polszczyzny", "Koniec angielskiego", "Zniknięcie zapożyczeń"] },
      { q: "Kiedy według językoznawców zapożyczenia stają się problemem?", o: ["Zawsze", "Gdy bez wyraźnej potrzeby wypierają słowa rodzime", "Tylko w piśmie"] },
      { q: "Jaki przykład dawnego zapożyczenia z francuskiego podaje tekst?", o: ["Mecz", "Bilet", "Komputer"] },
      { q: "Do jakiego wniosku dochodzi autor?", o: ["Zapożyczeń należy zakazać", "Język, który przestaje się zmieniać, jest martwy", "To słowniki decydują, które słowa przetrwają"] },
    ],
  },
  {
    text: "pl-6-night-train",
    q: [
      { q: "Kto siedział w przedziale, kiedy Adam wsiadł do pociągu?", o: ["Młoda kobieta", "Starszy mężczyzna z szachownicą", "Nikt"] },
      { q: "O czym opowiadał starszy pan między ruchami?", o: ["O swojej pracy", "O mieście, do którego jechali", "O zasadach gry w szachy"] },
      { q: "Co wydarzyło się około trzeciej nad ranem?", o: ["Adam wygrał", "Adamowi udało się zremisować", "Pociąg się zatrzymał"] },
      { q: "Co było napisane na kartce?", o: ["Dziękuję za ostatnią partię", "Proszę zatrzymać szachownicę", "Do zobaczenia w Przemyślu"] },
      { q: "Co powiedział konduktor?", o: ["Że starszy pan wysiadł wcześniej", "Że poza Adamem nikt w tym przedziale nie jechał", "Że starszy pan jest jego znajomym"] },
    ],
  },
  {
    text: "pl-6-age-of-the-earth",
    q: [
      { q: "Co Hutton zobaczył na przylądku Siccar Point?", o: ["Skamieniałość pradawnej ryby", "Niemal pionowe warstwy szarogłazów pod prawie poziomym czerwonym piaskowcem", "Krater po meteorycie", "Lawę zastygłą w kolumny"] },
      { q: "Co stało się z liczbą, którą Darwin podał dla erozji doliny Weald?", o: ["Potwierdził ją Kelvin", "Darwin usunął ją z kolejnych wydań", "Wykorzystał ją Patterson", "Darwin podwoił ją w kolejnych wydaniach"] },
      { q: "Na czym Kelvin oparł swoje obliczenia?", o: ["Na zasoleniu oceanów", "Na grubości warstw skalnych", "Na tempie, w jakim stygnąca Ziemia traci ciepło", "Na rozpadzie uranu"] },
      { q: "Jaką słabość wskazał w 1895 roku John Perry?", o: ["Kelvin przyjął złą temperaturę topnienia lodu", "Wnętrze Ziemi może być częściowo płynne i znacznie sprawniej wyprowadzać ciepło", "Słońce jest starsze od Ziemi", "Skały zawierają rad"] },
      { q: "Dlaczego rozpad promieniotwórczy może służyć za zegar?", o: ["Jego tempo zmienia się z temperaturą w znany sposób", "Każdy taki proces ma stałe tempo, którego nic nie zmienia", "Skały promieniotwórcze świecą tym jaśniej, im są starsze", "Uran zamienia się w rad po ściśle określonym czasie"] },
      { q: "Dlaczego Patterson ciągle znajdował w próbkach za dużo ołowiu?", o: ["Jego spektrometr mas był wadliwy", "Meteoryt zawierał dużo uranu", "Ołów z otoczenia zanieczyszczał próbki", "Mierzył niewłaściwy izotop"] },
      { q: "Kiedy w porównaniu z jedną dobą pojawiłby się nasz gatunek?", o: ["Około dwudziestu minut przed północą", "W południe", "Kilka sekund przed północą", "Godzinę przed północą"] },
    ],
  },
  {
    text: "pl-6-letters-from-bergen",
    q: [
      { q: "Co ciotka Irena podarowała Julii, kiedy ta miała osiem lat?", o: ["Pudełko listów", "Zeszyt oprawiony w granatowe płótno", "Ręcznie rysowaną mapę", "Czerwony szal"] },
      { q: "Co otwierał najmniejszy klucz z pęku?", o: ["Piwnicę", "Skrzynkę na listy", "Zamkniętą szufladę w sekretarzyku", "Drzwiczki pieca kaflowego"] },
      { q: "Dlaczego wiosną 1975 roku Irena nie dołączyła do Henryka w Bergen?", o: ["Straciła pracę w bibliotece", "Jej matka miała udar i wymagała opieki", "Brat jej zabronił", "Henryk ożenił się z inną"] },
      { q: "Czyje nazwisko widniało jako nadawca na przekazach wysyłanych Tadeuszowi?", o: ["Ireny", "Henryka", "Pani Haliny", "Jego matki, Zofii Zawadzkiej"] },
      { q: "Gdzie były ukryte niewysłane listy Ireny?", o: ["Pod deskami podłogi w sypialni", "Za luźnym kaflem pieca, w nieużywanej wyczystce", "W atlasie", "W mieszkaniu pani Haliny"] },
      { q: "Czym jest Irenaskjæret?", o: ["Księgarnią w Bergen", "Łodzią Henryka", "Małą skałą u norweskiego wybrzeża, nazwaną na cześć Ireny", "Fiordem, który odwiedziła Irena"] },
      { q: "Co przedstawiał rysunek tuszem Henryka z października 1979 roku?", o: ["Port w Bergen", "Dworzec kolejowy w Krakowie", "Oświetlone okno mieszkania z kobietą w czerwonym szalu", "Irenę i panią Halinę na schodach"] },
      { q: "Kto i kiedy po raz pierwszy rozpala w piecu?", o: ["Julia, w Wigilię", "Pan Zdzisław, ostatniego dnia roku", "Ojciec Julii, gdy przyjeżdża Solveig", "Pani Halina, w marcu"] },
    ],
  },
];

export default data;
