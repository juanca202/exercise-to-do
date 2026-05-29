import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { aTodo } from "../testing/todo-mothers";
import { TodoListItem } from "./todo-list-item";

describe("TodoListItem", () => {
  it("shows description, formatted date and priority badge", () => {
    render(
      <TodoListItem
        todo={aTodo({
          description: "Revisar informe",
          dueDate: "2026-06-15",
          priority: "alta",
          status: "pendiente",
        })}
      />,
    );

    expect(screen.getByText("Revisar informe")).toBeInTheDocument();
    expect(screen.getByText(/15\/06\/2026/)).toBeInTheDocument();
    expect(screen.getByText("Alta")).toHaveClass("bg-red-100");
  });

  it("defaults to pendiente styling", () => {
    render(
      <TodoListItem
        todo={aTodo({ status: "pendiente", description: "Pendiente" })}
      />,
    );

    const description = screen.getByText("Pendiente");
    expect(description).not.toHaveClass("line-through");
  });

  it("toggles completed styles and calls onToggleStatus", async () => {
    const user = userEvent.setup();
    const onToggleStatus = vi.fn();

    const { rerender } = render(
      <TodoListItem
        todo={aTodo({
          id: "t1",
          status: "pendiente",
          description: "Toggle me",
        })}
        onToggleStatus={onToggleStatus}
      />,
    );

    await user.click(screen.getByRole("checkbox", { name: /completada/i }));

    expect(onToggleStatus).toHaveBeenCalledWith("t1");

    rerender(
      <TodoListItem
        todo={aTodo({
          id: "t1",
          status: "completada",
          description: "Toggle me",
          priority: "alta",
        })}
        onToggleStatus={onToggleStatus}
      />,
    );

    expect(screen.getByText("Toggle me")).toHaveClass("line-through");
    expect(screen.getByText("Alta")).toHaveClass("bg-red-100");
  });

  it("calls onEdit and onDelete when buttons clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <TodoListItem
        todo={aTodo({ id: "action-1" })}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByRole("button", { name: /editar/i }));
    await user.click(screen.getByRole("button", { name: /eliminar/i }));

    expect(onEdit).toHaveBeenCalledWith("action-1");
    expect(onDelete).toHaveBeenCalledWith("action-1");
  });
});
