"use client";

import { useState, type FormEvent } from "react";

import type { Note } from "../types";

export interface NoteFormProps {
  /** When set, the form edits this note; otherwise creates a new one. */
  note?: Note;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  submitLabel: string;
}

/**
 * Shared create/edit form: a single free-text textarea, no validation.
 */
export function NoteForm({
  note,
  onSubmit,
  onCancel,
  submitLabel,
}: NoteFormProps) {
  const [content, setContent] = useState(note?.content ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(content);
    if (!note) {
      setContent("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      noValidate
      aria-label={note ? "Editar nota" : "Crear nota"}
    >
      <div>
        <label
          htmlFor="note-content"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Contenido
        </label>
        <textarea
          id="note-content"
          name="content"
          rows={6}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          data-testid="note-content-textarea"
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-700"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          data-testid="note-save-button"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}
