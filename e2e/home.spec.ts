import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("shows the getting-started heading", async ({ page }) => {
    // Arrange / Act
    await page.goto("/");

    // Assert
    await expect(
      page.getByRole("heading", {
        name: "To get started, edit the page.tsx file.",
      }),
    ).toBeVisible();
  });

  test("the /api/hello route handler responds with JSON", async ({
    request,
  }) => {
    // Act
    const response = await request.get("/api/hello");

    // Assert
    expect(response.ok()).toBe(true);
    expect(await response.json()).toEqual({ name: "John Doe" });
  });
});
