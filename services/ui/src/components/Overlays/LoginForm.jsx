import React, { Component } from 'react';
import './Forms.css';
import BasicButton from '../BasicButton';

export default class LoginForm extends Component {
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
      <div className="Form">
        <label>
          User Name:
          <input type="text" onChange={onUpdateLoginName} value={user} />
        </label>
        <label>
          Password:
          <input type="password" onChange={onUpdateLoginPwd} value={password} />
        </label>
        {Error}
        <div class="action-buttons">
          <BasicButton title='Login' onClick={submit} text="Login" disabled={!canSubmit} />
          <BasicButton title='Cancel' onClick={onHide} text="Cancel" />
        </div>
      </div>
    );
  }
}
