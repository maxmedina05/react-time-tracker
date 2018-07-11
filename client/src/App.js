import React, { Component } from 'react';
import './App.css';

import TimelogService from './timelogService';
import TimelogForm from './components/TimelogForm';

class App extends Component {
  constructor() {
    super();
    this.saveTimeLog = this.saveTimeLog.bind(this);
  }

  saveTimeLog(timelog) {
    TimelogService.addTimelog(timelog);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="paper-card timelog-form">
          <TimelogForm onSave={this.saveTimeLog} />
        </div>
        <div className="timelog-table-container">
          Timelog Container
          <div>Timelog search form</div>
          <div className="timelog-table">Timelog table</div>
        </div>
      </div>
    );
  }
}

export default App;
