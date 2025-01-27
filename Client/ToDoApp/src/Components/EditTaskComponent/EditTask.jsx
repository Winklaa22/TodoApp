import {useState } from 'react';
import "./EditTask.css"
import "../../styles/InputField.css";

const EditTask = ({editingTask, setEditingTaskFunc, fetchTasksFunc}) =>{
    const taskName = editingTask.taskName
    const [nameValue, setNameValue] = useState("")
    const maxLengthOfName = 20
    const [descValue, setDescValue] = useState("")
    const maxLengthOfDesc = 25

    const editTaskAsync = async () =>{
        try{

        } catch{
            
        }
    }

    return (
        <div className="editTask-container">
            {<h2>{taskName} is editing</h2>}
            <form>
                <label htmlFor="task-name">
                    <h2>Name</h2>
                    <input type="text"
                        onChange={(e) => setNameValue(e.target.value)} 
                        maxLength={maxLengthOfName}
                    />
                </label>
                <div style={{ fontSize: '0.8rem', color: 'gray' }}>
                  {nameValue.length}/{maxLengthOfName} characters
                </div> 

                <label htmlFor="task-desc">
                    <h2>Description</h2>
                    <input type="text"
                        onChange={(e) => setDescValue(e.target.value)}
                        maxLength={maxLengthOfDesc}
                    />
                </label>
                <div style={{ fontSize: '0.8rem', color: 'gray' }}>
                  {descValue.length}/{maxLengthOfDesc} characters
                </div> 
            </form>
            <button onClick={() => setEditingTaskFunc(null)}>Close</button>
        </div>
    );
}

export default EditTask;