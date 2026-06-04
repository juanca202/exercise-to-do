const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function formatDueDate(dueDate: string | null): string {
  if (dueDate === null) {
    return "Sin fecha";
  }

  if (!DATE_PATTERN.test(dueDate)) {
    return dueDate;
  }

  const [year, month, day] = dueDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isOverdue(
  dueDate: string | null,
  referenceDate = new Date(),
): boolean {
  if (dueDate === null || !DATE_PATTERN.test(dueDate)) {
    return false;
  }

  const [year, month, day] = dueDate.split("-").map(Number);
  const due = new Date(year, month - 1, day);
  const today = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );

  return due < today;
}
