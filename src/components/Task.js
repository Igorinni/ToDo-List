import { MdDeleteForever } from "react-icons/md";


function Task({task, deleteTask, checkTask}) {
    
    return (
      <div className={task.completed ? "task taskCompleted" : "task" }>
        <input checked={task.completed ? true : false} onChange={() => checkTask(task.id)} className="checkbox" type='checkbox'></input>
        <p onDoubleClick={() => checkTask(task.id)} className="titleTask">{task.title}</p>
        <p className="dateTask">{task.dateCreation}</p>
        <button  className="deleteButton" onClick={() => deleteTask(task.id)}><MdDeleteForever></MdDeleteForever></button>
      </div>
    )
  }
  
  export default Task;
  