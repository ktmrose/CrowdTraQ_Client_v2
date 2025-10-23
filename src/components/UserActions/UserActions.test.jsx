import { render, screen, fireEvent } from "@testing-library/react";
import UserActions from "./UserActions";

describe("UserActions", () => {
  const mockSendReaction = jest.fn();
  const mockAddSong = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders reaction icons when solicitFeedback is true", () => {
    render(
      <UserActions
        solicitFeedback={true}
        sendReaction={mockSendReaction}
        addSong={mockAddSong}
        providedReaction={false}
      />
    );

    // Fire and ban icons should be present
    const icons = screen.getAllByRole("button"); // returns an array
    expect(icons.length).toBe(3); // assert fire, ban and add song buttons are present

    // Click fire icon (the first one)
    fireEvent.click(icons[0]);
    expect(mockSendReaction).toHaveBeenCalledWith(true);

    // Click ban icon (the second one)
    fireEvent.click(icons[1]);
    expect(mockSendReaction).toHaveBeenCalledWith(false);
  });

  test("calls sendReaction(false) when ban icon clicked", () => {
    render(
      <UserActions
        solicitFeedback={true}
        sendReaction={mockSendReaction}
        addSong={mockAddSong}
        providedReaction={false}
      />
    );

    // Query all <i> icons and click the second one (ban)
    const icons = screen.getAllByRole("button", { hidden: true });
    fireEvent.click(icons[1]);
    expect(mockSendReaction).toHaveBeenCalledWith(false);
  });

  test("renders thank-you message when feedback already provided", () => {
    render(
      <UserActions
        solicitFeedback={false}
        sendReaction={mockSendReaction}
        addSong={mockAddSong}
        providedReaction={true}
      />
    );

    expect(screen.getByText(/thanks for your feedback!/i)).toBeInTheDocument();
  });

  test("renders prompt to add song when no feedback provided", () => {
    render(
      <UserActions
        solicitFeedback={false}
        sendReaction={mockSendReaction}
        addSong={mockAddSong}
        providedReaction={false}
      />
    );

    expect(screen.getByText(/maybe you can add a song/i)).toBeInTheDocument();
  });

  test("calls addSong when Add Song button clicked", () => {
    render(
      <UserActions
        solicitFeedback={false}
        sendReaction={mockSendReaction}
        addSong={mockAddSong}
        providedReaction={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /add song/i }));
    expect(mockAddSong).toHaveBeenCalled();
  });
});
