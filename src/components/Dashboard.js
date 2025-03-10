import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { faFire, faBan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddSong from "./AddSong";
import { useWebsocketConnection } from "../context/websocket";

const Dashboard = (props) => {
  //props.accessToken to make requests to server
  const [tokens, setTokens] = useState(0); //TODO: set from server
  const [currentSong, setCurrentSong] = useState(""); //TODO: set from server
  const [currentArtist, setCurrentArtist] = useState(""); //TODO: set from server
  const [providedReaction, setProvidedReaction] = useState(false);
  const [isAddingSong, setIsAddingSong] = useState(false);
  const { sendMessage } = useWebsocketConnection();

  useEffect(() => {
    //TODO get data from server

    //test data
    setTokens(12);
    setCurrentSong("{Current Song");
    setCurrentArtist("{Current Artist}");
  }, [props]);

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
    <div className="container">
      <h4>Tokens: {tokens}</h4>
      {isAddingSong ? (
        <AddSong toDashBoard={returnToDashCallback} />
      ) : (
        <>
          {providedReaction ? (
            <h1>Thanks for your feedback!</h1>
          ) : (
            <>
              <h1>
                How do you like {currentSong} by {currentArtist} ?
              </h1>
              <div className="icon-container">
                <FontAwesomeIcon
                  className="reaction-icon"
                  icon={faFire}
                  onClick={() => sendFireReaction()}
                />
                <FontAwesomeIcon
                  className="reaction-icon"
                  icon={faBan}
                  onClick={() => sendNotReaction()}
                />
                {/* <div className="icon-text">
                            <span>HOT!</span>
                            <span>NOT!</span>
                        </div> */}
              </div>
            </>
          )}
          <div className="btn-container">
            <button onClick={() => addSong()}>
              <FontAwesomeIcon icon={faPlus} /> Add Song
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
