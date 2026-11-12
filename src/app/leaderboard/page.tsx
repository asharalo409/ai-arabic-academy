"use client";

import React, { useState } from "react";
import { Trophy, Flame, Medal, Sparkles, Info } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface LearnerEntry {
  id: string;
  name: string;
  institution: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const { t, stats } = useApp();
  const [period, setPeriod] = useState<"weekly" | "all-time">("weekly");

  const multiplier = period === "weekly" ? 1 : 3;

  const baseLearners: LearnerEntry[] = [
    {
      id: "u1",
      name: "আব্দুল্লাহ আল-মামুন (Abdullah)",
      institution: "Islamic University, Kushtia",
      xp: 850 * multiplier,
      streak: 14,
    },
    {
      id: "u2",
      name: "ফাতিমা তুয-যাহরা (Fatima)",
      institution: "Darunnajat Siddikia Kamil Madrasa",
      xp: 720 * multiplier,
      streak: 11,
    },
    {
      id: "u3",
      name: "ইউসুফ বিন তারিক (Yusuf)",
      institution: "Dhaka College",
      xp: 540 * multiplier,
      streak: 8,
    },
    {
      id: "u4",
      name: "উমর ফারুক (Umar Faruq)",
      institution: "University of Chittagong",
      xp: 390 * multiplier,
      streak: 6,
    },
    {
      id: "u5",
      name: "আয়েশা সিদ্দিকা (Aisha)",
      institution: "University of Dhaka",
      xp: 260 * multiplier,
      streak: 4,
    },
    {
      id: "current-user",
      name: `${stats.studentName || "Taseen Billah"} (${t("আপনি", "You", "أنت")})`,
      institution: t("AI Arabic Academy শিক্ষার্থী", "AI Arabic Academy Learner", "طالب الأكاديمية"),
      xp: stats.xp,
      streak: stats.streak,
      isCurrentUser: true,
    },
  ];

  const sortedLearners = [...baseLearners].sort((a, b) => b.xp - a.xp);
  const myRank = sortedLearners.findIndex((item) => item.isCurrentUser) + 1;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-textPrimary bangla-text">
                {t("শিক্ষার্থী লিডারবোর্ড", "Student Leaderboard", "لوحة المتصدرين")}
              </h1>
              <p className="text-xs sm:text-sm text-textSecondary bangla-text">
                {t(
                  `আপনার বর্তমান অবস্থান: #${myRank} • মোট অর্জিত XP: ${stats.xp}`,
                  `Your Current Rank: #${myRank} • Total Earned XP: ${stats.xp}`,
                  `ترتيبك الحالي: #${myRank} • نقاطك: ${stats.xp}`
                )}
              </p>
            </div>
          </div>

          {/* Period Switcher */}
          <div className="flex rounded-xl border border-borderColor bg-bgSecondary p-1">
            <button
              onClick={() => setPeriod("weekly")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                period === "weekly"
                  ? "bg-accentPrimary text-white"
                  : "text-textSecondary hover:text-textPrimary"
              }`}
            >
              {t("সাপ্তাহিক", "Weekly", "أسبوعي")}
            </button>
            <button
              onClick={() => setPeriod("all-time")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                period === "all-time"
                  ? "bg-accentPrimary text-white"
                  : "text-textSecondary hover:text-textPrimary"
              }`}
            >
              {t("সর্বকালের", "All-Time", "الكل")}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-borderColor bg-bgSecondary/70 p-3 text-xs text-textSecondary bangla-text">
          <Info className="h-4 w-4 shrink-0 text-accentGold mt-0.5" />
          <span>
            {t(
              "র‍্যাংকিং গাইড: লেসন সম্পন্ন (+৫০ XP), দৈনিক চ্যালেঞ্জ (+১০০ XP), এবং কুইজ সমাধান করে আপনার রিয়েল-টাইম XP বাড়ান এবং শীর্ষ স্থানে উঠে আসুন!",
              "Ranking Guide: Complete lessons (+50 XP), daily challenges (+100 XP), and quizzes to increase your real-time XP and climb the leaderboard!",
              "أكمل الدروس والتحديات اليومية لزيادة نقاطك وتصدر القائمة."
            )}
          </span>
        </div>
      </div>

      {/* Rankings List */}
      <div className="space-y-3">
        {sortedLearners.map((learner, index) => {
          const rank = index + 1;
          return (
            <div
              key={learner.id}
              className={`glass-card rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 transition ${
                learner.isCurrentUser
                  ? "border-2 border-accentGold bg-accentPrimary/15"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-extrabold text-sm ${
                    rank === 1
                      ? "bg-amber-400 text-black"
                      : rank === 2
                      ? "bg-slate-300 text-black"
                      : rank === 3
                      ? "bg-amber-700 text-white"
                      : "bg-bgSecondary text-textPrimary border border-borderColor"
                  }`}
                >
                  {rank <= 3 ? <Medal className="h-5 w-5" /> : `#${rank}`}
                </div>

                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-bold text-textPrimary truncate bangla-text">
                    {learner.name}
                  </p>
                  <p className="text-xs text-textSecondary truncate">{learner.institution}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-orange-500/30 bg-bgSecondary px-2.5 py-1 text-xs font-semibold text-orange-400">
                  <Flame className="h-3.5 w-3.5 fill-orange-400" />
                  {learner.streak}d
                </span>

                <span className="inline-flex items-center gap-1 rounded-xl bg-bgPrimary/80 border border-accentGold/30 px-3 py-1.5 text-xs sm:text-sm font-extrabold text-accentGold">
                  <Sparkles className="h-3.5 w-3.5" />
                  {learner.xp} XP
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
