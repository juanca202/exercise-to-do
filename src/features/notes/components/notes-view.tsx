"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useState } from "react";

import { useNotesHydrated } from "../hooks/use-notes-hydrated";
import { sortNotesByRecency, useNoteStore } from "../store";
import type { Note } from "../types";
import { NoteForm } from "./note-form";
import { NoteList } from "./note-list";

type DialogMode =
  { type: "closed" } | { type: "create" } | { type: "edit"; note: Note };

/**
 * Feature shell: most-recent-first note list + create/edit form in a
 * modal dialog.
 */
export function NotesView() {
  const hydrated = useNotesHydrated();
  const notes = useNoteStore((state) => state.notes);
  const sortedNotes = sortNotesByRecency(notes);
  const addNote = useNoteStore((state) => state.addNote);
  const updateNote = useNoteStore((state) => state.updateNote);
  const deleteNote = useNoteStore((state) => state.deleteNote);

  const [mode, setMode] = useState<DialogMode>({ type: "closed" });
  const dialogOpen = mode.type !== "closed";

  function closeDialog() {
    setMode({ type: "closed" });
  }

  function handleCreate(content: string) {
    addNote(content);
    closeDialog();
  }

  function handleUpdate(content: string) {
    if (mode.type !== "edit") {
      return;
    }
    updateNote(mode.note.id, content);
    closeDialog();
  }

  if (!hydrated) {
    return (
      <p
        data-testid="notes-loading"
        className="text-sm text-zinc-500 dark:text-zinc-400"
      >
        Cargando notas…
      </p>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Mis notas
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Guarda ideas o recordatorios de texto libre. Los datos se guardan en
            este navegador.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMode({ type: "create" })}
          className="shrink-0 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Nueva nota
        </button>
      </header>

      <section aria-labelledby="note-list-heading">
        <h2
          id="note-list-heading"
          className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100"
        >
          Listado
        </h2>
        <NoteList
          notes={sortedNotes}
          onEdit={(note) => setMode({ type: "edit", note })}
          onDelete={deleteNote}
        />
      </section>

      <Dialog.Root
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/40 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup
            data-testid="note-dialog"
            className="fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-200 bg-white p-5 shadow-xl outline-none transition-all data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <Dialog.Title className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
              {mode.type === "edit" ? "Editar nota" : "Nueva nota"}
            </Dialog.Title>
            {mode.type === "create" ? (
              <NoteForm
                key="create"
                submitLabel="Crear nota"
                onSubmit={handleCreate}
                onCancel={closeDialog}
              />
            ) : null}
            {mode.type === "edit" ? (
              <NoteForm
                key={mode.note.id}
                note={mode.note}
                submitLabel="Guardar cambios"
                onSubmit={handleUpdate}
                onCancel={closeDialog}
              />
            ) : null}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
