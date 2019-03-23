import React, { Component } from 'react';
import './index.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default class Overlay extends Component {
  render() {
    const { showRegister, showLogin, overlayError } = this.props;
    let Overlay;
    if (showRegister) {
      const {
        onUpdateRegisterName, onUpdateRegisterPwd, onUpdateRegisterRepeatPwd,
        onUpdateRegesterEmail, registerForm, onRegister, onClearRegister,
      } = this.props;
      Overlay = <RegisterForm
          onHide={onClearRegister}
          onUpdateRegisterName={onUpdateRegisterName}
          onUpdateRegisterPwd={onUpdateRegisterPwd}
          onUpdateRegisterRepeatPwd={onUpdateRegisterRepeatPwd}
          onUpdateRegesterEmail={onUpdateRegesterEmail}
          onRegister={() => onRegister(registerForm.user, registerForm.password, registerForm.email)}
          error={overlayError}
          {...registerForm}
      />;
    } else if (showLogin) {
      const {
        onUpdateLoginName, onUpdateLoginPwd, onClearLogin, onLogin,
        loginForm,
      } = this.props;
      Overlay = <LoginForm
        onHide={onClearLogin}
        onUpdateLoginName={onUpdateLoginName}
        onUpdateLoginPwd={onUpdateLoginPwd}
        onLogin={() => onLogin(loginForm.user, loginForm.password)}
        error={overlayError}
        {...loginForm}
      />
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
