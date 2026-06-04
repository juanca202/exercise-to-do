"use client";

import { Checkbox } from "@base-ui/react/checkbox";

import { formatDueDate, isOverdue } from "@/lib/formatDate";

import {
  getPriorityBadgeClasses,
  getPriorityLabel,
} from "../lib/priorityStyles";
import type { Task } from "../types/task";

export interface TaskItemProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function TaskItem({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskItemProps) {
  const isCompleted = task.status === "completada";
  const overdue = !isCompleted && isOverdue(task.dueDate);

  return (
    <article
      aria-label={`Tarea: ${task.description}`}
      className={`rounded-2xl border border-[#CED4DA] bg-white p-4 shadow-sm transition ${
        isCompleted ? "opacity-60" : ""
      }`}
      data-testid={`task-item-${task.id}`}
    >
      <div className="flex items-start gap-3">
        <Checkbox.Root
          aria-label={
            isCompleted ? "Marcar como pendiente" : "Marcar como completada"
          }
          checked={isCompleted}
          className="mt-1 flex size-5 shrink-0 items-center justify-center rounded border border-[#CED4DA] bg-white data-checked:border-[#008392] data-checked:bg-[#008392]"
          onCheckedChange={() => onToggleComplete(task.id)}
        >
          <Checkbox.Indicator className="text-sm text-white">
            ✓
          </Checkbox.Indicator>
        </Checkbox.Root>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getPriorityBadgeClasses(task.priority)}`}
              data-testid="priority-badge"
            >
              {getPriorityLabel(task.priority)}
            </span>
            {isCompleted ? (
              <span className="text-xs font-medium text-[#606060]">
                Completada
              </span>
            ) : null}
          </div>

          <p
            className={`text-sm text-[#333333] ${isCompleted ? "line-through" : ""}`}
          >
            {task.description}
          </p>

          <p
            className={`text-xs ${overdue ? "font-medium text-[#C62828]" : "text-[#606060]"}`}
          >
            {formatDueDate(task.dueDate)}
            {overdue ? " · Vencida" : ""}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            className="rounded-full border border-[#CED4DA] px-3 py-1 text-sm text-[#008392] hover:bg-[#EBF5F6]"
            onClick={() => onEdit(task.id)}
            type="button"
          >
            Editar
          </button>
          <button
            className="rounded-full border border-[#FFCDD2] px-3 py-1 text-sm text-[#C62828] hover:bg-[#FFCDD2]/40"
            onClick={() => onDelete(task.id)}
            type="button"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
