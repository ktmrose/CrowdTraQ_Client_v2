import React from "react";
import Modal from "react-modal";

const ConfirmSong = (props) => {
  return (
    <Modal isOpen={props.isOpen} className="modal-body p-4">
      <h1>Push {props?.selectedSong?.track_name} to queue?</h1>
      <div className="p-2 align-items-center justify-content-center my-4 d-flex">
        <img
          src={props?.selectedSong?.album_art}
          alt={`${props?.selectedSong?.track_name} album art`}
          className="me-3 d-inline-block w-25"
        />
        <div className="d-inline-block">
          <h5>{props?.selectedSong?.track_name}</h5>{" "}
          <h6>by {props?.selectedSong?.artists?.join(", ")}</h6>
        </div>
      </div>
      <button
        className="btn-cta fw-bold p-3 my-5 d-block mx-auto w-75"
        onClick={() => props.onConfirm(props?.selectedSong)}
      >
        Yes! People need to hear this!
      </button>
      <button
        className="btn-cta fw-bold p-3 d-block mx-auto w-75"
        onClick={() => props.onCancel()}
      >
        Eh, nevermind. Go back
      </button>
    </Modal>
  );
};
export default ConfirmSong;
