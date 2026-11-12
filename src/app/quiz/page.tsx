"use client";

import React, { useEffect, useState } from "react";
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Play,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface QuizQuestion {
  id: string;
  difficulty: "Beginner" | "Intermediate" | "Quranic";
  type: "MCQ" | "Fill-in-Blank" | "Grammar" | "Translation";
  questionBn: string;
  arabicPrompt?: string;
  options: string[];
  correctIndex: number;
  explanationBn: string;
}

const QUIZ_BANK: QuizQuestion[] = [
  {
    id: "q1",
    difficulty: "Beginner",
    type: "MCQ",
    questionBn: "'اَلْكِتَابُ مُفِيدٌ' — এই বাক্যটির সঠিক বাংলা অনুবাদ কোনটি?",
    arabicPrompt: "اَلْكِتَابُ مُفِيدٌ",
    options: ["বইটি নতুন", "বইটি উপকারী", "কলমটি সুন্দর", "বিদ্যালয়টি বড়"],
    correctIndex: 1,
    explanationBn: "اَلْكِتَابُ অর্থ 'বইটি' এবং مُفِيدٌ অর্থ 'উপকারী'। এটি একটি জুমলা ইসমিয়্যাহ।",
  },
  {
    id: "q2",
    difficulty: "Beginner",
    type: "Fill-in-Blank",
    questionBn: "শূন্যস্থান পূরণ করুন: অ্যানা ত্বালিবুন _____ আল-জামিআতি (আমি বিশ্ববিদ্যালয়ে একজন ছাত্র)।",
    arabicPrompt: "أَنَا طَالِبٌ _____ الْجَامِعَةِ",
    options: ["فِي", "مِنْ", "عَلَى", "عَنْ"],
    correctIndex: 0,
    explanationBn: "'ভেতরে' বা 'মধ্যে' বোঝাতে হরফে জার 'فِي' ব্যবহৃত হয় এবং পরের শব্দের শেষে যের (الْجَامِعَةِ) হয়।",
  },
  {
    id: "q3",
    difficulty: "Intermediate",
    type: "Grammar",
    questionBn: "'قَرَأَ الطَّالِبُ الْقُرْآنَ' বাক্যে 'الْقُرْآنَ' শব্দের শেষে যবর (ফাতহা) হয়েছে কেন?",
    arabicPrompt: "قَرَأَ الطَّالِبُ الْقُرْآنَ",
    options: [
      "এটি মুবতাদা হওয়ার কারণে",
      "এটি মাফউল বিহি (কর্ম) হওয়ার কারণে",
      "পূর্বে হরফে জার থাকার কারণে",
      "এটি ফায়েল (কর্তা) হওয়ার কারণে",
    ],
    correctIndex: 1,
    explanationBn: "জুমলা ফে'লিয়্যাহ-তে মাফউল বিহি (কর্ম) সর্বদা মানসুব হয় এবং একবচন হলে শেষে ফাতহা (যবর) যুক্ত হয়।",
  },
  {
    id: "q4",
    difficulty: "Intermediate",
    type: "Grammar",
    questionBn: "'مُسْلِمٌ' (একজন মুসলিম)-এর দ্বিবচন (তাসনিয়াহ) রূপ কোনটি?",
    arabicPrompt: "مُسْلِمٌ ← ؟",
    options: ["مُسْلِمُونَ", "مُسْلِمَانِ", "مُسْلِمَاتٌ", "مُسْلِمٍ"],
    correctIndex: 1,
    explanationBn: "আরবিতে একবচন শব্দের শেষে 'انِ' যুক্ত করলে মারফু অবস্থায় দ্বিবচন (مُسْلِمَانِ) গঠিত হয়।",
  },
  {
    id: "q5",
    difficulty: "Quranic",
    type: "Translation",
    questionBn: "সূরা আল-আসরের 'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ' আয়াতের সঠিক অর্থ কী?",
    arabicPrompt: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
    options: [
      "নিশ্চয়ই মানুষ ক্ষতিগ্রস্ততার মধ্যে রয়েছে",
      "সমস্ত প্রশংসা আল্লাহর জন্য",
      "বলুন, তিনি আল্লাহ এক",
      "আল্লাহ আমাদের প্রতিপালক",
    ],
    correctIndex: 0,
    explanationBn: "إِنَّ অর্থ নিশ্চয়ই, الْإِنسَانَ অর্থ মানুষ এবং لَفِي خُسْرٍ অর্থ অবশ্যই ক্ষতিগ্রস্ততার মধ্যে রয়েছে (সূরা আল-আসর ১০৩:২)।",
  },
  {
    id: "q6",
    difficulty: "Quranic",
    type: "MCQ",
    questionBn: "কুরআনের শব্দ 'الْعَالَمِينَ' কোন ত্রিবর্ণমূল ধাতু (Root Word) থেকে গঠিত?",
    arabicPrompt: "الْعَالَمِينَ",
    options: ["ح - م - د", "ع - ل - م", "ر - ح - م", "ك - ت - ب"],
    correctIndex: 1,
    explanationBn: "'الْعَالَمِينَ' শব্দটি 'ع - ل - م' (জ্ঞান/পরিচিতি) মূল ধাতু থেকে উদ্ভূত।",
  },
];

export default function QuizPage() {
  const { t, stats, recordQuizScore } = useApp();
  const [difficulty, setDifficulty] = useState<"ALL" | "Beginner" | "Intermediate" | "Quranic">("ALL");
  const [timedMode, setTimedMode] = useState<boolean>(false);
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(180);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const questions = QUIZ_BANK.filter(
    (q) => difficulty === "ALL" || q.difficulty === difficulty
  );

  useEffect(() => {
    if (!timedMode || !examStarted || submitted) return;
    if (secondsLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timedMode, examStarted, secondsLeft, submitted]);

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) score++;
    });
    return score;
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    setExamStarted(false);
    const score = calculateScore();
    recordQuizScore(
      difficulty === "ALL" ? "Comprehensive Arabic Exam" : `${difficulty} Arabic Quiz`,
      score,
      questions.length
    );
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setSecondsLeft(180);
    setExamStarted(timedMode);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const score = calculateScore();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      {/* Header & Exam Configuration */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-textPrimary bangla-text">
                {t("আরবি কুইজ ও মূল্যায়ন পরীক্ষা", "Arabic Quiz & Examination", "الاختبارات والامتحانات")}
              </h1>
              <p className="text-xs sm:text-sm text-textSecondary bangla-text">
                {t(
                  "MCQ, শূন্যস্থান পূরণ, ব্যাকরণ ও কুরআনিক অনুবাদ পরীক্ষার মাধ্যমে নিজের দক্ষতা যাচাই করুন।",
                  "Test your mastery with MCQs, fill-in-the-blanks, grammar & Quranic questions.",
                  "اختبر مستواك في النحو والمفردات والترجمة."
                )}
              </p>
            </div>
          </div>

          {timedMode && examStarted && !submitted && (
            <div className="flex items-center gap-2 rounded-xl border border-amber-500/50 bg-amber-950/40 px-4 py-2 text-sm font-bold text-amber-300">
              <Clock className="h-4 w-4" />
              <span>{formatTime(secondsLeft)}</span>
            </div>
          )}
        </div>

        {/* Difficulty & Mode Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-borderColor/50">
          <div className="flex flex-wrap gap-1.5">
            {(["ALL", "Beginner", "Intermediate", "Quranic"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setDifficulty(lvl);
                  setAnswers({});
                  setSubmitted(false);
                }}
                className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                  difficulty === lvl
                    ? "border-accentGold bg-accentPrimary text-white"
                    : "border-borderColor bg-bgSecondary text-textSecondary hover:text-textPrimary"
                }`}
              >
                {lvl === "ALL" ? t("সব স্তর", "All Levels", "الكل") : lvl}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const nextTimed = !timedMode;
                setTimedMode(nextTimed);
                setSubmitted(false);
                setAnswers({});
                setSecondsLeft(180);
                setExamStarted(nextTimed);
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                timedMode
                  ? "border-accentGold bg-accentGold text-black"
                  : "border-borderColor bg-bgSecondary text-textPrimary"
              }`}
            >
              <Play className="h-3.5 w-3.5" />
              <span>
                {timedMode
                  ? t("টাইমড পরীক্ষা চালু (৩ মিনিট)", "Timed Exam Active (3m)", "اختبار مؤقت")
                  : t("টাইমড পরীক্ষা শুরু করুন", "Start Timed Exam", "ابدأ اختباراً مؤقتاً")}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Score Banner */}
      {submitted && (
        <div className="glass-card rounded-2xl p-6 border-2 border-accentGold/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="h-10 w-10 text-accentGold" />
            <div>
              <h2 className="text-xl font-bold text-textPrimary bangla-text">
                {t(
                  `আপনার স্কোর: ${score} / ${questions.length} (+${score * 15} XP অর্জিত!)`,
                  `Your Score: ${score} / ${questions.length} (+${score * 15} XP Earned!)`,
                  `نتيجتك: ${score} من ${questions.length}`
                )}
              </h2>
              <p className="text-xs text-textSecondary bangla-text">
                {t(
                  "নিচে প্রতিটি প্রশ্নের সঠিক উত্তর ও ব্যাকরণগত ব্যাখ্যা দেওয়া হয়েছে।",
                  "Review the correct answers and detailed explanations below.",
                  "راجع الإجابات الصحيحة والشرح أدناه."
                )}
              </p>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="inline-flex items-center gap-1.5 rounded-xl bg-accentPrimary px-4 py-2.5 text-xs font-bold text-white"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{t("পুনরায় পরীক্ষা দিন", "Retake Exam", "إعادة الاختبار")}</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const chosen = answers[q.id];
          return (
            <div key={q.id} className="glass-card rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full border border-accentGold/30 bg-bgSecondary px-2.5 py-0.5 font-semibold text-accentGold">
                  {q.difficulty} • {q.type}
                </span>
                <span className="text-textSecondary">
                  {t(`প্রশ্ন ${idx + 1}/${questions.length}`, `Question ${idx + 1}/${questions.length}`, `${idx + 1}/${questions.length}`)}
                </span>
              </div>

              <p className="text-sm sm:text-base font-bold text-textPrimary bangla-text">
                {q.questionBn}
              </p>

              {q.arabicPrompt && (
                <p dir="rtl" className="arabic-text text-xl sm:text-2xl font-bold text-accentGold bg-bgPrimary/70 rounded-xl px-4 py-2.5">
                  {q.arabicPrompt}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q.options.map((opt, oIdx) => {
                  const isSelected = chosen === oIdx;
                  const isCorrect = oIdx === q.correctIndex;

                  let style =
                    "border-borderColor bg-bgSecondary/60 text-textPrimary hover:border-accentGold/50";
                  if (submitted) {
                    if (isCorrect) {
                      style = "border-emerald-500 bg-emerald-950/50 text-emerald-200 font-bold";
                    } else if (isSelected) {
                      style = "border-red-500 bg-red-950/50 text-red-200";
                    }
                  } else if (isSelected) {
                    style = "border-accentGold bg-accentPrimary/25 text-accentGold font-bold";
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={submitted}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-xs sm:text-sm transition bangla-text ${style}`}
                    >
                      <span>{opt}</span>
                      {submitted && isCorrect && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-2 rounded-xl border border-borderColor bg-bgPrimary/80 p-3 text-xs text-textSecondary bangla-text">
                  <strong className="text-accentGold">
                    {t("ব্যাখ্যা:", "Explanation:", "الشرح:")}
                  </strong>{" "}
                  {q.explanationBn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-accentPrimary px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-95 transition"
          >
            {t("উত্তরপত্র জমা দিন ও ফলাফল দেখুন", "Submit Answers & View Score", "إرسال الإجابات")}
          </button>
        </div>
      )}

      {/* Quiz History */}
      {stats.quizScores.length > 0 && (
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <h3 className="text-base font-bold text-textPrimary bangla-text">
            {t("সাম্প্রতিক পরীক্ষার ফলাফল (Quiz History)", "Recent Quiz History", "سجل الاختبارات")}
          </h3>
          <div className="space-y-2">
            {stats.quizScores.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-borderColor bg-bgSecondary/60 px-4 py-2.5 text-xs"
              >
                <span className="font-semibold text-textPrimary">{item.title}</span>
                <span className="text-textSecondary">{item.date}</span>
                <span className="font-bold text-accentGold">
                  {item.score} / {item.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
