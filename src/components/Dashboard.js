import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { faFire, faBan, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dashboard = (props) => { //props.accessToken to make requests to server
    const [tokens, setTokens] = useState(0); //TODO: set from server
    const [currentSong, setCurrentSong] = useState(""); //TODO: set from server
    const [currentArtist, setCurrentArtist] = useState(""); //TODO: set from server

    useEffect(() => {
        //TODO get data from server

        //test data
        setTokens(12);
        setCurrentSong("{Current Song")
        setCurrentArtist("{Current Artist}")
    }, [props])

    //TODO: addTokens upon Websocket state push.
    const addSong = () => {
        console.log("Add song button clicked")
        //TODO: Open AddSong modal
    }

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
                <button onClick={() => addSong()}>
                    <FontAwesomeIcon icon={faPlus} />
                    {' '} Add Song
                </button>
            </div>
        </div>
    )
}

export default Dashboard;