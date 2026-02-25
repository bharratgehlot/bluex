/**
 * src/api/generate-review/route.ts
 * API calling 
 */

import { GeminiProvider } from "@/lib/ai/providers/GeminiProvider";
import { NextResponse } from "next/server";

/** A function that handle incorrect values in score */

function clampScore(value: any): number {
  const num = Number(value);
  if(isNaN(num)) return 0;
  return Math.min(100, Math.max(0, Math.round(num)));
}

/** A function that handle incorrect response that is not in json */

function extractJSON(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  return text.slice(start, end + 1);
}

export async function POST(req: Request) {
  try {
 
    const body = await req.json();
    const { base64Pdf } = body;

    if (!base64Pdf) {
   
      return NextResponse.json(
        { success: false, error: "No file received" },
        { status: 400 }
      );
    }

    const gemini = new GeminiProvider();
    const aiRaw = await gemini.generateReview(base64Pdf);


    const cleaned = extractJSON(aiRaw);

    if (!cleaned) {
      throw new Error("Invalid JSON structure from AI")
    }

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch { 
      throw new Error("JSON parsing failed");
    }

    if(typeof parsed !== "object" || parsed === null) {
      throw new Error("Parsed AI response invalid")
    }

    const safeResponse = {
      overallScore: clampScore(parsed.overallScore),
      atsScore: clampScore(parsed.atsScore),
      impactScore: clampScore(parsed.impactScore),
      clarityScore: clampScore(parsed.clarityScore),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
    };

    return NextResponse.json({
      success: true,
      data: safeResponse,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error: "AI processing failed",
        data: {
          overallScore: 0,
          atsScore: 0,
          impactScore: 0,
          clarityScore: 0,
          strengths: [],
          weaknesses: ["Unable to analyze resume."],
          improvements: ["Please try again with a valid resume."],
        }
      },
      { status: 500 }

    );
  }
}