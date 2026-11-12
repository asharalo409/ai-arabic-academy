"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Lock,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Trash2,
  LogOut,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface CustomLessonRecord {
  id: string;
  levelNumber: number;
  chapterNumber: number;
  lessonNumber: number;
  titleBn: string;
  titleEn: string;
  titleAr: string;
  grammarTitleBn: string;
  grammarExplanationBn: string;
  createdAt: string;
}

export default function AdminPage() {
  const { t } = useApp();

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Lesson Creation Form States
  const [levelNumber, setLevelNumber] = useState(1);
  const [chapterNumber, setChapterNumber] = useState(2);
  const [lessonNumber, setLessonNumber] = useState(1);
  const [titleBn, setTitleBn] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [grammarTitleBn, setGrammarTitleBn] = useState("");
  const [grammarExplanationBn, setGrammarExplanationBn] = useState("");

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [customLessons, setCustomLessons] = useState<CustomLessonRecord[]>([]);

  useEffect(() => {
    try {
      const savedLessons = localStorage.getItem("aaa_custom_lessons");
      if (savedLessons) {
        setCustomLessons(JSON.parse(savedLessons));
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || loading) return;

    setLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify",
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(
          data?.error ||
            t(
              "ভুল অ্যাডমিন পাসওয়ার্ড! প্রবেশাধিকার প্রত্যাখ্যান করা হয়েছে।",
              "Invalid Admin Password. Access denied.",
              "كلمة مرور المسؤول غير صحيحة."
            )
        );
      } else {
        setIsAuthenticated(true);
      }
    } catch {
      setAuthError(
        t("সার্ভার সংযোগে ত্রুটি হয়েছে।", "Server connection error.", "خطأ في الاتصال بالخادم.")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn.trim() || !titleAr.trim() || loading) return;

    setLoading(true);
    setStatusMessage(null);

    const newLesson: CustomLessonRecord = {
      id: `ch${chapterNumber}-l${lessonNumber}-${Date.now().toString().slice(-4)}`,
      levelNumber,
      chapterNumber,
      lessonNumber,
      titleBn: titleBn.trim(),
      titleEn: titleEn.trim() || titleBn.trim(),
      titleAr: titleAr.trim(),
      grammarTitleBn: grammarTitleBn.trim(),
      grammarExplanationBn: grammarExplanationBn.trim(),
      createdAt: new Date().toLocaleDateString(),
    };

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_lesson",
          password: password.trim(),
          lesson: newLesson,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusMessage(`❌ ${data?.error || "Failed to publish lesson."}`);
      } else {
        const updatedList = [newLesson, ...customLessons];
        setCustomLessons(updatedList);
        try {
          localStorage.setItem("aaa_custom_lessons", JSON.stringify(updatedList));
        } catch {
          // Ignore storage error
        }

        setTitleBn("");
        setTitleEn("");
        setTitleAr("");
        setGrammarTitleBn("");
        setGrammarExplanationBn("");

        setStatusMessage(
          data.persistedToSupabase
            ? t(
                "✅ নতুন লেসন সফলভাবে প্রকাশিত হয়েছে এবং Supabase PostgreSQL ডাটাবেসে সংরক্ষিত হয়েছে!",
                "✅ Lesson published and synced to Supabase PostgreSQL database!",
                "✅ تم نشر الدرس وحفظه في قاعدة البيانات بنجاح!"
              )
            : t(
                "✅ নতুন লেসন প্রকাশিত হয়েছে (লোকাল স্টোরেজে সংরক্ষিত; Supabase সংযুক্ত করলে ক্লাউডেও সিঙ্ক হবে)।",
                "✅ Lesson published locally (connect Supabase keys in Vercel to sync globally).",
                "✅ تم نشر الدرس محلياً بنجاح."
              )
        );
      }
    } catch {
      setStatusMessage("❌ Network error while saving lesson.");
    } finally {
      setLoading(false);
    }
  };

  const deleteLocalLesson = (id: string) => {
    const filtered = customLessons.filter((item) => item.id !== id);
    setCustomLessons(filtered);
    try {
      localStorage.setItem("aaa_custom_lessons", JSON.stringify(filtered));
    } catch {
      // Ignore storage error
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-14">
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accentPrimary/20 text-accentGold">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-textPrimary bangla-text">
                {t("সুরক্ষিত অ্যাডমিন প্যানেল", "Protected Admin Panel", "لوحة الإدارة المحمية")}
              </h1>
              <p className="text-xs text-textSecondary bangla-text">
                {t(
                  "কারিকুলাম ও নতুন লেসন পরিচালনার জন্য অ্যাডমিন পাসওয়ার্ড দিন।",
                  "Enter your server ADMIN_PASSWORD to manage lessons & content.",
                  "أدخل كلمة مرور المسؤول لإدارة الدروس والمحتوى."
                )}
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-textSecondary">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-4 py-3 text-sm text-textPrimary focus:border-accentGold focus:outline-none"
              />
            </div>

            {authError && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-accentPrimary py-3 text-sm font-bold text-white hover:opacity-95 transition"
            >
              {loading
                ? t("যাচাই করা হচ্ছে...", "Verifying...", "جاري التحقق...")
                : t("অ্যাডমিন লগইন করুন", "Unlock Admin CMS", "دخول الإدارة")}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      {/* Admin Header */}
      <div className="glass-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-textPrimary bangla-text">
              {t("অ্যাডমিন কারিকুলাম ম্যানেজমেন্ট (CMS)", "Admin Curriculum Management", "إدارة المنهج والدروس")}
            </h1>
            <p className="text-xs sm:text-sm text-textSecondary bangla-text">
              {t(
                "১,০০০-লেসন আর্কিটেকচারে নতুন অধ্যায় ও পূর্ণ হরকতযুক্ত লেসন যুক্ত করুন।",
                "Publish new vowelized Arabic lessons into the 1,000-lesson curriculum.",
                "أضف دروساً جديدة مشكولة إلى المنهج."
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsAuthenticated(false);
            setPassword("");
          }}
          className="inline-flex items-center gap-1.5 rounded-xl border border-borderColor bg-bgSecondary px-4 py-2 text-xs font-bold text-textSecondary hover:text-red-400 transition"
        >
          <LogOut className="h-4 w-4" />
          <span>{t("লক করুন", "Lock Panel", "قفل")}</span>
        </button>
      </div>

      {/* Add New Lesson Form */}
      <form onSubmit={handleCreateLesson} className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-textPrimary flex items-center gap-2 bangla-text">
          <PlusCircle className="h-5 w-5 text-accentGold" />
          <span>{t("নতুন আরবি লেসন তৈরি করুন", "Create & Publish New Lesson", "إنشاء درس جديد")}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-textSecondary">Level (1 – 6)</label>
            <input
              type="number"
              min={1}
              max={6}
              value={levelNumber}
              onChange={(e) => setLevelNumber(Number(e.target.value))}
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-3.5 py-2.5 text-sm text-textPrimary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-textSecondary">Chapter (1 – 100)</label>
            <input
              type="number"
              min={1}
              max={100}
              value={chapterNumber}
              onChange={(e) => setChapterNumber(Number(e.target.value))}
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-3.5 py-2.5 text-sm text-textPrimary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-textSecondary">Lesson (1 – 10)</label>
            <input
              type="number"
              min={1}
              max={10}
              value={lessonNumber}
              onChange={(e) => setLessonNumber(Number(e.target.value))}
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-3.5 py-2.5 text-sm text-textPrimary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-textSecondary bangla-text">
              বাংলা শিরোনাম *
            </label>
            <input
              type="text"
              required
              value={titleBn}
              onChange={(e) => setTitleBn(e.target.value)}
              placeholder="যেমন: অধ্যায় ২ • বাজারে কথোপকথন"
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-3.5 py-2.5 text-sm text-textPrimary bangla-text"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-textSecondary">English Title</label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g., Chapter 2 • At the Market"
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-3.5 py-2.5 text-sm text-textPrimary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-textSecondary">
              العنوان بالعربية (مع التشكيل) *
            </label>
            <input
              dir="rtl"
              type="text"
              required
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder="اَلْفَصْلُ الثَّانِي: فِي السُّوقِ"
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-3.5 py-2.5 arabic-text text-lg text-textPrimary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-textSecondary bangla-text">
              ব্যাকরণ বিষয় (ঐচ্ছিক)
            </label>
            <input
              type="text"
              value={grammarTitleBn}
              onChange={(e) => setGrammarTitleBn(e.target.value)}
              placeholder="যেমন: ইসমুল ইশারাহ (هٰذَا / هٰذِهِ)"
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-3.5 py-2.5 text-sm text-textPrimary bangla-text"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-textSecondary bangla-text">
              ব্যাকরণ ব্যাখ্যা (ঐচ্ছিক)
            </label>
            <input
              type="text"
              value={grammarExplanationBn}
              onChange={(e) => setGrammarExplanationBn(e.target.value)}
              placeholder="সহজ বাংলায় ব্যাকরণের নিয়ম লিখুন..."
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-3.5 py-2.5 text-sm text-textPrimary bangla-text"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-accentGold px-6 py-3 text-xs sm:text-sm font-bold text-black hover:opacity-95 transition"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{t("লেসন প্রকাশ করুন", "Publish Lesson", "نشر الدرس")}</span>
        </button>

        {statusMessage && (
          <div className="rounded-xl border border-accentGold/40 bg-bgSecondary p-3.5 text-xs sm:text-sm text-textPrimary bangla-text">
            {statusMessage}
          </div>
        )}
      </form>

      {/* Published Custom Lessons List */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-textPrimary flex items-center gap-2 bangla-text">
          <BookOpen className="h-5 w-5 text-accentGold" />
          <span>
            {t(
              `অ্যাডমিন কর্তৃক যুক্ত লেসনসমূহ (${customLessons.length})`,
              `Admin Published Lessons (${customLessons.length})`,
              `الدروس المضافة (${customLessons.length})`
            )}
          </span>
        </h2>

        {customLessons.length === 0 ? (
          <p className="text-xs sm:text-sm text-textSecondary bangla-text">
            {t(
              "এখনো কোনো অতিরিক্ত কাস্টম লেসন যুক্ত করা হয়নি। উপরের ফর্ম থেকে যুক্ত করুন।",
              "No custom lessons added yet. Use the form above to publish your first expansion lesson.",
              "لم تتم إضافة دروس مخصصة بعد."
            )}
          </p>
        ) : (
          <div className="space-y-2.5">
            {customLessons.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-borderColor bg-bgSecondary/60 p-4"
              >
                <div>
                  <span className="text-[11px] font-bold text-accentGold">
                    Level {item.levelNumber} • Chapter {item.chapterNumber} • Lesson {item.lessonNumber}
                  </span>
                  <p className="text-sm font-bold text-textPrimary bangla-text">{item.titleBn}</p>
                  <p dir="rtl" className="arabic-text text-base text-accentPrimary">
                    {item.titleAr}
                  </p>
                </div>

                <button
                  onClick={() => deleteLocalLesson(item.id)}
                  className="rounded-lg border border-red-500/40 bg-red-950/30 p-2 text-red-300 hover:bg-red-950/60"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
