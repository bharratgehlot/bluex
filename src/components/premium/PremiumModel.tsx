/**
 * src/components/premium/PremiumModel.tsx
 * This will serve as landing page for premium conversion
 * From this page user can buy premium and returning users restore premium.
 */

"use client";

import { useState } from "react";
import styles from "./PremiumModel.module.css";

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PremiumModal({ open, onClose }: PremiumModalProps) {

  const [email, setEmail] = useState("");

  if (!open) return null;

  return (
    <div className={styles.overlay}>

      <div className={styles.modal}>

        <h3>Unlock Premium Analysis</h3>

        <p>
          Discover missing keywords, skill gaps, and optimization suggestions.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <button className={styles.primary}>
          Continue
        </button>

        <button
          className={styles.close}
          onClick={onClose}
        >
          Cancel
        </button>

      </div>

    </div>
  );
}