import { GeminiProvider } from "@/providers/GeminiProvider";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { base64Pdf } = body;

    if (!base64Pdf) {
      return NextResponse.json(
        { error: "No file received" },
        { status: 400 }
      );
    }

    const gemini = new GeminiProvider();

    const aiResponse = await gemini.generateReview(base64Pdf);


    return NextResponse.json({
      success: true,
      ai: aiResponse,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "AI request failed" },
      { status: 500 }
    );
  }
}