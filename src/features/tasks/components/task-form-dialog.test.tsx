import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TaskFormDialog } from "./task-form-dialog";

function fillDescription(value: string) {
  fireEvent.change(screen.getByLabelText("Descripción"), {
    target: { value },
  });
}

function fillDueDate(value: string) {
  fireEvent.change(screen.getByLabelText("Fecha de vencimiento"), {
    target: { value },
  });
}

async function selectPriority(
  user: ReturnType<typeof userEvent.setup>,
  label: string,
) {
  await user.click(screen.getByRole("combobox", { name: "Prioridad" }));
  await user.click(await screen.findByRole("option", { name: label }));
}

describe("TaskFormDialog", () => {
  it("does not render its fields when closed", () => {
    // Arrange
    render(
      <TaskFormDialog
        open={false}
        mode="create"
        onSubmit={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    // Assert
    expect(screen.queryByLabelText("Descripción")).not.toBeInTheDocument();
  });

  it("renders empty fields in create mode", () => {
    // Arrange
    render(
      <TaskFormDialog
        open
        mode="create"
        onSubmit={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByLabelText("Descripción")).toHaveValue("");
    expect(screen.getByLabelText("Fecha de vencimiento")).toHaveValue("");
    expect(screen.getByRole("button", { name: "Crear" })).toBeInTheDocument();
  });

  it("preloads existing values in edit mode", () => {
    // Arrange
    render(
      <TaskFormDialog
        open
        mode="edit"
        initialValues={{
          description: "Comprar café",
          dueDate: "2026-07-10",
          priority: "alta",
        }}
        onSubmit={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByLabelText("Descripción")).toHaveValue("Comprar café");
    expect(screen.getByLabelText("Fecha de vencimiento")).toHaveValue(
      "2026-07-10",
    );
    expect(
      screen.getByRole("combobox", { name: "Prioridad" }),
    ).toHaveTextContent("Alta");
    expect(screen.getByRole("button", { name: "Guardar" })).toBeInTheDocument();
  });

  it("submits the entered values and closes on success", async () => {
    // Arrange
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockReturnValue({ success: true });
    const onClose = vi.fn();
    render(
      <TaskFormDialog
        open
        mode="create"
        onSubmit={onSubmit}
        onClose={onClose}
      />,
    );

    // Act
    fillDescription("Comprar café");
    fillDueDate("2026-07-08");
    await selectPriority(user, "Alta");
    await user.click(screen.getByRole("button", { name: "Crear" }));

    // Assert
    expect(onSubmit).toHaveBeenCalledWith({
      description: "Comprar café",
      dueDate: "2026-07-08",
      priority: "alta",
    });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("shows validation errors and does not close when submission fails", async () => {
    // Arrange
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockReturnValue({
      success: false,
      errors: { description: "La descripción es obligatoria." },
    });
    const onClose = vi.fn();
    render(
      <TaskFormDialog
        open
        mode="create"
        onSubmit={onSubmit}
        onClose={onClose}
      />,
    );

    // Act
    fillDueDate("2026-07-08");
    await user.click(screen.getByRole("button", { name: "Crear" }));

    // Assert
    expect(
      screen.getByText("La descripción es obligatoria."),
    ).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes without submitting when the user cancels", async () => {
    // Arrange
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onClose = vi.fn();
    render(
      <TaskFormDialog
        open
        mode="create"
        onSubmit={onSubmit}
        onClose={onClose}
      />,
    );

    // Act
    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    // Assert
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("closes without submitting when the user presses Escape", async () => {
    // Arrange
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onClose = vi.fn();
    render(
      <TaskFormDialog
        open
        mode="create"
        onSubmit={onSubmit}
        onClose={onClose}
      />,
    );

    // Act
    await user.keyboard("{Escape}");

    // Assert
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledOnce();
  });
});
