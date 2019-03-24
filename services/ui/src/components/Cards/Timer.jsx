import React, { Component } from 'react';
import './Cards.css';
import { joinClassName } from '../../util';
import ItHappenedButton from '../ItHappenedButton';

export default class TimerCard extends Component {
  render() {
    const { title, value, unit, className, id, onRegisterEvent } = this.props;
    const jointClassName = joinClassName(['Card', className]);
    return (
      <div className={jointClassName}>
        <h1>{title}</h1>
        <ItHappenedButton value={value} unit={unit} id={id} onRegisterEvent={onRegisterEvent} />
      </div>
    )
  }
}
