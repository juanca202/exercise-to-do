import { beforeEach, describe, expect, it } from "vitest";
import { aTask } from "../test/object-mother/task.mother";
import { useTaskStore } from "./task-store";

describe("useTaskStore", () => {
  beforeEach(() => {
    // Arrange (aislamiento: resetear el estado compartido de la store antes de cada test)
    useTaskStore.setState({ tasks: [] });
  });

  it("adds a task", () => {
    // Arrange
    const task = aTask({ id: "task-1", title: "Comprar café" });

    // Act
    useTaskStore.getState().addTask(task);

    // Assert
    expect(useTaskStore.getState().tasks).toEqual([task]);
  });

  it("toggles a task's completed state", () => {
    // Arrange
    const task = aTask({ id: "task-1", completed: false });
    useTaskStore.setState({ tasks: [task] });

    // Act
    useTaskStore.getState().toggleTask("task-1");

    // Assert
    expect(useTaskStore.getState().tasks[0]?.completed).toBe(true);
  });

  it("removes a task", () => {
    // Arrange
    const task = aTask({ id: "task-1" });
    useTaskStore.setState({ tasks: [task] });

    // Act
    useTaskStore.getState().removeTask("task-1");

    // Assert
    expect(useTaskStore.getState().tasks).toEqual([]);
  });

  it("does not modify other tasks when toggling one", () => {
    // Arrange
    const first = aTask({ id: "task-1", completed: false });
    const second = aTask({ id: "task-2", completed: false });
    useTaskStore.setState({ tasks: [first, second] });

    // Act
    useTaskStore.getState().toggleTask("task-1");

    // Assert
    expect(
      useTaskStore.getState().tasks.find((t) => t.id === "task-2"),
    ).toEqual(second);
  });
});
