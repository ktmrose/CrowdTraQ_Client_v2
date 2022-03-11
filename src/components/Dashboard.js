import React, { useState } from 'react';
import './Dashboard.css';
import { faFire, faBan, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dashboard = (props) => { //props.accessToken to make requests to server
    const [tokens, setTokens] = useState(12); //TODO: set from server
    const [currentSong, setCurrentSong] = useState("{Current Song}"); //TODO: set from server
    const [currentArtist, setCurrentArtist] = useState("{Current Artist}"); //TODO: set from server

    //TODO: addTokens upon Websocket state push.

    return (
        <div className="container">
            <h4>Tokens: {tokens}</h4>
            <h1>How do you like {currentSong} by {currentArtist} ?</h1>
            <div className="icon-container">
                <FontAwesomeIcon className="reaction-icon" icon={faFire} />
                <FontAwesomeIcon className="reaction-icon" icon={faBan} />
                {/* <div className="icon-text">
                    <span>HOT!</span>
                    <span>NOT!</span>
                </div> */}
            </div>
            <div className="btn-container">
                <button className="btn">
                    <FontAwesomeIcon icon={faPlus} />
                    {' '} Add Song
                </button>
            </div>
        </div>
    )
}

export default Dashboard;