import { sortTasks } from "../lib/sort-tasks";
import type { TaskInput, TaskValidationErrors } from "../lib/validate-task";
import type { Task } from "../types";
import { TaskItem } from "./task-item";

export interface TaskListProps {
  tasks: Task[];
  onToggleCompleted: (id: string) => void;
  onUpdate: (
    id: string,
    input: TaskInput,
  ) => { success: boolean; errors?: TaskValidationErrors };
  onDelete: (id: string) => void;
}

/** Lista de tareas ordenada por defecto (pendientes por prioridad, completadas al final). */
export function TaskList({
  tasks,
  onToggleCompleted,
  onUpdate,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-on-surface-variant">
        No tienes tareas. Crea una para empezar.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {sortTasks(tasks).map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleCompleted={onToggleCompleted}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
