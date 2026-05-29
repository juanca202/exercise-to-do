"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { AppDialog } from "@/components/ui/dialog";

import type { Todo, TodoPriority } from "../lib/types";
import { useTodoStore } from "../store/todo-store";

export interface TaskFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  todoId?: string;
  onOpenChange: (open: boolean) => void;
}

const EMPTY_FORM = {
  description: "",
  dueDate: "",
  priority: "media" as TodoPriority,
};

function buildInitialForm(
  mode: "create" | "edit",
  todoId: string | undefined,
  todos: Todo[],
) {
  if (mode === "edit" && todoId) {
    const todo = todos.find((t) => t.id === todoId);
    if (todo) {
      return {
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority,
      };
    }
  }

  return EMPTY_FORM;
}

export function TaskFormModal({
  open,
  mode,
  todoId,
  onOpenChange,
}: TaskFormModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const todos = useTodoStore((s) => s.todos);
  const createTodo = useTodoStore((s) => s.createTodo);
  const updateTodo = useTodoStore((s) => s.updateTodo);
  const storageError = useTodoStore((s) => s.storageError);

  const [form, setForm] = useState(() => buildInitialForm(mode, todoId, todos));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
    onOpenChange(next);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const result =
      mode === "create"
        ? createTodo(form)
        : updateTodo({ id: todoId ?? "", ...form });

    if (!result.success) {
      setErrors(result.errors as Record<string, string>);
      return;
    }

    if (!useTodoStore.getState().storageError) {
      handleOpenChange(false);
    }
  };

  const title = mode === "create" ? "Nueva tarea" : "Editar tarea";

  return (
    <AppDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={title}
      titleId={titleId}
      descriptionId={descriptionId}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="todo-description"
            className="mb-1 block text-sm font-medium text-[#424242]"
          >
            Descripción
          </label>
          <textarea
            id="todo-description"
            aria-label="Descripción"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={3}
            className="w-full rounded border border-[#CED4DA] px-3 py-2 text-sm"
          />
          {errors.description ? (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.description}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="todo-due-date"
            className="mb-1 block text-sm font-medium text-[#424242]"
          >
            Fecha de vencimiento
          </label>
          <input
            id="todo-due-date"
            type="date"
            aria-label="Fecha de vencimiento"
            value={form.dueDate}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, dueDate: e.target.value }))
            }
            className="w-full rounded border border-[#CED4DA] px-3 py-2 text-sm"
          />
          {errors.dueDate ? (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.dueDate}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="todo-priority"
            className="mb-1 block text-sm font-medium text-[#424242]"
          >
            Prioridad
          </label>
          <select
            id="todo-priority"
            aria-label="Prioridad"
            value={form.priority}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                priority: e.target.value as TodoPriority,
              }))
            }
            className="w-full rounded border border-[#CED4DA] px-3 py-2 text-sm"
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          {errors.priority ? (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.priority}
            </p>
          ) : null}
        </div>

        {storageError ? (
          <p className="text-sm text-red-600" role="alert">
            {storageError}
          </p>
        ) : null}

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </AppDialog>
  );
}
