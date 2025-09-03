import React, { createContext, useState, useContext } from "react";

const WebsocketContext = createContext({});

const WebsocketProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentSongData, setCurrentSongData] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const connectWebsocket = () => {
    const ws = new WebSocket("ws://localhost:7890");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.currently_playing) {
          setCurrentSongData(data.currently_playing);
        } else if (data?.search_data) {
          setSearchData(data);
        }
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, data];
          return newMessages.length > 10 ? newMessages.slice(-10) : newMessages; //limit server messages to last 10
        });
      } catch (err) {
        // Fallback for non-JSON messages
        console.log("Raw, unprocessed message from server:", event.data);
      }
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
      socket.send(JSON.stringify(message));
    } else {
      console.error("Error connecting to server");
    }
  };

  return (
    <WebsocketContext.Provider
      value={{
        sendMessage,
        connectWebsocket,
        socket,
        messages,
        currentSongData,
        searchData,
      }}
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
