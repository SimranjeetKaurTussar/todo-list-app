import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState('all');
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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

  const updateTask = (id, name, dueDate, category) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name, dueDate, category } : task
      )
    );
    setCurrentTask(null);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'incomplete') {
      return !task.completed;
    }
    return true; // 'all'
  });

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} currentTask={currentTask} updateTask={updateTask} />
      <TaskFilter setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        onEdit={(id, name, dueDate, category) => {
          setCurrentTask({ id, name, dueDate, category });
        }}
      />
    </div>
  );
};

export default App;
