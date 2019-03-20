import { combineReducers } from 'redux';
import { SET_FEED } from '../actions';

function items(state=[], action) {
  switch (action.type) {
    case SET_FEED:
      return action.feed;
    default:
      return state;
  }
}

export default combineReducers({ items });
