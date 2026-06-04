---
description: "Task list for Gestión de Tareas (To-Do) feature"
---

# Tasks: Gestión de Tareas (To-Do)

**Input**: Design documents from `/specs/001-todo-management/`

**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅

**Tests**: **MANDATORY (TDD)** per constitution v1.1.0+. Every user story MUST have a **Tests** phase before **Implementation**. Tests MUST fail before production code (red-green-refactor).

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label ([US1]–[US5])
- Include exact file paths in descriptions

## Path Conventions

- Routes: `src/app/`
- Domain: `src/features/todos/`
- Tests: co-located `*.test.ts(x)` (ADR-005)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Crear estructura de feature y tipos base

- [x] T001 Create feature directory structure `src/features/todos/{components,store,lib,types,testing}/` per plan.md
- [x] T002 [P] Define `Task`, `Priority`, `TaskStatus` types in `src/features/todos/types/task.ts`
- [x] T003 [P] Create Object Mother `buildTask()` in `src/features/todos/testing/taskMother.ts`
- [x] T004 Create public API stub in `src/features/todos/index.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Librerías de dominio, store base y wiring de ruta — **BLOCKS all user stories**

**⚠️ CRITICAL**: No user story work until this phase completes

### Tests (TDD — REQUIRED) ⚠️

> **BLOCKING**: Tests MUST fail before implementation tasks below

- [x] T005 [P] Write failing tests for `validateTask` (VR-001–004) in `src/features/todos/lib/validateTask.test.ts`
- [x] T006 [P] Write failing tests for `sortTasks` (FR-010, desempate `createdAt`) in `src/features/todos/lib/sortTasks.test.ts`
- [x] T007 [P] Write failing tests for `storage` load/save/migration (`todos:v1`) and `QuotaExceededError` on save (FR-012) in `src/features/todos/lib/storage.test.ts`
- [x] T008 Write failing tests for store init/load and save-error propagation to UI in `src/features/todos/store/todoStore.test.ts`

### Implementation

- [x] T009 [P] Implement `validateTask` in `src/features/todos/lib/validateTask.ts`
- [x] T010 [P] Implement `sortTasks` in `src/features/todos/lib/sortTasks.ts`
- [x] T011 [P] Implement `storage` with typed save result and `QuotaExceededError` handling (FR-012) in `src/features/todos/lib/storage.ts`
- [x] T012 [P] Implement priority badge token map in `src/features/todos/lib/priorityStyles.ts` (FR-017)
- [x] T013 Implement `todoStore` skeleton with `loadFromStorage`, `sortedTasks` selector (`sortTasks`), and `saveError` state in `src/features/todos/store/todoStore.ts`
- [x] T014 [P] Add date display helper in `src/lib/formatDate.ts` for due date / "Sin fecha"
- [x] T015 [P] Create minimal `TodoPage` stub in `src/features/todos/components/TodoPage.tsx` and wire `src/app/page.tsx` via `src/features/todos/index.ts`

**Checkpoint**: Foundation ready — libs tested green; store loads from localStorage

---

## Phase 3: User Story 1 — Crear y listar tareas (Priority: P1) 🎯 MVP

**Goal**: Modal de creación, listado ordenado por prioridad con badges, persistencia y estado vacío

**Independent Test**: Crear tarea válida desde modal → aparece en listado ordenado (alta → media → baja) con prioridad media por defecto, badge de color y etiqueta textual; recarga persiste datos; descripción vacía muestra error; cancelar no crea tarea; listado visible detrás de modal abierta

**Covers**: FR-001, FR-002, FR-003, FR-004, FR-005, FR-010, FR-011, FR-012, FR-013, FR-015, FR-016, FR-017, FR-018, SC-001, SC-002, SC-004, SC-005, SC-007

### Tests for User Story 1 (TDD — REQUIRED) ⚠️

- [x] T016 [P] [US1] Test modal create: default priority `media`, validation, cancel, list visible behind backdrop (FR-018, FR-002, FR-015, FR-016) in `src/features/todos/components/TaskFormModal.test.tsx`
- [x] T017 [P] [US1] Test empty state and list sort order alta → media → baja (FR-013, FR-010, SC-004) in `src/features/todos/components/TaskList.test.tsx`
- [x] T018 [P] [US1] Test `createTask` + persist (FR-011) in `src/features/todos/store/todoStore.test.ts`
- [x] T019 [P] [US1] Test priority badge color + label (FR-017, SC-007) in `src/features/todos/components/TaskItem.test.tsx`

### Implementation for User Story 1

- [x] T020 [P] [US1] Implement `TaskFormModal` create mode (Base UI Dialog) in `src/features/todos/components/TaskFormModal.tsx`
- [x] T021 [P] [US1] Implement `TaskList` with empty state rendering `sortedTasks` from store (FR-010) in `src/features/todos/components/TaskList.tsx`
- [x] T022 [P] [US1] Implement `TaskItem` read-only display with priority badge in `src/features/todos/components/TaskItem.tsx`
- [x] T023 [US1] Implement `createTask`, persist via `storage`, and surface save errors in UI (FR-011, FR-012) in `src/features/todos/store/todoStore.ts`
- [x] T024 [US1] Replace `TodoPage` stub with full container (create flow, list render, save-error banner) in `src/features/todos/components/TodoPage.tsx`
- [x] T025 [US1] Update exports in `src/features/todos/index.ts`

**Checkpoint**: MVP funcional — crear, listar ordenado, persistir, validar, badges, errores de guardado

---

## Phase 4: User Story 2 — Editar tareas existentes (Priority: P2)

**Goal**: Modal de edición con validación; conservar prioridad existente; quitar fecha opcional

**Independent Test**: Editar descripción/prioridad/fecha → cambios en listado; quitar fecha → "Sin fecha"; cancelar → sin cambios; descripción vacía → error

**Covers**: FR-003, FR-006, FR-012, FR-016

### Tests for User Story 2 (TDD — REQUIRED) ⚠️

- [x] T026 [P] [US2] Test modal edit mode: populate fields, save, cancel, clear dueDate in `src/features/todos/components/TaskFormModal.test.tsx`
- [x] T027 [P] [US2] Test `updateTask` preserves unchanged fields in `src/features/todos/store/todoStore.test.ts`

### Implementation for User Story 2

- [x] T028 [US2] Add edit mode to `TaskFormModal.tsx` (title "Editar tarea", prefill from task)
- [x] T029 [US2] Implement `updateTask` in `src/features/todos/store/todoStore.ts`
- [x] T030 [US2] Wire edit action from `TaskItem.tsx` through `TodoPage.tsx`

**Checkpoint**: US1 + US2 — crear y editar independientes

---

## Phase 5: User Story 3 — Eliminar tareas (Priority: P3)

**Goal**: Eliminar con confirmación; empty state tras última tarea

**Independent Test**: Confirmar eliminación → tarea desaparece y no vuelve tras recargar; cancelar → sin cambios; última tarea → empty state

**Covers**: FR-007, FR-013

### Tests for User Story 3 (TDD — REQUIRED) ⚠️

- [x] T031 [P] [US3] Test confirm/cancel delete dialog in `src/features/todos/components/DeleteConfirmDialog.test.tsx`
- [x] T032 [P] [US3] Test `deleteTask` + persist in `src/features/todos/store/todoStore.test.ts`

### Implementation for User Story 3

- [x] T033 [US3] Implement `DeleteConfirmDialog` (Base UI Dialog) in `src/features/todos/components/DeleteConfirmDialog.tsx`
- [x] T034 [US3] Implement `deleteTask` in `src/features/todos/store/todoStore.ts`
- [x] T035 [US3] Wire delete flow from `TaskItem.tsx` through `TodoPage.tsx`

**Checkpoint**: US1–US3 — CRUD parcial (create, read, update, delete)

---

## Phase 6: User Story 4 — Marcar tareas como completadas (Priority: P4)

**Goal**: Toggle completada/pendiente con distinción visual multi-señal y persistencia

**Independent Test**: Marcar completada → estilo distinto (checkbox + tachado + etiqueta); revertir → normal; recarga conserva estado

**Covers**: FR-008, FR-009, SC-003

### Tests for User Story 4 (TDD — REQUIRED) ⚠️

- [x] T036 [P] [US4] Test completed visual styles (not color-only) in `src/features/todos/components/TaskItem.test.tsx`
- [x] T037 [P] [US4] Test `toggleTaskStatus` + persist in `src/features/todos/store/todoStore.test.ts`

### Implementation for User Story 4

- [x] T038 [US4] Add complete/pending visual treatment to `TaskItem.tsx` (checkbox Base UI, line-through, label)
- [x] T039 [US4] Implement `toggleTaskStatus` in `src/features/todos/store/todoStore.ts`
- [x] T040 [US4] Wire toggle handler in `TodoPage.tsx`

**Checkpoint**: US1–US4 — flujo CRUD + completado funcional

---

## Phase 7: User Story 5 — Reordenamiento dinámico al editar prioridad (Priority: P5)

**Goal**: Verificar que al cambiar prioridad en edición el listado se reordena y el badge actualiza color (FR-010 dinámico; orden base ya entregado en US1)

**Independent Test**: Crear tareas con distintas prioridades; editar prioridad de una tarea → listado se reordena; badge refleja nuevo nivel

**Covers**: FR-010 (re-sort on edit), SC-004 (regresión)

### Tests for User Story 5 (TDD — REQUIRED) ⚠️

- [x] T041 [P] [US5] Test re-sort after priority update and badge color change in `src/features/todos/store/todoStore.test.ts`
- [x] T042 [P] [US5] Test list re-order on edit end-to-end in `src/features/todos/components/TaskList.test.tsx`

### Implementation for User Story 5

- [x] T043 [US5] Ensure `updateTask` refreshes `sortedTasks` and `TaskList` re-renders in correct order in `src/features/todos/store/todoStore.ts` and `src/features/todos/components/TodoPage.tsx`

**Checkpoint**: All 5 user stories independently functional; FR-010 fully verified including edit-triggered re-sort

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates, documentación y validación final

- [x] T045 Run quality gates: `npm run lint`, `npm run test:run`, `npm run build`
- [x] T046 Validate manual checklist in `specs/001-todo-management/quickstart.md`
- [x] T047 [P] Add TSDoc to public exports in `src/features/todos/index.ts` (ADR-007)
- [x] T048 [P] Verify DESIGN.md tokens applied in `src/app/globals.css` and todo components (Lexend, teal palette, modal shadow)

---

## Dependencies & Execution Order

### Phase Dependencies

```text
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) — BLOCKS all stories
    ↓
Phase 3 (US1) → Phase 4 (US2) → Phase 5 (US3) → Phase 6 (US4) → Phase 7 (US5)
    ↓
Phase 8 (Polish)
```

### User Story Dependencies

| Story    | Depends on   | Notes                                                    |
| -------- | ------------ | -------------------------------------------------------- |
| US1 (P1) | Foundational | MVP — no other stories required                          |
| US2 (P2) | US1          | Reuses `TaskFormModal`, `TaskItem`, store                |
| US3 (P3) | US1          | Reuses list + store                                      |
| US4 (P4) | US1          | Extends `TaskItem`                                       |
| US5 (P5) | US1, US2     | Base sort in US1; US5 validates re-sort on priority edit |

### Within Each User Story

1. Tests MUST fail (red)
2. Implementation minimal (green)
3. Refactor if needed
4. Checkpoint before next story

### Parallel Opportunities

**Phase 1**: T002, T003 in parallel  
**Phase 2 tests**: T005, T006, T007 in parallel  
**Phase 2 impl**: T009, T010, T011, T012, T014 in parallel (after their tests pass)  
**US1 tests**: T016, T017, T018, T019 in parallel  
**US1 impl**: T020, T021, T022 in parallel → then T023, T024 sequential (T015 stub must exist before T024)  
**US2–US5**: test tasks marked [P] within each story run in parallel

---

## Parallel Example: User Story 1

```bash
# Step 1 — Write all US1 tests together (must fail):
T016 TaskFormModal.test.tsx
T017 TaskList.test.tsx (empty state + sort order)
T018 todoStore.test.ts (createTask + save errors)
T019 TaskItem.test.tsx

# Step 2 — Implement UI components in parallel:
T020 TaskFormModal.tsx
T021 TaskList.tsx (sortedTasks)
T022 TaskItem.tsx

# Step 3 — Wire store + page:
T023 todoStore.ts (createTask + saveError)
T024 TodoPage.tsx (replaces T015 stub)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: `npm run test:run` + manual quickstart US1 scenarios
5. Demo/deploy if ready

### Incremental Delivery

| Increment | Delivers                                                                    |
| --------- | --------------------------------------------------------------------------- |
| US1       | Crear, listar ordenado, persistir, badges, empty state, errores de guardado |
| US2       | Editar tareas                                                               |
| US3       | Eliminar con confirmación                                                   |
| US4       | Marcar completadas                                                          |
| US5       | Reordenamiento al editar prioridad                                          |

### Parallel Team Strategy

After Foundational (Phase 2):

- Dev A: US1 → US2 (modal-heavy)
- Dev B: US3 → US4 (item actions)
- Dev C: US5 (re-sort on edit) after US2 merge

---

## Notes

- Delegate tests to **quality-specialist**; UI to **ui-specialist** (constitution V)
- Verify tests fail before implementing each story
- Commit after each task or logical group (Conventional Commits)
- Storage errors (QuotaExceededError) → covered by T007, T011, T023 (FR-012); user-visible message in TodoPage
- All UI text in español per spec Assumptions
