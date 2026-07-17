/**
 * Priority levels for a task. UI labels are in Spanish (alta / media / baja).
 */
export type Priority = "high" | "medium" | "low";

/**
 * Domain model for a to-do task.
 */
export interface Task {
  id: string;
  description: string;
  /** ISO date string (`YYYY-MM-DD`). */
  dueDate: string;
  priority: Priority;
  completed: boolean;
  /** Epoch ms used for stable secondary sort. */
  createdAt: number;
}

/**
 * Input payload for creating or updating a task (before id/completed/createdAt).
 */
export interface TaskInput {
  description: string;
  dueDate: string;
  priority: Priority;
}

/** Ordered priorities from highest to lowest. */
export const PRIORITY_ORDER: readonly Priority[] = [
  "high",
  "medium",
  "low",
] as const;

/** Spanish labels for priority values shown in the UI. */
export const PRIORITY_LABELS: Record<Priority, string> = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
};
