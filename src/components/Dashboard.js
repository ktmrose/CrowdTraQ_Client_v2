import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddSong from "./AddSong";
import { useWebsocketConnection } from "../context/websocket";
import { Row, Col } from "react-bootstrap";

const Dashboard = (props) => {
  //props.accessToken to make requests to server
  const [tokens, setTokens] = useState(0); //TODO: set from server
  const [providedReaction, setProvidedReaction] = useState(false);
  const [isAddingSong, setIsAddingSong] = useState(false);
  const { sendMessage, currentSongData } = useWebsocketConnection();

  useEffect(() => {
    setTokens(12); // Example token value, replace with actual logic
  }, [currentSongData]);

  //TODO: addTokens upon Websocket state push.
  const addSong = () => {
    console.log("Add song button clicked");
    setIsAddingSong(true);
  };

  const sendFireReaction = () => {
    console.log("HOT!");
    sendMessage(JSON.stringify({ isGoodSong: true }));
    setProvidedReaction(true);
  };

  const sendNotReaction = () => {
    console.log("NOT!");
    sendMessage(JSON.stringify({ isGoodSong: false }));
    setProvidedReaction(true);
  };

  const returnToDashCallback = () => {
    setIsAddingSong(false);
  };

  return (
    <Row className="align-items-center justify-content-center text-center">
      <Col className="text-center">
        <h4>Tokens: {tokens}</h4>
        {isAddingSong ? (
          <AddSong toDashBoard={returnToDashCallback} />
        ) : (
          <Row>
            <Col xs={12}>
              <h1>
                "{currentSongData?.track_name}" by{" "}
                {currentSongData?.artists?.map((artist, index) => (
                  <span key={index}>{`${artist}${
                    index < currentSongData?.artists?.length - 1 ? ", " : ""
                  }`}</span>
                ))}
              </h1>
            </Col>
            <Col
              xs={12}
              sm={{ span: 8, offset: 2 }}
              md={{ span: 6, offset: 3 }}
              lg={{ span: 4, offset: 4 }}
              className="text-center"
            >
              <img
                src={currentSongData?.album_art}
                alt={`${currentSongData?.album} album cover`}
                className="w-100"
              />

              {providedReaction ? (
                <h1 className="m-3">Thanks for your feedback!</h1>
              ) : (
                <Row className="m-3 mt-4">
                  <Col xs={6} className="text-center">
                    <i
                      className="fas fa-fire reaction-icon mx-auto"
                      onClick={() => sendFireReaction()}
                    />
                  </Col>
                  <Col xs={6} className="text-center">
                    <i
                      className="fas fa-ban reaction-icon"
                      onClick={() => sendNotReaction()}
                    />
                  </Col>
                </Row>
              )}
              <Row>
                <Col xs={12} className="text-center mt-3">
                  <button onClick={() => addSong()}>
                    <FontAwesomeIcon icon={faPlus} /> Add Song
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Dashboard;
