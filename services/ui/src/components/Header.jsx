import React, { Component } from 'react';

export default class Header extends Component {
  componentDidMount() {
      const { onMount } = this.props;
      if (onMount) onMount();
  }

  render() {
    const { isLoggedIn, error } = this.props;
    const ErrorDiv = error && <div>{error}</div>;
    return (
      <div>
        {isLoggedIn ? 'Welcome' : 'Register'}
        {ErrorDiv}
      </div>
    );
  }
}
