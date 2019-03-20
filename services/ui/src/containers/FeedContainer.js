import { connect } from 'react-redux';

import { getFeed } from '../store/selectors';
import FeedComponent from '../components/Feed';

const mapDispatchToProps = dispatch => {
  return {
    onHide: (id) => {
      //dispatch(registThunk(name, email));
    },
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
