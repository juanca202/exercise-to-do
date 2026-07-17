# Notes Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar la sección Notes (CRUD de notas de texto libre) accesible junto a To-do desde una navegación principal compartida, implementando [US-002](../../specs/user-stories/US-002-gestion-notas-texto-libre/README.md).

**Architecture:** Nueva feature `src/features/notes/` calcada 1:1 del patrón ya validado en `src/features/tasks/` (Zustand `persist` + saneamiento ante `localStorage` corrupto, componentes Base UI + Tailwind, testing co-localizado). Se agregan rutas separadas (`/todo`, `/notes`) con redirect en `/`, y una navegación compartida `MainNav` en `src/shared/components/` montada en el layout raíz.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Zustand 5 (`persist`/`createJSONStorage`), Base UI (`@base-ui/react/dialog`), Tailwind CSS 4, Vitest 4 + Testing Library (unit), Playwright (e2e).

## Global Constraints

- Cobertura mínima 80% (líneas/funciones/branches/statements, Vitest v8) — ADR-003.
- App Router exclusivo, ninguna carpeta `pages/` — ADR-007 (verificado por `npm run router:check`).
- Estilos únicamente con utilidades Tailwind, sin CSS Modules ni CSS-in-JS — ADR-008.
- Componentes de UI no triviales (diálogos, etc.) con `@base-ui/react`, estilizados con Tailwind — ADR-009.
- Estado global con Zustand, sin otra librería de estado — ADR-010.
- Nombres de clases/variables/métodos/rutas en inglés (AGENTS.md); los textos de UI visibles al usuario van en español (patrón ya usado en `tasks`).
- TSDoc (`/** ... */`) en funciones/tipos no triviales — ADR-002, verificado por `npm run lint` (`eslint-plugin-tsdoc`).
- `dependency-cruiser` (`npm run arch:check`): una feature (`src/features/<X>/`) no puede importar archivos internos de otra feature, solo su barrel `index.ts`.
- Tests co-localizados junto al código (`<archivo>.test.ts(x)`), patrón AAA, sin mocks de librerías internas (Base UI real en tests de integración).
- Commits siguiendo Conventional Commits (ADR-006).

---

### Task 1: Modelo de dominio y store de Notes con persistencia

**Files:**

- Create: `src/features/notes/types.ts`
- Create: `src/features/notes/store.ts`
- Test: `src/features/notes/store.test.ts`

**Interfaces:**

- Produces: `interface Note { id: string; content: string; createdAt: number; updatedAt: number }`; `NOTES_STORAGE_KEY: string`; `sanitizeNote(value: unknown): Note | null`; `sanitizeNotes(value: unknown): Note[]`; `sortNotesByRecency(notes: readonly Note[]): Note[]`; `selectRecentNotes(state: NotesState): Note[]`; `useNoteStore` — Zustand store con `{ notes: Note[]; addNote(content: string): Note; updateNote(id: string, content: string): boolean; deleteNote(id: string): void }`.

- [ ] **Step 1: Escribir el test que falla (store.test.ts)**

```ts
import { beforeEach, describe, expect, it } from "vitest";

import {
  NOTES_STORAGE_KEY,
  sanitizeNote,
  sanitizeNotes,
  selectRecentNotes,
  useNoteStore,
} from "./store";

describe("useNoteStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useNoteStore.setState({ notes: [] });
  });

  it("adds a note with the given content", () => {
    const note = useNoteStore.getState().addNote("Comprar leche y pan");
    expect(note.content).toBe("Comprar leche y pan");
    expect(useNoteStore.getState().notes).toHaveLength(1);
  });

  it("allows adding a note with empty content", () => {
    const note = useNoteStore.getState().addNote("");
    expect(note.content).toBe("");
    expect(useNoteStore.getState().notes).toHaveLength(1);
  });

  it("updates an existing note and refreshes updatedAt", () => {
    const created = useNoteStore.getState().addNote("Antes");
    const ok = useNoteStore.getState().updateNote(created.id, "Después");
    expect(ok).toBe(true);
    const updated = useNoteStore.getState().notes[0];
    expect(updated?.content).toBe("Después");
    expect(updated?.updatedAt).toBeGreaterThanOrEqual(created.updatedAt);
  });

  it("returns false when updating a missing note", () => {
    const ok = useNoteStore.getState().updateNote("missing", "X");
    expect(ok).toBe(false);
  });

  it("deletes a note", () => {
    const created = useNoteStore.getState().addNote("Borrar");
    useNoteStore.getState().deleteNote(created.id);
    expect(useNoteStore.getState().notes).toHaveLength(0);
  });

  it("selectRecentNotes orders by updatedAt descending", () => {
    useNoteStore.setState({
      notes: [
        { id: "a", content: "Vieja", createdAt: 1, updatedAt: 1 },
        { id: "b", content: "Reciente", createdAt: 2, updatedAt: 3 },
        { id: "c", content: "Media", createdAt: 3, updatedAt: 2 },
      ],
    });
    const sorted = selectRecentNotes(useNoteStore.getState());
    expect(sorted.map((n) => n.id)).toEqual(["b", "c", "a"]);
  });
});

describe("sanitizeNote / sanitizeNotes", () => {
  it("keeps a valid note", () => {
    const note = sanitizeNote({
      id: "1",
      content: "Ok",
      createdAt: 1,
      updatedAt: 1,
    });
    expect(note?.id).toBe("1");
  });

  it("keeps a note with empty content", () => {
    const note = sanitizeNote({
      id: "1",
      content: "",
      createdAt: 1,
      updatedAt: 1,
    });
    expect(note?.content).toBe("");
  });

  it("drops notes with invalid shape", () => {
    expect(
      sanitizeNote({ id: "1", content: 42, createdAt: 1, updatedAt: 1 }),
    ).toBeNull();
    expect(
      sanitizeNote({ id: "", content: "x", createdAt: 1, updatedAt: 1 }),
    ).toBeNull();
    expect(
      sanitizeNote({ id: "1", content: "x", createdAt: "x", updatedAt: 1 }),
    ).toBeNull();
  });

  it("filters invalid items from an array", () => {
    const notes = sanitizeNotes([
      { id: "1", content: "Ok", createdAt: 1, updatedAt: 1 },
      { id: "2", content: 42, createdAt: 2, updatedAt: 2 },
      "not-an-object",
    ]);
    expect(notes).toHaveLength(1);
    expect(notes[0]?.id).toBe("1");
  });

  it("returns empty list for non-arrays", () => {
    expect(sanitizeNotes(null)).toEqual([]);
    expect(sanitizeNotes({ notes: [] })).toEqual([]);
  });
});

describe("note store persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    useNoteStore.setState({ notes: [] });
  });

  it("writes notes to localStorage under the versioned key", () => {
    useNoteStore.getState().addNote("Persistida");

    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!) as { state: { notes: unknown[] } };
    expect(parsed.state.notes).toHaveLength(1);
  });

  it("rehydrates notes from localStorage", async () => {
    localStorage.setItem(
      NOTES_STORAGE_KEY,
      JSON.stringify({
        state: {
          notes: [
            {
              id: "stored-1",
              content: "Desde storage",
              createdAt: 1,
              updatedAt: 2,
            },
          ],
        },
        version: 0,
      }),
    );

    await useNoteStore.persist.rehydrate();

    const notes = useNoteStore.getState().notes;
    expect(notes).toHaveLength(1);
    expect(notes[0]?.content).toBe("Desde storage");
  });

  it("recovers to an empty list when localStorage JSON is corrupt", async () => {
    localStorage.setItem(NOTES_STORAGE_KEY, "{notas-corruptas");
    useNoteStore.setState({ notes: [] });

    await expect(useNoteStore.persist.rehydrate()).resolves.not.toThrow();
    expect(useNoteStore.getState().notes).toEqual([]);
  });

  it("drops invalid entries when rehydrating", async () => {
    localStorage.setItem(
      NOTES_STORAGE_KEY,
      JSON.stringify({
        state: {
          notes: [
            { id: "bad", content: 42, createdAt: 1, updatedAt: 1 },
            { id: "good", content: "Válida", createdAt: 2, updatedAt: 2 },
          ],
        },
        version: 0,
      }),
    );

    await useNoteStore.persist.rehydrate();
    const notes = useNoteStore.getState().notes;
    expect(notes).toHaveLength(1);
    expect(notes[0]?.id).toBe("good");
  });
});
```

- [ ] **Step 2: Ejecutar el test y verificar que falla**

Run: `npx vitest run src/features/notes/store.test.ts`
Expected: FAIL — `Cannot find module './store'` (el archivo todavía no existe).

- [ ] **Step 3: Crear `types.ts`**

```ts
/**
 * Domain model for a free-text note.
 */
export interface Note {
  id: string;
  content: string;
  /** Epoch ms of creation. */
  createdAt: number;
  /** Epoch ms of last modification; used to sort most-recent-first. */
  updatedAt: number;
}
```

- [ ] **Step 4: Crear `store.ts`**

```ts
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
```

- [ ] **Step 5: Ejecutar el test y verificar que pasa**

Run: `npx vitest run src/features/notes/store.test.ts`
Expected: PASS — 15 tests verdes.

- [ ] **Step 6: Commit**

```bash
git add src/features/notes/types.ts src/features/notes/store.ts src/features/notes/store.test.ts
git commit -m "feat(notes): add note domain model and persisted zustand store"
```

---

### Task 2: Componentes de presentación — NoteItem y NoteList

**Files:**

- Create: `src/features/notes/components/note-item.tsx`
- Test: `src/features/notes/components/note-item.test.tsx`
- Create: `src/features/notes/components/note-list.tsx`

**Interfaces:**

- Consumes: `Note` de `../types` (Task 1).
- Produces: `NoteItem({ note, onEdit, onDelete }: { note: Note; onEdit: (note: Note) => void; onDelete: (id: string) => void })`; `NoteList({ notes, onEdit, onDelete }: { notes: Note[]; onEdit: (note: Note) => void; onDelete: (id: string) => void })`.

- [ ] **Step 1: Escribir el test que falla (note-item.test.tsx)**

```tsx
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
```

- [ ] **Step 2: Ejecutar el test y verificar que falla**

Run: `npx vitest run src/features/notes/components/note-item.test.tsx`
Expected: FAIL — `Cannot find module './note-item'`.

- [ ] **Step 3: Crear `note-item.tsx`**

```tsx
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
```

- [ ] **Step 4: Ejecutar el test y verificar que pasa**

Run: `npx vitest run src/features/notes/components/note-item.test.tsx`
Expected: PASS — 5 tests verdes.

- [ ] **Step 5: Crear `note-list.tsx`** (composición trivial, sin test dedicado — se ejercita vía la integración de Task 3, igual que `task-list.tsx` en `tasks`)

```tsx
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
```

- [ ] **Step 6: Commit**

```bash
git add src/features/notes/components/note-item.tsx src/features/notes/components/note-item.test.tsx src/features/notes/components/note-list.tsx
git commit -m "feat(notes): add NoteItem preview truncation and NoteList empty state"
```

---

### Task 3: NotesView (shell + formulario + hidratación) y barrel de la feature

**Files:**

- Create: `src/features/notes/hooks/use-notes-hydrated.ts`
- Create: `src/features/notes/components/note-form.tsx`
- Create: `src/features/notes/components/notes-view.tsx`
- Test: `src/features/notes/components/notes-view.test.tsx`
- Create: `src/features/notes/index.ts`

**Interfaces:**

- Consumes: `useNoteStore`, `sortNotesByRecency`, `Note` (Task 1); `NoteList` (Task 2).
- Produces: `useNotesHydrated(): boolean`; `NoteForm({ note?, onSubmit, onCancel?, submitLabel }: { note?: Note; onSubmit: (content: string) => void; onCancel?: () => void; submitLabel: string })`; `NotesView()` — export público final de la feature vía `index.ts`.

- [ ] **Step 1: Escribir el test que falla (notes-view.test.tsx)**

```tsx
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
```

- [ ] **Step 2: Ejecutar el test y verificar que falla**

Run: `npx vitest run src/features/notes/components/notes-view.test.tsx`
Expected: FAIL — `Cannot find module './notes-view'`.

- [ ] **Step 3: Crear el hook `use-notes-hydrated.ts`**

```ts
"use client";

import { useSyncExternalStore } from "react";

import { useNoteStore } from "../store";

function subscribe(onStoreChange: () => void): () => void {
  return useNoteStore.persist.onFinishHydration(onStoreChange);
}

function getClientSnapshot(): boolean {
  return useNoteStore.persist.hasHydrated();
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Returns `true` after the Zustand persist layer has finished hydrating
 * from localStorage (always `false` during SSR).
 */
export function useNotesHydrated(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
```

- [ ] **Step 4: Crear `note-form.tsx`**

```tsx
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
```

- [ ] **Step 5: Crear `notes-view.tsx`**

```tsx
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
```

- [ ] **Step 6: Ejecutar el test y verificar que pasa**

Run: `npx vitest run src/features/notes/components/notes-view.test.tsx`
Expected: PASS — 6 tests verdes.

- [ ] **Step 7: Crear el barrel `index.ts`**

```ts
export type { Note } from "./types";
export {
  NOTES_STORAGE_KEY,
  sanitizeNote,
  sanitizeNotes,
  selectRecentNotes,
  sortNotesByRecency,
  useNoteStore,
} from "./store";
export { NotesView } from "./components/notes-view";
```

- [ ] **Step 8: Ejecutar toda la suite de la feature y arch:check**

Run: `npx vitest run src/features/notes && npm run arch:check`
Expected: PASS — todos los tests de `src/features/notes` en verde; `arch:check` sin violaciones.

- [ ] **Step 9: Commit**

```bash
git add src/features/notes/hooks/use-notes-hydrated.ts src/features/notes/components/note-form.tsx src/features/notes/components/notes-view.tsx src/features/notes/components/notes-view.test.tsx src/features/notes/index.ts
git commit -m "feat(notes): add NotesView shell, form, hydration hook, and feature barrel"
```

---

### Task 4: Navegación principal compartida (MainNav)

**Files:**

- Create: `src/shared/components/main-nav.tsx`
- Test: `src/shared/components/main-nav.test.tsx`

**Interfaces:**

- Produces: `MainNav()` — componente sin props, usado por `src/app/layout.tsx` en Task 5.

- [ ] **Step 1: Escribir el test que falla (main-nav.test.tsx)**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/todo",
}));

import { MainNav } from "./main-nav";

describe("MainNav", () => {
  it("renders exactly the To-do and Notes options", () => {
    render(<MainNav />);
    expect(screen.getByTestId("nav-link-todo")).toHaveTextContent("To-do");
    expect(screen.getByTestId("nav-link-notes")).toHaveTextContent("Notes");
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("marks the current route as active", () => {
    render(<MainNav />);
    expect(screen.getByTestId("nav-link-todo")).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByTestId("nav-link-notes")).not.toHaveAttribute(
      "aria-current",
    );
  });
});
```

- [ ] **Step 2: Ejecutar el test y verificar que falla**

Run: `npx vitest run src/shared/components/main-nav.test.tsx`
Expected: FAIL — `Cannot find module './main-nav'`.

- [ ] **Step 3: Crear `main-nav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/todo", label: "To-do", testId: "nav-link-todo" },
  { href: "/notes", label: "Notes", testId: "nav-link-notes" },
] as const;

/**
 * Main navigation shown across every route: links between To-do and Notes.
 */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav
      data-testid="main-nav"
      aria-label="Navegación principal"
      className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="mx-auto flex w-full max-w-2xl gap-1 px-4 py-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={item.testId}
              aria-current={active ? "page" : undefined}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                active
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Ejecutar el test y verificar que pasa**

Run: `npx vitest run src/shared/components/main-nav.test.tsx`
Expected: PASS — 2 tests verdes.

- [ ] **Step 5: Commit**

```bash
git add src/shared/components/main-nav.tsx src/shared/components/main-nav.test.tsx
git commit -m "feat(shared): add MainNav with To-do and Notes links"
```

---

### Task 5: Rutas — `/todo`, `/notes`, redirect en `/`, montar MainNav

**Files:**

- Create: `src/app/todo/page.tsx`
- Create: `src/app/notes/page.tsx`
- Modify: `src/app/page.tsx` (reemplazo completo)
- Modify: `src/app/layout.tsx:20-34`

**Interfaces:**

- Consumes: `TasksView` de `@/features/tasks` (ya existente); `NotesView` de `@/features/notes` (Task 3); `MainNav` de `@/shared/components/main-nav` (Task 4).

- [ ] **Step 1: Crear `src/app/todo/page.tsx`** (contenido actual de `src/app/page.tsx`)

```tsx
import { TasksView } from "@/features/tasks";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10 dark:bg-zinc-900">
      <TasksView />
    </main>
  );
}
```

- [ ] **Step 2: Crear `src/app/notes/page.tsx`**

```tsx
import { NotesView } from "@/features/notes";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10 dark:bg-zinc-900">
      <NotesView />
    </main>
  );
}
```

- [ ] **Step 3: Reemplazar `src/app/page.tsx` por el redirect**

```tsx
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/todo");
}
```

- [ ] **Step 4: Montar `MainNav` en `src/app/layout.tsx`**

Modificar el archivo actual (`src/app/layout.tsx:20-34`) agregando el import y el componente antes de `{children}`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MainNav } from "@/shared/components/main-nav";
import "@/shared/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mis tareas y notas",
  description: "Gestiona tus tareas y notas diarias en el navegador",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <MainNav />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verificar que el proyecto compila con las nuevas rutas**

Run: `npm run build`
Expected: build exitoso; en el resumen de rutas aparecen `/`, `/todo` y `/notes` sin errores de tipos ni de compilación.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/todo/page.tsx src/app/notes/page.tsx src/app/layout.tsx
git commit -m "feat: split todo/notes into separate routes with shared navigation"
```

---

### Task 6: Tests E2E de Notes (Playwright)

**Files:**

- Create: `e2e/notes.spec.ts`

**Interfaces:**

- Consumes: rutas `/todo`, `/notes` y `data-testid`s de `MainNav`/`NotesView`/`NoteItem`/`NoteForm` (Tasks 2-5).

- [ ] **Step 1: Crear `e2e/notes.spec.ts`**

```ts
import { expect, type Page, test } from "@playwright/test";

async function openCreateDialog(page: Page) {
  await page.getByRole("button", { name: "Nueva nota" }).click();
  await expect(page.getByTestId("note-dialog")).toBeVisible();
}

async function createNote(page: Page, content: string) {
  await openCreateDialog(page);
  const dialog = page.getByTestId("note-dialog");
  await dialog.getByTestId("note-content-textarea").fill(content);
  await dialog.getByRole("button", { name: "Crear nota" }).click();
  await expect(page.getByTestId("note-dialog")).toBeHidden();
}

test.describe("US-002 notes management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/notes");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.getByTestId("empty-notes")).toBeVisible();
  });

  test("root redirects to /todo (TC-001 nav context)", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/todo$/);
  });

  test("main navigation shows exactly To-do and Notes (TC-001)", async ({
    page,
  }) => {
    const nav = page.getByTestId("main-nav");
    await expect(nav.getByTestId("nav-link-todo")).toBeVisible();
    await expect(nav.getByTestId("nav-link-notes")).toBeVisible();
    await expect(nav.getByRole("link")).toHaveCount(2);
  });

  test("lists registered notes on entering Notes (TC-002/TC-017)", async ({
    page,
  }) => {
    await createNote(page, "Primera nota");
    await createNote(page, "Segunda nota");
    await page.reload();
    await expect(page.getByTestId("note-item")).toHaveCount(2);
  });

  test("shows empty listing with no notes (TC-003)", async ({ page }) => {
    await expect(page.getByTestId("empty-notes")).toBeVisible();
  });

  test("creates a note (TC-004)", async ({ page }) => {
    await createNote(page, "Revisar correo de proveedores");
    await expect(page.getByTestId("note-item")).toHaveCount(1);
    await expect(page.getByTestId("note-preview")).toHaveText(
      "Revisar correo de proveedores",
    );
  });

  test("creation form shows only a textarea (TC-005)", async ({ page }) => {
    await openCreateDialog(page);
    const dialog = page.getByTestId("note-dialog");
    await expect(dialog.getByTestId("note-content-textarea")).toBeVisible();
    await expect(dialog.getByRole("textbox")).toHaveCount(1);
  });

  test("edit form preloads current content (TC-006)", async ({ page }) => {
    await createNote(page, "Reunión con el equipo a las 10am");
    await page.getByRole("button", { name: "Editar" }).click();
    const dialog = page.getByTestId("note-dialog");
    await expect(dialog.getByTestId("note-content-textarea")).toHaveValue(
      "Reunión con el equipo a las 10am",
    );
  });

  test("edits a note (TC-007)", async ({ page }) => {
    await createNote(page, "Borrador de la nota");
    await page.getByRole("button", { name: "Editar" }).click();
    const dialog = page.getByTestId("note-dialog");
    await dialog
      .getByTestId("note-content-textarea")
      .fill("Borrador de la nota revisado y corregido");
    await dialog.getByRole("button", { name: "Guardar cambios" }).click();
    await expect(page.getByTestId("note-dialog")).toBeHidden();
    await expect(page.getByTestId("note-preview")).toHaveText(
      "Borrador de la nota revisado y corregido",
    );
  });

  test("deletes a note (TC-008)", async ({ page }) => {
    await createNote(page, "Nota temporal de prueba");
    await createNote(page, "Otra nota");
    await page
      .getByTestId("note-item")
      .filter({ hasText: "Nota temporal de prueba" })
      .getByRole("button", { name: "Eliminar" })
      .click();
    await expect(page.getByTestId("note-item")).toHaveCount(1);
  });

  test("deletes the last note and shows empty state (TC-009)", async ({
    page,
  }) => {
    await createNote(page, "Última nota antes de vaciar el listado");
    await page.getByRole("button", { name: "Eliminar" }).click();
    await expect(page.getByTestId("empty-notes")).toBeVisible();
  });

  test("new note appears in the list immediately (TC-010)", async ({
    page,
  }) => {
    await createNote(page, "Nota agregada para validar reflejo inmediato");
    await expect(
      page.getByTestId("note-item").filter({
        hasText: "Nota agregada para validar reflejo inmediato",
      }),
    ).toBeVisible();
  });

  test("edited note updates in the list immediately (TC-011)", async ({
    page,
  }) => {
    await createNote(page, "Contenido original");
    await page.getByRole("button", { name: "Editar" }).click();
    const dialog = page.getByTestId("note-dialog");
    await dialog
      .getByTestId("note-content-textarea")
      .fill("Contenido original editado");
    await dialog.getByRole("button", { name: "Guardar cambios" }).click();
    await expect(page.getByTestId("note-preview")).toHaveText(
      "Contenido original editado",
    );
  });

  test("deleted note disappears from the list immediately (TC-012)", async ({
    page,
  }) => {
    await createNote(page, "Nota a remover del listado");
    await page.getByRole("button", { name: "Eliminar" }).click();
    await expect(page.getByTestId("note-item")).toHaveCount(0);
  });

  test("persists notes after reload (TC-013)", async ({ page }) => {
    await createNote(page, "Nota que debe persistir tras recargar");
    await expect(page.getByTestId("note-item")).toHaveCount(1);
    await page.reload();
    await expect(page.getByTestId("note-preview")).toHaveText(
      "Nota que debe persistir tras recargar",
    );
  });

  test("creates a note with empty content (TC-015)", async ({ page }) => {
    await openCreateDialog(page);
    const dialog = page.getByTestId("note-dialog");
    await dialog.getByRole("button", { name: "Crear nota" }).click();
    await expect(page.getByTestId("note-dialog")).toBeHidden();
    await expect(page.getByTestId("note-preview")).toHaveText("Nota vacía");
  });

  test("edits a note leaving its content empty (TC-016)", async ({ page }) => {
    await createNote(page, "Texto a borrar por completo");
    await page.getByRole("button", { name: "Editar" }).click();
    const dialog = page.getByTestId("note-dialog");
    await dialog.getByTestId("note-content-textarea").fill("");
    await dialog.getByRole("button", { name: "Guardar cambios" }).click();
    await expect(page.getByTestId("note-dialog")).toBeHidden();
    await expect(page.getByTestId("note-preview")).toHaveText("Nota vacía");
  });

  test("discards draft without confirmation when closing dialog", async ({
    page,
  }) => {
    await openCreateDialog(page);
    const dialog = page.getByTestId("note-dialog");
    await dialog
      .getByTestId("note-content-textarea")
      .fill("Borrador no guardado");
    await dialog.getByRole("button", { name: "Cancelar" }).click();
    await expect(page.getByTestId("note-dialog")).toBeHidden();
    await expect(page.getByTestId("empty-notes")).toBeVisible();
  });
});
```

- [ ] **Step 2: Ejecutar la suite e2e y verificar que pasa**

Run: `npm run test:e2e -- e2e/notes.spec.ts`
Expected: PASS — 17 tests verdes (arranca `npm run dev` automáticamente vía `webServer` de `playwright.config.ts`).

- [ ] **Step 3: Commit**

```bash
git add e2e/notes.spec.ts
git commit -m "test(e2e): add Playwright coverage for US-002 notes management"
```

---

### Task 7: Verificación final del quality gate

**Files:** ninguno (solo ejecución de comandos de verificación sobre lo ya implementado).

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: sin errores (incluye `tsdoc/syntax` sobre los nuevos archivos con TSDoc).

- [ ] **Step 2: Tests unitarios + cobertura**

Run: `npm run test:coverage`
Expected: todos los tests en verde; umbrales de cobertura (80% líneas/funciones/branches/statements) cumplidos incluyendo `src/features/notes/**` y `src/shared/components/main-nav.tsx`.

- [ ] **Step 3: Fitness functions de arquitectura**

Run: `npm run arch:check && npm run router:check`
Expected: ambos sin errores — `notes` no importa internals de `tasks` ni viceversa; no existe carpeta `pages/`.

- [ ] **Step 4: Build de producción**

Run: `npm run build`
Expected: build exitoso, rutas `/`, `/todo`, `/notes` listadas sin errores.

- [ ] **Step 5: Tests e2e completos**

Run: `npm run test:e2e`
Expected: PASS — `e2e/tasks.spec.ts` (sin regresiones) y `e2e/notes.spec.ts` en verde.

- [ ] **Step 6: Si algún paso anterior requirió una corrección, commitear**

```bash
git add -A
git commit -m "fix: address quality gate findings for notes feature"
```

(Omitir este paso si los pasos 1-5 pasaron sin cambios pendientes.)
