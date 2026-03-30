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

export default function Home() {
  return (
    <main className={styles.pageWrapper}>

      {/* NAVBAR */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          
          <h2 className={styles.logo}>ResumeDaddy</h2>

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
          <div className={styles.footerContent}>
            <p>© {new Date().getFullYear()} BlueX</p>
            <p>AI Resume Optimization Platform</p>
          </div>
        </div>
      </footer>


    </main>
  );
}