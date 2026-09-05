import { LESSONS } from "./lessons";

export type QuizOption = {
  text: string;
  feedback: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  questionEn: string;
  hint: string;
  options: QuizOption[];
  correctIndex: number;
};

type CustomQuestion = readonly [
  question: string,
  questionEn: string,
  correct: string,
  wrong1: string,
  wrong2: string,
  wrong3: string,
  hint: string,
  explanation: string,
];

const CUSTOM_QUIZZES: CustomQuestion[][] = [
  [
    ["哪一部分表示时间？", "Which part tells us when?", "星期六早上", "我和爸爸", "到公园", "骑脚踏车", "找出说明事情何时发生的词语。 / Find when the event happened.", "‘星期六早上’说明事情发生的时间。 / It tells us when the event happened."],
    ["哪一部分表示人物？", "Which part tells us who?", "我和爸爸", "星期六早上", "到公园", "骑脚踏车", "找出做这件事的人。 / Find the people doing the action.", "‘我和爸爸’是句子里的人物。 / ‘My father and I’ are the people in the sentence."],
    ["哪一部分表示地点？", "Which part tells us where?", "到公园", "星期六早上", "我和爸爸", "骑脚踏车", "找出事情发生的地方。 / Find where the event happened.", "‘到公园’说明事情发生的地点。 / It tells us where the event happened."],
    ["哪一部分表示动作？", "Which part tells us the action?", "骑脚踏车", "星期六早上", "我和爸爸", "到公园", "找出人物做了什么。 / Find what the people did.", "‘骑脚踏车’是人物进行的动作。 / Riding bicycles is the action."],
    ["哪一句的语序最自然？", "Which sentence has the most natural Chinese word order?", "星期六早上，我和爸爸到公园骑脚踏车。", "我和爸爸骑脚踏车星期六早上到公园。", "到公园星期六早上骑脚踏车我和爸爸。", "骑脚踏车我和爸爸到公园星期六早上。", "先找时间，再找人物、地点和动作。 / Start with when, then who, where and action.", "中文常用‘时间＋人物＋地点＋动作’的顺序。 / Chinese often follows When + Who + Where + Action."],
  ],
  [
    ["看见同学的书掉了，应该先写哪一个动作？", "Which action should be written first?", "连忙走过去", "把书还给他", "转身离开", "说声谢谢", "先写接近需要帮助的人或物。 / Begin by approaching the person or object.", "‘连忙走过去’是帮助前发生的第一个动作。 / Walking over happens before the helping action."],
    ["走过去以后，哪个动作最合理？", "What action logically comes next after walking over?", "弯下腰", "回到座位", "闭上眼睛", "打开雨伞", "想一想捡东西前身体会怎样移动。 / Think about how the body moves before picking something up.", "捡地上的东西前，通常要先弯下腰。 / You normally bend down before picking up something."],
    ["最后应该写什么？", "What should be written as the final action?", "把书捡起来还给他", "看见书掉在地上", "走到同学身边", "弯下腰", "最后写事情怎样完成。 / End with how the action was completed.", "把书捡起并归还是整个动作的结果。 / Picking up and returning the book completes the sequence."],
    ["哪一句的动作顺序最合理？", "Which sentence has the most logical action order?", "我走过去，弯下腰，把铅笔捡起来。", "我把铅笔捡起来，才走过去，最后弯腰。", "我弯下腰，把铅笔捡起来，然后才看见它。", "我把铅笔捡起来，先离开，再走过去。", "按照真实发生的先后次序排列。 / Follow the order in which the actions really happen.", "先走近、再弯腰、最后捡起，动作才连贯。 / Approach, bend down, then pick it up."],
    ["为什么动作要按顺序写？", "Why should actions be written in order?", "让读者清楚事情怎样发生", "让句子看起来更长", "让每句话都有很多成语", "让所有动作同时发生", "想一想读者怎样在脑中看见整个过程。 / Think about how the reader pictures the event.", "合理的动作顺序让过程清楚、画面连贯。 / Logical order makes the sequence clear and easy to picture."],
  ],
  [
    ["哪一句用反应表现紧张？", "Which sentence shows nervousness through a reaction?", "我的心怦怦直跳，手心也冒出了汗。", "我今天非常紧张。", "紧张是一种心情。", "我觉得这件事很紧张。", "找出身体出现的变化。 / Look for a physical reaction.", "心跳加快和手心冒汗让读者看见紧张。 / A racing heart and sweaty palms show nervousness."],
    ["哪一句用反应表现开心？", "Which sentence shows happiness through a reaction?", "我眼前一亮，脸上露出了笑容。", "我感到很开心。", "开心的感觉很好。", "这是一件开心的事。", "找出眼神或表情的变化。 / Look for a change in the eyes or expression.", "眼前一亮和露出笑容把开心表现出来。 / Bright eyes and a smile show happiness."],
    ["哪一句只告诉读者心情，没有表现反应？", "Which sentence only names the feeling without showing a reaction?", "我很着急。", "我急得在房间里来回踱步。", "我不停地翻找书包，额头直冒汗。", "我的心猛地一沉，不知如何是好。", "找出只有心情词、没有动作或身体反应的句子。 / Find the sentence with only a feeling word.", "‘我很着急’只说出心情，没有给读者具体画面。 / It names the feeling without showing it."],
    ["哪一句符合‘原因＋反应＋想法’？", "Which sentence follows Cause + Reaction + Thought?", "发现钱包不见了，我顿时冒出冷汗，不知该怎么办。", "我不知该怎么办，钱包不见了，我冒汗。", "我冒汗，不知该怎么办，后来钱包不见了。", "钱包不见了，不知该怎么办，然后我发现钱包。", "先写发生什么，再写反应和心里的想法。 / State the cause before the reaction and thought.", "发现钱包不见是原因，冒汗是反应，不知怎么办是想法。 / The missing wallet causes the reaction and thought."],
    ["怎样把‘我很害怕’写得更具体？", "How can ‘I was very scared’ be made more vivid?", "我吓得双腿发软，连一句话也说不出来。", "我真的感到非常非常害怕。", "害怕就是我当时的心情。", "我有一种害怕的感觉。", "加入身体反应或动作。 / Add a physical reaction or action.", "双腿发软和说不出话具体表现害怕。 / Weak legs and being unable to speak show fear vividly."],
  ],
  [
    ["说话内容前可以先加什么？", "What can be added before spoken words?", "人物动作和说话语气", "另一段很长的景物描写", "与事情无关的资料", "英文逐字翻译", "想一想怎样让读者看见人物说话的样子。 / Help the reader picture how the person speaks.", "动作和语气能表现人物当时的态度与心情。 / Action and tone reveal the speaker’s attitude and feeling."],
    ["关心同学时，哪个语气词最合适？", "Which tone word best suits caring for a classmate?", "轻声", "怒气冲冲地", "不耐烦地", "恶狠狠地", "关心别人时，语气通常温和。 / A caring tone is usually gentle.", "‘轻声’能表现温和与关心。 / Speaking softly shows gentleness and care."],
    ["哪一句的对话标点正确？", "Which sentence uses dialogue punctuation correctly?", "我问道：“你需要帮忙吗？”", "我问道“你需要帮忙吗”。", "我问道，你需要帮忙吗？", "我问道：“你需要帮忙吗”。", "留意冒号、前引号、问号和后引号。 / Check the colon, quotation marks and question mark.", "问道后用冒号，问句用问号，并放在引号里面。 / Use a colon, quotation marks and a question mark inside the closing quote."],
    ["哪一句同时有动作、语气和说话内容？", "Which sentence includes an action, tone and spoken words?", "我走上前，轻声问：“你还好吗？”", "我说：“你还好吗？”", "我走上前看着他。", "“你还好吗？”", "检查句子有没有三个部分。 / Check for all three parts.", "走上前是动作，轻声是语气，引号内是说话内容。 / It contains an action, a tone and the spoken words."],
    ["加入动作和语气有什么作用？", "What is the purpose of adding action and tone?", "让人物的态度和心情更清楚", "让所有对话变得更大声", "让句子不需要标点", "让人物说更多无关的话", "想一想读者能从动作和语气知道什么。 / Think about what action and tone reveal.", "动作和语气让人物形象更具体，情感也更清楚。 / They make the character and emotion clearer."],
  ],
  [
    ["哪一组关联词表示转折？", "Which pair of connectors shows contrast?", "虽然……但是……", "因为……所以……", "只要……就……", "不但……而且……", "前半句有困难，后半句出现不同结果。 / The first clause gives a difficulty; the second gives a contrasting result.", "‘虽然……但是……’连接困难和相反或出乎意料的结果。 / This pair links a difficulty to a contrasting result."],
    ["‘虽然’后面通常写什么？", "What usually comes after ‘虽然’?", "遇到的困难或情况", "最后得到的奖品", "人物说话的语气", "完整的对话标点", "先交代需要转折的情况。 / First state the situation that creates the contrast.", "‘虽然’后的分句先说明困难或情况。 / The clause after ‘虽然’ states the difficulty or situation."],
    ["‘但是’后面通常写什么？", "What usually comes after ‘但是’?", "与前面形成转折的结果", "完全重复前面的困难", "事情发生的日期", "人物的姓名而已", "后半句要说明即使有困难，结果仍怎样。 / Show what happened despite the difficulty.", "‘但是’后的分句写转折后的行动或结果。 / The clause after ‘但是’ gives the contrasting action or result."],
    ["哪一句使用关联词最正确？", "Which sentence uses the connector pair correctly?", "虽然天气炎热，但是大家仍然认真练习。", "虽然天气炎热，所以大家仍然认真练习。", "但是天气炎热，虽然大家认真练习。", "虽然但是天气炎热，大家认真练习。", "检查两个关联词是否成双，而且位置正确。 / Check that both connectors are paired and correctly placed.", "‘虽然’带出困难，‘但是’带出仍然坚持的结果。 / The pair correctly links the heat to continued practice."],
    ["填入最合适的关联词：虽然题目很难，___我没有放弃。", "Choose the best connector: Although the question was difficult, ___ I did not give up.", "但是", "所以", "因为", "而且", "‘虽然’通常和哪个词成双？ / Which word normally pairs with ‘虽然’?", "‘虽然’和‘但是’配成一组，表示转折。 / ‘虽然’ pairs with ‘但是’ to show contrast."],
  ],
  [
    ["‘把’字句里，谁通常放在‘把’前面？", "In a 把 sentence, what usually comes before 把?", "做动作的人物", "被处理的东西", "事情发生的结果", "句末的标点", "先找是谁在做动作。 / First identify who performs the action.", "做动作的人物通常放在‘把’前面。 / The person doing the action normally comes before 把."],
    ["‘把’后面通常接什么？", "What usually comes after 把?", "被处理的东西", "做动作的人物", "事情发生的时间", "说话的语气", "想一想什么东西受到动作影响。 / Find the object affected by the action.", "‘把’后面接被处理或受到影响的对象。 / 把 is followed by the object being affected."],
    ["对象后面要写什么，句意才完整？", "What should follow the object to complete the meaning?", "对它做了什么或结果怎样", "另一个没有关系的人物", "英文逐字翻译", "只有一个逗号", "说明对象最后怎样了。 / State what was done to the object.", "动作或结果说明对象受到怎样的处理。 / The action or result tells what happened to the object."],
    ["哪一句的‘把’字句语序正确？", "Which 把 sentence has the correct word order?", "我把作业本整齐地放进书包里。", "把我作业本整齐地放进书包里。", "我作业本把整齐地放进书包里。", "我放进书包里把作业本整齐地。", "使用‘谁＋把＋什么＋怎么样’。 / Use Who + 把 + Object + Result.", "‘我＋把＋作业本＋放进书包’的顺序清楚完整。 / It follows Who + 把 + Object + What was done."],
    ["哪一句最清楚地说明整理书桌的结果？", "Which sentence most clearly shows the result of tidying the desk?", "我把散乱的文具收进抽屉里。", "我把文具。", "把散乱的文具我。", "我散乱的文具收进把抽屉。", "句子要说明人物、对象和完成的动作。 / Include the person, object and completed action.", "这句话清楚说明谁把什么收到了哪里。 / It clearly states who put which objects where."],
  ],
  [
    ["小段落的开头可以先写什么？", "What can come first in a short paragraph?", "事情发生的时间", "最后的感想", "事情的结局", "与主题无关的资料", "先让读者知道事情何时开始。 / First tell the reader when the event began.", "时间能清楚带出事情的开端。 / A time phrase gives the event a clear beginning."],
    ["写完时间后，接下来可以写什么？", "What can be written after the time?", "发现了什么问题", "立刻写最后的道理", "重复相同的时间", "换成另一个无关故事", "先发现问题，才会采取行动。 / A problem must be noticed before action is taken.", "发现问题能自然带出人物接下来的行动。 / Noticing the problem leads naturally to the action."],
    ["发现别人需要帮助后，下一步写什么？", "What comes after noticing someone needs help?", "自己采取的行动", "另一个无关地点", "重新介绍人物姓名", "重复发现的问题三次", "写人物怎样回应眼前的问题。 / Show how the character responds.", "采取行动能推动事情发展。 / The action moves the event forward."],
    ["帮助对方以后，可以怎样表现关心？", "How can care be shown after helping?", "询问对方有没有受伤", "马上跑走不理会", "只描写天气", "重复写下课时间", "想一想还可以对对方说什么。 / Think about what you can ask the person.", "询问对方的情况能表现体贴和关心。 / Asking about the person shows care and concern."],
    ["哪一个顺序最适合这周的小段落？", "Which order best suits this week’s short paragraph?", "时间＋发现问题＋采取行动＋关心对方", "关心对方＋结果＋时间＋发现问题", "采取行动＋时间＋无关资料＋发现问题", "结果＋结果＋时间＋时间", "事情应从开端自然发展到行动和关心。 / Move from the beginning to action and care.", "这个顺序让小段落发展自然、内容完整。 / This order makes the paragraph logical and complete."],
  ],
  [
    ["怎样把‘扔球向小明’改得最自然？", "What is the most natural correction for ‘扔球向小明’?", "把球扔向小明", "把向小明球扔", "扔向球小明", "球向扔小明", "‘把’后先放物品，再写动作和目标。 / After 把, place the object before the action and target.", "‘把球扔向小明’符合把字句的正确顺序。 / It follows the correct 把 sentence order."],
    ["球碰到人的头，哪个动词最合适？", "Which verb best describes a ball hitting someone’s head?", "砸中", "扎到", "喝到", "听到", "球不是尖锐的东西。 / A ball is not a sharp object.", "球可以‘砸中’或‘打中’目标；‘扎到’通常用于尖锐物品。 / A ball can 砸中 or 打中 a target; 扎到 is normally used for something sharp."],
    ["哪一句把方向和目标写清楚？", "Which sentence clearly shows the direction and target?", "弟弟把球踢向球门。", "弟弟踢球门向球。", "向弟弟球门踢把球。", "球门弟弟把向踢。", "找出‘人物＋把球＋踢向哪里’。 / Find Who + 把 ball + kicked towards where.", "这句话清楚交代人物、物品、动作和目标。 / It clearly gives the person, object, action and target."],
    ["怎样自然地连接意外结果？", "How can an unexpected result be linked naturally?", "没想到球竟然砸中了小明的头。", "所以没想到球小明头。", "球竟然因为小明。", "小明的头向球没想到。", "用‘没想到’带出出乎意料的结果。 / Use 没想到 to introduce an unexpected result.", "‘没想到……’能自然地连接动作和意外结果。 / 没想到 naturally links the action to the unexpected result."],
    ["哪一句最完整、最通顺？", "Which sentence is the most complete and fluent?", "小华把球扔向小明，没想到球砸中了小明的头。", "小华扔球向小明，扎到他的头。", "球小华向小明扔，头砸中。", "小明的头扔向小华的球。", "检查方向、动词和结果是否都正确。 / Check the direction, verb and result.", "正确句子使用‘把球扔向’，并用‘砸中’说明结果。 / The correct sentence uses 把球扔向 and 砸中 for the result."],
  ],
  [
    ["哪一句的‘向’位置正确？", "Which sentence places 向 correctly?", "我快步向老师走去。", "我快步老师走去向。", "向我快步走去老师。", "我向走去快步老师。", "‘向＋目标’通常放在主要动作前。 / 向 + target usually comes before the main action.", "‘向老师’放在动作‘走去’前，语序自然。 / 向老师 comes before 走去."],
    ["‘朝校门跑去’中的‘朝校门’表示什么？", "What does 朝校门 show in the phrase 朝校门跑去?", "动作的方向", "事情的时间", "人物的心情", "动作的结果", "想一想人物朝哪里跑。 / Think about where the person is running towards.", "‘朝校门’说明跑动的方向和目标。 / It shows the direction and target of the action."],
    ["哪一句表示小狗跑向主人？", "Which sentence means the dog ran towards its owner?", "小狗兴奋地朝主人奔去。", "小狗主人奔去朝兴奋。", "主人朝小狗兴奋奔去。", "小狗奔去主人兴奋地朝。", "使用‘人物／动物＋朝＋目标＋动作’。 / Use subject + 朝 + target + action.", "‘朝主人奔去’清楚写出方向和动作。 / 朝主人奔去 clearly shows direction and action."],
    ["要写‘walk towards the teacher’，哪一个最自然？", "Which is the most natural Chinese for ‘walk towards the teacher’?", "向老师走去", "走去老师向", "老师走向去", "走老师去向", "中文通常先写方向目标，再写动作。 / Chinese normally places the directional target before the action.", "‘向老师＋走去’是自然的中文顺序。 / 向老师 + 走去 is the natural order."],
    ["哪一句同时写出原因、人物、方向和动作？", "Which sentence includes cause, person, direction and action?", "看见校门快关了，我连忙朝校门跑去。", "我跑去，校门朝看见快关了。", "朝校门我看见，快关跑去。", "校门跑去，我连忙看见朝。", "先交代原因，再写人物向哪里做什么。 / Give the cause, then who moved towards where.", "这句话按‘原因＋人物＋方向＋动作’排列。 / It follows Cause + Who + Direction + Action."],
  ],
  [
    ["篮球碰到肩膀，应该用哪个词？", "Which word should be used when a basketball hits a shoulder?", "砸中", "扎到", "淋湿", "摔破", "根据篮球的动作选择动词。 / Choose a verb that matches the basketball’s action.", "篮球可以‘砸中’肩膀。 / A basketball can 砸中 a shoulder."],
    ["尖刺碰到手指，应该用哪个词？", "Which word should be used when a thorn pricks a finger?", "扎到", "砸中", "淋湿", "打翻", "尖锐的东西通常怎样伤到手？ / What verb is used for something sharp?", "尖刺或针会‘扎到’手指。 / A thorn or needle can 扎到 a finger."],
    ["雨水使衣服变湿，应该用哪个词？", "Which word describes rain making clothes wet?", "淋湿", "砸中", "扎到", "撞倒", "找出和雨水最常搭配的动词。 / Find the verb commonly paired with rain.", "雨水会‘淋湿’衣服。 / Rain can 淋湿 clothes."],
    ["不小心碰倒水杯，应该怎样写？", "How should knocking over a cup accidentally be written?", "不小心打翻了水杯", "不小心扎到了水杯", "不小心淋湿了水杯", "不小心听到了水杯", "水杯倒下并洒出水时用什么动词？ / Which verb describes a cup being knocked over?", "‘打翻水杯’是常见而准确的搭配。 / 打翻水杯 is a common and accurate collocation."],
    ["为什么不能把所有英文‘hit’都翻成同一个中文词？", "Why can’t every English ‘hit’ use the same Chinese verb?", "中文动词要配合物品和动作方式", "中文没有不同的动词", "每个句子都只能用‘打’", "动词放在哪里都一样", "比较球、尖刺、雨水和水杯。 / Compare a ball, thorn, rain and cup.", "中文会根据物品和动作选择‘砸中、扎到、淋湿、打翻’等不同动词。 / Chinese selects different verbs according to the object and action."],
  ],
  [
    ["‘打翻了水杯’中的‘翻’说明什么？", "What does 翻 show in 打翻了水杯?", "动作造成的结果", "事情发生的地点", "人物的姓名", "说话的语气", "水杯经过动作后变成怎样？ / What happened to the cup after the action?", "‘翻’说明水杯被碰倒的结果。 / 翻 shows the result of the action."],
    ["哪一句清楚写出作业的结果？", "Which sentence clearly states what happened to the homework?", "水把桌上的作业弄湿了。", "水和作业在桌上。", "作业水桌上弄。", "桌上的作业有水。", "找出‘作业最后变成怎样’。 / Find what the homework became like.", "‘弄湿了’清楚说明作业受到的影响。 / 弄湿了 clearly states the result."],
    ["盘子掉到地上后破了，哪个结果词最合适？", "Which result word best describes a plate breaking after it falls?", "摔破了", "淋湿了", "吓跑了", "扶起了", "选择能说明盘子破掉的词。 / Choose the word showing that the plate broke.", "‘摔破了’同时写出动作和破掉的结果。 / 摔破了 gives both the action and result."],
    ["哪一句使用‘弄脏’最正确？", "Which sentence uses 弄脏 correctly?", "妹妹踩进泥坑，把新鞋弄脏了。", "妹妹把泥坑听脏了。", "新鞋把妹妹弄进泥坑。", "泥坑妹妹新鞋弄脏把。", "谁的什么东西最后变脏了？ / Whose object became dirty?", "妹妹的鞋受到影响，所以用‘把新鞋弄脏了’。 / The shoes were affected, so 把新鞋弄脏了 is correct."],
    ["哪一句既有动作，也有清楚结果？", "Which sentence contains both an action and a clear result?", "弟弟打翻水杯，把作业弄湿了。", "弟弟、水杯和作业。", "弟弟做了一件事情。", "水杯在桌上，作业也在桌上。", "找出两个完成的动作结果。 / Find two completed action results.", "‘打翻’和‘弄湿’让读者知道两个动作的结果。 / 打翻 and 弄湿 clearly show both results."],
  ],
  [
    ["哪一句的‘他’最容易让人不清楚指谁？", "In which sentence is 他 unclear?", "小杰看见伟明拿着很多书，他便过去帮他。", "小杰拿着自己的书。", "伟明把书放在桌上。", "老师请小杰坐下。", "找出一句同时出现两个人和两个‘他’。 / Find the sentence with two people and two uses of 他.", "句中有小杰和伟明，两个‘他’可能让读者混淆。 / With two boys in the sentence, both uses of 他 may confuse the reader."],
    ["怎样把人物写得最清楚？", "How can the characters be made clearest?", "小杰看见伟明拿着很多书，便过去帮伟明拿了几本。", "小杰看见伟明，他帮他。", "他看见他，所以他帮他。", "伟明小杰书他几本。", "在关键动作处重复人物名字。 / Repeat the person’s name at the key action.", "重复‘伟明’后，谁帮助谁就很清楚。 / Repeating 伟明 makes it clear who helped whom."],
    ["‘小明看见志强跌倒，便跑过去扶起志强’中，谁跌倒了？", "Who fell in this sentence?", "志强", "小明", "两个人都跌倒", "句子没有说明", "看‘跌倒’紧跟在哪个人物后面。 / See which name is immediately followed by 跌倒.", "‘志强跌倒’清楚说明跌倒的人是志强。 / 志强跌倒 clearly identifies Zhijiang."],
    ["哪一句清楚说明妹妹听了妈妈的提醒？", "Which sentence clearly shows that the sister followed Mum’s reminder?", "妈妈提醒妹妹带伞，妹妹立刻把雨伞放进书包。", "妈妈提醒妹妹带伞，她把它放了。", "她提醒她，她放进它。", "妹妹妈妈雨伞她书包。", "第二个动作前重新写出人物。 / Name the person again before the second action.", "第二次写‘妹妹’，读者就知道是谁把伞放进书包。 / Naming 妹妹 again makes the action clear."],
    ["什么时候可以使用‘他／她’？", "When can 他 or 她 be used clearly?", "读者能确定代词指的是谁时", "句中出现很多人物时随便使用", "不想写人物名字时全部使用", "每句话开头都必须使用", "代词的对象必须明确。 / The pronoun’s referent must be clear.", "只有当读者能确定所指人物时，代词才不会造成混淆。 / Use a pronoun only when the reader can identify the person clearly."],
  ],
  [
    ["哪一组关联词表示原因和结果？", "Which connector pair shows cause and result?", "因为……所以……", "虽然……但是……", "不但……而且……", "一边……一边……", "前半句说明原因，后半句说明结果。 / The first clause gives a cause and the second gives a result.", "‘因为……所以……’连接原因和结果。 / 因为…所以… links a cause to its result."],
    ["填入最合适的词：___地面湿滑，小文不小心滑倒了。", "Choose the best word: ___ the ground was slippery, Xiaowen slipped.", "由于", "幸好", "但是", "而且", "句子开头要带出原因。 / The beginning should introduce a cause.", "‘由于’可以放在原因前面。 / 由于 can introduce the cause."],
    ["哪个词最适合带出意外结果？", "Which phrase best introduces an unexpected result?", "没想到", "因为", "一边", "不但", "结果和原先预料的不一样。 / The result differs from what was expected.", "‘没想到’表示结果出乎意料。 / 没想到 introduces an unexpected result."],
    ["哪个词表示事情出现了好转？", "Which word shows that the situation turned out better?", "幸好", "由于", "因此", "首先", "后来有人及时提供帮助。 / Someone helped in time afterward.", "‘幸好’带出令人放心的转折。 / 幸好 introduces a fortunate turn."],
    ["哪一句的原因和结果连接正确？", "Which sentence links cause and result correctly?", "因为我没有看清路面，所以不小心踩进了水坑。", "因为我没有看清路面，但是踩进水坑所以。", "所以没有看清，因为我路面水坑。", "我水坑因为踩进所以路面。", "检查‘因为’和‘所以’后的内容。 / Check the clauses after 因为 and 所以.", "原因是没有看清路面，结果是踩进水坑，连接自然。 / Not seeing the ground is the cause; stepping into the puddle is the result."],
  ],
  [
    ["怎样改正‘我跑很快向弟弟’？", "How should ‘我跑很快向弟弟’ be corrected?", "我连忙向弟弟跑去。", "我跑弟弟很快向。", "向我弟弟跑很快。", "弟弟跑向我很快。", "方向目标要放在主要动作前。 / Place the directional target before the main action.", "‘连忙＋向弟弟＋跑去’的顺序自然。 / 连忙 + 向弟弟 + 跑去 is natural."],
    ["哪一个动词和‘球碰到肩膀’搭配正确？", "Which verb correctly matches a ball hitting a shoulder?", "砸中肩膀", "扎到肩膀", "淋湿肩膀", "摔破肩膀", "回想不同物品要使用不同动词。 / Recall that different objects require different verbs.", "球可以‘砸中’或‘打中’肩膀。 / A ball can 砸中 or 打中 a shoulder."],
    ["哪一句同时有正确方向和清楚结果？", "Which sentence has correct direction and a clear result?", "小文把球踢向墙壁，球反弹回来打翻了水瓶。", "小文踢球墙壁向，水瓶扎到。", "墙壁把球小文踢，水瓶反弹。", "球向小文墙壁，打翻回来。", "先检查‘把球踢向’，再检查结果动词。 / Check 把球踢向 first, then the result verb.", "方向用‘踢向’，结果用‘打翻’，两部分都清楚。 / 踢向 shows direction and 打翻 shows the result."],
    ["哪一句的人物最清楚？", "Which sentence makes the characters clearest?", "小华闯了祸，便马上向同学道歉。", "小华告诉同学，他闯祸后他向他道歉。", "他看见他，所以他找他。", "同学小华他道歉他。", "检查每个动作是谁做的。 / Check who performs each action.", "句子清楚说明闯祸和道歉的人都是小华。 / It clearly shows that Xiaohua caused the problem and apologised."],
    ["哪一句最适合作为第二周总结范句？", "Which sentence best summarises Week 2 skills?", "下课时，小华把球扔向同学，没想到球砸中了对方的肩膀，他立刻上前道歉。", "下课小华扔球向同学，扎到他肩膀道歉。", "球同学向小华扔，肩膀没想到。", "小华下课肩膀球向同学。", "检查时间、方向、动词、结果和回应。 / Check time, direction, verb, result and response.", "这句话把第二周的五个重点连成完整、通顺的句子。 / It combines the five Week 2 skills into one clear sentence."],
  ],
];

const ROLE_POOL = [
  "时间 When", "人物 Who", "地点 Where", "动作 Action", "原因 Cause", "反应 Reaction",
  "语气 Tone", "转折词 Connector", "对象 Object", "结果 Result", "发现 Notice", "关心 Care",
];

function createQuestion(
  dayIndex: number,
  questionIndex: number,
  question: string,
  questionEn: string,
  correct: string,
  wrongAnswers: string[],
  hint: string,
  explanation: string,
): QuizQuestion {
  const base = [correct, ...wrongAnswers];
  const shift = (dayIndex + questionIndex) % 4;
  const ordered = [...base.slice(shift), ...base.slice(0, shift)];
  const correctIndex = ordered.indexOf(correct);

  return {
    id: `day-${dayIndex + 1}-question-${questionIndex + 1}`,
    question,
    questionEn,
    hint,
    correctIndex,
    options: ordered.map((text, index) => ({
      text,
      feedback: index === correctIndex
        ? explanation
        : "这个选项不符合今天的句型或句意。再看提示，然后比较句子的顺序。 / This choice does not match today’s pattern or meaning. Review the hint and compare the word order.",
    })),
  };
}

function punctuationOptions(sentence: string): string[] {
  return [
    sentence.replace(/[，。？！：“”]/g, ""),
    sentence.replace(/，/g, "。"),
    sentence.replace(/[。？！”]+$/, ""),
  ];
}

export function getDailyQuiz(dayIndex: number): QuizQuestion[] {
  const lesson = LESSONS[dayIndex];
  const otherLessons = LESSONS.filter((_, index) => index !== dayIndex);
  const correctOrder = lesson.chunks.join("");
  const orderDistractors = [
    [lesson.chunks[1], lesson.chunks[0], lesson.chunks[2], lesson.chunks[3]].join(""),
    [lesson.chunks[0], lesson.chunks[2], lesson.chunks[1], lesson.chunks[3]].join(""),
    [lesson.chunks[3], lesson.chunks[0], lesson.chunks[1], lesson.chunks[2]].join(""),
  ];
  const correctRole = `${lesson.labels[0]} ${lesson.labelsEn[0]}`;
  const roleDistractors = ROLE_POOL.filter((role) => role !== correctRole).slice(0, 3);

  const common = [
    createQuestion(dayIndex, 0, "今天的学习重点是什么？", "What is today’s learning focus?", lesson.focus, otherLessons.slice(0, 3).map((item) => item.focus), "回想今日任务蓝色卡片上的学习重点。 / Recall the focus shown on today’s mission card.", `${lesson.focus}是今天练习的重点。 / This is the focus of today’s lesson.`),
    createQuestion(dayIndex, 1, `“${lesson.focus}”的英文意思是什么？`, `What does “${lesson.focus}” mean in English?`, lesson.focusEn, otherLessons.slice(0, 3).map((item) => item.focusEn), "比较每个英文选项的先后顺序和意思。 / Compare the order and meaning in each English option.", `${lesson.focusEn}准确说明了今天的中文句型。 / This accurately explains today’s Chinese pattern.`),
    createQuestion(dayIndex, 2, "哪一个是今天的句型骨架？", "Which is today’s sentence pattern?", lesson.pattern, otherLessons.slice(0, 3).map((item) => item.pattern), "句型骨架说明每一部分应该怎样排列。 / The pattern shows how each sentence part is arranged.", `${lesson.pattern}是今天拆句时使用的骨架。 / This is the structure used in today’s lesson.`),
    createQuestion(dayIndex, 3, "哪一句的顺序和今天的范句相同？", "Which sentence follows today’s model sentence order?", correctOrder, orderDistractors, "先找第一部分，再按事情发展的顺序连接。 / Find the first part, then connect the rest logically.", "这个顺序与范句一致，读起来完整通顺。 / This order matches the model sentence and reads naturally."),
    createQuestion(dayIndex, 4, `“${lesson.chunks[0]}”在范句中负责什么？`, `What is the role of “${lesson.chunks[0]}” in the model sentence?`, correctRole, roleDistractors, "看看拆句卡片给这一部分的标签。 / Check the label used for this chunk in Step 2.", `${lesson.chunks[0]}在句中属于${lesson.labels[0]}。 / This chunk functions as ${lesson.labelsEn[0]} in the sentence.`),
  ];

  const punctuation = createQuestion(dayIndex, 5, "哪一句的标点最正确？", "Which sentence uses punctuation correctly?", lesson.sentence, punctuationOptions(lesson.sentence), "检查逗号、句号、问号和引号是否放在正确位置。 / Check commas, full stops, question marks and quotation marks.", "这句话的标点完整，并能帮助读者看清句子的结构。 / The punctuation is complete and makes the sentence structure clear.");

  const custom = CUSTOM_QUIZZES[dayIndex].map((item, index) => createQuestion(
    dayIndex,
    index + 6,
    item[0],
    item[1],
    item[2],
    [item[3], item[4], item[5]],
    item[6],
    item[7],
  ));

  return [...common.slice(1), punctuation, ...custom];
}
