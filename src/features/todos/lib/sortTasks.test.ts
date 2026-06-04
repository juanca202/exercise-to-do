import { describe, expect, it } from "vitest";

import { buildTask } from "../testing/taskMother";
import { sortTasks } from "./sortTasks";

describe("sortTasks", () => {
  it("orders tasks by priority alta → media → baja", () => {
    const tasks = [
      buildTask({
        id: "1",
        priority: "baja",
        createdAt: "2026-01-01T00:00:00.000Z",
      }),
      buildTask({
        id: "2",
        priority: "alta",
        createdAt: "2026-01-02T00:00:00.000Z",
      }),
      buildTask({
        id: "3",
        priority: "media",
        createdAt: "2026-01-03T00:00:00.000Z",
      }),
    ];

    const sorted = sortTasks(tasks);

    expect(sorted.map((task) => task.priority)).toEqual([
      "alta",
      "media",
      "baja",
    ]);
  });

  it("uses createdAt ascending as tiebreaker within same priority", () => {
    const tasks = [
      buildTask({
        id: "newer",
        priority: "media",
        createdAt: "2026-06-04T10:00:00.000Z",
      }),
      buildTask({
        id: "older",
        priority: "media",
        createdAt: "2026-06-04T08:00:00.000Z",
      }),
    ];

    const sorted = sortTasks(tasks);

    expect(sorted.map((task) => task.id)).toEqual(["older", "newer"]);
  });
});
