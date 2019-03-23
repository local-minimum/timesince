import { connect } from 'react-redux';

import { isShowingRegisterForm, registerForm, getOverlayError } from '../store/selectors';
import {
  hideOverlay,
  updateRegisterPwd, updateRegisterName, updateRegisterRepeatPwd,
  updateRegesterEmail, clearRegisterForm,
} from '../store/actions';
import { registerUser } from '../store/thunks';
import Overlays from '../components/Overlays';

const mapDispatchToProps = dispatch => {
  return {
    onHide: () => dispatch(hideOverlay()),
    onUpdateRegisterName: (evt) => dispatch(updateRegisterName(evt.target.value)),
    onUpdateRegisterPwd: (evt) => dispatch(updateRegisterPwd(evt.target.value)),
    onUpdateRegisterRepeatPwd: (evt) => dispatch(updateRegisterRepeatPwd(evt.target.value)),
    onUpdateRegesterEmail: (evt) => dispatch(updateRegesterEmail(evt.target.value)),
    onClearRegister: () => dispatch(clearRegisterForm()),
    onRegister: (user, password, email) => dispatch(registerUser(user, password, email)),
  };
};

const mapStateToProps = state => {
  return {
    showRegister: isShowingRegisterForm(state),
    registerForm: registerForm(state),
    overlayError: getOverlayError(state),
  };
};

const Overlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(Overlays);

export default Overlay;
