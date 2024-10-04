import React, { useState } from 'react';

const TaskForm = ({ addTask, tasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];

    // Validation
    if (!title || !description || !dueDate) {
      setError('All fields are required!');
    } else if (tasks.some((task) => task.title === title)) {
      setError('Task title must be unique!');
    } else if (dueDate < today) {
      setError('Due date cannot be in the past!');
    } else {
      addTask({ title, description, dueDate, priority, isCompleted: false });
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
