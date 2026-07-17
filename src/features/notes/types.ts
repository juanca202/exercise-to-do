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
