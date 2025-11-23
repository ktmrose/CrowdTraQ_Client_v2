import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { WS_OPEN } from "../../common/config";

// Mock child components to simplify tests
jest.mock("../AddSong/AddSong", () => (props) => (
  <div data-testid="add-song">
    AddSong Component<button onClick={props.toDashBoard}>Back</button>
  </div>
));
jest.mock("../HeaderStats/HeaderStats", () => (props) => (
  <div data-testid="header-stats">
    HeaderStats: {props.tokens}, {props.queueLength}, {props.cost}
  </div>
));
jest.mock("../SongDetails/SongDetails", () => () => (
  <div data-testid="song-details">SongDetails Component</div>
));
jest.mock("../UserActions/UserActions", () => (props) => (
  <div data-testid="user-actions">
    UserActions Component
    <button onClick={() => props.sendReaction(true)}>Like</button>
    <button onClick={() => props.sendReaction(false)}>Dislike</button>
    <button onClick={props.addSong}>Add Song</button>
  </div>
));

// Mock websocket context
jest.mock("../../context/websocket/websocket", () => ({
  useWebsocketConnection: jest.fn(),
}));

import { useWebsocketConnection } from "../../context/websocket/websocket";

describe("Dashboard", () => {
  const mockSendMessage = jest.fn();
  const mockPopError = jest.fn();
  const mockSendLog = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useWebsocketConnection.mockReturnValue({
      sendMessage: mockSendMessage,
      sendLog: mockSendLog,
      currentSongData: {
        track_name: "Test Song",
        duration_ms: 200000,
        progress_ms: 1000,
      },
      queueLength: 2,
      cost: 3,
      tokens: 10,
      feedback: false,
      currentError: null,
      popError: mockPopError,
    });
  });

  test("always renders HeaderStats with props", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("header-stats")).toHaveTextContent("10, 2, 3");
  });

  test("renders SongDetails and UserActions by default", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("song-details")).toBeInTheDocument();
    expect(screen.getByTestId("user-actions")).toBeInTheDocument();
  });

  test("switches to AddSong when addSong is clicked", () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText(/add song/i));
    expect(screen.getByTestId("add-song")).toBeInTheDocument();
  });

  test("returns to dashboard when AddSong calls toDashBoard", () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText(/add song/i)); // switch to AddSong
    fireEvent.click(screen.getByText(/back/i)); // simulate AddSong callback
    expect(screen.getByTestId("song-details")).toBeInTheDocument();
  });

  test("calls sendMessage with like/dislike actions", () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText("Like"));
    expect(mockSendMessage).toHaveBeenCalledWith({
      action: "like_track",
      data: {},
    });

    fireEvent.click(screen.getByText("Dislike"));
    expect(mockSendMessage).toHaveBeenCalledWith({
      action: "dislike_track",
      data: {},
    });
  });

  test("shows error toast when currentError is set", () => {
    useWebsocketConnection.mockReturnValue({
      sendMessage: mockSendMessage,
      currentSongData: null,
      queueLength: 0,
      cost: 0,
      tokens: 0,
      feedback: false,
      currentError: { message: "Something went wrong" },
      popError: mockPopError,
    });

    render(<Dashboard />);
    expect(
      screen.getByText(/error: something went wrong/i)
    ).toBeInTheDocument();
  });
});
