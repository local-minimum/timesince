import { combineReducers } from 'redux';

import { SET_LOGIN_NAME, SET_LOGIN_PASSWORD, CLEAR_LOGIN_FORM } from '../actions';

function user(state='', action) {
  switch (action.type) {
    case SET_LOGIN_NAME:
      return action.user;
    case CLEAR_LOGIN_FORM:
      return '';
    default:
      return state;
  }
}

function password(state='', action) {
  switch (action.type) {
    case SET_LOGIN_PASSWORD:
      return action.password;
    case CLEAR_LOGIN_FORM:
      return '';
    default:
      return state;
  }
}


export default combineReducers({
  user, password,
});
