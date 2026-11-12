"use client";

import React, { useState } from "react";
import {
  User,
  Save,
  CheckCircle2,
  Cloud,
  LogIn,
  UserPlus,
  LogOut,
  Target,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function ProfilePage() {
  const { t, stats, updateProfile } = useApp();

  const [nameInput, setNameInput] = useState(stats.studentName || "Taseen Billah");
  const [goalInput, setGoalInput] = useState<number>(stats.dailyGoalMinutes || 20);
  const [savedNotice, setSavedNotice] = useState(false);

  // Optional Supabase Auth states
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [cloudUserEmail, setCloudUserEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      studentName: nameInput.trim() || "Taseen Billah",
      dailyGoalMinutes: Math.max(5, Math.min(240, Number(goalInput) || 20)),
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleSupabaseAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setAuthMessage(
        t(
          "ক্লাউড সিঙ্ক বর্তমানে অফলাইন/লোকাল মোডে রয়েছে (NEXT_PUBLIC_SUPABASE_URL কনফিগার করা হয়নি)। আপনার সব অগ্রগতি এই ব্রাউজারে নিরাপদে সংরক্ষিত থাকছে।",
          "Cloud Sync is currently in Local Guest Mode (NEXT_PUBLIC_SUPABASE_URL is not configured yet). All your progress is safely saved in this browser.",
          "المزامنة السحابية غير مفعلة حالياً. يتم حفظ تقدمك محلياً في المتصفح."
        )
      );
      return;
    }

    setAuthLoading(true);
    setAuthMessage(null);

    try {
      const endpoint =
        authMode === "signup"
          ? `${supabaseUrl}/auth/v1/signup`
          : `${supabaseUrl}/auth/v1/token?grant_type=password`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseAnonKey,
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthMessage(
          data?.error_description ||
            data?.msg ||
            t("লগইন বা সাইনআপ ব্যর্থ হয়েছে।", "Authentication failed.", "فشل تسجيل الدخول.")
        );
      } else {
        setCloudUserEmail(email.trim());
        setAuthMessage(
          authMode === "signup"
            ? t(
                "অ্যাকাউন্ট তৈরি হয়েছে! অনুগ্রহ করে ইমেইল যাচাই করুন অথবা লগইন করুন।",
                "Account created! Please check your email for verification or sign in.",
                "تم إنشاء الحساب بنجاح!"
              )
            : t(
                "সফলভাবে Supabase ক্লাউড অ্যাকাউন্টে লগইন হয়েছে!",
                "Successfully signed in to your Supabase Cloud account!",
                "تم تسجيل الدخول بنجاح!"
              )
        );
      }
    } catch {
      setAuthMessage(
        t("নেটওয়ার্ক ত্রুটি হয়েছে। আবার চেষ্টা করুন।", "Network error. Please try again.", "خطأ في الشبكة.")
      );
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-textPrimary bangla-text">
              {t("শিক্ষার্থী প্রোফাইল ও সেটিংস", "Student Profile & Settings", "الملف الشخصي والإعدادات")}
            </h1>
            <p className="text-xs sm:text-sm text-textSecondary bangla-text">
              {t(
                "আপনার নাম, দৈনিক অধ্যয়নের লক্ষ্য এবং ক্লাউড ব্যাকআপ পরিচালনা করুন।",
                "Manage your display name, daily study goal, and optional cloud sync.",
                "إدارة اسمك وهدف الدراسة اليومي والمزامنة السحابية."
              )}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-xl border border-accentGold/40 bg-bgSecondary px-3.5 py-2 text-xs font-bold text-accentGold">
          <Sparkles className="h-4 w-4" />
          <span>{stats.xp} XP</span>
        </div>
      </div>

      {/* Personal Details & Study Goal Form */}
      <form onSubmit={handleSaveProfile} className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-textPrimary bangla-text">
          {t("ব্যক্তিগত তথ্য ও দৈনিক লক্ষ্য", "Personal Details & Daily Study Goal", "المعلومات الشخصية")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-textSecondary bangla-text">
              {t(
                "শিক্ষার্থীর পূর্ণ নাম (সার্টিফিকেটে প্রদর্শিত হবে)",
                "Student Full Name (Appears on Certificates)",
                "الاسم الكامل للطالب"
              )}
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-4 py-2.5 text-sm text-textPrimary focus:border-accentGold focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-textSecondary bangla-text">
              <Target className="h-3.5 w-3.5 text-accentGold" />
              <span>
                {t("দৈনিক অধ্যয়নের লক্ষ্য (মিনিট)", "Daily Study Goal (Minutes)", "هدف الدراسة اليومي (دقائق)")}
              </span>
            </label>
            <input
              type="number"
              min={5}
              max={240}
              value={goalInput}
              onChange={(e) => setGoalInput(Number(e.target.value))}
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-4 py-2.5 text-sm text-textPrimary focus:border-accentGold focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-accentPrimary px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:opacity-95 transition"
          >
            <Save className="h-4 w-4" />
            <span>{t("প্রোফাইল সেভ করুন", "Save Profile", "حفظ التغييرات")}</span>
          </button>

          {savedNotice && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bangla-text">
              <CheckCircle2 className="h-4 w-4" />
              {t("সফলভাবে সেভ হয়েছে!", "Saved successfully!", "تم الحفظ بنجاح!")}
            </span>
          )}
        </div>
      </form>

      {/* Optional Supabase Cloud Sync Section */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Cloud className="h-5 w-5 text-accentGold" />
            <h2 className="text-lg font-bold text-textPrimary bangla-text">
              {t("Supabase ক্লাউড অ্যাকাউন্ট (ঐচ্ছিক)", "Supabase Cloud Account (Optional)", "الحساب السحابي (اختياري)")}
            </h2>
          </div>

          {cloudUserEmail && (
            <button
              onClick={() => {
                setCloudUserEmail(null);
                setAuthMessage(null);
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-red-500/40 bg-red-950/30 px-3 py-1.5 text-xs font-semibold text-red-300"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{t("লগআউট", "Sign Out", "تسجيل الخروج")}</span>
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm text-textSecondary bangla-text">
          {t(
            "লগইন ছাড়াই আপনি এই ব্রাউজারে সম্পূর্ণ বিনামূল্যে সব কোর্স ও AI শিক্ষক ব্যবহার করতে পারবেন। একাধিক ডিভাইসে প্রগ্রেস সিঙ্ক করতে চাইলে ইমেইল দিয়ে লগইন করুন।",
            "You can use all courses and the AI Teacher completely free without logging in. Sign in with email if you want multi-device cloud sync.",
            "يمكنك استخدام المنصة مجاناً دون تسجيل الدخول، أو تسجيل الدخول لمزامنة التقدم عبر الأجهزة."
          )}
        </p>

        {cloudUserEmail ? (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs sm:text-sm text-emerald-200">
            ✅ {t("সংযুক্ত অ্যাকাউন্ট:", "Connected Account:", "الحساب المتصل:")} <strong>{cloudUserEmail}</strong>
          </div>
        ) : (
          <form onSubmit={handleSupabaseAuth} className="space-y-3 max-w-md">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                  authMode === "login"
                    ? "bg-accentPrimary text-white"
                    : "bg-bgSecondary text-textSecondary"
                }`}
              >
                {t("লগইন (Login)", "Login", "تسجيل الدخول")}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                  authMode === "signup"
                    ? "bg-accentPrimary text-white"
                    : "bg-bgSecondary text-textSecondary"
                }`}
              >
                {t("নতুন অ্যাকাউন্ট (Sign Up)", "Sign Up", "إنشاء حساب")}
              </button>
            </div>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-4 py-2.5 text-sm text-textPrimary focus:border-accentGold focus:outline-none"
            />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-borderColor bg-bgPrimary/80 px-4 py-2.5 text-sm text-textPrimary focus:border-accentGold focus:outline-none"
            />

            <button
              type="submit"
              disabled={authLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-accentGold px-5 py-2.5 text-xs font-bold text-black hover:opacity-95 transition"
            >
              {authMode === "login" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              <span>
                {authLoading
                  ? t("অপেক্ষা করুন...", "Please wait...", "جاري التحميل...")
                  : authMode === "login"
                  ? t("ক্লাউড লগইন", "Sign In", "دخول")
                  : t("অ্যাকাউন্ট তৈরি করুন", "Create Account", "إنشاء حساب")}
              </span>
            </button>
          </form>
        )}

        {authMessage && (
          <div className="rounded-xl border border-accentGold/40 bg-bgSecondary p-3.5 text-xs text-textPrimary bangla-text">
            {authMessage}
          </div>
        )}
      </div>
    </div>
  );
}
