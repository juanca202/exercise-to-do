"use client";

import { create } from "zustand";

import { getJson, setJson } from "@/lib/storage/local-storage";

import { TODOS_STORAGE_KEY } from "../lib/constants";
import { sortTodosByPriority } from "../lib/sort";
import type {
  CreateTodoInput,
  Todo,
  TodoStatus,
  UpdateTodoInput,
  ValidationResult,
} from "../lib/types";
import { validateCreateInput, validateUpdateInput } from "../lib/validation";

interface TodoStoreState {
  todos: Todo[];
  isHydrated: boolean;
  storageError: string | null;
}

interface TodoStoreActions {
  hydrate: () => void;
  createTodo: (input: CreateTodoInput) => ValidationResult;
  updateTodo: (input: UpdateTodoInput) => ValidationResult;
  deleteTodo: (id: string) => void;
  toggleStatus: (id: string) => void;
  getSortedTodos: () => Todo[];
  clearStorageError: () => void;
}

export type TodoStore = TodoStoreState & TodoStoreActions;

function persistTodos(todos: Todo[]): boolean {
  try {
    setJson(TODOS_STORAGE_KEY, todos);
    return true;
  } catch {
    return false;
  }
}

function createTodoEntity(input: CreateTodoInput): Todo {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    description: input.description.trim(),
    dueDate: input.dueDate,
    priority: input.priority,
    status: "pendiente",
    createdAt: now,
    updatedAt: now,
  };
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  isHydrated: false,
  storageError: null,

  hydrate: () => {
    const stored = getJson<Todo[]>(TODOS_STORAGE_KEY);
    set({
      todos: Array.isArray(stored) ? stored : [],
      isHydrated: true,
      storageError: null,
    });
  },

  createTodo: (input) => {
    const validation = validateCreateInput(input);
    if (!validation.success) {
      return validation;
    }

    const nextTodos = [...get().todos, createTodoEntity(input)];
    if (!persistTodos(nextTodos)) {
      set({ storageError: "No se pudo guardar la tarea. Inténtalo de nuevo." });
      return validation;
    }

    set({ todos: nextTodos, storageError: null });
    return validation;
  },

  updateTodo: (input) => {
    const validation = validateUpdateInput(input);
    if (!validation.success) {
      return validation;
    }

    const existing = get().todos.find((t) => t.id === input.id);
    if (!existing) {
      return validation;
    }

    const now = new Date().toISOString();
    const nextTodos = get().todos.map((todo) =>
      todo.id === input.id
        ? {
            ...todo,
            description: input.description.trim(),
            dueDate: input.dueDate,
            priority: input.priority,
            updatedAt: now,
          }
        : todo,
    );

    if (!persistTodos(nextTodos)) {
      set({ storageError: "No se pudo guardar la tarea. Inténtalo de nuevo." });
      return validation;
    }

    set({ todos: nextTodos, storageError: null });
    return validation;
  },

  deleteTodo: (id) => {
    const nextTodos = get().todos.filter((todo) => todo.id !== id);
    if (!persistTodos(nextTodos)) {
      set({
        storageError: "No se pudo eliminar la tarea. Inténtalo de nuevo.",
      });
      return;
    }

    set({ todos: nextTodos, storageError: null });
  },

  toggleStatus: (id) => {
    const nextStatus: TodoStatus =
      get().todos.find((t) => t.id === id)?.status === "pendiente"
        ? "completada"
        : "pendiente";

    const nextTodos = get().todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status: nextStatus,
            updatedAt: new Date().toISOString(),
          }
        : todo,
    );

    if (!persistTodos(nextTodos)) {
      set({
        storageError: "No se pudo actualizar el estado. Inténtalo de nuevo.",
      });
      return;
    }

    set({ todos: nextTodos, storageError: null });
  },

  getSortedTodos: () => sortTodosByPriority(get().todos),

  clearStorageError: () => set({ storageError: null }),
}));
