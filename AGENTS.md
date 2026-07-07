# Agents

## Reglas operativas y arquitectónicas

- @.agents/MEMORY.md — memoria persistente del proyecto
- @docs/adr/README.md — índice de Architecture Decision Records (decisiones arquitectónicas vigentes)

### Consideraciones

- Si la información es arquitectónica → consultar ADRs
- Si es preferencia o regla operativa → usar MEMORY.md
- Si hay conflicto → ADRs tienen prioridad sobre MEMORY.md

## Reglas generales

## Convensiones

## Stack tecnológico

- **Framework**: Next.js 16.2.10 — enrutamiento vía App Router (`src/app/`) según [ADR-001](docs/adr/ADR-001-adopcion-exclusiva-app-router.md).
- **UI**: React 19.2.4
- **Lenguaje**: TypeScript 5 (modo `strict`)
- **Estilos**: Tailwind CSS 4 (vía `@tailwindcss/postcss`)
- **Linting**: ESLint 9 (`eslint-config-next`)
- **Bundler/dev server**: Turbopack (configurado en `next.config.ts`)
- **Gestor de paquetes**: npm (`package-lock.json`)
- **Testing**: sin framework configurado aún

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
