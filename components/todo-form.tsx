"use client";

import { useId, useState } from "react";

import {
  createTodo,
  PRIORITY_OPTIONS,
  updateTodo,
  validateDescription,
  type Todo,
  type TodoPriority,
} from "@/lib/todos";

type TodoFormProps = {
  editingTodo?: Todo | null;
  onCreated?: (todo: Todo) => void;
  onSaved?: (todo: Todo) => void;
  onCancel?: () => void;
};

export function TodoForm({
  editingTodo = null,
  onCreated,
  onSaved,
  onCancel,
}: TodoFormProps) {
  const isEditMode = editingTodo !== null;
  const formId = useId();
  const descriptionId = `${formId}-description`;
  const priorityId = `${formId}-priority`;
  const errorId = `${formId}-error`;

  const [description, setDescription] = useState(
    () => editingTodo?.description ?? "",
  );
  const [priority, setPriority] = useState<TodoPriority>(
    () => editingTodo?.priority ?? "medium",
  );
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateDescription(description);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    setError(null);

    try {
      if (isEditMode && editingTodo) {
        const updated = updateTodo(editingTodo, { description, priority });
        onSaved?.(updated);
        return;
      }

      const created = createTodo({ description, priority });
      onCreated?.(created);
      setDescription("");
      setPriority("medium");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo guardar la tarea.");
    }
  }

  function handleCancel() {
    setError(null);
    onCancel?.();
  }

  return (
    <form
      aria-labelledby={`${formId}-title`}
      className="flex w-full flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      onSubmit={handleSubmit}
    >
      <h2 id={`${formId}-title`} className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {isEditMode ? "Editar tarea" : "Nueva tarea"}
      </h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={descriptionId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Título
        </label>
        <input
          id={descriptionId}
          name="description"
          type="text"
          autoComplete="off"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          aria-invalid={error !== null}
          aria-describedby={error ? errorId : undefined}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder="Ej. Comprar leche"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={priorityId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Prioridad
        </label>
        <select
          id={priorityId}
          name="priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value as TodoPriority)}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        >
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Guardar
        </button>
        {isEditMode ? (
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}
