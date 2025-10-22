import { useState, useCallback } from "react";

export function useErrorQueue() {
  const [queue, setQueue] = useState([]);

  // Add a new error to the queue
  const pushError = useCallback((error) => {
    setQueue((prev) => [...prev, error]);
  }, []);

  // Remove the first error from the queue
  const popError = useCallback(() => {
    setQueue((prev) => prev.slice(1));
  }, []);

  // Peek at the first error without removing it
  const currentError = queue.length > 0 ? queue[0] : null;

  return { queue, currentError, pushError, popError };
}
