import { describe, expect, it } from "vitest";

import { isPriority, isValidTaskInput, validateTaskInput } from "./validation";

describe("validateTaskInput", () => {
  it("accepts a complete valid payload", () => {
    const errors = validateTaskInput({
      description: "Comprar materiales",
      dueDate: "2026-07-20",
      priority: "high",
    });
    expect(errors).toEqual({});
    expect(isValidTaskInput(errors)).toBe(true);
  });

  it("rejects an empty description", () => {
    const errors = validateTaskInput({
      description: "",
      dueDate: "2026-07-20",
      priority: "medium",
    });
    expect(errors.description).toBeDefined();
    expect(isValidTaskInput(errors)).toBe(false);
  });

  it("rejects a description with only whitespace", () => {
    const errors = validateTaskInput({
      description: "   ",
      dueDate: "2026-07-20",
      priority: "low",
    });
    expect(errors.description).toBeDefined();
  });

  it("rejects a missing due date", () => {
    const errors = validateTaskInput({
      description: "Tarea",
      dueDate: "",
      priority: "high",
    });
    expect(errors.dueDate).toBeDefined();
  });

  it("rejects an invalid priority", () => {
    const errors = validateTaskInput({
      description: "Tarea",
      dueDate: "2026-07-20",
      priority: "urgent",
    });
    expect(errors.priority).toBeDefined();
  });
});

describe("isPriority", () => {
  it("accepts high, medium and low", () => {
    expect(isPriority("high")).toBe(true);
    expect(isPriority("medium")).toBe(true);
    expect(isPriority("low")).toBe(true);
  });

  it("rejects other values", () => {
    expect(isPriority("urgent")).toBe(false);
    expect(isPriority(1)).toBe(false);
    expect(isPriority(null)).toBe(false);
  });
});
