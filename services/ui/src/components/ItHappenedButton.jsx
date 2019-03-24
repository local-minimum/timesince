import React, { Component } from 'react';

import './ItHappenedButton.css';

export default class ItHappenedButton extends Component {
  constructor(props) {
    super(props);
    this.state = { submitProgress: null };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onCountProgress = this.onCountProgress.bind(this);
  }

  onMouseDown() {
    let { submitProgress } = this.state;
    if (submitProgress == null) {
      submitProgress = 50;
      this.setState({ submitProgress });
      setTimeout(this.onCountProgress, 200);
    }
  }

  onCountProgress() {
    let { submitProgress } = this.state;
    if ( submitProgress == null ) return;
    submitProgress = Math.floor(submitProgress / 1.5);
    this.setState({ submitProgress });
    if (submitProgress > 0) {
      setTimeout(this.onCountProgress, 200);
    } else {
      const { onRegisterEvent, id } = this.props;
      onRegisterEvent(id);
    }
  }

  onMouseUp() {
    this.setState({ submitProgress: null });
  }

  render() {
    const { submitProgress } = this.state;
    const { value, unit, id } = this.props;
    const ButtonTxt = value == null ? 'Never happened' : `${value} ${unit} ago`;
    const extraStyle = submitProgress == null ? null : { boxShadow: `0px 0px ${submitProgress}px red`};
    const canSubmit = id != null;

    return (
      <div
          className="ItHappenedButton"
          style={extraStyle}
          onMouseUp={canSubmit ? this.onMouseUp : null}
          onMouseDown={canSubmit ? this.onMouseDown : null}
        >
        <div className="-center">{ButtonTxt}</div>
      </div>
    );
  }
}
