import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { useTaskStore } from "../stores/task-store";
import { TasksPage } from "./tasks-page";

describe("TasksPage", () => {
  beforeEach(() => {
    localStorage.clear();
    useTaskStore.setState({ tasks: [] });
  });

  it("shows the empty state when there are no tasks", () => {
    // Arrange
    render(<TasksPage />);

    // Assert
    expect(screen.getByText(/no tienes tareas/i)).toBeInTheDocument();
  });

  it("creates a task through the dialog and lists it", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<TasksPage />);

    // Act
    await user.click(screen.getByRole("button", { name: "Nueva tarea" }));
    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Comprar café" },
    });
    fireEvent.change(screen.getByLabelText("Fecha de vencimiento"), {
      target: { value: "2999-01-01" },
    });
    await user.click(screen.getByRole("button", { name: "Crear" }));

    // Assert
    expect(screen.getByText("Comprar café")).toBeInTheDocument();
    expect(screen.queryByText(/no tienes tareas/i)).not.toBeInTheDocument();
  });

  it("completes and deletes a task end-to-end", async () => {
    // Arrange
    const user = userEvent.setup();
    useTaskStore.getState().addTask({
      description: "Comprar café",
      dueDate: "2999-01-01",
      priority: "alta",
    });
    render(<TasksPage />);
    const item = screen.getByRole("listitem");

    // Act: completar
    await user.click(within(item).getByRole("checkbox"));

    // Assert
    expect(screen.getByText("Comprar café")).toHaveClass("line-through");

    // Act: eliminar con confirmación
    await user.click(
      within(item).getByRole("button", { name: "Eliminar tarea" }),
    );
    await user.click(await screen.findByRole("button", { name: "Eliminar" }));

    // Assert
    expect(screen.getByText(/no tienes tareas/i)).toBeInTheDocument();
  });
});
