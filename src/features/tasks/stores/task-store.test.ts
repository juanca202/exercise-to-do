import { beforeEach, describe, expect, it } from "vitest";
import { useTaskStore } from "./task-store";

const STORAGE_KEY = "tasks-storage";

function validInput() {
  return {
    description: "Comprar café",
    dueDate: "2999-01-01",
    priority: "media" as const,
  };
}

describe("useTaskStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useTaskStore.setState({ tasks: [] });
  });

  it("adds a valid task as pending", () => {
    // Act
    const result = useTaskStore.getState().addTask(validInput());

    // Assert
    expect(result.success).toBe(true);
    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({ ...validInput(), completed: false });
    expect(tasks[0]?.id).toBeTruthy();
    expect(tasks[0]?.createdAt).toBeTypeOf("number");
  });

  it("rejects an invalid task and does not add it", () => {
    // Act
    const result = useTaskStore
      .getState()
      .addTask({ description: "", dueDate: "", priority: "media" });

    // Assert
    expect(result.success).toBe(false);
    expect(result.errors?.description).toBeDefined();
    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it("persists added tasks to localStorage", () => {
    // Act
    useTaskStore.getState().addTask(validInput());

    // Assert
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored as string).state.tasks).toHaveLength(1);
  });

  it("updates an existing task's fields", () => {
    // Arrange
    useTaskStore.getState().addTask(validInput());
    const id = useTaskStore.getState().tasks[0]!.id;

    // Act
    const result = useTaskStore
      .getState()
      .updateTask(id, { ...validInput(), description: "Comprar pan" });

    // Assert
    expect(result.success).toBe(true);
    expect(useTaskStore.getState().tasks[0]?.description).toBe("Comprar pan");
  });

  it("rejects an invalid update and keeps the previous values", () => {
    // Arrange
    useTaskStore.getState().addTask(validInput());
    const id = useTaskStore.getState().tasks[0]!.id;

    // Act
    const result = useTaskStore
      .getState()
      .updateTask(id, { ...validInput(), description: "" });

    // Assert
    expect(result.success).toBe(false);
    expect(useTaskStore.getState().tasks[0]?.description).toBe("Comprar café");
  });

  it("removes a task by id", () => {
    // Arrange
    useTaskStore.getState().addTask(validInput());
    const id = useTaskStore.getState().tasks[0]!.id;

    // Act
    useTaskStore.getState().removeTask(id);

    // Assert
    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it("toggles a task's completed state", () => {
    // Arrange
    useTaskStore.getState().addTask(validInput());
    const id = useTaskStore.getState().tasks[0]!.id;

    // Act
    useTaskStore.getState().toggleCompleted(id);

    // Assert
    expect(useTaskStore.getState().tasks[0]?.completed).toBe(true);

    // Act (revert)
    useTaskStore.getState().toggleCompleted(id);

    // Assert
    expect(useTaskStore.getState().tasks[0]?.completed).toBe(false);
  });

  it("starts with an empty list on first visit (no stored data)", () => {
    // Act
    const rehydrated = useTaskStore.persist.rehydrate();

    // Assert
    return Promise.resolve(rehydrated).then(() => {
      expect(useTaskStore.getState().tasks).toEqual([]);
    });
  });

  it("recovers with an empty list when localStorage has invalid JSON", async () => {
    // Arrange
    localStorage.setItem(STORAGE_KEY, "{not-valid-json");

    // Act
    await useTaskStore.persist.rehydrate();

    // Assert
    expect(useTaskStore.getState().tasks).toEqual([]);
  });

  it("recovers with an empty list when localStorage has an unexpected shape", async () => {
    // Arrange
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state: { tasks: "not-an-array" }, version: 0 }),
    );

    // Act
    await useTaskStore.persist.rehydrate();

    // Assert
    expect(useTaskStore.getState().tasks).toEqual([]);
  });

  it("recovers with an empty list when localStorage has malformed task objects", async () => {
    // Arrange
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state: { tasks: [{ foo: "bar" }] }, version: 0 }),
    );

    // Act
    await useTaskStore.persist.rehydrate();

    // Assert
    expect(useTaskStore.getState().tasks).toEqual([]);
  });
});
