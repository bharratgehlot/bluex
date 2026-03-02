/**
 * src/match/page.tsx
 * Feature 2
 * This will be your main parent Client Component for the feature. It will hold the state for both the Resume text and the Job Description text. 
 * It will render your upload component, the new JD input component, and handle the "Match" button click to call the API.
 * We will use ResumeUpload.tsx and jdInput.tsx component 
 * FLOW: User goes to /match, uploads pdf, The component (ResumeUpload.jsx ) extracts the text and updates a resumeText state variable in src/app/match/page.tsx.
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

export default function MatchFeature() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Feature 2</h1>

      <p>AI Resume to JD Matching</p>
    </main>
  );
}