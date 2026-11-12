"use client";

import React, { useState } from "react";
import {
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface QuranWord {
  arabic: string;
  root: string;
  banglaMeaning: string;
  englishMeaning: string;
  grammarNoteBn: string;
}

interface QuranVerseStudy {
  id: string;
  surahRefBn: string;
  surahRefEn: string;
  arabicAyah: string;
  banglaTranslation: string;
  englishTranslation: string;
  words: QuranWord[];
  quizQuestionBn: string;
  quizOptions: string[];
  correctOption: number;
}

const QURANIC_STUDIES: QuranVerseStudy[] = [
  {
    id: "fatihah-1-2",
    surahRefBn: "সূরা আল-ফাতিহা (১:২)",
    surahRefEn: "Surah Al-Fatihah (1:2)",
    arabicAyah: "اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    banglaTranslation: "সমস্ত প্রশংসা জগতসমূহের প্রতিপালক আল্লাহর জন্য।",
    englishTranslation: "All praise and thanks be to Allah, the Lord of the worlds.",
    words: [
      {
        arabic: "اَلْحَمْدُ",
        root: "ح - م - د",
        banglaMeaning: "সমস্ত প্রশংসা",
        englishMeaning: "All praise",
        grammarNoteBn: "ইসম, মুবতাদা (মারফু — শেষে পেশ)",
      },
      {
        arabic: "لِلَّهِ",
        root: "أ - ل - هـ",
        banglaMeaning: "আল্লাহর জন্য",
        englishMeaning: "To Allah",
        grammarNoteBn: "لِـ (হরফে জার) + اَللَّهِ (ইসমে জালালাহ মাজরুর)",
      },
      {
        arabic: "رَبِّ",
        root: "ر - ب - ب",
        banglaMeaning: "প্রতিপালক",
        englishMeaning: "Lord / Sustainer",
        grammarNoteBn: "সিফাত (বিশেষণ) ও মুদাফ (মাজরুর)",
      },
      {
        arabic: "الْعَالَمِينَ",
        root: "ع - ل - م",
        banglaMeaning: "জগতসমূহের",
        englishMeaning: "Of the worlds",
        grammarNoteBn: "মুদাফ ইলাইহি (জাম' মুযাক্কার সালিম — মাজরুর)",
      },
    ],
    quizQuestionBn: "'اَلْحَمْدُ' শব্দটির মূল ধাতু (Root Word) কোনটি?",
    quizOptions: ["ع - ل - م", "ح - م - د", "ر - ب - ب"],
    correctOption: 1,
  },
  {
    id: "ikhlas-112-1",
    surahRefBn: "সূরা আল-ইখলাস (১১২:১)",
    surahRefEn: "Surah Al-Ikhlas (112:1)",
    arabicAyah: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    banglaTranslation: "বলুন, তিনি আল্লাহ, এক ও অদ্বিতীয়।",
    englishTranslation: "Say, 'He is Allah, [who is] One.'",
    words: [
      {
        arabic: "قُلْ",
        root: "ق - و - ل",
        banglaMeaning: "বলুন",
        englishMeaning: "Say",
        grammarNoteBn: "ফে'লে আমর (আদেশসূচক ক্রিয়া — একবচন পুংলিঙ্গ)",
      },
      {
        arabic: "هُوَ",
        root: "ضمير (সর্বনাম)",
        banglaMeaning: "তিনি",
        englishMeaning: "He",
        grammarNoteBn: "দমীর মুনফাসিল (বিচ্ছিন্ন সর্বনাম — মুবতাদা)",
      },
      {
        arabic: "اللَّهُ",
        root: "أ - ل - هـ",
        banglaMeaning: "আল্লাহ",
        englishMeaning: "Allah",
        grammarNoteBn: "ইসমে জালালাহ (মারফু)",
      },
      {
        arabic: "أَحَدٌ",
        root: "أ - ح - د",
        banglaMeaning: "এক ও অদ্বিতীয়",
        englishMeaning: "One / Unique",
        grammarNoteBn: "খবর (মারফু — তানভীন যুক্ত)",
      },
    ],
    quizQuestionBn: "আয়াতে 'قُلْ' কোন প্রকারের ক্রিয়া (ফে'ল)?",
    quizOptions: ["ফে'লে মাযী (অতীত)", "ফে'লে আমর (আদেশসূচক)", "হরফে জার"],
    correctOption: 1,
  },
  {
    id: "asr-103-1-2",
    surahRefBn: "সূরা আল-আসর (১০৩:১–২)",
    surahRefEn: "Surah Al-Asr (103:1-2)",
    arabicAyah: "وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
    banglaTranslation: "সময়ের শপথ! নিশ্চয়ই মানুষ ক্ষতিগ্রস্ততার মধ্যে নিমজ্জিত।",
    englishTranslation: "By time, indeed, mankind is in loss.",
    words: [
      {
        arabic: "وَالْعَصْرِ",
        root: "ع - ص - ر",
        banglaMeaning: "সময়ের শপথ",
        englishMeaning: "By time",
        grammarNoteBn: "وَ (শপথসূচক হরফে জার) + الْعَصْرِ (মাজরুর)",
      },
      {
        arabic: "إِنَّ",
        root: "حرف (অব্যয়)",
        banglaMeaning: "নিশ্চয়ই",
        englishMeaning: "Indeed",
        grammarNoteBn: "হরফে মুশাব্বাহ বিল ফে'ল (ইসমকে মানসুব করে)",
      },
      {
        arabic: "الْإِنسَانَ",
        root: "أ - ن - س",
        banglaMeaning: "মানুষ",
        englishMeaning: "Mankind / Human",
        grammarNoteBn: "إِنَّ-এর ইসম (মানসুব — শেষে যবর)",
      },
      {
        arabic: "خُسْرٍ",
        root: "خ - س - ر",
        banglaMeaning: "ক্ষতিগ্রস্ততা",
        englishMeaning: "Loss",
        grammarNoteBn: "فِي হরফে জারের কারণে মাজরুর",
      },
    ],
    quizQuestionBn: "কী কারণে 'الْإِنسَانَ' শব্দের শেষে যবর (নাসব) হয়েছে?",
    quizOptions: ["পূর্বে 'إِنَّ' আসার কারণে", "পূর্বে 'فِي' আসার কারণে", "এটি ফে'ল হওয়ার কারণে"],
    correctOption: 0,
  },
];

export default function QuranicArabicPage() {
  const { t, addXP } = useApp();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const speakArabic = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace("۝", " "));
    utterance.lang = "ar-SA";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handleQuiz = (study: QuranVerseStudy, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [study.id]: optIdx }));
    if (optIdx === study.correctOption && !completedIds.includes(study.id)) {
      setCompletedIds((prev) => [...prev, study.id]);
      addXP(35);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-textPrimary bangla-text">
              {t("কুরআনিক আরবি ও শব্দ বিশ্লেষণ", "Quranic Arabic & Word Analysis", "العربية القرآنية وتحليل المفردات")}
            </h1>
            <p className="text-xs sm:text-sm text-textSecondary bangla-text">
              {t(
                "পবিত্র কুরআনের আয়াতের শব্দে শব্দে অর্থ, মূল ধাতু (Root Words) এবং ব্যাকরণগত বিশ্লেষণ।",
                "Word-by-word meanings, triliteral root words, and authentic Quranic grammar.",
                "معاني المفردات القرآنية والجذور اللغوية والإعراب."
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-accentGold/30 bg-bgSecondary/80 p-3 text-xs text-textSecondary bangla-text">
          <ShieldAlert className="h-4 w-4 shrink-0 text-accentGold mt-0.5" />
          <span>
            {t(
              "বিশুদ্ধতা নীতি: এই বিভাগে কেবল যাচাইকৃত সূরা ও আয়াত নম্বরসহ পবিত্র কুরআনের মূল পাঠ উপস্থাপন করা হয়েছে।",
              "Authenticity Notice: Only verified Quranic verses with exact Surah and Ayah citations are presented here.",
              "تنبيه: يتم عرض الآيات القرآنية الموثقة مع رقم السورة والآية بدقة."
            )}
          </span>
        </div>
      </div>

      {/* Verse Cards */}
      <div className="space-y-6">
        {QURANIC_STUDIES.map((study) => {
          const chosen = selectedAnswers[study.id];
          const isSolved = completedIds.includes(study.id);

          return (
            <div key={study.id} className="glass-card rounded-2xl p-6 space-y-5">
              {/* Surah Reference */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accentGold/40 bg-bgSecondary px-3.5 py-1 text-xs font-bold text-accentGold">
                  <BookOpen className="h-3.5 w-3.5" />
                  {t(study.surahRefBn, study.surahRefEn, study.surahRefEn)}
                </span>

                <div className="flex items-center gap-2">
                  {isSolved && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-accentPrimary">
                      <CheckCircle2 className="h-4 w-4" />
                      {t("সম্পন্ন (+35 XP)", "Completed (+35 XP)", "مكتمل")}
                    </span>
                  )}
                  <button
                    onClick={() => speakArabic(study.arabicAyah)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-borderColor bg-bgSecondary px-3 py-1.5 text-xs font-semibold text-accentPrimary hover:border-accentGold transition"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>{t("শুনুন", "Listen", "استمع")}</span>
                  </button>
                </div>
              </div>

              {/* Authentic Quranic Text */}
              <div className="rounded-2xl border border-accentGold/30 bg-bgPrimary/80 p-5 text-center space-y-2">
                <p dir="rtl" className="arabic-text text-2xl sm:text-4xl font-bold text-accentGold">
                  {study.arabicAyah}
                </p>
                <p className="text-sm sm:text-base font-medium text-textPrimary bangla-text pt-1">
                  {study.banglaTranslation}
                </p>
                <p className="text-xs text-textSecondary">{study.englishTranslation}</p>
              </div>

              {/* Word-by-Word & Root Breakdown */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-textSecondary">
                  {t(
                    "শব্দে শব্দে অর্থ, মূল ধাতু (Root) ও ব্যাকরণ:",
                    "Word-by-Word Meaning, Root & Grammar:",
                    "تحليل الكلمات والجذور والإعراب:"
                  )}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {study.words.map((w, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-borderColor bg-bgSecondary/70 p-3.5 space-y-1.5"
                    >
                      <p dir="rtl" className="arabic-text text-2xl font-bold text-accentGold text-center">
                        {w.arabic}
                      </p>
                      <p className="text-center text-[11px] font-semibold text-accentPrimary">
                        {t("মূল ধাতু:", "Root:", "الجذر:")} <span className="arabic-text">{w.root}</span>
                      </p>
                      <p className="text-xs font-bold text-textPrimary text-center bangla-text">
                        {w.banglaMeaning}
                      </p>
                      <p className="text-[11px] text-textSecondary text-center">
                        {w.englishMeaning}
                      </p>
                      <p className="text-[11px] text-textSecondary border-t border-borderColor/50 pt-1.5 bangla-text">
                        {w.grammarNoteBn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Grammar/Root Exercise */}
              <div className="pt-3 border-t border-borderColor/60 space-y-2.5">
                <p className="text-sm font-semibold text-textPrimary bangla-text">
                  {study.quizQuestionBn}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {study.quizOptions.map((opt, idx) => {
                    const isSelected = chosen === idx;
                    const isCorrect = idx === study.correctOption;
                    let style =
                      "border-borderColor bg-bgSecondary/60 text-textPrimary hover:border-accentGold/50";
                    if (chosen !== undefined) {
                      if (isCorrect) {
                        style = "border-emerald-500 bg-emerald-950/50 text-emerald-200";
                      } else if (isSelected) {
                        style = "border-red-500 bg-red-950/50 text-red-200";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuiz(study, idx)}
                        className={`rounded-xl border px-3.5 py-2.5 text-left text-xs font-medium transition bangla-text ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
