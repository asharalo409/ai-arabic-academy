"use client";

import React from "react";
import Link from "next/link";
import {
  Bot,
  BookOpen,
  Headphones,
  Mic,
  GraduationCap,
  Sparkles,
  Library,
  PenTool,
  HelpCircle,
  CalendarCheck,
  LayoutDashboard,
  Trophy,
  Award,
  User,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const { t, stats } = useApp();

  const modules = [
    {
      href: "/ai-teacher",
      icon: Bot,
      title: t("AI আরবি শিক্ষক", "AI Arabic Teacher", "المعلم العربي الذكي"),
      desc: t(
        "বাংলা, ইংরেজি ও আরবিতে ২৪/৭ ব্যাকরণ, অনুবাদ ও বাক্য সংশোধন।",
        "24/7 grammar, translation & sentence correction in Bangla, English & Arabic.",
        "تصحيح الجمل وشرح القواعد والترجمة على مدار الساعة."
      ),
      badge: "Gemini AI",
    },
    {
      href: "/courses",
      icon: BookOpen,
      title: t("১,০০০ লেসন কারিকুলাম", "1,000-Lesson Curriculum", "منهج ١٠٠٠ درس"),
      desc: t(
        "৬টি লেভেল, ১০০টি অধ্যায় এবং পূর্ণ হরকত ও সংলাপসহ ধারাবাহিক পাঠ।",
        "6 levels, 100 chapters, full Harakat dialogues & interactive exercises.",
        "٦ مستويات و١٠٠ فصل مع حوارات مشكولة وتدريبات."
      ),
      badge: t("৬ লেভেল", "6 Levels", "٦ مستويات"),
    },
    {
      href: "/grammar",
      icon: GraduationCap,
      title: t("নাহু ও সরফ (ব্যাকরণ)", "Nahw & Sarf Grammar", "النحو والصرف"),
      desc: t(
        "ইসম, ফে'ল, হরফ, মুবতাদা-খবর, ই'রাব ও ক্রিয়া রূপান্তর সহজ বাংলায়।",
        "Ism, Fi'l, Harf, Mubtada-Khabar, I'rab & verb conjugation explained clearly.",
        "شرح قواعد النحو والصرف مع أمثلة مشكولة."
      ),
      badge: t("নাহু ও সরফ", "Nahw & Sarf", "قواعد"),
    },
    {
      href: "/quranic-arabic",
      icon: Sparkles,
      title: t("কুরআনিক আরবি", "Quranic Arabic", "العربية القرآنية"),
      desc: t(
        "শব্দে শব্দে অর্থ, মূল ধাতু (Root Words) এবং কুরআনিক ব্যাকরণ বিশ্লেষণ।",
        "Word-by-word translation, root words & authentic Quranic grammar.",
        "مفردات القرآن والجذور اللغوية والإعراب."
      ),
      badge: t("বিশুদ্ধ রেফারেন্স", "Authentic", "قرآني"),
    },
    {
      href: "/vocabulary",
      icon: Library,
      title: t("শব্দভাণ্ডার ও ফ্ল্যাশকার্ড", "Vocabulary Builder", "بناء المفردات"),
      desc: t(
        "পূর্ণ হরকত, বাংলা উচ্চারণ, অডিও এবং স্পেসড রিপিটিশন ফ্ল্যাশকার্ড।",
        "Full Harakat, Bangla pronunciation, audio & spaced repetition flashcards.",
        "بطاقات تعليمية مع التشكيل الكامل والنطق."
      ),
      badge: "Flashcards",
    },
    {
      href: "/listening",
      icon: Headphones,
      title: t("শ্রবণ অনুশীলন", "Listening Practice", "تدريب الاستماع"),
      desc: t(
        "স্বাভাবিক ও ধীর গতির আরবি অডিও প্লেব্যাক এবং শ্রবণ কুইজ।",
        "Normal & slow Arabic audio playback with comprehension quizzes.",
        "استماع بطيء وعادي مع اختبارات الفهم."
      ),
      badge: "Audio",
    },
    {
      href: "/speaking",
      icon: Mic,
      title: t("কথোপকথন অনুশীলন", "Speaking Practice", "تدريب المحادثة"),
      desc: t(
        "মাইক্রোফোনে আরবি বলুন এবং AI থেকে তাৎক্ষণিক উচ্চারণ ও ব্যাকরণ ফিডব্যাক নিন।",
        "Speak Arabic into your mic and get instant AI grammar & fluency feedback.",
        "تحدث بالعربية واحصل على تقييم فوري."
      ),
      badge: "Speech AI",
    },
    {
      href: "/practice",
      icon: PenTool,
      title: t("পঠন, লিখন ও অনুবাদ", "Reading, Writing & Translation", "القراءة والكتابة والترجمة"),
      desc: t(
        "হরকতসহ অনুচ্ছেদ পাঠ, আরবি বাক্য লেখা এবং ত্রিভাষিক অনুবাদ অনুশীলন।",
        "Guided reading passages, Arabic writing prompts & trilingual translation.",
        "تدريبات القراءة والكتابة والترجمة."
      ),
      badge: "3-in-1",
    },
    {
      href: "/quiz",
      icon: HelpCircle,
      title: t("কুইজ ও পরীক্ষা", "Quiz & Examination", "الاختبارات والامتحانات"),
      desc: t(
        "MCQ, শূন্যস্থান পূরণ, ব্যাকরণ পরীক্ষা ও সময়বদ্ধ মূল্যায়ন।",
        "MCQs, fill-in-the-blanks, grammar tests & timed examinations.",
        "اختبارات متنوعة مع التصحيح والشرح."
      ),
      badge: "Exam",
    },
    {
      href: "/daily-challenge",
      icon: CalendarCheck,
      title: t("দৈনিক চ্যালেঞ্জ", "Daily Challenge", "التحدي اليومي"),
      desc: t(
        "প্রতিদিন নতুন ৫টি আরবি চ্যালেঞ্জ সমাধান করে XP ও স্ট্রিক ধরে রাখুন।",
        "Complete 5 daily Arabic tasks to earn bonus XP and maintain your streak.",
        "أكمل التحدي اليومي واكسب نقاط خبرة."
      ),
      badge: "+100 XP",
    },
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      title: t("স্টুডেন্ট ড্যাশবোর্ড", "Student Dashboard", "لوحة الطالب"),
      desc: t(
        "সম্পন্ন লেসন, অর্জিত XP, দৈনিক স্ট্রিক ও শেখার অগ্রগতি দেখুন।",
        "Track completed lessons, earned XP, daily streaks & quiz history.",
        "تتبع تقدمك الدراسي ونقاط الخبرة."
      ),
      badge: `${stats.xp} XP`,
    },
    {
      href: "/leaderboard",
      icon: Trophy,
      title: t("লিডারবোর্ড", "Leaderboard", "لوحة المتصدرين"),
      desc: t(
        "সাপ্তাহিক ও সর্বকালের সেরা শিক্ষার্থীদের র‍্যাংকিং দেখুন।",
        "See top Arabic learners ranked by real study XP and streaks.",
        "ترتيب الطلاب الأكثر نشاطاً."
      ),
      badge: "Top 10",
    },
    {
      href: "/certificates",
      icon: Award,
      title: t("সার্টিফিকেট", "Certificates", "الشهادات"),
      desc: t(
        "কোর্স ও লেভেল সম্পন্ন করলে প্রিন্টযোগ্য ডিজিটাল সার্টিফিকেট অর্জন করুন।",
        "Earn verifiable printable certificates upon completing milestones.",
        "احصل على شهادات إتمام معتمدة."
      ),
      badge: "Verified",
    },
    {
      href: "/profile",
      icon: User,
      title: t("শিক্ষার্থী প্রোফাইল", "Student Profile", "الملف الشخصي"),
      desc: t(
        "আপনার শেখার লক্ষ্য, লেভেল, ভাষা এবং অ্যাকাউন্ট সেটিংস পরিচালনা করুন।",
        "Manage your learning goals, level, language and Supabase account.",
        "إدارة حسابك وأهدافك التعليمية."
      ),
      badge: "Account",
    },
    {
      href: "/admin",
      icon: ShieldCheck,
      title: t("অ্যাডমিন কন্টেন্ট প্যানেল", "Admin Management", "لوحة الإدارة"),
      desc: t(
        "নতুন লেসন, শব্দভাণ্ডার ও কুইজ যুক্ত করার সুরক্ষিত কন্টেন্ট ম্যানেজমেন্ট।",
        "Protected content management to add new lessons, words & quizzes.",
        "إدارة المحتوى والدروس والاختبارات."
      ),
      badge: "Protected",
    },
  ];

  const audiences = [
    t("স্কুল শিক্ষার্থী", "School Students", "طلاب المدارس"),
    t("কলেজ শিক্ষার্থী", "College Students", "طلاب الكليات"),
    t("বিশ্ববিদ্যালয় শিক্ষার্থী", "University Students", "طلاب الجامعات"),
    t("মাদ্রাসা শিক্ষার্থী", "Madrasa Students", "طلاب المعاهد الدينية"),
    t("নতুন আরবি শিক্ষার্থী", "Beginners", "المبتدئون"),
    t("কুরআনিক আরবি শিক্ষার্থী", "Quranic Learners", "دارسو العربية القرآنية"),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 space-y-14">
      {/* Hero Section */}
      <section className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-10 md:p-14">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accentGold/40 bg-accentPrimary/15 px-4 py-1.5 text-xs font-semibold text-accentGold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>
              {t(
                "১০০% ফ্রি • পূর্ণ হরকতসহ আধুনিক ও কুরআনিক আরবি শিক্ষা",
                "100% Free • Modern & Quranic Arabic with Full Harakat",
                "مجاني ١٠٠٪ • تعليم العربية الحديثة والقرآنية بالتشكيل الكامل"
              )}
            </span>
          </div>

          <p className="arabic-text text-2xl sm:text-3xl md:text-4xl font-bold text-accentGold">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — أَهْلًا وَسَهْلًا بِكُمْ فِي أَكَادِيمِيَّةِ الْعَرَبِيَّةِ الذَّكِيَّةِ
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-textPrimary leading-tight bangla-text">
            {t(
              "বাংলায় সহজ ও বিজ্ঞানসম্মত উপায়ে আরবি ভাষা শিখুন",
              "Master Arabic Language Scientifically with AI Guidance",
              "أتقن اللغة العربية بطريقة علمية حديثة مع الذكاء الاصطناعي"
            )}
          </h1>

          <p className="text-base sm:text-lg text-textSecondary bangla-text leading-relaxed">
            {t(
              "নাহু-সরফ ব্যাকরণ, কুরআনিক আরবি, ১,০০০টি ধাপে ধাপে সাজানো লেসন, ইন্টারেক্টিভ অডিও-স্পিকিং এবং ২৪/৭ Gemini AI আরবি শিক্ষকের সাথে আপনার আরবি শেখার যাত্রা শুরু করুন।",
              "Start your journey with Nahw & Sarf grammar, Quranic Arabic, a 1,000-lesson curriculum, interactive audio & speaking, and a 24/7 Gemini AI Arabic Teacher.",
              "ابدأ رحلتك مع قواعد النحو والصرف، والعربية القرآنية، ومنهج من ١٠٠٠ درس، ومحادثة تفاعلية مع المعلم الذكي."
            )}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/ai-teacher"
              className="inline-flex items-center gap-2 rounded-xl bg-accentPrimary px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-95 transition"
            >
              <Bot className="h-5 w-5" />
              <span>
                {t("AI শিক্ষকের সাথে কথা বলুন", "Start with AI Teacher", "ابدأ مع المعلم الذكي")}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/courses/beginners"
              className="inline-flex items-center gap-2 rounded-xl border border-accentGold/50 bg-bgSecondary px-6 py-3.5 text-sm font-bold text-accentGold hover:bg-accentGold/10 transition"
            >
              <BookOpen className="h-5 w-5" />
              <span>
                {t("বেগিনার কোর্স শুরু করুন", "Explore Beginner Course", "دورة المبتدئين")}
              </span>
            </Link>
          </div>
        </div>

        {/* Target Audience Pills */}
        <div className="mt-8 border-t border-borderColor pt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-textSecondary mb-3">
            {t("যাদের জন্য তৈরি:", "Designed For:", "مصمم خصيصاً لـ:")}
          </p>
          <div className="flex flex-wrap gap-2">
            {audiences.map((aud, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-lg border border-borderColor bg-bgPrimary/70 px-3 py-1.5 text-xs font-medium text-textPrimary"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-accentPrimary" />
                {aud}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-accentGold">1,000</p>
          <p className="text-xs sm:text-sm text-textSecondary mt-1">
            {t("স্ট্রাকচার্ড লেসন আর্কিটেকচার", "Structured Lessons", "درس تعليمي متكامل")}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-accentPrimary">6</p>
          <p className="text-xs sm:text-sm text-textSecondary mt-1">
            {t("দক্ষতা স্তর (Levels)", "Proficiency Levels", "مستويات دراسية")}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-accentGold">100%</p>
          <p className="text-xs sm:text-sm text-textSecondary mt-1">
            {t("পূর্ণ হরকত ও বাংলা অর্থ", "Full Harakat & Meanings", "تشكيل كامل وترجمة")}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-accentPrimary">24/7</p>
          <p className="text-xs sm:text-sm text-textSecondary mt-1">
            {t("Gemini AI আরবি টিউটর", "Gemini AI Arabic Tutor", "معلم ذكي على مدار الساعة")}
          </p>
        </div>
      </section>

      {/* Complete 15-Route Learning Ecosystem Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary bangla-text">
              {t("সম্পূর্ণ আরবি শিক্ষা মডিউলসমূহ", "Complete Learning Modules", "جميع وحدات التعلم")}
            </h2>
            <p className="text-sm text-textSecondary mt-1">
              {t(
                "যেকোনো মডিউলে ট্যাপ করে সরাসরি অনুশীলন শুরু করুন।",
                "Tap any module below to begin interactive practice immediately.",
                "اختر أي وحدة للبدء في التعلم التفاعلي فوراً."
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.href}
                href={mod.href}
                className="glass-card group rounded-2xl p-5 hover:border-accentGold/60 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accentPrimary/15 text-accentPrimary group-hover:bg-accentPrimary group-hover:text-white transition">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-accentGold/30 bg-bgPrimary/70 px-2.5 py-0.5 text-[11px] font-semibold text-accentGold">
                      {mod.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-textPrimary group-hover:text-accentGold transition bangla-text">
                    {mod.title}
                  </h3>
                  <p className="mt-2 text-sm text-textSecondary bangla-text leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-borderColor/50 flex items-center justify-between text-xs font-semibold text-accentPrimary">
                  <span>{t("প্রবেশ করুন", "Open Module", "افتح الوحدة")}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
