"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CURRICULUM_LEVELS, SAMPLE_LESSONS } from "@/data/curriculum";

export default function CoursesPage() {
  const { t, stats } = useApp();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accentGold/40 bg-bgSecondary px-3 py-1 text-xs font-bold text-accentGold">
              <Layers className="h-3.5 w-3.5" />
              {t("৬ লেভেল • ১০০ অধ্যায় • ১,০০০ লেসন আর্কিটেকচার", "6 Levels • 100 Chapters • 1,000-Lesson Architecture", "٦ مستويات • ١٠٠ فصل • ١٠٠٠ درس")}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-textPrimary bangla-text pt-1">
              {t("সম্পূর্ণ আরবি ভাষা কারিকুলাম", "Complete Arabic Curriculum", "المنهج الكامل للغة العربية")}
            </h1>
            <p className="text-sm text-textSecondary bangla-text max-w-2xl">
              {t(
                "শূন্য থেকে শুরু করে কুরআনিক আরবি ও ধ্রুপদী সাহিত্যে দক্ষতা অর্জনের জন্য ধাপে ধাপে সাজানো ৬টি স্তর।",
                "A progressive 6-level curriculum taking you from zero to Quranic Arabic and classical fluency.",
                "منهج متدرج من ٦ مستويات يأخذك من البداية إلى إتقان العربية القرآنية والفصيحة."
              )}
            </p>
          </div>

          <Link
            href="/courses/beginners"
            className="inline-flex items-center gap-2 rounded-xl bg-accentPrimary px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:opacity-95 transition"
          >
            <BookOpen className="h-4 w-4" />
            <span>{t("বেগিনার কোর্স ও লেসন প্লেয়ার খুলুন", "Open Beginner Course & Lesson Player", "افتح دورة المبتدئين")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Honest Curriculum Expansion Notice */}
        <div className="flex items-start gap-2.5 rounded-xl border border-borderColor bg-bgSecondary/70 p-3.5 text-xs text-textSecondary bangla-text">
          <Info className="h-4 w-4 shrink-0 text-accentGold mt-0.5" />
          <span>
            {t(
              "কারিকুলাম স্বচ্ছতা: আমাদের ডাটাবেস ও অ্যাপ আর্কিটেকচার ১০০টি অধ্যায় ও ১,০০০টি লেসনের জন্য সম্পূর্ণ প্রস্তুত। বর্তমানে লেভেল ১ ও লেভেল ২-এর পূর্ণাঙ্গ ইন্টারেক্টিভ নমুনা লেসন (১৫-লাইনের সংলাপ, শব্দভাণ্ডার, ব্যাকরণ ও কুইজসহ) উন্মুক্ত রয়েছে এবং অ্যাডমিন প্যানেলের মাধ্যমে ক্রমান্বয়ে বাকি অধ্যায়গুলো যুক্ত হচ্ছে।",
              "Curriculum Transparency: Our database and app architecture support all 100 chapters and 1,000 lessons. Full interactive sample lessons (with 15-line dialogues, vocabulary, grammar & quizzes) are live now, with additional chapters expanding progressively via the Admin system.",
              "شفافية المنهج: البنية التحتية جاهزة لـ ١٠٠٠ درس، والدروس النموذجية التفاعلية متاحة الآن للتعلم المباشر."
            )}
          </span>
        </div>
      </div>

      {/* Interactive Live Lessons Quick Access */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-textPrimary flex items-center gap-2 bangla-text">
          <Sparkles className="h-5 w-5 text-accentGold" />
          <span>{t("এখনই পড়ার জন্য উন্মুক্ত পূর্ণাঙ্গ লেসনসমূহ", "Live Interactive Lessons Available Now", "الدروس التفاعلية المتاحة الآن")}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_LESSONS.map((lesson) => {
            const isCompleted = stats.completedLessons.includes(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/courses/beginners?lesson=${lesson.id}`}
                className="glass-card rounded-2xl p-5 hover:border-accentGold/60 transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-accentGold/40 bg-bgSecondary px-3 py-0.5 text-[11px] font-bold text-accentGold">
                      {t(`অধ্যায় ${lesson.chapterNumber} • লেসন ${lesson.lessonNumber}`, `Chapter ${lesson.chapterNumber} • Lesson ${lesson.lessonNumber}`, `الفصل ${lesson.chapterNumber}`)}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-accentPrimary">
                        <CheckCircle2 className="h-4 w-4" />
                        {t("সম্পন্ন", "Completed", "مكتمل")}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-textPrimary bangla-text">
                    {t(lesson.titleBn, lesson.titleEn, lesson.titleAr)}
                  </h3>
                  <p dir="rtl" className="arabic-text text-base text-accentGold">
                    {lesson.titleAr}
                  </p>
                </div>

                <div className="pt-3 border-t border-borderColor/50 flex items-center justify-between text-xs font-semibold text-accentPrimary">
                  <span>
                    {t(
                      "১৫-লাইনের সংলাপ, শব্দভাণ্ডার ও কুইজ শুরু করুন",
                      "Start 15-Line Dialogue, Vocab & Quiz",
                      "ابدأ الدرس والحوار"
                    )}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6 Curriculum Levels Roadmap */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-textPrimary bangla-text">
          {t("৬টি স্তরের সম্পূর্ণ পাঠ্যক্রম কাঠামো (১০০ অধ্যায়)", "6-Level Curriculum Structure (100 Chapters)", "هيكل المستويات الستة (١٠٠ فصل)")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRICULUM_LEVELS.map((lvl) => (
            <div key={lvl.id} className="glass-card rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-accentPrimary/20 px-2.5 py-1 text-xs font-bold text-accentPrimary">
                  Level {lvl.number}
                </span>
                <span className="text-xs font-semibold text-accentGold bangla-text">
                  {lvl.chapterRange}
                </span>
              </div>

              <h3 className="text-base font-bold text-textPrimary bangla-text">
                {t(lvl.titleBn, lvl.titleEn, lvl.titleAr)}
              </h3>
              <p dir="rtl" className="arabic-text text-sm text-accentGold">
                {lvl.titleAr}
              </p>
              <p className="text-xs text-textSecondary bangla-text leading-relaxed">
                {lvl.descriptionBn}
              </p>

              <div className="pt-2">
                <Link
                  href="/courses/beginners"
                  className="inline-flex items-center gap-1 text-xs font-bold text-accentPrimary hover:underline"
                >
                  <span>{t("লেসন দেখুন", "View Lessons", "عرض الدروس")}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
