/**
 * Uses Gemini 2.5 Flash (10 RPM / ~250 RPD)
 * Safe for early MVP testing
 * Easy to swap later
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider } from "./AIProvider";

export class GeminiProvider implements AIProvider {
  private model;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    this.model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    }
    )
  }

  async generateReview(base64Pdf: string): Promise<string> {

    const result = await this.model.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64Pdf,
        },
      },
      {
        text: `
  Analyze this resume and return STRICT JSON only.
  
  Return format:
  
  {
    "overallScore": number,
    "atsScore": number,
    "impactScore": number,
    "clarityScore": number,
    "strengths": string[],
    "weaknesses": string[],
    "improvements": string[]
  }
  
  No explanation.
  No markdown.
  Valid JSON only.
  `
      }
    ]);

    const response = await result.response;
    return response.text();
  }


}