import { MdDeleteForever } from "react-icons/md";


function Task({task, deleteTask, checkTask, changeTitleTask, saveСhangedTitle, valueTask, handleValueChange}) {

  const date = task.date ? new Date(task.date) : '';

  return (
    <div className={task.completed ? "task taskCompleted" : "task" }>
      <input checked={task.completed ? true : false} onChange={() => checkTask(task.id)} className="checkbox" type='checkbox'></input>
      <p className="titleTask" onDoubleClick={() => changeTitleTask(task.id)}>
        {task.edit ? 
          <input className="inputEditTask" autoFocus value={valueTask} onChange={handleValueChange} onBlur={() => changeTitleTask(task.id)}
          onKeyDown={(e) => {
            if (e.code === 'Enter' || e.key === 13) saveСhangedTitle(task.id)
            if (e.code === 'Escape') {
              changeTitleTask(task.id)
            }}}
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
  