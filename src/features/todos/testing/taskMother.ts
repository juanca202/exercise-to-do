import type { Task, TaskInput } from "../types/task";

let sequence = 0;

export function buildTask(overrides: Partial<Task> = {}): Task {
  sequence += 1;
  const now = new Date("2026-06-04T12:00:00.000Z").toISOString();

  return {
    id: `task-${sequence}`,
    description: `Tarea de prueba ${sequence}`,
    dueDate: null,
    priority: "media",
    status: "pendiente",
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

export function buildTaskInput(overrides: Partial<TaskInput> = {}): TaskInput {
  return {
    description: "Descripción de prueba",
    dueDate: null,
    priority: "media",
    ...overrides,
  };
}

export function resetTaskMotherSequence(): void {
  sequence = 0;
}
