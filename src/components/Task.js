import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

function Task({task, deleteTask, checkTask}) {
  
  const date = task.date ? new Date(task.date) : '';

  const [editStatus, setEditStatus] = useState(false);
  const handleEditStatus = () => setEditStatus(!editStatus);

  const changeTitleTask = (id) => {
    const newTitleTask = document.querySelector('.inputEditTask').value;
    task.title = newTitleTask;
    handleEditStatus();
  }


  return (
    <div className={task.completed ? "task taskCompleted" : "task" }>
      <input checked={task.completed ? true : false} onChange={() => checkTask(task.id)} className="checkbox" type='checkbox'></input>
      <p className="titleTask" onDoubleClick={handleEditStatus}>
        {editStatus 
          ? <input className="inputEditTask" autoFocus defaultValue={task.title} onBlur={handleEditStatus}
              onKeyDown={(e) => {
                if (e.code === 'Enter' || e.key === 13) changeTitleTask()
                if (e.code === 'Escape') handleEditStatus()
              }}
            ></input>
          : task.title}
        </p>
      {task.date &&
        <p className="dateTask">
          {[date.getDate(), date.getMonth(), date.getFullYear(),].join('/')}
          &nbsp;
          {[date.getHours(), date.getMinutes(), date.getSeconds()].map( x => x <  10 ? '0' + x : x ).join(':')}
        </p>
      }
      <button  className="deleteButton" onClick={() => deleteTask(task.id)}><MdDeleteForever></MdDeleteForever></button>
    </div>
  )
}
  
export default Task;
  