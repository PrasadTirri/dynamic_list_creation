import React from "react";

const FailureView = ({ onRetry }) => {
  return (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/content/react-js/list-creation-failure-lg-output.png"
        alt="Failure"
      />
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
};

export default FailureView;
