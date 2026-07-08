import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Task } from "../types";
import { TaskList } from "./task-list";

function aTask(overrides: Partial<Task>): Task {
  return {
    id: "id",
    description: "desc",
    dueDate: "2026-07-10",
    priority: "media",
    completed: false,
    createdAt: 0,
    ...overrides,
  };
}

describe("TaskList", () => {
  it("shows an empty state when there are no tasks", () => {
    // Arrange
    render(
      <TaskList
        tasks={[]}
        onToggleCompleted={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByText(/no tienes tareas/i)).toBeInTheDocument();
  });

  it("does not show the empty state when there are tasks", () => {
    // Arrange
    render(
      <TaskList
        tasks={[aTask({ id: "1", description: "Comprar café" })]}
        onToggleCompleted={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    // Assert
    expect(screen.queryByText(/no tienes tareas/i)).not.toBeInTheDocument();
    expect(screen.getByText("Comprar café")).toBeInTheDocument();
  });

  it("renders tasks sorted by priority, then status, then creation order", () => {
    // Arrange
    const tasks = [
      aTask({
        id: "1",
        description: "Baja pendiente",
        priority: "baja",
        createdAt: 1,
      }),
      aTask({
        id: "2",
        description: "Alta completada",
        priority: "alta",
        completed: true,
        createdAt: 2,
      }),
      aTask({
        id: "3",
        description: "Alta pendiente",
        priority: "alta",
        createdAt: 3,
      }),
    ];
    render(
      <TaskList
        tasks={tasks}
        onToggleCompleted={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    // Act
    const items = screen
      .getAllByRole("listitem")
      .map((item) => item.textContent);

    // Assert: pendientes por prioridad primero, completadas al final
    expect(items[0]).toContain("Alta pendiente");
    expect(items[1]).toContain("Baja pendiente");
    expect(items[2]).toContain("Alta completada");
  });
});
