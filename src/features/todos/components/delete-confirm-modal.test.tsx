import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useTodoStore } from "../store/todo-store";
import { aTodo } from "../testing/todo-mothers";
import { DeleteConfirmModal } from "./delete-confirm-modal";

describe("DeleteConfirmModal", () => {
  const onOpenChange = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    onOpenChange.mockClear();
    useTodoStore.setState({
      todos: [aTodo({ id: "del-1", description: "Eliminar esto" })],
      isHydrated: true,
      storageError: null,
    });
  });

  it("deletes todo on confirm", async () => {
    const user = userEvent.setup();

    render(
      <DeleteConfirmModal open todoId="del-1" onOpenChange={onOpenChange} />,
    );

    await user.click(screen.getByRole("button", { name: /^eliminar$/i }));

    expect(useTodoStore.getState().todos).toHaveLength(0);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not delete on cancel", async () => {
    const user = userEvent.setup();

    render(
      <DeleteConfirmModal open todoId="del-1" onOpenChange={onOpenChange} />,
    );

    await user.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(useTodoStore.getState().todos).toHaveLength(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
