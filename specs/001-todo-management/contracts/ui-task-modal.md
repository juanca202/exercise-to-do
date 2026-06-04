# UI Contract: Task Form Modal

**Feature**: `001-todo-management` | **Component**: `TaskFormModal`  
**Covers**: FR-001, FR-002, FR-003, FR-006, FR-015, FR-016, FR-012

## Purpose

Ventana modal superpuesta para crear o editar una tarea. El listado permanece visible en segundo plano (atenuado).

## Modes

| Mode     | Title (ES)   | Primary action | Initial values                       |
| -------- | ------------ | -------------- | ------------------------------------ |
| `create` | Nueva tarea  | Guardar        | Empty form; priority default `media` |
| `edit`   | Editar tarea | Guardar        | Populated from selected `Task`       |

## Fields

| Field                | Control                | Required | Validation                     |
| -------------------- | ---------------------- | -------- | ------------------------------ |
| Descripción          | Text input (multiline) | Yes      | Non-empty after trim (VR-001)  |
| Prioridad            | Select (3 options)     | Yes      | `alta` \| `media` \| `baja`    |
| Fecha de vencimiento | Date input             | No       | Valid date or cleared → `null` |

## Actions

| Action                        | Label (ES) | Behavior                                                     |
| ----------------------------- | ---------- | ------------------------------------------------------------ |
| Save                          | Guardar    | Validate → call store create/update → close modal on success |
| Cancel                        | Cancelar   | Close without persisting                                     |
| Close (X / Escape / backdrop) | —          | Same as Cancel                                               |

## Events (store integration)

```typescript
// Outbound from modal
onSaveCreate(payload: { description: string; priority: Priority; dueDate: string | null }): void
onSaveEdit(id: string, payload: { description: string; priority: Priority; dueDate: string | null }): void
onCancel(): void
```

## Accessibility

- Focus trap inside modal while open
- Return focus to trigger element on close
- `aria-labelledby` pointing to modal title
- Validation errors linked via `aria-describedby`

## Visual (DESIGN.md)

- Dialog: border-radius `16px`, shadow Large (level 3)
- Backdrop: Deep Teal `#1B5255` at ~50% opacity
- Primary button: Action Teal `#008392`
- Priority select shows badge preview when option selected (optional enhancement)

## Acceptance mapping

| Spec scenario | Contract behavior                             |
| ------------- | --------------------------------------------- |
| US1 #1        | create mode → save → close → list updated     |
| US1 #2        | save blocked, error visible, modal stays open |
| US1 #3        | dueDate omitted → saved as null               |
| US1 #4        | cancel/close → no task created                |
| US2 #1–4      | edit mode equivalents                         |
