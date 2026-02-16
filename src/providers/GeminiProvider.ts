/**
 * Uses Flash (10 RPM / ~250 RPD)
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

  async generateReview(prompt: string): Promise<string> {
    const result = await this.model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  }
}