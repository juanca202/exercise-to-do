import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useTodoStore } from "../store/todo-store";
import { TaskFormModal } from "./task-form-modal";

describe("TaskFormModal", () => {
  const onOpenChange = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    onOpenChange.mockClear();
    useTodoStore.setState({
      todos: [],
      isHydrated: true,
      storageError: null,
    });
  });

  describe("create mode", () => {
    it("creates a todo when form is valid", async () => {
      const user = userEvent.setup();

      render(<TaskFormModal open mode="create" onOpenChange={onOpenChange} />);

      await user.type(screen.getByLabelText(/descripción/i), "Comprar leche");
      await user.type(screen.getByLabelText(/fecha/i), "2026-08-15");
      await user.selectOptions(screen.getByLabelText(/prioridad/i), "alta");
      await user.click(screen.getByRole("button", { name: /guardar/i }));

      await waitFor(() => {
        expect(useTodoStore.getState().todos).toHaveLength(1);
      });
      expect(useTodoStore.getState().todos[0].description).toBe(
        "Comprar leche",
      );
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("shows validation errors for empty fields", async () => {
      const user = userEvent.setup();

      render(<TaskFormModal open mode="create" onOpenChange={onOpenChange} />);

      await user.click(screen.getByRole("button", { name: /guardar/i }));

      expect(
        await screen.findByText(/descripción es obligatoria/i),
      ).toBeInTheDocument();
      expect(useTodoStore.getState().todos).toHaveLength(0);
    });

    it("cancels without creating", async () => {
      const user = userEvent.setup();

      render(<TaskFormModal open mode="create" onOpenChange={onOpenChange} />);

      await user.type(screen.getByLabelText(/descripción/i), "No guardar");
      await user.click(screen.getByRole("button", { name: /cancelar/i }));

      expect(useTodoStore.getState().todos).toHaveLength(0);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("edit mode", () => {
    beforeEach(() => {
      useTodoStore.setState({
        todos: [
          {
            id: "edit-1",
            description: "Original",
            dueDate: "2026-06-01",
            priority: "media",
            status: "pendiente",
            createdAt: "2026-05-29T10:00:00.000Z",
          },
        ],
        isHydrated: true,
        storageError: null,
      });
    });

    it("preloads data and updates todo", async () => {
      const user = userEvent.setup();

      render(
        <TaskFormModal
          open
          mode="edit"
          todoId="edit-1"
          onOpenChange={onOpenChange}
        />,
      );

      const description = screen.getByLabelText(/descripción/i);
      expect(description).toHaveValue("Original");

      await user.clear(description);
      await user.type(description, "Actualizada");
      await user.click(screen.getByRole("button", { name: /guardar/i }));

      await waitFor(() => {
        expect(useTodoStore.getState().todos[0].description).toBe(
          "Actualizada",
        );
      });
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("cancels without saving changes", async () => {
      const user = userEvent.setup();

      render(
        <TaskFormModal
          open
          mode="edit"
          todoId="edit-1"
          onOpenChange={onOpenChange}
        />,
      );

      await user.clear(screen.getByLabelText(/descripción/i));
      await user.type(screen.getByLabelText(/descripción/i), "Descartada");
      await user.click(screen.getByRole("button", { name: /cancelar/i }));

      expect(useTodoStore.getState().todos[0].description).toBe("Original");
    });
  });
});
