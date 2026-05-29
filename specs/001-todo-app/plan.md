# Implementation Plan: Aplicación de To-Dos

**Branch**: `001-todo-app` | **Date**: 2026-05-29 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-todo-app/spec.md`

## Summary

Implementar una aplicación web de to-dos en una sola página con CRUD completo, modales para crear/editar/eliminar, ordenación por prioridad (alta → media → baja), distinción visual de tareas completadas y colores semáforo por prioridad. Persistencia exclusiva en `localStorage` (`todos:v1`), sin autenticación ni backend.

**Enfoque técnico**: Next.js 16 App Router + feature module `src/features/todos/`, estado Zustand, UI con Base UI Dialog + Tailwind, **TDD** con Vitest co-located (RED→GREEN por módulo, ver [tasks.md](./tasks.md)).

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+  
**Primary Dependencies**: Next.js 16.2, React 19, Zustand 5, @base-ui/react 1.5, Tailwind CSS 4  
**Storage**: `localStorage` (clave `todos:v1`); sin backend  
**Testing**: Vitest 4 + Testing Library + jsdom; TDD (test antes de implementación); co-located `*.test.ts(x)`; Object Mothers; ≥80 % cobertura de ramas en rutas críticas ([ADR-005](../../docs/adr/ADR-005-unit-testing-strategy.md))  
**Target Platform**: Navegadores modernos (client-side SPA en App Router)  
**Project Type**: Web application (single-page feature)  
**Performance Goals**: Operaciones CRUD con feedback visible < 2 s (SC-005); primera tarea creada < 1 min (SC-001)  
**Constraints**: Sin auth; offline-first local; español en UI; modales obligatorios para create/edit/delete confirm  
**Scale/Scope**: 1 pantalla, 1 entidad (Todo), ~5–8 componentes, 4 user stories (P1–P4)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

La constitución del proyecto (`.specify/memory/constitution.md`) aún es plantilla sin ratificar. Se aplican los **ADRs aceptados** como gates de arquitectura:

| Gate                  | Source  | Status  | Notes                                            |
| --------------------- | ------- | ------- | ------------------------------------------------ |
| App Router only       | ADR-001 | ✅ Pass | `src/app/page.tsx` compone feature client        |
| Tailwind styling      | ADR-002 | ✅ Pass | Prioridad colors + completed styles via Tailwind |
| Zustand state         | ADR-003 | ✅ Pass | Todo store + localStorage sync                   |
| Feature-based layout  | ADR-004 | ✅ Pass | `src/features/todos/`                            |
| Vitest TDD co-located | ADR-005 | ✅ Pass | RED→GREEN en tasks.md T007–T047                  |
| Base UI components    | ADR-006 | ✅ Pass | Dialog for all modals                            |

**Post-design re-check**: ✅ Sin violaciones. No se requiere Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-app/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/
│   └── ui-contracts.md  # Phase 1
└── tasks.md             # Phase 2 — 47 tareas TDD (T001–T047)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # Server shell → <TodosPage />
│   └── globals.css
├── features/todos/
│   ├── components/
│   │   ├── todos-page.tsx
│   │   ├── todo-list.tsx
│   │   ├── todo-list-item.tsx
│   │   ├── todo-empty-state.tsx
│   │   ├── task-form-modal.tsx
│   │   ├── delete-confirm-modal.tsx
│   │   └── *.test.tsx           # Co-located (TDD)
│   ├── store/
│   │   ├── todo-store.ts
│   │   └── todo-store.test.ts
│   ├── lib/
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   ├── validation.ts
│   │   ├── validation.test.ts
│   │   ├── sort.ts
│   │   ├── sort.test.ts
│   │   └── priority-styles.ts
│   ├── testing/
│   │   └── todo-mothers.ts
│   └── index.ts
├── lib/
│   └── storage/
│       └── local-storage.ts
├── components/ui/                 # Dialog, Button, Badge (Base UI)
└── shared/
    └── testing/                   # Cross-feature test utils (if needed)
```

**Structure Decision**: Web app monorepo single-package con arquitectura por features ([ADR-004](../../docs/adr/ADR-004-feature-based-architecture.md)). Toda la lógica de dominio todos vive en `src/features/todos/`; `src/app/` solo enruta y compone.

## Complexity Tracking

> No violations requiring justification.

## Phase 0: Research ✅

Ver [research.md](./research.md). Todas las decisiones técnicas resueltas; sin NEEDS CLARIFICATION pendientes.

## Phase 1: Design ✅

| Artifact     | Path                                                     | Status |
| ------------ | -------------------------------------------------------- | ------ |
| Data model   | [data-model.md](./data-model.md)                         | ✅     |
| UI contracts | [contracts/ui-contracts.md](./contracts/ui-contracts.md) | ✅     |
| Quickstart   | [quickstart.md](./quickstart.md)                         | ✅     |

### Implementation sequence (TDD — ver [tasks.md](./tasks.md))

1. **Setup** (T001–T004): estructura, `localStorage` helper, constantes, `components/ui/`
2. **Foundational TDD** (T005–T016): types + mothers → tests/implement `validation`, `sort`, `todo-store` → UI wrappers + export
3. **US1 MVP** (T017–T026): tests/implement modal create, list item, list → `TodosPage`, `page.tsx`
4. **US2–US4** (T027–T040): edit, delete, toggle — cada uno con RED→GREEN antes de UI
5. **Polish** (T041–T045): storage errors, ARIA, quickstart manual, lint/build
6. **Test gate** (T046–T047): umbral cobertura ≥80 % ramas, `npm run test:run` verde

### User Story → Component mapping

| Story           | Components / modules                                                        |
| --------------- | --------------------------------------------------------------------------- |
| P1 Crear/listar | TodosPage, TodoList, TodoListItem, TaskFormModal (create), todo-store, sort |
| P2 Editar       | TaskFormModal (edit), validation                                            |
| P3 Eliminar     | DeleteConfirmModal                                                          |
| P4 Completar    | TodoListItem toggle, status styles                                          |

## Phase 2: Tasks ✅

Generado por `/speckit-tasks` y actualizado con **enfoque TDD**.

| Fase en tasks.md    | Task IDs  | Notas                                       |
| ------------------- | --------- | ------------------------------------------- |
| Setup               | T001–T004 | Infraestructura                             |
| Foundational (TDD)  | T005–T016 | 3 pares RED→GREEN (validation, sort, store) |
| US1 MVP             | T017–T026 | 3 pares RED→GREEN + integración             |
| US2 Editar          | T027–T031 |                                             |
| US3 Eliminar        | T032–T036 |                                             |
| US4 Completar       | T037–T040 |                                             |
| Polish              | T041–T045 |                                             |
| Test Gate (ADR-005) | T046–T047 | Cobertura y cierre                          |

**MVP sugerido**: T001–T026 (dominio, store y US1 con tests).  
**Implementación**: `/speckit-implement` siguiendo el orden RED→GREEN de [tasks.md](./tasks.md).

## References

- [spec.md](./spec.md)
- [tasks.md](./tasks.md) — plan de ejecución TDD (T001–T047)
- [docs/adr/](../../docs/adr/) — ADR-001 through ADR-006
- [DESIGN.md](../../DESIGN.md) — sistema visual base
- [research.md](./research.md)
- [quickstart.md](./quickstart.md) — validación manual por user story
