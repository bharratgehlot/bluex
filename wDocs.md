Based On Research we can use this three models (Easily swapable)

🟢 Gemini 2.5 Flash (The Sweet Spot)

PDF Support: Yes. It natively supports PDFs up to 50 MB and 1,000 pages.
Free Tier Limits: 10 requests per minute (RPM) and 250 requests per day (RPD). 
This gives you plenty of headroom well beyond your 20-30 daily requirement.

🟢 Gemini 2.5 Flash-Lite (The High-Volume Option)

Simple to config: It uses the exact same SDK and codebase as the standard Flash model, so there is no extra learning curve.
PDF Support: Yes. It also supports PDFs up to 50 MB and 1,000 pages.
Free Tier Limits: 15 requests per minute (RPM) and 1,000 requests per day (RPD). This is fantastic if your MVP suddenly gets a spike in traffic.

🟢 Gemini 2.0 Flash (The Stable Fallback)

Simple to config: Same seamless integration. It excels at taking a system instruction like "Return only valid JSON" and executing it consistently.
PDF Support: Yes. It supports the same 50 MB and 1,000-page limits for PDFs.
Free Tier Limits: 15 requests per minute (RPM) and 200 requests per day (RPD). Easily covers your MVP's daily target.

We are using 🟢 Gemini 2.5 Flash
Reason & Limitations:

1. 10 RPM is enough (rate per minute)
2. ~20 RPD enough for MVP validation (Request per day)
3. Better reasoning than Flash-Lite
4. Pro is too limited (50/day is dangerous)
5. Tokens Per Minute (TPM): 250,000
6. Context Caching: Not available on the free tier
7. Limit Reset at - 

Notes:

1. Usage-Based: These limits are per project, not per API key, and reset daily.
2. 429 Errors: Exceeding these limits will result in rate limit errors (429: Too Many Requests).
3. window.location.href (Do not use)

How:

Send PDF inline as base64 string directly in API request, force it to return json.
Vercel body limit = ~4.5MB by default.

1️⃣ Use one AI call per feature
2️⃣ Add Basic Rate Protection (MVP Level)
3️⃣ Keep Prompts Efficient

react-pdf v10

10/03/2026 

git config core.ignorecase turned to false.
users can also use AN PROMOCODE to active lifetime subscription.
Will create generic toc and privacy policy beofore launch.