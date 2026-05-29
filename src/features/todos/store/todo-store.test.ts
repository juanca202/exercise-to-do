import { beforeEach, describe, expect, it, vi } from "vitest";

import * as localStorageModule from "@/lib/storage/local-storage";

import { TODOS_STORAGE_KEY } from "../lib/constants";
import { useTodoStore } from "./todo-store";

describe("useTodoStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({
      todos: [],
      isHydrated: false,
      storageError: null,
    });
  });

  it("hydrates from localStorage", () => {
    localStorage.setItem(
      TODOS_STORAGE_KEY,
      JSON.stringify([
        {
          id: "1",
          description: "Persistida",
          dueDate: "2026-06-01",
          priority: "alta",
          status: "pendiente",
          createdAt: "2026-05-29T10:00:00.000Z",
        },
      ]),
    );

    useTodoStore.getState().hydrate();

    expect(useTodoStore.getState().isHydrated).toBe(true);
    expect(useTodoStore.getState().todos).toHaveLength(1);
  });

  it("clears storage error", () => {
    useTodoStore.setState({ storageError: "Error previo" });
    useTodoStore.getState().clearStorageError();
    expect(useTodoStore.getState().storageError).toBeNull();
  });

  it("creates and persists a todo", () => {
    useTodoStore.getState().hydrate();

    const result = useTodoStore.getState().createTodo({
      description: "Nueva",
      dueDate: "2026-07-01",
      priority: "media",
    });

    expect(result.success).toBe(true);
    expect(useTodoStore.getState().todos).toHaveLength(1);

    const stored = JSON.parse(
      localStorage.getItem(TODOS_STORAGE_KEY) ?? "[]",
    ) as unknown[];
    expect(stored).toHaveLength(1);
  });

  it("updates a todo", () => {
    useTodoStore.getState().hydrate();
    useTodoStore.getState().createTodo({
      description: "Original",
      dueDate: "2026-07-01",
      priority: "baja",
    });

    const id = useTodoStore.getState().todos[0].id;
    useTodoStore.getState().updateTodo({
      id,
      description: "Actualizada",
      dueDate: "2026-08-01",
      priority: "alta",
    });

    expect(useTodoStore.getState().todos[0].description).toBe("Actualizada");
    expect(useTodoStore.getState().todos[0].priority).toBe("alta");
  });

  it("deletes a todo", () => {
    useTodoStore.getState().hydrate();
    useTodoStore.getState().createTodo({
      description: "Borrar",
      dueDate: "2026-07-01",
      priority: "media",
    });

    const id = useTodoStore.getState().todos[0].id;
    useTodoStore.getState().deleteTodo(id);

    expect(useTodoStore.getState().todos).toHaveLength(0);
  });

  it("toggles status and persists", () => {
    useTodoStore.getState().hydrate();
    useTodoStore.getState().createTodo({
      description: "Toggle",
      dueDate: "2026-07-01",
      priority: "alta",
    });

    const id = useTodoStore.getState().todos[0].id;
    useTodoStore.getState().toggleStatus(id);

    expect(useTodoStore.getState().todos[0].status).toBe("completada");

    useTodoStore.getState().toggleStatus(id);
    expect(useTodoStore.getState().todos[0].status).toBe("pendiente");
  });

  it("sets storageError when persistence fails", () => {
    useTodoStore.getState().hydrate();
    vi.spyOn(localStorageModule, "setJson").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    useTodoStore.getState().createTodo({
      description: "Fallo",
      dueDate: "2026-07-01",
      priority: "media",
    });

    expect(useTodoStore.getState().storageError).toMatch(/No se pudo guardar/);
    expect(useTodoStore.getState().todos).toHaveLength(0);

    vi.restoreAllMocks();
  });

  it("returns validation failure without mutating when update target is missing", () => {
    useTodoStore.getState().hydrate();

    const result = useTodoStore.getState().updateTodo({
      id: "missing",
      description: "X",
      dueDate: "2026-07-01",
      priority: "media",
    });

    expect(result.success).toBe(true);
    expect(useTodoStore.getState().todos).toHaveLength(0);
  });

  it("sets storageError on update when persistence fails", () => {
    useTodoStore.getState().hydrate();
    useTodoStore.getState().createTodo({
      description: "Original",
      dueDate: "2026-07-01",
      priority: "media",
    });
    const id = useTodoStore.getState().todos[0].id;

    vi.spyOn(localStorageModule, "setJson").mockImplementation(() => {
      throw new Error("fail");
    });

    useTodoStore.getState().updateTodo({
      id,
      description: "Nope",
      dueDate: "2026-08-01",
      priority: "alta",
    });

    expect(useTodoStore.getState().storageError).toMatch(/No se pudo guardar/);
    expect(useTodoStore.getState().todos[0].description).toBe("Original");
    vi.restoreAllMocks();
  });

  it("sets storageError on delete when persistence fails", () => {
    useTodoStore.getState().hydrate();
    useTodoStore.getState().createTodo({
      description: "Borrar",
      dueDate: "2026-07-01",
      priority: "media",
    });
    const id = useTodoStore.getState().todos[0].id;

    vi.spyOn(localStorageModule, "setJson").mockImplementation(() => {
      throw new Error("fail");
    });

    useTodoStore.getState().deleteTodo(id);

    expect(useTodoStore.getState().storageError).toMatch(/No se pudo eliminar/);
    expect(useTodoStore.getState().todos).toHaveLength(1);
    vi.restoreAllMocks();
  });

  it("sets storageError on toggle when persistence fails", () => {
    useTodoStore.getState().hydrate();
    useTodoStore.getState().createTodo({
      description: "Toggle",
      dueDate: "2026-07-01",
      priority: "alta",
    });
    const id = useTodoStore.getState().todos[0].id;

    vi.spyOn(localStorageModule, "setJson").mockImplementation(() => {
      throw new Error("fail");
    });

    useTodoStore.getState().toggleStatus(id);

    expect(useTodoStore.getState().storageError).toMatch(
      /No se pudo actualizar el estado/,
    );
    expect(useTodoStore.getState().todos[0].status).toBe("pendiente");
    vi.restoreAllMocks();
  });

  it("getSortedTodos returns priority order", () => {
    useTodoStore.getState().hydrate();
    useTodoStore.getState().createTodo({
      description: "Baja",
      dueDate: "2026-07-01",
      priority: "baja",
    });
    useTodoStore.getState().createTodo({
      description: "Alta",
      dueDate: "2026-07-02",
      priority: "alta",
    });

    const sorted = useTodoStore.getState().getSortedTodos();
    expect(sorted[0].priority).toBe("alta");
    expect(sorted[1].priority).toBe("baja");
  });
});
