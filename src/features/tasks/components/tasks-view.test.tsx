import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { useTaskStore } from "../store";
import { TasksView } from "./tasks-view";

async function openCreateDialog(
  user: ReturnType<typeof userEvent.setup>,
): Promise<HTMLElement> {
  await user.click(screen.getByRole("button", { name: "Nueva tarea" }));
  const dialog = await screen.findByTestId("task-dialog");
  expect(
    within(dialog).getByRole("form", { name: "Crear tarea" }),
  ).toBeInTheDocument();
  return dialog;
}

describe("TasksView", () => {
  beforeEach(() => {
    localStorage.clear();
    useTaskStore.setState({ tasks: [] });
  });

  it("shows empty state after hydration", async () => {
    render(<TasksView />);
    expect(await screen.findByTestId("empty-tasks")).toBeInTheDocument();
  });

  it("creates a task from the modal form", async () => {
    const user = userEvent.setup();
    render(<TasksView />);
    await screen.findByTestId("empty-tasks");
    const dialog = await openCreateDialog(user);

    await user.type(
      within(dialog).getByLabelText("Descripción"),
      "Comprar materiales",
    );
    await user.type(
      within(dialog).getByLabelText("Fecha de vencimiento"),
      "2026-07-20",
    );
    await user.click(
      within(dialog).getByRole("button", { name: "Crear tarea" }),
    );

    await waitFor(() => {
      expect(screen.queryByTestId("task-dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("task-description")).toHaveTextContent(
      "Comprar materiales",
    );
    expect(screen.queryByTestId("empty-tasks")).not.toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    render(<TasksView />);
    await screen.findByTestId("empty-tasks");
    const dialog = await openCreateDialog(user);

    await user.click(
      within(dialog).getByRole("button", { name: "Crear tarea" }),
    );

    expect(
      await within(dialog).findByText("La descripción es obligatoria"),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText("La fecha de vencimiento es obligatoria"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("task-dialog")).toBeInTheDocument();
    expect(screen.getByTestId("empty-tasks")).toBeInTheDocument();
  });

  it("shows strikethrough styling when a task is completed", async () => {
    const user = userEvent.setup();
    useTaskStore.getState().addTask({
      description: "Completable",
      dueDate: "2026-07-20",
      priority: "medium",
    });

    render(<TasksView />);
    await screen.findByTestId("task-item");

    await user.click(
      screen.getByRole("checkbox", {
        name: /Marcar "Completable" como completada/,
      }),
    );

    await waitFor(() => {
      expect(screen.getByTestId("task-item")).toHaveAttribute(
        "data-completed",
        "true",
      );
    });
    expect(screen.getByTestId("task-description")).toHaveClass("line-through");
  });

  it("edits and deletes a task from the list", async () => {
    const user = userEvent.setup();
    useTaskStore.getState().addTask({
      description: "Editable",
      dueDate: "2026-07-20",
      priority: "low",
    });

    render(<TasksView />);
    await screen.findByTestId("task-item");

    await user.click(screen.getByRole("button", { name: "Editar" }));
    const dialog = await screen.findByTestId("task-dialog");
    expect(
      within(dialog).getByRole("form", { name: "Editar tarea" }),
    ).toBeInTheDocument();

    const description = within(dialog).getByLabelText("Descripción");
    await user.clear(description);
    await user.type(description, "Editada");
    await user.click(
      within(dialog).getByRole("button", { name: "Guardar cambios" }),
    );

    await waitFor(() => {
      expect(screen.queryByTestId("task-dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("task-description")).toHaveTextContent("Editada");

    await user.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(await screen.findByTestId("empty-tasks")).toBeInTheDocument();
  });

  it("cancels an in-progress edit without confirmation", async () => {
    const user = userEvent.setup();
    useTaskStore.getState().addTask({
      description: "Sin cambios",
      dueDate: "2026-07-20",
      priority: "medium",
    });

    render(<TasksView />);
    await screen.findByTestId("task-item");
    await user.click(screen.getByRole("button", { name: "Editar" }));
    const dialog = await screen.findByTestId("task-dialog");
    await user.type(within(dialog).getByLabelText("Descripción"), " borrador");
    await user.click(within(dialog).getByRole("button", { name: "Cancelar" }));

    await waitFor(() => {
      expect(screen.queryByTestId("task-dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("task-description")).toHaveTextContent(
      "Sin cambios",
    );
  });
});
