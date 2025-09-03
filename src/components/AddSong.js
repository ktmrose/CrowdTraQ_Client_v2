import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWebsocketConnection } from "../context/websocket";

const AddSong = (props) => {
  const { register, handleSubmit, watch } = useForm();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mostRecentSearch, setMostRecentSearch] = useState([]);
  const songName = watch("search_song");

  const { sendMessage, searchData } = useWebsocketConnection();

  const onFormSubmit = (data) => {
    sendMessage({ action: "search", data: { query: data?.search_song } });
  };

  const handleModalCancel = () => {
    setShowConfirmModal(false);
  };

  const sendRequest = (payload) => {
    console.log(payload);
    sendMessage(payload);
  };

  useEffect(() => {
    if (searchData?.search_data?.length > 0)
      setMostRecentSearch(searchData?.search_data);
  }, [searchData]);

  console.log("Most recent search:", mostRecentSearch);
  return (
    <div>
      <Modal isOpen={showConfirmModal} className="modal-body">
        <FontAwesomeIcon
          className="close-icon"
          icon={faXmark}
          onClick={() => handleModalCancel()}
        ></FontAwesomeIcon>
        <h1>Push {"Change me to selected song"} to queue?</h1>
        <button
          onClick={() =>
            sendRequest({
              action: "add_track",
              data: "change me to selected song id",
            })
          }
        >
          Yes! People need to hear this!
        </button>
        <button onClick={() => handleModalCancel()}>
          Eh, nevermind. Go back
        </button>
      </Modal>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h1 className="mb-4">Search for track:</h1>
        <input
          type="text"
          name="search-song"
          {...register("search_song")}
          pattern="^[a-zA-Z0-9]+$"
          required
          title="Numbers and letters only"
          className="width-wrapper mx-auto vapor-input"
        />

        <div className="d-flex flex-column align-items-stretch width-wrapper mx-auto">
          {mostRecentSearch.length > 0 && (
            <div className="search-results mt-4">
              <h4 className="mb-3">Search Results for "{songName}":</h4>
              {searchData?.search_data?.map((track, index) => (
                <div
                  key={index}
                  className="search-result-item mb-3 p-2 align-items-center text-start ps-3 clickable btn-cta my-4"
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
          <button className="btn-cta p-3 my-5 fw-bold" type="submit">
            Find Track
          </button>
          <button
            type="button"
            className="btn-cta p-3 my-2 fw-bold"
            onClick={() => props.toDashBoard()}
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

Modal.setAppElement("#root");

export default AddSong;
