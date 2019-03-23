import React, { Component } from 'react';
import './index.css';
import RegisterForm from './RegisterForm';

export default class Overlay extends Component {
  render() {
    const { showRegister, onHide, onClearRegister, overlayError } = this.props;
    let Overlay;
    if (showRegister) {
      const {
        onUpdateRegisterName, onUpdateRegisterPwd, onUpdateRegisterRepeatPwd,
        onUpdateRegesterEmail, registerForm, onRegister,
      } = this.props;
      Overlay = <RegisterForm
          onHide={() => { onHide(); onClearRegister(); }}
          onUpdateRegisterName={onUpdateRegisterName}
          onUpdateRegisterPwd={onUpdateRegisterPwd}
          onUpdateRegisterRepeatPwd={onUpdateRegisterRepeatPwd}
          onUpdateRegesterEmail={onUpdateRegesterEmail}
          onRegister={() => onRegister(registerForm.user, registerForm.password, registerForm.email)}
          error={overlayError}
          {...registerForm}
      />;
    }
    if (Overlay) {
      return (
        <div className="Overlay">
          {Overlay}
        </div>
      );
    }
    return null;
  }
}
