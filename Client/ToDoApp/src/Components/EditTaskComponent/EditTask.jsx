import {useState } from 'react';
import axios from 'axios';
import "./EditTask.css"
import "../../styles/InputField.css";

const EditTask = ({editingTask, setEditingTaskFunc, fetchTasksFunc}) =>{
    const [nameValue, setNameValue] = useState(editingTask.taskName)
    const maxLengthOfName = 20
    const [descValue, setDescValue] = useState(editingTask.taskDesc)
    const maxLengthOfDesc = 25

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
            {<h2 className="header">Edit task: "{editingTask.taskName}"</h2>}
            <form className="editTask-form" onSubmit={onSubmit}>
                <label htmlFor="task-name">
                    <h2>Name</h2>
                    <input type="text"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)} 
                        maxLength={maxLengthOfName}
                        required
                    />
                </label>
                <div style={{ fontSize: '0.8rem', color: 'gray' }}>
                  {nameValue.length}/{maxLengthOfName} characters
                </div> 

                <label htmlFor="task-desc">
                    <h2>Description</h2>
                    <input type="text"
                        value={descValue}
                        onChange={(e) => setDescValue(e.target.value)}
                        maxLength={maxLengthOfDesc}
                    />
                </label>
                <div style={{ fontSize: '0.8rem', color: 'gray' }}>
                  {descValue.length}/{maxLengthOfDesc} characters
                </div>
                <div className="buttons">
                    <button className="add-btn" type="submit">Submit</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </form>
            
        </div>
    );
}

export default EditTask;