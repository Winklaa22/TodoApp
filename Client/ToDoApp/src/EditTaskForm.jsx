const EditTaskForm = ({ task, onClose }) => {
    const [taskName, setTaskName] = useState(task.name);
    const [taskDescription, setTaskDescription] = useState(task.description);
  
    const handleSave = () => {
      const updatedTask = {
        ...task,
        name: taskName,
        description: taskDescription,
      };
      onSave(updatedTask);
    };
  
    return (
      <div className="editTask-form">
        <div className="editTask-content">
          <h2>Edit Task</h2>
          <label>
            Task Name:
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </label>
          <button onClick={onClose}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };

export default EditTaskForm;