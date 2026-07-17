import { execSync } from "node:child_process";

const ALLOWED_PATTERN = /^(main|develop)$|^(feature|release|hotfix|bugfix)\/.+$/;

const branch = execSync("git branch --show-current").toString().trim();

if (!ALLOWED_PATTERN.test(branch)) {
  console.error(
    `[ADR-006] Nombre de rama inválido: "${branch}". ` +
      "Debe ser main, develop, o seguir el patrón feature|release|hotfix|bugfix/<nombre>.",
  );
  process.exit(1);
}

console.log(`[ADR-006] Nombre de rama válido: "${branch}".`);
