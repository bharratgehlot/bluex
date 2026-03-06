/**
 * src/review/page.tsx
 * /review → Feature 1 (Resume Review Engine) (Isolated)
 * This page owns - navigation, high level flow control and review & Submission.
 * This page do not handle file parsing, upload limit logic and pdf validation
 * This page acts as feature 1 orchestrator.
 * This page handle Convert PDF to base64 format.
 * It also handle upload flow, base64 converison, API trigger, view switching, state
 * Constraints: PDF only, max 3 mb, daily limit 7.
 */

"use client";

import ResumeUpload from "@/components/upload/ResumeUpload";
import { useState } from "react";
import { canUpload, incrementUpload } from "@/lib/storage/uploadLimit";
import ReviewPage from "@/components/review/ReviewPage";
import LoadingScreen from "@/components/common/LoadingScreen";
import styles from './page.module.css'

export default function ReviewFeature() {

  /** STATES */
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [view, setView] = useState<"upload" | "review">("upload");


  /* Step 1 — File selection */

  function handleFileSelect(file: File) {
    setResponse(null);
    setError(null);

    /** Store file in page level state */
    setSelectedFile(file);
  }

  /* Step 2 — Submission */

  async function handleSubmit() {
    if (!selectedFile) return;

    setError(null);

    /** Upload limit check */

    if (!canUpload()) {
      setError("Daily upload limit reached (7 per day)")
      return;
    }

    let base64: string;

    /** convert to base64 */

    try {

      base64 = await convertToBase64(selectedFile);
      console.log("Base64 length:", base64.length);

      if (base64.length > 5_000_000) {
        setError("Encoded file too large");
        return;
      }


    } catch (err) {
      setError("Failed to convert file");
      return;
    }

    /** send base 64 to backend */

    try {
      setLoading(true);
      console.log("File approved for processing:", selectedFile.name);

      const res = await fetch("/api/generate-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64Pdf: base64,
        }),
      });

      /** Parse the data first so we don't lose the backend's specific error messages */
      const data = await res.json();

      console.log("File is being processed:", selectedFile.name);

      /** Check both standard HTTP errors AND your custom success flag */

      /*
      if (!res.ok) {
        throw new Error("API failed");
      }
        
      if (!data.success) {
        setError(data.error || "AI processing failed");
        return;
      }

      
      */

      if (!res.ok || !data.success) {
        setError(data.error || "AI processing failed.");
        return;
      }


      setResponse(data.data);

      /** Increment only after allowed */

      incrementUpload();

      setView("review")

      console.log("File processed successfully:", selectedFile.name);

    } catch (err) {
      setError("Error to process resume")
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  /** Step 3 - Helper function to convert pdf to base64 */
  /** later we can move this to seperate file or worker for performance  */

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;

        /** Remove Prefix: data:application/pdf; base64 */
        const base64 = result.split(",")[1];

        resolve(base64);
      }
      reader.onerror = reject;
    });
  }

  return (
    <main style={{ padding: "20px" }}>


      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading && <LoadingScreen />}



      {view === "upload" && !loading && (
        <>
          <ResumeUpload
            onValidFile={handleFileSelect} />

          {/* Always visible button */}

          <button
            onClick={handleSubmit}
            disabled={!selectedFile}
            className={styles.submit_btn}

          >
            AUDIT MY RESUME
          </button>

          {selectedFile && (
            <p style={{ marginTop: "10px", color: "green" }}>
              Ready to process: {selectedFile.name}
            </p>
          )}
        </>
      )}

      {view === "review" && response && (
        <ReviewPage
          reviewData={response}
          fileName={selectedFile?.name || ""}
          file={selectedFile}
          onBack={() => setView("upload")}
        />
      )}

    </main>

  );
}
