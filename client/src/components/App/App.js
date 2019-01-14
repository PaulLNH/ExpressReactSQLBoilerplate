import React, { Component } from 'react';
import logo from './assets/img/logo.svg';
import './App.css';
import SampleDBCall from '../SampleDBCall/SampleDBCall';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {/* Importing the SampleDBCall component */}
          <SampleDBCall />
        </div>
      </div>
    );
  }
}

export default App;
