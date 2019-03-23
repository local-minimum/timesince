import React, { Component } from 'react';
import './Cards.css';

export default class TimerCard extends Component {
  render() {
    const { title, value, unit } = this.props;
    const ButtonTxt = value == null ? 'Never happened' : `${value} ${unit} ago`;
    return (
      <div className='Card'>
        <h1>{title}</h1>
        <div>{ButtonTxt}</div>
      </div>
    )
  }
}
