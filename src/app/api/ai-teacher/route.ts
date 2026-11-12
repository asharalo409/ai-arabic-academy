import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not configured on the server. Please add it to your Vercel Environment Variables.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const level = typeof body?.level === "string" ? body.level : "Beginner";
    const mode = typeof body?.mode === "string" ? body.mode : "general";
    const preferredLang = typeof body?.lang === "string" ? body.lang : "bn";
    const history: ChatMessage[] = Array.isArray(body?.history)
      ? body.history.slice(-8)
      : [];

    if (!message) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    if (message.length > 3000) {
      return NextResponse.json(
        { error: "Message is too long. Please keep it under 3,000 characters." },
        { status: 400 }
      );
    }

    const systemInstruction = `You are Ustad Tariq, a warm, scholarly, and encouraging Senior Arabic Language & Quranic Arabic Professor at AI Arabic Academy.

STUDENT CONTEXT:
- Student Proficiency Level: ${level}
- Active Study Mode: ${mode}
- Primary Interface Language: ${preferredLang === "bn" ? "Bangla (বাংলা)" : preferredLang === "ar" ? "Arabic (العربية)" : "English"}

STRICT EDUCATIONAL & ACCURACY RULES:
1. ALWAYS write every Arabic word, phrase, sentence, and example with FULL HARAKAT (التشكيل الكامل — Fatha, Kasra, Damma, Sukun, Shadda, Tanween).
2. Explain clearly in the student's preferred language (${preferredLang === "bn" ? "simple, clear Bangla with Bangla pronunciation guides where helpful" : preferredLang === "ar" ? "clear Modern Standard Arabic" : "clear English"}), adapting depth to the student's level (${level}).
3. NEVER fabricate, guess, or misquote any Quranic Ayah or Hadith. Only cite verified Quranic verses with exact Surah name and Ayah number (e.g., Surah Al-Fatihah 1:2). Clearly distinguish authentic Quranic verses from regular educational example sentences.
4. When explaining grammar (Nahw & Sarf), break down Ism, Fi'l, Harf, Mubtada, Khabar, Fa'il, Maf'ul, I'rab endings, and verb roots (الجذر) systematically.
5. When correcting student sentences, show:
   - Original Sentence
   - Corrected Sentence (with full Harakat)
   - Clear grammatical explanation of what was fixed.
6. Format responses cleanly with headings, bullet points, and clear spacing so they are easy to read on an Android mobile screen.`;

    const ai = new GoogleGenAI({ apiKey });

    const formattedContents = [
      ...history.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.4,
          maxOutputTokens: 2048,
        },
      });

      clearTimeout(timeoutId);

      const reply = response.text?.trim();
      if (!reply) {
        return NextResponse.json(
          { error: "AI returned an empty response. Please try again." },
          { status: 502 }
        );
      }

      return NextResponse.json({ reply });
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const errMsg = err instanceof Error ? err.message : String(err);

      if (errMsg.includes("abort") || errMsg.includes("timeout")) {
        return NextResponse.json(
          { error: "Request timed out. Please try a shorter question." },
          { status: 504 }
        );
      }

      if (errMsg.includes("429") || errMsg.toLowerCase().includes("quota") || errMsg.toLowerCase().includes("rate")) {
        return NextResponse.json(
          {
            error:
              "Free-tier rate limit reached temporarily. Please wait 30 seconds and try again.",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "Failed to generate AI response. Please try again." },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
