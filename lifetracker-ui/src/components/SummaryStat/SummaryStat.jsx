import React from 'react';

const SummaryStat = ({ stat, label, substat }) => {
  return (
    <div className="summary-stat">
      <div className="primary-statistic">
        {stat}
      </div>
      <div className="stat-label">
        {label}
      </div>
      <div className="secondary-statistic">
        {substat}
      </div>
    </div>
  );
};

export default SummaryStat;
