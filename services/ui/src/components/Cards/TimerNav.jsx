import React, { Component } from 'react';

import './TimerNav.css';

import tButton from './Timer.button.png';
import tCount from './Timer.count.png';
import tHist from './Timer.histogram.png';

export default class TimerNav extends Component {
  render() {
    const { selected, onSelect } = this.props;
    const bClass = (selected == null) || (selected === 'button') ?  '-option -selected' : '-option';
    const cClass = selected === 'summary' ?  '-option -selected' : '-option';
    const hClass = selected === 'histogram' ?  '-option -selected' : '-option';
    return (
      <div className="TimerNav">
        <img className={bClass} src={tButton} alt="The Click Button"  title="The Click Button" onClick={() => onSelect('button') } />
        <img className={cClass} src={tCount} alt="Summary" title="Summary" onClick={() => onSelect('summary') } />
        <img className={hClass} src={tHist} alt="Time between events"  title="Time between events" onClick={() => onSelect('histogram') } />
      </div>
    )
  }
}
