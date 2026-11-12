
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Arabic Academy | Learn Arabic with AI",
  description:
    "Learn Arabic, Quranic Arabic, grammar, vocabulary, listening and speaking with your personal AI Arabic teacher.",
  keywords: [
    "Arabic Learning",
    "Learn Arabic",
    "Quranic Arabic",
    "Arabic Grammar",
    "AI Arabic Teacher",
  ],
  applicationName: "AI Arabic Academy",
  appleWebApp: {
    capable: true,
    title: "AI Arabic Academy",
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080d19",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
