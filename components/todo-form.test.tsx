import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TodoForm } from "@/components/todo-form";

describe("TodoForm — SC-01 / SC-02", () => {
  it("SC-01: crea tarea con título y prioridad válidos", async () => {
    const user = userEvent.setup();
    const onCreated = vi.fn();

    render(<TodoForm onCreated={onCreated} />);

    await user.type(screen.getByLabelText("Título"), "Comprar leche");
    await user.selectOptions(screen.getByLabelText("Prioridad"), "high");
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onCreated).toHaveBeenCalledOnce();
    expect(onCreated.mock.calls[0][0]).toMatchObject({
      description: "Comprar leche",
      priority: "high",
    });
  });

  it("SC-02: impide creación sin título y muestra error", async () => {
    const user = userEvent.setup();
    const onCreated = vi.fn();

    render(<TodoForm onCreated={onCreated} />);

    await user.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onCreated).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("La descripción es obligatoria.");
  });

  it("SC-03: edita título y prioridad en modo edición", async () => {
    const user = userEvent.setup();
    const onSaved = vi.fn();
    const editingTodo = {
      id: "todo-1",
      description: "Comprar leche",
      priority: "medium" as const,
      status: "pending" as const,
      due_at: null,
      created_at: "2026-05-27T12:00:00.000Z",
    };

    render(
      <TodoForm key="todo-1" editingTodo={editingTodo} onSaved={onSaved} onCancel={vi.fn()} />,
    );

    const titleInput = screen.getByLabelText("Título");
    await user.clear(titleInput);
    await user.type(titleInput, "Comprar pan");
    await user.selectOptions(screen.getByLabelText("Prioridad"), "high");
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onSaved).toHaveBeenCalledOnce();
    expect(onSaved.mock.calls[0][0]).toMatchObject({
      id: "todo-1",
      description: "Comprar pan",
      priority: "high",
      created_at: editingTodo.created_at,
    });
  });
});
