import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = (props) => { //props.accessToken to make requests to server
    const [tokens, setTokens] = useState(12);
    return (
        <div className="container">
            <p>Tokens: {tokens}</p>
            <div className="icon-container">
                {/* <FontAwesomeIcon icon="fa-solid fa-fire" /> */}
            </div>
        </div>
    )
}

export default Dashboard;