/**
 * We can use Any AI later
 * Easily swappable
 */

export interface AIProvider {
  generateReview(prompt: string): Promise<string>
}