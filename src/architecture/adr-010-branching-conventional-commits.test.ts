import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "../..");

const GITFLOW_BRANCH_REGEX =
  /^(main|develop|feature\/.+|release\/.+|hotfix\/.+)$/;

describe("ADR-010: estrategia de branching GitFlow con Conventional Commits", () => {
  it("el hook commit-msg de Husky invoca commitlint", () => {
    // Arrange
    const hookPath = path.join(ROOT_DIR, ".husky", "commit-msg");

    // Act
    const content = fs.readFileSync(hookPath, "utf-8");

    // Assert
    expect(content).toMatch(/commitlint/);
  });

  it("commitlint.config.mjs extiende la convención Conventional Commits", () => {
    // Arrange
    const configPath = path.join(ROOT_DIR, "commitlint.config.mjs");

    // Act
    const content = fs.readFileSync(configPath, "utf-8");

    // Assert
    expect(content).toMatch(/@commitlint\/config-conventional/);
  });

  it("la rama actual sigue la convención de nombres de GitFlow", () => {
    // Arrange
    const branch = execSync("git rev-parse --abbrev-ref HEAD", {
      cwd: ROOT_DIR,
      encoding: "utf-8",
    }).trim();

    // Assert
    expect(branch).toMatch(GITFLOW_BRANCH_REGEX);
  });
});
