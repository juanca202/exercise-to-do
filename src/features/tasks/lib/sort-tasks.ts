import type { Priority, Task } from "../types";

const PRIORITY_ORDER: Record<Priority, number> = {
  alta: 0,
  media: 1,
  baja: 2,
};

/**
 * Ordena tareas: pendientes antes que completadas, luego por prioridad
 * (alta → media → baja), y por orden de creación (FIFO) ante empates.
 */
export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (a.priority !== b.priority) {
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    }
    return a.createdAt - b.createdAt;
  });
}
