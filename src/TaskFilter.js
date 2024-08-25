// src/TaskFilter.js
import React from 'react';
import './App.css'; // Import the CSS file for styling

const TaskFilter = ({ setFilter, filter }) => {
  return (
    <div className='btns'>
      {/* Buttons to set the filter state to 'all', 'completed', or 'incomplete' */}
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
      <button
        className={filter === 'incomplete' ? 'active' : ''}
        onClick={() => setFilter('incomplete')}
      >
        Incomplete
      </button>
    </div>
  );
};

export default TaskFilter;
