import { combineReducers } from 'redux';
import {
  SET_ERROR, CLEAR_ERROR, OVERLAY, SET_OVERLAY, SET_OVERLAY_ERROR,
  SUBMIT_REGISTER,
 } from '../actions';
import user from './user';
import feed from './feed';
import register from './register';

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

function overlayForm(state=null, action) {
  switch (action.type) {
    case SET_OVERLAY:
      switch (action.form) {
        case OVERLAY.REGISTER:
          return action.form;
        default:
          return null;
      }
    case SUBMIT_REGISTER:
      return null;
    default:
      return state;
  }
}

function overlayError(state=null, action) {
  switch (action.type) {
    case SET_OVERLAY_ERROR:
      return action.message;
    case SET_OVERLAY:
      case null:
    default:
      return state;

  }
}

export default combineReducers({
  error, user, feed, overlayForm, overlayError, register,
});
