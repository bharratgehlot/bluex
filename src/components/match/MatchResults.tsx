/**
 * src/components/match/MatchResults.tsx
 * Displays the AI-generated Resume ↔ Job Description match analysis.
 * Receives structured JSON from /api/match-resume and renders it.
 */

"use client";

import styles from "./MatchResults.module.css";

interface MatchResponse {
  matchScore: number;
  summary: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
}

interface MatchResultsProps {
  data: MatchResponse;
  onStartOver: () => void;
}

export default function MatchResults({ data, onStartOver }: MatchResultsProps) {

  const {
    matchScore,
    summary,
    matchedKeywords,
    missingKeywords,
    recommendations
  } = data;

  return (
    <div className={styles.wrapper}>

      <h2 className={styles.title}>Analysis Complete</h2>

      {/* Match Score */}
      <div className={styles.scoreBox}>
        <h3>Match Score: {matchScore}%</h3>
        <p>{summary}</p>
      </div>

      {/* Matched Keywords */}
      <div className={styles.section}>
        <h4>Matched Keywords</h4>
        {matchedKeywords.length === 0 ? (
          <p className={styles.empty}>No matched keywords detected.</p>
        ) : (
          <ul>
            {matchedKeywords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Missing Keywords */}
      <div className={styles.section}>
        <h4>Missing Keywords</h4>
        {missingKeywords.length === 0 ? (
          <p className={styles.empty}>No major gaps detected.</p>
        ) : (
          <ul>
            {missingKeywords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Recommendations */}
      <div className={styles.section}>
        <h4>Optimization Suggestions</h4>
        {recommendations.length === 0 ? (
          <p className={styles.empty}>No suggestions available.</p>
        ) : (
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Developer Tool */}
      <details className={styles.debug}>
        <summary>View Raw API Response</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>

      <button
        className={styles.button}
        onClick={onStartOver}
      >
        Start Over
      </button>

    </div>
  );
}

