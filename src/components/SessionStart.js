import React from 'react';

const SessionStart = (props) => {

    return (
        <div className="container">
            <h1>Enter room code:</h1>
            <input 
                type="text"
                required={true}
            />
            <button className="btn">Enter</button>
        </div>
    )
}

export default SessionStart;