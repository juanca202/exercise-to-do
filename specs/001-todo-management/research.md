# Research: Gestión de Tareas (To-Do)

**Feature**: `001-todo-management` | **Date**: 2026-06-04

## R1 — Persistencia local sin backend

**Decision**: Usar `localStorage` con clave `todos:v1` y payload JSON `{ version: 1, tasks: Task[] }`.

**Rationale**: La spec exige persistencia local sin servidor. `localStorage` es síncrono, suficiente para cientos de tareas y ya referenciado en [ADR-003](../../docs/adr/ADR-003-zustand-state-management.md).

**Alternatives considered**:

- **IndexedDB**: Mayor capacidad pero innecesaria para el volumen esperado; más complejidad de tests.
- **sessionStorage**: No persiste entre sesiones; incumple FR-011.
- **Cookies**: Límite de tamaño y overhead HTTP irrelevante sin backend.

## R2 — Integración Zustand + localStorage

**Decision**: Store Zustand en `src/features/todos/store/todoStore.ts` con módulo `storage.ts` que serializa/deserializa en cada mutación (load on init, save after CRUD).

**Rationale**: ADR-003 fija Zustand como store estándar. Separar `storage.ts` facilita tests unitarios sin DOM y manejo de errores (QuotaExceededError → mensaje FR-012).

**Alternatives considered**:

- **zustand/middleware persist**: Válido; se descarta por preferir control explícito del esquema versionado y tests más directos sobre `storage.ts`.
- **useState + useEffect**: No escala para CRUD compartido entre modal y listado.

## R3 — Modal crear/editar

**Decision**: Un componente `TaskFormModal` basado en `@base-ui/react` Dialog (ADR-006), reutilizado en modos `create` y `edit`.

**Rationale**: La clarificación de spec exige modal superpuesta. Base UI Dialog aporta focus trap, Escape, backdrop y accesibilidad sin estilos propietarios.

**Alternatives considered**:

- **Panel inline / drawer**: Incumple clarificación de spec.
- **Dialog nativo `<dialog>`**: Menos control cross-browser; Base UI ya adoptado.

## R4 — Ordenamiento por prioridad

**Decision**: Función pura `sortTasks(tasks)` con peso numérico `{ alta: 0, media: 1, baja: 2 }` y desempate por `createdAt` ascendente (más antiguas primero dentro del mismo nivel).

**Rationale**: Cumple FR-010 de forma determinista y testeable. El desempate por `createdAt` materializa el supuesto de la spec.

**Alternatives considered**:

- **Ordenar solo en render**: Duplica lógica; peor testabilidad.
- **Desempate por descripción**: Menos predecible para el usuario.

## R5 — Colores de prioridad

**Decision**: Mapear prioridades a badges semánticos de `DESIGN.md` §4 (Badges & Tags):

| Prioridad | Token DESIGN.md | Fondo / Texto         |
| --------- | --------------- | --------------------- |
| alta      | Error Badge     | `#FFCDD2` / `#C62828` |
| media     | Warning Badge   | `#FFE0B2` / `#E65100` |
| baja      | Success Badge   | `#C8E6C9` / `#2E7D32` |

Siempre mostrar etiqueta textual junto al badge (FR-017, accesibilidad).

**Rationale**: Alinea rojo/ámbar/verde de la spec con tokens existentes del design system; evita colores ad hoc.

**Alternatives considered**:

- **Colores hex arbitrarios**: Rompe cohesión con DESIGN.md.
- **Solo color sin texto**: Incumple FR-017 y edge case de daltonismo.

## R6 — Distinción tareas completadas

**Decision**: Combinar checkbox (Base UI), texto tachado (`line-through`), opacidad reducida y etiqueta "Completada" — no depender solo del color (FR-009).

**Rationale**: Cumple FR-009 y SC-003 con múltiples señales visuales accesibles.

**Alternatives considered**:

- **Solo cambio de color de fondo**: Insuficiente según FR-009.

## R7 — Confirmación de eliminación

**Decision**: Segundo Dialog (`DeleteConfirmDialog`) con acciones Confirmar / Cancelar.

**Rationale**: Spec asume confirmación explícita; patrón consistente con modales de la feature.

**Alternatives considered**:

- **window.confirm**: Funcional pero inconsistente con UX modal del resto de la app y peor accesibilidad/estilo.

## R8 — Validación de descripción

**Decision**: `validateTask` rechaza descripción vacía o solo espacios (`trim().length === 0`); fecha opcional (`null`); prioridad requerida con default `media` al crear.

**Rationale**: FR-002, FR-003; default `media` evita bloqueo UX sin decisión en spec.

**Alternatives considered**:

- **Default alta/baja**: Sesgo UX innecesario; `media` es convención estándar.

## R9 — Boundary Server/Client (App Router)

**Decision**: `src/app/page.tsx` como Server Component delgado que renderiza `<TodoPage />` (Client Component en `features/todos`).

**Rationale**: ADR-001; toda interactividad (store, modales, localStorage) en Client Components.

**Alternatives considered**:

- **page.tsx como Client Component**: Funciona pero pierde posibilidad futura de metadata/server data en la misma página.
