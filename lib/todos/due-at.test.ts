import { describe, expect, it } from "vitest";

import {
  dateInputToIso,
  formatDueAt,
  isDueAtOverdue,
  isoToDateInputValue,
} from "./due-at";

describe("due-at helpers", () => {
  it("convierte entre input date e ISO", () => {
    expect(dateInputToIso("")).toBeNull();
    expect(isoToDateInputValue("2026-05-27T12:00:00.000Z")).toMatch(/2026-05-2[67]/);
  });

  it("formatea fechas en español", () => {
    expect(formatDueAt("2026-05-27T12:00:00.000Z")).toContain("2026");
  });

  it("detecta fechas vencidas", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    expect(isDueAtOverdue(yesterday.toISOString())).toBe(true);
    expect(isDueAtOverdue(null)).toBe(false);
  });

  it("no marca como vencida la fecha de hoy", () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    expect(isDueAtOverdue(today.toISOString())).toBe(false);
  });
});
