import React, { Component } from 'react';
import './Forms.css'
import BasicButton from '../BasicButton';

export default class RegisterForm extends Component {
  render() {
    const {
      onUpdateRegisterName, onUpdateRegisterPwd, onUpdateRegesterEmail,
      onUpdateRegisterRepeatPwd, onRegister, onHide,
      user, password, repeatPassword, email, error,
    } = this.props;
    const repeatMatch = password === repeatPassword;
    const shortName = user.length < 1;
    const shortPwd = password.length < 8;
    const canSubmit = repeatMatch && !shortName && !shortPwd;
    const submit = canSubmit ? onRegister: () => {};
    let Error;
    if (error) {
      Error = <div className="-error">{error}</div>
    }
    return (
      <div className="Form">
        <label>
          User Name:
          <input type="text" onChange={onUpdateRegisterName} value={user} />
          {shortName && <div className="input-help">Name's too short</div>}
        </label>
        <label>
          Password:
          <input type="password" onChange={onUpdateRegisterPwd} value={password} />
          {shortPwd && <div className="input-help">Password too short</div>}
        </label>
        <label>
          Repeat Password:
          <input type="password" onChange={onUpdateRegisterRepeatPwd} value={repeatPassword} />
          {!repeatMatch && <div className="input-help">Passwords don't match</div>}
        </label>
        <label>
          E-mail (optional):
          <input type="email" onChange={onUpdateRegesterEmail} value={email} />
          <div class="input-help">E-mail is very optional but you will need to remember your login</div>
        </label>
        {Error}
        <div class="action-buttons">
          <BasicButton title='Register new user' onClick={submit} text="Register" disabled={!canSubmit} />
          <BasicButton title='Cancel' onClick={onHide} text="Cancel" />
        </div>
      </div>
    );
  }
}
