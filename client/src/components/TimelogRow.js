import React from 'react';
import moment from 'moment';
import './TimelogList.css';
import { computeTimeDuration } from '../utils';

const TimelogRow = ({ timelog, onDelete, onSelect }) => {
  const startTime = new moment(timelog.startTime).format('hh:mm:ss A');
  const endTime = new moment(timelog.endTime).format('hh:mm:ss A');

  return (
    <li className="timelog-row">
      <span>{timelog.description}</span>
      <span>
        {startTime} - {endTime} |{' '}
        {computeTimeDuration(
          new Date(timelog.startTime),
          new Date(timelog.endTime)
        )}
      </span>
      <span className="actions">
        <button className="btn btn-default" onClick={() => onSelect(timelog)}>
          <i className="fas fa-play" />
        </button>
        <button className="btn btn-default" onClick={() => onDelete(timelog)}>
          <i className="fas fa-trash" />
        </button>
      </span>
    </li>
  );
};

export const TimelogRowHeader = ({ header, onDelete, onSelect }) => {
  const date = new Date(header._id.year, header._id.month - 1, header._id.day);
  return (
    <li>
      <span className="timelog-row-header">
        {new moment(date).format('ddd, D MMM')}
      </span>
      <ul>
        {header.data.map((log, idx) => (
          <TimelogRow
            timelog={log}
            key={idx}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </li>
  );
};
