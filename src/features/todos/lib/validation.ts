import type {
  CreateTodoInput,
  TodoPriority,
  UpdateTodoInput,
  ValidationResult,
} from "./types";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const PRIORITIES: TodoPriority[] = ["alta", "media", "baja"];

function isValidCalendarDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function validateFields(
  description: string,
  dueDate: string,
  priority: TodoPriority,
): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (description.trim().length < 1) {
    errors.description = "La descripción es obligatoria";
  }

  if (!dueDate.trim()) {
    errors.dueDate = "La fecha de vencimiento es obligatoria";
  } else if (!isValidCalendarDate(dueDate)) {
    errors.dueDate = "La fecha no es válida";
  }

  if (!PRIORITIES.includes(priority)) {
    errors.priority = "La prioridad debe ser alta, media o baja";
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateCreateInput(input: CreateTodoInput): ValidationResult {
  return validateFields(input.description, input.dueDate, input.priority);
}

export function validateUpdateInput(input: UpdateTodoInput): ValidationResult {
  return validateFields(input.description, input.dueDate, input.priority);
}
