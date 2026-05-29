"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { useTodoStore } from "../store/todo-store";
import { DeleteConfirmModal } from "./delete-confirm-modal";
import { TaskFormModal } from "./task-form-modal";
import { TodoEmptyState } from "./todo-empty-state";
import { TodoList } from "./todo-list";

type FormMode = "create" | "edit";

export function TodosPage() {
  const hydrate = useTodoStore((s) => s.hydrate);
  const isHydrated = useTodoStore((s) => s.isHydrated);
  const todos = useTodoStore((s) => s.todos);
  const toggleStatus = useTodoStore((s) => s.toggleStatus);
  const storageError = useTodoStore((s) => s.storageError);
  const clearStorageError = useTodoStore((s) => s.clearStorageError);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [editingId, setEditingId] = useState<string | undefined>();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const openCreate = () => {
    setFormMode("create");
    setEditingId(undefined);
    setFormOpen(true);
  };

  const openEdit = (id: string) => {
    setFormMode("edit");
    setEditingId(id);
    setFormOpen(true);
  };

  const openDelete = (id: string) => {
    setDeletingId(id);
    setDeleteOpen(true);
  };

  if (!isHydrated) {
    return (
      <main className="mx-auto w-full max-w-2xl px-4 py-8">
        <p className="text-sm text-[#606060]">Cargando tareas…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#212529]">Mis tareas</h1>
          <p className="text-sm text-[#606060]">
            Gestiona tus pendientes por prioridad
          </p>
        </div>
        <Button type="button" onClick={openCreate}>
          Nueva tarea
        </Button>
      </header>

      {storageError ? (
        <div
          className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          <p>{storageError}</p>
          <button
            type="button"
            className="mt-2 underline"
            onClick={clearStorageError}
          >
            Cerrar aviso
          </button>
        </div>
      ) : null}

      {todos.length === 0 ? (
        <TodoEmptyState onCreateClick={openCreate} />
      ) : (
        <TodoList
          onEdit={openEdit}
          onDelete={openDelete}
          onToggleStatus={toggleStatus}
        />
      )}

      <TaskFormModal
        key={
          formOpen ? `${formMode}-${editingId ?? "create"}` : "task-form-closed"
        }
        open={formOpen}
        mode={formMode}
        todoId={editingId}
        onOpenChange={setFormOpen}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        todoId={deletingId}
        onOpenChange={setDeleteOpen}
      />
    </main>
  );
}
