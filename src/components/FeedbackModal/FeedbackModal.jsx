import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { FEEDBACK_API_URL } from "../../common/config";

const FeedbackModal = ({ showFeedbackModal, toggleFeedbackModal }) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackErrorMessage, setFeedbackErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitFeedback = async () => {
    setIsSubmitting(true);

    if (feedbackMessage.trim() === "") {
      setFeedbackErrorMessage(
        "Fine! If you don't want to say anything, then just close this modal and enjoy the vibes!"
      );
      setIsSubmitting(false);
      return;
    }

    const nameToSend = feedbackName.trim() === "" ? "Anonymous" : feedbackName;
    try {
      const response = await fetch(FEEDBACK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameToSend,
          message: feedbackMessage,
          sessionId: localStorage.getItem("sessionId") || null,
        }),
      });

      if (response.ok) {
        setFeedbackName("");
        setFeedbackMessage("");
        setFeedbackErrorMessage("");
        toggleFeedbackModal();
      } else {
        setFeedbackErrorMessage(
          "Oops, something went wrong sending your feedback."
        );
      }
    } catch (error) {
      setFeedbackErrorMessage("Network error — please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={showFeedbackModal}
      onHide={toggleFeedbackModal}
      className="p-2"
      centered
      dialogClassName="feedback-modal"
    >
      <Modal.Header closeButton className="border-0">
        <h1 className="text-center w-100 modal-title">
          Send message directly to the app creator
        </h1>
      </Modal.Header>
      <Modal.Body className="mb-3">
        <p className="pb-3">
          Did you find a bug? Is there a feature you would really like to see
          built for the next version? <br />
          Or do you just really like this app and want to be friends with
          whoever created this app? <br />
          <br />
          This portal is set up specifically for you to give personalized
          feedback, or just say hi and say how much you love CrowdTraQ!
        </p>
        {feedbackErrorMessage && (
          <div className="alert alert-danger mt-2" role="alert">
            {feedbackErrorMessage}
          </div>
        )}
        <input
          id="feedbackName"
          placeholder="Name"
          type="text"
          className="form-control feedback-input mb-3"
          value={feedbackName}
          onChange={(e) => setFeedbackName(e.target.value)}
        />
        <textarea
          placeholder="Speak your mind!"
          rows={6}
          value={feedbackMessage}
          onChange={(e) => setFeedbackMessage(e.target.value)}
          className="w-100 my-3 form-control feedback-textarea"
        />
        <div className="text-center pt-3">
          {isSubmitting ? (
            <Spinner animation="border" role="status" className="my-2">
              <span className="visually-hidden">Sending...</span>
            </Spinner>
          ) : (
            <button className="feedback-cta my-2" onClick={submitFeedback}>
              Send it off!
            </button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FeedbackModal;
