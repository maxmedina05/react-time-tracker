import React from 'react';
import './LoadingDot.css';

const LoadingDot = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-mask">
      <div className="loading-spinner">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
};

export default LoadingDot;
