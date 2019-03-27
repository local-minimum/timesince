import React, { Component } from 'react';
import './TimerSummary.css';

export default class TimerSummary extends Component {
  render() {
    const { history } = this.props;
    if (history == null) {
      return (
        <div className="TimerSummary">
          Not available.
        </div>
      );
    }
    return (
      <div className="TimerSummary">
        {history.length} events
      </div>
    );
  }
}
