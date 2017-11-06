import React, { Component } from 'react';

import Stage from './components/Stage';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="App">
        <h1>This is where you put things</h1>
        <Stage></Stage>
      </div>
    );
  }
}

export default App;
