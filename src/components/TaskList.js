import Task from "./Task";

function TaskList({displayTasks, deleteTask, checkTask, totalTasks}) {  
 
    return (
      <div className="taskList">
        {displayTasks.length < 1 && <p className="taskZero">No tasks</p>}
        {displayTasks.map(elem => <Task task={elem} key={elem.id} deleteTask={deleteTask}
        checkTask={checkTask} totalTasks={totalTasks}></Task>)}
      </div>
    )
  }
  
  export default TaskList;
  