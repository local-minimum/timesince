import { connect } from 'react-redux';

import { isLoggedIn, getError } from '../store/selectors';
import { retrieveUserState } from '../store/thunks';
import HeaderComponent from '../components/Header';

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (name, email) => {
      //dispatch(registThunk(name, email));
    },
    onMount: () => dispatch(retrieveUserState()),
  };
};

const mapStateToProps = state => {
  return {
    isLoggedIn: isLoggedIn(state),
    error: getError(state),
  };
};

const Header = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderComponent);

export default Header;
