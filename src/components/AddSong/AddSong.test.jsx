import { render, screen, fireEvent } from "@testing-library/react";
import AddSong from "./AddSong";

// Mock the websocket context hook
jest.mock("../../context/websocket", () => ({
  useWebsocketConnection: jest.fn(),
}));

import { useWebsocketConnection } from "../../context/websocket";

beforeEach(() => {
  useWebsocketConnection.mockReturnValue({
    sendMessage: jest.fn(),
    searchData: null,
    clearSearchData: jest.fn(),
  });
});

describe("AddSong", () => {
  const mockToDashboard = jest.fn();

  test("renders search input and heading", () => {
    render(<AddSong toDashBoard={mockToDashboard} />);
    expect(
      screen.getByRole("heading", { name: /search for track/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /search song/i })
    ).toBeInTheDocument();
  });

  test("calls sendMessage when typing valid input", () => {
    const { useWebsocketConnection } = require("../../context/websocket");
    const sendMessageMock = jest.fn();
    useWebsocketConnection.mockReturnValue({
      sendMessage: sendMessageMock,
      searchData: null,
      clearSearchData: jest.fn(),
    });

    render(<AddSong toDashBoard={mockToDashboard} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Hello" },
    });

    expect(sendMessageMock).toHaveBeenCalledWith({
      action: "search",
      data: { query: "Hello" },
    });
  });

  test("renders search results when searchData is provided", () => {
    const { useWebsocketConnection } = require("../../context/websocket");
    useWebsocketConnection.mockReturnValue({
      sendMessage: jest.fn(),
      clearSearchData: jest.fn(),
      searchData: {
        search_data: [
          {
            track_id: "1",
            track_name: "Song A",
            artists: ["Artist A"],
            album_art: "a.jpg",
          },
        ],
      },
    });

    render(<AddSong toDashBoard={mockToDashboard} />);
    expect(screen.getByText(/Song A/)).toBeInTheDocument();
    expect(screen.getByText(/Artist A/)).toBeInTheDocument();
  });

  test("calls toDashBoard when Back to Dashboard is clicked", () => {
    const { useWebsocketConnection } = require("../../context/websocket");
    useWebsocketConnection.mockReturnValue({
      sendMessage: jest.fn(),
      clearSearchData: jest.fn(),
      searchData: null,
    });

    render(<AddSong toDashBoard={mockToDashboard} />);
    fireEvent.click(screen.getByRole("button", { name: /back to dashboard/i }));
    expect(mockToDashboard).toHaveBeenCalled();
  });
});
