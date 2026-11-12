"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Flame,
  Sparkles,
  BookOpen,
  Clock,
  Library,
  Award,
  ArrowRight,
  Target,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function DashboardPage() {
  const { t, stats } = useApp();

  const currentLevelNumber = Math.floor(stats.xp / 250) + 1;
  const xpIntoLevel = stats.xp % 250;
  const dailyProgressPct = Math.min(
    100,
    Math.round((stats.studyMinutes / Math.max(stats.dailyGoalMinutes, 1)) * 100)
  );

  // Genuine milestone achievements tied strictly to real student activity
  const achievements = [
    {
      id: "first-step",
      titleBn: "প্রথম পদক্ষেপ (First Step)",
      descBn: "প্ল্যাটফর্মে যুক্ত হয়ে প্রথম ১০০ XP অর্জন করেছেন।",
      unlocked: stats.xp >= 100,
    },
    {
      id: "lesson-starter",
      titleBn: "পাঠ অন্বেষী (Lesson Explorer)",
      descBn: "কমপক্ষে ১টি পূর্ণাঙ্গ লেসন সম্পন্ন করেছেন।",
      unlocked: stats.completedLessons.length >= 1,
    },
    {
      id: "vocab-builder",
      titleBn: "শব্দসংগ্রাহক (Word Collector)",
      descBn: "কমপক্ষে ৫টি আরবি শব্দ মুখস্থ করেছেন।",
      unlocked: stats.learnedVocab.length >= 5,
    },
    {
      id: "quiz-scholar",
      titleBn: "কুইজ বিজয়ী (Quiz Scholar)",
      descBn: "কমপক্ষে ১টি মূল্যায়ন পরীক্ষায় অংশগ্রহণ করেছেন।",
      unlocked: stats.quizScores.length >= 1,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-textPrimary bangla-text">
              {t("স্টুডেন্ট ড্যাশবোর্ড", "Student Dashboard", "لوحة تحكم الطالب")}
            </h1>
            <p className="text-xs sm:text-sm text-textSecondary bangla-text">
              {t(
                `লেভেল ${currentLevelNumber} শিক্ষার্থী • আপনার প্রকৃত শেখার অগ্রগতি ও পরিসংখ্যান`,
                `Level ${currentLevelNumber} Learner • Your real learning progress & stats`,
                `المستوى ${currentLevelNumber} • إحصائيات تقدمك الدراسي`
              )}
            </p>
          </div>
        </div>

        <Link
          href="/courses/beginners"
          className="inline-flex items-center gap-2 rounded-xl bg-accentPrimary px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:opacity-95 transition"
        >
          <span>{t("পড়া চালিয়ে যান", "Continue Learning", "متابعة التعلم")}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-accentGold">
            <span className="text-xs font-semibold">
              {t("মোট XP পয়েন্ট", "Total XP", "نقاط الخبرة")}
            </span>
            <Sparkles className="h-4 w-4" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-textPrimary">{stats.xp}</p>
          <p className="text-[11px] text-textSecondary">
            {t(`লেভেল ${currentLevelNumber} (${xpIntoLevel}/250 XP)`, `Level ${currentLevelNumber} (${xpIntoLevel}/250 XP)`, `المستوى ${currentLevelNumber}`)}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-orange-400">
            <span className="text-xs font-semibold">
              {t("দৈনিক স্ট্রিক", "Daily Streak", "سلسلة الأيام")}
            </span>
            <Flame className="h-4 w-4 fill-orange-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-textPrimary">
            {stats.streak} {t("দিন", "Days", "أيام")}
          </p>
          <p className="text-[11px] text-textSecondary">
            {t("নিয়মিত অনুশীলন বজায় রাখুন", "Keep studying daily", "حافظ على الاستمرارية")}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-accentPrimary">
            <span className="text-xs font-semibold">
              {t("সম্পন্ন লেসন", "Completed Lessons", "الدروس المكتملة")}
            </span>
            <BookOpen className="h-4 w-4" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-textPrimary">
            {stats.completedLessons.length}
          </p>
          <p className="text-[11px] text-textSecondary">
            {t(`শেখা শব্দ: ${stats.learnedVocab.length} টি`, `Words learned: ${stats.learnedVocab.length}`, `كلمات: ${stats.learnedVocab.length}`)}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-sky-400">
            <span className="text-xs font-semibold">
              {t("অধ্যয়নের সময়", "Study Time", "وقت الدراسة")}
            </span>
            <Clock className="h-4 w-4" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-textPrimary">
            {stats.studyMinutes} {t("মিনিট", "min", "دقيقة")}
          </p>
          <p className="text-[11px] text-textSecondary">
            {t(`দৈনিক লক্ষ্য: ${stats.dailyGoalMinutes} মিনিট`, `Daily goal: ${stats.dailyGoalMinutes}m`, `الهدف: ${stats.dailyGoalMinutes}د`)}
          </p>
        </div>
      </div>

      {/* Daily Goal & Vocabulary Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-textPrimary flex items-center gap-2 bangla-text">
              <Target className="h-5 w-5 text-accentGold" />
              <span>{t("দৈনিক শেখার লক্ষ্য", "Daily Learning Goal", "هدف التعلم اليومي")}</span>
            </h2>
            <span className="text-xs font-bold text-accentPrimary">{dailyProgressPct}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-bgSecondary overflow-hidden">
            <div
              className="h-full bg-accentPrimary transition-all"
              style={{ width: `${dailyProgressPct}%` }}
            />
          </div>
          <p className="text-xs text-textSecondary bangla-text">
            {t(
              `আপনি মোট ${stats.studyMinutes} মিনিট অধ্যয়ন করেছেন (লক্ষ্য: ${stats.dailyGoalMinutes} মিনিট)।`,
              `You have studied ${stats.studyMinutes} minutes toward your ${stats.dailyGoalMinutes}-minute goal.`,
              `درست ${stats.studyMinutes} دقيقة من أصل ${stats.dailyGoalMinutes} دقيقة.`
            )}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-textPrimary flex items-center gap-2 bangla-text">
              <Library className="h-5 w-5 text-accentGold" />
              <span>{t("শব্দভাণ্ডার ও প্রিয় তালিকা", "Vocabulary Progress", "تقدم المفردات")}</span>
            </h2>
            <Link href="/vocabulary" className="text-xs font-bold text-accentPrimary hover:underline">
              {t("অনুশীলন করুন →", "Practice →", "تدرب ←")}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-xl border border-borderColor bg-bgPrimary/70 p-3">
              <p className="text-lg font-extrabold text-accentGold">{stats.learnedVocab.length}</p>
              <p className="text-xs text-textSecondary bangla-text">
                {t("মুখস্থ শব্দ", "Words Mastered", "كلمات متقنة")}
              </p>
            </div>
            <div className="rounded-xl border border-borderColor bg-bgPrimary/70 p-3">
              <p className="text-lg font-extrabold text-accentPrimary">{stats.favoriteVocab.length}</p>
              <p className="text-xs text-textSecondary bangla-text">
                {t("প্রিয় শব্দ", "Saved Favorites", "المفضلة")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Earned Achievements (Connected strictly to real activity) */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-textPrimary flex items-center gap-2 bangla-text">
          <Award className="h-5 w-5 text-accentGold" />
          <span>{t("অর্জিত ব্যাজ ও মাইলফলক", "Achievements & Milestones", "الإنجازات والأوسمة")}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`rounded-xl border p-4 space-y-1.5 transition ${
                ach.unlocked
                  ? "border-accentGold/50 bg-accentPrimary/15"
                  : "border-borderColor bg-bgSecondary/40 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-accentGold">
                  {ach.unlocked
                    ? t("অর্জিত ✓", "Unlocked ✓", "مفتوح ✓")
                    : t("লক করা", "Locked", "مقفل")}
                </span>
                {ach.unlocked && <CheckCircle2 className="h-4 w-4 text-accentPrimary" />}
              </div>
              <h3 className="text-sm font-bold text-textPrimary bangla-text">{ach.titleBn}</h3>
              <p className="text-xs text-textSecondary bangla-text">{ach.descBn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Quiz Scores */}
      <div className="glass-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-textPrimary bangla-text">
            {t("সাম্প্রতিক কুইজ স্কোর", "Recent Quiz Scores", "نتائج الاختبارات الأخيرة")}
          </h2>
          <Link href="/quiz" className="text-xs font-bold text-accentPrimary hover:underline">
            {t("নতুন পরীক্ষা দিন →", "Take a Quiz →", "اختبار جديد ←")}
          </Link>
        </div>

        {stats.quizScores.length === 0 ? (
          <p className="text-xs sm:text-sm text-textSecondary bangla-text">
            {t(
              "আপনি এখনো কোনো কুইজ সম্পন্ন করেননি। কুইজ মডিউলে গিয়ে প্রথম পরীক্ষা দিন!",
              "You have not completed any quizzes yet. Visit the Quiz module to take your first exam!",
              "لم تكمل أي اختبار بعد. ابدأ اختبارك الأول الآن!"
            )}
          </p>
        ) : (
          <div className="space-y-2">
            {stats.quizScores.slice(0, 6).map((q) => (
              <div
                key={q.id}
                className="flex items-center justify-between rounded-xl border border-borderColor bg-bgSecondary/60 px-4 py-3 text-xs"
              >
                <span className="font-bold text-textPrimary">{q.title}</span>
                <span className="text-textSecondary">{q.date}</span>
                <span className="rounded-lg bg-accentPrimary/20 px-2.5 py-1 font-bold text-accentGold">
                  {q.score} / {q.total}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
