import React, { Component } from 'react';
import './HeaderButton.css';
import { joinClassName } from '../util';

export default class HeaderButton extends Component {
  render() {
    const { title, onClick, text, disabled, className } = this.props
    let classNameCompound = joinClassName(["HeaderButton", className, disabled && '-disabled']);
    return <div title={title} onClick={!disabled && onClick} className={classNameCompound}>{text}</div>
  }
}
