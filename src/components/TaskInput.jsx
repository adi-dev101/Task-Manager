import React, { useState } from 'react';

const TaskInput = ({ onAddTask }) => {
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState('Medium'); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (inputText.trim() === '') return;

    onAddTask(inputText, priority);

    // Reset local state
    setInputText('');
    setPriority('Medium'); 
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="task-text-input"
      />
      
      <div className="priority-select">
        <label className="priority-label">Priority:</label>
        {/* Simple radio button group for priority */}
        {['High', 'Medium', 'Low'].map(p => (
          <label key={p}>
            <input 
              type="radio" 
              value={p} 
              checked={priority === p}
              onChange={() => setPriority(p)}
            /> {p}
          </label>
        ))}
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInput;