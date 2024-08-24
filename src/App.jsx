import React, { useState, useRef, useEffect } from 'react';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const dataRef = useRef(null); // Reference for the data container

  const handleAddOrUpdateTask = () => {
    if (task.trim() === '') return;

    if (editId) {
      // Update existing task
      setTasks(tasks.map(t =>
        t.id === editId ? { ...t, text: task } : t
      ));
      setEditId(null); // Reset edit mode
    } else {
      // Add new task
      setTasks([...tasks, { id: Date.now(), text: task }]);
    }
    setTask('');  
  };

  const handleEditTask = (id, text) => {
    setTask(text);
    setEditId(id);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    if (editId === id) {
      setTask('');
      setEditId(null);
    }
  };

  useEffect(() => {
    // Scroll to bottom whenever tasks change
    if (dataRef.current) {
      dataRef.current.scrollTop = dataRef.current.scrollHeight;
    }
  }, [tasks]);

  return (
    <div className='container'>
      <div className='box'>
        <div className='one'>
          <h1>Todo List App</h1>
          <input
            type='text'
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder='Enter Task'
          />
          <button 
            onClick={handleAddOrUpdateTask} 
            className={editId ? 'update-task' : 'add-task'}
          >
            {editId ? 'Update Task' : 'Add Task'}
          </button>
        </div>

        <div className='data' ref={dataRef}>
          <h3>Tasks</h3>
          <ul>
            {tasks.map(t => (
              <li key={t.id}>
                <span>{t.text}</span>
                <button className='btnn' onClick={() => handleEditTask(t.id, t.text)}>Edit</button>
                <button onClick={() => handleDeleteTask(t.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
