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
