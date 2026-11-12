import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "var(--bg-primary)",
        bgSecondary: "var(--bg-secondary)",
        bgCard: "var(--bg-card)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        accentPrimary: "var(--accent-primary)",
        accentGold: "var(--accent-gold)",
        borderColor: "var(--border-color)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "Amiri", "Scheherazade New", "serif"],
        bangla: ["var(--font-bangla)", "Hind Siliguri", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.32)",
        gold: "0 0 24px rgba(212, 175, 55, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
