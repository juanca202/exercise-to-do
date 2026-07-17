import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

/**
 * Node 25+ exposes an experimental `localStorage` that is undefined unless
 * `--localstorage-file` is set, which shadows jsdom's implementation.
 */
if (
  typeof globalThis.localStorage === "undefined" ||
  typeof globalThis.localStorage?.clear !== "function"
) {
  const memory = new Map<string, string>();
  const storage: Storage = {
    get length() {
      return memory.size;
    },
    clear() {
      memory.clear();
    },
    getItem(key) {
      return memory.has(key) ? (memory.get(key) ?? null) : null;
    },
    key(index) {
      return [...memory.keys()][index] ?? null;
    },
    removeItem(key) {
      memory.delete(key);
    },
    setItem(key, value) {
      memory.set(key, String(value));
    },
  };
  Object.defineProperty(globalThis, "localStorage", {
    value: storage,
    configurable: true,
    writable: true,
  });
}

afterEach(() => {
  cleanup();
  localStorage.clear();
});
