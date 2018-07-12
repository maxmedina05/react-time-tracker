import React, { Component } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import Timelog from '../models/Timelog';
import { computeTimeDuration } from '../utils';

const buildDefaultState = () => ({
  isClockTicking: false,
  hours: '00:00:00',
  ...Timelog.defaultTimeLog()
});

export default class TimelogForm extends Component {
  constructor(props) {
    super(props);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.isDateValid = this.isDateValid.bind(this);

    this.state = buildDefaultState();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.timelog) {
      this.setState(...buildDefaultState());
      return;
    }

    if (
      !this.props.timelog ||
      this.props.timelog._id !== nextProps.timelog._id
    ) {
      this.setState({
        ...Timelog.buildTimeLog(nextProps.timelog)
      });

      this.toggleTimer();
    }
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
      hours: '00:00:00',
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
    const hours = computeTimeDuration(this.state.startTime, value.toDate());

    this.setState({
      [name]: value.toDate(),
      hours: hours
    });
  }

  isDateValid(current) {
    const { startTime } = this.state;
    const maxDate = moment(startTime).subtract(1, 'day');
    const isValid = current.isAfter(maxDate);
    return isValid;
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
      <form className="paper-card timelog-form">
        <div className="form-row">
          <div className="col-md-5 mb-8">
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
              isValidDate={this.isDateValid}
              value={endTime}
            />
          </div>

          <div className="col-md-2">
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
