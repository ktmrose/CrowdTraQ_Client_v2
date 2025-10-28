import { renderHook, act } from "@testing-library/react-hooks";
import { useErrorQueue } from "./useErrorQueue";

describe("useErrorQueue", () => {
  test("starts with empty queue and null currentError", () => {
    const { result } = renderHook(() => useErrorQueue());
    expect(result.current.queue).toEqual([]);
    expect(result.current.currentError).toBeNull();
  });

  test("pushError adds an error and sets currentError", () => {
    const { result } = renderHook(() => useErrorQueue());

    act(() => {
      result.current.pushError("First error");
    });

    expect(result.current.queue).toEqual(["First error"]);
    expect(result.current.currentError).toBe("First error");
  });

  test("pushError maintains FIFO order", () => {
    const { result } = renderHook(() => useErrorQueue());

    act(() => {
      result.current.pushError("First");
      result.current.pushError("Second");
    });

    expect(result.current.queue).toEqual(["First", "Second"]);
    expect(result.current.currentError).toBe("First");
  });

  test("popError removes the first error and advances currentError", () => {
    const { result } = renderHook(() => useErrorQueue());

    act(() => {
      result.current.pushError("First");
      result.current.pushError("Second");
      result.current.popError();
    });

    expect(result.current.queue).toEqual(["Second"]);
    expect(result.current.currentError).toBe("Second");
  });

  test("popError on empty queue leaves it unchanged", () => {
    const { result } = renderHook(() => useErrorQueue());

    act(() => {
      result.current.popError();
    });

    expect(result.current.queue).toEqual([]);
    expect(result.current.currentError).toBeNull();
  });
});
