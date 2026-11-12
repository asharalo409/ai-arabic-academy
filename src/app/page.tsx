
"use client";

import { useState } from "react";
import {
  BookOpen,
  Brain,
  Headphones,
  Mic,
  GraduationCap,
  Sparkles,
  Languages,
  ArrowRight,
  CheckCircle2,
  Menu,
  Play,
  Globe2,
  BookMarked,
  MessageCircle,
  X,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Arabic Teacher",
    description: "Learn Arabic with an intelligent AI tutor that explains lessons and answers your questions.",
    href: "/ai-teacher",
  },
  {
    icon: Headphones,
    title: "Listening Practice",
    description: "Listen to Arabic words, sentences and conversations to improve your pronunciation.",
    href: "/listening",
  },
  {
    icon: Mic,
    title: "Speaking Practice",
    description: "Practice speaking Arabic and improve your communication skills.",
    href: "/speaking",
  },
  {
    icon: BookOpen,
    title: "Arabic Grammar",
    description: "Understand Nahw, Sarf and Arabic sentence structures step by step.",
    href: "/grammar",
  },
  {
    icon: BookMarked,
    title: "Quranic Arabic",
    description: "Explore Quranic vocabulary, meanings and Arabic language structures.",
    href: "/quranic-arabic",
  },
  {
    icon: GraduationCap,
    title: "Quizzes & Tests",
    description: "Test your knowledge with interactive exercises and quizzes.",
    href: "/quiz",
  },
];

const courses = [
  {
    number: "01",
    title: "Arabic for Beginners",
    subtitle: "Start from the basics",
    level: "Beginner",
    href: "/courses/beginners",
  },
  {
    number: "02",
    title: "Arabic Grammar",
    subtitle: "Learn Nahw and Sarf",
    level: "Intermediate",
    href: "/grammar",
  },
  {
    number: "03",
    title: "Quranic Arabic",
    subtitle: "Understand Quranic words",
    level: "All Levels",
    href: "/quranic-arabic",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#080d19] text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d19]/95 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400 text-[#07130f]">
              <BookOpen size={25} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                AI Arabic Academy
              </h1>
              <p className="text-[10px] tracking-[3px] text-emerald-400">
                LEARN • PRACTICE • MASTER
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#home" className="hover:text-emerald-400">Home</a>
            <a href="#features" className="hover:text-emerald-400">Features</a>
            <a href="#courses" className="hover:text-emerald-400">Courses</a>
            <a href="#about" className="hover:text-emerald-400">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="/ai-teacher" className="primary-button hidden text-sm sm:inline-flex">
              Start Learning
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg border border-white/10 p-2 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-white/10 bg-[#0b1220] p-5 md:hidden">
            <div className="flex flex-col gap-5 text-sm text-slate-300">
              <a onClick={() => setMenuOpen(false)} href="#home">Home</a>
              <a onClick={() => setMenuOpen(false)} href="#features">Features</a>
              <a onClick={() => setMenuOpen(false)} href="#courses">Courses</a>
              <a onClick={() => setMenuOpen(false)} href="#about">About</a>
              <a onClick={() => setMenuOpen(false)} href="/ai-teacher" className="font-bold text-emerald-400">Open AI Teacher</a>
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="container relative mx-auto grid min-h-[650px] items-center gap-14 px-4 py-20 lg:grid-cols-2">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-300">
              <Sparkles size={15} />
              THE FUTURE OF ARABIC LEARNING
            </div>

            <h2 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
              Discover the
              <span className="gradient-text block">Beauty of</span>
              Arabic Language
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 md:text-lg">
              Master Arabic with AI-powered lessons, interactive exercises,
              listening practice and personalized learning.
              From beginner to advanced, your journey starts here.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="/courses" className="primary-button flex items-center gap-2">
                Start Learning <ArrowRight size={18} />
              </a>
              <a href="#features" className="flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold hover:border-emerald-400">
                <Play size={17} className="text-emerald-400" />
                Explore Academy
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-7 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-400" />
                Beginner Friendly
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-400" />
                AI Powered
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-400" />
                Learn Anywhere
              </span>
            </div>
          </div>

          {/* ARABIC HERO CARD */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-0 rounded-[35px] bg-emerald-400/10 blur-3xl" />
            <div className="glass relative overflow-hidden p-7 md:p-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest text-emerald-400">
                  YOUR ARABIC JOURNEY
                </span>
                <Globe2 className="text-emerald-400" />
              </div>

              <div className="py-14 text-center">
                <p className="text-7xl leading-relaxed text-emerald-300 md:text-8xl">
                  العربية
                </p>
                <h3 className="mt-5 text-2xl font-bold">
                  Learn Arabic Beautifully
                </h3>
                <p className="mt-3 text-sm text-slate-400">
                  اللغة العربية مفتاح العلم والفهم
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Languages className="mb-3 text-emerald-400" />
                  <p className="font-semibold">Vocabulary</p>
                  <p className="mt-1 text-xs text-slate-400">Learn new words</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <MessageCircle className="mb-3 text-emerald-400" />
                  <p className="font-semibold">Conversation</p>
                  <p className="mt-1 text-xs text-slate-400">Practice Arabic</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-emerald-400/10 p-4 text-center">
                <p className="text-sm text-emerald-300">
                  بسم الله نبدأ رحلة التعلم
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Begin your journey of knowledge
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-y border-white/5 bg-[#0b1220] py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-bold tracking-[3px] text-emerald-400">
              POWERFUL LEARNING TOOLS
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Everything You Need to
              <span className="gradient-text"> Master Arabic</span>
            </h2>
            <p className="mt-5 leading-7 text-slate-400">
              A complete learning environment designed to make Arabic
              education easier, smarter and more enjoyable.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <a
                  key={feature.title}
                  href={feature.href}
                  className="glass group block rounded-2xl p-7 transition duration-300 hover:-translate-y-2 hover:border-emerald-400/40"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 transition group-hover:bg-emerald-400 group-hover:text-[#07130f]">
                    <Icon size={27} />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {feature.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-400">
                    Explore Feature <ArrowRight size={15} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="text-xs font-bold tracking-[3px] text-emerald-400">
                LEARNING PATHS
              </span>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                Explore Our Courses
              </h2>
              <p className="mt-4 text-slate-400">
                Choose your path and start learning today.
              </p>
            </div>
            <span className="rounded-xl border border-emerald-400/20 px-4 py-2 text-sm text-emerald-300">
              All Levels Welcome
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {courses.map((course) => (
              <div key={course.number} className="glass rounded-2xl p-7 transition hover:border-emerald-400/40">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-extrabold text-emerald-400/30">
                    {course.number}
                  </span>
                  <BookOpen className="text-emerald-400" size={25} />
                </div>
                <h3 className="mt-7 text-xl font-bold">{course.title}</h3>
                <p className="mt-3 text-sm text-slate-400">{course.subtitle}</p>
                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-xs text-emerald-300">{course.level}</span>
                  <a href={course.href} className="flex items-center gap-2 text-sm font-semibold hover:text-emerald-400">
                    Learn More <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/courses" className="primary-button inline-flex items-center gap-2">
              View All Courses <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section id="about" className="bg-[#0b1220] py-24">
        <div className="container mx-auto px-4">
          <div className="glass grid items-center gap-10 rounded-3xl p-8 md:p-14 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold tracking-[3px] text-emerald-400">
                YOUR PERSONAL AI TUTOR
              </span>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">
                Meet Your
                <span className="gradient-text"> AI Arabic Teacher</span>
              </h2>
              <p className="mt-6 leading-8 text-slate-400">
                Get personalized explanations, Arabic translations,
                grammar support and interactive practice with your
                intelligent learning assistant.
              </p>
              <ul className="mt-7 space-y-4 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400" />
                  Ask questions in Bangla, English or Arabic
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400" />
                  Get grammar explanations and examples
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400" />
                  Practice with AI-generated exercises
                </li>
              </ul>
              <a href="/ai-teacher" className="primary-button mt-9 inline-flex items-center gap-2">
                Open AI Teacher <ArrowRight size={17} />
              </a>
            </div>

            <div className="rounded-3xl border border-emerald-400/20 bg-[#080d19] p-6 md:p-9">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400 text-[#07130f]">
                  <Brain size={25} />
                </div>
                <div>
                  <p className="font-bold">Arabic AI Assistant</p>
                  <p className="text-xs text-emerald-400">Learning preview</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/5 p-5">
                <p className="text-xs text-slate-400">YOUR QUESTION</p>
                <p className="mt-3 text-lg" dir="rtl">
                  ما معنى كلمة العلم؟
                </p>
              </div>
              <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
                <p className="text-xs text-emerald-400">AI EXPLANATION</p>
                <p className="mt-3 text-lg" dir="rtl">
                  العلم هو المعرفة والفهم.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  العلم means knowledge or understanding.
                  বাংলায় এর অর্থ জ্ঞান বা বিদ্যা।
                </p>
              </div>
              <p className="mt-5 text-center text-xs text-slate-500">
                Open AI Teacher to start a real conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-5 px-4 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-lg font-bold">AI Arabic Academy</h3>
            <p className="mt-2 text-xs text-slate-500">
              Learn Arabic. Understand More. Grow Every Day.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            © 2026 AI Arabic Academy. All rights reserved.
          </p>
          <p className="text-sm text-emerald-400">
            صلوا على النبي ﷺ
          </p>
        </div>
      </footer>
    </main>
  );
}
