import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";


function Task({task, deleteTask, checkTask, tasks, setTasks, totalTasks}) {

  const date = task.date ? new Date(task.date) : '';

  const [valueTask, setValueTask] = useState('')
  const handleValueChange = (e) => setValueTask(e.target.value)

    

  function changeTitleTask(id) {
    const newArray = [...totalTasks]
    newArray.forEach((item) => {
      if (item.id === id) {
        item.edit ? item.edit = !item.edit : item.edit = true;
      }
    })
    setTasks(newArray)
  }

  const saveСhangedTitle = (newTitle, id) => { 
    const data = new Date()
    const newArray = [...totalTasks]
    newArray.forEach((item) => {
      if (item.id === id) {
        item.title = newTitle;
        item.edit = !item.edit;
        item.date = data.getTime();
      }
    })
    setTasks(newArray)
    setValueTask('')
  }

  return (
    <div className={task.completed ? "task taskCompleted" : "task" }>
      <input checked={task.completed ? true : false} onChange={() => checkTask(task.id)} className="checkbox" type='checkbox'></input>
      <p className="titleTask" onDoubleClick={() => changeTitleTask(task.id)}>
        {task.edit ? 
        <>
          <input className="inputEditTask" autoFocus value={valueTask} onChange={handleValueChange} onBlur={() => changeTitleTask(task.id)}
          onKeyDown={(e) => {
            if (e.code === 'Enter' || e.key === 13) saveСhangedTitle(valueTask, task.id)
            if (e.code === 'Escape') {
              changeTitleTask(task.id)
            }}}
          ></input>
          <BsCheckCircle className="iconSaveEditTask"></BsCheckCircle>
        </>
        : task.title}
        </p>
      <p className="dateTask">
        {[date.getDate(), date.getMonth(), date.getFullYear(),].join('/')}
        &nbsp;
        {[date.getHours(), date.getMinutes(), date.getSeconds()].map( x => x <  10 ? '0' + x : x ).join(':')}
      </p>
      <button  className="deleteButton" onClick={() => deleteTask(task.id)}><MdDeleteForever></MdDeleteForever></button>
    </div>
  )
}
  
export default Task;
  