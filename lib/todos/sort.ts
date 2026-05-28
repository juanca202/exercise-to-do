import type { Todo, TodoPriority } from "./types";

const PRIORITY_WEIGHT: Record<TodoPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function sortTodosByPriority(todos: Todo[]): Todo[] {
  return [...todos].sort((left, right) => {
    const priorityDiff =
      PRIORITY_WEIGHT[left.priority] - PRIORITY_WEIGHT[right.priority];

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return (
      Date.parse(left.created_at) - Date.parse(right.created_at)
    );
  });
}
