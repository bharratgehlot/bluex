/**
 * src/components/review/ReviewPage.tsx
 * Use local UI state to simulate navigation.
 * Review page that shows => Uploaded resume preview + response from ai + two buttons
 */

"use client"

import styles from "./ReviewPage.module.css";

interface ReviewData {
  overallScore: number;
  atsScore: number;
  impactScore: number;
  clarityScore: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
}

interface ReviewPageProps {
  reviewData: ReviewData;
  fileName: string;
  onBack: () => void;
}



export default function ReviewPage({ reviewData, fileName, onBack }: ReviewPageProps) {
  return (
    <div className={styles.container}
    >

      {/* Resume Preview Section */}
      <div className={`${styles.section} ${styles.previewBox}`}>
        <h3 className={styles.title}>Resume Preview</h3>
        <p className={styles.fileName}>
          <strong>File:</strong> {fileName}
        </p>
      </div>

      {/* Review Section */}
      <div className={styles.section}>
        <h2 className={styles.title}>Resume Review</h2>

        {/* Score Grid */}
        <div className={styles.scoreGrid}>
          <div className={styles.scoreCard}>
            <div className={styles.scoreValue}>
              {reviewData.overallScore}
            </div>
            <div className={styles.scoreLabel}>Overall</div>
          </div>

          <div className={styles.scoreCard}>
            <div className={styles.scoreValue}>
              {reviewData.atsScore}
            </div>
            <div className={styles.scoreLabel}>ATS</div>
          </div>

          <div className={styles.scoreCard}>
            <div className={styles.scoreValue}>
              {reviewData.impactScore}
            </div>
            <div className={styles.scoreLabel}>Impact</div>
          </div>

          <div className={styles.scoreCard}>
            <div className={styles.scoreValue}>
              {reviewData.clarityScore}
            </div>
            <div className={styles.scoreLabel}>Clarity</div>
          </div>
        </div>

        {/* Strengths */}
        <div className={styles.section}>
          <strong>Strengths</strong>
          <ul className={styles.list}>
            {reviewData.strengths.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className={styles.section}>
          <strong>Weaknesses</strong>
          <ul className={styles.list}>
            {reviewData.weaknesses.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className={styles.section}>
          <strong>Improvements</strong>
          <ul className={styles.list}>
            {reviewData.improvements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.buttonRow}>
        <button
          onClick={onBack}
          className={`${styles.button} ${styles.secondary}`}
        >
          Back
        </button>

        <button className={styles.button}>
          Fix My Resume
        </button>
      </div>

    </div>
  )
}