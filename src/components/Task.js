import { MdDeleteForever } from "react-icons/md";


function Task({task, deleteTask, checkTask, changeTitleTask, saveСhangedTitle, valueTask, handleValueChange}) {

  const date = task.createdAt ? new Date(task.createdAt) : '';

  return (
    <div className={task.done ? "task taskCompleted" : "task" }>
      <input checked={task.done ? true : false} onChange={() => checkTask(task.uuid)} className="checkbox" type='checkbox'></input>
      <p className="titleTask" onDoubleClick={() => changeTitleTask(task.uuid)}>
        {task.edit ? 
          <input className="inputEditTask" autoFocus value={valueTask} onChange={handleValueChange} onBlur={() => changeTitleTask(task.uuid)}
          onKeyDown={(e) => {
            if (e.code === 'Enter' || e.key === 13) saveСhangedTitle(task.uuid)
            if (e.code === 'Escape') {
              changeTitleTask(task.uuid)
            }}}
          ></input>
          : task.name}
        </p>
      {task.createdAt &&
        <p className="dateTask">
          {[date.getDate(), date.getMonth(), date.getFullYear(),].join('/')}
          &nbsp;
          {[date.getHours(), date.getMinutes(), date.getSeconds()].map( x => x <  10 ? '0' + x : x ).join(':')}
        </p>
      }
      <button  className="deleteButton" onClick={() => deleteTask(task.uuid)}><MdDeleteForever></MdDeleteForever></button>
    </div>
  )
}
  
export default Task;
  