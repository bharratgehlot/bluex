/**
 * src/page.tsx
 * / → Home (landing page)
   /review → Feature 1 (Resume Review Engine)
   /match → Feature 2 (JD Match)
  * We will use Link for page navigation and Router for component specific navigation
 */
"use client";

import Link from "next/link";
import styles from './page.module.css'
import { useState } from "react";

export default function Home() {

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqData = [
    { q: "How accurate is the AI feedback?", a: "BlueX uses Gemini 2.5 Flash to analyze your resume against industry-standard ATS patterns. While highly accurate for formatting and keywords, we recommend a final human review for personal tone." },
    { q: "Is my resume data kept private?", a: "Absolutely. Your uploads are processed securely and are never used to train public models. Data is encrypted and deleted after your session unless you choose to save it." },
    { q: "Can I match my resume to a specific job?", a: "Yes! Our 'JD Matcher' feature allows you to paste a specific Job Description to see exactly which keywords and skills you are currently missing." }
  ];


  return (
    <main className={styles.pageWrapper}>

      {/* NAVBAR */}
      <header className={styles.header}>
        <div className={styles.navBar}>
          

          <Link href="/" className={styles.logoContainer}>
            <img
              src="logo1_big.png"
              alt="resumeDaddy Icon"
              className={styles.logoIcon}
            />
            <h2 className={styles.logoText}>resume<span className={styles.accent}>Daddy</span></h2>
          </Link>
          
      
          <nav className={styles.navLinks}>
            <Link href="/review">Review</Link>
            <Link href="/match">JD Match</Link>
          </nav>
        </div>
      </header>


      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Optimize Your Resume with AI Precision
          </h1>

          <p className={styles.subtitle}>
            Structured scoring. ATS simulation. Actionable improvements.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/review" className={styles.primaryBtn}>
              Start Resume Review
            </Link>

            <Link href="/match" className={styles.secondaryBtn}>
              Resume ↔ JD Match
            </Link>
          </div>
        </div>
      </section>



      {/* HOW IT WORKS */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>How It Works</h2>

          <ol className={styles.steps}>
            <li>Upload your resume</li>
            <li>AI analyzes structure and content</li>
            <li>Improve based on structured feedback</li>
          </ol>
        </div>
      </section>


      {/* FAQ SECTION */}
      
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.faqHeader}>
            <span className={styles.supportLabel}>Support</span>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>

          <div className={styles.accordionContainer}>
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`${styles.accordionItem} ${activeFaq === index ? styles.active : ''}`}
              >
                <button
                  className={styles.accordionQuestion}
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span>{item.q}</span>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className={styles.chevron}>
                    <path d="M1 1.5L8 8.5L15 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={styles.accordionAnswer}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionInner}>
          <div className={styles.ctaContent}>
            <h2 className={styles.sectionTitle}>
              Ready to Improve Your Resume?
            </h2>

            <Link href="/review" className={styles.primaryBtn}>
              Get Started
            </Link>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.sectionInner}>
          <div className={styles.footerBrand}>

            <img src="logo1_big.png" alt="resumeDaddy Icon" className={styles.footerIcon} />
            <p><strong>resumeDaddy</strong> © 2026</p>

          </div>


          <nav className={styles.footerLinks}>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </nav>

        </div>
      </footer>


    </main>
  );
}