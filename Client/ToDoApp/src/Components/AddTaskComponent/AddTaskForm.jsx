import { useEffect, useState } from 'react';
import axios from 'axios';
import "./AddTaskForm.css"
import { motion, AnimatePresence } from "framer-motion";
import InputField from '../InputfieldComponent/Inputfield';
import TextAreaField from '../TextAreaComponent/TextArea';

const AddTaskForm = ({fetchTasksFunc}) =>{

    const addTask = async () =>{
      const taskData = {
        taskName: taskName,
        taskDesc: taskDesc
      };
      console.log({taskData})
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
    const maxLengthOfName = 30
    const maxLengthOfDesc = 100
    return (<>
    <motion.div
      key="tasks-add"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className='new-task-container'>
          <form className="new-task-form" onSubmit={(e) => {e.preventDefault(); addTask();}}>
            <div className="form-row">
                <InputField
                  htmlFor={'task-nane'}
                  headerText='Name'
                  onChange={e => setTaskName(e.target.value)}
                  value={taskName}
                  hasMaxLength={true}
                  maxLength={maxLengthOfName}
                  hasMaxLengthCounter={true}
                />
                
                <TextAreaField
                  htmlFor={'task-desc'}
                  headerText='Description'
                  onChange={e => setTaskDesc(e.target.value)}
                  value={taskDesc}
                  hasMaxLength={true}
                  maxLength={maxLengthOfDesc}
                  hasMaxLengthCounter={true}
                />
                
            </div>
            <button className="add-btn" type="submit">Add task</button>
          </form>
      </div>
    </motion.div>
    </>)
    }

export default AddTaskForm;