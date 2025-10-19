import { useState, useEffect } from "react";
import AddSong from "./AddSong";
import { useWebsocketConnection } from "../context/websocket";
import { Row, Col } from "react-bootstrap";
import { formatTime } from "../common/config";

const Dashboard = (props) => {
  const [isAddingSong, setIsAddingSong] = useState(false);
  const { sendMessage, currentSongData, queueLength, tokens, feedback } =
    useWebsocketConnection();
  const [sliderProgress, setSliderProgress] = useState(0);
  const [providedReaction, setProvidedReaction] = useState(feedback || false);

  // Compute safe values for slider and duration
  const safeSliderProgress = Number.isFinite(sliderProgress)
    ? sliderProgress
    : 0;
  const songDuration = Number.isFinite(currentSongData?.duration_ms)
    ? currentSongData.duration_ms
    : 1;

  // Set slider progress when song changes
  useEffect(() => {
    if (currentSongData && typeof currentSongData.progress_ms === "number") {
      setSliderProgress(currentSongData.progress_ms);
    }
  }, [currentSongData]);

  // Increment slider progress every second to mimic playback
  useEffect(() => {
    if (!currentSongData || !currentSongData.duration_ms) return;
    const interval = setInterval(() => {
      setSliderProgress((prev) => {
        if (prev + 1000 >= currentSongData.duration_ms) {
          sendMessage({ action: "refresh", data: {} });
          return;
        } else if (prev + 1000 > currentSongData.duration_ms) {
          clearInterval(interval);
          return currentSongData.duration_ms;
        }
        return prev + 1000;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [sliderProgress, currentSongData, sendMessage]);

  // Reset reaction when song changes
  useEffect(() => {
    setProvidedReaction(false);
  }, [currentSongData]);

  useEffect(() => {
    setProvidedReaction(feedback || false);
  }, [feedback]);

  const addSong = () => {
    setIsAddingSong(true);
  };

  const sendReaction = (likesTrack) => {
    sendMessage({
      action: `${likesTrack ? "like_track" : "dislike_track"}`,
      data: {},
    });
    setProvidedReaction(true);
  };

  const returnToDashCallback = () => {
    setIsAddingSong(false);
  };

  return (
    <Row className="align-items-center justify-content-center text-center">
      <Col className="text-center">
        <h4 className="mt-4 py-2 fw-bold">Tokens: {tokens}</h4>
        <h4 className="fw-bold">Queue Length: {queueLength}</h4>
        {isAddingSong ? (
          <AddSong toDashBoard={returnToDashCallback} />
        ) : (
          <Row>
            <Col xs={12}>
              <h1 className="mb-3 my-sm-4 fw-bold">
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
              className="text-center"
            >
              <img
                src={currentSongData?.album_art}
                alt={`${currentSongData?.album} album cover`}
                className="w-100"
              />
              {currentSongData && songDuration && (
                <div className="song-progress-wrapper mt-4 p-3">
                  <label htmlFor="song-progress">Song Progress</label>
                  <input
                    type="range"
                    id="song-progress"
                    min={0}
                    max={songDuration}
                    value={safeSliderProgress}
                    readOnly
                    className="w-100 mt-3"
                  />
                  <div className="d-flex justify-content-between">
                    <span>{formatTime(safeSliderProgress)}</span>
                    <span>{formatTime(songDuration - safeSliderProgress)}</span>
                  </div>
                </div>
              )}

              {providedReaction ? (
                <h1 className="m-3">Thanks for your feedback!</h1>
              ) : (
                <Row className="m-3 my-5">
                  <Col xs={6} className="text-center">
                    <i
                      className="fas fa-fire reaction-icon mx-auto"
                      onClick={() => sendReaction(true)}
                    />
                  </Col>
                  <Col xs={6} className="text-center">
                    <i
                      className="fas fa-ban reaction-icon"
                      onClick={() => sendReaction(false)}
                    />
                  </Col>
                </Row>
              )}
              <Row>
                <Col xs={12} className="text-center mt-3">
                  <button
                    onClick={() => addSong()}
                    aria-label="Add Song"
                    className="btn-cta p-3 w-100 fw-bold"
                  >
                    <i className="fas fa-plus" /> Add Song
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
