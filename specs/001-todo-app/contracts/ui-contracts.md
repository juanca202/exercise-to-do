# UI Contracts: Aplicación de To-Dos

**Feature**: `001-todo-app` | **Date**: 2026-05-29

Contratos de interfaz entre la página principal, modales y el store. No hay API HTTP; la frontera externa es la UI del usuario.

## Entrega incremental (alineado con tasks.md)

El contrato siguiente describe el **estado final** de la UI. La implementación se entrega por fases:

| Capacidad en TodosPage / ítem   | User story | Componentes principales                           |
| ------------------------------- | ---------- | ------------------------------------------------- |
| Listado + empty + crear (modal) | US1        | `TodosPage`, `TodoList`, `TaskFormModal` (create) |
| Editar (modal)                  | US2        | `TaskFormModal` (edit), botón Editar en ítem      |
| Eliminar (modal confirmación)   | US3        | `DeleteConfirmModal`, botón Eliminar              |
| Toggle completada               | US4        | Checkbox/toggle en `TodoListItem`                 |

Hasta completar la user story indicada, los eventos de fases posteriores no son obligatorios en la UI.

---

## 1. TodosPage (vista principal)

**Location**: `src/features/todos/components/todos-page.tsx`  
**Type**: Client Component

### Responsibilities

- Renderizar listado ordenado de tareas o estado vacío (FR-012) — **US1**.
- Exponer acción "Nueva tarea" que abre `TaskFormModal` en modo `create` — **US1**.
- Delegar acciones por ítem según fase:
  - editar — **US2**
  - eliminar — **US3**
  - toggle completada — **US4**

### Props

```typescript
// Sin props externas; consume useTodoStore internamente
```

### Events (user → system)

| Action                     | Effect                                        | Fase |
| -------------------------- | --------------------------------------------- | ---- |
| Click "Nueva tarea"        | Open `TaskFormModal` (`mode: create`)         | US1  |
| Click editar en ítem       | Open `TaskFormModal` (`mode: edit`, `todoId`) | US2  |
| Click eliminar en ítem     | Open `DeleteConfirmModal` (`todoId`)          | US3  |
| Toggle checkbox completada | `store.toggleStatus(id)`                      | US4  |

---

## 2. TaskFormModal

**Location**: `src/features/todos/components/task-form-modal.tsx`  
**Primitive**: Base UI `Dialog`

### Props

```typescript
interface TaskFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  todoId?: string; // required when mode === 'edit'
  onOpenChange: (open: boolean) => void;
}
```

### Form fields

| Field       | Control            | Validation                 |
| ----------- | ------------------ | -------------------------- |
| description | textarea or input  | required, trim, min 1 char |
| dueDate     | date input         | required, YYYY-MM-DD       |
| priority    | select (3 options) | alta \| media \| baja      |

### Actions

| Button   | Behavior                                                               |
| -------- | ---------------------------------------------------------------------- |
| Guardar  | Validate → `store.createTodo` or `store.updateTodo` → close on success |
| Cancelar | Close without persisting (FR-015)                                      |

### Accessibility

- Focus trap while open.
- `aria-labelledby` / `aria-describedby` on dialog.
- Escape closes modal (same as cancel).

---

## 3. DeleteConfirmModal

**Location**: `src/features/todos/components/delete-confirm-modal.tsx`  
**Primitive**: Base UI `Dialog`

### Props

```typescript
interface DeleteConfirmModalProps {
  open: boolean;
  todoId: string | null;
  onOpenChange: (open: boolean) => void;
}
```

### Content

- Mensaje de confirmación incluyendo descripción truncada de la tarea (opcional).
- Botones: **Eliminar** (destructive), **Cancelar**.

### Actions

| Button   | Behavior                           |
| -------- | ---------------------------------- |
| Eliminar | `store.deleteTodo(todoId)` → close |
| Cancelar | Close, no delete (FR-006)          |

---

## 4. TodoListItem

**Location**: `src/features/todos/components/todo-list-item.tsx`

### Props

```typescript
interface TodoListItemProps {
  todo: Todo;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}
```

### Visual contract

| Element         | Rule                                                                                   |
| --------------- | -------------------------------------------------------------------------------------- |
| Priority badge  | Color per priority (FR-014): alta=rojo, media=ámbar, baja=verde                        |
| Completed state | Reduced opacity + line-through on description (FR-008); priority color remains visible |
| dueDate         | Formatted locale `es` (e.g. `29/05/2026`)                                              |
| Actions         | Edit, Delete buttons accessible by keyboard                                            |

---

## 5. TodoStore (Zustand)

**Location**: `src/features/todos/store/todo-store.ts`

### State

```typescript
interface TodoStoreState {
  todos: Todo[];
  isHydrated: boolean;
}
```

### Actions

```typescript
interface TodoStoreActions {
  hydrate: () => void;
  createTodo: (input: CreateTodoInput) => ValidationResult;
  updateTodo: (input: UpdateTodoInput) => ValidationResult;
  deleteTodo: (id: string) => void;
  toggleStatus: (id: string) => void;
  getSortedTodos: () => Todo[];
}
```

### Side effects

- After every mutation: persist to `localStorage` key `todos:v1`.
- On `hydrate`: load from storage, set `isHydrated: true`.

### Selectors (recommended)

```typescript
useSortedTodos(): Todo[]  // memoized sorted view
```

---

## 6. Empty state

**Component**: inline in TodosPage or `TodoEmptyState`

| Condition                        | UI                                                       |
| -------------------------------- | -------------------------------------------------------- |
| `todos.length === 0` && hydrated | Message + CTA "Crear primera tarea" opening create modal |

---

## 7. Priority color tokens (CSS/Tailwind)

Contract for consistent styling across list and modal preview:

```typescript
const PRIORITY_STYLES: Record<TodoPriority, { badge: string; border: string }> = {
  alta:  { badge: 'bg-red-100 text-red-700 border-red-300', ... },
  media: { badge: 'bg-amber-100 text-amber-800 border-amber-300', ... },
  baja:  { badge: 'bg-green-100 text-green-700 border-green-300', ... },
};
```

Exact class names may align with `DESIGN.md` during implementation; semantic mapping MUST NOT change.
