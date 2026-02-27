/**
 * src/components/review/ReviewPage.tsx
 * Use local UI state to simulate navigation.
 * Review page that shows => Uploaded resume preview + response from ai + two buttons
 */

"use client"

import styles from "./ReviewPage.module.css";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(
  () => import("@/components/common/PdfViewer"),
  { ssr: false }
);

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

  return (

    <div className={styles.container}
    >

      {/* ================= 1. Preview Box ================= */}


      <div className={styles.previewBox}>
        <h3 className={styles.title}>Preview:</h3>

        <p className={styles.fileName}>
          <strong>File:</strong> {fileName}
        </p>

        <div className={styles.viewerContainer}>
          <PdfViewer file={file} />
        </div>
      </div>

      {/* ================= 2. Review Box ================= */}

      <div className={styles.reviewBox}> 
        <h2 className={styles.title}>What AI says</h2>

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
        <div className={styles.contentBlock}>
          <strong>Strengths</strong>
          <ul className={styles.list}>
            {reviewData.strengths.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>



        {/* Weaknesses */}
        <div className={styles.contentBlock}>
          <strong>Weaknesses</strong>
          <ul className={styles.list}>
            {reviewData.weaknesses.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>



        {/* Improvements */}
        <div className={styles.contentBlock}>
          <strong>Improvements</strong>
          <ul className={styles.list}>
            {reviewData.improvements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= 3. Button Box ================= */}

      <div className={styles.buttonBox}> 
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