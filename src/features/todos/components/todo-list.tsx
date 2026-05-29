"use client";

import { useMemo } from "react";

import { sortTodosByPriority } from "../lib/sort";
import { useTodoStore } from "../store/todo-store";
import { TodoListItem } from "./todo-list-item";

export interface TodoListProps {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

export function TodoList({ onEdit, onDelete, onToggleStatus }: TodoListProps) {
  const todos = useTodoStore((s) => s.todos);
  const sortedTodos = useMemo(() => sortTodosByPriority(todos), [todos]);

  return (
    <ul className="flex flex-col gap-3" aria-label="Lista de tareas">
      {sortedTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
}
