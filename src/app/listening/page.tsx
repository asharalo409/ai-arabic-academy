"use client";

import React, { useEffect, useState } from "react";
import {
  Headphones,
  Play,
  Square,
  RotateCcw,
  Turtle,
  CheckCircle2,
  AlertTriangle,
  Volume2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface ListeningItem {
  id: string;
  category: "word" | "sentence" | "conversation";
  arabic: string;
  banglaPronunciation: string;
  banglaMeaning: string;
  englishMeaning: string;
  questionBn: string;
  questionEn: string;
  options: string[];
  correctIndex: number;
}

const LISTENING_DATA: ListeningItem[] = [
  {
    id: "l1",
    category: "word",
    arabic: "اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    banglaPronunciation: "আলহামদু লিল্লাহি রাব্বিল আলামীন",
    banglaMeaning: "সমস্ত প্রশংসা জগতসমূহের প্রতিপালক আল্লাহর জন্য।",
    englishMeaning: "All praise belongs to Allah, Lord of all worlds.",
    questionBn: "অডিওতে কোন শব্দগুচ্ছটি উচ্চারিত হয়েছে?",
    questionEn: "Which phrase was spoken in the audio?",
    options: [
      "সমস্ত প্রশংসা আল্লাহর জন্য",
      "আমি বিদ্যালয়ে যাচ্ছি",
      "বইটি টেবিলের উপরে",
    ],
    correctIndex: 0,
  },
  {
    id: "l2",
    category: "sentence",
    arabic: "يَذْهَبُ الطَّالِبُ إِلَى الْجَامِعَةِ كُلَّ صَبَاحٍ لِطَلَبِ الْعِلْمِ",
    banglaPronunciation: "ইয়াযহাবুত ত্বালিবু ইলাল জামিআতি কুল্লা সাবাহিন লিত্বালাবিল ইলম",
    banglaMeaning: "ছাত্রটি জ্ঞান অর্জনের জন্য প্রতিদিন সকালে বিশ্ববিদ্যালয়ে যায়।",
    englishMeaning: "The student goes to the university every morning to seek knowledge.",
    questionBn: "ছাত্রটি প্রতিদিন সকালে কোথায় যায়?",
    questionEn: "Where does the student go every morning?",
    options: ["বাজারে (السوق)", "বিশ্ববিদ্যালয়ে (الجامعة)", "খেলার মাঠে (الملعب)"],
    correctIndex: 1,
  },
  {
    id: "l3",
    category: "conversation",
    arabic:
      "أَحْمَدُ: السَّلَامُ عَلَيْكُمْ يَا يُوسُفُ، كَيْفَ حَالُكَ الْيَوْمَ؟ يُوسُفُ: وَعَلَيْكُمُ السَّلَامُ، أَنَا بِخَيْرٍ وَالْحَمْدُ لِلَّهِ، أَقْرَأُ الْقُرْآنَ الْكَرِيمَ.",
    banglaPronunciation:
      "আহমাদ: আসসালামু আলাইকুম ইয়া ইউসুফ, কাইফা হালুকাল ইয়াওম? ইউসুফ: ওয়া আলাইকুমুস সালাম, আনা বিখাইরিন ওয়ালহামদুলিল্লাহ, আকরাউল কুরআনাল কারীম।",
    banglaMeaning:
      "আহমাদ: হে ইউসুফ, তোমার ওপর শান্তি বর্ষিত হোক, আজ কেমন আছ? ইউসুফ: তোমার ওপরও শান্তি বর্ষিত হোক, আলহামদুলিল্লাহ আমি ভালো আছি, আমি পবিত্র কুরআন তিলাওয়াত করছি।",
    englishMeaning:
      "Ahmad: Peace be upon you Yusuf, how are you today? Yusuf: And upon you be peace, I am well praise be to Allah, I am reciting the Noble Quran.",
    questionBn: "কথোপকথনে ইউসুফ কী করছিলেন?",
    questionEn: "What was Yusuf doing in the conversation?",
    options: ["ঘুমাচ্ছিলেন", "পবিত্র কুরআন তিলাওয়াত করছিলেন", "খাবার খাচ্ছিলেন"],
    correctIndex: 1,
  },
  {
    id: "l4",
    category: "sentence",
    arabic: "اَللُّغَةُ الْعَرَبِيَّةُ لُغَةُ الْقُرْآنِ الْكَرِيمِ وَهِيَ لُغَةٌ جَمِيلَةٌ وَغَنِيَّةٌ",
    banglaPronunciation:
      "আল্লুগাতুল আরাবিয়্যাতু লুগাতুল কুরআনিল কারীমি ওয়া হিয়া লুগাতুন জামীলাতুন ওয়া গানিয়্যাহ",
    banglaMeaning: "আরবি ভাষা পবিত্র কুরআনের ভাষা এবং এটি একটি সুন্দর ও সমৃদ্ধ ভাষা।",
    englishMeaning:
      "The Arabic language is the language of the Noble Quran and it is a beautiful and rich language.",
    questionBn: "বাক্যটিতে আরবি ভাষাকে কিসের ভাষা বলা হয়েছে?",
    questionEn: "What is the Arabic language described as in the sentence?",
    options: ["পবিত্র কুরআনের ভাষা", "শুধু ব্যবসার ভাষা", "অপ্রচলিত ভাষা"],
    correctIndex: 0,
  },
];

export default function ListeningPage() {
  const { t, addXP, addStudyMinutes } = useApp();
  const [speechSupported, setSpeechSupported] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showTextMap, setShowTextMap] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSpeechSupported(false);
    }
  }, []);

  const playAudio = (item: ListeningItem, rate: number) => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(item.arabic);
    utterance.lang = "ar-SA";
    utterance.rate = rate;
    utterance.onstart = () => setPlayingId(item.id);
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);
    window.speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    setPlayingId(null);
  };

  const handleAnswer = (item: ListeningItem, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [item.id]: optionIndex }));
    if (optionIndex === item.correctIndex && !completedIds.includes(item.id)) {
      setCompletedIds((prev) => [...prev, item.id]);
      addXP(20);
      addStudyMinutes(3);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <div className="glass-card rounded-2xl p-6 space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
            <Headphones className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-textPrimary bangla-text">
              {t("আরবি শ্রবণ অনুশীলন", "Arabic Listening Practice", "تدريب الاستماع العربي")}
            </h1>
            <p className="text-xs sm:text-sm text-textSecondary bangla-text">
              {t(
                "স্বাভাবিক ও ধীর গতিতে আরবি উচ্চারণ শুনুন, বাংলা অর্থ দেখুন এবং শ্রবণ কুইজের উত্তর দিন।",
                "Listen at normal or slow speed, view Bangla pronunciation, and test your comprehension.",
                "استمع بالسرعة العادية أو البطيئة وأجب عن أسئلة الفهم."
              )}
            </p>
          </div>
        </div>
      </div>

      {!speechSupported && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/40 bg-amber-950/30 p-4 text-sm text-amber-200">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
          <p className="bangla-text">
            {t(
              "আপনার বর্তমান ব্রাউজার বিল্ট-ইন স্পিচ সিন্থেসিস সমর্থন করছে না। নিচের আরবি হরকত ও বাংলা উচ্চারণ দেখে অনুশীলন করতে পারবেন, অথবা Google Chrome ব্যবহার করুন।",
              "Your current browser does not support Web Speech Synthesis. You can still study the vowelized Arabic text and Bangla pronunciation below, or open in Google Chrome.",
              "متصفحك الحالي لا يدعم النطق الصوتي المدمج. يمكنك القراءة بالتشكيل الكامل أدناه."
            )}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {LISTENING_DATA.map((item, idx) => {
          const isRevealed = !!showTextMap[item.id];
          const chosen = selectedAnswers[item.id];
          const isSolved = completedIds.includes(item.id);

          return (
            <div key={item.id} className="glass-card rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full border border-accentGold/30 bg-bgSecondary px-3 py-1 text-xs font-semibold text-accentGold uppercase">
                  #{idx + 1} • {item.category}
                </span>
                {isSolved && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accentPrimary">
                    <CheckCircle2 className="h-4 w-4" />
                    {t("সম্পন্ন (+20 XP)", "Completed (+20 XP)", "مكتمل")}
                  </span>
                )}
              </div>

              {/* Audio Controls */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => playAudio(item, 0.95)}
                  disabled={!speechSupported}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-accentPrimary px-4 py-2.5 text-xs font-bold text-white disabled:opacity-40 hover:opacity-95 transition"
                >
                  <Play className="h-4 w-4" />
                  <span>{t("স্বাভাবিক গতি", "Normal Speed", "سرعة عادية")}</span>
                </button>

                <button
                  onClick={() => playAudio(item, 0.6)}
                  disabled={!speechSupported}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-accentGold/40 bg-bgSecondary px-4 py-2.5 text-xs font-bold text-accentGold disabled:opacity-40 hover:bg-accentGold/10 transition"
                >
                  <Turtle className="h-4 w-4" />
                  <span>{t("ধীর গতি (Slow)", "Slow Playback", "بطيء")}</span>
                </button>

                <button
                  onClick={() => playAudio(item, 0.85)}
                  disabled={!speechSupported}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-borderColor bg-bgSecondary px-3 py-2.5 text-xs font-medium text-textPrimary disabled:opacity-40"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{t("আবার শুনুন", "Repeat", "إعادة")}</span>
                </button>

                {playingId === item.id && (
                  <button
                    onClick={stopAudio}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3 py-2.5 text-xs font-bold text-white"
                  >
                    <Square className="h-3.5 w-3.5" />
                    <span>{t("থামান", "Stop", "إيقاف")}</span>
                  </button>
                )}

                <button
                  onClick={() =>
                    setShowTextMap((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                  }
                  className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-borderColor bg-bgPrimary/70 px-3 py-2 text-xs font-semibold text-textSecondary hover:text-textPrimary"
                >
                  <Volume2 className="h-3.5 w-3.5 text-accentPrimary" />
                  <span>
                    {isRevealed
                      ? t("লেখা লুকান", "Hide Transcript", "إخفاء النص")
                      : t("আরবি ও বাংলা অর্থ দেখুন", "Show Transcript", "إظهار النص")}
                  </span>
                </button>
              </div>

              {/* Transcript & Bangla Pronunciation */}
              {isRevealed && (
                <div className="rounded-xl border border-borderColor bg-bgPrimary/75 p-4 space-y-2">
                  <p dir="rtl" className="arabic-text text-xl sm:text-2xl font-bold text-accentGold">
                    {item.arabic}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-accentPrimary bangla-text">
                    {t("উচ্চারণ:", "Pronunciation:", "النطق:")} {item.banglaPronunciation}
                  </p>
                  <p className="text-xs sm:text-sm text-textPrimary bangla-text">
                    {t("বাংলা অর্থ:", "Bangla Meaning:", "المعنى:")} {item.banglaMeaning}
                  </p>
                  <p className="text-xs text-textSecondary">{item.englishMeaning}</p>
                </div>
              )}

              {/* Listening Comprehension Quiz */}
              <div className="pt-2 border-t border-borderColor/60 space-y-2.5">
                <p className="text-sm font-semibold text-textPrimary bangla-text">
                  {t(item.questionBn, item.questionEn, item.questionBn)}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {item.options.map((opt, oIdx) => {
                    const isSelected = chosen === oIdx;
                    const isCorrect = oIdx === item.correctIndex;
                    let btnStyle =
                      "border-borderColor bg-bgSecondary/60 text-textPrimary hover:border-accentGold/50";
                    if (chosen !== undefined) {
                      if (isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200";
                      } else if (isSelected) {
                        btnStyle = "border-red-500 bg-red-950/50 text-red-200";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswer(item, oIdx)}
                        className={`rounded-xl border px-3.5 py-2.5 text-left text-xs font-medium transition bangla-text ${btnStyle}`}
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
