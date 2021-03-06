import api from '../api';
import {
  setUser, clearUser, setError, setFeed, setOverlayError, clearRegisterForm,
  clearLoginForm, clearOverlayError,
} from './actions';

export function retrieveUserState() {
  return function(dispatch) {
    return api.getUser().then(
      user => {
        dispatch(setUser(user));
        api.getMyFeed().then(
          response => dispatch(setFeed(response.feed)),
          err => {
            dispatch(setFeed([]));
            dispatch(setError(
              err.message ? err.message : 'Unable to retrieve feed'
            ));
          },
        );
      },
      error => {
        dispatch(clearUser());
        api.getVisitationTimer().then(
          response => dispatch(setFeed(response.feed)),
          error => dispatch(setError('Could not reach server.')),
        );
      },
    );
  };
}

export function registerUser(name, password, email) {
  return function(dispatch) {
    dispatch(clearOverlayError());
    return api.registerUser(name, password, email).then(
      response => {
        dispatch(clearRegisterForm());
        api.login(name, password)
          .then(
            user => {
              dispatch(setUser(user))
              dispatch(setFeed([]));
              api.getMyFeed().then(
                response => dispatch(setFeed(response.feed)),
                err => {
                  dispatch(setFeed([]));
                  dispatch(setError(
                    err.message ? err.message : 'Unable to retrieve feed'
                  ));
                },
              );
            },
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
    dispatch(clearOverlayError());
    return api.login(name, password).then(
      user => {
        dispatch(clearLoginForm());
        dispatch(setUser(user));
        api.getMyFeed().then(
          response => dispatch(setFeed(response.feed)),
          err => {
            dispatch(setFeed([]));
            dispatch(setError(
              err.message ? err.message : 'Unable to retrieve feed'
            ));
          },
        );
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
      () => {
        dispatch(setFeed([]));
        dispatch(clearUser());
        api.getVisitationTimer().then(
          response => dispatch(setFeed(response.feed)),
          error => dispatch(setError('Could not reach server.')),
        );
      },
      err => dispatch(setError(err.message ? err.message : 'Unable to logout')),
    );
  }
}

export function createTimer(title) {
  return function(dispatch) {
    return api.createTimer(title).then(
      () => {
        return api.getMyFeed().then(
          response => dispatch(setFeed(response.feed)),
          err => dispatch(setError(err.message ? err.message : 'Unable to create timer')),
        );
      },
      err => dispatch(setError(err.message ? err.message : 'Unable to create timer')),
    );
  }
}

export function addTimerEvent(timerId) {
  return function(dispatch) {
    return api.addTimerEvent(timerId).then(
      () => {
        return api.getMyFeed().then(
          response => dispatch(setFeed(response.feed)),
          err => dispatch(setError(err.message ? err.message : 'Unable to create timer')),
        );
      },
      err => dispatch(setError(err.message ? err.message : 'Failed to register event')),
    );
  }

}
