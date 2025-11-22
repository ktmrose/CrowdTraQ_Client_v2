import { useState, useEffect } from "react";
import "./styles/main.scss";
import Dashboard from "./components/Dashboard/Dashboard";
import ClosedConnection from "./components/ClosedConnection/ClosedConnection";
import { useWebsocketConnection } from "./context/websocket/websocket";
import { Row, Col, Container } from "react-bootstrap";
import { WS_OPEN, feedbackEnabled } from "./common/config";
import FeedbackModal from "./components/FeedbackModal/FeedbackModal";

function App() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { connectWebsocket, socket } = useWebsocketConnection();

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

  return (
    <Container className="p-3 animated-bg w-100 App">
      <FeedbackModal
        showFeedbackModal={showFeedbackModal}
        toggleFeedbackModal={toggleFeedbackModal}
      />
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
