/**
 * src/components/review/ReviewPage.tsx
 * Use local UI state to simulate navigation.
 * Review page that shows => Uploaded resume preview + response from ai + two buttons
 */

"use client"

import styles from "./ReviewPage.module.css";
import { useEffect, useState } from "react";

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
  file: File | null;
  onBack: () => void;
}



export default function ReviewPage({ reviewData, fileName, file, onBack }: ReviewPageProps) {

  const getColorClass = (value: number) => {
    if (value >= 80) return styles.green;
    if (value >= 60) return styles.yellow;
    return styles.red;
  };


  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPdfUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);


  return (
    <div className={styles.container}
    >

      {/* Resume Preview Section */}
      <div className={`${styles.section} ${styles.previewBox}`}>
        <h3 className={styles.title}>Resume Preview</h3>

        <p className={styles.fileName}>
          <strong>File:</strong> {fileName}
        </p>

        {pdfUrl && (
          <div className={styles.pdfWrapper}>
            <iframe
              src={pdfUrl}
              className={styles.pdfFrame}
            />
          </div>
        )}

      </div>

      {/* Review Section */}


      <div className={styles.section}>
        <h2 className={styles.title}>Resume Review</h2>



        {/* ===== Overall Score Highlight ===== */}
        <div className={styles.overallWrapper}>
          <div className={styles.overallScore}>
            {reviewData.overallScore}
          </div>
          <div className={styles.overallLabel}>Overall Score</div>

          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${getColorClass(
                reviewData.overallScore
              )}`}
              style={{ width: `${reviewData.overallScore}%` }}
            />
          </div>
        </div>

        {/* ===== Sub Scores ===== */}
        <div className={styles.scoreGrid}>
          {[
            { label: "ATS", value: reviewData.atsScore },
            { label: "Impact", value: reviewData.impactScore },
            { label: "Clarity", value: reviewData.clarityScore },
          ].map((item, i) => (
            <div key={i} className={styles.scoreCard}>
              <div className={styles.scoreValue}>{item.value}</div>
              <div className={styles.scoreLabel}>{item.label}</div>

              <div className={styles.progressBar}>
                <div
                  className={`${styles.progressFill} ${getColorClass(
                    item.value
                  )}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
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