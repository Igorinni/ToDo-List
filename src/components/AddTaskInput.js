import { useState } from "react";

function AddTaskInput({tasks, setTasks}) {

  const [value, setValue] = useState('')

  const handleValueChange = (e) => setValue(e.target.value)

  function saveTask(){
    if (value.trim() == '') return;
    const date = new Date();
    const id = tasks.length == 0 ? 1 : tasks[tasks.length - 1].id + 1
    const task = {
      id: id,
      title: value,
      completed: false,
      date: date.getTime(),        
    }
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    setValue('');

  }

  return (
    <div className="addTask">
      <input autoFocus value={value} onKeyUp={(e) => e.code === 'Enter' || e.key === 13 ? saveTask() : '' } 
        onChange={handleValueChange} className="addInput" 
        placeholder="Enter a task..." 
      ></input>
      <button className="addButton" onClick={saveTask}>Add</button>
    </div>
  );
}

export default AddTaskInput;
