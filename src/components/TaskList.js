import Task from "./Task";

function TaskList({arrayToDisplayTasks, deleteTask, checkTask}) {  
 
    return (
      <div className="taskList">
        {arrayToDisplayTasks.length < 1 && <p className="taskZero">No tasks</p>}
        {arrayToDisplayTasks.map(elem => <Task task={elem} key={elem.id} deleteTask={deleteTask} checkTask={checkTask} />)}
      </div>
    )
  }
  
  export default TaskList;
  