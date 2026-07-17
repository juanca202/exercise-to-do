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
