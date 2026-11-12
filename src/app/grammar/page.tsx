"use client";

import React, { useState } from "react";
import { GraduationCap, Volume2, BookOpen, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface GrammarTopic {
  id: string;
  branch: "Nahw" | "Sarf";
  titleBn: string;
  titleEn: string;
  titleAr: string;
  explanationBn: string;
  explanationEn: string;
  examples: {
    arabic: string;
    banglaPronunciation: string;
    banglaMeaning: string;
    breakdown: string;
  }[];
}

const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: "ism-fil-harf",
    branch: "Nahw",
    titleBn: "কালিমা বা পদ প্রকরণ: ইসম, ফে'ল ও হরফ",
    titleEn: "Parts of Speech: Ism, Fi'l & Harf",
    titleAr: "أَقْسَامُ الْكَلِمَةِ: اَلِاسْمُ وَالْفِعْلُ وَالْحَرْفُ",
    explanationBn:
      "আরবি ভাষায় অর্থবোধক শব্দকে 'কালিমা' বলে, যা ৩ প্রকার: ১. ইসম (اسم) — বিশেষ্য, বিশেষণ বা সর্বনাম যার মধ্যে কালের অর্থ নেই। ২. ফে'ল (فعل) — ক্রিয়া বা কাজ, যার সাথে অতীত, বর্তমান বা ভবিষ্যৎ কাল যুক্ত থাকে। ৩. হরফ (حرف) — অব্যয়, যা একা পূর্ণ অর্থ দেয় না বরং ইসম ও ফে'লকে যুক্ত করে।",
    explanationEn:
      "Meaningful Arabic words (Kalimah) fall into three categories: Ism (noun/adjective/pronoun without tense), Fi'l (verb carrying tense), and Harf (particle connecting words).",
    examples: [
      {
        arabic: "ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ",
        banglaPronunciation: "যাহাবাত ত্বালিবু ইলাল মাদ্রাসাতি",
        banglaMeaning: "ছাত্রটি বিদ্যালয়ে গিয়েছে।",
        breakdown: "ذَهَبَ (ফে'ল - ক্রিয়া) + الطَّالِبُ (ইসম - বিশেষ্য) + إِلَى (হরফ - অব্যয়) + الْمَدْرَسَةِ (ইসম)",
      },
    ],
  },
  {
    id: "jumla-ismiyyah",
    branch: "Nahw",
    titleBn: "জুমলা ইসমিয়্যাহ: মুবতাদা ও খবর",
    titleEn: "Nominal Sentence: Mubtada & Khabar",
    titleAr: "اَلْجُمْلَةُ الِاسْمِيَّةُ: اَلْمُبْتَدَأُ وَالْخَبَرُ",
    explanationBn:
      "যে বাক্য ইসম (বিশেষ্য) দিয়ে শুরু হয় তাকে 'জুমলা ইসমিয়্যাহ' বলে। এর প্রথম অংশকে মুবতাদা (উদ্দেশ্য) এবং দ্বিতীয় অংশকে খবর (বিধেয়) বলে। মুবতাদা ও খবর উভয়ই সাধারণত মারফু (শেষে পেশ/দাম্মাহ যুক্ত) হয়।",
    explanationEn:
      "A sentence starting with a noun is Jumla Ismiyyah. It consists of Mubtada (subject, usually definite) and Khabar (predicate, usually indefinite), both in the nominative (Raf') state.",
    examples: [
      {
        arabic: "اَلْكِتَابُ مُفِيدٌ",
        banglaPronunciation: "আলকিতাবু মুফীদুন",
        banglaMeaning: "বইটি উপকারী।",
        breakdown: "اَلْكِتَابُ = মুবতাদা (মারফু) | مُفِيدٌ = খবর (মারফু)",
      },
      {
        arabic: "اَللَّهُ رَبُّنَا",
        banglaPronunciation: "আল্লাহু রাব্বুনা",
        banglaMeaning: "আল্লাহ আমাদের প্রতিপালক।",
        breakdown: "اَللَّهُ = মুবতাদা | رَبُّنَا = খবর",
      },
    ],
  },
  {
    id: "jumla-filiyyah",
    branch: "Nahw",
    titleBn: "জুমলা ফে'লিয়্যাহ: ফে'ল, ফায়েল ও মাফউল",
    titleEn: "Verbal Sentence: Fi'l, Fa'il & Maf'ul",
    titleAr: "اَلْجُمْلَةُ الْفِعْلِيَّةُ: اَلْفِعْلُ وَالْفَاعِلُ وَالْمَفْعُولُ بِهِ",
    explanationBn:
      "যে বাক্য ফে'ল (ক্রিয়া) দিয়ে শুরু হয় তাকে 'জুমলা ফে'লিয়্যাহ' বলে। যিনি কাজ করেন তিনি ফায়েল (কর্তা — সর্বদা মারফু/পেশযুক্ত) এবং যার ওপর কাজ পতিত হয় তা মাফউল বিহি (কর্ম — সর্বদা মানসুব/যবরযুক্ত)।",
    explanationEn:
      "A sentence starting with a verb is Jumla Fi'liyyah. The doer is Fa'il (nominative/Raf') and the object is Maf'ul Bihi (accusative/Nasb).",
    examples: [
      {
        arabic: "قَرَأَ مُحَمَّدٌ الْقُرْآنَ",
        banglaPronunciation: "কারাআ মুহাম্মাদুনিল কুরআনা",
        banglaMeaning: "মুহাম্মদ কুরআন তিলাওয়াত করেছেন।",
        breakdown: "قَرَأَ (ফে'ল) + مُحَمَّدٌ (ফায়েল - মারফু) + الْقُرْآنَ (মাফউল বিহি - মানসুব)",
      },
    ],
  },
  {
    id: "irab-particles",
    branch: "Nahw",
    titleBn: "ই'রাব (বিভক্তি) এবং আরবি হরফসমূহ",
    titleEn: "I'rab (Case Endings) & Arabic Particles",
    titleAr: "اَلْإِعْرَابُ وَحُرُوفُ الْجَرِّ",
    explanationBn:
      "বাক্যে অবস্থানের কারণে শব্দের শেষ অক্ষরের হরকত পরিবর্তন হওয়াকে ই'রাব বলে: রাফ' (পেশ ُ), নাসব (যবর َ), এবং জার (যের ِ)। হরফে জার (مِنْ, إِلَى, عَنْ, عَلَى, فِي, بِـ, لِـ) কোনো ইসমের পূর্বে বসলে সেই ইসমকে মাজরুর (যেরযুক্ত) করে দেয়।",
    explanationEn:
      "I'rab is the grammatical case ending of words: Raf' (Damma), Nasb (Fatha), and Jarr (Kasra). Prepositions (Huruf al-Jarr) put the following noun into the Jarr case.",
    examples: [
      {
        arabic: "اَلْقَلَمُ عَلَى الْمَكْتَبِ فِي الْغُرْفَةِ",
        banglaPronunciation: "আলকালামু আলাল মাকতাবি ফিল গুরফাতি",
        banglaMeaning: "কলমটি কক্ষের ভেতরে টেবিলের উপরে আছে।",
        breakdown: "عَلَى ও فِي হলো হরফে জার, তাই الْمَكْتَبِ ও الْغُرْفَةِ-এর শেষে যের (কাসরা) হয়েছে।",
      },
    ],
  },
  {
    id: "number-gender",
    branch: "Sarf",
    titleBn: "বচন: ওয়াহিদ (একবচন), তাসনিয়াহ (দ্বিবচন) ও জাম' (বহুবচন)",
    titleEn: "Number: Singular, Dual & Plural",
    titleAr: "اَلْمُفْرَدُ وَالْمُثَنَّى وَالْجَمْعُ",
    explanationBn:
      "আরবি ভাষায় বচন ৩ প্রকার (ইংরেজি ও বাংলার মতো ২ প্রকার নয়): ১. ওয়াহিদ (একবচন), ২. তাসনিয়াহ (দ্বিবচন — শেষে انِ বা يْنِ যুক্ত হয়), ৩. জাম' (বহুবচন — সালাম বা মুকাসসার)।",
    explanationEn:
      "Arabic distinguishes three grammatical numbers: Singular (Mufrad), Dual (Muthanna — formed with -ani/-ayni), and Plural (Jam').",
    examples: [
      {
        arabic: "مُسْلِمٌ (একজন মুসলিম) — مُسْلِمَانِ (দুজন মুসলিম) — مُسْلِمُونَ (অনেক মুসলিম)",
        banglaPronunciation: "মুসলিমুন — মুসলিমানি — মুসলিমূনা",
        banglaMeaning: "একজন মুসলিম — দুজন মুসলিম — সকল মুসলিম",
        breakdown: "পুংলিঙ্গ একবচন, দ্বিবচন ও বহুবচনের রূপান্তর।",
      },
      {
        arabic: "طَالِبَةٌ (একজন ছাত্রী) — طَالِبَتَانِ (দুজন ছাত্রী) — طَالِبَاتٌ (অনেক ছাত্রী)",
        banglaPronunciation: "ত্বালিবাতুন — ত্বালিবাতানি — ত্বালিবাতুন",
        banglaMeaning: "একজন ছাত্রী — দুজন ছাত্রী — সকল ছাত্রী",
        breakdown: "স্ত্রীলিঙ্গ একবচন, দ্বিবচন ও বহুবচনের রূপান্তর।",
      },
    ],
  },
  {
    id: "pronouns-conjugation",
    branch: "Sarf",
    titleBn: "সর্বনাম (দমীর) ও ক্রিয়া রূপান্তর (তাসরিফ)",
    titleEn: "Pronouns & Verb Conjugation",
    titleAr: "اَلضَّمَائِرُ وَتَصْرِيفُ الْأَفْعَالِ",
    explanationBn:
      "সর্বনাম বা দমীর (هُوَ সে, هِيَ সে স্ত্রী, أَنْتَ তুমি, أَنَا আমি, نَحْنُ আমরা) অনুযায়ী অতীত (মাযী) ও বর্তমান-ভবিষ্যৎ (মুদারি) ক্রিয়ার রূপ পরিবর্তিত হয়। মূল ধাতু ك-ت-ب (লেখা) দিয়ে নিচে রূপান্তর দেখুন।",
    explanationEn:
      "Arabic verbs conjugate according to person, gender, and number using prefixes and suffixes attached to the 3-letter root (e.g., ك-ت-ب).",
    examples: [
      {
        arabic: "هُوَ كَتَبَ / يَكْتُبُ — أَنْتَ كَتَبْتَ / تَكْتُبُ — أَنَا كَتَبْتُ / أَكْتُبُ — نَحْنُ كَتَبْنَا / نَكْتُبُ",
        banglaPronunciation:
          "হুয়া কাতাবা/ইয়াকতুবু — আনতা কাতাবতা/তাকতুবু — আনা কাতাবতু/আকতুবু — নাহনু কাতাবনা/নাকতুবু",
        banglaMeaning:
          "সে লিখেছে/লিখছে — তুমি লিখেছ/লিখছ — আমি লিখেছি/লিখছি — আমরা লিখেছি/লিখছি",
        breakdown: "মূল ধাতু (الجذر): ك ت ب (লিখা)",
      },
    ],
  },
];

export default function GrammarPage() {
  const { t, addXP } = useApp();
  const [filter, setFilter] = useState<"ALL" | "Nahw" | "Sarf">("ALL");
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const visibleTopics = GRAMMAR_TOPICS.filter(
    (item) => filter === "ALL" || item.branch === filter
  );

  const speakArabic = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const markMastered = (id: string) => {
    if (masteredIds.includes(id)) return;
    setMasteredIds((prev) => [...prev, id]);
    addXP(30);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-textPrimary bangla-text">
                {t("আরবি ব্যাকরণ — নাহু ও সরফ", "Arabic Grammar — Nahw & Sarf", "قواعد اللغة العربية — النحو والصرف")}
              </h1>
              <p className="text-xs sm:text-sm text-textSecondary bangla-text">
                {t(
                  "সহজ বাংলায় ইসম, ফে'ল, হরফ, মুবতাদা-খবর, ই'রাব, বচন ও ক্রিয়া রূপান্তর শিখুন।",
                  "Master Ism, Fi'l, Harf, Mubtada-Khabar, I'rab, Number & Verb Conjugation.",
                  "تعلم قواعد النحو والصرف بأسلوب مبسط وأمثلة مشكولة."
                )}
              </p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-1.5 rounded-xl border border-borderColor bg-bgSecondary p-1">
            {(["ALL", "Nahw", "Sarf"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  filter === tab
                    ? "bg-accentPrimary text-white"
                    : "text-textSecondary hover:text-textPrimary"
                }`}
              >
                {tab === "ALL"
                  ? t("সব বিষয়", "All Topics", "الكل")
                  : tab === "Nahw"
                  ? t("নাহু (বাক্যতত্ত্ব)", "Nahw (Syntax)", "النحو")
                  : t("সরফ (রূপতত্ত্ব)", "Sarf (Morphology)", "الصرف")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grammar Cards */}
      <div className="space-y-5">
        {visibleTopics.map((topic) => {
          const isMastered = masteredIds.includes(topic.id);
          return (
            <div key={topic.id} className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <span className="inline-block rounded-full border border-accentGold/40 bg-bgSecondary px-2.5 py-0.5 text-[11px] font-bold text-accentGold mb-2">
                    {topic.branch === "Nahw"
                      ? t("নাহু (علم النحو)", "Nahw", "النحو")
                      : t("সরফ (علم الصرف)", "Sarf", "الصرف")}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-textPrimary bangla-text">
                    {t(topic.titleBn, topic.titleEn, topic.titleAr)}
                  </h2>
                  <p dir="rtl" className="arabic-text text-lg text-accentGold mt-1">
                    {topic.titleAr}
                  </p>
                </div>

                <button
                  onClick={() => markMastered(topic.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                    isMastered
                      ? "bg-emerald-600/20 border border-emerald-500/40 text-emerald-300"
                      : "bg-accentPrimary text-white hover:opacity-95"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {isMastered
                      ? t("আয়ত্ত হয়েছে (+30 XP)", "Mastered (+30 XP)", "تم الإتقان")
                      : t("পাঠ সম্পন্ন করুন", "Mark Mastered", "إتمام الدرس")}
                  </span>
                </button>
              </div>

              <p className="text-sm text-textSecondary bangla-text leading-relaxed">
                {t(topic.explanationBn, topic.explanationEn, topic.explanationBn)}
              </p>

              {/* Examples */}
              <div className="space-y-3 pt-2">
                {topic.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-borderColor bg-bgPrimary/75 p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p dir="rtl" className="arabic-text text-xl sm:text-2xl font-bold text-accentGold">
                        {ex.arabic}
                      </p>
                      <button
                        onClick={() => speakArabic(ex.arabic)}
                        className="shrink-0 rounded-lg border border-borderColor bg-bgSecondary p-2 text-accentPrimary hover:border-accentGold transition"
                        title={t("উচ্চারণ শুনুন", "Listen", "استمع")}
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs font-medium text-accentPrimary bangla-text">
                      {ex.banglaPronunciation}
                    </p>
                    <p className="text-xs sm:text-sm text-textPrimary bangla-text">
                      {ex.banglaMeaning}
                    </p>
                    <p className="text-xs text-textSecondary flex items-center gap-1.5 pt-1 border-t border-borderColor/40 bangla-text">
                      <BookOpen className="h-3.5 w-3.5 text-accentGold shrink-0" />
                      <span>{ex.breakdown}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
