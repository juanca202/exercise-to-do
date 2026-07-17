import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { sortTasksByPriority } from "./sort";
import type { Task, TaskInput } from "./types";
import { isPriority } from "./validation";

/** Versioned localStorage key for persisted tasks. */
export const TASKS_STORAGE_KEY = "tasks:v1";

interface TasksState {
  tasks: Task[];
  addTask: (input: TaskInput) => Task;
  updateTask: (id: string, input: TaskInput) => boolean;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}

/**
 * Attempts to coerce an unknown value into a valid {@link Task}.
 * Invalid priorities or shapes yield `null` so they are dropped on hydrate.
 */
export function sanitizeTask(value: unknown): Task | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;

  if (typeof candidate.id !== "string" || candidate.id.length === 0) {
    return null;
  }
  if (
    typeof candidate.description !== "string" ||
    candidate.description.trim().length === 0
  ) {
    return null;
  }
  if (
    typeof candidate.dueDate !== "string" ||
    candidate.dueDate.trim() === ""
  ) {
    return null;
  }
  if (!isPriority(candidate.priority)) {
    return null;
  }
  if (typeof candidate.completed !== "boolean") {
    return null;
  }
  if (
    typeof candidate.createdAt !== "number" ||
    !Number.isFinite(candidate.createdAt)
  ) {
    return null;
  }

  return {
    id: candidate.id,
    description: candidate.description.trim(),
    dueDate: candidate.dueDate.trim(),
    priority: candidate.priority,
    completed: candidate.completed,
    createdAt: candidate.createdAt,
  };
}

/**
 * Sanitizes a persisted tasks array; non-arrays become an empty list.
 */
export function sanitizeTasks(value: unknown): Task[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    const task = sanitizeTask(item);
    return task ? [task] : [];
  });
}

/**
 * Storage wrapper that tolerates corrupt JSON and unavailable localStorage.
 */
const safeLocalStorage = createJSONStorage(() => ({
  getItem(name) {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem(name, value) {
    try {
      localStorage.setItem(name, value);
    } catch {
      // Quota / private mode — ignore write failures.
    }
  },
  removeItem(name) {
    try {
      localStorage.removeItem(name);
    } catch {
      // ignore
    }
  },
}));

function createTaskId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useTaskStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask(input) {
        const task: Task = {
          id: createTaskId(),
          description: input.description,
          dueDate: input.dueDate,
          priority: input.priority,
          completed: false,
          createdAt: Date.now(),
        };
        set({ tasks: [...get().tasks, task] });
        return task;
      },

      updateTask(id, input) {
        const exists = get().tasks.some((task) => task.id === id);
        if (!exists) {
          return false;
        }
        set({
          tasks: get().tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  description: input.description,
                  dueDate: input.dueDate,
                  priority: input.priority,
                }
              : task,
          ),
        });
        return true;
      },

      deleteTask(id) {
        set({ tasks: get().tasks.filter((task) => task.id !== id) });
      },

      toggleComplete(id) {
        set({
          tasks: get().tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        });
      },
    }),
    {
      name: TASKS_STORAGE_KEY,
      storage: safeLocalStorage,
      partialize: (state) => ({ tasks: state.tasks }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as { tasks?: unknown } | undefined;
        return {
          ...currentState,
          tasks: sanitizeTasks(persisted?.tasks),
        };
      },
    },
  ),
);

/**
 * Selects tasks sorted by priority without mutating store state.
 */
export function selectSortedTasks(state: TasksState): Task[] {
  return sortTasksByPriority(state.tasks);
}
