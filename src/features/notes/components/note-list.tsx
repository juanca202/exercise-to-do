"use client";

import type { Note } from "../types";
import { NoteItem } from "./note-item";

export interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

/**
 * Ordered note list with empty state when there are no notes.
 */
export function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p
        data-testid="empty-notes"
        className="rounded-lg border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-600 dark:text-zinc-400"
      >
        No tienes notas registradas todavía. Crea la primera para empezar.
      </p>
    );
  }

  return (
    <ul data-testid="note-list" className="flex flex-col gap-3">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
