import { describe, expect, it } from "vitest";

import { buildTaskInput } from "../testing/taskMother";
import { validateTaskInput } from "./validateTask";

describe("validateTaskInput", () => {
  it("rejects empty description", () => {
    const result = validateTaskInput(buildTaskInput({ description: "   " }));

    expect(result.valid).toBe(false);
    expect(result.errors.description).toBe("La descripción es obligatoria");
  });

  it("accepts valid input without due date", () => {
    const result = validateTaskInput(
      buildTaskInput({ description: "Comprar leche", dueDate: null }),
    );

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("rejects invalid priority", () => {
    const result = validateTaskInput(
      buildTaskInput({ priority: "urgente" as "alta" }),
    );

    expect(result.valid).toBe(false);
    expect(result.errors.priority).toBe("Prioridad no válida");
  });

  it("rejects invalid due date format", () => {
    const result = validateTaskInput(buildTaskInput({ dueDate: "04-06-2026" }));

    expect(result.valid).toBe(false);
    expect(result.errors.dueDate).toBe("Fecha no válida");
  });
});
