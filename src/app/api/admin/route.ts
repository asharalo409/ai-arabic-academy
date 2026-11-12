import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        {
          error:
            "ADMIN_PASSWORD is not configured on the server. Add ADMIN_PASSWORD in Vercel Environment Variables.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const providedPassword =
      typeof body?.password === "string" ? body.password.trim() : "";
    const action = typeof body?.action === "string" ? body.action : "verify";

    if (!providedPassword || providedPassword !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid Admin Password. Access denied." },
        { status: 401 }
      );
    }

    if (action === "verify") {
      return NextResponse.json({
        authenticated: true,
        message: "Admin access verified.",
      });
    }

    if (action === "create_lesson") {
      const payload = body?.lesson;
      if (!payload?.titleBn || !payload?.titleAr) {
        return NextResponse.json(
          { error: "Lesson title in Bangla and Arabic is required." },
          { status: 400 }
        );
      }

      // If Supabase Service Role or Anon key is configured, sync directly to PostgreSQL
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      let persistedToSupabase = false;

      if (supabaseUrl && supabaseKey) {
        try {
          const dbRes = await fetch(`${supabaseUrl}/rest/v1/curriculum_lessons`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              id: payload.id,
              level_number: Number(payload.levelNumber) || 1,
              chapter_number: Number(payload.chapterNumber) || 1,
              lesson_number: Number(payload.lessonNumber) || 1,
              title_bn: payload.titleBn,
              title_en: payload.titleEn || payload.titleBn,
              title_ar: payload.titleAr,
              grammar_title_bn: payload.grammarTitleBn || "",
              grammar_explanation_bn: payload.grammarExplanationBn || "",
              vocabulary_json: payload.vocabulary || [],
              dialogue_json: payload.dialogue || [],
              quiz_json: payload.quiz || [],
              is_published: true,
            }),
          });

          if (dbRes.ok) {
            persistedToSupabase = true;
          }
        } catch {
          persistedToSupabase = false;
        }
      }

      return NextResponse.json({
        success: true,
        persistedToSupabase,
        lesson: payload,
      });
    }

    return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request format." },
      { status: 400 }
    );
  }
}
