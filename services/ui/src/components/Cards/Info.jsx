import React, { Component } from 'react';
import './Cards.css';
import { joinClassName } from '../../util';
import HeaderButton from '../HeaderButton';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = { dismissed: false };
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ dismissed: true });
  }

  render() {
    const { dismissed } = this.state;
    if (dismissed) return null;
    const { title, text, dismissable, className } = this.props;
    const jointClassName = joinClassName(['Card', className]);
    let Dismiss = null;
    if (dismissable) {
      Dismiss = <HeaderButton onClick={this.onDismiss} title="Dismiss" text="X" className='-dismiss' />;
    }
    return (
      <div className={jointClassName}>
        {Dismiss}
        <h1>{title}</h1>
        <div className='-body'>
          {text}
        </div>
      </div>
    )
  }
}
