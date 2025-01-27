
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import AddTaskForm from './AddTaskForm';
import TasksList from './TasksList';

const App = () => {


  useEffect(() => {
    fetchTasks();
  }, []);

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Tasks/GetTasksByDate');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {editingTask 
          ? <h2> "{editingTask.taskName}" Is editing</h2>
          : 
          <>
            <AddTaskForm fetchTasksFunc={fetchTasks} />
            <TasksList fetchTasksFunc={fetchTasks} tasksList={tasks} setEditingTaskFunc={setEditingTask} />
          </>
      }

      {editingTask && <button onClick={() => setEditingTask(null)}>stop editing</button>}
      
    </div>
  );
};

export default App;
