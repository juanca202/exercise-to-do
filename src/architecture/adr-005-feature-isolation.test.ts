import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEATURES_DIR = path.resolve(__dirname, "../features");

const FROM_IMPORT_REGEX = /from\s+['"]([^'"]+)['"]/g;
const SIDE_EFFECT_IMPORT_REGEX = /^\s*import\s+['"]([^'"]+)['"]/gm;
const DYNAMIC_IMPORT_REGEX = /import\(\s*['"]([^'"]+)['"]\s*\)/g;

function listSourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listSourceFiles(fullPath);
    if (/\.test\.(ts|tsx)$/.test(entry.name)) return [];
    return /\.(ts|tsx)$/.test(entry.name) ? [fullPath] : [];
  });
}

function extractImportPaths(fileContent: string): string[] {
  const matches = [
    ...fileContent.matchAll(FROM_IMPORT_REGEX),
    ...fileContent.matchAll(SIDE_EFFECT_IMPORT_REGEX),
    ...fileContent.matchAll(DYNAMIC_IMPORT_REGEX),
  ];
  return matches.map((match) => match[1]);
}

// Devuelve el nombre de la feature destino si el import apunta a src/features/<otra-feature>,
// o null si no aplica (paquete externo, alias @/shared, u otro código fuera de features).
function resolveTargetFeature(
  importPath: string,
  fromFile: string,
): string | null {
  let resolved: string;
  if (importPath.startsWith("@/features/")) {
    resolved = path.resolve(FEATURES_DIR, "..", importPath.replace("@/", ""));
  } else if (importPath.startsWith(".")) {
    resolved = path.resolve(path.dirname(fromFile), importPath);
  } else {
    return null;
  }

  const relativeToFeatures = path.relative(FEATURES_DIR, resolved);
  if (relativeToFeatures.startsWith("..")) return null;
  return relativeToFeatures.split(path.sep)[0];
}

const features = fs
  .readdirSync(FEATURES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

describe("ADR-005: arquitectura feature-based (aislamiento entre features)", () => {
  it.each(features)(
    "la feature '%s' no importa directamente de otra feature",
    (featureName) => {
      // Arrange
      const files = listSourceFiles(path.join(FEATURES_DIR, featureName));

      // Act
      const violations = files.flatMap((file) => {
        const content = fs.readFileSync(file, "utf-8");
        return extractImportPaths(content)
          .map((importPath) => ({
            importPath,
            targetFeature: resolveTargetFeature(importPath, file),
          }))
          .filter(
            ({ targetFeature }) =>
              targetFeature && targetFeature !== featureName,
          )
          .map(
            ({ importPath }) =>
              `${path.relative(FEATURES_DIR, file)} -> ${importPath}`,
          );
      });

      // Assert
      expect(violations).toEqual([]);
    },
  );
});
