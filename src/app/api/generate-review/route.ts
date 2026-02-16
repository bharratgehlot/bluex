import { NextResponse } from "next/server";
import { GeminiProvider } from "@/providers/GeminiProvider";


export async function POST() {

  try {

    const gemini = new GeminiProvider();

    const aiResponse = await gemini.generateReview(
      'Return this in JSON: {"message": "Hello BlueX"}'
    );

    return NextResponse.json({
      sucess: true,
      ai: aiResponse,
    })

  } catch (error) {
    return NextResponse.json(
      {error: "AI request failed"},
      {status: 500}
    );
  }
  
}