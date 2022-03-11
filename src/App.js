import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard'

function App() {
  // const [accessToken, setAccessToken] = useState("testToken"); //used to connect to server
  return (
    <div className="App background-img">
        <img src={logo} className="App-logo" alt="CrowdTraQ logo" />
        <Dashboard
          // accessToken={accessToken}
        />
    </div>
  );
}

export default App;
