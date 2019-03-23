export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_FEED = 'SET_FEED';
export const SET_OVERLAY = 'SET_OVERLAY';
export const SET_OVERLAY_ERROR = 'SET_OVERLAY_ERROR';
// REGISTER
export const SET_REGISTER_NAME = 'SET_REGISTER_NAME';
export const SET_REGISTER_PWD = 'SET_REGISTER_PWD';
export const SET_REGISTER_REPEAT_PWD = 'SET_REGISTER_REPEAT_PWD';
export const SET_REGISTER_EMAIL = 'SET_REGISTER_EMAIL';
export const CLEAR_REGISTER_FORM = 'CLEAR_REGISTER_FORM';
// LOGIN
export const SET_LOGIN_NAME = 'SET_LOGIN_NAME';
export const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';
export const CLEAR_LOGIN_FORM = 'CLEAR_LOGIN_FORM';


export const OVERLAY = {
  REGISTER: 'REGISTER',
  LOGIN: 'LOGIN',
};

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function clearUser() {
  return { type: CLEAR_USER };
}

export function setError(message) {
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

// OVERLAYS

export function setOverlayError(message) {
  return { type: SET_OVERLAY_ERROR, message };
}

// REGISTER FORM

export function showRegister() {
  return { type: SET_OVERLAY, overlay: OVERLAY.REGISTER };
}

export function updateRegisterName(user) {
  return { type: SET_REGISTER_NAME, user };
}

export function updateRegisterPwd(password) {
  return { type: SET_REGISTER_PWD, password };
}

export function updateRegisterRepeatPwd(password) {
  return { type: SET_REGISTER_REPEAT_PWD, password };
}

export function updateRegesterEmail(email) {
  return { type: SET_REGISTER_EMAIL, email };
}

export function clearRegisterForm() {
  return { type: CLEAR_REGISTER_FORM };
}

// LOGIN

export function showLogin() {
  return { type: SET_OVERLAY, overlay: OVERLAY.LOGIN };
}

export function updateLoginName(user) {
  return { type: SET_LOGIN_NAME, user };
}

export function updateLoginPassword(password) {
  return { type: SET_LOGIN_PASSWORD, password };
}

export function clearLoginForm() {
  return { type: CLEAR_LOGIN_FORM };
}
