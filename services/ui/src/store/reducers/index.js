import { combineReducers } from 'redux';
import {
  SET_ERROR, CLEAR_ERROR, OVERLAY, SET_OVERLAY, SET_OVERLAY_ERROR,
  CLEAR_REGISTER_FORM, CLEAR_LOGIN_FORM,
 } from '../actions';
import user from './user';
import feed from './feed';
import register from './register';
import login from './login';

function error(state = null, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.message;
    case CLEAR_ERROR:
      return null;
    default:
      return state;
  }
}

function overlay(state=null, action) {
  switch (action.type) {
    case SET_OVERLAY:
      if (OVERLAY[action.overlay] != null) {
        return action.overlay;
      } else if (action.overlay == null) {
        return null;
      }
      return state;
    case CLEAR_REGISTER_FORM:
    case CLEAR_LOGIN_FORM:
      return null;
    default:
      return state;
  }
}

function overlayError(state=null, action) {
  switch (action.type) {
    case SET_OVERLAY_ERROR:
      return action.message;
    case CLEAR_LOGIN_FORM:
    case CLEAR_REGISTER_FORM:
    case SET_OVERLAY:
      case null:
    default:
      return state;

  }
}

export default combineReducers({
  error, user, feed, overlay, overlayError, register,
  login,
});
