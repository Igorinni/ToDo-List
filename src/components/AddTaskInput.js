import { useState } from "react";

function AddTaskInput({tasks, setTasks}) {

  const [value, setValue] = useState('')

  const handleValueChange = (e) => setValue(e.target.value)

  function saveTask(){
    if (value.trim() == '') return;
    const date = new Date();
    const task = {
      id: tasks[tasks.length - 1].id + 1,
      title: value,
      completed: false,
      date: date.getTime(),
      dateCreation: `
          ${[date.getDate(),
          date.getMonth(),
          date.getFullYear(),].join('/')}  
          ${[
            date.getHours(), 
            date.getMinutes(), 
            date.getSeconds()].map( x => x <  10 ? '0' + x : x ).join(':')}
        `
        
    }
    const newTasks = [...tasks]
    newTasks.push(task)
    setTasks(newTasks)
    setValue('')

  }

  return (
    <div className="addTask">
      <input autoFocus value={value} onKeyUp={(e) => e.code == 'Enter' ? saveTask() : '' } 
        onChange={handleValueChange} className="addInput" 
        placeholder="Enter a task..." 
      ></input>
      <button className="addButton" onClick={saveTask}>Add</button>
    </div>
  );
}

export default AddTaskInput;
