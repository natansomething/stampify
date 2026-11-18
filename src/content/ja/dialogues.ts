import type { Dialogue } from '../types';

const data: Dialogue[] = [
  // ---------------------------------------------------------------- level 1
  {
    id: "ja-d1-cafe", lv: 1, title: "カフェで", titleEn: "At the café", turns: [
      { a: { t: "いらっしゃいませ。ご注文は？", r: "いらっしゃいませ。ごちゅうもんは？", en: "Welcome. What would you like?" }, o: [
        { t: "コーヒーを一つください。", r: "コーヒーをひとつください。", en: "One coffee, please." },
        { t: "私は学生です。", r: "わたしはがくせいです。", en: "I'm a student." },
        { t: "駅はあそこです。", r: "えきはあそこです。", en: "The station is over there." },
      ], c: 0 },
      { a: { t: "ホットですか、アイスですか。", r: "ホットですか、アイスですか。", en: "Hot or iced?" }, o: [
        { t: "はい、そうです。", r: "はい、そうです。", en: "Yes, that's right." },
        { t: "毎日飲みます。", r: "まいにちのみます。", en: "I drink it every day." },
        { t: "ホットでお願いします。", r: "ホットでおねがいします。", en: "Hot, please." },
      ], c: 2 },
      { a: { t: "サイズはどうしますか。", r: "サイズはどうしますか。", en: "What size would you like?" }, o: [
        { t: "六時に起きます。", r: "ろくじにおきます。", en: "I get up at six." },
        { t: "小さいのをお願いします。", r: "ちいさいのをおねがいします。", en: "A small one, please." },
        { t: "いいえ、けっこうです。", r: "いいえ、けっこうです。", en: "No, thank you." },
      ], c: 1 },
      { a: { t: "こちらでお召し上がりですか。", r: "こちらでおめしあがりですか。", en: "Is that for here?" }, o: [
        { t: "いいえ、持ち帰りで。", r: "いいえ、もちかえりで。", en: "No, to go." },
        { t: "はい、元気です。", r: "はい、げんきです。", en: "Yes, I'm fine." },
        { t: "コーヒーが好きです。", r: "コーヒーがすきです。", en: "I like coffee." },
      ], c: 0 },
      { a: { t: "三百八十円です。", r: "さんびゃくはちじゅうえんです。", en: "That's 380 yen." }, o: [
        { t: "はじめまして。", r: "はじめまして。", en: "Nice to meet you." },
        { t: "じゃあ、また明日。", r: "じゃあ、またあした。", en: "See you tomorrow." },
        { t: "はい、どうぞ。", r: "はい、どうぞ。", en: "Here you are." },
      ], c: 2 },
    ],
  },
  {
    id: "ja-d1-meet", lv: 1, title: "はじめまして", titleEn: "Nice to meet you", turns: [
      { a: { t: "はじめまして。山田です。", r: "はじめまして。やまだです。", en: "Nice to meet you. I'm Yamada." }, o: [
        { t: "いただきます。", r: "いただきます。", en: "(said before eating)" },
        { t: "はじめまして。キムです。よろしくお願いします。", r: "はじめまして。キムです。よろしくおねがいします。", en: "Nice to meet you. I'm Kim." },
        { t: "おやすみなさい。", r: "おやすみなさい。", en: "Good night." },
      ], c: 1 },
      { a: { t: "キムさんは、どこから来ましたか。", r: "キムさんは、どこからきましたか。", en: "Where are you from, Kim?" }, o: [
        { t: "韓国から来ました。", r: "かんこくからきました。", en: "I'm from Korea." },
        { t: "三時に来ました。", r: "さんじにきました。", en: "I came at three." },
        { t: "バスで来ました。", r: "バスできました。", en: "I came by bus." },
      ], c: 0 },
      { a: { t: "お仕事は何ですか。", r: "おしごとはなんですか。", en: "What do you do?" }, o: [
        { t: "とてもおいしいです。", r: "とてもおいしいです。", en: "It's very tasty." },
        { t: "銀行員です。", r: "ぎんこういんです。", en: "I work at a bank." },
        { t: "日曜日です。", r: "にちようびです。", en: "It's Sunday." },
      ], c: 1 },
      { a: { t: "日本語が上手ですね。", r: "にほんごがじょうずですね。", en: "Your Japanese is very good." }, o: [
        { t: "はい、そうしましょう。", r: "はい、そうしましょう。", en: "Yes, let's do that." },
        { t: "すみません、トイレはどこですか。", r: "すみません、トイレはどこですか。", en: "Excuse me, where's the toilet?" },
        { t: "いいえ、まだまだです。", r: "いいえ、まだまだです。", en: "Oh no, I still have a long way to go." },
      ], c: 2 },
      { a: { t: "これから、よろしくお願いします。", r: "これから、よろしくおねがいします。", en: "I look forward to getting to know you." }, o: [
        { t: "こちらこそ、よろしくお願いします。", r: "こちらこそ、よろしくおねがいします。", en: "Likewise, I look forward to it." },
        { t: "いいえ、けっこうです。", r: "いいえ、けっこうです。", en: "No, thank you." },
        { t: "お元気で。", r: "おげんきで。", en: "Take care (goodbye for a long time)." },
      ], c: 0 },
    ],
  },
  // ---------------------------------------------------------------- level 2
  {
    id: "ja-d2-clinic", lv: 2, title: "病院で", titleEn: "At the doctor's", turns: [
      { a: { t: "今日はどうしましたか。", r: "きょうはどうしましたか。", en: "What seems to be the problem today?" }, o: [
        { t: "昨日から頭が痛いんです。", r: "きのうからあたまがいたいんです。", en: "I've had a headache since yesterday." },
        { t: "昨日は休みでした。", r: "きのうはやすみでした。", en: "Yesterday was my day off." },
        { t: "電車で来ました。", r: "でんしゃできました。", en: "I came by train." },
      ], c: 0 },
      { a: { t: "熱はありますか。", r: "ねつはありますか。", en: "Do you have a fever?" }, o: [
        { t: "はい、二人います。", r: "はい、ふたりいます。", en: "Yes, I have two." },
        { t: "はい、三十八度ぐらいあります。", r: "はい、さんじゅうはちどぐらいあります。", en: "Yes, about 38 degrees." },
        { t: "いいえ、行きませんでした。", r: "いいえ、いきませんでした。", en: "No, I didn't go." },
      ], c: 1 },
      { a: { t: "のどは痛くないですか。", r: "のどはいたくないですか。", en: "Does your throat hurt?" }, o: [
        { t: "おなかがすきました。", r: "おなかがすきました。", en: "I'm hungry." },
        { t: "はい、とても楽しかったです。", r: "はい、とてもたのしかったです。", en: "Yes, it was great fun." },
        { t: "少し痛いです。", r: "すこしいたいです。", en: "It hurts a little." },
      ], c: 2 },
      { a: { t: "風邪ですね。薬を出しますから、三日間飲んでください。", r: "かぜですね。くすりをだしますから、みっかかんのんでください。", en: "It's a cold. I'll give you some medicine; take it for three days." }, o: [
        { t: "分かりました。ご飯の後に飲みますか。", r: "わかりました。ごはんのあとにのみますか。", en: "OK. Should I take it after meals?" },
        { t: "じゃあ、また来週会いましょう。", r: "じゃあ、またらいしゅうあいましょう。", en: "Then let's meet again next week." },
        { t: "すみません、もう一枚ください。", r: "すみません、もういちまいください。", en: "Excuse me, one more sheet, please." },
      ], c: 0 },
      { a: { t: "はい、一日三回、食事の後に飲んでください。お大事に。", r: "はい、いちにちさんかい、しょくじのあとにのんでください。おだいじに。", en: "Yes, three times a day after meals. Take care." }, o: [
        { t: "どういたしまして。", r: "どういたしまして。", en: "You're welcome." },
        { t: "ありがとうございました。", r: "ありがとうございました。", en: "Thank you very much." },
        { t: "おかえりなさい。", r: "おかえりなさい。", en: "Welcome home." },
      ], c: 1 },
    ],
  },
  {
    id: "ja-d2-directions", lv: 2, title: "道をたずねる", titleEn: "Asking the way", turns: [
      { a: { t: "何かお困りですか。", r: "なにかおこまりですか。", en: "Can I help you with something?" }, o: [
        { t: "はい、市役所に行きたいんですが。", r: "はい、しやくしょにいきたいんですが。", en: "Yes, I'd like to get to City Hall." },
        { t: "はい、おなかがいっぱいです。", r: "はい、おなかがいっぱいです。", en: "Yes, I'm full." },
        { t: "いいえ、雨です。", r: "いいえ、あめです。", en: "No, it's rain." },
      ], c: 0 },
      { a: { t: "市役所ですね。この道をまっすぐ行って、二つ目の信号を右に曲がってください。", r: "しやくしょですね。このみちをまっすぐいって、ふたつめのしんごうをみぎにまがってください。", en: "City Hall? Go straight along this road and turn right at the second traffic light." }, o: [
        { t: "右手が痛いです。", r: "みぎてがいたいです。", en: "My right hand hurts." },
        { t: "二つ目の信号を右ですね。", r: "ふたつめのしんごうをみぎですね。", en: "Right at the second light, got it." },
        { t: "信号は赤いです。", r: "しんごうはあかいです。", en: "The light is red." },
      ], c: 1 },
      { a: { t: "そうです。曲がると、左側に大きな白い建物が見えます。", r: "そうです。まがると、ひだりがわにおおきなしろいたてものがみえます。", en: "That's right. When you turn, you'll see a big white building on the left." }, o: [
        { t: "白いシャツを買いました。", r: "しろいシャツをかいました。", en: "I bought a white shirt." },
        { t: "左手で書きます。", r: "ひだりてでかきます。", en: "I write with my left hand." },
        { t: "歩いてどのくらいかかりますか。", r: "あるいてどのくらいかかりますか。", en: "How long does it take on foot?" },
      ], c: 2 },
      { a: { t: "十分ぐらいですね。バスもありますよ。", r: "じゅっぷんぐらいですね。バスもありますよ。", en: "About ten minutes. There's a bus too." }, o: [
        { t: "じゃあ、歩いて行きます。", r: "じゃあ、あるいていきます。", en: "Then I'll walk." },
        { t: "バスの運転手です。", r: "バスのうんてんしゅです。", en: "I'm a bus driver." },
        { t: "十時に寝ます。", r: "じゅうじにねます。", en: "I go to bed at ten." },
      ], c: 0 },
      { a: { t: "気をつけて行ってくださいね。", r: "きをつけていってくださいね。", en: "Take care on your way." }, o: [
        { t: "いただきます。", r: "いただきます。", en: "(said before eating)" },
        { t: "ご親切にありがとうございました。", r: "ごしんせつにありがとうございました。", en: "Thank you for your kindness." },
        { t: "おやすみなさい。", r: "おやすみなさい。", en: "Good night." },
      ], c: 1 },
    ],
  },
  // ---------------------------------------------------------------- level 3
  {
    id: "ja-d3-hotel", lv: 3, title: "ホテルで", titleEn: "Checking in at a hotel", turns: [
      { a: { t: "いらっしゃいませ。チェックインでございますか。", r: "いらっしゃいませ。チェックインでございますか。", en: "Good evening. Are you checking in?" }, o: [
        { t: "はい、予約したスミスです。", r: "はい、よやくしたスミスです。", en: "Yes, I have a reservation. The name's Smith." },
        { t: "いいえ、部屋は広いです。", r: "いいえ、へやはひろいです。", en: "No, the room is big." },
        { t: "はい、もう食べました。", r: "はい、もうたべました。", en: "Yes, I've already eaten." },
      ], c: 0 },
      { a: { t: "スミス様ですね。二泊でご予約いただいております。", r: "スミスさまですね。にはくでごよやくいただいております。", en: "Mr. Smith, yes. We have you booked for two nights." }, o: [
        { t: "二階にお願いします。", r: "にかいにおねがいします。", en: "The second floor, please." },
        { t: "はい、そうです。よろしくお願いします。", r: "はい、そうです。よろしくおねがいします。", en: "Yes, that's right. Thank you." },
        { t: "はい、昨日帰りました。", r: "はい、きのうかえりました。", en: "Yes, I went home yesterday." },
      ], c: 1 },
      { a: { t: "朝食は七時から十時まで、一階のレストランでお召し上がりいただけます。", r: "ちょうしょくはしちじからじゅうじまで、いっかいのレストランでおめしあがりいただけます。", en: "Breakfast is served from seven to ten in the restaurant on the ground floor." }, o: [
        { t: "朝ご飯は作りません。", r: "あさごはんはつくりません。", en: "I don't make breakfast." },
        { t: "七時に寝る予定です。", r: "しちじにねるよていです。", en: "I plan to go to bed at seven." },
        { t: "分かりました。部屋でインターネットは使えますか。", r: "わかりました。へやでインターネットはつかえますか。", en: "I see. Can I use the internet in my room?" },
      ], c: 2 },
      { a: { t: "はい、パスワードはこちらのカードに書いてあります。", r: "はい、パスワードはこちらのカードにかいてあります。", en: "Yes, the password is written on this card." }, o: [
        { t: "ありがとうございます。チェックアウトは何時ですか。", r: "ありがとうございます。チェックアウトはなんじですか。", en: "Thank you. What time is check-out?" },
        { t: "カードで払いました。", r: "カードではらいました。", en: "I paid by card." },
        { t: "パスワードを忘れてもいいです。", r: "パスワードをわすれてもいいです。", en: "It's fine to forget the password." },
      ], c: 0 },
      { a: { t: "十一時でございます。お荷物をお部屋までお持ちしましょうか。", r: "じゅういちじでございます。おにもつをおへやまでおもちしましょうか。", en: "Eleven o'clock. Shall I take your luggage up to your room?" }, o: [
        { t: "十一時に来てください。", r: "じゅういちじにきてください。", en: "Please come at eleven." },
        { t: "大丈夫です。自分で運べます。", r: "だいじょうぶです。じぶんではこべます。", en: "That's all right, I can carry it myself." },
        { t: "はい、私が持ってあげます。", r: "はい、わたしがもってあげます。", en: "Yes, I'll carry it for you." },
      ], c: 1 },
    ],
  },
  {
    id: "ja-d3-weekend", lv: 3, title: "週末の予定", titleEn: "Weekend plans", turns: [
      { a: { t: "ねえ、今度の土曜日、ひま？", r: "ねえ、こんどのどようび、ひま？", en: "Hey, are you free this Saturday?" }, o: [
        { t: "うん、土曜日に生まれたよ。", r: "うん、どようびにうまれたよ。", en: "Yeah, I was born on a Saturday." },
        { t: "うん、特に予定はないよ。", r: "うん、とくによていはないよ。", en: "Yeah, I don't have any plans." },
        { t: "ひまな時は、ご飯を作るよ。", r: "ひまなときは、ごはんをつくるよ。", en: "When I'm free, I cook." },
      ], c: 1 },
      { a: { t: "友達とバーベキューをするんだけど、一緒に来ない？", r: "ともだちとバーベキューをするんだけど、いっしょにこない？", en: "I'm having a barbecue with some friends. Want to come?" }, o: [
        { t: "先週、雨が降ったね。", r: "せんしゅう、あめがふったね。", en: "It rained last week, didn't it?" },
        { t: "友達は三人いるよ。", r: "ともだちはさんにんいるよ。", en: "I have three friends." },
        { t: "いいね！何か持っていこうか。", r: "いいね！なにかもっていこうか。", en: "Sounds great! Should I bring something?" },
      ], c: 2 },
      { a: { t: "じゃあ、飲み物をお願いしてもいい？", r: "じゃあ、のみものをおねがいしてもいい？", en: "Then could you bring the drinks?" }, o: [
        { t: "もちろん。ジュースとお茶でいい？", r: "もちろん。ジュースとおちゃでいい？", en: "Sure. Is juice and tea OK?" },
        { t: "飲み物は飲まないで。", r: "のみものはのまないで。", en: "Don't drink the drinks." },
        { t: "うん、昨日買ってもらった。", r: "うん、きのうかってもらった。", en: "Yeah, someone bought it for me yesterday." },
      ], c: 0 },
      { a: { t: "うん、助かる。場所は川の近くの公園だよ。", r: "うん、たすかる。ばしょはかわのちかくのこうえんだよ。", en: "Great, that helps. It's at the park by the river." }, o: [
        { t: "川で泳いだことがないんだ。", r: "かわでおよいだことがないんだ。", en: "I've never swum in a river." },
        { t: "何時に行けばいい？", r: "なんじにいけばいい？", en: "What time should I come?" },
        { t: "公園は静かだったよ。", r: "こうえんはしずかだったよ。", en: "The park was quiet." },
      ], c: 1 },
      { a: { t: "十一時ごろかな。雨だったら中止にするね。", r: "じゅういちじごろかな。あめだったらちゅうしにするね。", en: "Around eleven, I think. If it rains, we'll call it off." }, o: [
        { t: "雨の日は傘を持っていくよ。", r: "あめのひはかさをもっていくよ。", en: "On rainy days I take an umbrella." },
        { t: "十一時に起きたよ。", r: "じゅういちじにおきたよ。", en: "I got up at eleven." },
        { t: "分かった。晴れるといいね。", r: "わかった。はれるといいね。", en: "Got it. Hope it's sunny!" },
      ], c: 2 },
    ],
  },
  // ---------------------------------------------------------------- level 4
  {
    id: "ja-d4-return", lv: 4, title: "返品したい", titleEn: "Returning an item", turns: [
      { a: { t: "いらっしゃいませ。どうなさいましたか。", r: "いらっしゃいませ。どうなさいましたか。", en: "Hello. How can I help you?" }, o: [
        { t: "先週ここで買った電気ポットが、もう動かなくなってしまったんです。", r: "せんしゅうここでかったでんきポットが、もううごかなくなってしまったんです。", en: "The electric kettle I bought here last week has already stopped working." },
        { t: "電気ポットを売りたいと思っています。", r: "でんきポットをうりたいとおもっています。", en: "I'm thinking of selling an electric kettle." },
        { t: "先週、店員になりました。", r: "せんしゅう、てんいんになりました。", en: "I became a store clerk last week." },
      ], c: 0 },
      { a: { t: "大変申し訳ございません。レシートはお持ちでしょうか。", r: "たいへんもうしわけございません。レシートはおもちでしょうか。", en: "I'm very sorry. Do you have the receipt?" }, o: [
        { t: "いいえ、お茶は結構です。", r: "いいえ、おちゃはけっこうです。", en: "No thanks, I don't need any tea." },
        { t: "はい、ポットでお湯を沸かします。", r: "はい、ポットでおゆをわかします。", en: "Yes, I boil water in the kettle." },
        { t: "はい、こちらです。箱も持ってきました。", r: "はい、こちらです。はこももってきました。", en: "Yes, here it is. I brought the box too." },
      ], c: 2 },
      { a: { t: "確認いたします。……こちら、交換と返金、どちらになさいますか。", r: "かくにんいたします。……こちら、こうかんとへんきん、どちらになさいますか。", en: "Let me check... Would you prefer an exchange or a refund?" }, o: [
        { t: "どちらも買いません。", r: "どちらもかいません。", en: "I won't buy either." },
        { t: "できれば、返金でお願いします。", r: "できれば、へんきんでおねがいします。", en: "A refund, if possible." },
        { t: "交換留学に行きたいです。", r: "こうかんりゅうがくにいきたいです。", en: "I'd like to go on a student exchange." },
      ], c: 1 },
      { a: { t: "かしこまりました。お支払いはカードでしたので、カードへの返金になりますが、よろしいでしょうか。", r: "かしこまりました。おしはらいはカードでしたので、カードへのへんきんになりますが、よろしいでしょうか。", en: "Certainly. You paid by card, so the money will go back to your card. Is that all right?" }, o: [
        { t: "はい、それで構いません。", r: "はい、それでかまいません。", en: "Yes, that's fine." },
        { t: "いいえ、カードは使ったことがありません。", r: "いいえ、カードはつかったことがありません。", en: "No, I've never used a card." },
        { t: "はい、カードを作ってあげます。", r: "はい、カードをつくってあげます。", en: "Yes, I'll make a card for you." },
      ], c: 0 },
      { a: { t: "手続きが完了いたしました。ご迷惑をおかけして、申し訳ございませんでした。", r: "てつづきがかんりょういたしました。ごめいわくをおかけして、もうしわけございませんでした。", en: "That's all done. We apologize for the inconvenience." }, o: [
        { t: "では、もう一つ同じものを返品します。", r: "では、もうひとつおなじものをへんぴんします。", en: "Then I'll return another one just like it." },
        { t: "申し訳ございませんでした。", r: "もうしわけございませんでした。", en: "We apologize." },
        { t: "いえいえ、すぐに対応していただいて助かりました。", r: "いえいえ、すぐにたいおうしていただいてたすかりました。", en: "Not at all. Thank you for sorting it out so quickly." },
      ], c: 2 },
    ],
  },
  {
    id: "ja-d4-schedule", lv: 4, title: "打ち合わせの日程", titleEn: "Scheduling a meeting", turns: [
      { a: { t: "来週の打ち合わせなんですが、火曜日の午後はご都合いかがですか。", r: "らいしゅうのうちあわせなんですが、かようびのごごはごつごういかがですか。", en: "About next week's meeting: how does Tuesday afternoon work for you?" }, o: [
        { t: "火曜日は燃えるごみの日です。", r: "かようびはもえるごみのひです。", en: "Tuesday is burnable-garbage day." },
        { t: "すみません、火曜日は一日中外出しておりまして……。", r: "すみません、かようびはいちにちじゅうがいしゅつしておりまして……。", en: "I'm sorry, I'm out of the office all day Tuesday..." },
        { t: "午後は晴れるそうですよ。", r: "ごごははれるそうですよ。", en: "I hear it'll be sunny in the afternoon." },
      ], c: 1 },
      { a: { t: "そうですか。では、水曜日か木曜日はいかがでしょう。", r: "そうですか。では、すいようびかもくようびはいかがでしょう。", en: "I see. Then how about Wednesday or Thursday?" }, o: [
        { t: "木曜日の午前中でしたら、空いています。", r: "もくようびのごぜんちゅうでしたら、あいています。", en: "I'm free on Thursday morning." },
        { t: "水曜日に生まれました。", r: "すいようびにうまれました。", en: "I was born on a Wednesday." },
        { t: "どちらも好きな曜日です。", r: "どちらもすきなようびです。", en: "I like both of those days." },
      ], c: 0 },
      { a: { t: "では、木曜日の十時からでどうでしょう。一時間ほどを予定しています。", r: "では、もくようびのじゅうじからでどうでしょう。いちじかんほどをよていしています。", en: "Then how about Thursday from ten? We're planning on about an hour." }, o: [
        { t: "十時に寝てしまいます。", r: "じゅうじにねてしまいます。", en: "I'll have fallen asleep by ten." },
        { t: "一時間も待たせてすみません。", r: "いちじかんもまたせてすみません。", en: "Sorry for keeping you waiting a whole hour." },
        { t: "承知しました。場所はどちらになりますか。", r: "しょうちしました。ばしょはどちらになりますか。", en: "Understood. Where will it be held?" },
      ], c: 2 },
      { a: { t: "三階の会議室を予約しておきます。事前に資料をお送りしましょうか。", r: "さんがいのかいぎしつをよやくしておきます。じぜんにしりょうをおおくりしましょうか。", en: "I'll book the meeting room on the third floor. Shall I send you the materials in advance?" }, o: [
        { t: "いいえ、三階には住んでいません。", r: "いいえ、さんがいにはすんでいません。", en: "No, I don't live on the third floor." },
        { t: "ぜひお願いします。目を通しておきます。", r: "ぜひおねがいします。めをとおしておきます。", en: "Yes, please. I'll look through them beforehand." },
        { t: "資料を送っていただきました。", r: "しりょうをおくっていただきました。", en: "You sent me the materials." },
      ], c: 1 },
      { a: { t: "では、水曜日中にメールでお送りします。よろしくお願いします。", r: "では、すいようびちゅうにメールでおおくりします。よろしくおねがいします。", en: "Then I'll email them to you by Wednesday. Thanks." }, o: [
        { t: "こちらこそ、よろしくお願いします。", r: "こちらこそ、よろしくおねがいします。", en: "Thank you, too." },
        { t: "メールアドレスがありません。", r: "メールアドレスがありません。", en: "I don't have an email address." },
        { t: "お先に失礼しました。", r: "おさきにしつれいしました。", en: "Sorry for leaving before you." },
      ], c: 0 },
    ],
  },
  // ---------------------------------------------------------------- level 5
  {
    id: "ja-d5-interview", lv: 5, title: "面接", titleEn: "A job interview", turns: [
      { a: { t: "本日はお越しいただき、ありがとうございます。どうぞおかけください。", r: "ほんじつはおこしいただき、ありがとうございます。どうぞおかけください。", en: "Thank you for coming in today. Please have a seat." }, o: [
        { t: "失礼いたします。", r: "しつれいいたします。", en: "Thank you. (lit. Excuse me.)" },
        { t: "いえ、まだ電話はかけていません。", r: "いえ、まだでんわはかけていません。", en: "No, I haven't made the call yet." },
        { t: "どういたしまして。お越しください。", r: "どういたしまして。おこしください。", en: "You're welcome. Please come." },
      ], c: 0 },
      { a: { t: "まず、当社を志望された理由をお聞かせください。", r: "まず、とうしゃをしぼうされたりゆうをおきかせください。", en: "First, please tell us why you applied to our company." }, o: [
        { t: "当社の理由は特にございません。", r: "とうしゃのりゆうはとくにございません。", en: "Our company has no particular reason." },
        { t: "御社の製品を長年愛用しており、その開発に携わりたいと考えたからです。", r: "おんしゃのせいひんをながねんあいようしており、そのかいはつにたずさわりたいとかんがえたからです。", en: "I've used your products for years and wanted to be involved in developing them." },
        { t: "志望校には合格できませんでした。", r: "しぼうこうにはごうかくできませんでした。", en: "I didn't get into my first-choice school." },
      ], c: 1 },
      { a: { t: "前職ではどのような業務を担当されていましたか。", r: "ぜんしょくではどのようなぎょうむをたんとうされていましたか。", en: "What were you responsible for in your previous job?" }, o: [
        { t: "担当の方は、ただいま席を外しております。", r: "たんとうのかたは、ただいませきをはずしております。", en: "The person in charge is away from their desk right now." },
        { t: "前職は辞めないつもりです。", r: "ぜんしょくはやめないつもりです。", en: "I don't intend to leave my previous job." },
        { t: "海外の取引先との窓口として、主に営業を担当しておりました。", r: "かいがいのとりひきさきとのまどぐちとして、おもにえいぎょうをたんとうしておりました。", en: "I mainly handled sales, as the point of contact for overseas clients." },
      ], c: 2 },
      { a: { t: "ご自身の短所は何だと思われますか。", r: "ごじしんのたんしょはなんだとおもわれますか。", en: "What would you say your weaknesses are?" }, o: [
        { t: "慎重すぎて、決断に時間がかかることです。ただ、最近は期限を決めて判断するよう心がけています。", r: "しんちょうすぎて、けつだんにじかんがかかることです。ただ、さいきんはきげんをきめてはんだんするようこころがけています。", en: "I can be too cautious and slow to decide. Lately, though, I've made a point of setting myself deadlines for decisions." },
        { t: "短所はございません。長所もございません。", r: "たんしょはございません。ちょうしょもございません。", en: "I have no weaknesses. No strengths either." },
        { t: "御社の短所はお給料だと思います。", r: "おんしゃのたんしょはおきゅうりょうだとおもいます。", en: "I think your company's weak point is the salary." },
      ], c: 0 },
      { a: { t: "最後に、何かご質問はありますか。", r: "さいごに、なにかごしつもんはありますか。", en: "Finally, do you have any questions for us?" }, o: [
        { t: "いいえ、質問にはお答えできません。", r: "いいえ、しつもんにはおこたえできません。", en: "No, I can't answer questions." },
        { t: "はい、入社後の研修制度について伺ってもよろしいでしょうか。", r: "はい、にゅうしゃごのけんしゅうせいどについてうかがってもよろしいでしょうか。", en: "Yes, may I ask about the training program for new employees?" },
        { t: "はい、最後になってしまい、失礼いたしました。", r: "はい、さいごになってしまい、しつれいいたしました。", en: "Yes, I'm sorry for coming last." },
      ], c: 1 },
    ],
  },
  {
    id: "ja-d5-neighbor", lv: 5, title: "隣の部屋の音", titleEn: "A word with the neighbor", turns: [
      { a: { t: "はい、どちら様ですか。", r: "はい、どちらさまですか。", en: "Yes? Who is it?" }, o: [
        { t: "夜分にすみません。隣の部屋の佐藤と申します。", r: "やぶんにすみません。となりのへやのさとうともうします。", en: "Sorry to bother you so late. I'm Sato from next door." },
        { t: "佐藤様でいらっしゃいますか。", r: "さとうさまでいらっしゃいますか。", en: "Would you be Mr. Sato?" },
        { t: "どちら様でも構いません。", r: "どちらさまでもかまいません。", en: "It doesn't matter who." },
      ], c: 0 },
      { a: { t: "ああ、どうも。何かありましたか。", r: "ああ、どうも。なにかありましたか。", en: "Oh, hello. Is something wrong?" }, o: [
        { t: "何もありませんので、失礼します。", r: "なにもありませんので、しつれいします。", en: "Nothing at all, so goodbye." },
        { t: "実は、ここ数日、夜中に音楽が聞こえてきて、なかなか寝つけなくて……。", r: "じつは、ここすうじつ、よなかにおんがくがきこえてきて、なかなかねつけなくて……。", en: "Actually, for the past few days I've been hearing music late at night, and I can't get to sleep..." },
        { t: "おかげさまで、よく眠れています。", r: "おかげさまで、よくねむれています。", en: "Thanks to you, I'm sleeping well." },
      ], c: 1 },
      { a: { t: "えっ、そんなに響いていましたか。全然気づかなくて、本当にすみません。", r: "えっ、そんなにひびいていましたか。ぜんぜんきづかなくて、ほんとうにすみません。", en: "Oh, could you hear it that much? I had no idea. I'm really sorry." }, o: [
        { t: "ええ、毎晩楽しませてもらっています。", r: "ええ、まいばんたのしませてもらっています。", en: "Yes, I enjoy it every night." },
        { t: "では、もっと大きな音でお願いします。", r: "では、もっとおおきなおとでおねがいします。", en: "Then louder, please." },
        { t: "いえ、こちらこそ、言いにくいことを言ってしまって。", r: "いえ、こちらこそ、いいにくいことをいってしまって。", en: "No, I'm sorry too, for bringing up something awkward." },
      ], c: 2 },
      { a: { t: "これからは、十時以降はヘッドホンを使うようにします。", r: "これからは、じゅうじいこうはヘッドホンをつかうようにします。", en: "From now on, I'll use headphones after ten." }, o: [
        { t: "そうしていただけると助かります。", r: "そうしていただけるとたすかります。", en: "That would really help." },
        { t: "十時以降は営業しておりません。", r: "じゅうじいこうはえいぎょうしておりません。", en: "We're closed after ten." },
        { t: "ヘッドホンはお使いになれません。", r: "ヘッドホンはおつかいになれません。", en: "Headphones can't be used." },
      ], c: 0 },
      { a: { t: "何かあったら、また遠慮なく言ってくださいね。", r: "なにかあったら、またえんりょなくいってくださいね。", en: "If anything else comes up, please don't hesitate to tell me." }, o: [
        { t: "遠慮しないで、もっと音を出してください。", r: "えんりょしないで、もっとおとをだしてください。", en: "Don't hold back, make more noise." },
        { t: "ありがとうございます。これからもよろしくお願いします。", r: "ありがとうございます。これからもよろしくおねがいします。", en: "Thank you. I hope we'll keep getting along." },
        { t: "はい、また何か壊しておきます。", r: "はい、またなにかこわしておきます。", en: "Sure, I'll break something again." },
      ], c: 1 },
    ],
  },
  // ---------------------------------------------------------------- level 6
  {
    id: "ja-d6-negotiation", lv: 6, title: "価格の交渉", titleEn: "Negotiating a price", turns: [
      { a: { t: "先日ご提示いただいたお見積もりですが、正直なところ、弊社の予算を少々上回っておりまして。", r: "せんじつごていじいただいたおみつもりですが、しょうじきなところ、へいしゃのよさんをしょうしょううわまわっておりまして。", en: "About the quote you sent us the other day: to be honest, it's a little over our budget." }, o: [
        { t: "さようでございますか。差し支えなければ、ご予算の目安をお聞かせいただけますでしょうか。", r: "さようでございますか。さしつかえなければ、ごよさんのめやすをおきかせいただけますでしょうか。", en: "I see. If you don't mind, could you give us a rough idea of your budget?" },
        { t: "予算が余っていらっしゃるのでしたら、何よりです。", r: "よさんがあまっていらっしゃるのでしたら、なによりです。", en: "If you have budget to spare, that's wonderful." },
        { t: "お見積もりは無料でございます。", r: "おみつもりはむりょうでございます。", en: "Quotes are free of charge." },
      ], c: 0 },
      { a: { t: "一割ほど抑えていただけると、社内でも通しやすいのですが。", r: "いちわりほどおさえていただけると、しゃないでもとおしやすいのですが。", en: "If you could bring it down by about ten percent, it would be easier to get approved internally." }, o: [
        { t: "一割増しでしたら、すぐにでも対応いたします。", r: "いちわりましでしたら、すぐにでもたいおういたします。", en: "If it's ten percent more, we can do it right away." },
        { t: "一割となりますと、正直厳しいところではございますが、仕様を一部見直すことで近づけられるかもしれません。", r: "いちわりとなりますと、しょうじききびしいところではございますが、しようをいちぶみなおすことでちかづけられるかもしれません。", en: "Ten percent would frankly be tough, but we might get close by revising part of the specifications." },
        { t: "社内をご案内いたしましょうか。", r: "しゃないをごあんないいたしましょうか。", en: "Shall I show you around the office?" },
      ], c: 1 },
      { a: { t: "具体的には、どのあたりを見直すお考えでしょうか。", r: "ぐたいてきには、どのあたりをみなおすおかんがえでしょうか。", en: "Specifically, which parts were you thinking of revising?" }, o: [
        { t: "あたりは一面の雪景色でございます。", r: "あたりはいちめんのゆきげしきでございます。", en: "All around is a snowy landscape." },
        { t: "見直すおつもりはございませんか。", r: "みなおすおつもりはございませんか。", en: "Do you have no intention of reconsidering?" },
        { t: "例えば、納期を二週間延ばしていただければ、輸送費を大幅に抑えられます。", r: "たとえば、のうきをにしゅうかんのばしていただければ、ゆそうひをおおはばにおさえられます。", en: "For example, if you could push the delivery date back two weeks, we could cut shipping costs considerably." },
      ], c: 2 },
      { a: { t: "なるほど。納期については、こちらでも調整の余地があるかもしれません。", r: "なるほど。のうきについては、こちらでもちょうせいのよちがあるかもしれません。", en: "I see. There may be some room to adjust the delivery date on our side." }, o: [
        { t: "ありがとうございます。では、その条件で改めてお見積もりを作成し、週明けにお送りいたします。", r: "ありがとうございます。では、そのじょうけんであらためておみつもりをさくせいし、しゅうあけにおおくりいたします。", en: "Thank you. We'll prepare a revised quote on those terms and send it early next week." },
        { t: "余地がないことは承知しております。", r: "よちがないことはしょうちしております。", en: "We understand there's no room." },
        { t: "納期は守らなくても結構です。", r: "のうきはまもらなくてもけっこうです。", en: "You don't need to keep to the delivery date." },
      ], c: 0 },
      { a: { t: "承知しました。前向きに検討させていただきますので、よろしくお願いいたします。", r: "しょうちしました。まえむきにけんとうさせていただきますので、よろしくおねがいいたします。", en: "Understood. We'll give it positive consideration. Thank you." }, o: [
        { t: "検討の余地はございません。", r: "けんとうのよちはございません。", en: "There's nothing to consider." },
        { t: "こちらこそ、引き続きよろしくお願い申し上げます。", r: "こちらこそ、ひきつづきよろしくおねがいもうしあげます。", en: "Thank you; we look forward to continuing to work with you." },
        { t: "どうぞ前を向いてお帰りください。", r: "どうぞまえをむいておかえりください。", en: "Please face forward on your way home." },
      ], c: 1 },
    ],
  },
  {
    id: "ja-d6-reunion", lv: 6, title: "恩師との再会", titleEn: "Running into an old teacher", turns: [
      { a: { t: "おや、もしかして中村君じゃないか。ずいぶん立派になって。", r: "おや、もしかしてなかむらくんじゃないか。ずいぶんりっぱになって。", en: "Well, if it isn't Nakamura! Look how grown up you are." }, o: [
        { t: "先生！ご無沙汰しております。覚えていてくださったんですね。", r: "せんせい！ごぶさたしております。おぼえていてくださったんですね。", en: "Sensei! It's been so long. You remember me!" },
        { t: "はい、立派な建物ですね。", r: "はい、りっぱなたてものですね。", en: "Yes, it's a splendid building." },
        { t: "もしかしたら、明日は雨かもしれませんね。", r: "もしかしたら、あしたはあめかもしれませんね。", en: "It might rain tomorrow." },
      ], c: 0 },
      { a: { t: "忘れるものか。授業中に居眠りばかりしていた生徒は、そうそういないからね。", r: "わすれるものか。じゅぎょうちゅうにいねむりばかりしていたせいとは、そうそういないからね。", en: "How could I forget? You don't often get a student who dozed off in class as much as you did." }, o: [
        { t: "先生も授業中によく眠れましたか。", r: "せんせいもじゅぎょうちゅうによくねむれましたか。", en: "Did you sleep well in class too, Sensei?" },
        { t: "その節は、本当にお恥ずかしい限りです。", r: "そのせつは、ほんとうにおはずかしいかぎりです。", en: "I'm truly embarrassed about those days." },
        { t: "忘れ物でしたら、受付にございます。", r: "わすれものでしたら、うけつけにございます。", en: "If you've lost something, it's at reception." },
      ], c: 1 },
      { a: { t: "冗談だよ。それで、今はどうしているんだい。", r: "じょうだんだよ。それで、いまはどうしているんだい。", en: "I'm only joking. So, what are you up to these days?" }, o: [
        { t: "冗談はさておき、先生はお年を召されましたね。", r: "じょうだんはさておき、せんせいはおとしをめされましたね。", en: "Jokes aside, you've gotten old, Sensei." },
        { t: "どうもしておりません。お構いなく。", r: "どうもしておりません。おかまいなく。", en: "Nothing's the matter. Don't mind me." },
        { t: "実は、先生の影響で、今は高校で国語を教えているんです。", r: "じつは、せんせいのえいきょうで、いまはこうこうでこくごをおしえているんです。", en: "Actually, thanks to you, I'm now teaching Japanese at a high school." },
      ], c: 2 },
      { a: { t: "そうか、君が教師に。人生、何が起こるか分からないものだな。", r: "そうか、きみがきょうしに。じんせい、なにがおこるかわからないものだな。", en: "Well, well, you became a teacher. You never know what life has in store." }, o: [
        { t: "居眠りする生徒を見るたびに、先生のお気持ちがよく分かるようになりました。", r: "いねむりするせいとをみるたびに、せんせいのおきもちがよくわかるようになりました。", en: "Every time I see a student dozing off, I understand better how you must have felt." },
        { t: "ええ、人生は分かりやすいものですね。", r: "ええ、じんせいはわかりやすいものですね。", en: "Yes, life is easy to understand, isn't it?" },
        { t: "教師になるつもりは毛頭ございません。", r: "きょうしになるつもりはもうとうございません。", en: "I have no intention whatsoever of becoming a teacher." },
      ], c: 0 },
      { a: { t: "はは、それは何よりだ。今度ゆっくり飲みにでも行こうじゃないか。", r: "はは、それはなによりだ。こんどゆっくりのみにでもいこうじゃないか。", en: "Ha, glad to hear it. Let's go for a drink sometime and really catch up." }, o: [
        { t: "いえ、お酒は先生お一人でどうぞ。", r: "いえ、おさけはせんせいおひとりでどうぞ。", en: "No, please drink on your own, Sensei." },
        { t: "ぜひお供させてください。ご連絡をお待ちしております。", r: "ぜひおともさせてください。ごれんらくをおまちしております。", en: "I'd be delighted to join you. I'll look forward to hearing from you." },
        { t: "何よりも、ゆっくり走るのが大切です。", r: "なによりも、ゆっくりはしるのがたいせつです。", en: "Above all, it's important to run slowly." },
      ], c: 1 },
    ],
  },
];

export default data;
