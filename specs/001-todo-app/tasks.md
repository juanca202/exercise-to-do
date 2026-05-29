# Tasks: Aplicación de To-Dos

**Input**: Design documents from `/specs/001-todo-app/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contracts.md, quickstart.md

**Tests**: No se incluyen tareas de test dedicadas (no solicitado en spec). ADR-005 recomienda tests co-located; pueden añadirse en polish o en implementación según criterio del equipo.

**Organization**: Tareas agrupadas por user story para implementación y validación independiente.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Ejecutable en paralelo (archivos distintos, sin dependencias entre sí)
- **[Story]**: User story (US1–US4)

## Path Conventions

- Raíz de código: `src/` (alias `@/*`)
- Feature: `src/features/todos/`
- App Router: `src/app/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Estructura de carpetas y utilidades transversales mínimas

- [ ] T001 Crear estructura de directorios de la feature en `src/features/todos/` (`components/`, `store/`, `lib/`, `testing/`) según plan.md
- [ ] T002 [P] Implementar helper genérico de almacenamiento JSON en `src/lib/storage/local-storage.ts` (get/set/remove con manejo de errores)
- [ ] T003 [P] Crear constante de clave `TODOS_STORAGE_KEY = 'todos:v1'` en `src/features/todos/lib/constants.ts`
- [ ] T004 [P] Crear directorio `src/components/ui/` para wrappers Base UI reutilizables (Dialog, Button, Badge) si no existen

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Tipos, dominio, store y primitivas UI compartidas — **bloquea todas las user stories**

**⚠️ CRITICAL**: Ninguna user story puede completarse hasta cerrar esta fase

- [ ] T005 [P] Definir tipos `Todo`, `TodoPriority`, `TodoStatus`, `CreateTodoInput`, `UpdateTodoInput`, `ValidationResult` en `src/features/todos/lib/types.ts`
- [ ] T006 [P] Implementar reglas VR-001 a VR-006 en `src/features/todos/lib/validation.ts` (`validateCreateInput`, `validateUpdateInput`)
- [ ] T007 [P] Implementar `sortTodosByPriority` con desempate por `createdAt` en `src/features/todos/lib/sort.ts`
- [ ] T008 [P] Definir mapa semáforo de estilos de prioridad en `src/features/todos/lib/priority-styles.ts` (alta=rojo, media=ámbar, baja=verde)
- [ ] T009 [P] Crear Object Mothers `aTodo()`, `aTodoInput()`, `buildTodo()` en `src/features/todos/testing/todo-mothers.ts`
- [ ] T010 Implementar store Zustand en `src/features/todos/store/todo-store.ts`: estado `todos`, `isHydrated`, acciones `hydrate`, `createTodo`, `updateTodo`, `deleteTodo`, `toggleStatus`, selector `getSortedTodos`, persistencia tras cada mutación vía `localStorage`
- [ ] T011 [P] Implementar wrapper `Dialog` con Base UI en `src/components/ui/dialog.tsx` (focus trap, cierre Escape, props `open`/`onOpenChange`)
- [ ] T012 [P] Implementar wrappers `Button` y `Badge` en `src/components/ui/button.tsx` y `src/components/ui/badge.tsx` con Tailwind según DESIGN.md
- [ ] T013 Exportar API pública de la feature en `src/features/todos/index.ts` (componente página, tipos si aplica)

**Checkpoint**: Store con CRUD completo y persistencia listo; wrappers UI disponibles

---

## Phase 3: User Story 1 - Crear y listar tareas (Priority: P1) 🎯 MVP

**Goal**: Registrar tareas vía modal, listarlas ordenadas por prioridad con colores, estado vacío y persistencia entre sesiones

**Independent Test**: Crear tareas alta/media/baja → listado ordenado con badges de color → recargar → datos persisten → validación rechaza campos vacíos → cancelar modal no crea tarea

### Implementation for User Story 1

- [ ] T014 [P] [US1] Implementar `TodoListItem` en `src/features/todos/components/todo-list-item.tsx` (descripción, fecha `es`, badge prioridad con `priority-styles`, sin acciones editar/eliminar/completar aún)
- [ ] T015 [P] [US1] Implementar `TodoList` en `src/features/todos/components/todo-list.tsx` consumiendo `getSortedTodos()` del store
- [ ] T016 [P] [US1] Implementar `TaskFormModal` en `src/features/todos/components/task-form-modal.tsx` solo modo `create` (campos descripción, dueDate, priority; validación; Guardar/Cancelar; FR-013, FR-015)
- [ ] T017 [US1] Implementar `TodoEmptyState` en `src/features/todos/components/todo-empty-state.tsx` con CTA "Crear primera tarea" (FR-012)
- [ ] T018 [US1] Implementar `TodosPage` Client Component en `src/features/todos/components/todos-page.tsx` (hydrate al montar, listado/empty, botón "Nueva tarea", estado modal crear)
- [ ] T019 [US1] Conectar `src/app/page.tsx` importando y renderizando `TodosPage` desde `src/features/todos/index.ts`
- [ ] T020 [US1] Ajustar textos de UI en español y mensajes de error de validación en `src/features/todos/components/task-form-modal.tsx`

**Checkpoint**: MVP funcional — crear, listar, ordenar, colores prioridad, persistencia, validación, estado vacío

---

## Phase 4: User Story 2 - Editar tareas existentes (Priority: P2)

**Goal**: Editar descripción, fecha y prioridad de tareas existentes vía modal con mismas validaciones que creación

**Independent Test**: Crear tarea → editar campos → listado actualizado con nuevo color de prioridad → recargar → cambios persisten → cancelar modal sin cambios → editar tarea completada conserva estado

### Implementation for User Story 2

- [ ] T021 [US2] Extender `TaskFormModal` en `src/features/todos/components/task-form-modal.tsx` con modo `edit`: precarga datos por `todoId`, llama `updateTodo`, conserva `status` (FR-005, FR-015)
- [ ] T022 [US2] Añadir botón "Editar" y handler `onEdit` en `src/features/todos/components/todo-list-item.tsx`
- [ ] T023 [US2] Integrar flujo edición en `src/features/todos/components/todos-page.tsx` (estado modal edit + `todoId`)
- [ ] T024 [US2] Verificar reordenación del listado tras cambio de prioridad en `src/features/todos/components/todo-list.tsx`

**Checkpoint**: Edición completa sin afectar flujo de creación/listado de US1

---

## Phase 5: User Story 3 - Eliminar tareas (Priority: P3)

**Goal**: Eliminar tareas con modal de confirmación explícita

**Independent Test**: Eliminar con confirmación → desaparece del listado → recargar → no reaparece → cancelar confirmación → tarea intacta → eliminar última tarea muestra empty state

### Implementation for User Story 3

- [ ] T025 [P] [US3] Implementar `DeleteConfirmModal` en `src/features/todos/components/delete-confirm-modal.tsx` con Base UI Dialog (mensaje, Eliminar/Cancelar, FR-006)
- [ ] T026 [US3] Añadir botón "Eliminar" y handler `onDelete` en `src/features/todos/components/todo-list-item.tsx`
- [ ] T027 [US3] Integrar flujo eliminación en `src/features/todos/components/todos-page.tsx` (estado modal delete + `todoId`)
- [ ] T028 [US3] Asegurar transición a `TodoEmptyState` cuando `todos.length === 0` tras eliminar en `src/features/todos/components/todos-page.tsx`

**Checkpoint**: Eliminación con confirmación modal operativa e independiente de US2

---

## Phase 6: User Story 4 - Marcar tareas como completadas (Priority: P4)

**Goal**: Toggle pendiente/completada con distinción visual clara manteniendo color de prioridad

**Independent Test**: Marcar completada → estilo atenuado/tachado visible → desmarcar → vuelve a pendiente → mezcla completadas/pendientes distinguible → recargar → estado persistido

### Implementation for User Story 4

- [ ] T029 [US4] Añadir checkbox/toggle de estado y estilos completada (opacidad + `line-through`) en `src/features/todos/components/todo-list-item.tsx` preservando badge de prioridad (FR-007, FR-008)
- [ ] T030 [US4] Conectar `onToggleStatus` → `store.toggleStatus` en `src/features/todos/components/todo-list.tsx` y `todos-page.tsx`
- [ ] T031 [US4] Verificar persistencia de `status` en `src/features/todos/store/todo-store.ts` tras `toggleStatus`
- [ ] T032 [US4] Revisar contraste visual completada vs pendiente cumpliendo SC-004 en `src/features/todos/components/todo-list-item.tsx`

**Checkpoint**: Las cuatro user stories son funcionales de forma independiente

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Robustez, accesibilidad y validación manual según quickstart

- [ ] T033 [P] Manejar error de `localStorage` no disponible o quota exceeded con mensaje al usuario en `src/features/todos/store/todo-store.ts`
- [ ] T034 [P] Añadir atributos ARIA en modales (`aria-labelledby`, `aria-describedby`) en `src/features/todos/components/task-form-modal.tsx` y `delete-confirm-modal.tsx`
- [ ] T035 Truncar descripción larga en listado con título accesible del texto completo en `src/features/todos/components/todo-list-item.tsx`
- [ ] T036 Ejecutar checklist manual de `specs/001-todo-app/quickstart.md` y corregir hallazgos
- [ ] T037 Ejecutar `npm run lint` y `npm run build` corrigiendo errores en archivos de la feature

---

## Dependencies & Execution Order

### Phase Dependencies

| Phase          | Depende de               | Bloquea                  |
| -------------- | ------------------------ | ------------------------ |
| 1 Setup        | —                        | Fase 2                   |
| 2 Foundational | Fase 1                   | Fases 3–6 (user stories) |
| 3 US1 (P1)     | Fase 2                   | MVP demo                 |
| 4 US2 (P2)     | Fase 2, US1 listado base | —                        |
| 5 US3 (P3)     | Fase 2, US1 listado base | —                        |
| 6 US4 (P4)     | Fase 2, US1 listado base | —                        |
| 7 Polish       | US1–US4 deseadas         | —                        |

### User Story Dependencies

| Story    | Depende de                 | Independiente tras |
| -------- | -------------------------- | ------------------ |
| US1 (P1) | Foundational               | T020 — MVP         |
| US2 (P2) | Foundational + listado US1 | T024               |
| US3 (P3) | Foundational + ítems US1   | T028               |
| US4 (P4) | Foundational + ítems US1   | T032               |

US2, US3 y US4 pueden desarrollarse en paralelo **después** de US1 si el listado e ítems base existen.

### Within Each User Story

1. Componentes hoja (`TodoListItem`, modales) antes que contenedores (`TodosPage`)
2. Integración en `todos-page.tsx` antes de cablear `page.tsx` (solo US1)
3. Validar checkpoint con quickstart antes de pasar a la siguiente story

### Parallel Opportunities

**Fase 1**: T002, T003, T004 en paralelo tras T001

**Fase 2**: T005–T009 y T011–T012 en paralelo; T010 tras T005–T008

**Fase 3 (US1)**: T014, T015, T016, T017 en paralelo; luego T018 → T019 → T020

**Fases 4–6**: US2/US3/US4 en paralelo entre equipos una vez US1 alcanza checkpoint

---

## Parallel Example: User Story 1

```bash
# Tras T010 (store), lanzar en paralelo:
T014: todo-list-item.tsx
T015: todo-list.tsx
T016: task-form-modal.tsx (create)
T017: todo-empty-state.tsx

# Secuencial después:
T018: todos-page.tsx
T019: app/page.tsx
T020: textos ES
```

---

## Parallel Example: User Stories 2–4

```bash
# Con US1 en checkpoint, tres desarrolladores:
Dev A: T021–T024 (US2 edit)
Dev B: T025–T028 (US3 delete)
Dev C: T029–T032 (US4 complete)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Fase 1 + Fase 2
2. Completar Fase 3 (US1) hasta T020
3. **VALIDAR** con quickstart sección P1
4. Demo / entrega incremental

### Incremental Delivery

| Incremento | Tareas    | Valor entregado                               |
| ---------- | --------- | --------------------------------------------- |
| MVP        | T001–T020 | Crear, listar, ordenar, colores, persistencia |
| +Edit      | T021–T024 | Mantener lista actualizada                    |
| +Delete    | T025–T028 | Limpiar tareas obsoletas                      |
| +Complete  | T029–T032 | Seguimiento de progreso                       |
| Polish     | T033–T037 | Producción lista                              |

### Suggested MVP Scope

**T001–T020** (37 tareas totales; MVP = 20 tareas)

---

## Task Summary

| Phase        | Task IDs      | Count  |
| ------------ | ------------- | ------ |
| Setup        | T001–T004     | 4      |
| Foundational | T005–T013     | 9      |
| US1 (P1)     | T014–T020     | 7      |
| US2 (P2)     | T021–T024     | 4      |
| US3 (P3)     | T025–T028     | 4      |
| US4 (P4)     | T029–T032     | 4      |
| Polish       | T033–T037     | 5      |
| **Total**    | **T001–T037** | **37** |

### Tasks per User Story

| User Story | Implementation tasks |
| ---------- | -------------------- |
| US1        | 7 (T014–T020)        |
| US2        | 4 (T021–T024)        |
| US3        | 4 (T025–T028)        |
| US4        | 4 (T029–T032)        |

### Format Validation

- [x] Todas las tareas usan `- [ ]`
- [x] IDs secuenciales T001–T037
- [x] Etiquetas [USn] en fases de user story
- [x] Marcador [P] solo en tareas paralelizables
- [x] Cada descripción incluye ruta de archivo concreta

---

## Notes

- El store incluye CRUD completo en Fase 2; las user stories exponen capacidades en UI de forma incremental.
- `TaskFormModal` se entrega en modo `create` en US1; modo `edit` en US2.
- Botones de acción en `TodoListItem` se añaden por story (edit US2, delete US3, toggle US4).
- Commit sugerido tras cada checkpoint de fase.
