import type { Priority, Task } from "../types/task";

const PRIORITY_WEIGHT: Record<Priority, number> = {
  alta: 0,
  media: 1,
  baja: 2,
};

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const priorityDiff =
      PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return a.createdAt.localeCompare(b.createdAt);
  });
}
