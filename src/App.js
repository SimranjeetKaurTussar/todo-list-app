// src/App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import './App.css';

const App = () => {
  // State to manage tasks, initialized from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // State to manage the filter
  const [filter, setFilter] = useState('all');

  // State to manage the task currently being edited
  const [editTaskId, setEditTaskId] = useState(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (name, dueDate, category) => {
    const newTask = {
      id: Date.now(),
      name,
      completed: false,
      dueDate,
      category,
    };
    setTasks([...tasks, newTask]);
  };

  // Edit an existing task
  const editTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    setEditTaskId(null); // Reset the editing state
  };

  // Toggle completion status
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on the selected filter
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
      <TaskForm
        addTask={addTask}
        editTask={editTask}
        editTaskId={editTaskId}
        tasks={tasks}
      />
      <TaskFilter setFilter={setFilter} filter={filter} />
      <TaskList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        setEditTaskId={setEditTaskId}
      />
    </div>
  );
};

export default App;
