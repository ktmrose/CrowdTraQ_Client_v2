import { render, screen } from "@testing-library/react";
import SongDetails from "./SongDetails";

describe("SongDetails", () => {
  const mockSong = {
    track_name: "Test Track",
    artists: ["Artist One", "Artist Two"],
    album: "Test Album",
    album_art: "test.jpg",
  };

  const mockFormatTime = (val) => `${val}s`;

  test("renders song details when currentSongData is provided", () => {
    render(
      <SongDetails
        currentSongData={mockSong}
        songDuration={200}
        safeSliderProgress={50}
        formatTime={mockFormatTime}
      />
    );

    // Heading with track name and artists
    expect(
      screen.getByRole("heading", { name: /"test track" by/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("song-heading")).toBeInTheDocument();

    // Album art
    expect(screen.getByTestId("album-art")).toBeInTheDocument();

    // Progress slider
    expect(screen.getByLabelText(/song progress/i)).toBeInTheDocument();

    // Time formatting
    expect(screen.getByText("50s")).toBeInTheDocument();
    expect(screen.getByText("150s")).toBeInTheDocument();
  });

  test("renders fallback message when no currentSongData", () => {
    render(<SongDetails currentSongData={null} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();

    expect(
      screen.getByAltText(/party girl is embarassed for you/i)
    ).toBeInTheDocument();
  });
});
