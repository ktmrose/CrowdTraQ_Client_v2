import React, { createContext, useState, useContext } from "react";
import { isEmpty } from "../../common/config";
import { useErrorQueue } from "../../hooks/useErrorQueue/useErrorQueue";
import { errorCodes } from "../../common/config";
import { clearPendingLogs, loadPendingLogs } from "../../common/loggingHelpers";

const WebsocketContext = createContext({});

const WebsocketProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentSongData, setCurrentSongData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [queueLength, setQueueLength] = useState(0);
  const [cost, setCost] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [feedback, setFeedback] = useState(false);
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("sessionId") || null
  );
  const { pushError, popError, currentError } = useErrorQueue();
  const [logQueue, setLogQueue] = useState(loadPendingLogs());

  const clearSearchData = () => setSearchData(null);

  const connectWebsocket = () => {
    const ws = new WebSocket("ws://localhost:7890");

    ws.onopen = () => {
      const hello = { sessionId: sessionId || null };
      ws.send(JSON.stringify(hello));
      sendLog("info", "WebSocket connection established", { method: "onopen" });
      if (logQueue.length > 0) {
        logQueue.forEach((log) => {
          ws.send(JSON.stringify({ type: "LOG_EVENT", payload: log }));
        });
        clearPendingLogs();
        setLogQueue([]); // clear after flush
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.sessionId && !sessionId) {
          // First time: server assigned ID
          setSessionId(data.sessionId);
          localStorage.setItem("sessionId", data.sessionId);
        }
        if (data?.currently_playing) {
          setCurrentSongData(data.currently_playing);
        } else if (data?.search_data) {
          setSearchData(data);
        }
        if (!isEmpty(data?.queue_length)) {
          setQueueLength(data.queue_length);
        }
        if (!isEmpty(data?.cost)) {
          setCost(data.cost);
        }
        if (!isEmpty(data?.tokens)) {
          setTokens(data.tokens);
        }
        if (data?.client_vote) {
          setFeedback(data.client_vote);
        }
        if (data.error) {
          if (data.error.code === errorCodes.NOTHING_PLAYING) {
            //handled in component, no need to push to errorQueue
            setCurrentSongData(null);
          } else {
            pushError(data.error);
          }
        }
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, data];
          return newMessages.length > 10 ? newMessages.slice(-10) : newMessages; //limit server messages to last 10
        });
      } catch (err) {
        // Fallback for non-JSON messages
        sendLog("warning", "Raw, unprocessed message from server:", {
          method: "onmessage",
          payloadType: Object.keys(event.data),
        });
      }
    };

    ws.onclose = () => {
      sendLog("info", "WebSocket connection closed", { method: "onclose" });
    };

    ws.onerror = (error) => {
      sendLog("error", "WebSocket encountered an error:", {
        method: "onerror",
        error: error,
      });
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  };

  const sendMessage = (message) => {
    sendLog("debug", "Sending message to server:", {
      method: "sendMessage",
      payload: message,
    });
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("Error connecting to server");
    }
  };

  const sendLog = (level, message, context = {}) => {
    const entry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
      source: "frontend",
      sessionId,
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "log_event", data: entry }));
    } else {
      // buffer until reconnect
      setLogQueue((prev) => [...prev, entry]);
    }
  };

  return (
    <WebsocketContext.Provider
      value={{
        sendMessage,
        sendLog,
        connectWebsocket,
        socket,
        messages,
        currentSongData,
        searchData,
        clearSearchData,
        queueLength,
        cost,
        tokens,
        feedback,
        currentError,
        popError,
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
