"use client";

import { useEffect, useState } from "react";

import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { TaskFormModal } from "./TaskFormModal";
import { TaskList } from "./TaskList";
import { useTodoStore } from "../store/todoStore";
import type { Task, TaskInput } from "../types/task";

export function TodoPage() {
  const tasks = useTodoStore((state) => state.sortedTasks);
  const saveError = useTodoStore((state) => state.saveError);
  const loadFromStorage = useTodoStore((state) => state.loadFromStorage);
  const clearSaveError = useTodoStore((state) => state.clearSaveError);
  const createTask = useTodoStore((state) => state.createTask);
  const updateTask = useTodoStore((state) => state.updateTask);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const toggleTaskStatus = useTodoStore((state) => state.toggleTaskStatus);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState<Task | undefined>();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const openCreateModal = () => {
    setFormMode("create");
    setEditingTask(undefined);
    setFormOpen(true);
  };

  const openEditModal = (id: string) => {
    const task = useTodoStore.getState().tasks.find((item) => item.id === id);

    if (!task) {
      return;
    }

    setFormMode("edit");
    setEditingTask(task);
    setFormOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    const task = useTodoStore.getState().tasks.find((item) => item.id === id);

    if (!task) {
      return;
    }

    setDeletingTask(task);
    setDeleteOpen(true);
  };

  const handleSave = (input: TaskInput) => {
    if (formMode === "create") {
      return createTask(input);
    }

    if (!editingTask) {
      return false;
    }

    return updateTask(editingTask.id, input);
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#17191F]">Mis tareas</h1>
          <p className="text-sm text-[#606060]">
            Gestiona tus pendientes por prioridad
          </p>
        </div>
        <button
          className="rounded-full bg-[#008392] px-5 py-2 text-sm font-medium text-white hover:bg-[#006B77]"
          onClick={openCreateModal}
          type="button"
        >
          Nueva tarea
        </button>
      </header>

      {saveError ? (
        <div
          className="rounded-xl border border-[#FFCDD2] bg-[#FFCDD2]/30 px-4 py-3 text-sm text-[#C62828]"
          role="alert"
        >
          {saveError}
          <button
            className="ml-3 underline"
            onClick={clearSaveError}
            type="button"
          >
            Cerrar
          </button>
        </div>
      ) : null}

      <section aria-label="Listado de tareas" data-testid="todo-list-section">
        <TaskList
          onDelete={openDeleteDialog}
          onEdit={openEditModal}
          onToggleComplete={toggleTaskStatus}
          tasks={tasks}
        />
      </section>

      <TaskFormModal
        mode={formMode}
        onOpenChange={setFormOpen}
        onSave={handleSave}
        open={formOpen}
        task={editingTask}
      />

      <DeleteConfirmDialog
        onConfirm={() => {
          if (deletingTask) {
            deleteTask(deletingTask.id);
          }
        }}
        onOpenChange={setDeleteOpen}
        open={deleteOpen}
        taskDescription={deletingTask?.description ?? ""}
      />
    </main>
  );
}
