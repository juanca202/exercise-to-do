"use client";

import { useSyncExternalStore } from "react";

import { useTaskStore } from "../store";

function subscribe(onStoreChange: () => void): () => void {
  return useTaskStore.persist.onFinishHydration(onStoreChange);
}

function getClientSnapshot(): boolean {
  return useTaskStore.persist.hasHydrated();
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Returns `true` after the Zustand persist layer has finished hydrating
 * from localStorage (always `false` during SSR).
 */
export function useTasksHydrated(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
