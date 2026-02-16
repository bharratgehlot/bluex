"use client";

import { useState } from "react";

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

  return (
    <main style={{ padding: "20px" }}>
      <h1>BlueX MVP</h1>

      <button onClick={testAPI} disabled={loading}>
        {loading ? "Loading..." : "Test API"}
      </button>

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
    </main>
  );
}
