import type { CreateTodoInput, Todo } from "./types";
import { validateCreateTodoInput } from "./validation";

export function createTodo(input: CreateTodoInput): Todo {
  const validation = validateCreateTodoInput(input);
  if (!validation.valid) {
    throw new Error(validation.message);
  }

  return {
    id: crypto.randomUUID(),
    description: input.description.trim(),
    status: input.status ?? "pending",
    due_at: input.due_at ?? null,
    priority: input.priority ?? "medium",
    created_at: new Date().toISOString(),
  };
}

export function updateTodo(todo: Todo, changes: Partial<CreateTodoInput>): Todo {
  const next: Todo = {
    ...todo,
    description:
      changes.description !== undefined
        ? changes.description.trim()
        : todo.description,
    priority: changes.priority ?? todo.priority,
    status: changes.status ?? todo.status,
    due_at: changes.due_at !== undefined ? changes.due_at : todo.due_at,
  };

  const validation = validateCreateTodoInput({
    description: next.description,
    priority: next.priority,
    status: next.status,
    due_at: next.due_at,
  });

  if (!validation.valid) {
    throw new Error(validation.message);
  }

  return next;
}
