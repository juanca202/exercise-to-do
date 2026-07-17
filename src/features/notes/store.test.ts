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
