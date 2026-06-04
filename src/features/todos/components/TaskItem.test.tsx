import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { buildTask } from "../testing/taskMother";
import { TaskItem } from "./TaskItem";

describe("TaskItem", () => {
  it("shows priority badge with label and semantic colors", () => {
    render(
      <TaskItem
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        onToggleComplete={vi.fn()}
        task={buildTask({ priority: "alta", description: "Urgente" })}
      />,
    );

    const badge = screen.getByTestId("priority-badge");
    expect(badge).toHaveTextContent("Alta");
    expect(badge.className).toContain("bg-[#FFCDD2]");
    expect(badge.className).toContain("text-[#C62828]");
  });

  it("shows completed styles with multiple visual signals", () => {
    render(
      <TaskItem
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        onToggleComplete={vi.fn()}
        task={buildTask({ description: "Hecha", status: "completada" })}
      />,
    );

    expect(screen.getByText("Hecha")).toHaveClass("line-through");
    expect(screen.getByText("Completada")).toBeInTheDocument();
    expect(screen.getByRole("article")).toHaveClass("opacity-60");
  });
});
