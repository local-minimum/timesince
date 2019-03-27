import React, { Component } from 'react';

import './ItHappenedButton.css';

const SUMBIT_STEP = 100;

export default class ItHappenedButton extends Component {
  constructor(props) {
    super(props);
    this.state = { submitProgress: null };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onCountProgress = this.onCountProgress.bind(this);
    this.clearForget = this.clearForget.bind(this);
  }

  onMouseDown(evt) {
    let { submitProgress } = this.state;
    const { id } = this.props;
    if (submitProgress == null) {
      submitProgress = 50;
      if (id != null) {
        this.setState({ submitProgress, progressTxt: '3', progressIter: 1 });
        setTimeout(this.onCountProgress, SUMBIT_STEP);
      } else {
        this.setState({ submitProgress, progressTxt: 'Not allowed', progressIter: 1});
      }
    }
    evt.preventDefault();
  }

  onCountProgress() {
    let { submitProgress, progressIter } = this.state;
    if ( submitProgress == null ) return;
    submitProgress = Math.floor(submitProgress / 1.5);
    let { progressTxt } = this.state;
    if ( progressIter > 12 && submitProgress === 0) {
      progressTxt = 'Just happened';
    } else if ( progressIter > 8) {
      progressTxt = '1';
    } else if (progressIter > 4) {
      progressTxt = '2';
    } else if (progressIter > 12) {
      console.log(progressIter);
      progressTxt = `e ${progressIter}`;
    }
    if (submitProgress > 0) {
      setTimeout(this.onCountProgress, SUMBIT_STEP);
      this.setState({ submitProgress, progressIter: progressIter + 1,  progressTxt });
    } else {
      const { onRegisterEvent, id } = this.props;
      onRegisterEvent(id);
      this.setState({ progressTxt: "Just now", progressIter: null});
    }
  }

  onMouseUp() {
    const { progressIter } = this.state;
    const { id } = this.props;
    if (progressIter != null && id != null) {
      this.setState({ submitProgress: null, progressTxt: 'Forget that' });
      setTimeout(this.clearForget, 1000);
    } else if (progressIter != null) {
      this.setState({ submitProgress: null, progressTxt: null });
    } else {
      this.setState({ submitProgress: null });
    }
  }

  clearForget() {
    const { progressTxt } = this.state;
    if (progressTxt === 'Forget that') {
      this.setState({ progressTxt: null });
    }
  }

  render() {
    const { submitProgress, progressTxt } = this.state;
    const { value, unit }  = this.props;
    const ButtonTxt = progressTxt != null ? progressTxt : (value == null ? 'Never happened' : `${value} ${unit} ago`);
    const extraStyle = submitProgress == null ? null : { boxShadow: `0px 0px ${submitProgress}px red`};

    return (
      <div
          className="ItHappenedButton"
          style={extraStyle}
          onMouseUp={this.onMouseUp}
          onMouseDown={this.onMouseDown}
        >
        <div className="-center">{ButtonTxt}</div>
      </div>
    );
  }
}
