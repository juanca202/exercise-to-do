import type { Priority } from "../types";

export interface TaskInput {
  description: string;
  dueDate: string;
  priority: Priority;
}

export interface TaskValidationErrors {
  description?: string;
  dueDate?: string;
  priority?: string;
}

const VALID_PRIORITIES: Priority[] = ["alta", "media", "baja"];

function toStartOfDay(date: Date): number {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  ).getTime();
}

/** Valida los campos obligatorios de una tarea: descripción, fecha de vencimiento y prioridad. */
export function validateTask(
  input: TaskInput,
  today: Date = new Date(),
): TaskValidationErrors {
  const errors: TaskValidationErrors = {};

  if (input.description.trim().length === 0) {
    errors.description = "La descripción es obligatoria.";
  }

  if (!input.dueDate) {
    errors.dueDate = "La fecha de vencimiento es obligatoria.";
  } else if (toStartOfDay(new Date(input.dueDate)) < toStartOfDay(today)) {
    errors.dueDate = "La fecha de vencimiento no puede ser anterior a hoy.";
  }

  if (!VALID_PRIORITIES.includes(input.priority)) {
    errors.priority = "La prioridad debe ser alta, media o baja.";
  }

  return errors;
}
