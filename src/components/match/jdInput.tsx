/**
 * src/components/match/JdInput.tsx
 * A clean, reusable text area component specifically for pasting the JD, communicating its value back to the parent page.tsx state.
 */

"use client"

import { useState } from 'react';
import styles from './JdInput.module.css'

/* Send text to parent page.tsx */
interface JdInputProps {
  onChange: (text: string) => void;
}

export default function JdInput({ onChange }: JdInputProps) {
  // Local state just for UI feedback (the character count)
  const [charCount, setCharCount] = useState(0);

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;

    // Update local UI
    setCharCount(text.length);

    // Emit the string upward to the parent component immediately
    onChange(text);
  }

  return (
    <div className={styles.wrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "8px" }}>
        <label className={styles.label}>
          Paste Job Description
        </label>
        <span style={{ fontSize: "0.8rem", color: charCount > 0 ? "#666" : "#aaa" }}>
          {charCount} characters
        </span>
      </div>

      <textarea
        className={styles.textarea}
        placeholder="Paste full job description here..."
        rows={10}
        onChange={handleTextChange}
      />
    </div>
  )
}