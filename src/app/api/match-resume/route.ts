/**
 * src/app/api/match-resume/route.ts
 * Role: Your serverless backend endpoint. It receives the JD text and Resume text from the frontend, uses your existing src/lib/ai/providers/GeminiProvider.ts, 
 * formats the prompt, and streams the structured JSON response back.
 */

/**
 * src/app/api/match-resume/route.ts
 * API route for Resume ↔ Job Description matching
 */

import { GeminiProvider } from "@/lib/ai/providers/GeminiProvider";
import { NextResponse } from "next/server";
import { MatchAnalysis, MatchResponse } from "@/lib/types/match";


/* Clamp score between 0-100 */

function clampScore(value: any): number {
  const num = Number(value);
  if (isNaN(num)) return 0;
  return Math.min(100, Math.max(0, Math.round(num)));
}

/* Extract JSON from messy AI response */

function extractJSON(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) return null;

  return text.slice(start, end + 1);
}

/** Filtering based on User type (FREE/PREMIUM) */

function filterMatchResponse(data: MatchAnalysis, isPremium: boolean): MatchResponse {

  if (isPremium) {
    return {
      matchScore: data.matchScore,
      summary: data.summary,
      matchedKeywords: data.matchedKeywords,
      missingKeywords: data.missingKeywords,
      recommendations: data.recommendations,
    };
  }

  /** Free User Response - Free users NEVER receive premium data */
  return {
    matchScore: data.matchScore,
    summary: data.summary,
    matchedKeywords: data.matchedKeywords,

    locked: {
      missingKeywords: true,
      recommendations: true,
    },
  };
}

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const { base64Pdf, jdText } = body;

    /* Validate input */

    if (!base64Pdf || !jdText) {
      return NextResponse.json(
        { success: false, error: "Missing resume or job description" },
        { status: 400 }
      );
    }

    /* Call Gemini */

    const gemini = new GeminiProvider();

    const aiRaw = await gemini.generateMatch(base64Pdf, jdText);

    /* Extract JSON */

    const cleaned = extractJSON(aiRaw);

    if (!cleaned) {
      throw new Error("Invalid JSON structure from AI");
    }

    /* JSON Parsing */

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new Error("JSON parsing failed");
    }

    if (typeof parsed !== "object" || parsed === null) {
      throw new Error("Parsed AI response invalid");
    }

    /* Temporary MVP premium detection */

    const isPremium =
      req.headers.get("x-premium-user") === "true";

    /** later to be replaced with - Supabase premium_users lookup */

    /* Safe structured response */

    const safeResponse: MatchAnalysis = {
      matchScore: clampScore(parsed.matchScore),
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      matchedKeywords: Array.isArray(parsed.matchedKeywords)
        ? parsed.matchedKeywords
        : [],
      missingKeywords: Array.isArray(parsed.missingKeywords)
        ? parsed.missingKeywords
        : [],
      recommendations: Array.isArray(parsed.recommendations)
        ? parsed.recommendations
        : [],
    };

    const filteredResponse = filterMatchResponse(
      safeResponse,
      isPremium
    );

    return NextResponse.json({
      success: true,
      data: filteredResponse,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error: "AI processing failed",
        data: {
          matchScore: 0,
          summary: "Unable to analyze the resume against the job description.",
          matchedKeywords: [],
          missingKeywords: [],
          recommendations: [
            "Please try again with a valid resume and job description."
          ],
        },
      },
      { status: 500 }
    );
  }
}

