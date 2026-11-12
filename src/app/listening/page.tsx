
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Headphones,
  Play,
  Square,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Languages,
  BookOpen,
} from "lucide-react";

const lessons = [
  {
    title: "Greetings",
    level: "Beginner",
    items: [
      { arabic: "السَّلَامُ عَلَيْكُمْ", meaning: "আপনার ওপর শান্তি বর্ষিত হোক", english: "Peace be upon you" },
      { arabic: "وَعَلَيْكُمُ السَّلَامُ", meaning: "আপনার ওপরও শান্তি বর্ষিত হোক", english: "And peace be upon you too" },
      { arabic: "كَيْفَ حَالُكَ؟", meaning: "আপনি কেমন আছেন?", english: "How are you?" },
      { arabic: "أَنَا بِخَيْرٍ", meaning: "আমি ভালো আছি", english: "I am fine" },
    ],
  },
  {
    title: "Daily Vocabulary",
    level: "Beginner",
    items: [
      { arabic: "كِتَابٌ", meaning: "বই", english: "Book" },
      { arabic: "قَلَمٌ", meaning: "কলম", english: "Pen" },
      { arabic: "مَدْرَسَةٌ", meaning: "বিদ্যালয়", english: "School" },
      { arabic: "مَاءٌ", meaning: "পানি", english: "Water" },
    ],
  },
  {
    title: "Useful Sentences",
    level: "Intermediate",
    items: [
      { arabic: "أَنَا أَتَعَلَّمُ اللُّغَةَ الْعَرَبِيَّةَ", meaning: "আমি আরবি ভাষা শিখছি", english: "I am learning Arabic" },
      { arabic: "أُحِبُّ قِرَاءَةَ الْكُتُبِ", meaning: "আমি বই পড়তে ভালোবাসি", english: "I love reading books" },
      { arabic: "أَيْنَ الْمَكْتَبَةُ؟", meaning: "লাইব্রেরি কোথায়?", english: "Where is the library?" },
      { arabic: "الْعِلْمُ نُورٌ", meaning: "জ্ঞান আলো", english: "Knowledge is light" },
    ],
  },
];

export default function ListeningPage() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [showMeaning, setShowMeaning] = useState(true);
  const [supported, setSupported] = useState(false);

  const lesson = lessons[lessonIndex];

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    );

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function stopAudio() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlaying(null);
  }

  function playAudio(index: number) {
    if (!("speechSynthesis" in window)) {
      alert("এই ব্রাউজারে Audio Speech সাপোর্ট নেই। Chrome ব্যবহার করুন।");
      return;
    }

    window.speechSynthesis.cancel();

    const item = lesson.items[index];
    const utterance = new SpeechSynthesisUtterance(item.arabic);

    utterance.lang = "ar-SA";
    utterance.rate = 0.75;
    utterance.pitch = 1;

    utterance.onstart = () => setPlaying(index);

    utterance.onend = () => {
      setPlaying(null);
      setCompleted((old) =>
        old.includes(index) ? old : [...old, index]
      );
    };

    utterance.onerror = () => setPlaying(null);

    window.speechSynthesis.speak(utterance);
  }

  function changeLesson(index: number) {
    stopAudio();
    setLessonIndex(index);
    setCompleted([]);
  }

  const progress = Math.round(
    (completed.length / lesson.items.length) * 100
  );

  return (
    <main className="min-h-screen bg-[#080d19] text-white">

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080d19]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-300 hover:text-emerald-400">
            <ArrowLeft size={19} />
            Home
          </Link>

          <div className="flex items-center gap-2">
            <Headphones className="text-emerald-400" />
            <span className="font-bold">Listening Practice</span>
          </div>

          <button
            onClick={stopAudio}
            className="rounded-lg border border-white/10 p-2 text-slate-300"
            aria-label="Stop audio"
          >
            <Square size={17} />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-10">

        <section className="mb-9 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-blue-500/5 p-7 md:p-10">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <Volume2 size={19} />
            ARABIC AUDIO CLASSROOM
          </div>

          <h1 className="mt-5 text-3xl font-extrabold md:text-5xl">
            Listen & Learn <span className="text-emerald-400">Arabic</span>
          </h1>

          <p className="mt-4 max-w-2xl leading-8 text-slate-400">
            আরবি শব্দ ও বাক্য শুনুন, বাংলা অর্থ বুঝুন এবং
            বারবার শুনে নিজের শ্রবণ দক্ষতা উন্নত করুন।
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
              <Languages className="mr-2 inline" size={14} />
              Arabic + Bengali
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
              <BookOpen className="mr-2 inline" size={14} />
              Beginner Friendly
            </span>
          </div>
        </section>

        <section className="mb-7">
          <h2 className="mb-4 text-lg font-bold">Choose Your Lesson</h2>

          <div className="grid gap-3 sm:grid-cols-3">
            {lessons.map((item, index) => (
              <button
                key={item.title}
                onClick={() => changeLesson(index)}
                className={`rounded-2xl border p-5 text-left transition ${
                  lessonIndex === index
                    ? "border-emerald-400 bg-emerald-400/10"
                    : "border-white/10 bg-[#111c2e] hover:border-emerald-400/40"
                }`}
              >
                <span className="text-xs text-emerald-400">{item.level}</span>
                <h3 className="mt-2 font-bold">{item.title}</h3>
                <p className="mt-2 text-xs text-slate-400">
                  {item.items.length} Listening Exercises
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#0d1728] p-5 md:p-8">

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">{lesson.title}</h2>
              <p className="mt-1 text-sm text-slate-400">
                Complete each listening exercise
              </p>
            </div>

            <button
              onClick={() => setShowMeaning(!showMeaning)}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs text-emerald-400"
            >
              {showMeaning ? "Hide Meaning" : "Show Meaning"}
            </button>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-slate-400">
              <span>Your Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {lesson.items.map((item, index) => (
              <div
                key={item.arabic}
                className="rounded-2xl border border-white/10 bg-[#111c2e] p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">
                    LESSON {String(index + 1).padStart(2, "0")}
                  </span>

                  {completed.includes(index) && (
                    <span className="flex items-center gap-1 text-xs text-emerald-400">
                      <CheckCircle2 size={15} />
                      Completed
                    </span>
                  )}
                </div>

                <p
                  dir="rtl"
                  className="mt-5 text-center text-3xl font-bold leading-relaxed text-emerald-300"
                >
                  {item.arabic}
                </p>

                {showMeaning && (
                  <div className="mt-4 text-center">
                    <p className="text-base font-semibold">{item.meaning}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.english}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex justify-center gap-3">
                  <button
                    onClick={() => playAudio(index)}
                    disabled={!supported}
                    className="flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-[#07130f] hover:bg-emerald-300 disabled:opacity-50"
                  >
                    {playing === index ? (
                      <RotateCcw size={17} />
                    ) : (
                      <Play size={17} />
                    )}
                    {playing === index ? "Playing..." : "Listen"}
                  </button>

                  {playing === index && (
                    <button
                      onClick={stopAudio}
                      className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm"
                    >
                      <Square size={16} />
                      Stop
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              stopAudio();
              setCompleted([]);
            }}
            className="mt-6 flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400"
          >
            <RotateCcw size={16} />
            Reset Progress
          </button>

        </section>

        {!supported && (
          <p className="mt-5 text-center text-sm text-amber-400">
            এই ব্রাউজারে Speech Synthesis পাওয়া যাচ্ছে না।
          </p>
        )}

        <p className="mt-6 text-center text-xs leading-6 text-slate-500">
          Audio আপনার ডিভাইসের Speech Synthesis ব্যবহার করে তৈরি হয়।
          আরবি Voice ইনস্টল না থাকলে উচ্চারণ কাজ নাও করতে পারে।
        </p>

      </div>
    </main>
  );
}
