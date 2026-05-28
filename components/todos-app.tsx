"use client";

import { useCallback, useEffect, useState } from "react";

import { TodoForm } from "@/components/todo-form";
import { TodoList } from "@/components/todo-list";
import { loadTodos, saveTodos, type Todo } from "@/lib/todos";

export function TodosApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- carga única al montar
    setTodos(loadTodos());
  }, []);

  const persist = useCallback((next: Todo[] | ((previous: Todo[]) => Todo[])) => {
    setTodos((previous) => {
      const resolved = typeof next === "function" ? next(previous) : next;
      saveTodos(resolved);
      return resolved;
    });
  }, []);

  function handleCreated(todo: Todo) {
    persist((previous) => [...previous, todo]);
  }

  function handleSaved(todo: Todo) {
    persist((previous) => previous.map((item) => (item.id === todo.id ? todo : item)));
    setEditingTodo(null);
  }

  function handleCancelEdit() {
    setEditingTodo(null);
  }

  function handleEdit(todo: Todo) {
    setEditingTodo(todo);
  }

  function handleDelete(id: string) {
    persist((previous) => previous.filter((item) => item.id !== id));
    if (editingTodo?.id === id) {
      setEditingTodo(null);
    }
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      <TodoForm
        key={editingTodo?.id ?? "create"}
        editingTodo={editingTodo}
        onCreated={handleCreated}
        onSaved={handleSaved}
        onCancel={handleCancelEdit}
      />
      <section className="flex flex-col gap-3" aria-labelledby="todos-list-heading">
        <h2 id="todos-list-heading" className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Tareas
        </h2>
        <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
      </section>
    </div>
  );
}
