import { MdDeleteForever } from "react-icons/md";


function Task({task, deleteTask, checkTask}) {
    return (
      <div className={task.completed ? "task taskCompleted" : "task" }>
        <input onClick={() => checkTask(task.id)} className="checkbox" type='checkbox'></input>
        <p className="titleTask">{task.title}</p>
        <MdDeleteForever className="deleteButton" onClick={() => deleteTask(task.id)}></MdDeleteForever>
      </div>
    )
  }
  
  export default Task;
  