import React, { Component } from 'react';
import './TimelogList.css';
import { TimelogRowHeader } from './TimelogRow';

const buildKey = ({ year, month, day }) => `${year}-${month}-${day}`;
const sequence = N => Array.from(Array(N).keys());
const SUBMIT_SEARCH_DELAY = 300;
const MAX_TIMELOG_PER_PAGE = 5;

export default class TimelogList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.goToPage = this.goToPage.bind(this);

    this.state = {
      query: '',
      currentPage: this.props.currentPage ? this.props.currentPage : 1
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentPage !== nextProps.currentPage) {
      this.setState({
        currentPage: nextProps.currentPage
      });
    }
  }

  handleChange(event) {
    clearTimeout(this.timer);
    const { name, value } = event.target;

    this.timer = setTimeout(() => {
      this.props.onRefresh(value);
    }, SUBMIT_SEARCH_DELAY);

    this.setState({
      [name]: value
    });
  }

  goToPage(event, page) {
    console.log('goToPage', page);
    event.preventDefault();
    const { query } = this.state;
    this.props.onRefresh(query, page + 1);
  }

  render() {
    const { timelogs, onDelete, onSelect } = this.props;
    const { currentPage } = this.state;
    const totalPage =
      this.props.total < 1
        ? 1
        : Math.ceil(this.props.total / MAX_TIMELOG_PER_PAGE);

    const isActive = page => currentPage === page + 1;

    return (
      <div className="paper-card timelog-list">
        <div className="search-field">
          <input
            name="query"
            type="text"
            className="form-control"
            placeholder="Looking for something? Just type something. e.g. Pet Project"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <i className="fas fa-search" />
        </div>

        <ul>
          {timelogs.map(header => (
            <TimelogRowHeader
              header={header}
              key={buildKey(header._id)}
              onDelete={onDelete}
              onSelect={onSelect}
            />
          ))}
        </ul>

        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-end">
            {sequence(totalPage).map(page => (
              <li
                className={`page-item ${isActive(page) ? 'active' : ''}`}
                key={page}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={event => this.goToPage(event, page)}
                >
                  {page + 1}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}
