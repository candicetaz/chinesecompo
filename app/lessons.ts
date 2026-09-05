export type Lesson = {
  day: string;
  title: string;
  focus: string;
  focusEn: string;
  sentence: string;
  chunks: string[];
  mixed: number[];
  labels: string[];
  labelsEn: string[];
  pattern: string;
  patternEn: string;
  patternKeys: string[];
  prompt: string;
  variations: string[];
};

export const LESSONS: Lesson[] = [
  {
    day: "一", title: "时间放前面", focus: "时间＋人物＋事情", focusEn: "When + Who + What happened",
    sentence: "放学后，我和同学一起到图书馆温习功课。",
    chunks: ["放学后，", "我和同学", "一起到图书馆", "温习功课。"], mixed: [2, 0, 3, 1],
    labels: ["时间", "人物", "地点", "动作"], labelsEn: ["When", "Who", "Where", "Action"],
    pattern: "什么时候＋谁＋在哪里＋做什么", patternEn: "When + Who + Where + What action", patternKeys: ["，", "。"],
    prompt: "写一句话，说说你星期六早上去了哪里、做了什么。",
    variations: ["星期六早上，我和爸爸到公园里骑脚踏车。", "午休时，我和好友在食堂里一起吃午餐。", "晚饭后，我在房间里认真地复习生字。"],
  },
  {
    day: "二", title: "动作排好队", focus: "动作按照发生顺序写", focusEn: "Put actions in the order they happened",
    sentence: "我连忙跑过去，弯下腰，把散落在地上的书一本一本捡起来。",
    chunks: ["我连忙跑过去，", "弯下腰，", "把散落在地上的书", "一本一本捡起来。"], mixed: [3, 1, 0, 2],
    labels: ["走近", "弯腰", "对象", "完成"], labelsEn: ["Go closer", "Bend down", "Object", "Finish"],
    pattern: "先走近＋再弯腰＋最后完成事情", patternEn: "First approach + Then bend down + Finally complete the action", patternKeys: ["，", "。"],
    prompt: "看到地上有一个钱包，你会怎样做？用三个连续动作来写。",
    variations: ["我快步走上前，伸出双手，小心翼翼地扶起老奶奶。", "他蹲下身子，拾起水瓶，顺手把它放进回收箱。", "妹妹打开书包，拿出作业本，认真地检查答案。"],
  },
  {
    day: "三", title: "不只写‘很紧张’", focus: "用反应表现心情", focusEn: "Show feelings through reactions",
    sentence: "看到眼前的一幕，我顿时愣住了，一时不知该怎么办。",
    chunks: ["看到眼前的一幕，", "我顿时愣住了，", "一时", "不知该怎么办。"], mixed: [1, 3, 0, 2],
    labels: ["原因", "反应", "时间", "想法"], labelsEn: ["Cause", "Reaction", "Timing", "Thought"],
    pattern: "发生什么＋身体反应＋心里的想法", patternEn: "What happened + Physical reaction + Inner thought", patternKeys: ["，", "。"],
    prompt: "你发现重要的东西不见了。不要只写‘我很着急’，写出你的反应。",
    variations: ["听到这个消息，我的心猛地一沉，急得手心直冒汗。", "轮到我上台时，我深吸一口气，努力让自己镇定下来。", "看到满分的考卷，我眼前一亮，脸上露出了灿烂的笑容。"],
  },
  {
    day: "四", title: "对话有动作", focus: "说话前加动作和语气", focusEn: "Add an action and tone before dialogue",
    sentence: "我走上前，轻声问道：“你需要帮忙吗？”",
    chunks: ["我走上前，", "轻声问道：", "“你需要", "帮忙吗？”"], mixed: [2, 0, 3, 1],
    labels: ["动作", "语气", "内容", "内容"], labelsEn: ["Action", "Tone", "Words", "Words"],
    pattern: "人物动作＋说话语气＋说话内容", patternEn: "Character's action + Tone + Spoken words", patternKeys: ["：“", "？”"],
    prompt: "同学看起来不开心。写一句你上前关心他的对话。",
    variations: ["老师皱了皱眉，严肃地说：“走廊上不可以奔跑。”", "妈妈摸摸我的头，温柔地说：“别担心，我们一起想办法。”", "我指着前方，兴奋地喊道：“快看，我们终于到了！”"],
  },
  {
    day: "五", title: "关联词要成双", focus: "虽然……但是……", focusEn: "Although ... but ...",
    sentence: "虽然雨越下越大，但是大家仍然耐心地等候。",
    chunks: ["虽然", "雨越下越大，", "但是大家", "仍然耐心地等候。"], mixed: [3, 1, 0, 2],
    labels: ["转折词", "困难", "转折词", "结果"], labelsEn: ["Connector", "Difficulty", "Connector", "Result"],
    pattern: "虽然＋遇到的困难＋但是＋仍然做什么", patternEn: "Although + Difficulty + But + What continued", patternKeys: ["虽然", "但是"],
    prompt: "用‘虽然……但是……’写一句坚持完成事情的句子。",
    variations: ["虽然题目很有挑战性，但是我没有轻易放弃。", "虽然弟弟做错了事，但是他愿意诚恳地道歉。", "虽然天气十分炎热，但是同学们仍然认真地练习。"],
  },
  {
    day: "六", title: "把字句更清楚", focus: "谁＋把＋什么＋怎么样", focusEn: "Who + 把 + Object + What was done",
    sentence: "我把地上的塑料瓶捡起来，放进蓝色的回收箱里。",
    chunks: ["我", "把地上的塑料瓶", "捡起来，", "放进蓝色的回收箱里。"], mixed: [1, 3, 0, 2],
    labels: ["人物", "对象", "动作一", "动作二"], labelsEn: ["Who", "Object", "Action 1", "Action 2"],
    pattern: "谁＋把＋什么东西＋做了什么", patternEn: "Who + 把 + Object + What was done", patternKeys: ["把", "。"],
    prompt: "写一句使用‘把’的句子，说明你怎样整理书桌。",
    variations: ["我把散乱的文具收好，整齐地放进抽屉里。", "姐姐把刚洗好的衣服晾在阳台上。", "值日生把白板擦得干干净净。"],
  },
  {
    day: "日", title: "本周小挑战", focus: "把三种句型连成小段落", focusEn: "Join three sentence patterns into a short paragraph",
    sentence: "下课后，我看见同学跌倒，便连忙跑过去扶他，并轻声问他有没有受伤。",
    chunks: ["下课后，", "我看见同学跌倒，", "便连忙跑过去扶他，", "并轻声问他有没有受伤。"], mixed: [2, 0, 3, 1],
    labels: ["时间", "发现", "行动", "关心"], labelsEn: ["When", "Notice", "Action", "Care"],
    pattern: "时间＋发现问题＋采取行动＋关心对方", patternEn: "When + Notice a problem + Take action + Show care", patternKeys: ["，", "。"],
    prompt: "用三至四句话写一个小段落：你看见别人需要帮助，并主动上前帮忙。",
    variations: ["我先说明发生了什么，再写自己怎样帮助对方，最后写事情的结果。", "每句话只表达一个主要意思，读起来会更清楚。", "写完后慢慢读一遍，就能发现遗漏或重复的词语。"],
  },
  {
    day: "八", title: "方向和目标放对位置", focus: "人物＋把物品＋动作＋目标＋结果", focusEn: "Who + 把 + Object + Action towards target + Result",
    sentence: "小华把球扔向小明，没想到球竟然砸中了小明的头。",
    chunks: ["小华", "把球扔向小明，", "没想到球", "竟然砸中了小明的头。"], mixed: [2, 0, 3, 1],
    labels: ["人物", "方向动作", "意外转折", "结果"], labelsEn: ["Who", "Directed action", "Unexpected turn", "Result"],
    pattern: "谁＋把什么＋动词＋向谁／哪里＋结果", patternEn: "Who + 把 + Object + Verb towards whom/where + Result", patternKeys: ["把", "向", "。"],
    prompt: "改写成通顺句子：‘小文扔纸飞机向窗口，飞到外面。’",
    variations: ["小文把纸飞机扔向窗口，纸飞机一下子飞到了外面。", "弟弟把皮球踢向球门，皮球准确地滚进了网里。", "姐姐把空瓶子抛进回收箱，瓶子稳稳地落在里面。"],
  },
  {
    day: "九", title: "向、朝要放在动作前", focus: "人物＋向／朝＋目标＋动作", focusEn: "Who + Towards + Target + Action",
    sentence: "看见校门快关了，我连忙朝校门跑去。",
    chunks: ["看见校门快关了，", "我", "连忙朝校门", "跑去。"], mixed: [1, 3, 0, 2],
    labels: ["原因", "人物", "方向", "动作"], labelsEn: ["Cause", "Who", "Direction", "Action"],
    pattern: "发生什么＋谁＋怎样＋向／朝哪里＋做什么", patternEn: "What happened + Who + How + Towards where + Action", patternKeys: ["朝", "。"],
    prompt: "用‘向’或‘朝’写一句话：你看见老师后，走过去请教问题。",
    variations: ["我拿着作业本，快步向老师走去。", "小狗一看见主人，便兴奋地朝他奔去。", "听见有人呼救，我们立刻向声音传来的方向跑去。"],
  },
  {
    day: "十", title: "动词要和东西配对", focus: "根据人物或物品选择正确动词", focusEn: "Choose a verb that matches the person or object",
    sentence: "篮球突然弹了起来，不偏不倚地砸中了我的肩膀。",
    chunks: ["篮球", "突然弹了起来，", "不偏不倚地", "砸中了我的肩膀。"], mixed: [3, 1, 0, 2],
    labels: ["物品", "动作", "方式", "结果"], labelsEn: ["Object", "Action", "How", "Result"],
    pattern: "什么东西＋怎样移动＋怎样＋造成什么结果", patternEn: "What object + How it moved + How + Result", patternKeys: ["砸中", "。"],
    prompt: "选择合适的动词完成句子：雨水＿＿衣服；尖刺＿＿手指；球＿＿肩膀。",
    variations: ["突如其来的大雨淋湿了我们的衣服。", "我拿花盆时不小心被尖刺扎到了手指。", "弟弟失手打翻水杯，水洒了一地。"],
  },
  {
    day: "十一", title: "写清楚动作的结果", focus: "动作＋结果补语", focusEn: "Action + Result complement",
    sentence: "弟弟一不小心打翻了水杯，把桌上的作业弄湿了。",
    chunks: ["弟弟一不小心", "打翻了水杯，", "把桌上的作业", "弄湿了。"], mixed: [2, 0, 3, 1],
    labels: ["人物和原因", "动作", "对象", "结果"], labelsEn: ["Who and cause", "Action", "Object", "Result"],
    pattern: "谁＋做了什么＋把什么＋弄成怎样", patternEn: "Who + Did what + 把 + Object + Result", patternKeys: ["把", "了", "。"],
    prompt: "用‘摔破、撞倒、弄脏、吓跑’中的一个词写清楚动作的结果。",
    variations: ["我没有拿稳盘子，一失手把它摔破了。", "小猫突然跳出来，把树上的小鸟吓跑了。", "妹妹踩进泥坑里，把新鞋弄脏了。"],
  },
  {
    day: "十二", title: "人物不要写乱", focus: "人物名字＋动作＋清楚的代词", focusEn: "Names + Actions + Clear pronouns",
    sentence: "小明看见志强跌倒，便连忙跑过去，把志强扶了起来。",
    chunks: ["小明看见志强跌倒，", "便连忙跑过去，", "把志强", "扶了起来。"], mixed: [1, 3, 0, 2],
    labels: ["两个人物", "行动", "帮助对象", "结果"], labelsEn: ["Two characters", "Action", "Person helped", "Result"],
    pattern: "人物甲＋看见人物乙怎样＋人物甲的行动＋人物乙的结果", patternEn: "Person A + Sees Person B + A's action + B's result", patternKeys: ["志强", "。"],
    prompt: "改写句子，让‘他’指的是谁更清楚：‘小杰看见伟明拿着很多书，他便过去帮他。’",
    variations: ["小杰看见伟明拿着很多书，便走过去帮伟明拿了几本。", "妈妈提醒妹妹带雨伞，妹妹听后立刻把雨伞放进书包。", "老师请小文帮助志强，小文马上走到志强身边。"],
  },
  {
    day: "十三", title: "原因和结果要连起来", focus: "原因＋连接词＋结果", focusEn: "Cause + Connector + Result",
    sentence: "由于地面湿滑，小文一不留神摔了一跤，幸好同学及时扶住了他。",
    chunks: ["由于地面湿滑，", "小文一不留神摔了一跤，", "幸好同学", "及时扶住了他。"], mixed: [2, 0, 3, 1],
    labels: ["原因", "事情", "转折", "结果"], labelsEn: ["Cause", "Event", "Turn", "Result"],
    pattern: "由于／因为＋原因＋发生什么＋结果／转折", patternEn: "Because + Cause + What happened + Result/turn", patternKeys: ["由于", "幸好"],
    prompt: "用‘因为……所以……’或‘没想到……’写一句有原因和结果的句子。",
    variations: ["因为我没有看清路面，所以不小心踩进了水坑。", "我以为书包里有雨伞，没想到早上忘了放进去。", "由于大家齐心协力，我们很快就把课室整理好了。"],
  },
  {
    day: "十四", title: "句子小医生", focus: "找错＋重排＋换动词＋写清结果", focusEn: "Find the error + Reorder + Replace the verb + Clarify the result",
    sentence: "下课时，小华把球扔向同学，没想到球砸中了对方的肩膀，他立刻上前道歉。",
    chunks: ["下课时，", "小华把球扔向同学，", "没想到球砸中了对方的肩膀，", "他立刻上前道歉。"], mixed: [3, 1, 0, 2],
    labels: ["时间", "方向动作", "意外结果", "回应"], labelsEn: ["When", "Directed action", "Unexpected result", "Response"],
    pattern: "时间＋正确语序＋合适动词＋清楚结果和回应", patternEn: "When + Correct order + Suitable verb + Clear result and response", patternKeys: ["把", "没想到", "。"],
    prompt: "当句子小医生，改正：‘我跑很快向弟弟，因为下雨跌倒他。’",
    variations: ["我看见弟弟在雨中跌倒，便连忙向他跑去，把他扶了起来。", "小文把球踢向墙壁，没想到球反弹回来，打翻了地上的水瓶。", "看到自己闯了祸，他马上上前道歉，并主动收拾现场。"],
  },
];
