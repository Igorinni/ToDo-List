import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { saveСhangedTitleTask } from "../services/RequestApi.js"

function Task({task, deleteTask, checkTask, getTasks}) {

  const date = task.createdAt ? new Date(task.createdAt) : '';


  const [editStatus, setEditStatus] = useState(false);
  const handleEditStatus = () => setEditStatus(!editStatus);

  const saveСhangedTitle = async () => { 
    const newTitleTask = document.querySelector('.inputEditTask').value;
    await saveСhangedTitleTask(newTitleTask, task);
    getTasks();
    handleEditStatus();
  }


  return (
    <div className={task.done ? "task taskCompleted" : "task" }>
      <input checked={task.done ? true : false} onChange={() => checkTask(task)} className="checkbox" type='checkbox'></input>
      <p className="titleTask" onDoubleClick={handleEditStatus}>
        {editStatus 
          ? <input className="inputEditTask" autoFocus defaultValue={task.name} onBlur={handleEditStatus}
              onKeyDown={(e) => {
                if (e.code === 'Enter' || e.key === 13) saveСhangedTitle()
                if (e.code === 'Escape') handleEditStatus()
              }}
            ></input>
          : task.name}
        </p>
      {task.createdAt &&
        <p className="dateTask">
          <span>{[date.getDate(), date.getMonth(), date.getFullYear(),].join('/')}</span>
          <span>{[date.getHours(), date.getMinutes(), date.getSeconds()].map( x => x <  10 ? '0' + x : x ).join(':')}</span>
        </p>
      }
      <button  className="deleteButton" onClick={() => deleteTask(task.uuid)}><MdDeleteForever /></button>
    </div>
  )
}
  
export default Task;
  