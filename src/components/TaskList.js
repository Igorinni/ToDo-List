import Task from "./Task";
import { useState } from "react";
import axios from 'axios';

function TaskList({displayTasks, deleteTask, checkTask, getTasks}) {

  const [valueTask, setValueTask] = useState('');
  const handleValueChange = (e) => setValueTask(e.target.value);

  const changeTitleTask = (id) => {
    let editTask = displayTasks.find(item => item.uuid === id);
    if (editTask.edit) {
      delete editTask.edit
      setValueTask('')
    } else {
      editTask.edit = true;
      setValueTask(editTask.name)
    }
  }

  const saveСhangedTitle = async (id) => { 
    let editTask = displayTasks.find(item => item.uuid === id);
    editTask.name = valueTask;
    delete editTask.edit;
    setValueTask('');

    await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/3/${editTask.uuid}`, {
      name: editTask.name,
      done: editTask.done,
      createdAt: editTask.createdAt,
      updatedAt: editTask.updatedAt,
    })
   getTasks()
  }

    return (
      <div className="taskList">
        {displayTasks.length < 1 && <p className="taskZero">No tasks</p>}
        {displayTasks.map(elem => <Task task={elem} key={elem.uuid} deleteTask={deleteTask}
        checkTask={checkTask} changeTitleTask={changeTitleTask} saveСhangedTitle={saveСhangedTitle} 
        valueTask={valueTask} handleValueChange={handleValueChange}
        ></Task>)}
      </div>
    )
  }
  
  export default TaskList;
  