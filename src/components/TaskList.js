import Task from "./Task";
import { useState } from "react";

function TaskList({displayTasks, deleteTask, checkTask, totalTasks, controlChangeTask, setControlChangeTask}) {

  const [valueTask, setValueTask] = useState('');
  const handleValueChange = (e) => setValueTask(e.target.value);

  const changeTitleTask = (id) => {
    /* let editTask = totalTasks.find(item => item.uuid === id);
    editTask.edit ? editTask.edit = !editTask.edit : editTask.edit = true;
    setValueTask(editTask.title)
    setControlChangeTask(!controlChangeTask) */
  }

  const saveСhangedTitle = (id) => { 
   /*  let editTask = totalTasks.find(item => item.uuid === id);
    editTask.name = valueTask;
    editTask.edit = !editTask.edit;
    setValueTask('');
    setControlChangeTask(!controlChangeTask) */
  }

    return (
      <div className="taskList">
        {displayTasks.length < 1 && <p className="taskZero">No tasks</p>}
        {displayTasks.map(elem => <Task task={elem} key={elem.uuid} deleteTask={deleteTask}
        checkTask={checkTask} totalTasks={totalTasks} changeTitleTask={changeTitleTask} saveСhangedTitle={saveСhangedTitle} 
        valueTask={valueTask} handleValueChange={handleValueChange}
        ></Task>)}
      </div>
    )
  }
  
  export default TaskList;
  