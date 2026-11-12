import type { Metadata } from "next";
import { Amiri, Hind_Siliguri, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Arabic Academy | স্মার্ট আরবি ও কুরআনিক শিক্ষা প্ল্যাটফর্ম",
  description:
    "Learn Modern Standard Arabic, Quranic Arabic, Nahw, Sarf, Vocabulary, Listening, Speaking, and practice with an AI Arabic Teacher in Bangla, English, and Arabic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      data-theme="emerald"
      className={`${plusJakarta.variable} ${hindSiliguri.variable} ${amiri.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-bgPrimary text-textPrimary antialiased selection:bg-accentPrimary selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
