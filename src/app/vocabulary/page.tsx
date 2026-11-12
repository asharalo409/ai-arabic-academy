"use client";

import React, { useState } from "react";
import {
  Library,
  Search,
  Heart,
  Volume2,
  RotateCw,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface VocabWord {
  id: string;
  category: "Daily" | "Quranic" | "Education" | "Verbs";
  arabic: string;
  banglaPronunciation: string;
  banglaMeaning: string;
  englishMeaning: string;
  exampleArabic: string;
  exampleBangla: string;
}

const VOCAB_WORDS: VocabWord[] = [
  {
    id: "v1",
    category: "Daily",
    arabic: "اَلسَّلَامُ",
    banglaPronunciation: "আস-সালামু",
    banglaMeaning: "শান্তি ও নিরাপত্তা",
    englishMeaning: "Peace / Safety",
    exampleArabic: "اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    exampleBangla: "আপনার ওপর শান্তি ও আল্লাহর রহমত বর্ষিত হোক।",
  },
  {
    id: "v2",
    category: "Education",
    arabic: "اَلْعِلْمُ",
    banglaPronunciation: "আল-ইলমু",
    banglaMeaning: "জ্ঞান / বিদ্যা",
    englishMeaning: "Knowledge",
    exampleArabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    exampleBangla: "জ্ঞান অন্বেষণ করা প্রত্যেক মুসলিমের ওপর ফরজ।",
  },
  {
    id: "v3",
    category: "Quranic",
    arabic: "اَلْهُدَى",
    banglaPronunciation: "আল-হুদা",
    banglaMeaning: "সঠিক পথনির্দেশ / হিদায়াত",
    englishMeaning: "Guidance",
    exampleArabic: "اَلْقُرْآنُ الْكَرِيمُ هُدًى لِلنَّاسِ",
    exampleBangla: "পবিত্র কুরআন মানবজাতির জন্য পথনির্দেশ।",
  },
  {
    id: "v4",
    category: "Quranic",
    arabic: "اَلرَّحْمَةُ",
    banglaPronunciation: "আর-রাহমাতু",
    banglaMeaning: "দয়া / করুণা / রহমত",
    englishMeaning: "Mercy / Compassion",
    exampleArabic: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ",
    exampleBangla: "এবং আমার রহমত সবকিছুকে পরিব্যাপ্ত করে আছে।",
  },
  {
    id: "v5",
    category: "Verbs",
    arabic: "يَقْرَأُ",
    banglaPronunciation: "ইয়াকরাউ",
    banglaMeaning: "সে পড়ছে / পড়ে",
    englishMeaning: "He reads / recites",
    exampleArabic: "يَقْرَأُ الطَّالِبُ الدَّرْسَ بِصَوْتٍ وَاضِحٍ",
    exampleBangla: "ছাত্রটি স্পষ্ট কণ্ঠে পাঠটি পড়ছে।",
  },
  {
    id: "v6",
    category: "Verbs",
    arabic: "يَكْتُبُ",
    banglaPronunciation: "ইয়াকতুবু",
    banglaMeaning: "সে লিখছে / লিখে",
    englishMeaning: "He writes",
    exampleArabic: "يَكْتُبُ التِّلْمِيذُ الْوَاجِبَ فِي الدَّفْتَرِ",
    exampleBangla: "শিক্ষার্থী খাতায় বাড়ির কাজ লিখছে।",
  },
  {
    id: "v7",
    category: "Daily",
    arabic: "اَلصَّبْرُ",
    banglaPronunciation: "আস-সাবরু",
    banglaMeaning: "ধৈর্য ও সহনশীলতা",
    englishMeaning: "Patience / Perseverance",
    exampleArabic: "اَلصَّبْرُ مِفْتَاحُ الْفَرَجِ",
    exampleBangla: "ধৈর্য হলো মুক্তির চাবিকাঠি।",
  },
  {
    id: "v8",
    category: "Education",
    arabic: "اَلْقَلَمُ",
    banglaPronunciation: "আল-কালামু",
    banglaMeaning: "কলম",
    englishMeaning: "The pen",
    exampleArabic: "اَلْقَلَمُ أَدَاةُ الْكِتَابَةِ وَالْعِلْمِ",
    exampleBangla: "কলম হলো লেখা ও জ্ঞানের মাধ্যম।",
  },
];

export default function VocabularyPage() {
  const { t, stats, toggleFavoriteVocab, markVocabLearned } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("ALL");
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filteredWords = VOCAB_WORDS.filter((w) => {
    const matchesCat =
      category === "ALL"
        ? true
        : category === "FAV"
        ? stats.favoriteVocab.includes(w.id)
        : w.category === category;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      w.arabic.includes(q) ||
      w.banglaMeaning.toLowerCase().includes(q) ||
      w.banglaPronunciation.toLowerCase().includes(q) ||
      w.englishMeaning.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const speakArabic = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const currentFlashcard = filteredWords[cardIndex % Math.max(filteredWords.length, 1)];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
              <Library className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-textPrimary bangla-text">
                {t("আরবি শব্দভাণ্ডার ও ফ্ল্যাশকার্ড", "Arabic Vocabulary & Flashcards", "بناء المفردات والبطاقات")}
              </h1>
              <p className="text-xs sm:text-sm text-textSecondary bangla-text">
                {t(
                  `শেখা হয়েছে: ${stats.learnedVocab.length} টি শব্দ • প্রিয় তালিকা: ${stats.favoriteVocab.length} টি`,
                  `Learned: ${stats.learnedVocab.length} words • Favorites: ${stats.favoriteVocab.length}`,
                  `الكلمات المتعلمة: ${stats.learnedVocab.length}`
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setFlashcardMode(!flashcardMode);
              setFlipped(false);
              setCardIndex(0);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-accentGold px-4 py-2.5 text-xs sm:text-sm font-bold text-black hover:opacity-95 transition"
          >
            <Layers className="h-4 w-4" />
            <span>
              {flashcardMode
                ? t("তালিকা ভিউতে ফিরুন", "Switch to List View", "عرض القائمة")
                : t("ফ্ল্যাশকার্ড রিভিশন মোড", "Flashcard Revision Mode", "وضع البطاقات")}
            </span>
          </button>
        </div>

        {/* Search & Category Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-textSecondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(
                "আরবি, বাংলা অর্থ বা ইংরেজি লিখে খুঁজুন...",
                "Search Arabic, Bangla, or English...",
                "ابحث عن كلمة..."
              )}
              className="w-full rounded-xl border border-borderColor bg-bgSecondary pl-10 pr-4 py-2.5 text-xs sm:text-sm text-textPrimary focus:border-accentGold focus:outline-none bangla-text"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "ALL", label: t("সব", "All", "الكل") },
              { id: "Daily", label: t("দৈনন্দিন", "Daily", "يومي") },
              { id: "Quranic", label: t("কুরআনিক", "Quranic", "قرآني") },
              { id: "Education", label: t("শিক্ষা", "Education", "تعليم") },
              { id: "Verbs", label: t("ক্রিয়া", "Verbs", "أفعال") },
              { id: "FAV", label: t("প্রিয় ❤️", "Favorites ❤️", "المفضلة") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategory(tab.id)}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  category === tab.id
                    ? "border-accentGold bg-accentPrimary text-white"
                    : "border-borderColor bg-bgSecondary text-textSecondary hover:text-textPrimary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flashcard Revision Mode */}
      {flashcardMode && currentFlashcard ? (
        <div className="mx-auto max-w-xl space-y-4">
          <div
            onClick={() => setFlipped(!flipped)}
            className="glass-card cursor-pointer rounded-3xl p-8 sm:p-12 text-center space-y-4 border-2 border-accentGold/40 hover:border-accentGold transition min-h-[280px] flex flex-col items-center justify-center"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-accentGold">
              {t(
                "কার্ডটি উল্টাতে ট্যাপ করুন (Spaced Revision)",
                "Tap card to flip (Spaced Revision)",
                "اضغط لقلب البطاقة"
              )}
            </span>

            {!flipped ? (
              <>
                <p dir="rtl" className="arabic-text text-4xl sm:text-5xl font-bold text-textPrimary py-3">
                  {currentFlashcard.arabic}
                </p>
                <p className="text-sm text-accentPrimary bangla-text">
                  {currentFlashcard.banglaPronunciation}
                </p>
              </>
            ) : (
              <div className="space-y-2">
                <p className="text-2xl font-bold text-accentGold bangla-text">
                  {currentFlashcard.banglaMeaning}
                </p>
                <p className="text-base text-textPrimary">{currentFlashcard.englishMeaning}</p>
                <p dir="rtl" className="arabic-text text-lg text-textSecondary pt-2">
                  {currentFlashcard.exampleArabic}
                </p>
                <p className="text-xs text-textSecondary bangla-text">
                  {currentFlashcard.exampleBangla}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => speakArabic(currentFlashcard.arabic)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-borderColor bg-bgSecondary px-4 py-2.5 text-xs font-bold text-accentGold"
            >
              <Volume2 className="h-4 w-4" />
              <span>{t("উচ্চারণ শুনুন", "Listen", "استمع")}</span>
            </button>

            <button
              onClick={() => {
                markVocabLearned(currentFlashcard.id);
                setFlipped(false);
                setCardIndex((prev) => (prev + 1) % filteredWords.length);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-accentPrimary px-4 py-2.5 text-xs font-bold text-white"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{t("মুখস্থ হয়েছে — পরবর্তী (+10 XP)", "Mastered — Next (+10 XP)", "التالي")}</span>
            </button>

            <button
              onClick={() => {
                setFlipped(false);
                setCardIndex((prev) => (prev + 1) % filteredWords.length);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-borderColor bg-bgSecondary px-4 py-2.5 text-xs font-semibold text-textPrimary"
            >
              <RotateCw className="h-4 w-4" />
              <span>{t("পরবর্তী কার্ড", "Next Card", "البطاقة التالية")}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Grid List Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWords.map((word) => {
            const isFav = stats.favoriteVocab.includes(word.id);
            const isLearned = stats.learnedVocab.includes(word.id);

            return (
              <div key={word.id} className="glass-card rounded-2xl p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="rounded-full border border-borderColor bg-bgSecondary px-2.5 py-0.5 text-[11px] font-semibold text-accentGold">
                      {word.category}
                    </span>
                    <p dir="rtl" className="arabic-text text-3xl font-bold text-textPrimary mt-2">
                      {word.arabic}
                    </p>
                    <p className="text-xs font-semibold text-accentPrimary bangla-text">
                      {word.banglaPronunciation}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => speakArabic(word.arabic)}
                      className="rounded-xl border border-borderColor bg-bgSecondary p-2.5 text-accentGold hover:border-accentGold transition"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleFavoriteVocab(word.id)}
                      className={`rounded-xl border p-2.5 transition ${
                        isFav
                          ? "border-red-500/50 bg-red-950/30 text-red-400"
                          : "border-borderColor bg-bgSecondary text-textSecondary hover:text-red-400"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isFav ? "fill-red-400" : ""}`} />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-base font-bold text-textPrimary bangla-text">
                    {word.banglaMeaning}
                  </p>
                  <p className="text-xs text-textSecondary">{word.englishMeaning}</p>
                </div>

                <div className="rounded-xl border border-borderColor/60 bg-bgPrimary/70 p-3 space-y-1">
                  <p dir="rtl" className="arabic-text text-lg text-accentGold">
                    {word.exampleArabic}
                  </p>
                  <p className="text-xs text-textSecondary bangla-text">{word.exampleBangla}</p>
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => markVocabLearned(word.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      isLearned
                        ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-300"
                        : "bg-accentPrimary text-white hover:opacity-95"
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>
                      {isLearned
                        ? t("শেখা সম্পন্ন (+10 XP)", "Learned (+10 XP)", "تم التعلم")
                        : t("শেখা হয়েছে চিহ্নিত করুন", "Mark as Learned", "تحديد كمتعلم")}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
