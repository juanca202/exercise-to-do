import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { TODOS_STORAGE_KEY } from "../lib/constants";
import { useTodoStore } from "../store/todo-store";
import { aTodo } from "../testing/todo-mothers";
import { TodosPage } from "./todos-page";

describe("TodosPage", () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({
      todos: [],
      isHydrated: false,
      storageError: null,
    });
  });

  it("shows empty state when there are no todos", async () => {
    render(<TodosPage />);

    expect(
      await screen.findByText(/no tienes tareas todavía/i),
    ).toBeInTheDocument();
  });

  it("opens create modal from header button", async () => {
    const user = userEvent.setup();
    render(<TodosPage />);

    await screen.findByText(/no tienes tareas todavía/i);
    await user.click(screen.getByRole("button", { name: /nueva tarea/i }));

    expect(
      screen.getByRole("heading", { name: /nueva tarea/i }),
    ).toBeInTheDocument();
  });

  it("lists todos when store has items", async () => {
    localStorage.setItem(
      TODOS_STORAGE_KEY,
      JSON.stringify([aTodo({ description: "Tarea visible" })]),
    );

    render(<TodosPage />);

    expect(await screen.findByText("Tarea visible")).toBeInTheDocument();
  });
});
