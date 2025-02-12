import React, { createContext, useEffect, useState, useContext } from "react";

const WebsocketContext = createContext({});

const WebsocketProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:YOUR_PORT");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  return (
    <WebsocketContext.Provider
      value={{ sendMessage, socket, messages }}
      {...props}
    />
  );
};

const useWebsocketConnection = () => {
  const context = useContext(WebsocketContext);
  if (context === undefined) {
    throw new Error(
      "useWebsocketConnection must be used within a WebsocketProvider"
    );
  }
};

export { WebsocketProvider, useWebsocketConnection };
