# Tasks: Aplicación de To-Dos

**Input**: Design documents from `/specs/001-todo-app/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contracts.md, quickstart.md

**Tests (TDD)**: Enfoque **Test-Driven Development** según [ADR-005](../../docs/adr/ADR-005-unit-testing-strategy.md):

1. **RED** — Escribir test co-located (`*.test.ts(x)`) que falle; patrón AAA; datos con Object Mothers (`testing/todo-mothers.ts`).
2. **GREEN** — Implementar el mínimo código para que el test pase.
3. **REFACTOR** — Mejorar sin romper tests (misma tarea GREEN o commit aparte).

Cada par RED→GREEN está en orden de ejecución. No marcar GREEN como hecha si los tests RED correspondientes siguen fallando. Objetivo final: ≥80 % cobertura de **ramas** en `lib/`, `store/` y componentes con lógica de negocio (`npm run test:run`).

**Organization**: Tareas agrupadas por user story; dentro de cada fase, tests antes de implementación.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Ejecutable en paralelo (archivos distintos, sin dependencias en tareas RED/GREEN incompletas del mismo módulo)
- **[Story]**: User story (US1–US4); omitido en Setup/Foundational/Polish/Gate
- **RED** / **GREEN**: Ciclo TDD en la descripción de la tarea

## Path Conventions

- Raíz de código: `src/` (alias `@/*`)
- Feature: `src/features/todos/`
- App Router: `src/app/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Estructura de carpetas y utilidades transversales mínimas

- [x] T001 Crear estructura de directorios de la feature en `src/features/todos/` (`components/`, `store/`, `lib/`, `testing/`) según plan.md
- [x] T002 [P] Implementar helper genérico de almacenamiento JSON en `src/lib/storage/local-storage.ts` (get/set/remove con manejo de errores)
- [x] T003 [P] Crear constante de clave `TODOS_STORAGE_KEY = 'todos:v1'` en `src/features/todos/lib/constants.ts`
- [x] T004 [P] Crear directorio `src/components/ui/` para wrappers Base UI reutilizables (Dialog, Button, Badge) si no existen

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Tipos, dominio, store y primitivas UI — **bloquea todas las user stories**

**⚠️ CRITICAL**: Completar todos los pares RED→GREEN antes de Phase 3

### Tipos y utilidades de test

- [x] T005 [P] Definir tipos `Todo`, `TodoPriority`, `TodoStatus`, `CreateTodoInput`, `UpdateTodoInput`, `ValidationResult` en `src/features/todos/lib/types.ts`
- [x] T006 [P] Crear Object Mothers `aTodo()`, `aTodoInput()`, `buildTodo()` en `src/features/todos/testing/todo-mothers.ts`

### validation.ts (TDD)

- [x] T007 [P] **RED** Escribir tests en `src/features/todos/lib/validation.test.ts`: VR-001–VR-006, rechazo descripción vacía/fecha inválida (FR-010, SC-006); ejecutar `npm run test:run` y confirmar fallo
- [x] T008 [P] **GREEN** Implementar `validateCreateInput` / `validateUpdateInput` en `src/features/todos/lib/validation.ts` hasta que T007 pase

### sort.ts (TDD)

- [x] T009 [P] **RED** Escribir tests en `src/features/todos/lib/sort.test.ts`: orden alta→media→baja (FR-004, SC-002); desempate `createdAt` ascendente; desempate por `id` si empatan timestamps
- [x] T010 [P] **GREEN** Implementar `sortTodosByPriority` en `src/features/todos/lib/sort.ts` hasta que T009 pase

### Estilos y store (TDD)

- [x] T011 [P] **GREEN** Definir mapa semáforo en `src/features/todos/lib/priority-styles.ts` (alta=rojo, media=ámbar, baja=verde) — sin test unitario; cubierto en tests de componente (US1)
- [x] T012 **RED** Escribir tests en `src/features/todos/store/todo-store.test.ts`: hydrate, `createTodo`, `updateTodo`, `deleteTodo`, `toggleStatus`, persistencia mock `localStorage` (FR-009); confirmar fallo
- [x] T013 **GREEN** Implementar store Zustand en `src/features/todos/store/todo-store.ts` hasta que T012 pase

### UI compartida y export

- [x] T014 [P] **GREEN** Implementar wrapper `Dialog` con Base UI en `src/components/ui/dialog.tsx` (focus trap, Escape, `open`/`onOpenChange`)
- [x] T015 [P] **GREEN** Implementar wrappers `Button` y `Badge` en `src/components/ui/button.tsx` y `src/components/ui/badge.tsx` según DESIGN.md
- [x] T016 **GREEN** Exportar API pública en `src/features/todos/index.ts`

**Checkpoint**: `npm run test:run` verde en `lib/` y `store/`; wrappers UI listos

---

## Phase 3: User Story 1 - Crear y listar tareas (Priority: P1) 🎯 MVP

**Goal**: Registrar tareas vía modal, listarlas ordenadas por prioridad con colores, estado vacío y persistencia

**Independent Test**: Ver escenarios US1 en spec.md y quickstart.md sección P1

### TaskFormModal — create (TDD)

- [x] T017 [P] [US1] **RED** Escribir tests en `src/features/todos/components/task-form-modal.test.tsx` (modo `create`): guardar válido, rechazo campos vacíos (FR-010), cancelar sin crear (FR-015); confirmar fallo
- [x] T018 [P] [US1] **GREEN** Implementar `TaskFormModal` modo `create` en `src/features/todos/components/task-form-modal.tsx` hasta que T017 pase (FR-013)

### Listado (TDD)

- [x] T019 [P] [US1] **RED** Escribir tests en `src/features/todos/components/todo-list-item.test.tsx`: muestra descripción/fecha, badge prioridad por color (FR-014, SC-007), estado `pendiente` por defecto; confirmar fallo
- [x] T020 [P] [US1] **GREEN** Implementar `TodoListItem` en `src/features/todos/components/todo-list-item.tsx` (sin botones editar/eliminar/toggle) hasta que T019 pase
- [x] T021 [P] [US1] **RED** Escribir tests en `src/features/todos/components/todo-list.test.tsx`: lista ordenada vía `getSortedTodos()`; confirmar fallo
- [x] T022 [P] [US1] **GREEN** Implementar `TodoList` en `src/features/todos/components/todo-list.tsx` hasta que T021 pase

### Integración US1

- [x] T023 [US1] **GREEN** Implementar `TodoEmptyState` en `src/features/todos/components/todo-empty-state.tsx` (FR-012)
- [x] T024 [US1] **GREEN** Implementar `TodosPage` en `src/features/todos/components/todos-page.tsx` (hydrate, listado/empty, modal crear)
- [x] T025 [US1] **GREEN** Conectar `src/app/page.tsx` con `TodosPage`
- [x] T026 [US1] **GREEN** Textos UI en español y mensajes de validación en `task-form-modal.tsx`

**Checkpoint**: MVP — `npm run test:run` verde incluyendo tests US1; validar quickstart P1

---

## Phase 4: User Story 2 - Editar tareas existentes (Priority: P2)

**Goal**: Editar descripción, fecha y prioridad vía modal; conservar `status` al editar tarea completada (validar tras US4)

**Independent Test**: quickstart.md sección P2; escenario US2.4 requiere tarea `completada` (US4)

### TaskFormModal — edit (TDD)

- [x] T027 [US2] **RED** Ampliar `src/features/todos/components/task-form-modal.test.tsx`: modo `edit` precarga datos, `updateTodo`, validación, cancelar sin cambios (FR-005, FR-015); confirmar fallo en casos nuevos
- [x] T028 [US2] **GREEN** Extender `TaskFormModal` modo `edit` en `task-form-modal.tsx` hasta que T027 pase

### UI edición

- [x] T029 [US2] **GREEN** Añadir botón Editar y `onEdit` en `todo-list-item.tsx`
- [x] T030 [US2] **GREEN** Integrar modal edición en `todos-page.tsx`
- [x] T031 [US2] **GREEN** Ampliar `todo-list.test.tsx`: reordenación tras cambio de prioridad

**Checkpoint**: Tests modal + listado verdes; quickstart P2

---

## Phase 5: User Story 3 - Eliminar tareas (Priority: P3)

**Goal**: Eliminar con modal de confirmación

**Independent Test**: quickstart.md sección P3

### DeleteConfirmModal (TDD)

- [x] T032 [P] [US3] **RED** Escribir tests en `src/features/todos/components/delete-confirm-modal.test.tsx`: confirmar elimina, cancelar no elimina (FR-006); confirmar fallo
- [x] T033 [P] [US3] **GREEN** Implementar `DeleteConfirmModal` en `delete-confirm-modal.tsx` hasta que T032 pase

### UI eliminación

- [x] T034 [US3] **GREEN** Añadir botón Eliminar y `onDelete` en `todo-list-item.tsx`
- [x] T035 [US3] **GREEN** Integrar modal eliminación en `todos-page.tsx`
- [x] T036 [US3] **GREEN** Transición a `TodoEmptyState` al eliminar última tarea

**Checkpoint**: quickstart P3; tests delete modal verdes

---

## Phase 6: User Story 4 - Marcar tareas como completadas (Priority: P4)

**Goal**: Toggle pendiente/completada con estilos distintos y color de prioridad visible

**Independent Test**: quickstart.md sección P4; SC-004

### Toggle y estilos (TDD)

- [x] T037 [US4] **RED** Ampliar `todo-list-item.test.tsx`: toggle completada/pendiente, estilos tachado/opacidad con badge prioridad (FR-007, FR-008, SC-004); confirmar fallo
- [x] T038 [US4] **GREEN** Implementar checkbox/toggle y estilos en `todo-list-item.tsx` hasta que T037 pase
- [x] T039 [US4] **RED** Ampliar `todo-store.test.ts`: persistencia de `status` tras `toggleStatus`
- [x] T040 [US4] **GREEN** Conectar `onToggleStatus` en `todo-list.tsx` y `todos-page.tsx`; verificar store si hace falta ajuste

**Checkpoint**: US2 escenario 4 (editar completada) verificable; quickstart P4

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Robustez, a11y, validación manual

- [x] T041 [P] **GREEN** Manejar error `localStorage` en `todo-store.ts`: mensaje visible al usuario; no cerrar modal de formulario; conservar valores del formulario para reintentar (ampliar `todo-store.test.ts` si aplica)
- [x] T042 [P] **GREEN** Atributos ARIA en `task-form-modal.tsx` y `delete-confirm-modal.tsx`
- [x] T043 **GREEN** Truncar descripción larga en listado (elipsis) con atributo `title` = texto completo en `todo-list-item.tsx` (sin pérdida de datos al guardar)
- [x] T044 Ejecutar checklist manual `specs/001-todo-app/quickstart.md`
- [x] T045 Ejecutar `npm run lint` y `npm run build`

---

## Phase 8: Test Gate (ADR-005)

**Purpose**: Cierre de calidad antes de merge

- [x] T046 Configurar umbral cobertura de ramas (≥80 %) en `vitest.config.ts` para `src/features/todos/lib/**` y `src/features/todos/store/**` (y componentes con lógica si el repo lo permite)
- [x] T047 Verificar `npm run test:run` en verde y cobertura cumple ADR-005; documentar excepciones en PR si algún archivo queda fuera

**Checkpoint**: Feature lista para merge desde perspectiva de pruebas

---

## Dependencies & Execution Order

### Phase Dependencies

| Phase          | Depende de     | Bloquea    |
| -------------- | -------------- | ---------- |
| 1 Setup        | —              | 2          |
| 2 Foundational | 1              | 3–6        |
| 3 US1          | 2 (RED→GREEN)  | MVP        |
| 4 US2          | 3 listado base | —          |
| 5 US3          | 3 ítems base   | —          |
| 6 US4          | 3 ítems base   | US2 esc. 4 |
| 7 Polish       | 3–6            | 8          |
| 8 Test Gate    | 7              | Merge      |

### Regla TDD por módulo

No iniciar **GREEN** de un archivo hasta que su **RED** correspondiente exista y haya fallado al menos una vez.

| Módulo            | RED  | GREEN   |
| ----------------- | ---- | ------- |
| validation        | T007 | T008    |
| sort              | T009 | T010    |
| todo-store        | T012 | T013    |
| task-form create  | T017 | T018    |
| todo-list-item    | T019 | T020    |
| todo-list         | T021 | T022    |
| task-form edit    | T027 | T028    |
| delete-modal      | T032 | T033    |
| toggle completada | T037 | T038–40 |

### User Story Dependencies

| Story | Independiente tras | Tests clave |
| ----- | ------------------ | ----------- |
| US1   | T026               | T017–T022   |
| US2   | T031               | T027–T028   |
| US3   | T036               | T032–T033   |
| US4   | T040               | T037, T039  |

US2/US3/US4 en paralelo **después** del checkpoint US1 (T026), respetando RED antes de GREEN por módulo.

### Parallel Opportunities (TDD)

**Fase 2** (tras T005–T006):

```text
Paralelo: T007→T008 | T009→T010 | T014 | T015
Secuencial: T012→T013 (store) tras T002 local-storage
```

**Fase 3 US1** (tras T013):

```text
Paralelo: (T017→T018) | (T019→T020) | (T021→T022)
Secuencial: T023→T024→T025→T026
```

---

## Implementation Strategy

### MVP First (US1 + tests)

1. Fase 1 + Fase 2 completa (todos los RED→GREEN)
2. Fase 3 hasta T026
3. `npm run test:run`
4. quickstart P1

### Incremental Delivery

| Incremento | Tareas    | Incluye tests     |
| ---------- | --------- | ----------------- |
| MVP        | T001–T026 | T007–T022 + store |
| +Edit      | T027–T031 | T027–T028         |
| +Delete    | T032–T036 | T032–T033         |
| +Complete  | T037–T040 | T037, T039        |
| Polish     | T041–T045 | —                 |
| Gate       | T046–T047 | Cobertura ADR-005 |

### Suggested MVP Scope

**T001–T026** (47 tareas totales; MVP = 26 tareas con TDD en dominio, store y US1)

---

## Task Summary

| Phase        | Task IDs      | Count  | Tareas RED |
| ------------ | ------------- | ------ | ---------- |
| Setup        | T001–T004     | 4      | 0          |
| Foundational | T005–T016     | 12     | 3          |
| US1 (P1)     | T017–T026     | 10     | 3          |
| US2 (P2)     | T027–T031     | 5      | 1          |
| US3 (P3)     | T032–T036     | 5      | 1          |
| US4 (P4)     | T037–T040     | 4      | 2          |
| Polish       | T041–T045     | 5      | 0          |
| Test Gate    | T046–T047     | 2      | 0          |
| **Total**    | **T001–T047** | **47** | **10 RED** |

### Tasks per User Story (incl. TDD)

| User Story | RED | GREEN / integración |
| ---------- | --- | ------------------- |
| US1        | 3   | 7                   |
| US2        | 1   | 4                   |
| US3        | 1   | 4                   |
| US4        | 2   | 2                   |

### Format Validation

- [x] Todas las tareas usan `- [ ]`
- [x] IDs secuenciales T001–T047
- [x] Etiquetas [USn] en fases de user story
- [x] Marcador [P] donde aplica
- [x] Rutas de archivo en cada descripción
- [x] Pares RED→GREEN explícitos para TDD

---

## Notes

- El contrato UI (`contracts/ui-contracts.md`) describe el estado final con columna «Fase»; editar/eliminar/toggle se entregan en US2–US4.
- Desempate misma prioridad: `createdAt` ascendente, luego `id` (spec, data-model, T009–T010).
- `TaskFormModal`: create en US1 (T017–T018); edit en US2 (T027–T028).
- US2 escenario 4 (editar tarea completada) se valida tras US4 (T040).
- Tras cada par RED→GREEN, ejecutar `npm run test:run` antes de seguir.
- Commit sugerido tras cada checkpoint o par RED→GREEN cerrado.
