import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./styles/main.scss";
import Dashboard from "./components/Dashboard";
import { faCircleQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import img from "./CrowdTraQIntro.png";
import { useWebsocketConnection } from "./context/websocket";
import { Row, Col, Container } from "react-bootstrap";

function App() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { connectWebsocket, socket } = useWebsocketConnection();

  //connect to server only once upon app load
  useEffect(() => {
    connectWebsocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleHelpModal = () => {
    if (showHelpModal) {
      setShowHelpModal(false);
    } else {
      setShowHelpModal(true);
    }
  };

  return (
    <Container className="App p-2">
      <Modal isOpen={showHelpModal} className="modal-body p-2">
        <FontAwesomeIcon
          className="close-icon"
          icon={faXmark}
          onClick={() => toggleHelpModal()}
        ></FontAwesomeIcon>
        <h1>What is</h1>
        <img src={logo} alt="CrowdTraQ" className="intro-img"></img>
        <h3>Responsive playlist built by the Crowd</h3>
        <img src={img} alt="Why is CrowdTraQ?" className="intro-img" />
        <p style={{ textAlign: "left" }}>
          Have you passed the aux cord only to realize with utter despair that
          you have relinquished control to someone who thinks good music is
          nothing more than a hideous disgrace against nature itself?
          <br></br>
          <br></br>
          Previously you had to be the authoritarian to take back control, or
          perhaps you relied on your trusted allies to publically shame the
          offender. You can do that still, but now with{" "}
          <strong>CrowdTraQ</strong>, based on the majority of the crowd. A
          little group-think never hurt anyone...{" "}
          <span role="img" aria-label="upside-down-face">
            🙃
          </span>
          <br></br>
          <br></br>
          Everyone begins with 12 tokens (first round is on the house). Use
          these tokens to queue up songs of your choice (as long as they are on
          Spotify), but the number of tokens required to add songs{" "}
          <em>increases</em> with the size of the queue. If you don't have
          enough tokens to add now, don't worry; if there are no songs queued
          up, adding a song is free!
          <br></br>
          <br></br>
          Want more tokens? Add songs that you think the majority of people will
          like, at least enough to hit the{" "}
          <span role="img" aria-label="fire">
            🔥
          </span>{" "}
          button anyway. Yes, you can give yourself the shameless self-vote --
          don't worry, I won't tell anybody.{" "}
          <span role="img" aria-label="wink">
            😉
          </span>
          <br></br>
          <br></br>
          Trolls, beware! If the majority of people hate a song that you had
          queued up so much they hit the dislike button, that song ends (even
          before it officially does) and you don't get those tokens back.{" "}
          <span role="img" aria-label="bawling">
            😭
          </span>
          <br></br>
          <br></br>
          <span role="img" aria-label="celebration">
            🎉
          </span>{" "}
          So get the room code from the party host and add to the party vibes!
          <span role="img" aria-label="celebration">
            🎉
          </span>
        </p>
        <h3>Credits:</h3>
        <p>
          <a href="https://github.com/ktmrose/CrowdTraQ_Client_v2">@ktmrose</a>{" "}
          - Project architecture, UI/UX design
        </p>
      </Modal>
      <Row className="justify-content-center">
        <Col xs={"auto"}>
          <img src={logo} alt="CrowdTraQ logo" className="img-fluid" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          {socket && <Dashboard />}
          <FontAwesomeIcon
            className="icon mt-5"
            transform="grow-50"
            icon={faCircleQuestion}
            onClick={() => toggleHelpModal()}
          />
        </Col>
      </Row>
    </Container>
  );
}

Modal.setAppElement("#root");

export default App;
