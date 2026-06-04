import type { TaskInput, ValidationResult } from "../types/task";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const PRIORITIES = new Set(["alta", "media", "baja"]);

export function validateTaskInput(input: TaskInput): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (input.description.trim().length === 0) {
    errors.description = "La descripción es obligatoria";
  }

  if (!PRIORITIES.has(input.priority)) {
    errors.priority = "Prioridad no válida";
  }

  if (input.dueDate !== null && !DATE_PATTERN.test(input.dueDate)) {
    errors.dueDate = "Fecha no válida";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
