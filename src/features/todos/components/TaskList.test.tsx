import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { buildTask } from "../testing/taskMother";
import { TaskList } from "./TaskList";

describe("TaskList", () => {
  it("shows empty state when there are no tasks", () => {
    render(
      <TaskList
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        onToggleComplete={vi.fn()}
        tasks={[]}
      />,
    );

    expect(screen.getByTestId("empty-state")).toHaveTextContent(
      "No tienes tareas. Crea una nueva para comenzar.",
    );
  });

  it("renders tasks in provided order", () => {
    const tasks = [
      buildTask({ id: "1", description: "Primera", priority: "alta" }),
      buildTask({ id: "2", description: "Segunda", priority: "media" }),
      buildTask({ id: "3", description: "Tercera", priority: "baja" }),
    ];

    render(
      <TaskList
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        onToggleComplete={vi.fn()}
        tasks={tasks}
      />,
    );

    const items = screen.getAllByRole("article");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Primera");
    expect(items[1]).toHaveTextContent("Segunda");
    expect(items[2]).toHaveTextContent("Tercera");
  });
});
