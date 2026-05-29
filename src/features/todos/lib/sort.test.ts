import { describe, expect, it } from "vitest";

import { sortTodosByPriority } from "./sort";
import { aTodo } from "../testing/todo-mothers";

describe("sortTodosByPriority", () => {
  it("orders alta → media → baja", () => {
    const sorted = sortTodosByPriority([
      aTodo({ id: "b", priority: "baja" }),
      aTodo({ id: "a", priority: "alta" }),
      aTodo({ id: "m", priority: "media" }),
    ]);

    expect(sorted.map((t) => t.priority)).toEqual(["alta", "media", "baja"]);
  });

  it("tie-breaks by createdAt ascending within same priority", () => {
    const sorted = sortTodosByPriority([
      aTodo({
        id: "newer",
        priority: "media",
        createdAt: "2026-05-29T12:00:00.000Z",
      }),
      aTodo({
        id: "older",
        priority: "media",
        createdAt: "2026-05-29T10:00:00.000Z",
      }),
    ]);

    expect(sorted.map((t) => t.id)).toEqual(["older", "newer"]);
  });

  it("tie-breaks by id when createdAt is identical", () => {
    const createdAt = "2026-05-29T10:00:00.000Z";
    const sorted = sortTodosByPriority([
      aTodo({ id: "b-id", priority: "alta", createdAt }),
      aTodo({ id: "a-id", priority: "alta", createdAt }),
    ]);

    expect(sorted.map((t) => t.id)).toEqual(["a-id", "b-id"]);
  });
});
