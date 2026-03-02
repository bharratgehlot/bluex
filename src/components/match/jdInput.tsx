/**
 * src/components/match/jdInput.tsx
 * A clean, reusable text area component specifically for pasting the JD, communicating its value back to the parent page.tsx state.
 */

"use client"
import styles from './JdInput.module.css'

export default function JdInput(){
  return (
    
    <div className={styles.wrapper} >
      <label className={styles.label}>
        Paste Job Description
      </label>

      <textarea
        className={styles.textarea}
        placeholder="Paste full job description here..."
        rows={10}
      />

      <button className={styles.button}>
        Analyze Match
      </button>

    </div>

  )
}