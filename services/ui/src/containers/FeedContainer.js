import { connect } from 'react-redux';

import { getFeed } from '../store/selectors';
import { createTimer } from '../store/thunks';

import FeedComponent from '../components/Feed';

const mapDispatchToProps = dispatch => {
  return {
    onCreateTimer: (title) => dispatch(createTimer(title)),
  };
}

const mapStateToProps = state => {
  return {
    feed: getFeed(state),
  };
}

const Feed = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedComponent);

export default Feed;
