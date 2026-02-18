/**
 * Utility Function 
 * Purpose: Enforce soft upload limit (max 3).
 * Use localStorage for tracking (can be bypassed by user)
 * Reset Daily
 * Business Rule => Belongs in src/lib/
 * Controlled by page.tsx
 * We do need submit button for sending resume for extraction and returning API value
 */

const LIMIT = 3;
const STORAGE_KEY = "dailyUploadData";

interface UploadData {
  date: string;
  count: number;
}

/** Get Today's Date (e.g., "2026-02-17") */

function getToday(): string {
  const date = new Date().toISOString().split("T")[0];
  console.log("Today's date is ", date)
  return date;
}

/** Get stored data from localStorage */


export function getStoredData(): UploadData | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  console.log("Stored Data (raw): ", stored);

  /* Parse into JSON Object */
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  } 
}

/** Check if user can upload or not */
export function canUpload(): boolean {

  const data = getStoredData();
  const today = getToday();

  if (!data) return true;
  if (data.date !== today) return true;

  return (data.count ?? 0) < LIMIT;
}

/* function to increment value of count
* Runs after successful upload
*/

export function incrementUpload(): void {
  const today = getToday();
  const data = getStoredData();

  if (!data || data.date !== today) {
    const newData: UploadData = { date: today, count: 1 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return;
  }

  const updated: UploadData = {
    date: today,
    count: data.count + 1,
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}