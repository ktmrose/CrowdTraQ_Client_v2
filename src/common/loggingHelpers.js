// Utility helpers for localStorage persistence
const LOG_STORAGE_KEY = "pendingLogs";

export function loadPendingLogs() {
  try {
    const raw = localStorage.getItem(LOG_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePendingLogs(logs) {
  localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
}

export function clearPendingLogs() {
  localStorage.removeItem(LOG_STORAGE_KEY);
}
