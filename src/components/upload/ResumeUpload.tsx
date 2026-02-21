/**
 * src/components/upload/ResumeUpload.tsx
 * Owns - file selection, pdf validation, triggering extraction, passing cleaned data upward.
 * We are going to send this file upword to root page using onValidfile
 * Primary Job: Validate file, Store file locally (UI state), Show file name, Enable button
 * Total 3 states
 */

"use client"

import { useState } from "react";
import styles from "./ResumeUpload.module.css"


/* Send file to parent page.tsx */

interface ResumeUploadProps {
  onValidFile: (file: File) => void;
}

/** Default function */

export default function ResumeUpload({ onValidFile }: ResumeUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    /* If user cancels → do nothing */
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed")
      setSelectedFile(null);
      e.target.value = "";
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setError("File is too large (3 MB MAX)");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }

    console.log("Selected file: ", file.name);
    console.log("File: size", file.size);
    console.log("File: type", file.type);


    /* Clear errors */

    setError(null);
    setSelectedFile(file); // File metadata stored locally

  }

  function handleSubmit() {
    if (!selectedFile) return;

    /** Pass upward when button clicks */
    onValidFile(selectedFile);
  }


  return (

    <div className={styles.container}>
      <h2 className={styles.title}>Upload Your Resume</h2>

      <input
        className={styles.input}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />

      <button
        className={styles.submit_btn}
        onClick={handleSubmit}
        disabled={!selectedFile}
      >AUDIT MY RESUME</button>


      {selectedFile && (
        <p className={styles.fileName}>
          Selected: {selectedFile.name}
        </p>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>

  )
}

