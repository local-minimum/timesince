export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_FEED = 'SET_FEED';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function clearUser() {
  return { type: CLEAR_USER };
}

export function setError({ message }) {
  return {
    type: SET_ERROR,
    message: message == null ? 'Unkown error' : message,
  };
}

export function clearError() {
  return { type: CLEAR_ERROR };
}

export function setFeed(feed) {
  return { type: SET_FEED, feed };
}
