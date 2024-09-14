// src/TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleComplete, deleteTask, setEditTaskId }) => {
  if (!tasks) {
    // Prevents errors if `tasks` is undefined
    return <p>No tasks available.</p>;
  }

  return (
    <div className="TaskList">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          setEditTaskId={setEditTaskId}
        />
      ))}
    </div>
  );
};

export default TaskList;
