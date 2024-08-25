// src/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  // State to manage the task name, due date, and category inputs
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  // Handle form submission to add a new task
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (task.trim()) {
      addTask(task, dueDate, category); // Call the addTask function passed as a prop
      setTask(''); // Clear the task input field
      setDueDate(''); // Clear the due date input field
      setCategory(''); // Clear the category input field
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for the task name */}
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      {/* Input field for the due date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      {/* Input field for the task category */}
      <input
        type="text"
        placeholder="Enter Event"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {/* Button to submit the form */}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
