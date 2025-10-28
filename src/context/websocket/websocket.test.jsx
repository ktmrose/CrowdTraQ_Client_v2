import React from "react";
import { render, screen, act } from "@testing-library/react";
import { WebsocketProvider, useWebsocketConnection } from "./websocket.js";

// --- Mock WebSocket ---
class MockWebSocket {
  static OPEN = 1;
  readyState = MockWebSocket.OPEN;
  constructor() {
    this.sent = [];
    this.onopen = () => {};
    this.onmessage = () => {};
    this.onclose = () => {};
    this.onerror = () => {};
  }
  send(msg) {
    this.sent.push(msg);
  }
  close() {
    this.readyState = 3; // CLOSED
  }
}

// Replace global WebSocket with a jest mock constructor
beforeAll(() => {
  global.WebSocket = jest.fn(() => new MockWebSocket());
});

beforeEach(() => {
  const instance = new MockWebSocket();
  global.WebSocket = jest.fn(() => instance);
});

afterEach(() => {
  jest.clearAllMocks();
});

// --- Test consumer component ---
const TestConsumer = () => {
  const { connectWebsocket, currentSongData, messages } =
    useWebsocketConnection();

  React.useEffect(() => {
    const cleanup = connectWebsocket();
    return cleanup; // ensures socket.close() is called on unmount
  }, [connectWebsocket]);

  return (
    <div>
      <span data-testid="song">{currentSongData?.title || "none"}</span>
      <span data-testid="messages">{messages.length}</span>
    </div>
  );
};

describe("WebsocketProvider", () => {
  test("updates currentSongData when a message arrives", () => {
    render(
      <WebsocketProvider>
        <TestConsumer />
      </WebsocketProvider>
    );

    // Grab the mock socket instance
    const socket = global.WebSocket.mock.results[0].value;

    act(() => {
      socket.onmessage({
        data: JSON.stringify({ currently_playing: { title: "Song A" } }),
      });
    });

    expect(screen.getByTestId("song").textContent).toBe("Song A");
  });

  test("caps messages array at 10", () => {
    render(
      <WebsocketProvider>
        <TestConsumer />
      </WebsocketProvider>
    );

    const socket = global.WebSocket.mock.results[0].value;

    act(() => {
      for (let i = 0; i < 12; i++) {
        socket.onmessage({ data: JSON.stringify({ msg: i }) });
      }
    });

    expect(screen.getByTestId("messages").textContent).toBe("10");
  });
});
