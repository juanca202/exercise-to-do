import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Note } from "./types";

/** Versioned localStorage key for persisted notes. */
export const NOTES_STORAGE_KEY = "notes:v1";

interface NotesState {
  notes: Note[];
  addNote: (content: string) => Note;
  updateNote: (id: string, content: string) => boolean;
  deleteNote: (id: string) => void;
}

/**
 * Attempts to coerce an unknown value into a valid {@link Note}.
 * Invalid shapes yield `null` so they are dropped on hydrate.
 */
export function sanitizeNote(value: unknown): Note | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;

  if (typeof candidate.id !== "string" || candidate.id.length === 0) {
    return null;
  }
  if (typeof candidate.content !== "string") {
    return null;
  }
  if (
    typeof candidate.createdAt !== "number" ||
    !Number.isFinite(candidate.createdAt)
  ) {
    return null;
  }
  if (
    typeof candidate.updatedAt !== "number" ||
    !Number.isFinite(candidate.updatedAt)
  ) {
    return null;
  }

  return {
    id: candidate.id,
    content: candidate.content,
    createdAt: candidate.createdAt,
    updatedAt: candidate.updatedAt,
  };
}

/**
 * Sanitizes a persisted notes array; non-arrays become an empty list.
 */
export function sanitizeNotes(value: unknown): Note[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    const note = sanitizeNote(item);
    return note ? [note] : [];
  });
}

/**
 * Storage wrapper that tolerates corrupt JSON and unavailable localStorage.
 */
const safeLocalStorage = createJSONStorage(() => ({
  getItem(name) {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem(name, value) {
    try {
      localStorage.setItem(name, value);
    } catch {
      // Quota / private mode — ignore write failures.
    }
  },
  removeItem(name) {
    try {
      localStorage.removeItem(name);
    } catch {
      // ignore
    }
  },
}));

function createNoteId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useNoteStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote(content) {
        const now = Date.now();
        const note: Note = {
          id: createNoteId(),
          content,
          createdAt: now,
          updatedAt: now,
        };
        set({ notes: [...get().notes, note] });
        return note;
      },

      updateNote(id, content) {
        const exists = get().notes.some((note) => note.id === id);
        if (!exists) {
          return false;
        }
        set({
          notes: get().notes.map((note) =>
            note.id === id ? { ...note, content, updatedAt: Date.now() } : note,
          ),
        });
        return true;
      },

      deleteNote(id) {
        set({ notes: get().notes.filter((note) => note.id !== id) });
      },
    }),
    {
      name: NOTES_STORAGE_KEY,
      storage: safeLocalStorage,
      partialize: (state) => ({ notes: state.notes }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as { notes?: unknown } | undefined;
        return {
          ...currentState,
          notes: sanitizeNotes(persisted?.notes),
        };
      },
    },
  ),
);

/**
 * Returns a new array sorted by `updatedAt` descending (most recent first).
 *
 * @param notes - Notes to sort (not mutated)
 */
export function sortNotesByRecency(notes: readonly Note[]): Note[] {
  return notes.toSorted((a, b) => b.updatedAt - a.updatedAt);
}

/**
 * Selects notes sorted by most recently updated first, without mutating
 * store state.
 */
export function selectRecentNotes(state: NotesState): Note[] {
  return sortNotesByRecency(state.notes);
}
