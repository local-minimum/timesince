import React, { Component } from 'react';
import './Forms.css';
import BasicButton from '../BasicButton';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.keyActions = this.keyActions.bind(this);
  }

  keyActions (evt) {
    if (evt.keyCode === 13) {
      const { onLogin } = this.props;
      onLogin();
    }
    else if (evt.keyCode === 27) {
      const { onHide } = this.props;
      onHide();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyActions, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyActions, false);
  }

  render() {
    const {
      onUpdateLoginName, onUpdateLoginPwd, onHide, onLogin,
      error, user, password,
    } = this.props;
    const canSubmit = user.length > 0 && password.length > 0;
    const submit = canSubmit ? onLogin : () => {};
    let Error;
    if (error)     {
      Error = <div className="-error">{error}</div>
    }
    return (
      <form className="Form" onSubmit={submit}>
        <label>
          User Name:
          <input type="text" name="name" onChange={onUpdateLoginName} value={user} />
        </label>
        <label>
          Password:
          <input type="password" password="password" onChange={onUpdateLoginPwd} value={password} />
        </label>
        {Error}
        <div class="action-buttons">
          <BasicButton title='Login' onClick={submit} text="Login" disabled={!canSubmit} />
          <BasicButton title='Cancel' onClick={onHide} text="Cancel" />
        </div>
      </form>
    );
  }
}
