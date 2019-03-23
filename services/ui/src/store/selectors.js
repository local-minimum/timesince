import { OVERLAY } from './actions';

export function isLoggedIn(state) {
  return !!state.user;
}

export function getUserName(state) {
  return state.user && state.user.name;
}

export function getError(state) {
  return state.error;
}

export function getOverlayError(state) {
  return state.overlayError;
}

export function getFeed(state) {
  return state.feed.items;
}

export function isShowingRegisterForm(state) {
  return state.overlay === OVERLAY.REGISTER;
}

export function registerForm(state) {
  return state.register;
}

export function isShowingLoginForm(state) {
  return state.overlay === OVERLAY.LOGIN;
}

export function loginForm(state) {
  return state.login;
}
