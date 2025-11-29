import React, { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  // 1. Initialize State with mock tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: "Design the task item component", isComplete: false, priority: "High" },
    { id: 2, text: "Refactor state logic", isComplete: true, priority: "Medium" },
  ]);

  // 2. Function to ADD a new task
  const addTask = (taskText, taskPriority) => {
    if (taskText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      isComplete: false,
      priority: taskPriority,
    };

    // ALWAYS use the spread operator (...) to create a NEW array (immutable update)
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  // 3. Function to DELETE a task (uses Array.prototype.filter)
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // 4. Function to TOGGLE the completion status (uses Array.prototype.map)
  const toggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task => 
        task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };


  return (
    <div className="task-manager-app">
      <h1>Advanced Task Manager</h1>
      
      {/* Passing addTask function down */}
      <TaskInput onAddTask={addTask} />
      
      {/* Passing data (tasks) and control functions down */}
      <TaskList 
        tasks={tasks} 
        onDeleteTask={deleteTask}
        onToggleComplete={toggleComplete} 
      />
    </div>
  );
}

export default App;