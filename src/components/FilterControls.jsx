import React from 'react';

const FilterControls = ({ currentFilter, onFilterChange }) => {
  // Filters for Status (Used for Active/Completed filtering)
  const statusFilters = ['All', 'Active', 'Completed'];
  
  // Filters for Category/Priority (Used for Work/Personal/Priority filtering - based on your UI idea)
  // Since we only track 'Priority' (High, Medium, Low), we'll use a simpler set here.
  const priorityFilters = ['High', 'Medium', 'Low'];

  // Helper to check if a filter button should be active
  const isActive = (filter) => currentFilter === filter;

  return (
    <div className="filter-controls-container">
      {/* 1. Status Filters */}
      <div className="status-filters">
        {statusFilters.map(filter => (
          <button
            key={filter}
            className={`filter-button ${isActive(filter) ? 'active' : ''}`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 2. Priority Filters (Optional: Can be combined with status, or added separately) */}
      <div className="priority-filters">
        <span className="filter-label">Priority:  </span>
        {priorityFilters.map(filter => (
          <button
            key={filter}
            className={`filter-button ${isActive(filter) ? 'active' : ''}`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterControls;