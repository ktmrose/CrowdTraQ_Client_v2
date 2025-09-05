export const formatTime = (ms) => {
  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
