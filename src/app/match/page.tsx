/**
 * src/match/page.tsx
 * Feature 2
 * This will be your main parent Client Component for the feature. It will hold the state for both the Resume text and the Job Description text. 
 * It will render your upload component, the new JD input component, and handle the "Match" button click to call the API.
 * We will use ResumeUpload.tsx and jdInput.tsx component 
 * FLOW: User goes to /match, uploads pdf, The component (ResumeUpload.jsx ) handles the upload logic and pass it to parent component.
 * FLOW: User paste text into jdInput.jsx. 
 * FLOW: User click Analyze Match button => POST request sent to /api/match-resume.
 * FLOW: Returned JSON format displayed to user.
 * 
 * /match/page.tsx
├── State machine
├── Base64 conversion
├── Upload limit check
├── JD input state
├── API call to /api/match-resume
└── Result view
 */

"use client";

import { useState } from "react";
import ResumeUpload from "@/components/upload/ResumeUpload";
import MatchResults from "@/components/match/MatchResults";
import JdInput from "@/components/match/JdInput";
import LoadingScreen from "@/components/common/LoadingScreen";
import { canUpload, incrementUpload } from "@/lib/storage/uploadLimit";
import styles from './page.module.css'


export default function MatchFeature() {

  /** STATES */
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");

  const [view, setView] = useState<"input" | "results">("input");


  /* Step 1 — File selection */

  function handleFileSelect(file: File) {
    setResponse(null);
    setError(null);

    /** Store file in page level state */
    setSelectedFile(file);

    console.log("Selected file:", file.name);
    console.log("File size:", file.size);
    console.log("File type:", file.type);
    console.log("Lastmodified:", file.lastModified);
  }

  /* Step 2 — JD Input */

  function handleJdChange(text: string) {

    console.log("Inputed JD: ", text)
    console.log("Length is:", text.length);
    setJdText(text);
  }

  /* Step 3 — Submit */

  async function handleSubmit() {
    if (!selectedFile || !jdText) return;

    setError(null);

    /** Check limits */
    if (!canUpload()) {
      setError("Daily upload limit reached (7 per day)");
      return;
    }

    /** Convert to base64 */

    let base64: string;

    try {
      base64 = await convertToBase64(selectedFile);

      if (base64.length > 5_000_000) {
        setError("Encoded file is too large");
        return;
      }
    } catch (err){
      setError("Failed to convert file");
      return;
    }

    try {


      setLoading(true);

      const res = await fetch("/api/match-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-premium-user": "true" // test premium user
        },
        body: JSON.stringify({
          base64Pdf: base64,
          jdText: jdText,
        })
      });


      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "AI processing failed.");
        return;
      }

      setResponse(data.data);
      incrementUpload();
      setView("results")

    } catch (err) {
      setError("Error processing match");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  /* Step 4 — Helper function */

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve(base64);
      };

      reader.onerror = reject;
    });
  }

  /* Step 5 — Reset function for Back Button */
  function handleStartOver() {
    setView("input");
    setResponse(null);
    setError(null);
    setSelectedFile(null);
    setJdText("");
  }

  /* Step 6 — Rendering logic */
  return (
    <main style={{ padding: "20px" }}>

      {error && <p style={{ color: "red" }} >{error}</p>}

      {loading && <LoadingScreen />}


      {view === "input" && !loading && (
        <>
          <ResumeUpload onValidFile={handleFileSelect} />

          <JdInput key={view} onChange={handleJdChange} />

          <button 
            className={styles.button}
            onClick={handleSubmit}
            disabled={!selectedFile || !jdText}
          >
            CHECK MATCH
          </button>
        </>
      )}

      {view === "results" && response && !loading && (
      <div>
          <MatchResults
          data={response}
          onStartOver={handleStartOver} 
        />

          <button className={styles.button} onClick={handleStartOver}>
            Start Over
          </button>
      </div>
      )}

    </main>
  );
}