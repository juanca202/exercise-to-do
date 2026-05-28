import {
  TODO_PRIORITIES,
  TODO_STATUSES,
  type CreateTodoInput,
  type Todo,
  type TodoPriority,
  type TodoStatus,
  type UpdateTodoInput,
} from "./types";

export type ValidationResult =
  | { valid: true }
  | { valid: false; message: string };

export function validateDescription(description: string): ValidationResult {
  if (description.trim().length === 0) {
    return { valid: false, message: "La descripción es obligatoria." };
  }

  return { valid: true };
}

export function isTodoPriority(value: string): value is TodoPriority {
  return (TODO_PRIORITIES as readonly string[]).includes(value);
}

export function isTodoStatus(value: string): value is TodoStatus {
  return (TODO_STATUSES as readonly string[]).includes(value);
}

export function validatePriority(priority: string): ValidationResult {
  if (!isTodoPriority(priority)) {
    return { valid: false, message: "La prioridad no es válida." };
  }

  return { valid: true };
}

export function validateStatus(status: string): ValidationResult {
  if (!isTodoStatus(status)) {
    return { valid: false, message: "El estado no es válido." };
  }

  return { valid: true };
}

export function validateDueAt(dueAt: string | null | undefined): ValidationResult {
  if (dueAt == null) {
    return { valid: true };
  }

  const parsed = Date.parse(dueAt);
  if (Number.isNaN(parsed)) {
    return { valid: false, message: "La fecha límite no es válida." };
  }

  return { valid: true };
}

export function validateCreateTodoInput(input: CreateTodoInput): ValidationResult {
  const descriptionResult = validateDescription(input.description);
  if (!descriptionResult.valid) {
    return descriptionResult;
  }

  if (input.priority !== undefined) {
    const priorityResult = validatePriority(input.priority);
    if (!priorityResult.valid) {
      return priorityResult;
    }
  }

  if (input.status !== undefined) {
    const statusResult = validateStatus(input.status);
    if (!statusResult.valid) {
      return statusResult;
    }
  }

  return validateDueAt(input.due_at);
}

export function validateUpdateTodoInput(input: UpdateTodoInput): ValidationResult {
  if (input.description !== undefined) {
    const descriptionResult = validateDescription(input.description);
    if (!descriptionResult.valid) {
      return descriptionResult;
    }
  }

  if (input.priority !== undefined) {
    const priorityResult = validatePriority(input.priority);
    if (!priorityResult.valid) {
      return priorityResult;
    }
  }

  if (input.status !== undefined) {
    const statusResult = validateStatus(input.status);
    if (!statusResult.valid) {
      return statusResult;
    }
  }

  if (input.due_at !== undefined) {
    return validateDueAt(input.due_at);
  }

  return { valid: true };
}

export function isValidTodo(value: unknown): value is Todo {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.description === "string" &&
    typeof candidate.status === "string" &&
    isTodoStatus(candidate.status) &&
    (candidate.due_at === null || typeof candidate.due_at === "string") &&
    typeof candidate.priority === "string" &&
    isTodoPriority(candidate.priority) &&
    typeof candidate.created_at === "string" &&
    validateDescription(candidate.description).valid &&
    validateDueAt(candidate.due_at as string | null).valid
  );
}
