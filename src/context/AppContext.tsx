"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "bn" | "en" | "ar";
export type Theme = "emerald" | "midnight" | "academic";

export interface StudentStats {
  xp: number;
  streak: number;
  completedLessons: string[];
  learnedVocab: string[];
  favoriteVocab: string[];
  quizScores: {
    id: string;
    title: string;
    score: number;
    total: number;
    date: string;
  }[];
  studyMinutes: number;
  dailyGoalMinutes: number;
  lastActiveDate: string;
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isRTL: boolean;
  t: (bn: string, en: string, ar: string) => string;
  stats: StudentStats;
  addXP: (amount: number) => void;
  markLessonComplete: (lessonId: string) => void;
  toggleFavoriteVocab: (wordId: string) => void;
  markVocabLearned: (wordId: string) => void;
  recordQuizScore: (title: string, score: number, total: number) => void;
  addStudyMinutes: (minutes: number) => void;
}

const DEFAULT_STATS: StudentStats = {
  xp: 120,
  streak: 1,
  completedLessons: [],
  learnedVocab: [],
  favoriteVocab: [],
  quizScores: [],
  studyMinutes: 15,
  dailyGoalMinutes: 30,
  lastActiveDate: new Date().toISOString().split("T")[0],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("bn");
  const [theme, setThemeState] = useState<Theme>("emerald");
  const [stats, setStats] = useState<StudentStats>(DEFAULT_STATS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedLang = localStorage.getItem("aaa_lang") as Language | null;
      const savedTheme = localStorage.getItem("aaa_theme") as Theme | null;
      const savedStats = localStorage.getItem("aaa_stats");

      if (savedLang && ["bn", "en", "ar"].includes(savedLang)) {
        setLangState(savedLang);
      }
      if (savedTheme && ["emerald", "midnight", "academic"].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
      if (savedStats) {
        const parsed = JSON.parse(savedStats) as StudentStats;
        const today = new Date().toISOString().split("T")[0];
        if (parsed.lastActiveDate !== today) {
          const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0];
          const updatedStreak =
            parsed.lastActiveDate === yesterday ? parsed.streak + 1 : 1;
          const updated = {
            ...parsed,
            streak: updatedStreak,
            lastActiveDate: today,
          };
          setStats(updated);
          localStorage.setItem("aaa_stats", JSON.stringify(updated));
        } else {
          setStats(parsed);
        }
      }
    } catch {
      // Fallback safely if localStorage is unavailable
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("aaa_theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("aaa_lang", lang);
  }, [lang, mounted]);

  const saveStats = (updater: (prev: StudentStats) => StudentStats) => {
    setStats((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem("aaa_stats", JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const setLang = (newLang: Language) => setLangState(newLang);
  const setTheme = (newTheme: Theme) => setThemeState(newTheme);

  const t = (bn: string, en: string, ar: string) => {
    if (lang === "ar") return ar;
    if (lang === "en") return en;
    return bn;
  };

  const addXP = (amount: number) => {
    saveStats((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }));
  };

  const markLessonComplete = (lessonId: string) => {
    saveStats((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        xp: prev.xp + 50,
        studyMinutes: prev.studyMinutes + 10,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const toggleFavoriteVocab = (wordId: string) => {
    saveStats((prev) => {
      const exists = prev.favoriteVocab.includes(wordId);
      return {
        ...prev,
        favoriteVocab: exists
          ? prev.favoriteVocab.filter((id) => id !== wordId)
          : [...prev.favoriteVocab, wordId],
      };
    });
  };

  const markVocabLearned = (wordId: string) => {
    saveStats((prev) => {
      if (prev.learnedVocab.includes(wordId)) return prev;
      return {
        ...prev,
        xp: prev.xp + 10,
        learnedVocab: [...prev.learnedVocab, wordId],
      };
    });
  };

  const recordQuizScore = (title: string, score: number, total: number) => {
    saveStats((prev) => ({
      ...prev,
      xp: prev.xp + score * 15,
      studyMinutes: prev.studyMinutes + 5,
      quizScores: [
        {
          id: `${Date.now()}`,
          title,
          score,
          total,
          date: new Date().toLocaleDateString(),
        },
        ...prev.quizScores,
      ],
    }));
  };

  const addStudyMinutes = (minutes: number) => {
    saveStats((prev) => ({
      ...prev,
      studyMinutes: prev.studyMinutes + minutes,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        theme,
        setTheme,
        isRTL: lang === "ar",
        t,
        stats,
        addXP,
        markLessonComplete,
        toggleFavoriteVocab,
        markVocabLearned,
        recordQuizScore,
        addStudyMinutes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
}
