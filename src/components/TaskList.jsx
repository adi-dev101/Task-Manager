import React from 'react';

const TaskList = ({ tasks, onDeleteTask, onToggleComplete }) => {
  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <p className="empty-message">🎉 All done! Add a new task above.</p>
      ) : (
        <ul className="task-list">
          {/* Map over the tasks array to generate list items */}
          {tasks.map(task => (
            <li 
              key={task.id} 
              className={`task-item ${task.isComplete ? 'completed' : ''}`}
            >
              <div className="task-info">
                {/* Priority Tag for visual feedback */}
                <span className={`priority-tag tag-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <span className="task-text">{task.text}</span>
              </div>
              
              <div className="task-actions">
                {/* Toggle Completion Button */}
                <button 
                  className="toggle-button"
                  onClick={() => onToggleComplete(task.id)}
                  title={task.isComplete ? "Mark Active" : "Mark Complete"}
                >
                  {task.isComplete ? '✅' : '⚪'}
                </button>
                {/* Delete Task Button */}
                <button 
                  className="delete-button"
                  onClick={() => onDeleteTask(task.id)}
                >
                  🗑️
                </button>
              </div>

            </li>
          ))}
        </ul>
      )}
      <div className="task-count">
        {tasks.filter(t => !t.isComplete).length} tasks remaining
      </div>
    </div>
  );
};

export default TaskList;