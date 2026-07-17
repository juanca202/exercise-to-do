import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/todo",
}));

import { MainNav } from "./main-nav";

describe("MainNav", () => {
  it("renders exactly the To-do and Notes options", () => {
    render(<MainNav />);
    expect(screen.getByTestId("nav-link-todo")).toHaveTextContent("To-do");
    expect(screen.getByTestId("nav-link-notes")).toHaveTextContent("Notes");
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("marks the current route as active", () => {
    render(<MainNav />);
    expect(screen.getByTestId("nav-link-todo")).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByTestId("nav-link-notes")).not.toHaveAttribute(
      "aria-current",
    );
  });
});
