import { useState } from "react";


function AddTaskInput({addTask, loadingPage}) {

  const [value, setValue] = useState('');
  const handleValueChange = (e) => setValue(e.target.value);


  function saveTask(){
    if (value.trim() === '') return;
    const date = new Date();
    const task = {
      name: value,
      done: false,
      createdAt: date.getTime(),
      updatedAt: date.getTime(),
    }
    addTask(task)
    setValue('');
  }

  return (
    <div className="addTask">
      <input autoFocus value={value} onKeyUp={(e) => e.code === 'Enter' || e.key === 13 ? saveTask() : '' } 
        onChange={handleValueChange} className="addInput" 
        placeholder="Enter a task..." 
      ></input>
      <button disabled={loadingPage} style={{opacity: loadingPage && 0.5}} className="addButton" onClick={saveTask}>Add</button>
    </div>
  );
}

export default AddTaskInput;
