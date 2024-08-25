// src/TaskForm.js
import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editTask, editTaskId, tasks }) => {
  // State to manage the task input fields
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  // Use effect to load the task data when editing
  useEffect(() => {
    if (editTaskId !== null) {
      const taskToEdit = tasks.find((task) => task.id === editTaskId);
      if (taskToEdit) {
        setTask(taskToEdit.name);
        setDueDate(taskToEdit.dueDate);
        setCategory(taskToEdit.category);
      }
    }
  }, [editTaskId, tasks]);

  // Handle form submission to add or edit a task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (editTaskId === null) {
        // If not editing, add a new task
        addTask(task, dueDate, category);
      } else {
        // If editing, update the task
        editTask(editTaskId, { id: editTaskId, name: task, dueDate, category, completed: false });
      }
      // Reset form fields after submission
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
      <button type="submit">{editTaskId ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
