/**
 * src/lib/types/match.ts
 * Full AI analysis (internal response)
 * This is the structure AI returns
 * AI sends full data to backend (MatchAnalysis) => Backend filters => Shows response (tier based) => frontend UI
 */


/** MatchAnalysis = FULL AI RESPONSE, returns 5 responses (3 free and 2 paid)*/

export interface MatchAnalysis {
  matchScore: number
  summary: string
  matchedKeywords: string[]
  missingKeywords: string[]
  recommendations: string[]
}

/**
 * Response returned to frontend
 * (filtered depending on free/premium)
 */

export interface MatchResponse {
  matchScore: number
  summary: string
  matchedKeywords: string[]
  missingKeywords?: string[]
  recommendations?: string[]

  locked?: {
    missingKeywords?: boolean
    recommendations?: boolean
  }

}