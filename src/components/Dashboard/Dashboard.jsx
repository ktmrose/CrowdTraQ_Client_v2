import { useState, useEffect } from "react";
import AddSong from "../AddSong/AddSong";
import HeaderStats from "../HeaderStats/HeaderStats";
import SongDetails from "../SongDetails/SongDetails";
import UserActions from "../UserActions/UserActions";
import { useWebsocketConnection } from "../../context/websocket/websocket";
import { Row, Col, ToastContainer, Toast } from "react-bootstrap";
import { formatTime } from "../../common/config";

const Dashboard = () => {
  const [isAddingSong, setIsAddingSong] = useState(false);
  const {
    sendMessage,
    sendLog,
    currentSongData,
    queueLength,
    cost,
    tokens,
    feedback,
    currentError,
    popError,
  } = useWebsocketConnection();
  const [sliderProgress, setSliderProgress] = useState(0);
  const [providedReaction, setProvidedReaction] = useState(feedback || false);
  const [showError, setShowError] = useState(false);

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

  useEffect(() => {
    if (currentError) {
      setShowError(true);
    }
  }, [currentError]);

  const handleToastClose = () => {
    setShowError(false);
    popError(); // remove the error after showing
  };

  const addSong = () => {
    sendLog("debug", "User initiated adding a new song", {
      action: "add_song",
    });
    setIsAddingSong(true);
  };

  const sendReaction = (likesTrack) => {
    sendLog("debug", "User provided song reaction", {
      action: likesTrack ? "like_track" : "dislike_track",
      song: currentSongData?.id || "unknown",
    });
    sendMessage({
      action: `${likesTrack ? "like_track" : "dislike_track"}`,
      data: {},
    });
    setProvidedReaction(true);
  };

  const returnToDashCallback = () => {
    sendLog("debug", "User returned to dashboard from adding song", {
      action: "return_to_dashboard",
    });
    setIsAddingSong(false);
  };

  return (
    <Row className="align-items-center justify-content-center text-center">
      <Col className="text-center">
        <ToastContainer position="top-center" className="p-3">
          <Toast
            bg="danger"
            onClose={handleToastClose}
            show={showError}
            delay={4000}
            autohide
          >
            <Toast.Body className="text-white fw-bold">
              Error: {currentError?.message}
            </Toast.Body>
          </Toast>
        </ToastContainer>
        <HeaderStats tokens={tokens} queueLength={queueLength} cost={cost} />

        {isAddingSong ? (
          <AddSong toDashBoard={returnToDashCallback} />
        ) : (
          <>
            <SongDetails
              currentSongData={currentSongData}
              songDuration={songDuration}
              safeSliderProgress={safeSliderProgress}
              formatTime={formatTime}
            />
            <UserActions
              solicitFeedback={currentSongData && !providedReaction}
              sendReaction={sendReaction}
              addSong={addSong}
              providedReaction={providedReaction}
            />
          </>
        )}
      </Col>
    </Row>
  );
};

export default Dashboard;
