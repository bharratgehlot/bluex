/**
 * src/app/api/match-resume/route.ts
 * Role: Your serverless backend endpoint. It receives the JD text and Resume text from the frontend, uses your existing src/lib/ai/providers/GeminiProvider.ts, 
 * formats the prompt, and streams the structured JSON response back.
 */

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "API working - match-resume"
  });
}