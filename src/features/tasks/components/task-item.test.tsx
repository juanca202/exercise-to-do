import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Task } from "../types";
import { TaskItem } from "./task-item";

function aTask(overrides: Partial<Task> = {}): Task {
  return {
    id: "task-1",
    description: "Comprar café",
    dueDate: "2026-07-10",
    priority: "alta",
    completed: false,
    createdAt: 0,
    ...overrides,
  };
}

describe("TaskItem", () => {
  it("renders description, due date and priority", () => {
    // Arrange
    render(
      <TaskItem
        task={aTask()}
        onToggleCompleted={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByText("Comprar café")).toBeInTheDocument();
    expect(screen.getByText("2026-07-10")).toBeInTheDocument();
    expect(screen.getByText("Alta")).toBeInTheDocument();
  });

  it("visually distinguishes a completed task", () => {
    // Arrange
    render(
      <TaskItem
        task={aTask({ completed: true })}
        onToggleCompleted={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByText("Comprar café")).toHaveClass("line-through");
  });

  it("does not distinguish a pending task", () => {
    // Arrange
    render(
      <TaskItem
        task={aTask({ completed: false })}
        onToggleCompleted={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByText("Comprar café")).not.toHaveClass("line-through");
  });

  it("calls onToggleCompleted when the checkbox is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    const onToggleCompleted = vi.fn();
    render(
      <TaskItem
        task={aTask()}
        onToggleCompleted={onToggleCompleted}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    // Act
    await user.click(screen.getByRole("checkbox"));

    // Assert
    expect(onToggleCompleted).toHaveBeenCalledWith("task-1");
  });

  it("opens the edit form pre-filled and submits the update", async () => {
    // Arrange
    const user = userEvent.setup();
    const onUpdate = vi.fn().mockReturnValue({ success: true });
    render(
      <TaskItem
        task={aTask()}
        onToggleCompleted={vi.fn()}
        onUpdate={onUpdate}
        onDelete={vi.fn()}
      />,
    );

    // Act
    await user.click(screen.getByRole("button", { name: "Editar" }));
    expect(screen.getByLabelText("Descripción")).toHaveValue("Comprar café");
    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Comprar pan" },
    });
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    // Assert
    expect(onUpdate).toHaveBeenCalledWith("task-1", {
      description: "Comprar pan",
      dueDate: "2026-07-10",
      priority: "alta",
    });
  });

  it("asks for confirmation before deleting and calls onDelete when confirmed", async () => {
    // Arrange
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(
      <TaskItem
        task={aTask()}
        onToggleCompleted={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={onDelete}
      />,
    );

    // Act
    await user.click(screen.getByRole("button", { name: "Eliminar tarea" }));
    await user.click(await screen.findByRole("button", { name: "Eliminar" }));

    // Assert
    expect(onDelete).toHaveBeenCalledWith("task-1");
  });

  it("does not delete when the user cancels the confirmation", async () => {
    // Arrange
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(
      <TaskItem
        task={aTask()}
        onToggleCompleted={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={onDelete}
      />,
    );

    // Act
    await user.click(screen.getByRole("button", { name: "Eliminar tarea" }));
    await user.click(await screen.findByRole("button", { name: "Cancelar" }));

    // Assert
    expect(onDelete).not.toHaveBeenCalled();
  });
});
