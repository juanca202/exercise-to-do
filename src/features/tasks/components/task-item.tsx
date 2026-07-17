"use client";

import { Checkbox } from "@base-ui/react/checkbox";

import type { Task } from "../types";
import { PRIORITY_LABELS } from "../types";

export interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

/**
 * Renders a single task row with completion toggle, edit, and delete actions.
 */
export function TaskItem({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <li
      data-testid="task-item"
      data-priority={task.priority}
      data-completed={task.completed ? "true" : "false"}
      className={`flex flex-col gap-3 rounded-lg border border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-700 ${
        task.completed
          ? "bg-zinc-50 opacity-70 dark:bg-zinc-900/50"
          : "bg-white dark:bg-zinc-950"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <Checkbox.Root
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          aria-label={
            task.completed
              ? `Marcar "${task.description}" como pendiente`
              : `Marcar "${task.description}" como completada`
          }
          className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border border-zinc-400 data-checked:border-zinc-900 data-checked:bg-zinc-900 dark:border-zinc-500 dark:data-checked:border-zinc-100 dark:data-checked:bg-zinc-100"
        >
          <Checkbox.Indicator className="text-xs text-white dark:text-zinc-900">
            ✓
          </Checkbox.Indicator>
        </Checkbox.Root>

        <div className="min-w-0">
          <p
            data-testid="task-description"
            className={`truncate text-base font-medium text-zinc-900 dark:text-zinc-100 ${
              task.completed
                ? "line-through text-zinc-500 dark:text-zinc-400"
                : ""
            }`}
          >
            {task.description}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            <span data-testid="task-due-date">Vence: {task.dueDate}</span>
            {" · "}
            <span data-testid="task-priority">
              Prioridad: {PRIORITY_LABELS[task.priority]}
            </span>
          </p>
        </div>
      </div>

      <div className="flex shrink-0 gap-2 self-end sm:self-center">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
