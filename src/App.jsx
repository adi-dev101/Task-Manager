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


// import React from 'react'; // Note: Removed standard useState as it's now in the hook
// import TaskInput from './components/TaskInput';
// import TaskList from './components/TaskList';
// // 1. Import the custom hook
// import useLocalStorage from './Custom hooks/useLocalStorage'; 

// function App() {
//   // 2. Initial Data/Default Value (only used if nothing is in localStorage)
//   const initialTasks = [
//     { id: 1, text: "Design the task item component", isComplete: false, priority: "High" },
//     { id: 2, text: "Refactor state logic", isComplete: true, priority: "Medium" },
//   ];
  
//   // 3. Replace useState with useLocalStorage
//   // The state will now load from localStorage on mount.
//   const [tasks, setTasks] = useLocalStorage('taskManagerTasks', initialTasks);

//   // The rest of the functions (addTask, deleteTask, toggleComplete) remain exactly the same!
//   const addTask = (taskText, taskPriority) => {
//     if (taskText.trim() === "") return;

//     const newTask = {
//       id: Date.now(),
//       text: taskText.trim(),
//       isComplete: false,
//       priority: taskPriority,
//     };
//     setTasks(prevTasks => [...prevTasks, newTask]);
//   };
  
//   const deleteTask = (taskId) => {
//     setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
//   };

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
//       <TaskInput onAddTask={addTask} />
//       <TaskList 
//         tasks={tasks} 
//         onDeleteTask={deleteTask}
//         onToggleComplete={toggleComplete} 
//       />
//     </div>
//   );
// }

// export default App;

// Final version with FilterControls integrated

// import React from 'react';
// import TaskInput from './components/TaskInput';
// import TaskList from './components/TaskList';
// import FilterControls from './components/FilterControls'; // <-- NEW IMPORT
// import useLocalStorage from './Custom hooks/useLocalStorage'; 

// function App() {
//   const initialTasks = [
//     { id: 1, text: "Design the task item component", isComplete: false, priority: "High" },
//     { id: 2, text: "Refactor state logic", isComplete: true, priority: "Medium" },
//     { id: 3, text: "Implement filtering logic", isComplete: false, priority: "Low" },
//   ];
  
//   const [tasks, setTasks] = useLocalStorage('taskManagerTasks', initialTasks);
  
//   // 1. NEW STATE: To store the currently selected filter (e.g., 'Active', 'High')
//   const [filter, setFilter] = useLocalStorage('taskFilter', 'All'); 

//   // --- Task Modification Functions (No Change) ---
//   const addTask = (taskText, taskPriority) => { /* ... (Same code as before) ... */
//     if (taskText.trim() === "") return;
//     const newTask = {
//       id: Date.now(),
//       text: taskText.trim(),
//       isComplete: false,
//       priority: taskPriority,
//     };
//     setTasks(prevTasks => [...prevTasks, newTask]);
//   };
  
//   const deleteTask = (taskId) => { /* ... (Same code) ... */
//     setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
//   };

//   const toggleComplete = (taskId) => { /* ... (Same code) ... */
//     setTasks(prevTasks =>
//       prevTasks.map(task => 
//         task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
//       )
//     );
//   };
  
//   // --- Filtering Logic ---

//   // 2. Function to determine which tasks to display
//   const getFilteredTasks = () => {
//     switch (filter) {
//       case 'Active':
//         return tasks.filter(task => !task.isComplete);
//       case 'Completed':
//         return tasks.filter(task => task.isComplete);
//       case 'High':
//         return tasks.filter(task => task.priority === 'High');
//       case 'Medium':
//         return tasks.filter(task => task.priority === 'Medium');
//       case 'Low':
//         return tasks.filter(task => task.priority === 'Low');
//       case 'All':
//       default:
//         return tasks;
//     }
//   };

//   // 3. Get the list of tasks that should be displayed
//   const filteredTasks = getFilteredTasks();

//   return (
//     <div className="task-manager-app">
//       <h1>Advanced Task Manager</h1>
//       <TaskInput onAddTask={addTask} />
      
//       {/* 4. Render the Filter Controls and pass the filter state/setter */}
//       <FilterControls 
//         currentFilter={filter} 
//         onFilterChange={setFilter} 
//       />

//       {/* 5. Pass the FILTERED list to the TaskList */}
//       <TaskList 
//         tasks={filteredTasks} 
//         onDeleteTask={deleteTask}
//         onToggleComplete={toggleComplete} 
//       />
//     </div>
//   );
// }

// export default App;

// Final version with ThemeContext integrated

// import React from 'react';
// // Components
// import TaskInput from './components/TaskInput';
// import TaskList from './components/TaskList';
// import FilterControls from './components/FilterControls';
// import ThemeToggle from './components/ThemeToggle'; // Integrated ThemeToggle
// // Custom Hooks and Context
// import useLocalStorage from './Custom hooks/useLocalStorage'; // Corrected path
// import { useTheme } from './context/ThemeContext'; // Integrated Theme Context

// function App() {
//   // Access global theme state and toggle function from Context
//   const { theme } = useTheme(); 

//   const initialTasks = [
//     { id: 1, text: "Design the UI layout", isComplete: false, priority: "High" },
//     { id: 2, text: "Test Local Storage", isComplete: true, priority: "Medium" },
//     { id: 3, text: "Implement theme toggle logic", isComplete: false, priority: "Low" },
//   ];
  
//   // State 1: Task List (Persisted)
//   const [tasks, setTasks] = useLocalStorage('taskManagerTasks', initialTasks);
  
//   // State 2: Filter Criteria (Persisted)
//   const [filter, setFilter] = useLocalStorage('taskFilter', 'All'); 

//   // --- Task Modification Functions (CRUD) ---

//   const addTask = (taskText, taskPriority) => {
//     if (taskText.trim() === "") return;

//     const newTask = {
//       id: Date.now(),
//       text: taskText.trim(),
//       isComplete: false,
//       priority: taskPriority,
//     };
//     setTasks(prevTasks => [...prevTasks, newTask]);
//   };
  
//   const deleteTask = (taskId) => {
//     setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
//   };

//   const toggleComplete = (taskId) => {
//     setTasks(prevTasks =>
//       prevTasks.map(task => 
//         task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
//       )
//     );
//   };
  
//   // --- Filtering Logic ---

//   const getFilteredTasks = () => {
//     switch (filter) {
//       case 'Active':
//         return tasks.filter(task => !task.isComplete);
//       case 'Completed':
//         return tasks.filter(task => task.isComplete);
//       case 'High':
//         return tasks.filter(task => task.priority === 'High');
//       case 'Medium':
//         return tasks.filter(task => task.priority === 'Medium');
//       case 'Low':
//         return tasks.filter(task => task.priority === 'Low');
//       case 'All':
//       default:
//         return tasks;
//     }
//   };

//   const filteredTasks = getFilteredTasks();

//   return (
//     // Dynamic class applied for theme styling
//     <div className={`task-manager-app theme-${theme}`}>
      
//       <header className="app-header">
//         <h1>Advanced Task Manager</h1>
//         <ThemeToggle /> {/* Theme Toggle component */}
//       </header>
      
//       <TaskInput onAddTask={addTask} />
      
//       <FilterControls 
//         currentFilter={filter} 
//         onFilterChange={setFilter} 
//       />

//       <TaskList 
//         tasks={filteredTasks} // Passing the filtered list
//         onDeleteTask={deleteTask}
//         onToggleComplete={toggleComplete} 
//       />
//     </div>
//   );
// }

// export default App;

// Final version with drag and drop feature integrated

import React from 'react';
// Components
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterControls from './components/FilterControls';
import ThemeToggle from './components/ThemeToggle'; 
// Custom Hooks and Context (Note the corrected path)
import useLocalStorage from './Custom hooks/useLocalStorage'; 
import { useTheme } from './context/ThemeContext'; 

function App() {
  const { theme } = useTheme(); 

  const initialTasks = [
    { id: 1, text: "Design the UI layout", isComplete: false, priority: "High" },
    { id: 2, text: "Implement Local Storage", isComplete: true, priority: "Medium" },
    { id: 3, text: "Integrate Drag-and-Drop", isComplete: false, priority: "Low" },
  ];
  
  // State 1: Task List (Persisted)
  const [tasks, setTasks] = useLocalStorage('taskManagerTasks', initialTasks);
  
  // State 2: Filter Criteria (Persisted)
  const [filter, setFilter] = useLocalStorage('taskFilter', 'All'); 

  // --- Task Modification Functions (CRUD) ---

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
  
  // --- Drag-and-Drop Logic ---

  // Utility function to reorder the array immutably
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Handler called when a drag ends
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTasks = reorder(
      tasks, 
      result.source.index,
      result.destination.index
    );

    setTasks(reorderedTasks);
  };

  // --- Filtering Logic ---

  const getFilteredTasks = () => {
    switch (filter) {
      case 'Active':
        return tasks.filter(task => !task.isComplete);
      case 'Completed':
        return tasks.filter(task => task.isComplete);
      case 'High':
        return tasks.filter(task => task.priority === 'High');
      case 'Medium':
        return tasks.filter(task => task.priority === 'Medium');
      case 'Low':
        return tasks.filter(task => task.priority === 'Low');
      case 'All':
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    // Dynamic class applied for theme styling
    <div className={`task-manager-app theme-${theme}`}>
      
      
      <div className="main-content-card">
        <header className="app-header">
          <h1>Advanced Task Manager</h1>
          <ThemeToggle /> 
        </header>
        <TaskInput onAddTask={addTask} />
        
        <FilterControls 
          currentFilter={filter} 
          onFilterChange={setFilter} 
        />

        <TaskList 
          tasks={filteredTasks} // Passing the filtered list
          onDeleteTask={deleteTask}
          onToggleComplete={toggleComplete} 
          onDragEnd={onDragEnd} // Passing the Drag-and-Drop handler
        />
      </div>
    </div>
  );
}

export default App;