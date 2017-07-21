import React, { Component } from 'react';
import SwcRating from './StarWarCharactersRating/SwcRating';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome to War Star Rating System</h1>
        </div>
        <div className="App-body">
          <SwcRating></SwcRating>
        </div>
      </div>
    );
  }
}

export default App;
