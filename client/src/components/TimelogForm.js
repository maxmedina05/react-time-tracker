import React, { Component } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import Timelog from '../models/Timelog';

const computeTimeDifference = (date1, date2) => {
  let diff = (date2.getTime() - date1.getTime()) / 1000;

  let seconds = diff % 60;
  let minutes = (diff / 60) % 60;
  let hours = diff / 3600;

  hours = Math.round(hours);
  minutes = Math.round(minutes);
  seconds = Math.round(seconds);

  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`;
};

export default class TimelogForm extends Component {
  constructor(props) {
    super(props);

    this.toggleTimer = this.toggleTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      isClockTicking: false,
      startTime: new Date(),
      endTime: new Date(),
      description: '',
      hours: '0:00:00'
    };
  }

  toggleTimer() {
    const { isClockTicking } = this.state;

    if (!isClockTicking) {
      this.timer = setInterval(this.tick.bind(this), 1000);
    } else {
      clearInterval(this.timer);
      this.handleSave();
    }

    this.setState({
      isClockTicking: !isClockTicking
    });
  }

  handleSave() {
    const timelog = Timelog.buildTimeLog(this.state);
    this.props.onSave(timelog);
    this.setState({
      hours: '0:00:00',
      ...Timelog.defaultTimeLog()
    });
  }

  tick() {
    const currentTime = moment(this.state.endTime).add(1, 's');
    this.handleDateChange('endTime', currentTime);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleDateChange(name, value) {
    const hours = computeTimeDifference(this.state.startTime, value.toDate());

    this.setState({
      [name]: value.toDate(),
      hours: hours
    });
  }

  render() {
    const {
      isClockTicking,
      startTime,
      endTime,
      description,
      hours
    } = this.state;

    return (
      <form>
        <div className="form-row">
          <div className="col-md-6 mb-8">
            <input
              value={description}
              onChange={this.handleChange}
              type="text"
              className="form-control"
              name="description"
              placeholder="What're you up to?"
            />
          </div>
          <div className="material-field col-md-2">
            <label htmlFor="startTime">Start Time</label>
            <Datetime
              onChange={value => this.handleDateChange('startTime', value)}
              name="startTime"
              value={startTime}
            />
          </div>

          <div className="material-field col-md-2">
            <label htmlFor="startTime">End Time</label>
            <Datetime
              onChange={value => this.handleDateChange('endTime', value)}
              name="endTime"
              value={endTime}
            />
          </div>

          <div className="col-md-1">
            <input
              className="form-control"
              type="text"
              readOnly
              value={hours}
            />
          </div>

          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-default action-button"
              onClick={this.toggleTimer}
            >
              {isClockTicking ? (
                <i className="fas fa-stop-circle" />
              ) : (
                <i className="fas fa-play-circle" />
              )}
            </button>
            {/*  */}
          </div>
        </div>
      </form>
    );
  }
}
