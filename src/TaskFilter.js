// src/TaskFilter.js
import React from 'react';

const TaskFilter = ({ setFilter }) => {
  return (
    <div className='btns'>
      {/* Buttons to set the filter state to 'all', 'completed', or 'incomplete' */}
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={() => setFilter('incomplete')}>Incomplete</button>
    </div>
  );
};

export default TaskFilter;
