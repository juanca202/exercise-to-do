import type { TodoPriority } from "./types";

export const PRIORITY_LABELS: Record<TodoPriority, string> = {
  alta: "Alta",
  media: "Media",
  baja: "Baja",
};

export const PRIORITY_BADGE_CLASSES: Record<TodoPriority, string> = {
  alta: "bg-red-100 text-red-700 border-red-300",
  media: "bg-amber-100 text-amber-800 border-amber-300",
  baja: "bg-green-100 text-green-700 border-green-300",
};
