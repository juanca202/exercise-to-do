<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0
- Modified principles: IV. Calidad verificable (TDD obligatorio en implementación)
- Added sections: Ciclo TDD en Flujo de calidad (paso Implementar)
- Removed sections: None
- Templates: plan-template.md ✅ updated | tasks-template.md ✅ updated | spec-template.md ✅ (sin cambios) | AGENTS.md ✅ updated
- Follow-up TODOs: None
-->

# To-Dos Constitution

## Core Principles

### I. Decisión documentada primero

Las reglas del proyecto MUST consultarse en este orden: `.agents/MEMORY.md`, luego
`docs/adr/` cuando el tema sea arquitectónico, y esta constitución para gobernanza
Spec Kit. Ante conflicto entre fuentes, el agente MUST detenerse y pedir aclaración
al usuario antes de implementar. Las respuestas del usuario que definan convenciones
persistentes SHOULD proponerse para guardarse en `MEMORY.md` con confirmación explícita.

**Rationale**: Evita decisiones implícitas y deriva entre agentes, humanos y specs.

### II. App Router exclusivo (Next.js)

Toda ruta, layout, página, estado de carga/error y API HTTP MUST vivir bajo `src/app/`
siguiendo App Router de Next.js 16. El directorio `pages/` y patrones híbridos Pages +
App están prohibidos. Las convenciones de framework MUST validarse con el skill
`next-best-practices` y, en duda, con `node_modules/next/dist/docs/` — no con
prácticas obsoletas de versiones anteriores.

**Rationale**: Un solo modelo de enrutamiento y renderizado (RSC, layouts, streaming).

### III. Arquitectura por features

El código de aplicación MUST organizarse bajo `src/` con `app/` (rutas), `features/`
(dominio por capacidad), `shared/`, `components/` (UI genérica) y `lib/` (infra).
La lógica de una capacidad MUST permanecer dentro de su feature; solo lo reutilizable
entre features vive en `shared/` o `components/`. Nuevas capacidades MUST crearse como
nuevo módulo en `features/<nombre>/`, no como carpetas técnicas planas en la raíz.

**Rationale**: Cohesión por dominio, revisiones acotadas y evolución independiente.

### IV. Calidad verificable y TDD (NON-NEGOTIABLE)

Antes de considerar una entrega lista para merge, el cambio MUST pasar: `npm run lint`,
`npm run test:run` y `npm run build` cuando el cambio toque código ejecutable o de
empaquetado. Los tests MUST ser co-located (`*.test.ts(x)` junto al módulo), patrón
AAA, y datos repetidos vía Object Mothers según ADR-005. Los commits MUST seguir
Conventional Commits (validados por commitlint/husky).

**TDD en implementación de tareas**: Toda ejecución de `/speckit-implement` (y trabajo
manual equivalente sobre `tasks.md`) MUST seguir red-green-refactor:

1. **Red** — Escribir o completar primero las tareas de test de la user story; los tests
   MUST fallar antes de código de producción.
2. **Green** — Implementar el mínimo código para que pasen esos tests.
3. **Refactor** — Mejorar sin romper tests; lint y build siguen en verde.

`/speckit-tasks` MUST generar, por cada user story con código nuevo o modificado, una
fase de tests **antes** de la fase de implementación. No se salta TDD salvo exclusión
documentada en Complexity Tracking del plan (con justificación y alternativa de
verificación). Las pruebas MUST delegarse al agente `quality-specialist` cuando aplique.

**Rationale**: Comportamiento verificable por diseño; alinea Spec Kit con ADR-005 y Vitest.

### V. Diseño y UI cohesionados

La UI MUST respetar `DESIGN.md` (tokens, tipografía Lexend, paleta institucional).
Los componentes interactivos MUST preferir Base UI (`@base-ui/react`) según ADR-006.
El estado cliente compartido MUST usar Zustand en stores por feature (ADR-003). La
implementación visual MUST delegarse al agente `ui-specialist`; pruebas al
`quality-specialist`; documentación de specs/ADRs al `docs-specialist`.

**Rationale**: Consistencia de marca, accesibilidad y separación de responsabilidades.

## Restricciones técnicas

| Área                         | Requisito                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| Runtime                      | Next.js 16.2.x, React 19, TypeScript 5                                                |
| Estilos                      | Tailwind CSS 4; sin CSS-in-JS ad hoc que contradiga ADR-002                           |
| Estado cliente               | Zustand en `src/features/<feature>/` (stores, no prop drilling global)                |
| Documentación de API pública | TSDoc en exports públicos según ADR-007                                               |
| Idioma de comunicación       | Español para specs, ADRs y respuestas de agentes salvo indicación contraria en MEMORY |
| Pruebas                      | Vitest + Testing Library; cobertura orientada a escenarios de spec (SC-XX)            |

El alcance por feature MUST documentarse en `specs/<###-feature>/` (Spec Kit). No se
introducen dependencias nuevas sin justificación en plan.md y, si aplica, un ADR.

## Flujo de calidad y entrega

1. **Especificar** (`/speckit-specify`): historias priorizadas (P1, P2…), escenarios Given/When/Then, FR y SC medibles.
2. **Planificar** (`/speckit-plan`): Constitution Check obligatorio; violaciones documentadas en Complexity Tracking.
3. **Tareas** (`/speckit-tasks`): por user story, fase **Tests** (TDD) antes de **Implementación**; rutas bajo `src/features/`.
4. **Implementar** (`/speckit-implement`): ejecutar tareas en orden TDD (tests → fallo → código → verde → refactor); cambios mínimos.
5. **Revisión**: `npm run lint`, `npm run test:run`, `npm run build`; alinear con ADRs vigentes antes de PR.

Las ramas de feature SHOULD seguir la convención Spec Kit Git (`###-feature-name`).
Los hooks de Husky (pre-commit, commit-msg) MUST ejecutarse sin `--no-verify` salvo
petición explícita del usuario.

## Governance

Esta constitución prevalece sobre prácticas ad hoc en specs y planes cuando haya
conflicto directo con un principio numerado. Las enmiendas MUST: (1) actualizar este
archivo, (2) incrementar versión semántica (`MAJOR` = principios incompatibles o
eliminados; `MINOR` = principio o sección nueva; `PATCH` = clarificaciones), (3)
propagar cambios a `.specify/templates/*` y `AGENTS.md` si afectan agentes o gates, y
(4) registrar decisiones arquitectónicas nuevas en `docs/adr/` cuando cambien stack o
estructura.

La revisión de cumplimiento es obligatoria en cada `/speckit-plan` (Constitution Check)
y recomendada antes de merge. El archivo de referencia operativa para agentes es
`AGENTS.md`; el de memoria evolutiva del equipo es `.agents/MEMORY.md`.

**Version**: 1.1.0 | **Ratified**: 2026-06-04 | **Last Amended**: 2026-06-04
