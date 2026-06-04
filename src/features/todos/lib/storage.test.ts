import { afterEach, describe, expect, it, vi } from "vitest";

import { buildTask } from "../testing/taskMother";
import { STORAGE_KEY, loadTasks, saveTasks } from "./storage";

describe("storage", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("returns empty array when storage is empty", () => {
    expect(loadTasks()).toEqual([]);
  });

  it("loads persisted tasks", () => {
    const tasks = [buildTask({ id: "persisted-1" })];
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, tasks }));

    expect(loadTasks()).toEqual(tasks);
  });

  it("returns empty array for invalid payload", () => {
    localStorage.setItem(STORAGE_KEY, "{ invalid");

    expect(loadTasks()).toEqual([]);
  });

  it("saves tasks successfully", () => {
    const tasks = [buildTask({ id: "save-1" })];
    const result = saveTasks(tasks);

    expect(result.success).toBe(true);
    expect(loadTasks()).toEqual(tasks);
  });

  it("returns quota exceeded error when storage is full", () => {
    vi.spyOn(localStorage, "setItem").mockImplementation(() => {
      throw new DOMException("QuotaExceededError", "QuotaExceededError");
    });

    const result = saveTasks([buildTask()]);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe("quota_exceeded");
      expect(result.message).toContain("almacenamiento lleno");
    }
  });
});
