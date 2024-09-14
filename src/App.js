// src/App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import Login from './components/Login';
import Register from './components/Register';
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

  // State to manage user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to manage registration
  const [isRegistered, setIsRegistered] = useState(false);

  // State to store user credentials
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (name, dueDate, dueTime, category) => {
    const newTask = {
      id: Date.now(),
      name,
      completed: false,
      dueDate,
      dueTime,
      category,
    };
    setTasks([...tasks, newTask]);
  };

  // Edit an existing task
  const editTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    setEditTaskId(null);
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

  // Handle login
  const handleLogin = (email, password) => {
    if (email === userCredentials.email && password === userCredentials.password) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Handle registration
  const handleRegister = (email, password) => {
    setUserCredentials({ email, password });
    setIsRegistered(true);
  };

  // Show Register page if user is not registered yet
  if (!isRegistered) {
    return <Register onRegister={handleRegister} />;
  }

  // Show Login page if user is not logged in
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Render To-Do List if authenticated
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
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default App;
