"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Check, ChevronRight, CircleHelp, Headphones, Lightbulb, RotateCcw, Sparkles, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { LESSONS } from "./lessons";
import { getDailyQuiz } from "./quiz-data";
import { LANGUAGE_DIFFERENCES, LEARNING_LEVELS, NOTEBOOK_CATEGORIES, PSLE_COMPO_COMPONENTS } from "./reference-data";

const STORAGE_KEY = "juju-tong-progress-v1";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [arranged, setArranged] = useState<number[]>([]);
  const [orderStatus, setOrderStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [chosenVariation, setChosenVariation] = useState(0);
  const [ownSentence, setOwnSentence] = useState("");
  const [completed, setCompleted] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  const [openReference, setOpenReference] = useState<"learning-path" | "differences" | "notebook" | "compo-components" | null>(null);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<"idle" | "preparing" | "playing" | "error" | "unsupported">("idle");
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechTimerRef = useRef<number | null>(null);
  const lesson = LESSONS[selectedDay];
  const dailyQuiz = useMemo(() => getDailyQuiz(selectedDay), [selectedDay]);
  const quizQuestion = dailyQuiz[quizQuestionIndex];
  const selectedQuizOption = quizAnswers[quizQuestionIndex];
  const quizScore = dailyQuiz.reduce((score, question, index) => score + (quizAnswers[index] === question.correctIndex ? 1 : 0), 0);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    let data: { completed?: number[]; drafts?: Record<string, string> };
    try {
      data = JSON.parse(stored) as { completed?: number[]; drafts?: Record<string, string> };
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    const hydration = window.setTimeout(() => {
      setCompleted(data.completed ?? []);
      setOwnSentence(data.drafts?.["0"] ?? "");
    }, 0);
    return () => window.clearTimeout(hydration);
  }, []);

  useEffect(() => {
    if (!openReference) return;
    window.requestAnimationFrame(() => {
      document.getElementById(openReference)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [openReference]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSpeechStatus("unsupported");
      return;
    }

    const synth = window.speechSynthesis;
    const loadVoices = () => synth.getVoices();
    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);
    return () => {
      if (speechTimerRef.current !== null) window.clearTimeout(speechTimerRef.current);
      synth.removeEventListener("voiceschanged", loadVoices);
      synth.cancel();
      speechRef.current = null;
    };
  }, []);

  const readData = () => {
    try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as { completed?: number[]; drafts?: Record<string, string> }; }
    catch { return {}; }
  };

  const changeDay = (day: number) => {
    const data = readData();
    const drafts = data.drafts ?? {};
    drafts[String(selectedDay)] = ownSentence;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed, drafts }));
    if (speechTimerRef.current !== null) window.clearTimeout(speechTimerRef.current);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    speechRef.current = null;
    setSpeechStatus("idle");
    setSelectedDay(day);
    setOwnSentence(drafts[String(day)] ?? "");
    setArranged([]); setOrderStatus("idle"); setChosenVariation(0); setSaved(false);
    setQuizQuestionIndex(0); setQuizAnswers({}); setQuizFinished(false);
    window.requestAnimationFrame(() => {
      document.getElementById("daily-practice")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const available = lesson.mixed.filter((index) => !arranged.includes(index));
  const progress = Math.round((completed.length / LESSONS.length) * 100);
  const hasEnoughCharacters = ownSentence.replace(/[\s，。！？：“”]/g, "").length >= 8;
  const hasPunctuation = /[，。！？]/.test(ownSentence);
  const usesPattern = lesson.patternKeys.every((key) => ownSentence.includes(key));
  const structureColors = useMemo(() => ["chunk-yellow", "chunk-blue", "chunk-coral", "chunk-green"], []);

  const speak = () => {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setSpeechStatus("unsupported");
      return;
    }

    const synth = window.speechSynthesis;
    const startSpeaking = () => {
      speechTimerRef.current = null;
      const utterance = new SpeechSynthesisUtterance(lesson.sentence);
      const voices = synth.getVoices();
      const chineseVoice = voices.find((item) => item.lang.toLowerCase() === "zh-sg")
        ?? voices.find((item) => item.lang.toLowerCase() === "zh-cn")
        ?? voices.find((item) => item.lang.toLowerCase().startsWith("zh"));

      if (chineseVoice) utterance.voice = chineseVoice;
      utterance.lang = chineseVoice?.lang ?? "zh-CN";
      utterance.rate = 0.78;
      utterance.pitch = 1;
      utterance.onstart = () => setSpeechStatus("playing");
      utterance.onend = () => {
        setSpeechStatus("idle");
        speechRef.current = null;
      };
      utterance.onerror = () => {
        setSpeechStatus("error");
        speechRef.current = null;
      };

      speechRef.current = utterance;
      if (synth.paused) synth.resume();
      synth.speak(utterance);
    };

    if (speechTimerRef.current !== null) window.clearTimeout(speechTimerRef.current);
    setSpeechStatus("preparing");

    if (synth.speaking || synth.pending) {
      synth.cancel();
      speechTimerRef.current = window.setTimeout(startSpeaking, 120);
    } else {
      startSpeaking();
    }
  };

  const checkOrder = () => {
    const correct = arranged.length === lesson.chunks.length && arranged.every((value, index) => value === index);
    setOrderStatus(correct ? "correct" : "wrong");
  };

  const saveLesson = () => {
    const nextCompleted = completed.includes(selectedDay) ? completed : [...completed, selectedDay];
    const data = readData();
    const drafts = data.drafts ?? {};
    drafts[String(selectedDay)] = ownSentence;
    setCompleted(nextCompleted);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: nextCompleted, drafts }));
    setSaved(true);
  };

  const restartQuiz = () => {
    setQuizQuestionIndex(0);
    setQuizAnswers({});
    setQuizFinished(false);
  };

  return (
    <main className="min-h-screen pb-20">
      <header className="app-header">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="logo-tile" aria-hidden="true">句</div>
            <div><p className="text-xl font-black text-white">句句通</p><p className="text-sm text-blue-100">每日一句，写得通顺</p></div>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white sm:flex">
            <Trophy className="h-4 w-4 text-yellow-300" />学习进度 {completed.length} / {LESSONS.length} 天
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
        <section className="mission-card mb-6 overflow-hidden rounded-[2rem] p-5 sm:p-8">
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_310px] lg:items-center">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2"><span className="rounded-full bg-yellow-300 px-3 py-1 text-sm font-black text-slate-900">今日任务</span><span className="text-sm font-bold text-blue-100">第 {selectedDay + 1} 课 · 约 10 分钟</span></div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">{lesson.title}</h1>
              <div className="mt-3">
                <p className="text-base font-bold text-blue-50 sm:text-lg">学习重点：{lesson.focus}</p>
                <p className="mt-1 text-sm font-semibold text-blue-100 sm:text-base">{lesson.focusEn}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
              <div className="mb-2 flex justify-between text-sm font-bold text-white"><span>14 天进度</span><span>{progress}%</span></div>
              <Progress value={progress} className="h-3 bg-white/15 [&>div]:bg-yellow-300" />
              <p className="mt-3 text-sm leading-6 text-blue-100">完成后，句子会自动收藏在这台设备上。</p>
            </div>
          </div>
        </section>

        <div className="week-picker mb-6">
          {[
            { title: "第一周 · Week 1", subtitle: "句子基础 · Sentence Basics", start: 0, end: 7 },
            { title: "第二周 · Week 2", subtitle: "句子纠错 · Sentence Repair", start: 7, end: 14 },
          ].map((week) => (
            <section key={week.start} className="week-group">
              <div className="week-group-heading"><strong>{week.title}</strong><span>{week.subtitle}</span></div>
              <nav aria-label={`${week.title} 选择练习日`} className="week-strip">
                {LESSONS.slice(week.start, week.end).map((item, offset) => {
                  const index = week.start + offset;
                  return (
                    <button key={item.day} type="button" onClick={() => changeDay(index)} className={`day-button ${selectedDay === index ? "day-button-active" : ""}`} aria-current={selectedDay === index ? "page" : undefined}>
                      <span className="text-xs font-bold opacity-60">第 {index + 1} 天</span><span className="day-skill">{index < 7 ? "基础" : "纠错"}</span>
                      {completed.includes(index) && <Check className="day-check" aria-label="已完成" />}
                    </button>
                  );
                })}
              </nav>
            </section>
          ))}
        </div>

        <nav className="reference-nav mb-6" aria-label="学习工具">
          <a href="#daily-practice">每日练习 <span>Daily Practice</span></a>
          <a href="#daily-quiz">每日测验 <span>Daily Quiz</span></a>
          <button type="button" onClick={() => setOpenReference(openReference === "learning-path" ? null : "learning-path")} aria-expanded={openReference === "learning-path"} aria-controls="learning-path">
            学习路线 <span>Learning Path</span>
          </button>
          <button type="button" onClick={() => setOpenReference(openReference === "differences" ? null : "differences")} aria-expanded={openReference === "differences"} aria-controls="differences">
            中英差异 <span>Chinese vs English</span>
          </button>
          <button type="button" onClick={() => setOpenReference(openReference === "notebook" ? null : "notebook")} aria-expanded={openReference === "notebook"} aria-controls="notebook">
            我的句型本 <span>Pattern Notebook</span>
          </button>
          <button type="button" onClick={() => setOpenReference(openReference === "compo-components" ? null : "compo-components")} aria-expanded={openReference === "compo-components"} aria-controls="compo-components">
            作文结构 <span>PSLE Compo Structure</span>
          </button>
        </nav>

        {openReference === "learning-path" && (
        <section id="learning-path" className="reference-section mb-6 scroll-mt-5">
          <div className="reference-heading">
            <div>
              <p className="reference-kicker">循序渐进 · Step by step</p>
              <h2>五个学习阶段 <span>5 Learning Levels</span></h2>
              <p>先把句子写通顺，再逐步学习段落和完整作文。</p>
              <p className="heading-en">Build clear sentences first, then progress towards paragraphs and full compositions.</p>
            </div>
          </div>
          <div className="level-grid">
            {LEARNING_LEVELS.map((item) => (
              <article key={item.level} className={`level-card ${item.level === 1 ? "level-card-active" : ""}`}>
                <div className="level-topline">
                  <span className="level-number">{item.level}</span>
                  <span className="level-status">{item.level === 1 ? "现在学习 · Current" : "接下来 · Next"}</span>
                </div>
                <h3>{item.title}</h3>
                <h4>{item.titleEn}</h4>
                <p>{item.description}</p>
                <p className="card-en">{item.descriptionEn}</p>
              </article>
            ))}
          </div>
        </section>
        )}

        {openReference === "differences" && (
        <section id="differences" className="reference-section difference-section mb-6 scroll-mt-5">
          <div className="reference-heading">
            <div>
              <p className="reference-kicker">写之前先懂 · Learn this first</p>
              <h2>中文和英文的句子有什么不同？ <span>How Chinese Sentence Order Differs from English</span></h2>
              <p>不要把英文字句逐字翻译成中文。先观察中文习惯怎样安排词语。</p>
              <p className="heading-en">Do not translate English word for word. Notice how natural Chinese arranges each part.</p>
            </div>
          </div>
          <div className="difference-grid">
            {LANGUAGE_DIFFERENCES.map((item) => (
              <article key={item.number} className="difference-card">
                <div className="difference-title">
                  <span>{item.number}</span>
                  <div><h3>{item.title}</h3><h4>{item.titleEn}</h4></div>
                </div>
                <div className="example-row example-english"><b>English</b><p>{item.english}</p></div>
                <div className="example-row example-chinese"><b>中文</b><p>{item.chinese}</p></div>
                <p className="difference-explanation">{item.explanation}</p>
                <p className="card-en">{item.explanationEn}</p>
              </article>
            ))}
          </div>
        </section>
        )}

        {openReference === "compo-components" && (
        <section id="compo-components" className="reference-section compo-section mb-6 scroll-mt-5">
          <div className="reference-heading">
            <div>
              <p className="reference-kicker">从考试到文章 · From exam to story</p>
              <h2>PSLE 华文作文的组成部分 <span>Components of PSLE Chinese Composition</span></h2>
              <p>先了解考试要求，再用六个部分规划一篇完整、切题和通顺的作文。</p>
              <p className="heading-en">Know the exam requirements first, then use six parts to plan a complete, relevant and fluent composition.</p>
            </div>
          </div>

          <div className="exam-format-card">
            <div className="exam-format-title">
              <span>考试格式</span>
              <div><h3>试卷一：写作</h3><p>Paper 1: Writing</p></div>
            </div>
            <div className="exam-format-grid">
              <div><strong>50 分钟</strong><span>50 minutes</span></div>
              <div><strong>40 分</strong><span>40 marks · 20%</span></div>
              <div><strong>二选一</strong><span>Choose 1 of 2</span></div>
              <div><strong>至少 100 字</strong><span>At least 100 Chinese characters</span></div>
            </div>
            <p className="exam-format-note">题目包括<strong>命题作文</strong>和<strong>看图作文</strong>，任选一题作答。考试时可使用考评局规定的词典。</p>
            <p className="card-en">Choose either the topic-based composition or the picture composition. An SEAB-approved dictionary may be used.</p>
            <a href="https://www.seab.gov.sg/psle/psle-formats-examined-in-2026/" target="_blank" rel="noreferrer">查看 2026 SEAB 考试格式 · View the official 2026 SEAB format</a>
          </div>

          <div className="compo-guide-heading">
            <h3>建议的六部分写作结构</h3>
            <p>Recommended six-part writing structure</p>
          </div>
          <div className="compo-grid">
            {PSLE_COMPO_COMPONENTS.map((item) => (
              <article key={item.number} className="compo-card">
                <div className="compo-card-title">
                  <span>{item.number}</span>
                  <div><h3>{item.title}</h3><h4>{item.titleEn}</h4></div>
                </div>
                <div className="compo-question"><strong>想一想 · Ask</strong><p>{item.question}</p><small>{item.questionEn}</small></div>
                <p className="compo-explanation">{item.explanation}</p>
                <p className="card-en">{item.explanationEn}</p>
              </article>
            ))}
          </div>
          <div className="compo-reminder">
            <strong>记住 · Remember</strong>
            <p>这六个部分是规划方法，不是规定每篇作文一定要分成六段。重点是切题、内容完整和句子通顺。</p>
            <small>This is a planning guide, not a rule that every composition must have exactly six paragraphs. Stay relevant, complete the story and write fluent sentences.</small>
          </div>
        </section>
        )}

        <section id="daily-practice" className="daily-practice-section scroll-mt-5">
          <div className="daily-practice-heading">
            <div>
              <p>第 {selectedDay + 1} 天 · Day {selectedDay + 1}</p>
              <h2>{lesson.title}</h2>
              <span>{lesson.focusEn}</span>
            </div>
            <strong>今天完成 5 个步骤<br /><small>Complete 5 steps today</small></strong>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start">
          <div className="space-y-6">
            <Panel step="1" title="学一句" subtitle="先听，再大声读三遍。">
              <div className="sentence-paper">
                <p className="model-sentence">{lesson.sentence}</p>
                <div className="listen-control">
                  <Button type="button" onClick={speak} className="listen-button"><Headphones className="h-5 w-5" /> {speechStatus === "playing" ? "正在播放…" : speechStatus === "preparing" ? "准备中…" : "听一听"}</Button>
                  <p className={`listen-status ${speechStatus === "error" || speechStatus === "unsupported" ? "listen-status-error" : ""}`} aria-live="polite">
                    {speechStatus === "playing" && "正在播放 · Playing"}
                    {speechStatus === "preparing" && "正在准备语音 · Preparing audio"}
                    {speechStatus === "error" && "无法播放。请检查媒体音量，再试一次。 · Unable to play. Check the media volume and try again."}
                    {speechStatus === "unsupported" && "这个浏览器不支持语音播放。请用 Chrome 或 Safari。 · Please open this page in Chrome or Safari."}
                  </p>
                </div>
              </div>
            </Panel>

            <Panel step="2" title="拆一句" subtitle="看看每一部分负责什么。">
              <div className="flex flex-wrap gap-3">
                {lesson.chunks.map((chunk, index) => (
                  <div key={chunk} className={`structure-chunk ${structureColors[index]}`}>
                    <span>{lesson.labels[index]} <em>{lesson.labelsEn[index]}</em></span>
                    <strong>{chunk}</strong>
                  </div>
                ))}
              </div>
              <div className="pattern-note">
                <Lightbulb className="h-5 w-5 shrink-0" />
                <span>
                  <strong>句型骨架：</strong>{lesson.pattern}
                  <small>{lesson.patternEn}</small>
                </span>
              </div>
            </Panel>

            <Panel step="3" title="排一句" subtitle="按正确顺序点击句子部分。">
              <div className={`answer-track ${orderStatus === "correct" ? "answer-correct" : ""}`}>
                {arranged.length === 0 ? <span className="font-medium text-slate-400">句子会在这里出现……</span> : arranged.map((index, position) => <button key={`${index}-${position}`} type="button" onClick={() => { setArranged(arranged.filter((_, i) => i !== position)); setOrderStatus("idle"); }} className="answer-chip">{lesson.chunks[index]}</button>)}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">{available.map((index) => <button key={index} type="button" onClick={() => { setArranged([...arranged, index]); setOrderStatus("idle"); }} className="word-chip">{lesson.chunks[index]}</button>)}</div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button onClick={checkOrder} disabled={arranged.length !== lesson.chunks.length} className="primary-button">检查顺序 <ChevronRight className="h-4 w-4" /></Button>
                <Button variant="ghost" onClick={() => { setArranged([]); setOrderStatus("idle"); }}><RotateCcw className="h-4 w-4" /> 重来</Button>
                {orderStatus === "correct" && <p className="feedback-correct"><Check className="h-4 w-4" /> 顺序正确！</p>}
                {orderStatus === "wrong" && <p className="feedback-try">再想想：先找时间或人物。</p>}
              </div>
            </Panel>

            <Panel step="4" title="变一句" subtitle="同一个句型，可以换不同内容。">
              <div className="grid gap-3 sm:grid-cols-3">{lesson.variations.map((variation, index) => <button type="button" key={variation} onClick={() => setChosenVariation(index)} className={`variation-card ${chosenVariation === index ? "variation-card-active" : ""}`}><span>变化 {index + 1}</span><p>{variation}</p></button>)}</div>
            </Panel>

            <Panel step="5" title="写一句" subtitle="现在轮到你自己运用。">
              <div className="writing-prompt"><Target className="h-5 w-5 shrink-0" /><p>{lesson.prompt}</p></div>
              <label htmlFor="own-sentence" className="sr-only">写下自己的句子</label>
              <Textarea id="own-sentence" value={ownSentence} onChange={(event) => { setOwnSentence(event.target.value); setSaved(false); }} placeholder="在这里写下你的句子……" className="writing-area" />
              <div className="mt-4 grid gap-2 sm:grid-cols-3"><CheckItem done={hasEnoughCharacters} label="意思完整" /><CheckItem done={hasPunctuation} label="使用标点" /><CheckItem done={usesPattern} label="用到今天的句型" optional /></div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button onClick={saveLesson} disabled={!hasEnoughCharacters || !hasPunctuation} className="complete-button"><Sparkles className="h-5 w-5" /> 完成今天练习</Button>
                {saved && <p className="feedback-correct"><Check className="h-4 w-4" /> 已保存到这台设备</p>}
              </div>
            </Panel>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-5">
            <section className="side-card">
              <div className="flex items-center gap-3"><div className="side-icon bg-blue-100 text-blue-700"><BookOpen className="h-5 w-5" /></div><div><p className="text-sm font-bold text-slate-500">今天记住</p><h2 className="text-lg font-black text-slate-900">通顺检查法</h2></div></div>
              <ol className="mt-5 space-y-4">{["谁在做这件事？", "时间和地点清楚吗？", "动作顺序合理吗？", "慢慢读一遍顺口吗？"].map((item, index) => <li key={item} className="flex gap-3 font-medium leading-6 text-slate-700"><span className="check-index">{index + 1}</span>{item}</li>)}</ol>
            </section>
            <section className="side-card border-2 border-dashed border-yellow-300 bg-yellow-50">
              <div className="flex items-start gap-3"><div className="side-icon bg-yellow-300 text-slate-900"><Sparkles className="h-5 w-5" /></div><div><h2 className="text-lg font-black text-slate-900">给家长的小提示</h2><p className="mt-2 text-sm font-medium leading-6 text-slate-600">先请孩子说出句型骨架，再改一个地方。不要一次纠正所有错误。</p></div></div>
            </section>
          </aside>
          </div>
        </section>

        <section id="daily-quiz" className="quiz-section mt-8 scroll-mt-5">
          <div className="quiz-heading">
            <div>
              <p>每日测验 · Daily Quiz</p>
              <h2>第 {selectedDay + 1} 天：{lesson.title}</h2>
              <span>10 道题 · 选择一个最合适的答案<br />10 questions · Choose the best answer</span>
            </div>
            {!quizFinished && <strong>{quizQuestionIndex + 1} / {dailyQuiz.length}</strong>}
          </div>

          {quizFinished ? (
            <div className="quiz-result" aria-live="polite">
              <span className="quiz-result-score">{quizScore} / {dailyQuiz.length}</span>
              <h3>{quizScore >= 8 ? "掌握得很好！" : quizScore >= 6 ? "不错，再练一次会更稳。" : "继续加油，先重看今天的句型。"}</h3>
              <p>{quizScore >= 8 ? "Great work—you understand today’s sentence pattern." : quizScore >= 6 ? "Good effort. Try once more to strengthen the pattern." : "Review today’s sentence structure, then try the quiz again."}</p>
              <Button type="button" onClick={restartQuiz} className="primary-button"><RotateCcw className="h-4 w-4" /> 再试一次 Try again</Button>
            </div>
          ) : (
            <div className="quiz-body">
              <Progress value={((quizQuestionIndex + 1) / dailyQuiz.length) * 100} className="quiz-progress" />
              <p className="quiz-number">问题 {quizQuestionIndex + 1} · Question {quizQuestionIndex + 1}</p>
              <h3>{quizQuestion.question}</h3>
              <p className="quiz-question-en">{quizQuestion.questionEn}</p>

              <details className="quiz-hint">
                <summary><CircleHelp className="h-4 w-4" /> 提示 Hint</summary>
                <p>{quizQuestion.hint}</p>
              </details>

              <div className="quiz-options" role="group" aria-label={`问题 ${quizQuestionIndex + 1} 的选项`}>
                {quizQuestion.options.map((option, optionIndex) => {
                  const answered = selectedQuizOption !== undefined;
                  const isCorrect = optionIndex === quizQuestion.correctIndex;
                  const isSelected = optionIndex === selectedQuizOption;
                  const stateClass = answered && isCorrect ? "quiz-option-correct" : answered && isSelected ? "quiz-option-wrong" : "";
                  return (
                    <button
                      type="button"
                      key={option.text}
                      className={`quiz-option ${stateClass}`}
                      onClick={() => setQuizAnswers((answers) => answers[quizQuestionIndex] === undefined ? { ...answers, [quizQuestionIndex]: optionIndex } : answers)}
                      disabled={answered}
                    >
                      <span>{String.fromCharCode(65 + optionIndex)}</span>
                      <strong>{option.text}</strong>
                    </button>
                  );
                })}
              </div>

              {selectedQuizOption !== undefined && (
                <div className={`quiz-feedback ${selectedQuizOption === quizQuestion.correctIndex ? "quiz-feedback-correct" : "quiz-feedback-wrong"}`} aria-live="polite">
                  <strong>{selectedQuizOption === quizQuestion.correctIndex ? "答对了！ Correct!" : "再留意句子的结构。 Review the structure."}</strong>
                  <p>{quizQuestion.options[selectedQuizOption].feedback}</p>
                  {selectedQuizOption !== quizQuestion.correctIndex && <p><b>正确答案 Correct answer:</b> {quizQuestion.options[quizQuestion.correctIndex].text}</p>}
                </div>
              )}

              <div className="quiz-actions">
                {quizQuestionIndex > 0 && <Button type="button" variant="ghost" onClick={() => setQuizQuestionIndex((index) => index - 1)}>上一题 Previous</Button>}
                <Button
                  type="button"
                  className="primary-button"
                  disabled={selectedQuizOption === undefined}
                  onClick={() => quizQuestionIndex === dailyQuiz.length - 1 ? setQuizFinished(true) : setQuizQuestionIndex((index) => index + 1)}
                >
                  {quizQuestionIndex === dailyQuiz.length - 1 ? "查看成绩 See score" : "下一题 Next"} <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </section>

        {openReference === "notebook" && (
        <section id="notebook" className="reference-section notebook-section mt-8 scroll-mt-5">
          <div className="reference-heading">
            <div>
              <p className="reference-kicker">按用途收藏 · Organised by purpose</p>
              <h2>我的句型本 <span>My Sentence Pattern Notebook</span></h2>
              <p>不要只按作文题目背句子。把句型分成七种用途，写不同题目时都能使用。</p>
              <p className="heading-en">Do not memorise sentences only by topic. These seven purposes can be reused across many compositions.</p>
            </div>
          </div>
          <div className="notebook-grid">
            {NOTEBOOK_CATEGORIES.map((item) => (
              <details key={item.number} className="notebook-card" open={item.number === 1}>
                <summary>
                  <span className="notebook-number">{item.number}</span>
                  <span><strong>{item.title}</strong><small>{item.titleEn}</small></span>
                  <span className="notebook-plus" aria-hidden="true">＋</span>
                </summary>
                <div className="notebook-content">
                  <div className="notebook-pattern"><b>句型 Pattern</b><p>{item.pattern}</p><small>{item.patternEn}</small></div>
                  <div className="notebook-example"><b>例句 Example</b><p>{item.example}</p></div>
                  <p>{item.explanation}</p>
                  <p className="card-en">{item.explanationEn}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
        )}
      </div>
    </main>
  );
}

function Panel({ step, title, subtitle, children }: { step: string; title: string; subtitle: string; children: React.ReactNode }) {
  return <section className="lesson-panel"><div className="step-heading"><span className="step-number">{step}</span><div><h2>{title}</h2><p>{subtitle}</p></div></div>{children}</section>;
}

function CheckItem({ done, label, optional = false }: { done: boolean; label: string; optional?: boolean }) {
  return <div className={`self-check ${done ? "self-check-done" : ""}`}><span className="self-check-icon">{done && <Check className="h-4 w-4" />}</span><span>{label}{optional && <small> 加分项</small>}</span></div>;
}
