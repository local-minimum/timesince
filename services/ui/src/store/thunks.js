import api from '../api';
import { setUser, clearUser, setError, setFeed } from './actions';

export function retrieveUserState() {
  return function(dispatch) {
    return api.getUser().then(
      user => {
        dispatch(setUser(user));
      },
      error => {
        dispatch(clearUser());
        api.getVisitationTimer().then(
          timer => dispatch(setFeed([timer])),
          error => dispatch(setError({message: 'Feed Empty'})),
        );
      },
    );
  };
}
