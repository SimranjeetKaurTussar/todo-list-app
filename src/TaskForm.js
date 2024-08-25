import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, currentTask, updateTask }) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask.name);
      setDueDate(currentTask.dueDate);
      setCategory(currentTask.category);
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (currentTask) {
        updateTask(currentTask.id, task, dueDate, category);
      } else {
        addTask(task, dueDate, category);
      }
      setTask('');
      setDueDate('');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">{currentTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
