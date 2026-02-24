"use client"

import { useEffect, useState } from "react"
import styles from './LoadingScreen.module.css'

const messages = [
  "Analyzing your resume...",
  "Checking ATS compatibility...",
  "Evaluating impact and clarity...",
  "Scanning for weak bullet points...",
  "Optimizing for recruiter readability...",
  "Generating final structured review..."
]

export default function LoadingScreen() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) =>
        prev === messages.length - 1 ? 0 : prev + 1
      );
    }, 1500);


    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container} >
      <div className={styles.spinner}></div>
      <p className={styles.message}>
        {messages[currentMessageIndex]}
      </p>
    </div >
  )
}