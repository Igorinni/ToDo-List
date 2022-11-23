import Task from "./Task";

function TaskList({arrayToDisplayTasks, deleteTask, checkTask}) {  
 
    return (
      <div className="taskList">
        {arrayToDisplayTasks.length < 1 && <p className="noTasks">No tasks</p>}
        {arrayToDisplayTasks.map(elem => <Task task={elem} key={elem.uuid} deleteTask={deleteTask} checkTask={checkTask} />)}
      </div>
    )
  }
  
  export default TaskList;
  