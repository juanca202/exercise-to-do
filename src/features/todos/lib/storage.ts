import type { Task } from "../types/task";

export const STORAGE_KEY = "todos:v1";

export interface StoragePayload {
  version: 1;
  tasks: Task[];
}

export type SaveErrorCode = "quota_exceeded" | "unknown";

export type SaveResult =
  | { success: true }
  | { success: false; error: SaveErrorCode; message: string };

export function loadTasks(): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as StoragePayload;

    if (parsed.version !== 1 || !Array.isArray(parsed.tasks)) {
      return [];
    }

    return parsed.tasks;
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): SaveResult {
  if (typeof window === "undefined") {
    return {
      success: false,
      error: "unknown",
      message: "No fue posible guardar las tareas",
    };
  }

  const payload: StoragePayload = {
    version: 1,
    tasks,
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return { success: true };
  } catch (error) {
    if (
      error instanceof DOMException &&
      (error.name === "QuotaExceededError" ||
        error.code === 22 ||
        error.code === 1014)
    ) {
      return {
        success: false,
        error: "quota_exceeded",
        message: "No fue posible guardar: almacenamiento lleno",
      };
    }

    return {
      success: false,
      error: "unknown",
      message: "No fue posible guardar las tareas",
    };
  }
}
