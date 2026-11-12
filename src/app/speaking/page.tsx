
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mic,
  MicOff,
  Volume2,
  RotateCcw,
  CheckCircle2,
  MessageCircle,
  Headphones,
  Languages,
} from "lucide-react";

type Exercise = {
  arabic: string;
  meaning: string;
  english: string;
};

type RecognitionResult = {
  transcript: string;
};

type RecognitionEvent = {
  results: ArrayLike<ArrayLike<RecognitionResult>>;
};

type RecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type RecognitionWindow = Window & {
  SpeechRecognition?: new () => RecognitionInstance;
  webkitSpeechRecognition?: new () => RecognitionInstance;
};

const exercises: Exercise[] = [
  {
    arabic: "السَّلَامُ عَلَيْكُمْ",
    meaning: "আপনার ওপর শান্তি বর্ষিত হোক",
    english: "Peace be upon you",
  },
  {
    arabic: "كَيْفَ حَالُكَ؟",
    meaning: "আপনি কেমন আছেন?",
    english: "How are you?",
  },
  {
    arabic: "أَنَا بِخَيْرٍ",
    meaning: "আমি ভালো আছি",
    english: "I am fine",
  },
  {
    arabic: "أَنَا أَتَعَلَّمُ اللُّغَةَ الْعَرَبِيَّةَ",
    meaning: "আমি আরবি ভাষা শিখছি",
    english: "I am learning Arabic",
  },
  {
    arabic: "شُكْرًا جَزِيلًا",
    meaning: "অনেক ধন্যবাদ",
    english: "Thank you very much",
  },
];

export default function SpeakingPage() {
  const [index, setIndex] = useState(0);
  const [recognized, setRecognized] = useState("");
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const [error, setError] = useState("");

  const exercise = exercises[index];

  useEffect(() => {
    const speechWindow = window as RecognitionWindow;

    setSupported(
      Boolean(
        speechWindow.SpeechRecognition ||
        speechWindow.webkitSpeechRecognition
      )
    );
  }, []);

  function speakArabic() {
    if (!("speechSynthesis" in window)) {
      setError("আপনার ব্রাউজারে Arabic Audio সাপোর্ট নেই।");
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(exercise.arabic);
    speech.lang = "ar-SA";
    speech.rate = 0.75;

    window.speechSynthesis.speak(speech);
  }

  function startRecording() {
    const speechWindow = window as RecognitionWindow;
    const Recognition =
      speechWindow.SpeechRecognition ||
      speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      setError("আপনার ব্রাউজারে Voice Recognition সাপোর্ট নেই। Chrome ব্যবহার করুন।");
      return;
    }

    setError("");
    setRecognized("");

    const recognition = new Recognition();
    recognition.lang = "ar-SA";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      setRecognized(transcript);
    };

    recognition.onerror = () => {
      setError("মাইক্রোফোন কাজ করছে না। Microphone permission পরীক্ষা করুন।");
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    try {
      recognition.start();
      setListening(true);
    } catch {
      setError("মাইক্রোফোন চালু করা যায়নি। আবার চেষ্টা করুন।");
      setListening(false);
    }
  }

  function stopRecording() {
    setListening(false);
  }

  function nextExercise() {
    setIndex((old) => (old + 1) % exercises.length);
    setRecognized("");
    setError("");
  }

  function markCompleted() {
    setCompleted((old) =>
      old.includes(index) ? old : [...old, index]
    );
  }

  function resetPractice() {
    setIndex(0);
    setRecognized("");
    setCompleted([]);
    setError("");
    setListening(false);
  }

  return (
    <main className="min-h-screen bg-[#080d19] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080d19]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-300 hover:text-emerald-400">
            <ArrowLeft size={19} />
            Home
          </Link>

          <div className="flex items-center gap-2">
            <Mic className="text-emerald-400" />
            <span className="font-bold">Speaking Practice</span>
          </div>

          <button
            onClick={resetPractice}
            className="rounded-lg border border-white/10 p-2 text-slate-400"
            aria-label="Reset practice"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10">

        <section className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-blue-500/5 p-7 md:p-10">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
            <MessageCircle size={19} />
            ARABIC SPEAKING CLASSROOM
          </div>

          <h1 className="mt-5 text-3xl font-extrabold md:text-5xl">
            Speak Arabic <span className="text-emerald-400">Confidently</span>
          </h1>

          <p className="mt-4 leading-8 text-slate-400">
            আরবি বাক্য শুনুন, নিজে উচ্চারণ করুন এবং
            মাইক্রোফোনের সাহায্যে আপনার বলা কথা পরীক্ষা করুন।
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Mic className="mr-2 inline" size={14} />
              Voice Practice
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Languages className="mr-2 inline" size={14} />
              Arabic Language
            </span>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#0d1728] p-6 md:p-9">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest text-emerald-400">
                SPEAKING EXERCISE
              </p>
              <h2 className="mt-2 text-xl font-bold">
                Exercise {index + 1} / {exercises.length}
              </h2>
            </div>

            <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-xs text-emerald-400">
              Beginner
            </span>
          </div>

          <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{
                width: `${(completed.length / exercises.length) * 100}%`,
              }}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-[#080d19] p-6 text-center md:p-10">
            <p className="text-xs font-bold text-slate-500">
              LISTEN AND REPEAT
            </p>

            <p
              dir="rtl"
              className="mt-7 text-3xl font-bold leading-relaxed text-emerald-300 md:text-5xl"
            >
              {exercise.arabic}
            </p>

            <p className="mt-6 text-lg font-semibold">
              {exercise.meaning}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {exercise.english}
            </p>

            <button
              onClick={speakArabic}
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 px-6 py-3 text-sm font-bold text-emerald-400 hover:bg-emerald-400/10"
            >
              <Volume2 size={19} />
              Listen to Pronunciation
            </button>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold">Your Turn to Speak!</h3>
            <p className="mt-2 text-sm text-slate-400">
              নিচের মাইক্রোফোন বাটনে চাপ দিয়ে আরবি বাক্যটি বলুন।
            </p>

            <button
              onClick={listening ? stopRecording : startRecording}
              disabled={!supported}
              className={`mx-auto mt-7 flex h-24 w-24 items-center justify-center rounded-full shadow-lg transition ${
                listening
                  ? "animate-pulse bg-red-500 text-white"
                  : "bg-emerald-400 text-[#07130f] hover:scale-105"
              } disabled:opacity-40`}
              aria-label={listening ? "Stop recording" : "Start recording"}
            >
              {listening ? <MicOff size={34} /> : <Mic size={34} />}
            </button>

            <p className={`mt-4 text-sm font-semibold ${
              listening ? "text-red-400" : "text-emerald-400"
            }`}>
              {listening ? "Listening... Speak Now" : "Tap to Start Speaking"}
            </p>

            {error && (
              <p className="mt-4 rounded-xl bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </p>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#111c2e] p-5">
            <h3 className="flex items-center gap-2 font-bold">
              <MessageCircle size={18} className="text-emerald-400" />
              Your Spoken Words
            </h3>

            <p
              dir="auto"
              className="mt-4 min-h-16 rounded-xl bg-black/20 p-4 text-lg text-slate-200"
            >
              {recognized || "আপনার বলা আরবি এখানে দেখা যাবে..."}
            </p>

            {recognized && (
              <button
                onClick={markCompleted}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-[#07130f]"
              >
                <CheckCircle2 size={17} />
                Mark as Practiced
              </button>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-slate-400">
              Completed: {completed.length} / {exercises.length}
            </span>

            <button
              onClick={nextExercise}
              className="rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-[#07130f] hover:bg-emerald-300"
            >
              Next Exercise →
            </button>
          </div>

        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-[#0d1728] p-5">
          <h3 className="font-bold">Important Note</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Voice Recognition-এর জন্য Chrome ব্রাউজার,
            ইন্টারনেট সংযোগ এবং Microphone Permission প্রয়োজন হতে পারে।
            সব Android ব্রাউজারে এই সুবিধা কাজ করে না।
            এটি স্বয়ংক্রিয়ভাবে উচ্চারণের নির্ভুলতা বিচার করে না;
            শুধু কথাকে লেখায় রূপান্তর করে।
          </p>
        </section>

        {!supported && (
          <p className="mt-5 text-center text-sm text-amber-400">
            এই ব্রাউজারে Voice Recognition পাওয়া যাচ্ছে না।
            Chrome দিয়ে ওয়েবসাইট খুলে চেষ্টা করুন।
          </p>
        )}

      </div>
    </main>
  );
}
