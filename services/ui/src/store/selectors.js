export function isLoggedIn(state) {
  return !!state.user;
}

export function getError(state) {
  return state.error;
}

export function getFeed(state) {
  return state.feed.items;
}
