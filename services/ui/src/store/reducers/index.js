import { combineReducers } from 'redux';
import { SET_ERROR, CLEAR_ERROR } from '../actions';
import user from './user';
import feed from './feed';

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

export default combineReducers({
  error, user, feed,
});
