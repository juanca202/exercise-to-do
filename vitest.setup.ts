import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// Node 22+ define un global `localStorage` propio (inerte sin --localstorage-file),
// lo que hace que el entorno jsdom de Vitest no copie el localStorage real de jsdom
// sobre el global de test (ver populateGlobal en vitest/dist). Se expone explícitamente
// el localStorage/sessionStorage reales de jsdom para que el código bajo test los use.
const jsdomWindow = (globalThis as { jsdom?: { window: Window } }).jsdom
  ?.window;
if (jsdomWindow) {
  Object.defineProperty(globalThis, "localStorage", {
    get: () => jsdomWindow.localStorage,
    configurable: true,
  });
  Object.defineProperty(globalThis, "sessionStorage", {
    get: () => jsdomWindow.sessionStorage,
    configurable: true,
  });
}

afterEach(() => {
  cleanup();
});
