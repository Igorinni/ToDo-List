import { useState } from "react";

function AddTask({tasks, setTasks}) {

  const [value, setValue] = useState('')

  function saveTask(){
    const date = new Date();
    const task = {
      id: tasks[tasks.length - 1].id + 1,
      title: value,
      completed: false,
      dateCreation: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    }
    const newTasks = [...tasks]
    newTasks.push(task)
    setTasks(newTasks)
    setValue('')
  }

  return (
    <div className="addTask">
      <input autoFocus value={value} onKeyUp={(e) => e.code == 'Enter' ? saveTask() : '' } 
        onChange={(e) => setValue(e.target.value)} className="addInput" 
        placeholder="Enter a task..." 
      ></input>
      <button className="addButton" onClick={saveTask}>Add</button>
    </div>
  );
}

export default AddTask;
