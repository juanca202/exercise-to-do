import type { Task } from "../../stores/task-store";

/** Object Mother: construye un Task típico para pruebas, con overrides opcionales. */
export function aTask(overrides: Partial<Task> = {}): Task {
  return {
    id: "task-1",
    title: "Comprar café",
    completed: false,
    ...overrides,
  };
}
