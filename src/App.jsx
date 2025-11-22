import { useState, useEffect } from "react";
import "./styles/main.scss";
import Dashboard from "./components/Dashboard/Dashboard";
import ClosedConnection from "./components/ClosedConnection/ClosedConnection";
import { useWebsocketConnection } from "./context/websocket/websocket";
import { Row, Col, Container, Modal } from "react-bootstrap";
import { WS_OPEN, feedbackEnabled, FEEDBACK_API_URL } from "./common/config";

function App() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { connectWebsocket, socket } = useWebsocketConnection();
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackErrorMessage, setFeedbackErrorMessage] = useState("");

  //connect to server only once upon app load
  useEffect(() => {
    connectWebsocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFeedbackModal = () => {
    if (showFeedbackModal) {
      setShowFeedbackModal(false);
    } else {
      setShowFeedbackModal(true);
    }
  };

  const submitFeedback = async () => {
    if (feedbackMessage.trim() === "") {
      setFeedbackErrorMessage(
        "Fine! If you don't want to say anything, then just close this modal and enjoy the vibes!"
      );
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
        console.log("Feedback sent successfully!");
        setFeedbackName("");
        setFeedbackMessage("");
        setFeedbackErrorMessage(""); // clear any previous error
        toggleFeedbackModal();
      } else {
        setFeedbackErrorMessage(
          "Oops, something went wrong sending your feedback."
        );
      }
    } catch (error) {
      setFeedbackErrorMessage("Network error — please try again later.");
    }
  };

  return (
    <Container className="p-3 animated-bg w-100 App">
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
            <div className="alert alert-danger mt-2">
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
            <button className="feedback-cta my-2" onClick={submitFeedback}>
              Send it off!
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Row>
        <Col xs={12} className="text-center">
          <h1 className="w-100 header pt-2 border-info rounded fw-bolder">
            CrowdTraQ
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          {socket && socket.readyState === WS_OPEN ? (
            <Dashboard />
          ) : (
            <ClosedConnection />
          )}
          {feedbackEnabled && (
            <div className="footer">
              <button className="feedback-cta" onClick={toggleFeedbackModal}>
                How are the vibes?
              </button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
