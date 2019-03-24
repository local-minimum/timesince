import React, { Component } from 'react';
import './Feed.css'
import Timer from './Cards/Timer';
import Info from './Cards/Info';
import NewTimerCard from './Cards/NewTimer';
import Welcome from './Feed.Welcome';

export default class Feed extends Component {
  render() {
    const { feed, onCreateTimer, onRegisterEvent, showAddTimer } = this.props;
    const lang = "ENGLISH";
    let Feed;
    let feedItemSize = '-few';
    if (!feed || feed.length === 0) {
      Feed = [
        <Info {...Welcome[lang]} dismissable className="-few" />,
      ];
    } else {
      feedItemSize = feed.length <= 4 - (showAddTimer ? 1 : 0) ? '-few' : '-many';
      Feed = feed.map(
        item => <Timer key={item.title} {...item} className={feedItemSize} onRegisterEvent={onRegisterEvent} />
      );
    }
    if (showAddTimer) {
      Feed.push(
        <NewTimerCard onCreate={onCreateTimer} className={feedItemSize} />,
      );
    }
    return (
      <div className="Feed">
        {Feed}
      </div>
    );
  }
}
