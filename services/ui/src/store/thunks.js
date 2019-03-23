import api from '../api';
import { setUser, clearUser, setError, setFeed, setOverlayError, hideOverlay } from './actions';

export function retrieveUserState() {
  return function(dispatch) {
    return api.getUser().then(
      user => {
        dispatch(setUser(user));
      },
      error => {
        dispatch(clearUser());
        api.getVisitationTimer().then(
          timer => dispatch(setFeed([timer])),
          error => dispatch(setError('Could not reach server.')),
        );
      },
    );
  };
}

export function registerUser(name, password, email) {
  return function(dispatch) {
    return api.registerUser(name, password, email).then(
      response => {
        dispatch(hideOverlay());
        api.login(name, password)
          .then(
            user => dispatch(setUser(user)),
            err => dispatch(setError(err.message)),
          );
      },
      error => {
        dispatch(setOverlayError(
          error.message ? error.message : 'Registration refused.'
        ));
      }
    )
  }
}

export function loginUser(name, password) {
  return function(dispatch) {
    return api.login(name, password).then(
      user => {
        dispatch(hideOverlay());
        dispatch(setUser(user));
      },
      err => dispatch(setOverlayError(
        err.message ? err.message : 'Unable to login.'
      )),
    );
  }
}

export function logoutUser() {
  return function(dispatch) {
    return api.logout().then(
      () => dispatch(clearUser()),
      err => dispatch(setError(err.message ? err.message : 'Unable to logout')),
    );
  }
}
