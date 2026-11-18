import type { Text } from '../types';

const data: Text[] = [
  // ---------------------------------------------------------------- level 1
  {
    id: 'zh-1-cat-dami',
    lv: 1,
    kind: 'story',
    title: '我的猫',
    titleR: 'Wǒ de māo',
    titleEn: 'My Cat',
    s: [
      {
        t: [['我', 'wǒ', 'I'], ['叫', 'jiào', 'am called'], ['李月', 'Lǐ Yuè', 'Li Yue (name)'], ['，', '', ''], ['我', 'wǒ', 'I'], ['住', 'zhù', 'live'], ['在', 'zài', 'in'], ['北京', 'Běijīng', 'Beijing'], ['。', '', '']],
        en: 'My name is Li Yue, and I live in Beijing.',
      },
      {
        t: [['我', 'wǒ', 'my'], ['家', 'jiā', 'family; home'], ['的', 'de', "('s)"], ['猫', 'māo', 'cat'], ['叫', 'jiào', 'is called'], ['大米', 'Dàmǐ', 'Dami (name)'], ['，', '', ''], ['它', 'tā', 'it'], ['很', 'hěn', 'very'], ['小', 'xiǎo', 'small'], ['，', '', ''], ['很', 'hěn', 'very'], ['漂亮', 'piàoliang', 'pretty'], ['。', '', '']],
        en: "Our cat is called Dami. She's very small and very pretty.",
      },
      {
        t: [['每天', 'měitiān', 'every day'], ['下午', 'xiàwǔ', 'afternoon'], ['三', 'sān', 'three'], ['点', 'diǎn', "o'clock"], ['，', '', ''], ['大米', 'Dàmǐ', 'Dami'], ['不', 'bù', 'not'], ['在', 'zài', 'be at'], ['家', 'jiā', 'home'], ['。', '', '']],
        en: "Every afternoon at three o'clock, Dami isn't at home.",
      },
      {
        t: [['它', 'tā', 'it'], ['去', 'qù', 'go'], ['哪儿', 'nǎr', 'where'], ['了', 'le', '(past)'], ['？', '', '']],
        en: 'Where does she go?',
      },
      {
        t: [['今天', 'jīntiān', 'today'], ['，', '', ''], ['我', 'wǒ', 'I'], ['在', 'zài', 'at'], ['王', 'Wáng', 'Wang (surname)'], ['先生', 'xiānsheng', 'Mr.'], ['家', 'jiā', 'home'], ['看见', 'kànjiàn', 'saw'], ['了', 'le', '(completed)'], ['大米', 'Dàmǐ', 'Dami'], ['。', '', '']],
        en: "Today I saw Dami at Mr. Wang's home.",
      },
      {
        t: [['王', 'Wáng', 'Wang'], ['先生', 'xiānsheng', 'Mr.'], ['是', 'shì', 'is'], ['医生', 'yīshēng', 'doctor'], ['，', '', ''], ['他', 'tā', 'he'], ['住', 'zhù', 'lives'], ['在', 'zài', 'in'], ['我', 'wǒ', 'my'], ['家', 'jiā', 'home'], ['后面', 'hòumian', 'behind'], ['。', '', '']],
        en: 'Mr. Wang is a doctor. He lives behind our house.',
      },
      {
        t: [['王', 'Wáng', 'Wang'], ['先生', 'xiānsheng', 'Mr.'], ['在', 'zài', 'is (doing)'], ['吃饭', 'chīfàn', 'eat; have a meal'], ['，', '', ''], ['大米', 'Dàmǐ', 'Dami'], ['也', 'yě', 'also'], ['在', 'zài', 'is (doing)'], ['吃饭', 'chīfàn', 'eat'], ['！', '', '']],
        en: 'Mr. Wang was eating, and Dami was eating too!',
      },
      {
        t: [['王', 'Wáng', 'Wang'], ['先生', 'xiānsheng', 'Mr.'], ['说', 'shuō', 'says'], ['：', '', ''], ['“', '', ''], ['你好', 'nǐhǎo', 'hello'], ['！', '', ''], ['这', 'zhè', 'this'], ['是', 'shì', 'is'], ['你', 'nǐ', 'your'], ['的', 'de', "('s)"], ['猫', 'māo', 'cat'], ['吗', 'ma', '(question)'], ['？', '', ''], ['”', '', '']],
        en: 'Mr. Wang said, "Hello! Is this your cat?"',
      },
      {
        t: [['“', '', ''], ['它', 'tā', 'it'], ['叫', 'jiào', 'is called'], ['小白', 'Xiǎobái', 'Xiaobai (name)'], ['，', '', ''], ['每天', 'měitiān', 'every day'], ['下午', 'xiàwǔ', 'afternoon'], ['都', 'dōu', 'always'], ['来', 'lái', 'come'], ['我', 'wǒ', 'my'], ['家', 'jiā', 'home'], ['吃饭', 'chīfàn', 'eat'], ['。', '', ''], ['”', '', '']],
        en: '"She\'s called Xiaobai. She comes to my place to eat every afternoon."',
      },
      {
        t: [['我', 'wǒ', 'I'], ['说', 'shuō', 'say'], ['：', '', ''], ['“', '', ''], ['它', 'tā', 'it'], ['不', 'bù', 'not'], ['叫', 'jiào', 'is called'], ['小白', 'Xiǎobái', 'Xiaobai'], ['，', '', ''], ['它', 'tā', 'it'], ['叫', 'jiào', 'is called'], ['大米', 'Dàmǐ', 'Dami'], ['！', '', ''], ['”', '', '']],
        en: 'I said, "She\'s not called Xiaobai, she\'s called Dami!"',
      },
    ],
    q: [
      { q: 'Where does Li Yue live?', o: ['Shanghai', 'Beijing', "Xi'an"], a: 1 },
      { q: 'When is Dami not at home?', o: ['In the morning', 'At night', 'At three in the afternoon'], a: 2 },
      { q: 'What does Mr. Wang do?', o: ['He is a doctor', 'He is a teacher', 'He is a student'], a: 0 },
      { q: 'What does Mr. Wang call the cat?', o: ['Dami', 'Xiaobai', 'Xiaomao', 'Li Yue'], a: 1 },
    ],
  },
  {
    id: 'zh-1-tea',
    lv: 1,
    kind: 'article',
    title: '中国人喝茶',
    titleR: 'Zhōngguórén hē chá',
    titleEn: 'Chinese People and Tea',
    s: [
      {
        t: [['很', 'hěn', 'very'], ['多', 'duō', 'many'], ['中国人', 'Zhōngguórén', 'Chinese people'], ['喜欢', 'xǐhuan', 'like'], ['喝', 'hē', 'drink'], ['茶', 'chá', 'tea'], ['。', '', '']],
        en: 'Many Chinese people like drinking tea.',
      },
      {
        t: [['他们', 'tāmen', 'they'], ['上午', 'shàngwǔ', 'morning'], ['喝', 'hē', 'drink'], ['茶', 'chá', 'tea'], ['，', '', ''], ['下午', 'xiàwǔ', 'afternoon'], ['也', 'yě', 'also'], ['喝', 'hē', 'drink'], ['茶', 'chá', 'tea'], ['。', '', '']],
        en: 'They drink tea in the morning and in the afternoon too.',
      },
      {
        t: [['中国', 'Zhōngguó', 'China'], ['的', 'de', "('s)"], ['茶', 'chá', 'tea'], ['很', 'hěn', 'very'], ['多', 'duō', 'many'], ['，', '', ''], ['有', 'yǒu', 'have'], ['很', 'hěn', 'very'], ['多', 'duō', 'many'], ['名字', 'míngzi', 'names'], ['。', '', '']],
        en: 'China has many kinds of tea, with lots of different names.',
      },
      {
        t: [['天气', 'tiānqì', 'weather'], ['冷', 'lěng', 'cold'], ['的', 'de', '(when)'], ['时候', 'shíhou', 'time; when'], ['，', '', ''], ['喝', 'hē', 'drink'], ['热', 'rè', 'hot'], ['茶', 'chá', 'tea'], ['很', 'hěn', 'very'], ['好', 'hǎo', 'good'], ['。', '', '']],
        en: 'When the weather is cold, hot tea is great.',
      },
      {
        t: [['天气', 'tiānqì', 'weather'], ['热', 'rè', 'hot'], ['的', 'de', '(when)'], ['时候', 'shíhou', 'time; when'], ['，', '', ''], ['很', 'hěn', 'very'], ['多', 'duō', 'many'], ['人', 'rén', 'people'], ['也', 'yě', 'also'], ['喝', 'hē', 'drink'], ['热', 'rè', 'hot'], ['茶', 'chá', 'tea'], ['！', '', '']],
        en: 'When the weather is hot, many people drink hot tea too!',
      },
      {
        t: [['在', 'zài', 'in'], ['很', 'hěn', 'very'], ['多', 'duō', 'many'], ['饭店', 'fàndiàn', 'restaurants'], ['，', '', ''], ['茶', 'chá', 'tea'], ['不', 'bù', 'not'], ['要', 'yào', 'cost; need'], ['钱', 'qián', 'money'], ['。', '', '']],
        en: 'In many restaurants, the tea is free.',
      },
      {
        t: [['朋友', 'péngyou', 'friends'], ['来', 'lái', 'come'], ['家', 'jiā', 'home'], ['里', 'lǐ', 'in'], ['的', 'de', '(when)'], ['时候', 'shíhou', 'time; when'], ['，', '', ''], ['中国人', 'Zhōngguórén', 'Chinese people'], ['会', 'huì', 'will'], ['说', 'shuō', 'say'], ['：', '', ''], ['“', '', ''], ['请', 'qǐng', 'please'], ['喝', 'hē', 'drink'], ['茶', 'chá', 'tea'], ['！', '', ''], ['”', '', '']],
        en: 'When friends come over, Chinese people say, "Please have some tea!"',
      },
      {
        t: [['你', 'nǐ', 'you'], ['喝', 'hē', 'drink'], ['了', 'le', '(completed)'], ['，', '', ''], ['他们', 'tāmen', 'they'], ['会', 'huì', 'will'], ['很', 'hěn', 'very'], ['高兴', 'gāoxìng', 'happy'], ['。', '', '']],
        en: "If you drink it, they'll be very happy.",
      },
      {
        t: [['你', 'nǐ', 'you'], ['喜欢', 'xǐhuan', 'like'], ['喝', 'hē', 'drink'], ['茶', 'chá', 'tea'], ['吗', 'ma', '(question)'], ['？', '', '']],
        en: 'Do you like drinking tea?',
      },
    ],
    q: [
      { q: 'When do Chinese people drink tea, according to the text?', o: ['Only in the morning', 'In the morning and in the afternoon', 'Only at night'], a: 1 },
      { q: 'What do many people drink when the weather is hot?', o: ['Cold water', 'Hot tea', 'Coffee'], a: 1 },
      { q: 'What is true about tea in many restaurants?', o: ['It is free', 'It is very expensive', 'You cannot get it'], a: 0 },
      { q: 'What do Chinese people say when friends come over?', o: ['"Goodbye!"', '"Thank you!"', '"Please have some tea!"'], a: 2 },
    ],
  },

  // ---------------------------------------------------------------- level 2
  {
    id: 'zh-2-airport-birthday',
    lv: 2,
    kind: 'story',
    title: '机场的生日',
    titleR: 'Jīchǎng de shēngrì',
    titleEn: 'A Birthday at the Airport',
    s: [
      {
        t: [['今天', 'jīntiān', 'today'], ['是', 'shì', 'is'], ['我', 'wǒ', 'my'], ['丈夫', 'zhàngfu', 'husband'], ['的', 'de', "('s)"], ['生日', 'shēngrì', 'birthday'], ['。', '', '']],
        en: "Today is my husband's birthday.",
      },
      {
        t: [['他', 'tā', 'he'], ['去', 'qù', 'went to'], ['上海', 'Shànghǎi', 'Shanghai'], ['工作', 'gōngzuò', 'work'], ['了', 'le', '(completed)'], ['三', 'sān', 'three'], ['天', 'tiān', 'days'], ['，', '', ''], ['今天', 'jīntiān', 'today'], ['坐', 'zuò', 'take (a plane)'], ['晚上', 'wǎnshang', 'evening'], ['七', 'qī', 'seven'], ['点', 'diǎn', "o'clock"], ['的', 'de', '(of)'], ['飞机', 'fēijī', 'plane'], ['回', 'huí', 'return to'], ['北京', 'Běijīng', 'Beijing'], ['。', '', '']],
        en: "He went to Shanghai for three days of work, and today he's flying back to Beijing on the 7 p.m. flight.",
      },
      {
        t: [['我', 'wǒ', 'I'], ['准备', 'zhǔnbèi', 'plan; prepare'], ['去', 'qù', 'go to'], ['机场', 'jīchǎng', 'airport'], ['等', 'děng', 'wait for'], ['他', 'tā', 'him'], ['，', '', ''], ['送', 'sòng', 'give (as a gift)'], ['他', 'tā', 'him'], ['一', 'yī', 'a; one'], ['块', 'kuài', '(measure word)'], ['新', 'xīn', 'new'], ['手表', 'shǒubiǎo', 'watch'], ['。', '', '']],
        en: 'I planned to wait for him at the airport and give him a new watch.',
      },
      {
        t: [['下午', 'xiàwǔ', 'afternoon'], ['五', 'wǔ', 'five'], ['点', 'diǎn', "o'clock"], ['，', '', ''], ['我', 'wǒ', 'I'], ['坐', 'zuò', 'took'], ['出租车', 'chūzūchē', 'taxi'], ['去', 'qù', 'went to'], ['了', 'le', '(completed)'], ['机场', 'jīchǎng', 'airport'], ['。', '', '']],
        en: 'At five in the afternoon, I took a taxi to the airport.',
      },
      {
        t: [['机场', 'jīchǎng', 'airport'], ['的', 'de', "('s)"], ['人', 'rén', 'people'], ['非常', 'fēicháng', 'extremely'], ['多', 'duō', 'many'], ['，', '', ''], ['我', 'wǒ', 'I'], ['等', 'děng', 'waited'], ['了', 'le', '(completed)'], ['很', 'hěn', 'very'], ['长', 'cháng', 'long'], ['时间', 'shíjiān', 'time'], ['。', '', '']],
        en: 'The airport was really crowded, and I waited a long time.',
      },
      {
        t: [['七', 'qī', 'seven'], ['点', 'diǎn', "o'clock"], ['了', 'le', '(now)'], ['，', '', ''], ['八', 'bā', 'eight'], ['点', 'diǎn', "o'clock"], ['了', 'le', '(now)'], ['，', '', ''], ['我', 'wǒ', 'I'], ['还', 'hái', 'still'], ['没有', 'méiyǒu', 'had not'], ['看见', 'kànjiàn', 'seen'], ['他', 'tā', 'him'], ['。', '', '']],
        en: "Seven o'clock came, then eight, and I still hadn't seen him.",
      },
      {
        t: [['我', 'wǒ', 'I'], ['给', 'gěi', 'to'], ['他', 'tā', 'him'], ['打', 'dǎ', 'make (a call)'], ['了', 'le', '(completed)'], ['两', 'liǎng', 'two'], ['次', 'cì', 'times'], ['电话', 'diànhuà', 'phone call'], ['，', '', ''], ['但是', 'dànshì', 'but'], ['他', 'tā', 'he'], ['都', 'dōu', 'both times'], ['没', 'méi', 'did not'], ['接', 'jiē', 'answer'], ['。', '', '']],
        en: "I called him twice, but he didn't answer either time.",
      },
      {
        t: [['九', 'jiǔ', 'nine'], ['点', 'diǎn', "o'clock"], ['，', '', ''], ['他', 'tā', 'he'], ['给', 'gěi', 'to'], ['我', 'wǒ', 'me'], ['打', 'dǎ', 'make (a call)'], ['电话', 'diànhuà', 'phone call'], ['了', 'le', '(completed)'], ['。', '', '']],
        en: "At nine o'clock, he called me.",
      },
      {
        t: [['他', 'tā', 'he'], ['说', 'shuō', 'said'], ['：', '', ''], ['“', '', ''], ['你', 'nǐ', 'you'], ['在', 'zài', 'be at'], ['哪儿', 'nǎr', 'where'], ['？', '', ''], ['我', 'wǒ', 'I'], ['已经', 'yǐjīng', 'already'], ['在', 'zài', 'be at'], ['家', 'jiā', 'home'], ['了', 'le', '(change)'], ['！', '', ''], ['”', '', '']],
        en: 'He said, "Where are you? I\'m already home!"',
      },
      {
        t: [['原来', 'yuánlái', 'it turned out'], ['他', 'tā', 'he'], ['坐', 'zuò', 'took'], ['了', 'le', '(completed)'], ['下午', 'xiàwǔ', 'afternoon'], ['的', 'de', '(of)'], ['飞机', 'fēijī', 'plane'], ['，', '', ''], ['因为', 'yīnwèi', 'because'], ['他', 'tā', 'he'], ['想', 'xiǎng', 'wanted'], ['给', 'gěi', 'for'], ['我', 'wǒ', 'me'], ['做', 'zuò', 'make'], ['晚饭', 'wǎnfàn', 'dinner'], ['。', '', '']],
        en: 'It turned out he had taken an afternoon flight, because he wanted to make dinner for me.',
      },
      {
        t: [['我', 'wǒ', 'I'], ['回', 'huí', 'returned'], ['到', 'dào', 'to'], ['家', 'jiā', 'home'], ['，', '', ''], ['桌子', 'zhuōzi', 'table'], ['上', 'shàng', 'on'], ['已经', 'yǐjīng', 'already'], ['有', 'yǒu', 'there were'], ['面条', 'miàntiáo', 'noodles'], ['和', 'hé', 'and'], ['鸡蛋', 'jīdàn', 'eggs'], ['了', 'le', '(change)'], ['。', '', '']],
        en: 'When I got home, there were already noodles and eggs on the table.',
      },
      {
        t: [['我们', 'wǒmen', 'we'], ['一起', 'yīqǐ', 'together'], ['吃', 'chī', 'ate'], ['了', 'le', '(completed)'], ['生日', 'shēngrì', 'birthday'], ['面条', 'miàntiáo', 'noodles'], ['，', '', ''], ['这', 'zhè', 'this'], ['个', 'gè', '(measure word)'], ['生日', 'shēngrì', 'birthday'], ['真', 'zhēn', 'really'], ['有意思', 'yǒuyìsi', 'interesting; fun'], ['。', '', '']],
        en: 'We ate birthday noodles together. It was a really funny birthday.',
      },
    ],
    q: [
      { q: 'Why did the husband go to Shanghai?', o: ['For work', 'To travel', 'To visit his parents'], a: 0 },
      { q: 'What present did the wife want to give him?', o: ['A phone', 'A new watch', 'A book', 'Some noodles'], a: 1 },
      { q: 'How did she get to the airport?', o: ['By bus', 'By taxi', 'By subway'], a: 1 },
      { q: 'Why did the husband take an earlier flight?', o: ['His meeting was cancelled', 'He wanted to make dinner for her', 'The evening flight was full'], a: 1 },
      { q: 'What was on the table when she got home?', o: ['A birthday cake', 'Noodles and eggs', 'Rice and fish'], a: 1 },
    ],
  },
  {
    id: 'zh-2-morning-park',
    lv: 2,
    kind: 'article',
    title: '早上的公园',
    titleR: 'Zǎoshang de gōngyuán',
    titleEn: 'The Park in the Morning',
    s: [
      {
        t: [['在', 'zài', 'in'], ['中国', 'Zhōngguó', 'China'], ['，', '', ''], ['早上', 'zǎoshang', 'morning'], ['的', 'de', "('s)"], ['公园', 'gōngyuán', 'park'], ['里', 'lǐ', 'in'], ['人', 'rén', 'people'], ['非常', 'fēicháng', 'extremely'], ['多', 'duō', 'many'], ['。', '', '']],
        en: 'In China, parks are full of people in the morning.',
      },
      {
        t: [['很', 'hěn', 'very'], ['多', 'duō', 'many'], ['人', 'rén', 'people'], ['每天', 'měitiān', 'every day'], ['早上', 'zǎoshang', 'morning'], ['六', 'liù', 'six'], ['点', 'diǎn', "o'clock"], ['就', 'jiù', 'already'], ['去', 'qù', 'go to'], ['公园', 'gōngyuán', 'park'], ['运动', 'yùndòng', 'exercise'], ['。', '', '']],
        en: 'Many people go to the park to exercise as early as six every morning.',
      },
      {
        t: [['有的', 'yǒude', 'some'], ['人', 'rén', 'people'], ['跑步', 'pǎobù', 'run'], ['，', '', ''], ['有的', 'yǒude', 'some'], ['人', 'rén', 'people'], ['打', 'dǎ', 'do; play'], ['太极拳', 'tàijíquán', 'tai chi'], ['。', '', '']],
        en: 'Some people go running, and some do tai chi.',
      },
      {
        t: [['还有', 'háiyǒu', 'there are also'], ['人', 'rén', 'people'], ['在', 'zài', '(doing)'], ['唱歌', 'chànggē', 'sing'], ['，', '', ''], ['在', 'zài', '(doing)'], ['跳舞', 'tiàowǔ', 'dance'], ['。', '', '']],
        en: 'There are also people singing and dancing.',
      },
      {
        t: [['跳舞', 'tiàowǔ', 'dance'], ['的', 'de', '(who)'], ['人', 'rén', 'people'], ['有时候', 'yǒushíhou', 'sometimes'], ['有', 'yǒu', 'number'], ['几十', 'jǐshí', 'several dozen'], ['个', 'gè', '(measure word)'], ['，', '', ''], ['她们', 'tāmen', 'they (female)'], ['穿', 'chuān', 'wear'], ['着', 'zhe', '(-ing)'], ['红色', 'hóngsè', 'red'], ['的', 'de', '(attributive)'], ['衣服', 'yīfu', 'clothes'], ['。', '', '']],
        en: 'Sometimes there are dozens of dancers, all wearing red clothes.',
      },
      {
        t: [['这', 'zhè', 'this'], ['种', 'zhǒng', 'kind'], ['舞', 'wǔ', 'dance'], ['叫', 'jiào', 'is called'], ['“', '', ''], ['广场舞', 'guǎngchǎngwǔ', 'square dancing'], ['”', '', ''], ['。', '', '']],
        en: 'This kind of dancing is called "square dancing".',
      },
      {
        t: [['为什么', 'wèishénme', 'why'], ['大家', 'dàjiā', 'everyone'], ['喜欢', 'xǐhuan', 'like'], ['早上', 'zǎoshang', 'morning'], ['运动', 'yùndòng', 'exercise'], ['？', '', '']],
        en: 'Why does everyone like exercising in the morning?',
      },
      {
        t: [['因为', 'yīnwèi', 'because'], ['早上', 'zǎoshang', 'morning'], ['人', 'rén', 'people'], ['不', 'bù', 'not'], ['忙', 'máng', 'busy'], ['，', '', ''], ['他们', 'tāmen', 'they'], ['觉得', 'juéde', 'feel; think'], ['这', 'zhè', 'this'], ['对', 'duì', 'for'], ['身体', 'shēntǐ', 'body; health'], ['很', 'hěn', 'very'], ['好', 'hǎo', 'good'], ['。', '', '']],
        en: "Because people aren't busy in the morning, and they think it's good for their health.",
      },
      {
        t: [['运动', 'yùndòng', 'exercise'], ['以后', 'yǐhòu', 'after'], ['，', '', ''], ['他们', 'tāmen', 'they'], ['常常', 'chángcháng', 'often'], ['一起', 'yīqǐ', 'together'], ['去', 'qù', 'go'], ['吃', 'chī', 'eat'], ['早饭', 'zǎofàn', 'breakfast'], ['。', '', '']],
        en: 'After exercising, they often go and have breakfast together.',
      },
      {
        t: [['上班', 'shàngbān', 'go to work'], ['的', 'de', '(who)'], ['人', 'rén', 'people'], ['早上', 'zǎoshang', 'morning'], ['没有', 'méiyǒu', "don't have"], ['时间', 'shíjiān', 'time'], ['，', '', ''], ['所以', 'suǒyǐ', 'so'], ['他们', 'tāmen', 'they'], ['晚上', 'wǎnshang', 'evening'], ['去', 'qù', 'go to'], ['公园', 'gōngyuán', 'park'], ['跑步', 'pǎobù', 'run'], ['。', '', '']],
        en: "People who work don't have time in the morning, so they go running in the park in the evening.",
      },
      {
        t: [['晚上', 'wǎnshang', 'evening'], ['的', 'de', "('s)"], ['公园', 'gōngyuán', 'park'], ['也', 'yě', 'also'], ['很', 'hěn', 'very'], ['漂亮', 'piàoliang', 'pretty'], ['。', '', '']],
        en: 'Parks are lovely in the evening too.',
      },
      {
        t: [['你', 'nǐ', 'you'], ['也', 'yě', 'also'], ['想', 'xiǎng', 'want'], ['去', 'qù', 'go to'], ['中国', 'Zhōngguó', 'China'], ['的', 'de', "('s)"], ['公园', 'gōngyuán', 'park'], ['看看', 'kànkan', 'have a look'], ['吗', 'ma', '(question)'], ['？', '', '']],
        en: 'Would you like to go and see a park in China too?',
      },
    ],
    q: [
      { q: 'When do many people go to the park to exercise?', o: ['At six in the morning', 'At noon', 'At midnight'], a: 0 },
      { q: 'What do the square dancers often wear?', o: ['Black clothes', 'White clothes', 'Red clothes'], a: 2 },
      { q: 'Why do people like exercising in the morning?', o: ["They aren't busy and think it's healthy", 'The park is free only in the morning', 'Their doctor tells them to'], a: 0 },
      { q: 'When do working people go running in the park?', o: ['Before work', 'In the evening', 'At lunchtime'], a: 1 },
    ],
  },

  // ---------------------------------------------------------------- level 3
  {
    id: 'zh-3-piano-upstairs',
    lv: 3,
    kind: 'story',
    title: '楼上的钢琴',
    titleR: 'Lóushàng de gāngqín',
    titleEn: 'The Piano Upstairs',
    s: [
      {
        t: [['我', 'wǒ', 'I'], ['上', 'shàng', 'last'], ['个', 'gè', '(measure word)'], ['月', 'yuè', 'month'], ['搬家', 'bānjiā', 'moved house'], ['了', 'le', '(completed)'], ['，', '', ''], ['新', 'xīn', 'new'], ['房子', 'fángzi', 'home; flat'], ['离', 'lí', 'from'], ['公司', 'gōngsī', 'company; office'], ['很', 'hěn', 'very'], ['近', 'jìn', 'close'], ['。', '', '']],
        en: 'I moved last month, and my new flat is very close to my office.',
      },
      {
        t: [['新', 'xīn', 'new'], ['房子', 'fángzi', 'flat'], ['什么', 'shénme', 'everything'], ['都', 'dōu', 'all'], ['好', 'hǎo', 'good'], ['，', '', ''], ['只是', 'zhǐshì', 'only; except that'], ['有', 'yǒu', 'there is'], ['一', 'yī', 'one'], ['个', 'gè', '(measure word)'], ['问题', 'wèntí', 'problem'], ['。', '', '']],
        en: "Everything about the new flat is great, except for one problem.",
      },
      {
        t: [['每天', 'měitiān', 'every day'], ['晚上', 'wǎnshang', 'evening'], ['十', 'shí', 'ten'], ['点', 'diǎn', "o'clock"], ['，', '', ''], ['楼上', 'lóushàng', 'upstairs'], ['都', 'dōu', 'always'], ['有', 'yǒu', 'there is'], ['人', 'rén', 'someone'], ['弹', 'tán', 'play (an instrument)'], ['钢琴', 'gāngqín', 'piano'], ['。', '', '']],
        en: 'Every night at ten, someone upstairs plays the piano.',
      },
      {
        t: [['他', 'tā', 'he'], ['弹', 'tán', 'plays'], ['得', 'de', '(degree)'], ['不', 'bù', 'not'], ['太', 'tài', 'very'], ['好', 'hǎo', 'well'], ['，', '', ''], ['总是', 'zǒngshì', 'always'], ['弹', 'tán', 'play'], ['错', 'cuò', 'wrong'], ['。', '', '']],
        en: "They don't play very well and keep hitting wrong notes.",
      },
      {
        t: [['我', 'wǒ', 'I'], ['很', 'hěn', 'very'], ['晚', 'wǎn', 'late'], ['才', 'cái', 'only then'], ['能', 'néng', 'can'], ['睡着', 'shuìzháo', 'fall asleep'], ['，', '', ''], ['上班', 'shàngbān', 'work'], ['的', 'de', '(when)'], ['时候', 'shíhou', 'time'], ['特别', 'tèbié', 'especially'], ['累', 'lèi', 'tired'], ['。', '', '']],
        en: "I couldn't fall asleep until very late, and I was exhausted at work.",
      },
      {
        t: [['一', 'yī', 'one'], ['个', 'gè', '(measure word)'], ['星期', 'xīngqī', 'week'], ['以后', 'yǐhòu', 'after'], ['，', '', ''], ['我', 'wǒ', 'I'], ['决定', 'juédìng', 'decided'], ['去', 'qù', 'go'], ['楼上', 'lóushàng', 'upstairs'], ['跟', 'gēn', 'with'], ['他们', 'tāmen', 'them'], ['说', 'shuō', 'talk'], ['一下', 'yīxià', 'a bit'], ['。', '', '']],
        en: 'After a week, I decided to go upstairs and have a word with them.',
      },
      {
        t: [['开门', 'kāimén', 'open the door'], ['的', 'de', '(the one who)'], ['是', 'shì', 'was'], ['一', 'yī', 'a'], ['个', 'gè', '(measure word)'], ['七八', 'qībā', 'seven or eight'], ['岁', 'suì', 'years old'], ['的', 'de', '(attributive)'], ['小', 'xiǎo', 'little'], ['男孩', 'nánhái', 'boy'], ['。', '', '']],
        en: 'The door was opened by a little boy of seven or eight.',
      },
      {
        t: [['他', 'tā', 'he'], ['有点儿', 'yǒudiǎnr', 'a little'], ['害怕', 'hàipà', 'afraid'], ['，', '', ''], ['问', 'wèn', 'asked'], ['：', '', ''], ['“', '', ''], ['叔叔', 'shūshu', 'uncle (polite address)'], ['，', '', ''], ['是', 'shì', 'is it'], ['我', 'wǒ', 'my'], ['的', 'de', "('s)"], ['声音', 'shēngyīn', 'sound; noise'], ['太', 'tài', 'too'], ['大', 'dà', 'loud'], ['了', 'le', '(excess)'], ['吗', 'ma', '(question)'], ['？', '', ''], ['”', '', '']],
        en: 'He looked a little scared and asked, "Sir, am I being too loud?"',
      },
      {
        t: [['他', 'tā', 'he'], ['告诉', 'gàosu', 'told'], ['我', 'wǒ', 'me'], ['，', '', ''], ['下', 'xià', 'next'], ['个', 'gè', '(measure word)'], ['星期六', 'xīngqīliù', 'Saturday'], ['他', 'tā', 'he'], ['有', 'yǒu', 'has'], ['一', 'yī', 'a'], ['个', 'gè', '(measure word)'], ['钢琴', 'gāngqín', 'piano'], ['比赛', 'bǐsài', 'competition'], ['。', '', '']],
        en: 'He told me he had a piano competition next Saturday.',
      },
      {
        t: [['他', 'tā', 'his'], ['爸爸', 'bàba', 'dad'], ['妈妈', 'māma', 'mum'], ['下班', 'xiàbān', 'finish work'], ['很', 'hěn', 'very'], ['晚', 'wǎn', 'late'], ['，', '', ''], ['所以', 'suǒyǐ', 'so'], ['他', 'tā', 'he'], ['只', 'zhǐ', 'only'], ['能', 'néng', 'can'], ['晚上', 'wǎnshang', 'evening'], ['练习', 'liànxí', 'practise'], ['。', '', '']],
        en: 'His parents finish work very late, so he can only practise in the evening.',
      },
      {
        t: [['听', 'tīng', 'hearing'], ['了', 'le', '(completed)'], ['这些', 'zhèxiē', 'these'], ['话', 'huà', 'words'], ['，', '', ''], ['我', 'wǒ', 'I'], ['突然', 'tūrán', 'suddenly'], ['不', 'bù', 'no longer'], ['生气', 'shēngqì', 'angry'], ['了', 'le', '(change)'], ['。', '', '']],
        en: 'Hearing this, I suddenly stopped being angry.',
      },
      {
        t: [['我', 'wǒ', 'I'], ['说', 'shuō', 'said'], ['：', '', ''], ['“', '', ''], ['没关系', 'méiguānxi', "it's fine"], ['，', '', ''], ['你', 'nǐ', 'you'], ['认真', 'rènzhēn', 'seriously'], ['练习', 'liànxí', 'practise'], ['吧', 'ba', '(suggestion)'], ['，', '', ''], ['比赛', 'bǐsài', 'competition'], ['那天', 'nàtiān', 'that day'], ['我', 'wǒ', 'I'], ['去', 'qù', 'go'], ['给', 'gěi', 'for'], ['你', 'nǐ', 'you'], ['加油', 'jiāyóu', 'cheer on'], ['！', '', ''], ['”', '', '']],
        en: 'I said, "It\'s fine, keep practising hard. I\'ll come and cheer you on at the competition!"',
      },
      {
        t: [['后来', 'hòulái', 'later'], ['，', '', ''], ['他', 'tā', 'he'], ['在', 'zài', 'in'], ['比赛', 'bǐsài', 'competition'], ['中', 'zhōng', 'in'], ['得', 'dé', 'won; got'], ['了', 'le', '(completed)'], ['第一', 'dìyī', 'first'], ['名', 'míng', 'place'], ['。', '', '']],
        en: 'In the end, he won first place in the competition.',
      },
      {
        t: [['现在', 'xiànzài', 'now'], ['，', '', ''], ['我', 'wǒ', 'I'], ['每天', 'měitiān', 'every day'], ['晚上', 'wǎnshang', 'evening'], ['一边', 'yībiān', 'while'], ['听', 'tīng', 'listen to'], ['他', 'tā', 'him'], ['弹', 'tán', 'play'], ['钢琴', 'gāngqín', 'piano'], ['，', '', ''], ['一边', 'yībiān', 'while'], ['准备', 'zhǔnbèi', 'get ready'], ['睡觉', 'shuìjiào', 'sleep'], ['。', '', '']],
        en: 'Now, every evening, I listen to him play the piano while I get ready for bed.',
      },
    ],
    q: [
      { q: 'What was the problem with the new flat?', o: ['It was far from the office', 'Someone upstairs played piano at night', 'It was too expensive', 'It was too small'], a: 1 },
      { q: 'Who opened the door upstairs?', o: ['An old woman', "The boy's father", 'A little boy'], a: 2 },
      { q: 'Why could the boy only practise in the evening?', o: ['He goes to school all day', 'His parents finish work late', 'The piano is at his grandmother\'s'], a: 1 },
      { q: 'How did the narrator feel after hearing the boy\'s story?', o: ['He was no longer angry', 'He was even angrier', 'He decided to move again'], a: 0 },
      { q: 'What happened at the competition?', o: ['The boy did not go', 'The boy came last', 'The boy won first place'], a: 2 },
    ],
  },
  {
    id: 'zh-3-takeout',
    lv: 3,
    kind: 'article',
    title: '点外卖',
    titleR: 'Diǎn wàimài',
    titleEn: 'Ordering Takeout',
    s: [
      {
        t: [['在', 'zài', 'in'], ['中国', 'Zhōngguó', 'China'], ['，', '', ''], ['很', 'hěn', 'very'], ['多', 'duō', 'many'], ['年轻人', 'niánqīngrén', 'young people'], ['不', 'bù', 'not'], ['喜欢', 'xǐhuan', 'like'], ['自己', 'zìjǐ', 'oneself'], ['做饭', 'zuòfàn', 'cook'], ['。', '', '']],
        en: "In China, many young people don't like cooking for themselves.",
      },
      {
        t: [['他们', 'tāmen', 'they'], ['经常', 'jīngcháng', 'often'], ['用', 'yòng', 'use'], ['手机', 'shǒujī', 'mobile phone'], ['点', 'diǎn', 'order'], ['外卖', 'wàimài', 'takeout'], ['。', '', '']],
        en: 'They often order takeout on their phones.',
      },
      {
        t: [['点', 'diǎn', 'order'], ['外卖', 'wàimài', 'takeout'], ['非常', 'fēicháng', 'extremely'], ['方便', 'fāngbiàn', 'convenient'], ['，', '', ''], ['几', 'jǐ', 'a few'], ['分钟', 'fēnzhōng', 'minutes'], ['就', 'jiù', 'just'], ['能', 'néng', 'can'], ['选', 'xuǎn', 'choose'], ['好', 'hǎo', '(done)'], ['。', '', '']],
        en: 'Ordering takeout is really convenient; you can choose in just a few minutes.',
      },
      {
        t: [['一般', 'yībān', 'usually'], ['半', 'bàn', 'half'], ['个', 'gè', '(measure word)'], ['小时', 'xiǎoshí', 'hour'], ['以后', 'yǐhòu', 'after'], ['，', '', ''], ['送', 'sòng', 'deliver'], ['外卖', 'wàimài', 'takeout'], ['的', 'de', '(who)'], ['人', 'rén', 'person'], ['就', 'jiù', 'then'], ['会', 'huì', 'will'], ['把', 'bǎ', '(object marker)'], ['饭', 'fàn', 'food'], ['送', 'sòng', 'deliver'], ['到', 'dào', 'to'], ['你', 'nǐ', 'your'], ['家', 'jiā', 'home'], ['门口', 'ménkǒu', 'doorway'], ['。', '', '']],
        en: 'Usually, half an hour later, a delivery rider brings the food to your door.',
      },
      {
        t: [['下雨', 'xiàyǔ', 'rain'], ['的', 'de', '(when)'], ['时候', 'shíhou', 'time'], ['，', '', ''], ['他们', 'tāmen', 'they'], ['也', 'yě', 'also'], ['骑', 'qí', 'ride'], ['着', 'zhe', '(-ing)'], ['车', 'chē', 'bike; scooter'], ['在', 'zài', 'on'], ['路', 'lù', 'road'], ['上', 'shàng', 'on'], ['跑', 'pǎo', 'rush about'], ['。', '', '']],
        en: 'Even when it rains, they are out on the roads on their scooters.',
      },
      {
        t: [['你', 'nǐ', 'you'], ['可以', 'kěyǐ', 'can'], ['点', 'diǎn', 'order'], ['面条', 'miàntiáo', 'noodles'], ['、', '', ''], ['米饭', 'mǐfàn', 'rice'], ['和', 'hé', 'and'], ['水果', 'shuǐguǒ', 'fruit'], ['，', '', ''], ['还', 'hái', 'also'], ['可以', 'kěyǐ', 'can'], ['点', 'diǎn', 'order'], ['咖啡', 'kāfēi', 'coffee'], ['和', 'hé', 'and'], ['蛋糕', 'dàngāo', 'cake'], ['。', '', '']],
        en: 'You can order noodles, rice and fruit, and even coffee and cake.',
      },
      {
        t: [['有些', 'yǒuxiē', 'some'], ['外卖', 'wàimài', 'takeout'], ['甚至', 'shènzhì', 'even'], ['比', 'bǐ', 'than'], ['饭馆', 'fànguǎn', 'restaurant'], ['里', 'lǐ', 'in'], ['的', 'de', '(the one)'], ['还', 'hái', 'even'], ['便宜', 'piányi', 'cheap'], ['。', '', '']],
        en: 'Some takeout is even cheaper than eating in the restaurant.',
      },
      {
        t: [['但是', 'dànshì', 'but'], ['，', '', ''], ['外卖', 'wàimài', 'takeout'], ['也', 'yě', 'also'], ['有', 'yǒu', 'has'], ['一些', 'yīxiē', 'some'], ['问题', 'wèntí', 'problems'], ['。', '', '']],
        en: 'However, takeout also has some problems.',
      },
      {
        t: [['第一', 'dìyī', 'first'], ['，', '', ''], ['外卖', 'wàimài', 'takeout'], ['的', 'de', "('s)"], ['菜', 'cài', 'dishes'], ['一般', 'yībān', 'usually'], ['比较', 'bǐjiào', 'rather'], ['油', 'yóu', 'oily'], ['，', '', ''], ['经常', 'jīngcháng', 'often'], ['吃', 'chī', 'eat'], ['对', 'duì', 'for'], ['身体', 'shēntǐ', 'health'], ['不', 'bù', 'not'], ['好', 'hǎo', 'good'], ['。', '', '']],
        en: "First, takeout dishes are usually quite oily, and eating them often isn't good for your health.",
      },
      {
        t: [['第二', 'dì\'èr', 'second'], ['，', '', ''], ['每', 'měi', 'every'], ['次', 'cì', 'time'], ['点', 'diǎn', 'order'], ['外卖', 'wàimài', 'takeout'], ['都', 'dōu', 'all'], ['会', 'huì', 'will'], ['用', 'yòng', 'use'], ['很', 'hěn', 'very'], ['多', 'duō', 'many'], ['盒子', 'hézi', 'boxes'], ['和', 'hé', 'and'], ['袋子', 'dàizi', 'bags'], ['，', '', ''], ['对', 'duì', 'for'], ['环境', 'huánjìng', 'environment'], ['不', 'bù', 'not'], ['好', 'hǎo', 'good'], ['。', '', '']],
        en: "Second, every order uses lots of boxes and bags, which isn't good for the environment.",
      },
      {
        t: [['所以', 'suǒyǐ', 'so'], ['，', '', ''], ['现在', 'xiànzài', 'now'], ['有些', 'yǒuxiē', 'some'], ['年轻人', 'niánqīngrén', 'young people'], ['开始', 'kāishǐ', 'start'], ['在', 'zài', 'at'], ['周末', 'zhōumò', 'weekend'], ['自己', 'zìjǐ', 'oneself'], ['做饭', 'zuòfàn', 'cook'], ['。', '', '']],
        en: 'So now some young people have started cooking for themselves at the weekend.',
      },
      {
        t: [['他们', 'tāmen', 'they'], ['觉得', 'juéde', 'feel; think'], ['，', '', ''], ['自己', 'zìjǐ', 'oneself'], ['做', 'zuò', 'make'], ['的', 'de', '(that)'], ['饭', 'fàn', 'food'], ['虽然', 'suīrán', 'although'], ['简单', 'jiǎndān', 'simple'], ['，', '', ''], ['但是', 'dànshì', 'but'], ['更', 'gèng', 'more'], ['健康', 'jiànkāng', 'healthy'], ['。', '', '']],
        en: 'They feel that home cooking may be simple, but it is healthier.',
      },
      {
        t: [['你', 'nǐ', 'you'], ['呢', 'ne', '(and you?)'], ['？', '', ''], ['你', 'nǐ', 'you'], ['更', 'gèng', 'more'], ['喜欢', 'xǐhuan', 'like'], ['点', 'diǎn', 'order'], ['外卖', 'wàimài', 'takeout'], ['还是', 'háishi', 'or'], ['自己', 'zìjǐ', 'oneself'], ['做饭', 'zuòfàn', 'cook'], ['？', '', '']],
        en: 'What about you? Do you prefer ordering takeout or cooking for yourself?',
      },
    ],
    q: [
      { q: 'How do young people in China usually order takeout?', o: ['By phone call to the restaurant', 'On their mobile phones', 'In person at the restaurant'], a: 1 },
      { q: 'How long does delivery usually take?', o: ['About ten minutes', 'About half an hour', 'About two hours'], a: 1 },
      { q: 'Which is NOT mentioned as a problem with takeout?', o: ['The food is often oily', 'It uses many boxes and bags', 'It is always very expensive'], a: 2 },
      { q: 'What have some young people started doing?', o: ['Cooking at the weekend', 'Working as delivery riders', 'Eating only fruit'], a: 0 },
    ],
  },
];

export default data;
