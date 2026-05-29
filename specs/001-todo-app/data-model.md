# Data Model: Aplicación de To-Dos

**Feature**: `001-todo-app` | **Date**: 2026-05-29

## Entity: Todo (Tarea)

Representa una acción pendiente o completada gestionada por el usuario en una sola sesión de navegador.

### Fields

| Field         | Type           | Required | Description                                                                    |
| ------------- | -------------- | -------- | ------------------------------------------------------------------------------ |
| `id`          | `string`       | yes      | Identificador único (UUID v4 o equivalente). Generado al crear.                |
| `description` | `string`       | yes      | Texto de la tarea. Trimeado; mínimo 1 carácter visible.                        |
| `dueDate`     | `string`       | yes      | Fecha de vencimiento en formato ISO date `YYYY-MM-DD`.                         |
| `priority`    | `TodoPriority` | yes      | Nivel de urgencia.                                                             |
| `status`      | `TodoStatus`   | yes      | Estado de completitud. Default: `pendiente`.                                   |
| `createdAt`   | `string`       | yes      | ISO 8601 timestamp de creación. Inmutable. Usado para desempate en ordenación. |
| `updatedAt`   | `string`       | no       | ISO 8601 timestamp de última modificación. Opcional pero recomendado.          |

### Enumerations

```typescript
type TodoPriority = "alta" | "media" | "baja";
type TodoStatus = "pendiente" | "completada";
```

### Priority order (sorting)

| Value   | Sort rank | Color (UI) |
| ------- | --------- | ---------- |
| `alta`  | 0 (first) | rojo       |
| `media` | 1         | ámbar      |
| `baja`  | 2 (last)  | verde      |

### Validation rules

| Rule   | Constraint                                                     |
| ------ | -------------------------------------------------------------- |
| VR-001 | `description` after trim MUST have length ≥ 1                  |
| VR-002 | `dueDate` MUST match `YYYY-MM-DD` and be a valid calendar date |
| VR-003 | `priority` MUST be one of `alta`, `media`, `baja`              |
| VR-004 | `status` MUST be `pendiente` or `completada`                   |
| VR-005 | Past `dueDate` values ARE allowed                              |
| VR-006 | `id` MUST be unique within the collection                      |

### State transitions

```text
                    ┌─────────────┐
         create     │  pendiente  │◄──────────────┐
        ──────────► │             │               │
                    └──────┬──────┘               │
                           │ toggle complete       │ toggle incomplete
                           ▼                       │
                    ┌─────────────┐               │
                    │ completada  │───────────────┘
                    └─────────────┘

delete: allowed from pendiente or completada → removed from collection
edit:   allowed from pendiente or completada → fields updated, status unchanged unless toggled separately
```

### Input DTOs (form modal)

```typescript
/** Payload for create; id/status/createdAt assigned by store */
interface CreateTodoInput {
  description: string;
  dueDate: string;
  priority: TodoPriority;
}

/** Payload for update; id identifies target */
interface UpdateTodoInput {
  id: string;
  description: string;
  dueDate: string;
  priority: TodoPriority;
}
```

## Collection: TodoList

| Aspect            | Rule                                                             |
| ----------------- | ---------------------------------------------------------------- |
| Storage key       | `todos:v1` in `localStorage`                                     |
| Serialized shape  | `Todo[]` as JSON array                                           |
| Default           | `[]` when key missing or parse error                             |
| Ordering          | Not persisted; computed at read/render via `sortTodosByPriority` |
| Max expected size | ~500 items (assumption; no hard limit in v1)                     |

## Relationships

- No relations between entities in v1 (flat list, no categories/tags/subtasks).
- Single-user scope: one collection per browser origin.

## Identity generation

- **Decision**: `crypto.randomUUID()` in browser; fallback test injectable ID factory for Vitest.

## Error model (domain)

| Code               | Condition                      | User-facing                                   |
| ------------------ | ------------------------------ | --------------------------------------------- |
| `VALIDATION_ERROR` | Invalid input on save          | Field-level message in modal                  |
| `NOT_FOUND`        | Update/delete unknown id       | Silent no-op or toast (implementation choice) |
| `STORAGE_ERROR`    | localStorage quota/unavailable | Message: no se pudo guardar                   |
