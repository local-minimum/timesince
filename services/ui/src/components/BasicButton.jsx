import React, { Component } from 'react';
import './BasicButton.css';
import { joinClassName } from '../util';

export default class BasicButton extends Component {
  render() {
    const { title, onClick, text, disabled, className } = this.props
    let classNameCompound = joinClassName(["BasicButton", className, disabled && '-disabled']);
    return <div title={title} onClick={!disabled && onClick} className={classNameCompound}>{text}</div>
  }
}
