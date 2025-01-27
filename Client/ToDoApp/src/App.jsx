import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/App.css';
import './styles/Buttons.css'
import AddTaskForm from './Components/AddTaskComponent/AddTaskForm';
import TasksList from './Components/TaskListComponent/TasksList';
import EditTask from './Components/EditTaskComponent/EditTask';

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
      {editingTask != null
          ?  <EditTask editingTask={editingTask} setEditingTaskFunc={setEditingTask}/>
          : 
          <>
            <AddTaskForm fetchTasksFunc={fetchTasks} />
            <TasksList fetchTasksFunc={fetchTasks} tasksList={tasks} setEditingTaskFunc={setEditingTask} />
          </>
      }
      
    </div>
  );
};

export default App;
