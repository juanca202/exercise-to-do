import { describe, expect, it } from "vitest";

import { validateCreateInput, validateUpdateInput } from "./validation";

describe("validateCreateInput", () => {
  it("rejects empty description", () => {
    const result = validateCreateInput({
      description: "   ",
      dueDate: "2026-06-01",
      priority: "alta",
    });

    expect(result.success).toBe(false);
    expect(result.errors.description).toBeDefined();
  });

  it("rejects missing dueDate", () => {
    const result = validateCreateInput({
      description: "Tarea",
      dueDate: "",
      priority: "media",
    });

    expect(result.success).toBe(false);
    expect(result.errors.dueDate).toBeDefined();
  });

  it("rejects invalid dueDate format", () => {
    const result = validateCreateInput({
      description: "Tarea",
      dueDate: "31-06-2026",
      priority: "baja",
    });

    expect(result.success).toBe(false);
    expect(result.errors.dueDate).toBeDefined();
  });

  it("allows past dueDate", () => {
    const result = validateCreateInput({
      description: "Tarea",
      dueDate: "2020-01-01",
      priority: "baja",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid priority", () => {
    const result = validateCreateInput({
      description: "Tarea",
      dueDate: "2026-06-01",
      priority: "urgente" as "alta",
    });

    expect(result.success).toBe(false);
    expect(result.errors.priority).toBeDefined();
  });

  it("accepts valid input", () => {
    const result = validateCreateInput({
      description: "Tarea válida",
      dueDate: "2026-06-15",
      priority: "alta",
    });

    expect(result.success).toBe(true);
    expect(result.errors).toEqual({});
  });
});

describe("validateUpdateInput", () => {
  it("applies the same rules as create", () => {
    const result = validateUpdateInput({
      id: "todo-1",
      description: "",
      dueDate: "2026-06-01",
      priority: "media",
    });

    expect(result.success).toBe(false);
    expect(result.errors.description).toBeDefined();
  });
});
