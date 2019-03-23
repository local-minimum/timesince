import { connect } from 'react-redux';

import { isLoggedIn, getError, getUserName } from '../store/selectors';
import { showRegister } from '../store/actions';
import { retrieveUserState, logoutUser, loginUser } from '../store/thunks';
import HeaderComponent from '../components/Header';

const mapDispatchToProps = dispatch => {
  return {
    onRegister: () => dispatch(showRegister()),
    onMount: () => dispatch(retrieveUserState()),
    onLogin: (user, password) => dispatch(loginUser(user, password)),
    onLogout: () => dispatch(logoutUser()),
  };
};

const mapStateToProps = state => {
  return {
    isLoggedIn: isLoggedIn(state),
    error: getError(state),
    userName: getUserName(state),
  };
};

const Header = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderComponent);

export default Header;
