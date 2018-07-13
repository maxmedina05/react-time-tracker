import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import TimelogService from './timelogService';
import TimelogForm from './components/TimelogForm';
import TimelogList from './components/TimelogList/TimelogList';
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
      totalTimelogs: 0,
      currentPage: 1,
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

  async refreshTimelogList(query, page) {
    this.setState({
      isLoading: true,
      totalTimelogs: 0,
      currentPage: 1,
      timelogs: []
    });
    try {
      const response = await TimelogService.getTimelogs(query, page);
      const timelogs = response.payload;

      this.setState({
        isLoading: false,
        timelogs,
        totalTimelogs: response.total,
        currentPage: Number.parseInt(response.currentPage)
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
    const {
      timelogs,
      selectedTimelog,
      isLoading,
      totalTimelogs,
      currentPage
    } = this.state;

    return (
      <div className="container-fluid">
        <ToastContainer />
        <LoadingDot isLoading={isLoading} />
        <TimelogForm
          onSave={this.handleSaveTimeLog}
          timelog={selectedTimelog}
        />
        <TimelogList
          currentPage={currentPage}
          timelogs={timelogs}
          total={totalTimelogs}
          onDelete={this.handleDeleteTimeLog}
          onSelect={this.handleSelectTimelog}
          onRefresh={this.refreshTimelogList}
        />
      </div>
    );
  }
}

export default App;
