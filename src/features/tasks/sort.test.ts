import { describe, expect, it } from "vitest";

import { sortTasksByPriority } from "./sort";
import type { Task } from "./types";

function task(
  partial: Partial<Task> & Pick<Task, "id" | "priority" | "createdAt">,
): Task {
  return {
    description: partial.description ?? partial.id,
    dueDate: partial.dueDate ?? "2026-07-20",
    completed: partial.completed ?? false,
    ...partial,
  };
}

describe("sortTasksByPriority", () => {
  it("orders high before medium before low", () => {
    const sorted = sortTasksByPriority([
      task({ id: "l", priority: "low", createdAt: 1 }),
      task({ id: "h", priority: "high", createdAt: 2 }),
      task({ id: "m", priority: "medium", createdAt: 3 }),
    ]);
    expect(sorted.map((t) => t.id)).toEqual(["h", "m", "l"]);
  });

  it("keeps createdAt ascending within the same priority", () => {
    const sorted = sortTasksByPriority([
      task({ id: "m2", priority: "medium", createdAt: 20 }),
      task({ id: "m1", priority: "medium", createdAt: 10 }),
      task({ id: "h", priority: "high", createdAt: 5 }),
    ]);
    expect(sorted.map((t) => t.id)).toEqual(["h", "m1", "m2"]);
  });

  it("does not mutate the original array", () => {
    const original = [
      task({ id: "l", priority: "low", createdAt: 1 }),
      task({ id: "h", priority: "high", createdAt: 2 }),
    ];
    const copy = [...original];
    sortTasksByPriority(original);
    expect(original).toEqual(copy);
  });
});
