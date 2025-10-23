import { render, screen } from "@testing-library/react";
import HeaderStats from "./HeaderStats";

describe("HeaderStats", () => {
  const mockProps = {
    tokens: 42,
    queueLength: 5,
    cost: 3,
  };

  test("renders without crashing", () => {
    render(<HeaderStats {...mockProps} />);
  });

  test("displays token and queue values", () => {
    render(<HeaderStats {...mockProps} />);
    expect(screen.getByText(/tokens/i)).toHaveTextContent("Tokens: 42");
    expect(screen.getByText(/queue length/i)).toHaveTextContent(
      "Queue Length: 5"
    );
  });

  test("displays cost to add song", () => {
    render(<HeaderStats {...mockProps} />);
    expect(screen.getByText(/cost to add song/i)).toHaveTextContent(
      "Cost to add song: 3"
    );
  });
});
