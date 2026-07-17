"use client";

import type { Note } from "../types";

const PREVIEW_MAX_LENGTH = 120;

export interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

function previewContent(content: string): string {
  const trimmed = content.trim();
  if (trimmed.length === 0) {
    return "Nota vacía";
  }
  if (trimmed.length <= PREVIEW_MAX_LENGTH) {
    return trimmed;
  }
  return `${trimmed.slice(0, PREVIEW_MAX_LENGTH)}…`;
}

/**
 * Renders a single note row with a truncated content preview and
 * edit/delete actions.
 */
export function NoteItem({ note, onEdit, onDelete }: NoteItemProps) {
  return (
    <li
      data-testid="note-item"
      className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-700 dark:bg-zinc-950"
    >
      <p
        data-testid="note-preview"
        className="min-w-0 flex-1 whitespace-pre-wrap break-words text-sm text-zinc-900 dark:text-zinc-100"
      >
        {previewContent(note.content)}
      </p>

      <div className="flex shrink-0 gap-2 self-end sm:self-center">
        <button
          type="button"
          onClick={() => onEdit(note)}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(note.id)}
          className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
