import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/App.css';
import './styles/Buttons.css'
import AddTaskForm from './Components/AddTaskComponent/AddTaskForm';
import TasksList from './Components/TaskListComponent/TasksList';
import EditTask from './Components/EditTaskComponent/EditTask';
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence mode="wait">
        {editingTask != null ? (
          <>
            <motion.div
              key="edit-task"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
            >
              <EditTask
                editingTask={editingTask}
                setEditingTaskFunc={setEditingTask}
                fetchTasksFunc={fetchTasks}
              />
            </motion.div>
          </>
        ) : (
          <>
            <AddTaskForm fetchTasksFunc={fetchTasks} />
            <TasksList
              fetchTasksFunc={fetchTasks}
              tasksList={tasks}
              setEditingTaskFunc={setEditingTask}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
