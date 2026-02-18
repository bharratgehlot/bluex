/**
 * This page owns - navigation, high level flow control and review.
 * This page do not handle file parsing, upload limit logic and pdf validation
 * This page acts as orchestrator
 */


"use client";

import ResumeUpload from "@/components/upload/ResumeUpload";
import { useState } from "react";
import { canUpload, incrementUpload } from "@/lib/storage/uploadLimit";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const res = await fetch("/api/generate-review", {
        method: "POST",
      });

      const data = await res.json();

      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  function handleValidFile(file: File){
    setError(null);

    /** Upload limit check */

    if (!canUpload()) {
      setError("Daily upload limit reached (3 per day")
      return
    }

    /** Increment only after allowed */

    incrementUpload();

    console.log("File approved for processing:", file.name);

    /** Phase 3: extraction will go here */

  }

  return (
    <main style={{ padding: "20px" }}>
      {/* <h1>BlueX MVP</h1>
     <button onClick={testAPI} disabled={loading}>
        {loading ? "Loading..." : "Test API"}
      </button>
 */}
      

      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <pre
          style={{
            marginTop: "20px",
            background: "#f4f4f4",
            padding: "10px",
          }}
        >
          {response}
        </pre>
      )}

      <ResumeUpload onValidFile={handleValidFile}/>
    </main>
    
  );
}
