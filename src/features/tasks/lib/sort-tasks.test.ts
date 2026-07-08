import { describe, expect, it } from "vitest";
import type { Task } from "../types";
import { sortTasks } from "./sort-tasks";

function task(overrides: Partial<Task>): Task {
  return {
    id: "id",
    description: "desc",
    dueDate: "2026-07-08",
    priority: "media",
    completed: false,
    createdAt: 0,
    ...overrides,
  };
}

describe("sortTasks", () => {
  it("orders pending tasks by priority: alta, media, baja", () => {
    // Arrange
    const baja = task({ id: "1", priority: "baja", createdAt: 1 });
    const alta = task({ id: "2", priority: "alta", createdAt: 2 });
    const media = task({ id: "3", priority: "media", createdAt: 3 });

    // Act
    const result = sortTasks([baja, alta, media]);

    // Assert
    expect(result.map((t) => t.id)).toEqual(["2", "3", "1"]);
  });

  it("breaks priority ties by creation order, oldest first", () => {
    // Arrange
    const newer = task({ id: "1", priority: "alta", createdAt: 200 });
    const older = task({ id: "2", priority: "alta", createdAt: 100 });

    // Act
    const result = sortTasks([newer, older]);

    // Assert
    expect(result.map((t) => t.id)).toEqual(["2", "1"]);
  });

  it("groups completed tasks after all pending tasks regardless of priority", () => {
    // Arrange
    const completedHigh = task({
      id: "1",
      priority: "alta",
      completed: true,
      createdAt: 1,
    });
    const pendingLow = task({
      id: "2",
      priority: "baja",
      completed: false,
      createdAt: 2,
    });

    // Act
    const result = sortTasks([completedHigh, pendingLow]);

    // Assert
    expect(result.map((t) => t.id)).toEqual(["2", "1"]);
  });

  it("does not mutate the original array", () => {
    // Arrange
    const tasks = [
      task({ id: "1", priority: "baja", createdAt: 1 }),
      task({ id: "2", priority: "alta", createdAt: 2 }),
    ];
    const original = [...tasks];

    // Act
    sortTasks(tasks);

    // Assert
    expect(tasks).toEqual(original);
  });
});
