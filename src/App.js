import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
// import fontawesome from '~@fortawesome/fontawesome';
// import FontAwesomeIcon from '~@fortawesome/react-fontawesome';
// import { faCoffee } from '~@fortawesome/fontawesome-free'

function App() {
  // const [accessToken, setAccessToken] = useState("testToken"); //used to connect to server

  // fontawesome.library.add("faCoffee")
  return (
    <div className="App background-img">
        <img src={logo} className="App-logo" alt="CrowdTraQ logo" />
        <Dashboard
          // accessToken={accessToken}
        />
        {/* <FontAwesomeIcon icon="faCoffee" /> */}
    </div>
  );
}

export default App;
