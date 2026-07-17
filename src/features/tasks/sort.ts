import type { Priority, Task } from "./types";
import { PRIORITY_ORDER } from "./types";

const priorityRank = new Map<Priority, number>(
  PRIORITY_ORDER.map((priority, index) => [priority, index]),
);

/**
 * Returns a new array sorted by priority (high → medium → low), then by
 * `createdAt` ascending for a stable order within the same priority.
 *
 * @param tasks - Tasks to sort (not mutated)
 */
export function sortTasksByPriority(tasks: readonly Task[]): Task[] {
  return tasks.toSorted((a, b) => {
    const rankA = priorityRank.get(a.priority) ?? Number.MAX_SAFE_INTEGER;
    const rankB = priorityRank.get(b.priority) ?? Number.MAX_SAFE_INTEGER;
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    return a.createdAt - b.createdAt;
  });
}
