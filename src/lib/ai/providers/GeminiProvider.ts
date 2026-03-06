/**
 * src/lib/ai/providers/GeminiProvider.ts
 * Uses Gemini 2.5 Flash
 * Safe for early MVP testing
 * Easy to swap later
 * Maybe we will add temp later
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider } from "./AIProvider";

export class GeminiProvider implements AIProvider {
  private model;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    this.model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.2,
        topP: 0.8
      },
    });
  }

  /** * Feature 1 — Resume Review */

  async generateReview(base64Pdf: string): Promise<string> {

    if (!base64Pdf) {
      throw new Error("Empty resume input")
    }

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
        - Output must be valid JSON only
        - Personalize based on resume, no generic advice.
        - Do NOT return decimals.
        - Do not return null.
        - If a section has no data, return an empty array [].
        - Do NOT include any extra keys.
        - Do NOT include markdown.
        - Do NOT include explanation.
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
    return response.text() ?? "";
  }


  /** * Feature 1 — ENDS */

  /** Feature 2 — Resume ↔ Job Description Match */

  async generateMatch(base64Pdf: string, jdText: string): Promise<string> {
    if (!base64Pdf || !jdText) {
      throw new Error("Missing resume or job description");
    }

    const result = await this.model.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64Pdf,
        },
      },
      {
        text: `
You are an AI recruiter assistant.

Compare the attached resume with the following Job Description.

JOB DESCRIPTION:
${jdText}

Analyze the alignment between the resume and the job description.

Rules:
- Return STRICT JSON only
- Do NOT include markdown
- Do NOT include explanations
- Do NOT include null values
- Always include all fields
- Use integers for matchScore
- Do not include extra keys

Return exactly:

{
  "matchScore": number,
  "summary": string,
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "recommendations": string[]
}

If the document is invalid or analysis fails return:

{
  "matchScore": 0,
  "summary": "Unable to analyze the resume against the job description.",
  "matchedKeywords": [],
  "missingKeywords": [],
  "recommendations": ["Please try again with a valid resume and job description."]
}
`,
      },
    ]);

    const response = await result.response;
    return response.text() ?? "";
  }

  /** Feature 2 — ENDS */


}