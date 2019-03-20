import React, { Component } from 'react';

export default class Feed extends Component {
  render() {
    const { feed } = this.props;
    const item = feed[0];
    if (!item) return <div>Nothing to show</div>;
    return (
      <div>
        <h1>{item.title}</h1>
        <div>{item.value} {item.unit} ago.</div>
      </div>
    );
  }
}
