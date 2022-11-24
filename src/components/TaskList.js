import Task from "./Task";

function TaskList({arrayToDisplayTasks, deleteTask, checkTask, getTasks, loadingPage}) {  
 
    return (
      <div className="taskList">
        {arrayToDisplayTasks.length < 1 && <p className="noTasks">No tasks</p>}
        {arrayToDisplayTasks.map(elem => <Task task={elem} key={elem.uuid} deleteTask={deleteTask} checkTask={checkTask} getTasks={getTasks} loadingPage={loadingPage} />)}
      </div>
    )
  }
  
  export default TaskList;
  