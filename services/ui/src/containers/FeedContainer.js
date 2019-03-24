import { connect } from 'react-redux';

import { getFeed, showAddTimer, isLoggedIn } from '../store/selectors';
import { createTimer, addTimerEvent } from '../store/thunks';

import FeedComponent from '../components/Feed';

const mapDispatchToProps = dispatch => {
  return {
    onCreateTimer: (title) => dispatch(createTimer(title)),
    onRegisterEvent: (timerId) => dispatch(addTimerEvent(timerId)),
  };
}

const mapStateToProps = state => {
  return {
    feed: getFeed(state),
    showAddTimer: isLoggedIn(state),
  };
}

const Feed = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedComponent);

export default Feed;
