import React, { Component } from 'react';
import './Cards.css';
import { joinClassName } from '../../util';

export default class TimerCard extends Component {
  render() {
    const { title, value, unit, className } = this.props;
    const jointClassName = joinClassName(['Card', className]);
    const ButtonTxt = value == null ? 'Never happened' : `${value} ${unit} ago`;
    return (
      <div className={jointClassName}>
        <h1>{title}</h1>
        <div>{ButtonTxt}</div>
      </div>
    )
  }
}
