import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Monitor from './components/monitor/Monitor';
import Recently from './components/recently/Recently';
import History from './components/historyList/History';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Monitor />
        <Recently />
        <History />
      </div>
    );
  }
}

export default App;
