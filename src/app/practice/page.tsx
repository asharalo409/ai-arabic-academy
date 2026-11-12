"use client";

import React, { useState } from "react";
import {
  PenTool,
  BookOpen,
  Languages,
  Volume2,
  Sparkles,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function PracticePage() {
  const { lang, t, addXP, addStudyMinutes } = useApp();
  const [activeTab, setActiveTab] = useState<"reading" | "writing" | "translation">("reading");
  const [showTranslation, setShowTranslation] = useState(false);

  // Writing state
  const [writingInput, setWritingInput] = useState("");
  const [writingFeedback, setWritingFeedback] = useState<string | null>(null);
  const [writingLoading, setWritingLoading] = useState(false);

  // Translation state
  const [translationIndex, setTranslationIndex] = useState(0);
  const [translationInput, setTranslationInput] = useState("");
  const [translationFeedback, setTranslationFeedback] = useState<string | null>(null);
  const [translationLoading, setTranslationLoading] = useState(false);

  const readingPassage = {
    titleBn: "পাঠ: জ্ঞানের গুরুত্ব ও সময়ের সদ্ব্যবহার",
    arabic:
      "اَلْوَقْتُ كَنْزٌ ثَمِينٌ فِي حَيَاةِ الْإِنْسَانِ. اَلطَّالِبُ الْمُجْتَهِدُ يُنَظِّمُ وَقْتَهُ بَيْنَ قِرَاءَةِ الْقُرْآنِ الْكَرِيمِ وَدِرَاسَةِ الْعُلُومِ النَّافِعَةِ. مَنْ يَجْتَهِدْ فِي صِغَرِهِ يَنْجَحْ فِي كِبَرِهِ بِإِذْنِ اللَّهِ.",
    banglaPronunciation:
      "আল-ওয়াকতু কানযুন সামীনুন ফী হায়াতিল ইনসান। আত-ত্বালিবুল মুজতাহিদু ইউনাযযিমু ওয়াকতাহু বাইনা কিরাআতিল কুরআনিল কারীমি ওয়া দিরাসাতিল উলূমিন নাফিআহ। মান ইয়াজতাহিদ ফী সিগারিহি ইয়ানজাহ ফী কিবারিহি বিইযনিল্লাহ।",
    banglaTranslation:
      "মানুষের জীবনে সময় একটি মূল্যবান সম্পদ। পরিশ্রমী ছাত্র পবিত্র কুরআন তিলাওয়াত এবং উপকারী জ্ঞান-বিজ্ঞান অধ্যয়নের মাঝে তার সময়কে সুশৃঙ্খলভাবে ভাগ করে নেয়। যে ব্যক্তি ছোটবেলায় পরিশ্রম করে, সে আল্লাহর ইচ্ছায় বড় হয়ে সফল হয়।",
  };

  const translationTasks = [
    {
      direction: "Bangla → Arabic",
      prompt: "আমি প্রতিদিন সকালে আরবি ভাষা ও পবিত্র কুরআন অধ্যয়ন করি।",
      hint: "أَدْرُسُ (আমি অধ্যয়ন করি), كُلَّ صَبَاحٍ (প্রতিদিন সকালে)",
    },
    {
      direction: "Arabic → Bangla",
      prompt: "اَلصِّدْقُ يُنْجِي صَاحِبَهُ فِي الدُّنْيَا وَالْآخِرَةِ",
      hint: "اَلصِّدْقُ (সত্যবাদিতা), يُنْجِي (মুক্তি দেয়)",
    },
    {
      direction: "English → Arabic",
      prompt: "Knowledge is light and ignorance is darkness.",
      hint: "اَلْعِلْمُ (জ্ঞান), نُورٌ (আলো), اَلْجَهْلُ (অজ্ঞতা)",
    },
  ];

  const speakArabic = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const evaluateWriting = async () => {
    if (!writingInput.trim() || writingLoading) return;
    setWritingLoading(true);
    setWritingFeedback(null);

    try {
      const res = await fetch("/api/ai-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Please review and correct this student's Arabic writing submission:\n"${writingInput}"\n\nProvide:\n1. Corrected version with FULL HARAKAT.\n2. Detailed Nahw/Sarf grammar explanation of corrections in ${lang === "bn" ? "Bangla" : lang === "ar" ? "Arabic" : "English"}.`,
          level: "Intermediate",
          mode: "correction",
          lang,
        }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setWritingFeedback(data.reply);
        addXP(25);
        addStudyMinutes(5);
      } else {
        setWritingFeedback(data?.error || "Error evaluating writing.");
      }
    } catch {
      setWritingFeedback("Network error.");
    } finally {
      setWritingLoading(false);
    }
  };

  const evaluateTranslation = async () => {
    if (!translationInput.trim() || translationLoading) return;
    setTranslationLoading(true);
    setTranslationFeedback(null);
    const currentTask = translationTasks[translationIndex];

    try {
      const res = await fetch("/api/ai-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Evaluate this translation exercise (${currentTask.direction}).\nSource text: "${currentTask.prompt}"\nStudent translation: "${translationInput}"\n\nProvide the ideal model translation (with FULL HARAKAT for Arabic) and explain any grammar or vocabulary improvements in ${lang === "bn" ? "Bangla" : lang === "ar" ? "Arabic" : "English"}.`,
          level: "Intermediate",
          mode: "translation",
          lang,
        }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setTranslationFeedback(data.reply);
        addXP(25);
        addStudyMinutes(4);
      } else {
        setTranslationFeedback(data?.error || "Error evaluating translation.");
      }
    } catch {
      setTranslationFeedback("Network error.");
    } finally {
      setTranslationLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      {/* Header & Tabs */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-textPrimary bangla-text">
          {t("পঠন, লিখন ও অনুবাদ অনুশীলন", "Reading, Writing & Translation Practice", "تدريبات القراءة والكتابة والترجمة")}
        </h1>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("reading")}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
              activeTab === "reading"
                ? "border-accentGold bg-accentPrimary text-white"
                : "border-borderColor bg-bgSecondary text-textSecondary hover:text-textPrimary"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>{t("পঠন (Reading)", "Reading", "القراءة")}</span>
          </button>

          <button
            onClick={() => setActiveTab("writing")}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
              activeTab === "writing"
                ? "border-accentGold bg-accentPrimary text-white"
                : "border-borderColor bg-bgSecondary text-textSecondary hover:text-textPrimary"
            }`}
          >
            <PenTool className="h-4 w-4" />
            <span>{t("লিখন (Writing)", "Writing", "الكتابة")}</span>
          </button>

          <button
            onClick={() => setActiveTab("translation")}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
              activeTab === "translation"
                ? "border-accentGold bg-accentPrimary text-white"
                : "border-borderColor bg-bgSecondary text-textSecondary hover:text-textPrimary"
            }`}
          >
            <Languages className="h-4 w-4" />
            <span>{t("অনুবাদ (Translation)", "Translation", "الترجمة")}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: READING */}
      {activeTab === "reading" && (
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-accentGold bangla-text">
              {readingPassage.titleBn}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => speakArabic(readingPassage.arabic)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-accentPrimary px-3.5 py-2 text-xs font-bold text-white"
              >
                <Volume2 className="h-4 w-4" />
                <span>{t("পাঠ শুনুন", "Listen Passage", "استمع للنص")}</span>
              </button>
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-borderColor bg-bgSecondary px-3.5 py-2 text-xs font-semibold text-textPrimary"
              >
                {showTranslation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>
                  {showTranslation
                    ? t("অনুবাদ লুকান", "Hide Translation", "إخفاء الترجمة")
                    : t("বাংলা অর্থ ও উচ্চারণ দেখুন", "Show Meaning", "إظهار المعنى")}
                </span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-borderColor bg-bgPrimary/80 p-5">
            <p dir="rtl" className="arabic-text text-2xl sm:text-3xl font-bold text-textPrimary leading-loose">
              {readingPassage.arabic}
            </p>
          </div>

          {showTranslation && (
            <div className="rounded-2xl border border-accentGold/30 bg-bgSecondary/70 p-4 space-y-2 bangla-text">
              <p className="text-xs sm:text-sm font-medium text-accentPrimary">
                <strong>উচ্চারণ:</strong> {readingPassage.banglaPronunciation}
              </p>
              <p className="text-sm text-textPrimary">
                <strong>অনুবাদ:</strong> {readingPassage.banglaTranslation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WRITING */}
      {activeTab === "writing" && (
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-textPrimary bangla-text">
            {t(
              "আরবি রচনা ও বাক্য লিখন (AI সংশোধনসহ)",
              "Arabic Writing Practice (with AI Correction)",
              "تدريب الكتابة مع التصحيح الذكي"
            )}
          </h2>
          <p className="text-xs sm:text-sm text-textSecondary bangla-text">
            {t(
              "বিষয়: 'আমার দৈনন্দিন রুটিন' বা 'জ্ঞান অর্জনের গুরুত্ব' সম্পর্কে ২–৪টি আরবি বাক্য লিখুন। উস্তাদ তারিক পূর্ণ হরকত ও ব্যাকরণসহ সংশোধন করে দেবেন।",
              "Topic: Write 2-4 Arabic sentences about 'My Daily Routine' or 'Seeking Knowledge'. Ustad Tariq will correct them with full Harakat.",
              "اكتب ٢-٤ جمل باللغة العربية وسيقوم المعلم الذكي بتصحيحها."
            )}
          </p>

          <textarea
            dir="rtl"
            rows={4}
            value={writingInput}
            onChange={(e) => setWritingInput(e.target.value)}
            placeholder="اُكْتُبْ جُمَلًا بِالْعَرَبِيَّةِ هُنَا..."
            className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 p-4 arabic-text text-xl text-textPrimary focus:border-accentGold focus:outline-none"
          />

          <button
            onClick={evaluateWriting}
            disabled={!writingInput.trim() || writingLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-accentGold px-5 py-3 text-xs sm:text-sm font-bold text-black disabled:opacity-40"
          >
            {writingLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            <span>{t("AI দিয়ে লেখা যাচাই ও সংশোধন করুন (+25 XP)", "Check & Correct Writing (+25 XP)", "تصحيح الكتابة")}</span>
          </button>

          {writingFeedback && (
            <div className="rounded-xl border border-accentGold/40 bg-bgSecondary p-4 text-sm text-textPrimary whitespace-pre-wrap leading-relaxed bangla-text">
              {writingFeedback}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TRANSLATION */}
      {activeTab === "translation" && (
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-textPrimary bangla-text">
              {t("ত্রিভাষিক অনুবাদ অনুশীলন", "Trilingual Translation Practice", "تدريب الترجمة")}
            </h2>
            <div className="flex gap-1.5">
              {translationTasks.map((task, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranslationIndex(idx);
                    setTranslationInput("");
                    setTranslationFeedback(null);
                  }}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${
                    translationIndex === idx
                      ? "border-accentGold bg-accentPrimary text-white"
                      : "border-borderColor bg-bgSecondary text-textSecondary"
                  }`}
                >
                  #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-borderColor bg-bgPrimary/80 p-4 space-y-1.5">
            <span className="text-xs font-bold text-accentGold">
              {translationTasks[translationIndex].direction}
            </span>
            <p className="text-base sm:text-lg font-bold text-textPrimary bangla-text">
              {translationTasks[translationIndex].prompt}
            </p>
            <p className="text-xs text-textSecondary bangla-text">
              💡 Hint: {translationTasks[translationIndex].hint}
            </p>
          </div>

          <textarea
            rows={3}
            value={translationInput}
            onChange={(e) => setTranslationInput(e.target.value)}
            placeholder={t("এখানে আপনার অনুবাদ লিখুন...", "Type your translation here...", "اكتب ترجمتك هنا...")}
            className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 p-3.5 text-sm text-textPrimary focus:border-accentGold focus:outline-none bangla-text"
          />

          <button
            onClick={evaluateTranslation}
            disabled={!translationInput.trim() || translationLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-accentPrimary px-5 py-3 text-xs sm:text-sm font-bold text-white disabled:opacity-40"
          >
            {translationLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            <span>{t("অনুবাদ মূল্যায়ন করুন (+25 XP)", "Evaluate Translation (+25 XP)", "تقييم الترجمة")}</span>
          </button>

          {translationFeedback && (
            <div className="rounded-xl border border-accentGold/40 bg-bgSecondary p-4 text-sm text-textPrimary whitespace-pre-wrap leading-relaxed bangla-text">
              {translationFeedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
