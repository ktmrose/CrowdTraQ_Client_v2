import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeedbackModal from "./FeedbackModal";

global.fetch = jest.fn();

describe("FeedbackModal", () => {
  const toggleFeedbackModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when showFeedbackModal is true", () => {
    render(
      <FeedbackModal
        showFeedbackModal={true}
        toggleFeedbackModal={toggleFeedbackModal}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Speak your mind!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Send it off!/i)).toBeInTheDocument();
  });

  it("shows an error when submitting empty feedback", async () => {
    render(
      <FeedbackModal
        showFeedbackModal={true}
        toggleFeedbackModal={toggleFeedbackModal}
      />
    );

    fireEvent.click(screen.getByText(/Send it off!/i));

    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("shows spinner while submitting", async () => {
    fetch.mockImplementation(() => new Promise(() => {})); // never resolves

    render(
      <FeedbackModal
        showFeedbackModal={true}
        toggleFeedbackModal={toggleFeedbackModal}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: "Katie" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Speak your mind!/i), {
      target: { value: "Great app!" },
    });

    fireEvent.click(screen.getByText(/Send it off!/i));

    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("calls toggleFeedbackModal on successful submission", async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    render(
      <FeedbackModal
        showFeedbackModal={true}
        toggleFeedbackModal={toggleFeedbackModal}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Speak your mind!/i), {
      target: { value: "Great app!" },
    });

    fireEvent.click(screen.getByText(/Send it off!/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(toggleFeedbackModal).toHaveBeenCalled();
    });
  });

  it("shows error alert when fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(
      <FeedbackModal
        showFeedbackModal={true}
        toggleFeedbackModal={toggleFeedbackModal}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Speak your mind!/i), {
      target: { value: "Bug found!" },
    });

    fireEvent.click(screen.getByText(/Send it off!/i));

    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });
});
