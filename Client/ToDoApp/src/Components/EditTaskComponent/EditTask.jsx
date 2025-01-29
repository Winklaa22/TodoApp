import {useState } from 'react';
import axios from 'axios';
import "./EditTask.css"
import InputField from '../InputfieldComponent/Inputfield';
import TextAreaField from '../TextAreaComponent/TextArea';

const EditTask = ({editingTask, setEditingTaskFunc, fetchTasksFunc}) =>{
    const [nameValue, setNameValue] = useState(editingTask.taskName)
    const maxLengthOfName = 20
    const [descValue, setDescValue] = useState(editingTask.taskDesc)
    const maxLengthOfDesc = 100

    const onClose = () =>{
        setEditingTaskFunc(null)
    }

    const onSubmit = (e) =>{
        e.preventDefault(); 
        editTaskAsync();
    }

    const editTaskAsync = async () =>{
        try{
            const taskData = {
                taskGuid: editingTask.taskGuid,
                taskName: nameValue,
                taskDesc: descValue
              };
              if(taskData.taskName != ""){
                await axios.put(
                  'http://localhost:5000/Tasks/EditTaskData',
                  taskData,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  }
                );
                fetchTasksFunc();
                onClose();
              }
        } catch (error){
            console.error('error editing task', error)
        }
    }

    return (
        <div className="editTask-container">
            {<h2 className="header">Edit Task: "{editingTask.taskName}"</h2>}
            <form className="editTask-form" onSubmit={onSubmit}>
                <InputField
                  htmlFor={'task-nane'}
                  headerText='Name'
                  onChange={e => setNameValue(e.target.value)}
                  value={nameValue}
                  hasMaxLength={true}
                  maxLength={maxLengthOfName}
                  hasMaxLengthCounter={true}
                />
                
                <TextAreaField
                  htmlFor={'task-desc'}
                  headerText='Description'
                  onChange={e => setDescValue(e.target.value)}
                  value={descValue}
                  hasMaxLength={true}
                  maxLength={maxLengthOfDesc}
                  hasMaxLengthCounter={true}
                />
                <div className="buttons">
                    <button className="add-btn" type="submit">Submit</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </form>
            
        </div>
    );
}

export default EditTask;