import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useTodoStore } from "../store/todo-store";
import { aTodo } from "../testing/todo-mothers";
import { TodoList } from "./todo-list";

describe("TodoList", () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({
      todos: [
        aTodo({
          id: "low",
          description: "Baja prio",
          priority: "baja",
          createdAt: "2026-05-29T12:00:00.000Z",
        }),
        aTodo({
          id: "high",
          description: "Alta prio",
          priority: "alta",
          createdAt: "2026-05-29T10:00:00.000Z",
        }),
      ],
      isHydrated: true,
      storageError: null,
    });
  });

  it("renders todos in priority order", () => {
    render(<TodoList />);

    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Alta prio");
    expect(items[1]).toHaveTextContent("Baja prio");
  });

  it("reorders when priority changes in store", () => {
    const { rerender } = render(<TodoList />);

    useTodoStore.setState({
      todos: [
        aTodo({
          id: "low",
          description: "Baja prio",
          priority: "alta",
          createdAt: "2026-05-29T12:00:00.000Z",
        }),
        aTodo({
          id: "high",
          description: "Alta prio",
          priority: "baja",
          createdAt: "2026-05-29T10:00:00.000Z",
        }),
      ],
    });

    rerender(<TodoList />);

    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Baja prio");
    expect(items[1]).toHaveTextContent("Alta prio");
  });
});
