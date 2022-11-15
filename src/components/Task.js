import { MdDeleteForever } from "react-icons/md";


function Task({task}) {
    return (
      <div className="task">
        <input className="checkbox" type='checkbox'></input>
        <p className="titleTask">{task.title}</p>
        <MdDeleteForever className="deleteButton"></MdDeleteForever>
      </div>
    )
  }
  
  export default Task;
  