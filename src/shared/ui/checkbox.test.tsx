import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    // Arrange
    render(<Checkbox label="Aceptar términos" />);

    // Act
    const checkbox = screen.getByRole("checkbox", { name: "Aceptar términos" });

    // Assert
    expect(checkbox).not.toBeChecked();
  });

  it("renders checked when defaultChecked is true", () => {
    // Arrange
    render(<Checkbox label="Aceptar términos" defaultChecked />);

    // Act
    const checkbox = screen.getByRole("checkbox", { name: "Aceptar términos" });

    // Assert
    expect(checkbox).toBeChecked();
  });

  it("calls onCheckedChange with the new value when clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox label="Aceptar términos" onCheckedChange={onCheckedChange} />,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Aceptar términos" });

    // Act
    await user.click(checkbox);

    // Assert
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("does not respond to interaction when disabled", async () => {
    // Arrange
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox
        label="Aceptar términos"
        disabled
        onCheckedChange={onCheckedChange}
      />,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Aceptar términos" });

    // Act
    await user.click(checkbox);

    // Assert
    expect(checkbox).toHaveAttribute("aria-disabled", "true");
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
