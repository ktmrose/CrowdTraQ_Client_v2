import React, { createContext, useState, useContext } from "react";

const WebsocketContext = createContext({});

const WebsocketProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const connectWebsocket = () => {
    const ws = new WebSocket("ws://localhost:7890");

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
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  };

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error("Error connecting to server");
    }
  };

  return (
    <WebsocketContext.Provider
      value={{ sendMessage, connectWebsocket, socket, messages }}
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
  return context;
};

export { WebsocketProvider, useWebsocketConnection };
