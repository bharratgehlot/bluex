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
==================PROGRESS (DEVELOPMENT)=====================

1.  Day 1 (16-02-26) - Morning - 2.5 hours - Initial setup
2.  Day 2 (17-02-26) - Morning - 3 hours - Phase 2 complete 
3.  Day 2 (18-02-26) - Morning - 2 hours - Stylings fixes
4.  Day 2 (19-02-26) - Morning - 2 hours - Phase 3 and 4
5.  Day 2 (20-02-26) - Morning - 2 hours - Day 2 Part 1
6.  Day 2 (21-02-26) - Morning - 3 hours - Day 2 Part 2

7.  Sunday

8.  Day 3 (23-02-26) - Morning - 3 hours - Night 2 Hour - UI Building.
9.  Day 3 (24-02-26) - Morning - 2 hours - UI Building 
10. Day 3 (25-02-26) - Morning - 2 hours - Testing Part 1 & 2
11. Day 3 (26-02-26) - Break  
12. Day 3 (27-02-26) - Morning - 1 hours - UI Update
13. Day 3 (28-02-26) - Break  - SEO maybe

14. Sunday

15. Day 5 (02-03-26) - expected - resume to JD matcher (feature 2)
16. Day 5 (03-03-26) - expected - resume to JD matcher
17. Day 5 (04-03-26) - expected - resume to JD matcher
18. Day 6 (05-03-26) - expected - payment integration (part of system)
19. Day 6 (06-03-26) - expected - premium workflow (part of system)
20. Day 6 (07-03-26) - expected - thin content update & final testing
21. Day 7 (08-03-26) - expected - deployement And Launch


==================FIRST ITERATION (9-15 March) =======================

Feature 3: template addition
Feature extension
Feedback from atlest 20 users
2-3 Premium users



FINISH by 15 March 

==================SECOND ITERATION (After 10 June) =====================

More Testing
More Resume template
More promotion
Manual review - Button click => Input received bia form (cv+role+instructions+email) => Review done (3 days max) => Email sent to user with detailed summury.
List of top 100 froud companies

Total: 30 Days Project

==================PRODUCTION GRADE REQUIREMENTS=======================

Premium Branding - colors, typography, fonts, design, patterns.
LinkedIn page - posts once per month 
Posts should be professionally design but we can skip this one with AI.
Professional logo + banner
Complete website - No broken UI or functionality

JD to resume matcher will have pref section also

Later Features After Launch

Feature 4: generate resume based on jd + uploaded jd.
Feature 5: Manual resume check
Feature 6: Froud company list
Feature 7: Spreedsheets Tracking each application.