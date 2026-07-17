"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useState } from "react";

import { useTasksHydrated } from "../hooks/use-tasks-hydrated";
import { sortTasksByPriority } from "../sort";
import { useTaskStore } from "../store";
import type { Task, TaskInput } from "../types";
import { TaskForm } from "./task-form";
import { TaskList } from "./task-list";

type DialogMode =
  { type: "closed" } | { type: "create" } | { type: "edit"; task: Task };

/**
 * Feature shell: sorted task list + create/edit form in a modal dialog.
 */
export function TasksView() {
  const hydrated = useTasksHydrated();
  const tasks = useTaskStore((state) => state.tasks);
  const sortedTasks = sortTasksByPriority(tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const toggleComplete = useTaskStore((state) => state.toggleComplete);

  const [mode, setMode] = useState<DialogMode>({ type: "closed" });
  const dialogOpen = mode.type !== "closed";

  function closeDialog() {
    setMode({ type: "closed" });
  }

  function handleCreate(input: TaskInput) {
    addTask(input);
    closeDialog();
  }

  function handleUpdate(input: TaskInput) {
    if (mode.type !== "edit") {
      return;
    }
    updateTask(mode.task.id, input);
    closeDialog();
  }

  if (!hydrated) {
    return (
      <p
        data-testid="tasks-loading"
        className="text-sm text-zinc-500 dark:text-zinc-400"
      >
        Cargando tareas…
      </p>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Mis tareas
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Organiza tu trabajo diario. Los datos se guardan en este navegador.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMode({ type: "create" })}
          className="shrink-0 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Nueva tarea
        </button>
      </header>

      <section aria-labelledby="task-list-heading">
        <h2
          id="task-list-heading"
          className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100"
        >
          Listado
        </h2>
        <TaskList
          tasks={sortedTasks}
          onToggleComplete={toggleComplete}
          onEdit={(task) => setMode({ type: "edit", task })}
          onDelete={deleteTask}
        />
      </section>

      <Dialog.Root
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/40 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup
            data-testid="task-dialog"
            className="fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-200 bg-white p-5 shadow-xl outline-none transition-all data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <Dialog.Title className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
              {mode.type === "edit" ? "Editar tarea" : "Nueva tarea"}
            </Dialog.Title>
            {mode.type === "create" ? (
              <TaskForm
                key="create"
                submitLabel="Crear tarea"
                onSubmit={handleCreate}
                onCancel={closeDialog}
              />
            ) : null}
            {mode.type === "edit" ? (
              <TaskForm
                key={mode.task.id}
                task={mode.task}
                submitLabel="Guardar cambios"
                onSubmit={handleUpdate}
                onCancel={closeDialog}
              />
            ) : null}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
