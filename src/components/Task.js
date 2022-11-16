import { MdDeleteForever } from "react-icons/md";


function Task({task, deleteTask, checkTask}) {
    
    return (
      <div className={task.completed ? "task taskCompleted" : "task" }>
        <input defaultChecked={task.completed ? true : false} onClick={() => checkTask(task.id)} className="checkbox" type='checkbox'></input>
        <p className="titleTask">{task.title}</p>
        <p className="dateTask">{task.dateCreation}</p>
        <button  className="deleteButton" onClick={() => deleteTask(task.id)}><MdDeleteForever></MdDeleteForever></button>
      </div>
    )
  }
  
  export default Task;
  