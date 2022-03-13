import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import './AddSong.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddSong = (props) => {
    const { register, handleSubmit, watch } = useForm();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const songId = watch("add-song");

    const onFormSubmit = (data) => {
        setShowConfirmModal(true);
        //open confirm modal
    }

    const handleModalCancel = () => {
        setShowConfirmModal(false);
    }

    const sendRequest = () => {
        console.log(songId);
    }

    return (
        <div>

            <Modal
                isOpen={showConfirmModal}
                className="modal-body"
            >
                <FontAwesomeIcon className="close-icon" icon={faXmark} onClick={() => handleModalCancel()}></FontAwesomeIcon>
                <h1>Push {songId} to queue?</h1>
                <button onClick={() => sendRequest()}>Yes! People need to hear this!</button>
                <button onClick={() => handleModalCancel()}>Eh, nevermind. Go back</button>
            </Modal>

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <h1>Add song by track ID:</h1>
                <input
                    type="text"
                    name="add-song"
                    {...register("add-song")}
                    pattern="^[a-zA-Z0-9]+$"
                    required
                    title="Numbers and letters only"
                />
                <button className="btn">
                    Submit
                </button>
            </form>
            <button className="btn" onClick={() => props.toDashBoard()}>
                Back to Dashboard
            </button>
        </div>
    );
}

Modal.setAppElement("#root");

export default AddSong;