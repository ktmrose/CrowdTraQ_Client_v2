const REACT_APP_ENV = process.env.REACT_APP_ENV || "dev";

export let WS_URL = "";
if (REACT_APP_ENV === "prod") {
  WS_URL = "a tbd websocket url";
} else {
  const host = window.location.hostname;
  WS_URL = `ws://${host}:7890`;
}

export const formatTime = (ms) => {
  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export const isEmpty = (value) => {
  return value === undefined || value === null;
};

export const WS_OPEN = 1;

export const errorCodes = {
  SPOTIFY_API_ERROR: "SPOTIFY_API_ERROR",
  NOTHING_PLAYING: "NO_TRACK_PLAYING",
};

export const feedbackEnabled = REACT_APP_ENV !== "prod";

export const FEEDBACK_API_URL =
  "https://fri3upkwf2fqqteqszzjmg5uva0perxq.lambda-url.us-east-1.on.aws/";
