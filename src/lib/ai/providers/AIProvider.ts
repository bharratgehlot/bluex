/**
 * src/lib/ai/providers/AIProvider.ts
 * We can use Any AI later
 * Easily swappable
 */

export interface AIProvider {
  generateReview(input: string): Promise<string>
}