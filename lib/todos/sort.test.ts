import { describe, expect, it } from "vitest";

import { createTodo } from "./factory";
import { sortTodosByPriority } from "./sort";
import type { Todo } from "./types";

function withCreatedAt(todo: Todo, createdAt: string): Todo {
  return { ...todo, created_at: createdAt };
}

describe("sortTodosByPriority", () => {
  it("ordena alta → media → baja", () => {
    const high = createTodo({ description: "Alta", priority: "high" });
    const medium = createTodo({ description: "Media", priority: "medium" });
    const low = createTodo({ description: "Baja", priority: "low" });

    const sorted = sortTodosByPriority([low, medium, high]);

    expect(sorted.map((todo) => todo.priority)).toEqual(["high", "medium", "low"]);
  });

  it("mantiene orden por created_at dentro de la misma prioridad", () => {
    const first = withCreatedAt(
      createTodo({ description: "A", priority: "medium" }),
      "2026-05-01T10:00:00.000Z",
    );
    const second = withCreatedAt(
      createTodo({ description: "B", priority: "medium" }),
      "2026-05-02T10:00:00.000Z",
    );

    const sorted = sortTodosByPriority([second, first]);

    expect(sorted.map((todo) => todo.description)).toEqual(["A", "B"]);
  });

  it("no muta el array original", () => {
    const todos = [createTodo({ description: "Baja", priority: "low" })];
    const copy = [...todos];

    sortTodosByPriority(todos);

    expect(todos).toEqual(copy);
  });
});
