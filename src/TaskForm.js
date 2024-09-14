// src/TaskForm.js
import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editTask, editTaskId, tasks }) => {
  // State to manage the task input fields
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [category, setCategory] = useState('');

  // Use effect to load the task data when editing
  useEffect(() => {
    if (editTaskId !== null) {
      const taskToEdit = tasks.find((task) => task.id === editTaskId);
      if (taskToEdit) {
        setTask(taskToEdit.name);
        setDueDate(taskToEdit.dueDate);
        setDueTime(taskToEdit.dueTime);
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
        addTask(task, dueDate, dueTime, category);
      } else {
        // If editing, update the task
        editTask(editTaskId, { id: editTaskId, name: task, dueDate, dueTime, category, completed: false });
      }
      // Reset form fields after submission
      setTask('');
      setDueDate('');
      setDueTime('');
      setCategory('');
    }
  };

  return (
    <div className='TaskForms'>
    <form onSubmit={handleSubmit}>
      <label>
      Task:
      <input
        type="text"
        placeholder="Add a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      </label>
      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <label>
          Due Time:
          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
          />
      </label>
      <label>
        Category/Event:
        <input
          type="text"
          placeholder="Add Category/Event..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <button type="submit">{editTaskId ? 'Update Task' : 'Add Task'}</button>
    </form>
  </div>
  );
};

export default TaskForm;
