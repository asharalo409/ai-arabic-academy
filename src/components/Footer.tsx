"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="mt-16 border-t border-borderColor bg-bgSecondary/60">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accentPrimary/20 border border-accentGold/40 text-accentGold font-bold text-lg arabic-text">
                ض
              </div>
              <span className="text-lg font-bold text-textPrimary">
                AI Arabic Academy
              </span>
            </div>
            <p className="text-sm text-textSecondary bangla-text leading-relaxed">
              {t(
                "স্কুল, কলেজ, বিশ্ববিদ্যালয়, মাদ্রাসা শিক্ষার্থী এবং কুরআনিক আরবি শিক্ষার্থীদের জন্য সম্পূর্ণ বিনামূল্যে AI-চালিত আধুনিক আরবি শিক্ষা প্ল্যাটফর্ম।",
                "A free AI-powered modern and Quranic Arabic learning platform for school, college, university, and madrasa learners.",
                "منصة مجانية مدعومة بالذكاء الاصطناعي لتعلم اللغة العربية الحديثة والقرآنية للطلاب في جميع المراحل."
              )}
            </p>
          </div>

          {/* Learning Modules */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accentGold mb-3">
              {t("শিক্ষা মডিউল", "Learning Modules", "وحدات التعلم")}
            </h3>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li>
                <Link href="/courses" className="hover:text-accentPrimary transition">
                  {t("১,০০০ লেসন কারিকুলাম", "1,000-Lesson Curriculum", "منهج ١٠٠٠ درس")}
                </Link>
              </li>
              <li>
                <Link href="/grammar" className="hover:text-accentPrimary transition">
                  {t("নাহু ও সরফ ব্যাকরণ", "Nahw & Sarf Grammar", "النحو والصرف")}
                </Link>
              </li>
              <li>
                <Link href="/quranic-arabic" className="hover:text-accentPrimary transition">
                  {t("কুরআনিক আরবি", "Quranic Arabic", "العربية القرآنية")}
                </Link>
              </li>
              <li>
                <Link href="/vocabulary" className="hover:text-accentPrimary transition">
                  {t("শব্দভাণ্ডার ও ফ্ল্যাশকার্ড", "Vocabulary & Flashcards", "المفردات والبطاقات")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Practice */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accentGold mb-3">
              {t("ইন্টারেক্টিভ অনুশীলন", "Interactive Practice", "التدريب التفاعلي")}
            </h3>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li>
                <Link href="/ai-teacher" className="hover:text-accentPrimary transition">
                  {t("AI আরবি শিক্ষক (Gemini)", "AI Arabic Teacher", "المعلم الذكي")}
                </Link>
              </li>
              <li>
                <Link href="/listening" className="hover:text-accentPrimary transition">
                  {t("শ্রবণ অনুশীলন", "Listening Practice", "تدريب الاستماع")}
                </Link>
              </li>
              <li>
                <Link href="/speaking" className="hover:text-accentPrimary transition">
                  {t("কথোপকথন ও উচ্চারণ", "Speaking Practice", "تدريب المحادثة")}
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-accentPrimary transition">
                  {t("কুইজ ও পরীক্ষা", "Quiz & Examination", "الاختبارات")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Portal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accentGold mb-3">
              {t("শিক্ষার্থী পোর্টাল", "Student Portal", "بوابة الطالب")}
            </h3>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li>
                <Link href="/dashboard" className="hover:text-accentPrimary transition">
                  {t("স্টুডেন্ট ড্যাশবোর্ড", "Student Dashboard", "لوحة الطالب")}
                </Link>
              </li>
              <li>
                <Link href="/daily-challenge" className="hover:text-accentPrimary transition">
                  {t("দৈনিক চ্যালেঞ্জ", "Daily Challenge", "التحدي اليومي")}
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-accentPrimary transition">
                  {t("লিডারবোর্ড", "Leaderboard", "لوحة المتصدرين")}
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-accentPrimary transition">
                  {t("সার্টিফিকেট", "Certificates", "الشهادات")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-borderColor pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-textSecondary">
          <p>
            © {new Date().getFullYear()} AI Arabic Academy.{" "}
            {t(
              "সর্বস্বত্ব সংরক্ষিত — সবার জন্য উন্মুক্ত ও বিনামূল্যে আরবি শিক্ষা।",
              "All rights reserved — Open & Free Arabic Education.",
              "جميع الحقوق محفوظة — تعليم اللغة العربية مجاناً للجميع."
            )}
          </p>
          <p className="text-accentGold">
            {t("বাংলা • English • العربية", "বাংলা • English • العربية", "বাংলা • English • العربية")}
          </p>
        </div>
      </div>
    </footer>
  );
}
