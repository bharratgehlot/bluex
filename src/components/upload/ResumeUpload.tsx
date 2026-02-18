/**
 * src/components/upload/ResumeUpload.tsx
 * Owns - file selection, pdf validation, triggering extraction, limit check, passing cleaned data upward.
 * We are going to send this file upword to root page using onValidfile
 * 
 */

"use client"

import { useState } from "react";
import styles from "./ResumeUpload.module.css"


/* Send file to parent page.tsx */

interface ResumeUploadProps {
  onValidFile: (file: File) => void;
}

export default function ResumeUpload( {onValidFile}: ResumeUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    
    if (!file) {
      setError("Please select an file");
      return
    };

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed")
      setFileName(null);
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024 ) {
      setError("File is too large (5 MB MAX)");
      setFileName(null);
      e.target.value = "";
      return;
    }

    console.log("Selected file: ", file.name);
    console.log("File: size", file.size);
    console.log("File: type", file.type);

    /* Clear errors */

    setError(null);
    setFileName(file.name);
    
    /** Pass upward */
    onValidFile(file);

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

      <button className={styles.submit_btn}>AUDIT MY RESUME</button>

      {fileName && (
        <p className={styles.fileName}>Selected: {fileName}</p>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>

  )
}

