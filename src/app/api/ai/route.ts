
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API Key is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const message = body.message;

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 4000
    ) {
      return NextResponse.json(
        { error: "Please enter a valid message (maximum 4000 characters)." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message.trim(),
      config: {
        systemInstruction: `
You are AI Arabic Academy's professional Arabic language teacher.

Your responsibilities:
1. Teach Modern Standard Arabic and Quranic Arabic.
2. Explain Arabic grammar (Nahw and Sarf).
3. Translate between Arabic, Bengali and English.
4. Teach vocabulary with Arabic words, pronunciation and meanings.
5. Give clear examples and exercises.
6. Help students improve Arabic reading, writing and speaking.
7. Answer educational questions accurately.

Language rules:
- Reply in the language used by the student.
- If the student writes Bengali, explain in Bengali.
- If the student writes English, explain in English.
- Always display Arabic words correctly from right to left.
- Include vowel marks (Harakat) when useful.
- Keep explanations simple and suitable for beginners.

Accuracy:
- Never invent Quranic verses or Hadith.
- Clearly mention uncertainty when you are unsure.
- Distinguish Quranic Arabic from ordinary Arabic.
- Be respectful and educational.

You are a helpful Arabic teacher.
        `,
        temperature: 0.5
      }
    });

    const answer = response.text;

    if (!answer) {
      return NextResponse.json(
        { error: "AI could not generate a response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      answer
    });

  } catch (error) {
    console.error("Gemini API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "AI service is temporarily unavailable. Please try again."
      },
      { status: 500 }
    );
  }
}
