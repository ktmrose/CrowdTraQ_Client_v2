import { render, screen } from "@testing-library/react";
import App from "./App";
import { WS_OPEN } from "./common/config";

jest.mock("./context/websocket/websocket", () => ({
  useWebsocketConnection: jest.fn(),
}));

import { useWebsocketConnection } from "./context/websocket/websocket";

describe("App", () => {
  test("renders ClosedConnection when socket is not open", () => {
    useWebsocketConnection.mockReturnValue({
      connectWebsocket: jest.fn(),
      socket: { readyState: !WS_OPEN },
    });

    render(<App />);
    expect(screen.getByTestId("closed-connection")).toBeInTheDocument();
  });

  test("renders Dashboard when socket is open", () => {
    useWebsocketConnection.mockReturnValue({
      connectWebsocket: jest.fn(),
      socket: { readyState: WS_OPEN },
    });

    render(<App />);
    expect(screen.getByTestId("header-stats")).toBeInTheDocument();
  });
});
