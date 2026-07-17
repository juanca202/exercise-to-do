import type { Priority, TaskInput } from "./types";
import { PRIORITY_ORDER } from "./types";

/**
 * Field-level validation errors for a task form.
 */
export interface TaskValidationErrors {
  description?: string;
  dueDate?: string;
  priority?: string;
}

/**
 * Returns whether {@link value} is a valid {@link Priority}.
 */
export function isPriority(value: unknown): value is Priority {
  return (
    typeof value === "string" &&
    (PRIORITY_ORDER as readonly string[]).includes(value)
  );
}

/**
 * Validates create/edit form input. Empty description after trim and missing
 * due date are rejected; priority must be one of the allowed values.
 *
 * @param input - Raw form values
 * @returns Field errors; empty object when valid
 */
export function validateTaskInput(input: {
  description: string;
  dueDate: string;
  priority: string;
}): TaskValidationErrors {
  const errors: TaskValidationErrors = {};

  if (!input.description.trim()) {
    errors.description = "La descripción es obligatoria";
  }

  if (!input.dueDate.trim()) {
    errors.dueDate = "La fecha de vencimiento es obligatoria";
  }

  if (!isPriority(input.priority)) {
    errors.priority = "La prioridad debe ser alta, media o baja";
  }

  return errors;
}

/**
 * Returns whether validation produced no field errors.
 */
export function isValidTaskInput(errors: TaskValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}

/**
 * Builds a normalized {@link TaskInput} from raw values after validation passed.
 */
export function toTaskInput(input: {
  description: string;
  dueDate: string;
  priority: Priority;
}): TaskInput {
  return {
    description: input.description.trim(),
    dueDate: input.dueDate.trim(),
    priority: input.priority,
  };
}
