import React, { Component } from 'react';
import {Header} from './header'
import {Main} from './Main'

import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main/>
      </div>
    );
  }
}

export default App;
