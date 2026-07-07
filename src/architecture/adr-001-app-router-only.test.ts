import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname, "..");

describe("ADR-001: adopción exclusiva de App Router", () => {
  it("no existe un directorio src/pages (Pages Router)", () => {
    // Assert
    expect(fs.existsSync(path.join(SRC_DIR, "pages"))).toBe(false);
  });

  it("el enrutamiento vive exclusivamente bajo src/app", () => {
    // Assert
    expect(fs.existsSync(path.join(SRC_DIR, "app"))).toBe(true);
  });
});
