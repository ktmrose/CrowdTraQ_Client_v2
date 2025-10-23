import { render, screen } from "@testing-library/react";
import ClosedConnection from "./ClosedConnection";

describe("ClosedConnection", () => {
  test("renders a heading", () => {
    render(<ClosedConnection />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  test("renders image", () => {
    render(<ClosedConnection />);
    expect(
      screen.getByAltText(/party girl is embarassed for you/i)
    ).toBeInTheDocument();
  });
});
