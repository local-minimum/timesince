import React, { Component } from 'react';
import './Header.css';
import BasicButton from './BasicButton';

export default class Header extends Component {
  componentDidMount() {
      const { onMount } = this.props;
      if (onMount) onMount();
  }

  render() {
    const { isLoggedIn, error, onLogin, onLogout, onRegister, userName } = this.props;
    const ErrorDiv = error && <div className="-error">{error}</div>;
    const buttons = [];
    let User;
    if (!isLoggedIn) {
      buttons.push(<BasicButton key="login" onClick={onLogin} title="Login as existing user" text="Login" />);
      buttons.push(<BasicButton key="register" onClick={onRegister} title="Register new user" text="Register" />);
    } else {
      User = <h1>{userName}</h1>
      buttons.push(<BasicButton key="logout" onClick={onLogout} title="Logout the current user" text="Logout" />);
    }

    return (
      <div className="Header">
        {User}
        {buttons}
        {ErrorDiv}
      </div>
    );
  }
}
