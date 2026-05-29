# Research: Aplicación de To-Dos

**Feature**: `001-todo-app` | **Date**: 2026-05-29

## 1. Stack y arquitectura

**Decision**: Next.js 16 (App Router) + React 19 + TypeScript, arquitectura por features bajo `src/features/todos/`.

**Rationale**: El repositorio ya incluye Next.js 16, React 19, TypeScript y alias `@/*` → `src/`. [ADR-004](../../docs/adr/ADR-004-feature-based-architecture.md) exige organización por dominio; [ADR-001](../../docs/adr/ADR-001-app-router-only.md) fija App Router como única estrategia de enrutamiento.

**Alternatives considered**:

- Páginas monolíticas en `src/app/` sin feature module — rechazado por baja cohesión y conflicto con ADR-004.
- Backend + API REST — rechazado; la spec exige persistencia local sin servidor.

---

## 2. Estado cliente y persistencia

**Decision**: Zustand store en `src/features/todos/store/` con sincronización a `localStorage` bajo la clave `todos:v1`.

**Rationale**: [ADR-003](../../docs/adr/ADR-003-zustand-state-management.md) define Zustand como store estándar; la spec (FR-009) exige persistencia entre sesiones. Un wrapper genérico en `src/lib/storage/` desacopla el store del API del navegador y facilita tests con mocks.

**Alternatives considered**:

- `useState` + Context — insuficiente para CRUD + persistencia + ordenación compartida.
- Redux Toolkit — mayor boilerplate sin beneficio en app de una sola feature.
- IndexedDB — sobreingeniería para volumen esperado (decenas/cientos de tareas).

**Patrón de persistencia**:

- Cargar desde `localStorage` al inicializar el store (client-side only).
- Guardar tras cada mutación (create, update, delete, toggle).
- Manejar JSON inválido o ausencia de clave → array vacío + log interno; no bloquear la UI.

---

## 3. Componentes UI y modales

**Decision**: Base UI `Dialog` para modales de crear, editar y confirmar eliminación; wrappers en `src/components/` o `src/features/todos/components/`.

**Rationale**: [ADR-006](../../docs/adr/ADR-006-base-ui-component-library.md) prioriza `@base-ui/react` (ya en `package.json`). La spec (FR-013, FR-006) exige modales con focus trap, cierre y acciones explícitas — Base UI Dialog cubre accesibilidad y teclado.

**Alternatives considered**:

- Modal HTML/CSS custom — mayor riesgo de a11y y mantenimiento.
- `<dialog>` nativo solo — viable pero Base UI ya es estándar del proyecto.

**Modales requeridas**:
| Modal | Trigger | Acciones |
| ----- | ------- | -------- |
| TaskFormModal | Botón "Nueva tarea" / editar ítem | Guardar, Cancelar |
| DeleteConfirmModal | Botón eliminar en ítem | Confirmar, Cancelar |

---

## 4. Estilos y colores de prioridad

**Decision**: Tailwind CSS v4 + tokens de `DESIGN.md`; colores de prioridad semáforo mapeados a utilidades Tailwind.

**Rationale**: [ADR-002](../../docs/adr/ADR-002-tailwind-ui-styling.md) y clarificaciones de spec (alta=rojo, media=ámbar, baja=verde). Los badges/indicadores de prioridad usan clases dedicadas en la feature, no hardcode disperso.

**Mapping propuesto**:

| Prioridad | Color semántico | Implementación sugerida                     |
| --------- | --------------- | ------------------------------------------- |
| alta      | rojo            | badge/ borde `red-600` / fondo `red-50`     |
| media     | ámbar           | badge/ borde `amber-500` / fondo `amber-50` |
| baja      | verde           | badge/ borde `green-600` / fondo `green-50` |

Tareas completadas: opacidad reducida + `line-through` en descripción, conservando el indicador de color de prioridad (spec edge case).

---

## 5. Ordenación

**Decision**: Función pura `sortTodosByPriority(todos)` en `src/features/todos/lib/sort.ts`; orden: prioridad (alta→media→baja), desempate por `createdAt` ascendente.

**Rationale**: FR-004 y edge case de empate en misma prioridad. Lógica pura facilita tests unitarios co-located ([ADR-005](../../docs/adr/ADR-005-unit-testing-strategy.md)).

**Alternatives considered**:

- Ordenar solo en render — duplicación si el store expone lista ya ordenada.
- Ordenar en persistencia — innecesario; orden es vista, no dato almacenado.

---

## 6. Validación

**Decision**: Validación en capa de dominio (`src/features/todos/lib/validation.ts`) invocada desde store y formulario modal.

**Reglas**:

- `description`: string trim, longitud ≥ 1.
- `dueDate`: string ISO date (`YYYY-MM-DD`) no vacío; fechas pasadas permitidas.
- `priority`: enum `'alta' | 'media' | 'baja'`.

**Rationale**: FR-010, FR-001, FR-002. Validación compartida evita divergencia entre UI y store.

---

## 7. Testing

**Decision**: Vitest + Testing Library; tests co-located; Object Mothers en `src/features/todos/testing/`; objetivo ≥ 80 % cobertura de ramas en lógica crítica.

**Rationale**: [ADR-005](../../docs/adr/ADR-005-unit-testing-strategy.md). Prioridad: validation, sort, store actions, modales (comportamiento), list item (toggle complete, priority badge).

**Mocks**: `localStorage` reset en `beforeEach`; fechas/IDs fijos en factories (`aTodo()`, `aTodoInput()`).

---

## 8. Límites RSC / Client Components

**Decision**: `src/app/page.tsx` permanece Server Component mínimo; feature root `TodosPage` (Client Component) importado desde `src/features/todos/`.

**Rationale**: Store Zustand, modales Base UI e interacción CRUD requieren cliente. App Router page actúa como shell de composición ([ADR-001](../../docs/adr/ADR-001-app-router-only.md)).

---

## Resumen de NEEDS CLARIFICATION resueltos

| Tema              | Resolución                             |
| ----------------- | -------------------------------------- |
| Stack             | Next.js 16 + React 19 + TS (existente) |
| Estado            | Zustand + localStorage `todos:v1`      |
| UI modales        | Base UI Dialog                         |
| Colores prioridad | Semáforo Tailwind (rojo/ámbar/verde)   |
| Estructura código | `src/features/todos/`                  |
| Tests             | Vitest co-located, Object Mothers      |
