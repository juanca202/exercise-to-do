"use client";

import { useState } from "react";
import { Checkbox } from "@base-ui/react/checkbox";
import type { Task } from "../types";
import type { TaskInput, TaskValidationErrors } from "../lib/validate-task";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { TaskFormDialog } from "./task-form-dialog";

const PRIORITY_LABELS: Record<Task["priority"], string> = {
  alta: "Alta",
  media: "Media",
  baja: "Baja",
};

export interface TaskItemProps {
  task: Task;
  onToggleCompleted: (id: string) => void;
  onUpdate: (
    id: string,
    input: TaskInput,
  ) => { success: boolean; errors?: TaskValidationErrors };
  onDelete: (id: string) => void;
}

/** Fila de una tarea: estado, descripción, fecha, prioridad y acciones de editar/eliminar. */
export function TaskItem({
  task,
  onToggleCompleted,
  onUpdate,
  onDelete,
}: TaskItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <li
      data-completed={task.completed}
      className="flex items-center gap-3 rounded-lg border border-outline-variant bg-surface-container-lowest p-4"
    >
      <Checkbox.Root
        checked={task.completed}
        onCheckedChange={() => onToggleCompleted(task.id)}
        aria-label={`Marcar "${task.description}" como completada`}
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-outline data-[checked]:border-secondary data-[checked]:bg-secondary"
      >
        <Checkbox.Indicator className="flex text-on-secondary">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M3 8.5L6.5 12L13 4.5" />
          </svg>
        </Checkbox.Indicator>
      </Checkbox.Root>

      <div className="flex flex-1 flex-col gap-1">
        <p
          className={
            task.completed
              ? "line-through text-on-surface-variant"
              : "text-on-surface"
          }
        >
          {task.description}
        </p>
        <div className="flex gap-3 font-mono text-xs text-on-surface-variant">
          <span>{task.dueDate}</span>
          <span>{PRIORITY_LABELS[task.priority]}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsEditOpen(true)}
        className="rounded px-3 py-1.5 text-sm font-medium text-on-surface-variant hover:bg-surface-container"
      >
        Editar
      </button>
      <button
        type="button"
        aria-label="Eliminar tarea"
        onClick={() => setIsDeleteOpen(true)}
        className="rounded px-3 py-1.5 text-sm font-medium text-error hover:bg-error-container"
      >
        Eliminar
      </button>

      <TaskFormDialog
        open={isEditOpen}
        mode="edit"
        initialValues={{
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
        }}
        onSubmit={(input) => onUpdate(task.id, input)}
        onClose={() => setIsEditOpen(false)}
      />

      <DeleteConfirmDialog
        open={isDeleteOpen}
        taskDescription={task.description}
        onConfirm={() => {
          onDelete(task.id);
          setIsDeleteOpen(false);
        }}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </li>
  );
}
