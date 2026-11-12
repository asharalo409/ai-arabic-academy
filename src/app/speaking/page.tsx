"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface SpeakingPrompt {
  id: string;
  arabic: string;
  banglaPronunciation: string;
  banglaMeaning: string;
  englishMeaning: string;
}

const SPEAKING_PROMPTS: SpeakingPrompt[] = [
  {
    id: "s1",
    arabic: "اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، اِسْمِي تَاسِينُ وَأَنَا طَالِبٌ",
    banglaPronunciation: "আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু, ইসমি তাসীনু ওয়া আনা ত্বালিবুন",
    banglaMeaning: "আপনার ওপর শান্তি, রহমত ও বরকত বর্ষিত হোক, আমার নাম তাসীন এবং আমি একজন ছাত্র।",
    englishMeaning: "Peace, mercy, and blessings of Allah be upon you, my name is Taseen and I am a student.",
  },
  {
    id: "s2",
    arabic: "أُحِبُّ تَعَلُّمَ اللُّغَةِ الْعَرَبِيَّةِ لِفَهْمِ الْقُرْآنِ الْكَرِيمِ",
    banglaPronunciation: "উহিব্বু তাআল্লুমাল লুগাতিল আরাবিয়্যাতি লিফাহমিল কুরআনিল কারীম",
    banglaMeaning: "আমি পবিত্র কুরআন বোঝার জন্য আরবি ভাষা শিখতে ভালোবাসি।",
    englishMeaning: "I love learning the Arabic language to understand the Noble Quran.",
  },
  {
    id: "s3",
    arabic: "كَيْفَ حَالُكَ يَا أَخِي؟ أَرْجُو أَنْ تَكُونَ بِخَيْرٍ وَعَافِيَةٍ",
    banglaPronunciation: "কাইফা হালুকা ইয়া আখী? আরজু আন তাকূনা বিখাইরিন ওয়া আফিয়াহ",
    banglaMeaning: "হে আমার ভাই, তুমি কেমন আছ? আশা করি তুমি ভালো ও সুস্থ আছ।",
    englishMeaning: "How are you, my brother? I hope you are well and in good health.",
  },
];

export default function SpeakingPage() {
  const { lang, t, addXP, addStudyMinutes } = useApp();
  const [selectedPrompt, setSelectedPrompt] = useState<SpeakingPrompt>(SPEAKING_PROMPTS[0]);
  const [speechRecSupported, setSpeechRecSupported] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [spokenText, setSpokenText] = useState<string>("");
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState<boolean>(false);
  const [micError, setMicError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechRecSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.continuous = false;
    recognition.interimResults = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setSpokenText(transcript);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event.error === "not-allowed") {
        setMicError(
          t(
            "মাইক্রোফোন ব্যবহারের অনুমতি দেওয়া হয়নি। ব্রাউজার সেটিংস থেকে মাইক্রোফোন Allow করুন।",
            "Microphone permission denied. Please allow microphone access in browser settings.",
            "تم رفض إذن الميكروفون. يرجى السماح بالوصول إلى الميكروفون."
          )
        );
      } else {
        setMicError(
          t(
            "ভয়েস শনাক্ত করতে সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা নিচে লিখে যাচাই করুন।",
            "Could not capture speech clearly. Please try again or type below.",
            "تعذر التعرف على الصوت. حاول مرة أخرى."
          )
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [t]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    setMicError(null);

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setSpokenText("");
      setAiFeedback(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const playTargetSentence = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(selectedPrompt.arabic);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const evaluateSpeechWithAI = async () => {
    if (!spokenText.trim() || loadingFeedback) return;
    setLoadingFeedback(true);
    setAiFeedback(null);

    const promptMessage = `Evaluate this student's spoken/written Arabic practice attempt.
Target practice sentence: "${selectedPrompt.arabic}"
Student's captured speech/input: "${spokenText}"

Please provide:
1. Accuracy & Comparison with the target sentence (note: browser speech-to-text often omits Harakat, so focus on word accuracy and grammar).
2. Corrected Arabic sentence with full Harakat (التشكيل الكامل).
3. Practical pronunciation & fluency improvement tips in ${lang === "bn" ? "Bangla" : lang === "ar" ? "Arabic" : "English"}.`;

    try {
      const res = await fetch("/api/ai-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: promptMessage,
          level: "Beginner-Intermediate",
          mode: "correction",
          lang,
        }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setAiFeedback(data.reply);
        addXP(25);
        addStudyMinutes(3);
      } else {
        setAiFeedback(data?.error || "Could not evaluate right now.");
      }
    } catch {
      setAiFeedback("Network error while contacting AI Teacher.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <div className="glass-card rounded-2xl p-6 space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
            <Mic className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-textPrimary bangla-text">
              {t("আরবি কথোপকথন ও উচ্চারণ অনুশীলন", "Arabic Speaking Practice", "تدريب المحادثة والنطق")}
            </h1>
            <p className="text-xs sm:text-sm text-textSecondary bangla-text">
              {t(
                "বাক্যটি শুনুন, মাইক্রোফোনে আরবি বলুন এবং AI থেকে ব্যাকরণ ও উচ্চারণ ফিডব্যাক নিন।",
                "Listen to the sentence, speak into your microphone, and get AI grammar & fluency feedback.",
                "استمع إلى الجملة، وتحدث في الميكروفون، واحصل على تقييم فوري."
              )}
            </p>
          </div>
        </div>
      </div>

      {!speechRecSupported && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/40 bg-amber-950/30 p-4 text-xs sm:text-sm text-amber-200">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
          <p className="bangla-text">
            {t(
              "সততা ও স্বচ্ছতার জন্য জানানো হচ্ছে: আপনার বর্তমান ব্রাউজার Web Speech Recognition API সমর্থন করে না (Android-এ Google Chrome ব্যবহার করলে ভয়েস ইনপুট কাজ করবে)। তবে আপনি নিচের বক্সে আরবি লিখেও AI ব্যাকরণ ও বাক্য সংশোধন সুবিধা নিতে পারবেন।",
              "Honest browser notice: Your current browser does not support the Web Speech Recognition API (use Google Chrome on Android/Desktop for voice input). You can still type Arabic below for full AI grammar & sentence correction.",
              "ملاحظة: متصفحك الحالي لا يدعم التعرف الصوتي المباشر. يمكنك كتابة الجملة أدناه للحصول على التصحيح."
            )}
          </p>
        </div>
      )}

      {/* Sentence Selector */}
      <div className="flex flex-wrap gap-2">
        {SPEAKING_PROMPTS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedPrompt(item);
              setSpokenText("");
              setAiFeedback(null);
            }}
            className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
              selectedPrompt.id === item.id
                ? "border-accentGold bg-accentPrimary text-white"
                : "border-borderColor bg-bgSecondary text-textSecondary hover:text-textPrimary"
            }`}
          >
            {t(`অনুশীলন বাক্য ${idx + 1}`, `Practice Sentence ${idx + 1}`, `جملة التدريب ${idx + 1}`)}
          </button>
        ))}
      </div>

      {/* Target Sentence Card */}
      <div className="glass-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-accentGold">
            {t("নিচের বাক্যটি দেখে ও শুনে উচ্চারণ করুন:", "Read & Repeat This Sentence:", "اقرأ وكرر هذه الجملة:")}
          </span>
          <button
            onClick={playTargetSentence}
            className="inline-flex items-center gap-1.5 rounded-xl border border-accentGold/40 bg-bgSecondary px-3 py-1.5 text-xs font-semibold text-accentGold hover:bg-accentGold/10 transition"
          >
            <Volume2 className="h-4 w-4" />
            <span>{t("সঠিক উচ্চারণ শুনুন", "Listen Model", "استمع للنطق")}</span>
          </button>
        </div>

        <p dir="rtl" className="arabic-text text-2xl sm:text-3xl font-bold text-textPrimary pt-2">
          {selectedPrompt.arabic}
        </p>
        <p className="text-xs sm:text-sm text-accentPrimary bangla-text">
          {selectedPrompt.banglaPronunciation}
        </p>
        <p className="text-xs sm:text-sm text-textSecondary bangla-text">
          {selectedPrompt.banglaMeaning}
        </p>
      </div>

      {/* Microphone & Transcript Card */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {speechRecSupported && (
            <button
              onClick={toggleRecording}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition ${
                isListening
                  ? "bg-red-600 animate-pulse"
                  : "bg-accentPrimary hover:opacity-95"
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="h-5 w-5" />
                  <span>{t("রেকর্ডিং বন্ধ করুন", "Stop Recording", "إيقاف التسجيل")}</span>
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5" />
                  <span>{t("মাইক্রোফোনে আরবি বলুন", "Speak Arabic Now", "تحدث بالعربية الآن")}</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => {
              setSpokenText("");
              setAiFeedback(null);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-borderColor bg-bgSecondary px-4 py-3 text-xs font-semibold text-textSecondary hover:text-textPrimary"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{t("রিসেট", "Reset", "إعادة")}</span>
          </button>
        </div>

        {micError && (
          <p className="text-xs text-red-400 bangla-text">{micError}</p>
        )}

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-textSecondary">
            {t(
              "শনাক্তকৃত আরবি টেক্সট (প্রয়োজনে সম্পাদনা করতে পারেন):",
              "Captured Arabic Speech (or type your own Arabic sentence):",
              "النص العربي الملتقط (يمكنك التعديل):"
            )}
          </label>
          <textarea
            dir="rtl"
            rows={3}
            value={spokenText}
            onChange={(e) => setSpokenText(e.target.value)}
            placeholder="اُكْتُبْ أَوْ تَحَدَّثْ بِالْعَرَبِيَّةِ هُنَا..."
            className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 p-3.5 arabic-text text-xl text-textPrimary focus:border-accentGold focus:outline-none"
          />
        </div>

        <button
          onClick={evaluateSpeechWithAI}
          disabled={!spokenText.trim() || loadingFeedback}
          className="inline-flex items-center gap-2 rounded-xl bg-accentGold px-5 py-3 text-xs sm:text-sm font-bold text-black disabled:opacity-40 hover:opacity-95 transition"
        >
          {loadingFeedback ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span>
            {t(
              "AI ব্যাকরণ ও উচ্চারণ মূল্যায়ন নিন",
              "Get AI Grammar & Fluency Feedback",
              "احصل على تقييم الذكاء الاصطناعي"
            )}
          </span>
        </button>

        {aiFeedback && (
          <div className="mt-4 rounded-xl border border-accentGold/40 bg-bgSecondary p-4 text-sm text-textPrimary whitespace-pre-wrap leading-relaxed bangla-text">
            {aiFeedback}
          </div>
        )}
      </div>
    </div>
  );
}
