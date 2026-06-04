"use client";

import type { Task } from "../types/task";
import { TaskItem } from "./TaskItem";

export interface TaskListProps {
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <section
        aria-label="Estado vacío"
        className="rounded-2xl border border-dashed border-[#CED4DA] bg-[#EBF5F6] p-8 text-center"
        data-testid="empty-state"
      >
        <p className="text-base text-[#606060]">
          No tienes tareas. Crea una nueva para comenzar.
        </p>
      </section>
    );
  }

  return (
    <ul className="space-y-3" data-testid="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleComplete={onToggleComplete}
            task={task}
          />
        </li>
      ))}
    </ul>
  );
}
