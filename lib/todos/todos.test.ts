import { describe, expect, it } from "vitest";

import { createTodo, updateTodo } from "./factory";
import { loadTodos, saveTodos } from "./storage";
import { STORAGE_KEY } from "./constants";
import {
  isValidTodo,
  validateCreateTodoInput,
  validateDescription,
} from "./validation";

describe("validateDescription", () => {
  it("rechaza descripción vacía o solo espacios", () => {
    expect(validateDescription("")).toEqual({
      valid: false,
      message: "La descripción es obligatoria.",
    });
    expect(validateDescription("   ")).toEqual({
      valid: false,
      message: "La descripción es obligatoria.",
    });
  });

  it("acepta descripción con texto", () => {
    expect(validateDescription("Comprar leche")).toEqual({ valid: true });
  });
});

describe("validateCreateTodoInput", () => {
  it("acepta input mínimo válido", () => {
    expect(validateCreateTodoInput({ description: "Tarea" })).toEqual({
      valid: true,
    });
  });

  it("rechaza prioridad inválida", () => {
    expect(
      validateCreateTodoInput({
        description: "Tarea",
        priority: "urgent" as "high",
      }),
    ).toEqual({
      valid: false,
      message: "La prioridad no es válida.",
    });
  });
});

describe("createTodo", () => {
  it("asigna defaults pending, medium y recorta descripción", () => {
    const todo = createTodo({ description: "  Mi tarea  " });

    expect(todo.description).toBe("Mi tarea");
    expect(todo.status).toBe("pending");
    expect(todo.priority).toBe("medium");
    expect(todo.due_at).toBeNull();
    expect(todo.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(Date.parse(todo.created_at)).not.toBeNaN();
  });

  it("lanza error si la descripción es inválida", () => {
    expect(() => createTodo({ description: "  " })).toThrow(
      "La descripción es obligatoria.",
    );
  });
});

describe("updateTodo", () => {
  it("conserva id y created_at", () => {
    const original = createTodo({ description: "Original", priority: "low" });
    const updated = updateTodo(original, {
      description: "Actualizada",
      priority: "high",
    });

    expect(updated.id).toBe(original.id);
    expect(updated.created_at).toBe(original.created_at);
    expect(updated.description).toBe("Actualizada");
    expect(updated.priority).toBe("high");
  });

  it("persiste due_at al crear y actualizar", () => {
    const todo = createTodo({
      description: "Con fecha",
      due_at: "2026-06-15T12:00:00.000Z",
    });

    expect(todo.due_at).toBe("2026-06-15T12:00:00.000Z");

    const updated = updateTodo(todo, { due_at: null });
    expect(updated.due_at).toBeNull();
  });
});

describe("isValidTodo", () => {
  it("valida entidades completas", () => {
    const todo = createTodo({ description: "Válida" });
    expect(isValidTodo(todo)).toBe(true);
    expect(isValidTodo({ ...todo, priority: "invalid" })).toBe(false);
  });
});

describe("storage", () => {
  it("persiste y recupera tareas", () => {
    const todo = createTodo({ description: "Persistir" });
    saveTodos([todo]);

    expect(loadTodos()).toEqual([todo]);
    localStorage.removeItem(STORAGE_KEY);
  });

  it("devuelve array vacío con datos corruptos", () => {
    localStorage.setItem(STORAGE_KEY, "{ invalid json");
    expect(loadTodos()).toEqual([]);
    localStorage.removeItem(STORAGE_KEY);
  });
});
