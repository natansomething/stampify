import type { CheatSheet } from '../../types';

const sheet: CheatSheet = {
  id: 'ko-cs-connectives',
  title: "Connecting endings",
  summary: "About 45 endings that join two clauses: sequence, cause, contrast, condition, purpose…",
  body: [
    { p: "A connecting ending replaces the end of the first clause's verb; the second clause carries the speech level (and usually the tense). The notes say what the ending can't combine with: past tense on the first verb, a different subject, or a command or suggestion in the second clause." },

    { h: "Sequence and time" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-고** (-go)", "and; and then", "Tense usually goes on the last verb only. With 입다, 타다, 쓰다 etc. it means 'with … on': 안경을 쓰고", "밥을 먹**고** 커피를 마셨어요. (Babeul meokgo keopireul masyeosseoyo.)", "I ate and then had coffee."],
      ["**-아서/어서** (-aseo/-eoseo)", "and then (the 2nd action builds on the 1st)", "Same subject; no tense on -아서. Typical with 가다, 오다, 만나다, 만들다, 앉다", "친구를 만나**서** 영화를 봤어요. (Chingureul mannaseo yeonghwareul bwasseoyo.)", "I met a friend and we watched a film."],
      ["**-고 나서** (-go naseo)", "after finishing …", "Verbs only; no tense on -고 나서", "숙제를 하**고 나서** 놀아요. (Sukjereul hago naseo norayo.)", "I play after I've done my homework."],
      ["**-(으)ㄴ 후에** (-(eu)n hue)", "after", "Verbs only; -(으)ㄴ 다음에 and -(으)ㄴ 뒤에 mean the same", "수업이 끝**난 후에** 만나요. (Sueobi kkeunnan hue mannayo.)", "Let's meet after class."],
      ["**-기 전에** (-gi jeone)", "before", "No tense on the verb before -기 전에", "자**기 전에** 이를 닦아요. (Jagi jeone ireul dakkayo.)", "I brush my teeth before I go to bed."],
      ["**-자마자** (-jamaja)", "as soon as", "Verbs only; no tense on -자마자", "집에 오**자마자** 잤어요. (Jibe ojamaja jasseoyo.)", "I went to sleep as soon as I got home."],
      ["**-는 대로** (-neun daero)", "as soon as (I can)", "Verbs only; the 2nd clause is a plan, promise or request", "도착하**는 대로** 전화할게요. (Dochakaneun daero jeonhwahalgeyo.)", "I'll call as soon as I arrive."],
      ["**-다가** (-daga)", "while doing … (and then something else happened)", "Same subject; the 1st action is interrupted or changes", "텔레비전을 보**다가** 잠이 들었어요. (Tellebijeoneul bodaga jami deureosseoyo.)", "I fell asleep while watching TV."],
      ["**-았다가/었다가** (-atdaga/-eotdaga)", "did … and then (undid it / went on)", "Same subject; the 1st action was completed", "창문을 열**었다가** 추워서 닫았어요. (Changmuneul yeoreotdaga chuwoseo dadasseoyo.)", "I opened the window, then closed it because it was cold."],
      ["**-(으)ㄹ 때** (-(eu)l ttae)", "when", "Works with verbs and adjectives; -았/었을 때 for a completed action", "어릴 **때** 부산에 살았어요. (Eoril ttae Busane sarasseoyo.)", "I lived in Busan when I was little."],
    ] },

    { h: "At the same time" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-(으)면서** (-(eu)myeonseo)", "while (doing two things at once)", "Same subject for both clauses", "음악을 들으**면서** 공부해요. (Eumageul deureumyeonseo gongbuhaeyo.)", "I study while listening to music."],
      ["**-는 동안** (-neun dongan)", "while, during the time that", "Verbs; the subjects can differ", "아이가 자**는 동안** 책을 읽었어요. (Aiga janeun dongan chaegeul ilgeosseoyo.)", "I read while the child was asleep."],
      ["**-(으)ㄴ/는 김에** (-(eu)n/neun gime)", "while I'm at it, since I'm … anyway", "Verbs; the 2nd action is an extra one", "시장에 **간 김에** 과일도 샀어요. (Sijange gan gime gwaildo sasseoyo.)", "Since I was at the market anyway, I bought some fruit too."],
    ] },

    { h: "Cause and reason" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-아서/어서** (-aseo/-eoseo)", "because, so", "No past tense before it; no command or suggestion after it. Used in set phrases: 늦어서 미안해요, 만나서 반가워요", "늦어**서** 미안해요. (Neujeoseo mianhaeyo.)", "Sorry I'm late."],
      ["**-(으)니까** (-(eu)nikka)", "because, since (a reason the listener should accept)", "Takes past tense (했으니까); may be followed by a command or suggestion", "비가 오**니까** 우산을 가져가세요. (Biga onikka usaneul gajyeogaseyo.)", "It's raining, so take an umbrella."],
      ["**-(으)니까** (-(eu)nikka)", "when I did …, I found that …", "Discovery: the 2nd clause is what you found, in the past", "집에 가**니까** 아무도 없었어요. (Jibe ganikka amudo eopseosseoyo.)", "When I got home, there was no one there."],
      ["**-기 때문에** (-gi ttaemune)", "because (stating the reason; neutral or formal)", "Takes past tense (했기 때문에); not followed by a command or suggestion", "시험이 있**기 때문에** 공부해야 해요. (Siheomi itgi ttaemune gongbuhaeya haeyo.)", "I have to study because I have an exam."],
      ["**N 때문에** (ttaemune)", "because of (a noun)", "After nouns", "감기 **때문에** 학교에 못 갔어요. (Gamgi ttaemune hakgyoe mot gasseoyo.)", "I couldn't go to school because of a cold."],
      ["**-느라고** (-neurago)", "because I was busy doing …", "Verbs only; same subject; no tense; the result is usually negative", "게임을 하**느라고** 잠을 못 잤어요. (Geimeul haneurago jameul mot jasseoyo.)", "I didn't get any sleep because I was gaming."],
      ["**-는 바람에** (-neun barame)", "because (something unexpected happened)", "Verbs only; the result is in the past and usually bad; no command after it", "버스를 놓치**는 바람에** 늦었어요. (Beoseureul nochineun barame neujeosseoyo.)", "I was late because I missed the bus."],
      ["**-(으)ㄴ/는 덕분에** (-deokbune)", "thanks to", "The result is good; N 덕분에 after nouns", "친구가 도와준 **덕분에** 일찍 끝냈어요. (Chinguga dowajun deokbune iljjik kkeunnaesseoyo.)", "Thanks to my friend's help I finished early."],
      ["**-(으)므로** (-(eu)meuro)", "since, as", "Formal writing and announcements", "비가 많이 오**므로** 주의하십시오. (Biga mani omeuro juuihasipsio.)", "As it is raining heavily, please take care."],
    ] },

    { h: "Contrast and concession" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-지만** (-jiman)", "but", "Takes past tense (했지만)", "이 옷은 예쁘**지만** 비싸요. (I oseun yeppeujiman bissayo.)", "These clothes are pretty but expensive."],
      ["**-는데 / -(으)ㄴ데** (-neunde / -(eu)nde)", "and, so, but (sets the scene for what follows)", "-는데 after verbs, 있다/없다 and the past (했는데); -(으)ㄴ데 after adjectives; 인데 after nouns", "배가 고**픈데** 뭐 먹을까요? (Baega gopeunde mwo meogeulkkayo?)", "I'm hungry; shall we eat something?"],
      ["**-는데도 / -(으)ㄴ데도** (-neundedo / -(eu)ndedo)", "even though, despite", "The result is unexpected", "많이 먹었**는데도** 배가 고파요. (Mani meogeonneundedo baega gopayo.)", "Even though I ate a lot, I'm still hungry."],
      ["**-아도/어도** (-ado/-eodo)", "even if, even though", "Takes past tense (했어도)", "비가 와**도** 가요. (Biga wado gayo.)", "We're going even if it rains."],
      ["**-더라도** (-deorado)", "even if (supposing that)", "Stronger and more hypothetical than -아도/어도", "힘들**더라도** 포기하지 마세요. (Himdeuldeorado pogihaji maseyo.)", "Even if it's hard, don't give up."],
      ["**-기는 하지만** (-gineun hajiman)", "it's true that …, but", "Concedes a point; spoken short form -긴 하지만", "맛있**기는 하지만** 너무 비싸요. (Masitgineun hajiman neomu bissayo.)", "It is tasty, but it's too expensive."],
      ["**-(으)ㄴ/는 반면에** (-(eu)n/neun banmyeone)", "whereas, on the other hand", "Compares two facts", "형은 키가 **큰 반면에** 동생은 작아요. (Hyeongeun kiga keun banmyeone dongsaengeun jagayo.)", "The older brother is tall, whereas the younger one is short."],
      ["**-(으)나** (-(eu)na)", "but", "Formal writing", "열심히 공부했으**나** 시험에 떨어졌다. (Yeolsimhi gongbuhaesseuna siheome tteoreojyeotda.)", "He studied hard but failed the exam."],
    ] },

    { h: "Condition" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-(으)면** (-(eu)myeon)", "if; when", "The most general 'if'", "시간이 있으**면** 같이 가요. (Sigani isseumyeon gachi gayo.)", "If you have time, let's go together."],
      ["**-다면** (-damyeon)", "if (supposing, unlikely)", "Hypothetical; verbs -ㄴ다면/는다면", "복권에 당첨된**다면** 여행을 갈 거예요. (Bokgwone dangcheomdoendamyeon yeohaengeul gal geoyeyo.)", "If I won the lottery, I'd go travelling."],
      ["**-아야/어야** (-aya/-eoya)", "only if", "Often with 하다/되다 (-아야 해요 'must') or 'only then'", "열심히 연습해**야** 잘할 수 있어요. (Yeolsimhi yeonseupaeya jalhal su isseoyo.)", "Only if you practise hard can you do it well."],
      ["**-거든** (-geodeun)", "if, when (then do …)", "The 2nd clause is a command, suggestion or intention", "도착하**거든** 연락하세요. (Dochakageodeun yeollakaseyo.)", "Get in touch when you arrive."],
      ["**-(으)ㄹ수록** (-(eu)lsurok)", "the more …, the more …", "Often -(으)면 -(으)ㄹ수록", "한국어는 배울**수록** 재미있어요. (Hangugeoneun baeulsurok jaemiisseoyo.)", "The more I learn Korean, the more fun it is."],
    ] },

    { h: "Purpose and intention" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-(으)러** (-(eu)reo)", "(go/come) in order to", "Only before verbs of movement: 가다, 오다, 다니다, 나가다…", "밥 먹으**러** 가요. (Bap meogeureo gayo.)", "I'm going to eat."],
      ["**-(으)려고** (-(eu)ryeogo)", "in order to, intending to", "Any verb after it; no command or suggestion after it", "한국에서 일하**려고** 한국어를 배워요. (Hangugeseo ilharyeogo hangugeoreul baewoyo.)", "I'm learning Korean so I can work in Korea."],
      ["**-기 위해서** (-gi wihaeseo)", "in order to (formal)", "N을/를 위해서 'for (the sake of) N'", "건강을 지키**기 위해서** 운동해요. (Geongangeul jikigi wihaeseo undonghaeyo.)", "I exercise to stay healthy."],
      ["**-도록** (-dorok)", "so that; until", "The subjects can differ", "늦지 않**도록** 일찍 출발하세요. (Neutji antorok iljjik chulbalhaseyo.)", "Leave early so that you aren't late."],
      ["**-게** (-ge)", "so that; in a … way", "Also turns adjectives into adverbs: 크게 'loudly'", "잘 들리**게** 크게 말해 주세요. (Jal deullige keuge malhae juseyo.)", "Please speak up so we can hear you."],
    ] },

    { h: "Choice" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-거나** (-geona)", "or", "Lists alternatives", "주말에 책을 읽**거나** 영화를 봐요. (Jumare chaegeul ilgeona yeonghwareul bwayo.)", "At weekends I read or watch films."],
      ["**-든지** (-deunji)", "whether … or; either … or", "Often in pairs: -든지 -든지", "가**든지** 말**든지** 마음대로 하세요. (Gadeunji maldeunji maeumdaero haseyo.)", "Go or don't, as you like."],
    ] },

    { h: "Looking back on what happened" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-았더니/었더니** (-atdeoni/-eotdeoni)", "I did …, and (as a result / I found)", "The 1st clause is usually something I did", "아침에 운동했**더니** 기분이 좋아요. (Achime undonghaetdeoni gibuni joayo.)", "I exercised this morning, and now I feel great."],
      ["**-더니** (-deoni)", "(I saw that) … and then …", "Usually about someone or something else, as the speaker observed it", "아침에는 맑**더니** 오후에 비가 왔어요. (Achimeneun makdeoni ohue biga wasseoyo.)", "It was clear this morning, but then it rained in the afternoon."],
      ["**-다 보니까** (-da bonikka)", "by doing … repeatedly, I found / ended up", "Verbs; the result came gradually", "매일 듣**다 보니까** 익숙해졌어요. (Maeil deutda bonikka iksukaejyeosseoyo.)", "Listening every day, I got used to it."],
    ] },
  ],
};

export default sheet;
