import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { useNoteStore } from "../store";
import { NotesView } from "./notes-view";

async function openCreateDialog(
  user: ReturnType<typeof userEvent.setup>,
): Promise<HTMLElement> {
  await user.click(screen.getByRole("button", { name: "Nueva nota" }));
  const dialog = await screen.findByTestId("note-dialog");
  expect(
    within(dialog).getByRole("form", { name: "Crear nota" }),
  ).toBeInTheDocument();
  return dialog;
}

describe("NotesView", () => {
  beforeEach(() => {
    localStorage.clear();
    useNoteStore.setState({ notes: [] });
  });

  it("shows empty state after hydration", async () => {
    render(<NotesView />);
    expect(await screen.findByTestId("empty-notes")).toBeInTheDocument();
  });

  it("creates a note from the modal form", async () => {
    const user = userEvent.setup();
    render(<NotesView />);
    await screen.findByTestId("empty-notes");
    const dialog = await openCreateDialog(user);

    await user.type(
      within(dialog).getByTestId("note-content-textarea"),
      "Comprar leche y pan",
    );
    await user.click(
      within(dialog).getByRole("button", { name: "Crear nota" }),
    );

    await waitFor(() => {
      expect(screen.queryByTestId("note-dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("note-preview")).toHaveTextContent(
      "Comprar leche y pan",
    );
    expect(screen.queryByTestId("empty-notes")).not.toBeInTheDocument();
  });

  it("allows creating a note with empty content", async () => {
    const user = userEvent.setup();
    render(<NotesView />);
    await screen.findByTestId("empty-notes");
    const dialog = await openCreateDialog(user);

    await user.click(
      within(dialog).getByRole("button", { name: "Crear nota" }),
    );

    await waitFor(() => {
      expect(screen.queryByTestId("note-dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("note-preview")).toHaveTextContent("Nota vacía");
  });

  it("edits and deletes a note from the list", async () => {
    const user = userEvent.setup();
    useNoteStore.getState().addNote("Editable");

    render(<NotesView />);
    await screen.findByTestId("note-item");

    await user.click(screen.getByRole("button", { name: "Editar" }));
    const dialog = await screen.findByTestId("note-dialog");
    expect(
      within(dialog).getByRole("form", { name: "Editar nota" }),
    ).toBeInTheDocument();

    const textarea = within(dialog).getByTestId("note-content-textarea");
    await user.clear(textarea);
    await user.type(textarea, "Editada");
    await user.click(
      within(dialog).getByRole("button", { name: "Guardar cambios" }),
    );

    await waitFor(() => {
      expect(screen.queryByTestId("note-dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("note-preview")).toHaveTextContent("Editada");

    await user.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(await screen.findByTestId("empty-notes")).toBeInTheDocument();
  });

  it("lists notes ordered by most recently updated first", async () => {
    useNoteStore.setState({
      notes: [
        { id: "old", content: "Vieja", createdAt: 1, updatedAt: 1 },
        { id: "new", content: "Reciente", createdAt: 2, updatedAt: 2 },
      ],
    });

    render(<NotesView />);
    const items = await screen.findAllByTestId("note-preview");
    expect(items[0]).toHaveTextContent("Reciente");
    expect(items[1]).toHaveTextContent("Vieja");
  });

  it("cancels an in-progress edit without confirmation", async () => {
    const user = userEvent.setup();
    useNoteStore.getState().addNote("Sin cambios");

    render(<NotesView />);
    await screen.findByTestId("note-item");
    await user.click(screen.getByRole("button", { name: "Editar" }));
    const dialog = await screen.findByTestId("note-dialog");
    await user.type(
      within(dialog).getByTestId("note-content-textarea"),
      " borrador",
    );
    await user.click(within(dialog).getByRole("button", { name: "Cancelar" }));

    await waitFor(() => {
      expect(screen.queryByTestId("note-dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("note-preview")).toHaveTextContent("Sin cambios");
  });
});
