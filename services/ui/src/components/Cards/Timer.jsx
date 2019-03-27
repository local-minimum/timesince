import React, { Component } from 'react';
import './Cards.css';
import { joinClassName } from '../../util';

import TimerNav from './TimerNav';
import TimerSummary from './TimerSummary';
import TimerHistogram from './TimerHistogram';
import ItHappenedButton from '../ItHappenedButton';

export default class TimerCard extends Component {
  constructor(props) {
    super(props);
    this.onSwitchView = this.onSwitchView.bind(this);
    this.state = {}
  }

  onSwitchView(focus) {
    this.setState({ focus });
  }

  render() {
    const { title, value, unit, className, id, history, onRegisterEvent } = this.props;
    const { focus } = this.state;
    const jointClassName = joinClassName(['Card', className]);
    let Main;
    if ((focus == null) || (focus === 'button')) {
      Main = <ItHappenedButton value={value} unit={unit} id={id} onRegisterEvent={onRegisterEvent} />;
    } else if (focus === 'summary') {
      Main = <TimerSummary history={history} />;
    } else if (focus === 'histogram') {
      Main = <TimerHistogram history={history} />;
    }
    return (
      <div className={jointClassName}>
        <h1>{title}</h1>
        <TimerNav selected={focus} onSelect={this.onSwitchView} />
        <div className="-main">
          {Main}
        </div>
      </div>
    )
  }
}
