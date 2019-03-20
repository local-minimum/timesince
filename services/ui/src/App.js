import React, { Component } from 'react';
import './App.css';
import Header from './containers/HeaderContainer';
import Feed from './containers/FeedContainer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header className="banner" />
        <Feed />
      </div>
    );
  }
}

export default App;
