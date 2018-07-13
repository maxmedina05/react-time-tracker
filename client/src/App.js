import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import TimelogService from './timelogService';
import TimelogForm from './components/TimelogForm';
import TimelogList from './components/TimelogList';
import LoadingDot from './components/LoadingDot/LoadingDot';

function notifyError(err) {
  toast.error(err.message || err, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000
  });
}

class App extends Component {
  constructor() {
    super();
    this.handleSaveTimeLog = this.handleSaveTimeLog.bind(this);
    this.handleDeleteTimeLog = this.handleDeleteTimeLog.bind(this);
    this.handleSelectTimelog = this.handleSelectTimelog.bind(this);
    this.refreshTimelogList = this.refreshTimelogList.bind(this);

    this.state = {
      timelogs: [],
      selectedTimelog: null,
      isLoading: false
    };
  }

  componentDidMount() {
    this.refreshTimelogList('');
  }

  handleSaveTimeLog(timelog) {
    try {
      if (timelog.isNew) {
        TimelogService.addTimelog(timelog);
      } else {
        TimelogService.updateTimelog(timelog);
      }
      this.refreshTimelogList();
    } catch (e) {
      notifyError(e);
    }
  }

  handleDeleteTimeLog(timelog) {
    try {
      TimelogService.deleteTimelog(timelog);
      this.refreshTimelogList();
    } catch (e) {
      notifyError(e);
    }
  }

  async refreshTimelogList(query) {
    this.setState({
      isLoading: true,
      timelogs: []
    });
    try {
      const response = await TimelogService.getTimelogs(query);
      const timelogs = response.payload;

      this.setState({
        isLoading: false,
        timelogs
      });
    } catch (e) {
      notifyError(e);
    } finally {
      this.setState({
        isLoading: false
      });
    }
  }

  handleSelectTimelog(timelog) {
    this.setState({
      selectedTimelog: timelog
    });
  }

  render() {
    const { timelogs, selectedTimelog, isLoading } = this.state;

    return (
      <div className="container-fluid">
        <ToastContainer />
        <LoadingDot isLoading={isLoading} />
        <TimelogForm
          onSave={this.handleSaveTimeLog}
          timelog={selectedTimelog}
        />
        <TimelogList
          timelogs={timelogs}
          onDelete={this.handleDeleteTimeLog}
          onSelect={this.handleSelectTimelog}
          onRefresh={this.refreshTimelogList}
        />
      </div>
    );
  }
}

export default App;
