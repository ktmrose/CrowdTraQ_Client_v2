import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmSong from "./ConfirmSong";

// Mock Modal's app element to avoid warnings
import Modal from "react-modal";
Modal.setAppElement(document.createElement("div"));

describe("ConfirmSong", () => {
  const mockSong = {
    track_id: "123",
    track_name: "Test Track",
    artists: ["Artist One", "Artist Two"],
    album_art: "test.jpg",
  };

  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders song details when open", () => {
    render(
      <ConfirmSong
        isOpen={true}
        selectedSong={mockSong}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(
      screen.getByRole("heading", { name: /push test track to queue/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/artist one, artist two/i)).toBeInTheDocument();
    expect(screen.getByAltText(/test track album art/i)).toBeInTheDocument();
  });

  test("calls onConfirm with selected song when confirm button clicked", () => {
    render(
      <ConfirmSong
        isOpen={true}
        selectedSong={mockSong}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /yes! people need to hear this!/i })
    );
    expect(mockOnConfirm).toHaveBeenCalledWith(mockSong);
  });

  test("calls onCancel when cancel button clicked", () => {
    render(
      <ConfirmSong
        isOpen={true}
        selectedSong={mockSong}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /eh, nevermind. go back/i })
    );
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
