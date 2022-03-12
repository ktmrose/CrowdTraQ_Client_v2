import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import SessionStart from './components/SessionStart';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const [accessToken, setAccessToken] = useState(""); //used to connect to server

  useEffect(() => {
    //check session storage for token
  }, [accessToken])

  return (
    <div className="App background-img">
        <img src={logo} className="App-logo" alt="CrowdTraQ logo" />
        {accessToken ? 
          <Dashboard
            // accessToken={accessToken}
          />
          :
          <SessionStart />
        }
        <FontAwesomeIcon className="icon" icon={faCircleQuestion} />
    </div>
  );
}

export default App;
