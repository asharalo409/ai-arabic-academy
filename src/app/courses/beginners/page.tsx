"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  MessageSquare,
  GraduationCap,
  PenTool,
  HelpCircle,
  Play,
  Square,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SAMPLE_LESSONS, FullLesson } from "@/data/curriculum";

export default function BeginnerCoursePage() {
  const { t, stats, markLessonComplete } = useApp();
  const [selectedLesson, setSelectedLesson] = useState<FullLesson>(SAMPLE_LESSONS[0]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [isPlayingFull, setIsPlayingFull] = useState(false);

  const isCompleted = stats.completedLessons.includes(selectedLesson.id);

  const speakArabic = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const playFullDialogue = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const fullText = selectedLesson.dialogue.map((line) => line.arabic).join(" ");
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;
    utterance.onstart = () => setIsPlayingFull(true);
    utterance.onend = () => setIsPlayingFull(false);
    utterance.onerror = () => setIsPlayingFull(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsPlayingFull(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      {/* Lesson Selector Tabs */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-6 w-6 text-accentGold" />
            <h1 className="text-xl sm:text-2xl font-bold text-textPrimary bangla-text">
              {t("ইন্টারেক্টিভ আরবি লেসন প্লেয়ার", "Interactive Arabic Lesson Player", "مشغل الدروس التفاعلي")}
            </h1>
          </div>
          <span className="text-xs font-semibold text-accentPrimary">
            {t(
              `সম্পন্ন লেসন: ${stats.completedLessons.length}`,
              `Completed Lessons: ${stats.completedLessons.length}`,
              `الدروس المكتملة: ${stats.completedLessons.length}`
            )}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {SAMPLE_LESSONS.map((lesson) => {
            const active = selectedLesson.id === lesson.id;
            const done = stats.completedLessons.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => {
                  stopAudio();
                  setSelectedLesson(lesson);
                  setQuizAnswers({});
                }}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition bangla-text ${
                  active
                    ? "border-accentGold bg-accentPrimary text-white"
                    : "border-borderColor bg-bgSecondary text-textSecondary hover:text-textPrimary"
                }`}
              >
                <span>{t(`অধ্যায় ${lesson.chapterNumber} • লেসন ${lesson.lessonNumber}`, `Ch ${lesson.chapterNumber} • L${lesson.lessonNumber}`, `فصل ${lesson.chapterNumber}`)}</span>
                {done && <CheckCircle2 className="h-3.5 w-3.5 text-accentGold" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson Title & Objectives */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-textPrimary bangla-text">
              {t(selectedLesson.titleBn, selectedLesson.titleEn, selectedLesson.titleAr)}
            </h2>
            <p dir="rtl" className="arabic-text text-lg sm:text-xl text-accentGold mt-1">
              {selectedLesson.titleAr}
            </p>
          </div>

          <button
            onClick={() => markLessonComplete(selectedLesson.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              isCompleted
                ? "border border-emerald-500/40 bg-emerald-950/40 text-emerald-300"
                : "bg-accentGold text-black hover:opacity-95"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>
              {isCompleted
                ? t("লেসন সম্পন্ন হয়েছে (+50 XP)", "Lesson Completed (+50 XP)", "تم إكمال الدرس")
                : t("লেসন সম্পন্ন চিহ্নিত করুন (+50 XP)", "Mark Lesson Complete (+50 XP)", "إكمال الدرس")}
            </span>
          </button>
        </div>

        <div className="rounded-xl border border-borderColor bg-bgPrimary/70 p-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-accentGold">
            {t("এই পাঠের শিখনফল (Learning Objectives):", "Learning Objectives:", "أهداف الدرس:")}
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-textSecondary bangla-text">
            {selectedLesson.objectivesBn.map((obj, idx) => (
              <li key={idx}>{obj}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Vocabulary Section */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-textPrimary bangla-text">
          {t("১. গুরুত্বপূর্ণ শব্দভাণ্ডার (পূর্ণ হরকতসহ)", "1. Key Vocabulary (Full Harakat)", "١. المفردات الأساسية")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {selectedLesson.vocabulary.map((v, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-borderColor bg-bgSecondary/70 p-4 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <p dir="rtl" className="arabic-text text-2xl font-bold text-accentGold">
                  {v.arabic}
                </p>
                <button
                  onClick={() => speakArabic(v.arabic)}
                  className="rounded-lg border border-borderColor bg-bgPrimary p-2 text-accentPrimary hover:border-accentGold transition"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs font-semibold text-accentPrimary bangla-text">
                {v.banglaPronunciation}
              </p>
              <p className="text-xs font-bold text-textPrimary bangla-text">
                {v.banglaMeaning}
              </p>
              <p className="text-[11px] text-textSecondary">{v.englishMeaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grammar Section */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-textPrimary flex items-center gap-2 bangla-text">
          <GraduationCap className="h-5 w-5 text-accentGold" />
          <span>২. {selectedLesson.grammarTitleBn}</span>
        </h3>
        <p className="text-sm text-textSecondary bangla-text leading-relaxed">
          {selectedLesson.grammarExplanationBn}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selectedLesson.grammarExamples.map((ex, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-borderColor bg-bgPrimary/75 p-4 flex items-center justify-between gap-3"
            >
              <div>
                <p dir="rtl" className="arabic-text text-xl font-bold text-accentGold">
                  {ex.arabic}
                </p>
                <p className="text-xs text-textPrimary mt-1 bangla-text">
                  {ex.banglaMeaning}
                </p>
              </div>
              <button
                onClick={() => speakArabic(ex.arabic)}
                className="shrink-0 rounded-lg border border-borderColor bg-bgSecondary p-2 text-accentPrimary"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 15-Line Arabic Dialogue */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-textPrimary flex items-center gap-2 bangla-text">
            <MessageSquare className="h-5 w-5 text-accentGold" />
            <span>
              {t(
                "৩. ১৫-লাইনের আরবি কথোপকথন ও বাংলা অনুবাদ",
                "3. 15-Line Arabic Dialogue & Translation",
                "٣. الحوار العربي الكامل (١٥ سطراً)"
              )}
            </span>
          </h3>

          <div className="flex items-center gap-2">
            <button
              onClick={playFullDialogue}
              className="inline-flex items-center gap-1.5 rounded-xl bg-accentPrimary px-3.5 py-2 text-xs font-bold text-white"
            >
              <Play className="h-3.5 w-3.5" />
              <span>{t("পুরো সংলাপ শুনুন", "Play Full Dialogue", "تشغيل الحوار كاملاً")}</span>
            </button>
            {isPlayingFull && (
              <button
                onClick={stopAudio}
                className="inline-flex items-center gap-1 rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white"
              >
                <Square className="h-3.5 w-3.5" />
                <span>{t("থামান", "Stop", "إيقاف")}</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {selectedLesson.dialogue.map((line, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-borderColor bg-bgPrimary/75 p-4 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-accentPrimary bangla-text">
                  {idx + 1}. {line.speaker}
                </span>
                <button
                  onClick={() => speakArabic(line.arabic)}
                  className="rounded-lg border border-borderColor bg-bgSecondary p-1.5 text-accentGold hover:border-accentGold transition"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p dir="rtl" className="arabic-text text-xl sm:text-2xl font-bold text-textPrimary">
                {line.arabic}
              </p>
              <p className="text-xs text-accentPrimary bangla-text">
                {line.banglaPronunciation}
              </p>
              <p className="text-xs sm:text-sm text-textSecondary bangla-text">
                {line.banglaTranslation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Skill Exercises */}
      <div className="glass-card rounded-2xl p-6 space-y-3">
        <h3 className="text-lg font-bold text-textPrimary flex items-center gap-2 bangla-text">
          <PenTool className="h-5 w-5 text-accentGold" />
          <span>{t("৪. চতুর্মুখী অনুশীলন (শ্রবণ, কথোপকথন, লিখন ও অনুবাদ)", "4. Four-Skill Practice Tasks", "٤. تدريبات المهارات الأربع")}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm bangla-text">
          <div className="rounded-xl border border-borderColor bg-bgSecondary/60 p-4">
            <p className="font-bold text-accentGold mb-1">🎧 শ্রবণ অনুশীলন:</p>
            <p className="text-textSecondary">{selectedLesson.listeningTaskBn}</p>
          </div>
          <div className="rounded-xl border border-borderColor bg-bgSecondary/60 p-4">
            <p className="font-bold text-accentGold mb-1">🎙️ কথোপকথন অনুশীলন:</p>
            <p className="text-textSecondary">{selectedLesson.speakingTaskBn}</p>
          </div>
          <div className="rounded-xl border border-borderColor bg-bgSecondary/60 p-4">
            <p className="font-bold text-accentGold mb-1">✍️ লিখন অনুশীলন:</p>
            <p className="text-textSecondary">{selectedLesson.writingTaskBn}</p>
          </div>
          <div className="rounded-xl border border-borderColor bg-bgSecondary/60 p-4">
            <p className="font-bold text-accentGold mb-1">🌐 অনুবাদ অনুশীলন:</p>
            <p className="text-textSecondary">{selectedLesson.translationTaskBn}</p>
          </div>
        </div>
      </div>

      {/* Lesson Quiz */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-textPrimary flex items-center gap-2 bangla-text">
          <HelpCircle className="h-5 w-5 text-accentGold" />
          <span>{t("৫. পাঠ মূল্যায়ন কুইজ", "5. Lesson Comprehension Quiz", "٥. اختبار الدرس")}</span>
        </h3>

        <div className="space-y-4">
          {selectedLesson.quiz.map((q, qIdx) => {
            const chosen = quizAnswers[qIdx];
            return (
              <div key={qIdx} className="space-y-2">
                <p className="text-sm font-semibold text-textPrimary bangla-text">
                  {qIdx + 1}. {q.questionBn}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = chosen === oIdx;
                    const isCorrect = oIdx === q.correctIndex;
                    let style =
                      "border-borderColor bg-bgSecondary/60 text-textPrimary hover:border-accentGold/50";
                    if (chosen !== undefined) {
                      if (isCorrect) {
                        style = "border-emerald-500 bg-emerald-950/50 text-emerald-200";
                      } else if (isSelected) {
                        style = "border-red-500 bg-red-950/50 text-red-200";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() =>
                          setQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))
                        }
                        className={`rounded-xl border px-3.5 py-2.5 text-left text-xs font-medium transition bangla-text ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
