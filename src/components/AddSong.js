import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWebsocketConnection } from "../context/websocket";

const AddSong = (props) => {
  const { register, handleSubmit, watch } = useForm();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const songName = watch("search-song");

  const { sendMessage } = useWebsocketConnection();

  const onFormSubmit = (data) => {
    setShowConfirmModal(true);
    //open confirm modal
  };

  const handleModalCancel = () => {
    setShowConfirmModal(false);
  };

  const sendRequest = (payload) => {
    console.log(payload);
    sendMessage(payload);
  };

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
          {...register("add-song")}
          pattern="^[a-zA-Z0-9]+$"
          required
          title="Numbers and letters only"
          className="width-wrapper mx-auto vapor-input"
        />
        <div className="d-flex flex-column align-items-stretch width-wrapper mx-auto">
          <button className="btn-cta p-3 my-5 fw-bold">Find Track</button>
          <button
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
