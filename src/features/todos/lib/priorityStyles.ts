import type { Priority } from "../types/task";

export const PRIORITY_LABELS: Record<Priority, string> = {
  alta: "Alta",
  media: "Media",
  baja: "Baja",
};

export const PRIORITY_BADGE_CLASSES: Record<Priority, string> = {
  alta: "bg-[#FFCDD2] text-[#C62828]",
  media: "bg-[#FFE0B2] text-[#E65100]",
  baja: "bg-[#C8E6C9] text-[#2E7D32]",
};

export function getPriorityLabel(priority: Priority): string {
  return PRIORITY_LABELS[priority];
}

export function getPriorityBadgeClasses(priority: Priority): string {
  return PRIORITY_BADGE_CLASSES[priority];
}
