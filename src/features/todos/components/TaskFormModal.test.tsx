import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { buildTask } from "../testing/taskMother";
import { TaskFormModal } from "./TaskFormModal";

describe("TaskFormModal", () => {
  it("shows media as default priority in create mode", () => {
    render(
      <TaskFormModal
        mode="create"
        onOpenChange={vi.fn()}
        onSave={vi.fn(() => true)}
        open
      />,
    );

    expect(screen.getByLabelText(/Prioridad/i)).toHaveValue("media");
  });

  it("blocks save when description is empty", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn(() => true);

    render(
      <TaskFormModal
        mode="create"
        onOpenChange={vi.fn()}
        onSave={onSave}
        open
      />,
    );

    await user.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "La descripción es obligatoria",
    );
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave and closes when valid in create mode", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn(() => true);
    const onOpenChange = vi.fn();

    render(
      <TaskFormModal
        mode="create"
        onOpenChange={onOpenChange}
        onSave={onSave}
        open
      />,
    );

    await user.type(screen.getByRole("textbox"), "Comprar pan");
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onSave).toHaveBeenCalledWith({
      description: "Comprar pan",
      priority: "media",
      dueDate: null,
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not save when cancel is clicked", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn(() => true);

    render(
      <TaskFormModal
        mode="create"
        onOpenChange={vi.fn()}
        onSave={onSave}
        open
      />,
    );

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onSave).not.toHaveBeenCalled();
  });

  it("prefills fields in edit mode and allows clearing due date", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn(() => true);
    const task = buildTask({
      description: "Editar esto",
      priority: "alta",
      dueDate: "2026-12-01",
    });

    render(
      <TaskFormModal
        mode="edit"
        onOpenChange={vi.fn()}
        onSave={onSave}
        open
        task={task}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Editar tarea" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("Editar esto");
    expect(screen.getByLabelText(/Prioridad/i)).toHaveValue("alta");

    await user.clear(screen.getByLabelText(/Fecha de vencimiento/i));
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onSave).toHaveBeenCalledWith({
      description: "Editar esto",
      priority: "alta",
      dueDate: null,
    });
  });
});
