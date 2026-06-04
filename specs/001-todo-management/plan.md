# Implementation Plan: Gestión de Tareas (To-Do)

**Branch**: `001-todo-management` | **Date**: 2026-06-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-todo-management/spec.md`

## Summary

Implementar una aplicación de to-dos de página única en Next.js 16 con CRUD completo de tareas, persistencia en `localStorage`, modales para crear/editar (Base UI `Dialog`), listado ordenado por prioridad (alta → media → baja) con badges de color semántico, y distinción visual de tareas completadas. El estado de dominio vive en un store Zustand en `src/features/todos/`; la ruta principal en `src/app/page.tsx` compone la feature.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 16.2.x, React 19  
**Primary Dependencies**: `@base-ui/react` (Dialog, Field, Input, Select, Checkbox, Button), Zustand 5, Tailwind CSS 4  
**Storage**: `localStorage` (clave `todos:v1`), sin backend  
**Testing**: Vitest + Testing Library + jsdom; tests co-located (`*.test.ts(x)`)  
**Target Platform**: Navegador moderno (client-side SPA en App Router)  
**Project Type**: Web application (single-page feature en App Router)  
**Performance Goals**: Interacciones de UI < 100 ms percibidas; listado fluido hasta ~500 tareas en un dispositivo típico  
**Constraints**: Sin autenticación; Client Components para interactividad; DESIGN.md + tokens institucionales; TDD obligatorio  
**Scale/Scope**: 1 pantalla principal, 1 feature (`todos`), ~10–15 módulos de código, 5 user stories

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Reference: `.specify/memory/constitution.md` (To-Dos Constitution v1.1.0)

| Gate                    | Requirement                              | Pass criteria                                               | Status  |
| ----------------------- | ---------------------------------------- | ----------------------------------------------------------- | ------- |
| G1 Decisión documentada | MEMORY → ADR → constitution              | Español; ADRs 001–007 aplicables; sin conflicto             | ✅ Pass |
| G2 App Router           | Routes/API only under `src/app/`         | `src/app/page.tsx` compone feature; sin `pages/`            | ✅ Pass |
| G3 Feature layout       | Domain code in `src/features/<feature>/` | Todo dominio en `src/features/todos/`                       | ✅ Pass |
| G4 Quality + TDD        | Lint, test, build; tests before impl     | Vitest planificado; fase tests por story en `tasks.md`      | ✅ Pass |
| G5 Design & agents      | DESIGN.md + Base UI + Zustand            | Dialog/Field Base UI; store Zustand; ui/quality specialists | ✅ Pass |

**Post-design re-check (Phase 1)**: Sin violaciones. No se requiere Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-management/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1 — UI y storage
└── tasks.md             # Phase 2 (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx                 # Layout raíz, fuentes Lexend
│   ├── page.tsx                   # Componer TodoPage (Server → Client boundary)
│   └── globals.css                # Tokens Tailwind / DESIGN.md
├── features/
│   └── todos/
│       ├── components/
│       │   ├── TodoPage.tsx       # Contenedor principal (Client)
│       │   ├── TaskList.tsx       # Listado ordenado + empty state
│       │   ├── TaskItem.tsx       # Fila con badge prioridad, toggle completada
│       │   ├── TaskFormModal.tsx  # Modal crear/editar (Base UI Dialog)
│       │   └── DeleteConfirmDialog.tsx
│       ├── store/
│       │   └── todoStore.ts       # Zustand + acciones CRUD + persist
│       ├── lib/
│       │   ├── storage.ts         # localStorage read/write + migración v1
│       │   ├── sortTasks.ts       # Orden prioridad + createdAt
│       │   ├── validateTask.ts    # Descripción obligatoria, prioridad enum
│       │   └── priorityStyles.ts  # Mapeo alta/media/baja → tokens DESIGN.md
│       ├── types/
│       │   └── task.ts            # Task, Priority, TaskStatus
│       ├── testing/
│       │   └── taskMother.ts      # Object Mother (ADR-005)
│       └── index.ts               # API pública de la feature
├── components/                    # Wrappers UI genéricos si se extraen de todos
├── shared/
│   └── testing/                   # Helpers compartidos de test
└── lib/                           # Infra transversal (p. ej. cn(), formatDate)
```

**Structure Decision**: Arquitectura por features ([ADR-004](docs/adr/ADR-004-feature-based-architecture.md)). Toda la lógica de dominio de tareas queda encapsulada en `src/features/todos/`. `src/app/page.tsx` solo importa y renderiza el entrypoint público de la feature.

## Phase 0 & 1 Artifacts

| Artifact     | Path                             | Purpose                                                                            |
| ------------ | -------------------------------- | ---------------------------------------------------------------------------------- |
| Research     | [research.md](./research.md)     | Decisiones técnicas (Zustand, localStorage, Base UI Dialog, ordenamiento, colores) |
| Data model   | [data-model.md](./data-model.md) | Entidad Task, validaciones, transiciones de estado                                 |
| UI contracts | [contracts/](./contracts/)       | Contratos de modal, listado y esquema de persistencia                              |
| Quickstart   | [quickstart.md](./quickstart.md) | Comandos dev/test y flujo manual de verificación                                   |

## Implementation Notes

### User story → módulo mapping

| Story             | Módulos principales                                                 |
| ----------------- | ------------------------------------------------------------------- |
| P1 Crear y listar | `TaskFormModal`, `TaskList`, `todoStore`, `storage`, `validateTask` |
| P2 Editar         | `TaskFormModal` (modo edit), `todoStore.updateTask`                 |
| P3 Eliminar       | `DeleteConfirmDialog`, `todoStore.deleteTask`                       |
| P4 Completar      | `TaskItem` toggle, estilos completada/pendiente                     |
| P5 Ordenar        | `sortTasks`, selector en store o derivado                           |

### TDD (Constitution IV)

Por cada user story, `/speckit-tasks` MUST generar:

1. Tests de store/lib (validación, ordenamiento, persistencia)
2. Tests de componentes (modal, listado, empty state, badges)
3. Implementación mínima para verde
4. Refactor + lint/build

### Agent delegation

- **ui-specialist**: `TaskFormModal`, `TaskList`, `TaskItem`, tokens de prioridad, estados vacío/completado
- **quality-specialist**: tests alineados a escenarios Given/When/Then de spec (SC-XX, FR-XX)

## Complexity Tracking

> Sin violaciones de constitución que requieran justificación.
