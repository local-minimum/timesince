import React, { Component } from 'react';
import './Cards.css';
import { joinClassName }from '../../util';
import BasicButton from '../BasicButton';

export default class NewTimerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
    };
    this.onStartCreate = this.onStartCreate.bind(this);
    this.onAbortCreate = this.onAbortCreate.bind(this);
    this.onUpdateTitle = this.onUpdateTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onStartCreate() {
    this.setState({ title: '', isCreating: true });
  }

  onAbortCreate() {
    this.setState({ title: null, isCreating: false });
  }

  onUpdateTitle(evt) {
    let title = evt.target.value;
    if (title == null) title = '';
    this.setState({ title });
  }

  onSubmit() {

      const { onCreate } = this.props;
      const { title } = this.state;
      onCreate(title);
      this.setState({ isCreating: false, title: null });
  }

  render() {
    const { className } = this.props;
    const jointClassName = joinClassName(['Card', className]);
    const { title, isCreating } = this.state;
    const canSubmit = title && title.length > 0;
    let Body;
    if (isCreating) {
      Body = (
        <div className="-createForm">
          <label>
            Title:
            <input type="text" onChange={this.onUpdateTitle} value={title} placeholder="Since button was pressed" />
          </label>
          <div class="-buttons">
            <BasicButton title='Create' onClick={this.onSubmit} text="Create" disabled={!canSubmit} />
            <BasicButton title='Abort' onClick={this.onAbortCreate} text="Abort" />
          </div>
        </div>
      );
    } else {
      Body = (
        <div className="-createButton" onClick={this.onStartCreate}>
          <div className="-center">＋</div>
        </div>
      );
    }
    return (
      <div className={jointClassName}>
        <h1>Add New Timer</h1>
        {Body}
      </div>
    )
  }
}
