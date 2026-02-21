/**
 * This page owns - navigation, high level flow control and review.
 * This page do not handle file parsing, upload limit logic and pdf validation
 * This page acts as orchestrator.
 * This page handle Convert PDF to base64 format.
 * src/page.tsx
 * 
 * Constraints: PDF only, max 3 mb, daily limit 7, 
 */


"use client";

import ResumeUpload from "@/components/upload/ResumeUpload";
import { useState } from "react";
import { canUpload, incrementUpload } from "@/lib/storage/uploadLimit";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Pdf, setBase64Pdf] = useState<string | null>(null);

  const testAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const res = await fetch("/api/generate-review", {
        method: "POST",
      });

      const data = await res.json();

      /** Parse response */
      let parsed;

      try {
        parsed = JSON.parse(data.ai);
      } catch {
        setError("Invalid AI response format");
        return;
      }

      setResponse(parsed);


    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  async function handleValidFile(file: File) {
    setError(null);

    /** Upload limit check */

    if (!canUpload()) {
      setError("Daily upload limit reached (7 per day)")
      return;
    }

    /** Store file in page level state */

    setSelectedFile(file);


    let base64: string;


    /** convert to base64 */

    try {
      //const base64 = await covertToBase64(file);
      base64 = await covertToBase64(file);

      console.log("Base64 length:", base64.length);

      if (base64.length > 5_000_000) {
        setError("Encoded file too large");
        return;
      }

      setBase64Pdf(base64);

    } catch (err) {
      setError("Failed to convert file");
      return;
    }

/** TEMP function - send base 64 to backend */

    try {
      setLoading(true);

      const res = await fetch("/api/generate-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({base64Pdf: base64,
        }),
      });

      if (!res.ok) {
        throw new Error("API failed");
      }

      const data = await res.json();
      // Sanitize and parse Gemini response safely
      let raw = data.ai as string;

      // Remove markdown wrappers if present
      raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

      // Extract JSON object safely
      const firstBrace = raw.indexOf("{");
      const lastBrace = raw.lastIndexOf("}");

      if (firstBrace === -1 || lastBrace === -1) {
        setError("Invalid AI response format");
        return;
      }

      const jsonString = raw.substring(firstBrace, lastBrace + 1);

      let parsed;

      try {
        parsed = JSON.parse(jsonString);
      } catch {
        setError("Invalid AI response format");
        return;
      }

      setResponse(parsed);

      /** Increment only after allowed */

      incrementUpload();

      console.log("File approved for processing:", file.name);

    } catch (err) {
      setError("Error to process resume")
    } finally {
      setLoading(false);
    }

  }

  /** Function 3 - Helper function to convert pdf to base64 */

  function covertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;

        /** Remove Prefix: data:application/pdf; base64 */
        const base64 = result.split(",")[1];

        resolve(base64);
      }
      reader.onerror = (error) => reject(error);
    });
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
        <div
          style={{
            marginTop: "20px",
            background: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Resume Review</h3>

          <p><strong>Overall Score:</strong> {response.overallScore}</p>
          <p><strong>ATS Score:</strong> {response.atsScore}</p>
          <p><strong>Impact Score:</strong> {response.impactScore}</p>
          <p><strong>Clarity Score:</strong> {response.clarityScore}</p>

          <div style={{ marginTop: "15px" }}>
            <strong>Strengths:</strong>
            <ul>
              {response.strengths?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "15px" }}>
            <strong>Weaknesses:</strong>
            <ul>
              {response.weaknesses?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "15px" }}>
            <strong>Improvements:</strong>
            <ul>
              {response.improvements?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}




      <ResumeUpload onValidFile={handleValidFile} />

      {selectedFile && (
        <p style={{ marginTop: "10px", color: "green" }}>
          Ready to process: {selectedFile.name}
        </p>
      )}
    </main>

  );
}
