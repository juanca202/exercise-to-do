"use client";

import { PRIORITY_BADGE_CLASSES, PRIORITY_LABELS, type Todo } from "@/lib/todos";

type TodoListProps = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export function TodoList({ todos, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
        No hay tareas. Crea la primera con el formulario.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3" aria-label="Listado de tareas">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="font-medium text-zinc-900 dark:text-zinc-50">{todo.description}</span>
            <span
              className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${PRIORITY_BADGE_CLASSES[todo.priority]}`}
            >
              {PRIORITY_LABELS[todo.priority]}
            </span>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => onEdit(todo)}
              className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
