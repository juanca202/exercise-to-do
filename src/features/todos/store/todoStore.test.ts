import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { STORAGE_KEY } from "../lib/storage";
import { buildTask, buildTaskInput } from "../testing/taskMother";
import { resetTodoStore, useTodoStore } from "./todoStore";

describe("todoStore", () => {
  beforeEach(() => {
    localStorage.clear();
    resetTodoStore();
  });

  afterEach(() => {
    localStorage.clear();
    resetTodoStore();
    vi.restoreAllMocks();
  });

  it("loads tasks from storage on init", () => {
    const persisted = [
      buildTask({ id: "loaded-1", description: "Persistida" }),
    ];
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, tasks: persisted }),
    );

    useTodoStore.getState().loadFromStorage();

    expect(useTodoStore.getState().tasks).toEqual(persisted);
    expect(useTodoStore.getState().sortedTasks).toEqual(persisted);
  });

  it("creates a task and persists it", () => {
    const created = useTodoStore
      .getState()
      .createTask(buildTaskInput({ description: "Nueva tarea" }));

    expect(created).toBe(true);
    expect(useTodoStore.getState().tasks).toHaveLength(1);
    expect(useTodoStore.getState().tasks[0]?.description).toBe("Nueva tarea");
    expect(useTodoStore.getState().sortedTasks).toHaveLength(1);

    useTodoStore.getState().loadFromStorage();
    expect(useTodoStore.getState().tasks).toHaveLength(1);
  });

  it("surfaces save errors when persistence fails", () => {
    vi.spyOn(localStorage, "setItem").mockImplementation(() => {
      throw new DOMException("QuotaExceededError", "QuotaExceededError");
    });

    const created = useTodoStore
      .getState()
      .createTask(buildTaskInput({ description: "No se guardará" }));

    expect(created).toBe(false);
    expect(useTodoStore.getState().saveError).toContain("almacenamiento lleno");
    expect(useTodoStore.getState().tasks).toHaveLength(0);
  });

  it("updates a task preserving unchanged fields", () => {
    useTodoStore.getState().createTask(
      buildTaskInput({
        description: "Original",
        priority: "baja",
        dueDate: "2026-12-01",
      }),
    );

    const taskId = useTodoStore.getState().tasks[0]?.id as string;

    const updated = useTodoStore.getState().updateTask(taskId, {
      description: "Actualizada",
      priority: "alta",
      dueDate: null,
    });

    expect(updated).toBe(true);
    expect(useTodoStore.getState().tasks[0]).toMatchObject({
      description: "Actualizada",
      priority: "alta",
      dueDate: null,
      status: "pendiente",
    });
  });

  it("re-sorts tasks when priority changes on update", () => {
    useTodoStore
      .getState()
      .createTask(buildTaskInput({ description: "Alta", priority: "alta" }));
    useTodoStore
      .getState()
      .createTask(buildTaskInput({ description: "Baja", priority: "baja" }));

    const bajaTask = useTodoStore
      .getState()
      .tasks.find((task) => task.priority === "baja");

    useTodoStore.getState().updateTask(bajaTask!.id, {
      description: "Ahora alta",
      priority: "alta",
      dueDate: null,
    });

    const priorities = useTodoStore
      .getState()
      .sortedTasks.map((task) => task.priority);

    expect(priorities).toEqual(["alta", "alta"]);
  });

  it("deletes a task and persists", () => {
    useTodoStore
      .getState()
      .createTask(buildTaskInput({ description: "Eliminar" }));
    const id = useTodoStore.getState().tasks[0]?.id as string;

    expect(useTodoStore.getState().deleteTask(id)).toBe(true);
    expect(useTodoStore.getState().tasks).toHaveLength(0);
  });

  it("toggles task status", () => {
    useTodoStore
      .getState()
      .createTask(buildTaskInput({ description: "Toggle" }));
    const id = useTodoStore.getState().tasks[0]?.id as string;

    expect(useTodoStore.getState().toggleTaskStatus(id)).toBe(true);
    expect(useTodoStore.getState().tasks[0]?.status).toBe("completada");

    expect(useTodoStore.getState().toggleTaskStatus(id)).toBe(true);
    expect(useTodoStore.getState().tasks[0]?.status).toBe("pendiente");
  });
});
