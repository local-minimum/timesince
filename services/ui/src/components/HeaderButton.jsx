import React, { Component } from 'react';
import './HeaderButton.css';

export default class HeaderButton extends Component {
  render() {
    const { title, onClick, text, disabled } = this.props
    let className = "HeaderButton"
    if (disabled) {
      className = "HeaderButton -disabled"
    }
    return <div title={title} onClick={!disabled && onClick} className={className}>{text}</div>
  }
}
