import React, { Component } from 'react';
import './App.css';
import TimelogService from './timelogService';
import TimelogForm from './components/TimelogForm';
import TimelogList from './components/TimelogList';

class App extends Component {
  constructor() {
    super();
    this.handleSaveTimeLog = this.handleSaveTimeLog.bind(this);
    this.handleDeleteTimeLog = this.handleDeleteTimeLog.bind(this);
    this.handleSelectTimelog = this.handleSelectTimelog.bind(this);
    this.fetchTimelogs = this.fetchTimelogs.bind(this);
    this.refreshTimelogList = this.refreshTimelogList.bind(this);

    this.state = {
      timelogs: [],
      selectedTimelog: null
    };
  }

  componentDidMount() {
    this.fetchTimelogs();
  }

  handleSaveTimeLog(timelog) {
    if (timelog.isNew) {
      TimelogService.addTimelog(timelog);
    } else {
      TimelogService.updateTimelog(timelog);
    }
    this.refreshTimelogList();
  }

  handleDeleteTimeLog(timelog) {
    TimelogService.deleteTimelog(timelog);
    this.refreshTimelogList();
  }

  refreshTimelogList() {
    this.setState({
      timelogs: []
    });
    this.fetchTimelogs();
  }

  async fetchTimelogs() {
    const response = await TimelogService.getTimelogs();
    const timelogs = response.payload;

    this.setState({
      timelogs
    });
  }

  handleSelectTimelog(timelog) {
    this.setState({
      selectedTimelog: timelog
    });
  }

  render() {
    const { timelogs, selectedTimelog } = this.state;

    return (
      <div className="container-fluid">
        <TimelogForm
          onSave={this.handleSaveTimeLog}
          timelog={selectedTimelog}
        />
        {/* <div>Timelog search form</div> */}
        <TimelogList
          timelogs={timelogs}
          onDelete={this.handleDeleteTimeLog}
          onSelect={this.handleSelectTimelog}
        />
      </div>
    );
  }
}

export default App;
