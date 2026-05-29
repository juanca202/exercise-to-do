import type { HTMLAttributes } from "react";

import {
  PRIORITY_BADGE_CLASSES,
  PRIORITY_LABELS,
} from "@/features/todos/lib/priority-styles";
import type { TodoPriority } from "@/features/todos/lib/types";

export interface PriorityBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  priority: TodoPriority;
}

export function PriorityBadge({
  priority,
  className = "",
  ...props
}: PriorityBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${PRIORITY_BADGE_CLASSES[priority]} ${className}`}
      {...props}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
