// import React from 'react';

// const TaskList = ({ tasks, onDeleteTask, onToggleComplete }) => {
//   return (
//     <div className="task-list-container">
//       {tasks.length === 0 ? (
//         <p className="empty-message">🎉 All done! Add a new task above.</p>
//       ) : (
//         <ul className="task-list">
//           {/* Map over the tasks array to generate list items */}
//           {tasks.map(task => (
//             <li 
//               key={task.id} 
//               className={`task-item ${task.isComplete ? 'completed' : ''}`}
//             >
//               <div className="task-info">
//                 {/* Priority Tag for visual feedback */}
//                 <span className={`priority-tag tag-${task.priority.toLowerCase()}`}>
//                   {task.priority}
//                 </span>
//                 <span className="task-text">{task.text}</span>
//               </div>
              
//               <div className="task-actions">
//                 {/* Toggle Completion Button */}
//                 <button 
//                   className="toggle-button"
//                   onClick={() => onToggleComplete(task.id)}
//                   title={task.isComplete ? "Mark Active" : "Mark Complete"}
//                 >
//                   {task.isComplete ? '✅' : '⚪'}
//                 </button>
//                 {/* Delete Task Button */}
//                 <button 
//                   className="delete-button"
//                   onClick={() => onDeleteTask(task.id)}
//                 >
//                   🗑️
//                 </button>
//               </div>

//             </li>
//           ))}
//         </ul>
//       )}
//       <div className="task-count">
//         {tasks.filter(t => !t.isComplete).length} tasks remaining
//       </div>
//     </div>
//   );
// };

// export default TaskList;

// The above code is commented out. Below is the corrected and complete version with drag and drop support.

import React from 'react';
// Import the core DND components
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Receives the onDragEnd handler function as a prop
const TaskList = ({ tasks, onDeleteTask, onToggleComplete, onDragEnd }) => {

  return (
    // 1. Wrap the entire list structure in DragDropContext
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-list-container">
        {tasks.length === 0 ? (
          <p className="empty-message">🎉 All done! Add a new task above.</p>
        ) : (
          // 2. Wrap the list container in Droppable
          <Droppable droppableId="taskDroppableList">
            {(provided) => (
              <ul 
                className="task-list"
                {...provided.droppableProps}
                ref={provided.innerRef} 
              >
                {/* 3. Iterate and wrap each task in Draggable */}
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                    {(provided, snapshot) => (
                      <li
                        className={`task-item ${task.isComplete ? 'completed' : ''} 
                                   ${snapshot.isDragging ? 'is-dragging' : ''}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        {/* Drag Handle: The area the user clicks to initiate the drag */}
                        <div className="drag-handle" {...provided.dragHandleProps}>
                            ⠿
                        </div>

                        <div className="task-info">
                          <span className={`priority-tag tag-${task.priority.toLowerCase()}`}>
                            {task.priority}
                          </span>
                          <span className="task-text">{task.text}</span>
                        </div>
                        
                        <div className="task-actions">
                          <button 
                            className="toggle-button"
                            onClick={() => onToggleComplete(task.id)}
                            title={task.isComplete ? "Mark Active" : "Mark Complete"}
                          >
                            {task.isComplete ? '✅' : '⚪'}
                          </button>
                          <button 
                            className="delete-button"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {/* Placeholder necessary for dnd */}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        )}
        <div className="task-count">
          {tasks.filter(t => !t.isComplete).length} tasks remaining
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskList;