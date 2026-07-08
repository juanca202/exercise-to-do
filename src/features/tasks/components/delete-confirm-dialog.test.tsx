import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";

describe("DeleteConfirmDialog", () => {
  it("does not render its content when closed", () => {
    // Arrange
    render(
      <DeleteConfirmDialog
        open={false}
        taskDescription="Comprar café"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    // Assert
    expect(screen.queryByText(/Comprar café/)).not.toBeInTheDocument();
  });

  it("shows the task description when open", () => {
    // Arrange
    render(
      <DeleteConfirmDialog
        open
        taskDescription="Comprar café"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByText(/Comprar café/)).toBeInTheDocument();
  });

  it("calls onConfirm when the user confirms deletion", async () => {
    // Arrange
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <DeleteConfirmDialog
        open
        taskDescription="Comprar café"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />,
    );

    // Act
    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    // Assert
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("calls onCancel when the user cancels", async () => {
    // Arrange
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(
      <DeleteConfirmDialog
        open
        taskDescription="Comprar café"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );

    // Act
    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    // Assert
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("calls onCancel without confirming when the user presses Escape", async () => {
    // Arrange
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <DeleteConfirmDialog
        open
        taskDescription="Comprar café"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );

    // Act
    await user.keyboard("{Escape}");

    // Assert
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
