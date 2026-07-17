import { expect, type Page, test } from "@playwright/test";

async function openCreateDialog(page: Page) {
  await page.getByRole("button", { name: "Nueva tarea" }).click();
  await expect(page.getByTestId("task-dialog")).toBeVisible();
}

async function createTask(
  page: Page,
  description: string,
  dueDate = "2026-07-20",
  priority?: "high" | "medium" | "low",
) {
  await openCreateDialog(page);
  const dialog = page.getByTestId("task-dialog");
  await dialog.getByLabel("Descripción").fill(description);
  await dialog.getByLabel("Fecha de vencimiento").fill(dueDate);
  if (priority) {
    await dialog.getByTestId("priority-trigger").click();
    await page.getByTestId(`priority-option-${priority}`).click();
  }
  await dialog.getByRole("button", { name: "Crear tarea" }).click();
  await expect(page.getByTestId("task-dialog")).toBeHidden();
}

test.describe("US-001 task management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.getByTestId("empty-tasks")).toBeVisible();
  });

  test("creates a task (TC-001)", async ({ page }) => {
    await createTask(
      page,
      "Comprar materiales para el taller",
      "2026-07-20",
      "high",
    );

    const item = page.getByTestId("task-item");
    await expect(item).toHaveCount(1);
    await expect(page.getByTestId("task-description")).toHaveText(
      "Comprar materiales para el taller",
    );
    await expect(page.getByTestId("task-priority")).toContainText("Alta");
    await expect(item).toHaveAttribute("data-completed", "false");
  });

  test("rejects empty description (TC-002)", async ({ page }) => {
    await openCreateDialog(page);
    const dialog = page.getByTestId("task-dialog");
    await dialog.getByLabel("Fecha de vencimiento").fill("2026-07-20");
    await dialog.getByRole("button", { name: "Crear tarea" }).click();
    await expect(
      dialog.getByText("La descripción es obligatoria"),
    ).toBeVisible();
    await expect(page.getByTestId("task-dialog")).toBeVisible();
    await expect(page.getByTestId("empty-tasks")).toBeVisible();
  });

  test("rejects missing due date (TC-004)", async ({ page }) => {
    await openCreateDialog(page);
    const dialog = page.getByTestId("task-dialog");
    await dialog.getByLabel("Descripción").fill("Sin fecha");
    await dialog.getByRole("button", { name: "Crear tarea" }).click();
    await expect(
      dialog.getByText("La fecha de vencimiento es obligatoria"),
    ).toBeVisible();
  });

  test("priority selector has three options inside dialog (TC-005)", async ({
    page,
  }) => {
    await openCreateDialog(page);
    await page.getByTestId("priority-trigger").click();
    await expect(page.getByTestId("priority-option-high")).toBeVisible();
    await expect(page.getByTestId("priority-option-medium")).toBeVisible();
    await expect(page.getByTestId("priority-option-low")).toBeVisible();
  });

  test("edits a task (TC-007)", async ({ page }) => {
    await createTask(page, "Original");
    await expect(page.getByTestId("task-item")).toHaveCount(1);

    await page.getByRole("button", { name: "Editar" }).click();
    const dialog = page.getByTestId("task-dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByLabel("Descripción").fill("Editada");
    await dialog.getByLabel("Fecha de vencimiento").fill("2026-07-25");
    await dialog.getByRole("button", { name: "Guardar cambios" }).click();

    await expect(page.getByTestId("task-dialog")).toBeHidden();
    await expect(page.getByTestId("task-description")).toHaveText("Editada");
    await expect(page.getByTestId("task-due-date")).toContainText("2026-07-25");
  });

  test("deletes the last task and shows empty state (TC-009/TC-010)", async ({
    page,
  }) => {
    await createTask(page, "Única");
    await page.getByRole("button", { name: "Eliminar" }).click();
    await expect(page.getByTestId("empty-tasks")).toBeVisible();
  });

  test("toggles completion and visual distinction (TC-011/TC-013)", async ({
    page,
  }) => {
    await createTask(page, "Pendiente visual");

    const checkbox = page.getByRole("checkbox", {
      name: /Marcar "Pendiente visual" como completada/,
    });
    await checkbox.click();
    await expect(page.getByTestId("task-item")).toHaveAttribute(
      "data-completed",
      "true",
    );
    await expect(page.getByTestId("task-description")).toHaveClass(
      /line-through/,
    );

    await page
      .getByRole("checkbox", {
        name: /Marcar "Pendiente visual" como pendiente/,
      })
      .click();
    await expect(page.getByTestId("task-item")).toHaveAttribute(
      "data-completed",
      "false",
    );
  });

  test("orders tasks by priority (TC-014)", async ({ page }) => {
    await createTask(page, "Baja", "2026-07-20", "low");
    await createTask(page, "Alta", "2026-07-20", "high");
    await createTask(page, "Media", "2026-07-20", "medium");

    const descriptions = page.getByTestId("task-description");
    await expect(descriptions).toHaveCount(3);
    await expect(descriptions.nth(0)).toHaveText("Alta");
    await expect(descriptions.nth(1)).toHaveText("Media");
    await expect(descriptions.nth(2)).toHaveText("Baja");
  });

  test("persists tasks after reload (TC-016)", async ({ page }) => {
    await createTask(page, "Tras recarga");
    await expect(page.getByTestId("task-item")).toHaveCount(1);

    await page.reload();
    await expect(page.getByTestId("task-description")).toHaveText(
      "Tras recarga",
    );
  });

  test("shows empty state on load with no tasks (TC-019)", async ({ page }) => {
    await expect(page.getByTestId("empty-tasks")).toBeVisible();
  });

  test("discards draft without confirmation when closing dialog", async ({
    page,
  }) => {
    await openCreateDialog(page);
    const dialog = page.getByTestId("task-dialog");
    await dialog.getByLabel("Descripción").fill("Borrador no guardado");
    await dialog.getByRole("button", { name: "Cancelar" }).click();
    await expect(page.getByTestId("task-dialog")).toBeHidden();
    await expect(page.getByTestId("empty-tasks")).toBeVisible();

    await openCreateDialog(page);
    await expect(
      page.getByTestId("task-dialog").getByLabel("Descripción"),
    ).toHaveValue("");
  });
});
