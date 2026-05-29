import type { CreateTodoInput, Todo, TodoPriority } from "../lib/types";

let idCounter = 0;

export function resetTodoIdCounter(): void {
  idCounter = 0;
}

export function aTodo(overrides: Partial<Todo> = {}): Todo {
  idCounter += 1;
  const id = overrides.id ?? `todo-${idCounter}`;

  return {
    id,
    description: "Tarea de ejemplo",
    dueDate: "2026-12-31",
    priority: "media",
    status: "pendiente",
    createdAt: "2026-05-29T10:00:00.000Z",
    ...overrides,
  };
}

export function aTodoInput(
  overrides: Partial<CreateTodoInput> = {},
): CreateTodoInput {
  return {
    description: "Nueva tarea",
    dueDate: "2026-12-31",
    priority: "media",
    ...overrides,
  };
}

export function buildTodo(
  overrides: Partial<Todo> = {},
  base?: Partial<Todo>,
): Todo {
  return aTodo({ ...base, ...overrides });
}

export function todosWithPriorities(): Todo[] {
  return [
    aTodo({ id: "1", priority: "baja", createdAt: "2026-05-29T12:00:00.000Z" }),
    aTodo({ id: "2", priority: "alta", createdAt: "2026-05-29T11:00:00.000Z" }),
    aTodo({
      id: "3",
      priority: "media",
      createdAt: "2026-05-29T10:00:00.000Z",
    }),
  ];
}

export function fixedPriority(priority: TodoPriority): TodoPriority {
  return priority;
}
