import {useState } from 'react';
import axios from 'axios';

const TasksList = ({fetchTasksFunc, tasksList, setEditingTaskFunc}) =>{
    
    const [isCompleted, setIsCompleted] = useState(false);

    const deleteTask = async (taskGuid) => {
        try {
          await axios.delete(`http://localhost:5000/Tasks/DeleteTask?taskGuid=${taskGuid}`);
          fetchTasksFunc();
        } catch (error) {
          console.error('Error deleting task', error);
        }
      };
    
      const completedChange = async (taskGuid, isCompleted) =>{
        setIsCompleted(!setIsCompleted);
        try{
          await axios.put(`http://localhost:5000/Tasks/EditTaskIsComplete?taskGuid=${taskGuid}&isCompleted=${isCompleted}`);
          fetchTasksFunc();
        }catch (error) {
          console.error('Error deleting task', error);
        }
      }

    return (<>
    <div className="task-list">
        <h2>Existing Tasks</h2>
        {tasksList.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <table className="task-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Description</th>
                <th>Create Date</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasksList.map((task) => (
                <tr className={task.isCompleted ? 'task-checked' : "task-unchecked"} key={task.taskGuid}>
                  <td>{task.taskName}</td>
                  <td>{task.taskDesc ? task.taskDesc : "No description"}</td>
                  <td>{new Date(task.createOn).toISOString().split('T')[0]}</td>
                    <td>
                      <div className='isCompleted-label'>
                        <input type="checkbox" 
                          checked={task.isCompleted} 
                          onChange={e => completedChange(task.taskGuid, e.target.checked)}
                        />
                      </div>

                    </td>
                  <td>
                    <button className="edit-btn" onClick={() => setEditingTaskFunc(task)}>Edit</button>
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
    </>
    )
}

export default TasksList;
