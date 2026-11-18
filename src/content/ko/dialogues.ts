import type { Dialogue } from '../types';

const data: Dialogue[] = [
  // ---------------------------------------------------------------- level 1
  {"id": "ko-d1-cafe", "lv": 1, "title": "카페에서", "titleEn": "At the café", "turns": [
    {"a": {"t": "어서 오세요. 뭐 드릴까요?", "r": "Eoseo oseyo. Mwo deurilkkayo?", "en": "Welcome. What can I get you?"}, "o": [
      {"t": "아이스 아메리카노 한 잔 주세요.", "r": "Aiseu amerikano han jan juseyo.", "en": "An iced americano, please."},
      {"t": "저는 학생이에요.", "r": "Jeoneun haksaengieyo.", "en": "I'm a student."},
      {"t": "네, 맛있어요.", "r": "Ne, masisseoyo.", "en": "Yes, it's delicious."}], "c": 0},
    {"a": {"t": "사이즈는 어떻게 해 드릴까요?", "r": "Saijeuneun eotteoke hae deurilkkayo?", "en": "What size would you like?"}, "o": [
      {"t": "오늘 바빠요.", "r": "Oneul bappayo.", "en": "I'm busy today."},
      {"t": "큰 걸로 주세요.", "r": "Keun geollo juseyo.", "en": "A large one, please."},
      {"t": "지하철로 가요.", "r": "Jihacheollo gayo.", "en": "I go by subway."}], "c": 1},
    {"a": {"t": "드시고 가세요?", "r": "Deusigo gaseyo?", "en": "Is it for here?"}, "o": [
      {"t": "저는 커피를 안 좋아해요.", "r": "Jeoneun keopireul an joahaeyo.", "en": "I don't like coffee."},
      {"t": "다섯 시에 만나요.", "r": "Daseot sie mannayo.", "en": "Let's meet at five."},
      {"t": "아니요, 가지고 갈 거예요.", "r": "Aniyo, gajigo gal geoyeyo.", "en": "No, it's to go."}], "c": 2},
    {"a": {"t": "사천오백 원입니다.", "r": "Sacheonobaek wonimnida.", "en": "That's 4,500 won."}, "o": [
      {"t": "여기 카드요.", "r": "Yeogi kadeuyo.", "en": "Here's my card."},
      {"t": "괜찮아요, 안 아파요.", "r": "Gwaenchanayo, an apayo.", "en": "It's OK, it doesn't hurt."},
      {"t": "저도 반가워요.", "r": "Jeodo bangawoyo.", "en": "Nice to meet you too."}], "c": 0},
    {"a": {"t": "감사합니다. 맛있게 드세요!", "r": "Gamsahamnida. Masitge deuseyo!", "en": "Thank you. Enjoy!"}, "o": [
      {"t": "처음 뵙겠습니다.", "r": "Cheoeum boepgetseumnida.", "en": "How do you do?"},
      {"t": "저는 한국 사람이 아니에요.", "r": "Jeoneun hanguk sarami anieyo.", "en": "I'm not Korean."},
      {"t": "네, 수고하세요.", "r": "Ne, sugohaseyo.", "en": "Thanks, have a good day."}], "c": 2}]},
  {"id": "ko-d1-meet", "lv": 1, "title": "처음 만났어요", "titleEn": "Meeting someone new", "turns": [
    {"a": {"t": "안녕하세요. 저는 지민이에요. 이름이 뭐예요?", "r": "Annyeonghaseyo. Jeoneun jiminieyo. Ireumi mwoyeyo?", "en": "Hi, I'm Jimin. What's your name?"}, "o": [
      {"t": "저는 사과를 좋아해요.", "r": "Jeoneun sagwareul joahaeyo.", "en": "I like apples."},
      {"t": "안녕하세요. 저는 톰이에요.", "r": "Annyeonghaseyo. Jeoneun tomieyo.", "en": "Hi, I'm Tom."},
      {"t": "네, 괜찮아요.", "r": "Ne, gwaenchanayo.", "en": "Yes, that's fine."}], "c": 1},
    {"a": {"t": "톰 씨는 어느 나라 사람이에요?", "r": "Tom ssineun eoneu nara saramieyo?", "en": "Where are you from, Tom?"}, "o": [
      {"t": "미국 사람이에요.", "r": "Miguk saramieyo.", "en": "I'm American."},
      {"t": "열 시예요.", "r": "Yeol siyeyo.", "en": "It's ten o'clock."},
      {"t": "회사에 가요.", "r": "Hoesae gayo.", "en": "I'm going to work."}], "c": 0},
    {"a": {"t": "한국에 언제 왔어요?", "r": "Hanguge eonje wasseoyo?", "en": "When did you come to Korea?"}, "o": [
      {"t": "동생이 있어요.", "r": "Dongsaengi isseoyo.", "en": "I have a younger sibling."},
      {"t": "커피 주세요.", "r": "Keopi juseyo.", "en": "Coffee, please."},
      {"t": "지난달에 왔어요.", "r": "Jinandare wasseoyo.", "en": "I came last month."}], "c": 2},
    {"a": {"t": "한국 생활은 어때요?", "r": "Hanguk saenghwareun eottaeyo?", "en": "How's life in Korea?"}, "o": [
      {"t": "저는 서른 살이에요.", "r": "Jeoneun seoreun sarieyo.", "en": "I'm thirty."},
      {"t": "재미있어요. 그런데 조금 바빠요.", "r": "Jaemiisseoyo. Geureonde jogeum bappayo.", "en": "It's fun, but I'm a bit busy."},
      {"t": "내일 비가 와요.", "r": "Naeil biga wayo.", "en": "It's going to rain tomorrow."}], "c": 1},
    {"a": {"t": "그럼 다음에 같이 밥 먹어요!", "r": "Geureom daeume gachi bap meogeoyo!", "en": "Then let's have a meal together sometime!"}, "o": [
      {"t": "네, 좋아요. 연락할게요.", "r": "Ne, joayo. Yeollakalgeyo.", "en": "Sure, sounds good. I'll be in touch."},
      {"t": "아니요, 학생이에요.", "r": "Aniyo, haksaengieyo.", "en": "No, I'm a student."},
      {"t": "지하철역이 어디예요?", "r": "Jihacheoryeogi eodiyeyo?", "en": "Where's the subway station?"}], "c": 0}]},
  // ---------------------------------------------------------------- level 2
  {"id": "ko-d2-clinic", "lv": 2, "title": "병원에서", "titleEn": "At the doctor's", "turns": [
    {"a": {"t": "어디가 아프세요?", "r": "Eodiga apeuseyo?", "en": "What seems to be the problem?"}, "o": [
      {"t": "어제부터 머리가 아프고 열이 나요.", "r": "Eojebuteo meoriga apeugo yeori nayo.", "en": "I've had a headache and a fever since yesterday."},
      {"t": "병원이 아주 커요.", "r": "Byeongwoni aju keoyo.", "en": "The hospital is very big."},
      {"t": "약국은 저쪽에 있어요.", "r": "Yakgugeun jeojjoge isseoyo.", "en": "The pharmacy is over there."}], "c": 0},
    {"a": {"t": "기침도 하세요?", "r": "Gichimdo haseyo?", "en": "Do you have a cough too?"}, "o": [
      {"t": "아니요, 저는 의사가 아니에요.", "r": "Aniyo, jeoneun uisaga anieyo.", "en": "No, I'm not a doctor."},
      {"t": "네, 밤에 기침을 많이 해요.", "r": "Ne, bame gichimeul mani haeyo.", "en": "Yes, I cough a lot at night."},
      {"t": "주말에 영화를 봤어요.", "r": "Jumare yeonghwareul bwasseoyo.", "en": "I watched a film at the weekend."}], "c": 1},
    {"a": {"t": "감기 같네요. 약을 처방해 드릴게요.", "r": "Gamgi ganneyo. Yageul cheobanghae deurilgeyo.", "en": "It looks like a cold. I'll prescribe you some medicine."}, "o": [
      {"t": "내일 여행을 갈 거예요.", "r": "Naeil yeohaengeul gal geoyeyo.", "en": "I'm going on a trip tomorrow."},
      {"t": "병원은 몇 층에 있어요?", "r": "Byeongwoneun myeot cheunge isseoyo?", "en": "Which floor is the hospital on?"},
      {"t": "감사합니다. 약은 언제 먹어야 돼요?", "r": "Gamsahamnida. Yageun eonje meogeoya dwaeyo?", "en": "Thank you. When should I take it?"}], "c": 2},
    {"a": {"t": "하루에 세 번, 식사 후에 드세요.", "r": "Harue se beon, siksa hue deuseyo.", "en": "Three times a day, after meals."}, "o": [
      {"t": "네, 알겠습니다.", "r": "Ne, algetseumnida.", "en": "OK, I understand."},
      {"t": "아니요, 식사는 맛없어요.", "r": "Aniyo, siksaneun madeopseoyo.", "en": "No, the meal isn't tasty."},
      {"t": "저희는 세 명이에요.", "r": "Jeohuineun se myeongieyo.", "en": "There are three of us."}], "c": 0},
    {"a": {"t": "물을 많이 마시고 푹 쉬세요.", "r": "Mureul mani masigo puk swiseyo.", "en": "Drink plenty of water and get a good rest."}, "o": [
      {"t": "다음 주에 이사해요.", "r": "Daeum jue isahaeyo.", "en": "I'm moving next week."},
      {"t": "네, 그렇게 할게요. 감사합니다.", "r": "Ne, geureoke halgeyo. Gamsahamnida.", "en": "I will. Thank you."},
      {"t": "물은 얼마예요?", "r": "Mureun eolmayeyo?", "en": "How much is the water?"}], "c": 1}]},
  {"id": "ko-d2-weekend", "lv": 2, "title": "주말 계획", "titleEn": "Weekend plans", "turns": [
    {"a": {"t": "이번 주말에 뭐 할 거예요?", "r": "Ibeon jumare mwo hal geoyeyo?", "en": "What are you doing this weekend?"}, "o": [
      {"t": "지난 주말에 쉬었어요.", "r": "Jinan jumare swieosseoyo.", "en": "I rested last weekend."},
      {"t": "아직 계획이 없어요. 왜요?", "r": "Ajik gyehoegi eopseoyo. Waeyo?", "en": "I don't have any plans yet. Why?"},
      {"t": "주말은 토요일하고 일요일이에요.", "r": "Jumareun toyoilhago iryoirieyo.", "en": "The weekend is Saturday and Sunday."}], "c": 1},
    {"a": {"t": "한강에서 자전거를 타려고 하는데 같이 갈래요?", "r": "Hangangeseo jajeongeoreul taryeogo haneunde gachi gallaeyo?", "en": "I'm going cycling by the Han River. Do you want to come?"}, "o": [
      {"t": "좋아요! 몇 시에 만날까요?", "r": "Joayo! Myeot sie mannalkkayo?", "en": "Great! What time shall we meet?"},
      {"t": "저는 수영을 못 해요.", "r": "Jeoneun suyeongeul mot haeyo.", "en": "I can't swim."},
      {"t": "자전거는 바퀴가 두 개예요.", "r": "Jajeongeoneun bakwiga du gaeyeyo.", "en": "A bicycle has two wheels."}], "c": 0},
    {"a": {"t": "오후 두 시 어때요?", "r": "Ohu du si eottaeyo?", "en": "How about two in the afternoon?"}, "o": [
      {"t": "두 시는 너무 비싸요.", "r": "Du sineun neomu bissayo.", "en": "Two o'clock is too expensive."},
      {"t": "두 시에 점심을 먹었어요.", "r": "Du sie jeomsimeul meogeosseoyo.", "en": "I had lunch at two."},
      {"t": "좋아요. 어디에서 만나요?", "r": "Joayo. Eodieseo mannayo?", "en": "Fine. Where shall we meet?"}], "c": 2},
    {"a": {"t": "여의도역 삼 번 출구에서 만나요.", "r": "Yeouidoyeok sam beon chulgueseo mannayo.", "en": "Let's meet at exit 3 of Yeouido Station."}, "o": [
      {"t": "저는 삼 번이 싫어요.", "r": "Jeoneun sam beoni sireoyo.", "en": "I don't like number three."},
      {"t": "네, 알겠어요. 늦지 않을게요.", "r": "Ne, algesseoyo. Neutji aneulgeyo.", "en": "OK, got it. I won't be late."},
      {"t": "역에서 버스를 기다렸어요.", "r": "Yeogeseo beoseureul gidaryeosseoyo.", "en": "I waited for the bus at the station."}], "c": 1},
    {"a": {"t": "자전거는 거기서 빌릴 수 있어요. 물만 가져오세요.", "r": "Jajeongeoneun geogiseo billil su isseoyo. Mulman gajyeooseyo.", "en": "You can rent a bike there. Just bring some water."}, "o": [
      {"t": "자전거를 언제 샀어요?", "r": "Jajeongeoreul eonje sasseoyo?", "en": "When did you buy the bike?"},
      {"t": "물은 어제 다 마셨어요.", "r": "Mureun eoje da masyeosseoyo.", "en": "I drank all the water yesterday."},
      {"t": "네, 그럼 토요일에 봐요!", "r": "Ne, geureom toyoire bwayo!", "en": "OK, see you on Saturday then!"}], "c": 2}]},
  // ---------------------------------------------------------------- level 3
  {"id": "ko-d3-exchange", "lv": 3, "title": "옷 교환하기", "titleEn": "Exchanging clothes", "turns": [
    {"a": {"t": "어서 오세요. 무엇을 도와드릴까요?", "r": "Eoseo oseyo. Mueoseul dowadeurilkkayo?", "en": "Hello. How can I help you?"}, "o": [
      {"t": "이 가게는 몇 시에 문을 닫아요?", "r": "I gageneun myeot sie muneul dadayo?", "en": "What time does this shop close?"},
      {"t": "지난주에 산 바지가 작아서 교환하고 싶은데요.", "r": "Jinanjue san bajiga jagaseo gyohwanhago sipeundeyo.", "en": "The trousers I bought last week are too small, so I'd like to exchange them."},
      {"t": "저는 옷에 별로 관심이 없어요.", "r": "Jeoneun ose byeollo gwansimi eopseoyo.", "en": "I'm not really interested in clothes."}], "c": 1},
    {"a": {"t": "영수증 가지고 오셨어요?", "r": "Yeongsujeung gajigo osyeosseoyo?", "en": "Did you bring the receipt?"}, "o": [
      {"t": "네, 여기 있어요.", "r": "Ne, yeogi isseoyo.", "en": "Yes, here it is."},
      {"t": "영수증은 종이로 만들어요.", "r": "Yeongsujeungeun jongiro mandeureoyo.", "en": "Receipts are made of paper."},
      {"t": "아니요, 바지는 파란색이에요.", "r": "Aniyo, bajineun paransaegieyo.", "en": "No, the trousers are blue."}], "c": 0},
    {"a": {"t": "어떤 사이즈로 바꿔 드릴까요?", "r": "Eotteon saijeuro bakkwo deurilkkayo?", "en": "Which size would you like instead?"}, "o": [
      {"t": "다음 주에 다시 올게요.", "r": "Daeum jue dasi olgeyo.", "en": "I'll come back next week."},
      {"t": "바지를 입고 왔어요.", "r": "Bajireul ipgo wasseoyo.", "en": "I came wearing trousers."},
      {"t": "한 치수 큰 걸로 주세요.", "r": "Han chisu keun geollo juseyo.", "en": "One size bigger, please."}], "c": 2},
    {"a": {"t": "죄송하지만 그 사이즈는 지금 재고가 없어서 주문해야 해요. 사흘 정도 걸리는데 괜찮으세요?", "r": "Joesonghajiman geu saijeuneun jigeum jaegoga eopseoseo jumunhaeya haeyo. Saheul jeongdo geollineunde gwaenchaneuseyo?", "en": "I'm sorry, but that size is out of stock, so we'll have to order it. It takes about three days. Is that OK?"}, "o": [
      {"t": "사흘 전에 샀어요.", "r": "Saheul jeone sasseoyo.", "en": "I bought them three days ago."},
      {"t": "괜찮아요. 들어오면 연락 주세요.", "r": "Gwaenchanayo. Deureoomyeon yeollak juseyo.", "en": "That's fine. Please let me know when they arrive."},
      {"t": "그럼 지금 바로 입고 갈게요.", "r": "Geureom jigeum baro ipgo galgeyo.", "en": "Then I'll wear them out right now."}], "c": 1},
    {"a": {"t": "네, 물건이 들어오면 문자 드릴게요.", "r": "Ne, mulgeoni deureoomyeon munja deurilgeyo.", "en": "Sure, I'll text you when they come in."}, "o": [
      {"t": "감사합니다. 수고하세요.", "r": "Gamsahamnida. Sugohaseyo.", "en": "Thank you. Have a good day."},
      {"t": "아니요, 문자를 벌써 보냈어요.", "r": "Aniyo, munjareul beolsseo bonaesseoyo.", "en": "No, I've already sent a text."},
      {"t": "저는 전화번호가 없어요.", "r": "Jeoneun jeonhwabeonhoga eopseoyo.", "en": "I don't have a phone number."}], "c": 0}]},
  {"id": "ko-d3-sickday", "lv": 3, "title": "병가 내기", "titleEn": "Calling in sick", "turns": [
    {"a": {"t": "네, 박 팀장입니다.", "r": "Ne, bak timjangimnida.", "en": "Hello, Park speaking."}, "o": [
      {"t": "박 팀장님은 지금 안 계세요.", "r": "Bak timjangnimeun jigeum an gyeseyo.", "en": "Team Leader Park isn't here right now."},
      {"t": "팀장님, 점심 맛있게 드셨어요?", "r": "Timjangnim, jeomsim masitge deusyeosseoyo?", "en": "Did you enjoy your lunch?"},
      {"t": "팀장님, 김민지인데요. 오늘 몸이 안 좋아서 전화드렸어요.", "r": "Timjangnim, gimminjiindeyo. Oneul momi an joaseo jeonhwadeuryeosseoyo.", "en": "It's Kim Minji. I'm calling because I'm not feeling well today."}], "c": 2},
    {"a": {"t": "많이 아파요? 병원에는 가 봤어요?", "r": "Mani apayo? Byeongwoneneun ga bwasseoyo?", "en": "Is it bad? Have you been to the doctor?"}, "o": [
      {"t": "어젯밤부터 열이 나서 아침에 병원에 다녀왔어요.", "r": "Eojetbambuteo yeori naseo achime byeongwone danyeowasseoyo.", "en": "I've had a fever since last night, so I went to the clinic this morning."},
      {"t": "아니요, 병원은 회사 근처에 있어요.", "r": "Aniyo, byeongwoneun hoesa geuncheoe isseoyo.", "en": "No, the hospital is near the office."},
      {"t": "네, 회의는 열 시에 시작해요.", "r": "Ne, hoeuineun yeol sie sijakaeyo.", "en": "Yes, the meeting starts at ten."}], "c": 0},
    {"a": {"t": "의사 선생님이 뭐라고 하셨어요?", "r": "Uisa seonsaengnimi mworago hasyeosseoyo?", "en": "What did the doctor say?"}, "o": [
      {"t": "저도 의사가 되고 싶어요.", "r": "Jeodo uisaga doego sipeoyo.", "en": "I want to be a doctor too."},
      {"t": "장염이라서 이틀 정도 쉬라고 하셨어요.", "r": "Jangyeomiraseo iteul jeongdo swirago hasyeosseoyo.", "en": "It's a stomach bug, so they told me to rest for about two days."},
      {"t": "병원이 아주 깨끗했어요.", "r": "Byeongwoni aju kkaekkeutaesseoyo.", "en": "The clinic was very clean."}], "c": 1},
    {"a": {"t": "그럼 오늘하고 내일은 쉬어요. 급한 일은 없죠?", "r": "Geureom oneulhago naeireun swieoyo. Geupan ireun eopjyo?", "en": "Then take today and tomorrow off. Nothing urgent, right?"}, "o": [
      {"t": "오늘은 날씨가 정말 좋네요.", "r": "Oneureun nalssiga jeongmal jonneyo.", "en": "The weather is lovely today."},
      {"t": "네, 내일 아침에 일찍 출근할게요.", "r": "Ne, naeil achime iljjik chulgeunhalgeyo.", "en": "Yes, I'll come in early tomorrow morning."},
      {"t": "보고서는 어제 다 보내 드려서 괜찮을 거예요.", "r": "Bogoseoneun eoje da bonae deuryeoseo gwaenchaneul geoyeyo.", "en": "I sent you the whole report yesterday, so it should be fine."}], "c": 2},
    {"a": {"t": "알겠어요. 푹 쉬고 빨리 나아요.", "r": "Algesseoyo. Puk swigo ppalli naayo.", "en": "All right. Get some rest and get well soon."}, "o": [
      {"t": "감사합니다. 나으면 바로 연락드리겠습니다.", "r": "Gamsahamnida. Naeumyeon baro yeollakdeurigetseumnida.", "en": "Thank you. I'll get in touch as soon as I'm better."},
      {"t": "아니요, 저는 안 아파요.", "r": "Aniyo, jeoneun an apayo.", "en": "No, I'm not sick."},
      {"t": "네, 지금 회사로 갈게요.", "r": "Ne, jigeum hoesaro galgeyo.", "en": "OK, I'll head to the office now."}], "c": 0}]},
  // ---------------------------------------------------------------- level 4
  {"id": "ko-d4-leak", "lv": 4, "title": "집주인과 통화", "titleEn": "Calling the landlord", "turns": [
    {"a": {"t": "여보세요, 삼백이 호죠? 무슨 일 있으세요?", "r": "Yeoboseyo, sambaegi hojyo? Museun il isseuseyo?", "en": "Hello, is that flat 302? Is something wrong?"}, "o": [
      {"t": "네, 다름이 아니라 화장실 천장에서 물이 새서 연락드렸어요.", "r": "Ne, dareumi anira hwajangsil cheonjangeseo muri saeseo yeollakdeuryeosseoyo.", "en": "Yes, I'm calling because water is leaking from the bathroom ceiling."},
      {"t": "네, 이 집에 산 지 일 년 됐어요.", "r": "Ne, i jibe san ji il nyeon dwaesseoyo.", "en": "Yes, I've lived here for a year."},
      {"t": "아니요, 저는 집주인이 아니에요.", "r": "Aniyo, jeoneun jipjuini anieyo.", "en": "No, I'm not the landlord."}], "c": 0},
    {"a": {"t": "아이고, 언제부터 그랬어요?", "r": "Aigo, eonjebuteo geuraesseoyo?", "en": "Oh dear, since when?"}, "o": [
      {"t": "이 건물은 십 년 전에 지었대요.", "r": "I geonmureun sip nyeon jeone jieotdaeyo.", "en": "I heard this building was built ten years ago."},
      {"t": "어제 저녁부터 조금씩 떨어지더니 오늘 아침에는 꽤 많아졌어요.", "r": "Eoje jeonyeokbuteo jogeumssik tteoreojideoni oneul achimeneun kkwae manajyeosseoyo.", "en": "It started dripping a little yesterday evening, and by this morning it was quite a lot."},
      {"t": "내일부터 휴가라서 좋아요.", "r": "Naeilbuteo hyugaraseo joayo.", "en": "I'm glad my holiday starts tomorrow."}], "c": 1},
    {"a": {"t": "위층에서 새는 것 같은데, 오늘 오후에 수리 기사를 보낼게요. 집에 계실 수 있어요?", "r": "Wicheungeseo saeneun geot gateunde, oneul ohue suri gisareul bonaelgeyo. Jibe gyesil su isseoyo?", "en": "It sounds like it's coming from upstairs. I'll send a repairman this afternoon. Can you be at home?"}, "o": [
      {"t": "수리 기사가 되려면 어떻게 해야 돼요?", "r": "Suri gisaga doeryeomyeon eotteoke haeya dwaeyo?", "en": "What do I have to do to become a repairman?"},
      {"t": "위층 사람은 아주 친절해요.", "r": "Wicheung sarameun aju chinjeolhaeyo.", "en": "The person upstairs is very kind."},
      {"t": "오후에는 회사에 있어서요. 현관 비밀번호를 알려 드려도 될까요?", "r": "Ohueneun hoesae isseoseoyo. Hyeongwan bimilbeonhoreul allyeo deuryeodo doelkkayo?", "en": "I'll be at work in the afternoon. Could I give you the door code instead?"}], "c": 2},
    {"a": {"t": "그렇게 해 주시면 저야 편하죠. 문자로 보내 주세요.", "r": "Geureoke hae jusimyeon jeoya pyeonhajyo. Munjaro bonae juseyo.", "en": "That would make it easier for me. Please text it to me."}, "o": [
      {"t": "네, 지금 바로 보내 드릴게요.", "r": "Ne, jigeum baro bonae deurilgeyo.", "en": "Sure, I'll send it right away."},
      {"t": "문자보다 편지가 더 좋아요.", "r": "Munjaboda pyeonjiga deo joayo.", "en": "I prefer letters to texts."},
      {"t": "비밀번호를 바꾼 지 오래됐어요.", "r": "Bimilbeonhoreul bakkun ji oraedwaesseoyo.", "en": "It's been ages since I changed the code."}], "c": 0},
    {"a": {"t": "수리 끝나면 제가 다시 연락드릴게요. 불편하게 해서 미안해요.", "r": "Suri kkeunnamyeon jega dasi yeollakdeurilgeyo. Bulpyeonhage haeseo mianhaeyo.", "en": "I'll call you again once the repair is done. Sorry for the trouble."}, "o": [
      {"t": "그럼 이번 달 월세를 올려 주세요.", "r": "Geureom ibeon dal wolsereul ollyeo juseyo.", "en": "Then please raise this month's rent."},
      {"t": "아니에요. 빨리 신경 써 주셔서 감사합니다.", "r": "Anieyo. Ppalli singyeong sseo jusyeoseo gamsahamnida.", "en": "Not at all. Thank you for dealing with it so quickly."},
      {"t": "수리는 다음 달에 해도 돼요.", "r": "Surineun daeum dare haedo dwaeyo.", "en": "The repair can wait until next month."}], "c": 1}]},
  {"id": "ko-d4-interview", "lv": 4, "title": "면접", "titleEn": "A job interview", "turns": [
    {"a": {"t": "간단하게 자기소개 부탁드립니다.", "r": "Gandanhage jagisogae butakdeurimnida.", "en": "Please briefly introduce yourself."}, "o": [
      {"t": "자기소개는 다음에 하겠습니다.", "r": "Jagisogaeneun daeume hagetseumnida.", "en": "I'll introduce myself another time."},
      {"t": "저는 소개팅을 좋아합니다.", "r": "Jeoneun sogaetingeul joahamnida.", "en": "I like blind dates."},
      {"t": "안녕하십니까. 지난 오 년 동안 마케팅 업무를 해 온 이수진입니다.", "r": "Annyeonghasimnikka. Jinan o nyeon dongan maketing eommureul hae on isujinimnida.", "en": "Good afternoon. I'm Lee Sujin, and I've worked in marketing for the past five years."}], "c": 2},
    {"a": {"t": "저희 회사에 지원하신 이유가 무엇입니까?", "r": "Jeohui hoesae jiwonhasin iyuga mueosimnikka?", "en": "Why did you apply to our company?"}, "o": [
      {"t": "친환경 제품을 만드는 회사의 방향이 제 가치관과 잘 맞는다고 생각했습니다.", "r": "Chinhwangyeong jepumeul mandeuneun hoesaui banghyangi je gachigwangwa jal manneundago saenggakaetseumnida.", "en": "I felt that your focus on eco-friendly products fits my own values."},
      {"t": "지원서는 어제 이메일로 보냈습니다.", "r": "Jiwonseoneun eoje imeillo bonaetseumnida.", "en": "I sent the application by email yesterday."},
      {"t": "회사 건물이 아주 높기 때문입니다.", "r": "Hoesa geonmuri aju nopgi ttaemunimnida.", "en": "Because your building is very tall."}], "c": 0},
    {"a": {"t": "이전 직장에서 가장 어려웠던 일은 무엇이었나요?", "r": "Ijeon jikjangeseo gajang eoryeowotdeon ireun mueosieonnayo?", "en": "What was the hardest thing at your previous job?"}, "o": [
      {"t": "이전 직장은 강남에 있었습니다.", "r": "Ijeon jikjangeun gangname isseotseumnida.", "en": "My previous job was in Gangnam."},
      {"t": "예산이 줄어든 상황에서 신제품 홍보를 맡았던 일이 가장 어려웠습니다.", "r": "Yesani jureodeun sanghwangeseo sinjepum hongboreul matatdeon iri gajang eoryeowotseumnida.", "en": "The hardest was being put in charge of promoting a new product after the budget had been cut."},
      {"t": "가장 쉬운 일은 회의였습니다.", "r": "Gajang swiun ireun hoeuiyeotseumnida.", "en": "The easiest thing was meetings."}], "c": 1},
    {"a": {"t": "그 문제를 어떻게 해결하셨습니까?", "r": "Geu munjereul eotteoke haegyeolhasyeotseumnikka?", "en": "How did you solve that problem?"}, "o": [
      {"t": "그 회사는 지금 없어졌습니다.", "r": "Geu hoesaneun jigeum eopseojyeotseumnida.", "en": "That company no longer exists."},
      {"t": "문제는 다른 팀에서 냈습니다.", "r": "Munjeneun dareun timeseo naetseumnida.", "en": "Another team set the problem."},
      {"t": "비용이 적게 드는 온라인 홍보에 집중해서 목표 매출을 달성할 수 있었습니다.", "r": "Biyongi jeokge deuneun ollain hongboe jipjunghaeseo mokpyo maechureul dalseonghal su isseotseumnida.", "en": "I focused on low-cost online promotion and we managed to hit our sales target."}], "c": 2},
    {"a": {"t": "마지막으로 하고 싶은 말씀 있으십니까?", "r": "Majimageuro hago sipeun malsseum isseusimnikka?", "en": "Finally, is there anything you'd like to add?"}, "o": [
      {"t": "오늘 소중한 기회를 주셔서 감사합니다. 꼭 함께 일하고 싶습니다.", "r": "Oneul sojunghan gihoereul jusyeoseo gamsahamnida. Kkok hamkke ilhago sipseumnida.", "en": "Thank you for this valuable opportunity. I'd really love to work with you."},
      {"t": "마지막 버스는 열한 시에 있습니다.", "r": "Majimak beoseuneun yeolhan sie itseumnida.", "en": "The last bus is at eleven."},
      {"t": "아니요, 말씀하지 마십시오.", "r": "Aniyo, malsseumhaji masipsio.", "en": "No, please don't speak."}], "c": 0}]},
  // ---------------------------------------------------------------- level 5
  {"id": "ko-d5-noise", "lv": 5, "title": "층간 소음", "titleEn": "Noise from upstairs", "turns": [
    {"a": {"t": "네, 누구세요?", "r": "Ne, nuguseyo?", "en": "Yes, who is it?"}, "o": [
      {"t": "아래층에 사는 사람인데요, 잠깐 이야기 좀 나눌 수 있을까요?", "r": "Araecheunge saneun saramindeyo, jamkkan iyagi jom nanul su isseulkkayo?", "en": "I live downstairs. Could we have a quick word?"},
      {"t": "저는 이 건물을 아주 좋아해요.", "r": "Jeoneun i geonmureul aju joahaeyo.", "en": "I really like this building."},
      {"t": "위층 사람들은 다 어디 갔어요?", "r": "Wicheung saramdeureun da eodi gasseoyo?", "en": "Where have all the upstairs people gone?"}], "c": 0},
    {"a": {"t": "아, 네. 무슨 일이신데요?", "r": "A, ne. Museun irisindeyo?", "en": "Oh, sure. What's the matter?"}, "o": [
      {"t": "무슨 일이든 열심히 하는 편이에요.", "r": "Museun irideun yeolsimhi haneun pyeonieyo.", "en": "I tend to work hard at whatever I do."},
      {"t": "다름이 아니라 요즘 밤늦게까지 쿵쿵거리는 소리가 들려서요.", "r": "Dareumi anira yojeum bamneutgekkaji kungkunggeorineun soriga deullyeoseoyo.", "en": "It's just that lately I've been hearing thumping until late at night."},
      {"t": "오늘은 일이 별로 없어요.", "r": "Oneureun iri byeollo eopseoyo.", "en": "I don't have much work today."}], "c": 1},
    {"a": {"t": "어머, 그랬어요? 아이들이 뛰어서 그런가 봐요. 정말 죄송해요.", "r": "Eomeo, geuraesseoyo? Aideuri ttwieoseo geureonga bwayo. Jeongmal joesonghaeyo.", "en": "Oh no, really? It must be the kids running around. I'm so sorry."}, "o": [
      {"t": "죄송할 필요 없어요. 계속 뛰어도 돼요.", "r": "Joesonghal piryo eopseoyo. Gyesok ttwieodo dwaeyo.", "en": "No need to apologize. They can keep running."},
      {"t": "저는 아이들을 위해 장난감을 샀어요.", "r": "Jeoneun aideureul wihae jangnangameul sasseoyo.", "en": "I bought toys for the children."},
      {"t": "아이들이 있으면 그럴 수 있죠. 다만 열 시 이후에는 조금만 신경 써 주시면 좋겠어요.", "r": "Aideuri isseumyeon geureol su itjyo. Daman yeol si ihueneun jogeumman singyeong sseo jusimyeon jokesseoyo.", "en": "That happens with kids. I'd just appreciate it if you could be a bit careful after ten."}], "c": 2},
    {"a": {"t": "네, 바닥에 매트도 깔고 아이들한테도 잘 얘기할게요.", "r": "Ne, badage maeteudo kkalgo aideulhantedo jal yaegihalgeyo.", "en": "Of course. I'll put mats down and have a word with the kids."}, "o": [
      {"t": "그렇게까지 해 주신다니 오히려 제가 미안하네요.", "r": "Geureokekkaji hae jusindani ohiryeo jega mianhaneyo.", "en": "That's very kind of you. Now I feel bad for asking."},
      {"t": "매트를 깔면 더 시끄러워질 거예요.", "r": "Maeteureul kkalmyeon deo sikkeureowojil geoyeyo.", "en": "Putting mats down will make it louder."},
      {"t": "아이들한테 얘기하지 마세요.", "r": "Aideulhante yaegihaji maseyo.", "en": "Don't tell the children."}], "c": 0},
    {"a": {"t": "아니에요. 불편하셨을 텐데 직접 말씀해 주셔서 오히려 감사해요.", "r": "Anieyo. Bulpyeonhasyeosseul tende jikjeop malsseumhae jusyeoseo ohiryeo gamsahaeyo.", "en": "Not at all. It must have been annoying, so thank you for telling me in person."}, "o": [
      {"t": "직접 말하는 건 정말 싫어요.", "r": "Jikjeop malhaneun geon jeongmal sireoyo.", "en": "I really hate saying things face to face."},
      {"t": "내일 이사 가시는 거죠?", "r": "Naeil isa gasineun geojyo?", "en": "You're moving out tomorrow, right?"},
      {"t": "그럼 앞으로도 잘 부탁드려요. 좋은 저녁 보내세요.", "r": "Geureom apeurodo jal butakdeuryeoyo. Joeun jeonyeok bonaeseyo.", "en": "Well, I hope we'll get on well. Have a nice evening."}], "c": 2}]},
  {"id": "ko-d5-remote", "lv": 5, "title": "재택근무", "titleEn": "Working from home", "turns": [
    {"a": {"t": "다음 달부터 일주일에 이틀은 재택근무를 할 수 있대요. 들었어요?", "r": "Daeum dalbuteo iljuire iteureun jaetaekgeunmureul hal su itdaeyo. Deureosseoyo?", "en": "Apparently from next month we can work from home two days a week. Did you hear?"}, "o": [
      {"t": "아니요, 저는 다음 달에 이사해요.", "r": "Aniyo, jeoneun daeum dare isahaeyo.", "en": "No, I'm moving next month."},
      {"t": "네, 저도 오늘 아침에 공지 봤어요. 반가운 소식이더라고요.", "r": "Ne, jeodo oneul achime gongji bwasseoyo. Bangaun sosigideoragoyo.", "en": "Yes, I saw the notice this morning too. Good news, isn't it?"},
      {"t": "재택근무는 일주일에 칠 일이에요.", "r": "Jaetaekgeunmuneun iljuire chil irieyo.", "en": "Remote work is seven days a week."}], "c": 1},
    {"a": {"t": "출퇴근 시간이 줄어드는 건 좋은데, 저는 집에서는 집중이 잘 안 돼서 걱정이에요.", "r": "Chultoegeun sigani jureodeuneun geon joeunde, jeoneun jibeseoneun jipjungi jal an dwaeseo geokjeongieyo.", "en": "Less commuting is nice, but I find it hard to concentrate at home, so I'm a bit worried."}, "o": [
      {"t": "저도 처음엔 그랬는데, 일하는 공간을 따로 정해 두니까 훨씬 낫더라고요.", "r": "Jeodo cheoeumen geuraenneunde, ilhaneun gongganeul ttaro jeonghae dunikka hwolssin natdeoragoyo.", "en": "I was the same at first, but setting aside a separate space to work made a big difference."},
      {"t": "집중력이 좋아서 다행이네요.", "r": "Jipjungnyeogi joaseo dahaengineyo.", "en": "Good thing you concentrate so well."},
      {"t": "출퇴근할 때는 주로 지하철을 타요.", "r": "Chultoegeunhal ttaeneun juro jihacheoreul tayo.", "en": "I usually take the subway to work."}], "c": 0},
    {"a": {"t": "그래요? 그런데 동료들하고 소통이 줄어드는 것도 문제 아닐까요?", "r": "Geuraeyo? Geureonde dongnyodeulhago sotongi jureodeuneun geotdo munje anilkkayo?", "en": "Really? But isn't less contact with colleagues a problem too?"}, "o": [
      {"t": "동료들은 벌써 다 퇴근했어요.", "r": "Dongnyodeureun beolsseo da toegeunhaesseoyo.", "en": "Our colleagues have all gone home already."},
      {"t": "소통이라는 단어는 너무 어려워요.", "r": "Sotongiraneun daneoneun neomu eoryeowoyo.", "en": "The word 'communication' is too difficult."},
      {"t": "맞아요. 그래서 화상 회의라도 정기적으로 하는 게 중요할 것 같아요.", "r": "Majayo. Geuraeseo hwasang hoeuirado jeonggijeogeuro haneun ge jungyohal geot gatayo.", "en": "True. That's why I think regular video meetings will be important."}], "c": 2},
    {"a": {"t": "결국 장단점이 다 있네요. 선배는 어느 쪽이 더 나은 것 같아요?", "r": "Gyeolguk jangdanjeomi da inneyo. Seonbaeneun eoneu jjogi deo naeun geot gatayo?", "en": "So there are pros and cons. Which do you think is better?"}, "o": [
      {"t": "어느 쪽으로 가야 역이 나와요?", "r": "Eoneu jjogeuro gaya yeogi nawayo?", "en": "Which way is the station?"},
      {"t": "저는 출근하는 날과 재택하는 날을 섞는 지금 방식이 제일 현실적인 것 같아요.", "r": "Jeoneun chulgeunhaneun nalgwa jaetaekaneun nareul seongneun jigeum bangsigi jeil hyeonsiljeogin geot gatayo.", "en": "I think this mix of office days and home days is the most realistic."},
      {"t": "장점이 많으니까 단점이 더 좋아요.", "r": "Jangjeomi maneunikka danjeomi deo joayo.", "en": "There are many pros, so the cons are better."}], "c": 1},
    {"a": {"t": "듣고 보니 그러네요. 일단 해 보고 안 맞으면 그때 다시 생각해 봐야겠어요.", "r": "Deutgo boni geureoneyo. Ildan hae bogo an majeumyeon geuttae dasi saenggakae bwayagesseoyo.", "en": "Now that you put it that way, you're right. I'll give it a try and rethink it if it doesn't suit me."}, "o": [
      {"t": "그게 좋겠어요. 해 보고 불편한 점은 팀장님께 건의하면 되죠.", "r": "Geuge jokesseoyo. Hae bogo bulpyeonhan jeomeun timjangnimkke geonuihamyeon doejyo.", "en": "Good idea. If anything's inconvenient, you can raise it with the team leader."},
      {"t": "다시 생각하지 마세요. 절대 안 돼요.", "r": "Dasi saenggakaji maseyo. Jeoldae an dwaeyo.", "en": "Don't rethink it. Absolutely not."},
      {"t": "듣는 것보다 읽는 게 더 어려워요.", "r": "Deunneun geotboda ingneun ge deo eoryeowoyo.", "en": "Reading is harder than listening."}], "c": 0}]},
  // ---------------------------------------------------------------- level 6
  {"id": "ko-d6-career", "lv": 6, "title": "선배와의 진로 상담", "titleEn": "Career advice from a mentor", "turns": [
    {"a": {"t": "요즘 얼굴이 안 좋아 보이네. 무슨 고민 있어?", "r": "Yojeum eolguri an joa boine. Museun gomin isseo?", "en": "You haven't looked yourself lately. Is something on your mind?"}, "o": [
      {"t": "오늘 점심은 김치찌개였어요.", "r": "Oneul jeomsimeun gimchijjigaeyeosseoyo.", "en": "Lunch today was kimchi stew."},
      {"t": "사실 이직을 할지 말지 몇 달째 고민하고 있어요.", "r": "Sasil ijigeul halji malji myeot daljjae gominhago isseoyo.", "en": "To be honest, I've been agonizing for months over whether to change jobs."},
      {"t": "얼굴은 원래 이렇게 생겼어요.", "r": "Eolgureun wollae ireoke saenggyeosseoyo.", "en": "My face has always looked like this."}], "c": 1},
    {"a": {"t": "지금 회사에 무슨 불만이라도 있는 거야?", "r": "Jigeum hoesae museun bulmanirado inneun geoya?", "en": "Are you unhappy with something at the company?"}, "o": [
      {"t": "불만이라기보다는, 몇 년째 같은 일만 반복하다 보니 성장이 멈춘 것 같아서요.", "r": "Bulmaniragibodaneun, myeot nyeonjjae gateun ilman banbokada boni seongjangi meomchun geot gataseoyo.", "en": "It's not dissatisfaction exactly. I've been doing the same work for years and feel like I've stopped growing."},
      {"t": "아니요, 회사는 역에서 가까워요.", "r": "Aniyo, hoesaneun yeogeseo gakkawoyo.", "en": "No, the office is close to the station."},
      {"t": "불만이 있으시면 고객센터에 전화하세요.", "r": "Bulmani isseusimyeon gogaeksenteoe jeonhwahaseyo.", "en": "If you have a complaint, please call customer service."}], "c": 0},
    {"a": {"t": "그 마음은 이해해. 그런데 옮길 곳은 구체적으로 알아봤어?", "r": "Geu maeumeun ihaehae. Geureonde omgil goseun guchejeogeuro arabwasseo?", "en": "I understand how you feel. But have you looked into where you'd actually go?"}, "o": [
      {"t": "이삿짐 센터는 벌써 예약해 뒀어요.", "r": "Isatjim senteoneun beolsseo yeyakae dwosseoyo.", "en": "I've already booked the removal company."},
      {"t": "구체적인 건 추상적인 것의 반대예요.", "r": "Guchejeogin geon chusangjeogin geosui bandaeyeyo.", "en": "Concrete is the opposite of abstract."},
      {"t": "아직 막연하게 생각만 하고 있었어요. 그 부분이 제일 마음에 걸려요.", "r": "Ajik magyeonhage saenggangman hago isseosseoyo. Geu bubuni jeil maeume geollyeoyo.", "en": "I've only been thinking about it vaguely. That's what worries me most."}], "c": 2},
    {"a": {"t": "섣불리 그만두기보다는 지금 자리에서 할 수 있는 걸 먼저 찾아보는 것도 방법이야. 새 프로젝트에 자원해 본다든지.", "r": "Seotbulli geumandugibodaneun jigeum jarieseo hal su inneun geol meonjeo chajaboneun geotdo bangbeobiya. Sae peurojekteue jawonhae bondadeunji.", "en": "Rather than quitting rashly, you could first look for what you can do where you are. Like volunteering for a new project."}, "o": [
      {"t": "저는 자원봉사에는 관심이 없어요.", "r": "Jeoneun jawonbongsaeneun gwansimi eopseoyo.", "en": "I'm not interested in charity work."},
      {"t": "듣고 보니 회사 안에서도 기회를 만들 수 있겠네요. 미처 거기까지는 생각을 못 했어요.", "r": "Deutgo boni hoesa aneseodo gihoereul mandeul su itgenneyo. Micheo geogikkajineun saenggageul mot haesseoyo.", "en": "Now that you mention it, I could create opportunities inside the company too. I hadn't thought that far."},
      {"t": "새 프로젝트는 작년에 끝났어요.", "r": "Sae peurojekteuneun jangnyeone kkeunnasseoyo.", "en": "The new project ended last year."}], "c": 1},
    {"a": {"t": "결정은 네가 하는 거지만, 후회 없는 선택을 했으면 좋겠다.", "r": "Gyeoljeongeun nega haneun geojiman, huhoe eomneun seontaegeul haesseumyeon joketda.", "en": "It's your decision in the end, but I hope you make a choice you won't regret."}, "o": [
      {"t": "말씀 새겨듣겠습니다. 덕분에 생각이 많이 정리됐어요.", "r": "Malsseum saegyeodeutgetseumnida. Deokbune saenggagi mani jeongnidwaesseoyo.", "en": "I'll take your advice to heart. Thanks to you, my thoughts are much clearer."},
      {"t": "후회는 이미 충분히 했으니까 괜찮아요.", "r": "Huhoeneun imi chungbunhi haesseunikka gwaenchanayo.", "en": "It's fine, I've already done enough regretting."},
      {"t": "선택지가 세 개밖에 없네요.", "r": "Seontaekjiga se gaebakke eomneyo.", "en": "There are only three options."}], "c": 0}]},
  {"id": "ko-d6-ai", "lv": 6, "title": "인공지능과 일자리", "titleEn": "AI and jobs: a panel discussion", "turns": [
    {"a": {"t": "인공지능이 일자리를 빼앗을 것이라는 우려에 대해 어떻게 보십니까?", "r": "Ingongjineungi iljarireul ppaeaseul geosiraneun uryeoe daehae eotteoke bosimnikka?", "en": "What is your view of the fear that AI will take away jobs?"}, "o": [
      {"t": "인공지능이라는 말은 영어에서 왔습니다.", "r": "Ingongjineungiraneun mareun yeongeoeseo watseumnida.", "en": "The term 'artificial intelligence' comes from English."},
      {"t": "저는 지금 일자리를 구하고 있습니다.", "r": "Jeoneun jigeum iljarireul guhago itseumnida.", "en": "I'm currently looking for a job."},
      {"t": "일부 직무가 사라지는 것은 불가피하겠지만, 새로운 직무가 생겨날 가능성도 함께 봐야 한다고 생각합니다.", "r": "Ilbu jingmuga sarajineun geoseun bulgapihagetjiman, saeroun jingmuga saenggyeonal ganeungseongdo hamkke bwaya handago saenggakamnida.", "en": "Some roles will inevitably disappear, but I think we also have to consider the new roles that may emerge."}], "c": 2},
    {"a": {"t": "하지만 새로운 일자리가 사라지는 일자리만큼 빠르게 생길지는 의문입니다.", "r": "Hajiman saeroun iljariga sarajineun iljarimankeum ppareuge saenggiljineun uimunimnida.", "en": "But it's doubtful whether new jobs will appear as fast as old ones disappear."}, "o": [
      {"t": "바로 그 점에서 전환기의 재교육 정책이 무엇보다 중요하다고 봅니다.", "r": "Baro geu jeomeseo jeonhwangiui jaegyoyuk jeongchaegi mueotboda jungyohadago bomnida.", "en": "That's exactly why I believe retraining during the transition matters more than anything."},
      {"t": "일자리는 빠를수록 좋습니다.", "r": "Iljarineun ppareulsurok josseumnida.", "en": "The faster the job, the better."},
      {"t": "의문이 있으시면 나중에 질문해 주십시오.", "r": "Uimuni isseusimyeon najunge jilmunhae jusipsio.", "en": "If you have doubts, please ask questions later."}], "c": 0},
    {"a": {"t": "재교육만으로 중장년층의 전환을 뒷받침할 수 있을까요?", "r": "Jaegyoyungmaneuro jungjangnyeoncheungui jeonhwaneul dwitbatchimhal su isseulkkayo?", "en": "Can retraining alone support middle-aged workers through the transition?"}, "o": [
      {"t": "중장년층은 대체로 등산을 좋아합니다.", "r": "Jungjangnyeoncheungeun daechero deungsaneul joahamnida.", "en": "Middle-aged people generally like hiking."},
      {"t": "물론 한계는 있습니다. 그래서 교육과 함께 일정 기간 소득을 보전해 주는 장치가 병행되어야 합니다.", "r": "Mullon hangyeneun itseumnida. Geuraeseo gyoyukgwa hamkke iljeong gigan sodeugeul bojeonhae juneun jangchiga byeonghaengdoeeoya hamnida.", "en": "Of course it has limits. That's why training must go hand in hand with measures that protect people's income for a period."},
      {"t": "재교육은 학교를 다시 다니는 것을 말합니다.", "r": "Jaegyoyugeun hakgyoreul dasi danineun geoseul malhamnida.", "en": "Retraining means going back to school."}], "c": 1},
    {"a": {"t": "결국 비용 문제로 귀결되는 것 아닙니까?", "r": "Gyeolguk biyong munjero gwigyeoldoeneun geot animnikka?", "en": "Doesn't it all come down to cost in the end?"}, "o": [
      {"t": "비용은 오늘 제가 내겠습니다.", "r": "Biyongeun oneul jega naegetseumnida.", "en": "I'll pay today."},
      {"t": "비용이 많이 들수록 제품이 좋습니다.", "r": "Biyongi mani deulsurok jepumi josseumnida.", "en": "The more it costs, the better the product."},
      {"t": "비용이 드는 것은 사실이지만, 아무 대비 없이 맞을 사회적 비용에 비하면 오히려 적다고 생각합니다.", "r": "Biyongi deuneun geoseun sasirijiman, amu daebi eopsi majeul sahoejeok biyonge bihamyeon ohiryeo jeokdago saenggakamnida.", "en": "It's true it costs money, but compared with the social cost of facing this unprepared, I think it's actually small."}], "c": 2},
    {"a": {"t": "마지막으로 시청자 여러분께 한 말씀 부탁드립니다.", "r": "Majimageuro sicheongja yeoreobunkke han malsseum butakdeurimnida.", "en": "Finally, a word for our viewers, please."}, "o": [
      {"t": "기술의 변화를 막을 수는 없지만, 그 방향은 우리가 함께 정할 수 있다는 점을 기억해 주셨으면 합니다.", "r": "Gisurui byeonhwareul mageul suneun eopjiman, geu banghyangeun uriga hamkke jeonghal su itdaneun jeomeul gieokae jusyeosseumyeon hamnida.", "en": "We can't stop technological change, but I'd like people to remember that we can decide its direction together."},
      {"t": "한 말씀만 하기에는 시간이 너무 깁니다.", "r": "Han malsseumman hagieneun sigani neomu gimnida.", "en": "There's too much time for just one word."},
      {"t": "저는 텔레비전을 거의 보지 않습니다.", "r": "Jeoneun tellebijeoneul geoui boji ansseumnida.", "en": "I hardly ever watch television."}], "c": 0}]},
];

export default data;
