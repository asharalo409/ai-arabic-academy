"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  Volume2,
  Loader2,
  AlertCircle,
  BookOpen,
  Languages,
  CheckCheck,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function AITeacherPage() {
  const { lang, t, addXP, addStudyMinutes } = useApp();

  const [level, setLevel] = useState("Beginner");
  const [mode, setMode] = useState("general");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aaa_ai_chat");
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages([
          {
            id: "welcome",
            role: "assistant",
            content: t(
              "আসসালামু আলাইকুম! আমি উস্তাদ তারিক — আপনার AI আরবি শিক্ষক।\n\nআমি আপনাকে পূর্ণ হরকতসহ আরবি ব্যাকরণ (নাহু ও সরফ), কুরআনিক আরবি, বাংলা-ইংরেজি-আরবি অনুবাদ, বাক্য সংশোধন এবং কথোপকথন অনুশীলনে সাহায্য করতে পারি। নিচের যেকোনো বিষয় বেছে নিন অথবা আপনার প্রশ্ন লিখুন!",
              "Assalamu Alaikum! I am Ustad Tariq — your AI Arabic Teacher.\n\nI can help you with Arabic grammar (Nahw & Sarf) with full Harakat, Quranic Arabic, translations, sentence correction, and conversation practice. Choose a prompt below or ask your question!",
              "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ! أَنَا الأُسْتَاذُ طَارِق — مُعَلِّمُكَ الذَّكِيُّ لِلُّغَةِ الْعَرَبِيَّةِ. كَيْفَ يُمْكِنُنِي مُسَاعَدَتُكَ الْيَوْمَ؟"
            ),
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
    } catch {
      // Ignore storage error
    }
  }, [t]);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem("aaa_ai_chat", JSON.stringify(messages.slice(-30)));
      } catch {
        // Ignore storage error
      }
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const modes = [
    {
      id: "general",
      label: t("সাধারণ টিউটর", "General Tutor", "معلم عام"),
      icon: Bot,
    },
    {
      id: "grammar",
      label: t("নাহু ও সরফ", "Nahw & Sarf", "النحو والصرف"),
      icon: BookOpen,
    },
    {
      id: "translation",
      label: t("অনুবাদ ও হরকত", "Translation", "الترجمة"),
      icon: Languages,
    },
    {
      id: "correction",
      label: t("বাক্য সংশোধন", "Fix My Arabic", "تصحيح الجمل"),
      icon: CheckCheck,
    },
    {
      id: "quranic",
      label: t("কুরআনিক আরবি", "Quranic Arabic", "العربية القرآنية"),
      icon: Sparkles,
    },
    {
      id: "conversation",
      label: t("আরবি কথোপকথন", "Conversation", "محادثة"),
      icon: MessageSquare,
    },
    {
      id: "quiz",
      label: t("অনুশীলন ও কুইজ", "Generate Quiz", "اختبار"),
      icon: HelpCircle,
    },
  ];

  const quickPrompts = [
    t(
      "ইসম, ফে'ল এবং হরফ কাকে বলে? উদাহরণসহ সহজ বাংলায় বুঝিয়ে দিন।",
      "Explain Ism, Fi'l, and Harf with vowelized Arabic examples.",
      "اشْرَحِ الاسْمَ وَالْفِعْلَ وَالْحَرْفَ مَعَ أَمْثِلَةٍ مَشْكُولَةٍ."
    ),
    t(
      "'আমি প্রতিদিন সকালে কুরআন তিলাওয়াত করি' — এর আরবি অনুবাদ ও ই'রাব দিন।",
      "Translate 'I recite the Quran every morning' into Arabic with I'rab.",
      "أَعْرِبْ جُمْلَةَ: يَقْرَأُ الطَّالِبُ الْكِتَابَ فِي الْمَكْتَبَةِ."
    ),
    t(
      "সূরা আল-ফাতিহার 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' আয়াতটির শব্দে শব্দে অর্থ ও ব্যাকরণ বিশ্লেষণ করুন।",
      "Analyze word-by-word meaning and grammar of Surah Al-Fatihah 1:2.",
      "حَلِّلْ مُفْرَدَاتِ وَإِعْرَابَ آيَةِ: الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ."
    ),
    t(
      "দৈনন্দিন কথোপকথনের জন্য ১০টি গুরুত্বপূর্ণ আরবি বাক্য ও বাংলা অর্থ দিন।",
      "Give 10 essential daily Arabic conversation sentences with meanings.",
      "أَعْطِنِي عَشْرَ جُمَلٍ أَسَاسِيَّةٍ لِلْمُحَادَثَةِ الْيَوْمِيَّةِ."
    ),
  ];

  const speakArabicChunks = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert(
        t(
          "আপনার ব্রাউজারে অডিও উচ্চারণ সমর্থিত নয়।",
          "Speech synthesis is not supported in this browser.",
          "النطق الصوتي غير مدعوم في هذا المتصفح."
        )
      );
      return;
    }

    const arabicMatches = text.match(/[\u0600-\u06FF\s،؟؛]+/g);
    const toSpeak = arabicMatches ? arabicMatches.join(" ").trim() : text;
    if (!toSpeak) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(toSpeak);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = (customText ?? input).trim();
    if (!textToSend || loading) return;

    setError(null);
    setInput("");

    const userMsg: Message = {
      id: `${Date.now()}-u`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          level,
          mode,
          lang,
          history: updatedMessages
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data?.error ||
            t(
              "AI সার্ভার থেকে উত্তর পাওয়া যায়নি।",
              "Failed to get response from AI server.",
              "تعذر الحصول على رد من الخادم."
            )
        );
      } else {
        const aiMsg: Message = {
          id: `${Date.now()}-a`,
          role: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        addXP(10);
        addStudyMinutes(2);
      }
    } catch {
      setError(
        t(
          "নেটওয়ার্ক সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে ইন্টারনেট পরীক্ষা করুন।",
          "Network connection error. Please check your internet.",
          "خطأ في الاتصال بالشبكة."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("aaa_ai_chat");
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: t(
          "চ্যাট ইতিহাস মুছে ফেলা হয়েছে। নতুন প্রশ্ন জিজ্ঞাসা করুন!",
          "Chat history cleared. Ask your next Arabic question!",
          "تم مسح المحادثة. اسأل سؤالك الجديد!"
        ),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8 space-y-5">
      {/* Header & Controls */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accentPrimary/20 border border-accentGold/40 text-accentGold">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-textPrimary bangla-text">
                {t(
                  "AI আরবি শিক্ষক — উস্তাদ তারিক",
                  "AI Arabic Teacher — Ustad Tariq",
                  "المعلم الذكي — الأستاذ طارق"
                )}
              </h1>
              <p className="text-xs text-textSecondary">
                {t(
                  "Gemini 2.5 চালিত • পূর্ণ হরকত, নাহু-সরফ ও কুরআনিক আরবি সহায়ক",
                  "Powered by Gemini • Full Harakat, Nahw-Sarf & Quranic Arabic",
                  "مدعوم بالذكاء الاصطناعي • تشكيل كامل ونحو وصرف"
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              aria-label="Student Level"
              className="rounded-xl border border-borderColor bg-bgSecondary px-3 py-2 text-xs font-semibold text-textPrimary focus:border-accentGold focus:outline-none"
            >
              <option value="Beginner">{t("লেভেল: প্রাথমিক (Beginner)", "Level: Beginner", "المستوى: مبتدئ")}</option>
              <option value="Intermediate">{t("লেভেল: মাধ্যমিক (Intermediate)", "Level: Intermediate", "المستوى: متوسط")}</option>
              <option value="Advanced">{t("লেভেল: উচ্চতর (Advanced)", "Level: Advanced", "المستوى: متقدم")}</option>
              <option value="Madrasa / Quranic">{t("লেভেল: মাদ্রাসা ও কুরআনিক", "Level: Madrasa / Quranic", "المستوى: قرآني")}</option>
            </select>

            <button
              onClick={clearChat}
              title={t("চ্যাট মুছুন", "Clear Chat", "مسح المحادثة")}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-borderColor bg-bgSecondary text-textSecondary hover:text-red-400 transition"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mode Selector Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {modes.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  active
                    ? "border-accentGold bg-accentPrimary text-white"
                    : "border-borderColor bg-bgSecondary/70 text-textSecondary hover:text-textPrimary"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="text-left rounded-xl border border-borderColor bg-bgSecondary/60 px-3.5 py-2.5 text-xs text-textSecondary hover:border-accentGold/50 hover:text-textPrimary transition bangla-text"
          >
            ✨ {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Area */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 min-h-[380px] max-h-[540px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap bangla-text ${
                msg.role === "user"
                  ? "bg-accentPrimary text-white rounded-br-sm"
                  : "border border-borderColor bg-bgSecondary text-textPrimary rounded-bl-sm"
              }`}
            >
              {msg.content}

              {msg.role === "assistant" && (
                <div className="mt-3 pt-2 border-t border-borderColor/50 flex items-center justify-between gap-2 text-[11px] text-textSecondary">
                  <span>{msg.timestamp}</span>
                  <button
                    onClick={() => speakArabicChunks(msg.content)}
                    className="inline-flex items-center gap-1 rounded-lg border border-borderColor bg-bgPrimary/70 px-2.5 py-1 text-accentGold hover:border-accentGold transition"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>{t("আরবি শুনুন", "Listen Arabic", "استمع")}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-accentGold">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>
              {t(
                "উস্তাদ তারিক উত্তর প্রস্তুত করছেন...",
                "Ustad Tariq is preparing your explanation...",
                "الأستاذ طارق يكتب الإجابة..."
              )}
            </span>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="glass-card rounded-2xl p-3 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t(
            "বাংলা, ইংরেজি বা আরবিতে আপনার প্রশ্ন লিখুন...",
            "Ask your question in Bangla, English, or Arabic...",
            "اكتب سؤالك بالعربية أو البنغالية أو الإنجليزية..."
          )}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-textPrimary placeholder:text-textSecondary focus:outline-none bangla-text"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-accentPrimary px-4 py-2.5 text-xs sm:text-sm font-bold text-white disabled:opacity-40 hover:opacity-95 transition"
        >
          <Send className="h-4 w-4" />
          <span>{t("পাঠান", "Send", "إرسال")}</span>
        </button>
      </form>
    </div>
  );
}
