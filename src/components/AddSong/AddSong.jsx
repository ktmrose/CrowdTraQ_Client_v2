import { useEffect, useState } from "react";
import { useWebsocketConnection } from "../../context/websocket/websocket";
import ConfirmSong from "../ConfirmSong/ConfirmSong";

const AddSong = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mostRecentSearch, setMostRecentSearch] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});

  const { sendMessage, searchData, clearSearchData } = useWebsocketConnection();

  const sanitizeInput = (value) => value.replace(/[^a-zA-Z0-9 ]/g, "");

  const handleSearchChange = (input) => {
    if (input) {
      const sanitized = sanitizeInput(input);
      if (sanitized.length > 0) {
        sendMessage({ action: "search", data: { query: sanitized } });
      }
    }
  };

  const handleModalCancel = () => {
    setSelectedSong({});
    setShowConfirmModal(false);
  };

  const submitSong = (track) => {
    setShowConfirmModal(false);
    const payload = { action: "add_track", data: { track_id: track.track_id } };
    sendMessage(payload);
    clearSearchData();
    props.toDashBoard();
  };

  useEffect(() => {
    if (searchData?.search_data?.length > 0)
      setMostRecentSearch(searchData?.search_data);
  }, [searchData]);

  const renderConfirmModal = (track) => {
    setSelectedSong(track);
    setShowConfirmModal(true);
  };

  return (
    <div>
      <ConfirmSong
        isOpen={showConfirmModal}
        onCancel={handleModalCancel}
        onConfirm={submitSong}
        selectedSong={selectedSong}
      />
      <form>
        <h1 className="mb-4">Search for track:</h1>
        <label htmlFor="search-song" className="visually-hidden">
          Search song
        </label>
        <input
          id="search-song"
          type="text"
          name="search-song"
          pattern="^[a-zA-Z0-9]+$"
          required
          title="Numbers and letters only"
          className="width-wrapper mx-auto vapor-input"
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        <div className="d-flex flex-column align-items-stretch width-wrapper mx-auto">
          {mostRecentSearch.length > 0 && (
            <div className="search-results mt-4">
              {searchData?.search_data?.map((track, index) => (
                <div
                  key={index}
                  className="search-result-item mb-3 p-2 align-items-center text-start ps-3 clickable btn-cta my-4 d-flex"
                  onClick={() => renderConfirmModal(track)}
                >
                  <img
                    src={track.album_art}
                    alt={`${track.track_name} album art`}
                    className="album-art me-3 d-inline-block"
                  />
                  <div className="d-inline-block">
                    <h5>{track.track_name}</h5>{" "}
                    <h6>by {track.artists.join(", ")}</h6>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            className="btn-cta p-3 my-2 fw-bold mt-5"
            onClick={() => {
              clearSearchData();
              props.toDashBoard();
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSong;
