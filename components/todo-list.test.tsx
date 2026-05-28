import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TodoList } from "@/components/todo-list";
import type { Todo } from "@/lib/todos";

const sampleTodo: Todo = {
  id: "todo-1",
  description: "Comprar leche",
  priority: "medium",
  status: "pending",
  due_at: null,
  created_at: "2026-05-27T12:00:00.000Z",
};

describe("TodoList — SC-04", () => {
  it("muestra descripción y prioridad en español", () => {
    render(<TodoList todos={[sampleTodo]} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText("Comprar leche")).toBeInTheDocument();
    expect(screen.getByText("media")).toBeInTheDocument();
  });

  it("SC-04: invoca onDelete al confirmar eliminación", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(<TodoList todos={[sampleTodo]} onEdit={vi.fn()} onDelete={onDelete} />);

    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(onDelete).toHaveBeenCalledWith("todo-1");
  });
});
