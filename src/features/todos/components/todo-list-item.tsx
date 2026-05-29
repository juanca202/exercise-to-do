"use client";

import { PriorityBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { formatDueDate } from "../lib/format-date";
import type { Todo } from "../lib/types";

const MAX_DESCRIPTION_LENGTH = 120;

function truncateDescription(text: string): string {
  if (text.length <= MAX_DESCRIPTION_LENGTH) {
    return text;
  }

  return `${text.slice(0, MAX_DESCRIPTION_LENGTH)}…`;
}

export interface TodoListItemProps {
  todo: Todo;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

export function TodoListItem({
  todo,
  onEdit,
  onDelete,
  onToggleStatus,
}: TodoListItemProps) {
  const isCompleted = todo.status === "completada";
  const displayDescription = truncateDescription(todo.description);

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-[#CED4DA] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {onToggleStatus ? (
          <input
            type="checkbox"
            aria-label="Marcar como completada"
            checked={isCompleted}
            onChange={() => onToggleStatus(todo.id)}
            className="mt-1 h-4 w-4 shrink-0 accent-[#008392]"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <p
            className={`text-sm font-medium text-[#333333] ${isCompleted ? "line-through opacity-60" : ""}`}
            title={todo.description}
          >
            {displayDescription}
          </p>
          <p className="mt-1 text-xs text-[#606060]">
            Vence: {formatDueDate(todo.dueDate)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <PriorityBadge priority={todo.priority} />
        {onEdit ? (
          <Button variant="ghost" onClick={() => onEdit(todo.id)}>
            Editar
          </Button>
        ) : null}
        {onDelete ? (
          <Button variant="ghost" onClick={() => onDelete(todo.id)}>
            Eliminar
          </Button>
        ) : null}
      </div>
    </li>
  );
}
