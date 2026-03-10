/**
 * Centralized Premium State Manager
 * Used across the app to read/write premium access.
 * Currently uses localStorage (MVP).
 * Later will connect to payment verification.
 */

const PREMIUM_FLAG = "premiumVerified";
const PREMIUM_EMAIL = "premiumEmail";

export function isPremiumUser(): boolean {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(PREMIUM_FLAG) === "true";
}

export function setPremiumUser(email: string) {
  if (typeof window === "undefined") return;

  localStorage.setItem(PREMIUM_FLAG, "true");
  localStorage.setItem(PREMIUM_EMAIL, email);
}

export function clearPremiumUser() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(PREMIUM_FLAG);
  localStorage.removeItem(PREMIUM_EMAIL);
}

export function getPremiumEmail(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(PREMIUM_EMAIL);
}