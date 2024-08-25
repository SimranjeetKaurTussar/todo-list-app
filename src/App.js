// src/App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import './App.css';

const App = () => {
  // Initialize the state with tasks from localStorage or an empty array if none exist
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // State to manage the current filter (all, completed, incomplete)
  const [filter, setFilter] = useState('all');

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = (name, dueDate, category) => {
    const newTask = {
      id: Date.now(), // Unique ID for each task
      name,
      completed: false, // Task is initially not completed
      dueDate,
      category,
    };
    // Add the new task to the existing list of tasks
    setTasks([...tasks, newTask]);
  };

  // Function to toggle the completion status of a task
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task by its ID
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on the selected filter option (all, completed, incomplete)
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'incomplete') {
      return !task.completed;
    }
    return true; 
  });

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskFilter setFilter={setFilter} />
      <TaskList tasks={filteredTasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
