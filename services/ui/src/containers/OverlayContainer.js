import { connect } from 'react-redux';

import {
  isShowingRegisterForm, registerForm, getOverlayError,
  isShowingLoginForm, loginForm,
} from '../store/selectors';
import {
  updateRegisterPwd, updateRegisterName, updateRegisterRepeatPwd,
  updateRegesterEmail, clearRegisterForm, updateLoginName, updateLoginPassword,
  clearLoginForm,
} from '../store/actions';
import { registerUser, loginUser } from '../store/thunks';
import Overlays from '../components/Overlays';

const mapDispatchToProps = dispatch => {
  return {
    // REGISTER
    onUpdateRegisterName: (evt) => dispatch(updateRegisterName(evt.target.value)),
    onUpdateRegisterPwd: (evt) => dispatch(updateRegisterPwd(evt.target.value)),
    onUpdateRegisterRepeatPwd: (evt) => dispatch(updateRegisterRepeatPwd(evt.target.value)),
    onUpdateRegesterEmail: (evt) => dispatch(updateRegesterEmail(evt.target.value)),
    onClearRegister: () => dispatch(clearRegisterForm()),
    onRegister: (user, password, email) => dispatch(registerUser(user, password, email)),
    // LOGIN
    onUpdateLoginName: (evt) => dispatch(updateLoginName(evt.target.value)),
    onUpdateLoginPwd: (evt) => dispatch(updateLoginPassword(evt.target.value)),
    onClearLogin: () => dispatch(clearLoginForm()),
    onLogin: (user, password) => dispatch(loginUser(user, password)),
  };
};

const mapStateToProps = state => {
  return {
    showRegister: isShowingRegisterForm(state),
    registerForm: registerForm(state),
    overlayError: getOverlayError(state),
    showLogin: isShowingLoginForm(state),
    loginForm: loginForm(state),
  };
};

const Overlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(Overlays);

export default Overlay;
