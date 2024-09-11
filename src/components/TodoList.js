// src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You need to log in first.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks');
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', { name: newTask }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div>
      <h2>My Tasks</h2>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" />
      <button onClick={handleAddTask}>Add Task</button>
      {error && <p>{error}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.name}
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
