import { GeminiProvider } from "@/providers/GeminiProvider";
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
    console.log("\n--- [ROUTE START] New Request Received ---"); // Log 1
    const body = await req.json();
    const { base64Pdf } = body;

    if (!base64Pdf) {
      console.log("[Error] No base64Pdf found in the request body."); // Log 2
      return NextResponse.json(
        { success: false, error: "No file received" },
        { status: 400 }
      );
    }

    const gemini = new GeminiProvider();

    console.log("[GEMINI] calling GeminiProvider.generateReview..."); // Log 3

    const aiRaw = await gemini.generateReview(base64Pdf);

    console.log("[GEMINI SUCCESS] Received response from AI. Length:", aiRaw?.length); // Log 4

    console.log("[PARSING] Extracting JSON..."); // Log 5
    const cleaned = extractJSON(aiRaw);

    if (!cleaned) {
      console.log("[ERROR] Failed to extract JSON from AI response. Raw was:", aiRaw); // Log 6
      throw new Error("Invalid JSON structure from AI")
    }

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
      console.log("[PARSING SUCCESS] JSON successfully parsed."); // Log 7
    } catch { 
      console.log("[ERROR] JSON.parse failed on the cleaned string."); // Log 8
      throw new Error("JSON parsing failed");
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

    console.log("--- [ROUTE SUCCESS] Sending response to client ---\n"); // Log 9
    return NextResponse.json({
      success: true,
      data: safeResponse,
    });

  } catch (error) {

    console.error("\n--- [ROUTE FAILED] Caught an Error ---"); // Log 10
    console.error("[FULL ERROR OBJECT]:", error); // Log 11

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