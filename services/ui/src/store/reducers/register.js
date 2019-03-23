import { combineReducers } from 'redux';
import { SET_REGISTER_NAME, SET_REGISTER_PWD, SET_REGISTER_REPEAT_PWD, SET_REGISTER_EMAIL, CLEAR_REGISTER_FORM } from '../actions.js';

function user(state='', action) {
  switch (action.type) {
    case SET_REGISTER_NAME:
      return action.user;
    case CLEAR_REGISTER_FORM:
      return '';
    default:
      return state;
  }
}

function password(state='', action) {
  switch (action.type) {
    case SET_REGISTER_PWD:
      return action.password;
    case CLEAR_REGISTER_FORM:
      return '';
    default:
      return state;
  }
}

function repeatPassword(state='', action) {
  switch (action.type) {
    case SET_REGISTER_REPEAT_PWD:
      return action.password;

    case CLEAR_REGISTER_FORM:
      return '';
    default:
      return state;
  }
}

function email(state='', action) {
  switch (action.type) {
    case SET_REGISTER_EMAIL:
      return action.email;
    case CLEAR_REGISTER_FORM:
      return '';
    default:
      return state;
  }
}

export default combineReducers({ user, password, repeatPassword, email });
