import { describe, expect, it } from "vitest";
import { validateTask } from "./validate-task";

const TODAY = new Date("2026-07-07T00:00:00.000Z");

describe("validateTask", () => {
  it("returns no errors for a fully valid task", () => {
    // Arrange
    const input = {
      description: "Comprar café",
      dueDate: "2026-07-08",
      priority: "media" as const,
    };

    // Act
    const errors = validateTask(input, TODAY);

    // Assert
    expect(errors).toEqual({});
  });

  it("reports an error when description is empty", () => {
    // Arrange
    const input = {
      description: "",
      dueDate: "2026-07-08",
      priority: "alta" as const,
    };

    // Act
    const errors = validateTask(input, TODAY);

    // Assert
    expect(errors.description).toBeDefined();
  });

  it("reports an error when description is only whitespace", () => {
    // Arrange
    const input = {
      description: "   ",
      dueDate: "2026-07-08",
      priority: "alta" as const,
    };

    // Act
    const errors = validateTask(input, TODAY);

    // Assert
    expect(errors.description).toBeDefined();
  });

  it("accepts a description of a single character", () => {
    // Arrange
    const input = {
      description: "x",
      dueDate: "2026-07-08",
      priority: "alta" as const,
    };

    // Act
    const errors = validateTask(input, TODAY);

    // Assert
    expect(errors.description).toBeUndefined();
  });

  it("reports an error when dueDate is empty", () => {
    // Arrange
    const input = {
      description: "Tarea",
      dueDate: "",
      priority: "alta" as const,
    };

    // Act
    const errors = validateTask(input, TODAY);

    // Assert
    expect(errors.dueDate).toBeDefined();
  });

  it("reports an error when dueDate is before today", () => {
    // Arrange
    const input = {
      description: "Tarea",
      dueDate: "2026-07-06",
      priority: "alta" as const,
    };

    // Act
    const errors = validateTask(input, TODAY);

    // Assert
    expect(errors.dueDate).toBeDefined();
  });

  it("accepts a dueDate equal to today", () => {
    // Arrange
    const input = {
      description: "Tarea",
      dueDate: "2026-07-07",
      priority: "alta" as const,
    };

    // Act
    const errors = validateTask(input, TODAY);

    // Assert
    expect(errors.dueDate).toBeUndefined();
  });

  it("reports an error when priority is not alta, media or baja", () => {
    // Arrange
    const input = {
      description: "Tarea",
      dueDate: "2026-07-08",
      // @ts-expect-error -- valor inválido intencional para el test
      priority: "urgente",
    };

    // Act
    const errors = validateTask(input, TODAY);

    // Assert
    expect(errors.priority).toBeDefined();
  });
});
