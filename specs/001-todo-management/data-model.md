# Data Model: Gestión de Tareas (To-Do)

**Feature**: `001-todo-management` | **Date**: 2026-06-04

## Entity: Task (Tarea)

Representa una acción pendiente o completada del usuario.

| Field         | Type               | Required | Description                                               |
| ------------- | ------------------ | -------- | --------------------------------------------------------- |
| `id`          | `string` (UUID v4) | Yes      | Identificador único estable                               |
| `description` | `string`           | Yes      | Texto de la tarea; no vacío tras `trim()`                 |
| `dueDate`     | `string \| null`   | No       | Fecha ISO 8601 (`YYYY-MM-DD`) o `null` si sin vencimiento |
| `priority`    | `Priority`         | Yes      | `alta` \| `media` \| `baja`                               |
| `status`      | `TaskStatus`       | Yes      | `pendiente` \| `completada`                               |
| `createdAt`   | `string`           | Yes      | ISO 8601 datetime de creación (desempate de orden)        |
| `updatedAt`   | `string`           | Yes      | ISO 8601 datetime de última modificación                  |

### Enums

```typescript
type Priority = "alta" | "media" | "baja";
type TaskStatus = "pendiente" | "completada";
```

### Defaults (create)

| Field                     | Default                    |
| ------------------------- | -------------------------- |
| `id`                      | `crypto.randomUUID()`      |
| `status`                  | `pendiente`                |
| `priority`                | `media`                    |
| `dueDate`                 | `null`                     |
| `createdAt` / `updatedAt` | `new Date().toISOString()` |

## Validation Rules

| Rule ID | Field         | Rule                                   | Error message (ES)            |
| ------- | ------------- | -------------------------------------- | ----------------------------- |
| VR-001  | `description` | `description.trim().length > 0`        | La descripción es obligatoria |
| VR-002  | `priority`    | Must be one of `alta`, `media`, `baja` | Prioridad no válida           |
| VR-003  | `dueDate`     | If set, valid `YYYY-MM-DD` date        | Fecha no válida               |
| VR-004  | `status`      | Must be `pendiente` or `completada`    | Estado no válido              |

## State Transitions

```text
pendiente ──toggle complete──► completada
completada ──toggle complete──► pendiente
```

- Editar campos (`description`, `dueDate`, `priority`) permitido en ambos estados.
- Eliminar permitido en cualquier estado (con confirmación UI).

## Sort Order (list display)

1. **Primary**: `priority` weight — `alta` (0) → `media` (1) → `baja` (2)
2. **Secondary**: `createdAt` ascending (older first within same priority)

## Persistence Schema

**Storage key**: `todos:v1`

```json
{
  "version": 1,
  "tasks": [
    /* Task[] */
  ]
}
```

### Migration

- **v0 → v1**: Si no existe clave o JSON inválido, inicializar `{ version: 1, tasks: [] }`.
- Futuras versiones: incrementar `version` y migrar en `storage.ts`.

## Derived UI States (not persisted)

| State             | Condition                                          |
| ----------------- | -------------------------------------------------- |
| Empty list        | `tasks.length === 0`                               |
| Overdue indicator | `dueDate !== null && dueDate < today (local date)` |
| No due date label | `dueDate === null` → mostrar "Sin fecha"           |

## Relationships

- Sin entidades relacionadas en v1 (single-user, flat list).
- No foreign keys; `id` único dentro del array `tasks`.

## Mapping to Functional Requirements

| FR             | Data model support                 |
| -------------- | ---------------------------------- |
| FR-002         | VR-001                             |
| FR-003         | `dueDate` nullable                 |
| FR-004, FR-017 | `Priority` enum + UI badge mapping |
| FR-010         | Sort order rules                   |
| FR-011         | Persistence schema `todos:v1`      |
| FR-008, FR-009 | `TaskStatus` + transitions         |
