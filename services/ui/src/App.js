import React, { Component } from 'react';
import './App.css';
import Header from './containers/HeaderContainer';
import Feed from './containers/FeedContainer';
import Overlay from './containers/OverlayContainer';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Header className="banner" />
        <div class="main">
          <Feed />
          <Overlay />
        </div>
      </div>
    );
  }
}

export default App;
