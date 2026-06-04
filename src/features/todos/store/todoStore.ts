import { create } from "zustand";

import { sortTasks } from "../lib/sortTasks";
import { loadTasks, saveTasks } from "../lib/storage";
import { validateTaskInput } from "../lib/validateTask";
import type { Priority, Task, TaskInput } from "../types/task";

export interface TodoStore {
  tasks: Task[];
  saveError: string | null;
  sortedTasks: Task[];
  loadFromStorage: () => void;
  clearSaveError: () => void;
  createTask: (input: TaskInput) => boolean;
  updateTask: (id: string, input: TaskInput) => boolean;
  deleteTask: (id: string) => boolean;
  toggleTaskStatus: (id: string) => boolean;
}

function persistTasks(tasks: Task[]): boolean {
  const result = saveTasks(tasks);

  if (!result.success) {
    return false;
  }

  return true;
}

function withSortedTasks(
  tasks: Task[],
): Pick<TodoStore, "tasks" | "sortedTasks"> {
  return {
    tasks,
    sortedTasks: sortTasks(tasks),
  };
}

export function createTodoStore() {
  return create<TodoStore>((set, get) => ({
    tasks: [],
    saveError: null,
    sortedTasks: [],

    loadFromStorage: () => {
      const tasks = loadTasks();
      set({ ...withSortedTasks(tasks), saveError: null });
    },

    clearSaveError: () => {
      set({ saveError: null });
    },

    createTask: (input) => {
      const validation = validateTaskInput(input);

      if (!validation.valid) {
        return false;
      }

      const now = new Date().toISOString();
      const newTask: Task = {
        id: crypto.randomUUID(),
        description: input.description.trim(),
        dueDate: input.dueDate,
        priority: input.priority,
        status: "pendiente",
        createdAt: now,
        updatedAt: now,
      };

      const nextTasks = [...get().tasks, newTask];
      const saved = persistTasks(nextTasks);

      if (!saved) {
        const errorResult = saveTasks(nextTasks);
        set({
          saveError: !errorResult.success
            ? errorResult.message
            : "No fue posible guardar las tareas",
        });
        return false;
      }

      set({ ...withSortedTasks(nextTasks), saveError: null });
      return true;
    },

    updateTask: (id, input) => {
      const validation = validateTaskInput(input);

      if (!validation.valid) {
        return false;
      }

      const tasks = get().tasks;
      const index = tasks.findIndex((task) => task.id === id);

      if (index === -1) {
        return false;
      }

      const updatedTask: Task = {
        ...tasks[index],
        description: input.description.trim(),
        dueDate: input.dueDate,
        priority: input.priority,
        updatedAt: new Date().toISOString(),
      };

      const nextTasks = [...tasks];
      nextTasks[index] = updatedTask;

      const saved = persistTasks(nextTasks);

      if (!saved) {
        const errorResult = saveTasks(nextTasks);
        set({
          saveError: !errorResult.success
            ? errorResult.message
            : "No fue posible guardar las tareas",
        });
        return false;
      }

      set({ ...withSortedTasks(nextTasks), saveError: null });
      return true;
    },

    deleteTask: (id) => {
      const nextTasks = get().tasks.filter((task) => task.id !== id);
      const saved = persistTasks(nextTasks);

      if (!saved) {
        const errorResult = saveTasks(nextTasks);
        set({
          saveError: !errorResult.success
            ? errorResult.message
            : "No fue posible guardar las tareas",
        });
        return false;
      }

      set({ ...withSortedTasks(nextTasks), saveError: null });
      return true;
    },

    toggleTaskStatus: (id) => {
      const tasks = get().tasks;
      const index = tasks.findIndex((task) => task.id === id);

      if (index === -1) {
        return false;
      }

      const current = tasks[index];
      const nextStatus =
        current.status === "pendiente" ? "completada" : "pendiente";
      const updatedTask: Task = {
        ...current,
        status: nextStatus,
        updatedAt: new Date().toISOString(),
      };

      const nextTasks = [...tasks];
      nextTasks[index] = updatedTask;

      const saved = persistTasks(nextTasks);

      if (!saved) {
        const errorResult = saveTasks(nextTasks);
        set({
          saveError: !errorResult.success
            ? errorResult.message
            : "No fue posible guardar las tareas",
        });
        return false;
      }

      set({ ...withSortedTasks(nextTasks), saveError: null });
      return true;
    },
  }));
}

export const useTodoStore = createTodoStore();

export function resetTodoStore(): void {
  useTodoStore.setState({
    tasks: [],
    saveError: null,
    sortedTasks: [],
  });
}

export const DEFAULT_PRIORITY: Priority = "media";
