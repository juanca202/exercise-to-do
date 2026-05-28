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

describe("TodosApp — escenarios US-002", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function getListItems() {
    const list = screen.getByRole("list", { name: "Listado de tareas" });
    return within(list).getAllByRole("listitem");
  }

  async function createTask(
    user: ReturnType<typeof userEvent.setup>,
    title: string,
    priority: "high" | "medium" | "low",
  ) {
    await user.type(screen.getByLabelText("Título"), title);
    await user.selectOptions(screen.getByLabelText("Prioridad"), priority);
    await user.click(screen.getByRole("button", { name: "Guardar" }));
  }

  it("SC-01: orden predeterminado alta → media → baja", async () => {
    const user = userEvent.setup();

    render(<TodosApp />);

    await createTask(user, "Tarea baja", "low");
    await createTask(user, "Tarea alta", "high");
    await createTask(user, "Tarea media", "medium");

    const items = getListItems();
    expect(items[0]).toHaveTextContent("Tarea alta");
    expect(items[1]).toHaveTextContent("Tarea media");
    expect(items[2]).toHaveTextContent("Tarea baja");
  });

  it("SC-02: reordena al editar prioridad", async () => {
    const user = userEvent.setup();

    render(<TodosApp />);

    await createTask(user, "Revisar correo", "low");
    await createTask(user, "Otra urgente", "high");

    let items = getListItems();
    expect(items[0]).toHaveTextContent("Otra urgente");
    expect(items[1]).toHaveTextContent("Revisar correo");

    await user.click(within(items[1]).getByRole("button", { name: "Editar" }));
    await user.selectOptions(screen.getByLabelText("Prioridad"), "high");
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    items = getListItems();
    expect(items[0]).toHaveTextContent("Revisar correo");
    expect(items[1]).toHaveTextContent("Otra urgente");
    for (const item of items) {
      expect(within(item).getByText("alta")).toBeInTheDocument();
    }
  });

  it("SC-03: muestra prioridad visible en cada ítem", async () => {
    const user = userEvent.setup();

    render(<TodosApp />);

    await createTask(user, "Con prioridad", "medium");

    const item = getListItems()[0];
    expect(within(item).getByText("media")).toBeInTheDocument();
  });

  it("SC-04: estabilidad por fecha de creación dentro de la misma prioridad", async () => {
    const user = userEvent.setup();

    render(<TodosApp />);

    await createTask(user, "A", "medium");
    await createTask(user, "B", "medium");

    const items = getListItems();
    expect(items[0]).toHaveTextContent("A");
    expect(items[1]).toHaveTextContent("B");
  });
});

describe("TodosApp — escenarios US-003", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  async function createTask(
    user: ReturnType<typeof userEvent.setup>,
    title: string,
    priority: "high" | "medium" | "low" = "medium",
  ) {
    await user.type(screen.getByLabelText("Título"), title);
    await user.selectOptions(screen.getByLabelText("Prioridad"), priority);
    await user.click(screen.getByRole("button", { name: "Guardar" }));
  }

  it("SC-01: marca tarea como completada conservando título y prioridad", async () => {
    const user = userEvent.setup();

    render(<TodosApp />);
    await createTask(user, "Pendiente", "high");

    const title = screen.getByText("Pendiente");
    await user.click(
      screen.getByRole("checkbox", { name: "Marcar «Pendiente» como completada" }),
    );

    const list = screen.getByRole("list", { name: "Listado de tareas" });
    expect(title).toHaveClass("line-through");
    expect(within(list).getByText("alta")).toBeInTheDocument();
    expect(loadTodos()[0]).toMatchObject({
      description: "Pendiente",
      priority: "high",
      status: "completed",
    });
  });

  it("SC-02: revierte tarea completada a pendiente", async () => {
    const user = userEvent.setup();

    render(<TodosApp />);
    await createTask(user, "Hecha");

    await user.click(
      screen.getByRole("checkbox", { name: "Marcar «Hecha» como completada" }),
    );
    await user.click(
      screen.getByRole("checkbox", { name: "Marcar «Hecha» como pendiente" }),
    );

    expect(screen.getByText("Hecha")).not.toHaveClass("line-through");
    expect(loadTodos()[0].status).toBe("pending");
  });

  it("SC-03: persiste estado completado tras recargar", async () => {
    const user = userEvent.setup();

    const { unmount } = render(<TodosApp />);
    await createTask(user, "Persistente");

    await user.click(
      screen.getByRole("checkbox", { name: "Marcar «Persistente» como completada" }),
    );

    unmount();
    render(<TodosApp />);

    expect(await screen.findByText("Persistente")).toHaveClass("line-through");
    expect(loadTodos()[0].status).toBe("completed");
  });

  it("SC-04: completadas mantienen orden por prioridad", async () => {
    const user = userEvent.setup();

    render(<TodosApp />);

    await createTask(user, "Baja pendiente", "low");
    await createTask(user, "Alta hecha", "high");

    const list = screen.getByRole("list", { name: "Listado de tareas" });
    await user.click(
      within(list).getByRole("checkbox", { name: "Marcar «Alta hecha» como completada" }),
    );

    const items = within(list).getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Alta hecha");
    expect(items[1]).toHaveTextContent("Baja pendiente");
    expect(within(items[0]).getByText("Alta hecha")).toHaveClass("line-through");
    expect(within(items[1]).getByText("Baja pendiente")).not.toHaveClass("line-through");
  });
});
