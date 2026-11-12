"use client";

import React, { useState } from "react";
import {
  Award,
  Lock,
  CheckCircle2,
  Printer,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface CertificateMilestone {
  id: string;
  titleBn: string;
  titleEn: string;
  titleAr: string;
  requirementBn: string;
  unlocked: boolean;
  certCode: string;
}

export default function CertificatesPage() {
  const { t, stats } = useApp();
  const [selectedCertId, setSelectedCertId] = useState<string>("foundation");

  const certificates: CertificateMilestone[] = [
    {
      id: "foundation",
      titleBn: "প্রাথমিক আরবি ভাষা ও পরিচিতি সার্টিফিকেট",
      titleEn: "Certificate in Foundational Arabic & Greetings",
      titleAr: "شهادة إتمام أساسيات اللغة العربية",
      requirementBn: "অর্জন শর্ত: কমপক্ষে ১টি পূর্ণাঙ্গ লেসন সম্পন্ন করা অথবা ১০০+ XP অর্জন।",
      unlocked: stats.completedLessons.length >= 1 || stats.xp >= 100,
      certCode: "AAA-FND-2026-01",
    },
    {
      id: "grammar-vocab",
      titleBn: "নাহু-সরফ ব্যাকরণ ও শব্দভাণ্ডার দক্ষতা সনদ",
      titleEn: "Certificate in Nahw-Sarf Grammar & Vocabulary",
      titleAr: "شهادة إتقان النحو والصرف والمفردات",
      requirementBn: "অর্জন শর্ত: কমপক্ষে ৫টি শব্দ মুখস্থ করা এবং ১টি কুইজ সম্পন্ন করা।",
      unlocked: stats.learnedVocab.length >= 5 && stats.quizScores.length >= 1,
      certCode: "AAA-GRM-2026-02",
    },
    {
      id: "quranic-scholar",
      titleBn: "কুরআনিক আরবি ও মূল ধাতু বিশ্লেষণ সার্টিফিকেট",
      titleEn: "Certificate in Quranic Arabic & Root Word Analysis",
      titleAr: "شهادة العربية القرآنية وتحليل الجذور",
      requirementBn: "অর্জন শর্ত: সর্বমোট ৫০০+ XP অর্জন এবং ২টি লেসন সম্পন্ন করা।",
      unlocked: stats.xp >= 500 && stats.completedLessons.length >= 2,
      certCode: "AAA-QRN-2026-03",
    },
  ];

  const activeCert =
    certificates.find((c) => c.id === selectedCertId) || certificates[0];

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accentPrimary/20 text-accentGold">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-textPrimary bangla-text">
              {t("ডিজিটাল সার্টিফিকেট ও সনদপত্র", "Digital Certificates & Credentials", "الشهادات الرقمية المعتمدة")}
            </h1>
            <p className="text-xs sm:text-sm text-textSecondary bangla-text">
              {t(
                "আপনার প্রকৃত অধ্যয়ন মাইলফলক পূর্ণ হলে সার্টিফিকেট স্বয়ংক্রিয়ভাবে আনলক হবে এবং প্রিন্ট বা PDF হিসেবে সংরক্ষণ করতে পারবেন।",
                "Certificates unlock automatically as you hit genuine study milestones and can be printed or saved as PDF.",
                "تُفتح الشهادات تلقائياً عند إتمام متطلبات الدراسة ويمكن طباعتها."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {certificates.map((cert) => {
          const isSelected = cert.id === activeCert.id;
          return (
            <button
              key={cert.id}
              onClick={() => setSelectedCertId(cert.id)}
              className={`glass-card text-left rounded-2xl p-5 space-y-2.5 transition ${
                isSelected ? "border-2 border-accentGold" : "hover:border-accentGold/40"
              }`}
            >
              <div className="flex items-center justify-between">
                {cert.unlocked ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {t("আনলকড", "Unlocked", "مفتوح")}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-bgSecondary border border-borderColor px-2.5 py-0.5 text-[11px] font-semibold text-textSecondary">
                    <Lock className="h-3.5 w-3.5" />
                    {t("লক করা", "Locked", "مقفل")}
                  </span>
                )}
                <span className="text-[11px] font-mono text-accentGold">{cert.certCode}</span>
              </div>

              <h2 className="text-sm sm:text-base font-bold text-textPrimary bangla-text">
                {t(cert.titleBn, cert.titleEn, cert.titleAr)}
              </h2>
              <p className="text-xs text-textSecondary bangla-text">{cert.requirementBn}</p>
            </button>
          );
        })}
      </div>

      {/* Certificate Preview Frame */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-accentGold/60 space-y-6 relative overflow-hidden">
        {!activeCert.unlocked ? (
          <div className="py-12 text-center space-y-3">
            <Lock className="h-12 w-12 text-textSecondary mx-auto" />
            <h3 className="text-lg font-bold text-textPrimary bangla-text">
              {t("এই সার্টিফিকেটটি এখনো আনলক হয়নি", "This Certificate is Currently Locked", "هذه الشهادة مقفلة حالياً")}
            </h3>
            <p className="text-xs sm:text-sm text-textSecondary max-w-md mx-auto bangla-text">
              {activeCert.requirementBn}
            </p>
          </div>
        ) : (
          <>
            <div className="border-2 border-accentGold/40 rounded-2xl p-6 sm:p-10 text-center space-y-5 bg-bgPrimary/80">
              <div className="flex items-center justify-center gap-2 text-accentGold">
                <Sparkles className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  AI Arabic Academy • Official Academic Credential
                </span>
                <Sparkles className="h-5 w-5" />
              </div>

              <p dir="rtl" className="arabic-text text-2xl sm:text-3xl font-bold text-accentGold">
                {activeCert.titleAr}
              </p>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-textPrimary">
                {activeCert.titleEn}
              </h2>

              <p className="text-xs sm:text-sm text-textSecondary bangla-text">
                {t(
                  "এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, নিবেদিতপ্রাণ শিক্ষার্থী",
                  "This is to certify that dedicated scholar",
                  "تشهد أكاديمية العربية الذكية بأن الطالب"
                )}
              </p>

              <p className="text-2xl sm:text-4xl font-extrabold text-accentPrimary border-b-2 border-accentGold/40 inline-block px-8 pb-2">
                {stats.studentName || "Taseen Billah"}
              </p>

              <p className="text-xs sm:text-sm text-textSecondary max-w-xl mx-auto bangla-text leading-relaxed">
                {t(
                  `${activeCert.titleBn}-এর নির্ধারিত পাঠ্যক্রম, ব্যাকরণ ও মূল্যায়ন অনুশীলন সফলভাবে সম্পন্ন করেছেন।`,
                  `has successfully fulfilled the curriculum, grammar, and assessment milestones for ${activeCert.titleEn}.`,
                  `قد أتم بنجاح متطلبات المنهج والتقييم لهذه الشهادة.`
                )}
              </p>

              <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-borderColor/60 text-xs text-textSecondary">
                <div className="flex items-center gap-1.5 text-accentGold font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verification ID: {activeCert.certCode}</span>
                </div>
                <div>
                  <span>
                    {t("ইস্যু তারিখ:", "Issued Date:", "تاريخ الإصدار:")}{" "}
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="font-bold text-textPrimary">
                  Ustad Tariq — Academic Director
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-xl bg-accentGold px-5 py-3 text-xs sm:text-sm font-bold text-black hover:opacity-95 transition"
              >
                <Printer className="h-4 w-4" />
                <span>
                  {t(
                    "সার্টিফিকেট প্রিন্ট / PDF সেভ করুন",
                    "Print / Save Certificate as PDF",
                    "طباعة / حفظ الشهادة"
                  )}
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
