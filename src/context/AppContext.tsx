"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "bn" | "en" | "ar";
export type Theme = "emerald" | "midnight" | "academic";

export interface QuizScoreRecord {
  quizTitle: string;
  score: number;
  total: number;
  date: string;
}

export interface StudentStats {
  studentName: string;
  dailyGoalMinutes: number;
  xp: number;
  streak: number;
  studyMinutes: number;
  completedLessons: string[];
  learnedVocab: string[];
  favoriteVocab: string[];
  quizScores: QuizScoreRecord[];
  lastActiveDate: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  stats: StudentStats;
  addXP: (amount: number, minutes?: number) => void;
  markLessonComplete: (lessonId: string) => void;
  toggleLearnedVocab: (wordId: string) => void;
  toggleFavoriteVocab: (wordId: string) => void;
  recordQuizScore: (quizTitle: string, score: number, total: number) => void;
  updateProfile: (updates: { studentName?: string; dailyGoalMinutes?: number }) => void;
  t: (bn: string, en: string, ar?: string) => string;
}

const DEFAULT_STATS: StudentStats = {
  studentName: "Taseen Billah",
  dailyGoalMinutes: 20,
  xp: 0,
  streak: 1,
  studyMinutes: 0,
  completedLessons: [],
  learnedVocab: [],
  favoriteVocab: [],
  quizScores: [],
  lastActiveDate: new Date().toISOString().split("T")[0],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("bn");
  const [theme, setThemeState] = useState<Theme>("emerald");
  const [stats, setStats] = useState<StudentStats>(DEFAULT_STATS);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("aaa_language") as Language | null;
      const savedTheme = localStorage.getItem("aaa_theme") as Theme | null;
      const savedStats = localStorage.getItem("aaa_stats");

      if (savedLang && ["bn", "en", "ar"].includes(savedLang)) {
        setLanguageState(savedLang);
      }
      if (savedTheme && ["emerald", "midnight", "academic"].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
      if (savedStats) {
        const parsed = JSON.parse(savedStats);
        setStats((prev) => ({
          ...prev,
          ...parsed,
          studentName: parsed.studentName || "Taseen Billah",
          dailyGoalMinutes: parsed.dailyGoalMinutes || 20,
        }));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
  }, [theme, language]);

  const saveStats = (updater: (prev: StudentStats) => StudentStats) => {
    setStats((prev) => {
      const today = new Date().toISOString().split("T")[0];
      const next = updater(prev);
      const updatedWithDate: StudentStats = {
        ...next,
        lastActiveDate: today,
      };
      try {
        localStorage.setItem("aaa_stats", JSON.stringify(updatedWithDate));
      } catch {
        // Ignore storage errors
      }
      return updatedWithDate;
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("aaa_language", lang);
    } catch {
      // Ignore
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("aaa_theme", newTheme);
    } catch {
      // Ignore
    }
  };

  const addXP = (amount: number, minutes = 2) => {
    saveStats((prev) => ({
      ...prev,
      xp: prev.xp + amount,
      studyMinutes: prev.studyMinutes + minutes,
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

  const toggleLearnedVocab = (wordId: string) => {
    saveStats((prev) => {
      const exists = prev.learnedVocab.includes(wordId);
      const updated = exists
        ? prev.learnedVocab.filter((id) => id !== wordId)
        : [...prev.learnedVocab, wordId];
      return {
        ...prev,
        xp: exists ? prev.xp : prev.xp + 10,
        learnedVocab: updated,
      };
    });
  };

  const toggleFavoriteVocab = (wordId: string) => {
    saveStats((prev) => {
      const exists = prev.favoriteVocab.includes(wordId);
      const updated = exists
        ? prev.favoriteVocab.filter((id) => id !== wordId)
        : [...prev.favoriteVocab, wordId];
      return {
        ...prev,
        favoriteVocab: updated,
      };
    });
  };

  const recordQuizScore = (quizTitle: string, score: number, total: number) => {
    saveStats((prev) => ({
      ...prev,
      xp: prev.xp + score * 15,
      studyMinutes: prev.studyMinutes + 5,
      quizScores: [
        {
          quizTitle,
          score,
          total,
          date: new Date().toLocaleDateString(),
        },
        ...prev.quizScores,
      ],
    }));
  };

  const updateProfile = (updates: {
    studentName?: string;
    dailyGoalMinutes?: number;
  }) => {
    saveStats((prev) => ({
      ...prev,
      ...(updates.studentName !== undefined
        ? { studentName: updates.studentName }
        : {}),
      ...(updates.dailyGoalMinutes !== undefined
        ? { dailyGoalMinutes: updates.dailyGoalMinutes }
        : {}),
    }));
  };

  const t = (bn: string, en: string, ar?: string) => {
    if (language === "bn") return bn;
    if (language === "ar") return ar || en;
    return en;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        stats,
        addXP,
        markLessonComplete,
        toggleLearnedVocab,
        toggleFavoriteVocab,
        recordQuizScore,
        updateProfile,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
