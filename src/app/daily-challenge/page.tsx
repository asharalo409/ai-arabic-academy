"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  Flame,
  CheckCircle2,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface DailyTask {
  id: string;
  arabic: string;
  questionBn: string;
  options: string[];
  correctIndex: number;
  explanationBn: string;
}

const DAILY_TASKS: DailyTask[] = [
  {
    id: "dc1",
    arabic: "اَلصَّبْرُ مِفْتَاحُ الْفَرَجِ",
    questionBn: "চ্যালেঞ্জ ১: এই প্রবাদ বাক্যটির সঠিক বাংলা অর্থ কোনটি?",
    options: [
      "ধৈর্য হলো মুক্তির চাবিকাঠি",
      "সময় কারও জন্য অপেক্ষা করে না",
      "জ্ঞানই শক্তি",
    ],
    correctIndex: 0,
    explanationBn: "اَلصَّبْرُ অর্থ ধৈর্য, مِفْتَاحُ অর্থ চাবিকাঠি এবং الْفَرَجِ অর্থ মুক্তি বা স্বস্তি।",
  },
  {
    id: "dc2",
    arabic: "أَشْكُرُكَ جَزِيلَ الشُّكْرِ",
    questionBn: "চ্যালেঞ্জ ২: কাউকে আন্তরিকভাবে ধন্যবাদ জানাতে নিচের কোন বাক্যটি ব্যবহৃত হয়?",
    options: ["إِلَى اللِّقَاءِ", "أَشْكُرُكَ جَزِيلَ الشُّكْرِ", "مَا اسْمُكَ؟"],
    correctIndex: 1,
    explanationBn: "أَشْكُرُكَ جَزِيلَ الشُّكْرِ অর্থ 'আমি আপনাকে অসংখ্য ধন্যবাদ জানাই'।",
  },
  {
    id: "dc3",
    arabic: "يَذْهَبُ الْمُعَلِّمُ إِلَى الْمَدْرَسَةِ",
    questionBn: "চ্যালেঞ্জ ৩: এই বাক্যে 'الْمُعَلِّمُ' শব্দটির ব্যাকরণগত অবস্থান কী?",
    options: ["মাফউল বিহি (কর্ম)", "ফায়েল (কর্তা — মারফু)", "হরফে জার"],
    correctIndex: 1,
    explanationBn: "এখানে শিক্ষকের দ্বারা যাওয়ার কাজটি সম্পাদিত হচ্ছে, তাই الْمُعَلِّمُ হলো ফায়েল (কর্তা)।",
  },
  {
    id: "dc4",
    arabic: "اَلرَّحْمٰنُ • اَلرَّحِيمُ",
    questionBn: "চ্যালেঞ্জ ৪: 'اَلرَّحْمٰنُ' এবং 'اَلرَّحِيمُ' শব্দ দুটির ত্রিবর্ণমূল ধাতু কোনটি?",
    options: ["ر - ح - م", "ع - ل - م", "ح - م - د"],
    correctIndex: 0,
    explanationBn: "উভয় শব্দই 'ر - ح - م' (দয়া ও করুণা) মূল ধাতু থেকে গঠিত।",
  },
  {
    id: "dc5",
    arabic: "طَالِبَانِ مُجْتَهِدَانِ",
    questionBn: "চ্যালেঞ্জ ৫: 'طَالِبَانِ مُجْتَهِدَانِ' কোন বচন নির্দেশ করে?",
    options: ["একবচন (ওয়াহিদ)", "দ্বিবচন (তাসনিয়াহ)", "বহুবচন (জাম')"],
    correctIndex: 1,
    explanationBn: "শেষে 'انِ' যুক্ত থাকায় এটি দ্বিবচন (দুজন পরিশ্রমী ছাত্র) নির্দেশ করে।",
  },
];

export default function DailyChallengePage() {
  const { t, stats, addXP, addStudyMinutes } = useApp();
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [claimedToday, setClaimedToday] = useState(false);

  const todayKey = `aaa_daily_${new Date().toISOString().split("T")[0]}`;

  useEffect(() => {
    try {
      if (localStorage.getItem(todayKey) === "claimed") {
        setClaimedToday(true);
      }
    } catch {
      // Ignore storage error
    }
  }, [todayKey]);

  const speakArabic = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const correctCount = DAILY_TASKS.filter(
    (task) => selected[task.id] === task.correctIndex
  ).length;

  const allSolved = correctCount === DAILY_TASKS.length;

  const claimDailyBonus = () => {
    if (!allSolved || claimedToday) return;
    setClaimedToday(true);
    addXP(100);
    addStudyMinutes(10);
    try {
      localStorage.setItem(todayKey, "claimed");
    } catch {
      // Ignore storage error
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
              <CalendarCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-textPrimary bangla-text">
                {t("দৈনিক আরবি চ্যালেঞ্জ", "Daily Arabic Challenge", "التحدي العربي اليومي")}
              </h1>
              <p className="text-xs sm:text-sm text-textSecondary bangla-text">
                {t(
                  "প্রতিদিন ৫টি প্রশ্নের সঠিক উত্তর দিয়ে +১০০ বোনাস XP অর্জন করুন এবং স্ট্রিক ধরে রাখুন।",
                  "Solve all 5 daily Arabic tasks to claim +100 bonus XP and keep your streak alive.",
                  "أجب عن ٥ أسئلة يومية واحصل على ١٠٠ نقطة إضافية."
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-orange-500/40 bg-orange-950/30 px-4 py-2 text-sm font-bold text-orange-300">
            <Flame className="h-5 w-5 fill-orange-400 text-orange-400" />
            <span>
              {t(`${stats.streak} দিনের স্ট্রিক`, `${stats.streak}-Day Streak`, `${stats.streak} أيام`)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-textSecondary">
            <span>
              {t(
                `অগ্রগতি: ${correctCount} / ${DAILY_TASKS.length} সম্পন্ন`,
                `Progress: ${correctCount} / ${DAILY_TASKS.length} solved`,
                `التقدم: ${correctCount} / ${DAILY_TASKS.length}`
              )}
            </span>
            <span className="text-accentGold">+100 XP Reward</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-bgSecondary overflow-hidden">
            <div
              className="h-full bg-accentPrimary transition-all duration-300"
              style={{ width: `${(correctCount / DAILY_TASKS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        {DAILY_TASKS.map((task) => {
          const chosen = selected[task.id];
          const isSolved = chosen === task.correctIndex;

          return (
            <div key={task.id} className="glass-card rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <p dir="rtl" className="arabic-text text-xl sm:text-2xl font-bold text-accentGold">
                  {task.arabic}
                </p>
                <button
                  onClick={() => speakArabic(task.arabic)}
                  className="rounded-lg border border-borderColor bg-bgSecondary p-2 text-accentPrimary hover:border-accentGold transition"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm font-bold text-textPrimary bangla-text">
                {task.questionBn}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {task.options.map((opt, idx) => {
                  const isChosen = chosen === idx;
                  const isCorrect = idx === task.correctIndex;
                  let style =
                    "border-borderColor bg-bgSecondary/60 text-textPrimary hover:border-accentGold/50";
                  if (chosen !== undefined) {
                    if (isCorrect) {
                      style = "border-emerald-500 bg-emerald-950/50 text-emerald-200 font-bold";
                    } else if (isChosen) {
                      style = "border-red-500 bg-red-950/50 text-red-200";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelected((prev) => ({ ...prev, [task.id]: idx }))}
                      className={`rounded-xl border px-3.5 py-2.5 text-left text-xs font-medium transition bangla-text ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {isSolved && (
                <p className="text-xs text-emerald-300 bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 bangla-text">
                  ✅ {task.explanationBn}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Claim Bonus Banner */}
      <div className="glass-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-textPrimary bangla-text">
            {claimedToday
              ? t("আজকের দৈনিক পুরস্কার (+100 XP) সংগৃহীত হয়েছে!", "Today's +100 XP Reward Claimed!", "تم استلام المكافأة!")
              : allSolved
              ? t("অভিনন্দন! সবগুলো চ্যালেঞ্জ সম্পন্ন হয়েছে।", "Congratulations! All 5 tasks solved.", "أحسنت! أكملت جميع المهام.")
              : t("পুরস্কার আনলক করতে সবগুলো প্রশ্নের সঠিক উত্তর দিন।", "Solve all 5 questions correctly to unlock +100 XP.", "أجب عن جميع الأسئلة لفتح المكافأة.")}
          </h3>
        </div>

        <button
          onClick={claimDailyBonus}
          disabled={!allSolved || claimedToday}
          className="inline-flex items-center gap-2 rounded-xl bg-accentGold px-5 py-3 text-xs sm:text-sm font-bold text-black disabled:opacity-40 hover:opacity-95 transition"
        >
          {claimedToday ? <CheckCircle2 className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          <span>
            {claimedToday
              ? t("সংগৃহীত (+100 XP)", "Claimed (+100 XP)", "تم الاستلام")
              : t("+১০০ বোনাস XP সংগ্রহ করুন", "Claim +100 Bonus XP", "استلم ١٠٠ نقطة")}
          </span>
        </button>
      </div>
    </div>
  );
}
