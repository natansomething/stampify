import type { CheatSheet } from '../../types';

const sheet: CheatSheet = {
  id: 'ko-cs-endings',
  title: "Sentence endings and expressions",
  summary: "About 45 endings and set patterns: reactions, will, requests, guesses, ability, aspect…",
  body: [
    { p: "These go at the end of the sentence and add the speaker's attitude (surprise, a promise, a guess) or a meaning such as 'can', 'must' or 'have done'. They are given in the polite 해요 form; most also exist in the other speech levels." },

    { h: "Reacting and explaining" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-네요** (-neyo)", "oh, …! (reacting to something you notice now)", "Verbs and adjectives; ㄹ-stems drop ㄹ (머네요)", "날씨가 좋**네요**! (Nalssiga jonneyo!)", "Oh, the weather's nice!"],
      ["**-군요 / -는군요** (-gunyo / -neungunyo)", "I see, so …! (realising something new)", "-군요 after adjectives and 이다, -는군요 after verbs", "한국 사람이**군요**. (Hanguk saramigunyo.)", "Oh, so you're Korean."],
      ["**-잖아요** (-janayo)", "you know, …; after all, …", "Reminds the listener of something they already know", "내일 시험이**잖아요**. (Naeil siheomijanayo.)", "We've got an exam tomorrow, you know."],
      ["**-거든요** (-geodeunyo)", "you see, … (giving a reason the listener didn't know)", "Explains or sets up a topic", "오늘은 못 가요. 일이 있**거든요**. (Oneureun mot gayo. Iri itgeodeunyo.)", "I can't go today. I've got work, you see."],
      ["**-더라고요** (-deoragoyo)", "I found that …, I noticed …", "Reporting your own past observation, not your own actions", "그 식당 음식이 정말 맛있**더라고요**. (Geu sikdang eumsigi jeongmal masitdeoragoyo.)", "The food at that restaurant was really good, I found."],
      ["**-지요 / -죠** (-jiyo / -jyo)", "…, isn't it? / …, right?", "Seeks agreement; with question words, a soft question (뭐죠?)", "날씨가 춥**죠**? (Nalssiga chupjyo?)", "It's cold, isn't it?"],
      ["**-(으)ㄴ/는대요** (-(eu)n/neundaeyo)", "they say …, I heard …", "Short for -ㄴ다고 해요; adjectives -대요", "내일 비가 **온대요**. (Naeil biga ondaeyo.)", "They say it'll rain tomorrow."],
    ] },

    { h: "Will, plans and decisions" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-(으)ㄹ 거예요** (-(eu)l geoyeyo)", "will, be going to; probably will", "Plans (1st person) or guesses (others)", "내일 친구를 만**날 거예요**. (Naeil chingureul mannal geoyeyo.)", "I'm going to meet a friend tomorrow."],
      ["**-(으)ㄹ게요** (-(eu)lgeyo)", "I'll … (a promise or offer to the listener)", "1st person only; not in questions", "제가 **할게요**. (Jega halgeyo.)", "I'll do it."],
      ["**-(으)ㄹ래요** (-(eu)llaeyo)", "I'd like to … / would you like to …?", "1st person in statements, 2nd person in questions; casual-polite", "저는 커피 마**실래요**. (Jeoneun keopi masillaeyo.)", "I'll have a coffee."],
      ["**-겠어요 / -겠습니다** (-gesseoyo / -getseumnida)", "I will (firm intention, formal)", "1st person; very common in formal speech", "다시 연락드리**겠습니다**. (Dasi yeollakdeurigetseumnida.)", "I will get back to you."],
      ["**-겠어요** (-gesseoyo)", "it must be …, it looks …", "A guess from what you see or hear", "맛있**겠어요**! (Masitgesseoyo!)", "That looks delicious!"],
      ["**-(으)려고 하다** (-(eu)ryeogo hada)", "to plan to, to be about to", "Intention not yet carried out", "주말에 등산하**려고 해요**. (Jumare deungsanharyeogo haeyo.)", "I'm planning to go hiking at the weekend."],
      ["**-기로 하다** (-giro hada)", "to decide to; to agree to", "Usually in the past: -기로 했어요", "내년에 결혼하**기로 했어요**. (Naenyeone gyeolhonhagiro haesseoyo.)", "We've decided to get married next year."],
      ["**-아야겠다/어야겠다** (-ayagetda/-eoyagetda)", "I'd better, I should", "Speaker's own decision", "이제 **가야겠어요**. (Ije gayagesseoyo.)", "I'd better go now."],
    ] },

    { h: "Suggestions, requests and commands" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-(으)ㄹ까요?** (-(eu)lkkayo)", "shall we …? / shall I …?", "Suggestion or offer", "같이 **갈까요**? (Gachi galkkayo?)", "Shall we go together?"],
      ["**-(으)ㄹ까요?** (-(eu)lkkayo)", "do you think …?", "Asking for the listener's guess", "내일 비가 **올까요**? (Naeil biga olkkayo?)", "Do you think it'll rain tomorrow?"],
      ["**-(으)ㅂ시다** (-(eu)psida)", "let's …", "Formal; sounds bossy to someone senior", "같이 **갑시다**. (Gachi gapsida.)", "Let's go together."],
      ["**-자** (-ja)", "let's …", "Casual (반말)", "밥 먹**자**. (Bap meokja.)", "Let's eat."],
      ["**-(으)세요** (-(eu)seyo)", "please do … (polite request)", "Also the honorific present: 어디 가세요?", "여기 앉으**세요**. (Yeogi anjeuseyo.)", "Please sit here."],
      ["**-(으)십시오** (-(eu)sipsio)", "please do … (formal)", "Announcements, signs, service", "잠시만 기다리**십시오**. (Jamsiman gidarisipsio.)", "Please wait a moment."],
      ["**-지 마세요** (-ji maseyo)", "please don't …", "Casual: -지 마", "걱정하**지 마세요**. (Geokjeonghaji maseyo.)", "Don't worry."],
      ["**-아/어 주세요** (-a/eo juseyo)", "please do … for me", "Polite request for a favour", "문 좀 열**어 주세요**. (Mun jom yeoreo juseyo.)", "Could you open the door, please?"],
    ] },

    { h: "Wanting and wishing" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-고 싶다** (-go sipda)", "to want to", "1st person (and 2nd in questions)", "한국에 가**고 싶어요**. (Hanguge gago sipeoyo.)", "I want to go to Korea."],
      ["**-고 싶어 하다** (-go sipeo hada)", "(he/she) wants to", "3rd person", "동생이 강아지를 키우**고 싶어 해요**. (Dongsaengi gangajireul kiugo sipeo haeyo.)", "My younger sibling wants a puppy."],
      ["**-(으)면 좋겠다** (-(eu)myeon joketda)", "I hope …, I wish …", "Also -았/었으면 좋겠다 (stronger wish)", "내일 날씨가 좋으**면 좋겠어요**. (Naeil nalssiga joeumyeon jokesseoyo.)", "I hope the weather is nice tomorrow."],
    ] },

    { h: "Ability, permission and obligation" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-(으)ㄹ 수 있다** (-(eu)l su itda)", "can, be able to; may (possibility)", "Negative -(으)ㄹ 수 없다 'can't'", "한국어를 읽**을 수 있어요**. (Hangugeoreul ilgeul su isseoyo.)", "I can read Korean."],
      ["**-(으)ㄹ 수 없다** (-(eu)l su eopda)", "cannot", "Stronger and more formal than 못", "지금은 말**할 수 없어요**. (Jigeumeun malhal su eopseoyo.)", "I can't tell you right now."],
      ["**-(으)ㄹ 줄 알다/모르다** (-(eu)l jul alda/moreuda)", "to know (not to know) how to", "Learned skills", "운전**할 줄 알아요**? (Unjeonhal jul arayo?)", "Do you know how to drive?"],
      ["**-아야/어야 하다** (-aya/-eoya hada)", "must, have to", "-아야/어야 되다 means the same and is common in speech", "지금 **가야 해요**. (Jigeum gaya haeyo.)", "I have to go now."],
      ["**-아도/어도 되다** (-ado/-eodo doeda)", "may, it's all right to", "Asking or giving permission", "여기 앉**아도 돼요**? (Yeogi anjado dwaeyo?)", "May I sit here?"],
      ["**-(으)면 안 되다** (-(eu)myeon an doeda)", "must not", "Prohibition", "여기에서 사진을 찍으**면 안 돼요**. (Yeogieseo sajineul jjigeumyeon an dwaeyo.)", "You mustn't take photos here."],
      ["**-지 않아도 되다** (-ji anado doeda)", "don't have to", "Also 안 -아도/어도 되다", "내일은 오**지 않아도 돼요**. (Naeireun oji anado dwaeyo.)", "You don't have to come tomorrow."],
    ] },

    { h: "Guessing" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-(으)ㄹ 것 같다** (-(eu)l geot gatda)", "I think it will …; it looks like …", "Guess about the future, or a soft opinion", "비가 **올 것 같아요**. (Biga ol geot gatayo.)", "It looks like it's going to rain."],
      ["**-는 것 같다** (-neun geot gatda)", "it seems that … (now)", "Verbs; adjectives -(으)ㄴ 것 같다; past -(으)ㄴ 것 같다", "밖에 비가 오**는 것 같아요**. (Bakke biga oneun geot gatayo.)", "It seems to be raining outside."],
      ["**-나 보다 / -(으)ㄴ가 보다** (-na boda / -(eu)n-ga boda)", "I guess …, it must be …", "Based on what you see; not about yourself; -나 보다 after verbs", "길이 막히**나 봐요**. (Giri makina bwayo.)", "The roads must be jammed."],
      ["**-(으)ㄹ지도 모르다** (-(eu)ljido moreuda)", "might, may", "Uncertain possibility", "조금 늦**을지도 몰라요**. (Jogeum neujeuljido mollayo.)", "I might be a bit late."],
    ] },

    { h: "Doing, trying, having done" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-고 있다** (-go itda)", "to be doing (in progress)", "Action verbs; honorific -고 계시다", "지금 밥을 먹**고 있어요**. (Jigeum babeul meokgo isseoyo.)", "I'm eating right now."],
      ["**-아/어 있다** (-a/eo itda)", "to be in a state (after a change)", "Intransitive and passive verbs: 앉다, 서다, 열리다, 켜지다…", "문이 열**려 있어요**. (Muni yeollyeo isseoyo.)", "The door is open."],
      ["**-아/어 보다** (-a/eo boda)", "to try doing; (past) to have done", "-아/어 보세요 'try it'", "이 옷 한번 입**어 보세요**. (I ot hanbeon ibeo boseyo.)", "Try these clothes on."],
      ["**-(으)ㄴ 적이 있다/없다** (-(eu)n jeogi itda/eopda)", "to have (never) done before", "Often with -아/어 보다: 가 본 적이 있다", "제주도에 가 **본 적이 있어요**. (Jejudoe ga bon jeogi isseoyo.)", "I've been to Jeju before."],
      ["**-아/어 주다** (-a/eo juda)", "to do something for someone", "For someone respected: -아/어 드리다", "친구가 길을 가르**쳐 줬어요**. (Chinguga gireul gareuchyeo jwosseoyo.)", "A friend showed me the way."],
      ["**-아/어 드리다** (-a/eo deurida)", "to do something for (someone respected)", "Humble form of -아/어 주다", "할머니께 책을 읽**어 드렸어요**. (Halmeonikke chaegeul ilgeo deuryeosseoyo.)", "I read a book to my grandmother."],
      ["**-아/어 버리다** (-a/eo beorida)", "to do completely (often with regret or relief)", "Completed action", "케이크를 다 먹**어 버렸어요**. (Keikeureul da meogeo beoryeosseoyo.)", "I ate the whole cake."],
      ["**-아/어 놓다** (-a/eo nota)", "to do in advance, to have … ready", "-아/어 두다 is similar", "식당을 예약**해 놓았어요**. (Sikdangeul yeyakae noasseoyo.)", "I've booked a restaurant."],
      ["**-(으)ㄹ 뻔하다** (-(eu)l ppeonhada)", "almost (did something bad)", "Past only: -(으)ㄹ 뻔했어요", "넘어**질 뻔했어요**. (Neomeojil ppeonhaesseoyo.)", "I nearly fell over."],
    ] },

    { h: "Change and tendency" },
    { table: [
      ["Ending", "Meaning", "Restrictions and notes", "Example", "Example meaning"],
      ["**-아/어지다** (-a/eojida)", "to become, to get (more) …", "With adjectives", "날씨가 따뜻**해졌어요**. (Nalssiga ttatteutaejyeosseoyo.)", "The weather has got warmer."],
      ["**-게 되다** (-ge doeda)", "to end up …, to come to …", "Change not fully in your control", "한국에서 일하**게 됐어요**. (Hangugeseo ilhage dwaesseoyo.)", "I ended up working in Korea."],
      ["**-(으)ㄴ/는 편이다** (-(eu)n/neun pyeonida)", "to tend to, to be rather …", "Softens a statement about habits or qualities", "저는 일찍 자**는 편이에요**. (Jeoneun iljjik janeun pyeonieyo.)", "I tend to go to bed early."],
      ["**-(으)ㄹ 만하다** (-(eu)l manhada)", "to be worth doing; to be OK to …", "Recommendation", "이 영화는 **볼 만해요**. (I yeonghwaneun bol manhaeyo.)", "This film is worth seeing."],
    ] },
  ],
};

export default sheet;
