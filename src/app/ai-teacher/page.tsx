
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Send,
  Volume2,
  RotateCcw,
  BookOpen,
  MessageSquare,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface Message {
  id: string;
  sender: "user" | "teacher";
  textBn: string;
  arabic?: string;
  explanationBn?: string;
  timestamp: string;
}

const INITIAL_SUGGESTIONS_BN = [
  "আসসালামু আলাইকুম! আমি নতুন। আরবি শেখা কীভাবে শুরু করব?",
  "ইসম (اسم) এবং ফেল (فعل)-এর মধ্যে মূল পার্থক্য কী?",
  "কুরআনে বহুল ব্যবহৃত ৫টি মূল ধাতু (Root Words) বুঝিয়ে দিন।",
  "দৈনন্দিন জীবনে ব্যবহৃত ১০টি প্রয়োজনীয় আরবি বাক্য ও অর্থ।",
];

const INITIAL_SUGGESTIONS_EN = [
  "Assalamu Alaikum! I'm a beginner. How do I start learning Arabic?",
  "What is the main difference between Ism (Noun) and Fi'l (Verb)?",
  "Explain 5 frequently used Quranic root words with examples.",
  "10 essential everyday Arabic phrases with English translation.",
];

export default function AITeacherPage() {
  const { language, t, addXP, addStudyMinutes } = useApp();

  const [level, setLevel] = useState<string>("Beginner");
  const [mode, setMode] = useState<string>("general");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      sender: "teacher",
      textBn:
        "ওয়ালাইকুম আসসালাম! আমি উস্তাদ তারিক, আপনার ব্যক্তিগত AI আরবি শিক্ষক। আপনি আমার সাথে যেকোনো আরবি ব্যাকরণ, কুরআনিক শব্দ বা কথোপকথন নিয়ে আলোচনা করতে পারেন। বলুন, আজ আপনাকে কী শেখাব?",
      arabic:
        "وَعَلَيْكُمُ السَّلَامُ! أَنَا الْأُسْتَادُ طَارِقٌ، مُعَلِّمُكُمُ الذَّكِيُّ لِلُّغَةِ الْعَرَبِيَّةِ.",
      explanationBn:
        "উস্তাদ তারিক আপনাকে স্বাগত জানাচ্ছেন। আপনি লেভেল ও মোড পরিবর্তন করে আপনার শেখার গতি নিয়ন্ত্রণ করতে পারেন।",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const speakArabic = (text?: string) => {
    if (!text || typeof window === "undefined" || !("speechSynthesis" in window))
      return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText.trim();
    if (!textToSend || loading) return;

    if (!queryText) {
      setInputText("");
    }

    const newUserMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      textBn: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: textToSend,
          level,
          mode,
          language,
        }),
      });

      const data = await res.json();

      const newTeacherMsg: Message = {
        id: `t-${Date.now()}`,
        sender: "teacher",
        textBn:
          data?.responseBn ||
          t(
            "দুঃখিত, এই মুহূর্তে আমি উত্তর দিতে পারছি না। আবার চেষ্টা করুন।",
            "Sorry, I cannot answer right now. Please try again.",
            "عذراً، حدث خطأ."
          ),
        arabic: data?.arabicVowelized,
        explanationBn: data?.explanationBn,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newTeacherMsg]);
      addXP(15, 3);
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: "teacher",
        textBn: t(
          "সার্ভার সংযোগে ত্রুটি হয়েছে। দয়া করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।",
          "Server connection error. Please check your internet connection.",
          "خطأ في الاتصال بالخادم."
        ),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const currentSuggestions =
    language === "ar" || language === "en"
      ? INITIAL_SUGGESTIONS_EN
      : INITIAL_SUGGESTIONS_BN;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      {/* Teacher Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accentPrimary/10 blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accentPrimary to-accentGold text-white shadow-xl shadow-accentPrimary/20">
                <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 animate-pulse" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-bgPrimary">
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-accentPrimary/10 px-3 py-1 text-xs font-bold text-accentGold mb-1">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>{t("সার্ভার-সাইড সুরক্ষিত AI", "Server-Side Secured AI", "ذكاء اصطناعي محمي")}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-textPrimary bangla-text">
                {t(
                  "উস্তাদ তারিক — আপনার ব্যক্তিগত AI আরবি শিক্ষক",
                  "Ustad Tariq — Your Personal AI Arabic Teacher",
                  "الأستاذ طارق — معلمك الذكي للغة العربية"
                )}
              </h1>
              <p className="text-xs sm:text-sm text-textSecondary max-w-xl bangla-text">
                {t(
                  "যেকোনো আরবি ব্যাকরণ, নাহু-সরফ, কুরআনিক শব্দ বা কথোপকথন নিয়ে আলোচনা করুন। প্রতিটি উত্তরের সাথে পূর্ণ হরকত ও সহজ ব্যাখ্যা পাবেন।",
                  "Discuss any Arabic grammar, Nahw-Sarf, Quranic vocabulary, or conversation. Get full voweling and easy explanations with every reply.",
                  "ناقش أي موضوع في النحو والصرف والقرآن."
                )}
              </p>
            </div>
          </div>

          {/* Mode & Level Selectors */}
          <div className="flex flex-wrap items-center gap-3 bg-bgSecondary/80 p-2 rounded-2xl border border-borderColor w-full sm:w-auto justify-between">
            <div className="space-y-0.5 w-full sm:w-auto">
              <span className="text-[10px] font-bold text-textSecondary uppercase tracking-wider block px-1">
                {t("শেখার স্তর", "Learning Level", "المستوى")}
              </span>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full sm:w-auto rounded-xl border border-borderColor bg-bgPrimary px-3 py-1.5 text-xs font-bold text-textPrimary focus:border-accentGold focus:outline-none"
              >
                <option value="Beginner">🌱 {t("প্রারম্ভিক", "Beginner", "مبتدئ")}</option>
                <option value="Intermediate">🌿 {t("মধ্যবর্তী", "Intermediate", "متوسط")}</option>
                <option value="Advanced">🌳 {t("উন্নত", "Advanced", "متقدم")}</option>
                <option value="Quranic Scholar">📖 {t("কুরআনিক পাণ্ডিত্য", "Quranic Scholar", "دراسات قرآنية")}</option>
              </select>
            </div>

            <div className="space-y-0.5 w-full sm:w-auto">
              <span className="text-[10px] font-bold text-textSecondary uppercase tracking-wider block px-1">
                {t("আলোচনার মোড", "Discussion Mode", "وضع النقاش")}
              </span>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full sm:w-auto rounded-xl border border-borderColor bg-bgPrimary px-3 py-1.5 text-xs font-bold text-textPrimary focus:border-accentGold focus:outline-none"
              >
                <option value="general">💬 {t("সাধারণ আলোচনা", "General Conversation", "نقاش عام")}</option>
                <option value="grammar">📚 {t("নাহু-সরফ ব্যাকরণ", "Nahw-Sarf Grammar", "النحو والصرف")}</option>
                <option value="quranic">✨ {t("কুরআনিক শব্দ বিশ্লেষণ", "Quranic Word Analysis", "تحليل الكلمات القرآنية")}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Chat History Container */}
      <div className="h-[480px] overflow-y-auto rounded-3xl border border-borderColor bg-bgSecondary/50 p-4 sm:p-6 space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isTeacher = msg.sender === "teacher";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isTeacher ? "items-start" : "items-end"} space-y-1`}
            >
              <div className="flex items-center gap-2 px-1 text-[11px] font-bold text-textSecondary">
                <span>{isTeacher ? "👤 উস্তাদ তারিক (Ustad Tariq)" : "🎓 আপনি (You)"}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 space-y-3 leading-relaxed transition shadow-md ${
                  isTeacher
                    ? "rounded-tl-none bg-bgCard text-textPrimary border border-borderColor/80"
                    : "rounded-tr-none bg-accentPrimary text-white font-medium"
                }`}
              >
                {/* Main Bengali/English Explanation */}
                <p className={`text-sm sm:text-base ${isTeacher ? "bangla-text font-medium" : ""}`}>
                  {msg.textBn}
                </p>

                {/* Vowelized Arabic Target Text */}
                {msg.arabic && (
                  <div className="pt-2 border-t border-borderColor/40 flex items-center justify-between gap-4">
                    <p dir="rtl" className="arabic-text text-2xl sm:text-3xl font-bold text-accentGold">
                      {msg.arabic}
                    </p>
                    <button
                      onClick={() => speakArabic(msg.arabic)}
                      className="shrink-0 rounded-xl bg-accentPrimary/20 p-2.5 text-accentGold hover:bg-accentPrimary/30 transition"
                      title="Listen to Arabic Pronunciation"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>
                )}

                {/* Grammatical Breakdown */}
                {msg.explanationBn && isTeacher && (
                  <div className="rounded-xl bg-bgPrimary/90 border border-borderColor/60 p-3.5 space-y-1 text-xs text-textSecondary bangla-text">
                    <p className="font-bold text-accentPrimary flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>{t("ব্যাকরণ ও শাব্দিক বিশ্লেষণ:", "Grammar & Root Analysis:", "التحليل النحوي:")}</span>
                    </p>
                    <p>{msg.explanationBn}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex flex-col items-start space-y-1">
            <div className="flex items-center gap-2 px-1 text-[11px] font-bold text-textSecondary animate-pulse">
              <span>👤 উস্তাদ তারিক চিন্তা করছেন... (Ustad Tariq is thinking...)</span>
            </div>
            <div className="rounded-2xl rounded-tl-none bg-bgCard border border-borderColor p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-accentGold animate-bounce [animation-delay:-0.3s]" />
                <div className="h-3 w-3 rounded-full bg-accentGold animate-bounce [animation-delay:-0.15s]" />
                <div className="h-3 w-3 rounded-full bg-accentGold animate-bounce" />
              </div>
              <p className="text-xs text-textSecondary font-mono animate-pulse">
                🔍 {t("কুরআনিক ডেটাবেস ও নহূ-সরফ বিশ্লেষণ করা হচ্ছে...", "Analyzing Quranic database & Nahw-Sarf...", "جاري البحث في القواعد...")}
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Bubbles */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-textSecondary px-1 bangla-text">
          💡 {t("দ্রুত আলোচনার বিষয়বস্তু (এগুলোতে ট্যাপ করুন):", "Quick Discussion Topics (Tap to ask):", "مواضيع مقترحة للنقاش:")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {currentSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(suggestion)}
              className="rounded-xl border border-borderColor bg-bgSecondary/60 p-3 text-left text-xs font-medium text-textPrimary hover:border-accentGold hover:bg-accentPrimary/10 transition flex items-center justify-between group"
            >
              <span className="truncate pr-2">{suggestion}</span>
              <MessageSquare className="h-4 w-4 shrink-0 text-textSecondary group-hover:text-accentGold transition" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-3 rounded-2xl border-2 border-borderColor bg-secondary p-2 focus-within:border-accentGold transition shadow-lg"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t(
            "আরবি ব্যাকরণ বা কুরআন সম্পর্কে উস্তাদ তারিককে কিছু জিজ্ঞাসা করুন...",
            "Ask Ustad Tariq anything about Arabic grammar or the Quran...",
            "اسأل الأستاذ طارق عن النحو أو القرآن..."
          )}
          className="w-full bg-transparent px-3 py-2 text-sm text-textPrimary placeholder-textSecondary focus:outline-none bangla-text"
        />

        <button
          type="button"
          onClick={() => {
            setInputText("");
            setMessages([
              {
                id: `m-reset-${Date.now()}`,
                sender: "teacher",
                textBn: t(
                  "চ্যাট রিসেট করা হয়েছে। নতুন বিষয় নিয়ে আলোচনা শুরু করুন!",
                  "Chat reset. Start discussing a new topic!",
                  "تم إعادة ضبط المحادثة."
                ),
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ]);
          }}
          className="rounded-xl p-2.5 text-textSecondary hover:bg-red-950/30 hover:text-red-400 transition"
          title="Reset Chat"
        >
          <RotateCcw className="h-5 w-5" />
        </button>

        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-accentPrimary px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40 hover:opacity-95 transition shadow-md"
        >
          <span>{t("পাঠান", "Send", "إرسال")}</span>
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
