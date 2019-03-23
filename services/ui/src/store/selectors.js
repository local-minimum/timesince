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
  return state.overlayForm === OVERLAY.REGISTER;
}

export function registerForm(state) {
  return state.register;
}
