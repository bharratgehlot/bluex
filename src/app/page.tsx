/**
 * src/page.tsx
 * / → Home (landing page)
   /review → Feature 1 (Resume Review Engine)
   /match → Feature 2 (JD Match)
   
 * This page owns - navigation, high level flow control and review.
 * This page do not handle file parsing, upload limit logic and pdf validation
 * This page acts as orchestrator.
 * This page handle Convert PDF to base64 format.
 * It also handle upload flow, base64 converison, API call, view switching, state
 * Constraints: PDF only, max 3 mb, daily limit 7, 
 */


"use client";

import ResumeUpload from "@/components/upload/ResumeUpload";
import { useState } from "react";
import { canUpload, incrementUpload } from "@/lib/storage/uploadLimit";
import ReviewPage from "@/components/review/ReviewPage";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useRouter } from "next/navigation";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //const [base64Pdf, setBase64Pdf] = useState<string | null>(null);
  const [view, setView ] = useState<"upload" | "review">("upload");
  const router = useRouter();

  async function handleValidFile(file: File) {
    setResponse(null);
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
      
      base64 = await convertToBase64(file);

      console.log("Base64 length:", base64.length);

      if (base64.length > 5_000_000) {
        setError("Encoded file too large");
        return;
      }

      //setBase64Pdf(base64);

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

      if (!data.success) {
        setError(data.error || "AI processing failed");
        return;
      }

      setResponse(data.data);
      setView("review")

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
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <main style={{ padding: "20px" }}>
     

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading && <LoadingScreen />}

     

      {view === "upload" && !loading && (
        <>
          <ResumeUpload
            onValidFile={handleValidFile}
            isLoading={loading}
          />

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

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => router.push("/match")}
          style={{ padding: "10px 16px", cursor: "pointer" }}
        >
          Resume ↔ JD Match (Premium)
        </button>
      </div>

    </main>

  );
}
