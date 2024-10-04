import React, { useReducer } from 'react';
import TaskForm from './TaskForm';
import './App.css';


// Reducer function to manage tasks state
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter((_, index) => index !== action.payload);
    case 'TOGGLE_COMPLETE':
      return state.map((task, index) =>
        index === action.payload ? { ...task, isCompleted: !task.isCompleted } : task
      );
    default:
      return state;
  }
};

const App = () => {
  // Initialize the reducer
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // Function to add a task using dispatch
  const addTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  // Function to toggle task completion
  const toggleComplete = (index) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: index });
  };

  // Function to delete a task
  const deleteTask = (index) => {
    dispatch({ type: 'DELETE_TASK', payload: index });
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>

      {/* TaskForm to add new tasks */}
      <TaskForm addTask={addTask} tasks={tasks} />

      {/* Display task list */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
            <strong>{task.title}</strong> - {task.priority} (Due: {task.dueDate})
            <p>{task.description}</p>

            {/* Toggle task completion */}
            <button onClick={() => toggleComplete(index)}>
              {task.isCompleted ? 'Undo' : 'Mark as Done'}
            </button>

            {/* Delete task button */}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
