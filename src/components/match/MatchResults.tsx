/**
 * src/components/match/MatchResults.tsx
 * Displays the AI-generated Resume ↔ Job Description match analysis.
 * Receives structured JSON from /api/match-resume and renders it.
 */

"use client";

import { useState } from "react";
import PremiumModal from "../premium/PremiumModel";
import styles from "./MatchResults.module.css";

interface MatchResponse {
  matchScore: number;
  summary: string;
  matchedKeywords: string[];

  missingKeywords?: string[];
  recommendations?: string[];

  locked?: {
    missingKeywords?: boolean;
    recommendations?: boolean;
  };
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

  let scoreMessage = "";

  if (matchScore >= 80) {
    scoreMessage = "Your resume aligns well with this role.";
  } else if (matchScore >= 60) {
    scoreMessage = "You are close, but some improvements could increase your chances.";
  } else {
    scoreMessage = "Your resume needs stronger alignment with this job.";
  }

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const missingLocked = data.locked?.missingKeywords;
  const recommendationsLocked = data.locked?.recommendations;

  return (
    <div className={styles.wrapper}>

      <h2 className={styles.title}>Analysis Complete</h2>

      <div className={styles.scoreBox}>

        <h3>Match Score: {matchScore}%</h3>

        <p>{summary}</p>

        <p className={styles.scoreInsight}>
          {scoreMessage}
        </p>

        {data.locked && (
          <p className={styles.scoreUpgrade}>
            Unlock Premium to discover exactly what is missing from your resume.
          </p>
        )}

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
        {data.locked && (
          <p className={styles.lockHint}>
            Additional keyword gaps available in Premium analysis.
          </p>
        )}
      </div>

      {/* Missing Keywords */}
      <div className={styles.section}>
        <h4>Missing Keywords</h4>

        {missingLocked ? (
          <div className={styles.blurBox}>
            <ul>
              <li>AWS</li>
              <li>Docker</li>
              <li>Kubernetes</li>
            </ul>

            <div className={styles.paywall}>
              <p>Unlock Premium to see missing keywords</p>
              <button
                className={styles.unlockButton}
                onClick={() => setShowPremiumModal(true)}
              >
                Unlock Premium
              </button>            </div>
          </div>

        ) : missingKeywords && missingKeywords.length === 0 ? (

          <p className={styles.empty}>No major gaps detected.</p>

        ) : (

          <ul>
            {missingKeywords?.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>

        )}
      </div>


      {/* Recommendations */}
      <div className={styles.section}>
        <h4>Optimization Suggestions</h4>

        {recommendationsLocked ? (

          <div className={styles.blurBox}>

            <ul>
              <li>Improve bullet impact</li>
              <li>Add quantified achievements</li>
              <li>Highlight relevant technologies</li>
            </ul>

            <div className={styles.paywall}>
              <p>Unlock Premium to see optimization suggestions</p>
              <button
                className={styles.unlockButton}
                onClick={() => setShowPremiumModal(true)}
              >
                Unlock Premium
              </button>            </div>

          </div>

        ) : recommendations && recommendations.length === 0 ? (

          <p className={styles.empty}>No suggestions available.</p>

        ) : (

          <ul>
            {recommendations?.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>

        )}
      </div>


      {/** Sticky Upgrade CTA */}

      {data.locked && (
        <div className={styles.stickyUpgrade}>

          <div className={styles.stickyContent}>
            <span>Unlock full resume analysis</span>

            <button
              className={styles.unlockButton}
              onClick={() => setShowPremiumModal(true)}
            >
              Unlock Premium
            </button>


          </div>

        </div>
      )}

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

      <PremiumModal
        open={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />

    </div>
  );
}

