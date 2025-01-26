import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Fetch tasks on page load
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Tasks/GetTasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };


  const deleteTask = async (taskGuid) => {
    try {
      await axios.delete(`http://localhost:5000/Tasks/DeleteTask?taskGuid=${taskGuid}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const completedChange = async (taskGuid, isCompleted) =>{
    setIsCompleted(!setIsCompleted);
    try{
      await axios.put(`http://localhost:5000/Tasks/EditTaskIsComplete?taskGuid=${taskGuid}&isCompleted=${isCompleted}`);
      fetchTasks();
    }catch (error) {
      console.error('Error deleting task', error);
    }
  }


  const addTask = async () =>{
    try {
      const taskData = {
        taskName: taskName,
        iconName: "",
        taskDesc: taskDesc
      };

      if(taskName != ""){
        await axios.post(
          'http://localhost:5000/Tasks/AddTask',
          taskData,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        fetchTasks();
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  }

  
  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className='new-task-container'>
        <form className="new-task-form">
          <div className="form-row">
              <label htmlFor="task-name">
                <h2>Name</h2>
                <input
                    value={taskName} 
                    onChange={e => setTaskName(e.target.value)} 
                    type="text" 
                    id="item"
                /> 
              </label>
              
              <label htmlFor="task-desc">
                <h2>Description</h2>
                <input
                    value={taskDesc}
                    onChange={e => setTaskDesc(e.target.value)} 
                    type="text" 
                    id="item"
                /> 
                </label>
              
          </div>
          <button className="add-btn" onClick={() => addTask()}>Add task</button>
        </form>
      </div>


      <div className="task-list">
        <h2>Existing Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <table className="task-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Description</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.taskGuid}>
                  <td>{task.taskName}</td>
                  <td>{task.taskDesc != "" ? task.taskDesc : "No description"}</td>
                    <td>
                      <div className='isCompleted-label'>
                      

                        <input type="checkbox" 
                          checked={task.isCompleted} 
                          onChange={e => completedChange(task.taskGuid, e.target.checked)}
                        />
                      </div>

                    </td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteTask(task.taskGuid)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
