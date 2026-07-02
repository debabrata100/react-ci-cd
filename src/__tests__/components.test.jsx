import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import Game from "../Game";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the game component", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /box game/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add box/i }),
    ).toBeInTheDocument();
  });
});

describe("Game", () => {
  it("renders 9 boxes initially", () => {
    render(<Game />);

    const boxes = screen.getAllByText(/^[1-9]$/);
    expect(boxes).toHaveLength(9);
  });

  it("adds a new box when the button is clicked", () => {
    render(<Game />);

    fireEvent.click(screen.getByRole("button", { name: /add box/i }));

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getAllByText(/^[1-9]$/).length + 1).toBe(10);
  });

  it("removes a box when it is clicked", () => {
    render(<Game />);

    fireEvent.click(screen.getByText("1"));

    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });
});
