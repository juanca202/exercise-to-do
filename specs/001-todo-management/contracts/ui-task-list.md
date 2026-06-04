# UI Contract: Task List & Item

**Feature**: `001-todo-management` | **Components**: `TaskList`, `TaskItem`, `TodoPage`  
**Covers**: FR-005, FR-007, FR-008, FR-009, FR-010, FR-013, FR-017

## Purpose

Vista principal que muestra todas las tareas ordenadas por prioridad con acciones inline y estado vacío.

## TaskList

### Input

```typescript
interface TaskListProps {
  tasks: Task[]; // pre-sorted by sortTasks()
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}
```

### Empty state (FR-013)

- Visible when `tasks.length === 0`
- Message (ES): "No tienes tareas. Crea una nueva para comenzar."
- CTA visible to open create modal

### Sort order (FR-010)

List receives tasks already sorted: `alta` → `media` → `baja`, then `createdAt` asc within group.

## TaskItem

### Displayed data per row

| Element          | Source             | Notes                                 |
| ---------------- | ------------------ | ------------------------------------- |
| Description      | `task.description` | Strikethrough when `completada`       |
| Priority badge   | `task.priority`    | Color + text label (FR-017)           |
| Due date         | `task.dueDate`     | Formatted date or "Sin fecha"         |
| Status indicator | `task.status`      | Checkbox + label "Completada" if done |
| Overdue hint     | derived            | Visual cue if due date < today        |

### Priority badge colors (FR-017)

| Priority | Label | Background | Text      |
| -------- | ----- | ---------- | --------- |
| alta     | Alta  | `#FFCDD2`  | `#C62828` |
| media    | Media | `#FFE0B2`  | `#E65100` |
| baja     | Baja  | `#C8E6C9`  | `#2E7D32` |

### Completed visual (FR-009)

Must combine **at least two** of:

- Checkbox checked state
- Text `line-through`
- Reduced opacity (~0.6)
- Label "Completada"

Must **not** rely on color alone.

### Actions per row

| Action          | Trigger                | Result                                     |
| --------------- | ---------------------- | ------------------------------------------ |
| Toggle complete | Checkbox click         | `onToggleComplete(id)`                     |
| Edit            | Button/icon "Editar"   | `onEdit(id)` → opens TaskFormModal edit    |
| Delete          | Button/icon "Eliminar" | `onDelete(id)` → opens DeleteConfirmDialog |

## DeleteConfirmDialog

| Action  | Label (ES) | Behavior                         |
| ------- | ---------- | -------------------------------- |
| Confirm | Eliminar   | Remove task from store + persist |
| Cancel  | Cancelar   | Close dialog, no change          |

## Page-level actions (TodoPage)

| Action   | Label (ES)  | Behavior                  |
| -------- | ----------- | ------------------------- |
| New task | Nueva tarea | Open TaskFormModal create |

## Acceptance mapping

| Spec scenario | Contract behavior                               |
| ------------- | ----------------------------------------------- |
| US1 #5–6      | List shows persisted tasks with priority badges |
| US3 #1–3      | Delete flow with confirmation                   |
| US4 #1–3      | Toggle complete visual + persist                |
| US5 #1–3      | Sort order + badge update on priority change    |
