import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Task } from "../types";
import {
  type TaskInput,
  type TaskValidationErrors,
  validateTask,
} from "../lib/validate-task";

export interface TaskActionResult {
  success: boolean;
  errors?: TaskValidationErrors;
}

export interface TaskStore {
  tasks: Task[];
  addTask: (input: TaskInput) => TaskActionResult;
  updateTask: (id: string, input: TaskInput) => TaskActionResult;
  removeTask: (id: string) => void;
  toggleCompleted: (id: string) => void;
}

function isTaskArray(value: unknown): value is Task[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as Task).id === "string" &&
        typeof (item as Task).description === "string" &&
        typeof (item as Task).dueDate === "string" &&
        typeof (item as Task).completed === "boolean" &&
        typeof (item as Task).createdAt === "number",
    )
  );
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (input) => {
        const errors = validateTask(input);
        if (Object.keys(errors).length > 0) return { success: false, errors };
        const task: Task = {
          ...input,
          id: crypto.randomUUID(),
          completed: false,
          createdAt: Date.now(),
        };
        set({ tasks: [...get().tasks, task] });
        return { success: true };
      },
      updateTask: (id, input) => {
        const errors = validateTask(input);
        if (Object.keys(errors).length > 0) return { success: false, errors };
        set({
          tasks: get().tasks.map((task) =>
            task.id === id ? { ...task, ...input } : task,
          ),
        });
        return { success: true };
      },
      removeTask: (id) => {
        set({ tasks: get().tasks.filter((task) => task.id !== id) });
      },
      toggleCompleted: (id) => {
        set({
          tasks: get().tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        });
      },
    }),
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }),
      merge: (persistedState, currentState) => {
        const tasks = (persistedState as { tasks?: unknown } | undefined)
          ?.tasks;
        return {
          ...currentState,
          tasks: isTaskArray(tasks) ? tasks : currentState.tasks,
        };
      },
    },
  ),
);
