import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach } from "vitest";

import { TodosApp } from "@/components/todos-app";
import { loadTodos, STORAGE_KEY } from "@/lib/todos";

describe("TodosApp — escenarios US-001", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("SC-01: la tarea creada aparece en el listado con título y prioridad", async () => {
    const user = userEvent.setup();

    render(<TodosApp />);

    await user.type(screen.getByLabelText("Título"), "Comprar leche");
    await user.selectOptions(screen.getByLabelText("Prioridad"), "high");
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    const list = screen.getByRole("list", { name: "Listado de tareas" });
    expect(within(list).getByText("Comprar leche")).toBeInTheDocument();
    expect(within(list).getByText("alta")).toBeInTheDocument();
  });

  it("SC-02: no registra tarea sin título", async () => {
    const user = userEvent.setup();

    render(<TodosApp />);

    await user.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/no hay tareas/i)).toBeInTheDocument();
    expect(loadTodos()).toEqual([]);
  });

  it("SC-03: edita título y prioridad en el listado", async () => {
    const user = userEvent.setup();

    render(<TodosApp />);

    await user.type(screen.getByLabelText("Título"), "Comprar leche");
    await user.click(screen.getByRole("button", { name: "Guardar" }));
    await user.click(screen.getByRole("button", { name: "Editar" }));

    const titleInput = screen.getByLabelText("Título");
    await user.clear(titleInput);
    await user.type(titleInput, "Comprar pan");
    await user.selectOptions(screen.getByLabelText("Prioridad"), "high");
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    const list = screen.getByRole("list", { name: "Listado de tareas" });
    expect(within(list).getByText("Comprar pan")).toBeInTheDocument();
    expect(within(list).getByText("alta")).toBeInTheDocument();
    expect(within(list).queryByText("Comprar leche")).not.toBeInTheDocument();
  });

  it("SC-04: elimina tarea del listado y de localStorage", async () => {
    const user = userEvent.setup();

    render(<TodosApp />);

    await user.type(screen.getByLabelText("Título"), "Tarea temporal");
    await user.click(screen.getByRole("button", { name: "Guardar" }));
    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(screen.queryByText("Tarea temporal")).not.toBeInTheDocument();
    expect(loadTodos()).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBe("[]");
  });

  it("SC-05: persiste tareas tras recargar el componente", async () => {
    const user = userEvent.setup();

    const { unmount } = render(<TodosApp />);

    await user.type(screen.getByLabelText("Título"), "Persistente");
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    unmount();
    render(<TodosApp />);

    expect(await screen.findByText("Persistente")).toBeInTheDocument();
    expect(loadTodos()).toHaveLength(1);
  });
});
