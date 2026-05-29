# Implementation Plan: Aplicación de To-Dos

**Branch**: `001-todo-app` | **Date**: 2026-05-29 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-todo-app/spec.md`

## Summary

Implementar una aplicación web de to-dos en una sola página con CRUD completo, modales para crear/editar/eliminar, ordenación por prioridad (alta → media → baja), distinción visual de tareas completadas y colores semáforo por prioridad. Persistencia exclusiva en `localStorage` (`todos:v1`), sin autenticación ni backend.

**Enfoque técnico**: Next.js 16 App Router + feature module `src/features/todos/`, estado Zustand, UI con Base UI Dialog + Tailwind, tests Vitest co-located.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+  
**Primary Dependencies**: Next.js 16.2, React 19, Zustand 5, @base-ui/react 1.5, Tailwind CSS 4  
**Storage**: `localStorage` (clave `todos:v1`); sin backend  
**Testing**: Vitest 4 + Testing Library + jsdom; co-located `*.test.ts(x)`  
**Target Platform**: Navegadores modernos (client-side SPA en App Router)  
**Project Type**: Web application (single-page feature)  
**Performance Goals**: Operaciones CRUD con feedback visible < 2 s (SC-005); primera tarea creada < 1 min (SC-001)  
**Constraints**: Sin auth; offline-first local; español en UI; modales obligatorios para create/edit/delete confirm  
**Scale/Scope**: 1 pantalla, 1 entidad (Todo), ~5–8 componentes, 4 user stories (P1–P4)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

La constitución del proyecto (`.specify/memory/constitution.md`) aún es plantilla sin ratificar. Se aplican los **ADRs aceptados** como gates de arquitectura:

| Gate                    | Source  | Status  | Notes                                            |
| ----------------------- | ------- | ------- | ------------------------------------------------ |
| App Router only         | ADR-001 | ✅ Pass | `src/app/page.tsx` compone feature client        |
| Tailwind styling        | ADR-002 | ✅ Pass | Prioridad colors + completed styles via Tailwind |
| Zustand state           | ADR-003 | ✅ Pass | Todo store + localStorage sync                   |
| Feature-based layout    | ADR-004 | ✅ Pass | `src/features/todos/`                            |
| Vitest co-located tests | ADR-005 | ✅ Pass | validation, sort, store, components              |
| Base UI components      | ADR-006 | ✅ Pass | Dialog for all modals                            |

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
└── tasks.md             # Phase 2 (/speckit-tasks — not yet created)
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
│   │   ├── task-form-modal.tsx
│   │   └── delete-confirm-modal.tsx
│   ├── store/
│   │   └── todo-store.ts
│   ├── lib/
│   │   ├── types.ts
│   │   ├── validation.ts
│   │   └── sort.ts
│   ├── testing/
│   │   └── todo-mothers.ts
│   └── index.ts
├── lib/
│   └── storage/
│       └── local-storage.ts     # Generic get/set JSON helpers
├── components/                    # Shared UI wrappers (Dialog, Button, Badge)
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

### Implementation sequence (for `/speckit-tasks`)

1. **Foundation**: types, validation, sort, localStorage helper, Object Mothers
2. **Store**: Zustand todo-store with hydrate + CRUD + persist
3. **Shared UI**: Base UI Dialog/Button wrappers if needed
4. **P1**: TodosPage, TodoList, TodoListItem, TaskFormModal (create), empty state
5. **P2**: TaskFormModal edit mode
6. **P3**: DeleteConfirmModal
7. **P4**: Toggle complete + completed visual styles
8. **Tests**: unit + component per ADR-005 (≥80% branches on critical paths)
9. **Wire**: `src/app/page.tsx` → export TodosPage

### User Story → Component mapping

| Story           | Components / modules                                                        |
| --------------- | --------------------------------------------------------------------------- |
| P1 Crear/listar | TodosPage, TodoList, TodoListItem, TaskFormModal (create), todo-store, sort |
| P2 Editar       | TaskFormModal (edit), validation                                            |
| P3 Eliminar     | DeleteConfirmModal                                                          |
| P4 Completar    | TodoListItem toggle, status styles                                          |

## Phase 2

Generado por `/speckit-tasks` — no incluido en este comando.

## References

- [spec.md](./spec.md)
- [docs/adr/](../../docs/adr/) — ADR-001 through ADR-006
- [DESIGN.md](../../DESIGN.md) — sistema visual base
- [research.md](./research.md)
