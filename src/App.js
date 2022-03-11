import logo from './logo.svg';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App background-img">
      {/* <header className="App-header"> */}
        <img src={logo} className="App-logo" alt="CrowdTraQ logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Taco meat!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      {/* </header> */}
    </div>
  );
}

export default App;
