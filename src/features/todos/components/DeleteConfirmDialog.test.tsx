import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

describe("DeleteConfirmDialog", () => {
  it("confirms deletion", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <DeleteConfirmDialog
        onConfirm={onConfirm}
        onOpenChange={onOpenChange}
        open
        taskDescription="Tarea a eliminar"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("cancels deletion", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <DeleteConfirmDialog
        onConfirm={onConfirm}
        onOpenChange={vi.fn()}
        open
        taskDescription="Tarea a eliminar"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onConfirm).not.toHaveBeenCalled();
  });
});
