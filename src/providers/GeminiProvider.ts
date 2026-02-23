/**
 * Uses Gemini 2.5 Flash (10 RPM / ~250 RPD)
 * Safe for early MVP testing
 * Easy to swap later
 * src/providers/GeminiProvider.ts
 * Maybe we will add temp later
 * Maybe we will add Empty guard → optional later
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider } from "./AIProvider";

export class GeminiProvider implements AIProvider {
  private model;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    this.model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
      //model: "gemini-2-flash"
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
        You are an AI Resume reviewer

        Analyze the attached resume and return STRICT JSON only.

        Rules:
        - All scores must be integers between 0 and 100.
        - Do NOT return decimals.
        - Do not return null.
        - If a section has no data, return an empty array [].
        - Do NOT include any extra keys.
        - Do NOT include markdown.
        - Do NOT include explanation.
        - Output must be valid JSON only
        - Always include all fields even if empty.
        - Do not wrap the JSON in backticks or code blocks.
        - If resume is not in English, analyze it in its original language. Return output in English.
  
        Return exactly this structure:

        {
          "overallScore": number,
          "atsScore": number,
          "impactScore": number,
          "clarityScore": number,
          "strengths": string[],
          "weaknesses": string[],
          "improvements": string[]
        }

        If the document is not a resume or contains insufficient content,
        return:

       {
        "overallScore": 0,
        "atsScore": 0,
        "impactScore": 0,
        "clarityScore": 0,
        "strengths": [],
        "weaknesses": ["The uploaded document does not appear to be a valid resume."],
        "improvements": ["Please upload a professional resume in PDF format."]
      }


  `
      }
    ]);

    const response = await result.response;
    return response.text();
  }


}