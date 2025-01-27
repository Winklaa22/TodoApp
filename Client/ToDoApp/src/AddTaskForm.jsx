import { useEffect, useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({fetchTasksFunc}) =>{

    const addTask = async () =>{
        try {
          const taskData = {
            taskName: taskName,
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
            setTaskName("")
            setTaskDesc("")
            fetchTasksFunc();
          }
        } catch (error) {
          console.error('Error fetching tasks', error);
        }
      }

    const [taskName, setTaskName] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const maxLengthOfName = 20
    const maxLengthOfDesc = 25
    return (<>
    <div className='new-task-container'>
        <form className="new-task-form" onSubmit={(e) => {e.preventDefault(); addTask();}}>
          <div className="form-row">
              <label htmlFor="task-name">
                <h2>Name</h2>
                <input
                    value={taskName} 
                    onChange={e => setTaskName(e.target.value)} 
                    type="text" 
                    id="item"
                    required
                    maxLength={maxLengthOfName}
                    onInvalid={(e) => e.target.setCustomValidity('Task name is required')}
                    onInput={(e) => e.target.setCustomValidity('')}
                />
                <div style={{ fontSize: '0.8rem', color: 'gray' }}>
                  {taskName.length}/{maxLengthOfName} characters
                </div> 
              </label>

              
              <label htmlFor="task-desc">
                <h2>Description</h2>
                <input
                    value={taskDesc}
                    onChange={e => setTaskDesc(e.target.value)} 
                    maxLength={maxLengthOfDesc}
                    type="text" 
                    id="item"
                />
                <div style={{ fontSize: '0.8rem', color: 'gray' }}>
                  {taskDesc.length}/{maxLengthOfDesc} characters
                </div> 
                </label>
              
          </div>
          <button className="add-btn" type="submit">Add task</button>
        </form>
      </div>
    </>)
    }

export default AddTaskForm;