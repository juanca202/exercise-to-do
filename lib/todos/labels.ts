import type { TodoPriority } from "./types";

export const PRIORITY_LABELS: Record<TodoPriority, string> = {
  high: "alta",
  medium: "media",
  low: "baja",
};

export const PRIORITY_BADGE_CLASSES: Record<TodoPriority, string> = {
  high: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  medium: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300",
  low: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

export const PRIORITY_OPTIONS: { value: TodoPriority; label: string }[] = [
  { value: "high", label: PRIORITY_LABELS.high },
  { value: "medium", label: PRIORITY_LABELS.medium },
  { value: "low", label: PRIORITY_LABELS.low },
];
