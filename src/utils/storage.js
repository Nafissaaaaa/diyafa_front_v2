const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export function storageGet(key) {
  if (!isBrowser) return null;
  return window.localStorage.getItem(key);
}

export function storageSet(key, value) {
  if (!isBrowser) return;
  window.localStorage.setItem(key, value);
}

export function storageRemove(key) {
  if (!isBrowser) return;
  window.localStorage.removeItem(key);
}
