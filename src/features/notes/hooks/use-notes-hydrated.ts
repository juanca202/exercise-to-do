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
