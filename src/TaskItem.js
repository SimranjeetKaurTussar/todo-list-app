import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskItem = ({ task, toggleComplete, deleteTask, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const [editedCategory, setEditedCategory] = useState(task.category);

  const handleEdit = () => {
    if (typeof onEdit === 'function') {
      onEdit(task.id, editedName, editedDueDate, editedCategory);
    } else {
      console.error('onEdit is not a function');
    }
    setIsEditing(false);
  };

  return (
    <div className="TaskItem">
      {isEditing ? (
        <div className="TaskEditForm">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          />
          <span className={task.completed ? 'completed' : ''}>
            {task.name} - {task.dueDate} - {task.category}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
};

TaskItem.defaultProps = {
  onEdit: () => {}, // Default no-op function
};

export default TaskItem;
