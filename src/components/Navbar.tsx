"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Bot,
  Menu,
  X,
  Flame,
  Sparkles,
  Globe,
  Palette,
  LayoutDashboard,
  Headphones,
  Mic,
  GraduationCap,
  Library,
  HelpCircle,
  Trophy,
  Award,
  User,
  ShieldCheck,
  PenTool,
  CalendarCheck,
} from "lucide-react";
import { useApp, Language, Theme } from "@/context/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, theme, setTheme, t, stats } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const primaryLinks = [
    {
      href: "/dashboard",
      label: t("ড্যাশবোর্ড", "Dashboard", "لوحة التحكم"),
      icon: LayoutDashboard,
    },
    {
      href: "/ai-teacher",
      label: t("AI শিক্ষক", "AI Teacher", "المعلم الذكي"),
      icon: Bot,
    },
    {
      href: "/courses",
      label: t("কোর্সসমূহ", "Courses", "الدورات"),
      icon: BookOpen,
    },
    {
      href: "/grammar",
      label: t("নাহু ও সরফ", "Grammar", "النحو والصرف"),
      icon: GraduationCap,
    },
    {
      href: "/quranic-arabic",
      label: t("কুরআনিক আরবি", "Quranic Arabic", "العربية القرآنية"),
      icon: Sparkles,
    },
    {
      href: "/vocabulary",
      label: t("শব্দভাণ্ডার", "Vocabulary", "المفردات"),
      icon: Library,
    },
  ];

  const allLinks = [
    ...primaryLinks,
    {
      href: "/listening",
      label: t("শ্রবণ অনুশীলন", "Listening", "الاستماع"),
      icon: Headphones,
    },
    {
      href: "/speaking",
      label: t("কথোপকথন", "Speaking", "المحادثة"),
      icon: Mic,
    },
    {
      href: "/practice",
      label: t("পঠন, লিখন ও অনুবাদ", "Read/Write/Translate", "القراءة والكتابة"),
      icon: PenTool,
    },
    {
      href: "/quiz",
      label: t("কুইজ ও পরীক্ষা", "Quiz & Exam", "الاختبارات"),
      icon: HelpCircle,
    },
    {
      href: "/daily-challenge",
      label: t("দৈনিক চ্যালেঞ্জ", "Daily Challenge", "التحدي اليومي"),
      icon: CalendarCheck,
    },
    {
      href: "/leaderboard",
      label: t("লিডারবোর্ড", "Leaderboard", "لوحة المتصدرين"),
      icon: Trophy,
    },
    {
      href: "/certificates",
      label: t("সার্টিফিকেট", "Certificates", "الشهادات"),
      icon: Award,
    },
    {
      href: "/profile",
      label: t("প্রোফাইল", "Profile", "الملف الشخصي"),
      icon: User,
    },
    {
      href: "/admin",
      label: t("অ্যাডমিন প্যানেল", "Admin", "الإدارة"),
      icon: ShieldCheck,
    },
  ];

  const themeOptions: { id: Theme; label: string }[] = [
    { id: "emerald", label: t("ইসলামিক পান্না", "Emerald", "زمردي") },
    { id: "midnight", label: t("মিডনাইট ডার্ক", "Midnight", "ليلي") },
    { id: "academic", label: t("লাইট একাডেমিক", "Academic", "أكاديمي") },
  ];

  const langOptions: { id: Language; label: string }[] = [
    { id: "bn", label: "বাংলা" },
    { id: "en", label: "EN" },
    { id: "ar", label: "العربية" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-borderColor bg-bgPrimary/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accentPrimary/20 border border-accentGold/40 text-accentGold font-bold text-xl arabic-text">
            ض
          </div>
          <div>
            <span className="block text-base font-bold tracking-tight text-textPrimary leading-none">
              AI Arabic Academy
            </span>
            <span className="block text-[11px] text-accentGold mt-1 bangla-text">
              {t("স্মার্ট আরবি শিক্ষা প্ল্যাটফর্ম", "Smart Arabic Platform", "أكاديمية العربية الذكية")}
            </span>
          </div>
        </Link>

        {/* Desktop Primary Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {primaryLinks.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-accentPrimary/20 text-accentGold border border-accentGold/30"
                    : "text-textSecondary hover:bg-bgSecondary hover:text-textPrimary"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* XP & Streak Pill */}
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-2 rounded-full border border-accentGold/30 bg-bgSecondary px-3 py-1.5 text-xs font-semibold"
          >
            <span className="flex items-center gap-1 text-orange-400">
              <Flame className="h-3.5 w-3.5 fill-orange-400" />
              {stats.streak}
            </span>
            <span className="text-borderColor">|</span>
            <span className="text-accentGold">{stats.xp} XP</span>
          </Link>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center rounded-lg border border-borderColor bg-bgSecondary p-0.5">
            {langOptions.map((item) => (
              <button
                key={item.id}
                onClick={() => setLang(item.id)}
                className={`rounded-md px-2 py-1 text-xs font-medium transition ${
                  lang === item.id
                    ? "bg-accentPrimary text-white"
                    : "text-textSecondary hover:text-textPrimary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={() => {
              const order: Theme[] = ["emerald", "midnight", "academic"];
              const next = order[(order.indexOf(theme) + 1) % order.length];
              setTheme(next);
            }}
            title={t("থিম পরিবর্তন করুন", "Switch Theme", "تغيير المظهر")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-borderColor bg-bgSecondary text-accentGold hover:border-accentGold/60 transition"
          >
            <Palette className="h-4 w-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-borderColor bg-bgSecondary text-textPrimary"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Full Drawer (Mobile + Quick Access) */}
      {mobileOpen && (
        <div className="border-t border-borderColor bg-bgPrimary px-4 py-4 shadow-2xl">
          <div className="mx-auto max-w-7xl space-y-4">
            {/* Language & Theme Bar for Mobile */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-borderColor bg-bgSecondary p-3">
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-accentGold" />
                {langOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLang(item.id)}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                      lang === item.id
                        ? "bg-accentPrimary text-white"
                        : "text-textSecondary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <Palette className="h-4 w-4 text-accentGold" />
                {themeOptions.map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setTheme(th.id)}
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      theme === th.id
                        ? "bg-accentGold text-black font-semibold"
                        : "text-textSecondary"
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* All 15 Platform Routes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {allLinks.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                      active
                        ? "border-accentGold bg-accentPrimary/20 text-accentGold"
                        : "border-borderColor bg-bgSecondary/60 text-textPrimary hover:border-accentGold/40"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-accentPrimary" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
