# Agents

## Reglas operativas y arquitectónicas
- @.agents/MEMORY.md — memoria persistente del proyecto
- @docs/adr/README.md — índice de Architecture Decision Records (decisiones arquitectónicas vigentes)

### Consideraciones

- Si la información es arquitectónica → consultar ADRs
- Si es preferencia o regla operativa → usar MEMORY.md
- Si hay conflicto → ADRs tienen prioridad sobre MEMORY.md

## Reglas generales

- Los nombres de clases, variables, métodos y rutas siempre deben estar en inglés.

## Stack tecnológico

- **Framework**: Next.js 16 (App Router exclusivo — [ADR-007](docs/adr/ADR-007-solo-app-router.md))
- **UI**: React 19, TypeScript 5, Base UI ([ADR-009](docs/adr/ADR-009-base-ui.md)), Tailwind CSS 4 ([ADR-008](docs/adr/ADR-008-tailwindcss.md))
- **Estado**: Zustand ([ADR-010](docs/adr/ADR-010-zustand.md))
- **Arquitectura**: feature-based ([ADR-001](docs/adr/ADR-001-feature-based-architecture.md)); documentación de código con TSDoc ([ADR-002](docs/adr/ADR-002-tsdoc-documentation-policy.md))
- **Pruebas unitarias**: Vitest + Testing Library, cobertura mínima 80% ([ADR-003](docs/adr/ADR-003-estrategia-pruebas-unitarias.md))
- **Pruebas E2E**: Playwright ([ADR-004](docs/adr/ADR-004-playwright-e2e.md))
- **Quality Gate**: ESLint, Prettier, Husky + lint-staged, Sonar scanner ([ADR-005](docs/adr/ADR-005-quality-gate-shift-left.md))
- **Git**: GitFlow + Conventional Commits, vía commitlint ([ADR-006](docs/adr/ADR-006-gitflow-conventional-commits.md))
- **Fitness functions de arquitectura**: dependency-cruiser ([ADR-001](docs/adr/ADR-001-feature-based-architecture.md))