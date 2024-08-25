// src/TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleComplete, deleteTask, setEditTaskId }) => {
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
