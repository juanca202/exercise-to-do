import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "./home-page";

describe("HomePage", () => {
  it("renders the getting-started heading", () => {
    // Arrange
    render(<HomePage />);

    // Act
    const heading = screen.getByRole("heading", {
      name: "To get started, edit the page.tsx file.",
    });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it("renders the documentation link", () => {
    // Arrange
    render(<HomePage />);

    // Act
    const link = screen.getByRole("link", { name: "Documentation" });

    // Assert
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("nextjs.org/docs/app/getting-started"),
    );
  });
});
