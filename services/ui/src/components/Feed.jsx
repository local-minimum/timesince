import React, { Component } from 'react';
import './Feed.css'
import Timer from './Cards/Timer';

export default class Feed extends Component {
  render() {
    const { feed } = this.props;
    let Feed;
    if (!feed || feed.length == 0) {
      Feed = <div>Nothing to show</div>;
    } else {
      Feed = feed.map(
        item => <Timer key={item.title} {...item} />
      );
    }
    return (
      <div className="Feed">
        {Feed}
      </div>
    );
  }
}
