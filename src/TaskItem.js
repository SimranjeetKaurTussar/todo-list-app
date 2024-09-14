// src/TaskItem.js
import React from 'react';

const TaskItem = ({ task, toggleComplete, deleteTask, setEditTaskId }) => {
  return (
    <div className="TaskItem">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      <span className={task.completed ? 'completed' : ''}>
        {task.name} - {task.dueDate} - {task.dueTime} - {task.category}
      </span>
      <button onClick={() => setEditTaskId(task.id)}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
