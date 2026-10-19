/**
 * Safely parse a JSON value from localStorage.
 * Returns `fallback` when the key is missing or the stored value is corrupt.
 */
export function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    console.warn(`[storage] Failed to parse key "${key}" — using default.`);
    return fallback;
  }
}

/**
 * Serialize `value` to JSON and write it to localStorage.
 * Silently swips quota errors so the app keeps running.
 */
export function storageSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[storage] Failed to write key "${key}":`, err);
  }
}
