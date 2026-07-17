"use client";

import type { Task } from "../types";
import { TaskItem } from "./task-item";

export interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

/**
 * Ordered task list with empty state when there are no tasks.
 */
export function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p
        data-testid="empty-tasks"
        className="rounded-lg border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-600 dark:text-zinc-400"
      >
        No hay tareas. Crea la primera para empezar.
      </p>
    );
  }

  return (
    <ul data-testid="task-list" className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
