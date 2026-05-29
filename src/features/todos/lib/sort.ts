import type { Todo, TodoPriority } from "./types";

const PRIORITY_RANK: Record<TodoPriority, number> = {
  alta: 0,
  media: 1,
  baja: 2,
};

export function sortTodosByPriority(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    const rankDiff = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
    if (rankDiff !== 0) {
      return rankDiff;
    }

    const createdDiff =
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (createdDiff !== 0) {
      return createdDiff;
    }

    return a.id.localeCompare(b.id);
  });
}
