// import React, { useState } from 'react';
// import TaskInput from './components/TaskInput';
// import TaskList from './components/TaskList';

// function App() {
//   // 1. Initialize State with mock tasks
//   const [tasks, setTasks] = useState([
//     { id: 1, text: "Design the task item component", isComplete: false, priority: "High" },
//     { id: 2, text: "Refactor state logic", isComplete: true, priority: "Medium" },
//   ]);

//   // 2. Function to ADD a new task
//   const addTask = (taskText, taskPriority) => {
//     if (taskText.trim() === "") return;

//     const newTask = {
//       id: Date.now(),
//       text: taskText.trim(),
//       isComplete: false,
//       priority: taskPriority,
//     };

//     // ALWAYS use the spread operator (...) to create a NEW array (immutable update)
//     setTasks(prevTasks => [...prevTasks, newTask]);
//   };
  
//   // 3. Function to DELETE a task (uses Array.prototype.filter)
//   const deleteTask = (taskId) => {
//     setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
//   };

//   // 4. Function to TOGGLE the completion status (uses Array.prototype.map)
//   const toggleComplete = (taskId) => {
//     setTasks(prevTasks =>
//       prevTasks.map(task => 
//         task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
//       )
//     );
//   };


//   return (
//     <div className="task-manager-app">
//       <h1>Advanced Task Manager</h1>
      
//       {/* Passing addTask function down */}
//       <TaskInput onAddTask={addTask} />
      
//       {/* Passing data (tasks) and control functions down */}
//       <TaskList 
//         tasks={tasks} 
//         onDeleteTask={deleteTask}
//         onToggleComplete={toggleComplete} 
//       />
//     </div>
//   );
// }

// export default App;


import React from 'react'; // Note: Removed standard useState as it's now in the hook
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
// 1. Import the custom hook
import useLocalStorage from './Custom hooks/useLocalStorage'; 

function App() {
  // 2. Initial Data/Default Value (only used if nothing is in localStorage)
  const initialTasks = [
    { id: 1, text: "Design the task item component", isComplete: false, priority: "High" },
    { id: 2, text: "Refactor state logic", isComplete: true, priority: "Medium" },
  ];
  
  // 3. Replace useState with useLocalStorage
  // The state will now load from localStorage on mount.
  const [tasks, setTasks] = useLocalStorage('taskManagerTasks', initialTasks);

  // The rest of the functions (addTask, deleteTask, toggleComplete) remain exactly the same!
  const addTask = (taskText, taskPriority) => {
    if (taskText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      isComplete: false,
      priority: taskPriority,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

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
      <TaskInput onAddTask={addTask} />
      <TaskList 
        tasks={tasks} 
        onDeleteTask={deleteTask}
        onToggleComplete={toggleComplete} 
      />
    </div>
  );
}

export default App;