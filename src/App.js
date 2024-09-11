import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

const App = () => {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
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
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TodoList />} />
      </Routes>
    </>
  );
};

export default App;
