import { existsSync } from "node:fs";

const FORBIDDEN_PAGE_ROUTER_DIRS = ["pages", "src/pages"];

const found = FORBIDDEN_PAGE_ROUTER_DIRS.filter((dir) => existsSync(dir));

if (found.length > 0) {
  console.error(
    `[ADR-007] Directorio(s) de Page Router encontrados: ${found.join(", ")}. ` +
      "El proyecto usa exclusivamente App Router (src/app).",
  );
  process.exit(1);
}

console.log("[ADR-007] No se encontró directorio de Page Router. App Router exclusivo, OK.");
