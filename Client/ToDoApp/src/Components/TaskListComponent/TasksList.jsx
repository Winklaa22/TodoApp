import {useState } from 'react';
import axios from 'axios';
import "./TaskList.css"
import { motion, AnimatePresence } from "framer-motion";
import Checkbox from '../CheckboxComponent/Checkbox';


const TasksList = ({fetchTasksFunc, tasksList, setEditingTaskFunc}) =>{

  const [isCompleted, setIsCompleted] = useState(false);

  const animDuration = .2

  const deleteTask = async (taskGuid) => {
    setTimeout(async () => {
      try {
        await axios.delete(`http://localhost:5000/Tasks/DeleteTask?taskGuid=${taskGuid}`);
        fetchTasksFunc();
      } catch (error) {
        console.error("Error deleting task", error);
      }
    }, (animDuration * 1000));
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

  const editTask = (task) =>{
    setEditingTaskFunc(task)
  }

  return (<>
  <div className= { tasksList.length != 0 ? "task-list" : ""}>
      {tasksList.length != 0 && (
        <>
        <table className="task-table-header">
        <thead>
             <tr>
               <th>Task Name</th>
               <th>Description</th>
               <th>Create Date</th>
               <th>Completed</th>
               <th>Actions</th>
             </tr>
           </thead>
         </table>
         <div className="task-table-container">
          <table className="task-table">
            
            <AnimatePresence>
              {tasksList.map((task) => (
                <motion.tr
                  className={task.isCompleted ? "task-checked" : "task-unchecked"}
                  key={task.taskGuid}
                  initial={{ opacity: 0}}
                  animate={{ opacity: 1}}
                  exit={{ opacity: 0}}
                  transition={{ duration: animDuration }}
                >
                  <td>{task.taskName}</td>
                  <td>{task.taskDesc ? task.taskDesc : "No description"}</td>
                  <td>{new Date(task.createOn).toISOString().split('T')[0]}</td>
                  <td>
                    <div className='isCompleted-label'>

                      <Checkbox
                        key={task.taskGuid}
                        isChecked={task.isCompleted} 
                        onChangeFunc={(checked) => {completedChange(task.taskGuid, checked)}}
                      />
                    </div>
                  </td>
                  <td>
                    <div className='actions-btns'>
                      <button className="edit-btn" onClick={() => editTask(task)}>Edit</button>
                      <button className="delete-btn" onClick={() => deleteTask(task.taskGuid)}>
                        Delete
                      </button>                      
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
           
          </table>
          </div>
        </>
      )}
  </div>
  </>
  )
}

export default TasksList;
