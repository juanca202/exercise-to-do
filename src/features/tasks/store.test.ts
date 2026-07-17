import { beforeEach, describe, expect, it } from "vitest";

import {
  sanitizeTask,
  sanitizeTasks,
  selectSortedTasks,
  TASKS_STORAGE_KEY,
  useTaskStore,
} from "./store";

describe("useTaskStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useTaskStore.setState({ tasks: [] });
  });

  it("adds a task as not completed", () => {
    const task = useTaskStore.getState().addTask({
      description: "Comprar materiales",
      dueDate: "2026-07-20",
      priority: "high",
    });
    expect(task.completed).toBe(false);
    expect(useTaskStore.getState().tasks).toHaveLength(1);
    expect(useTaskStore.getState().tasks[0]?.description).toBe(
      "Comprar materiales",
    );
  });

  it("updates an existing task", () => {
    const created = useTaskStore.getState().addTask({
      description: "Antes",
      dueDate: "2026-07-20",
      priority: "low",
    });
    const ok = useTaskStore.getState().updateTask(created.id, {
      description: "Después",
      dueDate: "2026-07-21",
      priority: "high",
    });
    expect(ok).toBe(true);
    const updated = useTaskStore.getState().tasks[0];
    expect(updated?.description).toBe("Después");
    expect(updated?.dueDate).toBe("2026-07-21");
    expect(updated?.priority).toBe("high");
  });

  it("returns false when updating a missing task", () => {
    const ok = useTaskStore.getState().updateTask("missing", {
      description: "X",
      dueDate: "2026-07-20",
      priority: "medium",
    });
    expect(ok).toBe(false);
  });

  it("deletes a task", () => {
    const created = useTaskStore.getState().addTask({
      description: "Borrar",
      dueDate: "2026-07-20",
      priority: "medium",
    });
    useTaskStore.getState().deleteTask(created.id);
    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it("toggles completion", () => {
    const created = useTaskStore.getState().addTask({
      description: "Completar",
      dueDate: "2026-07-20",
      priority: "medium",
    });
    useTaskStore.getState().toggleComplete(created.id);
    expect(useTaskStore.getState().tasks[0]?.completed).toBe(true);
    useTaskStore.getState().toggleComplete(created.id);
    expect(useTaskStore.getState().tasks[0]?.completed).toBe(false);
  });

  it("selectSortedTasks orders by priority", () => {
    useTaskStore.getState().addTask({
      description: "Low",
      dueDate: "2026-07-20",
      priority: "low",
    });
    useTaskStore.getState().addTask({
      description: "High",
      dueDate: "2026-07-20",
      priority: "high",
    });
    const sorted = selectSortedTasks(useTaskStore.getState());
    expect(sorted.map((t) => t.priority)).toEqual(["high", "low"]);
  });
});

describe("sanitizeTask / sanitizeTasks", () => {
  it("keeps a valid task", () => {
    const task = sanitizeTask({
      id: "1",
      description: "Ok",
      dueDate: "2026-07-20",
      priority: "high",
      completed: false,
      createdAt: 1,
    });
    expect(task?.id).toBe("1");
  });

  it("drops tasks with invalid priority", () => {
    expect(
      sanitizeTask({
        id: "1",
        description: "Ok",
        dueDate: "2026-07-20",
        priority: "urgent",
        completed: false,
        createdAt: 1,
      }),
    ).toBeNull();
  });

  it("filters invalid items from an array", () => {
    const tasks = sanitizeTasks([
      {
        id: "1",
        description: "Ok",
        dueDate: "2026-07-20",
        priority: "high",
        completed: false,
        createdAt: 1,
      },
      {
        id: "2",
        description: "Bad",
        dueDate: "2026-07-20",
        priority: "urgent",
        completed: false,
        createdAt: 2,
      },
      "not-an-object",
    ]);
    expect(tasks).toHaveLength(1);
    expect(tasks[0]?.id).toBe("1");
  });

  it("returns empty list for non-arrays", () => {
    expect(sanitizeTasks(null)).toEqual([]);
    expect(sanitizeTasks({ tasks: [] })).toEqual([]);
  });
});

describe("task store persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    useTaskStore.setState({ tasks: [] });
  });

  it("writes tasks to localStorage under the versioned key", () => {
    useTaskStore.getState().addTask({
      description: "Persistida",
      dueDate: "2026-07-20",
      priority: "medium",
    });

    const raw = localStorage.getItem(TASKS_STORAGE_KEY);
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!) as { state: { tasks: unknown[] } };
    expect(parsed.state.tasks).toHaveLength(1);
  });

  it("rehydrates tasks from localStorage", async () => {
    localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify({
        state: {
          tasks: [
            {
              id: "stored-1",
              description: "Desde storage",
              dueDate: "2026-07-22",
              priority: "high",
              completed: true,
              createdAt: 100,
            },
          ],
        },
        version: 0,
      }),
    );

    await useTaskStore.persist.rehydrate();

    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0]?.description).toBe("Desde storage");
    expect(tasks[0]?.completed).toBe(true);
  });

  it("recovers to an empty list when localStorage JSON is corrupt", async () => {
    localStorage.setItem(TASKS_STORAGE_KEY, "{tareas-corruptas");
    useTaskStore.setState({ tasks: [] });

    await expect(useTaskStore.persist.rehydrate()).resolves.not.toThrow();
    expect(useTaskStore.getState().tasks).toEqual([]);
  });

  it("drops invalid priorities when rehydrating", async () => {
    localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify({
        state: {
          tasks: [
            {
              id: "bad",
              description: "Inválida",
              dueDate: "2026-07-20",
              priority: "urgent",
              completed: false,
              createdAt: 1,
            },
            {
              id: "good",
              description: "Válida",
              dueDate: "2026-07-20",
              priority: "low",
              completed: false,
              createdAt: 2,
            },
          ],
        },
        version: 0,
      }),
    );

    await useTaskStore.persist.rehydrate();
    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0]?.id).toBe("good");
  });
});
