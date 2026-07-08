"use client";

import { useState } from "react";
import { useTaskStore } from "../stores/task-store";
import { TaskFormDialog } from "./task-form-dialog";
import { TaskList } from "./task-list";

/** Página principal de la feature de tareas: listado, alta, edición, borrado y completado. */
export function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const toggleCompleted = useTaskStore((state) => state.toggleCompleted);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 bg-surface px-4 py-12 sm:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-on-surface">Tareas</h1>
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:opacity-90"
        >
          Nueva tarea
        </button>
      </div>

      <TaskList
        tasks={tasks}
        onToggleCompleted={toggleCompleted}
        onUpdate={updateTask}
        onDelete={removeTask}
      />

      <TaskFormDialog
        open={isCreateOpen}
        mode="create"
        onSubmit={addTask}
        onClose={() => setIsCreateOpen(false)}
      />
    </main>
  );
}
