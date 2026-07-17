import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Note } from "../types";
import { NoteItem } from "./note-item";

function buildNote(overrides: Partial<Note> = {}): Note {
  return {
    id: "1",
    content: "Contenido de ejemplo",
    createdAt: 1,
    updatedAt: 1,
    ...overrides,
  };
}

describe("NoteItem", () => {
  it("renders the full content when it fits within the preview limit", () => {
    render(
      <NoteItem
        note={buildNote({ content: "Comprar leche" })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByTestId("note-preview")).toHaveTextContent(
      "Comprar leche",
    );
  });

  it("truncates content longer than 120 characters", () => {
    const longContent = "a".repeat(150);
    render(
      <NoteItem
        note={buildNote({ content: longContent })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    const preview = screen.getByTestId("note-preview").textContent ?? "";
    expect(preview.endsWith("…")).toBe(true);
    expect(preview.length).toBe(121);
  });

  it("shows a placeholder when the note has no content", () => {
    render(
      <NoteItem
        note={buildNote({ content: "" })}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByTestId("note-preview")).toHaveTextContent("Nota vacía");
  });

  it("calls onEdit with the note when Editar is clicked", () => {
    const onEdit = vi.fn();
    const note = buildNote();
    render(<NoteItem note={note} onEdit={onEdit} onDelete={vi.fn()} />);
    screen.getByRole("button", { name: "Editar" }).click();
    expect(onEdit).toHaveBeenCalledWith(note);
  });

  it("calls onDelete with the note id when Eliminar is clicked", () => {
    const onDelete = vi.fn();
    render(
      <NoteItem
        note={buildNote({ id: "42" })}
        onEdit={vi.fn()}
        onDelete={onDelete}
      />,
    );
    screen.getByRole("button", { name: "Eliminar" }).click();
    expect(onDelete).toHaveBeenCalledWith("42");
  });
});
